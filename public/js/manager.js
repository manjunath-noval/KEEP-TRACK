const role =
localStorage.getItem(
    "role"
);

console.log(
    "Current Role:",
    role
);

if(role !== "manager"){

    alert(
        "Access Denied"
    );

    window.location.href =
    "/pages/login.html";

}

function logout(){

    localStorage.clear();

    window.location.href =
    "/pages/login.html";

}