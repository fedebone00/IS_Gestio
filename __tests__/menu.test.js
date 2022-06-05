const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
require("dotenv").config();
const menu = require("../models/Menu.js")

jest.setTimeout(5000);

let dbBACKUPUSER;
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);
    dbBACKUPUSER= await menu.find({}).exec()
})
afterAll( async ()  =>{
    await menu.deleteMany({});
    await menu.insertMany(dbBACKUPUSER)
    mongoose.connection.close(true);
})

describe('[SUPERTEST] [LOGGATI]  /api/v1/menu', () => {

    var token = jwt.sign({email:"carlo@carletto.it"}, process.env.JWT_SIGN_KEY, {expiresIn: 86400});
    header={'Content-Type':'application/json', token:token};

    test('<201> POST create new Menu with right body', () => {
        return request(app).post('/api/v1/menu')
        .send({primo:"pasta", secondo:"carne", dolce:"tiramisu",data:"20/05/2022"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });

    test('<401> POST create new Menu with already existed date', () => {
        return request(app).post('/api/v1/menu')
        .send({primo:"pasta", secondo:"carne", dolce:"tiramisu",data:"20/05/2022"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(401)
    });

    test('<400> POST create new Menu with wrong/missing body', () => {
        return request(app).post('/api/v1/menu')
        .send({primo:"pasta", dolce:"tiramisu",data:"20/05/2022"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    test('<201> GET Menu from a specified data', () => {
        return request(app).get('/api/v1/menu')
        .set({data:"20/05/2022"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });

    test('<201> GET display all Menu', () => {
        return request(app).get('/api/v1/menu/all')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });

    test('<201> GET display specific Menu based on id', () => {
        return request(app).get('/api/v1/specifico/6281f3ae0919d180b35b7e5e/')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });  

    test('<404> GET display specific Menu based on id', () => {
        return request(app).get('/api/v1/specifico/6281f3ae0919d180b35b7e23/')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    });  

    let id="1gr34gewfsd534231";

    test('<500> DELETE not existing menu', () => {
        return request(app).delete(`/api/v1/menu/1gr34gewfsd534231`)
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(500)
    });    

    test('<201> DELETE delete existing Menu', () => {
        return request(app).delete(`/api/v1/menu/6281f3ae0919d180b35b7e5e/`)
        .send({id:"6281f3ae0919d180b35b7e5e"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    }); 

    test('<500> PATCH modify not existing Menu', () => {
        return request(app).delete(`/api/v1/menu/:${id}`)
        .send({data:"20/05/2022"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(500)
    }); 

    test('<201> PATCH modify existing Menu', () => {
        return request(app).delete(`/api/v1/menu/6281f3ae0919d180b35b7e5e/`)
        .send({data:"20/05/2022",secondo:"pesce"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    }); 

})

