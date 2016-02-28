var image_url = "https://upload.wikimedia.org/wikipedia/en/4/4c/Arthurtv_logo.png";
var image_url2 = "http://www.bellinghamlibrary.org/home/wp-content/uploads/2013/11/Magic-school-bus.jpg";
var image_url3 = "http://vignette2.wikia.nocookie.net/inspectorgadget/images/d/d5/Inspector_gadget-8970605.jpg";

var testResponse = {
    body: "Test Response at: " + new Date().toLocaleTimeString(),
    image_url: image_url3,
    _delete: false
};

var testQuestion = {
  title: "Test Question at: " + new Date().toLocaleTimeString(),
  body: "This is the body for the question.",
  image_url: image_url,
  responses: [
    testResponse,
    testResponse
  ],
  _delete: false
};

var testPoll = {
  title: "Test Poll at: " + new Date().toLocaleTimeString(),
  questions: [
    testQuestion
  ]
};

module.exports =
{
  testPoll:{
    poll: testPoll
  },

  testQuestion:{
    question: testQuestion
  },

  testResponse: {
    response: testResponse
  }
};
