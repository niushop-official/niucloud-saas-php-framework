import { defineComponent as B, ref as C, computed as g, resolveComponent as k, openBlock as r, createElementBlock as n, Fragment as b, renderList as P, createTextVNode as a, createElementVNode as i, createVNode as t, unref as s, createCommentVNode as d, withCtx as x, toDisplayString as U, createBlock as F } from "vue";
import { t as p } from "./core-shared-ca1fcae5.js";
const M = {
  key: 0,
  class: "flex items-center mb-[8px]"
}, W = { class: "!w-[200px] inline-block mx-[5px]" }, G = {
  key: 1,
  class: "flex items-center mb-[8px]"
}, j = { class: "!w-[200px] inline-block mx-[5px]" }, q = {
  key: 2,
  class: "flex items-center mb-[8px]"
}, z = { class: "!w-[200px] inline-block mx-[5px]" }, H = {
  key: 3,
  class: "flex items-center mb-[8px]"
}, J = { class: "!w-[200px] inline-block mx-[5px]" }, K = {
  key: 4,
  class: "flex items-center mb-[8px]"
}, Q = { class: "!w-[200px] inline-block mx-[5px]" }, Y = {
  key: 5,
  class: "flex items-center mb-[8px]"
}, Z = { class: "!w-[200px] inline-block mx-[5px]" }, ee = {
  key: 6,
  class: "flex items-center mb-[8px]"
}, le = { class: "!w-[200px] inline-block mx-[5px]" }, oe = {
  key: 7,
  class: "flex items-center mb-[8px]"
}, te = { class: "!w-[200px] inline-block mx-[5px]" }, ae = {
  key: 8,
  class: "flex items-center mb-[8px]"
}, ce = { class: "!w-[200px] inline-block mx-[5px]" }, re = {
  key: 9,
  class: "flex items-center mb-[8px]"
}, ne = { class: "!w-[200px] inline-block mx-[5px]" }, se = {
  key: 10,
  class: "flex items-center mb-[8px]"
}, pe = { class: "!w-[200px] inline-block mx-[5px]" }, ie = {
  key: 11,
  class: "flex items-center mb-[8px]"
}, de = { class: "!w-[200px] inline-block mx-[5px]" }, ue = {
  key: 12,
  class: "flex items-center mb-[8px]"
}, ve = { class: "!w-[200px] inline-block mx-[5px]" }, me = {
  key: 13,
  class: "flex items-center mb-[8px]"
}, _e = { class: "!w-[200px] inline-block mx-[5px]" }, ye = {
  key: 14,
  class: "flex items-center mb-[8px]"
}, ke = { class: "!w-[200px] inline-block mx-[5px]" }, xe = {
  key: 15,
  class: "flex items-center mb-[8px]"
}, he = { class: "!w-[200px] inline-block mx-[5px]" }, Ve = {
  key: 16,
  class: "flex items-center mb-[8px]"
}, be = { class: "!w-[200px] inline-block mx-[5px]" }, Ce = {
  key: 17,
  class: "flex items-center mb-[8px]"
}, Ue = { class: "!w-[200px] inline-block mx-[5px]" }, fe = {
  key: 18,
  class: "flex items-center mb-[8px]"
}, ge = { class: "!w-[200px] inline-block mx-[5px]" }, Pe = {
  key: 19,
  class: "flex items-center mb-[8px]"
}, we = { class: "!w-[200px] inline-block mx-[5px]" }, Re = {
  key: 20,
  class: "flex items-center mb-[8px]"
}, $e = { class: "!w-[200px] inline-block mx-[5px]" }, Ee = {
  key: 21,
  class: "flex items-center mb-[8px]"
}, Le = { class: "!w-[200px] inline-block mx-[5px]" }, Ae = {
  key: 22,
  class: "flex items-center mb-[8px]"
}, Ie = { class: "!w-[200px] inline-block mx-[5px]" }, De = {
  key: 23,
  class: "flex items-center mb-[8px]"
}, Xe = { class: "!w-[200px] inline-block mx-[5px]" }, Ne = {
  key: 24,
  class: "flex items-center mb-[8px]"
}, Oe = { class: "!w-[200px] inline-block mx-[5px]" }, Te = {
  key: 25,
  class: "flex items-center mb-[8px]"
}, Se = { class: "!w-[200px] inline-block mx-[5px]" }, Be = {
  key: 26,
  class: "flex items-center mb-[8px]"
}, Fe = { class: "!w-[200px] inline-block mx-[5px]" }, Me = {
  key: 27,
  class: "flex items-center mb-[8px]"
}, We = { class: "!w-[200px] inline-block mx-[5px]" }, Ge = { class: "dialog-footer" }, ze = /* @__PURE__ */ B({
  __name: "setting-list",
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue", "change"],
  setup(w, { expose: R, emit: $ }) {
    const E = w, h = C(!1), L = C([
      { privacy_key: "UserInfo", privacy_text: "用户信息（微信昵称、头像）" },
      { privacy_key: "Location", privacy_text: "位置信息" },
      { privacy_key: "Address", privacy_text: "地址" },
      { privacy_key: "Invoice", privacy_text: "发票信息" },
      { privacy_key: "RunData", privacy_text: "微信运动数据" },
      { privacy_key: "Record", privacy_text: "麦克风" },
      { privacy_key: "Album", privacy_text: "选中的照片或视频信息" },
      { privacy_key: "Camera", privacy_text: "摄像头" },
      { privacy_key: "PhoneNumber", privacy_text: "手机号码" },
      { privacy_key: "Contact", privacy_text: "通讯录（仅写入）权限" },
      { privacy_key: "DeviceInfo", privacy_text: "设备信息" },
      { privacy_key: "EXIDNumber", privacy_text: "身份证号码" },
      { privacy_key: "EXOrderInfo", privacy_text: "订单信息" },
      { privacy_key: "EXUserPublishContent", privacy_text: "发布内容" },
      { privacy_key: "EXUserFollowAcct", privacy_text: "所关注账号" },
      { privacy_key: "EXUserOpLog", privacy_text: "操作日志" },
      { privacy_key: "AlbumWriteOnly", privacy_text: "相册（仅写入）权限" },
      { privacy_key: "LicensePlate", privacy_text: "车牌号" },
      { privacy_key: "BlueTooth", privacy_text: "蓝牙" },
      { privacy_key: "CalendarWriteOnly", privacy_text: "日历（仅写入）权限" },
      { privacy_key: "Email", privacy_text: "邮箱" },
      { privacy_key: "MessageFile", privacy_text: "选中的文件" },
      { privacy_key: "ChooseLocation", privacy_text: "选择的位置信息" },
      { privacy_key: "Accelerometer", privacy_text: "加速传感器" },
      { privacy_key: "Compass", privacy_text: "磁场传感器" },
      { privacy_key: "DeviceMotion", privacy_text: "方向传感器" },
      { privacy_key: "Gyroscope", privacy_text: "陀螺仪传感器" },
      { privacy_key: "Clipboard", privacy_text: "剪切板" }
    ]), A = $, o = g({
      get() {
        return E.modelValue;
      },
      set(_) {
        A("update:modelValue", _);
      }
    }), u = (_) => {
      o.value.splice(_, 1);
    }, V = C([]), I = () => {
      V.value.forEach((_) => {
        o.value.push({
          privacy_key: _,
          privacy_text: ""
        });
      }), h.value = !1, V.value = [];
    }, D = () => {
      h.value = !0;
    }, X = g(() => o.value.map((_) => _.privacy_key)), N = (_) => X.value.includes(_);
    return R({
      addSettingList: D
    }), (_, y) => {
      const v = k("el-input"), m = k("icon"), O = k("el-checkbox"), T = k("el-checkbox-group"), f = k("el-button"), S = k("el-dialog");
      return r(), n(b, null, [
        (r(!0), n(b, null, P(o.value, (c, e) => (r(), n("div", null, [
          c.privacy_key == "UserInfo" ? (r(), n("div", M, [
            a(" 为了"),
            i("div", W, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的微信昵称、头像。 "),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Location" ? (r(), n("div", G, [
            a(" 为了"),
            i("div", j, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的位置信息。 "),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "PhoneNumber" ? (r(), n("div", q, [
            a(" 为了"),
            i("div", z, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的手机号。 "),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Address" ? (r(), n("div", H, [
            a(" 开发者收集你的地址，用于"),
            i("div", J, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Record" ? (r(), n("div", K, [
            a(" 为了"),
            i("div", Q, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，访问你的麦克风。 "),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Contact" ? (r(), n("div", Y, [
            a(" 开发者使用你的通讯录（仅写入）权限，用于"),
            i("div", Z, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "EXOrderInfo" ? (r(), n("div", ee, [
            a(" 开发者收集你的订单信息，用于"),
            i("div", le, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "EXUserOpLog" ? (r(), n("div", oe, [
            a(" 开发者收集你的操作日志，用于"),
            i("div", te, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "BlueTooth" ? (r(), n("div", ae, [
            a(" 开发者访问你的蓝牙，用于"),
            i("div", ce, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "MessageFile" ? (r(), n("div", re, [
            a(" 开发者收集你选中的文件，用于"),
            i("div", ne, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Compass" ? (r(), n("div", se, [
            a(" 开发者调用你的磁场传感器，用于"),
            i("div", pe, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Clipboard" ? (r(), n("div", ie, [
            a(" 开发者读取你的剪切板，用于"),
            i("div", de, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "DeviceMotion" ? (r(), n("div", ue, [
            a(" 开发者调用你的方向传感器，用于"),
            i("div", ve, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "ChooseLocation" ? (r(), n("div", me, [
            a(" 开发者获取你选择的位置信息，用于"),
            i("div", _e, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "CalendarWriteOnly" ? (r(), n("div", ye, [
            a(" 开发者使用你的日历（仅写入）权限，用于"),
            i("div", ke, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "AlbumWriteOnly" ? (r(), n("div", xe, [
            a(" 为了"),
            i("div", he, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a(" ，开发者将在获取你的明示同意后，使用你的相册（仅写入）权限。 "),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "EXUserPublishContent" ? (r(), n("div", Ve, [
            a(" 开发者收集你的发布内容，用于"),
            i("div", be, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "DeviceInfo" ? (r(), n("div", Ce, [
            a(" 开发者收集你的设备信息，用于"),
            i("div", Ue, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Album" ? (r(), n("div", fe, [
            a(" 开发者收集你选中的照片或视频信息，用于"),
            i("div", ge, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Invoice" ? (r(), n("div", Pe, [
            a(" 开发者收集你的发票信息，用于"),
            i("div", we, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "RunData" ? (r(), n("div", Re, [
            a(" 为了"),
            i("div", $e, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的微信运动步数。 "),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Camera" ? (r(), n("div", Ee, [
            a(" 为了"),
            i("div", Le, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，访问你的摄像头。 "),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "EXUserFollowAcct" ? (r(), n("div", Ae, [
            a(" 开发者收集你的所关注账号，用于"),
            i("div", Ie, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "EXIDNumber" ? (r(), n("div", De, [
            a(" 开发者收集你的身份证号码，用于"),
            i("div", Xe, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "LicensePlate" ? (r(), n("div", Ne, [
            a(" 为了"),
            i("div", Oe, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的车牌号。 "),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Email" ? (r(), n("div", Te, [
            a(" 开发者收集你的邮箱，用于"),
            i("div", Se, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Accelerometer" ? (r(), n("div", Be, [
            a(" 开发者调用你的加速传感器，用于"),
            i("div", Fe, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          c.privacy_key == "Gyroscope" ? (r(), n("div", Me, [
            a(" 开发者调用你的陀螺仪传感器，用于"),
            i("div", We, [
              t(v, {
                modelValue: o.value[e].privacy_text,
                "onUpdate:modelValue": (l) => o.value[e].privacy_text = l,
                placeholder: s(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            t(m, {
              name: "element Remove",
              onClick: (l) => u(e),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0)
        ]))), 256)),
        t(S, {
          modelValue: h.value,
          "onUpdate:modelValue": y[3] || (y[3] = (c) => h.value = c),
          title: s(p)("settingTypeTitle"),
          width: "500px",
          "destroy-on-close": !0
        }, {
          footer: x(() => [
            i("span", Ge, [
              t(f, {
                onClick: y[1] || (y[1] = (c) => h.value = !1)
              }, {
                default: x(() => [
                  a(U(s(p)("cancel")), 1)
                ]),
                _: 1
              }),
              t(f, {
                type: "primary",
                onClick: y[2] || (y[2] = (c) => I())
              }, {
                default: x(() => [
                  a(U(s(p)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: x(() => [
            t(T, {
              modelValue: V.value,
              "onUpdate:modelValue": y[0] || (y[0] = (c) => V.value = c)
            }, {
              default: x(() => [
                (r(!0), n(b, null, P(L.value, (c, e) => (r(), n(b, null, [
                  N(c.privacy_key) ? d("", !0) : (r(), F(O, {
                    key: 0,
                    label: c.privacy_key
                  }, {
                    default: x(() => [
                      a(U(c.privacy_text), 1)
                    ]),
                    _: 2
                  }, 1032, ["label"]))
                ], 64))), 256))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
});
export {
  ze as _
};
