const _ = require('lodash-node');
const jwt = require('jsonwebtoken');
var records = [{
    "id": "1",
    "username": "dhantoot",
    "displayName": "dhan vincent",
    "emails": [{ value: 'dhantoot@example.com' }],
    "password": "$2a$08$/gQhpLJjfINi53L5GWkIuOJsiXVQWPYXbWZQ8aR4wsZixwcR5.mAG"
}, {
    "id": "2",
    "username": "dyan",
    "displayName": "dyan marie",
    "emails": [{ value: 'dyan@example.com' }],
    "password": "$2a$08$L0QCm5zy7FnUxgE0PJ7sFeaYHI3ok0OKGtZUOhNse4fqrDSG8dpS6"
}];

exports.create = function(data, cb) {
    process.nextTick(function() {
        records.push(data);
        return cb(null, data);
    });
}

exports.update = function(id, data, cb) {
    process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.id === id) {
                record = data;
                console.log('record ',record);
                console.log('data ',data);
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
}

exports.delete = function(id, cb) {
    process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.id === id) {
                return cb(null, _.pull(record, id));
            }
        }
        return cb(null, null);
    });
}

exports.getUsers = function(cb) {
    return cb(null, records);
}

exports.getUser = function(username, cb) {
    process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
}

exports.getUserById = function(id, cb) {
    for (var i = 0, len = records.length; i < len; i++) {
        var record = records[i];
        if (record.id === id) {
            return cb(null, record);
        }
    }
    return cb(null, null);
}



exports.findByToken = function(token, cb) {
    jwt.verify(token, 'secret', function(err, decoded) {
        if (err) {
            return cb({ auth: false, message: 'Failed to authenticate token.' },null);
        } else {
            process.nextTick(function() {
                for (var i = 0, len = records.length; i < len; i++) {
                    var record = records[i];
                    if (record.id === decoded.id) {
                        console.log('decoded ',decoded);
                        return cb(null, decoded);
                    }
                }
                return cb(null, null);
            });
        }
    });
}