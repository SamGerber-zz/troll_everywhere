json.user do
  json.id user.id
  json.username user.username
  json.email user.email
  json.url_suffix user.url_suffix
  json.created_at user.created_at
  json.updated_at user.updated_at
end
