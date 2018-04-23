// Controllers
let models = require("../models");
let Joi = require("joi");
let axios = require("axios");
let Hogan = require('hogan.js');

const icon = require('log-symbols');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (user, next) => {
    let init = async() => {
        let token = jwt.sign(user, 'secret', {
            expiresIn: 86400 // expires in 24 hours
        });
        next(null,{
            message: "Successfully Login",
            token: token
        });
    };
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        next({
            message: "Error Login",
            icon: icon.error,
            data: {},
            error_message: icon.error + ' ' + err
        },null);
    });
};