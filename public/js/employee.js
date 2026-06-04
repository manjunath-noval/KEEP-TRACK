const role =
localStorage.getItem(
    "role"
);

if(role !== "employee"){

    window.location.href =
    "/pages/dashboard.html";

}

function logout(){

    localStorage.clear();

    window.location.href =
    "/pages/login.html";

}