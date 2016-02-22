# API Endpoints

## HTML API

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Polls

- `GET /api/polls`
  - polls index/search
  - accepts `polls_name` query param to list polls by search phrase
  - accepts pagination params (if I get there)
- `POST /api/polls`
- `GET /api/polls/:id`
- `PATCH /api/polls/:id`
- `DELETE /api/polls/:id`

### Questions

- `GET /api/questions`
- `POST /api/questions`
- `GET /api/questions/:id`
- `PATCH /api/questions/:id`
- `DELETE /api/questions/:id`
- `GET /api/questions/:id/notes`
  - index of all responses for a question
  - accepts pagination params (if I get there)

### Votes

- A question's tags will be included in the question show template
- `GET /api/votes`
  - includes query param for typeahead suggestions
- `POST /api/questions/:question_id/votes`: add tag to question by name
  - if question doesn't already exist, it will be created
- `DELETE /api/questions/:question_id/votes/:tag_name`: remove tag from question by
  name
