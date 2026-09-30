import { defineComponent as S, ref as C, computed as g, resolveComponent as k, openBlock as n, createElementBlock as s, Fragment as b, renderList as P, unref as e, createTextVNode as a, createElementVNode as i, createVNode as c, createCommentVNode as d, withCtx as h, toDisplayString as U, createBlock as B } from "vue";
import { t as p } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const F = {
  key: 0,
  class: "flex items-center mb-[8px]"
}, M = { class: "!w-[200px] inline-block mx-[5px]" }, W = {
  key: 1,
  class: "flex items-center mb-[8px]"
}, G = { class: "!w-[200px] inline-block mx-[5px]" }, j = {
  key: 2,
  class: "flex items-center mb-[8px]"
}, q = { class: "!w-[200px] inline-block mx-[5px]" }, z = {
  key: 3,
  class: "flex items-center mb-[8px]"
}, H = { class: "!w-[200px] inline-block mx-[5px]" }, J = {
  key: 4,
  class: "flex items-center mb-[8px]"
}, K = { class: "!w-[200px] inline-block mx-[5px]" }, Q = {
  key: 5,
  class: "flex items-center mb-[8px]"
}, Y = { class: "!w-[200px] inline-block mx-[5px]" }, Z = {
  key: 6,
  class: "flex items-center mb-[8px]"
}, ee = { class: "!w-[200px] inline-block mx-[5px]" }, le = {
  key: 7,
  class: "flex items-center mb-[8px]"
}, oe = { class: "!w-[200px] inline-block mx-[5px]" }, te = {
  key: 8,
  class: "flex items-center mb-[8px]"
}, ce = { class: "!w-[200px] inline-block mx-[5px]" }, ae = {
  key: 9,
  class: "flex items-center mb-[8px]"
}, re = { class: "!w-[200px] inline-block mx-[5px]" }, ne = {
  key: 10,
  class: "flex items-center mb-[8px]"
}, se = { class: "!w-[200px] inline-block mx-[5px]" }, pe = {
  key: 11,
  class: "flex items-center mb-[8px]"
}, ie = { class: "!w-[200px] inline-block mx-[5px]" }, de = {
  key: 12,
  class: "flex items-center mb-[8px]"
}, me = { class: "!w-[200px] inline-block mx-[5px]" }, ue = {
  key: 13,
  class: "flex items-center mb-[8px]"
}, ve = { class: "!w-[200px] inline-block mx-[5px]" }, _e = {
  key: 14,
  class: "flex items-center mb-[8px]"
}, ye = { class: "!w-[200px] inline-block mx-[5px]" }, ke = {
  key: 15,
  class: "flex items-center mb-[8px]"
}, he = { class: "!w-[200px] inline-block mx-[5px]" }, xe = {
  key: 16,
  class: "flex items-center mb-[8px]"
}, Ve = { class: "!w-[200px] inline-block mx-[5px]" }, be = {
  key: 17,
  class: "flex items-center mb-[8px]"
}, Ce = { class: "!w-[200px] inline-block mx-[5px]" }, Ue = {
  key: 18,
  class: "flex items-center mb-[8px]"
}, fe = { class: "!w-[200px] inline-block mx-[5px]" }, ge = {
  key: 19,
  class: "flex items-center mb-[8px]"
}, Pe = { class: "!w-[200px] inline-block mx-[5px]" }, we = {
  key: 20,
  class: "flex items-center mb-[8px]"
}, Re = { class: "!w-[200px] inline-block mx-[5px]" }, $e = {
  key: 21,
  class: "flex items-center mb-[8px]"
}, Ee = { class: "!w-[200px] inline-block mx-[5px]" }, Le = {
  key: 22,
  class: "flex items-center mb-[8px]"
}, Ae = { class: "!w-[200px] inline-block mx-[5px]" }, Ie = {
  key: 23,
  class: "flex items-center mb-[8px]"
}, De = { class: "!w-[200px] inline-block mx-[5px]" }, Xe = {
  key: 24,
  class: "flex items-center mb-[8px]"
}, Ne = { class: "!w-[200px] inline-block mx-[5px]" }, Oe = {
  key: 25,
  class: "flex items-center mb-[8px]"
}, Te = { class: "!w-[200px] inline-block mx-[5px]" }, Se = {
  key: 26,
  class: "flex items-center mb-[8px]"
}, Be = { class: "!w-[200px] inline-block mx-[5px]" }, Fe = {
  key: 27,
  class: "flex items-center mb-[8px]"
}, Me = { class: "!w-[200px] inline-block mx-[5px]" }, We = { class: "dialog-footer" }, Ye = /* @__PURE__ */ S({
  __name: "setting-list",
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue", "change"],
  setup(w, { expose: R, emit: $ }) {
    const E = w, x = C(!1), L = C([
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
    ]), t = g({
      get() {
        return E.modelValue;
      },
      set(_) {
        $("update:modelValue", _);
      }
    }), m = (_) => {
      t.value.splice(_, 1);
    }, V = C([]), A = () => {
      V.value.forEach((_) => {
        t.value.push({
          privacy_key: _,
          privacy_text: ""
        });
      }), x.value = !1, V.value = [];
    }, I = () => {
      x.value = !0;
    }, D = g(() => t.value.map((_) => _.privacy_key)), X = (_) => D.value.includes(_);
    return R({
      addSettingList: I
    }), (_, y) => {
      const u = k("el-input"), v = k("icon"), N = k("el-checkbox"), O = k("el-checkbox-group"), f = k("el-button"), T = k("el-dialog");
      return n(), s(b, null, [
        (n(!0), s(b, null, P(e(t), (r, l) => (n(), s("div", null, [
          r.privacy_key == "UserInfo" ? (n(), s("div", F, [
            a(" 为了"),
            i("div", M, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的微信昵称、头像。 "),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Location" ? (n(), s("div", W, [
            a(" 为了"),
            i("div", G, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的位置信息。 "),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "PhoneNumber" ? (n(), s("div", j, [
            a(" 为了"),
            i("div", q, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的手机号。 "),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Address" ? (n(), s("div", z, [
            a(" 开发者收集你的地址，用于"),
            i("div", H, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Record" ? (n(), s("div", J, [
            a(" 为了"),
            i("div", K, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，访问你的麦克风。 "),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Contact" ? (n(), s("div", Q, [
            a(" 开发者使用你的通讯录（仅写入）权限，用于"),
            i("div", Y, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "EXOrderInfo" ? (n(), s("div", Z, [
            a(" 开发者收集你的订单信息，用于"),
            i("div", ee, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "EXUserOpLog" ? (n(), s("div", le, [
            a(" 开发者收集你的操作日志，用于"),
            i("div", oe, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "BlueTooth" ? (n(), s("div", te, [
            a(" 开发者访问你的蓝牙，用于"),
            i("div", ce, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "MessageFile" ? (n(), s("div", ae, [
            a(" 开发者收集你选中的文件，用于"),
            i("div", re, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Compass" ? (n(), s("div", ne, [
            a(" 开发者调用你的磁场传感器，用于"),
            i("div", se, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Clipboard" ? (n(), s("div", pe, [
            a(" 开发者读取你的剪切板，用于"),
            i("div", ie, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "DeviceMotion" ? (n(), s("div", de, [
            a(" 开发者调用你的方向传感器，用于"),
            i("div", me, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "ChooseLocation" ? (n(), s("div", ue, [
            a(" 开发者获取你选择的位置信息，用于"),
            i("div", ve, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "CalendarWriteOnly" ? (n(), s("div", _e, [
            a(" 开发者使用你的日历（仅写入）权限，用于"),
            i("div", ye, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "AlbumWriteOnly" ? (n(), s("div", ke, [
            a(" 为了"),
            i("div", he, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a(" ，开发者将在获取你的明示同意后，使用你的相册（仅写入）权限。 "),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "EXUserPublishContent" ? (n(), s("div", xe, [
            a(" 开发者收集你的发布内容，用于"),
            i("div", Ve, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "DeviceInfo" ? (n(), s("div", be, [
            a(" 开发者收集你的设备信息，用于"),
            i("div", Ce, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Album" ? (n(), s("div", Ue, [
            a(" 开发者收集你选中的照片或视频信息，用于"),
            i("div", fe, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Invoice" ? (n(), s("div", ge, [
            a(" 开发者收集你的发票信息，用于"),
            i("div", Pe, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "RunData" ? (n(), s("div", we, [
            a(" 为了"),
            i("div", Re, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的微信运动步数。 "),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Camera" ? (n(), s("div", $e, [
            a(" 为了"),
            i("div", Ee, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，访问你的摄像头。 "),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "EXUserFollowAcct" ? (n(), s("div", Le, [
            a(" 开发者收集你的所关注账号，用于"),
            i("div", Ae, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "EXIDNumber" ? (n(), s("div", Ie, [
            a(" 开发者收集你的身份证号码，用于"),
            i("div", De, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "LicensePlate" ? (n(), s("div", Xe, [
            a(" 为了"),
            i("div", Ne, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            a("，开发者将在获取你的明示同意后，收集你的车牌号。 "),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Email" ? (n(), s("div", Oe, [
            a(" 开发者收集你的邮箱，用于"),
            i("div", Te, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Accelerometer" ? (n(), s("div", Se, [
            a(" 开发者调用你的加速传感器，用于"),
            i("div", Be, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0),
          r.privacy_key == "Gyroscope" ? (n(), s("div", Fe, [
            a(" 开发者调用你的陀螺仪传感器，用于"),
            i("div", Me, [
              c(u, {
                modelValue: e(t)[l].privacy_text,
                "onUpdate:modelValue": (o) => e(t)[l].privacy_text = o,
                placeholder: e(p)("settingPlaceholder")
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            c(v, {
              name: "element Remove",
              onClick: (o) => m(l),
              color: "red",
              class: "cursor-pointer"
            }, null, 8, ["onClick"])
          ])) : d("", !0)
        ]))), 256)),
        c(T, {
          modelValue: x.value,
          "onUpdate:modelValue": y[3] || (y[3] = (r) => x.value = r),
          title: e(p)("settingTypeTitle"),
          width: "500px",
          "destroy-on-close": !0
        }, {
          footer: h(() => [
            i("span", We, [
              c(f, {
                onClick: y[1] || (y[1] = (r) => x.value = !1)
              }, {
                default: h(() => [
                  a(U(e(p)("cancel")), 1)
                ]),
                _: 1
              }),
              c(f, {
                type: "primary",
                onClick: y[2] || (y[2] = (r) => A())
              }, {
                default: h(() => [
                  a(U(e(p)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: h(() => [
            c(O, {
              modelValue: V.value,
              "onUpdate:modelValue": y[0] || (y[0] = (r) => V.value = r)
            }, {
              default: h(() => [
                (n(!0), s(b, null, P(L.value, (r, l) => (n(), s(b, null, [
                  X(r.privacy_key) ? d("", !0) : (n(), B(N, {
                    key: 0,
                    label: r.privacy_key
                  }, {
                    default: h(() => [
                      a(U(r.privacy_text), 1)
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
  Ye as default
};
