import { defineComponent as X, ref as x, resolveComponent as p, openBlock as r, createElementBlock as d, Fragment as w, renderList as V, createBlock as T, withCtx as _, createElementVNode as l, toDisplayString as n, unref as c, withDirectives as E, createVNode as f, normalizeClass as Y, vShow as F, createCommentVNode as Z, createTextVNode as R, pushScopeId as Te, popScopeId as De, nextTick as K } from "vue";
import { t as i, fe as ee, ff as q, fg as te, _ as le } from "./core-shared-c8d7774e.js";
import { c as z } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const se = { class: "main-container" }, ne = { class: "flex items-center mb-[20px]" }, oe = { class: "text-[14px] mr-[20px]" }, re = { class: "flex items-center" }, ae = { class: "text-[14px] mr-[10px]" }, ce = { class: "flex items-center" }, ie = ["onClick"], de = {
  key: 0,
  class: "text-red-500 text-xs ml-2"
}, ue = { class: "flex items-center justify-between p-[10px] table-item-border bg" }, pe = { class: "text-base w-[230px]" }, _e = { class: "text-base w-[230px]" }, fe = { class: "text-base w-[230px]" }, ve = { class: "text-base w-[80px] text-center" }, me = { key: 0 }, xe = { class: "flex w-[230px] flex-shrink-0 text-base" }, he = { class: "flex w-[230px] flex-shrink-0 text-base" }, be = { class: "w-[230px] flex-shrink-0 text-base" }, ge = { class: "flex items-center justify-center w-[80px] select-none" }, we = ["onClick"], Ve = {
  key: 1,
  class: "min-h-[80px] flex items-center justify-center text-base"
}, ye = { class: "dialog-footer" }, ke = /* @__PURE__ */ X({
  __name: "transfer_scene",
  setup(Ce) {
    const h = x({}), b = x(!1), y = () => {
      ee().then((a) => {
        h.value = a.data;
        for (const t in h.value)
          h.value[t].disabled = !0, h.value[t].error = !1;
      });
    };
    y();
    const M = (a, t, s) => {
      var S;
      const v = ((S = a.target.value) == null ? void 0 : S.trim()) || "", C = U.value[t] || "";
      if (v === "" && C !== "") {
        s.error = !1, q({
          scene: t,
          scene_id: ""
        }).then(() => {
          s.disabled = !0, y();
        });
        return;
      }
      if (v === "" && C === "") {
        s.error = !1, s.disabled = !0;
        return;
      }
      if (v.length < 4) {
        s.error = !0;
        return;
      }
      v.length >= 4 && v.length <= 5 && (s.error = !1, q({
        scene: t,
        scene_id: v
      }).then(() => {
        s.disabled = !0, y();
      }));
    }, D = x({}), U = x({}), L = (a, t) => {
      U.value[t] = a.scene_id, a.disabled = !1, a.error = !1, K(() => {
        var s;
        (s = D.value[t]) == null || s.focus();
      });
    }, g = x(!1), k = x({}), u = x({
      type: "",
      scene: "",
      perception: "",
      infos: {}
    }), O = (a, t, s) => {
      k.value = z(a), u.value.type = s, u.value.scene = t.scene, u.value.perception = t.perception, u.value.infos = z(t.infos), g.value = !0;
    }, j = x(), A = async (a) => {
      b.value || !a || await a.validate(async (t) => {
        t && (b.value = !0, te(u.value).then(() => {
          b.value = !1, g.value = !1, y();
        }).catch(() => {
          b.value = !1;
        }));
      });
    }, G = () => {
      g.value = !1;
    };
    return (a, t) => {
      const s = p("el-input"), v = p("Edit"), C = p("el-icon"), S = p("el-card"), H = p("el-option"), J = p("el-select"), B = p("el-form-item"), Q = p("el-form"), I = p("el-button"), W = p("el-dialog");
      return r(), d("div", se, [
        (r(!0), d(w, null, V(h.value, (e, m) => (r(), T(S, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never",
          key: m
        }, {
          default: _(() => [
            l("div", ne, [
              l("h3", oe, n(e.name), 1),
              l("div", re, [
                l("span", ae, n(c(i)("transferSceneId")) + "：", 1),
                l("div", ce, [
                  E(f(s, {
                    modelValue: e.scene_id,
                    "onUpdate:modelValue": (o) => e.scene_id = o,
                    modelModifiers: { trim: !0 },
                    maxlength: "5",
                    minlength: "4",
                    class: Y(["!w-[60px]", e.error ? "!border-red-500" : ""]),
                    disabled: e.disabled,
                    onBlur: (o) => M(o, m, e),
                    ref_for: !0,
                    ref: (o) => {
                      o && (D.value[m] = o);
                    }
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "disabled", "onBlur"]), [
                    [F, !e.disabled]
                  ]),
                  E(l("div", null, n(e.scene_id ? e.scene_id : "--"), 513), [
                    [F, e.disabled]
                  ]),
                  l("div", {
                    onClick: (o) => L(e, m),
                    class: "w-[40px] flex items-center ml-[8px]"
                  }, [
                    f(C, {
                      size: "20",
                      color: "var(--el-color-primary)"
                    }, {
                      default: _(() => [
                        f(v)
                      ]),
                      _: 1
                    })
                  ], 8, ie),
                  e.error ? (r(), d("span", de, "场景值最少为4位")) : Z("", !0)
                ])
              ])
            ]),
            l("div", null, [
              l("div", ue, [
                l("span", pe, n(c(i)("transferType")), 1),
                l("span", _e, n(c(i)("recvPerception")), 1),
                l("span", fe, n(c(i)("reportInfos")), 1),
                l("span", ve, n(c(i)("operation")), 1)
              ]),
              Object.values(e.trade_scene_data).length ? (r(), d("div", me, [
                (r(!0), d(w, null, V(e.trade_scene_data, (o, $) => (r(), d("div", {
                  class: "flex items-center justify-between p-[10px] table-item-border",
                  key: $
                }, [
                  l("div", xe, n(o.name), 1),
                  l("div", he, n(o.perception), 1),
                  l("div", be, [
                    (r(!0), d(w, null, V(o.infos, (N, P) => (r(), d("div", { key: P }, n(P) + "：" + n(N), 1))), 128))
                  ]),
                  l("div", ge, [
                    l("button", {
                      class: "text-base text-primary",
                      onClick: (N) => O(e, o, $)
                    }, n(c(i)("deploy")), 9, we)
                  ])
                ]))), 128))
              ])) : (r(), d("div", Ve, n(c(i)("noData")), 1))
            ])
          ]),
          _: 2
        }, 1024))), 128)),
        f(W, {
          modelValue: g.value,
          "onUpdate:modelValue": t[2] || (t[2] = (e) => g.value = e),
          title: k.value.name,
          width: "550px",
          "destroy-on-close": !0
        }, {
          footer: _(() => [
            l("span", ye, [
              f(I, { onClick: G }, {
                default: _(() => [
                  R(n(c(i)("cancel")), 1)
                ]),
                _: 1
              }),
              f(I, {
                type: "primary",
                loading: b.value,
                onClick: t[1] || (t[1] = (e) => A(j.value))
              }, {
                default: _(() => [
                  R(n(c(i)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          default: _(() => [
            f(Q, {
              model: u.value,
              "label-width": "110px",
              ref_key: "formRef",
              ref: j,
              class: "page-form"
            }, {
              default: _(() => [
                f(B, {
                  label: c(i)("recvPerception"),
                  prop: "perception",
                  rules: [{ required: !0, message: c(i)("recvPerceptionTips"), trigger: "blur" }]
                }, {
                  default: _(() => [
                    f(J, {
                      modelValue: u.value.perception,
                      "onUpdate:modelValue": t[0] || (t[0] = (e) => u.value.perception = e),
                      placeholder: c(i)("recvPerceptionTips"),
                      clearable: "",
                      class: "!w-[300px]"
                    }, {
                      default: _(() => [
                        (r(!0), d(w, null, V(k.value.user_recv_perception, (e, m) => (r(), T(H, {
                          key: m,
                          label: e,
                          value: e
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label", "rules"]),
                (r(!0), d(w, null, V(k.value.transfer_scene_report_infos, (e, m) => (r(), T(B, {
                  key: m,
                  label: e,
                  prop: `infos[${e}]`,
                  rules: [{ required: !0, message: `请输入${e}`, trigger: "blur" }]
                }, {
                  default: _(() => [
                    f(s, {
                      modelValue: u.value.infos[e],
                      "onUpdate:modelValue": (o) => u.value.infos[e] = o,
                      modelModifiers: { trim: !0 },
                      maxlength: "40",
                      class: "!w-[300px]"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1032, ["label", "prop", "rules"]))), 128))
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const Fe = /* @__PURE__ */ le(ke, [["__scopeId", "data-v-1a9d12b7"]]);
export {
  Fe as default
};
