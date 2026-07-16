import { defineComponent as q, ref as v, reactive as I, watch as B, resolveComponent as l, openBlock as D, createElementBlock as E, createVNode as s, withCtx as i, createElementVNode as r, toDisplayString as _, unref as c, createTextVNode as R, pushScopeId as Q, popScopeId as W } from "vue";
import { a2 as j, a3 as H, M, t as n, a4 as O, _ as U } from "./core-shared-e1759ce4.js";
import { ElMessage as g } from "element-plus";
import { useRoute as $ } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const F = { class: "main-container" }, T = { class: "flex justify-between items-center" }, z = { class: "text-page-title" }, A = { class: "fixed-footer-wrap" }, G = { class: "fixed-footer" }, J = /* @__PURE__ */ q({
  __name: "config",
  setup(K) {
    const b = $().meta.title, a = v(!0), e = I({
      is_open: !0,
      request_url: ""
    }), d = v();
    j().then((t) => {
      Object.assign(e, t.data), e.is_open = Boolean(Number(e.is_open)), a.value = !1;
    }), H().then((t) => {
      e.request_url = t.data.wap_url + "/";
    });
    const { copy: y, isSupported: w, copied: m } = M(), h = (t) => {
      if (!w.value) {
        g({
          message: n("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      y(t);
    };
    B(m, () => {
      m.value && g({
        message: n("copySuccess"),
        type: "success"
      });
    });
    const x = () => {
      window.open(e.request_url);
    }, C = async (t) => {
      a.value || !t || await t.validate(async (o) => {
        if (o) {
          a.value = !0;
          const p = { ...e };
          p.is_open = Number(p.is_open), O(p).then(() => {
            a.value = !1;
          }).catch(() => {
            a.value = !1;
          });
        }
      });
    };
    return (t, o) => {
      const p = l("el-switch"), f = l("el-form-item"), k = l("el-input"), N = l("el-form"), S = l("el-card"), V = l("el-button");
      return D(), E("div", F, [
        s(S, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: i(() => [
            r("div", T, [
              r("span", z, _(c(b)), 1)
            ]),
            s(N, {
              class: "page-form mt-[20px]",
              model: e,
              "label-width": "150px",
              ref_key: "formRef",
              ref: d
            }, {
              default: i(() => [
                s(f, {
                  label: c(n)("isOpen")
                }, {
                  default: i(() => [
                    s(p, {
                      modelValue: e.is_open,
                      "onUpdate:modelValue": o[0] || (o[0] = (u) => e.is_open = u)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                s(f, {
                  label: c(n)("h5DomainName")
                }, {
                  default: i(() => [
                    s(k, {
                      "model-value": e.request_url,
                      class: "input-width",
                      readonly: !0
                    }, {
                      append: i(() => [
                        r("div", {
                          class: "cursor-pointer",
                          onClick: o[1] || (o[1] = (u) => h(e.request_url))
                        }, _(c(n)("copy")), 1)
                      ]),
                      _: 1
                    }, 8, ["model-value"]),
                    r("span", {
                      class: "ml-2 cursor-pointer visit-btn",
                      onClick: x
                    }, _(c(n)("clickVisit")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }),
        r("div", A, [
          r("div", G, [
            s(V, {
              type: "primary",
              loading: a.value,
              onClick: o[2] || (o[2] = (u) => C(d.value))
            }, {
              default: i(() => [
                R(_(c(n)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
const ne = /* @__PURE__ */ U(J, [["__scopeId", "data-v-8a5349bf"]]);
export {
  ne as default
};
