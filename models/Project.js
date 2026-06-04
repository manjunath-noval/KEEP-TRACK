const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    projectName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    manager: {
        type: String,
        required: true
    },

    assignedEmployees: [
        {
            type: String
        }
    ],

    deadline: {
        type: String
    },

    status: {
        type: String,
        default: "Pending"
    },

    progress: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

const Project = mongoose.model(
    "Project",
    projectSchema
);

module.exports = Project;