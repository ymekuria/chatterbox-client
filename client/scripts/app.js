// YOUR CODE HERE:
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

var app = {};
var friends = [];
var rooms = [];

$(document).ready(function () {
  $('body #main').on('click', '.username', function () {
    app.addFriend();
  });

  $('form').on('submit', function () {
    app.handleSubmit();
  })
});
app.init = function () {
  app.server = 'https://api.parse.com/1/classes/chatterbox';
  app.fetch();
};

app.fetch = function () {
  $.ajax({
    url: app.server,
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
    messageContainer.find('.message').text(messages[i].text);
    $('form').after(messageContainer);

    if (!_.contains(rooms, messages[i].roomname)) {
      rooms.push(messages[i].roomname);
    }
  }

  for (var i = 0; i < rooms.length; i++) {
    $('.rooms').append('<option class=' + 'room' + i + ' value=' + i + '> </option>');
    $('.rooms').find('.' + 'room' + i).text(rooms[i]);
  }
};


app.send = function (messageObj) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(messageObj),
    contentType: 'application/json',
    success: function (data) {
      debugger;
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

app.handleSubmit = function () {
  var message = {
    username: 'Yoni',
    text: $('#message').val(),
    roomname: rooms[$('.rooms').val()]
  };

  console.log('message in handleSubmit', message)
  app.send(message);
};



