
    let supertest = require("supertest");
    let should = require("should");
    let server = supertest.agent("http://localhost:1234");
    let chai = require('chai');
    let expect = chai.expect;
    let local = {};
    let credential = {
        "valid":{
            "superuser": {
                "username": "dhanixblue",
                "password": "password"
            }
        }
    };
    describe("login Given Valid Parameters", ()=>{
        before((done) =>{
            server
            .post('/users/login')
            .field("data", JSON.stringify(credential.valid.superuser))
            .end(function(err, res){
                local.token = res.body.token;
                done();
            })
        })
        describe("/POST/login", () =>{
            it("should create new login", (done) =>{
                server
                    .post("/login")
                    .set("Authorization", local.token)
                    .send({
                        "login_name": "new login"
                    })
                    .end((err, res)=>{
                        expect(res.status).to.be.equal(201);
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.equal(true);
                        expect(res.body).to.have.property('message');
                        expect(res.body).to.have.property('data');
                        expect(res.body.data).to.have.property('login_id');
                        expect(res.body.data.login_id).to.not.equal(null);
                        local.created_id = res.body.data.login_id;	
                        done();
                    })

            })
        })
    })