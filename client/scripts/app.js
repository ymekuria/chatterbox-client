// YOUR CODE HERE:
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

var app = {};
var friends = [];

app.init = function () {

  $(document).ready(function () {
    $('body #main').on('click', '.username', function () {
      app.addFriend();
    });
  })


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
    var messageContainer = $('<span> <div class="message"></div> <div class="username" data-username=' + messages[i].username + ' >' + messages[i].username + '</div></span>');
    console.log(messageContainer);
    messageContainer.find('.message').text(messages[i].text);
    console.log(messageContainer);
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

app.addMessage = function (message) {

  var messageContainer = $('<span> <div class="message"></div> <div class="username" data-username=' + message.username + ' >' + message.username + '</div></span>');
  console.log(messageContainer);
  messageContainer.find('.message').text(message.text);
  console.log(messageContainer);
  $('#chats').prepend(messageContainer);
};

app.clearMessages = function () {
  $('#chats').empty();
};

app.addRoom = function (name) {
  $('#roomSelect').prepend('<div> ' + name + '</div>');
};

app.addFriend = function (username) {
  friends.push(username);
};



