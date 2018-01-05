const Slack = require('slack')

module.exports = {
    sendMessage: function(token, channel, text, callback) {
        Slack.chat.postMessage({token, channel, text}).then(callback(text)).catch(callback(false))
    }
}