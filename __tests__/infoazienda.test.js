const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Azienda = require('../models/Azienda.js');

jest.setTimeout(5000);

var azienda 
let wrongId ="629e1d3d275a728f3eed4923";
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);

    azienda = new Azienda({logo:"logo.png",partitaiva:"1234",contatto:"email@email.com"})
    await azienda.save();

})
afterAll( async ()  =>{

    Azienda.findByIdAndDelete(azienda._id);
    mongoose.connection.close(true);
})

describe('Azienda TESTS', () => {

    let token = jwt.sign({email:"carlo@carletto.it"},process.env.JWT_SIGN_KEY, {expiresIn: 89000})
    
    it('<201> POST create new info Azienda', async () => {
        var res = await request(app).post('/api/v1/infoazienda')
            .set('x-access-token', token).set('Accept', 'application/json')
            .send({logo:azienda.logo,partitaiva:"aaa", contatto:azienda.contatto});

        expect(res.status).toBe(201);
    })

    test('<401> POST create new info Azienda with already existed partitaiva', () => {
        return request(app).post('/api/v1/infoazienda')
        .send({logo:azienda.logo,partitaiva:azienda.partitaiva, contatto:azienda.contatto})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(401)
    });

    test('<400> POST create new info Azienda with wrong/missing body', () => {
        return request(app).post('/api/v1/infoazienda')
        .send({logo:azienda.logo,partitaiva:azienda.partitaiva})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    it('<201> GET info from every Azienda', async() => {
        var res = await request(app).get('/api/v1/infoazienda')
            .set('x-access-token', token).set('Accept', 'application/json')

        expect(res.status).toBe(201)
    });

    test('<201> GET display all info of a specific Azienda', () => {
        return request(app).get('/api/v1/infoazienda/bypiva')
        .set('x-access-token', token).set('Accept', 'application/json').set('partitaiva',azienda.partitaiva)
        .expect(201)
    });

    test('<500> DELETE not existing info Azienda', () => {
        return request(app).delete(`/api/v1/infoazienda/1gr34gewfsd534231`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(500)
    });    

    test('<404> PATCH modify not existing info Azienda', () => {
        return request(app).patch(`/api/v1/infoazienda/627e09d79141a0d16860d123`)
        .send({primo:"risotto"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    test('<200> PATCH modify existing info Azienda', () => {
        return request(app).patch(`/api/v1/infoazienda/`+azienda._id+`/`)
        .send({contatto:"pesce"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    }); 

    test('<201> DELETE delete existing info Azienda', () => {
        return request(app).delete(`/api/v1/infoazienda/`+azienda._id+`/`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    }); 


})
