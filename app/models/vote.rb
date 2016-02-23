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
    inclusion: {:in => [true, false]},
    message: "should be true or false."

  belongs_to :response

  belongs_to :voter

  has_one :question,
    through: :response,
    source: :question

  has_one :poll,
    through: :question,
    source: :poll

  has_one :poll_author,
    through: :poll,
    source: :author
end
