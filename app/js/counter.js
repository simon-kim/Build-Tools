'use strict';

var Counter = function() {
  this.count = 0;
};

Counter.prototype.increment = function() {
  this.count++;
};

var cntr = new Counter();
module.exports = cntr;
