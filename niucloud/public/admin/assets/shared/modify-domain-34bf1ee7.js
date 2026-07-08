import { defineComponent as k, ref as g, reactive as F, computed as N, resolveComponent as f, resolveDirective as R, openBlock as w, createBlock as _, unref as r, withCtx as i, createElementVNode as j, createVNode as n, createTextVNode as h, toDisplayString as y, withDirectives as B } from "vue";
import { az as O, t, aA as S } from "./core-shared-9b1e55e9.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const T = { class: "dialog-footer" }, M = /* @__PURE__ */ k({
  __name: "modify-domain",
  emits: ["complete"],
  setup(W, { expose: x, emit: q }) {
    const s = g(!1), u = g(!1), V = {
      requestdomain: "",
      wsrequestdomain: "",
      uploaddomain: "",
      downloaddomain: "",
      tcpdomain: "",
      udpdomain: ""
    }, a = F({ ...V }), b = g(), U = q, D = N(() => ({
      requestdomain: [
        {
          validator: (o, e, l) => p(o, e, l, "https://"),
          trigger: "blur"
        }
      ],
      uploaddomain: [
        {
          validator: (o, e, l) => p(o, e, l, "https://"),
          trigger: "blur"
        }
      ],
      downloaddomain: [
        {
          validator: (o, e, l) => p(o, e, l, "https://"),
          trigger: "blur"
        }
      ],
      wsrequestdomain: [
        {
          validator: (o, e, l) => p(o, e, l, "wss://"),
          trigger: "blur"
        }
      ],
      tcpdomain: [
        {
          validator: (o, e, l) => p(o, e, l, "tcp://"),
          trigger: "blur"
        }
      ],
      udpdomain: [
        {
          validator: (o, e, l) => p(o, e, l, "udp://"),
          trigger: "blur"
        }
      ]
    })), p = (o, e, l, m) => {
      if (O.empty(e))
        l();
      else {
        let c = !0;
        e.split(";").forEach((v) => {
          v.startsWith(m) || (c = !1, l(new Error(t("domainError"))));
        }), c && l();
      }
    }, P = async (o) => {
      u.value || !o || await o.validate(async (e) => {
        if (e) {
          if (u.value)
            return;
          u.value = !0;
          const l = a;
          S(l).then((m) => {
            u.value = !1, s.value = !1, U("complete", l);
          }).catch(() => {
            u.value = !1;
          });
        }
      });
    };
    return x({
      showDialog: s,
      setFormData: async (o = null) => {
        u.value = !1, Object.assign(a, V), o && Object.keys(a).forEach((e) => {
          o[e] != null && (a[e] = o[e]);
        });
      }
    }), (o, e) => {
      const l = f("el-input"), m = f("el-form-item"), c = f("el-form"), v = f("el-button"), C = f("el-dialog"), E = R("loading");
      return w(), _(C, {
        modelValue: s.value,
        "onUpdate:modelValue": e[8] || (e[8] = (d) => s.value = d),
        title: r(t)("functionSetting"),
        width: "700px",
        "destroy-on-close": !0
      }, {
        footer: i(() => [
          j("span", T, [
            n(v, {
              onClick: e[6] || (e[6] = (d) => s.value = !1)
            }, {
              default: i(() => [
                h(y(r(t)("cancel")), 1)
              ]),
              _: 1
            }),
            n(v, {
              type: "primary",
              loading: u.value,
              onClick: e[7] || (e[7] = (d) => P(b.value))
            }, {
              default: i(() => [
                h(y(r(t)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: i(() => [
          B((w(), _(c, {
            model: a,
            "label-width": "180px",
            ref_key: "formRef",
            ref: b,
            rules: D.value,
            class: "page-form pr-[100px]"
          }, {
            default: i(() => [
              n(m, {
                label: r(t)("requestUrl"),
                prop: "requestdomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.requestdomain,
                    "onUpdate:modelValue": e[0] || (e[0] = (d) => a.requestdomain = d),
                    placeholder: r(t)("requestdomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: r(t)("socketUrl"),
                prop: "wsrequestdomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.wsrequestdomain,
                    "onUpdate:modelValue": e[1] || (e[1] = (d) => a.wsrequestdomain = d),
                    placeholder: r(t)("wsrequestdomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: r(t)("uploadUrl"),
                prop: "uploaddomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.uploaddomain,
                    "onUpdate:modelValue": e[2] || (e[2] = (d) => a.uploaddomain = d),
                    placeholder: r(t)("uploaddomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: r(t)("downloadUrl"),
                prop: "downloaddomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.downloaddomain,
                    "onUpdate:modelValue": e[3] || (e[3] = (d) => a.downloaddomain = d),
                    placeholder: r(t)("downloaddomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: r(t)("udpUrl"),
                prop: "udpdomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.udpdomain,
                    "onUpdate:modelValue": e[4] || (e[4] = (d) => a.udpdomain = d),
                    placeholder: r(t)("udpdomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: r(t)("tcpUrl"),
                prop: "tcpdomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.tcpdomain,
                    "onUpdate:modelValue": e[5] || (e[5] = (d) => a.tcpdomain = d),
                    placeholder: r(t)("tcpdomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [E, u.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  M as default
};
