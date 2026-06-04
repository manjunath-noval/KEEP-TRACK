const User = require("../models/User");

const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {

    try{

        const {
            name,
            email,
            department,
            password
        } = req.body;

        const userExists =
        await User.findOne({ email });

        if(userExists){

            return res.json({
                message:"User already exists"
            });

        }

        const hashedPassword =
        await bcrypt.hash(password, 10);

        const newUser = new User({

            name,
            email,
            department,
            password:hashedPassword

        });

        await newUser.save();

        res.json({
            message:"Registration Successful"
        });

    }
    catch(error){

        console.log(error);

        res.json({
            message:"Server Error"
        });

    }

};

const loginUser = async (req, res) => {

    res.json({
        message:"Login Successful"
    });

};

module.exports = {
    registerUser,
    loginUser
};