const express =
require("express");

const router =
express.Router();

const Task =
require("../models/Task");

/* GET ALL TASKS */

router.get(
"/all",
async (req,res) => {

try{

const tasks =
await Task.find()
.sort({createdAt:-1});

res.json(tasks);

}
catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

}
);

/* UPDATE TASK STATUS */

router.put(
"/update/:id",
async (req,res) => {

try{

await Task.findByIdAndUpdate(

req.params.id,

{
status:
req.body.status
}

);

res.json({
message:"Task Updated"
});

}
catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

}
);

/* ADD TASK */

router.post(
"/add",
async (req,res) => {

try{

const task =
new Task(req.body);

await task.save();

res.json({
message:"Task Created"
});

}
catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

}
);

module.exports = router;