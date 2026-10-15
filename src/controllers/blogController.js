const Blog = require("../models/blogModel");


// Create Blog
const createBlog = async (req, res) => {
    try {
        const { title, author, content, category } = req.body;

        if (!title || !author || !content || !category) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const blog = await Blog.create({
            title,
            author,
            content,
            category,

            // Get userId from JWT token
            userId: req.user.userId
        });

        res.status(201).json({
            message: "Blog Created Successfully",
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to Create Blog",
            error: error.message
        });
    }
};


// Get all blogs of logged-in user
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            userId: req.user.userId
        });

        res.status(200).json({
            message: "Blogs fetched successfully",
            data: blogs
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch blogs",
            error: error.message
        });
    }
};


// Get single blog
const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found or you are not authorized"
            });
        }

        res.status(200).json({
            message: "Blog fetched successfully",
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch blog",
            error: error.message
        });
    }
};


// Update Blog
const updateBlog = async (req, res) => {
    try {
        const { title, author, content, category } = req.body;

        const blog = await Blog.findOneAndUpdate(
            {
                _id: req.params.id,

                // Only owner can update
                userId: req.user.userId
            },
            {
                title,
                author,
                content,
                category
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found or you are not authorized"
            });
        }

        res.status(200).json({
            message: "Blog Updated Successfully",
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to Update Blog",
            error: error.message
        });
    }
};


// Delete Blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({
            _id: req.params.id,

            // Only owner can delete
            userId: req.user.userId
        });

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found or you are not authorized"
            });
        }

        res.status(200).json({
            message: "Blog deleted successfully",
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete Blog",
            error: error.message
        });
    }
};


module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
};