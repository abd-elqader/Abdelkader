import { Post } from "../../db/models/post.model.js";
import { User } from "../../db/models/user.model.js";
import { Comment } from "../../db/models/comment.model.js";
import { sequelize } from "../../db/database.controller.js";

export const createPost = async (req, res, next) => {
    try {
        const { title, content, user_id } = req.body;

        if (!title || !content || !user_id) {
            return res.status(400).json({ message: "Title, content, and user_id are required" });
        }

        const newPost = Post.build({ title, content, user_id });

        await newPost.save();

        return res.status(201).json({
            message: "Post created successfully",
            data: newPost,
        });
    } catch (error) {
        console.error("Error creating post:", error);

        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export const getPostDetails = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'content'],
                },
            ],
        });

        return res.status(200).json({
            message: "Posts retrieved successfully",
            data: posts,
        });
    } catch (error) {
        console.error("Error retrieving post details:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export const deletePost = async(req, res, next) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user_id !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        await post.destroy();

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
}

export const getPostsWithCommentCount = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                [
                    sequelize.fn('COUNT', sequelize.col('Comments.id')),
                    'commentCount',
                ],
            ],
            include: [
                {
                    model: Comment,
                    attributes: [], 
                },
            ],
            group: ['Post.id'],
        });

        return res.status(200).json({
            message: "Posts retrieved successfully",
            data: posts,
        });
    } catch (error) {
        console.error("Error retrieving posts with comment count:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};