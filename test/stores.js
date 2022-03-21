const { should } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

const authUser = {
    username: 'test@koibanx.com',
    password: 'admin'
};

/**
 * Test Api  - News endpoint
 */

describe('Test Stores endpoints', () => {
    describe('GET /api/stores', () => {

        it('GET All - (basicAuth)', (done) => {
        chai.request(app)
            .get(`/api/stores`)
            .auth(authUser.username, authUser.password)
            .end((err, response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                response.body.should.have.keys('data', 'limit', 'page', 'pages', 'total');
                response.body.limit.should.be.equal(10)
                response.body.data.map((obj, index) => {
                    obj.should.contain.all.deep.keys(["concepts", "name", "cuit", "currentBalance", "active", "lastSale"])
                })
                done();
            });
        });

        it('GET All with query (page) - (basicAuth)', (done) => {
            const page = 4;
            chai.request(app)
                .get(`/api/stores`)
                .query({q:`{"page":${page}}`})
                .auth(authUser.username, authUser.password)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.keys('data', 'limit', 'page', 'pages', 'total');
                    response.body.page.should.be.equal(page)
                    done();
                });
        });

        it('GET All with query (limit) - (basicAuth)', (done) => {
            const limit = 7;
            chai.request(app)
                .get(`/api/stores`)
                .query({q:`{"limit":${limit}}`})
                .auth(authUser.username, authUser.password)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.keys('data', 'limit', 'page', 'pages', 'total');
                    response.body.limit.should.be.equal(limit)
                    done();
                });
        });

        it('Error - GET All with bad format query - (basicAuth)', (done) => {
            chai.request(app)
                .get(`/api/stores`)
                .query({q:`{limit:7}`}) // param limit without ""
                .auth(authUser.username, authUser.password)
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.error.message.should.include("Something failed!")
                    response.body.error.type.should.include("Error")
                    done();
                });
        });

        it('Error - GET All - (No basicAuth params)', (done) => {
            chai.request(app)
                .get(`/api/stores`)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.error.message.should.include("Missing Authorization Header")
                    response.body.error.type.should.include("Auth error")
                    done();
                });
        });

        it('Error Auth - (bad password)', (done) => {
            chai.request(app)
                .get(`/api/stores`)
                .auth(authUser.username, 'badPassword')
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.error.message.should.include("Invalid Authentication Credentials")
                    response.body.error.type.should.include("Auth error")
                    done();
                });
        });

        it('Error Route - (route not exist)', (done) => {
            chai.request(app)
                .get(`/api/routenotexist`)
                .auth(authUser.username, 'badPassword')
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.error.message.should.include("Route not found")
                    response.body.error.type.should.include("HTTP error")
                    done();
                });
        });
    });

    describe('POST /api/stores', () => {
        const store = {
            name: "testing store",
            cuit: "20111111111",
            concepts:["testA", "testB"] ,
            currentBalance: "1100",
            active: "true",
            lastSale: "2022-01-11"
        }

        const badStore = {
            name: "testing badStore",
        }

        it('Create Store - (basicAuth)', (done) => {
            chai.request(app)
                .post(`/api/stores`)
                .auth(authUser.username, authUser.password)
                .send(store)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.contain.keys(["concepts", "name", "cuit", "currentBalance", "active", "lastSale"]);
                    done();
                });
        });

        it('Create Store - (basicAuth)', (done) => {
            chai.request(app)
                .post(`/api/stores`)
                .auth(authUser.username, authUser.password)
                .send(badStore)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.should.be.a('object');
                    response.body.should.have.property('error');
                    response.body.error.map((error) => error.should.deep.keys('msg', 'param', 'location'));
                    done();
                });
        });

        it('Error - Create Store - (No basicAuth params)', (done) => {
            chai.request(app)
                .post(`/api/stores`)
                .send(store)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.error.message.should.include("Missing Authorization Header")
                    response.body.error.type.should.include("Auth error")
                    done();
                });
        });

        it('Error Auth - (bad username)', (done) => {
            chai.request(app)
                .post(`/api/stores`)
                .auth('badUsername', authUser.password)
                .send(store)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.error.message.should.include("Invalid Authentication Credentials")
                    response.body.error.type.should.include("Auth error")
                    done();
                });
        });
    })
});
