
    let controller = require('./loginCtrl.js');

    module.exports = function (router, passport) {
    // Routes
    router.post('/login', passport.authenticate('basic', { session: false }), controller.login);
    }