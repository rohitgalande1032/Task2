const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    title:{
        type : String,
        required : true
    },
    desc:{
        type : String,
        required : true
    },
    fileType:{
        type : String,
        required : true
    },
    fileUrl:{
        type : String,
        required : true
    },
    fileSize:{
        type : Number,
        required : true
    },
    time :{
        type : Date
    }
})

const fileItems = mongoose.model('files',fileSchema);
module.exports = fileItems;