
    let middleware = require('../../config/middleware.js');
    let controller = require('./loginCtrl.js');

    module.exports = function (router) {
    // Routes
    router.post('/login', middleware.validateBasic, controller.login);
    }