var should = require('should');
var request = require('supertest');
var hostURL = 'http://testaroo.herokuapp.com';
var server = request(hostURL);

function statusShouldBeOK(res) {
	(res.statusCode).should.equal(200);
}

describe('API Tests', function() {
   it('should return info', function(done) {
    server
      .get('/info')
      .expect(200)
      .end(function(err, res) {
      	console.log("Info Response:", res.body);
        (res.statusCode).should.equal(200);
      	var responseBody = res.body;
        (responseBody).should.have.properties("description", "quoteResponse", "authorsResponse");
        done();
      });
  });
  it.skip('should return version number', function(done) {
    server
      .post('/quote')
      .end(function(err, res) {
        (res.statusCode).should.equal(200);
      	var responseBody = res.body;
        (responseBody.meta.api_version).should.equal("0.5");
        done();
      });
  });
  it('should return a quote', function(done) {
    server
      .post('/quote')
      .end(function(err, res) {
      	statusShouldBeOK(res);
      	var responseBody = res.body;
        (responseBody.response.quote.says).should.not.be.equal("");
        (responseBody.response.quote.author).should.not.equal("");
        done();
      });
  });
  it('should return a quote by carlin', function(done) {
    server
      .post('/quote')
      .send({"author": "carlin"})
      .end(function(err, res) {
      	statusShouldBeOK(res);
      	var responseBody = res.body;
        (responseBody.response.quote.says).should.not.equal("");
        (responseBody.response.quote.author).should.equal("George Patrick Carlin");
        done();
      });
  });
});