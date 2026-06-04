const mongoose =
require("mongoose");

const activitySchema =
new mongoose.Schema({

    action:{
        type:String,
        required:true
    },

    employeeName:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});

module.exports =
mongoose.model(
    "Activity",
    activitySchema
);