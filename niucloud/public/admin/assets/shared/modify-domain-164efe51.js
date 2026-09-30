import { defineComponent as E, ref as g, reactive as k, computed as F, resolveComponent as f, resolveDirective as N, openBlock as w, createBlock as _, unref as t, withCtx as i, createElementVNode as R, createVNode as n, createTextVNode as h, toDisplayString as y, withDirectives as j } from "vue";
import { aH as B, t as d, aI as O } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const S = { class: "dialog-footer" }, L = /* @__PURE__ */ E({
  __name: "modify-domain",
  emits: ["complete"],
  setup(T, { expose: q, emit: x }) {
    const s = g(!1), m = g(!1), V = {
      requestdomain: "",
      wsrequestdomain: "",
      uploaddomain: "",
      downloaddomain: "",
      tcpdomain: "",
      udpdomain: ""
    }, a = k({ ...V }), b = g(), U = F(() => ({
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
    })), p = (o, e, l, u) => {
      if (B.empty(e))
        l();
      else {
        let c = !0;
        e.split(";").forEach((v) => {
          v.startsWith(u) || (c = !1, l(new Error(d("domainError"))));
        }), c && l();
      }
    }, D = async (o) => {
      m.value || !o || await o.validate(async (e) => {
        if (e) {
          if (m.value)
            return;
          m.value = !0;
          const l = a;
          O(l).then((u) => {
            m.value = !1, s.value = !1, x("complete", l);
          }).catch(() => {
            m.value = !1;
          });
        }
      });
    };
    return q({
      showDialog: s,
      setFormData: async (o = null) => {
        m.value = !1, Object.assign(a, V), o && Object.keys(a).forEach((e) => {
          o[e] != null && (a[e] = o[e]);
        });
      }
    }), (o, e) => {
      const l = f("el-input"), u = f("el-form-item"), c = f("el-form"), v = f("el-button"), P = f("el-dialog"), C = N("loading");
      return w(), _(P, {
        modelValue: s.value,
        "onUpdate:modelValue": e[8] || (e[8] = (r) => s.value = r),
        title: t(d)("functionSetting"),
        width: "700px",
        "destroy-on-close": !0
      }, {
        footer: i(() => [
          R("span", S, [
            n(v, {
              onClick: e[6] || (e[6] = (r) => s.value = !1)
            }, {
              default: i(() => [
                h(y(t(d)("cancel")), 1)
              ]),
              _: 1
            }),
            n(v, {
              type: "primary",
              loading: m.value,
              onClick: e[7] || (e[7] = (r) => D(b.value))
            }, {
              default: i(() => [
                h(y(t(d)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: i(() => [
          j((w(), _(c, {
            model: a,
            "label-width": "180px",
            ref_key: "formRef",
            ref: b,
            rules: t(U),
            class: "page-form pr-[100px]"
          }, {
            default: i(() => [
              n(u, {
                label: t(d)("requestUrl"),
                prop: "requestdomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.requestdomain,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => a.requestdomain = r),
                    placeholder: t(d)("requestdomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: t(d)("socketUrl"),
                prop: "wsrequestdomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.wsrequestdomain,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => a.wsrequestdomain = r),
                    placeholder: t(d)("wsrequestdomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: t(d)("uploadUrl"),
                prop: "uploaddomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.uploaddomain,
                    "onUpdate:modelValue": e[2] || (e[2] = (r) => a.uploaddomain = r),
                    placeholder: t(d)("uploaddomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: t(d)("downloadUrl"),
                prop: "downloaddomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.downloaddomain,
                    "onUpdate:modelValue": e[3] || (e[3] = (r) => a.downloaddomain = r),
                    placeholder: t(d)("downloaddomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: t(d)("udpUrl"),
                prop: "udpdomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.udpdomain,
                    "onUpdate:modelValue": e[4] || (e[4] = (r) => a.udpdomain = r),
                    placeholder: t(d)("udpdomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: t(d)("tcpUrl"),
                prop: "tcpdomain"
              }, {
                default: i(() => [
                  n(l, {
                    modelValue: a.tcpdomain,
                    "onUpdate:modelValue": e[5] || (e[5] = (r) => a.tcpdomain = r),
                    placeholder: t(d)("tcpdomainPlaceholder"),
                    type: "textarea"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [C, m.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  L as default
};
