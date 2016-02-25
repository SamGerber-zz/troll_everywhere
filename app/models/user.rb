# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  url_suffix      :string           not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true

  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i

  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  validates :session_token, presence: true, uniqueness: true

  validates :url_suffix, presence: true, uniqueness: true

  before_validation :ensure_session_token, :ensure_url_suffix

  def self.generate_token(length = 16)
    SecureRandom.urlsafe_base64(length)
  end

  def self.find_by_credentials(credentials)
    user = self.find_by(username: credentials[:username])
    user if user && user.password_digest
  end

  attr_reader :password

  has_many :polls,
    foreign_key: :author_id

  has_many :questions,
    through: :polls,
    source: :questions

  has_many :responses,
    through: :questions,
    source: :responses

  has_many :votes,
    foreign_key: :voter_id


  def reset_session_token!
    self.session_token = self.class.generate_token
    self.save!
    session_token
  end

  def ensure_session_token
    self.session_token ||= reset_session_token!
  end

  def ensure_url_suffix
    self.url_suffix ||= self.class.generate_token(4)
  end

  def password=(password)
    @password = password
    self.password_digest = String(BCrypt::Password.create(String(password)))
  end

  def is_password?(password)
    BCrypt::Password.create(password_digest).is_password?(String(password))
  end
end
