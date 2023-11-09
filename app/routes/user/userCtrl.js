const models = require("../../models");
const icon = require('log-symbols');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getAllUser = (next) => {
    let init = async() => {
        models.users.getUsers((err, resp) => {
            next(null,{
                message: "Success",
                icon: icon.success,
                data: {
                    total_rows: resp.length,
                    users: resp
                }
            });
        });
    };
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
         next({
            message: "Error getting user",
            icon: icon.error,
            data: {
                total_rows: 0,
                users: []
            },
            error_message: icon.error + ' ' + err
        },null);
    });
};

exports.getUserById = (id, next) => {
    let init = async() => {
        models.users.getUserById(id, (err, resp)=>{
            next(null,{
                message: "Success",
                data: resp
            });
        });
    };
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        next({
            message: "Error getting user by id",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        },null);
    });
};

exports.createUser = (data, next) => {
    console.log('creating user..');
    let init = async() => {
        let hashedPassword = bcrypt.hashSync(data.userpassword, 8);
        let userobj = {
            id: data.id,
            username: data.username,
            displayName: data.displayName,
            emails: data.emails,
            password: hashedPassword
        };
        models.users.create(userobj,
            (err, user) => {
                if (err) {
                    next({
                        msg:"There was a problem registering the user.",
                        err : err
                    },null);
                } else {
                    // create a token
                    let token = jwt.sign(user, 'secret', {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    next(null,{
                        message: "Successfully Created",
                        data: user
                    })
                }
            });
    };
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        next({
            message: "Error creating user",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        },null);
    });
};

exports.updateUser = (id, data, next) => {
    let init = async() => {
        let hashedPassword = bcrypt.hashSync(data.userpassword, 8);
        let userobj = {
            id: data.id,
            username: data.username,
            displayName: data.displayName,
            emails: data.emails,
            password: hashedPassword
        };
        models.users.update(userobj,id,
            (err, user) => {
                if (err){
                    next({
                        msg:"There was a problem registering the user."
                    },null);
                } else {
                    // create a token
                    let token = jwt.sign(user, 'secret', {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    next(null,{
                        status: true,
                        message: "Successfully Created",
                        data: user
                    })
                }
            });
    };
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        res.status(500).json({
            status: false,
            message: "Error updating user",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        });
    });
}

exports.deleteUser = (id, next) => {
    let init = async() => {
        let user_resp = await _deleteUser(id);
        next(null,{
            message: "Successfully Deleted",
            data: user_resp
        });
    };
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        next({
            message: "Error deleting user",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        },null);
    });
};