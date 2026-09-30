import { a as Ne } from "./add-theme-d01c987c.js";
import { _ as qe } from "./edit-active-cube-887cb245.js";
import { _ as Pe } from "./edit-carousel-search-d67efa33.js";
import { _ as Ie } from "./edit-float-btn-customer-6333a378.js";
import { _ as $e } from "./edit-float-btn-fcd94ed4.js";
import { _ as Ae } from "./edit-graphic-nav-dcabcdbd.js";
import { _ as Re } from "./edit-horz-blank-157b14ff.js";
import { _ as je } from "./edit-horz-line-e2658c6b.js";
import { _ as Ee } from "./edit-hot-area-3a80f368.js";
import { _ as Le } from "./edit-image-ads-08e77e6a.js";
import { _ as Me } from "./edit-member-info-af86586f.js";
import { _ as Je } from "./edit-member-level-d2905609.js";
import { _ as Ge } from "./edit-notice-512ed91e.js";
import { _ as Fe } from "./edit-page-56ab3e75.js";
import { _ as Ke } from "./edit-picture-show-05367bf8.js";
import { _ as We } from "./edit-rich-text-f519a3be.js";
import { _ as Ye } from "./edit-rubik-cube-687fb031.js";
import { _ as He } from "./edit-text-b8b9c211.js";
import { a as Qe } from "./edit-theme-c45d1a46.js";
import { _ as Xe } from "./tabbar-select-popup-e476ba8e.js";
import { _ as Ze } from "./theme-list-9833e5dc.js";
import "./_addon-external_empty-b652abd0.js";
import { defineComponent as eo, inject as oo, ref as b, reactive as Z, toRaw as T, watch as ve, defineAsyncComponent as to, resolveComponent as u, openBlock as _, createElementBlock as y, createVNode as i, withCtx as a, createElementVNode as s, unref as o, toDisplayString as r, Fragment as W, renderList as ee, createBlock as f, createCommentVNode as p, createTextVNode as S, normalizeClass as oe, normalizeStyle as U, withDirectives as ge, vShow as be, resolveDynamicComponent as io, pushScopeId as no, popScopeId as lo } from "vue";
import { bm as so, t as n, j as fe, bn as ao, m as _o, bo as ro, bp as co, a as po } from "./core-shared-c6ad4e77.js";
import { ArrowLeft as mo } from "@element-plus/icons-vue";
import { useRoute as uo, useRouter as vo } from "vue-router";
import { c as te } from "./lodash-8c6c2daa.js";
import { ElMessageBox as ye, ElMessage as go } from "element-plus";
import { u as bo } from "./diy-452683aa.js";
import "axios";
import "vue-i18n";
import "pinia";
const ie = (A) => (no("data-v-8da4545e"), A = A(), lo(), A), fo = { class: "main-container flex-1" }, yo = { class: "pl-[5px] text-[14px]" }, ho = { class: "text-white ml-[10px] mr-[20px] flex items-center" }, wo = /* @__PURE__ */ ie(() => /* @__PURE__ */ s("span", { class: "mr-[5px] text-[rgba(255,255,255,.5)]" }, "｜", -1)), xo = { class: "mr-[5px] text-[14px]" }, Co = {
  key: 0,
  class: "flex items-center"
}, ko = { class: "text-white mr-[10px] text-base" }, So = { class: "w-[180px]" }, Bo = /* @__PURE__ */ ie(() => /* @__PURE__ */ s("div", { class: "flex-1" }, null, -1)), Vo = { class: "full-container flex flex-row flex-1 bg-page" }, To = { class: "component-list w-[290px]" }, Do = { class: "flex flex-row flex-wrap" }, Uo = ["title", "onClick"], Oo = { class: "block text-[12px] truncate" }, zo = { class: "preview-wrap flex-1 relative mt-[20px]" }, No = { class: "diy-view-wrap w-[375px] shadow-lg mx-auto" }, qo = {
  key: 0,
  class: "content-wrap"
}, Po = {
  key: 1,
  class: "content-wrap"
}, Io = {
  key: 0,
  class: "h-[28px] max-w-[150px] mr-[8px]"
}, $o = ["src"], Ao = {
  key: 2,
  class: "content-wrap"
}, Ro = {
  key: 0,
  class: "title-wrap"
}, jo = ["src"], Eo = { class: "search" }, Lo = /* @__PURE__ */ ie(() => /* @__PURE__ */ s("span", { class: "nc-iconfont nc-icon-sousuo-duanV6xx1 !text-[12px] absolute left-[10px]" }, null, -1)), Mo = { class: "text-[12px]" }, Jo = {
  key: 3,
  class: "content-wrap"
}, Go = { class: "preview-block relative" }, Fo = { class: "quick-action absolute text-center -right-[70px] top-[20px] w-[42px] rounded shadow-md" }, Ko = ["src"], Wo = { class: "preview-iframe w-[375px] pt-[20px] px-[20px]" }, Yo = { class: "font-bold text-xl mb-[40px]" }, Ho = { class: "mb-[20px] flex flex-col" }, Qo = { class: "mb-[10px]" }, Xo = { class: "edit-attribute-wrap w-[400px]" }, Zo = { class: "card-header flex justify-between items-center" }, et = { class: "title flex-1" }, ot = {
  key: 0,
  class: "tab-wrap flex rounded-[50px] bg-gray-100 text-[14px]"
}, tt = { class: "edit-component-wrap" }, it = { class: "edit-attr-item-wrap" }, nt = { class: "mb-[10px]" }, lt = { class: "text-sm text-gray-400 ml-[90px] mb-[10px]" }, st = /* @__PURE__ */ eo({
  __name: "edit",
  setup(A) {
    oo("setLayout")("decorate");
    const e = bo(), c = uo(), ne = vo();
    c.query.id = c.query.id || 0, c.query.name = c.query.name || "", c.query.url = c.query.url || "", c.query.type = c.query.type || "", c.query.title = c.query.title || "", c.query.back = c.query.back || "/site/diy/list";
    const R = c.query.back, O = b(""), le = b(""), j = b(""), q = b(""), Y = b(""), E = b(!1), L = b(!1), se = b(0), ae = b(0), B = b([]), de = Z([]), H = b(""), _e = b(de), he = (d) => {
    }, z = Z({
      id: e.id,
      name: e.name,
      pageTitle: e.pageTitle,
      title: e.global.title,
      value: JSON.stringify({
        global: T(e.global),
        value: T(e.value)
      })
    }), Q = b(!0), we = () => {
      Q.value ? (location.href = `${location.origin}${R}`, ne.push(R)) : ye.confirm(
        n("leavePageTitleTips"),
        n("leavePageContentTips"),
        {
          confirmButtonText: n("confirm"),
          cancelButtonText: n("cancel"),
          type: "warning",
          autofocus: !1
        }
      ).then(() => {
        location.href = `${location.origin}${R}`;
      }).catch(() => {
      });
    }, xe = /* @__PURE__ */ Object.assign({ "./components/add-theme.vue": Ne, "./components/edit-active-cube.vue": qe, "./components/edit-carousel-search.vue": Pe, "./components/edit-float-btn-customer.vue": Ie, "./components/edit-float-btn.vue": $e, "./components/edit-graphic-nav.vue": Ae, "./components/edit-horz-blank.vue": Re, "./components/edit-horz-line.vue": je, "./components/edit-hot-area.vue": Ee, "./components/edit-image-ads.vue": Le, "./components/edit-member-info.vue": Me, "./components/edit-member-level.vue": Je, "./components/edit-notice.vue": Ge, "./components/edit-page.vue": Fe, "./components/edit-picture-show.vue": Ke, "./components/edit-rich-text.vue": We, "./components/edit-rubik-cube.vue": Ye, "./components/edit-text.vue": He, "./components/edit-theme.vue": Qe, "./components/tabbar-select-popup.vue": Xe, "./components/theme-list.vue": Ze }), M = {};
    for (const [d, t] of Object.entries(xe)) {
      const C = d.split("/").pop().split(".")[0];
      M[C] = t.default;
    }
    const J = Z({}), Ce = (d) => {
      ao({
        type: d,
        mode: "diy"
      }).then((t) => {
        for (const h in t.data)
          J[h] = t.data[h];
      });
    };
    ve(
      () => O.value,
      (d, t) => {
        le.value = t;
      }
    );
    const ke = (d) => {
      if (e.value.length)
        ye.confirm(n("changeTemplatePageTips"), n("warning"), {
          confirmButtonText: n("confirm"),
          cancelButtonText: n("cancel"),
          type: "warning"
        }).then(() => {
          if (e.changeCurrentIndex(-99), e.init(), d) {
            let t = te(J[d].data);
            e.global = t.global, t.value.length && (e.value = t.value);
          } else
            c.query.title && (e.global.title = e.typeName);
        }).catch(() => {
          O.value = le.value;
        });
      else if (e.init(), d) {
        let t = te(J[d].data);
        e.global = t.global, t.value.length && (e.value = t.value);
      } else
        c.query.title && (e.global.title = e.typeName);
    };
    ve(
      () => e,
      (d, t) => {
        const h = {
          id: d.id,
          name: d.name,
          pageTitle: d.pageTitle,
          title: d.global.title,
          value: JSON.stringify({
            global: T(d.global),
            value: T(d.value)
          })
        };
        e.postMessage(), Q.value = JSON.stringify(h) == JSON.stringify(z);
      },
      { deep: !0 }
    ), so({
      id: c.query.id,
      name: c.query.name,
      url: c.query.url,
      type: c.query.type,
      title: c.query.title
    }).then(async (d) => {
      var C;
      const t = d.data;
      if (e.init(), e.id = t.id || 0, e.name = t.name, e.pageTitle = t.page_title, e.type = t.type, e.typeName = t.type_name, e.templateName = t.template, O.value = t.template, e.isDefault = t.is_default, e.pageMode = t.mode, t.global)
        for (const m in t.global)
          if (t.global[m])
            for (const w in t.global[m])
              e.global[m][w] = t.global[m][w];
          else
            e.global[m] = t.global[m];
      if (t.value) {
        const m = JSON.parse(t.value);
        e.global = m.global, m.value.length && (e.value = m.value);
      } else
        e.global.title = t.title;
      z.id = e.id, z.name = e.name, z.pageTitle = e.pageTitle, z.title = e.global.title, z.value = JSON.stringify({
        global: T(e.global),
        value: T(e.value)
      }), B.value = t.component;
      for (const m in B.value) {
        de.push(m);
        for (const w in B.value[m].list) {
          const v = te(B.value[m].list[w]);
          v.id = e.generateRandom(), v.componentName = w, v.componentTitle = v.title, Object.assign(v, v.value), delete v.name, delete v.title, delete v.value, delete v.type, delete v.icon, e.components.push(v);
        }
      }
      if (B.value) {
        const { loadAddonComponent: m, getInstalledAddonKeys: w } = await import("./core-shared-c6ad4e77.js").then((g) => g.jH), v = w();
        for (const g of Object.values(B.value))
          if (g.list)
            for (const G of Object.keys(g.list)) {
              const F = g.list[G], V = ((C = F.value) == null ? void 0 : C.path) || F.path || G;
              M[V] || (M[V] = to(
                () => (async () => {
                  for (const D of v) {
                    const X = m(D, "diy/components", V);
                    try {
                      const k = await X();
                      if (k != null && k.default)
                        return k.default;
                    } catch {
                    }
                  }
                  throw new Error(`DIY component "${V}" not found in any addon`);
                })()
              ));
            }
      }
      console.log(B.value), Ce(t.type), q.value = t.domain_url.wap_domain, j.value = t.domain_url.wap_url, H.value = t.page, !0 && ce();
    });
    const re = b(!1);
    window.addEventListener("message", (d) => {
      try {
        let t = {
          type: ""
        };
        if (typeof d.data == "string" ? t = JSON.parse(d.data) : typeof d.data == "object" && (t = d.data), !t.type)
          return;
        switch (t.type) {
          case "appOnLaunch":
          case "appOnReady":
            L.value = !1, E.value = !0;
            let h = new Date().getTime();
            ae.value = h - se.value, re.value = !0;
            break;
          case "init":
            e.load = !0, e.postMessage();
            break;
          case "change":
            e.changeCurrentIndex(t.index, t.component);
            break;
          case "data":
            e.changeCurrentIndex(t.index, t.component), e.global = t.global, e.value = t.value;
            break;
        }
      } catch (t) {
        console.log("diy edit 后台接受数据错误", t);
      }
    }, !1);
    const Se = () => {
      if (q.value.trim().length == 0) {
        go({
          type: "warning",
          message: `${n("wapDomainPlaceholder")}`
        });
        return;
      }
      j.value = q.value + "/wap", ce(), _o.set({ key: "wap_domain", data: j.value }), E.value = !0, L.value = !1;
    }, ce = () => {
      Y.value = `${j.value}${H.value}?mode=decorate`;
      const d = () => {
        se.value = new Date().getTime(), Be();
      };
      d();
      let t = 0, h = setInterval(() => {
        if (re.value || t >= 50) {
          clearInterval(h);
          return;
        }
        d(), t++;
      }, 200);
      setTimeout(() => {
        ae.value == 0 && Ve();
      }, 1e3 * 10);
    }, Be = () => {
      const d = JSON.stringify({
        type: "appOnReady",
        message: "加载完成"
      });
      window.previewIframe && window.previewIframe.contentWindow.postMessage(d, "*");
    }, Ve = () => {
      L.value = !0, E.value = !1, Y.value = "";
    }, P = b(!1), pe = (d) => {
      if (!e.verify() || P.value)
        return;
      P.value = !0, e.templateName = O.value;
      let t = {
        id: e.id,
        name: e.name,
        page_title: e.pageTitle,
        title: e.global.title,
        type: e.type,
        template: e.templateName,
        is_default: e.isDefault,
        is_change: Q.value ? 0 : 1,
        value: JSON.stringify({
          global: T(e.global),
          value: T(e.value)
        })
      };
      (e.id ? ro : co)(t).then((C) => {
        P.value = !1, C.code == 1 && (e.id ? P.value = !1 : location.href = `${location.origin}${R}`, d && d(C.data.id));
      }).catch(() => {
        P.value = !1;
      });
    }, Te = () => {
      pe((d) => {
        d = e.id || d;
        const t = ne.resolve({
          path: "/site/preview/wap",
          query: {
            page: H.value + "?id=" + d
          }
        });
        window.open(t.href);
      });
    }, De = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/dev/pluginDev/configLocalDevEnv.html");
    };
    return (d, t) => {
      const h = u("el-icon"), C = u("el-option"), m = u("el-select"), w = u("el-button"), v = u("el-header"), g = u("icon"), G = u("el-collapse-item"), F = u("el-collapse"), V = u("el-scrollbar"), D = u("el-tooltip"), X = u("el-input"), k = u("el-color-picker"), x = u("el-form-item"), K = u("el-radio"), me = u("el-radio-group"), Ue = u("upload-image"), N = u("el-slider"), Oe = u("el-form"), ze = u("el-card");
      return _(), y("div", fo, [
        i(v, { class: "flex items-center h-[60px] bg-primary px-[20px]" }, {
          default: a(() => [
            s("div", {
              class: "text-white cursor-pointer flex items-center",
              onClick: we
            }, [
              i(h, { size: "14" }, {
                default: a(() => [
                  i(o(mo))
                ]),
                _: 1
              }),
              s("span", yo, r(o(n)("back")), 1)
            ]),
            s("div", ho, [
              wo,
              s("span", xo, r(o(n)("decorating")) + "：" + r(o(e).typeName), 1)
            ]),
            o(e).type && o(e).type != "DIY_PAGE" ? (_(), y("div", Co, [
              s("span", ko, r(o(n)("templatePagePlaceholder")), 1),
              s("div", So, [
                i(m, {
                  size: "small",
                  modelValue: O.value,
                  "onUpdate:modelValue": t[0] || (t[0] = (l) => O.value = l),
                  placeholder: o(n)("templatePagePlaceholder"),
                  onChange: ke
                }, {
                  default: a(() => [
                    i(C, {
                      label: o(n)("templatePageEmpty"),
                      value: ""
                    }, null, 8, ["label"]),
                    (_(!0), y(W, null, ee(J, (l, I) => (_(), f(C, {
                      label: l.title,
                      value: I,
                      key: I
                    }, null, 8, ["label", "value"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "placeholder"])
              ])
            ])) : p("", !0),
            Bo,
            i(w, {
              onClick: t[1] || (t[1] = (l) => Te())
            }, {
              default: a(() => [
                S(r(o(n)("preview")), 1)
              ]),
              _: 1
            }),
            i(w, {
              onClick: t[2] || (t[2] = (l) => pe())
            }, {
              default: a(() => [
                S(r(o(n)("save")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        s("div", Vo, [
          s("div", To, [
            i(V, { class: "px-[10px]" }, {
              default: a(() => [
                i(F, {
                  modelValue: _e.value,
                  "onUpdate:modelValue": t[3] || (t[3] = (l) => _e.value = l),
                  onChange: he
                }, {
                  default: a(() => [
                    (_(!0), y(W, null, ee(B.value, (l, I) => (_(), f(G, {
                      key: I,
                      title: l.title,
                      name: I
                    }, {
                      default: a(() => [
                        s("ul", Do, [
                          (_(!0), y(W, null, ee(l.list, ($, ue) => (_(), y("li", {
                            key: ue,
                            class: "w-2/6 text-center cursor-pointer h-[65px]",
                            title: $.title,
                            onClick: (dt) => o(e).addComponent(ue, $)
                          }, [
                            $.icon ? (_(), f(g, {
                              key: 0,
                              name: $.icon,
                              size: "20px",
                              class: "inline-block mt-[3px]"
                            }, null, 8, ["name"])) : (_(), f(g, {
                              key: 1,
                              name: "iconfont iconkaifazujian",
                              size: "20px",
                              class: "inline-block mt-[3px]"
                            })),
                            s("span", Oo, r($.title), 1)
                          ], 8, Uo))), 128))
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
          s("div", zo, [
            i(V, null, {
              default: a(() => [
                i(w, {
                  class: "page-btn absolute right-[20px]",
                  onClick: t[4] || (t[4] = (l) => o(e).changeCurrentIndex(-99))
                }, {
                  default: a(() => [
                    S(r(o(n)("pageSet")), 1)
                  ]),
                  _: 1
                }),
                s("div", No, [
                  s("div", {
                    class: oe(["preview-head bg-no-repeat bg-center bg-cover cursor-pointer h-[64px]", [o(e).global.topStatusBar.style]]),
                    style: U({ backgroundColor: o(e).global.topStatusBar.bgColor }),
                    onClick: t[5] || (t[5] = (l) => o(e).changeCurrentIndex(-99))
                  }, [
                    o(e).global.topStatusBar.style == "style-1" && o(e).global.topStatusBar.isShow ? (_(), y("div", qo, [
                      s("div", {
                        class: "title-wrap",
                        style: U({ fontSize: "14px", color: o(e).global.topStatusBar.textColor, textAlign: o(e).global.topStatusBar.textAlign })
                      }, r(o(e).global.title), 5)
                    ])) : p("", !0),
                    o(e).global.topStatusBar.style == "style-2" && o(e).global.topStatusBar.isShow ? (_(), y("div", Po, [
                      s("div", {
                        class: "title-wrap",
                        style: U({ color: o(e).global.topStatusBar.textColor })
                      }, [
                        o(e).global.topStatusBar.imgUrl ? (_(), y("div", Io, [
                          s("img", {
                            class: "max-w-[100%] max-h-[100%]",
                            src: o(fe)(o(e).global.topStatusBar.imgUrl),
                            mode: "heightFix"
                          }, null, 8, $o)
                        ])) : p("", !0),
                        s("div", {
                          style: U({ color: o(e).global.topStatusBar.textColor })
                        }, r(o(e).global.title), 5)
                      ], 4)
                    ])) : p("", !0),
                    o(e).global.topStatusBar.style == "style-3" && o(e).global.topStatusBar.isShow ? (_(), y("div", Ao, [
                      o(e).global.topStatusBar.imgUrl ? (_(), y("div", Ro, [
                        s("img", {
                          class: "max-w-[100%] max-h-[100%]",
                          src: o(fe)(o(e).global.topStatusBar.imgUrl)
                        }, null, 8, jo)
                      ])) : p("", !0),
                      s("div", Eo, [
                        Lo,
                        s("span", Mo, r(o(e).global.topStatusBar.inputPlaceholder), 1)
                      ])
                    ])) : p("", !0),
                    o(e).global.topStatusBar.style == "style-4" && o(e).global.topStatusBar.isShow ? (_(), y("div", Jo, [
                      s("span", {
                        class: "iconfont iconxiazai19 !text-[14px]",
                        style: U({ color: o(e).global.topStatusBar.textColor })
                      }, null, 4),
                      s("div", {
                        class: "title-wrap",
                        style: U({ color: o(e).global.topStatusBar.textColor })
                      }, "我的位置", 4),
                      s("span", {
                        class: "iconfont iconxiangyoujiantou !text-[12px]",
                        style: U({ color: o(e).global.topStatusBar.textColor })
                      }, null, 4)
                    ])) : p("", !0)
                  ], 6),
                  s("div", Go, [
                    s("ul", Fo, [
                      i(D, {
                        effect: "light",
                        content: o(n)("moveUpComponent"),
                        placement: "right"
                      }, {
                        default: a(() => [
                          i(g, {
                            name: "iconfont iconjiantoushang",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).moveUpComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(D, {
                        effect: "light",
                        content: o(n)("moveDownComponent"),
                        placement: "right"
                      }, {
                        default: a(() => [
                          i(g, {
                            name: "iconfont iconjiantouxia",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).moveDownComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(D, {
                        effect: "light",
                        content: o(n)("copyComponent"),
                        placement: "right"
                      }, {
                        default: a(() => [
                          i(g, {
                            name: "iconfont iconcopy-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).copyComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(D, {
                        effect: "light",
                        content: o(n)("delComponent"),
                        placement: "right"
                      }, {
                        default: a(() => [
                          i(g, {
                            name: "iconfont icondelete-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).delComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(D, {
                        effect: "light",
                        content: o(n)("resetComponent"),
                        placement: "right"
                      }, {
                        default: a(() => [
                          i(g, {
                            name: "iconfont iconloader-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: o(e).resetComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"])
                    ]),
                    ge(s("iframe", {
                      id: "previewIframe",
                      src: Y.value,
                      frameborder: "0",
                      class: "preview-iframe w-[375px]"
                    }, null, 8, Ko), [
                      [be, E.value]
                    ]),
                    ge(s("div", Wo, [
                      s("div", Yo, r(o(n)("developTitle")), 1),
                      s("div", Ho, [
                        s("text", Qo, r(o(n)("wapDomain")), 1),
                        i(X, {
                          modelValue: q.value,
                          "onUpdate:modelValue": t[6] || (t[6] = (l) => q.value = l),
                          modelModifiers: { trim: !0 },
                          placeholder: o(n)("wapDomainPlaceholder"),
                          clearable: ""
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      i(w, {
                        type: "primary",
                        onClick: Se
                      }, {
                        default: a(() => [
                          S(r(o(n)("confirm")), 1)
                        ]),
                        _: 1
                      }),
                      i(w, {
                        type: "primary",
                        onClick: t[7] || (t[7] = (l) => De()),
                        plain: ""
                      }, {
                        default: a(() => [
                          S(r(o(n)("settingTips")), 1)
                        ]),
                        _: 1
                      })
                    ], 512), [
                      [be, L.value]
                    ])
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          s("div", Xo, [
            i(V, null, {
              default: a(() => [
                i(ze, {
                  class: "box-card",
                  shadow: "never"
                }, {
                  header: a(() => [
                    s("div", Zo, [
                      s("span", et, r(o(e).currentIndex == -99 ? o(n)("pageSet") : o(e).editComponent.componentTitle), 1),
                      o(e).currentComponent ? (_(), y("div", ot, [
                        s("span", {
                          class: oe(["cursor-pointer rounded-[50px] py-[5px] px-[15px]", { "bg-primary text-white": o(e).editTab == "content" }]),
                          onClick: t[8] || (t[8] = (l) => o(e).editTab = "content")
                        }, r(o(n)("tabEditContent")), 3),
                        s("span", {
                          class: oe(["cursor-pointer rounded-[50px] py-[5px] px-[15px]", { "bg-primary text-white": o(e).editTab == "style" }]),
                          onClick: t[9] || (t[9] = (l) => o(e).editTab = "style")
                        }, r(o(n)("tabEditStyle")), 3)
                      ])) : p("", !0)
                    ])
                  ]),
                  default: a(() => [
                    s("div", tt, [
                      o(e).currentComponent ? (_(), f(io(M[o(e).currentComponent]), {
                        key: o(e).currentIndex,
                        value: o(e).value[o(e).currentIndex]
                      }, {
                        style: a(() => [
                          s("div", it, [
                            s("h3", nt, r(o(n)("componentStyleTitle")), 1),
                            i(Oe, {
                              "label-width": "90px",
                              class: "px-[10px]"
                            }, {
                              default: a(() => [
                                o(e).editComponent.ignore.indexOf("pageBgColor") == -1 ? (_(), y(W, { key: 0 }, [
                                  i(x, {
                                    label: o(n)("bottomBgColor")
                                  }, {
                                    default: a(() => [
                                      i(k, {
                                        modelValue: o(e).editComponent.pageStartBgColor,
                                        "onUpdate:modelValue": t[10] || (t[10] = (l) => o(e).editComponent.pageStartBgColor = l),
                                        "show-alpha": "",
                                        predefine: o(e).predefineColors
                                      }, null, 8, ["modelValue", "predefine"]),
                                      i(g, {
                                        name: "iconfont iconmap-connect",
                                        size: "20px",
                                        class: "block !text-gray-400 mx-[5px]"
                                      }),
                                      i(k, {
                                        modelValue: o(e).editComponent.pageEndBgColor,
                                        "onUpdate:modelValue": t[11] || (t[11] = (l) => o(e).editComponent.pageEndBgColor = l),
                                        "show-alpha": "",
                                        predefine: o(e).predefineColors
                                      }, null, 8, ["modelValue", "predefine"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  s("div", lt, r(o(n)("bottomBgTips")), 1)
                                ], 64)) : p("", !0),
                                o(e).editComponent.ignore.indexOf("pageBgColor") == -1 ? (_(), f(x, {
                                  key: 1,
                                  label: o(n)("bgGradientAngle")
                                }, {
                                  default: a(() => [
                                    i(me, {
                                      modelValue: o(e).editComponent.pageGradientAngle,
                                      "onUpdate:modelValue": t[12] || (t[12] = (l) => o(e).editComponent.pageGradientAngle = l)
                                    }, {
                                      default: a(() => [
                                        i(K, { label: "to bottom" }, {
                                          default: a(() => [
                                            S(r(o(n)("topToBottom")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        i(K, { label: "to right" }, {
                                          default: a(() => [
                                            S(r(o(n)("leftToRight")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0),
                                o(e).editComponent.ignore.indexOf("componentBgUrl") == -1 ? (_(), f(x, {
                                  key: 2,
                                  label: o(n)("componentBgUrl")
                                }, {
                                  default: a(() => [
                                    i(Ue, {
                                      modelValue: o(e).editComponent.componentBgUrl,
                                      "onUpdate:modelValue": t[13] || (t[13] = (l) => o(e).editComponent.componentBgUrl = l),
                                      limit: 1
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0),
                                o(e).editComponent.ignore.indexOf("componentBgUrl") == -1 && o(e).editComponent.componentBgUrl ? (_(), f(x, {
                                  key: 3,
                                  label: o(n)("componentBgAlpha")
                                }, {
                                  default: a(() => [
                                    i(N, {
                                      modelValue: o(e).editComponent.componentBgAlpha,
                                      "onUpdate:modelValue": t[14] || (t[14] = (l) => o(e).editComponent.componentBgAlpha = l),
                                      "show-input": "",
                                      size: "small",
                                      min: 0,
                                      max: 10,
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0),
                                o(e).editComponent.ignore.indexOf("componentBgColor") == -1 ? (_(), f(x, {
                                  key: 4,
                                  label: o(n)("componentBgColor")
                                }, {
                                  default: a(() => [
                                    i(k, {
                                      modelValue: o(e).editComponent.componentStartBgColor,
                                      "onUpdate:modelValue": t[15] || (t[15] = (l) => o(e).editComponent.componentStartBgColor = l),
                                      "show-alpha": "",
                                      predefine: o(e).predefineColors
                                    }, null, 8, ["modelValue", "predefine"]),
                                    i(g, {
                                      name: "iconfont iconmap-connect",
                                      size: "20px",
                                      class: "block !text-gray-400 mx-[5px]"
                                    }),
                                    i(k, {
                                      modelValue: o(e).editComponent.componentEndBgColor,
                                      "onUpdate:modelValue": t[16] || (t[16] = (l) => o(e).editComponent.componentEndBgColor = l),
                                      "show-alpha": "",
                                      predefine: o(e).predefineColors
                                    }, null, 8, ["modelValue", "predefine"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0),
                                o(e).editComponent.ignore.indexOf("componentBgColor") == -1 ? (_(), f(x, {
                                  key: 5,
                                  label: o(n)("bgGradientAngle")
                                }, {
                                  default: a(() => [
                                    i(me, {
                                      modelValue: o(e).editComponent.componentGradientAngle,
                                      "onUpdate:modelValue": t[17] || (t[17] = (l) => o(e).editComponent.componentGradientAngle = l)
                                    }, {
                                      default: a(() => [
                                        i(K, { label: "to bottom" }, {
                                          default: a(() => [
                                            S(r(o(n)("topToBottom")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        i(K, { label: "to right" }, {
                                          default: a(() => [
                                            S(r(o(n)("leftToRight")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0),
                                o(e).editComponent.ignore.indexOf("marginTop") == -1 ? (_(), f(x, {
                                  key: 6,
                                  label: o(n)("marginTop")
                                }, {
                                  default: a(() => [
                                    i(N, {
                                      modelValue: o(e).editComponent.margin.top,
                                      "onUpdate:modelValue": t[18] || (t[18] = (l) => o(e).editComponent.margin.top = l),
                                      "show-input": "",
                                      size: "small",
                                      min: -100,
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0),
                                o(e).editComponent.ignore.indexOf("marginBottom") == -1 ? (_(), f(x, {
                                  key: 7,
                                  label: o(n)("marginBottom")
                                }, {
                                  default: a(() => [
                                    i(N, {
                                      modelValue: o(e).editComponent.margin.bottom,
                                      "onUpdate:modelValue": t[19] || (t[19] = (l) => o(e).editComponent.margin.bottom = l),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider",
                                      min: -100
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0),
                                o(e).editComponent.ignore.indexOf("marginBoth") == -1 ? (_(), f(x, {
                                  key: 8,
                                  label: o(n)("marginBoth")
                                }, {
                                  default: a(() => [
                                    i(N, {
                                      modelValue: o(e).editComponent.margin.both,
                                      "onUpdate:modelValue": t[20] || (t[20] = (l) => o(e).editComponent.margin.both = l),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0),
                                o(e).editComponent.ignore.indexOf("topRounded") == -1 ? (_(), f(x, {
                                  key: 9,
                                  label: o(n)("topRounded")
                                }, {
                                  default: a(() => [
                                    i(N, {
                                      modelValue: o(e).editComponent.topRounded,
                                      "onUpdate:modelValue": t[21] || (t[21] = (l) => o(e).editComponent.topRounded = l),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider",
                                      max: 100
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0),
                                o(e).editComponent.ignore.indexOf("bottomRounded") == -1 ? (_(), f(x, {
                                  key: 10,
                                  label: o(n)("bottomRounded")
                                }, {
                                  default: a(() => [
                                    i(N, {
                                      modelValue: o(e).editComponent.bottomRounded,
                                      "onUpdate:modelValue": t[22] || (t[22] = (l) => o(e).editComponent.bottomRounded = l),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider",
                                      max: 100
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : p("", !0)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["value"])) : p("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const Lt = /* @__PURE__ */ po(st, [["__scopeId", "data-v-8da4545e"]]);
export {
  Lt as default
};
