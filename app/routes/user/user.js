let userCtrl = require('./userCtrl.js');
let cb = require('../../utils/callback');

exports.getAllUser = function onRequest(req, res) {
    userCtrl.getAllUser(cb.setupResponseCallback(res));
};

exports.getUserById = function onRequest(req, res) {
    userCtrl.getUserById(req.params.id, cb.setupResponseCallback(res));
};

exports.createUser = function onRequest(req, res) {
    userCtrl.createUser(req.body, cb.setupResponseCallback(res));
};

exports.updateUser = function onRequest(req, res) {
    userCtrl.updateUser(req.params.id,req.body, cb.setupResponseCallback(res));
};

exports.deleteUser = function onRequest(req, res) {
    userCtrl.deleteUser(req.params.id, cb.setupResponseCallback(res));
};