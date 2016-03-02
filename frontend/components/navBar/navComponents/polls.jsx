/* React Libraries */
var React = require('react');





var pollsLink = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _pollsIndex: function (e) {
    e.preventDefault();
    this.context.router.push('/polls');
  },

  render: function() {
    return (
      <li>
        <a href="/polls" onClick={this._pollsIndex} >
          <span className="glyphicon glyphicon-list" />
        </a>
      </li>
    );
  }

});

module.exports = pollsLink;
