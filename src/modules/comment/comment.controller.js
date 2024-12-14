import { Router } from 'express';
import * as commentService from './comment.service.js';

export const commentRouter = Router();

commentRouter.post('/', commentService.createBulkComments);
commentRouter.patch('/:commentId', commentService.updateCommentContent);
commentRouter.post('/find-or-create', commentService.findOrCreateComment);
commentRouter.get('/search', commentService.searchComments);
commentRouter.get('/newest/:postId', commentService.getNewestComments);
commentRouter.get('/details/:id', commentService.getCommentDetails);