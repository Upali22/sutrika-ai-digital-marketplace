document.addEventListener("DOMContentLoaded", async () => {
    /* ==========================================
   LOGIN CHECK
========================================== */

function isUserLoggedIn() {

    const user = JSON.parse(localStorage.getItem("sutrikaUser"));
    const token = localStorage.getItem("sutrikaToken");

    return user && user.login && token;

}

    /* ==========================================
       GET PRODUCT DATA
    ========================================== */
    const productId = Number(
    new URLSearchParams(window.location.search).get("id")
);

let product;
let catalog = [];

try {

    const response = await fetch("https://sutrika-ai-digital-marketplace-production.up.railway.app/api/product");

    catalog = await response.json();

    product = catalog.find(item => item.id === productId);

    if (!product) {

        document.querySelector(".product-wrapper").innerHTML =
            "<h2>Product Not Found</h2>";

        return;

    }

} catch (error) {

    console.error(error);

    document.querySelector(".product-wrapper").innerHTML =
        "<h2>Unable to load product.</h2>";

    return;

}


    /* ==========================================
       SELECT ELEMENTS
    ========================================== */

    const productImage = document.querySelector(".product-image img");

    const thumbnails = document.querySelectorAll(".thumb");

    const category = document.querySelector(".product-location");

    const title = document.querySelector(".product-content h1");

    const price = document.querySelector(".product-content h2");

    const description = document.querySelectorAll(".product-description");

    const quantityInput = document.querySelector(".quantity-box input");

    const minusBtn = document.querySelector(".qty-minus");

    const plusBtn = document.querySelector(".qty-plus");

    /* ==========================================
       LOAD PRODUCT
    ========================================== */

    productImage.src = product.image;

    productImage.alt = product.name;

    category.textContent = product.category_name;

    title.textContent = product.product_name;

    price.textContent = `?${product.price}`;

    description.forEach(text => {

        text.textContent = product.description;

    });

    /* ==========================================
       THUMBNAILS
    ========================================== */

    thumbnails.forEach((thumb) => {

        thumb.src = product.image;

        thumb.addEventListener("click", () => {

            productImage.src = thumb.src;

            thumbnails.forEach(img => img.classList.remove("active"));

            thumb.classList.add("active");

        });

    });

    /* ==========================================
       SPECIFICATIONS
    ========================================== */

    const cells = document.querySelectorAll(".specification-table td");

if (cells.length >= 5) {

    cells[0].textContent = product.category_name;
    cells[1].textContent = "Premium Handloom";
    cells[2].textContent = "Traditional Odisha Craft";
    cells[3].textContent = "Odisha, India";
    cells[4].textContent = "Dry Clean Recommended";

}

    /* ==========================================
       ARTISAN
    ========================================== */

    const artisanName = document.querySelector(".artisan-details h3");

    const artisanText = document.querySelector(".artisan-details p");

    if (artisanName)
        artisanName.textContent = product.artisan_name;

    if (artisanText)
        artisanText.textContent =
        `Every ${product.product_name} is handcrafted by ${product.artisan_name}, preserving Odisha's rich artistic heritage and generations of traditional craftsmanship.`;

    /* ==========================================
       QUANTITY
    ========================================== */

    minusBtn?.addEventListener("click", () => {

        let qty = Number(quantityInput.value);

        if (qty > 1) {

            quantityInput.value = qty - 1;

        }

    });

    plusBtn?.addEventListener("click", () => {

        let qty = Number(quantityInput.value);

        if (qty < 10) {

            quantityInput.value = qty + 1;

        }

    });
        /* ==========================================
       BUTTONS
    ========================================== */

    const addToCartButton = document.querySelector(".cart-btn");
    const buyNowButton = document.querySelector(".buy-btn");
    const wishlistButton = document.querySelector(".wishlist-btn");

    /* ==========================================
       ADD TO CART
    ========================================== */

    addToCartButton?.addEventListener("click", () => {
        if (!isUserLoggedIn()) {

    alert("Please login to add products to your cart.");

    window.location.href = "account.html";

    return;

}

        const user = JSON.parse(localStorage.getItem("sutrikaUser"));

const cartKey = "sutrikaCart_" + user.email;

const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const quantity = Number(quantityInput.value);

        const existing = cart.find(item => item.id === product.id);

        if (existing) {

            existing.quantity += quantity;

        } else {

            cart.push({

                id: product.id,
                name: product.product_name,
                price: product.price,
                image: product.image,
                quantity: quantity

            });

        }

        localStorage.setItem(
    cartKey,
    JSON.stringify(cart)
);

        addToCartButton.innerHTML =
            '<i class="fa-solid fa-check"></i> Added';

        setTimeout(() => {

            addToCartButton.innerHTML =
                '<i class="fa-solid fa-cart-shopping"></i> Add to Cart';

        }, 1500);

    });

    /* ==========================================
       BUY NOW
    ========================================== */

    buyNowButton?.addEventListener("click", () => {
        if (!isUserLoggedIn()) {

    alert("Please login to continue.");

    window.location.href = "account.html";

    return;

}

        const quantity = Number(quantityInput.value);

        const user = JSON.parse(localStorage.getItem("sutrikaUser"));

const cartKey = "sutrikaCart_" + user.email;

localStorage.setItem(cartKey, JSON.stringify([{

            id: product.id,
            name: product.product_name,
            price: product.price,
            image: product.image,
            quantity: quantity

        }]));

        window.location.href = "cart.html";

    });

    /* ==========================================
       WISHLIST
========================================== */

wishlistButton?.addEventListener("click", () => {


    const user = JSON.parse(localStorage.getItem("sutrikaUser"));


    const token = localStorage.getItem("sutrikaToken");


    if(!user || !user.login || !token){

        alert("Please login to add wishlist ??");

        window.location.href="account.html";

        return;

    }


    const wishlistKey = "wishlist_" + user.email;


    let wishlist =
    JSON.parse(localStorage.getItem(wishlistKey)) || [];


    const exists =
    wishlist.find(item => item.id === product.id);



    if(!exists){


        wishlist.push(product);


        localStorage.setItem(
            wishlistKey,
            JSON.stringify(wishlist)
        );


        alert("Added to Wishlist ??");


    }
    else{


        alert("Already in Wishlist ??");


    }


});

    /* ==========================================
       RELATED PRODUCTS
    ========================================== */

    const relatedGrid = document.querySelector(".related-grid");

    if (relatedGrid) {

        relatedGrid.innerHTML = "";

        catalog
            .filter(item => item.id !== product.id)
            .slice(0, 3)
            .forEach(item => {

                const card = document.createElement("div");

                card.className = "product-card";

                card.innerHTML = `

                    <img src="${item.image}" alt="${item.product_name}">

                    <div class="product-info">
                        <p>${item.category_name}</p>

                        <h3>${item.product_name}</h3>

                        <h4>?${Number(item.price).toLocaleString()}</h4>


                        <a href="product-details.html?id=${item.id}">
                            View Product
                        </a>

                    </div>

                `;

                relatedGrid.appendChild(card);

            });

    }

    /* ==========================================
       SCROLL ANIMATION
    ========================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(

        ".highlight-card, .shipping-card, .review-card, .product-card"

    ).forEach(card => {

        card.style.opacity = "0";

        card.style.transform = "translateY(40px)";

        card.style.transition = ".6s ease";

        observer.observe(card);

    });

});

/* ==========================================================
   SUTRIKA - BACK TO TOP BUTTON
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.createElement("button");

    backToTop.className = "sutrika-back-to-top";
    backToTop.innerHTML = "?";

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
