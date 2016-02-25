json.partial! 'api/responses/response', response: @response
json.question do
  json.partial! 'api/questions/question', question: @response.question
end
json.votes do
  json.array! @response.votes do |vote|
    json.partial! 'api/votes/vote', vote: vote
  end
end
