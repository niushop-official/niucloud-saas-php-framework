import { defineComponent as i, ref as u, computed as _, resolveComponent as d, openBlock as f, createBlock as E, mergeProps as g, unref as R, withCtx as S, renderSlot as T } from "vue";
import { aR as p, aS as h, m as v } from "./core-shared-c6ad4e77.js";
import { ElMessage as y } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const V = /* @__PURE__ */ i({
  __name: "upload-media",
  props: {
    type: {
      type: String,
      default: "image"
    }
  },
  emits: ["success"],
  setup(n, { emit: l }) {
    const r = n, a = u(null), c = _(() => {
      const e = {};
      return e[p.VITE_REQUEST_HEADER_TOKEN_KEY] = h(), e[p.VITE_REQUEST_HEADER_SITEID_KEY] = v.get("siteId") || 0, {
        action: `${p.VITE_APP_BASE_URL}/wechat/media/${r.type}`,
        multiple: !0,
        headers: e,
        accept: r.type == "image" ? ".bmp,.png,.jpeg,.jpg,.gif" : ".mp4",
        onSuccess: (o, t, I) => {
          var s, m;
          o.code >= 1 ? (l("success", o.data), (s = a.value) == null || s.handleRemove(t)) : (t.status = "fail", (m = a.value) == null || m.handleRemove(t), y({ message: o.msg, type: "error" }));
        }
      };
    });
    return (e, o) => {
      const t = d("el-upload");
      return f(), E(t, g(R(c), {
        ref_key: "uploadRef",
        ref: a
      }), {
        default: S(() => [
          T(e.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
export {
  V as default
};
