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
          <Response key={response.id} response={response}/>
        );
      });
    }

    return (
      <div>
        <h3>{this.props.question && this.props.question.title}</h3>
        <p>{this.props.question && this.props.question.body}</p>
        <ul className="list-group">
          {responses}
        </ul>
      </div>
    );
  }

});

module.exports = QuestionDisplay;
