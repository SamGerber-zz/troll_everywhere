/* React Libraries */
var React = require('react');

/* React Flux Stores */
var SessionStore = require('../../../stores/sessionStore.js');

/* React Flux Action Creators */
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
    var name = SessionStore.currentUser().name;
    return (
      <li className="dropdown">
        <a href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false">
          {name}
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
          <li><a href="/settings" onClick={this._goToSettings}>Settings</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="/login" onClick={this._logOut}>Logout</a></li>
        </ul>
      </li>
    );
  }

});

module.exports = DropDown;
