/* eslint-disable no-param-reassign */
type TState = Record<string, any>;

export interface IJsx {
  type: string;
  props: TState;
  children: IJsx[];
}

function jsx(type: string, props: TState, ...children: IJsx[]): IJsx {
  if (props) {
    Object.keys(props).forEach((key) => {
      if (props[key] === false || props[key] === undefined) delete props[key];
    });
  }
  return { type, props, children: children.flat() };
}

export default jsx;
