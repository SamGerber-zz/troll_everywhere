var React = require('react');

var leftItems = [
  "Polls",
  "Participants",
  "Reports"
];

var LeftIndex = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    var LeftItems = leftItems.map(function(el, i) {
      return (
        <li key={i} className="nav-item">
          <a className="nav-link" href="#">{el}</a>
        </li>
      );
    }, this);

    return (
      <ul className="main-navbar-left-menu">
        <li key={3} className="nav-item">
          <a className="nav-link" href="#">TrollEverywhere</a>
        </li>
        <li key={4} className="nav-item" onClick={function(e){
          this.context.router.push("/polls/new/");
        }.bind(this)}>
          <a className="nav-link" href="#">New Poll</a>
        </li>
        {LeftItems}
      </ul>
    );
  }

});

module.exports = LeftIndex;
