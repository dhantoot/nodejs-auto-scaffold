
const passport = require('passport');

exports.authorize = (req, res, next)=>{
	passport.authenticate('basic', { session: false })(req, res, next);
}

exports.isAuthorized = (req, res, next)=>{
	passport.authenticate('bearer', { session: false })(req, res, next);
}