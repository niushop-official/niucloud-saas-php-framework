import { defineComponent as g, computed as f, resolveComponent as n, openBlock as E, createBlock as y, mergeProps as v, withCtx as l, renderSlot as S, createVNode as T, createTextVNode as w, toDisplayString as V, unref as h } from "vue";
import { aS as x, m as A, t as s, aR as u } from "./core-shared-c6ad4e77.js";
import { ElMessage as d } from "element-plus";
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
      default: "sys/audio"
    }
  },
  emits: ["update:modelValue"],
  setup(p, { emit: m }) {
    const i = p, c = f({
      get() {
        return i.modelValue;
      },
      set(e) {
        m("update:modelValue", e);
      }
    }), a = {
      action: `${u.VITE_APP_BASE_URL || "/adminapi/"}${i.api}`,
      showFileList: !1,
      headers: {},
      accept: "audio/*,.mp3,.wav,.ogg,.m4a,.flac,.aac,.wma",
      beforeUpload: (e) => {
        const o = ["audio/mp3", "audio/wav", "audio/ogg", "audio/m4a", "audio/flac", "audio/aac", "audio/wma", "audio/mpeg"], t = [".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aac", ".wma"];
        return o.includes(e.type) || t.some((_) => e.name.toLowerCase().endsWith(_)) ? !0 : (d({ message: s("请上传音频文件"), type: "error" }), !1);
      },
      onSuccess: (e, o) => {
        if (e.code != null && e.code != 1) {
          d({ message: e.msg, type: "error" });
          return;
        }
        c.value = e.data.url, d({ message: s("upload.success"), type: "success" });
      }
    };
    return a.headers[u.VITE_REQUEST_HEADER_TOKEN_KEY] = x(), a.headers[u.VITE_REQUEST_HEADER_SITEID_KEY] = A.get("siteId") || 0, (e, o) => {
      const t = n("el-button"), r = n("el-upload");
      return E(), y(r, v(a, { class: "upload-file" }), {
        default: l(() => [
          S(e.$slots, "default", {}, () => [
            T(t, { type: "primary" }, {
              default: l(() => [
                w(V(h(s)("上传音频")), 1)
              ]),
              _: 1
            })
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
