var React = require('react');
// var RightItem = require('./rightItem');

var rightItems = [
  "Pricing & Upgrades",
  "Help",
  "New Features"
];

var RightIndex = React.createClass({

  render: function() {
    var RightItems = rightItems.map(function(el, i) {
      return (
        <menuitem key={i} className="nav-item">
          <a className="nav-link" href="#">{el}</a>
        </menuitem>
      );
    }, this);

    return (
      <menu className="main-navbar-right-menu">
        {RightItems}
        <menuitem className="nav-item nav-dropdown">
          <a className="nav-link" href="#">Username</a>
          <menu className="nav-dropdown-menu group">
            <menuitem className="nav-dropdown-item">
              <a className="nav-link" href="#">Settings</a>
            </menuitem>
            <menuitem className="nav-dropdown-item">
              <a className="nav-link" href="#">Log Out</a>
            </menuitem>
          </menu>
        </menuitem>
      </menu>
    );
  }

});

module.exports = RightIndex;
