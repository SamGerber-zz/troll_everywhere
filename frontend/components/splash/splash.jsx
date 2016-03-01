var React = require('react');

var Splash = React.createClass({

  render: function() {
    return (
        <div>
        	<div id="headerwrap">
        		<div className="container">
        			<div className="row">
        				<div className="col-lg-6">
        					<h1>TrollEverywhere</h1>
        					<h3>Easy Audience Participation.</h3>
                <form className="form-inline" role="form">
        					  <div className="form-group">
        					    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address" />
        					  </div>
        					  <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
        					</form>
        				</div>{/* /col-lg-6 */}
        				<div className="col-lg-6">
        					<img className="img-responsive" src="assets/img/ipad-hand.png" alt="" />
        				</div>{/* /col-lg-6 */}

        			</div>{/* /row */}
        		</div>{/* /container */}
        	</div>{/* /headerwrap */}


        	<div className="container">
        		<div className="row mt centered">
        			<div className="col-lg-6 col-lg-offset-3">
        				<h1>Engaging Your Audience<br/>Has Never Been Easier.</h1>
        				<h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
        			</div>
        		</div>{/* /row */}

        		<div className="row mt centered">
        			<div className="col-lg-4">
        				<span className="glyphicon glyphicon-question-sign"></span>
        				<h4>1 - Write a Question</h4>
        				<p>Write out your question and give people a few options to choose between.</p>
        			</div>{/*/col-lg-4 */}

        			<div className="col-lg-4">
                <span className="glyphicon glyphicon-link"></span>
        				<h4>2 - Share a Link</h4>
        				<p>Once you're done, we'll give you a unique link for your question that you can share.</p>

        			</div>{/*/col-lg-4 */}

        			<div className="col-lg-4">
                <span className="glyphicon glyphicon-ice-lolly-tasted"></span>
                <h4>3 - There is no step 3!</h4>
        				<p>Watch the results start to roll in!</p>

        			</div>{/*/col-lg-4 */}
        		</div>{/* /row */}
        	</div>{/* /container */}


        	<div className="container">
        		<hr>
        		<div className="row centered">
        			<div className="col-lg-6 col-lg-offset-3">
        				<form className="form-inline" role="form">
        				  <div className="form-group">
        				    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address" />
        				  </div>
        				  <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
        				</form>
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
        				<form className="form-inline" role="form">
        				  <div className="form-group">
        				    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address" />
        				  </div>
        				  <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
        				</form>
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
        				<form className="form-inline" role="form">
        				  <div className="form-group">
        				    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address" />
        				  </div>
        				  <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
        				</form>
        			</div>
        			<div className="col-lg-3"></div>
        		</div>{/* /row */}
          </hr>
        		<p className="centered">Created by BlackTie.co - Attribution License 3.0 - 2013</p>
        	</div>{/* /container */}
        </div>
    );
  }

});

module.exports = Splash;
