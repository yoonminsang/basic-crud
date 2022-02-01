type TState = Record<string, any>;

export interface IJsx {
  type: string;
  props: TState;
  children: IJsx[];
}

function jsx(type: string, props: TState, ...children: IJsx[]): IJsx {
  return { type, props, children: children.flat() };
}

export default jsx;
