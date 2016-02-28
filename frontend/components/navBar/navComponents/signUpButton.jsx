var React = require('react');

var SignUpButton = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _goToSignUp: function (e) {
    e.preventDefault();
    this.context.router.push('/signup');
  },

  render: function() {
    return (
      <li>
        <form className="navbar-form navbar-right" role="sign up" onSubmit={this._goToSignUp}>
          <button type="submit" className="btn btn-secondary">Sign Up</button>
        </form>
      </li>
    );
  }

});

module.exports = SignUpButton;
