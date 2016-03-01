var React = require('react');
var SessionStore = require('../../../stores/sessionStore.js');
var SessionActions = require('../../../actions/sessionActions.js');

var DropDown = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _goToSettings: function (e) {
    e.preventDefault();
    this.context.router.push('/settings');
  },

  _logOut: function (e) {
    e.preventDefault();
    SessionActions.logout(this.context.router.push.bind(this, '/login'));
  },

  render: function() {
    var username = SessionStore.currentUser().username;
    return (
      <li className="dropdown">
         <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{username}<span className="caret"></span></a>
         <ul className="dropdown-menu">
           <li><a href="#" onClick={this._goToSettings}>Settings</a></li>
           <li role="separator" className="divider"></li>
           <li><a href="#" onClick={this._logOut}>Logout</a></li>
         </ul>
       </li>
    );
  }

});

module.exports = DropDown;
