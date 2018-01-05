var Twitter = require('twitter');
var config = require('../config');


var client = new Twitter({
 consumer_key: config.twitter.consumer_key,
 consumer_secret: config.twitter.consumer_secret,
 access_token_key: config.twitter.token_key,
 access_token_secret: config.twitter.token_secret
});

module.exports = {
    sendTweet: function(msg, callback) {
        client.post('statuses/update', {status: msg}, function(error, tweet, response) {
            if (!error) {
              callback(msg);
            } else {
              callback(false);
            }
          });
    }
}
