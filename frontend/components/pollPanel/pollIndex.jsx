var React = require('react');
var PollItem = require('./pollItem');


var PollIndex = React.createClass({

  render: function() {
    var PollItems = this.props.polls.map(function(poll) {
      return (
        <PollItem key={poll.id} pollId={poll.id} />
      );
    }, this);


    return (
      <ul className="list-group">
        {PollItems}
      </ul>
    );
  }

});

module.exports = PollIndex;
