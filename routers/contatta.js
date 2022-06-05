const express = require('express')
const router = express.Router()
const Dipendente = require('../models/Dipendenti.js')
const Cartellino = require('../models/Cartellino.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')
const Messaggio = require('../models/Messaggio.js')

//get messaggi --> email here is the person who has received messages

router.get('/messaggi', isAuthenticated, isAuthorized, check('email').notEmpty(), async (req,res) =>{
    
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    let user = await Dipendente.findOne({email: req.body['email']});
    if(!user) {
        return res.status(401).send(`User not found with this email: ${req.body.email}`);
    }

    const messaggio = await Messaggio.findOne({email: req.body.email});
    if(messaggio){ 
        if(messaggio.messaggio.isEmpty()){
            return res.status(402).send(`No new message`);
        }
        return res.status(201).send(messaggio)
    }else {
        return res.status(401).send(`Error: ${req.body.email} not found `)
    }

});

//send messages to coworkers --> email here is the person who will receive the message
router.post('/', isAuthenticated, isAuthorized, check('email').notEmpty,check('messaggio').notEmpty(),async (req,res) =>{
    
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    let user = await Dipendente.findOne({email: req.body['email']});
    if(!user) {
        return res.status(401).send(`User not found with this email: ${req.body.email}`);
    }

    let messaggio = new Messaggio({email: req.body.email, messaggio: req.body.messaggio})
    messaggio.save()
        .then(() => res.status(201).send(`Succesfully send message`))
        .catch(() => res.status(500).send(`Error sending message`));

});

router.delete('/messaggi/:id', isAuthenticated, isAuthorized, (req,res) => {
    Messaggio.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed message`))
        .catch(() => res.status(500).send(`Error deleting message`));
});

module.exports = router;
