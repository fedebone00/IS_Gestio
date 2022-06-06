const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Malattia = require("../models/Malattia.js")

let mal;
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);

    mal = new Malattia({email:"prova@prova.it",certificato:"prova",dataInizio:"2022/09/20",dataFine:"2022/10/10"})
    await mal.save()

})
afterAll( async ()  =>{
    Malattia.findByIdAndDelete(mal._id)
    mongoose.connection.close(true);
})

describe('[SUPERTEST] [LOGGATI]  /api/v1/malattia', () => {

    var token = jwt.sign({email:"carlo@carletto.it"}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
    header={'Content-Type':'application/json', token:token};

    test('<201> POST create new ferie request in the right way', () => {
        return request(app).post('/api/v1/malattia')
        .send({email:mal.email, dataInizio:mal.dataInizio,dataFine:mal.dataFine})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });

    test('<400> POST create new ferie request with wrong/missing body', () => {
        return request(app).post('/api/v1/malattia')
        .send({email:"carlo@carletto.it", dataInizio:"20/05/2023"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    test('<201> GET malattia', () => {
        return request(app).get('/api/v1/malattia')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });

    test('<404> PATCH modify not existing malattia request', () => {
        return request(app).patch(`/api/v1/malattia/629dacd17386591d3cd16d20`)
        .send({dataInizio:"2022/06/19"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    test('<200> PATCH modify existing user', () => {
        return request(app).patch(`/api/v1/malattia/`+mal._id+'/')
        .send({dataInizio:"2022/06/19"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    }); 

    test('<201> DELETE malattia', () => {
        return request(app).delete('/api/v1/malattia/629dacd17386591d3cd16d56/')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });  

})

