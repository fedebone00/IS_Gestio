const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Ferie = require("../models/Ferie.js")

jest.setTimeout(5000);

let ferie;
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);

    ferie = new Ferie({id:"6288c1bc2d6147ddec016867",motivazione:"ferie",dataInizio:"2022/07/20",dataFine:"2022/07/30"})
    await ferie.save();

})
afterAll( async ()  =>{

    Ferie.findByIdAndDelete(ferie._id)
    mongoose.connection.close(true);
})

describe('[SUPERTEST] [LOGGATI]  /api/v1/ferie', () => {

    let token = jwt.sign({email:"carlo@carletto.it"}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
    header={'Content-Type':'application/json', token:token};

    test('<201> POST create new ferie with right body', () => {
        return request(app).post('/api/v1/ferie')
        .set('x-access-token', token).set('Accept', 'application/json')
        .send({dataInizio:ferie.dataInizio,dataFine:ferie.dataFine,motivazione:ferie.motivazione})
        .expect(201)
    });

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

    test('<404> PATCH modify not existing ferie', () => {
        return request(app).patch(`/api/v1/ferie/6288c1bc2d6147ddec016823/`)
        .send({motivazione:"stanco"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    test('<200> PATCH modify existing ferie', () => {
        return request(app).patch(`/api/v1/ferie/`+ferie._id+`/`)
        .send({motivazione:"Bahamas"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    }); 

    test('<200> Delete ferie/:id', () => {
        return request(app).delete('/api/v1/ferie/'+ferie._id+'/')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });   

})