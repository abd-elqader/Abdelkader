import { Router } from 'express';
import * as commentService from './comment.service.js';

export const commentRouter = Router();

commentRouter.get('/', commentService.getcomment);
commentRouter.post('/', commentService.addcomment);
commentRouter.put('/', commentService.updatecomment);
commentRouter.delete('/', commentService.deletecomment);