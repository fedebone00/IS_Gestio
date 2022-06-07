const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Cartellino = require("../models/Cartellino.js")

jest.setTimeout(5000);

let cart;
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);

    cart = new Cartellino({tipo:"entrata",ora:"18.18",data:2001/24/12,smartworking:true})
    await cart.save();

})
afterAll( async ()  =>{

    Cartellino.findByIdAndDelete(cart._id);
    mongoose.connection.close(true);
})

describe('[SUPERTEST] [LOGGATI]  /api/v1/timbratura', () => {

    var token = jwt.sign({email:"carlo@carletto.it"}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
    header={'Content-Type':'application/json', token:token};

    test('<201> POST create new timbratura with right body', () => {
        return request(app).post('/api/v1/timbratura')
            .send({tipo:cart.tipo, smartworking:cart.smartworking})
            .set('x-access-token', token).set('Accept', 'application/json')
            .expect(201)
    });

    test('<400> POST create new timbratura with wrong/missing body', () => {
        return request(app).post('/api/v1/timbratura')
        .send({ora:cart.ora, smartworking:cart.smartworking,data:cart.data})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    test('<201> GET all timbrature', () => {
        return request(app).get('/api/v1/timbratura/')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });

    test('<404> PATCH modify not existing Menu', () => {
        return request(app).patch(`/api/v1/timbratura/628ae214fc6e8c45c735ab22/}`)
        .send({tipo:"uscita"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    test('<200> PATCH modify existing Menu', () => {
        return request(app).patch(`/api/v1/timbratura/`+cart._id+`/`)
        .send({tipo:"entrata"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    }); 

    test('<201> Delete timbrature/:id', () => {
        return request(app).delete('/api/v1/timbratura/'+cart._id+'/')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });    

})

