/* React Libraries */
var React = require('react');

/* React Components */
var LoginLink = require('./navComponents/loginLink.jsx');
var SignUpButton = require('./navComponents/signUpButton.jsx');





var loggedOutNavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#logged-out-navbar"
                    aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="glyphicon glyphicon-option-horizontal"></span>
            </button>
            <a className="navbar-brand" href="/splash">TrollEverywhere</a>
          </div>
          <div className="collapse navbar-collapse" id="logged-out-navbar">
            <ul className="nav navbar-nav">
              <li>
                <a href="#">
                  Plans & Pricing
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li><a href="/splash">Take a Tour</a></li>
              <li><a href="#">Help & FAQ</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <LoginLink />
              <SignUpButton />
            </ul>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = loggedOutNavBar;
