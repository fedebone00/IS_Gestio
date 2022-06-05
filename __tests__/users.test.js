const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
require("dotenv").config();

jest.setTimeout(9000);

beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);
})
afterAll( () =>{
    mongoose.connection.close(true);
})

describe('[SUPERTEST] [LOGGATI]  /api/v1/users', () => {

    var token = jwt.sign({email:"carlo@carletto.it"}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
    header={'Content-Type':'application/json', token:token};

    test('<201> POST login to areaDipendente with right email and password', () => {
        return request(app).post('/api/v1/users')
        .send({email:"carlo@carletto.it", password:"password"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });

    test('<401> POST login to areaDipendente with right email and password', () => {
        return request(app).post('/api/v1/users')
        .send({email:"carlo@carletto.it", password:"password"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(401)
    });

    test('<400> POST login to areaDipendente with wrong/missing email and password', () => {
        return request(app).post('/api/v1/users')
        .send({email:"carlo@carletto.it", password:"pa"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    test('<201> GET users', () => {
        return request(app).get('/api/v1/users')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });

    test('<201> DELETE user', () => {
        return request(app).delete('/api/v1/users')
        .send({email:"carlo@carletto.it"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });   
    
    test('<401> DELETE not existing user', () => {
        return request(app).delete('/api/v1/users')
        .send({email:"rossi@mario.it"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(401)
    });

    // TODO --> modified api on backend, need to wait for change in heroku

    // test('<201> PUT modify existing user', () => {
    //     return request(app).put('/api/v1/users/628ab10a90c8c450a833a06d/')
    //     .set('x-access-token', token).set('Accept', 'application/json')
    //     .expect(201)
    // }); 

    let id = 4924589;

    test('<404> PUT modify not existing user', () => {
        return request(app).delete(`/api/v1/users/:${id}`)
        .send({email:"carlo@carletto.it"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

})

