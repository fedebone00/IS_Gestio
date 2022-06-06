const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { check,body, validationResult } = require('express-validator');
const { isAuthenticated, isAuthorized } = require('../middlewares/auth.js');
const crypto = require('node:crypto');

router.get('/', isAuthenticated, isAuthorized, (req, res) => {
    User.find()
        .then((users) => res.status(201).json({users: users}))
        .catch((error) => res.status(500).json({error: error}));
});

router.post('/', isAuthenticated, isAuthorized, body('email').isEmail(), body('password').isLength({min: 8}), body('role').isIn(['AA', 'DIP0', 'DIP1']), async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({email: req.body['email']});

    if(user) {
        return res.status(400).send('User already exists with this email');
    }

    let salt = crypto.randomBytes(20).toString('hex');
    let u = new User({email: req.body['email'], password_hash: crypto.createHash('sha256').update(req.body['password'].concat(salt)).digest('hex'), salt: salt, role: req.body['role']});
    u.save()
        .then(() => res.status(201).json(u))
        .catch(() => res.status(500).send('Error saving user'));
});

router.delete('/', isAuthenticated, isAuthorized, check('email').notEmpty(), async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({email: req.body['email']});
    if(!user) {
        return res.status(400).send('Email not found');
    }

    User.findByIdAndDelete(user._id)
        .then(() => res.status(200).send(`Successfully remove email ${req.params.email}`))
        .catch(() => res.status(500).send('Error deleting user'));
});

router.put('/:id', isAuthenticated, isAuthorized, async (req, res) => {
    let user = await User.findById(req.params.id);
    if(user) {
        User.updateOne({_id: user.id}, 
            {email: req.body['email'] || user.email, role: req.body['role'] || user.role})
                .then(() => res.status(201).send("Successfully modified user"))
                .catch(() => res.status(500).send('Error modifiyng user'));
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = router;