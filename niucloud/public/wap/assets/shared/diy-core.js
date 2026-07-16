var gne = Object.defineProperty;
var hne = (o, e, t) => e in o ? gne(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var be = (o, e, t) => (hne(o, typeof e != "symbol" ? e + "" : e, t), t);
import { defineStore as Eo } from "pinia";
import { getCurrentInstance as hn, nextTick as oe, ref as X, toRaw as go, isInSSRComponentSetup as _ne, injectHook as yne, inject as $ne, reactive as Mt, computed as _n, watch as yn, onMounted as vne } from "vue";
import { createI18n as bne } from "vue-i18n";
const Tne = [], Pne = [], Sne = {
  list: []
}, One = {
  custom: {}
}, we = {
  pages: Tne,
  subPackages: Pne,
  tabBar: Sne,
  easycom: One
};
function wne() {
  const o = [];
  return we.pages.forEach((e) => {
    e.needLogin && o.push(`/${e.path}`);
  }), we.subPackages && we.subPackages.forEach((e) => {
    e.pages && e.pages.forEach((t) => {
      t.needLogin && o.push(`/${e.root}/${t.path}`);
    });
  }), o;
}
function Cne() {
  const o = [];
  return we.pages.forEach((e) => {
    o.push(`/${e.path}`);
  }), o;
}
function Mne() {
  const o = [];
  return we.subPackages && we.subPackages.forEach((e) => {
    e.pages && e.pages.forEach((t) => {
      o.push(`/${e.root}/${t.path}`);
    });
  }), o;
}
function jne() {
  return we.tabBar.list.map((o) => `/${o.pagePath}`);
}
const jt = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, r) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(r.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
function Ane() {
  return !1;
}
const Lo = "/wap";
function kne(o) {
  return o.replace(/^\/wap\/\d+\//, "/wap/");
}
function At(o) {
  return !o || o.startsWith("http") ? o : o.startsWith("/wap/") ? kne(o) : o.startsWith("/assets/") ? `${Lo}${o}` : o.startsWith("./") ? `${Lo}/assets/addons/${o.slice(2)}` : `${Lo}/${o.replace(/^\//, "")}`;
}
function ut() {
  return uni;
}
function wo(o) {
  let e = (o || "").trim();
  return !e || e === "/" ? "/" : (e.startsWith("/") || (e = `/${e}`), e = e.replace(/^\/wap\/(?:\d+\/)?/, "/"), e.startsWith("/") || (e = `/${e}`), e);
}
function Ine() {
  var o, e;
  try {
    const t = globalThis, n = ((o = t.getCurrentPages) == null ? void 0 : o.call(t)) || [], r = (e = n[n.length - 1]) == null ? void 0 : e.route;
    return r ? wo(r) : "";
  } catch {
    return "";
  }
}
function Nne() {
  var n, r;
  const o = hn(), e = (n = o == null ? void 0 : o.appContext.config.globalProperties.$route) == null ? void 0 : n.path;
  if (e)
    return wo(e);
  const t = Ine();
  return t && t !== "/" ? t : typeof window < "u" && ((r = window.location) != null && r.pathname) ? wo(window.location.pathname) : "/";
}
function Dne(o) {
  try {
    const e = wo(o).replace(/^\//, "");
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
class Ene {
  constructor(e) {
    be(this, "i18n");
    be(this, "loadLocale", []);
    //已加载的语言
    be(this, "path", "");
    be(this, "getFileKey", (e) => Dne(e));
    this.i18n = e;
  }
  /**
   *
   * @param locale 设置语言
   */
  setI18nLanguage(e, t = "") {
    this.i18n.global.locale != e && (this.i18n.global.locale = e, t && (this.path = t), ut().setLocale(e));
  }
  loadAllLocaleMessages(e, t) {
    (e == "app" ? Cne() : Mne()).forEach((r) => {
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
      const r = At(`assets/locale/app/${n}/${e}.json`), s = await fetch(r);
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
    const s = `${e}.common.${r}`, c = At(`assets/addons/${e}/locale/${r}`);
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
      Ane(), this.loadLocale.push(`${s}.${t}`);
      let c;
      c = await (n == "app" ? jt(/* @__PURE__ */ Object.assign({ "../app/locale/en/pages.setting.index.json": () => Promise.resolve().then(() => _ue), "../app/locale/zh-Hans/pages.article.detail.json": () => Promise.resolve().then(() => $ue), "../app/locale/zh-Hans/pages.article.list.json": () => Promise.resolve().then(() => bue), "../app/locale/zh-Hans/pages.auth.bind.json": () => Promise.resolve().then(() => Pue), "../app/locale/zh-Hans/pages.auth.index.json": () => Promise.resolve().then(() => Oue), "../app/locale/zh-Hans/pages.auth.login.json": () => Promise.resolve().then(() => Cue), "../app/locale/zh-Hans/pages.auth.register.json": () => Promise.resolve().then(() => jue), "../app/locale/zh-Hans/pages.auth.resetpwd.json": () => Promise.resolve().then(() => kue), "../app/locale/zh-Hans/pages.friendspay.money.json": () => Promise.resolve().then(() => Nue), "../app/locale/zh-Hans/pages.friendspay.share.json": () => Promise.resolve().then(() => Eue), "../app/locale/zh-Hans/pages.index.develop.json": () => Promise.resolve().then(() => Rue), "../app/locale/zh-Hans/pages.member.account.json": () => Promise.resolve().then(() => Fue), "../app/locale/zh-Hans/pages.member.account_edit.json": () => Promise.resolve().then(() => Hue), "../app/locale/zh-Hans/pages.member.address.json": () => Promise.resolve().then(() => Uue), "../app/locale/zh-Hans/pages.member.address_edit.json": () => Promise.resolve().then(() => que), "../app/locale/zh-Hans/pages.member.apply_cash_out.json": () => Promise.resolve().then(() => Gue), "../app/locale/zh-Hans/pages.member.balance.json": () => Promise.resolve().then(() => Kue), "../app/locale/zh-Hans/pages.member.cash_out.json": () => Promise.resolve().then(() => Xue), "../app/locale/zh-Hans/pages.member.cash_out_detail.json": () => Promise.resolve().then(() => Zue), "../app/locale/zh-Hans/pages.member.commission.json": () => Promise.resolve().then(() => ope), "../app/locale/zh-Hans/pages.member.detailed_account.json": () => Promise.resolve().then(() => npe), "../app/locale/zh-Hans/pages.member.location_address_edit.json": () => Promise.resolve().then(() => spe), "../app/locale/zh-Hans/pages.member.personal.json": () => Promise.resolve().then(() => cpe), "../app/locale/zh-Hans/pages.member.recharge_record.json": () => Promise.resolve().then(() => lpe), "../app/locale/zh-Hans/pages.member.recharge_record_detail.json": () => Promise.resolve().then(() => upe), "../app/locale/zh-Hans/pages.member.withdrawal_detail.json": () => Promise.resolve().then(() => mpe), "../app/locale/zh-Hans/pages.setting.index.json": () => Promise.resolve().then(() => gpe) }), `../app/locale/${t}/${r}.json`) : jt(/* @__PURE__ */ Object.assign({ "../addon/cms/locale/zh-Hans/pages.detail.json": () => Promise.resolve().then(() => _pe), "../addon/cms/locale/zh-Hans/pages.list.json": () => Promise.resolve().then(() => $pe), "../addon/friend_help/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => bpe), "../addon/friend_help/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => Ppe), "../addon/friend_help/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => Ope), "../addon/friend_help/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => Cpe), "../addon/friend_help/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => jpe), "../addon/friend_help/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => kpe), "../addon/friend_help/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => Npe), "../addon/home_service/locale/zh-Hans/common.json": () => Promise.resolve().then(() => Epe), "../addon/home_service/locale/zh-Hans/store.pages.auth.login.json": () => Promise.resolve().then(() => Rpe), "../addon/home_service/locale/zh-Hans/store.pages.auth.register.json": () => Promise.resolve().then(() => Fpe), "../addon/home_service/locale/zh-Hans/store.pages.index.json": () => Promise.resolve().then(() => Hpe), "../addon/home_service/locale/zh-Hans/store.pages.member.cash.cash_out.json": () => Promise.resolve().then(() => Upe), "../addon/home_service/locale/zh-Hans/store.pages.member.cash.cash_out_detail.json": () => Promise.resolve().then(() => qpe), "../addon/home_service/locale/zh-Hans/store.pages.member.evaluate.json": () => Promise.resolve().then(() => Gpe), "../addon/home_service/locale/zh-Hans/store.pages.member.feedback.feedback.json": () => Promise.resolve().then(() => Kpe), "../addon/home_service/locale/zh-Hans/store.pages.member.help.detail.json": () => Promise.resolve().then(() => Xpe), "../addon/home_service/locale/zh-Hans/store.pages.member.help.help.json": () => Promise.resolve().then(() => Zpe), "../addon/home_service/locale/zh-Hans/store.pages.member.index.json": () => Promise.resolve().then(() => ome), "../addon/home_service/locale/zh-Hans/store.pages.member.store_info.json": () => Promise.resolve().then(() => nme), "../addon/home_service/locale/zh-Hans/store.pages.member.store_list.json": () => Promise.resolve().then(() => sme), "../addon/home_service/locale/zh-Hans/store.pages.order.detail.json": () => Promise.resolve().then(() => cme), "../addon/home_service/locale/zh-Hans/store.pages.order.dispatchOrder.json": () => Promise.resolve().then(() => lme), "../addon/home_service/locale/zh-Hans/store.pages.order.dispatchTechnician.json": () => Promise.resolve().then(() => ume), "../addon/home_service/locale/zh-Hans/store.pages.order.grapOrder.json": () => Promise.resolve().then(() => mme), "../addon/home_service/locale/zh-Hans/store.pages.order.indent.json": () => Promise.resolve().then(() => gme), "../addon/home_service/locale/zh-Hans/store.pages.order.indent_list.json": () => Promise.resolve().then(() => _me), "../addon/home_service/locale/zh-Hans/store.pages.store.account.account_statement.json": () => Promise.resolve().then(() => $me), "../addon/home_service/locale/zh-Hans/store.pages.store.account.list.json": () => Promise.resolve().then(() => bme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.order_statistics.json": () => Promise.resolve().then(() => Pme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.summary.json": () => Promise.resolve().then(() => Ome), "../addon/home_service/locale/zh-Hans/store.pages.store.account.withdraw.json": () => Promise.resolve().then(() => Cme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.withdraw_edit.json": () => Promise.resolve().then(() => jme), "../addon/home_service/locale/zh-Hans/store.pages.store.account.withdraw_list.json": () => Promise.resolve().then(() => kme), "../addon/home_service/locale/zh-Hans/store.pages.store.index.json": () => Promise.resolve().then(() => Nme), "../addon/home_service/locale/zh-Hans/store.pages.store.settle.json": () => Promise.resolve().then(() => Eme), "../addon/home_service/locale/zh-Hans/store.pages.store.submit_success.json": () => Promise.resolve().then(() => Rme), "../addon/home_service/locale/zh-Hans/store.pages.technician.detail.json": () => Promise.resolve().then(() => Fme), "../addon/home_service/locale/zh-Hans/store.pages.technician.index.json": () => Promise.resolve().then(() => Hme), "../addon/home_service/locale/zh-Hans/store.pages.technician.rest.json": () => Promise.resolve().then(() => Ume), "../addon/home_service/locale/zh-Hans/technician.pages.auth.login.json": () => Promise.resolve().then(() => qme), "../addon/home_service/locale/zh-Hans/technician.pages.auth.register.json": () => Promise.resolve().then(() => Gme), "../addon/home_service/locale/zh-Hans/technician.pages.index.json": () => Promise.resolve().then(() => Kme), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.account_statement.json": () => Promise.resolve().then(() => Xme), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.list.json": () => Promise.resolve().then(() => Zme), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.summary.json": () => Promise.resolve().then(() => ofe), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.withdraw.json": () => Promise.resolve().then(() => nfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.withdraw_edit.json": () => Promise.resolve().then(() => sfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.withdraw_list.json": () => Promise.resolve().then(() => cfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.cash.cash_out.json": () => Promise.resolve().then(() => lfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.cash.cash_out_detail.json": () => Promise.resolve().then(() => ufe), "../addon/home_service/locale/zh-Hans/technician.pages.member.detail.json": () => Promise.resolve().then(() => mfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.feedback.feedback.json": () => Promise.resolve().then(() => gfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.help.detail.json": () => Promise.resolve().then(() => _fe), "../addon/home_service/locale/zh-Hans/technician.pages.member.help.help.json": () => Promise.resolve().then(() => $fe), "../addon/home_service/locale/zh-Hans/technician.pages.member.index.json": () => Promise.resolve().then(() => bfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.order.evaluate.json": () => Promise.resolve().then(() => Pfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.order.statistics.json": () => Promise.resolve().then(() => Ofe), "../addon/home_service/locale/zh-Hans/technician.pages.member.ranking_list.ranking_list.json": () => Promise.resolve().then(() => Cfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.rest.index.json": () => Promise.resolve().then(() => jfe), "../addon/home_service/locale/zh-Hans/technician.pages.member.store.detail.json": () => Promise.resolve().then(() => kfe), "../addon/home_service/locale/zh-Hans/technician.pages.notice.index.json": () => Promise.resolve().then(() => Nfe), "../addon/home_service/locale/zh-Hans/technician.pages.order.additional.json": () => Promise.resolve().then(() => Efe), "../addon/home_service/locale/zh-Hans/technician.pages.order.detail.json": () => Promise.resolve().then(() => Rfe), "../addon/home_service/locale/zh-Hans/technician.pages.order.grabOrder.json": () => Promise.resolve().then(() => Ffe), "../addon/home_service/locale/zh-Hans/technician.pages.order.indent_order.json": () => Promise.resolve().then(() => Hfe), "../addon/home_service/locale/zh-Hans/technician.pages.order.index.json": () => Promise.resolve().then(() => Ufe), "../addon/home_service/locale/zh-Hans/user.pages.address.address_edit.json": () => Promise.resolve().then(() => qfe), "../addon/home_service/locale/zh-Hans/user.pages.address.edit.json": () => Promise.resolve().then(() => Gfe), "../addon/home_service/locale/zh-Hans/user.pages.address.index.json": () => Promise.resolve().then(() => Kfe), "../addon/home_service/locale/zh-Hans/user.pages.card.detail.json": () => Promise.resolve().then(() => Xfe), "../addon/home_service/locale/zh-Hans/user.pages.card.my_card.json": () => Promise.resolve().then(() => Zfe), "../addon/home_service/locale/zh-Hans/user.pages.goods.category.json": () => Promise.resolve().then(() => oge), "../addon/home_service/locale/zh-Hans/user.pages.goods.detail.json": () => Promise.resolve().then(() => nge), "../addon/home_service/locale/zh-Hans/user.pages.goods.list.json": () => Promise.resolve().then(() => sge), "../addon/home_service/locale/zh-Hans/user.pages.index.json": () => Promise.resolve().then(() => cge), "../addon/home_service/locale/zh-Hans/user.pages.master.statistics.index.json": () => Promise.resolve().then(() => lge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.add.json": () => Promise.resolve().then(() => uge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.detail.json": () => Promise.resolve().then(() => mge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.list.json": () => Promise.resolve().then(() => gge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.refund.json": () => Promise.resolve().then(() => _ge), "../addon/home_service/locale/zh-Hans/user.pages.master.task.show.json": () => Promise.resolve().then(() => $ge), "../addon/home_service/locale/zh-Hans/user.pages.member.collect.goods.json": () => Promise.resolve().then(() => bge), "../addon/home_service/locale/zh-Hans/user.pages.member.collect.technician.json": () => Promise.resolve().then(() => Pge), "../addon/home_service/locale/zh-Hans/user.pages.member.feedback.feedback.json": () => Promise.resolve().then(() => Oge), "../addon/home_service/locale/zh-Hans/user.pages.member.help.detail.json": () => Promise.resolve().then(() => Cge), "../addon/home_service/locale/zh-Hans/user.pages.member.help.help.json": () => Promise.resolve().then(() => jge), "../addon/home_service/locale/zh-Hans/user.pages.member.invoice.apply.json": () => Promise.resolve().then(() => kge), "../addon/home_service/locale/zh-Hans/user.pages.order.detail.json": () => Promise.resolve().then(() => Nge), "../addon/home_service/locale/zh-Hans/user.pages.order.evaluate.evaluate.json": () => Promise.resolve().then(() => Ege), "../addon/home_service/locale/zh-Hans/user.pages.order.evaluate.json": () => Promise.resolve().then(() => Rge), "../addon/home_service/locale/zh-Hans/user.pages.order.evaluate.list.json": () => Promise.resolve().then(() => Fge), "../addon/home_service/locale/zh-Hans/user.pages.order.list.json": () => Promise.resolve().then(() => Hge), "../addon/home_service/locale/zh-Hans/user.pages.order.payment.json": () => Promise.resolve().then(() => Uge), "../addon/home_service/locale/zh-Hans/user.pages.order.refund.apply.json": () => Promise.resolve().then(() => qge), "../addon/home_service/locale/zh-Hans/user.pages.order.refund.detail.json": () => Promise.resolve().then(() => Gge), "../addon/home_service/locale/zh-Hans/user.pages.order.refund.list.json": () => Promise.resolve().then(() => Kge), "../addon/home_service/locale/zh-Hans/user.pages.refund.log.json": () => Promise.resolve().then(() => Xge), "../addon/home_service/locale/zh-Hans/user.pages.service.reserve_detail.json": () => Promise.resolve().then(() => Zge), "../addon/home_service/locale/zh-Hans/user.pages.settle.store.json": () => Promise.resolve().then(() => ohe), "../addon/home_service/locale/zh-Hans/user.pages.settle.store_form.json": () => Promise.resolve().then(() => nhe), "../addon/home_service/locale/zh-Hans/user.pages.settle.submit_success.json": () => Promise.resolve().then(() => she), "../addon/home_service/locale/zh-Hans/user.pages.settle.technician.json": () => Promise.resolve().then(() => che), "../addon/home_service/locale/zh-Hans/user.pages.settle.technician_form.json": () => Promise.resolve().then(() => lhe), "../addon/home_service/locale/zh-Hans/user.pages.technician.detail.json": () => Promise.resolve().then(() => uhe), "../addon/home_service/locale/zh-Hans/user.pages.technician.list.json": () => Promise.resolve().then(() => mhe), "../addon/o2o/locale/zh-Hans/common.json": () => Promise.resolve().then(() => ghe), "../addon/o2o/locale/zh-Hans/pages.address.address_edit.json": () => Promise.resolve().then(() => _he), "../addon/o2o/locale/zh-Hans/pages.address.edit.json": () => Promise.resolve().then(() => $he), "../addon/o2o/locale/zh-Hans/pages.address.index.json": () => Promise.resolve().then(() => bhe), "../addon/o2o/locale/zh-Hans/pages.goods.category.json": () => Promise.resolve().then(() => Phe), "../addon/o2o/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => Ohe), "../addon/o2o/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => Che), "../addon/o2o/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => jhe), "../addon/o2o/locale/zh-Hans/pages.master.statistics.index.json": () => Promise.resolve().then(() => khe), "../addon/o2o/locale/zh-Hans/pages.master.task.add.json": () => Promise.resolve().then(() => Nhe), "../addon/o2o/locale/zh-Hans/pages.master.task.detail.json": () => Promise.resolve().then(() => Ehe), "../addon/o2o/locale/zh-Hans/pages.master.task.list.json": () => Promise.resolve().then(() => Rhe), "../addon/o2o/locale/zh-Hans/pages.master.task.refund.json": () => Promise.resolve().then(() => Fhe), "../addon/o2o/locale/zh-Hans/pages.master.task.show.json": () => Promise.resolve().then(() => Hhe), "../addon/o2o/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => Uhe), "../addon/o2o/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => qhe), "../addon/o2o/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => Ghe), "../addon/o2o/locale/zh-Hans/pages.refund.apply.json": () => Promise.resolve().then(() => Khe), "../addon/o2o/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => Xhe), "../addon/o2o/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => Zhe), "../addon/o2o/locale/zh-Hans/pages.refund.log.json": () => Promise.resolve().then(() => o_e), "../addon/o2o/locale/zh-Hans/pages.service.reserve_detail.json": () => Promise.resolve().then(() => n_e), "../addon/o2o/locale/zh-Hans/pages.technician.detail.json": () => Promise.resolve().then(() => s_e), "../addon/o2o/locale/zh-Hans/pages.technician.list.json": () => Promise.resolve().then(() => c_e), "../addon/pintuan/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => l_e), "../addon/pintuan/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => u_e), "../addon/pintuan/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => m_e), "../addon/pintuan/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => g_e), "../addon/pintuan/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => __e), "../addon/pintuan/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => $_e), "../addon/recharge/locale/zh-Hans/common.json": () => Promise.resolve().then(() => b_e), "../addon/recharge/locale/zh-Hans/pages.recharge.json": () => Promise.resolve().then(() => P_e), "../addon/recharge/locale/zh-Hans/pages.recharge_record.json": () => Promise.resolve().then(() => O_e), "../addon/recharge/locale/zh-Hans/pages.recharge_record_detail.json": () => Promise.resolve().then(() => C_e), "../addon/relay/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => j_e), "../addon/relay/locale/zh-Hans/pages.hello_world.index.json": () => Promise.resolve().then(() => k_e), "../addon/relay/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => N_e), "../addon/relay/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => E_e), "../addon/relay/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => R_e), "../addon/relay/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => F_e), "../addon/relay/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => H_e), "../addon/seckill/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => U_e), "../addon/seckill/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => q_e), "../addon/seckill/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => G_e), "../addon/seckill/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => K_e), "../addon/seckill/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => X_e), "../addon/seckill/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => Z_e), "../addon/shop/locale/zh-Hans/common.json": () => Promise.resolve().then(() => oye), "../addon/shop/locale/zh-Hans/pages.goods.cart.json": () => Promise.resolve().then(() => nye), "../addon/shop/locale/zh-Hans/pages.goods.category.json": () => Promise.resolve().then(() => sye), "../addon/shop/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => cye), "../addon/shop/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => lye), "../addon/shop/locale/zh-Hans/pages.goods.rank.json": () => Promise.resolve().then(() => uye), "../addon/shop/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => mye), "../addon/shop/locale/zh-Hans/pages.member.index.json": () => Promise.resolve().then(() => gye), "../addon/shop/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => _ye), "../addon/shop/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => $ye), "../addon/shop/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => bye), "../addon/shop/locale/zh-Hans/pages.point.detail.json": () => Promise.resolve().then(() => Pye), "../addon/shop/locale/zh-Hans/pages.point.order_list.json": () => Promise.resolve().then(() => Oye), "../addon/shop/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => Cye), "../addon/shop/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => jye), "../addon/shop_fenxiao/locale/zh-Hans/common.json": () => Promise.resolve().then(() => kye), "../addon/shop_fenxiao/locale/zh-Hans/pages.agent_list.json": () => Promise.resolve().then(() => Nye), "../addon/shop_fenxiao/locale/zh-Hans/pages.apply.json": () => Promise.resolve().then(() => Eye), "../addon/shop_fenxiao/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => Rye), "../addon/shop_fenxiao/locale/zh-Hans/pages.level.json": () => Promise.resolve().then(() => Fye), "../addon/shop_fenxiao/locale/zh-Hans/pages.order.json": () => Promise.resolve().then(() => Hye), "../addon/shop_fenxiao/locale/zh-Hans/pages.task_detail.json": () => Promise.resolve().then(() => Uye), "../addon/shop_fenxiao/locale/zh-Hans/pages.team_dividend.json": () => Promise.resolve().then(() => qye), "../addon/shop_giftcard/locale/zh-Hans/common.json": () => Promise.resolve().then(() => Gye), "../addon/shop_giftcard/locale/zh-Hans/pages.activate.json": () => Promise.resolve().then(() => Kye), "../addon/shop_giftcard/locale/zh-Hans/pages.card_bag.json": () => Promise.resolve().then(() => Xye), "../addon/shop_giftcard/locale/zh-Hans/pages.detail.json": () => Promise.resolve().then(() => Zye), "../addon/shop_giftcard/locale/zh-Hans/pages.give.json": () => Promise.resolve().then(() => o$e), "../addon/shop_giftcard/locale/zh-Hans/pages.give_detail.json": () => Promise.resolve().then(() => n$e), "../addon/shop_giftcard/locale/zh-Hans/pages.give_list.json": () => Promise.resolve().then(() => s$e), "../addon/shop_giftcard/locale/zh-Hans/pages.list.json": () => Promise.resolve().then(() => c$e), "../addon/shop_giftcard/locale/zh-Hans/pages.my_card_list.json": () => Promise.resolve().then(() => l$e), "../addon/shop_giftcard/locale/zh-Hans/pages.order_detail.json": () => Promise.resolve().then(() => u$e), "../addon/shop_giftcard/locale/zh-Hans/pages.order_list.json": () => Promise.resolve().then(() => m$e), "../addon/shop_giftcard/locale/zh-Hans/pages.payment.json": () => Promise.resolve().then(() => g$e), "../addon/shop_giftcard/locale/zh-Hans/pages.receive_info.json": () => Promise.resolve().then(() => _$e), "../addon/shop_giftcard/locale/zh-Hans/pages.receive_list.json": () => Promise.resolve().then(() => $$e), "../addon/shop_giftcard/locale/zh-Hans/pages.use_card.json": () => Promise.resolve().then(() => b$e), "../addon/shop_giftcard/locale/zh-Hans/pages.use_goods_select.json": () => Promise.resolve().then(() => P$e), "../addon/sow_community/locale/zh-Hans/common.json": () => Promise.resolve().then(() => O$e), "../addon/sow_community/locale/zh-Hans/pages.create.json": () => Promise.resolve().then(() => C$e), "../addon/sow_community/locale/zh-Hans/pages.follow.json": () => Promise.resolve().then(() => j$e), "../addon/sow_community/locale/zh-Hans/pages.image.detail.json": () => Promise.resolve().then(() => k$e), "../addon/sow_community/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => N$e), "../addon/sow_community/locale/zh-Hans/pages.member.json": () => Promise.resolve().then(() => E$e), "../addon/sow_community/locale/zh-Hans/pages.search.json": () => Promise.resolve().then(() => R$e), "../addon/sow_community/locale/zh-Hans/pages.sow_show.json": () => Promise.resolve().then(() => F$e), "../addon/sow_community/locale/zh-Hans/pages.topic_list.json": () => Promise.resolve().then(() => H$e), "../addon/sow_community/locale/zh-Hans/pages.video.detail.json": () => Promise.resolve().then(() => U$e), "../addon/template_flower_industry/locale/zh-Hans/common.json": () => Promise.resolve().then(() => q$e), "../addon/template_flower_industry/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => G$e), "../addon/tourism/locale/zh-Hans/common.json": () => Promise.resolve().then(() => K$e), "../addon/tourism/locale/zh-Hans/pages.hotel.detail.json": () => Promise.resolve().then(() => X$e), "../addon/tourism/locale/zh-Hans/pages.hotel.list.json": () => Promise.resolve().then(() => Z$e), "../addon/tourism/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => ove), "../addon/tourism/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => nve), "../addon/tourism/locale/zh-Hans/pages.scenic.detail.json": () => Promise.resolve().then(() => sve), "../addon/tourism/locale/zh-Hans/pages.scenic.list.json": () => Promise.resolve().then(() => cve), "../addon/tourism/locale/zh-Hans/pages.scenic.order.json": () => Promise.resolve().then(() => lve), "../addon/tourism/locale/zh-Hans/pages.verify.detail.json": () => Promise.resolve().then(() => uve), "../addon/tourism/locale/zh-Hans/pages.verify.index.json": () => Promise.resolve().then(() => mve), "../addon/tourism/locale/zh-Hans/pages.way.list.json": () => Promise.resolve().then(() => gve), "../addon/vipcard/locale/zh-Hans/common.json": () => Promise.resolve().then(() => _ve), "../addon/vipcard/locale/zh-Hans/pages.card.detail.json": () => Promise.resolve().then(() => $ve), "../addon/vipcard/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => bve), "../addon/vipcard/locale/zh-Hans/pages.order.card_record.json": () => Promise.resolve().then(() => Pve), "../addon/vipcard/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => Ove), "../addon/vipcard/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => Cve), "../addon/vipcard/locale/zh-Hans/pages.order.my_card.json": () => Promise.resolve().then(() => jve), "../addon/vipcard/locale/zh-Hans/pages.order.my_card_detail.json": () => Promise.resolve().then(() => kve), "../addon/vipcard/locale/zh-Hans/pages.order.my_reserved.json": () => Promise.resolve().then(() => Nve), "../addon/vipcard/locale/zh-Hans/pages.order.my_reserved_detail.json": () => Promise.resolve().then(() => Eve), "../addon/vipcard/locale/zh-Hans/pages.service.detail.json": () => Promise.resolve().then(() => Rve), "../addon/vipcard/locale/zh-Hans/pages.service.list.json": () => Promise.resolve().then(() => Fve), "../addon/vipcard/locale/zh-Hans/pages.service.reserve_detail.json": () => Promise.resolve().then(() => Hve), "../addon/vipcard/locale/zh-Hans/pages.verify.detail.json": () => Promise.resolve().then(() => Uve), "../addon/vipcard/locale/zh-Hans/pages.verify.index.json": () => Promise.resolve().then(() => qve), "../addon/vipcard/locale/zh-Hans/pages.verify.record.json": () => Promise.resolve().then(() => Gve) }), `../addon/${n}/locale/${t}/${r}.json`));
      let a = {};
      return Object.keys(c.default).forEach((i) => {
        a[`${s}.${i}`] = c.default[i];
      }), this.i18n.global.mergeLocaleMessage(t, a), this.setI18nLanguage(t, r), oe();
    } catch {
      return this.setI18nLanguage(t), oe();
    }
  }
}
const xne = "请求失败", Rne = "不在request 合法域名列表中", zne = " 接口请求错误,请检查VITE_APP_BASE_URL参数配置或者伪静态配置", Fne = "￥", Lne = "获取验证码", Hne = "秒后重新获取", Bne = "请完成验证", Une = "确认", Wne = "取消", qne = "保存", Vne = "请输入验证码", Gne = "请输入手机号码", Yne = "请输入正确的手机号", Kne = "请输入手机验证码", Qne = "个人中心", Xne = "用户协议", Jne = "和", Zne = "隐私协议", ere = "请先阅读并同意协议", ore = "昵称", tre = "请输入昵称", nre = "头像", rre = "请设置头像", sre = "获取您的昵称头像", are = "获取用户头像、昵称完善个人资料，主要用于向用户提供具有辨识度的用户中心界面", cre = "手机号", ire = "获取手机号", lre = "请获取手机号", dre = "积分", ure = "余额", pre = "登录", mre = "绑定", fre = "绑定中", gre = "绑定手机号", hre = "我已阅读并同意", _re = "请勾选已阅读并同意", yre = "一键绑定", $re = "手机号快捷登录", vre = "注册", bre = "完成", Tre = "关闭", Pre = {
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
}, Sre = {
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
}, Ore = "我的余额", wre = "我的积分", Cre = "联系客服", Mre = "站点已关闭", jre = "站点不存在", Are = "页面不存在", kre = "景点", Ire = "查看更多", Nre = "线路", Dre = "酒店", Ere = "起", xre = "项目预约", Rre = "办理次卡", zre = "会员名称", Fre = "会员码", Lre = "预约", Hre = "预约成功", Bre = "次卡", Ure = "我的", Wre = "去抢购", qre = "办理", Vre = "已售", Gre = "待支付", Yre = "待使用", Kre = "已完成", Qre = "全部订单", Xre = "我的订单", Jre = "订单号", Zre = "实付款", ese = "关闭订单", ose = "删除订单", tse = "确认收货", nse = "详情", rse = {
  title: "用户隐私保护提示",
  descBefore: "感谢您使用本小程序，在使用前您应当阅读并同意",
  descAfter: "当点击同意并继续时，即表示您已理解并同意该条款内容，该条款将对您产生法律约束力；如您不同意，将无法继续使用小程序相关功能。",
  disagree: "不同意",
  agree: "同意并继续",
  contractName: "用户隐私保护指引",
  disagreeDesc: "未同意隐私协议，无法使用相关功能"
}, sse = "星级", ase = "星", cse = "暂无收货地址，请先创建地址", ise = "新增收货地址", lse = "选择地址", dse = "优惠劵", use = "无", pse = "次卡", mse = "张", fse = {
  requestFail: xne,
  notInDomainList: Rne,
  baseUrlError: zne,
  currency: Fne,
  getSmsCode: Lne,
  smsCodeChangeText: Hne,
  captchaTitle: Bne,
  confirm: Une,
  cancel: Wne,
  save: qne,
  delete: "删除",
  captchaPlaceholder: Vne,
  mobilePlaceholder: Gne,
  mobileError: Yne,
  codePlaceholder: Kne,
  memberCenter: Qne,
  userAgreement: Xne,
  and: Jne,
  privacyAgreement: Zne,
  isAgreeTips: ere,
  nickname: ore,
  nicknamePlaceholder: tre,
  headimg: nre,
  headimgPlaceholder: rre,
  getAvatarNickname: sre,
  getAvatarNicknameTips: are,
  mobile: cre,
  getMobile: ire,
  mobileTips: lre,
  point: dre,
  balance: ure,
  login: pre,
  bind: mre,
  binding: fre,
  bindMobile: gre,
  agreeTips: hre,
  pleaseAgree: _re,
  weixinUserAuth: yre,
  mobileQuickLogin: $re,
  register: vre,
  complete: bre,
  close: Tre,
  diyForm: Pre,
  pay: Sre,
  myBalance: Ore,
  myPoint: wre,
  customerService: Cre,
  siteClose: Mre,
  noSite: jre,
  pageNotFound: Are,
  scenic: kre,
  seeMore: Ire,
  way: Nre,
  hotel: Dre,
  rise: Ere,
  cardReserve: xre,
  card: Rre,
  memberName: zre,
  memberCode: Fre,
  reserve: Lre,
  reserveSuccess: Hre,
  cardLink: Bre,
  myLink: Ure,
  reserveBtn: Wre,
  cardBtn: qre,
  soldOut: Vre,
  unpaidOrder: Gre,
  waitingOrder: Yre,
  remainOrder: Kre,
  allOrder: Qre,
  myOrder: Xre,
  orderNo: Jre,
  actualPayment: Zre,
  orderClose: ese,
  orderDelete: ose,
  orderFinish: tse,
  orderDetail: nse,
  wxPrivacyPopup: rse,
  starLevel: sse,
  star: ase,
  emptyAddress: cse,
  addAddress: ise,
  selectAddress: lse,
  coupon: dse,
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
  notHave: use,
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
  onceCard: pse,
  cardUnit: mse
}, gse = "Index", hse = {
  index: gse
};
function _se() {
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
let Qe = bne({
  locale: _se(),
  globalInjection: !0,
  //是否全局注入
  silentFallbackWarn: !0,
  silentTranslationWarn: !0,
  messages: {
    "zh-Hans": fse,
    en: hse
  }
});
const yse = new Ene(Qe);
function $se(o) {
  return B.get("wechat/codeurl", o, { showErrorMessage: !1 });
}
function vse() {
  return B.get("site");
}
function bse(o) {
  return B.get("init", o);
}
function Tse(o) {
  return B.get("member_mobile_exist", o);
}
function Pse(o) {
  return B.get("login/config", o);
}
function Sse() {
  return B.put("auth/logout");
}
function Ose(o) {
  return B.get("wechat/user", o, { showErrorMessage: !1 });
}
function wse(o) {
  return uni.getStorageSync("pid") && (o.pid = uni.getStorageSync("pid")), B.post("wechat/userlogin", o, { showErrorMessage: !0 });
}
function Cse(o) {
  return B.put("wechat/update_openid", o, { showErrorMessage: !1 });
}
function Mse(o) {
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
      Fe() && (o = Tt().systemInfo.platform == "ios" ? uni.getStorageSync("initUrl") : location.href), await Pse({ url: o }).then((e) => {
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
var jse = typeof global == "object" && global && global.Object === Object && global;
const $n = jse;
var Ase = typeof self == "object" && self && self.Object === Object && self, kse = $n || Ase || Function("return this")();
const re = kse;
var Ise = re.Symbol;
const Re = Ise;
var vn = Object.prototype, Nse = vn.hasOwnProperty, Dse = vn.toString, Ke = Re ? Re.toStringTag : void 0;
function Ese(o) {
  var e = Nse.call(o, Ke), t = o[Ke];
  try {
    o[Ke] = void 0;
    var n = !0;
  } catch {
  }
  var r = Dse.call(o);
  return n && (e ? o[Ke] = t : delete o[Ke]), r;
}
var xse = Object.prototype, Rse = xse.toString;
function zse(o) {
  return Rse.call(o);
}
var Fse = "[object Null]", Lse = "[object Undefined]", kt = Re ? Re.toStringTag : void 0;
function He(o) {
  return o == null ? o === void 0 ? Lse : Fse : kt && kt in Object(o) ? Ese(o) : zse(o);
}
function Be(o) {
  return o != null && typeof o == "object";
}
var Hse = "[object Symbol]";
function Bse(o) {
  return typeof o == "symbol" || Be(o) && He(o) == Hse;
}
var Use = Array.isArray;
const pt = Use;
var Wse = /\s/;
function qse(o) {
  for (var e = o.length; e-- && Wse.test(o.charAt(e)); )
    ;
  return e;
}
var Vse = /^\s+/;
function Gse(o) {
  return o && o.slice(0, qse(o) + 1).replace(Vse, "");
}
function ye(o) {
  var e = typeof o;
  return o != null && (e == "object" || e == "function");
}
var It = 0 / 0, Yse = /^[-+]0x[0-9a-f]+$/i, Kse = /^0b[01]+$/i, Qse = /^0o[0-7]+$/i, Xse = parseInt;
function Jse(o) {
  if (typeof o == "number")
    return o;
  if (Bse(o))
    return It;
  if (ye(o)) {
    var e = typeof o.valueOf == "function" ? o.valueOf() : o;
    o = ye(e) ? e + "" : e;
  }
  if (typeof o != "string")
    return o === 0 ? o : +o;
  o = Gse(o);
  var t = Kse.test(o);
  return t || Qse.test(o) ? Xse(o.slice(2), t ? 2 : 8) : Yse.test(o) ? It : +o;
}
var Nt = 1 / 0, Zse = 17976931348623157e292;
function Ho(o) {
  if (!o)
    return o === 0 ? o : 0;
  if (o = Jse(o), o === Nt || o === -Nt) {
    var e = o < 0 ? -1 : 1;
    return e * Zse;
  }
  return o === o ? o : 0;
}
var eae = "[object AsyncFunction]", oae = "[object Function]", tae = "[object GeneratorFunction]", nae = "[object Proxy]";
function bn(o) {
  if (!ye(o))
    return !1;
  var e = He(o);
  return e == oae || e == tae || e == eae || e == nae;
}
var rae = re["__core-js_shared__"];
const Bo = rae;
var Dt = function() {
  var o = /[^.]+$/.exec(Bo && Bo.keys && Bo.keys.IE_PROTO || "");
  return o ? "Symbol(src)_1." + o : "";
}();
function sae(o) {
  return !!Dt && Dt in o;
}
var aae = Function.prototype, cae = aae.toString;
function Me(o) {
  if (o != null) {
    try {
      return cae.call(o);
    } catch {
    }
    try {
      return o + "";
    } catch {
    }
  }
  return "";
}
var iae = /[\\^$.*+?()[\]{}|]/g, lae = /^\[object .+?Constructor\]$/, dae = Function.prototype, uae = Object.prototype, pae = dae.toString, mae = uae.hasOwnProperty, fae = RegExp(
  "^" + pae.call(mae).replace(iae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function gae(o) {
  if (!ye(o) || sae(o))
    return !1;
  var e = bn(o) ? fae : lae;
  return e.test(Me(o));
}
function hae(o, e) {
  return o == null ? void 0 : o[e];
}
function je(o, e) {
  var t = hae(o, e);
  return gae(t) ? t : void 0;
}
var _ae = je(re, "WeakMap");
const ot = _ae;
var Et = Object.create, yae = function() {
  function o() {
  }
  return function(e) {
    if (!ye(e))
      return {};
    if (Et)
      return Et(e);
    o.prototype = e;
    var t = new o();
    return o.prototype = void 0, t;
  };
}();
const $ae = yae;
function vae(o, e) {
  var t = -1, n = o.length;
  for (e || (e = Array(n)); ++t < n; )
    e[t] = o[t];
  return e;
}
var bae = function() {
  try {
    var o = je(Object, "defineProperty");
    return o({}, "", {}), o;
  } catch {
  }
}();
const xt = bae;
function Tae(o, e) {
  for (var t = -1, n = o == null ? 0 : o.length; ++t < n && e(o[t], t, o) !== !1; )
    ;
  return o;
}
var Pae = 9007199254740991, Sae = /^(?:0|[1-9]\d*)$/;
function Tn(o, e) {
  var t = typeof o;
  return e = e ?? Pae, !!e && (t == "number" || t != "symbol" && Sae.test(o)) && o > -1 && o % 1 == 0 && o < e;
}
function Pn(o, e, t) {
  e == "__proto__" && xt ? xt(o, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : o[e] = t;
}
function mt(o, e) {
  return o === e || o !== o && e !== e;
}
var Oae = Object.prototype, wae = Oae.hasOwnProperty;
function Sn(o, e, t) {
  var n = o[e];
  (!(wae.call(o, e) && mt(n, t)) || t === void 0 && !(e in o)) && Pn(o, e, t);
}
function xo(o, e, t, n) {
  var r = !t;
  t || (t = {});
  for (var s = -1, c = e.length; ++s < c; ) {
    var a = e[s], i = n ? n(t[a], o[a], a, t, o) : void 0;
    i === void 0 && (i = o[a]), r ? Pn(t, a, i) : Sn(t, a, i);
  }
  return t;
}
var Cae = 9007199254740991;
function On(o) {
  return typeof o == "number" && o > -1 && o % 1 == 0 && o <= Cae;
}
function ft(o) {
  return o != null && On(o.length) && !bn(o);
}
function Mae(o, e, t) {
  if (!ye(t))
    return !1;
  var n = typeof e;
  return (n == "number" ? ft(t) && Tn(e, t.length) : n == "string" && e in t) ? mt(t[e], o) : !1;
}
var jae = Object.prototype;
function gt(o) {
  var e = o && o.constructor, t = typeof e == "function" && e.prototype || jae;
  return o === t;
}
function Aae(o, e) {
  for (var t = -1, n = Array(o); ++t < o; )
    n[t] = e(t);
  return n;
}
var kae = "[object Arguments]";
function Rt(o) {
  return Be(o) && He(o) == kae;
}
var wn = Object.prototype, Iae = wn.hasOwnProperty, Nae = wn.propertyIsEnumerable, Dae = Rt(function() {
  return arguments;
}()) ? Rt : function(o) {
  return Be(o) && Iae.call(o, "callee") && !Nae.call(o, "callee");
};
const Eae = Dae;
function xae() {
  return !1;
}
var Cn = typeof exports == "object" && exports && !exports.nodeType && exports, zt = Cn && typeof module == "object" && module && !module.nodeType && module, Rae = zt && zt.exports === Cn, Ft = Rae ? re.Buffer : void 0, zae = Ft ? Ft.isBuffer : void 0, Fae = zae || xae;
const Mn = Fae;
var Lae = "[object Arguments]", Hae = "[object Array]", Bae = "[object Boolean]", Uae = "[object Date]", Wae = "[object Error]", qae = "[object Function]", Vae = "[object Map]", Gae = "[object Number]", Yae = "[object Object]", Kae = "[object RegExp]", Qae = "[object Set]", Xae = "[object String]", Jae = "[object WeakMap]", Zae = "[object ArrayBuffer]", ece = "[object DataView]", oce = "[object Float32Array]", tce = "[object Float64Array]", nce = "[object Int8Array]", rce = "[object Int16Array]", sce = "[object Int32Array]", ace = "[object Uint8Array]", cce = "[object Uint8ClampedArray]", ice = "[object Uint16Array]", lce = "[object Uint32Array]", j = {};
j[oce] = j[tce] = j[nce] = j[rce] = j[sce] = j[ace] = j[cce] = j[ice] = j[lce] = !0;
j[Lae] = j[Hae] = j[Zae] = j[Bae] = j[ece] = j[Uae] = j[Wae] = j[qae] = j[Vae] = j[Gae] = j[Yae] = j[Kae] = j[Qae] = j[Xae] = j[Jae] = !1;
function dce(o) {
  return Be(o) && On(o.length) && !!j[He(o)];
}
function ht(o) {
  return function(e) {
    return o(e);
  };
}
var jn = typeof exports == "object" && exports && !exports.nodeType && exports, eo = jn && typeof module == "object" && module && !module.nodeType && module, uce = eo && eo.exports === jn, Uo = uce && $n.process, pce = function() {
  try {
    var o = eo && eo.require && eo.require("util").types;
    return o || Uo && Uo.binding && Uo.binding("util");
  } catch {
  }
}();
const ze = pce;
var Lt = ze && ze.isTypedArray, mce = Lt ? ht(Lt) : dce;
const fce = mce;
var gce = Object.prototype, hce = gce.hasOwnProperty;
function An(o, e) {
  var t = pt(o), n = !t && Eae(o), r = !t && !n && Mn(o), s = !t && !n && !r && fce(o), c = t || n || r || s, a = c ? Aae(o.length, String) : [], i = a.length;
  for (var l in o)
    (e || hce.call(o, l)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    Tn(l, i))) && a.push(l);
  return a;
}
function kn(o, e) {
  return function(t) {
    return o(e(t));
  };
}
var _ce = kn(Object.keys, Object);
const yce = _ce;
var $ce = Object.prototype, vce = $ce.hasOwnProperty;
function bce(o) {
  if (!gt(o))
    return yce(o);
  var e = [];
  for (var t in Object(o))
    vce.call(o, t) && t != "constructor" && e.push(t);
  return e;
}
function _t(o) {
  return ft(o) ? An(o) : bce(o);
}
function Tce(o) {
  var e = [];
  if (o != null)
    for (var t in Object(o))
      e.push(t);
  return e;
}
var Pce = Object.prototype, Sce = Pce.hasOwnProperty;
function Oce(o) {
  if (!ye(o))
    return Tce(o);
  var e = gt(o), t = [];
  for (var n in o)
    n == "constructor" && (e || !Sce.call(o, n)) || t.push(n);
  return t;
}
function yt(o) {
  return ft(o) ? An(o, !0) : Oce(o);
}
var wce = je(Object, "create");
const co = wce;
function Cce() {
  this.__data__ = co ? co(null) : {}, this.size = 0;
}
function Mce(o) {
  var e = this.has(o) && delete this.__data__[o];
  return this.size -= e ? 1 : 0, e;
}
var jce = "__lodash_hash_undefined__", Ace = Object.prototype, kce = Ace.hasOwnProperty;
function Ice(o) {
  var e = this.__data__;
  if (co) {
    var t = e[o];
    return t === jce ? void 0 : t;
  }
  return kce.call(e, o) ? e[o] : void 0;
}
var Nce = Object.prototype, Dce = Nce.hasOwnProperty;
function Ece(o) {
  var e = this.__data__;
  return co ? e[o] !== void 0 : Dce.call(e, o);
}
var xce = "__lodash_hash_undefined__";
function Rce(o, e) {
  var t = this.__data__;
  return this.size += this.has(o) ? 0 : 1, t[o] = co && e === void 0 ? xce : e, this;
}
function Ce(o) {
  var e = -1, t = o == null ? 0 : o.length;
  for (this.clear(); ++e < t; ) {
    var n = o[e];
    this.set(n[0], n[1]);
  }
}
Ce.prototype.clear = Cce;
Ce.prototype.delete = Mce;
Ce.prototype.get = Ice;
Ce.prototype.has = Ece;
Ce.prototype.set = Rce;
function zce() {
  this.__data__ = [], this.size = 0;
}
function Ro(o, e) {
  for (var t = o.length; t--; )
    if (mt(o[t][0], e))
      return t;
  return -1;
}
var Fce = Array.prototype, Lce = Fce.splice;
function Hce(o) {
  var e = this.__data__, t = Ro(e, o);
  if (t < 0)
    return !1;
  var n = e.length - 1;
  return t == n ? e.pop() : Lce.call(e, t, 1), --this.size, !0;
}
function Bce(o) {
  var e = this.__data__, t = Ro(e, o);
  return t < 0 ? void 0 : e[t][1];
}
function Uce(o) {
  return Ro(this.__data__, o) > -1;
}
function Wce(o, e) {
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
ie.prototype.clear = zce;
ie.prototype.delete = Hce;
ie.prototype.get = Bce;
ie.prototype.has = Uce;
ie.prototype.set = Wce;
var qce = je(re, "Map");
const io = qce;
function Vce() {
  this.size = 0, this.__data__ = {
    hash: new Ce(),
    map: new (io || ie)(),
    string: new Ce()
  };
}
function Gce(o) {
  var e = typeof o;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? o !== "__proto__" : o === null;
}
function zo(o, e) {
  var t = o.__data__;
  return Gce(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Yce(o) {
  var e = zo(this, o).delete(o);
  return this.size -= e ? 1 : 0, e;
}
function Kce(o) {
  return zo(this, o).get(o);
}
function Qce(o) {
  return zo(this, o).has(o);
}
function Xce(o, e) {
  var t = zo(this, o), n = t.size;
  return t.set(o, e), this.size += t.size == n ? 0 : 1, this;
}
function Ue(o) {
  var e = -1, t = o == null ? 0 : o.length;
  for (this.clear(); ++e < t; ) {
    var n = o[e];
    this.set(n[0], n[1]);
  }
}
Ue.prototype.clear = Vce;
Ue.prototype.delete = Yce;
Ue.prototype.get = Kce;
Ue.prototype.has = Qce;
Ue.prototype.set = Xce;
function In(o, e) {
  for (var t = -1, n = e.length, r = o.length; ++t < n; )
    o[r + t] = e[t];
  return o;
}
var Jce = kn(Object.getPrototypeOf, Object);
const Nn = Jce;
function Zce() {
  this.__data__ = new ie(), this.size = 0;
}
function eie(o) {
  var e = this.__data__, t = e.delete(o);
  return this.size = e.size, t;
}
function oie(o) {
  return this.__data__.get(o);
}
function tie(o) {
  return this.__data__.has(o);
}
var nie = 200;
function rie(o, e) {
  var t = this.__data__;
  if (t instanceof ie) {
    var n = t.__data__;
    if (!io || n.length < nie - 1)
      return n.push([o, e]), this.size = ++t.size, this;
    t = this.__data__ = new Ue(n);
  }
  return t.set(o, e), this.size = t.size, this;
}
function We(o) {
  var e = this.__data__ = new ie(o);
  this.size = e.size;
}
We.prototype.clear = Zce;
We.prototype.delete = eie;
We.prototype.get = oie;
We.prototype.has = tie;
We.prototype.set = rie;
function sie(o, e) {
  return o && xo(e, _t(e), o);
}
function aie(o, e) {
  return o && xo(e, yt(e), o);
}
var Dn = typeof exports == "object" && exports && !exports.nodeType && exports, Ht = Dn && typeof module == "object" && module && !module.nodeType && module, cie = Ht && Ht.exports === Dn, Bt = cie ? re.Buffer : void 0, Ut = Bt ? Bt.allocUnsafe : void 0;
function iie(o, e) {
  if (e)
    return o.slice();
  var t = o.length, n = Ut ? Ut(t) : new o.constructor(t);
  return o.copy(n), n;
}
function lie(o, e) {
  for (var t = -1, n = o == null ? 0 : o.length, r = 0, s = []; ++t < n; ) {
    var c = o[t];
    e(c, t, o) && (s[r++] = c);
  }
  return s;
}
function En() {
  return [];
}
var die = Object.prototype, uie = die.propertyIsEnumerable, Wt = Object.getOwnPropertySymbols, pie = Wt ? function(o) {
  return o == null ? [] : (o = Object(o), lie(Wt(o), function(e) {
    return uie.call(o, e);
  }));
} : En;
const $t = pie;
function mie(o, e) {
  return xo(o, $t(o), e);
}
var fie = Object.getOwnPropertySymbols, gie = fie ? function(o) {
  for (var e = []; o; )
    In(e, $t(o)), o = Nn(o);
  return e;
} : En;
const xn = gie;
function hie(o, e) {
  return xo(o, xn(o), e);
}
function Rn(o, e, t) {
  var n = e(o);
  return pt(o) ? n : In(n, t(o));
}
function _ie(o) {
  return Rn(o, _t, $t);
}
function yie(o) {
  return Rn(o, yt, xn);
}
var $ie = je(re, "DataView");
const tt = $ie;
var vie = je(re, "Promise");
const nt = vie;
var bie = je(re, "Set");
const rt = bie;
var qt = "[object Map]", Tie = "[object Object]", Vt = "[object Promise]", Gt = "[object Set]", Yt = "[object WeakMap]", Kt = "[object DataView]", Pie = Me(tt), Sie = Me(io), Oie = Me(nt), wie = Me(rt), Cie = Me(ot), Se = He;
(tt && Se(new tt(new ArrayBuffer(1))) != Kt || io && Se(new io()) != qt || nt && Se(nt.resolve()) != Vt || rt && Se(new rt()) != Gt || ot && Se(new ot()) != Yt) && (Se = function(o) {
  var e = He(o), t = e == Tie ? o.constructor : void 0, n = t ? Me(t) : "";
  if (n)
    switch (n) {
      case Pie:
        return Kt;
      case Sie:
        return qt;
      case Oie:
        return Vt;
      case wie:
        return Gt;
      case Cie:
        return Yt;
    }
  return e;
});
const vt = Se;
var Mie = Object.prototype, jie = Mie.hasOwnProperty;
function Aie(o) {
  var e = o.length, t = new o.constructor(e);
  return e && typeof o[0] == "string" && jie.call(o, "index") && (t.index = o.index, t.input = o.input), t;
}
var kie = re.Uint8Array;
const Qt = kie;
function bt(o) {
  var e = new o.constructor(o.byteLength);
  return new Qt(e).set(new Qt(o)), e;
}
function Iie(o, e) {
  var t = e ? bt(o.buffer) : o.buffer;
  return new o.constructor(t, o.byteOffset, o.byteLength);
}
var Nie = /\w*$/;
function Die(o) {
  var e = new o.constructor(o.source, Nie.exec(o));
  return e.lastIndex = o.lastIndex, e;
}
var Xt = Re ? Re.prototype : void 0, Jt = Xt ? Xt.valueOf : void 0;
function Eie(o) {
  return Jt ? Object(Jt.call(o)) : {};
}
function xie(o, e) {
  var t = e ? bt(o.buffer) : o.buffer;
  return new o.constructor(t, o.byteOffset, o.length);
}
var Rie = "[object Boolean]", zie = "[object Date]", Fie = "[object Map]", Lie = "[object Number]", Hie = "[object RegExp]", Bie = "[object Set]", Uie = "[object String]", Wie = "[object Symbol]", qie = "[object ArrayBuffer]", Vie = "[object DataView]", Gie = "[object Float32Array]", Yie = "[object Float64Array]", Kie = "[object Int8Array]", Qie = "[object Int16Array]", Xie = "[object Int32Array]", Jie = "[object Uint8Array]", Zie = "[object Uint8ClampedArray]", ele = "[object Uint16Array]", ole = "[object Uint32Array]";
function tle(o, e, t) {
  var n = o.constructor;
  switch (e) {
    case qie:
      return bt(o);
    case Rie:
    case zie:
      return new n(+o);
    case Vie:
      return Iie(o, t);
    case Gie:
    case Yie:
    case Kie:
    case Qie:
    case Xie:
    case Jie:
    case Zie:
    case ele:
    case ole:
      return xie(o, t);
    case Fie:
      return new n();
    case Lie:
    case Uie:
      return new n(o);
    case Hie:
      return Die(o);
    case Bie:
      return new n();
    case Wie:
      return Eie(o);
  }
}
function nle(o) {
  return typeof o.constructor == "function" && !gt(o) ? $ae(Nn(o)) : {};
}
var rle = "[object Map]";
function sle(o) {
  return Be(o) && vt(o) == rle;
}
var Zt = ze && ze.isMap, ale = Zt ? ht(Zt) : sle;
const cle = ale;
var ile = "[object Set]";
function lle(o) {
  return Be(o) && vt(o) == ile;
}
var en = ze && ze.isSet, dle = en ? ht(en) : lle;
const ule = dle;
var ple = 1, mle = 2, fle = 4, zn = "[object Arguments]", gle = "[object Array]", hle = "[object Boolean]", _le = "[object Date]", yle = "[object Error]", Fn = "[object Function]", $le = "[object GeneratorFunction]", vle = "[object Map]", ble = "[object Number]", Ln = "[object Object]", Tle = "[object RegExp]", Ple = "[object Set]", Sle = "[object String]", Ole = "[object Symbol]", wle = "[object WeakMap]", Cle = "[object ArrayBuffer]", Mle = "[object DataView]", jle = "[object Float32Array]", Ale = "[object Float64Array]", kle = "[object Int8Array]", Ile = "[object Int16Array]", Nle = "[object Int32Array]", Dle = "[object Uint8Array]", Ele = "[object Uint8ClampedArray]", xle = "[object Uint16Array]", Rle = "[object Uint32Array]", M = {};
M[zn] = M[gle] = M[Cle] = M[Mle] = M[hle] = M[_le] = M[jle] = M[Ale] = M[kle] = M[Ile] = M[Nle] = M[vle] = M[ble] = M[Ln] = M[Tle] = M[Ple] = M[Sle] = M[Ole] = M[Dle] = M[Ele] = M[xle] = M[Rle] = !0;
M[yle] = M[Fn] = M[wle] = !1;
function vo(o, e, t, n, r, s) {
  var c, a = e & ple, i = e & mle, l = e & fle;
  if (t && (c = r ? t(o, n, r, s) : t(o)), c !== void 0)
    return c;
  if (!ye(o))
    return o;
  var u = pt(o);
  if (u) {
    if (c = Aie(o), !a)
      return vae(o, c);
  } else {
    var d = vt(o), f = d == Fn || d == $le;
    if (Mn(o))
      return iie(o, a);
    if (d == Ln || d == zn || f && !r) {
      if (c = i || f ? {} : nle(o), !a)
        return i ? hie(o, aie(c, o)) : mie(o, sie(c, o));
    } else {
      if (!M[d])
        return r ? o : {};
      c = tle(o, d, a);
    }
  }
  s || (s = new We());
  var h = s.get(o);
  if (h)
    return h;
  s.set(o, c), ule(o) ? o.forEach(function($) {
    c.add(vo($, e, t, $, o, s));
  }) : cle(o) && o.forEach(function($, b) {
    c.set(b, vo($, e, t, b, o, s));
  });
  var m = l ? i ? yie : _ie : i ? yt : _t, g = u ? void 0 : m(o);
  return Tae(g || o, function($, b) {
    g && (b = $, $ = o[b]), Sn(c, b, vo($, e, t, b, o, s));
  }), c;
}
var zle = 1, Fle = 4;
function Lle(o) {
  return vo(o, zle | Fle);
}
var Hle = Math.ceil, Ble = Math.max;
function Ule(o, e, t, n) {
  for (var r = -1, s = Ble(Hle((e - o) / (t || 1)), 0), c = Array(s); s--; )
    c[n ? s : ++r] = o, o += t;
  return c;
}
function Wle(o) {
  return function(e, t, n) {
    return n && typeof n != "number" && Mae(e, t, n) && (t = n = void 0), e = Ho(e), t === void 0 ? (t = e, e = 0) : t = Ho(t), n = n === void 0 ? e < t ? 1 : -1 : Ho(n), Ule(e, t, n, o);
  };
}
var qle = Wle();
const Vle = qle, Gle = Eo("system", {
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
      Fe() && (e = this.systemInfo.platform == "ios" ? uni.getStorageSync("initUrl") : location.href), bse({
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
      Tse({
        openid: uni.getStorageSync("openid")
      }).then((o) => {
        uni.setStorageSync("member_mobile_exist", o.data.member_mobile_exist);
      });
    },
    getMenuButtonInfoFn() {
    },
    async getSiteInfoFn() {
      await vse().then((o) => {
        this.site = o.data, this.siteApps = o.data.app, this.siteAddons = o.data.site_addons.map((e) => e.key);
      }).catch((o) => {
      });
    },
    // 当前选择的收货地址信息[经纬度，当前定位地址，定位过期时间]
    setAddressInfo(o = {}) {
      let e = Lle(o);
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
}), Tt = Gle, Wo = (o) => {
  let e = Nne();
  const n = `${yse.getFileKey(e).fileKey}.${o}`;
  return Qe.global.t(o) != o ? Qe.global.t(o) : Qe.global.t(n) != n ? Qe.global.t(n) : "";
};
var qo = Object.prototype.hasOwnProperty, Ie = Array.isArray, ee = function() {
  for (var o = [], e = 0; e < 256; ++e)
    o.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return o;
}(), Yle = function(e) {
  for (; e.length > 1; ) {
    var t = e.pop(), n = t.obj[t.prop];
    if (Ie(n)) {
      for (var r = [], s = 0; s < n.length; ++s)
        typeof n[s] < "u" && r.push(n[s]);
      t.obj[t.prop] = r;
    }
  }
}, Hn = function(e, t) {
  for (var n = t && t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, r = 0; r < e.length; ++r)
    typeof e[r] < "u" && (n[r] = e[r]);
  return n;
}, Kle = function o(e, t, n) {
  if (!t)
    return e;
  if (typeof t != "object") {
    if (Ie(e))
      e.push(t);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !qo.call(Object.prototype, t)) && (e[t] = !0);
    else
      return [e, t];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(t);
  var r = e;
  return Ie(e) && !Ie(t) && (r = Hn(e, n)), Ie(e) && Ie(t) ? (t.forEach(function(s, c) {
    if (qo.call(e, c)) {
      var a = e[c];
      a && typeof a == "object" && s && typeof s == "object" ? e[c] = o(a, s, n) : e.push(s);
    } else
      e[c] = s;
  }), e) : Object.keys(t).reduce(function(s, c) {
    var a = t[c];
    return qo.call(s, c) ? s[c] = o(s[c], a, n) : s[c] = a, s;
  }, r);
}, Qle = function(e, t) {
  return Object.keys(t).reduce(function(n, r) {
    return n[r] = t[r], n;
  }, e);
}, Xle = function(o, e, t) {
  var n = o.replace(/\+/g, " ");
  if (t === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, Jle = function(e, t, n) {
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
}, Zle = function(e) {
  for (var t = [{ obj: { o: e }, prop: "o" }], n = [], r = 0; r < t.length; ++r)
    for (var s = t[r], c = s.obj[s.prop], a = Object.keys(c), i = 0; i < a.length; ++i) {
      var l = a[i], u = c[l];
      typeof u == "object" && u !== null && n.indexOf(u) === -1 && (t.push({ obj: c, prop: l }), n.push(u));
    }
  return Yle(t), e;
}, ede = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, ode = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, tde = function(e, t) {
  return [].concat(e, t);
}, Bn = {
  arrayToObject: Hn,
  assign: Qle,
  combine: tde,
  compact: Zle,
  decode: Xle,
  encode: Jle,
  isBuffer: ode,
  isRegExp: ede,
  merge: Kle
}, nde = String.prototype.replace, rde = /%20/g, Un = {
  default: "RFC3986",
  formatters: {
    RFC1738: function(o) {
      return nde.call(o, rde, "+");
    },
    RFC3986: function(o) {
      return o;
    }
  },
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Wn = Bn, oo = Un, sde = Object.prototype.hasOwnProperty, on = {
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
}, Ee = Array.isArray, ade = Array.prototype.push, st = function(o, e) {
  ade.apply(o, Ee(e) ? e : [e]);
}, cde = Date.prototype.toISOString, H = {
  addQueryPrefix: !1,
  allowDots: !1,
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encoder: Wn.encode,
  encodeValuesOnly: !1,
  formatter: oo.formatters[oo.default],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return cde.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, ide = function o(e, t, n, r, s, c, a, i, l, u, d, f, h) {
  var m = e;
  if (typeof a == "function" ? m = a(t, m) : m instanceof Date ? m = u(m) : n === "comma" && Ee(m) && (m = m.join(",")), m === null) {
    if (r)
      return c && !f ? c(t, H.encoder, h) : t;
    m = "";
  }
  if (typeof m == "string" || typeof m == "number" || typeof m == "boolean" || Wn.isBuffer(m)) {
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
  if (Ee(a))
    b = a;
  else {
    var w = Object.keys(m);
    b = i ? w.sort(i) : w;
  }
  for (var I = 0; I < b.length; ++I) {
    var D = b[I];
    s && m[D] === null || (Ee(m) ? st($, o(
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
    )) : st($, o(
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
}, lde = function(e) {
  if (!e)
    return H;
  if (e.encoder !== null && e.encoder !== void 0 && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var t = e.charset || H.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = oo.default;
  if (typeof e.format < "u") {
    if (!sde.call(oo.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var r = oo.formatters[n], s = H.filter;
  return (typeof e.filter == "function" || Ee(e.filter)) && (s = e.filter), {
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
}, dde = function(o, e) {
  var t = o, n = lde(e), r, s;
  typeof n.filter == "function" ? (s = n.filter, t = s("", t)) : Ee(n.filter) && (s = n.filter, r = s);
  var c = [];
  if (typeof t != "object" || t === null)
    return "";
  var a;
  e && e.arrayFormat in on ? a = e.arrayFormat : e && "indices" in e ? a = e.indices ? "indices" : "repeat" : a = "indices";
  var i = on[a];
  r || (r = Object.keys(t)), n.sort && r.sort(n.sort);
  for (var l = 0; l < r.length; ++l) {
    var u = r[l];
    n.skipNulls && t[u] === null || st(c, ide(
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
}, lo = Bn, at = Object.prototype.hasOwnProperty, F = {
  allowDots: !1,
  allowPrototypes: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decoder: lo.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, ude = function(o) {
  return o.replace(/&#(\d+);/g, function(e, t) {
    return String.fromCharCode(parseInt(t, 10));
  });
}, pde = "utf8=%26%2310003%3B", mde = "utf8=%E2%9C%93", fde = function(e, t) {
  var n = {}, r = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, s = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, c = r.split(t.delimiter, s), a = -1, i, l = t.charset;
  if (t.charsetSentinel)
    for (i = 0; i < c.length; ++i)
      c[i].indexOf("utf8=") === 0 && (c[i] === mde ? l = "utf-8" : c[i] === pde && (l = "iso-8859-1"), a = i, i = c.length);
  for (i = 0; i < c.length; ++i)
    if (i !== a) {
      var u = c[i], d = u.indexOf("]="), f = d === -1 ? u.indexOf("=") : d + 1, h, m;
      f === -1 ? (h = t.decoder(u, F.decoder, l), m = t.strictNullHandling ? null : "") : (h = t.decoder(u.slice(0, f), F.decoder, l), m = t.decoder(u.slice(f + 1), F.decoder, l)), m && t.interpretNumericEntities && l === "iso-8859-1" && (m = ude(m)), m && t.comma && m.indexOf(",") > -1 && (m = m.split(",")), at.call(n, h) ? n[h] = lo.combine(n[h], m) : n[h] = m;
    }
  return n;
}, gde = function(o, e, t) {
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
}, hde = function(e, t, n) {
  if (e) {
    var r = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, s = /(\[[^[\]]*])/, c = /(\[[^[\]]*])/g, a = s.exec(r), i = a ? r.slice(0, a.index) : r, l = [];
    if (i) {
      if (!n.plainObjects && at.call(Object.prototype, i) && !n.allowPrototypes)
        return;
      l.push(i);
    }
    for (var u = 0; (a = c.exec(r)) !== null && u < n.depth; ) {
      if (u += 1, !n.plainObjects && at.call(Object.prototype, a[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      l.push(a[1]);
    }
    return a && l.push("[" + r.slice(a.index) + "]"), gde(l, t, n);
  }
}, _de = function(e) {
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
    delimiter: typeof e.delimiter == "string" || lo.isRegExp(e.delimiter) ? e.delimiter : F.delimiter,
    depth: typeof e.depth == "number" ? e.depth : F.depth,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : F.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : F.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : F.plainObjects,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : F.strictNullHandling
  };
}, yde = function(o, e) {
  var t = _de(e);
  if (o === "" || o === null || typeof o > "u")
    return t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof o == "string" ? fde(o, t) : o, r = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, s = Object.keys(n), c = 0; c < s.length; ++c) {
    var a = s[c], i = hde(a, n[a], t);
    r = lo.merge(r, i, t);
  }
  return lo.compact(r);
}, $de = dde, vde = yde, bde = Un, Tde = {
  formats: bde,
  parse: vde,
  stringify: $de
};
const Pde = typeof window < "u", me = Pde ? window.__ENV__ || {} : {}, Q = {
  VITE_APP_BASE_URL: me.VITE_APP_BASE_URL || "" || "",
  VITE_IMG_DOMAIN: me.VITE_IMG_DOMAIN || "" || "",
  VITE_SITE_ID: me.VITE_SITE_ID || "" || "",
  VITE_REQUEST_STORAGE_TOKEN_KEY: me.VITE_REQUEST_STORAGE_TOKEN_KEY || "wapToken",
  VITE_REQUEST_HEADER_TOKEN_KEY: me.VITE_REQUEST_HEADER_TOKEN_KEY || "token",
  VITE_REQUEST_HEADER_SITEID_KEY: me.VITE_REQUEST_HEADER_SITEID_KEY || "site-id",
  VITE_REQUEST_HEADER_CHANNEL_KEY: me.VITE_REQUEST_HEADER_CHANNEL_KEY || "channel",
  VITE_APP_VERSION: me.VITE_APP_VERSION || "1.0.1"
};
class Sde {
  constructor() {
    be(this, "baseUrl");
    be(this, "config", {
      url: "",
      header: {}
    });
    this.baseUrl = Q.VITE_APP_BASE_URL || `${location.origin}/api/`, this.baseUrl.substr(-1) != "/" && (this.baseUrl += "/");
    try {
      this.config.header[Q.VITE_REQUEST_HEADER_SITEID_KEY] = nn(Q.VITE_SITE_ID), this.config.header[Q.VITE_REQUEST_HEADER_CHANNEL_KEY] = tn();
    } catch {
    }
  }
  /**
   * 请求拦截器
   */
  requestInterceptors() {
    try {
      jo() && (this.config.header[Q.VITE_REQUEST_HEADER_TOKEN_KEY] = jo()), this.config.header[Q.VITE_REQUEST_HEADER_CHANNEL_KEY] = tn(), this.config.header[Q.VITE_REQUEST_HEADER_SITEID_KEY] = nn(Q.VITE_SITE_ID);
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
    return s.method.toUpperCase() == "GET" || s.method.toUpperCase() == "DELETE" ? s.url += "?" + Tde.stringify(n) : s.data = n, new Promise((c, a) => {
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
      const t = (Vn(this.baseUrl) ? this.baseUrl : location.origin + this.baseUrl) + Wo("baseUrlError");
      uni.showToast({ icon: "none", title: t });
      return;
    }
    if (e.errMsg == "request:fail") {
      uni.showToast({ icon: "none", title: this.baseUrl + Wo("requestFail") });
      return;
    }
    if (e.errMsg && e.errMsg == "request:fail url not in domain list") {
      uni.showToast({ icon: "none", title: this.baseUrl + Wo("notInDomainList") });
      return;
    }
  }
}
const B = new Sde();
function Ode() {
  return B.get("member/member");
}
function wde(o) {
  return uni.getStorageSync("pid") && (o.pid = uni.getStorageSync("pid")), B.put("member/mobile", o, { showErrorMessage: !0 });
}
function qn() {
  const o = (a) => {
    uni.setStorage({ key: "loginBack", data: a }), setTimeout(() => {
      const i = Co(), l = Tt();
      !uni.getStorageSync("autoLoginLock") && Fe() && i.login.is_bind_mobile && uni.setStorageSync("isBindMobile", !0), Fe() ? i.login.is_username && !i.login.is_mobile && !i.login.is_auth_register ? W({ url: "/app/pages/auth/login", param: { type: "username" } }) : l.initStatus == "finish" && !i.login.is_username && !i.login.is_mobile && !i.login.is_auth_register ? uni.showToast({ title: "商家未开启登录注册", icon: "none" }) : W({ url: "/app/pages/auth/index" }) : i.login.is_username && !i.login.is_mobile ? W({ url: "/app/pages/auth/login", param: { type: "username" } }) : l.initStatus == "finish" && !i.login.is_username && !i.login.is_mobile ? uni.showToast({ title: "商家未开启登录注册", icon: "none" }) : W({ url: "/app/pages/auth/index" });
    });
  }, e = X(0), t = (a) => {
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
    uni.getStorageSync("pid") && Object.assign(i, { pid: uni.getStorageSync("pid") }), Ose(i).then((l) => {
      l.data && wse(l.data).then((u) => {
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
    Cse({
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
      let l = kde(location.href).query;
      l.code && delete l.code, Object.keys(l).length && (i += uni.$u.queryParams(l));
    }
    $se({
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
      a && Mse({ wx_openid: a }).then((i) => {
        const l = ge().info;
        l && l.wx_openid && uni.setStorageSync("openid", l.wx_openid);
      });
    }
  };
}
const Cde = Eo("member", {
  state: () => ({
    token: uni.getStorageSync(Q.VITE_REQUEST_STORAGE_TOKEN_KEY),
    info: null,
    levelList: null
  }),
  actions: {
    setToken(o, e = null) {
      this.token = o, jde(o), this.getMemberInfo(e);
    },
    getMemberInfo(o = null) {
      this.token && Ode().then((e) => {
        this.info = e.data, uni.setStorageSync("wap_member_info", this.info), uni.setStorageSync("wap_member_id", e.data.member_id), this.info.mobile && (uni.removeStorageSync("isBindMobile"), uni.setStorageSync("wap_member_mobile", this.info.mobile)), this.info && this.info.wx_openid ? uni.setStorageSync("member_exist", 1) : qn().updateWechatOpenidForH5(uni.getStorageSync("openid")), o && o();
      }).catch(() => {
        this.logout(), uni.removeStorageSync("wap_member_mobile"), uni.removeStorageSync("wap_member_id"), uni.removeStorageSync("wap_member_not_control_mobile");
      });
    },
    logout(o = !1) {
      if (!this.token)
        return;
      this.token = "", this.info = null, uni.setStorageSync("autoLoginLock", !0);
      let e = () => {
        Ade(), uni.removeStorageSync("wap_member_info"), uni.removeStorageSync("unionid"), uni.removeStorageSync("isBindMobile"), uni.removeStorageSync("nickname"), uni.removeStorageSync("avatar"), uni.removeStorageSync("wap_member_mobile"), uni.removeStorageSync("wap_member_id"), uni.removeStorageSync("wap_member_not_control_mobile"), o && W({ url: "/app/pages/index/index", mode: "switchTab" });
      };
      Sse().then(() => {
        e();
      }).catch(() => {
        e();
      });
    },
    // 一键绑定手机号
    bindMobile(o) {
      if (o.detail.errMsg == "getPhoneNumber:ok" && (uni.showLoading({ title: "" }), wde({
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
}), ge = Cde, W = (o) => {
  const e = ut();
  if (qe().mode == "decorate")
    return;
  let { url: t, mode: n, param: r, success: s, fail: c, complete: a } = o;
  t && (t.indexOf("https") != -1 || t.indexOf("http") != -1) && (window.location.href = t);
  let i = t, l = !1;
  if (!jo() && wne().indexOf(t) != -1) {
    const d = Co(), f = Tt();
    if (Fe())
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
  switch (n = n || "navigateTo", jne().includes(t) && (n = "switchTab"), n != "switchTab" && r && Object.keys(r).length && (t += e.$u.queryParams(r)), l && e.setStorage({ key: "loginBack", data: { url: i } }), n) {
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
}, Mde = (o) => {
  qe().mode != "decorate" && (o == null || Object.keys(o).length == 1 || (o.url && (o.url.indexOf("https") != -1 || o.url.indexOf("http") != -1) ? window.location.href = o.url : o.appid || (o.name == "DIY_MAKE_PHONE_CALL" && o.mobile ? uni.makePhoneCall({
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
function jo() {
  return ge().token;
}
function jde(o) {
  uni.setStorageSync(Q.VITE_REQUEST_STORAGE_TOKEN_KEY, o);
}
function Ade() {
  uni.removeStorageSync(Q.VITE_REQUEST_STORAGE_TOKEN_KEY);
}
function kde(o) {
  const e = {}, [t, n] = o.split("?");
  return n && n.split("&").forEach((r) => {
    let [s, c] = r.split("=");
    e[s] = c;
  }), { path: t, query: e };
}
function Vn(o) {
  return o && (o.indexOf("http://") != -1 || o.indexOf("https://") != -1) || !1;
}
function Ide(o) {
  let e = Q.VITE_IMG_DOMAIN || location.origin;
  return typeof o == "string" && o.startsWith("/") && (o = o.replace(/^\//, "")), typeof e == "string" && e.endsWith("/") && (e = e.slice(0, -1)), Vn(o) ? o : `${e}/${o}`;
}
function Fe() {
  let o = navigator.userAgent.toLowerCase();
  return !!/micromessenger/.test(o);
}
function tn() {
  return Fe() ? "wechat" : "h5";
}
function nn(o) {
  const e = location.href.match(/\/wap\/(\d*)\//);
  return e && (o = e[1]), o;
}
let rn = !1;
function Gn() {
  return typeof window > "u" ? !1 : /[?&]mode=decorate(?:&|$|#)/.test(window.location.href);
}
function Zve() {
  if (typeof window > "u")
    return !1;
  try {
    return window.parent !== window;
  } catch {
    return !1;
  }
}
function Nde(o) {
  o != null && o.length && o.forEach((e) => {
    e.pageStyle = "", e.componentIsShow = !0, e.pageStartBgColor && (e.pageStartBgColor && e.pageEndBgColor ? e.pageStyle += `background:linear-gradient(${e.pageGradientAngle},${e.pageStartBgColor},${e.pageEndBgColor});` : e.pageStyle += "background-color:" + e.pageStartBgColor + ";"), e.margin && (e.margin.top > 0 ? e.pageStyle += "padding-top:" + e.margin.top * 2 + "rpx;" : e.pageStyle += "padding-top:2rpx;", e.pageStyle += "padding-bottom:" + e.margin.bottom * 2 + "rpx;", e.pageStyle += "padding-right:" + e.margin.both * 2 + "rpx;", e.pageStyle += "padding-left:" + e.margin.both * 2 + "rpx;");
  });
}
function Dde(o) {
  const e = qe();
  o.pageMode !== void 0 && (e.pageMode = o.pageMode), o.currentIndex !== void 0 && (e.currentIndex = o.currentIndex), o.global && (e.global = o.global), o.value && (e.value = o.value), Nde(e.value);
}
function Yn() {
  if (rn)
    return;
  rn = !0;
  const o = qe();
  Gn() && (o.mode = "decorate"), window.addEventListener("message", (e) => {
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
      o.mode = "decorate", Dde(t);
    } catch (t) {
      console.log("uni-app diy decorate bridge", t);
    }
  }, !1);
}
function Ede() {
  Yn(), window.parent.postMessage(JSON.stringify({
    type: "init",
    load: !0
  }), "*");
}
function sn(o = {}) {
  var n;
  if (o.mode)
    return String(o.mode);
  const e = getCurrentPages(), t = e[e.length - 1];
  return (n = t == null ? void 0 : t.options) != null && n.mode ? String(t.options.mode) : Gn() ? "decorate" : "";
}
const qe = Eo("diy", {
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
      Yn(), Ede();
    },
    // 将数据传输给后台
    postMessage(o, e) {
      if (this.currentIndex = o, e)
        var t = JSON.stringify({
          type: "data",
          index: this.currentIndex,
          global: go(this.global),
          value: go(this.value),
          component: go(e)
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
        component: go(e)
      });
      window.parent.postMessage(t, "*");
    },
    toRedirect(o) {
      if (Object.keys(o).length) {
        if (!o.name)
          return;
        if (Mo() == "app/pages/member/index" && !jo()) {
          qn().setLoginBack({ url: o.url });
          return;
        }
        Mde(o);
      }
    }
  }
}), xde = "onShow", Rde = "onHide", zde = "onLoad", Fde = "onUnload", Lde = "onPageScroll", uo = (o) => (e, t = hn()) => {
  !_ne && yne(o, e, t);
}, Kn = /* @__PURE__ */ uo(xde), Qn = /* @__PURE__ */ uo(Rde), Hde = /* @__PURE__ */ uo(zde), Bde = /* @__PURE__ */ uo(Fde), Xn = /* @__PURE__ */ uo(Lde);
function Ude(o) {
  return B.get("diy/diy", o);
}
function ebe(o) {
  return B.get("diy/tabbar/list", o);
}
function obe(o) {
  return B.get("diy/share", o);
}
function tbe() {
  return B.get("diy/form/member_record");
}
const Wde = Symbol("addonPageQuery");
function nbe(o = {}) {
  const e = X(!0), t = qe(), n = $ne(Wde, null), r = X(0), s = X(o.name || ""), c = X(""), a = X(""), i = Mt({}), l = Mt({
    pageMode: "diy",
    title: "",
    global: {},
    value: []
  }), u = () => e.value, d = _n(() => t.mode == "decorate" ? t : l), f = X(!1), h = () => {
    let P = "";
    return d.value.global.pageStartBgColor && (d.value.global.pageStartBgColor && d.value.global.pageEndBgColor ? P += `background:linear-gradient(${d.value.global.pageGradientAngle},${d.value.global.pageStartBgColor},${d.value.global.pageEndBgColor});` : P += "background-color:" + d.value.global.pageStartBgColor + ";"), d.value.global.bottomTabBar && d.value.global.bottomTabBar.isShow ? P += "min-height:calc(100vh - 50px);" : P += "min-height:calc(100vh);", d.value.global.bgUrl && (P += `background-image:url('${Ide(d.value.global.bgUrl)}');`), d.value.global.bgHeightScale && (P += `background-size: 100% ${d.value.global.bgHeightScale}%;`), P;
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
    }), t.global = l.global, t.value = l.value, f.value = l.value.some((T) => T && T.position && T.position == "top_fixed"), ut().setNavigationBarTitle({
      title: l.title
    }), e.value = !1, C && C(i);
  }
  function g(P = null) {
    Ude({
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
  return yn(
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
      Hde((P) => {
        var C;
        !P.mode && ((C = n == null ? void 0 : n.value) != null && C.mode) && (P.mode = n.value.mode), t.mode = sn(P), t.mode == "decorate" && (e.value = !1, $()), r.value = P.id || "", s.value == "" && (s.value = P.name || ""), c.value = P.template || "";
      });
    },
    onShow: (P = null) => {
      Kn(() => {
        let C = getCurrentPages();
        a.value = C[C.length - 1] ? C[C.length - 1].route : "";
        let R = [];
        uni.getStorageSync("diyPageBlank") && (R = uni.getStorageSync("diyPageBlank")), !R.length || R.length && R.indexOf(a.value) == -1 ? t.topFixedStatus = "home" : R.length && R.indexOf(a.value) != -1 && (t.topFixedStatus = "diy"), t.mode || (t.mode = sn({})), t.mode == "decorate" ? (t.init(), $()) : g(P);
      });
    },
    onHide: (P = null) => {
      Qn(() => {
        let C = [];
        uni.getStorageSync("diyPageBlank") && (C = uni.getStorageSync("diyPageBlank")), C.length && (C = Array.from(new Set(C)), C.forEach((R, T, $e) => {
          R == a.value && $e.splice(T, 1);
        })), t.topFixedStatus == "diy" && C.push(a.value), uni.setStorageSync("diyPageBlank", C), P && P();
      });
    },
    onUnload: (P = null) => {
      Bde(() => {
        P && P();
      });
    },
    onPageScroll: () => {
      Xn((P) => {
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
function an(o, e) {
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
    e % 2 ? an(Object(t), !0).forEach(function(n) {
      qde(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : an(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function bo(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? bo = function(e) {
    return typeof e;
  } : bo = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, bo(o);
}
function qde(o, e, t) {
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
function Vde(o, e) {
  if (o == null)
    return {};
  var t = {}, n = Object.keys(o), r, s;
  for (s = 0; s < n.length; s++)
    r = n[s], !(e.indexOf(r) >= 0) && (t[r] = o[r]);
  return t;
}
function Gde(o, e) {
  if (o == null)
    return {};
  var t = Vde(o, e), n, r;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(o);
    for (r = 0; r < s.length; r++)
      n = s[r], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(o, n) && (t[n] = o[n]);
  }
  return t;
}
var Yde = "1.15.6";
function ae(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var le = ae(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), po = ae(/Edge/i), cn = ae(/firefox/i), to = ae(/safari/i) && !ae(/chrome/i) && !ae(/android/i), Pt = ae(/iP(ad|od|hone)/i), Jn = ae(/chrome/i) && ae(/android/i), Zn = {
  capture: !1,
  passive: !1
};
function O(o, e, t) {
  o.addEventListener(e, t, !le && Zn);
}
function S(o, e, t) {
  o.removeEventListener(e, t, !le && Zn);
}
function Ao(o, e) {
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
function er(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function Z(o, e, t, n) {
  if (o) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? o.parentNode === t && Ao(o, e) : Ao(o, e)) || n && o === t)
        return o;
      if (o === t)
        break;
    } while (o = er(o));
  }
  return null;
}
var ln = /\s+/g;
function G(o, e, t) {
  if (o && e)
    if (o.classList)
      o.classList[t ? "add" : "remove"](e);
    else {
      var n = (" " + o.className + " ").replace(ln, " ").replace(" " + e + " ", " ");
      o.className = (n + (t ? " " + e : "")).replace(ln, " ");
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
function xe(o, e) {
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
function or(o, e, t) {
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
      var h = xe(r || o), m = h && h.a, g = h && h.d;
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
function dn(o, e, t) {
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
function Le(o, e, t, n) {
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
function St(o, e) {
  for (var t = o.lastElementChild; t && (t === y.ghost || _(t, "display") === "none" || e && !Ao(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function K(o, e) {
  var t = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== y.clone && (!e || Ao(o, e)) && t++;
  return t;
}
function un(o) {
  var e = 0, t = 0, n = te();
  if (o)
    do {
      var r = xe(o), s = r.a, c = r.d;
      e += o.scrollLeft * s, t += o.scrollTop * c;
    } while (o !== n && (o = o.parentNode));
  return [e, t];
}
function Kde(o, e) {
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
function Qde(o, e) {
  if (o && e)
    for (var t in e)
      e.hasOwnProperty(t) && (o[t] = e[t]);
  return o;
}
function Vo(o, e) {
  return Math.round(o.top) === Math.round(e.top) && Math.round(o.left) === Math.round(e.left) && Math.round(o.height) === Math.round(e.height) && Math.round(o.width) === Math.round(e.width);
}
var no;
function tr(o, e) {
  return function() {
    if (!no) {
      var t = arguments, n = this;
      t.length === 1 ? o.call(n, t[0]) : o.apply(n, t), no = setTimeout(function() {
        no = void 0;
      }, e);
    }
  };
}
function Xde() {
  clearTimeout(no), no = void 0;
}
function nr(o, e, t) {
  o.scrollLeft += e, o.scrollTop += t;
}
function rr(o) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(o).cloneNode(!0) : t ? t(o).clone(!0)[0] : o.cloneNode(!0);
}
function sr(o, e, t) {
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
function Jde() {
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
              var c = xe(r, !0);
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
      o.splice(Kde(o, {
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
        var i = 0, l = a.target, u = l.fromRect, d = x(l), f = l.prevFromRect, h = l.prevToRect, m = a.rect, g = xe(l, !0);
        g && (d.top -= g.f, d.left -= g.e), l.toRect = d, l.thisAnimationDuration && Vo(f, d) && !Vo(u, d) && // Make sure animatingRect is on line between toRect & fromRect
        (m.top - d.top) / (m.left - d.left) === (u.top - d.top) / (u.left - d.left) && (i = eue(m, f, h, r.options)), Vo(d, u) || (l.prevFromRect = u, l.prevToRect = d, i || (i = r.options.animation), r.animate(l, m, d, i)), i && (s = !0, c = Math.max(c, i), clearTimeout(l.animationResetTimer), l.animationResetTimer = setTimeout(function() {
          l.animationTime = 0, l.prevFromRect = null, l.fromRect = null, l.prevToRect = null, l.thisAnimationDuration = null;
        }, i), l.thisAnimationDuration = i);
      }), clearTimeout(e), s ? e = setTimeout(function() {
        typeof n == "function" && n();
      }, c) : typeof n == "function" && n(), o = [];
    },
    animate: function(n, r, s, c) {
      if (c) {
        _(n, "transition", ""), _(n, "transform", "");
        var a = xe(this.el), i = a && a.a, l = a && a.d, u = (r.left - s.left) / (i || 1), d = (r.top - s.top) / (l || 1);
        n.animatingX = !!u, n.animatingY = !!d, _(n, "transform", "translate3d(" + u + "px," + d + "px,0)"), this.forRepaintDummy = Zde(n), _(n, "transition", "transform " + c + "ms" + (this.options.easing ? " " + this.options.easing : "")), _(n, "transform", "translate3d(0,0,0)"), typeof n.animated == "number" && clearTimeout(n.animated), n.animated = setTimeout(function() {
          _(n, "transition", ""), _(n, "transform", ""), n.animated = !1, n.animatingX = !1, n.animatingY = !1;
        }, c);
      }
    }
  };
}
function Zde(o) {
  return o.offsetWidth;
}
function eue(o, e, t, n) {
  return Math.sqrt(Math.pow(e.top - o.top, 2) + Math.pow(e.left - o.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * n.animation;
}
var Ae = [], Go = {
  initializeByDefault: !0
}, mo = {
  mount: function(e) {
    for (var t in Go)
      Go.hasOwnProperty(t) && !(t in e) && (e[t] = Go[t]);
    Ae.forEach(function(n) {
      if (n.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Ae.push(e);
  },
  pluginEvent: function(e, t, n) {
    var r = this;
    this.eventCanceled = !1, n.cancel = function() {
      r.eventCanceled = !0;
    };
    var s = e + "Global";
    Ae.forEach(function(c) {
      t[c.pluginName] && (t[c.pluginName][s] && t[c.pluginName][s](ne({
        sortable: t
      }, n)), t.options[c.pluginName] && t[c.pluginName][e] && t[c.pluginName][e](ne({
        sortable: t
      }, n)));
    });
  },
  initializePlugins: function(e, t, n, r) {
    Ae.forEach(function(a) {
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
    return Ae.forEach(function(r) {
      typeof r.eventProperties == "function" && ce(n, r.eventProperties.call(t[r.pluginName], e));
    }), n;
  },
  modifyOption: function(e, t, n) {
    var r;
    return Ae.forEach(function(s) {
      e[s.pluginName] && s.optionListeners && typeof s.optionListeners[t] == "function" && (r = s.optionListeners[t].call(e[s.pluginName], n));
    }), r;
  }
};
function oue(o) {
  var e = o.sortable, t = o.rootEl, n = o.name, r = o.targetEl, s = o.cloneEl, c = o.toEl, a = o.fromEl, i = o.oldIndex, l = o.newIndex, u = o.oldDraggableIndex, d = o.newDraggableIndex, f = o.originalEvent, h = o.putSortable, m = o.extraEventProperties;
  if (e = e || t && t[V], !!e) {
    var g, $ = e.options, b = "on" + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent && !le && !po ? g = new CustomEvent(n, {
      bubbles: !0,
      cancelable: !0
    }) : (g = document.createEvent("Event"), g.initEvent(n, !0, !0)), g.to = c || t, g.from = a || t, g.item = r || t, g.clone = s, g.oldIndex = i, g.newIndex = l, g.oldDraggableIndex = u, g.newDraggableIndex = d, g.originalEvent = f, g.pullMode = h ? h.lastPutMode : void 0;
    var w = ne(ne({}, m), mo.getEventProperties(n, e));
    for (var I in w)
      g[I] = w[I];
    t && t.dispatchEvent(g), $[b] && $[b].call(e, g);
  }
}
var tue = ["evt"], q = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, s = Gde(n, tue);
  mo.pluginEvent.bind(y)(e, t, ne({
    dragEl: p,
    parentEl: N,
    ghostEl: v,
    rootEl: A,
    nextEl: Oe,
    lastDownEl: To,
    cloneEl: k,
    cloneHidden: he,
    dragStarted: Xe,
    putSortable: z,
    activeSortable: y.active,
    originalEvent: r,
    oldIndex: De,
    oldDraggableIndex: ro,
    newIndex: Y,
    newDraggableIndex: fe,
    hideGhostForTarget: lr,
    unhideGhostForTarget: dr,
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
  oue(ne({
    putSortable: z,
    cloneEl: k,
    targetEl: p,
    rootEl: A,
    oldIndex: De,
    oldDraggableIndex: ro,
    newIndex: Y,
    newDraggableIndex: fe
  }, o));
}
var p, N, v, A, Oe, To, k, he, De, Y, ro, fe, ho, z, Ne = !1, ko = !1, Io = [], Te, J, Yo, Ko, pn, mn, Xe, ke, so, ao = !1, _o = !1, Po, L, Qo = [], ct = !1, No = [], Fo = typeof document < "u", yo = Pt, fn = po || le ? "cssFloat" : "float", nue = Fo && !Jn && !Pt && "draggable" in document.createElement("div"), ar = function() {
  if (Fo) {
    if (le)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), cr = function(e, t) {
  var n = _(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), s = Le(e, 0, t), c = Le(e, 1, t), a = s && _(s), i = c && _(c), l = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + x(s).width, u = i && parseInt(i.marginLeft) + parseInt(i.marginRight) + x(c).width;
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (s && a.float && a.float !== "none") {
    var d = a.float === "left" ? "left" : "right";
    return c && (i.clear === "both" || i.clear === d) ? "vertical" : "horizontal";
  }
  return s && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || l >= r && n[fn] === "none" || c && n[fn] === "none" && l + u > r) ? "vertical" : "horizontal";
}, rue = function(e, t, n) {
  var r = n ? e.left : e.top, s = n ? e.right : e.bottom, c = n ? e.width : e.height, a = n ? t.left : t.top, i = n ? t.right : t.bottom, l = n ? t.width : t.height;
  return r === a || s === i || r + c / 2 === a + l / 2;
}, sue = function(e, t) {
  var n;
  return Io.some(function(r) {
    var s = r[V].options.emptyInsertThreshold;
    if (!(!s || St(r))) {
      var c = x(r), a = e >= c.left - s && e <= c.right + s, i = t >= c.top - s && t <= c.bottom + s;
      if (a && i)
        return n = r;
    }
  }), n;
}, ir = function(e) {
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
  (!r || bo(r) != "object") && (r = {
    name: r
  }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, lr = function() {
  !ar && v && _(v, "display", "none");
}, dr = function() {
  !ar && v && _(v, "display", "");
};
Fo && !Jn && document.addEventListener("click", function(o) {
  if (ko)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), ko = !1, !1;
}, !0);
var Pe = function(e) {
  if (p) {
    e = e.touches ? e.touches[0] : e;
    var t = sue(e.clientX, e.clientY);
    if (t) {
      var n = {};
      for (var r in e)
        e.hasOwnProperty(r) && (n[r] = e[r]);
      n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[V]._onDragOver(n);
    }
  }
}, aue = function(e) {
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
      return cr(o, this.options);
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
    supportPointer: y.supportPointer !== !1 && "PointerEvent" in window && (!to || Pt),
    emptyInsertThreshold: 5
  };
  mo.initializePlugins(this, o, t);
  for (var n in t)
    !(n in e) && (e[n] = t[n]);
  ir(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : nue, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? O(o, "pointerdown", this._onTapStart) : (O(o, "mousedown", this._onTapStart), O(o, "touchstart", this._onTapStart)), this.nativeDraggable && (O(o, "dragover", this), O(o, "dragenter", this)), Io.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ce(this, Jde());
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
      if (fue(n), !p && !(/mousedown|pointerdown/.test(c) && e.button !== 0 || r.disabled) && !l.isContentEditable && !(!this.nativeDraggable && to && i && i.tagName.toUpperCase() === "SELECT") && (i = Z(i, r.draggable, n, !1), !(i && i.animated) && To !== i)) {
        if (De = K(i), ro = K(i, r.draggable), typeof u == "function") {
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
      if (A = s, p = n, N = p.parentNode, Oe = p.nextSibling, To = n, ho = c.group, y.dragged = p, Te = {
        target: p,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, pn = Te.clientX - l.left, mn = Te.clientY - l.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, p.style["will-change"] = "all", i = function() {
        if (q("delayEnded", r, {
          evt: e
        }), y.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !cn && r.nativeDraggable && (p.draggable = !0), r._triggerDragStart(e, t), U({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), G(p, c.chosenClass, !0);
      }, c.ignore.split(",").forEach(function(u) {
        or(p, u.trim(), Xo);
      }), O(a, "dragover", Pe), O(a, "mousemove", Pe), O(a, "touchmove", Pe), c.supportPointer ? (O(a, "pointerup", r._onDrop), !this.nativeDraggable && O(a, "pointercancel", r._onDrop)) : (O(a, "mouseup", r._onDrop), O(a, "touchend", r._onDrop), O(a, "touchcancel", r._onDrop)), cn && this.nativeDraggable && (this.options.touchStartThreshold = 4, p.draggable = !0), q("delayStart", this, {
        evt: e
      }), c.delay && (!c.delayOnTouchOnly || t) && (!this.nativeDraggable || !(po || le))) {
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
    p && Xo(p), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    S(e, "mouseup", this._disableDelayedDrag), S(e, "touchend", this._disableDelayedDrag), S(e, "touchcancel", this._disableDelayedDrag), S(e, "pointerup", this._disableDelayedDrag), S(e, "pointercancel", this._disableDelayedDrag), S(e, "mousemove", this._delayedDragTouchMoveHandler), S(e, "touchmove", this._delayedDragTouchMoveHandler), S(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? O(document, "pointermove", this._onTouchMove) : t ? O(document, "touchmove", this._onTouchMove) : O(document, "mousemove", this._onTouchMove) : (O(p, "dragend", this), O(A, "dragstart", this._onDragStart));
    try {
      document.selection ? So(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (Ne = !1, A && p) {
      q("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && O(document, "dragover", aue);
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
      this._lastX = J.clientX, this._lastY = J.clientY, lr();
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
        } while (t = er(t));
      dr();
    }
  },
  _onTouchMove: function(e) {
    if (Te) {
      var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, s = e.touches ? e.touches[0] : e, c = v && xe(v, !0), a = v && c && c.a, i = v && c && c.d, l = yo && L && un(L), u = (s.clientX - Te.clientX + r.x) / (a || 1) + (l ? l[0] - Qo[0] : 0) / (a || 1), d = (s.clientY - Te.clientY + r.y) / (i || 1) + (l ? l[1] - Qo[1] : 0) / (i || 1);
      if (!y.active && !Ne) {
        if (n && Math.max(Math.abs(s.clientX - this._lastX), Math.abs(s.clientY - this._lastY)) < n)
          return;
        this._onDragStart(e, !0);
      }
      if (v) {
        c ? (c.e += u - (Yo || 0), c.f += d - (Ko || 0)) : c = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: u,
          f: d
        };
        var f = "matrix(".concat(c.a, ",").concat(c.b, ",").concat(c.c, ",").concat(c.d, ",").concat(c.e, ",").concat(c.f, ")");
        _(v, "webkitTransform", f), _(v, "mozTransform", f), _(v, "msTransform", f), _(v, "transform", f), Yo = u, Ko = d, J = s;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!v) {
      var e = this.options.fallbackOnBody ? document.body : A, t = x(p, !0, yo, !0, e), n = this.options;
      if (yo) {
        for (L = e; _(L, "position") === "static" && _(L, "transform") === "none" && L !== document; )
          L = L.parentNode;
        L !== document.body && L !== document.documentElement ? (L === document && (L = te()), t.top += L.scrollTop, t.left += L.scrollLeft) : L = te(), Qo = un(L);
      }
      v = p.cloneNode(!0), G(v, n.ghostClass, !1), G(v, n.fallbackClass, !0), G(v, n.dragClass, !0), _(v, "transition", ""), _(v, "transform", ""), _(v, "box-sizing", "border-box"), _(v, "margin", 0), _(v, "top", t.top), _(v, "left", t.left), _(v, "width", t.width), _(v, "height", t.height), _(v, "opacity", "0.8"), _(v, "position", yo ? "absolute" : "fixed"), _(v, "zIndex", "100000"), _(v, "pointerEvents", "none"), y.ghost = v, e.appendChild(v), _(v, "transform-origin", pn / parseInt(v.style.width) * 100 + "% " + mn / parseInt(v.style.height) * 100 + "%");
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
    q("setupClone", this), y.eventCanceled || (k = rr(p), k.removeAttribute("id"), k.draggable = !1, k.style["will-change"] = "", this._hideClone(), G(k, this.options.chosenClass, !1), y.clone = k), n.cloneId = So(function() {
      q("clone", n), !y.eventCanceled && (n.options.removeCloneOnHide || A.insertBefore(k, p), n._hideClone(), U({
        sortable: n,
        name: "clone"
      }));
    }), !t && G(p, s.dragClass, !0), t ? (ko = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (S(document, "mouseup", n._onDrop), S(document, "touchend", n._onDrop), S(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", s.setData && s.setData.call(n, r, p)), O(document, "drop", n), _(p, "transform", "translateZ(0)")), Ne = !0, n._dragStartId = So(n._dragStarted.bind(n, t, e)), O(document, "selectstart", n), Xe = !0, window.getSelection().removeAllRanges(), to && _(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, n = e.target, r, s, c, a = this.options, i = a.group, l = y.active, u = ho === i, d = a.sort, f = z || l, h, m = this, g = !1;
    if (ct)
      return;
    function $(Ye, mne) {
      q(Ye, m, ne({
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
        onMove: function(Ct, fne) {
          return $o(A, t, p, r, Ct, x(Ct), e, fne);
        },
        changed: I
      }, mne));
    }
    function b() {
      $("dragOverAnimationCapture"), m.captureAnimationState(), m !== f && f.captureAnimationState();
    }
    function w(Ye) {
      return $("dragOverCompleted", {
        insertion: Ye
      }), Ye && (u ? l._hideClone() : l._showClone(m), m !== f && (G(p, z ? z.options.ghostClass : l.options.ghostClass, !1), G(p, a.ghostClass, !0)), z !== m && m !== y.active ? z = m : m === y.active && z && (z = null), f === m && (m._ignoreWhileAnimating = n), m.animateAll(function() {
        $("dragOverAnimationComplete"), m._ignoreWhileAnimating = null;
      }), m !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (n === p && !p.animated || n === t && !n.animated) && (ke = null), !a.dragoverBubble && !e.rootEl && n !== document && (p.parentNode[V]._isOutsideThisEl(e.target), !Ye && Pe(e)), !a.dragoverBubble && e.stopPropagation && e.stopPropagation(), g = !0;
    }
    function I() {
      Y = K(p), fe = K(p, a.draggable), U({
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
    if (ko = !1, l && !a.disabled && (u ? d || (c = N !== A) : z === this || (this.lastPutMode = ho.checkPull(this, l, p, e)) && i.checkPut(this, l, p, e))) {
      if (h = this._getDirection(e, n) === "vertical", r = x(p), $("dragOverValid"), y.eventCanceled)
        return g;
      if (c)
        return N = A, b(), this._hideClone(), $("revert"), y.eventCanceled || (Oe ? A.insertBefore(p, Oe) : A.appendChild(p)), w(!0);
      var D = St(t, a.draggable);
      if (!D || due(e, h, this) && !D.animated) {
        if (D === p)
          return w(!1);
        if (D && t === e.target && (n = D), n && (s = x(n)), $o(A, t, p, r, n, s, e, !!n) !== !1)
          return b(), D && D.nextSibling ? t.insertBefore(p, D.nextSibling) : t.appendChild(p), N = t, I(), w(!0);
      } else if (D && lue(e, h, this)) {
        var de = Le(t, 0, a, !0);
        if (de === p)
          return w(!1);
        if (n = de, s = x(n), $o(A, t, p, r, n, s, e, !1) !== !1)
          return b(), t.insertBefore(p, de), N = t, I(), w(!0);
      } else if (n.parentNode === t) {
        s = x(n);
        var P = 0, C, R = p.parentNode !== t, T = !rue(p.animated && p.toRect || r, n.animated && n.toRect || s, h), $e = h ? "top" : "left", ue = dn(n, "top", "top") || dn(p, "top", "top"), Ve = ue ? ue.scrollTop : void 0;
        ke !== n && (C = s[$e], ao = !1, _o = !T && a.invertSwap || R), P = uue(e, n, s, h, T ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, _o, ke === n);
        var se;
        if (P !== 0) {
          var ve = K(p);
          do
            ve -= P, se = N.children[ve];
          while (se && (_(se, "display") === "none" || se === v));
        }
        if (P === 0 || se === n)
          return w(!1);
        ke = n, so = P;
        var Ge = n.nextElementSibling, pe = !1;
        pe = P === 1;
        var fo = $o(A, t, p, r, n, s, e, pe);
        if (fo !== !1)
          return (fo === 1 || fo === -1) && (pe = fo === 1), ct = !0, setTimeout(iue, 30), b(), pe && !Ge ? t.appendChild(p) : n.parentNode.insertBefore(p, pe ? Ge : n), ue && nr(ue, 0, Ve - ue.scrollTop), N = p.parentNode, C !== void 0 && !_o && (Po = Math.abs(C - x(n)[$e])), I(), w(!0);
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
    if (Y = K(p), fe = K(p, n.draggable), q("drop", this, {
      evt: e
    }), N = p && p.parentNode, Y = K(p), fe = K(p, n.draggable), y.eventCanceled) {
      this._nulling();
      return;
    }
    Ne = !1, _o = !1, ao = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), it(this.cloneId), it(this._dragStartId), this.nativeDraggable && (S(document, "drop", this), S(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), to && _(document.body, "user-select", ""), _(p, "transform", ""), e && (Xe && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), v && v.parentNode && v.parentNode.removeChild(v), (A === N || z && z.lastPutMode !== "clone") && k && k.parentNode && k.parentNode.removeChild(k), p && (this.nativeDraggable && S(p, "dragend", this), Xo(p), p.style["will-change"] = "", Xe && !Ne && G(p, z ? z.options.ghostClass : this.options.ghostClass, !1), G(p, this.options.chosenClass, !1), U({
      sortable: this,
      name: "unchoose",
      toEl: N,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), A !== N ? (Y >= 0 && (U({
      rootEl: N,
      name: "add",
      toEl: N,
      fromEl: A,
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
      fromEl: A,
      originalEvent: e
    }), U({
      sortable: this,
      name: "sort",
      toEl: N,
      originalEvent: e
    })), z && z.save()) : Y !== De && Y >= 0 && (U({
      sortable: this,
      name: "update",
      toEl: N,
      originalEvent: e
    }), U({
      sortable: this,
      name: "sort",
      toEl: N,
      originalEvent: e
    })), y.active && ((Y == null || Y === -1) && (Y = De, fe = ro), U({
      sortable: this,
      name: "end",
      toEl: N,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    q("nulling", this), A = p = N = v = Oe = k = To = he = Te = J = Xe = Y = fe = De = ro = ke = so = z = ho = y.dragged = y.ghost = y.clone = y.active = null, No.forEach(function(e) {
      e.checked = !0;
    }), No.length = Yo = Ko = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        p && (this._onDragOver(e), cue(e));
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
      t = n[r], Z(t, c.draggable, this.el, !1) && e.push(t.getAttribute(c.dataIdAttr) || mue(t));
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
    var r = mo.modifyOption(this, e, t);
    typeof r < "u" ? n[e] = r : n[e] = t, e === "group" && ir(n);
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
      p.parentNode == A && !this.options.group.revertClone ? A.insertBefore(k, p) : Oe ? A.insertBefore(k, Oe) : A.appendChild(k), this.options.group.revertClone && this.animate(p, k), _(k, "display", ""), he = !1;
    }
  }
};
function cue(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function $o(o, e, t, n, r, s, c, a) {
  var i, l = o[V], u = l.options.onMove, d;
  return window.CustomEvent && !le && !po ? i = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (i = document.createEvent("Event"), i.initEvent("move", !0, !0)), i.to = e, i.from = o, i.dragged = t, i.draggedRect = n, i.related = r || e, i.relatedRect = s || x(e), i.willInsertAfter = a, i.originalEvent = c, o.dispatchEvent(i), u && (d = u.call(l, i, c)), d;
}
function Xo(o) {
  o.draggable = !1;
}
function iue() {
  ct = !1;
}
function lue(o, e, t) {
  var n = x(Le(t.el, 0, t.options, !0)), r = sr(t.el, t.options, v), s = 10;
  return e ? o.clientX < r.left - s || o.clientY < n.top && o.clientX < n.right : o.clientY < r.top - s || o.clientY < n.bottom && o.clientX < n.left;
}
function due(o, e, t) {
  var n = x(St(t.el, t.options.draggable)), r = sr(t.el, t.options, v), s = 10;
  return e ? o.clientX > r.right + s || o.clientY > n.bottom && o.clientX > n.left : o.clientY > r.bottom + s || o.clientX > n.right && o.clientY > n.top;
}
function uue(o, e, t, n, r, s, c, a) {
  var i = n ? o.clientY : o.clientX, l = n ? t.height : t.width, u = n ? t.top : t.left, d = n ? t.bottom : t.right, f = !1;
  if (!c) {
    if (a && Po < l * r) {
      if (!ao && (so === 1 ? i > u + l * s / 2 : i < d - l * s / 2) && (ao = !0), ao)
        f = !0;
      else if (so === 1 ? i < u + Po : i > d - Po)
        return -so;
    } else if (i > u + l * (1 - r) / 2 && i < d - l * (1 - r) / 2)
      return pue(e);
  }
  return f = f || c, f && (i < u + l * s / 2 || i > d - l * s / 2) ? i > u + l / 2 ? 1 : -1 : 0;
}
function pue(o) {
  return K(p) < K(o) ? 1 : -1;
}
function mue(o) {
  for (var e = o.tagName + o.className + o.src + o.href + o.textContent, t = e.length, n = 0; t--; )
    n += e.charCodeAt(t);
  return n.toString(36);
}
function fue(o) {
  No.length = 0;
  for (var e = o.getElementsByTagName("input"), t = e.length; t--; ) {
    var n = e[t];
    n.checked && No.push(n);
  }
}
function So(o) {
  return setTimeout(o, 0);
}
function it(o) {
  return clearTimeout(o);
}
Fo && O(document, "touchmove", function(o) {
  (y.active || Ne) && o.cancelable && o.preventDefault();
});
y.utils = {
  on: O,
  off: S,
  css: _,
  find: or,
  is: function(e, t) {
    return !!Z(e, t, e, !1);
  },
  extend: Qde,
  throttle: tr,
  closest: Z,
  toggleClass: G,
  clone: rr,
  index: K,
  nextTick: So,
  cancelNextTick: it,
  detectDirection: cr,
  getChild: Le,
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
    n.utils && (y.utils = ne(ne({}, y.utils), n.utils)), mo.mount(n);
  });
};
y.create = function(o, e) {
  return new y(o, e);
};
y.version = Yde;
var E = [], Je, lt, dt = !1, Jo, Zo, Do, Ze;
function gue() {
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
      this.sortable.nativeDraggable ? S(document, "dragover", this._handleAutoScroll) : (S(document, "pointermove", this._handleFallbackAutoScroll), S(document, "touchmove", this._handleFallbackAutoScroll), S(document, "mousemove", this._handleFallbackAutoScroll)), gn(), Oo(), Xde();
    },
    nulling: function() {
      Do = lt = Je = dt = Ze = Jo = Zo = null, E.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, n) {
      var r = this, s = (t.touches ? t.touches[0] : t).clientX, c = (t.touches ? t.touches[0] : t).clientY, a = document.elementFromPoint(s, c);
      if (Do = t, n || this.options.forceAutoScrollFallback || po || le || to) {
        et(t, this.options, a, n);
        var i = _e(a, !0);
        dt && (!Ze || s !== Jo || c !== Zo) && (Ze && gn(), Ze = setInterval(function() {
          var l = _e(document.elementFromPoint(s, c), !0);
          l !== i && (i = l, Oo()), et(t, r.options, l, n);
        }, 10), Jo = s, Zo = c);
      } else {
        if (!this.options.bubbleScroll || _e(a, !0) === te()) {
          Oo();
          return;
        }
        et(t, this.options, _e(a, !1), !1);
      }
    }
  }, ce(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Oo() {
  E.forEach(function(o) {
    clearInterval(o.pid);
  }), E = [];
}
function gn() {
  clearInterval(Ze);
}
var et = tr(function(o, e, t, n) {
  if (e.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, s = (o.touches ? o.touches[0] : o).clientY, c = e.scrollSensitivity, a = e.scrollSpeed, i = te(), l = !1, u;
    lt !== t && (lt = t, Oo(), Je = e.scroll, u = e.scrollFn, Je === !0 && (Je = _e(t, !0)));
    var d = 0, f = Je;
    do {
      var h = f, m = x(h), g = m.top, $ = m.bottom, b = m.left, w = m.right, I = m.width, D = m.height, de = void 0, P = void 0, C = h.scrollWidth, R = h.scrollHeight, T = _(h), $e = h.scrollLeft, ue = h.scrollTop;
      h === i ? (de = I < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), P = D < R && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (de = I < C && (T.overflowX === "auto" || T.overflowX === "scroll"), P = D < R && (T.overflowY === "auto" || T.overflowY === "scroll"));
      var Ve = de && (Math.abs(w - r) <= c && $e + I < C) - (Math.abs(b - r) <= c && !!$e), se = P && (Math.abs($ - s) <= c && ue + D < R) - (Math.abs(g - s) <= c && !!ue);
      if (!E[d])
        for (var ve = 0; ve <= d; ve++)
          E[ve] || (E[ve] = {});
      (E[d].vx != Ve || E[d].vy != se || E[d].el !== h) && (E[d].el = h, E[d].vx = Ve, E[d].vy = se, clearInterval(E[d].pid), (Ve != 0 || se != 0) && (l = !0, E[d].pid = setInterval(function() {
        n && this.layer === 0 && y.active._onTouchMove(Do);
        var Ge = E[this.layer].vy ? E[this.layer].vy * a : 0, pe = E[this.layer].vx ? E[this.layer].vx * a : 0;
        typeof u == "function" && u.call(y.dragged.parentNode[V], pe, Ge, o, Do, E[this.layer].el) !== "continue" || nr(E[this.layer].el, pe, Ge);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (e.bubbleScroll && f !== i && (f = _e(f, !1)));
    dt = l;
  }
}, 30), ur = function(e) {
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
function Ot() {
}
Ot.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable;
    this.sortable.captureAnimationState(), n && n.captureAnimationState();
    var r = Le(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
  },
  drop: ur
};
ce(Ot, {
  pluginName: "revertOnSpill"
});
function wt() {
}
wt.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable, r = n || this.sortable;
    r.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), r.animateAll();
  },
  drop: ur
};
ce(wt, {
  pluginName: "removeOnSpill"
});
y.mount(new gue());
y.mount(wt, Ot);
function rbe(o = {}) {
  const e = X(!1);
  let t = "";
  const n = X({}), r = qe(), s = X(["fixed", "top_fixed", "right_fixed", "bottom_fixed", "left_fixed"]), c = _n(() => r.mode == "decorate" ? r : o.data);
  yn(
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
    vne(() => {
      if (r.mode == "decorate") {
        const g = document.getElementById("componentList"), $ = y.create(g, {
          draggable: ".draggable-element",
          animation: 200,
          onEnd: (b) => {
            const w = r.value[b.oldIndex];
            r.value.splice(b.oldIndex, 1), r.value.splice(b.newIndex, 0, w), oe(() => {
              $.sort(Vle(r.value.length).map((I) => I.toString())), r.postMessage(b.newIndex, r.value[b.newIndex]);
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
  }, f = X(!1);
  return Kn(() => {
    f.value = !1;
  }), Qn(() => {
    f.value = !0, r.global.bottomTabBar.isShow = !1;
  }), {
    scrollV: X(),
    data: c,
    componentsScrollBool: n,
    showCopyright: e,
    placeholderEvent: d,
    refresh: u,
    isShowPlaceHolder: i,
    getComponentClass: a,
    onPageScroll: () => {
      Xn((g) => {
        if (t && !f.value)
          for (const $ in t)
            g.scrollTop <= 0 ? n.value[$] = -1 : g.scrollTop > t[$] ? n.value[$] = 1 : n.value[$] = 2;
      });
    },
    onMounted: l
  };
}
const pr = "Personal settings", mr = "Switch language", fr = "Version", gr = "Log out", hue = {
  personalSettings: pr,
  switchLang: mr,
  version: fr,
  logout: gr
}, _ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hue,
  logout: gr,
  personalSettings: pr,
  switchLang: mr,
  version: fr
}, Symbol.toStringTag, { value: "Module" })), hr = "文章详情", _r = "摘要", yr = "正在加载", yue = {
  detail: hr,
  abstract: _r,
  loadingText: yr
}, $ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abstract: _r,
  default: yue,
  detail: hr,
  loadingText: yr
}, Symbol.toStringTag, { value: "Module" })), $r = "文章列表", vr = "~ 暂无数据 ~", br = "全部", Tr = "-- 到底了 --", Pr = "请输入搜索关键词", vue = {
  list: $r,
  noData: vr,
  all: br,
  end: Tr,
  searchPlaceholder: Pr
}, bue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: br,
  default: vue,
  end: Tr,
  list: $r,
  noData: vr,
  searchPlaceholder: Pr
}, Symbol.toStringTag, { value: "Module" })), Sr = "绑定", Or = "输入手机号动态码绑定", wr = "绑定中", Cr = "一键绑定", Mr = "手机号快捷登录", Tue = {
  bind: Sr,
  bindMobileTip: Or,
  binding: wr,
  weixinUserAuth: Cr,
  mobileQuickLogin: Mr
}, Pue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: Sr,
  bindMobileTip: Or,
  binding: wr,
  default: Tue,
  mobileQuickLogin: Mr,
  weixinUserAuth: Cr
}, Symbol.toStringTag, { value: "Module" })), jr = "快捷登录/注册", Ar = "登录", kr = "其他方式登录", Ir = "账号密码登录", Nr = "手机号登录", Dr = "其他手机号登录", Er = "账号被锁定", Sue = {
  quickLoginOrLogout: jr,
  login: Ar,
  otherLogin: kr,
  accountLogin: Ir,
  mobileLogin: Nr,
  otherMobileLogin: Dr,
  memberLock: Er
}, Oue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Ir,
  default: Sue,
  login: Ar,
  memberLock: Er,
  mobileLogin: Nr,
  otherLogin: kr,
  otherMobileLogin: Dr,
  quickLoginOrLogout: jr
}, Symbol.toStringTag, { value: "Module" })), xr = "登录中", Rr = "请输入账号", zr = "请输入密码", Fr = "忘记密码", Lr = "还没有账号", Hr = "去注册", Br = "登录代表您同意", Ur = "请先阅读并同意协议", Wr = "请输入手机号", qr = "快捷登录", Vr = "账号密码登录", Gr = "输入账号密码登录", Yr = "商家未开启账号密码登录", Kr = "手机号登录", Qr = "输入手机号验证码登录", Xr = "商家未开启手机号登录", wue = {
  logining: xr,
  usernamePlaceholder: Rr,
  passwordPlaceholder: zr,
  resetpwd: Fr,
  noAccount: Lr,
  toRegister: Hr,
  agreeTips: Br,
  isAgreeTips: Ur,
  mobilePlaceholder: Wr,
  oneClicklogin: qr,
  accountLogin: Vr,
  accountLoginTip: Gr,
  accountLoginError: Yr,
  mobileLogin: Kr,
  mobileLoginTip: Qr,
  mobileLoginError: Xr
}, Cue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Vr,
  accountLoginError: Yr,
  accountLoginTip: Gr,
  agreeTips: Br,
  default: wue,
  isAgreeTips: Ur,
  logining: xr,
  mobileLogin: Kr,
  mobileLoginError: Xr,
  mobileLoginTip: Qr,
  mobilePlaceholder: Wr,
  noAccount: Lr,
  oneClicklogin: qr,
  passwordPlaceholder: zr,
  resetpwd: Fr,
  toRegister: Hr,
  usernamePlaceholder: Rr
}, Symbol.toStringTag, { value: "Module" })), Jr = "注册中", Zr = "输入账号密码注册", es = "输入手机号验证码注册", os = "请输入账号", ts = "账号不能是纯数字", ns = "请输入密码", rs = "请再次确认密码", ss = "两次输入的密码不一致", as = "忘记密码", cs = "已有账号", is = "去登录", ls = "注册代表您同意", ds = "请先阅读并同意协议", us = "账号注册", ps = "手机号注册", ms = "请输入手机号", Mue = {
  registering: Jr,
  usernameRegisterTip: Zr,
  mobileRegisterTip: es,
  usernamePlaceholder: os,
  usernameTips: ts,
  passwordPlaceholder: ns,
  confirmPasswordPlaceholder: rs,
  confirmPasswordError: ss,
  resetpwd: as,
  haveAccount: cs,
  toLogin: is,
  registerAgreeTips: ls,
  isAgreeTips: ds,
  usernameRegister: us,
  mobileRegister: ps,
  mobilePlaceholder: ms
}, jue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: ss,
  confirmPasswordPlaceholder: rs,
  default: Mue,
  haveAccount: cs,
  isAgreeTips: ds,
  mobilePlaceholder: ms,
  mobileRegister: ps,
  mobileRegisterTip: es,
  passwordPlaceholder: ns,
  registerAgreeTips: ls,
  registering: Jr,
  resetpwd: as,
  toLogin: is,
  usernamePlaceholder: os,
  usernameRegister: us,
  usernameRegisterTip: Zr,
  usernameTips: ts
}, Symbol.toStringTag, { value: "Module" })), fs = "找回密码", gs = "输入手机号找回密码", hs = "请输入密码", _s = "请再次确认密码", ys = "两次输入的密码不一致", Aue = {
  findPassword: fs,
  findPasswordTip: gs,
  passwordPlaceholder: hs,
  confirmPasswordPlaceholder: _s,
  confirmPasswordError: ys
}, kue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: ys,
  confirmPasswordPlaceholder: _s,
  default: Aue,
  findPassword: fs,
  findPasswordTip: gs,
  passwordPlaceholder: hs
}, Symbol.toStringTag, { value: "Module" })), $s = "实付金额", vs = "帮", bs = "付款", Ts = "帮付订单信息", Ps = "共", Ss = "种商品", Os = "该订单已完成", ws = "该订单已关闭", Cs = "找朋友帮忙付", Iue = {
  payMoney: $s,
  help: vs,
  pay: bs,
  helpPayInfo: Ts,
  common: Ps,
  goods: Ss,
  finish: Os,
  close: ws,
  payGenerously: Cs
}, Nue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: ws,
  common: Ps,
  default: Iue,
  finish: Os,
  goods: Ss,
  help: vs,
  helpPayInfo: Ts,
  pay: bs,
  payGenerously: Cs,
  payMoney: $s
}, Symbol.toStringTag, { value: "Module" })), Ms = "实付金额", js = "帮付订单信息", As = "共", ks = "种商品", Is = "该订单已完成", Ns = "该订单已关闭", Ds = "找朋友帮忙付", Due = {
  payMoney: Ms,
  friendPayOrderInfo: js,
  common: As,
  goods: ks,
  finish: Is,
  close: Ns,
  friendPay: Ds
}, Eue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: Ns,
  common: As,
  default: Due,
  finish: Is,
  friendPay: Ds,
  friendPayOrderInfo: js,
  goods: ks,
  payMoney: Ms
}, Symbol.toStringTag, { value: "Module" })), Es = "开发环境配置", xs = "API请求地址", Rs = "图片服务器地址", zs = "站点ID（VITE_SITE_ID）", Fs = "请输入站点ID", Ls = "请输入数字", Hs = "最大不能超过", xue = {
  developTitle: Es,
  baseUrl: xs,
  imgUrl: Rs,
  siteId: zs,
  siteIdPlaceholder: Fs,
  pleaseEnterNumber: Ls,
  maximumCannotExceed: Hs
}, Rue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  baseUrl: xs,
  default: xue,
  developTitle: Es,
  imgUrl: Rs,
  maximumCannotExceed: Hs,
  pleaseEnterNumber: Ls,
  siteId: zs,
  siteIdPlaceholder: Fs
}, Symbol.toStringTag, { value: "Module" })), Bs = "支付宝收款码", Us = "微信收款码", Ws = "添加银行卡", qs = "添加微信收款码", Vs = "添加支付宝收款码", Gs = "尾号", Ys = "银行卡", zue = {
  alipayAccountNo: Bs,
  wechatCode: Us,
  addBankCard: Ws,
  addWechatCode: qs,
  addAlipayAccount: Vs,
  endNumber: Gs,
  bankCard: Ys
}, Fue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: Vs,
  addBankCard: Ws,
  addWechatCode: qs,
  alipayAccountNo: Bs,
  bankCard: Ys,
  default: zue,
  endNumber: Gs,
  wechatCode: Us
}, Symbol.toStringTag, { value: "Module" })), Ks = "添加会员账户", Qs = "编辑会员账户", Xs = "添加银行卡", Js = "请添加持卡人本人的银行卡", Zs = "编辑银行卡", ea = "请编辑持卡人本人的银行卡", oa = "添加支付宝收款码", ta = "请添加已实名的支付宝账号", na = "编辑支付宝收款码", ra = "请编辑已实名的支付宝账号", sa = "添加微信收款码", aa = "请添加已实名的微信账号", ca = "编辑微信收款码", ia = "请编辑已实名的微信账号", la = "持卡人姓名", da = "请输入持卡人姓名", ua = "银行名称", pa = "请输入银行名称", ma = "银行卡号", fa = "请输入银行卡号", ga = "真实姓名", ha = "请输入真实姓名", _a = "支付宝账号", ya = "请输入支付宝账号", $a = "微信账号", va = "请输入微信账号", ba = "请上传支付宝收款码", Ta = "请上传微信收款码", Pa = "确定要删除该账号吗？", Lue = {
  addAccountTitle: Ks,
  editAccountTitle: Qs,
  addBankCard: Xs,
  addBankCardTips: Js,
  editBankCard: Zs,
  editBankCardTips: ea,
  addAlipayAccount: oa,
  addAlipayAccountTips: ta,
  editAlipayAccount: na,
  editAlipayAccountTips: ra,
  addWechatCodeAccount: sa,
  addWechatCodeAccountTips: aa,
  editWechatCodeAccount: ca,
  editWechatCodeAccountTips: ia,
  bankRealname: la,
  bankRealnamePlaceholder: da,
  bankName: ua,
  bankNamePlaceholder: pa,
  bankAccountNo: ma,
  bankAccountNoPlaceholder: fa,
  alipayRealname: ga,
  alipayRealnamePlaceholder: ha,
  alipayAccountNo: _a,
  alipayAccountNoPlaceholder: ya,
  wechatCodeAccountNo: $a,
  wechatCodeAccountNoPlaceholder: va,
  alipayAccountImgPlaceholder: ba,
  wechatCodeAccountImgPlaceholder: Ta,
  deleteConfirm: Pa
}, Hue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAccountTitle: Ks,
  addAlipayAccount: oa,
  addAlipayAccountTips: ta,
  addBankCard: Xs,
  addBankCardTips: Js,
  addWechatCodeAccount: sa,
  addWechatCodeAccountTips: aa,
  alipayAccountImgPlaceholder: ba,
  alipayAccountNo: _a,
  alipayAccountNoPlaceholder: ya,
  alipayRealname: ga,
  alipayRealnamePlaceholder: ha,
  bankAccountNo: ma,
  bankAccountNoPlaceholder: fa,
  bankName: ua,
  bankNamePlaceholder: pa,
  bankRealname: la,
  bankRealnamePlaceholder: da,
  default: Lue,
  deleteConfirm: Pa,
  editAccountTitle: Qs,
  editAlipayAccount: na,
  editAlipayAccountTips: ra,
  editBankCard: Zs,
  editBankCardTips: ea,
  editWechatCodeAccount: ca,
  editWechatCodeAccountTips: ia,
  wechatCodeAccountImgPlaceholder: Ta,
  wechatCodeAccountNo: $a,
  wechatCodeAccountNoPlaceholder: va
}, Symbol.toStringTag, { value: "Module" })), Sa = "快递地址", Oa = "同城配送地址", wa = "新建收货地址", Bue = {
  address: Sa,
  locationAddress: Oa,
  createAddress: wa,
  default: "默认"
}, Uue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Sa,
  createAddress: wa,
  default: Bue,
  locationAddress: Oa
}, Symbol.toStringTag, { value: "Module" })), Ca = "收货人", Ma = "请输入收货人姓名", ja = "手机号码", Aa = "请输入手机号码", ka = "选择地区", Ia = "请选择地区", Na = "详细地址", Da = "请填写详细地址", Ea = "设为默认地址", xa = "请选择地址", Wue = {
  name: Ca,
  namePlaceholder: Ma,
  mobile: ja,
  mobilePlaceholder: Aa,
  selectArea: ka,
  selectAreaPlaceholder: Ia,
  address: Na,
  addressPlaceholder: Da,
  defaultAddress: Ea,
  selectAddressPlaceholder: xa
}, que = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Na,
  addressPlaceholder: Da,
  default: Wue,
  defaultAddress: Ea,
  mobile: ja,
  mobilePlaceholder: Aa,
  name: Ca,
  namePlaceholder: Ma,
  selectAddressPlaceholder: xa,
  selectArea: ka,
  selectAreaPlaceholder: Ia
}, Symbol.toStringTag, { value: "Module" })), Ra = "立即提现", za = "余额明细", Fa = "提现到", La = "请选择提现方式", Ha = "微信默认钱包", Ba = "提现金额", Ua = "可提现余额", Wa = "全部提现", qa = "最小提现金额为", Va = "手续费为", Ga = "提现记录", Ya = "提现至微信零钱", Ka = "提现至微信零钱", Qa = "提现至支付宝", Xa = "请先添加支付宝账号", Ja = "提现至银行卡", Za = "请先添加银行卡", ec = "提现至微信", oc = "请先添加微信号", tc = "支付宝账号", nc = "微信号", rc = "储蓄卡", sc = "异常操作", ac = "没有可用的提现方式", cc = "请输入提现金额", ic = "提现金额格式错误", lc = "提现金额超出可提现金额", dc = "提现金额小于最低提现金额", uc = "更换", pc = "提现设置未开启", mc = "添加", Vue = {
  cashOutNow: Ra,
  balanceDetail: za,
  cashOutTo: Fa,
  cashOutTypePlaceholder: La,
  wechatpay: Ha,
  cashOutMoneyTip: Ba,
  money: Ua,
  allTx: Wa,
  minWithdrawal: qa,
  commissionTo: Va,
  cashOutList: Ga,
  cashOutToWechat: Ya,
  cashOutToWechatTips: Ka,
  cashOutToAlipay: Qa,
  cashOutToAlipayTips: Xa,
  cashOutToBank: Ja,
  cashOutToBankTips: Za,
  cashOutToWechatCode: ec,
  cashOutToWechatCodeTips: oc,
  alipayAccountNo: tc,
  wechatCodeAccountNo: nc,
  debitCard: rc,
  abnormalOperation: sc,
  noAvailableCashOutType: ac,
  applyMoneyPlaceholder: cc,
  moneyformatError: ic,
  applyMoneyExceed: lc,
  applyMoneyBelow: dc,
  replace: uc,
  isOpenApply: pc,
  toAdd: mc
}, Gue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOperation: sc,
  alipayAccountNo: tc,
  allTx: Wa,
  applyMoneyBelow: dc,
  applyMoneyExceed: lc,
  applyMoneyPlaceholder: cc,
  balanceDetail: za,
  cashOutList: Ga,
  cashOutMoneyTip: Ba,
  cashOutNow: Ra,
  cashOutTo: Fa,
  cashOutToAlipay: Qa,
  cashOutToAlipayTips: Xa,
  cashOutToBank: Ja,
  cashOutToBankTips: Za,
  cashOutToWechat: Ya,
  cashOutToWechatCode: ec,
  cashOutToWechatCodeTips: oc,
  cashOutToWechatTips: Ka,
  cashOutTypePlaceholder: La,
  commissionTo: Va,
  debitCard: rc,
  default: Vue,
  isOpenApply: pc,
  minWithdrawal: qa,
  money: Ua,
  moneyformatError: ic,
  noAvailableCashOutType: ac,
  replace: uc,
  toAdd: mc,
  wechatCodeAccountNo: nc,
  wechatpay: Ha
}, Symbol.toStringTag, { value: "Module" })), fc = "我的余额", gc = "充值", hc = "提现", _c = "余额明细", yc = "账户余额 (元)", $c = "余额 (元)", vc = "可提现余额 (元)", bc = "可用余额", Tc = "元", Pc = "充值记录", Yue = {
  balanceInfo: fc,
  recharge: gc,
  cashOut: hc,
  balanceDetail: _c,
  accountBalance: yc,
  balance: $c,
  money: vc,
  availableBalance: bc,
  yuan: Tc,
  rechargeRecord: Pc
}, Kue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: yc,
  availableBalance: bc,
  balance: $c,
  balanceDetail: _c,
  balanceInfo: fc,
  cashOut: hc,
  default: Yue,
  money: vc,
  recharge: gc,
  rechargeRecord: Pc,
  yuan: Tc
}, Symbol.toStringTag, { value: "Module" })), Sc = "申请时间", Oc = "审核中，请耐心等待...", wc = "转账中，请耐心等待...", Cc = "已转账，请及时查收", Mc = "提现已取消", jc = "余额记录", Ac = "佣金记录", kc = "暂无提现记录", Ic = "暂无佣金记录", Nc = "提现方式：", Que = {
  applyTime: Sc,
  toBeReviewed: Oc,
  toBeTransfer: wc,
  transfer: Cc,
  cancelApply: Mc,
  balanceDetail: jc,
  commissionDetail: Ac,
  emptyTip: kc,
  commissemptyTip: Ic,
  rechargeType: Nc
}, Xue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: Sc,
  balanceDetail: jc,
  cancelApply: Mc,
  commissemptyTip: Ic,
  commissionDetail: Ac,
  default: Que,
  emptyTip: kc,
  rechargeType: Nc,
  toBeReviewed: Oc,
  toBeTransfer: wc,
  transfer: Cc
}, Symbol.toStringTag, { value: "Module" })), Dc = "当前状态", Ec = "提现单号", xc = "手续费", Rc = "申请时间", zc = "审核时间", Fc = "银行名称", Lc = "收款账号", Hc = "拒绝理由", Bc = "转账方式", Uc = "转账时间", Wc = "付款凭证", qc = "转账补充说明", Vc = "真实姓名", Gc = "持卡人姓名", Yc = "收款码", Kc = "收款方信息", Qc = "转账信息", Xc = "收款方昵称", Jc = "收款方头像", Zc = "转账单号", ei = "提现", oi = "取消提现", Jue = {
  statusName: Dc,
  cashOutNo: Ec,
  serviceMoney: xc,
  createTime: Rc,
  auditTime: zc,
  transferBank: Fc,
  transferAccount: Lc,
  refuseReason: Hc,
  transferTypeName: Bc,
  transferTime: Uc,
  transferVoucher: Wc,
  transferRemark: qc,
  realname: Vc,
  bankRealname: Gc,
  transferCode: Yc,
  proceedsInfo: Kc,
  transferInfo: Qc,
  transferNickname: Xc,
  transferImg: Jc,
  transferNo: Zc,
  cashOutNow: ei,
  cashOutCancel: oi
}, Zue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: zc,
  bankRealname: Gc,
  cashOutCancel: oi,
  cashOutNo: Ec,
  cashOutNow: ei,
  createTime: Rc,
  default: Jue,
  proceedsInfo: Kc,
  realname: Vc,
  refuseReason: Hc,
  serviceMoney: xc,
  statusName: Dc,
  transferAccount: Lc,
  transferBank: Fc,
  transferCode: Yc,
  transferImg: Jc,
  transferInfo: Qc,
  transferNickname: Xc,
  transferNo: Zc,
  transferRemark: qc,
  transferTime: Uc,
  transferTypeName: Bc,
  transferVoucher: Wc
}, Symbol.toStringTag, { value: "Module" })), ti = "充值", ni = "提现", ri = "提现", si = "佣金明细", ai = "当前佣金（元）", ci = "累计佣金（元）", ii = "提现中佣金（元）", li = "可用佣金", di = "元", ui = "我的佣金", epe = {
  recharge: ti,
  cashOut: ni,
  transferMoney: ri,
  commissionDetail: si,
  accountCommission: ai,
  commission: ci,
  money: ii,
  availableCommission: li,
  yuan: di,
  commissionInfo: ui
}, ope = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountCommission: ai,
  availableCommission: li,
  cashOut: ni,
  commission: ci,
  commissionDetail: si,
  commissionInfo: ui,
  default: epe,
  money: ii,
  recharge: ti,
  transferMoney: ri,
  yuan: di
}, Symbol.toStringTag, { value: "Module" })), pi = "余额明细", mi = "佣金明细", fi = "暂无余额明细", gi = "暂无提现明细", hi = "暂无佣金明细", tpe = {
  balanceDetail: pi,
  commissionDetail: mi,
  balanceEmptyTip: fi,
  moneyEmptyTip: gi,
  commissionEmptyTip: hi
}, npe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  balanceDetail: pi,
  balanceEmptyTip: fi,
  commissionDetail: mi,
  commissionEmptyTip: hi,
  default: tpe,
  moneyEmptyTip: gi
}, Symbol.toStringTag, { value: "Module" })), _i = "收货人", yi = "请输入收货人姓名", $i = "手机号码", vi = "请输入手机号码", bi = "收货地址", Ti = "选择地址", Pi = "请选择地址", Si = "楼号门牌", Oi = "详细地址如 1单元101", wi = "请填写门牌号", Ci = "设为默认地址", Mi = "修改", rpe = {
  name: _i,
  namePlaceholder: yi,
  mobile: $i,
  mobilePlaceholder: vi,
  deliveryAddress: bi,
  selectAddress: Ti,
  selectAddressPlaceholder: Pi,
  address: Si,
  addressPlaceholder: Oi,
  addressError: wi,
  defaultAddress: Ci,
  update: Mi
}, spe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Si,
  addressError: wi,
  addressPlaceholder: Oi,
  default: rpe,
  defaultAddress: Ci,
  deliveryAddress: bi,
  mobile: $i,
  mobilePlaceholder: vi,
  name: _i,
  namePlaceholder: yi,
  selectAddress: Ti,
  selectAddressPlaceholder: Pi,
  update: Mi
}, Symbol.toStringTag, { value: "Module" })), ji = "昵称", Ai = "性别", ki = "手机号", Ii = "生日", Ni = "未知", Di = "头像", Ei = "更换头像", xi = "修改昵称", Ri = "男", zi = "女", ape = {
  nickname: ji,
  sex: Ai,
  mobile: ki,
  birthday: Ii,
  unknown: Ni,
  headimg: Di,
  updateHeadimg: Ei,
  updateNickname: xi,
  man: Ri,
  woman: zi
}, cpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  birthday: Ii,
  default: ape,
  headimg: Di,
  man: Ri,
  mobile: ki,
  nickname: ji,
  sex: Ai,
  unknown: Ni,
  updateHeadimg: Ei,
  updateNickname: xi,
  woman: zi
}, Symbol.toStringTag, { value: "Module" })), Fi = "充值记录", Li = "暂无充值记录", ipe = {
  rechargeRecord: Fi,
  emptyTip: Li
}, lpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ipe,
  emptyTip: Li,
  rechargeRecord: Fi
}, Symbol.toStringTag, { value: "Module" })), Hi = "订单编号", Bi = "创建时间", dpe = {
  orderNo: Hi,
  createTime: Bi
}, upe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: Bi,
  default: dpe,
  orderNo: Hi
}, Symbol.toStringTag, { value: "Module" })), Ui = "充值", Wi = "提现", qi = "余额明细", Vi = "账户余额（元）", Gi = "余额（元）", Yi = "可提现余额（元）", Ki = "可用余额", Qi = "元", ppe = {
  recharge: Ui,
  cashOut: Wi,
  balanceDetail: qi,
  accountBalance: Vi,
  balance: Gi,
  money: Yi,
  availableBalance: Ki,
  yuan: Qi
}, mpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: Vi,
  availableBalance: Ki,
  balance: Gi,
  balanceDetail: qi,
  cashOut: Wi,
  default: ppe,
  money: Yi,
  recharge: Ui,
  yuan: Qi
}, Symbol.toStringTag, { value: "Module" })), Xi = "个人设置", Ji = "切换语言", Zi = "版本号", el = "退出登录", fpe = {
  personalSettings: Xi,
  switchLang: Ji,
  version: Zi,
  logout: el
}, gpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fpe,
  logout: el,
  personalSettings: Xi,
  switchLang: Ji,
  version: Zi
}, Symbol.toStringTag, { value: "Module" })), ol = "文章详情", tl = "摘要", nl = "正在加载", hpe = {
  detail: ol,
  abstract: tl,
  loadingText: nl
}, _pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abstract: tl,
  default: hpe,
  detail: ol,
  loadingText: nl
}, Symbol.toStringTag, { value: "Module" })), rl = "文章列表", sl = "~ 暂无数据 ~", al = "全部", cl = "-- 到底了 --", il = "请输入搜索关键词", ype = {
  list: rl,
  noData: sl,
  all: al,
  end: cl,
  searchPlaceholder: il
}, $pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: al,
  default: ype,
  end: cl,
  list: rl,
  noData: sl,
  searchPlaceholder: il
}, Symbol.toStringTag, { value: "Module" })), vpe = {}, bpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vpe
}, Symbol.toStringTag, { value: "Module" })), ll = "发起助力", dl = "最高省", Tpe = {
  fqzl: ll,
  zgs: dl
}, Ppe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tpe,
  fqzl: ll,
  zgs: dl
}, Symbol.toStringTag, { value: "Module" })), ul = "订单号", pl = "实付款", ml = "关闭订单", fl = "确认收货", gl = "去支付", hl = "详情", _l = "支付流水号", yl = "创建时间", $l = "配送方式", vl = "支付方式", bl = "支付时间", Tl = "商品金额", Pl = "配送费用", Sl = "实付金额", Ol = "评价", wl = "查看评价", Cl = "首页", Ml = "优惠金额", jl = "查看物流", Al = "复制", kl = "详细信息", Il = "的帮付", Nl = "用户备注", Spe = {
  orderNo: ul,
  actualPayment: pl,
  orderClose: ml,
  orderFinish: fl,
  topay: gl,
  orderDetail: hl,
  orderTradeNo: _l,
  createTime: yl,
  deliveryType: $l,
  payTypeName: vl,
  payTime: bl,
  goodsMoney: Tl,
  deliveryMoney: Pl,
  orderMoney: Sl,
  evaluate: Ol,
  selectedEvaluate: wl,
  index: Cl,
  discountMoney: Ml,
  logisticsTracking: jl,
  copy: Al,
  detailedInformation: kl,
  helpPay: Il,
  memberRemark: Nl
}, Ope = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: pl,
  copy: Al,
  createTime: yl,
  default: Spe,
  deliveryMoney: Pl,
  deliveryType: $l,
  detailedInformation: kl,
  discountMoney: Ml,
  evaluate: Ol,
  goodsMoney: Tl,
  helpPay: Il,
  index: Cl,
  logisticsTracking: jl,
  memberRemark: Nl,
  orderClose: ml,
  orderDetail: hl,
  orderFinish: fl,
  orderMoney: Sl,
  orderNo: ul,
  orderTradeNo: _l,
  payTime: bl,
  payTypeName: vl,
  selectedEvaluate: wl,
  topay: gl
}, Symbol.toStringTag, { value: "Module" })), Dl = "暂无收货地址，请先创建地址", El = "新增收货地址", xl = "选择地址", Rl = "评价", zl = "元", Fl = "待支付", Ll = "剩余时间", Hl = "含物流运输服务", Bl = "查看评价", Ul = "关闭订单", Wl = "确认收货", ql = "支付", Vl = "配送方式", Gl = "下单时间", wpe = {
  emptyAddress: Dl,
  addAddress: El,
  selectAddress: xl,
  evaluate: Rl,
  money: zl,
  pendingPayment: Fl,
  pendingPaymentTips: Ll,
  service: Hl,
  selectedEvaluate: Bl,
  orderClose: Ul,
  orderFinish: Wl,
  topay: ql,
  deliveryType: Vl,
  createTime: Gl
}, Cpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: El,
  createTime: Gl,
  default: wpe,
  deliveryType: Vl,
  emptyAddress: Dl,
  evaluate: Rl,
  money: zl,
  orderClose: Ul,
  orderFinish: Wl,
  pendingPayment: Fl,
  pendingPaymentTips: Ll,
  selectAddress: xl,
  selectedEvaluate: Bl,
  service: Hl,
  topay: ql
}, Symbol.toStringTag, { value: "Module" })), Yl = "订单号", Kl = "实付款", Ql = "关闭订单", Xl = "确认收货", Jl = "支付", Zl = "详情", ed = "评价", od = "暂无订单", td = "暂无收货地址，请先创建地址", nd = "换一换", rd = "活动说明", sd = "该商品起购", ad = "件", cd = "该商品每人限购", id = "该商品单次限购", ld = "商品库存不足", dd = "件，超过按", ud = "购买", pd = "限购", md = "一键购买", fd = "我知道了", Mpe = {
  orderNo: Yl,
  actualPayment: Kl,
  orderClose: Ql,
  orderFinish: Xl,
  topay: Jl,
  orderDetail: Zl,
  evaluate: ed,
  orderListempty: od,
  emptyAddress: td,
  changeIt: nd,
  activityInstructions: rd,
  goodsLimitThree: sd,
  piece: ad,
  goodsLimitTwo: cd,
  goodsLimitOne: id,
  stockNotEnough: ld,
  limitPlaceholderTwo: dd,
  limitPlaceholderThree: ud,
  limitPlaceholderOne: pd,
  buyWithOneClick: md,
  know: fd
}, jpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: rd,
  actualPayment: Kl,
  buyWithOneClick: md,
  changeIt: nd,
  default: Mpe,
  emptyAddress: td,
  evaluate: ed,
  goodsLimitOne: id,
  goodsLimitThree: sd,
  goodsLimitTwo: cd,
  know: fd,
  limitPlaceholderOne: pd,
  limitPlaceholderThree: ud,
  limitPlaceholderTwo: dd,
  orderClose: Ql,
  orderDetail: Zl,
  orderFinish: Xl,
  orderListempty: od,
  orderNo: Yl,
  piece: ad,
  stockNotEnough: ld,
  topay: Jl
}, Symbol.toStringTag, { value: "Module" })), gd = "退货详情", hd = "极速退款成功", _d = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", yd = "退款方式", $d = "退款金额", vd = "退款原因", bd = "拒绝原因", Td = "退款编号", Pd = "申请时间", Sd = "退款说明", Od = "协商记录", wd = "查看", Cd = "取消退款", Md = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", jd = "首页", Ape = {
  refundDetail: gd,
  fastRefundSuccessful: hd,
  refundInfo: _d,
  refundType: yd,
  refundMoney: $d,
  refundCause: vd,
  reasonRefusal: bd,
  refundNo: Td,
  createTime: Pd,
  createExplain: Sd,
  record: Od,
  check: wd,
  refundApply: Cd,
  cancelRefundContent: Md,
  index: jd
}, kpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: Md,
  check: wd,
  createExplain: Sd,
  createTime: Pd,
  default: Ape,
  fastRefundSuccessful: hd,
  index: jd,
  reasonRefusal: bd,
  record: Od,
  refundApply: Cd,
  refundCause: vd,
  refundDetail: gd,
  refundInfo: _d,
  refundMoney: $d,
  refundNo: Td,
  refundType: yd
}, Symbol.toStringTag, { value: "Module" })), Ad = "退款编号", kd = "退款金额", Id = "取消退款", Nd = "退款进度", Dd = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", Ipe = {
  refundNo: Ad,
  refundMoney: kd,
  refundApply: Id,
  refund: Nd,
  cancelRefundContent: Dd
}, Npe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: Dd,
  default: Ipe,
  refund: Nd,
  refundApply: Id,
  refundMoney: kd,
  refundNo: Ad
}, Symbol.toStringTag, { value: "Module" })), Ed = "去抢购", xd = "没有更多内容啦~", Rd = "已售", zd = "订单号", Fd = "实付款", Ld = "详情", Dpe = {
  reserveBtn: Ed,
  noHomeAddress: xd,
  soldOut: Rd,
  orderNo: zd,
  actualPayment: Fd,
  orderDetail: Ld
}, Epe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: Fd,
  default: Dpe,
  noHomeAddress: xd,
  orderDetail: Ld,
  orderNo: zd,
  reserveBtn: Ed,
  soldOut: Rd
}, Symbol.toStringTag, { value: "Module" })), Hd = "登录中", Bd = "请输入账号", Ud = "请输入密码", Wd = "忘记密码", qd = "还没有账号", Vd = "去注册", Gd = "登录代表您同意", Yd = "请先阅读并同意协议", Kd = "请输入手机号", Qd = "快捷登录", Xd = "账号密码登录", Jd = "输入账号密码登录", Zd = "商家未开启账号密码登录", eu = "手机号登录", ou = "输入手机号验证码登录", tu = "商家未开启手机号登录", xpe = {
  logining: Hd,
  usernamePlaceholder: Bd,
  passwordPlaceholder: Ud,
  resetpwd: Wd,
  noAccount: qd,
  toRegister: Vd,
  agreeTips: Gd,
  isAgreeTips: Yd,
  mobilePlaceholder: Kd,
  oneClicklogin: Qd,
  accountLogin: Xd,
  accountLoginTip: Jd,
  accountLoginError: Zd,
  mobileLogin: eu,
  mobileLoginTip: ou,
  mobileLoginError: tu
}, Rpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Xd,
  accountLoginError: Zd,
  accountLoginTip: Jd,
  agreeTips: Gd,
  default: xpe,
  isAgreeTips: Yd,
  logining: Hd,
  mobileLogin: eu,
  mobileLoginError: tu,
  mobileLoginTip: ou,
  mobilePlaceholder: Kd,
  noAccount: qd,
  oneClicklogin: Qd,
  passwordPlaceholder: Ud,
  resetpwd: Wd,
  toRegister: Vd,
  usernamePlaceholder: Bd
}, Symbol.toStringTag, { value: "Module" })), nu = "注册中", ru = "输入账号密码注册", su = "输入手机号验证码注册", au = "请输入账号", cu = "账号不能是纯数字", iu = "请输入密码", lu = "请再次确认密码", du = "两次输入的密码不一致", uu = "忘记密码", pu = "已有账号", mu = "去登录", fu = "注册代表您同意", gu = "请先阅读并同意协议", hu = "账号注册", _u = "手机号注册", yu = "请输入手机号", zpe = {
  registering: nu,
  usernameRegisterTip: ru,
  mobileRegisterTip: su,
  usernamePlaceholder: au,
  usernameTips: cu,
  passwordPlaceholder: iu,
  confirmPasswordPlaceholder: lu,
  confirmPasswordError: du,
  resetpwd: uu,
  haveAccount: pu,
  toLogin: mu,
  registerAgreeTips: fu,
  isAgreeTips: gu,
  usernameRegister: hu,
  mobileRegister: _u,
  mobilePlaceholder: yu
}, Fpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: du,
  confirmPasswordPlaceholder: lu,
  default: zpe,
  haveAccount: pu,
  isAgreeTips: gu,
  mobilePlaceholder: yu,
  mobileRegister: _u,
  mobileRegisterTip: su,
  passwordPlaceholder: iu,
  registerAgreeTips: fu,
  registering: nu,
  resetpwd: uu,
  toLogin: mu,
  usernamePlaceholder: au,
  usernameRegister: hu,
  usernameRegisterTip: ru,
  usernameTips: cu
}, Symbol.toStringTag, { value: "Module" })), $u = "新任务", vu = "筛选", bu = "刷新", Tu = "重置", Pu = "收入", Su = "服务类型", Ou = "服务距离", wu = "确定", Cu = "我要抢单", Lpe = {
  newJob: $u,
  sort: vu,
  calcation: bu,
  reset: Tu,
  money: Pu,
  serviceType: Su,
  serviceDistance: Ou,
  confrim: wu,
  getOrder: Cu
}, Hpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: bu,
  confrim: wu,
  default: Lpe,
  getOrder: Cu,
  money: Pu,
  newJob: $u,
  reset: Tu,
  serviceDistance: Ou,
  serviceType: Su,
  sort: vu
}, Symbol.toStringTag, { value: "Module" })), Mu = "申请时间", ju = "审核中，请耐心等待...", Au = "转账中，请耐心等待...", ku = "已转账，请及时查收", Iu = "提现已取消", Nu = "余额记录", Du = "佣金记录", Eu = "暂无提现记录", xu = "暂无佣金记录", Ru = "提现方式：", Bpe = {
  applyTime: Mu,
  toBeReviewed: ju,
  toBeTransfer: Au,
  transfer: ku,
  cancelApply: Iu,
  balanceDetail: Nu,
  commissionDetail: Du,
  emptyTip: Eu,
  commissemptyTip: xu,
  rechargeType: Ru
}, Upe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: Mu,
  balanceDetail: Nu,
  cancelApply: Iu,
  commissemptyTip: xu,
  commissionDetail: Du,
  default: Bpe,
  emptyTip: Eu,
  rechargeType: Ru,
  toBeReviewed: ju,
  toBeTransfer: Au,
  transfer: ku
}, Symbol.toStringTag, { value: "Module" })), zu = "当前状态", Fu = "提现单号", Lu = "手续费", Hu = "申请时间", Bu = "审核时间", Uu = "银行名称", Wu = "收款账号", qu = "拒绝理由", Vu = "转账方式", Gu = "转账时间", Yu = "付款凭证", Ku = "转账补充说明", Qu = "真实姓名", Xu = "持卡人姓名", Ju = "收款码", Zu = "收款方信息", ep = "转账信息", op = "收款方昵称", tp = "收款方头像", np = "转账单号", rp = "提现", sp = "取消提现", Wpe = {
  statusName: zu,
  cashOutNo: Fu,
  serviceMoney: Lu,
  createTime: Hu,
  auditTime: Bu,
  transferBank: Uu,
  transferAccount: Wu,
  refuseReason: qu,
  transferTypeName: Vu,
  transferTime: Gu,
  transferVoucher: Yu,
  transferRemark: Ku,
  realname: Qu,
  bankRealname: Xu,
  transferCode: Ju,
  proceedsInfo: Zu,
  transferInfo: ep,
  transferNickname: op,
  transferImg: tp,
  transferNo: np,
  cashOutNow: rp,
  cashOutCancel: sp
}, qpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: Bu,
  bankRealname: Xu,
  cashOutCancel: sp,
  cashOutNo: Fu,
  cashOutNow: rp,
  createTime: Hu,
  default: Wpe,
  proceedsInfo: Zu,
  realname: Qu,
  refuseReason: qu,
  serviceMoney: Lu,
  statusName: zu,
  transferAccount: Wu,
  transferBank: Uu,
  transferCode: Ju,
  transferImg: tp,
  transferInfo: ep,
  transferNickname: op,
  transferNo: np,
  transferRemark: Ku,
  transferTime: Gu,
  transferTypeName: Vu,
  transferVoucher: Yu
}, Symbol.toStringTag, { value: "Module" })), Vpe = {}, Gpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vpe
}, Symbol.toStringTag, { value: "Module" })), ap = "反馈标题", cp = "反馈内容", ip = "上传图片（选填）", lp = "提交反馈", dp = "请输入反馈标题", up = "请详细描述您遇到的问题或建议", pp = "反馈内容请至少输入10个字符", mp = "反馈提交成功，感谢您的建议", fp = "反馈提交失败", gp = "网络错误，请稍后重试", Ype = {
  feedbackTitle: ap,
  feedbackContent: cp,
  uploadImage: ip,
  submitFeedback: lp,
  pleaseInputFeedbackTitle: dp,
  pleaseDescribeIssue: up,
  feedbackContentMinLength: pp,
  feedbackSubmitSuccess: mp,
  feedbackSubmitFail: fp,
  networkError: gp
}, Kpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ype,
  feedbackContent: cp,
  feedbackContentMinLength: pp,
  feedbackSubmitFail: fp,
  feedbackSubmitSuccess: mp,
  feedbackTitle: ap,
  networkError: gp,
  pleaseDescribeIssue: up,
  pleaseInputFeedbackTitle: dp,
  submitFeedback: lp,
  uploadImage: ip
}, Symbol.toStringTag, { value: "Module" })), hp = "帮助详情", _p = "加载中...", yp = "浏览次数", $p = "更新时间", vp = "暂无数据", bp = "缺少帮助文档ID", Tp = "网络错误，请稍后重试", Qpe = {
  helpDetail: hp,
  loading: _p,
  viewsCount: yp,
  updateTime: $p,
  noData: vp,
  missingId: bp,
  networkError: Tp
}, Xpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qpe,
  helpDetail: hp,
  loading: _p,
  missingId: bp,
  networkError: Tp,
  noData: vp,
  updateTime: $p,
  viewsCount: yp
}, Symbol.toStringTag, { value: "Module" })), Pp = "帮助中心", Sp = "操作答疑", Op = "操作步骤", wp = "管理平台", Cp = "佣金分成与支付", Mp = "常见问题", jp = "问题分类", Ap = "联系客服", kp = "没有更多内容啦~", Jpe = {
  helpCenter: Pp,
  operationFAQ: Sp,
  operationSteps: Op,
  managementPlatform: wp,
  commissionPayment: Cp,
  commonProblems: Mp,
  problemCategories: jp,
  contactService: Ap,
  noMoreContent: kp
}, Zpe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  commissionPayment: Cp,
  commonProblems: Mp,
  contactService: Ap,
  default: Jpe,
  helpCenter: Pp,
  managementPlatform: wp,
  noMoreContent: kp,
  operationFAQ: Sp,
  operationSteps: Op,
  problemCategories: jp
}, Symbol.toStringTag, { value: "Module" })), Ip = "机构名称", Np = "今日收入(元)", Dp = "我的账户", Ep = "今日完成单量(单)", xp = "订单统计", Rp = "违规申诉", zp = "我的评价", Fp = "所属机构", Lp = "机构资料", Hp = "评价管理", Bp = "机构入驻", Up = "服务管理", Wp = "联系客服", qp = "消息通知", Vp = "帮助中心", Gp = "设置", Yp = "排班管理", Kp = "请假", Qp = "服务分析", Xp = "服务数据", Jp = "设置", Zp = "工作必备", em = "客户服务", om = "个人资料", tm = "区域排名", eme = {
  storeName: Ip,
  todayMoney: Np,
  myAccount: Dp,
  orderFinshNumber: Ep,
  orderNumber: xp,
  ViolationAppeal: Rp,
  MyReview: zp,
  store: Fp,
  storeInfo: Lp,
  evaluteSet: Hp,
  registerStore: Bp,
  servicesSet: Up,
  callConcat: Wp,
  messageCenter: qp,
  helpCenter: Vp,
  setInfo: Gp,
  workTime: Yp,
  levalWork: Kp,
  ServiceAnalysis: Qp,
  servicesData: Xp,
  set: Jp,
  workTools: Zp,
  kefuServices: em,
  memberInfo: om,
  areaData: tm
}, ome = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MyReview: zp,
  ServiceAnalysis: Qp,
  ViolationAppeal: Rp,
  areaData: tm,
  callConcat: Wp,
  default: eme,
  evaluteSet: Hp,
  helpCenter: Vp,
  kefuServices: em,
  levalWork: Kp,
  memberInfo: om,
  messageCenter: qp,
  myAccount: Dp,
  orderFinshNumber: Ep,
  orderNumber: xp,
  registerStore: Bp,
  servicesData: Xp,
  servicesSet: Up,
  set: Jp,
  setInfo: Gp,
  store: Fp,
  storeInfo: Lp,
  storeName: Ip,
  todayMoney: Np,
  workTime: Yp,
  workTools: Zp
}, Symbol.toStringTag, { value: "Module" })), nm = "机构资料", rm = "基本信息", sm = "机构名称", am = "机构人数", cm = "联系方式", im = "修改", lm = "负责人", dm = "联系电话", um = "地址信息", pm = "地图加载中...", mm = "认证状态", fm = "营业执照", gm = "身份认证", hm = "地址认证", _m = "已完成", ym = "未完成", $m = "编辑联系方式", vm = "取消", bm = "确定", Tm = "修改成功", Pm = "修改失败", Sm = "获取数据失败", Om = "请输入负责人姓名", wm = "请输入联系电话", Cm = "负责人不能为空", Mm = "负责人姓名长度在2-20个字符之间", jm = "联系电话不能为空", Am = "请输入正确的手机号码", tme = {
  pageTitle: nm,
  basicInfo: rm,
  storeName: sm,
  storeStaff: am,
  contactInfo: cm,
  edit: im,
  manager: lm,
  contactPhone: dm,
  addressInfo: um,
  mapLoading: pm,
  authenticationStatus: mm,
  businessLicense: fm,
  idAuthentication: gm,
  addressAuthentication: hm,
  completed: _m,
  uncompleted: ym,
  editContactTitle: $m,
  cancel: vm,
  confirm: bm,
  editSuccess: Tm,
  editFailed: Pm,
  fetchFailed: Sm,
  inputManagerPlaceholder: Om,
  inputPhonePlaceholder: wm,
  managerRequired: Cm,
  managerLength: Mm,
  phoneRequired: jm,
  phoneFormat: Am
}, nme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addressAuthentication: hm,
  addressInfo: um,
  authenticationStatus: mm,
  basicInfo: rm,
  businessLicense: fm,
  cancel: vm,
  completed: _m,
  confirm: bm,
  contactInfo: cm,
  contactPhone: dm,
  default: tme,
  edit: im,
  editContactTitle: $m,
  editFailed: Pm,
  editSuccess: Tm,
  fetchFailed: Sm,
  idAuthentication: gm,
  inputManagerPlaceholder: Om,
  inputPhonePlaceholder: wm,
  manager: lm,
  managerLength: Mm,
  managerRequired: Cm,
  mapLoading: pm,
  pageTitle: nm,
  phoneFormat: Am,
  phoneRequired: jm,
  storeName: sm,
  storeStaff: am,
  uncompleted: ym
}, Symbol.toStringTag, { value: "Module" })), km = "切换机构", Im = "筛选", Nm = "排序", Dm = "营业中", Em = "已停业", xm = "当前机构", Rm = "待分配", zm = "超时", Fm = "售后", Lm = "今日单量", Hm = "月收入", Bm = "确认选择", Um = "暂无机构数据", Wm = "机构切换成功", qm = "机构切换失败", Vm = "获取机构列表失败", Gm = "机构名称示意文字内容展示", Ym = "山西省太原市小店区平阳路时代广场宇信感应产业大厦8层814", Km = "05:00-22:00", rme = {
  pageTitle: km,
  filter: Im,
  sort: Nm,
  open: Dm,
  closed: Em,
  defaultStore: xm,
  waitService: Rm,
  timeout: zm,
  afterSale: Fm,
  todayOrders: Lm,
  monthIncome: Hm,
  confirmSelection: Bm,
  noStoreData: Um,
  storeSwitchSuccess: Wm,
  storeSwitchFailed: qm,
  getStoreListFailed: Vm,
  storeNamePlaceholder: Gm,
  addressPlaceholder: Ym,
  businessHoursPlaceholder: Km
}, sme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addressPlaceholder: Ym,
  afterSale: Fm,
  businessHoursPlaceholder: Km,
  closed: Em,
  confirmSelection: Bm,
  default: rme,
  defaultStore: xm,
  filter: Im,
  getStoreListFailed: Vm,
  monthIncome: Hm,
  noStoreData: Um,
  open: Dm,
  pageTitle: km,
  sort: Nm,
  storeNamePlaceholder: Gm,
  storeSwitchFailed: qm,
  storeSwitchSuccess: Wm,
  timeout: zm,
  todayOrders: Lm,
  waitService: Rm
}, Symbol.toStringTag, { value: "Module" })), Qm = "订单", Xm = "下单", Jm = "接单", Zm = "开始", ef = "完成", of = "已支付", tf = "未支付", nf = "查看退款", rf = "申请退款", sf = "去支付", af = "查看", cf = "服务人员", lf = "待派单", df = "联系电话", uf = "服务码", pf = "注:服务人员上门时需提供", mf = "订单编号", ff = "交易流水号", gf = "创建时间", hf = "上门时间", _f = "买家留言", yf = "支付方式", $f = "支付时间", vf = "项目金额", bf = "实付", Tf = "首页", Pf = "刷新", Sf = "客服", Of = "收藏", wf = "没有更多内容啦~", Cf = "的帮付", Mf = "导航", jf = "优惠金额", Af = "上门费用", kf = "单", If = "订单未开始服务", Nf = "服务人员已确定出发", Df = "服务人员已打卡拍照", Ef = "查看打卡照片", xf = "服务时长总计", Rf = "预", zf = "您有", Ff = "个订单已超时", Lf = "个订单即将超时,请尽快处理!", Hf = "服务项目", Bf = "备注：", Uf = "订单收入", Wf = "附加服务", qf = "服务费", Vf = "附加服务费用", Gf = "服务费是师傅完成服务后的收入", Yf = "附加服务费用是指新增附加服务的收入", Kf = "其他信息", Qf = "复制", Xf = "未获取到订单信息", Jf = "打卡照片", Zf = "加载失败", eg = "天", og = "地图打开成功", tg = "打开地图失败，请检查是否安装地图应用", ng = "提示", rg = "您确定要取消该订单吗？", sg = "取消成功", ag = "取消失败", cg = "您确定要删除该订单吗？", ig = "删除成功", lg = "删除失败", dg = "待服务", ug = "服务中", pg = "已完成", mg = "异常订单", fg = "服务费是师傅完成服务后的收入", ame = {
  order: Qm,
  placeOrder: Xm,
  takeOrders: Jm,
  start: Zm,
  finish: ef,
  havePaid: of,
  notPaid: tf,
  viewRefund: nf,
  applyRefund: rf,
  goToPay: sf,
  show: af,
  servicePersonal: cf,
  orderToBeSent: lf,
  contactNumber: df,
  serviceCode: uf,
  explain: pf,
  onOrder: mf,
  transactionNumber: ff,
  createTime: gf,
  reserveServiceTime: hf,
  remark: _f,
  modePayment: yf,
  payTime: $f,
  goodsMoney: vf,
  realMoney: bf,
  index: Tf,
  refresh: Pf,
  service: Sf,
  collect: Of,
  nothingMore: wf,
  helpPay: Cf,
  Navigation: Mf,
  couponMoney: jf,
  doorMonrey: Af,
  orderUnit: kf,
  orderNotStarted: If,
  servicePersonDeparted: Nf,
  servicePersonCheckedIn: Df,
  viewCheckInPhotos: Ef,
  totalServiceDuration: xf,
  pre: Rf,
  youHave: zf,
  ordersOverdue: Ff,
  ordersAboutToOverdue: Lf,
  serviceItems: Hf,
  remarkPrefix: Bf,
  orderIncome: Uf,
  additionalService: Wf,
  serviceFee: qf,
  additionalServiceFee: Vf,
  serviceFeeDesc: Gf,
  additionalServiceFeeDesc: Yf,
  otherInformation: Kf,
  copy: Qf,
  noOrderInfo: Xf,
  checkInPhotos: Jf,
  loadFailed: Zf,
  day: eg,
  mapOpenedSuccessfully: og,
  mapOpenFailed: tg,
  prompt: ng,
  confirmCancelOrder: rg,
  cancelSuccess: sg,
  cancelFailed: ag,
  confirmDeleteOrder: cg,
  deleteSuccess: ig,
  deleteFailed: lg,
  waitingService: dg,
  inService: ug,
  completed: pg,
  abnormalOrder: mg,
  serviceFeeDescription: fg
}, cme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: Mf,
  abnormalOrder: mg,
  additionalService: Wf,
  additionalServiceFee: Vf,
  additionalServiceFeeDesc: Yf,
  applyRefund: rf,
  cancelFailed: ag,
  cancelSuccess: sg,
  checkInPhotos: Jf,
  collect: Of,
  completed: pg,
  confirmCancelOrder: rg,
  confirmDeleteOrder: cg,
  contactNumber: df,
  copy: Qf,
  couponMoney: jf,
  createTime: gf,
  day: eg,
  default: ame,
  deleteFailed: lg,
  deleteSuccess: ig,
  doorMonrey: Af,
  explain: pf,
  finish: ef,
  goToPay: sf,
  goodsMoney: vf,
  havePaid: of,
  helpPay: Cf,
  inService: ug,
  index: Tf,
  loadFailed: Zf,
  mapOpenFailed: tg,
  mapOpenedSuccessfully: og,
  modePayment: yf,
  noOrderInfo: Xf,
  notPaid: tf,
  nothingMore: wf,
  onOrder: mf,
  order: Qm,
  orderIncome: Uf,
  orderNotStarted: If,
  orderToBeSent: lf,
  orderUnit: kf,
  ordersAboutToOverdue: Lf,
  ordersOverdue: Ff,
  otherInformation: Kf,
  payTime: $f,
  placeOrder: Xm,
  pre: Rf,
  prompt: ng,
  realMoney: bf,
  refresh: Pf,
  remark: _f,
  remarkPrefix: Bf,
  reserveServiceTime: hf,
  service: Sf,
  serviceCode: uf,
  serviceFee: qf,
  serviceFeeDesc: Gf,
  serviceFeeDescription: fg,
  serviceItems: Hf,
  servicePersonCheckedIn: Df,
  servicePersonDeparted: Nf,
  servicePersonal: cf,
  show: af,
  start: Zm,
  takeOrders: Jm,
  totalServiceDuration: xf,
  transactionNumber: ff,
  viewCheckInPhotos: Ef,
  viewRefund: nf,
  waitingService: dg,
  youHave: zf
}, Symbol.toStringTag, { value: "Module" })), gg = "订单", hg = "下单", _g = "接单", yg = "开始", $g = "完成", vg = "已支付", bg = "未支付", Tg = "查看退款", Pg = "申请退款", Sg = "去支付", Og = "查看", wg = "服务人员", Cg = "待派单", Mg = "联系电话", jg = "服务码", Ag = "注:服务人员上门时需提供", kg = "订单编号", Ig = "交易流水号", Ng = "创建时间", Dg = "上门时间", Eg = "买家留言", xg = "支付方式", Rg = "支付时间", zg = "项目金额", Fg = "实付", Lg = "首页", Hg = "刷新", Bg = "客服", Ug = "收藏", Wg = "没有更多内容啦~", qg = "的帮付", Vg = "导航", Gg = "优惠金额", Yg = "上门费用", Kg = "单", Qg = "订单未开始服务", Xg = "服务人员已确定出发", Jg = "服务人员已打卡拍照", Zg = "查看打卡照片", eh = "服务时长总计", oh = "预", th = "您有", nh = "个订单已超时", rh = "个订单即将超时,请尽快处理!", sh = "服务项目", ah = "备注：", ch = "订单收入", ih = "附加服务", lh = "服务费", dh = "附加服务费用", uh = "服务费是师傅完成服务后的收入", ph = "附加服务费用是指新增附加服务的收入", mh = "其他信息", fh = "复制", gh = "未获取到订单信息", hh = "打卡照片", _h = "加载失败", yh = "天", $h = "地图打开成功", vh = "打开地图失败，请检查是否安装地图应用", bh = "提示", Th = "您确定要取消该订单吗？", Ph = "取消成功", Sh = "取消失败", Oh = "您确定要删除该订单吗？", wh = "删除成功", Ch = "删除失败", Mh = "待服务", jh = "服务中", Ah = "已完成", kh = "异常订单", Ih = "服务费是师傅完成服务后的收入", ime = {
  order: gg,
  placeOrder: hg,
  takeOrders: _g,
  start: yg,
  finish: $g,
  havePaid: vg,
  notPaid: bg,
  viewRefund: Tg,
  applyRefund: Pg,
  goToPay: Sg,
  show: Og,
  servicePersonal: wg,
  orderToBeSent: Cg,
  contactNumber: Mg,
  serviceCode: jg,
  explain: Ag,
  onOrder: kg,
  transactionNumber: Ig,
  createTime: Ng,
  reserveServiceTime: Dg,
  remark: Eg,
  modePayment: xg,
  payTime: Rg,
  goodsMoney: zg,
  realMoney: Fg,
  index: Lg,
  refresh: Hg,
  service: Bg,
  collect: Ug,
  nothingMore: Wg,
  helpPay: qg,
  Navigation: Vg,
  couponMoney: Gg,
  doorMonrey: Yg,
  orderUnit: Kg,
  orderNotStarted: Qg,
  servicePersonDeparted: Xg,
  servicePersonCheckedIn: Jg,
  viewCheckInPhotos: Zg,
  totalServiceDuration: eh,
  pre: oh,
  youHave: th,
  ordersOverdue: nh,
  ordersAboutToOverdue: rh,
  serviceItems: sh,
  remarkPrefix: ah,
  orderIncome: ch,
  additionalService: ih,
  serviceFee: lh,
  additionalServiceFee: dh,
  serviceFeeDesc: uh,
  additionalServiceFeeDesc: ph,
  otherInformation: mh,
  copy: fh,
  noOrderInfo: gh,
  checkInPhotos: hh,
  loadFailed: _h,
  day: yh,
  mapOpenedSuccessfully: $h,
  mapOpenFailed: vh,
  prompt: bh,
  confirmCancelOrder: Th,
  cancelSuccess: Ph,
  cancelFailed: Sh,
  confirmDeleteOrder: Oh,
  deleteSuccess: wh,
  deleteFailed: Ch,
  waitingService: Mh,
  inService: jh,
  completed: Ah,
  abnormalOrder: kh,
  serviceFeeDescription: Ih
}, lme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: Vg,
  abnormalOrder: kh,
  additionalService: ih,
  additionalServiceFee: dh,
  additionalServiceFeeDesc: ph,
  applyRefund: Pg,
  cancelFailed: Sh,
  cancelSuccess: Ph,
  checkInPhotos: hh,
  collect: Ug,
  completed: Ah,
  confirmCancelOrder: Th,
  confirmDeleteOrder: Oh,
  contactNumber: Mg,
  copy: fh,
  couponMoney: Gg,
  createTime: Ng,
  day: yh,
  default: ime,
  deleteFailed: Ch,
  deleteSuccess: wh,
  doorMonrey: Yg,
  explain: Ag,
  finish: $g,
  goToPay: Sg,
  goodsMoney: zg,
  havePaid: vg,
  helpPay: qg,
  inService: jh,
  index: Lg,
  loadFailed: _h,
  mapOpenFailed: vh,
  mapOpenedSuccessfully: $h,
  modePayment: xg,
  noOrderInfo: gh,
  notPaid: bg,
  nothingMore: Wg,
  onOrder: kg,
  order: gg,
  orderIncome: ch,
  orderNotStarted: Qg,
  orderToBeSent: Cg,
  orderUnit: Kg,
  ordersAboutToOverdue: rh,
  ordersOverdue: nh,
  otherInformation: mh,
  payTime: Rg,
  placeOrder: hg,
  pre: oh,
  prompt: bh,
  realMoney: Fg,
  refresh: Hg,
  remark: Eg,
  remarkPrefix: ah,
  reserveServiceTime: Dg,
  service: Bg,
  serviceCode: jg,
  serviceFee: lh,
  serviceFeeDesc: uh,
  serviceFeeDescription: Ih,
  serviceItems: sh,
  servicePersonCheckedIn: Jg,
  servicePersonDeparted: Xg,
  servicePersonal: wg,
  show: Og,
  start: yg,
  takeOrders: _g,
  totalServiceDuration: eh,
  transactionNumber: Ig,
  viewCheckInPhotos: Zg,
  viewRefund: Tg,
  waitingService: Mh,
  youHave: th
}, Symbol.toStringTag, { value: "Module" })), Nh = "机构首页", Dh = "请输入搜索关键词", Eh = "筛选", xh = "家政保洁", Rh = "保姆月嫂", zh = "家电维修", Fh = "家电清洗", Lh = "管道疏通", Hh = "从业", Bh = "年", Uh = "服务", Wh = "单", qh = "工作中", Vh = "休息中", Gh = "去派单", Yh = "排班管理", Kh = "打电话", Qh = "任务", Xh = "机构", Jh = "技工", Zh = "我的", e_ = "师傅派单", dme = {
  pageTitle: Nh,
  searchPlaceholder: Dh,
  filter: Eh,
  housekeeping: xh,
  nanny: Rh,
  applianceRepair: zh,
  applianceCleaning: Fh,
  pipeDredging: Lh,
  yearsOfExperience: Hh,
  years: Bh,
  serviceOrders: Uh,
  orders: Wh,
  working: qh,
  resting: Vh,
  assignOrder: Gh,
  scheduleManagement: Yh,
  makeCall: Kh,
  tasks: Qh,
  store: Xh,
  technicians: Jh,
  my: Zh,
  pageHeaderTitle: e_
}, ume = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applianceCleaning: Fh,
  applianceRepair: zh,
  assignOrder: Gh,
  default: dme,
  filter: Eh,
  housekeeping: xh,
  makeCall: Kh,
  my: Zh,
  nanny: Rh,
  orders: Wh,
  pageHeaderTitle: e_,
  pageTitle: Nh,
  pipeDredging: Lh,
  resting: Vh,
  scheduleManagement: Yh,
  searchPlaceholder: Dh,
  serviceOrders: Uh,
  store: Xh,
  tasks: Qh,
  technicians: Jh,
  working: qh,
  years: Bh,
  yearsOfExperience: Hh
}, Symbol.toStringTag, { value: "Module" })), o_ = "订单", t_ = "下单", n_ = "接单", r_ = "开始", s_ = "完成", a_ = "已支付", c_ = "未支付", i_ = "查看退款", l_ = "申请退款", d_ = "去支付", u_ = "查看", p_ = "服务人员", m_ = "待派单", f_ = "联系电话", g_ = "服务码", h_ = "注:服务人员上门时需提供", __ = "订单编号", y_ = "交易流水号", $_ = "创建时间", v_ = "上门时间", b_ = "买家留言", T_ = "支付方式", P_ = "支付时间", S_ = "项目金额", O_ = "实付", w_ = "首页", C_ = "刷新", M_ = "客服", j_ = "收藏", A_ = "没有更多内容啦~", k_ = "的帮付", I_ = "导航", N_ = "优惠金额", D_ = "上门费用", E_ = "单", x_ = "订单未开始服务", R_ = "服务人员已确定出发", z_ = "服务人员已打卡拍照", F_ = "查看打卡照片", L_ = "服务时长总计", H_ = "预", B_ = "您有", U_ = "个订单已超时", W_ = "个订单即将超时,请尽快处理!", q_ = "服务项目", V_ = "备注：", G_ = "订单收入", Y_ = "附加服务", K_ = "服务费", Q_ = "附加服务费用", X_ = "师傅完成服务后的预估收入", J_ = "附加服务费用是指新增附加服务的收入", Z_ = "其他信息", ey = "复制", oy = "未获取到订单信息", ty = "打卡照片", ny = "加载失败", ry = "天", sy = "地图打开成功", ay = "打开地图失败，请检查是否安装地图应用", cy = "提示", iy = "您确定要取消该订单吗？", ly = "取消成功", dy = "取消失败", uy = "您确定要删除该订单吗？", py = "删除成功", my = "删除失败", fy = "待服务", gy = "服务中", hy = "已完成", _y = "异常订单", yy = "服务费是师傅完成服务后的收入", pme = {
  order: o_,
  placeOrder: t_,
  takeOrders: n_,
  start: r_,
  finish: s_,
  havePaid: a_,
  notPaid: c_,
  viewRefund: i_,
  applyRefund: l_,
  goToPay: d_,
  show: u_,
  servicePersonal: p_,
  orderToBeSent: m_,
  contactNumber: f_,
  serviceCode: g_,
  explain: h_,
  onOrder: __,
  transactionNumber: y_,
  createTime: $_,
  reserveServiceTime: v_,
  remark: b_,
  modePayment: T_,
  payTime: P_,
  goodsMoney: S_,
  realMoney: O_,
  index: w_,
  refresh: C_,
  service: M_,
  collect: j_,
  nothingMore: A_,
  helpPay: k_,
  Navigation: I_,
  couponMoney: N_,
  doorMonrey: D_,
  orderUnit: E_,
  orderNotStarted: x_,
  servicePersonDeparted: R_,
  servicePersonCheckedIn: z_,
  viewCheckInPhotos: F_,
  totalServiceDuration: L_,
  pre: H_,
  youHave: B_,
  ordersOverdue: U_,
  ordersAboutToOverdue: W_,
  serviceItems: q_,
  remarkPrefix: V_,
  orderIncome: G_,
  additionalService: Y_,
  serviceFee: K_,
  additionalServiceFee: Q_,
  serviceFeeDesc: X_,
  additionalServiceFeeDesc: J_,
  otherInformation: Z_,
  copy: ey,
  noOrderInfo: oy,
  checkInPhotos: ty,
  loadFailed: ny,
  day: ry,
  mapOpenedSuccessfully: sy,
  mapOpenFailed: ay,
  prompt: cy,
  confirmCancelOrder: iy,
  cancelSuccess: ly,
  cancelFailed: dy,
  confirmDeleteOrder: uy,
  deleteSuccess: py,
  deleteFailed: my,
  waitingService: fy,
  inService: gy,
  completed: hy,
  abnormalOrder: _y,
  serviceFeeDescription: yy
}, mme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: I_,
  abnormalOrder: _y,
  additionalService: Y_,
  additionalServiceFee: Q_,
  additionalServiceFeeDesc: J_,
  applyRefund: l_,
  cancelFailed: dy,
  cancelSuccess: ly,
  checkInPhotos: ty,
  collect: j_,
  completed: hy,
  confirmCancelOrder: iy,
  confirmDeleteOrder: uy,
  contactNumber: f_,
  copy: ey,
  couponMoney: N_,
  createTime: $_,
  day: ry,
  default: pme,
  deleteFailed: my,
  deleteSuccess: py,
  doorMonrey: D_,
  explain: h_,
  finish: s_,
  goToPay: d_,
  goodsMoney: S_,
  havePaid: a_,
  helpPay: k_,
  inService: gy,
  index: w_,
  loadFailed: ny,
  mapOpenFailed: ay,
  mapOpenedSuccessfully: sy,
  modePayment: T_,
  noOrderInfo: oy,
  notPaid: c_,
  nothingMore: A_,
  onOrder: __,
  order: o_,
  orderIncome: G_,
  orderNotStarted: x_,
  orderToBeSent: m_,
  orderUnit: E_,
  ordersAboutToOverdue: W_,
  ordersOverdue: U_,
  otherInformation: Z_,
  payTime: P_,
  placeOrder: t_,
  pre: H_,
  prompt: cy,
  realMoney: O_,
  refresh: C_,
  remark: b_,
  remarkPrefix: V_,
  reserveServiceTime: v_,
  service: M_,
  serviceCode: g_,
  serviceFee: K_,
  serviceFeeDesc: X_,
  serviceFeeDescription: yy,
  serviceItems: q_,
  servicePersonCheckedIn: z_,
  servicePersonDeparted: R_,
  servicePersonal: p_,
  show: u_,
  start: r_,
  takeOrders: n_,
  totalServiceDuration: L_,
  transactionNumber: y_,
  viewCheckInPhotos: F_,
  viewRefund: i_,
  waitingService: fy,
  youHave: B_
}, Symbol.toStringTag, { value: "Module" })), $y = "新任务", vy = "筛选", by = "刷新", Ty = "重置", Py = "收入", Sy = "服务类型", Oy = "服务距离", wy = "确定", Cy = "我要抢单", fme = {
  newJob: $y,
  sort: vy,
  calcation: by,
  reset: Ty,
  money: Py,
  serviceType: Sy,
  serviceDistance: Oy,
  confrim: wy,
  getOrder: Cy
}, gme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: by,
  confrim: wy,
  default: fme,
  getOrder: Cy,
  money: Py,
  newJob: $y,
  reset: Ty,
  serviceDistance: Oy,
  serviceType: Sy,
  sort: vy
}, Symbol.toStringTag, { value: "Module" })), My = "新任务", jy = "筛选", Ay = "刷新", ky = "重置", Iy = "收入", Ny = "服务类型", Dy = "服务距离", Ey = "确定", xy = "我要抢单", hme = {
  newJob: My,
  sort: jy,
  calcation: Ay,
  reset: ky,
  money: Iy,
  serviceType: Ny,
  serviceDistance: Dy,
  confrim: Ey,
  getOrder: xy
}, _me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: Ay,
  confrim: Ey,
  default: hme,
  getOrder: xy,
  money: Iy,
  newJob: My,
  reset: ky,
  serviceDistance: Dy,
  serviceType: Ny,
  sort: jy
}, Symbol.toStringTag, { value: "Module" })), Ry = "账户明细", zy = "收支统计", Fy = "收入", Ly = "支出", Hy = "暂无账单数据", By = "刷新", Uy = "全部类型", Wy = "全部日期", qy = "到账情况", yme = {
  accountDetails: Ry,
  receiptStatistics: zy,
  income: Fy,
  expense: Ly,
  noBillData: Hy,
  refresh: By,
  allTypes: Uy,
  allDates: Wy,
  paymentStatus: qy
}, $me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountDetails: Ry,
  allDates: Wy,
  allTypes: Uy,
  default: yme,
  expense: Ly,
  income: Fy,
  noBillData: Hy,
  paymentStatus: qy,
  receiptStatistics: zy,
  refresh: By
}, Symbol.toStringTag, { value: "Module" })), Vy = "账户余额", Gy = "元", Yy = "提现", Ky = "账户明细", Qy = "收支统计", Xy = "银行卡", Jy = "今日账单", Zy = "数据说明", e$ = "此处为预计收入，如数据延迟，不影响最终结算，可稍后查询", o$ = "预计收入", t$ = "预计支出", n$ = "暂无账单数据", r$ = "刷新", s$ = "获取日账单统计失败", a$ = "获取机构数据失败", vme = {
  accountBalance: Vy,
  yuan: Gy,
  withdraw: Yy,
  accountDetails: Ky,
  receiptStatistics: Qy,
  bankCards: Xy,
  todayBill: Jy,
  dataDescription: Zy,
  dataDelayTip: e$,
  expectedIncome: o$,
  expectedExpense: t$,
  noBillData: n$,
  refresh: r$,
  fetchDayBillStatFailed: s$,
  fetchStoreDataFailed: a$
}, bme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: Vy,
  accountDetails: Ky,
  bankCards: Xy,
  dataDelayTip: e$,
  dataDescription: Zy,
  default: vme,
  expectedExpense: t$,
  expectedIncome: o$,
  fetchDayBillStatFailed: s$,
  fetchStoreDataFailed: a$,
  noBillData: n$,
  receiptStatistics: Qy,
  refresh: r$,
  todayBill: Jy,
  withdraw: Yy,
  yuan: Gy
}, Symbol.toStringTag, { value: "Module" })), c$ = "订单统计", i$ = "今日订单", l$ = "月订单", d$ = "待服务", u$ = "待验收", p$ = "已完成订单", m$ = "已关闭", f$ = "退款", g$ = "订单明细", h$ = "已完成", _$ = "订单号", y$ = "暂无账单数据", $$ = "", Tme = {
  title: c$,
  todayOrders: i$,
  monthOrders: l$,
  pendingService: d$,
  pendingAcceptance: u$,
  completedOrders: p$,
  cancelled: m$,
  refund: f$,
  orderDetails: g$,
  completed: h$,
  orderNumber: _$,
  noBillData: y$,
  refresh: $$
}, Pme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelled: m$,
  completed: h$,
  completedOrders: p$,
  default: Tme,
  monthOrders: l$,
  noBillData: y$,
  orderDetails: g$,
  orderNumber: _$,
  pendingAcceptance: u$,
  pendingService: d$,
  refresh: $$,
  refund: f$,
  title: c$,
  todayOrders: i$
}, Symbol.toStringTag, { value: "Module" })), v$ = "账户明细", b$ = "收支统计", T$ = "日统计", P$ = "月统计", S$ = "单位：千元", O$ = "收入", w$ = "支出", C$ = "今日收入", M$ = "今日支出", Sme = {
  accountDetails: v$,
  receiptStatistics: b$,
  dailySummary: T$,
  monthlySummary: P$,
  unitThousand: S$,
  income: O$,
  expense: w$,
  todayIncome: C$,
  todayExpense: M$
}, Ome = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountDetails: v$,
  dailySummary: T$,
  default: Sme,
  expense: w$,
  income: O$,
  monthlySummary: P$,
  receiptStatistics: b$,
  todayExpense: M$,
  todayIncome: C$,
  unitThousand: S$
}, Symbol.toStringTag, { value: "Module" })), j$ = "提现", A$ = "可提现余额", k$ = "全部提现", I$ = "手续费", N$ = "请输入提现金额", D$ = "最小提现金额：", E$ = "，手续费为", x$ = "到账方式", R$ = "提现至微信零钱", z$ = "快速到账，无需审核", F$ = "提现至微信", L$ = "提现到微信号", H$ = "请先添加微信号", B$ = "提现至支付宝", U$ = "提现到支付宝账号", W$ = "请先添加支付宝账号", q$ = "提现至银行卡", V$ = "提现到{bankName}储蓄卡", G$ = "请先添加银行卡", Y$ = "添加", K$ = "立即提现", Q$ = "提现记录", X$ = "提现设置未开启", J$ = "没有可用的提现方式", Z$ = "提现金额格式错误", ev = "提现金额超出可提现金额", ov = "提现金额小于最低提现金额", tv = "异常操作", wme = {
  title: j$,
  availableBalance: A$,
  allMoney: k$,
  fee: I$,
  enterAmount: N$,
  minAmount: D$,
  feeRate: E$,
  paymentMethod: x$,
  wechatPay: R$,
  wechatPayDesc: z$,
  wechatCode: F$,
  wechatCodeDesc: L$,
  addWechat: H$,
  alipay: B$,
  alipayDesc: U$,
  addAlipay: W$,
  bank: q$,
  bankDesc: V$,
  addBank: G$,
  add: Y$,
  submit: K$,
  record: Q$,
  notOpen: X$,
  noMethod: J$,
  invalidFormat: Z$,
  exceedLimit: ev,
  belowMin: ov,
  abnormal: tv
}, Cme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormal: tv,
  add: Y$,
  addAlipay: W$,
  addBank: G$,
  addWechat: H$,
  alipay: B$,
  alipayDesc: U$,
  allMoney: k$,
  availableBalance: A$,
  bank: q$,
  bankDesc: V$,
  belowMin: ov,
  default: wme,
  enterAmount: N$,
  exceedLimit: ev,
  fee: I$,
  feeRate: E$,
  invalidFormat: Z$,
  minAmount: D$,
  noMethod: J$,
  notOpen: X$,
  paymentMethod: x$,
  record: Q$,
  submit: K$,
  title: j$,
  wechatCode: F$,
  wechatCodeDesc: L$,
  wechatPay: R$,
  wechatPayDesc: z$
}, Symbol.toStringTag, { value: "Module" })), nv = "编辑银行卡", rv = "添加银行卡", sv = "请确保银行卡信息准确无误，以便顺利提现", av = "添加您的银行卡信息，用于资金提现到账", cv = "持卡人姓名", iv = "请输入持卡人真实姓名", lv = "银行名称", dv = "请输入开户银行全称", uv = "银行卡号", pv = "请输入银行卡号", mv = "编辑支付宝账户", fv = "添加支付宝账户", gv = "请确保支付宝信息准确无误，以便顺利提现", hv = "添加您的支付宝信息，用于资金提现到账", _v = "支付宝姓名", yv = "请输入支付宝实名认证姓名", $v = "支付宝账号", vv = "请输入支付宝账号（手机号/邮箱）", bv = "编辑微信账户", Tv = "添加微信账户", Pv = "请确保微信信息准确无误，以便顺利提现", Sv = "添加您的微信信息，用于资金提现到账", Ov = "微信姓名", wv = "请输入微信实名认证姓名", Cv = "微信账号", Mv = "请输入微信账号（手机号/微信号）", jv = "保存账户信息", Av = "确定要删除该提现账户吗？删除后无法恢复", kv = "确认删除", Iv = "取消", Nv = "编辑提现账户", Dv = "添加提现账户", Ev = "请上传清晰的支付宝收款码", xv = "请上传清晰的微信收款码", Rv = "银行卡信息", zv = "支付宝账户信息", Fv = "微信账户信息", Lv = "账户类型", Hv = "此项为必填项", Bv = "上传成功", Uv = "上传失败，请重试", Wv = "保存成功", qv = "删除成功", Mme = {
  editBankCard: nv,
  addBankCard: rv,
  editBankCardTips: sv,
  addBankCardTips: av,
  bankRealname: cv,
  bankRealnamePlaceholder: iv,
  bankName: lv,
  bankNamePlaceholder: dv,
  bankAccountNo: uv,
  bankAccountNoPlaceholder: pv,
  editAlipayAccount: mv,
  addAlipayAccount: fv,
  editAlipayAccountTips: gv,
  addAlipayAccountTips: hv,
  alipayRealname: _v,
  alipayRealnamePlaceholder: yv,
  alipayAccountNo: $v,
  alipayAccountNoPlaceholder: vv,
  editWechatCodeAccount: bv,
  addWechatCodeAccount: Tv,
  editWechatCodeAccountTips: Pv,
  addWechatCodeAccountTips: Sv,
  wechatCodeRealname: Ov,
  wechatCodeRealnamePlaceholder: wv,
  wechatCodeAccountNo: Cv,
  wechatCodeAccountNoPlaceholder: Mv,
  save: jv,
  deleteConfirm: Av,
  confirm: kv,
  cancel: Iv,
  editAccountTitle: Nv,
  addAccountTitle: Dv,
  alipayAccountImgPlaceholder: Ev,
  wechatCodeAccountImgPlaceholder: xv,
  accountInfo: Rv,
  alipayAccountInfo: zv,
  wechatCodeAccountInfo: Fv,
  accountTypeLabel: Lv,
  requiredField: Hv,
  uploadSuccess: Bv,
  uploadFailed: Uv,
  saveSuccess: Wv,
  deleteSuccess: qv
}, jme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountInfo: Rv,
  accountTypeLabel: Lv,
  addAccountTitle: Dv,
  addAlipayAccount: fv,
  addAlipayAccountTips: hv,
  addBankCard: rv,
  addBankCardTips: av,
  addWechatCodeAccount: Tv,
  addWechatCodeAccountTips: Sv,
  alipayAccountImgPlaceholder: Ev,
  alipayAccountInfo: zv,
  alipayAccountNo: $v,
  alipayAccountNoPlaceholder: vv,
  alipayRealname: _v,
  alipayRealnamePlaceholder: yv,
  bankAccountNo: uv,
  bankAccountNoPlaceholder: pv,
  bankName: lv,
  bankNamePlaceholder: dv,
  bankRealname: cv,
  bankRealnamePlaceholder: iv,
  cancel: Iv,
  confirm: kv,
  default: Mme,
  deleteConfirm: Av,
  deleteSuccess: qv,
  editAccountTitle: Nv,
  editAlipayAccount: mv,
  editAlipayAccountTips: gv,
  editBankCard: nv,
  editBankCardTips: sv,
  editWechatCodeAccount: bv,
  editWechatCodeAccountTips: Pv,
  requiredField: Hv,
  save: jv,
  saveSuccess: Wv,
  uploadFailed: Uv,
  uploadSuccess: Bv,
  wechatCodeAccountImgPlaceholder: xv,
  wechatCodeAccountInfo: Fv,
  wechatCodeAccountNo: Cv,
  wechatCodeAccountNoPlaceholder: Mv,
  wechatCodeRealname: Ov,
  wechatCodeRealnamePlaceholder: wv
}, Symbol.toStringTag, { value: "Module" })), Vv = "银行卡列表", Gv = "微信收款码列表", Yv = "支付宝账号列表", Kv = "银行卡", Qv = "微信收款码", Xv = "支付宝账号", Jv = "尾号", Zv = "暂无账户信息，点击下方按钮添加", eb = "暂无银行卡", ob = "暂无微信收款码", tb = "暂无支付宝账号", nb = "添加银行卡", rb = "添加微信收款码", sb = "添加支付宝账号", Ame = {
  bankCardList: Vv,
  wechatCodeList: Gv,
  alipayAccountList: Yv,
  bankCard: Kv,
  wechatCode: Qv,
  alipayAccountNo: Xv,
  endNumber: Jv,
  noAccountDesc: Zv,
  noBankCard: eb,
  noWechatCode: ob,
  noAlipayAccount: tb,
  addBankCard: nb,
  addWechatCode: rb,
  addAlipayAccount: sb,
  delete: "删除"
}, kme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: sb,
  addBankCard: nb,
  addWechatCode: rb,
  alipayAccountList: Yv,
  alipayAccountNo: Xv,
  bankCard: Kv,
  bankCardList: Vv,
  default: Ame,
  endNumber: Jv,
  noAccountDesc: Zv,
  noAlipayAccount: tb,
  noBankCard: eb,
  noWechatCode: ob,
  wechatCode: Qv,
  wechatCodeList: Gv
}, Symbol.toStringTag, { value: "Module" })), ab = "切换账号", cb = "今日收入(元)", ib = "我的账户", lb = "今日完成单量(单)", db = "订单统计", ub = "建议反馈", pb = "我的评价", mb = "去派单", fb = "抢单派送给店员", gb = "排班管理", hb = "安排作息时间", _b = "服务分析", yb = "服务数据", $b = "订单看板", vb = "待派单", bb = "日历", Tb = "待服务", Pb = "服务中", Sb = "待验收", Ob = "已完成", wb = "售后单", Cb = "已取消", Mb = "刷新", jb = "师傅动态", Ime = {
  changeAccount: ab,
  todayMoney: cb,
  myAccount: ib,
  orderFinshNumber: lb,
  orderNumber: db,
  ViolationAppeal: ub,
  MyReview: pb,
  paiOrder: mb,
  paiOrderDesc: fb,
  workTime: gb,
  levalWork: hb,
  ServiceAnalysis: _b,
  servicesData: yb,
  workTools: $b,
  daiPaiOrder: vb,
  date: bb,
  daiServices: Tb,
  inServices: Pb,
  daiYanshou: Sb,
  finshOrder: Ob,
  refunedOrder: wb,
  cancelOrder: Cb,
  resetEcharts: Mb,
  technianStatus: jb
}, Nme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MyReview: pb,
  ServiceAnalysis: _b,
  ViolationAppeal: ub,
  cancelOrder: Cb,
  changeAccount: ab,
  daiPaiOrder: vb,
  daiServices: Tb,
  daiYanshou: Sb,
  date: bb,
  default: Ime,
  finshOrder: Ob,
  inServices: Pb,
  levalWork: hb,
  myAccount: ib,
  orderFinshNumber: lb,
  orderNumber: db,
  paiOrder: mb,
  paiOrderDesc: fb,
  refunedOrder: wb,
  resetEcharts: Mb,
  servicesData: yb,
  technianStatus: jb,
  todayMoney: cb,
  workTime: gb,
  workTools: $b
}, Symbol.toStringTag, { value: "Module" })), Ab = "机构入驻申请", kb = "机构名称", Ib = "请输入机构名称", Nb = "机构证件", Db = "请上传清晰照片", Eb = "营业执照", xb = "请上传信息清晰的营业执照照片", Rb = "上传机构图片", zb = "机构位置", Fb = "请选择位置", Lb = "联系人姓名", Hb = "请输入联系人姓名", Bb = "联系人手机", Ub = "请输入联系人手机号码", Wb = "联系人身份证", qb = "请输入联系人身份证号码", Vb = "身份证上传", Gb = "请上传身份证正反面照片", Yb = "身份证正面", Kb = "照片必须清晰完整", Qb = "身份证信息必须清晰可见", Xb = "身份证反面", Jb = "照片必须清晰完整", Zb = "身份证信息必须清晰可见", eT = "申请说明", oT = "请输入申请说明", tT = "确认提交", nT = "请上传营业执照", rT = "请输入联系人姓名", sT = "请输入手机号码", aT = "请输入有效的手机号码", cT = "请输入身份证号码", iT = "请输入有效的身份证号码", lT = "请上传身份证正面照片", dT = "请上传身份证反面照片", uT = "请选择位置", pT = "提交中...", mT = "提交成功", Dme = {
  storeApplyTitle: Ab,
  storeName: kb,
  inputStoreName: Ib,
  storeCertificates: Nb,
  uploadClearPhotos: Db,
  businessLicense: Eb,
  storeBusinessLicenseTip: xb,
  uploadStoreImage: Rb,
  myLocation: zb,
  selectLocation: Fb,
  contactPersonName: Lb,
  inputContactPersonName: Hb,
  contactPersonMobile: Bb,
  inputContactPersonMobile: Ub,
  contactPersonIdcard: Wb,
  inputContactPersonIdcard: qb,
  idcardUpload: Vb,
  idcardUploadTip: Gb,
  idcardFront: Yb,
  idcardFrontTip1: Kb,
  idcardFrontTip3: Qb,
  idcardBack: Xb,
  idcardBackTip1: Jb,
  idcardBackTip3: Zb,
  applyDescription: eT,
  inputApplyDescription: oT,
  confirmSubmit: tT,
  businessLicenseRequired: nT,
  contactNameRequired: rT,
  mobileRequired: sT,
  inputMobileErr: aT,
  idNumberRequired: cT,
  inputIdcardErr: iT,
  idcardFrontRequired: lT,
  idcardBackRequired: dT,
  locationRequired: uT,
  submitting: pT,
  submitSuccess: mT
}, Eme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDescription: eT,
  businessLicense: Eb,
  businessLicenseRequired: nT,
  confirmSubmit: tT,
  contactNameRequired: rT,
  contactPersonIdcard: Wb,
  contactPersonMobile: Bb,
  contactPersonName: Lb,
  default: Dme,
  idNumberRequired: cT,
  idcardBack: Xb,
  idcardBackRequired: dT,
  idcardBackTip1: Jb,
  idcardBackTip3: Zb,
  idcardFront: Yb,
  idcardFrontRequired: lT,
  idcardFrontTip1: Kb,
  idcardFrontTip3: Qb,
  idcardUpload: Vb,
  idcardUploadTip: Gb,
  inputApplyDescription: oT,
  inputContactPersonIdcard: qb,
  inputContactPersonMobile: Ub,
  inputContactPersonName: Hb,
  inputIdcardErr: iT,
  inputMobileErr: aT,
  inputStoreName: Ib,
  locationRequired: uT,
  mobileRequired: sT,
  myLocation: zb,
  selectLocation: Fb,
  storeApplyTitle: Ab,
  storeBusinessLicenseTip: xb,
  storeCertificates: Nb,
  storeName: kb,
  submitSuccess: mT,
  submitting: pT,
  uploadClearPhotos: Db,
  uploadStoreImage: Rb
}, Symbol.toStringTag, { value: "Module" })), fT = "入驻申请审批中", gT = "入驻申请不通过", hT = "申请已通过", _T = "预计三个工作日完成，请耐心等待", yT = "申请已提交", $T = "审核时间", vT = "返回首页", bT = "查看申请状态", TT = "审核提示", PT = "您已成功入驻", xme = {
  reviewingTitle: fT,
  rejectedTitle: gT,
  successTitle: hT,
  description: _T,
  applicationSubmitted: yT,
  awaitingSettlement: $T,
  goBackHome: vT,
  checkStatus: bT,
  reviewTips: TT,
  descriptionSuccess: PT
}, Rme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applicationSubmitted: yT,
  awaitingSettlement: $T,
  checkStatus: bT,
  default: xme,
  description: _T,
  descriptionSuccess: PT,
  goBackHome: vT,
  rejectedTitle: gT,
  reviewTips: TT,
  reviewingTitle: fT,
  successTitle: hT
}, Symbol.toStringTag, { value: "Module" })), ST = "师傅详情", OT = "师傅详情", wT = "手机号：", CT = "完成单数", MT = "异常订单数", jT = "售后订单数", AT = "好评率", kT = "个人简介", IT = "姓名", NT = "手机号", DT = "资质证书", ET = "加载失败", xT = "自我介绍", RT = "暂无介绍", zT = "技能专长", FT = "请输入搜索关键词", LT = "筛选", HT = "家政保洁", BT = "保姆月嫂", UT = "家电维修", WT = "家电清洗", qT = "管道疏通", VT = "从业", GT = "年", YT = "服务", KT = "单", QT = "工作中", XT = "休息中", JT = "去派单", ZT = "排班管理", eP = "打电话", oP = "任务", tP = "机构", nP = "技工", rP = "我的", sP = "技工管理", zme = {
  pageTitle: ST,
  technicianDetail: OT,
  phoneNumber: wT,
  completedOrders: CT,
  abnormalOrders: MT,
  refundOrders: jT,
  positiveRate: AT,
  personalProfile: kT,
  name: IT,
  phone: NT,
  qualificationCertificate: DT,
  loadFailed: ET,
  selfIntroduction: xT,
  noIntroduction: RT,
  skills: zT,
  searchPlaceholder: FT,
  filter: LT,
  housekeeping: HT,
  nanny: BT,
  applianceRepair: UT,
  applianceCleaning: WT,
  pipeDredging: qT,
  yearsOfExperience: VT,
  years: GT,
  serviceOrders: YT,
  orders: KT,
  working: QT,
  resting: XT,
  assignOrder: JT,
  scheduleManagement: ZT,
  makeCall: eP,
  tasks: oP,
  store: tP,
  technicians: nP,
  my: rP,
  pageHeader: sP
}, Fme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOrders: MT,
  applianceCleaning: WT,
  applianceRepair: UT,
  assignOrder: JT,
  completedOrders: CT,
  default: zme,
  filter: LT,
  housekeeping: HT,
  loadFailed: ET,
  makeCall: eP,
  my: rP,
  name: IT,
  nanny: BT,
  noIntroduction: RT,
  orders: KT,
  pageHeader: sP,
  pageTitle: ST,
  personalProfile: kT,
  phone: NT,
  phoneNumber: wT,
  pipeDredging: qT,
  positiveRate: AT,
  qualificationCertificate: DT,
  refundOrders: jT,
  resting: XT,
  scheduleManagement: ZT,
  searchPlaceholder: FT,
  selfIntroduction: xT,
  serviceOrders: YT,
  skills: zT,
  store: tP,
  tasks: oP,
  technicianDetail: OT,
  technicians: nP,
  working: QT,
  years: GT,
  yearsOfExperience: VT
}, Symbol.toStringTag, { value: "Module" })), aP = "机构首页", cP = "请输入搜索关键词", iP = "筛选", lP = "家政保洁", dP = "保姆月嫂", uP = "家电维修", pP = "家电清洗", mP = "管道疏通", fP = "从业", gP = "年", hP = "服务", _P = "单", yP = "工作中", $P = "休息中", vP = "去派单", bP = "排班管理", TP = "打电话", PP = "任务", SP = "机构", OP = "技工", wP = "我的", CP = "技工管理", Lme = {
  pageTitle: aP,
  searchPlaceholder: cP,
  filter: iP,
  housekeeping: lP,
  nanny: dP,
  applianceRepair: uP,
  applianceCleaning: pP,
  pipeDredging: mP,
  yearsOfExperience: fP,
  years: gP,
  serviceOrders: hP,
  orders: _P,
  working: yP,
  resting: $P,
  assignOrder: vP,
  scheduleManagement: bP,
  makeCall: TP,
  tasks: PP,
  store: SP,
  technicians: OP,
  my: wP,
  pageHeaderTitle: CP
}, Hme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applianceCleaning: pP,
  applianceRepair: uP,
  assignOrder: vP,
  default: Lme,
  filter: iP,
  housekeeping: lP,
  makeCall: TP,
  my: wP,
  nanny: dP,
  orders: _P,
  pageHeaderTitle: CP,
  pageTitle: aP,
  pipeDredging: mP,
  resting: $P,
  scheduleManagement: bP,
  searchPlaceholder: cP,
  serviceOrders: hP,
  store: SP,
  tasks: PP,
  technicians: OP,
  working: yP,
  years: gP,
  yearsOfExperience: fP
}, Symbol.toStringTag, { value: "Module" })), MP = "排班管理", jP = "排班管理日历", AP = "休息时间安排", kP = "开始时间", IP = "结束时间", NP = "请假原因", DP = "个人事务", EP = "身体不适", xP = "家庭原因", RP = "其他原因", zP = "培训学习", FP = "临时有事", LP = "取消", HP = "确定", BP = "日", UP = "一", WP = "二", qP = "三", VP = "四", GP = "五", YP = "六", Bme = {
  title: MP,
  calendarTitle: jP,
  restTimeArrangement: AP,
  startTime: kP,
  endTime: IP,
  leaveReason: NP,
  personalAffairs: DP,
  physicalDiscomfort: EP,
  familyReason: xP,
  otherReason: RP,
  trainingStudy: zP,
  temporaryMatter: FP,
  cancel: LP,
  confirm: HP,
  sunday: BP,
  monday: UP,
  tuesday: WP,
  wednesday: qP,
  thursday: VP,
  friday: GP,
  saturday: YP
}, Ume = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calendarTitle: jP,
  cancel: LP,
  confirm: HP,
  default: Bme,
  endTime: IP,
  familyReason: xP,
  friday: GP,
  leaveReason: NP,
  monday: UP,
  otherReason: RP,
  personalAffairs: DP,
  physicalDiscomfort: EP,
  restTimeArrangement: AP,
  saturday: YP,
  startTime: kP,
  sunday: BP,
  temporaryMatter: FP,
  thursday: VP,
  title: MP,
  trainingStudy: zP,
  tuesday: WP,
  wednesday: qP
}, Symbol.toStringTag, { value: "Module" })), KP = "登录中", QP = "请输入账号", XP = "请输入密码", JP = "忘记密码", ZP = "还没有账号", eS = "去注册", oS = "登录代表您同意", tS = "请先阅读并同意协议", nS = "请输入手机号", rS = "快捷登录", sS = "账号密码登录", aS = "输入账号密码登录", cS = "商家未开启账号密码登录", iS = "手机号登录", lS = "输入手机号验证码登录", dS = "商家未开启手机号登录", Wme = {
  logining: KP,
  usernamePlaceholder: QP,
  passwordPlaceholder: XP,
  resetpwd: JP,
  noAccount: ZP,
  toRegister: eS,
  agreeTips: oS,
  isAgreeTips: tS,
  mobilePlaceholder: nS,
  oneClicklogin: rS,
  accountLogin: sS,
  accountLoginTip: aS,
  accountLoginError: cS,
  mobileLogin: iS,
  mobileLoginTip: lS,
  mobileLoginError: dS
}, qme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: sS,
  accountLoginError: cS,
  accountLoginTip: aS,
  agreeTips: oS,
  default: Wme,
  isAgreeTips: tS,
  logining: KP,
  mobileLogin: iS,
  mobileLoginError: dS,
  mobileLoginTip: lS,
  mobilePlaceholder: nS,
  noAccount: ZP,
  oneClicklogin: rS,
  passwordPlaceholder: XP,
  resetpwd: JP,
  toRegister: eS,
  usernamePlaceholder: QP
}, Symbol.toStringTag, { value: "Module" })), uS = "注册中", pS = "输入账号密码注册", mS = "输入手机号验证码注册", fS = "请输入账号", gS = "账号不能是纯数字", hS = "请输入密码", _S = "请再次确认密码", yS = "两次输入的密码不一致", $S = "忘记密码", vS = "已有账号", bS = "去登录", TS = "注册代表您同意", PS = "请先阅读并同意协议", SS = "账号注册", OS = "手机号注册", wS = "请输入手机号", Vme = {
  registering: uS,
  usernameRegisterTip: pS,
  mobileRegisterTip: mS,
  usernamePlaceholder: fS,
  usernameTips: gS,
  passwordPlaceholder: hS,
  confirmPasswordPlaceholder: _S,
  confirmPasswordError: yS,
  resetpwd: $S,
  haveAccount: vS,
  toLogin: bS,
  registerAgreeTips: TS,
  isAgreeTips: PS,
  usernameRegister: SS,
  mobileRegister: OS,
  mobilePlaceholder: wS
}, Gme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: yS,
  confirmPasswordPlaceholder: _S,
  default: Vme,
  haveAccount: vS,
  isAgreeTips: PS,
  mobilePlaceholder: wS,
  mobileRegister: OS,
  mobileRegisterTip: mS,
  passwordPlaceholder: hS,
  registerAgreeTips: TS,
  registering: uS,
  resetpwd: $S,
  toLogin: bS,
  usernamePlaceholder: fS,
  usernameRegister: SS,
  usernameRegisterTip: pS,
  usernameTips: gS
}, Symbol.toStringTag, { value: "Module" })), CS = "新任务", MS = "筛选", jS = "刷新", AS = "重置", kS = "收入", IS = "服务类型", NS = "服务距离", DS = "确定", ES = "我要抢单", xS = "暂无数据", Yme = {
  newJob: CS,
  sort: MS,
  calcation: jS,
  reset: AS,
  money: kS,
  serviceType: IS,
  serviceDistance: NS,
  confrim: DS,
  getOrder: ES,
  nothingMore: xS
}, Kme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: jS,
  confrim: DS,
  default: Yme,
  getOrder: ES,
  money: kS,
  newJob: CS,
  nothingMore: xS,
  reset: AS,
  serviceDistance: NS,
  serviceType: IS,
  sort: MS
}, Symbol.toStringTag, { value: "Module" })), RS = "我的账户", zS = "账户余额", FS = "提现", LS = "账户明细", HS = "收支统计", BS = "保证金", US = "银行卡", WS = "今日账单", qS = "数据说明", VS = "此处为预计收入，如数据延迟，不影响最终结算，可稍后查询", GS = "预计收入", YS = "预计支出", KS = "日常保洁", QS = "深度清洁", XS = "清洁收入-日常清洁", JS = "未到账", ZS = "已到账", eO = "收入", oO = "支出", tO = "全部类型", nO = "全部日期", rO = "全部状态", sO = "暂无账单数据", aO = "到账情况", Qme = {
  myAccount: RS,
  accountBalance: zS,
  cashOut: FS,
  accountDetails: LS,
  receiptStatistics: HS,
  deposit: BS,
  bankCards: US,
  todayBill: WS,
  dataDescription: qS,
  dataDelayTip: VS,
  expectedIncome: GS,
  expectedExpense: YS,
  dailyCleaning: KS,
  deepCleaning: QS,
  cleaningIncome: XS,
  notArrived: JS,
  arrived: ZS,
  income: eO,
  expense: oO,
  allTypes: tO,
  allDates: nO,
  allStatuses: rO,
  noBillData: sO,
  paymentStatus: aO
}, Xme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: zS,
  accountDetails: LS,
  allDates: nO,
  allStatuses: rO,
  allTypes: tO,
  arrived: ZS,
  bankCards: US,
  cashOut: FS,
  cleaningIncome: XS,
  dailyCleaning: KS,
  dataDelayTip: VS,
  dataDescription: qS,
  deepCleaning: QS,
  default: Qme,
  deposit: BS,
  expectedExpense: YS,
  expectedIncome: GS,
  expense: oO,
  income: eO,
  myAccount: RS,
  noBillData: sO,
  notArrived: JS,
  paymentStatus: aO,
  receiptStatistics: HS,
  todayBill: WS
}, Symbol.toStringTag, { value: "Module" })), cO = "我的账户", iO = "账户余额", lO = "提现", dO = "账户明细", uO = "收支统计", pO = "保证金", mO = "银行卡", fO = "今日账单", gO = "数据说明", hO = "此处为预计收入，如数据延迟，不影响最终结算，可稍后查询", _O = "预计收入", yO = "预计支出", $O = "日常保洁", vO = "深度清洁", bO = "清洁收入-日常清洁", TO = "未到账", PO = "已到账", SO = "元", Jme = {
  myAccount: cO,
  accountBalance: iO,
  withdraw: lO,
  accountDetails: dO,
  receiptStatistics: uO,
  deposit: pO,
  bankCards: mO,
  todayBill: fO,
  dataDescription: gO,
  dataDelayTip: hO,
  expectedIncome: _O,
  expectedExpense: yO,
  dailyCleaning: $O,
  deepCleaning: vO,
  cleaningIncome: bO,
  notArrived: TO,
  arrived: PO,
  yuan: SO
}, Zme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: iO,
  accountDetails: dO,
  arrived: PO,
  bankCards: mO,
  cleaningIncome: bO,
  dailyCleaning: $O,
  dataDelayTip: hO,
  dataDescription: gO,
  deepCleaning: vO,
  default: Jme,
  deposit: pO,
  expectedExpense: yO,
  expectedIncome: _O,
  myAccount: cO,
  notArrived: TO,
  receiptStatistics: uO,
  todayBill: fO,
  withdraw: lO,
  yuan: SO
}, Symbol.toStringTag, { value: "Module" })), OO = "账户明细", wO = "收支统计", CO = "日统计", MO = "月统", jO = "单位: 千", AO = "收入", kO = "支出", IO = "今天收入(元)", NO = "今天支出(元)", DO = "维修服务收入", EO = "日常保洁收入", xO = "投诉扣款", RO = "到账情况", zO = "账户明细", FO = "收支统计", efe = {
  accountDetail: OO,
  incomeExpenseSummary: wO,
  dailySummary: CO,
  monthlySummary: MO,
  unitThousand: jO,
  income: AO,
  expense: kO,
  todayIncome: IO,
  todayExpense: NO,
  repairServiceIncome: DO,
  dailyCleaningIncome: EO,
  complaintDeduction: xO,
  paymentStatus: RO,
  accountDetails: zO,
  receiptStatistics: FO
}, ofe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountDetail: OO,
  accountDetails: zO,
  complaintDeduction: xO,
  dailyCleaningIncome: EO,
  dailySummary: CO,
  default: efe,
  expense: kO,
  income: AO,
  incomeExpenseSummary: wO,
  monthlySummary: MO,
  paymentStatus: RO,
  receiptStatistics: FO,
  repairServiceIncome: DO,
  todayExpense: NO,
  todayIncome: IO,
  unitThousand: jO
}, Symbol.toStringTag, { value: "Module" })), LO = "提现", HO = "可提现余额", BO = "￥", UO = "全部提现", WO = "请输入提现金额", qO = "手续费：￥", VO = "最低提现金额", GO = "，手续费率：", YO = "提现方式", KO = "微信提现", QO = "快速到账，无需审核", XO = "微信收款码", JO = "提现至微信收款码", ZO = "请先添加微信号", e1 = "支付宝", o1 = "提现至支付宝", t1 = "银行卡", n1 = "提现至银行卡：{bankName}", r1 = "请先添加银行卡", s1 = "添加", a1 = "立即提现", c1 = "提现设置未开启", i1 = "账户异常", l1 = "请选择提现方式", d1 = "提现金额格式错误", u1 = "提现金额超出可提现余额", p1 = "提现金额低于最低限额", m1 = "请先添加支付宝账号", tfe = {
  title: LO,
  availableBalance: HO,
  currency: BO,
  allMoney: UO,
  enterAmount: WO,
  fee: qO,
  minAmount: VO,
  feeRate: GO,
  paymentMethod: YO,
  wechatPay: KO,
  wechatPayDesc: QO,
  wechatCode: XO,
  wechatCodeDesc: JO,
  addWechat: ZO,
  alipay: e1,
  alipayDesc: o1,
  bank: t1,
  bankDesc: n1,
  addBank: r1,
  add: s1,
  submit: a1,
  notOpen: c1,
  abnormal: i1,
  noMethod: l1,
  invalidFormat: d1,
  exceedLimit: u1,
  belowMin: p1,
  addAlipay: m1
}, nfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormal: i1,
  add: s1,
  addAlipay: m1,
  addBank: r1,
  addWechat: ZO,
  alipay: e1,
  alipayDesc: o1,
  allMoney: UO,
  availableBalance: HO,
  bank: t1,
  bankDesc: n1,
  belowMin: p1,
  currency: BO,
  default: tfe,
  enterAmount: WO,
  exceedLimit: u1,
  fee: qO,
  feeRate: GO,
  invalidFormat: d1,
  minAmount: VO,
  noMethod: l1,
  notOpen: c1,
  paymentMethod: YO,
  submit: a1,
  title: LO,
  wechatCode: XO,
  wechatCodeDesc: JO,
  wechatPay: KO,
  wechatPayDesc: QO
}, Symbol.toStringTag, { value: "Module" })), f1 = "编辑银行卡", g1 = "添加银行卡", h1 = "请填写正确的银行卡信息", _1 = "添加银行卡后可用于提现", y1 = "持卡人姓名", $1 = "请输入持卡人姓名", v1 = "开户银行", b1 = "请输入开户银行", T1 = "银行卡号", P1 = "请输入银行卡号", S1 = "编辑支付宝账号", O1 = "添加支付宝账号", w1 = "请填写正确的支付宝信息", C1 = "添加支付宝后可用于提现", M1 = "支付宝姓名", j1 = "请输入支付宝姓名", A1 = "支付宝账号", k1 = "请输入支付宝账号", I1 = "请上传支付宝收款码", N1 = "编辑微信收款码", D1 = "添加微信收款码", E1 = "请填写正确的微信收款码信息", x1 = "添加微信收款码后可用于提现", R1 = "微信姓名", z1 = "请输入微信姓名", F1 = "微信账号", L1 = "请输入微信账号", H1 = "请上传微信收款码", B1 = "保存", U1 = "确定要删除该账户吗？", W1 = "确定", q1 = "取消", V1 = "编辑账户", G1 = "添加账户", rfe = {
  editBankCard: f1,
  addBankCard: g1,
  editBankCardTips: h1,
  addBankCardTips: _1,
  bankRealname: y1,
  bankRealnamePlaceholder: $1,
  bankName: v1,
  bankNamePlaceholder: b1,
  bankAccountNo: T1,
  bankAccountNoPlaceholder: P1,
  editAlipayAccount: S1,
  addAlipayAccount: O1,
  editAlipayAccountTips: w1,
  addAlipayAccountTips: C1,
  alipayRealname: M1,
  alipayRealnamePlaceholder: j1,
  alipayAccountNo: A1,
  alipayAccountNoPlaceholder: k1,
  alipayAccountImgPlaceholder: I1,
  editWechatCodeAccount: N1,
  addWechatCodeAccount: D1,
  editWechatCodeAccountTips: E1,
  addWechatCodeAccountTips: x1,
  wechatCodeRealname: R1,
  wechatCodeRealnamePlaceholder: z1,
  wechatCodeAccountNo: F1,
  wechatCodeAccountNoPlaceholder: L1,
  wechatCodeAccountImgPlaceholder: H1,
  save: B1,
  deleteConfirm: U1,
  confirm: W1,
  cancel: q1,
  editAccountTitle: V1,
  addAccountTitle: G1
}, sfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAccountTitle: G1,
  addAlipayAccount: O1,
  addAlipayAccountTips: C1,
  addBankCard: g1,
  addBankCardTips: _1,
  addWechatCodeAccount: D1,
  addWechatCodeAccountTips: x1,
  alipayAccountImgPlaceholder: I1,
  alipayAccountNo: A1,
  alipayAccountNoPlaceholder: k1,
  alipayRealname: M1,
  alipayRealnamePlaceholder: j1,
  bankAccountNo: T1,
  bankAccountNoPlaceholder: P1,
  bankName: v1,
  bankNamePlaceholder: b1,
  bankRealname: y1,
  bankRealnamePlaceholder: $1,
  cancel: q1,
  confirm: W1,
  default: rfe,
  deleteConfirm: U1,
  editAccountTitle: V1,
  editAlipayAccount: S1,
  editAlipayAccountTips: w1,
  editBankCard: f1,
  editBankCardTips: h1,
  editWechatCodeAccount: N1,
  editWechatCodeAccountTips: E1,
  save: B1,
  wechatCodeAccountImgPlaceholder: H1,
  wechatCodeAccountNo: F1,
  wechatCodeAccountNoPlaceholder: L1,
  wechatCodeRealname: R1,
  wechatCodeRealnamePlaceholder: z1
}, Symbol.toStringTag, { value: "Module" })), Y1 = "银行卡列表", K1 = "微信收款码列表", Q1 = "支付宝账号列表", X1 = "银行卡", J1 = "微信收款码", Z1 = "支付宝账号", ew = "尾号", ow = "暂无账户信息，点击下方按钮添加", tw = "暂无银行卡", nw = "暂无微信收款码", rw = "暂无支付宝账号", sw = "添加银行卡", aw = "添加微信收款码", cw = "添加支付宝账号", afe = {
  bankCardList: Y1,
  wechatCodeList: K1,
  alipayAccountList: Q1,
  bankCard: X1,
  wechatCode: J1,
  alipayAccountNo: Z1,
  endNumber: ew,
  noAccountDesc: ow,
  noBankCard: tw,
  noWechatCode: nw,
  noAlipayAccount: rw,
  addBankCard: sw,
  addWechatCode: aw,
  addAlipayAccount: cw,
  delete: "删除"
}, cfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: cw,
  addBankCard: sw,
  addWechatCode: aw,
  alipayAccountList: Q1,
  alipayAccountNo: Z1,
  bankCard: X1,
  bankCardList: Y1,
  default: afe,
  endNumber: ew,
  noAccountDesc: ow,
  noAlipayAccount: rw,
  noBankCard: tw,
  noWechatCode: nw,
  wechatCode: J1,
  wechatCodeList: K1
}, Symbol.toStringTag, { value: "Module" })), iw = "申请时间", lw = "审核中，请耐心等待...", dw = "转账中，请耐心等待...", uw = "已转账，请及时查收", pw = "提现已取消", mw = "余额记录", fw = "佣金记录", gw = "暂无提现记录", hw = "暂无佣金记录", _w = "提现方式：", ife = {
  applyTime: iw,
  toBeReviewed: lw,
  toBeTransfer: dw,
  transfer: uw,
  cancelApply: pw,
  balanceDetail: mw,
  commissionDetail: fw,
  emptyTip: gw,
  commissemptyTip: hw,
  rechargeType: _w
}, lfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: iw,
  balanceDetail: mw,
  cancelApply: pw,
  commissemptyTip: hw,
  commissionDetail: fw,
  default: ife,
  emptyTip: gw,
  rechargeType: _w,
  toBeReviewed: lw,
  toBeTransfer: dw,
  transfer: uw
}, Symbol.toStringTag, { value: "Module" })), yw = "当前状态", $w = "提现单号", vw = "手续费", bw = "申请时间", Tw = "审核时间", Pw = "银行名称", Sw = "收款账号", Ow = "拒绝理由", ww = "转账方式", Cw = "转账时间", Mw = "付款凭证", jw = "转账补充说明", Aw = "真实姓名", kw = "持卡人姓名", Iw = "收款码", Nw = "收款方信息", Dw = "转账信息", Ew = "收款方昵称", xw = "收款方头像", Rw = "转账单号", zw = "提现", Fw = "取消提现", dfe = {
  statusName: yw,
  cashOutNo: $w,
  serviceMoney: vw,
  createTime: bw,
  auditTime: Tw,
  transferBank: Pw,
  transferAccount: Sw,
  refuseReason: Ow,
  transferTypeName: ww,
  transferTime: Cw,
  transferVoucher: Mw,
  transferRemark: jw,
  realname: Aw,
  bankRealname: kw,
  transferCode: Iw,
  proceedsInfo: Nw,
  transferInfo: Dw,
  transferNickname: Ew,
  transferImg: xw,
  transferNo: Rw,
  cashOutNow: zw,
  cashOutCancel: Fw
}, ufe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: Tw,
  bankRealname: kw,
  cashOutCancel: Fw,
  cashOutNo: $w,
  cashOutNow: zw,
  createTime: bw,
  default: dfe,
  proceedsInfo: Nw,
  realname: Aw,
  refuseReason: Ow,
  serviceMoney: vw,
  statusName: yw,
  transferAccount: Sw,
  transferBank: Pw,
  transferCode: Iw,
  transferImg: xw,
  transferInfo: Dw,
  transferNickname: Ew,
  transferNo: Rw,
  transferRemark: jw,
  transferTime: Cw,
  transferTypeName: ww,
  transferVoucher: Mw
}, Symbol.toStringTag, { value: "Module" })), Lw = "师傅详情", Hw = "编辑", Bw = "编辑师傅信息", Uw = "更换头像", Ww = "姓名", qw = "手机号", Vw = "个人简介", Gw = "请输入姓名", Yw = "请输入手机号", Kw = "请输入个人简介", Qw = "取消", Xw = "保存", Jw = "保存成功", Zw = "保存失败", eC = "请输入姓名", oC = "姓名长度应为2-20个字符", tC = "请输入手机号", nC = "请输入正确的手机号格式", rC = "工作中", sC = "休息中", aC = "手机号：", cC = "已完成订单", iC = "异常订单", lC = "退款订单", dC = "好评率", uC = "个人简介", pC = "资质证书", mC = "加载失败", fC = "暂无介绍", gC = "技能专长", hC = "从业{years}年", _C = "服务{count}单", yC = "最多允许上传{maxCount}张图片", $C = "上传失败", vC = "请上传头像", bC = "请输入个人简介", TC = "个人简介长度应为10-200个字符", PC = "保存中...", pfe = {
  technicianDetail: Lw,
  edit: Hw,
  editTechnicianInfo: Bw,
  changeAvatar: Uw,
  name: Ww,
  phone: qw,
  selfIntroduction: Vw,
  pleaseEnterName: Gw,
  pleaseEnterPhone: Yw,
  pleaseEnterIntroduction: Kw,
  cancel: Qw,
  save: Xw,
  saveSuccess: Jw,
  saveFailed: Zw,
  nameRequired: eC,
  nameLength: oC,
  phoneRequired: tC,
  phoneFormat: nC,
  working: rC,
  resting: sC,
  phoneNumber: aC,
  completedOrders: cC,
  abnormalOrders: iC,
  refundOrders: lC,
  positiveRate: dC,
  personalProfile: uC,
  qualificationCertificate: pC,
  loadFailed: mC,
  noIntroduction: fC,
  skills: gC,
  experience_years: hC,
  service_orders: _C,
  maxUploadImages: yC,
  uploadFailed: $C,
  avatarRequired: vC,
  introductionRequired: bC,
  introductionLength: TC,
  saving: PC
}, mfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOrders: iC,
  avatarRequired: vC,
  cancel: Qw,
  changeAvatar: Uw,
  completedOrders: cC,
  default: pfe,
  edit: Hw,
  editTechnicianInfo: Bw,
  experience_years: hC,
  introductionLength: TC,
  introductionRequired: bC,
  loadFailed: mC,
  maxUploadImages: yC,
  name: Ww,
  nameLength: oC,
  nameRequired: eC,
  noIntroduction: fC,
  personalProfile: uC,
  phone: qw,
  phoneFormat: nC,
  phoneNumber: aC,
  phoneRequired: tC,
  pleaseEnterIntroduction: Kw,
  pleaseEnterName: Gw,
  pleaseEnterPhone: Yw,
  positiveRate: dC,
  qualificationCertificate: pC,
  refundOrders: lC,
  resting: sC,
  save: Xw,
  saveFailed: Zw,
  saveSuccess: Jw,
  saving: PC,
  selfIntroduction: Vw,
  service_orders: _C,
  skills: gC,
  technicianDetail: Lw,
  uploadFailed: $C,
  working: rC
}, Symbol.toStringTag, { value: "Module" })), SC = "反馈标题", OC = "反馈内容", wC = "上传图片（选填）", CC = "提交反馈", MC = "请输入反馈标题", jC = "请详细描述您遇到的问题或建议", AC = "反馈内容请至少输入10个字符", kC = "反馈提交成功，感谢您的建议", IC = "反馈提交失败", NC = "网络错误，请稍后重试", ffe = {
  feedbackTitle: SC,
  feedbackContent: OC,
  uploadImage: wC,
  submitFeedback: CC,
  pleaseInputFeedbackTitle: MC,
  pleaseDescribeIssue: jC,
  feedbackContentMinLength: AC,
  feedbackSubmitSuccess: kC,
  feedbackSubmitFail: IC,
  networkError: NC
}, gfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ffe,
  feedbackContent: OC,
  feedbackContentMinLength: AC,
  feedbackSubmitFail: IC,
  feedbackSubmitSuccess: kC,
  feedbackTitle: SC,
  networkError: NC,
  pleaseDescribeIssue: jC,
  pleaseInputFeedbackTitle: MC,
  submitFeedback: CC,
  uploadImage: wC
}, Symbol.toStringTag, { value: "Module" })), DC = "帮助详情", EC = "加载中...", xC = "浏览次数", RC = "更新时间", zC = "暂无数据", FC = "缺少帮助文档ID", LC = "网络错误，请稍后重试", hfe = {
  helpDetail: DC,
  loading: EC,
  viewsCount: xC,
  updateTime: RC,
  noData: zC,
  missingId: FC,
  networkError: LC
}, _fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hfe,
  helpDetail: DC,
  loading: EC,
  missingId: FC,
  networkError: LC,
  noData: zC,
  updateTime: RC,
  viewsCount: xC
}, Symbol.toStringTag, { value: "Module" })), HC = "帮助中心", BC = "操作答疑", UC = "操作步骤", WC = "管理平台", qC = "佣金分成与支付", VC = "常见问题", GC = "问题分类", YC = "联系客服", KC = "没有更多内容啦~", yfe = {
  helpCenter: HC,
  operationFAQ: BC,
  operationSteps: UC,
  managementPlatform: WC,
  commissionPayment: qC,
  commonProblems: VC,
  problemCategories: GC,
  contactService: YC,
  noMoreContent: KC
}, $fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  commissionPayment: qC,
  commonProblems: VC,
  contactService: YC,
  default: yfe,
  helpCenter: HC,
  managementPlatform: WC,
  noMoreContent: KC,
  operationFAQ: BC,
  operationSteps: UC,
  problemCategories: GC
}, Symbol.toStringTag, { value: "Module" })), QC = "机构名称", XC = "今日收入(元)", JC = "我的账户", ZC = "今日完成单量(单)", eM = "订单统计", oM = "违规申诉", tM = "我的评价", nM = "所属机构", rM = "机构信息", sM = "排班管理", aM = "请假", cM = "服务分析", iM = "服务数据", lM = "设置", dM = "工作必备", uM = "客户服务", pM = "个人资料", mM = "帮助中心", fM = "区域排名", vfe = {
  storeName: QC,
  todayMoney: XC,
  myAccount: JC,
  orderFinshNumber: ZC,
  orderNumber: eM,
  ViolationAppeal: oM,
  MyReview: tM,
  store: nM,
  storeInfo: rM,
  workTime: sM,
  levalWork: aM,
  ServiceAnalysis: cM,
  servicesData: iM,
  set: lM,
  workTools: dM,
  kefuServices: uM,
  memberInfo: pM,
  helpCenter: mM,
  areaData: fM
}, bfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MyReview: tM,
  ServiceAnalysis: cM,
  ViolationAppeal: oM,
  areaData: fM,
  default: vfe,
  helpCenter: mM,
  kefuServices: uM,
  levalWork: aM,
  memberInfo: pM,
  myAccount: JC,
  orderFinshNumber: ZC,
  orderNumber: eM,
  servicesData: iM,
  set: lM,
  store: nM,
  storeInfo: rM,
  storeName: QC,
  todayMoney: XC,
  workTime: sM,
  workTools: dM
}, Symbol.toStringTag, { value: "Module" })), gM = "已评价", hM = "综合", _M = "时间", yM = "暂无评价", $M = "发布于", vM = "服务信息", bM = "评价内容", TM = "加载失败", Tfe = {
  evaluated: gM,
  comprehensive: hM,
  time: _M,
  noEvaluation: yM,
  published: $M,
  serviceInfo: vM,
  evaluationContent: bM,
  loadFailed: TM
}, Pfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  comprehensive: hM,
  default: Tfe,
  evaluated: gM,
  evaluationContent: bM,
  loadFailed: TM,
  noEvaluation: yM,
  published: $M,
  serviceInfo: vM,
  time: _M
}, Symbol.toStringTag, { value: "Module" })), PM = "订单统计", SM = "今日订单", OM = "月订单", wM = "待服务订单", CM = "待验收订单", MM = "已完成订单", jM = "订单明细", AM = "已完成", kM = "退款/售后", IM = "已关闭", NM = "开锁服务", DM = "订单编号：", Sfe = {
  title: PM,
  todayOrders: SM,
  monthOrders: OM,
  pendingService: wM,
  pendingAcceptance: CM,
  completedOrders: MM,
  orderDetails: jM,
  completed: AM,
  refund: kM,
  cancelled: IM,
  serviceType: NM,
  orderNumber: DM
}, Ofe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelled: IM,
  completed: AM,
  completedOrders: MM,
  default: Sfe,
  monthOrders: OM,
  orderDetails: jM,
  orderNumber: DM,
  pendingAcceptance: CM,
  pendingService: wM,
  refund: kM,
  serviceType: NM,
  title: PM,
  todayOrders: SM
}, Symbol.toStringTag, { value: "Module" })), EM = "区域师傅排名", xM = "机构师傅排名", RM = "加载中...", wfe = {
  regionTechnicianRank: EM,
  storeTechnicianRank: xM,
  loading: RM
}, Cfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wfe,
  loading: RM,
  regionTechnicianRank: EM,
  storeTechnicianRank: xM
}, Symbol.toStringTag, { value: "Module" })), zM = "排班管理", FM = "排班管理日历", LM = "休息时间安排", HM = "开始时间", BM = "结束时间", UM = "请假原因", WM = "个人事务", qM = "身体不适", VM = "家庭原因", GM = "其他原因", YM = "培训学习", KM = "临时有事", QM = "取消", XM = "确定", JM = "日", ZM = "一", ej = "二", oj = "三", tj = "四", nj = "五", rj = "六", Mfe = {
  title: zM,
  calendarTitle: FM,
  restTimeArrangement: LM,
  startTime: HM,
  endTime: BM,
  leaveReason: UM,
  personalAffairs: WM,
  physicalDiscomfort: qM,
  familyReason: VM,
  otherReason: GM,
  trainingStudy: YM,
  temporaryMatter: KM,
  cancel: QM,
  confirm: XM,
  sunday: JM,
  monday: ZM,
  tuesday: ej,
  wednesday: oj,
  thursday: tj,
  friday: nj,
  saturday: rj
}, jfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calendarTitle: FM,
  cancel: QM,
  confirm: XM,
  default: Mfe,
  endTime: BM,
  familyReason: VM,
  friday: nj,
  leaveReason: UM,
  monday: ZM,
  otherReason: GM,
  personalAffairs: WM,
  physicalDiscomfort: qM,
  restTimeArrangement: LM,
  saturday: rj,
  startTime: HM,
  sunday: JM,
  temporaryMatter: KM,
  thursday: tj,
  title: zM,
  trainingStudy: YM,
  tuesday: ej,
  wednesday: oj
}, Symbol.toStringTag, { value: "Module" })), sj = "机构资料", aj = "基本信息", cj = "机构名称", ij = "机构人数", lj = "联系方式", dj = "负责人", uj = "联系电话", pj = "地址信息", mj = "地图加载中...", fj = "认证状态", gj = "营业执照", hj = "身份认证", _j = "地址认证", yj = "已完成", $j = "未完成", vj = "获取数据失败", Afe = {
  pageTitle: sj,
  basicInfo: aj,
  storeName: cj,
  storeStaff: ij,
  contactInfo: lj,
  manager: dj,
  contactPhone: uj,
  addressInfo: pj,
  mapLoading: mj,
  authenticationStatus: fj,
  businessLicense: gj,
  idAuthentication: hj,
  addressAuthentication: _j,
  completed: yj,
  uncompleted: $j,
  fetchFailed: vj
}, kfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addressAuthentication: _j,
  addressInfo: pj,
  authenticationStatus: fj,
  basicInfo: aj,
  businessLicense: gj,
  completed: yj,
  contactInfo: lj,
  contactPhone: uj,
  default: Afe,
  fetchFailed: vj,
  idAuthentication: hj,
  manager: dj,
  mapLoading: mj,
  pageTitle: sj,
  storeName: cj,
  storeStaff: ij,
  uncompleted: $j
}, Symbol.toStringTag, { value: "Module" })), bj = "暂无数据", Ife = {
  nothingMore: bj
}, Nfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ife,
  nothingMore: bj
}, Symbol.toStringTag, { value: "Module" })), Tj = "增项服务", Pj = "全部", Sj = "待付款", Oj = "已付款", wj = "共{count}件", Cj = "附加服务费用", Mj = "可添加服务", jj = "添加前请与客户沟通好购买意向", Aj = "已选{count}件", kj = "服务费", Ij = "服务费用：", Nj = "请输入", Dj = "确定并提交", Ej = "请输入大于0的金额", xj = "加载失败", Rj = "实付款", zj = "服务费是师傅完成服务后的收入", Dfe = {
  pageTitle: Tj,
  tabAll: Pj,
  tabUnpaid: Sj,
  tabPaid: Oj,
  totalItems: wj,
  additionalServiceFee: Cj,
  availableServices: Mj,
  serviceCommunicationTip: jj,
  selectedItems: Aj,
  serviceFee: kj,
  serviceFeeLabel: Ij,
  inputPlaceholder: Nj,
  submitButton: Dj,
  positiveAmountError: Ej,
  loadFailed: xj,
  realMoney: Rj,
  serviceFeeDescription: zj
}, Efe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  additionalServiceFee: Cj,
  availableServices: Mj,
  default: Dfe,
  inputPlaceholder: Nj,
  loadFailed: xj,
  pageTitle: Tj,
  positiveAmountError: Ej,
  realMoney: Rj,
  selectedItems: Aj,
  serviceCommunicationTip: jj,
  serviceFee: kj,
  serviceFeeDescription: zj,
  serviceFeeLabel: Ij,
  submitButton: Dj,
  tabAll: Pj,
  tabPaid: Oj,
  tabUnpaid: Sj,
  totalItems: wj
}, Symbol.toStringTag, { value: "Module" })), Fj = "订单", Lj = "下单", Hj = "接单", Bj = "开始", Uj = "完成", Wj = "已支付", qj = "未支付", Vj = "查看退款", Gj = "申请退款", Yj = "去支付", Kj = "查看", Qj = "服务人员", Xj = "待派单", Jj = "联系电话", Zj = "服务码", eA = "注:服务人员上门时需提供", oA = "订单编号", tA = "交易流水号", nA = "创建时间", rA = "上门时间", sA = "买家留言", aA = "支付方式", cA = "支付时间", iA = "项目金额", lA = "实付", dA = "首页", uA = "刷新", pA = "客服", mA = "收藏", fA = "没有更多内容啦~", gA = "的帮付", hA = "导航", _A = "优惠金额", yA = "上门费用", $A = "单", vA = "订单未开始服务", bA = "服务人员已确定出发", TA = "服务人员已打卡拍照", PA = "查看打卡照片", SA = "服务时长总计", OA = "预", wA = "您有", CA = "个订单已超时", MA = "个订单即将超时,请尽快处理!", jA = "服务项目", AA = "备注：", kA = "订单收入", IA = "附加服务", NA = "服务费", DA = "附加服务费用", EA = "师傅完成服务后的预估收入", xA = "附加服务费用是指新增附加服务的收入", RA = "其他信息", zA = "复制", FA = "未获取到订单信息", LA = "打卡照片", HA = "加载失败", BA = "天", UA = "地图打开成功", WA = "打开地图失败，请检查是否安装地图应用", qA = "提示", VA = "您确定要取消该订单吗？", GA = "取消成功", YA = "取消失败", KA = "您确定要删除该订单吗？", QA = "删除成功", XA = "删除失败", JA = "待服务", ZA = "服务中", ek = "已完成", ok = "异常订单", tk = "服务费是师傅完成服务后的收入", xfe = {
  order: Fj,
  placeOrder: Lj,
  takeOrders: Hj,
  start: Bj,
  finish: Uj,
  havePaid: Wj,
  notPaid: qj,
  viewRefund: Vj,
  applyRefund: Gj,
  goToPay: Yj,
  show: Kj,
  servicePersonal: Qj,
  orderToBeSent: Xj,
  contactNumber: Jj,
  serviceCode: Zj,
  explain: eA,
  onOrder: oA,
  transactionNumber: tA,
  createTime: nA,
  reserveServiceTime: rA,
  remark: sA,
  modePayment: aA,
  payTime: cA,
  goodsMoney: iA,
  realMoney: lA,
  index: dA,
  refresh: uA,
  service: pA,
  collect: mA,
  nothingMore: fA,
  helpPay: gA,
  Navigation: hA,
  couponMoney: _A,
  doorMonrey: yA,
  orderUnit: $A,
  orderNotStarted: vA,
  servicePersonDeparted: bA,
  servicePersonCheckedIn: TA,
  viewCheckInPhotos: PA,
  totalServiceDuration: SA,
  pre: OA,
  youHave: wA,
  ordersOverdue: CA,
  ordersAboutToOverdue: MA,
  serviceItems: jA,
  remarkPrefix: AA,
  orderIncome: kA,
  additionalService: IA,
  serviceFee: NA,
  additionalServiceFee: DA,
  serviceFeeDesc: EA,
  additionalServiceFeeDesc: xA,
  otherInformation: RA,
  copy: zA,
  noOrderInfo: FA,
  checkInPhotos: LA,
  loadFailed: HA,
  day: BA,
  mapOpenedSuccessfully: UA,
  mapOpenFailed: WA,
  prompt: qA,
  confirmCancelOrder: VA,
  cancelSuccess: GA,
  cancelFailed: YA,
  confirmDeleteOrder: KA,
  deleteSuccess: QA,
  deleteFailed: XA,
  waitingService: JA,
  inService: ZA,
  completed: ek,
  abnormalOrder: ok,
  serviceFeeDescription: tk
}, Rfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: hA,
  abnormalOrder: ok,
  additionalService: IA,
  additionalServiceFee: DA,
  additionalServiceFeeDesc: xA,
  applyRefund: Gj,
  cancelFailed: YA,
  cancelSuccess: GA,
  checkInPhotos: LA,
  collect: mA,
  completed: ek,
  confirmCancelOrder: VA,
  confirmDeleteOrder: KA,
  contactNumber: Jj,
  copy: zA,
  couponMoney: _A,
  createTime: nA,
  day: BA,
  default: xfe,
  deleteFailed: XA,
  deleteSuccess: QA,
  doorMonrey: yA,
  explain: eA,
  finish: Uj,
  goToPay: Yj,
  goodsMoney: iA,
  havePaid: Wj,
  helpPay: gA,
  inService: ZA,
  index: dA,
  loadFailed: HA,
  mapOpenFailed: WA,
  mapOpenedSuccessfully: UA,
  modePayment: aA,
  noOrderInfo: FA,
  notPaid: qj,
  nothingMore: fA,
  onOrder: oA,
  order: Fj,
  orderIncome: kA,
  orderNotStarted: vA,
  orderToBeSent: Xj,
  orderUnit: $A,
  ordersAboutToOverdue: MA,
  ordersOverdue: CA,
  otherInformation: RA,
  payTime: cA,
  placeOrder: Lj,
  pre: OA,
  prompt: qA,
  realMoney: lA,
  refresh: uA,
  remark: sA,
  remarkPrefix: AA,
  reserveServiceTime: rA,
  service: pA,
  serviceCode: Zj,
  serviceFee: NA,
  serviceFeeDesc: EA,
  serviceFeeDescription: tk,
  serviceItems: jA,
  servicePersonCheckedIn: TA,
  servicePersonDeparted: bA,
  servicePersonal: Qj,
  show: Kj,
  start: Bj,
  takeOrders: Hj,
  totalServiceDuration: SA,
  transactionNumber: tA,
  viewCheckInPhotos: PA,
  viewRefund: Vj,
  waitingService: JA,
  youHave: wA
}, Symbol.toStringTag, { value: "Module" })), nk = "订单", rk = "下单", sk = "接单", ak = "开始", ck = "完成", ik = "已支付", lk = "未支付", dk = "查看退款", uk = "申请退款", pk = "去支付", mk = "查看", fk = "服务人员", gk = "待派单", hk = "联系电话", _k = "服务码", yk = "注:服务人员上门时需提供", $k = "订单编号", vk = "交易流水号", bk = "创建时间", Tk = "上门时间", Pk = "买家留言", Sk = "支付方式", Ok = "支付时间", wk = "项目金额", Ck = "实付", Mk = "首页", jk = "刷新", Ak = "客服", kk = "收藏", Ik = "没有更多内容啦~", Nk = "的帮付", Dk = "导航", Ek = "优惠金额", xk = "上门费用", Rk = "单", zk = "订单未开始服务", Fk = "服务人员已确定出发", Lk = "服务人员已打卡拍照", Hk = "查看打卡照片", Bk = "服务时长总计", Uk = "预", Wk = "您有", qk = "个订单已超时", Vk = "个订单即将超时,请尽快处理!", Gk = "服务项目", Yk = "备注：", Kk = "订单收入", Qk = "附加服务", Xk = "服务费", Jk = "附加服务费用", Zk = "师傅完成服务后的预估收入", eI = "附加服务费用是指新增附加服务的收入", oI = "其他信息", tI = "复制", nI = "未获取到订单信息", rI = "打卡照片", sI = "加载失败", aI = "天", cI = "地图打开成功", iI = "打开地图失败，请检查是否安装地图应用", lI = "提示", dI = "您确定要取消该订单吗？", uI = "取消成功", pI = "取消失败", mI = "您确定要删除该订单吗？", fI = "删除成功", gI = "删除失败", hI = "待服务", _I = "服务中", yI = "已完成", $I = "异常订单", vI = "服务费是师傅完成服务后的收入", zfe = {
  order: nk,
  placeOrder: rk,
  takeOrders: sk,
  start: ak,
  finish: ck,
  havePaid: ik,
  notPaid: lk,
  viewRefund: dk,
  applyRefund: uk,
  goToPay: pk,
  show: mk,
  servicePersonal: fk,
  orderToBeSent: gk,
  contactNumber: hk,
  serviceCode: _k,
  explain: yk,
  onOrder: $k,
  transactionNumber: vk,
  createTime: bk,
  reserveServiceTime: Tk,
  remark: Pk,
  modePayment: Sk,
  payTime: Ok,
  goodsMoney: wk,
  realMoney: Ck,
  index: Mk,
  refresh: jk,
  service: Ak,
  collect: kk,
  nothingMore: Ik,
  helpPay: Nk,
  Navigation: Dk,
  couponMoney: Ek,
  doorMonrey: xk,
  orderUnit: Rk,
  orderNotStarted: zk,
  servicePersonDeparted: Fk,
  servicePersonCheckedIn: Lk,
  viewCheckInPhotos: Hk,
  totalServiceDuration: Bk,
  pre: Uk,
  youHave: Wk,
  ordersOverdue: qk,
  ordersAboutToOverdue: Vk,
  serviceItems: Gk,
  remarkPrefix: Yk,
  orderIncome: Kk,
  additionalService: Qk,
  serviceFee: Xk,
  additionalServiceFee: Jk,
  serviceFeeDesc: Zk,
  additionalServiceFeeDesc: eI,
  otherInformation: oI,
  copy: tI,
  noOrderInfo: nI,
  checkInPhotos: rI,
  loadFailed: sI,
  day: aI,
  mapOpenedSuccessfully: cI,
  mapOpenFailed: iI,
  prompt: lI,
  confirmCancelOrder: dI,
  cancelSuccess: uI,
  cancelFailed: pI,
  confirmDeleteOrder: mI,
  deleteSuccess: fI,
  deleteFailed: gI,
  waitingService: hI,
  inService: _I,
  completed: yI,
  abnormalOrder: $I,
  serviceFeeDescription: vI
}, Ffe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: Dk,
  abnormalOrder: $I,
  additionalService: Qk,
  additionalServiceFee: Jk,
  additionalServiceFeeDesc: eI,
  applyRefund: uk,
  cancelFailed: pI,
  cancelSuccess: uI,
  checkInPhotos: rI,
  collect: kk,
  completed: yI,
  confirmCancelOrder: dI,
  confirmDeleteOrder: mI,
  contactNumber: hk,
  copy: tI,
  couponMoney: Ek,
  createTime: bk,
  day: aI,
  default: zfe,
  deleteFailed: gI,
  deleteSuccess: fI,
  doorMonrey: xk,
  explain: yk,
  finish: ck,
  goToPay: pk,
  goodsMoney: wk,
  havePaid: ik,
  helpPay: Nk,
  inService: _I,
  index: Mk,
  loadFailed: sI,
  mapOpenFailed: iI,
  mapOpenedSuccessfully: cI,
  modePayment: Sk,
  noOrderInfo: nI,
  notPaid: lk,
  nothingMore: Ik,
  onOrder: $k,
  order: nk,
  orderIncome: Kk,
  orderNotStarted: zk,
  orderToBeSent: gk,
  orderUnit: Rk,
  ordersAboutToOverdue: Vk,
  ordersOverdue: qk,
  otherInformation: oI,
  payTime: Ok,
  placeOrder: rk,
  pre: Uk,
  prompt: lI,
  realMoney: Ck,
  refresh: jk,
  remark: Pk,
  remarkPrefix: Yk,
  reserveServiceTime: Tk,
  service: Ak,
  serviceCode: _k,
  serviceFee: Xk,
  serviceFeeDesc: Zk,
  serviceFeeDescription: vI,
  serviceItems: Gk,
  servicePersonCheckedIn: Lk,
  servicePersonDeparted: Fk,
  servicePersonal: fk,
  show: mk,
  start: ak,
  takeOrders: sk,
  totalServiceDuration: Bk,
  transactionNumber: vk,
  viewCheckInPhotos: Hk,
  viewRefund: dk,
  waitingService: hI,
  youHave: Wk
}, Symbol.toStringTag, { value: "Module" })), bI = "订单", TI = "下单", PI = "接单", SI = "开始", OI = "完成", wI = "已支付", CI = "未支付", MI = "查看退款", jI = "申请退款", AI = "去支付", kI = "查看", II = "服务人员", NI = "待派单", DI = "联系电话", EI = "服务码", xI = "注:服务人员上门时需提供", RI = "订单编号", zI = "交易流水号", FI = "创建时间", LI = "上门时间", HI = "买家留言", BI = "支付方式", UI = "支付时间", WI = "项目金额", qI = "实付", VI = "首页", GI = "刷新", YI = "客服", KI = "收藏", QI = "没有更多内容啦~", XI = "的帮付", JI = "导航", ZI = "优惠金额", eN = "上门费用", oN = "单", tN = "订单未开始服务", nN = "服务人员已确定出发", rN = "服务人员已打卡拍照", sN = "查看打卡照片", aN = "服务时长总计", cN = "预", iN = "您有", lN = "个订单已超时", dN = "个订单即将超时,请尽快处理!", uN = "服务项目", pN = "备注：", mN = "订单收入", fN = "附加服务", gN = "服务费", hN = "附加服务费用", _N = "师傅完成服务后的预估收入", yN = "附加服务费用是指新增附加服务的收入", $N = "其他信息", vN = "复制", bN = "未获取到订单信息", TN = "打卡照片", PN = "加载失败", SN = "天", ON = "地图打开成功", wN = "打开地图失败，请检查是否安装地图应用", CN = "提示", MN = "您确定要取消该订单吗？", jN = "取消成功", AN = "取消失败", kN = "您确定要删除该订单吗？", IN = "删除成功", NN = "删除失败", DN = "待服务", EN = "服务中", xN = "已完成", RN = "异常订单", zN = "服务费是师傅完成服务后的收入", Lfe = {
  order: bI,
  placeOrder: TI,
  takeOrders: PI,
  start: SI,
  finish: OI,
  havePaid: wI,
  notPaid: CI,
  viewRefund: MI,
  applyRefund: jI,
  goToPay: AI,
  show: kI,
  servicePersonal: II,
  orderToBeSent: NI,
  contactNumber: DI,
  serviceCode: EI,
  explain: xI,
  onOrder: RI,
  transactionNumber: zI,
  createTime: FI,
  reserveServiceTime: LI,
  remark: HI,
  modePayment: BI,
  payTime: UI,
  goodsMoney: WI,
  realMoney: qI,
  index: VI,
  refresh: GI,
  service: YI,
  collect: KI,
  nothingMore: QI,
  helpPay: XI,
  Navigation: JI,
  couponMoney: ZI,
  doorMonrey: eN,
  orderUnit: oN,
  orderNotStarted: tN,
  servicePersonDeparted: nN,
  servicePersonCheckedIn: rN,
  viewCheckInPhotos: sN,
  totalServiceDuration: aN,
  pre: cN,
  youHave: iN,
  ordersOverdue: lN,
  ordersAboutToOverdue: dN,
  serviceItems: uN,
  remarkPrefix: pN,
  orderIncome: mN,
  additionalService: fN,
  serviceFee: gN,
  additionalServiceFee: hN,
  serviceFeeDesc: _N,
  additionalServiceFeeDesc: yN,
  otherInformation: $N,
  copy: vN,
  noOrderInfo: bN,
  checkInPhotos: TN,
  loadFailed: PN,
  day: SN,
  mapOpenedSuccessfully: ON,
  mapOpenFailed: wN,
  prompt: CN,
  confirmCancelOrder: MN,
  cancelSuccess: jN,
  cancelFailed: AN,
  confirmDeleteOrder: kN,
  deleteSuccess: IN,
  deleteFailed: NN,
  waitingService: DN,
  inService: EN,
  completed: xN,
  abnormalOrder: RN,
  serviceFeeDescription: zN
}, Hfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: JI,
  abnormalOrder: RN,
  additionalService: fN,
  additionalServiceFee: hN,
  additionalServiceFeeDesc: yN,
  applyRefund: jI,
  cancelFailed: AN,
  cancelSuccess: jN,
  checkInPhotos: TN,
  collect: KI,
  completed: xN,
  confirmCancelOrder: MN,
  confirmDeleteOrder: kN,
  contactNumber: DI,
  copy: vN,
  couponMoney: ZI,
  createTime: FI,
  day: SN,
  default: Lfe,
  deleteFailed: NN,
  deleteSuccess: IN,
  doorMonrey: eN,
  explain: xI,
  finish: OI,
  goToPay: AI,
  goodsMoney: WI,
  havePaid: wI,
  helpPay: XI,
  inService: EN,
  index: VI,
  loadFailed: PN,
  mapOpenFailed: wN,
  mapOpenedSuccessfully: ON,
  modePayment: BI,
  noOrderInfo: bN,
  notPaid: CI,
  nothingMore: QI,
  onOrder: RI,
  order: bI,
  orderIncome: mN,
  orderNotStarted: tN,
  orderToBeSent: NI,
  orderUnit: oN,
  ordersAboutToOverdue: dN,
  ordersOverdue: lN,
  otherInformation: $N,
  payTime: UI,
  placeOrder: TI,
  pre: cN,
  prompt: CN,
  realMoney: qI,
  refresh: GI,
  remark: HI,
  remarkPrefix: pN,
  reserveServiceTime: LI,
  service: YI,
  serviceCode: EI,
  serviceFee: gN,
  serviceFeeDesc: _N,
  serviceFeeDescription: zN,
  serviceItems: uN,
  servicePersonCheckedIn: rN,
  servicePersonDeparted: nN,
  servicePersonal: II,
  show: kI,
  start: SI,
  takeOrders: PI,
  totalServiceDuration: aN,
  transactionNumber: zI,
  viewCheckInPhotos: sN,
  viewRefund: MI,
  waitingService: DN,
  youHave: iN
}, Symbol.toStringTag, { value: "Module" })), FN = "新任务", LN = "筛选", HN = "刷新", BN = "重置", UN = "收入", WN = "服务类型", qN = "服务距离", VN = "确定", GN = "我要抢单", YN = "订单编号", KN = "订单收入", QN = "预估收入", XN = "客户", JN = "服务", ZN = "导航", eD = "确定出发", oD = "开始服务", tD = "打卡", nD = "附加服务", rD = "结束服务", sD = "暂无数据", Bfe = {
  newJob: FN,
  sort: LN,
  calcation: HN,
  reset: BN,
  money: UN,
  serviceType: WN,
  serviceDistance: qN,
  confrim: VN,
  getOrder: GN,
  orderNoTit: YN,
  orderCommsion: KN,
  ProjectedRevenue: QN,
  user: XN,
  services: JN,
  Navigation: ZN,
  confirmGoOut: eD,
  speakServices: oD,
  callCard: tD,
  addServices: nD,
  endServices: rD,
  nothingMore: sD
}, Ufe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: ZN,
  ProjectedRevenue: QN,
  addServices: nD,
  calcation: HN,
  callCard: tD,
  confirmGoOut: eD,
  confrim: VN,
  default: Bfe,
  endServices: rD,
  getOrder: GN,
  money: UN,
  newJob: FN,
  nothingMore: sD,
  orderCommsion: KN,
  orderNoTit: YN,
  reset: BN,
  serviceDistance: qN,
  serviceType: WN,
  services: JN,
  sort: LN,
  speakServices: oD,
  user: XN
}, Symbol.toStringTag, { value: "Module" })), aD = "联系人", cD = "请输入联系人姓名", iD = "手机号码", lD = "请输入手机号码", dD = "请输入正确的手机号", uD = "选择地区", pD = "请选择地区", mD = "详细地址", fD = "请填写详细地址", gD = "设为默认地址", hD = "没有更多内容啦~", Wfe = {
  name: aD,
  namePlaceholder: cD,
  mobile: iD,
  mobilePlaceholder: lD,
  mobileError: dD,
  selectArea: uD,
  selectAreaPlaceholder: pD,
  address: mD,
  addressPlaceholder: fD,
  defaultAddress: gD,
  nothingMore: hD
}, qfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: mD,
  addressPlaceholder: fD,
  default: Wfe,
  defaultAddress: gD,
  mobile: iD,
  mobileError: dD,
  mobilePlaceholder: lD,
  name: aD,
  namePlaceholder: cD,
  nothingMore: hD,
  selectArea: uD,
  selectAreaPlaceholder: pD
}, Symbol.toStringTag, { value: "Module" })), _D = "联系人", yD = "请输入联系人姓名", $D = "手机号码", vD = "请输入手机号码", bD = "上门地址", TD = "选择地址", PD = "请选择地址", SD = "详细地址", OD = "详细地址如 1单元101", wD = "请填写门牌号", CD = "设为默认地址", MD = "修改", jD = "保存", AD = "没有更多内容啦~", Vfe = {
  name: _D,
  namePlaceholder: yD,
  mobile: $D,
  mobilePlaceholder: vD,
  homeAddress: bD,
  selectAddress: TD,
  selectAddressPlaceholder: PD,
  address: SD,
  addressPlaceholder: OD,
  addressError: wD,
  defaultAddress: CD,
  update: MD,
  save: jD,
  nothingMore: AD
}, Gfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: SD,
  addressError: wD,
  addressPlaceholder: OD,
  default: Vfe,
  defaultAddress: CD,
  homeAddress: bD,
  mobile: $D,
  mobilePlaceholder: vD,
  name: _D,
  namePlaceholder: yD,
  nothingMore: AD,
  save: jD,
  selectAddress: TD,
  selectAddressPlaceholder: PD,
  update: MD
}, Symbol.toStringTag, { value: "Module" })), kD = "没有更多内容啦~", ID = "添加上门地址", Yfe = {
  default: "默认地址",
  noHomeAddress: kD,
  addHomeAddress: ID
}, Kfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: ID,
  default: Yfe,
  noHomeAddress: kD
}, Symbol.toStringTag, { value: "Module" })), ND = "人选择", DD = "已选", ED = "次", xD = "暂无项目介绍", RD = "暂无购买须知", zD = "暂无更多数据", FD = "项目名称", LD = "价格", HD = "单位", BD = "暂无价目表", UD = "首页", WD = "分享", qD = "客服", VD = "立即预约", GD = "立即购买", YD = "已下架", KD = "没有更多内容啦~", QD = "随叫随到，最快30分钟上门", XD = "服务保障", JD = "附近服务人员", ZD = "查看", eE = "用户评价", oE = "推荐套餐", tE = "项目详情", nE = "单独购买", Qfe = {
  selectNum: ND,
  selected: DD,
  time: ED,
  noProjectInt: xD,
  noPurchase: RD,
  noMore: zD,
  projectName: FD,
  price: LD,
  unit: HD,
  noPriceList: BD,
  index: UD,
  share: WD,
  service: qD,
  bookNow: VD,
  orderNow: GD,
  delisted: YD,
  nothingMore: KD,
  timeWarning: QD,
  serviceSafe: XD,
  serviceTechnican: JD,
  lookMore: ZD,
  userEvaluate: eE,
  recommedGoods: oE,
  detailText: tE,
  selfBuy: nE
}, Xfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: VD,
  default: Qfe,
  delisted: YD,
  detailText: tE,
  index: UD,
  lookMore: ZD,
  noMore: zD,
  noPriceList: BD,
  noProjectInt: xD,
  noPurchase: RD,
  nothingMore: KD,
  orderNow: GD,
  price: LD,
  projectName: FD,
  recommedGoods: oE,
  selectNum: ND,
  selected: DD,
  selfBuy: nE,
  service: qD,
  serviceSafe: XD,
  serviceTechnican: JD,
  share: WD,
  time: ED,
  timeWarning: QD,
  unit: HD,
  userEvaluate: eE
}, Symbol.toStringTag, { value: "Module" })), rE = "我的次卡", Jfe = {
  myCard: rE
}, Zfe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jfe,
  myCard: rE
}, Symbol.toStringTag, { value: "Module" })), sE = "请输入搜索关键词", aE = "全部分类", cE = "预约", iE = "已售", lE = "没有更多内容啦~", ege = {
  searchKeywordPlaceholder: sE,
  allCategory: aE,
  reserveBtn: cE,
  soldOut: iE,
  nothingMore: lE
}, oge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: aE,
  default: ege,
  nothingMore: lE,
  reserveBtn: cE,
  searchKeywordPlaceholder: sE,
  soldOut: iE
}, Symbol.toStringTag, { value: "Module" })), dE = "人选择", uE = "已选", pE = "次", mE = "暂无项目介绍", fE = "暂无购买须知", gE = "暂无更多数据", hE = "项目名称", _E = "价格", yE = "单位", $E = "暂无价目表", vE = "首页", bE = "分享", TE = "客服", PE = "立即预约", SE = "立即购买", OE = "已下架", wE = "没有更多内容啦~", CE = "随叫随到 最快30分钟上门", ME = "服务保障", jE = "附近服务人员", AE = "查看", kE = "用户评价", IE = "推荐套餐", NE = "项目详情", DE = "单独购买", tge = {
  selectNum: dE,
  selected: uE,
  time: pE,
  noProjectInt: mE,
  noPurchase: fE,
  noMore: gE,
  projectName: hE,
  price: _E,
  unit: yE,
  noPriceList: $E,
  index: vE,
  share: bE,
  service: TE,
  bookNow: PE,
  orderNow: SE,
  delisted: OE,
  nothingMore: wE,
  timeWarning: CE,
  serviceSafe: ME,
  serviceTechnican: jE,
  lookMore: AE,
  userEvaluate: kE,
  recommedGoods: IE,
  detailText: NE,
  selfBuy: DE
}, nge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: PE,
  default: tge,
  delisted: OE,
  detailText: NE,
  index: vE,
  lookMore: AE,
  noMore: gE,
  noPriceList: $E,
  noProjectInt: mE,
  noPurchase: fE,
  nothingMore: wE,
  orderNow: SE,
  price: _E,
  projectName: hE,
  recommedGoods: IE,
  selectNum: dE,
  selected: uE,
  selfBuy: DE,
  service: TE,
  serviceSafe: ME,
  serviceTechnican: jE,
  share: bE,
  time: pE,
  timeWarning: CE,
  unit: yE,
  userEvaluate: kE
}, Symbol.toStringTag, { value: "Module" })), EE = "没有更多内容啦~", xE = "请搜索您想要的商品", RE = "综合", zE = "销量", FE = "价格", LE = "筛选", HE = "全部分类", BE = "已售", UE = "没有更多内容啦~", rge = {
  end: EE,
  searchPlaceholder: xE,
  synthesis: RE,
  sales: zE,
  price: FE,
  screen: LE,
  allCategory: HE,
  soldOut: BE,
  nothingMore: UE
}, sge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: HE,
  default: rge,
  end: EE,
  nothingMore: UE,
  price: FE,
  sales: zE,
  screen: LE,
  searchPlaceholder: xE,
  soldOut: BE,
  synthesis: RE
}, Symbol.toStringTag, { value: "Module" })), WE = "请输入搜索关键词", qE = "抢购", VE = "没有更多内容啦~", GE = "没有更多内容啦~", YE = "已售", KE = "订单号", QE = "实付款", XE = "详情", age = {
  searchNamePlaceholder: WE,
  reserveBtn: qE,
  nothingMore: VE,
  noHomeAddress: GE,
  soldOut: YE,
  orderNo: KE,
  actualPayment: QE,
  orderDetail: XE
}, cge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: QE,
  default: age,
  noHomeAddress: GE,
  nothingMore: VE,
  orderDetail: XE,
  orderNo: KE,
  reserveBtn: qE,
  searchNamePlaceholder: WE,
  soldOut: YE
}, Symbol.toStringTag, { value: "Module" })), JE = "订单数(个)", ZE = "订单金额(元)", ex = "订单管理", ox = "查看更多", tx = "待服务订单", nx = "服务中订单", rx = "已服务订单", sx = "数量：", ax = "查看详情", cx = "服务项目", ix = "加载中", lx = "没有更多内容啦~", ige = {
  orderNum: JE,
  orderAmount: ZE,
  orderManagement: ex,
  viewMore: ox,
  pendingOrder: tx,
  orderInService: nx,
  finishedOrder: rx,
  amount: sx,
  viewDetails: ax,
  serviceItem: cx,
  loadingText: ix,
  nothingMore: lx
}, lge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amount: sx,
  default: ige,
  finishedOrder: rx,
  loadingText: ix,
  nothingMore: lx,
  orderAmount: ZE,
  orderInService: nx,
  orderManagement: ex,
  orderNum: JE,
  pendingOrder: tx,
  serviceItem: cx,
  viewDetails: ax,
  viewMore: ox
}, Symbol.toStringTag, { value: "Module" })), dx = "添加服务项目", ux = "编辑服务项目", px = "服务项目", mx = "请输入服务项目", fx = "价格", gx = "请输入价格", hx = "元", _x = "项目图片", yx = "提交", $x = "加载中...", vx = "没有更多内容啦~", dge = {
  addServiceItem: dx,
  editServiceItem: ux,
  serviceItem: px,
  serviceItemPlaceholder: mx,
  price: fx,
  pricePlaceholder: gx,
  yuan: hx,
  serviceImg: _x,
  save: yx,
  loading: $x,
  nothingMore: vx
}, uge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: dx,
  default: dge,
  editServiceItem: ux,
  loading: $x,
  nothingMore: vx,
  price: fx,
  pricePlaceholder: gx,
  save: yx,
  serviceImg: _x,
  serviceItem: px,
  serviceItemPlaceholder: mx,
  yuan: hx
}, Symbol.toStringTag, { value: "Module" })), bx = "下单", Tx = "接单", Px = "开始", Sx = "完成", Ox = "服务日期:", wx = "新增服务项目", Cx = "已支付", Mx = "未支付", jx = "去支付", Ax = "查看", kx = "编辑", Ix = "订单信息", Nx = "订单编号", Dx = "联系人姓名", Ex = "联系电话", xx = "备注", Rx = "首页", zx = "联系客户", Fx = "刷新", Lx = "服务码", Hx = "没有更多内容啦~", Bx = "查看退款", pge = {
  placeOrder: bx,
  takeOrders: Tx,
  start: Px,
  finish: Sx,
  serviceDate: Ox,
  addServiceItem: wx,
  havePaid: Cx,
  notPaid: Mx,
  goToPay: jx,
  show: Ax,
  edit: kx,
  delete: "删除",
  orderInfo: Ix,
  orderNo: Nx,
  person: Dx,
  personTel: Ex,
  remark: xx,
  index: Rx,
  contact: zx,
  refresh: Fx,
  checkCode: Lx,
  nothingMore: Hx,
  viewRefund: Bx
}, mge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: wx,
  checkCode: Lx,
  contact: zx,
  default: pge,
  edit: kx,
  finish: Sx,
  goToPay: jx,
  havePaid: Cx,
  index: Rx,
  notPaid: Mx,
  nothingMore: Hx,
  orderInfo: Ix,
  orderNo: Nx,
  person: Dx,
  personTel: Ex,
  placeOrder: bx,
  refresh: Fx,
  remark: xx,
  serviceDate: Ox,
  show: Ax,
  start: Px,
  takeOrders: Tx,
  viewRefund: Bx
}, Symbol.toStringTag, { value: "Module" })), Ux = "服务日期:", Wx = "已支付", qx = "未支付", Vx = "联系客户", Gx = "服务码", Yx = "没有更多内容啦~", fge = {
  serviceDate: Ux,
  havePaid: Wx,
  notPaid: qx,
  contact: Vx,
  checkCode: Gx,
  nothingMore: Yx
}, gge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkCode: Gx,
  contact: Vx,
  default: fge,
  havePaid: Wx,
  notPaid: qx,
  nothingMore: Yx,
  serviceDate: Ux
}, Symbol.toStringTag, { value: "Module" })), Kx = "退款方式", Qx = "退款原因", Xx = "退款编号", Jx = "申请时间", Zx = "退款说明", e2 = "查看", o2 = "退款金额", t2 = "凭证", n2 = "没有更多内容啦~", hge = {
  refundType: Kx,
  refundCause: Qx,
  refundNo: Xx,
  createTime: Jx,
  createExplain: Zx,
  check: e2,
  refundMoney: o2,
  voucher: t2,
  nothingMore: n2
}, _ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  check: e2,
  createExplain: Zx,
  createTime: Jx,
  default: hge,
  nothingMore: n2,
  refundCause: Qx,
  refundMoney: o2,
  refundNo: Xx,
  refundType: Kx,
  voucher: t2
}, Symbol.toStringTag, { value: "Module" })), r2 = "查看服务项目", s2 = "服务项目", a2 = "价格", c2 = "元", i2 = "项目图片", l2 = "加载中...", d2 = "没有更多内容啦~", yge = {
  showServiceItem: r2,
  serviceItem: s2,
  price: a2,
  yuan: c2,
  serviceImg: i2,
  loading: l2,
  nothingMore: d2
}, $ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yge,
  loading: l2,
  nothingMore: d2,
  price: a2,
  serviceImg: i2,
  serviceItem: s2,
  showServiceItem: r2,
  yuan: c2
}, Symbol.toStringTag, { value: "Module" })), u2 = "我的收藏", p2 = "商品收藏", m2 = "师傅收藏", f2 = "售", g2 = "取消收藏成功", h2 = "取消收藏失败", _2 = "工作中", y2 = "休息中", $2 = "服务单", vge = {
  pageTitle: u2,
  goodsCollect: p2,
  technicianCollect: m2,
  sold: f2,
  delete: "删除",
  cancelCollectSuccess: g2,
  cancelCollectFail: h2,
  working: _2,
  resting: y2,
  serviceOrder: $2
}, bge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelCollectFail: h2,
  cancelCollectSuccess: g2,
  default: vge,
  goodsCollect: p2,
  pageTitle: u2,
  resting: y2,
  serviceOrder: $2,
  sold: f2,
  technicianCollect: m2,
  working: _2
}, Symbol.toStringTag, { value: "Module" })), v2 = "我的收藏", b2 = "商品收藏", T2 = "师傅收藏", P2 = "售", S2 = "取消收藏成功", O2 = "取消收藏失败", w2 = "工作中", C2 = "休息中", M2 = "服务{num}单", Tge = {
  pageTitle: v2,
  goodsCollect: b2,
  technicianCollect: T2,
  sold: P2,
  delete: "删除",
  cancelCollectSuccess: S2,
  cancelCollectFail: O2,
  working: w2,
  resting: C2,
  serviceOrder: M2
}, Pge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelCollectFail: O2,
  cancelCollectSuccess: S2,
  default: Tge,
  goodsCollect: b2,
  pageTitle: v2,
  resting: C2,
  serviceOrder: M2,
  sold: P2,
  technicianCollect: T2,
  working: w2
}, Symbol.toStringTag, { value: "Module" })), j2 = "反馈标题", A2 = "反馈内容", k2 = "上传图片（选填）", I2 = "提交反馈", N2 = "请输入反馈标题", D2 = "请详细描述您遇到的问题或建议", E2 = "反馈内容请至少输入10个字符", x2 = "反馈提交成功，感谢您的建议", R2 = "反馈提交失败", z2 = "网络错误，请稍后重试", Sge = {
  feedbackTitle: j2,
  feedbackContent: A2,
  uploadImage: k2,
  submitFeedback: I2,
  pleaseInputFeedbackTitle: N2,
  pleaseDescribeIssue: D2,
  feedbackContentMinLength: E2,
  feedbackSubmitSuccess: x2,
  feedbackSubmitFail: R2,
  networkError: z2
}, Oge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sge,
  feedbackContent: A2,
  feedbackContentMinLength: E2,
  feedbackSubmitFail: R2,
  feedbackSubmitSuccess: x2,
  feedbackTitle: j2,
  networkError: z2,
  pleaseDescribeIssue: D2,
  pleaseInputFeedbackTitle: N2,
  submitFeedback: I2,
  uploadImage: k2
}, Symbol.toStringTag, { value: "Module" })), F2 = "帮助详情", L2 = "加载中...", H2 = "浏览次数", B2 = "更新时间", U2 = "暂无数据", W2 = "缺少帮助文档ID", q2 = "网络错误，请稍后重试", wge = {
  helpDetail: F2,
  loading: L2,
  viewsCount: H2,
  updateTime: B2,
  noData: U2,
  missingId: W2,
  networkError: q2
}, Cge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wge,
  helpDetail: F2,
  loading: L2,
  missingId: W2,
  networkError: q2,
  noData: U2,
  updateTime: B2,
  viewsCount: H2
}, Symbol.toStringTag, { value: "Module" })), V2 = "帮助中心", G2 = "操作答疑", Y2 = "操作步骤", K2 = "管理平台", Q2 = "佣金分成与支付", X2 = "常见问题", J2 = "问题分类", Z2 = "联系客服", eR = "没有更多内容啦~", Mge = {
  helpCenter: V2,
  operationFAQ: G2,
  operationSteps: Y2,
  managementPlatform: K2,
  commissionPayment: Q2,
  commonProblems: X2,
  problemCategories: J2,
  contactService: Z2,
  noMoreContent: eR
}, jge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  commissionPayment: Q2,
  commonProblems: X2,
  contactService: Z2,
  default: Mge,
  helpCenter: V2,
  managementPlatform: K2,
  noMoreContent: eR,
  operationFAQ: G2,
  operationSteps: Y2,
  problemCategories: J2
}, Symbol.toStringTag, { value: "Module" })), oR = {
  apply: "申请发票",
  list: "发票列表",
  detail: "发票详情"
}, tR = "抬头类型", nR = "企业", rR = "个人", sR = "发票抬头", aR = "税号", cR = "发票类型", iR = "发票内容", lR = "发票金额", dR = "邮箱地址", uR = "备注信息", pR = "提交申请", mR = "电话", fR = "注册地址", gR = "银行名称", hR = "银行账号", _R = "更多信息", yR = "备注信息", $R = "取消", vR = "开票详情", bR = "接收方式", TR = "提交电子发票", PR = "请至少选择一项发票内容", SR = "发票金额包含上门服务订单金额与附加费用总额，不包含交通费、高速费、停车费。", OR = {
  pleaseInputHeader: "请输入发票抬头",
  pleaseInputTaxNumber: "请输入税号",
  pleaseInputEmail: "请输入邮箱地址",
  invalidEmail: "请输入正确的邮箱地址",
  success: "申请成功",
  failed: "申请失败",
  networkError: "网络错误，请重试"
}, wR = {
  inputHeader: "填写发票抬头",
  inputTaxNumber: "填写纳税人识别号",
  inputTelephone: "请输入电话（选填）",
  inputAddress: "请输入注册地址（选填）",
  inputBankName: "请输入银行名称（选填）",
  inputBankCardNumber: "请输入银行账号（选填）",
  inputEmail: "用于向您发送电子发票"
}, Age = {
  invoice: oR,
  invoiceHeaderType: tR,
  enterprise: nR,
  individual: rR,
  invoiceHeader: sR,
  taxNumber: aR,
  invoiceType: cR,
  invoiceContent: iR,
  invoiceAmount: lR,
  email: dR,
  remark: uR,
  submit: pR,
  telephone: mR,
  address: fR,
  bankName: gR,
  bankCardNumber: hR,
  moreInfo: _R,
  remarkInfo: yR,
  cancel: $R,
  invoiceDetail: vR,
  receiveMethod: bR,
  submitElectronicInvoice: TR,
  pleaseSelectContent: PR,
  invoiceAmountNote: SR,
  validation: OR,
  placeholder: wR
}, kge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: fR,
  bankCardNumber: hR,
  bankName: gR,
  cancel: $R,
  default: Age,
  email: dR,
  enterprise: nR,
  individual: rR,
  invoice: oR,
  invoiceAmount: lR,
  invoiceAmountNote: SR,
  invoiceContent: iR,
  invoiceDetail: vR,
  invoiceHeader: sR,
  invoiceHeaderType: tR,
  invoiceType: cR,
  moreInfo: _R,
  placeholder: wR,
  pleaseSelectContent: PR,
  receiveMethod: bR,
  remark: uR,
  remarkInfo: yR,
  submit: pR,
  submitElectronicInvoice: TR,
  taxNumber: aR,
  telephone: mR,
  validation: OR
}, Symbol.toStringTag, { value: "Module" })), CR = "订单", MR = "下单", jR = "接单", AR = "开始", kR = "完成", IR = "已支付", NR = "未支付", DR = "查看退款", ER = "申请退款", xR = "去支付", RR = "查看", zR = "服务人员", FR = "待派单", LR = "联系电话", HR = "服务码", BR = "注:服务人员上门时需提供", UR = "订单编号", WR = "交易流水号", qR = "创建时间", VR = "上门时间", GR = "买家留言", YR = "支付方式", KR = "支付时间", QR = "项目金额", XR = "实付金额", JR = "首页", ZR = "刷新", ez = "客服", oz = "收藏", tz = "没有更多内容啦~", nz = "的帮付", Ige = {
  order: CR,
  placeOrder: MR,
  takeOrders: jR,
  start: AR,
  finish: kR,
  havePaid: IR,
  notPaid: NR,
  viewRefund: DR,
  applyRefund: ER,
  goToPay: xR,
  show: RR,
  servicePersonal: zR,
  orderToBeSent: FR,
  contactNumber: LR,
  serviceCode: HR,
  explain: BR,
  onOrder: UR,
  transactionNumber: WR,
  createTime: qR,
  reserveServiceTime: VR,
  remark: GR,
  modePayment: YR,
  payTime: KR,
  goodsMoney: QR,
  realMoney: XR,
  index: JR,
  refresh: ZR,
  service: ez,
  collect: oz,
  nothingMore: tz,
  helpPay: nz
}, Nge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyRefund: ER,
  collect: oz,
  contactNumber: LR,
  createTime: qR,
  default: Ige,
  explain: BR,
  finish: kR,
  goToPay: xR,
  goodsMoney: QR,
  havePaid: IR,
  helpPay: nz,
  index: JR,
  modePayment: YR,
  notPaid: NR,
  nothingMore: tz,
  onOrder: UR,
  order: CR,
  orderToBeSent: FR,
  payTime: KR,
  placeOrder: MR,
  realMoney: XR,
  refresh: ZR,
  remark: GR,
  reserveServiceTime: VR,
  service: ez,
  serviceCode: HR,
  servicePersonal: zR,
  show: RR,
  start: AR,
  takeOrders: jR,
  transactionNumber: WR,
  viewRefund: DR
}, Symbol.toStringTag, { value: "Module" })), rz = "写评价", sz = "服务项目", az = "服务评价", cz = "非常满意", iz = "满意", lz = "一般", dz = "好", uz = "很好", pz = "较差", mz = "很差", fz = "请输入您想说的话", gz = "请输入评价内容", hz = "添加照片", _z = "匿名评价", yz = "确定提交", $z = "提交中...", vz = "请输入评价内容", bz = "请选择评分", Tz = "订单ID不存在", Pz = "商品信息不存在", Sz = "评价成功", Dge = {
  pageTitle: rz,
  serviceItem: sz,
  serviceEvaluation: az,
  verySatisfactory: cz,
  satisfactory: iz,
  average: lz,
  satisfied: dz,
  verySatisfied: uz,
  poor: pz,
  veryPoor: mz,
  pleaseInputComment: fz,
  commentPlaceholder: gz,
  addPhotos: hz,
  anonymousEvaluation: _z,
  submit: yz,
  submitting: $z,
  commentEmpty: vz,
  selectRating: bz,
  orderIdNotFound: Tz,
  goodsInfoNotFound: Pz,
  commentSuccess: Sz
}, Ege = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPhotos: hz,
  anonymousEvaluation: _z,
  average: lz,
  commentEmpty: vz,
  commentPlaceholder: gz,
  commentSuccess: Sz,
  default: Dge,
  goodsInfoNotFound: Pz,
  orderIdNotFound: Tz,
  pageTitle: rz,
  pleaseInputComment: fz,
  poor: pz,
  satisfactory: iz,
  satisfied: dz,
  selectRating: bz,
  serviceEvaluation: az,
  serviceItem: sz,
  submit: yz,
  submitting: $z,
  veryPoor: mz,
  verySatisfactory: cz,
  verySatisfied: uz
}, Symbol.toStringTag, { value: "Module" })), Oz = "写评价", wz = "服务项目", Cz = "服务评价", Mz = "非常满意", jz = "满意", Az = "一般", kz = "较差", Iz = "很差", Nz = "请输入您想说的话", Dz = "请输入评价内容", Ez = "添加照片", xz = "匿名评价", Rz = "确定提交", zz = "提交中...", Fz = "请输入评价内容", Lz = "请选择评分", Hz = "订单ID不存在", Bz = "商品信息不存在", Uz = "评价成功", xge = {
  pageTitle: Oz,
  serviceItem: wz,
  serviceEvaluation: Cz,
  verySatisfactory: Mz,
  satisfactory: jz,
  average: Az,
  poor: kz,
  veryPoor: Iz,
  pleaseInputComment: Nz,
  commentPlaceholder: Dz,
  addPhotos: Ez,
  anonymousEvaluation: xz,
  submit: Rz,
  submitting: zz,
  commentEmpty: Fz,
  selectRating: Lz,
  orderIdNotFound: Hz,
  goodsInfoNotFound: Bz,
  commentSuccess: Uz
}, Rge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPhotos: Ez,
  anonymousEvaluation: xz,
  average: Az,
  commentEmpty: Fz,
  commentPlaceholder: Dz,
  commentSuccess: Uz,
  default: xge,
  goodsInfoNotFound: Bz,
  orderIdNotFound: Hz,
  pageTitle: Oz,
  pleaseInputComment: Nz,
  poor: kz,
  satisfactory: jz,
  selectRating: Lz,
  serviceEvaluation: Cz,
  serviceItem: wz,
  submit: Rz,
  submitting: zz,
  veryPoor: Iz,
  verySatisfactory: Mz
}, Symbol.toStringTag, { value: "Module" })), Wz = "我的评价", zge = {
  myEvaluate: Wz
}, Fge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zge,
  myEvaluate: Wz
}, Symbol.toStringTag, { value: "Module" })), qz = "全部", Vz = "未支付", Gz = "实付金额：", Yz = "订单金额：", Kz = "未获取到订单信息", Qz = "没有更多内容啦~", Lge = {
  all: qz,
  notPaid: Vz,
  payMoney: Gz,
  orderMoney: Yz,
  emptyTips: Kz,
  nothingMore: Qz
}, Hge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: qz,
  default: Lge,
  emptyTips: Kz,
  notPaid: Vz,
  nothingMore: Qz,
  orderMoney: Yz,
  payMoney: Gz
}, Symbol.toStringTag, { value: "Module" })), Xz = "添加上门地址", Jz = "选择师傅", Zz = "上门时间", eF = "请选择上门时间", oF = "买家留言", tF = "请填写留言信息", nF = "服务费", rF = "优惠券", sF = "合计：", aF = "提交订单", cF = "没有更多内容啦~", iF = "价格明细", lF = "实付金额", dF = "实付", Bge = {
  addHomeAddress: Xz,
  selectiveTechnician: Jz,
  addHomeTime: Zz,
  selectAddTimePlaceholder: eF,
  buysMessage: oF,
  messagePlaceholder: tF,
  goodsMoney: nF,
  coupon: rF,
  total: sF,
  submit: aF,
  nothingMore: cF,
  priceDetail: iF,
  payMoney: lF,
  payAll: dF
}, Uge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: Xz,
  addHomeTime: Zz,
  buysMessage: oF,
  coupon: rF,
  default: Bge,
  goodsMoney: nF,
  messagePlaceholder: tF,
  nothingMore: cF,
  payAll: dF,
  payMoney: lF,
  priceDetail: iF,
  selectAddTimePlaceholder: eF,
  selectiveTechnician: Jz,
  submit: aF,
  total: sF
}, Symbol.toStringTag, { value: "Module" })), uF = "申请售后", pF = "服务项目", mF = "选择售后类型", fF = "申请退款", gF = "服务投诉", hF = "再次维修", _F = "其他问题", yF = "选择售后原因", $F = "服务未按约定完成", vF = "服务质量不达标", bF = "额外收费不合理", TF = "服务人员态度问题", PF = "其他原因", SF = "最多上传{count}张图片", OF = "提交售后申请", wF = "提交中...", CF = "提交后，我们将在24小时内进行处理", MF = "请输入补充描述", jF = "订单ID不存在", AF = "售后申请提交成功", kF = "上传凭证", IF = "选填", NF = "补充描述", DF = "补充描述，有助于商家更好的处理售后问题", EF = "退款原因", xF = "退款金额", RF = "确定", zF = "请选择", FF = "最多可输入金额￥", LF = "提交", HF = "没有更多内容啦~", Wge = {
  pageTitle: uF,
  serviceItem: pF,
  selectRefundType: mF,
  applyRefund: fF,
  serviceComplain: gF,
  rework: hF,
  otherProblem: _F,
  selectRefundReason: yF,
  serviceNotCompleted: $F,
  serviceQualityNotMeet: vF,
  extraChargeUnreasonable: bF,
  serviceAttitudeProblem: TF,
  otherReason: PF,
  maxImagesCount: SF,
  submitRefundApply: OF,
  submitting: wF,
  submitNotice: CF,
  pleaseInputDescription: MF,
  orderIdNotFound: jF,
  refundApplySuccess: AF,
  uploadProof: kF,
  optional: IF,
  description: NF,
  descriptionPlaceholder: DF,
  refundReason: EF,
  refundMoney: xF,
  confirm: RF,
  placeholder: zF,
  moreInputMoney: FF,
  submit: LF,
  nothingMore: HF
}, qge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyRefund: fF,
  confirm: RF,
  default: Wge,
  description: NF,
  descriptionPlaceholder: DF,
  extraChargeUnreasonable: bF,
  maxImagesCount: SF,
  moreInputMoney: FF,
  nothingMore: HF,
  optional: IF,
  orderIdNotFound: jF,
  otherProblem: _F,
  otherReason: PF,
  pageTitle: uF,
  placeholder: zF,
  pleaseInputDescription: MF,
  refundApplySuccess: AF,
  refundMoney: xF,
  refundReason: EF,
  rework: hF,
  selectRefundReason: yF,
  selectRefundType: mF,
  serviceAttitudeProblem: TF,
  serviceComplain: gF,
  serviceItem: pF,
  serviceNotCompleted: $F,
  serviceQualityNotMeet: vF,
  submit: LF,
  submitNotice: CF,
  submitRefundApply: OF,
  submitting: wF,
  uploadProof: kF
}, Symbol.toStringTag, { value: "Module" })), BF = "退货详情", UF = "极速退款成功", WF = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", qF = "退款方式", VF = "退款原因", GF = "退款编号", YF = "申请时间", KF = "退款说明", QF = "协商记录", XF = "查看", JF = "取消退款", ZF = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", eL = "首页", oL = "退款金额", tL = "凭证", nL = "没有更多内容啦~", Vge = {
  refundDetail: BF,
  fastRefundSuccessful: UF,
  refundInfo: WF,
  refundType: qF,
  refundCause: VF,
  refundNo: GF,
  createTime: YF,
  createExplain: KF,
  record: QF,
  check: XF,
  refundApply: JF,
  cancelRefundContent: ZF,
  index: eL,
  refundMoney: oL,
  voucher: tL,
  nothingMore: nL
}, Gge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: ZF,
  check: XF,
  createExplain: KF,
  createTime: YF,
  default: Vge,
  fastRefundSuccessful: UF,
  index: eL,
  nothingMore: nL,
  record: QF,
  refundApply: JF,
  refundCause: VF,
  refundDetail: BF,
  refundInfo: WF,
  refundMoney: oL,
  refundNo: GF,
  refundType: qF,
  voucher: tL
}, Symbol.toStringTag, { value: "Module" })), rL = "退款金额", sL = "取消退款", aL = "详情", cL = "实付款", iL = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", lL = "没有更多内容啦~", Yge = {
  refundMoney: rL,
  refundApply: sL,
  orderDetail: aL,
  actualPayment: cL,
  cancelRefundContent: iL,
  nothingMore: lL
}, Kge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: cL,
  cancelRefundContent: iL,
  default: Yge,
  nothingMore: lL,
  orderDetail: aL,
  refundApply: sL,
  refundMoney: rL
}, Symbol.toStringTag, { value: "Module" })), dL = "返回详情", uL = "没有更多内容啦~", Qge = {
  detail: dL,
  nothingMore: uL
}, Xge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qge,
  detail: dL,
  nothingMore: uL
}, Symbol.toStringTag, { value: "Module" })), pL = "选择师傅", mL = "请选择", fL = "预约时间", gL = "买家留言", hL = "请填写留言信息", _L = "立即购买", yL = "立即预约", $L = "首页", vL = "手机号", bL = "请输入手机号", TL = "请输入正确的手机号", PL = "客服", SL = "收藏", OL = "没有更多内容啦~", Jge = {
  selectTechnician: pL,
  pleaseChoose: mL,
  reserveTime: fL,
  remark: gL,
  fillRemark: hL,
  buy: _L,
  reserve: yL,
  index: $L,
  mobile: vL,
  mobilePlaceholder: bL,
  correctMobilePlaceholder: TL,
  service: PL,
  collect: SL,
  nothingMore: OL
}, Zge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: _L,
  collect: SL,
  correctMobilePlaceholder: TL,
  default: Jge,
  fillRemark: hL,
  index: $L,
  mobile: vL,
  mobilePlaceholder: bL,
  nothingMore: OL,
  pleaseChoose: mL,
  remark: gL,
  reserve: yL,
  reserveTime: fL,
  selectTechnician: pL,
  service: PL
}, Symbol.toStringTag, { value: "Module" })), wL = "机构入驻申请", CL = "商家人驻 海量商机", ML = "大平台・多品类・专业经营", jL = "我们的优势", AL = "多品类覆盖", kL = "洗衣洗鞋、保洁清洗、管道疏通、房屋维修、家电维修、上门安装、数码维修等多类服务供您选择", IL = "客户充足", NL = "同城/到家、千万流量帮扶、帮助商家解决获客难题", DL = "商家赋能", EL = "系统算法派单，省时省心;手机+电脑支持后台管理订单;完善的服务商成长体系", xL = "平台帮扶", RL = "培训指导助力经营、系统支持保障效率", zL = "入驻流程", FL = "01.提交资料", LL = "02.资料审核", HL = "03.入驻完成", BL = "去填写", ehe = {
  storeApplyTitle: wL,
  merchantSlogan: CL,
  platformFeatures: ML,
  ourAdvantages: jL,
  multipleCategories: AL,
  multipleCategoriesDesc: kL,
  sufficientCustomers: IL,
  sufficientCustomersDesc: NL,
  merchantEmpowerment: DL,
  merchantEmpowermentDesc: EL,
  platformSupport: xL,
  platformSupportDesc: RL,
  settlementProcess: zL,
  submitData: FL,
  dataReview: LL,
  settlementComplete: HL,
  goFill: BL
}, ohe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dataReview: LL,
  default: ehe,
  goFill: BL,
  merchantEmpowerment: DL,
  merchantEmpowermentDesc: EL,
  merchantSlogan: CL,
  multipleCategories: AL,
  multipleCategoriesDesc: kL,
  ourAdvantages: jL,
  platformFeatures: ML,
  platformSupport: xL,
  platformSupportDesc: RL,
  settlementComplete: HL,
  settlementProcess: zL,
  storeApplyTitle: wL,
  submitData: FL,
  sufficientCustomers: IL,
  sufficientCustomersDesc: NL
}, Symbol.toStringTag, { value: "Module" })), UL = "机构入驻申请", WL = "机构名称", qL = "请输入机构名称", VL = "营业执照", GL = "请上传营业执照", YL = "请上传营业执照", KL = "请输入联系人姓名", QL = "请输入手机号码", XL = "请输入身份证号", JL = "请上传证件头像", ZL = "请上传证件国徽面", eH = "请选择机构位置", oH = "行业资质", tH = "上传机构图像", nH = "我的定位", rH = "请选择", sH = "联系人姓名", aH = "请输入联系人姓名", cH = "手机号码", iH = "请输入手机号码", lH = "身份证号", dH = "请输入身份证号", uH = "证件头像面", pH = "证件国徽面", mH = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", fH = "图片尺寸400*400px以上，大小不超过10M", gH = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊，保持信息清晰可见", hH = "上传图片必须小于1M且清晰可见", _H = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", yH = "身份证照片上传", $H = "请上传清晰照片", vH = "申请说明", bH = "请输入", TH = "确定提交", PH = "请输入姓名", SH = "请输入身份证号", OH = "请输入手机号", wH = "请上传证件头像", CH = "请上传证件国徽面", MH = "提交成功", jH = "提交中...", AH = "点击上传", kH = "机构相关证件照", IH = "机构相关证件", NH = "法人身份证照片", DH = "请上传清晰照片", EH = "确定提交", xH = "机构营业执照或个体户执照", RH = "部分行业需要，按行业补充", zH = "请输入正确的手机号", FH = "请输入正确的身份证号码", LH = "请输入机构名称", HH = "请上传营业执照", BH = "请上传机构图像", UH = "请选择机构位置", WH = "请输入联系人姓名", qH = "请输入手机号码", VH = "请输入身份证号", GH = "请上传证件头像", YH = "请上传证件国徽面", KH = "请输入正确的手机号码", QH = "请输入正确的身份证号码", the = {
  storeApplyTitle: UL,
  storeName: WL,
  inputStoreName: qL,
  businessLicense: VL,
  businessLicensePlaceholder: GL,
  businessLicenseRequired: YL,
  contactNameRequired: KL,
  mobileRequired: QL,
  idNumberRequired: XL,
  idcardFrontRequired: JL,
  idcardBackRequired: ZL,
  locationRequired: eH,
  industryQualification: oH,
  uploadStoreImage: tH,
  myLocation: nH,
  selectLocation: rH,
  contactPersonName: sH,
  inputContactPersonName: aH,
  contactPersonMobile: cH,
  inputContactPersonMobile: iH,
  contactPersonIdcard: lH,
  inputContactPersonIdcard: dH,
  idcardFront: uH,
  idcardBack: pH,
  idcardFrontTip1: mH,
  idcardFrontTip3: fH,
  idcardBackTip1: gH,
  idcardBackTip5: hH,
  skillCertificateDesc1: _H,
  idcardUpload: yH,
  idcardUploadTip: $H,
  applyDescription: vH,
  inputApplyDescription: bH,
  confirmSubmit: TH,
  inputName: PH,
  inputIdcard: SH,
  inputMobile: OH,
  uploadIdcardFront: wH,
  uploadIdcardBack: CH,
  submitSuccess: MH,
  submitting: jH,
  clickUpload: AH,
  storeCertificates: kH,
  uploadClearPhotos: IH,
  legalPersonIdcardImage: NH,
  PleaseUploadClearPhotos: DH,
  submitForm: EH,
  storeBusinessLicenseTip: xH,
  industryQualificationTip: RH,
  inputMobileErr: zH,
  inputIdcardErr: FH,
  pleaseInputStoreName: LH,
  pleaseUploadBusinessLicense: HH,
  pleaseUploadStoreImage: BH,
  pleaseSelectLocation: UH,
  pleaseInputContactPersonName: WH,
  pleaseInputContactPersonMobile: qH,
  pleaseInputContactPersonIdcard: VH,
  pleaseUploadIdcardFront: GH,
  pleaseUploadIdcardBack: YH,
  pleaseInputValidMobile: KH,
  pleaseInputValidIdcard: QH
}, nhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PleaseUploadClearPhotos: DH,
  applyDescription: vH,
  businessLicense: VL,
  businessLicensePlaceholder: GL,
  businessLicenseRequired: YL,
  clickUpload: AH,
  confirmSubmit: TH,
  contactNameRequired: KL,
  contactPersonIdcard: lH,
  contactPersonMobile: cH,
  contactPersonName: sH,
  default: the,
  idNumberRequired: XL,
  idcardBack: pH,
  idcardBackRequired: ZL,
  idcardBackTip1: gH,
  idcardBackTip5: hH,
  idcardFront: uH,
  idcardFrontRequired: JL,
  idcardFrontTip1: mH,
  idcardFrontTip3: fH,
  idcardUpload: yH,
  idcardUploadTip: $H,
  industryQualification: oH,
  industryQualificationTip: RH,
  inputApplyDescription: bH,
  inputContactPersonIdcard: dH,
  inputContactPersonMobile: iH,
  inputContactPersonName: aH,
  inputIdcard: SH,
  inputIdcardErr: FH,
  inputMobile: OH,
  inputMobileErr: zH,
  inputName: PH,
  inputStoreName: qL,
  legalPersonIdcardImage: NH,
  locationRequired: eH,
  mobileRequired: QL,
  myLocation: nH,
  pleaseInputContactPersonIdcard: VH,
  pleaseInputContactPersonMobile: qH,
  pleaseInputContactPersonName: WH,
  pleaseInputStoreName: LH,
  pleaseInputValidIdcard: QH,
  pleaseInputValidMobile: KH,
  pleaseSelectLocation: UH,
  pleaseUploadBusinessLicense: HH,
  pleaseUploadIdcardBack: YH,
  pleaseUploadIdcardFront: GH,
  pleaseUploadStoreImage: BH,
  selectLocation: rH,
  skillCertificateDesc1: _H,
  storeApplyTitle: UL,
  storeBusinessLicenseTip: xH,
  storeCertificates: kH,
  storeName: WL,
  submitForm: EH,
  submitSuccess: MH,
  submitting: jH,
  uploadClearPhotos: IH,
  uploadIdcardBack: CH,
  uploadIdcardFront: wH,
  uploadStoreImage: tH
}, Symbol.toStringTag, { value: "Module" })), XH = "入驻申请审批中", JH = "入驻申请不通过", ZH = "申请已通过", eB = "预计三个工作日完成，请耐心等待", oB = "申请已提交", tB = "审核时间", nB = "返回首页", rB = "查看申请状态", sB = "审核提示", aB = "您已成功入驻", rhe = {
  reviewingTitle: XH,
  rejectedTitle: JH,
  successTitle: ZH,
  description: eB,
  applicationSubmitted: oB,
  awaitingSettlement: tB,
  goBackHome: nB,
  checkStatus: rB,
  reviewTips: sB,
  descriptionSuccess: aB
}, she = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applicationSubmitted: oB,
  awaitingSettlement: tB,
  checkStatus: rB,
  default: rhe,
  description: eB,
  descriptionSuccess: aB,
  goBackHome: nB,
  rejectedTitle: JH,
  reviewTips: sB,
  reviewingTitle: XH,
  successTitle: ZH
}, Symbol.toStringTag, { value: "Module" })), cB = "师傅入驻申请", iB = "请选择我的技能", lB = "(多选)", dB = "我们的优势", uB = "多品类覆盖", pB = "洗衣洗鞋、保洁清洗、管道疏通、房屋维修、家电维修、上门安装、数码维修等多类服务供您选择", mB = "客户充足", fB = "同城到家、千万流量帮扶、帮助商家解决获客难题", gB = "商家赋能", hB = "系统算法派单、省时省心手机、电脑支持后台管理订单；完善的服务商成长体系", _B = "平台帮扶", yB = "培训指导助力经营、系统支持保障效率", $B = "入驻流程", vB = "01.提交资料", bB = "02.资料审核", TB = "03.入驻完成", PB = "去填写", SB = "请至少选择一项技能", OB = "家庭保洁", wB = "上门维修", CB = "保姆月嫂", MB = "清洁、整理、消毒", ahe = {
  technicianApplyTitle: cB,
  selectSkillsTitle: iB,
  multipleChoice: lB,
  ourAdvantages: dB,
  multipleCategories: uB,
  multipleCategoriesDesc: pB,
  sufficientCustomers: mB,
  sufficientCustomersDesc: fB,
  merchantEmpowerment: gB,
  merchantEmpowermentDesc: hB,
  platformSupport: _B,
  platformSupportDesc: yB,
  settlementProcess: $B,
  submitData: vB,
  dataReview: bB,
  settlementComplete: TB,
  goFill: PB,
  selectAtLeastOneSkill: SB,
  homeCleaning: OB,
  homeRepair: wB,
  nannyYuesao: CB,
  skillDesc: MB
}, che = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dataReview: bB,
  default: ahe,
  goFill: PB,
  homeCleaning: OB,
  homeRepair: wB,
  merchantEmpowerment: gB,
  merchantEmpowermentDesc: hB,
  multipleCategories: uB,
  multipleCategoriesDesc: pB,
  multipleChoice: lB,
  nannyYuesao: CB,
  ourAdvantages: dB,
  platformSupport: _B,
  platformSupportDesc: yB,
  selectAtLeastOneSkill: SB,
  selectSkillsTitle: iB,
  settlementComplete: TB,
  settlementProcess: $B,
  skillDesc: MB,
  submitData: vB,
  sufficientCustomers: mB,
  sufficientCustomersDesc: fB,
  technicianApplyTitle: cB
}, Symbol.toStringTag, { value: "Module" })), jB = "师傅入驻申请", AB = "请选择我的技能", kB = "(多选)", IB = "我们的优势", NB = "多品类覆盖", DB = "洗衣洗鞋、保洁清洗、管道疏通、房屋维修、家电维修、上门安装、数码维修等多类服务供您选择", EB = "客户充足", xB = "同城到家、千万流量帮扶、帮助商家解决获客难题", RB = "商家赋能", zB = "系统算法派单、省时省心手机、电脑支持后台管理订单；完善的服务商成长体系", FB = "平台帮扶", LB = "培训指导助力经营、系统支持保障效率", HB = "入驻流程", BB = "01.提交资料", UB = "02.资料审核", WB = "03.入驻完成", qB = "去填写", VB = "请至少选择一项技能", GB = "家庭保洁", YB = "上门维修", KB = "保姆月嫂", QB = "清洁、整理、消毒", XB = "基本信息", JB = "姓名", ZB = "身份证号", e0 = "手机号码", o0 = "所属机构（选填）", t0 = "请选择所属机构", n0 = "师傅头像", r0 = "请上传清晰照片", s0 = "师傅头像照片上传", a0 = "身份证照片上传", c0 = "请上传清晰照片", i0 = "身份证人像面", l0 = "图片尺寸80*80px以上，大小不超过10M", d0 = "请输入正确的身份证号码", u0 = "请输入正确的手机号", p0 = "请上传证件国徽面", m0 = "技能证书上传（选填）", f0 = "请上传技能证书，最多9张", g0 = "我的定位", h0 = "请选择服务区域", _0 = "申请说明", y0 = "请输入申请说明", $0 = "确定提交", v0 = "请输入姓名", b0 = "请输入身份证号", T0 = "请输入手机号", P0 = "请上传证件头像", S0 = "请上传证件国徽面", O0 = "提交成功", w0 = "提交中...", C0 = "点击上传", M0 = "技能证书", j0 = "请上传技能证书", A0 = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", k0 = "图片尺寸400*400px以上，大小不超过10M", I0 = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊，保持信息清晰可见", N0 = "上传图片必须小于1M且清晰可见", D0 = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", E0 = "（必填）", x0 = "姓名不能为空", R0 = "身份证号不能为空", z0 = "手机号不能为空", F0 = "请上传师傅头像", L0 = "请上传身份证照片", H0 = "请选择服务区域", B0 = "请填写申请说明", ihe = {
  technicianApplyTitle: jB,
  selectSkillsTitle: AB,
  multipleChoice: kB,
  ourAdvantages: IB,
  multipleCategories: NB,
  multipleCategoriesDesc: DB,
  sufficientCustomers: EB,
  sufficientCustomersDesc: xB,
  merchantEmpowerment: RB,
  merchantEmpowermentDesc: zB,
  platformSupport: FB,
  platformSupportDesc: LB,
  settlementProcess: HB,
  submitData: BB,
  dataReview: UB,
  settlementComplete: WB,
  goFill: qB,
  selectAtLeastOneSkill: VB,
  homeCleaning: GB,
  homeRepair: YB,
  nannyYuesao: KB,
  skillDesc: QB,
  basicInfo: XB,
  name: JB,
  idcard: ZB,
  mobiles: e0,
  store: o0,
  selectStore: t0,
  technicianAvatar: n0,
  avatarUploadTip: r0,
  uploadAvatar: s0,
  idcardUpload: a0,
  idcardUploadTip: c0,
  idcardFront: i0,
  avatarUploadTip1: l0,
  inputIdcardErr: d0,
  inputMobileErr: u0,
  idcardBack: p0,
  skillCertificateUpload: m0,
  skillCertificateTip: f0,
  serviceArea: g0,
  selectServiceArea: h0,
  applyDescription: _0,
  inputDescription: y0,
  submitForm: $0,
  inputName: v0,
  inputIdcard: b0,
  inputMobile: T0,
  uploadIdcardFront: P0,
  uploadIdcardBack: S0,
  submitSuccess: O0,
  submitting: w0,
  clickUpload: C0,
  skillCertificate: M0,
  uploadCertificate: j0,
  idcardFrontTip1: A0,
  idcardFrontTip3: k0,
  idcardBackTip1: I0,
  idcardBackTip5: N0,
  skillCertificateDesc1: D0,
  requiredField: E0,
  nameRequired: x0,
  idcardRequired: R0,
  mobileRequired: z0,
  avatarRequired: F0,
  idcardPhotoRequired: L0,
  serviceAreaRequired: H0,
  descriptionRequired: B0
}, lhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDescription: _0,
  avatarRequired: F0,
  avatarUploadTip: r0,
  avatarUploadTip1: l0,
  basicInfo: XB,
  clickUpload: C0,
  dataReview: UB,
  default: ihe,
  descriptionRequired: B0,
  goFill: qB,
  homeCleaning: GB,
  homeRepair: YB,
  idcard: ZB,
  idcardBack: p0,
  idcardBackTip1: I0,
  idcardBackTip5: N0,
  idcardFront: i0,
  idcardFrontTip1: A0,
  idcardFrontTip3: k0,
  idcardPhotoRequired: L0,
  idcardRequired: R0,
  idcardUpload: a0,
  idcardUploadTip: c0,
  inputDescription: y0,
  inputIdcard: b0,
  inputIdcardErr: d0,
  inputMobile: T0,
  inputMobileErr: u0,
  inputName: v0,
  merchantEmpowerment: RB,
  merchantEmpowermentDesc: zB,
  mobileRequired: z0,
  mobiles: e0,
  multipleCategories: NB,
  multipleCategoriesDesc: DB,
  multipleChoice: kB,
  name: JB,
  nameRequired: x0,
  nannyYuesao: KB,
  ourAdvantages: IB,
  platformSupport: FB,
  platformSupportDesc: LB,
  requiredField: E0,
  selectAtLeastOneSkill: VB,
  selectServiceArea: h0,
  selectSkillsTitle: AB,
  selectStore: t0,
  serviceArea: g0,
  serviceAreaRequired: H0,
  settlementComplete: WB,
  settlementProcess: HB,
  skillCertificate: M0,
  skillCertificateDesc1: D0,
  skillCertificateTip: f0,
  skillCertificateUpload: m0,
  skillDesc: QB,
  store: o0,
  submitData: BB,
  submitForm: $0,
  submitSuccess: O0,
  submitting: w0,
  sufficientCustomers: EB,
  sufficientCustomersDesc: xB,
  technicianApplyTitle: jB,
  technicianAvatar: n0,
  uploadAvatar: s0,
  uploadCertificate: j0,
  uploadIdcardBack: S0,
  uploadIdcardFront: P0
}, Symbol.toStringTag, { value: "Module" })), U0 = "师傅详情", W0 = "工作中", q0 = "休息中", V0 = "从业{years}年", G0 = "服务{count}单", Y0 = "完成单数", K0 = "异常订单", Q0 = "售后订单", X0 = "好评率", J0 = "个人简介", Z0 = "姓名", e3 = "身份证号", o3 = "手机号", t3 = "资质证书", n3 = "查看", r3 = "自我介绍", s3 = "技能专长", a3 = "联系师傅", c3 = "立即预约", dhe = {
  technicianDetail: U0,
  working: W0,
  resting: q0,
  experience_years: V0,
  service_orders: G0,
  completed_orders: Y0,
  exception_orders: K0,
  after_sale_orders: Q0,
  rating: X0,
  personal_info: J0,
  name: Z0,
  id_card: e3,
  phone: o3,
  certificates: t3,
  view: n3,
  self_introduction: r3,
  skills: s3,
  contact_technician: a3,
  book_now: c3
}, uhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  after_sale_orders: Q0,
  book_now: c3,
  certificates: t3,
  completed_orders: Y0,
  contact_technician: a3,
  default: dhe,
  exception_orders: K0,
  experience_years: V0,
  id_card: e3,
  name: Z0,
  personal_info: J0,
  phone: o3,
  rating: X0,
  resting: q0,
  self_introduction: r3,
  service_orders: G0,
  skills: s3,
  technicianDetail: U0,
  view: n3,
  working: W0
}, Symbol.toStringTag, { value: "Module" })), i3 = "年", l3 = "请输入搜索关键词", d3 = "已服务", u3 = "已离职", p3 = "休息中", m3 = "详情", f3 = "没有更多内容啦~", phe = {
  year: i3,
  searchPlaceholder: l3,
  service: d3,
  haveLeft: u3,
  takeBreak: p3,
  detail: m3,
  nothingMore: f3
}, mhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: phe,
  detail: m3,
  haveLeft: u3,
  nothingMore: f3,
  searchPlaceholder: l3,
  service: d3,
  takeBreak: p3,
  year: i3
}, Symbol.toStringTag, { value: "Module" })), g3 = "去抢购", h3 = "没有更多内容啦~", _3 = "已售", y3 = "订单号", $3 = "实付款", v3 = "详情", fhe = {
  reserveBtn: g3,
  noHomeAddress: h3,
  soldOut: _3,
  orderNo: y3,
  actualPayment: $3,
  orderDetail: v3
}, ghe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: $3,
  default: fhe,
  noHomeAddress: h3,
  orderDetail: v3,
  orderNo: y3,
  reserveBtn: g3,
  soldOut: _3
}, Symbol.toStringTag, { value: "Module" })), b3 = "联系人", T3 = "请输入联系人姓名", P3 = "手机号码", S3 = "请输入手机号码", O3 = "请输入正确的手机号", w3 = "选择地区", C3 = "请选择地区", M3 = "详细地址", j3 = "请填写详细地址", A3 = "设为默认地址", k3 = "没有更多内容啦~", hhe = {
  name: b3,
  namePlaceholder: T3,
  mobile: P3,
  mobilePlaceholder: S3,
  mobileError: O3,
  selectArea: w3,
  selectAreaPlaceholder: C3,
  address: M3,
  addressPlaceholder: j3,
  defaultAddress: A3,
  nothingMore: k3
}, _he = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: M3,
  addressPlaceholder: j3,
  default: hhe,
  defaultAddress: A3,
  mobile: P3,
  mobileError: O3,
  mobilePlaceholder: S3,
  name: b3,
  namePlaceholder: T3,
  nothingMore: k3,
  selectArea: w3,
  selectAreaPlaceholder: C3
}, Symbol.toStringTag, { value: "Module" })), I3 = "联系人", N3 = "请输入联系人姓名", D3 = "手机号码", E3 = "请输入手机号码", x3 = "上门地址", R3 = "选择地址", z3 = "请选择地址", F3 = "详细地址", L3 = "详细地址如 1单元101", H3 = "请填写门牌号", B3 = "设为默认地址", U3 = "修改", W3 = "保存", q3 = "没有更多内容啦~", yhe = {
  name: I3,
  namePlaceholder: N3,
  mobile: D3,
  mobilePlaceholder: E3,
  homeAddress: x3,
  selectAddress: R3,
  selectAddressPlaceholder: z3,
  address: F3,
  addressPlaceholder: L3,
  addressError: H3,
  defaultAddress: B3,
  update: U3,
  save: W3,
  nothingMore: q3
}, $he = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: F3,
  addressError: H3,
  addressPlaceholder: L3,
  default: yhe,
  defaultAddress: B3,
  homeAddress: x3,
  mobile: D3,
  mobilePlaceholder: E3,
  name: I3,
  namePlaceholder: N3,
  nothingMore: q3,
  save: W3,
  selectAddress: R3,
  selectAddressPlaceholder: z3,
  update: U3
}, Symbol.toStringTag, { value: "Module" })), V3 = "没有更多内容啦~", G3 = "添加上门地址", vhe = {
  default: "默认地址",
  noHomeAddress: V3,
  addHomeAddress: G3
}, bhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: G3,
  default: vhe,
  noHomeAddress: V3
}, Symbol.toStringTag, { value: "Module" })), Y3 = "请输入搜索关键词", K3 = "全部分类", Q3 = "预约", X3 = "已售", J3 = "没有更多内容啦~", The = {
  searchKeywordPlaceholder: Y3,
  allCategory: K3,
  reserveBtn: Q3,
  soldOut: X3,
  nothingMore: J3
}, Phe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: K3,
  default: The,
  nothingMore: J3,
  reserveBtn: Q3,
  searchKeywordPlaceholder: Y3,
  soldOut: X3
}, Symbol.toStringTag, { value: "Module" })), Z3 = "人选择", e4 = "已选", o4 = "次", t4 = "暂无项目介绍", n4 = "暂无购买须知", r4 = "暂无更多数据", s4 = "项目名称", a4 = "价格", c4 = "单位", i4 = "暂无价目表", l4 = "首页", d4 = "分享", u4 = "客服", p4 = "立即预约", m4 = "立即下单", f4 = "已下架", g4 = "没有更多内容啦~", She = {
  selectNum: Z3,
  selected: e4,
  time: o4,
  noProjectInt: t4,
  noPurchase: n4,
  noMore: r4,
  projectName: s4,
  price: a4,
  unit: c4,
  noPriceList: i4,
  index: l4,
  share: d4,
  service: u4,
  bookNow: p4,
  orderNow: m4,
  delisted: f4,
  nothingMore: g4
}, Ohe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: p4,
  default: She,
  delisted: f4,
  index: l4,
  noMore: r4,
  noPriceList: i4,
  noProjectInt: t4,
  noPurchase: n4,
  nothingMore: g4,
  orderNow: m4,
  price: a4,
  projectName: s4,
  selectNum: Z3,
  selected: e4,
  service: u4,
  share: d4,
  time: o4,
  unit: c4
}, Symbol.toStringTag, { value: "Module" })), h4 = "没有更多内容啦~", _4 = "请搜索您想要的商品", y4 = "综合", $4 = "销量", v4 = "价格", b4 = "筛选", T4 = "全部分类", P4 = "已售", S4 = "没有更多内容啦~", whe = {
  end: h4,
  searchPlaceholder: _4,
  synthesis: y4,
  sales: $4,
  price: v4,
  screen: b4,
  allCategory: T4,
  soldOut: P4,
  nothingMore: S4
}, Che = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: T4,
  default: whe,
  end: h4,
  nothingMore: S4,
  price: v4,
  sales: $4,
  screen: b4,
  searchPlaceholder: _4,
  soldOut: P4,
  synthesis: y4
}, Symbol.toStringTag, { value: "Module" })), O4 = "请输入搜索关键词", w4 = "抢购", C4 = "没有更多内容啦~", M4 = "没有更多内容啦~", j4 = "已售", A4 = "订单号", k4 = "实付款", I4 = "详情", Mhe = {
  searchNamePlaceholder: O4,
  reserveBtn: w4,
  nothingMore: C4,
  noHomeAddress: M4,
  soldOut: j4,
  orderNo: A4,
  actualPayment: k4,
  orderDetail: I4
}, jhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: k4,
  default: Mhe,
  noHomeAddress: M4,
  nothingMore: C4,
  orderDetail: I4,
  orderNo: A4,
  reserveBtn: w4,
  searchNamePlaceholder: O4,
  soldOut: j4
}, Symbol.toStringTag, { value: "Module" })), N4 = "订单数(个)", D4 = "订单金额(元)", E4 = "订单管理", x4 = "查看更多", R4 = "待服务订单", z4 = "服务中订单", F4 = "已服务订单", L4 = "数量：", H4 = "查看详情", B4 = "服务项目", U4 = "加载中", W4 = "没有更多内容啦~", Ahe = {
  orderNum: N4,
  orderAmount: D4,
  orderManagement: E4,
  viewMore: x4,
  pendingOrder: R4,
  orderInService: z4,
  finishedOrder: F4,
  amount: L4,
  viewDetails: H4,
  serviceItem: B4,
  loadingText: U4,
  nothingMore: W4
}, khe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amount: L4,
  default: Ahe,
  finishedOrder: F4,
  loadingText: U4,
  nothingMore: W4,
  orderAmount: D4,
  orderInService: z4,
  orderManagement: E4,
  orderNum: N4,
  pendingOrder: R4,
  serviceItem: B4,
  viewDetails: H4,
  viewMore: x4
}, Symbol.toStringTag, { value: "Module" })), q4 = "添加服务项目", V4 = "编辑服务项目", G4 = "服务项目", Y4 = "请输入服务项目", K4 = "价格", Q4 = "请输入价格", X4 = "元", J4 = "项目图片", Z4 = "提交", e5 = "加载中...", o5 = "没有更多内容啦~", Ihe = {
  addServiceItem: q4,
  editServiceItem: V4,
  serviceItem: G4,
  serviceItemPlaceholder: Y4,
  price: K4,
  pricePlaceholder: Q4,
  yuan: X4,
  serviceImg: J4,
  save: Z4,
  loading: e5,
  nothingMore: o5
}, Nhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: q4,
  default: Ihe,
  editServiceItem: V4,
  loading: e5,
  nothingMore: o5,
  price: K4,
  pricePlaceholder: Q4,
  save: Z4,
  serviceImg: J4,
  serviceItem: G4,
  serviceItemPlaceholder: Y4,
  yuan: X4
}, Symbol.toStringTag, { value: "Module" })), t5 = "下单", n5 = "接单", r5 = "开始", s5 = "完成", a5 = "服务日期:", c5 = "新增服务项目", i5 = "已支付", l5 = "未支付", d5 = "去支付", u5 = "查看", p5 = "编辑", m5 = "订单信息", f5 = "订单编号", g5 = "联系人姓名", h5 = "联系电话", _5 = "备注", y5 = "首页", $5 = "联系客户", v5 = "刷新", b5 = "服务码", T5 = "没有更多内容啦~", P5 = "查看退款", Dhe = {
  placeOrder: t5,
  takeOrders: n5,
  start: r5,
  finish: s5,
  serviceDate: a5,
  addServiceItem: c5,
  havePaid: i5,
  notPaid: l5,
  goToPay: d5,
  show: u5,
  edit: p5,
  delete: "删除",
  orderInfo: m5,
  orderNo: f5,
  person: g5,
  personTel: h5,
  remark: _5,
  index: y5,
  contact: $5,
  refresh: v5,
  checkCode: b5,
  nothingMore: T5,
  viewRefund: P5
}, Ehe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: c5,
  checkCode: b5,
  contact: $5,
  default: Dhe,
  edit: p5,
  finish: s5,
  goToPay: d5,
  havePaid: i5,
  index: y5,
  notPaid: l5,
  nothingMore: T5,
  orderInfo: m5,
  orderNo: f5,
  person: g5,
  personTel: h5,
  placeOrder: t5,
  refresh: v5,
  remark: _5,
  serviceDate: a5,
  show: u5,
  start: r5,
  takeOrders: n5,
  viewRefund: P5
}, Symbol.toStringTag, { value: "Module" })), S5 = "服务日期:", O5 = "已支付", w5 = "未支付", C5 = "联系客户", M5 = "服务码", j5 = "没有更多内容啦~", xhe = {
  serviceDate: S5,
  havePaid: O5,
  notPaid: w5,
  contact: C5,
  checkCode: M5,
  nothingMore: j5
}, Rhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkCode: M5,
  contact: C5,
  default: xhe,
  havePaid: O5,
  notPaid: w5,
  nothingMore: j5,
  serviceDate: S5
}, Symbol.toStringTag, { value: "Module" })), A5 = "退款方式", k5 = "退款原因", I5 = "退款编号", N5 = "申请时间", D5 = "退款说明", E5 = "查看", x5 = "退款金额", R5 = "凭证", z5 = "没有更多内容啦~", zhe = {
  refundType: A5,
  refundCause: k5,
  refundNo: I5,
  createTime: N5,
  createExplain: D5,
  check: E5,
  refundMoney: x5,
  voucher: R5,
  nothingMore: z5
}, Fhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  check: E5,
  createExplain: D5,
  createTime: N5,
  default: zhe,
  nothingMore: z5,
  refundCause: k5,
  refundMoney: x5,
  refundNo: I5,
  refundType: A5,
  voucher: R5
}, Symbol.toStringTag, { value: "Module" })), F5 = "查看服务项目", L5 = "服务项目", H5 = "价格", B5 = "元", U5 = "项目图片", W5 = "加载中...", q5 = "没有更多内容啦~", Lhe = {
  showServiceItem: F5,
  serviceItem: L5,
  price: H5,
  yuan: B5,
  serviceImg: U5,
  loading: W5,
  nothingMore: q5
}, Hhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lhe,
  loading: W5,
  nothingMore: q5,
  price: H5,
  serviceImg: U5,
  serviceItem: L5,
  showServiceItem: F5,
  yuan: B5
}, Symbol.toStringTag, { value: "Module" })), V5 = "订单", G5 = "下单", Y5 = "接单", K5 = "开始", Q5 = "完成", X5 = "已支付", J5 = "未支付", Z5 = "查看退款", eU = "申请退款", oU = "去支付", tU = "查看", nU = "服务人员", rU = "待派单", sU = "联系电话", aU = "服务码", cU = "注:服务人员上门时需提供", iU = "订单编号", lU = "交易流水号", dU = "创建时间", uU = "上门时间", pU = "买家留言", mU = "支付方式", fU = "支付时间", gU = "项目金额", hU = "实付金额", _U = "首页", yU = "刷新", $U = "客服", vU = "收藏", bU = "没有更多内容啦~", TU = "的帮付", Bhe = {
  order: V5,
  placeOrder: G5,
  takeOrders: Y5,
  start: K5,
  finish: Q5,
  havePaid: X5,
  notPaid: J5,
  viewRefund: Z5,
  applyRefund: eU,
  goToPay: oU,
  show: tU,
  servicePersonal: nU,
  orderToBeSent: rU,
  contactNumber: sU,
  serviceCode: aU,
  explain: cU,
  onOrder: iU,
  transactionNumber: lU,
  createTime: dU,
  reserveServiceTime: uU,
  remark: pU,
  modePayment: mU,
  payTime: fU,
  goodsMoney: gU,
  realMoney: hU,
  index: _U,
  refresh: yU,
  service: $U,
  collect: vU,
  nothingMore: bU,
  helpPay: TU
}, Uhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyRefund: eU,
  collect: vU,
  contactNumber: sU,
  createTime: dU,
  default: Bhe,
  explain: cU,
  finish: Q5,
  goToPay: oU,
  goodsMoney: gU,
  havePaid: X5,
  helpPay: TU,
  index: _U,
  modePayment: mU,
  notPaid: J5,
  nothingMore: bU,
  onOrder: iU,
  order: V5,
  orderToBeSent: rU,
  payTime: fU,
  placeOrder: G5,
  realMoney: hU,
  refresh: yU,
  remark: pU,
  reserveServiceTime: uU,
  service: $U,
  serviceCode: aU,
  servicePersonal: nU,
  show: tU,
  start: K5,
  takeOrders: Y5,
  transactionNumber: lU,
  viewRefund: Z5
}, Symbol.toStringTag, { value: "Module" })), PU = "全部", SU = "未支付", OU = "实付金额：", wU = "订单金额：", CU = "未获取到订单信息", MU = "没有更多内容啦~", Whe = {
  all: PU,
  notPaid: SU,
  payMoney: OU,
  orderMoney: wU,
  emptyTips: CU,
  nothingMore: MU
}, qhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: PU,
  default: Whe,
  emptyTips: CU,
  notPaid: SU,
  nothingMore: MU,
  orderMoney: wU,
  payMoney: OU
}, Symbol.toStringTag, { value: "Module" })), jU = "添加上门地址", AU = "选择技师", kU = "上门时间", IU = "请选择上门时间", NU = "买家留言", DU = "请填写留言信息", EU = "商品金额", xU = "合计：", RU = "提交订单", zU = "没有更多内容啦~", Vhe = {
  addHomeAddress: jU,
  selectiveTechnician: AU,
  addHomeTime: kU,
  selectAddTimePlaceholder: IU,
  buysMessage: NU,
  messagePlaceholder: DU,
  goodsMoney: EU,
  total: xU,
  submit: RU,
  nothingMore: zU
}, Ghe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: jU,
  addHomeTime: kU,
  buysMessage: NU,
  default: Vhe,
  goodsMoney: EU,
  messagePlaceholder: DU,
  nothingMore: zU,
  selectAddTimePlaceholder: IU,
  selectiveTechnician: AU,
  submit: RU,
  total: xU
}, Symbol.toStringTag, { value: "Module" })), FU = "上传凭证", LU = "选填", HU = "补充描述", BU = "补充描述,有助于更好的处理售后问题", UU = "退款原因", WU = "退款金额", qU = "确定", VU = "请选择", GU = "最多可输入金额￥", YU = "提交", KU = "没有更多内容啦~", Yhe = {
  uploadProof: FU,
  optional: LU,
  description: HU,
  descriptionPlaceholder: BU,
  refundReason: UU,
  refundMoney: WU,
  confirm: qU,
  placeholder: VU,
  moreInputMoney: GU,
  submit: YU,
  nothingMore: KU
}, Khe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirm: qU,
  default: Yhe,
  description: HU,
  descriptionPlaceholder: BU,
  moreInputMoney: GU,
  nothingMore: KU,
  optional: LU,
  placeholder: VU,
  refundMoney: WU,
  refundReason: UU,
  submit: YU,
  uploadProof: FU
}, Symbol.toStringTag, { value: "Module" })), QU = "退货详情", XU = "极速退款成功", JU = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", ZU = "退款方式", e8 = "退款原因", o8 = "退款编号", t8 = "申请时间", n8 = "退款说明", r8 = "协商记录", s8 = "查看", a8 = "取消退款", c8 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", i8 = "首页", l8 = "退款金额", d8 = "凭证", u8 = "没有更多内容啦~", Qhe = {
  refundDetail: QU,
  fastRefundSuccessful: XU,
  refundInfo: JU,
  refundType: ZU,
  refundCause: e8,
  refundNo: o8,
  createTime: t8,
  createExplain: n8,
  record: r8,
  check: s8,
  refundApply: a8,
  cancelRefundContent: c8,
  index: i8,
  refundMoney: l8,
  voucher: d8,
  nothingMore: u8
}, Xhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: c8,
  check: s8,
  createExplain: n8,
  createTime: t8,
  default: Qhe,
  fastRefundSuccessful: XU,
  index: i8,
  nothingMore: u8,
  record: r8,
  refundApply: a8,
  refundCause: e8,
  refundDetail: QU,
  refundInfo: JU,
  refundMoney: l8,
  refundNo: o8,
  refundType: ZU,
  voucher: d8
}, Symbol.toStringTag, { value: "Module" })), p8 = "退款金额", m8 = "取消退款", f8 = "详情", g8 = "实付款", h8 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", _8 = "没有更多内容啦~", Jhe = {
  refundMoney: p8,
  refundApply: m8,
  orderDetail: f8,
  actualPayment: g8,
  cancelRefundContent: h8,
  nothingMore: _8
}, Zhe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: g8,
  cancelRefundContent: h8,
  default: Jhe,
  nothingMore: _8,
  orderDetail: f8,
  refundApply: m8,
  refundMoney: p8
}, Symbol.toStringTag, { value: "Module" })), y8 = "返回详情", $8 = "没有更多内容啦~", e_e = {
  detail: y8,
  nothingMore: $8
}, o_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: e_e,
  detail: y8,
  nothingMore: $8
}, Symbol.toStringTag, { value: "Module" })), v8 = "选择技师", b8 = "请选择", T8 = "预约时间", P8 = "买家留言", S8 = "请填写留言信息", O8 = "立即购买", w8 = "立即预约", C8 = "首页", M8 = "手机号", j8 = "请输入手机号", A8 = "请输入正确的手机号", k8 = "客服", I8 = "收藏", N8 = "没有更多内容啦~", t_e = {
  selectTechnician: v8,
  pleaseChoose: b8,
  reserveTime: T8,
  remark: P8,
  fillRemark: S8,
  buy: O8,
  reserve: w8,
  index: C8,
  mobile: M8,
  mobilePlaceholder: j8,
  correctMobilePlaceholder: A8,
  service: k8,
  collect: I8,
  nothingMore: N8
}, n_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: O8,
  collect: I8,
  correctMobilePlaceholder: A8,
  default: t_e,
  fillRemark: S8,
  index: C8,
  mobile: M8,
  mobilePlaceholder: j8,
  nothingMore: N8,
  pleaseChoose: b8,
  remark: P8,
  reserve: w8,
  reserveTime: T8,
  selectTechnician: v8,
  service: k8
}, Symbol.toStringTag, { value: "Module" })), D8 = "订单数", E8 = "工龄", x8 = "年", R8 = "年龄", z8 = "岁", F8 = "岗位", L8 = "基本信息", H8 = "服务项目", B8 = "没有更多内容啦~", r_e = {
  orderNum: D8,
  workingAge: E8,
  year: x8,
  age: R8,
  annum: z8,
  position: F8,
  basicInfo: L8,
  serviceItem: H8,
  nothingMore: B8
}, s_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  age: R8,
  annum: z8,
  basicInfo: L8,
  default: r_e,
  nothingMore: B8,
  orderNum: D8,
  position: F8,
  serviceItem: H8,
  workingAge: E8,
  year: x8
}, Symbol.toStringTag, { value: "Module" })), U8 = "年", W8 = "请输入搜索关键词", q8 = "已服务", V8 = "已离职", G8 = "休息中", Y8 = "详情", K8 = "没有更多内容啦~", a_e = {
  year: U8,
  searchPlaceholder: W8,
  service: q8,
  haveLeft: V8,
  takeBreak: G8,
  detail: Y8,
  nothingMore: K8
}, c_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: a_e,
  detail: Y8,
  haveLeft: V8,
  nothingMore: K8,
  searchPlaceholder: W8,
  service: q8,
  takeBreak: G8,
  year: U8
}, Symbol.toStringTag, { value: "Module" })), i_e = {}, l_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: i_e
}, Symbol.toStringTag, { value: "Module" })), Q8 = "订单号", X8 = "实付款", J8 = "关闭订单", Z8 = "确认收货", e6 = "去支付", o6 = "详情", t6 = "支付流水号", n6 = "创建时间", r6 = "配送方式", s6 = "支付方式", a6 = "支付时间", c6 = "商品金额", i6 = "配送费用", l6 = "实付金额", d6 = "评价", u6 = "查看评价", p6 = "首页", m6 = "优惠金额", f6 = "查看物流", g6 = "复制", h6 = "详细信息", _6 = "的帮付", y6 = "用户备注", d_e = {
  orderNo: Q8,
  actualPayment: X8,
  orderClose: J8,
  orderFinish: Z8,
  topay: e6,
  orderDetail: o6,
  orderTradeNo: t6,
  createTime: n6,
  deliveryType: r6,
  payTypeName: s6,
  payTime: a6,
  goodsMoney: c6,
  deliveryMoney: i6,
  orderMoney: l6,
  evaluate: d6,
  selectedEvaluate: u6,
  index: p6,
  discountMoney: m6,
  logisticsTracking: f6,
  copy: g6,
  detailedInformation: h6,
  helpPay: _6,
  memberRemark: y6
}, u_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: X8,
  copy: g6,
  createTime: n6,
  default: d_e,
  deliveryMoney: i6,
  deliveryType: r6,
  detailedInformation: h6,
  discountMoney: m6,
  evaluate: d6,
  goodsMoney: c6,
  helpPay: _6,
  index: p6,
  logisticsTracking: f6,
  memberRemark: y6,
  orderClose: J8,
  orderDetail: o6,
  orderFinish: Z8,
  orderMoney: l6,
  orderNo: Q8,
  orderTradeNo: t6,
  payTime: a6,
  payTypeName: s6,
  selectedEvaluate: u6,
  topay: e6
}, Symbol.toStringTag, { value: "Module" })), $6 = "暂无收货地址，请先创建地址", v6 = "新增收货地址", b6 = "选择地址", T6 = "评价", P6 = "元", S6 = "待支付", O6 = "剩余时间", w6 = "含物流运输服务", C6 = "查看评价", M6 = "关闭订单", j6 = "确认收货", A6 = "支付", k6 = "配送方式", I6 = "下单时间", p_e = {
  emptyAddress: $6,
  addAddress: v6,
  selectAddress: b6,
  evaluate: T6,
  money: P6,
  pendingPayment: S6,
  pendingPaymentTips: O6,
  service: w6,
  selectedEvaluate: C6,
  orderClose: M6,
  orderFinish: j6,
  topay: A6,
  deliveryType: k6,
  createTime: I6
}, m_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: v6,
  createTime: I6,
  default: p_e,
  deliveryType: k6,
  emptyAddress: $6,
  evaluate: T6,
  money: P6,
  orderClose: M6,
  orderFinish: j6,
  pendingPayment: S6,
  pendingPaymentTips: O6,
  selectAddress: b6,
  selectedEvaluate: C6,
  service: w6,
  topay: A6
}, Symbol.toStringTag, { value: "Module" })), N6 = "订单号", D6 = "实付款", E6 = "关闭订单", x6 = "确认收货", R6 = "支付", z6 = "详情", F6 = "评价", L6 = "暂无订单", H6 = "暂无收货地址，请先创建地址", B6 = "换一换", U6 = "活动说明", W6 = "该商品起购", q6 = "件", V6 = "该商品每人限购", G6 = "该商品单次限购", Y6 = "商品库存不足", K6 = "件，超过按", Q6 = "购买", X6 = "限购", J6 = "一键购买", Z6 = "我知道了", f_e = {
  orderNo: N6,
  actualPayment: D6,
  orderClose: E6,
  orderFinish: x6,
  topay: R6,
  orderDetail: z6,
  evaluate: F6,
  orderListempty: L6,
  emptyAddress: H6,
  changeIt: B6,
  activityInstructions: U6,
  goodsLimitThree: W6,
  piece: q6,
  goodsLimitTwo: V6,
  goodsLimitOne: G6,
  stockNotEnough: Y6,
  limitPlaceholderTwo: K6,
  limitPlaceholderThree: Q6,
  limitPlaceholderOne: X6,
  buyWithOneClick: J6,
  know: Z6
}, g_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: U6,
  actualPayment: D6,
  buyWithOneClick: J6,
  changeIt: B6,
  default: f_e,
  emptyAddress: H6,
  evaluate: F6,
  goodsLimitOne: G6,
  goodsLimitThree: W6,
  goodsLimitTwo: V6,
  know: Z6,
  limitPlaceholderOne: X6,
  limitPlaceholderThree: Q6,
  limitPlaceholderTwo: K6,
  orderClose: E6,
  orderDetail: z6,
  orderFinish: x6,
  orderListempty: L6,
  orderNo: N6,
  piece: q6,
  stockNotEnough: Y6,
  topay: R6
}, Symbol.toStringTag, { value: "Module" })), eW = "退货详情", oW = "极速退款成功", tW = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", nW = "退款方式", rW = "退款金额", sW = "退款原因", aW = "拒绝原因", cW = "退款编号", iW = "申请时间", lW = "退款说明", dW = "协商记录", uW = "查看", pW = "取消退款", mW = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", fW = "首页", h_e = {
  refundDetail: eW,
  fastRefundSuccessful: oW,
  refundInfo: tW,
  refundType: nW,
  refundMoney: rW,
  refundCause: sW,
  reasonRefusal: aW,
  refundNo: cW,
  createTime: iW,
  createExplain: lW,
  record: dW,
  check: uW,
  refundApply: pW,
  cancelRefundContent: mW,
  index: fW
}, __e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: mW,
  check: uW,
  createExplain: lW,
  createTime: iW,
  default: h_e,
  fastRefundSuccessful: oW,
  index: fW,
  reasonRefusal: aW,
  record: dW,
  refundApply: pW,
  refundCause: sW,
  refundDetail: eW,
  refundInfo: tW,
  refundMoney: rW,
  refundNo: cW,
  refundType: nW
}, Symbol.toStringTag, { value: "Module" })), gW = "退款编号", hW = "退款金额", _W = "取消退款", yW = "退款进度", $W = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", y_e = {
  refundNo: gW,
  refundMoney: hW,
  refundApply: _W,
  refund: yW,
  cancelRefundContent: $W
}, $_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: $W,
  default: y_e,
  refund: yW,
  refundApply: _W,
  refundMoney: hW,
  refundNo: gW
}, Symbol.toStringTag, { value: "Module" })), vW = "订单号", v_e = {
  orderNo: vW
}, b_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: v_e,
  orderNo: vW
}, Symbol.toStringTag, { value: "Module" })), bW = "充值", TW = "提现", PW = "余额明细", SW = "账户余额（元）", OW = "余额（元）", wW = "可提现余额（元）", CW = "可用余额", MW = "充值金额不能低于", jW = "确认", AW = "请输入充值金额", kW = "最低充值金额为", IW = "元", NW = "充值记录", DW = "充值方式", EW = "充值说明", T_e = {
  recharge: bW,
  cashOut: TW,
  balanceDetail: PW,
  accountBalance: SW,
  balance: OW,
  money: wW,
  availableBalance: CW,
  rechargeAmountError: MW,
  confirm: jW,
  customRechargeAmount: AW,
  minWithdrawal: kW,
  yuan: IW,
  rechargeRecord: NW,
  RechargeMethod: DW,
  rechargeInstructions: EW
}, P_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RechargeMethod: DW,
  accountBalance: SW,
  availableBalance: CW,
  balance: OW,
  balanceDetail: PW,
  cashOut: TW,
  confirm: jW,
  customRechargeAmount: AW,
  default: T_e,
  minWithdrawal: kW,
  money: wW,
  recharge: bW,
  rechargeAmountError: MW,
  rechargeInstructions: EW,
  rechargeRecord: NW,
  yuan: IW
}, Symbol.toStringTag, { value: "Module" })), xW = "充值记录", RW = "暂无充值记录", S_e = {
  rechargeRecord: xW,
  emptyTip: RW
}, O_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: S_e,
  emptyTip: RW,
  rechargeRecord: xW
}, Symbol.toStringTag, { value: "Module" })), zW = "订单编号", FW = "创建时间", w_e = {
  orderNo: zW,
  createTime: FW
}, C_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: FW,
  default: w_e,
  orderNo: zW
}, Symbol.toStringTag, { value: "Module" })), M_e = {}, j_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: M_e
}, Symbol.toStringTag, { value: "Module" })), A_e = {}, k_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: A_e
}, Symbol.toStringTag, { value: "Module" })), LW = "订单号", HW = "实付款", BW = "关闭订单", UW = "确认收货", WW = "去支付", qW = "详情", VW = "支付流水号", GW = "创建时间", YW = "配送方式", KW = "支付方式", QW = "支付时间", XW = "商品金额", JW = "配送费用", ZW = "实付金额", eq = "评价", oq = "查看评价", tq = "首页", nq = "优惠金额", rq = "查看物流", sq = "复制", aq = "详细信息", cq = "的帮付", iq = "用户备注", I_e = {
  orderNo: LW,
  actualPayment: HW,
  orderClose: BW,
  orderFinish: UW,
  topay: WW,
  orderDetail: qW,
  orderTradeNo: VW,
  createTime: GW,
  deliveryType: YW,
  payTypeName: KW,
  payTime: QW,
  goodsMoney: XW,
  deliveryMoney: JW,
  orderMoney: ZW,
  evaluate: eq,
  selectedEvaluate: oq,
  index: tq,
  discountMoney: nq,
  logisticsTracking: rq,
  copy: sq,
  detailedInformation: aq,
  helpPay: cq,
  memberRemark: iq
}, N_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: HW,
  copy: sq,
  createTime: GW,
  default: I_e,
  deliveryMoney: JW,
  deliveryType: YW,
  detailedInformation: aq,
  discountMoney: nq,
  evaluate: eq,
  goodsMoney: XW,
  helpPay: cq,
  index: tq,
  logisticsTracking: rq,
  memberRemark: iq,
  orderClose: BW,
  orderDetail: qW,
  orderFinish: UW,
  orderMoney: ZW,
  orderNo: LW,
  orderTradeNo: VW,
  payTime: QW,
  payTypeName: KW,
  selectedEvaluate: oq,
  topay: WW
}, Symbol.toStringTag, { value: "Module" })), lq = "暂无收货地址，请先创建地址", dq = "新增收货地址", uq = "选择地址", pq = "评价", mq = "元", fq = "待支付", gq = "剩余时间", hq = "含物流运输服务", _q = "查看评价", yq = "关闭订单", $q = "确认收货", vq = "支付", bq = "配送方式", Tq = "下单时间", D_e = {
  emptyAddress: lq,
  addAddress: dq,
  selectAddress: uq,
  evaluate: pq,
  money: mq,
  pendingPayment: fq,
  pendingPaymentTips: gq,
  service: hq,
  selectedEvaluate: _q,
  orderClose: yq,
  orderFinish: $q,
  topay: vq,
  deliveryType: bq,
  createTime: Tq
}, E_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: dq,
  createTime: Tq,
  default: D_e,
  deliveryType: bq,
  emptyAddress: lq,
  evaluate: pq,
  money: mq,
  orderClose: yq,
  orderFinish: $q,
  pendingPayment: fq,
  pendingPaymentTips: gq,
  selectAddress: uq,
  selectedEvaluate: _q,
  service: hq,
  topay: vq
}, Symbol.toStringTag, { value: "Module" })), Pq = "订单号", Sq = "实付款", Oq = "关闭订单", wq = "确认收货", Cq = "支付", Mq = "详情", jq = "评价", Aq = "暂无订单", kq = "暂无收货地址，请先创建地址", Iq = "换一换", Nq = "活动说明", Dq = "该商品起购", Eq = "件", xq = "该商品每人限购", Rq = "该商品单次限购", zq = "商品库存不足", Fq = "件，超过按", Lq = "购买", Hq = "限购", Bq = "一键购买", Uq = "我知道了", x_e = {
  orderNo: Pq,
  actualPayment: Sq,
  orderClose: Oq,
  orderFinish: wq,
  topay: Cq,
  orderDetail: Mq,
  evaluate: jq,
  orderListempty: Aq,
  emptyAddress: kq,
  changeIt: Iq,
  activityInstructions: Nq,
  goodsLimitThree: Dq,
  piece: Eq,
  goodsLimitTwo: xq,
  goodsLimitOne: Rq,
  stockNotEnough: zq,
  limitPlaceholderTwo: Fq,
  limitPlaceholderThree: Lq,
  limitPlaceholderOne: Hq,
  buyWithOneClick: Bq,
  know: Uq
}, R_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: Nq,
  actualPayment: Sq,
  buyWithOneClick: Bq,
  changeIt: Iq,
  default: x_e,
  emptyAddress: kq,
  evaluate: jq,
  goodsLimitOne: Rq,
  goodsLimitThree: Dq,
  goodsLimitTwo: xq,
  know: Uq,
  limitPlaceholderOne: Hq,
  limitPlaceholderThree: Lq,
  limitPlaceholderTwo: Fq,
  orderClose: Oq,
  orderDetail: Mq,
  orderFinish: wq,
  orderListempty: Aq,
  orderNo: Pq,
  piece: Eq,
  stockNotEnough: zq,
  topay: Cq
}, Symbol.toStringTag, { value: "Module" })), Wq = "退货详情", qq = "极速退款成功", Vq = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", Gq = "退款方式", Yq = "退款金额", Kq = "退款原因", Qq = "拒绝原因", Xq = "退款编号", Jq = "申请时间", Zq = "退款说明", eV = "协商记录", oV = "查看", tV = "取消退款", nV = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", rV = "首页", z_e = {
  refundDetail: Wq,
  fastRefundSuccessful: qq,
  refundInfo: Vq,
  refundType: Gq,
  refundMoney: Yq,
  refundCause: Kq,
  reasonRefusal: Qq,
  refundNo: Xq,
  createTime: Jq,
  createExplain: Zq,
  record: eV,
  check: oV,
  refundApply: tV,
  cancelRefundContent: nV,
  index: rV
}, F_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: nV,
  check: oV,
  createExplain: Zq,
  createTime: Jq,
  default: z_e,
  fastRefundSuccessful: qq,
  index: rV,
  reasonRefusal: Qq,
  record: eV,
  refundApply: tV,
  refundCause: Kq,
  refundDetail: Wq,
  refundInfo: Vq,
  refundMoney: Yq,
  refundNo: Xq,
  refundType: Gq
}, Symbol.toStringTag, { value: "Module" })), sV = "退款编号", aV = "退款金额", cV = "取消退款", iV = "退款进度", lV = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", L_e = {
  refundNo: sV,
  refundMoney: aV,
  refundApply: cV,
  refund: iV,
  cancelRefundContent: lV
}, H_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: lV,
  default: L_e,
  refund: iV,
  refundApply: cV,
  refundMoney: aV,
  refundNo: sV
}, Symbol.toStringTag, { value: "Module" })), B_e = {}, U_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: B_e
}, Symbol.toStringTag, { value: "Module" })), dV = "订单号", uV = "实付款", pV = "关闭订单", mV = "确认收货", fV = "去支付", gV = "详情", hV = "支付流水号", _V = "创建时间", yV = "配送方式", $V = "支付方式", vV = "支付时间", bV = "商品金额", TV = "配送费用", PV = "实付金额", SV = "评价", OV = "查看评价", wV = "首页", CV = "优惠金额", MV = "查看物流", jV = "复制", AV = "详细信息", kV = "的帮付", IV = "用户备注", W_e = {
  orderNo: dV,
  actualPayment: uV,
  orderClose: pV,
  orderFinish: mV,
  topay: fV,
  orderDetail: gV,
  orderTradeNo: hV,
  createTime: _V,
  deliveryType: yV,
  payTypeName: $V,
  payTime: vV,
  goodsMoney: bV,
  deliveryMoney: TV,
  orderMoney: PV,
  evaluate: SV,
  selectedEvaluate: OV,
  index: wV,
  discountMoney: CV,
  logisticsTracking: MV,
  copy: jV,
  detailedInformation: AV,
  helpPay: kV,
  memberRemark: IV
}, q_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: uV,
  copy: jV,
  createTime: _V,
  default: W_e,
  deliveryMoney: TV,
  deliveryType: yV,
  detailedInformation: AV,
  discountMoney: CV,
  evaluate: SV,
  goodsMoney: bV,
  helpPay: kV,
  index: wV,
  logisticsTracking: MV,
  memberRemark: IV,
  orderClose: pV,
  orderDetail: gV,
  orderFinish: mV,
  orderMoney: PV,
  orderNo: dV,
  orderTradeNo: hV,
  payTime: vV,
  payTypeName: $V,
  selectedEvaluate: OV,
  topay: fV
}, Symbol.toStringTag, { value: "Module" })), NV = "暂无收货地址，请先创建地址", DV = "新增收货地址", EV = "选择地址", xV = "评价", RV = "元", zV = "待支付", FV = "剩余时间", LV = "含物流运输服务", HV = "查看评价", BV = "关闭订单", UV = "确认收货", WV = "支付", qV = "配送方式", VV = "下单时间", V_e = {
  emptyAddress: NV,
  addAddress: DV,
  selectAddress: EV,
  evaluate: xV,
  money: RV,
  pendingPayment: zV,
  pendingPaymentTips: FV,
  service: LV,
  selectedEvaluate: HV,
  orderClose: BV,
  orderFinish: UV,
  topay: WV,
  deliveryType: qV,
  createTime: VV
}, G_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: DV,
  createTime: VV,
  default: V_e,
  deliveryType: qV,
  emptyAddress: NV,
  evaluate: xV,
  money: RV,
  orderClose: BV,
  orderFinish: UV,
  pendingPayment: zV,
  pendingPaymentTips: FV,
  selectAddress: EV,
  selectedEvaluate: HV,
  service: LV,
  topay: WV
}, Symbol.toStringTag, { value: "Module" })), GV = "订单号", YV = "实付款", KV = "关闭订单", QV = "确认收货", XV = "支付", JV = "详情", ZV = "评价", e7 = "暂无订单", o7 = "暂无收货地址，请先创建地址", t7 = "换一换", n7 = "活动说明", r7 = "该商品起购", s7 = "件", a7 = "该商品每人限购", c7 = "该商品单次限购", i7 = "商品库存不足", l7 = "件，超过按", d7 = "购买", u7 = "限购", p7 = "一键购买", m7 = "我知道了", Y_e = {
  orderNo: GV,
  actualPayment: YV,
  orderClose: KV,
  orderFinish: QV,
  topay: XV,
  orderDetail: JV,
  evaluate: ZV,
  orderListempty: e7,
  emptyAddress: o7,
  changeIt: t7,
  activityInstructions: n7,
  goodsLimitThree: r7,
  piece: s7,
  goodsLimitTwo: a7,
  goodsLimitOne: c7,
  stockNotEnough: i7,
  limitPlaceholderTwo: l7,
  limitPlaceholderThree: d7,
  limitPlaceholderOne: u7,
  buyWithOneClick: p7,
  know: m7
}, K_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: n7,
  actualPayment: YV,
  buyWithOneClick: p7,
  changeIt: t7,
  default: Y_e,
  emptyAddress: o7,
  evaluate: ZV,
  goodsLimitOne: c7,
  goodsLimitThree: r7,
  goodsLimitTwo: a7,
  know: m7,
  limitPlaceholderOne: u7,
  limitPlaceholderThree: d7,
  limitPlaceholderTwo: l7,
  orderClose: KV,
  orderDetail: JV,
  orderFinish: QV,
  orderListempty: e7,
  orderNo: GV,
  piece: s7,
  stockNotEnough: i7,
  topay: XV
}, Symbol.toStringTag, { value: "Module" })), f7 = "退货详情", g7 = "极速退款成功", h7 = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", _7 = "退款方式", y7 = "退款金额", $7 = "退款原因", v7 = "拒绝原因", b7 = "退款编号", T7 = "申请时间", P7 = "退款说明", S7 = "协商记录", O7 = "查看", w7 = "取消退款", C7 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", M7 = "首页", Q_e = {
  refundDetail: f7,
  fastRefundSuccessful: g7,
  refundInfo: h7,
  refundType: _7,
  refundMoney: y7,
  refundCause: $7,
  reasonRefusal: v7,
  refundNo: b7,
  createTime: T7,
  createExplain: P7,
  record: S7,
  check: O7,
  refundApply: w7,
  cancelRefundContent: C7,
  index: M7
}, X_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: C7,
  check: O7,
  createExplain: P7,
  createTime: T7,
  default: Q_e,
  fastRefundSuccessful: g7,
  index: M7,
  reasonRefusal: v7,
  record: S7,
  refundApply: w7,
  refundCause: $7,
  refundDetail: f7,
  refundInfo: h7,
  refundMoney: y7,
  refundNo: b7,
  refundType: _7
}, Symbol.toStringTag, { value: "Module" })), j7 = "退款编号", A7 = "退款金额", k7 = "取消退款", I7 = "退款进度", N7 = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", J_e = {
  refundNo: j7,
  refundMoney: A7,
  refundApply: k7,
  refund: I7,
  cancelRefundContent: N7
}, Z_e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: N7,
  default: J_e,
  refund: I7,
  refundApply: k7,
  refundMoney: A7,
  refundNo: j7
}, Symbol.toStringTag, { value: "Module" })), D7 = "订单号", E7 = "实付款", x7 = "关闭订单", R7 = "确认收货", z7 = "优惠劵", F7 = "暂无收货地址，请先创建地址", L7 = "新增收货地址", H7 = "选择地址", eye = {
  orderNo: D7,
  actualPayment: E7,
  orderClose: x7,
  orderFinish: R7,
  coupon: z7,
  emptyAddress: F7,
  addAddress: L7,
  selectAddress: H7
}, oye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: E7,
  addAddress: L7,
  coupon: z7,
  default: eye,
  emptyAddress: F7,
  orderClose: x7,
  orderFinish: R7,
  orderNo: D7,
  selectAddress: H7
}, Symbol.toStringTag, { value: "Module" })), tye = {}, nye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tye
}, Symbol.toStringTag, { value: "Module" })), rye = {}, sye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rye
}, Symbol.toStringTag, { value: "Module" })), aye = {}, cye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: aye
}, Symbol.toStringTag, { value: "Module" })), B7 = "全部", U7 = "价格", iye = {
  all: B7,
  price: U7
}, lye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: B7,
  default: iye,
  price: U7
}, Symbol.toStringTag, { value: "Module" })), W7 = "榜单规则", dye = {
  rankingRules: W7
}, uye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dye,
  rankingRules: W7
}, Symbol.toStringTag, { value: "Module" })), pye = {}, mye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pye
}, Symbol.toStringTag, { value: "Module" })), q7 = "优惠券", fye = {
  coupon: q7
}, gye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coupon: q7,
  default: fye
}, Symbol.toStringTag, { value: "Module" })), V7 = "订单号", G7 = "实付款", Y7 = "关闭订单", K7 = "确认收货", Q7 = "去支付", X7 = "详情", J7 = "支付流水号", Z7 = "创建时间", e9 = "配送方式", o9 = "支付方式", t9 = "支付时间", n9 = "商品金额", r9 = "配送费用", s9 = "实付金额", a9 = "评价", c9 = "查看评价", i9 = "首页", l9 = "优惠金额", d9 = "查看物流", u9 = "复制", p9 = "详细信息", m9 = "的帮付", f9 = "用户备注", g9 = "删除", hye = {
  orderNo: V7,
  actualPayment: G7,
  orderClose: Y7,
  orderFinish: K7,
  topay: Q7,
  orderDetail: X7,
  orderTradeNo: J7,
  createTime: Z7,
  deliveryType: e9,
  payTypeName: o9,
  payTime: t9,
  goodsMoney: n9,
  deliveryMoney: r9,
  orderMoney: s9,
  evaluate: a9,
  selectedEvaluate: c9,
  index: i9,
  discountMoney: l9,
  logisticsTracking: d9,
  copy: u9,
  detailedInformation: p9,
  helpPay: m9,
  memberRemark: f9,
  orderDelete: g9
}, _ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: G7,
  copy: u9,
  createTime: Z7,
  default: hye,
  deliveryMoney: r9,
  deliveryType: e9,
  detailedInformation: p9,
  discountMoney: l9,
  evaluate: a9,
  goodsMoney: n9,
  helpPay: m9,
  index: i9,
  logisticsTracking: d9,
  memberRemark: f9,
  orderClose: Y7,
  orderDelete: g9,
  orderDetail: X7,
  orderFinish: K7,
  orderMoney: s9,
  orderNo: V7,
  orderTradeNo: J7,
  payTime: t9,
  payTypeName: o9,
  selectedEvaluate: c9,
  topay: Q7
}, Symbol.toStringTag, { value: "Module" })), h9 = "暂无收货地址，请先创建地址", _9 = "新增收货地址", y9 = "选择地址", $9 = "评价", v9 = "元", b9 = "待支付", T9 = "剩余时间", P9 = "含物流运输服务", S9 = "查看评价", O9 = "关闭订单", w9 = "确认收货", C9 = "支付", M9 = "配送方式", j9 = "下单时间", A9 = "删除", yye = {
  emptyAddress: h9,
  addAddress: _9,
  selectAddress: y9,
  evaluate: $9,
  money: v9,
  pendingPayment: b9,
  pendingPaymentTips: T9,
  service: P9,
  selectedEvaluate: S9,
  orderClose: O9,
  orderFinish: w9,
  topay: C9,
  deliveryType: M9,
  createTime: j9,
  orderDelete: A9
}, $ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: _9,
  createTime: j9,
  default: yye,
  deliveryType: M9,
  emptyAddress: h9,
  evaluate: $9,
  money: v9,
  orderClose: O9,
  orderDelete: A9,
  orderFinish: w9,
  pendingPayment: b9,
  pendingPaymentTips: T9,
  selectAddress: y9,
  selectedEvaluate: S9,
  service: P9,
  topay: C9
}, Symbol.toStringTag, { value: "Module" })), k9 = "订单号", I9 = "实付款", N9 = "关闭订单", D9 = "确认收货", E9 = "支付", x9 = "详情", R9 = "评价", z9 = "暂无订单", F9 = "暂无收货地址，请先创建地址", L9 = "换一换", H9 = "活动说明", B9 = "该商品起购", U9 = "件", W9 = "该商品每人限购", q9 = "该商品单次限购", V9 = "商品库存不足", G9 = "件，超过按", Y9 = "购买", K9 = "限购", Q9 = "一键购买", X9 = "我知道了", vye = {
  orderNo: k9,
  actualPayment: I9,
  orderClose: N9,
  orderFinish: D9,
  topay: E9,
  orderDetail: x9,
  evaluate: R9,
  orderListempty: z9,
  emptyAddress: F9,
  changeIt: L9,
  activityInstructions: H9,
  goodsLimitThree: B9,
  piece: U9,
  goodsLimitTwo: W9,
  goodsLimitOne: q9,
  stockNotEnough: V9,
  limitPlaceholderTwo: G9,
  limitPlaceholderThree: Y9,
  limitPlaceholderOne: K9,
  buyWithOneClick: Q9,
  know: X9
}, bye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: H9,
  actualPayment: I9,
  buyWithOneClick: Q9,
  changeIt: L9,
  default: vye,
  emptyAddress: F9,
  evaluate: R9,
  goodsLimitOne: q9,
  goodsLimitThree: B9,
  goodsLimitTwo: W9,
  know: X9,
  limitPlaceholderOne: K9,
  limitPlaceholderThree: Y9,
  limitPlaceholderTwo: G9,
  orderClose: N9,
  orderDetail: x9,
  orderFinish: D9,
  orderListempty: z9,
  orderNo: k9,
  piece: U9,
  stockNotEnough: V9,
  topay: E9
}, Symbol.toStringTag, { value: "Module" })), J9 = "积分", Z9 = "元", eG = "已兑", Tye = {
  point: J9,
  priceUnit: Z9,
  redeemed: eG
}, Pye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tye,
  point: J9,
  priceUnit: Z9,
  redeemed: eG
}, Symbol.toStringTag, { value: "Module" })), oG = "订单号", tG = "订单金额", nG = "关闭订单", rG = "确认收货", sG = "支付", aG = "详情", cG = "评价", iG = "查看评价", lG = "暂无订单", dG = "配送方式", uG = "元", pG = "积分", Sye = {
  orderNo: oG,
  actualPayment: tG,
  orderClose: nG,
  orderFinish: rG,
  topay: sG,
  orderDetail: aG,
  evaluate: cG,
  selectedEvaluate: iG,
  orderListempty: lG,
  deliveryType: dG,
  money: uG,
  point: pG
}, Oye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: tG,
  default: Sye,
  deliveryType: dG,
  evaluate: cG,
  money: uG,
  orderClose: nG,
  orderDetail: aG,
  orderFinish: rG,
  orderListempty: lG,
  orderNo: oG,
  point: pG,
  selectedEvaluate: iG,
  topay: sG
}, Symbol.toStringTag, { value: "Module" })), mG = "退货详情", fG = "极速退款成功", gG = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", hG = "退款方式", _G = "退款金额", yG = "退款原因", $G = "拒绝原因", vG = "退款编号", bG = "申请时间", TG = "退款说明", PG = "协商记录", SG = "查看", OG = "取消退款", wG = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", CG = "首页", wye = {
  refundDetail: mG,
  fastRefundSuccessful: fG,
  refundInfo: gG,
  refundType: hG,
  refundMoney: _G,
  refundCause: yG,
  reasonRefusal: $G,
  refundNo: vG,
  createTime: bG,
  createExplain: TG,
  record: PG,
  check: SG,
  refundApply: OG,
  cancelRefundContent: wG,
  index: CG
}, Cye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: wG,
  check: SG,
  createExplain: TG,
  createTime: bG,
  default: wye,
  fastRefundSuccessful: fG,
  index: CG,
  reasonRefusal: $G,
  record: PG,
  refundApply: OG,
  refundCause: yG,
  refundDetail: mG,
  refundInfo: gG,
  refundMoney: _G,
  refundNo: vG,
  refundType: hG
}, Symbol.toStringTag, { value: "Module" })), MG = "退款编号", jG = "退款金额", AG = "取消退款", kG = "退款进度", IG = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", Mye = {
  refundNo: MG,
  refundMoney: jG,
  refundApply: AG,
  refund: kG,
  cancelRefundContent: IG
}, jye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: IG,
  default: Mye,
  refund: kG,
  refundApply: AG,
  refundMoney: jG,
  refundNo: MG
}, Symbol.toStringTag, { value: "Module" })), NG = "订单号", Aye = {
  orderNo: NG
}, kye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Aye,
  orderNo: NG
}, Symbol.toStringTag, { value: "Module" })), DG = "退款状态：", Iye = {
  refundStatus: DG
}, Nye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Iye,
  refundStatus: DG
}, Symbol.toStringTag, { value: "Module" })), EG = "分销活动未开启", xG = "系统任务奖励", RG = "提现", zG = "账单信息", FG = "累计佣金", LG = "销售奖励", HG = "销售额排行奖励", BG = "可提现", UG = "提现中", WG = "无", qG = "推荐人", Dye = {
  fenxiaoNotOpen: EG,
  taskDesc: xG,
  cashOut: RG,
  billingInformation: zG,
  commissionGet: FG,
  sale: LG,
  saleDesc: HG,
  commission: BG,
  commissionCashOuting: UG,
  notHave: WG,
  referrer: qG
}, Eye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  billingInformation: zG,
  cashOut: RG,
  commission: BG,
  commissionCashOuting: UG,
  commissionGet: FG,
  default: Dye,
  fenxiaoNotOpen: EG,
  notHave: WG,
  referrer: qG,
  sale: LG,
  saleDesc: HG,
  taskDesc: xG
}, Symbol.toStringTag, { value: "Module" })), VG = "任务奖励", GG = "分销活动未开启", YG = "系统任务奖励", KG = "提现", QG = "账单信息", XG = "累计佣金", JG = "待结算", ZG = "销售奖励", eY = "销售额排行奖励", oY = "可提现", tY = "提现中", xye = {
  task: VG,
  fenxiaoNotOpen: GG,
  taskDesc: YG,
  cashOut: KG,
  billingInformation: QG,
  commissionGet: XG,
  pendingSettlement: JG,
  sale: ZG,
  saleDesc: eY,
  commission: oY,
  commissionCashOuting: tY
}, Rye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  billingInformation: QG,
  cashOut: KG,
  commission: oY,
  commissionCashOuting: tY,
  commissionGet: XG,
  default: xye,
  fenxiaoNotOpen: GG,
  pendingSettlement: JG,
  sale: ZG,
  saleDesc: eY,
  task: VG,
  taskDesc: YG
}, Symbol.toStringTag, { value: "Module" })), nY = "未解锁", rY = "满足以下任意条件", sY = "满足以下全部条件", aY = "即可升级", zye = {
  notYetUnlocked: nY,
  arbitraryCondition: rY,
  allConditions: sY,
  upgradable: aY
}, Fye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allConditions: sY,
  arbitraryCondition: rY,
  default: zye,
  notYetUnlocked: nY,
  upgradable: aY
}, Symbol.toStringTag, { value: "Module" })), cY = "退款状态：", Lye = {
  refundStatus: cY
}, Hye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lye,
  refundStatus: cY
}, Symbol.toStringTag, { value: "Module" })), iY = "任务说明", lY = "奖励规则", Bye = {
  taskSpecification: iY,
  rewardRules: lY
}, Uye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bye,
  rewardRules: lY,
  taskSpecification: iY
}, Symbol.toStringTag, { value: "Module" })), dY = "退款状态：", Wye = {
  refundStatus: dY
}, qye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wye,
  refundStatus: dY
}, Symbol.toStringTag, { value: "Module" })), uY = "实付款", pY = "关闭订单", mY = "订单号", Vye = {
  actualPayment: uY,
  orderClose: pY,
  orderNo: mY
}, Gye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: uY,
  default: Vye,
  orderClose: pY,
  orderNo: mY
}, Symbol.toStringTag, { value: "Module" })), fY = "请输入卡片编号", gY = "请输入卡片密码", hY = "立即兑换", _Y = "卡片编号", yY = "卡片密码", $Y = "温馨提示", vY = "激活卡片", bY = "卡密激活", TY = "恭喜您 激活成功！", PY = "您已成功激活了1张礼品卡~", SY = "去看看", Yye = {
  cardNumberPlaceholder: fY,
  passwordPlaceholder: gY,
  redeemNow: hY,
  cardNo: _Y,
  cardKey: yY,
  reminder: $Y,
  activateCard: vY,
  cardEncryptionActivation: bY,
  popupTipsOne: TY,
  popupTipsTwo: PY,
  gouToSee: SY
}, Kye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activateCard: vY,
  cardEncryptionActivation: bY,
  cardKey: yY,
  cardNo: _Y,
  cardNumberPlaceholder: fY,
  default: Yye,
  gouToSee: SY,
  passwordPlaceholder: gY,
  popupTipsOne: TY,
  popupTipsTwo: PY,
  redeemNow: hY,
  reminder: $Y
}, Symbol.toStringTag, { value: "Module" })), OY = "全部", wY = "元", CY = "赠送好友", MY = "去使用", jY = "已使用", AY = "已失效", kY = "暂无卡记录", Qye = {
  all: OY,
  yuan: wY,
  giftToFriends: CY,
  canUse: MY,
  used: jY,
  invalid: AY,
  cardEmpty: kY
}, Xye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: OY,
  canUse: MY,
  cardEmpty: kY,
  default: Qye,
  giftToFriends: CY,
  invalid: AY,
  used: jY,
  yuan: wY
}, Symbol.toStringTag, { value: "Module" })), IY = "购买数量", NY = "选择面值", DY = "可兑换商品", EY = "该兑换卡可在以下商品中任选", xY = "件兑换", RY = "该兑换卡可兑换以下商品", zY = "使用须知", FY = "礼品卡详情", LY = "售价", HY = "立即购买", BY = "该卡活动已结束", UY = "该卡已下架", WY = "缺少礼品卡id", qY = "找不到该礼品卡", Jye = {
  purchaseQuantity: IY,
  selectDenomination: NY,
  convertibleGoods: DY,
  goodsTitleOne: EY,
  goodsTitleOneAnd: xY,
  goodsTitleTwo: RY,
  instruction: zY,
  cardDesc: FY,
  price: LY,
  buyNow: HY,
  EventEnds: BY,
  removed: UY,
  lackCardId: WY,
  unableToFindGiftCard: qY
}, Zye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventEnds: BY,
  buyNow: HY,
  cardDesc: FY,
  convertibleGoods: DY,
  default: Jye,
  goodsTitleOne: EY,
  goodsTitleOneAnd: xY,
  goodsTitleTwo: RY,
  instruction: zY,
  lackCardId: WY,
  price: LY,
  purchaseQuantity: IY,
  removed: UY,
  selectDenomination: NY,
  unableToFindGiftCard: qY
}, Symbol.toStringTag, { value: "Module" })), VY = "元", GY = "送上您的祝福", YY = "自定义祝福语", KY = "请填写您的祝福语", QY = "确定赠送好友", XY = "赠送设置", JY = "礼品卡不存在", ZY = "嘿！朋友送你一张礼品卡，快来领取吧~", eK = "赠送数量", oK = "本次赠送数量", tK = "请输入本次赠送数量", nK = "限领数量", rK = "每人最多可领数量", sK = "请输入每人最多可领数量", aK = "共有", cK = "张", iK = "张卡片", lK = "确定", e$e = {
  yuan: VY,
  blessing: GY,
  customBlessing: YY,
  blessingPlaceholder: KY,
  giftToFriendsSave: QY,
  giveSetUp: XY,
  notCard: JY,
  shareTitle: ZY,
  giveNum: eK,
  giveNumPlaceholder: oK,
  giveNumPlaceholderOne: tK,
  limitNum: nK,
  limitNumPlaceholder: rK,
  limitNumPlaceholderOne: sK,
  tipsAnd: aK,
  unit: cK,
  tipsEnd: iK,
  giveSave: lK
}, o$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  blessing: GY,
  blessingPlaceholder: KY,
  customBlessing: YY,
  default: e$e,
  giftToFriendsSave: QY,
  giveNum: eK,
  giveNumPlaceholder: oK,
  giveNumPlaceholderOne: tK,
  giveSave: lK,
  giveSetUp: XY,
  limitNum: nK,
  limitNumPlaceholder: rK,
  limitNumPlaceholderOne: sK,
  notCard: JY,
  shareTitle: ZY,
  tipsAnd: aK,
  tipsEnd: iK,
  unit: cK,
  yuan: VY
}, Symbol.toStringTag, { value: "Module" })), dK = "送给他的", uK = "您祝对方", pK = "对方已领取", mK = "礼品卡不存在", t$e = {
  giveTipsOne: dK,
  giveTipsTwo: uK,
  otherReceive: pK,
  notCard: mK
}, n$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: t$e,
  giveTipsOne: dK,
  giveTipsTwo: uK,
  notCard: mK,
  otherReceive: pK
}, Symbol.toStringTag, { value: "Module" })), fK = "元", gK = "查看详情", hK = "暂无卡记录", r$e = {
  yuan: fK,
  viewDetails: gK,
  cardEmpty: hK
}, s$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cardEmpty: hK,
  default: r$e,
  viewDetails: gK,
  yuan: fK
}, Symbol.toStringTag, { value: "Module" })), _K = "全部", yK = "暂无卡记录", a$e = {
  all: _K,
  cardEmpty: yK
}, c$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: _K,
  cardEmpty: yK,
  default: a$e
}, Symbol.toStringTag, { value: "Module" })), $K = "元", vK = "全部", bK = "去使用", TK = "已使用", PK = "已失效", SK = "张", OK = "赠送好友", wK = "查看卡包", CK = "暂无卡记录", i$e = {
  yuan: $K,
  all: vK,
  canUse: bK,
  used: TK,
  invalid: PK,
  unit: SK,
  giftToFriends: OK,
  seeCardBag: wK,
  cardEmpty: CK
}, l$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: vK,
  canUse: bK,
  cardEmpty: CK,
  default: i$e,
  giftToFriends: OK,
  invalid: PK,
  seeCardBag: wK,
  unit: SK,
  used: TK,
  yuan: $K
}, Symbol.toStringTag, { value: "Module" })), MK = "元储值卡", jK = "订单留言", AK = "订单号", kK = "实付款", IK = "关闭订单", NK = "确认收货", DK = "去支付", EK = "缺少订单id", xK = "详情", RK = "支付流水号", zK = "创建时间", FK = "配送方式", LK = "支付方式", HK = "支付时间", BK = "商品金额", UK = "实付金额", WK = "首页", qK = "复制", VK = "查看卡包", GK = "该卡已转赠", YK = "详细信息", KK = "提示", QK = "您确定要关闭该订单吗？", d$e = {
  yuanStoredValueCard: MK,
  orderMessage: jK,
  orderNo: AK,
  actualPayment: kK,
  orderClose: IK,
  orderFinish: NK,
  topay: DK,
  notOrderId: EK,
  orderDetail: xK,
  orderTradeNo: RK,
  createTime: zK,
  deliveryType: FK,
  payTypeName: LK,
  payTime: HK,
  goodsMoney: BK,
  orderMoney: UK,
  index: WK,
  copy: qK,
  seeCardBag: VK,
  transfergiftCard: GK,
  detailedInformation: YK,
  tips: KK,
  tipsOne: QK
}, u$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: kK,
  copy: qK,
  createTime: zK,
  default: d$e,
  deliveryType: FK,
  detailedInformation: YK,
  goodsMoney: BK,
  index: WK,
  notOrderId: EK,
  orderClose: IK,
  orderDetail: xK,
  orderFinish: NK,
  orderMessage: jK,
  orderMoney: UK,
  orderNo: AK,
  orderTradeNo: RK,
  payTime: HK,
  payTypeName: LK,
  seeCardBag: VK,
  tips: KK,
  tipsOne: QK,
  topay: DK,
  transfergiftCard: GK,
  yuanStoredValueCard: MK
}, Symbol.toStringTag, { value: "Module" })), XK = "元储值卡", JK = "支付", ZK = "全部", eQ = "关闭订单", oQ = "暂无购卡记录", tQ = "提示", nQ = "您确定要关闭该订单吗？", p$e = {
  yuanStoredValueCard: XK,
  topay: JK,
  all: ZK,
  orderClose: eQ,
  cardEmpty: oQ,
  tips: tQ,
  tipsOne: nQ
}, m$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: ZK,
  cardEmpty: oQ,
  default: p$e,
  orderClose: eQ,
  tips: tQ,
  tipsOne: nQ,
  topay: JK,
  yuanStoredValueCard: XK
}, Symbol.toStringTag, { value: "Module" })), rQ = "元储值卡", sQ = "订单留言", aQ = "合计", cQ = "提交订单", iQ = "选填,建议先与商家协商一致", f$e = {
  yuanStoredValueCard: rQ,
  orderMessage: sQ,
  total: aQ,
  placeOrder: cQ,
  remarkPlaceholder: iQ
}, g$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: f$e,
  orderMessage: sQ,
  placeOrder: cQ,
  remarkPlaceholder: iQ,
  total: aQ,
  yuanStoredValueCard: rQ
}, Symbol.toStringTag, { value: "Module" })), lQ = "对方祝您", dQ = "赠送给您", uQ = "您还可以领取", pQ = "次礼品卡", mQ = "立即领取", fQ = "已被领取", gQ = "恭喜您 领取成功！", hQ = "您已成功领取了1张礼品卡~", _Q = "去看看", yQ = "礼品卡不存在", $Q = "查看卡包", h$e = {
  receiveTipsOne: lQ,
  freeForYou: dQ,
  receiveTipsTwo: uQ,
  receiveTipsTwoAnd: pQ,
  GetItNow: mQ,
  alreadyClaimed: fQ,
  popupTipsOne: gQ,
  popupTipsTwo: hQ,
  gouToSee: _Q,
  notCard: yQ,
  seeCardBag: $Q
}, _$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetItNow: mQ,
  alreadyClaimed: fQ,
  default: h$e,
  freeForYou: dQ,
  gouToSee: _Q,
  notCard: yQ,
  popupTipsOne: gQ,
  popupTipsTwo: hQ,
  receiveTipsOne: lQ,
  receiveTipsTwo: uQ,
  receiveTipsTwoAnd: pQ,
  seeCardBag: $Q
}, Symbol.toStringTag, { value: "Module" })), vQ = "赠送好友", bQ = "全部", TQ = "去使用", PQ = "已使用", SQ = "已失效", OQ = "暂无卡记录", y$e = {
  giftToFriends: vQ,
  all: bQ,
  canUse: TQ,
  used: PQ,
  invalid: SQ,
  cardEmpty: OQ
}, $$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: bQ,
  canUse: TQ,
  cardEmpty: OQ,
  default: y$e,
  giftToFriends: vQ,
  invalid: SQ,
  used: PQ
}, Symbol.toStringTag, { value: "Module" })), wQ = "元", CQ = "可兑换商品", MQ = "该兑换卡可在以下商品中任选", jQ = "件商品兑换", AQ = "该兑换卡可兑换以下商品", kQ = "最多可选", IQ = "件 已兑换", NQ = "件", DQ = "使用须知", EQ = "礼品卡详情", xQ = "去使用", RQ = "已使用", zQ = "已失效", FQ = "赠送好友", LQ = "卡包", HQ = "恭喜您 到账成功！", BQ = "元已充值到您的账户中~", UQ = "去看看", WQ = "礼品卡不存在", v$e = {
  yuan: wQ,
  convertibleGoods: CQ,
  goodsTitleOne: MQ,
  goodsTitleOneAnd: jQ,
  goodsTitleTwo: AQ,
  cardGoodsTypeAllTips: kQ,
  cardGoodsTypeAllTipsAnd: IQ,
  unit: NQ,
  instruction: DQ,
  cardDesc: EQ,
  canUse: xQ,
  used: RQ,
  invalid: zQ,
  giftToFriends: FQ,
  cardBag: LQ,
  popupTipsOne: HQ,
  popupTipsTwo: BQ,
  gouToSee: UQ,
  notCard: WQ
}, b$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canUse: xQ,
  cardBag: LQ,
  cardDesc: EQ,
  cardGoodsTypeAllTips: kQ,
  cardGoodsTypeAllTipsAnd: IQ,
  convertibleGoods: CQ,
  default: v$e,
  giftToFriends: FQ,
  goodsTitleOne: MQ,
  goodsTitleOneAnd: jQ,
  goodsTitleTwo: AQ,
  gouToSee: UQ,
  instruction: DQ,
  invalid: zQ,
  notCard: WQ,
  popupTipsOne: HQ,
  popupTipsTwo: BQ,
  unit: NQ,
  used: RQ,
  yuan: wQ
}, Symbol.toStringTag, { value: "Module" })), qQ = "以下商品存在已售罄或已下架的商品，请耐心等待卖家备货", VQ = "请在以下商品中任选", GQ = "件商品", YQ = "请兑换以下商品", KQ = "最多可选", QQ = "件 已兑换", XQ = "件", JQ = "该商品已售罄", ZQ = "该商品已下架", eX = "卡包", oX = "确认兑换", tX = "已使用", nX = "已失效", rX = "礼品卡不存在", sX = "请选择需要兑换的商品", aX = "该礼品卡必须全部提货", T$e = {
  pageTips: qQ,
  goodsTitle: VQ,
  goodsTitleAnd: GQ,
  goodsTitleTwo: YQ,
  cardGoodsTypeAllTips: KQ,
  cardGoodsTypeAllTipsAnd: QQ,
  unit: XQ,
  goodsSellOut: JQ,
  goodsRemove: ZQ,
  cardBag: eX,
  confirmExchange: oX,
  used: tX,
  invalid: nX,
  notCard: rX,
  saveTipsOne: sX,
  saveTipsTwo: aX
}, P$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cardBag: eX,
  cardGoodsTypeAllTips: KQ,
  cardGoodsTypeAllTipsAnd: QQ,
  confirmExchange: oX,
  default: T$e,
  goodsRemove: ZQ,
  goodsSellOut: JQ,
  goodsTitle: VQ,
  goodsTitleAnd: GQ,
  goodsTitleTwo: YQ,
  invalid: nX,
  notCard: rX,
  pageTips: qQ,
  saveTipsOne: sX,
  saveTipsTwo: aX,
  unit: XQ,
  used: tX
}, Symbol.toStringTag, { value: "Module" })), S$e = {}, O$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: S$e
}, Symbol.toStringTag, { value: "Module" })), cX = "添加照片", iX = "添加封面", lX = "添加标题", dX = "分享您的体验和心得...", uX = "话题", pX = "关联宝贝", mX = "社区分类", fX = "发布", w$e = {
  addPhoto: cX,
  addCover: iX,
  addTitle: lX,
  contentTips: dX,
  topic: uX,
  treasure: pX,
  communityCategory: mX,
  create: fX
}, C$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addCover: iX,
  addPhoto: cX,
  addTitle: lX,
  communityCategory: mX,
  contentTips: dX,
  create: fX,
  default: w$e,
  topic: uX,
  treasure: pX
}, Symbol.toStringTag, { value: "Module" })), gX = "关注", hX = "粉丝", _X = "请输入搜索关键词", yX = "取消关注", $X = "暂无关注", vX = "暂无粉丝", bX = "确定取消关注", M$e = {
  follow: gX,
  fans: hX,
  searchTips: _X,
  unFollow: yX,
  noFollow: $X,
  noFans: vX,
  unfollowTips: bX
}, j$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: M$e,
  fans: hX,
  follow: gX,
  noFans: vX,
  noFollow: $X,
  searchTips: _X,
  unFollow: yX,
  unfollowTips: bX
}, Symbol.toStringTag, { value: "Module" })), TX = "正在审核，内容仅自己可见", PX = "发布的内容审核通过后，将展示在首页！", SX = "您的审核已被拒绝", OX = "您发布的内容已被强制下架", wX = "请重新编辑内容", CX = "已关注", MX = "关注", jX = "管理", AX = "编辑", kX = "购买", IX = "评论", NX = "回复", DX = "展开更多", EX = "收起", xX = "展开", RX = "条回复", zX = "暂无评论", FX = "请输入关键字", LX = "发送", HX = "转发", BX = "赞", UX = "确定取消关注", WX = "确定删除该内容吗", qX = "确定删除该评论吗", A$e = {
  auditTitle: TX,
  auditdesc: PX,
  auditrefuse: SX,
  offContent: OX,
  offContentDesc: wX,
  followed: CX,
  follow: MX,
  manage: jX,
  edit: AX,
  delete: "删除",
  buy: kX,
  comment: IX,
  reply: NX,
  expandMore: DX,
  packUp: EX,
  expand: xX,
  replysWord: RX,
  noComments: zX,
  keywordsPlaceholder: FX,
  send: LX,
  transpond: HX,
  like: BX,
  unfollowTips: UX,
  deleteContentTips: WX,
  deleteCommentTips: qX
}, k$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTitle: TX,
  auditdesc: PX,
  auditrefuse: SX,
  buy: kX,
  comment: IX,
  default: A$e,
  deleteCommentTips: qX,
  deleteContentTips: WX,
  edit: AX,
  expand: xX,
  expandMore: DX,
  follow: MX,
  followed: CX,
  keywordsPlaceholder: FX,
  like: BX,
  manage: jX,
  noComments: zX,
  offContent: OX,
  offContentDesc: wX,
  packUp: EX,
  reply: NX,
  replysWord: RX,
  send: LX,
  transpond: HX,
  unfollowTips: UX
}, Symbol.toStringTag, { value: "Module" })), VX = "关注", GX = "发现", YX = "精选", KX = "图", QX = "暂无内容", XX = "更多", JX = "购买", ZX = "分享", eJ = "编辑", oJ = "展开", tJ = "收起", nJ = "发布您的第一个种草秀", rJ = "去发布", sJ = "发布作品", aJ = "我的主页", cJ = "确定删除该内容吗", I$e = {
  follow: VX,
  find: GX,
  selection: YX,
  picture: KX,
  noContent: QX,
  more: XX,
  buy: JX,
  share: ZX,
  edit: eJ,
  delete: "删除",
  expand: oJ,
  packUp: tJ,
  createFirstSowCommunity: nJ,
  toCreate: rJ,
  createContent: sJ,
  myInfo: aJ,
  deleteContentTips: cJ
}, N$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: JX,
  createContent: sJ,
  createFirstSowCommunity: nJ,
  default: I$e,
  deleteContentTips: cJ,
  edit: eJ,
  expand: oJ,
  find: GX,
  follow: VX,
  more: XX,
  myInfo: aJ,
  noContent: QX,
  packUp: tJ,
  picture: KX,
  selection: YX,
  share: ZX,
  toCreate: rJ
}, Symbol.toStringTag, { value: "Module" })), iJ = "去发布", lJ = "取消关注", dJ = "关注", uJ = "粉丝", pJ = "获赞", mJ = "作品", fJ = "赞过", gJ = "正在审核...", hJ = "通过后将在列表展示", _J = "审核拒绝...", yJ = "暂无作品", $J = "强制下架...", vJ = "请重新编辑内容", bJ = "确定取消关注", D$e = {
  toCreate: iJ,
  unFollow: lJ,
  follow: dJ,
  fans: uJ,
  like: pJ,
  content: mJ,
  liked: fJ,
  inAudit: gJ,
  auditTips: hJ,
  auditRefuse: _J,
  noContent: yJ,
  offContent: $J,
  offContentTips: vJ,
  unfollowTips: bJ
}, E$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditRefuse: _J,
  auditTips: hJ,
  content: mJ,
  default: D$e,
  fans: uJ,
  follow: dJ,
  inAudit: gJ,
  like: pJ,
  liked: fJ,
  noContent: yJ,
  offContent: $J,
  offContentTips: vJ,
  toCreate: iJ,
  unFollow: lJ,
  unfollowTips: bJ
}, Symbol.toStringTag, { value: "Module" })), TJ = "请输入关键字", PJ = "搜索", SJ = "图", OJ = "暂无内容", x$e = {
  keywordsTips: TJ,
  search: PJ,
  picture: SJ,
  noContent: OJ
}, R$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: x$e,
  keywordsTips: TJ,
  noContent: OJ,
  picture: SJ,
  search: PJ
}, Symbol.toStringTag, { value: "Module" })), wJ = "条种草秀", CJ = "图", MJ = "暂无内容", z$e = {
  itemSowshow: wJ,
  picture: CJ,
  noContent: MJ
}, F$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: z$e,
  itemSowshow: wJ,
  noContent: MJ,
  picture: CJ
}, Symbol.toStringTag, { value: "Module" })), jJ = "请输入话题名称", AJ = "欢迎加入", kJ = "讨论", IJ = "去发布", NJ = "种草", DJ = "篇", EJ = "内容", xJ = "最热", RJ = "图", zJ = "暂无内容", L$e = {
  keywordsTips: jJ,
  welcomeIn: AJ,
  discussion: kJ,
  toCreate: IJ,
  sowCommunity: NJ,
  piece: DJ,
  content: EJ,
  hot: xJ,
  new: "最新",
  picture: RJ,
  noContent: zJ
}, H$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  content: EJ,
  default: L$e,
  discussion: kJ,
  hot: xJ,
  keywordsTips: jJ,
  noContent: zJ,
  picture: RJ,
  piece: DJ,
  sowCommunity: NJ,
  toCreate: IJ,
  welcomeIn: AJ
}, Symbol.toStringTag, { value: "Module" })), FJ = "分享", LJ = "编辑", HJ = "展开", BJ = "收起", UJ = "购买", WJ = "暂无内容", qJ = "发布您的第一个种草秀", VJ = "去发布", GJ = "确定删除该内容吗", B$e = {
  share: FJ,
  edit: LJ,
  delete: "删除",
  expand: HJ,
  packUp: BJ,
  buy: UJ,
  noContent: WJ,
  createFirstSowCommunity: qJ,
  toCreate: VJ,
  deleteContentTips: GJ
}, U$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: UJ,
  createFirstSowCommunity: qJ,
  default: B$e,
  deleteContentTips: GJ,
  edit: LJ,
  expand: HJ,
  noContent: WJ,
  packUp: BJ,
  share: FJ,
  toCreate: VJ
}, Symbol.toStringTag, { value: "Module" })), W$e = {}, q$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: W$e
}, Symbol.toStringTag, { value: "Module" })), YJ = "全部", KJ = "价格", V$e = {
  all: YJ,
  price: KJ
}, G$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: YJ,
  default: V$e,
  price: KJ
}, Symbol.toStringTag, { value: "Module" })), QJ = "订单号", XJ = "起", JJ = "星级", ZJ = "星", eZ = "景点", oZ = "线路", tZ = "酒店", nZ = "查看更多", Y$e = {
  orderNo: QJ,
  rise: XJ,
  starLevel: JJ,
  star: ZJ,
  scenic: eZ,
  way: oZ,
  hotel: tZ,
  seeMore: nZ
}, K$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Y$e,
  hotel: tZ,
  orderNo: QJ,
  rise: XJ,
  scenic: eZ,
  seeMore: nZ,
  star: ZJ,
  starLevel: JJ,
  way: oZ
}, Symbol.toStringTag, { value: "Module" })), rZ = "详情/设施", sZ = "地图", aZ = "入住", cZ = "离店", iZ = "晚", lZ = "共", dZ = "抢", uZ = "在线付", pZ = "立即预约", mZ = "住店", fZ = "离店", gZ = "请选择离店日期", Q$e = {
  hotelTab: rZ,
  map: sZ,
  checkToday: aZ,
  checkTomorrow: cZ,
  lateness: iZ,
  common: lZ,
  rob: dZ,
  onlinePayment: uZ,
  bookNow: pZ,
  inHotel: mZ,
  checkOut: fZ,
  checkOutDate: gZ
}, X$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: pZ,
  checkOut: fZ,
  checkOutDate: gZ,
  checkToday: aZ,
  checkTomorrow: cZ,
  common: lZ,
  default: Q$e,
  hotelTab: rZ,
  inHotel: mZ,
  lateness: iZ,
  map: sZ,
  onlinePayment: uZ,
  rob: dZ
}, Symbol.toStringTag, { value: "Module" })), hZ = "请输入酒店名字", _Z = "全部", yZ = "起", $Z = "价格", J$e = {
  searchHotelName: hZ,
  all: _Z,
  rise: yZ,
  price: $Z
}, Z$e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: _Z,
  default: J$e,
  price: $Z,
  rise: yZ,
  searchHotelName: hZ
}, Symbol.toStringTag, { value: "Module" })), vZ = "景点", bZ = "线路", TZ = "酒店", PZ = "订单号", SZ = "起", OZ = "星级", wZ = "星", CZ = "查看更多", eve = {
  scenic: vZ,
  way: bZ,
  hotel: TZ,
  orderNo: PZ,
  rise: SZ,
  starLevel: OZ,
  star: wZ,
  seeMore: CZ
}, ove = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eve,
  hotel: TZ,
  orderNo: PZ,
  rise: SZ,
  scenic: vZ,
  seeMore: CZ,
  star: wZ,
  starLevel: OZ,
  way: bZ
}, Symbol.toStringTag, { value: "Module" })), MZ = "的帮付", tve = {
  helpPay: MZ
}, nve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tve,
  helpPay: MZ
}, Symbol.toStringTag, { value: "Module" })), jZ = "请输入景点名称", rve = {
  searchScenicName: jZ
}, sve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rve,
  searchScenicName: jZ
}, Symbol.toStringTag, { value: "Module" })), AZ = "请输入景点名称", ave = {
  searchScenicName: AZ
}, cve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ave,
  searchScenicName: AZ
}, Symbol.toStringTag, { value: "Module" })), kZ = "请输入景点名称", ive = {
  searchScenicName: kZ
}, lve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ive,
  searchScenicName: kZ
}, Symbol.toStringTag, { value: "Module" })), IZ = "已核销", NZ = "待核销", DZ = "核销其他", EZ = "订单编号", xZ = "创建时间", RZ = "支付时间", zZ = "核销时间", FZ = "线路信息", LZ = "预订时间", HZ = "游客人数", BZ = "景点信息", UZ = "门票信息", WZ = "酒店信息", qZ = "房型信息", VZ = "入住日期", GZ = "离店日期", YZ = "房间数", KZ = "未获取到核销记录", dve = {
  used: IZ,
  waitUse: NZ,
  verifyOther: DZ,
  orderNo: EZ,
  createTime: xZ,
  payTime: RZ,
  verifyTime: zZ,
  wayInfo: FZ,
  reserveTime: LZ,
  touristNum: HZ,
  scenicInfo: BZ,
  ticketInfo: UZ,
  hotelInfo: WZ,
  roomInfo: qZ,
  hotelStartTime: VZ,
  hotelEndTime: GZ,
  hoteltNum: YZ,
  verifyDetailEmpty: KZ
}, uve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: xZ,
  default: dve,
  hotelEndTime: GZ,
  hotelInfo: WZ,
  hotelStartTime: VZ,
  hoteltNum: YZ,
  orderNo: EZ,
  payTime: RZ,
  reserveTime: LZ,
  roomInfo: qZ,
  scenicInfo: BZ,
  ticketInfo: UZ,
  touristNum: HZ,
  used: IZ,
  verifyDetailEmpty: KZ,
  verifyOther: DZ,
  verifyTime: zZ,
  waitUse: NZ,
  wayInfo: FZ
}, Symbol.toStringTag, { value: "Module" })), QZ = "不是核销员", XZ = "核销券码", JZ = "确认核销", ZZ = "请输入核销码", eee = "核销记录", oee = "查询", tee = "未查询到核销码信息", nee = "已核销", ree = "待核销", see = "核销其他", aee = "订单编号", cee = "创建时间", iee = "支付时间", lee = "核销时间", dee = "线路信息", uee = "预订时间", pee = "游客人数", mee = "景点信息", fee = "门票信息", gee = "酒店信息", hee = "房型信息", _ee = "入住日期", yee = "离店日期", $ee = "房间数", pve = {
  notIsVerifier: QZ,
  verifyTitle: XZ,
  confirmVerify: JZ,
  inputPlaceholder: ZZ,
  verifyRecord: eee,
  search: oee,
  notSearchResult: tee,
  used: nee,
  waitUse: ree,
  verifyOther: see,
  orderNo: aee,
  createTime: cee,
  payTime: iee,
  verifyTime: lee,
  wayInfo: dee,
  reserveTime: uee,
  touristNum: pee,
  scenicInfo: mee,
  ticketInfo: fee,
  hotelInfo: gee,
  roomInfo: hee,
  hotelStartTime: _ee,
  hotelEndTime: yee,
  hoteltNum: $ee
}, mve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmVerify: JZ,
  createTime: cee,
  default: pve,
  hotelEndTime: yee,
  hotelInfo: gee,
  hotelStartTime: _ee,
  hoteltNum: $ee,
  inputPlaceholder: ZZ,
  notIsVerifier: QZ,
  notSearchResult: tee,
  orderNo: aee,
  payTime: iee,
  reserveTime: uee,
  roomInfo: hee,
  scenicInfo: mee,
  search: oee,
  ticketInfo: fee,
  touristNum: pee,
  used: nee,
  verifyOther: see,
  verifyRecord: eee,
  verifyTime: lee,
  verifyTitle: XZ,
  waitUse: ree,
  wayInfo: dee
}, Symbol.toStringTag, { value: "Module" })), vee = "请输入线路名字", fve = {
  searchWayName: vee
}, gve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fve,
  searchWayName: vee
}, Symbol.toStringTag, { value: "Module" })), bee = "项目预约", Tee = "办理次卡", Pee = "预约成功", See = "预约", Oee = "次卡", wee = "去抢购", Cee = "办理", Mee = "已售", jee = "订单号", Aee = "我的", kee = "会员码", Iee = "查看更多", hve = {
  cardReserve: bee,
  card: Tee,
  reserveSuccess: Pee,
  reserve: See,
  cardLink: Oee,
  reserveBtn: wee,
  cardBtn: Cee,
  soldOut: Mee,
  orderNo: jee,
  myLink: Aee,
  memberCode: kee,
  seeMore: Iee
}, _ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  card: Tee,
  cardBtn: Cee,
  cardLink: Oee,
  cardReserve: bee,
  default: hve,
  memberCode: kee,
  myLink: Aee,
  orderNo: jee,
  reserve: See,
  reserveBtn: wee,
  reserveSuccess: Pee,
  seeMore: Iee,
  soldOut: Mee
}, Symbol.toStringTag, { value: "Module" })), Nee = "卡项内项目/商品总的可用次数为", Dee = "次数不限 ,", Eee = "有效期为", xee = "永久", Ree = "天", zee = "包含套餐", Fee = "可用次数", Lee = "购买须知", Hee = "暂无购买须知", Bee = "卡项详情", Uee = "暂无卡项详情", Wee = "立即购买", qee = "首页", Vee = "客服", Gee = "收藏", Yee = "已售", Kee = "有效期", Qee = "总次数：", Xee = "已使用次数：", Jee = "价格", yve = {
  hitCount: Nee,
  unlimitedNumberTimes: Dee,
  periodValidity: Eee,
  perpetual: xee,
  day: Ree,
  packageIncluded: zee,
  hitCountOne: Fee,
  purchaseNotes: Lee,
  noPurchaseNotes: Hee,
  cardDetail: Bee,
  noCardDetail: Uee,
  buy: Wee,
  index: qee,
  service: Vee,
  collect: Gee,
  soldOut: Yee,
  create: Kee,
  usable: Qee,
  haveBeen: Xee,
  price: Jee
}, $ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: Wee,
  cardDetail: Bee,
  collect: Gee,
  create: Kee,
  day: Ree,
  default: yve,
  haveBeen: Xee,
  hitCount: Nee,
  hitCountOne: Fee,
  index: qee,
  noCardDetail: Uee,
  noPurchaseNotes: Hee,
  packageIncluded: zee,
  periodValidity: Eee,
  perpetual: xee,
  price: Jee,
  purchaseNotes: Lee,
  service: Vee,
  soldOut: Yee,
  unlimitedNumberTimes: Dee,
  usable: Qee
}, Symbol.toStringTag, { value: "Module" })), Zee = "请输入搜索关键词", eoe = "抢购", ooe = "项目预约", toe = "办理次卡", noe = "预约成功", roe = "预约", soe = "次卡", aoe = "办理", coe = "已售", ioe = "订单号", loe = "我的", doe = "会员码", uoe = "查看更多", vve = {
  searchNamePlaceholder: Zee,
  reserveBtn: eoe,
  cardReserve: ooe,
  card: toe,
  reserveSuccess: noe,
  reserve: roe,
  cardLink: soe,
  cardBtn: aoe,
  soldOut: coe,
  orderNo: ioe,
  myLink: loe,
  memberCode: doe,
  seeMore: uoe
}, bve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  card: toe,
  cardBtn: aoe,
  cardLink: soe,
  cardReserve: ooe,
  default: vve,
  memberCode: doe,
  myLink: loe,
  orderNo: ioe,
  reserve: roe,
  reserveBtn: eoe,
  reserveSuccess: noe,
  searchNamePlaceholder: Zee,
  seeMore: uoe,
  soldOut: coe
}, Symbol.toStringTag, { value: "Module" })), poe = "核销次数", Tve = {
  verificationNum: poe
}, Pve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tve,
  verificationNum: poe
}, Symbol.toStringTag, { value: "Module" })), moe = "订单", foe = "您的订单", goe = "，欢迎再次预订！", hoe = "实付款", _oe = "订单编号", yoe = "复制", $oe = "交易号", voe = "下单时间", boe = "关闭时间", Toe = "支付时间", Poe = "支付方式", Soe = "订单进度", Ooe = "退款进度", woe = "拒绝原因", Coe = "退款方式：原路退款，", Moe = "退款金额", joe = "首页", Aoe = "客服", koe = "收藏", Ioe = "去使用", Noe = "查看退款", Doe = "取消退款", Eoe = "申请退款", xoe = "的帮付", Roe = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", Sve = {
  order: moe,
  yourOrder: foe,
  rebook: goe,
  annualPayment: hoe,
  onOrder: _oe,
  copy: yoe,
  transactionNumber: $oe,
  orderTime: voe,
  offTime: boe,
  payTime: Toe,
  modePayment: Poe,
  orderSchedule: Soe,
  refundProgress: Ooe,
  reasonRefusal: woe,
  refundMethod: Coe,
  refundAmount: Moe,
  index: joe,
  service: Aoe,
  collect: koe,
  toUse: Ioe,
  viewRefund: Noe,
  cancelRefund: Doe,
  applyRefund: Eoe,
  helpPay: xoe,
  cancelRefundContent: Roe
}, Ove = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annualPayment: hoe,
  applyRefund: Eoe,
  cancelRefund: Doe,
  cancelRefundContent: Roe,
  collect: koe,
  copy: yoe,
  default: Sve,
  helpPay: xoe,
  index: joe,
  modePayment: Poe,
  offTime: boe,
  onOrder: _oe,
  order: moe,
  orderSchedule: Soe,
  orderTime: voe,
  payTime: Toe,
  reasonRefusal: woe,
  rebook: goe,
  refundAmount: Moe,
  refundMethod: Coe,
  refundProgress: Ooe,
  service: Aoe,
  toUse: Ioe,
  transactionNumber: $oe,
  viewRefund: Noe,
  yourOrder: foe
}, Symbol.toStringTag, { value: "Module" })), zoe = "全部", Foe = "实付金额", Loe = "未获取到订单信息", wve = {
  all: zoe,
  payMoney: Foe,
  emptyTips: Loe
}, Cve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: zoe,
  default: wve,
  emptyTips: Loe,
  payMoney: Foe
}, Symbol.toStringTag, { value: "Module" })), Hoe = "购买时间：", Boe = "卡项次数：不限次数", Uoe = "卡项次数：", Woe = "去使用", Mve = {
  createTime: Hoe,
  cardNumNoLimit: Boe,
  cardNum: Uoe,
  toUse: Woe
}, jve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cardNum: Uoe,
  cardNumNoLimit: Boe,
  createTime: Hoe,
  default: Mve,
  toUse: Woe
}, Symbol.toStringTag, { value: "Module" })), qoe = "使用记录", Voe = "使用说明", Goe = "暂无使用说明", Yoe = "服务内容", Koe = "有效期", Qoe = "创建时间", Xoe = "去核销", Joe = "核销码", Zoe = "总次数：", ete = "已使用次数：", ote = "卡项内项目/商品总的可用次数为", tte = "次数不限 ,", nte = "未消费前请不要将券码提供给商家", Ave = {
  usageRecord: qoe,
  instructions: Voe,
  noInstructions: Goe,
  serviceContent: Yoe,
  periodValidity: Koe,
  createTime: Qoe,
  verification: Xoe,
  verificationCode: Joe,
  usable: Zoe,
  haveBeen: ete,
  hitCount: ote,
  unlimitedNumberTimes: tte,
  codeDesc: nte
}, kve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  codeDesc: nte,
  createTime: Qoe,
  default: Ave,
  haveBeen: ete,
  hitCount: ote,
  instructions: Voe,
  noInstructions: Goe,
  periodValidity: Koe,
  serviceContent: Yoe,
  unlimitedNumberTimes: tte,
  usable: Zoe,
  usageRecord: qoe,
  verification: Xoe,
  verificationCode: Joe
}, Symbol.toStringTag, { value: "Module" })), rte = "全部", ste = "实付金额", ate = "未获取到订单信息", Ive = {
  all: rte,
  payMoney: ste,
  emptyTips: ate
}, Nve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: rte,
  default: Ive,
  emptyTips: ate,
  payMoney: ste
}, Symbol.toStringTag, { value: "Module" })), cte = "预约技师", ite = "预约时间", lte = "预约信息", dte = "订单编号", ute = "创建时间", pte = "联系电话", mte = "共计", fte = "个商品", gte = "取消预约", hte = "立即支付", _te = "买家留言", yte = "预约状态", Dve = {
  reservedTechnician: cte,
  reservedTime: ite,
  reservedInfo: lte,
  orderNo: dte,
  createTime: ute,
  mobile: pte,
  sumTo: mte,
  goodsNum: fte,
  cancelReserved: gte,
  pay: hte,
  remark: _te,
  reserveStateName: yte
}, Eve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelReserved: gte,
  createTime: ute,
  default: Dve,
  goodsNum: fte,
  mobile: pte,
  orderNo: dte,
  pay: hte,
  remark: _te,
  reserveStateName: yte,
  reservedInfo: lte,
  reservedTechnician: cte,
  reservedTime: ite,
  sumTo: mte
}, Symbol.toStringTag, { value: "Module" })), $te = "购买须知", vte = "暂无购买须知", bte = "卡项详情", Tte = "暂无卡项详情", Pte = "立即购买", Ste = "立即预约", Ote = "首页", wte = "客服", Cte = "收藏", xve = {
  purchaseNotes: $te,
  noPurchaseNotes: vte,
  cardDetail: bte,
  noCardDetail: Tte,
  buy: Pte,
  reserve: Ste,
  index: Ote,
  service: wte,
  collect: Cte
}, Rve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: Pte,
  cardDetail: bte,
  collect: Cte,
  default: xve,
  index: Ote,
  noCardDetail: Tte,
  noPurchaseNotes: vte,
  purchaseNotes: $te,
  reserve: Ste,
  service: wte
}, Symbol.toStringTag, { value: "Module" })), Mte = "请输入搜索关键词", jte = "抢购", zve = {
  searchNamePlaceholder: Mte,
  reserveBtn: jte
}, Fve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zve,
  reserveBtn: jte,
  searchNamePlaceholder: Mte
}, Symbol.toStringTag, { value: "Module" })), Ate = "选择技师", kte = "请选择", Ite = "预约时间", Nte = "买家留言", Dte = "请填写留言信息", Ete = "立即购买", xte = "立即预约", Rte = "首页", zte = "手机号", Fte = "请输入手机号", Lte = "请输入正确的手机号", Hte = "客服", Bte = "收藏", Lve = {
  selectTechnician: Ate,
  pleaseChoose: kte,
  reserveTime: Ite,
  remark: Nte,
  fillRemark: Dte,
  buy: Ete,
  reserve: xte,
  index: Rte,
  mobile: zte,
  mobilePlaceholder: Fte,
  correctMobilePlaceholder: Lte,
  service: Hte,
  collect: Bte
}, Hve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: Ete,
  collect: Bte,
  correctMobilePlaceholder: Lte,
  default: Lve,
  fillRemark: Dte,
  index: Rte,
  mobile: zte,
  mobilePlaceholder: Fte,
  pleaseChoose: kte,
  remark: Nte,
  reserve: xte,
  reserveTime: Ite,
  selectTechnician: Ate,
  service: Hte
}, Symbol.toStringTag, { value: "Module" })), Ute = "核销时间", Wte = "核销码", qte = "核销次数", Bve = {
  createTime: Ute,
  verifyCode: Wte,
  verifyNum: qte
}, Uve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: Ute,
  default: Bve,
  verifyCode: Wte,
  verifyNum: qte
}, Symbol.toStringTag, { value: "Module" })), Vte = "不是核销员", Gte = "核销券码", Yte = "确认核销", Kte = "请输入核销码", Qte = "核销记录", Xte = "查询", Jte = "未查询到核销码信息", Zte = "已核销", ene = "待核销", one = "核销其他", tne = "创建时间", nne = "核销时间", rne = "有效期", sne = "长期有效", ane = "可用次数", cne = "核销数量", ine = "不限制次数", lne = "已核销次数", Wve = {
  notIsVerifier: Vte,
  verifyTitle: Gte,
  confirmVerify: Yte,
  inputPlaceholder: Kte,
  verifyRecord: Qte,
  search: Xte,
  notSearchResult: Jte,
  used: Zte,
  waitUse: ene,
  verifyOther: one,
  createTime: tne,
  verifyTime: nne,
  expireTime: rne,
  longTerm: sne,
  availableNum: ane,
  verifyNum: cne,
  noLimitNum: ine,
  useNum: lne
}, qve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  availableNum: ane,
  confirmVerify: Yte,
  createTime: tne,
  default: Wve,
  expireTime: rne,
  inputPlaceholder: Kte,
  longTerm: sne,
  noLimitNum: ine,
  notIsVerifier: Vte,
  notSearchResult: Jte,
  search: Xte,
  useNum: lne,
  used: Zte,
  verifyNum: cne,
  verifyOther: one,
  verifyRecord: Qte,
  verifyTime: nne,
  verifyTitle: Gte,
  waitUse: ene
}, Symbol.toStringTag, { value: "Module" })), dne = "核销时间", une = "核销码", pne = "核销次数", Vve = {
  createTime: dne,
  verifyCode: une,
  verifyNum: pne
}, Gve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: dne,
  default: Vve,
  verifyCode: une,
  verifyNum: pne
}, Symbol.toStringTag, { value: "Module" }));
export {
  qe as default,
  Yn as ensureDiyDecorateBridge,
  Ude as getDiyInfo,
  tbe as getMemberFormRecord,
  obe as getShareInfo,
  ebe as getTabbarList,
  Gn as isDecoratePreviewUrl,
  Zve as isInAdminIframe,
  Ede as notifyAdminDecorateReady,
  sn as resolveDecorateMode,
  nbe as useDiy,
  rbe as useDiyGroup,
  qe as useDiyStore
};
