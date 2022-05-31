const app = require('../app/app.js')
const Bacheca = require('../models/Bacheca.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

app.get('/api/v1/bacheca', isAuthenticated, isAuthorized, (req,res) =>{
    Bacheca.find().then((bacheca) => res.send(bacheca))
});

app.post('/api/v1/bacheca', isAuthenticated, isAuthorized,check('testoAnnuncio').notEmpty(), check('dataAnnuncio').notEmpty(), (req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    let c = new Bacheca({data: req.body['testoAnnuncio'],tipo: req.body['dataAnnuncio']});
    c.save()
        .then(() => res.status(201).send(`Succesfully insert announcement ${req.body.tipo}`))
        .catch(() => res.status(500).send(`Error creation announcement ${req.body.tipo}`));
});

app.delete('/api/v1/bacheca/:id', isAuthenticated, isAuthorized , (req,res) => {

    Cartellino.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.params.id}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.params.id}`));
});

app.patch('/api/v1/bacheca/:id', isAuthenticated, isAuthorized, async (req, res) => {

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