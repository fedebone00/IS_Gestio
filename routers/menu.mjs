import app from '../app/app.mjs'
import Menu from '../models/Menu.mjs'
import {isAuthenticated, isAuthorized} from '../auth_middleware/auth.mjs'

app.get('/menu', isAuthenticated, isAuthorized, (req,res) =>{
    Menu.find().then((menu) => res.send(menu));
});

app.post('/menu', (req,res) => {
    let m = new Menu({data: req.body['data'],primo: req.body['primo'], secondo: req.body['secondo'], dolce: req.body['dolce']});
    m.save()
        .then(() => res.status(201).send('Succesfully add menu'))
        .catch(() => res.status(500).send('Error saving Menu'));
});

app.delete('/menu/:id', (req,res) => {
    Menu.findByIdAndRemove(req.params.id)
        .then(() => res.status(201).send('Succesfully deleted menu'))
        .catch(() => res.status(500).send('Error deleted Menu'));
});

app.put('/menu/:id', async (req, res) => {
    let menu = await Menu.findById(req.params.id);
    if(menu) {
        menu.data = req.body['data'];
        menu.primo = req.body['primo'];
        menu.secondo = req.body['secondo'];
        menu.dolce = req.body['dolce'];
        user.save()
            .then(() => res.status(201).send("Successfully modified menu"))
            .catch(() => res.status(500).send('Error modifiyng menu'));
    } else {
        res.status(404).send('Menu not found');
    }
});