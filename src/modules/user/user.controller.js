import { Router } from 'express';
import * as userService from './user.service.js';

export const userRouter = Router();

userRouter.get('/', userService.getUser);
userRouter.post('/', userService.addUser);
userRouter.put('/', userService.updateUser);
userRouter.delete('/', userService.deleteUser);