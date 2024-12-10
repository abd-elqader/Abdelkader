import { Router } from 'express';
import * as postService from './post.service.js';

export const postRouter = Router();

postRouter.get('/', postService.getPost);
postRouter.post('/', postService.addPost);
postRouter.put('/', postService.updatePost);
postRouter.delete('/', postService.deletePost);