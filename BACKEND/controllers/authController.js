const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// =========================
// REGISTER USER
// =========================
exports.register = async (req, res) => {

    const { full_name, email, phone, password } = req.body;

    // Check required fields
    if (!full_name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields"
        });
    }

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email address"
        });
    }

    // Check if email already exists
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered"
                });
            }

            try {

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users (full_name, email, phone, password) VALUES (?, ?, ?, ?)",
                    [full_name, email, phone, hashedPassword],
                    (err) => {

                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: false,
                                message: "Registration Failed"
                            });
                        }

                        return res.status(201).json({
                            success: true,
                            message: "Registration Successful"
                        });

                    }
                );

            } catch (error) {

                console.log(error);

                return res.status(500).json({
                    success: false,
                    message: "Server Error"
                });

            }

        }
    );

};

// =========================
// LOGIN USER
// =========================
exports.login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Please enter email and password"
        });

    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect password"
                });
            }

            const token = jwt.sign(
    {
        id: user.id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);



            return res.json({
                success: true,
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                     phone: user.phone,
                     role: user.role
                }
            });

        }
    );

};
