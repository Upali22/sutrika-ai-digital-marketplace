const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const path = require("path");
console.log("Loading Route File:", path.resolve(__dirname, "routes", "order.js"));

const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const guideRoutes = require("./routes/guide");
const personaliseRoutes = require("./routes/personalise");
const adminRoutes = require("./routes/admin");

//const profileRoutes = require("./routes/profile");
//const wishlistRoutes = require("./routes/wishlist");

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.get("/test", (req, res) => {
    res.send("TEST ROUTE WORKING");
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../HTML/index.html"));
});

// ================================
// SERVE SUTRIKA FRONTEND
// ================================

app.use("/HTML", express.static(path.join(__dirname, "../HTML")));
app.use("/CSS", express.static(path.join(__dirname, "../CSS")));
app.use("/JS", express.static(path.join(__dirname, "../JS")));
app.use("/ASSETS", express.static(path.join(__dirname, "../ASSETS")));

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
console.log("✅ Mounting Order Routes");
app.use("/api/order", orderRoutes);

app.use("/api/product", productRoutes);

app.use("/api/guide", guideRoutes);

app.use("/api/personalise", personaliseRoutes);

app.use("/api/admin", adminRoutes);

//app.use("/api/profile", profileRoutes);
//app.use("/api/wishlist", wishlistRoutes);

const PORT = process.env.PORT || 5000;

console.log("\n===== REGISTERED ROUTES =====");

app.router.stack.forEach((layer) => {
    if (layer.route) {
        console.log(layer.route.path);
    } else if (layer.name === "router") {
        layer.handle.stack.forEach((handler) => {
            if (handler.route) {
                console.log(handler.route.path);
            }
        });
    }
});

console.log("=============================\n");

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
    console.error("SERVER ERROR:", err);
});

process.on("exit", (code) => {
    console.log("❌ Node exited with code:", code);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});