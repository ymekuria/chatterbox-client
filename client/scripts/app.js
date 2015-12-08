// YOUR CODE HERE:
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

var app = {};

app.init = function () {

};

app.fetch = function (url) {
  $.ajax({
    url: url,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterBox: message retrieved', data);
      displayMessages(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to retrieve message')
    }
  });
};


var displayMessages = function (data) {
  var messages = data.results;

  for (var i = 0; i < messages.length; i++) {
    var messageContainer = $('<div class="message"></div>').text(messages[i].text);
    $('body #main h1').after(messageContainer);
  }
};


app.send = function (messageObj) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(messageObj),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterBox: message sent', data)

    },
    error: function (data) {
       console.log('chatterbox: Failed to send')
    }

  })
};



