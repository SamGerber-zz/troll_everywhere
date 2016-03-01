var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./app');
var LoggedOutNavBar = require('./navBar/loggedOutNavBar');
var LoggedInNavBar = require('./navBar/loggedInNavBar');
var SessionStore = require("../stores/sessionStore");
var SessionActions = require("../actions/sessionActions");
var PollActions = require("../actions/pollActions");

var App2 = React.createClass({

  getInitialState: function() {
    return {
      loggedIn: SessionStore.isUserLoggedIn()
    };
  },

  updateSession: function (loggedIn) {
    this.setState({
      loggedIn: SessionStore.isUserLoggedIn()
    });
  },

  componentWillMount: function() {
    this.token = SessionStore.addListener(this.updateSession);
    SessionActions.loginUser();
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  render: function() {
    var user = SessionStore.currentUser();
    var navBar = this.state.loggedIn ? <LoggedInNavBar user={user}/> : <LoggedOutNavBar user={user}/>;
    return (
      <div>
        {navBar}
        {this.props.children}
      </div>
    );
  }

});

module.exports = App2;
