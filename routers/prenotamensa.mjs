import app from "../app/app.mjs";
import PrenotaMensa from "../models/Prenotamensa.mjs";
import User from "../models/User.mjs";

app.get('/prenotamensa', (req,res) => {
    PrenotaMensa.find().then((prenotamensa) => res.send(prenotamensa));
});

app.post('/prenotamensa', (req, res) => {
    let p = new PrenotaMensa({prenota: req.body['prenotazione'], user_id: req.body['id']});
    p.save()
        .then(() => res.status(201).send(`Successfully booked, id ${req.params.id}`))
        .catch(() => res.status(500).send('Error while booking'));
});

app.delete('/prenotamensa/:id', (req, res) => {
    PrenotaMensa.findById(req.params.id)
        .then(() => res.status(201).send(`Successfully remove id ${req.params.id}`))
        .catch(() => res.status(500).send('Error deleting user'));
});

app.put('/prenotamensa/:id', async (req, res) => {
    let prenota = await PrenotaMensa.findById({id: req.params.id});
    if(prenota) {
        prenota.id = req.body['id'];
        prenota.save()
            .then(() => res.status(201).send("Successfully modified user"))
            .catch(() => res.status(500).send('Error modifiyng user'));
    } else {
        res.status(404).send('User not found');
    }
});