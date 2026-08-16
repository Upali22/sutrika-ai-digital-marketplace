const express = require("express");
const router = express.Router();

console.log("✅ Order Routes Loaded");

const {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
} = require("../controllers/orderController");

const adminMiddleware =
    require("../middleware/adminMiddleware");

// ===============================
// Create Order
// ===============================
router.post("/", createOrder);

// ===============================
// Get Orders of Logged-in User
// Example: GET /api/orders/user/1
// ===============================
router.get("/user/:userId", getUserOrders);

// ===============================
// Get All Orders (Admin)
// ===============================
router.get(
    "/",
    adminMiddleware,
    getAllOrders
);

// ===============================
// Update Order Status
// ===============================
router.patch(
    "/:id",
    adminMiddleware,
    updateOrderStatus
);

router.put("/cancel/:orderId", cancelOrder);

module.exports = router;
