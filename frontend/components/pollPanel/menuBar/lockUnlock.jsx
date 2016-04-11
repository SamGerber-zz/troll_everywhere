/* React Libraries */
var React = require('react');

/* React Flux Stores */
var QuestionFiltersStore = require('../../../stores/questionFilterStore.js');

/* React Flux Action Creators */
var QuestionActions = require("../../../actions/questionActions");




var LockUnlock = React.createClass({

  _onLockClick: function(e){
    e.preventDefault();
    console.log(QuestionFiltersStore.checkedQuestionIds());
    QuestionActions.lockQuestions(QuestionFiltersStore.checkedQuestionIds());
  },
  _onUnlockClick: function(e){
    e.preventDefault();
    QuestionActions.unlockQuestions(QuestionFiltersStore.checkedQuestionIds());
  },

  render: function() {
    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-default"
                data-tip="Lock selected questions"
                onClick={this._onLockClick}>🔒Lock</button>
        <button type="button"
                className="btn btn-default"
                data-tip="Unlock selected questions"
                onClick={this._onUnlockClick}>🔓Unlock</button>
      </div>
    );
  }

});

module.exports = LockUnlock;
