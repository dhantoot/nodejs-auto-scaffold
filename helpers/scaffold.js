
const icon = require('log-symbols');
const shell = require('shelljs');
const str = require('./cammelcase');
var replace = require("replace");


let scaffold = function (_component, component_index, component_Ctrl, component_Test) {
    var ndex = shell.ShellString(`
    let middleware = require('../../config/middleware.js');
    let controller = require('./${_component}Ctrl.js');

    module.exports = function (router) {
        // Routes
        router.get('/${_component}', middleware.validateBearer, controller.getAll${str.toCammelCase(_component)});
        router.get('/${_component}/:id', middleware.validateBearer, controller.get${str.toCammelCase(_component)}ById);
        router.post('/${_component}', middleware.validateBearer, controller.create${str.toCammelCase(_component)});
        router.put('/${_component}/:id', middleware.validateBearer, controller.update${str.toCammelCase(_component)});
        router.delete('/${_component}/:id', middleware.validateBearer, controller.delete${str.toCammelCase(_component)});
    }`);

    ndex.to(component_index);

    var ctrl = shell.ShellString(`
    // Controllers
    const models = require("../models");
    const Sequelize = require("sequelize");
    const Joi = require("joi");
    const axios = require("axios");
    const Hogan = require('hogan.js');
    const icon = require('log-symbols');

    let _get${str.toCammelCase(_component)}s = async () => {
        //initialize variables here..
        let ${_component}FieldsFilter = [];
        return new Promise(resolve => {
            resolve(
               // put logic in here..
               ["${_component} route is awesomely fucking working !"]
            )
        })
    };
    let _get${str.toCammelCase(_component)}ById = async (id) => {
        //initialize variables here..
        let ${_component}FieldsFilter = [];
        return new Promise(resolve => {
            resolve(
               // put logic in here..
            )
        })
    };
    let _create${str.toCammelCase(_component)} = async (data) => {
        //initialize variables here..
        return new Promise(resolve => {
            resolve(
               // put logic in here..
            )
        })
    }
    let _update${str.toCammelCase(_component)} = async(id,data) => {
        //initialize variables here..
        return new Promise(resolve => {
            resolve(
                // put logic in here..
            )
        })
    }
    let _delete${str.toCammelCase(_component)} = async (id) => {
        //initialize variables here..
        return new Promise(resolve => {
            resolve(
                // put logic in here..
            )
        })
    }

    exports.getAll${str.toCammelCase(_component)} =  (req, res, next) =>{
        let init = async () => {
            let ${_component}_resp = await _get${str.toCammelCase(_component)}s();
            res.status(200).json({
                success: true,
                message: "Success",
                icon : icon.success,
                data: {
                    total_rows: ${_component}_resp.length,
                    ${_component}s: ${_component}_resp
                }
            });
        }
        init().catch(err => {
            console.log(icon.error + ' OUTER LEVEL ERROR ', err);
            res.status(500).json({
                success: false,
                message: "Error getting ${_component}",
                icon : icon.error,
                data: {
                    total_rows: 0,
                    ${_component}s: []
                },
                error_message: icon.error+' '+err
            });
        });
    }

    exports.get${str.toCammelCase(_component)}ById =  (req, res, next) =>{
        let init = async () => {
            let ${_component}_resp = await _get${str.toCammelCase(_component)}ById(req.params.id);
            res.status(200).json({
                success: true,
                message: "Success",
                data: ${_component}_resp
            })
        }
        init().catch(err => {
            console.log(icon.error + ' OUTER LEVEL ERROR ', err);
            res.status(500).json({
                success: false,
                message: "Error getting ${_component} by id",
                icon: icon.error,
                data: {},
                error_message: icon.error + ' ' + err
            });
        });
    }

    exports.create${str.toCammelCase(_component)} =  (req, res, next) =>{
        let init = async () => {
            let ${_component}_resp = await _create${str.toCammelCase(_component)}(req.body);
            res.status(201).json({
                success: true,
                message: "Successfully Created",
                data: ${_component}_resp
            })
        }
        init().catch(err => {
            console.log(icon.error + ' OUTER LEVEL ERROR ', err);
            res.status(500).json({
                success: false,
                message: "Error creating ${_component}",
                icon: icon.error,
                data: {},
                error_message: icon.error + ' ' + err
            });
        });
    }

    exports.update${str.toCammelCase(_component)} =  (req, res, next) =>{
        let init = async () => {
            let ${_component}_resp = await _update${str.toCammelCase(_component)}(req.params.id, req.body);
            res.status(201).json({
                success: true,
                message: "Successfully Modified",
                data: ${_component}_resp
            })
        }
        init().catch(err => {
            console.log(icon.error + ' OUTER LEVEL ERROR ', err);
            res.status(500).json({
                success: false,
                message: "Error updating ${_component}",
                icon: icon.error,
                data: {},
                error_message: icon.error + ' ' + err
            });
        });
    }

    exports.delete${str.toCammelCase(_component)} =  (req, res, next) =>{
        let init = async () => {
            let ${_component}_resp = await _delete${str.toCammelCase(_component)}(req.params.id);
            res.status(201).json({
                success: true,
                message: "Successfully Deleted",
                data: ${_component}_resp
            })
        }
        init().catch(err => {
            console.log(icon.error + ' OUTER LEVEL ERROR ', err);
            res.status(500).json({
                success: false,
                message: "Error deleting ${_component}",
                icon: icon.error,
                data: {},
                error_message: icon.error + ' ' + err
            });
        });
    }`);

    ctrl.to(component_Ctrl);

    var test = shell.ShellString(`
    let supertest = require("supertest");
    let should = require("should");
    let server = supertest.agent("http://localhost:1234");
    let chai = require('chai');
    let expect = chai.expect;
    let local = {};
    let credential = {
        "valid":{
            "superuser": {
                "username": "dhantoot",
                "userpassword": "dhantoot"
            }
        }
    };
    describe("${_component} Given Valid Parameters", ()=>{
        before((done) =>{
            server
            .post('/login')
            .auth(credential.valid.superuser.username, credential.valid.superuser.userpassword)
            .end(function(err, res){
                local.token = 'Bearer '+res.body.token;
                done();
            })
        })


        describe("/GET/${_component.toLowerCase()}", ()=>{
            it("should get ${_component.toLowerCase()}", (done) =>{
                server
                    .get("/${_component.toLowerCase()}")
                    .set("Authorization", local.token)
                    .end((err, res) =>{
                        expect(res.status).to.be.equal(200);
                        expect(res.body.success).to.be.equal(true);
                        expect(res.body.data).to.have.property('total_rows');
                        expect(res.body.data).to.have.property('${_component.toLowerCase()}s');
                        expect(res.body.data.${_component.toLowerCase()}s[0]).to.have.property('id');
                        expect(res.body.data.${_component.toLowerCase()}s[0]).to.have.property('username');
                        done();
                    })
            })
        })


        describe("/POST/${_component.toLowerCase()}", () =>{
            it("should create new ${_component.toLowerCase()}", (done) =>{
                server
                    .post("/${_component.toLowerCase()}")
                    .set("Authorization", local.token)
                    .send({
                        "${_component.toLowerCase()}_name": "new ${_component.toLowerCase()}"
                    })
                    .end((err, res)=>{
                    
                        expect(res.status).to.be.equal(200);
                        expect(res.body.success).to.be.equal(true);
                        expect(res.body).to.have.property('message');
                        expect(res.body).to.have.property('data');
                        expect(res.body.data).to.have.property('${_component.toLowerCase()}_id');
                        expect(res.body.data.${_component.toLowerCase()}_id).to.not.equal(null);
                        local.created_id = res.body.data.${_component.toLowerCase()}_id;	
                        done();
                    })

            })
        })

        describe("/GET/${_component.toLowerCase()}/:id", ()=>{
            it("should get specific ${_component.toLowerCase()}", (done)=>{
                server
                    .get("/${_component.toLowerCase()}/"+local.created_id)
                    .set("Authorization", local.token)
                    .end((err, res)=>{
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.have.property('${_component.toLowerCase()}_id');
                        expect(res.body).to.have.property('${_component.toLowerCase()}_name');
                        local.created_data = res.body;
                        done();
                    })
            })
        })

        describe("/PUT/${_component.toLowerCase()}/:id", ()=>{
            it("should update ${_component.toLowerCase()}", (done)=>{
                server
                    .put("/${_component.toLowerCase()}/"+local.created_id)
                    .set("Authorization", local.token)
                    .send({
                        "${_component.toLowerCase()}_name": "update new ${_component.toLowerCase()}"
                    })
                    .end((err, res)=>{
                        expect(res.status).to.be.equal(201);
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.equal(true);
                        expect(res.body).to.have.property('message');
                        done();
                    })
            })
        })

        describe("/DELETE/${_component.toLowerCase()}/:id", ()=>{
            it("should delete ${_component.toLowerCase()}", (done)=>{
                server
                    .delete("/${_component.toLowerCase()}/"+local.created_id)
                    .set("Authorization", local.token)
                    .end((err, res)=>{
                        expect(res.status).to.be.equal(201);
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.equal(true);
                        expect(res.body).to.have.property('message');
                        done();
                    })
            })
        })    
    })`);

    test.to(component_Test);

    replace({
        regex: "//auto_add_routes_here_please_dont_delete",
        replacement: `require('./app/${_component}')(app);\n//auto_add_routes_here_please_dont_delete`,
        paths: ['./server.js'],
        recursive: false,
        silent: false,
    });
}

exports.scaffold = scaffold;