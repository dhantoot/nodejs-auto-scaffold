
    let middleware = require('../../config/middleware.js');
    let controller = require('./userCtrl.js');

    module.exports = function (router) {
    // Routes
    router.get('/user', middleware.validateBearer, controller.getAllUser);
    router.get('/user/:id', middleware.validateBearer, controller.getUserById);
    router.post('/user', controller.createUser);
    router.put('/user/:id', middleware.validateBearer, controller.updateUser);
    router.delete('/user/:id', middleware.validateBearer, controller.deleteUser);

    router.get('/user/:id/me', middleware.validateBearer, controller.getMe);
    }