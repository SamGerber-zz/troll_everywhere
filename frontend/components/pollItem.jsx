var React = require('react');
var PollGroup = require('./pollGroup');

var PollIndex = React.createClass({

  render: function() {

    return (
      <PollGroup group={this.props.group}>Poll Group !</PollGroup>
    );
  }

});

module.exports = PollIndex;
