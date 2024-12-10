import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.controller.js";
import { User } from "./user.model.js";

export class Post extends Model {}
    Post.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
                body: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        },
        { 
            sequelize,
            modelName: "Post", 
        }
);

Post.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export const syncPost = async () => {
    try {
        await Post.sync({ alter: true, force: true });
    } catch (error) {
        console.log(error);
    }
};
