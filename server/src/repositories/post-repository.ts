import connect from '@/config/db-config';

interface IPost {
  id: number;
  title: string;
  content: string;
  user: string;
  date: Date;
}

// TODO: db try catch
class PostRepository {
  private allPostList() {
    connect().push('/post', [], false);
    return connect().getObject<IPost[]>('/post');
  }

  public createPost(title: string, content: string, user: string) {
    const allPostList = this.allPostList();
    const nextId = allPostList.length ? allPostList[allPostList.length - 1].id + 1 : 1;
    const date = new Date();
    connect().push('/post', [{ id: nextId, title, content, user, date }], false);
    return nextId;
  }

  public readPost(id: number) {
    const allPostList = this.allPostList();
    const post = allPostList.find((_post) => _post.id === id);
    return post;
  }

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

  public updatePost(id: number, title: string, content: string) {
    const allPostList = this.allPostList();
    const updatePost = allPostList.map((post) => {
      const { id: updateId } = post;
      if (updateId === id) return { ...post, title, content };
      return post;
    });
    connect().push('/post', updatePost);
  }

  public deletePost(id: number) {
    const allPostList = this.allPostList();
    const deletePost = allPostList.filter((post) => post.id !== id);
    connect().push('/post', deletePost);
  }
}

export default PostRepository;
