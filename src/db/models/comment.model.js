import { DataTypes } from "sequelize";
import { sequelize } from "../database.controller.js";


const Comment = sequelize.define('Comment',{
    'content': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    'user_id': {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    'post_id': {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export const syncComment = async () => {
    try {
        await Comment.sync()
    } catch (error) {
        console.log(error)
    }
}