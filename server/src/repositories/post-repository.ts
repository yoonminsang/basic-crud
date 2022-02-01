import connect from '@/config/db-config';
import { COMMON_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';
import { TSearchData } from '@/types';

export interface IPost {
  title: string;
  user: string;
  date: Date;
  id: number;
}

export interface IPostDetail extends IPost {
  content: string;
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

  private filterPostList(postList: IPost[], isDescending: number): IPost[] {
    const filterPostList = postList.map(({ id, title, user, date }) => ({
      id,
      title,
      user,
      date,
    }));
    if (isDescending) filterPostList.reverse();
    return filterPostList;
  }

  public readPostList(pageId: number, postNumber: number, isDescending: number): IPost[] {
    const allPostList = this.allPostList();
    const postList = allPostList.slice(postNumber * (pageId - 1), postNumber * pageId);
    const filterPostList = this.filterPostList(postList, isDescending);
    return filterPostList;
  }

  private getSearchData(searchDataName: TSearchData, post: IPostDetail): string {
    let searchData = '';
    switch (searchDataName) {
      case 'title':
        searchData = post.title;
        break;
      case 'content':
        searchData = post.content;
        break;
      case 'user':
        searchData = post.user;
        break;
      default:
        throw new CustomError(COMMON_ERROR.invalidCode);
    }
    return searchData;
  }

  public readPostListByData(
    pageId: number,
    postNumber: number,
    isDescending: number,
    searchDataName: TSearchData,
    data: string,
  ): IPost[] {
    const allPostList = this.allPostList();
    const regex = RegExp(data, 'gi');
    const postListByData = allPostList.filter((post) => {
      const searchData = this.getSearchData(searchDataName, post);
      return searchData.match(regex);
    });
    const postList = postListByData.slice(postNumber * (pageId - 1), postNumber * pageId);
    // eslint-disable-next-line no-shadow
    const filterPostList = this.filterPostList(postList, isDescending);
    return filterPostList;
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
