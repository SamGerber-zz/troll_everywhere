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

  has_many :questions,
    inverse_of: :poll

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
end
