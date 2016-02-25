var React = require('react');

var rightItems = [
  "Pricing & Upgrades",
  "Help",
  "New Features"
];

var RightIndex = React.createClass({

  render: function() {
    var RightItems = rightItems.map(function(el, i) {
      return (
        <li key={i} className="nav-item">
          <a className="nav-link" href="#">{el}</a>
        </li>
      );
    }, this);

    return (
      <ul className="main-navbar-right-menu">
        {RightItems}
        <li className="nav-item nav-dropdown">
          <a className="nav-link" href="#">Username</a>
          <ul className="nav-dropdown-menu group">
            <li className="nav-dropdown-item">
              <a className="nav-link" href="#">Settings</a>
            </li>
            <li className="nav-dropdown-item">
              <a className="nav-link" href="#">Log Out</a>
            </li>
          </ul>
        </li>
      </ul>
    );
  }

});

module.exports = RightIndex;
