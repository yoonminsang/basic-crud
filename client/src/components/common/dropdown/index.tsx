/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsx from '@/core/jsx';
import Component from '@/core/component';
import './style.css';
import Button from '../button';

interface IProps {
  dropdowns: string[] | number[];
  changeText: (dropdown: any) => any;
  selectedDropdown: string | number;
  eventHandler: (dropdown: any) => void;
}

let num = 0;

class Dropdown extends Component {
  props: IProps;

  constructor(target: HTMLElement, props: IProps) {
    super(target, props);
    this.state = { isDropdown: false, class: `js-dropdown-${num}` };
    this.props = props;
    num++;
  }

  public markup(): string {
    const { dropdowns, changeText } = this.props;
    const { isDropdown } = this.state;
    return (
      <div class="dropdown-wrapper">
        <div class="btn-dropdown-container" component />
        <div class={`dropdown ${!isDropdown ? 'blind' : ''}`}>
          {dropdowns.map((dropdown) => (
            <button type="button" class="js-search-type" data-dropdown={dropdown}>
              {changeText(dropdown)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  public appendComponent(target: HTMLElement): void {
    const $dropdownButton = target.querySelector('.btn-dropdown-container') as HTMLElement;
    new Button($dropdownButton, {
      type: 'button',
      text: this.props.changeText(this.props.selectedDropdown),
      class: `white ${this.state.class}`,
    });
  }

  public setDelegation(): void {
    this.addDelegation('click', `.${this.state.class}`, () => {
      this.setState({ isDropdown: !this.state.isDropdown });
    });
    this.addDelegation('click', '.js-search-type', (e: Event) => {
      const dropdown = (e.target as HTMLElement).dataset.dropdown as string;
      this.props.eventHandler(dropdown);
      this.setState({ isDropdown: false });
    });
  }
}

export default Dropdown;
