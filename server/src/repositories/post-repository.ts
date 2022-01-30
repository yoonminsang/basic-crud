import connect from '@/config/db-config';

interface IPost {
  id: number;
  title: string;
  content: string;
  user: string;
}

// TODO: db try catch
class PostRepository {
  private allPostList() {
    return connect().getObject<IPost[]>('/post');
  }

  public createPost(title: string, content: string, user: string) {
    const allPostList = this.allPostList();
    const nextId = allPostList.length ? allPostList[allPostList.length - 1].id + 1 : 1;
    connect().push('/post', [{ id: nextId, title, content, user }], false);
    return nextId;
  }

  // public readPost(id: number) {}

  public readPostList(pageId: number, postNumber: number) {
    const allPostList = this.allPostList();
    const postList = allPostList.slice(postNumber * (pageId - 1), postNumber * pageId);
    const filterPostList = postList.map(({ id, title, user }) => ({
      id,
      title,
      user,
    }));
    return filterPostList;
  }

  // public updatePost(id: number, title: string, content: string) {}

  // public deletePost(id: number) {}

  // public checkPost(id: number) {}
}

export default PostRepository;
