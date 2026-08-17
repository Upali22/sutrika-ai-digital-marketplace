document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".artisan-slide");

    if (slides.length === 0) return;

    let current = 0;
    let autoSlide;

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    function nextSlide() {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        showSlide(current);
    }

    function startSlider() {

        autoSlide = setInterval(nextSlide, 6000);

    }

    function stopSlider() {

        clearInterval(autoSlide);

    }

    // Start slideshow
    startSlider();

    // Pause on hover
    const hero = document.querySelector(".artisan-hero");

    if (hero) {

        hero.addEventListener("mouseenter", stopSlider);

        hero.addEventListener("mouseleave", startSlider);

    }

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
