const express =
require("express");

const router =
express.Router();

const bcrypt =
require("bcryptjs");

const Employee =
require("../models/Employee");

const User =
require("../models/User");

/* GET ALL EMPLOYEES */

router.get(
    "/all",
    async (req,res) => {

        try{

            const employees =
            await Employee.find()
            .sort({createdAt:-1});

            res.json(employees);

        }
        catch(error){

            console.log(error);

            res.status(500).json({
                message:"Server Error"
            });

        }

    }
);

/* ADD EMPLOYEE */

router.post(
    "/add",
    async (req,res) => {
        console.log("ADD EMPLOYEE ROUTE HIT");

        try{

            const {

                name,
                email,
                department,
                role,
                salary,
                image,
                password

            } = req.body;
            console.log("REQ BODY:");
console.log(req.body);

console.log("PASSWORD:");
console.log(password);

            /* CREATE EMPLOYEE */

            const employee =
            new Employee({

                name,
                email,
                department,
                role,
                salary,
                image,

                status:"Active",

                performance:
                Math.floor(
                    Math.random() * 30
                ) + 70,

                joiningDate:
                new Date()
                .toLocaleDateString()

            });

            await employee.save();

            /* CHECK IF USER EXISTS */

            const existingUser =
            await User.findOne({
                email
            });

            /* CREATE LOGIN USER */

            if(!existingUser){

                const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

                const user =
                new User({

                    name,
                    email,
                    department,

                    role:"employee",

                    password:
                    hashedPassword

                });

                await user.save();

                console.log(
                    "USER CREATED SUCCESSFULLY"
                );

            }

            res.json({

                message:
                "Employee Added Successfully",

                loginCredentials:{

                    email,

                    password

                }

            });

        }
        catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

    }
);

/* UPDATE EMPLOYEE */

router.put(
    "/update/:id",
    async (req,res) => {

        try{

            const updatedEmployee =
            await Employee.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new:true
                }

            );

            res.json({

                message:
                "Employee Updated",

                updatedEmployee

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

/* DELETE EMPLOYEE */

router.delete(
    "/delete/:id",
    async (req,res) => {

        try{

            const employee =
            await Employee.findById(
                req.params.id
            );

            if(employee){

                await User.findOneAndDelete({
                    email:
                    employee.email
                });

            }

            await Employee.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message:
                "Employee Deleted"
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