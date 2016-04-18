var React = require('react');
var LoginModal = require('./LoginModal')
var SignUpModal = require('./SignUpModal')
var SessionActions = require('../../actions/sessionActions')
var tour = require('../../tour/tour')

var Splash = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  onTryItClick: function(e){
      e.preventDefault();

      var guestUser = {
        username: 'Esteemed_Guest',
        password: 'asdasdasd'
      };

      SessionActions.loginUser(guestUser, this.context.router.replace.bind(null, '/polls/'));
  },

  _startTour: function(e){
    tour.start();
  },

  render: function() {
    return (
        <div>
        	<div id="headerwrap">
                <ul className="splash-slideshow">
                  <li>
                    <span>Image 01</span>
                  </li>
                  <li>
                    <span>Image 02</span>
                  </li>
                  <li>
                    <span>Image 03</span>
                  </li>
                </ul>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6 landing-header">
                        <h1>TrollEverywhere</h1>
                        <h3>Easy Audience Participation.</h3>
                        <LoginModal location={this.props.location}/>
                        <SignUpModal location={this.props.location}/>
                        <button type="button" onClick={this.onTryItClick} className="btn btn-info btn-lg splash-btn" id='tour-2'>Try it</button>
                        <button type="button" onClick={this._startTour} className="btn btn-info btn-lg splash-btn" id='tour-1'>Tour</button>
                      </div>{/* /col-lg-6 */}
                      <div className="col-lg-6">
                    </div>{/* /col-lg-6 */}
                  </div>{/* /row */}
                </div>{/* /container */}

        	</div>{/* /headerwrap */}


        	<div className="container">
        		<div className="row mt centered">
        			<div className="col-lg-6 col-lg-offset-3">
        				<h1>Engaging Your Audience<br/>Has Never Been Easier.</h1>
        				<h3>Stop worrying what your audience is thinking! Use TrollEverywhere to give your audience a voice, keeping your finger on the pulse at all times.</h3>
        			</div>
        		</div>{/* /row */}

        		<div className="row mt centered">
        			<div className="col-lg-3">
                <img className="img-responsive center-block" src="http://res.cloudinary.com/samgerber/image/upload/b_rgb:eee,c_lpad,h_300,w_310/v1461003839/question_oyba8f.gif" alt="" />
        				<h4>1 - Write a Question</h4>
        				<p>Write out your question and give people a few options to choose between.</p>
        			</div>{/*/col-lg-4 */}

        			<div className="col-lg-3">
                <img className="img-responsive center-block" src="http://res.cloudinary.com/samgerber/image/upload/b_rgb:eee,c_mpad,h_300,w_310/v1461003856/opening_question_qjd0ds.gif" alt="" />
        				<h4>2 - Share a Link</h4>
        				<p>Share your unique link or QR code.</p>

        			</div>{/*/col-lg-4 */}

        			<div className="col-lg-3">
                <img className="img-responsive center-block" src="http://res.cloudinary.com/samgerber/image/upload/c_limit,h_300,w_310/v1461009218/voting_mobile_mdpq3g.gif" alt="" />
                <h4>3 - Your Audience Votes</h4>
        				<p>People can cast their votes on their phones or computers using your unique link.</p>

        			</div>{/*/col-lg-4 */}
        			<div className="col-lg-3">
                <img className="img-responsive center-block" src="http://res.cloudinary.com/samgerber/image/upload/b_rgb:eee,c_lpad,h_300,w_310/v1461003848/votes_in_n46lxh.gif" alt="" />
                <h4>4 - Get Results!</h4>
        				<p>Watch the results start to roll in!</p>

        			</div>{/*/col-lg-4 */}
        		</div>{/* /row */}
        	</div>{/* /container */}


        	<div className="container">
        		<footer className="splash-footer">
        		<div className="row centered">
        			<div className="col-lg-6 col-lg-offset-3">
                <LoginModal location={this.props.location}/>
                <SignUpModal location={this.props.location}/>
                <button type="button" onClick={this.onTryItClick} className="btn btn-info btn-lg splash-btn">Try it</button>
        			</div>
        			<div className="col-lg-3"></div>
        		</div>{/* /row */}
          </footer>
        	</div>{/* /container */}
        </div>
    );
  }

});

module.exports = Splash;
