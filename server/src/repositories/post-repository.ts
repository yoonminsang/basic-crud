import connect from '@/config/db-config';
import { TSearchType } from '@/types';

export interface IPost {
  title: string;
  user: string;
  date: Date;
  id: number;
}

export interface IPostDetail extends IPost {
  content: string;
}

interface IPostList {
  postList: IPost[];
  pageCount: number;
}

// TODO: db try catch
class PostRepository {
  private allPostList(): IPostDetail[] {
    connect().push('/post', [], false);
    return connect().getObject<IPostDetail[]>('/post');
  }

  public createPost(title: string, content: string, user: string): number {
    const allPostList = this.allPostList();
    const nextId = allPostList.length ? allPostList[allPostList.length - 1].id + 1 : 1;
    const date = new Date();
    connect().push('/post', [{ id: nextId, title, content, user, date }], false);
    return nextId;
  }

  public readPost(id: number): IPostDetail | undefined {
    const allPostList = this.allPostList();
    const post = allPostList.find((_post) => _post.id === id);
    return post;
  }

  private filterPostList(postList: IPost[]): IPost[] {
    const filterPostList = postList.map(({ id, title, user, date }) => ({
      id,
      title,
      user,
      date,
    }));
    return filterPostList;
  }

  public readPostList(pageId: number, postNumber: number, isDescending: number): IPostList {
    const allPostList = this.allPostList();
    if (isDescending) allPostList.reverse();
    const pageCount = Math.ceil(allPostList.length / postNumber);
    const slicePostList = allPostList.slice(postNumber * (pageId - 1), postNumber * pageId);
    const postList = this.filterPostList(slicePostList);
    return { postList, pageCount };
  }

  public readSearchPostList(pageId: number, postNumber: number, isDescending: number, user: string): IPostList {
    const allPostList = this.allPostList();
    if (isDescending) allPostList.reverse();
    const postListByData = allPostList.filter((post) => post.user === user);
    const pageCount = Math.ceil(postListByData.length / postNumber);
    const slicePostList = postListByData.slice(postNumber * (pageId - 1), postNumber * pageId);
    const postList = this.filterPostList(slicePostList);
    return { postList, pageCount };
  }

  public readSearchPostListByReg(
    pageId: number,
    postNumber: number,
    isDescending: number,
    searchType: TSearchType,
    searchContent: string,
  ): IPostList {
    const allPostList = this.allPostList();
    if (isDescending) allPostList.reverse();
    const regex = RegExp(searchContent, 'gi');
    const postListByData = allPostList.filter((post) => post[searchType].match(regex));
    const pageCount = Math.ceil(postListByData.length / postNumber);
    const slicePostList = postListByData.slice(postNumber * (pageId - 1), postNumber * pageId);
    const postList = this.filterPostList(slicePostList);
    return { postList, pageCount };
  }

  public updatePost(id: number, title: string, content: string): void {
    const allPostList = this.allPostList();
    const updatePost = allPostList.map((post) => {
      const { id: updateId } = post;
      if (updateId === id) return { ...post, title, content };
      return post;
    });
    connect().push('/post', updatePost);
  }

  public deletePost(id: number): void {
    const allPostList = this.allPostList();
    const deletePost = allPostList.filter((post) => post.id !== id);
    connect().push('/post', deletePost);
  }
}

export default PostRepository;
