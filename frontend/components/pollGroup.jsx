var React = require('react');
var Poll = require('./poll');
var Group = require('./group');

var polls = [
  "poll 1",
  "poll 2"
];

var PollGroup = React.createClass({

  render: function() {
    var Polls = polls.map(function(el, i){
      return (
        <li key={i} className="poll-panel-poll" >
          <Poll poll={el} />
        </li>
      );
    });

    return (
      <ul className="poll-panel-poll-index group">
        <Group group={this.props.group} />
        {Polls}
      </ul>
    );
  }

});

module.exports = PollGroup;
