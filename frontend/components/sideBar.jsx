var React = require('react');
var SideBarIndex = require('./sideBarIndex');

var SideBar = React.createClass({

  render: function() {
    return (
      <nav className="poll-panel-side-bar">
        <a className="poll-panel-side-bar-link" href="#">New Poll</a>
        <SideBarIndex />
        <p>Pro Tip?</p>
      </nav>
    );
  }

});

module.exports = SideBar;
