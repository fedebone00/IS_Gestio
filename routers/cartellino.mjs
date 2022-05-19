import app from '../app/app.mjs'
import Cartellino from '../models/Cartellino.mjs'
import {isAuthenticated, isAuthorized} from '../auth_middleware/auth.mjs'
import { check, validationResult,body }  from 'express-validator';


app.get('/timbratura', isAuthenticated, isAuthorized, (req,res) =>{
    Cartellino.find().then((cartellino) => res.send(cartellino))
});

app.post('/timbratura', isAuthenticated, isAuthorized, check('data').notEmpty().isDate(new Date()),check('tipo').notEmpty(), check('ora').notEmpty(),check('smartworking').notEmpty() ,(req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    let c = new Cartellino({data: req.body['data'],tipo: req.body['tipo'], ora: req.body['ora'], smartworking: req.body['smartworking']});
    c.save()
        .then(() => res.status(201).send(`Succesfully checked ${req.body.tipo}`))
        .catch(() => res.status(500).send(`Error checking ${req.body.tipo}`));
});

app.delete('/timbratura/:id', isAuthenticated, isAuthorized, check('id').notEmpty(), (req,res) => {
    Cartellino.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.params.id}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.params.id}`));
});

app.put('/timbratura/:id', isAuthenticated, isAuthorized, async (req, res) => {
    let cartellino = await Cartellino.findById(req.params.id);
    if(cartellino) {
        cartellino.data = req.body['data'];
        cartellino.tipo = req.body['tipo'];
        cartellino.ora = req.body['ora'];
        cartellino.smartworking  = req.body['smartworking'];
        cartellino.save()
            .then(() => res.status(201).send(`Successfully modified: ${req.params.id}`))
            .catch(() => res.status(500).send(`Error modifiyng: ${req.params.id}`));
    } else {
        res.status(404).send('Cartellino not found');
    }
});