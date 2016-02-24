var React = require('react');

var Poll = React.createClass({

  render: function() {

    return (
      <p>A Poll!{this.props.poll}</p>
    );
  }

});

module.exports = Poll;
