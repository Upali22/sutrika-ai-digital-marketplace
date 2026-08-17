/* =====================================
        SUTRIKA CONTACT PAGE JS
===================================== */


document.addEventListener("DOMContentLoaded", () => {



    const contactForm =
    document.querySelector(".contact-form");



    const inputs =
    document.querySelectorAll(
        ".contact-form input, .contact-form textarea"
    );





    // ================================
    // INPUT FOCUS EFFECT
    // ================================


    inputs.forEach(input => {


        input.addEventListener(
            "focus",
            ()=>{


                input.style.transform =
                "translateY(-3px)";


                input.style.transition =
                "0.3s ease";


            }
        );



        input.addEventListener(
            "blur",
            ()=>{


                input.style.transform =
                "translateY(0)";


            }
        );


    });








    // ================================
    // CONTACT FORM SUBMISSION
    // ================================


    if(contactForm){


        contactForm.addEventListener(
            "submit",
            (event)=>{


                event.preventDefault();



                const name =
                contactForm
                .querySelector(
                    "input[type='text']"
                ).value;



                const email =
                contactForm
                .querySelector(
                    "input[type='email']"
                ).value;



                const message =
                contactForm
                .querySelector(
                    "textarea"
                ).value;






                if(
                    name === "" ||
                    email === "" ||
                    message === ""
                ){


                    alert(
                    "Please fill all required details ❤️"
                    );


                    return;


                }






                /*
                FUTURE BACKEND CONNECTION:

                fetch("/api/contact",{

                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify({

                        name,
                        email,
                        message

                    })

                })

                */






                alert(
                "Thank you for contacting Sutrika ✨ We will get back to you soon."
                );



                contactForm.reset();



            }

        );


    }

/* ==========================================================
   SUTRIKA - BACK TO TOP BUTTON
========================================================== */

const backToTop = document.createElement("button");

backToTop.className = "sutrika-back-to-top";

backToTop.innerHTML = "↑";

backToTop.setAttribute(
    "aria-label",
    "Back to top"
);

backToTop.setAttribute(
    "title",
    "Back to top"
);

document.body.appendChild(backToTop);


/* Show button when scrolling */

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});




/* Scroll smoothly to top */

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

});
