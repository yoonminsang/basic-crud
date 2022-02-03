/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';

interface IProps {
  value: string;
  placeholder?: string;
  maxlength?: number;
  class?: string;
}

class TextArea extends Component {
  constructor(target: HTMLElement, props: IProps) {
    super(target, props);
  }

  public markup(): string {
    const { value, placeholder, maxlength } = this.props;
    return (
      <textarea class="textarea" placeholder={placeholder || ''} maxlength={maxlength || ''} required>
        {value}
      </textarea>
    );
  }
}

export default TextArea;
