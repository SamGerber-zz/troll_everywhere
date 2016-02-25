json.partial! 'api/questions/question', question: @question
json.poll do
  json.partial! 'api/polls/poll', poll: @question.poll
end
json.responses do
  json.array! @question.responses do |response|
    json.partial! 'api/responses/response', response: response
  end
end
