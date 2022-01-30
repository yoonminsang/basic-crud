import PostController from '@/controllers/post-controller';
import createPostValidation from '@/validation/post/create-post-validation';
import readPostListValidation from '@/validation/post/read-post-list-validation';
import { Router } from 'express';

const postRouter = Router();

const postController = new PostController();

postRouter.post('/', createPostValidation, postController.createPost);
// postRouter.get('/:id', , postController.readPost);
postRouter.get('/', readPostListValidation, postController.readPostList);
// postRouter.put('/:id',  postController.updatePost);
// postRouter.delete('/:id', postController.deletePost);

export default postRouter;