var React = require('react');

var GroupUngroup = React.createClass({

  render: function() {
    return (
      <div className="btn-group">
        <button type="button" className="btn btn-default">Group</button>
        <button type="button" className="btn btn-default">Ungroup</button>
      </div>
    );
  }

});

module.exports = GroupUngroup;
