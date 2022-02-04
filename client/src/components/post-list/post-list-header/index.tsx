/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import Button from '@/components/common/button';
import postStore from '@/store/post-store';
import Dropdown from '@/components/common/dropdown';

const postNumbers = [30, 50, 100];
const descendings = [1, 0];
const getPostNumber = (postNumber: number) => {
  return `${postNumber}개`;
};
const getDescending = (descending: 1 | 0) => {
  const obj = { 1: '내림차순', 0: '오름차순' };
  return obj[descending];
};

interface IState {
  postNumberDropdown: boolean;
  descendingDropdown: boolean;
}

interface IProps {
  postNumber: number;
  isDescending: number;
}

class PostListHeader extends Component {
  state: IState;
  props: IProps;

  constructor(target: HTMLElement, props: IProps) {
    super(target, props);
    this.state = { postNumberDropdown: false, descendingDropdown: false };
    this.props = props;
  }

  public markup(): string {
    return (
      <div class="flex">
        <div class="dropdown-post-number-container" component></div>
        <div class="dropdown-descending-container" component></div>
        <div class="create-container" component />
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $button = target.querySelector('.create-container') as HTMLElement;
    const $dropdownPostNumber = target.querySelector('.dropdown-post-number-container') as HTMLElement;
    const $dropdownDescending = target.querySelector('.dropdown-descending-container') as HTMLElement;
    new Button($button, { text: '글쓰기', href: '/write' });
    new Dropdown($dropdownPostNumber, {
      dropdowns: postNumbers,
      changeText: getPostNumber,
      selectedDropdown: this.props.postNumber,
      eventHandler: (postNumber: number) => postStore.setPostNumber(postNumber),
    });
    new Dropdown($dropdownDescending, {
      dropdowns: descendings,
      changeText: getDescending,
      selectedDropdown: this.props.isDescending,
      eventHandler: (descending: number) => postStore.setDescending(descending),
    });
  }

  public setDelegation(): void {
    this.addDelegation('click', '.js-dropdown-post-number', () => {
      this.setState({ postNumberDropdown: !this.state.postNumberDropdown });
    });
  }
}

export default PostListHeader;
