import { TState } from './types';

abstract class Observable {
  observers: Function[];
  state: TState;

  constructor() {
    this.observers = [];
    this.state = {};
  }

  public setState(nextState: TState, cb?: Function) {
    this.state = { ...this.state, ...nextState };
    this.notify();
    cb?.();
  }

  public subscribe(observer: Function) {
    observer();
    this.observers.push(observer);
  }

  public unsubscribe(observer: Function) {
    this.observers = [...this.observers].filter((subscriber) => subscriber !== observer);
  }

  public unsubscribeAll() {
    this.observers = [];
  }

  private notify() {
    this.observers.forEach((observer) => observer());
  }
}

export default Observable;
