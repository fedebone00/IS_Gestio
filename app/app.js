const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const users = require('../routers/user')
const malattia = require('../routers/malattia')
const cartellino = require('../routers/cartellino')
const auth = require('../routers/auth')
const recuperoCredenziali = require('../routers/recuperoCredenziali')
const ferie = require('../routers/ferie')
const dipendenti = require('../routers/dipendenti');
const menu = require('../routers/menu')
const contatta = require('../routers/contatta')
const infoazienda = require('../routers/infoazienda')
const prenotamensa = require('../routers/prenotamensa')
const bacheca = require('../routers/bacheca')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json())

app.use('/api/v1/users', users);
app.use('/api/v1/malattia', malattia);
app.use('/api/v1/timbratura', cartellino);
app.use('/api/v1/auth', auth);
app.use('/api/v1/recuperocredenziali', recuperoCredenziali)
app.use('/api/v1/ferie', ferie)
app.use('/api/v1/dipendente', dipendenti)
app.use('/api/v1/menu', menu)
app.use('/api/v1/contatta', contatta)
app.use('/api/v1/infoazienda', infoazienda)
app.use('/api/v1/prenotamensa', prenotamensa)
app.use('/api/v1/bacheca', bacheca)


module.exports = app;