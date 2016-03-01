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

module UsersHelper
end
