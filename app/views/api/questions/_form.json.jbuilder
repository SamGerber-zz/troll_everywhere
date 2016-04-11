json.id @question.id
json.poll_id @question.poll_id
json.ord @question.ord
json.title @question.title
json.body @question.body
json.image_url @question.image_url
json.responses do
  json.array! @question.responses do |response|
    json.partial! 'api/responses/response', response: response
    json.votes response.votes.length
  end
end
