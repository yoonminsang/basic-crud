import LocalStore from '@/core/local-store';
import { IPost, IPostDetail } from '@/types/IPost';
import {
  getPostList,
  getSearchPostList,
  getPost,
  createPost,
  updatePost,
  deletePost,
  TSearchType,
} from '@/utils/api/post';

type TPostList = Record<string, IPost[]>;
type TPost = Record<string, IPostDetail>;
interface IState {
  post: TPost;
  postList: TPostList;
  searchPostList: TPostList;
  postNumber: number;
  isDescending: number;
}

const POST_LIST_KEY = 'postList';
const SEARCH_POST_LIST_KEY = 'searchPostList';
const POST_KEY = 'post';
const POST_NUMBER = 'postNumber';
const IS_DESCENDING = 'isDescending';

const initialState = { post: {}, postList: {}, searchPostList: {}, postNumber: 30, isDescending: 1 };

class PostStore extends LocalStore {
  state: IState;

  constructor() {
    super();
    this.state = initialState;
    this.init();
  }

  private init() {
    const post = this.getLocalStorage(POST_KEY, initialState.post) as IState;
    const postList = this.getLocalStorage(POST_LIST_KEY, initialState.postList) as IState;
    const searchPostList = this.getLocalStorage(SEARCH_POST_LIST_KEY, initialState.searchPostList) as IState;
    const postNumber = this.getLocalStorage(POST_NUMBER, initialState.postNumber) as IState;
    const isDescending = this.getLocalStorage(IS_DESCENDING, initialState.isDescending) as IState;
    this.setState({ postList, searchPostList, post, postNumber, isDescending });
  }

  public setPostNumber(postNumber: number) {
    this.setLocalStorage(POST_NUMBER, postNumber);
  }

  public setDescending(isDescending: number) {
    this.setLocalStorage(IS_DESCENDING, isDescending);
  }

  private getPostListKey(pageId: number) {
    const { postNumber, isDescending } = this.state;
    const key = `pageId:${pageId} postNumber:${postNumber} isDescending:${isDescending}`;
    return key;
  }

  private getSearchPostListKey(searchType: TSearchType, searchContent: string, pageId: number) {
    const { postNumber, isDescending } = this.state;
    const key = `searchType:${searchType} searchContent:${searchContent} pageId:${pageId} postNumber${postNumber} isDescending:${isDescending}`;
    return key;
  }

  public getCashPostList(pageId: number) {
    const key = this.getPostListKey(pageId);
    return this.state.postList[key];
  }

  public getCashSearchPostList(searchType: TSearchType, searchContent: string, pageId: number) {
    const key = this.getSearchPostListKey(searchType, searchContent, pageId);
    return this.state.searchPostList[key];
  }

  public async getPostList(pageId: number) {
    const { postNumber, isDescending } = this.state;
    try {
      const key = this.getPostListKey(pageId);
      const state = this.getLocalStorage(POST_LIST_KEY, {}) as IState;
      if (!state[POST_LIST_KEY]?.[key]) {
        const { postList } = await getPostList(pageId, postNumber, isDescending);
        this.setLocalStorage<TPostList>(POST_LIST_KEY, { ...this.state.postList, [key]: postList });
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async getSearchPostList(searchType: TSearchType, searchContent: string, pageId: number) {
    try {
      const { postNumber, isDescending } = this.state;
      const key = this.getSearchPostListKey(searchType, searchContent, pageId);
      const state = this.getLocalStorage(SEARCH_POST_LIST_KEY, {}) as IState;
      if (!state[SEARCH_POST_LIST_KEY]?.[key]) {
        const { postList } = await getSearchPostList(searchType, searchContent, pageId, postNumber, isDescending);
        this.setLocalStorage<TPostList>(SEARCH_POST_LIST_KEY, { ...this.state.postList, [key]: postList });
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async getPost(postId: number) {
    try {
      const key = postId;
      const state = this.getLocalStorage(POST_KEY, {}) as IState;
      if (!state[POST_KEY][key]) {
        const { post } = await getPost(postId);
        this.setLocalStorage<TPost>(POST_KEY, { [key]: post });
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async createPost(title: string, content: string, user: string) {
    try {
      const { postId } = await createPost(title, content, user);
      this.initCash();
      return postId;
    } catch (err) {
      console.error(err);
    }
  }

  public async updatePost(postId: number, title: string, content: string) {
    try {
      await updatePost(postId, title, content);
      this.initCash();
    } catch (err) {
      console.error(err);
    }
  }

  public async deletePost(postId: number) {
    try {
      await deletePost(postId);
      this.initCash();
    } catch (err) {
      console.error(err);
    }
  }

  private initCash() {
    this.setLocalStorage(POST_KEY, initialState.post);
    this.setLocalStorage(POST_LIST_KEY, initialState.postList);
    this.setLocalStorage(SEARCH_POST_LIST_KEY, initialState.searchPostList);
  }
}

export default new PostStore();
