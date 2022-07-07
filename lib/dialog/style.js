export const DIALOG_CSS = `
  kuc-dialog-1-3-2,
  kuc-dialog-1-3-2 *,
  :lang(en) kuc-dialog-1-3-2,
  :lang(en) kuc-dialog-1-3-2 * {
    font-family: "HelveticaNeueW02-45Ligh", Arial,
      "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  :lang(ja) kuc-dialog-1-3-2,
  :lang(ja) kuc-dialog-1-3-2 * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  :lang(zh) kuc-dialog-1-3-2,
  :lang(zh) kuc-dialog-1-3-2 * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }

  kuc-dialog-1-3-2 {
    display: none;
  }

  kuc-dialog-1-3-2[opened] {
    display: block;
  }

  .kuc-dialog-1-3-2__dialog {
    min-width: 320px;
    font-size: 20px;
    background-color: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
  }

  .kuc-dialog-1-3-2__dialog__header {
    min-height: 64px;
    border-bottom: 1px solid #e3e7e8;
    display: flex;
    justify-content: space-between;
  }

  .kuc-dialog-1-3-2__dialog__header__title {
    font-size: 24px;
    padding: 0 24px;
    align-self: center;
    font-weight: 400;
  }

  .kuc-dialog-1-3-2__dialog__header__close-button {
    width: 48px;
    height: 48px;
    border: none;
    background-color: #ffffff;
    margin-right: 12px;
    margin-top: 11px;
    cursor: pointer;
  }

  .kuc-dialog-1-3-2__dialog__header__close-button:focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
  }

  /* Firefox */
  @-moz-document url-prefix() {
    .kuc-dialog-1-3-2__dialog__header__close-button:focus-visible {
      outline: 1px dotted;
    }
  }

  /* Safari */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    _::-webkit-full-page-media,
    _:future,
    :root .kuc-dialog-1-3-2__dialog__header__close-button:focus {
      outline: 5px auto -webkit-focus-ring-color;
    }
  }

  .kuc-dialog-1-3-2__dialog__header__close-button-svg {
    vertical-align: middle;
  }

  .kuc-dialog-1-3-2__dialog__content {
    border-bottom: #e3e7e8 solid 1px;
    background-color: #f7f9fa;
    padding: 24px;
    display: flex;
  }

  .kuc-dialog-1-3-2__dialog__content__icon-info,
  .kuc-dialog-1-3-2__dialog__content__icon-success,
  .kuc-dialog-1-3-2__dialog__content__icon-error,
  .kuc-dialog-1-3-2__dialog__content__icon-warning,
  .kuc-dialog-1-3-2__dialog__content__icon-question {
    margin-right: 16px;
    width: 24px;
    height: 24px;
  }

  .kuc-dialog-1-3-2__dialog__footer {
    padding: 24px;
  }

  .kuc-dialog-1-3-2__mask {
    position: fixed;
    top: 0;
    right: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.6;
    z-index: 9999;
  }

  .kuc--has-dialog {
    overflow: hidden;
  }

  .kuc--has-dialog .kuc-dialog-1-3-2__dialog {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 80vh;
  }
`;
