document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("sutrikaUser"));

if(!user || !user.login){

    alert("Please login to view your cart.");

    window.location.href="account.html";

    return;

}


const cartItemsContainer = document.getElementById("cartItems");

const subtotalElement = document.getElementById("cartSubtotal");

const totalElement = document.getElementById("cartTotal");


// CART HERO DASHBOARD
const cartHeroCount = document.getElementById("cartHeroCount");
const cartHeroValue = document.getElementById("cartHeroValue");


const cartKey = "sutrikaCart_" + user.email;

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];



// DISPLAY CART

function displayCart(){


cartItemsContainer.innerHTML = "";

    // UPDATE CART HERO
    if (cartHeroCount) {
        const totalItems = cart.reduce(
            (sum, item) => sum + Number(item.quantity),
            0
        );

        cartHeroCount.innerText = totalItems;
    }


if(cart.length === 0){


cartItemsContainer.innerHTML = `

<div class="empty-cart">

<h3>Your cart is empty</h3>

<p>Add some beautiful Odisha products.</p>

<a href="collection.html">
Continue Shopping
</a>

</div>

`;



subtotalElement.innerText = "₹0";

totalElement.innerText = "₹0";

if (cartHeroCount) {
    cartHeroCount.innerText = "0";
}

if (cartHeroValue) {
    cartHeroValue.innerText = "₹0";
}

return;

}




let subtotal = 0;



cart.forEach((product,index)=>{


const price = Number(
    String(product.price)
        .replace("₹", "")
        .replace(/,/g, "")
);

subtotal += price * product.quantity;





cartItemsContainer.innerHTML += `


<div class="cart-product">


<img src="${product.image}" alt="${product.name}">



<div class="cart-product-info">


<h3>
${product.name}
</h3>


<p>
    ₹${Number(product.price).toFixed(2)}
</p>



<div class="quantity-control">


<button onclick="changeQuantity(${index}, -1)">
-
</button>



<span>
${product.quantity}
</span>



<button onclick="changeQuantity(${index}, 1)">
+
</button>


</div>



<button class="remove-btn"
onclick="removeProduct(${index})">

Remove

</button>



</div>


</div>


`;



});



subtotalElement.innerText =
"₹" + subtotal;



totalElement.innerText =
"₹" + subtotal;


// UPDATE CART HERO VALUE
if (cartHeroValue) {
    cartHeroValue.innerText =
        "₹" + subtotal.toLocaleString("en-IN");
}



}



// CHANGE QUANTITY

window.changeQuantity = function(index, change){


if(cart[index].quantity + change > 0){

cart[index].quantity += change;

}


saveCart();

};




// REMOVE PRODUCT

window.removeProduct = function(index){


cart.splice(index,1);


saveCart();


};




// SAVE CART
function saveCart(){

    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );

    displayCart();

    /* Update header badge immediately */
    if (window.updateSutrikaHeaderBadges) {
        window.updateSutrikaHeaderBadges();
    }

}




// PLACE ORDER

const checkoutButton =
document.querySelector(".checkout-box button");

if (checkoutButton) {

    checkoutButton.addEventListener("click", async () => {

        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        const fullName =
            document.querySelector('input[placeholder="Full Name"]').value;

        const address =
            document.querySelector('input[placeholder="Address"]').value;

        const phone =
            document.querySelector('input[placeholder="Phone Number"]').value;

        if (!fullName || !address || !phone) {
            alert("Please fill all delivery details.");
            return;
        }

        const orderItems = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: Number(item.price)
        }));

        try {
            console.log("USER =", user);
console.log("USER ID =", user.id);
console.log("ORDER ITEMS =", orderItems);

            const response = await fetch(
                "https://sutrika-ai-digital-marketplace-production.up.railway.app/api/order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

    user_id: user.id,

    receiver_name: fullName,

    phone: phone,

    address: address,

    payment_method: "Cash On Delivery",

    items: orderItems

})

                }
            );

            const data = await response.json();

            if (data.success) {

                alert("🎉 Order Placed Successfully!");

                localStorage.removeItem(cartKey);

                window.location.href = "order.html";

            } else {

                alert(data.message || "Unable to place order.");

            }

        } catch (err) {

            console.error(err);

            alert("Server connection failed.");

        }

    });

}
displayCart();


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
