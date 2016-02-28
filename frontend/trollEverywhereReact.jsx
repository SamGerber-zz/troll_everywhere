var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var App = require("./components/app");
var App2 = require("./components/app2");
var newPoll = require("./components/polls/pollForm.jsx");
var newQuestion = require("./components/questions/form.jsx");
var newResponse = require("./components/responses/form.jsx");
var newVote = require("./components/votes/form.jsx");
var LoginForm = require("./components/session/loginForm.jsx");
var SignUpForm = require("./components/session/signUpForm.jsx");
var SessionStore = require("./stores/sessionStore");
var SessionActions = require("./actions/sessionActions");



function requireAuth(nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}


SessionActions.getCurrentUser(function(){
  // document.addEventListener("DOMContentLoaded", function() {
    var root = document.getElementById("content");

    ReactDOM.render((
      <Router history={browserHistory}>
        <Route path="/" component={App2}>
          <Route path="login" component={LoginForm}></Route>
          <Route path="signup" component={SignUpForm}></Route>
          <Route path="polls" component={App} onEnter={requireAuth}></Route>
          <Route path="polls/new" component={newPoll} onEnter={requireAuth}></Route>
          <Route path="polls/:id/questions/new/" component={newQuestion} onEnter={requireAuth}></Route>
          <Route path="questions/:id/responses/new/" component={newResponse} onEnter={requireAuth}></Route>
          <Route path="responses/:id/votes/new/" component={newVote} onEnter={requireAuth}></Route>
        </Route>
      </Router>
    ), root);
  // });
});
