/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import Input from '../common/input';
import TextArea from '../common/textarea';
import Button from '../common/button';
import postStore from '@/store/post-store';
import { useHistory } from '@/core/routerHooks';
import { IRouterState } from '@/core/types';
import { createValidation } from '@/utils/validation/post-validation';

interface IState {
  title: string;
  user: string;
  content: string;
}

class PostWrite extends Component {
  state: IState;
  history: IRouterState;

  constructor(target: HTMLElement) {
    super(target);
    this.state = { title: '', user: '', content: '' };
    this.history = useHistory();
    this.createHanlder = this.createHanlder.bind(this);
  }

  public markup(): string {
    return (
      <form class="post-write-wrapper">
        <div class="flex">
          <div class="input-title-container" component />
          <div class="input-user-container" component />
        </div>
        <div class="textarea-container" component />
        <div class="button-container" component />
      </form>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const { title, user, content } = this.state;
    const $inputTitle = target.querySelector('.input-title-container') as HTMLElement;
    const $inputUser = target.querySelector('.input-user-container') as HTMLElement;
    const $textarea = target.querySelector('.textarea-container') as HTMLElement;
    const $button = target.querySelector('.button-container') as HTMLElement;
    new Input($inputTitle, { type: 'text', value: title, placeholder: '제목', class: 'js-title' });
    new Input($inputUser, { type: 'text', value: user, placeholder: '닉네임', class: 'js-user' });
    new TextArea($textarea, { value: content, placeholder: '내용을 입력하세요', class: 'js-textarea' });
    new Button($button, { type: 'submit', text: '저장' });
  }

  public setDelegation(): void {
    this.addDelegation('input', '.js-title', (e) => {
      this.setState({ title: (e.target as HTMLInputElement).value });
    });
    this.addDelegation('input', '.js-user', (e) => {
      this.setState({ user: (e.target as HTMLInputElement).value });
    });
    this.addDelegation('input', '.js-textarea', (e) => {
      this.setState({ content: (e.target as HTMLInputElement).value });
    });
    this.addDelegation('submit', '.post-write-wrapper', this.createHanlder);
  }

  private async createHanlder(e: Event) {
    try {
      e.preventDefault();
      const { title, user, content } = this.state;
      const validation = createValidation(title, user);
      if (validation !== true) {
        // TODO: throw만 하고 catch문에서 모달처리(request함수에서 하는 로딩처리포함)
        alert(validation);
        throw Error(validation);
      }
      const postId = await postStore.createPost(title, content, user);
      this.history.push(`/post/${postId}`);
    } catch (err) {
      console.error(err);
    }
  }
}

export default PostWrite;
