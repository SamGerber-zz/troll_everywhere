var React = require('react');
var VoteActions = require('../../actions/voteActions');
var DropDown = require('../navBar/navComponents/dropDown');

var NavBar = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#logged-in-navbar" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="glyphicon glyphicon-option-horizontal"></span>
            </button>
            <a className="navbar-brand" href="#">TrollEverywhere</a>
          </div>
          <div className="col-xs-0 col-sm-0 col-md-6 col-lg-6">
            <div className="nav navbar-nav navbar-brand text-center">
              Something something Presentation
            </div>
          </div>
          <div className="collapse navbar-collapse col-xs-3 col-sm-3 col-md-3 col-lg-3 pull-right" id="logged-in-navbar">
            <ul className="nav navbar-nav navbar-right">
              <DropDown />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
