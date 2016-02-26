var React = require('react');
var QuestionFilterActions =
  require('../../../actions/questionFilterActions.js');

var QuestionSearch = React.createClass({

  blankAttributes: {
    searchText: ''
  },

  getInitialState: function () {
    return this.blankAttributes;
  },

  _searchTextChanged: function (e) {
    this.setState({searchText: e.target.value});
    var searchTextFilter = { searchText: e.target.value };
    QuestionFilterActions.receiveAllQuestionFilters(searchTextFilter);
  },

  render: function() {

    return (
        <form className="poll-search" role="search">
          <label htmlFor='question_search'>
            <input type="text"
                   id="poll_search"
                   value={this.state.searchText}
                   onChange={this._searchTextChanged}
                   className="poll-search-input"
                   placeholder="Filter Questions" />
          </label>
        </form>
    );
  }

});

module.exports = QuestionSearch;
