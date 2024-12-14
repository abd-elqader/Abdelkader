import { DataTypes } from "sequelize";
import { sequelize } from "../database.controller.js";
import { Post } from "./post.model.js";
import { Comment } from "./comment.model.js";

export const User = sequelize.define(
    "User",
    {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        },
        role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 100],
        },
        },
    },
    {
        hooks: {
            beforeCreate: (user) => {
                checkPasswordLength(user.password);
        },
        },
    }
);

export const defineUserAssociations = () => {
    
    User.hasMany(Comment, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });

    User.hasMany(Post, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
};


function checkPasswordLength(password) {
    if (!password || password.length <= 6) {
        throw new Error('Password must be greater than 6 characters');
    }
}
export const syncUser = async () => {
  try {
    await User.sync({alter:true, force:true});
  } catch (error) {
    console.log(error);
  }
};
