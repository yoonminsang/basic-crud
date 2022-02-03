/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import Input from '@/components/common/input';
import Button from '@/components/common/button';
import { TSearchType } from '@/types/IPost';
import { useHistory } from '@/core/routerHooks';
import { IRouterState } from '@/core/types';

const getSearchType = (searchType: TSearchType) => {
  const obj = { title: '제목', content: '내용', user: '닉네임' };
  return obj[searchType];
};

interface IState {
  searchContent: string;
  searchType: TSearchType;
  dropdown: boolean;
}

class Search extends Component {
  state: IState;
  history: IRouterState;

  constructor(target: HTMLElement) {
    super(target);
    this.state = { searchContent: '', searchType: 'title', dropdown: false };
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.history = useHistory();
  }

  public markup(): string {
    const searchTypes: TSearchType[] = ['title', 'content', 'user'];
    return (
      <form class="form-search">
        <div class="input-container" component></div>
        <div class="dropdown-container">
          <div class="btn-dropdown-container" component />
          <div class={`dropdown ${!this.state.dropdown ? 'blind' : ''}`}>
            {searchTypes.map((searchType) => (
              <button type="button" class="js-search-type" data-search-type={searchType}>
                {getSearchType(searchType)}
              </button>
            ))}
          </div>
        </div>
        <div class="btn-container" component></div>
      </form>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $input = target.querySelector('.input-container') as HTMLElement;
    const $dropdownButton = target.querySelector('.btn-dropdown-container') as HTMLElement;
    const $button = target.querySelector('.btn-container') as HTMLElement;
    new Input($input, { type: 'text', value: this.state.searchContent, placeholder: '검색할 내용을 입력하세요' });
    new Button($dropdownButton, {
      type: 'button',
      text: getSearchType(this.state.searchType),
      class: 'white js-dropdown',
    });
    new Button($button, { type: 'submit', text: '검색' });
  }

  public setDelegation(): void {
    this.addDelegation('input', '.input-container', (e: Event) => {
      this.setState({ searchContent: (e.target as HTMLInputElement).value });
    });
    this.addDelegation('click', '.js-dropdown', () => {
      this.setState({ dropdown: !this.state.dropdown });
    });
    this.addDelegation('click', '.js-search-type', (e: Event) => {
      const searchType = (e.target as HTMLElement).dataset.searchType as string;
      this.setState({ dropdown: !this.state.dropdown, searchType });
    });
    this.addDelegation('submit', '.form-search', this.onSearchHandler);
  }

  private onSearchHandler(e: Event) {
    e.preventDefault();
    const { searchType, searchContent } = this.state;
    this.history.push(`/post/search?searchType=${searchType}&searchContent=${searchContent}`);
  }
}

export default Search;
