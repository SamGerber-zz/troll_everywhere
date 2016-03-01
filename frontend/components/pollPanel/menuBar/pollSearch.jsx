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
        <form className="form-inline navbar-right" role="search">
          <div className="form-group">
          <label htmlFor='question_search'>
            <div className="input-group">
              <div className="input-group-addon">
                <span className="glyphicon glyphicon-search" aria-hidden="true" />
              </div>
              <input type="search"
                     id="poll_search"
                     value={this.state.searchText}
                     onChange={this._searchTextChanged}
                     className="form-control"
                     placeholder="Filter Questions" />
            </div>
          </label>
        </div>
      </form>
    );
  }

});

module.exports = QuestionSearch;
