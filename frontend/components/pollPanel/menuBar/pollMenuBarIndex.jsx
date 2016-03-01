var React = require('react');

var pollMenuBarItems = [
  "✓",
  "🔒Lock",
  "🔓Unlock",
  "> Group",
  "Ungroup",
  "Slides",
  "Report",
  "Clear",
  "Delete",
  "Edit",
  "Screenshot"
];

var PollMenuBarIndex = React.createClass({

  render: function() {
    var PollMenuBarItems = pollMenuBarItems.map(function(el, i) {
      return (
        <li key={i} className="poll-panel-menu-bar-item">
          <a className="nav-link" href="#">{el}</a>
        </li>
      );
    }, this);

    return (
      <ul className="poll-panel-menu-bar-menu">
        {PollMenuBarItems}
      </ul>
    );
  }

});

module.exports = PollMenuBarIndex;
