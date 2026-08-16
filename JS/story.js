/* =====================================
        SUTRIKA STORY SLIDESHOW
===================================== */


document.addEventListener("DOMContentLoaded", () => {


    const slides = document.querySelectorAll(".story-slide");

    const dots = document.querySelectorAll(".dot");


    let currentSlide = 0;


    let slideInterval;



    function showSlide(index){


        // Remove active class

        slides.forEach(slide => {

            slide.classList.remove("active");

        });



        dots.forEach(dot => {

            dot.classList.remove("active");

        });



        // Add active class

        slides[index].classList.add("active");

        dots[index].classList.add("active");



        currentSlide = index;


    }




    function nextSlide(){


        currentSlide++;


        if(currentSlide >= slides.length){

            currentSlide = 0;

        }


        showSlide(currentSlide);


    }





    function startSlider(){


        slideInterval = setInterval(
            nextSlide,
            5000
        );


    }




    function resetSlider(){


        clearInterval(slideInterval);

        startSlider();


    }





    // Dot click navigation

    dots.forEach((dot,index)=>{


        dot.addEventListener("click",()=>{


            showSlide(index);


            resetSlider();


        });


    });





    // Start automatic slideshow

    if(slides.length > 0){

        showSlide(0);

        startSlider();

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