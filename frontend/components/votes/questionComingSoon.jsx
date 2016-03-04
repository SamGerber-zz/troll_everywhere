var React = require('react');

var QuestionDisplay = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div>
        <h3>Welcome to {this.props.hostName+"\'"}s presentation</h3>
        <p>As soon as {this.props.hostName} displays a poll, we'll update this area to give you the voting options.
Easy as pie. Just hang tight, you're ready to go.</p>
      </div>
    );
  }

});

module.exports = QuestionDisplay;
