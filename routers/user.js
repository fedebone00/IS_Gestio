const app = require('../app/app.js');
const User = require('../models/User.js');
const { check,body, validationResult } = require('express-validator');
const { isAuthenticated, isAuthorized } = require('../middlewares/auth.js');
const crypto = require('node:crypto');

app.get('/api/v1/users', isAuthenticated, isAuthorized, (req, res) => {
    User.find().select(['-password_hash', '-salt'])
        .then((users) => res.status(201).json({users: users}))
        .catch((error) => res.status(500).json({error: error}));
});

app.post('/api/v1/users', isAuthenticated, isAuthorized, body('email').isEmail(), body('password').isLength({min: 8}), async (req, res) => {
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

<<<<<<< HEAD
app.delete('/api/v1/users/:id', isAuthenticated, isAuthorized, (req, res) => {
    User.deleteOne({email:req.body.email})
    //User.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send(`Successfully remove id ${req.params.id}`))
=======
app.delete('/api/v1/users', isAuthenticated, isAuthorized, check('email').notEmpty(), (req, res) => {

    let user = await User.findOne({email: req.body['email']});
    if(!user) {
        return res.status(401).send('Email not found');
    }

    User.findByIdAndRemove(req.params.email)
        .then(() => res.status(201).send(`Successfully remove email ${req.params.email}`))
>>>>>>> 72ae8ec85965942ee505bce9c9b76c4f615f8ae0
        .catch(() => res.status(500).send('Error deleting user'));
});

app.put('/api/v1/users/:id', isAuthenticated, isAuthorized, async (req, res) => {
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