import { defineComponent as g, computed as u, resolveComponent as d, openBlock as x, createBlock as V, mergeProps as y, unref as l, withCtx as i, renderSlot as S, createVNode as R, isRef as T, createTextVNode as v, toDisplayString as U } from "vue";
import { aR as n, aS as I, m as k, t as c } from "./core-shared-c6ad4e77.js";
import { ElMessage as m } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const K = /* @__PURE__ */ g({
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
  setup(_, { emit: f }) {
    const s = _, a = u({
      get() {
        return s.modelValue;
      },
      set(e) {
        f("update:modelValue", e);
      }
    }), E = u(() => {
      const e = {};
      e[n.VITE_REQUEST_HEADER_TOKEN_KEY] = I(), e[n.VITE_REQUEST_HEADER_SITEID_KEY] = k.get("siteId") || 0;
      const t = n.VITE_APP_BASE_URL || "/adminapi/";
      return {
        action: `${t.endsWith("/") ? t : `${t}/`}${s.api}`,
        showFileList: !1,
        accept: s.accept,
        headers: e,
        onSuccess: (o, r) => {
          if (o.code != null && o.code != 1) {
            m({ message: o.msg, type: "error" });
            return;
          }
          a.value = o.data.url, m({ message: c("upload.success"), type: "success" });
        }
      };
    });
    return (e, t) => {
      const p = d("el-input"), o = d("el-upload");
      return x(), V(o, y(l(E), { class: "w-full upload-file" }), {
        default: i(() => [
          S(e.$slots, "default", {}, () => [
            R(p, {
              modelValue: l(a),
              "onUpdate:modelValue": t[0] || (t[0] = (r) => T(a) ? a.value = r : null),
              class: "w-full",
              readonly: !0,
              title: l(a)
            }, {
              append: i(() => [
                v(U(l(c)("upload.root")), 1)
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
  K as default
};
