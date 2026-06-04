const mongoose = require("mongoose");

const connectDB = async () => {

    try{

        await mongoose.connect(
            "mongodb://ProtrackAdmin:Manju%40861%23@ac-0qhcaa2-shard-00-00.7sfjdh5.mongodb.net:27017,ac-0qhcaa2-shard-00-01.7sfjdh5.mongodb.net:27017,ac-0qhcaa2-shard-00-02.7sfjdh5.mongodb.net:27017/protrack?ssl=true&replicaSet=atlas-137lc7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
        );

        console.log("MongoDB Connected");

    }
    catch(error){

        console.log(error);

    }

};

module.exports = connectDB;