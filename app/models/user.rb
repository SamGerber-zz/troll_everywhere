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

  validates :is_guest,
    inclusion: {in:  [true, false],
      message: "should be true or false."}

  before_validation  :ensure_url_suffix, :ensure_guest, :ensure_session_token

  def self.generate_token(length = 16)
    SecureRandom.urlsafe_base64(length)
  end

  def self.find_by_credentials(credentials)
    user = self.find_by(username: credentials[:username])
    !user && user = self.find_by(email: credentials[:username])
    user if user && user.is_password?(credentials[:password])
  end

  def self.new_guest
    begin
      create! do |user|
        username = [
          "guest",
          Faker::Number.number(8)
        ].join
        url_suffix = [
          Faker::Commerce.color,
          Faker::Team.creature,
          Faker::Number.number(4)
        ].join
        user.username = username
        user.url_suffix = url_suffix
        user.email = "#{username}@example.com"
        user.password = "dsadsadsa"
        user.is_guest = true
      end
    rescue
      retry
    end
  end

  attr_reader :password

  has_many :polls,
    -> { order :ord },
    foreign_key: :author_id,
    inverse_of: :author,
    dependent: :destroy

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
    inverse_of: :voter,
    dependent: :destroy

  has_many :others_votes,
    through: :responses,
    source: :votes

  belongs_to :active_question,
    class_name: "Question",
    foreign_key: :active_question_id,
    inverse_of: :active_user

  def reset_session_token!
    self.session_token = self.class.generate_token
    self.save!
    session_token
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_token
  end

  def ensure_url_suffix
    self.url_suffix ||= self.username.blank? ? self.class.generate_token : self.username
  end

  def password=(password)
    @password = password
    self.password_digest = String(BCrypt::Password.create(String(password)))
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(String(password))
  end

  def name
    guest? ? "Guest" : username
  end

  def guest?
    is_guest
  end

  def ensure_guest
    if self.is_guest.nil?
      self.is_guest = false
    else
       self.is_guest
    end
    "this string is not false, so the before_validations will continue running"
  end

  def move_to(user)
    polls.update_all(author_id: user.id)
    responses.update_all(author_id: user.id)
    votes.update_all(voter_id: user.id)
    user.active_question_id = active_question_id
  end
end
