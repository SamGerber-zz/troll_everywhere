var React = require('react');
// var LeftItem = require('./leftItem');

var leftItems = [
  "TrollEverywhere",
  "New Poll",
  "Polls",
  "Participants",
  "Reports"
];

var LeftIndex = React.createClass({

  render: function() {
    var LeftItems = leftItems.map(function(el, i) {
      return (
        <menuitem key={i} className="nav-item">
          <a className="nav-link" href="#">{el}</a>
        </menuitem>
      );
    }, this);

    return (
      <menu className="main-navbar-left-menu">
        {LeftItems}
      </menu>
    );
  }

});

module.exports = LeftIndex;
