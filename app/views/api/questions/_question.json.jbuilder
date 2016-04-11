json.id question.id
json.ord question.ord
json.title question.title
json.body question.body
json.image_url question.image_url
json.is_locked question.is_locked
json.is_active !!question.active_user
json.poll_id question.poll_id
questions = question.poll.questions
json.next_id questions[(question.ord + 1)%questions.length].id
json.prev_id questions[(question.ord - 1)%questions.length].id
json.created_at question.created_at
json.updated_at question.updated_at
