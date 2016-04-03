var React = require('react');
var LoginModal = require('./LoginModal')
var SignUpModal = require('./SignUpModal')
var SessionActions = require('../../actions/sessionActions')

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

  render: function() {
    return (
        <div>
        	<div id="headerwrap">
        		<div className="container">
        			<div className="row">
        				<div className="col-lg-6 landing-header">
        					<h1>TrollEverywhere</h1>
        					<h3>Easy Audience Participation.</h3>
                  <LoginModal location={this.props.location}/>
                  <SignUpModal location={this.props.location}/>
                  <button type="button" onClick={this.onTryItClick} className="btn btn-info btn-lg">Try it</button>
        				</div>{/* /col-lg-6 */}
        				<div className="col-lg-6">
        					<img className="img-responsive" src="" alt="" />
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
        			<div className="col-lg-4">
                <img className="img-responsive center-block" src="http://res.cloudinary.com/samgerber/image/upload/v1459129088/ask_question_sf1jjl.gif" alt="" />
        				<h4>1 - Write a Question</h4>
        				<p>Write out your question and give people a few options to choose between.</p>
        			</div>{/*/col-lg-4 */}

        			<div className="col-lg-4">
                <img className="img-responsive center-block" src="http://res.cloudinary.com/samgerber/image/upload/v1459129088/audience_answers_ee6ou0.gif" alt="" />
        				<h4>2 - Share a Link</h4>
        				<p>People can cast their votes on their phones or computers using your unique link.</p>

        			</div>{/*/col-lg-4 */}

        			<div className="col-lg-4">
                <img className="img-responsive center-block" src="http://res.cloudinary.com/samgerber/image/upload/v1459129088/see_response_vrrotz.gif" alt="" />
                <h4>3 - There is no step 3!</h4>
        				<p>Watch the results start to roll in!</p>

        			</div>{/*/col-lg-4 */}
        		</div>{/* /row */}
        	</div>{/* /container */}


        	<div className="container">
        		<hr>
        		<div className="row centered">
        			<div className="col-lg-6 col-lg-offset-3">
                <LoginModal location={this.props.location}/>
                <SignUpModal location={this.props.location}/>
                <button type="button" onClick={this.onTryItClick} className="btn btn-info btn-lg">Try it</button>
        			</div>
        			<div className="col-lg-3"></div>
        		</div>{/* /row */}
          </hr>
        	</div>{/* /container */}
          
        	<div className="container">
        		<div className="row mt centered">
        			<div className="col-lg-6 col-lg-offset-3">
        				<h1>Flatty is for Everyone.</h1>
        				<h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
        			</div>
        		</div>{/* /row */}


        		<div className="row mt centered">
        			<div className="col-lg-6 col-lg-offset-3">
        				<h1>Flatty is for Everyone.</h1>
        				<h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
        			</div>
        		</div>{/* /row */}

        		{/* CAROUSEL */}
        		<div className="row mt centered">
        			<div className="col-lg-6 col-lg-offset-3">
        				<div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
        				  {/* Indicators */}
        				  <ol className="carousel-indicators">
        				    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
        				    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        				    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        				  </ol>

        				  {/* Wrapper for slides */}
        				  <div className="carousel-inner">
        				    <div className="item active">
        				      <img src="assets/img/p01.png" alt="" />
        				    </div>
        				    <div className="item">
        				      <img src="assets/img/p02.png" alt="" />
        				    </div>
        				    <div className="item">
        				      <img src="assets/img/p03.png" alt="" />
        				    </div>
        				  </div>
        				</div>
        			</div>{/* /col-lg-8 */}
        		</div>{/* /row */}
        	</div>{/* /container */}

        	<div className="container">
        		<hr>
        		<div className="row centered">
        			<div className="col-lg-6 col-lg-offset-3">
                <LoginModal location={this.props.location}/>
                <SignUpModal location={this.props.location}/>
                <button type="button" onClick={this.onTryItClick} className="btn btn-info btn-lg">Try it</button>
        			</div>
        			<div className="col-lg-3"></div>
        		</div>{/* /row */}
          </hr>
        	</div>{/* /container */}

        	<div className="container">
        		<div className="row mt centered">
        			<div className="col-lg-6 col-lg-offset-3">
        				<h1>Our Awesome Team.<br/>Design Lovers.</h1>
        				<h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
        			</div>
        		</div>{/* /row */}

        		<div className="row mt centered">
        			<div className="col-lg-4">
        				<img className="img-circle" src="assets/img/pic1.jpg" width="140" alt="" />
        				<h4>Michael Robson</h4>
        				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        				<p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
        			</div>{/*/col-lg-4 */}

        			<div className="col-lg-4">
        				<img className="img-circle" src="assets/img/pic2.jpg" width="140" alt="" />
        				<h4>Pete Ford</h4>
        				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        				<p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
        			</div>{/*/col-lg-4 */}

        			<div className="col-lg-4">
        				<img className="img-circle" src="assets/img/pic3.jpg" width="140" alt="" />
        				<h4>Angelica Finning</h4>
        				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        				<p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
        			</div>{/*/col-lg-4 */}
        		</div>{/* /row */}
        	</div>{/* /container */}

        	<div className="container">
        		<hr>
        		<div className="row centered">
        			<div className="col-lg-6 col-lg-offset-3">
                <LoginModal location={this.props.location}/>
                <SignUpModal location={this.props.location}/>
                <button type="button" onClick={this.onTryItClick} className="btn btn-info btn-lg">Try it</button>
        			</div>
        			<div className="col-lg-3"></div>
        		</div>{/* /row */}
          </hr>
          </div>{/* /container */}
        </div>
    );
  }

});

module.exports = Splash;
