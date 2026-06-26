import { defineComponent as Q, ref as v, computed as W, reactive as Z, resolveComponent as f, resolveDirective as ee, openBlock as d, createBlock as s, unref as r, withCtx as n, createElementVNode as B, createVNode as c, createTextVNode as E, toDisplayString as w, withDirectives as le, withModifiers as ae, createCommentVNode as _, createElementBlock as D, Fragment as P, renderList as F } from "vue";
import { t as o, bI as te, bH as oe, I, c_ as re, c$ as ue } from "./core-shared-ca1fcae5.js";
const de = { key: 8 }, ie = { class: "text-sm text-gray-400" }, ne = { class: "dialog-footer" }, ce = /* @__PURE__ */ Q({
  __name: "edit-member",
  emits: ["complete"],
  setup(me, { expose: Y, emit: R }) {
    const a = v(""), M = v(""), N = v(""), g = v(!1), p = v(!1), h = v(!1), V = v(null), j = v([
      {
        id: 0,
        name: o("secrecySex")
      },
      {
        id: 1,
        name: o("manSex")
      },
      {
        id: 2,
        name: o("girlSex")
      }
    ]), x = v(null);
    (async () => {
      x.value = await (await oe()).data;
    })();
    const $ = v([]);
    te().then(({ data: i }) => {
      $.value = i;
    });
    const H = W(() => ({
      mobile: [
        {
          validator(i, e, m) {
            if (!e)
              return m();
            /^1[3-9]\d{9}$/.test(e) ? m() : m(new Error("请输入正确的手机号"));
          },
          trigger: "blur"
        }
      ],
      id_card: [
        {
          validator(i, e, m) {
            if (!e)
              return m();
            /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e) ? m() : m(new Error("请输入正确的身份证号"));
          },
          trigger: "blur"
        }
      ]
      // member_level: [
      //     {
      //         validator: (rule: any, value: any, callback: Function) => {
      //             if (Test.empty(saveData.member_level)) {
      //                 callback(t('memberLevelPlaceholder'))
      //             }
      //             callback()
      //         }
      //     }
      // ]
    })), l = Z({ ...{
      headimg: "",
      nickname: "",
      member_label: "",
      member_level: "",
      sex: "",
      birthday: ""
    } }), T = R, X = async (i) => {
      var e;
      await ((e = V.value) == null ? void 0 : e.validate((m) => {
        if (m) {
          if (p.value = !0, h.value)
            return;
          h.value = !0;
          let u = l[a.value];
          a.value == "member_label" && (u = l[a.value] && l[a.value].length ? I(l[a.value]).join(",").split(",") : "");
          const b = v({
            member_id: N.value,
            field: a.value,
            value: u
          });
          re(b.value).then((U) => {
            p.value = !1, h.value = !1, g.value = !1, T("complete");
          }).catch(() => {
            p.value = !1, h.value = !1;
          });
        }
      }));
    }, q = async (i = null) => {
      p.value = !0, a.value = i.type, M.value = i.title, N.value = i.id, l[a.value] = i.data[a.value], a.value == "member_label" && l[a.value] && l[a.value].forEach((e, m) => {
        let u = !1;
        for (let b = 0; b < x.value.length; b++)
          if (x.value[b].label_id == e) {
            u = !0;
            break;
          }
        u ? l[a.value][m] = Number.parseFloat(e) : l[a.value].splice(m, 1);
      }), p.value = !1;
    }, A = v(null), y = v({
      is_all: 0,
      ids: [],
      where: {}
    }), z = (i) => {
      p.value = !0, a.value = i.type, A.value = i.method, y.value.is_all = i.data.is_all, y.value.ids = i.data.ids, y.value.where = i.data.where, M.value = i.title, l[a.value] = null, p.value = !1;
    }, G = async (i) => {
      var e;
      await ((e = V.value) == null ? void 0 : e.validate((m) => {
        if (m) {
          if (p.value = !0, h.value)
            return;
          h.value = !0;
          let u = l[a.value];
          a.value == "member_label" && (u = l[a.value] && l[a.value].length ? I(l[a.value]).join(",").split(",") : "");
          const b = v({
            is_all: y.value.is_all,
            member_ids: y.value.ids,
            where: y.value.where,
            field: a.value,
            value: u
          });
          console.log(b.value), ue(b.value).then((U) => {
            p.value = !1, h.value = !1, g.value = !1, T("complete");
          }).catch(() => {
            p.value = !1, h.value = !1;
          });
        }
      }));
    };
    return Y({
      showDialog: g,
      setDialogType: q,
      batchSetDialogType: z
    }), (i, e) => {
      const m = f("upload-image"), u = f("el-form-item"), b = f("el-input"), U = f("el-date-picker"), C = f("el-option"), S = f("el-select"), J = f("el-form"), L = f("el-button"), K = f("el-dialog"), O = ee("loading");
      return d(), s(K, {
        modelValue: g.value,
        "onUpdate:modelValue": e[13] || (e[13] = (t) => g.value = t),
        title: M.value || r(o)("updateMember"),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: n(() => [
          B("span", ne, [
            c(L, {
              onClick: e[10] || (e[10] = (t) => g.value = !1)
            }, {
              default: n(() => [
                E(w(r(o)("cancel")), 1)
              ]),
              _: 1
            }),
            A.value == "batchSet" ? (d(), s(L, {
              key: 0,
              type: "primary",
              loading: p.value,
              onClick: e[11] || (e[11] = (t) => G(V.value))
            }, {
              default: n(() => [
                E(w(r(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])) : (d(), s(L, {
              key: 1,
              type: "primary",
              loading: p.value,
              onClick: e[12] || (e[12] = (t) => X(V.value))
            }, {
              default: n(() => [
                E(w(r(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"]))
          ])
        ]),
        default: n(() => [
          le((d(), s(J, {
            model: l,
            "label-width": "90px",
            rules: H.value,
            ref_key: "formRef",
            ref: V,
            class: "page-form",
            onSubmit: e[9] || (e[9] = ae(() => {
            }, ["prevent"]))
          }, {
            default: n(() => [
              a.value == "headimg" ? (d(), s(u, {
                key: 0,
                label: r(o)("headimg")
              }, {
                default: n(() => [
                  c(m, {
                    modelValue: l.headimg,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => l.headimg = t)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])) : _("", !0),
              a.value == "nickname" ? (d(), s(u, {
                key: 1,
                label: r(o)("nickname")
              }, {
                default: n(() => [
                  c(b, {
                    modelValue: l.nickname,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => l.nickname = t),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: r(o)("nickNamePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : _("", !0),
              a.value == "mobile" ? (d(), s(u, {
                key: 2,
                label: r(o)("mobile"),
                prop: "mobile"
              }, {
                default: n(() => [
                  c(b, {
                    modelValue: l.mobile,
                    "onUpdate:modelValue": e[2] || (e[2] = (t) => l.mobile = t),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: r(o)("mobilePlaceholder"),
                    maxlength: "11",
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : _("", !0),
              a.value == "id_card" ? (d(), s(u, {
                key: 3,
                label: r(o)("idCard"),
                prop: "id_card"
              }, {
                default: n(() => [
                  c(b, {
                    modelValue: l.id_card,
                    "onUpdate:modelValue": e[3] || (e[3] = (t) => l.id_card = t),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: r(o)("idCardPlaceholder"),
                    maxlength: "18",
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : _("", !0),
              a.value == "remark" ? (d(), s(u, {
                key: 4,
                label: r(o)("remark"),
                prop: "remark"
              }, {
                default: n(() => [
                  c(b, {
                    modelValue: l.remark,
                    "onUpdate:modelValue": e[4] || (e[4] = (t) => l.remark = t),
                    modelModifiers: { trim: !0 },
                    type: "textarea",
                    clearable: "",
                    placeholder: r(o)("remarkPlaceholder"),
                    maxlength: "100",
                    rows: 5,
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : _("", !0),
              a.value == "birthday" ? (d(), s(u, {
                key: 5,
                label: r(o)("birthday")
              }, {
                default: n(() => [
                  c(U, {
                    modelValue: l.birthday,
                    "onUpdate:modelValue": e[5] || (e[5] = (t) => l.birthday = t),
                    "value-format": "YYYY-MM-DD",
                    type: "date",
                    placeholder: r(o)("birthdayTip")
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : _("", !0),
              a.value == "sex" ? (d(), s(u, {
                key: 6,
                label: r(o)("sex")
              }, {
                default: n(() => [
                  c(S, {
                    modelValue: l.sex,
                    "onUpdate:modelValue": e[6] || (e[6] = (t) => l.sex = t),
                    clearable: "",
                    placeholder: r(o)("sexPlaceholder"),
                    class: "input-width"
                  }, {
                    default: n(() => [
                      (d(!0), D(P, null, F(j.value, (t, k) => (d(), s(C, {
                        label: t.name,
                        value: t.id,
                        key: k
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : _("", !0),
              a.value == "member_label" ? (d(), s(u, {
                key: 7,
                label: r(o)("memberLabel")
              }, {
                default: n(() => [
                  c(S, {
                    modelValue: l.member_label,
                    "onUpdate:modelValue": e[7] || (e[7] = (t) => l.member_label = t),
                    multiple: "",
                    "collapse-tags": "",
                    placeholder: r(o)("memberLabelPlaceholder"),
                    class: "input-width"
                  }, {
                    default: n(() => [
                      (d(!0), D(P, null, F(x.value, (t, k) => (d(), s(C, {
                        label: t.label_name,
                        value: t.label_id,
                        key: k
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : _("", !0),
              a.value == "member_level" ? (d(), D("div", de, [
                c(u, {
                  label: r(o)("memberLevelUpdate"),
                  prop: "member_level"
                }, {
                  default: n(() => [
                    c(S, {
                      modelValue: l.member_level,
                      "onUpdate:modelValue": e[8] || (e[8] = (t) => l.member_level = t),
                      placeholder: r(o)("memberLevelPlaceholder"),
                      clearable: "",
                      class: "input-width"
                    }, {
                      default: n(() => [
                        (d(!0), D(P, null, F($.value, (t, k) => (d(), s(C, {
                          label: t.level_name,
                          value: t.level_id,
                          key: k
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"]),
                    B("div", ie, w(r(o)("memberLevelUpdateTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ])) : _("", !0)
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [O, p.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  ce as _
};
