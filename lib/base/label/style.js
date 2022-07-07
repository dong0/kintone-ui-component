export const BASE_LABEL_CSS = `
  kuc-base-label-1-3-2,
  kuc-base-label-1-3-2 *,
  :lang(en) kuc-base-label-1-3-2,
  :lang(en) kuc-base-label-1-3-2 * {
      font-family: "HelveticaNeueW02-45Ligh", Arial,
      "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  :lang(ja) kuc-base-label-1-3-2,
  :lang(ja) kuc-base-label-1-3-2 * {
      font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  :lang(zh) kuc-base-label-1-3-2,
  :lang(zh) kuc-base-label-1-3-2 * {
      font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-base-label-1-3-2 {
      font-size: 14px;
      color: #333333;
      display: inline-table;
      vertical-align: top;
  }
  kuc-base-label-1-3-2[hidden] {
      display: none;
  }
  .kuc-base-label-1-3-2__required-icon {
      font-size: 20px;
      vertical-align: -3px;
      color: #e74c3c;
      margin-left: 4px;
      line-height: 1;
  }
  .kuc-base-label-1-3-2__required-icon[hidden] {
      display: none;
  }
`;
