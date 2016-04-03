var React = require('react');
var PropTypes = React.PropTypes;
var update = require('react/lib/update');
var Response = require('./response');
var DropTarget = require('react-dnd').DropTarget;
var ItemTypes = require('./itemTypes');
var flow = require('lodash/flow');
var EditableItem = require('./editableItem');

var style = {
  // width: 400
};

var responseTarget = {
  drop: function() {
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

var Container = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired
  },

  getInitialState: function() {
    return ({
      id: 1,
      title: "Secretions",
      body: "Would you rather only sweat eggnog or only cry spaghetti sauce?",
      responses: [{
        id: 5,
        ord: 1,
        votes: 4,
        body: "sweat eggnog"
      },{
        id: 1,
        ord: 2,
        votes: 42,
        body: "cry spaghetti sauce"
      }]
    });
  },

  moveResponse: function(ord, atIndex) {
    var responseObject = this.findResponse(ord);
    var response = responseObject.response;
    var index = responseObject.index;
    this.setState(update(this.state, {
      responses: {
        $splice: [
          [index, 1],
          [atIndex, 0, response]
        ]
      }
    }));
  },

  addResponse: function() {
    var nextOrd = 1 + this.state.responses.reduce(function(maxOrd, response){
      console.log(maxOrd);
      return Math.max(maxOrd, response.ord);
    }, 0);
    this.setState(update(this.state, {
      responses: {
        $push: [{
          ord: nextOrd,
          body: 'New Response',
          votes: 0
        }]
      }
    }));
  },

  deleteResponse: function(ord){
    var responseObject = this.findResponse(ord);
    var response = responseObject.response;
    var index = responseObject.index;
    this.setState(update(this.state, {
      responses: {
        $splice: [
          [index, 1]
        ]
      }
    }));
  },

  updateText: function(ord, body) {
    var responseObject = this.findResponse(ord);
    var response = responseObject.response;
    var index = responseObject.index;
    var state = { responses: {} };
    state.responses[index] = { body: {
      $set: body }
    };

    this.setState(update(this.state, state));
  },

  findResponse: function(ord) {
    var responses = this.state.responses;
    var response = responses.filter(function(response) {
      return response.ord === ord;
    })[0];

    return {
      response: response,
      index: responses.indexOf(response)
    };
  },

  updateTitle: function(text){
    this.setState({
      title: text
    });
  },

  updateBody: function(text){
    this.setState({
      body: text
    });
  },

  render: function() {
    var connectDropTarget = this.props.connectDropTarget;
    var responses = this.state.responses;
    var title = this.state.title;
    var body = this.state.body;
    var updateTitle = this.updateTitle;
    var updateBody = this.updateBody;

    var responseComponents = connectDropTarget(
      <div style={style}>
        {responses.map(response => {
          return (
            <Response key={response.ord}
                  ord={response.ord}
                  id={response.id}
                  body={response.body}
                  votes={response.votes}
                  moveResponse={this.moveResponse}
                  findResponse={this.findResponse}
                  deleteResponse={this.deleteResponse}
                  updateText={this.updateText} />
              )}
            )}
      </div>
    );

    return (
      <div>
        <h2>
          <EditableItem updateText={updateTitle}
                        text={title} />
        </h2>
        <h3>
          <EditableItem updateText={updateBody}
            text={body} />
        </h3>
        {responseComponents}
        <button type="button"
                className="btn btn-default"
                onClick={this.addResponse}
                data-tip="Add a new response">Add</button>
      </div>

    );
  }
});

module.exports = DropTarget(ItemTypes.RESPONSE, responseTarget, collect)(Container);
