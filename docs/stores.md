# Flux Stores

### QuestionStore

Holds all persisted poll data.

##### Actions:
- `receiveAllQuestions`
- `receiveSingleQuestion`
- `removeQuestion`

##### Listeners:
- `QuestionsIndex` (passes to `QuestionIndexItem` via props)
- `QuestionDetail`

### QuestionFormStore

Holds un-persisted question data to send to the API.

##### Actions:
- `receiveQuestionFormParams`

##### Listeners:
- `QuestionForm`

### PollStore

Holds all persisted poll data.

##### Actions:
- `receiveAllPolls`
- `receiveSinglePoll`
- `removePoll`

##### Listeners:
- `PollIndex`

### PollFormStore

Holds un-persisted poll data to send to the API.

##### Actions:
- `receivePollFormParams`

##### Listeners:
- `PollForm`

### SearchStore

Holds search parameters to send to the API.

##### Actions:
- `receiveSearchParams`

##### Listeners:
- `SearchIndex`

### SearchSuggestionStore

Holds typeahead suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchSuggestions`
