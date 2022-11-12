const { Router } = require("express");
const mongodb = require('mongodb');
const router = Router();
const file = require("../models/file.model");
require("../db/conn")

router.post('/create', async(req,res)=>{
    const fileObj = req.body;
    try{
        await file.create(fileObj).then((data)=>{
            res.status(200).json("File Uploded Sucessfull");
        })
    } catch(err){
        console.log(err);
    }
})

router.post('/update', async(req,res)=>{
    
})

router.post('/read', async(req,res)=>{
    console.log("read")
    let data = await file.find();
    res.status(200).json(data);
})

router.post('/delete', async(req,res)=>{
    
})
module.exports = router;