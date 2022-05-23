const app = require('../app/app.js')
const PrenotaMensa = require('../models/Prenotamensa.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check,validationResult} = require('express-validator')

app.get('/api/v1/prenotamensa', isAuthenticated, isAuthorized, (req,res) => {
    PrenotaMensa.find().then((prenotamensa) => res.send(prenotamensa));
});

app.post('/api/v1/prenotamensa', isAuthenticated, isAuthorized, check('user_id').notEmpty() ,(req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    let p = new PrenotaMensa({prenota: req.body['prenotazione'], user_id: req.body['id']});
    p.save()
        .then(() => res.status(201).send(`Successfully booked, id ${req.params.id}`))
        .catch(() => res.status(500).send('Error while booking'));
});

app.delete('/api/v1/prenotamensa/:id', isAuthenticated, isAuthorized, (req, res) => {
    PrenotaMensa.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Successfully remove id ${req.body.id}`))
        .catch(() => res.status(500).send(`Error deleting id ${req.body.id} `));
});

app.patch('/api/v1/prenotamensa/:id', isAuthenticated, isAuthorized, async (req, res) => {

    PrenotaMensa.findByIdAndUpdate({
        _id:req.params.id
    },{
        $set:req.body
    }).then(()=> {
        res.status(201).json({message:"success"});
    }).catch(err =>{
        res.status(500).send(err.message);
    });
});