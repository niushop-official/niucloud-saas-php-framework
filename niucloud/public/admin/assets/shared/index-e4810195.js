import { defineComponent as w, reactive as k, onBeforeMount as D, watch as s, resolveComponent as g, openBlock as l, createElementBlock as d, createVNode as m, unref as v, withCtx as y, Fragment as f, renderList as L, createBlock as b } from "vue";
import { hu as o, t as V } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const x = { class: "area-component" }, E = /* @__PURE__ */ w({
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
  setup(h, { emit: C }) {
    const c = h, e = k({
      // 用于展示的省市区数据
      provinceList: [],
      citiesList: [],
      areasList: [],
      // 最终选择的省市区
      province: "",
      city: "",
      area: ""
    });
    D(async () => {
      e.provinceList = (await o(0)).data;
    }), s(() => c.initData.province, async (t) => {
      e.province = c.initData.province, e.city = c.initData.city, e.area = c.initData.area, e.citiesList = (await o(parseInt(e.province))).data, e.areasList = (await o(parseInt(e.city))).data, n();
    }), s(() => e.area, (t) => {
      t && n();
    }), s(() => e.province, (t) => {
      t && n();
    }), s(() => e.city, (t) => {
      t && n();
    });
    const n = () => {
      const t = {
        province: {},
        city: {},
        area: {}
      };
      let a = e.provinceList.find((r) => r.id === e.province);
      t.province.name = a ? a.name : "", t.province.id = a ? a.id : "", a = e.citiesList.find((r) => r.id === e.city), t.city.name = a ? a.name : "", t.city.id = a ? a.id : "", a = e.areasList.find((r) => r.id === e.area), t.area.name = a ? a.name : "", t.area.id = a ? a.id : "", C("areaChange", t);
    }, p = async (t) => {
      if (t == "province") {
        if (e.city = "", e.area = "", !e.province)
          return n(), !1;
        e.citiesList = (await o(parseInt(e.province))).data;
      }
      if (t == "city") {
        if (e.area = "", !e.city)
          return n(), !1;
        e.areasList = (await o(parseInt(e.city))).data;
      }
      if (t == "area" && !e.area)
        return n(), !1;
    };
    return (t, a) => {
      const r = g("el-option"), u = g("el-select");
      return l(), d("div", x, [
        m(u, {
          placeholder: v(V)("provincePlaceholder"),
          modelValue: e.province,
          "onUpdate:modelValue": a[0] || (a[0] = (i) => e.province = i),
          clearable: "",
          onChange: a[1] || (a[1] = (i) => p("province"))
        }, {
          default: y(() => [
            (l(!0), d(f, null, L(e.provinceList, (i) => (l(), b(r, {
              key: i.id,
              label: i.name,
              value: i.id
            }, null, 8, ["label", "value"]))), 128))
          ]),
          _: 1
        }, 8, ["placeholder", "modelValue"]),
        m(u, {
          placeholder: v(V)("cityPlaceholder"),
          style: { margin: "0 10px" },
          disabled: !e.province,
          modelValue: e.city,
          "onUpdate:modelValue": a[2] || (a[2] = (i) => e.city = i),
          clearable: "",
          onChange: a[3] || (a[3] = (i) => p("city"))
        }, {
          default: y(() => [
            (l(!0), d(f, null, L(e.citiesList, (i) => (l(), b(r, {
              key: i.id,
              label: i.name,
              value: i.id
            }, null, 8, ["label", "value"]))), 128))
          ]),
          _: 1
        }, 8, ["placeholder", "disabled", "modelValue"]),
        m(u, {
          placeholder: v(V)("districtPlaceholder"),
          disabled: !e.province || !e.city,
          modelValue: e.area,
          "onUpdate:modelValue": a[4] || (a[4] = (i) => e.area = i),
          clearable: "",
          onChange: a[5] || (a[5] = (i) => p("area"))
        }, {
          default: y(() => [
            (l(!0), d(f, null, L(e.areasList, (i) => (l(), b(r, {
              key: i.id,
              label: i.name,
              value: i.id
            }, null, 8, ["label", "value"]))), 128))
          ]),
          _: 1
        }, 8, ["placeholder", "disabled", "modelValue"])
      ]);
    };
  }
});
export {
  E as default
};
