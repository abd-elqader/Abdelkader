export const getComment = (req, res, next) => {
    return res.json({message: "get Comment", comment: "commentData"});
}

export const addComment = (req, res, next) => {
    return res.json({message: "add Comment", comment: "commentData"});
}

export const updateComment = (req, res, next) => {
    return res.json({message: "update Comment", comment: "commentData"});
}

export const deleteComment = (req, res, next) => {
    return res.json({message: "delete Comment", comment: "commentData"});
}