export const CALENDAR_HEADER_CSS = `
kuc-base-datetime-calendar-header,
kuc-base-datetime-calendar-header *,
kuc-base-datetime-calendar-header:lang(en),
kuc-base-datetime-calendar-header:lang(en) * {
  font-family: sans-serif;
}
kuc-base-datetime-calendar-header:lang(ja),
kuc-base-datetime-calendar-header:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
  font-weight: 700;
}
kuc-base-datetime-calendar-header:lang(zh),
kuc-base-datetime-calendar-header:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-base-datetime-calendar-header:lang(zh-TW),
kuc-base-datetime-calendar-header:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC",sans-serif;
}
kuc-base-datetime-calendar-header:lang(es),
kuc-base-datetime-calendar-header:lang(es) * {
  font-family: sans-serif;
}
kuc-base-datetime-calendar-header:lang(ja) kuc-base-datetime-listbox * {
  font-weight: 400;
}
.kuc-base-datetime-calendar-header__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #e3e7e8;
  padding: 0;
  white-space: nowrap;
  width: 266px;
  height: 44px;
}
.kuc-base-datetime-calendar-header__group__button {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  width: 38px;
  height: 32px;
  margin: 0;
  text-align: center;
}
.kuc-base-datetime-calendar-header__group__button:focus {
  border: 1px solid #3498db;
  outline: none;
}
.kuc-base-datetime-calendar-header__group__button-icon {
  vertical-align: middle;
}
.kuc-base-datetime-calendar-header__group__center {
  width: 190px;
  text-align: center;
  display: flex;
  justify-content: center;
}
.kuc-base-datetime-calendar-header__month {
  margin: 0 4px 0 4px;
}
`;
