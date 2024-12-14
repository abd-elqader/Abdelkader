import { User } from "../../db/models/user.model.js";

export const signup = async (req, res, next) => {

    try {
        const { email, name, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = User.build({ email, name, password });
        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            data: newUser,
        });
    } catch (error) {
        console.error("Error during user creation:", error);

        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map((err) => err.message);
            return res.status(400).json({
                message: "Validation errors",
                errors: validationErrors,
            });
        }

        return res.status(500).json({
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
}