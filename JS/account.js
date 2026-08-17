/* =====================================
        SUTRIKA ACCOUNT PAGE JS
===================================== */


document.addEventListener("DOMContentLoaded", () => {




    /* ===============================
            HERO ANIMATION
    =============================== */


    const heroContent = document.querySelector(
        ".account-hero-content"
    );


    if(heroContent){

        heroContent.style.opacity = "0";

        heroContent.style.transform =
        "translateY(50px)";


        setTimeout(()=>{


            heroContent.style.transition =
            "1s ease";


            heroContent.style.opacity = "1";


            heroContent.style.transform =
            "translateY(0)";


        },300);

    }





    /* ===============================
            JOURNEY BUTTON
    =============================== */


    const journeyBtn =
    document.querySelector(".journey-btn");


    if(journeyBtn){


        journeyBtn.addEventListener(
            "click",
            ()=>{


                document
                .querySelector(".identity-section")
                .scrollIntoView({

                    behavior:"smooth"

                });


            }
        );


    }








    

/* ===============================
        LOGIN FORM
=============================== */

/* ===============================
        LOGIN FORM (BACKEND)
=============================== */

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value.trim();

        if (!email || !password) {

            alert("Please enter email and password.");
            return;

        }

        try {

            const response = await fetch("https://sutrika-ai-digital-marketplace-production.up.railway.app/api/auth/login", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email,
                    password

                })

            });

            const data = await response.json();

            if (data.success) {

                localStorage.setItem("sutrikaToken", data.token);
                console.log("LOGIN RESPONSE:", data);
console.log("PHONE:", data.user.phone);

localStorage.setItem("sutrikaUser", JSON.stringify({
    id: data.user.id,
    name: data.user.full_name,
    email: data.user.email,
    phone: data.user.phone,
    role: data.user.role,
    login: true
}));



                alert("Login Successful 🎉");

/* ==========================================
   ROLE-BASED REDIRECT
========================================== */

if (data.user.role === "admin") {

    // Admin → Admin Dashboard
    window.location.href = "../ADMIN/dashboard.html";

} else {

    // Customer → Normal SUTRIKA website
    window.location.href = "index.html";

}

                


            }

            else {

                alert(data.message);

            }

        }

        catch (error) {

            console.error(error);

            alert("Cannot connect to Backend Server.");

        }

    });

}

    /* ===============================
        ACCOUNT CARD INTERACTION
    =============================== */


    const cards =
    document.querySelectorAll(
        ".identity-item, .saved-card"
    );



    cards.forEach(card=>{


        card.addEventListener(
            "mouseenter",
            ()=>{

                card.style.cursor =
                "pointer";

            }
        );



    });
    /* ===============================
        USER STATUS
=============================== */

const user = JSON.parse(localStorage.getItem("sutrikaUser"));

if (user && user.login) {
    const heroButton =
document.getElementById("heroLoginBtn");


if(heroButton){

    heroButton.style.display="none";

}

    /* Hero Name */

    const welcomeUser = document.getElementById("welcomeUser");

    if (welcomeUser) {

        welcomeUser.textContent = user.name;

    }

    /* Dashboard Name */

    const profileName = document.querySelector(".profile-area h2");

    if (profileName) {

        profileName.textContent = "Welcome, " + user.name;

    }
    const profileEmail =
document.getElementById("profileEmail");


const profilePhone =
document.getElementById("profilePhone");



if(profileEmail){

    profileEmail.textContent = user.email;

}



if(profilePhone){

    profilePhone.textContent =
    user.phone || "Phone not added";

}

}
/* ===============================
        REGISTER MODAL
=============================== */

const registerModal = document.getElementById("registerModal");
const createAccountBtn = document.querySelector(".login-card p a");
const closeRegister = document.querySelector(".close-register");
const registerForm = document.getElementById("registerForm");

const loginModal = document.getElementById("loginModal");
const heroLoginBtn = document.getElementById("heroLoginBtn");
const closeLogin = document.getElementById("closeLogin");

/* Open Modal */

if(createAccountBtn){

    createAccountBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        // Close Login popup
        if(loginModal){
            loginModal.style.display = "none";
        }

        // Open Create Account popup
        if(registerModal){
            registerModal.style.display = "flex";
        }

        // Keep page scroll locked
        document.body.style.overflow = "hidden";

    });

}

/* Close Modal */

if(closeRegister){

    closeRegister.addEventListener("click",()=>{

        registerModal.style.display="none";

    });

}

/* Close when clicking outside */

window.addEventListener("click",(e)=>{

    if(e.target===registerModal){

        registerModal.style.display="none";

    }

});

/* Register User */

if(registerForm){

registerForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const full_name=document.getElementById("regName").value.trim();

const email=document.getElementById("regEmail").value.trim();

const phone=document.getElementById("regPhone").value.trim();

const password=document.getElementById("regPassword").value.trim();

try{

const response=await fetch("https://sutrika-ai-digital-marketplace-production.up.railway.app/api/auth/register",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

full_name,

email,

phone,

password

})

});
if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.message || "Registration failed.");
    return;
}

const data = await response.json();

alert("🎉 Registration Successful!");

registerModal.style.display = "none";
registerForm.reset();


}
catch(error){

    console.error("Registration Error:", error);

    alert("Something went wrong. Please check the browser console.");

}
});

}
/* =====================================
   LOGIN / DASHBOARD VISIBILITY
===================================== */

const dashboard = document.querySelector(".identity-section");

const dashboardUser = JSON.parse(
    localStorage.getItem("sutrikaUser")
);

if (dashboard) {

    if (dashboardUser && dashboardUser.login)  {

        dashboard.style.display = "block";

    } else {

        dashboard.style.display = "none";

    }

}
/* ===============================
        LOGOUT
=============================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("sutrikaToken");
        localStorage.removeItem("sutrikaUser");

        alert("Logged out successfully.");

        window.location.reload();

    });

}

/* =====================================
      PROFILE IMAGE UPLOAD
===================================== */


const profileImage =
document.getElementById("profileImage");


const profileUpload =
document.getElementById("profileUpload");


const changeProfileBtn =
document.getElementById("changeProfileBtn");



if(changeProfileBtn){

    changeProfileBtn.addEventListener("click",()=>{

        profileUpload.click();

    });

}



if(profileUpload){

    profileUpload.addEventListener("change",()=>{


        const file =
        profileUpload.files[0];


        if(file){


            const reader =
            new FileReader();


reader.onload = function(e){

    profileImage.src = e.target.result;

    const profileUser = JSON.parse(
        localStorage.getItem("sutrikaUser")
    );

    if(profileUser){

        localStorage.setItem(

            "sutrikaProfileImage_" + profileUser.email,

            e.target.result

        );

    }

};


            reader.readAsDataURL(file);


        }


    });

}
const profileUser = JSON.parse(
    localStorage.getItem("sutrikaUser")
);

if(profileUser && profileImage){

    const savedImage = localStorage.getItem(
        "sutrikaProfileImage_" + profileUser.email
    );

    if(savedImage){

        profileImage.src = savedImage;

    }

}


/* OPEN LOGIN */

if(heroLoginBtn){

    heroLoginBtn.addEventListener("click",()=>{

        if(loginModal){

            loginModal.style.display="flex";

            document.body.style.overflow="hidden";

        }

    });

}

/* =====================================
   AUTO OPEN LOGIN AFTER ADMIN LOGOUT
===================================== */

const urlParams = new URLSearchParams(
    window.location.search
);

if (
    urlParams.get("login") === "true" &&
    loginModal
) {

    loginModal.style.display = "flex";
    document.body.style.overflow = "hidden";

}

/* CLOSE BUTTON */

if(closeLogin){

    closeLogin.addEventListener("click",()=>{

        loginModal.style.display="none";

        document.body.style.overflow="auto";

    });

}

/* CLICK OUTSIDE */

window.addEventListener("click",(e)=>{

    if(e.target===loginModal){

        loginModal.style.display="none";

        document.body.style.overflow="auto";

    }

});

});

/* =====================================
   SUTRIKA PASSWORD VISIBILITY
===================================== */


/* ---------- LOGIN PASSWORD ---------- */

const toggleLoginPassword =
    document.getElementById("toggleLoginPassword");

const loginPassword =
    document.getElementById("loginPassword");


if (toggleLoginPassword && loginPassword) {

    toggleLoginPassword.addEventListener("click", () => {

        const icon =
            toggleLoginPassword.querySelector("i");

        if (loginPassword.type === "password") {

            loginPassword.type = "text";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

            toggleLoginPassword.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            loginPassword.type = "password";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

            toggleLoginPassword.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

}


/* ---------- REGISTER PASSWORD ---------- */

const toggleRegisterPassword =
    document.getElementById("toggleRegisterPassword");

const registerPassword =
    document.getElementById("regPassword");


if (toggleRegisterPassword && registerPassword) {

    toggleRegisterPassword.addEventListener("click", () => {

        const icon =
            toggleRegisterPassword.querySelector("i");

        if (registerPassword.type === "password") {

            registerPassword.type = "text";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

            toggleRegisterPassword.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            registerPassword.type = "password";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

            toggleRegisterPassword.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

}


/* ---------- CONFIRM PASSWORD ---------- */

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

const confirmPassword =
    document.getElementById("regConfirmPassword");


if (toggleConfirmPassword && confirmPassword) {

    toggleConfirmPassword.addEventListener("click", () => {

        const icon =
            toggleConfirmPassword.querySelector("i");

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

            toggleConfirmPassword.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            confirmPassword.type = "password";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

            toggleConfirmPassword.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

}


/* =====================================
   PASSWORD STRENGTH
===================================== */

const passwordStrength =
    document.getElementById("regPassword");

const strengthFill =
    document.getElementById("strengthFill");

const strengthText =
    document.getElementById("strengthText");


if (
    passwordStrength &&
    strengthFill &&
    strengthText
) {

    passwordStrength.addEventListener(
        "input",
        () => {

            const password =
                passwordStrength.value;

            let strength = 0;

            if (password.length >= 6) {
                strength++;
            }

            if (/[A-Z]/.test(password)) {
                strength++;
            }

            if (/[0-9]/.test(password)) {
                strength++;
            }

            if (/[^A-Za-z0-9]/.test(password)) {
                strength++;
            }


            if (password.length === 0) {

                strengthFill.style.width = "0%";

                strengthText.textContent =
                    "Password strength";

            }

            else if (strength <= 1) {

                strengthFill.style.width = "25%";

                strengthFill.style.background =
                    "#B54A4A";

                strengthText.textContent =
                    "Weak password";

            }

            else if (strength === 2) {

                strengthFill.style.width = "50%";

                strengthFill.style.background =
                    "#C58A3A";

                strengthText.textContent =
                    "Medium password";

            }

            else if (strength === 3) {

                strengthFill.style.width = "75%";

                strengthFill.style.background =
                    "#A68A3A";

                strengthText.textContent =
                    "Good password";

            }

            else {

                strengthFill.style.width = "100%";

                strengthFill.style.background =
                    "#3E7650";

                strengthText.textContent =
                    "Strong password";

            }

        }
    );

}


/* =====================================
   CONFIRM PASSWORD CHECK
===================================== */

if (registerForm && confirmPassword) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            if (
                registerPassword.value !==
                confirmPassword.value
            ) {

                event.preventDefault();

                alert(
                    "Passwords do not match."
                );

                confirmPassword.focus();

            }

        }
    );

}


