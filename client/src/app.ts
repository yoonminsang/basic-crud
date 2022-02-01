import Router from './core/router';
import { ClassContructor, IRoute } from './core/types';
import NotFoundPage from './pages/not-found-page';

class App {
  target: HTMLElement;
  routes: IRoute[];
  NotFoundPage: ClassContructor;

  constructor(target: HTMLElement) {
    this.target = target;
    this.routes = [];
    this.NotFoundPage = NotFoundPage;
    this.render();
  }

  render() {
    new Router(this.target, this.routes, this.NotFoundPage);
  }
}

export default App;
