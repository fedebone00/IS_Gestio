// import { Binary } from 'mongodb';
import mongoose from 'mongoose';

// var imageSchema = new mongoose.Schema({
//     name: String,
//     desc: String,
//     img:
//     {
//         data: Buffer,
//         contentType: String
//     }
// });

const Image = mongoose.model('image', {image: Buffer});

export default Image;
//Image is a model which has a schema imageSchema

//module.exports = new mongoose.model('Image', imageSchema);