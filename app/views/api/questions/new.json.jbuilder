responses = [
  Response.new(body: "yes", ord: 0),
  Response.new(body: "no", ord: 1)
]

json.partial! 'api/questions/form', question: @question
json.responses do
  json.array! responses do |response|
    json.partial! 'api/responses/response', response: response
    json.votes response.votes.length
  end
end
