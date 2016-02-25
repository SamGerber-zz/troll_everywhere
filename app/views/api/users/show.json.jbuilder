json.partial! 'api/users/user', user: @user
json.polls do
  json.array! @user.polls do |poll|
    json.partial! 'api/polls/poll', poll: poll
  end
end
