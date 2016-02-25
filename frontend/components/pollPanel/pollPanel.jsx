var React = require('react');
var SideBar = require('../sideBar/sideBar');
var PollMenuBar = require('../menuBar/pollMenuBar');
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
