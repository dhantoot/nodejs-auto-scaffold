
    let middleware = require('../../config/middleware.js');
    let user = require('./user.js');

    module.exports = function (router) {
    // Routes
    router.get('/user', middleware.isAuthorized, user.getAllUser);
    router.get('/user/:id', middleware.isAuthorized, user.getUserById);
    router.post('/user', user.createUser);
    router.put('/user/:id', middleware.isAuthorized, user.updateUser);
    router.delete('/user/:id', middleware.isAuthorized, user.deleteUser);

    //router.get('/user/:id/me', middleware.isAuthorized, user.getMe);
    };