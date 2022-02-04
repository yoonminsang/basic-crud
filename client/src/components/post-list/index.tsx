/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import { IPost } from '@/types/IPost';
import postStore from '../../store/post-store';
import './style.css';
import { useHistory } from '@/core/routerHooks';
import { IRouterState } from '@/core/types';
import { parseTime } from '@/utils/parser';
import Search from './search';
import PostListHeader from './post-list-header';

interface IState {
  postList?: IPost[];
  postNumber: number;
  isDescending: number;
}

class PostList extends Component {
  state: IState;
  history: IRouterState;

  constructor(target: HTMLElement) {
    super(target);
    this.state = { postList: undefined, postNumber: 30, isDescending: 1 };
    this.history = useHistory();
  }

  public markup(): string {
    const { postList } = this.state;
    if (!postList) return '';
    return (
      <div class="post-list-wrapper">
        <div class="post-list-header-container" component />
        <div class="content-search" component />
        {postList && postList.length ? (
          <ul class="post-list">
            <li class="post-title" key="0">
              <div class="title">제목</div>
              <div class="user">닉네임</div>
              <div class="date">작성일</div>
            </li>

            {postList.map(({ title, user, date, id }) => (
              <li key={id} class="post-item">
                <a class="title" href={`/${id}`}>
                  {title}
                </a>
                <a class="user" href={`/search?searchType=user&searchContent=${user}`}>
                  {user}
                </a>
                <div class="date">{parseTime(date)}</div>
              </li>
            ))}
          </ul>
        ) : (
          // TODO: 스타일
          <div>글 목록이 존재하지 않습니다</div>
        )}
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const { postList, postNumber, isDescending } = this.state;
    if (!postList) return;
    const $header = target.querySelector('.post-list-header-container') as HTMLElement;
    const $search = target.querySelector('.content-search') as HTMLElement;
    new PostListHeader($header, { postNumber, isDescending });
    new Search($search);
  }

  public async componentDidMount() {
    try {
      const { pathname, query } = this.history;
      const { searchType, searchContent } = query;
      const pageId = query.pageId || 1;
      if (pathname === '/search' && searchType && searchContent) {
        await postStore.getSearchPostList(searchType, searchContent, pageId);
        postStore.subscribe(() =>
          this.setState({ postList: postStore.getCashSearchPostList(searchType, searchContent, pageId) }),
        );
      } else {
        await postStore.getPostList(pageId);
        postStore.subscribe(() =>
          this.setState({
            postList: postStore.getCashPostList(pageId),
            isDescending: postStore.state.isDescending,
            postNumber: postStore.state.postNumber,
          }),
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async componentDidUpdate(state: IState, nextState: IState) {
    const { pathname, query } = this.history;
    const { searchType, searchContent } = query;
    const pageId = query.pageId || 1;
    if (state.isDescending !== nextState.isDescending || state.postNumber !== nextState.postNumber) {
      if (pathname === '/search' && searchType && searchContent) {
        await postStore.getSearchPostList(searchType, searchContent, pageId);
      } else {
        await postStore.getPostList(pageId);
      }
    }
  }
}

export default PostList;
