var React = require('react');

var Question = React.createClass({

  _votes: function() {
    var votes = 9;
    // this.props.question.responses.forEach(function (response){
    //   votes += response.votes.length;
    // });
    return votes;
  },

  render: function() {

    return (
      <div className="poll-panel-poll group">
        <ul className="poll-panel-poll-left">
          <li className="poll-panel-poll-type">💡</li>
          <li className="poll-panel-poll-checkbox">
            <input type="checkbox" className="poll-panel-poll-checkbox"/>
          </li>
          <li className="poll-panel-poll-name">{this.props.question.title}</li>
        </ul>
        <ul className="poll-panel-poll-right">
          <li className="poll-panel-poll-edit">
            <a className="poll-panel-poll-link" href="#">edit</a>
          </li>
          <li className="poll-panel-poll-copy">
            <a className="poll-panel-poll-link" href="#">copy</a>
          </li>
          <li className="poll-panel-poll-share">
            <a className="poll-panel-poll-link" href="#">share</a>
          </li>
          <li className="poll-panel-poll-responses">
            <a className="poll-panel-poll-link" href="#">{this._votes()} Votes</a>
          </li>
          <li className="poll-panel-poll-name">🔒</li>
        </ul>
      </div>

    );
  }

});

module.exports = Question;
