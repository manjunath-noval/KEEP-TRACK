/* LOGIN */

const loginForm =
document.getElementById(
    "loginForm"
);

if(loginForm){

    loginForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const email =
            document.getElementById(
                "email"
            ).value;

            const password =
            document.getElementById(
                "password"
            ).value;

            try{

                const response =
                await fetch(
                    "/api/auth/login",
                    {
                        method:"POST",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },

                        body:JSON.stringify({

                            email,
                            password

                        })

                    }
                );

                const data =
                await response.json();

                if(response.ok){

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                    localStorage.setItem(
                        "role",
                        data.user.role
                    );
                    localStorage.setItem(
                    "userEmail",
                     data.user.email
                    );

                  if(
data.user.role ===
"admin"
){

window.location.href =
"/pages/dashboard.html";

}
else if(
data.user.role ===
"manager"
){

window.location.href =
"/pages/manager-dashboard.html";

}
else{

window.location.href =
"/pages/employee-dashboard.html";

}

                }
                else{

                    alert(
                        data.message
                    );

                }

            }
            catch(error){

                console.log(error);

            }

        }
    );

}

/* REGISTER */

const registerForm =
document.getElementById(
    "registerForm"
);

if(registerForm){

    registerForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const name =
            document.getElementById(
                "name"
            ).value;

            const email =
            document.getElementById(
                "email"
            ).value;

            const department =
            document.getElementById(
                "department"
            ).value;

            const role =
            document.getElementById(
                "role"
            ).value;

            const password =
            document.getElementById(
                "password"
            ).value;

            const secretCode =
document.getElementById(
"secretCode"
).value;


if(
secretCode !==
"PROTRACK2026"
){

alert(
"Invalid Company Secret Code"
);

return;

}

            try{

                const response =
                await fetch(
                    "/api/auth/register",
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
                            password

                        })

                    }
                );

                const data =
                await response.json();

                if(response.ok){

                    alert(
                        "Registration Successful"
                    );

                    window.location.href =
                    "/pages/login.html";

                }
                else{

                    alert(
                        data.message
                    );

                }

            }
            catch(error){

                console.log(error);

            }

        }
    );

}