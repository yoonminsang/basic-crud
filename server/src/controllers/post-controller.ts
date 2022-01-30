import { NextFunction, Request, Response } from 'express';
import PostService from '@/services/post-service';

interface ICreatePost {
  title: string;
  content: string;
  user: string;
}

interface IPostList {
  pageId: number;
  postNumber: number;
}

const service = new PostService();

class PostController {
  public createPost(req: Request, res: Response, next: NextFunction) {
    const { title, content, user } = req.body as ICreatePost;
    try {
      const postId = service.createPost(title, content, user);
      res.status(200).json({ postId });
    } catch (err) {
      next(err);
    }
  }

  public readPost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const post = service.readPost(+id);
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  }

  public readPostList(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageId, postNumber } = req.query as unknown as IPostList;
      const postList = service.readPostList(pageId, postNumber);
      res.status(200).json({ postList });
    } catch (err) {
      next(err);
    }
  }

  // public updatePost(req: Request, res: Response, next: NextFunction) {
  //   const { id } = req.params;
  //   const { title, content } = req.body as IPost;
  //   try {
  //     await service.updatePost(+id, title, content, req.user.id);
  //     res.status(200).json({ postId: id });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public deletePost(req: Request, res: Response, next: NextFunction) {
  //   const { id } = req.params;
  //   try {
  //     await service.deletePost(+id, req.user.id);
  //     res.status(200).json();
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

export default PostController;
