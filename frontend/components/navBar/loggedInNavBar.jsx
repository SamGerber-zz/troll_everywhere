var React = require('react');
var DropDown = require('./navComponents/dropDown.jsx');
var NewPoll = require('./navComponents/newPoll.jsx');
var Polls = require('./navComponents/polls.jsx');

var loggedOutNavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#logged-out-navbar" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="glyphicon glyphicon-option-horizontal"></span>
            </button>
            <a className="navbar-brand" href="#">TrollEverywhere</a>
          </div>

          <div className="collapse navbar-collapse" id="logged-out-navbar">
            <ul className="nav navbar-nav">
              <NewPoll />
              <Polls />
              <li><a href="#">Take a Tour</a></li>
              <li><a href="#">Help & FAQ</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <DropDown />
            </ul>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = loggedOutNavBar;
