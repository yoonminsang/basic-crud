import { Router } from 'express';
import PostController from '@/controllers/post-controller';
import createPostValidation from '@/validation/post/create-post-validation';
import readPostListValidation from '@/validation/post/read-post-list-validation';
import paramsIdValidation from '@/validation/post/params-id-validation';
import updatePostValidation from '@/validation/post/update-post-validation';
import paramsUserValidation from '@/validation/post/params-user-validation';

const postRouter = Router();

const postController = new PostController();

postRouter.get('/search/user/:user', paramsUserValidation, readPostListValidation, postController.readPostListByUser);
postRouter.get('/search/title/:title', readPostListValidation, postController.readPostListByTitle);
postRouter.get('/search/content/:content', readPostListValidation, postController.readPostListByContent);
postRouter.post('/', createPostValidation, postController.createPost);
postRouter.get('/:id', paramsIdValidation, postController.readPost);
postRouter.get('/', readPostListValidation, postController.readPostList);
postRouter.put('/:id', paramsIdValidation, updatePostValidation, postController.updatePost);
postRouter.delete('/:id', paramsIdValidation, postController.deletePost);

export default postRouter;
