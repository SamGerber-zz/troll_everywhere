var React = require('react');

var Poll = React.createClass({

  render: function() {

    return (
      <div className="poll-panel-poll group">
        <ul className="poll-panel-poll-left">
          <li className="poll-panel-poll-type">💡</li>
          <li className="poll-panel-poll-checkbox">
            <input type="checkbox" className="poll-panel-poll-checkbox"/>
          </li>
          <li className="poll-panel-poll-name">{this.props.poll}</li>
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
            <a className="poll-panel-poll-link" href="#">8 Responses</a>
          </li>
          <li className="poll-panel-poll-name">🔒</li>
        </ul>
      </div>

    );
  }

});

module.exports = Poll;
