const express = require('express')
const router = express.Router()
const Azienda = require('../models/Azienda.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')


//retrieve info company
router.get('/', isAuthenticated, isAuthorized, (req,res) =>{
    Azienda.find().then((azienda) => res.send(azienda))
});


//find specific company by partitaiva
router.get('/bypiva', isAuthenticated, isAuthorized, async (req,res) =>{
    const azienda = await Azienda.findOne({partitaiva: req.headers['partitaiva']});
    if(azienda) return res.status(201).send(azienda);
});

//post info company
router.post('/', isAuthenticated, isAuthorized , check('logo').notEmpty(),check('partitaiva').notEmpty(),check('contatto').notEmpty(), async (req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    let dbazienda = await Azienda.findOne({partitaiva: req.body['partitaiva']});
    if(dbazienda) {
        return res.status(401).send('Company already exists in the database, you can modify');
    }

    let azienda = new Azienda({logo: req.body['logo'], partitaiva: req.body['partitaiva'], contatto: req.body['contatto']});
    azienda.save()
        .then(() => res.status(201).send(`Succesfully save ${req.body.partitaiva}`))
        .catch(() => res.status(500).send(`Error saving ${req.body.partitaiva}`));
});

router.delete('/:id', isAuthenticated, isAuthorized, (req,res) => {
    Azienda.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.body.partitaiva}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.body.partitaiva}`));
});

router.patch('/:id', isAuthenticated, isAuthorized, async (req, res) => {

    /*const azienda = await Azienda.findOne({partitaiva: req.body.partitaiva});
    if(!azienda) return res.status(400).send('Company not found');*/

    try {
        const az = await Azienda.findById({_id: req.params.id})
        if(!az){
            return res.status(404).json("id not found")
        }else{
            Azienda.updateOne({_id: req.params.id},{$set:req.body}).exec()
            res.status(200).json({ message: 'success' })
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }
    
});

module.exports = router;