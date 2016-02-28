var React = require('react');
var PollFormActions = require('../../actions/pollFormActions');
var PollFormStore = require('../../stores/pollFormStore');
var ResponseFormSet = require('./responseFormSet');
var QuestionFormSet = require('./questionFormSet');

var PollForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getStateFromStore: function() {
    return (
      PollFormStore.getPoll()
    );
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  _updateTitle: function(e) {
    this.setState({title: e.target.value});
    PollFormActions.updatePoll(
      Object.assign(this.state, {title: e.target.value})
    );
  },

  _goToPolls: function() {
    this.context.router.push("/polls/");
  },

  _submitPoll: function(e) {
    e.preventDefault();
    PollFormActions.submitPollForm(
      this._goToPolls
    );
  },

  componentDidMount: function() {
    this.token = PollFormStore.addListener(this.getStateFromStore);
  },

  componentWillUnmount: function() {
    this.token.remove();
  },


  render: function() {
    if (this.state.questions) {
      var questions = this.state.questions.map(function(question, i) {
        return (
          <QuestionFormSet questionIndex={i} key={i}/>
         );
      });
    } else {
      questions = [];
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 center-block">
          <form className="new-poll-form">
            <label htmlFor='poll_title'>
              <span>Title: </span>
                <input type="text"
                       id="poll_title"
                       value={this.state.title}
                       placeholder="The title for your poll"
                       onChange={this._updateTitle}/>
            </label>
            <div className="well">
              {questions}
            </div>
            <button className="btn btn-primary" onClick={this._submitPoll}>
              Save!
            </button>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = PollForm;
