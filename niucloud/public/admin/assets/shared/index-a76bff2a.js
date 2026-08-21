import { defineComponent as le, computed as ae, ref as g, resolveComponent as f, openBlock as u, createElementBlock as m, createElementVNode as d, renderSlot as te, createVNode as n, unref as c, withCtx as s, withModifiers as oe, createBlock as N, createTextVNode as H, toDisplayString as P, Fragment as k, renderList as Y, withDirectives as ne, normalizeClass as S, vShow as ie, resolveDynamicComponent as se, mergeProps as re } from "vue";
import { t as r, gL as ue, b_ as de } from "./core-shared-0b2facad.js";
import { c as R } from "./lodash-8c6c2daa.js";
import { ElMessage as U } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const pe = ["onClick"], ce = { class: "flex items-start" }, ve = ["onClick"], me = { class: "flex-1" }, _e = { class: "child-list-wrap" }, fe = ["onClick"], he = ["onClick"], xe = { class: "mb-[16px]" }, ye = { class: "mb-[16px]" }, ge = /* @__PURE__ */ d("div", { class: "text-sm text-gray-400 select-text" }, "路径必须以“/”开头，例：/app/pages/index/index", -1), ke = /* @__PURE__ */ d("div", { class: "text-sm text-gray-400 select-text" }, "跳转外部链接“http”或“https”开头，例：https://baidu.com", -1), be = { class: "mb-[16px]" }, we = { class: "mb-[16px]" }, Ce = /* @__PURE__ */ d("div", { class: "text-sm text-gray-400 select-text" }, "仅支持小程序之间的跳转，不支持从其他渠道跳转小程序", -1), Ve = /* @__PURE__ */ d("div", { class: "text-sm text-gray-400 select-text" }, "小程序路径格式如：app/pages/index/index", -1), Le = { class: "mb-[16px]" }, Pe = /* @__PURE__ */ d("div", { class: "text-sm text-gray-400 select-text" }, "电话号码支持手机号码和固定电话", -1), Ae = {
  key: 4,
  class: "flex flex-wrap"
}, Ee = ["onClick"], De = { class: "dialog-footer" }, $e = /* @__PURE__ */ le({
  __name: "index",
  props: {
    modelValue: {
      type: Object,
      default: () => {
      }
    },
    ignore: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue", "confirm", "success"],
  setup(K, { expose: B, emit: G }) {
    const b = K, A = G, x = ae({
      get() {
        return b.modelValue;
      },
      set(t) {
        A("update:modelValue", t);
      }
    }), C = g(!1), V = g(!1), o = g([]), i = g(""), I = g([]), y = g(""), O = g(null), e = g([]), F = () => {
      J(() => {
        if (x.value.name != "") {
          e.value = R(x.value), i.value = e.value.parent;
          for (const t in o.value)
            if (o.value[t].type == "folder") {
              if (o.value[t].name == i.value)
                E(o.value[t].child_list[0]);
              else
                for (let a = 0; a < o.value[t].child_list.length; a++)
                  if (o.value[t].child_list[a].name == i.value) {
                    E(o.value[t].child_list[a]);
                    break;
                  }
            } else
              o.value[t].name == i.value && E(o.value[t]);
        }
        C.value = !0, V.value = !0, A("confirm", V.value);
      });
    }, J = (t = null) => {
      ue({}).then((a) => {
        if (o.value = a.data, o.value && o.value.length == 0)
          return;
        if (b.ignore && b.ignore.length)
          for (let v in o.value) {
            for (let p = 0; p < b.ignore.length; p++)
              if (v == b.ignore[p]) {
                delete o.value[v];
                break;
              }
            if (o.value[v] && o.value[v].child_list) {
              for (let p = 0; p < o.value[v].child_list.length; p++)
                for (let D = 0; D < b.ignore.length; D++)
                  if (o.value[v].child_list[p].name == b.ignore[D]) {
                    console.log(o.value[v].child_list[p]), o.value[v].child_list.splice(p, 1);
                    break;
                  }
            }
          }
        for (const v in o.value)
          o.value[v].type == "folder" && (o.value[v].foldSwitch = !0);
        const _ = Object.values(o.value)[0];
        let w = "";
        _.type == "folder" ? (I.value = _.child_list[0].child_list, w = _.child_list[0].name, _.child_list[0].component || (y.value = "")) : (I.value = _.child_list, w = _.parent_name, y.value = ""), x.value.name != "" ? e.value = R(x.value) : e.value = {
          parent: w
        }, i.value = e.value.parent, t && t();
      });
    }, E = (t) => {
      i.value = t.name, I.value = t.child_list, t.component ? y.value = de(t.component) : y.value = "";
    }, z = (t) => {
      delete t.is_share, Object.assign(e.value, t);
    }, q = () => {
      x.value = {
        name: "",
        parent: "",
        title: "",
        url: ""
      };
    }, Q = () => {
      const t = ["name", "parent", "title", "url", "appid", "mobile", "action", "page"];
      if (y.value && O.value) {
        const a = O.value.getData();
        if (!a)
          return;
        for (const _ in e.value)
          t.indexOf(_) == -1 && delete e.value[_];
        Object.assign(e.value, a);
      } else if (i.value === "DIY_LINK") {
        if (!e.value.title) {
          U({
            message: r("diyLinkNameNotEmpty"),
            type: "warning"
          });
          return;
        }
        if (!e.value.url) {
          U({
            message: r("diyLinkUrlNotEmpty"),
            type: "warning"
          });
          return;
        }
        e.value.name = i.value, e.value.action = "", delete e.value.appid, delete e.value.mobile;
      } else if (i.value == "DIY_PAGE")
        e.value.name = i.value, e.value.action = "decorate", delete e.value.appid, delete e.value.mobile;
      else if (i.value == "DIY_JUMP_OTHER_APPLET") {
        if (!e.value.appid) {
          U({
            message: r("diyAppletIdNotEmpty"),
            type: "warning"
          });
          return;
        }
        if (!e.value.page) {
          U({
            message: r("diyAppletPageNotEmpty"),
            type: "warning"
          });
          return;
        }
        e.value.name = i.value, e.value.title = "微信小程序-" + e.value.appid, e.value.action = "", delete e.value.url, delete e.value.mobile;
      } else if (i.value == "DIY_MAKE_PHONE_CALL") {
        if (!e.value.mobile) {
          U({
            message: r("diyMakePhoneNotEmpty"),
            type: "warning"
          });
          return;
        }
        e.value.name = i.value, e.value.title = "拨打电话：" + e.value.mobile, e.value.action = "", delete e.value.url, delete e.value.appid;
      }
      if (e.value.parent = i.value, y.value == "")
        for (const a in e.value)
          t.indexOf(a) == -1 && delete e.value[a];
      x.value = R(e.value), C.value = !1, V.value = !1, A("confirm", V.value), A("success");
    }, T = () => {
      C.value = !1, V.value = !1, A("confirm", V.value);
    };
    return B({
      showDialog: C
    }), (t, a) => {
      const _ = f("Close"), w = f("el-icon"), v = f("ArrowRight"), p = f("el-input"), D = f("ArrowDown"), W = f("ArrowUp"), j = f("el-scrollbar"), h = f("el-form-item"), X = f("el-form"), $ = f("el-button"), Z = f("el-dialog");
      return u(), m("div", null, [
        d("div", { onClick: F }, [
          te(t.$slots, "default", {}, () => [
            n(p, {
              modelValue: x.value.title,
              "onUpdate:modelValue": a[0] || (a[0] = (l) => x.value.title = l),
              placeholder: c(r)("linkPlaceholder"),
              readonly: "",
              class: "link-input"
            }, {
              suffix: s(() => [
                d("div", {
                  onClick: oe(q, ["stop"])
                }, [
                  x.value.name ? (u(), N(w, { key: 0 }, {
                    default: s(() => [
                      n(_)
                    ]),
                    _: 1
                  })) : (u(), N(w, { key: 1 }, {
                    default: s(() => [
                      n(v)
                    ]),
                    _: 1
                  }))
                ], 8, pe)
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder"])
          ])
        ]),
        n(Z, {
          modelValue: C.value,
          "onUpdate:modelValue": a[6] || (a[6] = (l) => C.value = l),
          title: c(r)("selectLinkTips"),
          width: "850px",
          "destroy-on-close": !0,
          "close-on-click-modal": !1,
          onClose: T
        }, {
          footer: s(() => [
            d("span", De, [
              n($, { onClick: T }, {
                default: s(() => [
                  H(P(c(r)("cancel")), 1)
                ]),
                _: 1
              }),
              n($, {
                type: "primary",
                onClick: Q
              }, {
                default: s(() => [
                  H(P(c(r)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: s(() => [
            d("div", ce, [
              n(j, { class: "w-[140px] border-r !h-[550px] link-wrap" }, {
                default: s(() => [
                  (u(!0), m(k, null, Y(o.value, (l, M) => (u(), m(k, { key: M }, [
                    l.type == "folder" ? (u(), m(k, { key: 0 }, [
                      d("div", {
                        class: "flex h-[40px] leading-[40px] cursor-pointer px-[10px] items-center select-none mr-[10px]",
                        onClick: (L) => l.foldSwitch = !l.foldSwitch
                      }, [
                        d("span", me, P(l.title), 1),
                        n(w, null, {
                          default: s(() => [
                            l.foldSwitch ? (u(), N(D, { key: 0 })) : (u(), N(W, { key: 1 }))
                          ]),
                          _: 2
                        }, 1024)
                      ], 8, ve),
                      ne(d("div", _e, [
                        (u(!0), m(k, null, Y(l.child_list, (L, ee) => (u(), m("div", {
                          key: ee,
                          class: S(["h-[40px] leading-[40px] cursor-pointer hover:bg-primary-light-9 hover:text-primary select-none truncate pl-[25px] mr-[20px]", [L.name == i.value ? "bg-primary-light-9 text-primary" : ""]]),
                          onClick: (Ne) => E(L)
                        }, P(L.title), 11, fe))), 128))
                      ], 512), [
                        [ie, l.foldSwitch]
                      ])
                    ], 64)) : (u(), m("div", {
                      key: 1,
                      class: S(["h-[40px] leading-[40px] cursor-pointer px-[10px] items-center select-none hover:bg-primary-light-9 hover:text-primary mr-[20px]", [l.name == i.value ? "bg-primary-light-9 text-primary" : ""]]),
                      onClick: (L) => E(l)
                    }, [
                      d("span", null, P(l.title), 1)
                    ], 10, he))
                  ], 64))), 128))
                ]),
                _: 1
              }),
              n(j, { class: "pl-4 !h-[550px] flex-1" }, {
                default: s(() => [
                  n(X, {
                    "label-width": "100px",
                    class: "px-[10px]"
                  }, {
                    default: s(() => [
                      y.value ? (u(), N(se(y.value), re({ key: 0 }, e.value, {
                        ref_key: "dynamicComponentRefs",
                        ref: O
                      }), null, 16)) : i.value == "DIY_LINK" ? (u(), m(k, { key: 1 }, [
                        d("div", xe, [
                          n(h, {
                            label: c(r)("diyLinkName")
                          }, {
                            default: s(() => [
                              n(p, {
                                modelValue: e.value.title,
                                "onUpdate:modelValue": a[1] || (a[1] = (l) => e.value.title = l),
                                placeholder: c(r)("diyLinkNamePlaceholder"),
                                class: "!w-[300px]"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        d("div", ye, [
                          n(h, {
                            label: c(r)("diyLinkUrl")
                          }, {
                            default: s(() => [
                              n(p, {
                                modelValue: e.value.url,
                                "onUpdate:modelValue": a[2] || (a[2] = (l) => e.value.url = l),
                                placeholder: c(r)("diyLinkUrlPlaceholder"),
                                class: "!w-[300px]"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        n(h, { label: " " }, {
                          default: s(() => [
                            ge
                          ]),
                          _: 1
                        }),
                        n(h, { label: " " }, {
                          default: s(() => [
                            ke
                          ]),
                          _: 1
                        })
                      ], 64)) : i.value == "DIY_JUMP_OTHER_APPLET" ? (u(), m(k, { key: 2 }, [
                        d("div", be, [
                          n(h, {
                            label: c(r)("diyAppletId")
                          }, {
                            default: s(() => [
                              n(p, {
                                modelValue: e.value.appid,
                                "onUpdate:modelValue": a[3] || (a[3] = (l) => e.value.appid = l),
                                placeholder: c(r)("diyAppletIdPlaceholder"),
                                clearable: "",
                                maxlength: "50",
                                class: "!w-[300px]"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        d("div", we, [
                          n(h, {
                            label: c(r)("diyAppletPage")
                          }, {
                            default: s(() => [
                              n(p, {
                                modelValue: e.value.page,
                                "onUpdate:modelValue": a[4] || (a[4] = (l) => e.value.page = l),
                                placeholder: c(r)("diyAppletPagePlaceholder"),
                                clearable: "",
                                maxlength: "100",
                                class: "!w-[300px]"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        n(h, { label: " " }, {
                          default: s(() => [
                            Ce
                          ]),
                          _: 1
                        }),
                        n(h, { label: " " }, {
                          default: s(() => [
                            Ve
                          ]),
                          _: 1
                        })
                      ], 64)) : i.value == "DIY_MAKE_PHONE_CALL" ? (u(), m(k, { key: 3 }, [
                        d("div", Le, [
                          n(h, {
                            label: c(r)("diyMakePhone")
                          }, {
                            default: s(() => [
                              n(p, {
                                modelValue: e.value.mobile,
                                "onUpdate:modelValue": a[5] || (a[5] = (l) => e.value.mobile = l),
                                placeholder: c(r)("diyMakePhonePlaceholder"),
                                clearable: "",
                                maxlength: "30",
                                class: "!w-[300px]"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        n(h, { label: " " }, {
                          default: s(() => [
                            Pe
                          ]),
                          _: 1
                        })
                      ], 64)) : (u(), m("div", Ae, [
                        (u(!0), m(k, null, Y(I.value, (l, M) => (u(), m("div", {
                          key: M,
                          class: S(["border border-br rounded-[3px] mr-[10px] mb-[10px] h-[32px] leading-[32px] cursor-pointer hover:bg-primary-light-9 px-[10px] hover:text-primary", { "border-primary text-primary": i.value != "DIY_PAGE" && l.name == e.value.name || i.value == "DIY_PAGE" && l.url == e.value.url }]),
                          onClick: (L) => z(l)
                        }, P(l.title), 11, Ee))), 128))
                      ]))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  $e as default
};
