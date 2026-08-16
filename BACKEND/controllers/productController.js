const db = require("../config/db");

// Get All Products
exports.getProducts = (req, res) => {

    const sql = `
        SELECT
            p.id,
            p.product_name,
            c.category_name,
            p.price,
            p.stock,
            p.image,
            p.description,
            p.artisan_name
        FROM products p
        LEFT JOIN categories c
            ON p.category_id = c.id
        ORDER BY p.id ASC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(results);

    });

};
