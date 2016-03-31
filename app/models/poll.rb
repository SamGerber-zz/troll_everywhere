# == Schema Information
#
# Table name: polls
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  author_id  :integer          not null
#  token      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ord        :integer
#

class Poll < ActiveRecord::Base
  validates :title, :author, :token, :ord, presence: true
  validates :token, uniqueness: true
  validates :ord, uniqueness: { scope: :author_id,
    message: "two polls by the same author may not have the same ord." }

  before_validation :ensure_token, :ensure_ord
  after_destroy :mend_ord

  def self.generate_token(length = 16)
    token = SecureRandom.urlsafe_base64(length)
    while Poll.find_by(token: token)
      token = SecureRandom.urlsafe_base64(length)
    end
    token
  end

  has_many :questions,
    -> { order :ord },
    inverse_of: :poll,
    dependent: :destroy

  accepts_nested_attributes_for :questions, allow_destroy: true

  has_many :responses,
    through: :questions,
    source: :responses,
    inverse_of: :poll

  has_many :votes,
    through: :responses,
    source: :votes,
    inverse_of: :poll

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id,
    inverse_of: :polls

  def ensure_token
    self.token ||= self.class.generate_token(4)
  end

  def ensure_ord
    polls = author.polls
    self.ord ||= (polls.map(&:ord).compact.max || -1) + 1
    if self.author_id
      transaction do
        self.class.connection.execute(<<-SQL)
        SET CONSTRAINTS deferred_ord_and_author_id DEFERRED;
        UPDATE "polls" SET ord = ord + 1
        WHERE "polls"."id" IN (
          SELECT "polls"."id" FROM "polls"
          WHERE "polls"."author_id" = #{self.author_id} AND (ord >= #{self.ord})
          ORDER BY "polls"."ord" ASC
        );
        SQL
      end
    end
  end

  def mend_ord
    polls = author.polls
    self.ord ||= polls.count
    transaction do
      self.class.connection.execute(<<-SQL)
      SET CONSTRAINTS deferred_ord_and_author_id DEFERRED;
      UPDATE "polls" SET ord = ord - 1
      WHERE "polls"."id" IN (
        SELECT "polls"."id" FROM "polls"
        WHERE "polls"."author_id" = #{self.author_id} AND (ord > #{self.ord})
        ORDER BY "polls"."ord" ASC
      );
      SQL
    end
  end
end
