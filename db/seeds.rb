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
user = User.create!(user_attributes)
poll_attributes = {}
poll_attributes[:author_id] = user.id
poll_attributes[:title] = "Sorting Algorithms"
poll = Poll.create(poll_attributes)
sorting_questions = [
  {
    title: "Bubble Sort - Time",
    body: "What is the TIME complexity of bubble sort?",
    responses: [
      "O(n)",
      "O(nLogn)",
      "O(n^2)"
    ]
  },
  {
    title: "Bubble Sort - Space",
    body: "What is the SPACE complexity of bubble sort?",
    responses: [
      "O(1)",
      "O(n)",
      "O(n^2)"
    ]
  },
  {
    title: "Merge Sort - Time",
    body: "What is the TIME complexity of merge sort?",
    responses: [
      "O(n)",
      "O(nLogn)",
      "O(n^2)",
    ]
  },
  {
    title: "Merge Sort - Space",
    body: "What is the SPACE complexity of merge sort?",
    responses: [
      "O(n)",
      "O(nLogn)",
      "O(n^2)"
    ]
  },
  {
    title: "Insertion Sort - Time",
    body: "What is the TIME complexity of insertion sort?",
    responses: [
      "O(n)",
      "O(nLogn)",
      "O(n^2)"
    ]
  },
  {
    title: "Insertion Sort - Space",
    body: "What is the SPACE complexity of insertion sort?",
    responses: [
      "O(1)",
      "O(n)",
      "O(n^2)"
    ]
  },
  {
    title: "Selection Sort - Time",
    body: "What is the TIME complexity of selection sort?",
    responses: [
      "O(n)",
      "O(nLogn)",
      "O(n^2)",
    ]
  },
  {
    title: "Selection Sort - Space",
    body: "What is the SPACE complexity of selection sort?",
    responses: [
      "O(1)",
      "O(n)",
      "O(n^2)"
    ]
  },
  {
    title: "Quick Sort - Time Sorted",
    body: "What is the TIME complexity of quick sort for a sorted array?",
    responses: [
      "O(n)",
      "O(nLogn)",
      "O(n^2)"
    ]
  },
  {
    title: "Quick Sort - Time Unsorted",
    body: "What is the TIME complexity of quick sort for an unsorted array?",
    responses: [
      "O(n)",
      "O(nLogn)",
      "O(n^2)"
    ]
  },
  {
    title: "Quick Sort - Space",
    body: "What is the SPACE complexity of quick sort?",
    responses: [
      "O(1)",
      "O(Logn)",
      "O(n)"
    ]
  }
]
sorting_questions.each do |question|
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

poll_attributes[:title] = "Abstract Data Types"
poll = Poll.create(poll_attributes)
data_structures = [
  {
    title: "Constant Time Access",
    body: "Which of the following Abstract Data Types have constant time access?",
    responses: [
      "Array",
      "Linked List",
      "Binary Search Tree"
    ]
  },
  {
    title: "Constant Time Search",
    body: "Which of the following Abstract Data Types have constant time search?",
    responses: [
      "Stack",
      "Hash Table",
      "Binary Search Tree"
    ]
  },
  {
    title: "Worst Insertion",
    body: "Which of these Abstract Data Types has the worst insertion time complexity?",
    responses: [
      "Array",
      "Linked List",
      "Binary Search Tree"
    ]
  },
  {
    title: "Worst Deletion",
    body: "Which of these Abstract Data Types has the worst deletion time complexity?",
    responses: [
      "Array",
      "Stack",
      "Binary Search Tree"
    ]
  },
  {
    title: "Max Heap Max",
    body: "What is the time complexity to find the max of a max heap?",
    responses: [
      "O(1)",
      "O(Logn)",
      "O(n)"
    ]
  },
  {
    title: "Max Heap Min",
    body: "What is the time complexity to find the MIN of a max heap?",
    responses: [
      "O(Logn)",
      "O(n)",
      "O(nLogn)"
    ]
  }
]
data_structures.each do |question|
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
