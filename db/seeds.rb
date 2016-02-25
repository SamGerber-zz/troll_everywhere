# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

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
