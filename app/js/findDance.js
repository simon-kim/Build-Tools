'use strict';

var $ = require('jquery');

var findDance = function(songID) {
  $.ajax({
    url: '/',
    type: 'POST',
    data: {title: songID},
    success: function(data) {
      $('#app').html('<p id="dance">' + data.Title + ' by ' + data.Artist +
      ': ' + data.Danceability + '</p>');
    },
    error: function() {
      console.log('Error posting the given Song ID');
    }
  });
};

module.exports = findDance;
