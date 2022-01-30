import connect from '@/config/db-config';

class PostRepository {
  createPost(title: string, content: string, user: string) {
    const posts = connect().getData('/post');
    const nextId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    connect().push('/post', [{ id: nextId, title, content, user }], false);
    return nextId;
  }

  // async readPost(id: number) {}

  // async readPostList(pageId: number, postNumber: number) {}

  // async updatePost(id: number, title: string, content: string) {}

  // async deletePost(id: number) {}

  // async checkPost(id: number) {}
}

export default PostRepository;
