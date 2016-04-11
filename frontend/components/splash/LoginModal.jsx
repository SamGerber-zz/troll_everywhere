var React = require('react');
var Modal = require('boron/DropModal');

var SessionActions = require('../../actions/sessionActions');


var LoginModal = React.createClass({

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

    showModal: function(e){
        e.preventDefault();
        this.setState({ errors: [] });
        this.refs.modal.show();
    },
    hideModal: function(e){
        e.preventDefault();
        this.refs.modal.hide();
    },

    render: function() {
        var errors = this.state.errors;
        var errorMessage;
        if (errors.length) {
            errorMessage = (
                <div className="alert alert-danger" role="alert">
                    <h4><span className="glyphicon glyphicon-alert" aria-hidden="true"></span> Errors:</h4>
                    <ul>{
                        Object.keys(errors).map( function(key) {
                            return (<li>{errors[key]}</li>);
                        })}
                    </ul>
                </div>
            );
        } else {
            errorMessage = '';
        }

        return (
            <span>
                <button type="button"
                        onClick={this.showModal}
                        className="btn btn-info btn-lg splash-btn">Login</button>
                <Modal ref="modal">
                    <form className="form-signin">
                      <h2 className="form-signin-heading">Please sign in</h2>
                      {errorMessage}
                      <label htmlFor="inputEmail" className="sr-only">Email or username:</label>
                      <input type="text" ref="username" id="inputUsername" className="form-control" placeholder="Username or Email Address" required autofocus />
                      <label htmlFor="inputPassword" className="sr-only">Password</label>
                      <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required />
                      <button className="btn btn-lg btn-primary btn-block" onClick={this.loginUser}>Sign in</button>
                      <button className="btn btn-lg btn-primary btn-block" onClick={this.loginAsGuest}>Guest</button>
                    </form>
                </Modal>
            </span>
        );
    }
});


module.exports = LoginModal;
