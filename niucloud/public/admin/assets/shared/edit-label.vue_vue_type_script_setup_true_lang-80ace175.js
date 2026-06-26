import { defineComponent as U, ref as c, reactive as F, computed as R, resolveComponent as u, resolveDirective as T, openBlock as V, createBlock as h, unref as r, withCtx as s, createElementVNode as j, createVNode as i, createTextVNode as y, toDisplayString as x, withDirectives as k } from "vue";
import { t, bE as B, d0 as S, d1 as $, d2 as q } from "./core-shared-ca1fcae5.js";
const I = { class: "dialog-footer" }, H = /* @__PURE__ */ U({
  __name: "edit-label",
  emits: ["complete"],
  setup(K, { expose: D, emit: M }) {
    const m = c(!1), n = c(!1), f = c(!1);
    let b = "";
    const _ = {
      label_id: "",
      label_name: "",
      memo: "",
      sort: 0
    }, a = F({ ..._ }), v = c(), N = R(() => ({
      label_name: [
        { required: !0, message: t("labelNamePlaceholder"), trigger: "blur" }
      ],
      sort: [
        { validator: C, trigger: "blur" }
      ]
    })), C = (d, e, l) => {
      e < 0 ? l(new Error(t("sortVerifyOne"))) : e.toString().indexOf(".") != -1 ? l(new Error(t("sortVerifyTwo"))) : l();
    }, L = M, E = async (d) => {
      if (n.value || !d)
        return;
      const e = a.label_id ? S : $;
      await d.validate(async (l) => {
        if (l) {
          if (n.value = !0, f.value)
            return;
          f.value = !0, e(a).then((g) => {
            n.value = !1, f.value = !1, m.value = !1, L("complete");
          }).catch(() => {
            n.value = !1, f.value = !1;
          });
        }
      });
    };
    return D({
      showDialog: m,
      setFormData: async (d = null) => {
        if (n.value = !0, Object.assign(a, _), b = t("addMemberLabel"), d) {
          b = t("updateMemberLabel");
          const e = await (await q(d.label_id)).data;
          e && Object.keys(a).forEach((l) => {
            e[l] != null && (a[l] = e[l]);
          });
        }
        n.value = !1;
      }
    }), (d, e) => {
      const l = u("el-input"), p = u("el-form-item"), g = u("el-form"), w = u("el-button"), O = u("el-dialog"), P = T("loading");
      return V(), h(O, {
        modelValue: m.value,
        "onUpdate:modelValue": e[6] || (e[6] = (o) => m.value = o),
        title: r(b),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: s(() => [
          j("span", I, [
            i(w, {
              onClick: e[4] || (e[4] = (o) => m.value = !1)
            }, {
              default: s(() => [
                y(x(r(t)("cancel")), 1)
              ]),
              _: 1
            }),
            i(w, {
              type: "primary",
              loading: n.value,
              onClick: e[5] || (e[5] = (o) => E(v.value))
            }, {
              default: s(() => [
                y(x(r(t)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: s(() => [
          k((V(), h(g, {
            model: a,
            "label-width": "90px",
            ref_key: "formRef",
            ref: v,
            rules: N.value,
            class: "page-form"
          }, {
            default: s(() => [
              i(p, {
                label: r(t)("labelName"),
                prop: "label_name"
              }, {
                default: s(() => [
                  i(l, {
                    modelValue: a.label_name,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => a.label_name = o),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: r(t)("labelNamePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              i(p, {
                label: r(t)("memo")
              }, {
                default: s(() => [
                  i(l, {
                    modelValue: a.memo,
                    "onUpdate:modelValue": e[1] || (e[1] = (o) => a.memo = o),
                    modelModifiers: { trim: !0 },
                    type: "textarea",
                    rows: "4",
                    clearable: "",
                    placeholder: r(t)("memoPlaceholder"),
                    class: "input-width",
                    maxlength: "200",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              i(p, {
                label: r(t)("sort"),
                prop: "sort"
              }, {
                default: s(() => [
                  i(l, {
                    modelValue: a.sort,
                    "onUpdate:modelValue": e[2] || (e[2] = (o) => a.sort = o),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    maxlength: "8",
                    "show-word-limit": "",
                    placeholder: r(t)("sortPlaceholder"),
                    class: "input-width",
                    onKeyup: e[3] || (e[3] = (o) => r(B)(o))
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [P, n.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  H as _
};
