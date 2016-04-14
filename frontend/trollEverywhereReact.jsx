var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var IndexRedirect = require('react-router').IndexRedirect;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Splash = require("./components/splash/splash");
var App = require("./components/app");
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
      pathname: '/welcome',
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
          <IndexRedirect to="/welcome" />
          <Route path="welcome" component={Splash}></Route>
          <Route path="polls" component={PollPanel} onEnter={requireAuth}></Route>
          <Route path="questions/:id" component={QuestionView} onEnter={requireAuth}></Route>
        </Route>
        <Route path="/presentations/:id" component={VoteForm}></Route>
        <Route path="/questions/:id/vote" component={VoteForm} onEnter={requireAuth}></Route>
      </Router>
    ), root);
  });
});
