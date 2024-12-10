import { User } from "../../db/models/user.model.js";

export const register = async (req, res, next) => {
    // to create
    try{
        const userCreated = await User.create(req.body)
        return res.json({ 'message' : true, 'data' : userCreated})
    } catch(error){
        console.log(error);
    }
}

export const login = (req, res, next) => {
    return res.json({message: "login"});
}