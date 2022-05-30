const app = require('../app/app.js')
const Dipendente = require('../models/Dipendenti.js')
const Cartellino = require('../models/Cartellino.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

//find every workers
app.get('/api/v1/dipendente', isAuthenticated, isAuthorized, (req,res) =>{
    Dipendente.find().then((dipendente) => res.send(dipendente))
});

//find specific worker and get check-in
app.get('/api/v1/dipendentespecifico', isAuthenticated, isAuthorized, async (req,res) =>{
    const cartellino = await Cartellino.findOne({email: req.body.email});
    if(cartellino) return res.status(201).send(cartellino);
});

app.post('/api/v1/dipendente', isAuthenticated, isAuthorized , check('email').notEmpty(),check('nome').notEmpty(),check('cognome').notEmpty(),check('livello').notEmpty(),async (req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    let user = await Dipendente.findOne({email: req.body['email']});
    if(user) {
        return res.status(401).send('User already exists with this email');
    }

    let dipendente = new Dipendente({nome: req.body['nome'],cognome: req.body['cognome'], livello: req.body['livello'], data: req.body['data'],email: req.body['email']});
    dipendente.save()
        .then(() => res.status(201).send(`Succesfully save ${req.body.email}`))
        .catch(() => res.status(500).send(`Error saving ${req.body.email}`));
});

app.delete('/api/v1/dipendente', isAuthenticated, isAuthorized, async (req,res) => {

    let user = await Dipendente.findOne({email: req.body['email']});
    if(!user) {
        return res.status(401).send('Email not found');
    }else{
        Dipendente.remove(user.id)
            .then(() => res.status(201).send(`Successfully remove email ${req.params.email}`))
            .catch(() => res.status(500).send('Error deleting user'));
    }


    Dipendente.findByIdAndRemove(user.params.id)
        .then(() => res.status(201).send(`Successfully remove email ${req.params.email}`))
        .catch(() => res.status(500).send('Error deleting user'));
});

app.patch('/api/v1/dipendente/:id', isAuthenticated, isAuthorized, async (req, res) => {

    const dipendente = await Dipendente.findOne({email: req.body.email});
    if(dipendente) return res.status(400).send('Email already exists');

    Dipendente.findByIdAndUpdate({
        _id:req.params.id
    },{
        $set:req.body
    }).then(()=> {
        res.status(201).json({message:"success"});
    }).catch(err =>{
        res.status(500).send(err.message);
    });
});