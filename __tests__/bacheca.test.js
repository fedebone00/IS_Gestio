const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Bacheca = require('../models/Bacheca.js');

jest.setTimeout(5000);

var bacheca 
let wrongId ="629e1d3d275a728f3eed4923";
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);

    bacheca = new Bacheca({testoAnnuncio:"testo",scadenzaAnnuncio:"2022/07/07"})
    await bacheca.save();

})
afterAll( async ()  =>{

    Bacheca.findByIdAndDelete(bacheca._id);
    mongoose.connection.close(true);
})

describe('Mensa TESTS', () => {

    let token = jwt.sign({email:"carlo@carletto.it"},process.env.JWT_SIGN_KEY, {expiresIn: 89000})
    
    it('<201> POST create new annuncio', async () => {

        var res = await request(app).post('/api/v1/bacheca')
            .set('x-access-token', token).set('Accept', 'application/json')
            .send({testoAnnuncio:bacheca.testoAnnuncio,scadenzaAnnuncio:bacheca.scadenzaAnnuncio});

        expect(res.status).toBe(201);
    })

    test('<400> POST create new annuncio with wrong/missing body', () => {
        return request(app).post('/api/v1/bacheca')
        .send({})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    it('<201> GET every annunci', async() => {
        var res = await request(app).get('/api/v1/bacheca/')
            .set('x-access-token', token).set('Accept', 'application/json')
        expect(res.status).toBe(201)
    });

    test('<500> DELETE not existing prenotazione', () => {
        return request(app).delete(`/api/v1/bacheca/1gr34gewfsd534231`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(500)
    });    


    test('<404> PATCH modify not existing prenotazione', () => {
        return request(app).patch(`/api/v1/bacheca/627e09d79141a0d16860d123/`)
        .send({primo:"risotto"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    test('<200> PATCH modify existing prenotazione', () => {
        return request(app).patch(`/api/v1/bacheca/`+bacheca._id+`/`)
        .send({testoAnnuncio:"prova2"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    }); 


    test('<201> DELETE delete existing prenotazione', () => {
        return request(app).delete(`/api/v1/bacheca/`+bacheca._id+`/`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    }); 

})

