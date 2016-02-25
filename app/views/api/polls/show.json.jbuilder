json.partial! 'api/polls/poll', poll: @poll
json.author do
  json.partial! 'api/users/user', user: @poll.author
end
json.questions do
  json.array! @poll.questions do |question|
    json.partial! 'api/questions/question', question: question
  end
end
