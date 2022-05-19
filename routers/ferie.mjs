import app from '../app/app.mjs'
import Ferie from '../models/Ferie.mjs';
import {isAuthenticated, isAuthorized} from '../auth_middleware/auth.mjs'
import { check, validationResult,body }  from 'express-validator';

app.get('/ferie', isAuthenticated, isAuthorized, (req,res) =>{
    Ferie.find().then((ferie) => res.send(ferie))
});

app.post('/ferie', isAuthenticated, isAuthorized, check('dataInizio').notEmpty().isDate(new Date()),check('dataFine').notEmpty().isDate(new Date()), check('motivazione').notEmpty() ,(req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    let ferie = new Ferie({dataInizio: req.body['dataInizio'],dataFine: req.body['dataFine'], motivazione: req.body['motivazione']});
    ferie.save()
        .then(() => res.status(201).send(`Succesfully save ${req.body.id}`))
        .catch(() => res.status(500).send(`Error saving ${req.body.id}`));
});

app.delete('/ferie/:id', isAuthenticated, isAuthorized, check('id').notEmpty(), (req,res) => {
    Ferie.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.params.id}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.params.id}`));
});

app.put('/ferie/:id', isAuthenticated, isAuthorized, async (req, res) => {
    let ferie = await Ferie.findById(req.params.id);
    if(ferie) {
        ferie.dataInizio = req.body['dataInizio'];
        ferie.dataFine = req.body['dataFine'];
        ferie.motivazione = req.body['motivazione'];
        ferie.save()
            .then(() => res.status(201).send(`Successfully modified: ${req.params.id}`))
            .catch(() => res.status(500).send(`Error modifiyng: ${req.params.id}`));
    } else {
        res.status(404).send('Ferie not found');
    }
});