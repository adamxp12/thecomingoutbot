var snoowrap = require('snoowrap'),
    config = require('../config');

var  r = new snoowrap({
    userAgent: config.reddit.useragent,
    clientId: config.reddit.clientId,
    clientSecret: config.reddit.clientSecret,
    username: config.reddit.username,
    password: config.reddit.password
  });

  module.exports = {
      submitText: function(subreddit, title, msg, flairid, callback) {
          if(flairid != null) {
            r.getSubreddit(subreddit)
            .submitSelfpost({title: title, text: msg})
            .selectFlair({flair_template_id: flairid})
            .then(callback(msg))
            .catch(callback(false))
          } else {
            r.getSubreddit(subreddit)
            .submitSelfpost({title: title, text: msg})
            .then(callback(msg))
            .catch(callback(false))
          }
        
      }
  }

 