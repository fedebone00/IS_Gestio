const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Mensa = require('../models/Prenotamensa.js');

jest.setTimeout(5000);

var mensa 
let wrongId ="629e1d3d275a728f3eed4923";
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);

    mensa = new Mensa({user_id:"1234",data:"2022/07/07"})
    await mensa.save();

})
afterAll( async ()  =>{

    Mensa.findByIdAndDelete(mensa._id);
    mongoose.connection.close(true);
})

describe('Mensa TESTS', () => {

    let token = jwt.sign({email:"carlo@carletto.it"},process.env.JWT_SIGN_KEY, {expiresIn: 89000})
    
    it('<201> POST create new prenotazione', async () => {

        var res = await request(app).post('/api/v1/prenotamensa')
            .set('x-access-token', token).set('Accept', 'application/json')
            .send({user_id:mensa.user_id,data:mensa.data});

        expect(res.status).toBe(201);
    })

    test('<400> POST create new prenotamensa with wrong/missing body', () => {
        return request(app).post('/api/v1/prenotamensa')
        .send({})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    it('<201> GET prenotamensa from a specified data', async() => {
        var res = await request(app).get('/api/v1/prenotamensa/')
            .set('x-access-token', token).set('Accept', 'application/json')

        expect(res.status).toBe(201)
    });

    test('<500> DELETE not existing prenotazione', () => {
        return request(app).delete(`/api/v1/prenotamensa/1gr34gewfsd534231`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(500)
    });    


    test('<404> PATCH modify not existing prenotazione', () => {
        return request(app).patch(`/api/v1/prenotamensa/627e09d79141a0d16860d123`)
        .send({primo:"risotto"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    test('<200> PATCH modify existing prenotazione', () => {
        return request(app).patch(`/api/v1/prenotamensa/`+mensa._id+`/`)
        .send({user_id:"12345"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    }); 


    test('<201> DELETE delete existing prenotazione', () => {
        return request(app).delete(`/api/v1/prenotamensa/`+mensa._id+`/`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    }); 

})

