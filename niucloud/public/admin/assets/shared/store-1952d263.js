import { defineComponent as Ml, ref as _, reactive as st, computed as ge, watch as Rl, resolveComponent as m, resolveDirective as Ol, openBlock as o, createElementBlock as d, Fragment as D, withDirectives as K, createVNode as n, withCtx as s, createElementVNode as e, normalizeClass as ke, createTextVNode as y, createCommentVNode as p, createBlock as g, unref as c, toDisplayString as u, vShow as se, renderList as Y, withModifiers as M, pushScopeId as zl, popScopeId as Nl, h as Pt } from "vue";
import { _ as ot } from "./icon-addon-one-2b9cfff5.js";
import { _ as ze } from "./apply_empty-3b0bc5e4.js";
import { a as Pl, _ as El } from "./success_icon-605a2b43.js";
import { s as de, u as Ql, t as i, i as at, g as Kl, cq as Et, cs as ql, I as Hl, _ as Zl } from "./core-shared-ae4a556b.js";
import { d as Gl, e as Wl, p as Yl, f as Xl, i as Jl, h as es, j as ts, k as ls, u as ss, l as as } from "./addon-295f549c.js";
import { g as Qt, c as ns, d as os, s as is, b as us } from "./module-f2459599.js";
import { ElNotification as cs, ElMessageBox as pe, ElMessage as nt } from "element-plus";
import { T as ds, _ as ps } from "./dark-3dd028d8.js";
import { useRouter as rs, useRoute as _s } from "vue-router";
import vs from "./index-2e96eff3.js";
import fs from "./index-96a6ebb9.js";
import xs from "./index-15ec46f8.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const hs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAC90lEQVR4AeyYzWsTQRjGn51WaQ+2aiQ9qBiIxiqILXjw4k2hVRA/rgWrLXjwoKD/hR568aD4dei9IDS5+AeoFVI/ED9aaQ8KLfWjCibYmPF9dnbrirGdNWNYS8O+884+M/POb9/dIcMoBL/b/bolP6gv5gd0MX9Gl8TrBtuCzDs2OqDPkyXAgg840q8zaYUiNK5IQxc8tIhv9NUs8+7zgCGykIkAirRrFQqeh04KSTCykIlsKt2EsxSSABZlIFOHwjnlafRFG5JU1x76lLz3riRBRVkkeZ1KhGaxZF6yWAmYTLiAamUCbjkAbD8azzgmSEosFzuD6W5gzylghwDGMY7ZuDMWm985NmDmoD8O7x4Cr+8Cb++b+9JHc18WT4U622kzRSrws25q9mUsQGYgJVlY+Ao8vQVMCOD8pJns/XNzPyeeyifR2U57In05hmMZg+22FgswzN7UPaBaMVO0ZYyfnzL+c+DbA51qpQRwDOv8dultzRpw3VagQ74/Bl7Tal4XJ9u0mwqwPmu0dvFUUqKzPTSO8XV5A23bWLMza8DcsZ8BM4ewuEhaNhh9836j0VNpFT26iDiGOi13nKWdWQOm95qA/OijZlSzQEK9lhZtS+0KeyzvrQHDUPzoo1ZLr6WFY9immljaWWxAu7Dueq0C1ptLZxnsvQGEVi9UdHzdgPzLiwYM63/Sw3ZbXzfg4+tAYfB3o24LsVS/ugGXCu6izRGgC5TaMVYBa+fFXrXO4LcvJmjuBPyNZ7hLieNzJ00M7g1NbfnSGnBi1ATLHsbiTia6W7GpZ3tNjDcF421Ka8Bp2aSODf26awl3KLb+1Qjw4DLwTwD5tHPPzLY+3JnE9ZPyFj68ZCR7s86gfUi3Pf8DQI2y22d2Gq2i5IjrhdOQDoNpjXGeDw47jOk2lIdhNVPFVSFNXBbJNPsd19TpO15ZDjF7KLh9/L+P5rN46CGbv4qP3PSmZ6vo1sAFOel/BCA4N5Baoy5ZrDL/uMx/iSxk4tQ/AAAA//8PWFibAAAABklEQVQDAC9efelrVorbAAAAAElFTkSuQmCC", x = (be) => (zl("data-v-4d1628a3"), be = be(), Nl(), be), ms = { class: "main-container app-market bg-body min-h-[70vh]" }, ys = { class: "flex flex-col mb-[8px]" }, gs = { class: "flex items-center justify-between mb-[5px]" }, ks = /* @__PURE__ */ x(() => /* @__PURE__ */ e("h2", { class: "text-lg font-semibold" }, "应用列表", -1)), bs = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "已安装", -1)), ws = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "未安装", -1)), Cs = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "已购买", -1)), As = { class: "relative" }, Fs = {
  key: 0,
  class: "w-[8px] h-[8px] bg-[red] rounded-[8px] z-1 absolute top-[-2px] right-[-2px]"
}, Vs = { key: 1 }, Ds = { class: "flex items-center bg-[#F4F5F7] h-[80px] justify-between px-[20px]" }, Is = { class: "flex items-center" }, Bs = { class: "w-[42px] h-[42px] bg-purple-100 rounded flex items-center justify-center mr-2 relative" }, js = /* @__PURE__ */ x(() => /* @__PURE__ */ e("img", {
  class: "max-w-full max-h-full",
  src: hs,
  alt: ""
}, null, -1)), Ts = {
  key: 0,
  class: "w-[8px] h-[8px] bg-[red] rounded-[8px] z-1 absolute top-[-2px] right-[-2px]"
}, Us = {
  key: 0,
  class: "flex items-center"
}, Ls = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "text-[16px] font-[500] text-[#1D1F3A]" }, "框架更新", -1)), Ss = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "text-[12px] text-[#9699B6] ml-[10px]" }, "必须优先更新", -1)), $s = [
  Ls,
  Ss
], Ms = {
  key: 1,
  class: "flex items-center"
}, Rs = { class: "text-[16px] font-[500] text-[#1D1F3A]" }, Os = { class: "text-[14px] text-[#374151]" }, zs = {
  key: 0,
  class: ""
}, Ns = {
  key: 1,
  class: "iconfont iconjiang-right text-[#F09000] mx-[2px]"
}, Ps = {
  key: 2,
  class: "text-[#F09000] mr-[4px]"
}, Es = {
  key: 3,
  class: "mr-[4px]"
}, Qs = { class: "text-[#F09000] mr-[4px]" }, Ks = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "个应用可更新", -1)), qs = { key: 0 }, Hs = { class: "flex items-center justify-between mt-[14px] mb-[6px]" }, Zs = { class: "flex items-center text-[12px]" }, Gs = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "共", -1)), Ws = { class: "text-[#EF3826]" }, Ys = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "个应用更新", -1)), Xs = { class: "flex mb-4 flex-wrap" }, Js = ["onClick"], ea = { class: "flex items-start flex-1 w-0" }, ta = { class: "w-[42px] h-[42px] bg-purple-100 rounded flex items-center justify-center mr-2 relative" }, la = { class: "w-full h-full overflow-hidden rounded" }, sa = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-full max-h-full",
    src: ot,
    alt: ""
  })
], -1)), aa = { class: "flex-1 w-0" }, na = { class: "flex items-center" }, oa = ["title"], ia = ["title"], ua = { class: "text-[#374151] text-[12px] leading-[16px] mt-[4px]" }, ca = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "当前版本：", -1)), da = {
  key: 0,
  class: "text-[#374151] ml-[5px] text-[12px]"
}, pa = { class: "relative px-[20px] pb-[20px]" }, ra = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { style: { opacity: "0" } }, ".", -1)), _a = [
  ra
], va = ["onClick"], fa = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full rounded-[5px]" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-full max-h-full",
    src: ot,
    alt: ""
  })
], -1)), xa = { class: "flex-1 w-0 flex flex-col justify-center pl-[20px] font-500 text-[13px]" }, ha = { class: "w-[236px] truncate leading-[18px]" }, ma = {
  key: 0,
  class: "w-[236px] truncate leading-[18px] mt-[6px]"
}, ya = {
  key: 1,
  class: "w-[236px] truncate leading-[18px] mt-[6px]"
}, ga = { class: "mt-[3px] flex flex-nowrap" }, ka = { class: "flex items-center" }, ba = { class: "font-500 text-[13px] mr-[5px]" }, wa = { class: "font-500 text-[13px]" }, Ca = { class: "font-500 text-[13px] multi-hidden" }, Aa = { class: "font-500 text-[13px] multi-hidden" }, Fa = { class: "font-500 text-[13px]" }, Va = {
  key: 1,
  class: "data-loading"
}, Da = {
  key: 0,
  class: "h-[100px]"
}, Ia = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), Ba = { class: "flex items-center" }, ja = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), Ta = { class: "flex items-center" }, Ua = {
  key: 2,
  class: "mx-auto overview-empty flex flex-col items-center pt-14 pb-6"
}, La = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "mb-[20px] text-sm text-[#888]" }, "检测到当前账号尚未绑定授权，请先绑定授权！", -1)), Sa = { class: "flex flex-1 flex-wrap justify-center relative" }, $a = { class: "px-[18px] py-[8px]" }, Ma = /* @__PURE__ */ x(() => /* @__PURE__ */ e("p", { class: "leading-[32px] text-[14px]" }, " 您在官方应用市场购买任意一款应用，即可获得授权码。输入正确授权码认证通过后，即可支持在线升级和其它相关服务 ", -1)), Ra = { class: "flex justify-end mt-[36px]" }, Oa = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), za = { class: "flex items-center" }, Na = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ e("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), Pa = { class: "flex items-center" }, Ea = { class: "mt-[20px]" }, Qa = { class: "text-sm mt-[10px] text-info" }, Ka = { class: "mt-[20px]" }, qa = { class: "mt-[10px] text-right" }, Ha = { class: "min-h-[150px]" }, Za = {
  key: 0,
  class: "mt-3"
}, Ga = { class: "pt-[20px] pl-[20px]" }, Wa = { class: "flex items-center" }, Ya = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "ml-[5px] leading-[20px]" }, "编译权限错误，查看解决方案", -1)), Xa = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "border-[1px] border-primary rounded-[3px] w-[72px] h-[26px] leading-[25px] text-center" }, "立即查看", -1)), Ja = { class: "px-[20px] pt-[10px] text-[14px]" }, en = { key: 0 }, tn = { key: 1 }, ln = {
  key: 0,
  class: "text-right"
}, sn = { key: 1 }, an = {
  key: 1,
  class: "my-3"
}, nn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("p", { class: "pl-[20px]" }, "插件验证", -1)), on = { class: "px-[20px] pt-[10px] text-[14px]" }, un = ["innerHTML"], cn = { class: "flex justify-end" }, dn = { class: "h-[50vh] mt-[20px]" }, pn = { class: "flex flex-col h-full" }, rn = { class: "flex-1 h-0" }, _n = { class: "flex justify-end mt-[20px]" }, vn = { class: "h-[50vh] mt-[20px] flex flex-col" }, fn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("img", {
  src: Pl,
  alt: ""
}, null, -1)), xn = { class: "text-[16px] text-[#4F516D] mt-[5px]" }, hn = {
  key: 0,
  class: "text-[16px] text-[#9699B6] mt-[10px]"
}, mn = { class: "mt-[20px]" }, yn = { class: "h-[50vh] mt-[20px] flex flex-col" }, gn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("img", {
  src: El,
  alt: ""
}, null, -1)), kn = { class: "min-h-[150px]" }, bn = {
  key: 0,
  class: "bg-[#fff] my-3"
}, wn = { class: "pt-[20px] pl-[20px]" }, Cn = { class: "px-[20px] pt-[10px] text-[14px]" }, An = { key: 0 }, Fn = { key: 1 }, Vn = { key: 0 }, Dn = { key: 1 }, In = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "本地已经存在该插件/应用，再次下载会覆盖该插件/应用。", -1)), Bn = { class: "dialog-footer" }, jn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", null, "返回应用列表", -1)), Tn = { class: "border-[1px] border-solid border-[#EBEEF5] p-[20px]" }, Un = { class: "flex items-center justify-between" }, Ln = { class: "flex items-center" }, Sn = { class: "w-[42px] h-[42px] rounded-[6px] flex items-center justify-center mr-[10px] overflow-hidden" }, $n = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-full max-h-full",
    src: ot,
    alt: ""
  })
], -1)), Mn = { class: "text-[16px] font-[500] leading-[20px]" }, Rn = { class: "text-[12px] text-[#374151] leading-[18px] mt-[5px]" }, On = { class: "flex items-center ml-[auto] gap-[10px] detail-btn-box" }, zn = {
  key: 0,
  class: "app-section-header mt-[20px] mb-[12px]"
}, Nn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-title" }, "应用信息", -1)), Pn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-line" }, null, -1)), En = [
  Nn,
  Pn
], Qn = {
  key: 1,
  class: "space-y-[10px] text-[14px]"
}, Kn = { class: "flex items-center" }, qn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "应用类型：", -1)), Hn = { class: "text-[#374151]" }, Zn = { class: "flex items-start" }, Gn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6] pt-[2px]" }, "应用简介：", -1)), Wn = { class: "text-[#374151] flex-1" }, Yn = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "服务周期"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), Xn = { class: "space-y-[10px] text-[14px]" }, Jn = { class: "flex items-center" }, eo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "有效期至：", -1)), to = { class: "text-[#374151] flex items-center" }, lo = { class: "text-[#374151]" }, so = {
  key: 0,
  class: "ml-[10px] flex items-center gap-[3px]"
}, ao = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "iconfont icongouwuche text-[var(--el-color-primary)]" }, null, -1)), no = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "开发者信息"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), oo = { class: "space-y-[10px] text-[14px]" }, io = { class: "flex items-center" }, uo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "开发者：", -1)), co = { class: "text-[#374151]" }, po = {
  key: 0,
  class: "flex items-center"
}, ro = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "联系方式：", -1)), _o = { class: "text-[#374151] inline-flex items-center" }, vo = {
  key: 3,
  class: "app-section-header mt-[20px] mb-[12px]"
}, fo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-title" }, "访问应用", -1)), xo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-line" }, null, -1)), ho = [
  fo,
  xo
], mo = {
  key: 4,
  class: "flex gap-[30px]"
}, yo = { class: "flex items-center" }, go = { class: "w-[28px] h-[28px] flex items-center justify-center mr-[2px]" }, ko = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "text-[14px] text-[#374151]" }, "PC端应用主页", -1)), bo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "iconfont iconjiang-right" }, null, -1)), wo = { class: "flex items-center" }, Co = { class: "w-[28px] h-[28px] flex items-center justify-center mr-[2px]" }, Ao = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "text-[14px] text-[#374151]" }, "移动端应用主页", -1)), Fo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("span", { class: "iconfont iconjiang-right" }, null, -1)), Vo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "应用版本"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), Do = { class: "flex items-center text-[14px]" }, Io = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "w-[84px] text-[#9699B6]" }, "当前版本：", -1)), Bo = { class: "text-[#374151]" }, jo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "app-section-header mt-[20px] mb-[12px]" }, [
  /* @__PURE__ */ e("div", { class: "app-section-title" }, "更新历史"),
  /* @__PURE__ */ e("div", { class: "app-section-line" })
], -1)), To = { class: "detail-upgrade-log -mx-[20px] h-[500px] overflow-auto" }, Uo = { class: "flex items-center justify-between flex-1" }, Lo = { class: "flex flex-col items-baseline" }, So = { class: "text-[#1D1F3A] text-[14px]" }, $o = { class: "flex items-center leading-[1] mt-[2px]" }, Mo = { class: "text-[#9699B6] text-[14px]" }, Ro = { class: "text-[#9699B6] text-[14px] ml-[3px]" }, Oo = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center collapse-arrow" }, [
  /* @__PURE__ */ e("span", { class: "expand text-[14px] !text-[#374151]" }, "更新内容"),
  /* @__PURE__ */ e("span", { class: "fold-up text-[14px] !text-[#374151]" }, "收起"),
  /* @__PURE__ */ e("span", { class: "nc-iconfont nc-icon-xiaV6xx ml-[2px] text-[#9699B6]" })
], -1)), zo = {
  key: 0,
  class: "timeline-log-wrap"
}, No = ["innerHTML"], Po = /* @__PURE__ */ Ml({
  __name: "store",
  setup(be) {
    const Kt = _(null), qt = rs(), it = _s(), Ht = _(Date.now()), v = _(de.get("storeActiveName") || "installed"), ut = _(null), we = _(null), C = _(!0), R = _(""), Ce = _([]), ae = Ql(), re = _(!1), X = _(null), I = _(""), Zt = _(""), Gt = _(null), O = _(de.get("storeShowType") || "card"), z = _(""), q = st({
      keywords: "",
      type: ""
    }), ct = () => {
      Kl().then((l) => {
        I.value = l.data.version.version, Zt.value = l.data.version.code;
      }), ns().then(({ data: l }) => {
        z.value = l.last_version;
      });
    };
    ct();
    const Wt = () => {
      ct(), J();
    }, Yt = () => {
      O.value = O.value == "card" ? "list" : "card", de.set({ key: "storeShowType", data: O.value });
    }, Xt = _({});
    (() => {
      Gl().then((l) => {
        Xt.value = l.data.type_list;
      });
    })();
    const dt = _(), Jt = () => {
      Fe(dt.value, !0);
    }, A = _([]), Ae = (l) => {
      v.value = l, de.set({ key: "storeActiveName", data: l }), l == "recentlyUpdated" && k.value[v.value].length ? A.value = k.value[v.value].map((t) => t.key) : A.value = [], T.value && Ct();
    };
    it.query.id && Ae(it.query.id);
    const Fe = (l, t = !1) => {
      if (l.is_download && v.value == "all" && !t)
        return re.value = !0, dt.value = l, !1;
      R.value || (R.value = l.key, os({ addon: l.key, version: l.version }).then(() => {
        re.value = !1, _e(l.key), J(), R.value = "";
      }).catch(() => {
        R.value = "";
      }));
    }, Ne = _("");
    Qt().then((l) => {
      l.data.data && l.data.data.auth_code && (Ne.value = l.data.data.auth_code);
    });
    const el = _(""), tl = _(""), Q = _({
      installed: [],
      uninstalled: [],
      all: [],
      recentlyUpdated: []
    }), H = (l) => {
      const t = /* @__PURE__ */ new Map(), r = [];
      return l.forEach((h) => {
        h.isHideen || t.set(h.key, { ...h, children: [] });
      }), l.forEach((h) => {
        !h.isHideen && h.support_app && t.has(h.support_app) && t.get(h.support_app).children.push(t.get(h.key));
      }), t.forEach((h) => {
        (!h.support_app || !t.has(h.support_app)) && r.push(h);
      }), r;
    }, pt = () => {
      const l = el.value, t = tl.value;
      if ((!l || l === "") && (t === "" || t == null)) {
        Q.value.installed = H(k.value.installed), Q.value.uninstalled = H(k.value.uninstalled), Q.value.all = H(k.value.all), Q.value.recentlyUpdated = H(k.value.recentlyUpdated);
        return;
      }
      const r = (h) => h.filter(($) => {
        const ue = !l || $.title.includes(l), le = !t || $.type === t;
        return ue && le;
      });
      Q.value.installed = H(r(k.value.installed)), Q.value.uninstalled = H(r(k.value.uninstalled)), Q.value.all = H(r(k.value.all)), Q.value.recentlyUpdated = H(r(k.value.recentlyUpdated));
    }, k = _({
      installed: [],
      uninstalled: [],
      all: [],
      recentlyUpdated: [],
      error: ""
    }), J = () => {
      C.value = !0, Wl({}).then((l) => {
        var r;
        const t = l.data.list;
        k.value.error = l.data.error, k.value.installed = [], k.value.uninstalled = [], k.value.all = [], k.value.recentlyUpdated = [];
        for (const h in t)
          t[h].is_local == !1 && k.value.all.push(t[h]), t[h].install_info && ((r = Object.keys(t[h].install_info)) != null && r.length) ? (k.value.installed.push(t[h]), t[h].install_info.version != t[h].version && k.value.recentlyUpdated.push(t[h])) : t[h].is_download == !0 && k.value.uninstalled.push(t[h]);
        pt(), ae.routers.forEach((h, $) => {
          h.children && h.children.length ? (h.name = Et(h.children), Pe.value[h.meta.app] = Et(h.children)) : Pe.value[h.meta.app] = h.name;
        }), Ae(v.value), C.value = !1;
      }).catch(() => {
        C.value = !1;
      });
    };
    J();
    const Ve = ge(() => {
      let l = 0;
      return k.value[v.value] && k.value[v.value].length && k.value[v.value].forEach((t) => {
        t.isHideen && l++;
      }), l == k.value[v.value].length;
    }), rt = _(), _t = () => {
      k.value[v.value].forEach((l) => {
        l.isHideen = !0;
        let t = q.keywords, r = q.type;
        const h = !r || l.type === r, $ = !t || l.title.indexOf(t) !== -1;
        h && $ && (l.isHideen = !1);
      }), O.value != "card" && pt();
    }, ll = (l) => {
      l && (l.resetFields(), q.keywords = "", q.type = "", _t());
    }, Pe = _({}), Qo = (l) => {
      if (l.type == "app" && Object.keys(l.install_info).length) {
        de.set({ key: "menuAppStorage", data: l.key }), de.set({ key: "plugMenuTypeStorage", data: "" });
        const t = ae.appMenuList;
        t.push(l.key), ae.setAppMenuList(t);
        const r = Pe.value[l.key];
        qt.push({ name: r });
      }
    }, Z = _(""), G = _(!1), L = _(0), S = _({});
    let Ee = null;
    const Qe = new ds();
    let De = null;
    const sl = (l, t, r, h, $) => {
      if (t == "开始安装插件") {
        r(Qe);
        const ue = al(["/", "——", "\\", "|"]);
        Ee = setInterval(() => {
          De ? Qe.flush(De + "<br>> " + ue.next().value) : Qe.flush("> " + ue.next().value);
        }, 150);
      }
    };
    function al(l) {
      let t = 0;
      return {
        next() {
          return t + 1 == l.length && (t = 0), { value: l[t++] };
        }
      };
    }
    const _e = (l) => {
      Z.value = l, Yl(l).then((t) => {
        L.value = 0, Ie.value = !1, W.value = !1, oe.value = "", G.value = !0, Ce.value = [], S.value = t.data, ae.clearRouters();
      });
    }, nl = _(null), ne = _(0);
    let F = null, ee = null;
    const Ke = (l = !0) => {
      Xl().then((t) => {
        var r;
        if (t.data) {
          if (l && (Be = [], Z.value = t.data.addon, G.value || (ee = cs.success({
            title: i("warning"),
            dangerouslyUseHTMLString: !0,
            message: Pt("div", {}, [
              i("installingTips"),
              Pt(
                "span",
                {
                  class: "text-primary cursor-pointer",
                  onClick: ol
                },
                [i("installPercent")]
              )
            ]),
            duration: 0,
            showClose: !1
          })), F && clearInterval(F), ne.value = parseInt(Date.now() / 1e3) - t.data.timestamp, F = setInterval(() => {
            ne.value++;
          }, 1e3)), t.data.error) {
            (r = X.value) == null || r.pushMessage({ content: t.data.error, class: "error" }), ht.value = t.data.error, W.value = !0, F && (clearInterval(F), F = null);
            return;
          }
          t.data.mode == "cloud" && cl(), setTimeout(() => {
            Ke(!1);
          }, 5e3);
        } else
          l || (L.value = 2, F && (clearInterval(F), F = null), J(), ae.clearRouters(), ee == null || ee.close());
      }).catch((t) => {
        var r;
        console.log(t), (r = X.value) == null || r.pushMessage({ content: t.message, class: "error" });
      });
    };
    Ke();
    const Ie = _(!1), vt = () => {
      Ie.value = !0, L.value = 1, W.value = !1;
    }, ft = ge(() => {
      const l = ne.value, t = Math.floor(l / 3600), r = Math.floor(l % 3600 / 60), h = l % 60;
      return [t > 0 ? `${t}小时` : "", r > 0 ? `${r}分钟` : "", `${h}秒`].filter(Boolean).join("");
    }), ol = () => {
      G.value = !0, L.value = 1;
    }, ve = _(!1), oe = _(""), il = () => {
      !S.value.is_pass || ve.value || (oe.value = "local", ve.value = !0, nl.value = Date.now(), ne.value = 0, F && clearInterval(F), F = setInterval(() => {
        ne.value++;
      }, 1e3), Jl({ addon: Z.value }).then((l) => {
        L.value = 2, F && (clearInterval(F), F = null), J(), ve.value = !1, l.data.length && (Ce.value = l.data);
      }).catch((l) => {
        ve.value = !1;
      }));
    }, fe = _(!1), ul = () => {
      if (!Ne.value) {
        xt();
        return;
      }
      !S.value.is_pass || fe.value || (fe.value = !0, oe.value = "cloud", es({ addon: Z.value }).then((l) => {
        L.value = 1, X.value.execute("clear"), X.value.execute("开始安装插件"), l.data.length && (Ce.value = l.data), Ke(), fe.value = !1;
      }).catch((l) => {
        fe.value = !1, l.code && l.code == 601 ? pe.confirm(
          "云编译服务未启动，必须在启动后进行云编译！",
          "提示",
          {
            distinguishCancelAndClose: !0,
            confirmButtonText: "重新检测",
            cancelButtonText: "查看操作手册",
            type: "warning"
          }
        ).then(() => {
          ul();
        }).catch((t) => {
          t == "cancel" && window.open("https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html", "_blank");
        }) : nt({ message: l.msg, type: "error" });
      }));
    }, xt = () => {
      pe.confirm(i("authTips"), i("warning"), {
        distinguishCancelAndClose: !0,
        confirmButtonText: i("toBind"),
        cancelButtonText: i("toNiucloud")
      }).then(() => {
        gt();
      }).catch((l) => {
        l === "cancel" && window.open("https://www.niucloud.com/app");
      });
    }, W = _(!1), ht = _("");
    let Be = [];
    const cl = () => {
      ts(Z.value).then((l) => {
        const t = l.data.data ?? [];
        t[0] && t[0].length && G.value == !0 && t[0].forEach((r) => {
          if (!Be.includes(r.action)) {
            if (r.action.indexOf("云编译任务正在排队") != -1) {
              De = r.action, Be.push(r.action);
              return;
            } else
              De = null;
            X.value.pushMessage({ content: `${r.action}` }), Be.push(r.action), r.code == 0 && X.value.pushMessage({ content: r.msg, class: "error" });
          }
        });
      }).catch(() => {
        ee == null || ee.close();
      });
    };
    Rl(Z, (l) => {
      S.value = {};
    });
    const qe = _(!1), je = _({}), He = (l) => {
      pe.confirm(i("uninstallTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        pl(l);
      });
    }, xe = (l) => {
      var t;
      (t = ut.value) == null || t.open(l.key, null, l);
    }, dl = () => {
      var l;
      if (!Ne.value) {
        xt();
        return;
      }
      if (we.value.cloudBuildTask) {
        (l = we.value) == null || l.open();
        return;
      }
      pe.confirm(i("cloudBuildTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        var t;
        (t = we.value) == null || t.open();
      });
    }, pl = (l) => {
      ls(l).then(({ data: t }) => {
        t.is_pass ? ss({ addon: l }).then((r) => {
          J(), ae.clearRouters(), C.value = !1;
        }).catch(() => {
          C.value = !1;
        }) : (je.value = t, qe.value = !0);
      });
    }, mt = () => {
      window.open("https://www.niucloud.com/app");
    }, rl = (l) => {
      L.value == 1 && !Ie.value && !W.value ? pe.confirm(i("installShowDialogCloseTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        as(Z.value), F && (clearInterval(F), F = null), Ie.value = !1, oe.value = "", W.value = !1, l();
      }) : L.value == 2 ? (Ae("installed"), location.reload()) : l(), Ee && clearInterval(Ee);
    }, _l = (l) => {
      l.version = z.value, l.title = "框架", l.install_info = {
        version: I.value
      }, Ue(l);
    }, Te = _(!1), Ze = _(""), yt = _(null), he = _(!1), te = _(!0);
    (() => {
      te.value = !0, Qt().then((l) => {
        te.value = !1, l.data.data && l.data.data.length != 0 && (Ze.value = l.data.data);
      }).catch(() => {
        te.value = !1, Te.value = !1;
      });
    })();
    const gt = () => {
      Te.value = !0;
    }, ie = st({
      auth_code: "",
      auth_secret: ""
    }), kt = _(), vl = st({
      auth_code: [{ required: !0, message: i("authCodePlaceholder"), trigger: "blur" }],
      auth_secret: [{ required: !0, message: i("authSecretPlaceholder"), trigger: "blur" }]
    }), fl = async (l) => {
      he.value || !l || await l.validate(async (t) => {
        t && (he.value = !0, is(ie).then(() => {
          he.value = !1, setTimeout(() => {
            location.reload();
          }, 1e3);
        }).catch(() => {
          he.value = !1;
        }));
      });
    }, bt = () => {
      window.open("https://www.niucloud.com/app");
    }, xl = () => {
      window.open(
        "https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-wu-3001-sheng-7ea7-yun-bian-yi-mu-lu-du-xie-quan-xian-zhuang-tai-bu-tong-guo-ru-he-chu-li.html"
      );
    }, hl = (l) => {
      pe.confirm(i("deleteAddonTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        ql(l).then(() => {
          J();
        });
      });
    }, ml = (l) => {
      if (!l.support_version)
        return !1;
      const t = l.support_version.split("."), r = I.value.split(".");
      return parseFloat(`${t[0]}.${t[1]}`) < parseFloat(`${r[0]}.${r[1]}`);
    }, yl = () => {
      k.value[v.value].length && (k.value[v.value].length == A.value.length ? A.value = [] : A.value = k.value[v.value].map((l) => l.key));
    }, Ge = (l, t) => {
      v.value != "recentlyUpdated" && v.value != "uninstalled" || (A.value.includes(t) ? A.value.splice(A.value.indexOf(t), 1) : A.value.push(t));
    }, gl = () => {
      const l = Hl(A.value);
      if (I.value != z.value && l.unshift("niucloud-admin"), !l.length) {
        nt({
          message: k.recentlyUpdated.length ? "请先勾选要升级的插件" : "当前已是最新版",
          type: "error",
          duration: 5e3
        });
        return;
      }
      xe({ key: l.toString() });
    }, qo = () => {
      const l = A.value;
      if (!l.length) {
        nt({ message: "请先勾选要安装的插件", type: "error", duration: 5e3 });
        return;
      }
      _e(l.toString());
    }, kl = ge(() => new Set((Q.value[v.value] || []).map((l) => l.key))), T = _(!1), f = _(null), Ho = ge(() => {
      var t;
      const l = (t = f.value) == null ? void 0 : t.install_info;
      return Boolean(l && Object.keys(l).length);
    }), bl = ge(() => {
      var t, r;
      const l = (t = f.value) == null ? void 0 : t.install_info;
      return l && Object.keys(l).length ? l.version || "-" : ((r = f.value) == null ? void 0 : r.version) || "-";
    }), me = _([]), We = _(!1), Ye = _(0), wt = (l) => {
      if (!l)
        return ["-", "-"];
      const [t, r] = l.split(" ");
      if (!r)
        return [t || "-", "-"];
      const [h, $] = r.split(":");
      return [t, `${h}:${$}`];
    }, wl = async (l) => {
      We.value = !0;
      try {
        const { data: t } = await us({ app_key: l });
        me.value = Array.isArray(t) ? t : [];
      } finally {
        We.value = !1;
      }
    }, Ue = (l) => {
      f.value = l, T.value = !0, Ye.value = 0, me.value = [], l != null && l.key && wl(l.key);
    }, Ct = () => {
      T.value = !1, f.value = null, me.value = [];
    }, Xe = (l) => {
      l == "pc" ? window.open(`https://www.niucloud.com/app/detail/?id=${f.value.app_id}`) : window.open(`https://wap.niucloud.com/pages/product/detail?id=${f.value.app_id}`);
    };
    return (l, t) => {
      const r = m("el-tab-pane"), h = m("el-tabs"), $ = m("el-option"), ue = m("el-select"), le = m("el-form-item"), Je = m("el-input"), b = m("el-button"), At = m("el-form"), Cl = m("DocumentCopy"), B = m("el-icon"), Le = m("el-checkbox"), et = m("el-card"), tt = m("el-image"), U = m("el-table-column"), Ft = m("el-tag"), Vt = m("el-tooltip"), Dt = m("QuestionFilled"), It = m("el-table"), ye = m("el-empty"), Bt = m("el-link"), Al = m("el-popover"), Se = m("el-dialog"), lt = m("el-step"), Fl = m("el-steps"), V = m("el-col"), ce = m("el-row"), $e = m("Select"), Me = m("CloseBold"), Vl = m("el-alert"), Re = m("el-scrollbar"), jt = m("el-result"), Dl = m("ArrowLeft"), Il = m("Phone"), Bl = m("Monitor"), jl = m("Cellphone"), Tl = m("el-collapse-item"), Ul = m("el-collapse"), Ll = m("el-timeline-item"), Sl = m("el-timeline"), Oe = Ol("loading");
      return o(), d(D, null, [
        K((o(), d("div", ms, [
          n(et, {
            class: "box-card app-head !border-none !pb-[0]",
            shadow: "never"
          }, {
            default: s(() => [
              e("div", ys, [
                e("div", gs, [
                  ks,
                  e("i", {
                    class: ke(["iconfont cursor-pointer", O.value == "card" ? "iconliebiao" : "iconliebiaoqiehuan"]),
                    onClick: Yt
                  }, null, 2)
                ]),
                n(h, {
                  modelValue: v.value,
                  "onUpdate:modelValue": t[0] || (t[0] = (a) => v.value = a),
                  onTabChange: Ae
                }, {
                  default: s(() => [
                    n(r, { name: "installed" }, {
                      label: s(() => [
                        bs
                      ]),
                      _: 1
                    }),
                    n(r, { name: "uninstalled" }, {
                      label: s(() => [
                        ws
                      ]),
                      _: 1
                    }),
                    n(r, { name: "all" }, {
                      label: s(() => [
                        Cs
                      ]),
                      _: 1
                    }),
                    n(r, { name: "recentlyUpdated" }, {
                      label: s(() => [
                        e("span", As, [
                          y(" 可更新 "),
                          k.value.recentlyUpdated.length ? (o(), d("div", Fs)) : p("", !0)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              !C.value && !T.value && (v.value == "installed" || v.value == "all" || v.value == "uninstalled") ? (o(), g(At, {
                key: 0,
                inline: !0,
                model: q,
                ref_key: "searchFormRef",
                ref: rt,
                class: "search-form"
              }, {
                default: s(() => [
                  n(le, { prop: "type" }, {
                    default: s(() => [
                      n(ue, {
                        modelValue: q.type,
                        "onUpdate:modelValue": t[1] || (t[1] = (a) => q.type = a),
                        clearable: "",
                        placeholder: c(i)("应用类型"),
                        class: "input-width"
                      }, {
                        default: s(() => [
                          n($, {
                            label: c(i)("应用"),
                            value: "app"
                          }, null, 8, ["label"]),
                          n($, {
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
                      n(Je, {
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
                        onClick: t[4] || (t[4] = (a) => ll(rt.value))
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
              }, 8, ["model"])) : p("", !0),
              !C.value && !T.value && v.value == "recentlyUpdated" ? (o(), d("div", Vs, [
                e("div", Ds, [
                  e("div", Is, [
                    e("div", Bs, [
                      js,
                      I.value != z.value ? (o(), d("div", Ts)) : p("", !0)
                    ]),
                    e("div", null, [
                      z.value != I.value ? (o(), d("p", Us, $s)) : (o(), d("p", Ms, [
                        e("span", Rs, "当前框架为最新版 V" + u(I.value), 1)
                      ])),
                      e("p", Os, [
                        z.value != I.value ? (o(), d("span", zs, "框架 V" + u(I.value), 1)) : p("", !0),
                        z.value != I.value ? (o(), d("span", Ns)) : p("", !0),
                        z.value != I.value ? (o(), d("span", Ps, u(z.value), 1)) : p("", !0),
                        z.value != I.value ? (o(), d("span", Es, "和")) : p("", !0),
                        e("span", Qs, u(A.value.length), 1),
                        Ks
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
                          n(Cl)
                        ]),
                        _: 1
                      }),
                      y(" 更新记录 ")
                    ]),
                    _: 1
                  }),
                  K(n(b, {
                    type: "primary",
                    onClick: gl
                  }, {
                    default: s(() => [
                      y(" 一键升级"),
                      A.value.length ? (o(), d("span", qs, "(" + u(A.value.length) + ")", 1)) : p("", !0)
                    ]),
                    _: 1
                  }, 512), [
                    [se, v.value == "recentlyUpdated" || I.value != z.value && v.value != "uninstalled"]
                  ])
                ]),
                e("div", Hs, [
                  e("p", Zs, [
                    Gs,
                    e("span", Ws, u(A.value.length), 1),
                    Ys
                  ]),
                  n(Le, {
                    label: "全选",
                    "model-value": k.value[v.value].length && k.value[v.value].length == A.value.length,
                    onChange: yl,
                    value: "Value A",
                    class: "ml-[12px]"
                  }, null, 8, ["model-value"])
                ])
              ])) : p("", !0)
            ]),
            _: 1
          }),
          K(e("div", Xs, [
            k.value[v.value].length && !C.value ? (o(!0), d(D, { key: 0 }, Y(k.value[v.value], (a) => {
              var w, N, P;
              return o(), d("div", {
                class: ke(["rounded-md p-[16px] app-card mb-[20px] ml-[20px] cursor-pointer product-card-item flex justify-between items-start", { selected: A.value.includes(a.key), hidden: a.isHideen }]),
                onClick: (E) => Ue(a),
                key: a.key
              }, [
                e("div", ea, [
                  e("div", ta, [
                    e("div", la, [
                      n(tt, {
                        class: "w-full h-full overflow-hidden rounded",
                        src: c(at)(a.icon),
                        fit: "contain"
                      }, {
                        error: s(() => [
                          sa
                        ]),
                        _: 2
                      }, 1032, ["src"])
                    ])
                  ]),
                  e("div", aa, [
                    e("div", na, [
                      e("p", {
                        class: "text-[16px] text-[#374151] truncate leading-[20px]",
                        title: a.title
                      }, u(a.title), 9, oa),
                      e("span", {
                        class: ke({ "app-ident": a.type == "app", "addon-ident": a.type == "addon" })
                      }, u(a.type == "app" ? "应用" : "插件"), 3)
                    ]),
                    e("p", {
                      class: "text-xs text-[#4F516D] truncate mt-[2px] font-bold",
                      title: a.key
                    }, u(a.key), 9, ia),
                    e("div", ua, [
                      ca,
                      e("span", null, u(a.install_info && ((w = Object.keys(a.install_info)) != null && w.length) ? a.install_info.version : a.version), 1),
                      a.install_info && ((N = Object.keys(a.install_info)) != null && N.length) && a.install_info.version != a.version && v.value == "recentlyUpdated" ? (o(), d("span", da, "最新版本：" + u(a.version), 1)) : p("", !0)
                    ])
                  ])
                ]),
                e("view", {
                  class: ke(["w-[25px] flex items-end flex-col h-full justify-between", { "w-[40px]": !a.is_download && R.value == a.key }])
                }, [
                  v.value == "recentlyUpdated" ? (o(), d(D, { key: 0 }, [
                    A.value.includes(a.key) ? (o(), g(Le, {
                      key: 0,
                      class: "!h-[auto] leading-[1]",
                      checked: "",
                      onClick: M((E) => Ge(E, a.key), ["stop"])
                    }, null, 8, ["onClick"])) : (o(), g(Le, {
                      key: 1,
                      class: "!h-[auto] leading-[1]",
                      onClick: M((E) => Ge(E, a.key), ["stop"])
                    }, null, 8, ["onClick"]))
                  ], 64)) : p("", !0),
                  v.value == "installed" || v.value == "all" || v.value == "uninstalled" ? (o(), d(D, { key: 1 }, [
                    a.is_download ? !a.install_info || Object.keys(a.install_info).length == 0 ? (o(), g(b, {
                      key: 1,
                      class: "mt-[auto] !text-[#0766F5] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      onClick: M((E) => _e(a.key), ["stop"])
                    }, {
                      default: s(() => [
                        y("安装")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : p("", !0) : (o(), g(b, {
                      key: 0,
                      class: "!text-[#0766F5] mt-[auto] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      loading: R.value == a.key,
                      disabled: R.value != "",
                      onClick: M((E) => Fe(a), ["stop"])
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
                      onClick: M((E) => He(a.key), ["stop"])
                    }, {
                      default: s(() => [
                        y(u(c(i)("unload")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : p("", !0)
                  ], 64)) : (o(), d(D, { key: 2 }, [
                    a.install_info.version != a.version ? (o(), g(b, {
                      key: 0,
                      class: "!text-[#008C1E] mt-[auto] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]",
                      onClick: M((E) => xe(a), ["stop"])
                    }, {
                      default: s(() => [
                        y(" 升级 ")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : p("", !0)
                  ], 64))
                ], 2)
              ], 10, Js);
            }), 128)) : p("", !0)
          ], 512), [
            [se, O.value == "card" && !T.value]
          ]),
          K(e("div", pa, [
            k.value[v.value].length && !C.value && !T.value ? (o(), g(It, {
              key: 0,
              ref_key: "tableRef",
              ref: Kt,
              "tree-props": { children: "children" },
              "default-expand-all": !0,
              data: Q.value[v.value],
              "row-key": "key",
              size: "large"
            }, {
              default: s(() => [
                n(U, { width: "24" }, {
                  default: s(({ row: a }) => {
                    var w;
                    return [
                      e("div", {
                        class: ke(["tree-child-cell", {
                          "is-tree-parent": (w = a.children) == null ? void 0 : w.length,
                          "is-tree-child": typeof a.support_app == "string" && a.support_app !== "" && kl.value.has(a.support_app)
                        }])
                      }, _a, 2)
                    ];
                  }),
                  _: 1
                }),
                v.value === "recentlyUpdated" ? (o(), g(U, {
                  key: 0,
                  width: "60px"
                }, {
                  default: s(({ row: a }) => [
                    n(Le, {
                      onClick: t[6] || (t[6] = M(() => {
                      }, ["stop"])),
                      "model-value": A.value.includes(a.key),
                      value: a.key,
                      onChange: (w) => Ge(w, a.key)
                    }, null, 8, ["model-value", "value", "onChange"])
                  ]),
                  _: 1
                })) : p("", !0),
                n(U, {
                  label: c(i)("appName"),
                  align: "left",
                  width: "300"
                }, {
                  default: s(({ row: a }) => {
                    var w, N;
                    return [
                      e("div", {
                        class: "flex items-center cursor-pointer relative left-[-10px]",
                        onClick: (P) => Ue(a)
                      }, [
                        n(tt, {
                          class: "w-[54px] h-[54px] rounded-[5px]",
                          src: c(at)(a.icon),
                          fit: "contain"
                        }, {
                          error: s(() => [
                            fa
                          ]),
                          _: 2
                        }, 1032, ["src"]),
                        e("div", xa, [
                          e("div", ha, u(a.title), 1),
                          a.install_info && ((w = Object.keys(a.install_info)) != null && w.length) ? (o(), d("div", ma, u(a.install_info.version), 1)) : (o(), d("div", ya, u(a.version), 1)),
                          e("div", ga, [
                            v.value == "recentlyUpdated" && a.install_info && ((N = Object.keys(a.install_info)) != null && N.length) && a.install_info.version != a.version ? (o(), g(Ft, {
                              key: 0,
                              type: "danger",
                              size: "small"
                            }, {
                              default: s(() => [
                                y(u(c(i)("newVersion")) + u(a.version), 1)
                              ]),
                              _: 2
                            }, 1024)) : p("", !0),
                            ml(a) && v.value == "recentlyUpdated" ? (o(), g(Vt, {
                              key: 1,
                              effect: "dark",
                              content: `该插件适配框架版本为${a.support_version}，与已安装框架版本${I.value}不完全兼容`,
                              placement: "top-start"
                            }, {
                              default: s(() => [
                                n(Ft, {
                                  type: "warning",
                                  size: "small",
                                  class: "app-list-tip ml-[3px] overflow-hidden"
                                }, {
                                  default: s(() => [
                                    y("该插件适配框架版本为" + u(a.support_version) + "，与已安装框架版本" + u(I.value) + "不完全兼容 ", 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["content"])) : p("", !0)
                          ])
                        ])
                      ], 8, va)
                    ];
                  }),
                  _: 1
                }, 8, ["label"]),
                n(U, {
                  align: "left",
                  "min-width": "150"
                }, {
                  header: s(() => [
                    e("div", ka, [
                      e("span", ba, u(c(i)("appIdentification")), 1),
                      n(Vt, {
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
                    e("span", wa, u(a.key), 1)
                  ]),
                  _: 1
                }),
                n(U, {
                  label: c(i)("introduction"),
                  align: "left",
                  "min-width": "250"
                }, {
                  default: s(({ row: a }) => [
                    e("span", Ca, u(a.desc), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(U, {
                  label: c(i)("type"),
                  align: "left",
                  "min-width": "80"
                }, {
                  default: s(({ row: a }) => [
                    e("span", Aa, u(a.type === "app" ? c(i)("app") : c(i)("addon")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(U, {
                  label: c(i)("author"),
                  align: "left",
                  "min-width": "80"
                }, {
                  default: s(({ row: a }) => [
                    e("span", Fa, u(a.author), 1)
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
                    var w, N;
                    return [
                      v.value == "installed" || v.value == "all" || v.value == "uninstalled" ? (o(), d(D, { key: 0 }, [
                        a.install_info && ((w = Object.keys(a.install_info)) != null && w.length) ? (o(), g(b, {
                          key: 0,
                          class: "!text-[13px]",
                          type: "primary",
                          link: "",
                          onClick: (P) => He(a.key)
                        }, {
                          default: s(() => [
                            y(u(c(i)("unload")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : p("", !0),
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
                        }, 1032, ["onClick"])) : p("", !0),
                        a.is_download ? p("", !0) : (o(), g(b, {
                          key: 2,
                          class: "!text-[13px]",
                          loading: R.value == a.key,
                          disabled: R.value != "",
                          type: "primary",
                          link: "",
                          onClick: M((P) => Fe(a), ["stop"])
                        }, {
                          default: s(() => [
                            e("span", null, u(c(i)("down")), 1)
                          ]),
                          _: 2
                        }, 1032, ["loading", "disabled", "onClick"]))
                      ], 64)) : (o(), d(D, { key: 1 }, [
                        v.value == "recentlyUpdated" && a.install_info && ((N = Object.keys(a.install_info)) != null && N.length) && a.install_info.version != a.version ? (o(), g(b, {
                          key: 0,
                          class: "!text-[13px]",
                          type: "primary",
                          link: "",
                          onClick: (P) => xe(a)
                        }, {
                          default: s(() => [
                            y(u(c(i)("升级")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : p("", !0)
                      ], 64)),
                      n(b, {
                        class: "!text-[13px]",
                        type: "primary",
                        link: "",
                        onClick: (P) => Ue(a)
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
            }, 8, ["data"])) : p("", !0),
            C.value || !k.value[v.value].length ? (o(), d("div", Va, [
              n(It, {
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
              ]) : p("", !0)
            ])) : p("", !0)
          ], 512), [
            [se, O.value == "list" && !T.value]
          ]),
          O.value == "card" && Ve.value && !C.value && v.value == "installed" && !te.value && !T.value ? (o(), g(ye, {
            key: 0,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              Ia
            ]),
            description: s(() => [
              e("p", Ba, u(c(i)("installed-empty")), 1)
            ]),
            _: 1
          })) : p("", !0),
          O.value == "card" && Ve.value && !C.value && v.value == "uninstalled" && !te.value && !T.value ? (o(), g(ye, {
            key: 1,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              ja
            ]),
            description: s(() => [
              e("p", Ta, [
                e("span", null, u(c(i)("descriptionLeft")), 1),
                n(Bt, {
                  type: "primary",
                  onClick: bt,
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
          })) : p("", !0),
          !k.value.all.length && !C.value && !Ze.value && v.value == "all" && !te.value && !T.value ? (o(), d("div", Ua, [
            La,
            e("div", Sa, [
              n(b, {
                class: "w-[154px] !h-[48px] mt-[8px]",
                type: "primary",
                onClick: gt
              }, {
                default: s(() => [
                  y("授权码认证")
                ]),
                _: 1
              }),
              n(Al, {
                ref_key: "getAuthCodeDialog",
                ref: yt,
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
                  e("div", $a, [
                    Ma,
                    e("div", Ra, [
                      n(b, {
                        class: "w-[182px] !h-[48px]",
                        plain: "",
                        onClick: mt
                      }, {
                        default: s(() => [
                          y("去应用市场逛逛")
                        ]),
                        _: 1
                      }),
                      n(b, {
                        class: "w-[100px] !h-[48px]",
                        plain: "",
                        onClick: t[7] || (t[7] = (a) => yt.value.hide())
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
          ])) : p("", !0),
          O.value == "card" && Ve.value && !C.value && Ze.value && v.value == "all" && !te.value && !T.value ? (o(), g(ye, {
            key: 3,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              Oa
            ]),
            description: s(() => [
              e("p", za, [
                e("span", null, u(c(i)("buyDescriptionLeft")), 1),
                n(Bt, {
                  type: "primary",
                  onClick: bt,
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
          })) : p("", !0),
          O.value == "card" && Ve.value && !C.value && v.value == "recentlyUpdated" && !T.value ? (o(), g(ye, {
            key: 4,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              Na
            ]),
            description: s(() => [
              e("p", Pa, u(c(i)("recentlyUpdatedEmpty")), 1)
            ]),
            _: 1
          })) : p("", !0),
          n(Se, {
            modelValue: Te.value,
            "onUpdate:modelValue": t[11] || (t[11] = (a) => Te.value = a),
            title: "授权码认证",
            width: "400px"
          }, {
            default: s(() => [
              n(At, {
                model: ie,
                "label-width": "0",
                ref_key: "formRef",
                ref: kt,
                rules: vl,
                class: "page-form"
              }, {
                default: s(() => [
                  n(et, {
                    class: "box-card !border-none",
                    shadow: "never"
                  }, {
                    default: s(() => [
                      n(le, { prop: "auth_code" }, {
                        default: s(() => [
                          n(Je, {
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
                      e("div", Ea, [
                        n(le, { prop: "auth_secret" }, {
                          default: s(() => [
                            n(Je, {
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
                      e("div", Qa, u(c(i)("authInfoTips")), 1),
                      e("div", Ka, [
                        n(b, {
                          type: "primary",
                          class: "w-full",
                          size: "large",
                          loading: he.value,
                          onClick: t[10] || (t[10] = (a) => fl(kt.value))
                        }, {
                          default: s(() => [
                            y(u(c(i)("confirm")), 1)
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ]),
                      e("div", qa, [
                        n(b, {
                          type: "primary",
                          link: "",
                          onClick: mt
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
          n(Se, {
            modelValue: G.value,
            "onUpdate:modelValue": t[16] || (t[16] = (a) => G.value = a),
            title: c(i)("addonInstall"),
            width: "850px",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "before-close": rl
          }, {
            default: s(() => [
              L.value != 2 && !W.value ? (o(), g(Fl, {
                key: 0,
                space: 200,
                active: L.value,
                class: "number-of-steps",
                "process-status": "process",
                "align-center": ""
              }, {
                default: s(() => [
                  n(lt, {
                    title: c(i)("envCheck"),
                    class: "flex-1"
                  }, null, 8, ["title"]),
                  n(lt, {
                    title: c(i)("installProgress"),
                    class: "flex-1"
                  }, null, 8, ["title"]),
                  n(lt, {
                    title: c(i)("installComplete"),
                    class: "flex-1"
                  }, null, 8, ["title"])
                ]),
                _: 1
              }, 8, ["active"])) : p("", !0),
              K((o(), d("div", null, [
                e("div", Ha, [
                  n(Re, { style: { height: "calc(50vh)", overflow: "auto" } }, {
                    default: s(() => [
                      S.value.dir ? (o(), d("div", Za, [
                        e("p", Ga, u(c(i)("dirPermission")), 1),
                        S.value.file_permission_is_pass ? p("", !0) : (o(), d("div", {
                          key: 0,
                          class: "mt-[10px] mx-[20px] text-[14px] cursor-pointer text-primary flex items-center justify-between bg-[#EFF6FF] rounded-[4px] p-[10px]",
                          onClick: xl
                        }, [
                          e("div", Wa, [
                            n(B, { size: 17 }, {
                              default: s(() => [
                                n(Dt)
                              ]),
                              _: 1
                            }),
                            Ya
                          ]),
                          Xa
                        ])),
                        e("div", Ja, [
                          n(ce, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
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
                          (o(!0), d(D, null, Y(S.value.dir.is_readable, (a, w) => (o(), g(ce, {
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
                                  a.status ? (o(), d("span", en, [
                                    n(B, { color: "green" }, {
                                      default: s(() => [
                                        n($e)
                                      ]),
                                      _: 1
                                    })
                                  ])) : (o(), d("span", tn, [
                                    n(B, { color: "red" }, {
                                      default: s(() => [
                                        n(Me)
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
                          (o(!0), d(D, null, Y(S.value.dir.is_write, (a, w) => (o(), g(ce, {
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
                                  a.status ? (o(), d("span", ln, [
                                    n(B, { color: "green" }, {
                                      default: s(() => [
                                        n($e)
                                      ]),
                                      _: 1
                                    })
                                  ])) : (o(), d("span", sn, [
                                    n(B, { color: "red" }, {
                                      default: s(() => [
                                        n(Me)
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
                      S.value.addon_check && S.value.addon_check.length ? (o(), d("div", an, [
                        nn,
                        e("div", on, [
                          (o(!0), d(D, null, Y(S.value.addon_check, (a) => (o(), g(Vl, {
                            class: "!mb-[10px]",
                            type: "error",
                            closable: !1
                          }, {
                            default: s(() => [
                              e("div", {
                                innerHTML: a.msg
                              }, null, 8, un)
                            ]),
                            _: 2
                          }, 1024))), 256))
                        ])
                      ])) : p("", !0)
                    ]),
                    _: 1
                  })
                ]),
                e("div", cn, [
                  n(b, {
                    type: "primary",
                    class: "!w-[140px]",
                    disabled: !S.value.is_pass || fe.value,
                    loading: ve.value,
                    onClick: il
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
              K(e("div", dn, [
                e("div", pn, [
                  e("div", rn, [
                    n(c(ps), {
                      ref_key: "terminalRef",
                      ref: X,
                      name: `install-${Ht.value}`,
                      context: Z.value,
                      "init-log": null,
                      "show-header": !1,
                      "show-log-time": !0,
                      onExecCmd: sl
                    }, null, 8, ["name", "context"])
                  ]),
                  e("div", _n, [
                    n(b, {
                      type: "primary",
                      loading: !0,
                      class: "!w-[140px]"
                    }, {
                      default: s(() => [
                        y("已用时 " + u(ft.value), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])
              ], 512), [
                [se, L.value == 1 && !W.value]
              ]),
              K(e("div", vn, [
                n(jt, {
                  icon: "success",
                  title: c(i)("addonInstallSuccess")
                }, {
                  icon: s(() => [
                    fn
                  ]),
                  extra: s(() => [
                    (o(!0), d(D, null, Y(Ce.value, (a, w) => (o(), d("div", {
                      class: "mb-[10px]",
                      key: w
                    }, [
                      e("div", xn, u(a), 1)
                    ]))), 128)),
                    ne.value > 0 ? (o(), d("div", hn, "本次安装用时" + u(ft.value), 1)) : p("", !0),
                    e("div", mn, [
                      oe.value == "cloud" ? (o(), g(b, {
                        key: 0,
                        onClick: t[12] || (t[12] = (a) => vt()),
                        class: "!w-[90px]"
                      }, {
                        default: s(() => [
                          y("返回")
                        ]),
                        _: 1
                      })) : p("", !0),
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
              K(e("div", yn, [
                n(jt, {
                  icon: "error",
                  title: c(i)("安装失败")
                }, {
                  icon: s(() => [
                    gn
                  ]),
                  extra: s(() => [
                    n(Re, { class: "max-h-[120px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]" }, {
                      default: s(() => [
                        y(u(ht.value), 1)
                      ]),
                      _: 1
                    }),
                    oe.value == "cloud" ? (o(), g(b, {
                      key: 0,
                      onClick: t[14] || (t[14] = (a) => vt()),
                      class: "!w-[90px]"
                    }, {
                      default: s(() => [
                        y("错误信息")
                      ]),
                      _: 1
                    })) : p("", !0),
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
          n(Se, {
            modelValue: qe.value,
            "onUpdate:modelValue": t[17] || (t[17] = (a) => qe.value = a),
            title: c(i)("addonUninstall"),
            width: "850px",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1
          }, {
            default: s(() => [
              n(Re, { "max-height": "50vh" }, {
                default: s(() => [
                  e("div", kn, [
                    je.value.dir ? (o(), d("div", bn, [
                      e("p", wn, u(c(i)("dirPermission")), 1),
                      e("div", Cn, [
                        n(ce, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
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
                        (o(!0), d(D, null, Y(je.value.dir.is_readable, (a, w) => (o(), g(ce, {
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
                                a.status ? (o(), d("span", An, [
                                  n(B, { color: "green" }, {
                                    default: s(() => [
                                      n($e)
                                    ]),
                                    _: 1
                                  })
                                ])) : (o(), d("span", Fn, [
                                  n(B, { color: "red" }, {
                                    default: s(() => [
                                      n(Me)
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
                        (o(!0), d(D, null, Y(je.value.dir.is_write, (a, w) => (o(), g(ce, {
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
                                a.status ? (o(), d("span", Vn, [
                                  n(B, { color: "green" }, {
                                    default: s(() => [
                                      n($e)
                                    ]),
                                    _: 1
                                  })
                                ])) : (o(), d("span", Dn, [
                                  n(B, { color: "red" }, {
                                    default: s(() => [
                                      n(Me)
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
          n(Se, {
            modelValue: re.value,
            "onUpdate:modelValue": t[19] || (t[19] = (a) => re.value = a),
            title: "下载提示",
            width: "30%"
          }, {
            footer: s(() => [
              e("span", Bn, [
                n(b, {
                  onClick: t[18] || (t[18] = (a) => re.value = !1)
                }, {
                  default: s(() => [
                    y("取消")
                  ]),
                  _: 1
                }),
                n(b, {
                  type: "primary",
                  onClick: Jt
                }, {
                  default: s(() => [
                    y("确定")
                  ]),
                  _: 1
                })
              ])
            ]),
            default: s(() => [
              In
            ]),
            _: 1
          }, 8, ["modelValue"]),
          !C.value && T.value ? (o(), g(et, {
            key: 5,
            class: "box-card app-detail-static !border-none",
            shadow: "never"
          }, {
            default: s(() => {
              var a, w, N, P, E, Tt, Ut, Lt, St, $t, Mt, Rt, Ot, zt;
              return [
                e("div", {
                  class: "flex items-center text-[14px] text-primary cursor-pointer mb-[20px]",
                  onClick: Ct
                }, [
                  n(B, { class: "mr-[6px]" }, {
                    default: s(() => [
                      n(Dl)
                    ]),
                    _: 1
                  }),
                  jn
                ]),
                e("div", Tn, [
                  e("div", Un, [
                    e("div", Ln, [
                      e("div", Sn, [
                        n(tt, {
                          class: "w-full h-full",
                          src: c(at)((a = f.value) == null ? void 0 : a.icon),
                          fit: "contain"
                        }, {
                          error: s(() => [
                            $n
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ]),
                      e("div", null, [
                        e("div", Mn, u(((w = f.value) == null ? void 0 : w.title) || "-"), 1),
                        e("div", Rn, u(((N = f.value) == null ? void 0 : N.key) || "-"), 1)
                      ])
                    ]),
                    e("div", On, [
                      f.value.key != "niucloud-admin" ? (o(), d(D, { key: 0 }, [
                        f.value.is_download ? !f.value.install_info || Object.keys(f.value.install_info).length == 0 ? (o(), g(b, {
                          key: 1,
                          type: "primary",
                          class: "!bg-[#0766F5]",
                          onClick: t[21] || (t[21] = M((j) => _e(f.value.key), ["stop"]))
                        }, {
                          default: s(() => [
                            y("安装")
                          ]),
                          _: 1
                        })) : f.value.install_info.version != f.value.version ? (o(), g(b, {
                          key: 2,
                          type: "warning",
                          onClick: t[22] || (t[22] = M((j) => xe(f.value), ["stop"]))
                        }, {
                          default: s(() => [
                            y(" 升级 ")
                          ]),
                          _: 1
                        })) : p("", !0) : (o(), g(b, {
                          key: 0,
                          type: "primary",
                          class: "download-btn !bg-[#0766F5]",
                          loading: R.value == f.value.key,
                          disabled: R.value != "",
                          onClick: t[20] || (t[20] = M((j) => Fe(f.value), ["stop"]))
                        }, {
                          default: s(() => [
                            y("安装 ")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])),
                        f.value.is_download && (!f.value.install_info || !Object.keys(f.value.install_info).length) ? (o(), g(b, {
                          key: 3,
                          type: "info",
                          onClick: t[23] || (t[23] = (j) => hl(f.value.key))
                        }, {
                          default: s(() => [
                            y(" 删除 ")
                          ]),
                          _: 1
                        })) : p("", !0),
                        f.value.is_download && f.value.install_info && Object.keys(f.value.install_info).length ? (o(), g(b, {
                          key: 4,
                          type: "info",
                          onClick: t[24] || (t[24] = (j) => He(f.value.key))
                        }, {
                          default: s(() => [
                            y(" 卸载 ")
                          ]),
                          _: 1
                        })) : p("", !0)
                      ], 64)) : (o(), d(D, { key: 1 }, [
                        f.value.install_info.version != f.value.version ? (o(), g(b, {
                          key: 0,
                          type: "warning",
                          onClick: t[25] || (t[25] = M((j) => xe(f.value), ["stop"]))
                        }, {
                          default: s(() => [
                            y(" 升级 ")
                          ]),
                          _: 1
                        })) : p("", !0)
                      ], 64))
                    ])
                  ]),
                  (P = f.value) != null && P.type || (E = f.value) != null && E.desc ? (o(), d("div", zn, En)) : p("", !0),
                  (Tt = f.value) != null && Tt.type || (Ut = f.value) != null && Ut.desc ? (o(), d("div", Qn, [
                    e("div", Kn, [
                      qn,
                      e("div", Hn, u(((Lt = f.value) == null ? void 0 : Lt.type) == "app" ? "应用" : "插件"), 1)
                    ]),
                    e("div", Zn, [
                      Gn,
                      e("div", Wn, u(((St = f.value) == null ? void 0 : St.desc) || "-"), 1)
                    ])
                  ])) : p("", !0),
                  Yn,
                  e("div", Xn, [
                    e("div", Jn, [
                      eo,
                      e("div", to, [
                        e("div", lo, u(f.value.expire_time || "--"), 1),
                        f.value.app_id ? (o(), d("div", so, [
                          ao,
                          e("span", {
                            class: "text-[var(--el-color-primary)] text-[14px] cursor-pointer",
                            onClick: t[26] || (t[26] = (j) => Xe("pc"))
                          }, "续费应用")
                        ])) : p("", !0)
                      ])
                    ])
                  ]),
                  ($t = f.value) != null && $t.author || (Mt = f.value) != null && Mt.author_phone ? (o(), d(D, { key: 2 }, [
                    no,
                    e("div", oo, [
                      e("div", io, [
                        uo,
                        e("div", co, u(((Rt = f.value) == null ? void 0 : Rt.author) || "-"), 1)
                      ]),
                      (Ot = f.value) != null && Ot.author_phone ? (o(), d("div", po, [
                        ro,
                        e("div", _o, [
                          y(u((zt = f.value) == null ? void 0 : zt.author_phone) + " ", 1),
                          n(B, { class: "ml-[6px] text-primary" }, {
                            default: s(() => [
                              n(Il)
                            ]),
                            _: 1
                          })
                        ])
                      ])) : p("", !0)
                    ])
                  ], 64)) : p("", !0),
                  f.value.key != "niucloud-admin" && f.value.app_id ? (o(), d("div", vo, ho)) : p("", !0),
                  f.value.key != "niucloud-admin" && f.value.app_id ? (o(), d("div", mo, [
                    e("div", {
                      class: "bg-[#F5F5F5] w-[336px] h-[60px] px-[20px] flex items-center justify-between cursor-pointer",
                      onClick: t[27] || (t[27] = (j) => Xe("pc"))
                    }, [
                      e("div", yo, [
                        e("div", go, [
                          n(B, null, {
                            default: s(() => [
                              n(Bl)
                            ]),
                            _: 1
                          })
                        ]),
                        ko
                      ]),
                      bo
                    ]),
                    e("div", {
                      class: "bg-[#F5F5F5] w-[336px] h-[60px] px-[20px] flex items-center justify-between cursor-pointer",
                      onClick: t[28] || (t[28] = (j) => Xe("pc"))
                    }, [
                      e("div", wo, [
                        e("div", Co, [
                          n(B, null, {
                            default: s(() => [
                              n(jl)
                            ]),
                            _: 1
                          })
                        ]),
                        Ao
                      ]),
                      Fo
                    ])
                  ])) : p("", !0),
                  Vo,
                  e("div", Do, [
                    Io,
                    e("div", Bo, u(bl.value), 1)
                  ]),
                  jo,
                  K((o(), d("div", To, [
                    n(Re, { class: "px-[20px]" }, {
                      default: s(() => [
                        me.value.length ? (o(), g(Sl, {
                          key: 0,
                          style: { width: "100%" }
                        }, {
                          default: s(() => [
                            (o(!0), d(D, null, Y(me.value, (j, Nt) => (o(), g(Ll, {
                              key: j.version_no || Nt,
                              placement: "left"
                            }, {
                              default: s(() => [
                                n(Ul, {
                                  modelValue: Ye.value,
                                  "onUpdate:modelValue": t[29] || (t[29] = ($l) => Ye.value = $l),
                                  accordion: ""
                                }, {
                                  default: s(() => [
                                    n(Tl, { name: Nt }, {
                                      title: s(() => [
                                        e("div", Uo, [
                                          e("div", Lo, [
                                            e("p", So, "版本：V" + u(j.version_no), 1),
                                            e("div", $o, [
                                              e("span", Mo, u(wt(j.release_time)[0]), 1),
                                              e("span", Ro, u(wt(j.release_time)[1]), 1)
                                            ])
                                          ]),
                                          Oo
                                        ])
                                      ]),
                                      default: s(() => [
                                        j.upgrade_log ? (o(), d("div", zo, [
                                          e("div", {
                                            innerHTML: j.upgrade_log
                                          }, null, 8, No)
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
                        })) : (o(), g(ye, {
                          key: 1,
                          description: "暂无版本更新信息"
                        }))
                      ]),
                      _: 1
                    })
                  ])), [
                    [Oe, We.value]
                  ])
                ])
              ];
            }),
            _: 1
          })) : p("", !0)
        ])), [
          [Oe, C.value]
        ]),
        n(xs, {
          upgradeKey: l.upgradeKey,
          ref_key: "upgradeLogRef",
          ref: Gt
        }, null, 8, ["upgradeKey"]),
        n(vs, {
          ref_key: "upgradeRef",
          ref: ut,
          onComplete: Wt,
          onCloudbuild: dl
        }, null, 512),
        n(fs, {
          ref_key: "cloudBuildRef",
          ref: we
        }, null, 512)
      ], 64);
    };
  }
});
const pi = /* @__PURE__ */ Zl(Po, [["__scopeId", "data-v-4d1628a3"]]);
export {
  pi as default
};
