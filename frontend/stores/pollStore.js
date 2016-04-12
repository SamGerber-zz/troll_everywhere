var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var PollConstants = require('../constants/pollConstants.js');
var SessionConstants = require('../constants/sessionConstants.js');
var PollStore = new Store(AppDispatcher);

var _polls = {};


var resetPolls = function (polls) {
  _polls = {};
  polls.forEach(function (poll) {
    _polls[poll.id] = poll;
  });
};

var emptyStore = function() {
  return _polls = {};
}

var updatePoll = function (poll) {
  _polls[poll.id] = poll;
};

PollStore.all = function () {
  var polls = Object.keys(_polls).map(function(id){
    return _polls[id];
  });

  return polls;
};

PollStore.find = function (id) {
  return _polls[id];
};

PollStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.LOGGED_OUT:
      emptyStore();
      PollStore.__emitChange();
      break;
    case PollConstants.POLLS_RECEIVED:
      resetPolls(payload.polls);
      PollStore.__emitChange();
      break;
    case PollConstants.POLL_RECEIVED:
      updatePoll(payload.poll);
      PollStore.__emitChange();
      break;
  }
};

module.exports = PollStore;
