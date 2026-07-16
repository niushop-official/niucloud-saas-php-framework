import { ap as t } from "./core-shared-e1759ce4.js";
function o(n) {
  return t.get("addon/local", n);
}
function a(n) {
  return t.post(`addon/install/${n.addon}`, n);
}
function d(n) {
  return t.post(`addon/cloudinstall/${n.addon}`, n, { showErrorMessage: !1 });
}
function s(n) {
  return t.post(`addon/uninstall/${n.addon}`, n, { showSuccessMessage: !0 });
}
function l(n) {
  return t.get(`addon/install/check/${n}`);
}
function u() {
  return t.get("addon/installtask");
}
function i(n) {
  return t.get(`addon/cloudinstall/${n}`);
}
function r(n) {
  return t.get(`addon/uninstall/check/${n}`);
}
function c(n) {
  return t.put(`addon/install/cancel/${n}`, {}, { showErrorMessage: !1 });
}
function g() {
  return t.get("addon/list/install");
}
function f() {
  return t.get("home/site/group/app_list");
}
function p() {
  return t.get("addon/init");
}
function A() {
  return t.get("app/index");
}
function h() {
  return t.get("index/adv_list");
}
export {
  f as a,
  A as b,
  h as c,
  p as d,
  o as e,
  u as f,
  g,
  d as h,
  a as i,
  i as j,
  r as k,
  c as l,
  l as p,
  s as u
};
