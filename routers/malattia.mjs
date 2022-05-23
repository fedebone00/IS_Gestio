import app from "../app/app.mjs";
import Malattia from "../models/Malattia.mjs";
import { isAuthenticated, isAuthorized } from '../auth_middleware/auth.mjs'
import { check, validationResult, body } from 'express-validator';
import isPdfValid from "../node_modules/is-pdf-valid/index.js";
import uploadStorage from "../models/Storage.mjs";

app.get('/malattia', isAuthenticated, isAuthorized, (req, res) => {
    Malattia.find().then((malattia) => res.send(malattia));
});

app.post('/malattia', isAuthenticated, isAuthorized, uploadStorage.single('certificato'), (req, res) => {
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

app.delete('/malattia/:id', isAuthenticated, isAuthorized, (req, res) => {
    Malattia.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Successfully remove id ${req.params.id}`))
        .catch(() => res.status(500).send('Error deleting user'));
});

app.patch('/malattia/:id', isAuthenticated, isAuthorized, async (req, res) => {

    Malattia.findByIdAndUpdate({
        _id:req.params.id
    },{
        $set:req.body
    }).then(()=> {
        res.status(201).json({message:"success"});
    }).catch(err =>{
        res.status(500).send(err.message);
    });
})

