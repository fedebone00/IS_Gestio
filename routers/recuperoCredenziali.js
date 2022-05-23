const app = require('../app/app.js');
const { body, query, validationResult } = require('express-validator');
const User = require('../models/User.js');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');

app.post('/recuperocredenziali', body('email').isEmail(), async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body['email'] });

    if(!user) {
        return res.status(401).send('No user found with such email');
    }

    let token = jwt.sign({user_id: user._id}, process.env.JWT_SIGN_KEY, {expiresIn: '10m'});
    let url = `${process.env.GESTIO_BASE_URL}/recuperocredenziali?t=${token}`;

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"Gestio" <noreply@gestio.com>', // sender address
        to: user.email, // list of receivers
        subject: "Recupero Credenziali", // Subject line
        html: `<b>Ciao! accedi a <a href=${url}>questo link</a> per reimpostare la tua password</b>`, // html body
    };
        
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        res.status(401).send('Error');
        } else {
        console.log('Email sent: ' + info.response);
        console.log(`token: ${token}`);
        res.status(201).send('Succesfully notified user');
        }
    });    
});

app.put('/recuperocredenziali', query('t').isJWT(), body('password').isLength({min: 8}), async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let payload;
    try {
        payload = jwt.verify(req.query['t'], process.env.JWT_SIGN_KEY);
    } catch {
        return res.status(401).send('Token error');
    }

    let user = await User.findById(payload.user_id);

    if(!user) {
        return res.status(401).send('No user found with such id');
    }

    user.password_hash = crypto.createHash('sha256').update(req.body['password'].concat(user.salt)).digest('hex');
    user.save()
        .then(() => res.status(201).send('Successfully changed user password'))
        .catch(() => res.status(500).send('Error updating user password'));
})