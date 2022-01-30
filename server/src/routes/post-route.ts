import PostController from '@/controllers/post-controller';
import { Router } from 'express';

const postRouter = Router();

const postController = new PostController();

postRouter.post('/', postController.createPost);
// postRouter.get('/:id', , postController.readPost);
// postRouter.get('/', , postController.readPostList);
// postRouter.put('/:id',  postController.updatePost);
// postRouter.delete('/:id', postController.deletePost);

export default postRouter;
