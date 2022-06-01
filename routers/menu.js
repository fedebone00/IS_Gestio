const app = require('../app/app.js')
const Menu = require('../models/Menu.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

app.get('/api/v1/menu', isAuthenticated, isAuthorized, (req,res) =>{
    Menu.find().then((ferie) => res.send(ferie))
});

//=================================================================================

app.get('/api/v2/menu', isAuthenticated, isAuthorized, async (req,res) =>{
    const menu = await Menu.findOne({data: req.body.data});
    if(menu) return res.status(201).send(menu);
});

//=================================================================================


app.post('/api/v1/menu', isAuthenticated, isAuthorized,check('data').notEmpty(),check('primo').notEmpty(),check('secondo').notEmpty() , async (req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    let date =  await Menu.findOne({data: req.body.data});
    if (date){
        return res.status(401).send('Menu for this day already exist');
    }

    let m = new Menu({data: req.body['data'],primo: req.body['primo'], secondo: req.body['secondo'], dolce: req.body['dolce']});
    m.save()
        .then(() => res.status(201).send('Succesfully add menu'))
        .catch(() => res.status(500).send('Error saving Menu'));
});


app.delete('/api/v1/menu/:id', isAuthenticated, isAuthorized, check('id').notEmpty(), (req,res) => {
    Menu.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send('Succesfully deleted menu'))
        .catch(() => res.status(500).send('Error deleted Menu'));
});

app.patch('/api/v1/menu/:id', isAuthenticated, isAuthorized, async (req, res) => {
    
    const menu = await Menu.findOne({data: req.body.data});
    if(menu) return res.status(400).send('Menu for this date already exists, delete it first');

    Menu.findByIdAndUpdate({
        _id:req.params.id
    },{
        $set:req.body
    }).then(()=> {
        res.status(201).json({message:"success"});
    }).catch(err =>{
        res.status(500).send(err.message);
    });
});