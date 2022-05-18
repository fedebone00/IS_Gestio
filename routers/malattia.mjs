import app from "../app/app.mjs";
import Malattia from "../models/Malattia.mjs";
import { isAuthenticated, isAuthorized } from '../auth_middleware/auth.mjs'
import { check, validationResult, body } from 'express-validator';
import isPdfValid from "../node_modules/is-pdf-valid/index.js";
import uploadStorage from "../models/Storage.mjs";

app.get('/malattia', isAuthenticated, isAuthorized, (req, res) => {
    Malattia.find().then((malattia) => res.send(malattia));
});

app.post('/malattia', isAuthenticated, isAuthorized, uploadStorage.single('certificato'), check('data').notEmpty().isDate(new Date()), (req, res) => {
    console.log(`[POST]`)
    console.log(req.file);
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let m = new Malattia({ certificato: req.body['certificato'], data: req.body['data'] });
        m.save()
            .then(() => res.status(201).send(`Successfully uploaded`))
            .catch(() => res.status(500).send('Error while uploading'));
    }
});

app.delete('/malattia/:id', isAuthenticated, isAuthorized, (req, res) => {
    console.log(`[DELETE] Delete id ${req.params.id}`)
    Malattia.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Successfully remove id ${req.params.id}`))
        .catch(() => res.status(500).send('Error deleting user'));
});

app.put('/malattia/:id', isAuthenticated, isAuthorized, (req, res) => {
    console.log(`[PUT] modificato`)
    let malattia = Malattia.findById(req.params.id);
    if (malattia) {
        malattia.certificato = req.body['email'];
        malattia.data = req.body['data'];
        malattia.save()
            .then(() => res.status(201).send(`Successfully modified malattia id: ${req.params.id}`))
            .catch(() => res.status(500).send(`Error modifiyng malattia ${req.params.id}`));
    } else {
        res.status(404).send('Id malattia not found');
    }
})

