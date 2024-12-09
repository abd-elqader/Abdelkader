export const getUser = (req, res, next) => {
    return res.json({message: "get user", user: "userData"});
}

export const addUser = (req, res, next) => {
    return res.json({message: "add user", user: "userData"});
}

export const updateUser = (req, res, next) => {
    return res.json({message: "update user", user: "userData"});
}

export const deleteUser = (req, res, next) => {
    return res.json({message: "delete user", user: "userData"});
}