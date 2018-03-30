
    let controller = require('./userCtrl.js');

    module.exports = function (router, passport) {
    // Routes
    router.get('/user', passport.authenticate('bearer', { session: false }), controller.getAllUser);
    router.get('/user/:id', passport.authenticate('bearer', { session: false }), controller.getUserById);
    router.post('/user', controller.createUser);
    router.put('/user/:id', passport.authenticate('bearer', { session: false }), controller.updateUser);
    router.delete('/user/:id', passport.authenticate('bearer', { session: false }), controller.deleteUser);

    router.get('/user/:id/me', passport.authenticate('bearer', { session: false }), controller.getMe);
    }