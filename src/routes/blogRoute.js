const express = require("express");

const {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Protected Create Blog
router.post("/", authMiddleware, createBlog);


// Protected Get All Blogs
router.get("/", authMiddleware, getBlogs);


// Protected Get Single Blog
router.get("/:id", authMiddleware, getBlog);


// Protected Update Blog
router.put("/:id", authMiddleware, updateBlog);


// Protected Delete Blog
router.delete("/:id", authMiddleware, deleteBlog);


module.exports = router;