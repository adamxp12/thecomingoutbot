var config = require('./config');
var discord = require('./modules/discord');
var twitter = require('./modules/twitter');
var slack = require('./modules/slack');
var reddit = require('./modules/reddit');
var instagram = require('./modules/instagram');
var fs = require('fs');
var data = require("./data.json");

setInterval(function(){
    for(var exKey in data) {
        var obj = data[exKey];
        if(!obj.sent) {
            if(obj.timestamp <= Math.floor(new Date() / 1000)) {
                console.log("Found unsent message");
                // it is time or is in past. aka time to do crap
                send(obj)
            }
        }
    }
    // save file. Without this the messages would get sent twice if you stop/start the code
    fs.writeFile('data.json', JSON.stringify(data), 'utf8');
}, 1000*10)



function send(obj) {
    // if its a discord message
    if(obj.type == "discord") {
        discord.sendDM(obj.uid, obj.msg, function(rt) {
            if(rt != false) {
                console.log("");
                console.log("Sent discord message: "+rt)
                console.log("");
                obj.sent = true;
            }
        })
    }
    // if its a tweet
    if(obj.type == "tweet") {
        twitter.sendTweet(obj.msg, function(rt) {
            if(rt != false) {
                console.log("");
                console.log("Sent tweet: "+rt)
                console.log("");
                obj.sent = true;
            }
        })
    }

    // if its a slack message 
    if(obj.type == "slack") {
        slack.sendMessage(obj.bottoken, obj.channel, obj.msg, function(rt) {
            if(rt != false) {
                console.log("");
                console.log("Sent slack message: "+rt)
                console.log("");
                obj.sent = true;
            }
        })
    }

    // if its a reddit post 
    if(obj.type == "redditText") {
        reddit.submitText(obj.subreddit, obj.title, obj.msg, obj.flairid, function(rt) {
            if(rt != false) {
                console.log("");
                console.log("Submitted reddit post: "+rt)
                console.log("");
                obj.sent = true;
            }
        })
    }

    // if its an instagram upload 
    if(obj.type == "instagram") {
        obj.sent = true;
        instagram.uploadImg(obj.user, obj.password, obj.imgfile, obj.msg, function(rt) {
            if(rt != null) {
                console.log("");
                console.log("Submitted instagram post: "+rt)
                console.log("");
                obj.sent = true;
            } else {
                obj.sent = false;
                // Set to sent before we try upload to prevent it uploading multiple times due to the 10 second loop reactivating mid upload
            }
        })
    }
}