import { Router } from "express";
import * as authService from "./auth.service.js"

export const authRouter = Router();

authRouter.post('/signup', authService.signup);