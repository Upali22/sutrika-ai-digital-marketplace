const db = require("../config/db");


/* ==========================================================
   GET ALL ADMIN PRODUCTS
========================================================== */

exports.getAdminProducts = (req, res) => {

    const sql = `
        SELECT
            p.id,
            p.product_name,
            p.category_id,
            c.category_name,
            p.price,
            p.stock,
            p.image,
            p.description,
            p.artisan_name,
            p.created_at
        FROM products p
        LEFT JOIN categories c
            ON p.category_id = c.id
        ORDER BY p.id ASC
    `;


    db.query(sql, (err, results) => {

        if (err) {

            console.error(
                "ADMIN GET PRODUCTS ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Unable to load products."
            });

        }


        res.json({
            success: true,
            products: results
        });

    });

};


/* ==========================================================
   ADD PRODUCT
========================================================== */

exports.addProduct = (req, res) => {

    const {
        product_name,
        category_id,
        price,
        stock,
        image,
        description,
        artisan_name
    } = req.body;


    /* ==========================================
       VALIDATION
    ========================================== */

    if (
        !product_name ||
        category_id === undefined ||
        category_id === null ||
        price === undefined ||
        price === null
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Product name, category and price are required."
        });

    }


    const cleanName =
        String(product_name).trim();


    const categoryId =
        Number(category_id);


    const productPrice =
        Number(price);


    const productStock =
        stock === undefined ||
        stock === null ||
        stock === ""
            ? 0
            : Number(stock);


    if (!cleanName) {

        return res.status(400).json({
            success: false,
            message: "Product name cannot be empty."
        });

    }


    if (
        !Number.isInteger(categoryId) ||
        categoryId <= 0
    ) {

        return res.status(400).json({
            success: false,
            message: "Invalid category."
        });

    }


    if (
        !Number.isFinite(productPrice) ||
        productPrice < 0
    ) {

        return res.status(400).json({
            success: false,
            message: "Invalid product price."
        });

    }


    if (
        !Number.isInteger(productStock) ||
        productStock < 0
    ) {

        return res.status(400).json({
            success: false,
            message: "Stock must be a non-negative whole number."
        });

    }


    /* ==========================================
       CHECK CATEGORY
    ========================================== */

    const categorySql = `
        SELECT id
        FROM categories
        WHERE id = ?
        LIMIT 1
    `;


    db.query(
        categorySql,
        [categoryId],
        (categoryError, categoryResult) => {

            if (categoryError) {

                console.error(
                    "CATEGORY CHECK ERROR:",
                    categoryError
                );

                return res.status(500).json({
                    success: false,
                    message: "Unable to verify category."
                });

            }


            if (categoryResult.length === 0) {

                return res.status(400).json({
                    success: false,
                    message: "Selected category does not exist."
                });

            }


            /* ======================================
               INSERT PRODUCT
            ====================================== */

            const insertSql = `
                INSERT INTO products
                (
                    product_name,
                    category_id,
                    price,
                    stock,
                    image,
                    description,
                    artisan_name
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;


            const values = [
                cleanName,
                categoryId,
                productPrice,
                productStock,
                image || null,
                description || null,
                artisan_name || null
            ];


            db.query(
                insertSql,
                values,
                (insertError, result) => {

                    if (insertError) {

                        console.error(
                            "ADD PRODUCT ERROR:",
                            insertError
                        );

                        return res.status(500).json({
                            success: false,
                            message: "Unable to add product."
                        });

                    }


                    res.status(201).json({
                        success: true,
                        message:
                            "Product added successfully.",
                        productId:
                            result.insertId
                    });

                }
            );

        }
    );

};


/* ==========================================================
   UPDATE PRODUCT
========================================================== */

exports.updateProduct = (req, res) => {

    const productId =
        Number(req.params.id);


    const {
        product_name,
        category_id,
        price,
        stock,
        image,
        description,
        artisan_name
    } = req.body;


    /* ==========================================
       VALIDATE ID
    ========================================== */

    if (
        !Number.isInteger(productId) ||
        productId <= 0
    ) {

        return res.status(400).json({
            success: false,
            message: "Invalid product ID."
        });

    }


    /* ==========================================
       VALIDATE REQUIRED DATA
    ========================================== */

    if (
        !product_name ||
        category_id === undefined ||
        category_id === null ||
        price === undefined ||
        price === null
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Product name, category and price are required."
        });

    }


    const cleanName =
        String(product_name).trim();


    const categoryId =
        Number(category_id);


    const productPrice =
        Number(price);


    const productStock =
        stock === undefined ||
        stock === null ||
        stock === ""
            ? 0
            : Number(stock);


    if (!cleanName) {

        return res.status(400).json({
            success: false,
            message: "Product name cannot be empty."
        });

    }


    if (
        !Number.isInteger(categoryId) ||
        categoryId <= 0
    ) {

        return res.status(400).json({
            success: false,
            message: "Invalid category."
        });

    }


    if (
        !Number.isFinite(productPrice) ||
        productPrice < 0
    ) {

        return res.status(400).json({
            success: false,
            message: "Invalid product price."
        });

    }


    if (
        !Number.isInteger(productStock) ||
        productStock < 0
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Stock must be a non-negative whole number."
        });

    }


    /* ==========================================
       CHECK PRODUCT EXISTS
    ========================================== */

    const productCheckSql = `
        SELECT id
        FROM products
        WHERE id = ?
        LIMIT 1
    `;


    db.query(
        productCheckSql,
        [productId],
        (productError, productResult) => {

            if (productError) {

                console.error(
                    "PRODUCT CHECK ERROR:",
                    productError
                );

                return res.status(500).json({
                    success: false,
                    message: "Unable to verify product."
                });

            }


            if (productResult.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Product not found."
                });

            }


            /* ======================================
               CHECK CATEGORY
            ====================================== */

            const categorySql = `
                SELECT id
                FROM categories
                WHERE id = ?
                LIMIT 1
            `;


            db.query(
                categorySql,
                [categoryId],
                (categoryError, categoryResult) => {

                    if (categoryError) {

                        console.error(
                            "CATEGORY CHECK ERROR:",
                            categoryError
                        );

                        return res.status(500).json({
                            success: false,
                            message:
                                "Unable to verify category."
                        });

                    }


                    if (
                        categoryResult.length === 0
                    ) {

                        return res.status(400).json({
                            success: false,
                            message:
                                "Selected category does not exist."
                        });

                    }


                    /* ==================================
                       UPDATE PRODUCT
                    ================================== */

                    const updateSql = `
                        UPDATE products
                        SET
                            product_name = ?,
                            category_id = ?,
                            price = ?,
                            stock = ?,
                            image = ?,
                            description = ?,
                            artisan_name = ?
                        WHERE id = ?
                    `;


                    const values = [
                        cleanName,
                        categoryId,
                        productPrice,
                        productStock,
                        image || null,
                        description || null,
                        artisan_name || null,
                        productId
                    ];


                    db.query(
                        updateSql,
                        values,
                        (updateError) => {

                            if (updateError) {

                                console.error(
                                    "UPDATE PRODUCT ERROR:",
                                    updateError
                                );

                                return res.status(500).json({
                                    success: false,
                                    message:
                                        "Unable to update product."
                                });

                            }


                            res.json({
                                success: true,
                                message:
                                    "Product updated successfully."
                            });

                        }
                    );

                }
            );

        }
    );

};


/* ==========================================================
   DELETE PRODUCT
========================================================== */

exports.deleteProduct = (req, res) => {

    const productId =
        Number(req.params.id);


    /* ==========================================
       VALIDATE ID
    ========================================== */

    if (
        !Number.isInteger(productId) ||
        productId <= 0
    ) {

        return res.status(400).json({
            success: false,
            message: "Invalid product ID."
        });

    }


    /* ==========================================
       CHECK PRODUCT EXISTS
    ========================================== */

    const checkSql = `
        SELECT id, product_name
        FROM products
        WHERE id = ?
        LIMIT 1
    `;


    db.query(
        checkSql,
        [productId],
        (checkError, productResult) => {

            if (checkError) {

                console.error(
                    "DELETE PRODUCT CHECK ERROR:",
                    checkError
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Unable to verify product."
                });

            }


            if (productResult.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Product not found."
                });

            }


            /* ======================================
               DELETE PRODUCT
            ====================================== */

            const deleteSql = `
                DELETE FROM products
                WHERE id = ?
            `;


            db.query(
                deleteSql,
                [productId],
                (deleteError) => {

                    if (deleteError) {

                        console.error(
                            "DELETE PRODUCT ERROR:",
                            deleteError
                        );


                        /*
                           This commonly happens if
                           an existing order/cart/wishlist
                           still references this product.
                        */

                        if (
                            deleteError.code ===
                            "ER_ROW_IS_REFERENCED_2"
                        ) {

                            return res.status(409).json({
                                success: false,
                                message:
                                    "This product is already referenced by existing orders or shopping data and cannot be deleted."
                            });

                        }


                        return res.status(500).json({
                            success: false,
                            message:
                                "Unable to delete product."
                        });

                    }


                    res.json({
                        success: true,
                        message:
                            "Product deleted successfully."
                    });

                }
            );

        }
    );

};