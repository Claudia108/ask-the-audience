// const $ = require('jquery');
var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users at the moment:   ' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
   socket.send('voteCast', this.innerText);
  });
}

var voteCount = document.getElementById('vote-count');

socket.on('voteCount', function(votes) {
  for (var letter in votes) {
    console.log(votes[letter]);
    var voteTarget = document.getElementById('letter-' + letter);
	  voteTarget.innerText = 'Votes for ' + letter + ' : ' + votes[letter];
    // var voteNumber = document.getElementsByClassName('badge');
    // voteNumber.innerText = votes[letter];
  }

  var yourVote = document.getElementById('your-vote');

  socket.on('yourVote', function (vote) {
  	yourVote.innerText = "You voted for " + vote;
  });

});
