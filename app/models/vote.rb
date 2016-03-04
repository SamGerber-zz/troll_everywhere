# == Schema Information
#
# Table name: votes
#
#  id          :integer          not null, primary key
#  response_id :integer          not null
#  voter_id    :integer          not null
#  is_up_vote  :boolean          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Vote < ActiveRecord::Base
  validates :response, presence: true
  validates :voter, presence: true
  validates :is_up_vote,
    inclusion: {in:  [true, false],
      message: "should be true or false."}

  validate :question_is_not_locked

  belongs_to :response,
    inverse_of: :votes

  belongs_to :voter,
    class_name: "User",
    foreign_key: :voter_id,
    inverse_of: :votes

  has_one :question,
    through: :response,
    source: :question,
    inverse_of: :votes

  has_one :poll,
    through: :question,
    source: :poll,
    inverse_of: :votes

  has_one :poll_author,
    through: :poll,
    source: :author,
    inverse_of: :others_votes

  def question_is_not_locked
    errors[:base] << "Cannot vote on locked question" if question.is_locked
  end
end
