# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user_attributes = {}
user_attributes[:email] = "guest@example.com"
user_attributes[:username] = "Esteemed_Guest"
user_attributes[:password] = "asdasdasd"
user = User.create(user_attributes)
poll_attributes = {}
poll_attributes[:author_id] = user.id
poll_attributes[:title] = "Would you rather..."
poll = Poll.create(poll_attributes)
would_you_rather_questions = [
  {
    title: "Secretions",
    body: "Would you rather only sweat eggnog or only cry spaghetti sauce?",
    responses: [
      "sweat eggnog",
      "cry spaghetti sauce"
    ]
  },
  {
    title: "Dragons",
    body: "Would you rather be a dragon or own a dragon?",
    responses: [
      "be the dragon",
      "own the dragon"
    ]
  },
  {
    title: "Cage",
    body: "Would you rather spend the rest of your life without access to the internet, or perpetually within two feet of Nicolas Cage?",
    responses: [
      "without internet",
      "with Nic"
    ]
  },
  {
    title: "Recovery",
    body: "Would you rather find everything you’ve ever lost, or remember everything you’ve ever forgotten?",
    responses: [
      "find everything",
      "remember everything"
    ]
  },
  {
    title: "Film Come True",
    body: "Would you rather be in a real version of The Walking Dead or Jurassic Park?",
    responses: [
      "The Walking Dead",
      "Jurassic Park"
    ]
  },
  {
    title: "Amnesia",
    body: "Would you rather forget who you were or who everyone else was?",
    responses: [
      "forget who I am",
      "forget who everyone else is"
    ]
  },
  {
    title: "Remote",
    body: "Would you rather have a rewind button or a pause button on your life?",
    responses: [
      "rewind",
      "pause"
    ]
  },
  {
    title: "Babel",
    body: "Would you rather be able to talk with the animals or speak all foreign languages?",
    responses: [
      "talk with the animals",
      "foreign languages"
    ]
  },
  {
    title: "Longevity",
    body: "Would you rather win the lottery or live twice as long?",
    responses: [
      "the lottery",
      "live twice as long"
    ]
  },
  {
    title: "Heroes",
    body: "Would you rather be Batman or Spiderman?",
    responses: [
      "Batman",
      "Spiderman"
    ]
  },
  {
    title: "Stuck",
    body: "Would you rather be stuck on a broken ski lift or in a broken elevator?",
    responses: [
      "ski lift",
      "elevator"
    ]
  },
  {
    title: "Blurt",
    body: "Would you rather always say everything on your mind or never speak again?",
    responses: [
      "say everything",
      "never speak"
    ]
  },
]
would_you_rather_questions.each do |question|
  question_attributes={}
  question_attributes[:poll_id] = poll.id
  question_attributes[:title] = question[:title]
  question_attributes[:body] = question[:body]
  question_attributes[:is_locked] = false
  questionDB = Question.create(question_attributes)
  question[:responses].each do |response|
    response_attributes = {}
    response_attributes[:question_id] = questionDB.id
    response_attributes[:author_id] = user.id
    response_attributes[:body] = response
    response = Response.create(response_attributes)
  end
end

poll_attributes[:title] = "Who would win in a fight..."
poll = Poll.create(poll_attributes)
who_would_win_in_a_fight = [
  {
    title: "Boxers",
    body: "Who would win in a fight? Floyd Mayweather or Manny Pacquiao?",
    responses: [
      "Floyd Mayweather",
      "Manny Pacquiao"
    ]
  },
  {
    title: "Search Engines",
    body: "Who would win in a fight? Google or Bing?",
    responses: [
      "Google",
      "Bing"
    ]
  },
  {
    title: "Beasts",
    body: "Who would win in a fight? A gorilla or a polar bear?",
    responses: [
      "The gorilla",
      "The polar bear"
    ]
  },
  {
    title: "Wizards",
    body: "Who would win in a fight? Gandalf or Harry Potter?",
    responses: [
      "Gandalf",
      "Harry Potter"
    ]
  }
]
who_would_win_in_a_fight.each do |question|
  question_attributes={}
  question_attributes[:poll_id] = poll.id
  question_attributes[:title] = question[:title]
  question_attributes[:body] = question[:body]
  question_attributes[:is_locked] = false
  questionDB = Question.create(question_attributes)
  question[:responses].each do |response|
    response_attributes = {}
    response_attributes[:question_id] = questionDB.id
    response_attributes[:author_id] = user.id
    response_attributes[:body] = response
    response = Response.create(response_attributes)
  end
end


10.times do
  user_attributes = {}
  name = Faker::Name.name
  user_attributes[:email] = Faker::Internet.safe_email(name.split.first)
  user_attributes[:username] = Faker::Internet.user_name(name)
  user_attributes[:password] = "asdasdasd"
  user = User.create(user_attributes)

  rand(4).times do
    poll_attributes = {}
    poll_attributes[:author_id] = user.id
    poll_attributes[:title] = Faker::Company.bs
    poll = Poll.create(poll_attributes)

    (1 + rand(6)).times do
      question_attributes = {}
      question_attributes[:poll_id] = poll.id
      question_attributes[:title] = Faker::StarWars.quote
      question_attributes[:body] = Faker::Hipster.sentences(1).first + "?"
      question_attributes[:is_locked] = false
      question = Question.create(question_attributes)

      (2 + rand(6)).times do
        response_attributes = {}
        response_attributes[:question_id] = question.id
        response_attributes[:author_id] = user.id
        response_attributes[:body] = Faker::Superhero.power
        response = Response.create(response_attributes)
      end
    end
  end
end

500.times do
  vote_attributes = {}
  vote_attributes[:response_id] = Response.all.sample.id
  vote_attributes[:voter_id] = User.all.sample.id
  vote_attributes[:is_up_vote] = [true, false].sample
  Vote.create!(vote_attributes)

end
