import { defineComponent as f, computed as E, resolveComponent as n, openBlock as y, createBlock as v, mergeProps as T, withCtx as l, renderSlot as w, createVNode as S, createTextVNode as V, toDisplayString as h, unref as x } from "vue";
import { aJ as s, t as u, aK as A, s as I } from "./core-shared-ca1fcae5.js";
import { ElMessage as i } from "element-plus";
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
    }), o = {
      action: `${s.VITE_APP_BASE_URL}/${d.api}`,
      showFileList: !1,
      headers: {},
      accept: "audio/*,.mp3,.wav,.ogg,.m4a,.flac,.aac,.wma",
      beforeUpload: (e) => {
        const a = ["audio/mp3", "audio/wav", "audio/ogg", "audio/m4a", "audio/flac", "audio/aac", "audio/wma", "audio/mpeg"], t = [".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aac", ".wma"];
        return a.includes(e.type) || t.some((g) => e.name.toLowerCase().endsWith(g)) ? !0 : (i({ message: u("请上传音频文件"), type: "error" }), !1);
      },
      onSuccess: (e, a) => {
        if (e.code != null && e.code != 1) {
          i({ message: e.msg, type: "error" });
          return;
        }
        _.value = e.data.url, i({ message: u("upload.success"), type: "success" });
      }
    };
    return o.headers[s.VITE_REQUEST_HEADER_TOKEN_KEY] = A(), o.headers[s.VITE_REQUEST_HEADER_SITEID_KEY] = I.get("siteId") || 0, (e, a) => {
      const t = n("el-button"), r = n("el-upload");
      return y(), v(r, T(o, { class: "upload-file" }), {
        default: l(() => [
          w(e.$slots, "default", {}, () => [
            S(t, { type: "primary" }, {
              default: l(() => [
                V(h(x(u)("上传音频")), 1)
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
