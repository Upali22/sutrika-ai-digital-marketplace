/* =========================================
   SUTRIKA COLLECTION PAGE
========================================= */

document.addEventListener("DOMContentLoaded", async () => {
    // ==========================
// LOGIN CHECK
// ==========================

function isUserLoggedIn() {

    const user = JSON.parse(localStorage.getItem("sutrikaUser"));
    const token = localStorage.getItem("sutrikaToken");

    return user && user.login && token;

}

    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const categoryTabs = document.querySelectorAll(".category-tabs div");
    const searchInput = document.getElementById("searchInput");
    const productGrid = document.getElementById("productGrid");

let products = [];
async function loadProducts() {

    try {

        const response = await fetch("http://localhost:5000/api/product");

        products = await response.json();

        displayProducts(products);

    } catch (error) {

        console.error("Error loading products:", error);

        productGrid.innerHTML = `
            <h2 style="text-align:center; color:#8B0000;">
                Failed to load products.
            </h2>
        `;

    }

}
function displayProducts(productList) {

    productGrid.innerHTML = "";

    productList.forEach(product => {

        let categoryClass = "";

        let subCategory = "";

        if (product.category_name === "Women Collection") {

            categoryClass = "women";

            if (product.product_name.toLowerCase().includes("dupatta"))
                subCategory = "dupatta";
            else
                subCategory = "saree";

        }

        else if (product.category_name === "Men Collection") {

            categoryClass = "men";

            if (product.product_name.toLowerCase().includes("shirt"))
                subCategory = "shirt";
            else if (product.product_name.toLowerCase().includes("kurta"))
                subCategory = "kurta";
            else
                subCategory = "stole";

        }

        else {

            categoryClass = "craft";
            subCategory = "craft";

        }

        productGrid.innerHTML += `

        <div class="product-card ${categoryClass} ${subCategory}" data-id="${product.id}">

            <img src="${product.image}" alt="${product.product_name}">

            <div class="product-info">

                <h3>${product.product_name}</h3>

                <p>${product.category_name}</p>

                <h4>₹${Number(product.price).toLocaleString()}</h4>

                <div class="product-buttons">

                    <button>Add To Cart</button>

                    <a href="product-details.html?id=${product.id}">
                        View
                    </a>

                </div>

            </div>

        </div>

        `;

    });

}
    let currentCategory = "all";
    let currentSubCategory = "all";

    // ==========================
    // FILTER FUNCTION
    // ==========================
    function filterProducts() {

    const cards = document.querySelectorAll(".product-card");

    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    cards.forEach(card => {

        const name = card.querySelector("h3").innerText.toLowerCase();

        const categoryMatch =
            currentCategory === "all" ||
            card.classList.contains(currentCategory);

        const subCategoryMatch =
            currentSubCategory === "all" ||
            card.classList.contains(currentSubCategory);

        const searchMatch =
            name.includes(searchText);

        if (categoryMatch && subCategoryMatch && searchMatch) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


    // ==========================
    // CATEGORY BUTTONS
    // ==========================

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentCategory = button.dataset.filter;

            filterProducts();

        });

    });

    // ==========================
    // SUB CATEGORY
    // ==========================

    categoryTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            categoryTabs.forEach(item =>
                item.classList.remove("active")
            );

            tab.classList.add("active");

            currentSubCategory =
                tab.dataset.subcategory;

            filterProducts();

        });

    });

    // ==========================
    // SEARCH
    // ==========================

    if (searchInput) {

        searchInput.addEventListener("keyup", filterProducts);

    }
// ======================
// HERO BUTTON SCROLL
// ======================

const shopButton = document.querySelector(".shop-btn");

if (shopButton) {

    shopButton.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector("#products").scrollIntoView({

            behavior: "smooth"

        });

    });

}


// ======================
// LOAD PRODUCTS
// ======================

await loadProducts();


// ======================
// PRODUCT GRID EVENTS
// ======================

productGrid.addEventListener("click", function (e) {

    if (e.target.tagName === "A") {

    const card = e.target.closest(".product-card");

    localStorage.setItem(
        "selectedProduct",
        card.dataset.id
    );

}

    if (e.target.tagName === "BUTTON") {

        if (!isUserLoggedIn()) {

            alert("Please login first.");

            window.location.href = "account.html";

            return;

        }

        const user = JSON.parse(localStorage.getItem("sutrikaUser"));

        const cartKey = "sutrikaCart_" + user.email;

        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const card = e.target.closest(".product-card");

        const product = {

            id: Number(card.dataset.id),

            name: card.querySelector("h3").innerText,

            price: Number(
                card.querySelector("h4").innerText.replace("₹", "").replace(",", "")
            ),

            image: card.querySelector("img").getAttribute("src"),

            quantity: 1

        };

        const existing = cart.find(item => item.id === product.id);

        if (existing) {

            existing.quantity++;

        } else {

            cart.push(product);

        }

        localStorage.setItem(cartKey, JSON.stringify(cart));

        alert(product.name + " added to cart.");

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