var React = require('react');
var Response = require('./response');


var QuestionDisplay = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },


  render: function() {

    if(this.props.question.responses){
      var responses = this.props.question.responses.map(function(response){
        return(
          <Response key={response.id}
                    response={response}
                    locked={this.props.question.is_locked}/>
        );
      }, this);
    }

    return (
      <div>
        <h1>{this.props.question && this.props.question.title}</h1>
        <h2>{this.props.question && this.props.question.body}</h2>
        <ul className="list-group">
          <p>Click a response to cast your vote:</p>
          {responses}
        </ul>
      </div>
    );
  }

});

module.exports = QuestionDisplay;
