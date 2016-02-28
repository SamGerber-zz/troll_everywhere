var React = require('react');
var SessionActions = require('../../actions/sessionActions');

var signUpForm = React.createClass({
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
      this.context.router.replace('/');
    }
  },

  _user: function() {
    return ({
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
    });
  },

  registerUser: function (e) {
    e.preventDefault();
    SessionActions.registerUser(this._user(), this._callback);
  },

  render: function() {
    return (
      <div className="container">
        <form className="form-signup">
          <h2 className="form-signup-heading">Sign up</h2>
          <label htmlFor="inputEmail" className="sr-only">Username</label>
          <input type="text" id="inputUsername" ref="username" className="form-control" placeholder="Username" required autofocus />
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" ref="email" className="form-control" placeholder="Email address" required />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" ref="password" className="form-control" placeholder="Password" required />
            <button className="btn btn-lg btn-primary btn-block" onClick={this.registerUser}>Sign up</button>
        </form>
      </div>
    );
  }

});

module.exports = signUpForm;
