const app = require('../app/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Menu = require('../models/Menu.js');


jest.setTimeout(5000);

var menus 
let wrongId ="629e1d3d275a728f3eed4923";
beforeAll( async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);

    menus = new Menu({primo:"pasta",secondo:"carne",dolce:"tiramisu",data:'1111/06/07'})
    await menus.save();

})
afterAll( async ()  =>{

    Menu.findByIdAndDelete(menus._id);
    mongoose.connection.close(true);
})

describe('Menu TESTS', () => {

    let token = jwt.sign({email:"carlo@carletto.it"},process.env.JWT_SIGN_KEY, {expiresIn: 89000})
    
    it('<201> POST create new Menu', async () => {

        var res = await request(app).post('/api/v1/menu')
            .set('x-access-token', token).set('Accept', 'application/json')
            .send({primo:menus.primo,secondo:menus.secondo, dolce:menus.dolce,data:"1234/12/34"});

        expect(res.status).toBe(201);
    })

    test('<401> POST create new Menu with already existed date', () => {
        return request(app).post('/api/v1/menu')
        .send({primo:"pasta", secondo:"carne", dolce:"tiramisu",data:"1234/12/34"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(401)
    });

    test('<400> POST create new Menu with wrong/missing body', () => {
        return request(app).post('/api/v1/menu')
        .send({primo:"pasta", dolce:"tiramisu",data:"20/05/2022"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(400)
    });       

    it('<201> GET Menu from a specified data', async() => {
        var res = await request(app).get('/api/v1/menu/all')
            .set('x-access-token', token).set('Accept', 'application/json')

        expect(res.status).toBe(201)
    });

    test('<201> GET display all Menu', () => {
        return request(app).get('/api/v1/menu/all')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });

    test('<201> GET display specific Menu based on id', () => {
        return request(app).get('/api/v1/menu/specifico/'+menus._id+'/')
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(201)
    });  

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

    test('<404> PATCH modify not existing Menu', () => {
        return request(app).patch(`/api/v1/menu/627e09d79141a0d16860d123`)
        .send({primo:"risotto"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(404)
    }); 

    test('<200> PATCH modify existing Menu', () => {
        return request(app).patch(`/api/v1/menu/`+menus._id+`/`)
        .send({secondo:"pesce"})
        .set('x-access-token', token).set('Accept', 'application/json')
        .expect(200)
    }); 



})

