var React = require('react');

var PollSearch = React.createClass({

  render: function() {

    return (
        <form className="poll-search" role="search">
          <input type="text" className="poll-search-input" placeholder="Search" />
          <button type="submit" className="poll-search-submit nav-link">Submit</button>
        </form>
    );
  }

});

module.exports = PollSearch;
