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

    return (
      <ul className="nav nav-sidebar">
        <li className="active">
          <a href="#" onClick={function(e){
              e.preventDefault();
              this.context.router.push("/polls/");
            }.bind(this)}>
            My Polls
            <span className="sr-only">(current)</span>
          </a>
        </li>
        <li><a href="#">Account Polls</a></li>
      </ul>
      <ul className="nav nav-sidebar">
        <p class="bg-info">Pro Tip?</p>
      </ul>
      <ul className="nav nav-sidebar">
        <li><a href="">Nav item again</a></li>
        <li><a href="">One more nav</a></li>
        <li><a href="">Another nav item</a></li>
      </ul>
    );
  }

});

module.exports = SideBarIndex;
