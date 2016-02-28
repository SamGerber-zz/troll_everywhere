var React = require('react');
var ReactDOM = require('react-dom');
var PollPanel = require('./pollPanel/pollPanel');
var Footer = require('./footer/footer');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div>
        <PollPanel />
        <Footer />
      </div>
    );
  }

});

module.exports = App;
