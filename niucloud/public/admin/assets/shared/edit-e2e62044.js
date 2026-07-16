import { defineComponent as Se, ref as y, onMounted as Ne, reactive as De, computed as M, resolveComponent as _, resolveDirective as Me, openBlock as i, createElementBlock as w, Fragment as C, withDirectives as Fe, createVNode as t, withCtx as d, unref as o, renderList as S, createBlock as b, createElementVNode as c, createCommentVNode as N, createTextVNode as f, toDisplayString as v, pushScopeId as Ee, popScopeId as Ie, nextTick as re } from "vue";
import { gl as Pe, t as a, r as Re, b6 as qe, gm as Ae, gn as ce, go as Be, gp as Le, gq as Oe, i as je, _ as Ke } from "./core-shared-e1759ce4.js";
import { ElMessageBox as ze, ElMessage as Ge } from "element-plus";
import { ArrowLeft as Je } from "@element-plus/icons-vue";
import We from "./edit-associated-8ca261e7.js";
import He from "./edit-view-type-7cea5d72.js";
import Qe from "./edit-verify-55a52c72.js";
import { useRoute as Xe, useRouter as Ye } from "vue-router";
import { c as K } from "./lodash-8c6c2daa.js";
import "axios";
import "vue-i18n";
import "pinia";
const k = (F) => (Ee("data-v-c3627210"), F = F(), Ie(), F), Ze = { class: "main-container" }, el = /* @__PURE__ */ k(() => /* @__PURE__ */ c("p", { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, "生成代码所属功能模块，对应路由名称，例如会员模块，充值模块，订单模块等", -1)), ll = /* @__PURE__ */ k(() => /* @__PURE__ */ c("p", { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, "命名规范，小写，多个单词使用下划线连接,例如: member，article_category", -1)), al = /* @__PURE__ */ k(() => /* @__PURE__ */ c("p", { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, "生成代码所属文件名称，controller，model，service，等类型文件名", -1)), tl = /* @__PURE__ */ k(() => /* @__PURE__ */ c("p", { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, "命名规范，小写，多个单词使用下划线连接,例如: article_category", -1)), nl = /* @__PURE__ */ k(() => /* @__PURE__ */ c("i", { class: "iconfont icontuodong vues-rank" }, null, -1)), ol = { class: "flex items-center" }, dl = { class: "flex items-center" }, ul = /* @__PURE__ */ k(() => /* @__PURE__ */ c("p", { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, "物理删除：从表中把记录移除。软删除：通过标识使得这条记录在系统逻辑层面上不可见", -1)), ml = /* @__PURE__ */ k(() => /* @__PURE__ */ c("p", { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, "软删除字段需为int类型，并且默认值为0", -1)), sl = /* @__PURE__ */ k(() => /* @__PURE__ */ c("p", { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, "弹出：弹出框编辑。新页面：跳转页面编辑。", -1)), il = /* @__PURE__ */ k(() => /* @__PURE__ */ c("p", { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, "列表排序规则字段。", -1)), rl = /* @__PURE__ */ k(() => /* @__PURE__ */ c("p", { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, "列表排序规则。", -1)), cl = { class: "mb-[20px]" }, pl = { class: "fixed-footer-wrap" }, _l = { class: "fixed-footer" }, bl = /* @__PURE__ */ Se({
  __name: "edit",
  setup(F) {
    const z = Xe(), pe = Ye(), _e = z.meta.title, G = parseInt(z.query.id || 0), g = y(!0), J = Pe(), W = y(0), H = y("basicSettings"), Q = {
      id: "",
      table_name: "",
      table_content: "",
      module_name: "",
      class_name: "",
      edit_type: 1,
      table_column: [],
      editFiledIndex: 0
    }, be = ["=", "!=", ">", ">=", "<", "<=", "LIKE", "BETWEEN"], fe = [
      {
        label: a("formInput"),
        value: "input"
      },
      {
        label: a("formTextarea"),
        value: "textarea"
      },
      {
        label: a("formSelect"),
        value: "select"
      },
      {
        label: a("formRadio"),
        value: "radio"
      },
      {
        label: a("formCheckbox"),
        value: "checkbox"
      },
      {
        label: a("formDateTime"),
        value: "datetime"
      },
      {
        label: a("formImageSelect"),
        value: "imageSelect"
      },
      {
        label: a("formFileSelect"),
        value: "fileSelect"
      },
      {
        label: a("formVideoSelect"),
        value: "videoSelect"
      },
      {
        label: a("formEditor"),
        value: "editor"
      },
      {
        label: a("formNumber"),
        value: "number"
      }
    ], ve = [
      {
        label: "无需验证",
        value: ""
      },
      {
        label: a("mobileVerify"),
        value: "mobile"
      },
      {
        label: a("numberVerify"),
        value: "number"
      },
      {
        label: a("idCardVerify"),
        value: "idCard"
      },
      {
        label: a("emailVerify"),
        value: "email"
      },
      {
        label: "",
        value: "max"
      },
      {
        label: "",
        value: "min"
      },
      {
        label: "",
        value: "between"
      }
    ], X = y([]), Y = (u) => {
      Re({ search: u }).then((n) => {
        X.value = n.data, re(() => {
          Z();
        });
      });
    }, Z = () => {
      const u = J.value.$el.querySelector(
        ".el-table__body-wrapper tbody"
      );
      qe.create(u, {
        handle: ".vues-rank",
        animation: 300,
        onEnd({ newIndex: n, oldIndex: s }) {
          const D = e.table_column, U = D.splice(s, 1)[0];
          D.splice(n, 0, U), W.value += 1, re(() => {
            Z();
          });
        }
      });
    };
    Ne(() => {
      Y("");
    });
    const ye = (u) => {
      e.delete_column_name = u ? e.table_column[e.table_column.length - 1].column_name : "";
    }, he = (u) => {
      e.order_type = u ? 1 : 0;
    }, e = De({ ...Q }), fl = M(() => e.addon_name ? `addon${e.addon_name ? "\\" + e.addon_name : ""}\\app\\adminapi\\controller${e.module_name ? "\\" + e.module_name : ""}${e.class_name ? "\\" + e.class_name : ""}` : `app\\adminapi\\controller${e.module_name ? "\\" + e.module_name : ""}${e.class_name ? "\\" + e.class_name : ""}`), vl = M(() => e.addon_name ? `addon${e.addon_name ? "\\" + e.addon_name : ""}\\app\\model${e.module_name ? "\\" + e.module_name : ""}${e.class_name ? "\\" + e.class_name : ""}` : `app\\model${e.module_name ? "\\" + e.module_name : ""}${e.class_name ? "\\" + e.class_name : ""}`), yl = M(() => e.addon_name ? `addon${e.addon_name ? "\\" + e.addon_name : ""}\\app\\validate${e.module_name ? "\\" + e.module_name : ""}${e.class_name ? "\\" + e.class_name : ""}` : `app\\validate${e.module_name ? "\\" + e.module_name : ""}${e.class_name ? "\\" + e.class_name : ""}`), hl = M(() => e.addon_name ? `addon${e.addon_name ? "\\" + e.addon_name : ""}\\admin\\src` : "admin\\src"), xl = M(() => e.addon_name ? `addon${e.addon_name ? "\\" + e.addon_name : ""}\\app\\adminapi\\route${e.module_name ? "\\" + e.module_name : ""}` : `app\\adminapi\\route${e.module_name ? "\\" + e.module_name : ""}`);
    G && (async (u = 0) => {
      Object.assign(e, Q);
      const n = await (await Ae(u)).data;
      Object.keys(n).forEach((s) => {
        n[s] != null && (e[s] = n[s]);
      }), e.table_column.forEach((s) => {
        s.betweenMin = K(s.min_number), s.betweenMax = K(s.max_number);
      }), e.addon_name != "" && ee(e.addon_name), g.value = !1;
    })(G);
    const xe = y(), B = y([]), E = y([]);
    (async () => {
      const { data: u } = await ce();
      B.value = [{ menu_name: "顶级", menu_key: "" }], B.value.push(...u);
    })();
    const ee = async (u) => {
      const { data: n } = await ce(u);
      E.value = n;
    }, ge = async (u) => {
      e.parent_menu = "", u != "" && (await ee(u), E.value[0] && (e.parent_menu = E.value[0].menu_key));
    }, L = y(0), le = y(), ae = (u, n) => {
      L.value = n, le.value.setFormData(u);
    }, Ve = (u) => {
      L.value != -1 ? e.relations.splice(L.value, 1, u) : e.relations.unshift(u);
    }, ke = (u) => {
      e.relations.splice(u, 1);
    }, O = async (u) => {
      const n = K(e);
      n.table_column = JSON.stringify(n.table_column.map((s) => (s.is_search || (s.query_type = ""), (s.validate_type === "between" || s.view_type === "number") && (s.max_number = s.betweenMax, s.min_number = s.betweenMin), ["select", "radio", "checkbox"].includes(s.view_type) || (s.dict_type = ""), s))), n.relations = JSON.stringify(n.relations), g.value = !0, Be(n).then((s) => {
        u === 3 ? we() : u === 2 ? te(u) : (g.value = !1, setTimeout(() => {
          window.codeActiveName = "codeList", R();
        }, 650));
      }).catch(() => {
        g.value = !1;
      });
    }, we = () => {
      Le({ id: e.id }).then((u) => {
        g.value = !1, ze.confirm(
          u.msg != "2" ? a("saveAndSyncText") : a("saveAndSyncText1"),
          a("warning"),
          {
            confirmButtonText: a("confirm"),
            cancelButtonText: a("cancel")
          }
        ).then(() => {
          g.value = !0, te(3);
        }).catch(() => {
        });
      }).catch(() => {
        g.value = !1;
      });
    }, te = (u) => {
      Oe({ id: e.id, generate_type: u }).then((n) => {
        g.value = !1, Ge({
          type: "success",
          message: "操作成功"
        }), window.open(je(n.data.file), "_blank"), setTimeout(() => {
          window.codeActiveName = "codeList", R();
        }, 650);
      }).catch(() => {
        g.value = !1;
      });
    }, I = y(0), ne = y(null), oe = y(null), P = (u, n) => {
      var s;
      (["max", "min", "between"].includes(u.validate_type) || u.view_type === "number") && (I.value = n, (s = ne.value) == null || s.setFormData(u));
    }, Ce = (u) => {
      e.table_column.splice(I.value, 1, u);
    }, de = (u, n) => {
      var s;
      ["input", "textarea"].includes(u.view_type) || (u.validate_type = ""), ["select", "radio", "checkbox"].includes(u.view_type) ? (I.value = n, (s = oe.value) == null || s.setFormData(u)) : u.view_type === "number" && P(u, n);
    }, Ue = (u) => {
      u.select_type == 1 ? Object.assign(u, {
        addon: "",
        model: "",
        value_key: "",
        label_key: ""
      }) : u.dict_type = "", e.table_column.splice(I.value, 1, u);
    }, R = () => {
      pe.push({ path: "/tools/code" });
    };
    return (u, n) => {
      const s = _("el-page-header"), D = _("el-card"), U = _("el-input"), h = _("el-form-item"), x = _("el-option"), $ = _("el-select"), ue = _("el-form"), q = _("el-tab-pane"), p = _("el-table-column"), T = _("el-checkbox"), V = _("el-button"), me = _("el-table"), A = _("el-radio"), se = _("el-radio-group"), ie = _("el-tree-select"), $e = _("el-tabs"), Te = Me("loading");
      return i(), w(C, null, [
        Fe((i(), w("div", Ze, [
          t(D, {
            class: "card !border-none",
            shadow: "never"
          }, {
            default: d(() => [
              t(s, {
                content: o(_e),
                icon: o(Je),
                onBack: n[0] || (n[0] = (l) => R())
              }, null, 8, ["content", "icon"])
            ]),
            _: 1
          }),
          t(D, {
            class: "box-card mt-[15px] !border-none",
            shadow: "never"
          }, {
            default: d(() => [
              t($e, {
                modelValue: H.value,
                "onUpdate:modelValue": n[14] || (n[14] = (l) => H.value = l),
                class: "demo-tabs"
              }, {
                default: d(() => [
                  t(q, {
                    label: o(a)("basicSettings"),
                    name: "basicSettings"
                  }, {
                    default: d(() => [
                      t(ue, {
                        model: e,
                        "label-width": "70px",
                        class: "page-form"
                      }, {
                        default: d(() => [
                          t(h, {
                            label: o(a)("tableName")
                          }, {
                            default: d(() => [
                              t(U, {
                                modelValue: e.table_name,
                                "onUpdate:modelValue": n[1] || (n[1] = (l) => e.table_name = l),
                                modelModifiers: { trim: !0 },
                                disabled: "",
                                placeholder: o(a)("tableNamePlaceholder"),
                                class: "input-width",
                                maxlength: "64"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(h, {
                            label: o(a)("tableContent")
                          }, {
                            default: d(() => [
                              t(U, {
                                modelValue: e.table_content,
                                "onUpdate:modelValue": n[2] || (n[2] = (l) => e.table_content = l),
                                modelModifiers: { trim: !0 },
                                clearable: "",
                                placeholder: o(a)("tableContentPlaceholder"),
                                class: "input-width",
                                maxlength: "64"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(h, {
                            label: o(a)("addon")
                          }, {
                            default: d(() => [
                              t($, {
                                class: "input-width",
                                placeholder: o(a)("addonPlaceholder1"),
                                modelValue: e.addon_name,
                                "onUpdate:modelValue": n[3] || (n[3] = (l) => e.addon_name = l),
                                filterable: "",
                                remote: "",
                                clearable: "",
                                "remote-method": Y,
                                onChange: ge
                              }, {
                                default: d(() => [
                                  (i(!0), w(C, null, S(X.value, (l) => (i(), b(x, {
                                    label: l.title,
                                    value: l.key,
                                    key: l.key
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["placeholder", "modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(h, {
                            label: o(a)("moduleName")
                          }, {
                            default: d(() => [
                              c("div", null, [
                                t(U, {
                                  modelValue: e.module_name,
                                  "onUpdate:modelValue": n[4] || (n[4] = (l) => e.module_name = l),
                                  modelModifiers: { trim: !0 },
                                  clearable: "",
                                  placeholder: o(a)("moduleNamePlaceholder"),
                                  class: "input-width"
                                }, null, 8, ["modelValue", "placeholder"]),
                                el,
                                ll
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(h, {
                            label: o(a)("className")
                          }, {
                            default: d(() => [
                              c("div", null, [
                                t(U, {
                                  modelValue: e.class_name,
                                  "onUpdate:modelValue": n[5] || (n[5] = (l) => e.class_name = l),
                                  modelModifiers: { trim: !0 },
                                  clearable: "",
                                  placeholder: o(a)("classNamePlaceholder"),
                                  class: "input-width"
                                }, null, 8, ["modelValue", "placeholder"]),
                                al,
                                tl
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(q, {
                    label: o(a)("fieldSettings"),
                    name: "fieldSettings"
                  }, {
                    default: d(() => [
                      (i(), b(me, {
                        data: e.table_column,
                        size: "large",
                        ref_key: "tableRef",
                        ref: J,
                        key: W.value
                      }, {
                        default: d(() => [
                          t(p, {
                            align: "center",
                            label: "操作",
                            width: "80"
                          }, {
                            default: d(() => [
                              nl
                            ]),
                            _: 1
                          }),
                          t(p, {
                            label: o(a)("columnName"),
                            prop: "column_name",
                            "min-width": "130px"
                          }, null, 8, ["label"]),
                          t(p, {
                            label: o(a)("columnComment"),
                            prop: "",
                            "min-width": "220px"
                          }, {
                            default: d(({ row: l }) => [
                              t(U, {
                                modelValue: l.column_comment,
                                "onUpdate:modelValue": (m) => l.column_comment = m,
                                modelModifiers: { trim: !0 },
                                placeholder: o(a)("columnCommentPlaceholder")
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(p, {
                            label: o(a)("columnType"),
                            prop: "column_type",
                            width: "100px"
                          }, null, 8, ["label"]),
                          t(p, {
                            label: o(a)("isPk"),
                            prop: "",
                            align: "center",
                            width: "65px"
                          }, {
                            default: d(({ row: l }) => [
                              t(T, {
                                modelValue: l.is_pk,
                                "onUpdate:modelValue": (m) => l.is_pk = m,
                                disabled: "",
                                "true-label": 1,
                                "false-label": 0
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(p, {
                            label: o(a)("isRequired"),
                            prop: "",
                            align: "center",
                            width: "65px"
                          }, {
                            default: d(({ row: l }) => [
                              t(T, {
                                modelValue: l.is_required,
                                "onUpdate:modelValue": (m) => l.is_required = m,
                                "true-label": 1,
                                "false-label": 0
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(p, {
                            label: o(a)("isInsert"),
                            prop: "",
                            align: "center",
                            width: "65px"
                          }, {
                            default: d(({ row: l }) => [
                              t(T, {
                                modelValue: l.is_insert,
                                "onUpdate:modelValue": (m) => l.is_insert = m,
                                "true-label": 1,
                                "false-label": 0
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(p, {
                            label: o(a)("isUpdate"),
                            prop: "",
                            align: "center",
                            width: "65px"
                          }, {
                            default: d(({ row: l }) => [
                              t(T, {
                                modelValue: l.is_update,
                                "onUpdate:modelValue": (m) => l.is_update = m,
                                "true-label": 1,
                                "false-label": 0
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(p, {
                            label: o(a)("isLists"),
                            prop: "",
                            align: "center",
                            width: "65px"
                          }, {
                            default: d(({ row: l }) => [
                              t(T, {
                                modelValue: l.is_lists,
                                "onUpdate:modelValue": (m) => l.is_lists = m,
                                "true-label": 1,
                                "false-label": 0
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(p, {
                            label: o(a)("isSearch"),
                            prop: "",
                            align: "center",
                            width: "65px"
                          }, {
                            default: d(({ row: l }) => [
                              t(T, {
                                modelValue: l.is_search,
                                "onUpdate:modelValue": (m) => l.is_search = m,
                                "true-label": 1,
                                "false-label": 0
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(p, {
                            label: o(a)("queryType"),
                            prop: "",
                            "min-width": "170px"
                          }, {
                            default: d(({ row: l }) => [
                              c("div", ol, [
                                l.is_search ? (i(), b($, {
                                  key: 0,
                                  placeholder: o(a)("selectPlaceholder"),
                                  modelValue: l.query_type,
                                  "onUpdate:modelValue": (m) => l.query_type = m
                                }, {
                                  default: d(() => [
                                    (i(), w(C, null, S(be, (m, r) => t(x, {
                                      label: m,
                                      value: m,
                                      key: r
                                    }, null, 8, ["label", "value"])), 64))
                                  ]),
                                  _: 2
                                }, 1032, ["placeholder", "modelValue", "onUpdate:modelValue"])) : N("", !0)
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(p, {
                            label: o(a)("formType"),
                            prop: "",
                            "min-width": "225px"
                          }, {
                            default: d(({ row: l, $index: m }) => [
                              t($, {
                                class: "w-[146px]",
                                placeholder: o(a)("selectPlaceholder"),
                                modelValue: l.view_type,
                                "onUpdate:modelValue": (r) => l.view_type = r,
                                onChange: (r) => de(l, m)
                              }, {
                                default: d(() => [
                                  (i(), w(C, null, S(fe, (r, j) => t(x, {
                                    label: r.label,
                                    value: r.value,
                                    key: j
                                  }, null, 8, ["label", "value"])), 64))
                                ]),
                                _: 2
                              }, 1032, ["placeholder", "modelValue", "onUpdate:modelValue", "onChange"]),
                              ["select", "radio", "checkbox"].includes(l.view_type) ? (i(), b(V, {
                                key: 0,
                                class: "ml-[10px]",
                                type: "primary",
                                link: "",
                                onClick: (r) => de(l, m)
                              }, {
                                default: d(() => [
                                  f(v(o(a)("setUp")), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])) : N("", !0),
                              l.view_type === "number" ? (i(), b(V, {
                                key: 1,
                                class: "ml-[10px]",
                                type: "primary",
                                link: "",
                                onClick: (r) => P(l, m)
                              }, {
                                default: d(() => [
                                  f(v(o(a)("setUp")), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])) : N("", !0)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(p, {
                            label: o(a)("verifyType"),
                            prop: "",
                            "min-width": "260px"
                          }, {
                            default: d(({ row: l, $index: m }) => [
                              c("div", dl, [
                                t($, {
                                  class: "w-[196px]",
                                  placeholder: o(a)("selectPlaceholder"),
                                  modelValue: l.validate_type,
                                  "onUpdate:modelValue": (r) => l.validate_type = r,
                                  onChange: (r) => P(l, m),
                                  disabled: !["input", "textarea"].includes(l.view_type)
                                }, {
                                  default: d(() => [
                                    (i(), w(C, null, S(ve, (r, j) => (i(), w(C, { key: j }, [
                                      r.value === "max" ? (i(), b(x, {
                                        key: 0,
                                        value: r.value,
                                        label: "最大输入字符"
                                      }, null, 8, ["value"])) : r.value === "min" ? (i(), b(x, {
                                        key: 1,
                                        value: r.value,
                                        label: "最小输入字符"
                                      }, null, 8, ["value"])) : r.value === "between" ? (i(), b(x, {
                                        key: 2,
                                        value: r.value,
                                        label: "输入字符区间"
                                      }, null, 8, ["value"])) : (i(), b(x, {
                                        key: 3,
                                        label: r.label,
                                        value: r.value
                                      }, null, 8, ["label", "value"]))
                                    ], 64))), 64))
                                  ]),
                                  _: 2
                                }, 1032, ["placeholder", "modelValue", "onUpdate:modelValue", "onChange", "disabled"]),
                                ["max", "min", "between"].includes(l.validate_type) ? (i(), b(V, {
                                  key: 0,
                                  class: "ml-[10px]",
                                  type: "primary",
                                  link: "",
                                  onClick: (r) => P(l, m)
                                }, {
                                  default: d(() => [
                                    f(v(o(a)("setUp")), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])) : N("", !0)
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["data"]))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(q, {
                    label: o(a)("generationSettings"),
                    name: "generationSettings"
                  }, {
                    default: d(() => [
                      t(ue, {
                        model: e,
                        class: "page-form",
                        "label-width": "140px",
                        ref_key: "formRef",
                        ref: xe,
                        rules: u.rules
                      }, {
                        default: d(() => [
                          t(h, {
                            label: o(a)("deleteType")
                          }, {
                            default: d(() => [
                              c("div", null, [
                                t(se, {
                                  modelValue: e.is_delete,
                                  "onUpdate:modelValue": n[6] || (n[6] = (l) => e.is_delete = l),
                                  onChange: ye
                                }, {
                                  default: d(() => [
                                    t(A, { label: 0 }, {
                                      default: d(() => [
                                        f(v(o(a)("physicalDeletion")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    t(A, { label: 1 }, {
                                      default: d(() => [
                                        f(v(o(a)("softDeletion")), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue"]),
                                ul
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          e.is_delete ? (i(), b(h, {
                            key: 0,
                            prop: "delete_column_name",
                            label: o(a)("deleteField")
                          }, {
                            default: d(() => [
                              c("div", null, [
                                t($, {
                                  class: "input-width",
                                  placeholder: o(a)("deleteFieldPlaceholder"),
                                  modelValue: e.delete_column_name,
                                  "onUpdate:modelValue": n[7] || (n[7] = (l) => e.delete_column_name = l)
                                }, {
                                  default: d(() => [
                                    (i(!0), w(C, null, S(e.table_column, (l, m) => (i(), b(x, {
                                      label: `${l.column_name}:${l.column_comment}`,
                                      value: l.column_name,
                                      key: m
                                    }, null, 8, ["label", "value"]))), 128))
                                  ]),
                                  _: 1
                                }, 8, ["placeholder", "modelValue"]),
                                ml
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"])) : N("", !0),
                          t(h, {
                            label: o(a)("editType")
                          }, {
                            default: d(() => [
                              c("div", null, [
                                t(se, {
                                  modelValue: e.edit_type,
                                  "onUpdate:modelValue": n[8] || (n[8] = (l) => e.edit_type = l),
                                  placeholder: o(a)("editTypePlaceholder")
                                }, {
                                  default: d(() => [
                                    t(A, { label: 1 }, {
                                      default: d(() => [
                                        f(v(o(a)("popup")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    t(A, { label: 2 }, {
                                      default: d(() => [
                                        f(v(o(a)("page")), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "placeholder"]),
                                sl
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          t(h, {
                            label: o(a)("orderColumnName")
                          }, {
                            default: d(() => [
                              c("div", null, [
                                t($, {
                                  class: "input-width",
                                  placeholder: o(a)("orderColumnNamePlaceholder"),
                                  modelValue: e.order_column_name,
                                  "onUpdate:modelValue": n[9] || (n[9] = (l) => e.order_column_name = l),
                                  clearable: "",
                                  onChange: he
                                }, {
                                  default: d(() => [
                                    (i(!0), w(C, null, S(e.table_column, (l, m) => (i(), b(x, {
                                      label: `${l.column_name}:${l.column_comment}`,
                                      value: l.column_name,
                                      key: m
                                    }, null, 8, ["label", "value"]))), 128))
                                  ]),
                                  _: 1
                                }, 8, ["placeholder", "modelValue"]),
                                il
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          e.order_column_name ? (i(), b(h, {
                            key: 1,
                            label: o(a)("orderType")
                          }, {
                            default: d(() => [
                              c("div", null, [
                                t($, {
                                  class: "input-width",
                                  placeholder: o(a)("orderTypePlaceholder"),
                                  modelValue: e.order_type,
                                  "onUpdate:modelValue": n[10] || (n[10] = (l) => e.order_type = l)
                                }, {
                                  default: d(() => [
                                    t(x, {
                                      label: "正序 asc",
                                      value: 1
                                    }),
                                    t(x, {
                                      label: "倒序 desc",
                                      value: 2
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["placeholder", "modelValue"]),
                                rl
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"])) : N("", !0),
                          t(h, {
                            label: o(a)("menuType")
                          }, {
                            default: d(() => [
                              e.addon_name != "" ? (i(), b(ie, {
                                key: 0,
                                class: "input-width",
                                clearable: "",
                                modelValue: e.parent_menu,
                                "onUpdate:modelValue": n[11] || (n[11] = (l) => e.parent_menu = l),
                                props: { label: "menu_name", value: "menu_key" },
                                data: E.value,
                                "check-strictly": "",
                                "render-after-expand": !1
                              }, null, 8, ["modelValue", "data"])) : (i(), b(ie, {
                                key: 1,
                                class: "input-width",
                                modelValue: e.parent_menu,
                                "onUpdate:modelValue": n[12] || (n[12] = (l) => e.parent_menu = l),
                                clearable: "",
                                props: { label: "menu_name", value: "menu_key" },
                                data: B.value,
                                "check-strictly": "",
                                "render-after-expand": !1
                              }, null, 8, ["modelValue", "data"]))
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["model", "rules"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(q, {
                    label: o(a)("associatedConfiguration"),
                    name: "associatedConfiguration"
                  }, {
                    default: d(() => [
                      c("div", cl, [
                        t(V, {
                          type: "primary",
                          class: "w-[100px]",
                          onClick: n[13] || (n[13] = (l) => ae(null, -1))
                        }, {
                          default: d(() => [
                            f(v(o(a)("insertAssociated")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      t(me, {
                        data: e.relations,
                        size: "large"
                      }, {
                        default: d(() => [
                          t(p, {
                            label: o(a)("associatedType"),
                            prop: "type",
                            "min-width": "130px"
                          }, null, 8, ["label"]),
                          t(p, {
                            label: o(a)("associatedName"),
                            prop: "name",
                            "min-width": "130px"
                          }, null, 8, ["label"]),
                          t(p, {
                            label: o(a)("addons"),
                            prop: "addon",
                            "min-width": "130px"
                          }, null, 8, ["label"]),
                          t(p, {
                            label: o(a)("associatedModel"),
                            prop: "model",
                            "min-width": "130px"
                          }, null, 8, ["label"]),
                          t(p, {
                            label: o(a)("localKey"),
                            prop: "local_key",
                            "min-width": "130px"
                          }, null, 8, ["label"]),
                          t(p, {
                            label: o(a)("foreignKey"),
                            prop: "foreign_key",
                            "min-width": "130px"
                          }, null, 8, ["label"]),
                          t(p, {
                            label: o(a)("operation"),
                            align: "right",
                            "min-width": "130px"
                          }, {
                            default: d(({ row: l, $index: m }) => [
                              t(V, {
                                type: "primary",
                                link: "",
                                onClick: (r) => ae(l, m)
                              }, {
                                default: d(() => [
                                  f(v(o(a)("edit")), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              t(V, {
                                type: "primary",
                                link: "",
                                onClick: (r) => ke(m)
                              }, {
                                default: d(() => [
                                  f(v(o(a)("delete")), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["data"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])), [
          [Te, g.value]
        ]),
        t(We, {
          ref_key: "editDialog",
          ref: le,
          table_name: e.table_name,
          onComplete: Ve
        }, null, 8, ["table_name"]),
        t(He, {
          ref_key: "editViewTypeRef",
          ref: oe,
          onComplete: Ue
        }, null, 512),
        t(Qe, {
          ref_key: "editVerifyRef",
          ref: ne,
          onComplete: Ce
        }, null, 512),
        c("div", pl, [
          c("div", _l, [
            t(V, {
              type: "primary",
              onClick: n[15] || (n[15] = (l) => O(1))
            }, {
              default: d(() => [
                f(v(o(a)("save")), 1)
              ]),
              _: 1
            }),
            t(V, {
              type: "primary",
              onClick: n[16] || (n[16] = (l) => O(3))
            }, {
              default: d(() => [
                f(v(o(a)("saveAndSync")), 1)
              ]),
              _: 1
            }),
            t(V, {
              type: "primary",
              onClick: n[17] || (n[17] = (l) => O(2))
            }, {
              default: d(() => [
                f(v(o(a)("saveAndDownload")), 1)
              ]),
              _: 1
            }),
            t(V, {
              onClick: n[18] || (n[18] = (l) => R())
            }, {
              default: d(() => [
                f(v(o(a)("cancel")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ], 64);
    };
  }
});
const Il = /* @__PURE__ */ Ke(bl, [["__scopeId", "data-v-c3627210"]]);
export {
  Il as default
};
