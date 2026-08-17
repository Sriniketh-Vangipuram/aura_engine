const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const inventoryRoutes = require("./routes/inventory.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Aura Engine API is healthy",
    });
});

app.use("/api/inventory", inventoryRoutes);
app.use("/api/analytics", analyticsRoutes);

// MUST be after all routes
app.use(errorHandler);

module.exports = app;