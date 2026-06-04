const mongoose =
require("mongoose");

const employeeSchema =
new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    department:{
        type:String,
        required:true
    },

    role:{
        type:String,
        default:"Employee"
    },

    salary:{
        type:Number,
        default:25000
    },

    image:{
        type:String,

        default:
        "https://i.pravatar.cc/150?img=12"
    },

    performance:{
        type:Number,
        default:85
    },

    status:{
        type:String,
        default:"Active"
    },

    joiningDate:{
        type:String,

        default:new Date()
        .toLocaleDateString()
    }

},
{
    timestamps:true
});

module.exports =
mongoose.model(
    "Employee",
    employeeSchema
);