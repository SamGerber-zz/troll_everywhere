var React = require('react');
var SideBarIndex = require('./sideBarIndex');

var SideBar = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <nav className="poll-panel-side-bar">
        <a className="poll-panel-side-bar-link" href="#" onClick={function(e){
            e.preventDefault();
            this.context.router.push("/polls/new/");
          }.bind(this)}>
          New Poll
        </a>
        
        <SideBarIndex />
        <p>Pro Tip?</p>
      </nav>
    );
  }

});

module.exports = SideBar;
