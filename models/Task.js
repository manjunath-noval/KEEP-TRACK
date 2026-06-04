const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    taskName:{
        type:String,
        required:true
    },

    assignedTo:{
        type:String,
        required:true
    },

    project:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "In Progress",
            "Completed"
        ],
        default:"Pending"
    },

    deadline:{
        type:String
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "Task",
    taskSchema
);