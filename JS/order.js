document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("ordersContainer");

    const user = JSON.parse(localStorage.getItem("sutrikaUser"));

    if (!user) {

        window.location.href = "account.html";
        return;

    }

    try {

        const response = await fetch(
    `http://localhost:5000/api/order/user/${user.id}`
);

        const orders = await response.json();

                /* ==========================================
           UPDATE ORDERS DASHBOARD COUNTERS
        ========================================== */

        const totalOrdersElement =
            document.getElementById("totalOrders");

        const pendingOrdersElement =
            document.getElementById("pendingOrders");

        const deliveredOrdersElement =
            document.getElementById("deliveredOrders");


        // Get unique orders using invoice number
        const uniqueOrders = new Map();

        orders.forEach(order => {

            const orderKey =
                order.invoice_no ||
                order.order_id ||
                order.id;

            if (orderKey) {
                uniqueOrders.set(orderKey, order);
            }

        });


        const uniqueOrderList =
            Array.from(uniqueOrders.values());


        // Total Orders
        const totalOrders =
            uniqueOrderList.length;


        // Delivered Orders
        const deliveredOrders =
            uniqueOrderList.filter(order =>
                String(order.status || "")
                    .toLowerCase() === "delivered"
            ).length;


        // In Progress Orders
        const pendingOrders =
            uniqueOrderList.filter(order => {

                const status =
                    String(order.status || "")
                        .toLowerCase();

                return (
                    status !== "delivered" &&
                    status !== "cancelled" &&
                    status !== "canceled"
                );

            }).length;


        // Display numbers
        if (totalOrdersElement) {
            totalOrdersElement.textContent =
                totalOrders;
        }

        if (pendingOrdersElement) {
            pendingOrdersElement.textContent =
                pendingOrders;
        }

        if (deliveredOrdersElement) {
            deliveredOrdersElement.textContent =
                deliveredOrders;
        }

        if (!orders.length) {

            container.innerHTML = `
                <div class="orders-card">

                    <div class="order-icon">
                        <i class="fa-solid fa-box-open"></i>
                    </div>

                    <h2>No Orders Yet</h2>

                    <p>Your handcrafted journey has not started yet.</p>

                    <a href="collection.html">
                        Explore Collection
                    </a>

                </div>
            `;

            return;

        }

        container.innerHTML = "";

        orders.forEach(order => {

    container.innerHTML += `

    <div class="order-item">

        <img src="${order.image}" alt="${order.product_name}">

        <div class="order-details">

            <h3>${order.product_name}</h3>

            <p><strong>Invoice :</strong> ${order.invoice_no}</p>

            <p><strong>Receiver :</strong> ${order.receiver_name}</p>

            <p><strong>Phone :</strong> ${order.phone}</p>

            <p><strong>Address :</strong> ${order.address}</p>

            <p><strong>Payment :</strong> ${order.payment_method}</p>

            <p><strong>Quantity :</strong> ${order.quantity}</p>

            <p><strong>Price :</strong> ₹${order.price}</p>

            <p><strong>Ordered On :</strong>
            ${new Date(order.created_at).toLocaleDateString()}</p>

            <p><strong>Estimated Delivery :</strong>
            ${new Date(order.estimated_delivery).toLocaleDateString()}</p>

            <p>

                <strong>Status :</strong>

                <span class="status ${order.status.toLowerCase()}">

                    ${order.status}

                </span>

            </p>
            ${order.status === "Pending" ? `
                <button class="cancel-order-btn"
                    onclick="cancelOrder(${order.order_id})">
                    <i class="fa-solid fa-xmark"></i>
                    Cancel Order
                </button>
                  ` : ""}

        </div>

    </div>

    `;

});



    } catch (err) {

        console.error(err);

    }

    window.cancelOrder = async function(orderId) {

    const user = JSON.parse(localStorage.getItem("sutrikaUser"));

    if (!user) {
        alert("Please login first.");
        return;
    }

    const confirmCancel = confirm(
        "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/order/cancel/${orderId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to cancel order.");
            return;
        }

        alert("Order cancelled successfully.");

        location.reload();

    } catch (error) {

        console.error("Cancel Order Error:", error);

        alert("Something went wrong while cancelling the order.");
    }
};

});

