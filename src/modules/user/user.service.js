import { User } from "../../db/models/user.model.js";

export const getUser = (req, res, next) => {
    return res.json({message: "get user", user: "userData"});
}

export const addUser = (req, res, next) => {
    return res.json({message: "add user", user: "userData"});
}

export const createUpdateUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { email, name, password } = req.body;

        let user = await User.findByPk(id);

        if (!user) {
            user = User.build({ id, email, name, password });
            await user.save({ skipValidation: true });
            return res.status(201).json({
                message: "User created successfully",
                data: user,
            });
        }

        user.email = email || user.email;
        user.name = name || user.name;
        user.password = password || user.password;

        await user.save({ skipValidation: true });
        return res.status(200).json({
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error in createOrUpdateUser:", error);

        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
}

export const findUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email query parameter is required" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User found successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error in findUserByEmail:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export const findUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: { exclude: ['role'] },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User retrieved successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error in findUserById:", error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

export const deleteUser = (req, res, next) => {
    return res.json({message: "delete user", user: "userData"});
}