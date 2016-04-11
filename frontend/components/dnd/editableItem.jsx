var React = require('react');
var PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');
var ReactTooltip = require("react-tooltip");

var EditableItem = React.createClass({
  propTypes: {
    text: PropTypes.string.isRequired,
    updateText: PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      editing: false,
      text: this.props.text
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      text: nextProps.text
    })
  },

  makeEditing: function(e) {
    e.preventDefault();
    e.stopPropagation();
    ReactTooltip.hide();

    this.setState({
      editing: true
    });
  },

  save: function(e) {
    e.preventDefault();
    e.stopPropagation();
    ReactTooltip.hide();
    var text = this.state.text;
    text = text.length ? text : "Click to add text..."
    this.setState({
      editing: false,
      text: text
    });
    this.props.updateText(text);
  },

  cancel: function(e) {
    e.preventDefault();
    e.stopPropagation();
    ReactTooltip.hide();
    this.setState({
      editing: false,
      text: this.props.text
    });
  },

  _onChange: function(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value
    });
  },

  componentDidUpdate: function(prevProps, prevState){
    if (!prevState.editing && this.state.editing) {
      var input = ReactDOM.findDOMNode(this.refs.input);
      input.focus();
      input.value = input.value;
    }
  },

  render: function() {
    var text = this.state.text;
    var editing = this.state.editing;
    var updateText = this.props.updateText;
    var guts = (
      <span className='editable-text' data-tip="Click to edit">
        {text}
      </span>
    );
    if (editing) {
      guts = (
        <span className="input-group">
          <input type="text" className="form-control" aria-label="..."
                 onChange={this._onChange} disabled={false} value={text}
                 ref="input" data-tip=""/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button"
                    onClick={this.cancel} data-tip="Cancel">
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
            <button className="btn btn-default" type="button"
                    onClick={this.save} data-tip="Save">
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            </button>
          </span>
        </span>
      );
    }

    /// <{this.props.fieldType}

    return (
      <span className={(editing) ? "" : "editable"}
            onClick={this.makeEditing}>
        {guts}
      </span>
    );
  }
});

module.exports = EditableItem;
