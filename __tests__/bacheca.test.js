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

    bacheca = new Bacheca({testoAnnuncio:"Party Tomorrow!",scadenzaAnnuncio:"20/07/22"})
    await bacheca.save();

})
afterAll( async ()  =>{

    Bacheca.findByIdAndDelete(bacheca._id);
    mongoose.connection.close(true);
})

describe('Bacheca TESTS', () => {

    let token = jwt.sign({email:"carlo@carletto.it"},process.env.JWT_SIGN_KEY, {expiresIn: 89000})
    
    it('<201> POST create new Bacheca', async () => {

        var res = await request(app).post('/api/v1/bacheca')
            .set('x-access-token', token).set('Accept', 'application/json')
            .send({testoAnnuncio:bacheca.testoAnnuncio,scadenzaAnnuncio:bacheca.scadenzaAnnuncio});

        expect(res.status).toBe(201);
    })

    test('<400> POST create new Bacheca with wrong/missing body', () => {
        return request(app).post('/api/v1/bacheca')
        .send({primo:"pasta", dolce:"tiramisu",data:"20/05/2022"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    test('<201> GET display specific Bacheca', () => {
        return request(app).get('/api/v1/bacheca')
        .set('x-access-token', token).set('Accept','application/json')
        .expect(201)
    });  

    test('<500> DELETE delete not existing Bacehca', () => {
        return request(app).delete(`/api/v1/bacheca/1gr34gewfsd534231`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(500)
    });    

    test('<404> PATCH modify not existing Bacehca', () => {
        return request(app).patch(`/api/v1/bacheca/627e09d79141a0d16860d123`)
        .send({scadenzaAnnuncio:bacheca.scadenzaAnnuncio})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    test('<200> PATCH modify existing Bacheca', () => {
        return request(app).patch(`/api/v1/bacheca/`+bacheca._id+`/`)
        .send({scadenzaAnnuncio:bacheca.scadenzaAnnuncio})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    }); 

    test('<201> DELETE delete existing Bacheca', () => {
        return request(app).delete(`/api/v1/bacheca/`+bacheca._id+`/`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    }); 

})

