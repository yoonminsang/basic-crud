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

interface IState {
  postList: IPost[];
}

class PostList extends Component {
  state: IState;
  history: IRouterState;

  constructor(target: HTMLElement) {
    super(target);
    this.state = { postList: [] };
    this.history = useHistory();
  }

  // TODO: 빈 처리
  public markup(): string {
    const { postList } = this.state;
    return (
      <div>
        {postList.length ? (
          <ul class="post-list">
            <li class="post-title" key="0">
              <div class="title">제목</div>
              <div class="user">유저</div>
              <div class="date">작성일</div>
            </li>

            {postList.map(({ title, user, date, id }) => (
              <li key={id} class="post-item">
                <a class="title" href={`/post/${id}`}>
                  {title}
                </a>
                <a class="user" href={`/post/search?searchType=user&searchContent=${user}`}>
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
        <div class="content-search" component />
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $search = target.querySelector('.content-search') as HTMLElement;
    new Search($search);
  }

  public async componentDidMount() {
    const { pathname, query } = this.history;
    const { searchType, searchContent } = query;
    const pageId = query.pageId || 1;
    if (pathname === '/post/search' && searchType && searchContent) {
      postStore.subscribe(() =>
        this.setState({ postList: postStore.getCashSearchPostList(searchType, searchContent, pageId) }),
      );
      postStore.getSearchPostList(searchType, searchContent, pageId);
    } else {
      postStore.subscribe(() => this.setState({ postList: postStore.getCashPostList(pageId) }));
      postStore.getPostList(pageId);
    }
  }
}

export default PostList;
