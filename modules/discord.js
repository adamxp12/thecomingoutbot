var Discord = require('discord.js');
var config = require('../config');

const client = new Discord.Client();

const token = config.discord.token;


client.on('ready', () => {
    console.log('Discord is ready');
  });

  if(config.discord.enabled) {
        client.login(token);
  }

  module.exports = {
      sendDM: function(uid, msg, callback) {
        client.fetchUser(uid).then(function(user) {
            user.createDM().then(function(dm) {
                dm.send(msg).then(message => callback(message.content))
                .catch(callback(false)); 
            })   
        })
      }
  }