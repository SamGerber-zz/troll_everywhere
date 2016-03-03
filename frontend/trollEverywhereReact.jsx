var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Splash = require("./components/splash/splash");
var App = require("./components/app");
var newPoll = require("./components/polls/pollForm.jsx");
var newQuestion = require("./components/questions/form.jsx");
var newResponse = require("./components/responses/form.jsx");
var newVote = require("./components/votes/form.jsx");
var LoginForm = require("./components/session/loginForm.jsx");
var SignUpForm = require("./components/session/signUpForm.jsx");
var SessionStore = require("./stores/sessionStore");
var SessionActions = require("./actions/sessionActions");
var VoteForm = require('./components/votes/voteForm.jsx');
var QuestionView = require('./components/questions/questionView.jsx');
var PollPanel = require('./components/pollPanel/pollPanel');
var Presentation = require('./components/presentation');

var root;



function requireAuth(nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  SessionActions.getCurrentUser(function(){
    root = document.getElementById("content");
    ReactDOM.render((
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SignUpForm}/>
          <Route path="splash" component={Splash}></Route>
          <Route path="login" component={LoginForm}></Route>
          <Route path="signup" component={SignUpForm}></Route>
          <Route path="polls" component={PollPanel} onEnter={requireAuth}></Route>
          <Route path="polls/new" component={newPoll} onEnter={requireAuth}></Route>
          <Route path="polls/:id/questions/new/" component={newQuestion} onEnter={requireAuth}></Route>
          <Route path="questions/:id" component={QuestionView}></Route>
          <Route path="questions/:id/responses/new/" component={newResponse} onEnter={requireAuth}></Route>
          <Route path="presentations/:id" component={QuestionView}></Route>
          <Route path="responses/:id/votes/new/" component={newVote} onEnter={requireAuth}></Route>
        </Route>
        <Route path="/questions/:id/vote" component={VoteForm} onEnter={requireAuth}></Route>
      </Router>
    ), root);
  });
});
