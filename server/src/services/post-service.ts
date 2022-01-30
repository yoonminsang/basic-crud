import { POST_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';
import PostRepository from '@/repositories/post-repository';

const postRepository = new PostRepository();

class PostService {
  createPost(title: string, content: string, user: string) {
    const postId = postRepository.createPost(title, content, user);
    return postId;
  }

  // async readPost(id: number) {
  //   const postData = await getCustomRepository(PostRepository).readPost(id);
  //   if (!postData) {
  //     throw errorGenerator({
  //       status: 400,
  //       message: POST_ERROR_MESSAGE.notFoundPostId[0],
  //       from: FROM,
  //     });
  //   }
  //   const isUpdated = String(postData.createdAt) !== String(postData.updatedAt);
  //   const post = { ...postData, isUpdated };
  //   return post;
  // }

  readPostList(pageId: number, postNumber: number) {
    const posts = postRepository.readPostList(pageId, postNumber);
    if (!posts.length) {
      throw new CustomError(POST_ERROR.notFoundPosts);
    }
    return posts;
  }

  // async updatePost(id: number, title: string, content: string, userId: string) {
  //   const post = await getCustomRepository(PostRepository).getPostForUserId(id);
  //   if (!post) {
  //     throw errorGenerator({
  //       status: 400,
  //       message: POST_ERROR_MESSAGE.notFoundPostId[0],
  //       from: FROM,
  //     });
  //   }
  //   if (post.userId !== userId) {
  //     throw errorGenerator({
  //       status: 403,
  //       message: POST_ERROR_MESSAGE.diffrentUserId[0],
  //       from: FROM,
  //     });
  //   }
  //   await getCustomRepository(PostRepository).updatePost(id, title, content);
  // }

  // async deletePost(id: number, userId: string) {
  //   const post = await getCustomRepository(PostRepository).getPostForUserId(id);
  //   if (!post) {
  //     throw errorGenerator({
  //       status: 400,
  //       message: POST_ERROR_MESSAGE.notFoundPostId[0],
  //       from: FROM,
  //     });
  //   }
  //   if (post.userId !== userId) {
  //     throw errorGenerator({
  //       status: 403,
  //       message: POST_ERROR_MESSAGE.diffrentUserId[0],
  //       from: FROM,
  //     });
  //   }
  //   await getCustomRepository(PostRepository).deletePost(id);
  // }
}

export default PostService;
