const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
require("dotenv").config();
const ferie = require("../models/Ferie.js")

jest.setTimeout(5000);

let dbBACKUPUSER;
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);
    dbBACKUPUSER= await ferie.find({}).exec()
})
afterAll( async ()  =>{
    await ferie.deleteMany({});
    await ferie.insertMany(dbBACKUPUSER)
    mongoose.connection.close(true);
})

describe('[SUPERTEST] [LOGGATI]  /api/v1/ferie', () => {

    var token = jwt.sign({email:"carlo@carletto.it"}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
    header={'Content-Type':'application/json', token:token};

    //TODO --> internal error 500

    // test('<201> POST create new ferie with right body', () => {
    //     return request(app).post('/api/v1/ferie')
    //     .set('x-access-token', token).set('Accept', 'application/json')
    //     .send({id:"628ab10a90c8c450a833a06a",dataInizio:'22/06/2022',dataFine:'30/06/2022',motivazione:'Bahamas'})
    //     .expect(201)
    // });

    test('<400> POST create new ferie with wrong/missing body', () => {
        return request(app).post('/api/v1/ferie')
        .send({dataInizio:"22/06/2022",motivazione:"Bahamas"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    test('<200> GET all ferie', () => {
        return request(app).get('/api/v1/ferie')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    });

    test('<200> Delete ferie/:id', () => {
        return request(app).delete('/api/v1/ferie/6288c1bc2d6147ddec016897/')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });    

    test('<404> PATCH modify not existing ferie', () => {
        return request(app).patch(`/api/v1/ferie/6288c1bc2d6147ddec016823/`)
        .send({motivazione:"stanco"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    //TODO --> Non trova id

    // test('<200> PATCH modify existing ferie', () => {
    //     return request(app).patch(`/api/v1/ferie/628ab10a90c8c450a833a06d/`)
    //     .send({dataInizio:"22/06/2022", dataFine:"30/06/2022",motivazione:"Bahamas"})
    //     .set('x-access-token', token).set('Accept', 'application/json')
    //     .expect(200)
    // }); 

})