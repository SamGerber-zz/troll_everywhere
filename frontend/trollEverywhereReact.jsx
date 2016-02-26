var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var App = require("./components/app");
var newPoll = require("./components/polls/form.jsx");
var newQuestion = require("./components/questions/form.jsx");
var newResponse = require("./components/responses/form.jsx");
var newVote = require("./components/votes/form.jsx");


document.addEventListener("DOMContentLoaded", function(){
  var root = document.getElementById("content");
  ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/polls" component={App}></Route>
      <Route path="/polls/new" component={newPoll}></Route>
      <Route path="/polls/:id/questions/new/" component={newQuestion}></Route>
      <Route path="/questions/:id/responses/new/" component={newResponse}></Route>
      <Route path="/responses/:id/votes/new/" component={newVote}></Route>
    </Router>
  ), root);
});
