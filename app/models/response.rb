# == Schema Information
#
# Table name: responses
#
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  body        :string
#  image_url   :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Response < ActiveRecord::Base
  validates :question, presence: true
  validates :image_url, url: {no_local: true, allow_blank: true}

  has_many :votes,

  belongs_to :question

  has_one :poll,
    through: :question,
    source: :poll

  has_one :author,
    through: :poll,
    source: :author
end