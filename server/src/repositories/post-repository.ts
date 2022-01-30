import connect from '@/config/db-config';

interface IPost {
  id: number;
  title: string;
  content: string;
  user: string;
}

// TODO: db try catch
class PostRepository {
  allPostList() {
    return connect().getObject<IPost[]>('/post');
  }

  createPost(title: string, content: string, user: string) {
    const allPostList = this.allPostList();
    const nextId = allPostList.length ? allPostList[allPostList.length - 1].id + 1 : 1;
    connect().push('/post', [{ id: nextId, title, content, user }], false);
    return nextId;
  }

  // async readPost(id: number) {}

  readPostList(pageId: number, postNumber: number) {
    const allPostList = this.allPostList();
    const postList = allPostList.slice(postNumber * (pageId - 1), postNumber * pageId);
    const filterPostList = postList.map(({ id, title, user }) => ({
      id,
      title,
      user,
    }));
    return filterPostList;
  }

  // async updatePost(id: number, title: string, content: string) {}

  // async deletePost(id: number) {}

  // async checkPost(id: number) {}
}

export default PostRepository;
