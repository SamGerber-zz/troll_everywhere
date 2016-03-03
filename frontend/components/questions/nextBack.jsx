var React = require('react');


var NavBar = React.createClass({

  render: function() {
    return (

        <div className="wrapper text-center">
          <div className="btn-group" >
            <button type="button"
                    className="btn btn-default"
                    onClick={this.props.onPrevClick}>
              <span className="glyphicon glyphicon-arrow-left" />
            </button>
            <button type="button"
                    className="btn btn-default"
                    onClick={this.props.onNextClick}>
              <span className="glyphicon glyphicon-arrow-right" />
            </button>
          </div>
        </div>

    );
  }

});

module.exports = NavBar;
