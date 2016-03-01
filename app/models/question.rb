# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  poll_id    :integer          not null
#  title      :string           not null
#  body       :string
#  image_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  is_locked  :boolean          not null
#

class Question < ActiveRecord::Base
  validates :title, :poll, presence: true
  validates :image_url, url: {no_local: true, allow_blank: true}
  validates :is_locked,
    inclusion: {in:  [true, false],
      message: "should be true or false."}

  before_validation :ensure_locked


  has_many :responses,
    inverse_of: :question
  accepts_nested_attributes_for :responses, allow_destroy: true

  has_many :votes,
    through: :responses,
    source: :votes,
    inverse_of: :question

  belongs_to :poll,
    inverse_of: :questions


  has_one :author,
    through: :poll,
    source: :author,
    inverse_of: :questions

  has_one :active_for_user,
    class_name: "User",
    foreign_key: :active_question_id,
    inverse_of: :active_question

  def is_active?
    !!active_for_user
  end

    private
    def ensure_locked
      self.is_locked = true unless [true, false].include?(self.is_locked)
    end
end
