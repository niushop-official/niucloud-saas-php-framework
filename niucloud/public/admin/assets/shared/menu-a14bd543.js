import { defineComponent as G, ref as m, resolveComponent as x, resolveDirective as H, openBlock as u, createElementBlock as c, createVNode as n, withCtx as w, createElementVNode as t, toDisplayString as k, unref as h, withDirectives as g, Fragment as C, renderList as B, normalizeClass as N, withModifiers as z, vShow as j, createTextVNode as J, pushScopeId as K, popScopeId as Q } from "vue";
import { a_ as X, t as d, a$ as Y, a as Z } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as ee, ElMessage as te } from "element-plus";
import I from "./menu-form-5b406d32.js";
import { useRoute as le, useRouter as ne } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const S = (y) => (K("data-v-3d36b689"), y = y(), Q(), y), ae = { class: "main-container" }, oe = { class: "flex justify-between items-center" }, se = { class: "text-page-title" }, ue = { class: "flex" }, ce = { class: "preview-wrap w-[300px] h-[550px] mr-[16px] bg-overlay rounded-md flex flex-col justify-between border border-color" }, re = /* @__PURE__ */ S(() => /* @__PURE__ */ t("div", { class: "head w-full h-[70px]" }, null, -1)), ie = { class: "menu-list h-[70px] flex border-t border-color" }, de = { class: "py-[15px]" }, ve = { class: "flex h-full px-[10px] items-center justify-center border-r border-color" }, pe = { class: "flex-1 flex w-0" }, _e = ["onClick"], me = { class: "menu-name px-[10px] border-r border-color w-full leading-[40px] text-base truncate text-center" }, he = /* @__PURE__ */ S(() => /* @__PURE__ */ t("div", { class: "active-shade" }, null, -1)), be = { class: "sub-menu-wrap w-full bg-overlay border border-color rounded" }, fe = ["onClick"], xe = { class: "menu-name w-full text-base truncate text-center" }, ge = /* @__PURE__ */ S(() => /* @__PURE__ */ t("div", { class: "active-shade" }, null, -1)), ye = ["onClick"], we = { class: "flex-1" }, ke = {
  key: 1,
  class: "py-[20px] leading"
}, Ce = { class: "fixed-footer-wrap" }, Be = { class: "fixed-footer" }, je = /* @__PURE__ */ G({
  __name: "menu",
  setup(y) {
    const R = le().meta.title, F = ne(), p = m(!0), e = m([]), a = m(0), s = m(-1), v = m(null), M = m("/channel/wechat/menu"), P = (l) => {
      F.push({ path: M.value });
    };
    X().then((l) => {
      e.value = l.data, p.value = !1;
    });
    const W = () => {
      e.value.push({
        name: "菜单名称",
        type: "view",
        url: "",
        appid: "",
        pagepath: "",
        sub_button: []
      }), V(e.value.length - 1);
    }, A = (l) => {
      !e.value[l].sub_button && (e.value[l].sub_button = []), e.value[l].sub_button.push({
        name: "子菜单名称",
        type: "view",
        url: "",
        appid: "",
        pagepath: ""
      }), $(l, e.value[l].sub_button.length - 1);
    }, V = (l) => {
      a.value = l, s.value = -1;
    }, $ = (l, r) => {
      a.value = l, s.value = r;
    }, D = () => {
      ee.confirm(
        d("deleteMemuTips"),
        d("warning"),
        {
          confirmButtonText: d("confirm"),
          cancelButtonText: d("cancel"),
          type: "warning"
        }
      ).then(() => {
        s.value != -1 ? (e.value[a.value].sub_button.splice(s.value, 1), s.value = e.value[a.value].sub_button.length - 1, s.value == -1 && Object.assign(e.value[a.value], {
          type: "view",
          url: "",
          appid: "",
          pagepath: ""
        })) : (e.value.splice(a.value, 1), e.value.length && (a.value = e.value.length - 1));
      });
    }, L = async () => {
      if (!v.value || !v.value) {
        te.error(d("menusEmptyTips"));
        return;
      }
      for (let l = 0; l < (v == null ? void 0 : v.value.length); l++) {
        const r = v.value[l];
        if (!await r.validate()) {
          a.value = r.index, s.value = r.subIndex;
          break;
        }
      }
      p.value || (p.value = !0, Y({ button: e.value }).then(() => {
        p.value = !1;
      }).catch(() => {
        p.value = !1;
      }));
    };
    return (l, r) => {
      const b = x("el-tab-pane"), O = x("el-tabs"), T = x("icon"), E = x("el-card"), U = x("el-button"), q = H("loading");
      return u(), c("div", ae, [
        n(E, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: w(() => [
            t("div", oe, [
              t("span", se, k(h(R)), 1)
            ]),
            n(O, {
              modelValue: M.value,
              "onUpdate:modelValue": r[0] || (r[0] = (i) => M.value = i),
              class: "my-[20px]",
              onTabChange: P
            }, {
              default: w(() => [
                n(b, {
                  label: h(d)("wechatAccessFlow"),
                  name: "/channel/wechat"
                }, null, 8, ["label"]),
                n(b, {
                  label: h(d)("customMenu"),
                  name: "/channel/wechat/menu"
                }, null, 8, ["label"]),
                n(b, {
                  label: h(d)("wechatTemplate"),
                  name: "/channel/wechat/message"
                }, null, 8, ["label"]),
                n(b, {
                  label: h(d)("reply"),
                  name: "/channel/wechat/reply"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            g((u(), c("div", ue, [
              t("div", ce, [
                re,
                t("div", ie, [
                  t("div", de, [
                    t("div", ve, [
                      n(T, {
                        name: "iconfont iconjianpan",
                        size: "20px",
                        color: "#b1b2b3"
                      })
                    ])
                  ]),
                  t("div", pe, [
                    (u(!0), c(C, null, B(e.value, (i, o) => (u(), c("div", {
                      class: N(["menu-item py-[15px] flex items-center justify-center cursor-pointer", { "size-1": e.value.length == 1, "size-2-3": e.value.length > 1, active: o == a.value, curr: o == a.value && s.value == -1 }]),
                      key: o,
                      onClick: (f) => V(o)
                    }, [
                      t("div", me, k(i.name), 1),
                      he,
                      t("div", be, [
                        (u(!0), c(C, null, B(i.sub_button, (f, _) => (u(), c("div", {
                          class: N(["menu-item h-[50px] p-[10px] border-b border-color flex items-center justify-center cursor-pointer", { curr: _ == s.value }]),
                          key: _,
                          onClick: z((Te) => $(o, _), ["stop"])
                        }, [
                          t("div", xe, k(f.name), 1),
                          ge
                        ], 10, fe))), 128)),
                        g(t("div", {
                          class: "add-menu flex items-center justify-center flex-1 cursor-pointer menu-item h-[50px]",
                          onClick: z((f) => A(o), ["stop"])
                        }, [
                          n(T, { name: "element Plus" })
                        ], 8, ye), [
                          [j, !i.sub_button || i.sub_button.length < 5]
                        ])
                      ])
                    ], 10, _e))), 128)),
                    g(t("div", {
                      class: "add-menu flex items-center justify-center flex-1 cursor-pointer menu-item",
                      onClick: W
                    }, [
                      n(T, { name: "element Plus" })
                    ], 512), [
                      [j, e.value.length < 3]
                    ])
                  ])
                ])
              ]),
              t("div", we, [
                n(E, {
                  class: "box-card !border-none h-auto",
                  shadow: "never"
                }, {
                  default: w(() => [
                    e.value.length ? (u(!0), c(C, { key: 0 }, B(e.value, (i, o) => (u(), c("div", { key: o }, [
                      g(t("div", null, [
                        n(I, {
                          data: i,
                          onDelete: D,
                          index: o,
                          ref_for: !0,
                          ref_key: "formRef",
                          ref: v
                        }, null, 8, ["data", "index"])
                      ], 512), [
                        [j, o == a.value && s.value == -1]
                      ]),
                      (u(!0), c(C, null, B(i.sub_button, (f, _) => (u(), c("div", { key: _ }, [
                        g(t("div", null, [
                          n(I, {
                            data: f,
                            onDelete: D,
                            index: o,
                            "sub-index": _,
                            ref_for: !0,
                            ref_key: "formRef",
                            ref: v
                          }, null, 8, ["data", "index", "sub-index"])
                        ], 512), [
                          [j, o == a.value && _ == s.value]
                        ])
                      ]))), 128))
                    ]))), 128)) : (u(), c("div", ke, "尚未添加自定义菜单，点击左侧添加菜单为公众号创建菜单栏。"))
                  ]),
                  _: 1
                })
              ])
            ])), [
              [q, p.value]
            ])
          ]),
          _: 1
        }),
        t("div", Ce, [
          t("div", Be, [
            n(U, {
              type: "primary",
              loading: p.value,
              onClick: r[1] || (r[1] = (i) => L())
            }, {
              default: w(() => [
                J(k(h(d)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
const Fe = /* @__PURE__ */ Z(je, [["__scopeId", "data-v-3d36b689"]]);
export {
  Fe as default
};
