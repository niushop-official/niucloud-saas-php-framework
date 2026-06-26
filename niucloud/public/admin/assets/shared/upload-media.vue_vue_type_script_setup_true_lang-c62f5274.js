import { defineComponent as _, ref as i, computed as d, resolveComponent as f, openBlock as E, createBlock as g, mergeProps as R, withCtx as T, renderSlot as v } from "vue";
import { aJ as s, aK as S, s as h } from "./core-shared-ca1fcae5.js";
import { ElMessage as y } from "element-plus";
const K = /* @__PURE__ */ _({
  __name: "upload-media",
  props: {
    type: {
      type: String,
      default: "image"
    }
  },
  emits: ["success"],
  setup(m, { emit: c }) {
    const p = m, l = c, a = i(null), u = d(() => {
      const e = {};
      return e[s.VITE_REQUEST_HEADER_TOKEN_KEY] = S(), e[s.VITE_REQUEST_HEADER_SITEID_KEY] = h.get("siteId") || 0, {
        action: `${s.VITE_APP_BASE_URL}/wechat/media/${p.type}`,
        multiple: !0,
        headers: e,
        accept: p.type == "image" ? ".bmp,.png,.jpeg,.jpg,.gif" : ".mp4",
        onSuccess: (o, t, I) => {
          var n, r;
          o.code >= 1 ? (l("success", o.data), (n = a.value) == null || n.handleRemove(t)) : (t.status = "fail", (r = a.value) == null || r.handleRemove(t), y({ message: o.msg, type: "error" }));
        }
      };
    });
    return (e, o) => {
      const t = f("el-upload");
      return E(), g(t, R(u.value, {
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
  K as _
};
