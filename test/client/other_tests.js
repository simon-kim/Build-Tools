'use strict';

var expect = require('chai').expect;
var some_func = require('../../app/js/some_func');
var counter = require('../../app/js/counter');

describe('Other Module Tests', function() {
  it('should be true', function() {
    expect(true).to.eql(true);
  });

  it('should also be true', function() {
    expect(some_func()).to.eql(true);
  });

  it('should be 0', function() {
    expect(counter.count).to.eql(0);
  });

  it('should increment by 1', function() {
    counter.increment();
    expect(counter.count).to.eql(1);
  });
});
