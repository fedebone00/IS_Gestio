const express = require('express')
const router = express.Router()
const Cartellino = require('../models/Cartellino.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

router.get('/', isAuthenticated, isAuthorized, (req,res) =>{
    Cartellino.find().then((cartellino) => res.json(cartellino))
});

router.post('/', isAuthenticated, isAuthorized,check('data').notEmpty(), check('tipo').notEmpty(),check('ora').notEmpty(), (req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    let c = new Cartellino({data: req.body['data'],tipo: req.body['tipo'], ora: req.body['ora'], smartworking: req.body['smartworking']});
    c.save()
        .then(() => res.status(201).send(`Succesfully checked ${req.body.tipo}`))
        .catch(() => res.status(500).send(`Error checking ${req.body.tipo}`));
});

//=======================================================================================

router.post('/api/v2/timbratura', isAuthenticated, check('tipo').notEmpty(), (req,res) => {
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
    console.log(datona);

    let c = new Cartellino({data: datona,tipo: req.body['tipo'], ora: orona, smartworking: req.body['smartworking']});
    c.save()
        .then(() => res.status(201).send(`Succesfully checked ${req.body.tipo}`))
        .catch(() => res.status(500).send(`Error checking ${req.body.tipo}`));
});

//=======================================================================================


router.delete('//:id', isAuthenticated, isAuthorized , (req,res) => {

    Cartellino.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.params.id}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.params.id}`));
});

router.patch('//:id', isAuthenticated, isAuthorized, async (req, res) => {

    Cartellino.findByIdAndUpdate({
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