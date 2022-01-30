import { POST_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';
import PostRepository from '@/repositories/post-repository';

const postRepository = new PostRepository();

class PostService {
  public createPost(title: string, content: string, user: string) {
    const postId = postRepository.createPost(title, content, user);
    return postId;
  }

  public readPost(id: number) {
    const post = postRepository.readPost(id);
    if (!post) {
      throw new CustomError(POST_ERROR.notFoundPost);
    }
    return post;
  }

  public readPostList(pageId: number, postNumber: number, isDescending: number) {
    const posts = postRepository.readPostList(pageId, postNumber, isDescending);
    if (!posts.length) {
      throw new CustomError(POST_ERROR.notFoundPostList);
    }
    return posts;
  }

  public updatePost(id: number, title: string, content: string) {
    const post = postRepository.readPost(id);
    if (!post) {
      throw new CustomError(POST_ERROR.notFoundPost);
    }
    postRepository.updatePost(id, title, content);
  }

  public deletePost(id: number) {
    const post = postRepository.readPost(id);
    if (!post) {
      throw new CustomError(POST_ERROR.notFoundPost);
    }
    postRepository.deletePost(id);
  }
}

export default PostService;
