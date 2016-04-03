var React = require('react');
var PropTypes = React.PropTypes;
var update = require('react/lib/update');
var Card = require('./card');
var DropTarget = require('react-dnd').DropTarget;
var ItemTypes = require('./itemTypes');
var flow = require('lodash/flow');

var style = {
  width: 400
};

var cardTarget = {
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
      cards: [{
        id: 1,
        text: 'Write a cool JS library'
      }, {
        id: 2,
        text: 'Make it generic enough'
      }, {
        id: 3,
        text: 'Write README'
      }, {
        id: 4,
        text: 'Create some examples'
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it'
      }, {
        id: 6,
        text: '???'
      }, {
        id: 7,
        text: 'PROFIT'
      }]
    });
  },

  moveCard: function(id, atIndex) {
    var cardObject = this.findCard(id);
    var card = cardObject.card;
    var index = cardObject.index;
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card]
        ]
      }
    }));
    console.log(this.state);
  },

  findCard: function(id) {
    var cards = this.state.cards;
    var card = cards.filter(function(card) {
      return card.id === id;
    })[0];

    return {
      card: card,
      index: cards.indexOf(card)
    };
  },

  render: function() {
    var connectDropTarget = this.props.connectDropTarget;
    var cards = this.state.cards;

    return connectDropTarget(
      <div style={style}>
        {cards.map(card => {
          return (
            <Card key={card.id}
                  id={card.id}
                  text={card.text}
                  moveCard={this.moveCard}
                  findCard={this.findCard} />
          );
        })}
      </div>
    );
  }
});

module.exports = DropTarget(ItemTypes.CARD, cardTarget, collect)(Container);
