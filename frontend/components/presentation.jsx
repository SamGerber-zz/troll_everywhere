/* React Libraries */
var React = require('react');

var Presentation = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div>Yo!</div>
    );
  }

});

module.exports = Presentation;
