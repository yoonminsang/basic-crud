import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';
import PostWrite from '.';

const renderWriteComplex = () => {
  const { body } = document;
  const $target = document.createElement('div');
  body.appendChild($target);
  new PostWrite($target, { modify: false });
  jest.runAllTimers();
  const title = () => $target.querySelector('.input-title-container')?.querySelector('input') as HTMLInputElement;
  const user = () => $target.querySelector('.input-user-container')?.querySelector('input') as HTMLInputElement;
  const content = () => $target.querySelector('.textarea-container')?.querySelector('textarea') as HTMLTextAreaElement;
  const button = () => $target.querySelector('.button-container')?.querySelector('button') as HTMLElement;
  const onTitleInput = (str: string) => {
    userEvent.type(title(), str);
    jest.runAllTimers();
  };
  const onUserInput = (str: string) => {
    userEvent.type(user(), str);
    jest.runAllTimers();
  };
  const onContentInput = (str: string) => {
    userEvent.type(content(), str);
    jest.runAllTimers();
  };
  const onClick = async () => {
    userEvent.click(button());
    await flushPromises();
  };
  return { title, user, content, button, onTitleInput, onUserInput, onContentInput, onClick };
};

const renderModifyComplex = async () => {
  const { body } = document;
  const $target = document.createElement('div');
  body.appendChild($target);
  new PostWrite($target, { modify: true });
  jest.runAllTimers();
  await flushPromises();
  jest.runAllTimers();
  const title = () => $target.querySelector('.input-title-container')?.querySelector('input') as HTMLInputElement;
  const user = () => $target.querySelector('.input-user-container')?.querySelector('input') as HTMLInputElement;
  const content = () => $target.querySelector('.textarea-container')?.querySelector('textarea') as HTMLTextAreaElement;
  const button = () => $target.querySelector('.button-container')?.querySelector('button') as HTMLElement;
  const onTitleInput = (str: string) => {
    userEvent.type(title(), str);
    jest.runAllTimers();
  };
  const onUserInput = (str: string) => {
    userEvent.type(user(), str);
    jest.runAllTimers();
  };
  const onContentInput = (str: string) => {
    userEvent.type(content(), str);
    jest.runAllTimers();
  };
  const onClick = async () => {
    userEvent.click(button());
    await flushPromises();
  };
  return { title, user, content, button, onTitleInput, onUserInput, onContentInput, onClick };
};

beforeEach(() => {
  window.localStorage.clear();
  fetchMock.resetMocks();
  jest.useFakeTimers();
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => setTimeout(callback));
});

describe('post write component', () => {
  describe('write', () => {
    it('should change input', async () => {
      const { title, user, content, onTitleInput, onUserInput, onContentInput } = renderWriteComplex();
      const TITLE = '??????';
      const USER = '??????';
      const CONTENT = '??????';
      onTitleInput(TITLE);
      onUserInput(USER);
      onContentInput(CONTENT);
      expect(title().value).toBe(TITLE);
      expect(user().value).toBe(USER);
      expect(content().value).toBe(CONTENT);
    });
    it('should success submit', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ postId: 1 }));
      const { onTitleInput, onUserInput, onContentInput, onClick } = renderWriteComplex();
      const TITLE = '??????';
      const USER = '??????';
      const CONTENT = '??????';
      onTitleInput(TITLE);
      onUserInput(USER);
      onContentInput(CONTENT);
      jest.runAllTimers();
      await onClick();
      jest.runAllTimers();
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/post', expect.anything());
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    it('should fail submit', async () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      const { onTitleInput, onContentInput, onClick } = renderWriteComplex();
      const TITLE = '??????';
      const CONTENT = '??????';
      onTitleInput(TITLE);
      onContentInput(CONTENT);
      await onClick();
      expect(window.alert).toBeCalledTimes(1);
    });
  });

  describe('modify', () => {
    it('should change input except user', async () => {
      window.history.pushState(null, '', '/modify/1');
      fetchMock.mockResponseOnce(JSON.stringify({ post: { id: 1, title: '??????', user: '??????', content: '??????' } }));
      const { title, user, content, onTitleInput, onUserInput, onContentInput } = await renderModifyComplex();
      const TITLE = '????????????';
      const USER = '????????????';
      const CONTENT = '????????????';
      onTitleInput(`{backspace}{backspace}${TITLE}`);
      onUserInput(`{backspace}{backspace}${USER}`);
      onContentInput(`{backspace}{backspace}${CONTENT}`);
      jest.runAllTimers();
      expect(title().value).toBe(TITLE);
      expect(user().value).not.toBe(USER);
      expect(user().value).toBe('??????');
      expect(content().value).toBe(CONTENT);
    });

    it('should success submit', async () => {
      window.history.pushState(null, '', '/modify/1');
      fetchMock.mockResponseOnce(JSON.stringify({ id: 1, title: '??????', user: '??????', content: '??????' }));
      const { onTitleInput, onContentInput, onClick } = await renderModifyComplex();
      const TITLE = '????????????';
      const CONTENT = '????????????';
      onTitleInput(`{backspace}{backspace}${TITLE}`);
      onContentInput(`{backspace}{backspace}${CONTENT}`);
      jest.runAllTimers();
      fetchMock.doMockOnce();
      await onClick();
      jest.runAllTimers();
      expect(fetch).toHaveBeenCalledTimes(2);
      // TODO: ????????? ??????
      // expect(window.location.pathname).toBe('/1');
    });
    it('should fail submit', async () => {
      window.history.pushState(null, '', '/modify/1');
      fetchMock.mockResponseOnce(JSON.stringify({ id: 1, title: '??????', user: '??????', content: '??????' }));
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      const { onTitleInput, onContentInput, onClick } = await renderModifyComplex();
      const TITLE = '2222222222222222222222222222222222222222';
      const CONTENT = '????????????';
      onTitleInput(TITLE);
      onContentInput(CONTENT);
      await onClick();
      expect(window.alert).toBeCalledTimes(1);
    });
  });
});
