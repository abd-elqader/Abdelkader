import { userRouter } from "./modules/user/user.controller.js";

export const bootstrap = (app, express) => {
    // ================ parse req
    app.use(express.json());
    // =============== routes
    // =============== user
    app.use('/user', userRouter);
    // just for testing
    app.get('/', (req, res, next) => {
        return res.json({message:"done done"})
    });
};