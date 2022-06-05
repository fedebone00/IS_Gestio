const express = require('express')
const router = express.Router()
const Malattia = require('../models/Malattia.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

router.get('/', isAuthenticated, isAuthorized, (req, res) => {
    Malattia.find().then((malattia) => res.send(malattia));
});

router.post('/', isAuthenticated, isAuthorized, check('certificato').notEmpty(),check('dataInizio').notEmpty(),check('dataFine').notEmpty(),check('email').notEmpty(), (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let m = new Malattia({ certificato: req.body['certificato'], dataInizio: req.body['dataInizio'],dataFine: req.body['dataFine'], email: req.body['email'] });
        m.save()
            .then(() => res.status(201).send(`Successfully uploaded`))
            .catch(() => res.status(500).send('Error while uploading'));
    }
});

router.delete('/:id', isAuthenticated, isAuthorized, (req, res) => {
    Malattia.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Successfully remove id ${req.params.id}`))
        .catch(() => res.status(500).send('Error deleting user'));
});

router.patch('/:id', isAuthenticated, isAuthorized, async (req, res) => {

    try {
        const mal = await Malattia.findById({_id: req.params.id})
        if(!mal){
            return res.status(404).json("id not found")
        }else{
            Malattia.updateOne({_id: req.params.id},{$set:req.body}).exec()
            res.status(200).json({ message: 'success' })
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }

})

module.exports = router