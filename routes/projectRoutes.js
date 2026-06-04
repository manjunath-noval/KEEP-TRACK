const express =
require("express");

const router =
express.Router();

const Project =
require("../models/Project");

console.log(
"Project Routes Loaded"
);

console.log(
"Project Model:"
);

console.log(Project);

/* GET ALL PROJECTS */

router.get(
"/all",
async(req,res)=>{

try{

const projects =
await Project.find()
.sort({createdAt:-1});

res.json(projects);

}
catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

}
);

/* ADD PROJECT */

router.post(
"/add",
async(req,res)=>{

try{

const project =
new Project(req.body);

await project.save();

res.json({
message:"Project Created"
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

/* UPDATE PROJECT */

router.put(
"/update/:id",
async(req,res)=>{

try{

const project =
await Project.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);

res.json(project);

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