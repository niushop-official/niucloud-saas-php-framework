import { defineComponent as g, computed as u, resolveComponent as r, openBlock as x, createBlock as V, mergeProps as v, withCtx as d, renderSlot as y, createVNode as S, createTextVNode as T, toDisplayString as R, unref as U } from "vue";
import { aJ as s, aK as I, s as k, t as i } from "./core-shared-9b1e55e9.js";
import { ElMessage as c } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const h = /* @__PURE__ */ g({
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
  setup(m, { emit: _ }) {
    const l = m, f = _, a = u({
      get() {
        return l.modelValue;
      },
      set(e) {
        f("update:modelValue", e);
      }
    }), E = u(() => {
      const e = {};
      e[s.VITE_REQUEST_HEADER_TOKEN_KEY] = I(), e[s.VITE_REQUEST_HEADER_SITEID_KEY] = k.get("siteId") || 0;
      const t = s.VITE_APP_BASE_URL || "/adminapi/";
      return {
        action: `${t.endsWith("/") ? t : `${t}/`}${l.api}`,
        showFileList: !1,
        accept: l.accept,
        headers: e,
        onSuccess: (o, p) => {
          if (o.code != null && o.code != 1) {
            c({ message: o.msg, type: "error" });
            return;
          }
          a.value = o.data.url, c({ message: i("upload.success"), type: "success" });
        }
      };
    });
    return (e, t) => {
      const n = r("el-input"), o = r("el-upload");
      return x(), V(o, v(E.value, { class: "w-full upload-file" }), {
        default: d(() => [
          y(e.$slots, "default", {}, () => [
            S(n, {
              modelValue: a.value,
              "onUpdate:modelValue": t[0] || (t[0] = (p) => a.value = p),
              class: "w-full",
              readonly: !0,
              title: a.value
            }, {
              append: d(() => [
                T(R(U(i)("upload.root")), 1)
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
  h as default
};
