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
#

class Question < ActiveRecord::Base
  validates :title, :poll, presence: true
  validates :image_url, url: {no_local: true, allow_blank: true}

  has_many :responses

  has_many :votes,
    through: :responses,
    source: :votes

  belongs_to :poll

  has_one :author,
    through: :poll,
    source: :author
end
