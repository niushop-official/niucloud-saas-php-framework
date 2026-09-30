import { defineComponent as le, computed as se, ref as V, reactive as ie, resolveComponent as F, openBlock as Y, createElementBlock as X, createElementVNode as m, renderSlot as fe, unref as _, createTextVNode as B, toDisplayString as M, createVNode as W, withCtx as C, normalizeStyle as O, Fragment as N, renderList as R, createCommentVNode as P, withModifiers as U, pushScopeId as ne, popScopeId as ae } from "vue";
import { t as y, j as ce, Y as ue, a as pe } from "./core-shared-c6ad4e77.js";
import { ElMessage as q } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const de = (D) => (ne("data-v-c8af5e8c"), D = D(), ae(), D), re = {
  key: 0,
  class: "cursor-pointer"
}, he = { class: "text-primary p-[4px]" }, me = {
  key: 1,
  class: "cursor-pointer"
}, ve = { class: "flex" }, ge = ["id", "onMousedown"], _e = /* @__PURE__ */ de(() => /* @__PURE__ */ m("span", { class: "p-[4px]" }, "|", -1)), xe = ["onMousedown"], ye = ["onMousedown"], be = ["onMousedown"], we = ["onMousedown"], ke = { class: "mb-[10px] text-lg text-black" }, Te = { class: "overflow-y-auto h-[300px]" }, Me = {
  key: 0,
  class: "mb-[16px]"
}, He = { class: "flex items-center" }, Ye = { class: "dialog-footer" }, Xe = /* @__PURE__ */ le({
  __name: "index",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(D, { expose: G, emit: J }) {
    const K = D, H = se({
      get() {
        return K.modelValue;
      },
      set(h) {
        J("update:modelValue", h);
      }
    }), A = V(!1), b = V(400), g = V(400), p = ie([]), $ = V(1), Q = V(0.25), E = V(100), I = V(100), z = V(4), j = () => {
      let h = p.length % z.value * E.value, f = Math.floor(p.length / z.value) * I.value, c = f + I.value / 2;
      (f >= g.value || c >= g.value) && (f = 0, h = 0), p.push({
        left: h,
        top: f,
        width: E.value,
        height: I.value,
        unit: "px",
        link: {
          name: ""
        }
      });
    }, Z = (h, f) => {
      const c = document.getElementById("box_" + f), s = h.clientX - c.offsetLeft, T = h.clientY - c.offsetTop;
      document.onmousemove = function(r) {
        c.style.left = r.clientX - s + "px", c.style.top = r.clientY - T + "px", r.clientX - s < 0 && (c.style.left = 0), r.clientX - s > b.value - c.offsetWidth && (c.style.left = b.value - c.offsetWidth + "px"), r.clientY - T < 0 && (c.style.top = 0), r.clientY - T > g.value - c.offsetHeight && (c.style.top = g.value - c.offsetHeight + "px"), p[f].left = c.offsetLeft, p[f].top = c.offsetTop, p[f].width = c.offsetWidth, p[f].height = c.offsetHeight, p[f].unit = "px";
      }, document.onmouseup = function(r) {
        document.onmousemove = null;
      };
    }, S = (h, f) => {
      const c = h;
      c.stopPropagation();
      const s = document.getElementById("box_" + f), T = h.target.className, r = s.offsetWidth, L = s.offsetHeight, x = c.clientX, u = c.clientY, a = s.offsetLeft, n = s.offsetTop, o = 50, l = 50;
      document.onmousemove = function(oe) {
        const d = oe;
        if (T == "box1") {
          let e = r - (d.clientX - x);
          const w = b.value;
          let t = L - (d.clientY - u);
          const k = g.value - n;
          let i = a + (d.clientX - x), v = n + (d.clientY - u);
          e < o && (e = o), e > w && (e = w), t < l && (t = l), t > k && (t = k), a == 0 && n == 0 ? e == o && t == l ? (i = o, v = l) : e == o && t > l ? i = o : e > o && t == l ? v = l : e > o && t > l : a == 0 && n > 0 ? e == o && t == l || e == o && t > l ? (i = o, v = s.offsetTop) : e > o && t == l ? v = s.offsetTop : e > o && t > l : a > 0 && n == 0 ? e == o && t == l ? (i = s.offsetLeft, v = s.offsetTop) : e == o && t > l ? (i = s.offsetLeft, v = 0) : e > o && t == l ? v = s.offsetTop : e > o && t > l : a > 0 && n > 0 && (e == o && t == l || e == o && t > l ? (i = s.offsetLeft, v = s.offsetTop) : e > o && t == l ? v = s.offsetTop : e > o && t > l), i < 0 && (i = 0, e = r - (d.clientX - x) + (a + (d.clientX - x))), v < 0 && (v = 0, t = n + (d.clientY - u) + (L - (d.clientY - u))), s.style.width = e + "px", s.style.height = t + "px", s.style.left = i + "px", s.style.top = v + "px";
        } else if (T == "box2") {
          let e = r + (d.clientX - x);
          const w = b.value - a;
          let t = L - (d.clientY - u);
          const k = g.value - n;
          let i = n + (d.clientY - u);
          e < o && (e = o), e > w && (e = w), t < l && (t = l), t > k && (t = k), a == 0 && n == 0 ? e == o && t == l ? i = l : e == o && t > l || (e > o && t == l ? i = l : e > o && t > l) : a == 0 && n > 0 ? e == o && t == l || e == o && t > l || e > o && t == l ? i = s.offsetTop : e > o && t > l : a > 0 && n == 0 ? e == o && t == l ? i = s.offsetTop : e == o && t > l ? i = 0 : e > o && t == l ? i = s.offsetTop : e > o && t > l : a > 0 && n > 0 && (e == o && t == l || e == o && t > l || e > o && t == l ? i = s.offsetTop : e > o && t > l), i < 0 && (i = 0, t = n + (d.clientY - u) + (L - (d.clientY - u))), s.style.width = e + "px", s.style.height = t + "px", s.style.top = i + "px";
        } else if (T == "box3") {
          let e = r - (d.clientX - x);
          const w = b.value;
          let t = L + (d.clientY - u);
          const k = g.value - n;
          let i = a + (d.clientX - x);
          e < o && (e = o), e > w && (e = w), t < l && (t = l), t > k && (t = k), a == 0 && n == 0 || a == 0 && n > 0 ? e == o && t == l || e == o && t > l ? i = o : e > o && t == l || e > o && t > l : (a > 0 && n == 0 || a > 0 && n > 0) && (e == o && t == l || e == o && t > l ? i = s.offsetLeft : e > o && t == l || e > o && t > l), i < 0 && (i = 0, e = r - (d.clientX - x) + (a + (d.clientX - x))), s.style.width = e + "px", s.style.height = t + "px", s.style.left = i + "px";
        } else if (T == "box4") {
          let e = r + (d.clientX - x);
          const w = b.value - a;
          let t = L + (d.clientY - u);
          const k = g.value - n;
          e < o && (e = o), e > w && (e = w), t < l && (t = l), t > k && (t = k), s.style.width = e + "px", s.style.height = t + "px";
        }
        p[f].left = s.offsetLeft, p[f].top = s.offsetTop, p[f].width = s.offsetWidth, p[f].height = s.offsetHeight, p[f].unit = "px";
      }, document.onmouseup = function() {
        document.onmousemove = null, document.onmouseup = null;
      };
    }, ee = () => {
      if (!H.value.imageUrl) {
        q({
          type: "warning",
          message: `${y("imageUrlTip")}`
        });
        return;
      }
      $.value = H.value.imgHeight / H.value.imgWidth, g.value = Math.floor(b.value * $.value), E.value = Math.floor(Q.value * g.value), I.value = E.value, z.value = Math.floor(b.value / E.value), Object.keys(H.value.heatMapData).length ? p.splice(0, p.length, ...H.value.heatMapData) : (p.splice(0, p.length), j()), A.value = !0;
    }, te = () => {
      let h = !0;
      for (let f = 0; f < p.length; f++)
        if (!p[f].link.title) {
          q({
            type: "warning",
            message: y("selectedHotArea") + (f + 1) + y("hotAreaLink")
          }), h = !1;
          break;
        }
      h && (p.forEach((f, c) => {
        const s = document.getElementById("box_" + c);
        f.width = parseFloat(s.offsetWidth / b.value * 100).toFixed(2), f.height = parseFloat(s.offsetHeight / g.value * 100).toFixed(2), f.left = parseFloat(s.offsetLeft / b.value * 100).toFixed(2), f.top = parseFloat(s.offsetTop / g.value * 100).toFixed(2), f.unit = "%";
      }), H.value.heatMapData = ue(p), A.value = !1);
    };
    return G({
      showDialog: A
    }), (h, f) => {
      const c = F("el-button"), s = F("diy-link"), T = F("icon"), r = F("el-form-item"), L = F("el-form"), x = F("el-dialog");
      return Y(), X("div", null, [
        m("div", { onClick: ee }, [
          fe(h.$slots, "default", {}, () => [
            _(H).heatMapData.length ? (Y(), X("div", re, [
              B(M(_(y)("selected")), 1),
              m("span", he, M(_(H).heatMapData.length), 1),
              B(M(_(y)("selectedAfterHotArea")), 1)
            ])) : (Y(), X("div", me, M(_(y)("addHotArea")), 1))
          ], !0)
        ]),
        W(x, {
          modelValue: A.value,
          "onUpdate:modelValue": f[1] || (f[1] = (u) => A.value = u),
          title: _(y)("hotAreaSet"),
          width: "810px",
          "destroy-on-close": !0,
          "close-on-click-modal": !1
        }, {
          footer: C(() => [
            m("span", Ye, [
              W(c, {
                onClick: f[0] || (f[0] = (u) => A.value = !1)
              }, {
                default: C(() => [
                  B(M(_(y)("cancel")), 1)
                ]),
                _: 1
              }),
              W(c, {
                type: "primary",
                onClick: te
              }, {
                default: C(() => [
                  B(M(_(y)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: C(() => [
            m("div", ve, [
              m("div", {
                class: "hot-area-img-wrap content-box relative bg-gray-100 border border-dashed border-gray-500 bg-no-repeat",
                style: O({ backgroundImage: "url(" + _(ce)(_(H).imageUrl) + ")", width: b.value + "px", height: g.value + "px" })
              }, [
                (Y(!0), X(N, null, R(p, (u, a) => (Y(), X("div", {
                  id: "box_" + a,
                  key: a,
                  class: "area-box border border-solid border-[#ccc] w-[100px] h-[100px] absolute top-0 left-0 select-none p-[5px]",
                  style: O({ left: u.left + u.unit, top: u.top + u.unit, width: u.width + u.unit, height: u.height + u.unit }),
                  onMousedown: (n) => Z(n, a)
                }, [
                  m("span", null, M(a + 1), 1),
                  u.link.title ? (Y(), X(N, { key: 0 }, [
                    _e,
                    m("span", null, M(u.link.title), 1)
                  ], 64)) : P("", !0),
                  m("span", {
                    class: "box1",
                    onMousedown: U((n) => S(n, a), ["stop"])
                  }, null, 40, xe),
                  m("span", {
                    class: "box2",
                    onMousedown: U((n) => S(n, a), ["stop"])
                  }, null, 40, ye),
                  m("span", {
                    class: "box3",
                    onMousedown: U((n) => S(n, a), ["stop"])
                  }, null, 40, be),
                  m("span", {
                    class: "box4",
                    onMousedown: U((n) => S(n, a), ["stop"])
                  }, null, 40, we)
                ], 44, ge))), 128))
              ], 4),
              W(L, {
                "label-width": "80px",
                class: "pl-[20px]"
              }, {
                default: C(() => [
                  m("h3", ke, M(_(y)("hotAreaManage")), 1),
                  W(c, {
                    type: "primary",
                    plain: "",
                    size: "small",
                    class: "mb-[10px]",
                    onClick: j
                  }, {
                    default: C(() => [
                      B(M(_(y)("addHotArea")), 1)
                    ]),
                    _: 1
                  }),
                  m("div", Te, [
                    (Y(!0), X(N, null, R(p, (u, a) => (Y(), X(N, { key: a }, [
                      u ? (Y(), X("div", Me, [
                        W(r, {
                          label: _(y)("hotArea") + (a + 1)
                        }, {
                          default: C(() => [
                            m("div", He, [
                              W(s, {
                                modelValue: u.link,
                                "onUpdate:modelValue": (n) => u.link = n
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              W(T, {
                                class: "del cursor-pointer mx-[10px]",
                                name: "element CircleCloseFilled",
                                color: "#bbb",
                                size: "20px",
                                onClick: (n) => p.splice(a, 1)
                              }, null, 8, ["onClick"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["label"])
                      ])) : P("", !0)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const Be = /* @__PURE__ */ pe(Xe, [["__scopeId", "data-v-c8af5e8c"]]);
export {
  Be as default
};
