import { Router } from 'express';
import PostController from '@/controllers/post-controller';
import createPostValidation from '@/validation/post/create-post-validation';
import paramsIdValidation from '@/validation/post/params-id-validation';
import updatePostValidation from '@/validation/post/update-post-validation';
// TODO: 제거
// import readPostListValidation from '@/validation/post/read-post-list-validation';
// import paramsUserValidation from '@/validation/post/params-user-validation';
// import paramsTitleValidation from '@/validation/post/params-title-validation';

const postRouter = Router();

const postController = new PostController();

postRouter.get('/search', postController.readSearchPostList);
postRouter.post('/', createPostValidation, postController.createPost);
postRouter.get('/:id', paramsIdValidation, postController.readPost);
postRouter.get('/', postController.readPostList);
postRouter.put('/:id', paramsIdValidation, updatePostValidation, postController.updatePost);
postRouter.delete('/:id', paramsIdValidation, postController.deletePost);

export default postRouter;
