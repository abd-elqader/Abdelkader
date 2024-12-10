import { DataTypes } from "sequelize";
import { sequelize } from "../database.controller.js";

export const User = sequelize.define('User',{
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
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    }
})

export const syncUser = async () => {
    try {
        await User.sync()
    } catch (error) {
        console.log(error)
    }
}