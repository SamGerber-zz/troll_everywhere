var Shepherd = require('tether-shepherd');
var Mediator = require('./mediator');

var tour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows on-top-of-modal'
  }
});

var waitASecond = function (){
  return new Promise(function(resolve, reject) {
    window.setTimeout(
        function() {
            resolve();
        }, 1000);
      });
};

tour.addStep('welcome-step', {
  title: 'Welcome!',
  text: '<p>Hello!</p><p>Welcome to TrollEverywhere!</p><p>We\'re excited about making it easy for a speaker to poll her audience.</p><p>Would you like me to show you around?</p>',
  attachTo: '#tour-1 top',
  showCancelLink: true,
  buttons: [
    {
      text: 'Not now',
      classes: 'danger',
      action: tour.cancel
    },
    {
      text: 'Yeah!',
      classes: 'success',
      action: tour.next
    }
  ]
});

tour.addStep('guest-access', {
  title: 'Lemme In!',
  text: '<p>Great!</p><p>Click <strong>Try It</strong> to log in as a guest.</p>',
  attachTo: '#tour-2 top',
  showCancelLink: true,
  buttons: false,
  advanceOn: "#tour-2 click"
});

tour.addStep('polls-intro', {
  beforeShowPromise: waitASecond,
  title: 'The Polls Page',
  text: '<p>This page is where you\'ll prepare for an upcoming presentation.</p><p>You can use this page to create and edit polls and questions.</p><p>To get back here click the button in the NavBar that looks like this: <span class="glyphicon glyphicon-list text-center" /></p>',
  showCancelLink: true,
  buttons: [
    {
      text: 'OK! Got it!',
      classes: 'success',
      action: tour.next
    }
  ]
});

tour.addStep('poll', {
  title: 'A Poll!',
  text: '<p>This is a poll.</p><p>Polls are just groups of questions you might want to present together.</p><p>In this case, it looks like someone\'s getting ready for a talk on Sorting Algorithms.</p>',
  attachTo: {element: '.tour-4:first-child .editable-text', on: 'bottom'},
  showCancelLink: true,
  buttons: [
    {
      text: 'What\'s next?',
      classes: 'success',
      action: tour.next
    }
  ]
});

tour.addStep('show-poll-modal', {
  title: 'Creating A New Poll!',
  text: '<p>Click this button to make a new poll.</p>',
  attachTo: {element: '#tour-5 button', on: 'left'},
  showCancelLink: true,
  buttons: false,
});

Mediator.on('show-poll-modal', function() {
  if (tour.getById('show-poll-modal').isOpen()) {
    return tour.next();
  }
});

tour.addStep('edit-poll-title', {
  beforeShowPromise: waitASecond,
  title: 'What\'s in a name?!',
  text: '<p>Let\'s call this one \'<strong>Sleep</strong>\'.</p><p>Click the word \'title\' to edit it.</p>',
  attachTo: {element: '#tour-6', on: 'left'},
  showCancelLink: true,
  buttons: false,
});

Mediator.on('edit-poll-title', function() {
  if (tour.getById('edit-poll-title').isOpen()) {
    return tour.next();
  }
});

tour.addStep('save-new-poll', {
  title: 'Save it!',
  text: '<p>Once you\'re satisfied, click Save.</p>',
  attachTo: {element: '#tour-7', on: 'left'},
  showCancelLink: true,
  buttons: false,
});

Mediator.on('save-new-poll', function() {
  if (tour.getById('save-new-poll').isOpen()) {
    return tour.next();
  }
});

tour.addStep('newly-minted-poll', {
  beforeShowPromise: waitASecond,
  title: 'There it is!',
  text: '<p>Check it out!</p><p>There\'s the new poll.</p>',
  attachTo: {element: '.tour-4:last-child .editable-text', on: 'bottom'},
  showCancelLink: true,
  scrollTo: true,
  buttons: [
    {
      text: 'Nifty! How do I add questions?',
      classes: 'success',
      action: tour.next
    }
  ]
});

tour.addStep('show-question-modal', {
  title: 'Creating A New Question!',
  text: '<p>I\'m glad you asked!</p><p>You can add a question to your new poll with this button.</p>',
  attachTo: {element: '.tour-4:last-child .new-question', on: 'top'},
  showCancelLink: true,
  buttons: false,
});

Mediator.on('show-question-modal', function() {
  if (tour.getById('show-question-modal').isOpen()) {
    return tour.next();
  }
});

var populateQuestion = function(){
  Mediator.trigger('fill-out-question');
};

tour.addStep('edit-question', {
  beforeShowPromise: waitASecond,
  title: 'Creating A New Question!',
  text: '<p>Let\'s ask our audience how much sleep they got last night.</p><p>Use your best judgment to fill up the form.</p>',
  attachTo: {element: '#tour-10', on: 'top'},
  showCancelLink: true,
  buttons: false
});

Mediator.on('edit-question', function() {
  if (tour.getById('edit-question').isOpen()) {
    return tour.next();
  }
});

tour.addStep('save-new-question', {
  title: 'Save it!',
  text: '<p>Once you\'re satisfied, click Save.</p>',
  attachTo: {element: '#tour-11', on: 'bottom'},
  showCancelLink: true,
  buttons: false,
});

Mediator.on('save-new-question', function() {
  if (tour.getById('save-new-question').isOpen()) {
    return tour.next();
  }
});

tour.addStep('newly-minted-question', {
  beforeShowPromise: waitASecond,
  title: 'There it is!',
  text: '<p>Check it out!</p><p>There\'s your new question!</p>',
  attachTo: {element: '.tour-4:last-child .poll-question', on: 'top'},
  showCancelLink: true,
  scrollTo: true,
  buttons: [
    {
      text: 'Ok, but how do they vote?',
      classes: 'success',
      action: tour.next
    }
  ]
});

tour.addStep('click-question-title', {
  beforeShowPromise: waitASecond,
  title: 'How To Collect Votes!',
  text: '<p>Right now the question is locked!</p><p>To allow people to vote, we need to activate and unlock it.</p><p>Let\'s click the question\'s title (<strong>Sleep</strong>) below.</p>',
  attachTo: {element: '.tour-4:last-child .poll-question', on: 'top'},
  showCancelLink: true,
  scrollTo: true,
  buttons: false
});
Mediator.on('click-question-title', function() {
  if (tour.getById('click-question-title').isOpen()) {
    return tour.next();
  }
});

tour.addStep('question-intro', {
  beforeShowPromise: waitASecond,
  title: 'The Question Page',
  text: '<p>This page displays the question you just made.</p><p>This page is meant to be shown to the audience on a screen during polling.</p><p>You can administer the poll directly from this page as well.</p>',
  showCancelLink: true,
  buttons: [
    {
      text: 'Alright',
      classes: 'success',
      action: tour.next
    }
  ]
});


tour.addStep('activate-question', {
  beforeShowPromise: waitASecond,
  title: 'Your Unique URL',
  text: '<p>When you sign  up for TrollEverywhere, you get your very own URL where people can respond to your questions.</p><p>When people visit your URL they can vote on your currently active question.</p><p>Let\'s make this question your currently active question now, by clicking this button.</p>',
  showCancelLink: true,
  attachTo: {element: '#activate-question', on: 'left'},
  buttons: false
});
Mediator.on('activate-question', function() {
  if (tour.getById('activate-question').isOpen()) {
    return tour.next();
  }
});

tour.addStep('polling-view', {
  beforeShowPromise: waitASecond,
  title: 'Polling View',
  text: '<p>Now that this is your active question, your audience can view it at your URL:</p><p><a href="http://trollhere.com/Esteemed_Guest" target="_blank">http://trollhere.com/Esteemed_Guest</a>.</p><p>Go check it out and come back here when you\'re done.</p><p>I\'ll wait.</p>',
  showCancelLink: true,
  attachTo: {element: '#activate-question', on: 'left'},
  buttons: [
    {
      text: 'But it wouldn\'t let me vote!',
      classes: 'success',
      action: tour.next
    }
  ]
});

tour.addStep('unlock-question', {
  beforeShowPromise: waitASecond,
  title: 'Unlocking the Question',
  text: '<p>New questions are locked by default.</p><p>Click this button to unlock the question.</p><p>Once unlocked, people will be able to respond</p>',
  showCancelLink: true,
  attachTo: {element: '#unlock-question', on: 'left'},
  buttons: false
});
Mediator.on('unlock-question', function() {
  if (tour.getById('unlock-question').isOpen()) {
    return tour.next();
  }
});
tour.addStep('live-question', {
  beforeShowPromise: waitASecond,
  title: 'Your Question is Live!',
  text: '<p>Now your question is live!</p><p>People can get to it by navigating to your unique URL.</p><p>If you like, you can show the QR code using the button: <span class="glyphicon glyphicon-qrcode" /></p><p>OK, go check out your question again and place a vote:</p><p><a href="http://trollhere.com/Esteemed_Guest" target="_blank">http://trollhere.com/Esteemed_Guest</a>.</p>',
  showCancelLink: true,
  buttons: false
});

Mediator.on('vote-cast', function() {
  if (tour.getById('live-question').isOpen()) {

    return tour.next();
  }
});


tour.addStep('first-vote', {
  beforeShowPromise: waitASecond,
  title: 'A Response!',
  text: '<p>Your first response!</p><p>How exciting!</p><p>Well that\'s all you need to get started.</p><p>Feel free to continue exploring</p>',
  showCancelLink: true,
  buttons: [
    {
      text: 'Finish',
      classes: 'success',
      action: tour.complete
    }
  ]
});



module.exports = tour;
//
// Tour.start();
