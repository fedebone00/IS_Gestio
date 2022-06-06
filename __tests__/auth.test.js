const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const crypto = require('node:crypto')

jest.setTimeout(5000);

var userAA, userDIP0, userDIP1;
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);
    let password = 'password';
    let salt = 'ianckjansca';

    userAA = new User({email: "AA@AA.test", password_hash: crypto.createHash('sha256').update(password.concat(salt)).digest('hex'), salt: salt, role: "AA"});
    await userAA.save();
    
    userDIP0 = new User({email: "DIP0@DIP0.test", password_hash: crypto.createHash('sha256').update(password.concat(salt)).digest('hex'), salt: salt, role: "DIP0"});
    await userDIP0.save();

    userDIP1 = new User({email: "DIP1@DIP1.test", password_hash: crypto.createHash('sha256').update(password.concat(salt)).digest('hex'), salt: salt, role: "DIP1"});
    await userDIP1.save();
})
afterAll( async ()  =>{
    User.findByIdAndDelete(userAA._id);
    User.findByIdAndDelete(userDIP0._id);
    User.findByIdAndDelete(userDIP1._id);

    mongoose.connection.close(true);
})

describe('Login TESTS', () => {

    it('Successfull login - AA', async () => {
        var res = await request(app).post('/api/v1/auth/login')
            .send({email: userAA.email, password: 'password'});

        expect(res.status).toBe(201);
        expect(res.body['jwt']).not.toBeNull();
        expect(res.body['rt']).not.toBeNull();

        let token = jwt.verify(res.body['jwt'], process.env.JWT_SIGN_KEY);
        let rt = jwt.verify(res.body['rt'], process.env.JWT_SIGN_KEY);

        expect(String(token.user_id)).toStrictEqual(String(userAA._id))
        expect(token.role).toBe(userAA.role)

        expect(String(rt.user_id)).toStrictEqual(String(userAA._id))
    })

    it('Successfull login - DIP0', async () => {
        var res = await request(app).post('/api/v1/auth/login')
            .send({email: userDIP0.email, password: 'password'});

        expect(res.status).toBe(201);
        expect(res.body['jwt']).not.toBeNull();
        expect(res.body['rt']).not.toBeNull();

        let token = jwt.verify(res.body['jwt'], process.env.JWT_SIGN_KEY);
        let rt = jwt.verify(res.body['rt'], process.env.JWT_SIGN_KEY);

        expect(String(token.user_id)).toStrictEqual(String(userDIP0._id))
        expect(token.role).toBe(userDIP0.role)

        expect(String(rt.user_id)).toStrictEqual(String(userDIP0._id))
    })

    it('Successfull login - DIP1', async () => {
        var res = await request(app).post('/api/v1/auth/login')
            .send({email: userDIP1.email, password: 'password'});

        expect(res.status).toBe(201);
        expect(res.body['jwt']).not.toBeNull();
        expect(res.body['rt']).not.toBeNull();

        let token = jwt.verify(res.body['jwt'], process.env.JWT_SIGN_KEY);
        let rt = jwt.verify(res.body['rt'], process.env.JWT_SIGN_KEY);

        expect(String(token.user_id)).toStrictEqual(String(userDIP1._id))
        expect(token.role).toBe(userDIP1.role)

        expect(String(rt.user_id)).toStrictEqual(String(userDIP1._id))
    })

    it('Unsuccessfull login - Wrong Password', async () => {
        var res = await request(app).post('/api/v1/auth/login')
            .send({email: userAA.email, password: "akjnckakjsca"});

        expect(res.status).toBe(404);
    })

    it('Unsuccessfull login - Unexisting Email', async () => {
        var res = await request(app).post('/api/v1/auth/login')
            .send({email: "ajkscnak@akjscnaks.com", password: "akjnscjkanscka"});

        expect(res.status).toBe(404);
    })

    it('Unsuccessfull login - Email not an Email', async () => {
        var res = await request(app).post('/api/v1/auth/login')
            .send({email: "ajkscnak", password: "akjnscjkanscka"});

        expect(res.status).toBe(400);
    })
})