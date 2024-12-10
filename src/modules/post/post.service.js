export const getPost = (req, res, next) => {
    return res.json({message: "get post", user: "postData"});
}

export const addPost = (req, res, next) => {
    return res.json({message: "add post", post: "postData"});
}

export const updatePost = (req, res, next) => {
    return res.json({message: "update post", post: "postData"});
}

export const deletePost = (req, res, next) => {
    return res.json({message: "delete post", post: "postData"});
}