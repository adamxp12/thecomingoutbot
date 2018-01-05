var Client = require('instagram-private-api').V1,
    appRoot = require('app-root-path');

module.exports = {
    uploadImg(user, password, imgfile, caption, callback) {
        var device = new Client.Device(user);
        var storage = new Client.CookieFileStorage(appRoot + '/cookies/'+user+'.json');
        Client.Session.create(device, storage, user, password)
        .then(function(session) {
            return [session, Client.Upload.photo(session, appRoot+'/img/'+imgfile)]   
        })
        .spread(function(session, upload) {
            return Client.Media.configurePhoto(session, upload.params.uploadId, caption);
        })
        .then(function(medium) {
            callback(medium.params.caption);
        })
    }
}
