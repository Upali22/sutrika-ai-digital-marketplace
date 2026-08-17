document.addEventListener("DOMContentLoaded", () => {


const user = JSON.parse(localStorage.getItem("sutrikaUser"));


if(!user || !user.login){

    alert("Please login to view your wishlist.");

    window.location.href="account.html";

    return;

}


const wishlistContainer = document.getElementById("wishlistItems");


const wishlistKey = "wishlist_" + user.email;


let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

   function saveWishlist(){

    localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
    );

    /* Update header badge immediately */
    if (window.updateSutrikaHeaderBadges) {
        window.updateSutrikaHeaderBadges();
    }

}

    function loadWishlist(){

        wishlistContainer.innerHTML = "";

            /* Update Wishlist Hero */

            updateWishlistCount();


        if(wishlist.length === 0){

            wishlistContainer.innerHTML = `

                <div class="empty-wishlist">

                    <h2>Your Wishlist is Empty ❤️</h2>

                    <p>
                    Explore our handcrafted Odisha collections.
                    </p>

                    <a href="collection.html" class="shop-btn">
                        Continue Shopping
                    </a>

                </div>

            `;

            return;
        }



        wishlist.forEach((product,index)=>{


            wishlistContainer.innerHTML += `


            <div class="wishlist-card">


                <img 
                src="${product.image || 'images/default.jpg'}"
                alt="${product.name || product.product_name || "Odisha Handcraft"}"
                >



                <div class="wishlist-info">

                    <span>${product.category || product.category_name || "Odisha Craft"}</span>

                    <h3>${product.name || product.product_name || "Heritage Craft"}</h3>

                    <h2>
                        ₹${product.price}
                    </h2>

                    <p>
                    ${product.description || 
                    "Authentic handcrafted creation from Odisha artisans."
                    }
                    </p>



                    <div class="wishlist-buttons">


                        <button 
                        class="cart-btn"
                        onclick="moveToCart(${index})">

                        🛒 Add to Cart

                        </button>



                        <button 
                        class="remove-btn"
                        onclick="removeItem(${index})">

                        ✕ Remove

                        </button>


                    </div>


                </div>


            </div>


            `;


        });


    }



    // REMOVE FROM WISHLIST

    window.removeItem = function(index){


        wishlist.splice(index,1);


        saveWishlist();


        loadWishlist();


    }





    // MOVE TO CART

    window.moveToCart = function(index){


        const cartKey = "sutrikaCart_" + user.email;

let cart =
JSON.parse(localStorage.getItem(cartKey)) || [];



        const product = wishlist[index];



        const existing =
        cart.find(item=>item.name === product.name);



        if(existing){


            existing.quantity += 1;


        }

        else{


            cart.push({

                ...product,

                quantity:1

            });


        }

        localStorage.setItem(
    cartKey,
    JSON.stringify(cart)
);



        // remove from wishlist after adding

        wishlist.splice(index,1);


        saveWishlist();


        loadWishlist();



        showMessage(
            "Added to Cart ❤️"
        );


    }




    // BEAUTIFUL TOAST MESSAGE

    function showMessage(message){


        const toast =
        document.createElement("div");


        toast.className="wishlist-toast";


        toast.innerHTML=message;


        document.body.appendChild(toast);



        setTimeout(()=>{

            toast.remove();

        },2500);


    }

function updateWishlistCount(){

    /* =========================================
       WISHLIST HERO COUNT
    ========================================= */

    const count =
        document.getElementById("wishlistCount");

    const heroCount =
        document.getElementById("wishlistHeroCount");


    if(count){

        count.innerHTML = wishlist.length;

    }


    if(heroCount){

        heroCount.innerHTML = wishlist.length;

    }


    /* =========================================
       WISHLIST TOTAL VALUE
    ========================================= */

    const heroValue =
        document.getElementById("wishlistHeroValue");


    if(heroValue){

        const totalValue = wishlist.reduce(
            (total, product) => {

                let price = product.price;

                /* Remove ₹, commas and other symbols */

                if(typeof price === "string"){

                    price =
                        price.replace(
                            /[^0-9.]/g,
                            ""
                        );

                }

                price = parseFloat(price) || 0;

                return total + price;

            },
            0
        );


        heroValue.innerHTML =
            "₹" +
            totalValue.toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                }
            );

    }

}


    updateWishlistCount();


    loadWishlist();

});


