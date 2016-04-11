var React = require('react');
var update = require('react/lib/update');

var Modal = require('boron/DropModal');

var SessionActions = require('../../../actions/sessionActions');


var SignUpModal = React.createClass({

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
          errors: {},
          isUsernameOK: true,
          usernameHints: [],
          foundTakenUsernames: [],
          isEmailOK: true,
          emailHints: [],
          foundTakenEmails: [],
          isPasswordOK: true,
          passwordHints: []
      };
    },

    _callback: function(message) {
      if (message.errors) {
          var newState = { errors: message.errors };
          if(Boolean(message.errors['username'])){
              newState['isUsernameOK'] = false;
              newState['usernameHints'] = message.errors['username'];
              if (message.errors['username'].includes('has already been taken')){
                  this.setState(update(this.state, {
                      foundTakenUsernames: {
                          $push: [this.refs.username.value]
                      }
                  }));
              }
          }
          if(Boolean(message.errors['email'])){
              newState['isEmailOK'] = false;
              newState['emailHints'] = message.errors['email'];
              if (message.errors['email'].includes('has already been taken')){
                  this.setState(update(this.state, {
                      foundTakenEmails: {
                          $push: [this.refs.email.value]
                      }
                  }));
              }
          }
          if(Boolean(message.errors['password'])){
              newState['isPasswordOK'] = false;
              newState['passwordHints'] = message.errors['password'];
          }

        return this.setState(newState);
      }

      var location = this.props.location;

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname);
      } else {
        this.context.router.replace('/polls/new');
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

    loginAsGuest: function (e) {
      e.preventDefault();

      var guestUser = {
        username: 'Esteemed_Guest',
        password: 'asdasdasd'
      };

      SessionActions.loginUser(guestUser, this.context.router.replace.bind(null, '/polls/'));
    },

    showModal: function(e){
        e.preventDefault();
        this.setState(this.getInitialState());
        this.refs.modal.show();
    },
    hideModal: function(e){
        e.preventDefault();
        this.refs.modal.hide();
    },

    onUsernameChange: function(e) {
        e.preventDefault();
        var hints = this.state.usernameHints;
        var isOK  = this.state.isUsernameOK;
        var isBlank = isTaken = true;
        var foundTakenUsernames  = this.state.foundTakenUsernames;
        if (e.target.value.length){
            hints = hints.filter(function(hint) {
            	return hint != "can't be blank"
            });
            isBlank = false;
        } else if (!hints.includes("can't be blank")) {
            hints.push("can't be blank");
            isBlank = true;
        }
        if (!foundTakenUsernames.includes(e.target.value)){
            hints = hints.filter(function(hint) {
            	return hint != "has already been taken"
            });
            isTaken = false;
        } else if (!hints.includes("has already been taken")) {
            hints.push("has already been taken");
            isTaken = true;
        }
        this.setState({
            usernameHints: hints,
            isUsernameOK: !(isBlank || isTaken)
        });
    },
    onEmailChange: function(e) {
        e.preventDefault();
        var hints = this.state.emailHints;
        var foundTakenEmails = this.state.foundTakenEmails;
        var isOK  = this.state.isEmailOK;
        var isBlank = isMalformed = isTaken = true;
        var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value.length){
            hints = hints.filter(function(hint) {
            	return hint != "can't be blank"
            });
            isBlank = false;
        } else if (!hints.includes("can't be blank")) {
            hints.push("can't be blank");
            isBlank = true;
        }
        if (emailRegEx.test(e.target.value)) {
            hints = hints.filter(function(hint) {
                return hint != "is invalid"
            });
            isMalformed = false;
        } else if (!hints.includes("is invalid")) {
            hints.push("is invalid");
            isMalformed = true;
        }
        if (!foundTakenEmails.includes(e.target.value)){
            hints = hints.filter(function(hint) {
                return hint != "has already been taken"
            });
            isTaken = false;
        } else if (!hints.includes("has already been taken")) {
            hints.push("has already been taken");
            isTaken = true;
        }
        this.setState({
            emailHints: hints,
            isEmailOK: !(isBlank || isMalformed || isTaken)
        });
    },
    onPasswordChange: function(e) {
        e.preventDefault();
        var hints = this.state.passwordHints;
        var isOK  = this.state.isPasswordOK;
        if (e.target.value.length > 5){
            hints = hints.filter(function(hint) {
            	return hint != "is too short (minimum is 6 characters)"
            });
            isOK = true;
        } else if (!hints.includes("is too short (minimum is 6 characters)")) {
            hints.push("is too short (minimum is 6 characters)");
            isOK = false;
        }
        this.setState({
            passwordHints: hints,
            isPasswordOK: isOK
        });
    },

    render: function() {
        var errors = this.state.errors;
        var errorMessage;
        var messages;
        var messageList = [];
        var usernameClass, emailClass, passwordClass;
        var usernameMessage = "Sorry! Username " + this.state.usernameHints.join(' and ') + '.';
        var emailMessage = "Sorry! Email " + this.state.emailHints.join(' and ') + '.';
        var passwordMessage = "Sorry! Password " + this.state.passwordHints.join(' and ') + '.';
        var hasErrors = !(this.state.isEmailOK && this.state.isUsernameOK && this.state.isPasswordOK);

        return (
            <li>
                <form className="navbar-form navbar-right" role="sign up">
                  <button onClick={this.showModal} className="btn btn-secondary">Sign Up</button>
                </form>
                <Modal ref="modal">
                  <form className="form-signup">
                    <h2 className="form-signup-heading">Sign up</h2>
                    <div className={"form-group" + (this.state.isUsernameOK ? '' : ' has-error' )} >
                        <label htmlFor="inputUsername" className="sr-only">Username</label>
                        <input type="text"
                               id="inputUsername"
                               ref="username"
                               className="form-control"
                               placeholder="Username"
                               onChange={this.onUsernameChange}
                               required autofocus />
                           <span className="help-block">{this.state.isUsernameOK ? '' : usernameMessage}</span>
                    </div>
                    <div className={"form-group" + (this.state.isEmailOK ? '' : ' has-error' )}>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email"
                               id="inputEmail"
                               ref="email"
                               className="form-control"
                               placeholder="Email address"
                               onChange={this.onEmailChange}
                               required />
                           <span className="help-block">{this.state.isEmailOK ? '' : emailMessage}</span>
                    </div>
                    <div className={"form-group" + (this.state.isPasswordOK ? '' : ' has-error' )}>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password"
                               id="inputPassword"
                               ref="password"
                               className="form-control"
                               placeholder="Password"
                               onChange={this.onPasswordChange}
                               required />
                           <span className="help-block">{this.state.isPasswordOK ? '' : passwordMessage}</span>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block"
                            onClick={this.registerUser}
                            disabled={hasErrors}>Sign up</button>
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.loginAsGuest}>Guest</button>
                  </form>
                </Modal>
            </li>
        );
    }
});


module.exports = SignUpModal;
