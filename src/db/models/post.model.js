import { DataTypes } from "sequelize";
import { sequelize } from "../database.controller.js";


const Post = sequelize.define('Post',{
    'title': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    'body': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    'user_id': {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export const syncPost = async () => {
    try {
        await Comment.sync()
    } catch (error) {
        console.log(error)
    }
}