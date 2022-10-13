import CheckBox from '../index';

describe('Unit test CheckBox setValue and getValue', () => {
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
  const expectedIsDisabled = [false, true, true];

  test('Function setValue & getValue run successfully with full props', () => {
    const checkBox = new CheckBox({
      items: [
        {
          label: expectedLabels[0],
          value: expectedValues[0],
          isDisabled: expectedIsDisabled[0]
        },
        {
          label: expectedLabels[1],
          value: expectedValues[1],
          isDisabled: expectedIsDisabled[1]
        },
        {
          label: expectedLabels[2],
          value: expectedValues[2],
          isDisabled: expectedIsDisabled[2]
        }
      ]
    });
    const container = checkBox.render();
    checkBox.setValue([expectedValues[0], expectedValues[1]]);

    // check getItems
    const selectedItem = checkBox.getValue() || [];
    expect(selectedItem).toEqual([expectedValues[0], expectedValues[1]]);

    // check dom
    const items = container.children;
    for (let index = 0; index < 3; index++) {
      const item: Element = items[index];
      if (!item.children || item.children.length !== 2) {
        expect(false);
      }
      const inputEl = item.children[0] as HTMLInputElement;
      // check selected items
      if (selectedItem.indexOf(expectedValues[index]) > -1) {
        expect(inputEl.checked).toBeTruthy();
      } else {
        expect(inputEl.checked).toBeFalsy();
      }
    }
  });

  test('throw error without value', () => {
    expect(() => {
      const checkBox = new CheckBox();
      // @ts-ignore
      checkBox.setValue(null);
    }).toThrowError();
  });

  test('The value will be set as it is with invalid option.value', () => {
    const checkBox = new CheckBox({
      items: [
        {
          label: expectedLabels[0],
          value: expectedValues[0],
          isDisabled: false
        }
      ],
      value: [expectedValues[0]]
    });
    checkBox.render();
    checkBox.setValue([expectedValues[1]]);
    expect(checkBox.getValue()).toEqual([expectedValues[1]]);
  });

  test('throw error with duplicate value', () => {
    expect(() => {
      const checkBox = new CheckBox({
        items: [
          {
            label: expectedLabels[0],
            value: expectedValues[0],
            isDisabled: expectedIsDisabled[0]
          },
          {
            label: expectedLabels[1],
            value: expectedValues[1],
            isDisabled: expectedIsDisabled[1]
          }
        ]
      });
      checkBox.setValue([expectedValues[0], expectedValues[0]]);
    }).toThrowError();
  });
});
