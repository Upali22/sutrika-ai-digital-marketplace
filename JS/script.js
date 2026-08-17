/* =========================================
   SUTRIKA WEBSITE JAVASCRIPT
   PART 1
   Basic Functions + Collection Filter + Search
========================================= */



// =========================================
// ACTIVE NAVIGATION LINK
// =========================================

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    const linkPage = link.getAttribute("href").split("/").pop();

    if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
    ) {
        link.style.color = "#C89B3C";
    }

});



// =========================================
// BUTTON CLICK ANIMATION
// =========================================

const buttons = document.querySelectorAll(
    "button, .btn-primary, .btn-outline"
);

buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.95)";

        setTimeout(() => {

            button.style.transform = "";

        }, 150);

    });

});




// =========================================
// COLLECTION FILTER + SEARCH + SUBCATEGORY
// =========================================

const filterButtons = document.querySelectorAll(".filter-buttons button");
const categoryTabs = document.querySelectorAll(".category-tabs div");
const products = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("searchInput");

let currentCategory = "all";
let currentSubCategory = "all";

function updateProducts() {

    const searchValue = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    products.forEach(product => {

        let categoryMatch = false;
        let subCategoryMatch = true;
        let searchMatch = true;

        // ------------------------
        // CATEGORY
        // ------------------------

        switch (currentCategory) {

            case "all":
                categoryMatch = true;
                break;

            case "women":
                categoryMatch = product.classList.contains("women");
                break;

            case "men":
                categoryMatch = product.classList.contains("men");
                break;

            case "handicrafts":
                categoryMatch = product.classList.contains("craft");
                break;

            default:
                categoryMatch = true;

        }

        // ------------------------
        // SUBCATEGORY
        // ------------------------

        if (currentSubCategory !== "all") {

            subCategoryMatch =
                product.classList.contains(currentSubCategory);

        }

        // ------------------------
        // SEARCH
        // ------------------------

        if (searchValue !== "") {

            const productName =
                product.querySelector("h3")?.innerText.toLowerCase() || "";

            searchMatch =
                productName.includes(searchValue);

        }

        // ------------------------
        // FINAL RESULT
        // ------------------------

        if (
            categoryMatch &&
            subCategoryMatch &&
            searchMatch
        ) {

            product.style.display = "";

        }

        else {

            product.style.display = "none";

        }

    });

}




// =========================================
// CATEGORY BUTTONS
// =========================================

if (filterButtons.length > 0) {

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            this.classList.add("active");

            currentCategory =
                this.dataset.filter || "all";

            updateProducts();

        });

    });

}




// =========================================
// SUBCATEGORY TABS
// =========================================

if (categoryTabs.length > 0) {

    categoryTabs.forEach(tab => {

        tab.addEventListener("click", function () {

            categoryTabs.forEach(item => {

                item.classList.remove("active");

            });

            this.classList.add("active");

            currentSubCategory =
                this.dataset.subcategory || "all";

            updateProducts();

        });

    });

}




// =========================================
// PRODUCT SEARCH
// =========================================

if (searchInput) {

    searchInput.addEventListener("input", updateProducts);

}

/* =========================================
   SUTRIKA PRODUCT DETAILS SYSTEM
   PART 2
========================================= */


const productDatabase = {


    "sambalpuri-ikat": {

        image: "../ASSETS/IMAGES/products/sambalpuri-ikat-saree.jpg",
        name: "Sambalpuri Ikat Saree",
        category: "Handloom Saree • Sambalpur",
        price: "₹4,999",
        description:
        "A traditional Sambalpuri Ikat saree handcrafted by skilled Odisha weavers. This heritage textile represents the cultural beauty of Odisha handloom."

    },


    "bomkai-silk": {

        image: "../ASSETS/IMAGES/products/bomkai-saree.jpg",
        name: "Bomkai Silk Saree",
        category: "Traditional Silk Handloom",
        price: "₹6,499",
        description:
        "A premium Bomkai silk saree representing Odisha's rich weaving tradition and artisan craftsmanship."

    },


    "khandua-silk": {

        image: "../ASSETS/IMAGES/products/khandua-silk.jpg",
        name: "Khandua Silk Saree",
        category: "Temple Inspired Textile",
        price: "₹7,499",
        description:
        "A traditional Khandua silk saree inspired by Odisha temple culture and heritage weaving."

    },


    "pasapalli": {

        image: "../ASSETS/IMAGES/products/pasapalli.jpg",
        name: "Pasapalli Saree",
        category: "Ikat Pattern Handloom",
        price: "₹5,499",
        description:
        "A beautiful Pasapalli saree featuring the iconic Odisha ikat pattern."

    },


    "kotpad": {

        image: "../ASSETS/IMAGES/products/kotpad.jpg",
        name: "Kotpad Handloom Saree",
        category: "Natural Dye Textile",
        price: "₹4,299",
        description:
        "A traditional Kotpad textile created using natural dyes by tribal artisans of Odisha."

    },


    "sambalpuri-dupatta": {

        image: "../ASSETS/IMAGES/products/sambalpuri-dupatta.jpg",
        name: "Sambalpuri Cotton Dupatta",
        category: "Handwoven Cotton Textile",
        price: "₹1,499",
        description:
        "A lightweight Sambalpuri cotton dupatta showcasing Odisha weaving tradition."

    },


    "ikat-stole": {

        image: "../ASSETS/IMAGES/products/ikat-stole.jpg",
        name: "Ikat Silk Stole",
        category: "Traditional Ikat Pattern",
        price: "₹2,199",
        description:
        "A premium ikat silk stole handcrafted with traditional Odisha textile techniques."

    },


    "berhampuri-patta": {

        image: "../ASSETS/IMAGES/products/berhampuri-patta.jpg",
        name: "Berhampuri Patta Saree",
        category: "Heritage Silk Weave",
        price: "₹5,799",
        description:
        "A heritage Berhampuri Patta saree known for its classic silk texture and traditional Odisha craftsmanship."

    },


    "sambalpuri-shirt": {

        image: "../ASSETS/IMAGES/products/sambalpuri-shirt.jpg",
        name: "Sambalpuri Handloom Shirt",
        category: "Men's Traditional Wear",
        price: "₹2,999",
        description:
        "A premium Sambalpuri handloom shirt made for modern men with traditional Odisha charm."

    },


    "odisha-kurta": {

        image: "../ASSETS/IMAGES/products/odisha-kurta.jpg",
        name: "Traditional Cotton Kurta",
        category: "Odisha Handloom Fashion",
        price: "₹2,499",
        description:
        "A lightweight cotton kurta reflecting the comfort and style of Odisha handloom traditions."

    },


    "mens-ikat-stole": {

        image: "../ASSETS/IMAGES/products/mens-ikat-stole.jpg",
        name: "Men's Ikat Stole",
        category: "Premium Handloom Accessory",
        price: "₹1,899",
        description:
        "A refined men's ikat stole designed for elegance and traditional craftsmanship."

    },


    "pattachitra": {

        image: "../ASSETS/IMAGES/crafts/pattachitra.jpg",
        name: "Pattachitra Painting",
        category: "Traditional Odisha Art",
        price: "₹2,499",
        description:
        "A traditional Pattachitra artwork created by skilled Odisha artists using heritage painting techniques."

    },


    "dhokra": {

        image: "../ASSETS/IMAGES/crafts/dhokra.jpg",
        name: "Dhokra Metal Craft",
        category: "Traditional Lost Wax Art",
        price: "₹3,499",
        description:
        "A unique handcrafted Dhokra metal artwork created using the ancient lost wax technique."

    },


    "palm-leaf": {

        image: "../ASSETS/IMAGES/crafts/palm-leaf.jpg",
        name: "Palm Leaf Engraving",
        category: "Ancient Odisha Manuscript Art",
        price: "₹1,999",
        description:
        "An intricate palm leaf engraving preserving the artistic heritage of Odisha."

    },


    "stone-carving": {

        image: "../ASSETS/IMAGES/crafts/stone-carving.jpg",
        name: "Stone Carving Artwork",
        category: "Odisha Temple Inspired Craft",
        price: "₹4,999",
        description:
        "A beautiful stone carving inspired by the timeless temple art of Odisha."

    },


    "terracotta": {

        image: "../ASSETS/IMAGES/crafts/terracotta.jpg",
        name: "Terracotta Craft",
        category: "Traditional Clay Artwork",
        price: "₹1,799",
        description:
        "A handcrafted terracotta artwork celebrating the earthy elegance of Odisha craftsmanship."

    }


};






// =========================================
// LOAD PRODUCT DETAILS
// =========================================


const urlParams = new URLSearchParams(
    window.location.search
);


const productId = urlParams.get("id");



const productPageImage =
document.querySelector(".product-image img");



if(productId && productDatabase[productId] && productPageImage){


    const product =
    productDatabase[productId];



    document.querySelector(
        ".product-image img"
    ).src = product.image;



    document.querySelector(
        ".product-content h1"
    ).innerText = product.name;



    document.querySelector(
        ".product-location"
    ).innerText = product.category;



    document.querySelector(
        ".product-content h2"
    ).innerText = product.price;



    document.querySelector(
        ".product-description"
    ).innerText = product.description;



}
/* =========================================
   YOU MAY ALSO LIKE SYSTEM
========================================= */


const relatedContainer =
document.querySelector(".related-grid");


if(relatedContainer && productId && productDatabase){


    const relatedProducts =
    Object.keys(productDatabase)
    .filter(id => id !== productId)
    .slice(0,3);



    relatedContainer.innerHTML = "";



    relatedProducts.forEach(id => {


        const product =
        productDatabase[id];



        const card =
        document.createElement("div");



        card.className =
        "related-card";



        card.innerHTML = `

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.price}</p>

            <a href="product-details.html?id=${id}">
                View Product
            </a>

        `;



        relatedContainer.appendChild(card);


    });


}

/* =========================================
   SUTRIKA WEBSITE JAVASCRIPT
   PART 3
   Personalisation + AI Guide + Cart
========================================= */





// =========================================
// PERSONALISATION DESIGN ASSISTANT
// =========================================


const customButton =
document.querySelector(".custom-btn");



if(customButton){


    customButton.addEventListener("click",()=>{



        const selects =
        document.querySelectorAll(
            ".custom-field select"
        );



        if(selects.length >= 3){


            const fabric =
            selects[0].value;


            const colour =
            selects[1].value;


            const pattern =
            selects[2].value;




            alert(

                "✨ Your Sutrika Custom Design Request Created!\n\n" +

                "Fabric: " + fabric +

                "\nColour: " + colour +

                "\nPattern: " + pattern +

                "\n\nOur artisan team will create your heritage design."

            );



        }


    });


}







// =========================================
// SUTRIKA AI GUIDE CHAT SYSTEM
// =========================================


const chatButton =
document.querySelector(".chat-input button");


const chatInput =
document.querySelector(".chat-input input");


const chatWindow =
document.querySelector(".chat-window");




if(chatButton && chatInput && chatWindow){



    chatButton.addEventListener("click",()=>{



        const question =
        chatInput.value.toLowerCase();



        if(question.trim()===""){


            alert(
                "Please ask something about Odisha heritage."
            );


            return;


        }




        let reply =
        "Thank you for asking. Explore Odisha's beautiful traditions with Sutrika.";





        if(question.includes("saree")){


            reply =
            "Odisha is famous for Sambalpuri Ikat, Bomkai Silk, Khandua Silk and Pasapalli sarees.";


        }



        else if(question.includes("craft")){


            reply =
            "Odisha's famous crafts include Pattachitra, Dhokra, Palm Leaf Engraving, Stone Carving and Terracotta.";


        }



        else if(question.includes("artisan")){


            reply =
            "Sutrika connects customers with skilled Odisha artisans and preserves their traditional stories.";


        }



        else if(question.includes("wedding")){


            reply =
            "For weddings, Khandua Silk and Sambalpuri Silk sarees create a royal traditional appearance.";


        }




        const message =
        document.createElement("div");



        message.className =
        "ai-message";



        message.innerText =
        reply;



        chatWindow.appendChild(message);



        chatInput.value = "";



        chatWindow.scrollTop =
        chatWindow.scrollHeight;



    });



}







// =========================================
// ADD TO CART BASIC SYSTEM
// =========================================


const cartButtons =
document.querySelectorAll(
    ".cart-btn, .product-buttons button"
);



cartButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        alert(
            "🛍 Product added to Sutrika Cart!"
        );


    });


});
/* =========================================
   SUTRIKA REAL CART SYSTEM
   PART 4
========================================= */



// =========================================
// ADD PRODUCT TO CART
// =========================================


const addCartButtons =
document.querySelectorAll(".cart-btn");



addCartButtons.forEach(button => {


    button.addEventListener("click",()=>{


        const card =
        button.closest(".product-card");



        if(card){


            const product = {


                id:
                card.getAttribute("data-id"),


                name:
                card.querySelector("h3").innerText,


                price:
                card.querySelector(".price").innerText,


                image:
                card.querySelector("img").src,


                quantity:1


            };



            addToCart(product);



            alert(
                "🛍 Added to Sutrika Cart!"
            );


        }



    });



});







// =========================================
// SAVE CART DATA
// =========================================


function addToCart(product){



    let cart =
    JSON.parse(
        localStorage.getItem("sutrikaCart")
    ) || [];



    const existingProduct =
    cart.find(item =>
        item.id === product.id
    );



    if(existingProduct){


        existingProduct.quantity += 1;


    }

    else{


        cart.push(product);


    }




    localStorage.setItem(
        "sutrikaCart",
        JSON.stringify(cart)
    );



}








// =========================================
// DISPLAY CART ITEMS
// =========================================


const cartContainer =
document.querySelector(".cart-items");



if(cartContainer){


    let cart =
    JSON.parse(
        localStorage.getItem("sutrikaCart")
    ) || [];




    if(cart.length === 0){


        cartContainer.innerHTML =
        "<h3>Your Sutrika Cart is Empty</h3>";


    }



    else{



        cartContainer.innerHTML = "";



        cart.forEach(item=>{


            const cartItem =
            document.createElement("div");



            cartItem.className =
            "cart-product";



            cartItem.innerHTML = `

                <img src="${item.image}">

                <div>

                <h3>${item.name}</h3>

                <p>${item.price}</p>

                <p>
                Quantity: ${item.quantity}
                </p>

                </div>

            `;



            cartContainer.appendChild(cartItem);



        });



    }



}








// =========================================
// CART COUNT
// =========================================


const cartCount =
document.querySelector(".cart-count");



if(cartCount){



    let cart =
    JSON.parse(
        localStorage.getItem("sutrikaCart")
    ) || [];



    let total = 0;



    cart.forEach(item=>{


        total += item.quantity;


    });



    cartCount.innerText = total;



}
/* =========================================
   SUTRIKA CART SYSTEM - PART 5
   Quantity + Remove + Total Update
========================================= */



function loadCartPage(){


    const cartContainer =
    document.getElementById("cartItems");


    const subtotal =
    document.getElementById("cartSubtotal");


    const total =
    document.getElementById("cartTotal");



    if(!cartContainer)
    return;



    let cart =
    JSON.parse(localStorage.getItem("sutrikaCart")) || [];



    cartContainer.innerHTML = "";



    let grandTotal = 0;



    if(cart.length === 0){


        cartContainer.innerHTML = `

        <h3>
        Your Sutrika Cart is Empty 🛒
        </h3>

        `;


        if(subtotal)
        subtotal.innerText="₹0";


        if(total)
        total.innerText="₹0";


        return;

    }





    cart.forEach((item,index)=>{



        let price =
        Number(
            item.price
            .replace("₹","")
            .replace(",","")
        );



        grandTotal +=
        price * item.quantity;





        const cartItem =
        document.createElement("div");



        cartItem.className =
        "cart-product";



        cartItem.innerHTML = `


        <img src="${item.image}">


        <div>


        <h3>
        ${item.name}
        </h3>


        <p>
        ${item.price}
        </p>



        <div class="quantity">


        <button onclick="decreaseCart(${index})">
        -
        </button>



        <span>
        ${item.quantity}
        </span>



        <button onclick="increaseCart(${index})">
        +
        </button>


        </div>




        <button onclick="removeCart(${index})">

        ❌ Remove

        </button>



        </div>


        `;



        cartContainer.appendChild(cartItem);



    });




    if(subtotal)
    subtotal.innerText =
    "₹" + grandTotal.toLocaleString();



    if(total)
    total.innerText =
    "₹" + grandTotal.toLocaleString();



}







function increaseCart(index){


    let cart =
    JSON.parse(localStorage.getItem("sutrikaCart")) || [];



    cart[index].quantity++;



    localStorage.setItem(
        "sutrikaCart",
        JSON.stringify(cart)
    );



    loadCartPage();


}







function decreaseCart(index){


    let cart =
    JSON.parse(localStorage.getItem("sutrikaCart")) || [];



    if(cart[index].quantity > 1){


        cart[index].quantity--;


    }



    localStorage.setItem(
        "sutrikaCart",
        JSON.stringify(cart)
    );



    loadCartPage();


}







function removeCart(index){


    let cart =
    JSON.parse(localStorage.getItem("sutrikaCart")) || [];



    cart.splice(index,1);



    localStorage.setItem(
        "sutrikaCart",
        JSON.stringify(cart)
    );



    loadCartPage();


}







loadCartPage();
/* =========================================
   SUTRIKA CHECKOUT SYSTEM - PART 6
========================================= */



const checkoutButton =
document.querySelector(
    ".checkout-box button"
);



if(checkoutButton){


    checkoutButton.addEventListener("click",()=>{



        const name =
        document.querySelector(
            ".checkout-box input:nth-of-type(1)"
        ).value;



        const address =
        document.querySelector(
            ".checkout-box input:nth-of-type(2)"
        ).value;



        const phone =
        document.querySelector(
            ".checkout-box input:nth-of-type(3)"
        ).value;





        if(
            name === "" ||
            address === "" ||
            phone === ""
        ){


            alert(
                "Please fill all delivery details."
            );


            return;


        }





        let cart =
        JSON.parse(
            localStorage.getItem("sutrikaCart")
        ) || [];




        if(cart.length === 0){


            alert(
                "Your cart is empty!"
            );


            return;


        }





        alert(

        "🎉 Order Placed Successfully!\n\n" +

        "Thank you " + name +

        "\n\nYour Sutrika heritage products will be delivered soon."

        );




        localStorage.removeItem(
            "sutrikaCart"
        );



        window.location.reload();



    });


}
/* =========================================
   SUTRIKA WISHLIST SYSTEM - PART 7
   Add + Save + Display Wishlist
========================================= */



// =========================================
// ADD PRODUCT TO WISHLIST
// =========================================


const wishlistButtons =
document.querySelectorAll(".wishlist-btn");



wishlistButtons.forEach(button => {


    button.addEventListener("click",()=>{


        const productName =
        document.querySelector(
            ".product-content h1"
        )?.innerText;



        const productPrice =
        document.querySelector(
            ".product-content h2"
        )?.innerText;



        const productImage =
        document.querySelector(
            ".product-image img"
        )?.src;





        const wishlistProduct = {


            name: productName,

            price: productPrice,

            image: productImage


        };





        let wishlist =
        JSON.parse(
            localStorage.getItem("sutrikaWishlist")
        ) || [];





        const alreadyAdded =
        wishlist.some(
            item =>
            item.name === productName
        );





        if(alreadyAdded){


            alert(
                "❤️ Product already in Wishlist"
            );


            return;


        }





        wishlist.push(wishlistProduct);





        localStorage.setItem(

            "sutrikaWishlist",

            JSON.stringify(wishlist)

        );





        alert(
            "❤️ Added to Sutrika Wishlist!"
        );



    });


});








// =========================================
// DISPLAY WISHLIST PAGE
// =========================================


function loadWishlist(){



    const wishlistContainer =
    document.getElementById(
        "wishlistItems"
    );



    if(!wishlistContainer)
    return;




    let wishlist =

    JSON.parse(
        localStorage.getItem("sutrikaWishlist")
    ) || [];





    wishlistContainer.innerHTML = "";





    if(wishlist.length === 0){


        wishlistContainer.innerHTML = `

        <h3>
        Your Wishlist is Empty ❤️
        </h3>

        `;


        return;


    }





    wishlist.forEach((item,index)=>{



        const card =
        document.createElement("div");



        card.className =
        "wishlist-card";





        card.innerHTML = `


        <img src="${item.image}">


        <h3>
        ${item.name}
        </h3>


        <p>
        ${item.price}
        </p>



        <button onclick="removeWishlist(${index})">

        ❌ Remove

        </button>


        `;




        wishlistContainer.appendChild(card);



    });





}









// =========================================
// REMOVE FROM WISHLIST
// =========================================



function removeWishlist(index){



    let wishlist =

    JSON.parse(
        localStorage.getItem("sutrikaWishlist")
    ) || [];




    wishlist.splice(index,1);




    localStorage.setItem(

        "sutrikaWishlist",

        JSON.stringify(wishlist)

    );




    loadWishlist();



}







loadWishlist();

/* =========================================
   SUTRIKA USER ACCOUNT SYSTEM - PART 8
   Register + Login
========================================= */



// =========================================
// REGISTER SYSTEM
// =========================================


const registerButton =
document.querySelector(".register-btn");



if(registerButton){


    registerButton.addEventListener("click",()=>{


        const name =
        document.querySelector("#registerName")?.value;


        const email =
        document.querySelector("#registerEmail")?.value;


        const password =
        document.querySelector("#registerPassword")?.value;



        if(
            name === "" ||
            email === "" ||
            password === ""
        ){


            alert(
                "Please fill all registration details."
            );


            return;

        }



        const user = {


            name:name,

            email:email,

            password:password


        };



        localStorage.setItem(

            "sutrikaUser",

            JSON.stringify(user)

        );



        alert(
            "✨ Registration Successful!"
        );



        window.location.reload();



    });


}








// =========================================
// LOGIN SYSTEM
// =========================================


const loginButton =
document.querySelector(".login-btn");



if(loginButton){


    loginButton.addEventListener("click",()=>{


        const email =
        document.querySelector("#loginEmail")?.value;



        const password =
        document.querySelector("#loginPassword")?.value;



        const savedUser =
        JSON.parse(
            localStorage.getItem("sutrikaUser")
        );




        if(!savedUser){


            alert(
                "No account found. Please register first."
            );


            return;


        }





        if(
            email === savedUser.email &&
            password === savedUser.password
        ){


            localStorage.setItem(

                "sutrikaLogin",

                "true"

            );



            alert(

                "Welcome back, " +
                savedUser.name +
                " ✨"

            );



            window.location.reload();



        }


        else{


            alert(
                "Invalid email or password."
            );


        }



    });


}








// =========================================
// DISPLAY USER NAME
// =========================================


const userNameDisplay =
document.querySelector(".user-name");



const loggedUser =
JSON.parse(
    localStorage.getItem("sutrikaUser")
);

if(
    userNameDisplay &&
    loggedUser
){

    userNameDisplay.innerText =
    loggedUser.name;

}

// =========================================
// LOGOUT SYSTEM
// =========================================


const logoutButton =
document.querySelector(".logout-btn");



if(logoutButton){


    logoutButton.addEventListener("click",()=>{


        localStorage.removeItem(
            "sutrikaLogin"
        );



        alert(
            "You have been logged out."
        );



        window.location.reload();



    });


}
/* =========================================
   HERO IMAGE SLIDER
========================================= */

const hero = document.querySelector(".hero");

if(hero){

    const heroImages=[

        "../ASSETS/IMAGES/hero/hero1.png",
        "../ASSETS/IMAGES/hero/hero2.png",
        "../ASSETS/IMAGES/hero/hero3.png",
        "../ASSETS/IMAGES/hero/hero4.png",
        "../ASSETS/IMAGES/hero/hero5.png"

    ];

    let currentHero=0;

    setInterval(()=>{

        currentHero++;

        if(currentHero>=heroImages.length){

            currentHero=0;

        }

        hero.style.backgroundImage=

        `linear-gradient(rgba(74,16,36,0.60),
        rgba(74,16,36,0.75)),
        url('${heroImages[currentHero]}')`;

    },5000);

}
