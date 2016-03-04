# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  poll_id    :integer          not null
#  title      :string           not null
#  body       :string
#  image_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  is_locked  :boolean          not null
#  ord        :integer
#

class Question < ActiveRecord::Base
  validates :title, :poll, presence: true
  validates :image_url, url: {no_local: true, allow_blank: true}
  validates :is_locked,
    inclusion: {in:  [true, false],
      message: "should be true or false."}
  validates :ord, uniqueness: { scope: :poll_id,
    message: "two questions in the same poll may not have the same ord." }

  before_validation :ensure_locked, :ensure_ord
  after_destroy :mend_ord

  has_many :responses,
    -> { order :ord },
    inverse_of: :question
  accepts_nested_attributes_for :responses, allow_destroy: true

  has_many :votes,
    through: :responses,
    source: :votes,
    inverse_of: :question

  belongs_to :poll,
    inverse_of: :questions


  has_one :author,
    through: :poll,
    source: :author,
    inverse_of: :questions

  has_one :active_user,
    class_name: "User",
    foreign_key: :active_question_id,
    inverse_of: :active_question

  def is_active?
    !!active_user
  end

  def ensure_ord
    questions = poll.questions
    self.ord ||= ( questions.map(&:ord).compact.max || -1 ) + 1
    if self.poll_id
      transaction do
        self.class.connection.execute(<<-SQL)
        SET CONSTRAINTS deferred_ord_and_poll_id DEFERRED;
        UPDATE "questions" SET ord = ord + 1
        WHERE "questions"."id" IN (
          SELECT "questions"."id" FROM "questions"
          WHERE "questions"."poll_id" = #{self.poll_id} AND (ord >= #{self.ord})
          ORDER BY "questions"."ord" ASC
        );
        SQL
      end
    end
  end

  def mend_ord
    questions = poll.questions
    self.ord ||= questions.count
    transaction do
      self.class.connection.execute(<<-SQL)
      SET CONSTRAINTS deferred_ord_and_poll_id DEFERRED;
      UPDATE "questions" SET ord = ord - 1
      WHERE "questions"."id" IN (
        SELECT "questions"."id" FROM "questions"
        WHERE "questions"."poll_id" = #{self.poll_id} AND (ord > #{self.ord})
        ORDER BY "questions"."ord" ASC
      );
      SQL
    end
  end

    private
    def ensure_locked
      self.is_locked = true unless [true, false].include?(self.is_locked)
    end
end
