import app from '../app/app.mjs'
import User from '../models/User.mjs'

app.get('/users', (req, res) => {
    User.find().then((users) => res.send(users));
});

app.post('/users', (req, res) => {
    let u = new User({email: req.body['email']});
    u.save()
        .then(() => res.status(201).send('Successfully added user'))
        .catch(() => res.status(500).send('Error saving user'));
});

app.delete('/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Successfully remove id ${req.params.id}`))
        .catch(() => res.status(500).send('Error deleting user'));
});

app.put('/users/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    if(user) {
        user.email = req.body['email'];
        user.save()
            .then(() => res.status(201).send("Successfully modified user"))
            .catch(() => res.status(500).send('Error modifiyng user'));
    } else {
        res.status(404).send('User not found');
    }
});