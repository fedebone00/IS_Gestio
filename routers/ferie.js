const express = require('express')
const router = express.Router()
const Ferie = require('../models/Ferie.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

router.get('/', isAuthenticated, isAuthorized, (req,res) =>{
    Ferie.find().then((ferie) => res.send(ferie))
});

router.post('/', isAuthenticated, isAuthorized, check('dataFine').notEmpty(),check('dataInizio').notEmpty(),check('motivazione').notEmpty(),(req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    let ferie = new Ferie({id:req.loggedUser.user_id,dataInizio: req.body['dataInizio'],dataFine: req.body['dataFine'], motivazione: req.body['motivazione']});
    ferie.save()
        .then(() => res.status(201).send(`Succesfully save ${req.body.dataInizio}`))
        .catch(() => res.status(500).send(`Error saving ${req.body.dataInizio}`));
});

router.delete('/:id', isAuthenticated, isAuthorized,  (req,res) => {
    Ferie.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.params.id}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.params.id}`));
});

router.patch('/:id', isAuthenticated, isAuthorized, async (req, res) => {

    try {
        const ferie = await Ferie.findById({_id: req.params.id})
        if(!ferie){
            return res.status(404).json("id not found")
        }else{
            Ferie.updateOne({_id: req.params.id},{$set:req.body}).exec()
            res.status(200).json({ message: 'success' })
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }

});

module.exports = router;