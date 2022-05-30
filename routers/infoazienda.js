const app = require('../app/app.js')
const Azienda = require('../models/Azienda.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

//retrieve info company
app.get('/api/v1/infoazienda', isAuthenticated, isAuthorized, (req,res) =>{
    Azienda.find().then((azienda) => res.send(azienda))
});

//post info company
app.post('/api/v1/infoazienda', isAuthenticated, isAuthorized , check('logo').notEmpty(),check('partitaiva').notEmpty(),check('contatto').notEmpty(), async (req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    let dbazienda = await Azienda.findOne({email: req.body['partitaiva']});
    if(dbazienda) {
        return res.status(401).send('Company already exists in the database, you can modify');
    }

    let azienda = new Azienda({nome: req.body['logo'],cognome: req.body['partitaiva'], livello: req.body['contatto']});
    azienda.save()
        .then(() => res.status(201).send(`Succesfully save ${req.body.partitaiva}`))
        .catch(() => res.status(500).send(`Error saving ${req.body.partitaiva}`));
});

app.delete('/api/v1/infoazienda/:id', isAuthenticated, isAuthorized, (req,res) => {
    Dipendente.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Succesfully removed: ${req.body.partitaiva}`))
        .catch(() => res.status(500).send(`Error deleting: ${req.body.partitaiva}`));
});

app.patch('/api/v1/infoazienda/:id', isAuthenticated, isAuthorized, async (req, res) => {

    const azienda = await Azienda.findOne({partitaiva: req.body.partitaiva});
    if(!azienda) return res.status(400).send('Company not found');

    Azienda.findByIdAndUpdate({
        _id:req.params.id
    },{
        $set:req.body
    }).then(()=> {
        res.status(201).json({message:"success"});
    }).catch(err =>{
        res.status(500).send(err.message);
    });
});