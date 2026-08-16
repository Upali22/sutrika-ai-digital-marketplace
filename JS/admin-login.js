/* ==========================================================
   SUTRIKA ADMIN LOGIN
========================================================== */

document.addEventListener("DOMContentLoaded", function () {


    const loginForm =
        document.getElementById("adminLoginForm");


    const emailInput =
        document.getElementById("adminEmail");


    const passwordInput =
        document.getElementById("adminPassword");


    const message =
        document.getElementById("adminLoginMessage");


    const togglePassword =
        document.getElementById("togglePassword");


    /* ==========================================
       SHOW / HIDE PASSWORD
    ========================================== */

    togglePassword.addEventListener(
        "click",
        function () {

            if (
                passwordInput.type === "password"
            ) {

                passwordInput.type = "text";

                togglePassword.innerHTML =
                    '<i class="fa-regular fa-eye-slash"></i>';

            } else {

                passwordInput.type = "password";

                togglePassword.innerHTML =
                    '<i class="fa-regular fa-eye"></i>';

            }

        }
    );


    /* ==========================================
       ADMIN LOGIN
    ========================================== */

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            message.textContent = "";


            if (!email || !password) {

                message.textContent =
                    "Please enter your email and password.";

                return;

            }


            const loginButton =
                loginForm.querySelector(
                    ".admin-login-button"
                );


            const originalButtonHTML =
                loginButton.innerHTML;


            loginButton.disabled = true;


            loginButton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Verifying...';


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/auth/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );


                const data =
                    await response.json();


                /* ==========================================
                   LOGIN FAILED
                ========================================== */

                if (!response.ok || !data.success) {

                    message.textContent =
                        data.message ||
                        "Invalid email or password.";

                    loginButton.disabled = false;

                    loginButton.innerHTML =
                        originalButtonHTML;

                    return;

                }


                /* ==========================================
                   CHECK ADMIN ROLE
                ========================================== */

                if (
                    !data.user ||
                    data.user.role !== "admin"
                ) {

                    message.textContent =
                        "Access denied. Admin account required.";

                    loginButton.disabled = false;

                    loginButton.innerHTML =
                        originalButtonHTML;

                    return;

                }


                /* ==========================================
                   SAVE ADMIN LOGIN
                ========================================== */

                localStorage.setItem(
                    "sutrikaToken",
                    data.token
                );


                localStorage.setItem(
                    "sutrikaUser",
                    JSON.stringify({

                        id:
                            data.user.id,

                        name:
                            data.user.full_name,

                        email:
                            data.user.email,

                        phone:
                            data.user.phone,

                        role:
                            data.user.role,

                        login:
                            true

                    })
                );


                /* ==========================================
                   SUCCESS
                ========================================== */

                loginButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> Access Granted';


                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    500
                );


            } catch (error) {

                console.error(
                    "ADMIN LOGIN ERROR:",
                    error
                );


                message.textContent =
                    "Unable to connect to the server. Please try again.";


                loginButton.disabled = false;

                loginButton.innerHTML =
                    originalButtonHTML;

            }

        }
    );

});