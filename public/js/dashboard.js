const role =
localStorage.getItem(
    "role"
);

if(role !== "admin"){

    window.location.href =
    "/pages/employee-dashboard.html";

}

/* TOKEN CHECK */

const token =
localStorage.getItem(
    "token"
);

if(!token){

    window.location.href =
    "/pages/login.html";

}

/* ELEMENTS */

const employeeTable =
document.getElementById(
    "employeeTable"
);

const totalEmployees =
document.getElementById(
    "totalEmployees"
);

const presentEmployees =
document.getElementById(
    "presentEmployees"
);

const activeProjects =
document.getElementById(
    "activeProjects"
);

const productivityRate =
document.getElementById(
    "productivityRate"
);

const attendanceCount =
document.getElementById(
    "attendanceCount"
);

const activityFeed =
document.getElementById(
    "activityFeed"
);

const darkModeBtn =
document.getElementById(
    "darkModeBtn"
);

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

const employeeForm =
document.getElementById(
    "employeeForm"
);

const modal =
document.getElementById(
    "employeeModal"
);

const openModalBtn =
document.getElementById(
    "openModalBtn"
);

const closeModalBtn =
document.getElementById(
    "closeModalBtn"
);

const searchInput =
document.getElementById(
    "searchInput"
);

const departmentFilter =
document.getElementById(
    "departmentFilter"
);

const profileModal =
document.getElementById(
    "profileModal"
);

/* GLOBAL */

let employeeData = [];

let editingEmployeeId =
null;

let employeeChart;
let departmentChart;

/* TOAST */

function showToast(message){

    const toast =
    document.createElement(
        "div"
    );

    toast.className =
    "toast";

    toast.innerText =
    message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show-toast"
        );

    },100);

    setTimeout(() => {

        toast.remove();

    },3000);

}

/* DARK MODE */

darkModeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

    }
);

/* LOGOUT */

logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href =
        "/pages/login.html";

    }
);

/* MODAL */

openModalBtn.onclick = () => {

    editingEmployeeId =
    null;

    employeeForm.reset();

    modal.style.display =
    "flex";

};

closeModalBtn.onclick = () => {

    modal.style.display =
    "none";

};

/* LOAD EMPLOYEES */

async function loadEmployees(){

    employeeTable.innerHTML = `

<tr>

<td colspan="6">

<div class="loading">

Loading Employees...

</div>

</td>

</tr>

`;

    try{

        const response =
        await fetch(
            "/api/employees/all"
        );

        const employees =
        await response.json();

        employeeData =
        employees;

        renderEmployees(
            employees
        );

        updateStats(
            employees
        );

        createCharts(
            employees
        );

    }
    catch(error){

        console.log(error);

        showToast(
            "Failed To Load Employees"
        );

    }

}

/* RENDER EMPLOYEES */

function renderEmployees(employees){

    employeeTable.innerHTML = "";

    if(employees.length === 0){

        employeeTable.innerHTML = `

<tr>

<td colspan="6">

<div class="empty-state">

No Employees Found

</div>

</td>

</tr>

`;

        return;

    }

    employees.forEach((employee) => {

        employeeTable.innerHTML += `

<tr>

<td>

<div class="employee-info">

<img
src="${employee.image}"
class="employee-avatar">

<div>

<h4>
${employee.name}
</h4>

<p>
${employee.role}
</p>

</div>

</div>

</td>

<td>
${employee.email}
</td>

<td>
${employee.department}
</td>

<td>

<span class="status active-status">

${employee.status}

</span>

</td>

<td>

${employee.performance}%

</td>

<td>

<button
class="view-btn"
onclick='viewEmployee(${JSON.stringify(employee)})'>

View

</button>

<button
class="edit-btn"
onclick='openEditModal(${JSON.stringify(employee)})'>

Edit

</button>

<button
class="delete-btn"
onclick="deleteEmployee('${employee._id}')">

Delete

</button>


</td>

</tr>

`;

    });

}

/* UPDATE STATS */

function updateStats(employees){

    totalEmployees.innerText =
    employees.length;

    const avgPerformance =
    employees.reduce(

        (sum,employee) =>

        sum + (
            employee.performance || 0
        ),

        0

    ) / (
        employees.length || 1
    );

    productivityRate.innerText =
    Math.floor(
        avgPerformance
    ) + "%";

}

/* CHARTS */

function createCharts(employees){

    const departmentCounts = {};

    employees.forEach((employee) => {

        const dept =
        employee.department;

        departmentCounts[dept] =
        (
            departmentCounts[dept]
            || 0
        ) + 1;

    });

    const employeeCanvas =
    document.getElementById(
        "employeeChart"
    );

    if(employeeChart){

        employeeChart.destroy();

    }

    employeeChart =
    new Chart(
        employeeCanvas,
        {
            type:"line",

            data:{

                labels:[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],

                datasets:[
                    {
                        label:
                        "Employees",

                        data:[
                            5,
                            10,
                            15,
                            20,
                            25,
                            employees.length
                        ],

                        borderColor:
                        "#2563eb",

                        backgroundColor:
                        "rgba(37,99,235,0.2)",

                        fill:true,

                        tension:0.4
                    }
                ]

            },

            options:{
                responsive:true,
                maintainAspectRatio:false
            }

        }
    );

    const departmentCanvas =
    document.getElementById(
        "departmentChart"
    );

    if(departmentChart){

        departmentChart.destroy();

    }

    departmentChart =
    new Chart(
        departmentCanvas,
        {
            type:"doughnut",

            data:{

                labels:
                Object.keys(
                    departmentCounts
                ),

                datasets:[
                    {
                        data:
                        Object.values(
                            departmentCounts
                        ),

                        backgroundColor:[
                            "#2563eb",
                            "#10b981",
                            "#f59e0b",
                            "#8b5cf6",
                            "#ef4444"
                        ]
                    }
                ]

            },

            options:{
                responsive:true,
                maintainAspectRatio:false
            }

        }
    );

}

/* LOAD ACTIVITIES */

async function loadActivities(){

    try{

        const response =
        await fetch(
            "/api/activity/all"
        );

        const activities =
        await response.json();

        activityFeed.innerHTML = "";

        activities.forEach((activity) => {

            activityFeed.innerHTML += `

<div class="activity">

${activity.action}
:
${activity.employeeName}

</div>

`;

        });

    }
    catch(error){

        console.log(error);

    }

}

/* LOAD ATTENDANCE */

async function loadAttendance(){

try{

const response =
await fetch(
"/api/attendance/all"
);

const attendance =
await response.json();

attendanceCount.innerText =
attendance.length;

const attendanceFeed =
document.getElementById(
"attendanceFeed"
);

if(attendanceFeed){

attendanceFeed.innerHTML = "";

attendance
.reverse()
.forEach((record)=>{

attendanceFeed.innerHTML += `

<div class="activity">

<b>
${record.employeeEmail}
</b>

<br>

Date:
${record.date}

<br>

Check In:
${record.checkIn || "-"}

<br>

Check Out:
${record.checkOut || "-"}

</div>

`;

});

}

}
catch(error){

console.log(error);

}

}

async function loadDashboardStats(){

try{

/* ATTENDANCE */

const attendanceResponse =
await fetch(
"/api/attendance/all"
);

const attendance =
await attendanceResponse.json();

const today =
new Date()
.toLocaleDateString();

const todayAttendance =
attendance.filter(

record =>

record.date === today

);

presentEmployees.innerText =
todayAttendance.length;

attendanceCount.innerText =
todayAttendance.length;

/* PROJECTS */

const projectResponse =
await fetch(
"/api/projects/all"
);

const projects =
await projectResponse.json();

activeProjects.innerText =
projects.length;

}
catch(error){

console.log(error);

}

}

/* ADD / UPDATE EMPLOYEE */

employeeForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const name =
        document.getElementById(
            "employeeName"
        ).value;

        const email =
        document.getElementById(
            "employeeEmail"
        ).value;

        const department =
        document.getElementById(
            "employeeDepartment"
        ).value;

        const role =
        document.getElementById(
            "employeeRole"
        ).value;

        const salary =
        document.getElementById(
            "employeeSalary"
        ).value;

        const image =
        document.getElementById(
            "employeeImage"
        ).value;

        let response;

        if(editingEmployeeId){

            response =
            await fetch(

                `/api/employees/update/${editingEmployeeId}`,

                {
                    method:"PUT",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify({

                        name,
                        email,
                        department,
                        role,
                        salary,
                        image

                    })

                }

            );

            showToast(
                "Employee Updated"
            );

        }
        else{

            response =
            await fetch(
                "/api/employees/add",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                  body:JSON.stringify({

    name,
    email,
    department,
    role,
    salary,
    image,

    password:
    document.getElementById(
        "employeePassword"
    ).value

})

                }
            );

          const data =
await response.json();

showToast(
    "Employee Added"
);

alert(

`Employee Login Created

Email:
${data.loginCredentials.email}

Password:
${data.loginCredentials.password}`

);
        }

        await fetch(
            "/api/activity/add",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    action:
                    editingEmployeeId
                    ? "Updated Employee"
                    : "Added Employee",

                    employeeName:name

                })

            }
        );

        employeeForm.reset();

        modal.style.display =
        "none";

        editingEmployeeId =
        null;

        loadEmployees();

        loadActivities();

    }
);

/* EDIT */

function openEditModal(employee){

    editingEmployeeId =
    employee._id;

    modal.style.display =
    "flex";

    document.getElementById(
        "employeeName"
    ).value = employee.name;

    document.getElementById(
        "employeeEmail"
    ).value = employee.email;

    document.getElementById(
        "employeeDepartment"
    ).value = employee.department;

    document.getElementById(
        "employeeRole"
    ).value = employee.role;

    document.getElementById(
        "employeeSalary"
    ).value = employee.salary;

    document.getElementById(
        "employeeImage"
    ).value = employee.image;

}

/* DELETE */

async function deleteEmployee(id){

    const confirmDelete =
    confirm(
        "Delete this employee?"
    );

    if(!confirmDelete){
        return;
    }

    await fetch(

        `/api/employees/delete/${id}`,

        {
            method:"DELETE"
        }

    );

    showToast(
        "Employee Deleted"
    );

    loadEmployees();

}

/* VIEW PROFILE */

function viewEmployee(employee){

    profileModal.style.display =
    "flex";

    document.getElementById(
        "profileImage"
    ).src = employee.image;

    document.getElementById(
        "profileName"
    ).innerText = employee.name;

    document.getElementById(
        "profileRole"
    ).innerText = employee.role;

    document.getElementById(
        "profileEmail"
    ).innerText = employee.email;

    document.getElementById(
        "profileDepartment"
    ).innerText = employee.department;

    document.getElementById(
        "profileSalary"
    ).innerText =
    "₹" + employee.salary;

    document.getElementById(
        "profilePerformance"
    ).innerText =
    employee.performance + "%";

    document.getElementById(
        "profileStatus"
    ).innerText =
    employee.status;

    document.getElementById(
        "profileJoining"
    ).innerText =
    employee.joiningDate;

}

function closeProfile(){

    profileModal.style.display =
    "none";

}


/* SEARCH */

searchInput.addEventListener(
    "keyup",
    () => {

        const value =
        searchInput.value
        .toLowerCase();

        const filtered =
        employeeData.filter(
            (employee) =>

            employee.name
            .toLowerCase()
            .includes(value)
        );

        renderEmployees(
            filtered
        );

    }
);

/* FILTER */

departmentFilter.addEventListener(
    "change",
    () => {

        const value =
        departmentFilter.value;

        if(!value){

            renderEmployees(
                employeeData
            );

            return;

        }

        const filtered =
        employeeData.filter(
            (employee) =>

            employee.department ===
            value
        );

        renderEmployees(
            filtered
        );

    }
);

/* EXPORT CSV */

function exportCSV(){

    let csv =
    "Name,Email,Department,Role,Salary\n";

    employeeData.forEach((employee) => {

        csv +=

`${employee.name},
${employee.email},
${employee.department},
${employee.role},
${employee.salary}\n`;

    });

    const blob =
    new Blob(
        [csv],
        {
            type:"text/csv"
        }
    );

    const url =
    window.URL.createObjectURL(
        blob
    );

    const a =
    document.createElement(
        "a"
    );

    a.href = url;

    a.download =
    "employees.csv";

    a.click();

    showToast(
        "CSV Exported"
    );

}

/* EXPORT PDF */

function exportPDF(){

    let content = `

    <html>

    <head>

    <title>
    Employee Report
    </title>

    <style>

    body{
        font-family:Arial;
        padding:40px;
    }

    table{
        width:100%;
        border-collapse:collapse;
        margin-top:20px;
    }

    th,td{
        border:1px solid #ccc;
        padding:12px;
    }

    th{
        background:#2563eb;
        color:white;
    }

    </style>

    </head>

    <body>

    <h1>
    Employee Report
    </h1>

    <table>

    <tr>

    <th>Name</th>
    <th>Email</th>
    <th>Department</th>
    <th>Role</th>
    <th>Salary</th>

    </tr>

    `;

    employeeData.forEach((employee) => {

        content += `

<tr>

<td>${employee.name}</td>
<td>${employee.email}</td>
<td>${employee.department}</td>
<td>${employee.role}</td>
<td>₹${employee.salary}</td>

</tr>

`;

    });

    content += `

</table>

</body>

</html>

`;

    const printWindow =
    window.open(
        "",
        "",
        "width=900,height=700"
    );

    printWindow.document.write(
        content
    );

    printWindow.document.close();

    printWindow.print();

    showToast(
        "PDF Ready"
    );

}

/* INITIAL */

loadEmployees();

loadActivities();

loadAttendance();

loadDashboardStats();