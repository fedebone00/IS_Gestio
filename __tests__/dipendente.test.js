const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Dipendente = require('../models/Dipendenti');
const { Duplex } = require('stream');

jest.setTimeout(5000);

var dip 
let wrongId ="629e1d3d275a728f3eed4923";
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);

    dip = new Dipendente({email:"prova@nonesiete.it",nome:"antonio",cognome:"rossi",livello:'1',data:"2022/05/10"})
    await dip.save();

})
afterAll( async ()  =>{

    Dipendente.findByIdAndDelete(dip._id);
    mongoose.connection.close(true);
})

describe('Dipendente TESTS', () => {

    let token = jwt.sign({email:"carlo@carletto.it"},process.env.JWT_SIGN_KEY, {expiresIn: 89000})
    
    test('<201> POST create new Dipendente', () => {
        return request(app).post('/api/v1/dipendente')
            .set('x-access-token', token).set('Accept', 'application/json')
            .send({email:"prova@prova.it",nome:dip.nome,cognome:dip.cognome, livello:dip.livello, data:dip.data})
            .expect(201)
    })

    test('<401> POST create new Dipendente with already existed email', () => {
        return request(app).post('/api/v1/dipendente')
        .send({nome:dip.nome, cognome:dip.cognome, livello:dip.livello,email:dip.email})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(401)
    });

    test('<400> POST create new Dipendnete with wrong/missing body', () => {
        return request(app).post('/api/v1/dipendente')
        .send({nome:dip.nome})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    test('<201> GET every Dipendente', async() => {
        return request(app).get('/api/v1/dipendente')
            .set('x-access-token', token).set('Accept', 'application/json')
            .expect(201)
    });

    test('<201> GET dipendente by email', () => {
        return request(app).get('/api/v1/dipendente/byemail')
        .send({email:dip.email})
        .set('x-access-token', token).set('byemail', 'application/json')
        .expect(201)
    });

    test('<404> PATCH modify not existing Dipendente', () => {
        return request(app).patch(`/api/v1/dipendente/627e09d79141a0d16860d123`)
        .send({livello:"2"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    test('<200> PATCH modify existing Dipendente', () => {
        return request(app).patch(`/api/v1/dipendente/`+dip._id+`/`)
        .send({livello:"0"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    }); 

    test('<400> PATCH modify existing Dipendente changin his email in an already existing email', () => {
        return request(app).patch(`/api/v1/dipendente/`+dip._id+`/`)
        .send({email:dip.email})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    }); 

    test('<500> DELETE not existing Dipendente', () => {
        return request(app).delete(`/api/v1/dipendente/1gr34gewfsd534231`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(500)
    });    

    test('<201> DELETE delete existing Dipendente', () => {
        return request(app).delete(`/api/v1/dipendente/`+dip._id+`/`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    }); 

})

