const express =
require("express");

const router =
express.Router();

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const User =
require("../models/User");

/* REGISTER */

router.post(
    "/register",
    async (req,res) => {

        try{

            const {

                name,
                email,
                department,
                role,
                password

            } = req.body;

            const existingUser =
            await User.findOne({
                email
            });

            if(existingUser){

                return res.status(400).json({
                    message:
                    "User already exists"
                });

            }

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
                role,
                password:
                hashedPassword

            });

            await user.save();

            res.json({
                message:
                "Registration Successful"
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

/* LOGIN */

router.post(
    "/login",
    async (req,res) => {

        try{

            const {

                email,
                password

            } = req.body;

            const user =
            await User.findOne({
                email
            });

            if(!user){

                return res.status(400).json({
                    message:
                    "Invalid Email"
                });

            }

            const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

            if(!isMatch){

                return res.status(400).json({
                    message:
                    "Invalid Password"
                });

            }

            const token =
            jwt.sign(

                {
                    id:user._id
                },

                "SECRET_KEY",

                {
                    expiresIn:"7d"
                }

            );

            res.json({

                token,

                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
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

module.exports = router;