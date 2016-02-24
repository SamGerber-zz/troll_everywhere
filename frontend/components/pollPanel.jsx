var React = require('react');
var SideBar = require('./sideBar');
var PollMenuBar = require('./pollMenuBar');
var PollIndex = require('./pollIndex');

var PollPanel = React.createClass({

  render: function() {
    return (
      <div className="poll-panel group">
          <SideBar />
          <PollMenuBar />
          <PollIndex />
      </div>
    );
  }

});

module.exports = PollPanel;
