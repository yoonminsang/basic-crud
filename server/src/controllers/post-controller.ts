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
  isDescending: number;
}

interface IUpdatePost {
  title: string;
  content: string;
}

const service = new PostService();

// TODO: 캐시 처리

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
      const { pageId, postNumber, isDescending } = req.query as unknown as IPostList;
      const postList = service.readPostList(pageId, postNumber, +isDescending);
      res.status(200).json({ postList });
    } catch (err) {
      next(err);
    }
  }

  // TODO: fetch 인코딩 되는지 확인
  public readPostListByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.params;
      const { pageId, postNumber, isDescending } = req.query as unknown as IPostList;
      const postList = service.readPostListByData(pageId, postNumber, +isDescending, 'user', user);
      res.status(200).json({ postList });
    } catch (err) {
      next(err);
    }
  }

  public readPostListByTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.params;
      const { pageId, postNumber, isDescending } = req.query as unknown as IPostList;
      const postList = service.readPostListByData(pageId, postNumber, +isDescending, 'title', title);
      res.status(200).json({ postList });
    } catch (err) {
      next(err);
    }
  }

  public readPostListByContent(req: Request, res: Response, next: NextFunction) {
    try {
      const { content } = req.params;
      const { pageId, postNumber, isDescending } = req.query as unknown as IPostList;
      const postList = service.readPostListByData(pageId, postNumber, +isDescending, 'content', content);
      res.status(200).json({ postList });
    } catch (err) {
      next(err);
    }
  }

  public updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, content } = req.body as IUpdatePost;
      service.updatePost(+id, title, content);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  public deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      service.deletePost(+id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
}

export default PostController;
