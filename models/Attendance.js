const mongoose =
require("mongoose");

const attendanceSchema =
new mongoose.Schema({

    employeeEmail:{
        type:String,
        required:true
    },

    date:{
        type:String,
        required:true
    },

    checkIn:{
        type:String,
        default:""
    },

    checkOut:{
        type:String,
        default:""
    },

    status:{
        type:String,
        default:"Present"
    }

},
{
    timestamps:true
});

module.exports =
mongoose.model(
    "Attendance",
    attendanceSchema
);