const express =
require("express");

const path =
require("path");

const cors =
require("cors");

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const employeeRoutes =
require("./routes/employeeRoutes");

const attendanceRoutes =
require("./routes/attendanceRoutes");

const projectRoutes =
require("./routes/projectRoutes");

const taskRoutes =
require("./routes/taskRoutes");

const activityRoutes =
require("./routes/activityRoutes");

const app =
express();

/* DATABASE */

connectDB();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended:true
    })
);

app.use(
"/api/projects",
projectRoutes
);

app.use(
"/api/tasks",
taskRoutes
);

/* STATIC */

app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);

/* ROUTES */

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/employees",
    employeeRoutes
);

app.use(
    "/api/attendance",
    attendanceRoutes
);

app.use(
    "/api/activity",
    activityRoutes
);

/* DEFAULT */

app.get(
    "/",
    (req,res) => {

        res.sendFile(

            path.join(

                __dirname,

                "public/pages/login.html"

            )

        );

    }
);

/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});