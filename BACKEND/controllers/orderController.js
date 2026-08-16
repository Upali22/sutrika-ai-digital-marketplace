const db = require("../config/db");

// ===============================
// Create Order
// ===============================
exports.createOrder = (req, res) => {

    const {

        user_id,

        receiver_name,

        phone,

        address,

        payment_method,

        items

    } = req.body;
    console.log(req.body);

    if (!user_id || !items || items.length === 0) {

        return res.status(400).json({

            success: false,

            message: "Order data missing"

        });

    }

    let totalAmount = 0;

    items.forEach(item => {

        totalAmount += Number(item.price) * Number(item.quantity);

    });

    const invoiceNo = "INV-" + Date.now();

    const estimatedDelivery = new Date();

    estimatedDelivery.setDate(
        estimatedDelivery.getDate() + 5
    );
    console.log([
    user_id,
    receiver_name,
    phone,
    address,
    payment_method,
    invoiceNo,
    totalAmount,
    estimatedDelivery
]);

    const orderSql = `

        INSERT INTO orders
        (
            user_id,
            receiver_name,
            phone,
            address,
            payment_method,
            invoice_no,
            total_amount,
            status,
            estimated_delivery
        )

        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            'Pending',
            ?
        )

    `;

    db.query(

        orderSql,

        [

            user_id,

            receiver_name,

            phone,

            address,

            payment_method,

            invoiceNo,

            totalAmount,

            estimatedDelivery

        ],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            const orderId = result.insertId;

            let completed = 0;

            items.forEach(item => {

                const itemSql = `

                    INSERT INTO order_items
                    (
                        order_id,
                        product_id,
                        quantity,
                        price
                    )

                    VALUES (?, ?, ?, ?)

                `;

                db.query(

                    itemSql,

                    [

                        orderId,

                        item.product_id,

                        item.quantity,

                        item.price

                    ],

                    (err2) => {

                        if (err2) {

                            console.log(err2);

                            return res.status(500).json(err2);

                        }

                        completed++;

                        if (completed === items.length) {

                            db.query(

                                "DELETE FROM cart WHERE user_id=?",

                                [user_id],

                                () => {

                                    return res.json({

                                        success: true,

                                        message: "Order Placed Successfully",

                                        order_id: orderId,

                                        invoice_no: invoiceNo

                                    });

                                }

                            );

                        }

                    }

                );

            });

        }

    );

};

// ===============================
// Get Orders of Logged In User
// ===============================
exports.getUserOrders = (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT

    o.id AS order_id,

    o.receiver_name,

    o.phone,

    o.address,

    o.payment_method,

    o.invoice_no,

    o.estimated_delivery,

    o.total_amount,

    o.status,

    o.created_at,

    p.product_name,

    p.image,

    oi.quantity,

    oi.price

        FROM orders o

        JOIN order_items oi
            ON o.id = oi.order_id

        JOIN products p
            ON oi.product_id = p.id

        WHERE o.user_id = ?

        ORDER BY o.created_at DESC
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(results);

    });

};


// ===============================
// Get All Orders (Admin)
// ===============================
exports.getAllOrders = (req, res) => {

    const sql = `
        SELECT

            o.id,
            u.full_name,
            u.email,
            o.total_amount,
            o.status,
            o.created_at

        FROM orders o

        JOIN users u
            ON o.user_id = u.id

        ORDER BY o.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(results);

    });

};


// ===============================
// Update Order Status
// ===============================
exports.updateOrderStatus = (req, res) => {

    const orderId = req.params.id;

    const { status } = req.body;

    db.query(
        "UPDATE orders SET status=? WHERE id=?",
        [status, orderId],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Order status updated."
            });

        }
    );

};
// ===============================
// Cancel Order
// ===============================
exports.cancelOrder = (req, res) => {

    const orderId = req.params.orderId;
    const userId = req.body.user_id;

    if (!orderId || !userId) {
        return res.status(400).json({
            success: false,
            message: "Order ID and User ID are required"
        });
    }

    const sql = `
        UPDATE orders
        SET status = 'Cancelled'
        WHERE id = ?
        AND user_id = ?
        AND status = 'Pending'
    `;

    db.query(sql, [orderId, userId], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Failed to cancel order"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "Order cannot be cancelled"
            });
        }

        res.json({
            success: true,
            message: "Order cancelled successfully"
        });

    });
};

