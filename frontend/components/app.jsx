/* React Libraries */
var React = require('react');
var ReactDOM = require('react-dom');
var ReactTooltip = require('react-tooltip');

/* React Components */
var LoggedOutNavBar = require('./navBar/loggedOutNavBar');
var LoggedInNavBar = require('./navBar/loggedInNavBar');
var PollPanel = require('./pollPanel/pollPanel');

/* React Flux Stores */
var SessionStore = require("../stores/sessionStore");

/* React Flux Action Creators */
var SessionActions = require("../actions/sessionActions");



var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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
    var user = SessionStore.currentUser(),
        navBar;
    if (this.state.loggedIn) {
      navBar = <LoggedInNavBar user={user} location={this.props.location}/>;
    } else {
      navBar = <LoggedOutNavBar user={user} location={this.props.location}/>;
    }

    return (
      <div>
        <ReactTooltip class="tooltip" type="info" delayShow={250}/>
        {navBar}
        {this.props.children}
      </div>
    );
  }

});

module.exports = App;
