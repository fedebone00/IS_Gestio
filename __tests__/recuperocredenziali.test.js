const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const crypto = require('node:crypto');

jest.setTimeout(5000);
let user;
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);
    user = new User({email: "test@test.test", password_hash: crypto.createHash('sha256').update("password".concat("salt")).digest('hex'), salt: "salt", role: "AA"});
    await user.save();
})
afterAll( async ()  => {
    User.findByIdAndDelete(user._id);
    mongoose.connection.close(true);
})

describe('TEST recuperoCredenziali - POST', () => {
    it('Successfull recupero credenziali request', async () => {
        let res = await request(app).post('/api/v1/recuperocredenziali')
            .send({email: user.email});

        expect(res.status).toBe(201); 
    })

    it('Email not an email in POST', async () => {
        let res = await request(app).post('/api/v1/recuperocredenziali')
            .send({email: "ldkanvslkdvn"});

        expect(res.status).toBe(400); 
    })

    it('Email not found in db in POST', async () => {
        let res = await request(app).post('/api/v1/recuperocredenziali')
            .send({email: "casual@email.it"});

        expect(res.status).toBe(401); 
    })
})


describe('TEST recuperoCredenziali - PUT', () => {
    it('Successfull recupero credenziali request', async () => {
        let token = jwt.sign({user_id: user._id}, process.env.JWT_SIGN_KEY, {expiresIn: '10m'});
        let res = await request(app).put('/api/v1/recuperocredenziali')
            .query({t: token})
            .send({password: 'password'});

        expect(res.status).toBe(201); 
    })

    it('Invalid query param "t"', async() => {
        let res = await request(app).put('/api/v1/recuperocredenziali')
            .query({t: "jsdnvksjnskjdvnskdjvnskdjvns"})
            .send({password: 'password'});

        expect(res.status).toBe(400);
    })

    it('Expired jwt query param "t"', async() => {
        let token = jwt.sign({user_id: user._id}, process.env.JWT_SIGN_KEY, {expiresIn: 0});
        let res = await request(app).put('/api/v1/recuperocredenziali')
            .query({t: token})
            .send({password: 'password'});

        expect(res.status).toBe(401);
    })

    it('Invalid user in jwt query param "t"', async() => {
        let token = jwt.sign({user_id: 'aaaaaaaaaaaaaaaaaaaaaaaa'}, process.env.JWT_SIGN_KEY, {expiresIn: '10m'});
        let res = await request(app).put('/api/v1/recuperocredenziali')
            .query({t: token})
            .send({password: 'password'});

        expect(res.status).toBe(401);
    })

    it('Invalid password', async () => {
        let token = jwt.sign({user_id: user._id}, process.env.JWT_SIGN_KEY, {expiresIn: '10m'});
        let res = await request(app).put('/api/v1/recuperocredenziali')
            .query({t: token})
            .send({password: 'p'});

        expect(res.status).toBe(400); 
    })
})