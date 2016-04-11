// var Tether = require('tether');
var Shepherd = require('tether-shepherd');

var tour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

tour.addStep('example-step', {
  title: 'Title',
  text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
  attachTo: '#tour-1 top',
  buttons: [{
    text: 'Next',
    action: tour.next
  }]
});

module.exports = tour;
//
// Tour.start();
