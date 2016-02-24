var React = require('react');
var PollItem = require('./pollItem');

var pollItems = [
  "Ungrouped",
  "Group 1"
];

var PollIndex = React.createClass({

  render: function() {

    var PollItems = pollItems.map(function(el, i) {
      return (
        <li key={i} className="poll-item">
          <PollItem group={el} />
        </li>
      );
    }, this);


    return (
      <ul className="poll-groups-index group">
        {PollItems}
      </ul>
    );
  }

});

module.exports = PollIndex;
