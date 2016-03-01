var React = require('react');

var SideBar = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="col-sm-3 col-md-2 sidebar">
        <ul className="nav nav-sidebar">
          <li className="active">
            <a href="#" onClick={function(e){
                e.preventDefault();
                this.context.router.push("/polls");
              }.bind(this)}>
              My Polls
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li><a href="#">Account Polls</a></li>
        </ul>
        <ul className="nav nav-sidebar">
          <div className="well bg-info">
            <h4>Pro Tip:</h4>
            <p>If you say you're cooler than me, does that make me hotter than you?</p>
          </div>
        </ul>
      </div>
    );
  }

});

module.exports = SideBar;
