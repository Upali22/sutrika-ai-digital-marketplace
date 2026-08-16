const express = require("express");

const db = require("../config/db");

const router = express.Router();


/* =========================================================
   SUTRIKA CUSTOM REQUEST
   ========================================================= */

router.post("/request", (req, res) => {

    try {

        const {
            user_id,
            fabric,
            colour,
            pattern,
            occasion,
            message
        } = req.body;


        /* =====================================================
           VALIDATION
           ===================================================== */

        if (!user_id || !fabric || !colour || !pattern || !occasion) {

            return res.status(400).json({
                success: false,
                message: "Please complete all required preferences."
            });

        }


        /* =====================================================
           GENERATE REQUEST ID
           ===================================================== */

        const requestId =
            "SUT-" +
            Date.now().toString().slice(-8);


        /* =====================================================
           SAVE CUSTOM REQUEST
           ===================================================== */

           const sql = `
    INSERT INTO custom_requests
    (
        request_id,
        user_id,
        fabric,
        colour,
        pattern,
        occasion,
        special_request,
        status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
    requestId,
    user_id,
    fabric,
    colour,
    pattern,
    occasion,
    message || "",
    "Pending"
];


        db.query(sql, values, (error, result) => {

            if (error) {

                console.error(
                    "SUTRIKA CUSTOM REQUEST ERROR:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Unable to submit your custom request right now."
                });

            }


            /* =================================================
               SUCCESS
               ================================================= */

            console.log(
                "✅ Custom Request Created:",
                requestId
            );


            return res.json({

                success: true,

                requestId: requestId,

                message:
                    "Your custom request has been received successfully.",

                status: "Pending"

            });

        });

    }

    catch (error) {

        console.error(
            "SUTRIKA CUSTOM REQUEST ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while submitting your request."

        });

    }

});


/* =========================================================
   TEST ROUTE
   ========================================================= */

router.get("/test", (req, res) => {

    res.json({

        success: true,

        message:
            "SUTRIKA Custom Request API is working."

    });

});

/* =========================================================
   GET MY CUSTOM REQUESTS
   ========================================================= */

router.get("/my-requests", (req, res) => {

    const userId = req.query.user_id;

    if (!userId) {

        return res.status(400).json({
            success: false,
            message: "User ID is required."
        });

    }

    const sql = `
        SELECT
            id,
            request_id,
            fabric,
            colour,
            pattern,
            occasion,
            special_request,
            status,
            created_at
        FROM custom_requests
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], (error, results) => {

        if (error) {

            console.error(
                "SUTRIKA CUSTOM REQUEST FETCH ERROR:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to load your custom requests."
            });

        }

        return res.json({
            success: true,
            requests: results
        });

    });

});

// =========================================================
// GET USER'S CUSTOM REQUESTS
// =========================================================

router.get("/my-requests", (req, res) => {

    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: "User ID is required."
        });
    }

    const sql = `
        SELECT
            request_id,
            user_id,
            fabric,
            colour,
            pattern,
            occasion,
            special_request,
            status,
            created_at
        FROM custom_requests
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [user_id], (err, results) => {

        if (err) {

            console.error(
                "CUSTOM REQUEST FETCH ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Unable to load custom requests."
            });
        }

        res.json({
            success: true,
            requests: results
        });

    });

});
// =========================================================
// SAVE CUSTOM REQUEST
// =========================================================

router.post("/request", (req, res) => {

    const {
        user_id,
        fabric,
        colour,
        pattern,
        occasion,
        message
    } = req.body;

    // -----------------------------------------
    // Validate required information
    // -----------------------------------------

    if (
        !user_id ||
        !fabric ||
        !colour ||
        !pattern ||
        !occasion
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required design details."
        });
    }

    // -----------------------------------------
    // Generate SUTRIKA Request ID
    // -----------------------------------------

    const requestId =
        "SUT-" +
        Math.floor(
            10000000 + Math.random() * 90000000
        );

    // -----------------------------------------
    // Insert request into database
    // -----------------------------------------

    const sql = `
        INSERT INTO custom_requests
        (
            request_id,
            user_id,
            fabric,
            colour,
            pattern,
            occasion,
            special_request,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;

    const values = [
        requestId,
        user_id,
        fabric,
        colour,
        pattern,
        occasion,
        message || ""
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.error(
                "CUSTOM REQUEST SAVE ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Unable to save your custom request."
            });
        }

        console.log(
            "✅ Custom Request Saved:",
            requestId,
            "User:",
            user_id
        );

        return res.json({
            success: true,
            message: "Custom request submitted successfully.",
            requestId: requestId
        });

    });

});

module.exports = router;
