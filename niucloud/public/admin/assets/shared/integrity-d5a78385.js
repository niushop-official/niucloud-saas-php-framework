import { defineComponent as de, ref as _, reactive as I, computed as w, onMounted as ue, resolveComponent as x, openBlock as u, createElementBlock as g, createVNode as r, withCtx as p, createElementVNode as n, toDisplayString as s, unref as l, createBlock as C, createTextVNode as k, createCommentVNode as y, Fragment as N, renderList as R, normalizeStyle as pe } from "vue";
import { ElMessage as Q } from "element-plus";
import { t, h3 as fe, h4 as me, cG as he, cH as ge } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const _e = { class: "main-container" }, xe = { class: "flex flex-wrap items-center justify-between gap-[10px]" }, ve = { class: "text-page-title" }, ye = { class: "mt-[18px] flex flex-wrap items-end gap-[16px]" }, be = { class: "flex flex-col gap-[6px]" }, we = { class: "text-[13px] text-[#606266]" }, ke = { class: "flex flex-col gap-[6px]" }, Ve = { class: "text-[13px] text-[#606266]" }, Ce = { class: "flex flex-col gap-[6px]" }, Le = { class: "text-[13px] text-[#606266]" }, Be = { class: "flex flex-col gap-[6px]" }, Me = { class: "text-[13px] text-[#606266]" }, Te = { class: "flex h-[32px] items-center gap-[16px]" }, De = {
  key: 0,
  class: "mt-[10px] text-[12px] text-[#909399]"
}, Se = {
  key: 0,
  class: "ml-[10px]"
}, Ue = { class: "ml-[10px]" }, Ae = {
  key: 1,
  class: "mt-[18px]"
}, Ee = { class: "mt-[6px] flex flex-wrap justify-between text-[12px] text-[#909399]" }, Fe = { key: 0 }, Ne = {
  key: 3,
  class: "mt-[20px] grid grid-cols-1 gap-[16px] md:grid-cols-3"
}, Re = { class: "text-[13px] text-[#909399]" }, Pe = {
  key: 5,
  class: "mt-[20px]"
}, je = { class: "flex flex-wrap items-center justify-between gap-[10px]" }, ze = { class: "text-[14px] font-[500] text-[#303133]" }, Ie = { class: "flex flex-wrap items-center gap-[10px]" }, He = { class: "text-[13px] text-[#606266]" }, $e = { class: "text-[12px] text-[#909399]" }, Ze = /* @__PURE__ */ de({
  __name: "integrity",
  setup(qe) {
    const L = _([]), H = _([]), M = _({}), i = I({ target: "", algorithm: "crc32", path: "", isBom: !0, isCrlfLf: !0 }), v = _(!1), b = _(!1), V = _(""), T = _(""), D = _([]), m = I({ scanned: 0, total: 0, elapsed: 0 }), B = _([]), h = I({ new: 0, modified: 0, deleted: 0 }), S = _(""), U = _(""), A = w(() => L.value.find((e) => e.key === i.target)), $ = w(() => B.value.length > 0), W = w(() => m.total ? Math.min(100, Math.floor(m.scanned / m.total * 100)) : v.value ? 0 : 100), q = w(() => T.value === "cache" ? t("baselineSourceCache") : T.value === "cloud" ? t("baselineSourceCloud") : ""), G = w(() => {
      var o;
      const e = {
        ready: { type: "success", text: t("statusReady") },
        missing: { type: "warning", text: t("statusMissing") },
        version_mismatch: { type: "warning", text: t("statusVersionMismatch") },
        config_mismatch: { type: "warning", text: t("statusConfigMismatch") },
        rules_mismatch: { type: "warning", text: t("statusRulesMismatch") },
        corrupted: { type: "danger", text: t("statusCorrupted") },
        version_unknown: { type: "danger", text: t("statusVersionUnknown") }
      };
      return e[((o = A.value) == null ? void 0 : o.baseline_status) || "missing"] || e.missing;
    }), X = w(() => [
      { key: "new", label: t("summaryNew"), value: h.new, color: "#67c23a" },
      { key: "modified", label: t("summaryModified"), value: h.modified, color: "#e6a23c" },
      { key: "deleted", label: t("summaryDeleted"), value: h.deleted, color: "#f56c6c" }
    ]), Y = w(() => B.value.filter((e) => !(S.value && e.status !== S.value || U.value && !e.file.includes(U.value)))), Z = (e) => ({
      new: t("typeNew"),
      modified: t("typeModified"),
      deleted: t("typeDeleted")
    })[e] || e, ee = (e) => ({ new: "success", modified: "warning", deleted: "danger" })[e] || "info", K = () => ({
      algorithm: i.algorithm,
      is_bom: i.isBom ? 1 : 0,
      is_crlf_lf: i.isCrlfLf ? 1 : 0
    }), E = () => {
      b.value = !1, V.value = "", D.value = [], B.value = [], h.new = 0, h.modified = 0, h.deleted = 0, m.scanned = 0, m.total = 0, m.elapsed = 0, T.value = "";
    }, te = (e) => {
      const o = [];
      if (Array.isArray(e.details) && e.details.length)
        e.details.forEach((c) => {
          o.push({
            file: c.file,
            status: c.status,
            size: c.size || 0,
            hashLocal: c.hash_local || "",
            hashBaseline: c.hash_baseline || ""
          }), c.status === "new" && h.new++, c.status === "modified" && h.modified++, c.status === "deleted" && h.deleted++;
        });
      else {
        const c = e.changed || {};
        Object.keys(c).forEach((d) => {
          o.push({ file: d, status: c[d], size: 0, hashLocal: "", hashBaseline: "" }), c[d] === "new" && h.new++, c[d] === "modified" && h.modified++;
        }), (e.deleted || []).forEach((d) => {
          o.push({ file: d, status: "deleted", size: 0, hashLocal: "", hashBaseline: "" }), h.deleted++;
        });
      }
      o.length && (B.value = B.value.concat(o));
    }, le = (e) => e ? e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1024 / 1024).toFixed(1)} MB` : "0 B", ae = (e) => (e.hashLocal || e.hashBaseline || "").slice(0, 8) || "-", se = () => {
      if (!i.target) {
        Q({ message: t("targetRequired"), type: "warning" });
        return;
      }
      E(), v.value = !0;
      const e = Date.now();
      let o = 0;
      const c = () => {
        he({
          target: i.target,
          path: i.path,
          cursor: o,
          ...K()
        }).then((d) => {
          const f = d.data;
          m.total = f.total, m.scanned += f.scanned, T.value = f.baseline_source, Array.isArray(f.warnings) && f.warnings.length && (D.value = D.value.concat(f.warnings)), te(f), f.done ? (m.elapsed = Date.now() - e, v.value = !1, b.value = !0, P()) : (o = f.next_cursor, c());
        }).catch((d) => {
          v.value = !1, V.value = (d == null ? void 0 : d.msg) || t("checkFailed");
        });
      };
      c();
    }, P = () => {
      ge(K()).then((e) => {
        L.value = e.data, !i.target && L.value.length && (i.target = L.value[0].key);
      }).catch((e) => {
        V.value = (e == null ? void 0 : e.msg) || t("configLoadFailed");
      });
    }, j = () => {
      E(), Q({ message: t("ruleChangedTip"), type: "warning" }), P();
    };
    return ue(() => {
      fe().then((e) => {
        M.value = e.data, i.algorithm = e.data.default_algorithm || "crc32", i.isBom = e.data.is_bom !== !1, i.isCrlfLf = e.data.is_crlf_lf !== !1, P();
      }).catch((e) => {
        V.value = (e == null ? void 0 : e.msg) || t("configLoadFailed");
      }), me().then((e) => {
        H.value = e.data;
      }).catch((e) => console.error(e));
    }), (e, o) => {
      const c = x("el-tag"), d = x("el-option"), f = x("el-select"), O = x("el-input"), J = x("el-checkbox"), oe = x("el-button"), ne = x("el-progress"), z = x("el-alert"), F = x("el-table-column"), ie = x("el-table"), re = x("el-card");
      return u(), g("div", _e, [
        r(re, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: p(() => [
            n("div", xe, [
              n("span", ve, s(l(t)("title")), 1),
              M.value.version ? (u(), C(c, {
                key: 0,
                type: "info",
                effect: "plain"
              }, {
                default: p(() => [
                  k(s(l(t)("currentVersion")) + "：" + s(M.value.version) + " (" + s(M.value.version_code) + ") ", 1)
                ]),
                _: 1
              })) : y("", !0)
            ]),
            n("div", ye, [
              n("div", be, [
                n("span", we, s(l(t)("targetLabel")), 1),
                r(f, {
                  modelValue: i.target,
                  "onUpdate:modelValue": o[0] || (o[0] = (a) => i.target = a),
                  class: "!w-[220px]",
                  filterable: "",
                  placeholder: l(t)("targetPlaceholder"),
                  onChange: E
                }, {
                  default: p(() => [
                    (u(!0), g(N, null, R(L.value, (a) => (u(), C(d, {
                      key: a.key,
                      label: a.name,
                      value: a.key
                    }, null, 8, ["label", "value"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "placeholder"])
              ]),
              n("div", ke, [
                n("span", Ve, s(l(t)("algorithmLabel")), 1),
                r(f, {
                  modelValue: i.algorithm,
                  "onUpdate:modelValue": o[1] || (o[1] = (a) => i.algorithm = a),
                  class: "!w-[200px]",
                  onChange: j
                }, {
                  default: p(() => [
                    (u(!0), g(N, null, R(H.value, (a) => (u(), C(d, {
                      key: a.value,
                      label: a.name,
                      value: a.value
                    }, null, 8, ["label", "value"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              n("div", Ce, [
                n("span", Le, s(l(t)("pathLabel")), 1),
                r(O, {
                  modelValue: i.path,
                  "onUpdate:modelValue": o[2] || (o[2] = (a) => i.path = a),
                  modelModifiers: { trim: !0 },
                  class: "!w-[220px]",
                  clearable: "",
                  placeholder: l(t)("pathPlaceholder"),
                  onChange: E
                }, null, 8, ["modelValue", "placeholder"])
              ]),
              n("div", Be, [
                n("span", Me, s(l(t)("ruleLabel")), 1),
                n("div", Te, [
                  r(J, {
                    modelValue: i.isBom,
                    "onUpdate:modelValue": o[3] || (o[3] = (a) => i.isBom = a),
                    onChange: j
                  }, {
                    default: p(() => [
                      k(s(l(t)("ignoreBom")), 1)
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  r(J, {
                    modelValue: i.isCrlfLf,
                    "onUpdate:modelValue": o[4] || (o[4] = (a) => i.isCrlfLf = a),
                    onChange: j
                  }, {
                    default: p(() => [
                      k(s(l(t)("ignoreEol")), 1)
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ])
              ]),
              r(oe, {
                type: "primary",
                loading: v.value,
                disabled: v.value,
                onClick: se
              }, {
                default: p(() => [
                  k(s(v.value ? l(t)("checking") : b.value ? l(t)("rescan") : l(t)("startCheck")), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"]),
              r(c, {
                type: l(G).type,
                effect: "light"
              }, {
                default: p(() => [
                  k(s(l(G).text), 1)
                ]),
                _: 1
              }, 8, ["type"])
            ]),
            l(A) ? (u(), g("div", De, [
              k(s(l(t)("baselineFile")) + "：" + s(l(A).baseline_file || "-") + " ", 1),
              l(q) ? (u(), g("span", Se, "（" + s(l(q)) + "）", 1)) : y("", !0),
              n("span", Ue, s(l(t)("rulesVersionLabel")) + "：" + s(l(A).rules_version || "-"), 1)
            ])) : y("", !0),
            v.value || b.value ? (u(), g("div", Ae, [
              r(ne, {
                percentage: l(W),
                "stroke-width": 10,
                "show-text": !1
              }, null, 8, ["percentage"]),
              n("div", Ee, [
                n("span", null, s(l(t)("scanned")) + "：" + s(m.scanned) + " / " + s(m.total), 1),
                v.value ? y("", !0) : (u(), g("span", Fe, s(l(t)("elapsed")) + "：" + s(m.elapsed) + " ms", 1))
              ])
            ])) : y("", !0),
            V.value ? (u(), C(z, {
              key: 2,
              class: "mt-[16px]",
              type: "error",
              closable: !1,
              "show-icon": "",
              title: V.value
            }, null, 8, ["title"])) : y("", !0),
            (u(!0), g(N, null, R(D.value, (a, ce) => (u(), C(z, {
              key: "w" + ce,
              class: "mt-[16px]",
              type: "warning",
              closable: !1,
              "show-icon": "",
              title: a
            }, null, 8, ["title"]))), 128)),
            b.value ? (u(), g("div", Ne, [
              (u(!0), g(N, null, R(l(X), (a) => (u(), g("div", {
                key: a.key,
                class: "rounded-[10px] border border-solid border-[#ebeef5] bg-white p-[16px] transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              }, [
                n("div", Re, s(a.label), 1),
                n("div", {
                  class: "mt-[6px] text-[26px] font-[600]",
                  style: pe({ color: a.color })
                }, s(a.value), 5)
              ]))), 128))
            ])) : y("", !0),
            b.value && !l($) ? (u(), C(z, {
              key: 4,
              class: "mt-[20px]",
              type: "success",
              closable: !1,
              "show-icon": "",
              title: l(t)("allMatched"),
              description: l(t)("allMatchedTip")
            }, null, 8, ["title", "description"])) : y("", !0),
            b.value && l($) ? (u(), g("div", Pe, [
              n("div", je, [
                n("span", ze, s(l(t)("detailTitle")), 1),
                n("div", Ie, [
                  r(f, {
                    modelValue: S.value,
                    "onUpdate:modelValue": o[5] || (o[5] = (a) => S.value = a),
                    class: "!w-[140px]"
                  }, {
                    default: p(() => [
                      r(d, {
                        label: l(t)("filterAll"),
                        value: ""
                      }, null, 8, ["label"]),
                      r(d, {
                        label: l(t)("typeNew"),
                        value: "new"
                      }, null, 8, ["label"]),
                      r(d, {
                        label: l(t)("typeModified"),
                        value: "modified"
                      }, null, 8, ["label"]),
                      r(d, {
                        label: l(t)("typeDeleted"),
                        value: "deleted"
                      }, null, 8, ["label"])
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  r(O, {
                    modelValue: U.value,
                    "onUpdate:modelValue": o[6] || (o[6] = (a) => U.value = a),
                    modelModifiers: { trim: !0 },
                    class: "!w-[220px]",
                    clearable: "",
                    placeholder: l(t)("keywordPlaceholder")
                  }, null, 8, ["modelValue", "placeholder"])
                ])
              ]),
              r(ie, {
                class: "mt-[10px]",
                data: l(Y),
                size: "large",
                "max-height": "520"
              }, {
                empty: p(() => [
                  n("span", null, s(l(t)("emptyData")), 1)
                ]),
                default: p(() => [
                  r(F, {
                    prop: "file",
                    label: l(t)("filePath"),
                    "min-width": "360",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  r(F, {
                    label: l(t)("changeType"),
                    width: "120"
                  }, {
                    default: p(({ row: a }) => [
                      r(c, {
                        type: ee(a.status),
                        effect: "light"
                      }, {
                        default: p(() => [
                          k(s(Z(a.status)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  r(F, {
                    label: l(t)("fileSize"),
                    width: "110"
                  }, {
                    default: p(({ row: a }) => [
                      n("span", He, s(le(a.size)), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  r(F, {
                    label: l(t)("fileHash"),
                    width: "140"
                  }, {
                    default: p(({ row: a }) => [
                      n("span", $e, s(ae(a)), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])
            ])) : y("", !0)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  Ze as default
};
