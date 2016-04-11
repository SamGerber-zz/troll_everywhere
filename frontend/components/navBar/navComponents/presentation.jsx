/* React Libraries */
var React = require('react');
var SessionStore = require('../../../stores/sessionStore');


var presentationLink = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _activeQuestion: function (e) {
    e.preventDefault();
    var currentQuestionId = SessionStore.currentUser().active_question_id;
    var url_suffix = SessionStore.currentUser().url_suffix;
    if (currentQuestionId) {
      this.context.router.push('/questions/' + currentQuestionId);
    } else {
      this.context.router.push('/presentations/' + url_suffix);
    }
  },

  render: function() {
    return (
      <li>
        <a href="#" onClick={this._activeQuestion} >
          <span className="glyphicon glyphicon-blackboard" data-tip="Your currently active question."/>
        </a>
      </li>
    );
  }

});

module.exports = presentationLink;
