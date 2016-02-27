var React = require('react');
// var SideBarItem = require('./sideBarItem');

var sideBarItems = [
  "Account Polls"
];

var SideBarIndex = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {

    var SideBarItems = sideBarItems.map(function(el, i) {
      return (
        <li key={i} className="poll-panel-side-bar-item">
          <a className="side-bar-link" href="#">{el}</a>
        </li>
      );
    });

    return (
      <ul className="poll-panel-side-bar-index">
        <li key={1} className="poll-panel-side-bar-item" onClick={function(e){
            e.preventDefault();
            this.context.router.push("/polls/");
          }.bind(this)}>
          <a className="side-bar-link" href="#">My Polls</a>
        </li>
        {SideBarItems}
      </ul>
    );
  }

});

module.exports = SideBarIndex;
