import { syncComment } from "./db/models/comment.model.js";
import { syncPost } from "./db/models/post.model.js";
import { syncUser } from "./db/models/user.model.js";
import { userRouter } from "./modules/user/user.controller.js";
import { postRouter } from "./modules/post/post.controller.js";
import { commentRouter } from "./modules/comment/comment.controller.js";

export const bootstrap = async (app, express) => {
    // ================ parse req
    app.use(express.json());
    // =============== routes
    // =============== user
    app.use('/user', userRouter);
    // =============== user
    app.use('/post', postRouter);
    // =============== user
    app.use('/comment', commentRouter);
    // just for testing
    await syncUser();
    await syncPost();
    await syncComment();
    app.get('/', (req, res, next) => {
        return res.json({message:"done done"})
    });
};