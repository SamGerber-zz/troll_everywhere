json.partial! 'api/votes/vote', vote: @vote
json.voter do
  json.partial! 'api/users/user', user: @vote.voter
end
json.response do
  json.partial! 'api/responses/response', response: @vote.response
end
