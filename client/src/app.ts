import Router from './core/router';
import { ClassContructor, IRoute } from './core/types';
import NotFoundPage from './pages/not-found-page';
import PostListPage from './pages/post-list-page';
import PostPage from './pages/post-page';
import PostWritePage from './pages/post-write-page';
import { addLoader } from './utils/loader';

class App {
  target: HTMLElement;
  loaderTarget: HTMLElement;
  routes: IRoute[];
  NotFoundPage: ClassContructor;

  constructor(target: HTMLElement, loaderTarget: HTMLElement) {
    this.target = target;
    this.loaderTarget = loaderTarget;
    this.routes = [
      { path: '/', component: PostListPage },
      { path: '/post/write', component: PostWritePage },
      { path: '/post/modify/:postId', component: PostWritePage },
      { path: '/post/search', component: PostListPage },
      { path: '/post/:postId', component: PostPage },
      { path: '/:pageId', component: PostListPage },
    ];
    this.NotFoundPage = NotFoundPage;
    this.init();
    this.render();
  }

  init() {
    addLoader(this.loaderTarget);
  }

  render() {
    new Router(this.target, this.routes, this.NotFoundPage);
  }
}

export default App;
