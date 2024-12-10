import { syncComment } from "./db/models/comment.model.js";
import { syncPost } from "./db/models/post.model.js";
import { syncUser } from "./db/models/user.model.js";
import { userRouter } from "./modules/user/user.controller.js";
import { postRouter } from "./modules/post/post.controller.js";
import { commentRouter } from "./modules/comment/comment.controller.js";
import { authRouter } from "./modules/auth/auth.controller.js";
import { checkConnection } from "./db/database.controller.js";

export const bootstrap = async (app, express) => {
    
    await checkConnection();
    // ================ parse req
    app.use(express.json());
    // =============== routes =========
    // =============== auth
    app.use('/auth', authRouter);
    // =============== user
    app.use('/user', userRouter);
    // =============== post
    app.use('/post', postRouter);
    // =============== comment
    app.use('/comment', commentRouter);
    //------- create tables
    // await syncUser();
    // await syncPost();
    // await syncComment();
    //-------  just for testing
    app.get('/', (req, res, next) => {
        return res.json({message:"done done"})
    });
};