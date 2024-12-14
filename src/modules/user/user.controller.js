import { Router } from 'express';
import * as userService from './user.service.js';

export const userRouter = Router();

userRouter.get('/', userService.getUser);
userRouter.post('/', userService.addUser);
userRouter.put('/:id', userService.createUpdateUser);
userRouter.get('/fin-user-by-email', userService.findUserByEmail);
userRouter.get('/:id', userService.findUserById);
userRouter.delete('/', userService.deleteUser);