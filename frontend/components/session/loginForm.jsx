var React = require('react');
var SessionActions = require('../../actions/sessionActions');

var loginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      errors: []
    };
  },

  _callback: function(message) {
    if (message.errors) {
      return this.setState({ errors: message.errors });
    }

    var location = this.props.location;

    if (location.state && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname);
    } else {
      this.context.router.replace('/polls');
    }
  },

  _user: function() {
    return ({
      username: this.refs.username.value,
      password: this.refs.password.value
    });
  },

  loginUser: function (e) {
    e.preventDefault();
    SessionActions.loginUser(this._user(), this._callback);
  },

  loginAsGuest: function (e) {
    e.preventDefault();

    var guestUser = {
      username: 'Esteemed_Guest',
      password: 'asdasdasd'
    };

    SessionActions.loginUser(guestUser, this._callback);
  },

  render: function() {
    return (
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email or username:</label>
          <input type="text" ref="username" id="inputUsername" className="form-control" placeholder="Username or Email Address" required autofocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block" onClick={this.loginUser}>Sign in</button>
          <button className="btn btn-lg btn-primary btn-block" onClick={this.loginAsGuest}>Guest</button>
        </form>
      </div>
    );
  }

});

module.exports = loginForm;
