var React = require('react');
var PollItem = require('./pollItem');


var PollIndex = React.createClass({

  render: function() {
    var PollItems = this.props.polls.map(function(poll) {
      return (
        <li key={poll.id} className="poll-item">
          <PollItem pollId={poll.id} />
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
