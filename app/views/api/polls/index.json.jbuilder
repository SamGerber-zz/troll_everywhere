json.array! @polls do |poll|
  json.partial! 'api/polls/poll', poll: poll
end
