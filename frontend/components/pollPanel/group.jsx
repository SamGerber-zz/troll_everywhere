var React = require('react');

var Group = React.createClass({

  render: function() {

    return (
      <div className="poll-panel-poll-group group">
        <ul>
          <li className="poll-panel-poll-group-expand">▼</li>
          <li className="poll-panel-poll-group-checkbox">
            <input type="checkbox" className="poll-panel-poll-group-checkbox"/>
          </li>
          <li className="poll-panel-poll-group-name">{this.props.group}</li>
        </ul>
        <span className="poll-panel-poll-group-count">2 polls</span>
      </div>
    );
  }

});

module.exports = Group;
