/*
Big Error, non riesce a salvare la foto: da sistemare

*/

import express from "express";
import app from '../app/app.mjs'
import  BodyParser  from "body-parser";
import path from 'path';
import { readFileSync } from "fs";
import multer, { diskStorage } from "multer";
import mongoose from "mongoose";
import imageSchema  from '../models/imageModel.mjs'; 
import { urlencoded } from "express"  

app.use(urlencoded(
      { extended:true }
))
 
app.set("view engine","ejs");
 
// SET STORAGE
var storage = diskStorage({
    destination: function (req, file, cb) {
      cb(null, '')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
 
var upload = multer({ storage: storage })
 
app.get("/",(req,res)=>{
    res.render("index");
})
 
app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
    var img = readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
})