# TrollEverywhere

[TrollEverywhere][heroku] is a polling app that allows public speakers to engage their audience for instant feedback.

[heroku]: https://trolleverywhere.com/

## The Stack

The app is being served from **Heroku**. Data is stored in a **Postgres** DB, with large assets being hosted on Cloudinary.

A **Rails API** exposes several endpoints, supporting the front end.

Dependencies are managed with Bundler, npm and Webpack.

The front end is built with **ReactJS**, loosely following Facebook's **Flux** pattern.

## A Nested Schema

The schema comprises nested one-to-many relationships:

Users -> Polls -> Questions -> Responses -> Votes
Users -> Cast Votes

This proved to be an interesting challenge and afforded me the chance to get my hands dirty with Rails' `accepts_nested_attributes_for`.

## Ordered Sublists

I wanted to give users the ability to maintain a specific order to their data.

## Minimum Viable Product

TrollEverywhere is a web application inspired by Poll Everywhere,
built using Ruby on Rails and React.js. TrollEverywhere allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete polls
- [ ] Create, read, edit, and delete questions
- [ ] Create, read, edit, and delete responses
- [ ] Control start and stop of polling
- [ ] Receive a unique URL where others may respond to a poll
- [ ] Vote on responses
- [ ] Review votes

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Poll Model, API, and basic APIUtil (1.5 days)

**Objective:** Polls can be created, read, edited and destroyed through
the API.

- [ ] create `Poll` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for polls (`API::PollsController`)
- [ ] jBuilder views for polls
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Polls can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `PollsIndex`
  - [ ] `NoteIndexItem`
  - [ ] `NoteForm`
- [ ] save Polls to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Groups (1 day)

**Objective:** Polls belong to Groups, and can be viewed by group.

- [ ] create `Group` model
- build out API, Flux loop, and components for:
  - [ ] Group CRUD
  - [ ] adding polls requires a group
  - [ ] moving polls to a different group
  - [ ] viewing notes by group
- Use CSS to style new views

Phase 3 adds organization to the Polls. Polls belong to a Group,
which has its own `Index` view.

### Phase 6: Votes (1.5 days)

**Objective:** Poll questions can be voted on.

- [ ] create `Vote` model
- build out API, Flux loop, and components for:
  - [ ] fetching Votes for response
  - [ ] adding votes to response
- [ ] Style new elements

### Phase 7: Allow Complex Styling in Polls (0.5 days)

**objective:** Enable complex styling of polls.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Websockets!
- [ ] Alternate URL for respondents
- [ ] User groups
- [ ] History
- [ ] Twitter and sms integration
- [ ] Improved question types

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
