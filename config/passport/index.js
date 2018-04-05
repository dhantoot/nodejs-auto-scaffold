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
                if (err) { return cb(err, null); }
                if (!user) { return cb('Username is incorrect', null); }
                if (user) {
                    var passwordIsValid = bcrypt.compareSync(password, user.password);
                    if (!passwordIsValid) {
                        return cb('Password is incorrect', null);
                    } else {
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
                if (err) {
                    return cb('Token not match or has expired',null); 
                }
                if(!user) {
                    return cb('Theres an error of parsing the token', null);
                } else {
                    return cb(null, user);
                }
                
            });
        }));
}

exports.initialize = initialize;