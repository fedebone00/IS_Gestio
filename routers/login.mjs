import User from '../models/User.mjs';
import app from '../app/app.mjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import crypto from 'node:crypto'

app.post('/login', body('email').isEmail(), async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let user = await User.findOne({email: req.body['email']});
    if(user && user.password_hash === crypto.createHash('sha256').update(req.body['password'].concat(user.salt)).digest('hex')) {
        let token = jwt.sign({user_id: user._id, role: user.role}, 'test', {expiresIn: '30m'});
        let refresh = jwt.sign({user_id: user._id}, 'test', {expiresIn: '1h'});
        res.status(201).json({jwt: token, rt: refresh});
    } else {
        res.status(404).send('Wrong username or password');
    }
});

app.post('/refresh', async (req, res) => {
    if(req.body['rt'] && req.body['jwt']) {
        try{
            var refresh_payload = jwt.verify(req.body['rt'], 'test');
        } catch(error) {
            res.status(401).send('Refresh token expired, please log in again');
        }

        try {
            var jwt_payload = jwt.decode(req.body['jwt'], 'test');
        } catch(error) {
            res.status(401).send('Error decoding jwt');
        }

        if(jwt_payload.user_id == refresh_payload.user_id) {
            let user = User.findById(refresh_payload.user_id);

            if(!user) {
                res.status(401).send('No user found with this id');
            }

            let token = jwt.sign({user_id: user._id, role: user.role}, 'test', {expiresIn: '30m'});
            let refresh = jwt.sign({user_id: user._id}, 'test', {expiresIn: '1h'});
            res.status(201).json({jwt: token, rt: refresh});
        } else {
            res.status(401).send('Refresh token and jwt not corresponding');
        }
    } else {
        res.status(401).send('Refresh token and jwt needed');
    }
});