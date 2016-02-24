var React = require('react');
var LeftIndex = require('./leftIndex');
var RightIndex = require('./rightIndex');

var NavBar = React.createClass({

  render: function() {
    return (
      <nav className="main-navbar group">
        <LeftIndex />
        <RightIndex />
      </nav>
    );
  }

});

module.exports = NavBar;
