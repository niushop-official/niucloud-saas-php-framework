import { defineComponent as Rl, ref as r, reactive as at, computed as ke, watch as Nl, resolveComponent as m, resolveDirective as Ol, openBlock as o, createElementBlock as d, Fragment as I, withDirectives as K, createVNode as n, withCtx as s, createElementVNode as e, normalizeClass as be, createTextVNode as y, createCommentVNode as x, createBlock as g, unref as c, toDisplayString as u, vShow as se, renderList as Y, withModifiers as R, pushScopeId as zl, popScopeId as Pl, h as Et } from "vue";
import { _ as it } from "./icon-addon-one-2b9cfff5.js";
import { _ as ze } from "./apply_empty-3b0bc5e4.js";
import { a as El, _ as Ql } from "./success_icon-605a2b43.js";
import { s as pe, u as Kl, t as i, i as nt, g as ql, cq as Qt, cs as Hl, I as Zl, _ as Gl } from "./core-shared-9b1e55e9.js";
import { d as Wl, e as Yl, p as Xl, f as Jl, i as es, h as ts, j as ls, k as ss, u as as, l as ns } from "./addon-ab6efca8.js";
import { g as Kt, c as os, d as is, s as us, b as cs } from "./module-f399f84a.js";
import { ElNotification as ds, ElMessageBox as re, ElMessage as ot } from "element-plus";
import { T as ps, _ as rs } from "./dark-3dd028d8.js";
import { useRouter as vs, useRoute as _s } from "vue-router";
import fs from "./index-14899f35.js";
import xs from "./index-5b072af6.js";
import hs from "./index-c099764e.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ms = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAC90lEQVR4AeyYzWsTQRjGn51WaQ+2aiQ9qBiIxiqILXjw4k2hVRA/rgWrLXjwoKD/hR568aD4dei9IDS5+AeoFVI/ED9aaQ8KLfWjCibYmPF9dnbrirGdNWNYS8O+884+M/POb9/dIcMoBL/b/bolP6gv5gd0MX9Gl8TrBtuCzDs2OqDPkyXAgg840q8zaYUiNK5IQxc8tIhv9NUs8+7zgCGykIkAirRrFQqeh04KSTCykIlsKt2EsxSSABZlIFOHwjnlafRFG5JU1x76lLz3riRBRVkkeZ1KhGaxZF6yWAmYTLiAamUCbjkAbD8azzgmSEosFzuD6W5gzylghwDGMY7ZuDMWm985NmDmoD8O7x4Cr+8Cb++b+9JHc18WT4U622kzRSrws25q9mUsQGYgJVlY+Ao8vQVMCOD8pJns/XNzPyeeyifR2U57In05hmMZg+22FgswzN7UPaBaMVO0ZYyfnzL+c+DbA51qpQRwDOv8dultzRpw3VagQ74/Bl7Tal4XJ9u0mwqwPmu0dvFUUqKzPTSO8XV5A23bWLMza8DcsZ8BM4ewuEhaNhh9836j0VNpFT26iDiGOi13nKWdWQOm95qA/OijZlSzQEK9lhZtS+0KeyzvrQHDUPzoo1ZLr6WFY9immljaWWxAu7Dueq0C1ptLZxnsvQGEVi9UdHzdgPzLiwYM63/Sw3ZbXzfg4+tAYfB3o24LsVS/ugGXCu6izRGgC5TaMVYBa+fFXrXO4LcvJmjuBPyNZ7hLieNzJ00M7g1NbfnSGnBi1ATLHsbiTia6W7GpZ3tNjDcF421Ka8Bp2aSODf26awl3KLb+1Qjw4DLwTwD5tHPPzLY+3JnE9ZPyFj68ZCR7s86gfUi3Pf8DQI2y22d2Gq2i5IjrhdOQDoNpjXGeDw47jOk2lIdhNVPFVSFNXBbJNPsd19TpO15ZDjF7KLh9/L+P5rN46CGbv4qP3PSmZ6vo1sAFOel/BCA4N5Baoy5ZrDL/uMx/iSxk4tQ/AAAA//8PWFibAAAABklEQVQDAC9efelrVorbAAAAAElFTkSuQmCC", v = (we) => (zl("data-v-5bb6146d"), we = we(), Pl(), we), ys = { class: "main-container app-market bg-body min-h-[70vh]" }, gs = { class: "flex flex-col mb-[8px]" }, ks = { class: "flex items-center justify-between mb-[5px]" }, bs = /* @__PURE__ */ v(() => /* @__PURE__ */ e("h2", { class: "text-lg font-semibold" }, "应用列表", -1)), ws = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", null, "已安装", -1)), Cs = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", null, "未安装", -1)), As = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", null, "已购买", -1)), Fs = { class: "relative" }, Vs = {
  key: 0,
  class: "w-[8px] h-[8px] bg-[red] rounded-[8px] z-1 absolute top-[-2px] right-[-2px]"
}, Is = { key: 1 }, Ds = { class: "flex items-center bg-[#F4F5F7] h-[80px] justify-between px-[20px]" }, Bs = { class: "flex items-center" }, js = { class: "w-[42px] h-[42px] bg-purple-100 rounded flex items-center justify-center mr-2 relative" }, Ts = /* @__PURE__ */ v(() => /* @__PURE__ */ e("img", {
  class: "max-w-full max-h-full",
  src: ms,
  alt: ""
}, null, -1)), Us = {
  key: 0,
  class: "w-[8px] h-[8px] bg-[red] rounded-[8px] z-1 absolute top-[-2px] right-[-2px]"
}, Ls = {
  key: 0,
  class: "flex items-center"
}, Ss = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", { class: "text-[16px] font-[500] text-[#1D1F3A]" }, "框架更新", -1)), $s = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", { class: "text-[12px] text-[#9699B6] ml-[10px]" }, "必须优先更新", -1)), Ms = [
  Ss,
  $s
], Rs = {
  key: 1,
  class: "flex items-center"
}, Ns = { class: "text-[16px] font-[500] text-[#1D1F3A]" }, Os = { class: "text-[14px] text-[#374151]" }, zs = { class: "" }, Ps = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", { class: "iconfont iconjiang-right text-[#F09000] mx-[2px]" }, null, -1)), Es = { class: "text-[#F09000] mr-[4px]" }, Qs = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", { class: "mr-[4px]" }, "和", -1)), Ks = { class: "text-[#F09000] mr-[4px]" }, qs = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", null, "个应用可更新", -1)), Hs = { key: 0 }, Zs = { class: "flex items-center justify-between mt-[14px] mb-[6px]" }, Gs = { class: "flex items-center text-[12px]" }, Ws = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", null, "共", -1)), Ys = { class: "text-[#EF3826]" }, Xs = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", null, "个应用更新", -1)), Js = { class: "flex mb-4 flex-wrap" }, ea = ["onClick"], ta = { class: "flex items-start flex-1 w-0" }, la = { class: "w-[42px] h-[42px] bg-purple-100 rounded flex items-center justify-center mr-2 relative" }, sa = { class: "w-full h-full overflow-hidden rounded" }, aa = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-full max-h-full",
    src: it,
    alt: ""
  })
], -1)), na = { class: "flex-1 w-0" }, oa = { class: "flex items-center" }, ia = ["title"], ua = ["title"], ca = { class: "text-[#374151] text-[12px] leading-[16px] mt-[4px]" }, da = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", null, "当前版本：", -1)), pa = {
  key: 0,
  class: "text-[#374151] ml-[5px] text-[12px]"
}, ra = { class: "relative px-[20px] pb-[20px]" }, va = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", { style: { opacity: "0" } }, ".", -1)), _a = [
  va
], fa = ["onClick"], xa = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full rounded-[5px]" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-full max-h-full",
    src: it,
    alt: ""
  })
], -1)), ha = { class: "flex-1 w-0 flex flex-col justify-center pl-[20px] font-500 text-[13px]" }, ma = { class: "w-[236px] truncate leading-[18px]" }, ya = {
  key: 0,
  class: "w-[236px] truncate leading-[18px] mt-[6px]"
}, ga = {
  key: 1,
  class: "w-[236px] truncate leading-[18px] mt-[6px]"
}, ka = { class: "mt-[3px] flex flex-nowrap" }, ba = { class: "flex items-center" }, wa = { class: "font-500 text-[13px] mr-[5px]" }, Ca = { class: "font-500 text-[13px]" }, Aa = { class: "font-500 text-[13px] multi-hidden" }, Fa = { class: "font-500 text-[13px] multi-hidden" }, Va = { class: "font-500 text-[13px]" }, Ia = {
  key: 1,
  class: "data-loading"
}, Da = {
  key: 0,
  class: "h-[100px]"
}, Ba = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), ja = { class: "flex items-center" }, Ta = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), Ua = { class: "flex items-center" }, La = {
  key: 2,
  class: "mx-auto overview-empty flex flex-col items-center pt-14 pb-6"
}, Sa = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "mb-[20px] text-sm text-[#888]" }, "检测到当前账号尚未绑定授权，请先绑定授权！", -1)), $a = { class: "flex flex-1 flex-wrap justify-center relative" }, Ma = { class: "px-[18px] py-[8px]" }, Ra = /* @__PURE__ */ v(() => /* @__PURE__ */ e("p", { class: "leading-[32px] text-[14px]" }, " 您在官方应用市场购买任意一款应用，即可获得授权码。输入正确授权码认证通过后，即可支持在线升级和其它相关服务 ", -1)), Na = { class: "flex justify-end mt-[36px]" }, Oa = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), za = { class: "flex items-center" }, Pa = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), Ea = { class: "flex items-center" }, Qa = { class: "mt-[20px]" }, Ka = { class: "text-sm mt-[10px] text-info" }, qa = { class: "mt-[20px]" }, Ha = { class: "mt-[10px] text-right" }, Za = { class: "min-h-[150px]" }, Ga = {
  key: 0,
  class: "mt-3"
}, Wa = { class: "pt-[20px] pl-[20px]" }, Ya = { class: "flex items-center" }, Xa = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", { class: "ml-[5px] leading-[20px]" }, "编译权限错误，查看解决方案", -1)), Ja = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "border-[1px] border-primary rounded-[3px] w-[72px] h-[26px] leading-[25px] text-center" }, "立即查看", -1)), en = { class: "px-[20px] pt-[10px] text-[14px]" }, tn = { key: 0 }, ln = { key: 1 }, sn = {
  key: 0,
  class: "text-right"
}, an = { key: 1 }, nn = {
  key: 1,
  class: "my-3"
}, on = /* @__PURE__ */ v(() => /* @__PURE__ */ e("p", { class: "pl-[20px]" }, "插件验证", -1)), un = { class: "px-[20px] pt-[10px] text-[14px]" }, cn = ["innerHTML"], dn = { class: "flex justify-end" }, pn = { class: "h-[50vh] mt-[20px]" }, rn = { class: "flex flex-col h-full" }, vn = { class: "flex-1 h-0" }, _n = { class: "flex justify-end mt-[20px]" }, fn = { class: "h-[50vh] mt-[20px] flex flex-col" }, xn = /* @__PURE__ */ v(() => /* @__PURE__ */ e("img", {
  src: El,
  alt: ""
}, null, -1)), hn = { class: "text-[16px] text-[#4F516D] mt-[5px]" }, mn = {
  key: 0,
  class: "text-[16px] text-[#9699B6] mt-[10px]"
}, yn = { class: "mt-[20px]" }, gn = { class: "h-[50vh] mt-[20px] flex flex-col" }, kn = /* @__PURE__ */ v(() => /* @__PURE__ */ e("img", {
  src: Ql,
  alt: ""
}, null, -1)), bn = { class: "min-h-[150px]" }, wn = {
  key: 0,
  class: "bg-[#fff] my-3"
}, Cn = { class: "pt-[20px] pl-[20px]" }, An = { class: "px-[20px] pt-[10px] text-[14px]" }, Fn = { key: 0 }, Vn = { key: 1 }, In = { key: 0 }, Dn = { key: 1 }, Bn = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", null, "本地已经存在该插件/应用，再次下载会覆盖该插件/应用。", -1)), jn = { class: "dialog-footer" }, Tn = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", null, "返回应用列表", -1)), Un = { class: "border-[1px] border-solid border-[#EBEEF5] p-[20px]" }, Ln = { class: "flex items-center justify-between" }, Sn = { class: "flex items-center" }, $n = { class: "w-[42px] h-[42px] rounded-[6px] flex items-center justify-center mr-[10px] overflow-hidden" }, Mn = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-full max-h-full",
    src: it,
    alt: ""
  })
], -1)), Rn = { class: "text-[16px] font-[500] leading-[20px]" }, Nn = { class: "text-[12px] text-[#374151] leading-[18px] mt-[5px]" }, On = { class: "flex items-center ml-[auto] gap-[10px] detail-btn-box" }, zn = {
  key: 0,
  class: "app-section-header mt-[20px] mb-[12px]"
}, Pn = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "app-section-title" }, "应用信息", -1)), En = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "app-section-line" }, null, -1)), Qn = [
  Pn,
  En
], Kn = {
  key: 1,
  class: "space-y-[10px] text-[14px]"
}, qn = { class: "flex items-center" }, Hn = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "应用类型：", -1)), Zn = { class: "text-[#374151]" }, Gn = { class: "flex items-start" }, Wn = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6] pt-[2px]" }, "应用简介：", -1)), Yn = { class: "text-[#374151] flex-1" }, Xn = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "服务周期"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), Jn = { class: "space-y-[10px] text-[14px]" }, eo = { class: "flex items-center" }, to = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "有效期至：", -1)), lo = { class: "text-[#374151] flex items-center" }, so = { class: "text-[#374151]" }, ao = {
  key: 0,
  class: "ml-[10px] flex items-center gap-[3px]"
}, no = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", { class: "iconfont icongouwuche text-[var(--el-color-primary)]" }, null, -1)), oo = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "开发者信息"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), io = { class: "space-y-[10px] text-[14px]" }, uo = { class: "flex items-center" }, co = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "开发者：", -1)), po = { class: "text-[#374151]" }, ro = {
  key: 0,
  class: "flex items-center"
}, vo = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "联系方式：", -1)), _o = { class: "text-[#374151] inline-flex items-center" }, fo = {
  key: 3,
  class: "app-section-header mt-[20px] mb-[12px]"
}, xo = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "app-section-title" }, "访问应用", -1)), ho = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "app-section-line" }, null, -1)), mo = [
  xo,
  ho
], yo = {
  key: 4,
  class: "flex gap-[30px]"
}, go = { class: "flex items-center" }, ko = { class: "w-[28px] h-[28px] flex items-center justify-center mr-[2px]" }, bo = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "text-[14px] text-[#374151]" }, "PC端应用主页", -1)), wo = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", { class: "iconfont iconjiang-right" }, null, -1)), Co = { class: "flex items-center" }, Ao = { class: "w-[28px] h-[28px] flex items-center justify-center mr-[2px]" }, Fo = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "text-[14px] text-[#374151]" }, "移动端应用主页", -1)), Vo = /* @__PURE__ */ v(() => /* @__PURE__ */ e("span", { class: "iconfont iconjiang-right" }, null, -1)), Io = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "应用版本"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), Do = { class: "flex items-center text-[14px]" }, Bo = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "当前版本：", -1)), jo = { class: "text-[#374151]" }, To = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "更新历史"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), Uo = { class: "detail-upgrade-log -mx-[20px] h-[500px] overflow-auto" }, Lo = { class: "flex items-center justify-between flex-1" }, So = { class: "flex flex-col items-baseline" }, $o = { class: "text-[#1D1F3A] text-[14px]" }, Mo = { class: "flex items-center leading-[1] mt-[2px]" }, Ro = { class: "text-[#9699B6] text-[14px]" }, No = { class: "text-[#9699B6] text-[14px] ml-[3px]" }, Oo = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "flex items-center collapse-arrow" }, [
  /* @__PURE__ */ e("span", { class: "expand text-[14px] !text-[#374151]" }, "更新内容"),
  /* @__PURE__ */ e("span", { class: "fold-up text-[14px] !text-[#374151]" }, "收起"),
  /* @__PURE__ */ e("span", { class: "nc-iconfont nc-icon-xiaV6xx ml-[2px] text-[#9699B6]" })
], -1)), zo = {
  key: 0,
  class: "timeline-log-wrap"
}, Po = ["innerHTML"], Eo = /* @__PURE__ */ Rl({
  __name: "store",
  setup(we) {
    const qt = r(null), Ht = vs(), ut = _s(), Zt = r(Date.now()), _ = r(pe.get("storeActiveName") || "installed"), ct = r(null), Ce = r(null), C = r(!0), N = r(""), Ae = r([]), ae = Kl(), ve = r(!1), X = r(null), D = r(""), Gt = r(""), Wt = r(null), O = r(pe.get("storeShowType") || "card"), $ = r(""), q = at({
      keywords: "",
      type: ""
    }), dt = () => {
      ql().then((l) => {
        D.value = l.data.version.version, Gt.value = l.data.version.code;
      }), os().then(({ data: l }) => {
        $.value = l.last_version;
      });
    };
    dt();
    const Yt = () => {
      dt(), J();
    }, Xt = () => {
      O.value = O.value == "card" ? "list" : "card", pe.set({ key: "storeShowType", data: O.value });
    }, Jt = r({});
    (() => {
      Wl().then((l) => {
        Jt.value = l.data.type_list;
      });
    })();
    const pt = r(), el = () => {
      Ve(pt.value, !0);
    }, A = r([]), Fe = (l) => {
      _.value = l, pe.set({ key: "storeActiveName", data: l }), l == "recentlyUpdated" && k.value[_.value].length ? A.value = k.value[_.value].map((t) => t.key) : A.value = [], T.value && At();
    };
    ut.query.id && Fe(ut.query.id);
    const Ve = (l, t = !1) => {
      if (l.is_download && _.value == "all" && !t)
        return ve.value = !0, pt.value = l, !1;
      N.value || (N.value = l.key, is({ addon: l.key, version: l.version }).then(() => {
        ve.value = !1, _e(l.key), J(), N.value = "";
      }).catch(() => {
        N.value = "";
      }));
    }, Pe = r("");
    Kt().then((l) => {
      l.data.data && l.data.data.auth_code && (Pe.value = l.data.data.auth_code);
    });
    const tl = r(""), ll = r(""), Q = r({
      installed: [],
      uninstalled: [],
      all: [],
      recentlyUpdated: []
    }), H = (l) => {
      const t = /* @__PURE__ */ new Map(), p = [];
      return l.forEach((h) => {
        h.isHideen || t.set(h.key, { ...h, children: [] });
      }), l.forEach((h) => {
        !h.isHideen && h.support_app && t.has(h.support_app) && t.get(h.support_app).children.push(t.get(h.key));
      }), t.forEach((h) => {
        (!h.support_app || !t.has(h.support_app)) && p.push(h);
      }), p;
    }, rt = () => {
      const l = tl.value, t = ll.value;
      if ((!l || l === "") && (t === "" || t == null)) {
        Q.value.installed = H(k.value.installed), Q.value.uninstalled = H(k.value.uninstalled), Q.value.all = H(k.value.all), Q.value.recentlyUpdated = H(k.value.recentlyUpdated);
        return;
      }
      const p = (h) => h.filter((M) => {
        const ce = !l || M.title.includes(l), le = !t || M.type === t;
        return ce && le;
      });
      Q.value.installed = H(p(k.value.installed)), Q.value.uninstalled = H(p(k.value.uninstalled)), Q.value.all = H(p(k.value.all)), Q.value.recentlyUpdated = H(p(k.value.recentlyUpdated));
    }, k = r({
      installed: [],
      uninstalled: [],
      all: [],
      recentlyUpdated: [],
      error: ""
    }), J = () => {
      C.value = !0, Yl({}).then((l) => {
        var p;
        const t = l.data.list;
        k.value.error = l.data.error, k.value.installed = [], k.value.uninstalled = [], k.value.all = [], k.value.recentlyUpdated = [];
        for (const h in t)
          t[h].is_local == !1 && k.value.all.push(t[h]), t[h].install_info && ((p = Object.keys(t[h].install_info)) != null && p.length) ? (k.value.installed.push(t[h]), t[h].install_info.version != t[h].version && ue(t[h].install_info.version, t[h].version) && k.value.recentlyUpdated.push(t[h])) : t[h].is_download == !0 && k.value.uninstalled.push(t[h]);
        rt(), ae.routers.forEach((h, M) => {
          h.children && h.children.length ? (h.name = Qt(h.children), Ee.value[h.meta.app] = Qt(h.children)) : Ee.value[h.meta.app] = h.name;
        }), Fe(_.value), C.value = !1;
      }).catch(() => {
        C.value = !1;
      });
    };
    J();
    const Ie = ke(() => {
      let l = 0;
      return k.value[_.value] && k.value[_.value].length && k.value[_.value].forEach((t) => {
        t.isHideen && l++;
      }), l == k.value[_.value].length;
    }), vt = r(), _t = () => {
      k.value[_.value].forEach((l) => {
        l.isHideen = !0;
        let t = q.keywords, p = q.type;
        const h = !p || l.type === p, M = !t || l.title.indexOf(t) !== -1;
        h && M && (l.isHideen = !1);
      }), O.value != "card" && rt();
    }, sl = (l) => {
      l && (l.resetFields(), q.keywords = "", q.type = "", _t());
    }, Ee = r({}), Ko = (l) => {
      if (l.type == "app" && Object.keys(l.install_info).length) {
        pe.set({ key: "menuAppStorage", data: l.key }), pe.set({ key: "plugMenuTypeStorage", data: "" });
        const t = ae.appMenuList;
        t.push(l.key), ae.setAppMenuList(t);
        const p = Ee.value[l.key];
        Ht.push({ name: p });
      }
    }, Z = r(""), G = r(!1), L = r(0), S = r({});
    let Qe = null;
    const Ke = new ps();
    let De = null;
    const al = (l, t, p, h, M) => {
      if (t == "开始安装插件") {
        p(Ke);
        const ce = nl(["/", "——", "\\", "|"]);
        Qe = setInterval(() => {
          De ? Ke.flush(De + "<br>> " + ce.next().value) : Ke.flush("> " + ce.next().value);
        }, 150);
      }
    };
    function nl(l) {
      let t = 0;
      return {
        next() {
          return t + 1 == l.length && (t = 0), { value: l[t++] };
        }
      };
    }
    const _e = (l) => {
      Z.value = l, Xl(l).then((t) => {
        L.value = 0, Be.value = !1, W.value = !1, oe.value = "", G.value = !0, Ae.value = [], S.value = t.data, ae.clearRouters();
      });
    }, ol = r(null), ne = r(0);
    let F = null, ee = null;
    const qe = (l = !0) => {
      Jl().then((t) => {
        var p;
        if (t.data) {
          if (l && (je = [], Z.value = t.data.addon, G.value || (ee = ds.success({
            title: i("warning"),
            dangerouslyUseHTMLString: !0,
            message: Et("div", {}, [
              i("installingTips"),
              Et(
                "span",
                {
                  class: "text-primary cursor-pointer",
                  onClick: il
                },
                [i("installPercent")]
              )
            ]),
            duration: 0,
            showClose: !1
          })), F && clearInterval(F), ne.value = parseInt(Date.now() / 1e3) - t.data.timestamp, F = setInterval(() => {
            ne.value++;
          }, 1e3)), t.data.error) {
            (p = X.value) == null || p.pushMessage({ content: t.data.error, class: "error" }), mt.value = t.data.error, W.value = !0, F && (clearInterval(F), F = null);
            return;
          }
          t.data.mode == "cloud" && dl(), setTimeout(() => {
            qe(!1);
          }, 5e3);
        } else
          l || (L.value = 2, F && (clearInterval(F), F = null), J(), ae.clearRouters(), ee == null || ee.close());
      }).catch((t) => {
        var p;
        console.log(t), (p = X.value) == null || p.pushMessage({ content: t.message, class: "error" });
      });
    };
    qe();
    const Be = r(!1), ft = () => {
      Be.value = !0, L.value = 1, W.value = !1;
    }, xt = ke(() => {
      const l = ne.value, t = Math.floor(l / 3600), p = Math.floor(l % 3600 / 60), h = l % 60;
      return [t > 0 ? `${t}小时` : "", p > 0 ? `${p}分钟` : "", `${h}秒`].filter(Boolean).join("");
    }), il = () => {
      G.value = !0, L.value = 1;
    }, fe = r(!1), oe = r(""), ul = () => {
      !S.value.is_pass || fe.value || (oe.value = "local", fe.value = !0, ol.value = Date.now(), ne.value = 0, F && clearInterval(F), F = setInterval(() => {
        ne.value++;
      }, 1e3), es({ addon: Z.value }).then((l) => {
        L.value = 2, F && (clearInterval(F), F = null), J(), fe.value = !1, l.data.length && (Ae.value = l.data);
      }).catch((l) => {
        fe.value = !1;
      }));
    }, xe = r(!1), cl = () => {
      if (!Pe.value) {
        ht();
        return;
      }
      !S.value.is_pass || xe.value || (xe.value = !0, oe.value = "cloud", ts({ addon: Z.value }).then((l) => {
        L.value = 1, X.value.execute("clear"), X.value.execute("开始安装插件"), l.data.length && (Ae.value = l.data), qe(), xe.value = !1;
      }).catch((l) => {
        xe.value = !1, l.code && l.code == 601 ? re.confirm(
          "云编译服务未启动，必须在启动后进行云编译！",
          "提示",
          {
            distinguishCancelAndClose: !0,
            confirmButtonText: "重新检测",
            cancelButtonText: "查看操作手册",
            type: "warning"
          }
        ).then(() => {
          cl();
        }).catch((t) => {
          t == "cancel" && window.open("https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html", "_blank");
        }) : ot({ message: l.msg, type: "error" });
      }));
    }, ht = () => {
      re.confirm(i("authTips"), i("warning"), {
        distinguishCancelAndClose: !0,
        confirmButtonText: i("toBind"),
        cancelButtonText: i("toNiucloud")
      }).then(() => {
        kt();
      }).catch((l) => {
        l === "cancel" && window.open("https://www.niucloud.com/app");
      });
    }, W = r(!1), mt = r("");
    let je = [];
    const dl = () => {
      ls(Z.value).then((l) => {
        const t = l.data.data ?? [];
        t[0] && t[0].length && G.value == !0 && t[0].forEach((p) => {
          if (!je.includes(p.action)) {
            if (p.action.indexOf("云编译任务正在排队") != -1) {
              De = p.action, je.push(p.action);
              return;
            } else
              De = null;
            X.value.pushMessage({ content: `${p.action}` }), je.push(p.action), p.code == 0 && X.value.pushMessage({ content: p.msg, class: "error" });
          }
        });
      }).catch(() => {
        ee == null || ee.close();
      });
    };
    Nl(Z, (l) => {
      S.value = {};
    });
    const He = r(!1), Te = r({}), Ze = (l) => {
      re.confirm(i("uninstallTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        rl(l);
      });
    }, he = (l) => {
      var t;
      (t = ct.value) == null || t.open(l.key, null, l);
    }, pl = () => {
      var l;
      if (!Pe.value) {
        ht();
        return;
      }
      if (Ce.value.cloudBuildTask) {
        (l = Ce.value) == null || l.open();
        return;
      }
      re.confirm(i("cloudBuildTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        var t;
        (t = Ce.value) == null || t.open();
      });
    }, rl = (l) => {
      ss(l).then(({ data: t }) => {
        t.is_pass ? as({ addon: l }).then((p) => {
          J(), ae.clearRouters(), C.value = !1;
        }).catch(() => {
          C.value = !1;
        }) : (Te.value = t, He.value = !0);
      });
    }, yt = () => {
      window.open("https://www.niucloud.com/app");
    }, vl = (l) => {
      L.value == 1 && !Be.value && !W.value ? re.confirm(i("installShowDialogCloseTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        ns(Z.value), F && (clearInterval(F), F = null), Be.value = !1, oe.value = "", W.value = !1, l();
      }) : L.value == 2 ? (Fe("installed"), location.reload()) : l(), Qe && clearInterval(Qe);
    }, _l = (l) => {
      l.version = $.value, l.title = "框架", l.install_info = {
        version: D.value
      }, Le(l);
    }, Ue = r(!1), Ge = r(""), gt = r(null), me = r(!1), te = r(!0);
    (() => {
      te.value = !0, Kt().then((l) => {
        te.value = !1, l.data.data && l.data.data.length != 0 && (Ge.value = l.data.data);
      }).catch(() => {
        te.value = !1, Ue.value = !1;
      });
    })();
    const kt = () => {
      Ue.value = !0;
    }, ie = at({
      auth_code: "",
      auth_secret: ""
    }), bt = r(), fl = at({
      auth_code: [{ required: !0, message: i("authCodePlaceholder"), trigger: "blur" }],
      auth_secret: [{ required: !0, message: i("authSecretPlaceholder"), trigger: "blur" }]
    }), xl = async (l) => {
      me.value || !l || await l.validate(async (t) => {
        t && (me.value = !0, us(ie).then(() => {
          me.value = !1, setTimeout(() => {
            location.reload();
          }, 1e3);
        }).catch(() => {
          me.value = !1;
        }));
      });
    }, wt = () => {
      window.open("https://www.niucloud.com/app");
    }, hl = () => {
      window.open(
        "https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-wu-3001-sheng-7ea7-yun-bian-yi-mu-lu-du-xie-quan-xian-zhuang-tai-bu-tong-guo-ru-he-chu-li.html"
      );
    }, ml = (l) => {
      re.confirm(i("deleteAddonTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        Hl(l).then(() => {
          J();
        });
      });
    }, yl = (l) => {
      if (!l.support_version)
        return !1;
      const t = l.support_version.split("."), p = D.value.split(".");
      return parseFloat(`${t[0]}.${t[1]}`) < parseFloat(`${p[0]}.${p[1]}`);
    }, gl = () => {
      k.value[_.value].length && (k.value[_.value].length == A.value.length ? A.value = [] : A.value = k.value[_.value].map((l) => l.key));
    }, We = (l, t) => {
      _.value != "recentlyUpdated" && _.value != "uninstalled" || (A.value.includes(t) ? A.value.splice(A.value.indexOf(t), 1) : A.value.push(t));
    }, kl = () => {
      const l = Zl(A.value);
      if (D.value != $.value && ue(D.value, $.value) && l.unshift("niucloud-admin"), !l.length) {
        ot({
          message: k.recentlyUpdated.length ? "请先勾选要升级的插件" : "当前已是最新版",
          type: "error",
          duration: 5e3
        });
        return;
      }
      he({ key: l.toString() });
    }, Ho = () => {
      const l = A.value;
      if (!l.length) {
        ot({ message: "请先勾选要安装的插件", type: "error", duration: 5e3 });
        return;
      }
      _e(l.toString());
    }, bl = ke(() => new Set((Q.value[_.value] || []).map((l) => l.key))), T = r(!1), f = r(null), Zo = ke(() => {
      var t;
      const l = (t = f.value) == null ? void 0 : t.install_info;
      return Boolean(l && Object.keys(l).length);
    }), wl = ke(() => {
      var t, p;
      const l = (t = f.value) == null ? void 0 : t.install_info;
      return l && Object.keys(l).length ? l.version || "-" : ((p = f.value) == null ? void 0 : p.version) || "-";
    }), ye = r([]), Ye = r(!1), Xe = r(0), Ct = (l) => {
      if (!l)
        return ["-", "-"];
      const [t, p] = l.split(" ");
      if (!p)
        return [t || "-", "-"];
      const [h, M] = p.split(":");
      return [t, `${h}:${M}`];
    }, Cl = async (l) => {
      Ye.value = !0;
      try {
        const { data: t } = await cs({ app_key: l });
        ye.value = Array.isArray(t) ? t : [];
      } finally {
        Ye.value = !1;
      }
    }, Le = (l) => {
      f.value = l, T.value = !0, Xe.value = 0, ye.value = [], l != null && l.key && Cl(l.key);
    }, At = () => {
      T.value = !1, f.value = null, ye.value = [];
    }, Je = (l) => {
      l == "pc" ? window.open(`https://www.niucloud.com/app/detail/?id=${f.value.app_id}`) : window.open(`https://wap.niucloud.com/pages/product/detail?id=${f.value.app_id}`);
    }, ue = (l, t) => isNaN(parseInt(t.replaceAll(".", ""))) || isNaN(parseInt(l.replaceAll(".", ""))) ? !1 : parseInt(t.replaceAll(".", "")) > parseInt(l.replaceAll(".", ""));
    return (l, t) => {
      const p = m("el-tab-pane"), h = m("el-tabs"), M = m("el-option"), ce = m("el-select"), le = m("el-form-item"), et = m("el-input"), b = m("el-button"), Ft = m("el-form"), Al = m("DocumentCopy"), B = m("el-icon"), Se = m("el-checkbox"), tt = m("el-card"), lt = m("el-image"), U = m("el-table-column"), Vt = m("el-tag"), It = m("el-tooltip"), Dt = m("QuestionFilled"), Bt = m("el-table"), ge = m("el-empty"), jt = m("el-link"), Fl = m("el-popover"), $e = m("el-dialog"), st = m("el-step"), Vl = m("el-steps"), V = m("el-col"), de = m("el-row"), Me = m("Select"), Re = m("CloseBold"), Il = m("el-alert"), Ne = m("el-scrollbar"), Tt = m("el-result"), Dl = m("ArrowLeft"), Bl = m("Phone"), jl = m("Monitor"), Tl = m("Cellphone"), Ul = m("el-collapse-item"), Ll = m("el-collapse"), Sl = m("el-timeline-item"), $l = m("el-timeline"), Oe = Ol("loading");
      return o(), d(I, null, [
        K((o(), d("div", ys, [
          n(tt, {
            class: "box-card app-head !border-none !pb-[0]",
            shadow: "never"
          }, {
            default: s(() => [
              e("div", gs, [
                e("div", ks, [
                  bs,
                  e("i", {
                    class: be(["iconfont cursor-pointer", O.value == "card" ? "iconliebiao" : "iconliebiaoqiehuan"]),
                    onClick: Xt
                  }, null, 2)
                ]),
                n(h, {
                  modelValue: _.value,
                  "onUpdate:modelValue": t[0] || (t[0] = (a) => _.value = a),
                  onTabChange: Fe
                }, {
                  default: s(() => [
                    n(p, { name: "installed" }, {
                      label: s(() => [
                        ws
                      ]),
                      _: 1
                    }),
                    n(p, { name: "uninstalled" }, {
                      label: s(() => [
                        Cs
                      ]),
                      _: 1
                    }),
                    n(p, { name: "all" }, {
                      label: s(() => [
                        As
                      ]),
                      _: 1
                    }),
                    n(p, { name: "recentlyUpdated" }, {
                      label: s(() => [
                        e("span", Fs, [
                          y(" 可更新 "),
                          k.value.recentlyUpdated.length ? (o(), d("div", Vs)) : x("", !0)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              !C.value && !T.value && (_.value == "installed" || _.value == "all" || _.value == "uninstalled") ? (o(), g(Ft, {
                key: 0,
                inline: !0,
                model: q,
                ref_key: "searchFormRef",
                ref: vt,
                class: "search-form"
              }, {
                default: s(() => [
                  n(le, { prop: "type" }, {
                    default: s(() => [
                      n(ce, {
                        modelValue: q.type,
                        "onUpdate:modelValue": t[1] || (t[1] = (a) => q.type = a),
                        clearable: "",
                        placeholder: c(i)("应用类型"),
                        class: "input-width"
                      }, {
                        default: s(() => [
                          n(M, {
                            label: c(i)("应用"),
                            value: "app"
                          }, null, 8, ["label"]),
                          n(M, {
                            label: c(i)("插件"),
                            value: "addon"
                          }, null, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }),
                  n(le, { prop: "keywords" }, {
                    default: s(() => [
                      n(et, {
                        modelValue: q.keywords,
                        "onUpdate:modelValue": t[2] || (t[2] = (a) => q.keywords = a),
                        modelModifiers: { trim: !0 },
                        class: "!w-[200px]",
                        placeholder: c(i)("搜索关键词"),
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }),
                  n(le, null, {
                    default: s(() => [
                      n(b, {
                        type: "primary",
                        onClick: t[3] || (t[3] = (a) => _t())
                      }, {
                        default: s(() => [
                          y(u(c(i)("search")), 1)
                        ]),
                        _: 1
                      }),
                      n(b, {
                        onClick: t[4] || (t[4] = (a) => sl(vt.value))
                      }, {
                        default: s(() => [
                          y(u(c(i)("重置")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])) : x("", !0),
              !C.value && !T.value && _.value == "recentlyUpdated" ? (o(), d("div", Is, [
                e("div", Ds, [
                  e("div", Bs, [
                    e("div", js, [
                      Ts,
                      D.value != $.value && ue(D.value, $.value) ? (o(), d("div", Us)) : x("", !0)
                    ]),
                    e("div", null, [
                      $.value != D.value && ue(D.value, $.value) ? (o(), d("p", Ls, Ms)) : (o(), d("p", Rs, [
                        e("span", Ns, "当前框架为最新版 V" + u(D.value), 1)
                      ])),
                      e("p", Os, [
                        $.value != D.value && ue(D.value, $.value) ? (o(), d(I, { key: 0 }, [
                          e("span", zs, "框架 V" + u(D.value), 1),
                          Ps,
                          e("span", Es, u($.value), 1),
                          Qs
                        ], 64)) : x("", !0),
                        e("span", Ks, u(A.value.length), 1),
                        qs
                      ])
                    ])
                  ]),
                  n(b, {
                    class: "ml-[auto]",
                    onClick: t[5] || (t[5] = (a) => _l({ key: "niucloud-admin" }))
                  }, {
                    default: s(() => [
                      n(B, { class: "mr-[5px]" }, {
                        default: s(() => [
                          n(Al)
                        ]),
                        _: 1
                      }),
                      y(" 更新记录 ")
                    ]),
                    _: 1
                  }),
                  K(n(b, {
                    type: "primary",
                    onClick: kl
                  }, {
                    default: s(() => [
                      y(" 一键升级"),
                      A.value.length ? (o(), d("span", Hs, "(" + u(A.value.length) + ")", 1)) : x("", !0)
                    ]),
                    _: 1
                  }, 512), [
                    [se, _.value == "recentlyUpdated" || D.value != $.value && _.value != "uninstalled"]
                  ])
                ]),
                e("div", Zs, [
                  e("p", Gs, [
                    Ws,
                    e("span", Ys, u(A.value.length), 1),
                    Xs
                  ]),
                  n(Se, {
                    label: "全选",
                    "model-value": k.value[_.value].length && k.value[_.value].length == A.value.length,
                    onChange: gl,
                    value: "Value A",
                    class: "ml-[12px]"
                  }, null, 8, ["model-value"])
                ])
              ])) : x("", !0)
            ]),
            _: 1
          }),
          K(e("div", Js, [
            k.value[_.value].length && !C.value ? (o(!0), d(I, { key: 0 }, Y(k.value[_.value], (a) => {
              var w, z, P;
              return o(), d("div", {
                class: be(["rounded-md p-[16px] app-card mb-[20px] ml-[20px] cursor-pointer product-card-item flex justify-between items-start", { selected: A.value.includes(a.key), hidden: a.isHideen }]),
                onClick: (E) => Le(a),
                key: a.key
              }, [
                e("div", ta, [
                  e("div", la, [
                    e("div", sa, [
                      n(lt, {
                        class: "w-full h-full overflow-hidden rounded",
                        src: c(nt)(a.icon),
                        fit: "contain"
                      }, {
                        error: s(() => [
                          aa
                        ]),
                        _: 2
                      }, 1032, ["src"])
                    ])
                  ]),
                  e("div", na, [
                    e("div", oa, [
                      e("p", {
                        class: "text-[16px] text-[#374151] truncate leading-[20px]",
                        title: a.title
                      }, u(a.title), 9, ia),
                      e("span", {
                        class: be({ "app-ident": a.type == "app", "addon-ident": a.type == "addon" })
                      }, u(a.type == "app" ? "应用" : "插件"), 3)
                    ]),
                    e("p", {
                      class: "text-xs text-[#4F516D] truncate mt-[2px] font-bold",
                      title: a.key
                    }, u(a.key), 9, ua),
                    e("div", ca, [
                      da,
                      e("span", null, u(a.install_info && ((w = Object.keys(a.install_info)) != null && w.length) ? a.install_info.version : a.version), 1),
                      a.install_info && ((z = Object.keys(a.install_info)) != null && z.length) && a.install_info.version != a.version && _.value == "recentlyUpdated" ? (o(), d("span", pa, "最新版本：" + u(a.version), 1)) : x("", !0)
                    ])
                  ])
                ]),
                e("view", {
                  class: be(["w-[25px] flex items-end flex-col h-full justify-between", { "w-[40px]": !a.is_download && N.value == a.key }])
                }, [
                  _.value == "recentlyUpdated" ? (o(), d(I, { key: 0 }, [
                    A.value.includes(a.key) ? (o(), g(Se, {
                      key: 0,
                      class: "!h-[auto] leading-[1]",
                      checked: "",
                      onClick: R((E) => We(E, a.key), ["stop"])
                    }, null, 8, ["onClick"])) : (o(), g(Se, {
                      key: 1,
                      class: "!h-[auto] leading-[1]",
                      onClick: R((E) => We(E, a.key), ["stop"])
                    }, null, 8, ["onClick"]))
                  ], 64)) : x("", !0),
                  _.value == "installed" || _.value == "all" || _.value == "uninstalled" ? (o(), d(I, { key: 1 }, [
                    a.is_download ? !a.install_info || Object.keys(a.install_info).length == 0 ? (o(), g(b, {
                      key: 1,
                      class: "mt-[auto] !text-[#0766F5] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      onClick: R((E) => _e(a.key), ["stop"])
                    }, {
                      default: s(() => [
                        y("安装")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : x("", !0) : (o(), g(b, {
                      key: 0,
                      class: "!text-[#0766F5] mt-[auto] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      loading: N.value == a.key,
                      disabled: N.value != "",
                      onClick: R((E) => Ve(a), ["stop"])
                    }, {
                      default: s(() => [
                        y("安装 ")
                      ]),
                      _: 2
                    }, 1032, ["loading", "disabled", "onClick"])),
                    a.install_info && ((P = Object.keys(a.install_info)) != null && P.length) ? (o(), g(b, {
                      key: 2,
                      class: "mt-[auto] !text-[#4F516D] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      link: "",
                      onClick: R((E) => Ze(a.key), ["stop"])
                    }, {
                      default: s(() => [
                        y(u(c(i)("unload")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : x("", !0)
                  ], 64)) : (o(), d(I, { key: 2 }, [
                    a.install_info.version != a.version && ue(a.install_info.version, a.version) ? (o(), g(b, {
                      key: 0,
                      class: "!text-[#008C1E] mt-[auto] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      onClick: R((E) => he(a), ["stop"])
                    }, {
                      default: s(() => [
                        y(" 升级 ")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : x("", !0)
                  ], 64))
                ], 2)
              ], 10, ea);
            }), 128)) : x("", !0)
          ], 512), [
            [se, O.value == "card" && !T.value]
          ]),
          K(e("div", ra, [
            k.value[_.value].length && !C.value && !T.value ? (o(), g(Bt, {
              key: 0,
              ref_key: "tableRef",
              ref: qt,
              "tree-props": { children: "children" },
              "default-expand-all": !0,
              data: Q.value[_.value],
              "row-key": "key",
              size: "large"
            }, {
              default: s(() => [
                n(U, { width: "24" }, {
                  default: s(({ row: a }) => {
                    var w;
                    return [
                      e("div", {
                        class: be(["tree-child-cell", {
                          "is-tree-parent": (w = a.children) == null ? void 0 : w.length,
                          "is-tree-child": typeof a.support_app == "string" && a.support_app !== "" && bl.value.has(a.support_app)
                        }])
                      }, _a, 2)
                    ];
                  }),
                  _: 1
                }),
                _.value === "recentlyUpdated" ? (o(), g(U, {
                  key: 0,
                  width: "60px"
                }, {
                  default: s(({ row: a }) => [
                    n(Se, {
                      onClick: t[6] || (t[6] = R(() => {
                      }, ["stop"])),
                      "model-value": A.value.includes(a.key),
                      value: a.key,
                      onChange: (w) => We(w, a.key)
                    }, null, 8, ["model-value", "value", "onChange"])
                  ]),
                  _: 1
                })) : x("", !0),
                n(U, {
                  label: c(i)("appName"),
                  align: "left",
                  width: "300"
                }, {
                  default: s(({ row: a }) => {
                    var w, z;
                    return [
                      e("div", {
                        class: "flex items-center cursor-pointer relative left-[-10px]",
                        onClick: (P) => Le(a)
                      }, [
                        n(lt, {
                          class: "w-[54px] h-[54px] rounded-[5px]",
                          src: c(nt)(a.icon),
                          fit: "contain"
                        }, {
                          error: s(() => [
                            xa
                          ]),
                          _: 2
                        }, 1032, ["src"]),
                        e("div", ha, [
                          e("div", ma, u(a.title), 1),
                          a.install_info && ((w = Object.keys(a.install_info)) != null && w.length) ? (o(), d("div", ya, u(a.install_info.version), 1)) : (o(), d("div", ga, u(a.version), 1)),
                          e("div", ka, [
                            _.value == "recentlyUpdated" && a.install_info && ((z = Object.keys(a.install_info)) != null && z.length) && a.install_info.version != a.version ? (o(), g(Vt, {
                              key: 0,
                              type: "danger",
                              size: "small"
                            }, {
                              default: s(() => [
                                y(u(c(i)("newVersion")) + u(a.version), 1)
                              ]),
                              _: 2
                            }, 1024)) : x("", !0),
                            yl(a) && _.value == "recentlyUpdated" ? (o(), g(It, {
                              key: 1,
                              effect: "dark",
                              content: `该插件适配框架版本为${a.support_version}，与已安装框架版本${D.value}不完全兼容`,
                              placement: "top-start"
                            }, {
                              default: s(() => [
                                n(Vt, {
                                  type: "warning",
                                  size: "small",
                                  class: "app-list-tip ml-[3px] overflow-hidden"
                                }, {
                                  default: s(() => [
                                    y("该插件适配框架版本为" + u(a.support_version) + "，与已安装框架版本" + u(D.value) + "不完全兼容 ", 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["content"])) : x("", !0)
                          ])
                        ])
                      ], 8, fa)
                    ];
                  }),
                  _: 1
                }, 8, ["label"]),
                n(U, {
                  align: "left",
                  "min-width": "150"
                }, {
                  header: s(() => [
                    e("div", ba, [
                      e("span", wa, u(c(i)("appIdentification")), 1),
                      n(It, {
                        class: "box-item",
                        effect: "light",
                        content: c(i)("tipText"),
                        placement: "bottom"
                      }, {
                        default: s(() => [
                          n(B, { class: "cursor-pointer text-[16px] text-[#a9a9a9]" }, {
                            default: s(() => [
                              n(Dt)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["content"])
                    ])
                  ]),
                  default: s(({ row: a }) => [
                    e("span", Ca, u(a.key), 1)
                  ]),
                  _: 1
                }),
                n(U, {
                  label: c(i)("introduction"),
                  align: "left",
                  "min-width": "250"
                }, {
                  default: s(({ row: a }) => [
                    e("span", Aa, u(a.desc), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(U, {
                  label: c(i)("type"),
                  align: "left",
                  "min-width": "80"
                }, {
                  default: s(({ row: a }) => [
                    e("span", Fa, u(a.type === "app" ? c(i)("app") : c(i)("addon")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(U, {
                  label: c(i)("author"),
                  align: "left",
                  "min-width": "80"
                }, {
                  default: s(({ row: a }) => [
                    e("span", Va, u(a.author), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(U, {
                  label: c(i)("operation"),
                  fixed: "right",
                  align: "right",
                  "min-width": "200"
                }, {
                  default: s(({ row: a }) => {
                    var w, z;
                    return [
                      _.value == "installed" || _.value == "all" || _.value == "uninstalled" ? (o(), d(I, { key: 0 }, [
                        a.install_info && ((w = Object.keys(a.install_info)) != null && w.length) ? (o(), g(b, {
                          key: 0,
                          class: "!text-[13px]",
                          type: "primary",
                          link: "",
                          onClick: (P) => Ze(a.key)
                        }, {
                          default: s(() => [
                            y(u(c(i)("unload")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        a.is_download && (!a.install_info || !Object.keys(a.install_info).length) ? (o(), g(b, {
                          key: 1,
                          class: "!text-[13px]",
                          type: "primary",
                          link: "",
                          onClick: (P) => _e(a.key)
                        }, {
                          default: s(() => [
                            y(u(c(i)("install")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        a.is_download ? x("", !0) : (o(), g(b, {
                          key: 2,
                          class: "!text-[13px]",
                          loading: N.value == a.key,
                          disabled: N.value != "",
                          type: "primary",
                          link: "",
                          onClick: R((P) => Ve(a), ["stop"])
                        }, {
                          default: s(() => [
                            e("span", null, u(c(i)("down")), 1)
                          ]),
                          _: 2
                        }, 1032, ["loading", "disabled", "onClick"]))
                      ], 64)) : (o(), d(I, { key: 1 }, [
                        _.value == "recentlyUpdated" && a.install_info && ((z = Object.keys(a.install_info)) != null && z.length) && a.install_info.version != a.version ? (o(), g(b, {
                          key: 0,
                          class: "!text-[13px]",
                          type: "primary",
                          link: "",
                          onClick: (P) => he(a)
                        }, {
                          default: s(() => [
                            y(u(c(i)("升级")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0)
                      ], 64)),
                      n(b, {
                        class: "!text-[13px]",
                        type: "primary",
                        link: "",
                        onClick: (P) => Le(a)
                      }, {
                        default: s(() => [
                          y(u(c(i)("detail")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ];
                  }),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])) : x("", !0),
            C.value || !k.value[_.value].length ? (o(), d("div", Ia, [
              n(Bt, {
                data: [],
                size: "large",
                class: "pt-[5px]"
              }, {
                default: s(() => [
                  n(U, {
                    label: c(i)("appName"),
                    align: "left",
                    width: "320"
                  }, null, 8, ["label"]),
                  n(U, {
                    align: "left",
                    "min-width": "120"
                  }),
                  n(U, {
                    label: c(i)("introduction"),
                    align: "left",
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  n(U, {
                    label: c(i)("type"),
                    align: "left",
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  n(U, {
                    label: c(i)("author"),
                    align: "left",
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  n(U, {
                    label: c(i)("operation"),
                    fixed: "right",
                    align: "right",
                    width: "150"
                  }, null, 8, ["label"])
                ]),
                _: 1
              }),
              C.value ? K((o(), d("div", Da, null, 512)), [
                [Oe, C.value]
              ]) : x("", !0)
            ])) : x("", !0)
          ], 512), [
            [se, O.value == "list" && !T.value]
          ]),
          O.value == "card" && Ie.value && !C.value && _.value == "installed" && !te.value && !T.value ? (o(), g(ge, {
            key: 0,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              Ba
            ]),
            description: s(() => [
              e("p", ja, u(c(i)("installed-empty")), 1)
            ]),
            _: 1
          })) : x("", !0),
          O.value == "card" && Ie.value && !C.value && _.value == "uninstalled" && !te.value && !T.value ? (o(), g(ge, {
            key: 1,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              Ta
            ]),
            description: s(() => [
              e("p", Ua, [
                e("span", null, u(c(i)("descriptionLeft")), 1),
                n(jt, {
                  type: "primary",
                  onClick: wt,
                  class: "mx-[5px]"
                }, {
                  default: s(() => [
                    y(u(c(i)("link")), 1)
                  ]),
                  _: 1
                }),
                e("span", null, u(c(i)("descriptionRight")), 1)
              ])
            ]),
            _: 1
          })) : x("", !0),
          !k.value.all.length && !C.value && !Ge.value && _.value == "all" && !te.value && !T.value ? (o(), d("div", La, [
            Sa,
            e("div", $a, [
              n(b, {
                class: "w-[154px] !h-[48px] mt-[8px]",
                type: "primary",
                onClick: kt
              }, {
                default: s(() => [
                  y("授权码认证")
                ]),
                _: 1
              }),
              n(Fl, {
                ref_key: "getAuthCodeDialog",
                ref: gt,
                placement: "bottom",
                width: 478,
                trigger: "click",
                class: "mt-[8px]"
              }, {
                reference: s(() => [
                  n(b, {
                    class: "w-[154px] !h-[48px] mt-[8px] !text-[var(--el-color-primary)] hover:!text-[var(--el-color-primary)] !bg-transparent",
                    plain: "",
                    type: "primary"
                  }, {
                    default: s(() => [
                      y("如何获取授权码? ")
                    ]),
                    _: 1
                  })
                ]),
                default: s(() => [
                  e("div", Ma, [
                    Ra,
                    e("div", Na, [
                      n(b, {
                        class: "w-[182px] !h-[48px]",
                        plain: "",
                        onClick: yt
                      }, {
                        default: s(() => [
                          y("去应用市场逛逛")
                        ]),
                        _: 1
                      }),
                      n(b, {
                        class: "w-[100px] !h-[48px]",
                        plain: "",
                        onClick: t[7] || (t[7] = (a) => gt.value.hide())
                      }, {
                        default: s(() => [
                          y("关闭")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 512)
            ])
          ])) : x("", !0),
          O.value == "card" && Ie.value && !C.value && Ge.value && _.value == "all" && !te.value && !T.value ? (o(), g(ge, {
            key: 3,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              Oa
            ]),
            description: s(() => [
              e("p", za, [
                e("span", null, u(c(i)("buyDescriptionLeft")), 1),
                n(jt, {
                  type: "primary",
                  onClick: wt,
                  class: "mx-[5px]"
                }, {
                  default: s(() => [
                    y(u(c(i)("link")), 1)
                  ]),
                  _: 1
                }),
                e("span", null, u(c(i)("descriptionRight")), 1)
              ])
            ]),
            _: 1
          })) : x("", !0),
          O.value == "card" && Ie.value && !C.value && _.value == "recentlyUpdated" && !T.value ? (o(), g(ge, {
            key: 4,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              Pa
            ]),
            description: s(() => [
              e("p", Ea, u(c(i)("recentlyUpdatedEmpty")), 1)
            ]),
            _: 1
          })) : x("", !0),
          n($e, {
            modelValue: Ue.value,
            "onUpdate:modelValue": t[11] || (t[11] = (a) => Ue.value = a),
            title: "授权码认证",
            width: "400px"
          }, {
            default: s(() => [
              n(Ft, {
                model: ie,
                "label-width": "0",
                ref_key: "formRef",
                ref: bt,
                rules: fl,
                class: "page-form"
              }, {
                default: s(() => [
                  n(tt, {
                    class: "box-card !border-none",
                    shadow: "never"
                  }, {
                    default: s(() => [
                      n(le, { prop: "auth_code" }, {
                        default: s(() => [
                          n(et, {
                            modelValue: ie.auth_code,
                            "onUpdate:modelValue": t[8] || (t[8] = (a) => ie.auth_code = a),
                            modelModifiers: { trim: !0 },
                            placeholder: c(i)("authCodePlaceholder"),
                            class: "input-width",
                            clearable: "",
                            size: "large"
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }),
                      e("div", Qa, [
                        n(le, { prop: "auth_secret" }, {
                          default: s(() => [
                            n(et, {
                              modelValue: ie.auth_secret,
                              "onUpdate:modelValue": t[9] || (t[9] = (a) => ie.auth_secret = a),
                              modelModifiers: { trim: !0 },
                              clearable: "",
                              placeholder: c(i)("authSecretPlaceholder"),
                              class: "input-width",
                              size: "large"
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        })
                      ]),
                      e("div", Ka, u(c(i)("authInfoTips")), 1),
                      e("div", qa, [
                        n(b, {
                          type: "primary",
                          class: "w-full",
                          size: "large",
                          loading: me.value,
                          onClick: t[10] || (t[10] = (a) => xl(bt.value))
                        }, {
                          default: s(() => [
                            y(u(c(i)("confirm")), 1)
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ]),
                      e("div", Ha, [
                        n(b, {
                          type: "primary",
                          link: "",
                          onClick: yt
                        }, {
                          default: s(() => [
                            y(u(c(i)("notHaveAuth")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model", "rules"])
            ]),
            _: 1
          }, 8, ["modelValue"]),
          n($e, {
            modelValue: G.value,
            "onUpdate:modelValue": t[16] || (t[16] = (a) => G.value = a),
            title: c(i)("addonInstall"),
            width: "850px",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "before-close": vl
          }, {
            default: s(() => [
              L.value != 2 && !W.value ? (o(), g(Vl, {
                key: 0,
                space: 200,
                active: L.value,
                class: "number-of-steps",
                "process-status": "process",
                "align-center": ""
              }, {
                default: s(() => [
                  n(st, {
                    title: c(i)("envCheck"),
                    class: "flex-1"
                  }, null, 8, ["title"]),
                  n(st, {
                    title: c(i)("installProgress"),
                    class: "flex-1"
                  }, null, 8, ["title"]),
                  n(st, {
                    title: c(i)("installComplete"),
                    class: "flex-1"
                  }, null, 8, ["title"])
                ]),
                _: 1
              }, 8, ["active"])) : x("", !0),
              K((o(), d("div", null, [
                e("div", Za, [
                  n(Ne, { style: { height: "calc(50vh)", overflow: "auto" } }, {
                    default: s(() => [
                      S.value.dir ? (o(), d("div", Ga, [
                        e("p", Wa, u(c(i)("dirPermission")), 1),
                        S.value.file_permission_is_pass ? x("", !0) : (o(), d("div", {
                          key: 0,
                          class: "mt-[10px] mx-[20px] text-[14px] cursor-pointer text-primary flex items-center justify-between bg-[#EFF6FF] rounded-[4px] p-[10px]",
                          onClick: hl
                        }, [
                          e("div", Ya, [
                            n(B, { size: 17 }, {
                              default: s(() => [
                                n(Dt)
                              ]),
                              _: 1
                            }),
                            Xa
                          ]),
                          Ja
                        ])),
                        e("div", en, [
                          n(de, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
                            default: s(() => [
                              n(V, { span: 18 }, {
                                default: s(() => [
                                  e("span", null, u(c(i)("path")), 1)
                                ]),
                                _: 1
                              }),
                              n(V, { span: 3 }, {
                                default: s(() => [
                                  e("span", null, u(c(i)("demand")), 1)
                                ]),
                                _: 1
                              }),
                              n(V, { span: 3 }, {
                                default: s(() => [
                                  e("span", null, u(c(i)("status")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          (o(!0), d(I, null, Y(S.value.dir.is_readable, (a, w) => (o(), g(de, {
                            class: "pb-[10px] items pl-[15px]",
                            key: w
                          }, {
                            default: s(() => [
                              n(V, { span: 18 }, {
                                default: s(() => [
                                  e("span", null, u(a.dir), 1)
                                ]),
                                _: 2
                              }, 1024),
                              n(V, { span: 3 }, {
                                default: s(() => [
                                  e("span", null, u(c(i)("readable")), 1)
                                ]),
                                _: 1
                              }),
                              n(V, { span: 3 }, {
                                default: s(() => [
                                  a.status ? (o(), d("span", tn, [
                                    n(B, { color: "green" }, {
                                      default: s(() => [
                                        n(Me)
                                      ]),
                                      _: 1
                                    })
                                  ])) : (o(), d("span", ln, [
                                    n(B, { color: "red" }, {
                                      default: s(() => [
                                        n(Re)
                                      ]),
                                      _: 1
                                    })
                                  ]))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024))), 128)),
                          (o(!0), d(I, null, Y(S.value.dir.is_write, (a, w) => (o(), g(de, {
                            class: "pb-[10px] items pl-[15px]",
                            key: w
                          }, {
                            default: s(() => [
                              n(V, { span: 18 }, {
                                default: s(() => [
                                  e("span", null, u(a.dir), 1)
                                ]),
                                _: 2
                              }, 1024),
                              n(V, { span: 3 }, {
                                default: s(() => [
                                  e("span", null, u(c(i)("write")), 1)
                                ]),
                                _: 1
                              }),
                              n(V, { span: 3 }, {
                                default: s(() => [
                                  a.status ? (o(), d("span", sn, [
                                    n(B, { color: "green" }, {
                                      default: s(() => [
                                        n(Me)
                                      ]),
                                      _: 1
                                    })
                                  ])) : (o(), d("span", an, [
                                    n(B, { color: "red" }, {
                                      default: s(() => [
                                        n(Re)
                                      ]),
                                      _: 1
                                    })
                                  ]))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024))), 128))
                        ])
                      ])) : x("", !0),
                      S.value.addon_check && S.value.addon_check.length ? (o(), d("div", nn, [
                        on,
                        e("div", un, [
                          (o(!0), d(I, null, Y(S.value.addon_check, (a) => (o(), g(Il, {
                            class: "!mb-[10px]",
                            type: "error",
                            closable: !1
                          }, {
                            default: s(() => [
                              e("div", {
                                innerHTML: a.msg
                              }, null, 8, cn)
                            ]),
                            _: 2
                          }, 1024))), 256))
                        ])
                      ])) : x("", !0)
                    ]),
                    _: 1
                  })
                ]),
                e("div", dn, [
                  n(b, {
                    type: "primary",
                    class: "!w-[140px]",
                    disabled: !S.value.is_pass || xe.value,
                    loading: fe.value,
                    onClick: ul
                  }, {
                    default: s(() => [
                      y(u(c(i)("install")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"])
                ])
              ])), [
                [se, L.value == 0],
                [Oe, !S.value.dir]
              ]),
              K(e("div", pn, [
                e("div", rn, [
                  e("div", vn, [
                    n(c(rs), {
                      ref_key: "terminalRef",
                      ref: X,
                      name: `install-${Zt.value}`,
                      context: Z.value,
                      "init-log": null,
                      "show-header": !1,
                      "show-log-time": !0,
                      onExecCmd: al
                    }, null, 8, ["name", "context"])
                  ]),
                  e("div", _n, [
                    n(b, {
                      type: "primary",
                      loading: !0,
                      class: "!w-[140px]"
                    }, {
                      default: s(() => [
                        y("已用时 " + u(xt.value), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])
              ], 512), [
                [se, L.value == 1 && !W.value]
              ]),
              K(e("div", fn, [
                n(Tt, {
                  icon: "success",
                  title: c(i)("addonInstallSuccess")
                }, {
                  icon: s(() => [
                    xn
                  ]),
                  extra: s(() => [
                    (o(!0), d(I, null, Y(Ae.value, (a, w) => (o(), d("div", {
                      class: "mb-[10px]",
                      key: w
                    }, [
                      e("div", hn, u(a), 1)
                    ]))), 128)),
                    ne.value > 0 ? (o(), d("div", mn, "本次安装用时" + u(xt.value), 1)) : x("", !0),
                    e("div", yn, [
                      oe.value == "cloud" ? (o(), g(b, {
                        key: 0,
                        onClick: t[12] || (t[12] = (a) => ft()),
                        class: "!w-[90px]"
                      }, {
                        default: s(() => [
                          y("返回")
                        ]),
                        _: 1
                      })) : x("", !0),
                      n(b, {
                        onClick: t[13] || (t[13] = (a) => G.value = !1),
                        type: "primary",
                        class: "!w-[90px]"
                      }, {
                        default: s(() => [
                          y("完成")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }, 8, ["title"])
              ], 512), [
                [se, L.value == 2]
              ]),
              K(e("div", gn, [
                n(Tt, {
                  icon: "error",
                  title: c(i)("安装失败")
                }, {
                  icon: s(() => [
                    kn
                  ]),
                  extra: s(() => [
                    n(Ne, { class: "max-h-[120px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]" }, {
                      default: s(() => [
                        y(u(mt.value), 1)
                      ]),
                      _: 1
                    }),
                    oe.value == "cloud" ? (o(), g(b, {
                      key: 0,
                      onClick: t[14] || (t[14] = (a) => ft()),
                      class: "!w-[90px]"
                    }, {
                      default: s(() => [
                        y("错误信息")
                      ]),
                      _: 1
                    })) : x("", !0),
                    n(b, {
                      onClick: t[15] || (t[15] = (a) => G.value = !1),
                      type: "primary",
                      class: "!w-[90px]"
                    }, {
                      default: s(() => [
                        y("完成")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title"])
              ], 512), [
                [se, W.value]
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          n($e, {
            modelValue: He.value,
            "onUpdate:modelValue": t[17] || (t[17] = (a) => He.value = a),
            title: c(i)("addonUninstall"),
            width: "850px",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1
          }, {
            default: s(() => [
              n(Ne, { "max-height": "50vh" }, {
                default: s(() => [
                  e("div", bn, [
                    Te.value.dir ? (o(), d("div", wn, [
                      e("p", Cn, u(c(i)("dirPermission")), 1),
                      e("div", An, [
                        n(de, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
                          default: s(() => [
                            n(V, { span: 18 }, {
                              default: s(() => [
                                e("span", null, u(c(i)("path")), 1)
                              ]),
                              _: 1
                            }),
                            n(V, { span: 3 }, {
                              default: s(() => [
                                e("span", null, u(c(i)("demand")), 1)
                              ]),
                              _: 1
                            }),
                            n(V, { span: 3 }, {
                              default: s(() => [
                                e("span", null, u(c(i)("status")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        (o(!0), d(I, null, Y(Te.value.dir.is_readable, (a, w) => (o(), g(de, {
                          class: "pb-[10px] items pl-[15px]",
                          key: w
                        }, {
                          default: s(() => [
                            n(V, { span: 18 }, {
                              default: s(() => [
                                e("span", null, u(a.dir), 1)
                              ]),
                              _: 2
                            }, 1024),
                            n(V, { span: 3 }, {
                              default: s(() => [
                                e("span", null, u(c(i)("readable")), 1)
                              ]),
                              _: 1
                            }),
                            n(V, { span: 3 }, {
                              default: s(() => [
                                a.status ? (o(), d("span", Fn, [
                                  n(B, { color: "green" }, {
                                    default: s(() => [
                                      n(Me)
                                    ]),
                                    _: 1
                                  })
                                ])) : (o(), d("span", Vn, [
                                  n(B, { color: "red" }, {
                                    default: s(() => [
                                      n(Re)
                                    ]),
                                    _: 1
                                  })
                                ]))
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024))), 128)),
                        (o(!0), d(I, null, Y(Te.value.dir.is_write, (a, w) => (o(), g(de, {
                          class: "pb-[10px] items pl-[15px]",
                          key: w
                        }, {
                          default: s(() => [
                            n(V, { span: 18 }, {
                              default: s(() => [
                                e("span", null, u(a.dir), 1)
                              ]),
                              _: 2
                            }, 1024),
                            n(V, { span: 3 }, {
                              default: s(() => [
                                e("span", null, u(c(i)("write")), 1)
                              ]),
                              _: 1
                            }),
                            n(V, { span: 3 }, {
                              default: s(() => [
                                a.status ? (o(), d("span", In, [
                                  n(B, { color: "green" }, {
                                    default: s(() => [
                                      n(Me)
                                    ]),
                                    _: 1
                                  })
                                ])) : (o(), d("span", Dn, [
                                  n(B, { color: "red" }, {
                                    default: s(() => [
                                      n(Re)
                                    ]),
                                    _: 1
                                  })
                                ]))
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024))), 128))
                      ])
                    ])) : x("", !0)
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          n($e, {
            modelValue: ve.value,
            "onUpdate:modelValue": t[19] || (t[19] = (a) => ve.value = a),
            title: "下载提示",
            width: "30%"
          }, {
            footer: s(() => [
              e("span", jn, [
                n(b, {
                  onClick: t[18] || (t[18] = (a) => ve.value = !1)
                }, {
                  default: s(() => [
                    y("取消")
                  ]),
                  _: 1
                }),
                n(b, {
                  type: "primary",
                  onClick: el
                }, {
                  default: s(() => [
                    y("确定")
                  ]),
                  _: 1
                })
              ])
            ]),
            default: s(() => [
              Bn
            ]),
            _: 1
          }, 8, ["modelValue"]),
          !C.value && T.value ? (o(), g(tt, {
            key: 5,
            class: "box-card app-detail-static !border-none",
            shadow: "never"
          }, {
            default: s(() => {
              var a, w, z, P, E, Ut, Lt, St, $t, Mt, Rt, Nt, Ot, zt;
              return [
                e("div", {
                  class: "flex items-center text-[14px] text-primary cursor-pointer mb-[20px]",
                  onClick: At
                }, [
                  n(B, { class: "mr-[6px]" }, {
                    default: s(() => [
                      n(Dl)
                    ]),
                    _: 1
                  }),
                  Tn
                ]),
                e("div", Un, [
                  e("div", Ln, [
                    e("div", Sn, [
                      e("div", $n, [
                        n(lt, {
                          class: "w-full h-full",
                          src: c(nt)((a = f.value) == null ? void 0 : a.icon),
                          fit: "contain"
                        }, {
                          error: s(() => [
                            Mn
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ]),
                      e("div", null, [
                        e("div", Rn, u(((w = f.value) == null ? void 0 : w.title) || "-"), 1),
                        e("div", Nn, u(((z = f.value) == null ? void 0 : z.key) || "-"), 1)
                      ])
                    ]),
                    e("div", On, [
                      f.value.key != "niucloud-admin" ? (o(), d(I, { key: 0 }, [
                        f.value.is_download ? !f.value.install_info || Object.keys(f.value.install_info).length == 0 ? (o(), g(b, {
                          key: 1,
                          type: "primary",
                          class: "!bg-[#0766F5]",
                          onClick: t[21] || (t[21] = R((j) => _e(f.value.key), ["stop"]))
                        }, {
                          default: s(() => [
                            y("安装")
                          ]),
                          _: 1
                        })) : f.value.install_info.version != f.value.version ? (o(), g(b, {
                          key: 2,
                          type: "warning",
                          onClick: t[22] || (t[22] = R((j) => he(f.value), ["stop"]))
                        }, {
                          default: s(() => [
                            y(" 升级 ")
                          ]),
                          _: 1
                        })) : x("", !0) : (o(), g(b, {
                          key: 0,
                          type: "primary",
                          class: "download-btn !bg-[#0766F5]",
                          loading: N.value == f.value.key,
                          disabled: N.value != "",
                          onClick: t[20] || (t[20] = R((j) => Ve(f.value), ["stop"]))
                        }, {
                          default: s(() => [
                            y("安装 ")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])),
                        f.value.is_download && (!f.value.install_info || !Object.keys(f.value.install_info).length) ? (o(), g(b, {
                          key: 3,
                          type: "info",
                          onClick: t[23] || (t[23] = (j) => ml(f.value.key))
                        }, {
                          default: s(() => [
                            y(" 删除 ")
                          ]),
                          _: 1
                        })) : x("", !0),
                        f.value.is_download && f.value.install_info && Object.keys(f.value.install_info).length ? (o(), g(b, {
                          key: 4,
                          type: "info",
                          onClick: t[24] || (t[24] = (j) => Ze(f.value.key))
                        }, {
                          default: s(() => [
                            y(" 卸载 ")
                          ]),
                          _: 1
                        })) : x("", !0)
                      ], 64)) : (o(), d(I, { key: 1 }, [
                        f.value.install_info.version != f.value.version ? (o(), g(b, {
                          key: 0,
                          type: "warning",
                          onClick: t[25] || (t[25] = R((j) => he(f.value), ["stop"]))
                        }, {
                          default: s(() => [
                            y(" 升级 ")
                          ]),
                          _: 1
                        })) : x("", !0)
                      ], 64))
                    ])
                  ]),
                  (P = f.value) != null && P.type || (E = f.value) != null && E.desc ? (o(), d("div", zn, Qn)) : x("", !0),
                  (Ut = f.value) != null && Ut.type || (Lt = f.value) != null && Lt.desc ? (o(), d("div", Kn, [
                    e("div", qn, [
                      Hn,
                      e("div", Zn, u(((St = f.value) == null ? void 0 : St.type) == "app" ? "应用" : "插件"), 1)
                    ]),
                    e("div", Gn, [
                      Wn,
                      e("div", Yn, u((($t = f.value) == null ? void 0 : $t.desc) || "-"), 1)
                    ])
                  ])) : x("", !0),
                  Xn,
                  e("div", Jn, [
                    e("div", eo, [
                      to,
                      e("div", lo, [
                        e("div", so, u(f.value.expire_time || "--"), 1),
                        f.value.app_id ? (o(), d("div", ao, [
                          no,
                          e("span", {
                            class: "text-[var(--el-color-primary)] text-[14px] cursor-pointer",
                            onClick: t[26] || (t[26] = (j) => Je("pc"))
                          }, "续费应用")
                        ])) : x("", !0)
                      ])
                    ])
                  ]),
                  (Mt = f.value) != null && Mt.author || (Rt = f.value) != null && Rt.author_phone ? (o(), d(I, { key: 2 }, [
                    oo,
                    e("div", io, [
                      e("div", uo, [
                        co,
                        e("div", po, u(((Nt = f.value) == null ? void 0 : Nt.author) || "-"), 1)
                      ]),
                      (Ot = f.value) != null && Ot.author_phone ? (o(), d("div", ro, [
                        vo,
                        e("div", _o, [
                          y(u((zt = f.value) == null ? void 0 : zt.author_phone) + " ", 1),
                          n(B, { class: "ml-[6px] text-primary" }, {
                            default: s(() => [
                              n(Bl)
                            ]),
                            _: 1
                          })
                        ])
                      ])) : x("", !0)
                    ])
                  ], 64)) : x("", !0),
                  f.value.key != "niucloud-admin" && f.value.app_id ? (o(), d("div", fo, mo)) : x("", !0),
                  f.value.key != "niucloud-admin" && f.value.app_id ? (o(), d("div", yo, [
                    e("div", {
                      class: "bg-[#F5F5F5] w-[336px] h-[60px] px-[20px] flex items-center justify-between cursor-pointer",
                      onClick: t[27] || (t[27] = (j) => Je("pc"))
                    }, [
                      e("div", go, [
                        e("div", ko, [
                          n(B, null, {
                            default: s(() => [
                              n(jl)
                            ]),
                            _: 1
                          })
                        ]),
                        bo
                      ]),
                      wo
                    ]),
                    e("div", {
                      class: "bg-[#F5F5F5] w-[336px] h-[60px] px-[20px] flex items-center justify-between cursor-pointer",
                      onClick: t[28] || (t[28] = (j) => Je("pc"))
                    }, [
                      e("div", Co, [
                        e("div", Ao, [
                          n(B, null, {
                            default: s(() => [
                              n(Tl)
                            ]),
                            _: 1
                          })
                        ]),
                        Fo
                      ]),
                      Vo
                    ])
                  ])) : x("", !0),
                  Io,
                  e("div", Do, [
                    Bo,
                    e("div", jo, u(wl.value), 1)
                  ]),
                  To,
                  K((o(), d("div", Uo, [
                    n(Ne, { class: "px-[20px]" }, {
                      default: s(() => [
                        ye.value.length ? (o(), g($l, {
                          key: 0,
                          style: { width: "100%" }
                        }, {
                          default: s(() => [
                            (o(!0), d(I, null, Y(ye.value, (j, Pt) => (o(), g(Sl, {
                              key: j.version_no || Pt,
                              placement: "left"
                            }, {
                              default: s(() => [
                                n(Ll, {
                                  modelValue: Xe.value,
                                  "onUpdate:modelValue": t[29] || (t[29] = (Ml) => Xe.value = Ml),
                                  accordion: ""
                                }, {
                                  default: s(() => [
                                    n(Ul, { name: Pt }, {
                                      title: s(() => [
                                        e("div", Lo, [
                                          e("div", So, [
                                            e("p", $o, "版本：V" + u(j.version_no), 1),
                                            e("div", Mo, [
                                              e("span", Ro, u(Ct(j.release_time)[0]), 1),
                                              e("span", No, u(Ct(j.release_time)[1]), 1)
                                            ])
                                          ]),
                                          Oo
                                        ])
                                      ]),
                                      default: s(() => [
                                        j.upgrade_log ? (o(), d("div", zo, [
                                          e("div", {
                                            innerHTML: j.upgrade_log
                                          }, null, 8, Po)
                                        ])) : x("", !0)
                                      ]),
                                      _: 2
                                    }, 1032, ["name"])
                                  ]),
                                  _: 2
                                }, 1032, ["modelValue"])
                              ]),
                              _: 2
                            }, 1024))), 128))
                          ]),
                          _: 1
                        })) : (o(), g(ge, {
                          key: 1,
                          description: "暂无版本更新信息"
                        }))
                      ]),
                      _: 1
                    })
                  ])), [
                    [Oe, Ye.value]
                  ])
                ])
              ];
            }),
            _: 1
          })) : x("", !0)
        ])), [
          [Oe, C.value]
        ]),
        n(hs, {
          upgradeKey: l.upgradeKey,
          ref_key: "upgradeLogRef",
          ref: Wt
        }, null, 8, ["upgradeKey"]),
        n(fs, {
          ref_key: "upgradeRef",
          ref: ct,
          onComplete: Yt,
          onCloudbuild: pl
        }, null, 512),
        n(xs, {
          ref_key: "cloudBuildRef",
          ref: Ce
        }, null, 512)
      ], 64);
    };
  }
});
const ri = /* @__PURE__ */ Gl(Eo, [["__scopeId", "data-v-5bb6146d"]]);
export {
  ri as default
};
