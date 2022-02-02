/* eslint-disable no-param-reassign */
import { IJsx } from './jsx';

type TState = Record<string, any>;
type THash = Record<string, ChildNode>;

abstract class Component {
  target: HTMLElement;
  props: TState;
  state: TState;

  // constructor에서 state를 지정하기 위해 비동기 함수 사용
  constructor(target: HTMLElement, props = {}) {
    this.target = target;
    this.props = props;
    this.state = {};
    requestAnimationFrame(() => {
      this.render();
      this.componentDidMount();
      this.setDelegation();
    });
  }

  private render() {
    const { target } = this;

    const newNode = target.cloneNode(true) as HTMLElement;
    const newElements = this.createElement(this.markup());
    newNode.replaceChildren(newElements);

    const oldChildNodes = [...target.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);
    for (let i = 0; i < max; i++) {
      this.updateElement(target, newChildNodes[i], oldChildNodes[i]);
    }

    this.appendComponent(target);

    requestAnimationFrame(() => this.setEvent());
  }

  private createElement(node: IJsx | string) {
    // string인 경우 텍스트 노드를 리턴
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }

    const { type, props, children } = node;

    // element를 만듦
    const element = ['svg', 'circle'].includes(type)
      ? document.createElementNS('http://www.w3.org/2000/svg', type)
      : document.createElement(type);

    // props가 있는 경우에 attribute를 추가
    if (props) {
      Object.entries(props).forEach(([name, value]) => {
        element.setAttribute(name, value);
      });
    }

    // state를 render할 때 문자열이 아닌 경우 에러 방지
    const parseChildren = children.map((child) => {
      if (typeof child !== 'object') return String(child);
      return child;
    });

    // 재귀적으로 함수를 실행하고 현재 element에 append
    const createElementArr = parseChildren.map((jsx) => this.createElement(jsx));
    createElementArr.forEach((createElement) => {
      element.appendChild(createElement);
    });

    return element;
  }

  private updateElement(parent: HTMLElement, newNode: ChildNode, oldNode: ChildNode) {
    // 하위 컴포넌트는 하위 컴포넌트에서 비교(component라는 attribute가 있으면 비교하지 않는다)
    if (
      oldNode instanceof HTMLElement &&
      oldNode.getAttribute('component') &&
      newNode instanceof HTMLElement &&
      newNode.getAttribute('component')
    )
      return;

    // oldNode만 존재하면 remove, newNode만 존재하면 append
    if (!newNode && oldNode) return parent.removeChild(oldNode);
    if (newNode && !oldNode) return parent.appendChild(newNode);

    // oldNode와 newNode가 텍스트 노드인경우 교체
    if (newNode instanceof Text && oldNode instanceof Text) {
      if (oldNode.nodeValue === newNode.nodeValue) return;
      oldNode.nodeValue = newNode.nodeValue;
      return;
    }

    // html tag가 바뀔경우 전체를 replace
    if (newNode.nodeName !== oldNode.nodeName) {
      // const index = [...parent.childNodes].indexOf(oldNode);
      // oldNode.remove();
      // parent.appendChild(newNode);
      parent.replaceChild(newNode, oldNode);
      return;
    }

    if (!(newNode instanceof HTMLElement && oldNode instanceof HTMLElement)) throw new Error('update error');

    let hasKey = false;
    if (newNode.firstElementChild?.getAttribute('key') && oldNode.firstElementChild?.getAttribute('key')) {
      this.caseOfKey(oldNode, newNode);
      hasKey = true;
    }

    this.changeAttributes(oldNode, newNode);

    if (hasKey) return;

    const newChildNodes = [...newNode.childNodes];
    const oldChildNodes = [...oldNode.childNodes];
    const max = Math.max(newChildNodes.length, oldChildNodes.length);
    for (let i = 0; i < max; i++) {
      this.updateElement(oldNode, newChildNodes[i], oldChildNodes[i]);
    }
  }

  // newNode의 key가 oldNode의 key에 존재한다면 바꾸지 않음
  private caseOfKey(oldNode: HTMLElement, newNode: HTMLElement) {
    const newKeyHashTable: THash = {};
    const oldKeyHashTable: THash = {};
    const newChildNodes = [...newNode.childNodes];
    const oldChildNodes = [...oldNode.childNodes];

    const keyOrderArr: string[] = [];
    newChildNodes.forEach((newChildNode) => {
      const key = (newChildNode as HTMLElement).getAttribute('key');
      if (!key) throw new Error('key is not defined');
      newKeyHashTable[key] = newChildNode;
      keyOrderArr.push(key);
    });
    oldChildNodes.forEach((oldChildNode) => {
      const key = (oldChildNode as HTMLElement).getAttribute('key');
      if (!key) throw new Error('key is not defined');
      oldKeyHashTable[key] = oldChildNode;
    });

    const changeArr: ChildNode[] = [];
    keyOrderArr.forEach((key) => {
      const oldElement = oldKeyHashTable[key];
      const newElement = newKeyHashTable[key];
      if (oldElement) changeArr.push(oldElement);
      else changeArr.push(newElement);
    });

    oldNode.firstElementChild!.replaceWith(...changeArr);
  }

  private changeAttributes(oldNode: HTMLElement, newNode: HTMLElement) {
    const oldAttributes = [...oldNode.attributes];
    const newAttributes = [...newNode.attributes];
    oldAttributes.forEach(({ name }) => {
      if (newNode.getAttribute(name) === null) oldNode.removeAttribute(name);
    });
    newAttributes.forEach(({ name, value: newValue }) => {
      const oldValue = oldNode.getAttribute(name) || '';
      if (newValue !== oldValue) oldNode.setAttribute(name, newValue);
    });
  }

  // 자식 component를 추가하는 메소드
  // jsx에서 클래스를 xml 형태로 불러오지 못하기 때문에 필요
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public appendComponent(target: HTMLElement) {}

  public markup() {
    return '';
  }

  // addDelegation을 넣는 메서드
  public setDelegation() {}

  // addEvent를 넣는 메서드
  public setEvent() {}

  public addDelegation(eventType: keyof DocumentEventMap, selector: string, callback: (e?: Event) => void) {
    this.target.addEventListener(eventType, (e) => {
      if ((e.target as HTMLElement).closest(selector)) {
        callback(e);
      }
    });
  }

  public addEvent(eventType: keyof DocumentEventMap, eventTarget: HTMLElement, callback: () => void) {
    eventTarget.removeEventListener(eventType, callback);
    eventTarget.addEventListener(eventType, callback);
  }

  public componentDidMount() {}

  // state가 바뀌지 않았을 때 업데이트를 하지 않음
  public setState(changeState: TState, cb?: Function) {
    if (!this.checkNeedUpdate(changeState)) return;
    requestAnimationFrame(() => {
      this.componentDidUpdate({ ...this.state }, { ...this.state, ...changeState });
      this.state = { ...this.state, ...changeState };
      this.render();
      cb?.();
    });
  }

  private checkNeedUpdate(changeState: TState) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in changeState) {
      if (!Object.is(changeState[key], this.state[key])) {
        return true;
      }
    }
    return false;
  }

  public componentDidUpdate(_state: TState, _nextState: TState) {}
}

export default Component;
