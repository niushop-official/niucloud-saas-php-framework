import { defineComponent as k, reactive as D, onBeforeMount as x, watch as s, resolveComponent as V, openBlock as l, createElementBlock as d, createVNode as m, unref as v, withCtx as y, Fragment as f, renderList as L, createBlock as b } from "vue";
import { gP as o, t as g } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "area-component" }, F = /* @__PURE__ */ k({
  __name: "index",
  props: {
    initData: {
      type: Object,
      default: {
        province: "",
        city: "",
        area: ""
      }
    }
  },
  emits: ["areaChange"],
  setup(C, { emit: h }) {
    const c = C, w = h, e = D({
      // 用于展示的省市区数据
      provinceList: [],
      citiesList: [],
      areasList: [],
      // 最终选择的省市区
      province: "",
      city: "",
      area: ""
    });
    x(async () => {
      e.provinceList = (await o(0)).data;
    }), s(() => c.initData.province, async (i) => {
      e.province = c.initData.province, e.city = c.initData.city, e.area = c.initData.area, e.citiesList = (await o(parseInt(e.province))).data, e.areasList = (await o(parseInt(e.city))).data, n();
    }), s(() => e.area, (i) => {
      i && n();
    }), s(() => e.province, (i) => {
      i && n();
    }), s(() => e.city, (i) => {
      i && n();
    });
    const n = () => {
      const i = {
        province: {},
        city: {},
        area: {}
      };
      let a = e.provinceList.find((r) => r.id === e.province);
      i.province.name = a ? a.name : "", i.province.id = a ? a.id : "", a = e.citiesList.find((r) => r.id === e.city), i.city.name = a ? a.name : "", i.city.id = a ? a.id : "", a = e.areasList.find((r) => r.id === e.area), i.area.name = a ? a.name : "", i.area.id = a ? a.id : "", w("areaChange", i);
    }, p = async (i) => {
      if (i == "province") {
        if (e.city = "", e.area = "", !e.province)
          return n(), !1;
        e.citiesList = (await o(parseInt(e.province))).data;
      }
      if (i == "city") {
        if (e.area = "", !e.city)
          return n(), !1;
        e.areasList = (await o(parseInt(e.city))).data;
      }
      if (i == "area" && !e.area)
        return n(), !1;
    };
    return (i, a) => {
      const r = V("el-option"), u = V("el-select");
      return l(), d("div", B, [
        m(u, {
          placeholder: v(g)("provincePlaceholder"),
          modelValue: e.province,
          "onUpdate:modelValue": a[0] || (a[0] = (t) => e.province = t),
          clearable: "",
          onChange: a[1] || (a[1] = (t) => p("province"))
        }, {
          default: y(() => [
            (l(!0), d(f, null, L(e.provinceList, (t) => (l(), b(r, {
              key: t.id,
              label: t.name,
              value: t.id
            }, null, 8, ["label", "value"]))), 128))
          ]),
          _: 1
        }, 8, ["placeholder", "modelValue"]),
        m(u, {
          placeholder: v(g)("cityPlaceholder"),
          style: { margin: "0 10px" },
          disabled: !e.province,
          modelValue: e.city,
          "onUpdate:modelValue": a[2] || (a[2] = (t) => e.city = t),
          clearable: "",
          onChange: a[3] || (a[3] = (t) => p("city"))
        }, {
          default: y(() => [
            (l(!0), d(f, null, L(e.citiesList, (t) => (l(), b(r, {
              key: t.id,
              label: t.name,
              value: t.id
            }, null, 8, ["label", "value"]))), 128))
          ]),
          _: 1
        }, 8, ["placeholder", "disabled", "modelValue"]),
        m(u, {
          placeholder: v(g)("districtPlaceholder"),
          disabled: !e.province || !e.city,
          modelValue: e.area,
          "onUpdate:modelValue": a[4] || (a[4] = (t) => e.area = t),
          clearable: "",
          onChange: a[5] || (a[5] = (t) => p("area"))
        }, {
          default: y(() => [
            (l(!0), d(f, null, L(e.areasList, (t) => (l(), b(r, {
              key: t.id,
              label: t.name,
              value: t.id
            }, null, 8, ["label", "value"]))), 128))
          ]),
          _: 1
        }, 8, ["placeholder", "disabled", "modelValue"])
      ]);
    };
  }
});
export {
  F as default
};
