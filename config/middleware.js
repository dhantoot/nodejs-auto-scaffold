
const passport = require('passport');

exports.validateBasic = (req, res, next)=>{
	passport.authenticate('basic', { session: false })(req, res, next);
}

exports.validateBearer = (req, res, next)=>{
	passport.authenticate('bearer', { session: false })(req, res, next);
}