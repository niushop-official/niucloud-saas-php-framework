import { aj as t } from "./core-shared-c6ad4e77.js";
function d(n) {
  return t.get("addon/local", n);
}
function e(n) {
  return t.post(`addon/install/${n.addon}`, n);
}
function a(n) {
  return t.post(`addon/cloudinstall/${n.addon}`, n, { showErrorMessage: !1 });
}
function s(n) {
  return t.post(`addon/uninstall/${n.addon}`, n, { showSuccessMessage: !0 });
}
function l() {
  return t.get("addon/installtask");
}
function u(n) {
  return t.get(`addon/cloudinstall/${n}`);
}
function i(n) {
  return t.put(`addon/install/cancel/${n}`, {}, { showErrorMessage: !1 });
}
function r() {
  return t.get("addon/list/install");
}
function c() {
  return t.get("home/site/group/app_list");
}
function g() {
  return t.get("addon/init");
}
function f() {
  return t.get("app/index");
}
function p() {
  return t.get("index/adv_list");
}
export {
  r as a,
  f as b,
  p as c,
  g as d,
  d as e,
  l as f,
  c as g,
  a as h,
  e as i,
  u as j,
  i as k,
  s as u
};
