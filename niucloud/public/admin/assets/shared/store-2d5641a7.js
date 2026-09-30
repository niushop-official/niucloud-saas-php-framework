import { defineComponent as ql, ref as _, reactive as dt, computed as H, watch as zl, resolveComponent as b, resolveDirective as Gl, openBlock as n, createElementBlock as p, Fragment as F, withDirectives as q, createElementVNode as t, unref as o, createTextVNode as y, normalizeClass as X, toDisplayString as u, createCommentVNode as f, renderList as He, createVNode as c, withCtx as s, withKeys as Wl, vModelText as $l, createBlock as x, withModifiers as V, vShow as ue, normalizeStyle as Kl, pushScopeId as Pl, popScopeId as Ql, nextTick as Gt, h as Wt } from "vue";
import { _ as vt } from "./icon-addon-one-2b9cfff5.js";
import { _ as ze } from "./apply_empty-3b0bc5e4.js";
import { m as ce, h as Xl, a8 as Yl, t as i, j as qe, _ as Zl, n as Jl, cA as $t, cC as ea, Y as ta, a as la } from "./core-shared-c6ad4e77.js";
import { d as aa, e as na, f as sa, i as oa, h as ia, j as ua, u as ca, k as da } from "./addon-bae583af.js";
import { a as Kt, c as ra, d as pa, s as va, b as _a } from "./module-f32436cf.js";
import { ElNotification as fa, ElMessageBox as de, ElMessage as rt } from "element-plus";
import { useRouter as ma, useRoute as ha } from "vue-router";
import ya from "./index-39c804c3.js";
import pt from "./index-2fe2c142.js";
import ka from "./index-43099569.js";
import ga from "./index-43354893.js";
import { u as xa } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ba = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATgSURBVHgB3ZvNTxtHFMDfjG2CaRPhSE34qIRRlGDaQxwpyhnU3guXHgu59RYTQD1iTlELLubWG9B/ANpzpdBrLyFS1YLTCldq4zRVhdW0ScHefXlv/RF7Wdu76117178Dsj27MD/em9m3s2MBLnN9+fd4AAJxFeUYIET17ShEXgDmAYuPUWL2ydq7B+AiAhwmlshFMRT4iORm6G2clAYt/QIQeQD1AITcE1L55vDz4Sw4iCPC0cTx4IXQW3MlSZwCR8F9lHI788WVHXCAtoRZtD8wkKC0vGc9khYRkKW/k2xX3LbwjcU/ZoQMbhiNS1dpU9yycCl9394CVGegi5D0tpTKqtUxbkk4tpibovG01fGoNoKirUJh1srMLs0eOLn0jMaqfOgZWYb6IjH0aGLpacLsKaaEY4t/JlUQG+BZAhuUfUkzR7ZMaZZFASvgAwSqq4ep4WTTY5o1chp7O7JGKAtH6yPpRq0Nhd9bfh5XEB+BD6FIT1Ok943aDMdw7LNcVAHcBZ/CVxK+fBq1GQqramDFU7OxVajvfaGBLaOmc8Kx5dy8QJwHnyOorudqUP/5OWEE6YsZ2Qxc+upTu06Yo+vrVNbDqR0cuFf7kaxv753o1pCojXJVuOeiW4auu3SzE56rvK8KIwbmoFcprb5oaMJ83XV+pcI5LoYFzN4Ow+jlANhDTI0vnozxqyD/QJXWoOjf4EUmR4Pw9acRuNgv4J9XKnzw4G948cp6X/vkKUd5s5TSNSH3ErWyzKWwhA/fvwC2KDtWxnAcPIZeluHI/vDrGdgBQWiOgteN+SYaPEQj2U++OoGfnxbBLqoo3JJCDUXBQ7glywi176akC9VN8AhuymoIjEoBwt31ZJO4Lstoa2DCmQX0Sod3Fy5DbCRo61xXZcuYXrVsxYOPL8GdayGYHOHOD5qW7qQs45gwFwUV+HppRrrTsoxzEf7237oKqJV0N2QZx4S5k9xZM9LdkuVn0ZJmriw4hBnpbsky/OBdUuXxGzhIM+nZ2/1dk2UEBA5cKy1Ls3VEu7VrRCdlGS4ttd5MLD0/ceOBdjPpTstSvuUz61cjlUnLlY0kRunNdFqWofGrOcryuz1wCb10N2Q1yo5arvESDyryGFxklJLpzrU++O7HU3jxf+dXV0RRHT9MD2erg4vG8UMvr2u1B+4frQ9N86s3hYeLad1tEOV25XVVOFwI7ZQ2hfUYVFhlUm92/FSFD9KRPK37pKHHIKdk7fu6WnqgGNx0stTsOrroMnXCpSjDAvQI+ugy5+6WMqmre70wgSHCtj66jOHtYbjQd9fXqU19l4q6atRkKMypLUC9Cz4lIMUsFxlGbQ0XALRdMCr6bzwLTPy0dqXhvUHTFY+jL4fS9JA8CT6BJtzk0drQZrNjTG0uvbH01wqleBI8DMvS7d9qq+NM76aduP8sAdKju/IojVtFtnooWEDbnafiLp0VBS9As7Ei5fwva+98b/YUS6uWPBkIRZ3maxx0G6oVTpWXt6zIlk6zSex+bh6FXOl4tCmqCMWFTGrUVnFkW7hC58QFlb2YPiu+3Mymx23f1bUtXEETl7wTyPmv8fB3mE4L/+20I1rBMeEKTn5R60wN7R2nIo6umzsurOc6zewS5RiCEqeUHBRo8DxaUN0uRZYmw8dPmlRJTvAayKlgdb/MnpcAAAAASUVORK5CYII=", Aa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR2SURBVHgB5Zs7T9tQFIDPvW6kotKKqFU7NlW7Q1em8JLYgF8AbMACSOyYGSRggg0qsUM3xCNNf0HhB6CGDapWiVREKxHbPefaTkLixNfk2sTuJ5GY+BF/Ofdx7rXNIGSKIyN9+NYHlvUW/zINGzBWwtcSrjsHzgvp4+MzCBEGiilmsxmeSo2ZljUOJArQA8GgH+CMM3Zgatrn9OFhARSiRBgle1By0pHMglryGue7L46OPoEC2hImUXjyZAEX5yF4JIPBWEFjTG9X/MHCxaGhcaxz6571MkzaFA8s7ER1BxfH4TFhbBc0bSVoHQ8kXBwezuIX7UQe1WZgtPF1IkjLzmU3RFmqq186Rpagc7Gsb865SSEljAfU8W0dOpd15xx98S3SzoGWIR6spE9O9FYbtBR2ikonR9aLRZTeaLayqbBICbF+QDwZQOm81wrPOlwcHc3g2z7EFexJRPfpgXejZRjLHdUaB4XO3c4VGmgQxqI8hTtMQfwZF9lgHV4RjkuL7A+mvvVF+56wE90MJAW7aM/XflQf4eREt8pCbZQrwomLbpUewLG6+081wpY1CUnFnpgQiMRD9Lvl8ndIME9NM9OVy13aETaMMVBIqr8fXuztwfPtbdDev5feT/vwQexD+9IxVPJX00SUbeGakKuga24O+Js3QrZ7bU1KmmTdbWnfrtlZUIrj6NbhPlCIdXNTWWbd3b7Srix79szzGIoQjtyZN1Y6AXe7uiot3Uz2Fj9TTA+5csDKDIoxLi7gZmnJV7qZLO1Lx1COafZyHFn0Qgj4SUcuK06AZRgO8mmALz0nFBS34SJZF/EjMBatrPgSa5ciHOoEerNIRy7rID1r2Q5e0i5RyhKRCAuwCIu/RyYSYa8GykWmn1ZJ6MLNWuOgyYkS8Fo0x5arACHRquuR6adDoMQNxi4hBPz6WdnkRDFnXMMXUIxsUhG5NAbXHg8PDxdBYT5dPyz063q8khPa9vfMDCikhJPzabfRUhrl+qzKr5/1jLRHi94mwtEWZuwAFPJnawvMq6uKiExSUbuteX0tjqEUx/G/meJBv3fpfL4gIuzcNpCH5JInWVqoJh6Ki3VHgaMkd7EqfHdHd8WUIGlgYpU+Pa3c8VMRxpCT7AYkD732n/u5dLm8GWaqGTl10SXuCTtRXoTkoNd/0DBawl+EGq/4N2DYUNVHl/AeHpbL07Eu2nTuhrHitcpTWBRtxqYhrnA+4fa7Daua7UN3wZimGb/6zNhCq1sRW854vMzlqJvSIT7oKLvZagOpWTUcPtKdATp0NjqWyhW/jaSnEX8NDi5wuj+6E7GL8abUphAAceHNNPfpkgV0AtQacz6Fsl9ldwk0aykaA8MYqE3GH5EDPJePQWSJB8+M/xwcnNIYW4482hhVA7PBV3aCFJi2LwVEKG4PbjDfd1LgB6Hs2ocQ55zuBMqCWvJirI7D13ZEXUJ5UAtSqTFo80EtIWkYB+lcTum8eehXt35gy56ix/Bcectq/AHoYQ3OC3eWdf465Efx/gETaEKfpjKROgAAAABJRU5ErkJggg==", k = (Te) => (Pl("data-v-f257ac06"), Te = Te(), Ql(), Te), Ca = { class: "main-container app-market min-h-[70vh]" }, wa = { class: "am-framework" }, Ua = { class: "am-framework__brand" }, Ia = {
  class: "am-framework__mark",
  "aria-hidden": "true"
}, Ta = ["src"], Ra = { class: "am-framework__info" }, Va = { class: "am-framework__name" }, Ba = /* @__PURE__ */ k(() => /* @__PURE__ */ t("i", { class: "am-pill-status__dot" }, null, -1)), Ma = { class: "am-framework__meta" }, Da = { class: "am-framework__ops" }, Sa = /* @__PURE__ */ k(() => /* @__PURE__ */ t("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, [
  /* @__PURE__ */ t("circle", {
    cx: "12",
    cy: "12",
    r: "8.4"
  }),
  /* @__PURE__ */ t("path", { d: "M8.4 12.4l2.5 2.5 4.7-5.3" })
], -1)), La = /* @__PURE__ */ k(() => /* @__PURE__ */ t("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, [
  /* @__PURE__ */ t("path", { d: "M6 3.6h8.4L19 8.2v12.2H6Z" }),
  /* @__PURE__ */ t("path", { d: "M14.2 3.6v4.8H19" }),
  /* @__PURE__ */ t("path", { d: "M9 12.6h6M9 16.2h4" })
], -1)), Fa = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", null, "更新记录", -1)), ja = [
  La,
  Fa
], Ea = ["disabled"], Oa = /* @__PURE__ */ k(() => /* @__PURE__ */ t("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, [
  /* @__PURE__ */ t("path", { d: "M12 3.6v10.8" }),
  /* @__PURE__ */ t("path", { d: "M7.6 10l4.4 4.4L16.4 10" }),
  /* @__PURE__ */ t("path", { d: "M4.2 20.4h15.6" })
], -1)), Na = { key: 0 }, Ha = { class: "app-head" }, qa = { class: "am-toolbar" }, za = {
  class: "am-tabs",
  role: "tablist"
}, Ga = ["aria-selected", "onClick"], Wa = { class: "am-toolbar__right" }, $a = { class: "am-search" }, Ka = /* @__PURE__ */ k(() => /* @__PURE__ */ t("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round"
}, [
  /* @__PURE__ */ t("circle", {
    cx: "11",
    cy: "11",
    r: "6.8"
  }),
  /* @__PURE__ */ t("path", { d: "M20.2 20.2 16.4 16.4" })
], -1)), Pa = ["title"], Qa = { key: 0 }, Xa = { class: "flex items-center justify-between mt-[14px] mb-[6px]" }, Ya = { class: "flex items-center text-[12px]" }, Za = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", null, "共", -1)), Ja = { class: "text-[#EF3826]" }, en = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", null, "个应用更新", -1)), tn = { class: "am-grid" }, ln = ["onClick"], an = { class: "am-card__head" }, nn = { class: "am-card__tile" }, sn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("img", {
  class: "am-card__logo-default",
  src: vt,
  alt: ""
}, null, -1)), on = { class: "am-card__info" }, un = { class: "am-card__title-row" }, cn = ["title"], dn = { class: "am-card__key-row" }, rn = ["title"], pn = { class: "am-card__status" }, vn = {
  key: 0,
  class: "am-pill am-pill--warn"
}, _n = {
  key: 1,
  class: "am-pill am-pill--ok"
}, fn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("i", { class: "am-pill__dot" }, null, -1)), mn = {
  key: 2,
  class: "am-pill am-pill--muted"
}, hn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", { class: "am-pill am-pill--danger" }, "兼容提示", -1)), yn = ["title"], kn = { class: "am-card__meta" }, gn = { class: "am-card__meta-item" }, xn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", { class: "am-card__meta-k" }, "当前版本", -1)), bn = { class: "am-card__meta-v" }, An = {
  key: 0,
  class: "am-card__meta-uptodate"
}, Cn = {
  key: 0,
  class: "am-card__sep"
}, wn = {
  key: 1,
  class: "am-card__meta-item"
}, Un = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", { class: "am-card__meta-k" }, "最新版本", -1)), In = { class: "am-card__foot" }, Tn = { class: "table-panel table-fill-page__panel" }, Rn = { class: "table-fill-page__table" }, Vn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", { style: { opacity: "0" } }, ".", -1)), Bn = [
  Vn
], Mn = ["onClick"], Dn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("div", { class: "flex items-center w-full h-full rounded-[5px]" }, [
  /* @__PURE__ */ t("img", {
    class: "max-w-full max-h-full",
    src: vt,
    alt: ""
  })
], -1)), Sn = { class: "flex-1 w-0 flex flex-col justify-center pl-[20px] font-500 text-[13px]" }, Ln = { class: "w-[236px] truncate leading-[18px]" }, Fn = {
  key: 0,
  class: "w-[236px] truncate leading-[18px] mt-[6px]"
}, jn = {
  key: 1,
  class: "w-[236px] truncate leading-[18px] mt-[6px]"
}, En = { class: "mt-[3px] flex flex-nowrap" }, On = { class: "flex items-center" }, Nn = { class: "font-500 text-[13px] mr-[5px]" }, Hn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", { class: "iconfont iconwenhao text-[#999] !text-[14px] cursor-pointer" }, null, -1)), qn = ["title"], zn = { class: "font-500 text-[13px] multi-hidden" }, Gn = { class: "font-500 text-[13px] multi-hidden" }, Wn = { class: "font-500 text-[13px]" }, $n = {
  key: 0,
  class: "data-loading"
}, Kn = {
  key: 0,
  class: "h-[100px]"
}, Pn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ t("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), Qn = { class: "flex items-center" }, Xn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ t("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), Yn = { class: "flex items-center" }, Zn = {
  key: 2,
  class: "mx-auto overview-empty flex flex-col items-center pt-14 pb-6"
}, Jn = /* @__PURE__ */ k(() => /* @__PURE__ */ t("div", { class: "mb-[20px] text-sm text-[#888]" }, "检测到当前账号尚未绑定授权，请先绑定授权！", -1)), es = { class: "flex flex-1 flex-wrap justify-center relative" }, ts = { class: "px-[18px] py-[8px]" }, ls = /* @__PURE__ */ k(() => /* @__PURE__ */ t("p", { class: "leading-[32px] text-[14px]" }, " 您在官方应用市场购买任意一款应用，即可获得授权码。输入正确授权码认证通过后，即可支持在线升级和其它相关服务 ", -1)), as = { class: "flex justify-end mt-[36px]" }, ns = /* @__PURE__ */ k(() => /* @__PURE__ */ t("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ t("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), ss = { class: "flex items-center" }, os = /* @__PURE__ */ k(() => /* @__PURE__ */ t("div", { class: "w-[230px] mx-auto" }, [
  /* @__PURE__ */ t("img", {
    src: ze,
    class: "max-w-full",
    alt: ""
  })
], -1)), is = { class: "flex items-center" }, us = { class: "p-[20px]" }, cs = { class: "mt-[20px]" }, ds = { class: "text-sm mt-[10px] text-info" }, rs = { class: "mt-[20px]" }, ps = { class: "mt-[10px] text-right" }, vs = { class: "min-h-[150px]" }, _s = { class: "flex items-center justify-end gap-[10px] mt-[20px]" }, fs = {
  key: 0,
  class: "text-[12px] text-[#f56c6c]"
}, ms = { class: "h-[50vh] mt-[20px]" }, hs = { class: "flex flex-col h-full" }, ys = { class: "flex-1 h-0" }, ks = { class: "flex justify-end mt-[20px]" }, gs = { class: "h-[50vh] mt-[20px] flex flex-col" }, xs = /* @__PURE__ */ k(() => /* @__PURE__ */ t("img", {
  src: ba,
  alt: ""
}, null, -1)), bs = { class: "text-[16px] text-[#4F516D] mt-[5px]" }, As = {
  key: 0,
  class: "text-[16px] text-[#9699B6] mt-[10px]"
}, Cs = { class: "mt-[20px]" }, ws = { class: "h-[50vh] mt-[20px] flex flex-col" }, Us = /* @__PURE__ */ k(() => /* @__PURE__ */ t("img", {
  src: Aa,
  alt: ""
}, null, -1)), Is = { class: "min-h-[150px] px-[10px]" }, Ts = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", null, "本地已经存在该插件/应用，再次下载会覆盖该插件/应用。", -1)), Rs = { class: "dialog-footer" }, Vs = {
  key: 0,
  class: "am-detail"
}, Bs = { class: "am-detail__head" }, Ms = { class: "am-detail__head-main" }, Ds = { class: "am-detail__tile" }, Ss = /* @__PURE__ */ k(() => /* @__PURE__ */ t("img", {
  class: "am-detail__tile-default",
  src: vt,
  alt: ""
}, null, -1)), Ls = { class: "am-detail__ident" }, Fs = ["title"], js = ["title"], Es = { class: "am-detail__badges" }, Os = { class: "am-pill am-pill--muted" }, Ns = {
  key: 0,
  class: "am-pill am-pill--ok"
}, Hs = /* @__PURE__ */ k(() => /* @__PURE__ */ t("i", { class: "am-pill__dot" }, null, -1)), qs = {
  key: 1,
  class: "am-pill am-pill--muted"
}, zs = {
  key: 2,
  class: "am-pill am-pill--warn"
}, Gs = { class: "am-detail__body" }, Ws = {
  key: 0,
  class: "am-detail__desc"
}, $s = { class: "am-detail__block" }, Ks = /* @__PURE__ */ k(() => /* @__PURE__ */ t("h3", { class: "am-detail__block-title" }, "应用信息", -1)), Ps = { class: "am-kv" }, Qs = { key: 0 }, Xs = /* @__PURE__ */ k(() => /* @__PURE__ */ t("dt", null, "应用类型", -1)), Ys = { key: 1 }, Zs = /* @__PURE__ */ k(() => /* @__PURE__ */ t("dt", null, "应用标识", -1)), Js = ["title"], eo = /* @__PURE__ */ k(() => /* @__PURE__ */ t("dt", null, "当前版本", -1)), to = { class: "am-detail__block" }, lo = /* @__PURE__ */ k(() => /* @__PURE__ */ t("h3", { class: "am-detail__block-title" }, "服务周期", -1)), ao = { class: "am-kv" }, no = /* @__PURE__ */ k(() => /* @__PURE__ */ t("dt", null, "有效期至", -1)), so = {
  key: 1,
  class: "am-detail__block"
}, oo = /* @__PURE__ */ k(() => /* @__PURE__ */ t("h3", { class: "am-detail__block-title" }, "开发者信息", -1)), io = { class: "am-kv" }, uo = { key: 0 }, co = /* @__PURE__ */ k(() => /* @__PURE__ */ t("dt", null, "开发者", -1)), ro = ["title"], po = { key: 1 }, vo = /* @__PURE__ */ k(() => /* @__PURE__ */ t("dt", null, "联系方式", -1)), _o = {
  key: 2,
  class: "am-detail__block"
}, fo = /* @__PURE__ */ k(() => /* @__PURE__ */ t("h3", { class: "am-detail__block-title" }, "访问应用", -1)), mo = { class: "am-chips" }, ho = { class: "am-detail__block" }, yo = /* @__PURE__ */ k(() => /* @__PURE__ */ t("h3", { class: "am-detail__block-title" }, "更新历史", -1)), ko = { class: "am-log-wrap" }, go = {
  key: 0,
  class: "am-log"
}, xo = { class: "am-log__head" }, bo = { class: "am-log__time" }, Ao = ["innerHTML"], Co = {
  key: 1,
  class: "am-log__empty"
}, wo = { class: "am-detail__foot" }, Uo = ["disabled"], Io = /* @__PURE__ */ k(() => /* @__PURE__ */ t("span", { class: "am-detail__spacer" }, null, -1)), To = /* @__PURE__ */ ql({
  __name: "store",
  setup(Te) {
    const { pageRef: Pt, pageStyle: Qt, refreshTablePageHeight: _t } = xa(), Xt = _(null), Yt = ma(), ft = ha(), Zt = _(Date.now()), h = _(ce.get("storeActiveName") || "installed"), mt = _(null), Ge = _(!1), w = _(!0), j = _(""), Re = _([]), le = Xl(), re = _(!1), Y = _(null), z = _(""), Jt = _(""), el = _(null), M = _(ce.get("storeShowType") || "card"), pe = _(""), ae = _(!1), d = _(null), ve = (l, e) => {
      var S, Q, g, I;
      if (typeof l != "string" || typeof e != "string")
        return !1;
      const r = (Q = (S = l.match(/^\d+(?:\.\d+)*$/)) == null ? void 0 : S[0]) == null ? void 0 : Q.split(".").map(Number), v = (I = (g = e.match(/^\d+(?:\.\d+)*$/)) == null ? void 0 : g[0]) == null ? void 0 : I.split(".").map(Number);
      if (!r || !v)
        return !1;
      const T = Math.max(r.length, v.length);
      for (let te = 0; te < T; te++) {
        const Ae = (v[te] ?? 0) - (r[te] ?? 0);
        if (Ae !== 0)
          return Ae > 0;
      }
      return !1;
    }, G = dt({
      keywords: "",
      type: ""
    }), ht = () => {
      Jl().then((l) => {
        z.value = l.data.version.version, Jt.value = l.data.version.code;
      }), ra().then(({ data: l }) => {
        pe.value = l.last_version;
      });
    };
    ht();
    const _e = H(
      () => z.value != pe.value && ve(z.value, pe.value)
    ), tl = () => {
      ht(), Z();
    }, ll = () => {
      M.value = M.value == "card" ? "list" : "card", ce.set({ key: "storeShowType", data: M.value }), M.value == "list" && Gt(_t);
    }, al = _({});
    (() => {
      aa().then((l) => {
        al.value = l.data.type_list;
      });
    })();
    const yt = _(), nl = () => {
      Be(yt.value, !0);
    }, U = _([]), Ve = (l) => {
      h.value = l, ce.set({ key: "storeActiveName", data: l }), l == "recentlyUpdated" && m.value[h.value].length ? U.value = m.value[h.value].map((e) => e.key) : U.value = [], ae.value && Dt(), Gt(_t);
    };
    ft.query.id && Ve(ft.query.id);
    const Be = (l, e = !1) => {
      if (l.is_download && h.value == "all" && !e)
        return re.value = !0, yt.value = l, !1;
      j.value || (j.value = l.key, pa({ addon: l.key, version: l.version }).then(() => {
        re.value = !1, me(l.key), Z(), j.value = "";
      }).catch(() => {
        j.value = "";
      }));
    }, We = _("");
    Kt().then((l) => {
      l.data.data && l.data.data.auth_code && (We.value = l.data.data.auth_code);
    });
    const E = _({
      installed: [],
      uninstalled: [],
      all: [],
      recentlyUpdated: []
    }), K = (l) => {
      const e = /* @__PURE__ */ new Map(), r = [];
      return l.forEach((v) => {
        v.isHideen || e.set(v.key, { ...v, children: [] });
      }), l.forEach((v) => {
        !v.isHideen && v.support_app && e.has(v.support_app) && e.get(v.support_app).children.push(e.get(v.key));
      }), e.forEach((v) => {
        (!v.support_app || !e.has(v.support_app)) && r.push(v);
      }), r;
    }, sl = () => {
      const l = G.keywords, e = G.type;
      if (!l && !e) {
        E.value.installed = K(m.value.installed), E.value.uninstalled = K(m.value.uninstalled), E.value.all = K(m.value.all), E.value.recentlyUpdated = K(m.value.recentlyUpdated);
        return;
      }
      const r = (v) => v.filter((T) => {
        const S = !l || T.title.includes(l), Q = !e || T.type === e;
        return S && Q;
      });
      E.value.installed = K(r(m.value.installed)), E.value.uninstalled = K(r(m.value.uninstalled)), E.value.all = K(r(m.value.all)), E.value.recentlyUpdated = K(r(m.value.recentlyUpdated));
    }, m = _({
      installed: [],
      uninstalled: [],
      all: [],
      recentlyUpdated: [],
      error: ""
    }), Z = () => {
      w.value = !0, na({}).then((l) => {
        var r;
        const e = l.data.list;
        m.value.error = l.data.error, m.value.installed = [], m.value.uninstalled = [], m.value.all = [], m.value.recentlyUpdated = [];
        for (const v in e)
          e[v].is_local == !1 && m.value.all.push(e[v]), e[v].install_info && ((r = Object.keys(e[v].install_info)) != null && r.length) ? (m.value.installed.push(e[v]), e[v].install_info.version != e[v].version && ve(e[v].install_info.version, e[v].version) && m.value.recentlyUpdated.push(e[v])) : e[v].is_download == !0 && m.value.uninstalled.push(e[v]);
        ne(), le.routers.forEach((v, T) => {
          v.children && v.children.length ? (v.name = $t(v.children), $e.value[v.meta.app] = $t(v.children)) : $e.value[v.meta.app] = v.name;
        }), Ve(h.value), w.value = !1;
      }).catch(() => {
        w.value = !1;
      });
    };
    Z();
    const Me = H(() => {
      let l = 0;
      return m.value[h.value] && m.value[h.value].length && m.value[h.value].forEach((e) => {
        e.isHideen && l++;
      }), l == m.value[h.value].length;
    }), ol = H(() => [
      { key: "installed", label: "已安装", count: m.value.installed.length, warn: !1 },
      { key: "uninstalled", label: "未安装", count: m.value.uninstalled.length, warn: !1 },
      { key: "all", label: "已购买", count: m.value.all.length, warn: !1 },
      { key: "recentlyUpdated", label: "可更新", count: m.value.recentlyUpdated.length, warn: !0 }
    ]), ne = () => {
      const l = G.keywords, e = G.type;
      m.value[h.value].forEach((r) => {
        const v = !e || r.type === e, T = !l || r.title.indexOf(l) !== -1;
        r.isHideen = !(v && T);
      }), sl();
    }, il = () => {
      G.keywords || ne();
    }, $e = _({}), Vo = (l) => {
      if (l.type == "app" && Object.keys(l.install_info).length) {
        ce.set({ key: "menuAppStorage", data: l.key }), ce.set({ key: "plugMenuTypeStorage", data: "" });
        const e = le.appMenuList;
        e.push(l.key), le.setAppMenuList(e);
        const r = $e.value[l.key];
        Yt.push({ name: r });
      }
    }, W = _(""), $ = _(!1), B = _(0), O = _(!1), kt = _(null), fe = _(!1), De = _(!1), ul = () => {
      fe.value = !0;
    }, cl = async () => {
      var l;
      if (!De.value) {
        De.value = !0, O.value = !1, fe.value = !1;
        try {
          await ((l = kt.value) == null ? void 0 : l.retry());
        } finally {
          De.value = !1;
        }
      }
    };
    let Ke = null;
    const Pe = new Yl();
    let Se = null;
    const dl = (l, e, r, v, T) => {
      if (e == "开始安装插件") {
        r(Pe);
        const S = rl(["/", "——", "\\", "|"]);
        Ke = setInterval(() => {
          Se ? Pe.flush(Se + "<br>> " + S.next().value) : Pe.flush("> " + S.next().value);
        }, 150);
      }
    };
    function rl(l) {
      let e = 0;
      return {
        next() {
          return e + 1 == l.length && (e = 0), { value: l[e++] };
        }
      };
    }
    const me = (l) => {
      W.value = l, O.value = !1, fe.value = !1, B.value = 0, Le.value = !1, P.value = !1, oe.value = "", $.value = !0, Re.value = [], le.clearRouters();
    }, pl = _(null), se = _(0);
    let C = null, J = null;
    const Qe = (l = !0) => {
      sa().then((e) => {
        var r;
        if (e.data) {
          if (l && (Fe = [], W.value = e.data.addon, $.value || (J = fa.success({
            title: "提示",
            dangerouslyUseHTMLString: !0,
            message: Wt("div", {}, [
              i("installingTips"),
              Wt(
                "span",
                {
                  class: "text-primary cursor-pointer",
                  onClick: vl
                },
                [i("installPercent")]
              )
            ]),
            duration: 0,
            showClose: !1
          })), C && clearInterval(C), se.value = parseInt(Date.now() / 1e3) - e.data.timestamp, C = setInterval(() => {
            se.value++;
          }, 1e3)), e.data.error) {
            (r = Y.value) == null || r.pushMessage({ content: e.data.error, class: "error" }), At.value = e.data.error, P.value = !0, C && (clearInterval(C), C = null);
            return;
          }
          e.data.mode == "cloud" && ml(), setTimeout(() => {
            Qe(!1);
          }, 5e3);
        } else
          l || (B.value = 2, C && (clearInterval(C), C = null), Z(), le.clearRouters(), J == null || J.close());
      }).catch((e) => {
        var r;
        console.log(e), (r = Y.value) == null || r.pushMessage({ content: e.message, class: "error" });
      });
    };
    Qe();
    const Le = _(!1), gt = () => {
      Le.value = !0, B.value = 1, P.value = !1;
    }, xt = H(() => {
      const l = se.value, e = Math.floor(l / 3600), r = Math.floor(l % 3600 / 60), v = l % 60;
      return [e > 0 ? `${e}小时` : "", r > 0 ? `${r}分钟` : "", `${v}秒`].filter(Boolean).join("");
    }), vl = () => {
      $.value = !0, B.value = 1;
    }, he = _(!1), oe = _(""), _l = () => {
      !O.value || he.value || (oe.value = "local", he.value = !0, pl.value = Date.now(), se.value = 0, C && clearInterval(C), C = setInterval(() => {
        se.value++;
      }, 1e3), oa({ addon: W.value }).then((l) => {
        B.value = 2, C && (clearInterval(C), C = null), Z(), he.value = !1, l.data.length && (Re.value = l.data);
      }).catch((l) => {
        he.value = !1;
      }));
    }, ye = _(!1), fl = () => {
      if (!We.value) {
        bt();
        return;
      }
      !O.value || ye.value || (ye.value = !0, oe.value = "cloud", ia({ addon: W.value }).then((l) => {
        B.value = 1, Y.value.execute("clear"), Y.value.execute("开始安装插件"), l.data.length && (Re.value = l.data), Qe(), ye.value = !1;
      }).catch((l) => {
        ye.value = !1, l.code && l.code == 601 ? de.confirm(
          "云编译服务未启动，必须在启动后进行云编译！",
          "提示",
          {
            distinguishCancelAndClose: !0,
            confirmButtonText: "重新检测",
            cancelButtonText: "查看操作手册",
            type: "warning"
          }
        ).then(() => {
          fl();
        }).catch((e) => {
          e == "cancel" && window.open("https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html", "_blank");
        }) : rt({ message: l.msg, type: "error" });
      }));
    }, bt = () => {
      de.confirm(i("authTips"), i("warning"), {
        distinguishCancelAndClose: !0,
        confirmButtonText: i("toBind"),
        cancelButtonText: i("toNiucloud")
      }).then(() => {
        Ut();
      }).catch((l) => {
        l === "cancel" && window.open("https://www.niucloud.com/app");
      });
    }, P = _(!1), At = _("");
    let Fe = [];
    const ml = () => {
      ua(W.value).then((l) => {
        const e = l.data.data ?? [];
        e[0] && e[0].length && $.value == !0 && e[0].forEach((r) => {
          if (!Fe.includes(r.action)) {
            if (r.action.indexOf("云编译任务正在排队") != -1) {
              Se = r.action, Fe.push(r.action);
              return;
            } else
              Se = null;
            Y.value.pushMessage({ content: `${r.action}` }), Fe.push(r.action), r.code == 0 && Y.value.pushMessage({ content: r.msg, class: "error" });
          }
        });
      }).catch(() => {
        J == null || J.close();
      });
    };
    zl(W, (l) => {
      O.value = !1;
    });
    const ke = _(!1), Xe = _(""), Ye = (l) => {
      de.confirm(i("uninstallTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        Xe.value = l, ke.value = !0;
      });
    }, hl = () => {
      const l = Xe.value;
      l && ca({ addon: l }).then((e) => {
        Z(), le.clearRouters(), w.value = !1, ke.value = !1;
      }).catch(() => {
        w.value = !1;
      });
    }, ge = (l) => {
      var e;
      (e = mt.value) == null || e.open(l.key, null, l);
    }, yl = () => {
      if (!We.value) {
        bt();
        return;
      }
      de.confirm(i("cloudBuildTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        Ge.value = !0;
      });
    }, Ct = () => {
      window.open("https://www.niucloud.com/app");
    }, kl = (l) => {
      B.value == 1 && !Le.value && !P.value ? de.confirm(i("installShowDialogCloseTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        da(W.value), C && (clearInterval(C), C = null), Le.value = !1, oe.value = "", P.value = !1, l();
      }) : B.value == 2 ? (Ve("installed"), location.reload()) : l(), Ke && clearInterval(Ke);
    }, gl = (l) => {
      l.version = pe.value, l.title = "框架", l.install_info = {
        version: z.value
      }, Ee(l);
    }, je = _(!1), Ze = _(""), wt = _(null), xe = _(!1), ee = _(!0);
    (() => {
      ee.value = !0, Kt().then((l) => {
        ee.value = !1, l.data.data && l.data.data.length != 0 && (Ze.value = l.data.data);
      }).catch(() => {
        ee.value = !1, je.value = !1;
      });
    })();
    const Ut = () => {
      je.value = !0;
    }, ie = dt({
      auth_code: "",
      auth_secret: ""
    }), It = _(), xl = dt({
      auth_code: [{ required: !0, message: i("authCodePlaceholder"), trigger: "blur" }],
      auth_secret: [{ required: !0, message: i("authSecretPlaceholder"), trigger: "blur" }]
    }), bl = async (l) => {
      xe.value || !l || await l.validate(async (e) => {
        e && (xe.value = !0, va(ie).then(() => {
          xe.value = !1, setTimeout(() => {
            location.reload();
          }, 1e3);
        }).catch(() => {
          xe.value = !1;
        }));
      });
    }, Tt = () => {
      window.open("https://www.niucloud.com/app");
    }, Mo = () => {
      window.open(
        "https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-wu-3001-sheng-7ea7-yun-bian-yi-mu-lu-du-xie-quan-xian-zhuang-tai-bu-tong-guo-ru-he-chu-li.html"
      );
    }, Al = (l) => {
      de.confirm(i("deleteAddonTips"), i("warning"), {
        confirmButtonText: i("confirm"),
        cancelButtonText: i("cancel"),
        type: "warning"
      }).then(() => {
        ea(l).then(() => {
          Z();
        });
      });
    }, Rt = (l) => {
      if (!l.support_version)
        return !1;
      const e = l.support_version.split("."), r = z.value.split(".");
      return parseFloat(`${e[0]}.${e[1]}`) < parseFloat(`${r[0]}.${r[1]}`);
    }, Cl = () => {
      m.value[h.value].length && (m.value[h.value].length == U.value.length ? U.value = [] : U.value = m.value[h.value].map((l) => l.key));
    }, Vt = (l, e) => {
      h.value != "recentlyUpdated" && h.value != "uninstalled" || (U.value.includes(e) ? U.value.splice(U.value.indexOf(e), 1) : U.value.push(e));
    }, wl = () => {
      const l = U.value.length ? U.value : m.value.recentlyUpdated.map((r) => r.key), e = ta(l);
      if (_e.value && !e.includes("niucloud-admin") && e.unshift("niucloud-admin"), !e.length) {
        rt({
          message: "当前已是最新版",
          type: "error",
          duration: 5e3
        });
        return;
      }
      ge({ key: e.toString() });
    }, Do = () => {
      const l = U.value;
      if (!l.length) {
        rt({ message: "请先勾选要安装的插件", type: "error", duration: 5e3 });
        return;
      }
      me(l.toString());
    }, Ul = H(() => new Set((E.value[h.value] || []).map((l) => l.key))), Je = "/static/resource/icon/app.ico", Il = H(
      () => {
        var l, e;
        return ((l = d.value) == null ? void 0 : l.key) === "niucloud-admin" ? Je : ((e = d.value) == null ? void 0 : e.icon) || "";
      }
    ), Tl = H(() => {
      var e;
      const l = (e = d.value) == null ? void 0 : e.install_info;
      return Boolean(l && Object.keys(l).length);
    }), Bt = H(() => {
      var r, v;
      const l = (r = d.value) == null ? void 0 : r.install_info;
      if (!l || !Object.keys(l).length)
        return !1;
      const e = (v = d.value) == null ? void 0 : v.version;
      return Boolean(e) && l.version != e && ve(l.version, e);
    }), Mt = H(() => {
      var l;
      return ((l = d.value) == null ? void 0 : l.key) === "niucloud-admin";
    }), Rl = H(() => {
      var e, r;
      const l = (e = d.value) == null ? void 0 : e.install_info;
      return l && Object.keys(l).length ? l.version || "-" : ((r = d.value) == null ? void 0 : r.version) || "-";
    }), be = _([]), et = _(!1), Vl = _(0), Bl = (l) => {
      if (!l)
        return ["-", "-"];
      const [e, r] = l.split(" ");
      if (!r)
        return [e || "-", "-"];
      const [v, T] = r.split(":");
      return [e, `${v}:${T}`];
    }, Ml = async (l) => {
      et.value = !0;
      try {
        const { data: e } = await _a({ app_key: l });
        be.value = Array.isArray(e) ? e : [];
      } finally {
        et.value = !1;
      }
    }, Ee = (l) => {
      d.value = l, ae.value = !0, Vl.value = 0, be.value = [], l != null && l.key && Ml(l.key);
    }, Dt = () => {
      ae.value = !1;
    }, Dl = () => {
      ae.value || (d.value = null, be.value = []);
    }, Oe = _(!1), tt = _(""), lt = _(""), at = (l) => !(l != null && l.key) || l.key === "niucloud-admin" || l.is_local ? !1 : Boolean(l.install_info && Object.keys(l.install_info).length), nt = (l) => {
      tt.value = l.key, lt.value = l.icon, Oe.value = !0;
    }, st = (l) => {
      const e = l == null ? void 0 : l.install_info;
      return Boolean(e && Object.keys(e).length) && e.version === l.version;
    }, St = () => {
      tt.value = "framework", lt.value = Je, Oe.value = !0;
    }, ot = (l) => {
      l == "pc" ? window.open(`https://www.niucloud.com/app/detail/?id=${d.value.app_id}`) : window.open(`https://wap.niucloud.com/pages/product/detail?id=${d.value.app_id}`);
    };
    return (l, e) => {
      const r = b("el-option"), v = b("el-select"), T = b("el-checkbox"), S = b("el-image"), Q = b("el-tooltip"), g = b("el-button"), I = b("el-table-column"), te = b("el-tag"), Ae = b("el-table"), Ne = b("el-empty"), Lt = b("el-link"), Sl = b("el-popover"), Ft = b("el-input"), jt = b("el-form-item"), Ll = b("el-form"), Ce = b("el-dialog"), it = b("el-step"), Fl = b("el-steps"), Et = b("el-scrollbar"), Ot = b("el-result"), jl = b("Close"), ut = b("el-icon"), El = b("Monitor"), Ol = b("Cellphone"), Nl = b("el-drawer"), ct = Gl("loading");
      return n(), p(F, null, [
        q((n(), p("div", Ca, [
          t("div", wa, [
            t("div", Ua, [
              t("span", Ia, [
                t("img", {
                  src: o(qe)(Je),
                  alt: ""
                }, null, 8, Ta)
              ]),
              t("div", Ra, [
                t("h1", Va, [
                  y(" 系统框架 "),
                  t("span", {
                    class: X(["am-pill-status", o(_e) ? "is-warn" : "is-ok"])
                  }, [
                    Ba,
                    y(u(o(_e) ? "有可用更新" : "已是最新版本"), 1)
                  ], 2)
                ]),
                t("p", Ma, [
                  y("当前 v" + u(z.value || "--"), 1),
                  o(_e) ? (n(), p(F, { key: 0 }, [
                    y(" · 最新 v" + u(pe.value || "--"), 1)
                  ], 64)) : f("", !0),
                  y(" · " + u(m.value.recentlyUpdated.length ? m.value.recentlyUpdated.length + " 个应用可更新" : "无可更新应用"), 1)
                ])
              ])
            ]),
            t("div", Da, [
              t("button", {
                type: "button",
                class: "am-btn am-btn--ghost",
                onClick: St
              }, [
                Sa,
                t("span", null, u(o(i)("diffVerify")), 1)
              ]),
              t("button", {
                type: "button",
                class: "am-btn am-btn--ghost",
                onClick: e[0] || (e[0] = (a) => gl({ key: "niucloud-admin" }))
              }, ja),
              t("button", {
                type: "button",
                class: "am-btn am-btn--primary",
                disabled: !o(_e) && !m.value.recentlyUpdated.length,
                onClick: wl
              }, [
                Oa,
                t("span", null, [
                  y("一键升级"),
                  m.value.recentlyUpdated.length ? (n(), p("span", Na, "（" + u(m.value.recentlyUpdated.length) + "）", 1)) : f("", !0)
                ])
              ], 8, Ea)
            ])
          ]),
          t("div", Ha, [
            t("div", qa, [
              t("div", za, [
                (n(!0), p(F, null, He(o(ol), (a) => (n(), p("button", {
                  type: "button",
                  role: "tab",
                  class: X(["am-tab", { "is-active": h.value == a.key }]),
                  "aria-selected": h.value == a.key,
                  key: a.key,
                  onClick: (A) => {
                    Ve(a.key), ne();
                  }
                }, [
                  y(u(a.label) + " ", 1),
                  t("span", {
                    class: X(["am-tab__n", { "am-tab__n--warn": a.warn && a.count > 0 }])
                  }, u(a.count), 3)
                ], 10, Ga))), 128))
              ]),
              t("div", Wa, [
                c(v, {
                  modelValue: G.type,
                  "onUpdate:modelValue": e[1] || (e[1] = (a) => G.type = a),
                  class: "am-select",
                  placeholder: "应用类型",
                  clearable: "",
                  onChange: e[2] || (e[2] = (a) => ne())
                }, {
                  default: s(() => [
                    c(r, {
                      label: "应用",
                      value: "app"
                    }),
                    c(r, {
                      label: "插件",
                      value: "addon"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                t("label", $a, [
                  Ka,
                  q(t("input", {
                    "onUpdate:modelValue": e[3] || (e[3] = (a) => G.keywords = a),
                    type: "search",
                    placeholder: "搜索应用名称",
                    onKeyup: e[4] || (e[4] = Wl((a) => ne(), ["enter"])),
                    onInput: il
                  }, null, 544), [
                    [
                      $l,
                      G.keywords,
                      void 0,
                      { trim: !0 }
                    ]
                  ])
                ]),
                t("button", {
                  type: "button",
                  class: "am-btn am-btn--primary am-search__btn",
                  onClick: e[5] || (e[5] = (a) => ne())
                }, u(o(i)("search")), 1),
                t("i", {
                  class: X(["iconfont cursor-pointer !text-[16px] text-[#4f516d] transition-colors hover:text-[#0766f5]", M.value == "card" ? "iconliebiao" : "iconliebiaoqiehuan"]),
                  title: M.value == "card" ? "切换为列表模式" : "切换为卡片模式",
                  onClick: ll
                }, null, 10, Pa)
              ])
            ]),
            !w.value && h.value == "recentlyUpdated" ? (n(), p("div", Qa, [
              t("div", Xa, [
                t("p", Ya, [
                  Za,
                  t("span", Ja, u(U.value.length), 1),
                  en
                ]),
                c(T, {
                  label: "全选",
                  "model-value": m.value[h.value].length && m.value[h.value].length == U.value.length,
                  onChange: Cl,
                  value: "Value A",
                  class: "ml-[12px]"
                }, null, 8, ["model-value"])
              ])
            ])) : f("", !0)
          ]),
          q(t("div", tn, [
            m.value[h.value].length && !w.value ? (n(!0), p(F, { key: 0 }, He(m.value[h.value], (a) => {
              var A, L, D, we, Ue, Ie;
              return n(), p("div", {
                class: X(["am-card", { "am-card--selected": U.value.includes(a.key), "is-hidden": a.isHideen }]),
                onClick: (N) => Ee(a),
                key: a.key
              }, [
                t("div", an, [
                  t("div", nn, [
                    c(S, {
                      class: "am-card__logo",
                      src: o(qe)(a.icon),
                      fit: "cover"
                    }, {
                      error: s(() => [
                        sn
                      ]),
                      _: 2
                    }, 1032, ["src"])
                  ]),
                  t("div", on, [
                    t("div", un, [
                      t("span", {
                        class: "am-card__title",
                        title: a.title
                      }, u(a.title), 9, cn),
                      t("span", {
                        class: X(a.type == "app" ? "am-badge am-badge--app" : "am-badge am-badge--addon")
                      }, u(a.type == "app" ? "应用" : "插件"), 3)
                    ]),
                    t("div", dn, [
                      t("span", {
                        class: "am-card__key",
                        title: a.key
                      }, u(a.key), 9, rn)
                    ])
                  ]),
                  t("div", pn, [
                    a.install_info && ((A = Object.keys(a.install_info)) != null && A.length) && a.install_info.version != a.version && ve(a.install_info.version, a.version) ? (n(), p("span", vn, "可升级")) : a.install_info && ((L = Object.keys(a.install_info)) != null && L.length) ? (n(), p("span", _n, [
                      fn,
                      y("已安装")
                    ])) : (n(), p("span", mn, u(a.is_download ? "待安装" : "未安装"), 1)),
                    Rt(a) && h.value == "recentlyUpdated" ? (n(), x(Q, {
                      key: 3,
                      effect: "dark",
                      content: `该插件适配框架版本为${a.support_version}，与已安装框架版本${z.value}不完全兼容`,
                      placement: "top"
                    }, {
                      default: s(() => [
                        hn
                      ]),
                      _: 2
                    }, 1032, ["content"])) : f("", !0)
                  ])
                ]),
                t("p", {
                  class: "am-card__desc",
                  title: a.desc
                }, u(a.desc), 9, yn),
                t("div", kn, [
                  t("span", gn, [
                    xn,
                    t("span", bn, [
                      y(u(a.install_info && ((D = Object.keys(a.install_info)) != null && D.length) ? a.install_info.version : a.version) + " ", 1),
                      st(a) ? (n(), p("span", An, "最新")) : f("", !0)
                    ])
                  ]),
                  st(a) ? f("", !0) : (n(), p("span", Cn)),
                  st(a) ? f("", !0) : (n(), p("span", wn, [
                    Un,
                    t("span", {
                      class: X(["am-card__meta-v", { "is-new": a.install_info && ((we = Object.keys(a.install_info)) == null ? void 0 : we.length) && a.install_info.version != a.version }])
                    }, u(a.version), 3)
                  ]))
                ]),
                t("div", In, [
                  t("div", {
                    class: "am-card__foot-left",
                    onClick: e[6] || (e[6] = V(() => {
                    }, ["stop"]))
                  }, [
                    h.value == "recentlyUpdated" ? (n(), x(T, {
                      key: 0,
                      class: "am-card__check",
                      "model-value": U.value.includes(a.key),
                      onChange: (N) => Vt(N, a.key)
                    }, null, 8, ["model-value", "onChange"])) : f("", !0)
                  ]),
                  t("div", {
                    class: "am-card__acts",
                    onClick: e[7] || (e[7] = V(() => {
                    }, ["stop"]))
                  }, [
                    at(a) ? (n(), x(g, {
                      key: 0,
                      class: "am-act am-act--verify",
                      link: "",
                      onClick: V((N) => nt(a), ["stop"])
                    }, {
                      default: s(() => [
                        y(u(o(i)("diffVerify")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : f("", !0),
                    h.value == "installed" || h.value == "all" || h.value == "uninstalled" ? (n(), p(F, { key: 1 }, [
                      a.is_download ? !a.install_info || Object.keys(a.install_info).length == 0 ? (n(), x(g, {
                        key: 1,
                        class: "am-act am-act--primary",
                        link: "",
                        onClick: V((N) => me(a.key), ["stop"])
                      }, {
                        default: s(() => [
                          y(u(o(i)("install")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : f("", !0) : (n(), x(g, {
                        key: 0,
                        class: "am-act am-act--primary",
                        link: "",
                        loading: j.value == a.key,
                        disabled: j.value != "",
                        onClick: V((N) => Be(a), ["stop"])
                      }, {
                        default: s(() => [
                          y(u(o(i)("down")), 1)
                        ]),
                        _: 2
                      }, 1032, ["loading", "disabled", "onClick"])),
                      a.install_info && ((Ue = Object.keys(a.install_info)) != null && Ue.length) ? (n(), x(g, {
                        key: 2,
                        class: "am-act am-act--muted",
                        link: "",
                        onClick: V((N) => Ye(a.key), ["stop"])
                      }, {
                        default: s(() => [
                          y(u(o(i)("unload")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : f("", !0)
                    ], 64)) : (n(), p(F, { key: 2 }, [
                      a.install_info && ((Ie = Object.keys(a.install_info)) != null && Ie.length) && a.install_info.version != a.version && ve(a.install_info.version, a.version) ? (n(), x(g, {
                        key: 0,
                        class: "am-act am-act--ok",
                        link: "",
                        onClick: V((N) => ge(a), ["stop"])
                      }, {
                        default: s(() => [
                          y("升级")
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : f("", !0)
                    ], 64))
                  ])
                ])
              ], 10, ln);
            }), 128)) : f("", !0)
          ], 512), [
            [ue, M.value == "card"]
          ]),
          q(t("div", {
            ref_key: "pageRef",
            ref: Pt,
            class: "am-list relative pb-[20px] table-fill-page__panel",
            style: Kl(o(Qt))
          }, [
            t("div", Tn, [
              t("div", Rn, [
                m.value[h.value].length && !w.value ? (n(), x(Ae, {
                  key: 0,
                  height: "100%",
                  ref_key: "tableRef",
                  ref: Xt,
                  "tree-props": { children: "children" },
                  "default-expand-all": !0,
                  data: E.value[h.value],
                  "row-key": "key",
                  size: "large"
                }, {
                  default: s(() => [
                    c(I, { width: "24" }, {
                      default: s(({ row: a }) => {
                        var A;
                        return [
                          t("div", {
                            class: X(["tree-child-cell", {
                              "is-tree-parent": (A = a.children) == null ? void 0 : A.length,
                              "is-tree-child": typeof a.support_app == "string" && a.support_app !== "" && o(Ul).has(a.support_app)
                            }])
                          }, Bn, 2)
                        ];
                      }),
                      _: 1
                    }),
                    h.value === "recentlyUpdated" ? (n(), x(I, {
                      key: 0,
                      width: "60px"
                    }, {
                      default: s(({ row: a }) => [
                        c(T, {
                          onClick: e[8] || (e[8] = V(() => {
                          }, ["stop"])),
                          "model-value": U.value.includes(a.key),
                          value: a.key,
                          onChange: (A) => Vt(A, a.key)
                        }, null, 8, ["model-value", "value", "onChange"])
                      ]),
                      _: 1
                    })) : f("", !0),
                    c(I, {
                      label: o(i)("appName"),
                      align: "left",
                      width: "300"
                    }, {
                      default: s(({ row: a }) => {
                        var A, L;
                        return [
                          t("div", {
                            class: "flex items-center cursor-pointer relative left-[-10px]",
                            onClick: (D) => Ee(a)
                          }, [
                            c(S, {
                              class: "w-[var(--cmp-table-composite-icon-size)] h-[var(--cmp-table-composite-icon-size)] rounded-[5px]",
                              src: o(qe)(a.icon),
                              fit: "contain"
                            }, {
                              error: s(() => [
                                Dn
                              ]),
                              _: 2
                            }, 1032, ["src"]),
                            t("div", Sn, [
                              t("div", Ln, u(a.title), 1),
                              a.install_info && ((A = Object.keys(a.install_info)) != null && A.length) ? (n(), p("div", Fn, u(a.install_info.version), 1)) : (n(), p("div", jn, u(a.version), 1)),
                              t("div", En, [
                                h.value == "recentlyUpdated" && a.install_info && ((L = Object.keys(a.install_info)) != null && L.length) && a.install_info.version != a.version ? (n(), x(te, {
                                  key: 0,
                                  type: "danger",
                                  size: "small"
                                }, {
                                  default: s(() => [
                                    y(u(o(i)("newVersion")) + u(a.version), 1)
                                  ]),
                                  _: 2
                                }, 1024)) : f("", !0),
                                Rt(a) && h.value == "recentlyUpdated" ? (n(), x(Q, {
                                  key: 1,
                                  effect: "dark",
                                  content: `该插件适配框架版本为${a.support_version}，与已安装框架版本${z.value}不完全兼容`,
                                  placement: "top-start"
                                }, {
                                  default: s(() => [
                                    c(te, {
                                      type: "warning",
                                      size: "small",
                                      class: "app-list-tip ml-[3px] overflow-hidden"
                                    }, {
                                      default: s(() => [
                                        y("该插件适配框架版本为" + u(a.support_version) + "，与已安装框架版本" + u(z.value) + "不完全兼容 ", 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["content"])) : f("", !0)
                              ])
                            ])
                          ], 8, Mn)
                        ];
                      }),
                      _: 1
                    }, 8, ["label"]),
                    c(I, {
                      align: "left",
                      "min-width": "150"
                    }, {
                      header: s(() => [
                        t("div", On, [
                          t("span", Nn, u(o(i)("appIdentification")), 1),
                          c(Q, {
                            class: "box-item",
                            effect: "light",
                            content: o(i)("tipText"),
                            placement: "bottom"
                          }, {
                            default: s(() => [
                              Hn
                            ]),
                            _: 1
                          }, 8, ["content"])
                        ])
                      ]),
                      default: s(({ row: a }) => [
                        t("span", {
                          class: "am-table-key font-500 text-[13px]",
                          title: a.key
                        }, u(a.key), 9, qn)
                      ]),
                      _: 1
                    }),
                    c(I, {
                      label: o(i)("introduction"),
                      align: "left",
                      "min-width": "250"
                    }, {
                      default: s(({ row: a }) => [
                        t("span", zn, u(a.desc), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    c(I, {
                      label: o(i)("type"),
                      align: "left",
                      "min-width": "80"
                    }, {
                      default: s(({ row: a }) => [
                        t("span", Gn, u(a.type === "app" ? o(i)("app") : o(i)("addon")), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    c(I, {
                      label: o(i)("author"),
                      align: "left",
                      "min-width": "80"
                    }, {
                      default: s(({ row: a }) => [
                        t("span", Wn, u(a.author), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    c(I, {
                      label: o(i)("operation"),
                      fixed: "right",
                      align: "right",
                      "min-width": "200"
                    }, {
                      default: s(({ row: a }) => {
                        var A, L;
                        return [
                          h.value == "installed" || h.value == "all" || h.value == "uninstalled" ? (n(), p(F, { key: 0 }, [
                            a.install_info && ((A = Object.keys(a.install_info)) != null && A.length) ? (n(), x(g, {
                              key: 0,
                              class: "!text-[13px]",
                              type: "primary",
                              link: "",
                              onClick: (D) => Ye(a.key)
                            }, {
                              default: s(() => [
                                y(u(o(i)("unload")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])) : f("", !0),
                            a.is_download && (!a.install_info || !Object.keys(a.install_info).length) ? (n(), x(g, {
                              key: 1,
                              class: "!text-[13px]",
                              type: "primary",
                              link: "",
                              onClick: (D) => me(a.key)
                            }, {
                              default: s(() => [
                                y(u(o(i)("install")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])) : f("", !0),
                            a.is_download ? f("", !0) : (n(), x(g, {
                              key: 2,
                              class: "!text-[13px]",
                              loading: j.value == a.key,
                              disabled: j.value != "",
                              type: "primary",
                              link: "",
                              onClick: V((D) => Be(a), ["stop"])
                            }, {
                              default: s(() => [
                                t("span", null, u(o(i)("down")), 1)
                              ]),
                              _: 2
                            }, 1032, ["loading", "disabled", "onClick"]))
                          ], 64)) : (n(), p(F, { key: 1 }, [
                            h.value == "recentlyUpdated" && a.install_info && ((L = Object.keys(a.install_info)) != null && L.length) && a.install_info.version != a.version ? (n(), x(g, {
                              key: 0,
                              class: "!text-[13px]",
                              type: "primary",
                              link: "",
                              onClick: (D) => ge(a)
                            }, {
                              default: s(() => [
                                y(u(o(i)("升级")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])) : f("", !0)
                          ], 64)),
                          at(a) ? (n(), x(g, {
                            key: 2,
                            class: "!text-[13px]",
                            type: "primary",
                            link: "",
                            onClick: V((D) => nt(a), ["stop"])
                          }, {
                            default: s(() => [
                              y(u(o(i)("diffVerify")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : f("", !0),
                          c(g, {
                            class: "!text-[13px]",
                            type: "primary",
                            link: "",
                            onClick: (D) => Ee(a)
                          }, {
                            default: s(() => [
                              y(u(o(i)("detail")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ];
                      }),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])) : f("", !0)
              ]),
              w.value || !m.value[h.value].length ? (n(), p("div", $n, [
                c(Ae, {
                  data: [],
                  size: "large",
                  class: "pt-[5px]"
                }, {
                  default: s(() => [
                    c(I, {
                      label: o(i)("appName"),
                      align: "left",
                      width: "320"
                    }, null, 8, ["label"]),
                    c(I, {
                      align: "left",
                      "min-width": "120"
                    }),
                    c(I, {
                      label: o(i)("introduction"),
                      align: "left",
                      "min-width": "200"
                    }, null, 8, ["label"]),
                    c(I, {
                      label: o(i)("type"),
                      align: "left",
                      "min-width": "100"
                    }, null, 8, ["label"]),
                    c(I, {
                      label: o(i)("author"),
                      align: "left",
                      "min-width": "100"
                    }, null, 8, ["label"]),
                    c(I, {
                      label: o(i)("operation"),
                      fixed: "right",
                      align: "right",
                      width: "150"
                    }, null, 8, ["label"])
                  ]),
                  _: 1
                }),
                w.value ? q((n(), p("div", Kn, null, 512)), [
                  [ct, w.value]
                ]) : f("", !0)
              ])) : f("", !0)
            ])
          ], 4), [
            [ue, M.value == "list"]
          ]),
          M.value == "card" && o(Me) && !w.value && h.value == "installed" && !ee.value ? (n(), x(Ne, {
            key: 0,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              Pn
            ]),
            description: s(() => [
              t("p", Qn, u(o(i)("installed-empty")), 1)
            ]),
            _: 1
          })) : f("", !0),
          M.value == "card" && o(Me) && !w.value && h.value == "uninstalled" && !ee.value ? (n(), x(Ne, {
            key: 1,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              Xn
            ]),
            description: s(() => [
              t("p", Yn, [
                t("span", null, u(o(i)("descriptionLeft")), 1),
                c(Lt, {
                  type: "primary",
                  onClick: Tt,
                  class: "mx-[5px]"
                }, {
                  default: s(() => [
                    y(u(o(i)("link")), 1)
                  ]),
                  _: 1
                }),
                t("span", null, u(o(i)("descriptionRight")), 1)
              ])
            ]),
            _: 1
          })) : f("", !0),
          !m.value.all.length && !w.value && !Ze.value && h.value == "all" && !ee.value ? (n(), p("div", Zn, [
            Jn,
            t("div", es, [
              c(g, {
                class: "w-[154px] !h-[48px] mt-[8px]",
                type: "primary",
                onClick: Ut
              }, {
                default: s(() => [
                  y("授权码认证")
                ]),
                _: 1
              }),
              c(Sl, {
                ref_key: "getAuthCodeDialog",
                ref: wt,
                placement: "bottom",
                width: 478,
                trigger: "click",
                class: "mt-[8px]"
              }, {
                reference: s(() => [
                  c(g, {
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
                  t("div", ts, [
                    ls,
                    t("div", as, [
                      c(g, {
                        class: "w-[182px] !h-[48px]",
                        plain: "",
                        onClick: Ct
                      }, {
                        default: s(() => [
                          y("去应用市场逛逛")
                        ]),
                        _: 1
                      }),
                      c(g, {
                        class: "w-[100px] !h-[48px]",
                        plain: "",
                        onClick: e[9] || (e[9] = (a) => wt.value.hide())
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
          ])) : f("", !0),
          M.value == "card" && o(Me) && !w.value && Ze.value && h.value == "all" && !ee.value ? (n(), x(Ne, {
            key: 3,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              ns
            ]),
            description: s(() => [
              t("p", ss, [
                t("span", null, u(o(i)("buyDescriptionLeft")), 1),
                c(Lt, {
                  type: "primary",
                  onClick: Tt,
                  class: "mx-[5px]"
                }, {
                  default: s(() => [
                    y(u(o(i)("link")), 1)
                  ]),
                  _: 1
                }),
                t("span", null, u(o(i)("descriptionRight")), 1)
              ])
            ]),
            _: 1
          })) : f("", !0),
          M.value == "card" && o(Me) && !w.value && h.value == "recentlyUpdated" ? (n(), x(Ne, {
            key: 4,
            class: "mx-auto overview-empty"
          }, {
            image: s(() => [
              os
            ]),
            description: s(() => [
              t("p", is, u(o(i)("recentlyUpdatedEmpty")), 1)
            ]),
            _: 1
          })) : f("", !0),
          c(Ce, {
            modelValue: je.value,
            "onUpdate:modelValue": e[13] || (e[13] = (a) => je.value = a),
            title: "授权码认证",
            width: "400px"
          }, {
            default: s(() => [
              c(Ll, {
                model: ie,
                "label-width": "0",
                ref_key: "formRef",
                ref: It,
                rules: xl,
                class: "page-form"
              }, {
                default: s(() => [
                  t("div", us, [
                    c(jt, { prop: "auth_code" }, {
                      default: s(() => [
                        c(Ft, {
                          modelValue: ie.auth_code,
                          "onUpdate:modelValue": e[10] || (e[10] = (a) => ie.auth_code = a),
                          modelModifiers: { trim: !0 },
                          placeholder: o(i)("authCodePlaceholder"),
                          class: "input-width",
                          clearable: "",
                          size: "large"
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }),
                    t("div", cs, [
                      c(jt, { prop: "auth_secret" }, {
                        default: s(() => [
                          c(Ft, {
                            modelValue: ie.auth_secret,
                            "onUpdate:modelValue": e[11] || (e[11] = (a) => ie.auth_secret = a),
                            modelModifiers: { trim: !0 },
                            clearable: "",
                            placeholder: o(i)("authSecretPlaceholder"),
                            class: "input-width",
                            size: "large"
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      })
                    ]),
                    t("div", ds, u(o(i)("authInfoTips")), 1),
                    t("div", rs, [
                      c(g, {
                        type: "primary",
                        class: "w-full",
                        size: "large",
                        loading: xe.value,
                        onClick: e[12] || (e[12] = (a) => bl(It.value))
                      }, {
                        default: s(() => [
                          y(u(o(i)("confirm")), 1)
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ]),
                    t("div", ps, [
                      c(g, {
                        type: "primary",
                        link: "",
                        onClick: Ct
                      }, {
                        default: s(() => [
                          y(u(o(i)("notHaveAuth")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["model", "rules"])
            ]),
            _: 1
          }, 8, ["modelValue"]),
          c(Ce, {
            modelValue: $.value,
            "onUpdate:modelValue": e[20] || (e[20] = (a) => $.value = a),
            title: o(i)("addonInstall"),
            width: "850px",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "before-close": kl
          }, {
            default: s(() => [
              B.value != 2 && !P.value ? (n(), x(Fl, {
                key: 0,
                space: 200,
                active: B.value,
                class: "number-of-steps",
                "process-status": "process",
                "align-center": ""
              }, {
                default: s(() => [
                  c(it, {
                    title: o(i)("envCheck"),
                    class: "flex-1"
                  }, null, 8, ["title"]),
                  c(it, {
                    title: o(i)("installProgress"),
                    class: "flex-1"
                  }, null, 8, ["title"]),
                  c(it, {
                    title: o(i)("installComplete"),
                    class: "flex-1"
                  }, null, 8, ["title"])
                ]),
                _: 1
              }, 8, ["active"])) : f("", !0),
              q(t("div", null, [
                t("div", vs, [
                  c(Et, { style: { height: "calc(50vh)", overflow: "auto" } }, {
                    default: s(() => [
                      $.value ? (n(), x(pt, {
                        key: 0,
                        ref_key: "installCheckRef",
                        ref: kt,
                        class: "mt-3",
                        scene: "addon_install",
                        params: { addon: W.value },
                        "show-footer": !1,
                        onDone: ul,
                        onPassed: e[14] || (e[14] = (a) => O.value = !0),
                        onFailed: e[15] || (e[15] = (a) => O.value = !1)
                      }, null, 8, ["params"])) : f("", !0)
                    ]),
                    _: 1
                  })
                ]),
                t("div", _s, [
                  fe.value && !O.value ? (n(), p("span", fs, " 存在未通过的必检项，请处理后再继续 ")) : f("", !0),
                  fe.value && !O.value ? (n(), x(g, {
                    key: 1,
                    loading: De.value,
                    onClick: cl
                  }, {
                    default: s(() => [
                      y(" 重新校验 ")
                    ]),
                    _: 1
                  }, 8, ["loading"])) : f("", !0),
                  c(g, {
                    type: "primary",
                    class: "!w-[140px]",
                    disabled: !O.value || ye.value,
                    loading: he.value,
                    onClick: _l
                  }, {
                    default: s(() => [
                      y(u(o(i)("install")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"])
                ])
              ], 512), [
                [ue, B.value == 0]
              ]),
              q(t("div", ms, [
                t("div", hs, [
                  t("div", ys, [
                    c(o(Zl), {
                      ref_key: "terminalRef",
                      ref: Y,
                      name: `install-${Zt.value}`,
                      context: W.value,
                      "init-log": null,
                      "show-header": !1,
                      "show-log-time": !0,
                      onExecCmd: dl
                    }, null, 8, ["name", "context"])
                  ]),
                  t("div", ks, [
                    c(g, {
                      type: "primary",
                      loading: !0,
                      class: "!w-[140px]"
                    }, {
                      default: s(() => [
                        y("已用时 " + u(o(xt)), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])
              ], 512), [
                [ue, B.value == 1 && !P.value]
              ]),
              q(t("div", gs, [
                c(Ot, {
                  icon: "success",
                  title: o(i)("addonInstallSuccess")
                }, {
                  icon: s(() => [
                    xs
                  ]),
                  extra: s(() => [
                    (n(!0), p(F, null, He(Re.value, (a, A) => (n(), p("div", {
                      class: "mb-[10px]",
                      key: A
                    }, [
                      t("div", bs, u(a), 1)
                    ]))), 128)),
                    se.value > 0 ? (n(), p("div", As, "本次安装用时" + u(o(xt)), 1)) : f("", !0),
                    t("div", Cs, [
                      oe.value == "cloud" ? (n(), x(g, {
                        key: 0,
                        onClick: e[16] || (e[16] = (a) => gt()),
                        class: "!w-[90px]"
                      }, {
                        default: s(() => [
                          y("返回")
                        ]),
                        _: 1
                      })) : f("", !0),
                      c(g, {
                        onClick: e[17] || (e[17] = (a) => $.value = !1),
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
                [ue, B.value == 2]
              ]),
              q(t("div", ws, [
                c(Ot, {
                  icon: "error",
                  title: o(i)("安装失败")
                }, {
                  icon: s(() => [
                    Us
                  ]),
                  extra: s(() => [
                    c(Et, { class: "max-h-[120px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]" }, {
                      default: s(() => [
                        y(u(At.value), 1)
                      ]),
                      _: 1
                    }),
                    oe.value == "cloud" ? (n(), x(g, {
                      key: 0,
                      onClick: e[18] || (e[18] = (a) => gt()),
                      class: "!w-[90px]"
                    }, {
                      default: s(() => [
                        y("错误信息")
                      ]),
                      _: 1
                    })) : f("", !0),
                    c(g, {
                      onClick: e[19] || (e[19] = (a) => $.value = !1),
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
                [ue, P.value]
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          c(Ce, {
            modelValue: ke.value,
            "onUpdate:modelValue": e[21] || (e[21] = (a) => ke.value = a),
            title: o(i)("addonUninstall"),
            width: "850px",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1
          }, {
            default: s(() => [
              t("div", Is, [
                ke.value ? (n(), x(pt, {
                  key: 0,
                  scene: "addon_uninstall",
                  params: { addon: Xe.value },
                  "auto-next": !0,
                  "show-prev": !1,
                  "next-text": o(i)("confirm"),
                  onNext: hl
                }, null, 8, ["params", "next-text"])) : f("", !0)
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          c(Ce, {
            modelValue: re.value,
            "onUpdate:modelValue": e[23] || (e[23] = (a) => re.value = a),
            title: "下载提示",
            width: "30%"
          }, {
            footer: s(() => [
              t("span", Rs, [
                c(g, {
                  onClick: e[22] || (e[22] = (a) => re.value = !1)
                }, {
                  default: s(() => [
                    y("取消")
                  ]),
                  _: 1
                }),
                c(g, {
                  type: "primary",
                  onClick: nl
                }, {
                  default: s(() => [
                    y("确定")
                  ]),
                  _: 1
                })
              ])
            ]),
            default: s(() => [
              Ts
            ]),
            _: 1
          }, 8, ["modelValue"]),
          c(Nl, {
            modelValue: ae.value,
            "onUpdate:modelValue": e[34] || (e[34] = (a) => ae.value = a),
            class: "am-drawer",
            direction: "rtl",
            size: "560px",
            "with-header": !1,
            onClosed: Dl
          }, {
            default: s(() => {
              var a, A, L, D, we, Ue, Ie, N, Nt, Ht, qt, zt;
              return [
                d.value ? (n(), p("div", Vs, [
                  t("div", Bs, [
                    t("div", Ms, [
                      t("span", Ds, [
                        c(S, {
                          class: "am-detail__logo",
                          src: o(qe)(o(Il)),
                          fit: "cover"
                        }, {
                          error: s(() => [
                            Ss
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ]),
                      t("div", Ls, [
                        t("h2", {
                          class: "am-detail__title",
                          title: ((a = d.value) == null ? void 0 : a.title) || "-"
                        }, u(((A = d.value) == null ? void 0 : A.title) || "-"), 9, Fs),
                        t("p", {
                          class: "am-detail__key",
                          title: ((L = d.value) == null ? void 0 : L.key) || ""
                        }, u(((D = d.value) == null ? void 0 : D.key) || "-"), 9, js),
                        t("div", Es, [
                          t("span", Os, u(((we = d.value) == null ? void 0 : we.type) == "app" ? "应用" : "插件"), 1),
                          o(Tl) ? (n(), p("span", Ns, [
                            Hs,
                            y("已安装")
                          ])) : (n(), p("span", qs, "未安装")),
                          o(Bt) ? (n(), p("span", zs, "可升级")) : f("", !0)
                        ])
                      ])
                    ]),
                    t("button", {
                      type: "button",
                      class: "am-detail__close",
                      "aria-label": "关闭",
                      onClick: Dt
                    }, [
                      c(ut, null, {
                        default: s(() => [
                          c(jl)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t("div", Gs, [
                    (Ue = d.value) != null && Ue.desc ? (n(), p("p", Ws, u(d.value.desc), 1)) : f("", !0),
                    t("div", $s, [
                      Ks,
                      t("dl", Ps, [
                        (Ie = d.value) != null && Ie.type ? (n(), p("div", Qs, [
                          Xs,
                          t("dd", null, u(d.value.type == "app" ? "应用" : "插件"), 1)
                        ])) : f("", !0),
                        (N = d.value) != null && N.key ? (n(), p("div", Ys, [
                          Zs,
                          t("dd", {
                            title: d.value.key
                          }, u(d.value.key), 9, Js)
                        ])) : f("", !0),
                        t("div", null, [
                          eo,
                          t("dd", null, u(o(Rl)), 1)
                        ])
                      ])
                    ]),
                    t("div", to, [
                      lo,
                      t("dl", ao, [
                        t("div", null, [
                          no,
                          t("dd", null, [
                            t("span", null, u(d.value.expire_time || "--"), 1),
                            d.value.app_id ? (n(), p("span", {
                              key: 0,
                              class: "am-kv__link",
                              onClick: e[24] || (e[24] = (R) => ot("pc"))
                            }, "续费应用")) : f("", !0)
                          ])
                        ])
                      ])
                    ]),
                    (Nt = d.value) != null && Nt.author || (Ht = d.value) != null && Ht.author_phone ? (n(), p("div", so, [
                      oo,
                      t("dl", io, [
                        (qt = d.value) != null && qt.author ? (n(), p("div", uo, [
                          co,
                          t("dd", {
                            title: d.value.author
                          }, u(d.value.author), 9, ro)
                        ])) : f("", !0),
                        (zt = d.value) != null && zt.author_phone ? (n(), p("div", po, [
                          vo,
                          t("dd", null, u(d.value.author_phone), 1)
                        ])) : f("", !0)
                      ])
                    ])) : f("", !0),
                    d.value.key != "niucloud-admin" && d.value.app_id ? (n(), p("div", _o, [
                      fo,
                      t("div", mo, [
                        t("button", {
                          type: "button",
                          class: "am-chip",
                          onClick: e[25] || (e[25] = (R) => ot("pc"))
                        }, [
                          c(ut, null, {
                            default: s(() => [
                              c(El)
                            ]),
                            _: 1
                          }),
                          y(" PC端应用主页 ")
                        ]),
                        t("button", {
                          type: "button",
                          class: "am-chip",
                          onClick: e[26] || (e[26] = (R) => ot("wap"))
                        }, [
                          c(ut, null, {
                            default: s(() => [
                              c(Ol)
                            ]),
                            _: 1
                          }),
                          y(" 移动端应用主页 ")
                        ])
                      ])
                    ])) : f("", !0),
                    t("div", ho, [
                      yo,
                      q((n(), p("div", ko, [
                        be.value.length ? (n(), p("ol", go, [
                          (n(!0), p(F, null, He(be.value, (R, Hl) => (n(), p("li", {
                            key: R.version_no || Hl
                          }, [
                            t("div", xo, [
                              t("span", null, "v" + u(R.version_no), 1),
                              t("span", bo, u(Bl(R.release_time)[0]), 1)
                            ]),
                            R.upgrade_log ? (n(), p("div", {
                              key: 0,
                              class: "am-log__body",
                              innerHTML: R.upgrade_log
                            }, null, 8, Ao)) : f("", !0)
                          ]))), 128))
                        ])) : (n(), p("p", Co, "暂无版本更新信息"))
                      ])), [
                        [ct, et.value]
                      ])
                    ])
                  ]),
                  t("div", wo, [
                    o(Mt) ? (n(), p("button", {
                      key: 0,
                      type: "button",
                      class: "am-btn am-btn--outline",
                      onClick: St
                    }, u(o(i)("diffVerify")), 1)) : at(d.value) ? (n(), p("button", {
                      key: 1,
                      type: "button",
                      class: "am-btn am-btn--outline",
                      onClick: e[27] || (e[27] = (R) => nt(d.value))
                    }, u(o(i)("diffVerify")), 1)) : f("", !0),
                    o(Mt) ? o(Bt) ? (n(), p("button", {
                      key: 3,
                      type: "button",
                      class: "am-btn am-btn--primary",
                      onClick: e[31] || (e[31] = V((R) => ge(d.value), ["stop"]))
                    }, " 升级 ")) : f("", !0) : (n(), p(F, { key: 2 }, [
                      d.value.is_download ? !d.value.install_info || Object.keys(d.value.install_info).length == 0 ? (n(), p("button", {
                        key: 1,
                        type: "button",
                        class: "am-btn am-btn--primary",
                        onClick: e[29] || (e[29] = V((R) => me(d.value.key), ["stop"]))
                      }, " 安装 ")) : d.value.install_info.version != d.value.version ? (n(), p("button", {
                        key: 2,
                        type: "button",
                        class: "am-btn am-btn--primary",
                        onClick: e[30] || (e[30] = V((R) => ge(d.value), ["stop"]))
                      }, " 升级 ")) : f("", !0) : (n(), p("button", {
                        key: 0,
                        type: "button",
                        class: "am-btn am-btn--primary",
                        disabled: j.value != "",
                        onClick: e[28] || (e[28] = V((R) => Be(d.value), ["stop"]))
                      }, u(j.value == d.value.key ? "安装中…" : "安装"), 9, Uo))
                    ], 64)),
                    Io,
                    d.value.key != "niucloud-admin" && d.value.is_download && (!d.value.install_info || !Object.keys(d.value.install_info).length) ? (n(), p("button", {
                      key: 4,
                      type: "button",
                      class: "am-btn am-btn--danger",
                      onClick: e[32] || (e[32] = (R) => Al(d.value.key))
                    }, " 删除 ")) : d.value.key != "niucloud-admin" && d.value.is_download && d.value.install_info && Object.keys(d.value.install_info).length ? (n(), p("button", {
                      key: 5,
                      type: "button",
                      class: "am-btn am-btn--danger",
                      onClick: e[33] || (e[33] = (R) => Ye(d.value.key))
                    }, " 卸载 ")) : f("", !0)
                  ])
                ])) : f("", !0)
              ];
            }),
            _: 1
          }, 8, ["modelValue"])
        ])), [
          [ct, w.value]
        ]),
        c(ga, {
          show: Oe.value,
          "onUpdate:show": e[35] || (e[35] = (a) => Oe.value = a),
          target: tt.value,
          icon: lt.value
        }, null, 8, ["show", "target", "icon"]),
        c(ka, {
          upgradeKey: l.upgradeKey,
          ref_key: "upgradeLogRef",
          ref: el
        }, null, 8, ["upgradeKey"]),
        c(ya, {
          ref_key: "upgradeRef",
          ref: mt,
          onComplete: tl,
          onCloudbuild: yl
        }, null, 512),
        c(Ce, {
          modelValue: Ge.value,
          "onUpdate:modelValue": e[36] || (e[36] = (a) => Ge.value = a),
          title: "编译环境校验",
          width: "580px",
          "destroy-on-close": !0,
          "append-to-body": ""
        }, {
          default: s(() => [
            c(pt, {
              scene: "cloud_build",
              "show-footer": !1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
const Yo = /* @__PURE__ */ la(To, [["__scopeId", "data-v-f257ac06"]]);
export {
  Yo as default
};
