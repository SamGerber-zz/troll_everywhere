# API Endpoints

## HTML API

### Users

- `GET /users/new`
- `GET /users/:id`
- `GET /users/:id/edit`
- `POST /users`
- `PATCH /users`
- `DELETE /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Users

- `GET /api/users/:id`
- `GET /api/users/new`
- `POST /api/users`
- `GET /api/users/edit/:id`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`

### Polls

- `GET /api/polls`
  - polls index/search
  - accepts `polls_name` query param to list polls by search phrase
  - accepts pagination params (if I get there)
- `GET /api/polls/:id`
- `GET /api/polls/:id/questions`
- `GET /api/polls/new`
- `POST /api/polls`
- `GET /api/polls/edit/:id`
- `PATCH /api/polls/:id`
- `DELETE /api/polls/:id`

### Questions

- `GET /api/questions`
- `GET /api/questions/:id`
- `PATCH /api/questions/:id`
- `DELETE /api/questions/:id`
- `POST /api/questions`
- `GET /api/questions/:id/responses`
  - index of all responses for a question
  - accepts pagination params (if I get there)

### Votes
- `GET /api/votes`
- `GET /api/votes/:id`
- `PATCH /api/votes/:id`
- `DELETE /api/votes/:id`
- `POST /api/votes`
- `GET /api/votes/
