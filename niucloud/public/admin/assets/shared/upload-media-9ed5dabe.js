import { defineComponent as u, ref as _, computed as d, resolveComponent as f, openBlock as E, createBlock as g, mergeProps as R, withCtx as T, renderSlot as v } from "vue";
import { aJ as s, aK as S, s as h } from "./core-shared-e1759ce4.js";
import { ElMessage as y } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const V = /* @__PURE__ */ u({
  __name: "upload-media",
  props: {
    type: {
      type: String,
      default: "image"
    }
  },
  emits: ["success"],
  setup(n, { emit: l }) {
    const p = n, c = l, a = _(null), i = d(() => {
      const e = {};
      return e[s.VITE_REQUEST_HEADER_TOKEN_KEY] = S(), e[s.VITE_REQUEST_HEADER_SITEID_KEY] = h.get("siteId") || 0, {
        action: `${s.VITE_APP_BASE_URL}/wechat/media/${p.type}`,
        multiple: !0,
        headers: e,
        accept: p.type == "image" ? ".bmp,.png,.jpeg,.jpg,.gif" : ".mp4",
        onSuccess: (o, t, I) => {
          var r, m;
          o.code >= 1 ? (c("success", o.data), (r = a.value) == null || r.handleRemove(t)) : (t.status = "fail", (m = a.value) == null || m.handleRemove(t), y({ message: o.msg, type: "error" }));
        }
      };
    });
    return (e, o) => {
      const t = f("el-upload");
      return E(), g(t, R(i.value, {
        ref_key: "uploadRef",
        ref: a
      }), {
        default: T(() => [
          v(e.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
export {
  V as default
};
