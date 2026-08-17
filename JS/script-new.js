/* ==========================================================
   SUTRIKA - script-new.js
   PART 1
   Hero Slider
   Sticky Header
   Smooth Scroll
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SUTRIKA OPENING ANIMATION
    ========================================== */

    /* ==========================================
   SUTRIKA OPENING ANIMATION
========================================== */

const sutrikaIntro = document.getElementById("sutrika-intro");

if (sutrikaIntro) {

    // Prevent scrolling while intro is visible
    document.body.classList.add("intro-active");

    // Let the complete 7-second opening animation play
    setTimeout(() => {

        sutrikaIntro.classList.add("intro-hide");

        // Allow the homepage to scroll again
        document.body.classList.remove("intro-active");

        // Remove intro after fade-out
        setTimeout(() => {
            sutrikaIntro.remove();
        }, 800);

    }, 5000);
}




    /* ==========================================
       HERO SLIDER
    ========================================== */

    /* ==========================================
       HERO SLIDER
    ========================================== */

    const slides = document.querySelectorAll(".hero-slide");

    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

    }

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }

    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }

    function startSlider() {

        if (slides.length <= 1) return;

        sliderInterval = setInterval(nextSlide, 5000);

    }

    function stopSlider() {

        clearInterval(sliderInterval);

    }

    if (slides.length > 0) {

        showSlide(currentSlide);

        startSlider();

    }

    /* ==========================================
       HERO BUTTONS (Optional)
    ========================================== */

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.addEventListener("mouseenter", stopSlider);

        hero.addEventListener("mouseleave", startSlider);

    }

    /* ==========================================
       STICKY HEADER
    ========================================== */

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 60) {

            header.style.background = "rgba(74,16,36,0.98)";
            header.style.boxShadow = "0 8px 25px rgba(0,0,0,.15)";
            header.style.transition = ".35s";

        } else {

            header.style.background = "rgba(74,16,36,.90)";
            header.style.boxShadow = "none";

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();

    /* ==========================================
       ACTIVE NAVIGATION
    ========================================== */

    const currentPage = window.location.pathname.split("/").pop();

const allLinks = document.querySelectorAll(".nav-links a, .nav-icons a");

allLinks.forEach(link => {

    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {

        link.classList.add("active");

    }

});


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        // Ignore empty or "#" links
        if (!href || href === "#") {
            return;
        }

        const target = document.querySelector(href);

        if (!target) {
            return;
        }

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


    /* ==========================================
       BUTTON CLICK EFFECT
    ========================================== */

    const buttons = document.querySelectorAll(
        ".btn-primary, .btn-secondary, .collection-btn, .artisan-btn"
    );

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            this.style.transform = "scale(.96)";

            setTimeout(() => {

                this.style.transform = "";

            }, 180);

        });

    });

});
/* ==========================================================
   PART 2
   Counter Animation
   Scroll Reveal
   Newsletter
   Lazy Loading
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       COUNTER ANIMATION
    ========================================== */

    const counters = document.querySelectorAll(".stat-card h2");

    function animateCounter(counter) {

        const text = counter.innerText;

        const target = parseInt(text.replace(/\D/g, ""));

        if (isNaN(target)) return;

        const suffix = text.replace(/[0-9]/g, "");

        let count = 0;

        const speed = Math.max(15, target / 80);

        const timer = setInterval(() => {

            count += speed;

            if (count >= target) {

                counter.innerText = target + suffix;

                clearInterval(timer);

            } else {

                counter.innerText = Math.floor(count) + suffix;

            }

        }, 20);

    }

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealItems = document.querySelectorAll(

        ".collection-card, .highlight-box, .artisan-card, .why-card, .ai-card, .story-grid, .testimonial-card"

    );

    revealItems.forEach(item => {

        item.style.opacity = "0";

        item.style.transform = "translateY(50px)";

        item.style.transition = "all .8s ease";

    });

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: .15

    });

    revealItems.forEach(item => {

        revealObserver.observe(item);

    });

    /* ==========================================
       NEWSLETTER FORM
    ========================================== */

    const newsletter = document.querySelector(".newsletter-form");

    if (newsletter) {

        newsletter.addEventListener("submit", function (e) {

            e.preventDefault();

            const input = this.querySelector("input");

            const email = input.value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "") {

                alert("Please enter your email.");

                input.focus();

                return;

            }

            if (!emailRegex.test(email)) {

                alert("Please enter a valid email address.");

                input.focus();

                return;

            }

            alert("Thank you for subscribing to Sutrika!");

            input.value = "";

        });

    }

    /* ==========================================
       IMAGE LAZY LOADING
    ========================================== */

    const images = document.querySelectorAll("img");

    const imageObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img = entry.target;

                img.classList.add("loaded");

                imageObserver.unobserve(img);

            }

        });

    });

    images.forEach(img => {

        imageObserver.observe(img);

    });

    /* ==========================================
       HOVER EFFECT FOR CARDS
    ========================================== */

    const cards = document.querySelectorAll(

        ".collection-card, .artisan-card, .highlight-box, .why-card, .testimonial-card"

    );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transition = ".35s";

        });

    });

});
/* ==========================================================
   PART 3
   Back To Top
   Loading Screen
   Ripple Effect
   Utility Functions
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       BACK TO TOP BUTTON
    ========================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                backToTop.style.opacity = "1";
                backToTop.style.visibility = "visible";

            } else {

                backToTop.style.opacity = "0";
                backToTop.style.visibility = "hidden";

            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

    /* ==========================================
       PAGE LOADER
    ========================================== */

    const loader = document.querySelector(".loader");

    if (loader) {

        window.addEventListener("load", () => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 600);

        });

    }

    /* ==========================================
       RIPPLE EFFECT
    ========================================== */

    const rippleButtons = document.querySelectorAll(
        ".btn-primary, .btn-secondary, .collection-btn, .artisan-btn"
    );

    rippleButtons.forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + "px";

            ripple.style.left = (e.clientX - rect.left - size / 2) + "px";

            ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

            ripple.className = "ripple";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /* ==========================================
       IMAGE FADE-IN
    ========================================== */

    const pageImages = document.querySelectorAll("img");

    pageImages.forEach(img => {

        img.style.transition = ".5s";

        img.addEventListener("load", () => {

            img.style.opacity = "1";

        });

    });

    /* ==========================================
       KEYBOARD SHORTCUT
       Press HOME to go top
    ========================================== */

    document.addEventListener("keydown", function (e) {

        if (e.key === "Home") {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        }

    });

    /* ==========================================
       PREVENT EMPTY LINKS
    ========================================== */

    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

        });

    });

    /* ==========================================
       CONSOLE MESSAGE
    ========================================== */

    console.log("%cWelcome to Sutrika", "color:#6B1E35;font-size:22px;font-weight:bold;");
    console.log("%cThreads of Tradition, Powered by Innovation", "color:#C5A24A;font-size:14px;");

});


/* ==========================================================
   SUTRIKA - CART & WISHLIST HEADER BADGES
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    function updateHeaderBadges() {

        const user = JSON.parse(localStorage.getItem("sutrikaUser"));

        /* ------------------------------------------
           FIND HEADER ICONS
        ------------------------------------------ */

        const navIcons = document.querySelectorAll(".nav-icons a");

        let wishlistLink = null;
        let cartLink = null;

        navIcons.forEach(link => {

            const href = link.getAttribute("href") || "";

            if (href.includes("wishlist")) {
                wishlistLink = link;
            }

            if (href.includes("cart")) {
                cartLink = link;
            }

        });


        /* ------------------------------------------
           CREATE / UPDATE WISHLIST BADGE
        ------------------------------------------ */

        if (wishlistLink) {

            let wishlistBadge =
                wishlistLink.querySelector(".header-badge");

            if (!wishlistBadge) {

                wishlistBadge = document.createElement("span");

                wishlistBadge.className = "header-badge";

                wishlistLink.appendChild(wishlistBadge);

            }


            let wishlistCount = 0;

            if (user && user.login && user.email) {

                const wishlistKey =
                    "wishlist_" + user.email;

                const wishlist =
                    JSON.parse(
                        localStorage.getItem(wishlistKey)
                    ) || [];

                wishlistCount = wishlist.length;

            }


            if (wishlistCount > 0) {

                wishlistBadge.textContent =
                    wishlistCount;

                wishlistBadge.classList.add("show");

            } else {

                wishlistBadge.textContent = "";

                wishlistBadge.classList.remove("show");

            }

        }


        /* ------------------------------------------
           CREATE / UPDATE CART BADGE
        ------------------------------------------ */

        if (cartLink) {

            let cartBadge =
                cartLink.querySelector(".header-badge");

            if (!cartBadge) {

                cartBadge = document.createElement("span");

                cartBadge.className = "header-badge";

                cartLink.appendChild(cartBadge);

            }


            let cartCount = 0;

            if (user && user.login && user.email) {

                const cartKey =
                    "sutrikaCart_" + user.email;

                const cart =
                    JSON.parse(
                        localStorage.getItem(cartKey)
                    ) || [];


                /* Count quantities, not just products */

                cartCount = cart.reduce(
                    (total, item) => {

                        return total +
                            Number(item.quantity || 1);

                    },
                    0
                );

            }


            if (cartCount > 0) {

                cartBadge.textContent =
                    cartCount;

                cartBadge.classList.add("show");

            } else {

                cartBadge.textContent = "";

                cartBadge.classList.remove("show");

            }

        }

    }


    /* ------------------------------------------
       INITIAL UPDATE
    ------------------------------------------ */

    updateHeaderBadges();


    /* ------------------------------------------
       UPDATE WHEN USER RETURNS TO PAGE
    ------------------------------------------ */

    window.addEventListener(
        "pageshow",
        updateHeaderBadges
    );


    /* ------------------------------------------
       ALLOW OTHER JS FILES TO REFRESH BADGES
    ------------------------------------------ */

    window.updateSutrikaHeaderBadges =
        updateHeaderBadges;

});

/* ==========================================================
   SUTRIKA - GLOBAL BACK TO TOP BUTTON
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Don't create a duplicate if the page already has one */
    if (document.querySelector(".backToTop")) {
        return;
    }

    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";
    topButton.className = "backToTop";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.title = "Back to top";

    document.body.appendChild(topButton);


    /* Show after scrolling */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topButton.classList.add("showTop");

        } else {

            topButton.classList.remove("showTop");

        }

    });


    /* Smooth scroll */

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

