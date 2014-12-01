'use strict';

var chai = require('chai');
var request = require('superagent');
var chaihttp = require('chai-http');
var expect = chai.expect;

chai.use(chaihttp);
require('../../server');

describe('Server', function() {
  it('should return JSON with title, artist, and danceability', function(done) {
    chai.request('http://localhost:3000')
    .post('/')
    .send({title: 'SONWCPE12B3A138A4E'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect('Content-Type', /json/);
      expect(res.body).to.include.keys('Title');
      expect(res.body).to.include.keys('Artist');
      expect(res.body).to.include.keys('Danceability');
      done();
    });
  });
});

describe('Echo Nest API', function() {
  it('should return a danceability number', function(done) {
    var key = process.env.ECHO_KEY || 'PGTZEGJKHLCVM1ADB';
    var url = 'http://developer.echonest.com/api/v4/song/profile?' +
    'api_key=' +
    key +
    '&id=SONWCPE12B3A138A4E' +
    '&bucket=audio_summary&format=json';

    request
      .get(url)
      .end(function(err, echoData) {
        var parsedData = JSON.parse(echoData.text);
        console.log(parsedData);
        var danceability = parsedData.response.songs[0].audio_summary.
        danceability;

        expect(err).to.eql(null);
        expect(danceability).to.eql(0.543757);
        done();
      });
  });
});
