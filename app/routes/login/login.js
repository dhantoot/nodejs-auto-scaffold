	let loginCtrl = require('./loginCtrl');
	let cb = require('../../utils/callback');

	exports.login = function onRequest(req, res) {
	    loginCtrl.login(req.user, cb.setupResponseCallback(res));
	};