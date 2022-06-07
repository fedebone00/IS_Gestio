const express = require('express')
const router = express.Router()
const Dipendente = require('../models/Dipendenti.js')
const Cartellino = require('../models/Cartellino.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

//find every workers
router.get('/', isAuthenticated, isAuthorized, (req,res) =>{
    Dipendente.find().then((dipendente) => res.status(201).send(dipendente))
});


router.get('/byemail', isAuthenticated, isAuthorized, async (req,res) =>{
    const dipendente = await Dipendente.findOne({email: req.body['email']});
    if(dipendente) return res.status(201).send(dipendente);
});


router.post('/', isAuthenticated, isAuthorized , check('email').notEmpty(),check('nome').notEmpty(),check('cognome').notEmpty(),check('livello').notEmpty(),async (req,res) => {
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


router.delete('/:id', isAuthenticated, isAuthorized,  (req,res) => {
    Dipendente.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.params.id}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.params.id}`));
});


router.patch('/:id', isAuthenticated, isAuthorized, async (req, res) => {

    const dipendente = await Dipendente.findOne({email: req.body.email});
    if(dipendente) return res.status(400).send('Email already exists');

    try {
        const dip = await Dipendente.findById({_id: req.params.id})
        if(!dip){
            return res.status(404).json("id not found")
        }else{
            Dipendente.updateOne({_id: req.params.id},{$set:req.body}).exec()
            res.status(200).json({ message: 'success' })
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }

});

module.exports = router;