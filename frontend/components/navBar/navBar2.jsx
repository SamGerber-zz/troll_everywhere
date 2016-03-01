var React = require('react');
var LeftIndex = require('./leftIndex');
var RightIndex = require('./rightIndex');

var NavBar = React.createClass({

  render: function() {
    return (
      <nav className="main-navbar group navbar-fixed-top">
        <LeftIndex />
        <RightIndex />
      </nav>
    );
  }

});

module.exports = NavBar;
