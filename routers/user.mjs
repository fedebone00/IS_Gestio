import app from '../app/app.mjs'
import User from '../models/User.mjs'
import { body, validationResult } from 'express-validator'
import { isAuthenticated, isAuthorized } from '../auth_middleware/auth.mjs';
import crypto from 'node:crypto';

app.get('/users', (req, res) => {
    User.find()/*.select(['-password_hash', '-salt'])*/.then((users) => res.send(users));
});

app.post('/users', isAuthenticated, isAuthorized, body('email').isEmail(), body('password').isLength({min: 8}), async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({email: req.body['email']});

    if(user) {
        return res.status(401).send('User already exists with this email');
    }

    let salt = crypto.randomBytes(20).toString('hex');
    let u = new User({email: req.body['email'], password_hash: crypto.createHash('sha256').update(req.body['password'].concat(salt)).digest('hex'), salt: salt, role: req.body['role']});
    u.save()
        .then(() => res.status(201).send('Successfully added user'))
        .catch(() => res.status(500).send('Error saving user'));
});

app.delete('/users/:id', isAuthenticated, isAuthorized, (req, res) => {
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