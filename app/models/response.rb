# == Schema Information
#
# Table name: responses
#
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  author_id   :integer          not null
#  body        :string
#  image_url   :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  ord         :integer
#

class Response < ActiveRecord::Base
  validates :question, presence: true
  validates :author, presence: true
  validates :image_url, url: {no_local: true, allow_blank: true}
  validates :ord, uniqueness: { scope: :question_id,
    message: "two responses for the same questions may not have the same ord." }

  before_validation :ensure_author, :ensure_ord
  after_destroy :mend_ord

  has_many :votes
  accepts_nested_attributes_for :votes, allow_destroy: true

  belongs_to :question,
    inverse_of: :responses

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id,
    inverse_of: :responses

  has_one :poll,
    through: :question,
    source: :poll

  has_one :poll_author,
    through: :poll,
    source: :author

  def ensure_author
    self.author ||= self.question.poll.author
  end

  def ensure_ord
    responses = question.responses
    self.ord ||= ( responses.map(&:ord).compact.max || -1 ) + 1
    if self.question_id
      transaction do
        self.class.connection.execute(<<-SQL)
        SET CONSTRAINTS deferred_ord_and_question_id DEFERRED;
        UPDATE "responses" SET ord = ord + 1
        WHERE "responses"."id" IN (
          SELECT "responses"."id" FROM "responses"
          WHERE "responses"."question_id" = #{self.question_id} AND (ord >= #{self.ord})
          ORDER BY "responses"."ord" ASC
        );
        SQL
      end
    end
  end

  def mend_ord
    responses = question.responses
    self.ord ||= responses.count
    transaction do
      self.class.connection.execute(<<-SQL)
      SET CONSTRAINTS deferred_ord_and_question_id DEFERRED;
      UPDATE "responses" SET ord = ord - 1
      WHERE "responses"."id" IN (
        SELECT "responses"."id" FROM "responses"
        WHERE "responses"."question_id" = #{self.question_id} AND (ord > #{self.ord})
        ORDER BY "responses"."ord" ASC
      );
      SQL
    end
  end
end
