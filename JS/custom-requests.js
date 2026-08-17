/* ==========================================
      SUTRIKA MY CUSTOM REQUESTS
========================================== */


document.addEventListener(
    "DOMContentLoaded",
    async () => {


        const container =
            document.getElementById(
                "customRequestsContainer"
            );


        if (!container) {

            return;

        }


        /* ======================================
              GET LOGGED-IN USER
        ====================================== */

        const user =
            JSON.parse(
                localStorage.getItem(
                    "sutrikaUser"
                )
            );


        /* ======================================
              LOGIN CHECK
        ====================================== */

        if (
            !user ||
            !user.login ||
            !user.id
        ) {

            container.innerHTML = `

                <div class="empty-requests">

                    <i class="fa-solid fa-user-lock"></i>

                    <h2>
                        Login Required
                    </h2>

                    <p>
                        Please login to view your
                        custom requests.
                    </p>

                    <a href="account.html">
                        Go to Account
                    </a>

                </div>

            `;

            return;

        }


        try {


            /* ==================================
                  FETCH REQUESTS
            ================================== */

            const response =
                await fetch(
                    `https://sutrika-ai-digital-marketplace-production.up.railway.app/api/personalise/my-requests?user_id=${user.id}`
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Unable to load requests."
                );

            }


            /* ==================================
                  NO REQUESTS
            ================================== */

            if (
                !data.requests ||
                data.requests.length === 0
            ) {

                container.innerHTML = `

                    <div class="empty-requests">

                        <i class="fa-solid fa-file-signature"></i>

                        <h2>
                            No Custom Requests Yet
                        </h2>

                        <p>
                            Your personalised requests
                            will appear here.
                        </p>

                        <a href="personalise.html">
                            Create a Custom Request
                        </a>

                    </div>

                `;

                return;

            }


            /* ==================================
                  CREATE CARDS
            ================================== */

            container.innerHTML =
                data.requests.map(
                    request => {


                        const date =
                            request.created_at
                            ?
                            new Date(
                                request.created_at
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                }
                            )
                            :
                            "Recently";


                        return `

                            <div class="custom-request-card">


                                <div class="request-card-top">


                                    <div>

                                        <div class="request-id">

                                            Request ID:
                                            ${request.request_id}

                                        </div>


                                        <div class="request-date">

                                            Submitted on
                                            ${date}

                                        </div>

                                    </div>


                                    <span
                                        class="request-status"
                                    >

                                        ${request.status}

                                    </span>


                                </div>



                                <div class="request-details">


                                    <div class="request-detail">

                                        <span>
                                            Fabric
                                        </span>

                                        <strong>
                                            ${request.fabric}
                                        </strong>

                                    </div>


                                    <div class="request-detail">

                                        <span>
                                            Colour
                                        </span>

                                        <strong>
                                            ${request.colour}
                                        </strong>

                                    </div>


                                    <div class="request-detail">

                                        <span>
                                            Pattern
                                        </span>

                                        <strong>
                                            ${request.pattern}
                                        </strong>

                                    </div>


                                    <div class="request-detail">

                                        <span>
                                            Occasion
                                        </span>

                                        <strong>
                                            ${request.occasion}
                                        </strong>

                                    </div>


                                </div>



                                ${
                                    request.special_request
                                    ?
                                    `

                                    <div
                                        class="special-request"
                                    >

                                        <div
                                            class="special-request-title"
                                        >

                                            SPECIAL REQUEST

                                        </div>


                                        <p>

                                            ${request.special_request}

                                        </p>

                                    </div>

                                    `
                                    :
                                    ""
                                }


                            </div>

                        `;

                    }
                ).join("");


        }


        catch (error) {


            console.error(
                "SUTRIKA CUSTOM REQUEST ERROR:",
                error
            );


            container.innerHTML = `

                <div class="empty-requests">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <h2>
                        Unable to Load Requests
                    </h2>

                    <p>
                        Please try again later.
                    </p>

                </div>

            `;

        }

    }
);

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
