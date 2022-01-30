import { Router } from 'express';
import PostController from '@/controllers/post-controller';
import createPostValidation from '@/validation/post/create-post-validation';
import readPostListValidation from '@/validation/post/read-post-list-validation';
import paramsIdValidation from '@/validation/post/params-id-validation';
import updatePostValidation from '@/validation/post/update-post-validation';

const postRouter = Router();

const postController = new PostController();

postRouter.post('/', createPostValidation, postController.createPost);
postRouter.get('/:id', paramsIdValidation, postController.readPost);
postRouter.get('/', readPostListValidation, postController.readPostList);
postRouter.put('/:id', paramsIdValidation, updatePostValidation, postController.updatePost);
// postRouter.delete('/:id', postController.deletePost);

export default postRouter;
