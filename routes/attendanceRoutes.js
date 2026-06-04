const express =
require("express");

const router =
express.Router();

const Attendance =
require("../models/Attendance");

/* CHECK IN */

/* CHECK IN */

router.post(
"/checkin",
async(req,res)=>{

const {
employeeEmail
} = req.body;

const today =
new Date()
.toLocaleDateString();

/* CHECK IF ALREADY PRESENT */

const existing =
await Attendance.findOne({

employeeEmail,
date:today

});

if(existing){

return res.json({

message:
"Already Checked In Today"

});

}

const time =
new Date()
.toLocaleTimeString();

const attendance =
new Attendance({

employeeEmail,

date:today,

checkIn:time

});

await attendance.save();

res.json({
message:"Checked In"
});

}
);

/* CHECK OUT */

router.put(
"/checkout/:email",
async(req,res)=>{

const today =
new Date()
.toLocaleDateString();

const time =
new Date()
.toLocaleTimeString();

await Attendance.findOneAndUpdate(

{
employeeEmail:
req.params.email,

date:today
},

{
checkOut:time
}

);

res.json({
message:"Checked Out"
});

}
);

/* ALL */

router.get(
"/all",
async(req,res)=>{

const data =
await Attendance.find();

res.json(data);

}
);

module.exports =
router;