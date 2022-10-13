import Button from '../index';

describe('Unit test Button render', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    // @ts-ignore
    console.error.mockImplementation(() => { });
  });
  afterEach(() => {
    // @ts-ignore
    console.error.mockRestore();
  });
  test('Render successfully without props', () => {
    const button = new Button();
    const container = button.render();
    document.body.appendChild(container);
    expect(container.classList.length).toBe(2);
    expect(['kuc-btn', 'normal'].every(c => container.classList.contains(c))).toBe(true);
    expect(container).not.toBeDisabled();
    expect(container).toBeVisible();
    expect(container.textContent).toBe('');
  });

  test('Render successfully with full props', () => {
    // デフォルト値と異なる値をセットする。
    const button = new Button({
      text: 'Submit',
      type: 'submit',
      isDisabled: true,
      isVisible: false
    });
    const container = button.render();
    expect(container.classList.length).toBe(2);
    expect(['kuc-btn', 'submit'].every(c => container.classList.contains(c))).toBe(true);
    expect(container).toBeDisabled();
    expect(container).not.toBeVisible();
    expect(container.textContent).toBe('Submit');
  });

  test('Render successfully with wrong props', () => {
    // 不正な値を設定した場合はデフォルト値がセットされることを確認する
    const button = new Button({
      // @ts-ignore
      type: 'button',
      // @ts-ignore
      isDisabled: 'abc',
      // @ts-ignore
      isVisible: 'abc'
    });
    const container = button.render();
    document.body.appendChild(container);
    expect(container.classList.length).toBe(2);
    expect(['kuc-btn', 'normal'].every(c => container.classList.contains(c))).toBe(true);
    expect(container).not.toBeDisabled();
    expect(container).toBeVisible();
  });
});
