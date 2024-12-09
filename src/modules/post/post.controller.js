import { Router } from 'express';
import * as postService from './post.service.js';

export const postRouter = Router();

postRouter.get('/', postService.getpost);
postRouter.post('/', postService.addpost);
postRouter.put('/', postService.updatepost);
postRouter.delete('/', postService.deletepost);