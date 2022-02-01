/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import Header from '@/components/common/header';
import PostList from '@/components/post-list';

class PostListPage extends Component {
  public markup(): string {
    return (
      <div>
        <header class="header" component />
        <content class="post-list" component />
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $header = target.querySelector('.header') as HTMLElement;
    const $postList = target.querySelector('.post-list') as HTMLElement;
    new Header($header);
    new PostList($postList);
  }
}

export default PostListPage;
