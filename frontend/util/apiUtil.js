var SessionStore = require('../stores/sessionStore.js');

var runAllCallbacks = function (callbacks, response) {
  for (var i = 0; i < callbacks.length; i++) {
    callbacks[i] && callbacks[i](response); //TODO this is messy
  }
};


module.exports = {

  fetchAllPolls: function (userId, callbacks) {
    $.ajax({
      url: "/api/users/" + SessionStore.currentUser().id + "/polls/",
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  fetchSinglePoll: function (id, callbacks) {
    $.ajax({
      url: "/api/polls/" + id,
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  createPoll: function (poll, callbacks) {
    $.ajax({
      url: "/api/users/" + SessionStore.currentUser().id + "/polls",
      method: "POST",
      data: {poll: poll},
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  fetchAllQuestions: function (pollId, callbacks) {
    $.ajax({
      url: "/api/polls/" + pollId + "/questions/",
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  fetchAllQuestionsForPollWithId: function (pollId, callbacks) {
    $.ajax({
      url: "/api/polls/" + pollId + "/questions/",
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  fetchSingleQuestion: function (questionId, callbacks) {
    $.ajax({
      url: "/api/questions/" + questionId,
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  createQuestion: function (pollId, question, callbacks) {
    $.ajax({
      url: "/api/polls/"+pollId+"/questions",
      method: "POST",
      data: {question: question},
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  fetchAllResponses: function (questionId, callbacks) {
    $.ajax({
      url: "/api/questions/" + questionId + "/responses/",
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  fetchSingleResponse: function (questionId, callbacks) {
    $.ajax({
      url: "/api/responses/" + questionId,
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  createResponse: function (questionId, response, callbacks) {
    $.ajax({
      url: "/api/questions/"+questionId+"/responses",
      method: "POST",
      data: {response: response},
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  fetchAllVotes: function (responseId, callbacks) {
    $.ajax({
      url: "/api/responses/" + responseId + "/votes/",
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  fetchSingleVote: function (responseId, callbacks) {
    $.ajax({
      url: "/api/responses/" + responseId,
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  createVote: function (responseId, vote, callbacks) {
    $.ajax({
      url: "/api/responses/"+responseId+"/votes",
      method: "POST",
      data: {vote: vote},
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  loginUser: function (user, callbacks) {
    $.ajax({
      url: "/api/session",
      method: "POST",
      data: {user: user},
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  getCurrentUser: function (callbacks) {
    $.ajax({
      url: "/api/session",
      method: "GET",
      data: {},
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  createUser: function (user, callbacks) {
    $.ajax({
      url: "/api/users",
      method: "POST",
      data: {user: user},
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  },

  logout: function (callbacks) {
    $.ajax({
      url: "/api/session",
      method: "DELETE",
      data: {},
      success: function (message) {
        runAllCallbacks(callbacks, message);
      }
    });
  }
};
