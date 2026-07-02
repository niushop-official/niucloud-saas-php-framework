var mze = Object.defineProperty;
var _ze = (o, e, t) => e in o ? mze(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var be = (o, e, t) => (_ze(o, typeof e != "symbol" ? e + "" : e, t), t);
import { defineStore as zo } from "pinia";
import { getCurrentInstance as hn, nextTick as oe, ref as X, toRaw as go, isInSSRComponentSetup as gze, injectHook as hze, inject as fze, reactive as kt, computed as fn, watch as yn, onMounted as yze } from "vue";
import { createI18n as $ze } from "vue-i18n";
const vze = [], bze = [], Tze = {
  list: []
}, Pze = {
  custom: {}
}, we = {
  pages: vze,
  subPackages: bze,
  tabBar: Tze,
  easycom: Pze
};
function Sze() {
  const o = [];
  return we.pages.forEach((e) => {
    e.needLogin && o.push(`/${e.path}`);
  }), we.subPackages && we.subPackages.forEach((e) => {
    e.pages && e.pages.forEach((t) => {
      t.needLogin && o.push(`/${e.root}/${t.path}`);
    });
  }), o;
}
function Oze() {
  const o = [];
  return we.pages.forEach((e) => {
    o.push(`/${e.path}`);
  }), o;
}
function wze() {
  const o = [];
  return we.subPackages && we.subPackages.forEach((e) => {
    e.pages && e.pages.forEach((t) => {
      o.push(`/${e.root}/${t.path}`);
    });
  }), o;
}
function jze() {
  return we.tabBar.list.map((o) => `/${o.pagePath}`);
}
const Ct = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, s) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(s.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
function kze() {
  return !1;
}
const Ho = "/wap";
function Cze(o) {
  return o.replace(/^\/wap\/\d+\//, "/wap/");
}
function Mt(o) {
  return !o || o.startsWith("http") ? o : o.startsWith("/wap/") ? Cze(o) : o.startsWith("/assets/") ? `${Ho}${o}` : o.startsWith("./") ? `${Ho}/assets/addons/${o.slice(2)}` : `${Ho}/${o.replace(/^\//, "")}`;
}
function ut() {
  return uni;
}
function wo(o) {
  let e = (o || "").trim();
  return !e || e === "/" ? "/" : (e.startsWith("/") || (e = `/${e}`), e = e.replace(/^\/wap\/(?:\d+\/)?/, "/"), e.startsWith("/") || (e = `/${e}`), e);
}
function Mze() {
  var o, e;
  try {
    const t = globalThis, n = ((o = t.getCurrentPages) == null ? void 0 : o.call(t)) || [], s = (e = n[n.length - 1]) == null ? void 0 : e.route;
    return s ? wo(s) : "";
  } catch {
    return "";
  }
}
function Aze() {
  var n, s;
  const o = hn(), e = (n = o == null ? void 0 : o.appContext.config.globalProperties.$route) == null ? void 0 : n.path;
  if (e)
    return wo(e);
  const t = Mze();
  return t && t !== "/" ? t : typeof window < "u" && ((s = window.location) != null && s.pathname) ? wo(window.location.pathname) : "/";
}
function Ize(o) {
  try {
    const e = wo(o).replace(/^\//, "");
    if (!e)
      return { file: "pages.index.index", fileKey: "pages.index.index", route: "app" };
    const t = e.split("/").filter(Boolean);
    if (t[0] === "app") {
      const n = t.slice(1).join("/"), s = n ? n.replace(/\//g, ".") : "pages.index.index";
      return { file: s, fileKey: s, route: "app" };
    }
    if (t[0] === "addon" && t.length >= 3) {
      const n = t[1], r = t.slice(2).join("/").replace(/\//g, ".");
      return { file: r, fileKey: `${n}.${r}`, route: n };
    }
    return { file: "pages.index.index", fileKey: "pages.index.index", route: "app" };
  } catch {
    return { file: "pages.index.index", fileKey: "pages.index.index", route: "app" };
  }
}
class Nze {
  constructor(e) {
    be(this, "i18n");
    be(this, "loadLocale", []);
    //已加载的语言
    be(this, "path", "");
    be(this, "getFileKey", (e) => Ize(e));
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
    (e == "app" ? Oze() : wze()).forEach((s) => {
      this.loadLocaleMessages(s, t);
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
      const s = Mt(`assets/locale/app/${n}/${e}.json`), r = await fetch(s);
      if (!r.ok)
        throw new Error(String(r.status));
      if ((r.headers.get("content-type") || "").toLowerCase().includes("text/html"))
        throw new Error("invalid locale response");
      const a = await r.json(), i = {};
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
    const s = {};
    Object.keys(n).forEach((r) => {
      s[`${t}.${r}`] = n[r];
    }), this.i18n.global.mergeLocaleMessage(e, s);
  }
  /**
   * 分构建下从 assets/addons/{key}/locale/ 拉取语言包（含 common.json）
   */
  async loadSplitAddonLocale(e, t, n, s) {
    if (this.loadLocale.includes(`${n}.${s}`))
      return this.setI18nLanguage(s, t), oe();
    this.loadLocale.push(`${n}.${s}`);
    const r = `${e}.common.${s}`, c = Mt(`assets/addons/${e}/locale/${s}`);
    try {
      if (t !== "common" && !this.loadLocale.includes(r)) {
        this.loadLocale.push(r);
        try {
          const i = await this.fetchLocaleJson(`${c}/common.json`);
          this.mergeLocalePack(s, `${e}.common`, i), Object.keys(i).forEach((l) => {
            this.i18n.global.mergeLocaleMessage(s, { [l]: i[l] });
          });
        } catch {
        }
      }
      const a = await this.fetchLocaleJson(`${c}/${t}.json`);
      this.mergeLocalePack(s, n, a), this.setI18nLanguage(s, t);
    } catch {
      this.setI18nLanguage(s, t);
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
      const { route: n, file: s, fileKey: r } = this.getFileKey(e);
      if (this.loadLocale.includes(`${r}.${t}`))
        return this.setI18nLanguage(t, s), oe();
      kze(), this.loadLocale.push(`${r}.${t}`);
      let c;
      c = await (n == "app" ? Ct(/* @__PURE__ */ Object.assign({ "../app/locale/en/pages.setting.index.json": () => Promise.resolve().then(() => gLe), "../app/locale/zh-Hans/pages.article.detail.json": () => Promise.resolve().then(() => fLe), "../app/locale/zh-Hans/pages.article.list.json": () => Promise.resolve().then(() => $Le), "../app/locale/zh-Hans/pages.auth.bind.json": () => Promise.resolve().then(() => bLe), "../app/locale/zh-Hans/pages.auth.index.json": () => Promise.resolve().then(() => PLe), "../app/locale/zh-Hans/pages.auth.login.json": () => Promise.resolve().then(() => OLe), "../app/locale/zh-Hans/pages.auth.register.json": () => Promise.resolve().then(() => jLe), "../app/locale/zh-Hans/pages.auth.resetpwd.json": () => Promise.resolve().then(() => CLe), "../app/locale/zh-Hans/pages.friendspay.money.json": () => Promise.resolve().then(() => ALe), "../app/locale/zh-Hans/pages.friendspay.share.json": () => Promise.resolve().then(() => NLe), "../app/locale/zh-Hans/pages.index.develop.json": () => Promise.resolve().then(() => zLe), "../app/locale/zh-Hans/pages.member.account.json": () => Promise.resolve().then(() => ELe), "../app/locale/zh-Hans/pages.member.account_edit.json": () => Promise.resolve().then(() => FLe), "../app/locale/zh-Hans/pages.member.address.json": () => Promise.resolve().then(() => LLe), "../app/locale/zh-Hans/pages.member.address_edit.json": () => Promise.resolve().then(() => ULe), "../app/locale/zh-Hans/pages.member.apply_cash_out.json": () => Promise.resolve().then(() => qLe), "../app/locale/zh-Hans/pages.member.balance.json": () => Promise.resolve().then(() => VLe), "../app/locale/zh-Hans/pages.member.cash_out.json": () => Promise.resolve().then(() => KLe), "../app/locale/zh-Hans/pages.member.cash_out_detail.json": () => Promise.resolve().then(() => XLe), "../app/locale/zh-Hans/pages.member.commission.json": () => Promise.resolve().then(() => ZLe), "../app/locale/zh-Hans/pages.member.detailed_account.json": () => Promise.resolve().then(() => oBe), "../app/locale/zh-Hans/pages.member.location_address_edit.json": () => Promise.resolve().then(() => nBe), "../app/locale/zh-Hans/pages.member.personal.json": () => Promise.resolve().then(() => rBe), "../app/locale/zh-Hans/pages.member.recharge_record.json": () => Promise.resolve().then(() => cBe), "../app/locale/zh-Hans/pages.member.recharge_record_detail.json": () => Promise.resolve().then(() => lBe), "../app/locale/zh-Hans/pages.member.withdrawal_detail.json": () => Promise.resolve().then(() => uBe), "../app/locale/zh-Hans/pages.setting.index.json": () => Promise.resolve().then(() => mBe) }), `../app/locale/${t}/${s}.json`) : Ct(/* @__PURE__ */ Object.assign({ "../addon/cms/locale/zh-Hans/pages.detail.json": () => Promise.resolve().then(() => gBe), "../addon/cms/locale/zh-Hans/pages.list.json": () => Promise.resolve().then(() => fBe), "../addon/friend_help/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => $Be), "../addon/friend_help/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => bBe), "../addon/friend_help/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => PBe), "../addon/friend_help/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => OBe), "../addon/friend_help/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => jBe), "../addon/friend_help/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => CBe), "../addon/friend_help/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => ABe), "../addon/higohome/locale/zh-Hans/common.json": () => Promise.resolve().then(() => NBe), "../addon/higohome/locale/zh-Hans/pages.agent.agent_apply.json": () => Promise.resolve().then(() => zBe), "../addon/higohome/locale/zh-Hans/pages.agent.agent_info.json": () => Promise.resolve().then(() => EBe), "../addon/higohome/locale/zh-Hans/pages.agent.divided.detail.json": () => Promise.resolve().then(() => FBe), "../addon/higohome/locale/zh-Hans/pages.agent.divided.divided_details.json": () => Promise.resolve().then(() => LBe), "../addon/higohome/locale/zh-Hans/pages.agent.index.json": () => Promise.resolve().then(() => UBe), "../addon/higohome/locale/zh-Hans/pages.agent.order.index.json": () => Promise.resolve().then(() => qBe), "../addon/higohome/locale/zh-Hans/pages.agent.order.order_info.json": () => Promise.resolve().then(() => VBe), "../addon/higohome/locale/zh-Hans/pages.agent.service_withdrawal.json": () => Promise.resolve().then(() => KBe), "../addon/higohome/locale/zh-Hans/pages.agent.tech_manage.json": () => Promise.resolve().then(() => XBe), "../addon/higohome/locale/zh-Hans/pages.article.detail.json": () => Promise.resolve().then(() => ZBe), "../addon/higohome/locale/zh-Hans/pages.article.list.json": () => Promise.resolve().then(() => o0e), "../addon/higohome/locale/zh-Hans/pages.auth.agreement.json": () => Promise.resolve().then(() => n0e), "../addon/higohome/locale/zh-Hans/pages.auth.bind.json": () => Promise.resolve().then(() => r0e), "../addon/higohome/locale/zh-Hans/pages.auth.index.json": () => Promise.resolve().then(() => c0e), "../addon/higohome/locale/zh-Hans/pages.auth.login.json": () => Promise.resolve().then(() => l0e), "../addon/higohome/locale/zh-Hans/pages.auth.register.json": () => Promise.resolve().then(() => u0e), "../addon/higohome/locale/zh-Hans/pages.auth.resetpwd.json": () => Promise.resolve().then(() => m0e), "../addon/higohome/locale/zh-Hans/pages.channel.channel_register.json": () => Promise.resolve().then(() => g0e), "../addon/higohome/locale/zh-Hans/pages.channel.index.json": () => Promise.resolve().then(() => f0e), "../addon/higohome/locale/zh-Hans/pages.city.selectCity.json": () => Promise.resolve().then(() => $0e), "../addon/higohome/locale/zh-Hans/pages.comment.tech.add_comment.json": () => Promise.resolve().then(() => b0e), "../addon/higohome/locale/zh-Hans/pages.comment.tech.list.json": () => Promise.resolve().then(() => P0e), "../addon/higohome/locale/zh-Hans/pages.comment.tech.my_comment.json": () => Promise.resolve().then(() => O0e), "../addon/higohome/locale/zh-Hans/pages.distribution.distribution.json": () => Promise.resolve().then(() => j0e), "../addon/higohome/locale/zh-Hans/pages.distribution.distribution.order.json": () => Promise.resolve().then(() => C0e), "../addon/higohome/locale/zh-Hans/pages.distribution.distribution.team.json": () => Promise.resolve().then(() => A0e), "../addon/higohome/locale/zh-Hans/pages.distribution.distribution_partner.json": () => Promise.resolve().then(() => N0e), "../addon/higohome/locale/zh-Hans/pages.distribution.index.json": () => Promise.resolve().then(() => z0e), "../addon/higohome/locale/zh-Hans/pages.dynamic.add_dynamic.json": () => Promise.resolve().then(() => E0e), "../addon/higohome/locale/zh-Hans/pages.dynamic.dynamicDetail.json": () => Promise.resolve().then(() => F0e), "../addon/higohome/locale/zh-Hans/pages.dynamic.dynamicDetailVideo.json": () => Promise.resolve().then(() => L0e), "../addon/higohome/locale/zh-Hans/pages.dynamic.index.json": () => Promise.resolve().then(() => U0e), "../addon/higohome/locale/zh-Hans/pages.dynamic.tech_dynamic.json": () => Promise.resolve().then(() => q0e), "../addon/higohome/locale/zh-Hans/pages.feedback.index.json": () => Promise.resolve().then(() => V0e), "../addon/higohome/locale/zh-Hans/pages.feedback.list.json": () => Promise.resolve().then(() => K0e), "../addon/higohome/locale/zh-Hans/pages.fenxiao.apply.json": () => Promise.resolve().then(() => X0e), "../addon/higohome/locale/zh-Hans/pages.fenxiao.index.json": () => Promise.resolve().then(() => Z0e), "../addon/higohome/locale/zh-Hans/pages.fenxiao.member.json": () => Promise.resolve().then(() => o4e), "../addon/higohome/locale/zh-Hans/pages.fenxiao.order.json": () => Promise.resolve().then(() => n4e), "../addon/higohome/locale/zh-Hans/pages.friendspay.money.json": () => Promise.resolve().then(() => r4e), "../addon/higohome/locale/zh-Hans/pages.friendspay.share.json": () => Promise.resolve().then(() => c4e), "../addon/higohome/locale/zh-Hans/pages.goods.category.json": () => Promise.resolve().then(() => l4e), "../addon/higohome/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => u4e), "../addon/higohome/locale/zh-Hans/pages.goods.index.json": () => Promise.resolve().then(() => m4e), "../addon/higohome/locale/zh-Hans/pages.hello_world.index.json": () => Promise.resolve().then(() => g4e), "../addon/higohome/locale/zh-Hans/pages.home.coupon.json": () => Promise.resolve().then(() => f4e), "../addon/higohome/locale/zh-Hans/pages.home.index.json": () => Promise.resolve().then(() => $4e), "../addon/higohome/locale/zh-Hans/pages.home.tech_allList.json": () => Promise.resolve().then(() => b4e), "../addon/higohome/locale/zh-Hans/pages.home.tech_list_all.json": () => Promise.resolve().then(() => P4e), "../addon/higohome/locale/zh-Hans/pages.home.test.json": () => Promise.resolve().then(() => O4e), "../addon/higohome/locale/zh-Hans/pages.index.develop.json": () => Promise.resolve().then(() => j4e), "../addon/higohome/locale/zh-Hans/pages.manger.index.json": () => Promise.resolve().then(() => C4e), "../addon/higohome/locale/zh-Hans/pages.manger.order.json": () => Promise.resolve().then(() => A4e), "../addon/higohome/locale/zh-Hans/pages.manger.order_info.json": () => Promise.resolve().then(() => N4e), "../addon/higohome/locale/zh-Hans/pages.manger.technician.list.json": () => Promise.resolve().then(() => z4e), "../addon/higohome/locale/zh-Hans/pages.manger.technician.tech_detail.json": () => Promise.resolve().then(() => E4e), "../addon/higohome/locale/zh-Hans/pages.map.select_location.json": () => Promise.resolve().then(() => F4e), "../addon/higohome/locale/zh-Hans/pages.member.account.json": () => Promise.resolve().then(() => L4e), "../addon/higohome/locale/zh-Hans/pages.member.account_edit.json": () => Promise.resolve().then(() => U4e), "../addon/higohome/locale/zh-Hans/pages.member.add_address.json": () => Promise.resolve().then(() => q4e), "../addon/higohome/locale/zh-Hans/pages.member.address.json": () => Promise.resolve().then(() => V4e), "../addon/higohome/locale/zh-Hans/pages.member.addressList.json": () => Promise.resolve().then(() => K4e), "../addon/higohome/locale/zh-Hans/pages.member.address_edit.json": () => Promise.resolve().then(() => X4e), "../addon/higohome/locale/zh-Hans/pages.member.apply_cash_out.json": () => Promise.resolve().then(() => Z4e), "../addon/higohome/locale/zh-Hans/pages.member.balance.json": () => Promise.resolve().then(() => o5e), "../addon/higohome/locale/zh-Hans/pages.member.browe.json": () => Promise.resolve().then(() => n5e), "../addon/higohome/locale/zh-Hans/pages.member.cash_out.json": () => Promise.resolve().then(() => r5e), "../addon/higohome/locale/zh-Hans/pages.member.cash_out_detail.json": () => Promise.resolve().then(() => c5e), "../addon/higohome/locale/zh-Hans/pages.member.commission.json": () => Promise.resolve().then(() => l5e), "../addon/higohome/locale/zh-Hans/pages.member.contact.json": () => Promise.resolve().then(() => u5e), "../addon/higohome/locale/zh-Hans/pages.member.couponList.json": () => Promise.resolve().then(() => m5e), "../addon/higohome/locale/zh-Hans/pages.member.detailed_account.json": () => Promise.resolve().then(() => g5e), "../addon/higohome/locale/zh-Hans/pages.member.edit_address.json": () => Promise.resolve().then(() => f5e), "../addon/higohome/locale/zh-Hans/pages.member.fav.json": () => Promise.resolve().then(() => $5e), "../addon/higohome/locale/zh-Hans/pages.member.homepage.json": () => Promise.resolve().then(() => b5e), "../addon/higohome/locale/zh-Hans/pages.member.index.json": () => Promise.resolve().then(() => P5e), "../addon/higohome/locale/zh-Hans/pages.member.level.json": () => Promise.resolve().then(() => O5e), "../addon/higohome/locale/zh-Hans/pages.member.location_address_edit.json": () => Promise.resolve().then(() => j5e), "../addon/higohome/locale/zh-Hans/pages.member.personal.json": () => Promise.resolve().then(() => C5e), "../addon/higohome/locale/zh-Hans/pages.member.personal_form.json": () => Promise.resolve().then(() => A5e), "../addon/higohome/locale/zh-Hans/pages.member.point.json": () => Promise.resolve().then(() => N5e), "../addon/higohome/locale/zh-Hans/pages.member.point_detail.json": () => Promise.resolve().then(() => z5e), "../addon/higohome/locale/zh-Hans/pages.member.recharge_record.json": () => Promise.resolve().then(() => E5e), "../addon/higohome/locale/zh-Hans/pages.member.recharge_record_detail.json": () => Promise.resolve().then(() => F5e), "../addon/higohome/locale/zh-Hans/pages.member.sign_in.json": () => Promise.resolve().then(() => L5e), "../addon/higohome/locale/zh-Hans/pages.member.withdrawal_detail.json": () => Promise.resolve().then(() => U5e), "../addon/higohome/locale/zh-Hans/pages.message.index.json": () => Promise.resolve().then(() => q5e), "../addon/higohome/locale/zh-Hans/pages.message.message_list.json": () => Promise.resolve().then(() => V5e), "../addon/higohome/locale/zh-Hans/pages.order.index.json": () => Promise.resolve().then(() => K5e), "../addon/higohome/locale/zh-Hans/pages.order.order_info.json": () => Promise.resolve().then(() => X5e), "../addon/higohome/locale/zh-Hans/pages.order.place_order.json": () => Promise.resolve().then(() => Z5e), "../addon/higohome/locale/zh-Hans/pages.order.submit_order.json": () => Promise.resolve().then(() => oUe), "../addon/higohome/locale/zh-Hans/pages.order.v2.submit_order.json": () => Promise.resolve().then(() => nUe), "../addon/higohome/locale/zh-Hans/pages.qrcode.agent_channels_qrcode.json": () => Promise.resolve().then(() => rUe), "../addon/higohome/locale/zh-Hans/pages.qrcode.agent_salesman_qrcode.json": () => Promise.resolve().then(() => cUe), "../addon/higohome/locale/zh-Hans/pages.qrcode.agent_tech_qrcode.json": () => Promise.resolve().then(() => lUe), "../addon/higohome/locale/zh-Hans/pages.qrcode.channels_share_qrcode.json": () => Promise.resolve().then(() => uUe), "../addon/higohome/locale/zh-Hans/pages.qrcode.distribution_share_qrcode.json": () => Promise.resolve().then(() => mUe), "../addon/higohome/locale/zh-Hans/pages.qrcode.salesman_channels_qrcode.json": () => Promise.resolve().then(() => gUe), "../addon/higohome/locale/zh-Hans/pages.qrcode.store_tech_qrcode.json": () => Promise.resolve().then(() => fUe), "../addon/higohome/locale/zh-Hans/pages.refund.apply.json": () => Promise.resolve().then(() => $Ue), "../addon/higohome/locale/zh-Hans/pages.salesman.index.json": () => Promise.resolve().then(() => bUe), "../addon/higohome/locale/zh-Hans/pages.salesman.salesman.json": () => Promise.resolve().then(() => PUe), "../addon/higohome/locale/zh-Hans/pages.salesman.service_withdrawal.json": () => Promise.resolve().then(() => OUe), "../addon/higohome/locale/zh-Hans/pages.setting.index.json": () => Promise.resolve().then(() => jUe), "../addon/higohome/locale/zh-Hans/pages.store.goods.category.json": () => Promise.resolve().then(() => CUe), "../addon/higohome/locale/zh-Hans/pages.store.goods.goodsCategory_manger.json": () => Promise.resolve().then(() => AUe), "../addon/higohome/locale/zh-Hans/pages.store.goods.goods_manger.json": () => Promise.resolve().then(() => NUe), "../addon/higohome/locale/zh-Hans/pages.store.goods.store_goods.json": () => Promise.resolve().then(() => zUe), "../addon/higohome/locale/zh-Hans/pages.store.home.json": () => Promise.resolve().then(() => EUe), "../addon/higohome/locale/zh-Hans/pages.store.index.json": () => Promise.resolve().then(() => FUe), "../addon/higohome/locale/zh-Hans/pages.store.merch_detail.json": () => Promise.resolve().then(() => LUe), "../addon/higohome/locale/zh-Hans/pages.store.merch_list.json": () => Promise.resolve().then(() => UUe), "../addon/higohome/locale/zh-Hans/pages.store.order.index.json": () => Promise.resolve().then(() => qUe), "../addon/higohome/locale/zh-Hans/pages.store.order.order_info.json": () => Promise.resolve().then(() => VUe), "../addon/higohome/locale/zh-Hans/pages.store.service_withdrawal.json": () => Promise.resolve().then(() => KUe), "../addon/higohome/locale/zh-Hans/pages.store.store_apply.json": () => Promise.resolve().then(() => XUe), "../addon/higohome/locale/zh-Hans/pages.store.store_info.json": () => Promise.resolve().then(() => ZUe), "../addon/higohome/locale/zh-Hans/pages.store.store_register.json": () => Promise.resolve().then(() => oWe), "../addon/higohome/locale/zh-Hans/pages.store.tech_manage.json": () => Promise.resolve().then(() => nWe), "../addon/higohome/locale/zh-Hans/pages.tech.addGoods.json": () => Promise.resolve().then(() => rWe), "../addon/higohome/locale/zh-Hans/pages.tech.config_time.json": () => Promise.resolve().then(() => cWe), "../addon/higohome/locale/zh-Hans/pages.tech.divided.detail.json": () => Promise.resolve().then(() => lWe), "../addon/higohome/locale/zh-Hans/pages.tech.divided.divided_details.json": () => Promise.resolve().then(() => uWe), "../addon/higohome/locale/zh-Hans/pages.tech.fans.index.json": () => Promise.resolve().then(() => mWe), "../addon/higohome/locale/zh-Hans/pages.tech.index.json": () => Promise.resolve().then(() => gWe), "../addon/higohome/locale/zh-Hans/pages.tech.info.json": () => Promise.resolve().then(() => fWe), "../addon/higohome/locale/zh-Hans/pages.tech.map_display_tech.json": () => Promise.resolve().then(() => $We), "../addon/higohome/locale/zh-Hans/pages.tech.order.index.json": () => Promise.resolve().then(() => bWe), "../addon/higohome/locale/zh-Hans/pages.tech.order.order_info.json": () => Promise.resolve().then(() => PWe), "../addon/higohome/locale/zh-Hans/pages.tech.order.sign.json": () => Promise.resolve().then(() => OWe), "../addon/higohome/locale/zh-Hans/pages.tech.service_withdrawal.json": () => Promise.resolve().then(() => jWe), "../addon/higohome/locale/zh-Hans/pages.tech.set_time.json": () => Promise.resolve().then(() => CWe), "../addon/higohome/locale/zh-Hans/pages.tech.techConfig.json": () => Promise.resolve().then(() => AWe), "../addon/higohome/locale/zh-Hans/pages.tech.techDetail.json": () => Promise.resolve().then(() => NWe), "../addon/higohome/locale/zh-Hans/pages.tech.techGoodsList.json": () => Promise.resolve().then(() => zWe), "../addon/higohome/locale/zh-Hans/pages.tech.tech_license.json": () => Promise.resolve().then(() => EWe), "../addon/higohome/locale/zh-Hans/pages.tech.tech_one_detail.json": () => Promise.resolve().then(() => FWe), "../addon/higohome/locale/zh-Hans/pages.tech.technician_register.json": () => Promise.resolve().then(() => LWe), "../addon/higohome/locale/zh-Hans/pages.tech.techselect.json": () => Promise.resolve().then(() => UWe), "../addon/higohome/locale/zh-Hans/pages.tech.vitechnician.detail.json": () => Promise.resolve().then(() => qWe), "../addon/higohome/locale/zh-Hans/pages.tech.vitechnician.list.json": () => Promise.resolve().then(() => VWe), "../addon/higohome/locale/zh-Hans/pages.user.index.json": () => Promise.resolve().then(() => KWe), "../addon/higohome/locale/zh-Hans/pages.user.member.json": () => Promise.resolve().then(() => XWe), "../addon/higohome/locale/zh-Hans/pages.user.tech_home.json": () => Promise.resolve().then(() => ZWe), "../addon/higohome/locale/zh-Hans/pages.user.technician.json": () => Promise.resolve().then(() => o8e), "../addon/home_service/locale/zh-Hans/common.json": () => Promise.resolve().then(() => n8e), "../addon/home_service/locale/zh-Hans/store.pages.auth.login.json": () => Promise.resolve().then(() => r8e), "../addon/home_service/locale/zh-Hans/store.pages.auth.register.json": () => Promise.resolve().then(() => c8e), "../addon/home_service/locale/zh-Hans/store.pages.index.json": () => Promise.resolve().then(() => l8e), "../addon/home_service/locale/zh-Hans/store.pages.member.cash.cash_out.json": () => Promise.resolve().then(() => u8e), "../addon/home_service/locale/zh-Hans/store.pages.member.cash.cash_out_detail.json": () => Promise.resolve().then(() => m8e), "../addon/home_service/locale/zh-Hans/store.pages.member.evaluate.json": () => Promise.resolve().then(() => g8e), "../addon/home_service/locale/zh-Hans/store.pages.member.feedback.feedback.json": () => Promise.resolve().then(() => f8e), "../addon/home_service/locale/zh-Hans/store.pages.member.help.detail.json": () => Promise.resolve().then(() => $8e), "../addon/home_service/locale/zh-Hans/store.pages.member.help.help.json": () => Promise.resolve().then(() => b8e), "../addon/home_service/locale/zh-Hans/store.pages.member.index.json": () => Promise.resolve().then(() => P8e), "../addon/home_service/locale/zh-Hans/store.pages.member.store_info.json": () => Promise.resolve().then(() => O8e), "../addon/home_service/locale/zh-Hans/store.pages.member.store_list.json": () => Promise.resolve().then(() => j8e), "../addon/home_service/locale/zh-Hans/store.pages.order.detail.json": () => Promise.resolve().then(() => C8e), "../addon/home_service/locale/zh-Hans/store.pages.order.dispatchOrder.json": () => Promise.resolve().then(() => A8e), "../addon/home_service/locale/zh-Hans/store.pages.order.dispatchTechnician.json": () => Promise.resolve().then(() => N8e), "../addon/home_service/locale/zh-Hans/store.pages.order.grapOrder.json": () => Promise.resolve().then(() => z8e), "../addon/home_service/locale/zh-Hans/store.pages.order.indent.json": () => Promise.resolve().then(() => E8e), "../addon/home_service/locale/zh-Hans/store.pages.order.indent_list.json": () => Promise.resolve().then(() => F8e), "../addon/home_service/locale/zh-Hans/store.pages.store.account.account_statement.json": () => Promise.resolve().then(() => L8e), "../addon/home_service/locale/zh-Hans/store.pages.store.account.list.json": () => Promise.resolve().then(() => U8e), "../addon/home_service/locale/zh-Hans/store.pages.store.account.order_statistics.json": () => Promise.resolve().then(() => q8e), "../addon/home_service/locale/zh-Hans/store.pages.store.account.summary.json": () => Promise.resolve().then(() => V8e), "../addon/home_service/locale/zh-Hans/store.pages.store.account.withdraw.json": () => Promise.resolve().then(() => K8e), "../addon/home_service/locale/zh-Hans/store.pages.store.account.withdraw_edit.json": () => Promise.resolve().then(() => X8e), "../addon/home_service/locale/zh-Hans/store.pages.store.account.withdraw_list.json": () => Promise.resolve().then(() => Z8e), "../addon/home_service/locale/zh-Hans/store.pages.store.index.json": () => Promise.resolve().then(() => o6e), "../addon/home_service/locale/zh-Hans/store.pages.store.settle.json": () => Promise.resolve().then(() => n6e), "../addon/home_service/locale/zh-Hans/store.pages.store.submit_success.json": () => Promise.resolve().then(() => r6e), "../addon/home_service/locale/zh-Hans/store.pages.technician.detail.json": () => Promise.resolve().then(() => c6e), "../addon/home_service/locale/zh-Hans/store.pages.technician.index.json": () => Promise.resolve().then(() => l6e), "../addon/home_service/locale/zh-Hans/store.pages.technician.rest.json": () => Promise.resolve().then(() => u6e), "../addon/home_service/locale/zh-Hans/technician.pages.auth.login.json": () => Promise.resolve().then(() => m6e), "../addon/home_service/locale/zh-Hans/technician.pages.auth.register.json": () => Promise.resolve().then(() => g6e), "../addon/home_service/locale/zh-Hans/technician.pages.index.json": () => Promise.resolve().then(() => f6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.account_statement.json": () => Promise.resolve().then(() => $6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.list.json": () => Promise.resolve().then(() => b6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.summary.json": () => Promise.resolve().then(() => P6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.withdraw.json": () => Promise.resolve().then(() => O6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.withdraw_edit.json": () => Promise.resolve().then(() => j6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.account.withdraw_list.json": () => Promise.resolve().then(() => C6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.cash.cash_out.json": () => Promise.resolve().then(() => A6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.cash.cash_out_detail.json": () => Promise.resolve().then(() => N6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.detail.json": () => Promise.resolve().then(() => z6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.feedback.feedback.json": () => Promise.resolve().then(() => E6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.help.detail.json": () => Promise.resolve().then(() => F6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.help.help.json": () => Promise.resolve().then(() => L6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.index.json": () => Promise.resolve().then(() => U6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.order.evaluate.json": () => Promise.resolve().then(() => q6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.order.statistics.json": () => Promise.resolve().then(() => V6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.ranking_list.ranking_list.json": () => Promise.resolve().then(() => K6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.rest.index.json": () => Promise.resolve().then(() => X6e), "../addon/home_service/locale/zh-Hans/technician.pages.member.store.detail.json": () => Promise.resolve().then(() => Z6e), "../addon/home_service/locale/zh-Hans/technician.pages.notice.index.json": () => Promise.resolve().then(() => oqe), "../addon/home_service/locale/zh-Hans/technician.pages.order.additional.json": () => Promise.resolve().then(() => nqe), "../addon/home_service/locale/zh-Hans/technician.pages.order.detail.json": () => Promise.resolve().then(() => rqe), "../addon/home_service/locale/zh-Hans/technician.pages.order.grabOrder.json": () => Promise.resolve().then(() => cqe), "../addon/home_service/locale/zh-Hans/technician.pages.order.indent_order.json": () => Promise.resolve().then(() => lqe), "../addon/home_service/locale/zh-Hans/technician.pages.order.index.json": () => Promise.resolve().then(() => uqe), "../addon/home_service/locale/zh-Hans/user.pages.address.address_edit.json": () => Promise.resolve().then(() => mqe), "../addon/home_service/locale/zh-Hans/user.pages.address.edit.json": () => Promise.resolve().then(() => gqe), "../addon/home_service/locale/zh-Hans/user.pages.address.index.json": () => Promise.resolve().then(() => fqe), "../addon/home_service/locale/zh-Hans/user.pages.card.detail.json": () => Promise.resolve().then(() => $qe), "../addon/home_service/locale/zh-Hans/user.pages.card.my_card.json": () => Promise.resolve().then(() => bqe), "../addon/home_service/locale/zh-Hans/user.pages.goods.category.json": () => Promise.resolve().then(() => Pqe), "../addon/home_service/locale/zh-Hans/user.pages.goods.detail.json": () => Promise.resolve().then(() => Oqe), "../addon/home_service/locale/zh-Hans/user.pages.goods.list.json": () => Promise.resolve().then(() => jqe), "../addon/home_service/locale/zh-Hans/user.pages.index.json": () => Promise.resolve().then(() => Cqe), "../addon/home_service/locale/zh-Hans/user.pages.master.statistics.index.json": () => Promise.resolve().then(() => Aqe), "../addon/home_service/locale/zh-Hans/user.pages.master.task.add.json": () => Promise.resolve().then(() => Nqe), "../addon/home_service/locale/zh-Hans/user.pages.master.task.detail.json": () => Promise.resolve().then(() => zqe), "../addon/home_service/locale/zh-Hans/user.pages.master.task.list.json": () => Promise.resolve().then(() => Eqe), "../addon/home_service/locale/zh-Hans/user.pages.master.task.refund.json": () => Promise.resolve().then(() => Fqe), "../addon/home_service/locale/zh-Hans/user.pages.master.task.show.json": () => Promise.resolve().then(() => Lqe), "../addon/home_service/locale/zh-Hans/user.pages.member.collect.goods.json": () => Promise.resolve().then(() => Uqe), "../addon/home_service/locale/zh-Hans/user.pages.member.collect.technician.json": () => Promise.resolve().then(() => qqe), "../addon/home_service/locale/zh-Hans/user.pages.member.feedback.feedback.json": () => Promise.resolve().then(() => Vqe), "../addon/home_service/locale/zh-Hans/user.pages.member.help.detail.json": () => Promise.resolve().then(() => Kqe), "../addon/home_service/locale/zh-Hans/user.pages.member.help.help.json": () => Promise.resolve().then(() => Xqe), "../addon/home_service/locale/zh-Hans/user.pages.member.invoice.apply.json": () => Promise.resolve().then(() => Zqe), "../addon/home_service/locale/zh-Hans/user.pages.order.detail.json": () => Promise.resolve().then(() => o7e), "../addon/home_service/locale/zh-Hans/user.pages.order.evaluate.evaluate.json": () => Promise.resolve().then(() => n7e), "../addon/home_service/locale/zh-Hans/user.pages.order.evaluate.json": () => Promise.resolve().then(() => r7e), "../addon/home_service/locale/zh-Hans/user.pages.order.evaluate.list.json": () => Promise.resolve().then(() => c7e), "../addon/home_service/locale/zh-Hans/user.pages.order.list.json": () => Promise.resolve().then(() => l7e), "../addon/home_service/locale/zh-Hans/user.pages.order.payment.json": () => Promise.resolve().then(() => u7e), "../addon/home_service/locale/zh-Hans/user.pages.order.refund.apply.json": () => Promise.resolve().then(() => m7e), "../addon/home_service/locale/zh-Hans/user.pages.order.refund.detail.json": () => Promise.resolve().then(() => g7e), "../addon/home_service/locale/zh-Hans/user.pages.order.refund.list.json": () => Promise.resolve().then(() => f7e), "../addon/home_service/locale/zh-Hans/user.pages.refund.log.json": () => Promise.resolve().then(() => $7e), "../addon/home_service/locale/zh-Hans/user.pages.service.reserve_detail.json": () => Promise.resolve().then(() => b7e), "../addon/home_service/locale/zh-Hans/user.pages.settle.store.json": () => Promise.resolve().then(() => P7e), "../addon/home_service/locale/zh-Hans/user.pages.settle.store_form.json": () => Promise.resolve().then(() => O7e), "../addon/home_service/locale/zh-Hans/user.pages.settle.submit_success.json": () => Promise.resolve().then(() => j7e), "../addon/home_service/locale/zh-Hans/user.pages.settle.technician.json": () => Promise.resolve().then(() => C7e), "../addon/home_service/locale/zh-Hans/user.pages.settle.technician_form.json": () => Promise.resolve().then(() => A7e), "../addon/home_service/locale/zh-Hans/user.pages.technician.detail.json": () => Promise.resolve().then(() => N7e), "../addon/home_service/locale/zh-Hans/user.pages.technician.list.json": () => Promise.resolve().then(() => z7e), "../addon/o2o/locale/zh-Hans/common.json": () => Promise.resolve().then(() => E7e), "../addon/o2o/locale/zh-Hans/pages.address.address_edit.json": () => Promise.resolve().then(() => F7e), "../addon/o2o/locale/zh-Hans/pages.address.edit.json": () => Promise.resolve().then(() => L7e), "../addon/o2o/locale/zh-Hans/pages.address.index.json": () => Promise.resolve().then(() => U7e), "../addon/o2o/locale/zh-Hans/pages.goods.category.json": () => Promise.resolve().then(() => q7e), "../addon/o2o/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => V7e), "../addon/o2o/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => K7e), "../addon/o2o/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => X7e), "../addon/o2o/locale/zh-Hans/pages.master.statistics.index.json": () => Promise.resolve().then(() => Z7e), "../addon/o2o/locale/zh-Hans/pages.master.task.add.json": () => Promise.resolve().then(() => o9e), "../addon/o2o/locale/zh-Hans/pages.master.task.detail.json": () => Promise.resolve().then(() => n9e), "../addon/o2o/locale/zh-Hans/pages.master.task.list.json": () => Promise.resolve().then(() => r9e), "../addon/o2o/locale/zh-Hans/pages.master.task.refund.json": () => Promise.resolve().then(() => c9e), "../addon/o2o/locale/zh-Hans/pages.master.task.show.json": () => Promise.resolve().then(() => l9e), "../addon/o2o/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => u9e), "../addon/o2o/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => m9e), "../addon/o2o/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => g9e), "../addon/o2o/locale/zh-Hans/pages.refund.apply.json": () => Promise.resolve().then(() => f9e), "../addon/o2o/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => $9e), "../addon/o2o/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => b9e), "../addon/o2o/locale/zh-Hans/pages.refund.log.json": () => Promise.resolve().then(() => P9e), "../addon/o2o/locale/zh-Hans/pages.service.reserve_detail.json": () => Promise.resolve().then(() => O9e), "../addon/o2o/locale/zh-Hans/pages.technician.detail.json": () => Promise.resolve().then(() => j9e), "../addon/o2o/locale/zh-Hans/pages.technician.list.json": () => Promise.resolve().then(() => C9e), "../addon/pintuan/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => A9e), "../addon/pintuan/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => N9e), "../addon/pintuan/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => z9e), "../addon/pintuan/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => E9e), "../addon/pintuan/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => F9e), "../addon/pintuan/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => L9e), "../addon/recharge/locale/zh-Hans/common.json": () => Promise.resolve().then(() => U9e), "../addon/recharge/locale/zh-Hans/pages.recharge.json": () => Promise.resolve().then(() => q9e), "../addon/recharge/locale/zh-Hans/pages.recharge_record.json": () => Promise.resolve().then(() => V9e), "../addon/recharge/locale/zh-Hans/pages.recharge_record_detail.json": () => Promise.resolve().then(() => K9e), "../addon/relay/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => X9e), "../addon/relay/locale/zh-Hans/pages.hello_world.index.json": () => Promise.resolve().then(() => Z9e), "../addon/relay/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => oGe), "../addon/relay/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => nGe), "../addon/relay/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => rGe), "../addon/relay/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => cGe), "../addon/relay/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => lGe), "../addon/seckill/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => uGe), "../addon/seckill/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => mGe), "../addon/seckill/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => gGe), "../addon/seckill/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => fGe), "../addon/seckill/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => $Ge), "../addon/seckill/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => bGe), "../addon/shop/locale/zh-Hans/common.json": () => Promise.resolve().then(() => PGe), "../addon/shop/locale/zh-Hans/pages.goods.cart.json": () => Promise.resolve().then(() => OGe), "../addon/shop/locale/zh-Hans/pages.goods.category.json": () => Promise.resolve().then(() => jGe), "../addon/shop/locale/zh-Hans/pages.goods.detail.json": () => Promise.resolve().then(() => CGe), "../addon/shop/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => AGe), "../addon/shop/locale/zh-Hans/pages.goods.rank.json": () => Promise.resolve().then(() => NGe), "../addon/shop/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => zGe), "../addon/shop/locale/zh-Hans/pages.member.index.json": () => Promise.resolve().then(() => EGe), "../addon/shop/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => FGe), "../addon/shop/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => LGe), "../addon/shop/locale/zh-Hans/pages.order.payment.json": () => Promise.resolve().then(() => UGe), "../addon/shop/locale/zh-Hans/pages.point.detail.json": () => Promise.resolve().then(() => qGe), "../addon/shop/locale/zh-Hans/pages.point.order_list.json": () => Promise.resolve().then(() => VGe), "../addon/shop/locale/zh-Hans/pages.refund.detail.json": () => Promise.resolve().then(() => KGe), "../addon/shop/locale/zh-Hans/pages.refund.list.json": () => Promise.resolve().then(() => XGe), "../addon/shop_fenxiao/locale/zh-Hans/common.json": () => Promise.resolve().then(() => ZGe), "../addon/shop_fenxiao/locale/zh-Hans/pages.agent_list.json": () => Promise.resolve().then(() => oVe), "../addon/shop_fenxiao/locale/zh-Hans/pages.apply.json": () => Promise.resolve().then(() => nVe), "../addon/shop_fenxiao/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => rVe), "../addon/shop_fenxiao/locale/zh-Hans/pages.level.json": () => Promise.resolve().then(() => cVe), "../addon/shop_fenxiao/locale/zh-Hans/pages.order.json": () => Promise.resolve().then(() => lVe), "../addon/shop_fenxiao/locale/zh-Hans/pages.task_detail.json": () => Promise.resolve().then(() => uVe), "../addon/shop_fenxiao/locale/zh-Hans/pages.team_dividend.json": () => Promise.resolve().then(() => mVe), "../addon/shop_giftcard/locale/zh-Hans/common.json": () => Promise.resolve().then(() => gVe), "../addon/shop_giftcard/locale/zh-Hans/pages.activate.json": () => Promise.resolve().then(() => fVe), "../addon/shop_giftcard/locale/zh-Hans/pages.card_bag.json": () => Promise.resolve().then(() => $Ve), "../addon/shop_giftcard/locale/zh-Hans/pages.detail.json": () => Promise.resolve().then(() => bVe), "../addon/shop_giftcard/locale/zh-Hans/pages.give.json": () => Promise.resolve().then(() => PVe), "../addon/shop_giftcard/locale/zh-Hans/pages.give_detail.json": () => Promise.resolve().then(() => OVe), "../addon/shop_giftcard/locale/zh-Hans/pages.give_list.json": () => Promise.resolve().then(() => jVe), "../addon/shop_giftcard/locale/zh-Hans/pages.list.json": () => Promise.resolve().then(() => CVe), "../addon/shop_giftcard/locale/zh-Hans/pages.my_card_list.json": () => Promise.resolve().then(() => AVe), "../addon/shop_giftcard/locale/zh-Hans/pages.order_detail.json": () => Promise.resolve().then(() => NVe), "../addon/shop_giftcard/locale/zh-Hans/pages.order_list.json": () => Promise.resolve().then(() => zVe), "../addon/shop_giftcard/locale/zh-Hans/pages.payment.json": () => Promise.resolve().then(() => EVe), "../addon/shop_giftcard/locale/zh-Hans/pages.receive_info.json": () => Promise.resolve().then(() => FVe), "../addon/shop_giftcard/locale/zh-Hans/pages.receive_list.json": () => Promise.resolve().then(() => LVe), "../addon/shop_giftcard/locale/zh-Hans/pages.use_card.json": () => Promise.resolve().then(() => UVe), "../addon/shop_giftcard/locale/zh-Hans/pages.use_goods_select.json": () => Promise.resolve().then(() => qVe), "../addon/sow_community/locale/zh-Hans/common.json": () => Promise.resolve().then(() => VVe), "../addon/sow_community/locale/zh-Hans/pages.create.json": () => Promise.resolve().then(() => KVe), "../addon/sow_community/locale/zh-Hans/pages.follow.json": () => Promise.resolve().then(() => XVe), "../addon/sow_community/locale/zh-Hans/pages.image.detail.json": () => Promise.resolve().then(() => ZVe), "../addon/sow_community/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => oYe), "../addon/sow_community/locale/zh-Hans/pages.member.json": () => Promise.resolve().then(() => nYe), "../addon/sow_community/locale/zh-Hans/pages.search.json": () => Promise.resolve().then(() => rYe), "../addon/sow_community/locale/zh-Hans/pages.sow_show.json": () => Promise.resolve().then(() => cYe), "../addon/sow_community/locale/zh-Hans/pages.topic_list.json": () => Promise.resolve().then(() => lYe), "../addon/sow_community/locale/zh-Hans/pages.video.detail.json": () => Promise.resolve().then(() => uYe), "../addon/template_flower_industry/locale/zh-Hans/common.json": () => Promise.resolve().then(() => mYe), "../addon/template_flower_industry/locale/zh-Hans/pages.goods.list.json": () => Promise.resolve().then(() => gYe), "../addon/tourism/locale/zh-Hans/common.json": () => Promise.resolve().then(() => fYe), "../addon/tourism/locale/zh-Hans/pages.hotel.detail.json": () => Promise.resolve().then(() => $Ye), "../addon/tourism/locale/zh-Hans/pages.hotel.list.json": () => Promise.resolve().then(() => bYe), "../addon/tourism/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => PYe), "../addon/tourism/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => OYe), "../addon/tourism/locale/zh-Hans/pages.scenic.detail.json": () => Promise.resolve().then(() => jYe), "../addon/tourism/locale/zh-Hans/pages.scenic.list.json": () => Promise.resolve().then(() => CYe), "../addon/tourism/locale/zh-Hans/pages.scenic.order.json": () => Promise.resolve().then(() => AYe), "../addon/tourism/locale/zh-Hans/pages.verify.detail.json": () => Promise.resolve().then(() => NYe), "../addon/tourism/locale/zh-Hans/pages.verify.index.json": () => Promise.resolve().then(() => zYe), "../addon/tourism/locale/zh-Hans/pages.way.list.json": () => Promise.resolve().then(() => EYe), "../addon/vipcard/locale/zh-Hans/common.json": () => Promise.resolve().then(() => FYe), "../addon/vipcard/locale/zh-Hans/pages.card.detail.json": () => Promise.resolve().then(() => LYe), "../addon/vipcard/locale/zh-Hans/pages.index.json": () => Promise.resolve().then(() => UYe), "../addon/vipcard/locale/zh-Hans/pages.order.card_record.json": () => Promise.resolve().then(() => qYe), "../addon/vipcard/locale/zh-Hans/pages.order.detail.json": () => Promise.resolve().then(() => VYe), "../addon/vipcard/locale/zh-Hans/pages.order.list.json": () => Promise.resolve().then(() => KYe), "../addon/vipcard/locale/zh-Hans/pages.order.my_card.json": () => Promise.resolve().then(() => XYe), "../addon/vipcard/locale/zh-Hans/pages.order.my_card_detail.json": () => Promise.resolve().then(() => ZYe), "../addon/vipcard/locale/zh-Hans/pages.order.my_reserved.json": () => Promise.resolve().then(() => oKe), "../addon/vipcard/locale/zh-Hans/pages.order.my_reserved_detail.json": () => Promise.resolve().then(() => nKe), "../addon/vipcard/locale/zh-Hans/pages.service.detail.json": () => Promise.resolve().then(() => rKe), "../addon/vipcard/locale/zh-Hans/pages.service.list.json": () => Promise.resolve().then(() => cKe), "../addon/vipcard/locale/zh-Hans/pages.service.reserve_detail.json": () => Promise.resolve().then(() => lKe), "../addon/vipcard/locale/zh-Hans/pages.verify.detail.json": () => Promise.resolve().then(() => uKe), "../addon/vipcard/locale/zh-Hans/pages.verify.index.json": () => Promise.resolve().then(() => mKe), "../addon/vipcard/locale/zh-Hans/pages.verify.record.json": () => Promise.resolve().then(() => gKe) }), `../addon/${n}/locale/${t}/${s}.json`));
      let a = {};
      return Object.keys(c.default).forEach((i) => {
        a[`${r}.${i}`] = c.default[i];
      }), this.i18n.global.mergeLocaleMessage(t, a), this.setI18nLanguage(t, s), oe();
    } catch {
      return this.setI18nLanguage(t), oe();
    }
  }
}
const Dze = "请求失败", zze = "不在request 合法域名列表中", xze = " 接口请求错误,请检查VITE_APP_BASE_URL参数配置或者伪静态配置", Eze = "￥", Rze = "获取验证码", Fze = "秒后重新获取", Hze = "请完成验证", Lze = "确认", Bze = "取消", Uze = "保存", Wze = "请输入验证码", qze = "请输入手机号码", Gze = "请输入正确的手机号", Vze = "请输入手机验证码", Yze = "个人中心", Kze = "用户协议", Qze = "和", Xze = "隐私协议", Jze = "请先阅读并同意协议", Zze = "昵称", e2e = "请输入昵称", o2e = "头像", t2e = "请设置头像", n2e = "获取您的昵称头像", s2e = "获取用户头像、昵称完善个人资料，主要用于向用户提供具有辨识度的用户中心界面", r2e = "手机号", a2e = "获取手机号", c2e = "请获取手机号", i2e = "积分", l2e = "余额", d2e = "登录", u2e = "绑定", p2e = "绑定中", m2e = "绑定手机号", _2e = "我已阅读并同意", g2e = "请勾选已阅读并同意", h2e = "一键绑定", f2e = "手机号快捷登录", y2e = "注册", $2e = "完成", v2e = "关闭", b2e = {
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
}, T2e = {
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
}, P2e = "我的余额", S2e = "我的积分", O2e = "联系客服", w2e = "站点已关闭", j2e = "站点不存在", k2e = "页面不存在", C2e = "景点", M2e = "查看更多", A2e = "线路", I2e = "酒店", N2e = "起", D2e = "项目预约", z2e = "办理次卡", x2e = "会员名称", E2e = "会员码", R2e = "预约", F2e = "预约成功", H2e = "次卡", L2e = "我的", B2e = "去抢购", U2e = "办理", W2e = "已售", q2e = "待支付", G2e = "待使用", V2e = "已完成", Y2e = "全部订单", K2e = "我的订单", Q2e = "订单号", X2e = "实付款", J2e = "关闭订单", Z2e = "删除订单", exe = "确认收货", oxe = "详情", txe = {
  title: "用户隐私保护提示",
  descBefore: "感谢您使用本小程序，在使用前您应当阅读并同意",
  descAfter: "当点击同意并继续时，即表示您已理解并同意该条款内容，该条款将对您产生法律约束力；如您不同意，将无法继续使用小程序相关功能。",
  disagree: "不同意",
  agree: "同意并继续",
  contractName: "用户隐私保护指引",
  disagreeDesc: "未同意隐私协议，无法使用相关功能"
}, nxe = "星级", sxe = "星", rxe = "暂无收货地址，请先创建地址", axe = "新增收货地址", cxe = "选择地址", ixe = "优惠劵", lxe = "无", dxe = "次卡", uxe = "张", pxe = {
  requestFail: Dze,
  notInDomainList: zze,
  baseUrlError: xze,
  currency: Eze,
  getSmsCode: Rze,
  smsCodeChangeText: Fze,
  captchaTitle: Hze,
  confirm: Lze,
  cancel: Bze,
  save: Uze,
  delete: "删除",
  captchaPlaceholder: Wze,
  mobilePlaceholder: qze,
  mobileError: Gze,
  codePlaceholder: Vze,
  memberCenter: Yze,
  userAgreement: Kze,
  and: Qze,
  privacyAgreement: Xze,
  isAgreeTips: Jze,
  nickname: Zze,
  nicknamePlaceholder: e2e,
  headimg: o2e,
  headimgPlaceholder: t2e,
  getAvatarNickname: n2e,
  getAvatarNicknameTips: s2e,
  mobile: r2e,
  getMobile: a2e,
  mobileTips: c2e,
  point: i2e,
  balance: l2e,
  login: d2e,
  bind: u2e,
  binding: p2e,
  bindMobile: m2e,
  agreeTips: _2e,
  pleaseAgree: g2e,
  weixinUserAuth: h2e,
  mobileQuickLogin: f2e,
  register: y2e,
  complete: $2e,
  close: v2e,
  diyForm: b2e,
  pay: T2e,
  myBalance: P2e,
  myPoint: S2e,
  customerService: O2e,
  siteClose: w2e,
  noSite: j2e,
  pageNotFound: k2e,
  scenic: C2e,
  seeMore: M2e,
  way: A2e,
  hotel: I2e,
  rise: N2e,
  cardReserve: D2e,
  card: z2e,
  memberName: x2e,
  memberCode: E2e,
  reserve: R2e,
  reserveSuccess: F2e,
  cardLink: H2e,
  myLink: L2e,
  reserveBtn: B2e,
  cardBtn: U2e,
  soldOut: W2e,
  unpaidOrder: q2e,
  waitingOrder: G2e,
  remainOrder: V2e,
  allOrder: Y2e,
  myOrder: K2e,
  orderNo: Q2e,
  actualPayment: X2e,
  orderClose: J2e,
  orderDelete: Z2e,
  orderFinish: exe,
  orderDetail: oxe,
  wxPrivacyPopup: txe,
  starLevel: nxe,
  star: sxe,
  emptyAddress: rxe,
  addAddress: axe,
  selectAddress: cxe,
  coupon: ixe,
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
  notHave: lxe,
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
  onceCard: dxe,
  cardUnit: uxe,
  "home_service.reserveBtn": "去抢购",
  "home_service.noHomeAddress": "没有更多内容啦~",
  "home_service.soldOut": "已售",
  "home_service.orderNo": "订单号",
  "home_service.actualPayment": "实付款",
  "home_service.orderDetail": "详情"
}, mxe = "Index", _xe = {
  index: mxe
};
function gxe() {
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
let Qe = $ze({
  locale: gxe(),
  globalInjection: !0,
  //是否全局注入
  silentFallbackWarn: !0,
  silentTranslationWarn: !0,
  messages: {
    "zh-Hans": pxe,
    en: _xe
  }
});
const hxe = new Nze(Qe);
function fxe(o) {
  return Y.get("wechat/codeurl", o, { showErrorMessage: !1 });
}
function yxe() {
  return Y.get("site");
}
function $xe(o) {
  return Y.get("init", o);
}
function vxe(o) {
  return Y.get("member_mobile_exist", o);
}
function bxe(o) {
  return Y.get("login/config", o);
}
function Txe() {
  return Y.put("auth/logout");
}
function Pxe(o) {
  return Y.get("wechat/user", o, { showErrorMessage: !1 });
}
function Sxe(o) {
  return uni.getStorageSync("pid") && (o.pid = uni.getStorageSync("pid")), Y.post("wechat/userlogin", o, { showErrorMessage: !0 });
}
function Oxe(o) {
  return Y.put("wechat/update_openid", o, { showErrorMessage: !1 });
}
function wxe(o) {
  return Y.put("wechat/update_openid_h5", o, { showErrorMessage: !1 });
}
const jo = zo("config", {
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
      Fe() && (o = Tt().systemInfo.platform == "ios" ? uni.getStorageSync("initUrl") : location.href), await bxe({ url: o }).then((e) => {
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
var jxe = typeof global == "object" && global && global.Object === Object && global;
const $n = jxe;
var kxe = typeof self == "object" && self && self.Object === Object && self, Cxe = $n || kxe || Function("return this")();
const se = Cxe;
var Mxe = se.Symbol;
const Ee = Mxe;
var vn = Object.prototype, Axe = vn.hasOwnProperty, Ixe = vn.toString, Ke = Ee ? Ee.toStringTag : void 0;
function Nxe(o) {
  var e = Axe.call(o, Ke), t = o[Ke];
  try {
    o[Ke] = void 0;
    var n = !0;
  } catch {
  }
  var s = Ixe.call(o);
  return n && (e ? o[Ke] = t : delete o[Ke]), s;
}
var Dxe = Object.prototype, zxe = Dxe.toString;
function xxe(o) {
  return zxe.call(o);
}
var Exe = "[object Null]", Rxe = "[object Undefined]", At = Ee ? Ee.toStringTag : void 0;
function Le(o) {
  return o == null ? o === void 0 ? Rxe : Exe : At && At in Object(o) ? Nxe(o) : xxe(o);
}
function Be(o) {
  return o != null && typeof o == "object";
}
var Fxe = "[object Symbol]";
function Hxe(o) {
  return typeof o == "symbol" || Be(o) && Le(o) == Fxe;
}
var Lxe = Array.isArray;
const pt = Lxe;
var Bxe = /\s/;
function Uxe(o) {
  for (var e = o.length; e-- && Bxe.test(o.charAt(e)); )
    ;
  return e;
}
var Wxe = /^\s+/;
function qxe(o) {
  return o && o.slice(0, Uxe(o) + 1).replace(Wxe, "");
}
function ye(o) {
  var e = typeof o;
  return o != null && (e == "object" || e == "function");
}
var It = 0 / 0, Gxe = /^[-+]0x[0-9a-f]+$/i, Vxe = /^0b[01]+$/i, Yxe = /^0o[0-7]+$/i, Kxe = parseInt;
function Qxe(o) {
  if (typeof o == "number")
    return o;
  if (Hxe(o))
    return It;
  if (ye(o)) {
    var e = typeof o.valueOf == "function" ? o.valueOf() : o;
    o = ye(e) ? e + "" : e;
  }
  if (typeof o != "string")
    return o === 0 ? o : +o;
  o = qxe(o);
  var t = Vxe.test(o);
  return t || Yxe.test(o) ? Kxe(o.slice(2), t ? 2 : 8) : Gxe.test(o) ? It : +o;
}
var Nt = 1 / 0, Xxe = 17976931348623157e292;
function Lo(o) {
  if (!o)
    return o === 0 ? o : 0;
  if (o = Qxe(o), o === Nt || o === -Nt) {
    var e = o < 0 ? -1 : 1;
    return e * Xxe;
  }
  return o === o ? o : 0;
}
var Jxe = "[object AsyncFunction]", Zxe = "[object Function]", eEe = "[object GeneratorFunction]", oEe = "[object Proxy]";
function bn(o) {
  if (!ye(o))
    return !1;
  var e = Le(o);
  return e == Zxe || e == eEe || e == Jxe || e == oEe;
}
var tEe = se["__core-js_shared__"];
const Bo = tEe;
var Dt = function() {
  var o = /[^.]+$/.exec(Bo && Bo.keys && Bo.keys.IE_PROTO || "");
  return o ? "Symbol(src)_1." + o : "";
}();
function nEe(o) {
  return !!Dt && Dt in o;
}
var sEe = Function.prototype, rEe = sEe.toString;
function ke(o) {
  if (o != null) {
    try {
      return rEe.call(o);
    } catch {
    }
    try {
      return o + "";
    } catch {
    }
  }
  return "";
}
var aEe = /[\\^$.*+?()[\]{}|]/g, cEe = /^\[object .+?Constructor\]$/, iEe = Function.prototype, lEe = Object.prototype, dEe = iEe.toString, uEe = lEe.hasOwnProperty, pEe = RegExp(
  "^" + dEe.call(uEe).replace(aEe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function mEe(o) {
  if (!ye(o) || nEe(o))
    return !1;
  var e = bn(o) ? pEe : cEe;
  return e.test(ke(o));
}
function _Ee(o, e) {
  return o == null ? void 0 : o[e];
}
function Ce(o, e) {
  var t = _Ee(o, e);
  return mEe(t) ? t : void 0;
}
var gEe = Ce(se, "WeakMap");
const ot = gEe;
var zt = Object.create, hEe = function() {
  function o() {
  }
  return function(e) {
    if (!ye(e))
      return {};
    if (zt)
      return zt(e);
    o.prototype = e;
    var t = new o();
    return o.prototype = void 0, t;
  };
}();
const fEe = hEe;
function yEe(o, e) {
  var t = -1, n = o.length;
  for (e || (e = Array(n)); ++t < n; )
    e[t] = o[t];
  return e;
}
var $Ee = function() {
  try {
    var o = Ce(Object, "defineProperty");
    return o({}, "", {}), o;
  } catch {
  }
}();
const xt = $Ee;
function vEe(o, e) {
  for (var t = -1, n = o == null ? 0 : o.length; ++t < n && e(o[t], t, o) !== !1; )
    ;
  return o;
}
var bEe = 9007199254740991, TEe = /^(?:0|[1-9]\d*)$/;
function Tn(o, e) {
  var t = typeof o;
  return e = e ?? bEe, !!e && (t == "number" || t != "symbol" && TEe.test(o)) && o > -1 && o % 1 == 0 && o < e;
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
var PEe = Object.prototype, SEe = PEe.hasOwnProperty;
function Sn(o, e, t) {
  var n = o[e];
  (!(SEe.call(o, e) && mt(n, t)) || t === void 0 && !(e in o)) && Pn(o, e, t);
}
function xo(o, e, t, n) {
  var s = !t;
  t || (t = {});
  for (var r = -1, c = e.length; ++r < c; ) {
    var a = e[r], i = n ? n(t[a], o[a], a, t, o) : void 0;
    i === void 0 && (i = o[a]), s ? Pn(t, a, i) : Sn(t, a, i);
  }
  return t;
}
var OEe = 9007199254740991;
function On(o) {
  return typeof o == "number" && o > -1 && o % 1 == 0 && o <= OEe;
}
function _t(o) {
  return o != null && On(o.length) && !bn(o);
}
function wEe(o, e, t) {
  if (!ye(t))
    return !1;
  var n = typeof e;
  return (n == "number" ? _t(t) && Tn(e, t.length) : n == "string" && e in t) ? mt(t[e], o) : !1;
}
var jEe = Object.prototype;
function gt(o) {
  var e = o && o.constructor, t = typeof e == "function" && e.prototype || jEe;
  return o === t;
}
function kEe(o, e) {
  for (var t = -1, n = Array(o); ++t < o; )
    n[t] = e(t);
  return n;
}
var CEe = "[object Arguments]";
function Et(o) {
  return Be(o) && Le(o) == CEe;
}
var wn = Object.prototype, MEe = wn.hasOwnProperty, AEe = wn.propertyIsEnumerable, IEe = Et(function() {
  return arguments;
}()) ? Et : function(o) {
  return Be(o) && MEe.call(o, "callee") && !AEe.call(o, "callee");
};
const NEe = IEe;
function DEe() {
  return !1;
}
var jn = typeof exports == "object" && exports && !exports.nodeType && exports, Rt = jn && typeof module == "object" && module && !module.nodeType && module, zEe = Rt && Rt.exports === jn, Ft = zEe ? se.Buffer : void 0, xEe = Ft ? Ft.isBuffer : void 0, EEe = xEe || DEe;
const kn = EEe;
var REe = "[object Arguments]", FEe = "[object Array]", HEe = "[object Boolean]", LEe = "[object Date]", BEe = "[object Error]", UEe = "[object Function]", WEe = "[object Map]", qEe = "[object Number]", GEe = "[object Object]", VEe = "[object RegExp]", YEe = "[object Set]", KEe = "[object String]", QEe = "[object WeakMap]", XEe = "[object ArrayBuffer]", JEe = "[object DataView]", ZEe = "[object Float32Array]", eRe = "[object Float64Array]", oRe = "[object Int8Array]", tRe = "[object Int16Array]", nRe = "[object Int32Array]", sRe = "[object Uint8Array]", rRe = "[object Uint8ClampedArray]", aRe = "[object Uint16Array]", cRe = "[object Uint32Array]", C = {};
C[ZEe] = C[eRe] = C[oRe] = C[tRe] = C[nRe] = C[sRe] = C[rRe] = C[aRe] = C[cRe] = !0;
C[REe] = C[FEe] = C[XEe] = C[HEe] = C[JEe] = C[LEe] = C[BEe] = C[UEe] = C[WEe] = C[qEe] = C[GEe] = C[VEe] = C[YEe] = C[KEe] = C[QEe] = !1;
function iRe(o) {
  return Be(o) && On(o.length) && !!C[Le(o)];
}
function ht(o) {
  return function(e) {
    return o(e);
  };
}
var Cn = typeof exports == "object" && exports && !exports.nodeType && exports, eo = Cn && typeof module == "object" && module && !module.nodeType && module, lRe = eo && eo.exports === Cn, Uo = lRe && $n.process, dRe = function() {
  try {
    var o = eo && eo.require && eo.require("util").types;
    return o || Uo && Uo.binding && Uo.binding("util");
  } catch {
  }
}();
const Re = dRe;
var Ht = Re && Re.isTypedArray, uRe = Ht ? ht(Ht) : iRe;
const pRe = uRe;
var mRe = Object.prototype, _Re = mRe.hasOwnProperty;
function Mn(o, e) {
  var t = pt(o), n = !t && NEe(o), s = !t && !n && kn(o), r = !t && !n && !s && pRe(o), c = t || n || s || r, a = c ? kEe(o.length, String) : [], i = a.length;
  for (var l in o)
    (e || _Re.call(o, l)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    Tn(l, i))) && a.push(l);
  return a;
}
function An(o, e) {
  return function(t) {
    return o(e(t));
  };
}
var gRe = An(Object.keys, Object);
const hRe = gRe;
var fRe = Object.prototype, yRe = fRe.hasOwnProperty;
function $Re(o) {
  if (!gt(o))
    return hRe(o);
  var e = [];
  for (var t in Object(o))
    yRe.call(o, t) && t != "constructor" && e.push(t);
  return e;
}
function ft(o) {
  return _t(o) ? Mn(o) : $Re(o);
}
function vRe(o) {
  var e = [];
  if (o != null)
    for (var t in Object(o))
      e.push(t);
  return e;
}
var bRe = Object.prototype, TRe = bRe.hasOwnProperty;
function PRe(o) {
  if (!ye(o))
    return vRe(o);
  var e = gt(o), t = [];
  for (var n in o)
    n == "constructor" && (e || !TRe.call(o, n)) || t.push(n);
  return t;
}
function yt(o) {
  return _t(o) ? Mn(o, !0) : PRe(o);
}
var SRe = Ce(Object, "create");
const co = SRe;
function ORe() {
  this.__data__ = co ? co(null) : {}, this.size = 0;
}
function wRe(o) {
  var e = this.has(o) && delete this.__data__[o];
  return this.size -= e ? 1 : 0, e;
}
var jRe = "__lodash_hash_undefined__", kRe = Object.prototype, CRe = kRe.hasOwnProperty;
function MRe(o) {
  var e = this.__data__;
  if (co) {
    var t = e[o];
    return t === jRe ? void 0 : t;
  }
  return CRe.call(e, o) ? e[o] : void 0;
}
var ARe = Object.prototype, IRe = ARe.hasOwnProperty;
function NRe(o) {
  var e = this.__data__;
  return co ? e[o] !== void 0 : IRe.call(e, o);
}
var DRe = "__lodash_hash_undefined__";
function zRe(o, e) {
  var t = this.__data__;
  return this.size += this.has(o) ? 0 : 1, t[o] = co && e === void 0 ? DRe : e, this;
}
function je(o) {
  var e = -1, t = o == null ? 0 : o.length;
  for (this.clear(); ++e < t; ) {
    var n = o[e];
    this.set(n[0], n[1]);
  }
}
je.prototype.clear = ORe;
je.prototype.delete = wRe;
je.prototype.get = MRe;
je.prototype.has = NRe;
je.prototype.set = zRe;
function xRe() {
  this.__data__ = [], this.size = 0;
}
function Eo(o, e) {
  for (var t = o.length; t--; )
    if (mt(o[t][0], e))
      return t;
  return -1;
}
var ERe = Array.prototype, RRe = ERe.splice;
function FRe(o) {
  var e = this.__data__, t = Eo(e, o);
  if (t < 0)
    return !1;
  var n = e.length - 1;
  return t == n ? e.pop() : RRe.call(e, t, 1), --this.size, !0;
}
function HRe(o) {
  var e = this.__data__, t = Eo(e, o);
  return t < 0 ? void 0 : e[t][1];
}
function LRe(o) {
  return Eo(this.__data__, o) > -1;
}
function BRe(o, e) {
  var t = this.__data__, n = Eo(t, o);
  return n < 0 ? (++this.size, t.push([o, e])) : t[n][1] = e, this;
}
function ie(o) {
  var e = -1, t = o == null ? 0 : o.length;
  for (this.clear(); ++e < t; ) {
    var n = o[e];
    this.set(n[0], n[1]);
  }
}
ie.prototype.clear = xRe;
ie.prototype.delete = FRe;
ie.prototype.get = HRe;
ie.prototype.has = LRe;
ie.prototype.set = BRe;
var URe = Ce(se, "Map");
const io = URe;
function WRe() {
  this.size = 0, this.__data__ = {
    hash: new je(),
    map: new (io || ie)(),
    string: new je()
  };
}
function qRe(o) {
  var e = typeof o;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? o !== "__proto__" : o === null;
}
function Ro(o, e) {
  var t = o.__data__;
  return qRe(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function GRe(o) {
  var e = Ro(this, o).delete(o);
  return this.size -= e ? 1 : 0, e;
}
function VRe(o) {
  return Ro(this, o).get(o);
}
function YRe(o) {
  return Ro(this, o).has(o);
}
function KRe(o, e) {
  var t = Ro(this, o), n = t.size;
  return t.set(o, e), this.size += t.size == n ? 0 : 1, this;
}
function Ue(o) {
  var e = -1, t = o == null ? 0 : o.length;
  for (this.clear(); ++e < t; ) {
    var n = o[e];
    this.set(n[0], n[1]);
  }
}
Ue.prototype.clear = WRe;
Ue.prototype.delete = GRe;
Ue.prototype.get = VRe;
Ue.prototype.has = YRe;
Ue.prototype.set = KRe;
function In(o, e) {
  for (var t = -1, n = e.length, s = o.length; ++t < n; )
    o[s + t] = e[t];
  return o;
}
var QRe = An(Object.getPrototypeOf, Object);
const Nn = QRe;
function XRe() {
  this.__data__ = new ie(), this.size = 0;
}
function JRe(o) {
  var e = this.__data__, t = e.delete(o);
  return this.size = e.size, t;
}
function ZRe(o) {
  return this.__data__.get(o);
}
function eFe(o) {
  return this.__data__.has(o);
}
var oFe = 200;
function tFe(o, e) {
  var t = this.__data__;
  if (t instanceof ie) {
    var n = t.__data__;
    if (!io || n.length < oFe - 1)
      return n.push([o, e]), this.size = ++t.size, this;
    t = this.__data__ = new Ue(n);
  }
  return t.set(o, e), this.size = t.size, this;
}
function We(o) {
  var e = this.__data__ = new ie(o);
  this.size = e.size;
}
We.prototype.clear = XRe;
We.prototype.delete = JRe;
We.prototype.get = ZRe;
We.prototype.has = eFe;
We.prototype.set = tFe;
function nFe(o, e) {
  return o && xo(e, ft(e), o);
}
function sFe(o, e) {
  return o && xo(e, yt(e), o);
}
var Dn = typeof exports == "object" && exports && !exports.nodeType && exports, Lt = Dn && typeof module == "object" && module && !module.nodeType && module, rFe = Lt && Lt.exports === Dn, Bt = rFe ? se.Buffer : void 0, Ut = Bt ? Bt.allocUnsafe : void 0;
function aFe(o, e) {
  if (e)
    return o.slice();
  var t = o.length, n = Ut ? Ut(t) : new o.constructor(t);
  return o.copy(n), n;
}
function cFe(o, e) {
  for (var t = -1, n = o == null ? 0 : o.length, s = 0, r = []; ++t < n; ) {
    var c = o[t];
    e(c, t, o) && (r[s++] = c);
  }
  return r;
}
function zn() {
  return [];
}
var iFe = Object.prototype, lFe = iFe.propertyIsEnumerable, Wt = Object.getOwnPropertySymbols, dFe = Wt ? function(o) {
  return o == null ? [] : (o = Object(o), cFe(Wt(o), function(e) {
    return lFe.call(o, e);
  }));
} : zn;
const $t = dFe;
function uFe(o, e) {
  return xo(o, $t(o), e);
}
var pFe = Object.getOwnPropertySymbols, mFe = pFe ? function(o) {
  for (var e = []; o; )
    In(e, $t(o)), o = Nn(o);
  return e;
} : zn;
const xn = mFe;
function _Fe(o, e) {
  return xo(o, xn(o), e);
}
function En(o, e, t) {
  var n = e(o);
  return pt(o) ? n : In(n, t(o));
}
function gFe(o) {
  return En(o, ft, $t);
}
function hFe(o) {
  return En(o, yt, xn);
}
var fFe = Ce(se, "DataView");
const tt = fFe;
var yFe = Ce(se, "Promise");
const nt = yFe;
var $Fe = Ce(se, "Set");
const st = $Fe;
var qt = "[object Map]", vFe = "[object Object]", Gt = "[object Promise]", Vt = "[object Set]", Yt = "[object WeakMap]", Kt = "[object DataView]", bFe = ke(tt), TFe = ke(io), PFe = ke(nt), SFe = ke(st), OFe = ke(ot), Se = Le;
(tt && Se(new tt(new ArrayBuffer(1))) != Kt || io && Se(new io()) != qt || nt && Se(nt.resolve()) != Gt || st && Se(new st()) != Vt || ot && Se(new ot()) != Yt) && (Se = function(o) {
  var e = Le(o), t = e == vFe ? o.constructor : void 0, n = t ? ke(t) : "";
  if (n)
    switch (n) {
      case bFe:
        return Kt;
      case TFe:
        return qt;
      case PFe:
        return Gt;
      case SFe:
        return Vt;
      case OFe:
        return Yt;
    }
  return e;
});
const vt = Se;
var wFe = Object.prototype, jFe = wFe.hasOwnProperty;
function kFe(o) {
  var e = o.length, t = new o.constructor(e);
  return e && typeof o[0] == "string" && jFe.call(o, "index") && (t.index = o.index, t.input = o.input), t;
}
var CFe = se.Uint8Array;
const Qt = CFe;
function bt(o) {
  var e = new o.constructor(o.byteLength);
  return new Qt(e).set(new Qt(o)), e;
}
function MFe(o, e) {
  var t = e ? bt(o.buffer) : o.buffer;
  return new o.constructor(t, o.byteOffset, o.byteLength);
}
var AFe = /\w*$/;
function IFe(o) {
  var e = new o.constructor(o.source, AFe.exec(o));
  return e.lastIndex = o.lastIndex, e;
}
var Xt = Ee ? Ee.prototype : void 0, Jt = Xt ? Xt.valueOf : void 0;
function NFe(o) {
  return Jt ? Object(Jt.call(o)) : {};
}
function DFe(o, e) {
  var t = e ? bt(o.buffer) : o.buffer;
  return new o.constructor(t, o.byteOffset, o.length);
}
var zFe = "[object Boolean]", xFe = "[object Date]", EFe = "[object Map]", RFe = "[object Number]", FFe = "[object RegExp]", HFe = "[object Set]", LFe = "[object String]", BFe = "[object Symbol]", UFe = "[object ArrayBuffer]", WFe = "[object DataView]", qFe = "[object Float32Array]", GFe = "[object Float64Array]", VFe = "[object Int8Array]", YFe = "[object Int16Array]", KFe = "[object Int32Array]", QFe = "[object Uint8Array]", XFe = "[object Uint8ClampedArray]", JFe = "[object Uint16Array]", ZFe = "[object Uint32Array]";
function eHe(o, e, t) {
  var n = o.constructor;
  switch (e) {
    case UFe:
      return bt(o);
    case zFe:
    case xFe:
      return new n(+o);
    case WFe:
      return MFe(o, t);
    case qFe:
    case GFe:
    case VFe:
    case YFe:
    case KFe:
    case QFe:
    case XFe:
    case JFe:
    case ZFe:
      return DFe(o, t);
    case EFe:
      return new n();
    case RFe:
    case LFe:
      return new n(o);
    case FFe:
      return IFe(o);
    case HFe:
      return new n();
    case BFe:
      return NFe(o);
  }
}
function oHe(o) {
  return typeof o.constructor == "function" && !gt(o) ? fEe(Nn(o)) : {};
}
var tHe = "[object Map]";
function nHe(o) {
  return Be(o) && vt(o) == tHe;
}
var Zt = Re && Re.isMap, sHe = Zt ? ht(Zt) : nHe;
const rHe = sHe;
var aHe = "[object Set]";
function cHe(o) {
  return Be(o) && vt(o) == aHe;
}
var en = Re && Re.isSet, iHe = en ? ht(en) : cHe;
const lHe = iHe;
var dHe = 1, uHe = 2, pHe = 4, Rn = "[object Arguments]", mHe = "[object Array]", _He = "[object Boolean]", gHe = "[object Date]", hHe = "[object Error]", Fn = "[object Function]", fHe = "[object GeneratorFunction]", yHe = "[object Map]", $He = "[object Number]", Hn = "[object Object]", vHe = "[object RegExp]", bHe = "[object Set]", THe = "[object String]", PHe = "[object Symbol]", SHe = "[object WeakMap]", OHe = "[object ArrayBuffer]", wHe = "[object DataView]", jHe = "[object Float32Array]", kHe = "[object Float64Array]", CHe = "[object Int8Array]", MHe = "[object Int16Array]", AHe = "[object Int32Array]", IHe = "[object Uint8Array]", NHe = "[object Uint8ClampedArray]", DHe = "[object Uint16Array]", zHe = "[object Uint32Array]", k = {};
k[Rn] = k[mHe] = k[OHe] = k[wHe] = k[_He] = k[gHe] = k[jHe] = k[kHe] = k[CHe] = k[MHe] = k[AHe] = k[yHe] = k[$He] = k[Hn] = k[vHe] = k[bHe] = k[THe] = k[PHe] = k[IHe] = k[NHe] = k[DHe] = k[zHe] = !0;
k[hHe] = k[Fn] = k[SHe] = !1;
function vo(o, e, t, n, s, r) {
  var c, a = e & dHe, i = e & uHe, l = e & pHe;
  if (t && (c = s ? t(o, n, s, r) : t(o)), c !== void 0)
    return c;
  if (!ye(o))
    return o;
  var u = pt(o);
  if (u) {
    if (c = kFe(o), !a)
      return yEe(o, c);
  } else {
    var d = vt(o), _ = d == Fn || d == fHe;
    if (kn(o))
      return aFe(o, a);
    if (d == Hn || d == Rn || _ && !s) {
      if (c = i || _ ? {} : oHe(o), !a)
        return i ? _Fe(o, sFe(c, o)) : uFe(o, nFe(c, o));
    } else {
      if (!k[d])
        return s ? o : {};
      c = eHe(o, d, a);
    }
  }
  r || (r = new We());
  var h = r.get(o);
  if (h)
    return h;
  r.set(o, c), lHe(o) ? o.forEach(function($) {
    c.add(vo($, e, t, $, o, r));
  }) : rHe(o) && o.forEach(function($, b) {
    c.set(b, vo($, e, t, b, o, r));
  });
  var m = l ? i ? hFe : gFe : i ? yt : ft, g = u ? void 0 : m(o);
  return vEe(g || o, function($, b) {
    g && (b = $, $ = o[b]), Sn(c, b, vo($, e, t, b, o, r));
  }), c;
}
var xHe = 1, EHe = 4;
function RHe(o) {
  return vo(o, xHe | EHe);
}
var FHe = Math.ceil, HHe = Math.max;
function LHe(o, e, t, n) {
  for (var s = -1, r = HHe(FHe((e - o) / (t || 1)), 0), c = Array(r); r--; )
    c[n ? r : ++s] = o, o += t;
  return c;
}
function BHe(o) {
  return function(e, t, n) {
    return n && typeof n != "number" && wEe(e, t, n) && (t = n = void 0), e = Lo(e), t === void 0 ? (t = e, e = 0) : t = Lo(t), n = n === void 0 ? e < t ? 1 : -1 : Lo(n), LHe(e, t, n, o);
  };
}
var UHe = BHe();
const WHe = UHe, qHe = zo("system", {
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
      Fe() && (e = this.systemInfo.platform == "ios" ? uni.getStorageSync("initUrl") : location.href), $xe({
        url: e,
        openid: uni.getStorageSync("openid")
      }).then((t) => {
        if (t.data) {
          let n = t.data;
          const s = jo();
          s.tabbarList = n.tabbar_list, this.mapConfig.is_open = n.map_config.is_open, this.mapConfig.valid_time = n.map_config.valid_time, this.mapConfig.map_type = n.map_config.map_type, this.mapConfig.key = n.map_config.key, this.mapConfig.tianditu_map_web_key = n.map_config.tianditu_map_web_key, uni.setStorageSync("mapConfig", this.mapConfig), uni.setStorageSync("theme_color_list", n.theme_list), this.site = n.site_info, this.siteApps = n.site_info.app, this.siteAddons = n.site_info.site_addons.map((c) => c.key), this.copyright = n.copyright;
          const r = ge();
          r.levelList = n.member_level, s.login.is_username = n.login_config.is_username, s.login.is_mobile = n.login_config.is_mobile, s.login.is_auth_register = parseInt(n.login_config.is_auth_register), s.login.is_force_access_user_info = parseInt(n.login_config.is_force_access_user_info), s.login.is_bind_mobile = parseInt(n.login_config.is_bind_mobile), s.login.agreement_show = parseInt(n.login_config.agreement_show), s.login.wechat_error = n.login_config.wechat_error, s.login.bg_url = n.login_config.bg_url, s.login.logo = n.login_config.logo, s.login.desc = n.login_config.desc, uni.setStorageSync("login_config", s.login), uni.setStorageSync("member_exist", n.member_exist), n.app_config && (this.appConfig = n.app_config), this.initStatus = "finish", uni.getStorageSync("isBindMobile") && uni.removeStorageSync("isBindMobile"), o && o();
        }
      }), this.getMenuButtonInfoFn();
    },
    // 获取版本数据信息
    getVersionInfoFn(o = null) {
    },
    // 如果已有手机号，就不弹出绑定手机号弹框
    getMemberMobileExistFn() {
      vxe({
        openid: uni.getStorageSync("openid")
      }).then((o) => {
        uni.setStorageSync("member_mobile_exist", o.data.member_mobile_exist);
      });
    },
    getMenuButtonInfoFn() {
    },
    async getSiteInfoFn() {
      await yxe().then((o) => {
        this.site = o.data, this.siteApps = o.data.app, this.siteAddons = o.data.site_addons.map((e) => e.key);
      }).catch((o) => {
      });
    },
    // 当前选择的收货地址信息[经纬度，当前定位地址，定位过期时间]
    setAddressInfo(o = {}) {
      let e = RHe(o);
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
}), Tt = qHe, Wo = (o) => {
  let e = Aze();
  const n = `${hxe.getFileKey(e).fileKey}.${o}`;
  return Qe.global.t(o) != o ? Qe.global.t(o) : Qe.global.t(n) != n ? Qe.global.t(n) : "";
};
var qo = Object.prototype.hasOwnProperty, Ie = Array.isArray, ee = function() {
  for (var o = [], e = 0; e < 256; ++e)
    o.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return o;
}(), GHe = function(e) {
  for (; e.length > 1; ) {
    var t = e.pop(), n = t.obj[t.prop];
    if (Ie(n)) {
      for (var s = [], r = 0; r < n.length; ++r)
        typeof n[r] < "u" && s.push(n[r]);
      t.obj[t.prop] = s;
    }
  }
}, Ln = function(e, t) {
  for (var n = t && t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, s = 0; s < e.length; ++s)
    typeof e[s] < "u" && (n[s] = e[s]);
  return n;
}, VHe = function o(e, t, n) {
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
  var s = e;
  return Ie(e) && !Ie(t) && (s = Ln(e, n)), Ie(e) && Ie(t) ? (t.forEach(function(r, c) {
    if (qo.call(e, c)) {
      var a = e[c];
      a && typeof a == "object" && r && typeof r == "object" ? e[c] = o(a, r, n) : e.push(r);
    } else
      e[c] = r;
  }), e) : Object.keys(t).reduce(function(r, c) {
    var a = t[c];
    return qo.call(r, c) ? r[c] = o(r[c], a, n) : r[c] = a, r;
  }, s);
}, YHe = function(e, t) {
  return Object.keys(t).reduce(function(n, s) {
    return n[s] = t[s], n;
  }, e);
}, KHe = function(o, e, t) {
  var n = o.replace(/\+/g, " ");
  if (t === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, QHe = function(e, t, n) {
  if (e.length === 0)
    return e;
  var s = typeof e == "string" ? e : String(e);
  if (n === "iso-8859-1")
    return escape(s).replace(/%u[0-9a-f]{4}/gi, function(i) {
      return "%26%23" + parseInt(i.slice(2), 16) + "%3B";
    });
  for (var r = "", c = 0; c < s.length; ++c) {
    var a = s.charCodeAt(c);
    if (a === 45 || a === 46 || a === 95 || a === 126 || a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122) {
      r += s.charAt(c);
      continue;
    }
    if (a < 128) {
      r = r + ee[a];
      continue;
    }
    if (a < 2048) {
      r = r + (ee[192 | a >> 6] + ee[128 | a & 63]);
      continue;
    }
    if (a < 55296 || a >= 57344) {
      r = r + (ee[224 | a >> 12] + ee[128 | a >> 6 & 63] + ee[128 | a & 63]);
      continue;
    }
    c += 1, a = 65536 + ((a & 1023) << 10 | s.charCodeAt(c) & 1023), r += ee[240 | a >> 18] + ee[128 | a >> 12 & 63] + ee[128 | a >> 6 & 63] + ee[128 | a & 63];
  }
  return r;
}, XHe = function(e) {
  for (var t = [{ obj: { o: e }, prop: "o" }], n = [], s = 0; s < t.length; ++s)
    for (var r = t[s], c = r.obj[r.prop], a = Object.keys(c), i = 0; i < a.length; ++i) {
      var l = a[i], u = c[l];
      typeof u == "object" && u !== null && n.indexOf(u) === -1 && (t.push({ obj: c, prop: l }), n.push(u));
    }
  return GHe(t), e;
}, JHe = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, ZHe = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, e3e = function(e, t) {
  return [].concat(e, t);
}, Bn = {
  arrayToObject: Ln,
  assign: YHe,
  combine: e3e,
  compact: XHe,
  decode: KHe,
  encode: QHe,
  isBuffer: ZHe,
  isRegExp: JHe,
  merge: VHe
}, o3e = String.prototype.replace, t3e = /%20/g, Un = {
  default: "RFC3986",
  formatters: {
    RFC1738: function(o) {
      return o3e.call(o, t3e, "+");
    },
    RFC3986: function(o) {
      return o;
    }
  },
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Wn = Bn, oo = Un, n3e = Object.prototype.hasOwnProperty, on = {
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
}, ze = Array.isArray, s3e = Array.prototype.push, rt = function(o, e) {
  s3e.apply(o, ze(e) ? e : [e]);
}, r3e = Date.prototype.toISOString, L = {
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
    return r3e.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, a3e = function o(e, t, n, s, r, c, a, i, l, u, d, _, h) {
  var m = e;
  if (typeof a == "function" ? m = a(t, m) : m instanceof Date ? m = u(m) : n === "comma" && ze(m) && (m = m.join(",")), m === null) {
    if (s)
      return c && !_ ? c(t, L.encoder, h) : t;
    m = "";
  }
  if (typeof m == "string" || typeof m == "number" || typeof m == "boolean" || Wn.isBuffer(m)) {
    if (c) {
      var g = _ ? t : c(t, L.encoder, h);
      return [d(g) + "=" + d(c(m, L.encoder, h))];
    }
    return [d(t) + "=" + d(String(m))];
  }
  var $ = [];
  if (typeof m > "u")
    return $;
  var b;
  if (ze(a))
    b = a;
  else {
    var w = Object.keys(m);
    b = i ? w.sort(i) : w;
  }
  for (var I = 0; I < b.length; ++I) {
    var D = b[I];
    r && m[D] === null || (ze(m) ? rt($, o(
      m[D],
      typeof n == "function" ? n(t, D) : t,
      n,
      s,
      r,
      c,
      a,
      i,
      l,
      u,
      d,
      _,
      h
    )) : rt($, o(
      m[D],
      t + (l ? "." + D : "[" + D + "]"),
      n,
      s,
      r,
      c,
      a,
      i,
      l,
      u,
      d,
      _,
      h
    )));
  }
  return $;
}, c3e = function(e) {
  if (!e)
    return L;
  if (e.encoder !== null && e.encoder !== void 0 && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var t = e.charset || L.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = oo.default;
  if (typeof e.format < "u") {
    if (!n3e.call(oo.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var s = oo.formatters[n], r = L.filter;
  return (typeof e.filter == "function" || ze(e.filter)) && (r = e.filter), {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : L.addQueryPrefix,
    allowDots: typeof e.allowDots > "u" ? L.allowDots : !!e.allowDots,
    charset: t,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : L.charsetSentinel,
    delimiter: typeof e.delimiter > "u" ? L.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : L.encode,
    encoder: typeof e.encoder == "function" ? e.encoder : L.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : L.encodeValuesOnly,
    filter: r,
    formatter: s,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : L.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : L.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : L.strictNullHandling
  };
}, i3e = function(o, e) {
  var t = o, n = c3e(e), s, r;
  typeof n.filter == "function" ? (r = n.filter, t = r("", t)) : ze(n.filter) && (r = n.filter, s = r);
  var c = [];
  if (typeof t != "object" || t === null)
    return "";
  var a;
  e && e.arrayFormat in on ? a = e.arrayFormat : e && "indices" in e ? a = e.indices ? "indices" : "repeat" : a = "indices";
  var i = on[a];
  s || (s = Object.keys(t)), n.sort && s.sort(n.sort);
  for (var l = 0; l < s.length; ++l) {
    var u = s[l];
    n.skipNulls && t[u] === null || rt(c, a3e(
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
  var d = c.join(n.delimiter), _ = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? _ += "utf8=%26%2310003%3B&" : _ += "utf8=%E2%9C%93&"), d.length > 0 ? _ + d : "";
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
}, l3e = function(o) {
  return o.replace(/&#(\d+);/g, function(e, t) {
    return String.fromCharCode(parseInt(t, 10));
  });
}, d3e = "utf8=%26%2310003%3B", u3e = "utf8=%E2%9C%93", p3e = function(e, t) {
  var n = {}, s = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, r = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, c = s.split(t.delimiter, r), a = -1, i, l = t.charset;
  if (t.charsetSentinel)
    for (i = 0; i < c.length; ++i)
      c[i].indexOf("utf8=") === 0 && (c[i] === u3e ? l = "utf-8" : c[i] === d3e && (l = "iso-8859-1"), a = i, i = c.length);
  for (i = 0; i < c.length; ++i)
    if (i !== a) {
      var u = c[i], d = u.indexOf("]="), _ = d === -1 ? u.indexOf("=") : d + 1, h, m;
      _ === -1 ? (h = t.decoder(u, F.decoder, l), m = t.strictNullHandling ? null : "") : (h = t.decoder(u.slice(0, _), F.decoder, l), m = t.decoder(u.slice(_ + 1), F.decoder, l)), m && t.interpretNumericEntities && l === "iso-8859-1" && (m = l3e(m)), m && t.comma && m.indexOf(",") > -1 && (m = m.split(",")), at.call(n, h) ? n[h] = lo.combine(n[h], m) : n[h] = m;
    }
  return n;
}, m3e = function(o, e, t) {
  for (var n = e, s = o.length - 1; s >= 0; --s) {
    var r, c = o[s];
    if (c === "[]" && t.parseArrays)
      r = [].concat(n);
    else {
      r = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var a = c.charAt(0) === "[" && c.charAt(c.length - 1) === "]" ? c.slice(1, -1) : c, i = parseInt(a, 10);
      !t.parseArrays && a === "" ? r = { 0: n } : !isNaN(i) && c !== a && String(i) === a && i >= 0 && t.parseArrays && i <= t.arrayLimit ? (r = [], r[i] = n) : r[a] = n;
    }
    n = r;
  }
  return n;
}, _3e = function(e, t, n) {
  if (e) {
    var s = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, r = /(\[[^[\]]*])/, c = /(\[[^[\]]*])/g, a = r.exec(s), i = a ? s.slice(0, a.index) : s, l = [];
    if (i) {
      if (!n.plainObjects && at.call(Object.prototype, i) && !n.allowPrototypes)
        return;
      l.push(i);
    }
    for (var u = 0; (a = c.exec(s)) !== null && u < n.depth; ) {
      if (u += 1, !n.plainObjects && at.call(Object.prototype, a[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      l.push(a[1]);
    }
    return a && l.push("[" + s.slice(a.index) + "]"), m3e(l, t, n);
  }
}, g3e = function(e) {
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
}, h3e = function(o, e) {
  var t = g3e(e);
  if (o === "" || o === null || typeof o > "u")
    return t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof o == "string" ? p3e(o, t) : o, s = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, r = Object.keys(n), c = 0; c < r.length; ++c) {
    var a = r[c], i = _3e(a, n[a], t);
    s = lo.merge(s, i, t);
  }
  return lo.compact(s);
}, f3e = i3e, y3e = h3e, $3e = Un, v3e = {
  formats: $3e,
  parse: y3e,
  stringify: f3e
};
const b3e = typeof window < "u", me = b3e ? window.__ENV__ || {} : {}, Q = {
  VITE_APP_BASE_URL: me.VITE_APP_BASE_URL || "" || "",
  VITE_IMG_DOMAIN: me.VITE_IMG_DOMAIN || "" || "",
  VITE_SITE_ID: me.VITE_SITE_ID || "" || "",
  VITE_REQUEST_STORAGE_TOKEN_KEY: me.VITE_REQUEST_STORAGE_TOKEN_KEY || "wapToken",
  VITE_REQUEST_HEADER_TOKEN_KEY: me.VITE_REQUEST_HEADER_TOKEN_KEY || "token",
  VITE_REQUEST_HEADER_SITEID_KEY: me.VITE_REQUEST_HEADER_SITEID_KEY || "site-id",
  VITE_REQUEST_HEADER_CHANNEL_KEY: me.VITE_REQUEST_HEADER_CHANNEL_KEY || "channel",
  VITE_APP_VERSION: me.VITE_APP_VERSION || "1.0.1"
};
class T3e {
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
      Co() && (this.config.header[Q.VITE_REQUEST_HEADER_TOKEN_KEY] = Co()), this.config.header[Q.VITE_REQUEST_HEADER_CHANNEL_KEY] = tn(), this.config.header[Q.VITE_REQUEST_HEADER_SITEID_KEY] = nn(Q.VITE_SITE_ID);
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
    const s = Object.assign(uni.$u.deepClone(this.config), n, {
      url: this.baseUrl + e,
      ...t
    });
    return new Promise((r, c) => {
      uni.uploadFile({
        ...s,
        success: (a) => {
          const i = JSON.parse(a.data);
          i.code == 1 ? (this.config.showSuccessMessage && uni.showToast({ title: i.msg, icon: "none" }), r(i)) : (i.code == 0 || i.code == 400 ? this.config.showErrorMessage !== !1 && uni.showToast({ title: i.msg, icon: "none" }) : this.handleAuthError(i.code), c(i));
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
  request(e, t, n, s = {}) {
    this.requestInterceptors();
    const r = Object.assign(uni.$u.deepClone(this.config), s, {
      url: this.baseUrl + t,
      method: e
    });
    return r.method.toUpperCase() == "GET" || r.method.toUpperCase() == "DELETE" ? r.url += "?" + v3e.stringify(n) : r.data = n, new Promise((c, a) => {
      uni.request({
        ...r,
        success: (i) => {
          const l = i.data;
          l.code == 1 ? (s.showSuccessMessage && uni.showToast({ title: l.msg, icon: "none" }), c(l)) : (l.code == 0 || l.code == 400 ? s.showErrorMessage !== !1 && uni.showToast({ title: l.msg, icon: "none" }) : this.handleAuthError(l.code), a(l));
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
        if (ko().indexOf("app/pages/index/close") != -1)
          return;
        U({ url: "/app/pages/index/close", mode: "reLaunch" });
        break;
      case 403:
        if (ko().indexOf("app/pages/index/nosite") != -1)
          return;
        U({ url: "/app/pages/index/nosite", mode: "switchTab" });
        break;
    }
  }
  handleRequestFail(e) {
    if (e.errMsg && e.errMsg == "request:ok" && typeof e.data == "string") {
      const t = (Gn(this.baseUrl) ? this.baseUrl : location.origin + this.baseUrl) + Wo("baseUrlError");
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
const Y = new T3e();
function P3e() {
  return Y.get("member/member");
}
function S3e(o) {
  return uni.getStorageSync("pid") && (o.pid = uni.getStorageSync("pid")), Y.put("member/mobile", o, { showErrorMessage: !0 });
}
function qn() {
  const o = (a) => {
    uni.setStorage({ key: "loginBack", data: a }), setTimeout(() => {
      const i = jo(), l = Tt();
      !uni.getStorageSync("autoLoginLock") && Fe() && i.login.is_bind_mobile && uni.setStorageSync("isBindMobile", !0), Fe() ? i.login.is_username && !i.login.is_mobile && !i.login.is_auth_register ? U({ url: "/app/pages/auth/login", param: { type: "username" } }) : l.initStatus == "finish" && !i.login.is_username && !i.login.is_mobile && !i.login.is_auth_register ? uni.showToast({ title: "商家未开启登录注册", icon: "none" }) : U({ url: "/app/pages/auth/index" }) : i.login.is_username && !i.login.is_mobile ? U({ url: "/app/pages/auth/login", param: { type: "username" } }) : l.initStatus == "finish" && !i.login.is_username && !i.login.is_mobile ? uni.showToast({ title: "商家未开启登录注册", icon: "none" }) : U({ url: "/app/pages/auth/index" });
    });
  }, e = X(0), t = (a) => {
    e.value = a, uni.removeStorageSync("autoLoginLock"), uni.getStorage({
      key: "loginBack",
      success: (i) => {
        e.value == 1 ? U({
          url: "/addon/home_service/technician/pages/member/index",
          mode: "redirectTo"
        }) : e.value == 2 ? U({
          url: "/addon/home_service/store/pages/member/index",
          mode: "redirectTo"
        }) : U(
          i ? {
            ...i.data,
            mode: "redirectTo"
          } : { url: "/app/pages/index/index", mode: "switchTab" }
        );
      },
      fail: (i) => {
        console.log(e.value), e.value == 1 ? U({ url: "/addon/home_service/technician/pages/member/index", mode: "switchTab" }) : e.value == 2 ? U({ url: "/addon/home_service/store/pages/member/index", mode: "switchTab" }) : U({ url: "/app/pages/index/index", mode: "switchTab" });
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
    uni.getStorageSync("pid") && Object.assign(i, { pid: uni.getStorageSync("pid") }), Pxe(i).then((l) => {
      l.data && Sxe(l.data).then((u) => {
        const d = jo();
        u.data.token ? (uni.removeStorageSync("member_lock"), ge().setToken(u.data.token, () => {
          const _ = ge().info;
          _ && _.wx_openid && uni.setStorageSync("openid", _.wx_openid), uni.getStorageSync("isBindMobile") && uni.removeStorageSync("isBindMobile"), uni.getStorageSync("wap_member_not_control_mobile") && uni.removeStorageSync("wap_member_not_control_mobile"), _ && (_.mobile ? uni.setStorageSync("wap_member_mobile", _.mobile) : uni.setStorageSync("wap_member_not_control_mobile", !0));
          let h = uni.getStorageSync("loginBack");
          h && h.url && ko() == "app/pages/auth/index" && t();
        })) : (uni.setStorageSync("openid", u.data.openid), uni.setStorageSync("unionid", u.data.unionid), u.data.nickname && uni.setStorageSync("nickname", u.data.nickname), u.data.avatar && uni.setStorageSync("avatar", u.data.avatar), uni.getStorageSync("isBindMobile") && uni.removeStorageSync("isBindMobile"), d.login.is_bind_mobile && uni.setStorageSync("isBindMobile", !0));
      }).catch((u) => {
        uni.setStorageSync("member_lock", !0);
      });
    }).catch((l) => {
      l.code == -1 ? r({ scopes: "snsapi_userinfo" }) : uni.showToast({ title: l.msg, icon: "none" });
    });
  }, s = (a, i = null) => {
    Oxe({
      code: a
    }).then((u) => {
      ge().getMemberInfo(() => {
        const d = ge().info;
        d && d.wx_openid && uni.setStorageSync("openid", d.wx_openid), i && i();
      });
    });
  }, r = (a = {}) => {
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
      let l = C3e(location.href).query;
      l.code && delete l.code, Object.keys(l).length && (i += uni.$u.queryParams(l));
    }
    fxe({
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
    updateOpenid: s,
    getAuthCode: r,
    updateWechatOpenidForH5: (a) => {
      a && wxe({ wx_openid: a }).then((i) => {
        const l = ge().info;
        l && l.wx_openid && uni.setStorageSync("openid", l.wx_openid);
      });
    }
  };
}
const O3e = zo("member", {
  state: () => ({
    token: uni.getStorageSync(Q.VITE_REQUEST_STORAGE_TOKEN_KEY),
    info: null,
    levelList: null
  }),
  actions: {
    setToken(o, e = null) {
      this.token = o, j3e(o), this.getMemberInfo(e);
    },
    getMemberInfo(o = null) {
      this.token && P3e().then((e) => {
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
        k3e(), uni.removeStorageSync("wap_member_info"), uni.removeStorageSync("unionid"), uni.removeStorageSync("isBindMobile"), uni.removeStorageSync("nickname"), uni.removeStorageSync("avatar"), uni.removeStorageSync("wap_member_mobile"), uni.removeStorageSync("wap_member_id"), uni.removeStorageSync("wap_member_not_control_mobile"), o && U({ url: "/app/pages/index/index", mode: "switchTab" });
      };
      Txe().then(() => {
        e();
      }).catch(() => {
        e();
      });
    },
    // 一键绑定手机号
    bindMobile(o) {
      if (o.detail.errMsg == "getPhoneNumber:ok" && (uni.showLoading({ title: "" }), S3e({
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
}), ge = O3e, U = (o) => {
  const e = ut();
  if (qe().mode == "decorate")
    return;
  let { url: t, mode: n, param: s, success: r, fail: c, complete: a } = o;
  t && (t.indexOf("https") != -1 || t.indexOf("http") != -1) && (window.location.href = t);
  let i = t, l = !1;
  if (!Co() && Sze().indexOf(t) != -1) {
    const d = jo(), _ = Tt();
    if (Fe())
      if (d.login.is_username && !d.login.is_mobile && !d.login.is_auth_register)
        t = "/app/pages/auth/login", s = { type: "username" }, l = !0;
      else if (_.initStatus == "finish" && !d.login.is_username && !d.login.is_mobile && !d.login.is_auth_register) {
        e.showToast({ title: "商家未开启登录注册", icon: "none" });
        return;
      } else
        t = "/app/pages/auth/index", l = !0;
    else if (d.login.is_username && !d.login.is_mobile)
      t = "/app/pages/auth/login", s = { type: "username" }, l = !0;
    else if (_.initStatus == "finish" && !d.login.is_username && !d.login.is_mobile) {
      e.showToast({ title: "商家未开启登录注册", icon: "none" });
      return;
    } else
      t = "/app/pages/auth/index", l = !0;
  }
  switch (n = n || "navigateTo", jze().includes(t) && (n = "switchTab"), n != "switchTab" && s && Object.keys(s).length && (t += e.$u.queryParams(s)), l && e.setStorage({ key: "loginBack", data: { url: i } }), n) {
    case "switchTab":
      e.switchTab({
        url: t,
        success: () => {
          r && r();
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
          r && r();
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
          r && r();
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
          r && r();
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
}, w3e = (o) => {
  qe().mode != "decorate" && (o == null || Object.keys(o).length == 1 || (o.url && (o.url.indexOf("https") != -1 || o.url.indexOf("http") != -1) ? window.location.href = o.url : o.appid || (o.name == "DIY_MAKE_PHONE_CALL" && o.mobile ? uni.makePhoneCall({
    phoneNumber: o.mobile,
    success: (t) => {
    },
    fail: (t) => {
    }
  }) : U({ url: o.url }))));
}, ko = () => {
  const o = getCurrentPages(), e = o[o.length - 1];
  return e ? e.route : "";
};
function Co() {
  return ge().token;
}
function j3e(o) {
  uni.setStorageSync(Q.VITE_REQUEST_STORAGE_TOKEN_KEY, o);
}
function k3e() {
  uni.removeStorageSync(Q.VITE_REQUEST_STORAGE_TOKEN_KEY);
}
function C3e(o) {
  const e = {}, [t, n] = o.split("?");
  return n && n.split("&").forEach((s) => {
    let [r, c] = s.split("=");
    e[r] = c;
  }), { path: t, query: e };
}
function Gn(o) {
  return o && (o.indexOf("http://") != -1 || o.indexOf("https://") != -1) || !1;
}
function M3e(o) {
  let e = Q.VITE_IMG_DOMAIN || location.origin;
  return typeof o == "string" && o.startsWith("/") && (o = o.replace(/^\//, "")), typeof e == "string" && e.endsWith("/") && (e = e.slice(0, -1)), Gn(o) ? o : `${e}/${o}`;
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
let sn = !1;
function Vn() {
  return typeof window > "u" ? !1 : /[?&]mode=decorate(?:&|$|#)/.test(window.location.href);
}
function bKe() {
  if (typeof window > "u")
    return !1;
  try {
    return window.parent !== window;
  } catch {
    return !1;
  }
}
function A3e(o) {
  o != null && o.length && o.forEach((e) => {
    e.pageStyle = "", e.componentIsShow = !0, e.pageStartBgColor && (e.pageStartBgColor && e.pageEndBgColor ? e.pageStyle += `background:linear-gradient(${e.pageGradientAngle},${e.pageStartBgColor},${e.pageEndBgColor});` : e.pageStyle += "background-color:" + e.pageStartBgColor + ";"), e.margin && (e.margin.top > 0 ? e.pageStyle += "padding-top:" + e.margin.top * 2 + "rpx;" : e.pageStyle += "padding-top:2rpx;", e.pageStyle += "padding-bottom:" + e.margin.bottom * 2 + "rpx;", e.pageStyle += "padding-right:" + e.margin.both * 2 + "rpx;", e.pageStyle += "padding-left:" + e.margin.both * 2 + "rpx;");
  });
}
function I3e(o) {
  const e = qe();
  o.pageMode !== void 0 && (e.pageMode = o.pageMode), o.currentIndex !== void 0 && (e.currentIndex = o.currentIndex), o.global && (e.global = o.global), o.value && (e.value = o.value), A3e(e.value);
}
function Yn() {
  if (sn)
    return;
  sn = !0;
  const o = qe();
  Vn() && (o.mode = "decorate"), window.addEventListener("message", (e) => {
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
      o.mode = "decorate", I3e(t);
    } catch (t) {
      console.log("uni-app diy decorate bridge", t);
    }
  }, !1);
}
function N3e() {
  Yn(), window.parent.postMessage(JSON.stringify({
    type: "init",
    load: !0
  }), "*");
}
function rn(o = {}) {
  var n;
  if (o.mode)
    return String(o.mode);
  const e = getCurrentPages(), t = e[e.length - 1];
  return (n = t == null ? void 0 : t.options) != null && n.mode ? String(t.options.mode) : Vn() ? "decorate" : "";
}
const qe = zo("diy", {
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
      Yn(), N3e();
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
        if (ko() == "app/pages/member/index" && !Co()) {
          qn().setLoginBack({ url: o.url });
          return;
        }
        w3e(o);
      }
    }
  }
}), D3e = "onShow", z3e = "onHide", x3e = "onLoad", E3e = "onUnload", R3e = "onPageScroll", uo = (o) => (e, t = hn()) => {
  !gze && hze(o, e, t);
}, Kn = /* @__PURE__ */ uo(D3e), Qn = /* @__PURE__ */ uo(z3e), F3e = /* @__PURE__ */ uo(x3e), H3e = /* @__PURE__ */ uo(E3e), Xn = /* @__PURE__ */ uo(R3e);
function L3e(o) {
  return Y.get("diy/diy", o);
}
const B3e = Symbol("addonPageQuery");
function TKe(o = {}) {
  const e = X(!0), t = qe(), n = fze(B3e, null), s = X(0), r = X(o.name || ""), c = X(""), a = X(""), i = kt({}), l = kt({
    pageMode: "diy",
    title: "",
    global: {},
    value: []
  }), u = () => e.value, d = fn(() => t.mode == "decorate" ? t : l), _ = X(!1), h = () => {
    let P = "";
    return d.value.global.pageStartBgColor && (d.value.global.pageStartBgColor && d.value.global.pageEndBgColor ? P += `background:linear-gradient(${d.value.global.pageGradientAngle},${d.value.global.pageStartBgColor},${d.value.global.pageEndBgColor});` : P += "background-color:" + d.value.global.pageStartBgColor + ";"), d.value.global.bottomTabBar && d.value.global.bottomTabBar.isShow ? P += "min-height:calc(100vh - 50px);" : P += "min-height:calc(100vh);", d.value.global.bgUrl && (P += `background-image:url('${M3e(d.value.global.bgUrl)}');`), d.value.global.bgHeightScale && (P += `background-size: 100% ${d.value.global.bgHeightScale}%;`), P;
  };
  function m(P, j) {
    if (Object.assign(i, P.data), !i.value) {
      e.value = !1, j && j(i);
      return;
    }
    l.pageMode = i.mode, l.title = i.title;
    const E = JSON.parse(i.value);
    l.global = E.global, l.global.id = i.id, l.global.site_id = i.site_id, l.global.type = i.type, l.global.popWindow && l.global.popWindow.show && (l.global.popWindow.id = i.id), l.value = E.value, l.value.forEach((T) => {
      T.pageStyle = "", T.componentIsShow = !0, T.pageStartBgColor && (T.pageStartBgColor && T.pageEndBgColor ? T.pageStyle += `background:linear-gradient(${T.pageGradientAngle},${T.pageStartBgColor},${T.pageEndBgColor});` : T.pageStyle += "background-color:" + T.pageStartBgColor + ";"), T.margin && (T.margin.top > 0 && (T.pageStyle += "padding-top:" + T.margin.top * 2 + "rpx;"), T.pageStyle += "padding-bottom:" + T.margin.bottom * 2 + "rpx;", T.pageStyle += "padding-right:" + T.margin.both * 2 + "rpx;", T.pageStyle += "padding-left:" + T.margin.both * 2 + "rpx;");
    }), t.global = l.global, t.value = l.value, _.value = l.value.some((T) => T && T.position && T.position == "top_fixed"), ut().setNavigationBarTitle({
      title: l.title
    }), e.value = !1, j && j(i);
  }
  function g(P = null) {
    L3e({
      id: s.value,
      name: r.value,
      template: c.value
    }).then((j) => {
      m(j, P);
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
    isShowTopTabbar: _,
    pageStyle: h,
    onLoad: () => {
      F3e((P) => {
        var j;
        !P.mode && ((j = n == null ? void 0 : n.value) != null && j.mode) && (P.mode = n.value.mode), t.mode = rn(P), t.mode == "decorate" && (e.value = !1, $()), s.value = P.id || "", r.value == "" && (r.value = P.name || ""), c.value = P.template || "";
      });
    },
    onShow: (P = null) => {
      Kn(() => {
        let j = getCurrentPages();
        a.value = j[j.length - 1] ? j[j.length - 1].route : "";
        let E = [];
        uni.getStorageSync("diyPageBlank") && (E = uni.getStorageSync("diyPageBlank")), !E.length || E.length && E.indexOf(a.value) == -1 ? t.topFixedStatus = "home" : E.length && E.indexOf(a.value) != -1 && (t.topFixedStatus = "diy"), t.mode || (t.mode = rn({})), t.mode == "decorate" ? (t.init(), $()) : g(P);
      });
    },
    onHide: (P = null) => {
      Qn(() => {
        let j = [];
        uni.getStorageSync("diyPageBlank") && (j = uni.getStorageSync("diyPageBlank")), j.length && (j = Array.from(new Set(j)), j.forEach((E, T, $e) => {
          E == a.value && $e.splice(T, 1);
        })), t.topFixedStatus == "diy" && j.push(a.value), uni.setStorageSync("diyPageBlank", j), P && P();
      });
    },
    onUnload: (P = null) => {
      H3e(() => {
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
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(o, s).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function ne(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? an(Object(t), !0).forEach(function(n) {
      U3e(o, n, t[n]);
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
function U3e(o, e, t) {
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
function W3e(o, e) {
  if (o == null)
    return {};
  var t = {}, n = Object.keys(o), s, r;
  for (r = 0; r < n.length; r++)
    s = n[r], !(e.indexOf(s) >= 0) && (t[s] = o[s]);
  return t;
}
function q3e(o, e) {
  if (o == null)
    return {};
  var t = W3e(o, e), n, s;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(o);
    for (s = 0; s < r.length; s++)
      n = r[s], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(o, n) && (t[n] = o[n]);
  }
  return t;
}
var G3e = "1.15.6";
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
function Mo(o, e) {
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
function es(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function Z(o, e, t, n) {
  if (o) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? o.parentNode === t && Mo(o, e) : Mo(o, e)) || n && o === t)
        return o;
      if (o === t)
        break;
    } while (o = es(o));
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
function f(o, e, t) {
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
      var n = f(o, "transform");
      n && n !== "none" && (t = n + " " + t);
    } while (!e && (o = o.parentNode));
  var s = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return s && new s(t);
}
function os(o, e, t) {
  if (o) {
    var n = o.getElementsByTagName(e), s = 0, r = n.length;
    if (t)
      for (; s < r; s++)
        t(n[s], s);
    return n;
  }
  return [];
}
function te() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function x(o, e, t, n, s) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var r, c, a, i, l, u, d;
    if (o !== window && o.parentNode && o !== te() ? (r = o.getBoundingClientRect(), c = r.top, a = r.left, i = r.bottom, l = r.right, u = r.height, d = r.width) : (c = 0, a = 0, i = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (e || t) && o !== window && (s = s || o.parentNode, !le))
      do
        if (s && s.getBoundingClientRect && (f(s, "transform") !== "none" || t && f(s, "position") !== "static")) {
          var _ = s.getBoundingClientRect();
          c -= _.top + parseInt(f(s, "border-top-width")), a -= _.left + parseInt(f(s, "border-left-width")), i = c + r.height, l = a + r.width;
          break;
        }
      while (s = s.parentNode);
    if (n && o !== window) {
      var h = xe(s || o), m = h && h.a, g = h && h.d;
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
  for (var n = fe(o, !0), s = x(o)[e]; n; ) {
    var r = x(n)[t], c = void 0;
    if (t === "top" || t === "left" ? c = s >= r : c = s <= r, !c)
      return n;
    if (n === te())
      break;
    n = fe(n, !1);
  }
  return !1;
}
function He(o, e, t, n) {
  for (var s = 0, r = 0, c = o.children; r < c.length; ) {
    if (c[r].style.display !== "none" && c[r] !== y.ghost && (n || c[r] !== y.dragged) && Z(c[r], t.draggable, o, !1)) {
      if (s === e)
        return c[r];
      s++;
    }
    r++;
  }
  return null;
}
function St(o, e) {
  for (var t = o.lastElementChild; t && (t === y.ghost || f(t, "display") === "none" || e && !Mo(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function K(o, e) {
  var t = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== y.clone && (!e || Mo(o, e)) && t++;
  return t;
}
function un(o) {
  var e = 0, t = 0, n = te();
  if (o)
    do {
      var s = xe(o), r = s.a, c = s.d;
      e += o.scrollLeft * r, t += o.scrollTop * c;
    } while (o !== n && (o = o.parentNode));
  return [e, t];
}
function V3e(o, e) {
  for (var t in o)
    if (o.hasOwnProperty(t)) {
      for (var n in e)
        if (e.hasOwnProperty(n) && e[n] === o[t][n])
          return Number(t);
    }
  return -1;
}
function fe(o, e) {
  if (!o || !o.getBoundingClientRect)
    return te();
  var t = o, n = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var s = f(t);
      if (t.clientWidth < t.scrollWidth && (s.overflowX == "auto" || s.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (s.overflowY == "auto" || s.overflowY == "scroll")) {
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
function Y3e(o, e) {
  if (o && e)
    for (var t in e)
      e.hasOwnProperty(t) && (o[t] = e[t]);
  return o;
}
function Go(o, e) {
  return Math.round(o.top) === Math.round(e.top) && Math.round(o.left) === Math.round(e.left) && Math.round(o.height) === Math.round(e.height) && Math.round(o.width) === Math.round(e.width);
}
var no;
function ts(o, e) {
  return function() {
    if (!no) {
      var t = arguments, n = this;
      t.length === 1 ? o.call(n, t[0]) : o.apply(n, t), no = setTimeout(function() {
        no = void 0;
      }, e);
    }
  };
}
function K3e() {
  clearTimeout(no), no = void 0;
}
function ns(o, e, t) {
  o.scrollLeft += e, o.scrollTop += t;
}
function ss(o) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(o).cloneNode(!0) : t ? t(o).clone(!0)[0] : o.cloneNode(!0);
}
function rs(o, e, t) {
  var n = {};
  return Array.from(o.children).forEach(function(s) {
    var r, c, a, i;
    if (!(!Z(s, e.draggable, o, !1) || s.animated || s === t)) {
      var l = x(s);
      n.left = Math.min((r = n.left) !== null && r !== void 0 ? r : 1 / 0, l.left), n.top = Math.min((c = n.top) !== null && c !== void 0 ? c : 1 / 0, l.top), n.right = Math.max((a = n.right) !== null && a !== void 0 ? a : -1 / 0, l.right), n.bottom = Math.max((i = n.bottom) !== null && i !== void 0 ? i : -1 / 0, l.bottom);
    }
  }), n.width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n;
}
var q = "Sortable" + new Date().getTime();
function Q3e() {
  var o = [], e;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var n = [].slice.call(this.el.children);
        n.forEach(function(s) {
          if (!(f(s, "display") === "none" || s === y.ghost)) {
            o.push({
              target: s,
              rect: x(s)
            });
            var r = ne({}, o[o.length - 1].rect);
            if (s.thisAnimationDuration) {
              var c = xe(s, !0);
              c && (r.top -= c.f, r.left -= c.e);
            }
            s.fromRect = r;
          }
        });
      }
    },
    addAnimationState: function(n) {
      o.push(n);
    },
    removeAnimationState: function(n) {
      o.splice(V3e(o, {
        target: n
      }), 1);
    },
    animateAll: function(n) {
      var s = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof n == "function" && n();
        return;
      }
      var r = !1, c = 0;
      o.forEach(function(a) {
        var i = 0, l = a.target, u = l.fromRect, d = x(l), _ = l.prevFromRect, h = l.prevToRect, m = a.rect, g = xe(l, !0);
        g && (d.top -= g.f, d.left -= g.e), l.toRect = d, l.thisAnimationDuration && Go(_, d) && !Go(u, d) && // Make sure animatingRect is on line between toRect & fromRect
        (m.top - d.top) / (m.left - d.left) === (u.top - d.top) / (u.left - d.left) && (i = J3e(m, _, h, s.options)), Go(d, u) || (l.prevFromRect = u, l.prevToRect = d, i || (i = s.options.animation), s.animate(l, m, d, i)), i && (r = !0, c = Math.max(c, i), clearTimeout(l.animationResetTimer), l.animationResetTimer = setTimeout(function() {
          l.animationTime = 0, l.prevFromRect = null, l.fromRect = null, l.prevToRect = null, l.thisAnimationDuration = null;
        }, i), l.thisAnimationDuration = i);
      }), clearTimeout(e), r ? e = setTimeout(function() {
        typeof n == "function" && n();
      }, c) : typeof n == "function" && n(), o = [];
    },
    animate: function(n, s, r, c) {
      if (c) {
        f(n, "transition", ""), f(n, "transform", "");
        var a = xe(this.el), i = a && a.a, l = a && a.d, u = (s.left - r.left) / (i || 1), d = (s.top - r.top) / (l || 1);
        n.animatingX = !!u, n.animatingY = !!d, f(n, "transform", "translate3d(" + u + "px," + d + "px,0)"), this.forRepaintDummy = X3e(n), f(n, "transition", "transform " + c + "ms" + (this.options.easing ? " " + this.options.easing : "")), f(n, "transform", "translate3d(0,0,0)"), typeof n.animated == "number" && clearTimeout(n.animated), n.animated = setTimeout(function() {
          f(n, "transition", ""), f(n, "transform", ""), n.animated = !1, n.animatingX = !1, n.animatingY = !1;
        }, c);
      }
    }
  };
}
function X3e(o) {
  return o.offsetWidth;
}
function J3e(o, e, t, n) {
  return Math.sqrt(Math.pow(e.top - o.top, 2) + Math.pow(e.left - o.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * n.animation;
}
var Me = [], Vo = {
  initializeByDefault: !0
}, mo = {
  mount: function(e) {
    for (var t in Vo)
      Vo.hasOwnProperty(t) && !(t in e) && (e[t] = Vo[t]);
    Me.forEach(function(n) {
      if (n.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Me.push(e);
  },
  pluginEvent: function(e, t, n) {
    var s = this;
    this.eventCanceled = !1, n.cancel = function() {
      s.eventCanceled = !0;
    };
    var r = e + "Global";
    Me.forEach(function(c) {
      t[c.pluginName] && (t[c.pluginName][r] && t[c.pluginName][r](ne({
        sortable: t
      }, n)), t.options[c.pluginName] && t[c.pluginName][e] && t[c.pluginName][e](ne({
        sortable: t
      }, n)));
    });
  },
  initializePlugins: function(e, t, n, s) {
    Me.forEach(function(a) {
      var i = a.pluginName;
      if (!(!e.options[i] && !a.initializeByDefault)) {
        var l = new a(e, t, e.options);
        l.sortable = e, l.options = e.options, e[i] = l, ce(n, l.defaults);
      }
    });
    for (var r in e.options)
      if (e.options.hasOwnProperty(r)) {
        var c = this.modifyOption(e, r, e.options[r]);
        typeof c < "u" && (e.options[r] = c);
      }
  },
  getEventProperties: function(e, t) {
    var n = {};
    return Me.forEach(function(s) {
      typeof s.eventProperties == "function" && ce(n, s.eventProperties.call(t[s.pluginName], e));
    }), n;
  },
  modifyOption: function(e, t, n) {
    var s;
    return Me.forEach(function(r) {
      e[r.pluginName] && r.optionListeners && typeof r.optionListeners[t] == "function" && (s = r.optionListeners[t].call(e[r.pluginName], n));
    }), s;
  }
};
function Z3e(o) {
  var e = o.sortable, t = o.rootEl, n = o.name, s = o.targetEl, r = o.cloneEl, c = o.toEl, a = o.fromEl, i = o.oldIndex, l = o.newIndex, u = o.oldDraggableIndex, d = o.newDraggableIndex, _ = o.originalEvent, h = o.putSortable, m = o.extraEventProperties;
  if (e = e || t && t[q], !!e) {
    var g, $ = e.options, b = "on" + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent && !le && !po ? g = new CustomEvent(n, {
      bubbles: !0,
      cancelable: !0
    }) : (g = document.createEvent("Event"), g.initEvent(n, !0, !0)), g.to = c || t, g.from = a || t, g.item = s || t, g.clone = r, g.oldIndex = i, g.newIndex = l, g.oldDraggableIndex = u, g.newDraggableIndex = d, g.originalEvent = _, g.pullMode = h ? h.lastPutMode : void 0;
    var w = ne(ne({}, m), mo.getEventProperties(n, e));
    for (var I in w)
      g[I] = w[I];
    t && t.dispatchEvent(g), $[b] && $[b].call(e, g);
  }
}
var eLe = ["evt"], W = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = n.evt, r = q3e(n, eLe);
  mo.pluginEvent.bind(y)(e, t, ne({
    dragEl: p,
    parentEl: N,
    ghostEl: v,
    rootEl: M,
    nextEl: Oe,
    lastDownEl: To,
    cloneEl: A,
    cloneHidden: he,
    dragStarted: Xe,
    putSortable: R,
    activeSortable: y.active,
    originalEvent: s,
    oldIndex: De,
    oldDraggableIndex: so,
    newIndex: V,
    newDraggableIndex: _e,
    hideGhostForTarget: ls,
    unhideGhostForTarget: ds,
    cloneNowHidden: function() {
      he = !0;
    },
    cloneNowShown: function() {
      he = !1;
    },
    dispatchSortableEvent: function(a) {
      B({
        sortable: t,
        name: a,
        originalEvent: s
      });
    }
  }, r));
};
function B(o) {
  Z3e(ne({
    putSortable: R,
    cloneEl: A,
    targetEl: p,
    rootEl: M,
    oldIndex: De,
    oldDraggableIndex: so,
    newIndex: V,
    newDraggableIndex: _e
  }, o));
}
var p, N, v, M, Oe, To, A, he, De, V, so, _e, ho, R, Ne = !1, Ao = !1, Io = [], Te, J, Yo, Ko, pn, mn, Xe, Ae, ro, ao = !1, fo = !1, Po, H, Qo = [], ct = !1, No = [], Fo = typeof document < "u", yo = Pt, _n = po || le ? "cssFloat" : "float", oLe = Fo && !Jn && !Pt && "draggable" in document.createElement("div"), as = function() {
  if (Fo) {
    if (le)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), cs = function(e, t) {
  var n = f(e), s = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), r = He(e, 0, t), c = He(e, 1, t), a = r && f(r), i = c && f(c), l = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + x(r).width, u = i && parseInt(i.marginLeft) + parseInt(i.marginRight) + x(c).width;
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && a.float && a.float !== "none") {
    var d = a.float === "left" ? "left" : "right";
    return c && (i.clear === "both" || i.clear === d) ? "vertical" : "horizontal";
  }
  return r && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || l >= s && n[_n] === "none" || c && n[_n] === "none" && l + u > s) ? "vertical" : "horizontal";
}, tLe = function(e, t, n) {
  var s = n ? e.left : e.top, r = n ? e.right : e.bottom, c = n ? e.width : e.height, a = n ? t.left : t.top, i = n ? t.right : t.bottom, l = n ? t.width : t.height;
  return s === a || r === i || s + c / 2 === a + l / 2;
}, nLe = function(e, t) {
  var n;
  return Io.some(function(s) {
    var r = s[q].options.emptyInsertThreshold;
    if (!(!r || St(s))) {
      var c = x(s), a = e >= c.left - r && e <= c.right + r, i = t >= c.top - r && t <= c.bottom + r;
      if (a && i)
        return n = s;
    }
  }), n;
}, is = function(e) {
  function t(r, c) {
    return function(a, i, l, u) {
      var d = a.options.group.name && i.options.group.name && a.options.group.name === i.options.group.name;
      if (r == null && (c || d))
        return !0;
      if (r == null || r === !1)
        return !1;
      if (c && r === "clone")
        return r;
      if (typeof r == "function")
        return t(r(a, i, l, u), c)(a, i, l, u);
      var _ = (c ? a : i).options.group.name;
      return r === !0 || typeof r == "string" && r === _ || r.join && r.indexOf(_) > -1;
    };
  }
  var n = {}, s = e.group;
  (!s || bo(s) != "object") && (s = {
    name: s
  }), n.name = s.name, n.checkPull = t(s.pull, !0), n.checkPut = t(s.put), n.revertClone = s.revertClone, e.group = n;
}, ls = function() {
  !as && v && f(v, "display", "none");
}, ds = function() {
  !as && v && f(v, "display", "");
};
Fo && !Jn && document.addEventListener("click", function(o) {
  if (Ao)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Ao = !1, !1;
}, !0);
var Pe = function(e) {
  if (p) {
    e = e.touches ? e.touches[0] : e;
    var t = nLe(e.clientX, e.clientY);
    if (t) {
      var n = {};
      for (var s in e)
        e.hasOwnProperty(s) && (n[s] = e[s]);
      n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[q]._onDragOver(n);
    }
  }
}, sLe = function(e) {
  p && p.parentNode[q]._isOutsideThisEl(e.target);
};
function y(o, e) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = e = ce({}, e), o[q] = this;
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
      return cs(o, this.options);
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
  is(e);
  for (var s in this)
    s.charAt(0) === "_" && typeof this[s] == "function" && (this[s] = this[s].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : oLe, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? O(o, "pointerdown", this._onTapStart) : (O(o, "mousedown", this._onTapStart), O(o, "touchstart", this._onTapStart)), this.nativeDraggable && (O(o, "dragover", this), O(o, "dragenter", this)), Io.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ce(this, Q3e());
}
y.prototype = /** @lends Sortable.prototype */
{
  constructor: y,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (Ae = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, p) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, n = this.el, s = this.options, r = s.preventOnFilter, c = e.type, a = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, i = (a || e).target, l = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || i, u = s.filter;
      if (pLe(n), !p && !(/mousedown|pointerdown/.test(c) && e.button !== 0 || s.disabled) && !l.isContentEditable && !(!this.nativeDraggable && to && i && i.tagName.toUpperCase() === "SELECT") && (i = Z(i, s.draggable, n, !1), !(i && i.animated) && To !== i)) {
        if (De = K(i), so = K(i, s.draggable), typeof u == "function") {
          if (u.call(this, e, i, this)) {
            B({
              sortable: t,
              rootEl: l,
              name: "filter",
              targetEl: i,
              toEl: n,
              fromEl: n
            }), W("filter", t, {
              evt: e
            }), r && e.preventDefault();
            return;
          }
        } else if (u && (u = u.split(",").some(function(d) {
          if (d = Z(l, d.trim(), n, !1), d)
            return B({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: i,
              fromEl: n,
              toEl: n
            }), W("filter", t, {
              evt: e
            }), !0;
        }), u)) {
          r && e.preventDefault();
          return;
        }
        s.handle && !Z(l, s.handle, n, !1) || this._prepareDragStart(e, a, i);
      }
    }
  },
  _prepareDragStart: function(e, t, n) {
    var s = this, r = s.el, c = s.options, a = r.ownerDocument, i;
    if (n && !p && n.parentNode === r) {
      var l = x(n);
      if (M = r, p = n, N = p.parentNode, Oe = p.nextSibling, To = n, ho = c.group, y.dragged = p, Te = {
        target: p,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, pn = Te.clientX - l.left, mn = Te.clientY - l.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, p.style["will-change"] = "all", i = function() {
        if (W("delayEnded", s, {
          evt: e
        }), y.eventCanceled) {
          s._onDrop();
          return;
        }
        s._disableDelayedDragEvents(), !cn && s.nativeDraggable && (p.draggable = !0), s._triggerDragStart(e, t), B({
          sortable: s,
          name: "choose",
          originalEvent: e
        }), G(p, c.chosenClass, !0);
      }, c.ignore.split(",").forEach(function(u) {
        os(p, u.trim(), Xo);
      }), O(a, "dragover", Pe), O(a, "mousemove", Pe), O(a, "touchmove", Pe), c.supportPointer ? (O(a, "pointerup", s._onDrop), !this.nativeDraggable && O(a, "pointercancel", s._onDrop)) : (O(a, "mouseup", s._onDrop), O(a, "touchend", s._onDrop), O(a, "touchcancel", s._onDrop)), cn && this.nativeDraggable && (this.options.touchStartThreshold = 4, p.draggable = !0), W("delayStart", this, {
        evt: e
      }), c.delay && (!c.delayOnTouchOnly || t) && (!this.nativeDraggable || !(po || le))) {
        if (y.eventCanceled) {
          this._onDrop();
          return;
        }
        c.supportPointer ? (O(a, "pointerup", s._disableDelayedDrag), O(a, "pointercancel", s._disableDelayedDrag)) : (O(a, "mouseup", s._disableDelayedDrag), O(a, "touchend", s._disableDelayedDrag), O(a, "touchcancel", s._disableDelayedDrag)), O(a, "mousemove", s._delayedDragTouchMoveHandler), O(a, "touchmove", s._delayedDragTouchMoveHandler), c.supportPointer && O(a, "pointermove", s._delayedDragTouchMoveHandler), s._dragStartTimer = setTimeout(i, c.delay);
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
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? O(document, "pointermove", this._onTouchMove) : t ? O(document, "touchmove", this._onTouchMove) : O(document, "mousemove", this._onTouchMove) : (O(p, "dragend", this), O(M, "dragstart", this._onDragStart));
    try {
      document.selection ? So(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (Ne = !1, M && p) {
      W("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && O(document, "dragover", sLe);
      var n = this.options;
      !e && G(p, n.dragClass, !1), G(p, n.ghostClass, !0), y.active = this, e && this._appendGhost(), B({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (J) {
      this._lastX = J.clientX, this._lastY = J.clientY, ls();
      for (var e = document.elementFromPoint(J.clientX, J.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(J.clientX, J.clientY), e !== t); )
        t = e;
      if (p.parentNode[q]._isOutsideThisEl(e), t)
        do {
          if (t[q]) {
            var n = void 0;
            if (n = t[q]._onDragOver({
              clientX: J.clientX,
              clientY: J.clientY,
              target: e,
              rootEl: t
            }), n && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = es(t));
      ds();
    }
  },
  _onTouchMove: function(e) {
    if (Te) {
      var t = this.options, n = t.fallbackTolerance, s = t.fallbackOffset, r = e.touches ? e.touches[0] : e, c = v && xe(v, !0), a = v && c && c.a, i = v && c && c.d, l = yo && H && un(H), u = (r.clientX - Te.clientX + s.x) / (a || 1) + (l ? l[0] - Qo[0] : 0) / (a || 1), d = (r.clientY - Te.clientY + s.y) / (i || 1) + (l ? l[1] - Qo[1] : 0) / (i || 1);
      if (!y.active && !Ne) {
        if (n && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < n)
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
        var _ = "matrix(".concat(c.a, ",").concat(c.b, ",").concat(c.c, ",").concat(c.d, ",").concat(c.e, ",").concat(c.f, ")");
        f(v, "webkitTransform", _), f(v, "mozTransform", _), f(v, "msTransform", _), f(v, "transform", _), Yo = u, Ko = d, J = r;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!v) {
      var e = this.options.fallbackOnBody ? document.body : M, t = x(p, !0, yo, !0, e), n = this.options;
      if (yo) {
        for (H = e; f(H, "position") === "static" && f(H, "transform") === "none" && H !== document; )
          H = H.parentNode;
        H !== document.body && H !== document.documentElement ? (H === document && (H = te()), t.top += H.scrollTop, t.left += H.scrollLeft) : H = te(), Qo = un(H);
      }
      v = p.cloneNode(!0), G(v, n.ghostClass, !1), G(v, n.fallbackClass, !0), G(v, n.dragClass, !0), f(v, "transition", ""), f(v, "transform", ""), f(v, "box-sizing", "border-box"), f(v, "margin", 0), f(v, "top", t.top), f(v, "left", t.left), f(v, "width", t.width), f(v, "height", t.height), f(v, "opacity", "0.8"), f(v, "position", yo ? "absolute" : "fixed"), f(v, "zIndex", "100000"), f(v, "pointerEvents", "none"), y.ghost = v, e.appendChild(v), f(v, "transform-origin", pn / parseInt(v.style.width) * 100 + "% " + mn / parseInt(v.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var n = this, s = e.dataTransfer, r = n.options;
    if (W("dragStart", this, {
      evt: e
    }), y.eventCanceled) {
      this._onDrop();
      return;
    }
    W("setupClone", this), y.eventCanceled || (A = ss(p), A.removeAttribute("id"), A.draggable = !1, A.style["will-change"] = "", this._hideClone(), G(A, this.options.chosenClass, !1), y.clone = A), n.cloneId = So(function() {
      W("clone", n), !y.eventCanceled && (n.options.removeCloneOnHide || M.insertBefore(A, p), n._hideClone(), B({
        sortable: n,
        name: "clone"
      }));
    }), !t && G(p, r.dragClass, !0), t ? (Ao = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (S(document, "mouseup", n._onDrop), S(document, "touchend", n._onDrop), S(document, "touchcancel", n._onDrop), s && (s.effectAllowed = "move", r.setData && r.setData.call(n, s, p)), O(document, "drop", n), f(p, "transform", "translateZ(0)")), Ne = !0, n._dragStartId = So(n._dragStarted.bind(n, t, e)), O(document, "selectstart", n), Xe = !0, window.getSelection().removeAllRanges(), to && f(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, n = e.target, s, r, c, a = this.options, i = a.group, l = y.active, u = ho === i, d = a.sort, _ = R || l, h, m = this, g = !1;
    if (ct)
      return;
    function $(Ye, uze) {
      W(Ye, m, ne({
        evt: e,
        isOwner: u,
        axis: h ? "vertical" : "horizontal",
        revert: c,
        dragRect: s,
        targetRect: r,
        canSort: d,
        fromSortable: _,
        target: n,
        completed: w,
        onMove: function(jt, pze) {
          return $o(M, t, p, s, jt, x(jt), e, pze);
        },
        changed: I
      }, uze));
    }
    function b() {
      $("dragOverAnimationCapture"), m.captureAnimationState(), m !== _ && _.captureAnimationState();
    }
    function w(Ye) {
      return $("dragOverCompleted", {
        insertion: Ye
      }), Ye && (u ? l._hideClone() : l._showClone(m), m !== _ && (G(p, R ? R.options.ghostClass : l.options.ghostClass, !1), G(p, a.ghostClass, !0)), R !== m && m !== y.active ? R = m : m === y.active && R && (R = null), _ === m && (m._ignoreWhileAnimating = n), m.animateAll(function() {
        $("dragOverAnimationComplete"), m._ignoreWhileAnimating = null;
      }), m !== _ && (_.animateAll(), _._ignoreWhileAnimating = null)), (n === p && !p.animated || n === t && !n.animated) && (Ae = null), !a.dragoverBubble && !e.rootEl && n !== document && (p.parentNode[q]._isOutsideThisEl(e.target), !Ye && Pe(e)), !a.dragoverBubble && e.stopPropagation && e.stopPropagation(), g = !0;
    }
    function I() {
      V = K(p), _e = K(p, a.draggable), B({
        sortable: m,
        name: "change",
        toEl: t,
        newIndex: V,
        newDraggableIndex: _e,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = Z(n, a.draggable, t, !0), $("dragOver"), y.eventCanceled)
      return g;
    if (p.contains(e.target) || n.animated && n.animatingX && n.animatingY || m._ignoreWhileAnimating === n)
      return w(!1);
    if (Ao = !1, l && !a.disabled && (u ? d || (c = N !== M) : R === this || (this.lastPutMode = ho.checkPull(this, l, p, e)) && i.checkPut(this, l, p, e))) {
      if (h = this._getDirection(e, n) === "vertical", s = x(p), $("dragOverValid"), y.eventCanceled)
        return g;
      if (c)
        return N = M, b(), this._hideClone(), $("revert"), y.eventCanceled || (Oe ? M.insertBefore(p, Oe) : M.appendChild(p)), w(!0);
      var D = St(t, a.draggable);
      if (!D || iLe(e, h, this) && !D.animated) {
        if (D === p)
          return w(!1);
        if (D && t === e.target && (n = D), n && (r = x(n)), $o(M, t, p, s, n, r, e, !!n) !== !1)
          return b(), D && D.nextSibling ? t.insertBefore(p, D.nextSibling) : t.appendChild(p), N = t, I(), w(!0);
      } else if (D && cLe(e, h, this)) {
        var de = He(t, 0, a, !0);
        if (de === p)
          return w(!1);
        if (n = de, r = x(n), $o(M, t, p, s, n, r, e, !1) !== !1)
          return b(), t.insertBefore(p, de), N = t, I(), w(!0);
      } else if (n.parentNode === t) {
        r = x(n);
        var P = 0, j, E = p.parentNode !== t, T = !tLe(p.animated && p.toRect || s, n.animated && n.toRect || r, h), $e = h ? "top" : "left", ue = dn(n, "top", "top") || dn(p, "top", "top"), Ge = ue ? ue.scrollTop : void 0;
        Ae !== n && (j = r[$e], ao = !1, fo = !T && a.invertSwap || E), P = lLe(e, n, r, h, T ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, fo, Ae === n);
        var re;
        if (P !== 0) {
          var ve = K(p);
          do
            ve -= P, re = N.children[ve];
          while (re && (f(re, "display") === "none" || re === v));
        }
        if (P === 0 || re === n)
          return w(!1);
        Ae = n, ro = P;
        var Ve = n.nextElementSibling, pe = !1;
        pe = P === 1;
        var _o = $o(M, t, p, s, n, r, e, pe);
        if (_o !== !1)
          return (_o === 1 || _o === -1) && (pe = _o === 1), ct = !0, setTimeout(aLe, 30), b(), pe && !Ve ? t.appendChild(p) : n.parentNode.insertBefore(p, pe ? Ve : n), ue && ns(ue, 0, Ge - ue.scrollTop), N = p.parentNode, j !== void 0 && !fo && (Po = Math.abs(j - x(n)[$e])), I(), w(!0);
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
    if (V = K(p), _e = K(p, n.draggable), W("drop", this, {
      evt: e
    }), N = p && p.parentNode, V = K(p), _e = K(p, n.draggable), y.eventCanceled) {
      this._nulling();
      return;
    }
    Ne = !1, fo = !1, ao = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), it(this.cloneId), it(this._dragStartId), this.nativeDraggable && (S(document, "drop", this), S(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), to && f(document.body, "user-select", ""), f(p, "transform", ""), e && (Xe && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), v && v.parentNode && v.parentNode.removeChild(v), (M === N || R && R.lastPutMode !== "clone") && A && A.parentNode && A.parentNode.removeChild(A), p && (this.nativeDraggable && S(p, "dragend", this), Xo(p), p.style["will-change"] = "", Xe && !Ne && G(p, R ? R.options.ghostClass : this.options.ghostClass, !1), G(p, this.options.chosenClass, !1), B({
      sortable: this,
      name: "unchoose",
      toEl: N,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), M !== N ? (V >= 0 && (B({
      rootEl: N,
      name: "add",
      toEl: N,
      fromEl: M,
      originalEvent: e
    }), B({
      sortable: this,
      name: "remove",
      toEl: N,
      originalEvent: e
    }), B({
      rootEl: N,
      name: "sort",
      toEl: N,
      fromEl: M,
      originalEvent: e
    }), B({
      sortable: this,
      name: "sort",
      toEl: N,
      originalEvent: e
    })), R && R.save()) : V !== De && V >= 0 && (B({
      sortable: this,
      name: "update",
      toEl: N,
      originalEvent: e
    }), B({
      sortable: this,
      name: "sort",
      toEl: N,
      originalEvent: e
    })), y.active && ((V == null || V === -1) && (V = De, _e = so), B({
      sortable: this,
      name: "end",
      toEl: N,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    W("nulling", this), M = p = N = v = Oe = A = To = he = Te = J = Xe = V = _e = De = so = Ae = ro = R = ho = y.dragged = y.ghost = y.clone = y.active = null, No.forEach(function(e) {
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
        p && (this._onDragOver(e), rLe(e));
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
    for (var e = [], t, n = this.el.children, s = 0, r = n.length, c = this.options; s < r; s++)
      t = n[s], Z(t, c.draggable, this.el, !1) && e.push(t.getAttribute(c.dataIdAttr) || uLe(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var n = {}, s = this.el;
    this.toArray().forEach(function(r, c) {
      var a = s.children[c];
      Z(a, this.options.draggable, s, !1) && (n[r] = a);
    }, this), t && this.captureAnimationState(), e.forEach(function(r) {
      n[r] && (s.removeChild(n[r]), s.appendChild(n[r]));
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
    var s = mo.modifyOption(this, e, t);
    typeof s < "u" ? n[e] = s : n[e] = t, e === "group" && is(n);
  },
  /**
   * Destroy
   */
  destroy: function() {
    W("destroy", this);
    var e = this.el;
    e[q] = null, S(e, "mousedown", this._onTapStart), S(e, "touchstart", this._onTapStart), S(e, "pointerdown", this._onTapStart), this.nativeDraggable && (S(e, "dragover", this), S(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Io.splice(Io.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!he) {
      if (W("hideClone", this), y.eventCanceled)
        return;
      f(A, "display", "none"), this.options.removeCloneOnHide && A.parentNode && A.parentNode.removeChild(A), he = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (he) {
      if (W("showClone", this), y.eventCanceled)
        return;
      p.parentNode == M && !this.options.group.revertClone ? M.insertBefore(A, p) : Oe ? M.insertBefore(A, Oe) : M.appendChild(A), this.options.group.revertClone && this.animate(p, A), f(A, "display", ""), he = !1;
    }
  }
};
function rLe(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function $o(o, e, t, n, s, r, c, a) {
  var i, l = o[q], u = l.options.onMove, d;
  return window.CustomEvent && !le && !po ? i = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (i = document.createEvent("Event"), i.initEvent("move", !0, !0)), i.to = e, i.from = o, i.dragged = t, i.draggedRect = n, i.related = s || e, i.relatedRect = r || x(e), i.willInsertAfter = a, i.originalEvent = c, o.dispatchEvent(i), u && (d = u.call(l, i, c)), d;
}
function Xo(o) {
  o.draggable = !1;
}
function aLe() {
  ct = !1;
}
function cLe(o, e, t) {
  var n = x(He(t.el, 0, t.options, !0)), s = rs(t.el, t.options, v), r = 10;
  return e ? o.clientX < s.left - r || o.clientY < n.top && o.clientX < n.right : o.clientY < s.top - r || o.clientY < n.bottom && o.clientX < n.left;
}
function iLe(o, e, t) {
  var n = x(St(t.el, t.options.draggable)), s = rs(t.el, t.options, v), r = 10;
  return e ? o.clientX > s.right + r || o.clientY > n.bottom && o.clientX > n.left : o.clientY > s.bottom + r || o.clientX > n.right && o.clientY > n.top;
}
function lLe(o, e, t, n, s, r, c, a) {
  var i = n ? o.clientY : o.clientX, l = n ? t.height : t.width, u = n ? t.top : t.left, d = n ? t.bottom : t.right, _ = !1;
  if (!c) {
    if (a && Po < l * s) {
      if (!ao && (ro === 1 ? i > u + l * r / 2 : i < d - l * r / 2) && (ao = !0), ao)
        _ = !0;
      else if (ro === 1 ? i < u + Po : i > d - Po)
        return -ro;
    } else if (i > u + l * (1 - s) / 2 && i < d - l * (1 - s) / 2)
      return dLe(e);
  }
  return _ = _ || c, _ && (i < u + l * r / 2 || i > d - l * r / 2) ? i > u + l / 2 ? 1 : -1 : 0;
}
function dLe(o) {
  return K(p) < K(o) ? 1 : -1;
}
function uLe(o) {
  for (var e = o.tagName + o.className + o.src + o.href + o.textContent, t = e.length, n = 0; t--; )
    n += e.charCodeAt(t);
  return n.toString(36);
}
function pLe(o) {
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
  css: f,
  find: os,
  is: function(e, t) {
    return !!Z(e, t, e, !1);
  },
  extend: Y3e,
  throttle: ts,
  closest: Z,
  toggleClass: G,
  clone: ss,
  index: K,
  nextTick: So,
  cancelNextTick: it,
  detectDirection: cs,
  getChild: He,
  expando: q
};
y.get = function(o) {
  return o[q];
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
y.version = G3e;
var z = [], Je, lt, dt = !1, Jo, Zo, Do, Ze;
function mLe() {
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
      this.sortable.nativeDraggable ? S(document, "dragover", this._handleAutoScroll) : (S(document, "pointermove", this._handleFallbackAutoScroll), S(document, "touchmove", this._handleFallbackAutoScroll), S(document, "mousemove", this._handleFallbackAutoScroll)), gn(), Oo(), K3e();
    },
    nulling: function() {
      Do = lt = Je = dt = Ze = Jo = Zo = null, z.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, n) {
      var s = this, r = (t.touches ? t.touches[0] : t).clientX, c = (t.touches ? t.touches[0] : t).clientY, a = document.elementFromPoint(r, c);
      if (Do = t, n || this.options.forceAutoScrollFallback || po || le || to) {
        et(t, this.options, a, n);
        var i = fe(a, !0);
        dt && (!Ze || r !== Jo || c !== Zo) && (Ze && gn(), Ze = setInterval(function() {
          var l = fe(document.elementFromPoint(r, c), !0);
          l !== i && (i = l, Oo()), et(t, s.options, l, n);
        }, 10), Jo = r, Zo = c);
      } else {
        if (!this.options.bubbleScroll || fe(a, !0) === te()) {
          Oo();
          return;
        }
        et(t, this.options, fe(a, !1), !1);
      }
    }
  }, ce(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Oo() {
  z.forEach(function(o) {
    clearInterval(o.pid);
  }), z = [];
}
function gn() {
  clearInterval(Ze);
}
var et = ts(function(o, e, t, n) {
  if (e.scroll) {
    var s = (o.touches ? o.touches[0] : o).clientX, r = (o.touches ? o.touches[0] : o).clientY, c = e.scrollSensitivity, a = e.scrollSpeed, i = te(), l = !1, u;
    lt !== t && (lt = t, Oo(), Je = e.scroll, u = e.scrollFn, Je === !0 && (Je = fe(t, !0)));
    var d = 0, _ = Je;
    do {
      var h = _, m = x(h), g = m.top, $ = m.bottom, b = m.left, w = m.right, I = m.width, D = m.height, de = void 0, P = void 0, j = h.scrollWidth, E = h.scrollHeight, T = f(h), $e = h.scrollLeft, ue = h.scrollTop;
      h === i ? (de = I < j && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), P = D < E && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (de = I < j && (T.overflowX === "auto" || T.overflowX === "scroll"), P = D < E && (T.overflowY === "auto" || T.overflowY === "scroll"));
      var Ge = de && (Math.abs(w - s) <= c && $e + I < j) - (Math.abs(b - s) <= c && !!$e), re = P && (Math.abs($ - r) <= c && ue + D < E) - (Math.abs(g - r) <= c && !!ue);
      if (!z[d])
        for (var ve = 0; ve <= d; ve++)
          z[ve] || (z[ve] = {});
      (z[d].vx != Ge || z[d].vy != re || z[d].el !== h) && (z[d].el = h, z[d].vx = Ge, z[d].vy = re, clearInterval(z[d].pid), (Ge != 0 || re != 0) && (l = !0, z[d].pid = setInterval(function() {
        n && this.layer === 0 && y.active._onTouchMove(Do);
        var Ve = z[this.layer].vy ? z[this.layer].vy * a : 0, pe = z[this.layer].vx ? z[this.layer].vx * a : 0;
        typeof u == "function" && u.call(y.dragged.parentNode[q], pe, Ve, o, Do, z[this.layer].el) !== "continue" || ns(z[this.layer].el, pe, Ve);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (e.bubbleScroll && _ !== i && (_ = fe(_, !1)));
    dt = l;
  }
}, 30), us = function(e) {
  var t = e.originalEvent, n = e.putSortable, s = e.dragEl, r = e.activeSortable, c = e.dispatchSortableEvent, a = e.hideGhostForTarget, i = e.unhideGhostForTarget;
  if (t) {
    var l = n || r;
    a();
    var u = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, d = document.elementFromPoint(u.clientX, u.clientY);
    i(), l && !l.el.contains(d) && (c("spill"), this.onSpill({
      dragEl: s,
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
    var s = He(this.sortable.el, this.startIndex, this.options);
    s ? this.sortable.el.insertBefore(t, s) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
  },
  drop: us
};
ce(Ot, {
  pluginName: "revertOnSpill"
});
function wt() {
}
wt.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable, s = n || this.sortable;
    s.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), s.animateAll();
  },
  drop: us
};
ce(wt, {
  pluginName: "removeOnSpill"
});
y.mount(new mLe());
y.mount(wt, Ot);
function PKe(o = {}) {
  const e = X(!1);
  let t = "";
  const n = X({}), s = qe(), r = X(["fixed", "top_fixed", "right_fixed", "bottom_fixed", "left_fixed"]), c = fn(() => s.mode == "decorate" ? s : o.data);
  yn(
    () => [s.mode, s.pageMode, s.global, s.value],
    () => {
      s.mode !== "decorate" || !o.data || (o.data.pageMode = s.pageMode, o.data.global = s.global, o.data.value = s.value);
    },
    { deep: !0, immediate: !0 }
  );
  const a = (g, $) => {
    const b = {
      relative: !0,
      selected: s.currentIndex == g,
      decorate: s.mode == "decorate"
    };
    return b["top-fixed-" + s.topFixedStatus] = !0, $.position && r.value.indexOf($.position) != -1 ? b["ignore-draggable-element"] = !0 : b["draggable-element"] = !0, $.componentName == "ImageAds" && (b["overflow-hidden"] = !0), b;
  }, i = (g, $) => {
    if (s.mode == "decorate") {
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
    yze(() => {
      if (s.mode == "decorate") {
        const g = document.getElementById("componentList"), $ = y.create(g, {
          draggable: ".draggable-element",
          animation: 200,
          onEnd: (b) => {
            const w = s.value[b.oldIndex];
            s.value.splice(b.oldIndex, 1), s.value.splice(b.newIndex, 0, w), oe(() => {
              $.sort(WHe(s.value.length).map((I) => I.toString())), s.postMessage(b.newIndex, s.value[b.newIndex]);
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
        s.componentRefs = o.getFormRef().componentRefs, c.value.componentRefs = o.getFormRef().componentRefs, (w = o.getFormRef().componentRefs.topTabbarRef) == null || w.refresh(), g && clearInterval(g);
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
  }, _ = X(!1);
  return Kn(() => {
    _.value = !1;
  }), Qn(() => {
    _.value = !0, s.global.bottomTabBar.isShow = !1;
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
        if (t && !_.value)
          for (const $ in t)
            g.scrollTop <= 0 ? n.value[$] = -1 : g.scrollTop > t[$] ? n.value[$] = 1 : n.value[$] = 2;
      });
    },
    onMounted: l
  };
}
const ps = "Personal settings", ms = "Switch language", _s = "Version", gs = "Log out", _Le = {
  personalSettings: ps,
  switchLang: ms,
  version: _s,
  logout: gs
}, gLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _Le,
  logout: gs,
  personalSettings: ps,
  switchLang: ms,
  version: _s
}, Symbol.toStringTag, { value: "Module" })), hs = "文章详情", fs = "摘要", ys = "正在加载", hLe = {
  detail: hs,
  abstract: fs,
  loadingText: ys
}, fLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abstract: fs,
  default: hLe,
  detail: hs,
  loadingText: ys
}, Symbol.toStringTag, { value: "Module" })), $s = "文章列表", vs = "~ 暂无数据 ~", bs = "全部", Ts = "-- 到底了 --", Ps = "请输入搜索关键词", yLe = {
  list: $s,
  noData: vs,
  all: bs,
  end: Ts,
  searchPlaceholder: Ps
}, $Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: bs,
  default: yLe,
  end: Ts,
  list: $s,
  noData: vs,
  searchPlaceholder: Ps
}, Symbol.toStringTag, { value: "Module" })), Ss = "绑定", Os = "输入手机号动态码绑定", ws = "绑定中", js = "一键绑定", ks = "手机号快捷登录", vLe = {
  bind: Ss,
  bindMobileTip: Os,
  binding: ws,
  weixinUserAuth: js,
  mobileQuickLogin: ks
}, bLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: Ss,
  bindMobileTip: Os,
  binding: ws,
  default: vLe,
  mobileQuickLogin: ks,
  weixinUserAuth: js
}, Symbol.toStringTag, { value: "Module" })), Cs = "快捷登录/注册", Ms = "登录", As = "其他方式登录", Is = "账号密码登录", Ns = "手机号登录", Ds = "其他手机号登录", zs = "账号被锁定", TLe = {
  quickLoginOrLogout: Cs,
  login: Ms,
  otherLogin: As,
  accountLogin: Is,
  mobileLogin: Ns,
  otherMobileLogin: Ds,
  memberLock: zs
}, PLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Is,
  default: TLe,
  login: Ms,
  memberLock: zs,
  mobileLogin: Ns,
  otherLogin: As,
  otherMobileLogin: Ds,
  quickLoginOrLogout: Cs
}, Symbol.toStringTag, { value: "Module" })), xs = "登录中", Es = "请输入账号", Rs = "请输入密码", Fs = "忘记密码", Hs = "还没有账号", Ls = "去注册", Bs = "登录代表您同意", Us = "请先阅读并同意协议", Ws = "请输入手机号", qs = "快捷登录", Gs = "账号密码登录", Vs = "输入账号密码登录", Ys = "商家未开启账号密码登录", Ks = "手机号登录", Qs = "输入手机号验证码登录", Xs = "商家未开启手机号登录", SLe = {
  logining: xs,
  usernamePlaceholder: Es,
  passwordPlaceholder: Rs,
  resetpwd: Fs,
  noAccount: Hs,
  toRegister: Ls,
  agreeTips: Bs,
  isAgreeTips: Us,
  mobilePlaceholder: Ws,
  oneClicklogin: qs,
  accountLogin: Gs,
  accountLoginTip: Vs,
  accountLoginError: Ys,
  mobileLogin: Ks,
  mobileLoginTip: Qs,
  mobileLoginError: Xs
}, OLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Gs,
  accountLoginError: Ys,
  accountLoginTip: Vs,
  agreeTips: Bs,
  default: SLe,
  isAgreeTips: Us,
  logining: xs,
  mobileLogin: Ks,
  mobileLoginError: Xs,
  mobileLoginTip: Qs,
  mobilePlaceholder: Ws,
  noAccount: Hs,
  oneClicklogin: qs,
  passwordPlaceholder: Rs,
  resetpwd: Fs,
  toRegister: Ls,
  usernamePlaceholder: Es
}, Symbol.toStringTag, { value: "Module" })), Js = "注册中", Zs = "输入账号密码注册", er = "输入手机号验证码注册", or = "请输入账号", tr = "账号不能是纯数字", nr = "请输入密码", sr = "请再次确认密码", rr = "两次输入的密码不一致", ar = "忘记密码", cr = "已有账号", ir = "去登录", lr = "注册代表您同意", dr = "请先阅读并同意协议", ur = "账号注册", pr = "手机号注册", mr = "请输入手机号", wLe = {
  registering: Js,
  usernameRegisterTip: Zs,
  mobileRegisterTip: er,
  usernamePlaceholder: or,
  usernameTips: tr,
  passwordPlaceholder: nr,
  confirmPasswordPlaceholder: sr,
  confirmPasswordError: rr,
  resetpwd: ar,
  haveAccount: cr,
  toLogin: ir,
  registerAgreeTips: lr,
  isAgreeTips: dr,
  usernameRegister: ur,
  mobileRegister: pr,
  mobilePlaceholder: mr
}, jLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: rr,
  confirmPasswordPlaceholder: sr,
  default: wLe,
  haveAccount: cr,
  isAgreeTips: dr,
  mobilePlaceholder: mr,
  mobileRegister: pr,
  mobileRegisterTip: er,
  passwordPlaceholder: nr,
  registerAgreeTips: lr,
  registering: Js,
  resetpwd: ar,
  toLogin: ir,
  usernamePlaceholder: or,
  usernameRegister: ur,
  usernameRegisterTip: Zs,
  usernameTips: tr
}, Symbol.toStringTag, { value: "Module" })), _r = "找回密码", gr = "输入手机号找回密码", hr = "请输入密码", fr = "请再次确认密码", yr = "两次输入的密码不一致", kLe = {
  findPassword: _r,
  findPasswordTip: gr,
  passwordPlaceholder: hr,
  confirmPasswordPlaceholder: fr,
  confirmPasswordError: yr
}, CLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: yr,
  confirmPasswordPlaceholder: fr,
  default: kLe,
  findPassword: _r,
  findPasswordTip: gr,
  passwordPlaceholder: hr
}, Symbol.toStringTag, { value: "Module" })), $r = "实付金额", vr = "帮", br = "付款", Tr = "帮付订单信息", Pr = "共", Sr = "种商品", Or = "该订单已完成", wr = "该订单已关闭", jr = "找朋友帮忙付", MLe = {
  payMoney: $r,
  help: vr,
  pay: br,
  helpPayInfo: Tr,
  common: Pr,
  goods: Sr,
  finish: Or,
  close: wr,
  payGenerously: jr
}, ALe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: wr,
  common: Pr,
  default: MLe,
  finish: Or,
  goods: Sr,
  help: vr,
  helpPayInfo: Tr,
  pay: br,
  payGenerously: jr,
  payMoney: $r
}, Symbol.toStringTag, { value: "Module" })), kr = "实付金额", Cr = "帮付订单信息", Mr = "共", Ar = "种商品", Ir = "该订单已完成", Nr = "该订单已关闭", Dr = "找朋友帮忙付", ILe = {
  payMoney: kr,
  friendPayOrderInfo: Cr,
  common: Mr,
  goods: Ar,
  finish: Ir,
  close: Nr,
  friendPay: Dr
}, NLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: Nr,
  common: Mr,
  default: ILe,
  finish: Ir,
  friendPay: Dr,
  friendPayOrderInfo: Cr,
  goods: Ar,
  payMoney: kr
}, Symbol.toStringTag, { value: "Module" })), zr = "开发环境配置", xr = "API请求地址", Er = "图片服务器地址", Rr = "站点ID（VITE_SITE_ID）", Fr = "请输入站点ID", Hr = "请输入数字", Lr = "最大不能超过", DLe = {
  developTitle: zr,
  baseUrl: xr,
  imgUrl: Er,
  siteId: Rr,
  siteIdPlaceholder: Fr,
  pleaseEnterNumber: Hr,
  maximumCannotExceed: Lr
}, zLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  baseUrl: xr,
  default: DLe,
  developTitle: zr,
  imgUrl: Er,
  maximumCannotExceed: Lr,
  pleaseEnterNumber: Hr,
  siteId: Rr,
  siteIdPlaceholder: Fr
}, Symbol.toStringTag, { value: "Module" })), Br = "支付宝收款码", Ur = "微信收款码", Wr = "添加银行卡", qr = "添加微信收款码", Gr = "添加支付宝收款码", Vr = "尾号", Yr = "银行卡", xLe = {
  alipayAccountNo: Br,
  wechatCode: Ur,
  addBankCard: Wr,
  addWechatCode: qr,
  addAlipayAccount: Gr,
  endNumber: Vr,
  bankCard: Yr
}, ELe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: Gr,
  addBankCard: Wr,
  addWechatCode: qr,
  alipayAccountNo: Br,
  bankCard: Yr,
  default: xLe,
  endNumber: Vr,
  wechatCode: Ur
}, Symbol.toStringTag, { value: "Module" })), Kr = "添加会员账户", Qr = "编辑会员账户", Xr = "添加银行卡", Jr = "请添加持卡人本人的银行卡", Zr = "编辑银行卡", ea = "请编辑持卡人本人的银行卡", oa = "添加支付宝收款码", ta = "请添加已实名的支付宝账号", na = "编辑支付宝收款码", sa = "请编辑已实名的支付宝账号", ra = "添加微信收款码", aa = "请添加已实名的微信账号", ca = "编辑微信收款码", ia = "请编辑已实名的微信账号", la = "持卡人姓名", da = "请输入持卡人姓名", ua = "银行名称", pa = "请输入银行名称", ma = "银行卡号", _a = "请输入银行卡号", ga = "真实姓名", ha = "请输入真实姓名", fa = "支付宝账号", ya = "请输入支付宝账号", $a = "微信账号", va = "请输入微信账号", ba = "请上传支付宝收款码", Ta = "请上传微信收款码", Pa = "确定要删除该账号吗？", RLe = {
  addAccountTitle: Kr,
  editAccountTitle: Qr,
  addBankCard: Xr,
  addBankCardTips: Jr,
  editBankCard: Zr,
  editBankCardTips: ea,
  addAlipayAccount: oa,
  addAlipayAccountTips: ta,
  editAlipayAccount: na,
  editAlipayAccountTips: sa,
  addWechatCodeAccount: ra,
  addWechatCodeAccountTips: aa,
  editWechatCodeAccount: ca,
  editWechatCodeAccountTips: ia,
  bankRealname: la,
  bankRealnamePlaceholder: da,
  bankName: ua,
  bankNamePlaceholder: pa,
  bankAccountNo: ma,
  bankAccountNoPlaceholder: _a,
  alipayRealname: ga,
  alipayRealnamePlaceholder: ha,
  alipayAccountNo: fa,
  alipayAccountNoPlaceholder: ya,
  wechatCodeAccountNo: $a,
  wechatCodeAccountNoPlaceholder: va,
  alipayAccountImgPlaceholder: ba,
  wechatCodeAccountImgPlaceholder: Ta,
  deleteConfirm: Pa
}, FLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAccountTitle: Kr,
  addAlipayAccount: oa,
  addAlipayAccountTips: ta,
  addBankCard: Xr,
  addBankCardTips: Jr,
  addWechatCodeAccount: ra,
  addWechatCodeAccountTips: aa,
  alipayAccountImgPlaceholder: ba,
  alipayAccountNo: fa,
  alipayAccountNoPlaceholder: ya,
  alipayRealname: ga,
  alipayRealnamePlaceholder: ha,
  bankAccountNo: ma,
  bankAccountNoPlaceholder: _a,
  bankName: ua,
  bankNamePlaceholder: pa,
  bankRealname: la,
  bankRealnamePlaceholder: da,
  default: RLe,
  deleteConfirm: Pa,
  editAccountTitle: Qr,
  editAlipayAccount: na,
  editAlipayAccountTips: sa,
  editBankCard: Zr,
  editBankCardTips: ea,
  editWechatCodeAccount: ca,
  editWechatCodeAccountTips: ia,
  wechatCodeAccountImgPlaceholder: Ta,
  wechatCodeAccountNo: $a,
  wechatCodeAccountNoPlaceholder: va
}, Symbol.toStringTag, { value: "Module" })), Sa = "快递地址", Oa = "同城配送地址", wa = "新建收货地址", HLe = {
  address: Sa,
  locationAddress: Oa,
  createAddress: wa,
  default: "默认"
}, LLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Sa,
  createAddress: wa,
  default: HLe,
  locationAddress: Oa
}, Symbol.toStringTag, { value: "Module" })), ja = "收货人", ka = "请输入收货人姓名", Ca = "手机号码", Ma = "请输入手机号码", Aa = "选择地区", Ia = "请选择地区", Na = "详细地址", Da = "请填写详细地址", za = "设为默认地址", xa = "请选择地址", BLe = {
  name: ja,
  namePlaceholder: ka,
  mobile: Ca,
  mobilePlaceholder: Ma,
  selectArea: Aa,
  selectAreaPlaceholder: Ia,
  address: Na,
  addressPlaceholder: Da,
  defaultAddress: za,
  selectAddressPlaceholder: xa
}, ULe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Na,
  addressPlaceholder: Da,
  default: BLe,
  defaultAddress: za,
  mobile: Ca,
  mobilePlaceholder: Ma,
  name: ja,
  namePlaceholder: ka,
  selectAddressPlaceholder: xa,
  selectArea: Aa,
  selectAreaPlaceholder: Ia
}, Symbol.toStringTag, { value: "Module" })), Ea = "立即提现", Ra = "余额明细", Fa = "提现到", Ha = "请选择提现方式", La = "微信默认钱包", Ba = "提现金额", Ua = "可提现余额", Wa = "全部提现", qa = "最小提现金额为", Ga = "手续费为", Va = "提现记录", Ya = "提现至微信零钱", Ka = "提现至微信零钱", Qa = "提现至支付宝", Xa = "请先添加支付宝账号", Ja = "提现至银行卡", Za = "请先添加银行卡", ec = "提现至微信", oc = "请先添加微信号", tc = "支付宝账号", nc = "微信号", sc = "储蓄卡", rc = "异常操作", ac = "没有可用的提现方式", cc = "请输入提现金额", ic = "提现金额格式错误", lc = "提现金额超出可提现金额", dc = "提现金额小于最低提现金额", uc = "更换", pc = "提现设置未开启", mc = "添加", WLe = {
  cashOutNow: Ea,
  balanceDetail: Ra,
  cashOutTo: Fa,
  cashOutTypePlaceholder: Ha,
  wechatpay: La,
  cashOutMoneyTip: Ba,
  money: Ua,
  allTx: Wa,
  minWithdrawal: qa,
  commissionTo: Ga,
  cashOutList: Va,
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
  debitCard: sc,
  abnormalOperation: rc,
  noAvailableCashOutType: ac,
  applyMoneyPlaceholder: cc,
  moneyformatError: ic,
  applyMoneyExceed: lc,
  applyMoneyBelow: dc,
  replace: uc,
  isOpenApply: pc,
  toAdd: mc
}, qLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOperation: rc,
  alipayAccountNo: tc,
  allTx: Wa,
  applyMoneyBelow: dc,
  applyMoneyExceed: lc,
  applyMoneyPlaceholder: cc,
  balanceDetail: Ra,
  cashOutList: Va,
  cashOutMoneyTip: Ba,
  cashOutNow: Ea,
  cashOutTo: Fa,
  cashOutToAlipay: Qa,
  cashOutToAlipayTips: Xa,
  cashOutToBank: Ja,
  cashOutToBankTips: Za,
  cashOutToWechat: Ya,
  cashOutToWechatCode: ec,
  cashOutToWechatCodeTips: oc,
  cashOutToWechatTips: Ka,
  cashOutTypePlaceholder: Ha,
  commissionTo: Ga,
  debitCard: sc,
  default: WLe,
  isOpenApply: pc,
  minWithdrawal: qa,
  money: Ua,
  moneyformatError: ic,
  noAvailableCashOutType: ac,
  replace: uc,
  toAdd: mc,
  wechatCodeAccountNo: nc,
  wechatpay: La
}, Symbol.toStringTag, { value: "Module" })), _c = "我的余额", gc = "充值", hc = "提现", fc = "余额明细", yc = "账户余额 (元)", $c = "余额 (元)", vc = "可提现余额 (元)", bc = "可用余额", Tc = "元", Pc = "充值记录", GLe = {
  balanceInfo: _c,
  recharge: gc,
  cashOut: hc,
  balanceDetail: fc,
  accountBalance: yc,
  balance: $c,
  money: vc,
  availableBalance: bc,
  yuan: Tc,
  rechargeRecord: Pc
}, VLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: yc,
  availableBalance: bc,
  balance: $c,
  balanceDetail: fc,
  balanceInfo: _c,
  cashOut: hc,
  default: GLe,
  money: vc,
  recharge: gc,
  rechargeRecord: Pc,
  yuan: Tc
}, Symbol.toStringTag, { value: "Module" })), Sc = "申请时间", Oc = "审核中，请耐心等待...", wc = "转账中，请耐心等待...", jc = "已转账，请及时查收", kc = "提现已取消", Cc = "余额记录", Mc = "佣金记录", Ac = "暂无提现记录", Ic = "暂无佣金记录", Nc = "提现方式：", YLe = {
  applyTime: Sc,
  toBeReviewed: Oc,
  toBeTransfer: wc,
  transfer: jc,
  cancelApply: kc,
  balanceDetail: Cc,
  commissionDetail: Mc,
  emptyTip: Ac,
  commissemptyTip: Ic,
  rechargeType: Nc
}, KLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: Sc,
  balanceDetail: Cc,
  cancelApply: kc,
  commissemptyTip: Ic,
  commissionDetail: Mc,
  default: YLe,
  emptyTip: Ac,
  rechargeType: Nc,
  toBeReviewed: Oc,
  toBeTransfer: wc,
  transfer: jc
}, Symbol.toStringTag, { value: "Module" })), Dc = "当前状态", zc = "提现单号", xc = "手续费", Ec = "申请时间", Rc = "审核时间", Fc = "银行名称", Hc = "收款账号", Lc = "拒绝理由", Bc = "转账方式", Uc = "转账时间", Wc = "付款凭证", qc = "转账补充说明", Gc = "真实姓名", Vc = "持卡人姓名", Yc = "收款码", Kc = "收款方信息", Qc = "转账信息", Xc = "收款方昵称", Jc = "收款方头像", Zc = "转账单号", ei = "提现", oi = "取消提现", QLe = {
  statusName: Dc,
  cashOutNo: zc,
  serviceMoney: xc,
  createTime: Ec,
  auditTime: Rc,
  transferBank: Fc,
  transferAccount: Hc,
  refuseReason: Lc,
  transferTypeName: Bc,
  transferTime: Uc,
  transferVoucher: Wc,
  transferRemark: qc,
  realname: Gc,
  bankRealname: Vc,
  transferCode: Yc,
  proceedsInfo: Kc,
  transferInfo: Qc,
  transferNickname: Xc,
  transferImg: Jc,
  transferNo: Zc,
  cashOutNow: ei,
  cashOutCancel: oi
}, XLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: Rc,
  bankRealname: Vc,
  cashOutCancel: oi,
  cashOutNo: zc,
  cashOutNow: ei,
  createTime: Ec,
  default: QLe,
  proceedsInfo: Kc,
  realname: Gc,
  refuseReason: Lc,
  serviceMoney: xc,
  statusName: Dc,
  transferAccount: Hc,
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
}, Symbol.toStringTag, { value: "Module" })), ti = "充值", ni = "提现", si = "提现", ri = "佣金明细", ai = "当前佣金（元）", ci = "累计佣金（元）", ii = "提现中佣金（元）", li = "可用佣金", di = "元", ui = "我的佣金", JLe = {
  recharge: ti,
  cashOut: ni,
  transferMoney: si,
  commissionDetail: ri,
  accountCommission: ai,
  commission: ci,
  money: ii,
  availableCommission: li,
  yuan: di,
  commissionInfo: ui
}, ZLe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountCommission: ai,
  availableCommission: li,
  cashOut: ni,
  commission: ci,
  commissionDetail: ri,
  commissionInfo: ui,
  default: JLe,
  money: ii,
  recharge: ti,
  transferMoney: si,
  yuan: di
}, Symbol.toStringTag, { value: "Module" })), pi = "余额明细", mi = "佣金明细", _i = "暂无余额明细", gi = "暂无提现明细", hi = "暂无佣金明细", eBe = {
  balanceDetail: pi,
  commissionDetail: mi,
  balanceEmptyTip: _i,
  moneyEmptyTip: gi,
  commissionEmptyTip: hi
}, oBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  balanceDetail: pi,
  balanceEmptyTip: _i,
  commissionDetail: mi,
  commissionEmptyTip: hi,
  default: eBe,
  moneyEmptyTip: gi
}, Symbol.toStringTag, { value: "Module" })), fi = "收货人", yi = "请输入收货人姓名", $i = "手机号码", vi = "请输入手机号码", bi = "收货地址", Ti = "选择地址", Pi = "请选择地址", Si = "楼号门牌", Oi = "详细地址如 1单元101", wi = "请填写门牌号", ji = "设为默认地址", ki = "修改", tBe = {
  name: fi,
  namePlaceholder: yi,
  mobile: $i,
  mobilePlaceholder: vi,
  deliveryAddress: bi,
  selectAddress: Ti,
  selectAddressPlaceholder: Pi,
  address: Si,
  addressPlaceholder: Oi,
  addressError: wi,
  defaultAddress: ji,
  update: ki
}, nBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Si,
  addressError: wi,
  addressPlaceholder: Oi,
  default: tBe,
  defaultAddress: ji,
  deliveryAddress: bi,
  mobile: $i,
  mobilePlaceholder: vi,
  name: fi,
  namePlaceholder: yi,
  selectAddress: Ti,
  selectAddressPlaceholder: Pi,
  update: ki
}, Symbol.toStringTag, { value: "Module" })), Ci = "昵称", Mi = "性别", Ai = "手机号", Ii = "生日", Ni = "未知", Di = "头像", zi = "更换头像", xi = "修改昵称", Ei = "男", Ri = "女", sBe = {
  nickname: Ci,
  sex: Mi,
  mobile: Ai,
  birthday: Ii,
  unknown: Ni,
  headimg: Di,
  updateHeadimg: zi,
  updateNickname: xi,
  man: Ei,
  woman: Ri
}, rBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  birthday: Ii,
  default: sBe,
  headimg: Di,
  man: Ei,
  mobile: Ai,
  nickname: Ci,
  sex: Mi,
  unknown: Ni,
  updateHeadimg: zi,
  updateNickname: xi,
  woman: Ri
}, Symbol.toStringTag, { value: "Module" })), Fi = "充值记录", Hi = "暂无充值记录", aBe = {
  rechargeRecord: Fi,
  emptyTip: Hi
}, cBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: aBe,
  emptyTip: Hi,
  rechargeRecord: Fi
}, Symbol.toStringTag, { value: "Module" })), Li = "订单编号", Bi = "创建时间", iBe = {
  orderNo: Li,
  createTime: Bi
}, lBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: Bi,
  default: iBe,
  orderNo: Li
}, Symbol.toStringTag, { value: "Module" })), Ui = "充值", Wi = "提现", qi = "余额明细", Gi = "账户余额（元）", Vi = "余额（元）", Yi = "可提现余额（元）", Ki = "可用余额", Qi = "元", dBe = {
  recharge: Ui,
  cashOut: Wi,
  balanceDetail: qi,
  accountBalance: Gi,
  balance: Vi,
  money: Yi,
  availableBalance: Ki,
  yuan: Qi
}, uBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: Gi,
  availableBalance: Ki,
  balance: Vi,
  balanceDetail: qi,
  cashOut: Wi,
  default: dBe,
  money: Yi,
  recharge: Ui,
  yuan: Qi
}, Symbol.toStringTag, { value: "Module" })), Xi = "个人设置", Ji = "切换语言", Zi = "版本号", el = "退出登录", pBe = {
  personalSettings: Xi,
  switchLang: Ji,
  version: Zi,
  logout: el
}, mBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pBe,
  logout: el,
  personalSettings: Xi,
  switchLang: Ji,
  version: Zi
}, Symbol.toStringTag, { value: "Module" })), ol = "文章详情", tl = "摘要", nl = "正在加载", _Be = {
  detail: ol,
  abstract: tl,
  loadingText: nl
}, gBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abstract: tl,
  default: _Be,
  detail: ol,
  loadingText: nl
}, Symbol.toStringTag, { value: "Module" })), sl = "文章列表", rl = "~ 暂无数据 ~", al = "全部", cl = "-- 到底了 --", il = "请输入搜索关键词", hBe = {
  list: sl,
  noData: rl,
  all: al,
  end: cl,
  searchPlaceholder: il
}, fBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: al,
  default: hBe,
  end: cl,
  list: sl,
  noData: rl,
  searchPlaceholder: il
}, Symbol.toStringTag, { value: "Module" })), yBe = {}, $Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yBe
}, Symbol.toStringTag, { value: "Module" })), ll = "发起助力", dl = "最高省", vBe = {
  fqzl: ll,
  zgs: dl
}, bBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vBe,
  fqzl: ll,
  zgs: dl
}, Symbol.toStringTag, { value: "Module" })), ul = "订单号", pl = "实付款", ml = "关闭订单", _l = "确认收货", gl = "去支付", hl = "详情", fl = "支付流水号", yl = "创建时间", $l = "配送方式", vl = "支付方式", bl = "支付时间", Tl = "商品金额", Pl = "配送费用", Sl = "实付金额", Ol = "评价", wl = "查看评价", jl = "首页", kl = "优惠金额", Cl = "查看物流", Ml = "复制", Al = "详细信息", Il = "的帮付", Nl = "用户备注", TBe = {
  orderNo: ul,
  actualPayment: pl,
  orderClose: ml,
  orderFinish: _l,
  topay: gl,
  orderDetail: hl,
  orderTradeNo: fl,
  createTime: yl,
  deliveryType: $l,
  payTypeName: vl,
  payTime: bl,
  goodsMoney: Tl,
  deliveryMoney: Pl,
  orderMoney: Sl,
  evaluate: Ol,
  selectedEvaluate: wl,
  index: jl,
  discountMoney: kl,
  logisticsTracking: Cl,
  copy: Ml,
  detailedInformation: Al,
  helpPay: Il,
  memberRemark: Nl
}, PBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: pl,
  copy: Ml,
  createTime: yl,
  default: TBe,
  deliveryMoney: Pl,
  deliveryType: $l,
  detailedInformation: Al,
  discountMoney: kl,
  evaluate: Ol,
  goodsMoney: Tl,
  helpPay: Il,
  index: jl,
  logisticsTracking: Cl,
  memberRemark: Nl,
  orderClose: ml,
  orderDetail: hl,
  orderFinish: _l,
  orderMoney: Sl,
  orderNo: ul,
  orderTradeNo: fl,
  payTime: bl,
  payTypeName: vl,
  selectedEvaluate: wl,
  topay: gl
}, Symbol.toStringTag, { value: "Module" })), Dl = "暂无收货地址，请先创建地址", zl = "新增收货地址", xl = "选择地址", El = "评价", Rl = "元", Fl = "待支付", Hl = "剩余时间", Ll = "含物流运输服务", Bl = "查看评价", Ul = "关闭订单", Wl = "确认收货", ql = "支付", Gl = "配送方式", Vl = "下单时间", SBe = {
  emptyAddress: Dl,
  addAddress: zl,
  selectAddress: xl,
  evaluate: El,
  money: Rl,
  pendingPayment: Fl,
  pendingPaymentTips: Hl,
  service: Ll,
  selectedEvaluate: Bl,
  orderClose: Ul,
  orderFinish: Wl,
  topay: ql,
  deliveryType: Gl,
  createTime: Vl
}, OBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: zl,
  createTime: Vl,
  default: SBe,
  deliveryType: Gl,
  emptyAddress: Dl,
  evaluate: El,
  money: Rl,
  orderClose: Ul,
  orderFinish: Wl,
  pendingPayment: Fl,
  pendingPaymentTips: Hl,
  selectAddress: xl,
  selectedEvaluate: Bl,
  service: Ll,
  topay: ql
}, Symbol.toStringTag, { value: "Module" })), Yl = "订单号", Kl = "实付款", Ql = "关闭订单", Xl = "确认收货", Jl = "支付", Zl = "详情", ed = "评价", od = "暂无订单", td = "暂无收货地址，请先创建地址", nd = "换一换", sd = "活动说明", rd = "该商品起购", ad = "件", cd = "该商品每人限购", id = "该商品单次限购", ld = "商品库存不足", dd = "件，超过按", ud = "购买", pd = "限购", md = "一键购买", _d = "我知道了", wBe = {
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
  activityInstructions: sd,
  goodsLimitThree: rd,
  piece: ad,
  goodsLimitTwo: cd,
  goodsLimitOne: id,
  stockNotEnough: ld,
  limitPlaceholderTwo: dd,
  limitPlaceholderThree: ud,
  limitPlaceholderOne: pd,
  buyWithOneClick: md,
  know: _d
}, jBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: sd,
  actualPayment: Kl,
  buyWithOneClick: md,
  changeIt: nd,
  default: wBe,
  emptyAddress: td,
  evaluate: ed,
  goodsLimitOne: id,
  goodsLimitThree: rd,
  goodsLimitTwo: cd,
  know: _d,
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
}, Symbol.toStringTag, { value: "Module" })), gd = "退货详情", hd = "极速退款成功", fd = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", yd = "退款方式", $d = "退款金额", vd = "退款原因", bd = "拒绝原因", Td = "退款编号", Pd = "申请时间", Sd = "退款说明", Od = "协商记录", wd = "查看", jd = "取消退款", kd = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", Cd = "首页", kBe = {
  refundDetail: gd,
  fastRefundSuccessful: hd,
  refundInfo: fd,
  refundType: yd,
  refundMoney: $d,
  refundCause: vd,
  reasonRefusal: bd,
  refundNo: Td,
  createTime: Pd,
  createExplain: Sd,
  record: Od,
  check: wd,
  refundApply: jd,
  cancelRefundContent: kd,
  index: Cd
}, CBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: kd,
  check: wd,
  createExplain: Sd,
  createTime: Pd,
  default: kBe,
  fastRefundSuccessful: hd,
  index: Cd,
  reasonRefusal: bd,
  record: Od,
  refundApply: jd,
  refundCause: vd,
  refundDetail: gd,
  refundInfo: fd,
  refundMoney: $d,
  refundNo: Td,
  refundType: yd
}, Symbol.toStringTag, { value: "Module" })), Md = "退款编号", Ad = "退款金额", Id = "取消退款", Nd = "退款进度", Dd = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", MBe = {
  refundNo: Md,
  refundMoney: Ad,
  refundApply: Id,
  refund: Nd,
  cancelRefundContent: Dd
}, ABe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: Dd,
  default: MBe,
  refund: Nd,
  refundApply: Id,
  refundMoney: Ad,
  refundNo: Md
}, Symbol.toStringTag, { value: "Module" })), IBe = {}, NBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IBe
}, Symbol.toStringTag, { value: "Module" })), zd = "您已的入驻申请已提交，请等待审核！", xd = "您已是代理商，即将跳转代理商中心!", Ed = "姓名", Rd = "请输入您的姓名", Fd = "手机号", Hd = "请输入您的手机号", Ld = "代理类型", Bd = "省级代代理", Ud = "市级代理", Wd = "区县代理", qd = "申请加入的区域", Gd = "请输入您想代理的区域", Vd = "您是否有相关从业或创业经验", Yd = "有", Kd = "没有", Qd = "您是否有", Xd = "资源", Jd = "您的投资预算", Zd = "请输入您的投资预算", eu = "请留意陌生号码或有微信添加请及时沟通，24小时内我司会与您联系！", ou = "提交", DBe = {
  wait_check: zd,
  yes_agent: xd,
  name: Ed,
  plese_input_name: Rd,
  mobile: Fd,
  plese_input_mobile: Hd,
  agent_type: Ld,
  provincial_agent: Bd,
  city_agent: Ud,
  area_agent: Wd,
  jion_area: qd,
  plese_input_agent: Gd,
  agented: Vd,
  yes: Yd,
  no: Kd,
  you_yesno: Qd,
  resource: Xd,
  budget: Jd,
  plese_input_budget: Zd,
  wait_contact: eu,
  submit: ou
}, zBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  agent_type: Ld,
  agented: Vd,
  area_agent: Wd,
  budget: Jd,
  city_agent: Ud,
  default: DBe,
  jion_area: qd,
  mobile: Fd,
  name: Ed,
  no: Kd,
  plese_input_agent: Gd,
  plese_input_budget: Zd,
  plese_input_mobile: Hd,
  plese_input_name: Rd,
  provincial_agent: Bd,
  resource: Xd,
  submit: ou,
  wait_check: zd,
  wait_contact: eu,
  yes: Yd,
  yes_agent: xd,
  you_yesno: Qd
}, Symbol.toStringTag, { value: "Module" })), tu = "账号信息", nu = "账号名称：", su = "真实姓名：", ru = "最多授权管理：", au = "营业执照：", cu = "分佣金比例：", iu = "代理等级：", lu = "区县代理", du = "城市代理", uu = "省级代理", xBe = {
  account: tu,
  account_name: nu,
  real_name: su,
  max_auth_manger: ru,
  license: au,
  commsion_rate: cu,
  agent_level: iu,
  area_agent: lu,
  city_agent: du,
  province: uu
}, EBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  account: tu,
  account_name: nu,
  agent_level: iu,
  area_agent: lu,
  city_agent: du,
  commsion_rate: cu,
  default: xBe,
  license: au,
  max_auth_manger: ru,
  province: uu,
  real_name: su
}, Symbol.toStringTag, { value: "Module" })), pu = "收益统计：", mu = "项目收益", _u = "总收益：", gu = "共", hu = "笔订单", fu = "订单号：", yu = "查看详情", $u = "订单收益", vu = "暂无收益明细", bu = "分佣明细", RBe = {
  commsion_total: pu,
  goods_commsion: mu,
  all_commsion: _u,
  total: gu,
  orders: hu,
  order_number: fu,
  look_detail: yu,
  order_commsion: $u,
  no_commsion_detail: vu,
  commsion_page_title: bu
}, FBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all_commsion: _u,
  commsion_page_title: bu,
  commsion_total: pu,
  default: RBe,
  goods_commsion: mu,
  look_detail: yu,
  no_commsion_detail: vu,
  order_commsion: $u,
  order_number: fu,
  orders: hu,
  total: gu
}, Symbol.toStringTag, { value: "Module" })), HBe = {}, LBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HBe
}, Symbol.toStringTag, { value: "Module" })), Tu = "可提现金额", Pu = "总金额 (不含手续费)", Su = "未入账", Ou = "绑定", wu = "整合自己的", ju = "资源,获取分润", ku = "邀请TA", Cu = "绑定业务员", Mu = "招揽人才,为自己拓宽渠道", Au = "绑定渠道商", Iu = "直招渠道,获利更多", Nu = "订单管理", Du = "待服务", zu = "接单", xu = "出发", Eu = "师傅", Ru = "到达", Fu = "服务中", Hu = "已完成", Lu = "其他功能", Bu = "账号设置", Uu = "管理", Wu = "佣金信息", qu = "提现申请", Gu = "代理商中心", Vu = "您还不是代理商", BBe = {
  commsion_money: Tu,
  total_money: Pu,
  no_commsion: Su,
  bind: Ou,
  avage_self: wu,
  get_commsion: ju,
  invitation: ku,
  bind_salesman: Cu,
  job_man: Mu,
  bind_channel: Au,
  more: Iu,
  order_manger: Nu,
  wait_service: Du,
  talking_order: zu,
  go_out: xu,
  technician_name: Eu,
  rech: Ru,
  service_ing: Fu,
  complate: Hu,
  other_tools: Lu,
  account_config: Bu,
  manger: Uu,
  commsion_info: Wu,
  apply_commsion: qu,
  channel_center: Gu,
  no_channel: Vu
}, UBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  account_config: Bu,
  apply_commsion: qu,
  avage_self: wu,
  bind: Ou,
  bind_channel: Au,
  bind_salesman: Cu,
  channel_center: Gu,
  commsion_info: Wu,
  commsion_money: Tu,
  complate: Hu,
  default: BBe,
  get_commsion: ju,
  go_out: xu,
  invitation: ku,
  job_man: Mu,
  manger: Uu,
  more: Iu,
  no_channel: Vu,
  no_commsion: Su,
  order_manger: Nu,
  other_tools: Lu,
  rech: Ru,
  service_ing: Fu,
  talking_order: zu,
  technician_name: Eu,
  total_money: Pu,
  wait_service: Du
}, Symbol.toStringTag, { value: "Module" })), Yu = "暂无未接订单", Ku = "待接单", Qu = "订单号：", Xu = "师傅", Ju = "预约时间：", Zu = "总计：", ep = "暂无未服务订单", op = "已接单", tp = "服务中", np = "暂无服务中的订单", sp = "已完成", rp = "暂无已完成订单", ap = "待服务", WBe = {
  no_order: Yu,
  wait_order: Ku,
  order_number: Qu,
  technician_name: Xu,
  talk_time: Ju,
  total: Zu,
  no_wait_order: ep,
  talked_order: op,
  service_ing: tp,
  no_serviceing_order: np,
  complate: sp,
  no_complate_order: rp,
  wait_service: ap
}, qBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  complate: sp,
  default: WBe,
  no_complate_order: rp,
  no_order: Yu,
  no_serviceing_order: np,
  no_wait_order: ep,
  order_number: Qu,
  service_ing: tp,
  talk_time: Ju,
  talked_order: op,
  technician_name: Xu,
  total: Zu,
  wait_order: Ku,
  wait_service: ap
}, Symbol.toStringTag, { value: "Module" })), cp = "未接单", ip = "待出发", lp = "待到达", dp = "待服务", up = "服务中", pp = "服务完成", mp = "师傅", _p = "接单", gp = "出发", hp = "到达", fp = "开始服务", yp = "服务完成", $p = "服务内容", vp = "服务时长：", bp = "分钟", Tp = "下单人", Pp = "联系方式", Sp = "服务地址", Op = "下单时间", wp = "服务时间", jp = "车费详情", kp = "出租车 全程", Cp = "公里", Mp = "出行费用", Ap = "项目费用", Ip = "支付方式", Np = "微信支付", Dp = "支付宝支付", zp = "余额支付", xp = "线下支付", Ep = "总计：", Rp = "订单编号：", Fp = "确认完成", Hp = "拍照打卡：", Lp = "当前位置:", Bp = "取消", Up = "确认到达", Wp = "上传完成照片", qp = "上传目的地照片", Gp = "位置更新中请稍候...", Vp = "获取位置失败", Yp = "确认接收订单", Kp = "您确定要接收这个订单吗", Qp = "接单成功", Xp = "已成功出发", Jp = "确认拒绝订单", Zp = "您确定要拒绝这个订单吗？", em = "已拒绝该订单", om = "到达打卡成功", tm = "已开启录音,现在开始录音", nm = "录音停止成功", sm = "录音停止成功", GBe = {
  wait_talk_order: cp,
  wait_go_out: ip,
  wait_rech: lp,
  wait_service: dp,
  service_ing: up,
  service_complage: pp,
  technician_name: mp,
  talk_order: _p,
  go_out: gp,
  rech: hp,
  start_service: fp,
  service_complate: yp,
  service_content: $p,
  service_du: vp,
  mit: bp,
  order_preson: Tp,
  contact: Pp,
  service_address: Sp,
  create_order_time: Op,
  service_time: wp,
  car_money_detail: jp,
  taix_mill: kp,
  kilometer: Cp,
  travel_money: Mp,
  goods_money: Ap,
  pay_type: Ip,
  wechatpay: Np,
  alipay: Dp,
  blancepay: zp,
  offlinepay: xp,
  total: Ep,
  order_number: Rp,
  comfirm_complate: Fp,
  take_photo: Hp,
  location: Lp,
  cacnel: Bp,
  confirm_rech: Up,
  upload_photo: Wp,
  uploat_complate_addres: qp,
  update_location: Gp,
  location_fail: Vp,
  confirm_rech_order: Yp,
  confirm_rech_order_why: Kp,
  rech_order_success: Qp,
  success_out: Xp,
  refuse_order: Jp,
  confirm_refuse_order: Zp,
  refused_order: em,
  rech_success: om,
  recode_start: tm,
  recode_stop: nm,
  recode_stop_success: sm
}, VBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  alipay: Dp,
  blancepay: zp,
  cacnel: Bp,
  car_money_detail: jp,
  comfirm_complate: Fp,
  confirm_rech: Up,
  confirm_rech_order: Yp,
  confirm_rech_order_why: Kp,
  confirm_refuse_order: Zp,
  contact: Pp,
  create_order_time: Op,
  default: GBe,
  go_out: gp,
  goods_money: Ap,
  kilometer: Cp,
  location: Lp,
  location_fail: Vp,
  mit: bp,
  offlinepay: xp,
  order_number: Rp,
  order_preson: Tp,
  pay_type: Ip,
  rech: hp,
  rech_order_success: Qp,
  rech_success: om,
  recode_start: tm,
  recode_stop: nm,
  recode_stop_success: sm,
  refuse_order: Jp,
  refused_order: em,
  service_address: Sp,
  service_complage: pp,
  service_complate: yp,
  service_content: $p,
  service_du: vp,
  service_ing: up,
  service_time: wp,
  start_service: fp,
  success_out: Xp,
  taix_mill: kp,
  take_photo: Hp,
  talk_order: _p,
  technician_name: mp,
  total: Ep,
  travel_money: Mp,
  update_location: Gp,
  upload_photo: Wp,
  uploat_complate_addres: qp,
  wait_go_out: ip,
  wait_rech: lp,
  wait_service: dp,
  wait_talk_order: cp,
  wechatpay: Np
}, Symbol.toStringTag, { value: "Module" })), rm = "可提现服务费(元)", am = "可提现车费(元)", cm = "每月提现不限次数", im = "总收入(元)", lm = "已提现(元)", dm = "未入账(元)", um = "提现记录", pm = "代理商佣金提现", YBe = {
  apply_commsion_service: rm,
  apply_commsion_car: am,
  month_no: cm,
  total_commsion: im,
  appled_commsion: lm,
  no_commsion: dm,
  commsionend: um,
  agent_channl_apply: pm
}, KBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  agent_channl_apply: pm,
  appled_commsion: lm,
  apply_commsion_car: am,
  apply_commsion_service: rm,
  commsionend: um,
  default: YBe,
  month_no: cm,
  no_commsion: dm,
  total_commsion: im
}, Symbol.toStringTag, { value: "Module" })), mm = "已认证", _m = "申请中", gm = "已授权", hm = "已驳回", fm = "所属代理商：", ym = "入驻时间：", $m = "编辑", vm = "暂无", bm = "管理", Tm = "暂未开放代理修改", QBe = {
  certified: mm,
  apply_ing: _m,
  authed: gm,
  rejected: hm,
  agent_technician: fm,
  jion_time: ym,
  edit: $m,
  nodata: vm,
  manger: bm,
  no_open: Tm
}, XBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  agent_technician: fm,
  apply_ing: _m,
  authed: gm,
  certified: mm,
  default: QBe,
  edit: $m,
  jion_time: ym,
  manger: bm,
  no_open: Tm,
  nodata: vm,
  rejected: hm
}, Symbol.toStringTag, { value: "Module" })), Pm = "文章详情", Sm = "摘要", Om = "正在加载", JBe = {
  detail: Pm,
  abstract: Sm,
  loadingText: Om
}, ZBe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abstract: Sm,
  default: JBe,
  detail: Pm,
  loadingText: Om
}, Symbol.toStringTag, { value: "Module" })), wm = "文章列表", jm = "~ 暂无数据 ~", km = "全部", Cm = "-- 到底了 --", Mm = "请输入搜索关键词", e0e = {
  list: wm,
  noData: jm,
  all: km,
  end: Cm,
  searchPlaceholder: Mm
}, o0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: km,
  default: e0e,
  end: Cm,
  list: wm,
  noData: jm,
  searchPlaceholder: Mm
}, Symbol.toStringTag, { value: "Module" })), Am = "暂无协议", t0e = {
  nodata: Am
}, n0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: t0e,
  nodata: Am
}, Symbol.toStringTag, { value: "Module" })), Im = "绑定", Nm = "输入手机号动态码绑定", Dm = "绑定中", zm = "一键绑定", xm = "手机号快捷登录", s0e = {
  bind: Im,
  bindMobileTip: Nm,
  binding: Dm,
  weixinUserAuth: zm,
  mobileQuickLogin: xm
}, r0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: Im,
  bindMobileTip: Nm,
  binding: Dm,
  default: s0e,
  mobileQuickLogin: xm,
  weixinUserAuth: zm
}, Symbol.toStringTag, { value: "Module" })), Em = "快捷登录/注册", Rm = "登录", Fm = "其他方式登录", Hm = "账号密码登录", Lm = "手机号登录", Bm = "其他手机号登录", Um = "账号被锁定", a0e = {
  quickLoginOrLogout: Em,
  login: Rm,
  otherLogin: Fm,
  accountLogin: Hm,
  mobileLogin: Lm,
  otherMobileLogin: Bm,
  memberLock: Um
}, c0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Hm,
  default: a0e,
  login: Rm,
  memberLock: Um,
  mobileLogin: Lm,
  otherLogin: Fm,
  otherMobileLogin: Bm,
  quickLoginOrLogout: Em
}, Symbol.toStringTag, { value: "Module" })), Wm = "登录中", qm = "请输入账号", Gm = "请输入密码", Vm = "忘记密码", Ym = "还没有账号", Km = "去注册", Qm = "登录代表您同意", Xm = "请先阅读并同意协议", Jm = "请输入手机号", Zm = "快捷登录", e_ = "账号密码登录", o_ = "输入账号密码登录", t_ = "商家未开启账号密码登录", n_ = "手机号登录", s_ = "输入手机号验证码登录", r_ = "商家未开启手机号登录", i0e = {
  logining: Wm,
  usernamePlaceholder: qm,
  passwordPlaceholder: Gm,
  resetpwd: Vm,
  noAccount: Ym,
  toRegister: Km,
  agreeTips: Qm,
  isAgreeTips: Xm,
  mobilePlaceholder: Jm,
  oneClicklogin: Zm,
  accountLogin: e_,
  accountLoginTip: o_,
  accountLoginError: t_,
  mobileLogin: n_,
  mobileLoginTip: s_,
  mobileLoginError: r_
}, l0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: e_,
  accountLoginError: t_,
  accountLoginTip: o_,
  agreeTips: Qm,
  default: i0e,
  isAgreeTips: Xm,
  logining: Wm,
  mobileLogin: n_,
  mobileLoginError: r_,
  mobileLoginTip: s_,
  mobilePlaceholder: Jm,
  noAccount: Ym,
  oneClicklogin: Zm,
  passwordPlaceholder: Gm,
  resetpwd: Vm,
  toRegister: Km,
  usernamePlaceholder: qm
}, Symbol.toStringTag, { value: "Module" })), a_ = "注册中", c_ = "输入账号密码注册", i_ = "输入手机号验证码注册", l_ = "请输入账号", d_ = "账号不能是纯数字", u_ = "请输入密码", p_ = "请再次确认密码", m_ = "两次输入的密码不一致", __ = "忘记密码", g_ = "已有账号", h_ = "去登录", f_ = "注册代表您同意", y_ = "请先阅读并同意协议", $_ = "账号注册", v_ = "手机号注册", b_ = "请输入手机号", d0e = {
  registering: a_,
  usernameRegisterTip: c_,
  mobileRegisterTip: i_,
  usernamePlaceholder: l_,
  usernameTips: d_,
  passwordPlaceholder: u_,
  confirmPasswordPlaceholder: p_,
  confirmPasswordError: m_,
  resetpwd: __,
  haveAccount: g_,
  toLogin: h_,
  registerAgreeTips: f_,
  isAgreeTips: y_,
  usernameRegister: $_,
  mobileRegister: v_,
  mobilePlaceholder: b_
}, u0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: m_,
  confirmPasswordPlaceholder: p_,
  default: d0e,
  haveAccount: g_,
  isAgreeTips: y_,
  mobilePlaceholder: b_,
  mobileRegister: v_,
  mobileRegisterTip: i_,
  passwordPlaceholder: u_,
  registerAgreeTips: f_,
  registering: a_,
  resetpwd: __,
  toLogin: h_,
  usernamePlaceholder: l_,
  usernameRegister: $_,
  usernameRegisterTip: c_,
  usernameTips: d_
}, Symbol.toStringTag, { value: "Module" })), T_ = "找回密码", P_ = "输入手机号找回密码", S_ = "请输入密码", O_ = "请再次确认密码", w_ = "两次输入的密码不一致", p0e = {
  findPassword: T_,
  findPasswordTip: P_,
  passwordPlaceholder: S_,
  confirmPasswordPlaceholder: O_,
  confirmPasswordError: w_
}, m0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: w_,
  confirmPasswordPlaceholder: O_,
  default: p0e,
  findPassword: T_,
  findPasswordTip: P_,
  passwordPlaceholder: S_
}, Symbol.toStringTag, { value: "Module" })), j_ = "您已的入驻申请已提交，请等待审核！", k_ = "您已是渠道商，请登录渠道商中心!", C_ = "姓名", M_ = "请输入您的姓名", A_ = "手机号", I_ = "请输入您的手机号", N_ = "请留意陌生号码或有微信添加请及时沟通，24小时内我司会与您联系！", D_ = "提交", z_ = "申请已提交，请等候我们联系您！", _0e = {
  apply_register_success: j_,
  channeled: k_,
  name: C_,
  plese_input_name: M_,
  mobile: A_,
  plese_input_mobile: I_,
  tips: N_,
  confirm: D_,
  confirm_success_tips: z_
}, g0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  apply_register_success: j_,
  channeled: k_,
  confirm: D_,
  confirm_success_tips: z_,
  default: _0e,
  mobile: A_,
  name: C_,
  plese_input_mobile: I_,
  plese_input_name: M_,
  tips: N_
}, Symbol.toStringTag, { value: "Module" })), x_ = "总业绩", E_ = "(元)", R_ = "(单)", F_ = "订单量", H_ = "佣金总额", L_ = "佣金是订单金额，扣除优惠金额及车费后按比例计算。", B_ = "渠道推广码", U_ = "在", W_ = "小时内客户扫码下单将获得", q_ = "邀请TA", G_ = "推广订单", V_ = "暂无订单", Y_ = "订单编号", K_ = "项目名称", Q_ = "服务", X_ = "师傅", J_ = "订单金额(含车费:", Z_ = "推广佣金", eg = "渠道商中心", h0e = {
  total_performance: x_,
  cny: E_,
  order: R_,
  order_num: F_,
  commsion_total: H_,
  commsion_tips: L_,
  share_code: B_,
  at_tips: U_,
  hours_tips: W_,
  invitation: q_,
  share_order: G_,
  no_order: V_,
  order_number: Y_,
  goods_name: K_,
  service: Q_,
  technician_name: X_,
  order_money: J_,
  share_comssion: Z_,
  channel_title: eg
}, f0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  at_tips: U_,
  channel_title: eg,
  cny: E_,
  commsion_tips: L_,
  commsion_total: H_,
  default: h0e,
  goods_name: K_,
  hours_tips: W_,
  invitation: q_,
  no_order: V_,
  order: R_,
  order_money: J_,
  order_num: F_,
  order_number: Y_,
  service: Q_,
  share_code: B_,
  share_comssion: Z_,
  share_order: G_,
  technician_name: X_,
  total_performance: x_
}, Symbol.toStringTag, { value: "Module" })), og = "当前定位：", tg = "重新定位", ng = "热门城市", sg = "城市切换", y0e = {
  location: og,
  reset_location: tg,
  hot_city: ng,
  city_reset: sg
}, $0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  city_reset: sg,
  default: y0e,
  hot_city: ng,
  location: og,
  reset_location: tg
}, Symbol.toStringTag, { value: "Module" })), rg = "总体满意度", ag = "不满意", cg = "满意", ig = "很满意", lg = "非常满意", dg = "服务项目满意度", ug = "你的评价对我们很重要！", pg = "请选择下方评价标签", mg = "提交", _g = "评价", gg = "评价内容不能为空", v0e = {
  total_satisfied: rg,
  no_satisfied: ag,
  satisfied: cg,
  good_satisfied: ig,
  very_good_satisfied: lg,
  service_satisfied: dg,
  tips: ug,
  select_tags: pg,
  confirm: mg,
  comment_title: _g,
  comment_content_no_empty: gg
}, b0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  comment_content_no_empty: gg,
  comment_title: _g,
  confirm: mg,
  default: v0e,
  good_satisfied: ig,
  no_satisfied: ag,
  satisfied: cg,
  select_tags: pg,
  service_satisfied: dg,
  tips: ug,
  total_satisfied: rg,
  very_good_satisfied: lg
}, Symbol.toStringTag, { value: "Module" })), T0e = {}, P0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: T0e
}, Symbol.toStringTag, { value: "Module" })), S0e = {}, O0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: S0e
}, Symbol.toStringTag, { value: "Module" })), w0e = {}, j0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: w0e
}, Symbol.toStringTag, { value: "Module" })), k0e = {}, C0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: k0e
}, Symbol.toStringTag, { value: "Module" })), M0e = {}, A0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: M0e
}, Symbol.toStringTag, { value: "Module" })), I0e = {}, N0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: I0e
}, Symbol.toStringTag, { value: "Module" })), hg = "总业绩", fg = "订单量", yg = "佣金总额", $g = "邀请", vg = "师傅", bg = "元", Tg = "单", Pg = "合伙人中心", D0e = {
  total_money: hg,
  order_num: fg,
  commsion_total: yg,
  invitation: $g,
  technician_name: vg,
  cny: bg,
  order: Tg,
  page_title: Pg
}, z0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cny: bg,
  commsion_total: yg,
  default: D0e,
  invitation: $g,
  order: Tg,
  order_num: fg,
  page_title: Pg,
  technician_name: vg,
  total_money: hg
}, Symbol.toStringTag, { value: "Module" })), Sg = "请输入话题内容", Og = "请选择分类", wg = "发布动态", jg = "立即发布", kg = "发布规则", Cg = "关闭", Mg = "请输入话题内容", Ag = "上传中", Ig = "视频上传成功", Ng = "发布成功", x0e = {
  placeholdercontent: Sg,
  placeholdercategory: Og,
  add_title: wg,
  book_now: jg,
  rules: kg,
  closed: Cg,
  plese_tips: Mg,
  upload_tips: Ag,
  upload_succes: Ig,
  add_success: Ng
}, E0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add_success: Ng,
  add_title: wg,
  book_now: jg,
  closed: Cg,
  default: x0e,
  placeholdercategory: Og,
  placeholdercontent: Sg,
  plese_tips: Mg,
  rules: kg,
  upload_succes: Ig,
  upload_tips: Ag
}, Symbol.toStringTag, { value: "Module" })), Dg = "浏览", zg = "关注", xg = "已关注", Eg = "暂无评论", Rg = "回复", Fg = "点赞", Hg = "说点什么!", Lg = "发布", Bg = "请输入评论内容", Ug = "不能关注自己", Wg = "关注失败", qg = "取消关注失败", Gg = "取消点赞失败", Vg = "刚刚", Yg = "5分钟前", Kg = "分钟前", Qg = "小时前", Xg = "1天前", R0e = {
  browe: Dg,
  focus: zg,
  focused: xg,
  no_comment: Eg,
  reply: Rg,
  like: Fg,
  say_something: Hg,
  add: Lg,
  placephoder: Bg,
  no_focus_self: Ug,
  focus_fail: Wg,
  cancel_focus_fail: qg,
  cancel_like_fail: Gg,
  just_now: Vg,
  five_minuts_ago: Yg,
  minuts_ago: Kg,
  hous_ago: Qg,
  one_day_ago: Xg
}, F0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Lg,
  browe: Dg,
  cancel_focus_fail: qg,
  cancel_like_fail: Gg,
  default: R0e,
  five_minuts_ago: Yg,
  focus: zg,
  focus_fail: Wg,
  focused: xg,
  hous_ago: Qg,
  just_now: Vg,
  like: Fg,
  minuts_ago: Kg,
  no_comment: Eg,
  no_focus_self: Ug,
  one_day_ago: Xg,
  placephoder: Bg,
  reply: Rg,
  say_something: Hg
}, Symbol.toStringTag, { value: "Module" })), Jg = "浏览", Zg = "关注", eh = "关注成功", oh = "暂无评论", th = "回复", nh = "点赞", sh = "说点什么!", rh = "发布", ah = "请输入评论内容", ch = "不能关注自己", ih = "关注失败", lh = "取消关注失败", dh = "取消点赞失败", uh = "已取消关注", ph = "刚刚", mh = "5分钟前", _h = "分钟前", gh = "小时前", hh = "1天前", fh = "视频", yh = "全部评论", $h = "有爱评论，说点好听的~", H0e = {
  browe: Jg,
  focus: Zg,
  focused: eh,
  no_comment: oh,
  reply: th,
  like: nh,
  say_something: sh,
  add: rh,
  placephoder: ah,
  no_focus_self: ch,
  focus_fail: ih,
  cancel_focus_fail: lh,
  cancel_like_fail: dh,
  cancel_focus_success: uh,
  just_now: ph,
  five_minuts_ago: mh,
  minuts_ago: _h,
  hous_ago: gh,
  one_day_ago: hh,
  video: fh,
  all_comment: yh,
  comment_tips: $h
}, L0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: rh,
  all_comment: yh,
  browe: Jg,
  cancel_focus_fail: lh,
  cancel_focus_success: uh,
  cancel_like_fail: dh,
  comment_tips: $h,
  default: H0e,
  five_minuts_ago: mh,
  focus: Zg,
  focus_fail: ih,
  focused: eh,
  hous_ago: gh,
  just_now: ph,
  like: nh,
  minuts_ago: _h,
  no_comment: oh,
  no_focus_self: ch,
  one_day_ago: hh,
  placephoder: ah,
  reply: th,
  say_something: sh,
  video: fh
}, Symbol.toStringTag, { value: "Module" })), vh = "关注", bh = "已关注", Th = "展开", Ph = "收起", Sh = "评论", Oh = "点赞", wh = "暂无动态", jh = "发布", kh = "发布视频", Ch = "发布图文", Mh = "全部", Ah = "动态", Ih = "普通用户不支持发布", Nh = "动态发布功能已关闭", Dh = "不能关注自己", zh = "关注失败", xh = "取消关注失败", B0e = {
  focus: vh,
  focused: bh,
  expand: Th,
  fold_up: Ph,
  comment: Sh,
  like: Oh,
  no_data: wh,
  add: jh,
  add_video: kh,
  add_content: Ch,
  all: Mh,
  page_title: Ah,
  user_tips: Ih,
  colsed_tips: Nh,
  focus_self_tips: Dh,
  focus_fail: zh,
  cancel_focus_fail: xh
}, U0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: jh,
  add_content: Ch,
  add_video: kh,
  all: Mh,
  cancel_focus_fail: xh,
  colsed_tips: Nh,
  comment: Sh,
  default: B0e,
  expand: Th,
  focus: vh,
  focus_fail: zh,
  focus_self_tips: Dh,
  focused: bh,
  fold_up: Ph,
  like: Oh,
  no_data: wh,
  page_title: Ah,
  user_tips: Ih
}, Symbol.toStringTag, { value: "Module" })), W0e = {}, q0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: W0e
}, Symbol.toStringTag, { value: "Module" })), Eh = "反馈记录", Rh = "问题类型", Fh = "反馈内容", Hh = "请描述您的问题或建议", Lh = "上传凭证", Bh = "最多上传3张图片", Uh = "联系方式", Wh = "请输入联系方式", qh = "请登录后再反馈", Gh = "提交", Vh = "功能建议", Yh = "功能异常", Kh = "体验问题", Qh = "其他", Xh = "投诉", Jh = "问题反馈", Zh = "上传中", ef = "请选择问题类型", of = "请输入反馈内容", tf = "请输入您的联系电话", nf = "提交成功，稍候在反馈记录里查看处理进度", G0e = {
  page_title: Eh,
  ask_type: Rh,
  feadback_center: Fh,
  placecenter: Hh,
  upload: Lh,
  more_tips: Bh,
  contact: Uh,
  place_contact: Wh,
  tips: qh,
  confirm: Gh,
  suggestion: Vh,
  abnormal: Yh,
  ui_abnormal: Kh,
  other: Qh,
  complaint: Xh,
  page_name: Jh,
  upload_ing: Zh,
  select_ask_type: ef,
  fead_content: of,
  mobile_tips: tf,
  confirm_success: nf
}, V0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormal: Yh,
  ask_type: Rh,
  complaint: Xh,
  confirm: Gh,
  confirm_success: nf,
  contact: Uh,
  default: G0e,
  fead_content: of,
  feadback_center: Fh,
  mobile_tips: tf,
  more_tips: Bh,
  other: Qh,
  page_name: Jh,
  page_title: Eh,
  place_contact: Wh,
  placecenter: Hh,
  select_ask_type: ef,
  suggestion: Vh,
  tips: qh,
  ui_abnormal: Kh,
  upload: Lh,
  upload_ing: Zh
}, Symbol.toStringTag, { value: "Module" })), sf = "你的反馈记录", rf = "未处理", af = "反馈时间", cf = "反馈记录", Y0e = {
  you_feadback: sf,
  unprocessed: rf,
  feadback_time: af,
  page_title: cf
}, K0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Y0e,
  feadback_time: af,
  page_title: cf,
  unprocessed: rf,
  you_feadback: sf
}, Symbol.toStringTag, { value: "Module" })), lf = "阅读并同意", df = "服务协议", uf = "支付", pf = "元成为", mf = "佣金详情", _f = "一级比例", gf = "二级比例", hf = "自购比例", ff = "最低提现金额", yf = "成为", $f = "，您可以获得推广用户消费的佣金奖励。", vf = "自购消费的奖励。", bf = "我知道了", Tf = "元", Pf = "分销功能未开启", Sf = "请先阅读并同意协议", Of = "申请成功", Q0e = {
  read: lf,
  service_terms: df,
  pay: uf,
  cnytips: pf,
  commsion_detail: mf,
  one_rate: _f,
  two_rate: gf,
  self_buy: hf,
  min_apply_commsion: ff,
  become: yf,
  share_tips: $f,
  self_rate: vf,
  iknow: bf,
  cny: Tf,
  no_open: Pf,
  frist_igree: Sf,
  apply_success: Of
}, X0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  apply_success: Of,
  become: yf,
  cny: Tf,
  cnytips: pf,
  commsion_detail: mf,
  default: Q0e,
  frist_igree: Sf,
  iknow: bf,
  min_apply_commsion: ff,
  no_open: Pf,
  one_rate: _f,
  pay: uf,
  read: lf,
  self_buy: hf,
  self_rate: vf,
  service_terms: df,
  share_tips: $f,
  two_rate: gf
}, Symbol.toStringTag, { value: "Module" })), wf = "推广码", jf = "可提现金额(元)", kf = "去提现", Cf = "累计佣金(元)", Mf = "提现中(元)", Af = "累计订单(个)", If = "推广人数", Nf = "查看成员", Df = "一级人数", zf = "二级人数", xf = "完成订单", Ef = "查看订单", Rf = "一级订单", Ff = "二级订单", Hf = "分销中心", J0e = {
  share_code: wf,
  can_commsion: jf,
  go_commsion: kf,
  total_commsion: Cf,
  apply_commsion_ing: Mf,
  total_orders: Af,
  share_preson: If,
  look_user: Nf,
  one_prsons: Df,
  two_prsons: zf,
  complate_order: xf,
  look_orders: Ef,
  one_orders: Rf,
  two_orders: Ff,
  page_title: Hf
}, Z0e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  apply_commsion_ing: Mf,
  can_commsion: jf,
  complate_order: xf,
  default: J0e,
  go_commsion: kf,
  look_orders: Ef,
  look_user: Nf,
  one_orders: Rf,
  one_prsons: Df,
  page_title: Hf,
  share_code: wf,
  share_preson: If,
  total_commsion: Cf,
  total_orders: Af,
  two_orders: Ff,
  two_prsons: zf
}, Symbol.toStringTag, { value: "Module" })), Lf = "推广数据", Bf = "一级人数", Uf = "推广码", Wf = "二级人数", qf = "暂无数据", Gf = "一级会员", Vf = "二级会员", Yf = "分销会员", e4e = {
  share_data: Lf,
  one_prsons: Bf,
  share_code: Uf,
  two_prsons: Wf,
  no_data: qf,
  one_user: Gf,
  two_user: Vf,
  page_title: Yf
}, o4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: e4e,
  no_data: qf,
  one_prsons: Bf,
  one_user: Gf,
  page_title: Yf,
  share_code: Uf,
  share_data: Lf,
  two_prsons: Wf,
  two_user: Vf
}, Symbol.toStringTag, { value: "Module" })), Kf = "推广码", Qf = "分销推广", Xf = "一级订单", Jf = "二级订单", Zf = "订单号", ey = "暂无数据", oy = "订单中心", t4e = {
  share_code: Kf,
  fenxiao_share: Qf,
  one_order: Xf,
  two_order: Jf,
  order_code: Zf,
  no_data: ey,
  page_title: oy
}, n4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: t4e,
  fenxiao_share: Qf,
  no_data: ey,
  one_order: Xf,
  order_code: Zf,
  page_title: oy,
  share_code: Kf,
  two_order: Jf
}, Symbol.toStringTag, { value: "Module" })), ty = "实付金额", ny = "帮", sy = "付款", ry = "帮付订单信息", ay = "共", cy = "种商品", iy = "该订单已完成", ly = "该订单已关闭", dy = "找朋友帮忙付", s4e = {
  payMoney: ty,
  help: ny,
  pay: sy,
  helpPayInfo: ry,
  common: ay,
  goods: cy,
  finish: iy,
  close: ly,
  payGenerously: dy
}, r4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: ly,
  common: ay,
  default: s4e,
  finish: iy,
  goods: cy,
  help: ny,
  helpPayInfo: ry,
  pay: sy,
  payGenerously: dy,
  payMoney: ty
}, Symbol.toStringTag, { value: "Module" })), uy = "实付金额", py = "帮付订单信息", my = "共", _y = "种商品", gy = "该订单已完成", hy = "该订单已关闭", fy = "找朋友帮忙付", a4e = {
  payMoney: uy,
  friendPayOrderInfo: py,
  common: my,
  goods: _y,
  finish: gy,
  close: hy,
  friendPay: fy
}, c4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: hy,
  common: my,
  default: a4e,
  finish: gy,
  friendPay: fy,
  friendPayOrderInfo: py,
  goods: _y,
  payMoney: uy
}, Symbol.toStringTag, { value: "Module" })), yy = "热门", $y = "精油/SPA/推拿", vy = "限时", by = "女性", Ty = "五星", Py = "特价", Sy = "火爆", Oy = "人选择", wy = "部位", jy = "功效", ky = "分钟", Cy = "选", My = "师傅", Ay = "暂无产品", Iy = "推拿调理", i4e = {
  hot: yy,
  new: "上新",
  search_text: $y,
  time: vy,
  woman: by,
  five_star: Ty,
  sales: Py,
  hots: Sy,
  select: Oy,
  part: wy,
  efficacy: jy,
  mintus: ky,
  sel: Cy,
  tehnician: My,
  no_goods: Ay,
  tips: Iy
}, l4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: i4e,
  efficacy: jy,
  five_star: Ty,
  hot: yy,
  hots: Sy,
  mintus: ky,
  no_goods: Ay,
  part: wy,
  sales: Py,
  search_text: $y,
  sel: Cy,
  select: Oy,
  tehnician: My,
  time: vy,
  tips: Iy,
  woman: by
}, Symbol.toStringTag, { value: "Module" })), Ny = "数据加载中,请稍候", Dy = "新客体验优惠", zy = "市场价", xy = "原价", Ey = "已选", Ry = "服务人员", Fy = "服务", Hy = "未选择服务", Ly = "项目介绍", By = "下单须知", Uy = "服务热线", Wy = "立即预约", qy = "电话联系", Gy = "在线客服", Vy = "新客体验优惠每人限一单", Yy = "请选择服务", Ky = "请选择项目数量", d4e = {
  data_loading: Ny,
  new_custom: Dy,
  market_price: zy,
  price: xy,
  selected: Ey,
  servicer: Ry,
  service: Fy,
  no_selected: Hy,
  goods_des: Ly,
  create_order_tips: By,
  service_phone: Uy,
  book_now: Wy,
  phone_contact: qy,
  online_service: Gy,
  new_user_tips: Vy,
  please_select: Yy,
  please_num: Ky
}, u4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  book_now: Wy,
  create_order_tips: By,
  data_loading: Ny,
  default: d4e,
  goods_des: Ly,
  market_price: zy,
  new_custom: Dy,
  new_user_tips: Vy,
  no_selected: Hy,
  online_service: Gy,
  phone_contact: qy,
  please_num: Ky,
  please_select: Yy,
  price: xy,
  selected: Ey,
  service: Fy,
  service_phone: Uy,
  servicer: Ry
}, Symbol.toStringTag, { value: "Module" })), Qy = "热门", Xy = "精油/SPA/推拿", Jy = "限时", Zy = "女性", e$ = "五星", o$ = "特价", t$ = "火爆", n$ = "人选择", s$ = "部位", r$ = "功效", a$ = "分钟", c$ = "选", i$ = "师傅", l$ = "暂无产品", d$ = "推拿调理", p4e = {
  hot: Qy,
  new: "上新",
  search_text: Xy,
  time: Jy,
  woman: Zy,
  five_star: e$,
  sales: o$,
  hots: t$,
  select: n$,
  part: s$,
  efficacy: r$,
  mintus: a$,
  sel: c$,
  tehnician: i$,
  no_goods: l$,
  tips: d$
}, m4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: p4e,
  efficacy: r$,
  five_star: e$,
  hot: Qy,
  hots: t$,
  mintus: a$,
  no_goods: l$,
  part: s$,
  sales: o$,
  search_text: Xy,
  sel: c$,
  select: n$,
  tehnician: i$,
  time: Jy,
  tips: d$,
  woman: Zy
}, Symbol.toStringTag, { value: "Module" })), _4e = {}, g4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _4e
}, Symbol.toStringTag, { value: "Module" })), u$ = "领券中心", p$ = "立即领取", m$ = "已领取", _$ = "订单满", g$ = "元可使用", h$ = "有效期至", f$ = "至", y$ = "无门槛券，全场通用", $$ = "有效期", v$ = "商品券，指定商品可用", b$ = "品类券，指定类目可用", T$ = "暂无优惠券", P$ = "领取成功", h4e = {
  coupon_title: u$,
  book_now: p$,
  geted: m$,
  order_overflow: _$,
  can_use: g$,
  validity_period: h$,
  go: f$,
  threshold: y$,
  validity: $$,
  good_coupon: v$,
  category_goods: b$,
  no_coupon: T$,
  geted_success: P$
}, f4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  book_now: p$,
  can_use: g$,
  category_goods: b$,
  coupon_title: u$,
  default: h4e,
  geted: m$,
  geted_success: P$,
  go: f$,
  good_coupon: v$,
  no_coupon: T$,
  order_overflow: _$,
  threshold: y$,
  validity: $$,
  validity_period: h$
}, Symbol.toStringTag, { value: "Module" })), S$ = "超", O$ = "人选择", w$ = "部位", j$ = "功效", k$ = "师傅", C$ = "选择", M$ = "等", A$ = "位", I$ = "可预约", N$ = "元", D$ = "立即预约", z$ = "推荐项目", x$ = "附近的", E$ = "您所在的城市还没有", R$ = "入驻！", F$ = "我要加盟", H$ = "服务中", L$ = "休息中", B$ = "生活照", U$ = "浏览量", W$ = "订单量", q$ = "粉丝量", G$ = "距您", V$ = "去下单", Y$ = "立即见面", K$ = "岁", Q$ = "今日地图配额已达到上限", X$ = "浏览量排序", J$ = "订单量排序", Z$ = "粉丝量排序", ev = "综合排序", y4e = {
  overfllow: S$,
  selected: O$,
  part: w$,
  efficacy: j$,
  technician: k$,
  select: C$,
  wait: M$,
  wei: A$,
  work_online: I$,
  cny: N$,
  book_now: D$,
  top_goods: z$,
  loc: x$,
  city_tips: E$,
  jion: R$,
  my_jion: F$,
  service: H$,
  offonline: L$,
  life_img: B$,
  browe_num: U$,
  order_num: W$,
  fans_num: q$,
  juning: G$,
  go_order: V$,
  go_book_now: Y$,
  years: K$,
  map_key_tips: Q$,
  browe_sort: X$,
  order_sort: J$,
  fans_sort: Z$,
  compre: ev
}, $4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  book_now: D$,
  browe_num: U$,
  browe_sort: X$,
  city_tips: E$,
  cny: N$,
  compre: ev,
  default: y4e,
  efficacy: j$,
  fans_num: q$,
  fans_sort: Z$,
  go_book_now: Y$,
  go_order: V$,
  jion: R$,
  juning: G$,
  life_img: B$,
  loc: x$,
  map_key_tips: Q$,
  my_jion: F$,
  offonline: L$,
  order_num: W$,
  order_sort: J$,
  overfllow: S$,
  part: w$,
  select: C$,
  selected: O$,
  service: H$,
  technician: k$,
  top_goods: z$,
  wait: M$,
  wei: A$,
  work_online: I$,
  years: K$
}, Symbol.toStringTag, { value: "Module" })), ov = "您所在的", tv = "还没有", nv = "入驻！", sv = "我要加盟", rv = "可预约", av = "服务中", cv = "休息中", iv = "生活照", lv = "距您:", dv = "计算中...", uv = "从业", pv = "年", mv = "年以内", _v = "全部:", gv = "单", hv = "好评", fv = "分", yv = "看评价", $v = "平台直营", vv = "立即预约", bv = "粉丝:", Tv = "数据加载中...", Pv = "资深", Sv = "全部", Ov = "免出行费", wv = "地图模式", jv = "定位中", kv = "请输入", Cv = "姓名", v4e = {
  you_location: ov,
  nodata: tv,
  jion_reg: nv,
  my_jion: sv,
  is_work: rv,
  serviceing: av,
  no_work: cv,
  life_img: iv,
  from_you: lv,
  computed: dv,
  work_in: uv,
  years: pv,
  years_in: mv,
  serviced: _v,
  order_name: gv,
  goods_comment: hv,
  score: fv,
  look_comment: yv,
  platform_shop: $v,
  book_now: vv,
  fans: bv,
  data_waiting: Tv,
  star_tech: Pv,
  all_tech: Sv,
  free_travel: Ov,
  map_model: wv,
  positioning: jv,
  plese_input: kv,
  tech_name: Cv
}, b4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all_tech: Sv,
  book_now: vv,
  computed: dv,
  data_waiting: Tv,
  default: v4e,
  fans: bv,
  free_travel: Ov,
  from_you: lv,
  goods_comment: hv,
  is_work: rv,
  jion_reg: nv,
  life_img: iv,
  look_comment: yv,
  map_model: wv,
  my_jion: sv,
  no_work: cv,
  nodata: tv,
  order_name: gv,
  platform_shop: $v,
  plese_input: kv,
  positioning: jv,
  score: fv,
  serviced: _v,
  serviceing: av,
  star_tech: Pv,
  tech_name: Cv,
  work_in: uv,
  years: pv,
  years_in: mv,
  you_location: ov
}, Symbol.toStringTag, { value: "Module" })), Mv = "您所在的", Av = "还没有", Iv = "入驻！", Nv = "我要加盟", Dv = "可预约", zv = "服务中", xv = "休息中", Ev = "生活照", Rv = "距您:", Fv = "计算中...", Hv = "从业", Lv = "年", Bv = "年以内", Uv = "已服务:", Wv = "单", qv = "好评", Gv = "分", Vv = "看评价", Yv = "平台直营", Kv = "立即预约", Qv = "去下单", Xv = "粉丝:", Jv = "数据加载中...", Zv = "资深", eb = "全部", ob = "免出行费", tb = "地图模式", nb = "定位中", sb = "请输入", rb = "姓名", ab = "确认下单", cb = "请选择服务项目", ib = "项目详情 >", lb = "推荐项目", db = "购买数量", ub = "该", pb = "今", mb = "下单后联系Ta", _b = "暂无联系方式", gb = "该", hb = "师傅", fb = "还未设置接单范围", yb = "合计", $b = "最早可约", T4e = {
  you_location: Mv,
  nodata: Av,
  jion_reg: Iv,
  my_jion: Nv,
  is_work: Dv,
  serviceing: zv,
  no_work: xv,
  life_img: Ev,
  from_you: Rv,
  computed: Fv,
  work_in: Hv,
  years: Lv,
  years_in: Bv,
  serviced: Uv,
  order_name: Wv,
  goods_comment: qv,
  score: Gv,
  look_comment: Vv,
  platform_shop: Yv,
  book_now: Kv,
  go_order: Qv,
  fans: Xv,
  data_waiting: Jv,
  star_tech: Zv,
  all_tech: eb,
  free_travel: ob,
  map_model: tb,
  positioning: nb,
  plese_input: sb,
  tech_name: rb,
  confirm_order: ab,
  order_now: cb,
  goodsDetail: ib,
  rec_goods: lb,
  buy_num: db,
  yes: ub,
  todayWorkTime: pb,
  order_contact: mb,
  no_contact: _b,
  can: gb,
  technician: hb,
  no_set: fb,
  total: yb,
  todayWorkTime_today: $b
}, P4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all_tech: eb,
  book_now: Kv,
  buy_num: db,
  can: gb,
  computed: Fv,
  confirm_order: ab,
  data_waiting: Jv,
  default: T4e,
  fans: Xv,
  free_travel: ob,
  from_you: Rv,
  go_order: Qv,
  goodsDetail: ib,
  goods_comment: qv,
  is_work: Dv,
  jion_reg: Iv,
  life_img: Ev,
  look_comment: Vv,
  map_model: tb,
  my_jion: Nv,
  no_contact: _b,
  no_set: fb,
  no_work: xv,
  nodata: Av,
  order_contact: mb,
  order_name: Wv,
  order_now: cb,
  platform_shop: Yv,
  plese_input: sb,
  positioning: nb,
  rec_goods: lb,
  score: Gv,
  serviced: Uv,
  serviceing: zv,
  star_tech: Zv,
  tech_name: rb,
  technician: hb,
  todayWorkTime: pb,
  todayWorkTime_today: $b,
  total: yb,
  work_in: Hv,
  years: Lv,
  years_in: Bv,
  yes: ub,
  you_location: Mv
}, Symbol.toStringTag, { value: "Module" })), S4e = {}, O4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: S4e
}, Symbol.toStringTag, { value: "Module" })), vb = "开发环境配置", bb = "API请求地址", Tb = "图片服务器地址", Pb = "站点ID（VITE_SITE_ID）", Sb = "请输入站点ID", Ob = "请输入数字", wb = "最大不能超过", w4e = {
  developTitle: vb,
  baseUrl: bb,
  imgUrl: Tb,
  siteId: Pb,
  siteIdPlaceholder: Sb,
  pleaseEnterNumber: Ob,
  maximumCannotExceed: wb
}, j4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  baseUrl: bb,
  default: w4e,
  developTitle: vb,
  imgUrl: Tb,
  maximumCannotExceed: wb,
  pleaseEnterNumber: Ob,
  siteId: Pb,
  siteIdPlaceholder: Sb
}, Symbol.toStringTag, { value: "Module" })), jb = "欢迎回来！", kb = "数据看板", Cb = "今日业绩", Mb = "元", Ab = "今日退款", Ib = "总业绩", Nb = "单", Db = "今日订单", zb = "位", xb = "今日新增", Eb = "家", Rb = "今日新增门店", Fb = "在线数", Hb = "休息中", Lb = "总", Bb = "数", Ub = "代理商总计", Wb = "门店总计", qb = "业务员总计", Gb = "订单管理", Vb = "待接单", Yb = "待服务", Kb = "服务中", Qb = "已完成", Xb = "常用工具", Jb = "即将返回", Zb = "手机管理端", eT = "请先登录", oT = "您不是管理员", tT = "初始化失败", k4e = {
  welcome: jb,
  data_info: kb,
  today_money: Cb,
  cny: Mb,
  today_refund: Ab,
  total_money: Ib,
  order: Nb,
  today_order: Db,
  wei: zb,
  today_add: xb,
  home: Eb,
  today_store: Rb,
  online_num: Fb,
  no_work: Hb,
  total: Lb,
  shu: Bb,
  agent_total: Ub,
  store_total: Wb,
  salesman_total: qb,
  order_manger: Gb,
  wait_talk_order: Vb,
  wait_service: Yb,
  service_ing: Kb,
  complate: Qb,
  tools: Xb,
  goback: Jb,
  mobile_manger: Zb,
  first_login: eT,
  no_manger: oT,
  first_fail: tT
}, C4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  agent_total: Ub,
  cny: Mb,
  complate: Qb,
  data_info: kb,
  default: k4e,
  first_fail: tT,
  first_login: eT,
  goback: Jb,
  home: Eb,
  mobile_manger: Zb,
  no_manger: oT,
  no_work: Hb,
  online_num: Fb,
  order: Nb,
  order_manger: Gb,
  salesman_total: qb,
  service_ing: Kb,
  shu: Bb,
  store_total: Wb,
  today_add: xb,
  today_money: Cb,
  today_order: Db,
  today_refund: Ab,
  today_store: Rb,
  tools: Xb,
  total: Lb,
  total_money: Ib,
  wait_service: Yb,
  wait_talk_order: Vb,
  wei: zb,
  welcome: jb
}, Symbol.toStringTag, { value: "Module" })), nT = "全部", sT = "暂无订单", rT = "订单号", aT = "待支付", cT = "待接单", iT = "已完成", lT = "已拒单", dT = "已支付", uT = "已取消", pT = "退款审核中", mT = "已退款", _T = "未知状态", gT = "预约时间", hT = "实际支付", fT = "审核退款", yT = "已退款", $T = "立即接单", vT = "立即转单", bT = "暂无待接订单", TT = "待服务", PT = "暂无待服务订单", ST = "审核退款", OT = "开始服务", wT = "服务中", jT = "暂无服务中订单", kT = "订单管理", M4e = {
  all: nT,
  no_order: sT,
  order_number: rT,
  wait_pay: aT,
  wait_talk_order: cT,
  complate: iT,
  no_talk_order: lT,
  payed: dT,
  cancel: uT,
  refund_check: pT,
  redfund: mT,
  unknow: _T,
  date_time: gT,
  pay_real: hT,
  check_refund: fT,
  refund_money: yT,
  resver_order: $T,
  trans_order: vT,
  no_talk_order_tips: bT,
  wait_service: TT,
  no_wait_service: PT,
  check_redund_money: ST,
  start_service: OT,
  service_ing: wT,
  no_service_ing: jT,
  order_manger: kT
}, A4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: nT,
  cancel: uT,
  check_redund_money: ST,
  check_refund: fT,
  complate: iT,
  date_time: gT,
  default: M4e,
  no_order: sT,
  no_service_ing: jT,
  no_talk_order: lT,
  no_talk_order_tips: bT,
  no_wait_service: PT,
  order_manger: kT,
  order_number: rT,
  pay_real: hT,
  payed: dT,
  redfund: mT,
  refund_check: pT,
  refund_money: yT,
  resver_order: $T,
  service_ing: wT,
  start_service: OT,
  trans_order: vT,
  unknow: _T,
  wait_pay: aT,
  wait_service: TT,
  wait_talk_order: cT
}, Symbol.toStringTag, { value: "Module" })), CT = "数据加载中,请稍候", MT = "未接单", AT = "待出发", IT = "待到达", NT = "待服务", DT = "服务中", zT = "服务完成", xT = "师傅", ET = "接单", RT = "出发", FT = "到达", HT = "开始服务", LT = "服务倒计时", BT = "服务内容", UT = "服务时长", WT = "分钟", qT = "服务", GT = "下单人", VT = "联系方式", YT = "电话联系", KT = "服务地址", QT = "下单时间", XT = "服务时间", JT = "车费详情(双程)", ZT = "出租车 全程", eP = "公里", oP = "出行费用", tP = "项目费用", nP = "优惠抵扣", sP = "支付方式", rP = "微信支付", aP = "支付宝支付", cP = "余额支付", iP = "线下支付", lP = "总计", dP = "订单编号", uP = "复制", pP = "联系客户", mP = "拒绝接单", _P = "立即接单", gP = "立即出发", hP = "拍照确认到达", fP = "拍照完成服务", yP = "确认完成", $P = "拍照打卡", vP = "当前位置", bP = "取消", TP = "确定", PP = "确认到达", SP = "项目", OP = "价格", wP = "数量", jP = "状态", kP = "上传完成照片", CP = "上传目的地照片", MP = "订单详情", AP = "位置更新中请稍候...", IP = "获取位置失败", NP = "正在处理...", DP = "余额不足", zP = "响应数据格式错误", xP = "请求失败", EP = "加载失败", RP = "确认接收订单", FP = "您确定要接收这个订单吗?", HP = "接单成功", LP = "已成功出发", BP = "确认拒绝订单", UP = "您确定要拒绝这个订单吗？", WP = "已拒绝该订单", qP = "上传中", GP = "请上传到达照片", VP = "到达打卡成功", YP = "订单退款中，无法开始服务", KP = "未获得开始服务时间", QP = "录音已开启,现在开始进入全程录音状态", XP = "请上传完成服务的照片", JP = "服务已完成", ZP = "录音已停止", eS = "已完成", I4e = {
  data_loading: CT,
  no_talk_order: MT,
  wait_go_out: AT,
  wait_rech: IT,
  wait_service: NT,
  service_ing: DT,
  service_complate: zT,
  technician: xT,
  talk_order: ET,
  go_out: RT,
  rech: FT,
  start_service: HT,
  service_timed: LT,
  service_content: BT,
  service_time: UT,
  minuts: WT,
  service: qT,
  order_prson: GT,
  contact: VT,
  contact_phone: YT,
  service_address: KT,
  order_create_time: QT,
  service_date: XT,
  car_money_detail: JT,
  taix: ZT,
  km: eP,
  travel_price: oP,
  goods_price: tP,
  order_sales_money: nP,
  pay_type: sP,
  weachtpay: rP,
  alipay: aP,
  balancepay: cP,
  offlinepay: iP,
  total: lP,
  order_number: dP,
  copy: uP,
  contact_custom: pP,
  no_rech_order: mP,
  book_now: _P,
  now_go_out: gP,
  upload_img_rech: hP,
  upload_img_complate: fP,
  confirm_complate: yP,
  images_complate: $P,
  location: vP,
  cancel: bP,
  confirm: TP,
  confirm_rech: PP,
  project: SP,
  price: OP,
  number: wP,
  status: jP,
  upload_complate_img: kP,
  upload_rech_img: CP,
  order_detail: MP,
  location_update: AP,
  location_get_fail: IP,
  ing_update: NP,
  blacen_no: DP,
  data_type_error: zP,
  get_fail: xP,
  loading_fail: EP,
  confirm_rec_order: RP,
  confirm_order: FP,
  rec_order_success: HP,
  success_go_out: LP,
  confirm_no_rech_order: BP,
  rech_no_order_tips: UP,
  no_reched: WP,
  uploading: qP,
  upload_rech_tips: GP,
  rech_success_tips: VP,
  refund_order_no_service: YP,
  no_start_time: KP,
  recvoe_voice_tips: QP,
  upload_complate_img_tips: XP,
  complated: JP,
  voice_stop: ZP,
  complate: eS
}, N4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  alipay: aP,
  balancepay: cP,
  blacen_no: DP,
  book_now: _P,
  cancel: bP,
  car_money_detail: JT,
  complate: eS,
  complated: JP,
  confirm: TP,
  confirm_complate: yP,
  confirm_no_rech_order: BP,
  confirm_order: FP,
  confirm_rec_order: RP,
  confirm_rech: PP,
  contact: VT,
  contact_custom: pP,
  contact_phone: YT,
  copy: uP,
  data_loading: CT,
  data_type_error: zP,
  default: I4e,
  get_fail: xP,
  go_out: RT,
  goods_price: tP,
  images_complate: $P,
  ing_update: NP,
  km: eP,
  loading_fail: EP,
  location: vP,
  location_get_fail: IP,
  location_update: AP,
  minuts: WT,
  no_rech_order: mP,
  no_reched: WP,
  no_start_time: KP,
  no_talk_order: MT,
  now_go_out: gP,
  number: wP,
  offlinepay: iP,
  order_create_time: QT,
  order_detail: MP,
  order_number: dP,
  order_prson: GT,
  order_sales_money: nP,
  pay_type: sP,
  price: OP,
  project: SP,
  rec_order_success: HP,
  rech: FT,
  rech_no_order_tips: UP,
  rech_success_tips: VP,
  recvoe_voice_tips: QP,
  refund_order_no_service: YP,
  service: qT,
  service_address: KT,
  service_complate: zT,
  service_content: BT,
  service_date: XT,
  service_ing: DT,
  service_time: UT,
  service_timed: LT,
  start_service: HT,
  status: jP,
  success_go_out: LP,
  taix: ZT,
  talk_order: ET,
  technician: xT,
  total: lP,
  travel_price: oP,
  upload_complate_img: kP,
  upload_complate_img_tips: XP,
  upload_img_complate: fP,
  upload_img_rech: hP,
  upload_rech_img: CP,
  upload_rech_tips: GP,
  uploading: qP,
  voice_stop: ZP,
  wait_go_out: AT,
  wait_rech: IT,
  wait_service: NT,
  weachtpay: rP
}, Symbol.toStringTag, { value: "Module" })), oS = "数据加载中,请稍候", tS = "全部", nS = "暂无", sS = "师傅", rS = "可接单", aS = "休息中", cS = "联系TA", iS = "待审核", lS = "审核中", dS = "已审核", uS = "城市", pS = "在线中", mS = "已删除", _S = "管理", gS = "审核", hS = "确定审核通过【", fS = "】的入驻申请?", yS = "取消", $S = "确认", vS = "审核成功", D4e = {
  data_loading: oS,
  all: tS,
  no: nS,
  technician: sS,
  is_talk_order: rS,
  no_work: aS,
  conatact: cS,
  wait_check: iS,
  checking: lS,
  checked: dS,
  city: uS,
  online: pS,
  deleted: mS,
  manger: _S,
  check_name: gS,
  confirm_check: hS,
  jion_apply: fS,
  cancel: yS,
  confirm: $S,
  check_success: vS
}, z4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: tS,
  cancel: yS,
  check_name: gS,
  check_success: vS,
  checked: dS,
  checking: lS,
  city: uS,
  conatact: cS,
  confirm: $S,
  confirm_check: hS,
  data_loading: oS,
  default: D4e,
  deleted: mS,
  is_talk_order: rS,
  jion_apply: fS,
  manger: _S,
  no: nS,
  no_work: aS,
  online: pS,
  technician: sS,
  wait_check: iS
}, Symbol.toStringTag, { value: "Module" })), bS = "模特照", TS = "条评价", PS = "接单量", SS = "粉丝量", OS = "收藏量", wS = "浏览量", jS = "TA拥有的技能", kS = "热门", CS = "限时", MS = "女性", AS = "五星", IS = "特价", NS = "火爆", DS = "分钟", zS = "审核", xS = "TA当前在线", ES = "TA在休息中", RS = "简介", FS = "关闭", HS = "师傅", LS = "详情", BS = "确定通过", US = "的入驻申请?", WS = "取消", qS = "确认", GS = "审核成功", x4e = {
  model_img: bS,
  comment_tips: TS,
  order_num: PS,
  fans_num: SS,
  fav_num: OS,
  browe_num: wS,
  ta_goods: jS,
  hot: kS,
  new: "上新",
  time: CS,
  woman: MS,
  five_star: AS,
  sales: IS,
  hot_plus: NS,
  mintus: DS,
  check: zS,
  online: xS,
  offline: ES,
  descrtion: RS,
  closed: FS,
  technician: HS,
  detail: LS,
  confirm_tips: BS,
  apply: US,
  cancel: WS,
  confirm: qS,
  check_success: GS
}, E4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  apply: US,
  browe_num: wS,
  cancel: WS,
  check: zS,
  check_success: GS,
  closed: FS,
  comment_tips: TS,
  confirm: qS,
  confirm_tips: BS,
  default: x4e,
  descrtion: RS,
  detail: LS,
  fans_num: SS,
  fav_num: OS,
  five_star: AS,
  hot: kS,
  hot_plus: NS,
  mintus: DS,
  model_img: bS,
  offline: ES,
  online: xS,
  order_num: PS,
  sales: IS,
  ta_goods: jS,
  technician: HS,
  time: CS,
  woman: MS
}, Symbol.toStringTag, { value: "Module" })), VS = "位置加载中", YS = "确定", KS = "搜索地点", QS = "搜索", XS = "没有周边信息，搜索看看", JS = "选择定位地址", ZS = "获取位置失败", eO = "获取周边信息失败", oO = "搜索失败", tO = "请先选择地址", nO = "获取中心位置失败", R4e = {
  location_update: VS,
  confirm: YS,
  search_adddress: KS,
  search: QS,
  no_data: XS,
  page_title: JS,
  localtion_get_fail: ZS,
  localtion_sw_fail: eO,
  search_fail: oO,
  first_select_address: tO,
  get_center_location_fail: nO
}, F4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirm: YS,
  default: R4e,
  first_select_address: tO,
  get_center_location_fail: nO,
  localtion_get_fail: ZS,
  localtion_sw_fail: eO,
  location_update: VS,
  no_data: XS,
  page_title: JS,
  search: QS,
  search_adddress: KS,
  search_fail: oO
}, Symbol.toStringTag, { value: "Module" })), sO = "支付宝收款码", rO = "微信收款码", aO = "添加银行卡", cO = "添加微信收款码", iO = "添加支付宝收款码", lO = "尾号", dO = "银行卡", H4e = {
  alipayAccountNo: sO,
  wechatCode: rO,
  addBankCard: aO,
  addWechatCode: cO,
  addAlipayAccount: iO,
  endNumber: lO,
  bankCard: dO
}, L4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: iO,
  addBankCard: aO,
  addWechatCode: cO,
  alipayAccountNo: sO,
  bankCard: dO,
  default: H4e,
  endNumber: lO,
  wechatCode: rO
}, Symbol.toStringTag, { value: "Module" })), uO = "添加会员账户", pO = "编辑会员账户", mO = "添加银行卡", _O = "请添加持卡人本人的银行卡", gO = "编辑银行卡", hO = "请编辑持卡人本人的银行卡", fO = "添加支付宝收款码", yO = "请添加已实名的支付宝账号", $O = "编辑支付宝收款码", vO = "请编辑已实名的支付宝账号", bO = "添加微信收款码", TO = "请添加已实名的微信账号", PO = "编辑微信收款码", SO = "请编辑已实名的微信账号", OO = "持卡人姓名", wO = "请输入持卡人姓名", jO = "银行名称", kO = "请输入银行名称", CO = "银行卡号", MO = "请输入银行卡号", AO = "真实姓名", IO = "请输入真实姓名", NO = "支付宝账号", DO = "请输入支付宝账号", zO = "微信账号", xO = "请输入微信账号", EO = "请上传支付宝收款码", RO = "请上传微信收款码", FO = "确定要删除该账号吗？", B4e = {
  addAccountTitle: uO,
  editAccountTitle: pO,
  addBankCard: mO,
  addBankCardTips: _O,
  editBankCard: gO,
  editBankCardTips: hO,
  addAlipayAccount: fO,
  addAlipayAccountTips: yO,
  editAlipayAccount: $O,
  editAlipayAccountTips: vO,
  addWechatCodeAccount: bO,
  addWechatCodeAccountTips: TO,
  editWechatCodeAccount: PO,
  editWechatCodeAccountTips: SO,
  bankRealname: OO,
  bankRealnamePlaceholder: wO,
  bankName: jO,
  bankNamePlaceholder: kO,
  bankAccountNo: CO,
  bankAccountNoPlaceholder: MO,
  alipayRealname: AO,
  alipayRealnamePlaceholder: IO,
  alipayAccountNo: NO,
  alipayAccountNoPlaceholder: DO,
  wechatCodeAccountNo: zO,
  wechatCodeAccountNoPlaceholder: xO,
  alipayAccountImgPlaceholder: EO,
  wechatCodeAccountImgPlaceholder: RO,
  deleteConfirm: FO
}, U4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAccountTitle: uO,
  addAlipayAccount: fO,
  addAlipayAccountTips: yO,
  addBankCard: mO,
  addBankCardTips: _O,
  addWechatCodeAccount: bO,
  addWechatCodeAccountTips: TO,
  alipayAccountImgPlaceholder: EO,
  alipayAccountNo: NO,
  alipayAccountNoPlaceholder: DO,
  alipayRealname: AO,
  alipayRealnamePlaceholder: IO,
  bankAccountNo: CO,
  bankAccountNoPlaceholder: MO,
  bankName: jO,
  bankNamePlaceholder: kO,
  bankRealname: OO,
  bankRealnamePlaceholder: wO,
  default: B4e,
  deleteConfirm: FO,
  editAccountTitle: pO,
  editAlipayAccount: $O,
  editAlipayAccountTips: vO,
  editBankCard: gO,
  editBankCardTips: hO,
  editWechatCodeAccount: PO,
  editWechatCodeAccountTips: SO,
  wechatCodeAccountImgPlaceholder: RO,
  wechatCodeAccountNo: zO,
  wechatCodeAccountNoPlaceholder: xO
}, Symbol.toStringTag, { value: "Module" })), HO = "联系人", LO = "请输入联系人姓名", BO = "手机号码", UO = "请输入手机号码", WO = "选择地区", qO = "请选择地区", GO = "详细地址", VO = "请填写详细地址", YO = "设为默认地址", KO = "请选择地址", W4e = {
  name: HO,
  namePlaceholder: LO,
  mobile: BO,
  mobilePlaceholder: UO,
  selectArea: WO,
  selectAreaPlaceholder: qO,
  address: GO,
  addressPlaceholder: VO,
  defaultAddress: YO,
  selectAddressPlaceholder: KO
}, q4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: GO,
  addressPlaceholder: VO,
  default: W4e,
  defaultAddress: YO,
  mobile: BO,
  mobilePlaceholder: UO,
  name: HO,
  namePlaceholder: LO,
  selectAddressPlaceholder: KO,
  selectArea: WO,
  selectAreaPlaceholder: qO
}, Symbol.toStringTag, { value: "Module" })), QO = "快递地址", XO = "同城配送地址", JO = "新建收货地址", G4e = {
  address: QO,
  locationAddress: XO,
  createAddress: JO,
  default: "默认"
}, V4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: QO,
  createAddress: JO,
  default: G4e,
  locationAddress: XO
}, Symbol.toStringTag, { value: "Module" })), ZO = "选择地址", e1 = "创建服务地址", o1 = "设为默认", t1 = "编辑", n1 = "删除", s1 = "暂无服务地址", r1 = "确定要删除该地址吗？", a1 = "取消", c1 = "确定", Y4e = {
  selectAddress: ZO,
  createAddress: e1,
  set_default: o1,
  edit: t1,
  deleted: n1,
  no_data: s1,
  confirm_tips: r1,
  cancel: a1,
  confirm: c1
}, K4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancel: a1,
  confirm: c1,
  confirm_tips: r1,
  createAddress: e1,
  default: Y4e,
  deleted: n1,
  edit: t1,
  no_data: s1,
  selectAddress: ZO,
  set_default: o1
}, Symbol.toStringTag, { value: "Module" })), i1 = "收货人", l1 = "请输入收货人姓名", d1 = "手机号码", u1 = "请输入手机号码", p1 = "选择地区", m1 = "请选择地区", _1 = "详细地址", g1 = "请填写详细地址", h1 = "设为默认地址", f1 = "请选择地址", Q4e = {
  name: i1,
  namePlaceholder: l1,
  mobile: d1,
  mobilePlaceholder: u1,
  selectArea: p1,
  selectAreaPlaceholder: m1,
  address: _1,
  addressPlaceholder: g1,
  defaultAddress: h1,
  selectAddressPlaceholder: f1
}, X4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: _1,
  addressPlaceholder: g1,
  default: Q4e,
  defaultAddress: h1,
  mobile: d1,
  mobilePlaceholder: u1,
  name: i1,
  namePlaceholder: l1,
  selectAddressPlaceholder: f1,
  selectArea: p1,
  selectAreaPlaceholder: m1
}, Symbol.toStringTag, { value: "Module" })), y1 = "立即提现", $1 = "余额明细", v1 = "提现到", b1 = "请选择提现方式", T1 = "微信默认钱包", P1 = "提现金额", S1 = "可提现余额", O1 = "全部提现", w1 = "最小提现金额为", j1 = "手续费为", k1 = "提现记录", C1 = "提现至微信零钱", M1 = "提现至微信零钱", A1 = "提现至支付宝", I1 = "请先添加支付宝账号", N1 = "提现至银行卡", D1 = "请先添加银行卡", z1 = "提现至微信", x1 = "请先添加微信号", E1 = "支付宝账号", R1 = "微信号", F1 = "储蓄卡", H1 = "异常操作", L1 = "没有可用的提现方式", B1 = "请输入提现金额", U1 = "提现金额格式错误", W1 = "提现金额超出可提现金额", q1 = "提现金额小于最低提现金额", G1 = "更换", V1 = "提现设置未开启", Y1 = "添加", J4e = {
  cashOutNow: y1,
  balanceDetail: $1,
  cashOutTo: v1,
  cashOutTypePlaceholder: b1,
  wechatpay: T1,
  cashOutMoneyTip: P1,
  money: S1,
  allTx: O1,
  minWithdrawal: w1,
  commissionTo: j1,
  cashOutList: k1,
  cashOutToWechat: C1,
  cashOutToWechatTips: M1,
  cashOutToAlipay: A1,
  cashOutToAlipayTips: I1,
  cashOutToBank: N1,
  cashOutToBankTips: D1,
  cashOutToWechatCode: z1,
  cashOutToWechatCodeTips: x1,
  alipayAccountNo: E1,
  wechatCodeAccountNo: R1,
  debitCard: F1,
  abnormalOperation: H1,
  noAvailableCashOutType: L1,
  applyMoneyPlaceholder: B1,
  moneyformatError: U1,
  applyMoneyExceed: W1,
  applyMoneyBelow: q1,
  replace: G1,
  isOpenApply: V1,
  toAdd: Y1
}, Z4e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOperation: H1,
  alipayAccountNo: E1,
  allTx: O1,
  applyMoneyBelow: q1,
  applyMoneyExceed: W1,
  applyMoneyPlaceholder: B1,
  balanceDetail: $1,
  cashOutList: k1,
  cashOutMoneyTip: P1,
  cashOutNow: y1,
  cashOutTo: v1,
  cashOutToAlipay: A1,
  cashOutToAlipayTips: I1,
  cashOutToBank: N1,
  cashOutToBankTips: D1,
  cashOutToWechat: C1,
  cashOutToWechatCode: z1,
  cashOutToWechatCodeTips: x1,
  cashOutToWechatTips: M1,
  cashOutTypePlaceholder: b1,
  commissionTo: j1,
  debitCard: F1,
  default: J4e,
  isOpenApply: V1,
  minWithdrawal: w1,
  money: S1,
  moneyformatError: U1,
  noAvailableCashOutType: L1,
  replace: G1,
  toAdd: Y1,
  wechatCodeAccountNo: R1,
  wechatpay: T1
}, Symbol.toStringTag, { value: "Module" })), K1 = "我的余额", Q1 = "充值", X1 = "提现", J1 = "余额明细", Z1 = "账户余额 (元)", ew = "余额 (元)", ow = "可提现余额 (元)", tw = "可用余额", nw = "元", sw = "充值记录", e5e = {
  balanceInfo: K1,
  recharge: Q1,
  cashOut: X1,
  balanceDetail: J1,
  accountBalance: Z1,
  balance: ew,
  money: ow,
  availableBalance: tw,
  yuan: nw,
  rechargeRecord: sw
}, o5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: Z1,
  availableBalance: tw,
  balance: ew,
  balanceDetail: J1,
  balanceInfo: K1,
  cashOut: X1,
  default: e5e,
  money: ow,
  recharge: Q1,
  rechargeRecord: sw,
  yuan: nw
}, Symbol.toStringTag, { value: "Module" })), rw = "我的足迹", aw = "访问记录", t5e = {
  my_history: rw,
  page_title: aw
}, n5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: t5e,
  my_history: rw,
  page_title: aw
}, Symbol.toStringTag, { value: "Module" })), cw = "申请时间", iw = "审核中，请耐心等待...", lw = "转账中，请耐心等待...", dw = "已转账，请及时查收", uw = "提现已取消", pw = "余额记录", mw = "佣金记录", _w = "暂无提现记录", gw = "暂无佣金记录", hw = "提现方式：", s5e = {
  applyTime: cw,
  toBeReviewed: iw,
  toBeTransfer: lw,
  transfer: dw,
  cancelApply: uw,
  balanceDetail: pw,
  commissionDetail: mw,
  emptyTip: _w,
  commissemptyTip: gw,
  rechargeType: hw
}, r5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: cw,
  balanceDetail: pw,
  cancelApply: uw,
  commissemptyTip: gw,
  commissionDetail: mw,
  default: s5e,
  emptyTip: _w,
  rechargeType: hw,
  toBeReviewed: iw,
  toBeTransfer: lw,
  transfer: dw
}, Symbol.toStringTag, { value: "Module" })), fw = "当前状态", yw = "提现单号", $w = "手续费", vw = "申请时间", bw = "审核时间", Tw = "银行名称", Pw = "收款账号", Sw = "拒绝理由", Ow = "转账方式", ww = "转账时间", jw = "付款凭证", kw = "转账补充说明", Cw = "真实姓名", Mw = "持卡人姓名", Aw = "收款码", Iw = "收款方信息", Nw = "转账信息", Dw = "收款方昵称", zw = "收款方头像", xw = "转账单号", Ew = "提现", Rw = "取消提现", a5e = {
  statusName: fw,
  cashOutNo: yw,
  serviceMoney: $w,
  createTime: vw,
  auditTime: bw,
  transferBank: Tw,
  transferAccount: Pw,
  refuseReason: Sw,
  transferTypeName: Ow,
  transferTime: ww,
  transferVoucher: jw,
  transferRemark: kw,
  realname: Cw,
  bankRealname: Mw,
  transferCode: Aw,
  proceedsInfo: Iw,
  transferInfo: Nw,
  transferNickname: Dw,
  transferImg: zw,
  transferNo: xw,
  cashOutNow: Ew,
  cashOutCancel: Rw
}, c5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: bw,
  bankRealname: Mw,
  cashOutCancel: Rw,
  cashOutNo: yw,
  cashOutNow: Ew,
  createTime: vw,
  default: a5e,
  proceedsInfo: Iw,
  realname: Cw,
  refuseReason: Sw,
  serviceMoney: $w,
  statusName: fw,
  transferAccount: Pw,
  transferBank: Tw,
  transferCode: Aw,
  transferImg: zw,
  transferInfo: Nw,
  transferNickname: Dw,
  transferNo: xw,
  transferRemark: kw,
  transferTime: ww,
  transferTypeName: Ow,
  transferVoucher: jw
}, Symbol.toStringTag, { value: "Module" })), Fw = "充值", Hw = "提现", Lw = "提现", Bw = "佣金明细", Uw = "当前佣金（元）", Ww = "累计佣金（元）", qw = "提现中佣金（元）", Gw = "可用佣金", Vw = "元", Yw = "我的佣金", i5e = {
  recharge: Fw,
  cashOut: Hw,
  transferMoney: Lw,
  commissionDetail: Bw,
  accountCommission: Uw,
  commission: Ww,
  money: qw,
  availableCommission: Gw,
  yuan: Vw,
  commissionInfo: Yw
}, l5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountCommission: Uw,
  availableCommission: Gw,
  cashOut: Hw,
  commission: Ww,
  commissionDetail: Bw,
  commissionInfo: Yw,
  default: i5e,
  money: qw,
  recharge: Fw,
  transferMoney: Lw,
  yuan: Vw
}, Symbol.toStringTag, { value: "Module" })), d5e = {}, u5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: d5e
}, Symbol.toStringTag, { value: "Module" })), Kw = "暫無可用優惠券", Qw = "可用", Xw = "去使用", Jw = "已使用", Zw = "訂單滿", ej = "元可使用", oj = "有效期", tj = "至", nj = "無門檻券，全場通用", sj = "商品券，指定商品可用", rj = "品類券，指定類目可用", aj = "暫無已使用優惠券", cj = "已過期", ij = "暫無已過期優惠券", lj = "我的優惠券", p5e = {
  no_data: Kw,
  available: Qw,
  go_use: Xw,
  used: Jw,
  order_overfllow: Zw,
  cny_available: ej,
  date_time: oj,
  goto: tj,
  general: nj,
  goods_coupon: sj,
  category_coupon: rj,
  no_used: aj,
  expired: cj,
  no_expired: ij,
  my_coupon: lj
}, m5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  available: Qw,
  category_coupon: rj,
  cny_available: ej,
  date_time: oj,
  default: p5e,
  expired: cj,
  general: nj,
  go_use: Xw,
  goods_coupon: sj,
  goto: tj,
  my_coupon: lj,
  no_data: Kw,
  no_expired: ij,
  no_used: aj,
  order_overfllow: Zw,
  used: Jw
}, Symbol.toStringTag, { value: "Module" })), dj = "余额明细", uj = "佣金明细", pj = "暂无余额明细", mj = "暂无提现明细", _j = "暂无佣金明细", _5e = {
  balanceDetail: dj,
  commissionDetail: uj,
  balanceEmptyTip: pj,
  moneyEmptyTip: mj,
  commissionEmptyTip: _j
}, g5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  balanceDetail: dj,
  balanceEmptyTip: pj,
  commissionDetail: uj,
  commissionEmptyTip: _j,
  default: _5e,
  moneyEmptyTip: mj
}, Symbol.toStringTag, { value: "Module" })), h5e = {}, f5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: h5e
}, Symbol.toStringTag, { value: "Module" })), y5e = {}, $5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: y5e
}, Symbol.toStringTag, { value: "Module" })), v5e = {}, b5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: v5e
}, Symbol.toStringTag, { value: "Module" })), T5e = {}, P5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: T5e
}, Symbol.toStringTag, { value: "Module" })), S5e = {}, O5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: S5e
}, Symbol.toStringTag, { value: "Module" })), gj = "收货人", hj = "请输入收货人姓名", fj = "手机号码", yj = "请输入手机号码", $j = "收货地址", vj = "选择地址", bj = "请选择地址", Tj = "楼号门牌", Pj = "详细地址如 1单元101", Sj = "请填写门牌号", Oj = "设为默认地址", wj = "修改", w5e = {
  name: gj,
  namePlaceholder: hj,
  mobile: fj,
  mobilePlaceholder: yj,
  deliveryAddress: $j,
  selectAddress: vj,
  selectAddressPlaceholder: bj,
  address: Tj,
  addressPlaceholder: Pj,
  addressError: Sj,
  defaultAddress: Oj,
  update: wj
}, j5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Tj,
  addressError: Sj,
  addressPlaceholder: Pj,
  default: w5e,
  defaultAddress: Oj,
  deliveryAddress: $j,
  mobile: fj,
  mobilePlaceholder: yj,
  name: gj,
  namePlaceholder: hj,
  selectAddress: vj,
  selectAddressPlaceholder: bj,
  update: wj
}, Symbol.toStringTag, { value: "Module" })), jj = "昵称", kj = "性别", Cj = "手机号", Mj = "生日", Aj = "未知", Ij = "头像", Nj = "更换头像", Dj = "修改昵称", zj = "男", xj = "女", k5e = {
  nickname: jj,
  sex: kj,
  mobile: Cj,
  birthday: Mj,
  unknown: Aj,
  headimg: Ij,
  updateHeadimg: Nj,
  updateNickname: Dj,
  man: zj,
  woman: xj
}, C5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  birthday: Mj,
  default: k5e,
  headimg: Ij,
  man: zj,
  mobile: Cj,
  nickname: jj,
  sex: kj,
  unknown: Aj,
  updateHeadimg: Nj,
  updateNickname: Dj,
  woman: xj
}, Symbol.toStringTag, { value: "Module" })), M5e = {}, A5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: M5e
}, Symbol.toStringTag, { value: "Module" })), I5e = {}, N5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: I5e
}, Symbol.toStringTag, { value: "Module" })), D5e = {}, z5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: D5e
}, Symbol.toStringTag, { value: "Module" })), Ej = "充值记录", Rj = "暂无充值记录", x5e = {
  rechargeRecord: Ej,
  emptyTip: Rj
}, E5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: x5e,
  emptyTip: Rj,
  rechargeRecord: Ej
}, Symbol.toStringTag, { value: "Module" })), Fj = "订单编号", Hj = "创建时间", R5e = {
  orderNo: Fj,
  createTime: Hj
}, F5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: Hj,
  default: R5e,
  orderNo: Fj
}, Symbol.toStringTag, { value: "Module" })), H5e = {}, L5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: H5e
}, Symbol.toStringTag, { value: "Module" })), Lj = "充值", Bj = "提现", Uj = "余额明细", Wj = "账户余额（元）", qj = "余额（元）", Gj = "可提现余额（元）", Vj = "可用余额", Yj = "元", B5e = {
  recharge: Lj,
  cashOut: Bj,
  balanceDetail: Uj,
  accountBalance: Wj,
  balance: qj,
  money: Gj,
  availableBalance: Vj,
  yuan: Yj
}, U5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: Wj,
  availableBalance: Vj,
  balance: qj,
  balanceDetail: Uj,
  cashOut: Bj,
  default: B5e,
  money: Gj,
  recharge: Lj,
  yuan: Yj
}, Symbol.toStringTag, { value: "Module" })), Kj = "订单管理", Qj = "全部已读", Xj = "评论", Jj = "收藏", Zj = "关注", ek = "TA的新动态", ok = "暂无新消息", tk = "师傅", nk = "上线啦", sk = "优惠券", rk = "订单消息", ak = "消息", ck = "待接单", W5e = {
  order_manger: Kj,
  all_read: Qj,
  comment: Xj,
  fav: Jj,
  focus: Zj,
  discover: ek,
  no_message: ok,
  technician: tk,
  online: nk,
  coupon: sk,
  order_message: rk,
  page_title: ak,
  wait_talk_order: ck
}, q5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all_read: Qj,
  comment: Xj,
  coupon: sk,
  default: W5e,
  discover: ek,
  fav: Jj,
  focus: Zj,
  no_message: ok,
  online: nk,
  order_manger: Kj,
  order_message: rk,
  page_title: ak,
  technician: tk,
  wait_talk_order: ck
}, Symbol.toStringTag, { value: "Module" })), ik = "优惠券", lk = "已读", dk = "暂无信息", uk = "师傅订单通知", pk = "消息中心", mk = "消息已读", G5e = {
  coupon: ik,
  readed: lk,
  no_message: dk,
  message_push: uk,
  page_title: pk,
  message_reded: mk
}, V5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coupon: ik,
  default: G5e,
  message_push: uk,
  message_reded: mk,
  no_message: dk,
  page_title: pk,
  readed: lk
}, Symbol.toStringTag, { value: "Module" })), _k = "全部", gk = "暂无订单", hk = "订单号", fk = "待支付", yk = "暂无待支付订单", $k = "待接单", vk = "已完成", bk = "暂无已完成订单", Tk = "已拒绝", Pk = "已支付", Sk = "已取消", Ok = "退款审核中", wk = "已退款", jk = "未知状态", kk = "预约时间", Ck = "实际支付", Mk = "审核退款", Ak = "已退款", Ik = "退款中", Nk = "暂无已关闭订单", Dk = "立即接单", zk = "立即转单", xk = "暂无待接订单", Ek = "待服务", Rk = "暂无待服务订单", Fk = "审核退款", Hk = "开始服务", Lk = "服务中", Bk = "暂无服务中订单", Uk = "订单管理", Wk = "已拒绝退款", qk = "再来一单", Gk = "优惠", Vk = "关闭订单", Yk = "申请退款", Kk = "立即支付", Qk = "评价", Xk = "已评价", Jk = "总计", Zk = "联系师傅", eC = "拒绝理由", oC = "请登录", tC = "确认关闭订单", nC = "您确定要关闭这个订单吗？", sC = "关闭订单成功", rC = "删除成功", aC = "删除失败", Y5e = {
  all: _k,
  no_order: gk,
  order_number: hk,
  wait_pay: fk,
  no_pay_order: yk,
  wait_talk_order: $k,
  complate: vk,
  no_complate_order: bk,
  no_talk_order: Tk,
  payed: Pk,
  cancel: Sk,
  refund_check: Ok,
  redfund: wk,
  unknow: jk,
  date_time: kk,
  pay_real: Ck,
  check_refund: Mk,
  refund_money: Ak,
  refund_ing: Ik,
  no_closed_order: Nk,
  resver_order: Dk,
  trans_order: zk,
  no_talk_order_tips: xk,
  wait_service: Ek,
  no_wait_service: Rk,
  check_redund_money: Fk,
  start_service: Hk,
  service_ing: Lk,
  no_service_ing: Bk,
  order_manger: Uk,
  no_refund_money: Wk,
  delete: "删除",
  repeat: qk,
  sales: Gk,
  closed_order: Vk,
  apply_refund: Yk,
  now_pay: Kk,
  comment: Qk,
  commented: Xk,
  total: Jk,
  contact_technician: Zk,
  no_check_reson: eC,
  login_tips: oC,
  confirm_close_title: tC,
  confirm_repeat_tips: nC,
  close_success: sC,
  delete_success: rC,
  delete_fail: aC
}, K5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: _k,
  apply_refund: Yk,
  cancel: Sk,
  check_redund_money: Fk,
  check_refund: Mk,
  close_success: sC,
  closed_order: Vk,
  comment: Qk,
  commented: Xk,
  complate: vk,
  confirm_close_title: tC,
  confirm_repeat_tips: nC,
  contact_technician: Zk,
  date_time: kk,
  default: Y5e,
  delete_fail: aC,
  delete_success: rC,
  login_tips: oC,
  no_check_reson: eC,
  no_closed_order: Nk,
  no_complate_order: bk,
  no_order: gk,
  no_pay_order: yk,
  no_refund_money: Wk,
  no_service_ing: Bk,
  no_talk_order: Tk,
  no_talk_order_tips: xk,
  no_wait_service: Rk,
  now_pay: Kk,
  order_manger: Uk,
  order_number: hk,
  pay_real: Ck,
  payed: Pk,
  redfund: wk,
  refund_check: Ok,
  refund_ing: Ik,
  refund_money: Ak,
  repeat: qk,
  resver_order: Dk,
  sales: Gk,
  service_ing: Lk,
  start_service: Hk,
  total: Jk,
  trans_order: zk,
  unknow: jk,
  wait_pay: fk,
  wait_service: Ek,
  wait_talk_order: $k
}, Symbol.toStringTag, { value: "Module" })), cC = "订单详情", iC = "数据加载中,请稍候", lC = "未接单", dC = "待出发", uC = "待到达", pC = "待服务", mC = "服务中", _C = "服务完成", gC = "自动好评并结束", hC = "订单结束", fC = "师傅", yC = "接单", $C = "出发", vC = "到达", bC = "开始服务", TC = "服务时间", PC = "服务倒计时", SC = "服务内容", OC = "服务时长", wC = "分钟", jC = "服务", kC = "实际支付", CC = "费用总计", MC = "下单人", AC = "联系方式", IC = "联系Ta", NC = "联系客服", DC = "升级加钟", zC = "小程序客服", xC = "微信客服", EC = "电话联系", RC = "服务地址", FC = "下单时间", HC = "车费详情", LC = "出租车 全程", BC = "公里", UC = "出行费用", WC = "项目费用", qC = "申请退款", GC = "优惠金额", VC = "支付方式", YC = "微信支付", KC = "支付宝支付", QC = "余额支付", XC = "线下支付", JC = "总计", ZC = "订单编号", eM = "复制", oM = "联系客户", tM = "拒绝接单", nM = "立即接单", sM = "立即出发", rM = "拍照确认到达", aM = "拍照完成服务", cM = "确认完成", iM = "拍照打卡", lM = "当前位置", dM = "取消", uM = "确定", pM = "确认到达", mM = "项目", _M = "价格", gM = "数量", hM = "状态", fM = "上传完成照片", yM = "上传目的地照片", $M = "位置更新中请稍候...", vM = "获取位置失败", bM = "正在处理...", TM = "余额不足", PM = "响应数据格式错误", SM = "请求失败", OM = "加载失败", wM = "上传失败", jM = "确认接收订单", kM = "您确定要接收这个订单吗?", CM = "接单成功", MM = "已成功出发", AM = "确认拒绝订单", IM = "您确定要拒绝这个订单吗？", NM = "已拒绝该订单", DM = "上传中", zM = "请上传到达照片", xM = "到达打卡成功", EM = "订单退款中，无法开始服务", RM = "未获得开始服务时间", FM = "录音已开启,现在开始进入全程录音状态", HM = "请上传完成服务的照片", LM = "服务已完成", BM = "录音已停止", UM = "已完成", WM = "退款中", qM = "加钟订单", GM = "已退款", VM = "退款申请已被拒绝", YM = "重写", KM = "确认", QM = "请在此处签名", XM = "当前项目", JM = "项目时长", ZM = "当前项目加钟", eA = "选择其他项目", oA = "平台关闭了", tA = "联系方式，请点击下方联系客服", nA = "正在保存签名", sA = "签名上传失败", rA = "签名生成失败", aA = "核销码", cA = "周一至周六可用.至少提前1小时预约", iA = "随时退.过期退.可赠送好友", lA = "预约后,方可到店使用", dA = "需提前1小时预约", uA = "券号", pA = "服务门店", mA = "该订单已核销", _A = "导航前往", gA = "电话预约", hA = "支付后可", fA = "请于下单后的30天内到店核销", Q5e = {
  order_detail: cC,
  data_loading: iC,
  no_talk_order: lC,
  wait_go_out: dC,
  wait_rech: uC,
  wait_service: pC,
  service_ing: mC,
  service_complate: _C,
  auto_comment: gC,
  order_over: hC,
  technician: fC,
  talk_order: yC,
  go_out: $C,
  rech: vC,
  start_service: bC,
  service_date_time: TC,
  service_timed: PC,
  service_content: SC,
  service_time: OC,
  minuts: wC,
  service: jC,
  real_pay: kC,
  order_money: CC,
  order_prson: MC,
  contact: AC,
  contact_ta: IC,
  content_kefu: NC,
  add_clock: DC,
  minwechat: zC,
  wechat_kefu: xC,
  contact_phone: EC,
  service_address: RC,
  order_create_time: FC,
  car_money_detail: HC,
  taix: LC,
  km: BC,
  travel_price: UC,
  goods_price: WC,
  apply_refund: qC,
  order_sales_money: GC,
  pay_type: VC,
  weachtpay: YC,
  alipay: KC,
  balancepay: QC,
  offlinepay: XC,
  total: JC,
  order_number: ZC,
  copy: eM,
  contact_custom: oM,
  no_rech_order: tM,
  book_now: nM,
  now_go_out: sM,
  upload_img_rech: rM,
  upload_img_complate: aM,
  confirm_complate: cM,
  images_complate: iM,
  location: lM,
  cancel: dM,
  confirm: uM,
  confirm_rech: pM,
  project: mM,
  price: _M,
  number: gM,
  status: hM,
  upload_complate_img: fM,
  upload_rech_img: yM,
  location_update: $M,
  location_get_fail: vM,
  ing_update: bM,
  blacen_no: TM,
  data_type_error: PM,
  get_fail: SM,
  loading_fail: OM,
  upload_fail: wM,
  confirm_rec_order: jM,
  confirm_order: kM,
  rec_order_success: CM,
  success_go_out: MM,
  confirm_no_rech_order: AM,
  rech_no_order_tips: IM,
  no_reched: NM,
  uploading: DM,
  upload_rech_tips: zM,
  rech_success_tips: xM,
  refund_order_no_service: EM,
  no_start_time: RM,
  recvoe_voice_tips: FM,
  upload_complate_img_tips: HM,
  complated: LM,
  voice_stop: BM,
  complate: UM,
  refund_ing: WM,
  add_order: qM,
  refunded: GM,
  refunded_no: VM,
  repeat_write: YM,
  confirm_true: KM,
  sign_name: QM,
  self_goods: XM,
  goods_time_du: JM,
  self_goods_add_clock: ZM,
  select_other: eA,
  platform_closed: oA,
  contact_type: tA,
  ing_save_sign: nA,
  sign_upload_fail: sA,
  sign_create_fail: rA,
  verfiyCodeTitle: aA,
  mondyTips: cA,
  shareFrend: iA,
  gohomTips: lA,
  frontTips: dA,
  verfiyNumber: uA,
  serviceStore: pA,
  verfiyWriteOn: mA,
  openMap: _A,
  callPhone: gA,
  payAfter: hA,
  verifyTips: fA
}, X5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add_clock: DC,
  add_order: qM,
  alipay: KC,
  apply_refund: qC,
  auto_comment: gC,
  balancepay: QC,
  blacen_no: TM,
  book_now: nM,
  callPhone: gA,
  cancel: dM,
  car_money_detail: HC,
  complate: UM,
  complated: LM,
  confirm: uM,
  confirm_complate: cM,
  confirm_no_rech_order: AM,
  confirm_order: kM,
  confirm_rec_order: jM,
  confirm_rech: pM,
  confirm_true: KM,
  contact: AC,
  contact_custom: oM,
  contact_phone: EC,
  contact_ta: IC,
  contact_type: tA,
  content_kefu: NC,
  copy: eM,
  data_loading: iC,
  data_type_error: PM,
  default: Q5e,
  frontTips: dA,
  get_fail: SM,
  go_out: $C,
  gohomTips: lA,
  goods_price: WC,
  goods_time_du: JM,
  images_complate: iM,
  ing_save_sign: nA,
  ing_update: bM,
  km: BC,
  loading_fail: OM,
  location: lM,
  location_get_fail: vM,
  location_update: $M,
  minuts: wC,
  minwechat: zC,
  mondyTips: cA,
  no_rech_order: tM,
  no_reched: NM,
  no_start_time: RM,
  no_talk_order: lC,
  now_go_out: sM,
  number: gM,
  offlinepay: XC,
  openMap: _A,
  order_create_time: FC,
  order_detail: cC,
  order_money: CC,
  order_number: ZC,
  order_over: hC,
  order_prson: MC,
  order_sales_money: GC,
  payAfter: hA,
  pay_type: VC,
  platform_closed: oA,
  price: _M,
  project: mM,
  real_pay: kC,
  rec_order_success: CM,
  rech: vC,
  rech_no_order_tips: IM,
  rech_success_tips: xM,
  recvoe_voice_tips: FM,
  refund_ing: WM,
  refund_order_no_service: EM,
  refunded: GM,
  refunded_no: VM,
  repeat_write: YM,
  select_other: eA,
  self_goods: XM,
  self_goods_add_clock: ZM,
  service: jC,
  serviceStore: pA,
  service_address: RC,
  service_complate: _C,
  service_content: SC,
  service_date_time: TC,
  service_ing: mC,
  service_time: OC,
  service_timed: PC,
  shareFrend: iA,
  sign_create_fail: rA,
  sign_name: QM,
  sign_upload_fail: sA,
  start_service: bC,
  status: hM,
  success_go_out: MM,
  taix: LC,
  talk_order: yC,
  technician: fC,
  total: JC,
  travel_price: UC,
  upload_complate_img: fM,
  upload_complate_img_tips: HM,
  upload_fail: wM,
  upload_img_complate: aM,
  upload_img_rech: rM,
  upload_rech_img: yM,
  upload_rech_tips: zM,
  uploading: DM,
  verfiyCodeTitle: aA,
  verfiyNumber: uA,
  verfiyWriteOn: mA,
  verifyTips: fA,
  voice_stop: BM,
  wait_go_out: dC,
  wait_rech: uC,
  wait_service: pC,
  weachtpay: YC,
  wechat_kefu: xC
}, Symbol.toStringTag, { value: "Module" })), J5e = {}, Z5e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: J5e
}, Symbol.toStringTag, { value: "Module" })), yA = "上门服务", $A = "请选择服务地址", vA = "到店服务", bA = "即将开放，敬请期待", TA = "物料费", PA = "已选", SA = "师傅", OA = "服务类型", wA = "人/小时", jA = "小时", kA = "人", CA = "服务费", MA = "次", AA = "人数", IA = "服务时长", NA = "带 * 为必填项", DA = "车费", zA = "加钟订单", xA = "全程共", EA = "公里，出租车出行", RA = "公里以内", FA = "元，里程计价", HA = "元/公里", LA = "公里内免出行费", BA = "上门时间", UA = "出行方式", WA = "优惠券", qA = " 张优惠券可用", GA = "暂无优惠券", VA = "优惠金额", YA = "订单备注", KA = "选填", QA = "请输入备注内容", XA = "总计", JA = "合同签署", ZA = "提交订单", eI = "选择时间", oI = "没有可预约时间，请选择其他", tI = "可预约", nI = "不可预约", sI = "当天已无可预约时间，请选择其他日期", rI = "选择优惠券", aI = "选择使用", cI = "订单满", iI = "元可使用", lI = "有效期", dI = "至", uI = "无门槛券，全场通用", pI = "商品券，指定商品可用", mI = "品类券，指定类目可用", _I = "请阅读合同", gI = "立即签署", hI = "线下签署", fI = "请在此处签名", yI = "重写", $I = "确认", vI = "请填写合同信息", bI = "请输入", TI = "保存并继续", PI = "网约车/出租车(双程)", SI = "公交地铁", OI = "请先签署合同后再提交订单", wI = "订单提交失败", jI = "推送订单给", kI = "失败", CI = "未选择服务项目", MI = "提示", AI = "请先绑定手机号", II = "今日地图配额已达到上限,无法计算车费", NI = "今天", DI = "合同签署成功", zI = "合同签署失败", xI = "请先阅读合同内容", EI = "请填写所有必填项", RI = "正在保存签名", FI = "签名上传失败", HI = "上传失败", LI = "签名生成失败", BI = "待生成", eUe = {
  gohome: yA,
  selectAddress: $A,
  goStore: vA,
  wait_tips: bA,
  me_money: TA,
  selected: PA,
  technician: SA,
  service_type: OA,
  unit: wA,
  hours: jA,
  person: kA,
  service_money: CA,
  one: MA,
  person_num: AA,
  service_time: IA,
  form_rules_tips: NA,
  carMoney: DA,
  addClockOrder: zA,
  all_mi_total: xA,
  kmAndTaxi: EA,
  kmIn: RA,
  cnyMiPrice: FA,
  cnyKm: HA,
  free_tips: LA,
  goHomeTime: BA,
  travelType: UA,
  coupon: WA,
  canCoupon: qA,
  noCoupon: GA,
  salesMoney: VA,
  orderMem: YA,
  nonly: KA,
  placeHodel: QA,
  total: XA,
  contoct_sign: JA,
  confirm_order: ZA,
  selectTime: eI,
  noTime: oI,
  canWork: tI,
  noWork: nI,
  toDayNoTime: sI,
  selectCoupon: rI,
  selcetUse: aI,
  orderOverfllow: cI,
  canUse: iI,
  Validity: lI,
  goTo: dI,
  General: uI,
  goodsCoupon: pI,
  categoryCoupon: mI,
  readContont: _I,
  signNow: gI,
  offlineSign: hI,
  signName: fI,
  repeatWrite: yI,
  confirmSign: $I,
  contactTitle: vI,
  placeContact: bI,
  saveContunis: TI,
  carTips: PI,
  bus: SI,
  firstContactTips: OI,
  orderPostFail: wI,
  orderPushTo: jI,
  fail: kI,
  noSelectGoods: CI,
  tips: MI,
  firstBindMobile: AI,
  mapKeyTips: II,
  today: NI,
  signContactSuccess: DI,
  signContactFail: zI,
  firstReadContactContent: xI,
  writeRulesTips: EI,
  saveSign: RI,
  signUploadFail: FI,
  uploadFail: HI,
  signCreateFail: LI,
  waitCreate: BI
}, oUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  General: uI,
  Validity: lI,
  addClockOrder: zA,
  all_mi_total: xA,
  bus: SI,
  canCoupon: qA,
  canUse: iI,
  canWork: tI,
  carMoney: DA,
  carTips: PI,
  categoryCoupon: mI,
  cnyKm: HA,
  cnyMiPrice: FA,
  confirmSign: $I,
  confirm_order: ZA,
  contactTitle: vI,
  contoct_sign: JA,
  coupon: WA,
  default: eUe,
  fail: kI,
  firstBindMobile: AI,
  firstContactTips: OI,
  firstReadContactContent: xI,
  form_rules_tips: NA,
  free_tips: LA,
  goHomeTime: BA,
  goStore: vA,
  goTo: dI,
  gohome: yA,
  goodsCoupon: pI,
  hours: jA,
  kmAndTaxi: EA,
  kmIn: RA,
  mapKeyTips: II,
  me_money: TA,
  noCoupon: GA,
  noSelectGoods: CI,
  noTime: oI,
  noWork: nI,
  nonly: KA,
  offlineSign: hI,
  one: MA,
  orderMem: YA,
  orderOverfllow: cI,
  orderPostFail: wI,
  orderPushTo: jI,
  person: kA,
  person_num: AA,
  placeContact: bI,
  placeHodel: QA,
  readContont: _I,
  repeatWrite: yI,
  salesMoney: VA,
  saveContunis: TI,
  saveSign: RI,
  selcetUse: aI,
  selectAddress: $A,
  selectCoupon: rI,
  selectTime: eI,
  selected: PA,
  service_money: CA,
  service_time: IA,
  service_type: OA,
  signContactFail: zI,
  signContactSuccess: DI,
  signCreateFail: LI,
  signName: fI,
  signNow: gI,
  signUploadFail: FI,
  technician: SA,
  tips: MI,
  toDayNoTime: sI,
  today: NI,
  total: XA,
  travelType: UA,
  unit: wA,
  uploadFail: HI,
  waitCreate: BI,
  wait_tips: bA,
  writeRulesTips: EI
}, Symbol.toStringTag, { value: "Module" })), UI = "上门服务", WI = "请选择服务地址", qI = "到店服务", GI = "即将开放，敬请期待", VI = "物料费", YI = "已选", KI = "师傅", QI = "服务类型", XI = "人/小时", JI = "小时", ZI = "人", eN = "服务费", oN = "次", tN = "人数", nN = "服务时长", sN = "带 * 为必填项", rN = "车费", aN = "加钟订单", cN = "全程共", iN = "公里，出租车出行", lN = "公里以内", dN = "元，里程计价", uN = "元/公里", pN = "公里内免出行费", mN = "上门时间", _N = "出行方式", gN = "优惠券", hN = " 张优惠券可用", fN = "优惠金额", yN = "订单备注", $N = "选填", vN = "请输入备注内容", bN = "总计", TN = "合同签署", PN = "提交订单", SN = "选择时间", ON = "没有可预约时间，请选择其他", wN = "可预约", jN = "不可预约", kN = "当天已无可预约时间，请选择其他日期", CN = "选择优惠券", MN = "选择使用", AN = "订单满", IN = "元可使用", NN = "有效期", DN = "至", zN = "无门槛券，全场通用", xN = "商品券，指定商品可用", EN = "品类券，指定类目可用", RN = "暂无优惠券", FN = "请阅读合同", HN = "立即签署", LN = "线下签署", BN = "请在此处签名", UN = "重写", WN = "确认", qN = "请填写合同信息", GN = "请输入", VN = "保存并继续", YN = "网约车/出租车(双程)", KN = "公交地铁", QN = "请先签署合同后再提交订单", XN = "订单提交失败", JN = "推送订单给", ZN = "失败", eD = "未选择服务项目", oD = "提示", tD = "请先绑定手机号", nD = "今日地图配额已达到上限,无法计算车费", sD = "今天", rD = "合同签署成功", aD = "合同签署失败", cD = "请先阅读合同内容", iD = "请填写所有必填项", lD = "正在保存签名", dD = "签名上传失败", uD = "上传失败", pD = "签名生成失败", mD = "待生成", _D = "本项目为到店核销,由以下商家为您提供服务:", gD = "地址", hD = "电话", fD = "门店", yD = "支付后可联系", $D = "联系方式", vD = "姓名", bD = "请输入联系人姓名", TD = "电话", PD = "请输入联系电话", SD = "确定", tUe = {
  gohome: UI,
  selectAddress: WI,
  goStore: qI,
  wait_tips: GI,
  me_money: VI,
  selected: YI,
  technician: KI,
  service_type: QI,
  unit: XI,
  hours: JI,
  person: ZI,
  service_money: eN,
  one: oN,
  person_num: tN,
  service_time: nN,
  form_rules_tips: sN,
  carMoney: rN,
  addClockOrder: aN,
  all_mi_total: cN,
  kmAndTaxi: iN,
  kmIn: lN,
  cnyMiPrice: dN,
  cnyKm: uN,
  free_tips: pN,
  goHomeTime: mN,
  travelType: _N,
  coupon: gN,
  canCoupon: hN,
  salesMoney: fN,
  orderMem: yN,
  nonly: $N,
  placeHodel: vN,
  total: bN,
  contoct_sign: TN,
  confirm_order: PN,
  selectTime: SN,
  noTime: ON,
  canWork: wN,
  noWork: jN,
  toDayNoTime: kN,
  selectCoupon: CN,
  selcetUse: MN,
  orderOverfllow: AN,
  canUse: IN,
  Validity: NN,
  goTo: DN,
  General: zN,
  goodsCoupon: xN,
  categoryCoupon: EN,
  noCoupon: RN,
  readContont: FN,
  signNow: HN,
  offlineSign: LN,
  signName: BN,
  repeatWrite: UN,
  confirmSign: WN,
  contactTitle: qN,
  placeContact: GN,
  saveContunis: VN,
  carTips: YN,
  bus: KN,
  firstContactTips: QN,
  orderPostFail: XN,
  orderPushTo: JN,
  fail: ZN,
  noSelectGoods: eD,
  tips: oD,
  firstBindMobile: tD,
  mapKeyTips: nD,
  today: sD,
  signContactSuccess: rD,
  signContactFail: aD,
  firstReadContactContent: cD,
  writeRulesTips: iD,
  saveSign: lD,
  signUploadFail: dD,
  uploadFail: uD,
  signCreateFail: pD,
  waitCreate: mD,
  storeInfo: _D,
  storeAddress: gD,
  storePhone: hD,
  storename: fD,
  payAfterContact: yD,
  contactPorson: $D,
  contactPorsonName: vD,
  placeNamePlaceholder: bD,
  contactPhone: TD,
  placeContacePlaceholder: PD,
  confirmBtn: SD
}, nUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  General: zN,
  Validity: NN,
  addClockOrder: aN,
  all_mi_total: cN,
  bus: KN,
  canCoupon: hN,
  canUse: IN,
  canWork: wN,
  carMoney: rN,
  carTips: YN,
  categoryCoupon: EN,
  cnyKm: uN,
  cnyMiPrice: dN,
  confirmBtn: SD,
  confirmSign: WN,
  confirm_order: PN,
  contactPhone: TD,
  contactPorson: $D,
  contactPorsonName: vD,
  contactTitle: qN,
  contoct_sign: TN,
  coupon: gN,
  default: tUe,
  fail: ZN,
  firstBindMobile: tD,
  firstContactTips: QN,
  firstReadContactContent: cD,
  form_rules_tips: sN,
  free_tips: pN,
  goHomeTime: mN,
  goStore: qI,
  goTo: DN,
  gohome: UI,
  goodsCoupon: xN,
  hours: JI,
  kmAndTaxi: iN,
  kmIn: lN,
  mapKeyTips: nD,
  me_money: VI,
  noCoupon: RN,
  noSelectGoods: eD,
  noTime: ON,
  noWork: jN,
  nonly: $N,
  offlineSign: LN,
  one: oN,
  orderMem: yN,
  orderOverfllow: AN,
  orderPostFail: XN,
  orderPushTo: JN,
  payAfterContact: yD,
  person: ZI,
  person_num: tN,
  placeContacePlaceholder: PD,
  placeContact: GN,
  placeHodel: vN,
  placeNamePlaceholder: bD,
  readContont: FN,
  repeatWrite: UN,
  salesMoney: fN,
  saveContunis: VN,
  saveSign: lD,
  selcetUse: MN,
  selectAddress: WI,
  selectCoupon: CN,
  selectTime: SN,
  selected: YI,
  service_money: eN,
  service_time: nN,
  service_type: QI,
  signContactFail: aD,
  signContactSuccess: rD,
  signCreateFail: pD,
  signName: BN,
  signNow: HN,
  signUploadFail: dD,
  storeAddress: gD,
  storeInfo: _D,
  storePhone: hD,
  storename: fD,
  technician: KI,
  tips: oD,
  toDayNoTime: kN,
  today: sD,
  total: bN,
  travelType: _N,
  unit: XI,
  uploadFail: uD,
  waitCreate: mD,
  wait_tips: GI,
  writeRulesTips: iD
}, Symbol.toStringTag, { value: "Module" })), sUe = {}, rUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sUe
}, Symbol.toStringTag, { value: "Module" })), aUe = {}, cUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: aUe
}, Symbol.toStringTag, { value: "Module" })), iUe = {}, lUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: iUe
}, Symbol.toStringTag, { value: "Module" })), dUe = {}, uUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dUe
}, Symbol.toStringTag, { value: "Module" })), pUe = {}, mUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pUe
}, Symbol.toStringTag, { value: "Module" })), _Ue = {}, gUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _Ue
}, Symbol.toStringTag, { value: "Module" })), hUe = {}, fUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hUe
}, Symbol.toStringTag, { value: "Module" })), OD = "立即退款", wD = "与商家协商一致退款", jD = "扣空单费", kD = "已接单且出发或到达服务地点，申请退款，需扣除", CD = "扣空单费 + 车费", MD = "元空单费", AD = "平台强制要求或", ID = "到达后，申请退款，需扣除", ND = "车费", DD = "加钟订单无车费", zD = "扣车费", xD = "已接单，且已出发或到达，需扣除车费", ED = "退全款", RD = "未接单的状态下，需退款，可退全款", FD = "订单状态", HD = "未接单", LD = "已接单，未出发", BD = "已出发", UD = "拒绝", WD = "优惠金额", qD = "最多可退", GD = "退款原因", VD = "请选择", YD = "上传凭证", KD = "选填", QD = "补充描述", XD = "补充描述,有助于更好的处理售后问题", JD = "提交", ZD = "确定", ez = "退款/赔付", oz = "请选择退款原因", tz = "退款金额不能为0,保留两位小数", nz = "退款金额不能大于可退款总额", yUe = {
  book_now: OD,
  refund_tips: wD,
  deduction: jD,
  deduction_tips: kD,
  deductionAndCarMoney: CD,
  cnyDeduction: MD,
  platformTips: AD,
  rechTips: ID,
  carPrice: ND,
  addClockTips: DD,
  deductionCar: zD,
  talkOrderTips: xD,
  allDeduction: ED,
  noTalkOrder: RD,
  orderType: FD,
  noTalkOrderStatus: HD,
  talkOrderNoRech: LD,
  goOutStatus: BD,
  techJudan: UD,
  salesMoney: WD,
  moreRefund: qD,
  refundReson: GD,
  pleseSeledt: VD,
  upload: YD,
  optional: KD,
  Supplementary: QD,
  description: XD,
  confirm: JD,
  confirmButton: ZD,
  page_title: ez,
  refundTips: oz,
  selectResonTips: tz,
  refundMoneyMoreTips: nz
}, $Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Supplementary: QD,
  addClockTips: DD,
  allDeduction: ED,
  book_now: OD,
  carPrice: ND,
  cnyDeduction: MD,
  confirm: JD,
  confirmButton: ZD,
  deduction: jD,
  deductionAndCarMoney: CD,
  deductionCar: zD,
  deduction_tips: kD,
  default: yUe,
  description: XD,
  goOutStatus: BD,
  moreRefund: qD,
  noTalkOrder: RD,
  noTalkOrderStatus: HD,
  optional: KD,
  orderType: FD,
  page_title: ez,
  platformTips: AD,
  pleseSeledt: VD,
  rechTips: ID,
  refundMoneyMoreTips: nz,
  refundReson: GD,
  refundTips: oz,
  refund_tips: wD,
  salesMoney: WD,
  selectResonTips: tz,
  talkOrderNoRech: LD,
  talkOrderTips: xD,
  techJudan: UD,
  upload: YD
}, Symbol.toStringTag, { value: "Module" })), sz = "推广码", rz = "总业绩", az = "元", cz = "单", iz = "订单量", lz = "佣金累计", dz = "佣金是订单金额，扣除优惠金额及车费后按比例计算。", uz = "绑定渠道商", pz = "直招渠道,获利更多", mz = "推广订单", _z = "暂无订单", gz = "订单编号", hz = "项目名称", fz = "服务", yz = "师傅", $z = "订单金额", vz = "推广佣金", bz = "业务员中心", vUe = {
  shareCode: sz,
  totalMoney: rz,
  cny: az,
  orderNum: cz,
  orderCount: iz,
  commsionTotal: lz,
  salesManDescription: dz,
  bindChannel: uz,
  moreShare: pz,
  shareOrder: mz,
  noOrderData: _z,
  orderNumber: gz,
  goodsTitle: hz,
  serviceNmae: fz,
  technician: yz,
  orderMoney: $z,
  shareCommsion: vz,
  pageTitle: bz
}, bUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bindChannel: uz,
  cny: az,
  commsionTotal: lz,
  default: vUe,
  goodsTitle: hz,
  moreShare: pz,
  noOrderData: _z,
  orderCount: iz,
  orderMoney: $z,
  orderNum: cz,
  orderNumber: gz,
  pageTitle: bz,
  salesManDescription: dz,
  serviceNmae: fz,
  shareCode: sz,
  shareCommsion: vz,
  shareOrder: mz,
  technician: yz,
  totalMoney: rz
}, Symbol.toStringTag, { value: "Module" })), Tz = "您已的入驻申请已提交，请等待审核！", Pz = "您已是业务员，请登录业务员中心!", Sz = "姓名", Oz = "请输入您的姓名", wz = "手机号", jz = "请输入您的手机号", kz = "请留意陌生号码或有微信添加请及时沟通，24小时内我司会与您联系！", Cz = "申请已提交，请等候我们联系您！", TUe = {
  checkTips: Tz,
  salesManedTips: Pz,
  name: Sz,
  namePlace: Oz,
  mobile: wz,
  placeModel: jz,
  plateformTips: kz,
  applyTips: Cz
}, PUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTips: Cz,
  checkTips: Tz,
  default: TUe,
  mobile: wz,
  name: Sz,
  namePlace: Oz,
  placeModel: jz,
  plateformTips: kz,
  salesManedTips: Pz
}, Symbol.toStringTag, { value: "Module" })), SUe = {}, OUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SUe
}, Symbol.toStringTag, { value: "Module" })), Mz = "个人设置", Az = "切换语言", Iz = "版本号", Nz = "退出登录", wUe = {
  personalSettings: Mz,
  switchLang: Az,
  version: Iz,
  logout: Nz
}, jUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wUe,
  logout: Nz,
  personalSettings: Mz,
  switchLang: Az,
  version: Iz
}, Symbol.toStringTag, { value: "Module" })), kUe = {}, CUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kUe
}, Symbol.toStringTag, { value: "Module" })), MUe = {}, AUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MUe
}, Symbol.toStringTag, { value: "Module" })), IUe = {}, NUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IUe
}, Symbol.toStringTag, { value: "Module" })), DUe = {}, zUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DUe
}, Symbol.toStringTag, { value: "Module" })), xUe = {}, EUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xUe
}, Symbol.toStringTag, { value: "Module" })), RUe = {}, FUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RUe
}, Symbol.toStringTag, { value: "Module" })), Dz = "评分", zz = "分", xz = "好评率", Ez = "营业时间", Rz = "立即下单", Fz = "暂无门店", Hz = "商家", Lz = "全部", Bz = "欢迎来到", Uz = "自营", Wz = "没有任何项目", HUe = {
  commentScore: Dz,
  score: zz,
  commentGood: xz,
  workTime: Ez,
  book_now: Rz,
  noData: Fz,
  pageTitle: Hz,
  all: Lz,
  welcome: Bz,
  self: Uz,
  nodata: Wz
}, LUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: Lz,
  book_now: Rz,
  commentGood: xz,
  commentScore: Dz,
  default: HUe,
  noData: Fz,
  nodata: Wz,
  pageTitle: Hz,
  score: zz,
  self: Uz,
  welcome: Bz,
  workTime: Ez
}, Symbol.toStringTag, { value: "Module" })), qz = "评分", Gz = "分", Vz = "暂无数据", Yz = "营业时间", Kz = "附近门店", Qz = "立即预约", Xz = "全部", BUe = {
  commentScore: qz,
  score: Gz,
  noData: Vz,
  workTime: Yz,
  pageTitle: Kz,
  book_now: Qz,
  all: Xz
}, UUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: Xz,
  book_now: Qz,
  commentScore: qz,
  default: BUe,
  noData: Vz,
  pageTitle: Kz,
  score: Gz,
  workTime: Yz
}, Symbol.toStringTag, { value: "Module" })), Jz = "全部", Zz = "暂无订单", e2 = "订单号", o2 = "待支付", t2 = "待接单", n2 = "已完成", s2 = "暂无已完成订单", r2 = "已拒单", a2 = "已支付", c2 = "已取消", i2 = "退款审核中", l2 = "已退款", d2 = "未知状态", u2 = "预约时间", p2 = "实际支付", m2 = "审核退款", _2 = "已退款", g2 = "立即接单", h2 = "立即转单", f2 = "暂无待接订单", y2 = "待服务", $2 = "暂无待服务订单", v2 = "审核退款", b2 = "开始服务", T2 = "服务中", P2 = "暂无服务中订单", S2 = "订单管理", O2 = "师傅", w2 = "已接单", j2 = "合计", k2 = "上传完成照片", C2 = "上传目的地照片", M2 = "请登录", A2 = "我的订单", WUe = {
  all: Jz,
  no_order: Zz,
  order_number: e2,
  wait_pay: o2,
  wait_talk_order: t2,
  complate: n2,
  noComplateOrder: s2,
  no_talk_order: r2,
  payed: a2,
  cancel: c2,
  refund_check: i2,
  redfund: l2,
  unknow: d2,
  date_time: u2,
  pay_real: p2,
  check_refund: m2,
  refund_money: _2,
  resver_order: g2,
  trans_order: h2,
  no_talk_order_tips: f2,
  wait_service: y2,
  no_wait_service: $2,
  check_redund_money: v2,
  start_service: b2,
  service_ing: T2,
  no_service_ing: P2,
  order_manger: S2,
  technician: O2,
  talkedOrder: w2,
  totalMoney: j2,
  uploadComplateImage: k2,
  uploadRechLocationImage: C2,
  loginTips: M2,
  pageTitle: A2
}, qUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: Jz,
  cancel: c2,
  check_redund_money: v2,
  check_refund: m2,
  complate: n2,
  date_time: u2,
  default: WUe,
  loginTips: M2,
  noComplateOrder: s2,
  no_order: Zz,
  no_service_ing: P2,
  no_talk_order: r2,
  no_talk_order_tips: f2,
  no_wait_service: $2,
  order_manger: S2,
  order_number: e2,
  pageTitle: A2,
  pay_real: p2,
  payed: a2,
  redfund: l2,
  refund_check: i2,
  refund_money: _2,
  resver_order: g2,
  service_ing: T2,
  start_service: b2,
  talkedOrder: w2,
  technician: O2,
  totalMoney: j2,
  trans_order: h2,
  unknow: d2,
  uploadComplateImage: k2,
  uploadRechLocationImage: C2,
  wait_pay: o2,
  wait_service: y2,
  wait_talk_order: t2
}, Symbol.toStringTag, { value: "Module" })), I2 = "订单详情", N2 = "数据加载中,请稍候", D2 = "未接单", z2 = "待出发", x2 = "待到达", E2 = "待服务", R2 = "服务中", F2 = "服务完成", H2 = "自动好评并结束", L2 = "订单结束", B2 = "师傅", U2 = "接单", W2 = "出发", q2 = "到达", G2 = "开始服务", V2 = "服务时间", Y2 = "服务倒计时", K2 = "服务内容", Q2 = "服务时长", X2 = "分钟", J2 = "服务", Z2 = "实际支付", ex = "费用总计", ox = "下单人", tx = "联系方式", nx = "联系Ta", sx = "联系客服", rx = "升级加钟", ax = "小程序客服", cx = "微信客服", ix = "电话联系", lx = "服务地址", dx = "下单时间", ux = "车费详情", px = "出租车 全程", mx = "公里", _x = "出行费用", gx = "项目费用", hx = "申请退款", fx = "优惠金额", yx = "支付方式", $x = "微信支付", vx = "支付宝支付", bx = "余额支付", Tx = "线下支付", Px = "总计", Sx = "订单编号", Ox = "复制", wx = "联系客户", jx = "拒绝接单", kx = "立即接单", Cx = "立即出发", Mx = "拍照确认到达", Ax = "拍照完成服务", Ix = "确认完成", Nx = "拍照打卡", Dx = "当前位置", zx = "取消", xx = "确定", Ex = "确认到达", Rx = "项目", Fx = "价格", Hx = "数量", Lx = "状态", Bx = "上传完成照片", Ux = "上传目的地照片", Wx = "位置更新中请稍候...", qx = "获取位置失败", Gx = "正在处理...", Vx = "余额不足", Yx = "响应数据格式错误", Kx = "请求失败", Qx = "加载失败", Xx = "上传失败", Jx = "确认接收订单", Zx = "您确定要接收这个订单吗?", eE = "接单成功", oE = "已成功出发", tE = "确认拒绝订单", nE = "您确定要拒绝这个订单吗？", sE = "已拒绝该订单", rE = "上传中", aE = "请上传到达照片", cE = "到达打卡成功", iE = "订单退款中，无法开始服务", lE = "未获得开始服务时间", dE = "录音已开启,现在开始进入全程录音状态", uE = "请上传完成服务的照片", pE = "服务已完成", mE = "录音已停止", _E = "已完成", gE = "退款中", hE = "加钟订单", fE = "已退款", yE = "退款申请已被拒绝", $E = "重写", vE = "确认", bE = "请在此处签名", TE = "当前项目", PE = "项目时长", SE = "当前项目加钟", OE = "选择其他项目", wE = "平台关闭了", jE = "联系方式，请点击下方联系客服", kE = "正在保存签名", CE = "签名上传失败", ME = "签名生成失败", AE = "核销码", IE = "周一至周六可用.至少提前1小时预约", NE = "随时退.过期退.可赠送好友", DE = "预约后,方可到店使用", zE = "需提前1小时预约", xE = "券号", EE = "服务门店", RE = "该订单已核销", FE = "导航前往", HE = "电话预约", LE = "支付后可", BE = "请于下单后的30天内到店核销", GUe = {
  order_detail: I2,
  data_loading: N2,
  no_talk_order: D2,
  wait_go_out: z2,
  wait_rech: x2,
  wait_service: E2,
  service_ing: R2,
  service_complate: F2,
  auto_comment: H2,
  order_over: L2,
  technician: B2,
  talk_order: U2,
  go_out: W2,
  rech: q2,
  start_service: G2,
  service_date_time: V2,
  service_timed: Y2,
  service_content: K2,
  service_time: Q2,
  minuts: X2,
  service: J2,
  real_pay: Z2,
  order_money: ex,
  order_prson: ox,
  contact: tx,
  contact_ta: nx,
  content_kefu: sx,
  add_clock: rx,
  minwechat: ax,
  wechat_kefu: cx,
  contact_phone: ix,
  service_address: lx,
  order_create_time: dx,
  car_money_detail: ux,
  taix: px,
  km: mx,
  travel_price: _x,
  goods_price: gx,
  apply_refund: hx,
  order_sales_money: fx,
  pay_type: yx,
  weachtpay: $x,
  alipay: vx,
  balancepay: bx,
  offlinepay: Tx,
  total: Px,
  order_number: Sx,
  copy: Ox,
  contact_custom: wx,
  no_rech_order: jx,
  book_now: kx,
  now_go_out: Cx,
  upload_img_rech: Mx,
  upload_img_complate: Ax,
  confirm_complate: Ix,
  images_complate: Nx,
  location: Dx,
  cancel: zx,
  confirm: xx,
  confirm_rech: Ex,
  project: Rx,
  price: Fx,
  number: Hx,
  status: Lx,
  upload_complate_img: Bx,
  upload_rech_img: Ux,
  location_update: Wx,
  location_get_fail: qx,
  ing_update: Gx,
  blacen_no: Vx,
  data_type_error: Yx,
  get_fail: Kx,
  loading_fail: Qx,
  upload_fail: Xx,
  confirm_rec_order: Jx,
  confirm_order: Zx,
  rec_order_success: eE,
  success_go_out: oE,
  confirm_no_rech_order: tE,
  rech_no_order_tips: nE,
  no_reched: sE,
  uploading: rE,
  upload_rech_tips: aE,
  rech_success_tips: cE,
  refund_order_no_service: iE,
  no_start_time: lE,
  recvoe_voice_tips: dE,
  upload_complate_img_tips: uE,
  complated: pE,
  voice_stop: mE,
  complate: _E,
  refund_ing: gE,
  add_order: hE,
  refunded: fE,
  refunded_no: yE,
  repeat_write: $E,
  confirm_true: vE,
  sign_name: bE,
  self_goods: TE,
  goods_time_du: PE,
  self_goods_add_clock: SE,
  select_other: OE,
  platform_closed: wE,
  contact_type: jE,
  ing_save_sign: kE,
  sign_upload_fail: CE,
  sign_create_fail: ME,
  verfiyCodeTitle: AE,
  mondyTips: IE,
  shareFrend: NE,
  gohomTips: DE,
  frontTips: zE,
  verfiyNumber: xE,
  serviceStore: EE,
  verfiyWriteOn: RE,
  openMap: FE,
  callPhone: HE,
  payAfter: LE,
  verifyTips: BE
}, VUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add_clock: rx,
  add_order: hE,
  alipay: vx,
  apply_refund: hx,
  auto_comment: H2,
  balancepay: bx,
  blacen_no: Vx,
  book_now: kx,
  callPhone: HE,
  cancel: zx,
  car_money_detail: ux,
  complate: _E,
  complated: pE,
  confirm: xx,
  confirm_complate: Ix,
  confirm_no_rech_order: tE,
  confirm_order: Zx,
  confirm_rec_order: Jx,
  confirm_rech: Ex,
  confirm_true: vE,
  contact: tx,
  contact_custom: wx,
  contact_phone: ix,
  contact_ta: nx,
  contact_type: jE,
  content_kefu: sx,
  copy: Ox,
  data_loading: N2,
  data_type_error: Yx,
  default: GUe,
  frontTips: zE,
  get_fail: Kx,
  go_out: W2,
  gohomTips: DE,
  goods_price: gx,
  goods_time_du: PE,
  images_complate: Nx,
  ing_save_sign: kE,
  ing_update: Gx,
  km: mx,
  loading_fail: Qx,
  location: Dx,
  location_get_fail: qx,
  location_update: Wx,
  minuts: X2,
  minwechat: ax,
  mondyTips: IE,
  no_rech_order: jx,
  no_reched: sE,
  no_start_time: lE,
  no_talk_order: D2,
  now_go_out: Cx,
  number: Hx,
  offlinepay: Tx,
  openMap: FE,
  order_create_time: dx,
  order_detail: I2,
  order_money: ex,
  order_number: Sx,
  order_over: L2,
  order_prson: ox,
  order_sales_money: fx,
  payAfter: LE,
  pay_type: yx,
  platform_closed: wE,
  price: Fx,
  project: Rx,
  real_pay: Z2,
  rec_order_success: eE,
  rech: q2,
  rech_no_order_tips: nE,
  rech_success_tips: cE,
  recvoe_voice_tips: dE,
  refund_ing: gE,
  refund_order_no_service: iE,
  refunded: fE,
  refunded_no: yE,
  repeat_write: $E,
  select_other: OE,
  self_goods: TE,
  self_goods_add_clock: SE,
  service: J2,
  serviceStore: EE,
  service_address: lx,
  service_complate: F2,
  service_content: K2,
  service_date_time: V2,
  service_ing: R2,
  service_time: Q2,
  service_timed: Y2,
  shareFrend: NE,
  sign_create_fail: ME,
  sign_name: bE,
  sign_upload_fail: CE,
  start_service: G2,
  status: Lx,
  success_go_out: oE,
  taix: px,
  talk_order: U2,
  technician: B2,
  total: Px,
  travel_price: _x,
  upload_complate_img: Bx,
  upload_complate_img_tips: uE,
  upload_fail: Xx,
  upload_img_complate: Ax,
  upload_img_rech: Mx,
  upload_rech_img: Ux,
  upload_rech_tips: aE,
  uploading: rE,
  verfiyCodeTitle: AE,
  verfiyNumber: xE,
  verfiyWriteOn: RE,
  verifyTips: BE,
  voice_stop: mE,
  wait_go_out: z2,
  wait_rech: x2,
  wait_service: E2,
  weachtpay: $x,
  wechat_kefu: cx
}, Symbol.toStringTag, { value: "Module" })), UE = "可提现服务费(元)", WE = "可提现车费(元)", qE = "每月提现不限次数", GE = "总收入(元)", VE = "已提现(元)", YE = "未入账(元)", KE = "提现记录", QE = "门店佣金提现", YUe = {
  servicMoney: UE,
  carMoney: WE,
  withdrawalTips: qE,
  totalMoney: GE,
  withdrawaled: VE,
  noWithdrawal: YE,
  withdrawalRecord: KE,
  pageTitle: QE
}, KUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  carMoney: WE,
  default: YUe,
  noWithdrawal: YE,
  pageTitle: QE,
  servicMoney: UE,
  totalMoney: GE,
  withdrawalRecord: KE,
  withdrawalTips: qE,
  withdrawaled: VE
}, Symbol.toStringTag, { value: "Module" })), XE = "姓名", QUe = {
  name: XE
}, XUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QUe,
  name: XE
}, Symbol.toStringTag, { value: "Module" })), JUe = {}, ZUe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: JUe
}, Symbol.toStringTag, { value: "Module" })), eWe = {}, oWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eWe
}, Symbol.toStringTag, { value: "Module" })), tWe = {}, nWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tWe
}, Symbol.toStringTag, { value: "Module" })), sWe = {}, rWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sWe
}, Symbol.toStringTag, { value: "Module" })), aWe = {}, cWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: aWe
}, Symbol.toStringTag, { value: "Module" })), iWe = {}, lWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: iWe
}, Symbol.toStringTag, { value: "Module" })), dWe = {}, uWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dWe
}, Symbol.toStringTag, { value: "Module" })), pWe = {}, mWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pWe
}, Symbol.toStringTag, { value: "Module" })), _We = {}, gWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _We
}, Symbol.toStringTag, { value: "Module" })), hWe = {}, fWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hWe
}, Symbol.toStringTag, { value: "Module" })), yWe = {}, $We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yWe
}, Symbol.toStringTag, { value: "Module" })), vWe = {}, bWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vWe
}, Symbol.toStringTag, { value: "Module" })), JE = "订单详情", ZE = "数据加载中,请稍候", eR = "未接单", oR = "待出发", tR = "待到达", nR = "待服务", sR = "服务中", rR = "服务完成", aR = "自动好评并结束", cR = "订单结束", iR = "师傅", lR = "接单", dR = "出发", uR = "到达", pR = "开始服务", mR = "服务时间", _R = "服务倒计时", gR = "服务内容", hR = "服务时长", fR = "分钟", yR = "服务", $R = "实际支付", vR = "费用总计", bR = "下单人", TR = "联系方式", PR = "联系Ta", SR = "联系客服", OR = "升级加钟", wR = "小程序客服", jR = "微信客服", kR = "电话联系", CR = "服务地址", MR = "下单时间", AR = "车费详情", IR = "出租车 全程", NR = "公里", DR = "出行费用", zR = "项目费用", xR = "申请退款", ER = "优惠金额", RR = "支付方式", FR = "微信支付", HR = "支付宝支付", LR = "余额支付", BR = "线下支付", UR = "总计", WR = "订单编号", qR = "复制", GR = "联系客户", VR = "拒绝接单", YR = "立即接单", KR = "立即出发", QR = "拍照确认到达", XR = "拍照完成服务", JR = "确认完成", ZR = "拍照打卡", eF = "当前位置", oF = "取消", tF = "确定", nF = "确认到达", sF = "项目", rF = "价格", aF = "数量", cF = "状态", iF = "上传完成照片", lF = "上传目的地照片", dF = "位置更新中请稍候...", uF = "获取位置失败", pF = "正在处理...", mF = "余额不足", _F = "响应数据格式错误", gF = "请求失败", hF = "加载失败", fF = "上传失败", yF = "确认接收订单", $F = "您确定要接收这个订单吗?", vF = "接单成功", bF = "已成功出发", TF = "确认拒绝订单", PF = "您确定要拒绝这个订单吗？", SF = "已拒绝该订单", OF = "上传中", wF = "请上传到达照片", jF = "到达打卡成功", kF = "订单退款中，无法开始服务", CF = "未获得开始服务时间", MF = "录音已开启,现在开始进入全程录音状态", AF = "请上传完成服务的照片", IF = "服务已完成", NF = "录音已停止", DF = "已完成", zF = "退款中", xF = "加钟订单", EF = "已退款", RF = "退款申请已被拒绝", FF = "重写", HF = "确认", LF = "请在此处签名", BF = "当前项目", UF = "项目时长", WF = "当前项目加钟", qF = "选择其他项目", GF = "平台关闭了", VF = "联系方式，请点击下方联系客服", YF = "正在保存签名", KF = "签名上传失败", QF = "签名生成失败", XF = "核销码", JF = "周一至周六可用.至少提前1小时预约", ZF = "随时退.过期退.可赠送好友", eH = "预约后,方可到店使用", oH = "需提前1小时预约", tH = "券号", nH = "服务门店", sH = "该订单已核销", rH = "导航前往", aH = "联系门店", TWe = {
  order_detail: JE,
  data_loading: ZE,
  no_talk_order: eR,
  wait_go_out: oR,
  wait_rech: tR,
  wait_service: nR,
  service_ing: sR,
  service_complate: rR,
  auto_comment: aR,
  order_over: cR,
  technician: iR,
  talk_order: lR,
  go_out: dR,
  rech: uR,
  start_service: pR,
  service_date_time: mR,
  service_timed: _R,
  service_content: gR,
  service_time: hR,
  minuts: fR,
  service: yR,
  real_pay: $R,
  order_money: vR,
  order_prson: bR,
  contact: TR,
  contact_ta: PR,
  content_kefu: SR,
  add_clock: OR,
  minwechat: wR,
  wechat_kefu: jR,
  contact_phone: kR,
  service_address: CR,
  order_create_time: MR,
  car_money_detail: AR,
  taix: IR,
  km: NR,
  travel_price: DR,
  goods_price: zR,
  apply_refund: xR,
  order_sales_money: ER,
  pay_type: RR,
  weachtpay: FR,
  alipay: HR,
  balancepay: LR,
  offlinepay: BR,
  total: UR,
  order_number: WR,
  copy: qR,
  contact_custom: GR,
  no_rech_order: VR,
  book_now: YR,
  now_go_out: KR,
  upload_img_rech: QR,
  upload_img_complate: XR,
  confirm_complate: JR,
  images_complate: ZR,
  location: eF,
  cancel: oF,
  confirm: tF,
  confirm_rech: nF,
  project: sF,
  price: rF,
  number: aF,
  status: cF,
  upload_complate_img: iF,
  upload_rech_img: lF,
  location_update: dF,
  location_get_fail: uF,
  ing_update: pF,
  blacen_no: mF,
  data_type_error: _F,
  get_fail: gF,
  loading_fail: hF,
  upload_fail: fF,
  confirm_rec_order: yF,
  confirm_order: $F,
  rec_order_success: vF,
  success_go_out: bF,
  confirm_no_rech_order: TF,
  rech_no_order_tips: PF,
  no_reched: SF,
  uploading: OF,
  upload_rech_tips: wF,
  rech_success_tips: jF,
  refund_order_no_service: kF,
  no_start_time: CF,
  recvoe_voice_tips: MF,
  upload_complate_img_tips: AF,
  complated: IF,
  voice_stop: NF,
  complate: DF,
  refund_ing: zF,
  add_order: xF,
  refunded: EF,
  refunded_no: RF,
  repeat_write: FF,
  confirm_true: HF,
  sign_name: LF,
  self_goods: BF,
  goods_time_du: UF,
  self_goods_add_clock: WF,
  select_other: qF,
  platform_closed: GF,
  contact_type: VF,
  ing_save_sign: YF,
  sign_upload_fail: KF,
  sign_create_fail: QF,
  verfiyCodeTitle: XF,
  mondyTips: JF,
  shareFrend: ZF,
  gohomTips: eH,
  frontTips: oH,
  verfiyNumber: tH,
  serviceStore: nH,
  verfiyWriteOn: sH,
  openMap: rH,
  callPhone: aH
}, PWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add_clock: OR,
  add_order: xF,
  alipay: HR,
  apply_refund: xR,
  auto_comment: aR,
  balancepay: LR,
  blacen_no: mF,
  book_now: YR,
  callPhone: aH,
  cancel: oF,
  car_money_detail: AR,
  complate: DF,
  complated: IF,
  confirm: tF,
  confirm_complate: JR,
  confirm_no_rech_order: TF,
  confirm_order: $F,
  confirm_rec_order: yF,
  confirm_rech: nF,
  confirm_true: HF,
  contact: TR,
  contact_custom: GR,
  contact_phone: kR,
  contact_ta: PR,
  contact_type: VF,
  content_kefu: SR,
  copy: qR,
  data_loading: ZE,
  data_type_error: _F,
  default: TWe,
  frontTips: oH,
  get_fail: gF,
  go_out: dR,
  gohomTips: eH,
  goods_price: zR,
  goods_time_du: UF,
  images_complate: ZR,
  ing_save_sign: YF,
  ing_update: pF,
  km: NR,
  loading_fail: hF,
  location: eF,
  location_get_fail: uF,
  location_update: dF,
  minuts: fR,
  minwechat: wR,
  mondyTips: JF,
  no_rech_order: VR,
  no_reched: SF,
  no_start_time: CF,
  no_talk_order: eR,
  now_go_out: KR,
  number: aF,
  offlinepay: BR,
  openMap: rH,
  order_create_time: MR,
  order_detail: JE,
  order_money: vR,
  order_number: WR,
  order_over: cR,
  order_prson: bR,
  order_sales_money: ER,
  pay_type: RR,
  platform_closed: GF,
  price: rF,
  project: sF,
  real_pay: $R,
  rec_order_success: vF,
  rech: uR,
  rech_no_order_tips: PF,
  rech_success_tips: jF,
  recvoe_voice_tips: MF,
  refund_ing: zF,
  refund_order_no_service: kF,
  refunded: EF,
  refunded_no: RF,
  repeat_write: FF,
  select_other: qF,
  self_goods: BF,
  self_goods_add_clock: WF,
  service: yR,
  serviceStore: nH,
  service_address: CR,
  service_complate: rR,
  service_content: gR,
  service_date_time: mR,
  service_ing: sR,
  service_time: hR,
  service_timed: _R,
  shareFrend: ZF,
  sign_create_fail: QF,
  sign_name: LF,
  sign_upload_fail: KF,
  start_service: pR,
  status: cF,
  success_go_out: bF,
  taix: IR,
  talk_order: lR,
  technician: iR,
  total: UR,
  travel_price: DR,
  upload_complate_img: iF,
  upload_complate_img_tips: AF,
  upload_fail: fF,
  upload_img_complate: XR,
  upload_img_rech: QR,
  upload_rech_img: lF,
  upload_rech_tips: wF,
  uploading: OF,
  verfiyCodeTitle: XF,
  verfiyNumber: tH,
  verfiyWriteOn: sH,
  voice_stop: NF,
  wait_go_out: oR,
  wait_rech: tR,
  wait_service: nR,
  weachtpay: FR,
  wechat_kefu: jR
}, Symbol.toStringTag, { value: "Module" })), SWe = {}, OWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SWe
}, Symbol.toStringTag, { value: "Module" })), wWe = {}, jWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wWe
}, Symbol.toStringTag, { value: "Module" })), kWe = {}, CWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kWe
}, Symbol.toStringTag, { value: "Module" })), MWe = {}, AWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MWe
}, Symbol.toStringTag, { value: "Module" })), IWe = {}, NWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IWe
}, Symbol.toStringTag, { value: "Module" })), DWe = {}, zWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DWe
}, Symbol.toStringTag, { value: "Module" })), xWe = {}, EWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xWe
}, Symbol.toStringTag, { value: "Module" })), RWe = {}, FWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RWe
}, Symbol.toStringTag, { value: "Module" })), HWe = {}, LWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HWe
}, Symbol.toStringTag, { value: "Module" })), BWe = {}, UWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BWe
}, Symbol.toStringTag, { value: "Module" })), WWe = {}, qWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WWe
}, Symbol.toStringTag, { value: "Module" })), GWe = {}, VWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GWe
}, Symbol.toStringTag, { value: "Module" })), cH = "绑定手机", iH = "登录/注册", lH = "关注", dH = "收藏", uH = "可提现", pH = "余额", mH = "去充值", _H = "优惠券", gH = "我的订单", hH = "全部", fH = "查看全部", yH = "待付款", $H = "待支付", vH = "待接单", bH = "待服务", TH = "服务中", PH = "进行中", SH = "已完成", OH = "该站点未安装充值插件", wH = "好友推广", jH = "领券中心", kH = "我的地址", CH = "个人资料", MH = "招募", AH = "意见反馈", IH = "关于我们", NH = "联系客服", DH = "浏览记录", zH = "我的评论", xH = "管理中心", EH = "提示", RH = "请先绑定手机号", FH = "商家未开启登录注册", YWe = {
  bind_mobile: cH,
  login_reg: iH,
  focus_name: lH,
  fav_name: dH,
  is_commsion: uH,
  balance_name: pH,
  gorecharge: mH,
  coupon: _H,
  my_order: gH,
  all: hH,
  look_all: fH,
  wait_pay: yH,
  wait_pay_type: $H,
  wait_taking: vH,
  wait_service: bH,
  serviceing: TH,
  service_status_service: PH,
  complate: SH,
  addon_no: OH,
  frend_share: wH,
  coupon_center: jH,
  my_address: kH,
  my_info: CH,
  jion_tech: MH,
  feedback: AH,
  about_us: IH,
  contact_kefu: NH,
  browe_re: DH,
  my_comment: zH,
  manger_center: xH,
  tips: EH,
  frist_bind_mobile: RH,
  merch_no_loginandreg: FH
}, KWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  about_us: IH,
  addon_no: OH,
  all: hH,
  balance_name: pH,
  bind_mobile: cH,
  browe_re: DH,
  complate: SH,
  contact_kefu: NH,
  coupon: _H,
  coupon_center: jH,
  default: YWe,
  fav_name: dH,
  feedback: AH,
  focus_name: lH,
  frend_share: wH,
  frist_bind_mobile: RH,
  gorecharge: mH,
  is_commsion: uH,
  jion_tech: MH,
  login_reg: iH,
  look_all: fH,
  manger_center: xH,
  merch_no_loginandreg: FH,
  my_address: kH,
  my_comment: zH,
  my_info: CH,
  my_order: gH,
  service_status_service: PH,
  serviceing: TH,
  tips: EH,
  wait_pay: yH,
  wait_pay_type: $H,
  wait_service: bH,
  wait_taking: vH
}, Symbol.toStringTag, { value: "Module" })), QWe = {}, XWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QWe
}, Symbol.toStringTag, { value: "Module" })), HH = "可接单", LH = "休息", BH = "报警求助", UH = "登录/注册", WH = "当前位置", qH = "未获取到位置信息", GH = "点击获取位置", VH = "可提现佣金", YH = "立即提现", KH = "车费累计", QH = "今日收益", XH = "今日车费", JH = "收益累计", ZH = "车费累计", e3 = "设置成功", o3 = "实时定位已开启", t3 = "实时定位已关闭", n3 = "获取位置失败", s3 = "报警成功，请稍等", r3 = "您还不是", a3 = "师傅", c3 = "商家未开启登录注册", i3 = "综合数据", l3 = "今日接单", d3 = "今日完成", u3 = "今日待完成", p3 = "已服务数量", m3 = "本月接单", _3 = "本月完成", g3 = "关注量", h3 = "收藏量", f3 = "我的订单", y3 = "全部", $3 = "查看全部", v3 = "待付款", b3 = "待接单", T3 = "待服务", P3 = "服务中", S3 = "进行中", O3 = "已完成", w3 = "其他服务", j3 = "佣金明细", k3 = "资质信息", C3 = "接单时段", M3 = "项目申请", A3 = "个人资料", I3 = "位置更新中请稍候...", N3 = "接单位置", JWe = {
  is_taking_order: HH,
  no_work: LH,
  police: BH,
  login_reg: UH,
  now_location: WH,
  no_location: qH,
  click_getlocation: GH,
  is_commsion: VH,
  now_cashout: YH,
  carmoney_total: KH,
  today_commsion: QH,
  today_carmoney: XH,
  commsion_total: JH,
  carmoney_totla: ZH,
  set_success: e3,
  location_open: o3,
  location_close: t3,
  getlocation_fail: n3,
  police_success: s3,
  you_no: r3,
  technician: a3,
  merch_no_regandlogin: c3,
  total_data: i3,
  today_taking_order: l3,
  today_complate: d3,
  today_wait_complate: u3,
  serviced_num: p3,
  month_taking_order: m3,
  month_complate: _3,
  focus_num: g3,
  fav_num: h3,
  my_order: f3,
  all: y3,
  look_all: $3,
  wait_pay: v3,
  wait_taking: b3,
  wait_service: T3,
  serviceing: P3,
  service_status_service: S3,
  complate: O3,
  other_srvice: w3,
  commsion_detail: j3,
  licinfo: k3,
  taking_time: C3,
  goods_apply: M3,
  member_info: A3,
  location_geting: I3,
  taking_location: N3
}, ZWe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: y3,
  carmoney_total: KH,
  carmoney_totla: ZH,
  click_getlocation: GH,
  commsion_detail: j3,
  commsion_total: JH,
  complate: O3,
  default: JWe,
  fav_num: h3,
  focus_num: g3,
  getlocation_fail: n3,
  goods_apply: M3,
  is_commsion: VH,
  is_taking_order: HH,
  licinfo: k3,
  location_close: t3,
  location_geting: I3,
  location_open: o3,
  login_reg: UH,
  look_all: $3,
  member_info: A3,
  merch_no_regandlogin: c3,
  month_complate: _3,
  month_taking_order: m3,
  my_order: f3,
  no_location: qH,
  no_work: LH,
  now_cashout: YH,
  now_location: WH,
  other_srvice: w3,
  police: BH,
  police_success: s3,
  service_status_service: S3,
  serviced_num: p3,
  serviceing: P3,
  set_success: e3,
  taking_location: N3,
  taking_time: C3,
  technician: a3,
  today_carmoney: XH,
  today_commsion: QH,
  today_complate: d3,
  today_taking_order: l3,
  today_wait_complate: u3,
  total_data: i3,
  wait_pay: v3,
  wait_service: T3,
  wait_taking: b3,
  you_no: r3
}, Symbol.toStringTag, { value: "Module" })), e8e = {}, o8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: e8e
}, Symbol.toStringTag, { value: "Module" })), D3 = "去抢购", z3 = "没有更多内容啦~", x3 = "已售", E3 = "订单号", R3 = "实付款", F3 = "详情", t8e = {
  reserveBtn: D3,
  noHomeAddress: z3,
  soldOut: x3,
  orderNo: E3,
  actualPayment: R3,
  orderDetail: F3
}, n8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: R3,
  default: t8e,
  noHomeAddress: z3,
  orderDetail: F3,
  orderNo: E3,
  reserveBtn: D3,
  soldOut: x3
}, Symbol.toStringTag, { value: "Module" })), H3 = "登录中", L3 = "请输入账号", B3 = "请输入密码", U3 = "忘记密码", W3 = "还没有账号", q3 = "去注册", G3 = "登录代表您同意", V3 = "请先阅读并同意协议", Y3 = "请输入手机号", K3 = "快捷登录", Q3 = "账号密码登录", X3 = "输入账号密码登录", J3 = "商家未开启账号密码登录", Z3 = "手机号登录", eL = "输入手机号验证码登录", oL = "商家未开启手机号登录", s8e = {
  logining: H3,
  usernamePlaceholder: L3,
  passwordPlaceholder: B3,
  resetpwd: U3,
  noAccount: W3,
  toRegister: q3,
  agreeTips: G3,
  isAgreeTips: V3,
  mobilePlaceholder: Y3,
  oneClicklogin: K3,
  accountLogin: Q3,
  accountLoginTip: X3,
  accountLoginError: J3,
  mobileLogin: Z3,
  mobileLoginTip: eL,
  mobileLoginError: oL
}, r8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: Q3,
  accountLoginError: J3,
  accountLoginTip: X3,
  agreeTips: G3,
  default: s8e,
  isAgreeTips: V3,
  logining: H3,
  mobileLogin: Z3,
  mobileLoginError: oL,
  mobileLoginTip: eL,
  mobilePlaceholder: Y3,
  noAccount: W3,
  oneClicklogin: K3,
  passwordPlaceholder: B3,
  resetpwd: U3,
  toRegister: q3,
  usernamePlaceholder: L3
}, Symbol.toStringTag, { value: "Module" })), tL = "注册中", nL = "输入账号密码注册", sL = "输入手机号验证码注册", rL = "请输入账号", aL = "账号不能是纯数字", cL = "请输入密码", iL = "请再次确认密码", lL = "两次输入的密码不一致", dL = "忘记密码", uL = "已有账号", pL = "去登录", mL = "注册代表您同意", _L = "请先阅读并同意协议", gL = "账号注册", hL = "手机号注册", fL = "请输入手机号", a8e = {
  registering: tL,
  usernameRegisterTip: nL,
  mobileRegisterTip: sL,
  usernamePlaceholder: rL,
  usernameTips: aL,
  passwordPlaceholder: cL,
  confirmPasswordPlaceholder: iL,
  confirmPasswordError: lL,
  resetpwd: dL,
  haveAccount: uL,
  toLogin: pL,
  registerAgreeTips: mL,
  isAgreeTips: _L,
  usernameRegister: gL,
  mobileRegister: hL,
  mobilePlaceholder: fL
}, c8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: lL,
  confirmPasswordPlaceholder: iL,
  default: a8e,
  haveAccount: uL,
  isAgreeTips: _L,
  mobilePlaceholder: fL,
  mobileRegister: hL,
  mobileRegisterTip: sL,
  passwordPlaceholder: cL,
  registerAgreeTips: mL,
  registering: tL,
  resetpwd: dL,
  toLogin: pL,
  usernamePlaceholder: rL,
  usernameRegister: gL,
  usernameRegisterTip: nL,
  usernameTips: aL
}, Symbol.toStringTag, { value: "Module" })), yL = "新任务", $L = "筛选", vL = "刷新", bL = "重置", TL = "收入", PL = "服务类型", SL = "服务距离", OL = "确定", wL = "我要抢单", i8e = {
  newJob: yL,
  sort: $L,
  calcation: vL,
  reset: bL,
  money: TL,
  serviceType: PL,
  serviceDistance: SL,
  confrim: OL,
  getOrder: wL
}, l8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: vL,
  confrim: OL,
  default: i8e,
  getOrder: wL,
  money: TL,
  newJob: yL,
  reset: bL,
  serviceDistance: SL,
  serviceType: PL,
  sort: $L
}, Symbol.toStringTag, { value: "Module" })), jL = "申请时间", kL = "审核中，请耐心等待...", CL = "转账中，请耐心等待...", ML = "已转账，请及时查收", AL = "提现已取消", IL = "余额记录", NL = "佣金记录", DL = "暂无提现记录", zL = "暂无佣金记录", xL = "提现方式：", d8e = {
  applyTime: jL,
  toBeReviewed: kL,
  toBeTransfer: CL,
  transfer: ML,
  cancelApply: AL,
  balanceDetail: IL,
  commissionDetail: NL,
  emptyTip: DL,
  commissemptyTip: zL,
  rechargeType: xL
}, u8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: jL,
  balanceDetail: IL,
  cancelApply: AL,
  commissemptyTip: zL,
  commissionDetail: NL,
  default: d8e,
  emptyTip: DL,
  rechargeType: xL,
  toBeReviewed: kL,
  toBeTransfer: CL,
  transfer: ML
}, Symbol.toStringTag, { value: "Module" })), EL = "当前状态", RL = "提现单号", FL = "手续费", HL = "申请时间", LL = "审核时间", BL = "银行名称", UL = "收款账号", WL = "拒绝理由", qL = "转账方式", GL = "转账时间", VL = "付款凭证", YL = "转账补充说明", KL = "真实姓名", QL = "持卡人姓名", XL = "收款码", JL = "收款方信息", ZL = "转账信息", eB = "收款方昵称", oB = "收款方头像", tB = "转账单号", nB = "提现", sB = "取消提现", p8e = {
  statusName: EL,
  cashOutNo: RL,
  serviceMoney: FL,
  createTime: HL,
  auditTime: LL,
  transferBank: BL,
  transferAccount: UL,
  refuseReason: WL,
  transferTypeName: qL,
  transferTime: GL,
  transferVoucher: VL,
  transferRemark: YL,
  realname: KL,
  bankRealname: QL,
  transferCode: XL,
  proceedsInfo: JL,
  transferInfo: ZL,
  transferNickname: eB,
  transferImg: oB,
  transferNo: tB,
  cashOutNow: nB,
  cashOutCancel: sB
}, m8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: LL,
  bankRealname: QL,
  cashOutCancel: sB,
  cashOutNo: RL,
  cashOutNow: nB,
  createTime: HL,
  default: p8e,
  proceedsInfo: JL,
  realname: KL,
  refuseReason: WL,
  serviceMoney: FL,
  statusName: EL,
  transferAccount: UL,
  transferBank: BL,
  transferCode: XL,
  transferImg: oB,
  transferInfo: ZL,
  transferNickname: eB,
  transferNo: tB,
  transferRemark: YL,
  transferTime: GL,
  transferTypeName: qL,
  transferVoucher: VL
}, Symbol.toStringTag, { value: "Module" })), _8e = {}, g8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _8e
}, Symbol.toStringTag, { value: "Module" })), rB = "反馈标题", aB = "反馈内容", cB = "上传图片（选填）", iB = "提交反馈", lB = "请输入反馈标题", dB = "请详细描述您遇到的问题或建议", uB = "反馈内容请至少输入10个字符", pB = "反馈提交成功，感谢您的建议", mB = "反馈提交失败", _B = "网络错误，请稍后重试", h8e = {
  feedbackTitle: rB,
  feedbackContent: aB,
  uploadImage: cB,
  submitFeedback: iB,
  pleaseInputFeedbackTitle: lB,
  pleaseDescribeIssue: dB,
  feedbackContentMinLength: uB,
  feedbackSubmitSuccess: pB,
  feedbackSubmitFail: mB,
  networkError: _B
}, f8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: h8e,
  feedbackContent: aB,
  feedbackContentMinLength: uB,
  feedbackSubmitFail: mB,
  feedbackSubmitSuccess: pB,
  feedbackTitle: rB,
  networkError: _B,
  pleaseDescribeIssue: dB,
  pleaseInputFeedbackTitle: lB,
  submitFeedback: iB,
  uploadImage: cB
}, Symbol.toStringTag, { value: "Module" })), gB = "帮助详情", hB = "加载中...", fB = "浏览次数", yB = "更新时间", $B = "暂无数据", vB = "缺少帮助文档ID", bB = "网络错误，请稍后重试", y8e = {
  helpDetail: gB,
  loading: hB,
  viewsCount: fB,
  updateTime: yB,
  noData: $B,
  missingId: vB,
  networkError: bB
}, $8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: y8e,
  helpDetail: gB,
  loading: hB,
  missingId: vB,
  networkError: bB,
  noData: $B,
  updateTime: yB,
  viewsCount: fB
}, Symbol.toStringTag, { value: "Module" })), TB = "帮助中心", PB = "操作答疑", SB = "操作步骤", OB = "管理平台", wB = "佣金分成与支付", jB = "常见问题", kB = "问题分类", CB = "联系客服", MB = "没有更多内容啦~", v8e = {
  helpCenter: TB,
  operationFAQ: PB,
  operationSteps: SB,
  managementPlatform: OB,
  commissionPayment: wB,
  commonProblems: jB,
  problemCategories: kB,
  contactService: CB,
  noMoreContent: MB
}, b8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  commissionPayment: wB,
  commonProblems: jB,
  contactService: CB,
  default: v8e,
  helpCenter: TB,
  managementPlatform: OB,
  noMoreContent: MB,
  operationFAQ: PB,
  operationSteps: SB,
  problemCategories: kB
}, Symbol.toStringTag, { value: "Module" })), AB = "机构名称", IB = "今日收入(元)", NB = "我的账户", DB = "今日完成单量(单)", zB = "订单统计", xB = "违规申诉", EB = "我的评价", RB = "所属机构", FB = "机构资料", HB = "评价管理", LB = "机构入驻", BB = "服务管理", UB = "联系客服", WB = "消息通知", qB = "帮助中心", GB = "设置", VB = "排班管理", YB = "请假", KB = "服务分析", QB = "服务数据", XB = "设置", JB = "工作必备", ZB = "客户服务", e0 = "个人资料", o0 = "区域排名", T8e = {
  storeName: AB,
  todayMoney: IB,
  myAccount: NB,
  orderFinshNumber: DB,
  orderNumber: zB,
  ViolationAppeal: xB,
  MyReview: EB,
  store: RB,
  storeInfo: FB,
  evaluteSet: HB,
  registerStore: LB,
  servicesSet: BB,
  callConcat: UB,
  messageCenter: WB,
  helpCenter: qB,
  setInfo: GB,
  workTime: VB,
  levalWork: YB,
  ServiceAnalysis: KB,
  servicesData: QB,
  set: XB,
  workTools: JB,
  kefuServices: ZB,
  memberInfo: e0,
  areaData: o0
}, P8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MyReview: EB,
  ServiceAnalysis: KB,
  ViolationAppeal: xB,
  areaData: o0,
  callConcat: UB,
  default: T8e,
  evaluteSet: HB,
  helpCenter: qB,
  kefuServices: ZB,
  levalWork: YB,
  memberInfo: e0,
  messageCenter: WB,
  myAccount: NB,
  orderFinshNumber: DB,
  orderNumber: zB,
  registerStore: LB,
  servicesData: QB,
  servicesSet: BB,
  set: XB,
  setInfo: GB,
  store: RB,
  storeInfo: FB,
  storeName: AB,
  todayMoney: IB,
  workTime: VB,
  workTools: JB
}, Symbol.toStringTag, { value: "Module" })), t0 = "机构资料", n0 = "基本信息", s0 = "机构名称", r0 = "机构人数", a0 = "联系方式", c0 = "修改", i0 = "负责人", l0 = "联系电话", d0 = "地址信息", u0 = "地图加载中...", p0 = "认证状态", m0 = "营业执照", _0 = "身份认证", g0 = "地址认证", h0 = "已完成", f0 = "未完成", y0 = "编辑联系方式", $0 = "取消", v0 = "确定", b0 = "修改成功", T0 = "修改失败", P0 = "获取数据失败", S0 = "请输入负责人姓名", O0 = "请输入联系电话", w0 = "负责人不能为空", j0 = "负责人姓名长度在2-20个字符之间", k0 = "联系电话不能为空", C0 = "请输入正确的手机号码", S8e = {
  pageTitle: t0,
  basicInfo: n0,
  storeName: s0,
  storeStaff: r0,
  contactInfo: a0,
  edit: c0,
  manager: i0,
  contactPhone: l0,
  addressInfo: d0,
  mapLoading: u0,
  authenticationStatus: p0,
  businessLicense: m0,
  idAuthentication: _0,
  addressAuthentication: g0,
  completed: h0,
  uncompleted: f0,
  editContactTitle: y0,
  cancel: $0,
  confirm: v0,
  editSuccess: b0,
  editFailed: T0,
  fetchFailed: P0,
  inputManagerPlaceholder: S0,
  inputPhonePlaceholder: O0,
  managerRequired: w0,
  managerLength: j0,
  phoneRequired: k0,
  phoneFormat: C0
}, O8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addressAuthentication: g0,
  addressInfo: d0,
  authenticationStatus: p0,
  basicInfo: n0,
  businessLicense: m0,
  cancel: $0,
  completed: h0,
  confirm: v0,
  contactInfo: a0,
  contactPhone: l0,
  default: S8e,
  edit: c0,
  editContactTitle: y0,
  editFailed: T0,
  editSuccess: b0,
  fetchFailed: P0,
  idAuthentication: _0,
  inputManagerPlaceholder: S0,
  inputPhonePlaceholder: O0,
  manager: i0,
  managerLength: j0,
  managerRequired: w0,
  mapLoading: u0,
  pageTitle: t0,
  phoneFormat: C0,
  phoneRequired: k0,
  storeName: s0,
  storeStaff: r0,
  uncompleted: f0
}, Symbol.toStringTag, { value: "Module" })), M0 = "切换机构", A0 = "筛选", I0 = "排序", N0 = "营业中", D0 = "已停业", z0 = "当前机构", x0 = "待分配", E0 = "超时", R0 = "售后", F0 = "今日单量", H0 = "月收入", L0 = "确认选择", B0 = "暂无机构数据", U0 = "机构切换成功", W0 = "机构切换失败", q0 = "获取机构列表失败", G0 = "机构名称示意文字内容展示", V0 = "山西省太原市小店区平阳路时代广场宇信感应产业大厦8层814", Y0 = "05:00-22:00", w8e = {
  pageTitle: M0,
  filter: A0,
  sort: I0,
  open: N0,
  closed: D0,
  defaultStore: z0,
  waitService: x0,
  timeout: E0,
  afterSale: R0,
  todayOrders: F0,
  monthIncome: H0,
  confirmSelection: L0,
  noStoreData: B0,
  storeSwitchSuccess: U0,
  storeSwitchFailed: W0,
  getStoreListFailed: q0,
  storeNamePlaceholder: G0,
  addressPlaceholder: V0,
  businessHoursPlaceholder: Y0
}, j8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addressPlaceholder: V0,
  afterSale: R0,
  businessHoursPlaceholder: Y0,
  closed: D0,
  confirmSelection: L0,
  default: w8e,
  defaultStore: z0,
  filter: A0,
  getStoreListFailed: q0,
  monthIncome: H0,
  noStoreData: B0,
  open: N0,
  pageTitle: M0,
  sort: I0,
  storeNamePlaceholder: G0,
  storeSwitchFailed: W0,
  storeSwitchSuccess: U0,
  timeout: E0,
  todayOrders: F0,
  waitService: x0
}, Symbol.toStringTag, { value: "Module" })), K0 = "订单", Q0 = "下单", X0 = "接单", J0 = "开始", Z0 = "完成", e4 = "已支付", o4 = "未支付", t4 = "查看退款", n4 = "申请退款", s4 = "去支付", r4 = "查看", a4 = "服务人员", c4 = "待派单", i4 = "联系电话", l4 = "服务码", d4 = "注:服务人员上门时需提供", u4 = "订单编号", p4 = "交易流水号", m4 = "创建时间", _4 = "上门时间", g4 = "买家留言", h4 = "支付方式", f4 = "支付时间", y4 = "项目金额", $4 = "实付", v4 = "首页", b4 = "刷新", T4 = "客服", P4 = "收藏", S4 = "没有更多内容啦~", O4 = "的帮付", w4 = "导航", j4 = "优惠金额", k4 = "上门费用", C4 = "单", M4 = "订单未开始服务", A4 = "服务人员已确定出发", I4 = "服务人员已打卡拍照", N4 = "查看打卡照片", D4 = "服务时长总计", z4 = "预", x4 = "您有", E4 = "个订单已超时", R4 = "个订单即将超时,请尽快处理!", F4 = "服务项目", H4 = "备注：", L4 = "订单收入", B4 = "附加服务", U4 = "服务费", W4 = "附加服务费用", q4 = "服务费是师傅完成服务后的收入", G4 = "附加服务费用是指新增附加服务的收入", V4 = "其他信息", Y4 = "复制", K4 = "未获取到订单信息", Q4 = "打卡照片", X4 = "加载失败", J4 = "天", Z4 = "地图打开成功", e5 = "打开地图失败，请检查是否安装地图应用", o5 = "提示", t5 = "您确定要取消该订单吗？", n5 = "取消成功", s5 = "取消失败", r5 = "您确定要删除该订单吗？", a5 = "删除成功", c5 = "删除失败", i5 = "待服务", l5 = "服务中", d5 = "已完成", u5 = "异常订单", p5 = "服务费是师傅完成服务后的收入", k8e = {
  order: K0,
  placeOrder: Q0,
  takeOrders: X0,
  start: J0,
  finish: Z0,
  havePaid: e4,
  notPaid: o4,
  viewRefund: t4,
  applyRefund: n4,
  goToPay: s4,
  show: r4,
  servicePersonal: a4,
  orderToBeSent: c4,
  contactNumber: i4,
  serviceCode: l4,
  explain: d4,
  onOrder: u4,
  transactionNumber: p4,
  createTime: m4,
  reserveServiceTime: _4,
  remark: g4,
  modePayment: h4,
  payTime: f4,
  goodsMoney: y4,
  realMoney: $4,
  index: v4,
  refresh: b4,
  service: T4,
  collect: P4,
  nothingMore: S4,
  helpPay: O4,
  Navigation: w4,
  couponMoney: j4,
  doorMonrey: k4,
  orderUnit: C4,
  orderNotStarted: M4,
  servicePersonDeparted: A4,
  servicePersonCheckedIn: I4,
  viewCheckInPhotos: N4,
  totalServiceDuration: D4,
  pre: z4,
  youHave: x4,
  ordersOverdue: E4,
  ordersAboutToOverdue: R4,
  serviceItems: F4,
  remarkPrefix: H4,
  orderIncome: L4,
  additionalService: B4,
  serviceFee: U4,
  additionalServiceFee: W4,
  serviceFeeDesc: q4,
  additionalServiceFeeDesc: G4,
  otherInformation: V4,
  copy: Y4,
  noOrderInfo: K4,
  checkInPhotos: Q4,
  loadFailed: X4,
  day: J4,
  mapOpenedSuccessfully: Z4,
  mapOpenFailed: e5,
  prompt: o5,
  confirmCancelOrder: t5,
  cancelSuccess: n5,
  cancelFailed: s5,
  confirmDeleteOrder: r5,
  deleteSuccess: a5,
  deleteFailed: c5,
  waitingService: i5,
  inService: l5,
  completed: d5,
  abnormalOrder: u5,
  serviceFeeDescription: p5
}, C8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: w4,
  abnormalOrder: u5,
  additionalService: B4,
  additionalServiceFee: W4,
  additionalServiceFeeDesc: G4,
  applyRefund: n4,
  cancelFailed: s5,
  cancelSuccess: n5,
  checkInPhotos: Q4,
  collect: P4,
  completed: d5,
  confirmCancelOrder: t5,
  confirmDeleteOrder: r5,
  contactNumber: i4,
  copy: Y4,
  couponMoney: j4,
  createTime: m4,
  day: J4,
  default: k8e,
  deleteFailed: c5,
  deleteSuccess: a5,
  doorMonrey: k4,
  explain: d4,
  finish: Z0,
  goToPay: s4,
  goodsMoney: y4,
  havePaid: e4,
  helpPay: O4,
  inService: l5,
  index: v4,
  loadFailed: X4,
  mapOpenFailed: e5,
  mapOpenedSuccessfully: Z4,
  modePayment: h4,
  noOrderInfo: K4,
  notPaid: o4,
  nothingMore: S4,
  onOrder: u4,
  order: K0,
  orderIncome: L4,
  orderNotStarted: M4,
  orderToBeSent: c4,
  orderUnit: C4,
  ordersAboutToOverdue: R4,
  ordersOverdue: E4,
  otherInformation: V4,
  payTime: f4,
  placeOrder: Q0,
  pre: z4,
  prompt: o5,
  realMoney: $4,
  refresh: b4,
  remark: g4,
  remarkPrefix: H4,
  reserveServiceTime: _4,
  service: T4,
  serviceCode: l4,
  serviceFee: U4,
  serviceFeeDesc: q4,
  serviceFeeDescription: p5,
  serviceItems: F4,
  servicePersonCheckedIn: I4,
  servicePersonDeparted: A4,
  servicePersonal: a4,
  show: r4,
  start: J0,
  takeOrders: X0,
  totalServiceDuration: D4,
  transactionNumber: p4,
  viewCheckInPhotos: N4,
  viewRefund: t4,
  waitingService: i5,
  youHave: x4
}, Symbol.toStringTag, { value: "Module" })), m5 = "订单", _5 = "下单", g5 = "接单", h5 = "开始", f5 = "完成", y5 = "已支付", $5 = "未支付", v5 = "查看退款", b5 = "申请退款", T5 = "去支付", P5 = "查看", S5 = "服务人员", O5 = "待派单", w5 = "联系电话", j5 = "服务码", k5 = "注:服务人员上门时需提供", C5 = "订单编号", M5 = "交易流水号", A5 = "创建时间", I5 = "上门时间", N5 = "买家留言", D5 = "支付方式", z5 = "支付时间", x5 = "项目金额", E5 = "实付", R5 = "首页", F5 = "刷新", H5 = "客服", L5 = "收藏", B5 = "没有更多内容啦~", U5 = "的帮付", W5 = "导航", q5 = "优惠金额", G5 = "上门费用", V5 = "单", Y5 = "订单未开始服务", K5 = "服务人员已确定出发", Q5 = "服务人员已打卡拍照", X5 = "查看打卡照片", J5 = "服务时长总计", Z5 = "预", eU = "您有", oU = "个订单已超时", tU = "个订单即将超时,请尽快处理!", nU = "服务项目", sU = "备注：", rU = "订单收入", aU = "附加服务", cU = "服务费", iU = "附加服务费用", lU = "服务费是师傅完成服务后的收入", dU = "附加服务费用是指新增附加服务的收入", uU = "其他信息", pU = "复制", mU = "未获取到订单信息", _U = "打卡照片", gU = "加载失败", hU = "天", fU = "地图打开成功", yU = "打开地图失败，请检查是否安装地图应用", $U = "提示", vU = "您确定要取消该订单吗？", bU = "取消成功", TU = "取消失败", PU = "您确定要删除该订单吗？", SU = "删除成功", OU = "删除失败", wU = "待服务", jU = "服务中", kU = "已完成", CU = "异常订单", MU = "服务费是师傅完成服务后的收入", M8e = {
  order: m5,
  placeOrder: _5,
  takeOrders: g5,
  start: h5,
  finish: f5,
  havePaid: y5,
  notPaid: $5,
  viewRefund: v5,
  applyRefund: b5,
  goToPay: T5,
  show: P5,
  servicePersonal: S5,
  orderToBeSent: O5,
  contactNumber: w5,
  serviceCode: j5,
  explain: k5,
  onOrder: C5,
  transactionNumber: M5,
  createTime: A5,
  reserveServiceTime: I5,
  remark: N5,
  modePayment: D5,
  payTime: z5,
  goodsMoney: x5,
  realMoney: E5,
  index: R5,
  refresh: F5,
  service: H5,
  collect: L5,
  nothingMore: B5,
  helpPay: U5,
  Navigation: W5,
  couponMoney: q5,
  doorMonrey: G5,
  orderUnit: V5,
  orderNotStarted: Y5,
  servicePersonDeparted: K5,
  servicePersonCheckedIn: Q5,
  viewCheckInPhotos: X5,
  totalServiceDuration: J5,
  pre: Z5,
  youHave: eU,
  ordersOverdue: oU,
  ordersAboutToOverdue: tU,
  serviceItems: nU,
  remarkPrefix: sU,
  orderIncome: rU,
  additionalService: aU,
  serviceFee: cU,
  additionalServiceFee: iU,
  serviceFeeDesc: lU,
  additionalServiceFeeDesc: dU,
  otherInformation: uU,
  copy: pU,
  noOrderInfo: mU,
  checkInPhotos: _U,
  loadFailed: gU,
  day: hU,
  mapOpenedSuccessfully: fU,
  mapOpenFailed: yU,
  prompt: $U,
  confirmCancelOrder: vU,
  cancelSuccess: bU,
  cancelFailed: TU,
  confirmDeleteOrder: PU,
  deleteSuccess: SU,
  deleteFailed: OU,
  waitingService: wU,
  inService: jU,
  completed: kU,
  abnormalOrder: CU,
  serviceFeeDescription: MU
}, A8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: W5,
  abnormalOrder: CU,
  additionalService: aU,
  additionalServiceFee: iU,
  additionalServiceFeeDesc: dU,
  applyRefund: b5,
  cancelFailed: TU,
  cancelSuccess: bU,
  checkInPhotos: _U,
  collect: L5,
  completed: kU,
  confirmCancelOrder: vU,
  confirmDeleteOrder: PU,
  contactNumber: w5,
  copy: pU,
  couponMoney: q5,
  createTime: A5,
  day: hU,
  default: M8e,
  deleteFailed: OU,
  deleteSuccess: SU,
  doorMonrey: G5,
  explain: k5,
  finish: f5,
  goToPay: T5,
  goodsMoney: x5,
  havePaid: y5,
  helpPay: U5,
  inService: jU,
  index: R5,
  loadFailed: gU,
  mapOpenFailed: yU,
  mapOpenedSuccessfully: fU,
  modePayment: D5,
  noOrderInfo: mU,
  notPaid: $5,
  nothingMore: B5,
  onOrder: C5,
  order: m5,
  orderIncome: rU,
  orderNotStarted: Y5,
  orderToBeSent: O5,
  orderUnit: V5,
  ordersAboutToOverdue: tU,
  ordersOverdue: oU,
  otherInformation: uU,
  payTime: z5,
  placeOrder: _5,
  pre: Z5,
  prompt: $U,
  realMoney: E5,
  refresh: F5,
  remark: N5,
  remarkPrefix: sU,
  reserveServiceTime: I5,
  service: H5,
  serviceCode: j5,
  serviceFee: cU,
  serviceFeeDesc: lU,
  serviceFeeDescription: MU,
  serviceItems: nU,
  servicePersonCheckedIn: Q5,
  servicePersonDeparted: K5,
  servicePersonal: S5,
  show: P5,
  start: h5,
  takeOrders: g5,
  totalServiceDuration: J5,
  transactionNumber: M5,
  viewCheckInPhotos: X5,
  viewRefund: v5,
  waitingService: wU,
  youHave: eU
}, Symbol.toStringTag, { value: "Module" })), AU = "机构首页", IU = "请输入搜索关键词", NU = "筛选", DU = "家政保洁", zU = "保姆月嫂", xU = "家电维修", EU = "家电清洗", RU = "管道疏通", FU = "从业", HU = "年", LU = "服务", BU = "单", UU = "工作中", WU = "休息中", qU = "去派单", GU = "排班管理", VU = "打电话", YU = "任务", KU = "机构", QU = "技工", XU = "我的", JU = "师傅派单", I8e = {
  pageTitle: AU,
  searchPlaceholder: IU,
  filter: NU,
  housekeeping: DU,
  nanny: zU,
  applianceRepair: xU,
  applianceCleaning: EU,
  pipeDredging: RU,
  yearsOfExperience: FU,
  years: HU,
  serviceOrders: LU,
  orders: BU,
  working: UU,
  resting: WU,
  assignOrder: qU,
  scheduleManagement: GU,
  makeCall: VU,
  tasks: YU,
  store: KU,
  technicians: QU,
  my: XU,
  pageHeaderTitle: JU
}, N8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applianceCleaning: EU,
  applianceRepair: xU,
  assignOrder: qU,
  default: I8e,
  filter: NU,
  housekeeping: DU,
  makeCall: VU,
  my: XU,
  nanny: zU,
  orders: BU,
  pageHeaderTitle: JU,
  pageTitle: AU,
  pipeDredging: RU,
  resting: WU,
  scheduleManagement: GU,
  searchPlaceholder: IU,
  serviceOrders: LU,
  store: KU,
  tasks: YU,
  technicians: QU,
  working: UU,
  years: HU,
  yearsOfExperience: FU
}, Symbol.toStringTag, { value: "Module" })), ZU = "订单", eW = "下单", oW = "接单", tW = "开始", nW = "完成", sW = "已支付", rW = "未支付", aW = "查看退款", cW = "申请退款", iW = "去支付", lW = "查看", dW = "服务人员", uW = "待派单", pW = "联系电话", mW = "服务码", _W = "注:服务人员上门时需提供", gW = "订单编号", hW = "交易流水号", fW = "创建时间", yW = "上门时间", $W = "买家留言", vW = "支付方式", bW = "支付时间", TW = "项目金额", PW = "实付", SW = "首页", OW = "刷新", wW = "客服", jW = "收藏", kW = "没有更多内容啦~", CW = "的帮付", MW = "导航", AW = "优惠金额", IW = "上门费用", NW = "单", DW = "订单未开始服务", zW = "服务人员已确定出发", xW = "服务人员已打卡拍照", EW = "查看打卡照片", RW = "服务时长总计", FW = "预", HW = "您有", LW = "个订单已超时", BW = "个订单即将超时,请尽快处理!", UW = "服务项目", WW = "备注：", qW = "订单收入", GW = "附加服务", VW = "服务费", YW = "附加服务费用", KW = "师傅完成服务后的预估收入", QW = "附加服务费用是指新增附加服务的收入", XW = "其他信息", JW = "复制", ZW = "未获取到订单信息", e8 = "打卡照片", o8 = "加载失败", t8 = "天", n8 = "地图打开成功", s8 = "打开地图失败，请检查是否安装地图应用", r8 = "提示", a8 = "您确定要取消该订单吗？", c8 = "取消成功", i8 = "取消失败", l8 = "您确定要删除该订单吗？", d8 = "删除成功", u8 = "删除失败", p8 = "待服务", m8 = "服务中", _8 = "已完成", g8 = "异常订单", h8 = "服务费是师傅完成服务后的收入", D8e = {
  order: ZU,
  placeOrder: eW,
  takeOrders: oW,
  start: tW,
  finish: nW,
  havePaid: sW,
  notPaid: rW,
  viewRefund: aW,
  applyRefund: cW,
  goToPay: iW,
  show: lW,
  servicePersonal: dW,
  orderToBeSent: uW,
  contactNumber: pW,
  serviceCode: mW,
  explain: _W,
  onOrder: gW,
  transactionNumber: hW,
  createTime: fW,
  reserveServiceTime: yW,
  remark: $W,
  modePayment: vW,
  payTime: bW,
  goodsMoney: TW,
  realMoney: PW,
  index: SW,
  refresh: OW,
  service: wW,
  collect: jW,
  nothingMore: kW,
  helpPay: CW,
  Navigation: MW,
  couponMoney: AW,
  doorMonrey: IW,
  orderUnit: NW,
  orderNotStarted: DW,
  servicePersonDeparted: zW,
  servicePersonCheckedIn: xW,
  viewCheckInPhotos: EW,
  totalServiceDuration: RW,
  pre: FW,
  youHave: HW,
  ordersOverdue: LW,
  ordersAboutToOverdue: BW,
  serviceItems: UW,
  remarkPrefix: WW,
  orderIncome: qW,
  additionalService: GW,
  serviceFee: VW,
  additionalServiceFee: YW,
  serviceFeeDesc: KW,
  additionalServiceFeeDesc: QW,
  otherInformation: XW,
  copy: JW,
  noOrderInfo: ZW,
  checkInPhotos: e8,
  loadFailed: o8,
  day: t8,
  mapOpenedSuccessfully: n8,
  mapOpenFailed: s8,
  prompt: r8,
  confirmCancelOrder: a8,
  cancelSuccess: c8,
  cancelFailed: i8,
  confirmDeleteOrder: l8,
  deleteSuccess: d8,
  deleteFailed: u8,
  waitingService: p8,
  inService: m8,
  completed: _8,
  abnormalOrder: g8,
  serviceFeeDescription: h8
}, z8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: MW,
  abnormalOrder: g8,
  additionalService: GW,
  additionalServiceFee: YW,
  additionalServiceFeeDesc: QW,
  applyRefund: cW,
  cancelFailed: i8,
  cancelSuccess: c8,
  checkInPhotos: e8,
  collect: jW,
  completed: _8,
  confirmCancelOrder: a8,
  confirmDeleteOrder: l8,
  contactNumber: pW,
  copy: JW,
  couponMoney: AW,
  createTime: fW,
  day: t8,
  default: D8e,
  deleteFailed: u8,
  deleteSuccess: d8,
  doorMonrey: IW,
  explain: _W,
  finish: nW,
  goToPay: iW,
  goodsMoney: TW,
  havePaid: sW,
  helpPay: CW,
  inService: m8,
  index: SW,
  loadFailed: o8,
  mapOpenFailed: s8,
  mapOpenedSuccessfully: n8,
  modePayment: vW,
  noOrderInfo: ZW,
  notPaid: rW,
  nothingMore: kW,
  onOrder: gW,
  order: ZU,
  orderIncome: qW,
  orderNotStarted: DW,
  orderToBeSent: uW,
  orderUnit: NW,
  ordersAboutToOverdue: BW,
  ordersOverdue: LW,
  otherInformation: XW,
  payTime: bW,
  placeOrder: eW,
  pre: FW,
  prompt: r8,
  realMoney: PW,
  refresh: OW,
  remark: $W,
  remarkPrefix: WW,
  reserveServiceTime: yW,
  service: wW,
  serviceCode: mW,
  serviceFee: VW,
  serviceFeeDesc: KW,
  serviceFeeDescription: h8,
  serviceItems: UW,
  servicePersonCheckedIn: xW,
  servicePersonDeparted: zW,
  servicePersonal: dW,
  show: lW,
  start: tW,
  takeOrders: oW,
  totalServiceDuration: RW,
  transactionNumber: hW,
  viewCheckInPhotos: EW,
  viewRefund: aW,
  waitingService: p8,
  youHave: HW
}, Symbol.toStringTag, { value: "Module" })), f8 = "新任务", y8 = "筛选", $8 = "刷新", v8 = "重置", b8 = "收入", T8 = "服务类型", P8 = "服务距离", S8 = "确定", O8 = "我要抢单", x8e = {
  newJob: f8,
  sort: y8,
  calcation: $8,
  reset: v8,
  money: b8,
  serviceType: T8,
  serviceDistance: P8,
  confrim: S8,
  getOrder: O8
}, E8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: $8,
  confrim: S8,
  default: x8e,
  getOrder: O8,
  money: b8,
  newJob: f8,
  reset: v8,
  serviceDistance: P8,
  serviceType: T8,
  sort: y8
}, Symbol.toStringTag, { value: "Module" })), w8 = "新任务", j8 = "筛选", k8 = "刷新", C8 = "重置", M8 = "收入", A8 = "服务类型", I8 = "服务距离", N8 = "确定", D8 = "我要抢单", R8e = {
  newJob: w8,
  sort: j8,
  calcation: k8,
  reset: C8,
  money: M8,
  serviceType: A8,
  serviceDistance: I8,
  confrim: N8,
  getOrder: D8
}, F8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: k8,
  confrim: N8,
  default: R8e,
  getOrder: D8,
  money: M8,
  newJob: w8,
  reset: C8,
  serviceDistance: I8,
  serviceType: A8,
  sort: j8
}, Symbol.toStringTag, { value: "Module" })), z8 = "账户明细", x8 = "收支统计", E8 = "收入", R8 = "支出", F8 = "暂无账单数据", H8 = "刷新", L8 = "全部类型", B8 = "全部日期", U8 = "到账情况", H8e = {
  accountDetails: z8,
  receiptStatistics: x8,
  income: E8,
  expense: R8,
  noBillData: F8,
  refresh: H8,
  allTypes: L8,
  allDates: B8,
  paymentStatus: U8
}, L8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountDetails: z8,
  allDates: B8,
  allTypes: L8,
  default: H8e,
  expense: R8,
  income: E8,
  noBillData: F8,
  paymentStatus: U8,
  receiptStatistics: x8,
  refresh: H8
}, Symbol.toStringTag, { value: "Module" })), W8 = "账户余额", q8 = "元", G8 = "提现", V8 = "账户明细", Y8 = "收支统计", K8 = "银行卡", Q8 = "今日账单", X8 = "数据说明", J8 = "此处为预计收入，如数据延迟，不影响最终结算，可稍后查询", Z8 = "预计收入", e6 = "预计支出", o6 = "暂无账单数据", t6 = "刷新", n6 = "获取日账单统计失败", s6 = "获取机构数据失败", B8e = {
  accountBalance: W8,
  yuan: q8,
  withdraw: G8,
  accountDetails: V8,
  receiptStatistics: Y8,
  bankCards: K8,
  todayBill: Q8,
  dataDescription: X8,
  dataDelayTip: J8,
  expectedIncome: Z8,
  expectedExpense: e6,
  noBillData: o6,
  refresh: t6,
  fetchDayBillStatFailed: n6,
  fetchStoreDataFailed: s6
}, U8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: W8,
  accountDetails: V8,
  bankCards: K8,
  dataDelayTip: J8,
  dataDescription: X8,
  default: B8e,
  expectedExpense: e6,
  expectedIncome: Z8,
  fetchDayBillStatFailed: n6,
  fetchStoreDataFailed: s6,
  noBillData: o6,
  receiptStatistics: Y8,
  refresh: t6,
  todayBill: Q8,
  withdraw: G8,
  yuan: q8
}, Symbol.toStringTag, { value: "Module" })), r6 = "订单统计", a6 = "今日订单", c6 = "月订单", i6 = "待服务", l6 = "待验收", d6 = "已完成订单", u6 = "已关闭", p6 = "退款", m6 = "订单明细", _6 = "已完成", g6 = "订单号", h6 = "暂无账单数据", f6 = "", W8e = {
  title: r6,
  todayOrders: a6,
  monthOrders: c6,
  pendingService: i6,
  pendingAcceptance: l6,
  completedOrders: d6,
  cancelled: u6,
  refund: p6,
  orderDetails: m6,
  completed: _6,
  orderNumber: g6,
  noBillData: h6,
  refresh: f6
}, q8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelled: u6,
  completed: _6,
  completedOrders: d6,
  default: W8e,
  monthOrders: c6,
  noBillData: h6,
  orderDetails: m6,
  orderNumber: g6,
  pendingAcceptance: l6,
  pendingService: i6,
  refresh: f6,
  refund: p6,
  title: r6,
  todayOrders: a6
}, Symbol.toStringTag, { value: "Module" })), y6 = "账户明细", $6 = "收支统计", v6 = "日统计", b6 = "月统计", T6 = "单位：千元", P6 = "收入", S6 = "支出", O6 = "今日收入", w6 = "今日支出", G8e = {
  accountDetails: y6,
  receiptStatistics: $6,
  dailySummary: v6,
  monthlySummary: b6,
  unitThousand: T6,
  income: P6,
  expense: S6,
  todayIncome: O6,
  todayExpense: w6
}, V8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountDetails: y6,
  dailySummary: v6,
  default: G8e,
  expense: S6,
  income: P6,
  monthlySummary: b6,
  receiptStatistics: $6,
  todayExpense: w6,
  todayIncome: O6,
  unitThousand: T6
}, Symbol.toStringTag, { value: "Module" })), j6 = "提现", k6 = "可提现余额", C6 = "全部提现", M6 = "手续费", A6 = "请输入提现金额", I6 = "最小提现金额：", N6 = "，手续费为", D6 = "到账方式", z6 = "提现至微信零钱", x6 = "快速到账，无需审核", E6 = "提现至微信", R6 = "提现到微信号", F6 = "请先添加微信号", H6 = "提现至支付宝", L6 = "提现到支付宝账号", B6 = "请先添加支付宝账号", U6 = "提现至银行卡", W6 = "提现到{bankName}储蓄卡", q6 = "请先添加银行卡", G6 = "添加", V6 = "立即提现", Y6 = "提现记录", K6 = "提现设置未开启", Q6 = "没有可用的提现方式", X6 = "提现金额格式错误", J6 = "提现金额超出可提现金额", Z6 = "提现金额小于最低提现金额", eq = "异常操作", Y8e = {
  title: j6,
  availableBalance: k6,
  allMoney: C6,
  fee: M6,
  enterAmount: A6,
  minAmount: I6,
  feeRate: N6,
  paymentMethod: D6,
  wechatPay: z6,
  wechatPayDesc: x6,
  wechatCode: E6,
  wechatCodeDesc: R6,
  addWechat: F6,
  alipay: H6,
  alipayDesc: L6,
  addAlipay: B6,
  bank: U6,
  bankDesc: W6,
  addBank: q6,
  add: G6,
  submit: V6,
  record: Y6,
  notOpen: K6,
  noMethod: Q6,
  invalidFormat: X6,
  exceedLimit: J6,
  belowMin: Z6,
  abnormal: eq
}, K8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormal: eq,
  add: G6,
  addAlipay: B6,
  addBank: q6,
  addWechat: F6,
  alipay: H6,
  alipayDesc: L6,
  allMoney: C6,
  availableBalance: k6,
  bank: U6,
  bankDesc: W6,
  belowMin: Z6,
  default: Y8e,
  enterAmount: A6,
  exceedLimit: J6,
  fee: M6,
  feeRate: N6,
  invalidFormat: X6,
  minAmount: I6,
  noMethod: Q6,
  notOpen: K6,
  paymentMethod: D6,
  record: Y6,
  submit: V6,
  title: j6,
  wechatCode: E6,
  wechatCodeDesc: R6,
  wechatPay: z6,
  wechatPayDesc: x6
}, Symbol.toStringTag, { value: "Module" })), oq = "编辑银行卡", tq = "添加银行卡", nq = "请确保银行卡信息准确无误，以便顺利提现", sq = "添加您的银行卡信息，用于资金提现到账", rq = "持卡人姓名", aq = "请输入持卡人真实姓名", cq = "银行名称", iq = "请输入开户银行全称", lq = "银行卡号", dq = "请输入银行卡号", uq = "编辑支付宝账户", pq = "添加支付宝账户", mq = "请确保支付宝信息准确无误，以便顺利提现", _q = "添加您的支付宝信息，用于资金提现到账", gq = "支付宝姓名", hq = "请输入支付宝实名认证姓名", fq = "支付宝账号", yq = "请输入支付宝账号（手机号/邮箱）", $q = "编辑微信账户", vq = "添加微信账户", bq = "请确保微信信息准确无误，以便顺利提现", Tq = "添加您的微信信息，用于资金提现到账", Pq = "微信姓名", Sq = "请输入微信实名认证姓名", Oq = "微信账号", wq = "请输入微信账号（手机号/微信号）", jq = "保存账户信息", kq = "确定要删除该提现账户吗？删除后无法恢复", Cq = "确认删除", Mq = "取消", Aq = "编辑提现账户", Iq = "添加提现账户", Nq = "请上传清晰的支付宝收款码", Dq = "请上传清晰的微信收款码", zq = "银行卡信息", xq = "支付宝账户信息", Eq = "微信账户信息", Rq = "账户类型", Fq = "此项为必填项", Hq = "上传成功", Lq = "上传失败，请重试", Bq = "保存成功", Uq = "删除成功", Q8e = {
  editBankCard: oq,
  addBankCard: tq,
  editBankCardTips: nq,
  addBankCardTips: sq,
  bankRealname: rq,
  bankRealnamePlaceholder: aq,
  bankName: cq,
  bankNamePlaceholder: iq,
  bankAccountNo: lq,
  bankAccountNoPlaceholder: dq,
  editAlipayAccount: uq,
  addAlipayAccount: pq,
  editAlipayAccountTips: mq,
  addAlipayAccountTips: _q,
  alipayRealname: gq,
  alipayRealnamePlaceholder: hq,
  alipayAccountNo: fq,
  alipayAccountNoPlaceholder: yq,
  editWechatCodeAccount: $q,
  addWechatCodeAccount: vq,
  editWechatCodeAccountTips: bq,
  addWechatCodeAccountTips: Tq,
  wechatCodeRealname: Pq,
  wechatCodeRealnamePlaceholder: Sq,
  wechatCodeAccountNo: Oq,
  wechatCodeAccountNoPlaceholder: wq,
  save: jq,
  deleteConfirm: kq,
  confirm: Cq,
  cancel: Mq,
  editAccountTitle: Aq,
  addAccountTitle: Iq,
  alipayAccountImgPlaceholder: Nq,
  wechatCodeAccountImgPlaceholder: Dq,
  accountInfo: zq,
  alipayAccountInfo: xq,
  wechatCodeAccountInfo: Eq,
  accountTypeLabel: Rq,
  requiredField: Fq,
  uploadSuccess: Hq,
  uploadFailed: Lq,
  saveSuccess: Bq,
  deleteSuccess: Uq
}, X8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountInfo: zq,
  accountTypeLabel: Rq,
  addAccountTitle: Iq,
  addAlipayAccount: pq,
  addAlipayAccountTips: _q,
  addBankCard: tq,
  addBankCardTips: sq,
  addWechatCodeAccount: vq,
  addWechatCodeAccountTips: Tq,
  alipayAccountImgPlaceholder: Nq,
  alipayAccountInfo: xq,
  alipayAccountNo: fq,
  alipayAccountNoPlaceholder: yq,
  alipayRealname: gq,
  alipayRealnamePlaceholder: hq,
  bankAccountNo: lq,
  bankAccountNoPlaceholder: dq,
  bankName: cq,
  bankNamePlaceholder: iq,
  bankRealname: rq,
  bankRealnamePlaceholder: aq,
  cancel: Mq,
  confirm: Cq,
  default: Q8e,
  deleteConfirm: kq,
  deleteSuccess: Uq,
  editAccountTitle: Aq,
  editAlipayAccount: uq,
  editAlipayAccountTips: mq,
  editBankCard: oq,
  editBankCardTips: nq,
  editWechatCodeAccount: $q,
  editWechatCodeAccountTips: bq,
  requiredField: Fq,
  save: jq,
  saveSuccess: Bq,
  uploadFailed: Lq,
  uploadSuccess: Hq,
  wechatCodeAccountImgPlaceholder: Dq,
  wechatCodeAccountInfo: Eq,
  wechatCodeAccountNo: Oq,
  wechatCodeAccountNoPlaceholder: wq,
  wechatCodeRealname: Pq,
  wechatCodeRealnamePlaceholder: Sq
}, Symbol.toStringTag, { value: "Module" })), Wq = "银行卡列表", qq = "微信收款码列表", Gq = "支付宝账号列表", Vq = "银行卡", Yq = "微信收款码", Kq = "支付宝账号", Qq = "尾号", Xq = "暂无账户信息，点击下方按钮添加", Jq = "暂无银行卡", Zq = "暂无微信收款码", e7 = "暂无支付宝账号", o7 = "添加银行卡", t7 = "添加微信收款码", n7 = "添加支付宝账号", J8e = {
  bankCardList: Wq,
  wechatCodeList: qq,
  alipayAccountList: Gq,
  bankCard: Vq,
  wechatCode: Yq,
  alipayAccountNo: Kq,
  endNumber: Qq,
  noAccountDesc: Xq,
  noBankCard: Jq,
  noWechatCode: Zq,
  noAlipayAccount: e7,
  addBankCard: o7,
  addWechatCode: t7,
  addAlipayAccount: n7,
  delete: "删除"
}, Z8e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: n7,
  addBankCard: o7,
  addWechatCode: t7,
  alipayAccountList: Gq,
  alipayAccountNo: Kq,
  bankCard: Vq,
  bankCardList: Wq,
  default: J8e,
  endNumber: Qq,
  noAccountDesc: Xq,
  noAlipayAccount: e7,
  noBankCard: Jq,
  noWechatCode: Zq,
  wechatCode: Yq,
  wechatCodeList: qq
}, Symbol.toStringTag, { value: "Module" })), s7 = "切换账号", r7 = "今日收入(元)", a7 = "我的账户", c7 = "今日完成单量(单)", i7 = "订单统计", l7 = "建议反馈", d7 = "我的评价", u7 = "去派单", p7 = "抢单派送给店员", m7 = "排班管理", _7 = "安排作息时间", g7 = "服务分析", h7 = "服务数据", f7 = "订单看板", y7 = "待派单", $7 = "日历", v7 = "待服务", b7 = "服务中", T7 = "待验收", P7 = "已完成", S7 = "售后单", O7 = "已取消", w7 = "刷新", j7 = "师傅动态", e6e = {
  changeAccount: s7,
  todayMoney: r7,
  myAccount: a7,
  orderFinshNumber: c7,
  orderNumber: i7,
  ViolationAppeal: l7,
  MyReview: d7,
  paiOrder: u7,
  paiOrderDesc: p7,
  workTime: m7,
  levalWork: _7,
  ServiceAnalysis: g7,
  servicesData: h7,
  workTools: f7,
  daiPaiOrder: y7,
  date: $7,
  daiServices: v7,
  inServices: b7,
  daiYanshou: T7,
  finshOrder: P7,
  refunedOrder: S7,
  cancelOrder: O7,
  resetEcharts: w7,
  technianStatus: j7
}, o6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MyReview: d7,
  ServiceAnalysis: g7,
  ViolationAppeal: l7,
  cancelOrder: O7,
  changeAccount: s7,
  daiPaiOrder: y7,
  daiServices: v7,
  daiYanshou: T7,
  date: $7,
  default: e6e,
  finshOrder: P7,
  inServices: b7,
  levalWork: _7,
  myAccount: a7,
  orderFinshNumber: c7,
  orderNumber: i7,
  paiOrder: u7,
  paiOrderDesc: p7,
  refunedOrder: S7,
  resetEcharts: w7,
  servicesData: h7,
  technianStatus: j7,
  todayMoney: r7,
  workTime: m7,
  workTools: f7
}, Symbol.toStringTag, { value: "Module" })), k7 = "机构入驻申请", C7 = "机构名称", M7 = "请输入机构名称", A7 = "机构证件", I7 = "请上传清晰照片", N7 = "营业执照", D7 = "请上传信息清晰的营业执照照片", z7 = "上传机构图片", x7 = "机构位置", E7 = "请选择位置", R7 = "联系人姓名", F7 = "请输入联系人姓名", H7 = "联系人手机", L7 = "请输入联系人手机号码", B7 = "联系人身份证", U7 = "请输入联系人身份证号码", W7 = "身份证上传", q7 = "请上传身份证正反面照片", G7 = "身份证正面", V7 = "照片必须清晰完整", Y7 = "身份证信息必须清晰可见", K7 = "身份证反面", Q7 = "照片必须清晰完整", X7 = "身份证信息必须清晰可见", J7 = "申请说明", Z7 = "请输入申请说明", e9 = "确认提交", o9 = "请上传营业执照", t9 = "请输入联系人姓名", n9 = "请输入手机号码", s9 = "请输入有效的手机号码", r9 = "请输入身份证号码", a9 = "请输入有效的身份证号码", c9 = "请上传身份证正面照片", i9 = "请上传身份证反面照片", l9 = "请选择位置", d9 = "提交中...", u9 = "提交成功", t6e = {
  storeApplyTitle: k7,
  storeName: C7,
  inputStoreName: M7,
  storeCertificates: A7,
  uploadClearPhotos: I7,
  businessLicense: N7,
  storeBusinessLicenseTip: D7,
  uploadStoreImage: z7,
  myLocation: x7,
  selectLocation: E7,
  contactPersonName: R7,
  inputContactPersonName: F7,
  contactPersonMobile: H7,
  inputContactPersonMobile: L7,
  contactPersonIdcard: B7,
  inputContactPersonIdcard: U7,
  idcardUpload: W7,
  idcardUploadTip: q7,
  idcardFront: G7,
  idcardFrontTip1: V7,
  idcardFrontTip3: Y7,
  idcardBack: K7,
  idcardBackTip1: Q7,
  idcardBackTip3: X7,
  applyDescription: J7,
  inputApplyDescription: Z7,
  confirmSubmit: e9,
  businessLicenseRequired: o9,
  contactNameRequired: t9,
  mobileRequired: n9,
  inputMobileErr: s9,
  idNumberRequired: r9,
  inputIdcardErr: a9,
  idcardFrontRequired: c9,
  idcardBackRequired: i9,
  locationRequired: l9,
  submitting: d9,
  submitSuccess: u9
}, n6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDescription: J7,
  businessLicense: N7,
  businessLicenseRequired: o9,
  confirmSubmit: e9,
  contactNameRequired: t9,
  contactPersonIdcard: B7,
  contactPersonMobile: H7,
  contactPersonName: R7,
  default: t6e,
  idNumberRequired: r9,
  idcardBack: K7,
  idcardBackRequired: i9,
  idcardBackTip1: Q7,
  idcardBackTip3: X7,
  idcardFront: G7,
  idcardFrontRequired: c9,
  idcardFrontTip1: V7,
  idcardFrontTip3: Y7,
  idcardUpload: W7,
  idcardUploadTip: q7,
  inputApplyDescription: Z7,
  inputContactPersonIdcard: U7,
  inputContactPersonMobile: L7,
  inputContactPersonName: F7,
  inputIdcardErr: a9,
  inputMobileErr: s9,
  inputStoreName: M7,
  locationRequired: l9,
  mobileRequired: n9,
  myLocation: x7,
  selectLocation: E7,
  storeApplyTitle: k7,
  storeBusinessLicenseTip: D7,
  storeCertificates: A7,
  storeName: C7,
  submitSuccess: u9,
  submitting: d9,
  uploadClearPhotos: I7,
  uploadStoreImage: z7
}, Symbol.toStringTag, { value: "Module" })), p9 = "入驻申请审批中", m9 = "入驻申请不通过", _9 = "申请已通过", g9 = "预计三个工作日完成，请耐心等待", h9 = "申请已提交", f9 = "审核时间", y9 = "返回首页", $9 = "查看申请状态", v9 = "审核提示", b9 = "您已成功入驻", s6e = {
  reviewingTitle: p9,
  rejectedTitle: m9,
  successTitle: _9,
  description: g9,
  applicationSubmitted: h9,
  awaitingSettlement: f9,
  goBackHome: y9,
  checkStatus: $9,
  reviewTips: v9,
  descriptionSuccess: b9
}, r6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applicationSubmitted: h9,
  awaitingSettlement: f9,
  checkStatus: $9,
  default: s6e,
  description: g9,
  descriptionSuccess: b9,
  goBackHome: y9,
  rejectedTitle: m9,
  reviewTips: v9,
  reviewingTitle: p9,
  successTitle: _9
}, Symbol.toStringTag, { value: "Module" })), T9 = "师傅详情", P9 = "师傅详情", S9 = "手机号：", O9 = "完成单数", w9 = "异常订单数", j9 = "售后订单数", k9 = "好评率", C9 = "个人简介", M9 = "姓名", A9 = "手机号", I9 = "资质证书", N9 = "加载失败", D9 = "自我介绍", z9 = "暂无介绍", x9 = "技能专长", E9 = "请输入搜索关键词", R9 = "筛选", F9 = "家政保洁", H9 = "保姆月嫂", L9 = "家电维修", B9 = "家电清洗", U9 = "管道疏通", W9 = "从业", q9 = "年", G9 = "服务", V9 = "单", Y9 = "工作中", K9 = "休息中", Q9 = "去派单", X9 = "排班管理", J9 = "打电话", Z9 = "任务", eG = "机构", oG = "技工", tG = "我的", nG = "技工管理", a6e = {
  pageTitle: T9,
  technicianDetail: P9,
  phoneNumber: S9,
  completedOrders: O9,
  abnormalOrders: w9,
  refundOrders: j9,
  positiveRate: k9,
  personalProfile: C9,
  name: M9,
  phone: A9,
  qualificationCertificate: I9,
  loadFailed: N9,
  selfIntroduction: D9,
  noIntroduction: z9,
  skills: x9,
  searchPlaceholder: E9,
  filter: R9,
  housekeeping: F9,
  nanny: H9,
  applianceRepair: L9,
  applianceCleaning: B9,
  pipeDredging: U9,
  yearsOfExperience: W9,
  years: q9,
  serviceOrders: G9,
  orders: V9,
  working: Y9,
  resting: K9,
  assignOrder: Q9,
  scheduleManagement: X9,
  makeCall: J9,
  tasks: Z9,
  store: eG,
  technicians: oG,
  my: tG,
  pageHeader: nG
}, c6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOrders: w9,
  applianceCleaning: B9,
  applianceRepair: L9,
  assignOrder: Q9,
  completedOrders: O9,
  default: a6e,
  filter: R9,
  housekeeping: F9,
  loadFailed: N9,
  makeCall: J9,
  my: tG,
  name: M9,
  nanny: H9,
  noIntroduction: z9,
  orders: V9,
  pageHeader: nG,
  pageTitle: T9,
  personalProfile: C9,
  phone: A9,
  phoneNumber: S9,
  pipeDredging: U9,
  positiveRate: k9,
  qualificationCertificate: I9,
  refundOrders: j9,
  resting: K9,
  scheduleManagement: X9,
  searchPlaceholder: E9,
  selfIntroduction: D9,
  serviceOrders: G9,
  skills: x9,
  store: eG,
  tasks: Z9,
  technicianDetail: P9,
  technicians: oG,
  working: Y9,
  years: q9,
  yearsOfExperience: W9
}, Symbol.toStringTag, { value: "Module" })), sG = "机构首页", rG = "请输入搜索关键词", aG = "筛选", cG = "家政保洁", iG = "保姆月嫂", lG = "家电维修", dG = "家电清洗", uG = "管道疏通", pG = "从业", mG = "年", _G = "服务", gG = "单", hG = "工作中", fG = "休息中", yG = "去派单", $G = "排班管理", vG = "打电话", bG = "任务", TG = "机构", PG = "技工", SG = "我的", OG = "技工管理", i6e = {
  pageTitle: sG,
  searchPlaceholder: rG,
  filter: aG,
  housekeeping: cG,
  nanny: iG,
  applianceRepair: lG,
  applianceCleaning: dG,
  pipeDredging: uG,
  yearsOfExperience: pG,
  years: mG,
  serviceOrders: _G,
  orders: gG,
  working: hG,
  resting: fG,
  assignOrder: yG,
  scheduleManagement: $G,
  makeCall: vG,
  tasks: bG,
  store: TG,
  technicians: PG,
  my: SG,
  pageHeaderTitle: OG
}, l6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applianceCleaning: dG,
  applianceRepair: lG,
  assignOrder: yG,
  default: i6e,
  filter: aG,
  housekeeping: cG,
  makeCall: vG,
  my: SG,
  nanny: iG,
  orders: gG,
  pageHeaderTitle: OG,
  pageTitle: sG,
  pipeDredging: uG,
  resting: fG,
  scheduleManagement: $G,
  searchPlaceholder: rG,
  serviceOrders: _G,
  store: TG,
  tasks: bG,
  technicians: PG,
  working: hG,
  years: mG,
  yearsOfExperience: pG
}, Symbol.toStringTag, { value: "Module" })), wG = "排班管理", jG = "排班管理日历", kG = "休息时间安排", CG = "开始时间", MG = "结束时间", AG = "请假原因", IG = "个人事务", NG = "身体不适", DG = "家庭原因", zG = "其他原因", xG = "培训学习", EG = "临时有事", RG = "取消", FG = "确定", HG = "日", LG = "一", BG = "二", UG = "三", WG = "四", qG = "五", GG = "六", d6e = {
  title: wG,
  calendarTitle: jG,
  restTimeArrangement: kG,
  startTime: CG,
  endTime: MG,
  leaveReason: AG,
  personalAffairs: IG,
  physicalDiscomfort: NG,
  familyReason: DG,
  otherReason: zG,
  trainingStudy: xG,
  temporaryMatter: EG,
  cancel: RG,
  confirm: FG,
  sunday: HG,
  monday: LG,
  tuesday: BG,
  wednesday: UG,
  thursday: WG,
  friday: qG,
  saturday: GG
}, u6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calendarTitle: jG,
  cancel: RG,
  confirm: FG,
  default: d6e,
  endTime: MG,
  familyReason: DG,
  friday: qG,
  leaveReason: AG,
  monday: LG,
  otherReason: zG,
  personalAffairs: IG,
  physicalDiscomfort: NG,
  restTimeArrangement: kG,
  saturday: GG,
  startTime: CG,
  sunday: HG,
  temporaryMatter: EG,
  thursday: WG,
  title: wG,
  trainingStudy: xG,
  tuesday: BG,
  wednesday: UG
}, Symbol.toStringTag, { value: "Module" })), VG = "登录中", YG = "请输入账号", KG = "请输入密码", QG = "忘记密码", XG = "还没有账号", JG = "去注册", ZG = "登录代表您同意", eV = "请先阅读并同意协议", oV = "请输入手机号", tV = "快捷登录", nV = "账号密码登录", sV = "输入账号密码登录", rV = "商家未开启账号密码登录", aV = "手机号登录", cV = "输入手机号验证码登录", iV = "商家未开启手机号登录", p6e = {
  logining: VG,
  usernamePlaceholder: YG,
  passwordPlaceholder: KG,
  resetpwd: QG,
  noAccount: XG,
  toRegister: JG,
  agreeTips: ZG,
  isAgreeTips: eV,
  mobilePlaceholder: oV,
  oneClicklogin: tV,
  accountLogin: nV,
  accountLoginTip: sV,
  accountLoginError: rV,
  mobileLogin: aV,
  mobileLoginTip: cV,
  mobileLoginError: iV
}, m6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountLogin: nV,
  accountLoginError: rV,
  accountLoginTip: sV,
  agreeTips: ZG,
  default: p6e,
  isAgreeTips: eV,
  logining: VG,
  mobileLogin: aV,
  mobileLoginError: iV,
  mobileLoginTip: cV,
  mobilePlaceholder: oV,
  noAccount: XG,
  oneClicklogin: tV,
  passwordPlaceholder: KG,
  resetpwd: QG,
  toRegister: JG,
  usernamePlaceholder: YG
}, Symbol.toStringTag, { value: "Module" })), lV = "注册中", dV = "输入账号密码注册", uV = "输入手机号验证码注册", pV = "请输入账号", mV = "账号不能是纯数字", _V = "请输入密码", gV = "请再次确认密码", hV = "两次输入的密码不一致", fV = "忘记密码", yV = "已有账号", $V = "去登录", vV = "注册代表您同意", bV = "请先阅读并同意协议", TV = "账号注册", PV = "手机号注册", SV = "请输入手机号", _6e = {
  registering: lV,
  usernameRegisterTip: dV,
  mobileRegisterTip: uV,
  usernamePlaceholder: pV,
  usernameTips: mV,
  passwordPlaceholder: _V,
  confirmPasswordPlaceholder: gV,
  confirmPasswordError: hV,
  resetpwd: fV,
  haveAccount: yV,
  toLogin: $V,
  registerAgreeTips: vV,
  isAgreeTips: bV,
  usernameRegister: TV,
  mobileRegister: PV,
  mobilePlaceholder: SV
}, g6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmPasswordError: hV,
  confirmPasswordPlaceholder: gV,
  default: _6e,
  haveAccount: yV,
  isAgreeTips: bV,
  mobilePlaceholder: SV,
  mobileRegister: PV,
  mobileRegisterTip: uV,
  passwordPlaceholder: _V,
  registerAgreeTips: vV,
  registering: lV,
  resetpwd: fV,
  toLogin: $V,
  usernamePlaceholder: pV,
  usernameRegister: TV,
  usernameRegisterTip: dV,
  usernameTips: mV
}, Symbol.toStringTag, { value: "Module" })), OV = "新任务", wV = "筛选", jV = "刷新", kV = "重置", CV = "收入", MV = "服务类型", AV = "服务距离", IV = "确定", NV = "我要抢单", DV = "暂无数据", h6e = {
  newJob: OV,
  sort: wV,
  calcation: jV,
  reset: kV,
  money: CV,
  serviceType: MV,
  serviceDistance: AV,
  confrim: IV,
  getOrder: NV,
  nothingMore: DV
}, f6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calcation: jV,
  confrim: IV,
  default: h6e,
  getOrder: NV,
  money: CV,
  newJob: OV,
  nothingMore: DV,
  reset: kV,
  serviceDistance: AV,
  serviceType: MV,
  sort: wV
}, Symbol.toStringTag, { value: "Module" })), zV = "我的账户", xV = "账户余额", EV = "提现", RV = "账户明细", FV = "收支统计", HV = "保证金", LV = "银行卡", BV = "今日账单", UV = "数据说明", WV = "此处为预计收入，如数据延迟，不影响最终结算，可稍后查询", qV = "预计收入", GV = "预计支出", VV = "日常保洁", YV = "深度清洁", KV = "清洁收入-日常清洁", QV = "未到账", XV = "已到账", JV = "收入", ZV = "支出", eY = "全部类型", oY = "全部日期", tY = "全部状态", nY = "暂无账单数据", sY = "到账情况", y6e = {
  myAccount: zV,
  accountBalance: xV,
  cashOut: EV,
  accountDetails: RV,
  receiptStatistics: FV,
  deposit: HV,
  bankCards: LV,
  todayBill: BV,
  dataDescription: UV,
  dataDelayTip: WV,
  expectedIncome: qV,
  expectedExpense: GV,
  dailyCleaning: VV,
  deepCleaning: YV,
  cleaningIncome: KV,
  notArrived: QV,
  arrived: XV,
  income: JV,
  expense: ZV,
  allTypes: eY,
  allDates: oY,
  allStatuses: tY,
  noBillData: nY,
  paymentStatus: sY
}, $6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: xV,
  accountDetails: RV,
  allDates: oY,
  allStatuses: tY,
  allTypes: eY,
  arrived: XV,
  bankCards: LV,
  cashOut: EV,
  cleaningIncome: KV,
  dailyCleaning: VV,
  dataDelayTip: WV,
  dataDescription: UV,
  deepCleaning: YV,
  default: y6e,
  deposit: HV,
  expectedExpense: GV,
  expectedIncome: qV,
  expense: ZV,
  income: JV,
  myAccount: zV,
  noBillData: nY,
  notArrived: QV,
  paymentStatus: sY,
  receiptStatistics: FV,
  todayBill: BV
}, Symbol.toStringTag, { value: "Module" })), rY = "我的账户", aY = "账户余额", cY = "提现", iY = "账户明细", lY = "收支统计", dY = "保证金", uY = "银行卡", pY = "今日账单", mY = "数据说明", _Y = "此处为预计收入，如数据延迟，不影响最终结算，可稍后查询", gY = "预计收入", hY = "预计支出", fY = "日常保洁", yY = "深度清洁", $Y = "清洁收入-日常清洁", vY = "未到账", bY = "已到账", TY = "元", v6e = {
  myAccount: rY,
  accountBalance: aY,
  withdraw: cY,
  accountDetails: iY,
  receiptStatistics: lY,
  deposit: dY,
  bankCards: uY,
  todayBill: pY,
  dataDescription: mY,
  dataDelayTip: _Y,
  expectedIncome: gY,
  expectedExpense: hY,
  dailyCleaning: fY,
  deepCleaning: yY,
  cleaningIncome: $Y,
  notArrived: vY,
  arrived: bY,
  yuan: TY
}, b6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountBalance: aY,
  accountDetails: iY,
  arrived: bY,
  bankCards: uY,
  cleaningIncome: $Y,
  dailyCleaning: fY,
  dataDelayTip: _Y,
  dataDescription: mY,
  deepCleaning: yY,
  default: v6e,
  deposit: dY,
  expectedExpense: hY,
  expectedIncome: gY,
  myAccount: rY,
  notArrived: vY,
  receiptStatistics: lY,
  todayBill: pY,
  withdraw: cY,
  yuan: TY
}, Symbol.toStringTag, { value: "Module" })), PY = "账户明细", SY = "收支统计", OY = "日统计", wY = "月统", jY = "单位: 千", kY = "收入", CY = "支出", MY = "今天收入(元)", AY = "今天支出(元)", IY = "维修服务收入", NY = "日常保洁收入", DY = "投诉扣款", zY = "到账情况", xY = "账户明细", EY = "收支统计", T6e = {
  accountDetail: PY,
  incomeExpenseSummary: SY,
  dailySummary: OY,
  monthlySummary: wY,
  unitThousand: jY,
  income: kY,
  expense: CY,
  todayIncome: MY,
  todayExpense: AY,
  repairServiceIncome: IY,
  dailyCleaningIncome: NY,
  complaintDeduction: DY,
  paymentStatus: zY,
  accountDetails: xY,
  receiptStatistics: EY
}, P6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accountDetail: PY,
  accountDetails: xY,
  complaintDeduction: DY,
  dailyCleaningIncome: NY,
  dailySummary: OY,
  default: T6e,
  expense: CY,
  income: kY,
  incomeExpenseSummary: SY,
  monthlySummary: wY,
  paymentStatus: zY,
  receiptStatistics: EY,
  repairServiceIncome: IY,
  todayExpense: AY,
  todayIncome: MY,
  unitThousand: jY
}, Symbol.toStringTag, { value: "Module" })), RY = "提现", FY = "可提现余额", HY = "￥", LY = "全部提现", BY = "请输入提现金额", UY = "手续费：￥", WY = "最低提现金额", qY = "，手续费率：", GY = "提现方式", VY = "微信提现", YY = "快速到账，无需审核", KY = "微信收款码", QY = "提现至微信收款码", XY = "请先添加微信号", JY = "支付宝", ZY = "提现至支付宝", eK = "银行卡", oK = "提现至银行卡：{bankName}", tK = "请先添加银行卡", nK = "添加", sK = "立即提现", rK = "提现设置未开启", aK = "账户异常", cK = "请选择提现方式", iK = "提现金额格式错误", lK = "提现金额超出可提现余额", dK = "提现金额低于最低限额", uK = "请先添加支付宝账号", S6e = {
  title: RY,
  availableBalance: FY,
  currency: HY,
  allMoney: LY,
  enterAmount: BY,
  fee: UY,
  minAmount: WY,
  feeRate: qY,
  paymentMethod: GY,
  wechatPay: VY,
  wechatPayDesc: YY,
  wechatCode: KY,
  wechatCodeDesc: QY,
  addWechat: XY,
  alipay: JY,
  alipayDesc: ZY,
  bank: eK,
  bankDesc: oK,
  addBank: tK,
  add: nK,
  submit: sK,
  notOpen: rK,
  abnormal: aK,
  noMethod: cK,
  invalidFormat: iK,
  exceedLimit: lK,
  belowMin: dK,
  addAlipay: uK
}, O6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormal: aK,
  add: nK,
  addAlipay: uK,
  addBank: tK,
  addWechat: XY,
  alipay: JY,
  alipayDesc: ZY,
  allMoney: LY,
  availableBalance: FY,
  bank: eK,
  bankDesc: oK,
  belowMin: dK,
  currency: HY,
  default: S6e,
  enterAmount: BY,
  exceedLimit: lK,
  fee: UY,
  feeRate: qY,
  invalidFormat: iK,
  minAmount: WY,
  noMethod: cK,
  notOpen: rK,
  paymentMethod: GY,
  submit: sK,
  title: RY,
  wechatCode: KY,
  wechatCodeDesc: QY,
  wechatPay: VY,
  wechatPayDesc: YY
}, Symbol.toStringTag, { value: "Module" })), pK = "编辑银行卡", mK = "添加银行卡", _K = "请填写正确的银行卡信息", gK = "添加银行卡后可用于提现", hK = "持卡人姓名", fK = "请输入持卡人姓名", yK = "开户银行", $K = "请输入开户银行", vK = "银行卡号", bK = "请输入银行卡号", TK = "编辑支付宝账号", PK = "添加支付宝账号", SK = "请填写正确的支付宝信息", OK = "添加支付宝后可用于提现", wK = "支付宝姓名", jK = "请输入支付宝姓名", kK = "支付宝账号", CK = "请输入支付宝账号", MK = "请上传支付宝收款码", AK = "编辑微信收款码", IK = "添加微信收款码", NK = "请填写正确的微信收款码信息", DK = "添加微信收款码后可用于提现", zK = "微信姓名", xK = "请输入微信姓名", EK = "微信账号", RK = "请输入微信账号", FK = "请上传微信收款码", HK = "保存", LK = "确定要删除该账户吗？", BK = "确定", UK = "取消", WK = "编辑账户", qK = "添加账户", w6e = {
  editBankCard: pK,
  addBankCard: mK,
  editBankCardTips: _K,
  addBankCardTips: gK,
  bankRealname: hK,
  bankRealnamePlaceholder: fK,
  bankName: yK,
  bankNamePlaceholder: $K,
  bankAccountNo: vK,
  bankAccountNoPlaceholder: bK,
  editAlipayAccount: TK,
  addAlipayAccount: PK,
  editAlipayAccountTips: SK,
  addAlipayAccountTips: OK,
  alipayRealname: wK,
  alipayRealnamePlaceholder: jK,
  alipayAccountNo: kK,
  alipayAccountNoPlaceholder: CK,
  alipayAccountImgPlaceholder: MK,
  editWechatCodeAccount: AK,
  addWechatCodeAccount: IK,
  editWechatCodeAccountTips: NK,
  addWechatCodeAccountTips: DK,
  wechatCodeRealname: zK,
  wechatCodeRealnamePlaceholder: xK,
  wechatCodeAccountNo: EK,
  wechatCodeAccountNoPlaceholder: RK,
  wechatCodeAccountImgPlaceholder: FK,
  save: HK,
  deleteConfirm: LK,
  confirm: BK,
  cancel: UK,
  editAccountTitle: WK,
  addAccountTitle: qK
}, j6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAccountTitle: qK,
  addAlipayAccount: PK,
  addAlipayAccountTips: OK,
  addBankCard: mK,
  addBankCardTips: gK,
  addWechatCodeAccount: IK,
  addWechatCodeAccountTips: DK,
  alipayAccountImgPlaceholder: MK,
  alipayAccountNo: kK,
  alipayAccountNoPlaceholder: CK,
  alipayRealname: wK,
  alipayRealnamePlaceholder: jK,
  bankAccountNo: vK,
  bankAccountNoPlaceholder: bK,
  bankName: yK,
  bankNamePlaceholder: $K,
  bankRealname: hK,
  bankRealnamePlaceholder: fK,
  cancel: UK,
  confirm: BK,
  default: w6e,
  deleteConfirm: LK,
  editAccountTitle: WK,
  editAlipayAccount: TK,
  editAlipayAccountTips: SK,
  editBankCard: pK,
  editBankCardTips: _K,
  editWechatCodeAccount: AK,
  editWechatCodeAccountTips: NK,
  save: HK,
  wechatCodeAccountImgPlaceholder: FK,
  wechatCodeAccountNo: EK,
  wechatCodeAccountNoPlaceholder: RK,
  wechatCodeRealname: zK,
  wechatCodeRealnamePlaceholder: xK
}, Symbol.toStringTag, { value: "Module" })), GK = "银行卡列表", VK = "微信收款码列表", YK = "支付宝账号列表", KK = "银行卡", QK = "微信收款码", XK = "支付宝账号", JK = "尾号", ZK = "暂无账户信息，点击下方按钮添加", eQ = "暂无银行卡", oQ = "暂无微信收款码", tQ = "暂无支付宝账号", nQ = "添加银行卡", sQ = "添加微信收款码", rQ = "添加支付宝账号", k6e = {
  bankCardList: GK,
  wechatCodeList: VK,
  alipayAccountList: YK,
  bankCard: KK,
  wechatCode: QK,
  alipayAccountNo: XK,
  endNumber: JK,
  noAccountDesc: ZK,
  noBankCard: eQ,
  noWechatCode: oQ,
  noAlipayAccount: tQ,
  addBankCard: nQ,
  addWechatCode: sQ,
  addAlipayAccount: rQ,
  delete: "删除"
}, C6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAlipayAccount: rQ,
  addBankCard: nQ,
  addWechatCode: sQ,
  alipayAccountList: YK,
  alipayAccountNo: XK,
  bankCard: KK,
  bankCardList: GK,
  default: k6e,
  endNumber: JK,
  noAccountDesc: ZK,
  noAlipayAccount: tQ,
  noBankCard: eQ,
  noWechatCode: oQ,
  wechatCode: QK,
  wechatCodeList: VK
}, Symbol.toStringTag, { value: "Module" })), aQ = "申请时间", cQ = "审核中，请耐心等待...", iQ = "转账中，请耐心等待...", lQ = "已转账，请及时查收", dQ = "提现已取消", uQ = "余额记录", pQ = "佣金记录", mQ = "暂无提现记录", _Q = "暂无佣金记录", gQ = "提现方式：", M6e = {
  applyTime: aQ,
  toBeReviewed: cQ,
  toBeTransfer: iQ,
  transfer: lQ,
  cancelApply: dQ,
  balanceDetail: uQ,
  commissionDetail: pQ,
  emptyTip: mQ,
  commissemptyTip: _Q,
  rechargeType: gQ
}, A6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyTime: aQ,
  balanceDetail: uQ,
  cancelApply: dQ,
  commissemptyTip: _Q,
  commissionDetail: pQ,
  default: M6e,
  emptyTip: mQ,
  rechargeType: gQ,
  toBeReviewed: cQ,
  toBeTransfer: iQ,
  transfer: lQ
}, Symbol.toStringTag, { value: "Module" })), hQ = "当前状态", fQ = "提现单号", yQ = "手续费", $Q = "申请时间", vQ = "审核时间", bQ = "银行名称", TQ = "收款账号", PQ = "拒绝理由", SQ = "转账方式", OQ = "转账时间", wQ = "付款凭证", jQ = "转账补充说明", kQ = "真实姓名", CQ = "持卡人姓名", MQ = "收款码", AQ = "收款方信息", IQ = "转账信息", NQ = "收款方昵称", DQ = "收款方头像", zQ = "转账单号", xQ = "提现", EQ = "取消提现", I6e = {
  statusName: hQ,
  cashOutNo: fQ,
  serviceMoney: yQ,
  createTime: $Q,
  auditTime: vQ,
  transferBank: bQ,
  transferAccount: TQ,
  refuseReason: PQ,
  transferTypeName: SQ,
  transferTime: OQ,
  transferVoucher: wQ,
  transferRemark: jQ,
  realname: kQ,
  bankRealname: CQ,
  transferCode: MQ,
  proceedsInfo: AQ,
  transferInfo: IQ,
  transferNickname: NQ,
  transferImg: DQ,
  transferNo: zQ,
  cashOutNow: xQ,
  cashOutCancel: EQ
}, N6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTime: vQ,
  bankRealname: CQ,
  cashOutCancel: EQ,
  cashOutNo: fQ,
  cashOutNow: xQ,
  createTime: $Q,
  default: I6e,
  proceedsInfo: AQ,
  realname: kQ,
  refuseReason: PQ,
  serviceMoney: yQ,
  statusName: hQ,
  transferAccount: TQ,
  transferBank: bQ,
  transferCode: MQ,
  transferImg: DQ,
  transferInfo: IQ,
  transferNickname: NQ,
  transferNo: zQ,
  transferRemark: jQ,
  transferTime: OQ,
  transferTypeName: SQ,
  transferVoucher: wQ
}, Symbol.toStringTag, { value: "Module" })), RQ = "师傅详情", FQ = "编辑", HQ = "编辑师傅信息", LQ = "更换头像", BQ = "姓名", UQ = "手机号", WQ = "个人简介", qQ = "请输入姓名", GQ = "请输入手机号", VQ = "请输入个人简介", YQ = "取消", KQ = "保存", QQ = "保存成功", XQ = "保存失败", JQ = "请输入姓名", ZQ = "姓名长度应为2-20个字符", eX = "请输入手机号", oX = "请输入正确的手机号格式", tX = "工作中", nX = "休息中", sX = "手机号：", rX = "已完成订单", aX = "异常订单", cX = "退款订单", iX = "好评率", lX = "个人简介", dX = "资质证书", uX = "加载失败", pX = "暂无介绍", mX = "技能专长", _X = "从业{years}年", gX = "服务{count}单", hX = "最多允许上传{maxCount}张图片", fX = "上传失败", yX = "请上传头像", $X = "请输入个人简介", vX = "个人简介长度应为10-200个字符", bX = "保存中...", D6e = {
  technicianDetail: RQ,
  edit: FQ,
  editTechnicianInfo: HQ,
  changeAvatar: LQ,
  name: BQ,
  phone: UQ,
  selfIntroduction: WQ,
  pleaseEnterName: qQ,
  pleaseEnterPhone: GQ,
  pleaseEnterIntroduction: VQ,
  cancel: YQ,
  save: KQ,
  saveSuccess: QQ,
  saveFailed: XQ,
  nameRequired: JQ,
  nameLength: ZQ,
  phoneRequired: eX,
  phoneFormat: oX,
  working: tX,
  resting: nX,
  phoneNumber: sX,
  completedOrders: rX,
  abnormalOrders: aX,
  refundOrders: cX,
  positiveRate: iX,
  personalProfile: lX,
  qualificationCertificate: dX,
  loadFailed: uX,
  noIntroduction: pX,
  skills: mX,
  experience_years: _X,
  service_orders: gX,
  maxUploadImages: hX,
  uploadFailed: fX,
  avatarRequired: yX,
  introductionRequired: $X,
  introductionLength: vX,
  saving: bX
}, z6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abnormalOrders: aX,
  avatarRequired: yX,
  cancel: YQ,
  changeAvatar: LQ,
  completedOrders: rX,
  default: D6e,
  edit: FQ,
  editTechnicianInfo: HQ,
  experience_years: _X,
  introductionLength: vX,
  introductionRequired: $X,
  loadFailed: uX,
  maxUploadImages: hX,
  name: BQ,
  nameLength: ZQ,
  nameRequired: JQ,
  noIntroduction: pX,
  personalProfile: lX,
  phone: UQ,
  phoneFormat: oX,
  phoneNumber: sX,
  phoneRequired: eX,
  pleaseEnterIntroduction: VQ,
  pleaseEnterName: qQ,
  pleaseEnterPhone: GQ,
  positiveRate: iX,
  qualificationCertificate: dX,
  refundOrders: cX,
  resting: nX,
  save: KQ,
  saveFailed: XQ,
  saveSuccess: QQ,
  saving: bX,
  selfIntroduction: WQ,
  service_orders: gX,
  skills: mX,
  technicianDetail: RQ,
  uploadFailed: fX,
  working: tX
}, Symbol.toStringTag, { value: "Module" })), TX = "反馈标题", PX = "反馈内容", SX = "上传图片（选填）", OX = "提交反馈", wX = "请输入反馈标题", jX = "请详细描述您遇到的问题或建议", kX = "反馈内容请至少输入10个字符", CX = "反馈提交成功，感谢您的建议", MX = "反馈提交失败", AX = "网络错误，请稍后重试", x6e = {
  feedbackTitle: TX,
  feedbackContent: PX,
  uploadImage: SX,
  submitFeedback: OX,
  pleaseInputFeedbackTitle: wX,
  pleaseDescribeIssue: jX,
  feedbackContentMinLength: kX,
  feedbackSubmitSuccess: CX,
  feedbackSubmitFail: MX,
  networkError: AX
}, E6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: x6e,
  feedbackContent: PX,
  feedbackContentMinLength: kX,
  feedbackSubmitFail: MX,
  feedbackSubmitSuccess: CX,
  feedbackTitle: TX,
  networkError: AX,
  pleaseDescribeIssue: jX,
  pleaseInputFeedbackTitle: wX,
  submitFeedback: OX,
  uploadImage: SX
}, Symbol.toStringTag, { value: "Module" })), IX = "帮助详情", NX = "加载中...", DX = "浏览次数", zX = "更新时间", xX = "暂无数据", EX = "缺少帮助文档ID", RX = "网络错误，请稍后重试", R6e = {
  helpDetail: IX,
  loading: NX,
  viewsCount: DX,
  updateTime: zX,
  noData: xX,
  missingId: EX,
  networkError: RX
}, F6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: R6e,
  helpDetail: IX,
  loading: NX,
  missingId: EX,
  networkError: RX,
  noData: xX,
  updateTime: zX,
  viewsCount: DX
}, Symbol.toStringTag, { value: "Module" })), FX = "帮助中心", HX = "操作答疑", LX = "操作步骤", BX = "管理平台", UX = "佣金分成与支付", WX = "常见问题", qX = "问题分类", GX = "联系客服", VX = "没有更多内容啦~", H6e = {
  helpCenter: FX,
  operationFAQ: HX,
  operationSteps: LX,
  managementPlatform: BX,
  commissionPayment: UX,
  commonProblems: WX,
  problemCategories: qX,
  contactService: GX,
  noMoreContent: VX
}, L6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  commissionPayment: UX,
  commonProblems: WX,
  contactService: GX,
  default: H6e,
  helpCenter: FX,
  managementPlatform: BX,
  noMoreContent: VX,
  operationFAQ: HX,
  operationSteps: LX,
  problemCategories: qX
}, Symbol.toStringTag, { value: "Module" })), YX = "机构名称", KX = "今日收入(元)", QX = "我的账户", XX = "今日完成单量(单)", JX = "订单统计", ZX = "违规申诉", eJ = "我的评价", oJ = "所属机构", tJ = "机构信息", nJ = "排班管理", sJ = "请假", rJ = "服务分析", aJ = "服务数据", cJ = "设置", iJ = "工作必备", lJ = "客户服务", dJ = "个人资料", uJ = "帮助中心", pJ = "区域排名", B6e = {
  storeName: YX,
  todayMoney: KX,
  myAccount: QX,
  orderFinshNumber: XX,
  orderNumber: JX,
  ViolationAppeal: ZX,
  MyReview: eJ,
  store: oJ,
  storeInfo: tJ,
  workTime: nJ,
  levalWork: sJ,
  ServiceAnalysis: rJ,
  servicesData: aJ,
  set: cJ,
  workTools: iJ,
  kefuServices: lJ,
  memberInfo: dJ,
  helpCenter: uJ,
  areaData: pJ
}, U6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MyReview: eJ,
  ServiceAnalysis: rJ,
  ViolationAppeal: ZX,
  areaData: pJ,
  default: B6e,
  helpCenter: uJ,
  kefuServices: lJ,
  levalWork: sJ,
  memberInfo: dJ,
  myAccount: QX,
  orderFinshNumber: XX,
  orderNumber: JX,
  servicesData: aJ,
  set: cJ,
  store: oJ,
  storeInfo: tJ,
  storeName: YX,
  todayMoney: KX,
  workTime: nJ,
  workTools: iJ
}, Symbol.toStringTag, { value: "Module" })), mJ = "已评价", _J = "综合", gJ = "时间", hJ = "暂无评价", fJ = "发布于", yJ = "服务信息", $J = "评价内容", vJ = "加载失败", W6e = {
  evaluated: mJ,
  comprehensive: _J,
  time: gJ,
  noEvaluation: hJ,
  published: fJ,
  serviceInfo: yJ,
  evaluationContent: $J,
  loadFailed: vJ
}, q6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  comprehensive: _J,
  default: W6e,
  evaluated: mJ,
  evaluationContent: $J,
  loadFailed: vJ,
  noEvaluation: hJ,
  published: fJ,
  serviceInfo: yJ,
  time: gJ
}, Symbol.toStringTag, { value: "Module" })), bJ = "订单统计", TJ = "今日订单", PJ = "月订单", SJ = "待服务订单", OJ = "待验收订单", wJ = "已完成订单", jJ = "订单明细", kJ = "已完成", CJ = "退款/售后", MJ = "已关闭", AJ = "开锁服务", IJ = "订单编号：", G6e = {
  title: bJ,
  todayOrders: TJ,
  monthOrders: PJ,
  pendingService: SJ,
  pendingAcceptance: OJ,
  completedOrders: wJ,
  orderDetails: jJ,
  completed: kJ,
  refund: CJ,
  cancelled: MJ,
  serviceType: AJ,
  orderNumber: IJ
}, V6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelled: MJ,
  completed: kJ,
  completedOrders: wJ,
  default: G6e,
  monthOrders: PJ,
  orderDetails: jJ,
  orderNumber: IJ,
  pendingAcceptance: OJ,
  pendingService: SJ,
  refund: CJ,
  serviceType: AJ,
  title: bJ,
  todayOrders: TJ
}, Symbol.toStringTag, { value: "Module" })), NJ = "区域师傅排名", DJ = "机构师傅排名", zJ = "加载中...", Y6e = {
  regionTechnicianRank: NJ,
  storeTechnicianRank: DJ,
  loading: zJ
}, K6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Y6e,
  loading: zJ,
  regionTechnicianRank: NJ,
  storeTechnicianRank: DJ
}, Symbol.toStringTag, { value: "Module" })), xJ = "排班管理", EJ = "排班管理日历", RJ = "休息时间安排", FJ = "开始时间", HJ = "结束时间", LJ = "请假原因", BJ = "个人事务", UJ = "身体不适", WJ = "家庭原因", qJ = "其他原因", GJ = "培训学习", VJ = "临时有事", YJ = "取消", KJ = "确定", QJ = "日", XJ = "一", JJ = "二", ZJ = "三", eZ = "四", oZ = "五", tZ = "六", Q6e = {
  title: xJ,
  calendarTitle: EJ,
  restTimeArrangement: RJ,
  startTime: FJ,
  endTime: HJ,
  leaveReason: LJ,
  personalAffairs: BJ,
  physicalDiscomfort: UJ,
  familyReason: WJ,
  otherReason: qJ,
  trainingStudy: GJ,
  temporaryMatter: VJ,
  cancel: YJ,
  confirm: KJ,
  sunday: QJ,
  monday: XJ,
  tuesday: JJ,
  wednesday: ZJ,
  thursday: eZ,
  friday: oZ,
  saturday: tZ
}, X6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calendarTitle: EJ,
  cancel: YJ,
  confirm: KJ,
  default: Q6e,
  endTime: HJ,
  familyReason: WJ,
  friday: oZ,
  leaveReason: LJ,
  monday: XJ,
  otherReason: qJ,
  personalAffairs: BJ,
  physicalDiscomfort: UJ,
  restTimeArrangement: RJ,
  saturday: tZ,
  startTime: FJ,
  sunday: QJ,
  temporaryMatter: VJ,
  thursday: eZ,
  title: xJ,
  trainingStudy: GJ,
  tuesday: JJ,
  wednesday: ZJ
}, Symbol.toStringTag, { value: "Module" })), nZ = "机构资料", sZ = "基本信息", rZ = "机构名称", aZ = "机构人数", cZ = "联系方式", iZ = "负责人", lZ = "联系电话", dZ = "地址信息", uZ = "地图加载中...", pZ = "认证状态", mZ = "营业执照", _Z = "身份认证", gZ = "地址认证", hZ = "已完成", fZ = "未完成", yZ = "获取数据失败", J6e = {
  pageTitle: nZ,
  basicInfo: sZ,
  storeName: rZ,
  storeStaff: aZ,
  contactInfo: cZ,
  manager: iZ,
  contactPhone: lZ,
  addressInfo: dZ,
  mapLoading: uZ,
  authenticationStatus: pZ,
  businessLicense: mZ,
  idAuthentication: _Z,
  addressAuthentication: gZ,
  completed: hZ,
  uncompleted: fZ,
  fetchFailed: yZ
}, Z6e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addressAuthentication: gZ,
  addressInfo: dZ,
  authenticationStatus: pZ,
  basicInfo: sZ,
  businessLicense: mZ,
  completed: hZ,
  contactInfo: cZ,
  contactPhone: lZ,
  default: J6e,
  fetchFailed: yZ,
  idAuthentication: _Z,
  manager: iZ,
  mapLoading: uZ,
  pageTitle: nZ,
  storeName: rZ,
  storeStaff: aZ,
  uncompleted: fZ
}, Symbol.toStringTag, { value: "Module" })), $Z = "暂无数据", eqe = {
  nothingMore: $Z
}, oqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eqe,
  nothingMore: $Z
}, Symbol.toStringTag, { value: "Module" })), vZ = "增项服务", bZ = "全部", TZ = "待付款", PZ = "已付款", SZ = "共{count}件", OZ = "附加服务费用", wZ = "可添加服务", jZ = "添加前请与客户沟通好购买意向", kZ = "已选{count}件", CZ = "服务费", MZ = "服务费用：", AZ = "请输入", IZ = "确定并提交", NZ = "请输入大于0的金额", DZ = "加载失败", zZ = "实付款", xZ = "服务费是师傅完成服务后的收入", tqe = {
  pageTitle: vZ,
  tabAll: bZ,
  tabUnpaid: TZ,
  tabPaid: PZ,
  totalItems: SZ,
  additionalServiceFee: OZ,
  availableServices: wZ,
  serviceCommunicationTip: jZ,
  selectedItems: kZ,
  serviceFee: CZ,
  serviceFeeLabel: MZ,
  inputPlaceholder: AZ,
  submitButton: IZ,
  positiveAmountError: NZ,
  loadFailed: DZ,
  realMoney: zZ,
  serviceFeeDescription: xZ
}, nqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  additionalServiceFee: OZ,
  availableServices: wZ,
  default: tqe,
  inputPlaceholder: AZ,
  loadFailed: DZ,
  pageTitle: vZ,
  positiveAmountError: NZ,
  realMoney: zZ,
  selectedItems: kZ,
  serviceCommunicationTip: jZ,
  serviceFee: CZ,
  serviceFeeDescription: xZ,
  serviceFeeLabel: MZ,
  submitButton: IZ,
  tabAll: bZ,
  tabPaid: PZ,
  tabUnpaid: TZ,
  totalItems: SZ
}, Symbol.toStringTag, { value: "Module" })), EZ = "订单", RZ = "下单", FZ = "接单", HZ = "开始", LZ = "完成", BZ = "已支付", UZ = "未支付", WZ = "查看退款", qZ = "申请退款", GZ = "去支付", VZ = "查看", YZ = "服务人员", KZ = "待派单", QZ = "联系电话", XZ = "服务码", JZ = "注:服务人员上门时需提供", ZZ = "订单编号", eee = "交易流水号", oee = "创建时间", tee = "上门时间", nee = "买家留言", see = "支付方式", ree = "支付时间", aee = "项目金额", cee = "实付", iee = "首页", lee = "刷新", dee = "客服", uee = "收藏", pee = "没有更多内容啦~", mee = "的帮付", _ee = "导航", gee = "优惠金额", hee = "上门费用", fee = "单", yee = "订单未开始服务", $ee = "服务人员已确定出发", vee = "服务人员已打卡拍照", bee = "查看打卡照片", Tee = "服务时长总计", Pee = "预", See = "您有", Oee = "个订单已超时", wee = "个订单即将超时,请尽快处理!", jee = "服务项目", kee = "备注：", Cee = "订单收入", Mee = "附加服务", Aee = "服务费", Iee = "附加服务费用", Nee = "师傅完成服务后的预估收入", Dee = "附加服务费用是指新增附加服务的收入", zee = "其他信息", xee = "复制", Eee = "未获取到订单信息", Ree = "打卡照片", Fee = "加载失败", Hee = "天", Lee = "地图打开成功", Bee = "打开地图失败，请检查是否安装地图应用", Uee = "提示", Wee = "您确定要取消该订单吗？", qee = "取消成功", Gee = "取消失败", Vee = "您确定要删除该订单吗？", Yee = "删除成功", Kee = "删除失败", Qee = "待服务", Xee = "服务中", Jee = "已完成", Zee = "异常订单", eoe = "服务费是师傅完成服务后的收入", sqe = {
  order: EZ,
  placeOrder: RZ,
  takeOrders: FZ,
  start: HZ,
  finish: LZ,
  havePaid: BZ,
  notPaid: UZ,
  viewRefund: WZ,
  applyRefund: qZ,
  goToPay: GZ,
  show: VZ,
  servicePersonal: YZ,
  orderToBeSent: KZ,
  contactNumber: QZ,
  serviceCode: XZ,
  explain: JZ,
  onOrder: ZZ,
  transactionNumber: eee,
  createTime: oee,
  reserveServiceTime: tee,
  remark: nee,
  modePayment: see,
  payTime: ree,
  goodsMoney: aee,
  realMoney: cee,
  index: iee,
  refresh: lee,
  service: dee,
  collect: uee,
  nothingMore: pee,
  helpPay: mee,
  Navigation: _ee,
  couponMoney: gee,
  doorMonrey: hee,
  orderUnit: fee,
  orderNotStarted: yee,
  servicePersonDeparted: $ee,
  servicePersonCheckedIn: vee,
  viewCheckInPhotos: bee,
  totalServiceDuration: Tee,
  pre: Pee,
  youHave: See,
  ordersOverdue: Oee,
  ordersAboutToOverdue: wee,
  serviceItems: jee,
  remarkPrefix: kee,
  orderIncome: Cee,
  additionalService: Mee,
  serviceFee: Aee,
  additionalServiceFee: Iee,
  serviceFeeDesc: Nee,
  additionalServiceFeeDesc: Dee,
  otherInformation: zee,
  copy: xee,
  noOrderInfo: Eee,
  checkInPhotos: Ree,
  loadFailed: Fee,
  day: Hee,
  mapOpenedSuccessfully: Lee,
  mapOpenFailed: Bee,
  prompt: Uee,
  confirmCancelOrder: Wee,
  cancelSuccess: qee,
  cancelFailed: Gee,
  confirmDeleteOrder: Vee,
  deleteSuccess: Yee,
  deleteFailed: Kee,
  waitingService: Qee,
  inService: Xee,
  completed: Jee,
  abnormalOrder: Zee,
  serviceFeeDescription: eoe
}, rqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: _ee,
  abnormalOrder: Zee,
  additionalService: Mee,
  additionalServiceFee: Iee,
  additionalServiceFeeDesc: Dee,
  applyRefund: qZ,
  cancelFailed: Gee,
  cancelSuccess: qee,
  checkInPhotos: Ree,
  collect: uee,
  completed: Jee,
  confirmCancelOrder: Wee,
  confirmDeleteOrder: Vee,
  contactNumber: QZ,
  copy: xee,
  couponMoney: gee,
  createTime: oee,
  day: Hee,
  default: sqe,
  deleteFailed: Kee,
  deleteSuccess: Yee,
  doorMonrey: hee,
  explain: JZ,
  finish: LZ,
  goToPay: GZ,
  goodsMoney: aee,
  havePaid: BZ,
  helpPay: mee,
  inService: Xee,
  index: iee,
  loadFailed: Fee,
  mapOpenFailed: Bee,
  mapOpenedSuccessfully: Lee,
  modePayment: see,
  noOrderInfo: Eee,
  notPaid: UZ,
  nothingMore: pee,
  onOrder: ZZ,
  order: EZ,
  orderIncome: Cee,
  orderNotStarted: yee,
  orderToBeSent: KZ,
  orderUnit: fee,
  ordersAboutToOverdue: wee,
  ordersOverdue: Oee,
  otherInformation: zee,
  payTime: ree,
  placeOrder: RZ,
  pre: Pee,
  prompt: Uee,
  realMoney: cee,
  refresh: lee,
  remark: nee,
  remarkPrefix: kee,
  reserveServiceTime: tee,
  service: dee,
  serviceCode: XZ,
  serviceFee: Aee,
  serviceFeeDesc: Nee,
  serviceFeeDescription: eoe,
  serviceItems: jee,
  servicePersonCheckedIn: vee,
  servicePersonDeparted: $ee,
  servicePersonal: YZ,
  show: VZ,
  start: HZ,
  takeOrders: FZ,
  totalServiceDuration: Tee,
  transactionNumber: eee,
  viewCheckInPhotos: bee,
  viewRefund: WZ,
  waitingService: Qee,
  youHave: See
}, Symbol.toStringTag, { value: "Module" })), ooe = "订单", toe = "下单", noe = "接单", soe = "开始", roe = "完成", aoe = "已支付", coe = "未支付", ioe = "查看退款", loe = "申请退款", doe = "去支付", uoe = "查看", poe = "服务人员", moe = "待派单", _oe = "联系电话", goe = "服务码", hoe = "注:服务人员上门时需提供", foe = "订单编号", yoe = "交易流水号", $oe = "创建时间", voe = "上门时间", boe = "买家留言", Toe = "支付方式", Poe = "支付时间", Soe = "项目金额", Ooe = "实付", woe = "首页", joe = "刷新", koe = "客服", Coe = "收藏", Moe = "没有更多内容啦~", Aoe = "的帮付", Ioe = "导航", Noe = "优惠金额", Doe = "上门费用", zoe = "单", xoe = "订单未开始服务", Eoe = "服务人员已确定出发", Roe = "服务人员已打卡拍照", Foe = "查看打卡照片", Hoe = "服务时长总计", Loe = "预", Boe = "您有", Uoe = "个订单已超时", Woe = "个订单即将超时,请尽快处理!", qoe = "服务项目", Goe = "备注：", Voe = "订单收入", Yoe = "附加服务", Koe = "服务费", Qoe = "附加服务费用", Xoe = "师傅完成服务后的预估收入", Joe = "附加服务费用是指新增附加服务的收入", Zoe = "其他信息", ete = "复制", ote = "未获取到订单信息", tte = "打卡照片", nte = "加载失败", ste = "天", rte = "地图打开成功", ate = "打开地图失败，请检查是否安装地图应用", cte = "提示", ite = "您确定要取消该订单吗？", lte = "取消成功", dte = "取消失败", ute = "您确定要删除该订单吗？", pte = "删除成功", mte = "删除失败", _te = "待服务", gte = "服务中", hte = "已完成", fte = "异常订单", yte = "服务费是师傅完成服务后的收入", aqe = {
  order: ooe,
  placeOrder: toe,
  takeOrders: noe,
  start: soe,
  finish: roe,
  havePaid: aoe,
  notPaid: coe,
  viewRefund: ioe,
  applyRefund: loe,
  goToPay: doe,
  show: uoe,
  servicePersonal: poe,
  orderToBeSent: moe,
  contactNumber: _oe,
  serviceCode: goe,
  explain: hoe,
  onOrder: foe,
  transactionNumber: yoe,
  createTime: $oe,
  reserveServiceTime: voe,
  remark: boe,
  modePayment: Toe,
  payTime: Poe,
  goodsMoney: Soe,
  realMoney: Ooe,
  index: woe,
  refresh: joe,
  service: koe,
  collect: Coe,
  nothingMore: Moe,
  helpPay: Aoe,
  Navigation: Ioe,
  couponMoney: Noe,
  doorMonrey: Doe,
  orderUnit: zoe,
  orderNotStarted: xoe,
  servicePersonDeparted: Eoe,
  servicePersonCheckedIn: Roe,
  viewCheckInPhotos: Foe,
  totalServiceDuration: Hoe,
  pre: Loe,
  youHave: Boe,
  ordersOverdue: Uoe,
  ordersAboutToOverdue: Woe,
  serviceItems: qoe,
  remarkPrefix: Goe,
  orderIncome: Voe,
  additionalService: Yoe,
  serviceFee: Koe,
  additionalServiceFee: Qoe,
  serviceFeeDesc: Xoe,
  additionalServiceFeeDesc: Joe,
  otherInformation: Zoe,
  copy: ete,
  noOrderInfo: ote,
  checkInPhotos: tte,
  loadFailed: nte,
  day: ste,
  mapOpenedSuccessfully: rte,
  mapOpenFailed: ate,
  prompt: cte,
  confirmCancelOrder: ite,
  cancelSuccess: lte,
  cancelFailed: dte,
  confirmDeleteOrder: ute,
  deleteSuccess: pte,
  deleteFailed: mte,
  waitingService: _te,
  inService: gte,
  completed: hte,
  abnormalOrder: fte,
  serviceFeeDescription: yte
}, cqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: Ioe,
  abnormalOrder: fte,
  additionalService: Yoe,
  additionalServiceFee: Qoe,
  additionalServiceFeeDesc: Joe,
  applyRefund: loe,
  cancelFailed: dte,
  cancelSuccess: lte,
  checkInPhotos: tte,
  collect: Coe,
  completed: hte,
  confirmCancelOrder: ite,
  confirmDeleteOrder: ute,
  contactNumber: _oe,
  copy: ete,
  couponMoney: Noe,
  createTime: $oe,
  day: ste,
  default: aqe,
  deleteFailed: mte,
  deleteSuccess: pte,
  doorMonrey: Doe,
  explain: hoe,
  finish: roe,
  goToPay: doe,
  goodsMoney: Soe,
  havePaid: aoe,
  helpPay: Aoe,
  inService: gte,
  index: woe,
  loadFailed: nte,
  mapOpenFailed: ate,
  mapOpenedSuccessfully: rte,
  modePayment: Toe,
  noOrderInfo: ote,
  notPaid: coe,
  nothingMore: Moe,
  onOrder: foe,
  order: ooe,
  orderIncome: Voe,
  orderNotStarted: xoe,
  orderToBeSent: moe,
  orderUnit: zoe,
  ordersAboutToOverdue: Woe,
  ordersOverdue: Uoe,
  otherInformation: Zoe,
  payTime: Poe,
  placeOrder: toe,
  pre: Loe,
  prompt: cte,
  realMoney: Ooe,
  refresh: joe,
  remark: boe,
  remarkPrefix: Goe,
  reserveServiceTime: voe,
  service: koe,
  serviceCode: goe,
  serviceFee: Koe,
  serviceFeeDesc: Xoe,
  serviceFeeDescription: yte,
  serviceItems: qoe,
  servicePersonCheckedIn: Roe,
  servicePersonDeparted: Eoe,
  servicePersonal: poe,
  show: uoe,
  start: soe,
  takeOrders: noe,
  totalServiceDuration: Hoe,
  transactionNumber: yoe,
  viewCheckInPhotos: Foe,
  viewRefund: ioe,
  waitingService: _te,
  youHave: Boe
}, Symbol.toStringTag, { value: "Module" })), $te = "订单", vte = "下单", bte = "接单", Tte = "开始", Pte = "完成", Ste = "已支付", Ote = "未支付", wte = "查看退款", jte = "申请退款", kte = "去支付", Cte = "查看", Mte = "服务人员", Ate = "待派单", Ite = "联系电话", Nte = "服务码", Dte = "注:服务人员上门时需提供", zte = "订单编号", xte = "交易流水号", Ete = "创建时间", Rte = "上门时间", Fte = "买家留言", Hte = "支付方式", Lte = "支付时间", Bte = "项目金额", Ute = "实付", Wte = "首页", qte = "刷新", Gte = "客服", Vte = "收藏", Yte = "没有更多内容啦~", Kte = "的帮付", Qte = "导航", Xte = "优惠金额", Jte = "上门费用", Zte = "单", ene = "订单未开始服务", one = "服务人员已确定出发", tne = "服务人员已打卡拍照", nne = "查看打卡照片", sne = "服务时长总计", rne = "预", ane = "您有", cne = "个订单已超时", ine = "个订单即将超时,请尽快处理!", lne = "服务项目", dne = "备注：", une = "订单收入", pne = "附加服务", mne = "服务费", _ne = "附加服务费用", gne = "师傅完成服务后的预估收入", hne = "附加服务费用是指新增附加服务的收入", fne = "其他信息", yne = "复制", $ne = "未获取到订单信息", vne = "打卡照片", bne = "加载失败", Tne = "天", Pne = "地图打开成功", Sne = "打开地图失败，请检查是否安装地图应用", One = "提示", wne = "您确定要取消该订单吗？", jne = "取消成功", kne = "取消失败", Cne = "您确定要删除该订单吗？", Mne = "删除成功", Ane = "删除失败", Ine = "待服务", Nne = "服务中", Dne = "已完成", zne = "异常订单", xne = "服务费是师傅完成服务后的收入", iqe = {
  order: $te,
  placeOrder: vte,
  takeOrders: bte,
  start: Tte,
  finish: Pte,
  havePaid: Ste,
  notPaid: Ote,
  viewRefund: wte,
  applyRefund: jte,
  goToPay: kte,
  show: Cte,
  servicePersonal: Mte,
  orderToBeSent: Ate,
  contactNumber: Ite,
  serviceCode: Nte,
  explain: Dte,
  onOrder: zte,
  transactionNumber: xte,
  createTime: Ete,
  reserveServiceTime: Rte,
  remark: Fte,
  modePayment: Hte,
  payTime: Lte,
  goodsMoney: Bte,
  realMoney: Ute,
  index: Wte,
  refresh: qte,
  service: Gte,
  collect: Vte,
  nothingMore: Yte,
  helpPay: Kte,
  Navigation: Qte,
  couponMoney: Xte,
  doorMonrey: Jte,
  orderUnit: Zte,
  orderNotStarted: ene,
  servicePersonDeparted: one,
  servicePersonCheckedIn: tne,
  viewCheckInPhotos: nne,
  totalServiceDuration: sne,
  pre: rne,
  youHave: ane,
  ordersOverdue: cne,
  ordersAboutToOverdue: ine,
  serviceItems: lne,
  remarkPrefix: dne,
  orderIncome: une,
  additionalService: pne,
  serviceFee: mne,
  additionalServiceFee: _ne,
  serviceFeeDesc: gne,
  additionalServiceFeeDesc: hne,
  otherInformation: fne,
  copy: yne,
  noOrderInfo: $ne,
  checkInPhotos: vne,
  loadFailed: bne,
  day: Tne,
  mapOpenedSuccessfully: Pne,
  mapOpenFailed: Sne,
  prompt: One,
  confirmCancelOrder: wne,
  cancelSuccess: jne,
  cancelFailed: kne,
  confirmDeleteOrder: Cne,
  deleteSuccess: Mne,
  deleteFailed: Ane,
  waitingService: Ine,
  inService: Nne,
  completed: Dne,
  abnormalOrder: zne,
  serviceFeeDescription: xne
}, lqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: Qte,
  abnormalOrder: zne,
  additionalService: pne,
  additionalServiceFee: _ne,
  additionalServiceFeeDesc: hne,
  applyRefund: jte,
  cancelFailed: kne,
  cancelSuccess: jne,
  checkInPhotos: vne,
  collect: Vte,
  completed: Dne,
  confirmCancelOrder: wne,
  confirmDeleteOrder: Cne,
  contactNumber: Ite,
  copy: yne,
  couponMoney: Xte,
  createTime: Ete,
  day: Tne,
  default: iqe,
  deleteFailed: Ane,
  deleteSuccess: Mne,
  doorMonrey: Jte,
  explain: Dte,
  finish: Pte,
  goToPay: kte,
  goodsMoney: Bte,
  havePaid: Ste,
  helpPay: Kte,
  inService: Nne,
  index: Wte,
  loadFailed: bne,
  mapOpenFailed: Sne,
  mapOpenedSuccessfully: Pne,
  modePayment: Hte,
  noOrderInfo: $ne,
  notPaid: Ote,
  nothingMore: Yte,
  onOrder: zte,
  order: $te,
  orderIncome: une,
  orderNotStarted: ene,
  orderToBeSent: Ate,
  orderUnit: Zte,
  ordersAboutToOverdue: ine,
  ordersOverdue: cne,
  otherInformation: fne,
  payTime: Lte,
  placeOrder: vte,
  pre: rne,
  prompt: One,
  realMoney: Ute,
  refresh: qte,
  remark: Fte,
  remarkPrefix: dne,
  reserveServiceTime: Rte,
  service: Gte,
  serviceCode: Nte,
  serviceFee: mne,
  serviceFeeDesc: gne,
  serviceFeeDescription: xne,
  serviceItems: lne,
  servicePersonCheckedIn: tne,
  servicePersonDeparted: one,
  servicePersonal: Mte,
  show: Cte,
  start: Tte,
  takeOrders: bte,
  totalServiceDuration: sne,
  transactionNumber: xte,
  viewCheckInPhotos: nne,
  viewRefund: wte,
  waitingService: Ine,
  youHave: ane
}, Symbol.toStringTag, { value: "Module" })), Ene = "新任务", Rne = "筛选", Fne = "刷新", Hne = "重置", Lne = "收入", Bne = "服务类型", Une = "服务距离", Wne = "确定", qne = "我要抢单", Gne = "订单编号", Vne = "订单收入", Yne = "预估收入", Kne = "客户", Qne = "服务", Xne = "导航", Jne = "确定出发", Zne = "开始服务", ese = "打卡", ose = "附加服务", tse = "结束服务", nse = "暂无数据", dqe = {
  newJob: Ene,
  sort: Rne,
  calcation: Fne,
  reset: Hne,
  money: Lne,
  serviceType: Bne,
  serviceDistance: Une,
  confrim: Wne,
  getOrder: qne,
  orderNoTit: Gne,
  orderCommsion: Vne,
  ProjectedRevenue: Yne,
  user: Kne,
  services: Qne,
  Navigation: Xne,
  confirmGoOut: Jne,
  speakServices: Zne,
  callCard: ese,
  addServices: ose,
  endServices: tse,
  nothingMore: nse
}, uqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigation: Xne,
  ProjectedRevenue: Yne,
  addServices: ose,
  calcation: Fne,
  callCard: ese,
  confirmGoOut: Jne,
  confrim: Wne,
  default: dqe,
  endServices: tse,
  getOrder: qne,
  money: Lne,
  newJob: Ene,
  nothingMore: nse,
  orderCommsion: Vne,
  orderNoTit: Gne,
  reset: Hne,
  serviceDistance: Une,
  serviceType: Bne,
  services: Qne,
  sort: Rne,
  speakServices: Zne,
  user: Kne
}, Symbol.toStringTag, { value: "Module" })), sse = "联系人", rse = "请输入联系人姓名", ase = "手机号码", cse = "请输入手机号码", ise = "请输入正确的手机号", lse = "选择地区", dse = "请选择地区", use = "详细地址", pse = "请填写详细地址", mse = "设为默认地址", _se = "没有更多内容啦~", pqe = {
  name: sse,
  namePlaceholder: rse,
  mobile: ase,
  mobilePlaceholder: cse,
  mobileError: ise,
  selectArea: lse,
  selectAreaPlaceholder: dse,
  address: use,
  addressPlaceholder: pse,
  defaultAddress: mse,
  nothingMore: _se
}, mqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: use,
  addressPlaceholder: pse,
  default: pqe,
  defaultAddress: mse,
  mobile: ase,
  mobileError: ise,
  mobilePlaceholder: cse,
  name: sse,
  namePlaceholder: rse,
  nothingMore: _se,
  selectArea: lse,
  selectAreaPlaceholder: dse
}, Symbol.toStringTag, { value: "Module" })), gse = "联系人", hse = "请输入联系人姓名", fse = "手机号码", yse = "请输入手机号码", $se = "上门地址", vse = "选择地址", bse = "请选择地址", Tse = "详细地址", Pse = "详细地址如 1单元101", Sse = "请填写门牌号", Ose = "设为默认地址", wse = "修改", jse = "保存", kse = "没有更多内容啦~", _qe = {
  name: gse,
  namePlaceholder: hse,
  mobile: fse,
  mobilePlaceholder: yse,
  homeAddress: $se,
  selectAddress: vse,
  selectAddressPlaceholder: bse,
  address: Tse,
  addressPlaceholder: Pse,
  addressError: Sse,
  defaultAddress: Ose,
  update: wse,
  save: jse,
  nothingMore: kse
}, gqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Tse,
  addressError: Sse,
  addressPlaceholder: Pse,
  default: _qe,
  defaultAddress: Ose,
  homeAddress: $se,
  mobile: fse,
  mobilePlaceholder: yse,
  name: gse,
  namePlaceholder: hse,
  nothingMore: kse,
  save: jse,
  selectAddress: vse,
  selectAddressPlaceholder: bse,
  update: wse
}, Symbol.toStringTag, { value: "Module" })), Cse = "没有更多内容啦~", Mse = "添加上门地址", hqe = {
  default: "默认地址",
  noHomeAddress: Cse,
  addHomeAddress: Mse
}, fqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: Mse,
  default: hqe,
  noHomeAddress: Cse
}, Symbol.toStringTag, { value: "Module" })), Ase = "人选择", Ise = "已选", Nse = "次", Dse = "暂无项目介绍", zse = "暂无购买须知", xse = "暂无更多数据", Ese = "项目名称", Rse = "价格", Fse = "单位", Hse = "暂无价目表", Lse = "首页", Bse = "分享", Use = "客服", Wse = "立即预约", qse = "立即购买", Gse = "已下架", Vse = "没有更多内容啦~", Yse = "随叫随到，最快30分钟上门", Kse = "服务保障", Qse = "附近服务人员", Xse = "查看", Jse = "用户评价", Zse = "推荐套餐", ere = "项目详情", ore = "单独购买", yqe = {
  selectNum: Ase,
  selected: Ise,
  time: Nse,
  noProjectInt: Dse,
  noPurchase: zse,
  noMore: xse,
  projectName: Ese,
  price: Rse,
  unit: Fse,
  noPriceList: Hse,
  index: Lse,
  share: Bse,
  service: Use,
  bookNow: Wse,
  orderNow: qse,
  delisted: Gse,
  nothingMore: Vse,
  timeWarning: Yse,
  serviceSafe: Kse,
  serviceTechnican: Qse,
  lookMore: Xse,
  userEvaluate: Jse,
  recommedGoods: Zse,
  detailText: ere,
  selfBuy: ore
}, $qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: Wse,
  default: yqe,
  delisted: Gse,
  detailText: ere,
  index: Lse,
  lookMore: Xse,
  noMore: xse,
  noPriceList: Hse,
  noProjectInt: Dse,
  noPurchase: zse,
  nothingMore: Vse,
  orderNow: qse,
  price: Rse,
  projectName: Ese,
  recommedGoods: Zse,
  selectNum: Ase,
  selected: Ise,
  selfBuy: ore,
  service: Use,
  serviceSafe: Kse,
  serviceTechnican: Qse,
  share: Bse,
  time: Nse,
  timeWarning: Yse,
  unit: Fse,
  userEvaluate: Jse
}, Symbol.toStringTag, { value: "Module" })), tre = "我的次卡", vqe = {
  myCard: tre
}, bqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vqe,
  myCard: tre
}, Symbol.toStringTag, { value: "Module" })), nre = "请输入搜索关键词", sre = "全部分类", rre = "预约", are = "已售", cre = "没有更多内容啦~", Tqe = {
  searchKeywordPlaceholder: nre,
  allCategory: sre,
  reserveBtn: rre,
  soldOut: are,
  nothingMore: cre
}, Pqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: sre,
  default: Tqe,
  nothingMore: cre,
  reserveBtn: rre,
  searchKeywordPlaceholder: nre,
  soldOut: are
}, Symbol.toStringTag, { value: "Module" })), ire = "人选择", lre = "已选", dre = "次", ure = "暂无项目介绍", pre = "暂无购买须知", mre = "暂无更多数据", _re = "项目名称", gre = "价格", hre = "单位", fre = "暂无价目表", yre = "首页", $re = "分享", vre = "客服", bre = "立即预约", Tre = "立即购买", Pre = "已下架", Sre = "没有更多内容啦~", Ore = "随叫随到 最快30分钟上门", wre = "服务保障", jre = "附近服务人员", kre = "查看", Cre = "用户评价", Mre = "推荐套餐", Are = "项目详情", Ire = "单独购买", Sqe = {
  selectNum: ire,
  selected: lre,
  time: dre,
  noProjectInt: ure,
  noPurchase: pre,
  noMore: mre,
  projectName: _re,
  price: gre,
  unit: hre,
  noPriceList: fre,
  index: yre,
  share: $re,
  service: vre,
  bookNow: bre,
  orderNow: Tre,
  delisted: Pre,
  nothingMore: Sre,
  timeWarning: Ore,
  serviceSafe: wre,
  serviceTechnican: jre,
  lookMore: kre,
  userEvaluate: Cre,
  recommedGoods: Mre,
  detailText: Are,
  selfBuy: Ire
}, Oqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: bre,
  default: Sqe,
  delisted: Pre,
  detailText: Are,
  index: yre,
  lookMore: kre,
  noMore: mre,
  noPriceList: fre,
  noProjectInt: ure,
  noPurchase: pre,
  nothingMore: Sre,
  orderNow: Tre,
  price: gre,
  projectName: _re,
  recommedGoods: Mre,
  selectNum: ire,
  selected: lre,
  selfBuy: Ire,
  service: vre,
  serviceSafe: wre,
  serviceTechnican: jre,
  share: $re,
  time: dre,
  timeWarning: Ore,
  unit: hre,
  userEvaluate: Cre
}, Symbol.toStringTag, { value: "Module" })), Nre = "没有更多内容啦~", Dre = "请搜索您想要的商品", zre = "综合", xre = "销量", Ere = "价格", Rre = "筛选", Fre = "全部分类", Hre = "已售", Lre = "没有更多内容啦~", wqe = {
  end: Nre,
  searchPlaceholder: Dre,
  synthesis: zre,
  sales: xre,
  price: Ere,
  screen: Rre,
  allCategory: Fre,
  soldOut: Hre,
  nothingMore: Lre
}, jqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: Fre,
  default: wqe,
  end: Nre,
  nothingMore: Lre,
  price: Ere,
  sales: xre,
  screen: Rre,
  searchPlaceholder: Dre,
  soldOut: Hre,
  synthesis: zre
}, Symbol.toStringTag, { value: "Module" })), Bre = "请输入搜索关键词", Ure = "抢购", Wre = "没有更多内容啦~", qre = "没有更多内容啦~", Gre = "已售", Vre = "订单号", Yre = "实付款", Kre = "详情", kqe = {
  searchNamePlaceholder: Bre,
  reserveBtn: Ure,
  nothingMore: Wre,
  noHomeAddress: qre,
  soldOut: Gre,
  orderNo: Vre,
  actualPayment: Yre,
  orderDetail: Kre
}, Cqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: Yre,
  default: kqe,
  noHomeAddress: qre,
  nothingMore: Wre,
  orderDetail: Kre,
  orderNo: Vre,
  reserveBtn: Ure,
  searchNamePlaceholder: Bre,
  soldOut: Gre
}, Symbol.toStringTag, { value: "Module" })), Qre = "订单数(个)", Xre = "订单金额(元)", Jre = "订单管理", Zre = "查看更多", eae = "待服务订单", oae = "服务中订单", tae = "已服务订单", nae = "数量：", sae = "查看详情", rae = "服务项目", aae = "加载中", cae = "没有更多内容啦~", Mqe = {
  orderNum: Qre,
  orderAmount: Xre,
  orderManagement: Jre,
  viewMore: Zre,
  pendingOrder: eae,
  orderInService: oae,
  finishedOrder: tae,
  amount: nae,
  viewDetails: sae,
  serviceItem: rae,
  loadingText: aae,
  nothingMore: cae
}, Aqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amount: nae,
  default: Mqe,
  finishedOrder: tae,
  loadingText: aae,
  nothingMore: cae,
  orderAmount: Xre,
  orderInService: oae,
  orderManagement: Jre,
  orderNum: Qre,
  pendingOrder: eae,
  serviceItem: rae,
  viewDetails: sae,
  viewMore: Zre
}, Symbol.toStringTag, { value: "Module" })), iae = "添加服务项目", lae = "编辑服务项目", dae = "服务项目", uae = "请输入服务项目", pae = "价格", mae = "请输入价格", _ae = "元", gae = "项目图片", hae = "提交", fae = "加载中...", yae = "没有更多内容啦~", Iqe = {
  addServiceItem: iae,
  editServiceItem: lae,
  serviceItem: dae,
  serviceItemPlaceholder: uae,
  price: pae,
  pricePlaceholder: mae,
  yuan: _ae,
  serviceImg: gae,
  save: hae,
  loading: fae,
  nothingMore: yae
}, Nqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: iae,
  default: Iqe,
  editServiceItem: lae,
  loading: fae,
  nothingMore: yae,
  price: pae,
  pricePlaceholder: mae,
  save: hae,
  serviceImg: gae,
  serviceItem: dae,
  serviceItemPlaceholder: uae,
  yuan: _ae
}, Symbol.toStringTag, { value: "Module" })), $ae = "下单", vae = "接单", bae = "开始", Tae = "完成", Pae = "服务日期:", Sae = "新增服务项目", Oae = "已支付", wae = "未支付", jae = "去支付", kae = "查看", Cae = "编辑", Mae = "订单信息", Aae = "订单编号", Iae = "联系人姓名", Nae = "联系电话", Dae = "备注", zae = "首页", xae = "联系客户", Eae = "刷新", Rae = "服务码", Fae = "没有更多内容啦~", Hae = "查看退款", Dqe = {
  placeOrder: $ae,
  takeOrders: vae,
  start: bae,
  finish: Tae,
  serviceDate: Pae,
  addServiceItem: Sae,
  havePaid: Oae,
  notPaid: wae,
  goToPay: jae,
  show: kae,
  edit: Cae,
  delete: "删除",
  orderInfo: Mae,
  orderNo: Aae,
  person: Iae,
  personTel: Nae,
  remark: Dae,
  index: zae,
  contact: xae,
  refresh: Eae,
  checkCode: Rae,
  nothingMore: Fae,
  viewRefund: Hae
}, zqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: Sae,
  checkCode: Rae,
  contact: xae,
  default: Dqe,
  edit: Cae,
  finish: Tae,
  goToPay: jae,
  havePaid: Oae,
  index: zae,
  notPaid: wae,
  nothingMore: Fae,
  orderInfo: Mae,
  orderNo: Aae,
  person: Iae,
  personTel: Nae,
  placeOrder: $ae,
  refresh: Eae,
  remark: Dae,
  serviceDate: Pae,
  show: kae,
  start: bae,
  takeOrders: vae,
  viewRefund: Hae
}, Symbol.toStringTag, { value: "Module" })), Lae = "服务日期:", Bae = "已支付", Uae = "未支付", Wae = "联系客户", qae = "服务码", Gae = "没有更多内容啦~", xqe = {
  serviceDate: Lae,
  havePaid: Bae,
  notPaid: Uae,
  contact: Wae,
  checkCode: qae,
  nothingMore: Gae
}, Eqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkCode: qae,
  contact: Wae,
  default: xqe,
  havePaid: Bae,
  notPaid: Uae,
  nothingMore: Gae,
  serviceDate: Lae
}, Symbol.toStringTag, { value: "Module" })), Vae = "退款方式", Yae = "退款原因", Kae = "退款编号", Qae = "申请时间", Xae = "退款说明", Jae = "查看", Zae = "退款金额", ece = "凭证", oce = "没有更多内容啦~", Rqe = {
  refundType: Vae,
  refundCause: Yae,
  refundNo: Kae,
  createTime: Qae,
  createExplain: Xae,
  check: Jae,
  refundMoney: Zae,
  voucher: ece,
  nothingMore: oce
}, Fqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  check: Jae,
  createExplain: Xae,
  createTime: Qae,
  default: Rqe,
  nothingMore: oce,
  refundCause: Yae,
  refundMoney: Zae,
  refundNo: Kae,
  refundType: Vae,
  voucher: ece
}, Symbol.toStringTag, { value: "Module" })), tce = "查看服务项目", nce = "服务项目", sce = "价格", rce = "元", ace = "项目图片", cce = "加载中...", ice = "没有更多内容啦~", Hqe = {
  showServiceItem: tce,
  serviceItem: nce,
  price: sce,
  yuan: rce,
  serviceImg: ace,
  loading: cce,
  nothingMore: ice
}, Lqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hqe,
  loading: cce,
  nothingMore: ice,
  price: sce,
  serviceImg: ace,
  serviceItem: nce,
  showServiceItem: tce,
  yuan: rce
}, Symbol.toStringTag, { value: "Module" })), lce = "我的收藏", dce = "商品收藏", uce = "师傅收藏", pce = "售", mce = "取消收藏成功", _ce = "取消收藏失败", gce = "工作中", hce = "休息中", fce = "服务单", Bqe = {
  pageTitle: lce,
  goodsCollect: dce,
  technicianCollect: uce,
  sold: pce,
  delete: "删除",
  cancelCollectSuccess: mce,
  cancelCollectFail: _ce,
  working: gce,
  resting: hce,
  serviceOrder: fce
}, Uqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelCollectFail: _ce,
  cancelCollectSuccess: mce,
  default: Bqe,
  goodsCollect: dce,
  pageTitle: lce,
  resting: hce,
  serviceOrder: fce,
  sold: pce,
  technicianCollect: uce,
  working: gce
}, Symbol.toStringTag, { value: "Module" })), yce = "我的收藏", $ce = "商品收藏", vce = "师傅收藏", bce = "售", Tce = "取消收藏成功", Pce = "取消收藏失败", Sce = "工作中", Oce = "休息中", wce = "服务{num}单", Wqe = {
  pageTitle: yce,
  goodsCollect: $ce,
  technicianCollect: vce,
  sold: bce,
  delete: "删除",
  cancelCollectSuccess: Tce,
  cancelCollectFail: Pce,
  working: Sce,
  resting: Oce,
  serviceOrder: wce
}, qqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelCollectFail: Pce,
  cancelCollectSuccess: Tce,
  default: Wqe,
  goodsCollect: $ce,
  pageTitle: yce,
  resting: Oce,
  serviceOrder: wce,
  sold: bce,
  technicianCollect: vce,
  working: Sce
}, Symbol.toStringTag, { value: "Module" })), jce = "反馈标题", kce = "反馈内容", Cce = "上传图片（选填）", Mce = "提交反馈", Ace = "请输入反馈标题", Ice = "请详细描述您遇到的问题或建议", Nce = "反馈内容请至少输入10个字符", Dce = "反馈提交成功，感谢您的建议", zce = "反馈提交失败", xce = "网络错误，请稍后重试", Gqe = {
  feedbackTitle: jce,
  feedbackContent: kce,
  uploadImage: Cce,
  submitFeedback: Mce,
  pleaseInputFeedbackTitle: Ace,
  pleaseDescribeIssue: Ice,
  feedbackContentMinLength: Nce,
  feedbackSubmitSuccess: Dce,
  feedbackSubmitFail: zce,
  networkError: xce
}, Vqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gqe,
  feedbackContent: kce,
  feedbackContentMinLength: Nce,
  feedbackSubmitFail: zce,
  feedbackSubmitSuccess: Dce,
  feedbackTitle: jce,
  networkError: xce,
  pleaseDescribeIssue: Ice,
  pleaseInputFeedbackTitle: Ace,
  submitFeedback: Mce,
  uploadImage: Cce
}, Symbol.toStringTag, { value: "Module" })), Ece = "帮助详情", Rce = "加载中...", Fce = "浏览次数", Hce = "更新时间", Lce = "暂无数据", Bce = "缺少帮助文档ID", Uce = "网络错误，请稍后重试", Yqe = {
  helpDetail: Ece,
  loading: Rce,
  viewsCount: Fce,
  updateTime: Hce,
  noData: Lce,
  missingId: Bce,
  networkError: Uce
}, Kqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yqe,
  helpDetail: Ece,
  loading: Rce,
  missingId: Bce,
  networkError: Uce,
  noData: Lce,
  updateTime: Hce,
  viewsCount: Fce
}, Symbol.toStringTag, { value: "Module" })), Wce = "帮助中心", qce = "操作答疑", Gce = "操作步骤", Vce = "管理平台", Yce = "佣金分成与支付", Kce = "常见问题", Qce = "问题分类", Xce = "联系客服", Jce = "没有更多内容啦~", Qqe = {
  helpCenter: Wce,
  operationFAQ: qce,
  operationSteps: Gce,
  managementPlatform: Vce,
  commissionPayment: Yce,
  commonProblems: Kce,
  problemCategories: Qce,
  contactService: Xce,
  noMoreContent: Jce
}, Xqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  commissionPayment: Yce,
  commonProblems: Kce,
  contactService: Xce,
  default: Qqe,
  helpCenter: Wce,
  managementPlatform: Vce,
  noMoreContent: Jce,
  operationFAQ: qce,
  operationSteps: Gce,
  problemCategories: Qce
}, Symbol.toStringTag, { value: "Module" })), Zce = {
  apply: "申请发票",
  list: "发票列表",
  detail: "发票详情"
}, eie = "抬头类型", oie = "企业", tie = "个人", nie = "发票抬头", sie = "税号", rie = "发票类型", aie = "发票内容", cie = "发票金额", iie = "邮箱地址", lie = "备注信息", die = "提交申请", uie = "电话", pie = "注册地址", mie = "银行名称", _ie = "银行账号", gie = "更多信息", hie = "备注信息", fie = "取消", yie = "开票详情", $ie = "接收方式", vie = "提交电子发票", bie = "请至少选择一项发票内容", Tie = "发票金额包含上门服务订单金额与附加费用总额，不包含交通费、高速费、停车费。", Pie = {
  pleaseInputHeader: "请输入发票抬头",
  pleaseInputTaxNumber: "请输入税号",
  pleaseInputEmail: "请输入邮箱地址",
  invalidEmail: "请输入正确的邮箱地址",
  success: "申请成功",
  failed: "申请失败",
  networkError: "网络错误，请重试"
}, Sie = {
  inputHeader: "填写发票抬头",
  inputTaxNumber: "填写纳税人识别号",
  inputTelephone: "请输入电话（选填）",
  inputAddress: "请输入注册地址（选填）",
  inputBankName: "请输入银行名称（选填）",
  inputBankCardNumber: "请输入银行账号（选填）",
  inputEmail: "用于向您发送电子发票"
}, Jqe = {
  invoice: Zce,
  invoiceHeaderType: eie,
  enterprise: oie,
  individual: tie,
  invoiceHeader: nie,
  taxNumber: sie,
  invoiceType: rie,
  invoiceContent: aie,
  invoiceAmount: cie,
  email: iie,
  remark: lie,
  submit: die,
  telephone: uie,
  address: pie,
  bankName: mie,
  bankCardNumber: _ie,
  moreInfo: gie,
  remarkInfo: hie,
  cancel: fie,
  invoiceDetail: yie,
  receiveMethod: $ie,
  submitElectronicInvoice: vie,
  pleaseSelectContent: bie,
  invoiceAmountNote: Tie,
  validation: Pie,
  placeholder: Sie
}, Zqe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: pie,
  bankCardNumber: _ie,
  bankName: mie,
  cancel: fie,
  default: Jqe,
  email: iie,
  enterprise: oie,
  individual: tie,
  invoice: Zce,
  invoiceAmount: cie,
  invoiceAmountNote: Tie,
  invoiceContent: aie,
  invoiceDetail: yie,
  invoiceHeader: nie,
  invoiceHeaderType: eie,
  invoiceType: rie,
  moreInfo: gie,
  placeholder: Sie,
  pleaseSelectContent: bie,
  receiveMethod: $ie,
  remark: lie,
  remarkInfo: hie,
  submit: die,
  submitElectronicInvoice: vie,
  taxNumber: sie,
  telephone: uie,
  validation: Pie
}, Symbol.toStringTag, { value: "Module" })), Oie = "订单", wie = "下单", jie = "接单", kie = "开始", Cie = "完成", Mie = "已支付", Aie = "未支付", Iie = "查看退款", Nie = "申请退款", Die = "去支付", zie = "查看", xie = "服务人员", Eie = "待派单", Rie = "联系电话", Fie = "服务码", Hie = "注:服务人员上门时需提供", Lie = "订单编号", Bie = "交易流水号", Uie = "创建时间", Wie = "上门时间", qie = "买家留言", Gie = "支付方式", Vie = "支付时间", Yie = "项目金额", Kie = "实付金额", Qie = "首页", Xie = "刷新", Jie = "客服", Zie = "收藏", ele = "没有更多内容啦~", ole = "的帮付", e7e = {
  order: Oie,
  placeOrder: wie,
  takeOrders: jie,
  start: kie,
  finish: Cie,
  havePaid: Mie,
  notPaid: Aie,
  viewRefund: Iie,
  applyRefund: Nie,
  goToPay: Die,
  show: zie,
  servicePersonal: xie,
  orderToBeSent: Eie,
  contactNumber: Rie,
  serviceCode: Fie,
  explain: Hie,
  onOrder: Lie,
  transactionNumber: Bie,
  createTime: Uie,
  reserveServiceTime: Wie,
  remark: qie,
  modePayment: Gie,
  payTime: Vie,
  goodsMoney: Yie,
  realMoney: Kie,
  index: Qie,
  refresh: Xie,
  service: Jie,
  collect: Zie,
  nothingMore: ele,
  helpPay: ole
}, o7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyRefund: Nie,
  collect: Zie,
  contactNumber: Rie,
  createTime: Uie,
  default: e7e,
  explain: Hie,
  finish: Cie,
  goToPay: Die,
  goodsMoney: Yie,
  havePaid: Mie,
  helpPay: ole,
  index: Qie,
  modePayment: Gie,
  notPaid: Aie,
  nothingMore: ele,
  onOrder: Lie,
  order: Oie,
  orderToBeSent: Eie,
  payTime: Vie,
  placeOrder: wie,
  realMoney: Kie,
  refresh: Xie,
  remark: qie,
  reserveServiceTime: Wie,
  service: Jie,
  serviceCode: Fie,
  servicePersonal: xie,
  show: zie,
  start: kie,
  takeOrders: jie,
  transactionNumber: Bie,
  viewRefund: Iie
}, Symbol.toStringTag, { value: "Module" })), tle = "写评价", nle = "服务项目", sle = "服务评价", rle = "非常满意", ale = "满意", cle = "一般", ile = "好", lle = "很好", dle = "较差", ule = "很差", ple = "请输入您想说的话", mle = "请输入评价内容", _le = "添加照片", gle = "匿名评价", hle = "确定提交", fle = "提交中...", yle = "请输入评价内容", $le = "请选择评分", vle = "订单ID不存在", ble = "商品信息不存在", Tle = "评价成功", t7e = {
  pageTitle: tle,
  serviceItem: nle,
  serviceEvaluation: sle,
  verySatisfactory: rle,
  satisfactory: ale,
  average: cle,
  satisfied: ile,
  verySatisfied: lle,
  poor: dle,
  veryPoor: ule,
  pleaseInputComment: ple,
  commentPlaceholder: mle,
  addPhotos: _le,
  anonymousEvaluation: gle,
  submit: hle,
  submitting: fle,
  commentEmpty: yle,
  selectRating: $le,
  orderIdNotFound: vle,
  goodsInfoNotFound: ble,
  commentSuccess: Tle
}, n7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPhotos: _le,
  anonymousEvaluation: gle,
  average: cle,
  commentEmpty: yle,
  commentPlaceholder: mle,
  commentSuccess: Tle,
  default: t7e,
  goodsInfoNotFound: ble,
  orderIdNotFound: vle,
  pageTitle: tle,
  pleaseInputComment: ple,
  poor: dle,
  satisfactory: ale,
  satisfied: ile,
  selectRating: $le,
  serviceEvaluation: sle,
  serviceItem: nle,
  submit: hle,
  submitting: fle,
  veryPoor: ule,
  verySatisfactory: rle,
  verySatisfied: lle
}, Symbol.toStringTag, { value: "Module" })), Ple = "写评价", Sle = "服务项目", Ole = "服务评价", wle = "非常满意", jle = "满意", kle = "一般", Cle = "较差", Mle = "很差", Ale = "请输入您想说的话", Ile = "请输入评价内容", Nle = "添加照片", Dle = "匿名评价", zle = "确定提交", xle = "提交中...", Ele = "请输入评价内容", Rle = "请选择评分", Fle = "订单ID不存在", Hle = "商品信息不存在", Lle = "评价成功", s7e = {
  pageTitle: Ple,
  serviceItem: Sle,
  serviceEvaluation: Ole,
  verySatisfactory: wle,
  satisfactory: jle,
  average: kle,
  poor: Cle,
  veryPoor: Mle,
  pleaseInputComment: Ale,
  commentPlaceholder: Ile,
  addPhotos: Nle,
  anonymousEvaluation: Dle,
  submit: zle,
  submitting: xle,
  commentEmpty: Ele,
  selectRating: Rle,
  orderIdNotFound: Fle,
  goodsInfoNotFound: Hle,
  commentSuccess: Lle
}, r7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPhotos: Nle,
  anonymousEvaluation: Dle,
  average: kle,
  commentEmpty: Ele,
  commentPlaceholder: Ile,
  commentSuccess: Lle,
  default: s7e,
  goodsInfoNotFound: Hle,
  orderIdNotFound: Fle,
  pageTitle: Ple,
  pleaseInputComment: Ale,
  poor: Cle,
  satisfactory: jle,
  selectRating: Rle,
  serviceEvaluation: Ole,
  serviceItem: Sle,
  submit: zle,
  submitting: xle,
  veryPoor: Mle,
  verySatisfactory: wle
}, Symbol.toStringTag, { value: "Module" })), Ble = "我的评价", a7e = {
  myEvaluate: Ble
}, c7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: a7e,
  myEvaluate: Ble
}, Symbol.toStringTag, { value: "Module" })), Ule = "全部", Wle = "未支付", qle = "实付金额：", Gle = "订单金额：", Vle = "未获取到订单信息", Yle = "没有更多内容啦~", i7e = {
  all: Ule,
  notPaid: Wle,
  payMoney: qle,
  orderMoney: Gle,
  emptyTips: Vle,
  nothingMore: Yle
}, l7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: Ule,
  default: i7e,
  emptyTips: Vle,
  notPaid: Wle,
  nothingMore: Yle,
  orderMoney: Gle,
  payMoney: qle
}, Symbol.toStringTag, { value: "Module" })), Kle = "添加上门地址", Qle = "选择师傅", Xle = "上门时间", Jle = "请选择上门时间", Zle = "买家留言", ede = "请填写留言信息", ode = "服务费", tde = "优惠券", nde = "合计：", sde = "提交订单", rde = "没有更多内容啦~", ade = "价格明细", cde = "实付金额", ide = "实付", d7e = {
  addHomeAddress: Kle,
  selectiveTechnician: Qle,
  addHomeTime: Xle,
  selectAddTimePlaceholder: Jle,
  buysMessage: Zle,
  messagePlaceholder: ede,
  goodsMoney: ode,
  coupon: tde,
  total: nde,
  submit: sde,
  nothingMore: rde,
  priceDetail: ade,
  payMoney: cde,
  payAll: ide
}, u7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: Kle,
  addHomeTime: Xle,
  buysMessage: Zle,
  coupon: tde,
  default: d7e,
  goodsMoney: ode,
  messagePlaceholder: ede,
  nothingMore: rde,
  payAll: ide,
  payMoney: cde,
  priceDetail: ade,
  selectAddTimePlaceholder: Jle,
  selectiveTechnician: Qle,
  submit: sde,
  total: nde
}, Symbol.toStringTag, { value: "Module" })), lde = "申请售后", dde = "服务项目", ude = "选择售后类型", pde = "申请退款", mde = "服务投诉", _de = "再次维修", gde = "其他问题", hde = "选择售后原因", fde = "服务未按约定完成", yde = "服务质量不达标", $de = "额外收费不合理", vde = "服务人员态度问题", bde = "其他原因", Tde = "最多上传{count}张图片", Pde = "提交售后申请", Sde = "提交中...", Ode = "提交后，我们将在24小时内进行处理", wde = "请输入补充描述", jde = "订单ID不存在", kde = "售后申请提交成功", Cde = "上传凭证", Mde = "选填", Ade = "补充描述", Ide = "补充描述，有助于商家更好的处理售后问题", Nde = "退款原因", Dde = "退款金额", zde = "确定", xde = "请选择", Ede = "最多可输入金额￥", Rde = "提交", Fde = "没有更多内容啦~", p7e = {
  pageTitle: lde,
  serviceItem: dde,
  selectRefundType: ude,
  applyRefund: pde,
  serviceComplain: mde,
  rework: _de,
  otherProblem: gde,
  selectRefundReason: hde,
  serviceNotCompleted: fde,
  serviceQualityNotMeet: yde,
  extraChargeUnreasonable: $de,
  serviceAttitudeProblem: vde,
  otherReason: bde,
  maxImagesCount: Tde,
  submitRefundApply: Pde,
  submitting: Sde,
  submitNotice: Ode,
  pleaseInputDescription: wde,
  orderIdNotFound: jde,
  refundApplySuccess: kde,
  uploadProof: Cde,
  optional: Mde,
  description: Ade,
  descriptionPlaceholder: Ide,
  refundReason: Nde,
  refundMoney: Dde,
  confirm: zde,
  placeholder: xde,
  moreInputMoney: Ede,
  submit: Rde,
  nothingMore: Fde
}, m7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyRefund: pde,
  confirm: zde,
  default: p7e,
  description: Ade,
  descriptionPlaceholder: Ide,
  extraChargeUnreasonable: $de,
  maxImagesCount: Tde,
  moreInputMoney: Ede,
  nothingMore: Fde,
  optional: Mde,
  orderIdNotFound: jde,
  otherProblem: gde,
  otherReason: bde,
  pageTitle: lde,
  placeholder: xde,
  pleaseInputDescription: wde,
  refundApplySuccess: kde,
  refundMoney: Dde,
  refundReason: Nde,
  rework: _de,
  selectRefundReason: hde,
  selectRefundType: ude,
  serviceAttitudeProblem: vde,
  serviceComplain: mde,
  serviceItem: dde,
  serviceNotCompleted: fde,
  serviceQualityNotMeet: yde,
  submit: Rde,
  submitNotice: Ode,
  submitRefundApply: Pde,
  submitting: Sde,
  uploadProof: Cde
}, Symbol.toStringTag, { value: "Module" })), Hde = "退货详情", Lde = "极速退款成功", Bde = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", Ude = "退款方式", Wde = "退款原因", qde = "退款编号", Gde = "申请时间", Vde = "退款说明", Yde = "协商记录", Kde = "查看", Qde = "取消退款", Xde = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", Jde = "首页", Zde = "退款金额", eue = "凭证", oue = "没有更多内容啦~", _7e = {
  refundDetail: Hde,
  fastRefundSuccessful: Lde,
  refundInfo: Bde,
  refundType: Ude,
  refundCause: Wde,
  refundNo: qde,
  createTime: Gde,
  createExplain: Vde,
  record: Yde,
  check: Kde,
  refundApply: Qde,
  cancelRefundContent: Xde,
  index: Jde,
  refundMoney: Zde,
  voucher: eue,
  nothingMore: oue
}, g7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: Xde,
  check: Kde,
  createExplain: Vde,
  createTime: Gde,
  default: _7e,
  fastRefundSuccessful: Lde,
  index: Jde,
  nothingMore: oue,
  record: Yde,
  refundApply: Qde,
  refundCause: Wde,
  refundDetail: Hde,
  refundInfo: Bde,
  refundMoney: Zde,
  refundNo: qde,
  refundType: Ude,
  voucher: eue
}, Symbol.toStringTag, { value: "Module" })), tue = "退款金额", nue = "取消退款", sue = "详情", rue = "实付款", aue = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", cue = "没有更多内容啦~", h7e = {
  refundMoney: tue,
  refundApply: nue,
  orderDetail: sue,
  actualPayment: rue,
  cancelRefundContent: aue,
  nothingMore: cue
}, f7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: rue,
  cancelRefundContent: aue,
  default: h7e,
  nothingMore: cue,
  orderDetail: sue,
  refundApply: nue,
  refundMoney: tue
}, Symbol.toStringTag, { value: "Module" })), iue = "返回详情", lue = "没有更多内容啦~", y7e = {
  detail: iue,
  nothingMore: lue
}, $7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: y7e,
  detail: iue,
  nothingMore: lue
}, Symbol.toStringTag, { value: "Module" })), due = "选择师傅", uue = "请选择", pue = "预约时间", mue = "买家留言", _ue = "请填写留言信息", gue = "立即购买", hue = "立即预约", fue = "首页", yue = "手机号", $ue = "请输入手机号", vue = "请输入正确的手机号", bue = "客服", Tue = "收藏", Pue = "没有更多内容啦~", v7e = {
  selectTechnician: due,
  pleaseChoose: uue,
  reserveTime: pue,
  remark: mue,
  fillRemark: _ue,
  buy: gue,
  reserve: hue,
  index: fue,
  mobile: yue,
  mobilePlaceholder: $ue,
  correctMobilePlaceholder: vue,
  service: bue,
  collect: Tue,
  nothingMore: Pue
}, b7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: gue,
  collect: Tue,
  correctMobilePlaceholder: vue,
  default: v7e,
  fillRemark: _ue,
  index: fue,
  mobile: yue,
  mobilePlaceholder: $ue,
  nothingMore: Pue,
  pleaseChoose: uue,
  remark: mue,
  reserve: hue,
  reserveTime: pue,
  selectTechnician: due,
  service: bue
}, Symbol.toStringTag, { value: "Module" })), Sue = "机构入驻申请", Oue = "商家人驻 海量商机", wue = "大平台・多品类・专业经营", jue = "我们的优势", kue = "多品类覆盖", Cue = "洗衣洗鞋、保洁清洗、管道疏通、房屋维修、家电维修、上门安装、数码维修等多类服务供您选择", Mue = "客户充足", Aue = "同城/到家、千万流量帮扶、帮助商家解决获客难题", Iue = "商家赋能", Nue = "系统算法派单，省时省心;手机+电脑支持后台管理订单;完善的服务商成长体系", Due = "平台帮扶", zue = "培训指导助力经营、系统支持保障效率", xue = "入驻流程", Eue = "01.提交资料", Rue = "02.资料审核", Fue = "03.入驻完成", Hue = "去填写", T7e = {
  storeApplyTitle: Sue,
  merchantSlogan: Oue,
  platformFeatures: wue,
  ourAdvantages: jue,
  multipleCategories: kue,
  multipleCategoriesDesc: Cue,
  sufficientCustomers: Mue,
  sufficientCustomersDesc: Aue,
  merchantEmpowerment: Iue,
  merchantEmpowermentDesc: Nue,
  platformSupport: Due,
  platformSupportDesc: zue,
  settlementProcess: xue,
  submitData: Eue,
  dataReview: Rue,
  settlementComplete: Fue,
  goFill: Hue
}, P7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dataReview: Rue,
  default: T7e,
  goFill: Hue,
  merchantEmpowerment: Iue,
  merchantEmpowermentDesc: Nue,
  merchantSlogan: Oue,
  multipleCategories: kue,
  multipleCategoriesDesc: Cue,
  ourAdvantages: jue,
  platformFeatures: wue,
  platformSupport: Due,
  platformSupportDesc: zue,
  settlementComplete: Fue,
  settlementProcess: xue,
  storeApplyTitle: Sue,
  submitData: Eue,
  sufficientCustomers: Mue,
  sufficientCustomersDesc: Aue
}, Symbol.toStringTag, { value: "Module" })), Lue = "机构入驻申请", Bue = "机构名称", Uue = "请输入机构名称", Wue = "营业执照", que = "请上传营业执照", Gue = "请上传营业执照", Vue = "请输入联系人姓名", Yue = "请输入手机号码", Kue = "请输入身份证号", Que = "请上传证件头像", Xue = "请上传证件国徽面", Jue = "请选择机构位置", Zue = "行业资质", epe = "上传机构图像", ope = "我的定位", tpe = "请选择", npe = "联系人姓名", spe = "请输入联系人姓名", rpe = "手机号码", ape = "请输入手机号码", cpe = "身份证号", ipe = "请输入身份证号", lpe = "证件头像面", dpe = "证件国徽面", upe = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", ppe = "图片尺寸400*400px以上，大小不超过10M", mpe = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊，保持信息清晰可见", _pe = "上传图片必须小于1M且清晰可见", gpe = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", hpe = "身份证照片上传", fpe = "请上传清晰照片", ype = "申请说明", $pe = "请输入", vpe = "确定提交", bpe = "请输入姓名", Tpe = "请输入身份证号", Ppe = "请输入手机号", Spe = "请上传证件头像", Ope = "请上传证件国徽面", wpe = "提交成功", jpe = "提交中...", kpe = "点击上传", Cpe = "机构相关证件照", Mpe = "机构相关证件", Ape = "法人身份证照片", Ipe = "请上传清晰照片", Npe = "确定提交", Dpe = "机构营业执照或个体户执照", zpe = "部分行业需要，按行业补充", xpe = "请输入正确的手机号", Epe = "请输入正确的身份证号码", Rpe = "请输入机构名称", Fpe = "请上传营业执照", Hpe = "请上传机构图像", Lpe = "请选择机构位置", Bpe = "请输入联系人姓名", Upe = "请输入手机号码", Wpe = "请输入身份证号", qpe = "请上传证件头像", Gpe = "请上传证件国徽面", Vpe = "请输入正确的手机号码", Ype = "请输入正确的身份证号码", S7e = {
  storeApplyTitle: Lue,
  storeName: Bue,
  inputStoreName: Uue,
  businessLicense: Wue,
  businessLicensePlaceholder: que,
  businessLicenseRequired: Gue,
  contactNameRequired: Vue,
  mobileRequired: Yue,
  idNumberRequired: Kue,
  idcardFrontRequired: Que,
  idcardBackRequired: Xue,
  locationRequired: Jue,
  industryQualification: Zue,
  uploadStoreImage: epe,
  myLocation: ope,
  selectLocation: tpe,
  contactPersonName: npe,
  inputContactPersonName: spe,
  contactPersonMobile: rpe,
  inputContactPersonMobile: ape,
  contactPersonIdcard: cpe,
  inputContactPersonIdcard: ipe,
  idcardFront: lpe,
  idcardBack: dpe,
  idcardFrontTip1: upe,
  idcardFrontTip3: ppe,
  idcardBackTip1: mpe,
  idcardBackTip5: _pe,
  skillCertificateDesc1: gpe,
  idcardUpload: hpe,
  idcardUploadTip: fpe,
  applyDescription: ype,
  inputApplyDescription: $pe,
  confirmSubmit: vpe,
  inputName: bpe,
  inputIdcard: Tpe,
  inputMobile: Ppe,
  uploadIdcardFront: Spe,
  uploadIdcardBack: Ope,
  submitSuccess: wpe,
  submitting: jpe,
  clickUpload: kpe,
  storeCertificates: Cpe,
  uploadClearPhotos: Mpe,
  legalPersonIdcardImage: Ape,
  PleaseUploadClearPhotos: Ipe,
  submitForm: Npe,
  storeBusinessLicenseTip: Dpe,
  industryQualificationTip: zpe,
  inputMobileErr: xpe,
  inputIdcardErr: Epe,
  pleaseInputStoreName: Rpe,
  pleaseUploadBusinessLicense: Fpe,
  pleaseUploadStoreImage: Hpe,
  pleaseSelectLocation: Lpe,
  pleaseInputContactPersonName: Bpe,
  pleaseInputContactPersonMobile: Upe,
  pleaseInputContactPersonIdcard: Wpe,
  pleaseUploadIdcardFront: qpe,
  pleaseUploadIdcardBack: Gpe,
  pleaseInputValidMobile: Vpe,
  pleaseInputValidIdcard: Ype
}, O7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PleaseUploadClearPhotos: Ipe,
  applyDescription: ype,
  businessLicense: Wue,
  businessLicensePlaceholder: que,
  businessLicenseRequired: Gue,
  clickUpload: kpe,
  confirmSubmit: vpe,
  contactNameRequired: Vue,
  contactPersonIdcard: cpe,
  contactPersonMobile: rpe,
  contactPersonName: npe,
  default: S7e,
  idNumberRequired: Kue,
  idcardBack: dpe,
  idcardBackRequired: Xue,
  idcardBackTip1: mpe,
  idcardBackTip5: _pe,
  idcardFront: lpe,
  idcardFrontRequired: Que,
  idcardFrontTip1: upe,
  idcardFrontTip3: ppe,
  idcardUpload: hpe,
  idcardUploadTip: fpe,
  industryQualification: Zue,
  industryQualificationTip: zpe,
  inputApplyDescription: $pe,
  inputContactPersonIdcard: ipe,
  inputContactPersonMobile: ape,
  inputContactPersonName: spe,
  inputIdcard: Tpe,
  inputIdcardErr: Epe,
  inputMobile: Ppe,
  inputMobileErr: xpe,
  inputName: bpe,
  inputStoreName: Uue,
  legalPersonIdcardImage: Ape,
  locationRequired: Jue,
  mobileRequired: Yue,
  myLocation: ope,
  pleaseInputContactPersonIdcard: Wpe,
  pleaseInputContactPersonMobile: Upe,
  pleaseInputContactPersonName: Bpe,
  pleaseInputStoreName: Rpe,
  pleaseInputValidIdcard: Ype,
  pleaseInputValidMobile: Vpe,
  pleaseSelectLocation: Lpe,
  pleaseUploadBusinessLicense: Fpe,
  pleaseUploadIdcardBack: Gpe,
  pleaseUploadIdcardFront: qpe,
  pleaseUploadStoreImage: Hpe,
  selectLocation: tpe,
  skillCertificateDesc1: gpe,
  storeApplyTitle: Lue,
  storeBusinessLicenseTip: Dpe,
  storeCertificates: Cpe,
  storeName: Bue,
  submitForm: Npe,
  submitSuccess: wpe,
  submitting: jpe,
  uploadClearPhotos: Mpe,
  uploadIdcardBack: Ope,
  uploadIdcardFront: Spe,
  uploadStoreImage: epe
}, Symbol.toStringTag, { value: "Module" })), Kpe = "入驻申请审批中", Qpe = "入驻申请不通过", Xpe = "申请已通过", Jpe = "预计三个工作日完成，请耐心等待", Zpe = "申请已提交", eme = "审核时间", ome = "返回首页", tme = "查看申请状态", nme = "审核提示", sme = "您已成功入驻", w7e = {
  reviewingTitle: Kpe,
  rejectedTitle: Qpe,
  successTitle: Xpe,
  description: Jpe,
  applicationSubmitted: Zpe,
  awaitingSettlement: eme,
  goBackHome: ome,
  checkStatus: tme,
  reviewTips: nme,
  descriptionSuccess: sme
}, j7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applicationSubmitted: Zpe,
  awaitingSettlement: eme,
  checkStatus: tme,
  default: w7e,
  description: Jpe,
  descriptionSuccess: sme,
  goBackHome: ome,
  rejectedTitle: Qpe,
  reviewTips: nme,
  reviewingTitle: Kpe,
  successTitle: Xpe
}, Symbol.toStringTag, { value: "Module" })), rme = "师傅入驻申请", ame = "请选择我的技能", cme = "(多选)", ime = "我们的优势", lme = "多品类覆盖", dme = "洗衣洗鞋、保洁清洗、管道疏通、房屋维修、家电维修、上门安装、数码维修等多类服务供您选择", ume = "客户充足", pme = "同城到家、千万流量帮扶、帮助商家解决获客难题", mme = "商家赋能", _me = "系统算法派单、省时省心手机、电脑支持后台管理订单；完善的服务商成长体系", gme = "平台帮扶", hme = "培训指导助力经营、系统支持保障效率", fme = "入驻流程", yme = "01.提交资料", $me = "02.资料审核", vme = "03.入驻完成", bme = "去填写", Tme = "请至少选择一项技能", Pme = "家庭保洁", Sme = "上门维修", Ome = "保姆月嫂", wme = "清洁、整理、消毒", k7e = {
  technicianApplyTitle: rme,
  selectSkillsTitle: ame,
  multipleChoice: cme,
  ourAdvantages: ime,
  multipleCategories: lme,
  multipleCategoriesDesc: dme,
  sufficientCustomers: ume,
  sufficientCustomersDesc: pme,
  merchantEmpowerment: mme,
  merchantEmpowermentDesc: _me,
  platformSupport: gme,
  platformSupportDesc: hme,
  settlementProcess: fme,
  submitData: yme,
  dataReview: $me,
  settlementComplete: vme,
  goFill: bme,
  selectAtLeastOneSkill: Tme,
  homeCleaning: Pme,
  homeRepair: Sme,
  nannyYuesao: Ome,
  skillDesc: wme
}, C7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dataReview: $me,
  default: k7e,
  goFill: bme,
  homeCleaning: Pme,
  homeRepair: Sme,
  merchantEmpowerment: mme,
  merchantEmpowermentDesc: _me,
  multipleCategories: lme,
  multipleCategoriesDesc: dme,
  multipleChoice: cme,
  nannyYuesao: Ome,
  ourAdvantages: ime,
  platformSupport: gme,
  platformSupportDesc: hme,
  selectAtLeastOneSkill: Tme,
  selectSkillsTitle: ame,
  settlementComplete: vme,
  settlementProcess: fme,
  skillDesc: wme,
  submitData: yme,
  sufficientCustomers: ume,
  sufficientCustomersDesc: pme,
  technicianApplyTitle: rme
}, Symbol.toStringTag, { value: "Module" })), jme = "师傅入驻申请", kme = "请选择我的技能", Cme = "(多选)", Mme = "我们的优势", Ame = "多品类覆盖", Ime = "洗衣洗鞋、保洁清洗、管道疏通、房屋维修、家电维修、上门安装、数码维修等多类服务供您选择", Nme = "客户充足", Dme = "同城到家、千万流量帮扶、帮助商家解决获客难题", zme = "商家赋能", xme = "系统算法派单、省时省心手机、电脑支持后台管理订单；完善的服务商成长体系", Eme = "平台帮扶", Rme = "培训指导助力经营、系统支持保障效率", Fme = "入驻流程", Hme = "01.提交资料", Lme = "02.资料审核", Bme = "03.入驻完成", Ume = "去填写", Wme = "请至少选择一项技能", qme = "家庭保洁", Gme = "上门维修", Vme = "保姆月嫂", Yme = "清洁、整理、消毒", Kme = "基本信息", Qme = "姓名", Xme = "身份证号", Jme = "手机号码", Zme = "所属机构（选填）", e_e = "请选择所属机构", o_e = "师傅头像", t_e = "请上传清晰照片", n_e = "师傅头像照片上传", s_e = "身份证照片上传", r_e = "请上传清晰照片", a_e = "身份证人像面", c_e = "图片尺寸80*80px以上，大小不超过10M", i_e = "请输入正确的身份证号码", l_e = "请输入正确的手机号", d_e = "请上传证件国徽面", u_e = "技能证书上传（选填）", p_e = "请上传技能证书，最多9张", m_e = "我的定位", __e = "请选择服务区域", g_e = "申请说明", h_e = "请输入申请说明", f_e = "确定提交", y_e = "请输入姓名", $_e = "请输入身份证号", v_e = "请输入手机号", b_e = "请上传证件头像", T_e = "请上传证件国徽面", P_e = "提交成功", S_e = "提交中...", O_e = "点击上传", w_e = "技能证书", j_e = "请上传技能证书", k_e = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", C_e = "图片尺寸400*400px以上，大小不超过10M", M_e = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊，保持信息清晰可见", A_e = "上传图片必须小于1M且清晰可见", I_e = "请提供有效期限范围内的证件，需要露出四角，请勿遮挡或模糊", N_e = "（必填）", D_e = "姓名不能为空", z_e = "身份证号不能为空", x_e = "手机号不能为空", E_e = "请上传师傅头像", R_e = "请上传身份证照片", F_e = "请选择服务区域", H_e = "请填写申请说明", M7e = {
  technicianApplyTitle: jme,
  selectSkillsTitle: kme,
  multipleChoice: Cme,
  ourAdvantages: Mme,
  multipleCategories: Ame,
  multipleCategoriesDesc: Ime,
  sufficientCustomers: Nme,
  sufficientCustomersDesc: Dme,
  merchantEmpowerment: zme,
  merchantEmpowermentDesc: xme,
  platformSupport: Eme,
  platformSupportDesc: Rme,
  settlementProcess: Fme,
  submitData: Hme,
  dataReview: Lme,
  settlementComplete: Bme,
  goFill: Ume,
  selectAtLeastOneSkill: Wme,
  homeCleaning: qme,
  homeRepair: Gme,
  nannyYuesao: Vme,
  skillDesc: Yme,
  basicInfo: Kme,
  name: Qme,
  idcard: Xme,
  mobiles: Jme,
  store: Zme,
  selectStore: e_e,
  technicianAvatar: o_e,
  avatarUploadTip: t_e,
  uploadAvatar: n_e,
  idcardUpload: s_e,
  idcardUploadTip: r_e,
  idcardFront: a_e,
  avatarUploadTip1: c_e,
  inputIdcardErr: i_e,
  inputMobileErr: l_e,
  idcardBack: d_e,
  skillCertificateUpload: u_e,
  skillCertificateTip: p_e,
  serviceArea: m_e,
  selectServiceArea: __e,
  applyDescription: g_e,
  inputDescription: h_e,
  submitForm: f_e,
  inputName: y_e,
  inputIdcard: $_e,
  inputMobile: v_e,
  uploadIdcardFront: b_e,
  uploadIdcardBack: T_e,
  submitSuccess: P_e,
  submitting: S_e,
  clickUpload: O_e,
  skillCertificate: w_e,
  uploadCertificate: j_e,
  idcardFrontTip1: k_e,
  idcardFrontTip3: C_e,
  idcardBackTip1: M_e,
  idcardBackTip5: A_e,
  skillCertificateDesc1: I_e,
  requiredField: N_e,
  nameRequired: D_e,
  idcardRequired: z_e,
  mobileRequired: x_e,
  avatarRequired: E_e,
  idcardPhotoRequired: R_e,
  serviceAreaRequired: F_e,
  descriptionRequired: H_e
}, A7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyDescription: g_e,
  avatarRequired: E_e,
  avatarUploadTip: t_e,
  avatarUploadTip1: c_e,
  basicInfo: Kme,
  clickUpload: O_e,
  dataReview: Lme,
  default: M7e,
  descriptionRequired: H_e,
  goFill: Ume,
  homeCleaning: qme,
  homeRepair: Gme,
  idcard: Xme,
  idcardBack: d_e,
  idcardBackTip1: M_e,
  idcardBackTip5: A_e,
  idcardFront: a_e,
  idcardFrontTip1: k_e,
  idcardFrontTip3: C_e,
  idcardPhotoRequired: R_e,
  idcardRequired: z_e,
  idcardUpload: s_e,
  idcardUploadTip: r_e,
  inputDescription: h_e,
  inputIdcard: $_e,
  inputIdcardErr: i_e,
  inputMobile: v_e,
  inputMobileErr: l_e,
  inputName: y_e,
  merchantEmpowerment: zme,
  merchantEmpowermentDesc: xme,
  mobileRequired: x_e,
  mobiles: Jme,
  multipleCategories: Ame,
  multipleCategoriesDesc: Ime,
  multipleChoice: Cme,
  name: Qme,
  nameRequired: D_e,
  nannyYuesao: Vme,
  ourAdvantages: Mme,
  platformSupport: Eme,
  platformSupportDesc: Rme,
  requiredField: N_e,
  selectAtLeastOneSkill: Wme,
  selectServiceArea: __e,
  selectSkillsTitle: kme,
  selectStore: e_e,
  serviceArea: m_e,
  serviceAreaRequired: F_e,
  settlementComplete: Bme,
  settlementProcess: Fme,
  skillCertificate: w_e,
  skillCertificateDesc1: I_e,
  skillCertificateTip: p_e,
  skillCertificateUpload: u_e,
  skillDesc: Yme,
  store: Zme,
  submitData: Hme,
  submitForm: f_e,
  submitSuccess: P_e,
  submitting: S_e,
  sufficientCustomers: Nme,
  sufficientCustomersDesc: Dme,
  technicianApplyTitle: jme,
  technicianAvatar: o_e,
  uploadAvatar: n_e,
  uploadCertificate: j_e,
  uploadIdcardBack: T_e,
  uploadIdcardFront: b_e
}, Symbol.toStringTag, { value: "Module" })), L_e = "师傅详情", B_e = "工作中", U_e = "休息中", W_e = "从业{years}年", q_e = "服务{count}单", G_e = "完成单数", V_e = "异常订单", Y_e = "售后订单", K_e = "好评率", Q_e = "个人简介", X_e = "姓名", J_e = "身份证号", Z_e = "手机号", ege = "资质证书", oge = "查看", tge = "自我介绍", nge = "技能专长", sge = "联系师傅", rge = "立即预约", I7e = {
  technicianDetail: L_e,
  working: B_e,
  resting: U_e,
  experience_years: W_e,
  service_orders: q_e,
  completed_orders: G_e,
  exception_orders: V_e,
  after_sale_orders: Y_e,
  rating: K_e,
  personal_info: Q_e,
  name: X_e,
  id_card: J_e,
  phone: Z_e,
  certificates: ege,
  view: oge,
  self_introduction: tge,
  skills: nge,
  contact_technician: sge,
  book_now: rge
}, N7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  after_sale_orders: Y_e,
  book_now: rge,
  certificates: ege,
  completed_orders: G_e,
  contact_technician: sge,
  default: I7e,
  exception_orders: V_e,
  experience_years: W_e,
  id_card: J_e,
  name: X_e,
  personal_info: Q_e,
  phone: Z_e,
  rating: K_e,
  resting: U_e,
  self_introduction: tge,
  service_orders: q_e,
  skills: nge,
  technicianDetail: L_e,
  view: oge,
  working: B_e
}, Symbol.toStringTag, { value: "Module" })), age = "年", cge = "请输入搜索关键词", ige = "已服务", lge = "已离职", dge = "休息中", uge = "详情", pge = "没有更多内容啦~", D7e = {
  year: age,
  searchPlaceholder: cge,
  service: ige,
  haveLeft: lge,
  takeBreak: dge,
  detail: uge,
  nothingMore: pge
}, z7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: D7e,
  detail: uge,
  haveLeft: lge,
  nothingMore: pge,
  searchPlaceholder: cge,
  service: ige,
  takeBreak: dge,
  year: age
}, Symbol.toStringTag, { value: "Module" })), mge = "去抢购", _ge = "没有更多内容啦~", gge = "已售", hge = "订单号", fge = "实付款", yge = "详情", x7e = {
  reserveBtn: mge,
  noHomeAddress: _ge,
  soldOut: gge,
  orderNo: hge,
  actualPayment: fge,
  orderDetail: yge
}, E7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: fge,
  default: x7e,
  noHomeAddress: _ge,
  orderDetail: yge,
  orderNo: hge,
  reserveBtn: mge,
  soldOut: gge
}, Symbol.toStringTag, { value: "Module" })), $ge = "联系人", vge = "请输入联系人姓名", bge = "手机号码", Tge = "请输入手机号码", Pge = "请输入正确的手机号", Sge = "选择地区", Oge = "请选择地区", wge = "详细地址", jge = "请填写详细地址", kge = "设为默认地址", Cge = "没有更多内容啦~", R7e = {
  name: $ge,
  namePlaceholder: vge,
  mobile: bge,
  mobilePlaceholder: Tge,
  mobileError: Pge,
  selectArea: Sge,
  selectAreaPlaceholder: Oge,
  address: wge,
  addressPlaceholder: jge,
  defaultAddress: kge,
  nothingMore: Cge
}, F7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: wge,
  addressPlaceholder: jge,
  default: R7e,
  defaultAddress: kge,
  mobile: bge,
  mobileError: Pge,
  mobilePlaceholder: Tge,
  name: $ge,
  namePlaceholder: vge,
  nothingMore: Cge,
  selectArea: Sge,
  selectAreaPlaceholder: Oge
}, Symbol.toStringTag, { value: "Module" })), Mge = "联系人", Age = "请输入联系人姓名", Ige = "手机号码", Nge = "请输入手机号码", Dge = "上门地址", zge = "选择地址", xge = "请选择地址", Ege = "详细地址", Rge = "详细地址如 1单元101", Fge = "请填写门牌号", Hge = "设为默认地址", Lge = "修改", Bge = "保存", Uge = "没有更多内容啦~", H7e = {
  name: Mge,
  namePlaceholder: Age,
  mobile: Ige,
  mobilePlaceholder: Nge,
  homeAddress: Dge,
  selectAddress: zge,
  selectAddressPlaceholder: xge,
  address: Ege,
  addressPlaceholder: Rge,
  addressError: Fge,
  defaultAddress: Hge,
  update: Lge,
  save: Bge,
  nothingMore: Uge
}, L7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  address: Ege,
  addressError: Fge,
  addressPlaceholder: Rge,
  default: H7e,
  defaultAddress: Hge,
  homeAddress: Dge,
  mobile: Ige,
  mobilePlaceholder: Nge,
  name: Mge,
  namePlaceholder: Age,
  nothingMore: Uge,
  save: Bge,
  selectAddress: zge,
  selectAddressPlaceholder: xge,
  update: Lge
}, Symbol.toStringTag, { value: "Module" })), Wge = "没有更多内容啦~", qge = "添加上门地址", B7e = {
  default: "默认地址",
  noHomeAddress: Wge,
  addHomeAddress: qge
}, U7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: qge,
  default: B7e,
  noHomeAddress: Wge
}, Symbol.toStringTag, { value: "Module" })), Gge = "请输入搜索关键词", Vge = "全部分类", Yge = "预约", Kge = "已售", Qge = "没有更多内容啦~", W7e = {
  searchKeywordPlaceholder: Gge,
  allCategory: Vge,
  reserveBtn: Yge,
  soldOut: Kge,
  nothingMore: Qge
}, q7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: Vge,
  default: W7e,
  nothingMore: Qge,
  reserveBtn: Yge,
  searchKeywordPlaceholder: Gge,
  soldOut: Kge
}, Symbol.toStringTag, { value: "Module" })), Xge = "人选择", Jge = "已选", Zge = "次", ehe = "暂无项目介绍", ohe = "暂无购买须知", the = "暂无更多数据", nhe = "项目名称", she = "价格", rhe = "单位", ahe = "暂无价目表", che = "首页", ihe = "分享", lhe = "客服", dhe = "立即预约", uhe = "立即下单", phe = "已下架", mhe = "没有更多内容啦~", G7e = {
  selectNum: Xge,
  selected: Jge,
  time: Zge,
  noProjectInt: ehe,
  noPurchase: ohe,
  noMore: the,
  projectName: nhe,
  price: she,
  unit: rhe,
  noPriceList: ahe,
  index: che,
  share: ihe,
  service: lhe,
  bookNow: dhe,
  orderNow: uhe,
  delisted: phe,
  nothingMore: mhe
}, V7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: dhe,
  default: G7e,
  delisted: phe,
  index: che,
  noMore: the,
  noPriceList: ahe,
  noProjectInt: ehe,
  noPurchase: ohe,
  nothingMore: mhe,
  orderNow: uhe,
  price: she,
  projectName: nhe,
  selectNum: Xge,
  selected: Jge,
  service: lhe,
  share: ihe,
  time: Zge,
  unit: rhe
}, Symbol.toStringTag, { value: "Module" })), _he = "没有更多内容啦~", ghe = "请搜索您想要的商品", hhe = "综合", fhe = "销量", yhe = "价格", $he = "筛选", vhe = "全部分类", bhe = "已售", The = "没有更多内容啦~", Y7e = {
  end: _he,
  searchPlaceholder: ghe,
  synthesis: hhe,
  sales: fhe,
  price: yhe,
  screen: $he,
  allCategory: vhe,
  soldOut: bhe,
  nothingMore: The
}, K7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allCategory: vhe,
  default: Y7e,
  end: _he,
  nothingMore: The,
  price: yhe,
  sales: fhe,
  screen: $he,
  searchPlaceholder: ghe,
  soldOut: bhe,
  synthesis: hhe
}, Symbol.toStringTag, { value: "Module" })), Phe = "请输入搜索关键词", She = "抢购", Ohe = "没有更多内容啦~", whe = "没有更多内容啦~", jhe = "已售", khe = "订单号", Che = "实付款", Mhe = "详情", Q7e = {
  searchNamePlaceholder: Phe,
  reserveBtn: She,
  nothingMore: Ohe,
  noHomeAddress: whe,
  soldOut: jhe,
  orderNo: khe,
  actualPayment: Che,
  orderDetail: Mhe
}, X7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: Che,
  default: Q7e,
  noHomeAddress: whe,
  nothingMore: Ohe,
  orderDetail: Mhe,
  orderNo: khe,
  reserveBtn: She,
  searchNamePlaceholder: Phe,
  soldOut: jhe
}, Symbol.toStringTag, { value: "Module" })), Ahe = "订单数(个)", Ihe = "订单金额(元)", Nhe = "订单管理", Dhe = "查看更多", zhe = "待服务订单", xhe = "服务中订单", Ehe = "已服务订单", Rhe = "数量：", Fhe = "查看详情", Hhe = "服务项目", Lhe = "加载中", Bhe = "没有更多内容啦~", J7e = {
  orderNum: Ahe,
  orderAmount: Ihe,
  orderManagement: Nhe,
  viewMore: Dhe,
  pendingOrder: zhe,
  orderInService: xhe,
  finishedOrder: Ehe,
  amount: Rhe,
  viewDetails: Fhe,
  serviceItem: Hhe,
  loadingText: Lhe,
  nothingMore: Bhe
}, Z7e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amount: Rhe,
  default: J7e,
  finishedOrder: Ehe,
  loadingText: Lhe,
  nothingMore: Bhe,
  orderAmount: Ihe,
  orderInService: xhe,
  orderManagement: Nhe,
  orderNum: Ahe,
  pendingOrder: zhe,
  serviceItem: Hhe,
  viewDetails: Fhe,
  viewMore: Dhe
}, Symbol.toStringTag, { value: "Module" })), Uhe = "添加服务项目", Whe = "编辑服务项目", qhe = "服务项目", Ghe = "请输入服务项目", Vhe = "价格", Yhe = "请输入价格", Khe = "元", Qhe = "项目图片", Xhe = "提交", Jhe = "加载中...", Zhe = "没有更多内容啦~", e9e = {
  addServiceItem: Uhe,
  editServiceItem: Whe,
  serviceItem: qhe,
  serviceItemPlaceholder: Ghe,
  price: Vhe,
  pricePlaceholder: Yhe,
  yuan: Khe,
  serviceImg: Qhe,
  save: Xhe,
  loading: Jhe,
  nothingMore: Zhe
}, o9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: Uhe,
  default: e9e,
  editServiceItem: Whe,
  loading: Jhe,
  nothingMore: Zhe,
  price: Vhe,
  pricePlaceholder: Yhe,
  save: Xhe,
  serviceImg: Qhe,
  serviceItem: qhe,
  serviceItemPlaceholder: Ghe,
  yuan: Khe
}, Symbol.toStringTag, { value: "Module" })), efe = "下单", ofe = "接单", tfe = "开始", nfe = "完成", sfe = "服务日期:", rfe = "新增服务项目", afe = "已支付", cfe = "未支付", ife = "去支付", lfe = "查看", dfe = "编辑", ufe = "订单信息", pfe = "订单编号", mfe = "联系人姓名", _fe = "联系电话", gfe = "备注", hfe = "首页", ffe = "联系客户", yfe = "刷新", $fe = "服务码", vfe = "没有更多内容啦~", bfe = "查看退款", t9e = {
  placeOrder: efe,
  takeOrders: ofe,
  start: tfe,
  finish: nfe,
  serviceDate: sfe,
  addServiceItem: rfe,
  havePaid: afe,
  notPaid: cfe,
  goToPay: ife,
  show: lfe,
  edit: dfe,
  delete: "删除",
  orderInfo: ufe,
  orderNo: pfe,
  person: mfe,
  personTel: _fe,
  remark: gfe,
  index: hfe,
  contact: ffe,
  refresh: yfe,
  checkCode: $fe,
  nothingMore: vfe,
  viewRefund: bfe
}, n9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addServiceItem: rfe,
  checkCode: $fe,
  contact: ffe,
  default: t9e,
  edit: dfe,
  finish: nfe,
  goToPay: ife,
  havePaid: afe,
  index: hfe,
  notPaid: cfe,
  nothingMore: vfe,
  orderInfo: ufe,
  orderNo: pfe,
  person: mfe,
  personTel: _fe,
  placeOrder: efe,
  refresh: yfe,
  remark: gfe,
  serviceDate: sfe,
  show: lfe,
  start: tfe,
  takeOrders: ofe,
  viewRefund: bfe
}, Symbol.toStringTag, { value: "Module" })), Tfe = "服务日期:", Pfe = "已支付", Sfe = "未支付", Ofe = "联系客户", wfe = "服务码", jfe = "没有更多内容啦~", s9e = {
  serviceDate: Tfe,
  havePaid: Pfe,
  notPaid: Sfe,
  contact: Ofe,
  checkCode: wfe,
  nothingMore: jfe
}, r9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkCode: wfe,
  contact: Ofe,
  default: s9e,
  havePaid: Pfe,
  notPaid: Sfe,
  nothingMore: jfe,
  serviceDate: Tfe
}, Symbol.toStringTag, { value: "Module" })), kfe = "退款方式", Cfe = "退款原因", Mfe = "退款编号", Afe = "申请时间", Ife = "退款说明", Nfe = "查看", Dfe = "退款金额", zfe = "凭证", xfe = "没有更多内容啦~", a9e = {
  refundType: kfe,
  refundCause: Cfe,
  refundNo: Mfe,
  createTime: Afe,
  createExplain: Ife,
  check: Nfe,
  refundMoney: Dfe,
  voucher: zfe,
  nothingMore: xfe
}, c9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  check: Nfe,
  createExplain: Ife,
  createTime: Afe,
  default: a9e,
  nothingMore: xfe,
  refundCause: Cfe,
  refundMoney: Dfe,
  refundNo: Mfe,
  refundType: kfe,
  voucher: zfe
}, Symbol.toStringTag, { value: "Module" })), Efe = "查看服务项目", Rfe = "服务项目", Ffe = "价格", Hfe = "元", Lfe = "项目图片", Bfe = "加载中...", Ufe = "没有更多内容啦~", i9e = {
  showServiceItem: Efe,
  serviceItem: Rfe,
  price: Ffe,
  yuan: Hfe,
  serviceImg: Lfe,
  loading: Bfe,
  nothingMore: Ufe
}, l9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: i9e,
  loading: Bfe,
  nothingMore: Ufe,
  price: Ffe,
  serviceImg: Lfe,
  serviceItem: Rfe,
  showServiceItem: Efe,
  yuan: Hfe
}, Symbol.toStringTag, { value: "Module" })), Wfe = "订单", qfe = "下单", Gfe = "接单", Vfe = "开始", Yfe = "完成", Kfe = "已支付", Qfe = "未支付", Xfe = "查看退款", Jfe = "申请退款", Zfe = "去支付", eye = "查看", oye = "服务人员", tye = "待派单", nye = "联系电话", sye = "服务码", rye = "注:服务人员上门时需提供", aye = "订单编号", cye = "交易流水号", iye = "创建时间", lye = "上门时间", dye = "买家留言", uye = "支付方式", pye = "支付时间", mye = "项目金额", _ye = "实付金额", gye = "首页", hye = "刷新", fye = "客服", yye = "收藏", $ye = "没有更多内容啦~", vye = "的帮付", d9e = {
  order: Wfe,
  placeOrder: qfe,
  takeOrders: Gfe,
  start: Vfe,
  finish: Yfe,
  havePaid: Kfe,
  notPaid: Qfe,
  viewRefund: Xfe,
  applyRefund: Jfe,
  goToPay: Zfe,
  show: eye,
  servicePersonal: oye,
  orderToBeSent: tye,
  contactNumber: nye,
  serviceCode: sye,
  explain: rye,
  onOrder: aye,
  transactionNumber: cye,
  createTime: iye,
  reserveServiceTime: lye,
  remark: dye,
  modePayment: uye,
  payTime: pye,
  goodsMoney: mye,
  realMoney: _ye,
  index: gye,
  refresh: hye,
  service: fye,
  collect: yye,
  nothingMore: $ye,
  helpPay: vye
}, u9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyRefund: Jfe,
  collect: yye,
  contactNumber: nye,
  createTime: iye,
  default: d9e,
  explain: rye,
  finish: Yfe,
  goToPay: Zfe,
  goodsMoney: mye,
  havePaid: Kfe,
  helpPay: vye,
  index: gye,
  modePayment: uye,
  notPaid: Qfe,
  nothingMore: $ye,
  onOrder: aye,
  order: Wfe,
  orderToBeSent: tye,
  payTime: pye,
  placeOrder: qfe,
  realMoney: _ye,
  refresh: hye,
  remark: dye,
  reserveServiceTime: lye,
  service: fye,
  serviceCode: sye,
  servicePersonal: oye,
  show: eye,
  start: Vfe,
  takeOrders: Gfe,
  transactionNumber: cye,
  viewRefund: Xfe
}, Symbol.toStringTag, { value: "Module" })), bye = "全部", Tye = "未支付", Pye = "实付金额：", Sye = "订单金额：", Oye = "未获取到订单信息", wye = "没有更多内容啦~", p9e = {
  all: bye,
  notPaid: Tye,
  payMoney: Pye,
  orderMoney: Sye,
  emptyTips: Oye,
  nothingMore: wye
}, m9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: bye,
  default: p9e,
  emptyTips: Oye,
  notPaid: Tye,
  nothingMore: wye,
  orderMoney: Sye,
  payMoney: Pye
}, Symbol.toStringTag, { value: "Module" })), jye = "添加上门地址", kye = "选择技师", Cye = "上门时间", Mye = "请选择上门时间", Aye = "买家留言", Iye = "请填写留言信息", Nye = "商品金额", Dye = "合计：", zye = "提交订单", xye = "没有更多内容啦~", _9e = {
  addHomeAddress: jye,
  selectiveTechnician: kye,
  addHomeTime: Cye,
  selectAddTimePlaceholder: Mye,
  buysMessage: Aye,
  messagePlaceholder: Iye,
  goodsMoney: Nye,
  total: Dye,
  submit: zye,
  nothingMore: xye
}, g9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addHomeAddress: jye,
  addHomeTime: Cye,
  buysMessage: Aye,
  default: _9e,
  goodsMoney: Nye,
  messagePlaceholder: Iye,
  nothingMore: xye,
  selectAddTimePlaceholder: Mye,
  selectiveTechnician: kye,
  submit: zye,
  total: Dye
}, Symbol.toStringTag, { value: "Module" })), Eye = "上传凭证", Rye = "选填", Fye = "补充描述", Hye = "补充描述,有助于更好的处理售后问题", Lye = "退款原因", Bye = "退款金额", Uye = "确定", Wye = "请选择", qye = "最多可输入金额￥", Gye = "提交", Vye = "没有更多内容啦~", h9e = {
  uploadProof: Eye,
  optional: Rye,
  description: Fye,
  descriptionPlaceholder: Hye,
  refundReason: Lye,
  refundMoney: Bye,
  confirm: Uye,
  placeholder: Wye,
  moreInputMoney: qye,
  submit: Gye,
  nothingMore: Vye
}, f9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirm: Uye,
  default: h9e,
  description: Fye,
  descriptionPlaceholder: Hye,
  moreInputMoney: qye,
  nothingMore: Vye,
  optional: Rye,
  placeholder: Wye,
  refundMoney: Bye,
  refundReason: Lye,
  submit: Gye,
  uploadProof: Eye
}, Symbol.toStringTag, { value: "Module" })), Yye = "退货详情", Kye = "极速退款成功", Qye = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", Xye = "退款方式", Jye = "退款原因", Zye = "退款编号", e$e = "申请时间", o$e = "退款说明", t$e = "协商记录", n$e = "查看", s$e = "取消退款", r$e = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", a$e = "首页", c$e = "退款金额", i$e = "凭证", l$e = "没有更多内容啦~", y9e = {
  refundDetail: Yye,
  fastRefundSuccessful: Kye,
  refundInfo: Qye,
  refundType: Xye,
  refundCause: Jye,
  refundNo: Zye,
  createTime: e$e,
  createExplain: o$e,
  record: t$e,
  check: n$e,
  refundApply: s$e,
  cancelRefundContent: r$e,
  index: a$e,
  refundMoney: c$e,
  voucher: i$e,
  nothingMore: l$e
}, $9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: r$e,
  check: n$e,
  createExplain: o$e,
  createTime: e$e,
  default: y9e,
  fastRefundSuccessful: Kye,
  index: a$e,
  nothingMore: l$e,
  record: t$e,
  refundApply: s$e,
  refundCause: Jye,
  refundDetail: Yye,
  refundInfo: Qye,
  refundMoney: c$e,
  refundNo: Zye,
  refundType: Xye,
  voucher: i$e
}, Symbol.toStringTag, { value: "Module" })), d$e = "退款金额", u$e = "取消退款", p$e = "详情", m$e = "实付款", _$e = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", g$e = "没有更多内容啦~", v9e = {
  refundMoney: d$e,
  refundApply: u$e,
  orderDetail: p$e,
  actualPayment: m$e,
  cancelRefundContent: _$e,
  nothingMore: g$e
}, b9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: m$e,
  cancelRefundContent: _$e,
  default: v9e,
  nothingMore: g$e,
  orderDetail: p$e,
  refundApply: u$e,
  refundMoney: d$e
}, Symbol.toStringTag, { value: "Module" })), h$e = "返回详情", f$e = "没有更多内容啦~", T9e = {
  detail: h$e,
  nothingMore: f$e
}, P9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: T9e,
  detail: h$e,
  nothingMore: f$e
}, Symbol.toStringTag, { value: "Module" })), y$e = "选择技师", $$e = "请选择", v$e = "预约时间", b$e = "买家留言", T$e = "请填写留言信息", P$e = "立即购买", S$e = "立即预约", O$e = "首页", w$e = "手机号", j$e = "请输入手机号", k$e = "请输入正确的手机号", C$e = "客服", M$e = "收藏", A$e = "没有更多内容啦~", S9e = {
  selectTechnician: y$e,
  pleaseChoose: $$e,
  reserveTime: v$e,
  remark: b$e,
  fillRemark: T$e,
  buy: P$e,
  reserve: S$e,
  index: O$e,
  mobile: w$e,
  mobilePlaceholder: j$e,
  correctMobilePlaceholder: k$e,
  service: C$e,
  collect: M$e,
  nothingMore: A$e
}, O9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: P$e,
  collect: M$e,
  correctMobilePlaceholder: k$e,
  default: S9e,
  fillRemark: T$e,
  index: O$e,
  mobile: w$e,
  mobilePlaceholder: j$e,
  nothingMore: A$e,
  pleaseChoose: $$e,
  remark: b$e,
  reserve: S$e,
  reserveTime: v$e,
  selectTechnician: y$e,
  service: C$e
}, Symbol.toStringTag, { value: "Module" })), I$e = "订单数", N$e = "工龄", D$e = "年", z$e = "年龄", x$e = "岁", E$e = "岗位", R$e = "基本信息", F$e = "服务项目", H$e = "没有更多内容啦~", w9e = {
  orderNum: I$e,
  workingAge: N$e,
  year: D$e,
  age: z$e,
  annum: x$e,
  position: E$e,
  basicInfo: R$e,
  serviceItem: F$e,
  nothingMore: H$e
}, j9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  age: z$e,
  annum: x$e,
  basicInfo: R$e,
  default: w9e,
  nothingMore: H$e,
  orderNum: I$e,
  position: E$e,
  serviceItem: F$e,
  workingAge: N$e,
  year: D$e
}, Symbol.toStringTag, { value: "Module" })), L$e = "年", B$e = "请输入搜索关键词", U$e = "已服务", W$e = "已离职", q$e = "休息中", G$e = "详情", V$e = "没有更多内容啦~", k9e = {
  year: L$e,
  searchPlaceholder: B$e,
  service: U$e,
  haveLeft: W$e,
  takeBreak: q$e,
  detail: G$e,
  nothingMore: V$e
}, C9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: k9e,
  detail: G$e,
  haveLeft: W$e,
  nothingMore: V$e,
  searchPlaceholder: B$e,
  service: U$e,
  takeBreak: q$e,
  year: L$e
}, Symbol.toStringTag, { value: "Module" })), M9e = {}, A9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: M9e
}, Symbol.toStringTag, { value: "Module" })), Y$e = "订单号", K$e = "实付款", Q$e = "关闭订单", X$e = "确认收货", J$e = "去支付", Z$e = "详情", eve = "支付流水号", ove = "创建时间", tve = "配送方式", nve = "支付方式", sve = "支付时间", rve = "商品金额", ave = "配送费用", cve = "实付金额", ive = "评价", lve = "查看评价", dve = "首页", uve = "优惠金额", pve = "查看物流", mve = "复制", _ve = "详细信息", gve = "的帮付", hve = "用户备注", I9e = {
  orderNo: Y$e,
  actualPayment: K$e,
  orderClose: Q$e,
  orderFinish: X$e,
  topay: J$e,
  orderDetail: Z$e,
  orderTradeNo: eve,
  createTime: ove,
  deliveryType: tve,
  payTypeName: nve,
  payTime: sve,
  goodsMoney: rve,
  deliveryMoney: ave,
  orderMoney: cve,
  evaluate: ive,
  selectedEvaluate: lve,
  index: dve,
  discountMoney: uve,
  logisticsTracking: pve,
  copy: mve,
  detailedInformation: _ve,
  helpPay: gve,
  memberRemark: hve
}, N9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: K$e,
  copy: mve,
  createTime: ove,
  default: I9e,
  deliveryMoney: ave,
  deliveryType: tve,
  detailedInformation: _ve,
  discountMoney: uve,
  evaluate: ive,
  goodsMoney: rve,
  helpPay: gve,
  index: dve,
  logisticsTracking: pve,
  memberRemark: hve,
  orderClose: Q$e,
  orderDetail: Z$e,
  orderFinish: X$e,
  orderMoney: cve,
  orderNo: Y$e,
  orderTradeNo: eve,
  payTime: sve,
  payTypeName: nve,
  selectedEvaluate: lve,
  topay: J$e
}, Symbol.toStringTag, { value: "Module" })), fve = "暂无收货地址，请先创建地址", yve = "新增收货地址", $ve = "选择地址", vve = "评价", bve = "元", Tve = "待支付", Pve = "剩余时间", Sve = "含物流运输服务", Ove = "查看评价", wve = "关闭订单", jve = "确认收货", kve = "支付", Cve = "配送方式", Mve = "下单时间", D9e = {
  emptyAddress: fve,
  addAddress: yve,
  selectAddress: $ve,
  evaluate: vve,
  money: bve,
  pendingPayment: Tve,
  pendingPaymentTips: Pve,
  service: Sve,
  selectedEvaluate: Ove,
  orderClose: wve,
  orderFinish: jve,
  topay: kve,
  deliveryType: Cve,
  createTime: Mve
}, z9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: yve,
  createTime: Mve,
  default: D9e,
  deliveryType: Cve,
  emptyAddress: fve,
  evaluate: vve,
  money: bve,
  orderClose: wve,
  orderFinish: jve,
  pendingPayment: Tve,
  pendingPaymentTips: Pve,
  selectAddress: $ve,
  selectedEvaluate: Ove,
  service: Sve,
  topay: kve
}, Symbol.toStringTag, { value: "Module" })), Ave = "订单号", Ive = "实付款", Nve = "关闭订单", Dve = "确认收货", zve = "支付", xve = "详情", Eve = "评价", Rve = "暂无订单", Fve = "暂无收货地址，请先创建地址", Hve = "换一换", Lve = "活动说明", Bve = "该商品起购", Uve = "件", Wve = "该商品每人限购", qve = "该商品单次限购", Gve = "商品库存不足", Vve = "件，超过按", Yve = "购买", Kve = "限购", Qve = "一键购买", Xve = "我知道了", x9e = {
  orderNo: Ave,
  actualPayment: Ive,
  orderClose: Nve,
  orderFinish: Dve,
  topay: zve,
  orderDetail: xve,
  evaluate: Eve,
  orderListempty: Rve,
  emptyAddress: Fve,
  changeIt: Hve,
  activityInstructions: Lve,
  goodsLimitThree: Bve,
  piece: Uve,
  goodsLimitTwo: Wve,
  goodsLimitOne: qve,
  stockNotEnough: Gve,
  limitPlaceholderTwo: Vve,
  limitPlaceholderThree: Yve,
  limitPlaceholderOne: Kve,
  buyWithOneClick: Qve,
  know: Xve
}, E9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: Lve,
  actualPayment: Ive,
  buyWithOneClick: Qve,
  changeIt: Hve,
  default: x9e,
  emptyAddress: Fve,
  evaluate: Eve,
  goodsLimitOne: qve,
  goodsLimitThree: Bve,
  goodsLimitTwo: Wve,
  know: Xve,
  limitPlaceholderOne: Kve,
  limitPlaceholderThree: Yve,
  limitPlaceholderTwo: Vve,
  orderClose: Nve,
  orderDetail: xve,
  orderFinish: Dve,
  orderListempty: Rve,
  orderNo: Ave,
  piece: Uve,
  stockNotEnough: Gve,
  topay: zve
}, Symbol.toStringTag, { value: "Module" })), Jve = "退货详情", Zve = "极速退款成功", ebe = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", obe = "退款方式", tbe = "退款金额", nbe = "退款原因", sbe = "拒绝原因", rbe = "退款编号", abe = "申请时间", cbe = "退款说明", ibe = "协商记录", lbe = "查看", dbe = "取消退款", ube = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", pbe = "首页", R9e = {
  refundDetail: Jve,
  fastRefundSuccessful: Zve,
  refundInfo: ebe,
  refundType: obe,
  refundMoney: tbe,
  refundCause: nbe,
  reasonRefusal: sbe,
  refundNo: rbe,
  createTime: abe,
  createExplain: cbe,
  record: ibe,
  check: lbe,
  refundApply: dbe,
  cancelRefundContent: ube,
  index: pbe
}, F9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: ube,
  check: lbe,
  createExplain: cbe,
  createTime: abe,
  default: R9e,
  fastRefundSuccessful: Zve,
  index: pbe,
  reasonRefusal: sbe,
  record: ibe,
  refundApply: dbe,
  refundCause: nbe,
  refundDetail: Jve,
  refundInfo: ebe,
  refundMoney: tbe,
  refundNo: rbe,
  refundType: obe
}, Symbol.toStringTag, { value: "Module" })), mbe = "退款编号", _be = "退款金额", gbe = "取消退款", hbe = "退款进度", fbe = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", H9e = {
  refundNo: mbe,
  refundMoney: _be,
  refundApply: gbe,
  refund: hbe,
  cancelRefundContent: fbe
}, L9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: fbe,
  default: H9e,
  refund: hbe,
  refundApply: gbe,
  refundMoney: _be,
  refundNo: mbe
}, Symbol.toStringTag, { value: "Module" })), ybe = "订单号", B9e = {
  orderNo: ybe
}, U9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: B9e,
  orderNo: ybe
}, Symbol.toStringTag, { value: "Module" })), $be = "充值", vbe = "提现", bbe = "余额明细", Tbe = "账户余额（元）", Pbe = "余额（元）", Sbe = "可提现余额（元）", Obe = "可用余额", wbe = "充值金额不能低于", jbe = "确认", kbe = "请输入充值金额", Cbe = "最低充值金额为", Mbe = "元", Abe = "充值记录", Ibe = "充值方式", Nbe = "充值说明", W9e = {
  recharge: $be,
  cashOut: vbe,
  balanceDetail: bbe,
  accountBalance: Tbe,
  balance: Pbe,
  money: Sbe,
  availableBalance: Obe,
  rechargeAmountError: wbe,
  confirm: jbe,
  customRechargeAmount: kbe,
  minWithdrawal: Cbe,
  yuan: Mbe,
  rechargeRecord: Abe,
  RechargeMethod: Ibe,
  rechargeInstructions: Nbe
}, q9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RechargeMethod: Ibe,
  accountBalance: Tbe,
  availableBalance: Obe,
  balance: Pbe,
  balanceDetail: bbe,
  cashOut: vbe,
  confirm: jbe,
  customRechargeAmount: kbe,
  default: W9e,
  minWithdrawal: Cbe,
  money: Sbe,
  recharge: $be,
  rechargeAmountError: wbe,
  rechargeInstructions: Nbe,
  rechargeRecord: Abe,
  yuan: Mbe
}, Symbol.toStringTag, { value: "Module" })), Dbe = "充值记录", zbe = "暂无充值记录", G9e = {
  rechargeRecord: Dbe,
  emptyTip: zbe
}, V9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: G9e,
  emptyTip: zbe,
  rechargeRecord: Dbe
}, Symbol.toStringTag, { value: "Module" })), xbe = "订单编号", Ebe = "创建时间", Y9e = {
  orderNo: xbe,
  createTime: Ebe
}, K9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: Ebe,
  default: Y9e,
  orderNo: xbe
}, Symbol.toStringTag, { value: "Module" })), Q9e = {}, X9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Q9e
}, Symbol.toStringTag, { value: "Module" })), J9e = {}, Z9e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: J9e
}, Symbol.toStringTag, { value: "Module" })), Rbe = "订单号", Fbe = "实付款", Hbe = "关闭订单", Lbe = "确认收货", Bbe = "去支付", Ube = "详情", Wbe = "支付流水号", qbe = "创建时间", Gbe = "配送方式", Vbe = "支付方式", Ybe = "支付时间", Kbe = "商品金额", Qbe = "配送费用", Xbe = "实付金额", Jbe = "评价", Zbe = "查看评价", eTe = "首页", oTe = "优惠金额", tTe = "查看物流", nTe = "复制", sTe = "详细信息", rTe = "的帮付", aTe = "用户备注", eGe = {
  orderNo: Rbe,
  actualPayment: Fbe,
  orderClose: Hbe,
  orderFinish: Lbe,
  topay: Bbe,
  orderDetail: Ube,
  orderTradeNo: Wbe,
  createTime: qbe,
  deliveryType: Gbe,
  payTypeName: Vbe,
  payTime: Ybe,
  goodsMoney: Kbe,
  deliveryMoney: Qbe,
  orderMoney: Xbe,
  evaluate: Jbe,
  selectedEvaluate: Zbe,
  index: eTe,
  discountMoney: oTe,
  logisticsTracking: tTe,
  copy: nTe,
  detailedInformation: sTe,
  helpPay: rTe,
  memberRemark: aTe
}, oGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: Fbe,
  copy: nTe,
  createTime: qbe,
  default: eGe,
  deliveryMoney: Qbe,
  deliveryType: Gbe,
  detailedInformation: sTe,
  discountMoney: oTe,
  evaluate: Jbe,
  goodsMoney: Kbe,
  helpPay: rTe,
  index: eTe,
  logisticsTracking: tTe,
  memberRemark: aTe,
  orderClose: Hbe,
  orderDetail: Ube,
  orderFinish: Lbe,
  orderMoney: Xbe,
  orderNo: Rbe,
  orderTradeNo: Wbe,
  payTime: Ybe,
  payTypeName: Vbe,
  selectedEvaluate: Zbe,
  topay: Bbe
}, Symbol.toStringTag, { value: "Module" })), cTe = "暂无收货地址，请先创建地址", iTe = "新增收货地址", lTe = "选择地址", dTe = "评价", uTe = "元", pTe = "待支付", mTe = "剩余时间", _Te = "含物流运输服务", gTe = "查看评价", hTe = "关闭订单", fTe = "确认收货", yTe = "支付", $Te = "配送方式", vTe = "下单时间", tGe = {
  emptyAddress: cTe,
  addAddress: iTe,
  selectAddress: lTe,
  evaluate: dTe,
  money: uTe,
  pendingPayment: pTe,
  pendingPaymentTips: mTe,
  service: _Te,
  selectedEvaluate: gTe,
  orderClose: hTe,
  orderFinish: fTe,
  topay: yTe,
  deliveryType: $Te,
  createTime: vTe
}, nGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: iTe,
  createTime: vTe,
  default: tGe,
  deliveryType: $Te,
  emptyAddress: cTe,
  evaluate: dTe,
  money: uTe,
  orderClose: hTe,
  orderFinish: fTe,
  pendingPayment: pTe,
  pendingPaymentTips: mTe,
  selectAddress: lTe,
  selectedEvaluate: gTe,
  service: _Te,
  topay: yTe
}, Symbol.toStringTag, { value: "Module" })), bTe = "订单号", TTe = "实付款", PTe = "关闭订单", STe = "确认收货", OTe = "支付", wTe = "详情", jTe = "评价", kTe = "暂无订单", CTe = "暂无收货地址，请先创建地址", MTe = "换一换", ATe = "活动说明", ITe = "该商品起购", NTe = "件", DTe = "该商品每人限购", zTe = "该商品单次限购", xTe = "商品库存不足", ETe = "件，超过按", RTe = "购买", FTe = "限购", HTe = "一键购买", LTe = "我知道了", sGe = {
  orderNo: bTe,
  actualPayment: TTe,
  orderClose: PTe,
  orderFinish: STe,
  topay: OTe,
  orderDetail: wTe,
  evaluate: jTe,
  orderListempty: kTe,
  emptyAddress: CTe,
  changeIt: MTe,
  activityInstructions: ATe,
  goodsLimitThree: ITe,
  piece: NTe,
  goodsLimitTwo: DTe,
  goodsLimitOne: zTe,
  stockNotEnough: xTe,
  limitPlaceholderTwo: ETe,
  limitPlaceholderThree: RTe,
  limitPlaceholderOne: FTe,
  buyWithOneClick: HTe,
  know: LTe
}, rGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: ATe,
  actualPayment: TTe,
  buyWithOneClick: HTe,
  changeIt: MTe,
  default: sGe,
  emptyAddress: CTe,
  evaluate: jTe,
  goodsLimitOne: zTe,
  goodsLimitThree: ITe,
  goodsLimitTwo: DTe,
  know: LTe,
  limitPlaceholderOne: FTe,
  limitPlaceholderThree: RTe,
  limitPlaceholderTwo: ETe,
  orderClose: PTe,
  orderDetail: wTe,
  orderFinish: STe,
  orderListempty: kTe,
  orderNo: bTe,
  piece: NTe,
  stockNotEnough: xTe,
  topay: OTe
}, Symbol.toStringTag, { value: "Module" })), BTe = "退货详情", UTe = "极速退款成功", WTe = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", qTe = "退款方式", GTe = "退款金额", VTe = "退款原因", YTe = "拒绝原因", KTe = "退款编号", QTe = "申请时间", XTe = "退款说明", JTe = "协商记录", ZTe = "查看", ePe = "取消退款", oPe = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", tPe = "首页", aGe = {
  refundDetail: BTe,
  fastRefundSuccessful: UTe,
  refundInfo: WTe,
  refundType: qTe,
  refundMoney: GTe,
  refundCause: VTe,
  reasonRefusal: YTe,
  refundNo: KTe,
  createTime: QTe,
  createExplain: XTe,
  record: JTe,
  check: ZTe,
  refundApply: ePe,
  cancelRefundContent: oPe,
  index: tPe
}, cGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: oPe,
  check: ZTe,
  createExplain: XTe,
  createTime: QTe,
  default: aGe,
  fastRefundSuccessful: UTe,
  index: tPe,
  reasonRefusal: YTe,
  record: JTe,
  refundApply: ePe,
  refundCause: VTe,
  refundDetail: BTe,
  refundInfo: WTe,
  refundMoney: GTe,
  refundNo: KTe,
  refundType: qTe
}, Symbol.toStringTag, { value: "Module" })), nPe = "退款编号", sPe = "退款金额", rPe = "取消退款", aPe = "退款进度", cPe = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", iGe = {
  refundNo: nPe,
  refundMoney: sPe,
  refundApply: rPe,
  refund: aPe,
  cancelRefundContent: cPe
}, lGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: cPe,
  default: iGe,
  refund: aPe,
  refundApply: rPe,
  refundMoney: sPe,
  refundNo: nPe
}, Symbol.toStringTag, { value: "Module" })), dGe = {}, uGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dGe
}, Symbol.toStringTag, { value: "Module" })), iPe = "订单号", lPe = "实付款", dPe = "关闭订单", uPe = "确认收货", pPe = "去支付", mPe = "详情", _Pe = "支付流水号", gPe = "创建时间", hPe = "配送方式", fPe = "支付方式", yPe = "支付时间", $Pe = "商品金额", vPe = "配送费用", bPe = "实付金额", TPe = "评价", PPe = "查看评价", SPe = "首页", OPe = "优惠金额", wPe = "查看物流", jPe = "复制", kPe = "详细信息", CPe = "的帮付", MPe = "用户备注", pGe = {
  orderNo: iPe,
  actualPayment: lPe,
  orderClose: dPe,
  orderFinish: uPe,
  topay: pPe,
  orderDetail: mPe,
  orderTradeNo: _Pe,
  createTime: gPe,
  deliveryType: hPe,
  payTypeName: fPe,
  payTime: yPe,
  goodsMoney: $Pe,
  deliveryMoney: vPe,
  orderMoney: bPe,
  evaluate: TPe,
  selectedEvaluate: PPe,
  index: SPe,
  discountMoney: OPe,
  logisticsTracking: wPe,
  copy: jPe,
  detailedInformation: kPe,
  helpPay: CPe,
  memberRemark: MPe
}, mGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: lPe,
  copy: jPe,
  createTime: gPe,
  default: pGe,
  deliveryMoney: vPe,
  deliveryType: hPe,
  detailedInformation: kPe,
  discountMoney: OPe,
  evaluate: TPe,
  goodsMoney: $Pe,
  helpPay: CPe,
  index: SPe,
  logisticsTracking: wPe,
  memberRemark: MPe,
  orderClose: dPe,
  orderDetail: mPe,
  orderFinish: uPe,
  orderMoney: bPe,
  orderNo: iPe,
  orderTradeNo: _Pe,
  payTime: yPe,
  payTypeName: fPe,
  selectedEvaluate: PPe,
  topay: pPe
}, Symbol.toStringTag, { value: "Module" })), APe = "暂无收货地址，请先创建地址", IPe = "新增收货地址", NPe = "选择地址", DPe = "评价", zPe = "元", xPe = "待支付", EPe = "剩余时间", RPe = "含物流运输服务", FPe = "查看评价", HPe = "关闭订单", LPe = "确认收货", BPe = "支付", UPe = "配送方式", WPe = "下单时间", _Ge = {
  emptyAddress: APe,
  addAddress: IPe,
  selectAddress: NPe,
  evaluate: DPe,
  money: zPe,
  pendingPayment: xPe,
  pendingPaymentTips: EPe,
  service: RPe,
  selectedEvaluate: FPe,
  orderClose: HPe,
  orderFinish: LPe,
  topay: BPe,
  deliveryType: UPe,
  createTime: WPe
}, gGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: IPe,
  createTime: WPe,
  default: _Ge,
  deliveryType: UPe,
  emptyAddress: APe,
  evaluate: DPe,
  money: zPe,
  orderClose: HPe,
  orderFinish: LPe,
  pendingPayment: xPe,
  pendingPaymentTips: EPe,
  selectAddress: NPe,
  selectedEvaluate: FPe,
  service: RPe,
  topay: BPe
}, Symbol.toStringTag, { value: "Module" })), qPe = "订单号", GPe = "实付款", VPe = "关闭订单", YPe = "确认收货", KPe = "支付", QPe = "详情", XPe = "评价", JPe = "暂无订单", ZPe = "暂无收货地址，请先创建地址", eSe = "换一换", oSe = "活动说明", tSe = "该商品起购", nSe = "件", sSe = "该商品每人限购", rSe = "该商品单次限购", aSe = "商品库存不足", cSe = "件，超过按", iSe = "购买", lSe = "限购", dSe = "一键购买", uSe = "我知道了", hGe = {
  orderNo: qPe,
  actualPayment: GPe,
  orderClose: VPe,
  orderFinish: YPe,
  topay: KPe,
  orderDetail: QPe,
  evaluate: XPe,
  orderListempty: JPe,
  emptyAddress: ZPe,
  changeIt: eSe,
  activityInstructions: oSe,
  goodsLimitThree: tSe,
  piece: nSe,
  goodsLimitTwo: sSe,
  goodsLimitOne: rSe,
  stockNotEnough: aSe,
  limitPlaceholderTwo: cSe,
  limitPlaceholderThree: iSe,
  limitPlaceholderOne: lSe,
  buyWithOneClick: dSe,
  know: uSe
}, fGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: oSe,
  actualPayment: GPe,
  buyWithOneClick: dSe,
  changeIt: eSe,
  default: hGe,
  emptyAddress: ZPe,
  evaluate: XPe,
  goodsLimitOne: rSe,
  goodsLimitThree: tSe,
  goodsLimitTwo: sSe,
  know: uSe,
  limitPlaceholderOne: lSe,
  limitPlaceholderThree: iSe,
  limitPlaceholderTwo: cSe,
  orderClose: VPe,
  orderDetail: QPe,
  orderFinish: YPe,
  orderListempty: JPe,
  orderNo: qPe,
  piece: nSe,
  stockNotEnough: aSe,
  topay: KPe
}, Symbol.toStringTag, { value: "Module" })), pSe = "退货详情", mSe = "极速退款成功", _Se = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", gSe = "退款方式", hSe = "退款金额", fSe = "退款原因", ySe = "拒绝原因", $Se = "退款编号", vSe = "申请时间", bSe = "退款说明", TSe = "协商记录", PSe = "查看", SSe = "取消退款", OSe = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", wSe = "首页", yGe = {
  refundDetail: pSe,
  fastRefundSuccessful: mSe,
  refundInfo: _Se,
  refundType: gSe,
  refundMoney: hSe,
  refundCause: fSe,
  reasonRefusal: ySe,
  refundNo: $Se,
  createTime: vSe,
  createExplain: bSe,
  record: TSe,
  check: PSe,
  refundApply: SSe,
  cancelRefundContent: OSe,
  index: wSe
}, $Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: OSe,
  check: PSe,
  createExplain: bSe,
  createTime: vSe,
  default: yGe,
  fastRefundSuccessful: mSe,
  index: wSe,
  reasonRefusal: ySe,
  record: TSe,
  refundApply: SSe,
  refundCause: fSe,
  refundDetail: pSe,
  refundInfo: _Se,
  refundMoney: hSe,
  refundNo: $Se,
  refundType: gSe
}, Symbol.toStringTag, { value: "Module" })), jSe = "退款编号", kSe = "退款金额", CSe = "取消退款", MSe = "退款进度", ASe = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", vGe = {
  refundNo: jSe,
  refundMoney: kSe,
  refundApply: CSe,
  refund: MSe,
  cancelRefundContent: ASe
}, bGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: ASe,
  default: vGe,
  refund: MSe,
  refundApply: CSe,
  refundMoney: kSe,
  refundNo: jSe
}, Symbol.toStringTag, { value: "Module" })), ISe = "订单号", NSe = "实付款", DSe = "关闭订单", zSe = "确认收货", xSe = "优惠劵", ESe = "暂无收货地址，请先创建地址", RSe = "新增收货地址", FSe = "选择地址", TGe = {
  orderNo: ISe,
  actualPayment: NSe,
  orderClose: DSe,
  orderFinish: zSe,
  coupon: xSe,
  emptyAddress: ESe,
  addAddress: RSe,
  selectAddress: FSe
}, PGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: NSe,
  addAddress: RSe,
  coupon: xSe,
  default: TGe,
  emptyAddress: ESe,
  orderClose: DSe,
  orderFinish: zSe,
  orderNo: ISe,
  selectAddress: FSe
}, Symbol.toStringTag, { value: "Module" })), SGe = {}, OGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SGe
}, Symbol.toStringTag, { value: "Module" })), wGe = {}, jGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wGe
}, Symbol.toStringTag, { value: "Module" })), kGe = {}, CGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kGe
}, Symbol.toStringTag, { value: "Module" })), HSe = "全部", LSe = "价格", MGe = {
  all: HSe,
  price: LSe
}, AGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: HSe,
  default: MGe,
  price: LSe
}, Symbol.toStringTag, { value: "Module" })), BSe = "榜单规则", IGe = {
  rankingRules: BSe
}, NGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IGe,
  rankingRules: BSe
}, Symbol.toStringTag, { value: "Module" })), DGe = {}, zGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DGe
}, Symbol.toStringTag, { value: "Module" })), USe = "优惠券", xGe = {
  coupon: USe
}, EGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coupon: USe,
  default: xGe
}, Symbol.toStringTag, { value: "Module" })), WSe = "订单号", qSe = "实付款", GSe = "关闭订单", VSe = "确认收货", YSe = "去支付", KSe = "详情", QSe = "支付流水号", XSe = "创建时间", JSe = "配送方式", ZSe = "支付方式", eOe = "支付时间", oOe = "商品金额", tOe = "配送费用", nOe = "实付金额", sOe = "评价", rOe = "查看评价", aOe = "首页", cOe = "优惠金额", iOe = "查看物流", lOe = "复制", dOe = "详细信息", uOe = "的帮付", pOe = "用户备注", mOe = "删除", RGe = {
  orderNo: WSe,
  actualPayment: qSe,
  orderClose: GSe,
  orderFinish: VSe,
  topay: YSe,
  orderDetail: KSe,
  orderTradeNo: QSe,
  createTime: XSe,
  deliveryType: JSe,
  payTypeName: ZSe,
  payTime: eOe,
  goodsMoney: oOe,
  deliveryMoney: tOe,
  orderMoney: nOe,
  evaluate: sOe,
  selectedEvaluate: rOe,
  index: aOe,
  discountMoney: cOe,
  logisticsTracking: iOe,
  copy: lOe,
  detailedInformation: dOe,
  helpPay: uOe,
  memberRemark: pOe,
  orderDelete: mOe
}, FGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: qSe,
  copy: lOe,
  createTime: XSe,
  default: RGe,
  deliveryMoney: tOe,
  deliveryType: JSe,
  detailedInformation: dOe,
  discountMoney: cOe,
  evaluate: sOe,
  goodsMoney: oOe,
  helpPay: uOe,
  index: aOe,
  logisticsTracking: iOe,
  memberRemark: pOe,
  orderClose: GSe,
  orderDelete: mOe,
  orderDetail: KSe,
  orderFinish: VSe,
  orderMoney: nOe,
  orderNo: WSe,
  orderTradeNo: QSe,
  payTime: eOe,
  payTypeName: ZSe,
  selectedEvaluate: rOe,
  topay: YSe
}, Symbol.toStringTag, { value: "Module" })), _Oe = "暂无收货地址，请先创建地址", gOe = "新增收货地址", hOe = "选择地址", fOe = "评价", yOe = "元", $Oe = "待支付", vOe = "剩余时间", bOe = "含物流运输服务", TOe = "查看评价", POe = "关闭订单", SOe = "确认收货", OOe = "支付", wOe = "配送方式", jOe = "下单时间", kOe = "删除", HGe = {
  emptyAddress: _Oe,
  addAddress: gOe,
  selectAddress: hOe,
  evaluate: fOe,
  money: yOe,
  pendingPayment: $Oe,
  pendingPaymentTips: vOe,
  service: bOe,
  selectedEvaluate: TOe,
  orderClose: POe,
  orderFinish: SOe,
  topay: OOe,
  deliveryType: wOe,
  createTime: jOe,
  orderDelete: kOe
}, LGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAddress: gOe,
  createTime: jOe,
  default: HGe,
  deliveryType: wOe,
  emptyAddress: _Oe,
  evaluate: fOe,
  money: yOe,
  orderClose: POe,
  orderDelete: kOe,
  orderFinish: SOe,
  pendingPayment: $Oe,
  pendingPaymentTips: vOe,
  selectAddress: hOe,
  selectedEvaluate: TOe,
  service: bOe,
  topay: OOe
}, Symbol.toStringTag, { value: "Module" })), COe = "订单号", MOe = "实付款", AOe = "关闭订单", IOe = "确认收货", NOe = "支付", DOe = "详情", zOe = "评价", xOe = "暂无订单", EOe = "暂无收货地址，请先创建地址", ROe = "换一换", FOe = "活动说明", HOe = "该商品起购", LOe = "件", BOe = "该商品每人限购", UOe = "该商品单次限购", WOe = "商品库存不足", qOe = "件，超过按", GOe = "购买", VOe = "限购", YOe = "一键购买", KOe = "我知道了", BGe = {
  orderNo: COe,
  actualPayment: MOe,
  orderClose: AOe,
  orderFinish: IOe,
  topay: NOe,
  orderDetail: DOe,
  evaluate: zOe,
  orderListempty: xOe,
  emptyAddress: EOe,
  changeIt: ROe,
  activityInstructions: FOe,
  goodsLimitThree: HOe,
  piece: LOe,
  goodsLimitTwo: BOe,
  goodsLimitOne: UOe,
  stockNotEnough: WOe,
  limitPlaceholderTwo: qOe,
  limitPlaceholderThree: GOe,
  limitPlaceholderOne: VOe,
  buyWithOneClick: YOe,
  know: KOe
}, UGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activityInstructions: FOe,
  actualPayment: MOe,
  buyWithOneClick: YOe,
  changeIt: ROe,
  default: BGe,
  emptyAddress: EOe,
  evaluate: zOe,
  goodsLimitOne: UOe,
  goodsLimitThree: HOe,
  goodsLimitTwo: BOe,
  know: KOe,
  limitPlaceholderOne: VOe,
  limitPlaceholderThree: GOe,
  limitPlaceholderTwo: qOe,
  orderClose: AOe,
  orderDetail: DOe,
  orderFinish: IOe,
  orderListempty: xOe,
  orderNo: COe,
  piece: LOe,
  stockNotEnough: WOe,
  topay: NOe
}, Symbol.toStringTag, { value: "Module" })), QOe = "积分", XOe = "元", JOe = "已兑", WGe = {
  point: QOe,
  priceUnit: XOe,
  redeemed: JOe
}, qGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WGe,
  point: QOe,
  priceUnit: XOe,
  redeemed: JOe
}, Symbol.toStringTag, { value: "Module" })), ZOe = "订单号", e1e = "订单金额", o1e = "关闭订单", t1e = "确认收货", n1e = "支付", s1e = "详情", r1e = "评价", a1e = "查看评价", c1e = "暂无订单", i1e = "配送方式", l1e = "元", d1e = "积分", GGe = {
  orderNo: ZOe,
  actualPayment: e1e,
  orderClose: o1e,
  orderFinish: t1e,
  topay: n1e,
  orderDetail: s1e,
  evaluate: r1e,
  selectedEvaluate: a1e,
  orderListempty: c1e,
  deliveryType: i1e,
  money: l1e,
  point: d1e
}, VGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: e1e,
  default: GGe,
  deliveryType: i1e,
  evaluate: r1e,
  money: l1e,
  orderClose: o1e,
  orderDetail: s1e,
  orderFinish: t1e,
  orderListempty: c1e,
  orderNo: ZOe,
  point: d1e,
  selectedEvaluate: a1e,
  topay: n1e
}, Symbol.toStringTag, { value: "Module" })), u1e = "退货详情", p1e = "极速退款成功", m1e = "由于你的信誉良好,已享受极速退款服务,退款即刻到账", _1e = "退款方式", g1e = "退款金额", h1e = "退款原因", f1e = "拒绝原因", y1e = "退款编号", $1e = "申请时间", v1e = "退款说明", b1e = "协商记录", T1e = "查看", P1e = "取消退款", S1e = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", O1e = "首页", YGe = {
  refundDetail: u1e,
  fastRefundSuccessful: p1e,
  refundInfo: m1e,
  refundType: _1e,
  refundMoney: g1e,
  refundCause: h1e,
  reasonRefusal: f1e,
  refundNo: y1e,
  createTime: $1e,
  createExplain: v1e,
  record: b1e,
  check: T1e,
  refundApply: P1e,
  cancelRefundContent: S1e,
  index: O1e
}, KGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: S1e,
  check: T1e,
  createExplain: v1e,
  createTime: $1e,
  default: YGe,
  fastRefundSuccessful: p1e,
  index: O1e,
  reasonRefusal: f1e,
  record: b1e,
  refundApply: P1e,
  refundCause: h1e,
  refundDetail: u1e,
  refundInfo: m1e,
  refundMoney: g1e,
  refundNo: y1e,
  refundType: _1e
}, Symbol.toStringTag, { value: "Module" })), w1e = "退款编号", j1e = "退款金额", k1e = "取消退款", C1e = "退款进度", M1e = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", QGe = {
  refundNo: w1e,
  refundMoney: j1e,
  refundApply: k1e,
  refund: C1e,
  cancelRefundContent: M1e
}, XGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelRefundContent: M1e,
  default: QGe,
  refund: C1e,
  refundApply: k1e,
  refundMoney: j1e,
  refundNo: w1e
}, Symbol.toStringTag, { value: "Module" })), A1e = "订单号", JGe = {
  orderNo: A1e
}, ZGe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: JGe,
  orderNo: A1e
}, Symbol.toStringTag, { value: "Module" })), I1e = "退款状态：", eVe = {
  refundStatus: I1e
}, oVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eVe,
  refundStatus: I1e
}, Symbol.toStringTag, { value: "Module" })), N1e = "分销活动未开启", D1e = "系统任务奖励", z1e = "提现", x1e = "账单信息", E1e = "累计佣金", R1e = "销售奖励", F1e = "销售额排行奖励", H1e = "可提现", L1e = "提现中", B1e = "无", U1e = "推荐人", tVe = {
  fenxiaoNotOpen: N1e,
  taskDesc: D1e,
  cashOut: z1e,
  billingInformation: x1e,
  commissionGet: E1e,
  sale: R1e,
  saleDesc: F1e,
  commission: H1e,
  commissionCashOuting: L1e,
  notHave: B1e,
  referrer: U1e
}, nVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  billingInformation: x1e,
  cashOut: z1e,
  commission: H1e,
  commissionCashOuting: L1e,
  commissionGet: E1e,
  default: tVe,
  fenxiaoNotOpen: N1e,
  notHave: B1e,
  referrer: U1e,
  sale: R1e,
  saleDesc: F1e,
  taskDesc: D1e
}, Symbol.toStringTag, { value: "Module" })), W1e = "任务奖励", q1e = "分销活动未开启", G1e = "系统任务奖励", V1e = "提现", Y1e = "账单信息", K1e = "累计佣金", Q1e = "待结算", X1e = "销售奖励", J1e = "销售额排行奖励", Z1e = "可提现", ewe = "提现中", sVe = {
  task: W1e,
  fenxiaoNotOpen: q1e,
  taskDesc: G1e,
  cashOut: V1e,
  billingInformation: Y1e,
  commissionGet: K1e,
  pendingSettlement: Q1e,
  sale: X1e,
  saleDesc: J1e,
  commission: Z1e,
  commissionCashOuting: ewe
}, rVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  billingInformation: Y1e,
  cashOut: V1e,
  commission: Z1e,
  commissionCashOuting: ewe,
  commissionGet: K1e,
  default: sVe,
  fenxiaoNotOpen: q1e,
  pendingSettlement: Q1e,
  sale: X1e,
  saleDesc: J1e,
  task: W1e,
  taskDesc: G1e
}, Symbol.toStringTag, { value: "Module" })), owe = "未解锁", twe = "满足以下任意条件", nwe = "满足以下全部条件", swe = "即可升级", aVe = {
  notYetUnlocked: owe,
  arbitraryCondition: twe,
  allConditions: nwe,
  upgradable: swe
}, cVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allConditions: nwe,
  arbitraryCondition: twe,
  default: aVe,
  notYetUnlocked: owe,
  upgradable: swe
}, Symbol.toStringTag, { value: "Module" })), rwe = "退款状态：", iVe = {
  refundStatus: rwe
}, lVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: iVe,
  refundStatus: rwe
}, Symbol.toStringTag, { value: "Module" })), awe = "任务说明", cwe = "奖励规则", dVe = {
  taskSpecification: awe,
  rewardRules: cwe
}, uVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dVe,
  rewardRules: cwe,
  taskSpecification: awe
}, Symbol.toStringTag, { value: "Module" })), iwe = "退款状态：", pVe = {
  refundStatus: iwe
}, mVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pVe,
  refundStatus: iwe
}, Symbol.toStringTag, { value: "Module" })), lwe = "实付款", dwe = "关闭订单", uwe = "订单号", _Ve = {
  actualPayment: lwe,
  orderClose: dwe,
  orderNo: uwe
}, gVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: lwe,
  default: _Ve,
  orderClose: dwe,
  orderNo: uwe
}, Symbol.toStringTag, { value: "Module" })), pwe = "请输入卡片编号", mwe = "请输入卡片密码", _we = "立即兑换", gwe = "卡片编号", hwe = "卡片密码", fwe = "温馨提示", ywe = "激活卡片", $we = "卡密激活", vwe = "恭喜您 激活成功！", bwe = "您已成功激活了1张礼品卡~", Twe = "去看看", hVe = {
  cardNumberPlaceholder: pwe,
  passwordPlaceholder: mwe,
  redeemNow: _we,
  cardNo: gwe,
  cardKey: hwe,
  reminder: fwe,
  activateCard: ywe,
  cardEncryptionActivation: $we,
  popupTipsOne: vwe,
  popupTipsTwo: bwe,
  gouToSee: Twe
}, fVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activateCard: ywe,
  cardEncryptionActivation: $we,
  cardKey: hwe,
  cardNo: gwe,
  cardNumberPlaceholder: pwe,
  default: hVe,
  gouToSee: Twe,
  passwordPlaceholder: mwe,
  popupTipsOne: vwe,
  popupTipsTwo: bwe,
  redeemNow: _we,
  reminder: fwe
}, Symbol.toStringTag, { value: "Module" })), Pwe = "全部", Swe = "元", Owe = "赠送好友", wwe = "去使用", jwe = "已使用", kwe = "已失效", Cwe = "暂无卡记录", yVe = {
  all: Pwe,
  yuan: Swe,
  giftToFriends: Owe,
  canUse: wwe,
  used: jwe,
  invalid: kwe,
  cardEmpty: Cwe
}, $Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: Pwe,
  canUse: wwe,
  cardEmpty: Cwe,
  default: yVe,
  giftToFriends: Owe,
  invalid: kwe,
  used: jwe,
  yuan: Swe
}, Symbol.toStringTag, { value: "Module" })), Mwe = "购买数量", Awe = "选择面值", Iwe = "可兑换商品", Nwe = "该兑换卡可在以下商品中任选", Dwe = "件兑换", zwe = "该兑换卡可兑换以下商品", xwe = "使用须知", Ewe = "礼品卡详情", Rwe = "售价", Fwe = "立即购买", Hwe = "该卡活动已结束", Lwe = "该卡已下架", Bwe = "缺少礼品卡id", Uwe = "找不到该礼品卡", vVe = {
  purchaseQuantity: Mwe,
  selectDenomination: Awe,
  convertibleGoods: Iwe,
  goodsTitleOne: Nwe,
  goodsTitleOneAnd: Dwe,
  goodsTitleTwo: zwe,
  instruction: xwe,
  cardDesc: Ewe,
  price: Rwe,
  buyNow: Fwe,
  EventEnds: Hwe,
  removed: Lwe,
  lackCardId: Bwe,
  unableToFindGiftCard: Uwe
}, bVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventEnds: Hwe,
  buyNow: Fwe,
  cardDesc: Ewe,
  convertibleGoods: Iwe,
  default: vVe,
  goodsTitleOne: Nwe,
  goodsTitleOneAnd: Dwe,
  goodsTitleTwo: zwe,
  instruction: xwe,
  lackCardId: Bwe,
  price: Rwe,
  purchaseQuantity: Mwe,
  removed: Lwe,
  selectDenomination: Awe,
  unableToFindGiftCard: Uwe
}, Symbol.toStringTag, { value: "Module" })), Wwe = "元", qwe = "送上您的祝福", Gwe = "自定义祝福语", Vwe = "请填写您的祝福语", Ywe = "确定赠送好友", Kwe = "赠送设置", Qwe = "礼品卡不存在", Xwe = "嘿！朋友送你一张礼品卡，快来领取吧~", Jwe = "赠送数量", Zwe = "本次赠送数量", eje = "请输入本次赠送数量", oje = "限领数量", tje = "每人最多可领数量", nje = "请输入每人最多可领数量", sje = "共有", rje = "张", aje = "张卡片", cje = "确定", TVe = {
  yuan: Wwe,
  blessing: qwe,
  customBlessing: Gwe,
  blessingPlaceholder: Vwe,
  giftToFriendsSave: Ywe,
  giveSetUp: Kwe,
  notCard: Qwe,
  shareTitle: Xwe,
  giveNum: Jwe,
  giveNumPlaceholder: Zwe,
  giveNumPlaceholderOne: eje,
  limitNum: oje,
  limitNumPlaceholder: tje,
  limitNumPlaceholderOne: nje,
  tipsAnd: sje,
  unit: rje,
  tipsEnd: aje,
  giveSave: cje
}, PVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  blessing: qwe,
  blessingPlaceholder: Vwe,
  customBlessing: Gwe,
  default: TVe,
  giftToFriendsSave: Ywe,
  giveNum: Jwe,
  giveNumPlaceholder: Zwe,
  giveNumPlaceholderOne: eje,
  giveSave: cje,
  giveSetUp: Kwe,
  limitNum: oje,
  limitNumPlaceholder: tje,
  limitNumPlaceholderOne: nje,
  notCard: Qwe,
  shareTitle: Xwe,
  tipsAnd: sje,
  tipsEnd: aje,
  unit: rje,
  yuan: Wwe
}, Symbol.toStringTag, { value: "Module" })), ije = "送给他的", lje = "您祝对方", dje = "对方已领取", uje = "礼品卡不存在", SVe = {
  giveTipsOne: ije,
  giveTipsTwo: lje,
  otherReceive: dje,
  notCard: uje
}, OVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SVe,
  giveTipsOne: ije,
  giveTipsTwo: lje,
  notCard: uje,
  otherReceive: dje
}, Symbol.toStringTag, { value: "Module" })), pje = "元", mje = "查看详情", _je = "暂无卡记录", wVe = {
  yuan: pje,
  viewDetails: mje,
  cardEmpty: _je
}, jVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cardEmpty: _je,
  default: wVe,
  viewDetails: mje,
  yuan: pje
}, Symbol.toStringTag, { value: "Module" })), gje = "全部", hje = "暂无卡记录", kVe = {
  all: gje,
  cardEmpty: hje
}, CVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: gje,
  cardEmpty: hje,
  default: kVe
}, Symbol.toStringTag, { value: "Module" })), fje = "元", yje = "全部", $je = "去使用", vje = "已使用", bje = "已失效", Tje = "张", Pje = "赠送好友", Sje = "查看卡包", Oje = "暂无卡记录", MVe = {
  yuan: fje,
  all: yje,
  canUse: $je,
  used: vje,
  invalid: bje,
  unit: Tje,
  giftToFriends: Pje,
  seeCardBag: Sje,
  cardEmpty: Oje
}, AVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: yje,
  canUse: $je,
  cardEmpty: Oje,
  default: MVe,
  giftToFriends: Pje,
  invalid: bje,
  seeCardBag: Sje,
  unit: Tje,
  used: vje,
  yuan: fje
}, Symbol.toStringTag, { value: "Module" })), wje = "元储值卡", jje = "订单留言", kje = "订单号", Cje = "实付款", Mje = "关闭订单", Aje = "确认收货", Ije = "去支付", Nje = "缺少订单id", Dje = "详情", zje = "支付流水号", xje = "创建时间", Eje = "配送方式", Rje = "支付方式", Fje = "支付时间", Hje = "商品金额", Lje = "实付金额", Bje = "首页", Uje = "复制", Wje = "查看卡包", qje = "该卡已转赠", Gje = "详细信息", Vje = "提示", Yje = "您确定要关闭该订单吗？", IVe = {
  yuanStoredValueCard: wje,
  orderMessage: jje,
  orderNo: kje,
  actualPayment: Cje,
  orderClose: Mje,
  orderFinish: Aje,
  topay: Ije,
  notOrderId: Nje,
  orderDetail: Dje,
  orderTradeNo: zje,
  createTime: xje,
  deliveryType: Eje,
  payTypeName: Rje,
  payTime: Fje,
  goodsMoney: Hje,
  orderMoney: Lje,
  index: Bje,
  copy: Uje,
  seeCardBag: Wje,
  transfergiftCard: qje,
  detailedInformation: Gje,
  tips: Vje,
  tipsOne: Yje
}, NVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actualPayment: Cje,
  copy: Uje,
  createTime: xje,
  default: IVe,
  deliveryType: Eje,
  detailedInformation: Gje,
  goodsMoney: Hje,
  index: Bje,
  notOrderId: Nje,
  orderClose: Mje,
  orderDetail: Dje,
  orderFinish: Aje,
  orderMessage: jje,
  orderMoney: Lje,
  orderNo: kje,
  orderTradeNo: zje,
  payTime: Fje,
  payTypeName: Rje,
  seeCardBag: Wje,
  tips: Vje,
  tipsOne: Yje,
  topay: Ije,
  transfergiftCard: qje,
  yuanStoredValueCard: wje
}, Symbol.toStringTag, { value: "Module" })), Kje = "元储值卡", Qje = "支付", Xje = "全部", Jje = "关闭订单", Zje = "暂无购卡记录", eke = "提示", oke = "您确定要关闭该订单吗？", DVe = {
  yuanStoredValueCard: Kje,
  topay: Qje,
  all: Xje,
  orderClose: Jje,
  cardEmpty: Zje,
  tips: eke,
  tipsOne: oke
}, zVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: Xje,
  cardEmpty: Zje,
  default: DVe,
  orderClose: Jje,
  tips: eke,
  tipsOne: oke,
  topay: Qje,
  yuanStoredValueCard: Kje
}, Symbol.toStringTag, { value: "Module" })), tke = "元储值卡", nke = "订单留言", ske = "合计", rke = "提交订单", ake = "选填,建议先与商家协商一致", xVe = {
  yuanStoredValueCard: tke,
  orderMessage: nke,
  total: ske,
  placeOrder: rke,
  remarkPlaceholder: ake
}, EVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xVe,
  orderMessage: nke,
  placeOrder: rke,
  remarkPlaceholder: ake,
  total: ske,
  yuanStoredValueCard: tke
}, Symbol.toStringTag, { value: "Module" })), cke = "对方祝您", ike = "赠送给您", lke = "您还可以领取", dke = "次礼品卡", uke = "立即领取", pke = "已被领取", mke = "恭喜您 领取成功！", _ke = "您已成功领取了1张礼品卡~", gke = "去看看", hke = "礼品卡不存在", fke = "查看卡包", RVe = {
  receiveTipsOne: cke,
  freeForYou: ike,
  receiveTipsTwo: lke,
  receiveTipsTwoAnd: dke,
  GetItNow: uke,
  alreadyClaimed: pke,
  popupTipsOne: mke,
  popupTipsTwo: _ke,
  gouToSee: gke,
  notCard: hke,
  seeCardBag: fke
}, FVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GetItNow: uke,
  alreadyClaimed: pke,
  default: RVe,
  freeForYou: ike,
  gouToSee: gke,
  notCard: hke,
  popupTipsOne: mke,
  popupTipsTwo: _ke,
  receiveTipsOne: cke,
  receiveTipsTwo: lke,
  receiveTipsTwoAnd: dke,
  seeCardBag: fke
}, Symbol.toStringTag, { value: "Module" })), yke = "赠送好友", $ke = "全部", vke = "去使用", bke = "已使用", Tke = "已失效", Pke = "暂无卡记录", HVe = {
  giftToFriends: yke,
  all: $ke,
  canUse: vke,
  used: bke,
  invalid: Tke,
  cardEmpty: Pke
}, LVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: $ke,
  canUse: vke,
  cardEmpty: Pke,
  default: HVe,
  giftToFriends: yke,
  invalid: Tke,
  used: bke
}, Symbol.toStringTag, { value: "Module" })), Ske = "元", Oke = "可兑换商品", wke = "该兑换卡可在以下商品中任选", jke = "件商品兑换", kke = "该兑换卡可兑换以下商品", Cke = "最多可选", Mke = "件 已兑换", Ake = "件", Ike = "使用须知", Nke = "礼品卡详情", Dke = "去使用", zke = "已使用", xke = "已失效", Eke = "赠送好友", Rke = "卡包", Fke = "恭喜您 到账成功！", Hke = "元已充值到您的账户中~", Lke = "去看看", Bke = "礼品卡不存在", BVe = {
  yuan: Ske,
  convertibleGoods: Oke,
  goodsTitleOne: wke,
  goodsTitleOneAnd: jke,
  goodsTitleTwo: kke,
  cardGoodsTypeAllTips: Cke,
  cardGoodsTypeAllTipsAnd: Mke,
  unit: Ake,
  instruction: Ike,
  cardDesc: Nke,
  canUse: Dke,
  used: zke,
  invalid: xke,
  giftToFriends: Eke,
  cardBag: Rke,
  popupTipsOne: Fke,
  popupTipsTwo: Hke,
  gouToSee: Lke,
  notCard: Bke
}, UVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  canUse: Dke,
  cardBag: Rke,
  cardDesc: Nke,
  cardGoodsTypeAllTips: Cke,
  cardGoodsTypeAllTipsAnd: Mke,
  convertibleGoods: Oke,
  default: BVe,
  giftToFriends: Eke,
  goodsTitleOne: wke,
  goodsTitleOneAnd: jke,
  goodsTitleTwo: kke,
  gouToSee: Lke,
  instruction: Ike,
  invalid: xke,
  notCard: Bke,
  popupTipsOne: Fke,
  popupTipsTwo: Hke,
  unit: Ake,
  used: zke,
  yuan: Ske
}, Symbol.toStringTag, { value: "Module" })), Uke = "以下商品存在已售罄或已下架的商品，请耐心等待卖家备货", Wke = "请在以下商品中任选", qke = "件商品", Gke = "请兑换以下商品", Vke = "最多可选", Yke = "件 已兑换", Kke = "件", Qke = "该商品已售罄", Xke = "该商品已下架", Jke = "卡包", Zke = "确认兑换", eCe = "已使用", oCe = "已失效", tCe = "礼品卡不存在", nCe = "请选择需要兑换的商品", sCe = "该礼品卡必须全部提货", WVe = {
  pageTips: Uke,
  goodsTitle: Wke,
  goodsTitleAnd: qke,
  goodsTitleTwo: Gke,
  cardGoodsTypeAllTips: Vke,
  cardGoodsTypeAllTipsAnd: Yke,
  unit: Kke,
  goodsSellOut: Qke,
  goodsRemove: Xke,
  cardBag: Jke,
  confirmExchange: Zke,
  used: eCe,
  invalid: oCe,
  notCard: tCe,
  saveTipsOne: nCe,
  saveTipsTwo: sCe
}, qVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cardBag: Jke,
  cardGoodsTypeAllTips: Vke,
  cardGoodsTypeAllTipsAnd: Yke,
  confirmExchange: Zke,
  default: WVe,
  goodsRemove: Xke,
  goodsSellOut: Qke,
  goodsTitle: Wke,
  goodsTitleAnd: qke,
  goodsTitleTwo: Gke,
  invalid: oCe,
  notCard: tCe,
  pageTips: Uke,
  saveTipsOne: nCe,
  saveTipsTwo: sCe,
  unit: Kke,
  used: eCe
}, Symbol.toStringTag, { value: "Module" })), GVe = {}, VVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GVe
}, Symbol.toStringTag, { value: "Module" })), rCe = "添加照片", aCe = "添加封面", cCe = "添加标题", iCe = "分享您的体验和心得...", lCe = "话题", dCe = "关联宝贝", uCe = "社区分类", pCe = "发布", YVe = {
  addPhoto: rCe,
  addCover: aCe,
  addTitle: cCe,
  contentTips: iCe,
  topic: lCe,
  treasure: dCe,
  communityCategory: uCe,
  create: pCe
}, KVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addCover: aCe,
  addPhoto: rCe,
  addTitle: cCe,
  communityCategory: uCe,
  contentTips: iCe,
  create: pCe,
  default: YVe,
  topic: lCe,
  treasure: dCe
}, Symbol.toStringTag, { value: "Module" })), mCe = "关注", _Ce = "粉丝", gCe = "请输入搜索关键词", hCe = "取消关注", fCe = "暂无关注", yCe = "暂无粉丝", $Ce = "确定取消关注", QVe = {
  follow: mCe,
  fans: _Ce,
  searchTips: gCe,
  unFollow: hCe,
  noFollow: fCe,
  noFans: yCe,
  unfollowTips: $Ce
}, XVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QVe,
  fans: _Ce,
  follow: mCe,
  noFans: yCe,
  noFollow: fCe,
  searchTips: gCe,
  unFollow: hCe,
  unfollowTips: $Ce
}, Symbol.toStringTag, { value: "Module" })), vCe = "正在审核，内容仅自己可见", bCe = "发布的内容审核通过后，将展示在首页！", TCe = "您的审核已被拒绝", PCe = "您发布的内容已被强制下架", SCe = "请重新编辑内容", OCe = "已关注", wCe = "关注", jCe = "管理", kCe = "编辑", CCe = "购买", MCe = "评论", ACe = "回复", ICe = "展开更多", NCe = "收起", DCe = "展开", zCe = "条回复", xCe = "暂无评论", ECe = "请输入关键字", RCe = "发送", FCe = "转发", HCe = "赞", LCe = "确定取消关注", BCe = "确定删除该内容吗", UCe = "确定删除该评论吗", JVe = {
  auditTitle: vCe,
  auditdesc: bCe,
  auditrefuse: TCe,
  offContent: PCe,
  offContentDesc: SCe,
  followed: OCe,
  follow: wCe,
  manage: jCe,
  edit: kCe,
  delete: "删除",
  buy: CCe,
  comment: MCe,
  reply: ACe,
  expandMore: ICe,
  packUp: NCe,
  expand: DCe,
  replysWord: zCe,
  noComments: xCe,
  keywordsPlaceholder: ECe,
  send: RCe,
  transpond: FCe,
  like: HCe,
  unfollowTips: LCe,
  deleteContentTips: BCe,
  deleteCommentTips: UCe
}, ZVe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditTitle: vCe,
  auditdesc: bCe,
  auditrefuse: TCe,
  buy: CCe,
  comment: MCe,
  default: JVe,
  deleteCommentTips: UCe,
  deleteContentTips: BCe,
  edit: kCe,
  expand: DCe,
  expandMore: ICe,
  follow: wCe,
  followed: OCe,
  keywordsPlaceholder: ECe,
  like: HCe,
  manage: jCe,
  noComments: xCe,
  offContent: PCe,
  offContentDesc: SCe,
  packUp: NCe,
  reply: ACe,
  replysWord: zCe,
  send: RCe,
  transpond: FCe,
  unfollowTips: LCe
}, Symbol.toStringTag, { value: "Module" })), WCe = "关注", qCe = "发现", GCe = "精选", VCe = "图", YCe = "暂无内容", KCe = "更多", QCe = "购买", XCe = "分享", JCe = "编辑", ZCe = "展开", eMe = "收起", oMe = "发布您的第一个种草秀", tMe = "去发布", nMe = "发布作品", sMe = "我的主页", rMe = "确定删除该内容吗", eYe = {
  follow: WCe,
  find: qCe,
  selection: GCe,
  picture: VCe,
  noContent: YCe,
  more: KCe,
  buy: QCe,
  share: XCe,
  edit: JCe,
  delete: "删除",
  expand: ZCe,
  packUp: eMe,
  createFirstSowCommunity: oMe,
  toCreate: tMe,
  createContent: nMe,
  myInfo: sMe,
  deleteContentTips: rMe
}, oYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: QCe,
  createContent: nMe,
  createFirstSowCommunity: oMe,
  default: eYe,
  deleteContentTips: rMe,
  edit: JCe,
  expand: ZCe,
  find: qCe,
  follow: WCe,
  more: KCe,
  myInfo: sMe,
  noContent: YCe,
  packUp: eMe,
  picture: VCe,
  selection: GCe,
  share: XCe,
  toCreate: tMe
}, Symbol.toStringTag, { value: "Module" })), aMe = "去发布", cMe = "取消关注", iMe = "关注", lMe = "粉丝", dMe = "获赞", uMe = "作品", pMe = "赞过", mMe = "正在审核...", _Me = "通过后将在列表展示", gMe = "审核拒绝...", hMe = "暂无作品", fMe = "强制下架...", yMe = "请重新编辑内容", $Me = "确定取消关注", tYe = {
  toCreate: aMe,
  unFollow: cMe,
  follow: iMe,
  fans: lMe,
  like: dMe,
  content: uMe,
  liked: pMe,
  inAudit: mMe,
  auditTips: _Me,
  auditRefuse: gMe,
  noContent: hMe,
  offContent: fMe,
  offContentTips: yMe,
  unfollowTips: $Me
}, nYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  auditRefuse: gMe,
  auditTips: _Me,
  content: uMe,
  default: tYe,
  fans: lMe,
  follow: iMe,
  inAudit: mMe,
  like: dMe,
  liked: pMe,
  noContent: hMe,
  offContent: fMe,
  offContentTips: yMe,
  toCreate: aMe,
  unFollow: cMe,
  unfollowTips: $Me
}, Symbol.toStringTag, { value: "Module" })), vMe = "请输入关键字", bMe = "搜索", TMe = "图", PMe = "暂无内容", sYe = {
  keywordsTips: vMe,
  search: bMe,
  picture: TMe,
  noContent: PMe
}, rYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sYe,
  keywordsTips: vMe,
  noContent: PMe,
  picture: TMe,
  search: bMe
}, Symbol.toStringTag, { value: "Module" })), SMe = "条种草秀", OMe = "图", wMe = "暂无内容", aYe = {
  itemSowshow: SMe,
  picture: OMe,
  noContent: wMe
}, cYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: aYe,
  itemSowshow: SMe,
  noContent: wMe,
  picture: OMe
}, Symbol.toStringTag, { value: "Module" })), jMe = "请输入话题名称", kMe = "欢迎加入", CMe = "讨论", MMe = "去发布", AMe = "种草", IMe = "篇", NMe = "内容", DMe = "最热", zMe = "图", xMe = "暂无内容", iYe = {
  keywordsTips: jMe,
  welcomeIn: kMe,
  discussion: CMe,
  toCreate: MMe,
  sowCommunity: AMe,
  piece: IMe,
  content: NMe,
  hot: DMe,
  new: "最新",
  picture: zMe,
  noContent: xMe
}, lYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  content: NMe,
  default: iYe,
  discussion: CMe,
  hot: DMe,
  keywordsTips: jMe,
  noContent: xMe,
  picture: zMe,
  piece: IMe,
  sowCommunity: AMe,
  toCreate: MMe,
  welcomeIn: kMe
}, Symbol.toStringTag, { value: "Module" })), EMe = "分享", RMe = "编辑", FMe = "展开", HMe = "收起", LMe = "购买", BMe = "暂无内容", UMe = "发布您的第一个种草秀", WMe = "去发布", qMe = "确定删除该内容吗", dYe = {
  share: EMe,
  edit: RMe,
  delete: "删除",
  expand: FMe,
  packUp: HMe,
  buy: LMe,
  noContent: BMe,
  createFirstSowCommunity: UMe,
  toCreate: WMe,
  deleteContentTips: qMe
}, uYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: LMe,
  createFirstSowCommunity: UMe,
  default: dYe,
  deleteContentTips: qMe,
  edit: RMe,
  expand: FMe,
  noContent: BMe,
  packUp: HMe,
  share: EMe,
  toCreate: WMe
}, Symbol.toStringTag, { value: "Module" })), pYe = {}, mYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pYe
}, Symbol.toStringTag, { value: "Module" })), GMe = "全部", VMe = "价格", _Ye = {
  all: GMe,
  price: VMe
}, gYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: GMe,
  default: _Ye,
  price: VMe
}, Symbol.toStringTag, { value: "Module" })), YMe = "订单号", KMe = "起", QMe = "星级", XMe = "星", JMe = "景点", ZMe = "线路", eAe = "酒店", oAe = "查看更多", hYe = {
  orderNo: YMe,
  rise: KMe,
  starLevel: QMe,
  star: XMe,
  scenic: JMe,
  way: ZMe,
  hotel: eAe,
  seeMore: oAe
}, fYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hYe,
  hotel: eAe,
  orderNo: YMe,
  rise: KMe,
  scenic: JMe,
  seeMore: oAe,
  star: XMe,
  starLevel: QMe,
  way: ZMe
}, Symbol.toStringTag, { value: "Module" })), tAe = "详情/设施", nAe = "地图", sAe = "入住", rAe = "离店", aAe = "晚", cAe = "共", iAe = "抢", lAe = "在线付", dAe = "立即预约", uAe = "住店", pAe = "离店", mAe = "请选择离店日期", yYe = {
  hotelTab: tAe,
  map: nAe,
  checkToday: sAe,
  checkTomorrow: rAe,
  lateness: aAe,
  common: cAe,
  rob: iAe,
  onlinePayment: lAe,
  bookNow: dAe,
  inHotel: uAe,
  checkOut: pAe,
  checkOutDate: mAe
}, $Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bookNow: dAe,
  checkOut: pAe,
  checkOutDate: mAe,
  checkToday: sAe,
  checkTomorrow: rAe,
  common: cAe,
  default: yYe,
  hotelTab: tAe,
  inHotel: uAe,
  lateness: aAe,
  map: nAe,
  onlinePayment: lAe,
  rob: iAe
}, Symbol.toStringTag, { value: "Module" })), _Ae = "请输入酒店名字", gAe = "全部", hAe = "起", fAe = "价格", vYe = {
  searchHotelName: _Ae,
  all: gAe,
  rise: hAe,
  price: fAe
}, bYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: gAe,
  default: vYe,
  price: fAe,
  rise: hAe,
  searchHotelName: _Ae
}, Symbol.toStringTag, { value: "Module" })), yAe = "景点", $Ae = "线路", vAe = "酒店", bAe = "订单号", TAe = "起", PAe = "星级", SAe = "星", OAe = "查看更多", TYe = {
  scenic: yAe,
  way: $Ae,
  hotel: vAe,
  orderNo: bAe,
  rise: TAe,
  starLevel: PAe,
  star: SAe,
  seeMore: OAe
}, PYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TYe,
  hotel: vAe,
  orderNo: bAe,
  rise: TAe,
  scenic: yAe,
  seeMore: OAe,
  star: SAe,
  starLevel: PAe,
  way: $Ae
}, Symbol.toStringTag, { value: "Module" })), wAe = "的帮付", SYe = {
  helpPay: wAe
}, OYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SYe,
  helpPay: wAe
}, Symbol.toStringTag, { value: "Module" })), jAe = "请输入景点名称", wYe = {
  searchScenicName: jAe
}, jYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wYe,
  searchScenicName: jAe
}, Symbol.toStringTag, { value: "Module" })), kAe = "请输入景点名称", kYe = {
  searchScenicName: kAe
}, CYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kYe,
  searchScenicName: kAe
}, Symbol.toStringTag, { value: "Module" })), CAe = "请输入景点名称", MYe = {
  searchScenicName: CAe
}, AYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MYe,
  searchScenicName: CAe
}, Symbol.toStringTag, { value: "Module" })), MAe = "已核销", AAe = "待核销", IAe = "核销其他", NAe = "订单编号", DAe = "创建时间", zAe = "支付时间", xAe = "核销时间", EAe = "线路信息", RAe = "预订时间", FAe = "游客人数", HAe = "景点信息", LAe = "门票信息", BAe = "酒店信息", UAe = "房型信息", WAe = "入住日期", qAe = "离店日期", GAe = "房间数", VAe = "未获取到核销记录", IYe = {
  used: MAe,
  waitUse: AAe,
  verifyOther: IAe,
  orderNo: NAe,
  createTime: DAe,
  payTime: zAe,
  verifyTime: xAe,
  wayInfo: EAe,
  reserveTime: RAe,
  touristNum: FAe,
  scenicInfo: HAe,
  ticketInfo: LAe,
  hotelInfo: BAe,
  roomInfo: UAe,
  hotelStartTime: WAe,
  hotelEndTime: qAe,
  hoteltNum: GAe,
  verifyDetailEmpty: VAe
}, NYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: DAe,
  default: IYe,
  hotelEndTime: qAe,
  hotelInfo: BAe,
  hotelStartTime: WAe,
  hoteltNum: GAe,
  orderNo: NAe,
  payTime: zAe,
  reserveTime: RAe,
  roomInfo: UAe,
  scenicInfo: HAe,
  ticketInfo: LAe,
  touristNum: FAe,
  used: MAe,
  verifyDetailEmpty: VAe,
  verifyOther: IAe,
  verifyTime: xAe,
  waitUse: AAe,
  wayInfo: EAe
}, Symbol.toStringTag, { value: "Module" })), YAe = "不是核销员", KAe = "核销券码", QAe = "确认核销", XAe = "请输入核销码", JAe = "核销记录", ZAe = "查询", eIe = "未查询到核销码信息", oIe = "已核销", tIe = "待核销", nIe = "核销其他", sIe = "订单编号", rIe = "创建时间", aIe = "支付时间", cIe = "核销时间", iIe = "线路信息", lIe = "预订时间", dIe = "游客人数", uIe = "景点信息", pIe = "门票信息", mIe = "酒店信息", _Ie = "房型信息", gIe = "入住日期", hIe = "离店日期", fIe = "房间数", DYe = {
  notIsVerifier: YAe,
  verifyTitle: KAe,
  confirmVerify: QAe,
  inputPlaceholder: XAe,
  verifyRecord: JAe,
  search: ZAe,
  notSearchResult: eIe,
  used: oIe,
  waitUse: tIe,
  verifyOther: nIe,
  orderNo: sIe,
  createTime: rIe,
  payTime: aIe,
  verifyTime: cIe,
  wayInfo: iIe,
  reserveTime: lIe,
  touristNum: dIe,
  scenicInfo: uIe,
  ticketInfo: pIe,
  hotelInfo: mIe,
  roomInfo: _Ie,
  hotelStartTime: gIe,
  hotelEndTime: hIe,
  hoteltNum: fIe
}, zYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  confirmVerify: QAe,
  createTime: rIe,
  default: DYe,
  hotelEndTime: hIe,
  hotelInfo: mIe,
  hotelStartTime: gIe,
  hoteltNum: fIe,
  inputPlaceholder: XAe,
  notIsVerifier: YAe,
  notSearchResult: eIe,
  orderNo: sIe,
  payTime: aIe,
  reserveTime: lIe,
  roomInfo: _Ie,
  scenicInfo: uIe,
  search: ZAe,
  ticketInfo: pIe,
  touristNum: dIe,
  used: oIe,
  verifyOther: nIe,
  verifyRecord: JAe,
  verifyTime: cIe,
  verifyTitle: KAe,
  waitUse: tIe,
  wayInfo: iIe
}, Symbol.toStringTag, { value: "Module" })), yIe = "请输入线路名字", xYe = {
  searchWayName: yIe
}, EYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xYe,
  searchWayName: yIe
}, Symbol.toStringTag, { value: "Module" })), $Ie = "项目预约", vIe = "办理次卡", bIe = "预约成功", TIe = "预约", PIe = "次卡", SIe = "去抢购", OIe = "办理", wIe = "已售", jIe = "订单号", kIe = "我的", CIe = "会员码", MIe = "查看更多", RYe = {
  cardReserve: $Ie,
  card: vIe,
  reserveSuccess: bIe,
  reserve: TIe,
  cardLink: PIe,
  reserveBtn: SIe,
  cardBtn: OIe,
  soldOut: wIe,
  orderNo: jIe,
  myLink: kIe,
  memberCode: CIe,
  seeMore: MIe
}, FYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  card: vIe,
  cardBtn: OIe,
  cardLink: PIe,
  cardReserve: $Ie,
  default: RYe,
  memberCode: CIe,
  myLink: kIe,
  orderNo: jIe,
  reserve: TIe,
  reserveBtn: SIe,
  reserveSuccess: bIe,
  seeMore: MIe,
  soldOut: wIe
}, Symbol.toStringTag, { value: "Module" })), AIe = "卡项内项目/商品总的可用次数为", IIe = "次数不限 ,", NIe = "有效期为", DIe = "永久", zIe = "天", xIe = "包含套餐", EIe = "可用次数", RIe = "购买须知", FIe = "暂无购买须知", HIe = "卡项详情", LIe = "暂无卡项详情", BIe = "立即购买", UIe = "首页", WIe = "客服", qIe = "收藏", GIe = "已售", VIe = "有效期", YIe = "总次数：", KIe = "已使用次数：", QIe = "价格", HYe = {
  hitCount: AIe,
  unlimitedNumberTimes: IIe,
  periodValidity: NIe,
  perpetual: DIe,
  day: zIe,
  packageIncluded: xIe,
  hitCountOne: EIe,
  purchaseNotes: RIe,
  noPurchaseNotes: FIe,
  cardDetail: HIe,
  noCardDetail: LIe,
  buy: BIe,
  index: UIe,
  service: WIe,
  collect: qIe,
  soldOut: GIe,
  create: VIe,
  usable: YIe,
  haveBeen: KIe,
  price: QIe
}, LYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: BIe,
  cardDetail: HIe,
  collect: qIe,
  create: VIe,
  day: zIe,
  default: HYe,
  haveBeen: KIe,
  hitCount: AIe,
  hitCountOne: EIe,
  index: UIe,
  noCardDetail: LIe,
  noPurchaseNotes: FIe,
  packageIncluded: xIe,
  periodValidity: NIe,
  perpetual: DIe,
  price: QIe,
  purchaseNotes: RIe,
  service: WIe,
  soldOut: GIe,
  unlimitedNumberTimes: IIe,
  usable: YIe
}, Symbol.toStringTag, { value: "Module" })), XIe = "请输入搜索关键词", JIe = "抢购", ZIe = "项目预约", eNe = "办理次卡", oNe = "预约成功", tNe = "预约", nNe = "次卡", sNe = "办理", rNe = "已售", aNe = "订单号", cNe = "我的", iNe = "会员码", lNe = "查看更多", BYe = {
  searchNamePlaceholder: XIe,
  reserveBtn: JIe,
  cardReserve: ZIe,
  card: eNe,
  reserveSuccess: oNe,
  reserve: tNe,
  cardLink: nNe,
  cardBtn: sNe,
  soldOut: rNe,
  orderNo: aNe,
  myLink: cNe,
  memberCode: iNe,
  seeMore: lNe
}, UYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  card: eNe,
  cardBtn: sNe,
  cardLink: nNe,
  cardReserve: ZIe,
  default: BYe,
  memberCode: iNe,
  myLink: cNe,
  orderNo: aNe,
  reserve: tNe,
  reserveBtn: JIe,
  reserveSuccess: oNe,
  searchNamePlaceholder: XIe,
  seeMore: lNe,
  soldOut: rNe
}, Symbol.toStringTag, { value: "Module" })), dNe = "核销次数", WYe = {
  verificationNum: dNe
}, qYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WYe,
  verificationNum: dNe
}, Symbol.toStringTag, { value: "Module" })), uNe = "订单", pNe = "您的订单", mNe = "，欢迎再次预订！", _Ne = "实付款", gNe = "订单编号", hNe = "复制", fNe = "交易号", yNe = "下单时间", $Ne = "关闭时间", vNe = "支付时间", bNe = "支付方式", TNe = "订单进度", PNe = "退款进度", SNe = "拒绝原因", ONe = "退款方式：原路退款，", wNe = "退款金额", jNe = "首页", kNe = "客服", CNe = "收藏", MNe = "去使用", ANe = "查看退款", INe = "取消退款", NNe = "申请退款", DNe = "的帮付", zNe = "撤销之后本次申请将会关闭,如后续仍有问题可再次发起申请。", GYe = {
  order: uNe,
  yourOrder: pNe,
  rebook: mNe,
  annualPayment: _Ne,
  onOrder: gNe,
  copy: hNe,
  transactionNumber: fNe,
  orderTime: yNe,
  offTime: $Ne,
  payTime: vNe,
  modePayment: bNe,
  orderSchedule: TNe,
  refundProgress: PNe,
  reasonRefusal: SNe,
  refundMethod: ONe,
  refundAmount: wNe,
  index: jNe,
  service: kNe,
  collect: CNe,
  toUse: MNe,
  viewRefund: ANe,
  cancelRefund: INe,
  applyRefund: NNe,
  helpPay: DNe,
  cancelRefundContent: zNe
}, VYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annualPayment: _Ne,
  applyRefund: NNe,
  cancelRefund: INe,
  cancelRefundContent: zNe,
  collect: CNe,
  copy: hNe,
  default: GYe,
  helpPay: DNe,
  index: jNe,
  modePayment: bNe,
  offTime: $Ne,
  onOrder: gNe,
  order: uNe,
  orderSchedule: TNe,
  orderTime: yNe,
  payTime: vNe,
  reasonRefusal: SNe,
  rebook: mNe,
  refundAmount: wNe,
  refundMethod: ONe,
  refundProgress: PNe,
  service: kNe,
  toUse: MNe,
  transactionNumber: fNe,
  viewRefund: ANe,
  yourOrder: pNe
}, Symbol.toStringTag, { value: "Module" })), xNe = "全部", ENe = "实付金额", RNe = "未获取到订单信息", YYe = {
  all: xNe,
  payMoney: ENe,
  emptyTips: RNe
}, KYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: xNe,
  default: YYe,
  emptyTips: RNe,
  payMoney: ENe
}, Symbol.toStringTag, { value: "Module" })), FNe = "购买时间：", HNe = "卡项次数：不限次数", LNe = "卡项次数：", BNe = "去使用", QYe = {
  createTime: FNe,
  cardNumNoLimit: HNe,
  cardNum: LNe,
  toUse: BNe
}, XYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cardNum: LNe,
  cardNumNoLimit: HNe,
  createTime: FNe,
  default: QYe,
  toUse: BNe
}, Symbol.toStringTag, { value: "Module" })), UNe = "使用记录", WNe = "使用说明", qNe = "暂无使用说明", GNe = "服务内容", VNe = "有效期", YNe = "创建时间", KNe = "去核销", QNe = "核销码", XNe = "总次数：", JNe = "已使用次数：", ZNe = "卡项内项目/商品总的可用次数为", eDe = "次数不限 ,", oDe = "未消费前请不要将券码提供给商家", JYe = {
  usageRecord: UNe,
  instructions: WNe,
  noInstructions: qNe,
  serviceContent: GNe,
  periodValidity: VNe,
  createTime: YNe,
  verification: KNe,
  verificationCode: QNe,
  usable: XNe,
  haveBeen: JNe,
  hitCount: ZNe,
  unlimitedNumberTimes: eDe,
  codeDesc: oDe
}, ZYe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  codeDesc: oDe,
  createTime: YNe,
  default: JYe,
  haveBeen: JNe,
  hitCount: ZNe,
  instructions: WNe,
  noInstructions: qNe,
  periodValidity: VNe,
  serviceContent: GNe,
  unlimitedNumberTimes: eDe,
  usable: XNe,
  usageRecord: UNe,
  verification: KNe,
  verificationCode: QNe
}, Symbol.toStringTag, { value: "Module" })), tDe = "全部", nDe = "实付金额", sDe = "未获取到订单信息", eKe = {
  all: tDe,
  payMoney: nDe,
  emptyTips: sDe
}, oKe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: tDe,
  default: eKe,
  emptyTips: sDe,
  payMoney: nDe
}, Symbol.toStringTag, { value: "Module" })), rDe = "预约技师", aDe = "预约时间", cDe = "预约信息", iDe = "订单编号", lDe = "创建时间", dDe = "联系电话", uDe = "共计", pDe = "个商品", mDe = "取消预约", _De = "立即支付", gDe = "买家留言", hDe = "预约状态", tKe = {
  reservedTechnician: rDe,
  reservedTime: aDe,
  reservedInfo: cDe,
  orderNo: iDe,
  createTime: lDe,
  mobile: dDe,
  sumTo: uDe,
  goodsNum: pDe,
  cancelReserved: mDe,
  pay: _De,
  remark: gDe,
  reserveStateName: hDe
}, nKe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelReserved: mDe,
  createTime: lDe,
  default: tKe,
  goodsNum: pDe,
  mobile: dDe,
  orderNo: iDe,
  pay: _De,
  remark: gDe,
  reserveStateName: hDe,
  reservedInfo: cDe,
  reservedTechnician: rDe,
  reservedTime: aDe,
  sumTo: uDe
}, Symbol.toStringTag, { value: "Module" })), fDe = "购买须知", yDe = "暂无购买须知", $De = "卡项详情", vDe = "暂无卡项详情", bDe = "立即购买", TDe = "立即预约", PDe = "首页", SDe = "客服", ODe = "收藏", sKe = {
  purchaseNotes: fDe,
  noPurchaseNotes: yDe,
  cardDetail: $De,
  noCardDetail: vDe,
  buy: bDe,
  reserve: TDe,
  index: PDe,
  service: SDe,
  collect: ODe
}, rKe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: bDe,
  cardDetail: $De,
  collect: ODe,
  default: sKe,
  index: PDe,
  noCardDetail: vDe,
  noPurchaseNotes: yDe,
  purchaseNotes: fDe,
  reserve: TDe,
  service: SDe
}, Symbol.toStringTag, { value: "Module" })), wDe = "请输入搜索关键词", jDe = "抢购", aKe = {
  searchNamePlaceholder: wDe,
  reserveBtn: jDe
}, cKe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: aKe,
  reserveBtn: jDe,
  searchNamePlaceholder: wDe
}, Symbol.toStringTag, { value: "Module" })), kDe = "选择技师", CDe = "请选择", MDe = "预约时间", ADe = "买家留言", IDe = "请填写留言信息", NDe = "立即购买", DDe = "立即预约", zDe = "首页", xDe = "手机号", EDe = "请输入手机号", RDe = "请输入正确的手机号", FDe = "客服", HDe = "收藏", iKe = {
  selectTechnician: kDe,
  pleaseChoose: CDe,
  reserveTime: MDe,
  remark: ADe,
  fillRemark: IDe,
  buy: NDe,
  reserve: DDe,
  index: zDe,
  mobile: xDe,
  mobilePlaceholder: EDe,
  correctMobilePlaceholder: RDe,
  service: FDe,
  collect: HDe
}, lKe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buy: NDe,
  collect: HDe,
  correctMobilePlaceholder: RDe,
  default: iKe,
  fillRemark: IDe,
  index: zDe,
  mobile: xDe,
  mobilePlaceholder: EDe,
  pleaseChoose: CDe,
  remark: ADe,
  reserve: DDe,
  reserveTime: MDe,
  selectTechnician: kDe,
  service: FDe
}, Symbol.toStringTag, { value: "Module" })), LDe = "核销时间", BDe = "核销码", UDe = "核销次数", dKe = {
  createTime: LDe,
  verifyCode: BDe,
  verifyNum: UDe
}, uKe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: LDe,
  default: dKe,
  verifyCode: BDe,
  verifyNum: UDe
}, Symbol.toStringTag, { value: "Module" })), WDe = "不是核销员", qDe = "核销券码", GDe = "确认核销", VDe = "请输入核销码", YDe = "核销记录", KDe = "查询", QDe = "未查询到核销码信息", XDe = "已核销", JDe = "待核销", ZDe = "核销其他", eze = "创建时间", oze = "核销时间", tze = "有效期", nze = "长期有效", sze = "可用次数", rze = "核销数量", aze = "不限制次数", cze = "已核销次数", pKe = {
  notIsVerifier: WDe,
  verifyTitle: qDe,
  confirmVerify: GDe,
  inputPlaceholder: VDe,
  verifyRecord: YDe,
  search: KDe,
  notSearchResult: QDe,
  used: XDe,
  waitUse: JDe,
  verifyOther: ZDe,
  createTime: eze,
  verifyTime: oze,
  expireTime: tze,
  longTerm: nze,
  availableNum: sze,
  verifyNum: rze,
  noLimitNum: aze,
  useNum: cze
}, mKe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  availableNum: sze,
  confirmVerify: GDe,
  createTime: eze,
  default: pKe,
  expireTime: tze,
  inputPlaceholder: VDe,
  longTerm: nze,
  noLimitNum: aze,
  notIsVerifier: WDe,
  notSearchResult: QDe,
  search: KDe,
  useNum: cze,
  used: XDe,
  verifyNum: rze,
  verifyOther: ZDe,
  verifyRecord: YDe,
  verifyTime: oze,
  verifyTitle: qDe,
  waitUse: JDe
}, Symbol.toStringTag, { value: "Module" })), ize = "核销时间", lze = "核销码", dze = "核销次数", _Ke = {
  createTime: ize,
  verifyCode: lze,
  verifyNum: dze
}, gKe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTime: ize,
  default: _Ke,
  verifyCode: lze,
  verifyNum: dze
}, Symbol.toStringTag, { value: "Module" }));
export {
  qe as default,
  Yn as ensureDiyDecorateBridge,
  Vn as isDecoratePreviewUrl,
  bKe as isInAdminIframe,
  N3e as notifyAdminDecorateReady,
  rn as resolveDecorateMode,
  TKe as useDiy,
  PKe as useDiyGroup,
  qe as useDiyStore
};
