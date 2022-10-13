import Button from '../index';

describe('Unit test Button show', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    // @ts-ignore
    console.error.mockImplementation(() => { });
  });
  afterEach(() => {
    // @ts-ignore
    console.error.mockRestore();
  });
  test('Function show run successfully', () => {
    const button = new Button({isVisible: false});
    const container = button.render();
    document.body.appendChild(container);
    button.show();
    expect(container).toBeVisible();
  });
});
