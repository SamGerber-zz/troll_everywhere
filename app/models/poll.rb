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
#

class Poll < ActiveRecord::Base
  validates :title, :author, :token, presence: true
  validates :token, uniqueness: true

  before_validation :ensure_token

  def self.generate_token(length = 16)
    token = SecureRandom.urlsafe_base64(length)
    while Poll.find_by(token: token)
      token = SecureRandom.urlsafe_base64(length)
    end
    token
  end

  has_many :questions

  has_many :responses,
    through: :questions,
    source: :responses

  has_many :votes,
    through: :responses,
    source: :votes

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id

  def ensure_token
    self.token ||= self.class.generate_token(4)
  end
end
