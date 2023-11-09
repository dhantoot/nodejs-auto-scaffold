
    let supertest = require("supertest");
    let should = require("should");
    let server = supertest.agent("http://localhost:5000");
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
    describe("user Given Valid Parameters", ()=>{
        before((done) =>{
            server
            .post('/login')
            .auth(credential.valid.superuser.username, credential.valid.superuser.userpassword)
            .end(function(err, res){
                local.token = 'Bearer '+res.body.token;
                done();
            })
        })


        describe("/GET/user", ()=>{
            it("should get user", (done) =>{
                console.log('local.token ',local.token);
                server
                    .get("/user")
                    .set("Authorization", local.token)
                    .end((err, res) =>{
                        expect(res.status).to.be.equal(200);
                        expect(res.body.success).to.be.equal(true);
                        expect(res.body).to.have.property('data');
                        expect(res.body).to.have.property('message');
                        expect(res.body.data).to.have.property('total_rows');
                        expect(res.body.data).to.have.property('users');
                        expect(res.body.data.users[0]).to.have.property('id');
                        expect(res.body.data.users[0]).to.have.property('username');
                        done();
                    })
            })
        })


        describe("/POST/user", () =>{
            it("should create new user", (done) =>{
                server
                    .post("/user")
                    .set("Authorization", local.token)
                    .send({
                        "username": "new user",
                        "userpassword" : "new password"
                    })
                    .end((err, res)=>{
                        console.log('res.body.data ', res.body.data)
                        expect(res.status).to.be.equal(200);
                        expect(res.body.success).to.be.equal(true);
                        expect(res.body).to.have.property('data');
                        expect(res.body).to.have.property('message');
                        expect(res.body.data).to.not.equal(null);
                        expect(res.body.data.id).to.not.equal(null);
                        local.created_id = res.body.data.id;	
                        done();
                    })

            })
        })

        describe("/GET/user/:id", ()=>{
            it("should get specific user", (done)=>{
                server
                    .get("/user/"+local.created_id)
                    .set("Authorization", local.token)
                    .end((err, res)=>{
                        console.log('res ',res);
                        expect(res.status).to.be.equal(200);
                        expect(res.body.success).to.be.equal(true);
                        expect(res.body).to.have.property('data');
                        expect(res.body).to.have.property('message');
                        expect(res.body.data).to.not.equal(null);
                        expect(res.body.data.id).to.not.equal(null);
                        local.created_data = res.body;
                        done();
                    })
            })
        })

        describe("/PUT/user/:id", ()=>{
            it("should update user", (done)=>{
                local.created_id = local.created_id || 1;
                console.log('update ',local.created_id)
                server
                    .put("/user/"+local.created_id)
                    .set("Authorization", local.token)
                    .send({
                        "username": "update new user",
                        "userpassword": "updated password"
                    })
                    .end((err, res)=>{
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.have.property('success');
                        expect(res.body).to.have.property('message');
                        done();
                    })
            })
        })

        describe("/DELETE/user/:id", ()=>{
            local.created_id = local.created_id || 1;
            it("should delete user", (done)=>{
                server
                    .delete("/user/"+local.created_id)
                    .set("Authorization", local.token)
                    .end((err, res)=>{
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.have.property('success');
                        expect(res.body).to.have.property('message');
                        done();
                    })
            })
        })
    })