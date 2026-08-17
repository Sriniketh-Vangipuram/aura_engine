const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Duplicate SKU
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || "field";

        return res.status(409).json({
            success: false,
            message: `${field} already exists`,
        });
    }

    // Invalid MongoDB ObjectId
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID",
        });
    }

    // Mongoose validation
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: Object.values(err.errors).map((error) => ({
                field: error.path,
                message: error.message,
            })),
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};

module.exports = errorHandler;