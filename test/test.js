const expect  = require('chai').expect;
const request = require('request');
const axios = require('axios');


  describe('Route 1', function() {
    it('Should return the correct body for route 1', function(done) {
        request('http://localhost:3001/api/ping', function(error, response, body) {
            expect(body).to.equal('{"success":"true"}');
            done();
        });
    });
    it('Should return the correct status code for route 1 where route is correct', function(done) {
      request('http://localhost:3001/api/ping', function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
      });
    });
    it('Should return the correct status code for route 1 where route is incorrect', function(done) {
      request('http://localhost:3001/api/pings', function(error, response, body) {
          expect(response.statusCode).to.equal(404);
          done();
      });
    });
  })
  describe('Route 2', function() {
    it('Should return the proper status code for route 2 for the correct route', function(done) {
      request('http://localhost:3001/api/posts/tech', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('Should return the correct status code for route 2 where route is incorrect', function(done) {
      request('http://localhost:3001/api/post/tech', function(error, response, body) {
          expect(response.statusCode).to.equal(404);
          done();
      });
    });
    it('Should return the correct body for route 2 where route does not have a tag', function(done) {
        request('http://localhost:3001/api/posts', function(error, response, body) {
            expect(body).to.equal('{"error":"Tags parameter is required"}'),
            expect(response.statusCode).to.equal(400);
            done();
        });
      });
    it('Should return the correct status code for route 2 when the user inputs all three parameters', function(done) {
      request('http://localhost:3001/api/posts/science,tech/popularity/desc', function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
      });
    });
    it('Should return the correct status code for route 2 when the user inputs all three parameters', function(done) {
      request('http://localhost:3001/api/posts/health,tech/likes/asc', function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
      });
    });
    it('Should pass the test if all posts are unique by checking unique ids', function(done) {
      axios.get('http://localhost:3001/api/posts/tech,history')
      .then(res => {
        let post = res.data;
        let postID = [];
        let postObj = {};
        let test = true;

        
        // Gets all post ids
        for (let i = 0; i < post.length; i++) {
          postID.push(post[i].id)
        }
        // Places ids in an object where the value of the key is the number of times it appears
        postID.forEach(blog => {
          postObj[blog] = postObj[blog] ? postObj[blog] + 1 : 1
        })
        // If greater than one then there are duplicates and test will fail
        for (let key in postObj) {
          if (postObj[key] > 1) {
            test = false
          }
        }
        expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
        done();
    });
    it('Should pass the test if all posts are unique by checking unique ids using all route parameters', function(done) {
      axios.get('http://localhost:3001/api/posts/tech,history/likes/asc')
      .then(res => {
        let post = res.data;
        let postID = [];
        let postObj = {};
        let test = true;
        // Gets all post ids
        for (let i = 0; i < post.length; i++) {
          postID.push(post[i].id)
        }
        // Places ids in an object where the value of the key is the number of times it appears
        postID.forEach(blog => {
          postObj[blog] = postObj[blog] ? postObj[blog] + 1 : 1
        })
        // If greater than one then there are duplicates and test will fail
        for (let key in postObj) {
          if (postObj[key] > 1) {
            test = false
          }
        }
        expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
        done();
    });
    it('Should pass the test for correctly sorted values', function(done) {
      axios.get('http://localhost:3001/api/posts/tech,health/likes/desc')
      .then(res => {
        let post = res.data;
        let postLikes = [];
        let test = true;
        // Gets all post likes
        for (let i = 0; i < post.length; i++) {
          postLikes.push(post[i].likes)
        }
        // Loops the likes and if i < i + 1, the test will fail
        for (let i = 0; i < postLikes.length; i++) {
          if (postLikes[i] < postLikes[i + 1]) {
            test = false;
          }
        }
        expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
        done();
    });
    it('Should pass the test for correctly sorted values given the default parameters, as if the user did not use them', function(done) {
      axios.get('http://localhost:3001/api/posts/tech,health')
      .then(res => {
        let post = res.data;
        let postID = [];
        let test = true;
        // Gets all post id's because that is the default value to sort by
        for (let i = 0; i < post.length; i++) {
          postID.push(post[i].id)
        }
        // Loops the ids and if i > i + 1, the test will fail because the default is ascending order
        for (let i = 0; i < postID.length; i++) {
          if (postID[i] > postID[i + 1]) {
            test = false;
          }
        }
        expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
        done();
    });
  });