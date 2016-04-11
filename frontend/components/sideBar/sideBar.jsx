var React = require('react');

var SideBar = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    var tips = [
      'Locking a question prevents users from being able to respond. This can be useful for limiting polling duration or preventing distraction, while still reviewing the results.',
      'Make it easier for mobile users to weigh in by showing the QR code on the presentation page.',
      'Want your audience to think for themselves? Toggle the statistics off to see what they really think!',
      'Looking for a specific question? Use the question filter in the upper right to search for it!',
      'Locking just the right questions is easy with the dynamic selector in the top left.',
      'Want to see what your audience sees? Click on the link on the presentation view to open the respondent site in a new tab!'
    ]

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
        </ul>
        <ul className="nav nav-sidebar">
          <div className="well bg-info">
            <h4>Pro Tip:</h4>
            <p>{tips[Math.floor(tips.length*Math.random())]}</p>
          </div>
        </ul>
      </div>
    );
  }

});

module.exports = SideBar;
