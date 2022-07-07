export const BUTTON_CSS = `
  kuc-button-1-3-2,
  kuc-button-1-3-2 *,
  :lang(en) kuc-button-1-3-2,
  :lang(en) kuc-button-1-3-2 * {
    font-family: "HelveticaNeueW02-45Ligh", Arial, "Hiragino Kaku Gothic ProN",
      Meiryo, sans-serif;
  }
  :lang(ja) kuc-button-1-3-2,
  :lang(ja) kuc-button-1-3-2 * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  :lang(zh) kuc-button-1-3-2,
  :lang(zh) kuc-button-1-3-2 * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti, Hei,
      "Heiti SC", sans-serif;
  }
  kuc-button-1-3-2 {
    display: inline-block;
    vertical-align: top;
  }
  kuc-button-1-3-2[hidden] {
    display: none;
  }
  .kuc-button-1-3-2__button {
    font-size: 16px;
    min-width: 163px;
    height: 48px;
    padding: 0px 16px;
    user-select: none;
  }
  .kuc-button-1-3-2__button:focus {
    outline: none;
  }
  .kuc-button-1-3-2__button--normal {
    border: 1px solid #e3e7e8;
    background-color: #f7f9fa;
    box-shadow: 1px 1px 1px #ffffff inset;
    color: #3498db;
  }
  .kuc-button-1-3-2__button--normal:hover,
  .kuc-button-1-3-2__button--normal:focus,
  .kuc-button-1-3-2__button--normal:active {
    background-color: #c8d6dd;
    box-shadow: none;
    cursor: pointer;
  }
  .kuc-button-1-3-2__button--submit {
    border: 1px solid #e3e7e8;
    background-color: #3498db;
    color: #ffffff;
  }
  .kuc-button-1-3-2__button--submit:hover,
  .kuc-button-1-3-2__button--submit:focus,
  .kuc-button-1-3-2__button--submit:active {
    background-color: #1d6fa5;
    cursor: pointer;
  }
  .kuc-button-1-3-2__button--alert {
    border: 0 none;
    background-color: #e74c3c;
    box-shadow: 1px 1px 1px #ffffff inset;
    color: #ffffff;
  }
  .kuc-button-1-3-2__button--alert:hover,
  .kuc-button-1-3-2__button--alert:focus,
  .kuc-button-1-3-2__button--alert:active {
    background-color: #bf2718;
    box-shadow: none;
    cursor: pointer;
  }
  .kuc-button-1-3-2__button:disabled {
    border: 1px solid #e3e7e8;
    background-color: #d4d7d7;
    box-shadow: none;
    color: #888888;
    cursor: default;
  }
`;
