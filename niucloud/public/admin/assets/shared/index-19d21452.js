import { defineComponent as se, computed as ie, ref as V, reactive as ne, resolveComponent as F, openBlock as X, createElementBlock as Y, createElementVNode as m, renderSlot as fe, createTextVNode as I, toDisplayString as T, unref as M, createVNode as W, withCtx as C, normalizeStyle as R, Fragment as N, renderList as j, createCommentVNode as P, withModifiers as U, pushScopeId as ae, popScopeId as ce } from "vue";
import { t as x, i as ue, I as pe, _ as de } from "./core-shared-0b2facad.js";
import { ElMessage as q } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const re = (D) => (ae("data-v-c8af5e8c"), D = D(), ce(), D), he = {
  key: 0,
  class: "cursor-pointer"
}, me = { class: "text-primary p-[4px]" }, ve = {
  key: 1,
  class: "cursor-pointer"
}, ge = { class: "flex" }, _e = ["id", "onMousedown"], xe = /* @__PURE__ */ re(() => /* @__PURE__ */ m("span", { class: "p-[4px]" }, "|", -1)), ye = ["onMousedown"], be = ["onMousedown"], we = ["onMousedown"], ke = ["onMousedown"], Te = { class: "mb-[10px] text-lg text-black" }, Me = { class: "overflow-y-auto h-[300px]" }, He = {
  key: 0,
  class: "mb-[16px]"
}, Xe = { class: "flex items-center" }, Ye = { class: "dialog-footer" }, Le = /* @__PURE__ */ se({
  __name: "index",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(D, { expose: G, emit: J }) {
    const K = D, Q = J, H = ie({
      get() {
        return K.modelValue;
      },
      set(h) {
        Q("update:modelValue", h);
      }
    }), A = V(!1), y = V(400), g = V(400), p = ne([]), $ = V(1), Z = V(0.25), E = V(100), B = V(100), z = V(4), O = () => {
      let h = p.length % z.value * E.value, n = Math.floor(p.length / z.value) * B.value, c = n + B.value / 2;
      (n >= g.value || c >= g.value) && (n = 0, h = 0), p.push({
        left: h,
        top: n,
        width: E.value,
        height: B.value,
        unit: "px",
        link: {
          name: ""
        }
      });
    }, ee = (h, n) => {
      const c = document.getElementById("box_" + n), s = h.clientX - c.offsetLeft, k = h.clientY - c.offsetTop;
      document.onmousemove = function(r) {
        c.style.left = r.clientX - s + "px", c.style.top = r.clientY - k + "px", r.clientX - s < 0 && (c.style.left = 0), r.clientX - s > y.value - c.offsetWidth && (c.style.left = y.value - c.offsetWidth + "px"), r.clientY - k < 0 && (c.style.top = 0), r.clientY - k > g.value - c.offsetHeight && (c.style.top = g.value - c.offsetHeight + "px"), p[n].left = c.offsetLeft, p[n].top = c.offsetTop, p[n].width = c.offsetWidth, p[n].height = c.offsetHeight, p[n].unit = "px";
      }, document.onmouseup = function(r) {
        document.onmousemove = null;
      };
    }, S = (h, n) => {
      const c = h;
      c.stopPropagation();
      const s = document.getElementById("box_" + n), k = h.target.className, r = s.offsetWidth, L = s.offsetHeight, _ = c.clientX, u = c.clientY, a = s.offsetLeft, f = s.offsetTop, o = 50, l = 50;
      document.onmousemove = function(le) {
        const d = le;
        if (k == "box1") {
          let e = r - (d.clientX - _);
          const b = y.value;
          let t = L - (d.clientY - u);
          const w = g.value - f;
          let i = a + (d.clientX - _), v = f + (d.clientY - u);
          e < o && (e = o), e > b && (e = b), t < l && (t = l), t > w && (t = w), a == 0 && f == 0 ? e == o && t == l ? (i = o, v = l) : e == o && t > l ? i = o : e > o && t == l ? v = l : e > o && t > l : a == 0 && f > 0 ? e == o && t == l || e == o && t > l ? (i = o, v = s.offsetTop) : e > o && t == l ? v = s.offsetTop : e > o && t > l : a > 0 && f == 0 ? e == o && t == l ? (i = s.offsetLeft, v = s.offsetTop) : e == o && t > l ? (i = s.offsetLeft, v = 0) : e > o && t == l ? v = s.offsetTop : e > o && t > l : a > 0 && f > 0 && (e == o && t == l || e == o && t > l ? (i = s.offsetLeft, v = s.offsetTop) : e > o && t == l ? v = s.offsetTop : e > o && t > l), i < 0 && (i = 0, e = r - (d.clientX - _) + (a + (d.clientX - _))), v < 0 && (v = 0, t = f + (d.clientY - u) + (L - (d.clientY - u))), s.style.width = e + "px", s.style.height = t + "px", s.style.left = i + "px", s.style.top = v + "px";
        } else if (k == "box2") {
          let e = r + (d.clientX - _);
          const b = y.value - a;
          let t = L - (d.clientY - u);
          const w = g.value - f;
          let i = f + (d.clientY - u);
          e < o && (e = o), e > b && (e = b), t < l && (t = l), t > w && (t = w), a == 0 && f == 0 ? e == o && t == l ? i = l : e == o && t > l || (e > o && t == l ? i = l : e > o && t > l) : a == 0 && f > 0 ? e == o && t == l || e == o && t > l || e > o && t == l ? i = s.offsetTop : e > o && t > l : a > 0 && f == 0 ? e == o && t == l ? i = s.offsetTop : e == o && t > l ? i = 0 : e > o && t == l ? i = s.offsetTop : e > o && t > l : a > 0 && f > 0 && (e == o && t == l || e == o && t > l || e > o && t == l ? i = s.offsetTop : e > o && t > l), i < 0 && (i = 0, t = f + (d.clientY - u) + (L - (d.clientY - u))), s.style.width = e + "px", s.style.height = t + "px", s.style.top = i + "px";
        } else if (k == "box3") {
          let e = r - (d.clientX - _);
          const b = y.value;
          let t = L + (d.clientY - u);
          const w = g.value - f;
          let i = a + (d.clientX - _);
          e < o && (e = o), e > b && (e = b), t < l && (t = l), t > w && (t = w), a == 0 && f == 0 || a == 0 && f > 0 ? e == o && t == l || e == o && t > l ? i = o : e > o && t == l || e > o && t > l : (a > 0 && f == 0 || a > 0 && f > 0) && (e == o && t == l || e == o && t > l ? i = s.offsetLeft : e > o && t == l || e > o && t > l), i < 0 && (i = 0, e = r - (d.clientX - _) + (a + (d.clientX - _))), s.style.width = e + "px", s.style.height = t + "px", s.style.left = i + "px";
        } else if (k == "box4") {
          let e = r + (d.clientX - _);
          const b = y.value - a;
          let t = L + (d.clientY - u);
          const w = g.value - f;
          e < o && (e = o), e > b && (e = b), t < l && (t = l), t > w && (t = w), s.style.width = e + "px", s.style.height = t + "px";
        }
        p[n].left = s.offsetLeft, p[n].top = s.offsetTop, p[n].width = s.offsetWidth, p[n].height = s.offsetHeight, p[n].unit = "px";
      }, document.onmouseup = function() {
        document.onmousemove = null, document.onmouseup = null;
      };
    }, te = () => {
      if (!H.value.imageUrl) {
        q({
          type: "warning",
          message: `${x("imageUrlTip")}`
        });
        return;
      }
      $.value = H.value.imgHeight / H.value.imgWidth, g.value = Math.floor(y.value * $.value), E.value = Math.floor(Z.value * g.value), B.value = E.value, z.value = Math.floor(y.value / E.value), Object.keys(H.value.heatMapData).length ? p.splice(0, p.length, ...H.value.heatMapData) : (p.splice(0, p.length), O()), A.value = !0;
    }, oe = () => {
      let h = !0;
      for (let n = 0; n < p.length; n++)
        if (!p[n].link.title) {
          q({
            type: "warning",
            message: x("selectedHotArea") + (n + 1) + x("hotAreaLink")
          }), h = !1;
          break;
        }
      h && (p.forEach((n, c) => {
        const s = document.getElementById("box_" + c);
        n.width = parseFloat(s.offsetWidth / y.value * 100).toFixed(2), n.height = parseFloat(s.offsetHeight / g.value * 100).toFixed(2), n.left = parseFloat(s.offsetLeft / y.value * 100).toFixed(2), n.top = parseFloat(s.offsetTop / g.value * 100).toFixed(2), n.unit = "%";
      }), H.value.heatMapData = pe(p), A.value = !1);
    };
    return G({
      showDialog: A
    }), (h, n) => {
      const c = F("el-button"), s = F("diy-link"), k = F("icon"), r = F("el-form-item"), L = F("el-form"), _ = F("el-dialog");
      return X(), Y("div", null, [
        m("div", { onClick: te }, [
          fe(h.$slots, "default", {}, () => [
            H.value.heatMapData.length ? (X(), Y("div", he, [
              I(T(M(x)("selected")), 1),
              m("span", me, T(H.value.heatMapData.length), 1),
              I(T(M(x)("selectedAfterHotArea")), 1)
            ])) : (X(), Y("div", ve, T(M(x)("addHotArea")), 1))
          ], !0)
        ]),
        W(_, {
          modelValue: A.value,
          "onUpdate:modelValue": n[1] || (n[1] = (u) => A.value = u),
          title: M(x)("hotAreaSet"),
          width: "810px",
          "destroy-on-close": !0,
          "close-on-click-modal": !1
        }, {
          footer: C(() => [
            m("span", Ye, [
              W(c, {
                onClick: n[0] || (n[0] = (u) => A.value = !1)
              }, {
                default: C(() => [
                  I(T(M(x)("cancel")), 1)
                ]),
                _: 1
              }),
              W(c, {
                type: "primary",
                onClick: oe
              }, {
                default: C(() => [
                  I(T(M(x)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: C(() => [
            m("div", ge, [
              m("div", {
                class: "hot-area-img-wrap content-box relative bg-gray-100 border border-dashed border-gray-500 bg-no-repeat",
                style: R({ backgroundImage: "url(" + M(ue)(H.value.imageUrl) + ")", width: y.value + "px", height: g.value + "px" })
              }, [
                (X(!0), Y(N, null, j(p, (u, a) => (X(), Y("div", {
                  id: "box_" + a,
                  key: a,
                  class: "area-box border border-solid border-[#ccc] w-[100px] h-[100px] absolute top-0 left-0 select-none p-[5px]",
                  style: R({ left: u.left + u.unit, top: u.top + u.unit, width: u.width + u.unit, height: u.height + u.unit }),
                  onMousedown: (f) => ee(f, a)
                }, [
                  m("span", null, T(a + 1), 1),
                  u.link.title ? (X(), Y(N, { key: 0 }, [
                    xe,
                    m("span", null, T(u.link.title), 1)
                  ], 64)) : P("", !0),
                  m("span", {
                    class: "box1",
                    onMousedown: U((f) => S(f, a), ["stop"])
                  }, null, 40, ye),
                  m("span", {
                    class: "box2",
                    onMousedown: U((f) => S(f, a), ["stop"])
                  }, null, 40, be),
                  m("span", {
                    class: "box3",
                    onMousedown: U((f) => S(f, a), ["stop"])
                  }, null, 40, we),
                  m("span", {
                    class: "box4",
                    onMousedown: U((f) => S(f, a), ["stop"])
                  }, null, 40, ke)
                ], 44, _e))), 128))
              ], 4),
              W(L, {
                "label-width": "80px",
                class: "pl-[20px]"
              }, {
                default: C(() => [
                  m("h3", Te, T(M(x)("hotAreaManage")), 1),
                  W(c, {
                    type: "primary",
                    plain: "",
                    size: "small",
                    class: "mb-[10px]",
                    onClick: O
                  }, {
                    default: C(() => [
                      I(T(M(x)("addHotArea")), 1)
                    ]),
                    _: 1
                  }),
                  m("div", Me, [
                    (X(!0), Y(N, null, j(p, (u, a) => (X(), Y(N, { key: a }, [
                      u ? (X(), Y("div", He, [
                        W(r, {
                          label: M(x)("hotArea") + (a + 1)
                        }, {
                          default: C(() => [
                            m("div", Xe, [
                              W(s, {
                                modelValue: u.link,
                                "onUpdate:modelValue": (f) => u.link = f
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              W(k, {
                                class: "del cursor-pointer mx-[10px]",
                                name: "element CircleCloseFilled",
                                color: "#bbb",
                                size: "20px",
                                onClick: (f) => p.splice(a, 1)
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
const Be = /* @__PURE__ */ de(Le, [["__scopeId", "data-v-c8af5e8c"]]);
export {
  Be as default
};
