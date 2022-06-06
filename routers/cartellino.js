const express = require('express')
const router = express.Router()
const Cartellino = require('../models/Cartellino.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

router.get('/', isAuthenticated, isAuthorized, (req,res) =>{
    Cartellino.find().then((cartellino) => res.status(201).json(cartellino))
});

router.post('/', isAuthenticated, isAuthorized, check('tipo').notEmpty(), (req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    var datona = new Date();
    var dd = String(datona.getDate()).padStart(2, "0");
    var mm = String(datona.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = datona.getFullYear();

    var orona = new String;
    var orona = datona.getHours()+"-"+datona.getMinutes();

    datona = String(yyyy + "/" + mm + "/" + dd);
    
    let c = new Cartellino({data: datona,tipo: req.body['tipo'], ora: orona, smartworking: req.body['smartworking']});
    c.save()
        .then(() => res.status(201).send(`Succesfully checked ${req.body.tipo}`))
        .catch(() => res.status(500).send(`Error checking ${req.body.tipo}`));
});

//=======================================================================================

router.delete('/:id', isAuthenticated, isAuthorized , (req,res) => {

    Cartellino.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.params.id}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.params.id}`));
});

//=======================================================================================

router.patch('/:id', isAuthenticated, isAuthorized, async (req, res) => {

    try {
        const cart = await Cartellino.findById({_id: req.params.id})
        if(!cart){
            return res.status(404).json("id not found")
        }else{
            Cartellino.updateOne({_id: req.params.id},{$set:req.body}).exec()
            res.status(200).json({ message: 'success' })
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }

});

module.exports = router;