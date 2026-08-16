const db = require("../config/db");

// Add Product to Cart
exports.addToCart = (req, res) => {

    const { user_id, product_id, quantity } = req.body;

    // Check if product already exists in cart
    const checkQuery = `
        SELECT * FROM cart
        WHERE user_id = ? AND product_id = ?
    `;

    db.query(checkQuery, [user_id, product_id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        // Product already exists
        if (result.length > 0) {

            const updateQuery = `
                UPDATE cart
                SET quantity = quantity + ?
                WHERE user_id = ? AND product_id = ?
            `;

            db.query(updateQuery,
                [quantity, user_id, product_id],
                (err) => {

                    if (err)
                        return res.status(500).json(err);

                    res.json({
                        success: true,
                        message: "Cart Updated Successfully"
                    });

                });

        } else {

            const insertQuery = `
                INSERT INTO cart(user_id, product_id, quantity)
                VALUES (?, ?, ?)
            `;

            db.query(insertQuery,
                [user_id, product_id, quantity],
                (err) => {

                    if (err)
                        return res.status(500).json(err);

                    res.json({
                        success: true,
                        message: "Product Added To Cart"
                    });

                });

        }

    });

};
