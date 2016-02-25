json.array! @responses do |response|
  json.partial! 'api/responses/response', response: response
  json.author do
    json.partial! 'api/users/user', user: response.author
  end
end
