const express =
require("express");

const router =
express.Router();

const Activity =
require("../models/Activity");

/* ADD ACTIVITY */

router.post(
    "/add",
    async (req,res) => {

        try{

            const {

                action,
                employeeName

            } = req.body;

            const activity =
            new Activity({

                action,
                employeeName

            });

            await activity.save();

            res.json({
                message:
                "Activity Added"
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

/* GET ALL ACTIVITIES */

router.get(
    "/all",
    async (req,res) => {

        try{

            const activities =
            await Activity.find()
            .sort({createdAt:-1});

            res.json(activities);

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

/* DELETE ACTIVITY */

router.delete(
    "/delete/:id",
    async (req,res) => {

        try{

            await Activity.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message:
                "Activity Deleted"
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