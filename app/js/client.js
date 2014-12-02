'use strict';

var $ = require('jquery');
var findDance = require('./findDance');

$('#submit').on('click', function() {
  findDance($('#songInput').val());
});
