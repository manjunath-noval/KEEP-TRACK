const express = require("express");

const router = express.Router();

router.get(
    "/all",
    (req, res) => {

        res.json([

            {
                name:"John Smith",
                department:"Development"
            },

            {
                name:"Sarah Johnson",
                department:"Design"
            },

            {
                name:"David Lee",
                department:"Marketing"
            }

        ]);

    }
);

module.exports = router;