const User = require('../models/User.js');
const app = require('../app/app.js');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const crypto = require('node:crypto');

app.post('/api/v1/login', body('email').isEmail(), async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let user = await User.findOne({email: req.body['email']});
    if(user && user.password_hash === crypto.createHash('sha256').update(req.body['password'].concat(user.salt)).digest('hex')) {
        let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY ? process.env.JWT_SIGN_KEY : '2386TRUFBJCKIOF2398YUVBHWECJNIASCIJjsnvk', {expiresIn: '30m'});
        let refresh = jwt.sign({user_id: user._id}, process.env.JWT_SIGN_KEY ? process.env.JWT_SIGN_KEY : '2386TRUFBJCKIOF2398YUVBHWECJNIASCIJjsnvk', {expiresIn: '1h'});
        res.status(201).json({jwt: token, rt: refresh});
    } else {
        res.status(404).send('Wrong username or password');
    }
});

app.post('/api/v1/refresh', async (req, res) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(req.body['rt'] && token) {
        try{
            var refresh_payload = jwt.verify(req.body['rt'], process.env.JWT_SIGN_KEY);
        } catch(error) {
            return res.status(401).send('Refresh token expired, please log in again');
        }

        try {
            var jwt_payload = jwt.decode(token, process.env.JWT_SIGN_KEY);
        } catch(error) {
            return res.status(401).send('Error decoding jwt');
        }

        if(jwt_payload.user_id == refresh_payload.user_id) {
            let user = User.findById(refresh_payload.user_id);

            if(!user) {
                res.status(401).send('No user found with this id');
            }

            let token = jwt.sign({user_id: user._id, role: user.role}, process.env.JWT_SIGN_KEY, {expiresIn: '30m'});
            let refresh = jwt.sign({user_id: user._id}, process.env.JWT_SIGN_KEY, {expiresIn: '1h'});
            res.status(201).json({jwt: token, rt: refresh});
        } else {
            res.status(401).send('Refresh token and jwt not corresponding');
        }
    } else {
        res.status(401).send('Refresh token and jwt needed');
    }
});