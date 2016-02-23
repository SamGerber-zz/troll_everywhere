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

  has_many :questions

  has_many :responses,
    through: :questions,
    source: :responses

  has_many :votes,
    through: :responses,
    source: :votes

  belongs_to :author,
    className: "User",
    foreign_key: :author_id
end
