const express = require('express')
const router = express.Router()
const Bacheca = require('../models/Bacheca.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

router.get('/', isAuthenticated, isAuthorized, (req,res) =>{
    Bacheca.find().then((bacheca) => res.send(bacheca))
});

router.post('/', isAuthenticated, isAuthorized,check('testoAnnuncio').notEmpty(), check('scadenzaAnnuncio').notEmpty(), (req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    let c = new Bacheca({testoAnnuncio: req.body['testoAnnuncio'], scadenzaAnnuncio: req.body['scadenzaAnnuncio']});
    c.save()
        .then(() => res.status(201).send(`Succesfully insert announcement ${req.body.tipo}`))
        .catch(() => res.status(500).send(`Error creation announcement ${req.body.tipo}`));
});

router.delete('/:id', isAuthenticated, isAuthorized , (req,res) => {

    Bacheca.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.params.id}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.params.id}`));
});

router.patch('/:id', isAuthenticated, isAuthorized, async (req, res) => {

    Bacheca.findByIdAndUpdate({
        _id:req.params.id
    },{
        $set:req.body
    }).then(()=> {
        res.status(201).json({message:"success"});
    }).catch(err =>{
        res.status(500).send(err.message);
    });
});

module.exports = router;