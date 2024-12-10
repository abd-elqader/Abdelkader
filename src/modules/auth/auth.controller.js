import { Router } from "express";
import * as authService from "./auth.service.js"

export const authRouter = Router();

authRouter.post('/register', authService.register);
authRouter.post('/login', authService.login);