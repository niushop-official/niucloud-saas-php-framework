import { defineComponent as f, computed as E, resolveComponent as n, openBlock as y, createBlock as v, mergeProps as T, withCtx as l, renderSlot as w, createVNode as S, createTextVNode as V, toDisplayString as h, unref as x } from "vue";
import { aK as A, s as I, t as s, aJ as i } from "./core-shared-c8d7774e.js";
import { ElMessage as u } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const L = /* @__PURE__ */ f({
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
    const d = p, c = m, _ = E({
      get() {
        return d.modelValue;
      },
      set(e) {
        c("update:modelValue", e);
      }
    }), a = {
      action: `${i.VITE_APP_BASE_URL || "/adminapi/"}${d.api}`,
      showFileList: !1,
      headers: {},
      accept: "audio/*,.mp3,.wav,.ogg,.m4a,.flac,.aac,.wma",
      beforeUpload: (e) => {
        const o = ["audio/mp3", "audio/wav", "audio/ogg", "audio/m4a", "audio/flac", "audio/aac", "audio/wma", "audio/mpeg"], t = [".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aac", ".wma"];
        return o.includes(e.type) || t.some((g) => e.name.toLowerCase().endsWith(g)) ? !0 : (u({ message: s("请上传音频文件"), type: "error" }), !1);
      },
      onSuccess: (e, o) => {
        if (e.code != null && e.code != 1) {
          u({ message: e.msg, type: "error" });
          return;
        }
        _.value = e.data.url, u({ message: s("upload.success"), type: "success" });
      }
    };
    return a.headers[i.VITE_REQUEST_HEADER_TOKEN_KEY] = A(), a.headers[i.VITE_REQUEST_HEADER_SITEID_KEY] = I.get("siteId") || 0, (e, o) => {
      const t = n("el-button"), r = n("el-upload");
      return y(), v(r, T(a, { class: "upload-file" }), {
        default: l(() => [
          w(e.$slots, "default", {}, () => [
            S(t, { type: "primary" }, {
              default: l(() => [
                V(h(x(s)("上传音频")), 1)
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
  L as default
};
