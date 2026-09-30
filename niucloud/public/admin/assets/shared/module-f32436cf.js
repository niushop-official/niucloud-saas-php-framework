import { aj as n } from "./core-shared-c6ad4e77.js";
function t() {
  return n.get("niucloud/authinfo", { showErrorMessage: !1 });
}
function u(e) {
  return n.post("niucloud/authinfo", e, { showSuccessMessage: !0 });
}
function r(e) {
  return n.post(`addon/download/${e.addon}`, e, { showSuccessMessage: !0 });
}
function s() {
  return n.get("niucloud/framework/newversion");
}
function i() {
  return n.get("niucloud/framework/version/list");
}
function a(e) {
  return n.get("niucloud/app_version/list", { params: e });
}
export {
  t as a,
  a as b,
  s as c,
  r as d,
  i as g,
  u as s
};
