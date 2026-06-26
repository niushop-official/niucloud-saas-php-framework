import { defineComponent as g, computed as r, resolveComponent as n, openBlock as V, createBlock as x, mergeProps as S, withCtx as p, renderSlot as v, createVNode as y, createTextVNode as T, toDisplayString as R, unref as A } from "vue";
import { aJ as o, aK as I, s as U, t as d } from "./core-shared-ca1fcae5.js";
import { ElMessage as c } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const $ = /* @__PURE__ */ g({
  __name: "index",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    api: {
      type: String,
      default: "sys/document/document"
    },
    accept: {
      type: String,
      default: ".doc,.docx,.xml,.txt,.pem,.zip,.rar,.7z,.crt,.key,.xls,.xlsx"
    }
  },
  emits: ["update:modelValue"],
  setup(i, { emit: m }) {
    const a = i, _ = m, l = r({
      get() {
        return a.modelValue;
      },
      set(e) {
        _("update:modelValue", e);
      }
    }), E = r(() => {
      const e = {};
      return e[o.VITE_REQUEST_HEADER_TOKEN_KEY] = I(), e[o.VITE_REQUEST_HEADER_SITEID_KEY] = U.get("siteId") || 0, {
        action: `${o.VITE_APP_BASE_URL.substr(-1) == "/" ? o.VITE_APP_BASE_URL : `${o.VITE_APP_BASE_URL}/`}${a.api}`,
        showFileList: !1,
        accept: a.accept,
        headers: e,
        onSuccess: (t, u) => {
          if (t.code != null && t.code != 1) {
            c({ message: t.msg, type: "error" });
            return;
          }
          l.value = t.data.url, c({ message: d("upload.success"), type: "success" });
        }
      };
    });
    return (e, s) => {
      const t = n("el-input"), u = n("el-upload");
      return V(), x(u, S(E.value, { class: "w-full upload-file" }), {
        default: p(() => [
          v(e.$slots, "default", {}, () => [
            y(t, {
              modelValue: l.value,
              "onUpdate:modelValue": s[0] || (s[0] = (f) => l.value = f),
              class: "w-full",
              readonly: !0,
              title: l.value
            }, {
              append: p(() => [
                T(R(A(d)("upload.root")), 1)
              ]),
              _: 1
            }, 8, ["modelValue", "title"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
export {
  $ as default
};
