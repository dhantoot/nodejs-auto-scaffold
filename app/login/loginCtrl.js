// Controllers
let models = require("../models");
let Joi = require("joi");
let axios = require("axios");
let Hogan = require('hogan.js');

const icon = require('log-symbols');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req, res, next) => {
    let init = async() => {
        console.log('req.user==> ',req.user);
        let token = jwt.sign(req.user, 'secret', {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(201).json({
            success: true,
            message: "Successfully Login",
            token: token
        })
    }
    init().catch(err => {
        console.log(icon.error + ' OUTER LEVEL ERROR ', err);
        res.status(500).json({
            success: false,
            message: "Error creating login",
            icon: icon.error,
            error_message: icon.error + ' ' + err
        });
    });
}