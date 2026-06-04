const registerForm =
document.getElementById(
    "registerForm"
);

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

        const password =
        document.getElementById(
            "password"
        ).value;

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

            alert(
                "Something went wrong"
            );

        }

    }
);