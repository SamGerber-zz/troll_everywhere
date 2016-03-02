/* React Libraries */
var React = require('react');

/* React Components */
var LeftIndex = require('./navComponents/leftIndex');
var RightIndex = require('./navComponents/rightIndex');




var VoteNavBar = React.createClass({

  render: function() {
    return (
      <nav className="main-navbar group navbar-fixed-top">
        <LeftIndex />
        <RightIndex />
      </nav>
    );
  }

});

module.exports = VoteNavBar;
