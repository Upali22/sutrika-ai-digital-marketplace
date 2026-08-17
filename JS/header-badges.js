/* ==========================================================
   SUTRIKA - GLOBAL CART & WISHLIST BADGES
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    function updateSutrikaHeaderBadges() {

        const user =
            JSON.parse(
                localStorage.getItem("sutrikaUser")
            );

        /* ------------------------------------------
           FIND HEADER ICONS
        ------------------------------------------ */

        const navIcons =
            document.querySelectorAll(
                ".nav-icons a"
            );

        let wishlistLink = null;
        let cartLink = null;


        navIcons.forEach(function (link) {

            const href =
                link.getAttribute("href") || "";


            if (
                href.includes("wishlist")
            ) {

                wishlistLink = link;

            }


            if (
                href.includes("cart")
            ) {

                cartLink = link;

            }

        });


        /* ==========================================
           WISHLIST BADGE
        ========================================== */

        if (wishlistLink) {

            let badge =
                wishlistLink.querySelector(
                    ".header-badge"
                );


            if (!badge) {

                badge =
                    document.createElement("span");

                badge.className =
                    "header-badge";

                wishlistLink.appendChild(badge);

            }


            let count = 0;


            if (
                user &&
                user.login &&
                user.email
            ) {

                const key =
                    "wishlist_" + user.email;

                const wishlist =
                    JSON.parse(
                        localStorage.getItem(key)
                    ) || [];


                count = wishlist.length;

            }


            if (count > 0) {

                badge.textContent = count;

                badge.classList.add("show");

            } else {

                badge.textContent = "";

                badge.classList.remove("show");

            }

        }


        /* ==========================================
           CART BADGE
        ========================================== */

        if (cartLink) {

            let badge =
                cartLink.querySelector(
                    ".header-badge"
                );


            if (!badge) {

                badge =
                    document.createElement("span");

                badge.className =
                    "header-badge";

                cartLink.appendChild(badge);

            }


            let count = 0;


            if (
                user &&
                user.login &&
                user.email
            ) {

                const key =
                    "sutrikaCart_" + user.email;


                const cart =
                    JSON.parse(
                        localStorage.getItem(key)
                    ) || [];


                count =
                    cart.reduce(
                        function (total, item) {

                            return total +
                                Number(
                                    item.quantity || 1
                                );

                        },
                        0
                    );

            }


            if (count > 0) {

                badge.textContent = count;

                badge.classList.add("show");

            } else {

                badge.textContent = "";

                badge.classList.remove("show");

            }

        }

    }


    /* ------------------------------------------
       RUN WHEN PAGE OPENS
    ------------------------------------------ */

    updateSutrikaHeaderBadges();


    /* ------------------------------------------
       MAKE FUNCTION AVAILABLE TO OTHER JS FILES
    ------------------------------------------ */

    window.updateSutrikaHeaderBadges =
        updateSutrikaHeaderBadges;


    /* ------------------------------------------
       UPDATE WHEN STORAGE CHANGES
    ------------------------------------------ */

    window.addEventListener(
        "storage",
        function () {

            updateSutrikaHeaderBadges();

        }
    );

});
