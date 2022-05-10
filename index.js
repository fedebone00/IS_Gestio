import { mongoose } from 'mongoose'
import { Cat } from './mongo.mjs'

let kitty = new Cat({ name: "Giovanni"});

try {
    await kitty.save();
    console.log("meow");
} catch (error) {
    console.error(`Error saving kitty: ${error}`);
}