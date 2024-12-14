import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.controller.js";
import { User } from "./user.model.js";
import { Comment } from "./comment.model.js";

export class Post extends Model {}
    Post.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
                content: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        },
        { 
            sequelize,
            paranoid: true,
            modelName: "Post", 
        }
);

export const definePostAssociations = () => {
    Post.belongsTo(User, {
        foreignKey: {
            name: "user_id", 
            allowNull: false,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    
    Post.hasMany(Comment, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
};

export const syncPost = async () => {
    try {
        await Post.sync({ alter: true, force: true });
    } catch (error) {
        console.log(error);
    }
};
