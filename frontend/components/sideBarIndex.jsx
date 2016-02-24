var React = require('react');
var SideBarItem = require('./sideBarIndex');

var sideBarItems = [
  "My Polls",
  "Account Polls"
];

var SideBarIndex = React.createClass({

  render: function() {

    var SideBarItems = sideBarItems.map(function(el, i) {
      return (
        <li key={i} className="poll-panel-side-bar-item">
          <a className="side-bar-link" href="#">{el}</a>
        </li>
      );
    });

    return (
      <ul className="poll-panel-side-bar-index">
        {SideBarItems}
      </ul>
    );
  }

});

module.exports = SideBarIndex;
