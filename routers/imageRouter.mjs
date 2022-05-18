/*
Big Error, non riesce a salvare la foto: da sistemare
*/
import app from '../app/app.mjs';
import multer, { diskStorage as _diskStorage } from 'multer';
import Image from '../models/Image.mjs';
import fs from 'fs'

var storage = _diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'test')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname)
    }
});

var upload = multer({ storage: storage });

app.get('/images', (req, res) => {
    // imageSchema.find({}, (err, items) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('An error occurred', err);
    //     }
    //     else {
    //         res.render('imagesPage', { items: items });
    //     }
    // });
    Image.find().then((image) => res.send(image))
});

app.post('/images', (req, res, next) => {
    // console.log(req.body['image'])
    // var obj = {
    //     name: req.body.name,
    //     desc: req.body.desc,
    //     img: {
    //         data: fs.readFileSync(path.join('/test/'+file.fieldname)),
    //         contentType: 'image/png'
    //     }
    // }
    // imageSchema.create(obj, (err, item) => {
    //     if (err) {
    //         console.log(err+ 'ah');
    //     }
    //     else {
    //         item.save();
    //         //res.redirect('/imagess');
    //     }
    // });

    console.log(req.body['image']);

    let image = new Image({image: req.body['image']});
    image.save()
        .then(() => res.status(201).send('Succesfully add file'))
        .catch(() => res.status(500).send('Error saving file'));
});