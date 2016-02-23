# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
url_suffix      | string    | not null, indexed, unique

## surveys
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null

## polls
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
author_id   | integer   | not null, foreign key (references users), indexed
survey_id   | integer   | foreign key (references users), indexed
token       | string    | not null, indexed, unique

## questions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
poll_id     | integer   | not null, foreign key (references polls), indexed
title       | string    | not null
body        | string    |
image_url   | string    |

## responses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key (references questions), indexed
body        | string    |
image_url   | string    |

## votes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
response_id | string    | not null, foreign key (references responses), indexed
direction   | string(1) | not null, in ('U', 'D')
