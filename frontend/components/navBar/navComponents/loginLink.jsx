/* React Libraries */
var React = require('react');




var LoginLink = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _goToLogin: function (e) {
    e.preventDefault();
    this.context.router.push('/login');
  },

  render: function() {
    return (
      <li><a href="/login" onClick={this._goToLogin}>Log in</a></li>
    );
  }

});

module.exports = LoginLink;
