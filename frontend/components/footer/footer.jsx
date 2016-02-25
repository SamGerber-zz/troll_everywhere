var React = require('react');

var Footer = React.createClass({

  render: function() {
    return (
      <footer className="group">
        <nav className="group">
          <ul className="footer-links">
            <li>
              <a className="footer-link" href="#">Frequently Asked Questions</a>
            </li>
            <li>
              <a className="footer-link" href="#">Contact Support</a>
            </li>
            <li>
              <a className="footer-link" href="#">Terms of Service</a>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }

});

module.exports = Footer;
