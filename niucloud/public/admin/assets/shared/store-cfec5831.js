import { defineComponent as Tl, ref as r, reactive as Je, computed as fe, watch as Ll, resolveComponent as m, resolveDirective as Sl, openBlock as o, createElementBlock as d, Fragment as D, withDirectives as q, createVNode as a, withCtx as l, createElementVNode as e, normalizeClass as xe, createTextVNode as y, createCommentVNode as p, createBlock as g, unref as c, toDisplayString as u, vShow as le, renderList as W, withModifiers as R, h as Mt, pushScopeId as $l, popScopeId as Rl } from "vue";
import { _ as et } from "./icon-addon-one-2b9cfff5.js";
import { _ as Me } from "./apply_empty-3b0bc5e4.js";
import { a as Ml, _ as zl } from "./success_icon-605a2b43.js";
import { s as Re, u as Ol, t as i, g as Nl, co as zt, cq as Pl, I as El, _ as Ql } from "./core-shared-ca1fcae5.js";
import { d as ql, e as Kl, p as Hl, f as Zl, i as Gl, h as Wl, j as Yl, u as Xl, k as Jl } from "./addon-84f9cff9.js";
import { g as Ot, c as es, d as ts, s as ls, b as ss } from "./module-15a2966b.js";
import { ElNotification as as, ElMessageBox as he, ElMessage as ns } from "element-plus";
import { T as os, _ as is } from "./dark-eb307d84.js";
import { useRouter as us, useRoute as cs } from "vue-router";
import ds from "./index-14321927.js";
import ps from "./index-97f1117f.js";
import rs from "./index-5eacfa37.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const _s = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAC90lEQVR4AeyYzWsTQRjGn51WaQ+2aiQ9qBiIxiqILXjw4k2hVRA/rgWrLXjwoKD/hR568aD4dei9IDS5+AeoFVI/ED9aaQ8KLfWjCibYmPF9dnbrirGdNWNYS8O+884+M/POb9/dIcMoBL/b/bolP6gv5gd0MX9Gl8TrBtuCzDs2OqDPkyXAgg840q8zaYUiNK5IQxc8tIhv9NUs8+7zgCGykIkAirRrFQqeh04KSTCykIlsKt2EsxSSABZlIFOHwjnlafRFG5JU1x76lLz3riRBRVkkeZ1KhGaxZF6yWAmYTLiAamUCbjkAbD8azzgmSEosFzuD6W5gzylghwDGMY7ZuDMWm985NmDmoD8O7x4Cr+8Cb++b+9JHc18WT4U622kzRSrws25q9mUsQGYgJVlY+Ao8vQVMCOD8pJns/XNzPyeeyifR2U57In05hmMZg+22FgswzN7UPaBaMVO0ZYyfnzL+c+DbA51qpQRwDOv8dultzRpw3VagQ74/Bl7Tal4XJ9u0mwqwPmu0dvFUUqKzPTSO8XV5A23bWLMza8DcsZ8BM4ewuEhaNhh9836j0VNpFT26iDiGOi13nKWdWQOm95qA/OijZlSzQEK9lhZtS+0KeyzvrQHDUPzoo1ZLr6WFY9immljaWWxAu7Dueq0C1ptLZxnsvQGEVi9UdHzdgPzLiwYM63/Sw3ZbXzfg4+tAYfB3o24LsVS/ugGXCu6izRGgC5TaMVYBa+fFXrXO4LcvJmjuBPyNZ7hLieNzJ00M7g1NbfnSGnBi1ATLHsbiTia6W7GpZ3tNjDcF421Ka8Bp2aSODf26awl3KLb+1Qjw4DLwTwD5tHPPzLY+3JnE9ZPyFj68ZCR7s86gfUi3Pf8DQI2y22d2Gq2i5IjrhdOQDoNpjXGeDw47jOk2lIdhNVPFVSFNXBbJNPsd19TpO15ZDjF7KLh9/L+P5rN46CGbv4qP3PSmZ6vo1sAFOel/BCA4N5Baoy5ZrDL/uMx/iSxk4tQ/AAAA//8PWFibAAAABklEQVQDAC9efelrVorbAAAAAElFTkSuQmCC", x = (me) => ($l("data-v-b7a84894"), me = me(), Rl(), me), vs = { class: "main-container app-market bg-body min-h-[70vh]" }, fs = { class: "flex flex-col mb-[8px]" }, xs = { class: "flex items-center justify-between mb-[5px]" }, hs = /* @__PURE__ */ x(() => /* @__PURE__ */ e("h2", { class: "text-lg font-semibold" }, "应用列表", -1)), ms = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "已安装", -1)), ys = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "未安装", -1)), gs = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "已购买", -1)), ks = { class: "relative" }, bs = {
  key: 0,
  class: "w-[8px] h-[8px] bg-[red] rounded-[8px] z-1 absolute top-[-2px] right-[-2px]"
}, ws = { key: 1 }, Cs = { class: "flex items-center bg-[#F4F5F7] h-[80px] justify-between px-[20px]" }, As = { class: "flex items-center" }, Fs = { class: "w-[42px] h-[42px] bg-purple-100 rounded flex items-center justify-center mr-2 relative" }, Vs = /* @__PURE__ */ x(() => /* @__PURE__ */ e("img", {
  class: "max-w-full max-h-full",
  src: _s,
  alt: ""
}, null, -1)), Ds = {
  key: 0,
  class: "w-[8px] h-[8px] bg-[red] rounded-[8px] z-1 absolute top-[-2px] right-[-2px]"
}, Bs = {
  key: 0,
  class: "flex items-center"
}, js = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "text-[16px] font-[500] text-[#1D1F3A]" }, "框架更新", -1)), Is = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "text-[12px] text-[#9699B6] ml-[10px]" }, "必须优先更新", -1)), Us = [
  js,
  Is
], Ts = {
  key: 1,
  class: "flex items-center"
}, Ls = { class: "text-[16px] font-[500] text-[#1D1F3A]" }, Ss = { class: "text-[14px] text-[#374151]" }, $s = {
  key: 0,
  class: ""
}, Rs = {
  key: 1,
  class: "iconfont iconjiang-right text-[#F09000] mx-[2px]"
}, Ms = {
  key: 2,
  class: "text-[#F09000] mr-[4px]"
}, zs = {
  key: 3,
  class: "mr-[4px]"
}, Os = { class: "text-[#F09000] mr-[4px]" }, Ns = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "个应用可更新", -1)), Ps = { key: 0 }, Es = { class: "flex items-center justify-between mt-[14px] mb-[6px]" }, Qs = { class: "flex items-center text-[12px]" }, qs = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "共", -1)), Ks = { class: "text-[#EF3826]" }, Hs = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "个应用更新", -1)), Zs = { class: "flex mb-4 flex-wrap" }, Gs = ["onClick"], Ws = { class: "flex items-start flex-1 w-0" }, Ys = { class: "w-[42px] h-[42px] bg-purple-100 rounded flex items-center justify-center mr-2 relative" }, Xs = { class: "w-full h-full overflow-hidden rounded" }, Js = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-full max-h-full",
    src: et,
    alt: ""
  })
], -1)), ea = { class: "flex-1 w-0" }, ta = { class: "flex items-center" }, la = ["title"], sa = ["title"], aa = { class: "text-[#374151] text-[12px] leading-[16px] mt-[4px]" }, na = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "当前版本：", -1)), oa = {
  key: 0,
  class: "text-[#374151] ml-[5px] text-[12px]"
}, ia = { class: "relative px-[20px] pb-[20px]" }, ua = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { style: { opacity: "0" } }, ".", -1)), ca = [
  ua
], da = ["onClick"], pa = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full rounded-[5px]" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-full max-h-full",
    src: et,
    alt: ""
  })
], -1)), ra = { class: "flex-1 w-0 flex flex-col justify-center pl-[20px] font-500 text-[13px]" }, _a = { class: "w-[236px] truncate leading-[18px]" }, va = {
  key: 0,
  class: "w-[236px] truncate leading-[18px] mt-[6px]"
}, fa = {
  key: 1,
  class: "w-[236px] truncate leading-[18px] mt-[6px]"
}, xa = { class: "mt-[3px] flex flex-nowrap" }, ha = { class: "flex items-center" }, ma = { class: "font-500 text-[13px] mr-[5px]" }, ya = { class: "font-500 text-[13px]" }, ga = { class: "font-500 text-[13px] multi-hidden" }, ka = { class: "font-500 text-[13px] multi-hidden" }, ba = { class: "font-500 text-[13px]" }, wa = {
  key: 1,
  class: "data-loading"
}, Ca = {
  key: 0,
  class: "h-[100px]"
}, Aa = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: Me,
    class: "max-w-full",
    alt: ""
  })
], -1)), Fa = { class: "flex items-center" }, Va = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: Me,
    class: "max-w-full",
    alt: ""
  })
], -1)), Da = { class: "flex items-center" }, Ba = {
  key: 2,
  class: "mx-auto overview-empty flex flex-col items-center pt-14 pb-6"
}, ja = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "mb-[20px] text-sm text-[#888]" }, "检测到当前账号尚未绑定授权，请先绑定授权！", -1)), Ia = { class: "flex flex-1 flex-wrap justify-center relative" }, Ua = { class: "px-[18px] py-[8px]" }, Ta = /* @__PURE__ */ x(() => /* @__PURE__ */ e("p", { class: "leading-[32px] text-[14px]" }, " 您在官方应用市场购买任意一款应用，即可获得授权码。输入正确授权码认证通过后，即可支持在线升级和其它相关服务 ", -1)), La = { class: "flex justify-end mt-[36px]" }, Sa = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: Me,
    class: "max-w-full",
    alt: ""
  })
], -1)), $a = { class: "flex items-center" }, Ra = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: Me,
    class: "max-w-full",
    alt: ""
  })
], -1)), Ma = { class: "flex items-center" }, za = { class: "mt-[20px]" }, Oa = { class: "text-sm mt-[10px] text-info" }, Na = { class: "mt-[20px]" }, Pa = { class: "mt-[10px] text-right" }, Ea = { class: "min-h-[150px]" }, Qa = {
  key: 0,
  class: "mt-3"
}, qa = { class: "pt-[20px] pl-[20px]" }, Ka = { class: "flex items-center" }, Ha = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "ml-[5px] leading-[20px]" }, "编译权限错误，查看解决方案", -1)), Za = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "border-[1px] border-primary rounded-[3px] w-[72px] h-[26px] leading-[25px] text-center" }, "立即查看", -1)), Ga = { class: "px-[20px] pt-[10px] text-[14px]" }, Wa = { key: 0 }, Ya = { key: 1 }, Xa = {
  key: 0,
  class: "text-right"
}, Ja = { key: 1 }, en = {
  key: 1,
  class: "my-3"
}, tn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("p", { class: "pl-[20px]" }, "插件验证", -1)), ln = { class: "px-[20px] pt-[10px] text-[14px]" }, sn = ["innerHTML"], an = { class: "flex justify-end" }, nn = { class: "h-[50vh] mt-[20px]" }, on = { class: "flex flex-col h-full" }, un = { class: "flex-1 h-0" }, cn = { class: "flex justify-end mt-[20px]" }, dn = { class: "h-[50vh] mt-[20px] flex flex-col" }, pn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("img", {
  src: Ml,
  alt: ""
}, null, -1)), rn = { class: "text-[16px] text-[#4F516D] mt-[5px]" }, _n = {
  key: 0,
  class: "text-[16px] text-[#9699B6] mt-[10px]"
}, vn = { class: "mt-[20px]" }, fn = { class: "h-[50vh] mt-[20px] flex flex-col" }, xn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("img", {
  src: zl,
  alt: ""
}, null, -1)), hn = { class: "min-h-[150px]" }, mn = {
  key: 0,
  class: "bg-[#fff] my-3"
}, yn = { class: "pt-[20px] pl-[20px]" }, gn = { class: "px-[20px] pt-[10px] text-[14px]" }, kn = { key: 0 }, bn = { key: 1 }, wn = { key: 0 }, Cn = { key: 1 }, An = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "本地已经存在该插件/应用，再次下载会覆盖该插件/应用。", -1)), Fn = { class: "dialog-footer" }, Vn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "返回应用列表", -1)), Dn = { class: "border-[1px] border-solid border-[#EBEEF5] p-[20px]" }, Bn = { class: "flex items-center justify-between" }, jn = { class: "flex items-center" }, In = { class: "w-[42px] h-[42px] rounded-[6px] flex items-center justify-center mr-[10px] overflow-hidden" }, Un = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-full max-h-full",
    src: et,
    alt: ""
  })
], -1)), Tn = { class: "text-[16px] font-[500] leading-[20px]" }, Ln = { class: "text-[12px] text-[#374151] leading-[18px] mt-[5px]" }, Sn = { class: "flex items-center ml-[auto] gap-[10px] detail-btn-box" }, $n = {
  key: 0,
  class: "app-section-header mt-[20px] mb-[12px]"
}, Rn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-title" }, "应用信息", -1)), Mn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-line" }, null, -1)), zn = [
  Rn,
  Mn
], On = {
  key: 1,
  class: "space-y-[10px] text-[14px]"
}, Nn = { class: "flex items-center" }, Pn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "应用类型：", -1)), En = { class: "text-[#374151]" }, Qn = { class: "flex items-start" }, qn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6] pt-[2px]" }, "应用简介：", -1)), Kn = { class: "text-[#374151] flex-1" }, Hn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "服务周期"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), Zn = { class: "space-y-[10px] text-[14px]" }, Gn = { class: "flex items-center" }, Wn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "有效期至：", -1)), Yn = { class: "text-[#374151] flex items-center" }, Xn = { class: "text-[#374151]" }, Jn = {
  key: 0,
  class: "ml-[10px] flex items-center gap-[3px]"
}, eo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "iconfont icongouwuche text-[var(--el-color-primary)]" }, null, -1)), to = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "开发者信息"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), lo = { class: "space-y-[10px] text-[14px]" }, so = { class: "flex items-center" }, ao = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "开发者：", -1)), no = { class: "text-[#374151]" }, oo = {
  key: 0,
  class: "flex items-center"
}, io = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "联系方式：", -1)), uo = { class: "text-[#374151] inline-flex items-center" }, co = {
  key: 3,
  class: "app-section-header mt-[20px] mb-[12px]"
}, po = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-title" }, "访问应用", -1)), ro = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-line" }, null, -1)), _o = [
  po,
  ro
], vo = {
  key: 4,
  class: "flex gap-[30px]"
}, fo = { class: "flex items-center" }, xo = { class: "w-[28px] h-[28px] flex items-center justify-center mr-[2px]" }, ho = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "text-[14px] text-[#374151]" }, "PC端应用主页", -1)), mo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "iconfont iconjiang-right" }, null, -1)), yo = { class: "flex items-center" }, go = { class: "w-[28px] h-[28px] flex items-center justify-center mr-[2px]" }, ko = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "text-[14px] text-[#374151]" }, "移动端应用主页", -1)), bo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "iconfont iconjiang-right" }, null, -1)), wo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "应用版本"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), Co = { class: "flex items-center text-[14px]" }, Ao = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "当前版本：", -1)), Fo = { class: "text-[#374151]" }, Vo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "更新历史"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), Do = { class: "detail-upgrade-log -mx-[20px] h-[500px] overflow-auto" }, Bo = { class: "flex items-center justify-between flex-1" }, jo = { class: "flex flex-col items-baseline" }, Io = { class: "text-[#1D1F3A] text-[14px]" }, Uo = { class: "flex items-center leading-[1] mt-[2px]" }, To = { class: "text-[#9699B6] text-[14px]" }, Lo = { class: "text-[#9699B6] text-[14px] ml-[3px]" }, So = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center collapse-arrow" }, [
  /* @__PURE__ */ e("span", { class: "expand text-[14px] !text-[#374151]" }, "更新内容"),
  /* @__PURE__ */ e("span", { class: "fold-up text-[14px] !text-[#374151]" }, "收起"),
  /* @__PURE__ */ e("span", { class: "nc-iconfont nc-icon-xiaV6xx ml-[2px] text-[#9699B6]" })
], -1)), $o = {
  key: 0,
  class: "timeline-log-wrap"
}, Ro = ["innerHTML"], Mo = /* @__PURE__ */ Tl({
  __name: "store",
  setup(me) {
    const Nt = r(null);
    us();
    const tt = cs(), Pt = r(Date.now()), _ = r(Re.get("storeActiveName") || "installed"), lt = r(null), ye = r(null), C = r(!0), M = r(""), ze = r([]), ge = Ol(), ie = r(!1), ue = r(null), B = r(""), Et = r(""), Qt = r(null), z = r(Re.get("storeShowType") || "card"), O = r(""), K = Je({
      keywords: "",
      type: ""
    }), st = () => {
      Nl().then((n) => {
        B.value = n.data.version.version, Et.value = n.data.version.code;
      }), es().then(({ data: n }) => {
        O.value = n.last_version;
      });
    };
    st();
    const qt = () => {
      st(), Y();
    }, Kt = () => {
      z.value = z.value == "card" ? "list" : "card", Re.set({ key: "storeShowType", data: z.value });
    }, Ht = r({});
    (() => {
      ql().then((n) => {
        Ht.value = n.data.type_list;
      });
    })();
    const at = r(), Zt = () => {
      be(at.value, !0);
    }, A = r([]), ke = (n) => {
      _.value = n, Re.set({ key: "storeActiveName", data: n }), n == "recentlyUpdated" && k.value[_.value].length ? A.value = k.value[_.value].map((t) => t.key) : A.value = [], U.value && gt();
    };
    tt.query.id && ke(tt.query.id);
    const be = (n, t = !1) => {
      if (n.is_download && _.value == "all" && !t)
        return ie.value = !0, at.value = n, !1;
      M.value || (M.value = n.key, ts({ addon: n.key, version: n.version }).then(() => {
        ie.value = !1, Ae(n.key), Y(), M.value = "";
      }).catch(() => {
        M.value = "";
      }));
    }, nt = r("");
    Ot().then((n) => {
      n.data.data && n.data.data.auth_code && (nt.value = n.data.data.auth_code);
    });
    const Gt = r(""), Wt = r(""), Q = r({
      installed: [],
      uninstalled: [],
      all: [],
      recentlyUpdated: []
    }), H = (n) => {
      const t = /* @__PURE__ */ new Map(), f = [];
      return n.forEach((h) => {
        h.isHideen || t.set(h.key, { ...h, children: [] });
      }), n.forEach((h) => {
        !h.isHideen && h.support_app && t.has(h.support_app) && t.get(h.support_app).children.push(t.get(h.key));
      }), t.forEach((h) => {
        (!h.support_app || !t.has(h.support_app)) && f.push(h);
      }), f;
    }, ot = () => {
      const n = Gt.value, t = Wt.value;
      if ((!n || n === "") && (t === "" || t == null)) {
        Q.value.installed = H(k.value.installed), Q.value.uninstalled = H(k.value.uninstalled), Q.value.all = H(k.value.all), Q.value.recentlyUpdated = H(k.value.recentlyUpdated);
        return;
      }
      const f = (h) => h.filter(($) => {
        const ne = !n || $.title.includes(n), te = !t || $.type === t;
        return ne && te;
      });
      Q.value.installed = H(f(k.value.installed)), Q.value.uninstalled = H(f(k.value.uninstalled)), Q.value.all = H(f(k.value.all)), Q.value.recentlyUpdated = H(f(k.value.recentlyUpdated));
    }, k = r({
      installed: [],
      uninstalled: [],
      all: [],
      recentlyUpdated: [],
      error: ""
    }), Y = () => {
      C.value = !0, Kl({}).then((n) => {
        var f;
        const t = n.data.list;
        k.value.error = n.data.error, k.value.installed = [], k.value.uninstalled = [], k.value.all = [], k.value.recentlyUpdated = [];
        for (const h in t)
          t[h].is_local == !1 && k.value.all.push(t[h]), t[h].install_info && ((f = Object.keys(t[h].install_info)) != null && f.length) ? (k.value.installed.push(t[h]), t[h].install_info.version != t[h].version && k.value.recentlyUpdated.push(t[h])) : t[h].is_download == !0 && k.value.uninstalled.push(t[h]);
        ot(), ge.routers.forEach((h, $) => {
          h.children && h.children.length ? (h.name = zt(h.children), ct.value[h.meta.app] = zt(h.children)) : ct.value[h.meta.app] = h.name;
        }), ke(_.value), C.value = !1;
      }).catch(() => {
        C.value = !1;
      });
    };
    Y();
    const we = fe(() => {
      let n = 0;
      return k.value[_.value] && k.value[_.value].length && k.value[_.value].forEach((t) => {
        t.isHideen && n++;
      }), n == k.value[_.value].length;
    }), it = r(), ut = () => {
      k.value[_.value].forEach((n) => {
        n.isHideen = !0;
        let t = K.keywords, f = K.type;
        const h = !f || n.type === f, $ = !t || n.title.indexOf(t) !== -1;
        h && $ && (n.isHideen = !1);
      }), z.value != "card" && ot();
    }, Yt = (n) => {
      n && (n.resetFields(), K.keywords = "", K.type = "", ut());
    }, ct = r({}), X = r(""), Z = r(!1), L = r(0), S = r({});
    let Oe = null;
    const Ne = new os();
    let Ce = null;
    const Xt = (n, t, f, h, $) => {
      if (t == "开始安装插件") {
        f(Ne);
        const ne = Jt(["/", "——", "\\", "|"]);
        Oe = setInterval(() => {
          Ce ? Ne.flush(Ce + "<br>> " + ne.next().value) : Ne.flush("> " + ne.next().value);
        }, 150);
      }
    };
    function Jt(n) {
      let t = 0;
      return {
        next() {
          return t + 1 == n.length && (t = 0), { value: n[t++] };
        }
      };
    }
    const Ae = (n) => {
      X.value = n, Hl(n).then((t) => {
        L.value = 0, Fe.value = !1, G.value = !1, de.value = "", Z.value = !0, ze.value = [], S.value = t.data, ge.clearRouters();
      });
    }, el = r(null), se = r(0);
    let F = null, J = null;
    const dt = (n = !0) => {
      Zl().then((t) => {
        var f;
        if (t.data) {
          if (n && (Ve = [], X.value = t.data.addon, Z.value || (J = as.success({
            title: i("warning"),
            dangerouslyUseHTMLString: !0,
            message: Mt("div", {}, [
              i("installingTips"),
              Mt(
                "span",
                {
                  class: "text-primary cursor-pointer",
                  onClick: tl
                },
                [i("installPercent")]
              )
            ]),
            duration: 0,
            showClose: !1
          })), F && clearInterval(F), se.value = parseInt(Date.now() / 1e3) - t.data.timestamp, F = setInterval(() => {
            se.value++;
          }, 1e3)), t.data.error) {
            (f = ue.value) == null || f.pushMessage({ content: t.data.error, class: "error" }), _t.value = t.data.error, G.value = !0, F && (clearInterval(F), F = null);
            return;
          }
          t.data.mode == "cloud" && nl(), setTimeout(() => {
            dt(!1);
          }, 5e3);
        } else
          n || (L.value = 2, F && (clearInterval(F), F = null), Y(), ge.clearRouters(), J == null || J.close());
      }).catch((t) => {
        var f;
        console.log(t), (f = ue.value) == null || f.pushMessage({ content: t.message, class: "error" });
      });
    };
    dt();
    const Fe = r(!1), pt = () => {
      Fe.value = !0, L.value = 1, G.value = !1;
    }, rt = fe(() => {
      const n = se.value, t = Math.floor(n / 3600), f = Math.floor(n % 3600 / 60), h = n % 60;
      return [t > 0 ? `${t}小时` : "", f > 0 ? `${f}分钟` : "", `${h}秒`].filter(Boolean).join("");
    }), tl = () => {
      Z.value = !0, L.value = 1;
    }, ce = r(!1), de = r(""), ll = () => {
      !S.value.is_pass || ce.value || (de.value = "local", ce.value = !0, el.value = Date.now(), se.value = 0, F && clearInterval(F), F = setInterval(() => {
        se.value++;
      }, 1e3), Gl({ addon: X.value }).then((n) => {
        L.value = 2, F && (clearInterval(F), F = null), Y(), ce.value = !1, n.data.length && (ze.value = n.data);
      }).catch((n) => {
        ce.value = !1;
      }));
    }, sl = r(!1), al = () => {
      he.confirm(i("authTips"), i("warning"), {
        distinguishCancelAndClose: !0,
        confirmButtonText: i("toBind"),
        cancelButtonText: i("toNiucloud")
      }).then(() => {
        xt();
      }).catch((n) => {
        n === "cancel" && window.open("https://www.niucloud.com/app");
      });
    }, G = r(!1), _t = r("");
    let Ve = [];
    const nl = () => {
      Wl(X.value).then((n) => {
        const t = n.data.data ?? [];
        t[0] && t[0].length && Z.value == !0 && t[0].forEach((f) => {
          if (!Ve.includes(f.action)) {
            if (f.action.indexOf("云编译任务正在排队") != -1) {
              Ce = f.action, Ve.push(f.action);
              return;
            } else
              Ce = null;
            ue.value.pushMessage({ content: `${f.action}` }), Ve.push(f.action), f.code == 0 && ue.value.pushMessage({ content: f.msg, class: "error" });
          }
        });
      }).catch(() => {
        J == null || J.close();
      });
    };
    Ll(X, (n) => {
      S.value = {};
    });
    const Pe = r(!1), De = r({}), Ee = (n) => {
      he.confirm(i("uninstallTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        il(n);
      });
    }, pe = (n) => {
      var t;
      (t = lt.value) == null || t.open(n.key, null, n);
    }, ol = () => {
      var n;
      if (!nt.value) {
        al();
        return;
      }
      if (ye.value.cloudBuildTask) {
        (n = ye.value) == null || n.open();
        return;
      }
      he.confirm(i("cloudBuildTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        var t;
        (t = ye.value) == null || t.open();
      });
    }, il = (n) => {
      Yl(n).then(({ data: t }) => {
        t.is_pass ? Xl({ addon: n }).then((f) => {
          Y(), ge.clearRouters(), C.value = !1;
        }).catch(() => {
          C.value = !1;
        }) : (De.value = t, Pe.value = !0);
      });
    }, vt = () => {
      window.open("https://www.niucloud.com/app");
    }, ul = (n) => {
      L.value == 1 && !Fe.value && !G.value ? he.confirm(i("installShowDialogCloseTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        Jl(X.value), F && (clearInterval(F), F = null), Fe.value = !1, de.value = "", G.value = !1, n();
      }) : L.value == 2 ? (ke("installed"), location.reload()) : n(), Oe && clearInterval(Oe);
    }, cl = (n) => {
      n.version = O.value, n.title = "框架", n.install_info = {
        version: B.value
      }, je(n);
    }, Be = r(!1), Qe = r(""), ft = r(null), re = r(!1), ee = r(!0);
    (() => {
      ee.value = !0, Ot().then((n) => {
        ee.value = !1, n.data.data && n.data.data.length != 0 && (Qe.value = n.data.data);
      }).catch(() => {
        ee.value = !1, Be.value = !1;
      });
    })();
    const xt = () => {
      Be.value = !0;
    }, ae = Je({
      auth_code: "",
      auth_secret: ""
    }), ht = r(), dl = Je({
      auth_code: [{ required: !0, message: i("authCodePlaceholder"), trigger: "blur" }],
      auth_secret: [{ required: !0, message: i("authSecretPlaceholder"), trigger: "blur" }]
    }), pl = async (n) => {
      re.value || !n || await n.validate(async (t) => {
        t && (re.value = !0, ls(ae).then(() => {
          re.value = !1, setTimeout(() => {
            location.reload();
          }, 1e3);
        }).catch(() => {
          re.value = !1;
        }));
      });
    }, mt = () => {
      window.open("https://www.niucloud.com/app");
    }, rl = () => {
      window.open(
        "https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-wu-3001-sheng-7ea7-yun-bian-yi-mu-lu-du-xie-quan-xian-zhuang-tai-bu-tong-guo-ru-he-chu-li.html"
      );
    }, _l = (n) => {
      he.confirm(i("deleteAddonTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        Pl(n).then(() => {
          Y();
        });
      });
    }, vl = (n) => {
      if (!n.support_version)
        return !1;
      const t = n.support_version.split("."), f = B.value.split(".");
      return parseFloat(`${t[0]}.${t[1]}`) < parseFloat(`${f[0]}.${f[1]}`);
    }, fl = () => {
      k.value[_.value].length && (k.value[_.value].length == A.value.length ? A.value = [] : A.value = k.value[_.value].map((n) => n.key));
    }, qe = (n, t) => {
      _.value != "recentlyUpdated" && _.value != "uninstalled" || (A.value.includes(t) ? A.value.splice(A.value.indexOf(t), 1) : A.value.push(t));
    }, xl = () => {
      const n = El(A.value);
      if (B.value != O.value && n.unshift("niucloud-admin"), !n.length) {
        ns({
          message: k.recentlyUpdated.length ? "请先勾选要升级的插件" : "当前已是最新版",
          type: "error",
          duration: 5e3
        });
        return;
      }
      pe({ key: n.toString() });
    }, hl = fe(() => new Set((Q.value[_.value] || []).map((n) => n.key))), U = r(!1), v = r(null);
    fe(() => {
      var t;
      const n = (t = v.value) == null ? void 0 : t.install_info;
      return Boolean(n && Object.keys(n).length);
    });
    const ml = fe(() => {
      var t, f;
      const n = (t = v.value) == null ? void 0 : t.install_info;
      return n && Object.keys(n).length ? n.version || "-" : ((f = v.value) == null ? void 0 : f.version) || "-";
    }), _e = r([]), Ke = r(!1), He = r(0), yt = (n) => {
      if (!n)
        return ["-", "-"];
      const [t, f] = n.split(" ");
      if (!f)
        return [t || "-", "-"];
      const [h, $] = f.split(":");
      return [t, `${h}:${$}`];
    }, yl = async (n) => {
      Ke.value = !0;
      try {
        const { data: t } = await ss({ app_key: n });
        _e.value = Array.isArray(t) ? t : [];
      } finally {
        Ke.value = !1;
      }
    }, je = (n) => {
      v.value = n, U.value = !0, He.value = 0, _e.value = [], n != null && n.key && yl(n.key);
    }, gt = () => {
      U.value = !1, v.value = null, _e.value = [];
    }, Ze = (n) => {
      n == "pc" ? window.open(`https://www.niucloud.com/app/detail/?id=${v.value.app_id}`) : window.open(`https://wap.niucloud.com/pages/product/detail?id=${v.value.app_id}`);
    };
    return (n, t) => {
      const f = m("el-tab-pane"), h = m("el-tabs"), $ = m("el-option"), ne = m("el-select"), te = m("el-form-item"), Ge = m("el-input"), b = m("el-button"), kt = m("el-form"), gl = m("DocumentCopy"), j = m("el-icon"), Ie = m("el-checkbox"), We = m("el-card"), Ye = m("el-image"), T = m("el-table-column"), bt = m("el-tag"), wt = m("el-tooltip"), Ct = m("QuestionFilled"), At = m("el-table"), ve = m("el-empty"), Ft = m("el-link"), kl = m("el-popover"), Ue = m("el-dialog"), Xe = m("el-step"), bl = m("el-steps"), V = m("el-col"), oe = m("el-row"), Te = m("Select"), Le = m("CloseBold"), wl = m("el-alert"), Se = m("el-scrollbar"), Vt = m("el-result"), Cl = m("ArrowLeft"), Al = m("Phone"), Fl = m("Monitor"), Vl = m("Cellphone"), Dl = m("el-collapse-item"), Bl = m("el-collapse"), jl = m("el-timeline-item"), Il = m("el-timeline"), $e = Sl("loading");
      return o(), d(D, null, [
        q((o(), d("div", vs, [
          a(We, {
            class: "box-card app-head !border-none !pb-[0]",
            shadow: "never"
          }, {
            default: l(() => [
              e("div", fs, [
                e("div", xs, [
                  hs,
                  e("i", {
                    class: xe(["iconfont cursor-pointer", z.value == "card" ? "iconliebiao" : "iconliebiaoqiehuan"]),
                    onClick: Kt
                  }, null, 2)
                ]),
                a(h, {
                  modelValue: _.value,
                  "onUpdate:modelValue": t[0] || (t[0] = (s) => _.value = s),
                  onTabChange: ke
                }, {
                  default: l(() => [
                    a(f, { name: "installed" }, {
                      label: l(() => [
                        ms
                      ]),
                      _: 1
                    }),
                    a(f, { name: "uninstalled" }, {
                      label: l(() => [
                        ys
                      ]),
                      _: 1
                    }),
                    a(f, { name: "all" }, {
                      label: l(() => [
                        gs
                      ]),
                      _: 1
                    }),
                    a(f, { name: "recentlyUpdated" }, {
                      label: l(() => [
                        e("span", ks, [
                          y(" 可更新 "),
                          k.value.recentlyUpdated.length ? (o(), d("div", bs)) : p("", !0)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              !C.value && !U.value && (_.value == "installed" || _.value == "all" || _.value == "uninstalled") ? (o(), g(kt, {
                key: 0,
                inline: !0,
                model: K,
                ref_key: "searchFormRef",
                ref: it,
                class: "search-form"
              }, {
                default: l(() => [
                  a(te, { prop: "type" }, {
                    default: l(() => [
                      a(ne, {
                        modelValue: K.type,
                        "onUpdate:modelValue": t[1] || (t[1] = (s) => K.type = s),
                        clearable: "",
                        placeholder: c(i)("应用类型"),
                        class: "input-width"
                      }, {
                        default: l(() => [
                          a($, {
                            label: c(i)("应用"),
                            value: "app"
                          }, null, 8, ["label"]),
                          a($, {
                            label: c(i)("插件"),
                            value: "addon"
                          }, null, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }),
                  a(te, { prop: "keywords" }, {
                    default: l(() => [
                      a(Ge, {
                        modelValue: K.keywords,
                        "onUpdate:modelValue": t[2] || (t[2] = (s) => K.keywords = s),
                        modelModifiers: { trim: !0 },
                        class: "!w-[200px]",
                        placeholder: c(i)("搜索关键词"),
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }),
                  a(te, null, {
                    default: l(() => [
                      a(b, {
                        type: "primary",
                        onClick: t[3] || (t[3] = (s) => ut())
                      }, {
                        default: l(() => [
                          y(u(c(i)("search")), 1)
                        ]),
                        _: 1
                      }),
                      a(b, {
                        onClick: t[4] || (t[4] = (s) => Yt(it.value))
                      }, {
                        default: l(() => [
                          y(u(c(i)("重置")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])) : p("", !0),
              !C.value && !U.value && _.value == "recentlyUpdated" ? (o(), d("div", ws, [
                e("div", Cs, [
                  e("div", As, [
                    e("div", Fs, [
                      Vs,
                      B.value != O.value ? (o(), d("div", Ds)) : p("", !0)
                    ]),
                    e("div", null, [
                      O.value != B.value ? (o(), d("p", Bs, Us)) : (o(), d("p", Ts, [
                        e("span", Ls, "当前框架为最新版 V" + u(B.value), 1)
                      ])),
                      e("p", Ss, [
                        O.value != B.value ? (o(), d("span", $s, "框架 V" + u(B.value), 1)) : p("", !0),
                        O.value != B.value ? (o(), d("span", Rs)) : p("", !0),
                        O.value != B.value ? (o(), d("span", Ms, u(O.value), 1)) : p("", !0),
                        O.value != B.value ? (o(), d("span", zs, "和")) : p("", !0),
                        e("span", Os, u(A.value.length), 1),
                        Ns
                      ])
                    ])
                  ]),
                  a(b, {
                    class: "ml-[auto]",
                    onClick: t[5] || (t[5] = (s) => cl({ key: "niucloud-admin" }))
                  }, {
                    default: l(() => [
                      a(j, { class: "mr-[5px]" }, {
                        default: l(() => [
                          a(gl)
                        ]),
                        _: 1
                      }),
                      y(" 更新记录 ")
                    ]),
                    _: 1
                  }),
                  q(a(b, {
                    type: "primary",
                    onClick: xl
                  }, {
                    default: l(() => [
                      y(" 一键升级"),
                      A.value.length ? (o(), d("span", Ps, "(" + u(A.value.length) + ")", 1)) : p("", !0)
                    ]),
                    _: 1
                  }, 512), [
                    [le, _.value == "recentlyUpdated" || B.value != O.value && _.value != "uninstalled"]
                  ])
                ]),
                e("div", Es, [
                  e("p", Qs, [
                    qs,
                    e("span", Ks, u(A.value.length), 1),
                    Hs
                  ]),
                  a(Ie, {
                    label: "全选",
                    "model-value": k.value[_.value].length && k.value[_.value].length == A.value.length,
                    onChange: fl,
                    value: "Value A",
                    class: "ml-[12px]"
                  }, null, 8, ["model-value"])
                ])
              ])) : p("", !0)
            ]),
            _: 1
          }),
          q(e("div", Zs, [
            k.value[_.value].length && !C.value ? (o(!0), d(D, { key: 0 }, W(k.value[_.value], (s) => {
              var w, N, P;
              return o(), d("div", {
                class: xe(["rounded-md p-[16px] app-card mb-[20px] ml-[20px] cursor-pointer product-card-item flex justify-between items-start", { selected: A.value.includes(s.key), hidden: s.isHideen }]),
                onClick: (E) => je(s),
                key: s.key
              }, [
                e("div", Ws, [
                  e("div", Ys, [
                    e("div", Xs, [
                      a(Ye, {
                        class: "w-full h-full overflow-hidden rounded",
                        src: s.icon,
                        fit: "contain"
                      }, {
                        error: l(() => [
                          Js
                        ]),
                        _: 2
                      }, 1032, ["src"])
                    ])
                  ]),
                  e("div", ea, [
                    e("div", ta, [
                      e("p", {
                        class: "text-[16px] text-[#374151] truncate leading-[20px]",
                        title: s.title
                      }, u(s.title), 9, la),
                      e("span", {
                        class: xe({ "app-ident": s.type == "app", "addon-ident": s.type == "addon" })
                      }, u(s.type == "app" ? "应用" : "插件"), 3)
                    ]),
                    e("p", {
                      class: "text-xs text-[#4F516D] truncate mt-[2px] font-bold",
                      title: s.key
                    }, u(s.key), 9, sa),
                    e("div", aa, [
                      na,
                      e("span", null, u(s.install_info && ((w = Object.keys(s.install_info)) != null && w.length) ? s.install_info.version : s.version), 1),
                      s.install_info && ((N = Object.keys(s.install_info)) != null && N.length) && s.install_info.version != s.version && _.value == "recentlyUpdated" ? (o(), d("span", oa, "最新版本：" + u(s.version), 1)) : p("", !0)
                    ])
                  ])
                ]),
                e("view", {
                  class: xe(["w-[25px] flex items-end flex-col h-full justify-between", { "w-[40px]": !s.is_download && M.value == s.key }])
                }, [
                  _.value == "recentlyUpdated" ? (o(), d(D, { key: 0 }, [
                    A.value.includes(s.key) ? (o(), g(Ie, {
                      key: 0,
                      class: "!h-[auto] leading-[1]",
                      checked: "",
                      onClick: R((E) => qe(E, s.key), ["stop"])
                    }, null, 8, ["onClick"])) : (o(), g(Ie, {
                      key: 1,
                      class: "!h-[auto] leading-[1]",
                      onClick: R((E) => qe(E, s.key), ["stop"])
                    }, null, 8, ["onClick"]))
                  ], 64)) : p("", !0),
                  _.value == "installed" || _.value == "all" || _.value == "uninstalled" ? (o(), d(D, { key: 1 }, [
                    s.is_download ? !s.install_info || Object.keys(s.install_info).length == 0 ? (o(), g(b, {
                      key: 1,
                      class: "mt-[auto] !text-[#0766F5] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      onClick: R((E) => Ae(s.key), ["stop"])
                    }, {
                      default: l(() => [
                        y("安装")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : p("", !0) : (o(), g(b, {
                      key: 0,
                      class: "!text-[#0766F5] mt-[auto] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      loading: M.value == s.key,
                      disabled: M.value != "",
                      onClick: R((E) => be(s), ["stop"])
                    }, {
                      default: l(() => [
                        y("安装 ")
                      ]),
                      _: 2
                    }, 1032, ["loading", "disabled", "onClick"])),
                    s.install_info && ((P = Object.keys(s.install_info)) != null && P.length) ? (o(), g(b, {
                      key: 2,
                      class: "mt-[auto] !text-[#4F516D] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      link: "",
                      onClick: R((E) => Ee(s.key), ["stop"])
                    }, {
                      default: l(() => [
                        y(u(c(i)("unload")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : p("", !0)
                  ], 64)) : (o(), d(D, { key: 2 }, [
                    s.install_info.version != s.version ? (o(), g(b, {
                      key: 0,
                      class: "!text-[#008C1E] mt-[auto] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      onClick: R((E) => pe(s), ["stop"])
                    }, {
                      default: l(() => [
                        y(" 升级 ")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : p("", !0)
                  ], 64))
                ], 2)
              ], 10, Gs);
            }), 128)) : p("", !0)
          ], 512), [
            [le, z.value == "card" && !U.value]
          ]),
          q(e("div", ia, [
            k.value[_.value].length && !C.value && !U.value ? (o(), g(At, {
              key: 0,
              ref_key: "tableRef",
              ref: Nt,
              "tree-props": { children: "children" },
              "default-expand-all": !0,
              data: Q.value[_.value],
              "row-key": "key",
              size: "large"
            }, {
              default: l(() => [
                a(T, { width: "24" }, {
                  default: l(({ row: s }) => {
                    var w;
                    return [
                      e("div", {
                        class: xe(["tree-child-cell", {
                          "is-tree-parent": (w = s.children) == null ? void 0 : w.length,
                          "is-tree-child": typeof s.support_app == "string" && s.support_app !== "" && hl.value.has(s.support_app)
                        }])
                      }, ca, 2)
                    ];
                  }),
                  _: 1
                }),
                _.value === "recentlyUpdated" ? (o(), g(T, {
                  key: 0,
                  width: "60px"
                }, {
                  default: l(({ row: s }) => [
                    a(Ie, {
                      onClick: t[6] || (t[6] = R(() => {
                      }, ["stop"])),
                      "model-value": A.value.includes(s.key),
                      value: s.key,
                      onChange: (w) => qe(w, s.key)
                    }, null, 8, ["model-value", "value", "onChange"])
                  ]),
                  _: 1
                })) : p("", !0),
                a(T, {
                  label: c(i)("appName"),
                  align: "left",
                  width: "300"
                }, {
                  default: l(({ row: s }) => {
                    var w, N;
                    return [
                      e("div", {
                        class: "flex items-center cursor-pointer relative left-[-10px]",
                        onClick: (P) => je(s)
                      }, [
                        a(Ye, {
                          class: "w-[54px] h-[54px] rounded-[5px]",
                          src: s.icon,
                          fit: "contain"
                        }, {
                          error: l(() => [
                            pa
                          ]),
                          _: 2
                        }, 1032, ["src"]),
                        e("div", ra, [
                          e("div", _a, u(s.title), 1),
                          s.install_info && ((w = Object.keys(s.install_info)) != null && w.length) ? (o(), d("div", va, u(s.install_info.version), 1)) : (o(), d("div", fa, u(s.version), 1)),
                          e("div", xa, [
                            _.value == "recentlyUpdated" && s.install_info && ((N = Object.keys(s.install_info)) != null && N.length) && s.install_info.version != s.version ? (o(), g(bt, {
                              key: 0,
                              type: "danger",
                              size: "small"
                            }, {
                              default: l(() => [
                                y(u(c(i)("newVersion")) + u(s.version), 1)
                              ]),
                              _: 2
                            }, 1024)) : p("", !0),
                            vl(s) && _.value == "recentlyUpdated" ? (o(), g(wt, {
                              key: 1,
                              effect: "dark",
                              content: `该插件适配框架版本为${s.support_version}，与已安装框架版本${B.value}不完全兼容`,
                              placement: "top-start"
                            }, {
                              default: l(() => [
                                a(bt, {
                                  type: "warning",
                                  size: "small",
                                  class: "app-list-tip ml-[3px] overflow-hidden"
                                }, {
                                  default: l(() => [
                                    y("该插件适配框架版本为" + u(s.support_version) + "，与已安装框架版本" + u(B.value) + "不完全兼容 ", 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["content"])) : p("", !0)
                          ])
                        ])
                      ], 8, da)
                    ];
                  }),
                  _: 1
                }, 8, ["label"]),
                a(T, {
                  align: "left",
                  "min-width": "150"
                }, {
                  header: l(() => [
                    e("div", ha, [
                      e("span", ma, u(c(i)("appIdentification")), 1),
                      a(wt, {
                        class: "box-item",
                        effect: "light",
                        content: c(i)("tipText"),
                        placement: "bottom"
                      }, {
                        default: l(() => [
                          a(j, { class: "cursor-pointer text-[16px] text-[#a9a9a9]" }, {
                            default: l(() => [
                              a(Ct)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["content"])
                    ])
                  ]),
                  default: l(({ row: s }) => [
                    e("span", ya, u(s.key), 1)
                  ]),
                  _: 1
                }),
                a(T, {
                  label: c(i)("introduction"),
                  align: "left",
                  "min-width": "250"
                }, {
                  default: l(({ row: s }) => [
                    e("span", ga, u(s.desc), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(T, {
                  label: c(i)("type"),
                  align: "left",
                  "min-width": "80"
                }, {
                  default: l(({ row: s }) => [
                    e("span", ka, u(s.type === "app" ? c(i)("app") : c(i)("addon")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(T, {
                  label: c(i)("author"),
                  align: "left",
                  "min-width": "80"
                }, {
                  default: l(({ row: s }) => [
                    e("span", ba, u(s.author), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(T, {
                  label: c(i)("operation"),
                  fixed: "right",
                  align: "right",
                  "min-width": "200"
                }, {
                  default: l(({ row: s }) => {
                    var w, N;
                    return [
                      _.value == "installed" || _.value == "all" || _.value == "uninstalled" ? (o(), d(D, { key: 0 }, [
                        s.install_info && ((w = Object.keys(s.install_info)) != null && w.length) ? (o(), g(b, {
                          key: 0,
                          class: "!text-[13px]",
                          type: "primary",
                          link: "",
                          onClick: (P) => Ee(s.key)
                        }, {
                          default: l(() => [
                            y(u(c(i)("unload")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : p("", !0),
                        s.is_download && (!s.install_info || !Object.keys(s.install_info).length) ? (o(), g(b, {
                          key: 1,
                          class: "!text-[13px]",
                          type: "primary",
                          link: "",
                          onClick: (P) => Ae(s.key)
                        }, {
                          default: l(() => [
                            y(u(c(i)("install")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : p("", !0),
                        s.is_download ? p("", !0) : (o(), g(b, {
                          key: 2,
                          class: "!text-[13px]",
                          loading: M.value == s.key,
                          disabled: M.value != "",
                          type: "primary",
                          link: "",
                          onClick: R((P) => be(s), ["stop"])
                        }, {
                          default: l(() => [
                            e("span", null, u(c(i)("down")), 1)
                          ]),
                          _: 2
                        }, 1032, ["loading", "disabled", "onClick"]))
                      ], 64)) : (o(), d(D, { key: 1 }, [
                        _.value == "recentlyUpdated" && s.install_info && ((N = Object.keys(s.install_info)) != null && N.length) && s.install_info.version != s.version ? (o(), g(b, {
                          key: 0,
                          class: "!text-[13px]",
                          type: "primary",
                          link: "",
                          onClick: (P) => pe(s)
                        }, {
                          default: l(() => [
                            y(u(c(i)("升级")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : p("", !0)
                      ], 64)),
                      a(b, {
                        class: "!text-[13px]",
                        type: "primary",
                        link: "",
                        onClick: (P) => je(s)
                      }, {
                        default: l(() => [
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
            }, 8, ["data"])) : p("", !0),
            C.value || !k.value[_.value].length ? (o(), d("div", wa, [
              a(At, {
                data: [],
                size: "large",
                class: "pt-[5px]"
              }, {
                default: l(() => [
                  a(T, {
                    label: c(i)("appName"),
                    align: "left",
                    width: "320"
                  }, null, 8, ["label"]),
                  a(T, {
                    align: "left",
                    "min-width": "120"
                  }),
                  a(T, {
                    label: c(i)("introduction"),
                    align: "left",
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  a(T, {
                    label: c(i)("type"),
                    align: "left",
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  a(T, {
                    label: c(i)("author"),
                    align: "left",
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  a(T, {
                    label: c(i)("operation"),
                    fixed: "right",
                    align: "right",
                    width: "150"
                  }, null, 8, ["label"])
                ]),
                _: 1
              }),
              C.value ? q((o(), d("div", Ca, null, 512)), [
                [$e, C.value]
              ]) : p("", !0)
            ])) : p("", !0)
          ], 512), [
            [le, z.value == "list" && !U.value]
          ]),
          z.value == "card" && we.value && !C.value && _.value == "installed" && !ee.value && !U.value ? (o(), g(ve, {
            key: 0,
            class: "mx-auto overview-empty"
          }, {
            image: l(() => [
              Aa
            ]),
            description: l(() => [
              e("p", Fa, u(c(i)("installed-empty")), 1)
            ]),
            _: 1
          })) : p("", !0),
          z.value == "card" && we.value && !C.value && _.value == "uninstalled" && !ee.value && !U.value ? (o(), g(ve, {
            key: 1,
            class: "mx-auto overview-empty"
          }, {
            image: l(() => [
              Va
            ]),
            description: l(() => [
              e("p", Da, [
                e("span", null, u(c(i)("descriptionLeft")), 1),
                a(Ft, {
                  type: "primary",
                  onClick: mt,
                  class: "mx-[5px]"
                }, {
                  default: l(() => [
                    y(u(c(i)("link")), 1)
                  ]),
                  _: 1
                }),
                e("span", null, u(c(i)("descriptionRight")), 1)
              ])
            ]),
            _: 1
          })) : p("", !0),
          !k.value.all.length && !C.value && !Qe.value && _.value == "all" && !ee.value && !U.value ? (o(), d("div", Ba, [
            ja,
            e("div", Ia, [
              a(b, {
                class: "w-[154px] !h-[48px] mt-[8px]",
                type: "primary",
                onClick: xt
              }, {
                default: l(() => [
                  y("授权码认证")
                ]),
                _: 1
              }),
              a(kl, {
                ref_key: "getAuthCodeDialog",
                ref: ft,
                placement: "bottom",
                width: 478,
                trigger: "click",
                class: "mt-[8px]"
              }, {
                reference: l(() => [
                  a(b, {
                    class: "w-[154px] !h-[48px] mt-[8px] !text-[var(--el-color-primary)] hover:!text-[var(--el-color-primary)] !bg-transparent",
                    plain: "",
                    type: "primary"
                  }, {
                    default: l(() => [
                      y("如何获取授权码? ")
                    ]),
                    _: 1
                  })
                ]),
                default: l(() => [
                  e("div", Ua, [
                    Ta,
                    e("div", La, [
                      a(b, {
                        class: "w-[182px] !h-[48px]",
                        plain: "",
                        onClick: vt
                      }, {
                        default: l(() => [
                          y("去应用市场逛逛")
                        ]),
                        _: 1
                      }),
                      a(b, {
                        class: "w-[100px] !h-[48px]",
                        plain: "",
                        onClick: t[7] || (t[7] = (s) => ft.value.hide())
                      }, {
                        default: l(() => [
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
          ])) : p("", !0),
          z.value == "card" && we.value && !C.value && Qe.value && _.value == "all" && !ee.value && !U.value ? (o(), g(ve, {
            key: 3,
            class: "mx-auto overview-empty"
          }, {
            image: l(() => [
              Sa
            ]),
            description: l(() => [
              e("p", $a, [
                e("span", null, u(c(i)("buyDescriptionLeft")), 1),
                a(Ft, {
                  type: "primary",
                  onClick: mt,
                  class: "mx-[5px]"
                }, {
                  default: l(() => [
                    y(u(c(i)("link")), 1)
                  ]),
                  _: 1
                }),
                e("span", null, u(c(i)("descriptionRight")), 1)
              ])
            ]),
            _: 1
          })) : p("", !0),
          z.value == "card" && we.value && !C.value && _.value == "recentlyUpdated" && !U.value ? (o(), g(ve, {
            key: 4,
            class: "mx-auto overview-empty"
          }, {
            image: l(() => [
              Ra
            ]),
            description: l(() => [
              e("p", Ma, u(c(i)("recentlyUpdatedEmpty")), 1)
            ]),
            _: 1
          })) : p("", !0),
          a(Ue, {
            modelValue: Be.value,
            "onUpdate:modelValue": t[11] || (t[11] = (s) => Be.value = s),
            title: "授权码认证",
            width: "400px"
          }, {
            default: l(() => [
              a(kt, {
                model: ae,
                "label-width": "0",
                ref_key: "formRef",
                ref: ht,
                rules: dl,
                class: "page-form"
              }, {
                default: l(() => [
                  a(We, {
                    class: "box-card !border-none",
                    shadow: "never"
                  }, {
                    default: l(() => [
                      a(te, { prop: "auth_code" }, {
                        default: l(() => [
                          a(Ge, {
                            modelValue: ae.auth_code,
                            "onUpdate:modelValue": t[8] || (t[8] = (s) => ae.auth_code = s),
                            modelModifiers: { trim: !0 },
                            placeholder: c(i)("authCodePlaceholder"),
                            class: "input-width",
                            clearable: "",
                            size: "large"
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }),
                      e("div", za, [
                        a(te, { prop: "auth_secret" }, {
                          default: l(() => [
                            a(Ge, {
                              modelValue: ae.auth_secret,
                              "onUpdate:modelValue": t[9] || (t[9] = (s) => ae.auth_secret = s),
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
                      e("div", Oa, u(c(i)("authInfoTips")), 1),
                      e("div", Na, [
                        a(b, {
                          type: "primary",
                          class: "w-full",
                          size: "large",
                          loading: re.value,
                          onClick: t[10] || (t[10] = (s) => pl(ht.value))
                        }, {
                          default: l(() => [
                            y(u(c(i)("confirm")), 1)
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ]),
                      e("div", Pa, [
                        a(b, {
                          type: "primary",
                          link: "",
                          onClick: vt
                        }, {
                          default: l(() => [
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
          a(Ue, {
            modelValue: Z.value,
            "onUpdate:modelValue": t[16] || (t[16] = (s) => Z.value = s),
            title: c(i)("addonInstall"),
            width: "850px",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "before-close": ul
          }, {
            default: l(() => [
              L.value != 2 && !G.value ? (o(), g(bl, {
                key: 0,
                space: 200,
                active: L.value,
                class: "number-of-steps",
                "process-status": "process",
                "align-center": ""
              }, {
                default: l(() => [
                  a(Xe, {
                    title: c(i)("envCheck"),
                    class: "flex-1"
                  }, null, 8, ["title"]),
                  a(Xe, {
                    title: c(i)("installProgress"),
                    class: "flex-1"
                  }, null, 8, ["title"]),
                  a(Xe, {
                    title: c(i)("installComplete"),
                    class: "flex-1"
                  }, null, 8, ["title"])
                ]),
                _: 1
              }, 8, ["active"])) : p("", !0),
              q((o(), d("div", null, [
                e("div", Ea, [
                  a(Se, { style: { height: "calc(50vh)", overflow: "auto" } }, {
                    default: l(() => [
                      S.value.dir ? (o(), d("div", Qa, [
                        e("p", qa, u(c(i)("dirPermission")), 1),
                        S.value.file_permission_is_pass ? p("", !0) : (o(), d("div", {
                          key: 0,
                          class: "mt-[10px] mx-[20px] text-[14px] cursor-pointer text-primary flex items-center justify-between bg-[#EFF6FF] rounded-[4px] p-[10px]",
                          onClick: rl
                        }, [
                          e("div", Ka, [
                            a(j, { size: 17 }, {
                              default: l(() => [
                                a(Ct)
                              ]),
                              _: 1
                            }),
                            Ha
                          ]),
                          Za
                        ])),
                        e("div", Ga, [
                          a(oe, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
                            default: l(() => [
                              a(V, { span: 18 }, {
                                default: l(() => [
                                  e("span", null, u(c(i)("path")), 1)
                                ]),
                                _: 1
                              }),
                              a(V, { span: 3 }, {
                                default: l(() => [
                                  e("span", null, u(c(i)("demand")), 1)
                                ]),
                                _: 1
                              }),
                              a(V, { span: 3 }, {
                                default: l(() => [
                                  e("span", null, u(c(i)("status")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          (o(!0), d(D, null, W(S.value.dir.is_readable, (s, w) => (o(), g(oe, {
                            class: "pb-[10px] items pl-[15px]",
                            key: w
                          }, {
                            default: l(() => [
                              a(V, { span: 18 }, {
                                default: l(() => [
                                  e("span", null, u(s.dir), 1)
                                ]),
                                _: 2
                              }, 1024),
                              a(V, { span: 3 }, {
                                default: l(() => [
                                  e("span", null, u(c(i)("readable")), 1)
                                ]),
                                _: 1
                              }),
                              a(V, { span: 3 }, {
                                default: l(() => [
                                  s.status ? (o(), d("span", Wa, [
                                    a(j, { color: "green" }, {
                                      default: l(() => [
                                        a(Te)
                                      ]),
                                      _: 1
                                    })
                                  ])) : (o(), d("span", Ya, [
                                    a(j, { color: "red" }, {
                                      default: l(() => [
                                        a(Le)
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
                          (o(!0), d(D, null, W(S.value.dir.is_write, (s, w) => (o(), g(oe, {
                            class: "pb-[10px] items pl-[15px]",
                            key: w
                          }, {
                            default: l(() => [
                              a(V, { span: 18 }, {
                                default: l(() => [
                                  e("span", null, u(s.dir), 1)
                                ]),
                                _: 2
                              }, 1024),
                              a(V, { span: 3 }, {
                                default: l(() => [
                                  e("span", null, u(c(i)("write")), 1)
                                ]),
                                _: 1
                              }),
                              a(V, { span: 3 }, {
                                default: l(() => [
                                  s.status ? (o(), d("span", Xa, [
                                    a(j, { color: "green" }, {
                                      default: l(() => [
                                        a(Te)
                                      ]),
                                      _: 1
                                    })
                                  ])) : (o(), d("span", Ja, [
                                    a(j, { color: "red" }, {
                                      default: l(() => [
                                        a(Le)
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
                      ])) : p("", !0),
                      S.value.addon_check && S.value.addon_check.length ? (o(), d("div", en, [
                        tn,
                        e("div", ln, [
                          (o(!0), d(D, null, W(S.value.addon_check, (s) => (o(), g(wl, {
                            class: "!mb-[10px]",
                            type: "error",
                            closable: !1
                          }, {
                            default: l(() => [
                              e("div", {
                                innerHTML: s.msg
                              }, null, 8, sn)
                            ]),
                            _: 2
                          }, 1024))), 256))
                        ])
                      ])) : p("", !0)
                    ]),
                    _: 1
                  })
                ]),
                e("div", an, [
                  a(b, {
                    type: "primary",
                    class: "!w-[140px]",
                    disabled: !S.value.is_pass || sl.value,
                    loading: ce.value,
                    onClick: ll
                  }, {
                    default: l(() => [
                      y(u(c(i)("install")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"])
                ])
              ])), [
                [le, L.value == 0],
                [$e, !S.value.dir]
              ]),
              q(e("div", nn, [
                e("div", on, [
                  e("div", un, [
                    a(c(is), {
                      ref_key: "terminalRef",
                      ref: ue,
                      name: `install-${Pt.value}`,
                      context: X.value,
                      "init-log": null,
                      "show-header": !1,
                      "show-log-time": !0,
                      onExecCmd: Xt
                    }, null, 8, ["name", "context"])
                  ]),
                  e("div", cn, [
                    a(b, {
                      type: "primary",
                      loading: !0,
                      class: "!w-[140px]"
                    }, {
                      default: l(() => [
                        y("已用时 " + u(rt.value), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])
              ], 512), [
                [le, L.value == 1 && !G.value]
              ]),
              q(e("div", dn, [
                a(Vt, {
                  icon: "success",
                  title: c(i)("addonInstallSuccess")
                }, {
                  icon: l(() => [
                    pn
                  ]),
                  extra: l(() => [
                    (o(!0), d(D, null, W(ze.value, (s, w) => (o(), d("div", {
                      class: "mb-[10px]",
                      key: w
                    }, [
                      e("div", rn, u(s), 1)
                    ]))), 128)),
                    se.value > 0 ? (o(), d("div", _n, "本次安装用时" + u(rt.value), 1)) : p("", !0),
                    e("div", vn, [
                      de.value == "cloud" ? (o(), g(b, {
                        key: 0,
                        onClick: t[12] || (t[12] = (s) => pt()),
                        class: "!w-[90px]"
                      }, {
                        default: l(() => [
                          y("返回")
                        ]),
                        _: 1
                      })) : p("", !0),
                      a(b, {
                        onClick: t[13] || (t[13] = (s) => Z.value = !1),
                        type: "primary",
                        class: "!w-[90px]"
                      }, {
                        default: l(() => [
                          y("完成")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }, 8, ["title"])
              ], 512), [
                [le, L.value == 2]
              ]),
              q(e("div", fn, [
                a(Vt, {
                  icon: "error",
                  title: c(i)("安装失败")
                }, {
                  icon: l(() => [
                    xn
                  ]),
                  extra: l(() => [
                    a(Se, { class: "max-h-[120px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]" }, {
                      default: l(() => [
                        y(u(_t.value), 1)
                      ]),
                      _: 1
                    }),
                    de.value == "cloud" ? (o(), g(b, {
                      key: 0,
                      onClick: t[14] || (t[14] = (s) => pt()),
                      class: "!w-[90px]"
                    }, {
                      default: l(() => [
                        y("错误信息")
                      ]),
                      _: 1
                    })) : p("", !0),
                    a(b, {
                      onClick: t[15] || (t[15] = (s) => Z.value = !1),
                      type: "primary",
                      class: "!w-[90px]"
                    }, {
                      default: l(() => [
                        y("完成")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title"])
              ], 512), [
                [le, G.value]
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          a(Ue, {
            modelValue: Pe.value,
            "onUpdate:modelValue": t[17] || (t[17] = (s) => Pe.value = s),
            title: c(i)("addonUninstall"),
            width: "850px",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1
          }, {
            default: l(() => [
              a(Se, { "max-height": "50vh" }, {
                default: l(() => [
                  e("div", hn, [
                    De.value.dir ? (o(), d("div", mn, [
                      e("p", yn, u(c(i)("dirPermission")), 1),
                      e("div", gn, [
                        a(oe, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
                          default: l(() => [
                            a(V, { span: 18 }, {
                              default: l(() => [
                                e("span", null, u(c(i)("path")), 1)
                              ]),
                              _: 1
                            }),
                            a(V, { span: 3 }, {
                              default: l(() => [
                                e("span", null, u(c(i)("demand")), 1)
                              ]),
                              _: 1
                            }),
                            a(V, { span: 3 }, {
                              default: l(() => [
                                e("span", null, u(c(i)("status")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        (o(!0), d(D, null, W(De.value.dir.is_readable, (s, w) => (o(), g(oe, {
                          class: "pb-[10px] items pl-[15px]",
                          key: w
                        }, {
                          default: l(() => [
                            a(V, { span: 18 }, {
                              default: l(() => [
                                e("span", null, u(s.dir), 1)
                              ]),
                              _: 2
                            }, 1024),
                            a(V, { span: 3 }, {
                              default: l(() => [
                                e("span", null, u(c(i)("readable")), 1)
                              ]),
                              _: 1
                            }),
                            a(V, { span: 3 }, {
                              default: l(() => [
                                s.status ? (o(), d("span", kn, [
                                  a(j, { color: "green" }, {
                                    default: l(() => [
                                      a(Te)
                                    ]),
                                    _: 1
                                  })
                                ])) : (o(), d("span", bn, [
                                  a(j, { color: "red" }, {
                                    default: l(() => [
                                      a(Le)
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
                        (o(!0), d(D, null, W(De.value.dir.is_write, (s, w) => (o(), g(oe, {
                          class: "pb-[10px] items pl-[15px]",
                          key: w
                        }, {
                          default: l(() => [
                            a(V, { span: 18 }, {
                              default: l(() => [
                                e("span", null, u(s.dir), 1)
                              ]),
                              _: 2
                            }, 1024),
                            a(V, { span: 3 }, {
                              default: l(() => [
                                e("span", null, u(c(i)("write")), 1)
                              ]),
                              _: 1
                            }),
                            a(V, { span: 3 }, {
                              default: l(() => [
                                s.status ? (o(), d("span", wn, [
                                  a(j, { color: "green" }, {
                                    default: l(() => [
                                      a(Te)
                                    ]),
                                    _: 1
                                  })
                                ])) : (o(), d("span", Cn, [
                                  a(j, { color: "red" }, {
                                    default: l(() => [
                                      a(Le)
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
                    ])) : p("", !0)
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          a(Ue, {
            modelValue: ie.value,
            "onUpdate:modelValue": t[19] || (t[19] = (s) => ie.value = s),
            title: "下载提示",
            width: "30%"
          }, {
            footer: l(() => [
              e("span", Fn, [
                a(b, {
                  onClick: t[18] || (t[18] = (s) => ie.value = !1)
                }, {
                  default: l(() => [
                    y("取消")
                  ]),
                  _: 1
                }),
                a(b, {
                  type: "primary",
                  onClick: Zt
                }, {
                  default: l(() => [
                    y("确定")
                  ]),
                  _: 1
                })
              ])
            ]),
            default: l(() => [
              An
            ]),
            _: 1
          }, 8, ["modelValue"]),
          !C.value && U.value ? (o(), g(We, {
            key: 5,
            class: "box-card app-detail-static !border-none",
            shadow: "never"
          }, {
            default: l(() => {
              var s, w, N, P, E, Dt, Bt, jt, It, Ut, Tt, Lt, St, $t;
              return [
                e("div", {
                  class: "flex items-center text-[14px] text-primary cursor-pointer mb-[20px]",
                  onClick: gt
                }, [
                  a(j, { class: "mr-[6px]" }, {
                    default: l(() => [
                      a(Cl)
                    ]),
                    _: 1
                  }),
                  Vn
                ]),
                e("div", Dn, [
                  e("div", Bn, [
                    e("div", jn, [
                      e("div", In, [
                        a(Ye, {
                          class: "w-full h-full",
                          src: (s = v.value) == null ? void 0 : s.icon,
                          fit: "contain"
                        }, {
                          error: l(() => [
                            Un
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ]),
                      e("div", null, [
                        e("div", Tn, u(((w = v.value) == null ? void 0 : w.title) || "-"), 1),
                        e("div", Ln, u(((N = v.value) == null ? void 0 : N.key) || "-"), 1)
                      ])
                    ]),
                    e("div", Sn, [
                      v.value.key != "niucloud-admin" ? (o(), d(D, { key: 0 }, [
                        v.value.is_download ? !v.value.install_info || Object.keys(v.value.install_info).length == 0 ? (o(), g(b, {
                          key: 1,
                          type: "primary",
                          class: "!bg-[#0766F5]",
                          onClick: t[21] || (t[21] = R((I) => Ae(v.value.key), ["stop"]))
                        }, {
                          default: l(() => [
                            y("安装")
                          ]),
                          _: 1
                        })) : v.value.install_info.version != v.value.version ? (o(), g(b, {
                          key: 2,
                          type: "warning",
                          onClick: t[22] || (t[22] = R((I) => pe(v.value), ["stop"]))
                        }, {
                          default: l(() => [
                            y(" 升级 ")
                          ]),
                          _: 1
                        })) : p("", !0) : (o(), g(b, {
                          key: 0,
                          type: "primary",
                          class: "download-btn !bg-[#0766F5]",
                          loading: M.value == v.value.key,
                          disabled: M.value != "",
                          onClick: t[20] || (t[20] = R((I) => be(v.value), ["stop"]))
                        }, {
                          default: l(() => [
                            y("安装 ")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])),
                        v.value.is_download && (!v.value.install_info || !Object.keys(v.value.install_info).length) ? (o(), g(b, {
                          key: 3,
                          type: "info",
                          onClick: t[23] || (t[23] = (I) => _l(v.value.key))
                        }, {
                          default: l(() => [
                            y(" 删除 ")
                          ]),
                          _: 1
                        })) : p("", !0),
                        v.value.is_download && v.value.install_info && Object.keys(v.value.install_info).length ? (o(), g(b, {
                          key: 4,
                          type: "info",
                          onClick: t[24] || (t[24] = (I) => Ee(v.value.key))
                        }, {
                          default: l(() => [
                            y(" 卸载 ")
                          ]),
                          _: 1
                        })) : p("", !0)
                      ], 64)) : (o(), d(D, { key: 1 }, [
                        v.value.install_info.version != v.value.version ? (o(), g(b, {
                          key: 0,
                          type: "warning",
                          onClick: t[25] || (t[25] = R((I) => pe(v.value), ["stop"]))
                        }, {
                          default: l(() => [
                            y(" 升级 ")
                          ]),
                          _: 1
                        })) : p("", !0)
                      ], 64))
                    ])
                  ]),
                  (P = v.value) != null && P.type || (E = v.value) != null && E.desc ? (o(), d("div", $n, zn)) : p("", !0),
                  (Dt = v.value) != null && Dt.type || (Bt = v.value) != null && Bt.desc ? (o(), d("div", On, [
                    e("div", Nn, [
                      Pn,
                      e("div", En, u(((jt = v.value) == null ? void 0 : jt.type) == "app" ? "应用" : "插件"), 1)
                    ]),
                    e("div", Qn, [
                      qn,
                      e("div", Kn, u(((It = v.value) == null ? void 0 : It.desc) || "-"), 1)
                    ])
                  ])) : p("", !0),
                  Hn,
                  e("div", Zn, [
                    e("div", Gn, [
                      Wn,
                      e("div", Yn, [
                        e("div", Xn, u(v.value.expire_time || "--"), 1),
                        v.value.app_id ? (o(), d("div", Jn, [
                          eo,
                          e("span", {
                            class: "text-[var(--el-color-primary)] text-[14px] cursor-pointer",
                            onClick: t[26] || (t[26] = (I) => Ze("pc"))
                          }, "续费应用")
                        ])) : p("", !0)
                      ])
                    ])
                  ]),
                  (Ut = v.value) != null && Ut.author || (Tt = v.value) != null && Tt.author_phone ? (o(), d(D, { key: 2 }, [
                    to,
                    e("div", lo, [
                      e("div", so, [
                        ao,
                        e("div", no, u(((Lt = v.value) == null ? void 0 : Lt.author) || "-"), 1)
                      ]),
                      (St = v.value) != null && St.author_phone ? (o(), d("div", oo, [
                        io,
                        e("div", uo, [
                          y(u(($t = v.value) == null ? void 0 : $t.author_phone) + " ", 1),
                          a(j, { class: "ml-[6px] text-primary" }, {
                            default: l(() => [
                              a(Al)
                            ]),
                            _: 1
                          })
                        ])
                      ])) : p("", !0)
                    ])
                  ], 64)) : p("", !0),
                  v.value.key != "niucloud-admin" && v.value.app_id ? (o(), d("div", co, _o)) : p("", !0),
                  v.value.key != "niucloud-admin" && v.value.app_id ? (o(), d("div", vo, [
                    e("div", {
                      class: "bg-[#F5F5F5] w-[336px] h-[60px] px-[20px] flex items-center justify-between cursor-pointer",
                      onClick: t[27] || (t[27] = (I) => Ze("pc"))
                    }, [
                      e("div", fo, [
                        e("div", xo, [
                          a(j, null, {
                            default: l(() => [
                              a(Fl)
                            ]),
                            _: 1
                          })
                        ]),
                        ho
                      ]),
                      mo
                    ]),
                    e("div", {
                      class: "bg-[#F5F5F5] w-[336px] h-[60px] px-[20px] flex items-center justify-between cursor-pointer",
                      onClick: t[28] || (t[28] = (I) => Ze("pc"))
                    }, [
                      e("div", yo, [
                        e("div", go, [
                          a(j, null, {
                            default: l(() => [
                              a(Vl)
                            ]),
                            _: 1
                          })
                        ]),
                        ko
                      ]),
                      bo
                    ])
                  ])) : p("", !0),
                  wo,
                  e("div", Co, [
                    Ao,
                    e("div", Fo, u(ml.value), 1)
                  ]),
                  Vo,
                  q((o(), d("div", Do, [
                    a(Se, { class: "px-[20px]" }, {
                      default: l(() => [
                        _e.value.length ? (o(), g(Il, {
                          key: 0,
                          style: { width: "100%" }
                        }, {
                          default: l(() => [
                            (o(!0), d(D, null, W(_e.value, (I, Rt) => (o(), g(jl, {
                              key: I.version_no || Rt,
                              placement: "left"
                            }, {
                              default: l(() => [
                                a(Bl, {
                                  modelValue: He.value,
                                  "onUpdate:modelValue": t[29] || (t[29] = (Ul) => He.value = Ul),
                                  accordion: ""
                                }, {
                                  default: l(() => [
                                    a(Dl, { name: Rt }, {
                                      title: l(() => [
                                        e("div", Bo, [
                                          e("div", jo, [
                                            e("p", Io, "版本：V" + u(I.version_no), 1),
                                            e("div", Uo, [
                                              e("span", To, u(yt(I.release_time)[0]), 1),
                                              e("span", Lo, u(yt(I.release_time)[1]), 1)
                                            ])
                                          ]),
                                          So
                                        ])
                                      ]),
                                      default: l(() => [
                                        I.upgrade_log ? (o(), d("div", $o, [
                                          e("div", {
                                            innerHTML: I.upgrade_log
                                          }, null, 8, Ro)
                                        ])) : p("", !0)
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
                        })) : (o(), g(ve, {
                          key: 1,
                          description: "暂无版本更新信息"
                        }))
                      ]),
                      _: 1
                    })
                  ])), [
                    [$e, Ke.value]
                  ])
                ])
              ];
            }),
            _: 1
          })) : p("", !0)
        ])), [
          [$e, C.value]
        ]),
        a(rs, {
          upgradeKey: n.upgradeKey,
          ref_key: "upgradeLogRef",
          ref: Qt
        }, null, 8, ["upgradeKey"]),
        a(ds, {
          ref_key: "upgradeRef",
          ref: lt,
          onComplete: qt,
          onCloudbuild: ol
        }, null, 512),
        a(ps, {
          ref_key: "cloudBuildRef",
          ref: ye
        }, null, 512)
      ], 64);
    };
  }
});
const ai = /* @__PURE__ */ Ql(Mo, [["__scopeId", "data-v-b7a84894"]]);
export {
  ai as default
};
