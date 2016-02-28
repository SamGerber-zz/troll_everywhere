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
#

class Response < ActiveRecord::Base
  validates :question, presence: true
  validates :author, presence: true
  validates :image_url, url: {no_local: true, allow_blank: true}

  before_validation :ensure_author

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
end
