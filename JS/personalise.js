/* =========================================================
   SUTRIKA PERSONALISE
   CUSTOM REQUEST SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const selects = document.querySelectorAll("select");

    const fabric = selects[0];
    const colour = selects[1];
    const pattern = selects[2];
    const occasion = selects[3];

    const message = document.querySelector("textarea");

    const button = document.querySelector(".custom-btn");

    const confirmation =
        document.getElementById("customRequestConfirmation");

    const requestIdElement =
        document.getElementById("customRequestId");


    /* =====================================================
       SUBMIT CUSTOM REQUEST
       ===================================================== */

    button.addEventListener("click", async function (e) {

        e.preventDefault();


        /* =================================================
           COLLECT USER PREFERENCES
           ================================================= */

           const user = JSON.parse(
    localStorage.getItem("sutrikaUser")
);

if (!user || !user.login || !user.id) {

    alert("Please login to submit a custom request.");

    window.location.href = "account.html";

    return;

}


const requestData = {

    user_id: user.id,

    fabric: fabric.value,

    colour: colour.value,

    pattern: pattern.value,

    occasion: occasion.value,

    message: message.value.trim()

};



        /* =================================================
           LOADING STATE
           ================================================= */

        button.disabled = true;

        button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Submitting Your Request...
        `;


        try {

            /* =============================================
               SEND REQUEST TO BACKEND
               ============================================= */

            const response = await fetch(
                "https://sutrika-ai-digital-marketplace-production.up.railway.app/api/personalise/request",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(requestData)
                }
            );


            const data = await response.json();


            /* =============================================
               HANDLE ERROR
               ============================================= */

            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Unable to submit your custom request."
                );

            }


            /* =============================================
               DISPLAY REQUEST ID
               ============================================= */

            requestIdElement.textContent =
                data.requestId;


            /* =============================================
               SHOW CONFIRMATION
               ============================================= */

            confirmation.style.display = "block";

            /* =============================================
   VIEW MY CUSTOM REQUESTS LINK
   ============================================= */

let viewRequestsLink =
    confirmation.querySelector(
        ".view-custom-requests-link"
    );


if (!viewRequestsLink) {

    viewRequestsLink =
        document.createElement("a");

    viewRequestsLink.href =
        "custom-requests.html";

    viewRequestsLink.className =
        "view-custom-requests-link";

    viewRequestsLink.innerHTML = `
        <i class="fa-solid fa-file-signature"></i>
        View My Custom Requests
        <i class="fa-solid fa-arrow-right"></i>
    `;

    confirmation.appendChild(
        viewRequestsLink
    );
}


            /* =============================================
               SCROLL TO CONFIRMATION
               ============================================= */

            setTimeout(() => {

                confirmation.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 200);


            /* =============================================
               RESET FORM
               ============================================= */

            message.value = "";


        }

        catch (error) {

            console.error(
                "SUTRIKA Custom Request Error:",
                error
            );


            alert(
                error.message ||
                "Something went wrong. Please try again."
            );

        }

        finally {

            button.disabled = false;

            button.innerHTML = `
                Submit Custom Request
            `;

        }

    });

});

/* ==========================================================
   SUTRIKA - BACK TO TOP BUTTON
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.createElement("button");

    backToTop.className = "sutrika-back-to-top";
    backToTop.innerHTML = "↑";

    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.setAttribute("title", "Back to top");

    document.body.appendChild(backToTop);


    /* Show button after scrolling */

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    /* Smoothly return to top */

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

