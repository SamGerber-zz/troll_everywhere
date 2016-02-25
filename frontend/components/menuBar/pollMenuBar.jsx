var React = require('react');
var PollMenuBarIndex = require('./pollMenuBarIndex');
var PollSearch = require('./pollSearch');

var NavBar = React.createClass({

  render: function() {
    return (
        <nav className="poll-panel-menu-bar group">
          <PollMenuBarIndex />
          <PollSearch />
        </nav>
    );
  }

});

module.exports = NavBar;
