import { Op } from "sequelize";
import { Comment } from "../../db/models/comment.model.js";

export const createBulkComments = async (req, res, next) => {
    try {
        const { comments } = req.body;

        // Validate input
        if (!Array.isArray(comments) || comments.length === 0) {
            return res.status(400).json({ message: "Comments array is required and cannot be empty" });
        }

        // Ensure each comment has required fields
        const invalidComments = comments.filter(comment => !comment.content || !comment.user_id || !comment.post_id);
        if (invalidComments.length > 0) {
            return res.status(400).json({ 
                message: "Each comment must have content, user_id, and post_id", 
                invalidComments 
            });
        }

        // Create comments in bulk
        const createdComments = await Comment.bulkCreate(comments);

        return res.status(201).json({
            message: "Comments created successfully",
            data: createdComments,
        });
    } catch (error) {
        console.error("Error creating bulk comments:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export const updateCommentContent = async (req, res, next) => {
    try {
        const { commentId } = req.params; 
        const { userId, content } = req.body;


        if (!userId || !content) {
            return res.status(400).json({ message: "userId and content are required" });
        }

        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Ensure the user is the owner of the comment
        if (comment.user_id !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this comment" });
        }

        // Update the content of the comment
        comment.content = content;
        await comment.save();

        return res.status(200).json({
            message: "Comment updated successfully",
            data: comment,
        });
    } catch (error) {
        console.error("Error updating comment:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export const findOrCreateComment = async (req, res, next) => {
    try {
        const { postId, userId, content } = req.body;

        if (!postId || !userId || !content) {
            return res.status(400).json({
                message: "postId, userId, and content are required",
            });
        }

        // Find or create the comment
        const [comment, created] = await Comment.findOrCreate({
            where: {
                post_id: postId,
                user_id: userId,
                content: content,
            },
            defaults: {
                content,
            },
        });

        return res.status(200).json({
            message: created ? "Comment created successfully" : "Comment found",
            data: comment,
        });
    } catch (error) {
        console.error("Error in findOrCreateComment:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export const searchComments = async (req, res, next) => {
    try {
        const { word } = req.query;

        if (!word) {
            return res.status(400).json({ message: "The query parameter 'word' is required" });
        }

        const { rows: comments, count } = await Comment.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`,
                },
            },
            attributes: ["id", "content", "user_id", "post_id"],
        });

        return res.status(200).json({
            message: "Comments retrieved successfully",
            word: word,
            count: count,
            data: comments,
        });
    } catch (error) {
        console.error("Error searching comments:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export const getNewestComments = async (req, res, next) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: "postId parameter is required" });
        }

        const comments = await Comment.findAll({
            where: {
                post_id: postId,
            },
            attributes: ["id", "content", "user_id", "createdAt"],
            order: [["createdAt", "DESC"]],
            limit: 3,
        });

        return res.status(200).json({
            message: "Recent comments retrieved successfully",
            postId: postId,
            count: comments.length,
            data: comments,
        });
    } catch (error) {
        console.error("Error retrieving recent comments:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export const getCommentDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Comment ID is required" });
        }

        const comment = await Comment.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"],
                },
                {
                    model: Post,
                    attributes: ["id", "title", "content"],
                },
            ],
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        return res.status(200).json({
            message: "Comment retrieved successfully",
            data: comment,
        });
    } catch (error) {
        console.error("Error retrieving comment details:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};


