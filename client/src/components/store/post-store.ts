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
}

const POST_LIST_KEY = 'postList';
const SEARCH_POST_LIST_KEY = 'searchPostList';
const POST_KEY = 'post';

class PostStore extends LocalStore {
  state: IState;

  constructor() {
    super();
    this.state = { post: {}, postList: {}, searchPostList: {} };
  }

  public async getPostList(pageId: number, postNumber: number, isDescending: boolean) {
    try {
      const key = `pageId:${pageId} postNumber${postNumber}`;
      const state = this.getLocalStorage(POST_LIST_KEY, {}) as IState;
      if (state[POST_LIST_KEY] && state[POST_LIST_KEY][key]) {
        console.log('getPostList 존재');
      } else {
        console.log('getPostList 존재안함');
        const { postList } = await getPostList(pageId, postNumber, isDescending);
        this.setLocalStorage<TPostList>(POST_LIST_KEY, { [key]: postList });
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async getSearchPostList(
    searchType: TSearchType,
    searchContent: string,
    pageId: number,
    postNumber: number,
    isDescending: boolean,
  ) {
    try {
      const key = `searchType:${searchType} searchContent:${searchContent} pageId:${pageId} postNumber${postNumber}`;
      const state = this.getLocalStorage(SEARCH_POST_LIST_KEY, {}) as IState;
      if (state[SEARCH_POST_LIST_KEY] && state[SEARCH_POST_LIST_KEY][key]) {
        console.log('getSearchPostList 존재');
      } else {
        console.log('getSearchPostList 존재안함');
        const { postList } = await getSearchPostList(searchType, searchContent, pageId, postNumber, isDescending);
        this.setLocalStorage<TPostList>(SEARCH_POST_LIST_KEY, { [key]: postList });
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default new PostStore();
