
    let middleware = require('../../../config/middleware.js');
    let user = require('./user.js');

    module.exports = function (router) {
    // Routes
    router.get(`${global.api_url}/users`, middleware.isAuthorized, user.getAllUser);
    router.get(`${global.api_url}/users/:id`, middleware.isAuthorized, user.getUserById);
    router.post(`${global.api_url}/users`, user.createUser);
    router.put(`${global.api_url}/users/:id`, middleware.isAuthorized, user.updateUser);
    router.delete(`${global.api_url}/users/:id`, middleware.isAuthorized, user.deleteUser);

    //router.get('/user/:id/me', middleware.isAuthorized, user.getMe);
    };