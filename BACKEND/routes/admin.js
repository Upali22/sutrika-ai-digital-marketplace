const express = require("express");

const router = express.Router();

const db = require("../config/db");

const adminMiddleware =
    require("../middleware/adminMiddleware");

const {
    getAdminProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/adminProductController");


/* ==========================================================
   ADMIN DASHBOARD STATISTICS
========================================================== */

router.get(
    "/dashboard",
    adminMiddleware,
    (req, res) => {

        const queries = {

            users: `
                SELECT COUNT(*) AS total
                FROM users
            `,

            products: `
                SELECT COUNT(*) AS total
                FROM products
            `,

            orders: `
                SELECT COUNT(*) AS total
                FROM orders
            `,

            customRequests: `
                SELECT COUNT(*) AS total
                FROM custom_requests
            `

        };


        db.query(
            queries.users,
            (userError, userResult) => {

                if (userError) {

                    console.error(
                        "ADMIN USERS ERROR:",
                        userError
                    );

                    return res.status(500).json({
                        success: false,
                        message:
                            "Unable to load user statistics."
                    });

                }


                db.query(
                    queries.products,
                    (productError, productResult) => {

                        if (productError) {

                            console.error(
                                "ADMIN PRODUCTS ERROR:",
                                productError
                            );

                            return res.status(500).json({
                                success: false,
                                message:
                                    "Unable to load product statistics."
                            });

                        }


                        db.query(
                            queries.orders,
                            (orderError, orderResult) => {

                                if (orderError) {

                                    console.error(
                                        "ADMIN ORDERS ERROR:",
                                        orderError
                                    );

                                    return res.status(500).json({
                                        success: false,
                                        message:
                                            "Unable to load order statistics."
                                    });

                                }


                                db.query(
                                    queries.customRequests,
                                    (
                                        requestError,
                                        requestResult
                                    ) => {

                                        if (requestError) {

                                            console.error(
                                                "ADMIN CUSTOM REQUEST ERROR:",
                                                requestError
                                            );

                                            return res.status(500).json({
                                                success: false,
                                                message:
                                                    "Unable to load custom request statistics."
                                            });

                                        }


                                        res.json({

                                            success: true,

                                            statistics: {

                                                users:
                                                    userResult[0].total,

                                                products:
                                                    productResult[0].total,

                                                orders:
                                                    orderResult[0].total,

                                                customRequests:
                                                    requestResult[0].total

                                            }

                                        });

                                    }
                                );

                            }
                        );

                    }
                );

            }
        );

    }
);

/* ==========================================================
   ADMIN — GET ALL USERS
========================================================== */

router.get(
    "/users",
    adminMiddleware,
    (req, res) => {

        const query = `
            SELECT
                id,
                full_name,
                email,
                phone,
                role,
                created_at
            FROM users
            ORDER BY created_at DESC
        `;


        db.query(
            query,
            (error, results) => {

                if (error) {

                    console.error(
                        "ADMIN USERS LIST ERROR:",
                        error
                    );

                    return res.status(500).json({
                        success: false,
                        message:
                            "Unable to load users."
                    });

                }


                res.json({
                    success: true,
                    users: results
                });

            }
        );

    }
);

/* ==========================================================
   ADMIN PRODUCT MANAGEMENT
========================================================== */


/* GET ALL PRODUCTS */

router.get(
    "/products",
    adminMiddleware,
    getAdminProducts
);


/* ADD PRODUCT */

router.post(
    "/products",
    adminMiddleware,
    addProduct
);


/* UPDATE PRODUCT */

router.put(
    "/products/:id",
    adminMiddleware,
    updateProduct
);


/* DELETE PRODUCT */

router.delete(
    "/products/:id",
    adminMiddleware,
    deleteProduct
);

/* ==========================================================
   ADMIN — GET ALL CUSTOM REQUESTS
========================================================== */

router.get(
    "/custom-requests",
    adminMiddleware,
    (req, res) => {

        const query = `
            SELECT
                cr.id,
                cr.request_id,
                cr.user_id,
                u.full_name,
                u.email,
                cr.fabric,
                cr.colour,
                cr.pattern,
                cr.occasion,
                cr.special_request,
                cr.status,
                cr.created_at
            FROM custom_requests cr
            LEFT JOIN users u
                ON cr.user_id = u.id
            ORDER BY cr.created_at DESC
        `;

        db.query(
            query,
            (error, results) => {

                if (error) {

                    console.error(
                        "ADMIN CUSTOM REQUESTS ERROR:",
                        error
                    );

                    return res.status(500).json({
                        success: false,
                        message:
                            "Unable to load custom requests."
                    });

                }

                res.json({
                    success: true,
                    requests: results
                });

            }
        );

    }
);

module.exports = router;