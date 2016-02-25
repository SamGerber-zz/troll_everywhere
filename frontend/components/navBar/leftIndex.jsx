var React = require('react');

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
        <li key={i} className="nav-item">
          <a className="nav-link" href="#">{el}</a>
        </li>
      );
    }, this);

    return (
      <ul className="main-navbar-left-menu">
        {LeftItems}
      </ul>
    );
  }

});

module.exports = LeftIndex;
