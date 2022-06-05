const express = require('express')
const router = express.Router()
const Menu = require('../models/Menu.js')
const {isAuthenticated, isAuthorized} = require('../middlewares/auth.js')
const {check, validationResult} = require('express-validator')

//get by date
router.get('/', isAuthenticated, isAuthorized, async (req,res) =>{
    const menu = await Menu.findOne({data: req.headers['data']});
    if(menu) return res.status(201).send(menu);
    else return res.status(404);
});

//get all
router.get('/all', isAuthenticated, isAuthorized, async (req,res) =>{
    const menu = await Menu.find().then((menu) => res.json(menu));
    if(menu) return res.status(201).json(menu);
    else return res.status(404);
});

//get by id
router.get('/specifico/:id', isAuthenticated, isAuthorized, async (req,res) =>{
    const menu = await Menu.findOne({_id:req.params.id});
    if(menu) return res.status(201).send(menu);
    else return res.status(404);
});

router.post('/', isAuthenticated, isAuthorized,check('data').notEmpty(),check('primo').notEmpty(),check('secondo').notEmpty() , async (req,res) => {
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


router.delete('/:id', isAuthenticated, isAuthorized, check('id').notEmpty(), (req,res) => {

    // let errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors: errors.array()})
    // }

    Menu.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send('Succesfully deleted menu'))
        .catch(() => res.status(500).send('Error deleted Menu'));
});

router.patch('/:id', isAuthenticated, isAuthorized, async (req, res) => {
    
    const menu = await Menu.findOne({data: req.body.data});
    if(menu) return res.status(400).send('Menu for this date already exists, delete it first');

    try {
        const menu = await Menu.findById({_id: req.params.id})
        if(!menu){
            return res.status(404).json("id not found")
        }else{
            Menu.updateOne({_id: req.params.id},{$set:req.body}).exec()
            res.status(200).json({ message: 'success' })
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }

});

module.exports = router;