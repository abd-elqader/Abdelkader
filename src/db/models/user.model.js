import { DataTypes } from "sequelize";
import { sequelize } from "../database.controller.js";

const User = sequelize.define('User',{
    'name': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    'email': {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    'role': {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    }
})

export const syncUser = async () => {
    try {
        await Comment.sync()
    } catch (error) {
        console.log(error)
    }
}