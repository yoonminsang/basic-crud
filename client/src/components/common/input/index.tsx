/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';

interface IProps {
  type?: string;
  value?: string;
  placeholder?: string;
  maxlength?: number;
  class?: string;
}

class Input extends Component {
  constructor(target: HTMLElement, props: IProps) {
    super(target, props);
  }

  public markup(): string {
    const { type, value, placeholder, maxlength } = this.props;
    return <input class="input" type={type || 'text'} value={value} placeholder={placeholder} maxlength={maxlength} />;
  }
}

export default Input;
