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
    user = new User({email: "usertest@test.test", password_hash: crypto.createHash('sha256').update("password".concat("salt")).digest('hex'), salt: "salt", role: "AA"});
    await user.save();
})
afterAll( async ()  => {
    User.findByIdAndDelete(user._id);
    mongoose.connection.close(true);
})

describe('TESTS user - GET', () => {
    it('Successfull GET', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).get('/api/v1/users')
            .set('x-access-token', token);

        expect(res.status).toBe(201);
    })

    it('GET with unauthenticated user', async () => {
        var res = await request(app).get('/api/v1/users');

        expect(res.status).toBe(401);
    })
})

describe('TESTS user - POST', () => {
    it('Create AA user', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).post('/api/v1/users')
            .set('x-access-token', token)
            .send({email: "test@test.it", password: "password", role: "AA"});

        await User.findByIdAndDelete(res.body['_id']);

        expect(res.status).toBe(201);
        expect(res.body['email']).toStrictEqual("test@test.it");
        expect(res.body['role']).toStrictEqual("AA");
    })

    it('Create DIP0 user', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).post('/api/v1/users')
            .set('x-access-token', token)
            .send({email: "test@test.it", password: "password", role: "DIP0"});

        await User.findByIdAndDelete(res.body['_id']);

        expect(res.status).toBe(201);
        expect(res.body['email']).toStrictEqual("test@test.it");
        expect(res.body['role']).toStrictEqual("DIP0");
    })

    it('Create DIP1 user', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).post('/api/v1/users')
            .set('x-access-token', token)
            .send({email: "test@test.it", password: "password", role: "DIP1"});

        await User.findByIdAndDelete(res.body['_id']);

        expect(res.status).toBe(201);
        expect(res.body['email']).toStrictEqual("test@test.it");
        expect(res.body['role']).toStrictEqual("DIP1");
    })

    it('Create already existing user', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).post('/api/v1/users')
            .set('x-access-token', token)
            .send({email: user.email, password: "password", role: "DIP1"});

        expect(res.status).toBe(400);
    })

    it('Email not an email', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).post('/api/v1/users')
            .set('x-access-token', token)
            .send({email: "jasnckjsnc", password: "password", role: "DIP1"});

        expect(res.status).toBe(400);
    })

    it('Invalid password', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).post('/api/v1/users')
            .set('x-access-token', token)
            .send({email: "test@test.it", password: "p", role: "DIP1"});

        expect(res.status).toBe(400);
    })

    it('Invalid role', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).post('/api/v1/users')
            .set('x-access-token', token)
            .send({email: "test@test.it", password: "password", role: "ciao"});

        expect(res.status).toBe(400);
    })
})

describe('TEST user - DELETE', () => {
    it('Successfull delete user', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).delete('/api/v1/users')
            .set('x-access-token', token)
            .send({email: user.email});
        
        expect(res.status).toBe(200);
        expect(await User.exists({_id: user._id})).toBeNull();

        user.isNew = true;
        await user.save();
    })

    it('Empty email field', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).delete('/api/v1/users')
            .set('x-access-token', token);
        
        expect(res.status).toBe(400);
    })

    it('User not found', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).delete('/api/v1/users')
            .set('x-access-token', token)
            .send({email: "casual@email.it"});
        
        expect(res.status).toBe(400);
    })
})

describe('TEST user - PUT', () => {
    it('Successfully update user email', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).put(`/api/v1/users/${user._id}`)
            .set("x-access-token", token)
            .send({email: "user@test.it"});

        expect(res.status).toBe(201);
        expect((await User.findById(user._id)).email).toBe("user@test.it");

        User.findByIdAndUpdate(user._id, user);
    })

    it('Successfully update user role', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).put(`/api/v1/users/${user._id}`)
            .set("x-access-token", token)
            .send({role: "DIP1"});

        expect(res.status).toBe(201);
        expect((await User.findById(user._id)).role).toBe("DIP1");

        User.findByIdAndUpdate(user._id, user);
    })

    it('Successfully update user email and role', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).put(`/api/v1/users/${user._id}`)
            .set("x-access-token", token)
            .send({email: "user@test.it", role: "DIP0"});

        expect(res.status).toBe(201);
        expect((await User.findById(user._id)).email).toBe("user@test.it");
        expect((await User.findById(user._id)).role).toBe("DIP0");

        User.findByIdAndUpdate(user._id, user);
    })

    it('Update unexisting user', async () => {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
        var res = await request(app).put(`/api/v1/users/aaaaaaaaaaaaaaaaaaaaaaaa`)
            .set("x-access-token", token)
            .send({email: "user@test.it", role: "DIP0"});

        expect(res.status).toBe(404);
    })
})