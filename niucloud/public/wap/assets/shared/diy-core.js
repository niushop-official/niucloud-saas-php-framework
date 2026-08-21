var _ne = Object.defineProperty;
var yne = (o, e, t) => e in o ? _ne(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var be = (o, e, t) => (yne(o, typeof e != "symbol" ? e + "" : e, t), t);
import { defineStore as Eo } from "pinia";
import { ref as K, getCurrentInstance as yn, nextTick as oe, toRaw as ho, isInSSRComponentSetup as $ne, injectHook as vne, inject as bne, reactive as At, computed as $n, watch as vn, onMounted as Tne } from "vue";
import { createI18n as Pne } from "vue-i18n";
const Sne = [], One = [], wne = {
  list: []
}, Cne = {
  custom: {}
}, we = {
  pages: Sne,
  subPackages: One,
  tabBar: wne,
  easycom: Cne
};
function Mne() {
  const o = [];
  return we.pages.forEach((e) => {
    e.needLogin && o.push(`/${e.path}`);
  }), we.subPackages && we.subPackages.forEach((e) => {
    e.pages && e.pages.forEach((t) => {
      t.needLogin && o.push(`/${e.root}/${t.path}`);
    });
  }), o;
}
function Ane() {
  const o = [];
  return we.pages.forEach((e) => {
    o.push(`/${e.path}`);
  }), o;
}
function jne() {
  const o = [];
  return we.subPackages && we.subPackages.forEach((e) => {
    e.pages && e.pages.forEach((t) => {
      o.push(`/${e.root}/${t.path}`);
    });
  }), o;
}
function kne() {
  return we.tabBar.list.map((o) => `/${o.pagePath}`);
}
const jt = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, r) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(r.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
function Ine() {
  return !1;
}
const Lo = "__NIUCLOUD_ACTIVE_ADDON_ROUTE__";
function Nne() {
  const o = globalThis;
  return o[Lo] || (o[Lo] = K("")), o[Lo];
}
function Dne() {
  const o = Nne().value;
  if (o)
    return o;
  const e = globalThis.location;
  if (e && typeof e.pathname == "string") {
    const t = e.pathname.indexOf("/addon/");
    if (t !== -1)
      return e.pathname.slice(t);
  }
  return "";
}
const Ho = "/wap";
function Ene(o) {
  return o.replace(/^\/wap\/\d+\//, "/wap/");
}
function kt(o) {
  return !o || o.startsWith("http") ? o : o.startsWith("/wap/") ? Ene(o) : o.startsWith("/assets/") ? `${Ho}${o}` : o.startsWith("./") ? `${Ho}/assets/addons/${o.slice(2)}` : `${Ho}/${o.replace(/^\//, "")}`;
}
function pt() {
  return uni;
}
function eo(o) {
  let e = (o || "").trim();
  return !e || e === "/" ? "/" : (e.startsWith("/") || (e = `/${e}`), e = e.replace(/^\/wap\/(?:\d+\/)?/, "/"), e.startsWith("/") || (e = `/${e}`), e);
}
function xne() {
  var o, e;
  try {
    const t = globalThis, n = ((o = t.getCurrentPages) == null ? void 0 : o.call(t)) || [], r = (e = n[n.length - 1]) == null ? void 0 : e.route;
    return r ? eo(r) : "";
  } catch {
    return "";
  }
}
function Rne() {
  var c, a;
  const o = Dne(), e = xne(), t = typeof window < "u" && ((c = window.location) != null && c.pathname) ? eo(window.location.pathname) : "", n = !!e && e.includes("/app/pages/addon-universal");
  if (o && n)
    return eo(o);
  if (e)
    return e;
  if (t)
    return t;
  const r = yn(), s = (a = r == null ? void 0 : r.appContext.config.globalProperties.$route) == null ? void 0 : a.path;
  return s ? eo(s) : "/";
}
function zne(o) {
  try {
    const e = eo(o).replace(/^\//, "");
    if (!e)
      return { file: "pages.index.index", fileKey: "pages.index.index", route: "app" };
    const t = e.split("/").filter(Boolean);
    if (t[0] === "app") {
      const n = t.slice(1).join("/"), r = n ? n.replace(/\//g, ".") : "pages.index.index";
      return { file: r, fileKey: r, route: "app" };
    }
    if (t[0] === "addon" && t.length >= 3) {
      const n = t[1], s = t.slice(2).join("/").replace(/\//g, ".");
      return { file: s, fileKey: `${n}.${s}`, route: n };
    }
    return { file: "pages.index.index", fileKey: "pages.index.index", route: "app" };
  } catch {
    return { file: "pages.index.index", fileKey: "pages.index.index", route: "app" };
  }
}
class Fne {
  constructor(e) {
    be(this, "i18n");
    be(this, "loadLocale", []);
    //已加载的语言
    be(this, "path", "");
    be(this, "getFileKey", (e) => zne(e));
    this.i18n = e;
  }
  /**
   *
   * @param locale 设置语言
   */
  setI18nLanguage(e, t = "") {
    this.i18n.global.locale != e && (this.i18n.global.locale = e, t && (this.path = t), pt().setLocale(e));
  }
  loadAllLocaleMessages(e, t) {
    (e == "app" ? Ane() : jne()).forEach((r) => {
      this.loadLocaleMessages(r, t);
    });
  }
  /**
   * 分构建下从 assets/locale/app/{locale}/ 拉取主包语言包
   */
  async loadSplitAppLocale(e, t, n) {
    if (this.loadLocale.includes(`${t}.${n}`))
      return this.setI18nLanguage(n, e), oe();
    this.loadLocale.push(`${t}.${n}`);
    try {
      const r = kt(`assets/locale/app/${n}/${e}.json`), s = await fetch(r);
      if (!s.ok)
        throw new Error(String(s.status));
      if ((s.headers.get("content-type") || "").toLowerCase().includes("text/html"))
        throw new Error("invalid locale response");
      const a = await s.json(), i = {};
      Object.keys(a).forEach((l) => {
        i[`${t}.${l}`] = a[l];
      }), this.i18n.global.mergeLocaleMessage(n, i), this.setI18nLanguage(n, e);
    } catch {
      this.setI18nLanguage(n, e);
    }
    return oe();
  }
  async fetchLocaleJson(e) {
    const t = await fetch(e);
    if (!t.ok)
      throw new Error(String(t.status));
    if ((t.headers.get("content-type") || "").toLowerCase().includes("text/html"))
      throw new Error("invalid locale response");
    return t.json();
  }
  mergeLocalePack(e, t, n) {
    const r = {};
    Object.keys(n).forEach((s) => {
      r[`${t}.${s}`] = n[s];
    }), this.i18n.global.mergeLocaleMessage(e, r);
  }
  /**
   * 分构建下从 assets/addons/{key}/locale/ 拉取语言包（含 common.json）
   */
  async loadSplitAddonLocale(e, t, n, r) {
    if (this.loadLocale.includes(`${n}.${r}`))
      return this.setI18nLanguage(r, t), oe();
    this.loadLocale.push(`${n}.${r}`);
    const s = `${e}.common.${r}`, c = kt(`assets/addons/${e}/locale/${r}`);
    try {
      if (t !== "common" && !this.loadLocale.includes(s)) {
        this.loadLocale.push(s);
        try {
          const i = await this.fetchLocaleJson(`${c}/common.json`);
          this.mergeLocalePack(r, `${e}.common`, i), Object.keys(i).forEach((l) => {
            this.i18n.global.mergeLocaleMessage(r, { [l]: i[l] });
          });
        } catch {
        }
      }
      const a = await this.fetchLocaleJson(`${c}/${t}.json`);
      this.mergeLocalePack(r, n, a), this.setI18nLanguage(r, t);
    } catch {
      this.setI18nLanguage(r, t);
    }
    return oe();
  }
  /**
   * 加载语言包
   * @param path
   * @param locale
   * @returns
   */
  async loadLocaleMessages(e, t) {
    try {
      const { route: n, file: r, fileKey: s } = this.getFileKey(e);
      if (this.loadLocale.includes(`${s}.${t}`))
        return this.setI18nLanguage(t, r), oe();
      Ine(), this.loadLocale.push(`${s}.${t}`);
      let c;
      c = await (n == "app" ? jt(/* @__PURE__ */ Object.assign({ "../app/locale/en/pages.setting.index.json": () => Promise.resolve().then(() => vue), "../app/locale/zh-Hans/pages.article.detail.json": () => Promise.resolve().then(() => Tue), "../app/locale/zh-Hans/pages.article.list.json": () => Promise.resolve().then(() => Sue), "../app/locale/zh-Hans/pages.auth.bind.json": () => Promise.resolve().then(() => wue), "../app/locale/zh-Hans/pages.auth.index.json": () => Promise.resolve().then(() => Mue), "../app/locale/zh-Hans/pages.auth.login.json": () => Promise.resolve().then(() => jue), "../app/locale/zh-Hans/pages.auth.register.json": () => Promise.resolve().then(() => Iue), "../app/locale/zh-Hans/pages.auth.resetpwd.json": () => Promise.resolve().then(() => Due), "../app/locale/zh-Hans/pages.friendspay.money.json": () => Promise.resolve().then(() => xue), "../app/locale/zh-Hans/pages.friendspay.share.json": () => Promise.resolve().then(() => zue), "../app/locale/zh-Hans/pages.index.develop.json": () => Promise.resolve().then(() => Lue), "../app/locale/zh-Hans/pages.member.account.json": () => Promise.resolve().then(() => Bue), "../app/locale/zh-Hans/pages.member.account_edit.json": () => Promise.resolve().then(() => Wue), "../app/locale/zh-Hans/pages.member.address.json": () => Promise.resolve().then(() => Vue), "../app/locale/zh-Hans/pages.member.address_edit.json": () => Promise.resolve().then(() => Yue), "../app/locale/zh-Hans/pages.member.apply_cash_out.json": () => Promise.resolve().then(() => Que), "../app/locale/zh-Hans/pages.member.balance.json": () => Promise.resolve().then(() => Jue), "../app/locale/zh-Hans/pages.member.cash_out.json": () => Promise.resolve().then(() => epe), "../app/locale/zh-Hans/pages.member.cash_out_detail.json": () => Promise.resolve().then(() => tpe), "../app/locale/zh-Hans/pages.member.commission.json": () => Promise.resolve().then(() => rpe), "../app/locale/zh-Hans/pages.member.detailed_account.json": () => Promise.resolve().then(() => ape), "../app/locale/zh-Hans/pages.member.location_address_edit.json": () => Promise.resolve().then(() => ipe), "../app/locale/zh-Hans/pages.member.personal.json": () => Promise.resolve().then(() => dpe), "../app/locale/zh-Hans/pages.member.recharge_record.json": () => Promise.resolve().then(() => ppe), "../app/locale/zh-Hans/pages.member.recharge_record_detail.json": () => Promise.resolve().then(() => fpe), "../app/locale/zh-Hans/pages.member.withdrawal_detail.json": () => Promise.resolve().then(() => hpe), "../app/locale/zh-Hans/pages.setting.index.json": () => Promise.resolve().then(() => ype) }), `../app/locale/${t}/${r}.json`) : jt(/* @__PURE__ */ Object.assign({ "../addon/cms/locale/zh-Hans/pages.detail.json": () => Promise.resolve().then(() => vpe), "../addon/cms/locale/zh-Hans/pages.list.json": () => Promise.resolve().then(() => Tpe), "../addon/friend_help/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => Spe), "../addon/friend_help/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => wpe), "../addon/friend_help/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => Mpe), "../addon/friend_help/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => jpe), "../addon/friend_help/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => Ipe), "../addon/friend_help/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => Dpe), "../addon/friend_help/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => xpe), "../addon/home_service/locale/zh-Hans/common.json": () => Promise.resolve().then(() => zpe), "../addon/home_service/locale/zh-Hans/store.pages.auth.login.json": () => Promise.resolve().then(() => Lpe), "../addon/home_service/locale/zh-Hans/store.pages.auth.register.json": () => Promise.resolve().then(() => Bpe), "../addon/home_service/locale/zh-Hans/store.pages.index.json": () => Promise.resolve().then(() => Wpe), "../addon/home_service/locale/zh-Hans/store.pages.member.cash.cash_out.json": () => Promise.resolve().then(() => Vpe), "../addon/home_service/locale/zh-Hans/store.pages.member.cash.cash_out_detail.json": () => Promise.resolve().then(() => Ype), "../addon/home_service/locale/zh-Hans/store.pages.member.evaluate.json": () => Promise.resolve().then(() => Qpe), "../addon/home_service/locale/zh-Hans/store.pages.member.feedback.feedback.json": () => Promise.resolve().then(() => Jpe), "../addon/home_service/locale/zh-Hans/store.pages.member.help.detail.json": () => Promise.resolve().then(() => eme), "../addon/home_service/locale/zh-Hans/store.pages.member.help.help.json": () => Promise.resolve().then(() => tme), "../addon/home_service/locale/zh-Hans/store.pages.member.index.json": () => Promise.resolve().then(() => rme), "../addon/home_service/locale/zh-Hans/store.pages.member.store_info.json": () => Promise.resolve().then(() => ame), "../addon/home_service/locale/zh-Hans/store.pages.member.store_list.json": () => Promise.resolve().then(() => ime), "../addon/home_service/locale/zh-Hans/store.pages.order.detail.json": () => Promise.resolve().then(() => dme), "../addon/home_service/locale/zh-Hans/store.pages.order.dispatchOrder.json": () => Promise.resolve().then(() => pme), "../addon/home_service/locale/zh-Hans/store.pages.order.dispatchTechnician.json": () => Promise.resolve().then(() => fme), "../addon/home_service/locale/zh-Hans/store.pages.order.grapOrder.json": () => Promise.resolve().then(() => hme), "../addon/home_service/locale/zh-Hans/store.pages.order.indent.json": () => Promise.resolve().then(() => yme), "../addon/home_service/locale/zh-Hans/store.pages.order.indent_list.json": () => Promise.resolve().then(() => vme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.account_statement.json": () => Promise.resolve().then(() => Tme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.list.json": () => Promise.resolve().then(() => Sme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.order_statistics.json": () => Promise.resolve().then(() => wme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.summary.json": () => Promise.resolve().then(() => Mme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.withdraw.json": () => Promise.resolve().then(() => jme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.withdraw_edit.json": () => Promise.resolve().then(() => Ime), "../addon/home_service/locale/zh-Hans/store.pages.store.account.withdraw_list.json": () => Promise.resolve().then(() => Dme), "../addon/home_service/locale/zh-Hans/store.pages.store.index.json": () => Promise.resolve().then(() => xme), "../addon/home_service/locale/zh-Hans/store.pages.store.settle.json": () => Promise.resolve().then(() => zme), "../addon/home_service/locale/zh-Hans/store.pages.store.submit_success.json": () => Promise.resolve().then(() => Lme), "../addon/home_service/locale/zh-Hans/store.pages.technician.detail.json": () => Promise.resolve().then(() => Bme), "../addon/home_service/locale/zh-Hans/store.pages.technician.index.json": () => Promise.resolve().then(() => Wme), "../addon/home_service/locale/zh-Hans/store.pages.technician.rest.json": () => Promise.resolve().then(() => Vme), "../addon/home_service/locale/zh-Hans/technician.pages.auth.login.json": () => Promise.resolve().then(() => Yme), "../addon/home_service/locale/zh-Hans/technician.pages.auth.register.json": () => Promise.resolve().then(() => Qme), "../addon/home_service/locale/zh-Hans/technician.pages.index.json": () => Promise.resolve().then(() => Jme), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.account_statement.json": () => Promise.resolve().then(() => efe), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.list.json": () => Promise.resolve().then(() => tfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.summary.json": () => Promise.resolve().then(() => rfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.withdraw.json": () => Promise.resolve().then(() => afe), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.withdraw_edit.json": () => Promise.resolve().then(() => ife), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.withdraw_list.json": () => Promise.resolve().then(() => dfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.cash.cash_out.json": () => Promise.resolve().then(() => pfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.cash.cash_out_detail.json": () => Promise.resolve().then(() => ffe), "../addon/home_service/locale/zh-Hans/technician.pages.member.detail.json": () => Promise.resolve().then(() => hfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.feedback.feedback.json": () => Promise.resolve().then(() => yfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.help.detail.json": () => Promise.resolve().then(() => vfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.help.help.json": () => Promise.resolve().then(() => Tfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.index.json": () => Promise.resolve().then(() => Sfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.order.evaluate.json": () => Promise.resolve().then(() => wfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.order.statistics.json": () => Promise.resolve().then(() => Mfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.ranking_list.ranking_list.json": () => Promise.resolve().then(() => jfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.rest.index.json": () => Promise.resolve().then(() => Ife), "../addon/home_service/locale/zh-Hans/technician.pages.member.store.detail.json": () => Promise.resolve().then(() => Dfe), "../addon/home_service/locale/zh-Hans/technician.pages.notice.index.json": () => Promise.resolve().then(() => xfe), "../addon/home_service/locale/zh-Hans/technician.pages.order.additional.json": () => Promise.resolve().then(() => zfe), "../addon/home_service/locale/zh-Hans/technician.pages.order.detail.json": () => Promise.resolve().then(() => Lfe), "../addon/home_service/locale/zh-Hans/technician.pages.order.grabOrder.json": () => Promise.resolve().then(() => Bfe), "../addon/home_service/locale/zh-Hans/technician.pages.order.indent_order.json": () => Promise.resolve().then(() => Wfe), "../addon/home_service/locale/zh-Hans/technician.pages.order.index.json": () => Promise.resolve().then(() => Vfe), "../addon/home_service/locale/zh-Hans/user.pages.address.address_edit.json": () => Promise.resolve().then(() => Yfe), "../addon/home_service/locale/zh-Hans/user.pages.address.edit.json": () => Promise.resolve().then(() => Qfe), "../addon/home_service/locale/zh-Hans/user.pages.address.index.json": () => Promise.resolve().then(() => Jfe), "../addon/home_service/locale/zh-Hans/user.pages.card.detail.json": () => Promise.resolve().then(() => ege), "../addon/home_service/locale/zh-Hans/user.pages.card.my_card.json": () => Promise.resolve().then(() => tge), "../addon/home_service/locale/zh-Hans/user.pages.goods.category.json": () => Promise.resolve().then(() => rge), "../addon/home_service/locale/zh-Hans/user.pages.goods.detail.json": () => Promise.resolve().then(() => age), "../addon/home_service/locale/zh-Hans/user.pages.goods.list.json": () => Promise.resolve().then(() => ige), "../addon/home_service/locale/zh-Hans/user.pages.index.json": () => Promise.resolve().then(() => dge), "../addon/home_service/locale/zh-Hans/user.pages.master.statistics.index.json": () => Promise.resolve().then(() => pge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.add.json": () => Promise.resolve().then(() => fge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.detail.json": () => Promise.resolve().then(() => hge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.list.json": () => Promise.resolve().then(() => yge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.refund.json": () => Promise.resolve().then(() => vge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.show.json": () => Promise.resolve().then(() => Tge), "../addon/home_service/locale/zh-Hans/user.pages.member.collect.goods.json": () => Promise.resolve().then(() => Sge), "../addon/home_service/locale/zh-Hans/user.pages.member.collect.technician.json": () => Promise.resolve().then(() => wge), "../addon/home_service/locale/zh-Hans/user.pages.member.feedback.feedback.json": () => Promise.resolve().then(() => Mge), "../addon/home_service/locale/zh-Hans/user.pages.member.help.detail.json": () => Promise.resolve().then(() => jge), "../addon/home_service/locale/zh-Hans/user.pages.member.help.help.json": () => Promise.resolve().then(() => Ige), "../addon/home_service/locale/zh-Hans/user.pages.member.invoice.apply.json": () => Promise.resolve().then(() => Dge), "../addon/home_service/locale/zh-Hans/user.pages.order.detail.json": () => Promise.resolve().then(() => xge), "../addon/home_service/locale/zh-Hans/user.pages.order.evaluate.evaluate.json": () => Promise.resolve().then(() => zge), "../addon/home_service/locale/zh-Hans/user.pages.order.evaluate.json": () => Promise.resolve().then(() => Lge), "../addon/home_service/locale/zh-Hans/user.pages.order.evaluate.list.json": () => Promise.resolve().then(() => Bge), "../addon/home_service/locale/zh-Hans/user.pages.order.list.json": () => Promise.resolve().then(() => Wge), "../addon/home_service/locale/zh-Hans/user.pages.order.payment.json": () => Promise.resolve().then(() => Vge), "../addon/home_service/locale/zh-Hans/user.pages.order.refund.apply.json": () => Promise.resolve().then(() => Yge), "../addon/home_service/locale/zh-Hans/user.pages.order.refund.detail.json": () => Promise.resolve().then(() => Qge), "../addon/home_service/locale/zh-Hans/user.pages.order.refund.list.json": () => Promise.resolve().then(() => Jge), "../addon/home_service/locale/zh-Hans/user.pages.refund.log.json": () => Promise.resolve().then(() => ehe), "../addon/home_service/locale/zh-Hans/user.pages.service.reserve_detail.json": () => Promise.resolve().then(() => the), "../addon/home_service/locale/zh-Hans/user.pages.settle.store.json": () => Promise.resolve().then(() => rhe), "../addon/home_service/locale/zh-Hans/user.pages.settle.store_form.json": () => Promise.resolve().then(() => ahe), "../addon/home_service/locale/zh-Hans/user.pages.settle.submit_success.json": () => Promise.resolve().then(() => ihe), "../addon/home_service/locale/zh-Hans/user.pages.settle.technician.json": () => Promise.resolve().then(() => dhe), "../addon/home_service/locale/zh-Hans/user.pages.settle.technician_form.json": () => Promise.resolve().then(() => phe), "../addon/home_service/locale/zh-Hans/user.pages.technician.detail.json": () => Promise.resolve().then(() => fhe), "../addon/home_service/locale/zh-Hans/user.pages.technician.list.json": () => Promise.resolve().then(() => hhe), "../addon/o2o/locale/zh-Hans/common.json": () => Promise.resolve().then(() => yhe), "../addon/o2o/locale/zh-Hans/pages.address.address_edit.json": () => Promise.resolve().then(() => vhe), "../addon/o2o/locale/zh-Hans/pages.address.edit.json": () => Promise.resolve().then(() => The), "../addon/o2o/locale/zh-Hans/pages.address.index.json": () => Promise.resolve().then(() => She), "../addon/o2o/locale/zh-Hans/pages.goods.category.json": () => Promise.resolve().then(() => whe), "../addon/o2o/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => Mhe), "../addon/o2o/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => jhe), "../addon/o2o/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => Ihe), "../addon/o2o/locale/zh-Hans/pages.master.statistics.index.json": () => Promise.resolve().then(() => Dhe), "../addon/o2o/locale/zh-Hans/pages.master.task.add.json": () => Promise.resolve().then(() => xhe), "../addon/o2o/locale/zh-Hans/pages.master.task.detail.json": () => Promise.resolve().then(() => zhe), "../addon/o2o/locale/zh-Hans/pages.master.task.list.json": () => Promise.resolve().then(() => Lhe), "../addon/o2o/locale/zh-Hans/pages.master.task.refund.json": () => Promise.resolve().then(() => Bhe), "../addon/o2o/locale/zh-Hans/pages.master.task.show.json": () => Promise.resolve().then(() => Whe), "../addon/o2o/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => Vhe), "../addon/o2o/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => Yhe), "../addon/o2o/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => Qhe), "../addon/o2o/locale/zh-Hans/pages.refund.apply.json": () => Promise.resolve().then(() => Jhe), "../addon/o2o/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => e_e), "../addon/o2o/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => t_e), "../addon/o2o/locale/zh-Hans/pages.refund.log.json": () => Promise.resolve().then(() => r_e), "../addon/o2o/locale/zh-Hans/pages.service.reserve_detail.json": () => Promise.resolve().then(() => a_e), "../addon/o2o/locale/zh-Hans/pages.technician.detail.json": () => Promise.resolve().then(() => i_e), "../addon/o2o/locale/zh-Hans/pages.technician.list.json": () => Promise.resolve().then(() => d_e), "../addon/pintuan/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => p_e), "../addon/pintuan/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => f_e), "../addon/pintuan/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => h_e), "../addon/pintuan/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => y_e), "../addon/pintuan/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => v_e), "../addon/pintuan/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => T_e), "../addon/recharge/locale/zh-Hans/common.json": () => Promise.resolve().then(() => S_e), "../addon/recharge/locale/zh-Hans/pages.recharge.json": () => Promise.resolve().then(() => w_e), "../addon/recharge/locale/zh-Hans/pages.recharge_record.json": () => Promise.resolve().then(() => M_e), "../addon/recharge/locale/zh-Hans/pages.recharge_record_detail.json": () => Promise.resolve().then(() => j_e), "../addon/relay/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => I_e), "../addon/relay/locale/zh-Hans/pages.hello_world.index.json": () => Promise.resolve().then(() => D_e), "../addon/relay/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => x_e), "../addon/relay/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => z_e), "../addon/relay/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => L_e), "../addon/relay/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => B_e), "../addon/relay/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => W_e), "../addon/seckill/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => V_e), "../addon/seckill/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => Y_e), "../addon/seckill/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => Q_e), "../addon/seckill/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => J_e), "../addon/seckill/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => eye), "../addon/seckill/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => tye), "../addon/shop/locale/zh-Hans/common.json": () => Promise.resolve().then(() => rye), "../addon/shop/locale/zh-Hans/pages.goods.cart.json": () => Promise.resolve().then(() => aye), "../addon/shop/locale/zh-Hans/pages.goods.category.json": () => Promise.resolve().then(() => iye), "../addon/shop/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => dye), "../addon/shop/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => pye), "../addon/shop/locale/zh-Hans/pages.goods.rank.json": () => Promise.resolve().then(() => fye), "../addon/shop/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => hye), "../addon/shop/locale/zh-Hans/pages.member.index.json": () => Promise.resolve().then(() => yye), "../addon/shop/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => vye), "../addon/shop/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => Tye), "../addon/shop/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => Sye), "../addon/shop/locale/zh-Hans/pages.point.detail.json": () => Promise.resolve().then(() => wye), "../addon/shop/locale/zh-Hans/pages.point.order_list.json": () => Promise.resolve().then(() => Mye), "../addon/shop/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => jye), "../addon/shop/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => Iye), "../addon/shop_fenxiao/locale/zh-Hans/common.json": () => Promise.resolve().then(() => Dye), "../addon/shop_fenxiao/locale/zh-Hans/pages.agent_list.json": () => Promise.resolve().then(() => xye), "../addon/shop_fenxiao/locale/zh-Hans/pages.apply.json": () => Promise.resolve().then(() => zye), "../addon/shop_fenxiao/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => Lye), "../addon/shop_fenxiao/locale/zh-Hans/pages.level.json": () => Promise.resolve().then(() => Bye), "../addon/shop_fenxiao/locale/zh-Hans/pages.order.json": () => Promise.resolve().then(() => Wye), "../addon/shop_fenxiao/locale/zh-Hans/pages.task_detail.json": () => Promise.resolve().then(() => Vye), "../addon/shop_fenxiao/locale/zh-Hans/pages.team_dividend.json": () => Promise.resolve().then(() => Yye), "../addon/shop_giftcard/locale/zh-Hans/common.json": () => Promise.resolve().then(() => Qye), "../addon/shop_giftcard/locale/zh-Hans/pages.activate.json": () => Promise.resolve().then(() => Jye), "../addon/shop_giftcard/locale/zh-Hans/pages.card_bag.json": () => Promise.resolve().then(() => e$e), "../addon/shop_giftcard/locale/zh-Hans/pages.detail.json": () => Promise.resolve().then(() => t$e), "../addon/shop_giftcard/locale/zh-Hans/pages.give.json": () => Promise.resolve().then(() => r$e), "../addon/shop_giftcard/locale/zh-Hans/pages.give_detail.json": () => Promise.resolve().then(() => a$e), "../addon/shop_giftcard/locale/zh-Hans/pages.give_list.json": () => Promise.resolve().then(() => i$e), "../addon/shop_giftcard/locale/zh-Hans/pages.list.json": () => Promise.resolve().then(() => d$e), "../addon/shop_giftcard/locale/zh-Hans/pages.my_card_list.json": () => Promise.resolve().then(() => p$e), "../addon/shop_giftcard/locale/zh-Hans/pages.order_detail.json": () => Promise.resolve().then(() => f$e), "../addon/shop_giftcard/locale/zh-Hans/pages.order_list.json": () => Promise.resolve().then(() => h$e), "../addon/shop_giftcard/locale/zh-Hans/pages.payment.json": () => Promise.resolve().then(() => y$e), "../addon/shop_giftcard/locale/zh-Hans/pages.receive_info.json": () => Promise.resolve().then(() => v$e), "../addon/shop_giftcard/locale/zh-Hans/pages.receive_list.json": () => Promise.resolve().then(() => T$e), "../addon/shop_giftcard/locale/zh-Hans/pages.use_card.json": () => Promise.resolve().then(() => S$e), "../addon/shop_giftcard/locale/zh-Hans/pages.use_goods_select.json": () => Promise.resolve().then(() => w$e), "../addon/sow_community/locale/zh-Hans/common.json": () => Promise.resolve().then(() => M$e), "../addon/sow_community/locale/zh-Hans/pages.create.json": () => Promise.resolve().then(() => j$e), "../addon/sow_community/locale/zh-Hans/pages.follow.json": () => Promise.resolve().then(() => I$e), "../addon/sow_community/locale/zh-Hans/pages.image.detail.json": () => Promise.resolve().then(() => D$e), "../addon/sow_community/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => x$e), "../addon/sow_community/locale/zh-Hans/pages.member.json": () => Promise.resolve().then(() => z$e), "../addon/sow_community/locale/zh-Hans/pages.search.json": () => Promise.resolve().then(() => L$e), "../addon/sow_community/locale/zh-Hans/pages.sow_show.json": () => Promise.resolve().then(() => B$e), "../addon/sow_community/locale/zh-Hans/pages.topic_list.json": () => Promise.resolve().then(() => W$e), "../addon/sow_community/locale/zh-Hans/pages.video.detail.json": () => Promise.resolve().then(() => V$e), "../addon/template_flower_industry/locale/zh-Hans/common.json": () => Promise.resolve().then(() => Y$e), "../addon/template_flower_industry/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => Q$e), "../addon/tourism/locale/zh-Hans/common.json": () => Promise.resolve().then(() => J$e), "../addon/tourism/locale/zh-Hans/pages.hotel.detail.json": () => Promise.resolve().then(() => eve), "../addon/tourism/locale/zh-Hans/pages.hotel.list.json": () => Promise.resolve().then(() => tve), "../addon/tourism/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => rve), "../addon/tourism/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => ave), "../addon/tourism/locale/zh-Hans/pages.scenic.detail.json": () => Promise.resolve().then(() => ive), "../addon/tourism/locale/zh-Hans/pages.scenic.list.json": () => Promise.resolve().then(() => dve), "../addon/tourism/locale/zh-Hans/pages.scenic.order.json": () => Promise.resolve().then(() => pve), "../addon/tourism/locale/zh-Hans/pages.verify.detail.json": () => Promise.resolve().then(() => fve), "../addon/tourism/locale/zh-Hans/pages.verify.index.json": () => Promise.resolve().then(() => hve), "../addon/tourism/locale/zh-Hans/pages.way.list.json": () => Promise.resolve().then(() => yve), "../addon/vipcard/locale/zh-Hans/common.json": () => Promise.resolve().then(() => vve), "../addon/vipcard/locale/zh-Hans/pages.card.detail.json": () => Promise.resolve().then(() => Tve), "../addon/vipcard/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => Sve), "../addon/vipcard/locale/zh-Hans/pages.order.card_record.json": () => Promise.resolve().then(() => wve), "../addon/vipcard/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => Mve), "../addon/vipcard/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => jve), "../addon/vipcard/locale/zh-Hans/pages.order.my_card.json": () => Promise.resolve().then(() => Ive), "../addon/vipcard/locale/zh-Hans/pages.order.my_card_detail.json": () => Promise.resolve().then(() => Dve), "../addon/vipcard/locale/zh-Hans/pages.order.my_reserved.json": () => Promise.resolve().then(() => xve), "../addon/vipcard/locale/zh-Hans/pages.order.my_reserved_detail.json": () => Promise.resolve().then(() => zve), "../addon/vipcard/locale/zh-Hans/pages.service.detail.json": () => Promise.resolve().then(() => Lve), "../addon/vipcard/locale/zh-Hans/pages.service.list.json": () => Promise.resolve().then(() => Bve), "../addon/vipcard/locale/zh-Hans/pages.service.reserve_detail.json": () => Promise.resolve().then(() => Wve), "../addon/vipcard/locale/zh-Hans/pages.verify.detail.json": () => Promise.resolve().then(() => Vve), "../addon/vipcard/locale/zh-Hans/pages.verify.index.json": () => Promise.resolve().then(() => Yve), "../addon/vipcard/locale/zh-Hans/pages.verify.record.json": () => Promise.resolve().then(() => Qve) }), `../addon/${n}/locale/${t}/${r}.json`));
      let a = {};
      return Object.keys(c.default).forEach((i) => {
        a[`${s}.${i}`] = c.default[i];
      }), this.i18n.global.mergeLocaleMessage(t, a), this.setI18nLanguage(t, r), oe();
    } catch {
      return this.setI18nLanguage(t), oe();
    }
  }
}
const Lne = "请求失败", Hne = "不在request 合法域名列表中", Bne = " 接口请求错误,请检查VITE_APP_BASE_URL参数配置或者伪静态配置", Une = "￥", Wne = "获取验证码", qne = "秒后重新获取", Vne = "请完成验证", Gne = "确认", Yne = "取消", Kne = "保存", Qne = "请输入验证码", Xne = "请输入手机号码", Jne = "请输入正确的手机号", Zne = "请输入手机验证码", ere = "个人中心", ore = "用户协议", tre = "和", nre = "隐私协议", rre = "请先阅读并同意协议", sre = "昵称", are = "请输入昵称", cre = "头像", ire = "请设置头像", lre = "获取您的昵称头像", dre = "获取用户头像、昵称完善个人资料，主要用于向用户提供具有辨识度的用户中心界面", ure = "手机号", pre = "获取手机号", mre = "请获取手机号", fre = "积分", gre = "余额", hre = "登录", _re = "绑定", yre = "绑定中", $re = "绑定手机号", vre = "我已阅读并同意", bre = "请勾选已阅读并同意", Tre = "一键绑定", Pre = "手机号快捷登录", Sre = "注册", Ore = "完成", wre = "关闭", Cre = {
  back: "返回",
  hidden: "已隐藏",
  view: "查看",
  know: "我知道了",
  prompt: "提示",
  call: "拨打",
  copy: "复制号码",
  uploadTips: "请上传图片",
  tips: "仅限本人和管理员能查看完整号码：",
  viewFillingDetails: "查看填写详情",
  detailInformation: "详细信息"
}, Mre = {
  orderInfo: "订单信息",
  confirmPay: "确认支付",
  payTitle: "确认付款",
  notHavePayType: "没有可用的支付方式",
  notObtainedInfo: "未获取到支付信息",
  paymentDocuments: "该支付单据",
  paySuccess: "支付成功",
  payFail: "支付失败",
  completePay: "已完成支付",
  incompletePay: "未完成支付",
  getting: "获取支付结果中"
}, Are = "我的余额", jre = "我的积分", kre = "联系客服", Ire = "站点已关闭", Nre = "站点不存在", Dre = "页面不存在", Ere = "景点", xre = "查看更多", Rre = "线路", zre = "酒店", Fre = "起", Lre = "项目预约", Hre = "办理次卡", Bre = "会员名称", Ure = "会员码", Wre = "预约", qre = "预约成功", Vre = "次卡", Gre = "我的", Yre = "去抢购", Kre = "办理", Qre = "已售", Xre = "待支付", Jre = "待使用", Zre = "已完成", ese = "全部订单", ose = "我的订单", tse = "订单号", nse = "实付款", rse = "关闭订单", sse = "删除订单", ase = "确认收货", cse = "详情", ise = {
  title: "用户隐私保护提示",
  descBefore: "感谢您使用本小程序，在使用前您应当阅读并同意",
  descAfter: "当点击同意并继续时，即表示您已理解并同意该条款内容，该条款将对您产生法律约束力；如您不同意，将无法继续使用小程序相关功能。",
  disagree: "不同意",
  agree: "同意并继续",
  contractName: "用户隐私保护指引",
  disagreeDesc: "未同意隐私协议，无法使用相关功能"
}, lse = "星级", dse = "星", use = "暂无收货地址，请先创建地址", pse = "新增收货地址", mse = "选择地址", fse = "优惠劵", gse = "无", hse = "次卡", _se = "张", yse = {
  requestFail: Lne,
  notInDomainList: Hne,
  baseUrlError: Bne,
  currency: Une,
  getSmsCode: Wne,
  smsCodeChangeText: qne,
  captchaTitle: Vne,
  confirm: Gne,
  cancel: Yne,
  save: Kne,
  delete: "删除",
  captchaPlaceholder: Qne,
  mobilePlaceholder: Xne,
  mobileError: Jne,
  codePlaceholder: Zne,
  memberCenter: ere,
  userAgreement: ore,
  and: tre,
  privacyAgreement: nre,
  isAgreeTips: rre,
  nickname: sre,
  nicknamePlaceholder: are,
  headimg: cre,
  headimgPlaceholder: ire,
  getAvatarNickname: lre,
  getAvatarNicknameTips: dre,
  mobile: ure,
  getMobile: pre,
  mobileTips: mre,
  point: fre,
  balance: gre,
  login: hre,
  bind: _re,
  binding: yre,
  bindMobile: $re,
  agreeTips: vre,
  pleaseAgree: bre,
  weixinUserAuth: Tre,
  mobileQuickLogin: Pre,
  register: Sre,
  complete: Ore,
  close: wre,
  diyForm: Cre,
  pay: Mre,
  myBalance: Are,
  myPoint: jre,
  customerService: kre,
  siteClose: Ire,
  noSite: Nre,
  pageNotFound: Dre,
  scenic: Ere,
  seeMore: xre,
  way: Rre,
  hotel: zre,
  rise: Fre,
  cardReserve: Lre,
  card: Hre,
  memberName: Bre,
  memberCode: Ure,
  reserve: Wre,
  reserveSuccess: qre,
  cardLink: Vre,
  myLink: Gre,
  reserveBtn: Yre,
  cardBtn: Kre,
  soldOut: Qre,
  unpaidOrder: Xre,
  waitingOrder: Jre,
  remainOrder: Zre,
  allOrder: ese,
  myOrder: ose,
  orderNo: tse,
  actualPayment: nse,
  orderClose: rse,
  orderDelete: sse,
  orderFinish: ase,
  orderDetail: cse,
  wxPrivacyPopup: ise,
  starLevel: lse,
  star: dse,
  emptyAddress: use,
  addAddress: pse,
  selectAddress: mse,
  coupon: fse,
  "tourism.orderNo": "订单号",
  "tourism.rise": "起",
  "tourism.starLevel": "星级",
  "tourism.star": "星",
  "vipcard.cardReserve": "项目预约",
  "vipcard.card": "办理次卡",
  "vipcard.reserveSuccess": "预约成功",
  "vipcard.reserve": "预约",
  "vipcard.cardLink": "次卡",
  "vipcard.reserveBtn": "去抢购",
  "vipcard.cardBtn": "办理",
  "vipcard.soldOut": "已售",
  "vipcard.orderNo": "订单号",
  "vipcard.myLink": "我的",
  "vipcard.memberCode": "会员码",
  "recharge.orderNo": "订单号",
  "shop.orderNo": "订单号",
  "shop.actualPayment": "实付款",
  "shop.orderClose": "关闭订单",
  "shop.orderFinish": "确认收货",
  "shop.coupon": "优惠劵",
  "o2o.way": "线路",
  "o2o.hotel": "酒店",
  "o2o.scenic": "景点",
  "o2o.reserveBtn": "去抢购",
  "o2o.noHomeAddress": "没有更多内容啦~",
  "o2o.soldOut": "已售",
  "o2o.orderNo": "订单号",
  "o2o.actualPayment": "实付款",
  "o2o.orderDetail": "详情",
  notHave: gse,
  "tourism.scenic": "景点",
  "tourism.way": "线路",
  "tourism.hotel": "酒店",
  "tourism.seeMore": "查看更多",
  "vipcard.seeMore": "查看更多",
  "shop.emptyAddress": "暂无收货地址，请先创建地址",
  "shop.addAddress": "新增收货地址",
  "shop.selectAddress": "选择地址",
  "shop_fenxiao.orderNo": "订单号",
  "shop_giftcard.actualPayment": "实付款",
  "shop_giftcard.orderClose": "关闭订单",
  "shop_giftcard.orderNo": "订单号",
  onceCard: hse,
  cardUnit: _se
}, $se = "Index", vse = {
  index: $se
};
function bse() {
  try {
    const o = globalThis.uni;
    if (o && typeof o.getLocale == "function") {
      const e = o.getLocale();
      if (e)
        return e;
    }
  } catch {
  }
  return "zh-Hans";
}
let Ie = Pne({
  locale: bse(),
  globalInjection: !0,
  //是否全局注入
  silentFallbackWarn: !0,
  silentTranslationWarn: !0,
  messages: {
    "zh-Hans": yse,
    en: vse
  }
});
const It = new Fne(Ie);
function Tse(o) {
  return B.get("wechat/codeurl", o, { showErrorMessage: !1 });
}
function Pse() {
  return B.get("site");
}
function Sse(o) {
  return B.get("init", o);
}
function Ose(o) {
  return B.get("member_mobile_exist", o);
}
function wse(o) {
  return B.get("login/config", o);
}
function Cse() {
  return B.put("auth/logout");
}
function Mse(o) {
  return B.get("wechat/user", o, { showErrorMessage: !1 });
}
function Ase(o) {
  return uni.getStorageSync("pid") && (o.pid = uni.getStorageSync("pid")), B.post("wechat/userlogin", o, { showErrorMessage: !0 });
}
function jse(o) {
  return B.put("wechat/update_openid", o, { showErrorMessage: !1 });
}
function kse(o) {
  return B.put("wechat/update_openid_h5", o, { showErrorMessage: !1 });
}
const Co = Eo("config", {
  state: () => ({
    login: {
      is_username: 0,
      is_mobile: 0,
      is_auth_register: 0,
      is_force_access_user_info: 0,
      is_bind_mobile: 0,
      wechat_error: "",
      agreement_show: 0,
      bg_url: "",
      logo: "",
      desc: ""
    },
    tabbarList: {},
    tabbar: null,
    addon: "",
    themeColor: ""
  }),
  actions: {
    async getLoginConfig() {
      let o = "";
      Le() && (o = Pt().systemInfo.platform == "ios" ? uni.getStorageSync("initUrl") : location.href), await wse({ url: o }).then((e) => {
        this.login.is_username = e.data.is_username, this.login.is_mobile = e.data.is_mobile, this.login.is_auth_register = parseInt(e.data.is_auth_register), this.login.is_force_access_user_info = parseInt(e.data.is_force_access_user_info), this.login.is_bind_mobile = parseInt(e.data.is_bind_mobile), this.login.agreement_show = parseInt(e.data.agreement_show), this.login.bg_url = e.data.bg_url, this.login.logo = e.data.logo, this.login.desc = e.data.desc;
      });
    },
    // 获取主色调
    getThemeColor() {
      let o = uni.getStorageSync("current_theme_color");
      if (!this.themeColor && o && (this.themeColor = JSON.parse(o)), this.themeColor) {
        let e = "";
        for (let t in this.themeColor)
          e += `${t}:${this.themeColor[t]};`;
        return e;
      }
      return "";
    }
  }
});
var Ise = typeof global == "object" && global && global.Object === Object && global;
const bn = Ise;
var Nse = typeof self == "object" && self && self.Object === Object && self, Dse = bn || Nse || Function("return this")();
const re = Dse;
var Ese = re.Symbol;
const ze = Ese;
var Tn = Object.prototype, xse = Tn.hasOwnProperty, Rse = Tn.toString, Qe = ze ? ze.toStringTag : void 0;
function zse(o) {
  var e = xse.call(o, Qe), t = o[Qe];
  try {
    o[Qe] = void 0;
    var n = !0;
  } catch {
  }
  var r = Rse.call(o);
  return n && (e ? o[Qe] = t : delete o[Qe]), r;
}
var Fse = Object.prototype, Lse = Fse.toString;
function Hse(o) {
  return Lse.call(o);
}
var Bse = "[object Null]", Use = "[object Undefined]", Nt = ze ? ze.toStringTag : void 0;
function Be(o) {
  return o == null ? o === void 0 ? Use : Bse : Nt && Nt in Object(o) ? zse(o) : Hse(o);
}
function Ue(o) {
  return o != null && typeof o == "object";
}
var Wse = "[object Symbol]";
function qse(o) {
  return typeof o == "symbol" || Ue(o) && Be(o) == Wse;
}
var Vse = Array.isArray;
const mt = Vse;
var Gse = /\s/;
function Yse(o) {
  for (var e = o.length; e-- && Gse.test(o.charAt(e)); )
    ;
  return e;
}
var Kse = /^\s+/;
function Qse(o) {
  return o && o.slice(0, Yse(o) + 1).replace(Kse, "");
}
function ye(o) {
  var e = typeof o;
  return o != null && (e == "object" || e == "function");
}
var Dt = 0 / 0, Xse = /^[-+]0x[0-9a-f]+$/i, Jse = /^0b[01]+$/i, Zse = /^0o[0-7]+$/i, eae = parseInt;
function oae(o) {
  if (typeof o == "number")
    return o;
  if (qse(o))
    return Dt;
  if (ye(o)) {
    var e = typeof o.valueOf == "function" ? o.valueOf() : o;
    o = ye(e) ? e + "" : e;
  }
  if (typeof o != "string")
    return o === 0 ? o : +o;
  o = Qse(o);
  var t = Jse.test(o);
  return t || Zse.test(o) ? eae(o.slice(2), t ? 2 : 8) : Xse.test(o) ? Dt : +o;
}
var Et = 1 / 0, tae = 17976931348623157e292;
function Bo(o) {
  if (!o)
    return o === 0 ? o : 0;
  if (o = oae(o), o === Et || o === -Et) {
    var e = o < 0 ? -1 : 1;
    return e * tae;
  }
  return o === o ? o : 0;
}
var nae = "[object AsyncFunction]", rae = "[object Function]", sae = "[object GeneratorFunction]", aae = "[object Proxy]";
function Pn(o) {
  if (!ye(o))
    return !1;
  var e = Be(o);
  return e == rae || e == sae || e == nae || e == aae;
}
var cae = re["__core-js_shared__"];
const Uo = cae;
var xt = function() {
  var o = /[^.]+$/.exec(Uo && Uo.keys && Uo.keys.IE_PROTO || "");
  return o ? "Symbol(src)_1." + o : "";
}();
function iae(o) {
  return !!xt && xt in o;
}
var lae = Function.prototype, dae = lae.toString;
function Me(o) {
  if (o != null) {
    try {
      return dae.call(o);
    } catch {
    }
    try {
      return o + "";
    } catch {
    }
  }
  return "";
}
var uae = /[\\^$.*+?()[\]{}|]/g, pae = /^\[object .+?Constructor\]$/, mae = Function.prototype, fae = Object.prototype, gae = mae.toString, hae = fae.hasOwnProperty, _ae = RegExp(
  "^" + gae.call(hae).replace(uae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function yae(o) {
  if (!ye(o) || iae(o))
    return !1;
  var e = Pn(o) ? _ae : pae;
  return e.test(Me(o));
}
function $ae(o, e) {
  return o == null ? void 0 : o[e];
}
function Ae(o, e) {
  var t = $ae(o, e);
  return yae(t) ? t : void 0;
}
var vae = Ae(re, "WeakMap");
const tt = vae;
var Rt = Object.create, bae = function() {
  function o() {
  }
  return function(e) {
    if (!ye(e))
      return {};
    if (Rt)
      return Rt(e);
    o.prototype = e;
    var t = new o();
    return o.prototype = void 0, t;
  };
}();
const Tae = bae;
function Pae(o, e) {
  var t = -1, n = o.length;
  for (e || (e = Array(n)); ++t < n; )
    e[t] = o[t];
  return e;
}
var Sae = function() {
  try {
    var o = Ae(Object, "defineProperty");
    return o({}, "", {}), o;
  } catch {
  }
}();
const zt = Sae;
function Oae(o, e) {
  for (var t = -1, n = o == null ? 0 : o.length; ++t < n && e(o[t], t, o) !== !1; )
    ;
  return o;
}
var wae = 9007199254740991, Cae = /^(?:0|[1-9]\d*)$/;
function Sn(o, e) {
  var t = typeof o;
  return e = e ?? wae, !!e && (t == "number" || t != "symbol" && Cae.test(o)) && o > -1 && o % 1 == 0 && o < e;
}
function On(o, e, t) {
  e == "__proto__" && zt ? zt(o, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : o[e] = t;
}
function ft(o, e) {
  return o === e || o !== o && e !== e;
}
var Mae = Object.prototype, Aae = Mae.hasOwnProperty;
function wn(o, e, t) {
  var n = o[e];
  (!(Aae.call(o, e) && ft(n, t)) || t === void 0 && !(e in o)) && On(o, e, t);
}
function xo(o, e, t, n) {
  var r = !t;
  t || (t = {});
  for (var s = -1, c = e.length; ++s < c; ) {
    var a = e[s], i = n ? n(t[a], o[a], a, t, o) : void 0;
    i === void 0 && (i = o[a]), r ? On(t, a, i) : wn(t, a, i);
  }
  return t;
}
var jae = 9007199254740991;
function Cn(o) {
  return typeof o == "number" && o > -1 && o % 1 == 0 && o <= jae;
}
function gt(o) {
  return o != null && Cn(o.length) && !Pn(o);
}
function kae(o, e, t) {
  if (!ye(t))
    return !1;
  var n = typeof e;
  return (n == "number" ? gt(t) && Sn(e, t.length) : n == "string" && e in t) ? ft(t[e], o) : !1;
}
var Iae = Object.prototype;
function ht(o) {
  var e = o && o.constructor, t = typeof e == "function" && e.prototype || Iae;
  return o === t;
}
function Nae(o, e) {
  for (var t = -1, n = Array(o); ++t < o; )
    n[t] = e(t);
  return n;
}
var Dae = "[object Arguments]";
function Ft(o) {
  return Ue(o) && Be(o) == Dae;
}
var Mn = Object.prototype, Eae = Mn.hasOwnProperty, xae = Mn.propertyIsEnumerable, Rae = Ft(function() {
  return arguments;
}()) ? Ft : function(o) {
  return Ue(o) && Eae.call(o, "callee") && !xae.call(o, "callee");
};
const zae = Rae;
function Fae() {
  return !1;
}
var An = typeof exports == "object" && exports && !exports.nodeType && exports, Lt = An && typeof module == "object" && module && !module.nodeType && module, Lae = Lt && Lt.exports === An, Ht = Lae ? re.Buffer : void 0, Hae = Ht ? Ht.isBuffer : void 0, Bae = Hae || Fae;
const jn = Bae;
var Uae = "[object Arguments]", Wae = "[object Array]", qae = "[object Boolean]", Vae = "[object Date]", Gae = "[object Error]", Yae = "[object Function]", Kae = "[object Map]", Qae = "[object Number]", Xae = "[object Object]", Jae = "[object RegExp]", Zae = "[object Set]", ece = "[object String]", oce = "[object WeakMap]", tce = "[object ArrayBuffer]", nce = "[object DataView]", rce = "[object Float32Array]", sce = "[object Float64Array]", ace = "[object Int8Array]", cce = "[object Int16Array]", ice = "[object Int32Array]", lce = "[object Uint8Array]", dce = "[object Uint8ClampedArray]", uce = "[object Uint16Array]", pce = "[object Uint32Array]", A = {};
A[rce] = A[sce] = A[ace] = A[cce] = A[ice] = A[lce] = A[dce] = A[uce] = A[pce] = !0;
A[Uae] = A[Wae] = A[tce] = A[qae] = A[nce] = A[Vae] = A[Gae] = A[Yae] = A[Kae] = A[Qae] = A[Xae] = A[Jae] = A[Zae] = A[ece] = A[oce] = !1;
function mce(o) {
  return Ue(o) && Cn(o.length) && !!A[Be(o)];
}
function _t(o) {
  return function(e) {
    return o(e);
  };
}
var kn = typeof exports == "object" && exports && !exports.nodeType && exports, oo = kn && typeof module == "object" && module && !module.nodeType && module, fce = oo && oo.exports === kn, Wo = fce && bn.process, gce = function() {
  try {
    var o = oo && oo.require && oo.require("util").types;
    return o || Wo && Wo.binding && Wo.binding("util");
  } catch {
  }
}();
const Fe = gce;
var Bt = Fe && Fe.isTypedArray, hce = Bt ? _t(Bt) : mce;
const _ce = hce;
var yce = Object.prototype, $ce = yce.hasOwnProperty;
function In(o, e) {
  var t = mt(o), n = !t && zae(o), r = !t && !n && jn(o), s = !t && !n && !r && _ce(o), c = t || n || r || s, a = c ? Nae(o.length, String) : [], i = a.length;
  for (var l in o)
    (e || $ce.call(o, l)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    Sn(l, i))) && a.push(l);
  return a;
}
function Nn(o, e) {
  return function(t) {
    return o(e(t));
  };
}
var vce = Nn(Object.keys, Object);
const bce = vce;
var Tce = Object.prototype, Pce = Tce.hasOwnProperty;
function Sce(o) {
  if (!ht(o))
    return bce(o);
  var e = [];
  for (var t in Object(o))
    Pce.call(o, t) && t != "constructor" && e.push(t);
  return e;
}
function yt(o) {
  return gt(o) ? In(o) : Sce(o);
}
function Oce(o) {
  var e = [];
  if (o != null)
    for (var t in Object(o))
      e.push(t);
  return e;
}
var wce = Object.prototype, Cce = wce.hasOwnProperty;
function Mce(o) {
  if (!ye(o))
    return Oce(o);
  var e = ht(o), t = [];
  for (var n in o)
    n == "constructor" && (e || !Cce.call(o, n)) || t.push(n);
  return t;
}
function $t(o) {
  return gt(o) ? In(o, !0) : Mce(o);
}
var Ace = Ae(Object, "create");
const io = Ace;
function jce() {
  this.__data__ = io ? io(null) : {}, this.size = 0;
}
function kce(o) {
  var e = this.has(o) && delete this.__data__[o];
  return this.size -= e ? 1 : 0, e;
}
var Ice = "__lodash_hash_undefined__", Nce = Object.prototype, Dce = Nce.hasOwnProperty;
function Ece(o) {
  var e = this.__data__;
  if (io) {
    var t = e[o];
    return t === Ice ? void 0 : t;
  }
  return Dce.call(e, o) ? e[o] : void 0;
}
var xce = Object.prototype, Rce = xce.hasOwnProperty;
function zce(o) {
  var e = this.__data__;
  return io ? e[o] !== void 0 : Rce.call(e, o);
}
var Fce = "__lodash_hash_undefined__";
function Lce(o, e) {
  var t = this.__data__;
  return this.size += this.has(o) ? 0 : 1, t[o] = io && e === void 0 ? Fce : e, this;
}
function Ce(o) {
  var e = -1, t = o == null ? 0 : o.length;
  for (this.clear(); ++e < t; ) {
    var n = o[e];
    this.set(n[0], n[1]);
  }
}
Ce.prototype.clear = jce;
Ce.prototype.delete = kce;
Ce.prototype.get = Ece;
Ce.prototype.has = zce;
Ce.prototype.set = Lce;
function Hce() {
  this.__data__ = [], this.size = 0;
}
function Ro(o, e) {
  for (var t = o.length; t--; )
    if (ft(o[t][0], e))
      return t;
  return -1;
}
var Bce = Array.prototype, Uce = Bce.splice;
function Wce(o) {
  var e = this.__data__, t = Ro(e, o);
  if (t < 0)
    return !1;
  var n = e.length - 1;
  return t == n ? e.pop() : Uce.call(e, t, 1), --this.size, !0;
}
function qce(o) {
  var e = this.__data__, t = Ro(e, o);
  return t < 0 ? void 0 : e[t][1];
}
function Vce(o) {
  return Ro(this.__data__, o) > -1;
}
function Gce(o, e) {
  var t = this.__data__, n = Ro(t, o);
  return n < 0 ? (++this.size, t.push([o, e])) : t[n][1] = e, this;
}
function ie(o) {
  var e = -1, t = o == null ? 0 : o.length;
  for (this.clear(); ++e < t; ) {
    var n = o[e];
    this.set(n[0], n[1]);
  }
}
ie.prototype.clear = Hce;
ie.prototype.delete = Wce;
ie.prototype.get = qce;
ie.prototype.has = Vce;
ie.prototype.set = Gce;
var Yce = Ae(re, "Map");
const lo = Yce;
function Kce() {
  this.size = 0, this.__data__ = {
    hash: new Ce(),
    map: new (lo || ie)(),
    string: new Ce()
  };
}
function Qce(o) {
  var e = typeof o;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? o !== "__proto__" : o === null;
}
function zo(o, e) {
  var t = o.__data__;
  return Qce(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Xce(o) {
  var e = zo(this, o).delete(o);
  return this.size -= e ? 1 : 0, e;
}
function Jce(o) {
  return zo(this, o).get(o);
}
function Zce(o) {
  return zo(this, o).has(o);
}
function eie(o, e) {
  var t = zo(this, o), n = t.size;
  return t.set(o, e), this.size += t.size == n ? 0 : 1, this;
}
function We(o) {
  var e = -1, t = o == null ? 0 : o.length;
  for (this.clear(); ++e < t; ) {
    var n = o[e];
    this.set(n[0], n[1]);
  }
}
We.prototype.clear = Kce;
We.prototype.delete = Xce;
We.prototype.get = Jce;
We.prototype.has = Zce;
We.prototype.set = eie;
function Dn(o, e) {
  for (var t = -1, n = e.length, r = o.length; ++t < n; )
    o[r + t] = e[t];
  return o;
}
var oie = Nn(Object.getPrototypeOf, Object);
const En = oie;
function tie() {
  this.__data__ = new ie(), this.size = 0;
}
function nie(o) {
  var e = this.__data__, t = e.delete(o);
  return this.size = e.size, t;
}
function rie(o) {
  return this.__data__.get(o);
}
function sie(o) {
  return this.__data__.has(o);
}
var aie = 200;
function cie(o, e) {
  var t = this.__data__;
  if (t instanceof ie) {
    var n = t.__data__;
    if (!lo || n.length < aie - 1)
      return n.push([o, e]), this.size = ++t.size, this;
    t = this.__data__ = new We(n);
  }
  return t.set(o, e), this.size = t.size, this;
}
function qe(o) {
  var e = this.__data__ = new ie(o);
  this.size = e.size;
}
qe.prototype.clear = tie;
qe.prototype.delete = nie;
qe.prototype.get = rie;
qe.prototype.has = sie;
qe.prototype.set = cie;
function iie(o, e) {
  return o && xo(e, yt(e), o);
}
function lie(o, e) {
  return o && xo(e, $t(e), o);
}
var xn = typeof exports == "object" && exports && !exports.nodeType && exports, Ut = xn && typeof module == "object" && module && !module.nodeType && module, die = Ut && Ut.exports === xn, Wt = die ? re.Buffer : void 0, qt = Wt ? Wt.allocUnsafe : void 0;
function uie(o, e) {
  if (e)
    return o.slice();
  var t = o.length, n = qt ? qt(t) : new o.constructor(t);
  return o.copy(n), n;
}
function pie(o, e) {
  for (var t = -1, n = o == null ? 0 : o.length, r = 0, s = []; ++t < n; ) {
    var c = o[t];
    e(c, t, o) && (s[r++] = c);
  }
  return s;
}
function Rn() {
  return [];
}
var mie = Object.prototype, fie = mie.propertyIsEnumerable, Vt = Object.getOwnPropertySymbols, gie = Vt ? function(o) {
  return o == null ? [] : (o = Object(o), pie(Vt(o), function(e) {
    return fie.call(o, e);
  }));
} : Rn;
const vt = gie;
function hie(o, e) {
  return xo(o, vt(o), e);
}
var _ie = Object.getOwnPropertySymbols, yie = _ie ? function(o) {
  for (var e = []; o; )
    Dn(e, vt(o)), o = En(o);
  return e;
} : Rn;
const zn = yie;
function $ie(o, e) {
  return xo(o, zn(o), e);
}
function Fn(o, e, t) {
  var n = e(o);
  return mt(o) ? n : Dn(n, t(o));
}
function vie(o) {
  return Fn(o, yt, vt);
}
function bie(o) {
  return Fn(o, $t, zn);
}
var Tie = Ae(re, "DataView");
const nt = Tie;
var Pie = Ae(re, "Promise");
const rt = Pie;
var Sie = Ae(re, "Set");
const st = Sie;
var Gt = "[object Map]", Oie = "[object Object]", Yt = "[object Promise]", Kt = "[object Set]", Qt = "[object WeakMap]", Xt = "[object DataView]", wie = Me(nt), Cie = Me(lo), Mie = Me(rt), Aie = Me(st), jie = Me(tt), Se = Be;
(nt && Se(new nt(new ArrayBuffer(1))) != Xt || lo && Se(new lo()) != Gt || rt && Se(rt.resolve()) != Yt || st && Se(new st()) != Kt || tt && Se(new tt()) != Qt) && (Se = function(o) {
  var e = Be(o), t = e == Oie ? o.constructor : void 0, n = t ? Me(t) : "";
  if (n)
    switch (n) {
      case wie:
        return Xt;
      case Cie:
        return Gt;
      case Mie:
        return Yt;
      case Aie:
        return Kt;
      case jie:
        return Qt;
    }
  return e;
});
const bt = Se;
var kie = Object.prototype, Iie = kie.hasOwnProperty;
function Nie(o) {
  var e = o.length, t = new o.constructor(e);
  return e && typeof o[0] == "string" && Iie.call(o, "index") && (t.index = o.index, t.input = o.input), t;
}
var Die = re.Uint8Array;
const Jt = Die;
function Tt(o) {
  var e = new o.constructor(o.byteLength);
  return new Jt(e).set(new Jt(o)), e;
}
function Eie(o, e) {
  var t = e ? Tt(o.buffer) : o.buffer;
  return new o.constructor(t, o.byteOffset, o.byteLength);
}
var xie = /\w*$/;
function Rie(o) {
  var e = new o.constructor(o.source, xie.exec(o));
  return e.lastIndex = o.lastIndex, e;
}
var Zt = ze ? ze.prototype : void 0, en = Zt ? Zt.valueOf : void 0;
function zie(o) {
  return en ? Object(en.call(o)) : {};
}
function Fie(o, e) {
  var t = e ? Tt(o.buffer) : o.buffer;
  return new o.constructor(t, o.byteOffset, o.length);
}
var Lie = "[object Boolean]", Hie = "[object Date]", Bie = "[object Map]", Uie = "[object Number]", Wie = "[object RegExp]", qie = "[object Set]", Vie = "[object String]", Gie = "[object Symbol]", Yie = "[object ArrayBuffer]", Kie = "[object DataView]", Qie = "[object Float32Array]", Xie = "[object Float64Array]", Jie = "[object Int8Array]", Zie = "[object Int16Array]", ele = "[object Int32Array]", ole = "[object Uint8Array]", tle = "[object Uint8ClampedArray]", nle = "[object Uint16Array]", rle = "[object Uint32Array]";
function sle(o, e, t) {
  var n = o.constructor;
  switch (e) {
    case Yie:
      return Tt(o);
    case Lie:
    case Hie:
      return new n(+o);
    case Kie:
      return Eie(o, t);
    case Qie:
    case Xie:
    case Jie:
    case Zie:
    case ele:
    case ole:
    case tle:
    case nle:
    case rle:
      return Fie(o, t);
    case Bie:
      return new n();
    case Uie:
    case Vie:
      return new n(o);
    case Wie:
      return Rie(o);
    case qie:
      return new n();
    case Gie:
      return zie(o);
  }
}
function ale(o) {
  return typeof o.constructor == "function" && !ht(o) ? Tae(En(o)) : {};
}
var cle = "[object Map]";
function ile(o) {
  return Ue(o) && bt(o) == cle;
}
var on = Fe && Fe.isMap, lle = on ? _t(on) : ile;
const dle = lle;
var ule = "[object Set]";
function ple(o) {
  return Ue(o) && bt(o) == ule;
}
var tn = Fe && Fe.isSet, mle = tn ? _t(tn) : ple;
const fle = mle;
var gle = 1, hle = 2, _le = 4, Ln = "[object Arguments]", yle = "[object Array]", $le = "[object Boolean]", vle = "[object Date]", ble = "[object Error]", Hn = "[object Function]", Tle = "[object GeneratorFunction]", Ple = "[object Map]", Sle = "[object Number]", Bn = "[object Object]", Ole = "[object RegExp]", wle = "[object Set]", Cle = "[object String]", Mle = "[object Symbol]", Ale = "[object WeakMap]", jle = "[object ArrayBuffer]", kle = "[object DataView]", Ile = "[object Float32Array]", Nle = "[object Float64Array]", Dle = "[object Int8Array]", Ele = "[object Int16Array]", xle = "[object Int32Array]", Rle = "[object Uint8Array]", zle = "[object Uint8ClampedArray]", Fle = "[object Uint16Array]", Lle = "[object Uint32Array]", M = {};
M[Ln] = M[yle] = M[jle] = M[kle] = M[$le] = M[vle] = M[Ile] = M[Nle] = M[Dle] = M[Ele] = M[xle] = M[Ple] = M[Sle] = M[Bn] = M[Ole] = M[wle] = M[Cle] = M[Mle] = M[Rle] = M[zle] = M[Fle] = M[Lle] = !0;
M[ble] = M[Hn] = M[Ale] = !1;
function bo(o, e, t, n, r, s) {
  var c, a = e & gle, i = e & hle, l = e & _le;
  if (t && (c = r ? t(o, n, r, s) : t(o)), c !== void 0)
    return c;
  if (!ye(o))
    return o;
  var u = mt(o);
  if (u) {
    if (c = Nie(o), !a)
      return Pae(o, c);
  } else {
    var d = bt(o), f = d == Hn || d == Tle;
    if (jn(o))
      return uie(o, a);
    if (d == Bn || d == Ln || f && !r) {
      if (c = i || f ? {} : ale(o), !a)
        return i ? $ie(o, lie(c, o)) : hie(o, iie(c, o));
    } else {
      if (!M[d])
        return r ? o : {};
      c = sle(o, d, a);
    }
  }
  s || (s = new qe());
  var h = s.get(o);
  if (h)
    return h;
  s.set(o, c), fle(o) ? o.forEach(function($) {
    c.add(bo($, e, t, $, o, s));
  }) : dle(o) && o.forEach(function($, b) {
    c.set(b, bo($, e, t, b, o, s));
  });
  var m = l ? i ? bie : vie : i ? $t : yt, g = u ? void 0 : m(o);
  return Oae(g || o, function($, b) {
    g && (b = $, $ = o[b]), wn(c, b, bo($, e, t, b, o, s));
  }), c;
}
var Hle = 1, Ble = 4;
function Ule(o) {
  return bo(o, Hle | Ble);
}
var Wle = Math.ceil, qle = Math.max;
function Vle(o, e, t, n) {
  for (var r = -1, s = qle(Wle((e - o) / (t || 1)), 0), c = Array(s); s--; )
    c[n ? s : ++r] = o, o += t;
  return c;
}
function Gle(o) {
  return function(e, t, n) {
    return n && typeof n != "number" && kae(e, t, n) && (t = n = void 0), e = Bo(e), t === void 0 ? (t = e, e = 0) : t = Bo(t), n = n === void 0 ? e < t ? 1 : -1 : Bo(n), Vle(e, t, n, o);
  };
}
var Yle = Gle();
const Kle = Yle, Qle = Eo("system", {
  state: () => ({
    site: null,
    siteApps: [],
    siteAddons: [],
    currRoute: "",
    mapConfig: {
      map_type: "tencent",
      key: "",
      // 腾讯地图key
      tianditu_map_web_key: "",
      // 天地图key
      is_open: 1,
      valid_time: 0
    },
    initStatus: "wait",
    menuButtonInfo: {
      height: 0,
      top: 0,
      right: 0,
      width: 0
    },
    shareCallback: null,
    defaultPositionAddress: "定位中",
    diyAddressInfo: null,
    currTabbar: {
      path: "",
      query: {}
    },
    systemInfo: null,
    topTabbarInfo: {
      height: 0,
      fullHeight: ""
    },
    appConfig: {
      wechat_app_id: "",
      weapp_original: ""
    },
    shareOptions: {
      wechatOptions: {},
      weappOptions: {}
    },
    versionInfo: null,
    updateVersionPopup: !1,
    copyright: null
  }),
  actions: {
    // 获取初始化数据信息
    getInitFn(o) {
      let e = "";
      Le() && (e = this.systemInfo.platform == "ios" ? uni.getStorageSync("initUrl") : location.href), Sse({
        url: e,
        openid: uni.getStorageSync("openid")
      }).then((t) => {
        if (t.data) {
          let n = t.data;
          const r = Co();
          r.tabbarList = n.tabbar_list, this.mapConfig.is_open = n.map_config.is_open, this.mapConfig.valid_time = n.map_config.valid_time, this.mapConfig.map_type = n.map_config.map_type, this.mapConfig.key = n.map_config.key, this.mapConfig.tianditu_map_web_key = n.map_config.tianditu_map_web_key, uni.setStorageSync("mapConfig", this.mapConfig), uni.setStorageSync("theme_color_list", n.theme_list), this.site = n.site_info, this.siteApps = n.site_info.app, this.siteAddons = n.site_info.site_addons.map((c) => c.key), this.copyright = n.copyright;
          const s = ge();
          s.levelList = n.member_level, r.login.is_username = n.login_config.is_username, r.login.is_mobile = n.login_config.is_mobile, r.login.is_auth_register = parseInt(n.login_config.is_auth_register), r.login.is_force_access_user_info = parseInt(n.login_config.is_force_access_user_info), r.login.is_bind_mobile = parseInt(n.login_config.is_bind_mobile), r.login.agreement_show = parseInt(n.login_config.agreement_show), r.login.wechat_error = n.login_config.wechat_error, r.login.bg_url = n.login_config.bg_url, r.login.logo = n.login_config.logo, r.login.desc = n.login_config.desc, uni.setStorageSync("login_config", r.login), uni.setStorageSync("member_exist", n.member_exist), n.app_config && (this.appConfig = n.app_config), this.initStatus = "finish", uni.getStorageSync("isBindMobile") && uni.removeStorageSync("isBindMobile"), o && o();
        }
      }), this.getMenuButtonInfoFn();
    },
    // 获取版本数据信息
    getVersionInfoFn(o = null) {
    },
    // 如果已有手机号，就不弹出绑定手机号弹框
    getMemberMobileExistFn() {
      Ose({
        openid: uni.getStorageSync("openid")
      }).then((o) => {
        uni.setStorageSync("member_mobile_exist", o.data.member_mobile_exist);
      });
    },
    getMenuButtonInfoFn() {
    },
    async getSiteInfoFn() {
      await Pse().then((o) => {
        this.site = o.data, this.siteApps = o.data.app, this.siteAddons = o.data.site_addons.map((e) => e.key);
      }).catch((o) => {
      });
    },
    // 当前选择的收货地址信息[经纬度，当前定位地址，定位过期时间]
    setAddressInfo(o = {}) {
      let e = Ule(o);
      const t = new Date();
      t.setSeconds(60 * this.mapConfig.valid_time), e.valid_time = t.getTime() / 1e3, this.diyAddressInfo ? this.diyAddressInfo = Object.assign(this.diyAddressInfo, e) : this.diyAddressInfo = e, Object.keys(o).length ? uni.setStorageSync("location_address", e) : uni.removeStorageSync("location_address");
    },
    setTopTabbar(o = {}) {
      this.topTabbarInfo = Object.assign({}, this.topTabbarInfo, o), this.topTabbarInfo.height = this.topTabbarInfo.height || 0, this.topTabbarInfo.fullHeight = this.topTabbarInfo.height ? this.topTabbarInfo.height + "px" : 0;
    },
    showUpdateVersion() {
      this.updateVersionPopup = !0;
    }
  }
}), Pt = Qle, qo = (o) => {
  let e = Rne();
  const n = `${It.getFileKey(e).fileKey}.${o}`;
  return Ie.global.t(o) != o ? Ie.global.t(o) : (Ie.global.t(n) != n || e.startsWith("/addon/") && It.loadLocaleMessages(e.replace(/^\//, ""), uni.getLocale()), Ie.global.t(n));
};
var Vo = Object.prototype.hasOwnProperty, Ne = Array.isArray, ee = function() {
  for (var o = [], e = 0; e < 256; ++e)
    o.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return o;
}(), Xle = function(e) {
  for (; e.length > 1; ) {
    var t = e.pop(), n = t.obj[t.prop];
    if (Ne(n)) {
      for (var r = [], s = 0; s < n.length; ++s)
        typeof n[s] < "u" && r.push(n[s]);
      t.obj[t.prop] = r;
    }
  }
}, Un = function(e, t) {
  for (var n = t && t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, r = 0; r < e.length; ++r)
    typeof e[r] < "u" && (n[r] = e[r]);
  return n;
}, Jle = function o(e, t, n) {
  if (!t)
    return e;
  if (typeof t != "object") {
    if (Ne(e))
      e.push(t);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !Vo.call(Object.prototype, t)) && (e[t] = !0);
    else
      return [e, t];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(t);
  var r = e;
  return Ne(e) && !Ne(t) && (r = Un(e, n)), Ne(e) && Ne(t) ? (t.forEach(function(s, c) {
    if (Vo.call(e, c)) {
      var a = e[c];
      a && typeof a == "object" && s && typeof s == "object" ? e[c] = o(a, s, n) : e.push(s);
    } else
      e[c] = s;
  }), e) : Object.keys(t).reduce(function(s, c) {
    var a = t[c];
    return Vo.call(s, c) ? s[c] = o(s[c], a, n) : s[c] = a, s;
  }, r);
}, Zle = function(e, t) {
  return Object.keys(t).reduce(function(n, r) {
    return n[r] = t[r], n;
  }, e);
}, ede = function(o, e, t) {
  var n = o.replace(/\+/g, " ");
  if (t === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, ode = function(e, t, n) {
  if (e.length === 0)
    return e;
  var r = typeof e == "string" ? e : String(e);
  if (n === "iso-8859-1")
    return escape(r).replace(/%u[0-9a-f]{4}/gi, function(i) {
      return "%26%23" + parseInt(i.slice(2), 16) + "%3B";
    });
  for (var s = "", c = 0; c < r.length; ++c) {
    var a = r.charCodeAt(c);
    if (a === 45 || a === 46 || a === 95 || a === 126 || a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122) {
      s += r.charAt(c);
      continue;
    }
    if (a < 128) {
      s = s + ee[a];
      continue;
    }
    if (a < 2048) {
      s = s + (ee[192 | a >> 6] + ee[128 | a & 63]);
      continue;
    }
    if (a < 55296 || a >= 57344) {
      s = s + (ee[224 | a >> 12] + ee[128 | a >> 6 & 63] + ee[128 | a & 63]);
      continue;
    }
    c += 1, a = 65536 + ((a & 1023) << 10 | r.charCodeAt(c) & 1023), s += ee[240 | a >> 18] + ee[128 | a >> 12 & 63] + ee[128 | a >> 6 & 63] + ee[128 | a & 63];
  }
  return s;
}, tde = function(e) {
  for (var t = [{ obj: { o: e }, prop: "o" }], n = [], r = 0; r < t.length; ++r)
    for (var s = t[r], c = s.obj[s.prop], a = Object.keys(c), i = 0; i < a.length; ++i) {
      var l = a[i], u = c[l];
      typeof u == "object" && u !== null && n.indexOf(u) === -1 && (t.push({ obj: c, prop: l }), n.push(u));
    }
  return Xle(t), e;
}, nde = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, rde = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, sde = function(e, t) {
  return [].concat(e, t);
}, Wn = {
  arrayToObject: Un,
  assign: Zle,
  combine: sde,
  compact: tde,
  decode: ede,
  encode: ode,
  isBuffer: rde,
  isRegExp: nde,
  merge: Jle
}, ade = String.prototype.replace, cde = /%20/g, qn = {
  default: "RFC3986",
  formatters: {
    RFC1738: function(o) {
      return ade.call(o, cde, "+");
    },
    RFC3986: function(o) {
      return o;
    }
  },
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Vn = Wn, to = qn, ide = Object.prototype.hasOwnProperty, nn = {
  brackets: function(e) {
    return e + "[]";
  },
  comma: "comma",
  indices: function(e, t) {
    return e + "[" + t + "]";
  },
  repeat: function(e) {
    return e;
  }
}, xe = Array.isArray, lde = Array.prototype.push, at = function(o, e) {
  lde.apply(o, xe(e) ? e : [e]);
}, dde = Date.prototype.toISOString, H = {
  addQueryPrefix: !1,
  allowDots: !1,
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encoder: Vn.encode,
  encodeValuesOnly: !1,
  formatter: to.formatters[to.default],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return dde.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, ude = function o(e, t, n, r, s, c, a, i, l, u, d, f, h) {
  var m = e;
  if (typeof a == "function" ? m = a(t, m) : m instanceof Date ? m = u(m) : n === "comma" && xe(m) && (m = m.join(",")), m === null) {
    if (r)
      return c && !f ? c(t, H.encoder, h) : t;
    m = "";
  }
  if (typeof m == "string" || typeof m == "number" || typeof m == "boolean" || Vn.isBuffer(m)) {
    if (c) {
      var g = f ? t : c(t, H.encoder, h);
      return [d(g) + "=" + d(c(m, H.encoder, h))];
    }
    return [d(t) + "=" + d(String(m))];
  }
  var $ = [];
  if (typeof m > "u")
    return $;
  var b;
  if (xe(a))
    b = a;
  else {
    var w = Object.keys(m);
    b = i ? w.sort(i) : w;
  }
  for (var I = 0; I < b.length; ++I) {
    var D = b[I];
    s && m[D] === null || (xe(m) ? at($, o(
      m[D],
      typeof n == "function" ? n(t, D) : t,
      n,
      r,
      s,
      c,
      a,
      i,
      l,
      u,
      d,
      f,
      h
    )) : at($, o(
      m[D],
      t + (l ? "." + D : "[" + D + "]"),
      n,
      r,
      s,
      c,
      a,
      i,
      l,
      u,
      d,
      f,
      h
    )));
  }
  return $;
}, pde = function(e) {
  if (!e)
    return H;
  if (e.encoder !== null && e.encoder !== void 0 && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var t = e.charset || H.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = to.default;
  if (typeof e.format < "u") {
    if (!ide.call(to.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var r = to.formatters[n], s = H.filter;
  return (typeof e.filter == "function" || xe(e.filter)) && (s = e.filter), {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : H.addQueryPrefix,
    allowDots: typeof e.allowDots > "u" ? H.allowDots : !!e.allowDots,
    charset: t,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : H.charsetSentinel,
    delimiter: typeof e.delimiter > "u" ? H.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : H.encode,
    encoder: typeof e.encoder == "function" ? e.encoder : H.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : H.encodeValuesOnly,
    filter: s,
    formatter: r,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : H.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : H.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : H.strictNullHandling
  };
}, mde = function(o, e) {
  var t = o, n = pde(e), r, s;
  typeof n.filter == "function" ? (s = n.filter, t = s("", t)) : xe(n.filter) && (s = n.filter, r = s);
  var c = [];
  if (typeof t != "object" || t === null)
    return "";
  var a;
  e && e.arrayFormat in nn ? a = e.arrayFormat : e && "indices" in e ? a = e.indices ? "indices" : "repeat" : a = "indices";
  var i = nn[a];
  r || (r = Object.keys(t)), n.sort && r.sort(n.sort);
  for (var l = 0; l < r.length; ++l) {
    var u = r[l];
    n.skipNulls && t[u] === null || at(c, ude(
      t[u],
      u,
      i,
      n.strictNullHandling,
      n.skipNulls,
      n.encode ? n.encoder : null,
      n.filter,
      n.sort,
      n.allowDots,
      n.serializeDate,
      n.formatter,
      n.encodeValuesOnly,
      n.charset
    ));
  }
  var d = c.join(n.delimiter), f = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? f += "utf8=%26%2310003%3B&" : f += "utf8=%E2%9C%93&"), d.length > 0 ? f + d : "";
}, uo = Wn, ct = Object.prototype.hasOwnProperty, F = {
  allowDots: !1,
  allowPrototypes: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decoder: uo.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, fde = function(o) {
  return o.replace(/&#(\d+);/g, function(e, t) {
    return String.fromCharCode(parseInt(t, 10));
  });
}, gde = "utf8=%26%2310003%3B", hde = "utf8=%E2%9C%93", _de = function(e, t) {
  var n = {}, r = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, s = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, c = r.split(t.delimiter, s), a = -1, i, l = t.charset;
  if (t.charsetSentinel)
    for (i = 0; i < c.length; ++i)
      c[i].indexOf("utf8=") === 0 && (c[i] === hde ? l = "utf-8" : c[i] === gde && (l = "iso-8859-1"), a = i, i = c.length);
  for (i = 0; i < c.length; ++i)
    if (i !== a) {
      var u = c[i], d = u.indexOf("]="), f = d === -1 ? u.indexOf("=") : d + 1, h, m;
      f === -1 ? (h = t.decoder(u, F.decoder, l), m = t.strictNullHandling ? null : "") : (h = t.decoder(u.slice(0, f), F.decoder, l), m = t.decoder(u.slice(f + 1), F.decoder, l)), m && t.interpretNumericEntities && l === "iso-8859-1" && (m = fde(m)), m && t.comma && m.indexOf(",") > -1 && (m = m.split(",")), ct.call(n, h) ? n[h] = uo.combine(n[h], m) : n[h] = m;
    }
  return n;
}, yde = function(o, e, t) {
  for (var n = e, r = o.length - 1; r >= 0; --r) {
    var s, c = o[r];
    if (c === "[]" && t.parseArrays)
      s = [].concat(n);
    else {
      s = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var a = c.charAt(0) === "[" && c.charAt(c.length - 1) === "]" ? c.slice(1, -1) : c, i = parseInt(a, 10);
      !t.parseArrays && a === "" ? s = { 0: n } : !isNaN(i) && c !== a && String(i) === a && i >= 0 && t.parseArrays && i <= t.arrayLimit ? (s = [], s[i] = n) : s[a] = n;
    }
    n = s;
  }
  return n;
}, $de = function(e, t, n) {
  if (e) {
    var r = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, s = /(\[[^[\]]*])/, c = /(\[[^[\]]*])/g, a = s.exec(r), i = a ? r.slice(0, a.index) : r, l = [];
    if (i) {
      if (!n.plainObjects && ct.call(Object.prototype, i) && !n.allowPrototypes)
        return;
      l.push(i);
    }
    for (var u = 0; (a = c.exec(r)) !== null && u < n.depth; ) {
      if (u += 1, !n.plainObjects && ct.call(Object.prototype, a[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      l.push(a[1]);
    }
    return a && l.push("[" + r.slice(a.index) + "]"), yde(l, t, n);
  }
}, vde = function(e) {
  if (!e)
    return F;
  if (e.decoder !== null && e.decoder !== void 0 && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");
  var t = typeof e.charset > "u" ? F.charset : e.charset;
  return {
    allowDots: typeof e.allowDots > "u" ? F.allowDots : !!e.allowDots,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : F.allowPrototypes,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : F.arrayLimit,
    charset: t,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : F.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : F.comma,
    decoder: typeof e.decoder == "function" ? e.decoder : F.decoder,
    delimiter: typeof e.delimiter == "string" || uo.isRegExp(e.delimiter) ? e.delimiter : F.delimiter,
    depth: typeof e.depth == "number" ? e.depth : F.depth,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : F.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : F.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : F.plainObjects,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : F.strictNullHandling
  };
}, bde = function(o, e) {
  var t = vde(e);
  if (o === "" || o === null || typeof o > "u")
    return t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof o == "string" ? _de(o, t) : o, r = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, s = Object.keys(n), c = 0; c < s.length; ++c) {
    var a = s[c], i = $de(a, n[a], t);
    r = uo.merge(r, i, t);
  }
  return uo.compact(r);
}, Tde = mde, Pde = bde, Sde = qn, Ode = {
  formats: Sde,
  parse: Pde,
  stringify: Tde
};
const wde = typeof window < "u", me = wde ? window.__ENV__ || {} : {}, X = {
  VITE_APP_BASE_URL: me.VITE_APP_BASE_URL || "" || "",
  VITE_IMG_DOMAIN: me.VITE_IMG_DOMAIN || "" || "",
  VITE_SITE_ID: me.VITE_SITE_ID || "" || "",
  VITE_REQUEST_STORAGE_TOKEN_KEY: me.VITE_REQUEST_STORAGE_TOKEN_KEY || "wapToken",
  VITE_REQUEST_HEADER_TOKEN_KEY: me.VITE_REQUEST_HEADER_TOKEN_KEY || "token",
  VITE_REQUEST_HEADER_SITEID_KEY: me.VITE_REQUEST_HEADER_SITEID_KEY || "site-id",
  VITE_REQUEST_HEADER_CHANNEL_KEY: me.VITE_REQUEST_HEADER_CHANNEL_KEY || "channel",
  VITE_APP_VERSION: me.VITE_APP_VERSION || "1.0.1"
};
class Cde {
  constructor() {
    be(this, "baseUrl");
    be(this, "config", {
      url: "",
      header: {}
    });
    this.baseUrl = X.VITE_APP_BASE_URL || `${location.origin}/api/`, this.baseUrl.substr(-1) != "/" && (this.baseUrl += "/");
    try {
      this.config.header[X.VITE_REQUEST_HEADER_SITEID_KEY] = sn(X.VITE_SITE_ID), this.config.header[X.VITE_REQUEST_HEADER_CHANNEL_KEY] = rn();
    } catch {
    }
  }
  /**
   * 请求拦截器
   */
  requestInterceptors() {
    try {
      Ao() && (this.config.header[X.VITE_REQUEST_HEADER_TOKEN_KEY] = Ao()), this.config.header[X.VITE_REQUEST_HEADER_CHANNEL_KEY] = rn(), this.config.header[X.VITE_REQUEST_HEADER_SITEID_KEY] = sn(X.VITE_SITE_ID);
    } catch {
    }
  }
  get(e, t = {}, n = {}) {
    return this.request("GET", e, t, n);
  }
  post(e, t = {}, n = {}) {
    return this.request("POST", e, t, n);
  }
  put(e, t = {}, n = {}) {
    return this.request("PUT", e, t, n);
  }
  delete(e, t = {}, n = {}) {
    return this.request("DELETE", e, t, n);
  }
  /**
   * 发送上传请求
   */
  upload(e, t = {}, n = {}) {
    this.requestInterceptors();
    const r = Object.assign(uni.$u.deepClone(this.config), n, {
      url: this.baseUrl + e,
      ...t
    });
    return new Promise((s, c) => {
      uni.uploadFile({
        ...r,
        success: (a) => {
          const i = JSON.parse(a.data);
          i.code == 1 ? (this.config.showSuccessMessage && uni.showToast({ title: i.msg, icon: "none" }), s(i)) : (i.code == 0 || i.code == 400 ? this.config.showErrorMessage !== !1 && uni.showToast({ title: i.msg, icon: "none" }) : this.handleAuthError(i.code), c(i));
        },
        fail: (a) => {
          c(a);
        }
      });
    });
  }
  /**
   * 发送请求
   */
  request(e, t, n, r = {}) {
    this.requestInterceptors();
    const s = Object.assign(uni.$u.deepClone(this.config), r, {
      url: this.baseUrl + t,
      method: e
    });
    return s.method.toUpperCase() == "GET" || s.method.toUpperCase() == "DELETE" ? s.url += "?" + Ode.stringify(n) : s.data = n, new Promise((c, a) => {
      uni.request({
        ...s,
        success: (i) => {
          const l = i.data;
          l.code == 1 ? (r.showSuccessMessage && uni.showToast({ title: l.msg, icon: "none" }), c(l)) : (l.code == 0 || l.code == 400 ? r.showErrorMessage !== !1 && uni.showToast({ title: l.msg, icon: "none" }) : this.handleAuthError(l.code), a(l));
        },
        fail: (i) => {
          a(i);
        },
        complete: (i) => {
          this.handleRequestFail(i);
        }
      });
    });
  }
  handleAuthError(e) {
    switch (e) {
      case 401:
        ge().logout();
        break;
      case 402:
        if (Mo().indexOf("app/pages/index/close") != -1)
          return;
        W({ url: "/app/pages/index/close", mode: "reLaunch" });
        break;
      case 403:
        if (Mo().indexOf("app/pages/index/nosite") != -1)
          return;
        W({ url: "/app/pages/index/nosite", mode: "switchTab" });
        break;
    }
  }
  handleRequestFail(e) {
    if (e.errMsg && e.errMsg == "request:ok" && typeof e.data == "string") {
      const t = (Yn(this.baseUrl) ? this.baseUrl : location.origin + this.baseUrl) + qo("baseUrlError");
      uni.showToast({ icon: "none", title: t });
      return;
    }
    if (e.errMsg == "request:fail") {
      uni.showToast({ icon: "none", title: this.baseUrl + qo("requestFail") });
      return;
    }
    if (e.errMsg && e.errMsg == "request:fail url not in domain list") {
      uni.showToast({ icon: "none", title: this.baseUrl + qo("notInDomainList") });
      return;
    }
  }
}
const B = new Cde();
function Mde() {
  return B.get("member/member");
}
function Ade(o) {
  return uni.getStorageSync("pid") && (o.pid = uni.getStorageSync("pid")), B.put("member/mobile", o, { showErrorMessage: !0 });
}
function Gn() {
  const o = (a) => {
    uni.setStorage({ key: "loginBack", data: a }), setTimeout(() => {
      const i = Co(), l = Pt();
      !uni.getStorageSync("autoLoginLock") && Le() && i.login.is_bind_mobile && uni.setStorageSync("isBindMobile", !0), Le() ? i.login.is_username && !i.login.is_mobile && !i.login.is_auth_register ? W({ url: "/app/pages/auth/login", param: { type: "username" } }) : l.initStatus == "finish" && !i.login.is_username && !i.login.is_mobile && !i.login.is_auth_register ? uni.showToast({ title: "商家未开启登录注册", icon: "none" }) : W({ url: "/app/pages/auth/index" }) : i.login.is_username && !i.login.is_mobile ? W({ url: "/app/pages/auth/login", param: { type: "username" } }) : l.initStatus == "finish" && !i.login.is_username && !i.login.is_mobile ? uni.showToast({ title: "商家未开启登录注册", icon: "none" }) : W({ url: "/app/pages/auth/index" });
    });
  }, e = K(0), t = (a) => {
    e.value = a, uni.removeStorageSync("autoLoginLock"), uni.getStorage({
      key: "loginBack",
      success: (i) => {
        e.value == 1 ? W({
          url: "/addon/home_service/technician/pages/member/index",
          mode: "redirectTo"
        }) : e.value == 2 ? W({
          url: "/addon/home_service/store/pages/member/index",
          mode: "redirectTo"
        }) : W(
          i ? {
            ...i.data,
            mode: "redirectTo"
          } : { url: "/app/pages/index/index", mode: "switchTab" }
        );
      },
      fail: (i) => {
        console.log(e.value), e.value == 1 ? W({ url: "/addon/home_service/technician/pages/member/index", mode: "switchTab" }) : e.value == 2 ? W({ url: "/addon/home_service/store/pages/member/index", mode: "switchTab" }) : W({ url: "/app/pages/index/index", mode: "switchTab" });
      }
    });
  }, n = (a) => {
    let i = {
      code: a.code,
      nickname: a.nickname,
      headimg: a.headimg,
      mobile: a.mobile,
      mobile_code: a.mobile_code
    };
    uni.getStorageSync("pid") && Object.assign(i, { pid: uni.getStorageSync("pid") }), Mse(i).then((l) => {
      l.data && Ase(l.data).then((u) => {
        const d = Co();
        u.data.token ? (uni.removeStorageSync("member_lock"), ge().setToken(u.data.token, () => {
          const f = ge().info;
          f && f.wx_openid && uni.setStorageSync("openid", f.wx_openid), uni.getStorageSync("isBindMobile") && uni.removeStorageSync("isBindMobile"), uni.getStorageSync("wap_member_not_control_mobile") && uni.removeStorageSync("wap_member_not_control_mobile"), f && (f.mobile ? uni.setStorageSync("wap_member_mobile", f.mobile) : uni.setStorageSync("wap_member_not_control_mobile", !0));
          let h = uni.getStorageSync("loginBack");
          h && h.url && Mo() == "app/pages/auth/index" && t();
        })) : (uni.setStorageSync("openid", u.data.openid), uni.setStorageSync("unionid", u.data.unionid), u.data.nickname && uni.setStorageSync("nickname", u.data.nickname), u.data.avatar && uni.setStorageSync("avatar", u.data.avatar), uni.getStorageSync("isBindMobile") && uni.removeStorageSync("isBindMobile"), d.login.is_bind_mobile && uni.setStorageSync("isBindMobile", !0));
      }).catch((u) => {
        uni.setStorageSync("member_lock", !0);
      });
    }).catch((l) => {
      l.code == -1 ? s({ scopes: "snsapi_userinfo" }) : uni.showToast({ title: l.msg, icon: "none" });
    });
  }, r = (a, i = null) => {
    jse({
      code: a
    }).then((u) => {
      ge().getMemberInfo(() => {
        const d = ge().info;
        d && d.wx_openid && uni.setStorageSync("openid", d.wx_openid), i && i();
      });
    });
  }, s = (a = {}) => {
    a.scopes = a.scopes || "snsapi_base", a.updateFlag = a.updateFlag || !1, a.backFlag = a.backFlag || !1, a.successCallback = a.successCallback || null, a.nickname = a.nickname || "", a.headimg = a.headimg || "", a.mobile = a.mobile || "", a.mobile_code = a.mobile_code || "";
    let i = `${location.origin}${location.pathname}`;
    if (i.indexOf("app/pages/auth/index") != -1) {
      let l = uni.getStorageSync("loginBack");
      if (l) {
        if (i = i.replace("app/pages/auth/index", l.url.substr(1)), l.param)
          if (i.indexOf("?") != -1)
            for (let u in l.param)
              i += `&${u}=${l.param[u]}`;
          else {
            let u = 0;
            for (let d in l.param)
              u == 0 ? i += `?${d}=${l.param[d]}` : i += `&${d}=${l.param[d]}`, u++;
          }
      } else
        i = i.replace("app/pages/auth/index", "app/pages/index/index");
    } else {
      let l = Dde(location.href).query;
      l.code && delete l.code, Object.keys(l).length && (i += uni.$u.queryParams(l));
    }
    Tse({
      url: i,
      scopes: a.scopes
    }).then((l) => {
      uni.setStorageSync("wechat_login_back", !0), location.href = l.data.url;
    });
  };
  return {
    setLoginBack: o,
    handleLoginBack: t,
    authLogin: n,
    updateOpenid: r,
    getAuthCode: s,
    updateWechatOpenidForH5: (a) => {
      a && kse({ wx_openid: a }).then((i) => {
        const l = ge().info;
        l && l.wx_openid && uni.setStorageSync("openid", l.wx_openid);
      });
    }
  };
}
const jde = Eo("member", {
  state: () => ({
    token: uni.getStorageSync(X.VITE_REQUEST_STORAGE_TOKEN_KEY),
    info: null,
    levelList: null
  }),
  actions: {
    setToken(o, e = null) {
      this.token = o, Ide(o), this.getMemberInfo(e);
    },
    getMemberInfo(o = null) {
      this.token && Mde().then((e) => {
        this.info = e.data, uni.setStorageSync("wap_member_info", this.info), uni.setStorageSync("wap_member_id", e.data.member_id), this.info.mobile && (uni.removeStorageSync("isBindMobile"), uni.setStorageSync("wap_member_mobile", this.info.mobile)), this.info && this.info.wx_openid ? uni.setStorageSync("member_exist", 1) : Gn().updateWechatOpenidForH5(uni.getStorageSync("openid")), o && o();
      }).catch(() => {
        this.logout(), uni.removeStorageSync("wap_member_mobile"), uni.removeStorageSync("wap_member_id"), uni.removeStorageSync("wap_member_not_control_mobile");
      });
    },
    logout(o = !1) {
      if (!this.token)
        return;
      this.token = "", this.info = null, uni.setStorageSync("autoLoginLock", !0);
      let e = () => {
        Nde(), uni.removeStorageSync("wap_member_info"), uni.removeStorageSync("unionid"), uni.removeStorageSync("isBindMobile"), uni.removeStorageSync("nickname"), uni.removeStorageSync("avatar"), uni.removeStorageSync("wap_member_mobile"), uni.removeStorageSync("wap_member_id"), uni.removeStorageSync("wap_member_not_control_mobile"), o && W({ url: "/app/pages/index/index", mode: "switchTab" });
      };
      Cse().then(() => {
        e();
      }).catch(() => {
        e();
      });
    },
    // 一键绑定手机号
    bindMobile(o) {
      if (o.detail.errMsg == "getPhoneNumber:ok" && (uni.showLoading({ title: "" }), Ade({
        mobile_code: o.detail.code
      }).then((e) => {
        uni.hideLoading(), this.getMemberInfo();
      }).catch(() => {
        setTimeout(() => {
          uni.hideLoading();
        }, 2e3);
      })), o.detail.errno == 104) {
        let e = "用户未授权隐私权限";
        uni.showToast({ title: e, icon: "none" });
      }
      if (o.detail.errMsg == "getPhoneNumber:fail user deny") {
        let e = "用户拒绝获取手机号码";
        uni.showToast({ title: e, icon: "none" });
      }
    }
  }
}), ge = jde, W = (o) => {
  const e = pt();
  if (Ve().mode == "decorate")
    return;
  let { url: t, mode: n, param: r, success: s, fail: c, complete: a } = o;
  t && (t.indexOf("https") != -1 || t.indexOf("http") != -1) && (window.location.href = t);
  let i = t, l = !1;
  if (!Ao() && Mne().indexOf(t) != -1) {
    const d = Co(), f = Pt();
    if (Le())
      if (d.login.is_username && !d.login.is_mobile && !d.login.is_auth_register)
        t = "/app/pages/auth/login", r = { type: "username" }, l = !0;
      else if (f.initStatus == "finish" && !d.login.is_username && !d.login.is_mobile && !d.login.is_auth_register) {
        e.showToast({ title: "商家未开启登录注册", icon: "none" });
        return;
      } else
        t = "/app/pages/auth/index", l = !0;
    else if (d.login.is_username && !d.login.is_mobile)
      t = "/app/pages/auth/login", r = { type: "username" }, l = !0;
    else if (f.initStatus == "finish" && !d.login.is_username && !d.login.is_mobile) {
      e.showToast({ title: "商家未开启登录注册", icon: "none" });
      return;
    } else
      t = "/app/pages/auth/index", l = !0;
  }
  switch (n = n || "navigateTo", kne().includes(t) && (n = "switchTab"), n != "switchTab" && r && Object.keys(r).length && (t += e.$u.queryParams(r)), l && e.setStorage({ key: "loginBack", data: { url: i } }), n) {
    case "switchTab":
      e.switchTab({
        url: t,
        success: () => {
          s && s();
        },
        fail: () => {
          c && c();
        },
        complete: () => {
          a && a();
        }
      });
      break;
    case "navigateTo":
      e.navigateTo({
        url: t,
        success: () => {
          s && s();
        },
        fail: () => {
          c && c();
        },
        complete: () => {
          a && a();
        }
      });
      break;
    case "reLaunch":
      e.reLaunch({
        url: t,
        success: () => {
          s && s();
        },
        fail: () => {
          c && c();
        },
        complete: () => {
          a && a();
        }
      });
      break;
    case "redirectTo":
      e.redirectTo({
        url: t,
        success: () => {
          s && s();
        },
        fail: () => {
          c && c();
        },
        complete: () => {
          a && a();
        }
      });
      break;
  }
}, kde = (o) => {
  Ve().mode != "decorate" && (o == null || Object.keys(o).length == 1 || (o.url && (o.url.indexOf("https") != -1 || o.url.indexOf("http") != -1) ? window.location.href = o.url : o.appid || (o.name == "DIY_MAKE_PHONE_CALL" && o.mobile ? uni.makePhoneCall({
    phoneNumber: o.mobile,
    success: (t) => {
    },
    fail: (t) => {
    }
  }) : W({ url: o.url }))));
}, Mo = () => {
  const o = getCurrentPages(), e = o[o.length - 1];
  return e ? e.route : "";
};
function Ao() {
  return ge().token;
}
function Ide(o) {
  uni.setStorageSync(X.VITE_REQUEST_STORAGE_TOKEN_KEY, o);
}
function Nde() {
  uni.removeStorageSync(X.VITE_REQUEST_STORAGE_TOKEN_KEY);
}
function Dde(o) {
  const e = {}, [t, n] = o.split("?");
  return n && n.split("&").forEach((r) => {
    let [s, c] = r.split("=");
    e[s] = c;
  }), { path: t, query: e };
}
function Yn(o) {
  return o && (o.indexOf("http://") != -1 || o.indexOf("https://") != -1) || !1;
}
function Ede(o) {
  let e = X.VITE_IMG_DOMAIN || location.origin;
  return typeof o == "string" && o.startsWith("/") && (o = o.replace(/^\//, "")), typeof e == "string" && e.endsWith("/") && (e = e.slice(0, -1)), Yn(o) ? o : `${e}/${o}`;
}
function Le() {
  let o = navigator.userAgent.toLowerCase();
  return !!/micromessenger/.test(o);
}
function rn() {
  return Le() ? "wechat" : "h5";
}
function sn(o) {
  const e = location.href.match(/\/wap\/(\d*)\//);
  return e && (o = e[1]), o;
}
let an = !1;
function Kn() {
  return typeof window > "u" ? !1 : /[?&]mode=decorate(?:&|$|#)/.test(window.location.href);
}
function tbe() {
  if (typeof window > "u")
    return !1;
  try {
    return window.parent !== window;
  } catch {
    return !1;
  }
}
function xde(o) {
  o != null && o.length && o.forEach((e) => {
    e.pageStyle = "", e.componentIsShow = !0, e.pageStartBgColor && (e.pageStartBgColor && e.pageEndBgColor ? e.pageStyle += `background:linear-gradient(${e.pageGradientAngle},${e.pageStartBgColor},${e.pageEndBgColor});` : e.pageStyle += "background-color:" + e.pageStartBgColor + ";"), e.margin && (e.margin.top > 0 ? e.pageStyle += "padding-top:" + e.margin.top * 2 + "rpx;" : e.pageStyle += "padding-top:2rpx;", e.pageStyle += "padding-bottom:" + e.margin.bottom * 2 + "rpx;", e.pageStyle += "padding-right:" + e.margin.both * 2 + "rpx;", e.pageStyle += "padding-left:" + e.margin.both * 2 + "rpx;");
  });
}
function Rde(o) {
  const e = Ve();
  o.pageMode !== void 0 && (e.pageMode = o.pageMode), o.currentIndex !== void 0 && (e.currentIndex = o.currentIndex), o.global && (e.global = o.global), o.value && (e.value = o.value), xde(e.value);
}
function Qn() {
  if (an)
    return;
  an = !0;
  const o = Ve();
  Kn() && (o.mode = "decorate"), window.addEventListener("message", (e) => {
    try {
      let t;
      if (typeof e.data == "string")
        t = JSON.parse(e.data);
      else if (typeof e.data == "object" && e.data)
        t = e.data;
      else
        return;
      if (t.type || !t.global && !t.value)
        return;
      o.mode = "decorate", Rde(t);
    } catch (t) {
      console.log("uni-app diy decorate bridge", t);
    }
  }, !1);
}
function zde() {
  Qn(), window.parent.postMessage(JSON.stringify({
    type: "init",
    load: !0
  }), "*");
}
function cn(o = {}) {
  var n;
  if (o.mode)
    return String(o.mode);
  const e = getCurrentPages(), t = e[e.length - 1];
  return (n = t == null ? void 0 : t.options) != null && n.mode ? String(t.options.mode) : Kn() ? "decorate" : "";
}
const Ve = Eo("diy", {
  state: () => ({
    mode: "",
    id: 0,
    pageMode: "diy",
    currentIndex: -99,
    global: {
      title: "",
      pageStartBgColor: "",
      // 页面背景颜色（开始）
      pageEndBgColor: "",
      // 页面背景颜色（结束）
      bottomTabBar: {
        control: !0,
        // 是否允许展示编辑
        isShow: !0,
        // 是否显示
        designNav: {
          title: "",
          key: ""
        }
      },
      copyright: {
        control: !0,
        // 是否允许展示编辑
        isShow: !1,
        // 是否显示
        textColor: "#ccc"
      },
      bgUrl: ""
    },
    value: [],
    // 组件集合
    topFixedStatus: "home",
    // 顶部 置顶组件状态，home：展示首页数据、diy：展示置顶组件定义的子页面
    scrollTop: 0,
    // 滚动位置
    topTabarHeight: 0,
    componentRefs: null,
    imageAdsSameScreen: !1
  }),
  getters: {},
  actions: {
    // 初始化
    init() {
      Qn(), zde();
    },
    // 将数据传输给后台
    postMessage(o, e) {
      if (this.currentIndex = o, e)
        var t = JSON.stringify({
          type: "data",
          index: this.currentIndex,
          global: ho(this.global),
          value: ho(this.value),
          component: ho(e)
        });
      window.parent.postMessage(t, "*");
    },
    // 选中正在编辑的组件
    changeCurrentIndex(o, e = null) {
      if (this.mode == "" || this.currentIndex == o)
        return;
      this.currentIndex = o;
      const t = JSON.stringify({
        type: "change",
        index: o,
        component: ho(e)
      });
      window.parent.postMessage(t, "*");
    },
    toRedirect(o) {
      if (Object.keys(o).length) {
        if (!o.name)
          return;
        if (Mo() == "app/pages/member/index" && !Ao()) {
          Gn().setLoginBack({ url: o.url });
          return;
        }
        kde(o);
      }
    }
  }
}), Fde = "onShow", Lde = "onHide", Hde = "onLoad", Bde = "onUnload", Ude = "onPageScroll", po = (o) => (e, t = yn()) => {
  !$ne && vne(o, e, t);
}, Xn = /* @__PURE__ */ po(Fde), Jn = /* @__PURE__ */ po(Lde), Wde = /* @__PURE__ */ po(Hde), qde = /* @__PURE__ */ po(Bde), Zn = /* @__PURE__ */ po(Ude);
function Vde(o) {
  return B.get("diy/diy", o);
}
function nbe(o) {
  return B.get("diy/tabbar/list", o);
}
function rbe(o) {
  return B.get("diy/share", o);
}
function sbe() {
  return B.get("diy/form/member_record");
}
const Gde = Symbol("addonPageQuery");
function abe(o = {}) {
  const e = K(!0), t = Ve(), n = bne(Gde, null), r = K(0), s = K(o.name || ""), c = K(""), a = K(""), i = At({}), l = At({
    pageMode: "diy",
    title: "",
    global: {},
    value: []
  }), u = () => e.value, d = $n(() => t.mode == "decorate" ? t : l), f = K(!1), h = () => {
    let P = "";
    return d.value.global.pageStartBgColor && (d.value.global.pageStartBgColor && d.value.global.pageEndBgColor ? P += `background:linear-gradient(${d.value.global.pageGradientAngle},${d.value.global.pageStartBgColor},${d.value.global.pageEndBgColor});` : P += "background-color:" + d.value.global.pageStartBgColor + ";"), d.value.global.bottomTabBar && d.value.global.bottomTabBar.isShow ? P += "min-height:calc(100vh - 50px);" : P += "min-height:calc(100vh);", d.value.global.bgUrl && (P += `background-image:url('${Ede(d.value.global.bgUrl)}');`), d.value.global.bgHeightScale && (P += `background-size: 100% ${d.value.global.bgHeightScale}%;`), P;
  };
  function m(P, C) {
    if (Object.assign(i, P.data), !i.value) {
      e.value = !1, C && C(i);
      return;
    }
    l.pageMode = i.mode, l.title = i.title;
    const R = JSON.parse(i.value);
    l.global = R.global, l.global.id = i.id, l.global.site_id = i.site_id, l.global.type = i.type, l.global.popWindow && l.global.popWindow.show && (l.global.popWindow.id = i.id), l.value = R.value, l.value.forEach((T) => {
      T.pageStyle = "", T.componentIsShow = !0, T.pageStartBgColor && (T.pageStartBgColor && T.pageEndBgColor ? T.pageStyle += `background:linear-gradient(${T.pageGradientAngle},${T.pageStartBgColor},${T.pageEndBgColor});` : T.pageStyle += "background-color:" + T.pageStartBgColor + ";"), T.margin && (T.margin.top > 0 && (T.pageStyle += "padding-top:" + T.margin.top * 2 + "rpx;"), T.pageStyle += "padding-bottom:" + T.margin.bottom * 2 + "rpx;", T.pageStyle += "padding-right:" + T.margin.both * 2 + "rpx;", T.pageStyle += "padding-left:" + T.margin.both * 2 + "rpx;");
    }), t.global = l.global, t.value = l.value, f.value = l.value.some((T) => T && T.position && T.position == "top_fixed"), pt().setNavigationBarTitle({
      title: l.title
    }), e.value = !1, C && C(i);
  }
  function g(P = null) {
    Vde({
      id: r.value,
      name: s.value,
      template: c.value
    }).then((C) => {
      m(C, P);
    }).catch(() => {
      e.value = !1;
    });
  }
  function $() {
    t.mode === "decorate" && (l.pageMode = t.pageMode, l.global = t.global, l.value = t.value);
  }
  return vn(
    () => [t.mode, t.pageMode, t.global, t.value],
    () => $(),
    { deep: !0, immediate: !0 }
  ), {
    getLoading: u,
    get data() {
      return d.value;
    },
    isShowTopTabbar: f,
    pageStyle: h,
    onLoad: () => {
      Wde((P) => {
        var C;
        !P.mode && ((C = n == null ? void 0 : n.value) != null && C.mode) && (P.mode = n.value.mode), t.mode = cn(P), t.mode == "decorate" && (e.value = !1, $()), r.value = P.id || "", s.value == "" && (s.value = P.name || ""), c.value = P.template || "";
      });
    },
    onShow: (P = null) => {
      Xn(() => {
        let C = getCurrentPages();
        a.value = C[C.length - 1] ? C[C.length - 1].route : "";
        let R = [];
        uni.getStorageSync("diyPageBlank") && (R = uni.getStorageSync("diyPageBlank")), !R.length || R.length && R.indexOf(a.value) == -1 ? t.topFixedStatus = "home" : R.length && R.indexOf(a.value) != -1 && (t.topFixedStatus = "diy"), t.mode || (t.mode = cn({})), t.mode == "decorate" ? (t.init(), $()) : g(P);
      });
    },
    onHide: (P = null) => {
      Jn(() => {
        let C = [];
        uni.getStorageSync("diyPageBlank") && (C = uni.getStorageSync("diyPageBlank")), C.length && (C = Array.from(new Set(C)), C.forEach((R, T, $e) => {
          R == a.value && $e.splice(T, 1);
        })), t.topFixedStatus == "diy" && C.push(a.value), uni.setStorageSync("diyPageBlank", C), P && P();
      });
    },
    onUnload: (P = null) => {
      qde(() => {
        P && P();
      });
    },
    onPageScroll: () => {
      Zn((P) => {
        P.scrollTop > 0 && (t.scrollTop = P.scrollTop);
      });
    }
  };
}
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ln(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function ne(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ln(Object(t), !0).forEach(function(n) {
      Yde(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : ln(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function To(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? To = function(e) {
    return typeof e;
  } : To = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, To(o);
}
function Yde(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function ce() {
  return ce = Object.assign || function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (o[n] = t[n]);
    }
    return o;
  }, ce.apply(this, arguments);
}
function Kde(o, e) {
  if (o == null)
    return {};
  var t = {}, n = Object.keys(o), r, s;
  for (s = 0; s < n.length; s++)
    r = n[s], !(e.indexOf(r) >= 0) && (t[r] = o[r]);
  return t;
}
function Qde(o, e) {
  if (o == null)
    return {};
  var t = Kde(o, e), n, r;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(o);
    for (r = 0; r < s.length; r++)
      n = s[r], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(o, n) && (t[n] = o[n]);
  }
  return t;
}
var Xde = "1.15.6";
function ae(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var le = ae(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), mo = ae(/Edge/i), dn = ae(/firefox/i), no = ae(/safari/i) && !ae(/chrome/i) && !ae(/android/i), St = ae(/iP(ad|od|hone)/i), er = ae(/chrome/i) && ae(/android/i), or = {
  capture: !1,
  passive: !1
};
function O(o, e, t) {
  o.addEventListener(e, t, !le && or);
}
function S(o, e, t) {
  o.removeEventListener(e, t, !le && or);
}
function jo(o, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), o)
      try {
        if (o.matches)
          return o.matches(e);
        if (o.msMatchesSelector)
          return o.msMatchesSelector(e);
        if (o.webkitMatchesSelector)
          return o.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function tr(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function Z(o, e, t, n) {
  if (o) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? o.parentNode === t && jo(o, e) : jo(o, e)) || n && o === t)
        return o;
      if (o === t)
        break;
    } while (o = tr(o));
  }
  return null;
}
var un = /\s+/g;
function G(o, e, t) {
  if (o && e)
    if (o.classList)
      o.classList[t ? "add" : "remove"](e);
    else {
      var n = (" " + o.className + " ").replace(un, " ").replace(" " + e + " ", " ");
      o.className = (n + (t ? " " + e : "")).replace(un, " ");
    }
}
function _(o, e, t) {
  var n = o && o.style;
  if (n) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(o, "") : o.currentStyle && (t = o.currentStyle), e === void 0 ? t : t[e];
    !(e in n) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), n[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function Re(o, e) {
  var t = "";
  if (typeof o == "string")
    t = o;
  else
    do {
      var n = _(o, "transform");
      n && n !== "none" && (t = n + " " + t);
    } while (!e && (o = o.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(t);
}
function nr(o, e, t) {
  if (o) {
    var n = o.getElementsByTagName(e), r = 0, s = n.length;
    if (t)
      for (; r < s; r++)
        t(n[r], r);
    return n;
  }
  return [];
}
function te() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function x(o, e, t, n, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var s, c, a, i, l, u, d;
    if (o !== window && o.parentNode && o !== te() ? (s = o.getBoundingClientRect(), c = s.top, a = s.left, i = s.bottom, l = s.right, u = s.height, d = s.width) : (c = 0, a = 0, i = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (e || t) && o !== window && (r = r || o.parentNode, !le))
      do
        if (r && r.getBoundingClientRect && (_(r, "transform") !== "none" || t && _(r, "position") !== "static")) {
          var f = r.getBoundingClientRect();
          c -= f.top + parseInt(_(r, "border-top-width")), a -= f.left + parseInt(_(r, "border-left-width")), i = c + s.height, l = a + s.width;
          break;
        }
      while (r = r.parentNode);
    if (n && o !== window) {
      var h = Re(r || o), m = h && h.a, g = h && h.d;
      h && (c /= g, a /= m, d /= m, u /= g, i = c + u, l = a + d);
    }
    return {
      top: c,
      left: a,
      bottom: i,
      right: l,
      width: d,
      height: u
    };
  }
}
function pn(o, e, t) {
  for (var n = _e(o, !0), r = x(o)[e]; n; ) {
    var s = x(n)[t], c = void 0;
    if (t === "top" || t === "left" ? c = r >= s : c = r <= s, !c)
      return n;
    if (n === te())
      break;
    n = _e(n, !1);
  }
  return !1;
}
function He(o, e, t, n) {
  for (var r = 0, s = 0, c = o.children; s < c.length; ) {
    if (c[s].style.display !== "none" && c[s] !== y.ghost && (n || c[s] !== y.dragged) && Z(c[s], t.draggable, o, !1)) {
      if (r === e)
        return c[s];
      r++;
    }
    s++;
  }
  return null;
}
function Ot(o, e) {
  for (var t = o.lastElementChild; t && (t === y.ghost || _(t, "display") === "none" || e && !jo(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function Q(o, e) {
  var t = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== y.clone && (!e || jo(o, e)) && t++;
  return t;
}
function mn(o) {
  var e = 0, t = 0, n = te();
  if (o)
    do {
      var r = Re(o), s = r.a, c = r.d;
      e += o.scrollLeft * s, t += o.scrollTop * c;
    } while (o !== n && (o = o.parentNode));
  return [e, t];
}
function Jde(o, e) {
  for (var t in o)
    if (o.hasOwnProperty(t)) {
      for (var n in e)
        if (e.hasOwnProperty(n) && e[n] === o[t][n])
          return Number(t);
    }
  return -1;
}
function _e(o, e) {
  if (!o || !o.getBoundingClientRect)
    return te();
  var t = o, n = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var r = _(t);
      if (t.clientWidth < t.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body)
          return te();
        if (n || e)
          return t;
        n = !0;
      }
    }
  while (t = t.parentNode);
  return te();
}
function Zde(o, e) {
  if (o && e)
    for (var t in e)
      e.hasOwnProperty(t) && (o[t] = e[t]);
  return o;
}
function Go(o, e) {
  return Math.round(o.top) === Math.round(e.top) && Math.round(o.left) === Math.round(e.left) && Math.round(o.height) === Math.round(e.height) && Math.round(o.width) === Math.round(e.width);
}
var ro;
function rr(o, e) {
  return function() {
    if (!ro) {
      var t = arguments, n = this;
      t.length === 1 ? o.call(n, t[0]) : o.apply(n, t), ro = setTimeout(function() {
        ro = void 0;
      }, e);
    }
  };
}
function eue() {
  clearTimeout(ro), ro = void 0;
}
function sr(o, e, t) {
  o.scrollLeft += e, o.scrollTop += t;
}
function ar(o) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(o).cloneNode(!0) : t ? t(o).clone(!0)[0] : o.cloneNode(!0);
}
function cr(o, e, t) {
  var n = {};
  return Array.from(o.children).forEach(function(r) {
    var s, c, a, i;
    if (!(!Z(r, e.draggable, o, !1) || r.animated || r === t)) {
      var l = x(r);
      n.left = Math.min((s = n.left) !== null && s !== void 0 ? s : 1 / 0, l.left), n.top = Math.min((c = n.top) !== null && c !== void 0 ? c : 1 / 0, l.top), n.right = Math.max((a = n.right) !== null && a !== void 0 ? a : -1 / 0, l.right), n.bottom = Math.max((i = n.bottom) !== null && i !== void 0 ? i : -1 / 0, l.bottom);
    }
  }), n.width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n;
}
var V = "Sortable" + new Date().getTime();
function oue() {
  var o = [], e;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var n = [].slice.call(this.el.children);
        n.forEach(function(r) {
          if (!(_(r, "display") === "none" || r === y.ghost)) {
            o.push({
              target: r,
              rect: x(r)
            });
            var s = ne({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var c = Re(r, !0);
              c && (s.top -= c.f, s.left -= c.e);
            }
            r.fromRect = s;
          }
        });
      }
    },
    addAnimationState: function(n) {
      o.push(n);
    },
    removeAnimationState: function(n) {
      o.splice(Jde(o, {
        target: n
      }), 1);
    },
    animateAll: function(n) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof n == "function" && n();
        return;
      }
      var s = !1, c = 0;
      o.forEach(function(a) {
        var i = 0, l = a.target, u = l.fromRect, d = x(l), f = l.prevFromRect, h = l.prevToRect, m = a.rect, g = Re(l, !0);
        g && (d.top -= g.f, d.left -= g.e), l.toRect = d, l.thisAnimationDuration && Go(f, d) && !Go(u, d) && // Make sure animatingRect is on line between toRect & fromRect
        (m.top - d.top) / (m.left - d.left) === (u.top - d.top) / (u.left - d.left) && (i = nue(m, f, h, r.options)), Go(d, u) || (l.prevFromRect = u, l.prevToRect = d, i || (i = r.options.animation), r.animate(l, m, d, i)), i && (s = !0, c = Math.max(c, i), clearTimeout(l.animationResetTimer), l.animationResetTimer = setTimeout(function() {
          l.animationTime = 0, l.prevFromRect = null, l.fromRect = null, l.prevToRect = null, l.thisAnimationDuration = null;
        }, i), l.thisAnimationDuration = i);
      }), clearTimeout(e), s ? e = setTimeout(function() {
        typeof n == "function" && n();
      }, c) : typeof n == "function" && n(), o = [];
    },
    animate: function(n, r, s, c) {
      if (c) {
        _(n, "transition", ""), _(n, "transform", "");
        var a = Re(this.el), i = a && a.a, l = a && a.d, u = (r.left - s.left) / (i || 1), d = (r.top - s.top) / (l || 1);
        n.animatingX = !!u, n.animatingY = !!d, _(n, "transform", "translate3d(" + u + "px," + d + "px,0)"), this.forRepaintDummy = tue(n), _(n, "transition", "transform " + c + "ms" + (this.options.easing ? " " + this.options.easing : "")), _(n, "transform", "translate3d(0,0,0)"), typeof n.animated == "number" && clearTimeout(n.animated), n.animated = setTimeout(function() {
          _(n, "transition", ""), _(n, "transform", ""), n.animated = !1, n.animatingX = !1, n.animatingY = !1;
        }, c);
      }
    }
  };
}
function tue(o) {
  return o.offsetWidth;
}
function nue(o, e, t, n) {
  return Math.sqrt(Math.pow(e.top - o.top, 2) + Math.pow(e.left - o.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * n.animation;
}
var je = [], Yo = {
  initializeByDefault: !0
}, fo = {
  mount: function(e) {
    for (var t in Yo)
      Yo.hasOwnProperty(t) && !(t in e) && (e[t] = Yo[t]);
    je.forEach(function(n) {
      if (n.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), je.push(e);
  },
  pluginEvent: function(e, t, n) {
    var r = this;
    this.eventCanceled = !1, n.cancel = function() {
      r.eventCanceled = !0;
    };
    var s = e + "Global";
    je.forEach(function(c) {
      t[c.pluginName] && (t[c.pluginName][s] && t[c.pluginName][s](ne({
        sortable: t
      }, n)), t.options[c.pluginName] && t[c.pluginName][e] && t[c.pluginName][e](ne({
        sortable: t
      }, n)));
    });
  },
  initializePlugins: function(e, t, n, r) {
    je.forEach(function(a) {
      var i = a.pluginName;
      if (!(!e.options[i] && !a.initializeByDefault)) {
        var l = new a(e, t, e.options);
        l.sortable = e, l.options = e.options, e[i] = l, ce(n, l.defaults);
      }
    });
    for (var s in e.options)
      if (e.options.hasOwnProperty(s)) {
        var c = this.modifyOption(e, s, e.options[s]);
        typeof c < "u" && (e.options[s] = c);
      }
  },
  getEventProperties: function(e, t) {
    var n = {};
    return je.forEach(function(r) {
      typeof r.eventProperties == "function" && ce(n, r.eventProperties.call(t[r.pluginName], e));
    }), n;
  },
  modifyOption: function(e, t, n) {
    var r;
    return je.forEach(function(s) {
      e[s.pluginName] && s.optionListeners && typeof s.optionListeners[t] == "function" && (r = s.optionListeners[t].call(e[s.pluginName], n));
    }), r;
  }
};
function rue(o) {
  var e = o.sortable, t = o.rootEl, n = o.name, r = o.targetEl, s = o.cloneEl, c = o.toEl, a = o.fromEl, i = o.oldIndex, l = o.newIndex, u = o.oldDraggableIndex, d = o.newDraggableIndex, f = o.originalEvent, h = o.putSortable, m = o.extraEventProperties;
  if (e = e || t && t[V], !!e) {
    var g, $ = e.options, b = "on" + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent && !le && !mo ? g = new CustomEvent(n, {
      bubbles: !0,
      cancelable: !0
    }) : (g = document.createEvent("Event"), g.initEvent(n, !0, !0)), g.to = c || t, g.from = a || t, g.item = r || t, g.clone = s, g.oldIndex = i, g.newIndex = l, g.oldDraggableIndex = u, g.newDraggableIndex = d, g.originalEvent = f, g.pullMode = h ? h.lastPutMode : void 0;
    var w = ne(ne({}, m), fo.getEventProperties(n, e));
    for (var I in w)
      g[I] = w[I];
    t && t.dispatchEvent(g), $[b] && $[b].call(e, g);
  }
}
var sue = ["evt"], q = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, s = Qde(n, sue);
  fo.pluginEvent.bind(y)(e, t, ne({
    dragEl: p,
    parentEl: N,
    ghostEl: v,
    rootEl: j,
    nextEl: Oe,
    lastDownEl: Po,
    cloneEl: k,
    cloneHidden: he,
    dragStarted: Xe,
    putSortable: z,
    activeSortable: y.active,
    originalEvent: r,
    oldIndex: Ee,
    oldDraggableIndex: so,
    newIndex: Y,
    newDraggableIndex: fe,
    hideGhostForTarget: ur,
    unhideGhostForTarget: pr,
    cloneNowHidden: function() {
      he = !0;
    },
    cloneNowShown: function() {
      he = !1;
    },
    dispatchSortableEvent: function(a) {
      U({
        sortable: t,
        name: a,
        originalEvent: r
      });
    }
  }, s));
};
function U(o) {
  rue(ne({
    putSortable: z,
    cloneEl: k,
    targetEl: p,
    rootEl: j,
    oldIndex: Ee,
    oldDraggableIndex: so,
    newIndex: Y,
    newDraggableIndex: fe
  }, o));
}
var p, N, v, j, Oe, Po, k, he, Ee, Y, so, fe, _o, z, De = !1, ko = !1, Io = [], Te, J, Ko, Qo, fn, gn, Xe, ke, ao, co = !1, yo = !1, So, L, Xo = [], it = !1, No = [], Fo = typeof document < "u", $o = St, hn = mo || le ? "cssFloat" : "float", aue = Fo && !er && !St && "draggable" in document.createElement("div"), ir = function() {
  if (Fo) {
    if (le)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), lr = function(e, t) {
  var n = _(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), s = He(e, 0, t), c = He(e, 1, t), a = s && _(s), i = c && _(c), l = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + x(s).width, u = i && parseInt(i.marginLeft) + parseInt(i.marginRight) + x(c).width;
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (s && a.float && a.float !== "none") {
    var d = a.float === "left" ? "left" : "right";
    return c && (i.clear === "both" || i.clear === d) ? "vertical" : "horizontal";
  }
  return s && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || l >= r && n[hn] === "none" || c && n[hn] === "none" && l + u > r) ? "vertical" : "horizontal";
}, cue = function(e, t, n) {
  var r = n ? e.left : e.top, s = n ? e.right : e.bottom, c = n ? e.width : e.height, a = n ? t.left : t.top, i = n ? t.right : t.bottom, l = n ? t.width : t.height;
  return r === a || s === i || r + c / 2 === a + l / 2;
}, iue = function(e, t) {
  var n;
  return Io.some(function(r) {
    var s = r[V].options.emptyInsertThreshold;
    if (!(!s || Ot(r))) {
      var c = x(r), a = e >= c.left - s && e <= c.right + s, i = t >= c.top - s && t <= c.bottom + s;
      if (a && i)
        return n = r;
    }
  }), n;
}, dr = function(e) {
  function t(s, c) {
    return function(a, i, l, u) {
      var d = a.options.group.name && i.options.group.name && a.options.group.name === i.options.group.name;
      if (s == null && (c || d))
        return !0;
      if (s == null || s === !1)
        return !1;
      if (c && s === "clone")
        return s;
      if (typeof s == "function")
        return t(s(a, i, l, u), c)(a, i, l, u);
      var f = (c ? a : i).options.group.name;
      return s === !0 || typeof s == "string" && s === f || s.join && s.indexOf(f) > -1;
    };
  }
  var n = {}, r = e.group;
  (!r || To(r) != "object") && (r = {
    name: r
  }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, ur = function() {
  !ir && v && _(v, "display", "none");
}, pr = function() {
  !ir && v && _(v, "display", "");
};
Fo && !er && document.addEventListener("click", function(o) {
  if (ko)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), ko = !1, !1;
}, !0);
var Pe = function(e) {
  if (p) {
    e = e.touches ? e.touches[0] : e;
    var t = iue(e.clientX, e.clientY);
    if (t) {
      var n = {};
      for (var r in e)
        e.hasOwnProperty(r) && (n[r] = e[r]);
      n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[V]._onDragOver(n);
    }
  }
}, lue = function(e) {
  p && p.parentNode[V]._isOutsideThisEl(e.target);
};
function y(o, e) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = e = ce({}, e), o[V] = this;
  var t = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(o.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return lr(o, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(c, a) {
      c.setData("Text", a.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: y.supportPointer !== !1 && "PointerEvent" in window && (!no || St),
    emptyInsertThreshold: 5
  };
  fo.initializePlugins(this, o, t);
  for (var n in t)
    !(n in e) && (e[n] = t[n]);
  dr(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : aue, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? O(o, "pointerdown", this._onTapStart) : (O(o, "mousedown", this._onTapStart), O(o, "touchstart", this._onTapStart)), this.nativeDraggable && (O(o, "dragover", this), O(o, "dragenter", this)), Io.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ce(this, oue());
}
y.prototype = /** @lends Sortable.prototype */
{
  constructor: y,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (ke = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, p) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, n = this.el, r = this.options, s = r.preventOnFilter, c = e.type, a = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, i = (a || e).target, l = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || i, u = r.filter;
      if (_ue(n), !p && !(/mousedown|pointerdown/.test(c) && e.button !== 0 || r.disabled) && !l.isContentEditable && !(!this.nativeDraggable && no && i && i.tagName.toUpperCase() === "SELECT") && (i = Z(i, r.draggable, n, !1), !(i && i.animated) && Po !== i)) {
        if (Ee = Q(i), so = Q(i, r.draggable), typeof u == "function") {
          if (u.call(this, e, i, this)) {
            U({
              sortable: t,
              rootEl: l,
              name: "filter",
              targetEl: i,
              toEl: n,
              fromEl: n
            }), q("filter", t, {
              evt: e
            }), s && e.preventDefault();
            return;
          }
        } else if (u && (u = u.split(",").some(function(d) {
          if (d = Z(l, d.trim(), n, !1), d)
            return U({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: i,
              fromEl: n,
              toEl: n
            }), q("filter", t, {
              evt: e
            }), !0;
        }), u)) {
          s && e.preventDefault();
          return;
        }
        r.handle && !Z(l, r.handle, n, !1) || this._prepareDragStart(e, a, i);
      }
    }
  },
  _prepareDragStart: function(e, t, n) {
    var r = this, s = r.el, c = r.options, a = s.ownerDocument, i;
    if (n && !p && n.parentNode === s) {
      var l = x(n);
      if (j = s, p = n, N = p.parentNode, Oe = p.nextSibling, Po = n, _o = c.group, y.dragged = p, Te = {
        target: p,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, fn = Te.clientX - l.left, gn = Te.clientY - l.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, p.style["will-change"] = "all", i = function() {
        if (q("delayEnded", r, {
          evt: e
        }), y.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !dn && r.nativeDraggable && (p.draggable = !0), r._triggerDragStart(e, t), U({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), G(p, c.chosenClass, !0);
      }, c.ignore.split(",").forEach(function(u) {
        nr(p, u.trim(), Jo);
      }), O(a, "dragover", Pe), O(a, "mousemove", Pe), O(a, "touchmove", Pe), c.supportPointer ? (O(a, "pointerup", r._onDrop), !this.nativeDraggable && O(a, "pointercancel", r._onDrop)) : (O(a, "mouseup", r._onDrop), O(a, "touchend", r._onDrop), O(a, "touchcancel", r._onDrop)), dn && this.nativeDraggable && (this.options.touchStartThreshold = 4, p.draggable = !0), q("delayStart", this, {
        evt: e
      }), c.delay && (!c.delayOnTouchOnly || t) && (!this.nativeDraggable || !(mo || le))) {
        if (y.eventCanceled) {
          this._onDrop();
          return;
        }
        c.supportPointer ? (O(a, "pointerup", r._disableDelayedDrag), O(a, "pointercancel", r._disableDelayedDrag)) : (O(a, "mouseup", r._disableDelayedDrag), O(a, "touchend", r._disableDelayedDrag), O(a, "touchcancel", r._disableDelayedDrag)), O(a, "mousemove", r._delayedDragTouchMoveHandler), O(a, "touchmove", r._delayedDragTouchMoveHandler), c.supportPointer && O(a, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(i, c.delay);
      } else
        i();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    p && Jo(p), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    S(e, "mouseup", this._disableDelayedDrag), S(e, "touchend", this._disableDelayedDrag), S(e, "touchcancel", this._disableDelayedDrag), S(e, "pointerup", this._disableDelayedDrag), S(e, "pointercancel", this._disableDelayedDrag), S(e, "mousemove", this._delayedDragTouchMoveHandler), S(e, "touchmove", this._delayedDragTouchMoveHandler), S(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? O(document, "pointermove", this._onTouchMove) : t ? O(document, "touchmove", this._onTouchMove) : O(document, "mousemove", this._onTouchMove) : (O(p, "dragend", this), O(j, "dragstart", this._onDragStart));
    try {
      document.selection ? Oo(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (De = !1, j && p) {
      q("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && O(document, "dragover", lue);
      var n = this.options;
      !e && G(p, n.dragClass, !1), G(p, n.ghostClass, !0), y.active = this, e && this._appendGhost(), U({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (J) {
      this._lastX = J.clientX, this._lastY = J.clientY, ur();
      for (var e = document.elementFromPoint(J.clientX, J.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(J.clientX, J.clientY), e !== t); )
        t = e;
      if (p.parentNode[V]._isOutsideThisEl(e), t)
        do {
          if (t[V]) {
            var n = void 0;
            if (n = t[V]._onDragOver({
              clientX: J.clientX,
              clientY: J.clientY,
              target: e,
              rootEl: t
            }), n && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = tr(t));
      pr();
    }
  },
  _onTouchMove: function(e) {
    if (Te) {
      var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, s = e.touches ? e.touches[0] : e, c = v && Re(v, !0), a = v && c && c.a, i = v && c && c.d, l = $o && L && mn(L), u = (s.clientX - Te.clientX + r.x) / (a || 1) + (l ? l[0] - Xo[0] : 0) / (a || 1), d = (s.clientY - Te.clientY + r.y) / (i || 1) + (l ? l[1] - Xo[1] : 0) / (i || 1);
      if (!y.active && !De) {
        if (n && Math.max(Math.abs(s.clientX - this._lastX), Math.abs(s.clientY - this._lastY)) < n)
          return;
        this._onDragStart(e, !0);
      }
      if (v) {
        c ? (c.e += u - (Ko || 0), c.f += d - (Qo || 0)) : c = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: u,
          f: d
        };
        var f = "matrix(".concat(c.a, ",").concat(c.b, ",").concat(c.c, ",").concat(c.d, ",").concat(c.e, ",").concat(c.f, ")");
        _(v, "webkitTransform", f), _(v, "mozTransform", f), _(v, "msTransform", f), _(v, "transform", f), Ko = u, Qo = d, J = s;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!v) {
      var e = this.options.fallbackOnBody ? document.body : j, t = x(p, !0, $o, !0, e), n = this.options;
      if ($o) {
        for (L = e; _(L, "position") === "static" && _(L, "transform") === "none" && L !== document; )
          L = L.parentNode;
        L !== document.body && L !== document.documentElement ? (L === document && (L = te()), t.top += L.scrollTop, t.left += L.scrollLeft) : L = te(), Xo = mn(L);
      }
      v = p.cloneNode(!0), G(v, n.ghostClass, !1), G(v, n.fallbackClass, !0), G(v, n.dragClass, !0), _(v, "transition", ""), _(v, "transform", ""), _(v, "box-sizing", "border-box"), _(v, "margin", 0), _(v, "top", t.top), _(v, "left", t.left), _(v, "width", t.width), _(v, "height", t.height), _(v, "opacity", "0.8"), _(v, "position", $o ? "absolute" : "fixed"), _(v, "zIndex", "100000"), _(v, "pointerEvents", "none"), y.ghost = v, e.appendChild(v), _(v, "transform-origin", fn / parseInt(v.style.width) * 100 + "% " + gn / parseInt(v.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var n = this, r = e.dataTransfer, s = n.options;
    if (q("dragStart", this, {
      evt: e
    }), y.eventCanceled) {
      this._onDrop();
      return;
    }
    q("setupClone", this), y.eventCanceled || (k = ar(p), k.removeAttribute("id"), k.draggable = !1, k.style["will-change"] = "", this._hideClone(), G(k, this.options.chosenClass, !1), y.clone = k), n.cloneId = Oo(function() {
      q("clone", n), !y.eventCanceled && (n.options.removeCloneOnHide || j.insertBefore(k, p), n._hideClone(), U({
        sortable: n,
        name: "clone"
      }));
    }), !t && G(p, s.dragClass, !0), t ? (ko = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (S(document, "mouseup", n._onDrop), S(document, "touchend", n._onDrop), S(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", s.setData && s.setData.call(n, r, p)), O(document, "drop", n), _(p, "transform", "translateZ(0)")), De = !0, n._dragStartId = Oo(n._dragStarted.bind(n, t, e)), O(document, "selectstart", n), Xe = !0, window.getSelection().removeAllRanges(), no && _(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, n = e.target, r, s, c, a = this.options, i = a.group, l = y.active, u = _o === i, d = a.sort, f = z || l, h, m = this, g = !1;
    if (it)
      return;
    function $(Ke, gne) {
      q(Ke, m, ne({
        evt: e,
        isOwner: u,
        axis: h ? "vertical" : "horizontal",
        revert: c,
        dragRect: r,
        targetRect: s,
        canSort: d,
        fromSortable: f,
        target: n,
        completed: w,
        onMove: function(Mt, hne) {
          return vo(j, t, p, r, Mt, x(Mt), e, hne);
        },
        changed: I
      }, gne));
    }
    function b() {
      $("dragOverAnimationCapture"), m.captureAnimationState(), m !== f && f.captureAnimationState();
    }
    function w(Ke) {
      return $("dragOverCompleted", {
        insertion: Ke
      }), Ke && (u ? l._hideClone() : l._showClone(m), m !== f && (G(p, z ? z.options.ghostClass : l.options.ghostClass, !1), G(p, a.ghostClass, !0)), z !== m && m !== y.active ? z = m : m === y.active && z && (z = null), f === m && (m._ignoreWhileAnimating = n), m.animateAll(function() {
        $("dragOverAnimationComplete"), m._ignoreWhileAnimating = null;
      }), m !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (n === p && !p.animated || n === t && !n.animated) && (ke = null), !a.dragoverBubble && !e.rootEl && n !== document && (p.parentNode[V]._isOutsideThisEl(e.target), !Ke && Pe(e)), !a.dragoverBubble && e.stopPropagation && e.stopPropagation(), g = !0;
    }
    function I() {
      Y = Q(p), fe = Q(p, a.draggable), U({
        sortable: m,
        name: "change",
        toEl: t,
        newIndex: Y,
        newDraggableIndex: fe,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = Z(n, a.draggable, t, !0), $("dragOver"), y.eventCanceled)
      return g;
    if (p.contains(e.target) || n.animated && n.animatingX && n.animatingY || m._ignoreWhileAnimating === n)
      return w(!1);
    if (ko = !1, l && !a.disabled && (u ? d || (c = N !== j) : z === this || (this.lastPutMode = _o.checkPull(this, l, p, e)) && i.checkPut(this, l, p, e))) {
      if (h = this._getDirection(e, n) === "vertical", r = x(p), $("dragOverValid"), y.eventCanceled)
        return g;
      if (c)
        return N = j, b(), this._hideClone(), $("revert"), y.eventCanceled || (Oe ? j.insertBefore(p, Oe) : j.appendChild(p)), w(!0);
      var D = Ot(t, a.draggable);
      if (!D || mue(e, h, this) && !D.animated) {
        if (D === p)
          return w(!1);
        if (D && t === e.target && (n = D), n && (s = x(n)), vo(j, t, p, r, n, s, e, !!n) !== !1)
          return b(), D && D.nextSibling ? t.insertBefore(p, D.nextSibling) : t.appendChild(p), N = t, I(), w(!0);
      } else if (D && pue(e, h, this)) {
        var de = He(t, 0, a, !0);
        if (de === p)
          return w(!1);
        if (n = de, s = x(n), vo(j, t, p, r, n, s, e, !1) !== !1)
          return b(), t.insertBefore(p, de), N = t, I(), w(!0);
      } else if (n.parentNode === t) {
        s = x(n);
        var P = 0, C, R = p.parentNode !== t, T = !cue(p.animated && p.toRect || r, n.animated && n.toRect || s, h), $e = h ? "top" : "left", ue = pn(n, "top", "top") || pn(p, "top", "top"), Ge = ue ? ue.scrollTop : void 0;
        ke !== n && (C = s[$e], co = !1, yo = !T && a.invertSwap || R), P = fue(e, n, s, h, T ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, yo, ke === n);
        var se;
        if (P !== 0) {
          var ve = Q(p);
          do
            ve -= P, se = N.children[ve];
          while (se && (_(se, "display") === "none" || se === v));
        }
        if (P === 0 || se === n)
          return w(!1);
        ke = n, ao = P;
        var Ye = n.nextElementSibling, pe = !1;
        pe = P === 1;
        var go = vo(j, t, p, r, n, s, e, pe);
        if (go !== !1)
          return (go === 1 || go === -1) && (pe = go === 1), it = !0, setTimeout(uue, 30), b(), pe && !Ye ? t.appendChild(p) : n.parentNode.insertBefore(p, pe ? Ye : n), ue && sr(ue, 0, Ge - ue.scrollTop), N = p.parentNode, C !== void 0 && !yo && (So = Math.abs(C - x(n)[$e])), I(), w(!0);
      }
      if (t.contains(p))
        return w(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    S(document, "mousemove", this._onTouchMove), S(document, "touchmove", this._onTouchMove), S(document, "pointermove", this._onTouchMove), S(document, "dragover", Pe), S(document, "mousemove", Pe), S(document, "touchmove", Pe);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    S(e, "mouseup", this._onDrop), S(e, "touchend", this._onDrop), S(e, "pointerup", this._onDrop), S(e, "pointercancel", this._onDrop), S(e, "touchcancel", this._onDrop), S(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, n = this.options;
    if (Y = Q(p), fe = Q(p, n.draggable), q("drop", this, {
      evt: e
    }), N = p && p.parentNode, Y = Q(p), fe = Q(p, n.draggable), y.eventCanceled) {
      this._nulling();
      return;
    }
    De = !1, yo = !1, co = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), lt(this.cloneId), lt(this._dragStartId), this.nativeDraggable && (S(document, "drop", this), S(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), no && _(document.body, "user-select", ""), _(p, "transform", ""), e && (Xe && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), v && v.parentNode && v.parentNode.removeChild(v), (j === N || z && z.lastPutMode !== "clone") && k && k.parentNode && k.parentNode.removeChild(k), p && (this.nativeDraggable && S(p, "dragend", this), Jo(p), p.style["will-change"] = "", Xe && !De && G(p, z ? z.options.ghostClass : this.options.ghostClass, !1), G(p, this.options.chosenClass, !1), U({
      sortable: this,
      name: "unchoose",
      toEl: N,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), j !== N ? (Y >= 0 && (U({
      rootEl: N,
      name: "add",
      toEl: N,
      fromEl: j,
      originalEvent: e
    }), U({
      sortable: this,
      name: "remove",
      toEl: N,
      originalEvent: e
    }), U({
      rootEl: N,
      name: "sort",
      toEl: N,
      fromEl: j,
      originalEvent: e
    }), U({
      sortable: this,
      name: "sort",
      toEl: N,
      originalEvent: e
    })), z && z.save()) : Y !== Ee && Y >= 0 && (U({
      sortable: this,
      name: "update",
      toEl: N,
      originalEvent: e
    }), U({
      sortable: this,
      name: "sort",
      toEl: N,
      originalEvent: e
    })), y.active && ((Y == null || Y === -1) && (Y = Ee, fe = so), U({
      sortable: this,
      name: "end",
      toEl: N,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    q("nulling", this), j = p = N = v = Oe = k = Po = he = Te = J = Xe = Y = fe = Ee = so = ke = ao = z = _o = y.dragged = y.ghost = y.clone = y.active = null, No.forEach(function(e) {
      e.checked = !0;
    }), No.length = Ko = Qo = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        p && (this._onDragOver(e), due(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], t, n = this.el.children, r = 0, s = n.length, c = this.options; r < s; r++)
      t = n[r], Z(t, c.draggable, this.el, !1) && e.push(t.getAttribute(c.dataIdAttr) || hue(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var n = {}, r = this.el;
    this.toArray().forEach(function(s, c) {
      var a = r.children[c];
      Z(a, this.options.draggable, r, !1) && (n[s] = a);
    }, this), t && this.captureAnimationState(), e.forEach(function(s) {
      n[s] && (r.removeChild(n[s]), r.appendChild(n[s]));
    }), t && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, t) {
    return Z(e, t || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, t) {
    var n = this.options;
    if (t === void 0)
      return n[e];
    var r = fo.modifyOption(this, e, t);
    typeof r < "u" ? n[e] = r : n[e] = t, e === "group" && dr(n);
  },
  /**
   * Destroy
   */
  destroy: function() {
    q("destroy", this);
    var e = this.el;
    e[V] = null, S(e, "mousedown", this._onTapStart), S(e, "touchstart", this._onTapStart), S(e, "pointerdown", this._onTapStart), this.nativeDraggable && (S(e, "dragover", this), S(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Io.splice(Io.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!he) {
      if (q("hideClone", this), y.eventCanceled)
        return;
      _(k, "display", "none"), this.options.removeCloneOnHide && k.parentNode && k.parentNode.removeChild(k), he = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (he) {
      if (q("showClone", this), y.eventCanceled)
        return;
      p.parentNode == j && !this.options.group.revertClone ? j.insertBefore(k, p) : Oe ? j.insertBefore(k, Oe) : j.appendChild(k), this.options.group.revertClone && this.animate(p, k), _(k, "display", ""), he = !1;
    }
  }
};
function due(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function vo(o, e, t, n, r, s, c, a) {
  var i, l = o[V], u = l.options.onMove, d;
  return window.CustomEvent && !le && !mo ? i = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (i = document.createEvent("Event"), i.initEvent("move", !0, !0)), i.to = e, i.from = o, i.dragged = t, i.draggedRect = n, i.related = r || e, i.relatedRect = s || x(e), i.willInsertAfter = a, i.originalEvent = c, o.dispatchEvent(i), u && (d = u.call(l, i, c)), d;
}
function Jo(o) {
  o.draggable = !1;
}
function uue() {
  it = !1;
}
function pue(o, e, t) {
  var n = x(He(t.el, 0, t.options, !0)), r = cr(t.el, t.options, v), s = 10;
  return e ? o.clientX < r.left - s || o.clientY < n.top && o.clientX < n.right : o.clientY < r.top - s || o.clientY < n.bottom && o.clientX < n.left;
}
function mue(o, e, t) {
  var n = x(Ot(t.el, t.options.draggable)), r = cr(t.el, t.options, v), s = 10;
  return e ? o.clientX > r.right + s || o.clientY > n.bottom && o.clientX > n.left : o.clientY > r.bottom + s || o.clientX > n.right && o.clientY > n.top;
}
function fue(o, e, t, n, r, s, c, a) {
  var i = n ? o.clientY : o.clientX, l = n ? t.height : t.width, u = n ? t.top : t.left, d = n ? t.bottom : t.right, f = !1;
  if (!c) {
    if (a && So < l * r) {
      if (!co && (ao === 1 ? i > u + l * s / 2 : i < d - l * s / 2) && (co = !0), co)
        f = !0;
      else if (ao === 1 ? i < u + So : i > d - So)
        return -ao;
    } else if (i > u + l * (1 - r) / 2 && i < d - l * (1 - r) / 2)
      return gue(e);
  }
  return f = f || c, f && (i < u + l * s / 2 || i > d - l * s / 2) ? i > u + l / 2 ? 1 : -1 : 0;
}
function gue(o) {
  return Q(p) < Q(o) ? 1 : -1;
}
function hue(o) {
  for (var e = o.tagName + o.className + o.src + o.href + o.textContent, t = e.length, n = 0; t--; )
    n += e.charCodeAt(t);
  return n.toString(36);
}
function _ue(o) {
  No.length = 0;
  for (var e = o.getElementsByTagName("input"), t = e.length; t--; ) {
    var n = e[t];
    n.checked && No.push(n);
  }
}
function Oo(o) {
  return setTimeout(o, 0);
}
function lt(o) {
  return clearTimeout(o);
}
Fo && O(document, "touchmove", function(o) {
  (y.active || De) && o.cancelable && o.preventDefault();
});
y.utils = {
  on: O,
  off: S,
  css: _,
  find: nr,
  is: function(e, t) {
    return !!Z(e, t, e, !1);
  },
  extend: Zde,
  throttle: rr,
  closest: Z,
  toggleClass: G,
  clone: ar,
  index: Q,
  nextTick: Oo,
  cancelNextTick: lt,
  detectDirection: lr,
  getChild: He,
  expando: V
};
y.get = function(o) {
  return o[V];
};
y.mount = function() {
  for (var o = arguments.length, e = new Array(o), t = 0; t < o; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(n) {
    if (!n.prototype || !n.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(n));
    n.utils && (y.utils = ne(ne({}, y.utils), n.utils)), fo.mount(n);
  });
};
y.create = function(o, e) {
  return new y(o, e);
};
y.version = Xde;
var E = [], Je, dt, ut = !1, Zo, et, Do, Ze;
function yue() {
  function o() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return o.prototype = {
    dragStarted: function(t) {
      var n = t.originalEvent;
      this.sortable.nativeDraggable ? O(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? O(document, "pointermove", this._handleFallbackAutoScroll) : n.touches ? O(document, "touchmove", this._handleFallbackAutoScroll) : O(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var n = t.originalEvent;
      !this.options.dragOverBubble && !n.rootEl && this._handleAutoScroll(n);
    },
    drop: function() {
      this.sortable.nativeDraggable ? S(document, "dragover", this._handleAutoScroll) : (S(document, "pointermove", this._handleFallbackAutoScroll), S(document, "touchmove", this._handleFallbackAutoScroll), S(document, "mousemove", this._handleFallbackAutoScroll)), _n(), wo(), eue();
    },
    nulling: function() {
      Do = dt = Je = ut = Ze = Zo = et = null, E.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, n) {
      var r = this, s = (t.touches ? t.touches[0] : t).clientX, c = (t.touches ? t.touches[0] : t).clientY, a = document.elementFromPoint(s, c);
      if (Do = t, n || this.options.forceAutoScrollFallback || mo || le || no) {
        ot(t, this.options, a, n);
        var i = _e(a, !0);
        ut && (!Ze || s !== Zo || c !== et) && (Ze && _n(), Ze = setInterval(function() {
          var l = _e(document.elementFromPoint(s, c), !0);
          l !== i && (i = l, wo()), ot(t, r.options, l, n);
        }, 10), Zo = s, et = c);
      } else {
        if (!this.options.bubbleScroll || _e(a, !0) === te()) {
          wo();
          return;
        }
        ot(t, this.options, _e(a, !1), !1);
      }
    }
  }, ce(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function wo() {
  E.forEach(function(o) {
    clearInterval(o.pid);
  }), E = [];
}
function _n() {
  clearInterval(Ze);
}
var ot = rr(function(o, e, t, n) {
  if (e.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, s = (o.touches ? o.touches[0] : o).clientY, c = e.scrollSensitivity, a = e.scrollSpeed, i = te(), l = !1, u;
    dt !== t && (dt = t, wo(), Je = e.scroll, u = e.scrollFn, Je === !0 && (Je = _e(t, !0)));
    var d = 0, f = Je;
    do {
      var h = f, m = x(h), g = m.top, $ = m.bottom, b = m.left, w = m.right, I = m.width, D = m.height, de = void 0, P = void 0, C = h.scrollWidth, R = h.scrollHeight, T = _(h), $e = h.scrollLeft, ue = h.scrollTop;
      h === i ? (de = I < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), P = D < R && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (de = I < C && (T.overflowX === "auto" || T.overflowX === "scroll"), P = D < R && (T.overflowY === "auto" || T.overflowY === "scroll"));
      var Ge = de && (Math.abs(w - r) <= c && $e + I < C) - (Math.abs(b - r) <= c && !!$e), se = P && (Math.abs($ - s) <= c && ue + D < R) - (Math.abs(g - s) <= c && !!ue);
      if (!E[d])
        for (var ve = 0; ve <= d; ve++)
          E[ve] || (E[ve] = {});
      (E[d].vx != Ge || E[d].vy != se || E[d].el !== h) && (E[d].el = h, E[d].vx = Ge, E[d].vy = se, clearInterval(E[d].pid), (Ge != 0 || se != 0) && (l = !0, E[d].pid = setInterval(function() {
        n && this.layer === 0 && y.active._onTouchMove(Do);
        var Ye = E[this.layer].vy ? E[this.layer].vy * a : 0, pe = E[this.layer].vx ? E[this.layer].vx * a : 0;
        typeof u == "function" && u.call(y.dragged.parentNode[V], pe, Ye, o, Do, E[this.layer].el) !== "continue" || sr(E[this.layer].el, pe, Ye);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (e.bubbleScroll && f !== i && (f = _e(f, !1)));
    ut = l;
  }
}, 30), mr = function(e) {
  var t = e.originalEvent, n = e.putSortable, r = e.dragEl, s = e.activeSortable, c = e.dispatchSortableEvent, a = e.hideGhostForTarget, i = e.unhideGhostForTarget;
  if (t) {
    var l = n || s;
    a();
    var u = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, d = document.elementFromPoint(u.clientX, u.clientY);
    i(), l && !l.el.contains(d) && (c("spill"), this.onSpill({
      dragEl: r,
      putSortable: n
    }));
  }
};
function wt() {
}
wt.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable;
    this.sortable.captureAnimationState(), n && n.captureAnimationState();
    var r = He(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
  },
  drop: mr
};
ce(wt, {
  pluginName: "revertOnSpill"
});
function Ct() {
}
Ct.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable, r = n || this.sortable;
    r.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), r.animateAll();
  },
  drop: mr
};
ce(Ct, {
  pluginName: "removeOnSpill"
});
y.mount(new yue());
y.mount(Ct, wt);
function cbe(o = {}) {
  const e = K(!1);
  let t = "";
  const n = K({}), r = Ve(), s = K(["fixed", "top_fixed", "right_fixed", "bottom_fixed", "left_fixed"]), c = $n(() => r.mode == "decorate" ? r : o.data);
  vn(
    () => [r.mode, r.pageMode, r.global, r.value],
    () => {
      r.mode !== "decorate" || !o.data || (o.data.pageMode = r.pageMode, o.data.global = r.global, o.data.value = r.value);
    },
    { deep: !0, immediate: !0 }
  );
  const a = (g, $) => {
    const b = {
      relative: !0,
      selected: r.currentIndex == g,
      decorate: r.mode == "decorate"
    };
    return b["top-fixed-" + r.topFixedStatus] = !0, $.position && s.value.indexOf($.position) != -1 ? b["ignore-draggable-element"] = !0 : b["draggable-element"] = !0, $.componentName == "ImageAds" && (b["overflow-hidden"] = !0), b;
  }, i = (g, $) => {
    if (r.mode == "decorate") {
      const b = document.getElementById("componentList");
      if (b && b.children.length && b.children[g]) {
        const w = b.children[g].offsetHeight;
        let I = 0;
        if ($.margin.top < 0 && (I = $.margin.top * 2 * -1, I > w))
          return !1;
      }
      return !0;
    }
    return !1;
  }, l = () => {
    Tne(() => {
      if (r.mode == "decorate") {
        const g = document.getElementById("componentList"), $ = y.create(g, {
          draggable: ".draggable-element",
          animation: 200,
          onEnd: (b) => {
            const w = r.value[b.oldIndex];
            r.value.splice(b.oldIndex, 1), r.value.splice(b.newIndex, 0, w), oe(() => {
              $.sort(Kle(r.value.length).map((I) => I.toString())), r.postMessage(b.newIndex, r.value[b.newIndex]);
            });
          }
        });
      }
      oe(() => {
        setTimeout(() => {
          if (t = uni.getStorageSync("componentsScrollValGroup"), t)
            for (const g in t)
              n.value[g] = -1;
          e.value = !0;
        }, 500);
      });
    });
  }, u = () => {
    oe(() => {
      let g = null;
      const $ = () => {
        var w;
        r.componentRefs = o.getFormRef().componentRefs, c.value.componentRefs = o.getFormRef().componentRefs, (w = o.getFormRef().componentRefs.topTabbarRef) == null || w.refresh(), g && clearInterval(g);
      }, b = () => {
        let w = !1;
        try {
          o.getFormRef(), w = !0;
        } catch {
          w = !1;
        }
        return w && $(), w;
      };
      b() || (g = setInterval(() => {
        b();
      }, 100));
    });
  }, d = () => {
  }, f = K(!1);
  return Xn(() => {
    f.value = !1;
  }), Jn(() => {
    f.value = !0, r.global.bottomTabBar.isShow = !1;
  }), {
    scrollV: K(),
    data: c,
    componentsScrollBool: n,
    showCopyright: e,
    placeholderEvent: d,
    refresh: u,
    isShowPlaceHolder: i,
    getComponentClass: a,
    onPageScroll: () => {
      Zn((g) => {
        if (t && !f.value)
          for (const $ in t)
            g.scrollTop <= 0 ? n.value[$] = -1 : g.scrollTop > t[$] ? n.value[$] = 1 : n.value[$] = 2;
      });
    },
    onMounted: l
  };
}
const fr = "Personal settings", gr = "Switch language", hr = "Version", _r = "Log out", $ue = {
  personalSettings: fr,
  switchLang: gr,
  version: hr,
  logout: _r
}, vue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $ue,
  logout: _r,
  personalSettings: fr,
  switchLang: gr,
  version: hr
}, Symbol.toStringTag, { value: "Module" })), yr = "文章详情", $r = "摘要", vr = "正在加载", bue = {
  detail: yr,
  abstract: $r,
  loadingText: vr
}, Tue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abstract: $r,
  default: bue,
  detail: yr,
  loadingText: vr
}, Symbol.toStringTag, { value: "Module" })), br = "文章列表", Tr = "~ 暂无数据 ~", Pr = "全部", Sr = "-- 到底了 --", Or = "请输入搜索关键词", Pue = {
  list: br,
  noData: Tr,
  all: Pr,
  end: Sr,
  searchPlaceholder: Or
}, Sue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: Pr,
  default: Pue,
  end: Sr,
  list: br,
  noData: Tr,
  searchPlaceholder: Or
}, Symbol.toStringTag, { value: "Module" })), wr = "绑定", Cr = "输入手机号动态码绑定", Mr = "绑定中", Ar = "一键绑定", jr = "手机号快捷登录", Oue = {
  bind: wr,
  bindMobileTip: Cr,
  binding: Mr,
  weixinUserAuth: Ar,
  mobileQuickLogin: jr
}, wue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: wr,
  bindMobileTip: Cr,
  binding: Mr,
  default: Oue,
  mobileQuickLogin: jr,
  weixinUserAuth: Ar
}, Symbol.toStringTag, { value: "Module" })), kr = "快捷登录/注册", Ir = "登录", Nr = "其他方式登录", Dr = "账号密码登录", Er = "手机号登录", xr = "其他手机号登录", Rr = "账号被锁定", Cue = {
  quickLoginOrLogout: kr,
  login: Ir,
  otherLogin: Nr,
  accountLogin: Dr,
  mobileLogin: Er,
  otherMobileLogin: xr,
  memberLock: Rr
}, Mue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Dr,
  default: Cue,
  login: Ir,
  memberLock: Rr,
  mobileLogin: Er,
  otherLogin: Nr,
  otherMobileLogin: xr,
  quickLoginOrLogout: kr
}, Symbol.toStringTag, { value: "Module" })), zr = "登录中", Fr = "请输入账号", Lr = "请输入密码", Hr = "忘记密码", Br = "还没有账号", Ur = "去注册", Wr = "登录代表您同意", qr = "请先阅读并同意协议", Vr = "请输入手机号", Gr = "快捷登录", Yr = "账号密码登录", Kr = "输入账号密码登录", Qr = "商家未开启账号密码登录", Xr = "手机号登录", Jr = "输入手机号验证码登录", Zr = "商家未开启手机号登录", Aue = {
  logining: zr,
  usernamePlaceholder: Fr,
  passwordPlaceholder: Lr,
  resetpwd: Hr,
  noAccount: Br,
  toRegister: Ur,
  agreeTips: Wr,
  isAgreeTips: qr,
  mobilePlaceholder: Vr,
  oneClicklogin: Gr,
  accountLogin: Yr,
  accountLoginTip: Kr,
  accountLoginError: Qr,
  mobileLogin: Xr,
  mobileLoginTip: Jr,
  mobileLoginError: Zr
}, jue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Yr,
  accountLoginError: Qr,
  accountLoginTip: Kr,
  agreeTips: Wr,
  default: Aue,
  isAgreeTips: qr,
  logining: zr,
  mobileLogin: Xr,
  mobileLoginError: Zr,
  mobileLoginTip: Jr,
  mobilePlaceholder: Vr,
  noAccount: Br,
  oneClicklogin: Gr,
  passwordPlaceholder: Lr,
  resetpwd: Hr,
  toRegister: Ur,
  usernamePlaceholder: Fr
}, Symbol.toStringTag, { value: "Module" })), es = "注册中", os = "输入账号密码注册", ts = "输入手机号验证码注册", ns = "请输入账号", rs = "账号不能是纯数字", ss = "请输入密码", as = "请再次确认密码", cs = "两次输入的密码不一致", is = "忘记密码", ls = "已有账号", ds = "去登录", us = "注册代表您同意", ps = "请先阅读并同意协议", ms = "账号注册", fs = "手机号注册", gs = "请输入手机号", kue = {
  registering: es,
  usernameRegisterTip: os,
  mobileRegisterTip: ts,
  usernamePlaceholder: ns,
  usernameTips: rs,
  passwordPlaceholder: ss,
  confirmPasswordPlaceholder: as,
  confirmPasswordError: cs,
  resetpwd: is,
  haveAccount: ls,
  toLogin: ds,
  registerAgreeTips: us,
  isAgreeTips: ps,
  usernameRegister: ms,
  mobileRegister: fs,
  mobilePlaceholder: gs
}, Iue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: cs,
  confirmPasswordPlaceholder: as,
  default: kue,
  haveAccount: ls,
  isAgreeTips: ps,
  mobilePlaceholder: gs,
  mobileRegister: fs,
  mobileRegisterTip: ts,
  passwordPlaceholder: ss,
  registerAgreeTips: us,
  registering: es,
  resetpwd: is,
  toLogin: ds,
  usernamePlaceholder: ns,
  usernameRegister: ms,
  usernameRegisterTip: os,
  usernameTips: rs
}, Symbol.toStringTag, { value: "Module" })), hs = "找回密码", _s = "输入手机号找回密码", ys = "请输入密码", $s = "请再次确认密码", vs = "两次输入的密码不一致", Nue = {
  findPassword: hs,
  findPasswordTip: _s,
  passwordPlaceholder: ys,
  confirmPasswordPlaceholder: $s,
  confirmPasswordError: vs
}, Due = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: vs,
  confirmPasswordPlaceholder: $s,
  default: Nue,
  findPassword: hs,
  findPasswordTip: _s,
  passwordPlaceholder: ys
}, Symbol.toStringTag, { value: "Module" })), bs = "实付金额", Ts = "帮", Ps = "付款", Ss = "帮付订单信息", Os = "共", ws = "种商品", Cs = "该订单已完成", Ms = "该订单已关闭", As = "找朋友帮忙付", Eue = {
  payMoney: bs,
  help: Ts,
  pay: Ps,
  helpPayInfo: Ss,
  common: Os,
  goods: ws,
  finish: Cs,
  close: Ms,
  payGenerously: As
}, xue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: Ms,
  common: Os,
  default: Eue,
  finish: Cs,
  goods: ws,
  help: Ts,
  helpPayInfo: Ss,
  pay: Ps,
  payGenerously: As,
  payMoney: bs
}, Symbol.toStringTag, { value: "Module" })), js = "实付金额", ks = "帮付订单信息", Is = "共", Ns = "种商品", Ds = "该订单已完成", Es = "该订单已关闭", xs = "找朋友帮忙付", Rue = {
  payMoney: js,
  friendPayOrderInfo: ks,
  common: Is,
  goods: Ns,
  finish: Ds,
  close: Es,
  friendPay: xs
}, zue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: Es,
  common: Is,
  default: Rue,
  finish: Ds,
  friendPay: xs,
  friendPayOrderInfo: ks,
  goods: Ns,
  payMoney: js
}, Symbol.toStringTag, { value: "Module" })), Rs = "开发环境配置", zs = "API请求地址", Fs = "图片服务器地址", Ls = "站点ID（VITE_SITE_ID）", Hs = "请输入站点ID", Bs = "请输入数字", Us = "最大不能超过", Fue = {
  developTitle: Rs,
  baseUrl: zs,
  imgUrl: Fs,
  siteId: Ls,
  siteIdPlaceholder: Hs,
  pleaseEnterNumber: Bs,
  maximumCannotExceed: Us
}, Lue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  baseUrl: zs,
  default: Fue,
  developTitle: Rs,
  imgUrl: Fs,
  maximumCannotExceed: Us,
  pleaseEnterNumber: Bs,
  siteId: Ls,
  siteIdPlaceholder: Hs
}, Symbol.toStringTag, { value: "Module" })), Ws = "支付宝收款码", qs = "微信收款码", Vs = "添加银行卡", Gs = "添加微信收款码", Ys = "添加支付宝收款码", Ks = "尾号", Qs = "银行卡", Hue = {
  alipayAccountNo: Ws,
  wechatCode: qs,
  addBankCard: Vs,
  addWechatCode: Gs,
  addAlipayAccount: Ys,
  endNumber: Ks,
  bankCard: Qs
}, Bue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: Ys,
  addBankCard: Vs,
  addWechatCode: Gs,
  alipayAccountNo: Ws,
  bankCard: Qs,
  default: Hue,
  endNumber: Ks,
  wechatCode: qs
}, Symbol.toStringTag, { value: "Module" })), Xs = "添加会员账户", Js = "编辑会员账户", Zs = "添加银行卡", ea = "请添加持卡人本人的银行卡", oa = "编辑银行卡", ta = "请编辑持卡人本人的银行卡", na = "添加支付宝收款码", ra = "请添加已实名的支付宝账号", sa = "编辑支付宝收款码", aa = "请编辑已实名的支付宝账号", ca = "添加微信收款码", ia = "请添加已实名的微信账号", la = "编辑微信收款码", da = "请编辑已实名的微信账号", ua = "持卡人姓名", pa = "请输入持卡人姓名", ma = "银行名称", fa = "请输入银行名称", ga = "银行卡号", ha = "请输入银行卡号", _a = "真实姓名", ya = "请输入真实姓名", $a = "支付宝账号", va = "请输入支付宝账号", ba = "微信账号", Ta = "请输入微信账号", Pa = "请上传支付宝收款码", Sa = "请上传微信收款码", Oa = "确定要删除该账号吗？", Uue = {
  addAccountTitle: Xs,
  editAccountTitle: Js,
  addBankCard: Zs,
  addBankCardTips: ea,
  editBankCard: oa,
  editBankCardTips: ta,
  addAlipayAccount: na,
  addAlipayAccountTips: ra,
  editAlipayAccount: sa,
  editAlipayAccountTips: aa,
  addWechatCodeAccount: ca,
  addWechatCodeAccountTips: ia,
  editWechatCodeAccount: la,
  editWechatCodeAccountTips: da,
  bankRealname: ua,
  bankRealnamePlaceholder: pa,
  bankName: ma,
  bankNamePlaceholder: fa,
  bankAccountNo: ga,
  bankAccountNoPlaceholder: ha,
  alipayRealname: _a,
  alipayRealnamePlaceholder: ya,
  alipayAccountNo: $a,
  alipayAccountNoPlaceholder: va,
  wechatCodeAccountNo: ba,
  wechatCodeAccountNoPlaceholder: Ta,
  alipayAccountImgPlaceholder: Pa,
  wechatCodeAccountImgPlaceholder: Sa,
  deleteConfirm: Oa
}, Wue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAccountTitle: Xs,
  addAlipayAccount: na,
  addAlipayAccountTips: ra,
  addBankCard: Zs,
  addBankCardTips: ea,
  addWechatCodeAccount: ca,
  addWechatCodeAccountTips: ia,
  alipayAccountImgPlaceholder: Pa,
  alipayAccountNo: $a,
  alipayAccountNoPlaceholder: va,
  alipayRealname: _a,
  alipayRealnamePlaceholder: ya,
  bankAccountNo: ga,
  bankAccountNoPlaceholder: ha,
  bankName: ma,
  bankNamePlaceholder: fa,
  bankRealname: ua,
  bankRealnamePlaceholder: pa,
  default: Uue,
  deleteConfirm: Oa,
  editAccountTitle: Js,
  editAlipayAccount: sa,
  editAlipayAccountTips: aa,
  editBankCard: oa,
  editBankCardTips: ta,
  editWechatCodeAccount: la,
  editWechatCodeAccountTips: da,
  wechatCodeAccountImgPlaceholder: Sa,
  wechatCodeAccountNo: ba,
  wechatCodeAccountNoPlaceholder: Ta
}, Symbol.toStringTag, { value: "Module" })), wa = "快递地址", Ca = "同城配送地址", Ma = "新建收货地址", que = {
  address: wa,
  locationAddress: Ca,
  createAddress: Ma,
  default: "默认"
}, Vue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: wa,
  createAddress: Ma,
  default: que,
  locationAddress: Ca
}, Symbol.toStringTag, { value: "Module" })), Aa = "收货人", ja = "请输入收货人姓名", ka = "手机号码", Ia = "请输入手机号码", Na = "选择地区", Da = "请选择地区", Ea = "详细地址", xa = "请填写详细地址", Ra = "设为默认地址", za = "请选择地址", Gue = {
  name: Aa,
  namePlaceholder: ja,
  mobile: ka,
  mobilePlaceholder: Ia,
  selectArea: Na,
  selectAreaPlaceholder: Da,
  address: Ea,
  addressPlaceholder: xa,
  defaultAddress: Ra,
  selectAddressPlaceholder: za
}, Yue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Ea,
  addressPlaceholder: xa,
  default: Gue,
  defaultAddress: Ra,
  mobile: ka,
  mobilePlaceholder: Ia,
  name: Aa,
  namePlaceholder: ja,
  selectAddressPlaceholder: za,
  selectArea: Na,
  selectAreaPlaceholder: Da
}, Symbol.toStringTag, { value: "Module" })), Fa = "立即提现", La = "余额明细", Ha = "提现到", Ba = "请选择提现方式", Ua = "微信默认钱包", Wa = "提现金额", qa = "可提现余额", Va = "全部提现", Ga = "最小提现金额为", Ya = "手续费为", Ka = "提现记录", Qa = "提现至微信零钱", Xa = "提现至微信零钱", Ja = "提现至支付宝", Za = "请先添加支付宝账号", ec = "提现至银行卡", oc = "请先添加银行卡", tc = "提现至微信", nc = "请先添加微信号", rc = "支付宝账号", sc = "微信号", ac = "储蓄卡", cc = "异常操作", ic = "没有可用的提现方式", lc = "请输入提现金额", dc = "提现金额格式错误", uc = "提现金额超出可提现金额", pc = "提现金额小于最低提现金额", mc = "更换", fc = "提现设置未开启", gc = "添加", Kue = {
  cashOutNow: Fa,
  balanceDetail: La,
  cashOutTo: Ha,
  cashOutTypePlaceholder: Ba,
  wechatpay: Ua,
  cashOutMoneyTip: Wa,
  money: qa,
  allTx: Va,
  minWithdrawal: Ga,
  commissionTo: Ya,
  cashOutList: Ka,
  cashOutToWechat: Qa,
  cashOutToWechatTips: Xa,
  cashOutToAlipay: Ja,
  cashOutToAlipayTips: Za,
  cashOutToBank: ec,
  cashOutToBankTips: oc,
  cashOutToWechatCode: tc,
  cashOutToWechatCodeTips: nc,
  alipayAccountNo: rc,
  wechatCodeAccountNo: sc,
  debitCard: ac,
  abnormalOperation: cc,
  noAvailableCashOutType: ic,
  applyMoneyPlaceholder: lc,
  moneyformatError: dc,
  applyMoneyExceed: uc,
  applyMoneyBelow: pc,
  replace: mc,
  isOpenApply: fc,
  toAdd: gc
}, Que = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOperation: cc,
  alipayAccountNo: rc,
  allTx: Va,
  applyMoneyBelow: pc,
  applyMoneyExceed: uc,
  applyMoneyPlaceholder: lc,
  balanceDetail: La,
  cashOutList: Ka,
  cashOutMoneyTip: Wa,
  cashOutNow: Fa,
  cashOutTo: Ha,
  cashOutToAlipay: Ja,
  cashOutToAlipayTips: Za,
  cashOutToBank: ec,
  cashOutToBankTips: oc,
  cashOutToWechat: Qa,
  cashOutToWechatCode: tc,
  cashOutToWechatCodeTips: nc,
  cashOutToWechatTips: Xa,
  cashOutTypePlaceholder: Ba,
  commissionTo: Ya,
  debitCard: ac,
  default: Kue,
  isOpenApply: fc,
  minWithdrawal: Ga,
  money: qa,
  moneyformatError: dc,
  noAvailableCashOutType: ic,
  replace: mc,
  toAdd: gc,
  wechatCodeAccountNo: sc,
  wechatpay: Ua
}, Symbol.toStringTag, { value: "Module" })), hc = "我的余额", _c = "充值", yc = "提现", $c = "余额明细", vc = "账户余额 (元)", bc = "余额 (元)", Tc = "可提现余额 (元)", Pc = "可用余额", Sc = "元", Oc = "充值记录", Xue = {
  balanceInfo: hc,
  recharge: _c,
  cashOut: yc,
  balanceDetail: $c,
  accountBalance: vc,
  balance: bc,
  money: Tc,
  availableBalance: Pc,
  yuan: Sc,
  rechargeRecord: Oc
}, Jue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: vc,
  availableBalance: Pc,
  balance: bc,
  balanceDetail: $c,
  balanceInfo: hc,
  cashOut: yc,
  default: Xue,
  money: Tc,
  recharge: _c,
  rechargeRecord: Oc,
  yuan: Sc
}, Symbol.toStringTag, { value: "Module" })), wc = "申请时间", Cc = "审核中，请耐心等待...", Mc = "转账中，请耐心等待...", Ac = "已转账，请及时查收", jc = "提现已取消", kc = "余额记录", Ic = "佣金记录", Nc = "暂无提现记录", Dc = "暂无佣金记录", Ec = "提现方式：", Zue = {
  applyTime: wc,
  toBeReviewed: Cc,
  toBeTransfer: Mc,
  transfer: Ac,
  cancelApply: jc,
  balanceDetail: kc,
  commissionDetail: Ic,
  emptyTip: Nc,
  commissemptyTip: Dc,
  rechargeType: Ec
}, epe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: wc,
  balanceDetail: kc,
  cancelApply: jc,
  commissemptyTip: Dc,
  commissionDetail: Ic,
  default: Zue,
  emptyTip: Nc,
  rechargeType: Ec,
  toBeReviewed: Cc,
  toBeTransfer: Mc,
  transfer: Ac
}, Symbol.toStringTag, { value: "Module" })), xc = "当前状态", Rc = "提现单号", zc = "手续费", Fc = "申请时间", Lc = "审核时间", Hc = "银行名称", Bc = "收款账号", Uc = "拒绝理由", Wc = "转账方式", qc = "转账时间", Vc = "付款凭证", Gc = "转账补充说明", Yc = "真实姓名", Kc = "持卡人姓名", Qc = "收款码", Xc = "收款方信息", Jc = "转账信息", Zc = "收款方昵称", ei = "收款方头像", oi = "转账单号", ti = "提现", ni = "取消提现", ope = {
  statusName: xc,
  cashOutNo: Rc,
  serviceMoney: zc,
  createTime: Fc,
  auditTime: Lc,
  transferBank: Hc,
  transferAccount: Bc,
  refuseReason: Uc,
  transferTypeName: Wc,
  transferTime: qc,
  transferVoucher: Vc,
  transferRemark: Gc,
  realname: Yc,
  bankRealname: Kc,
  transferCode: Qc,
  proceedsInfo: Xc,
  transferInfo: Jc,
  transferNickname: Zc,
  transferImg: ei,
  transferNo: oi,
  cashOutNow: ti,
  cashOutCancel: ni
}, tpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: Lc,
  bankRealname: Kc,
  cashOutCancel: ni,
  cashOutNo: Rc,
  cashOutNow: ti,
  createTime: Fc,
  default: ope,
  proceedsInfo: Xc,
  realname: Yc,
  refuseReason: Uc,
  serviceMoney: zc,
  statusName: xc,
  transferAccount: Bc,
  transferBank: Hc,
  transferCode: Qc,
  transferImg: ei,
  transferInfo: Jc,
  transferNickname: Zc,
  transferNo: oi,
  transferRemark: Gc,
  transferTime: qc,
  transferTypeName: Wc,
  transferVoucher: Vc
}, Symbol.toStringTag, { value: "Module" })), ri = "充值", si = "提现", ai = "提现", ci = "佣金明细", ii = "当前佣金（元）", li = "累计佣金（元）", di = "提现中佣金（元）", ui = "可用佣金", pi = "元", mi = "我的佣金", npe = {
  recharge: ri,
  cashOut: si,
  transferMoney: ai,
  commissionDetail: ci,
  accountCommission: ii,
  commission: li,
  money: di,
  availableCommission: ui,
  yuan: pi,
  commissionInfo: mi
}, rpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountCommission: ii,
  availableCommission: ui,
  cashOut: si,
  commission: li,
  commissionDetail: ci,
  commissionInfo: mi,
  default: npe,
  money: di,
  recharge: ri,
  transferMoney: ai,
  yuan: pi
}, Symbol.toStringTag, { value: "Module" })), fi = "余额明细", gi = "佣金明细", hi = "暂无余额明细", _i = "暂无提现明细", yi = "暂无佣金明细", spe = {
  balanceDetail: fi,
  commissionDetail: gi,
  balanceEmptyTip: hi,
  moneyEmptyTip: _i,
  commissionEmptyTip: yi
}, ape = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  balanceDetail: fi,
  balanceEmptyTip: hi,
  commissionDetail: gi,
  commissionEmptyTip: yi,
  default: spe,
  moneyEmptyTip: _i
}, Symbol.toStringTag, { value: "Module" })), $i = "收货人", vi = "请输入收货人姓名", bi = "手机号码", Ti = "请输入手机号码", Pi = "收货地址", Si = "选择地址", Oi = "请选择地址", wi = "楼号门牌", Ci = "详细地址如 1单元101", Mi = "请填写门牌号", Ai = "设为默认地址", ji = "修改", cpe = {
  name: $i,
  namePlaceholder: vi,
  mobile: bi,
  mobilePlaceholder: Ti,
  deliveryAddress: Pi,
  selectAddress: Si,
  selectAddressPlaceholder: Oi,
  address: wi,
  addressPlaceholder: Ci,
  addressError: Mi,
  defaultAddress: Ai,
  update: ji
}, ipe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: wi,
  addressError: Mi,
  addressPlaceholder: Ci,
  default: cpe,
  defaultAddress: Ai,
  deliveryAddress: Pi,
  mobile: bi,
  mobilePlaceholder: Ti,
  name: $i,
  namePlaceholder: vi,
  selectAddress: Si,
  selectAddressPlaceholder: Oi,
  update: ji
}, Symbol.toStringTag, { value: "Module" })), ki = "昵称", Ii = "性别", Ni = "手机号", Di = "生日", Ei = "未知", xi = "头像", Ri = "更换头像", zi = "修改昵称", Fi = "男", Li = "女", lpe = {
  nickname: ki,
  sex: Ii,
  mobile: Ni,
  birthday: Di,
  unknown: Ei,
  headimg: xi,
  updateHeadimg: Ri,
  updateNickname: zi,
  man: Fi,
  woman: Li
}, dpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  birthday: Di,
  default: lpe,
  headimg: xi,
  man: Fi,
  mobile: Ni,
  nickname: ki,
  sex: Ii,
  unknown: Ei,
  updateHeadimg: Ri,
  updateNickname: zi,
  woman: Li
}, Symbol.toStringTag, { value: "Module" })), Hi = "充值记录", Bi = "暂无充值记录", upe = {
  rechargeRecord: Hi,
  emptyTip: Bi
}, ppe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: upe,
  emptyTip: Bi,
  rechargeRecord: Hi
}, Symbol.toStringTag, { value: "Module" })), Ui = "订单编号", Wi = "创建时间", mpe = {
  orderNo: Ui,
  createTime: Wi
}, fpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: Wi,
  default: mpe,
  orderNo: Ui
}, Symbol.toStringTag, { value: "Module" })), qi = "充值", Vi = "提现", Gi = "余额明细", Yi = "账户余额（元）", Ki = "余额（元）", Qi = "可提现余额（元）", Xi = "可用余额", Ji = "元", gpe = {
  recharge: qi,
  cashOut: Vi,
  balanceDetail: Gi,
  accountBalance: Yi,
  balance: Ki,
  money: Qi,
  availableBalance: Xi,
  yuan: Ji
}, hpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: Yi,
  availableBalance: Xi,
  balance: Ki,
  balanceDetail: Gi,
  cashOut: Vi,
  default: gpe,
  money: Qi,
  recharge: qi,
  yuan: Ji
}, Symbol.toStringTag, { value: "Module" })), Zi = "个人设置", el = "切换语言", ol = "版本号", tl = "退出登录", _pe = {
  personalSettings: Zi,
  switchLang: el,
  version: ol,
  logout: tl
}, ype = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _pe,
  logout: tl,
  personalSettings: Zi,
  switchLang: el,
  version: ol
}, Symbol.toStringTag, { value: "Module" })), nl = "文章详情", rl = "摘要", sl = "正在加载", $pe = {
  detail: nl,
  abstract: rl,
  loadingText: sl
}, vpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abstract: rl,
  default: $pe,
  detail: nl,
  loadingText: sl
}, Symbol.toStringTag, { value: "Module" })), al = "文章列表", cl = "~ 暂无数据 ~", il = "全部", ll = "-- 到底了 --", dl = "请输入搜索关键词", bpe = {
  list: al,
  noData: cl,
  all: il,
  end: ll,
  searchPlaceholder: dl
}, Tpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: il,
  default: bpe,
  end: ll,
  list: al,
  noData: cl,
  searchPlaceholder: dl
}, Symbol.toStringTag, { value: "Module" })), Ppe = {}, Spe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ppe
}, Symbol.toStringTag, { value: "Module" })), ul = "发起助力", pl = "最高省", Ope = {
  fqzl: ul,
  zgs: pl
}, wpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ope,
  fqzl: ul,
  zgs: pl
}, Symbol.toStringTag, { value: "Module" })), ml = "订单号", fl = "实付款", gl = "关闭订单", hl = "确认收货", _l = "去支付", yl = "详情", $l = "支付流水号", vl = "创建时间", bl = "配送方式", Tl = "支付方式", Pl = "支付时间", Sl = "商品金额", Ol = "配送费用", wl = "实付金额", Cl = "评价", Ml = "查看评价", Al = "首页", jl = "优惠金额", kl = "查看物流", Il = "复制", Nl = "详细信息", Dl = "的帮付", El = "用户备注", Cpe = {
  orderNo: ml,
  actualPayment: fl,
  orderClose: gl,
  orderFinish: hl,
  topay: _l,
  orderDetail: yl,
  orderTradeNo: $l,
  createTime: vl,
  deliveryType: bl,
  payTypeName: Tl,
  payTime: Pl,
  goodsMoney: Sl,
  deliveryMoney: Ol,
  orderMoney: wl,
  evaluate: Cl,
  selectedEvaluate: Ml,
  index: Al,
  discountMoney: jl,
  logisticsTracking: kl,
  copy: Il,
  detailedInformation: Nl,
  helpPay: Dl,
  memberRemark: El
}, Mpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: fl,
  copy: Il,
  createTime: vl,
  default: Cpe,
  deliveryMoney: Ol,
  deliveryType: bl,
  detailedInformation: Nl,
  discountMoney: jl,
  evaluate: Cl,
  goodsMoney: Sl,
  helpPay: Dl,
  index: Al,
  logisticsTracking: kl,
  memberRemark: El,
  orderClose: gl,
  orderDetail: yl,
  orderFinish: hl,
  orderMoney: wl,
  orderNo: ml,
  orderTradeNo: $l,
  payTime: Pl,
  payTypeName: Tl,
  selectedEvaluate: Ml,
  topay: _l
}, Symbol.toStringTag, { value: "Module" })), xl = "暂无收货地址，请先创建地址", Rl = "新增收货地址", zl = "选择地址", Fl = "评价", Ll = "元", Hl = "待支付", Bl = "剩余时间", Ul = "含物流运输服务", Wl = "查看评价", ql = "关闭订单", Vl = "确认收货", Gl = "支付", Yl = "配送方式", Kl = "下单时间", Ape = {
  emptyAddress: xl,
  addAddress: Rl,
  selectAddress: zl,
  evaluate: Fl,
  money: Ll,
  pendingPayment: Hl,
  pendingPaymentTips: Bl,
  service: Ul,
  selectedEvaluate: Wl,
  orderClose: ql,
  orderFinish: Vl,
  topay: Gl,
  deliveryType: Yl,
  createTime: Kl
}, jpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: Rl,
  createTime: Kl,
  default: Ape,
  deliveryType: Yl,
  emptyAddress: xl,
  evaluate: Fl,
  money: Ll,
  orderClose: ql,
  orderFinish: Vl,
  pendingPayment: Hl,
  pendingPaymentTips: Bl,
  selectAddress: zl,
  selectedEvaluate: Wl,
  service: Ul,
  topay: Gl
}, Symbol.toStringTag, { value: "Module" })), Ql = "订单号", Xl = "实付款", Jl = "关闭订单", Zl = "确认收货", ed = "支付", od = "详情", td = "评价", nd = "暂无订单", rd = "暂无收货地址，请先创建地址", sd = "换一换", ad = "活动说明", cd = "该商品起购", id = "件", ld = "该商品每人限购", dd = "该商品单次限购", ud = "商品库存不足", pd = "件，超过按", md = "购买", fd = "限购", gd = "一键购买", hd = "我知道了", kpe = {
  orderNo: Ql,
  actualPayment: Xl,
  orderClose: Jl,
  orderFinish: Zl,
  topay: ed,
  orderDetail: od,
  evaluate: td,
  orderListempty: nd,
  emptyAddress: rd,
  changeIt: sd,
  activityInstructions: ad,
  goodsLimitThree: cd,
  piece: id,
  goodsLimitTwo: ld,
  goodsLimitOne: dd,
  stockNotEnough: ud,
  limitPlaceholderTwo: pd,
  limitPlaceholderThree: md,
  limitPlaceholderOne: fd,
  buyWithOneClick: gd,
  know: hd
}, Ipe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: ad,
  actualPayment: Xl,
  buyWithOneClick: gd,
  changeIt: sd,
  default: kpe,
  emptyAddress: rd,
  evaluate: td,
  goodsLimitOne: dd,
  goodsLimitThree: cd,
  goodsLimitTwo: ld,
  know: hd,
  limitPlaceholderOne: fd,
  limitPlaceholderThree: md,
  limitPlaceholderTwo: pd,
  orderClose: Jl,
  orderDetail: od,
  orderFinish: Zl,
  orderListempty: nd,
  orderNo: Ql,
  piece: id,
  stockNotEnough: ud,
  topay: ed
}, Symbol.toStringTag, { value: "Module" })), _d = "退货详情", yd = "极速退款成功", $d = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", vd = "退款方式", bd = "退款金额", Td = "退款原因", Pd = "拒绝原因", Sd = "退款编号", Od = "申请时间", wd = "退款说明", Cd = "协商记录", Md = "查看", Ad = "取消退款", jd = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", kd = "首页", Npe = {
  refundDetail: _d,
  fastRefundSuccessful: yd,
  refundInfo: $d,
  refundType: vd,
  refundMoney: bd,
  refundCause: Td,
  reasonRefusal: Pd,
  refundNo: Sd,
  createTime: Od,
  createExplain: wd,
  record: Cd,
  check: Md,
  refundApply: Ad,
  cancelRefundContent: jd,
  index: kd
}, Dpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: jd,
  check: Md,
  createExplain: wd,
  createTime: Od,
  default: Npe,
  fastRefundSuccessful: yd,
  index: kd,
  reasonRefusal: Pd,
  record: Cd,
  refundApply: Ad,
  refundCause: Td,
  refundDetail: _d,
  refundInfo: $d,
  refundMoney: bd,
  refundNo: Sd,
  refundType: vd
}, Symbol.toStringTag, { value: "Module" })), Id = "退款编号", Nd = "退款金额", Dd = "取消退款", Ed = "退款进度", xd = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", Epe = {
  refundNo: Id,
  refundMoney: Nd,
  refundApply: Dd,
  refund: Ed,
  cancelRefundContent: xd
}, xpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: xd,
  default: Epe,
  refund: Ed,
  refundApply: Dd,
  refundMoney: Nd,
  refundNo: Id
}, Symbol.toStringTag, { value: "Module" })), Rd = "去抢购", zd = "没有更多内容啦~", Fd = "已售", Ld = "订单号", Hd = "实付款", Bd = "详情", Rpe = {
  reserveBtn: Rd,
  noHomeAddress: zd,
  soldOut: Fd,
  orderNo: Ld,
  actualPayment: Hd,
  orderDetail: Bd
}, zpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: Hd,
  default: Rpe,
  noHomeAddress: zd,
  orderDetail: Bd,
  orderNo: Ld,
  reserveBtn: Rd,
  soldOut: Fd
}, Symbol.toStringTag, { value: "Module" })), Ud = "登录中", Wd = "请输入账号", qd = "请输入密码", Vd = "忘记密码", Gd = "还没有账号", Yd = "去注册", Kd = "登录代表您同意", Qd = "请先阅读并同意协议", Xd = "请输入手机号", Jd = "快捷登录", Zd = "账号密码登录", eu = "输入账号密码登录", ou = "商家未开启账号密码登录", tu = "手机号登录", nu = "输入手机号验证码登录", ru = "商家未开启手机号登录", Fpe = {
  logining: Ud,
  usernamePlaceholder: Wd,
  passwordPlaceholder: qd,
  resetpwd: Vd,
  noAccount: Gd,
  toRegister: Yd,
  agreeTips: Kd,
  isAgreeTips: Qd,
  mobilePlaceholder: Xd,
  oneClicklogin: Jd,
  accountLogin: Zd,
  accountLoginTip: eu,
  accountLoginError: ou,
  mobileLogin: tu,
  mobileLoginTip: nu,
  mobileLoginError: ru
}, Lpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Zd,
  accountLoginError: ou,
  accountLoginTip: eu,
  agreeTips: Kd,
  default: Fpe,
  isAgreeTips: Qd,
  logining: Ud,
  mobileLogin: tu,
  mobileLoginError: ru,
  mobileLoginTip: nu,
  mobilePlaceholder: Xd,
  noAccount: Gd,
  oneClicklogin: Jd,
  passwordPlaceholder: qd,
  resetpwd: Vd,
  toRegister: Yd,
  usernamePlaceholder: Wd
}, Symbol.toStringTag, { value: "Module" })), su = "注册中", au = "输入账号密码注册", cu = "输入手机号验证码注册", iu = "请输入账号", lu = "账号不能是纯数字", du = "请输入密码", uu = "请再次确认密码", pu = "两次输入的密码不一致", mu = "忘记密码", fu = "已有账号", gu = "去登录", hu = "注册代表您同意", _u = "请先阅读并同意协议", yu = "账号注册", $u = "手机号注册", vu = "请输入手机号", Hpe = {
  registering: su,
  usernameRegisterTip: au,
  mobileRegisterTip: cu,
  usernamePlaceholder: iu,
  usernameTips: lu,
  passwordPlaceholder: du,
  confirmPasswordPlaceholder: uu,
  confirmPasswordError: pu,
  resetpwd: mu,
  haveAccount: fu,
  toLogin: gu,
  registerAgreeTips: hu,
  isAgreeTips: _u,
  usernameRegister: yu,
  mobileRegister: $u,
  mobilePlaceholder: vu
}, Bpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: pu,
  confirmPasswordPlaceholder: uu,
  default: Hpe,
  haveAccount: fu,
  isAgreeTips: _u,
  mobilePlaceholder: vu,
  mobileRegister: $u,
  mobileRegisterTip: cu,
  passwordPlaceholder: du,
  registerAgreeTips: hu,
  registering: su,
  resetpwd: mu,
  toLogin: gu,
  usernamePlaceholder: iu,
  usernameRegister: yu,
  usernameRegisterTip: au,
  usernameTips: lu
}, Symbol.toStringTag, { value: "Module" })), bu = "新任务", Tu = "筛选", Pu = "刷新", Su = "重置", Ou = "收入", wu = "服务类型", Cu = "服务距离", Mu = "确定", Au = "我要抢单", Upe = {
  newJob: bu,
  sort: Tu,
  calcation: Pu,
  reset: Su,
  money: Ou,
  serviceType: wu,
  serviceDistance: Cu,
  confrim: Mu,
  getOrder: Au
}, Wpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: Pu,
  confrim: Mu,
  default: Upe,
  getOrder: Au,
  money: Ou,
  newJob: bu,
  reset: Su,
  serviceDistance: Cu,
  serviceType: wu,
  sort: Tu
}, Symbol.toStringTag, { value: "Module" })), ju = "申请时间", ku = "审核中，请耐心等待...", Iu = "转账中，请耐心等待...", Nu = "已转账，请及时查收", Du = "提现已取消", Eu = "余额记录", xu = "佣金记录", Ru = "暂无提现记录", zu = "暂无佣金记录", Fu = "提现方式：", qpe = {
  applyTime: ju,
  toBeReviewed: ku,
  toBeTransfer: Iu,
  transfer: Nu,
  cancelApply: Du,
  balanceDetail: Eu,
  commissionDetail: xu,
  emptyTip: Ru,
  commissemptyTip: zu,
  rechargeType: Fu
}, Vpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: ju,
  balanceDetail: Eu,
  cancelApply: Du,
  commissemptyTip: zu,
  commissionDetail: xu,
  default: qpe,
  emptyTip: Ru,
  rechargeType: Fu,
  toBeReviewed: ku,
  toBeTransfer: Iu,
  transfer: Nu
}, Symbol.toStringTag, { value: "Module" })), Lu = "当前状态", Hu = "提现单号", Bu = "手续费", Uu = "申请时间", Wu = "审核时间", qu = "银行名称", Vu = "收款账号", Gu = "拒绝理由", Yu = "转账方式", Ku = "转账时间", Qu = "付款凭证", Xu = "转账补充说明", Ju = "真实姓名", Zu = "持卡人姓名", ep = "收款码", op = "收款方信息", tp = "转账信息", np = "收款方昵称", rp = "收款方头像", sp = "转账单号", ap = "提现", cp = "取消提现", Gpe = {
  statusName: Lu,
  cashOutNo: Hu,
  serviceMoney: Bu,
  createTime: Uu,
  auditTime: Wu,
  transferBank: qu,
  transferAccount: Vu,
  refuseReason: Gu,
  transferTypeName: Yu,
  transferTime: Ku,
  transferVoucher: Qu,
  transferRemark: Xu,
  realname: Ju,
  bankRealname: Zu,
  transferCode: ep,
  proceedsInfo: op,
  transferInfo: tp,
  transferNickname: np,
  transferImg: rp,
  transferNo: sp,
  cashOutNow: ap,
  cashOutCancel: cp
}, Ype = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: Wu,
  bankRealname: Zu,
  cashOutCancel: cp,
  cashOutNo: Hu,
  cashOutNow: ap,
  createTime: Uu,
  default: Gpe,
  proceedsInfo: op,
  realname: Ju,
  refuseReason: Gu,
  serviceMoney: Bu,
  statusName: Lu,
  transferAccount: Vu,
  transferBank: qu,
  transferCode: ep,
  transferImg: rp,
  transferInfo: tp,
  transferNickname: np,
  transferNo: sp,
  transferRemark: Xu,
  transferTime: Ku,
  transferTypeName: Yu,
  transferVoucher: Qu
}, Symbol.toStringTag, { value: "Module" })), Kpe = {}, Qpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kpe
}, Symbol.toStringTag, { value: "Module" })), ip = "反馈标题", lp = "反馈内容", dp = "上传图片（选填）", up = "提交反馈", pp = "请输入反馈标题", mp = "请详细描述您遇到的问题或建议", fp = "反馈内容请至少输入10个字符", gp = "反馈提交成功，感谢您的建议", hp = "反馈提交失败", _p = "网络错误，请稍后重试", Xpe = {
  feedbackTitle: ip,
  feedbackContent: lp,
  uploadImage: dp,
  submitFeedback: up,
  pleaseInputFeedbackTitle: pp,
  pleaseDescribeIssue: mp,
  feedbackContentMinLength: fp,
  feedbackSubmitSuccess: gp,
  feedbackSubmitFail: hp,
  networkError: _p
}, Jpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xpe,
  feedbackContent: lp,
  feedbackContentMinLength: fp,
  feedbackSubmitFail: hp,
  feedbackSubmitSuccess: gp,
  feedbackTitle: ip,
  networkError: _p,
  pleaseDescribeIssue: mp,
  pleaseInputFeedbackTitle: pp,
  submitFeedback: up,
  uploadImage: dp
}, Symbol.toStringTag, { value: "Module" })), yp = "帮助详情", $p = "加载中...", vp = "浏览次数", bp = "更新时间", Tp = "暂无数据", Pp = "缺少帮助文档ID", Sp = "网络错误，请稍后重试", Zpe = {
  helpDetail: yp,
  loading: $p,
  viewsCount: vp,
  updateTime: bp,
  noData: Tp,
  missingId: Pp,
  networkError: Sp
}, eme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zpe,
  helpDetail: yp,
  loading: $p,
  missingId: Pp,
  networkError: Sp,
  noData: Tp,
  updateTime: bp,
  viewsCount: vp
}, Symbol.toStringTag, { value: "Module" })), Op = "帮助中心", wp = "操作答疑", Cp = "操作步骤", Mp = "管理平台", Ap = "佣金分成与支付", jp = "常见问题", kp = "问题分类", Ip = "联系客服", Np = "没有更多内容啦~", ome = {
  helpCenter: Op,
  operationFAQ: wp,
  operationSteps: Cp,
  managementPlatform: Mp,
  commissionPayment: Ap,
  commonProblems: jp,
  problemCategories: kp,
  contactService: Ip,
  noMoreContent: Np
}, tme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  commissionPayment: Ap,
  commonProblems: jp,
  contactService: Ip,
  default: ome,
  helpCenter: Op,
  managementPlatform: Mp,
  noMoreContent: Np,
  operationFAQ: wp,
  operationSteps: Cp,
  problemCategories: kp
}, Symbol.toStringTag, { value: "Module" })), Dp = "机构名称", Ep = "今日收入(元)", xp = "我的账户", Rp = "今日完成单量(单)", zp = "订单统计", Fp = "违规申诉", Lp = "我的评价", Hp = "所属机构", Bp = "机构资料", Up = "评价管理", Wp = "机构入驻", qp = "服务管理", Vp = "联系客服", Gp = "消息通知", Yp = "帮助中心", Kp = "设置", Qp = "排班管理", Xp = "请假", Jp = "服务分析", Zp = "服务数据", em = "设置", om = "工作必备", tm = "客户服务", nm = "个人资料", rm = "区域排名", nme = {
  storeName: Dp,
  todayMoney: Ep,
  myAccount: xp,
  orderFinshNumber: Rp,
  orderNumber: zp,
  ViolationAppeal: Fp,
  MyReview: Lp,
  store: Hp,
  storeInfo: Bp,
  evaluteSet: Up,
  registerStore: Wp,
  servicesSet: qp,
  callConcat: Vp,
  messageCenter: Gp,
  helpCenter: Yp,
  setInfo: Kp,
  workTime: Qp,
  levalWork: Xp,
  ServiceAnalysis: Jp,
  servicesData: Zp,
  set: em,
  workTools: om,
  kefuServices: tm,
  memberInfo: nm,
  areaData: rm
}, rme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MyReview: Lp,
  ServiceAnalysis: Jp,
  ViolationAppeal: Fp,
  areaData: rm,
  callConcat: Vp,
  default: nme,
  evaluteSet: Up,
  helpCenter: Yp,
  kefuServices: tm,
  levalWork: Xp,
  memberInfo: nm,
  messageCenter: Gp,
  myAccount: xp,
  orderFinshNumber: Rp,
  orderNumber: zp,
  registerStore: Wp,
  servicesData: Zp,
  servicesSet: qp,
  set: em,
  setInfo: Kp,
  store: Hp,
  storeInfo: Bp,
  storeName: Dp,
  todayMoney: Ep,
  workTime: Qp,
  workTools: om
}, Symbol.toStringTag, { value: "Module" })), sm = "机构资料", am = "基本信息", cm = "机构名称", im = "机构人数", lm = "联系方式", dm = "修改", um = "负责人", pm = "联系电话", mm = "地址信息", fm = "地图加载中...", gm = "认证状态", hm = "营业执照", _m = "身份认证", ym = "地址认证", $m = "已完成", vm = "未完成", bm = "编辑联系方式", Tm = "取消", Pm = "确定", Sm = "修改成功", Om = "修改失败", wm = "获取数据失败", Cm = "请输入负责人姓名", Mm = "请输入联系电话", Am = "负责人不能为空", jm = "负责人姓名长度在2-20个字符之间", km = "联系电话不能为空", Im = "请输入正确的手机号码", sme = {
  pageTitle: sm,
  basicInfo: am,
  storeName: cm,
  storeStaff: im,
  contactInfo: lm,
  edit: dm,
  manager: um,
  contactPhone: pm,
  addressInfo: mm,
  mapLoading: fm,
  authenticationStatus: gm,
  businessLicense: hm,
  idAuthentication: _m,
  addressAuthentication: ym,
  completed: $m,
  uncompleted: vm,
  editContactTitle: bm,
  cancel: Tm,
  confirm: Pm,
  editSuccess: Sm,
  editFailed: Om,
  fetchFailed: wm,
  inputManagerPlaceholder: Cm,
  inputPhonePlaceholder: Mm,
  managerRequired: Am,
  managerLength: jm,
  phoneRequired: km,
  phoneFormat: Im
}, ame = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addressAuthentication: ym,
  addressInfo: mm,
  authenticationStatus: gm,
  basicInfo: am,
  businessLicense: hm,
  cancel: Tm,
  completed: $m,
  confirm: Pm,
  contactInfo: lm,
  contactPhone: pm,
  default: sme,
  edit: dm,
  editContactTitle: bm,
  editFailed: Om,
  editSuccess: Sm,
  fetchFailed: wm,
  idAuthentication: _m,
  inputManagerPlaceholder: Cm,
  inputPhonePlaceholder: Mm,
  manager: um,
  managerLength: jm,
  managerRequired: Am,
  mapLoading: fm,
  pageTitle: sm,
  phoneFormat: Im,
  phoneRequired: km,
  storeName: cm,
  storeStaff: im,
  uncompleted: vm
}, Symbol.toStringTag, { value: "Module" })), Nm = "切换机构", Dm = "筛选", Em = "排序", xm = "营业中", Rm = "已停业", zm = "当前机构", Fm = "待分配", Lm = "超时", Hm = "售后", Bm = "今日单量", Um = "月收入", Wm = "确认选择", qm = "暂无机构数据", Vm = "机构切换成功", Gm = "机构切换失败", Ym = "获取机构列表失败", Km = "机构名称示意文字内容展示", Qm = "山西省太原市小店区平阳路时代广场宇信感应产业大厦8层814", Xm = "05:00-22:00", cme = {
  pageTitle: Nm,
  filter: Dm,
  sort: Em,
  open: xm,
  closed: Rm,
  defaultStore: zm,
  waitService: Fm,
  timeout: Lm,
  afterSale: Hm,
  todayOrders: Bm,
  monthIncome: Um,
  confirmSelection: Wm,
  noStoreData: qm,
  storeSwitchSuccess: Vm,
  storeSwitchFailed: Gm,
  getStoreListFailed: Ym,
  storeNamePlaceholder: Km,
  addressPlaceholder: Qm,
  businessHoursPlaceholder: Xm
}, ime = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addressPlaceholder: Qm,
  afterSale: Hm,
  businessHoursPlaceholder: Xm,
  closed: Rm,
  confirmSelection: Wm,
  default: cme,
  defaultStore: zm,
  filter: Dm,
  getStoreListFailed: Ym,
  monthIncome: Um,
  noStoreData: qm,
  open: xm,
  pageTitle: Nm,
  sort: Em,
  storeNamePlaceholder: Km,
  storeSwitchFailed: Gm,
  storeSwitchSuccess: Vm,
  timeout: Lm,
  todayOrders: Bm,
  waitService: Fm
}, Symbol.toStringTag, { value: "Module" })), Jm = "订单", Zm = "下单", ef = "接单", of = "开始", tf = "完成", nf = "已支付", rf = "未支付", sf = "查看退款", af = "申请退款", cf = "去支付", lf = "查看", df = "服务人员", uf = "待派单", pf = "联系电话", mf = "服务码", ff = "注:服务人员上门时需提供", gf = "订单编号", hf = "交易流水号", _f = "创建时间", yf = "上门时间", $f = "买家留言", vf = "支付方式", bf = "支付时间", Tf = "项目金额", Pf = "实付", Sf = "首页", Of = "刷新", wf = "客服", Cf = "收藏", Mf = "没有更多内容啦~", Af = "的帮付", jf = "导航", kf = "优惠金额", If = "上门费用", Nf = "单", Df = "订单未开始服务", Ef = "服务人员已确定出发", xf = "服务人员已打卡拍照", Rf = "查看打卡照片", zf = "服务时长总计", Ff = "预", Lf = "您有", Hf = "个订单已超时", Bf = "个订单即将超时,请尽快处理!", Uf = "服务项目", Wf = "备注：", qf = "订单收入", Vf = "附加服务", Gf = "服务费", Yf = "附加服务费用", Kf = "服务费是师傅完成服务后的收入", Qf = "附加服务费用是指新增附加服务的收入", Xf = "其他信息", Jf = "复制", Zf = "未获取到订单信息", eg = "打卡照片", og = "加载失败", tg = "天", ng = "地图打开成功", rg = "打开地图失败，请检查是否安装地图应用", sg = "提示", ag = "您确定要取消该订单吗？", cg = "取消成功", ig = "取消失败", lg = "您确定要删除该订单吗？", dg = "删除成功", ug = "删除失败", pg = "待服务", mg = "服务中", fg = "已完成", gg = "异常订单", hg = "服务费是师傅完成服务后的收入", lme = {
  order: Jm,
  placeOrder: Zm,
  takeOrders: ef,
  start: of,
  finish: tf,
  havePaid: nf,
  notPaid: rf,
  viewRefund: sf,
  applyRefund: af,
  goToPay: cf,
  show: lf,
  servicePersonal: df,
  orderToBeSent: uf,
  contactNumber: pf,
  serviceCode: mf,
  explain: ff,
  onOrder: gf,
  transactionNumber: hf,
  createTime: _f,
  reserveServiceTime: yf,
  remark: $f,
  modePayment: vf,
  payTime: bf,
  goodsMoney: Tf,
  realMoney: Pf,
  index: Sf,
  refresh: Of,
  service: wf,
  collect: Cf,
  nothingMore: Mf,
  helpPay: Af,
  Navigation: jf,
  couponMoney: kf,
  doorMonrey: If,
  orderUnit: Nf,
  orderNotStarted: Df,
  servicePersonDeparted: Ef,
  servicePersonCheckedIn: xf,
  viewCheckInPhotos: Rf,
  totalServiceDuration: zf,
  pre: Ff,
  youHave: Lf,
  ordersOverdue: Hf,
  ordersAboutToOverdue: Bf,
  serviceItems: Uf,
  remarkPrefix: Wf,
  orderIncome: qf,
  additionalService: Vf,
  serviceFee: Gf,
  additionalServiceFee: Yf,
  serviceFeeDesc: Kf,
  additionalServiceFeeDesc: Qf,
  otherInformation: Xf,
  copy: Jf,
  noOrderInfo: Zf,
  checkInPhotos: eg,
  loadFailed: og,
  day: tg,
  mapOpenedSuccessfully: ng,
  mapOpenFailed: rg,
  prompt: sg,
  confirmCancelOrder: ag,
  cancelSuccess: cg,
  cancelFailed: ig,
  confirmDeleteOrder: lg,
  deleteSuccess: dg,
  deleteFailed: ug,
  waitingService: pg,
  inService: mg,
  completed: fg,
  abnormalOrder: gg,
  serviceFeeDescription: hg
}, dme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: jf,
  abnormalOrder: gg,
  additionalService: Vf,
  additionalServiceFee: Yf,
  additionalServiceFeeDesc: Qf,
  applyRefund: af,
  cancelFailed: ig,
  cancelSuccess: cg,
  checkInPhotos: eg,
  collect: Cf,
  completed: fg,
  confirmCancelOrder: ag,
  confirmDeleteOrder: lg,
  contactNumber: pf,
  copy: Jf,
  couponMoney: kf,
  createTime: _f,
  day: tg,
  default: lme,
  deleteFailed: ug,
  deleteSuccess: dg,
  doorMonrey: If,
  explain: ff,
  finish: tf,
  goToPay: cf,
  goodsMoney: Tf,
  havePaid: nf,
  helpPay: Af,
  inService: mg,
  index: Sf,
  loadFailed: og,
  mapOpenFailed: rg,
  mapOpenedSuccessfully: ng,
  modePayment: vf,
  noOrderInfo: Zf,
  notPaid: rf,
  nothingMore: Mf,
  onOrder: gf,
  order: Jm,
  orderIncome: qf,
  orderNotStarted: Df,
  orderToBeSent: uf,
  orderUnit: Nf,
  ordersAboutToOverdue: Bf,
  ordersOverdue: Hf,
  otherInformation: Xf,
  payTime: bf,
  placeOrder: Zm,
  pre: Ff,
  prompt: sg,
  realMoney: Pf,
  refresh: Of,
  remark: $f,
  remarkPrefix: Wf,
  reserveServiceTime: yf,
  service: wf,
  serviceCode: mf,
  serviceFee: Gf,
  serviceFeeDesc: Kf,
  serviceFeeDescription: hg,
  serviceItems: Uf,
  servicePersonCheckedIn: xf,
  servicePersonDeparted: Ef,
  servicePersonal: df,
  show: lf,
  start: of,
  takeOrders: ef,
  totalServiceDuration: zf,
  transactionNumber: hf,
  viewCheckInPhotos: Rf,
  viewRefund: sf,
  waitingService: pg,
  youHave: Lf
}, Symbol.toStringTag, { value: "Module" })), _g = "订单", yg = "下单", $g = "接单", vg = "开始", bg = "完成", Tg = "已支付", Pg = "未支付", Sg = "查看退款", Og = "申请退款", wg = "去支付", Cg = "查看", Mg = "服务人员", Ag = "待派单", jg = "联系电话", kg = "服务码", Ig = "注:服务人员上门时需提供", Ng = "订单编号", Dg = "交易流水号", Eg = "创建时间", xg = "上门时间", Rg = "买家留言", zg = "支付方式", Fg = "支付时间", Lg = "项目金额", Hg = "实付", Bg = "首页", Ug = "刷新", Wg = "客服", qg = "收藏", Vg = "没有更多内容啦~", Gg = "的帮付", Yg = "导航", Kg = "优惠金额", Qg = "上门费用", Xg = "单", Jg = "订单未开始服务", Zg = "服务人员已确定出发", eh = "服务人员已打卡拍照", oh = "查看打卡照片", th = "服务时长总计", nh = "预", rh = "您有", sh = "个订单已超时", ah = "个订单即将超时,请尽快处理!", ch = "服务项目", ih = "备注：", lh = "订单收入", dh = "附加服务", uh = "服务费", ph = "附加服务费用", mh = "服务费是师傅完成服务后的收入", fh = "附加服务费用是指新增附加服务的收入", gh = "其他信息", hh = "复制", _h = "未获取到订单信息", yh = "打卡照片", $h = "加载失败", vh = "天", bh = "地图打开成功", Th = "打开地图失败，请检查是否安装地图应用", Ph = "提示", Sh = "您确定要取消该订单吗？", Oh = "取消成功", wh = "取消失败", Ch = "您确定要删除该订单吗？", Mh = "删除成功", Ah = "删除失败", jh = "待服务", kh = "服务中", Ih = "已完成", Nh = "异常订单", Dh = "服务费是师傅完成服务后的收入", ume = {
  order: _g,
  placeOrder: yg,
  takeOrders: $g,
  start: vg,
  finish: bg,
  havePaid: Tg,
  notPaid: Pg,
  viewRefund: Sg,
  applyRefund: Og,
  goToPay: wg,
  show: Cg,
  servicePersonal: Mg,
  orderToBeSent: Ag,
  contactNumber: jg,
  serviceCode: kg,
  explain: Ig,
  onOrder: Ng,
  transactionNumber: Dg,
  createTime: Eg,
  reserveServiceTime: xg,
  remark: Rg,
  modePayment: zg,
  payTime: Fg,
  goodsMoney: Lg,
  realMoney: Hg,
  index: Bg,
  refresh: Ug,
  service: Wg,
  collect: qg,
  nothingMore: Vg,
  helpPay: Gg,
  Navigation: Yg,
  couponMoney: Kg,
  doorMonrey: Qg,
  orderUnit: Xg,
  orderNotStarted: Jg,
  servicePersonDeparted: Zg,
  servicePersonCheckedIn: eh,
  viewCheckInPhotos: oh,
  totalServiceDuration: th,
  pre: nh,
  youHave: rh,
  ordersOverdue: sh,
  ordersAboutToOverdue: ah,
  serviceItems: ch,
  remarkPrefix: ih,
  orderIncome: lh,
  additionalService: dh,
  serviceFee: uh,
  additionalServiceFee: ph,
  serviceFeeDesc: mh,
  additionalServiceFeeDesc: fh,
  otherInformation: gh,
  copy: hh,
  noOrderInfo: _h,
  checkInPhotos: yh,
  loadFailed: $h,
  day: vh,
  mapOpenedSuccessfully: bh,
  mapOpenFailed: Th,
  prompt: Ph,
  confirmCancelOrder: Sh,
  cancelSuccess: Oh,
  cancelFailed: wh,
  confirmDeleteOrder: Ch,
  deleteSuccess: Mh,
  deleteFailed: Ah,
  waitingService: jh,
  inService: kh,
  completed: Ih,
  abnormalOrder: Nh,
  serviceFeeDescription: Dh
}, pme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: Yg,
  abnormalOrder: Nh,
  additionalService: dh,
  additionalServiceFee: ph,
  additionalServiceFeeDesc: fh,
  applyRefund: Og,
  cancelFailed: wh,
  cancelSuccess: Oh,
  checkInPhotos: yh,
  collect: qg,
  completed: Ih,
  confirmCancelOrder: Sh,
  confirmDeleteOrder: Ch,
  contactNumber: jg,
  copy: hh,
  couponMoney: Kg,
  createTime: Eg,
  day: vh,
  default: ume,
  deleteFailed: Ah,
  deleteSuccess: Mh,
  doorMonrey: Qg,
  explain: Ig,
  finish: bg,
  goToPay: wg,
  goodsMoney: Lg,
  havePaid: Tg,
  helpPay: Gg,
  inService: kh,
  index: Bg,
  loadFailed: $h,
  mapOpenFailed: Th,
  mapOpenedSuccessfully: bh,
  modePayment: zg,
  noOrderInfo: _h,
  notPaid: Pg,
  nothingMore: Vg,
  onOrder: Ng,
  order: _g,
  orderIncome: lh,
  orderNotStarted: Jg,
  orderToBeSent: Ag,
  orderUnit: Xg,
  ordersAboutToOverdue: ah,
  ordersOverdue: sh,
  otherInformation: gh,
  payTime: Fg,
  placeOrder: yg,
  pre: nh,
  prompt: Ph,
  realMoney: Hg,
  refresh: Ug,
  remark: Rg,
  remarkPrefix: ih,
  reserveServiceTime: xg,
  service: Wg,
  serviceCode: kg,
  serviceFee: uh,
  serviceFeeDesc: mh,
  serviceFeeDescription: Dh,
  serviceItems: ch,
  servicePersonCheckedIn: eh,
  servicePersonDeparted: Zg,
  servicePersonal: Mg,
  show: Cg,
  start: vg,
  takeOrders: $g,
  totalServiceDuration: th,
  transactionNumber: Dg,
  viewCheckInPhotos: oh,
  viewRefund: Sg,
  waitingService: jh,
  youHave: rh
}, Symbol.toStringTag, { value: "Module" })), Eh = "机构首页", xh = "请输入搜索关键词", Rh = "筛选", zh = "家政保洁", Fh = "保姆月嫂", Lh = "家电维修", Hh = "家电清洗", Bh = "管道疏通", Uh = "从业", Wh = "年", qh = "服务", Vh = "单", Gh = "工作中", Yh = "休息中", Kh = "去派单", Qh = "排班管理", Xh = "打电话", Jh = "任务", Zh = "机构", e_ = "技工", o_ = "我的", t_ = "师傅派单", mme = {
  pageTitle: Eh,
  searchPlaceholder: xh,
  filter: Rh,
  housekeeping: zh,
  nanny: Fh,
  applianceRepair: Lh,
  applianceCleaning: Hh,
  pipeDredging: Bh,
  yearsOfExperience: Uh,
  years: Wh,
  serviceOrders: qh,
  orders: Vh,
  working: Gh,
  resting: Yh,
  assignOrder: Kh,
  scheduleManagement: Qh,
  makeCall: Xh,
  tasks: Jh,
  store: Zh,
  technicians: e_,
  my: o_,
  pageHeaderTitle: t_
}, fme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applianceCleaning: Hh,
  applianceRepair: Lh,
  assignOrder: Kh,
  default: mme,
  filter: Rh,
  housekeeping: zh,
  makeCall: Xh,
  my: o_,
  nanny: Fh,
  orders: Vh,
  pageHeaderTitle: t_,
  pageTitle: Eh,
  pipeDredging: Bh,
  resting: Yh,
  scheduleManagement: Qh,
  searchPlaceholder: xh,
  serviceOrders: qh,
  store: Zh,
  tasks: Jh,
  technicians: e_,
  working: Gh,
  years: Wh,
  yearsOfExperience: Uh
}, Symbol.toStringTag, { value: "Module" })), n_ = "订单", r_ = "下单", s_ = "接单", a_ = "开始", c_ = "完成", i_ = "已支付", l_ = "未支付", d_ = "查看退款", u_ = "申请退款", p_ = "去支付", m_ = "查看", f_ = "服务人员", g_ = "待派单", h_ = "联系电话", __ = "服务码", y_ = "注:服务人员上门时需提供", $_ = "订单编号", v_ = "交易流水号", b_ = "创建时间", T_ = "上门时间", P_ = "买家留言", S_ = "支付方式", O_ = "支付时间", w_ = "项目金额", C_ = "实付", M_ = "首页", A_ = "刷新", j_ = "客服", k_ = "收藏", I_ = "没有更多内容啦~", N_ = "的帮付", D_ = "导航", E_ = "优惠金额", x_ = "上门费用", R_ = "单", z_ = "订单未开始服务", F_ = "服务人员已确定出发", L_ = "服务人员已打卡拍照", H_ = "查看打卡照片", B_ = "服务时长总计", U_ = "预", W_ = "您有", q_ = "个订单已超时", V_ = "个订单即将超时,请尽快处理!", G_ = "服务项目", Y_ = "备注：", K_ = "订单收入", Q_ = "附加服务", X_ = "服务费", J_ = "附加服务费用", Z_ = "师傅完成服务后的预估收入", ey = "附加服务费用是指新增附加服务的收入", oy = "其他信息", ty = "复制", ny = "未获取到订单信息", ry = "打卡照片", sy = "加载失败", ay = "天", cy = "地图打开成功", iy = "打开地图失败，请检查是否安装地图应用", ly = "提示", dy = "您确定要取消该订单吗？", uy = "取消成功", py = "取消失败", my = "您确定要删除该订单吗？", fy = "删除成功", gy = "删除失败", hy = "待服务", _y = "服务中", yy = "已完成", $y = "异常订单", vy = "服务费是师傅完成服务后的收入", gme = {
  order: n_,
  placeOrder: r_,
  takeOrders: s_,
  start: a_,
  finish: c_,
  havePaid: i_,
  notPaid: l_,
  viewRefund: d_,
  applyRefund: u_,
  goToPay: p_,
  show: m_,
  servicePersonal: f_,
  orderToBeSent: g_,
  contactNumber: h_,
  serviceCode: __,
  explain: y_,
  onOrder: $_,
  transactionNumber: v_,
  createTime: b_,
  reserveServiceTime: T_,
  remark: P_,
  modePayment: S_,
  payTime: O_,
  goodsMoney: w_,
  realMoney: C_,
  index: M_,
  refresh: A_,
  service: j_,
  collect: k_,
  nothingMore: I_,
  helpPay: N_,
  Navigation: D_,
  couponMoney: E_,
  doorMonrey: x_,
  orderUnit: R_,
  orderNotStarted: z_,
  servicePersonDeparted: F_,
  servicePersonCheckedIn: L_,
  viewCheckInPhotos: H_,
  totalServiceDuration: B_,
  pre: U_,
  youHave: W_,
  ordersOverdue: q_,
  ordersAboutToOverdue: V_,
  serviceItems: G_,
  remarkPrefix: Y_,
  orderIncome: K_,
  additionalService: Q_,
  serviceFee: X_,
  additionalServiceFee: J_,
  serviceFeeDesc: Z_,
  additionalServiceFeeDesc: ey,
  otherInformation: oy,
  copy: ty,
  noOrderInfo: ny,
  checkInPhotos: ry,
  loadFailed: sy,
  day: ay,
  mapOpenedSuccessfully: cy,
  mapOpenFailed: iy,
  prompt: ly,
  confirmCancelOrder: dy,
  cancelSuccess: uy,
  cancelFailed: py,
  confirmDeleteOrder: my,
  deleteSuccess: fy,
  deleteFailed: gy,
  waitingService: hy,
  inService: _y,
  completed: yy,
  abnormalOrder: $y,
  serviceFeeDescription: vy
}, hme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: D_,
  abnormalOrder: $y,
  additionalService: Q_,
  additionalServiceFee: J_,
  additionalServiceFeeDesc: ey,
  applyRefund: u_,
  cancelFailed: py,
  cancelSuccess: uy,
  checkInPhotos: ry,
  collect: k_,
  completed: yy,
  confirmCancelOrder: dy,
  confirmDeleteOrder: my,
  contactNumber: h_,
  copy: ty,
  couponMoney: E_,
  createTime: b_,
  day: ay,
  default: gme,
  deleteFailed: gy,
  deleteSuccess: fy,
  doorMonrey: x_,
  explain: y_,
  finish: c_,
  goToPay: p_,
  goodsMoney: w_,
  havePaid: i_,
  helpPay: N_,
  inService: _y,
  index: M_,
  loadFailed: sy,
  mapOpenFailed: iy,
  mapOpenedSuccessfully: cy,
  modePayment: S_,
  noOrderInfo: ny,
  notPaid: l_,
  nothingMore: I_,
  onOrder: $_,
  order: n_,
  orderIncome: K_,
  orderNotStarted: z_,
  orderToBeSent: g_,
  orderUnit: R_,
  ordersAboutToOverdue: V_,
  ordersOverdue: q_,
  otherInformation: oy,
  payTime: O_,
  placeOrder: r_,
  pre: U_,
  prompt: ly,
  realMoney: C_,
  refresh: A_,
  remark: P_,
  remarkPrefix: Y_,
  reserveServiceTime: T_,
  service: j_,
  serviceCode: __,
  serviceFee: X_,
  serviceFeeDesc: Z_,
  serviceFeeDescription: vy,
  serviceItems: G_,
  servicePersonCheckedIn: L_,
  servicePersonDeparted: F_,
  servicePersonal: f_,
  show: m_,
  start: a_,
  takeOrders: s_,
  totalServiceDuration: B_,
  transactionNumber: v_,
  viewCheckInPhotos: H_,
  viewRefund: d_,
  waitingService: hy,
  youHave: W_
}, Symbol.toStringTag, { value: "Module" })), by = "新任务", Ty = "筛选", Py = "刷新", Sy = "重置", Oy = "收入", wy = "服务类型", Cy = "服务距离", My = "确定", Ay = "我要抢单", _me = {
  newJob: by,
  sort: Ty,
  calcation: Py,
  reset: Sy,
  money: Oy,
  serviceType: wy,
  serviceDistance: Cy,
  confrim: My,
  getOrder: Ay
}, yme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: Py,
  confrim: My,
  default: _me,
  getOrder: Ay,
  money: Oy,
  newJob: by,
  reset: Sy,
  serviceDistance: Cy,
  serviceType: wy,
  sort: Ty
}, Symbol.toStringTag, { value: "Module" })), jy = "新任务", ky = "筛选", Iy = "刷新", Ny = "重置", Dy = "收入", Ey = "服务类型", xy = "服务距离", Ry = "确定", zy = "我要抢单", $me = {
  newJob: jy,
  sort: ky,
  calcation: Iy,
  reset: Ny,
  money: Dy,
  serviceType: Ey,
  serviceDistance: xy,
  confrim: Ry,
  getOrder: zy
}, vme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: Iy,
  confrim: Ry,
  default: $me,
  getOrder: zy,
  money: Dy,
  newJob: jy,
  reset: Ny,
  serviceDistance: xy,
  serviceType: Ey,
  sort: ky
}, Symbol.toStringTag, { value: "Module" })), Fy = "账户明细", Ly = "收支统计", Hy = "收入", By = "支出", Uy = "暂无账单数据", Wy = "刷新", qy = "全部类型", Vy = "全部日期", Gy = "到账情况", bme = {
  accountDetails: Fy,
  receiptStatistics: Ly,
  income: Hy,
  expense: By,
  noBillData: Uy,
  refresh: Wy,
  allTypes: qy,
  allDates: Vy,
  paymentStatus: Gy
}, Tme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountDetails: Fy,
  allDates: Vy,
  allTypes: qy,
  default: bme,
  expense: By,
  income: Hy,
  noBillData: Uy,
  paymentStatus: Gy,
  receiptStatistics: Ly,
  refresh: Wy
}, Symbol.toStringTag, { value: "Module" })), Yy = "账户余额", Ky = "元", Qy = "提现", Xy = "账户明细", Jy = "收支统计", Zy = "银行卡", e$ = "今日账单", o$ = "数据说明", t$ = "此处为预计收入，如数据延迟，不影响最终结算，可稍后查询", n$ = "预计收入", r$ = "预计支出", s$ = "暂无账单数据", a$ = "刷新", c$ = "获取日账单统计失败", i$ = "获取机构数据失败", Pme = {
  accountBalance: Yy,
  yuan: Ky,
  withdraw: Qy,
  accountDetails: Xy,
  receiptStatistics: Jy,
  bankCards: Zy,
  todayBill: e$,
  dataDescription: o$,
  dataDelayTip: t$,
  expectedIncome: n$,
  expectedExpense: r$,
  noBillData: s$,
  refresh: a$,
  fetchDayBillStatFailed: c$,
  fetchStoreDataFailed: i$
}, Sme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: Yy,
  accountDetails: Xy,
  bankCards: Zy,
  dataDelayTip: t$,
  dataDescription: o$,
  default: Pme,
  expectedExpense: r$,
  expectedIncome: n$,
  fetchDayBillStatFailed: c$,
  fetchStoreDataFailed: i$,
  noBillData: s$,
  receiptStatistics: Jy,
  refresh: a$,
  todayBill: e$,
  withdraw: Qy,
  yuan: Ky
}, Symbol.toStringTag, { value: "Module" })), l$ = "订单统计", d$ = "今日订单", u$ = "月订单", p$ = "待服务", m$ = "待验收", f$ = "已完成订单", g$ = "已关闭", h$ = "退款", _$ = "订单明细", y$ = "已完成", $$ = "订单号", v$ = "暂无账单数据", b$ = "", Ome = {
  title: l$,
  todayOrders: d$,
  monthOrders: u$,
  pendingService: p$,
  pendingAcceptance: m$,
  completedOrders: f$,
  cancelled: g$,
  refund: h$,
  orderDetails: _$,
  completed: y$,
  orderNumber: $$,
  noBillData: v$,
  refresh: b$
}, wme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelled: g$,
  completed: y$,
  completedOrders: f$,
  default: Ome,
  monthOrders: u$,
  noBillData: v$,
  orderDetails: _$,
  orderNumber: $$,
  pendingAcceptance: m$,
  pendingService: p$,
  refresh: b$,
  refund: h$,
  title: l$,
  todayOrders: d$
}, Symbol.toStringTag, { value: "Module" })), T$ = "账户明细", P$ = "收支统计", S$ = "日统计", O$ = "月统计", w$ = "单位：千元", C$ = "收入", M$ = "支出", A$ = "今日收入", j$ = "今日支出", Cme = {
  accountDetails: T$,
  receiptStatistics: P$,
  dailySummary: S$,
  monthlySummary: O$,
  unitThousand: w$,
  income: C$,
  expense: M$,
  todayIncome: A$,
  todayExpense: j$
}, Mme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountDetails: T$,
  dailySummary: S$,
  default: Cme,
  expense: M$,
  income: C$,
  monthlySummary: O$,
  receiptStatistics: P$,
  todayExpense: j$,
  todayIncome: A$,
  unitThousand: w$
}, Symbol.toStringTag, { value: "Module" })), k$ = "提现", I$ = "可提现余额", N$ = "全部提现", D$ = "手续费", E$ = "请输入提现金额", x$ = "最小提现金额：", R$ = "，手续费为", z$ = "到账方式", F$ = "提现至微信零钱", L$ = "快速到账，无需审核", H$ = "提现至微信", B$ = "提现到微信号", U$ = "请先添加微信号", W$ = "提现至支付宝", q$ = "提现到支付宝账号", V$ = "请先添加支付宝账号", G$ = "提现至银行卡", Y$ = "提现到{bankName}储蓄卡", K$ = "请先添加银行卡", Q$ = "添加", X$ = "立即提现", J$ = "提现记录", Z$ = "提现设置未开启", ev = "没有可用的提现方式", ov = "提现金额格式错误", tv = "提现金额超出可提现金额", nv = "提现金额小于最低提现金额", rv = "异常操作", Ame = {
  title: k$,
  availableBalance: I$,
  allMoney: N$,
  fee: D$,
  enterAmount: E$,
  minAmount: x$,
  feeRate: R$,
  paymentMethod: z$,
  wechatPay: F$,
  wechatPayDesc: L$,
  wechatCode: H$,
  wechatCodeDesc: B$,
  addWechat: U$,
  alipay: W$,
  alipayDesc: q$,
  addAlipay: V$,
  bank: G$,
  bankDesc: Y$,
  addBank: K$,
  add: Q$,
  submit: X$,
  record: J$,
  notOpen: Z$,
  noMethod: ev,
  invalidFormat: ov,
  exceedLimit: tv,
  belowMin: nv,
  abnormal: rv
}, jme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormal: rv,
  add: Q$,
  addAlipay: V$,
  addBank: K$,
  addWechat: U$,
  alipay: W$,
  alipayDesc: q$,
  allMoney: N$,
  availableBalance: I$,
  bank: G$,
  bankDesc: Y$,
  belowMin: nv,
  default: Ame,
  enterAmount: E$,
  exceedLimit: tv,
  fee: D$,
  feeRate: R$,
  invalidFormat: ov,
  minAmount: x$,
  noMethod: ev,
  notOpen: Z$,
  paymentMethod: z$,
  record: J$,
  submit: X$,
  title: k$,
  wechatCode: H$,
  wechatCodeDesc: B$,
  wechatPay: F$,
  wechatPayDesc: L$
}, Symbol.toStringTag, { value: "Module" })), sv = "编辑银行卡", av = "添加银行卡", cv = "请确保银行卡信息准确无误，以便顺利提现", iv = "添加您的银行卡信息，用于资金提现到账", lv = "持卡人姓名", dv = "请输入持卡人真实姓名", uv = "银行名称", pv = "请输入开户银行全称", mv = "银行卡号", fv = "请输入银行卡号", gv = "编辑支付宝账户", hv = "添加支付宝账户", _v = "请确保支付宝信息准确无误，以便顺利提现", yv = "添加您的支付宝信息，用于资金提现到账", $v = "支付宝姓名", vv = "请输入支付宝实名认证姓名", bv = "支付宝账号", Tv = "请输入支付宝账号（手机号/邮箱）", Pv = "编辑微信账户", Sv = "添加微信账户", Ov = "请确保微信信息准确无误，以便顺利提现", wv = "添加您的微信信息，用于资金提现到账", Cv = "微信姓名", Mv = "请输入微信实名认证姓名", Av = "微信账号", jv = "请输入微信账号（手机号/微信号）", kv = "保存账户信息", Iv = "确定要删除该提现账户吗？删除后无法恢复", Nv = "确认删除", Dv = "取消", Ev = "编辑提现账户", xv = "添加提现账户", Rv = "请上传清晰的支付宝收款码", zv = "请上传清晰的微信收款码", Fv = "银行卡信息", Lv = "支付宝账户信息", Hv = "微信账户信息", Bv = "账户类型", Uv = "此项为必填项", Wv = "上传成功", qv = "上传失败，请重试", Vv = "保存成功", Gv = "删除成功", kme = {
  editBankCard: sv,
  addBankCard: av,
  editBankCardTips: cv,
  addBankCardTips: iv,
  bankRealname: lv,
  bankRealnamePlaceholder: dv,
  bankName: uv,
  bankNamePlaceholder: pv,
  bankAccountNo: mv,
  bankAccountNoPlaceholder: fv,
  editAlipayAccount: gv,
  addAlipayAccount: hv,
  editAlipayAccountTips: _v,
  addAlipayAccountTips: yv,
  alipayRealname: $v,
  alipayRealnamePlaceholder: vv,
  alipayAccountNo: bv,
  alipayAccountNoPlaceholder: Tv,
  editWechatCodeAccount: Pv,
  addWechatCodeAccount: Sv,
  editWechatCodeAccountTips: Ov,
  addWechatCodeAccountTips: wv,
  wechatCodeRealname: Cv,
  wechatCodeRealnamePlaceholder: Mv,
  wechatCodeAccountNo: Av,
  wechatCodeAccountNoPlaceholder: jv,
  save: kv,
  deleteConfirm: Iv,
  confirm: Nv,
  cancel: Dv,
  editAccountTitle: Ev,
  addAccountTitle: xv,
  alipayAccountImgPlaceholder: Rv,
  wechatCodeAccountImgPlaceholder: zv,
  accountInfo: Fv,
  alipayAccountInfo: Lv,
  wechatCodeAccountInfo: Hv,
  accountTypeLabel: Bv,
  requiredField: Uv,
  uploadSuccess: Wv,
  uploadFailed: qv,
  saveSuccess: Vv,
  deleteSuccess: Gv
}, Ime = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountInfo: Fv,
  accountTypeLabel: Bv,
  addAccountTitle: xv,
  addAlipayAccount: hv,
  addAlipayAccountTips: yv,
  addBankCard: av,
  addBankCardTips: iv,
  addWechatCodeAccount: Sv,
  addWechatCodeAccountTips: wv,
  alipayAccountImgPlaceholder: Rv,
  alipayAccountInfo: Lv,
  alipayAccountNo: bv,
  alipayAccountNoPlaceholder: Tv,
  alipayRealname: $v,
  alipayRealnamePlaceholder: vv,
  bankAccountNo: mv,
  bankAccountNoPlaceholder: fv,
  bankName: uv,
  bankNamePlaceholder: pv,
  bankRealname: lv,
  bankRealnamePlaceholder: dv,
  cancel: Dv,
  confirm: Nv,
  default: kme,
  deleteConfirm: Iv,
  deleteSuccess: Gv,
  editAccountTitle: Ev,
  editAlipayAccount: gv,
  editAlipayAccountTips: _v,
  editBankCard: sv,
  editBankCardTips: cv,
  editWechatCodeAccount: Pv,
  editWechatCodeAccountTips: Ov,
  requiredField: Uv,
  save: kv,
  saveSuccess: Vv,
  uploadFailed: qv,
  uploadSuccess: Wv,
  wechatCodeAccountImgPlaceholder: zv,
  wechatCodeAccountInfo: Hv,
  wechatCodeAccountNo: Av,
  wechatCodeAccountNoPlaceholder: jv,
  wechatCodeRealname: Cv,
  wechatCodeRealnamePlaceholder: Mv
}, Symbol.toStringTag, { value: "Module" })), Yv = "银行卡列表", Kv = "微信收款码列表", Qv = "支付宝账号列表", Xv = "银行卡", Jv = "微信收款码", Zv = "支付宝账号", eb = "尾号", ob = "暂无账户信息，点击下方按钮添加", tb = "暂无银行卡", nb = "暂无微信收款码", rb = "暂无支付宝账号", sb = "添加银行卡", ab = "添加微信收款码", cb = "添加支付宝账号", Nme = {
  bankCardList: Yv,
  wechatCodeList: Kv,
  alipayAccountList: Qv,
  bankCard: Xv,
  wechatCode: Jv,
  alipayAccountNo: Zv,
  endNumber: eb,
  noAccountDesc: ob,
  noBankCard: tb,
  noWechatCode: nb,
  noAlipayAccount: rb,
  addBankCard: sb,
  addWechatCode: ab,
  addAlipayAccount: cb,
  delete: "删除"
}, Dme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: cb,
  addBankCard: sb,
  addWechatCode: ab,
  alipayAccountList: Qv,
  alipayAccountNo: Zv,
  bankCard: Xv,
  bankCardList: Yv,
  default: Nme,
  endNumber: eb,
  noAccountDesc: ob,
  noAlipayAccount: rb,
  noBankCard: tb,
  noWechatCode: nb,
  wechatCode: Jv,
  wechatCodeList: Kv
}, Symbol.toStringTag, { value: "Module" })), ib = "切换账号", lb = "今日收入(元)", db = "我的账户", ub = "今日完成单量(单)", pb = "订单统计", mb = "建议反馈", fb = "我的评价", gb = "去派单", hb = "抢单派送给店员", _b = "排班管理", yb = "安排作息时间", $b = "服务分析", vb = "服务数据", bb = "订单看板", Tb = "待派单", Pb = "日历", Sb = "待服务", Ob = "服务中", wb = "待验收", Cb = "已完成", Mb = "售后单", Ab = "已取消", jb = "刷新", kb = "师傅动态", Eme = {
  changeAccount: ib,
  todayMoney: lb,
  myAccount: db,
  orderFinshNumber: ub,
  orderNumber: pb,
  ViolationAppeal: mb,
  MyReview: fb,
  paiOrder: gb,
  paiOrderDesc: hb,
  workTime: _b,
  levalWork: yb,
  ServiceAnalysis: $b,
  servicesData: vb,
  workTools: bb,
  daiPaiOrder: Tb,
  date: Pb,
  daiServices: Sb,
  inServices: Ob,
  daiYanshou: wb,
  finshOrder: Cb,
  refunedOrder: Mb,
  cancelOrder: Ab,
  resetEcharts: jb,
  technianStatus: kb
}, xme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MyReview: fb,
  ServiceAnalysis: $b,
  ViolationAppeal: mb,
  cancelOrder: Ab,
  changeAccount: ib,
  daiPaiOrder: Tb,
  daiServices: Sb,
  daiYanshou: wb,
  date: Pb,
  default: Eme,
  finshOrder: Cb,
  inServices: Ob,
  levalWork: yb,
  myAccount: db,
  orderFinshNumber: ub,
  orderNumber: pb,
  paiOrder: gb,
  paiOrderDesc: hb,
  refunedOrder: Mb,
  resetEcharts: jb,
  servicesData: vb,
  technianStatus: kb,
  todayMoney: lb,
  workTime: _b,
  workTools: bb
}, Symbol.toStringTag, { value: "Module" })), Ib = "机构入驻申请", Nb = "机构名称", Db = "请输入机构名称", Eb = "机构证件", xb = "请上传清晰照片", Rb = "营业执照", zb = "请上传信息清晰的营业执照照片", Fb = "上传机构图片", Lb = "机构位置", Hb = "请选择位置", Bb = "联系人姓名", Ub = "请输入联系人姓名", Wb = "联系人手机", qb = "请输入联系人手机号码", Vb = "联系人身份证", Gb = "请输入联系人身份证号码", Yb = "身份证上传", Kb = "请上传身份证正反面照片", Qb = "身份证正面", Xb = "照片必须清晰完整", Jb = "身份证信息必须清晰可见", Zb = "身份证反面", eT = "照片必须清晰完整", oT = "身份证信息必须清晰可见", tT = "申请说明", nT = "请输入申请说明", rT = "确认提交", sT = "请上传营业执照", aT = "请输入联系人姓名", cT = "请输入手机号码", iT = "请输入有效的手机号码", lT = "请输入身份证号码", dT = "请输入有效的身份证号码", uT = "请上传身份证正面照片", pT = "请上传身份证反面照片", mT = "请选择位置", fT = "提交中...", gT = "提交成功", Rme = {
  storeApplyTitle: Ib,
  storeName: Nb,
  inputStoreName: Db,
  storeCertificates: Eb,
  uploadClearPhotos: xb,
  businessLicense: Rb,
  storeBusinessLicenseTip: zb,
  uploadStoreImage: Fb,
  myLocation: Lb,
  selectLocation: Hb,
  contactPersonName: Bb,
  inputContactPersonName: Ub,
  contactPersonMobile: Wb,
  inputContactPersonMobile: qb,
  contactPersonIdcard: Vb,
  inputContactPersonIdcard: Gb,
  idcardUpload: Yb,
  idcardUploadTip: Kb,
  idcardFront: Qb,
  idcardFrontTip1: Xb,
  idcardFrontTip3: Jb,
  idcardBack: Zb,
  idcardBackTip1: eT,
  idcardBackTip3: oT,
  applyDescription: tT,
  inputApplyDescription: nT,
  confirmSubmit: rT,
  businessLicenseRequired: sT,
  contactNameRequired: aT,
  mobileRequired: cT,
  inputMobileErr: iT,
  idNumberRequired: lT,
  inputIdcardErr: dT,
  idcardFrontRequired: uT,
  idcardBackRequired: pT,
  locationRequired: mT,
  submitting: fT,
  submitSuccess: gT
}, zme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDescription: tT,
  businessLicense: Rb,
  businessLicenseRequired: sT,
  confirmSubmit: rT,
  contactNameRequired: aT,
  contactPersonIdcard: Vb,
  contactPersonMobile: Wb,
  contactPersonName: Bb,
  default: Rme,
  idNumberRequired: lT,
  idcardBack: Zb,
  idcardBackRequired: pT,
  idcardBackTip1: eT,
  idcardBackTip3: oT,
  idcardFront: Qb,
  idcardFrontRequired: uT,
  idcardFrontTip1: Xb,
  idcardFrontTip3: Jb,
  idcardUpload: Yb,
  idcardUploadTip: Kb,
  inputApplyDescription: nT,
  inputContactPersonIdcard: Gb,
  inputContactPersonMobile: qb,
  inputContactPersonName: Ub,
  inputIdcardErr: dT,
  inputMobileErr: iT,
  inputStoreName: Db,
  locationRequired: mT,
  mobileRequired: cT,
  myLocation: Lb,
  selectLocation: Hb,
  storeApplyTitle: Ib,
  storeBusinessLicenseTip: zb,
  storeCertificates: Eb,
  storeName: Nb,
  submitSuccess: gT,
  submitting: fT,
  uploadClearPhotos: xb,
  uploadStoreImage: Fb
}, Symbol.toStringTag, { value: "Module" })), hT = "入驻申请审批中", _T = "入驻申请不通过", yT = "申请已通过", $T = "预计三个工作日完成，请耐心等待", vT = "申请已提交", bT = "审核时间", TT = "返回首页", PT = "查看申请状态", ST = "审核提示", OT = "您已成功入驻", Fme = {
  reviewingTitle: hT,
  rejectedTitle: _T,
  successTitle: yT,
  description: $T,
  applicationSubmitted: vT,
  awaitingSettlement: bT,
  goBackHome: TT,
  checkStatus: PT,
  reviewTips: ST,
  descriptionSuccess: OT
}, Lme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applicationSubmitted: vT,
  awaitingSettlement: bT,
  checkStatus: PT,
  default: Fme,
  description: $T,
  descriptionSuccess: OT,
  goBackHome: TT,
  rejectedTitle: _T,
  reviewTips: ST,
  reviewingTitle: hT,
  successTitle: yT
}, Symbol.toStringTag, { value: "Module" })), wT = "师傅详情", CT = "师傅详情", MT = "手机号：", AT = "完成单数", jT = "异常订单数", kT = "售后订单数", IT = "好评率", NT = "个人简介", DT = "姓名", ET = "手机号", xT = "资质证书", RT = "加载失败", zT = "自我介绍", FT = "暂无介绍", LT = "技能专长", HT = "请输入搜索关键词", BT = "筛选", UT = "家政保洁", WT = "保姆月嫂", qT = "家电维修", VT = "家电清洗", GT = "管道疏通", YT = "从业", KT = "年", QT = "服务", XT = "单", JT = "工作中", ZT = "休息中", eP = "去派单", oP = "排班管理", tP = "打电话", nP = "任务", rP = "机构", sP = "技工", aP = "我的", cP = "技工管理", Hme = {
  pageTitle: wT,
  technicianDetail: CT,
  phoneNumber: MT,
  completedOrders: AT,
  abnormalOrders: jT,
  refundOrders: kT,
  positiveRate: IT,
  personalProfile: NT,
  name: DT,
  phone: ET,
  qualificationCertificate: xT,
  loadFailed: RT,
  selfIntroduction: zT,
  noIntroduction: FT,
  skills: LT,
  searchPlaceholder: HT,
  filter: BT,
  housekeeping: UT,
  nanny: WT,
  applianceRepair: qT,
  applianceCleaning: VT,
  pipeDredging: GT,
  yearsOfExperience: YT,
  years: KT,
  serviceOrders: QT,
  orders: XT,
  working: JT,
  resting: ZT,
  assignOrder: eP,
  scheduleManagement: oP,
  makeCall: tP,
  tasks: nP,
  store: rP,
  technicians: sP,
  my: aP,
  pageHeader: cP
}, Bme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOrders: jT,
  applianceCleaning: VT,
  applianceRepair: qT,
  assignOrder: eP,
  completedOrders: AT,
  default: Hme,
  filter: BT,
  housekeeping: UT,
  loadFailed: RT,
  makeCall: tP,
  my: aP,
  name: DT,
  nanny: WT,
  noIntroduction: FT,
  orders: XT,
  pageHeader: cP,
  pageTitle: wT,
  personalProfile: NT,
  phone: ET,
  phoneNumber: MT,
  pipeDredging: GT,
  positiveRate: IT,
  qualificationCertificate: xT,
  refundOrders: kT,
  resting: ZT,
  scheduleManagement: oP,
  searchPlaceholder: HT,
  selfIntroduction: zT,
  serviceOrders: QT,
  skills: LT,
  store: rP,
  tasks: nP,
  technicianDetail: CT,
  technicians: sP,
  working: JT,
  years: KT,
  yearsOfExperience: YT
}, Symbol.toStringTag, { value: "Module" })), iP = "机构首页", lP = "请输入搜索关键词", dP = "筛选", uP = "家政保洁", pP = "保姆月嫂", mP = "家电维修", fP = "家电清洗", gP = "管道疏通", hP = "从业", _P = "年", yP = "服务", $P = "单", vP = "工作中", bP = "休息中", TP = "去派单", PP = "排班管理", SP = "打电话", OP = "任务", wP = "机构", CP = "技工", MP = "我的", AP = "技工管理", Ume = {
  pageTitle: iP,
  searchPlaceholder: lP,
  filter: dP,
  housekeeping: uP,
  nanny: pP,
  applianceRepair: mP,
  applianceCleaning: fP,
  pipeDredging: gP,
  yearsOfExperience: hP,
  years: _P,
  serviceOrders: yP,
  orders: $P,
  working: vP,
  resting: bP,
  assignOrder: TP,
  scheduleManagement: PP,
  makeCall: SP,
  tasks: OP,
  store: wP,
  technicians: CP,
  my: MP,
  pageHeaderTitle: AP
}, Wme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applianceCleaning: fP,
  applianceRepair: mP,
  assignOrder: TP,
  default: Ume,
  filter: dP,
  housekeeping: uP,
  makeCall: SP,
  my: MP,
  nanny: pP,
  orders: $P,
  pageHeaderTitle: AP,
  pageTitle: iP,
  pipeDredging: gP,
  resting: bP,
  scheduleManagement: PP,
  searchPlaceholder: lP,
  serviceOrders: yP,
  store: wP,
  tasks: OP,
  technicians: CP,
  working: vP,
  years: _P,
  yearsOfExperience: hP
}, Symbol.toStringTag, { value: "Module" })), jP = "排班管理", kP = "排班管理日历", IP = "休息时间安排", NP = "开始时间", DP = "结束时间", EP = "请假原因", xP = "个人事务", RP = "身体不适", zP = "家庭原因", FP = "其他原因", LP = "培训学习", HP = "临时有事", BP = "取消", UP = "确定", WP = "日", qP = "一", VP = "二", GP = "三", YP = "四", KP = "五", QP = "六", qme = {
  title: jP,
  calendarTitle: kP,
  restTimeArrangement: IP,
  startTime: NP,
  endTime: DP,
  leaveReason: EP,
  personalAffairs: xP,
  physicalDiscomfort: RP,
  familyReason: zP,
  otherReason: FP,
  trainingStudy: LP,
  temporaryMatter: HP,
  cancel: BP,
  confirm: UP,
  sunday: WP,
  monday: qP,
  tuesday: VP,
  wednesday: GP,
  thursday: YP,
  friday: KP,
  saturday: QP
}, Vme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calendarTitle: kP,
  cancel: BP,
  confirm: UP,
  default: qme,
  endTime: DP,
  familyReason: zP,
  friday: KP,
  leaveReason: EP,
  monday: qP,
  otherReason: FP,
  personalAffairs: xP,
  physicalDiscomfort: RP,
  restTimeArrangement: IP,
  saturday: QP,
  startTime: NP,
  sunday: WP,
  temporaryMatter: HP,
  thursday: YP,
  title: jP,
  trainingStudy: LP,
  tuesday: VP,
  wednesday: GP
}, Symbol.toStringTag, { value: "Module" })), XP = "登录中", JP = "请输入账号", ZP = "请输入密码", eS = "忘记密码", oS = "还没有账号", tS = "去注册", nS = "登录代表您同意", rS = "请先阅读并同意协议", sS = "请输入手机号", aS = "快捷登录", cS = "账号密码登录", iS = "输入账号密码登录", lS = "商家未开启账号密码登录", dS = "手机号登录", uS = "输入手机号验证码登录", pS = "商家未开启手机号登录", Gme = {
  logining: XP,
  usernamePlaceholder: JP,
  passwordPlaceholder: ZP,
  resetpwd: eS,
  noAccount: oS,
  toRegister: tS,
  agreeTips: nS,
  isAgreeTips: rS,
  mobilePlaceholder: sS,
  oneClicklogin: aS,
  accountLogin: cS,
  accountLoginTip: iS,
  accountLoginError: lS,
  mobileLogin: dS,
  mobileLoginTip: uS,
  mobileLoginError: pS
}, Yme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: cS,
  accountLoginError: lS,
  accountLoginTip: iS,
  agreeTips: nS,
  default: Gme,
  isAgreeTips: rS,
  logining: XP,
  mobileLogin: dS,
  mobileLoginError: pS,
  mobileLoginTip: uS,
  mobilePlaceholder: sS,
  noAccount: oS,
  oneClicklogin: aS,
  passwordPlaceholder: ZP,
  resetpwd: eS,
  toRegister: tS,
  usernamePlaceholder: JP
}, Symbol.toStringTag, { value: "Module" })), mS = "注册中", fS = "输入账号密码注册", gS = "输入手机号验证码注册", hS = "请输入账号", _S = "账号不能是纯数字", yS = "请输入密码", $S = "请再次确认密码", vS = "两次输入的密码不一致", bS = "忘记密码", TS = "已有账号", PS = "去登录", SS = "注册代表您同意", OS = "请先阅读并同意协议", wS = "账号注册", CS = "手机号注册", MS = "请输入手机号", Kme = {
  registering: mS,
  usernameRegisterTip: fS,
  mobileRegisterTip: gS,
  usernamePlaceholder: hS,
  usernameTips: _S,
  passwordPlaceholder: yS,
  confirmPasswordPlaceholder: $S,
  confirmPasswordError: vS,
  resetpwd: bS,
  haveAccount: TS,
  toLogin: PS,
  registerAgreeTips: SS,
  isAgreeTips: OS,
  usernameRegister: wS,
  mobileRegister: CS,
  mobilePlaceholder: MS
}, Qme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: vS,
  confirmPasswordPlaceholder: $S,
  default: Kme,
  haveAccount: TS,
  isAgreeTips: OS,
  mobilePlaceholder: MS,
  mobileRegister: CS,
  mobileRegisterTip: gS,
  passwordPlaceholder: yS,
  registerAgreeTips: SS,
  registering: mS,
  resetpwd: bS,
  toLogin: PS,
  usernamePlaceholder: hS,
  usernameRegister: wS,
  usernameRegisterTip: fS,
  usernameTips: _S
}, Symbol.toStringTag, { value: "Module" })), AS = "新任务", jS = "筛选", kS = "刷新", IS = "重置", NS = "收入", DS = "服务类型", ES = "服务距离", xS = "确定", RS = "我要抢单", zS = "暂无数据", Xme = {
  newJob: AS,
  sort: jS,
  calcation: kS,
  reset: IS,
  money: NS,
  serviceType: DS,
  serviceDistance: ES,
  confrim: xS,
  getOrder: RS,
  nothingMore: zS
}, Jme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: kS,
  confrim: xS,
  default: Xme,
  getOrder: RS,
  money: NS,
  newJob: AS,
  nothingMore: zS,
  reset: IS,
  serviceDistance: ES,
  serviceType: DS,
  sort: jS
}, Symbol.toStringTag, { value: "Module" })), FS = "我的账户", LS = "账户余额", HS = "提现", BS = "账户明细", US = "收支统计", WS = "保证金", qS = "银行卡", VS = "今日账单", GS = "数据说明", YS = "此处为预计收入，如数据延迟，不影响最终结算，可稍后查询", KS = "预计收入", QS = "预计支出", XS = "日常保洁", JS = "深度清洁", ZS = "清洁收入-日常清洁", eO = "未到账", oO = "已到账", tO = "收入", nO = "支出", rO = "全部类型", sO = "全部日期", aO = "全部状态", cO = "暂无账单数据", iO = "到账情况", Zme = {
  myAccount: FS,
  accountBalance: LS,
  cashOut: HS,
  accountDetails: BS,
  receiptStatistics: US,
  deposit: WS,
  bankCards: qS,
  todayBill: VS,
  dataDescription: GS,
  dataDelayTip: YS,
  expectedIncome: KS,
  expectedExpense: QS,
  dailyCleaning: XS,
  deepCleaning: JS,
  cleaningIncome: ZS,
  notArrived: eO,
  arrived: oO,
  income: tO,
  expense: nO,
  allTypes: rO,
  allDates: sO,
  allStatuses: aO,
  noBillData: cO,
  paymentStatus: iO
}, efe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: LS,
  accountDetails: BS,
  allDates: sO,
  allStatuses: aO,
  allTypes: rO,
  arrived: oO,
  bankCards: qS,
  cashOut: HS,
  cleaningIncome: ZS,
  dailyCleaning: XS,
  dataDelayTip: YS,
  dataDescription: GS,
  deepCleaning: JS,
  default: Zme,
  deposit: WS,
  expectedExpense: QS,
  expectedIncome: KS,
  expense: nO,
  income: tO,
  myAccount: FS,
  noBillData: cO,
  notArrived: eO,
  paymentStatus: iO,
  receiptStatistics: US,
  todayBill: VS
}, Symbol.toStringTag, { value: "Module" })), lO = "我的账户", dO = "账户余额", uO = "提现", pO = "账户明细", mO = "收支统计", fO = "保证金", gO = "银行卡", hO = "今日账单", _O = "数据说明", yO = "此处为预计收入，如数据延迟，不影响最终结算，可稍后查询", $O = "预计收入", vO = "预计支出", bO = "日常保洁", TO = "深度清洁", PO = "清洁收入-日常清洁", SO = "未到账", OO = "已到账", wO = "元", ofe = {
  myAccount: lO,
  accountBalance: dO,
  withdraw: uO,
  accountDetails: pO,
  receiptStatistics: mO,
  deposit: fO,
  bankCards: gO,
  todayBill: hO,
  dataDescription: _O,
  dataDelayTip: yO,
  expectedIncome: $O,
  expectedExpense: vO,
  dailyCleaning: bO,
  deepCleaning: TO,
  cleaningIncome: PO,
  notArrived: SO,
  arrived: OO,
  yuan: wO
}, tfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: dO,
  accountDetails: pO,
  arrived: OO,
  bankCards: gO,
  cleaningIncome: PO,
  dailyCleaning: bO,
  dataDelayTip: yO,
  dataDescription: _O,
  deepCleaning: TO,
  default: ofe,
  deposit: fO,
  expectedExpense: vO,
  expectedIncome: $O,
  myAccount: lO,
  notArrived: SO,
  receiptStatistics: mO,
  todayBill: hO,
  withdraw: uO,
  yuan: wO
}, Symbol.toStringTag, { value: "Module" })), CO = "账户明细", MO = "收支统计", AO = "日统计", jO = "月统", kO = "单位: 千", IO = "收入", NO = "支出", DO = "今天收入(元)", EO = "今天支出(元)", xO = "维修服务收入", RO = "日常保洁收入", zO = "投诉扣款", FO = "到账情况", LO = "账户明细", HO = "收支统计", nfe = {
  accountDetail: CO,
  incomeExpenseSummary: MO,
  dailySummary: AO,
  monthlySummary: jO,
  unitThousand: kO,
  income: IO,
  expense: NO,
  todayIncome: DO,
  todayExpense: EO,
  repairServiceIncome: xO,
  dailyCleaningIncome: RO,
  complaintDeduction: zO,
  paymentStatus: FO,
  accountDetails: LO,
  receiptStatistics: HO
}, rfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountDetail: CO,
  accountDetails: LO,
  complaintDeduction: zO,
  dailyCleaningIncome: RO,
  dailySummary: AO,
  default: nfe,
  expense: NO,
  income: IO,
  incomeExpenseSummary: MO,
  monthlySummary: jO,
  paymentStatus: FO,
  receiptStatistics: HO,
  repairServiceIncome: xO,
  todayExpense: EO,
  todayIncome: DO,
  unitThousand: kO
}, Symbol.toStringTag, { value: "Module" })), BO = "提现", UO = "可提现余额", WO = "￥", qO = "全部提现", VO = "请输入提现金额", GO = "手续费：￥", YO = "最低提现金额", KO = "，手续费率：", QO = "提现方式", XO = "微信提现", JO = "快速到账，无需审核", ZO = "微信收款码", e1 = "提现至微信收款码", o1 = "请先添加微信号", t1 = "支付宝", n1 = "提现至支付宝", r1 = "银行卡", s1 = "提现至银行卡：{bankName}", a1 = "请先添加银行卡", c1 = "添加", i1 = "立即提现", l1 = "提现设置未开启", d1 = "账户异常", u1 = "请选择提现方式", p1 = "提现金额格式错误", m1 = "提现金额超出可提现余额", f1 = "提现金额低于最低限额", g1 = "请先添加支付宝账号", sfe = {
  title: BO,
  availableBalance: UO,
  currency: WO,
  allMoney: qO,
  enterAmount: VO,
  fee: GO,
  minAmount: YO,
  feeRate: KO,
  paymentMethod: QO,
  wechatPay: XO,
  wechatPayDesc: JO,
  wechatCode: ZO,
  wechatCodeDesc: e1,
  addWechat: o1,
  alipay: t1,
  alipayDesc: n1,
  bank: r1,
  bankDesc: s1,
  addBank: a1,
  add: c1,
  submit: i1,
  notOpen: l1,
  abnormal: d1,
  noMethod: u1,
  invalidFormat: p1,
  exceedLimit: m1,
  belowMin: f1,
  addAlipay: g1
}, afe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormal: d1,
  add: c1,
  addAlipay: g1,
  addBank: a1,
  addWechat: o1,
  alipay: t1,
  alipayDesc: n1,
  allMoney: qO,
  availableBalance: UO,
  bank: r1,
  bankDesc: s1,
  belowMin: f1,
  currency: WO,
  default: sfe,
  enterAmount: VO,
  exceedLimit: m1,
  fee: GO,
  feeRate: KO,
  invalidFormat: p1,
  minAmount: YO,
  noMethod: u1,
  notOpen: l1,
  paymentMethod: QO,
  submit: i1,
  title: BO,
  wechatCode: ZO,
  wechatCodeDesc: e1,
  wechatPay: XO,
  wechatPayDesc: JO
}, Symbol.toStringTag, { value: "Module" })), h1 = "编辑银行卡", _1 = "添加银行卡", y1 = "请填写正确的银行卡信息", $1 = "添加银行卡后可用于提现", v1 = "持卡人姓名", b1 = "请输入持卡人姓名", T1 = "开户银行", P1 = "请输入开户银行", S1 = "银行卡号", O1 = "请输入银行卡号", w1 = "编辑支付宝账号", C1 = "添加支付宝账号", M1 = "请填写正确的支付宝信息", A1 = "添加支付宝后可用于提现", j1 = "支付宝姓名", k1 = "请输入支付宝姓名", I1 = "支付宝账号", N1 = "请输入支付宝账号", D1 = "请上传支付宝收款码", E1 = "编辑微信收款码", x1 = "添加微信收款码", R1 = "请填写正确的微信收款码信息", z1 = "添加微信收款码后可用于提现", F1 = "微信姓名", L1 = "请输入微信姓名", H1 = "微信账号", B1 = "请输入微信账号", U1 = "请上传微信收款码", W1 = "保存", q1 = "确定要删除该账户吗？", V1 = "确定", G1 = "取消", Y1 = "编辑账户", K1 = "添加账户", cfe = {
  editBankCard: h1,
  addBankCard: _1,
  editBankCardTips: y1,
  addBankCardTips: $1,
  bankRealname: v1,
  bankRealnamePlaceholder: b1,
  bankName: T1,
  bankNamePlaceholder: P1,
  bankAccountNo: S1,
  bankAccountNoPlaceholder: O1,
  editAlipayAccount: w1,
  addAlipayAccount: C1,
  editAlipayAccountTips: M1,
  addAlipayAccountTips: A1,
  alipayRealname: j1,
  alipayRealnamePlaceholder: k1,
  alipayAccountNo: I1,
  alipayAccountNoPlaceholder: N1,
  alipayAccountImgPlaceholder: D1,
  editWechatCodeAccount: E1,
  addWechatCodeAccount: x1,
  editWechatCodeAccountTips: R1,
  addWechatCodeAccountTips: z1,
  wechatCodeRealname: F1,
  wechatCodeRealnamePlaceholder: L1,
  wechatCodeAccountNo: H1,
  wechatCodeAccountNoPlaceholder: B1,
  wechatCodeAccountImgPlaceholder: U1,
  save: W1,
  deleteConfirm: q1,
  confirm: V1,
  cancel: G1,
  editAccountTitle: Y1,
  addAccountTitle: K1
}, ife = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAccountTitle: K1,
  addAlipayAccount: C1,
  addAlipayAccountTips: A1,
  addBankCard: _1,
  addBankCardTips: $1,
  addWechatCodeAccount: x1,
  addWechatCodeAccountTips: z1,
  alipayAccountImgPlaceholder: D1,
  alipayAccountNo: I1,
  alipayAccountNoPlaceholder: N1,
  alipayRealname: j1,
  alipayRealnamePlaceholder: k1,
  bankAccountNo: S1,
  bankAccountNoPlaceholder: O1,
  bankName: T1,
  bankNamePlaceholder: P1,
  bankRealname: v1,
  bankRealnamePlaceholder: b1,
  cancel: G1,
  confirm: V1,
  default: cfe,
  deleteConfirm: q1,
  editAccountTitle: Y1,
  editAlipayAccount: w1,
  editAlipayAccountTips: M1,
  editBankCard: h1,
  editBankCardTips: y1,
  editWechatCodeAccount: E1,
  editWechatCodeAccountTips: R1,
  save: W1,
  wechatCodeAccountImgPlaceholder: U1,
  wechatCodeAccountNo: H1,
  wechatCodeAccountNoPlaceholder: B1,
  wechatCodeRealname: F1,
  wechatCodeRealnamePlaceholder: L1
}, Symbol.toStringTag, { value: "Module" })), Q1 = "银行卡列表", X1 = "微信收款码列表", J1 = "支付宝账号列表", Z1 = "银行卡", ew = "微信收款码", ow = "支付宝账号", tw = "尾号", nw = "暂无账户信息，点击下方按钮添加", rw = "暂无银行卡", sw = "暂无微信收款码", aw = "暂无支付宝账号", cw = "添加银行卡", iw = "添加微信收款码", lw = "添加支付宝账号", lfe = {
  bankCardList: Q1,
  wechatCodeList: X1,
  alipayAccountList: J1,
  bankCard: Z1,
  wechatCode: ew,
  alipayAccountNo: ow,
  endNumber: tw,
  noAccountDesc: nw,
  noBankCard: rw,
  noWechatCode: sw,
  noAlipayAccount: aw,
  addBankCard: cw,
  addWechatCode: iw,
  addAlipayAccount: lw,
  delete: "删除"
}, dfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: lw,
  addBankCard: cw,
  addWechatCode: iw,
  alipayAccountList: J1,
  alipayAccountNo: ow,
  bankCard: Z1,
  bankCardList: Q1,
  default: lfe,
  endNumber: tw,
  noAccountDesc: nw,
  noAlipayAccount: aw,
  noBankCard: rw,
  noWechatCode: sw,
  wechatCode: ew,
  wechatCodeList: X1
}, Symbol.toStringTag, { value: "Module" })), dw = "申请时间", uw = "审核中，请耐心等待...", pw = "转账中，请耐心等待...", mw = "已转账，请及时查收", fw = "提现已取消", gw = "余额记录", hw = "佣金记录", _w = "暂无提现记录", yw = "暂无佣金记录", $w = "提现方式：", ufe = {
  applyTime: dw,
  toBeReviewed: uw,
  toBeTransfer: pw,
  transfer: mw,
  cancelApply: fw,
  balanceDetail: gw,
  commissionDetail: hw,
  emptyTip: _w,
  commissemptyTip: yw,
  rechargeType: $w
}, pfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: dw,
  balanceDetail: gw,
  cancelApply: fw,
  commissemptyTip: yw,
  commissionDetail: hw,
  default: ufe,
  emptyTip: _w,
  rechargeType: $w,
  toBeReviewed: uw,
  toBeTransfer: pw,
  transfer: mw
}, Symbol.toStringTag, { value: "Module" })), vw = "当前状态", bw = "提现单号", Tw = "手续费", Pw = "申请时间", Sw = "审核时间", Ow = "银行名称", ww = "收款账号", Cw = "拒绝理由", Mw = "转账方式", Aw = "转账时间", jw = "付款凭证", kw = "转账补充说明", Iw = "真实姓名", Nw = "持卡人姓名", Dw = "收款码", Ew = "收款方信息", xw = "转账信息", Rw = "收款方昵称", zw = "收款方头像", Fw = "转账单号", Lw = "提现", Hw = "取消提现", mfe = {
  statusName: vw,
  cashOutNo: bw,
  serviceMoney: Tw,
  createTime: Pw,
  auditTime: Sw,
  transferBank: Ow,
  transferAccount: ww,
  refuseReason: Cw,
  transferTypeName: Mw,
  transferTime: Aw,
  transferVoucher: jw,
  transferRemark: kw,
  realname: Iw,
  bankRealname: Nw,
  transferCode: Dw,
  proceedsInfo: Ew,
  transferInfo: xw,
  transferNickname: Rw,
  transferImg: zw,
  transferNo: Fw,
  cashOutNow: Lw,
  cashOutCancel: Hw
}, ffe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: Sw,
  bankRealname: Nw,
  cashOutCancel: Hw,
  cashOutNo: bw,
  cashOutNow: Lw,
  createTime: Pw,
  default: mfe,
  proceedsInfo: Ew,
  realname: Iw,
  refuseReason: Cw,
  serviceMoney: Tw,
  statusName: vw,
  transferAccount: ww,
  transferBank: Ow,
  transferCode: Dw,
  transferImg: zw,
  transferInfo: xw,
  transferNickname: Rw,
  transferNo: Fw,
  transferRemark: kw,
  transferTime: Aw,
  transferTypeName: Mw,
  transferVoucher: jw
}, Symbol.toStringTag, { value: "Module" })), Bw = "师傅详情", Uw = "编辑", Ww = "编辑师傅信息", qw = "更换头像", Vw = "姓名", Gw = "手机号", Yw = "个人简介", Kw = "请输入姓名", Qw = "请输入手机号", Xw = "请输入个人简介", Jw = "取消", Zw = "保存", eC = "保存成功", oC = "保存失败", tC = "请输入姓名", nC = "姓名长度应为2-20个字符", rC = "请输入手机号", sC = "请输入正确的手机号格式", aC = "工作中", cC = "休息中", iC = "手机号：", lC = "已完成订单", dC = "异常订单", uC = "退款订单", pC = "好评率", mC = "个人简介", fC = "资质证书", gC = "加载失败", hC = "暂无介绍", _C = "技能专长", yC = "从业{years}年", $C = "服务{count}单", vC = "最多允许上传{maxCount}张图片", bC = "上传失败", TC = "请上传头像", PC = "请输入个人简介", SC = "个人简介长度应为10-200个字符", OC = "保存中...", gfe = {
  technicianDetail: Bw,
  edit: Uw,
  editTechnicianInfo: Ww,
  changeAvatar: qw,
  name: Vw,
  phone: Gw,
  selfIntroduction: Yw,
  pleaseEnterName: Kw,
  pleaseEnterPhone: Qw,
  pleaseEnterIntroduction: Xw,
  cancel: Jw,
  save: Zw,
  saveSuccess: eC,
  saveFailed: oC,
  nameRequired: tC,
  nameLength: nC,
  phoneRequired: rC,
  phoneFormat: sC,
  working: aC,
  resting: cC,
  phoneNumber: iC,
  completedOrders: lC,
  abnormalOrders: dC,
  refundOrders: uC,
  positiveRate: pC,
  personalProfile: mC,
  qualificationCertificate: fC,
  loadFailed: gC,
  noIntroduction: hC,
  skills: _C,
  experience_years: yC,
  service_orders: $C,
  maxUploadImages: vC,
  uploadFailed: bC,
  avatarRequired: TC,
  introductionRequired: PC,
  introductionLength: SC,
  saving: OC
}, hfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOrders: dC,
  avatarRequired: TC,
  cancel: Jw,
  changeAvatar: qw,
  completedOrders: lC,
  default: gfe,
  edit: Uw,
  editTechnicianInfo: Ww,
  experience_years: yC,
  introductionLength: SC,
  introductionRequired: PC,
  loadFailed: gC,
  maxUploadImages: vC,
  name: Vw,
  nameLength: nC,
  nameRequired: tC,
  noIntroduction: hC,
  personalProfile: mC,
  phone: Gw,
  phoneFormat: sC,
  phoneNumber: iC,
  phoneRequired: rC,
  pleaseEnterIntroduction: Xw,
  pleaseEnterName: Kw,
  pleaseEnterPhone: Qw,
  positiveRate: pC,
  qualificationCertificate: fC,
  refundOrders: uC,
  resting: cC,
  save: Zw,
  saveFailed: oC,
  saveSuccess: eC,
  saving: OC,
  selfIntroduction: Yw,
  service_orders: $C,
  skills: _C,
  technicianDetail: Bw,
  uploadFailed: bC,
  working: aC
}, Symbol.toStringTag, { value: "Module" })), wC = "反馈标题", CC = "反馈内容", MC = "上传图片（选填）", AC = "提交反馈", jC = "请输入反馈标题", kC = "请详细描述您遇到的问题或建议", IC = "反馈内容请至少输入10个字符", NC = "反馈提交成功，感谢您的建议", DC = "反馈提交失败", EC = "网络错误，请稍后重试", _fe = {
  feedbackTitle: wC,
  feedbackContent: CC,
  uploadImage: MC,
  submitFeedback: AC,
  pleaseInputFeedbackTitle: jC,
  pleaseDescribeIssue: kC,
  feedbackContentMinLength: IC,
  feedbackSubmitSuccess: NC,
  feedbackSubmitFail: DC,
  networkError: EC
}, yfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _fe,
  feedbackContent: CC,
  feedbackContentMinLength: IC,
  feedbackSubmitFail: DC,
  feedbackSubmitSuccess: NC,
  feedbackTitle: wC,
  networkError: EC,
  pleaseDescribeIssue: kC,
  pleaseInputFeedbackTitle: jC,
  submitFeedback: AC,
  uploadImage: MC
}, Symbol.toStringTag, { value: "Module" })), xC = "帮助详情", RC = "加载中...", zC = "浏览次数", FC = "更新时间", LC = "暂无数据", HC = "缺少帮助文档ID", BC = "网络错误，请稍后重试", $fe = {
  helpDetail: xC,
  loading: RC,
  viewsCount: zC,
  updateTime: FC,
  noData: LC,
  missingId: HC,
  networkError: BC
}, vfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $fe,
  helpDetail: xC,
  loading: RC,
  missingId: HC,
  networkError: BC,
  noData: LC,
  updateTime: FC,
  viewsCount: zC
}, Symbol.toStringTag, { value: "Module" })), UC = "帮助中心", WC = "操作答疑", qC = "操作步骤", VC = "管理平台", GC = "佣金分成与支付", YC = "常见问题", KC = "问题分类", QC = "联系客服", XC = "没有更多内容啦~", bfe = {
  helpCenter: UC,
  operationFAQ: WC,
  operationSteps: qC,
  managementPlatform: VC,
  commissionPayment: GC,
  commonProblems: YC,
  problemCategories: KC,
  contactService: QC,
  noMoreContent: XC
}, Tfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  commissionPayment: GC,
  commonProblems: YC,
  contactService: QC,
  default: bfe,
  helpCenter: UC,
  managementPlatform: VC,
  noMoreContent: XC,
  operationFAQ: WC,
  operationSteps: qC,
  problemCategories: KC
}, Symbol.toStringTag, { value: "Module" })), JC = "机构名称", ZC = "今日收入(元)", eM = "我的账户", oM = "今日完成单量(单)", tM = "订单统计", nM = "违规申诉", rM = "我的评价", sM = "所属机构", aM = "机构信息", cM = "排班管理", iM = "请假", lM = "服务分析", dM = "服务数据", uM = "设置", pM = "工作必备", mM = "客户服务", fM = "个人资料", gM = "帮助中心", hM = "区域排名", Pfe = {
  storeName: JC,
  todayMoney: ZC,
  myAccount: eM,
  orderFinshNumber: oM,
  orderNumber: tM,
  ViolationAppeal: nM,
  MyReview: rM,
  store: sM,
  storeInfo: aM,
  workTime: cM,
  levalWork: iM,
  ServiceAnalysis: lM,
  servicesData: dM,
  set: uM,
  workTools: pM,
  kefuServices: mM,
  memberInfo: fM,
  helpCenter: gM,
  areaData: hM
}, Sfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MyReview: rM,
  ServiceAnalysis: lM,
  ViolationAppeal: nM,
  areaData: hM,
  default: Pfe,
  helpCenter: gM,
  kefuServices: mM,
  levalWork: iM,
  memberInfo: fM,
  myAccount: eM,
  orderFinshNumber: oM,
  orderNumber: tM,
  servicesData: dM,
  set: uM,
  store: sM,
  storeInfo: aM,
  storeName: JC,
  todayMoney: ZC,
  workTime: cM,
  workTools: pM
}, Symbol.toStringTag, { value: "Module" })), _M = "已评价", yM = "综合", $M = "时间", vM = "暂无评价", bM = "发布于", TM = "服务信息", PM = "评价内容", SM = "加载失败", Ofe = {
  evaluated: _M,
  comprehensive: yM,
  time: $M,
  noEvaluation: vM,
  published: bM,
  serviceInfo: TM,
  evaluationContent: PM,
  loadFailed: SM
}, wfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  comprehensive: yM,
  default: Ofe,
  evaluated: _M,
  evaluationContent: PM,
  loadFailed: SM,
  noEvaluation: vM,
  published: bM,
  serviceInfo: TM,
  time: $M
}, Symbol.toStringTag, { value: "Module" })), OM = "订单统计", wM = "今日订单", CM = "月订单", MM = "待服务订单", AM = "待验收订单", jM = "已完成订单", kM = "订单明细", IM = "已完成", NM = "退款/售后", DM = "已关闭", EM = "开锁服务", xM = "订单编号：", Cfe = {
  title: OM,
  todayOrders: wM,
  monthOrders: CM,
  pendingService: MM,
  pendingAcceptance: AM,
  completedOrders: jM,
  orderDetails: kM,
  completed: IM,
  refund: NM,
  cancelled: DM,
  serviceType: EM,
  orderNumber: xM
}, Mfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelled: DM,
  completed: IM,
  completedOrders: jM,
  default: Cfe,
  monthOrders: CM,
  orderDetails: kM,
  orderNumber: xM,
  pendingAcceptance: AM,
  pendingService: MM,
  refund: NM,
  serviceType: EM,
  title: OM,
  todayOrders: wM
}, Symbol.toStringTag, { value: "Module" })), RM = "区域师傅排名", zM = "机构师傅排名", FM = "加载中...", Afe = {
  regionTechnicianRank: RM,
  storeTechnicianRank: zM,
  loading: FM
}, jfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Afe,
  loading: FM,
  regionTechnicianRank: RM,
  storeTechnicianRank: zM
}, Symbol.toStringTag, { value: "Module" })), LM = "排班管理", HM = "排班管理日历", BM = "休息时间安排", UM = "开始时间", WM = "结束时间", qM = "请假原因", VM = "个人事务", GM = "身体不适", YM = "家庭原因", KM = "其他原因", QM = "培训学习", XM = "临时有事", JM = "取消", ZM = "确定", eA = "日", oA = "一", tA = "二", nA = "三", rA = "四", sA = "五", aA = "六", kfe = {
  title: LM,
  calendarTitle: HM,
  restTimeArrangement: BM,
  startTime: UM,
  endTime: WM,
  leaveReason: qM,
  personalAffairs: VM,
  physicalDiscomfort: GM,
  familyReason: YM,
  otherReason: KM,
  trainingStudy: QM,
  temporaryMatter: XM,
  cancel: JM,
  confirm: ZM,
  sunday: eA,
  monday: oA,
  tuesday: tA,
  wednesday: nA,
  thursday: rA,
  friday: sA,
  saturday: aA
}, Ife = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calendarTitle: HM,
  cancel: JM,
  confirm: ZM,
  default: kfe,
  endTime: WM,
  familyReason: YM,
  friday: sA,
  leaveReason: qM,
  monday: oA,
  otherReason: KM,
  personalAffairs: VM,
  physicalDiscomfort: GM,
  restTimeArrangement: BM,
  saturday: aA,
  startTime: UM,
  sunday: eA,
  temporaryMatter: XM,
  thursday: rA,
  title: LM,
  trainingStudy: QM,
  tuesday: tA,
  wednesday: nA
}, Symbol.toStringTag, { value: "Module" })), cA = "机构资料", iA = "基本信息", lA = "机构名称", dA = "机构人数", uA = "联系方式", pA = "负责人", mA = "联系电话", fA = "地址信息", gA = "地图加载中...", hA = "认证状态", _A = "营业执照", yA = "身份认证", $A = "地址认证", vA = "已完成", bA = "未完成", TA = "获取数据失败", Nfe = {
  pageTitle: cA,
  basicInfo: iA,
  storeName: lA,
  storeStaff: dA,
  contactInfo: uA,
  manager: pA,
  contactPhone: mA,
  addressInfo: fA,
  mapLoading: gA,
  authenticationStatus: hA,
  businessLicense: _A,
  idAuthentication: yA,
  addressAuthentication: $A,
  completed: vA,
  uncompleted: bA,
  fetchFailed: TA
}, Dfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addressAuthentication: $A,
  addressInfo: fA,
  authenticationStatus: hA,
  basicInfo: iA,
  businessLicense: _A,
  completed: vA,
  contactInfo: uA,
  contactPhone: mA,
  default: Nfe,
  fetchFailed: TA,
  idAuthentication: yA,
  manager: pA,
  mapLoading: gA,
  pageTitle: cA,
  storeName: lA,
  storeStaff: dA,
  uncompleted: bA
}, Symbol.toStringTag, { value: "Module" })), PA = "暂无数据", Efe = {
  nothingMore: PA
}, xfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Efe,
  nothingMore: PA
}, Symbol.toStringTag, { value: "Module" })), SA = "增项服务", OA = "全部", wA = "待付款", CA = "已付款", MA = "共{count}件", AA = "附加服务费用", jA = "可添加服务", kA = "添加前请与客户沟通好购买意向", IA = "已选{count}件", NA = "服务费", DA = "服务费用：", EA = "请输入", xA = "确定并提交", RA = "请输入大于0的金额", zA = "加载失败", FA = "实付款", LA = "服务费是师傅完成服务后的收入", Rfe = {
  pageTitle: SA,
  tabAll: OA,
  tabUnpaid: wA,
  tabPaid: CA,
  totalItems: MA,
  additionalServiceFee: AA,
  availableServices: jA,
  serviceCommunicationTip: kA,
  selectedItems: IA,
  serviceFee: NA,
  serviceFeeLabel: DA,
  inputPlaceholder: EA,
  submitButton: xA,
  positiveAmountError: RA,
  loadFailed: zA,
  realMoney: FA,
  serviceFeeDescription: LA
}, zfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  additionalServiceFee: AA,
  availableServices: jA,
  default: Rfe,
  inputPlaceholder: EA,
  loadFailed: zA,
  pageTitle: SA,
  positiveAmountError: RA,
  realMoney: FA,
  selectedItems: IA,
  serviceCommunicationTip: kA,
  serviceFee: NA,
  serviceFeeDescription: LA,
  serviceFeeLabel: DA,
  submitButton: xA,
  tabAll: OA,
  tabPaid: CA,
  tabUnpaid: wA,
  totalItems: MA
}, Symbol.toStringTag, { value: "Module" })), HA = "订单", BA = "下单", UA = "接单", WA = "开始", qA = "完成", VA = "已支付", GA = "未支付", YA = "查看退款", KA = "申请退款", QA = "去支付", XA = "查看", JA = "服务人员", ZA = "待派单", ej = "联系电话", oj = "服务码", tj = "注:服务人员上门时需提供", nj = "订单编号", rj = "交易流水号", sj = "创建时间", aj = "上门时间", cj = "买家留言", ij = "支付方式", lj = "支付时间", dj = "项目金额", uj = "实付", pj = "首页", mj = "刷新", fj = "客服", gj = "收藏", hj = "没有更多内容啦~", _j = "的帮付", yj = "导航", $j = "优惠金额", vj = "上门费用", bj = "单", Tj = "订单未开始服务", Pj = "服务人员已确定出发", Sj = "服务人员已打卡拍照", Oj = "查看打卡照片", wj = "服务时长总计", Cj = "预", Mj = "您有", Aj = "个订单已超时", jj = "个订单即将超时,请尽快处理!", kj = "服务项目", Ij = "备注：", Nj = "订单收入", Dj = "附加服务", Ej = "服务费", xj = "附加服务费用", Rj = "师傅完成服务后的预估收入", zj = "附加服务费用是指新增附加服务的收入", Fj = "其他信息", Lj = "复制", Hj = "未获取到订单信息", Bj = "打卡照片", Uj = "加载失败", Wj = "天", qj = "地图打开成功", Vj = "打开地图失败，请检查是否安装地图应用", Gj = "提示", Yj = "您确定要取消该订单吗？", Kj = "取消成功", Qj = "取消失败", Xj = "您确定要删除该订单吗？", Jj = "删除成功", Zj = "删除失败", ek = "待服务", ok = "服务中", tk = "已完成", nk = "异常订单", rk = "服务费是师傅完成服务后的收入", Ffe = {
  order: HA,
  placeOrder: BA,
  takeOrders: UA,
  start: WA,
  finish: qA,
  havePaid: VA,
  notPaid: GA,
  viewRefund: YA,
  applyRefund: KA,
  goToPay: QA,
  show: XA,
  servicePersonal: JA,
  orderToBeSent: ZA,
  contactNumber: ej,
  serviceCode: oj,
  explain: tj,
  onOrder: nj,
  transactionNumber: rj,
  createTime: sj,
  reserveServiceTime: aj,
  remark: cj,
  modePayment: ij,
  payTime: lj,
  goodsMoney: dj,
  realMoney: uj,
  index: pj,
  refresh: mj,
  service: fj,
  collect: gj,
  nothingMore: hj,
  helpPay: _j,
  Navigation: yj,
  couponMoney: $j,
  doorMonrey: vj,
  orderUnit: bj,
  orderNotStarted: Tj,
  servicePersonDeparted: Pj,
  servicePersonCheckedIn: Sj,
  viewCheckInPhotos: Oj,
  totalServiceDuration: wj,
  pre: Cj,
  youHave: Mj,
  ordersOverdue: Aj,
  ordersAboutToOverdue: jj,
  serviceItems: kj,
  remarkPrefix: Ij,
  orderIncome: Nj,
  additionalService: Dj,
  serviceFee: Ej,
  additionalServiceFee: xj,
  serviceFeeDesc: Rj,
  additionalServiceFeeDesc: zj,
  otherInformation: Fj,
  copy: Lj,
  noOrderInfo: Hj,
  checkInPhotos: Bj,
  loadFailed: Uj,
  day: Wj,
  mapOpenedSuccessfully: qj,
  mapOpenFailed: Vj,
  prompt: Gj,
  confirmCancelOrder: Yj,
  cancelSuccess: Kj,
  cancelFailed: Qj,
  confirmDeleteOrder: Xj,
  deleteSuccess: Jj,
  deleteFailed: Zj,
  waitingService: ek,
  inService: ok,
  completed: tk,
  abnormalOrder: nk,
  serviceFeeDescription: rk
}, Lfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: yj,
  abnormalOrder: nk,
  additionalService: Dj,
  additionalServiceFee: xj,
  additionalServiceFeeDesc: zj,
  applyRefund: KA,
  cancelFailed: Qj,
  cancelSuccess: Kj,
  checkInPhotos: Bj,
  collect: gj,
  completed: tk,
  confirmCancelOrder: Yj,
  confirmDeleteOrder: Xj,
  contactNumber: ej,
  copy: Lj,
  couponMoney: $j,
  createTime: sj,
  day: Wj,
  default: Ffe,
  deleteFailed: Zj,
  deleteSuccess: Jj,
  doorMonrey: vj,
  explain: tj,
  finish: qA,
  goToPay: QA,
  goodsMoney: dj,
  havePaid: VA,
  helpPay: _j,
  inService: ok,
  index: pj,
  loadFailed: Uj,
  mapOpenFailed: Vj,
  mapOpenedSuccessfully: qj,
  modePayment: ij,
  noOrderInfo: Hj,
  notPaid: GA,
  nothingMore: hj,
  onOrder: nj,
  order: HA,
  orderIncome: Nj,
  orderNotStarted: Tj,
  orderToBeSent: ZA,
  orderUnit: bj,
  ordersAboutToOverdue: jj,
  ordersOverdue: Aj,
  otherInformation: Fj,
  payTime: lj,
  placeOrder: BA,
  pre: Cj,
  prompt: Gj,
  realMoney: uj,
  refresh: mj,
  remark: cj,
  remarkPrefix: Ij,
  reserveServiceTime: aj,
  service: fj,
  serviceCode: oj,
  serviceFee: Ej,
  serviceFeeDesc: Rj,
  serviceFeeDescription: rk,
  serviceItems: kj,
  servicePersonCheckedIn: Sj,
  servicePersonDeparted: Pj,
  servicePersonal: JA,
  show: XA,
  start: WA,
  takeOrders: UA,
  totalServiceDuration: wj,
  transactionNumber: rj,
  viewCheckInPhotos: Oj,
  viewRefund: YA,
  waitingService: ek,
  youHave: Mj
}, Symbol.toStringTag, { value: "Module" })), sk = "订单", ak = "下单", ck = "接单", ik = "开始", lk = "完成", dk = "已支付", uk = "未支付", pk = "查看退款", mk = "申请退款", fk = "去支付", gk = "查看", hk = "服务人员", _k = "待派单", yk = "联系电话", $k = "服务码", vk = "注:服务人员上门时需提供", bk = "订单编号", Tk = "交易流水号", Pk = "创建时间", Sk = "上门时间", Ok = "买家留言", wk = "支付方式", Ck = "支付时间", Mk = "项目金额", Ak = "实付", jk = "首页", kk = "刷新", Ik = "客服", Nk = "收藏", Dk = "没有更多内容啦~", Ek = "的帮付", xk = "导航", Rk = "优惠金额", zk = "上门费用", Fk = "单", Lk = "订单未开始服务", Hk = "服务人员已确定出发", Bk = "服务人员已打卡拍照", Uk = "查看打卡照片", Wk = "服务时长总计", qk = "预", Vk = "您有", Gk = "个订单已超时", Yk = "个订单即将超时,请尽快处理!", Kk = "服务项目", Qk = "备注：", Xk = "订单收入", Jk = "附加服务", Zk = "服务费", eI = "附加服务费用", oI = "师傅完成服务后的预估收入", tI = "附加服务费用是指新增附加服务的收入", nI = "其他信息", rI = "复制", sI = "未获取到订单信息", aI = "打卡照片", cI = "加载失败", iI = "天", lI = "地图打开成功", dI = "打开地图失败，请检查是否安装地图应用", uI = "提示", pI = "您确定要取消该订单吗？", mI = "取消成功", fI = "取消失败", gI = "您确定要删除该订单吗？", hI = "删除成功", _I = "删除失败", yI = "待服务", $I = "服务中", vI = "已完成", bI = "异常订单", TI = "服务费是师傅完成服务后的收入", Hfe = {
  order: sk,
  placeOrder: ak,
  takeOrders: ck,
  start: ik,
  finish: lk,
  havePaid: dk,
  notPaid: uk,
  viewRefund: pk,
  applyRefund: mk,
  goToPay: fk,
  show: gk,
  servicePersonal: hk,
  orderToBeSent: _k,
  contactNumber: yk,
  serviceCode: $k,
  explain: vk,
  onOrder: bk,
  transactionNumber: Tk,
  createTime: Pk,
  reserveServiceTime: Sk,
  remark: Ok,
  modePayment: wk,
  payTime: Ck,
  goodsMoney: Mk,
  realMoney: Ak,
  index: jk,
  refresh: kk,
  service: Ik,
  collect: Nk,
  nothingMore: Dk,
  helpPay: Ek,
  Navigation: xk,
  couponMoney: Rk,
  doorMonrey: zk,
  orderUnit: Fk,
  orderNotStarted: Lk,
  servicePersonDeparted: Hk,
  servicePersonCheckedIn: Bk,
  viewCheckInPhotos: Uk,
  totalServiceDuration: Wk,
  pre: qk,
  youHave: Vk,
  ordersOverdue: Gk,
  ordersAboutToOverdue: Yk,
  serviceItems: Kk,
  remarkPrefix: Qk,
  orderIncome: Xk,
  additionalService: Jk,
  serviceFee: Zk,
  additionalServiceFee: eI,
  serviceFeeDesc: oI,
  additionalServiceFeeDesc: tI,
  otherInformation: nI,
  copy: rI,
  noOrderInfo: sI,
  checkInPhotos: aI,
  loadFailed: cI,
  day: iI,
  mapOpenedSuccessfully: lI,
  mapOpenFailed: dI,
  prompt: uI,
  confirmCancelOrder: pI,
  cancelSuccess: mI,
  cancelFailed: fI,
  confirmDeleteOrder: gI,
  deleteSuccess: hI,
  deleteFailed: _I,
  waitingService: yI,
  inService: $I,
  completed: vI,
  abnormalOrder: bI,
  serviceFeeDescription: TI
}, Bfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: xk,
  abnormalOrder: bI,
  additionalService: Jk,
  additionalServiceFee: eI,
  additionalServiceFeeDesc: tI,
  applyRefund: mk,
  cancelFailed: fI,
  cancelSuccess: mI,
  checkInPhotos: aI,
  collect: Nk,
  completed: vI,
  confirmCancelOrder: pI,
  confirmDeleteOrder: gI,
  contactNumber: yk,
  copy: rI,
  couponMoney: Rk,
  createTime: Pk,
  day: iI,
  default: Hfe,
  deleteFailed: _I,
  deleteSuccess: hI,
  doorMonrey: zk,
  explain: vk,
  finish: lk,
  goToPay: fk,
  goodsMoney: Mk,
  havePaid: dk,
  helpPay: Ek,
  inService: $I,
  index: jk,
  loadFailed: cI,
  mapOpenFailed: dI,
  mapOpenedSuccessfully: lI,
  modePayment: wk,
  noOrderInfo: sI,
  notPaid: uk,
  nothingMore: Dk,
  onOrder: bk,
  order: sk,
  orderIncome: Xk,
  orderNotStarted: Lk,
  orderToBeSent: _k,
  orderUnit: Fk,
  ordersAboutToOverdue: Yk,
  ordersOverdue: Gk,
  otherInformation: nI,
  payTime: Ck,
  placeOrder: ak,
  pre: qk,
  prompt: uI,
  realMoney: Ak,
  refresh: kk,
  remark: Ok,
  remarkPrefix: Qk,
  reserveServiceTime: Sk,
  service: Ik,
  serviceCode: $k,
  serviceFee: Zk,
  serviceFeeDesc: oI,
  serviceFeeDescription: TI,
  serviceItems: Kk,
  servicePersonCheckedIn: Bk,
  servicePersonDeparted: Hk,
  servicePersonal: hk,
  show: gk,
  start: ik,
  takeOrders: ck,
  totalServiceDuration: Wk,
  transactionNumber: Tk,
  viewCheckInPhotos: Uk,
  viewRefund: pk,
  waitingService: yI,
  youHave: Vk
}, Symbol.toStringTag, { value: "Module" })), PI = "订单", SI = "下单", OI = "接单", wI = "开始", CI = "完成", MI = "已支付", AI = "未支付", jI = "查看退款", kI = "申请退款", II = "去支付", NI = "查看", DI = "服务人员", EI = "待派单", xI = "联系电话", RI = "服务码", zI = "注:服务人员上门时需提供", FI = "订单编号", LI = "交易流水号", HI = "创建时间", BI = "上门时间", UI = "买家留言", WI = "支付方式", qI = "支付时间", VI = "项目金额", GI = "实付", YI = "首页", KI = "刷新", QI = "客服", XI = "收藏", JI = "没有更多内容啦~", ZI = "的帮付", eN = "导航", oN = "优惠金额", tN = "上门费用", nN = "单", rN = "订单未开始服务", sN = "服务人员已确定出发", aN = "服务人员已打卡拍照", cN = "查看打卡照片", iN = "服务时长总计", lN = "预", dN = "您有", uN = "个订单已超时", pN = "个订单即将超时,请尽快处理!", mN = "服务项目", fN = "备注：", gN = "订单收入", hN = "附加服务", _N = "服务费", yN = "附加服务费用", $N = "师傅完成服务后的预估收入", vN = "附加服务费用是指新增附加服务的收入", bN = "其他信息", TN = "复制", PN = "未获取到订单信息", SN = "打卡照片", ON = "加载失败", wN = "天", CN = "地图打开成功", MN = "打开地图失败，请检查是否安装地图应用", AN = "提示", jN = "您确定要取消该订单吗？", kN = "取消成功", IN = "取消失败", NN = "您确定要删除该订单吗？", DN = "删除成功", EN = "删除失败", xN = "待服务", RN = "服务中", zN = "已完成", FN = "异常订单", LN = "服务费是师傅完成服务后的收入", Ufe = {
  order: PI,
  placeOrder: SI,
  takeOrders: OI,
  start: wI,
  finish: CI,
  havePaid: MI,
  notPaid: AI,
  viewRefund: jI,
  applyRefund: kI,
  goToPay: II,
  show: NI,
  servicePersonal: DI,
  orderToBeSent: EI,
  contactNumber: xI,
  serviceCode: RI,
  explain: zI,
  onOrder: FI,
  transactionNumber: LI,
  createTime: HI,
  reserveServiceTime: BI,
  remark: UI,
  modePayment: WI,
  payTime: qI,
  goodsMoney: VI,
  realMoney: GI,
  index: YI,
  refresh: KI,
  service: QI,
  collect: XI,
  nothingMore: JI,
  helpPay: ZI,
  Navigation: eN,
  couponMoney: oN,
  doorMonrey: tN,
  orderUnit: nN,
  orderNotStarted: rN,
  servicePersonDeparted: sN,
  servicePersonCheckedIn: aN,
  viewCheckInPhotos: cN,
  totalServiceDuration: iN,
  pre: lN,
  youHave: dN,
  ordersOverdue: uN,
  ordersAboutToOverdue: pN,
  serviceItems: mN,
  remarkPrefix: fN,
  orderIncome: gN,
  additionalService: hN,
  serviceFee: _N,
  additionalServiceFee: yN,
  serviceFeeDesc: $N,
  additionalServiceFeeDesc: vN,
  otherInformation: bN,
  copy: TN,
  noOrderInfo: PN,
  checkInPhotos: SN,
  loadFailed: ON,
  day: wN,
  mapOpenedSuccessfully: CN,
  mapOpenFailed: MN,
  prompt: AN,
  confirmCancelOrder: jN,
  cancelSuccess: kN,
  cancelFailed: IN,
  confirmDeleteOrder: NN,
  deleteSuccess: DN,
  deleteFailed: EN,
  waitingService: xN,
  inService: RN,
  completed: zN,
  abnormalOrder: FN,
  serviceFeeDescription: LN
}, Wfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: eN,
  abnormalOrder: FN,
  additionalService: hN,
  additionalServiceFee: yN,
  additionalServiceFeeDesc: vN,
  applyRefund: kI,
  cancelFailed: IN,
  cancelSuccess: kN,
  checkInPhotos: SN,
  collect: XI,
  completed: zN,
  confirmCancelOrder: jN,
  confirmDeleteOrder: NN,
  contactNumber: xI,
  copy: TN,
  couponMoney: oN,
  createTime: HI,
  day: wN,
  default: Ufe,
  deleteFailed: EN,
  deleteSuccess: DN,
  doorMonrey: tN,
  explain: zI,
  finish: CI,
  goToPay: II,
  goodsMoney: VI,
  havePaid: MI,
  helpPay: ZI,
  inService: RN,
  index: YI,
  loadFailed: ON,
  mapOpenFailed: MN,
  mapOpenedSuccessfully: CN,
  modePayment: WI,
  noOrderInfo: PN,
  notPaid: AI,
  nothingMore: JI,
  onOrder: FI,
  order: PI,
  orderIncome: gN,
  orderNotStarted: rN,
  orderToBeSent: EI,
  orderUnit: nN,
  ordersAboutToOverdue: pN,
  ordersOverdue: uN,
  otherInformation: bN,
  payTime: qI,
  placeOrder: SI,
  pre: lN,
  prompt: AN,
  realMoney: GI,
  refresh: KI,
  remark: UI,
  remarkPrefix: fN,
  reserveServiceTime: BI,
  service: QI,
  serviceCode: RI,
  serviceFee: _N,
  serviceFeeDesc: $N,
  serviceFeeDescription: LN,
  serviceItems: mN,
  servicePersonCheckedIn: aN,
  servicePersonDeparted: sN,
  servicePersonal: DI,
  show: NI,
  start: wI,
  takeOrders: OI,
  totalServiceDuration: iN,
  transactionNumber: LI,
  viewCheckInPhotos: cN,
  viewRefund: jI,
  waitingService: xN,
  youHave: dN
}, Symbol.toStringTag, { value: "Module" })), HN = "新任务", BN = "筛选", UN = "刷新", WN = "重置", qN = "收入", VN = "服务类型", GN = "服务距离", YN = "确定", KN = "我要抢单", QN = "订单编号", XN = "订单收入", JN = "预估收入", ZN = "客户", eD = "服务", oD = "导航", tD = "确定出发", nD = "开始服务", rD = "打卡", sD = "附加服务", aD = "结束服务", cD = "暂无数据", qfe = {
  newJob: HN,
  sort: BN,
  calcation: UN,
  reset: WN,
  money: qN,
  serviceType: VN,
  serviceDistance: GN,
  confrim: YN,
  getOrder: KN,
  orderNoTit: QN,
  orderCommsion: XN,
  ProjectedRevenue: JN,
  user: ZN,
  services: eD,
  Navigation: oD,
  confirmGoOut: tD,
  speakServices: nD,
  callCard: rD,
  addServices: sD,
  endServices: aD,
  nothingMore: cD
}, Vfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: oD,
  ProjectedRevenue: JN,
  addServices: sD,
  calcation: UN,
  callCard: rD,
  confirmGoOut: tD,
  confrim: YN,
  default: qfe,
  endServices: aD,
  getOrder: KN,
  money: qN,
  newJob: HN,
  nothingMore: cD,
  orderCommsion: XN,
  orderNoTit: QN,
  reset: WN,
  serviceDistance: GN,
  serviceType: VN,
  services: eD,
  sort: BN,
  speakServices: nD,
  user: ZN
}, Symbol.toStringTag, { value: "Module" })), iD = "联系人", lD = "请输入联系人姓名", dD = "手机号码", uD = "请输入手机号码", pD = "请输入正确的手机号", mD = "选择地区", fD = "请选择地区", gD = "详细地址", hD = "请填写详细地址", _D = "设为默认地址", yD = "没有更多内容啦~", Gfe = {
  name: iD,
  namePlaceholder: lD,
  mobile: dD,
  mobilePlaceholder: uD,
  mobileError: pD,
  selectArea: mD,
  selectAreaPlaceholder: fD,
  address: gD,
  addressPlaceholder: hD,
  defaultAddress: _D,
  nothingMore: yD
}, Yfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: gD,
  addressPlaceholder: hD,
  default: Gfe,
  defaultAddress: _D,
  mobile: dD,
  mobileError: pD,
  mobilePlaceholder: uD,
  name: iD,
  namePlaceholder: lD,
  nothingMore: yD,
  selectArea: mD,
  selectAreaPlaceholder: fD
}, Symbol.toStringTag, { value: "Module" })), $D = "联系人", vD = "请输入联系人姓名", bD = "手机号码", TD = "请输入手机号码", PD = "上门地址", SD = "选择地址", OD = "请选择地址", wD = "详细地址", CD = "详细地址如 1单元101", MD = "请填写门牌号", AD = "设为默认地址", jD = "修改", kD = "保存", ID = "没有更多内容啦~", Kfe = {
  name: $D,
  namePlaceholder: vD,
  mobile: bD,
  mobilePlaceholder: TD,
  homeAddress: PD,
  selectAddress: SD,
  selectAddressPlaceholder: OD,
  address: wD,
  addressPlaceholder: CD,
  addressError: MD,
  defaultAddress: AD,
  update: jD,
  save: kD,
  nothingMore: ID
}, Qfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: wD,
  addressError: MD,
  addressPlaceholder: CD,
  default: Kfe,
  defaultAddress: AD,
  homeAddress: PD,
  mobile: bD,
  mobilePlaceholder: TD,
  name: $D,
  namePlaceholder: vD,
  nothingMore: ID,
  save: kD,
  selectAddress: SD,
  selectAddressPlaceholder: OD,
  update: jD
}, Symbol.toStringTag, { value: "Module" })), ND = "没有更多内容啦~", DD = "添加上门地址", Xfe = {
  default: "默认地址",
  noHomeAddress: ND,
  addHomeAddress: DD
}, Jfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: DD,
  default: Xfe,
  noHomeAddress: ND
}, Symbol.toStringTag, { value: "Module" })), ED = "人选择", xD = "已选", RD = "次", zD = "暂无项目介绍", FD = "暂无购买须知", LD = "暂无更多数据", HD = "项目名称", BD = "价格", UD = "单位", WD = "暂无价目表", qD = "首页", VD = "分享", GD = "客服", YD = "立即预约", KD = "立即购买", QD = "已下架", XD = "没有更多内容啦~", JD = "随叫随到，最快30分钟上门", ZD = "服务保障", eE = "附近服务人员", oE = "查看", tE = "用户评价", nE = "推荐套餐", rE = "项目详情", sE = "单独购买", Zfe = {
  selectNum: ED,
  selected: xD,
  time: RD,
  noProjectInt: zD,
  noPurchase: FD,
  noMore: LD,
  projectName: HD,
  price: BD,
  unit: UD,
  noPriceList: WD,
  index: qD,
  share: VD,
  service: GD,
  bookNow: YD,
  orderNow: KD,
  delisted: QD,
  nothingMore: XD,
  timeWarning: JD,
  serviceSafe: ZD,
  serviceTechnican: eE,
  lookMore: oE,
  userEvaluate: tE,
  recommedGoods: nE,
  detailText: rE,
  selfBuy: sE
}, ege = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: YD,
  default: Zfe,
  delisted: QD,
  detailText: rE,
  index: qD,
  lookMore: oE,
  noMore: LD,
  noPriceList: WD,
  noProjectInt: zD,
  noPurchase: FD,
  nothingMore: XD,
  orderNow: KD,
  price: BD,
  projectName: HD,
  recommedGoods: nE,
  selectNum: ED,
  selected: xD,
  selfBuy: sE,
  service: GD,
  serviceSafe: ZD,
  serviceTechnican: eE,
  share: VD,
  time: RD,
  timeWarning: JD,
  unit: UD,
  userEvaluate: tE
}, Symbol.toStringTag, { value: "Module" })), aE = "我的次卡", oge = {
  myCard: aE
}, tge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: oge,
  myCard: aE
}, Symbol.toStringTag, { value: "Module" })), cE = "请输入搜索关键词", iE = "全部分类", lE = "预约", dE = "已售", uE = "没有更多内容啦~", nge = {
  searchKeywordPlaceholder: cE,
  allCategory: iE,
  reserveBtn: lE,
  soldOut: dE,
  nothingMore: uE
}, rge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: iE,
  default: nge,
  nothingMore: uE,
  reserveBtn: lE,
  searchKeywordPlaceholder: cE,
  soldOut: dE
}, Symbol.toStringTag, { value: "Module" })), pE = "人选择", mE = "已选", fE = "次", gE = "暂无项目介绍", hE = "暂无购买须知", _E = "暂无更多数据", yE = "项目名称", $E = "价格", vE = "单位", bE = "暂无价目表", TE = "首页", PE = "分享", SE = "客服", OE = "立即预约", wE = "立即购买", CE = "已下架", ME = "没有更多内容啦~", AE = "随叫随到 最快30分钟上门", jE = "服务保障", kE = "附近服务人员", IE = "查看", NE = "用户评价", DE = "推荐套餐", EE = "项目详情", xE = "单独购买", sge = {
  selectNum: pE,
  selected: mE,
  time: fE,
  noProjectInt: gE,
  noPurchase: hE,
  noMore: _E,
  projectName: yE,
  price: $E,
  unit: vE,
  noPriceList: bE,
  index: TE,
  share: PE,
  service: SE,
  bookNow: OE,
  orderNow: wE,
  delisted: CE,
  nothingMore: ME,
  timeWarning: AE,
  serviceSafe: jE,
  serviceTechnican: kE,
  lookMore: IE,
  userEvaluate: NE,
  recommedGoods: DE,
  detailText: EE,
  selfBuy: xE
}, age = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: OE,
  default: sge,
  delisted: CE,
  detailText: EE,
  index: TE,
  lookMore: IE,
  noMore: _E,
  noPriceList: bE,
  noProjectInt: gE,
  noPurchase: hE,
  nothingMore: ME,
  orderNow: wE,
  price: $E,
  projectName: yE,
  recommedGoods: DE,
  selectNum: pE,
  selected: mE,
  selfBuy: xE,
  service: SE,
  serviceSafe: jE,
  serviceTechnican: kE,
  share: PE,
  time: fE,
  timeWarning: AE,
  unit: vE,
  userEvaluate: NE
}, Symbol.toStringTag, { value: "Module" })), RE = "没有更多内容啦~", zE = "请搜索您想要的商品", FE = "综合", LE = "销量", HE = "价格", BE = "筛选", UE = "全部分类", WE = "已售", qE = "没有更多内容啦~", cge = {
  end: RE,
  searchPlaceholder: zE,
  synthesis: FE,
  sales: LE,
  price: HE,
  screen: BE,
  allCategory: UE,
  soldOut: WE,
  nothingMore: qE
}, ige = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: UE,
  default: cge,
  end: RE,
  nothingMore: qE,
  price: HE,
  sales: LE,
  screen: BE,
  searchPlaceholder: zE,
  soldOut: WE,
  synthesis: FE
}, Symbol.toStringTag, { value: "Module" })), VE = "请输入搜索关键词", GE = "抢购", YE = "没有更多内容啦~", KE = "没有更多内容啦~", QE = "已售", XE = "订单号", JE = "实付款", ZE = "详情", lge = {
  searchNamePlaceholder: VE,
  reserveBtn: GE,
  nothingMore: YE,
  noHomeAddress: KE,
  soldOut: QE,
  orderNo: XE,
  actualPayment: JE,
  orderDetail: ZE
}, dge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: JE,
  default: lge,
  noHomeAddress: KE,
  nothingMore: YE,
  orderDetail: ZE,
  orderNo: XE,
  reserveBtn: GE,
  searchNamePlaceholder: VE,
  soldOut: QE
}, Symbol.toStringTag, { value: "Module" })), ex = "订单数(个)", ox = "订单金额(元)", tx = "订单管理", nx = "查看更多", rx = "待服务订单", sx = "服务中订单", ax = "已服务订单", cx = "数量：", ix = "查看详情", lx = "服务项目", dx = "加载中", ux = "没有更多内容啦~", uge = {
  orderNum: ex,
  orderAmount: ox,
  orderManagement: tx,
  viewMore: nx,
  pendingOrder: rx,
  orderInService: sx,
  finishedOrder: ax,
  amount: cx,
  viewDetails: ix,
  serviceItem: lx,
  loadingText: dx,
  nothingMore: ux
}, pge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amount: cx,
  default: uge,
  finishedOrder: ax,
  loadingText: dx,
  nothingMore: ux,
  orderAmount: ox,
  orderInService: sx,
  orderManagement: tx,
  orderNum: ex,
  pendingOrder: rx,
  serviceItem: lx,
  viewDetails: ix,
  viewMore: nx
}, Symbol.toStringTag, { value: "Module" })), px = "添加服务项目", mx = "编辑服务项目", fx = "服务项目", gx = "请输入服务项目", hx = "价格", _x = "请输入价格", yx = "元", $x = "项目图片", vx = "提交", bx = "加载中...", Tx = "没有更多内容啦~", mge = {
  addServiceItem: px,
  editServiceItem: mx,
  serviceItem: fx,
  serviceItemPlaceholder: gx,
  price: hx,
  pricePlaceholder: _x,
  yuan: yx,
  serviceImg: $x,
  save: vx,
  loading: bx,
  nothingMore: Tx
}, fge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: px,
  default: mge,
  editServiceItem: mx,
  loading: bx,
  nothingMore: Tx,
  price: hx,
  pricePlaceholder: _x,
  save: vx,
  serviceImg: $x,
  serviceItem: fx,
  serviceItemPlaceholder: gx,
  yuan: yx
}, Symbol.toStringTag, { value: "Module" })), Px = "下单", Sx = "接单", Ox = "开始", wx = "完成", Cx = "服务日期:", Mx = "新增服务项目", Ax = "已支付", jx = "未支付", kx = "去支付", Ix = "查看", Nx = "编辑", Dx = "订单信息", Ex = "订单编号", xx = "联系人姓名", Rx = "联系电话", zx = "备注", Fx = "首页", Lx = "联系客户", Hx = "刷新", Bx = "服务码", Ux = "没有更多内容啦~", Wx = "查看退款", gge = {
  placeOrder: Px,
  takeOrders: Sx,
  start: Ox,
  finish: wx,
  serviceDate: Cx,
  addServiceItem: Mx,
  havePaid: Ax,
  notPaid: jx,
  goToPay: kx,
  show: Ix,
  edit: Nx,
  delete: "删除",
  orderInfo: Dx,
  orderNo: Ex,
  person: xx,
  personTel: Rx,
  remark: zx,
  index: Fx,
  contact: Lx,
  refresh: Hx,
  checkCode: Bx,
  nothingMore: Ux,
  viewRefund: Wx
}, hge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: Mx,
  checkCode: Bx,
  contact: Lx,
  default: gge,
  edit: Nx,
  finish: wx,
  goToPay: kx,
  havePaid: Ax,
  index: Fx,
  notPaid: jx,
  nothingMore: Ux,
  orderInfo: Dx,
  orderNo: Ex,
  person: xx,
  personTel: Rx,
  placeOrder: Px,
  refresh: Hx,
  remark: zx,
  serviceDate: Cx,
  show: Ix,
  start: Ox,
  takeOrders: Sx,
  viewRefund: Wx
}, Symbol.toStringTag, { value: "Module" })), qx = "服务日期:", Vx = "已支付", Gx = "未支付", Yx = "联系客户", Kx = "服务码", Qx = "没有更多内容啦~", _ge = {
  serviceDate: qx,
  havePaid: Vx,
  notPaid: Gx,
  contact: Yx,
  checkCode: Kx,
  nothingMore: Qx
}, yge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkCode: Kx,
  contact: Yx,
  default: _ge,
  havePaid: Vx,
  notPaid: Gx,
  nothingMore: Qx,
  serviceDate: qx
}, Symbol.toStringTag, { value: "Module" })), Xx = "退款方式", Jx = "退款原因", Zx = "退款编号", e2 = "申请时间", o2 = "退款说明", t2 = "查看", n2 = "退款金额", r2 = "凭证", s2 = "没有更多内容啦~", $ge = {
  refundType: Xx,
  refundCause: Jx,
  refundNo: Zx,
  createTime: e2,
  createExplain: o2,
  check: t2,
  refundMoney: n2,
  voucher: r2,
  nothingMore: s2
}, vge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  check: t2,
  createExplain: o2,
  createTime: e2,
  default: $ge,
  nothingMore: s2,
  refundCause: Jx,
  refundMoney: n2,
  refundNo: Zx,
  refundType: Xx,
  voucher: r2
}, Symbol.toStringTag, { value: "Module" })), a2 = "查看服务项目", c2 = "服务项目", i2 = "价格", l2 = "元", d2 = "项目图片", u2 = "加载中...", p2 = "没有更多内容啦~", bge = {
  showServiceItem: a2,
  serviceItem: c2,
  price: i2,
  yuan: l2,
  serviceImg: d2,
  loading: u2,
  nothingMore: p2
}, Tge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bge,
  loading: u2,
  nothingMore: p2,
  price: i2,
  serviceImg: d2,
  serviceItem: c2,
  showServiceItem: a2,
  yuan: l2
}, Symbol.toStringTag, { value: "Module" })), m2 = "我的收藏", f2 = "商品收藏", g2 = "师傅收藏", h2 = "售", _2 = "取消收藏成功", y2 = "取消收藏失败", $2 = "工作中", v2 = "休息中", b2 = "服务单", Pge = {
  pageTitle: m2,
  goodsCollect: f2,
  technicianCollect: g2,
  sold: h2,
  delete: "删除",
  cancelCollectSuccess: _2,
  cancelCollectFail: y2,
  working: $2,
  resting: v2,
  serviceOrder: b2
}, Sge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelCollectFail: y2,
  cancelCollectSuccess: _2,
  default: Pge,
  goodsCollect: f2,
  pageTitle: m2,
  resting: v2,
  serviceOrder: b2,
  sold: h2,
  technicianCollect: g2,
  working: $2
}, Symbol.toStringTag, { value: "Module" })), T2 = "我的收藏", P2 = "商品收藏", S2 = "师傅收藏", O2 = "售", w2 = "取消收藏成功", C2 = "取消收藏失败", M2 = "工作中", A2 = "休息中", j2 = "服务{num}单", Oge = {
  pageTitle: T2,
  goodsCollect: P2,
  technicianCollect: S2,
  sold: O2,
  delete: "删除",
  cancelCollectSuccess: w2,
  cancelCollectFail: C2,
  working: M2,
  resting: A2,
  serviceOrder: j2
}, wge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelCollectFail: C2,
  cancelCollectSuccess: w2,
  default: Oge,
  goodsCollect: P2,
  pageTitle: T2,
  resting: A2,
  serviceOrder: j2,
  sold: O2,
  technicianCollect: S2,
  working: M2
}, Symbol.toStringTag, { value: "Module" })), k2 = "反馈标题", I2 = "反馈内容", N2 = "上传图片（选填）", D2 = "提交反馈", E2 = "请输入反馈标题", x2 = "请详细描述您遇到的问题或建议", R2 = "反馈内容请至少输入10个字符", z2 = "反馈提交成功，感谢您的建议", F2 = "反馈提交失败", L2 = "网络错误，请稍后重试", Cge = {
  feedbackTitle: k2,
  feedbackContent: I2,
  uploadImage: N2,
  submitFeedback: D2,
  pleaseInputFeedbackTitle: E2,
  pleaseDescribeIssue: x2,
  feedbackContentMinLength: R2,
  feedbackSubmitSuccess: z2,
  feedbackSubmitFail: F2,
  networkError: L2
}, Mge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cge,
  feedbackContent: I2,
  feedbackContentMinLength: R2,
  feedbackSubmitFail: F2,
  feedbackSubmitSuccess: z2,
  feedbackTitle: k2,
  networkError: L2,
  pleaseDescribeIssue: x2,
  pleaseInputFeedbackTitle: E2,
  submitFeedback: D2,
  uploadImage: N2
}, Symbol.toStringTag, { value: "Module" })), H2 = "帮助详情", B2 = "加载中...", U2 = "浏览次数", W2 = "更新时间", q2 = "暂无数据", V2 = "缺少帮助文档ID", G2 = "网络错误，请稍后重试", Age = {
  helpDetail: H2,
  loading: B2,
  viewsCount: U2,
  updateTime: W2,
  noData: q2,
  missingId: V2,
  networkError: G2
}, jge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Age,
  helpDetail: H2,
  loading: B2,
  missingId: V2,
  networkError: G2,
  noData: q2,
  updateTime: W2,
  viewsCount: U2
}, Symbol.toStringTag, { value: "Module" })), Y2 = "帮助中心", K2 = "操作答疑", Q2 = "操作步骤", X2 = "管理平台", J2 = "佣金分成与支付", Z2 = "常见问题", eR = "问题分类", oR = "联系客服", tR = "没有更多内容啦~", kge = {
  helpCenter: Y2,
  operationFAQ: K2,
  operationSteps: Q2,
  managementPlatform: X2,
  commissionPayment: J2,
  commonProblems: Z2,
  problemCategories: eR,
  contactService: oR,
  noMoreContent: tR
}, Ige = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  commissionPayment: J2,
  commonProblems: Z2,
  contactService: oR,
  default: kge,
  helpCenter: Y2,
  managementPlatform: X2,
  noMoreContent: tR,
  operationFAQ: K2,
  operationSteps: Q2,
  problemCategories: eR
}, Symbol.toStringTag, { value: "Module" })), nR = {
  apply: "申请发票",
  list: "发票列表",
  detail: "发票详情"
}, rR = "抬头类型", sR = "企业", aR = "个人", cR = "发票抬头", iR = "税号", lR = "发票类型", dR = "发票内容", uR = "发票金额", pR = "邮箱地址", mR = "备注信息", fR = "提交申请", gR = "电话", hR = "注册地址", _R = "银行名称", yR = "银行账号", $R = "更多信息", vR = "备注信息", bR = "取消", TR = "开票详情", PR = "接收方式", SR = "提交电子发票", OR = "请至少选择一项发票内容", wR = "发票金额包含上门服务订单金额与附加费用总额，不包含交通费、高速费、停车费。", CR = {
  pleaseInputHeader: "请输入发票抬头",
  pleaseInputTaxNumber: "请输入税号",
  pleaseInputEmail: "请输入邮箱地址",
  invalidEmail: "请输入正确的邮箱地址",
  success: "申请成功",
  failed: "申请失败",
  networkError: "网络错误，请重试"
}, MR = {
  inputHeader: "填写发票抬头",
  inputTaxNumber: "填写纳税人识别号",
  inputTelephone: "请输入电话（选填）",
  inputAddress: "请输入注册地址（选填）",
  inputBankName: "请输入银行名称（选填）",
  inputBankCardNumber: "请输入银行账号（选填）",
  inputEmail: "用于向您发送电子发票"
}, Nge = {
  invoice: nR,
  invoiceHeaderType: rR,
  enterprise: sR,
  individual: aR,
  invoiceHeader: cR,
  taxNumber: iR,
  invoiceType: lR,
  invoiceContent: dR,
  invoiceAmount: uR,
  email: pR,
  remark: mR,
  submit: fR,
  telephone: gR,
  address: hR,
  bankName: _R,
  bankCardNumber: yR,
  moreInfo: $R,
  remarkInfo: vR,
  cancel: bR,
  invoiceDetail: TR,
  receiveMethod: PR,
  submitElectronicInvoice: SR,
  pleaseSelectContent: OR,
  invoiceAmountNote: wR,
  validation: CR,
  placeholder: MR
}, Dge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: hR,
  bankCardNumber: yR,
  bankName: _R,
  cancel: bR,
  default: Nge,
  email: pR,
  enterprise: sR,
  individual: aR,
  invoice: nR,
  invoiceAmount: uR,
  invoiceAmountNote: wR,
  invoiceContent: dR,
  invoiceDetail: TR,
  invoiceHeader: cR,
  invoiceHeaderType: rR,
  invoiceType: lR,
  moreInfo: $R,
  placeholder: MR,
  pleaseSelectContent: OR,
  receiveMethod: PR,
  remark: mR,
  remarkInfo: vR,
  submit: fR,
  submitElectronicInvoice: SR,
  taxNumber: iR,
  telephone: gR,
  validation: CR
}, Symbol.toStringTag, { value: "Module" })), AR = "订单", jR = "下单", kR = "接单", IR = "开始", NR = "完成", DR = "已支付", ER = "未支付", xR = "查看退款", RR = "申请退款", zR = "去支付", FR = "查看", LR = "服务人员", HR = "待派单", BR = "联系电话", UR = "服务码", WR = "注:服务人员上门时需提供", qR = "订单编号", VR = "交易流水号", GR = "创建时间", YR = "上门时间", KR = "买家留言", QR = "支付方式", XR = "支付时间", JR = "项目金额", ZR = "实付金额", ez = "首页", oz = "刷新", tz = "客服", nz = "收藏", rz = "没有更多内容啦~", sz = "的帮付", Ege = {
  order: AR,
  placeOrder: jR,
  takeOrders: kR,
  start: IR,
  finish: NR,
  havePaid: DR,
  notPaid: ER,
  viewRefund: xR,
  applyRefund: RR,
  goToPay: zR,
  show: FR,
  servicePersonal: LR,
  orderToBeSent: HR,
  contactNumber: BR,
  serviceCode: UR,
  explain: WR,
  onOrder: qR,
  transactionNumber: VR,
  createTime: GR,
  reserveServiceTime: YR,
  remark: KR,
  modePayment: QR,
  payTime: XR,
  goodsMoney: JR,
  realMoney: ZR,
  index: ez,
  refresh: oz,
  service: tz,
  collect: nz,
  nothingMore: rz,
  helpPay: sz
}, xge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyRefund: RR,
  collect: nz,
  contactNumber: BR,
  createTime: GR,
  default: Ege,
  explain: WR,
  finish: NR,
  goToPay: zR,
  goodsMoney: JR,
  havePaid: DR,
  helpPay: sz,
  index: ez,
  modePayment: QR,
  notPaid: ER,
  nothingMore: rz,
  onOrder: qR,
  order: AR,
  orderToBeSent: HR,
  payTime: XR,
  placeOrder: jR,
  realMoney: ZR,
  refresh: oz,
  remark: KR,
  reserveServiceTime: YR,
  service: tz,
  serviceCode: UR,
  servicePersonal: LR,
  show: FR,
  start: IR,
  takeOrders: kR,
  transactionNumber: VR,
  viewRefund: xR
}, Symbol.toStringTag, { value: "Module" })), az = "写评价", cz = "服务项目", iz = "服务评价", lz = "非常满意", dz = "满意", uz = "一般", pz = "好", mz = "很好", fz = "较差", gz = "很差", hz = "请输入您想说的话", _z = "请输入评价内容", yz = "添加照片", $z = "匿名评价", vz = "确定提交", bz = "提交中...", Tz = "请输入评价内容", Pz = "请选择评分", Sz = "订单ID不存在", Oz = "商品信息不存在", wz = "评价成功", Rge = {
  pageTitle: az,
  serviceItem: cz,
  serviceEvaluation: iz,
  verySatisfactory: lz,
  satisfactory: dz,
  average: uz,
  satisfied: pz,
  verySatisfied: mz,
  poor: fz,
  veryPoor: gz,
  pleaseInputComment: hz,
  commentPlaceholder: _z,
  addPhotos: yz,
  anonymousEvaluation: $z,
  submit: vz,
  submitting: bz,
  commentEmpty: Tz,
  selectRating: Pz,
  orderIdNotFound: Sz,
  goodsInfoNotFound: Oz,
  commentSuccess: wz
}, zge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPhotos: yz,
  anonymousEvaluation: $z,
  average: uz,
  commentEmpty: Tz,
  commentPlaceholder: _z,
  commentSuccess: wz,
  default: Rge,
  goodsInfoNotFound: Oz,
  orderIdNotFound: Sz,
  pageTitle: az,
  pleaseInputComment: hz,
  poor: fz,
  satisfactory: dz,
  satisfied: pz,
  selectRating: Pz,
  serviceEvaluation: iz,
  serviceItem: cz,
  submit: vz,
  submitting: bz,
  veryPoor: gz,
  verySatisfactory: lz,
  verySatisfied: mz
}, Symbol.toStringTag, { value: "Module" })), Cz = "写评价", Mz = "服务项目", Az = "服务评价", jz = "非常满意", kz = "满意", Iz = "一般", Nz = "较差", Dz = "很差", Ez = "请输入您想说的话", xz = "请输入评价内容", Rz = "添加照片", zz = "匿名评价", Fz = "确定提交", Lz = "提交中...", Hz = "请输入评价内容", Bz = "请选择评分", Uz = "订单ID不存在", Wz = "商品信息不存在", qz = "评价成功", Fge = {
  pageTitle: Cz,
  serviceItem: Mz,
  serviceEvaluation: Az,
  verySatisfactory: jz,
  satisfactory: kz,
  average: Iz,
  poor: Nz,
  veryPoor: Dz,
  pleaseInputComment: Ez,
  commentPlaceholder: xz,
  addPhotos: Rz,
  anonymousEvaluation: zz,
  submit: Fz,
  submitting: Lz,
  commentEmpty: Hz,
  selectRating: Bz,
  orderIdNotFound: Uz,
  goodsInfoNotFound: Wz,
  commentSuccess: qz
}, Lge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPhotos: Rz,
  anonymousEvaluation: zz,
  average: Iz,
  commentEmpty: Hz,
  commentPlaceholder: xz,
  commentSuccess: qz,
  default: Fge,
  goodsInfoNotFound: Wz,
  orderIdNotFound: Uz,
  pageTitle: Cz,
  pleaseInputComment: Ez,
  poor: Nz,
  satisfactory: kz,
  selectRating: Bz,
  serviceEvaluation: Az,
  serviceItem: Mz,
  submit: Fz,
  submitting: Lz,
  veryPoor: Dz,
  verySatisfactory: jz
}, Symbol.toStringTag, { value: "Module" })), Vz = "我的评价", Hge = {
  myEvaluate: Vz
}, Bge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hge,
  myEvaluate: Vz
}, Symbol.toStringTag, { value: "Module" })), Gz = "全部", Yz = "未支付", Kz = "实付金额：", Qz = "订单金额：", Xz = "未获取到订单信息", Jz = "没有更多内容啦~", Uge = {
  all: Gz,
  notPaid: Yz,
  payMoney: Kz,
  orderMoney: Qz,
  emptyTips: Xz,
  nothingMore: Jz
}, Wge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: Gz,
  default: Uge,
  emptyTips: Xz,
  notPaid: Yz,
  nothingMore: Jz,
  orderMoney: Qz,
  payMoney: Kz
}, Symbol.toStringTag, { value: "Module" })), Zz = "添加上门地址", eF = "选择师傅", oF = "上门时间", tF = "请选择上门时间", nF = "买家留言", rF = "请填写留言信息", sF = "服务费", aF = "优惠券", cF = "合计：", iF = "提交订单", lF = "没有更多内容啦~", dF = "价格明细", uF = "实付金额", pF = "实付", qge = {
  addHomeAddress: Zz,
  selectiveTechnician: eF,
  addHomeTime: oF,
  selectAddTimePlaceholder: tF,
  buysMessage: nF,
  messagePlaceholder: rF,
  goodsMoney: sF,
  coupon: aF,
  total: cF,
  submit: iF,
  nothingMore: lF,
  priceDetail: dF,
  payMoney: uF,
  payAll: pF
}, Vge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: Zz,
  addHomeTime: oF,
  buysMessage: nF,
  coupon: aF,
  default: qge,
  goodsMoney: sF,
  messagePlaceholder: rF,
  nothingMore: lF,
  payAll: pF,
  payMoney: uF,
  priceDetail: dF,
  selectAddTimePlaceholder: tF,
  selectiveTechnician: eF,
  submit: iF,
  total: cF
}, Symbol.toStringTag, { value: "Module" })), mF = "申请售后", fF = "服务项目", gF = "选择售后类型", hF = "申请退款", _F = "服务投诉", yF = "再次维修", $F = "其他问题", vF = "选择售后原因", bF = "服务未按约定完成", TF = "服务质量不达标", PF = "额外收费不合理", SF = "服务人员态度问题", OF = "其他原因", wF = "最多上传{count}张图片", CF = "提交售后申请", MF = "提交中...", AF = "提交后，我们将在24小时内进行处理", jF = "请输入补充描述", kF = "订单ID不存在", IF = "售后申请提交成功", NF = "上传凭证", DF = "选填", EF = "补充描述", xF = "补充描述，有助于商家更好的处理售后问题", RF = "退款原因", zF = "退款金额", FF = "确定", LF = "请选择", HF = "最多可输入金额￥", BF = "提交", UF = "没有更多内容啦~", Gge = {
  pageTitle: mF,
  serviceItem: fF,
  selectRefundType: gF,
  applyRefund: hF,
  serviceComplain: _F,
  rework: yF,
  otherProblem: $F,
  selectRefundReason: vF,
  serviceNotCompleted: bF,
  serviceQualityNotMeet: TF,
  extraChargeUnreasonable: PF,
  serviceAttitudeProblem: SF,
  otherReason: OF,
  maxImagesCount: wF,
  submitRefundApply: CF,
  submitting: MF,
  submitNotice: AF,
  pleaseInputDescription: jF,
  orderIdNotFound: kF,
  refundApplySuccess: IF,
  uploadProof: NF,
  optional: DF,
  description: EF,
  descriptionPlaceholder: xF,
  refundReason: RF,
  refundMoney: zF,
  confirm: FF,
  placeholder: LF,
  moreInputMoney: HF,
  submit: BF,
  nothingMore: UF
}, Yge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyRefund: hF,
  confirm: FF,
  default: Gge,
  description: EF,
  descriptionPlaceholder: xF,
  extraChargeUnreasonable: PF,
  maxImagesCount: wF,
  moreInputMoney: HF,
  nothingMore: UF,
  optional: DF,
  orderIdNotFound: kF,
  otherProblem: $F,
  otherReason: OF,
  pageTitle: mF,
  placeholder: LF,
  pleaseInputDescription: jF,
  refundApplySuccess: IF,
  refundMoney: zF,
  refundReason: RF,
  rework: yF,
  selectRefundReason: vF,
  selectRefundType: gF,
  serviceAttitudeProblem: SF,
  serviceComplain: _F,
  serviceItem: fF,
  serviceNotCompleted: bF,
  serviceQualityNotMeet: TF,
  submit: BF,
  submitNotice: AF,
  submitRefundApply: CF,
  submitting: MF,
  uploadProof: NF
}, Symbol.toStringTag, { value: "Module" })), WF = "退货详情", qF = "极速退款成功", VF = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", GF = "退款方式", YF = "退款原因", KF = "退款编号", QF = "申请时间", XF = "退款说明", JF = "协商记录", ZF = "查看", eL = "取消退款", oL = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", tL = "首页", nL = "退款金额", rL = "凭证", sL = "没有更多内容啦~", Kge = {
  refundDetail: WF,
  fastRefundSuccessful: qF,
  refundInfo: VF,
  refundType: GF,
  refundCause: YF,
  refundNo: KF,
  createTime: QF,
  createExplain: XF,
  record: JF,
  check: ZF,
  refundApply: eL,
  cancelRefundContent: oL,
  index: tL,
  refundMoney: nL,
  voucher: rL,
  nothingMore: sL
}, Qge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: oL,
  check: ZF,
  createExplain: XF,
  createTime: QF,
  default: Kge,
  fastRefundSuccessful: qF,
  index: tL,
  nothingMore: sL,
  record: JF,
  refundApply: eL,
  refundCause: YF,
  refundDetail: WF,
  refundInfo: VF,
  refundMoney: nL,
  refundNo: KF,
  refundType: GF,
  voucher: rL
}, Symbol.toStringTag, { value: "Module" })), aL = "退款金额", cL = "取消退款", iL = "详情", lL = "实付款", dL = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", uL = "没有更多内容啦~", Xge = {
  refundMoney: aL,
  refundApply: cL,
  orderDetail: iL,
  actualPayment: lL,
  cancelRefundContent: dL,
  nothingMore: uL
}, Jge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: lL,
  cancelRefundContent: dL,
  default: Xge,
  nothingMore: uL,
  orderDetail: iL,
  refundApply: cL,
  refundMoney: aL
}, Symbol.toStringTag, { value: "Module" })), pL = "返回详情", mL = "没有更多内容啦~", Zge = {
  detail: pL,
  nothingMore: mL
}, ehe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zge,
  detail: pL,
  nothingMore: mL
}, Symbol.toStringTag, { value: "Module" })), fL = "选择师傅", gL = "请选择", hL = "预约时间", _L = "买家留言", yL = "请填写留言信息", $L = "立即购买", vL = "立即预约", bL = "首页", TL = "手机号", PL = "请输入手机号", SL = "请输入正确的手机号", OL = "客服", wL = "收藏", CL = "没有更多内容啦~", ohe = {
  selectTechnician: fL,
  pleaseChoose: gL,
  reserveTime: hL,
  remark: _L,
  fillRemark: yL,
  buy: $L,
  reserve: vL,
  index: bL,
  mobile: TL,
  mobilePlaceholder: PL,
  correctMobilePlaceholder: SL,
  service: OL,
  collect: wL,
  nothingMore: CL
}, the = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: $L,
  collect: wL,
  correctMobilePlaceholder: SL,
  default: ohe,
  fillRemark: yL,
  index: bL,
  mobile: TL,
  mobilePlaceholder: PL,
  nothingMore: CL,
  pleaseChoose: gL,
  remark: _L,
  reserve: vL,
  reserveTime: hL,
  selectTechnician: fL,
  service: OL
}, Symbol.toStringTag, { value: "Module" })), ML = "机构入驻申请", AL = "商家人驻 海量商机", jL = "大平台・多品类・专业经营", kL = "我们的优势", IL = "多品类覆盖", NL = "洗衣洗鞋、保洁清洗、管道疏通、房屋维修、家电维修、上门安装、数码维修等多类服务供您选择", DL = "客户充足", EL = "同城/到家、千万流量帮扶、帮助商家解决获客难题", xL = "商家赋能", RL = "系统算法派单，省时省心;手机+电脑支持后台管理订单;完善的服务商成长体系", zL = "平台帮扶", FL = "培训指导助力经营、系统支持保障效率", LL = "入驻流程", HL = "01.提交资料", BL = "02.资料审核", UL = "03.入驻完成", WL = "去填写", nhe = {
  storeApplyTitle: ML,
  merchantSlogan: AL,
  platformFeatures: jL,
  ourAdvantages: kL,
  multipleCategories: IL,
  multipleCategoriesDesc: NL,
  sufficientCustomers: DL,
  sufficientCustomersDesc: EL,
  merchantEmpowerment: xL,
  merchantEmpowermentDesc: RL,
  platformSupport: zL,
  platformSupportDesc: FL,
  settlementProcess: LL,
  submitData: HL,
  dataReview: BL,
  settlementComplete: UL,
  goFill: WL
}, rhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dataReview: BL,
  default: nhe,
  goFill: WL,
  merchantEmpowerment: xL,
  merchantEmpowermentDesc: RL,
  merchantSlogan: AL,
  multipleCategories: IL,
  multipleCategoriesDesc: NL,
  ourAdvantages: kL,
  platformFeatures: jL,
  platformSupport: zL,
  platformSupportDesc: FL,
  settlementComplete: UL,
  settlementProcess: LL,
  storeApplyTitle: ML,
  submitData: HL,
  sufficientCustomers: DL,
  sufficientCustomersDesc: EL
}, Symbol.toStringTag, { value: "Module" })), qL = "机构入驻申请", VL = "机构名称", GL = "请输入机构名称", YL = "营业执照", KL = "请上传营业执照", QL = "请上传营业执照", XL = "请输入联系人姓名", JL = "请输入手机号码", ZL = "请输入身份证号", eH = "请上传证件头像", oH = "请上传证件国徽面", tH = "请选择机构位置", nH = "行业资质", rH = "上传机构图像", sH = "我的定位", aH = "请选择", cH = "联系人姓名", iH = "请输入联系人姓名", lH = "手机号码", dH = "请输入手机号码", uH = "身份证号", pH = "请输入身份证号", mH = "证件头像面", fH = "证件国徽面", gH = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", hH = "图片尺寸400*400px以上，大小不超过10M", _H = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊，保持信息清晰可见", yH = "上传图片必须小于1M且清晰可见", $H = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", vH = "身份证照片上传", bH = "请上传清晰照片", TH = "申请说明", PH = "请输入", SH = "确定提交", OH = "请输入姓名", wH = "请输入身份证号", CH = "请输入手机号", MH = "请上传证件头像", AH = "请上传证件国徽面", jH = "提交成功", kH = "提交中...", IH = "点击上传", NH = "机构相关证件照", DH = "机构相关证件", EH = "法人身份证照片", xH = "请上传清晰照片", RH = "确定提交", zH = "机构营业执照或个体户执照", FH = "部分行业需要，按行业补充", LH = "请输入正确的手机号", HH = "请输入正确的身份证号码", BH = "请输入机构名称", UH = "请上传营业执照", WH = "请上传机构图像", qH = "请选择机构位置", VH = "请输入联系人姓名", GH = "请输入手机号码", YH = "请输入身份证号", KH = "请上传证件头像", QH = "请上传证件国徽面", XH = "请输入正确的手机号码", JH = "请输入正确的身份证号码", she = {
  storeApplyTitle: qL,
  storeName: VL,
  inputStoreName: GL,
  businessLicense: YL,
  businessLicensePlaceholder: KL,
  businessLicenseRequired: QL,
  contactNameRequired: XL,
  mobileRequired: JL,
  idNumberRequired: ZL,
  idcardFrontRequired: eH,
  idcardBackRequired: oH,
  locationRequired: tH,
  industryQualification: nH,
  uploadStoreImage: rH,
  myLocation: sH,
  selectLocation: aH,
  contactPersonName: cH,
  inputContactPersonName: iH,
  contactPersonMobile: lH,
  inputContactPersonMobile: dH,
  contactPersonIdcard: uH,
  inputContactPersonIdcard: pH,
  idcardFront: mH,
  idcardBack: fH,
  idcardFrontTip1: gH,
  idcardFrontTip3: hH,
  idcardBackTip1: _H,
  idcardBackTip5: yH,
  skillCertificateDesc1: $H,
  idcardUpload: vH,
  idcardUploadTip: bH,
  applyDescription: TH,
  inputApplyDescription: PH,
  confirmSubmit: SH,
  inputName: OH,
  inputIdcard: wH,
  inputMobile: CH,
  uploadIdcardFront: MH,
  uploadIdcardBack: AH,
  submitSuccess: jH,
  submitting: kH,
  clickUpload: IH,
  storeCertificates: NH,
  uploadClearPhotos: DH,
  legalPersonIdcardImage: EH,
  PleaseUploadClearPhotos: xH,
  submitForm: RH,
  storeBusinessLicenseTip: zH,
  industryQualificationTip: FH,
  inputMobileErr: LH,
  inputIdcardErr: HH,
  pleaseInputStoreName: BH,
  pleaseUploadBusinessLicense: UH,
  pleaseUploadStoreImage: WH,
  pleaseSelectLocation: qH,
  pleaseInputContactPersonName: VH,
  pleaseInputContactPersonMobile: GH,
  pleaseInputContactPersonIdcard: YH,
  pleaseUploadIdcardFront: KH,
  pleaseUploadIdcardBack: QH,
  pleaseInputValidMobile: XH,
  pleaseInputValidIdcard: JH
}, ahe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PleaseUploadClearPhotos: xH,
  applyDescription: TH,
  businessLicense: YL,
  businessLicensePlaceholder: KL,
  businessLicenseRequired: QL,
  clickUpload: IH,
  confirmSubmit: SH,
  contactNameRequired: XL,
  contactPersonIdcard: uH,
  contactPersonMobile: lH,
  contactPersonName: cH,
  default: she,
  idNumberRequired: ZL,
  idcardBack: fH,
  idcardBackRequired: oH,
  idcardBackTip1: _H,
  idcardBackTip5: yH,
  idcardFront: mH,
  idcardFrontRequired: eH,
  idcardFrontTip1: gH,
  idcardFrontTip3: hH,
  idcardUpload: vH,
  idcardUploadTip: bH,
  industryQualification: nH,
  industryQualificationTip: FH,
  inputApplyDescription: PH,
  inputContactPersonIdcard: pH,
  inputContactPersonMobile: dH,
  inputContactPersonName: iH,
  inputIdcard: wH,
  inputIdcardErr: HH,
  inputMobile: CH,
  inputMobileErr: LH,
  inputName: OH,
  inputStoreName: GL,
  legalPersonIdcardImage: EH,
  locationRequired: tH,
  mobileRequired: JL,
  myLocation: sH,
  pleaseInputContactPersonIdcard: YH,
  pleaseInputContactPersonMobile: GH,
  pleaseInputContactPersonName: VH,
  pleaseInputStoreName: BH,
  pleaseInputValidIdcard: JH,
  pleaseInputValidMobile: XH,
  pleaseSelectLocation: qH,
  pleaseUploadBusinessLicense: UH,
  pleaseUploadIdcardBack: QH,
  pleaseUploadIdcardFront: KH,
  pleaseUploadStoreImage: WH,
  selectLocation: aH,
  skillCertificateDesc1: $H,
  storeApplyTitle: qL,
  storeBusinessLicenseTip: zH,
  storeCertificates: NH,
  storeName: VL,
  submitForm: RH,
  submitSuccess: jH,
  submitting: kH,
  uploadClearPhotos: DH,
  uploadIdcardBack: AH,
  uploadIdcardFront: MH,
  uploadStoreImage: rH
}, Symbol.toStringTag, { value: "Module" })), ZH = "入驻申请审批中", eB = "入驻申请不通过", oB = "申请已通过", tB = "预计三个工作日完成，请耐心等待", nB = "申请已提交", rB = "审核时间", sB = "返回首页", aB = "查看申请状态", cB = "审核提示", iB = "您已成功入驻", che = {
  reviewingTitle: ZH,
  rejectedTitle: eB,
  successTitle: oB,
  description: tB,
  applicationSubmitted: nB,
  awaitingSettlement: rB,
  goBackHome: sB,
  checkStatus: aB,
  reviewTips: cB,
  descriptionSuccess: iB
}, ihe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applicationSubmitted: nB,
  awaitingSettlement: rB,
  checkStatus: aB,
  default: che,
  description: tB,
  descriptionSuccess: iB,
  goBackHome: sB,
  rejectedTitle: eB,
  reviewTips: cB,
  reviewingTitle: ZH,
  successTitle: oB
}, Symbol.toStringTag, { value: "Module" })), lB = "师傅入驻申请", dB = "请选择我的技能", uB = "(多选)", pB = "我们的优势", mB = "多品类覆盖", fB = "洗衣洗鞋、保洁清洗、管道疏通、房屋维修、家电维修、上门安装、数码维修等多类服务供您选择", gB = "客户充足", hB = "同城到家、千万流量帮扶、帮助商家解决获客难题", _B = "商家赋能", yB = "系统算法派单、省时省心手机、电脑支持后台管理订单；完善的服务商成长体系", $B = "平台帮扶", vB = "培训指导助力经营、系统支持保障效率", bB = "入驻流程", TB = "01.提交资料", PB = "02.资料审核", SB = "03.入驻完成", OB = "去填写", wB = "请至少选择一项技能", CB = "家庭保洁", MB = "上门维修", AB = "保姆月嫂", jB = "清洁、整理、消毒", lhe = {
  technicianApplyTitle: lB,
  selectSkillsTitle: dB,
  multipleChoice: uB,
  ourAdvantages: pB,
  multipleCategories: mB,
  multipleCategoriesDesc: fB,
  sufficientCustomers: gB,
  sufficientCustomersDesc: hB,
  merchantEmpowerment: _B,
  merchantEmpowermentDesc: yB,
  platformSupport: $B,
  platformSupportDesc: vB,
  settlementProcess: bB,
  submitData: TB,
  dataReview: PB,
  settlementComplete: SB,
  goFill: OB,
  selectAtLeastOneSkill: wB,
  homeCleaning: CB,
  homeRepair: MB,
  nannyYuesao: AB,
  skillDesc: jB
}, dhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dataReview: PB,
  default: lhe,
  goFill: OB,
  homeCleaning: CB,
  homeRepair: MB,
  merchantEmpowerment: _B,
  merchantEmpowermentDesc: yB,
  multipleCategories: mB,
  multipleCategoriesDesc: fB,
  multipleChoice: uB,
  nannyYuesao: AB,
  ourAdvantages: pB,
  platformSupport: $B,
  platformSupportDesc: vB,
  selectAtLeastOneSkill: wB,
  selectSkillsTitle: dB,
  settlementComplete: SB,
  settlementProcess: bB,
  skillDesc: jB,
  submitData: TB,
  sufficientCustomers: gB,
  sufficientCustomersDesc: hB,
  technicianApplyTitle: lB
}, Symbol.toStringTag, { value: "Module" })), kB = "师傅入驻申请", IB = "请选择我的技能", NB = "(多选)", DB = "我们的优势", EB = "多品类覆盖", xB = "洗衣洗鞋、保洁清洗、管道疏通、房屋维修、家电维修、上门安装、数码维修等多类服务供您选择", RB = "客户充足", zB = "同城到家、千万流量帮扶、帮助商家解决获客难题", FB = "商家赋能", LB = "系统算法派单、省时省心手机、电脑支持后台管理订单；完善的服务商成长体系", HB = "平台帮扶", BB = "培训指导助力经营、系统支持保障效率", UB = "入驻流程", WB = "01.提交资料", qB = "02.资料审核", VB = "03.入驻完成", GB = "去填写", YB = "请至少选择一项技能", KB = "家庭保洁", QB = "上门维修", XB = "保姆月嫂", JB = "清洁、整理、消毒", ZB = "基本信息", e0 = "姓名", o0 = "身份证号", t0 = "手机号码", n0 = "所属机构（选填）", r0 = "请选择所属机构", s0 = "师傅头像", a0 = "请上传清晰照片", c0 = "师傅头像照片上传", i0 = "身份证照片上传", l0 = "请上传清晰照片", d0 = "身份证人像面", u0 = "图片尺寸80*80px以上，大小不超过10M", p0 = "请输入正确的身份证号码", m0 = "请输入正确的手机号", f0 = "请上传证件国徽面", g0 = "技能证书上传（选填）", h0 = "请上传技能证书，最多9张", _0 = "我的定位", y0 = "请选择服务区域", $0 = "申请说明", v0 = "请输入申请说明", b0 = "确定提交", T0 = "请输入姓名", P0 = "请输入身份证号", S0 = "请输入手机号", O0 = "请上传证件头像", w0 = "请上传证件国徽面", C0 = "提交成功", M0 = "提交中...", A0 = "点击上传", j0 = "技能证书", k0 = "请上传技能证书", I0 = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", N0 = "图片尺寸400*400px以上，大小不超过10M", D0 = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊，保持信息清晰可见", E0 = "上传图片必须小于1M且清晰可见", x0 = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", R0 = "（必填）", z0 = "姓名不能为空", F0 = "身份证号不能为空", L0 = "手机号不能为空", H0 = "请上传师傅头像", B0 = "请上传身份证照片", U0 = "请选择服务区域", W0 = "请填写申请说明", uhe = {
  technicianApplyTitle: kB,
  selectSkillsTitle: IB,
  multipleChoice: NB,
  ourAdvantages: DB,
  multipleCategories: EB,
  multipleCategoriesDesc: xB,
  sufficientCustomers: RB,
  sufficientCustomersDesc: zB,
  merchantEmpowerment: FB,
  merchantEmpowermentDesc: LB,
  platformSupport: HB,
  platformSupportDesc: BB,
  settlementProcess: UB,
  submitData: WB,
  dataReview: qB,
  settlementComplete: VB,
  goFill: GB,
  selectAtLeastOneSkill: YB,
  homeCleaning: KB,
  homeRepair: QB,
  nannyYuesao: XB,
  skillDesc: JB,
  basicInfo: ZB,
  name: e0,
  idcard: o0,
  mobiles: t0,
  store: n0,
  selectStore: r0,
  technicianAvatar: s0,
  avatarUploadTip: a0,
  uploadAvatar: c0,
  idcardUpload: i0,
  idcardUploadTip: l0,
  idcardFront: d0,
  avatarUploadTip1: u0,
  inputIdcardErr: p0,
  inputMobileErr: m0,
  idcardBack: f0,
  skillCertificateUpload: g0,
  skillCertificateTip: h0,
  serviceArea: _0,
  selectServiceArea: y0,
  applyDescription: $0,
  inputDescription: v0,
  submitForm: b0,
  inputName: T0,
  inputIdcard: P0,
  inputMobile: S0,
  uploadIdcardFront: O0,
  uploadIdcardBack: w0,
  submitSuccess: C0,
  submitting: M0,
  clickUpload: A0,
  skillCertificate: j0,
  uploadCertificate: k0,
  idcardFrontTip1: I0,
  idcardFrontTip3: N0,
  idcardBackTip1: D0,
  idcardBackTip5: E0,
  skillCertificateDesc1: x0,
  requiredField: R0,
  nameRequired: z0,
  idcardRequired: F0,
  mobileRequired: L0,
  avatarRequired: H0,
  idcardPhotoRequired: B0,
  serviceAreaRequired: U0,
  descriptionRequired: W0
}, phe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDescription: $0,
  avatarRequired: H0,
  avatarUploadTip: a0,
  avatarUploadTip1: u0,
  basicInfo: ZB,
  clickUpload: A0,
  dataReview: qB,
  default: uhe,
  descriptionRequired: W0,
  goFill: GB,
  homeCleaning: KB,
  homeRepair: QB,
  idcard: o0,
  idcardBack: f0,
  idcardBackTip1: D0,
  idcardBackTip5: E0,
  idcardFront: d0,
  idcardFrontTip1: I0,
  idcardFrontTip3: N0,
  idcardPhotoRequired: B0,
  idcardRequired: F0,
  idcardUpload: i0,
  idcardUploadTip: l0,
  inputDescription: v0,
  inputIdcard: P0,
  inputIdcardErr: p0,
  inputMobile: S0,
  inputMobileErr: m0,
  inputName: T0,
  merchantEmpowerment: FB,
  merchantEmpowermentDesc: LB,
  mobileRequired: L0,
  mobiles: t0,
  multipleCategories: EB,
  multipleCategoriesDesc: xB,
  multipleChoice: NB,
  name: e0,
  nameRequired: z0,
  nannyYuesao: XB,
  ourAdvantages: DB,
  platformSupport: HB,
  platformSupportDesc: BB,
  requiredField: R0,
  selectAtLeastOneSkill: YB,
  selectServiceArea: y0,
  selectSkillsTitle: IB,
  selectStore: r0,
  serviceArea: _0,
  serviceAreaRequired: U0,
  settlementComplete: VB,
  settlementProcess: UB,
  skillCertificate: j0,
  skillCertificateDesc1: x0,
  skillCertificateTip: h0,
  skillCertificateUpload: g0,
  skillDesc: JB,
  store: n0,
  submitData: WB,
  submitForm: b0,
  submitSuccess: C0,
  submitting: M0,
  sufficientCustomers: RB,
  sufficientCustomersDesc: zB,
  technicianApplyTitle: kB,
  technicianAvatar: s0,
  uploadAvatar: c0,
  uploadCertificate: k0,
  uploadIdcardBack: w0,
  uploadIdcardFront: O0
}, Symbol.toStringTag, { value: "Module" })), q0 = "师傅详情", V0 = "工作中", G0 = "休息中", Y0 = "从业{years}年", K0 = "服务{count}单", Q0 = "完成单数", X0 = "异常订单", J0 = "售后订单", Z0 = "好评率", e3 = "个人简介", o3 = "姓名", t3 = "身份证号", n3 = "手机号", r3 = "资质证书", s3 = "查看", a3 = "自我介绍", c3 = "技能专长", i3 = "联系师傅", l3 = "立即预约", mhe = {
  technicianDetail: q0,
  working: V0,
  resting: G0,
  experience_years: Y0,
  service_orders: K0,
  completed_orders: Q0,
  exception_orders: X0,
  after_sale_orders: J0,
  rating: Z0,
  personal_info: e3,
  name: o3,
  id_card: t3,
  phone: n3,
  certificates: r3,
  view: s3,
  self_introduction: a3,
  skills: c3,
  contact_technician: i3,
  book_now: l3
}, fhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  after_sale_orders: J0,
  book_now: l3,
  certificates: r3,
  completed_orders: Q0,
  contact_technician: i3,
  default: mhe,
  exception_orders: X0,
  experience_years: Y0,
  id_card: t3,
  name: o3,
  personal_info: e3,
  phone: n3,
  rating: Z0,
  resting: G0,
  self_introduction: a3,
  service_orders: K0,
  skills: c3,
  technicianDetail: q0,
  view: s3,
  working: V0
}, Symbol.toStringTag, { value: "Module" })), d3 = "年", u3 = "请输入搜索关键词", p3 = "已服务", m3 = "已离职", f3 = "休息中", g3 = "详情", h3 = "没有更多内容啦~", ghe = {
  year: d3,
  searchPlaceholder: u3,
  service: p3,
  haveLeft: m3,
  takeBreak: f3,
  detail: g3,
  nothingMore: h3
}, hhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ghe,
  detail: g3,
  haveLeft: m3,
  nothingMore: h3,
  searchPlaceholder: u3,
  service: p3,
  takeBreak: f3,
  year: d3
}, Symbol.toStringTag, { value: "Module" })), _3 = "去抢购", y3 = "没有更多内容啦~", $3 = "已售", v3 = "订单号", b3 = "实付款", T3 = "详情", _he = {
  reserveBtn: _3,
  noHomeAddress: y3,
  soldOut: $3,
  orderNo: v3,
  actualPayment: b3,
  orderDetail: T3
}, yhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: b3,
  default: _he,
  noHomeAddress: y3,
  orderDetail: T3,
  orderNo: v3,
  reserveBtn: _3,
  soldOut: $3
}, Symbol.toStringTag, { value: "Module" })), P3 = "联系人", S3 = "请输入联系人姓名", O3 = "手机号码", w3 = "请输入手机号码", C3 = "请输入正确的手机号", M3 = "选择地区", A3 = "请选择地区", j3 = "详细地址", k3 = "请填写详细地址", I3 = "设为默认地址", N3 = "没有更多内容啦~", $he = {
  name: P3,
  namePlaceholder: S3,
  mobile: O3,
  mobilePlaceholder: w3,
  mobileError: C3,
  selectArea: M3,
  selectAreaPlaceholder: A3,
  address: j3,
  addressPlaceholder: k3,
  defaultAddress: I3,
  nothingMore: N3
}, vhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: j3,
  addressPlaceholder: k3,
  default: $he,
  defaultAddress: I3,
  mobile: O3,
  mobileError: C3,
  mobilePlaceholder: w3,
  name: P3,
  namePlaceholder: S3,
  nothingMore: N3,
  selectArea: M3,
  selectAreaPlaceholder: A3
}, Symbol.toStringTag, { value: "Module" })), D3 = "联系人", E3 = "请输入联系人姓名", x3 = "手机号码", R3 = "请输入手机号码", z3 = "上门地址", F3 = "选择地址", L3 = "请选择地址", H3 = "详细地址", B3 = "详细地址如 1单元101", U3 = "请填写门牌号", W3 = "设为默认地址", q3 = "修改", V3 = "保存", G3 = "没有更多内容啦~", bhe = {
  name: D3,
  namePlaceholder: E3,
  mobile: x3,
  mobilePlaceholder: R3,
  homeAddress: z3,
  selectAddress: F3,
  selectAddressPlaceholder: L3,
  address: H3,
  addressPlaceholder: B3,
  addressError: U3,
  defaultAddress: W3,
  update: q3,
  save: V3,
  nothingMore: G3
}, The = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: H3,
  addressError: U3,
  addressPlaceholder: B3,
  default: bhe,
  defaultAddress: W3,
  homeAddress: z3,
  mobile: x3,
  mobilePlaceholder: R3,
  name: D3,
  namePlaceholder: E3,
  nothingMore: G3,
  save: V3,
  selectAddress: F3,
  selectAddressPlaceholder: L3,
  update: q3
}, Symbol.toStringTag, { value: "Module" })), Y3 = "没有更多内容啦~", K3 = "添加上门地址", Phe = {
  default: "默认地址",
  noHomeAddress: Y3,
  addHomeAddress: K3
}, She = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: K3,
  default: Phe,
  noHomeAddress: Y3
}, Symbol.toStringTag, { value: "Module" })), Q3 = "请输入搜索关键词", X3 = "全部分类", J3 = "预约", Z3 = "已售", e4 = "没有更多内容啦~", Ohe = {
  searchKeywordPlaceholder: Q3,
  allCategory: X3,
  reserveBtn: J3,
  soldOut: Z3,
  nothingMore: e4
}, whe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: X3,
  default: Ohe,
  nothingMore: e4,
  reserveBtn: J3,
  searchKeywordPlaceholder: Q3,
  soldOut: Z3
}, Symbol.toStringTag, { value: "Module" })), o4 = "人选择", t4 = "已选", n4 = "次", r4 = "暂无项目介绍", s4 = "暂无购买须知", a4 = "暂无更多数据", c4 = "项目名称", i4 = "价格", l4 = "单位", d4 = "暂无价目表", u4 = "首页", p4 = "分享", m4 = "客服", f4 = "立即预约", g4 = "立即下单", h4 = "已下架", _4 = "没有更多内容啦~", Che = {
  selectNum: o4,
  selected: t4,
  time: n4,
  noProjectInt: r4,
  noPurchase: s4,
  noMore: a4,
  projectName: c4,
  price: i4,
  unit: l4,
  noPriceList: d4,
  index: u4,
  share: p4,
  service: m4,
  bookNow: f4,
  orderNow: g4,
  delisted: h4,
  nothingMore: _4
}, Mhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: f4,
  default: Che,
  delisted: h4,
  index: u4,
  noMore: a4,
  noPriceList: d4,
  noProjectInt: r4,
  noPurchase: s4,
  nothingMore: _4,
  orderNow: g4,
  price: i4,
  projectName: c4,
  selectNum: o4,
  selected: t4,
  service: m4,
  share: p4,
  time: n4,
  unit: l4
}, Symbol.toStringTag, { value: "Module" })), y4 = "没有更多内容啦~", $4 = "请搜索您想要的商品", v4 = "综合", b4 = "销量", T4 = "价格", P4 = "筛选", S4 = "全部分类", O4 = "已售", w4 = "没有更多内容啦~", Ahe = {
  end: y4,
  searchPlaceholder: $4,
  synthesis: v4,
  sales: b4,
  price: T4,
  screen: P4,
  allCategory: S4,
  soldOut: O4,
  nothingMore: w4
}, jhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: S4,
  default: Ahe,
  end: y4,
  nothingMore: w4,
  price: T4,
  sales: b4,
  screen: P4,
  searchPlaceholder: $4,
  soldOut: O4,
  synthesis: v4
}, Symbol.toStringTag, { value: "Module" })), C4 = "请输入搜索关键词", M4 = "抢购", A4 = "没有更多内容啦~", j4 = "没有更多内容啦~", k4 = "已售", I4 = "订单号", N4 = "实付款", D4 = "详情", khe = {
  searchNamePlaceholder: C4,
  reserveBtn: M4,
  nothingMore: A4,
  noHomeAddress: j4,
  soldOut: k4,
  orderNo: I4,
  actualPayment: N4,
  orderDetail: D4
}, Ihe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: N4,
  default: khe,
  noHomeAddress: j4,
  nothingMore: A4,
  orderDetail: D4,
  orderNo: I4,
  reserveBtn: M4,
  searchNamePlaceholder: C4,
  soldOut: k4
}, Symbol.toStringTag, { value: "Module" })), E4 = "订单数(个)", x4 = "订单金额(元)", R4 = "订单管理", z4 = "查看更多", F4 = "待服务订单", L4 = "服务中订单", H4 = "已服务订单", B4 = "数量：", U4 = "查看详情", W4 = "服务项目", q4 = "加载中", V4 = "没有更多内容啦~", Nhe = {
  orderNum: E4,
  orderAmount: x4,
  orderManagement: R4,
  viewMore: z4,
  pendingOrder: F4,
  orderInService: L4,
  finishedOrder: H4,
  amount: B4,
  viewDetails: U4,
  serviceItem: W4,
  loadingText: q4,
  nothingMore: V4
}, Dhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amount: B4,
  default: Nhe,
  finishedOrder: H4,
  loadingText: q4,
  nothingMore: V4,
  orderAmount: x4,
  orderInService: L4,
  orderManagement: R4,
  orderNum: E4,
  pendingOrder: F4,
  serviceItem: W4,
  viewDetails: U4,
  viewMore: z4
}, Symbol.toStringTag, { value: "Module" })), G4 = "添加服务项目", Y4 = "编辑服务项目", K4 = "服务项目", Q4 = "请输入服务项目", X4 = "价格", J4 = "请输入价格", Z4 = "元", eU = "项目图片", oU = "提交", tU = "加载中...", nU = "没有更多内容啦~", Ehe = {
  addServiceItem: G4,
  editServiceItem: Y4,
  serviceItem: K4,
  serviceItemPlaceholder: Q4,
  price: X4,
  pricePlaceholder: J4,
  yuan: Z4,
  serviceImg: eU,
  save: oU,
  loading: tU,
  nothingMore: nU
}, xhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: G4,
  default: Ehe,
  editServiceItem: Y4,
  loading: tU,
  nothingMore: nU,
  price: X4,
  pricePlaceholder: J4,
  save: oU,
  serviceImg: eU,
  serviceItem: K4,
  serviceItemPlaceholder: Q4,
  yuan: Z4
}, Symbol.toStringTag, { value: "Module" })), rU = "下单", sU = "接单", aU = "开始", cU = "完成", iU = "服务日期:", lU = "新增服务项目", dU = "已支付", uU = "未支付", pU = "去支付", mU = "查看", fU = "编辑", gU = "订单信息", hU = "订单编号", _U = "联系人姓名", yU = "联系电话", $U = "备注", vU = "首页", bU = "联系客户", TU = "刷新", PU = "服务码", SU = "没有更多内容啦~", OU = "查看退款", Rhe = {
  placeOrder: rU,
  takeOrders: sU,
  start: aU,
  finish: cU,
  serviceDate: iU,
  addServiceItem: lU,
  havePaid: dU,
  notPaid: uU,
  goToPay: pU,
  show: mU,
  edit: fU,
  delete: "删除",
  orderInfo: gU,
  orderNo: hU,
  person: _U,
  personTel: yU,
  remark: $U,
  index: vU,
  contact: bU,
  refresh: TU,
  checkCode: PU,
  nothingMore: SU,
  viewRefund: OU
}, zhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: lU,
  checkCode: PU,
  contact: bU,
  default: Rhe,
  edit: fU,
  finish: cU,
  goToPay: pU,
  havePaid: dU,
  index: vU,
  notPaid: uU,
  nothingMore: SU,
  orderInfo: gU,
  orderNo: hU,
  person: _U,
  personTel: yU,
  placeOrder: rU,
  refresh: TU,
  remark: $U,
  serviceDate: iU,
  show: mU,
  start: aU,
  takeOrders: sU,
  viewRefund: OU
}, Symbol.toStringTag, { value: "Module" })), wU = "服务日期:", CU = "已支付", MU = "未支付", AU = "联系客户", jU = "服务码", kU = "没有更多内容啦~", Fhe = {
  serviceDate: wU,
  havePaid: CU,
  notPaid: MU,
  contact: AU,
  checkCode: jU,
  nothingMore: kU
}, Lhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkCode: jU,
  contact: AU,
  default: Fhe,
  havePaid: CU,
  notPaid: MU,
  nothingMore: kU,
  serviceDate: wU
}, Symbol.toStringTag, { value: "Module" })), IU = "退款方式", NU = "退款原因", DU = "退款编号", EU = "申请时间", xU = "退款说明", RU = "查看", zU = "退款金额", FU = "凭证", LU = "没有更多内容啦~", Hhe = {
  refundType: IU,
  refundCause: NU,
  refundNo: DU,
  createTime: EU,
  createExplain: xU,
  check: RU,
  refundMoney: zU,
  voucher: FU,
  nothingMore: LU
}, Bhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  check: RU,
  createExplain: xU,
  createTime: EU,
  default: Hhe,
  nothingMore: LU,
  refundCause: NU,
  refundMoney: zU,
  refundNo: DU,
  refundType: IU,
  voucher: FU
}, Symbol.toStringTag, { value: "Module" })), HU = "查看服务项目", BU = "服务项目", UU = "价格", WU = "元", qU = "项目图片", VU = "加载中...", GU = "没有更多内容啦~", Uhe = {
  showServiceItem: HU,
  serviceItem: BU,
  price: UU,
  yuan: WU,
  serviceImg: qU,
  loading: VU,
  nothingMore: GU
}, Whe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Uhe,
  loading: VU,
  nothingMore: GU,
  price: UU,
  serviceImg: qU,
  serviceItem: BU,
  showServiceItem: HU,
  yuan: WU
}, Symbol.toStringTag, { value: "Module" })), YU = "订单", KU = "下单", QU = "接单", XU = "开始", JU = "完成", ZU = "已支付", e5 = "未支付", o5 = "查看退款", t5 = "申请退款", n5 = "去支付", r5 = "查看", s5 = "服务人员", a5 = "待派单", c5 = "联系电话", i5 = "服务码", l5 = "注:服务人员上门时需提供", d5 = "订单编号", u5 = "交易流水号", p5 = "创建时间", m5 = "上门时间", f5 = "买家留言", g5 = "支付方式", h5 = "支付时间", _5 = "项目金额", y5 = "实付金额", $5 = "首页", v5 = "刷新", b5 = "客服", T5 = "收藏", P5 = "没有更多内容啦~", S5 = "的帮付", qhe = {
  order: YU,
  placeOrder: KU,
  takeOrders: QU,
  start: XU,
  finish: JU,
  havePaid: ZU,
  notPaid: e5,
  viewRefund: o5,
  applyRefund: t5,
  goToPay: n5,
  show: r5,
  servicePersonal: s5,
  orderToBeSent: a5,
  contactNumber: c5,
  serviceCode: i5,
  explain: l5,
  onOrder: d5,
  transactionNumber: u5,
  createTime: p5,
  reserveServiceTime: m5,
  remark: f5,
  modePayment: g5,
  payTime: h5,
  goodsMoney: _5,
  realMoney: y5,
  index: $5,
  refresh: v5,
  service: b5,
  collect: T5,
  nothingMore: P5,
  helpPay: S5
}, Vhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyRefund: t5,
  collect: T5,
  contactNumber: c5,
  createTime: p5,
  default: qhe,
  explain: l5,
  finish: JU,
  goToPay: n5,
  goodsMoney: _5,
  havePaid: ZU,
  helpPay: S5,
  index: $5,
  modePayment: g5,
  notPaid: e5,
  nothingMore: P5,
  onOrder: d5,
  order: YU,
  orderToBeSent: a5,
  payTime: h5,
  placeOrder: KU,
  realMoney: y5,
  refresh: v5,
  remark: f5,
  reserveServiceTime: m5,
  service: b5,
  serviceCode: i5,
  servicePersonal: s5,
  show: r5,
  start: XU,
  takeOrders: QU,
  transactionNumber: u5,
  viewRefund: o5
}, Symbol.toStringTag, { value: "Module" })), O5 = "全部", w5 = "未支付", C5 = "实付金额：", M5 = "订单金额：", A5 = "未获取到订单信息", j5 = "没有更多内容啦~", Ghe = {
  all: O5,
  notPaid: w5,
  payMoney: C5,
  orderMoney: M5,
  emptyTips: A5,
  nothingMore: j5
}, Yhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: O5,
  default: Ghe,
  emptyTips: A5,
  notPaid: w5,
  nothingMore: j5,
  orderMoney: M5,
  payMoney: C5
}, Symbol.toStringTag, { value: "Module" })), k5 = "添加上门地址", I5 = "选择技师", N5 = "上门时间", D5 = "请选择上门时间", E5 = "买家留言", x5 = "请填写留言信息", R5 = "商品金额", z5 = "合计：", F5 = "提交订单", L5 = "没有更多内容啦~", Khe = {
  addHomeAddress: k5,
  selectiveTechnician: I5,
  addHomeTime: N5,
  selectAddTimePlaceholder: D5,
  buysMessage: E5,
  messagePlaceholder: x5,
  goodsMoney: R5,
  total: z5,
  submit: F5,
  nothingMore: L5
}, Qhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: k5,
  addHomeTime: N5,
  buysMessage: E5,
  default: Khe,
  goodsMoney: R5,
  messagePlaceholder: x5,
  nothingMore: L5,
  selectAddTimePlaceholder: D5,
  selectiveTechnician: I5,
  submit: F5,
  total: z5
}, Symbol.toStringTag, { value: "Module" })), H5 = "上传凭证", B5 = "选填", U5 = "补充描述", W5 = "补充描述,有助于更好的处理售后问题", q5 = "退款原因", V5 = "退款金额", G5 = "确定", Y5 = "请选择", K5 = "最多可输入金额￥", Q5 = "提交", X5 = "没有更多内容啦~", Xhe = {
  uploadProof: H5,
  optional: B5,
  description: U5,
  descriptionPlaceholder: W5,
  refundReason: q5,
  refundMoney: V5,
  confirm: G5,
  placeholder: Y5,
  moreInputMoney: K5,
  submit: Q5,
  nothingMore: X5
}, Jhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirm: G5,
  default: Xhe,
  description: U5,
  descriptionPlaceholder: W5,
  moreInputMoney: K5,
  nothingMore: X5,
  optional: B5,
  placeholder: Y5,
  refundMoney: V5,
  refundReason: q5,
  submit: Q5,
  uploadProof: H5
}, Symbol.toStringTag, { value: "Module" })), J5 = "退货详情", Z5 = "极速退款成功", e8 = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", o8 = "退款方式", t8 = "退款原因", n8 = "退款编号", r8 = "申请时间", s8 = "退款说明", a8 = "协商记录", c8 = "查看", i8 = "取消退款", l8 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", d8 = "首页", u8 = "退款金额", p8 = "凭证", m8 = "没有更多内容啦~", Zhe = {
  refundDetail: J5,
  fastRefundSuccessful: Z5,
  refundInfo: e8,
  refundType: o8,
  refundCause: t8,
  refundNo: n8,
  createTime: r8,
  createExplain: s8,
  record: a8,
  check: c8,
  refundApply: i8,
  cancelRefundContent: l8,
  index: d8,
  refundMoney: u8,
  voucher: p8,
  nothingMore: m8
}, e_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: l8,
  check: c8,
  createExplain: s8,
  createTime: r8,
  default: Zhe,
  fastRefundSuccessful: Z5,
  index: d8,
  nothingMore: m8,
  record: a8,
  refundApply: i8,
  refundCause: t8,
  refundDetail: J5,
  refundInfo: e8,
  refundMoney: u8,
  refundNo: n8,
  refundType: o8,
  voucher: p8
}, Symbol.toStringTag, { value: "Module" })), f8 = "退款金额", g8 = "取消退款", h8 = "详情", _8 = "实付款", y8 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", $8 = "没有更多内容啦~", o_e = {
  refundMoney: f8,
  refundApply: g8,
  orderDetail: h8,
  actualPayment: _8,
  cancelRefundContent: y8,
  nothingMore: $8
}, t_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: _8,
  cancelRefundContent: y8,
  default: o_e,
  nothingMore: $8,
  orderDetail: h8,
  refundApply: g8,
  refundMoney: f8
}, Symbol.toStringTag, { value: "Module" })), v8 = "返回详情", b8 = "没有更多内容啦~", n_e = {
  detail: v8,
  nothingMore: b8
}, r_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: n_e,
  detail: v8,
  nothingMore: b8
}, Symbol.toStringTag, { value: "Module" })), T8 = "选择技师", P8 = "请选择", S8 = "预约时间", O8 = "买家留言", w8 = "请填写留言信息", C8 = "立即购买", M8 = "立即预约", A8 = "首页", j8 = "手机号", k8 = "请输入手机号", I8 = "请输入正确的手机号", N8 = "客服", D8 = "收藏", E8 = "没有更多内容啦~", s_e = {
  selectTechnician: T8,
  pleaseChoose: P8,
  reserveTime: S8,
  remark: O8,
  fillRemark: w8,
  buy: C8,
  reserve: M8,
  index: A8,
  mobile: j8,
  mobilePlaceholder: k8,
  correctMobilePlaceholder: I8,
  service: N8,
  collect: D8,
  nothingMore: E8
}, a_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: C8,
  collect: D8,
  correctMobilePlaceholder: I8,
  default: s_e,
  fillRemark: w8,
  index: A8,
  mobile: j8,
  mobilePlaceholder: k8,
  nothingMore: E8,
  pleaseChoose: P8,
  remark: O8,
  reserve: M8,
  reserveTime: S8,
  selectTechnician: T8,
  service: N8
}, Symbol.toStringTag, { value: "Module" })), x8 = "订单数", R8 = "工龄", z8 = "年", F8 = "年龄", L8 = "岁", H8 = "岗位", B8 = "基本信息", U8 = "服务项目", W8 = "没有更多内容啦~", c_e = {
  orderNum: x8,
  workingAge: R8,
  year: z8,
  age: F8,
  annum: L8,
  position: H8,
  basicInfo: B8,
  serviceItem: U8,
  nothingMore: W8
}, i_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  age: F8,
  annum: L8,
  basicInfo: B8,
  default: c_e,
  nothingMore: W8,
  orderNum: x8,
  position: H8,
  serviceItem: U8,
  workingAge: R8,
  year: z8
}, Symbol.toStringTag, { value: "Module" })), q8 = "年", V8 = "请输入搜索关键词", G8 = "已服务", Y8 = "已离职", K8 = "休息中", Q8 = "详情", X8 = "没有更多内容啦~", l_e = {
  year: q8,
  searchPlaceholder: V8,
  service: G8,
  haveLeft: Y8,
  takeBreak: K8,
  detail: Q8,
  nothingMore: X8
}, d_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: l_e,
  detail: Q8,
  haveLeft: Y8,
  nothingMore: X8,
  searchPlaceholder: V8,
  service: G8,
  takeBreak: K8,
  year: q8
}, Symbol.toStringTag, { value: "Module" })), u_e = {}, p_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: u_e
}, Symbol.toStringTag, { value: "Module" })), J8 = "订单号", Z8 = "实付款", eW = "关闭订单", oW = "确认收货", tW = "去支付", nW = "详情", rW = "支付流水号", sW = "创建时间", aW = "配送方式", cW = "支付方式", iW = "支付时间", lW = "商品金额", dW = "配送费用", uW = "实付金额", pW = "评价", mW = "查看评价", fW = "首页", gW = "优惠金额", hW = "查看物流", _W = "复制", yW = "详细信息", $W = "的帮付", vW = "用户备注", m_e = {
  orderNo: J8,
  actualPayment: Z8,
  orderClose: eW,
  orderFinish: oW,
  topay: tW,
  orderDetail: nW,
  orderTradeNo: rW,
  createTime: sW,
  deliveryType: aW,
  payTypeName: cW,
  payTime: iW,
  goodsMoney: lW,
  deliveryMoney: dW,
  orderMoney: uW,
  evaluate: pW,
  selectedEvaluate: mW,
  index: fW,
  discountMoney: gW,
  logisticsTracking: hW,
  copy: _W,
  detailedInformation: yW,
  helpPay: $W,
  memberRemark: vW
}, f_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: Z8,
  copy: _W,
  createTime: sW,
  default: m_e,
  deliveryMoney: dW,
  deliveryType: aW,
  detailedInformation: yW,
  discountMoney: gW,
  evaluate: pW,
  goodsMoney: lW,
  helpPay: $W,
  index: fW,
  logisticsTracking: hW,
  memberRemark: vW,
  orderClose: eW,
  orderDetail: nW,
  orderFinish: oW,
  orderMoney: uW,
  orderNo: J8,
  orderTradeNo: rW,
  payTime: iW,
  payTypeName: cW,
  selectedEvaluate: mW,
  topay: tW
}, Symbol.toStringTag, { value: "Module" })), bW = "暂无收货地址，请先创建地址", TW = "新增收货地址", PW = "选择地址", SW = "评价", OW = "元", wW = "待支付", CW = "剩余时间", MW = "含物流运输服务", AW = "查看评价", jW = "关闭订单", kW = "确认收货", IW = "支付", NW = "配送方式", DW = "下单时间", g_e = {
  emptyAddress: bW,
  addAddress: TW,
  selectAddress: PW,
  evaluate: SW,
  money: OW,
  pendingPayment: wW,
  pendingPaymentTips: CW,
  service: MW,
  selectedEvaluate: AW,
  orderClose: jW,
  orderFinish: kW,
  topay: IW,
  deliveryType: NW,
  createTime: DW
}, h_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: TW,
  createTime: DW,
  default: g_e,
  deliveryType: NW,
  emptyAddress: bW,
  evaluate: SW,
  money: OW,
  orderClose: jW,
  orderFinish: kW,
  pendingPayment: wW,
  pendingPaymentTips: CW,
  selectAddress: PW,
  selectedEvaluate: AW,
  service: MW,
  topay: IW
}, Symbol.toStringTag, { value: "Module" })), EW = "订单号", xW = "实付款", RW = "关闭订单", zW = "确认收货", FW = "支付", LW = "详情", HW = "评价", BW = "暂无订单", UW = "暂无收货地址，请先创建地址", WW = "换一换", qW = "活动说明", VW = "该商品起购", GW = "件", YW = "该商品每人限购", KW = "该商品单次限购", QW = "商品库存不足", XW = "件，超过按", JW = "购买", ZW = "限购", e6 = "一键购买", o6 = "我知道了", __e = {
  orderNo: EW,
  actualPayment: xW,
  orderClose: RW,
  orderFinish: zW,
  topay: FW,
  orderDetail: LW,
  evaluate: HW,
  orderListempty: BW,
  emptyAddress: UW,
  changeIt: WW,
  activityInstructions: qW,
  goodsLimitThree: VW,
  piece: GW,
  goodsLimitTwo: YW,
  goodsLimitOne: KW,
  stockNotEnough: QW,
  limitPlaceholderTwo: XW,
  limitPlaceholderThree: JW,
  limitPlaceholderOne: ZW,
  buyWithOneClick: e6,
  know: o6
}, y_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: qW,
  actualPayment: xW,
  buyWithOneClick: e6,
  changeIt: WW,
  default: __e,
  emptyAddress: UW,
  evaluate: HW,
  goodsLimitOne: KW,
  goodsLimitThree: VW,
  goodsLimitTwo: YW,
  know: o6,
  limitPlaceholderOne: ZW,
  limitPlaceholderThree: JW,
  limitPlaceholderTwo: XW,
  orderClose: RW,
  orderDetail: LW,
  orderFinish: zW,
  orderListempty: BW,
  orderNo: EW,
  piece: GW,
  stockNotEnough: QW,
  topay: FW
}, Symbol.toStringTag, { value: "Module" })), t6 = "退货详情", n6 = "极速退款成功", r6 = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", s6 = "退款方式", a6 = "退款金额", c6 = "退款原因", i6 = "拒绝原因", l6 = "退款编号", d6 = "申请时间", u6 = "退款说明", p6 = "协商记录", m6 = "查看", f6 = "取消退款", g6 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", h6 = "首页", $_e = {
  refundDetail: t6,
  fastRefundSuccessful: n6,
  refundInfo: r6,
  refundType: s6,
  refundMoney: a6,
  refundCause: c6,
  reasonRefusal: i6,
  refundNo: l6,
  createTime: d6,
  createExplain: u6,
  record: p6,
  check: m6,
  refundApply: f6,
  cancelRefundContent: g6,
  index: h6
}, v_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: g6,
  check: m6,
  createExplain: u6,
  createTime: d6,
  default: $_e,
  fastRefundSuccessful: n6,
  index: h6,
  reasonRefusal: i6,
  record: p6,
  refundApply: f6,
  refundCause: c6,
  refundDetail: t6,
  refundInfo: r6,
  refundMoney: a6,
  refundNo: l6,
  refundType: s6
}, Symbol.toStringTag, { value: "Module" })), _6 = "退款编号", y6 = "退款金额", $6 = "取消退款", v6 = "退款进度", b6 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", b_e = {
  refundNo: _6,
  refundMoney: y6,
  refundApply: $6,
  refund: v6,
  cancelRefundContent: b6
}, T_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: b6,
  default: b_e,
  refund: v6,
  refundApply: $6,
  refundMoney: y6,
  refundNo: _6
}, Symbol.toStringTag, { value: "Module" })), T6 = "订单号", P_e = {
  orderNo: T6
}, S_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: P_e,
  orderNo: T6
}, Symbol.toStringTag, { value: "Module" })), P6 = "充值", S6 = "提现", O6 = "余额明细", w6 = "账户余额（元）", C6 = "余额（元）", M6 = "可提现余额（元）", A6 = "可用余额", j6 = "充值金额不能低于", k6 = "确认", I6 = "请输入充值金额", N6 = "最低充值金额为", D6 = "元", E6 = "充值记录", x6 = "充值方式", R6 = "充值说明", O_e = {
  recharge: P6,
  cashOut: S6,
  balanceDetail: O6,
  accountBalance: w6,
  balance: C6,
  money: M6,
  availableBalance: A6,
  rechargeAmountError: j6,
  confirm: k6,
  customRechargeAmount: I6,
  minWithdrawal: N6,
  yuan: D6,
  rechargeRecord: E6,
  RechargeMethod: x6,
  rechargeInstructions: R6
}, w_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RechargeMethod: x6,
  accountBalance: w6,
  availableBalance: A6,
  balance: C6,
  balanceDetail: O6,
  cashOut: S6,
  confirm: k6,
  customRechargeAmount: I6,
  default: O_e,
  minWithdrawal: N6,
  money: M6,
  recharge: P6,
  rechargeAmountError: j6,
  rechargeInstructions: R6,
  rechargeRecord: E6,
  yuan: D6
}, Symbol.toStringTag, { value: "Module" })), z6 = "充值记录", F6 = "暂无充值记录", C_e = {
  rechargeRecord: z6,
  emptyTip: F6
}, M_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: C_e,
  emptyTip: F6,
  rechargeRecord: z6
}, Symbol.toStringTag, { value: "Module" })), L6 = "订单编号", H6 = "创建时间", A_e = {
  orderNo: L6,
  createTime: H6
}, j_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: H6,
  default: A_e,
  orderNo: L6
}, Symbol.toStringTag, { value: "Module" })), k_e = {}, I_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: k_e
}, Symbol.toStringTag, { value: "Module" })), N_e = {}, D_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: N_e
}, Symbol.toStringTag, { value: "Module" })), B6 = "订单号", U6 = "实付款", W6 = "关闭订单", q6 = "确认收货", V6 = "去支付", G6 = "详情", Y6 = "支付流水号", K6 = "创建时间", Q6 = "配送方式", X6 = "支付方式", J6 = "支付时间", Z6 = "商品金额", eq = "配送费用", oq = "实付金额", tq = "评价", nq = "查看评价", rq = "首页", sq = "优惠金额", aq = "查看物流", cq = "复制", iq = "详细信息", lq = "的帮付", dq = "用户备注", E_e = {
  orderNo: B6,
  actualPayment: U6,
  orderClose: W6,
  orderFinish: q6,
  topay: V6,
  orderDetail: G6,
  orderTradeNo: Y6,
  createTime: K6,
  deliveryType: Q6,
  payTypeName: X6,
  payTime: J6,
  goodsMoney: Z6,
  deliveryMoney: eq,
  orderMoney: oq,
  evaluate: tq,
  selectedEvaluate: nq,
  index: rq,
  discountMoney: sq,
  logisticsTracking: aq,
  copy: cq,
  detailedInformation: iq,
  helpPay: lq,
  memberRemark: dq
}, x_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: U6,
  copy: cq,
  createTime: K6,
  default: E_e,
  deliveryMoney: eq,
  deliveryType: Q6,
  detailedInformation: iq,
  discountMoney: sq,
  evaluate: tq,
  goodsMoney: Z6,
  helpPay: lq,
  index: rq,
  logisticsTracking: aq,
  memberRemark: dq,
  orderClose: W6,
  orderDetail: G6,
  orderFinish: q6,
  orderMoney: oq,
  orderNo: B6,
  orderTradeNo: Y6,
  payTime: J6,
  payTypeName: X6,
  selectedEvaluate: nq,
  topay: V6
}, Symbol.toStringTag, { value: "Module" })), uq = "暂无收货地址，请先创建地址", pq = "新增收货地址", mq = "选择地址", fq = "评价", gq = "元", hq = "待支付", _q = "剩余时间", yq = "含物流运输服务", $q = "查看评价", vq = "关闭订单", bq = "确认收货", Tq = "支付", Pq = "配送方式", Sq = "下单时间", R_e = {
  emptyAddress: uq,
  addAddress: pq,
  selectAddress: mq,
  evaluate: fq,
  money: gq,
  pendingPayment: hq,
  pendingPaymentTips: _q,
  service: yq,
  selectedEvaluate: $q,
  orderClose: vq,
  orderFinish: bq,
  topay: Tq,
  deliveryType: Pq,
  createTime: Sq
}, z_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: pq,
  createTime: Sq,
  default: R_e,
  deliveryType: Pq,
  emptyAddress: uq,
  evaluate: fq,
  money: gq,
  orderClose: vq,
  orderFinish: bq,
  pendingPayment: hq,
  pendingPaymentTips: _q,
  selectAddress: mq,
  selectedEvaluate: $q,
  service: yq,
  topay: Tq
}, Symbol.toStringTag, { value: "Module" })), Oq = "订单号", wq = "实付款", Cq = "关闭订单", Mq = "确认收货", Aq = "支付", jq = "详情", kq = "评价", Iq = "暂无订单", Nq = "暂无收货地址，请先创建地址", Dq = "换一换", Eq = "活动说明", xq = "该商品起购", Rq = "件", zq = "该商品每人限购", Fq = "该商品单次限购", Lq = "商品库存不足", Hq = "件，超过按", Bq = "购买", Uq = "限购", Wq = "一键购买", qq = "我知道了", F_e = {
  orderNo: Oq,
  actualPayment: wq,
  orderClose: Cq,
  orderFinish: Mq,
  topay: Aq,
  orderDetail: jq,
  evaluate: kq,
  orderListempty: Iq,
  emptyAddress: Nq,
  changeIt: Dq,
  activityInstructions: Eq,
  goodsLimitThree: xq,
  piece: Rq,
  goodsLimitTwo: zq,
  goodsLimitOne: Fq,
  stockNotEnough: Lq,
  limitPlaceholderTwo: Hq,
  limitPlaceholderThree: Bq,
  limitPlaceholderOne: Uq,
  buyWithOneClick: Wq,
  know: qq
}, L_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: Eq,
  actualPayment: wq,
  buyWithOneClick: Wq,
  changeIt: Dq,
  default: F_e,
  emptyAddress: Nq,
  evaluate: kq,
  goodsLimitOne: Fq,
  goodsLimitThree: xq,
  goodsLimitTwo: zq,
  know: qq,
  limitPlaceholderOne: Uq,
  limitPlaceholderThree: Bq,
  limitPlaceholderTwo: Hq,
  orderClose: Cq,
  orderDetail: jq,
  orderFinish: Mq,
  orderListempty: Iq,
  orderNo: Oq,
  piece: Rq,
  stockNotEnough: Lq,
  topay: Aq
}, Symbol.toStringTag, { value: "Module" })), Vq = "退货详情", Gq = "极速退款成功", Yq = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", Kq = "退款方式", Qq = "退款金额", Xq = "退款原因", Jq = "拒绝原因", Zq = "退款编号", eV = "申请时间", oV = "退款说明", tV = "协商记录", nV = "查看", rV = "取消退款", sV = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", aV = "首页", H_e = {
  refundDetail: Vq,
  fastRefundSuccessful: Gq,
  refundInfo: Yq,
  refundType: Kq,
  refundMoney: Qq,
  refundCause: Xq,
  reasonRefusal: Jq,
  refundNo: Zq,
  createTime: eV,
  createExplain: oV,
  record: tV,
  check: nV,
  refundApply: rV,
  cancelRefundContent: sV,
  index: aV
}, B_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: sV,
  check: nV,
  createExplain: oV,
  createTime: eV,
  default: H_e,
  fastRefundSuccessful: Gq,
  index: aV,
  reasonRefusal: Jq,
  record: tV,
  refundApply: rV,
  refundCause: Xq,
  refundDetail: Vq,
  refundInfo: Yq,
  refundMoney: Qq,
  refundNo: Zq,
  refundType: Kq
}, Symbol.toStringTag, { value: "Module" })), cV = "退款编号", iV = "退款金额", lV = "取消退款", dV = "退款进度", uV = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", U_e = {
  refundNo: cV,
  refundMoney: iV,
  refundApply: lV,
  refund: dV,
  cancelRefundContent: uV
}, W_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: uV,
  default: U_e,
  refund: dV,
  refundApply: lV,
  refundMoney: iV,
  refundNo: cV
}, Symbol.toStringTag, { value: "Module" })), q_e = {}, V_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: q_e
}, Symbol.toStringTag, { value: "Module" })), pV = "订单号", mV = "实付款", fV = "关闭订单", gV = "确认收货", hV = "去支付", _V = "详情", yV = "支付流水号", $V = "创建时间", vV = "配送方式", bV = "支付方式", TV = "支付时间", PV = "商品金额", SV = "配送费用", OV = "实付金额", wV = "评价", CV = "查看评价", MV = "首页", AV = "优惠金额", jV = "查看物流", kV = "复制", IV = "详细信息", NV = "的帮付", DV = "用户备注", G_e = {
  orderNo: pV,
  actualPayment: mV,
  orderClose: fV,
  orderFinish: gV,
  topay: hV,
  orderDetail: _V,
  orderTradeNo: yV,
  createTime: $V,
  deliveryType: vV,
  payTypeName: bV,
  payTime: TV,
  goodsMoney: PV,
  deliveryMoney: SV,
  orderMoney: OV,
  evaluate: wV,
  selectedEvaluate: CV,
  index: MV,
  discountMoney: AV,
  logisticsTracking: jV,
  copy: kV,
  detailedInformation: IV,
  helpPay: NV,
  memberRemark: DV
}, Y_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: mV,
  copy: kV,
  createTime: $V,
  default: G_e,
  deliveryMoney: SV,
  deliveryType: vV,
  detailedInformation: IV,
  discountMoney: AV,
  evaluate: wV,
  goodsMoney: PV,
  helpPay: NV,
  index: MV,
  logisticsTracking: jV,
  memberRemark: DV,
  orderClose: fV,
  orderDetail: _V,
  orderFinish: gV,
  orderMoney: OV,
  orderNo: pV,
  orderTradeNo: yV,
  payTime: TV,
  payTypeName: bV,
  selectedEvaluate: CV,
  topay: hV
}, Symbol.toStringTag, { value: "Module" })), EV = "暂无收货地址，请先创建地址", xV = "新增收货地址", RV = "选择地址", zV = "评价", FV = "元", LV = "待支付", HV = "剩余时间", BV = "含物流运输服务", UV = "查看评价", WV = "关闭订单", qV = "确认收货", VV = "支付", GV = "配送方式", YV = "下单时间", K_e = {
  emptyAddress: EV,
  addAddress: xV,
  selectAddress: RV,
  evaluate: zV,
  money: FV,
  pendingPayment: LV,
  pendingPaymentTips: HV,
  service: BV,
  selectedEvaluate: UV,
  orderClose: WV,
  orderFinish: qV,
  topay: VV,
  deliveryType: GV,
  createTime: YV
}, Q_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: xV,
  createTime: YV,
  default: K_e,
  deliveryType: GV,
  emptyAddress: EV,
  evaluate: zV,
  money: FV,
  orderClose: WV,
  orderFinish: qV,
  pendingPayment: LV,
  pendingPaymentTips: HV,
  selectAddress: RV,
  selectedEvaluate: UV,
  service: BV,
  topay: VV
}, Symbol.toStringTag, { value: "Module" })), KV = "订单号", QV = "实付款", XV = "关闭订单", JV = "确认收货", ZV = "支付", e7 = "详情", o7 = "评价", t7 = "暂无订单", n7 = "暂无收货地址，请先创建地址", r7 = "换一换", s7 = "活动说明", a7 = "该商品起购", c7 = "件", i7 = "该商品每人限购", l7 = "该商品单次限购", d7 = "商品库存不足", u7 = "件，超过按", p7 = "购买", m7 = "限购", f7 = "一键购买", g7 = "我知道了", X_e = {
  orderNo: KV,
  actualPayment: QV,
  orderClose: XV,
  orderFinish: JV,
  topay: ZV,
  orderDetail: e7,
  evaluate: o7,
  orderListempty: t7,
  emptyAddress: n7,
  changeIt: r7,
  activityInstructions: s7,
  goodsLimitThree: a7,
  piece: c7,
  goodsLimitTwo: i7,
  goodsLimitOne: l7,
  stockNotEnough: d7,
  limitPlaceholderTwo: u7,
  limitPlaceholderThree: p7,
  limitPlaceholderOne: m7,
  buyWithOneClick: f7,
  know: g7
}, J_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: s7,
  actualPayment: QV,
  buyWithOneClick: f7,
  changeIt: r7,
  default: X_e,
  emptyAddress: n7,
  evaluate: o7,
  goodsLimitOne: l7,
  goodsLimitThree: a7,
  goodsLimitTwo: i7,
  know: g7,
  limitPlaceholderOne: m7,
  limitPlaceholderThree: p7,
  limitPlaceholderTwo: u7,
  orderClose: XV,
  orderDetail: e7,
  orderFinish: JV,
  orderListempty: t7,
  orderNo: KV,
  piece: c7,
  stockNotEnough: d7,
  topay: ZV
}, Symbol.toStringTag, { value: "Module" })), h7 = "退货详情", _7 = "极速退款成功", y7 = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", $7 = "退款方式", v7 = "退款金额", b7 = "退款原因", T7 = "拒绝原因", P7 = "退款编号", S7 = "申请时间", O7 = "退款说明", w7 = "协商记录", C7 = "查看", M7 = "取消退款", A7 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", j7 = "首页", Z_e = {
  refundDetail: h7,
  fastRefundSuccessful: _7,
  refundInfo: y7,
  refundType: $7,
  refundMoney: v7,
  refundCause: b7,
  reasonRefusal: T7,
  refundNo: P7,
  createTime: S7,
  createExplain: O7,
  record: w7,
  check: C7,
  refundApply: M7,
  cancelRefundContent: A7,
  index: j7
}, eye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: A7,
  check: C7,
  createExplain: O7,
  createTime: S7,
  default: Z_e,
  fastRefundSuccessful: _7,
  index: j7,
  reasonRefusal: T7,
  record: w7,
  refundApply: M7,
  refundCause: b7,
  refundDetail: h7,
  refundInfo: y7,
  refundMoney: v7,
  refundNo: P7,
  refundType: $7
}, Symbol.toStringTag, { value: "Module" })), k7 = "退款编号", I7 = "退款金额", N7 = "取消退款", D7 = "退款进度", E7 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", oye = {
  refundNo: k7,
  refundMoney: I7,
  refundApply: N7,
  refund: D7,
  cancelRefundContent: E7
}, tye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: E7,
  default: oye,
  refund: D7,
  refundApply: N7,
  refundMoney: I7,
  refundNo: k7
}, Symbol.toStringTag, { value: "Module" })), x7 = "订单号", R7 = "实付款", z7 = "关闭订单", F7 = "确认收货", L7 = "优惠劵", H7 = "暂无收货地址，请先创建地址", B7 = "新增收货地址", U7 = "选择地址", nye = {
  orderNo: x7,
  actualPayment: R7,
  orderClose: z7,
  orderFinish: F7,
  coupon: L7,
  emptyAddress: H7,
  addAddress: B7,
  selectAddress: U7
}, rye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: R7,
  addAddress: B7,
  coupon: L7,
  default: nye,
  emptyAddress: H7,
  orderClose: z7,
  orderFinish: F7,
  orderNo: x7,
  selectAddress: U7
}, Symbol.toStringTag, { value: "Module" })), sye = {}, aye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sye
}, Symbol.toStringTag, { value: "Module" })), cye = {}, iye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cye
}, Symbol.toStringTag, { value: "Module" })), lye = {}, dye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lye
}, Symbol.toStringTag, { value: "Module" })), W7 = "全部", q7 = "价格", uye = {
  all: W7,
  price: q7
}, pye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: W7,
  default: uye,
  price: q7
}, Symbol.toStringTag, { value: "Module" })), V7 = "榜单规则", mye = {
  rankingRules: V7
}, fye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mye,
  rankingRules: V7
}, Symbol.toStringTag, { value: "Module" })), gye = {}, hye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gye
}, Symbol.toStringTag, { value: "Module" })), G7 = "优惠券", _ye = {
  coupon: G7
}, yye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coupon: G7,
  default: _ye
}, Symbol.toStringTag, { value: "Module" })), Y7 = "订单号", K7 = "实付款", Q7 = "关闭订单", X7 = "确认收货", J7 = "去支付", Z7 = "详情", e9 = "支付流水号", o9 = "创建时间", t9 = "配送方式", n9 = "支付方式", r9 = "支付时间", s9 = "商品金额", a9 = "配送费用", c9 = "实付金额", i9 = "评价", l9 = "查看评价", d9 = "首页", u9 = "优惠金额", p9 = "查看物流", m9 = "复制", f9 = "详细信息", g9 = "的帮付", h9 = "用户备注", _9 = "删除", $ye = {
  orderNo: Y7,
  actualPayment: K7,
  orderClose: Q7,
  orderFinish: X7,
  topay: J7,
  orderDetail: Z7,
  orderTradeNo: e9,
  createTime: o9,
  deliveryType: t9,
  payTypeName: n9,
  payTime: r9,
  goodsMoney: s9,
  deliveryMoney: a9,
  orderMoney: c9,
  evaluate: i9,
  selectedEvaluate: l9,
  index: d9,
  discountMoney: u9,
  logisticsTracking: p9,
  copy: m9,
  detailedInformation: f9,
  helpPay: g9,
  memberRemark: h9,
  orderDelete: _9
}, vye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: K7,
  copy: m9,
  createTime: o9,
  default: $ye,
  deliveryMoney: a9,
  deliveryType: t9,
  detailedInformation: f9,
  discountMoney: u9,
  evaluate: i9,
  goodsMoney: s9,
  helpPay: g9,
  index: d9,
  logisticsTracking: p9,
  memberRemark: h9,
  orderClose: Q7,
  orderDelete: _9,
  orderDetail: Z7,
  orderFinish: X7,
  orderMoney: c9,
  orderNo: Y7,
  orderTradeNo: e9,
  payTime: r9,
  payTypeName: n9,
  selectedEvaluate: l9,
  topay: J7
}, Symbol.toStringTag, { value: "Module" })), y9 = "暂无收货地址，请先创建地址", $9 = "新增收货地址", v9 = "选择地址", b9 = "评价", T9 = "元", P9 = "待支付", S9 = "剩余时间", O9 = "含物流运输服务", w9 = "查看评价", C9 = "关闭订单", M9 = "确认收货", A9 = "支付", j9 = "配送方式", k9 = "下单时间", I9 = "删除", bye = {
  emptyAddress: y9,
  addAddress: $9,
  selectAddress: v9,
  evaluate: b9,
  money: T9,
  pendingPayment: P9,
  pendingPaymentTips: S9,
  service: O9,
  selectedEvaluate: w9,
  orderClose: C9,
  orderFinish: M9,
  topay: A9,
  deliveryType: j9,
  createTime: k9,
  orderDelete: I9
}, Tye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: $9,
  createTime: k9,
  default: bye,
  deliveryType: j9,
  emptyAddress: y9,
  evaluate: b9,
  money: T9,
  orderClose: C9,
  orderDelete: I9,
  orderFinish: M9,
  pendingPayment: P9,
  pendingPaymentTips: S9,
  selectAddress: v9,
  selectedEvaluate: w9,
  service: O9,
  topay: A9
}, Symbol.toStringTag, { value: "Module" })), N9 = "订单号", D9 = "实付款", E9 = "关闭订单", x9 = "确认收货", R9 = "支付", z9 = "详情", F9 = "评价", L9 = "暂无订单", H9 = "暂无收货地址，请先创建地址", B9 = "换一换", U9 = "活动说明", W9 = "该商品起购", q9 = "件", V9 = "该商品每人限购", G9 = "该商品单次限购", Y9 = "商品库存不足", K9 = "件，超过按", Q9 = "购买", X9 = "限购", J9 = "一键购买", Z9 = "我知道了", Pye = {
  orderNo: N9,
  actualPayment: D9,
  orderClose: E9,
  orderFinish: x9,
  topay: R9,
  orderDetail: z9,
  evaluate: F9,
  orderListempty: L9,
  emptyAddress: H9,
  changeIt: B9,
  activityInstructions: U9,
  goodsLimitThree: W9,
  piece: q9,
  goodsLimitTwo: V9,
  goodsLimitOne: G9,
  stockNotEnough: Y9,
  limitPlaceholderTwo: K9,
  limitPlaceholderThree: Q9,
  limitPlaceholderOne: X9,
  buyWithOneClick: J9,
  know: Z9
}, Sye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: U9,
  actualPayment: D9,
  buyWithOneClick: J9,
  changeIt: B9,
  default: Pye,
  emptyAddress: H9,
  evaluate: F9,
  goodsLimitOne: G9,
  goodsLimitThree: W9,
  goodsLimitTwo: V9,
  know: Z9,
  limitPlaceholderOne: X9,
  limitPlaceholderThree: Q9,
  limitPlaceholderTwo: K9,
  orderClose: E9,
  orderDetail: z9,
  orderFinish: x9,
  orderListempty: L9,
  orderNo: N9,
  piece: q9,
  stockNotEnough: Y9,
  topay: R9
}, Symbol.toStringTag, { value: "Module" })), eG = "积分", oG = "元", tG = "已兑", Oye = {
  point: eG,
  priceUnit: oG,
  redeemed: tG
}, wye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oye,
  point: eG,
  priceUnit: oG,
  redeemed: tG
}, Symbol.toStringTag, { value: "Module" })), nG = "订单号", rG = "订单金额", sG = "关闭订单", aG = "确认收货", cG = "支付", iG = "详情", lG = "评价", dG = "查看评价", uG = "暂无订单", pG = "配送方式", mG = "元", fG = "积分", Cye = {
  orderNo: nG,
  actualPayment: rG,
  orderClose: sG,
  orderFinish: aG,
  topay: cG,
  orderDetail: iG,
  evaluate: lG,
  selectedEvaluate: dG,
  orderListempty: uG,
  deliveryType: pG,
  money: mG,
  point: fG
}, Mye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: rG,
  default: Cye,
  deliveryType: pG,
  evaluate: lG,
  money: mG,
  orderClose: sG,
  orderDetail: iG,
  orderFinish: aG,
  orderListempty: uG,
  orderNo: nG,
  point: fG,
  selectedEvaluate: dG,
  topay: cG
}, Symbol.toStringTag, { value: "Module" })), gG = "退货详情", hG = "极速退款成功", _G = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", yG = "退款方式", $G = "退款金额", vG = "退款原因", bG = "拒绝原因", TG = "退款编号", PG = "申请时间", SG = "退款说明", OG = "协商记录", wG = "查看", CG = "取消退款", MG = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", AG = "首页", Aye = {
  refundDetail: gG,
  fastRefundSuccessful: hG,
  refundInfo: _G,
  refundType: yG,
  refundMoney: $G,
  refundCause: vG,
  reasonRefusal: bG,
  refundNo: TG,
  createTime: PG,
  createExplain: SG,
  record: OG,
  check: wG,
  refundApply: CG,
  cancelRefundContent: MG,
  index: AG
}, jye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: MG,
  check: wG,
  createExplain: SG,
  createTime: PG,
  default: Aye,
  fastRefundSuccessful: hG,
  index: AG,
  reasonRefusal: bG,
  record: OG,
  refundApply: CG,
  refundCause: vG,
  refundDetail: gG,
  refundInfo: _G,
  refundMoney: $G,
  refundNo: TG,
  refundType: yG
}, Symbol.toStringTag, { value: "Module" })), jG = "退款编号", kG = "退款金额", IG = "取消退款", NG = "退款进度", DG = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", kye = {
  refundNo: jG,
  refundMoney: kG,
  refundApply: IG,
  refund: NG,
  cancelRefundContent: DG
}, Iye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: DG,
  default: kye,
  refund: NG,
  refundApply: IG,
  refundMoney: kG,
  refundNo: jG
}, Symbol.toStringTag, { value: "Module" })), EG = "订单号", Nye = {
  orderNo: EG
}, Dye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nye,
  orderNo: EG
}, Symbol.toStringTag, { value: "Module" })), xG = "退款状态：", Eye = {
  refundStatus: xG
}, xye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Eye,
  refundStatus: xG
}, Symbol.toStringTag, { value: "Module" })), RG = "分销活动未开启", zG = "系统任务奖励", FG = "提现", LG = "账单信息", HG = "累计佣金", BG = "销售奖励", UG = "销售额排行奖励", WG = "可提现", qG = "提现中", VG = "无", GG = "推荐人", Rye = {
  fenxiaoNotOpen: RG,
  taskDesc: zG,
  cashOut: FG,
  billingInformation: LG,
  commissionGet: HG,
  sale: BG,
  saleDesc: UG,
  commission: WG,
  commissionCashOuting: qG,
  notHave: VG,
  referrer: GG
}, zye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  billingInformation: LG,
  cashOut: FG,
  commission: WG,
  commissionCashOuting: qG,
  commissionGet: HG,
  default: Rye,
  fenxiaoNotOpen: RG,
  notHave: VG,
  referrer: GG,
  sale: BG,
  saleDesc: UG,
  taskDesc: zG
}, Symbol.toStringTag, { value: "Module" })), YG = "任务奖励", KG = "分销活动未开启", QG = "系统任务奖励", XG = "提现", JG = "账单信息", ZG = "累计佣金", eY = "待结算", oY = "销售奖励", tY = "销售额排行奖励", nY = "可提现", rY = "提现中", Fye = {
  task: YG,
  fenxiaoNotOpen: KG,
  taskDesc: QG,
  cashOut: XG,
  billingInformation: JG,
  commissionGet: ZG,
  pendingSettlement: eY,
  sale: oY,
  saleDesc: tY,
  commission: nY,
  commissionCashOuting: rY
}, Lye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  billingInformation: JG,
  cashOut: XG,
  commission: nY,
  commissionCashOuting: rY,
  commissionGet: ZG,
  default: Fye,
  fenxiaoNotOpen: KG,
  pendingSettlement: eY,
  sale: oY,
  saleDesc: tY,
  task: YG,
  taskDesc: QG
}, Symbol.toStringTag, { value: "Module" })), sY = "未解锁", aY = "满足以下任意条件", cY = "满足以下全部条件", iY = "即可升级", Hye = {
  notYetUnlocked: sY,
  arbitraryCondition: aY,
  allConditions: cY,
  upgradable: iY
}, Bye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allConditions: cY,
  arbitraryCondition: aY,
  default: Hye,
  notYetUnlocked: sY,
  upgradable: iY
}, Symbol.toStringTag, { value: "Module" })), lY = "退款状态：", Uye = {
  refundStatus: lY
}, Wye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Uye,
  refundStatus: lY
}, Symbol.toStringTag, { value: "Module" })), dY = "任务说明", uY = "奖励规则", qye = {
  taskSpecification: dY,
  rewardRules: uY
}, Vye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qye,
  rewardRules: uY,
  taskSpecification: dY
}, Symbol.toStringTag, { value: "Module" })), pY = "退款状态：", Gye = {
  refundStatus: pY
}, Yye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gye,
  refundStatus: pY
}, Symbol.toStringTag, { value: "Module" })), mY = "实付款", fY = "关闭订单", gY = "订单号", Kye = {
  actualPayment: mY,
  orderClose: fY,
  orderNo: gY
}, Qye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: mY,
  default: Kye,
  orderClose: fY,
  orderNo: gY
}, Symbol.toStringTag, { value: "Module" })), hY = "请输入卡片编号", _Y = "请输入卡片密码", yY = "立即兑换", $Y = "卡片编号", vY = "卡片密码", bY = "温馨提示", TY = "激活卡片", PY = "卡密激活", SY = "恭喜您 激活成功！", OY = "您已成功激活了1张礼品卡~", wY = "去看看", Xye = {
  cardNumberPlaceholder: hY,
  passwordPlaceholder: _Y,
  redeemNow: yY,
  cardNo: $Y,
  cardKey: vY,
  reminder: bY,
  activateCard: TY,
  cardEncryptionActivation: PY,
  popupTipsOne: SY,
  popupTipsTwo: OY,
  gouToSee: wY
}, Jye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activateCard: TY,
  cardEncryptionActivation: PY,
  cardKey: vY,
  cardNo: $Y,
  cardNumberPlaceholder: hY,
  default: Xye,
  gouToSee: wY,
  passwordPlaceholder: _Y,
  popupTipsOne: SY,
  popupTipsTwo: OY,
  redeemNow: yY,
  reminder: bY
}, Symbol.toStringTag, { value: "Module" })), CY = "全部", MY = "元", AY = "赠送好友", jY = "去使用", kY = "已使用", IY = "已失效", NY = "暂无卡记录", Zye = {
  all: CY,
  yuan: MY,
  giftToFriends: AY,
  canUse: jY,
  used: kY,
  invalid: IY,
  cardEmpty: NY
}, e$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: CY,
  canUse: jY,
  cardEmpty: NY,
  default: Zye,
  giftToFriends: AY,
  invalid: IY,
  used: kY,
  yuan: MY
}, Symbol.toStringTag, { value: "Module" })), DY = "购买数量", EY = "选择面值", xY = "可兑换商品", RY = "该兑换卡可在以下商品中任选", zY = "件兑换", FY = "该兑换卡可兑换以下商品", LY = "使用须知", HY = "礼品卡详情", BY = "售价", UY = "立即购买", WY = "该卡活动已结束", qY = "该卡已下架", VY = "缺少礼品卡id", GY = "找不到该礼品卡", o$e = {
  purchaseQuantity: DY,
  selectDenomination: EY,
  convertibleGoods: xY,
  goodsTitleOne: RY,
  goodsTitleOneAnd: zY,
  goodsTitleTwo: FY,
  instruction: LY,
  cardDesc: HY,
  price: BY,
  buyNow: UY,
  EventEnds: WY,
  removed: qY,
  lackCardId: VY,
  unableToFindGiftCard: GY
}, t$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventEnds: WY,
  buyNow: UY,
  cardDesc: HY,
  convertibleGoods: xY,
  default: o$e,
  goodsTitleOne: RY,
  goodsTitleOneAnd: zY,
  goodsTitleTwo: FY,
  instruction: LY,
  lackCardId: VY,
  price: BY,
  purchaseQuantity: DY,
  removed: qY,
  selectDenomination: EY,
  unableToFindGiftCard: GY
}, Symbol.toStringTag, { value: "Module" })), YY = "元", KY = "送上您的祝福", QY = "自定义祝福语", XY = "请填写您的祝福语", JY = "确定赠送好友", ZY = "赠送设置", eK = "礼品卡不存在", oK = "嘿！朋友送你一张礼品卡，快来领取吧~", tK = "赠送数量", nK = "本次赠送数量", rK = "请输入本次赠送数量", sK = "限领数量", aK = "每人最多可领数量", cK = "请输入每人最多可领数量", iK = "共有", lK = "张", dK = "张卡片", uK = "确定", n$e = {
  yuan: YY,
  blessing: KY,
  customBlessing: QY,
  blessingPlaceholder: XY,
  giftToFriendsSave: JY,
  giveSetUp: ZY,
  notCard: eK,
  shareTitle: oK,
  giveNum: tK,
  giveNumPlaceholder: nK,
  giveNumPlaceholderOne: rK,
  limitNum: sK,
  limitNumPlaceholder: aK,
  limitNumPlaceholderOne: cK,
  tipsAnd: iK,
  unit: lK,
  tipsEnd: dK,
  giveSave: uK
}, r$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  blessing: KY,
  blessingPlaceholder: XY,
  customBlessing: QY,
  default: n$e,
  giftToFriendsSave: JY,
  giveNum: tK,
  giveNumPlaceholder: nK,
  giveNumPlaceholderOne: rK,
  giveSave: uK,
  giveSetUp: ZY,
  limitNum: sK,
  limitNumPlaceholder: aK,
  limitNumPlaceholderOne: cK,
  notCard: eK,
  shareTitle: oK,
  tipsAnd: iK,
  tipsEnd: dK,
  unit: lK,
  yuan: YY
}, Symbol.toStringTag, { value: "Module" })), pK = "送给他的", mK = "您祝对方", fK = "对方已领取", gK = "礼品卡不存在", s$e = {
  giveTipsOne: pK,
  giveTipsTwo: mK,
  otherReceive: fK,
  notCard: gK
}, a$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: s$e,
  giveTipsOne: pK,
  giveTipsTwo: mK,
  notCard: gK,
  otherReceive: fK
}, Symbol.toStringTag, { value: "Module" })), hK = "元", _K = "查看详情", yK = "暂无卡记录", c$e = {
  yuan: hK,
  viewDetails: _K,
  cardEmpty: yK
}, i$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cardEmpty: yK,
  default: c$e,
  viewDetails: _K,
  yuan: hK
}, Symbol.toStringTag, { value: "Module" })), $K = "全部", vK = "暂无卡记录", l$e = {
  all: $K,
  cardEmpty: vK
}, d$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: $K,
  cardEmpty: vK,
  default: l$e
}, Symbol.toStringTag, { value: "Module" })), bK = "元", TK = "全部", PK = "去使用", SK = "已使用", OK = "已失效", wK = "张", CK = "赠送好友", MK = "查看卡包", AK = "暂无卡记录", u$e = {
  yuan: bK,
  all: TK,
  canUse: PK,
  used: SK,
  invalid: OK,
  unit: wK,
  giftToFriends: CK,
  seeCardBag: MK,
  cardEmpty: AK
}, p$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: TK,
  canUse: PK,
  cardEmpty: AK,
  default: u$e,
  giftToFriends: CK,
  invalid: OK,
  seeCardBag: MK,
  unit: wK,
  used: SK,
  yuan: bK
}, Symbol.toStringTag, { value: "Module" })), jK = "元储值卡", kK = "订单留言", IK = "订单号", NK = "实付款", DK = "关闭订单", EK = "确认收货", xK = "去支付", RK = "缺少订单id", zK = "详情", FK = "支付流水号", LK = "创建时间", HK = "配送方式", BK = "支付方式", UK = "支付时间", WK = "商品金额", qK = "实付金额", VK = "首页", GK = "复制", YK = "查看卡包", KK = "该卡已转赠", QK = "详细信息", XK = "提示", JK = "您确定要关闭该订单吗？", m$e = {
  yuanStoredValueCard: jK,
  orderMessage: kK,
  orderNo: IK,
  actualPayment: NK,
  orderClose: DK,
  orderFinish: EK,
  topay: xK,
  notOrderId: RK,
  orderDetail: zK,
  orderTradeNo: FK,
  createTime: LK,
  deliveryType: HK,
  payTypeName: BK,
  payTime: UK,
  goodsMoney: WK,
  orderMoney: qK,
  index: VK,
  copy: GK,
  seeCardBag: YK,
  transfergiftCard: KK,
  detailedInformation: QK,
  tips: XK,
  tipsOne: JK
}, f$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: NK,
  copy: GK,
  createTime: LK,
  default: m$e,
  deliveryType: HK,
  detailedInformation: QK,
  goodsMoney: WK,
  index: VK,
  notOrderId: RK,
  orderClose: DK,
  orderDetail: zK,
  orderFinish: EK,
  orderMessage: kK,
  orderMoney: qK,
  orderNo: IK,
  orderTradeNo: FK,
  payTime: UK,
  payTypeName: BK,
  seeCardBag: YK,
  tips: XK,
  tipsOne: JK,
  topay: xK,
  transfergiftCard: KK,
  yuanStoredValueCard: jK
}, Symbol.toStringTag, { value: "Module" })), ZK = "元储值卡", eQ = "支付", oQ = "全部", tQ = "关闭订单", nQ = "暂无购卡记录", rQ = "提示", sQ = "您确定要关闭该订单吗？", g$e = {
  yuanStoredValueCard: ZK,
  topay: eQ,
  all: oQ,
  orderClose: tQ,
  cardEmpty: nQ,
  tips: rQ,
  tipsOne: sQ
}, h$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: oQ,
  cardEmpty: nQ,
  default: g$e,
  orderClose: tQ,
  tips: rQ,
  tipsOne: sQ,
  topay: eQ,
  yuanStoredValueCard: ZK
}, Symbol.toStringTag, { value: "Module" })), aQ = "元储值卡", cQ = "订单留言", iQ = "合计", lQ = "提交订单", dQ = "选填,建议先与商家协商一致", _$e = {
  yuanStoredValueCard: aQ,
  orderMessage: cQ,
  total: iQ,
  placeOrder: lQ,
  remarkPlaceholder: dQ
}, y$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$e,
  orderMessage: cQ,
  placeOrder: lQ,
  remarkPlaceholder: dQ,
  total: iQ,
  yuanStoredValueCard: aQ
}, Symbol.toStringTag, { value: "Module" })), uQ = "对方祝您", pQ = "赠送给您", mQ = "您还可以领取", fQ = "次礼品卡", gQ = "立即领取", hQ = "已被领取", _Q = "恭喜您 领取成功！", yQ = "您已成功领取了1张礼品卡~", $Q = "去看看", vQ = "礼品卡不存在", bQ = "查看卡包", $$e = {
  receiveTipsOne: uQ,
  freeForYou: pQ,
  receiveTipsTwo: mQ,
  receiveTipsTwoAnd: fQ,
  GetItNow: gQ,
  alreadyClaimed: hQ,
  popupTipsOne: _Q,
  popupTipsTwo: yQ,
  gouToSee: $Q,
  notCard: vQ,
  seeCardBag: bQ
}, v$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetItNow: gQ,
  alreadyClaimed: hQ,
  default: $$e,
  freeForYou: pQ,
  gouToSee: $Q,
  notCard: vQ,
  popupTipsOne: _Q,
  popupTipsTwo: yQ,
  receiveTipsOne: uQ,
  receiveTipsTwo: mQ,
  receiveTipsTwoAnd: fQ,
  seeCardBag: bQ
}, Symbol.toStringTag, { value: "Module" })), TQ = "赠送好友", PQ = "全部", SQ = "去使用", OQ = "已使用", wQ = "已失效", CQ = "暂无卡记录", b$e = {
  giftToFriends: TQ,
  all: PQ,
  canUse: SQ,
  used: OQ,
  invalid: wQ,
  cardEmpty: CQ
}, T$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: PQ,
  canUse: SQ,
  cardEmpty: CQ,
  default: b$e,
  giftToFriends: TQ,
  invalid: wQ,
  used: OQ
}, Symbol.toStringTag, { value: "Module" })), MQ = "元", AQ = "可兑换商品", jQ = "该兑换卡可在以下商品中任选", kQ = "件商品兑换", IQ = "该兑换卡可兑换以下商品", NQ = "最多可选", DQ = "件 已兑换", EQ = "件", xQ = "使用须知", RQ = "礼品卡详情", zQ = "去使用", FQ = "已使用", LQ = "已失效", HQ = "赠送好友", BQ = "卡包", UQ = "恭喜您 到账成功！", WQ = "元已充值到您的账户中~", qQ = "去看看", VQ = "礼品卡不存在", P$e = {
  yuan: MQ,
  convertibleGoods: AQ,
  goodsTitleOne: jQ,
  goodsTitleOneAnd: kQ,
  goodsTitleTwo: IQ,
  cardGoodsTypeAllTips: NQ,
  cardGoodsTypeAllTipsAnd: DQ,
  unit: EQ,
  instruction: xQ,
  cardDesc: RQ,
  canUse: zQ,
  used: FQ,
  invalid: LQ,
  giftToFriends: HQ,
  cardBag: BQ,
  popupTipsOne: UQ,
  popupTipsTwo: WQ,
  gouToSee: qQ,
  notCard: VQ
}, S$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canUse: zQ,
  cardBag: BQ,
  cardDesc: RQ,
  cardGoodsTypeAllTips: NQ,
  cardGoodsTypeAllTipsAnd: DQ,
  convertibleGoods: AQ,
  default: P$e,
  giftToFriends: HQ,
  goodsTitleOne: jQ,
  goodsTitleOneAnd: kQ,
  goodsTitleTwo: IQ,
  gouToSee: qQ,
  instruction: xQ,
  invalid: LQ,
  notCard: VQ,
  popupTipsOne: UQ,
  popupTipsTwo: WQ,
  unit: EQ,
  used: FQ,
  yuan: MQ
}, Symbol.toStringTag, { value: "Module" })), GQ = "以下商品存在已售罄或已下架的商品，请耐心等待卖家备货", YQ = "请在以下商品中任选", KQ = "件商品", QQ = "请兑换以下商品", XQ = "最多可选", JQ = "件 已兑换", ZQ = "件", eX = "该商品已售罄", oX = "该商品已下架", tX = "卡包", nX = "确认兑换", rX = "已使用", sX = "已失效", aX = "礼品卡不存在", cX = "请选择需要兑换的商品", iX = "该礼品卡必须全部提货", O$e = {
  pageTips: GQ,
  goodsTitle: YQ,
  goodsTitleAnd: KQ,
  goodsTitleTwo: QQ,
  cardGoodsTypeAllTips: XQ,
  cardGoodsTypeAllTipsAnd: JQ,
  unit: ZQ,
  goodsSellOut: eX,
  goodsRemove: oX,
  cardBag: tX,
  confirmExchange: nX,
  used: rX,
  invalid: sX,
  notCard: aX,
  saveTipsOne: cX,
  saveTipsTwo: iX
}, w$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cardBag: tX,
  cardGoodsTypeAllTips: XQ,
  cardGoodsTypeAllTipsAnd: JQ,
  confirmExchange: nX,
  default: O$e,
  goodsRemove: oX,
  goodsSellOut: eX,
  goodsTitle: YQ,
  goodsTitleAnd: KQ,
  goodsTitleTwo: QQ,
  invalid: sX,
  notCard: aX,
  pageTips: GQ,
  saveTipsOne: cX,
  saveTipsTwo: iX,
  unit: ZQ,
  used: rX
}, Symbol.toStringTag, { value: "Module" })), C$e = {}, M$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: C$e
}, Symbol.toStringTag, { value: "Module" })), lX = "添加照片", dX = "添加封面", uX = "添加标题", pX = "分享您的体验和心得...", mX = "话题", fX = "关联宝贝", gX = "社区分类", hX = "发布", A$e = {
  addPhoto: lX,
  addCover: dX,
  addTitle: uX,
  contentTips: pX,
  topic: mX,
  treasure: fX,
  communityCategory: gX,
  create: hX
}, j$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addCover: dX,
  addPhoto: lX,
  addTitle: uX,
  communityCategory: gX,
  contentTips: pX,
  create: hX,
  default: A$e,
  topic: mX,
  treasure: fX
}, Symbol.toStringTag, { value: "Module" })), _X = "关注", yX = "粉丝", $X = "请输入搜索关键词", vX = "取消关注", bX = "暂无关注", TX = "暂无粉丝", PX = "确定取消关注", k$e = {
  follow: _X,
  fans: yX,
  searchTips: $X,
  unFollow: vX,
  noFollow: bX,
  noFans: TX,
  unfollowTips: PX
}, I$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: k$e,
  fans: yX,
  follow: _X,
  noFans: TX,
  noFollow: bX,
  searchTips: $X,
  unFollow: vX,
  unfollowTips: PX
}, Symbol.toStringTag, { value: "Module" })), SX = "正在审核，内容仅自己可见", OX = "发布的内容审核通过后，将展示在首页！", wX = "您的审核已被拒绝", CX = "您发布的内容已被强制下架", MX = "请重新编辑内容", AX = "已关注", jX = "关注", kX = "管理", IX = "编辑", NX = "购买", DX = "评论", EX = "回复", xX = "展开更多", RX = "收起", zX = "展开", FX = "条回复", LX = "暂无评论", HX = "请输入关键字", BX = "发送", UX = "转发", WX = "赞", qX = "确定取消关注", VX = "确定删除该内容吗", GX = "确定删除该评论吗", N$e = {
  auditTitle: SX,
  auditdesc: OX,
  auditrefuse: wX,
  offContent: CX,
  offContentDesc: MX,
  followed: AX,
  follow: jX,
  manage: kX,
  edit: IX,
  delete: "删除",
  buy: NX,
  comment: DX,
  reply: EX,
  expandMore: xX,
  packUp: RX,
  expand: zX,
  replysWord: FX,
  noComments: LX,
  keywordsPlaceholder: HX,
  send: BX,
  transpond: UX,
  like: WX,
  unfollowTips: qX,
  deleteContentTips: VX,
  deleteCommentTips: GX
}, D$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTitle: SX,
  auditdesc: OX,
  auditrefuse: wX,
  buy: NX,
  comment: DX,
  default: N$e,
  deleteCommentTips: GX,
  deleteContentTips: VX,
  edit: IX,
  expand: zX,
  expandMore: xX,
  follow: jX,
  followed: AX,
  keywordsPlaceholder: HX,
  like: WX,
  manage: kX,
  noComments: LX,
  offContent: CX,
  offContentDesc: MX,
  packUp: RX,
  reply: EX,
  replysWord: FX,
  send: BX,
  transpond: UX,
  unfollowTips: qX
}, Symbol.toStringTag, { value: "Module" })), YX = "关注", KX = "发现", QX = "精选", XX = "图", JX = "暂无内容", ZX = "更多", eJ = "购买", oJ = "分享", tJ = "编辑", nJ = "展开", rJ = "收起", sJ = "发布您的第一个种草秀", aJ = "去发布", cJ = "发布作品", iJ = "我的主页", lJ = "确定删除该内容吗", E$e = {
  follow: YX,
  find: KX,
  selection: QX,
  picture: XX,
  noContent: JX,
  more: ZX,
  buy: eJ,
  share: oJ,
  edit: tJ,
  delete: "删除",
  expand: nJ,
  packUp: rJ,
  createFirstSowCommunity: sJ,
  toCreate: aJ,
  createContent: cJ,
  myInfo: iJ,
  deleteContentTips: lJ
}, x$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: eJ,
  createContent: cJ,
  createFirstSowCommunity: sJ,
  default: E$e,
  deleteContentTips: lJ,
  edit: tJ,
  expand: nJ,
  find: KX,
  follow: YX,
  more: ZX,
  myInfo: iJ,
  noContent: JX,
  packUp: rJ,
  picture: XX,
  selection: QX,
  share: oJ,
  toCreate: aJ
}, Symbol.toStringTag, { value: "Module" })), dJ = "去发布", uJ = "取消关注", pJ = "关注", mJ = "粉丝", fJ = "获赞", gJ = "作品", hJ = "赞过", _J = "正在审核...", yJ = "通过后将在列表展示", $J = "审核拒绝...", vJ = "暂无作品", bJ = "强制下架...", TJ = "请重新编辑内容", PJ = "确定取消关注", R$e = {
  toCreate: dJ,
  unFollow: uJ,
  follow: pJ,
  fans: mJ,
  like: fJ,
  content: gJ,
  liked: hJ,
  inAudit: _J,
  auditTips: yJ,
  auditRefuse: $J,
  noContent: vJ,
  offContent: bJ,
  offContentTips: TJ,
  unfollowTips: PJ
}, z$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditRefuse: $J,
  auditTips: yJ,
  content: gJ,
  default: R$e,
  fans: mJ,
  follow: pJ,
  inAudit: _J,
  like: fJ,
  liked: hJ,
  noContent: vJ,
  offContent: bJ,
  offContentTips: TJ,
  toCreate: dJ,
  unFollow: uJ,
  unfollowTips: PJ
}, Symbol.toStringTag, { value: "Module" })), SJ = "请输入关键字", OJ = "搜索", wJ = "图", CJ = "暂无内容", F$e = {
  keywordsTips: SJ,
  search: OJ,
  picture: wJ,
  noContent: CJ
}, L$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: F$e,
  keywordsTips: SJ,
  noContent: CJ,
  picture: wJ,
  search: OJ
}, Symbol.toStringTag, { value: "Module" })), MJ = "条种草秀", AJ = "图", jJ = "暂无内容", H$e = {
  itemSowshow: MJ,
  picture: AJ,
  noContent: jJ
}, B$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: H$e,
  itemSowshow: MJ,
  noContent: jJ,
  picture: AJ
}, Symbol.toStringTag, { value: "Module" })), kJ = "请输入话题名称", IJ = "欢迎加入", NJ = "讨论", DJ = "去发布", EJ = "种草", xJ = "篇", RJ = "内容", zJ = "最热", FJ = "图", LJ = "暂无内容", U$e = {
  keywordsTips: kJ,
  welcomeIn: IJ,
  discussion: NJ,
  toCreate: DJ,
  sowCommunity: EJ,
  piece: xJ,
  content: RJ,
  hot: zJ,
  new: "最新",
  picture: FJ,
  noContent: LJ
}, W$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  content: RJ,
  default: U$e,
  discussion: NJ,
  hot: zJ,
  keywordsTips: kJ,
  noContent: LJ,
  picture: FJ,
  piece: xJ,
  sowCommunity: EJ,
  toCreate: DJ,
  welcomeIn: IJ
}, Symbol.toStringTag, { value: "Module" })), HJ = "分享", BJ = "编辑", UJ = "展开", WJ = "收起", qJ = "购买", VJ = "暂无内容", GJ = "发布您的第一个种草秀", YJ = "去发布", KJ = "确定删除该内容吗", q$e = {
  share: HJ,
  edit: BJ,
  delete: "删除",
  expand: UJ,
  packUp: WJ,
  buy: qJ,
  noContent: VJ,
  createFirstSowCommunity: GJ,
  toCreate: YJ,
  deleteContentTips: KJ
}, V$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: qJ,
  createFirstSowCommunity: GJ,
  default: q$e,
  deleteContentTips: KJ,
  edit: BJ,
  expand: UJ,
  noContent: VJ,
  packUp: WJ,
  share: HJ,
  toCreate: YJ
}, Symbol.toStringTag, { value: "Module" })), G$e = {}, Y$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: G$e
}, Symbol.toStringTag, { value: "Module" })), QJ = "全部", XJ = "价格", K$e = {
  all: QJ,
  price: XJ
}, Q$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: QJ,
  default: K$e,
  price: XJ
}, Symbol.toStringTag, { value: "Module" })), JJ = "订单号", ZJ = "起", eZ = "星级", oZ = "星", tZ = "景点", nZ = "线路", rZ = "酒店", sZ = "查看更多", X$e = {
  orderNo: JJ,
  rise: ZJ,
  starLevel: eZ,
  star: oZ,
  scenic: tZ,
  way: nZ,
  hotel: rZ,
  seeMore: sZ
}, J$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: X$e,
  hotel: rZ,
  orderNo: JJ,
  rise: ZJ,
  scenic: tZ,
  seeMore: sZ,
  star: oZ,
  starLevel: eZ,
  way: nZ
}, Symbol.toStringTag, { value: "Module" })), aZ = "详情/设施", cZ = "地图", iZ = "入住", lZ = "离店", dZ = "晚", uZ = "共", pZ = "抢", mZ = "在线付", fZ = "立即预约", gZ = "住店", hZ = "离店", _Z = "请选择离店日期", Z$e = {
  hotelTab: aZ,
  map: cZ,
  checkToday: iZ,
  checkTomorrow: lZ,
  lateness: dZ,
  common: uZ,
  rob: pZ,
  onlinePayment: mZ,
  bookNow: fZ,
  inHotel: gZ,
  checkOut: hZ,
  checkOutDate: _Z
}, eve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: fZ,
  checkOut: hZ,
  checkOutDate: _Z,
  checkToday: iZ,
  checkTomorrow: lZ,
  common: uZ,
  default: Z$e,
  hotelTab: aZ,
  inHotel: gZ,
  lateness: dZ,
  map: cZ,
  onlinePayment: mZ,
  rob: pZ
}, Symbol.toStringTag, { value: "Module" })), yZ = "请输入酒店名字", $Z = "全部", vZ = "起", bZ = "价格", ove = {
  searchHotelName: yZ,
  all: $Z,
  rise: vZ,
  price: bZ
}, tve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: $Z,
  default: ove,
  price: bZ,
  rise: vZ,
  searchHotelName: yZ
}, Symbol.toStringTag, { value: "Module" })), TZ = "景点", PZ = "线路", SZ = "酒店", OZ = "订单号", wZ = "起", CZ = "星级", MZ = "星", AZ = "查看更多", nve = {
  scenic: TZ,
  way: PZ,
  hotel: SZ,
  orderNo: OZ,
  rise: wZ,
  starLevel: CZ,
  star: MZ,
  seeMore: AZ
}, rve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nve,
  hotel: SZ,
  orderNo: OZ,
  rise: wZ,
  scenic: TZ,
  seeMore: AZ,
  star: MZ,
  starLevel: CZ,
  way: PZ
}, Symbol.toStringTag, { value: "Module" })), jZ = "的帮付", sve = {
  helpPay: jZ
}, ave = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sve,
  helpPay: jZ
}, Symbol.toStringTag, { value: "Module" })), kZ = "请输入景点名称", cve = {
  searchScenicName: kZ
}, ive = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cve,
  searchScenicName: kZ
}, Symbol.toStringTag, { value: "Module" })), IZ = "请输入景点名称", lve = {
  searchScenicName: IZ
}, dve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lve,
  searchScenicName: IZ
}, Symbol.toStringTag, { value: "Module" })), NZ = "请输入景点名称", uve = {
  searchScenicName: NZ
}, pve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: uve,
  searchScenicName: NZ
}, Symbol.toStringTag, { value: "Module" })), DZ = "已核销", EZ = "待核销", xZ = "核销其他", RZ = "订单编号", zZ = "创建时间", FZ = "支付时间", LZ = "核销时间", HZ = "线路信息", BZ = "预订时间", UZ = "游客人数", WZ = "景点信息", qZ = "门票信息", VZ = "酒店信息", GZ = "房型信息", YZ = "入住日期", KZ = "离店日期", QZ = "房间数", XZ = "未获取到核销记录", mve = {
  used: DZ,
  waitUse: EZ,
  verifyOther: xZ,
  orderNo: RZ,
  createTime: zZ,
  payTime: FZ,
  verifyTime: LZ,
  wayInfo: HZ,
  reserveTime: BZ,
  touristNum: UZ,
  scenicInfo: WZ,
  ticketInfo: qZ,
  hotelInfo: VZ,
  roomInfo: GZ,
  hotelStartTime: YZ,
  hotelEndTime: KZ,
  hoteltNum: QZ,
  verifyDetailEmpty: XZ
}, fve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: zZ,
  default: mve,
  hotelEndTime: KZ,
  hotelInfo: VZ,
  hotelStartTime: YZ,
  hoteltNum: QZ,
  orderNo: RZ,
  payTime: FZ,
  reserveTime: BZ,
  roomInfo: GZ,
  scenicInfo: WZ,
  ticketInfo: qZ,
  touristNum: UZ,
  used: DZ,
  verifyDetailEmpty: XZ,
  verifyOther: xZ,
  verifyTime: LZ,
  waitUse: EZ,
  wayInfo: HZ
}, Symbol.toStringTag, { value: "Module" })), JZ = "不是核销员", ZZ = "核销券码", eee = "确认核销", oee = "请输入核销码", tee = "核销记录", nee = "查询", ree = "未查询到核销码信息", see = "已核销", aee = "待核销", cee = "核销其他", iee = "订单编号", lee = "创建时间", dee = "支付时间", uee = "核销时间", pee = "线路信息", mee = "预订时间", fee = "游客人数", gee = "景点信息", hee = "门票信息", _ee = "酒店信息", yee = "房型信息", $ee = "入住日期", vee = "离店日期", bee = "房间数", gve = {
  notIsVerifier: JZ,
  verifyTitle: ZZ,
  confirmVerify: eee,
  inputPlaceholder: oee,
  verifyRecord: tee,
  search: nee,
  notSearchResult: ree,
  used: see,
  waitUse: aee,
  verifyOther: cee,
  orderNo: iee,
  createTime: lee,
  payTime: dee,
  verifyTime: uee,
  wayInfo: pee,
  reserveTime: mee,
  touristNum: fee,
  scenicInfo: gee,
  ticketInfo: hee,
  hotelInfo: _ee,
  roomInfo: yee,
  hotelStartTime: $ee,
  hotelEndTime: vee,
  hoteltNum: bee
}, hve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmVerify: eee,
  createTime: lee,
  default: gve,
  hotelEndTime: vee,
  hotelInfo: _ee,
  hotelStartTime: $ee,
  hoteltNum: bee,
  inputPlaceholder: oee,
  notIsVerifier: JZ,
  notSearchResult: ree,
  orderNo: iee,
  payTime: dee,
  reserveTime: mee,
  roomInfo: yee,
  scenicInfo: gee,
  search: nee,
  ticketInfo: hee,
  touristNum: fee,
  used: see,
  verifyOther: cee,
  verifyRecord: tee,
  verifyTime: uee,
  verifyTitle: ZZ,
  waitUse: aee,
  wayInfo: pee
}, Symbol.toStringTag, { value: "Module" })), Tee = "请输入线路名字", _ve = {
  searchWayName: Tee
}, yve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _ve,
  searchWayName: Tee
}, Symbol.toStringTag, { value: "Module" })), Pee = "项目预约", See = "办理次卡", Oee = "预约成功", wee = "预约", Cee = "次卡", Mee = "去抢购", Aee = "办理", jee = "已售", kee = "订单号", Iee = "我的", Nee = "会员码", Dee = "查看更多", $ve = {
  cardReserve: Pee,
  card: See,
  reserveSuccess: Oee,
  reserve: wee,
  cardLink: Cee,
  reserveBtn: Mee,
  cardBtn: Aee,
  soldOut: jee,
  orderNo: kee,
  myLink: Iee,
  memberCode: Nee,
  seeMore: Dee
}, vve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  card: See,
  cardBtn: Aee,
  cardLink: Cee,
  cardReserve: Pee,
  default: $ve,
  memberCode: Nee,
  myLink: Iee,
  orderNo: kee,
  reserve: wee,
  reserveBtn: Mee,
  reserveSuccess: Oee,
  seeMore: Dee,
  soldOut: jee
}, Symbol.toStringTag, { value: "Module" })), Eee = "卡项内项目/商品总的可用次数为", xee = "次数不限 ,", Ree = "有效期为", zee = "永久", Fee = "天", Lee = "包含套餐", Hee = "可用次数", Bee = "购买须知", Uee = "暂无购买须知", Wee = "卡项详情", qee = "暂无卡项详情", Vee = "立即购买", Gee = "首页", Yee = "客服", Kee = "收藏", Qee = "已售", Xee = "有效期", Jee = "总次数：", Zee = "已使用次数：", eoe = "价格", bve = {
  hitCount: Eee,
  unlimitedNumberTimes: xee,
  periodValidity: Ree,
  perpetual: zee,
  day: Fee,
  packageIncluded: Lee,
  hitCountOne: Hee,
  purchaseNotes: Bee,
  noPurchaseNotes: Uee,
  cardDetail: Wee,
  noCardDetail: qee,
  buy: Vee,
  index: Gee,
  service: Yee,
  collect: Kee,
  soldOut: Qee,
  create: Xee,
  usable: Jee,
  haveBeen: Zee,
  price: eoe
}, Tve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: Vee,
  cardDetail: Wee,
  collect: Kee,
  create: Xee,
  day: Fee,
  default: bve,
  haveBeen: Zee,
  hitCount: Eee,
  hitCountOne: Hee,
  index: Gee,
  noCardDetail: qee,
  noPurchaseNotes: Uee,
  packageIncluded: Lee,
  periodValidity: Ree,
  perpetual: zee,
  price: eoe,
  purchaseNotes: Bee,
  service: Yee,
  soldOut: Qee,
  unlimitedNumberTimes: xee,
  usable: Jee
}, Symbol.toStringTag, { value: "Module" })), ooe = "请输入搜索关键词", toe = "抢购", noe = "项目预约", roe = "办理次卡", soe = "预约成功", aoe = "预约", coe = "次卡", ioe = "办理", loe = "已售", doe = "订单号", uoe = "我的", poe = "会员码", moe = "查看更多", Pve = {
  searchNamePlaceholder: ooe,
  reserveBtn: toe,
  cardReserve: noe,
  card: roe,
  reserveSuccess: soe,
  reserve: aoe,
  cardLink: coe,
  cardBtn: ioe,
  soldOut: loe,
  orderNo: doe,
  myLink: uoe,
  memberCode: poe,
  seeMore: moe
}, Sve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  card: roe,
  cardBtn: ioe,
  cardLink: coe,
  cardReserve: noe,
  default: Pve,
  memberCode: poe,
  myLink: uoe,
  orderNo: doe,
  reserve: aoe,
  reserveBtn: toe,
  reserveSuccess: soe,
  searchNamePlaceholder: ooe,
  seeMore: moe,
  soldOut: loe
}, Symbol.toStringTag, { value: "Module" })), foe = "核销次数", Ove = {
  verificationNum: foe
}, wve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ove,
  verificationNum: foe
}, Symbol.toStringTag, { value: "Module" })), goe = "订单", hoe = "您的订单", _oe = "，欢迎再次预订！", yoe = "实付款", $oe = "订单编号", voe = "复制", boe = "交易号", Toe = "下单时间", Poe = "关闭时间", Soe = "支付时间", Ooe = "支付方式", woe = "订单进度", Coe = "退款进度", Moe = "拒绝原因", Aoe = "退款方式：原路退款，", joe = "退款金额", koe = "首页", Ioe = "客服", Noe = "收藏", Doe = "去使用", Eoe = "查看退款", xoe = "取消退款", Roe = "申请退款", zoe = "的帮付", Foe = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", Cve = {
  order: goe,
  yourOrder: hoe,
  rebook: _oe,
  annualPayment: yoe,
  onOrder: $oe,
  copy: voe,
  transactionNumber: boe,
  orderTime: Toe,
  offTime: Poe,
  payTime: Soe,
  modePayment: Ooe,
  orderSchedule: woe,
  refundProgress: Coe,
  reasonRefusal: Moe,
  refundMethod: Aoe,
  refundAmount: joe,
  index: koe,
  service: Ioe,
  collect: Noe,
  toUse: Doe,
  viewRefund: Eoe,
  cancelRefund: xoe,
  applyRefund: Roe,
  helpPay: zoe,
  cancelRefundContent: Foe
}, Mve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annualPayment: yoe,
  applyRefund: Roe,
  cancelRefund: xoe,
  cancelRefundContent: Foe,
  collect: Noe,
  copy: voe,
  default: Cve,
  helpPay: zoe,
  index: koe,
  modePayment: Ooe,
  offTime: Poe,
  onOrder: $oe,
  order: goe,
  orderSchedule: woe,
  orderTime: Toe,
  payTime: Soe,
  reasonRefusal: Moe,
  rebook: _oe,
  refundAmount: joe,
  refundMethod: Aoe,
  refundProgress: Coe,
  service: Ioe,
  toUse: Doe,
  transactionNumber: boe,
  viewRefund: Eoe,
  yourOrder: hoe
}, Symbol.toStringTag, { value: "Module" })), Loe = "全部", Hoe = "实付金额", Boe = "未获取到订单信息", Ave = {
  all: Loe,
  payMoney: Hoe,
  emptyTips: Boe
}, jve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: Loe,
  default: Ave,
  emptyTips: Boe,
  payMoney: Hoe
}, Symbol.toStringTag, { value: "Module" })), Uoe = "购买时间：", Woe = "卡项次数：不限次数", qoe = "卡项次数：", Voe = "去使用", kve = {
  createTime: Uoe,
  cardNumNoLimit: Woe,
  cardNum: qoe,
  toUse: Voe
}, Ive = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cardNum: qoe,
  cardNumNoLimit: Woe,
  createTime: Uoe,
  default: kve,
  toUse: Voe
}, Symbol.toStringTag, { value: "Module" })), Goe = "使用记录", Yoe = "使用说明", Koe = "暂无使用说明", Qoe = "服务内容", Xoe = "有效期", Joe = "创建时间", Zoe = "去核销", ete = "核销码", ote = "总次数：", tte = "已使用次数：", nte = "卡项内项目/商品总的可用次数为", rte = "次数不限 ,", ste = "未消费前请不要将券码提供给商家", Nve = {
  usageRecord: Goe,
  instructions: Yoe,
  noInstructions: Koe,
  serviceContent: Qoe,
  periodValidity: Xoe,
  createTime: Joe,
  verification: Zoe,
  verificationCode: ete,
  usable: ote,
  haveBeen: tte,
  hitCount: nte,
  unlimitedNumberTimes: rte,
  codeDesc: ste
}, Dve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  codeDesc: ste,
  createTime: Joe,
  default: Nve,
  haveBeen: tte,
  hitCount: nte,
  instructions: Yoe,
  noInstructions: Koe,
  periodValidity: Xoe,
  serviceContent: Qoe,
  unlimitedNumberTimes: rte,
  usable: ote,
  usageRecord: Goe,
  verification: Zoe,
  verificationCode: ete
}, Symbol.toStringTag, { value: "Module" })), ate = "全部", cte = "实付金额", ite = "未获取到订单信息", Eve = {
  all: ate,
  payMoney: cte,
  emptyTips: ite
}, xve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: ate,
  default: Eve,
  emptyTips: ite,
  payMoney: cte
}, Symbol.toStringTag, { value: "Module" })), lte = "预约技师", dte = "预约时间", ute = "预约信息", pte = "订单编号", mte = "创建时间", fte = "联系电话", gte = "共计", hte = "个商品", _te = "取消预约", yte = "立即支付", $te = "买家留言", vte = "预约状态", Rve = {
  reservedTechnician: lte,
  reservedTime: dte,
  reservedInfo: ute,
  orderNo: pte,
  createTime: mte,
  mobile: fte,
  sumTo: gte,
  goodsNum: hte,
  cancelReserved: _te,
  pay: yte,
  remark: $te,
  reserveStateName: vte
}, zve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelReserved: _te,
  createTime: mte,
  default: Rve,
  goodsNum: hte,
  mobile: fte,
  orderNo: pte,
  pay: yte,
  remark: $te,
  reserveStateName: vte,
  reservedInfo: ute,
  reservedTechnician: lte,
  reservedTime: dte,
  sumTo: gte
}, Symbol.toStringTag, { value: "Module" })), bte = "购买须知", Tte = "暂无购买须知", Pte = "卡项详情", Ste = "暂无卡项详情", Ote = "立即购买", wte = "立即预约", Cte = "首页", Mte = "客服", Ate = "收藏", Fve = {
  purchaseNotes: bte,
  noPurchaseNotes: Tte,
  cardDetail: Pte,
  noCardDetail: Ste,
  buy: Ote,
  reserve: wte,
  index: Cte,
  service: Mte,
  collect: Ate
}, Lve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: Ote,
  cardDetail: Pte,
  collect: Ate,
  default: Fve,
  index: Cte,
  noCardDetail: Ste,
  noPurchaseNotes: Tte,
  purchaseNotes: bte,
  reserve: wte,
  service: Mte
}, Symbol.toStringTag, { value: "Module" })), jte = "请输入搜索关键词", kte = "抢购", Hve = {
  searchNamePlaceholder: jte,
  reserveBtn: kte
}, Bve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hve,
  reserveBtn: kte,
  searchNamePlaceholder: jte
}, Symbol.toStringTag, { value: "Module" })), Ite = "选择技师", Nte = "请选择", Dte = "预约时间", Ete = "买家留言", xte = "请填写留言信息", Rte = "立即购买", zte = "立即预约", Fte = "首页", Lte = "手机号", Hte = "请输入手机号", Bte = "请输入正确的手机号", Ute = "客服", Wte = "收藏", Uve = {
  selectTechnician: Ite,
  pleaseChoose: Nte,
  reserveTime: Dte,
  remark: Ete,
  fillRemark: xte,
  buy: Rte,
  reserve: zte,
  index: Fte,
  mobile: Lte,
  mobilePlaceholder: Hte,
  correctMobilePlaceholder: Bte,
  service: Ute,
  collect: Wte
}, Wve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: Rte,
  collect: Wte,
  correctMobilePlaceholder: Bte,
  default: Uve,
  fillRemark: xte,
  index: Fte,
  mobile: Lte,
  mobilePlaceholder: Hte,
  pleaseChoose: Nte,
  remark: Ete,
  reserve: zte,
  reserveTime: Dte,
  selectTechnician: Ite,
  service: Ute
}, Symbol.toStringTag, { value: "Module" })), qte = "核销时间", Vte = "核销码", Gte = "核销次数", qve = {
  createTime: qte,
  verifyCode: Vte,
  verifyNum: Gte
}, Vve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: qte,
  default: qve,
  verifyCode: Vte,
  verifyNum: Gte
}, Symbol.toStringTag, { value: "Module" })), Yte = "不是核销员", Kte = "核销券码", Qte = "确认核销", Xte = "请输入核销码", Jte = "核销记录", Zte = "查询", ene = "未查询到核销码信息", one = "已核销", tne = "待核销", nne = "核销其他", rne = "创建时间", sne = "核销时间", ane = "有效期", cne = "长期有效", ine = "可用次数", lne = "核销数量", dne = "不限制次数", une = "已核销次数", Gve = {
  notIsVerifier: Yte,
  verifyTitle: Kte,
  confirmVerify: Qte,
  inputPlaceholder: Xte,
  verifyRecord: Jte,
  search: Zte,
  notSearchResult: ene,
  used: one,
  waitUse: tne,
  verifyOther: nne,
  createTime: rne,
  verifyTime: sne,
  expireTime: ane,
  longTerm: cne,
  availableNum: ine,
  verifyNum: lne,
  noLimitNum: dne,
  useNum: une
}, Yve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  availableNum: ine,
  confirmVerify: Qte,
  createTime: rne,
  default: Gve,
  expireTime: ane,
  inputPlaceholder: Xte,
  longTerm: cne,
  noLimitNum: dne,
  notIsVerifier: Yte,
  notSearchResult: ene,
  search: Zte,
  useNum: une,
  used: one,
  verifyNum: lne,
  verifyOther: nne,
  verifyRecord: Jte,
  verifyTime: sne,
  verifyTitle: Kte,
  waitUse: tne
}, Symbol.toStringTag, { value: "Module" })), pne = "核销时间", mne = "核销码", fne = "核销次数", Kve = {
  createTime: pne,
  verifyCode: mne,
  verifyNum: fne
}, Qve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: pne,
  default: Kve,
  verifyCode: mne,
  verifyNum: fne
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ve as default,
  Qn as ensureDiyDecorateBridge,
  Vde as getDiyInfo,
  sbe as getMemberFormRecord,
  rbe as getShareInfo,
  nbe as getTabbarList,
  Kn as isDecoratePreviewUrl,
  tbe as isInAdminIframe,
  zde as notifyAdminDecorateReady,
  cn as resolveDecorateMode,
  abe as useDiy,
  cbe as useDiyGroup,
  Ve as useDiyStore
};
