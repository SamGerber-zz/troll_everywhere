# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  username           :string           not null
#  email              :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  url_suffix         :string           not null
#  created_at         :datetime
#  updated_at         :datetime
#  active_question_id :integer
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
    !user && user = self.find_by(email: credentials[:username])
    user if user && user.is_password?(credentials[:password])
  end

  attr_reader :password

  has_many :polls,
    foreign_key: :author_id,
    inverse_of: :author

  has_many :questions,
    through: :polls,
    source: :questions,
    inverse_of: :author

  has_many :responses,
    through: :questions,
    source: :responses,
    inverse_of: :author

  has_many :votes,
    foreign_key: :voter_id,
    inverse_of: :voter

  has_many :others_votes,
    through: :responses,
    source: :votes,
    inverse_of: :poll_author

  belongs_to :active_question,
    class_name: "Question",
    foreign_key: :active_question_id,
    inverse_of: :active_for_user

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
    BCrypt::Password.new(password_digest).is_password?(String(password))
  end
end
