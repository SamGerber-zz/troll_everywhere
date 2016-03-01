var React = require('react');

var LockUnlock = React.createClass({

  render: function() {
    return (
      <div className="btn-group">
        <button type="button" className="btn btn-default">🔒Lock</button>
        <button type="button" className="btn btn-default">🔓Unlock</button>
      </div>
    );
  }

});

module.exports = LockUnlock;
