var React = require('react');

var newPollLink = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _newPollForm: function (e) {
    e.preventDefault();
    this.context.router.push('/polls/new');
  },

  render: function() {
    return (
      <li><a href="" onClick={this._newPollForm} ><span className="glyphicon glyphicon-plus" /></a></li>
    );
  }

});

module.exports = newPollLink;
