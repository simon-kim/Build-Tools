'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var app = express();

app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  var songID = req.body.title;
  var key = process.env.ECHO_KEY || 'PGTZEGJKHLCVM1ADB';
  var url = 'http://developer.echonest.com/api/v4/song/profile?' +
  'api_key=' +
  key +
  '&id=' +
  songID +
  '&bucket=audio_summary&format=json';

  request
    .get(url)
    .end(function(req, echoData) {
      var parsedData = JSON.parse(echoData.text);
      var songTitle = parsedData.response.songs[0].title;
      var artist = parsedData.response.songs[0].artist_name;
      var danceability = parsedData.response.songs[0].audio_summary.
      danceability;

      res.json({ Title: songTitle, Artist: artist, Danceability: danceability});
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
