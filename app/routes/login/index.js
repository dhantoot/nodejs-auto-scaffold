
    let middleware = require('../../../config/middleware.js');
    let login = require('./login.js');

    module.exports = function (router) {
    // Routes
    router.post(`${global.api_url}/login`, middleware.authorize, login.login);
    }