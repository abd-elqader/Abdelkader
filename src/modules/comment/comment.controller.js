import { Router } from 'express';
import * as commentService from './comment.service.js';

export const commentRouter = Router();

commentRouter.get('/', commentService.getComment);
commentRouter.post('/', commentService.addComment);
commentRouter.put('/', commentService.updateComment);
commentRouter.delete('/', commentService.deleteComment);