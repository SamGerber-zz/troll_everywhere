var React = require('react');

var middleItems = [

];

var MiddleIndex = React.createClass({

  render: function() {
    var MiddleItems = middleItems.map(function(el, i) {
      return (
        <li className="nav-item" key={i}>
          <a className="navbar-brand" href="#">{el}</a>
        </li>
      );
    }, this);

    return (
      <ul className="nav navbar-nav">
        {MiddleItems}
      </ul>
    );
  }

});

module.exports = MiddleIndex;
