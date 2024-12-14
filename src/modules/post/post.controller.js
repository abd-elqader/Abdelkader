import { Router } from 'express';
import * as postService from './post.service.js';

export const postRouter = Router();

postRouter.get('/details', postService.getPostDetails);
postRouter.post('/', postService.createPost);
postRouter.delete('/:postId', postService.deletePost);
postRouter.get('/comment-count', postService.getPostsWithCommentCount);