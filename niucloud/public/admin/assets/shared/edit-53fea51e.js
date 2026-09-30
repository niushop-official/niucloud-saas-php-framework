import { _ as ke } from "./edit-draw-6458797e.js";
import { _ as Ce } from "./edit-friendspay-message-38f3a55e.js";
import { _ as Ve } from "./edit-friendspay-money-001e1945.js";
import { _ as ze } from "./edit-headimg-abc1520c.js";
import { _ as Te } from "./edit-image-7a535bbf.js";
import { _ as Pe } from "./edit-nickname-1b508f1e.js";
import { _ as qe } from "./edit-page-97a25b34.js";
import { _ as Ne } from "./edit-qrcode-201ca305.js";
import { _ as Ie } from "./edit-text-4f52283e.js";
import { _ as Me } from "./preview-draw-2a22e943.js";
import { _ as $e } from "./preview-friendspay-message-b9695914.js";
import { _ as je } from "./preview-friendspay-money-dcd1d8b5.js";
import { _ as Se } from "./preview-headimg-552d4025.js";
import { _ as De } from "./preview-image-5aeba324.js";
import { _ as Ue } from "./preview-nickname-70dc90a1.js";
import { _ as Be } from "./preview-qrcode-5521bafd.js";
import { _ as Ae } from "./preview-text-04f84eec.js";
import { _ as n } from "./_addon-external_empty-b652abd0.js";
import { defineComponent as Le, inject as Ee, ref as y, reactive as te, watch as Oe, resolveComponent as u, openBlock as p, createElementBlock as f, createVNode as i, withCtx as c, createElementVNode as l, unref as o, toDisplayString as h, Fragment as k, renderList as S, createBlock as V, createTextVNode as O, createCommentVNode as I, normalizeStyle as ne, normalizeClass as B, withModifiers as A, resolveDynamicComponent as se, pushScopeId as Fe, popScopeId as He, toRaw as ie } from "vue";
import { dJ as Re, t as r, j as Ke, dK as Je, dL as We, dM as Ze, dN as Ge, a as Xe } from "./core-shared-c6ad4e77.js";
import { ArrowLeft as Ye } from "@element-plus/icons-vue";
import { useRoute as Qe, useRouter as eo } from "vue-router";
import { c as oo } from "./lodash-8c6c2daa.js";
import { ElMessageBox as le } from "element-plus";
import { u as to } from "./poster-22fc17db.js";
import "axios";
import "vue-i18n";
import "pinia";
const ae = (L) => (Fe("data-v-c59917c5"), L = L(), He(), L), no = { class: "main-container flex-1" }, so = { class: "pl-[5px] text-[14px]" }, io = { class: "text-white ml-[10px] mr-[20px] flex items-center" }, lo = /* @__PURE__ */ ae(() => /* @__PURE__ */ l("span", { class: "mr-[5px] text-[rgba(255,255,255,.5)]" }, "｜", -1)), ao = { class: "mr-[5px] text-[14px]" }, ro = { class: "flex items-center" }, co = { class: "text-white mr-[10px] text-base" }, po = { class: "w-[180px]" }, uo = /* @__PURE__ */ ae(() => /* @__PURE__ */ l("div", { class: "flex-1" }, null, -1)), mo = { class: "full-container flex flex-row flex-1 bg-page" }, vo = { class: "component-list w-[290px]" }, _o = { class: "flex flex-row flex-wrap" }, fo = ["title", "onClick"], go = { class: "block text-[12px] truncate" }, wo = { class: "preview-wrap flex-1 relative mt-[20px]" }, ho = { class: "diy-view-wrap w-[360px] shadow-lg mx-auto" }, xo = { class: "content-wrap" }, bo = { class: "title-wrap text-center text-[14px]" }, yo = { class: "preview-block relative max-h-[640px]" }, ko = { class: "quick-action absolute text-center -right-[70px] top-[20px] w-[42px] rounded shadow-md" }, Co = ["id", "onMousedown", "onClick"], Vo = ["onMousedown"], zo = ["onMousedown"], To = ["onMousedown"], Po = ["onMousedown"], qo = { class: "edit-attribute-wrap w-[400px]" }, No = { class: "card-header flex justify-between items-center" }, Io = { class: "title flex-1" }, Mo = { class: "edit-component-wrap" }, $o = { class: "edit-attr-item-wrap" }, jo = { class: "mb-[10px]" }, So = { class: "flex items-center" }, Do = ["onClick"], Uo = ["title"], Bo = { class: "text-sm mt-[10px] leading-[1.4] text-gray-400" }, Ao = { class: "flex items-center" }, Lo = ["onClick"], Eo = ["title"], Oo = { key: 0 }, Fo = ["src"], Ho = /* @__PURE__ */ Le({
  __name: "edit",
  setup(L) {
    Ee("setLayout")("decorate");
    const e = to(), g = Qe(), re = eo();
    g && g.query && (g.query.id = g.query.id || 0, g.query.type = g.query.type || "", g.query.name = g.query.name || "", g.query.back = g.query.back || "/site/poster/list");
    const E = g.query.back, D = y(""), K = y(""), z = y([]), J = te([]), Ko = y(""), W = y(J), ce = (d) => {
    }, de = (d) => {
      let t = {
        transform: "",
        zIndex: "",
        top: "",
        left: "",
        right: "",
        bottom: ""
      };
      switch (t.transform = `rotate(${d.angle}deg)`, t.zIndex = `${d.zIndex}`, d.y) {
        case "top":
          t.top = 0;
          break;
        case "center":
          t.top = "50%", t.transform = t.transform + " translateY(-50%)";
          break;
        case "bottom":
          t.bottom = 0;
          break;
        default:
          t.top = d.y + "px";
      }
      switch (d.x) {
        case "left":
          t.left = 0;
          break;
        case "center":
          t.left = "50%", t.transform = t.transform + " translateX(-50%)";
          break;
        case "right":
          t.right = 0;
          break;
        default:
          t.left = d.x + "px";
      }
      return t;
    }, Z = y([
      {
        name: "左",
        src: "iconzuoduiqi1",
        className: "left"
      },
      {
        name: "中",
        src: "iconshuipingjuzhong1",
        className: "center"
      },
      {
        name: "右",
        src: "iconyouduiqi1",
        className: "right"
      }
    ]), G = y([
      {
        name: "上",
        src: "icondingduiqi1",
        className: "top"
      },
      {
        name: "中",
        src: "iconchuizhijuzhong1",
        className: "center"
      },
      {
        name: "下",
        src: "icondiduiqi1",
        className: "bottom"
      }
    ]), X = (d, t) => {
      e.editComponent[d] = t.className;
    }, pe = y(!0), ue = () => {
      pe.value ? (location.href = `${location.origin}${E}`, re.push(E)) : le.confirm(
        r("leavePageTitleTips"),
        r("leavePageContentTips"),
        {
          confirmButtonText: r("confirm"),
          cancelButtonText: r("cancel"),
          type: "warning",
          autofocus: !1
        }
      ).then(() => {
        location.href = `${location.origin}${E}`;
      }).catch(() => {
      });
    }, Y = /* @__PURE__ */ Object.assign({ "./components/edit-draw.vue": ke, "./components/edit-friendspay-message.vue": Ce, "./components/edit-friendspay-money.vue": Ve, "./components/edit-headimg.vue": ze, "./components/edit-image.vue": Te, "./components/edit-nickname.vue": Pe, "./components/edit-page.vue": qe, "./components/edit-qrcode.vue": Ne, "./components/edit-text.vue": Ie, "./components/preview-draw.vue": Me, "./components/preview-friendspay-message.vue": $e, "./components/preview-friendspay-money.vue": je, "./components/preview-headimg.vue": Se, "./components/preview-image.vue": De, "./components/preview-nickname.vue": Ue, "./components/preview-qrcode.vue": Be, "./components/preview-text.vue": Ae }), Q = /* @__PURE__ */ Object.assign({ "/src/addon/friend_help/views/poster/components/edit-discount-desc.vue": n, "/src/addon/friend_help/views/poster/components/edit-goods-image.vue": n, "/src/addon/friend_help/views/poster/components/edit-goods-name.vue": n, "/src/addon/friend_help/views/poster/components/edit-group-open-num.vue": n, "/src/addon/friend_help/views/poster/components/edit-group-success-num.vue": n, "/src/addon/friend_help/views/poster/components/edit-min-price.vue": n, "/src/addon/friend_help/views/poster/components/edit-original-desc.vue": n, "/src/addon/friend_help/views/poster/components/edit-original-price.vue": n, "/src/addon/friend_help/views/poster/components/edit-price.vue": n, "/src/addon/friend_help/views/poster/components/preview-discount-desc.vue": n, "/src/addon/friend_help/views/poster/components/preview-goods-image.vue": n, "/src/addon/friend_help/views/poster/components/preview-goods-name.vue": n, "/src/addon/friend_help/views/poster/components/preview-group-open-num.vue": n, "/src/addon/friend_help/views/poster/components/preview-group-success-num.vue": n, "/src/addon/friend_help/views/poster/components/preview-min-price.vue": n, "/src/addon/friend_help/views/poster/components/preview-original-desc.vue": n, "/src/addon/friend_help/views/poster/components/preview-original-price.vue": n, "/src/addon/friend_help/views/poster/components/preview-price.vue": n, "/src/addon/home_service/views/poster/components/edit-goods-image.vue": n, "/src/addon/home_service/views/poster/components/edit-goods-market-price.vue": n, "/src/addon/home_service/views/poster/components/edit-goods-name.vue": n, "/src/addon/home_service/views/poster/components/edit-goods-price.vue": n, "/src/addon/home_service/views/poster/components/preview-goods-image.vue": n, "/src/addon/home_service/views/poster/components/preview-goods-market-price.vue": n, "/src/addon/home_service/views/poster/components/preview-goods-name.vue": n, "/src/addon/home_service/views/poster/components/preview-goods-price.vue": n, "/src/addon/o2o/views/poster/components/edit-o2o-goods-image.vue": n, "/src/addon/o2o/views/poster/components/edit-o2o-goods-name.vue": n, "/src/addon/o2o/views/poster/components/edit-o2o-goods-price.vue": n, "/src/addon/o2o/views/poster/components/preview-o2o-goods-image.vue": n, "/src/addon/o2o/views/poster/components/preview-o2o-goods-name.vue": n, "/src/addon/o2o/views/poster/components/preview-o2o-goods-price.vue": n, "/src/addon/pintuan/views/poster/components/edit-goods-image.vue": n, "/src/addon/pintuan/views/poster/components/edit-goods-name.vue": n, "/src/addon/pintuan/views/poster/components/edit-group-open-num.vue": n, "/src/addon/pintuan/views/poster/components/edit-group-success-num.vue": n, "/src/addon/pintuan/views/poster/components/edit-price.vue": n, "/src/addon/pintuan/views/poster/components/preview-goods-image.vue": n, "/src/addon/pintuan/views/poster/components/preview-goods-name.vue": n, "/src/addon/pintuan/views/poster/components/preview-group-open-num.vue": n, "/src/addon/pintuan/views/poster/components/preview-group-success-num.vue": n, "/src/addon/pintuan/views/poster/components/preview-price.vue": n, "/src/addon/seckill/views/poster/components/edit-active-time.vue": n, "/src/addon/seckill/views/poster/components/edit-goods-image.vue": n, "/src/addon/seckill/views/poster/components/edit-goods-name.vue": n, "/src/addon/seckill/views/poster/components/edit-seckill-market-price.vue": n, "/src/addon/seckill/views/poster/components/edit-seckill-price.vue": n, "/src/addon/seckill/views/poster/components/preview-active-time.vue": n, "/src/addon/seckill/views/poster/components/preview-goods-image.vue": n, "/src/addon/seckill/views/poster/components/preview-goods-name.vue": n, "/src/addon/seckill/views/poster/components/preview-seckill-market-price.vue": n, "/src/addon/seckill/views/poster/components/preview-seckill-price.vue": n, "/src/addon/shop/views/poster/components/edit-goods-image.vue": n, "/src/addon/shop/views/poster/components/edit-goods-market-price.vue": n, "/src/addon/shop/views/poster/components/edit-goods-name.vue": n, "/src/addon/shop/views/poster/components/edit-goods-price.vue": n, "/src/addon/shop/views/poster/components/preview-goods-image.vue": n, "/src/addon/shop/views/poster/components/preview-goods-market-price.vue": n, "/src/addon/shop/views/poster/components/preview-goods-name.vue": n, "/src/addon/shop/views/poster/components/preview-goods-price.vue": n, "/src/addon/shop_giftcard/views/poster/components/edit-giftcard-blessing.vue": n, "/src/addon/shop_giftcard/views/poster/components/edit-giftcard-image.vue": n, "/src/addon/shop_giftcard/views/poster/components/edit-giftcard-name.vue": n, "/src/addon/shop_giftcard/views/poster/components/edit-giftcard-validity.vue": n, "/src/addon/shop_giftcard/views/poster/components/preview-giftcard-blessing.vue": n, "/src/addon/shop_giftcard/views/poster/components/preview-giftcard-image.vue": n, "/src/addon/shop_giftcard/views/poster/components/preview-giftcard-name.vue": n, "/src/addon/shop_giftcard/views/poster/components/preview-giftcard-validity.vue": n, "/src/addon/tourism/views/poster/components/edit-tourism-goods-image.vue": n, "/src/addon/tourism/views/poster/components/edit-tourism-goods-name.vue": n, "/src/addon/tourism/views/poster/components/edit-tourism-goods-price.vue": n, "/src/addon/tourism/views/poster/components/preview-tourism-goods-image.vue": n, "/src/addon/tourism/views/poster/components/preview-tourism-goods-name.vue": n, "/src/addon/tourism/views/poster/components/preview-tourism-goods-price.vue": n });
    Q && Object.assign(Y, Q);
    const U = {};
    for (const [d, t] of Object.entries(Y)) {
      const a = d.split("/").pop().split(".")[0];
      U[a] = t.default;
    }
    const M = te([]), me = () => {
      Je({
        addon: e.addon,
        type: e.type
      }).then((d) => {
        d.data && (M.splice(0, M.length, ...d.data), e.id && (D.value = M.findIndex((t) => t.type == e.type)));
      });
    };
    Oe(
      () => D.value,
      (d, t) => {
        K.value = t;
      }
    );
    const ve = (d) => {
      if (e.value.length)
        le.confirm(r("changeTemplatePosterTips"), r("warning"), {
          confirmButtonText: r("confirm"),
          cancelButtonText: r("cancel"),
          type: "warning"
        }).then(() => {
          if (e.changeCurrentIndex(-99), d !== "") {
            let t = M[d].data;
            e.global = t.global, t.value.length && (e.value = t.value);
          } else
            e.init();
        }).catch(() => {
          D.value = K.value;
        });
      else if (d !== "") {
        let t = M[d].data;
        e.global = t.global, t.value.length && (e.value = t.value);
      } else
        e.init();
    };
    Re({
      id: g.query.id,
      type: g.query.type,
      name: g.query.name
    }).then(async (d) => {
      var $;
      const t = d.data;
      if (e.init(), e.id = t.id, e.name = t.name, e.channel = t.channel, e.status = t.status, e.isDefault = t.is_default, e.addon = t.addon, e.type = t.type, e.typeName = t.poster_type.name, t.value) {
        const a = t.value;
        e.global = a.global, a.value.length && (e.value = a.value);
      }
      z.value = t.component;
      for (const a in z.value) {
        J.push(a);
        for (const P in z.value[a].list) {
          const w = oo(z.value[a].list[P]);
          w.id = e.generateRandom(), w.componentName = P, w.componentTitle = w.title, delete w.title, delete w.icon, e.components.push(w);
        }
      }
      if (z.value) {
        const { loadAddonComponent: a, getInstalledAddonKeys: P } = await import("./core-shared-c6ad4e77.js").then((b) => b.jH), w = P();
        for (const b of Object.values(z.value))
          if (b.list)
            for (const x of Object.keys(b.list)) {
              const j = b.list[x], C = (($ = j.value) == null ? void 0 : $.path) || j.path || x;
              U[C] || (U[C] = defineAsyncComponent(
                () => (async () => {
                  for (const q of w) {
                    const N = a(q, "poster/components", C);
                    try {
                      const _ = await N();
                      if (_ != null && _.default)
                        return _.default;
                    } catch {
                    }
                  }
                  throw new Error(`Poster component "${C}" not found in any addon`);
                })()
              ));
            }
      }
      me();
    });
    const T = y(!1), _e = (d) => {
      if (!e.verify() || T.value)
        return;
      T.value = !0, e.value.forEach((a, P, w) => {
        const b = document.getElementById(a.id);
        if (b && (a.width = b.offsetWidth, a.height = b.offsetHeight, a.type == "draw")) {
          let x = [a.x * 1, a.y * 1], j = [(a.x + a.width) * 1, a.y * 1], C = [(a.x + a.width) * 1, (a.y + a.height) * 1], q = [a.x * 1, (a.y + a.height) * 1];
          a.points = [x, j, C, q];
        }
        delete a.verify;
      });
      let t = {
        id: e.id,
        name: e.name,
        type: e.type,
        status: e.status,
        is_default: e.isDefault,
        channel: e.channel,
        addon: e.addon,
        value: JSON.stringify({
          global: ie(e.global),
          value: ie(e.value)
        })
      };
      (e.id ? We : Ze)(t).then((a) => {
        a.code == 1 && (e.id ? T.value = !1 : location.href = `${location.origin}${E}`, d && d(a.data.id));
      }).catch(() => {
        T.value = !1;
      }).finally(() => {
      });
    }, F = y(!1), H = y(""), fe = () => {
      T.value || (T.value = !0, Ge({
        id: e.id,
        type: e.type
      }).then((d) => {
        d.data && (H.value = d.data, F.value = !0), T.value = !1;
      }));
    };
    return (d, t) => {
      const $ = u("el-icon"), a = u("el-option"), P = u("el-select"), w = u("el-button"), b = u("el-header"), x = u("icon"), j = u("el-collapse-item"), C = u("el-collapse"), q = u("el-scrollbar"), N = u("el-tooltip"), _ = u("el-form-item"), R = u("el-slider"), ee = u("el-color-picker"), ge = u("el-switch"), we = u("el-radio"), he = u("el-radio-group"), xe = u("el-form"), be = u("el-card"), ye = u("el-dialog");
      return p(), f("div", no, [
        i(b, { class: "flex items-center h-[60px] bg-primary px-[20px]" }, {
          default: c(() => [
            l("div", {
              class: "text-white cursor-pointer flex items-center",
              onClick: ue
            }, [
              i($, { size: "14" }, {
                default: c(() => [
                  i(o(Ye))
                ]),
                _: 1
              }),
              l("span", so, h(o(r)("back")), 1)
            ]),
            l("div", io, [
              lo,
              l("span", ao, h(o(r)("decorating")) + "：" + h(o(e).typeName), 1)
            ]),
            l("div", ro, [
              l("span", co, h(o(r)("templatePosterPlaceholder")), 1),
              l("div", po, [
                i(P, {
                  size: "small",
                  modelValue: D.value,
                  "onUpdate:modelValue": t[0] || (t[0] = (s) => D.value = s),
                  placeholder: o(r)("templatePosterPlaceholder"),
                  onChange: ve
                }, {
                  default: c(() => [
                    i(a, {
                      label: o(r)("templatePosterEmpty"),
                      value: ""
                    }, null, 8, ["label"]),
                    (p(!0), f(k, null, S(M, (s, v) => (p(), V(a, {
                      label: s.name,
                      value: v,
                      key: v
                    }, null, 8, ["label", "value"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "placeholder"])
              ])
            ]),
            uo,
            o(e).id ? (p(), V(w, {
              key: 0,
              onClick: t[1] || (t[1] = (s) => fe())
            }, {
              default: c(() => [
                O(h(o(r)("preview")), 1)
              ]),
              _: 1
            })) : I("", !0),
            i(w, {
              onClick: t[2] || (t[2] = (s) => _e())
            }, {
              default: c(() => [
                O(h(o(r)("save")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        l("div", mo, [
          l("div", vo, [
            i(q, { class: "px-[10px]" }, {
              default: c(() => [
                i(C, {
                  modelValue: W.value,
                  "onUpdate:modelValue": t[3] || (t[3] = (s) => W.value = s),
                  onChange: ce
                }, {
                  default: c(() => [
                    (p(!0), f(k, null, S(z.value, (s, v) => (p(), V(j, {
                      key: v,
                      title: s.title,
                      name: v
                    }, {
                      default: c(() => [
                        l("ul", _o, [
                          (p(!0), f(k, null, S(s.list, (m, oe) => (p(), f("li", {
                            key: oe,
                            class: "w-2/6 text-center cursor-pointer h-[65px]",
                            title: m.title,
                            onClick: (Jo) => o(e).addComponent(oe, m)
                          }, [
                            m.icon ? (p(), V(x, {
                              key: 0,
                              name: m.icon,
                              size: "20px",
                              class: "inline-block mt-[3px]"
                            }, null, 8, ["name"])) : (p(), V(x, {
                              key: 1,
                              name: "iconfont iconkaifazujian",
                              size: "20px",
                              class: "inline-block mt-[3px]"
                            })),
                            l("span", go, h(m.title), 1)
                          ], 8, fo))), 128))
                        ])
                      ]),
                      _: 2
                    }, 1032, ["title", "name"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          l("div", wo, [
            i(q, null, {
              default: c(() => [
                i(w, {
                  class: "page-btn absolute right-[20px]",
                  onClick: t[4] || (t[4] = (s) => o(e).changeCurrentIndex(-99))
                }, {
                  default: c(() => [
                    O(h(o(r)("posterSet")), 1)
                  ]),
                  _: 1
                }),
                l("div", ho, [
                  l("div", {
                    class: "preview-head bg-no-repeat bg-center bg-cover cursor-pointer h-[64px]",
                    onClick: t[5] || (t[5] = (s) => o(e).changeCurrentIndex(-99))
                  }, [
                    l("div", xo, [
                      l("div", bo, h(o(e).name), 1)
                    ])
                  ]),
                  l("div", yo, [
                    l("ul", ko, [
                      i(N, {
                        effect: "light",
                        content: o(r)("moveUpComponentZIndex"),
                        placement: "right"
                      }, {
                        default: c(() => [
                          i(x, {
                            name: "iconfont iconjiantoushang",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).moveUpComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(N, {
                        effect: "light",
                        content: o(r)("moveDownComponentZIndex"),
                        placement: "right"
                      }, {
                        default: c(() => [
                          i(x, {
                            name: "iconfont iconjiantouxia",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).moveDownComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(N, {
                        effect: "light",
                        content: o(r)("copyComponent"),
                        placement: "right"
                      }, {
                        default: c(() => [
                          i(x, {
                            name: "iconfont iconcopy-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).copyComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(N, {
                        effect: "light",
                        content: o(r)("delComponent"),
                        placement: "right"
                      }, {
                        default: c(() => [
                          i(x, {
                            name: "iconfont icondelete-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).delComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(N, {
                        effect: "light",
                        content: o(r)("resetComponent"),
                        placement: "right"
                      }, {
                        default: c(() => [
                          i(x, {
                            name: "iconfont iconloader-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).resetComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"])
                    ]),
                    l("div", {
                      class: "preview-iframe",
                      style: ne(o(e).getGlobalStyle()),
                      onClick: t[6] || (t[6] = (s) => o(e).changeCurrentIndex(-99))
                    }, [
                      (p(!0), f(k, null, S(o(e).value, (s, v) => (p(), f("div", {
                        class: B(["item-wrap area-box select-none max-w-[720px] cursor-move", { selected: o(e).currentIndex == v }]),
                        id: s.id,
                        key: s.id,
                        style: ne(de(s)),
                        onMousedown: (m) => o(e).mouseDown(m, s.id, v),
                        onClick: A((m) => o(e).changeCurrentIndex(v, s), ["stop"])
                      }, [
                        (p(), V(se(U["preview-" + s.path]), { value: s }, null, 8, ["value"])),
                        l("span", {
                          class: "box1",
                          onMousedown: A((m) => o(e).resizeMouseDown(m, s, v), ["stop"])
                        }, null, 40, Vo),
                        l("span", {
                          class: "box2",
                          onMousedown: A((m) => o(e).resizeMouseDown(m, s, v), ["stop"])
                        }, null, 40, zo),
                        l("span", {
                          class: "box3",
                          onMousedown: A((m) => o(e).resizeMouseDown(m, s, v), ["stop"])
                        }, null, 40, To),
                        l("span", {
                          class: "box4",
                          onMousedown: A((m) => o(e).resizeMouseDown(m, s, v), ["stop"])
                        }, null, 40, Po)
                      ], 46, Co))), 128))
                    ], 4)
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          l("div", qo, [
            i(q, null, {
              default: c(() => [
                i(be, {
                  class: "box-card",
                  shadow: "never"
                }, {
                  header: c(() => {
                    var s;
                    return [
                      l("div", No, [
                        l("span", Io, h(o(e).currentIndex == -99 ? o(r)("posterSet") : (s = o(e).editComponent) == null ? void 0 : s.componentTitle), 1)
                      ])
                    ];
                  }),
                  default: c(() => [
                    l("div", Mo, [
                      o(e).currentComponent ? (p(), V(se(U[o(e).currentComponent]), {
                        key: 0,
                        value: o(e).value[o(e).currentIndex]
                      }, {
                        common: c(() => [
                          l("div", $o, [
                            l("h3", jo, h(o(r)("componentStyleTitle")), 1),
                            i(xe, {
                              "label-width": "100px",
                              class: "px-[10px]"
                            }, {
                              default: c(() => [
                                i(_, {
                                  label: o(r)("zIndex")
                                }, {
                                  default: c(() => [
                                    l("span", null, h(o(e).editComponent.zIndex), 1)
                                  ]),
                                  _: 1
                                }, 8, ["label"]),
                                o(e).editComponent.type == "text" ? (p(), f(k, { key: 0 }, [
                                  i(_, {
                                    label: o(r)("textFontSize")
                                  }, {
                                    default: c(() => [
                                      i(R, {
                                        modelValue: o(e).editComponent.fontSize,
                                        "onUpdate:modelValue": t[7] || (t[7] = (s) => o(e).editComponent.fontSize = s),
                                        "show-input": "",
                                        size: "small",
                                        class: "ml-[10px]",
                                        min: 14,
                                        max: 100
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  i(_, {
                                    label: o(r)("textColor")
                                  }, {
                                    default: c(() => [
                                      i(ee, {
                                        modelValue: o(e).editComponent.fontColor,
                                        "onUpdate:modelValue": t[8] || (t[8] = (s) => o(e).editComponent.fontColor = s)
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  i(_, {
                                    label: o(r)("weight")
                                  }, {
                                    default: c(() => [
                                      i(ge, {
                                        modelValue: o(e).editComponent.weight,
                                        "onUpdate:modelValue": t[9] || (t[9] = (s) => o(e).editComponent.weight = s)
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  i(_, {
                                    label: o(r)("lineHeight")
                                  }, {
                                    default: c(() => [
                                      i(R, {
                                        modelValue: o(e).editComponent.lineHeight,
                                        "onUpdate:modelValue": t[10] || (t[10] = (s) => o(e).editComponent.lineHeight = s),
                                        "show-input": "",
                                        size: "small",
                                        class: "ml-[10px]",
                                        min: 0,
                                        max: 50
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"])
                                ], 64)) : I("", !0),
                                o(e).editComponent.type == "image" ? (p(), V(_, {
                                  key: 1,
                                  label: o(r)("width")
                                }, {
                                  default: c(() => [
                                    i(R, {
                                      modelValue: o(e).editComponent.width,
                                      "onUpdate:modelValue": t[11] || (t[11] = (s) => o(e).editComponent.width = s),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px]",
                                      min: 30,
                                      max: o(e).getMaxWidth()
                                    }, null, 8, ["modelValue", "max"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : I("", !0),
                                o(e).editComponent.type == "draw" ? (p(), f(k, { key: 2 }, [
                                  i(_, {
                                    label: o(r)("drawType")
                                  }, {
                                    default: c(() => [
                                      i(he, {
                                        modelValue: o(e).editComponent.drawType,
                                        "onUpdate:modelValue": t[12] || (t[12] = (s) => o(e).editComponent.drawType = s)
                                      }, {
                                        default: c(() => [
                                          i(we, { label: "Polygon" }, {
                                            default: c(() => [
                                              O(h(o(r)("polygon")), 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  i(_, {
                                    label: o(r)("bgColor")
                                  }, {
                                    default: c(() => [
                                      i(ee, {
                                        modelValue: o(e).editComponent.bgColor,
                                        "onUpdate:modelValue": t[13] || (t[13] = (s) => o(e).editComponent.bgColor = s)
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"])
                                ], 64)) : I("", !0),
                                o(e).editComponent.type != "draw" && o(e).editComponent.type != "image" && o(e).editComponent.type != "qrcode" ? (p(), f(k, { key: 3 }, [
                                  i(_, {
                                    label: o(r)("horizontalAlignment")
                                  }, {
                                    default: c(() => [
                                      l("ul", So, [
                                        (p(!0), f(k, null, S(Z.value, (s, v) => (p(), f("li", {
                                          class: B(["w-[50px] h-[32px] flex items-center justify-center border-solid  border-[1px] border-[#eee] cursor-pointer", { "border-r-transparent": Z.value.length != v + 1 }, s.className == o(e).editComponent.x ? "!border-[var(--el-color-primary)]" : ""]),
                                          onClick: (m) => X("x", s)
                                        }, [
                                          l("span", {
                                            class: B(["iconfont !text-[20px]", s.src]),
                                            title: s.name
                                          }, null, 10, Uo)
                                        ], 10, Do))), 256))
                                      ]),
                                      l("div", Bo, h(o(r)("AlignTips")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  i(_, {
                                    label: o(r)("verticalAlignment")
                                  }, {
                                    default: c(() => [
                                      l("ul", Ao, [
                                        (p(!0), f(k, null, S(G.value, (s, v) => (p(), f("li", {
                                          class: B(["w-[50px] h-[32px] flex items-center justify-center border-solid  border-[1px] border-[#eee] cursor-pointer", { "border-r-transparent": G.value.length != v + 1 }, s.className == o(e).editComponent.y ? "!border-[var(--el-color-primary)]" : ""]),
                                          onClick: (m) => X("y", s)
                                        }, [
                                          l("span", {
                                            class: B(["iconfont !text-[20px]", s.src]),
                                            title: s.name
                                          }, null, 10, Eo)
                                        ], 10, Lo))), 256))
                                      ])
                                    ]),
                                    _: 1
                                  }, 8, ["label"])
                                ], 64)) : I("", !0)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["value"])) : I("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ]),
        i(ye, {
          modelValue: F.value,
          "onUpdate:modelValue": t[14] || (t[14] = (s) => F.value = s),
          title: o(r)("previewDialogTitle"),
          width: "400px",
          height: "640px"
        }, {
          default: c(() => [
            H.value ? (p(), f("div", Oo, [
              l("img", {
                src: o(Ke)(H.value),
                class: "w-[360px] h-[640px]"
              }, null, 8, Fo)
            ])) : I("", !0)
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const yt = /* @__PURE__ */ Xe(Ho, [["__scopeId", "data-v-c59917c5"]]);
export {
  yt as default
};
