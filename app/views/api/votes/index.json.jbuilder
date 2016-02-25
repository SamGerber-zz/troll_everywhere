json.array! @votes do |vote|
  json.partial! 'api/votes/vote', vote: vote
  json.voter do
    json.partial! 'api/users/user', user: vote.voter
  end
end
