type TState = Record<string, any>;

export interface IJsx {
  type: string;
  props: TState;
  children: IJsx[];
}

function jsx(type: string, props: TState, ...children: IJsx[]): IJsx {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in props) {
    // eslint-disable-next-line no-param-reassign
    if (!props[key]) props[key] = '';
  }
  return { type, props, children: children.flat() };
}

export default jsx;
