import { defineComponent as $, toRefs as J, ref as D, reactive as M, computed as b, onMounted as q, watch as A, resolveComponent as f, resolveDirective as G, openBlock as _, createBlock as h, resolveDynamicComponent as H, unref as e, normalizeProps as K, guardReactiveProps as L, createSlots as Q, withCtx as n, withDirectives as W, normalizeClass as C, createVNode as d, createTextVNode as g, toDisplayString as m, createCommentVNode as V, createElementBlock as X, createElementVNode as Y } from "vue";
import { ElDialog as Z } from "element-plus";
import { t as i, eI as ee, eJ as te } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const oe = {
  key: 1,
  class: "storage-form-full text-[12px] leading-[18px] text-[var(--el-text-color-secondary)]"
}, ae = { class: "dialog-footer" }, de = /* @__PURE__ */ $({
  __name: "storage-local",
  props: {
    inline: { type: Boolean, default: !1 },
    // 内嵌模式下是否展示启用开关（平台端左右布局需要）
    showIsUse: { type: Boolean, default: !1 },
    // 内嵌模式下的初始配置数据
    configData: { type: Object, default: null }
  },
  emits: ["complete"],
  setup(k, { expose: S, emit: U }) {
    const l = k, { inline: c, showIsUse: B } = J(l), u = D(!1), r = D(!l.inline), w = {
      is_use: "",
      storage_type: ""
    }, a = M({ ...w }), p = D(), O = b(() => ({})), R = b(() => l.inline ? "div" : Z), j = b(() => l.inline ? {} : {
      modelValue: u.value,
      "onUpdate:modelValue": (o) => {
        u.value = o;
      },
      title: i("localStorage"),
      width: "580px",
      destroyOnClose: !0
    }), E = async (o) => {
      r.value || !o || await o.validate(async (t) => {
        t && (r.value = !0, ee(a).then(() => {
          r.value = !1, u.value = !1, U("complete");
        }).catch(() => {
          r.value = !1;
        }));
      });
    }, v = async (o = null) => {
      if (r.value = !0, Object.assign(a, w), o)
        if (l.inline)
          Object.keys(a).forEach((t) => {
            o[t] != null && (a[t] = String(o[t]));
          });
        else {
          const t = await (await te(o.storage_type)).data;
          Object.keys(a).forEach((s) => {
            t[s] != null && (a[s] = t[s]);
          });
        }
      r.value = !1;
    }, I = () => ({ ...a }), N = async () => {
      if (!p.value)
        return !0;
      try {
        return await p.value.validate(), !0;
      } catch {
        return !1;
      }
    };
    return q(() => {
      l.inline && v(l.configData);
    }), A(() => l.configData, (o) => {
      l.inline && v(o);
    }), S({
      showDialog: u,
      setFormData: v,
      getFormData: I,
      validate: N
    }), (o, t) => {
      const s = f("el-radio"), F = f("el-radio-group"), P = f("el-form-item"), T = f("el-form"), x = f("el-button"), z = G("loading");
      return _(), h(H(e(R)), K(L(e(j))), Q({
        default: n(() => [
          W((_(), h(T, {
            model: a,
            "label-position": e(c) ? "top" : "right",
            "label-width": "140px",
            ref_key: "formRef",
            ref: p,
            rules: e(O),
            class: C(e(c) ? "page-form storage-form-inline" : "page-form")
          }, {
            default: n(() => [
              !e(c) || e(B) ? (_(), h(P, {
                key: 0,
                label: e(i)("isUse"),
                class: C({ "storage-form-full": e(c) })
              }, {
                default: n(() => [
                  d(F, {
                    modelValue: a.is_use,
                    "onUpdate:modelValue": t[0] || (t[0] = (y) => a.is_use = y)
                  }, {
                    default: n(() => [
                      d(s, { label: "1" }, {
                        default: n(() => [
                          g(m(e(i)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      d(s, { label: "0" }, {
                        default: n(() => [
                          g(m(e(i)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label", "class"])) : V("", !0),
              e(c) ? (_(), X("div", oe, m(e(i)("localStorageTips")), 1)) : V("", !0)
            ]),
            _: 1
          }, 8, ["model", "label-position", "rules", "class"])), [
            [z, r.value]
          ])
        ]),
        _: 2
      }, [
        e(c) ? void 0 : {
          name: "footer",
          fn: n(() => [
            Y("span", ae, [
              d(x, {
                onClick: t[1] || (t[1] = (y) => u.value = !1)
              }, {
                default: n(() => [
                  g(m(e(i)("cancel")), 1)
                ]),
                _: 1
              }),
              d(x, {
                type: "primary",
                loading: r.value,
                onClick: t[2] || (t[2] = (y) => E(p.value))
              }, {
                default: n(() => [
                  g(m(e(i)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          key: "0"
        }
      ]), 1040);
    };
  }
});
export {
  de as default
};
