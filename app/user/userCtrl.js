// Controllers
const models = require("../models");
const icon = require('log-symbols');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getAllUser = (req, res, next) => {
    let init = async() => {
        models.users.getUsers((err, resp) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Error getting user",
                    icon: icon.error,
                    data: {
                        total_rows: 0,
                        users: []
                    },
                    error_message: icon.error + ' ' + resp
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success",
                    icon: icon.success,
                    data: {
                        total_rows: resp.length,
                        users: resp
                    }
                });
            }
        });
    }
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        res.status(500).json({
            success: false,
            message: "Error getting user",
            icon: icon.error,
            data: {
                total_rows: 0,
                users: []
            },
            error_message: icon.error + ' ' + err
        });
    });
}

exports.getUserById = (req, res, next) => {
    let init = async() => {
        models.users.getUserById(req.params.id, (err, resp) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Error getting user by ID",
                    icon: icon.error,
                    data: {
                        user: {}
                    },
                    error_message: icon.error + ' ' + resp
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success",
                    icon: icon.success,
                    data: {
                        user: resp
                    }
                });
            }
        });
    }
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        res.status(500).json({
            success: false,
            message: "Error getting user by id",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        });
    });
}

exports.createUser = (req, res, next) => {
    console.log('creating user..');
    let init = async() => {
        let hashedPassword = bcrypt.hashSync(req.body.userpassword, 8);
        let userobj = {
            id: req.body.id,
            username: req.body.username,
            displayName: req.body.displayName,
            emails: req.body.emails,
            password: hashedPassword
        };
        models.users.create(userobj,
            (err, user) => {
                if (err) return res.status(500).send("There was a problem registering the user.")
                    // create a token
                var token = jwt.sign(user, 'secret', {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).json({
                    success: true,
                    message: "Successfully Created",
                    data: user
                })
            });
    }
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        res.status(500).json({
            success: false,
            message: "Error creating user",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        });
    });
}

exports.updateUser = (req, res, next) => {
    let init = async() => {
        let hashedPassword = bcrypt.hashSync(req.body.userpassword, 8);
        let userobj = {
            id: req.body.id,
            username: req.body.username,
            displayName: req.body.displayName,
            emails: req.body.emails,
            password: hashedPassword
        };
        models.users.update(req.params.id, userobj, (err, user) => {
            if (err) {
                return res.status(500).send("There was a problem registering the user.")
            } else {
                // create a token
                console.log('user --', user);
                var token = jwt.sign(user, 'secret', {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).json({
                    success: true,
                    message: "Successfully Updated",
                    data: user
                })
            }

        });
    }
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        res.status(500).json({
            success: false,
            message: "Error updating user",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        });
    });
}

exports.deleteUser = (req, res, next) => {
    let init = async() => {
        models.users.delete(req.params.id, (err, resp) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Error deleting user by ID",
                    icon: icon.error,
                    data: {
                        user: {}
                    },
                    error_message: icon.error + ' ' + resp
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success",
                    icon: icon.success,
                    data: {
                        user: resp
                    }
                });
            }
        });
    }
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        });
    });
}

exports.getMe = (req, res, next) => {
    let init = async() => {
        res.status(200).json({
            success: true,
            message: "Test retured",
            data: {
                user: {}
            }
        })
    }
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        res.status(500).json({
            success: false,
            message: "Error getting user by id",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        });
    });
}