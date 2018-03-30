var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var db = require('../../app/models');

let initialize = function() {
    //This is for login [username and password]
    passport.use(new BasicStrategy(
        function(username, password, cb) {
            console.log('BasicStrategy');
            db.users.getUser(username, function(err, user) {
                console.log('user ', user);
                if (err) { return cb(err); }
                if (!user) { return cb(null, false); }
                if (user) {
                    var passwordIsValid = bcrypt.compareSync(password, user.password);
                    if (!passwordIsValid) {
                        return res.status(401).send({ auth: false, token: null });
                    } else {
                        console.log('passwordIsValid ', passwordIsValid);
                        return cb(null, user);
                    }
                }
            });
        }));

    //This is for accessing private routes using [Bearer token]
    passport.use(new BearerStrategy(
        function(token, cb) {
            console.log('BearerStrategy ');
            db.users.findByToken(token, function(err, user) {
                if (err) { return cb(err); }
                if (!user) { return cb(null, false); }
                return cb(null, user);
            });
        }));
}

exports.initialize = initialize;