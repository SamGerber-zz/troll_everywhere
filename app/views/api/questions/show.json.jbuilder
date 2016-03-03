json.partial! 'api/questions/question', question: @question
json.poll do
  json.partial! 'api/polls/poll', poll: @question.poll
end
json.responses do
  json.array! @question.responses do |response|
    json.partial! 'api/responses/response', response: response
    json.votes do
      json.array! response.votes do |vote|
        json.partial! 'api/votes/vote', vote: vote
      end
    end
  end
end
