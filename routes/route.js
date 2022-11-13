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
    let data = await file.find();
    res.status(200).json(data);
})

router.post('/delete', async(req,res)=>{
    const id = req.body.id;
    try {
        await file.deleteOne({ fileUrl: id }).then(async ()=>{
        let data = await file.find();
        res.status(200).json(data);
    })
    } catch (err) {        
        console.log(err);
        res.status(201).json("delete Fail");
    } 
})
module.exports = router;