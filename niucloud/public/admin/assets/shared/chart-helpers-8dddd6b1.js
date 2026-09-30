import { i as a } from "./index-288aa4b1.js";
const r = (e, o) => {
  const s = getComputedStyle(document.documentElement).getPropertyValue(e).trim();
  return !s || s.includes("var(") ? o : s;
}, y = (e, o) => {
  const s = e.replace("#", "");
  if (s.length !== 6)
    return e;
  const l = parseInt(s.slice(0, 2), 16), c = parseInt(s.slice(2, 4), 16), n = parseInt(s.slice(4, 6), 16);
  return `rgba(${l}, ${c}, ${n}, ${o})`;
}, t = () => ({
  primary: r("--sys-color-primary", "#409EFF"),
  success: r("--sys-color-success", "#67C23A"),
  warning: r("--sys-color-warning", "#E6A23C"),
  danger: r("--sys-color-danger", "#F56C6C"),
  info: r("--sys-color-info", "#909399"),
  textRegular: r("--sys-color-text-regular", "#606266"),
  textSecondary: r("--sys-color-text-secondary", "#909399"),
  border: r("--sys-color-border-default", "#E4E7ED"),
  fillLight: r("--sys-color-fill-light", "#F2F3F5"),
  fillDarker: r("--sys-color-fill-dark", "#E4E7ED"),
  surface: r("--sys-color-bg-surface", "#FFFFFF")
}), u = () => {
  const e = t();
  return {
    axisLine: { lineStyle: { color: e.border } },
    axisTick: { show: !1 },
    axisLabel: { color: e.textSecondary }
  };
}, g = () => {
  const e = t();
  return {
    minInterval: 1,
    splitLine: { lineStyle: { color: e.fillLight } },
    axisLine: { show: !1 },
    axisTick: { show: !1 },
    axisLabel: { color: e.textSecondary }
  };
}, x = () => ({
  icon: "circle",
  itemWidth: 8,
  itemHeight: 8,
  textStyle: { color: t().textRegular }
}), d = (e) => e ? a(e) : null;
export {
  u as a,
  t as c,
  d as i,
  x as l,
  y as t,
  g as v
};
