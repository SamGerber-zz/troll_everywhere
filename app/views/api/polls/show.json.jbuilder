json.partial! 'api/polls/poll', poll: @poll
json.author do
  json.partial! 'api/users/user', user: @poll.author
end
json.questions do
  json.array! @poll.questions do |question|
    json.partial! 'api/questions/question', question: question
    json.responses do
      json.array! question.responses do |response|
        json.partial! 'api/responses/response', response: response
        json.votes do
          json.array! response.votes do |vote|
            json.partial! 'api/votes/vote', vote: vote
          end
        end

      end
    end
  end
end
