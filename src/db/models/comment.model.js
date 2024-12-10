import { DataTypes,Model } from "sequelize";
import { sequelize } from "../database.controller.js";
import { User } from "./user.model.js";
import { Post } from "./post.model.js";

class Comment extends Model {}

Comment.init(
    {
        'content': {
        type: DataTypes.STRING,
        allowNull: false,
        }
    },
    { 
        sequelize,
        modelName: "Comment", 
    }
);

Comment.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Comment.belongsTo(Post, {
    foreignKey: {
        name: "post_id",
        allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export const syncComment = async () => {
    try {
        await Comment.sync({alter:true, force:true})
    } catch (error) {
        console.log(error)
    }
}