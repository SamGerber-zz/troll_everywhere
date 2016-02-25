var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./navBar');
var PollPanel = require('./pollPanel');
var Footer = require('./footer');

var App = React.createClass({

  render: function() {
    return (
      <div>
        <NavBar />
        <PollPanel />
        <Footer />
      </div>
    );
  }

});

document.addEventListener("DOMContentLoaded", function(){
  var root = document.getElementById("content");
  ReactDOM.render(
    <App />,
    root
  );
});

module.exports = App;
