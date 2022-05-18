import app from '../app/app.mjs'
import Dipendente from '../models/Dipendenti.mjs';
import {isAuthenticated, isAuthorized} from '../auth_middleware/auth.mjs'
import { check, validationResult,body }  from 'express-validator';

app.get('/dipendente', isAuthenticated, isAuthorized, (req,res) =>{
    Dipendente.find().then((dipendente) => res.send(dipendente))
});

app.post('/dipendente', isAuthenticated, isAuthorized, check('nome').notEmpty(),check('cognome').notEmpty(), check('data').notEmpty().isDate(new Date()),check('livello').notEmpty(),check('email').notEmpty().isEmail() ,(req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    let dipendente = new Dipendente({nome: req.body['nome'],cognome: req.body['cognome'], livello: req.body['livello'], data: req.body['data'],email: req.body['email']});
    dipendente.save()
        .then(() => res.status(201).send(`Succesfully save ${req.body.email}`))
        .catch(() => res.status(500).send(`Error saving ${req.body.email}`));
});

app.delete('/dipendente/:id', isAuthenticated, isAuthorized, check('id').notEmpty(), (req,res) => {
    Dipendente.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.body.email}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.body.email}`));
});

app.put('/dipendente/:id', isAuthenticated, isAuthorized, async (req, res) => {
    let dipendente = await Dipendente.findById(req.params.id);
    if(dipendente) {
        dipendente.nome = req.body['nome'];
        dipendente.cognome = req.body['cognome'];
        dipendente.livello = req.body['livello'];
        dipendente.data = req.body['data'];
        dipendente.email = req.body['email'];
        dipendente.save()
            .then(() => res.status(201).send(`Successfully modified: ${req.body.email}`))
            .catch(() => res.status(500).send(`Error modifiyng: ${req.body.email}`));
    } else {
        res.status(404).send('Dipendente not found');
    }
});