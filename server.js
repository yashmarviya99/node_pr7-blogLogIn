const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./src/db/db");
const authRoute = require("./src/routes/authRoute");
const blogRoute = require("./src/routes/blogRoute");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Auth Routes
app.use("/api/auth", authRoute);

// Blog Routes
app.use("/api/blogs", blogRoute);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Blog API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});