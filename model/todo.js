const mongoose = require('mongoose');

const todoSchema=new mongoose.Schema({
    job:{
        type:String,
        required: true
    }
});

const todo=mongoose.model("todo",todoSchema);
module.exports=todo;


