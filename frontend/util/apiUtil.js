var runAllCallbacks = function (callbacks, response) {
  for (var i = 0; i < callbacks.length; i++) {
    callbacks[i](response);
  }
};

module.exports = {

  fetchAllPolls: function (userId, callbacks) {
    $.ajax({
      url: "api/users/" + userId + "/polls/",
      success: function (response) {
        runAllCallbacks(callbacks, response);
      }
    });
  },

  fetchSinglePoll: function (id, callbacks) {
    $.ajax({
      url: "api/poll/" + id,
      success: function (response) {
        runAllCallbacks(callbacks, response);
      }
    });
  },

  createPoll: function (poll, callbacks) {
    $.ajax({
      url: "api/polls",
      method: "POST",
      data: {poll: poll},
      success: function (response) {
        runAllCallbacks(callbacks, response);
      }
    });
  },

  fetchAllQuestions: function (pollId, callbacks) {
    $.ajax({
      url: "api/polls/" + pollId + "/questions/",
      success: function (response) {
        runAllCallbacks(callbacks, response);
      }
    });
  },

  fetchSingleQuestion: function (questionId, callbacks) {
    $.ajax({
      url: "api/question/" + questionId,
      success: function (response) {
        runAllCallbacks(callbacks, response);
      }
    });
  },

  createQuestion: function (pollId, question, callbacks) {
    $.ajax({
      url: "api/polls/"+pollId+"/questions",
      method: "POST",
      data: {question: question},
      success: function (response) {
        runAllCallbacks(callbacks, response);
      }
    });
  }
};
