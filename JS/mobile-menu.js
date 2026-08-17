/* ==========================================================
   SUTRIKA - GLOBAL MOBILE / TABLET MENU
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-links");

    /* Stop if this page does not have the common header */
    if (!menuButton || !navMenu) {
        return;
    }

    const menuIcon = menuButton.querySelector("i");


    /* ======================================================
       OPEN / CLOSE MENU
       ====================================================== */

    menuButton.addEventListener("click", (event) => {

        event.stopPropagation();

        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");


        /* Change ☰ to ✕ */
        if (menuIcon) {

            if (isOpen) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");
            } else {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

        }


        /* Accessibility */
        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* ======================================================
       CLOSE MENU AFTER CLICKING A NAVIGATION LINK
       ====================================================== */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    /* ======================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ====================================================== */

    document.addEventListener("click", (event) => {

        if (
            !navMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            navMenu.classList.remove("active");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    /* ======================================================
       RESET MENU WHEN RETURNING TO DESKTOP
       ====================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            navMenu.classList.remove("active");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

});
