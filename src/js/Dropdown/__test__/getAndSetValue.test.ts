import Dropdown from '../index';

describe('Unit test Dropdown setValue and getValue', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    // @ts-ignore
    console.error.mockImplementation(() => { });
  });
  afterEach(() => {
    // @ts-ignore
    console.error.mockRestore();
  });

  const expectedLabels = ['Orange', 'Banana', 'Lemon'];
  const expectedValues = ['orange', 'banana', 'lemon'];

  test('Function getValue and setValue run successfully with full props', () => {
    const dropdown = new Dropdown({
      items: [
        {
          label: expectedLabels[0],
          value: expectedValues[0],
          isDisabled: false
        },
        {
          label: expectedLabels[1],
          value: expectedValues[1],
          isDisabled: false
        },
        {
          label: expectedLabels[2],
          value: expectedValues[2],
          isDisabled: true
        }
      ]
    });
    const container = dropdown.render();
    dropdown.setValue(expectedValues[1]);

    const itemsEl: HTMLCollection = container.querySelector('.kuc-list-outer')!.children;
    if (!container.children || itemsEl.length !== 3) {
      expect(false);
    }
    for (let i = 0; i < itemsEl.length; i++) {
      const itemEl = itemsEl[i];
      const itemLabelEl = itemEl.children[1] as HTMLSpanElement;
      expect(itemLabelEl.innerText).toBe(expectedLabels[i]);

      if (i <= 1) {
        expect(itemEl.classList.contains('kuc-list-item-disable')).toBe(false);
      } else {
        expect(itemEl.classList.contains('kuc-list-item-disable')).toBe(true);
      }
    }

    expect(dropdown.getValue()).toBe(expectedValues[1]);
  });

  test('The value will be set as it is and no item selected with invalid option.value not in item list', () => {
    const dropdown = new Dropdown({
      items: [
        {
          label: expectedLabels[0],
          value: expectedValues[0]
        },
        {
          label: expectedLabels[1],
          value: expectedValues[1]
        }
      ],
      value: expectedValues[1]
    });
    dropdown.render();
    dropdown.setValue(expectedValues[2]);
    expect(dropdown.getValue()).toBe(expectedValues[2]);
    const container = dropdown.render();
    const itemsEl = container.querySelector('.kuc-list-outer')!.children;
    if (!container.children || itemsEl.length !== 2) {
      expect(false);
    }
    for (let i = 0; i < itemsEl.length; i++) {
      const itemEl = itemsEl[i];
      expect(itemEl.classList.contains('kuc-list-item-selected')).toBe(false);
    }
  });
});