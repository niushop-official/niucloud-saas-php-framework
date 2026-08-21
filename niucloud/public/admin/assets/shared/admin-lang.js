var F = Object.defineProperty;
var H = (t, o, e) => o in t ? F(t, o, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[o] = e;
var x = (t, o, e) => (H(t, typeof o != "symbol" ? o + "" : o, e), e);
import { createI18n as V } from "vue-i18n";
import { nextTick as C, getCurrentInstance as K } from "vue";
import { defineStore as Q } from "pinia";
import { useRoute as G } from "vue-router";
const X = (t, o) => {
  const e = t[o];
  return e ? typeof e == "function" ? e() : Promise.resolve(e) : new Promise((s, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + o)));
  });
};
let z = {}, k = [], L = !1, D = null;
const _ = {}, Y = () => globalThis.__addonInitPromise__ ?? null, J = (t) => {
  D = t, globalThis.__addonInitPromise__ = t;
}, P = "/admin";
function S(t) {
  return !t || t.startsWith("http") || t.startsWith("/admin/") ? t : t.startsWith("/assets/") ? `${P}${t}` : t.startsWith("./") ? `${P}/assets/addons/${t.slice(2)}` : `${P}/${t.replace(/^\//, "")}`;
}
function Z(t, ...o) {
  const e = ["assets", "addons", t, ...o].join("/").replace(/\/+/g, "/");
  return `${P}/${e}`;
}
function O(t, o) {
  if (o === "/")
    return "index";
  let e = o.replace(/^(\/admin\/|\/site\/|\/)/, "").replace(/\.vue$/, "");
  return e.startsWith("views/") && (e = e.slice(6)), t && e === t && (e = "index"), e.replaceAll("/", ".");
}
function ee(t) {
  if (t.meta.addon)
    return String(t.meta.addon);
  for (let o = t.matched.length - 1; o >= 0; o--) {
    const e = t.matched[o].meta.addon;
    if (e)
      return String(e);
  }
  return "";
}
function ne(t) {
  if (t.meta.view)
    return String(t.meta.view);
  for (let o = t.matched.length - 1; o >= 0; o--) {
    const e = t.matched[o].meta.view;
    if (e)
      return String(e);
  }
  return t.path;
}
function A(t) {
  if (!t || typeof t != "object")
    return {};
  const o = t;
  if (o.default && typeof o.default == "object")
    return A(o.default);
  const e = {};
  for (const [s, i] of Object.entries(o))
    s === "default" || s === "__esModule" || typeof i == "string" && (e[s] = i);
  return Object.keys(e).length ? e : o;
}
function te(t, o) {
  const e = {};
  for (const [s, i] of Object.entries(o))
    typeof i == "string" && (e[`${t}.${s}`] = i, t === "common" && (e[s] = i));
  return e;
}
function R(t, o) {
  const s = t.replace(/^(\/admin\/|\/site\/|\/)/, "").split("/").filter(Boolean)[0];
  return s && (o != null && o.length ? o : q()).includes(s) ? s : "";
}
async function oe(t) {
  try {
    const o = await fetch(S(`/assets/addons/${t}/index.js`), { method: "HEAD" });
    return o.ok ? !(o.headers.get("content-type") || "").toLowerCase().includes("text/html") : !1;
  } catch {
    return !1;
  }
}
async function B(t) {
  return t in _ || (_[t] = (async () => {
    try {
      return await import(S(`/assets/addons/${t}/index.js?_t=${Date.now()}`));
    } catch {
      return null;
    }
  })()), _[t];
}
async function W(t) {
  const o = Y();
  return o || (J((async () => {
    z = {}, k = [];
    let e = t;
    if (!(e != null && e.length))
      try {
        const i = S(`/assets/addons/index.json?_t=${Date.now()}`), c = await fetch(i);
        if (c.ok) {
          const l = await c.json();
          e = Array.isArray(l.keys) ? l.keys : [];
          const d = l.manifests;
          if (d)
            for (const [u, v] of Object.entries(d))
              z[u] = v;
        }
      } catch {
        e = [];
      }
    const s = [];
    for (const i of e || []) {
      if (z[i]) {
        s.push(i);
        continue;
      }
      if (await oe(i)) {
        s.push(i);
        try {
          const c = S(`/assets/addons/${i}/manifest.json?_t=${Date.now()}`), l = await fetch(c);
          l.ok && (z[i] = await l.json());
        } catch {
        }
      }
    }
    k = s, L = !0;
  })()), D);
}
function q() {
  return k.length ? k : Object.keys(z);
}
async function se(t) {
  L || await W();
  for (const o of q())
    try {
      const e = await B(o);
      if (!e)
        continue;
      const s = e.langs;
      if (!s)
        continue;
      for (const [i, c] of Object.entries(s)) {
        const l = {};
        for (const [d, u] of Object.entries(c || {}))
          Object.assign(l, te(d, A(u)));
        Object.keys(l).length && t(i, l);
      }
    } catch {
    }
}
async function M(t, o, e) {
  var i;
  L || await W();
  try {
    const c = await B(t);
    if (c) {
      const l = c.langs, d = (i = l == null ? void 0 : l[o]) == null ? void 0 : i[e], u = A(d);
      if (Object.keys(u).length)
        return u;
    }
  } catch {
  }
  const s = Z(t, "lang", o, `${e}.json`);
  try {
    const c = await fetch(s);
    if (c.ok)
      return await c.json();
  } catch {
  }
  return {};
}
class ae {
  //已加载的语言
  constructor(o) {
    x(this, "i18n");
    x(this, "loadLocale", []);
    this.i18n = o;
  }
  /**
   *
   * @param locale 设置语言
   */
  setI18nLanguage(o) {
    this.i18n.mode === "legacy" ? this.i18n.global.locale = o : this.i18n.global.locale = o;
    let e = document.querySelector("html");
    e && e.setAttribute("lang", o);
  }
  /**
   * 加载语言包
   * @param app
   * @param path
   * @param locale
   * @returns
   */
  async loadLocaleMessages(o, e, s) {
    try {
      o || (o = R(e));
      const i = O(o, e);
      let c = {};
      o ? c = await M(o, s, i) : c = (await X(/* @__PURE__ */ Object.assign({ "../app/lang/en/403.json": () => import("./403-4bc122af.js"), "../app/lang/en/auth.menu.json": () => import("./auth.menu-f5062c22.js"), "../app/lang/en/index.json": () => import("./index-c33bb386.js"), "../app/lang/en/login.json": () => import("./login-8bac8312.js"), "../app/lang/en/member.member.json": () => import("./member.member-64cd29d1.js"), "../app/lang/en/user.center.json": () => import("./user.center-78470141.js"), "../app/lang/zh-cn/403.json": () => import("./403-afb5f475.js"), "../app/lang/zh-cn/app.authorize.json": () => import("./app.authorize-7701e564.js"), "../app/lang/zh-cn/app.index.json": () => import("./app.index-ffd57c14.js"), "../app/lang/zh-cn/app.store.json": () => import("./app.store-82fccf8d.js"), "../app/lang/zh-cn/app.upgrade.json": () => import("./app.upgrade-a5fc793d.js"), "../app/lang/zh-cn/auth.log.json": () => import("./auth.log-7ab49365.js"), "../app/lang/zh-cn/auth.menu.json": () => import("./auth.menu-11f8c5be.js"), "../app/lang/zh-cn/auth.role.json": () => import("./auth.role-c93ddff5.js"), "../app/lang/zh-cn/auth.site_menu.json": () => import("./auth.site_menu-8547ef11.js"), "../app/lang/zh-cn/auth.user.json": () => import("./auth.user-4b72de7c.js"), "../app/lang/zh-cn/channel.aliapp.access.json": () => import("./channel.aliapp.access-345ff291.js"), "../app/lang/zh-cn/channel.aliapp.config.json": () => import("./channel.aliapp.config-8ba784b4.js"), "../app/lang/zh-cn/channel.aliapp.course.json": () => import("./channel.aliapp.course-11a03e9a.js"), "../app/lang/zh-cn/channel.app.access.json": () => import("./channel.app.access-4967216b.js"), "../app/lang/zh-cn/channel.app.config.json": () => import("./channel.app.config-f92838ee.js"), "../app/lang/zh-cn/channel.app.version.json": () => import("./channel.app.version-801d7c33.js"), "../app/lang/zh-cn/channel.h5.config.json": () => import("./channel.h5.config-bb100e55.js"), "../app/lang/zh-cn/channel.pc.config.json": () => import("./channel.pc.config-bbe7313f.js"), "../app/lang/zh-cn/channel.weapp.access.json": () => import("./channel.weapp.access-f5b56b8d.js"), "../app/lang/zh-cn/channel.weapp.code.json": () => import("./channel.weapp.code-c33c37da.js"), "../app/lang/zh-cn/channel.weapp.config.json": () => import("./channel.weapp.config-62316f27.js"), "../app/lang/zh-cn/channel.weapp.course.json": () => import("./channel.weapp.course-46cdef05.js"), "../app/lang/zh-cn/channel.weapp.template.json": () => import("./channel.weapp.template-60f607e4.js"), "../app/lang/zh-cn/channel.wechat.access.json": () => import("./channel.wechat.access-3198d859.js"), "../app/lang/zh-cn/channel.wechat.config.json": () => import("./channel.wechat.config-149fe86d.js"), "../app/lang/zh-cn/channel.wechat.course.json": () => import("./channel.wechat.course-717abfc8.js"), "../app/lang/zh-cn/channel.wechat.keyword_reply_edit.json": () => import("./channel.wechat.keyword_reply_edit-736dea19.js"), "../app/lang/zh-cn/channel.wechat.menu.json": () => import("./channel.wechat.menu-08c01b06.js"), "../app/lang/zh-cn/channel.wechat.reply.json": () => import("./channel.wechat.reply-371557b9.js"), "../app/lang/zh-cn/channel.wechat.template.json": () => import("./channel.wechat.template-c7e0e856.js"), "../app/lang/zh-cn/decorate.preview.json": () => import("./decorate.preview-5f2765ef.js"), "../app/lang/zh-cn/dict.list.json": () => import("./dict.list-fdd911c6.js"), "../app/lang/zh-cn/diy.edit.json": () => import("./diy.edit-f5d8c6b1.js"), "../app/lang/zh-cn/diy.index.json": () => import("./diy.index-7d6c7cb2.js"), "../app/lang/zh-cn/diy.list.json": () => import("./diy.list-fb8d7f12.js"), "../app/lang/zh-cn/diy.member.json": () => import("./diy.member-7204bf61.js"), "../app/lang/zh-cn/diy.preview.json": () => import("./diy.preview-f8b42901.js"), "../app/lang/zh-cn/diy.route.json": () => import("./diy.route-51d664e7.js"), "../app/lang/zh-cn/diy.tabbar.json": () => import("./diy.tabbar-5a78137b.js"), "../app/lang/zh-cn/diy.tabbar_edit.json": () => import("./diy.tabbar_edit-1b67bdec.js"), "../app/lang/zh-cn/diy_form.edit.json": () => import("./diy_form.edit-5e849551.js"), "../app/lang/zh-cn/diy_form.list.json": () => import("./diy_form.list-8cc96e72.js"), "../app/lang/zh-cn/finance.account.json": () => import("./finance.account-3ebadbbb.js"), "../app/lang/zh-cn/finance.cash_out.json": () => import("./finance.cash_out-a5fc92d4.js"), "../app/lang/zh-cn/finance.offlinepay.json": () => import("./finance.offlinepay-5e4097af.js"), "../app/lang/zh-cn/finance.pay_detail.json": () => import("./finance.pay_detail-03e8534d.js"), "../app/lang/zh-cn/finance.pay_refund.json": () => import("./finance.pay_refund-33befe92.js"), "../app/lang/zh-cn/finance.refund_detail.json": () => import("./finance.refund_detail-4952f106.js"), "../app/lang/zh-cn/index.app_manage.json": () => import("./index.app_manage-8bfaebc1.js"), "../app/lang/zh-cn/index.index.json": () => import("./index.index-1daecdce.js"), "../app/lang/zh-cn/index.preview.json": () => import("./index.preview-969e67dd.js"), "../app/lang/zh-cn/index.store.json": () => import("./index.store-e2f6d3f6.js"), "../app/lang/zh-cn/login.json": () => import("./login-00d7722b.js"), "../app/lang/zh-cn/marketing.sign_config.json": () => import("./marketing.sign_config-62bde278.js"), "../app/lang/zh-cn/marketing.sign_list.json": () => import("./marketing.sign_list-2d527eb9.js"), "../app/lang/zh-cn/marketing.verifier.json": () => import("./marketing.verifier-fb68001b.js"), "../app/lang/zh-cn/marketing.verify.json": () => import("./marketing.verify-a01b4161.js"), "../app/lang/zh-cn/member.balance.json": () => import("./member.balance-7b831fb2.js"), "../app/lang/zh-cn/member.commission.json": () => import("./member.commission-6f09b642.js"), "../app/lang/zh-cn/member.growth.json": () => import("./member.growth-b8b132a4.js"), "../app/lang/zh-cn/member.label.edit.json": () => import("./member.label.edit-32f3c791.js"), "../app/lang/zh-cn/member.label.json": () => import("./member.label-d042fc75.js"), "../app/lang/zh-cn/member.level.json": () => import("./member.level-9883e926.js"), "../app/lang/zh-cn/member.level_edit.json": () => import("./member.level_edit-63ebdbf3.js"), "../app/lang/zh-cn/member.member.json": () => import("./member.member-2cc54a64.js"), "../app/lang/zh-cn/member.member_detail.json": () => import("./member.member_detail-49ebc798.js"), "../app/lang/zh-cn/member.point.json": () => import("./member.point-b9f9143f.js"), "../app/lang/zh-cn/poster.edit.json": () => import("./poster.edit-c0d45927.js"), "../app/lang/zh-cn/poster.list.json": () => import("./poster.list-6a917fd4.js"), "../app/lang/zh-cn/printer.edit.json": () => import("./printer.edit-03e2be08.js"), "../app/lang/zh-cn/printer.list.json": () => import("./printer.list-1cf7202e.js"), "../app/lang/zh-cn/printer.template_edit.json": () => import("./printer.template_edit-3092b283.js"), "../app/lang/zh-cn/printer.template_list.json": () => import("./printer.template_list-679ce0fb.js"), "../app/lang/zh-cn/setting.adminlogin.json": () => import("./setting.adminlogin-763acc1d.js"), "../app/lang/zh-cn/setting.agreement.json": () => import("./setting.agreement-ef53ab4e.js"), "../app/lang/zh-cn/setting.agreement_edit.json": () => import("./setting.agreement_edit-42ca6920.js"), "../app/lang/zh-cn/setting.cash_out.json": () => import("./setting.cash_out-b3a40561.js"), "../app/lang/zh-cn/setting.copyright.json": () => import("./setting.copyright-703776c8.js"), "../app/lang/zh-cn/setting.developer_token.json": () => import("./setting.developer_token-df8cac95.js"), "../app/lang/zh-cn/setting.export.json": () => import("./setting.export-6bcb66d7.js"), "../app/lang/zh-cn/setting.growth_rule.json": () => import("./setting.growth_rule-4682f358.js"), "../app/lang/zh-cn/setting.layout.json": () => import("./setting.layout-2d2ef354.js"), "../app/lang/zh-cn/setting.login.json": () => import("./setting.login-0e20a204.js"), "../app/lang/zh-cn/setting.map.json": () => import("./setting.map-a018c17d.js"), "../app/lang/zh-cn/setting.member.json": () => import("./setting.member-3c18afe5.js"), "../app/lang/zh-cn/setting.notice.json": () => import("./setting.notice-b12781da.js"), "../app/lang/zh-cn/setting.notice_records.json": () => import("./setting.notice_records-8b5d12a2.js"), "../app/lang/zh-cn/setting.oplatform.json": () => import("./setting.oplatform-ceddec97.js"), "../app/lang/zh-cn/setting.pay.json": () => import("./setting.pay-9d3502d5.js"), "../app/lang/zh-cn/setting.sms.json": () => import("./setting.sms-38c6ea20.js"), "../app/lang/zh-cn/setting.sms_records.json": () => import("./setting.sms_records-f32dcf96.js"), "../app/lang/zh-cn/setting.storage.json": () => import("./setting.storage-33557c9e.js"), "../app/lang/zh-cn/setting.system.json": () => import("./setting.system-533a107a.js"), "../app/lang/zh-cn/setting.transfer.json": () => import("./setting.transfer-dd7288e1.js"), "../app/lang/zh-cn/setting.transfer_scene.json": () => import("./setting.transfer_scene-a1236971.js"), "../app/lang/zh-cn/setting.weapp.json": () => import("./setting.weapp-38d65415.js"), "../app/lang/zh-cn/site.group.json": () => import("./site.group-79d11eb3.js"), "../app/lang/zh-cn/site.group_edit.json": () => import("./site.group_edit-ad4054d9.js"), "../app/lang/zh-cn/site.info.json": () => import("./site.info-3cdf0707.js"), "../app/lang/zh-cn/site.list.json": () => import("./site.list-f879a4a9.js"), "../app/lang/zh-cn/site.manage.json": () => import("./site.manage-d384cce7.js"), "../app/lang/zh-cn/site.user.json": () => import("./site.user-298548ec.js"), "../app/lang/zh-cn/site.user_info.json": () => import("./site.user_info-8949966a.js"), "../app/lang/zh-cn/tools.addon.edit.json": () => import("./tools.addon.edit-67fed17b.js"), "../app/lang/zh-cn/tools.addon.index.json": () => import("./tools.addon.index-64a332f0.js"), "../app/lang/zh-cn/tools.addon.list.json": () => import("./tools.addon.list-066ffe3b.js"), "../app/lang/zh-cn/tools.backup_records.json": () => import("./tools.backup_records-3ee06c5e.js"), "../app/lang/zh-cn/tools.code.edit.json": () => import("./tools.code.edit-ce482f8a.js"), "../app/lang/zh-cn/tools.code.index.json": () => import("./tools.code.index-2f01b5e9.js"), "../app/lang/zh-cn/tools.code.list.json": () => import("./tools.code.list-b3d1ec18.js"), "../app/lang/zh-cn/tools.detection.json": () => import("./tools.detection-2d1c5fc5.js"), "../app/lang/zh-cn/tools.schedule.json": () => import("./tools.schedule-3013f2ba.js"), "../app/lang/zh-cn/tools.schedule_log.json": () => import("./tools.schedule_log-c332642a.js"), "../app/lang/zh-cn/tools.updatecache.json": () => import("./tools.updatecache-c28011ba.js"), "../app/lang/zh-cn/tools.upgrade_records.json": () => import("./tools.upgrade_records-948f5c6a.js"), "../app/lang/zh-cn/user.center.json": () => import("./user.center-f848e53b.js"), "../app/lang/zh-cn/user.edit_center.json": () => import("./user.edit_center-86828913.js"), "../app/lang/zh-cn/wxoplatform.setting.json": () => import("./wxoplatform.setting-e351af9d.js"), "../app/lang/zh-cn/wxoplatform.weapp_version.json": () => import("./wxoplatform.weapp_version-cb21e15c.js") }), `../app/lang/${s}/${i}.json`)).default || {};
      let l = {};
      if (Object.keys(c).forEach((d) => {
        l[`${i}.${d}`] = c[d];
      }), o)
        try {
          let d = {};
          d = await M(o, s, "common"), Object.keys(d).forEach((u) => {
            l[u] = d[u];
          });
        } catch {
        }
      return this.i18n.global.mergeLocaleMessage(s, l), this.setI18nLanguage(s), C();
    } catch {
      return this.setI18nLanguage(s), C();
    }
  }
  /** 生产环境启动时预加载各插件全部语言包 */
  async preloadAddonLangs() {
    await se((o, e) => {
      this.i18n.global.mergeLocaleMessage(o, e);
    });
  }
}
const re = "编辑", ie = "详情", ce = "创建时间", pe = "排序", le = "状态", de = "操作", me = "更多", ue = "正常", ge = "停用", he = "启用", fe = "确认", ye = "保存", je = "返回", we = "取消", ze = "搜索", be = "重置", ve = "刷新", Pe = "刷新成功", ke = "选择", Se = "确定要导出数据吗？", Te = "批量导出数据", xe = "确定并导出", _e = "提示", Ce = "是否显示", Ne = "显示", Le = "隐藏", Ae = "图标", Ee = "用户名", $e = "头像", Ie = "账号", Me = "账号设置", Ue = "名称", De = "请输入用户名称", Oe = "密码", Re = "确认密码", Be = "图片", We = "视频", qe = "重命名", Fe = "查看", He = "全选", Ve = "是", Ke = "否", Qe = "复制", Ge = "完成", Xe = "复制成功", Ye = "浏览器不支持一键复制，请手动进行复制", Je = "全部", Ze = "请选择省", en = "请选择市", nn = "请选择区/县", tn = "暂无数据", on = "暂无二维码", sn = "无法显示", an = {
  root: "上传",
  selectimage: "选择图片",
  selectvideo: "选择视频",
  selecticon: "选择图标",
  selectnews: "选择图文",
  uploadimage: "上传图片",
  uploadvideo: "上传视频",
  addAttachmentCategory: "添加分组",
  attachmentCategoryPlaceholder: "请输入分组名称",
  attachmentEmpty: "暂无附件，请点击上传按钮上传",
  iconEmpty: "暂无图标",
  deleteCategoryTips: "确定要删除该分组吗？",
  deleteAttachmentTips: "确定要删除所选附件吗？如所选附件已被使用删除将会受到影响，请谨慎操作！",
  move: "移动",
  moveCategory: "移动分组",
  moveTo: "移动至",
  placeholderimageName: "请输入图片名称",
  placeholdervideoName: "请输入视频名称",
  placeholdericonName: "请输入图标名称",
  success: "上传成功",
  triggerUpperLimit: "可选数量已达上限",
  mediaEmpty: "暂无素材，请点击上传按钮上传"
}, rn = {
  closeLeft: "关闭左侧",
  closeRight: "关闭右侧",
  closeOther: "关闭其他"
}, cn = {
  layoutSetting: "主题设置",
  darkMode: "黑暗模式",
  sidebarMode: "主题风格",
  themeColor: "主题颜色",
  detectionLoginOperation: "确定",
  detectionLoginContent: "已检测到有其他账号登录，需要刷新后才能继续操作。",
  detectionLoginTip: "提示",
  layoutStyle: "布局风格",
  tab: "开启标签栏"
}, pn = {
  400: "错误的请求",
  401: "请重新登录",
  403: "拒绝访问",
  404: "请求错误",
  405: "请求方法未允许",
  408: "请求超时",
  409: "请求跨域",
  500: "服务器内部错误",
  501: "网络未实现",
  502: "网络错误",
  503: "服务不可用",
  504: "网络超时",
  505: "http版本不支持该请求",
  unknownError: "未知错误",
  timeout: "网络请求超时！",
  requestError: "请求错误",
  errNetwork: "网络请求错误",
  baseUrlError: " 接口请求错误,请检查VITE_APP_BASE_URL参数配置或者伪静态配置, <a style='text-decoration: underline;' href='https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/interfaceRequestError.html' target='blank'>点击查看相关手册</a>"
}, ln = "请选择跳转链接", dn = "链接选择", mn = "链接名称", un = "请输入链接名称", gn = "链接名称不能为空", hn = "跳转路径", fn = "请输入跳转路径", yn = "跳转路径不能为空", jn = "小程序AppID", wn = "请输入要打开的小程序的appid", zn = "小程序AppID不能为空", bn = "小程序路径", vn = "请输入要打开的小程序路径", Pn = "小程序路径不能为空", kn = "电话号码", Sn = "请输入电话号码", Tn = "电话号码不能为空", xn = "返回", _n = "预览", Cn = "暂未安装任何应用", Nn = "最新消息", Ln = "访问店铺", An = "地图设置", En = "腾讯地图KEY", $n = "首页模版", In = "切换首页", Mn = "你确定要切换首页吗？", Un = "原始密码", Dn = "新密码", On = "确认密码", Rn = "修改密码时必填.不修改密码时留空", Bn = "请输入原始密码", Wn = "请输入新密码", qn = "原始密码不能为空", Fn = "请输入确认密码", Hn = "两次新密码不同", Vn = "两次新密码不同", Kn = {
  upgradeButton: "立即升级",
  title: "升级",
  upgradingTips: "有正在执行的升级任务，",
  clickView: "点击查看",
  dirPermission: "目录读写权限",
  path: "路径",
  demand: "要求",
  readable: "可读",
  write: "可写",
  upgradeSuccess: "升级成功",
  localBuild: "本地编译",
  cloudBuild: "重试",
  rollback: "回滚",
  showDialogCloseTips: "升级任务尚未完成，关闭将取消升级，是否要继续关闭？",
  upgradeCompleteTips: "升级完成后还必须要重新编译admin wap web端，以免影响到程序正常运行。",
  upgradeTips: "应用和插件升级时，系统会自动备份当前程序及数据库。升级功能不会造成您当前程序的损坏或者数据的丢失，请放心使用，但是升级过程可能会因为兼容性等各种原因出现意外的升级错误，当出现错误时，系统将会自动回退上一版本！若回退失败，请参考链接<a href='https://www.kancloud.cn/niushop/niushop_v6/3228611' target='_blank' class='text-primary'> https://www.kancloud.cn/niushop/niushop_v6/3228611 </a>手动回退上一版本!",
  knownToKnow: "我已知晓，不需要再次提示",
  cloudBuildErrorTips: "一键云编译队列任务过多，请等待几分钟后重试！",
  isNeedBackup: "是否需要备份",
  isNeedBackupTips: "检测到已存在备份，此次升级是否需要备份，不需要备份在升级出现异常时将会恢复最近的一次备份。",
  isNeedBackupBtn: "查看备份记录",
  option: "选项",
  isNeedCloudbuild: "是否需要云编译",
  cloudbuildTips: "此次升级的同时是否需要进行云编译"
}, Qn = {
  title: "云编译",
  executingTips: "有正在执行的编译任务，",
  clickView: "点击查看",
  dirPermission: "目录读写权限",
  path: "路径",
  demand: "要求",
  readable: "可读",
  write: "可写",
  cloudbuildSuccess: "编译完成",
  showDialogCloseTips: "编译任务尚未完成，关闭将取消编译，是否要继续关闭？"
}, Gn = "表单名称", Xn = "请输入表单名称", Yn = "表单类型", Jn = "请选择表单类型", Zn = "全部", et = "请选择表单", nt = "应用名/版本信息", tt = "应用标识", ot = "简介", st = "类型", at = "插件管理", rt = "升级", it = "已安装", ct = "未安装", pt = "已购买", lt = "云编译", dt = "最新版本", mt = "标识指开发应用或插件的文件夹名称", ut = "更新信息", gt = "下一步", ht = "上一步", ft = "查看升级内容", yt = "检测目录权限", jt = "备份文件", wt = "开始升级", zt = "升级完成", bt = "是否要进行云编译该操作可能会影响到正在访问的客户是否要继续操作？", vt = "推广链接", Pt = "下载二维码", kt = "配置失败", St = "左侧标题", Tt = "右侧标题", xt = "左侧简介", _t = "右侧简介", Ct = "请输入简介内容", Nt = {
  edit: re,
  delete: "删除",
  info: ie,
  createTime: ce,
  sort: pe,
  status: le,
  operation: de,
  more: me,
  statusNormal: ue,
  statusDeactivate: ge,
  startUsing: he,
  confirm: fe,
  save: ye,
  back: je,
  cancel: we,
  search: ze,
  reset: be,
  refresh: ve,
  refreshSuccess: Pe,
  select: ke,
  export: "导出列表",
  exportPlaceholder: Se,
  exportTip: Te,
  exportConfirm: xe,
  warning: _e,
  isShow: Ce,
  show: Ne,
  hidden: Le,
  icon: Ae,
  userName: Ee,
  headImg: $e,
  accountNumber: Ie,
  accountSettings: Me,
  realName: Ue,
  realNamePlaceholder: De,
  password: Oe,
  confirmPassword: Re,
  image: Be,
  video: We,
  rename: qe,
  lookOver: Fe,
  selectAll: He,
  yes: Ve,
  no: Ke,
  copy: Qe,
  complete: Ge,
  copySuccess: Xe,
  notSupportCopy: Ye,
  selectPlaceholder: Je,
  provincePlaceholder: Ze,
  cityPlaceholder: en,
  districtPlaceholder: nn,
  emptyData: tn,
  emptyQrCode: on,
  fileErr: sn,
  upload: an,
  tabs: rn,
  layout: cn,
  axios: pn,
  linkPlaceholder: ln,
  selectLinkTips: dn,
  diyLinkName: mn,
  diyLinkNamePlaceholder: un,
  diyLinkNameNotEmpty: gn,
  diyLinkUrl: hn,
  diyLinkUrlPlaceholder: fn,
  diyLinkUrlNotEmpty: yn,
  diyAppletId: jn,
  diyAppletIdPlaceholder: wn,
  diyAppletIdNotEmpty: zn,
  diyAppletPage: bn,
  diyAppletPagePlaceholder: vn,
  diyAppletPageNotEmpty: Pn,
  diyMakePhone: kn,
  diyMakePhonePlaceholder: Sn,
  diyMakePhoneNotEmpty: Tn,
  returnToPreviousPage: xn,
  preview: _n,
  emptyApp: Cn,
  newInfo: Nn,
  visitWap: Ln,
  mapSetting: An,
  mapKey: En,
  indexTemplate: $n,
  indexSwitch: In,
  indexWarning: Mn,
  originalPassword: Un,
  newPassword: Dn,
  passwordCopy: On,
  passwordTip: Rn,
  originalPasswordPlaceholder: Bn,
  passwordPlaceholder: Wn,
  originalPasswordHint: qn,
  newPasswordHint: Fn,
  doubleCipherHint: Hn,
  confirmPasswordError: Vn,
  upgrade: Kn,
  cloudbuild: Qn,
  formSelectContentTitle: Gn,
  formSelectContentTitlePlaceholder: Xn,
  formSelectContentTypeName: Yn,
  formSelectContentTypeNamePlaceholder: Jn,
  formSelectContentTypeAll: Zn,
  formSelectContentTips: et,
  appName: nt,
  appIdentification: tt,
  introduction: ot,
  type: st,
  localAppText: at,
  upgrade2: rt,
  installLabel: it,
  uninstalledLabel: ct,
  buyLabel: pt,
  cloudBuild: lt,
  newVersion: dt,
  tipText: mt,
  gxx: ut,
  return: "返回",
  nextStep: gt,
  prev: ht,
  viewUpgradeContent: ft,
  testDirectoryPermissions: yt,
  backupFiles: jt,
  startUpgrade: wt,
  upgradeEnd: zt,
  cloudBuildTips: bt,
  promoteUrl: vt,
  downLoadQRCode: Pt,
  configureFailed: kt,
  lefttitle: St,
  righttitle: Tt,
  leftDesc: xt,
  rightDesc: _t,
  descPlaceholder: Ct
}, Lt = "Edit", At = "Create Time", Et = "Sort", $t = "Status", It = "Operation", Mt = "Normal", Ut = "Deactivate", Dt = "Confirm", Ot = "Cancel", Rt = "Warning", Bt = "Show or not", Wt = "show", qt = "hidden", Ft = "Icon", Ht = {
  layoutSetting: "Layout configuration",
  darkMode: "Dark mode",
  themeColor: "Theme color"
}, Vt = {
  400: "Wrong request            ",
  401: "Please login again",
  403: "Access denied",
  404: "Request error, the resource was not found",
  405: "Request method not allowed",
  408: "Request timeout",
  500: "Server side error",
  501: "Network not implemented",
  502: "Network error",
  503: "Service unavailable",
  504: "Network Timeout",
  505: "The http version does not support the request",
  unknownError: "Unknown Error",
  timeout: "Network request timeout!"
}, Kt = {
  edit: Lt,
  delete: "Delete",
  createTime: At,
  sort: Et,
  status: $t,
  operation: It,
  statusNormal: Mt,
  statusDeactivate: Ut,
  confirm: Dt,
  cancel: Ot,
  warning: Rt,
  isShow: Bt,
  show: Wt,
  hidden: qt,
  icon: Ft,
  layout: Ht,
  axios: Vt
};
let b = V({
  locale: "zh-cn",
  fallbackLocale: "zh-cn",
  datetimeFormats: {},
  numberFormats: {},
  globalInjection: !0,
  //是否全局注入
  silentTranslationWarn: !0,
  messages: {
    "zh-cn": Nt,
    en: Kt
  },
  silentFallbackWarn: !0
});
const oo = new ae(b);
var Qt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, N = {}, Gt = {
  get exports() {
    return N;
  },
  set exports(t) {
    N = t;
  }
};
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(t, o) {
  (function(e, s) {
    t.exports = s();
  })(Qt, function() {
    var e = {};
    e.version = "0.2.0";
    var s = e.settings = {
      minimum: 0.08,
      easing: "ease",
      positionUsing: "",
      speed: 200,
      trickle: !0,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: !0,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    e.configure = function(n) {
      var a, r;
      for (a in n)
        r = n[a], r !== void 0 && n.hasOwnProperty(a) && (s[a] = r);
      return this;
    }, e.status = null, e.set = function(n) {
      var a = e.isStarted();
      n = i(n, s.minimum, 1), e.status = n === 1 ? null : n;
      var r = e.render(!a), m = r.querySelector(s.barSelector), g = s.speed, y = s.easing;
      return r.offsetWidth, d(function(p) {
        s.positionUsing === "" && (s.positionUsing = e.getPositioningCSS()), u(m, l(n, g, y)), n === 1 ? (u(r, {
          transition: "none",
          opacity: 1
        }), r.offsetWidth, setTimeout(function() {
          u(r, {
            transition: "all " + g + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            e.remove(), p();
          }, g);
        }, g)) : setTimeout(p, g);
      }), this;
    }, e.isStarted = function() {
      return typeof e.status == "number";
    }, e.start = function() {
      e.status || e.set(0);
      var n = function() {
        setTimeout(function() {
          e.status && (e.trickle(), n());
        }, s.trickleSpeed);
      };
      return s.trickle && n(), this;
    }, e.done = function(n) {
      return !n && !e.status ? this : e.inc(0.3 + 0.5 * Math.random()).set(1);
    }, e.inc = function(n) {
      var a = e.status;
      return a ? (typeof n != "number" && (n = (1 - a) * i(Math.random() * a, 0.1, 0.95)), a = i(a + n, 0, 0.994), e.set(a)) : e.start();
    }, e.trickle = function() {
      return e.inc(Math.random() * s.trickleRate);
    }, function() {
      var n = 0, a = 0;
      e.promise = function(r) {
        return !r || r.state() === "resolved" ? this : (a === 0 && e.start(), n++, a++, r.always(function() {
          a--, a === 0 ? (n = 0, e.done()) : e.set((n - a) / n);
        }), this);
      };
    }(), e.render = function(n) {
      if (e.isRendered())
        return document.getElementById("nprogress");
      E(document.documentElement, "nprogress-busy");
      var a = document.createElement("div");
      a.id = "nprogress", a.innerHTML = s.template;
      var r = a.querySelector(s.barSelector), m = n ? "-100" : c(e.status || 0), g = document.querySelector(s.parent), y;
      return u(r, {
        transition: "all 0 linear",
        transform: "translate3d(" + m + "%,0,0)"
      }), s.showSpinner || (y = a.querySelector(s.spinnerSelector), y && I(y)), g != document.body && E(g, "nprogress-custom-parent"), g.appendChild(a), a;
    }, e.remove = function() {
      $(document.documentElement, "nprogress-busy"), $(document.querySelector(s.parent), "nprogress-custom-parent");
      var n = document.getElementById("nprogress");
      n && I(n);
    }, e.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, e.getPositioningCSS = function() {
      var n = document.body.style, a = "WebkitTransform" in n ? "Webkit" : "MozTransform" in n ? "Moz" : "msTransform" in n ? "ms" : "OTransform" in n ? "O" : "";
      return a + "Perspective" in n ? "translate3d" : a + "Transform" in n ? "translate" : "margin";
    };
    function i(n, a, r) {
      return n < a ? a : n > r ? r : n;
    }
    function c(n) {
      return (-1 + n) * 100;
    }
    function l(n, a, r) {
      var m;
      return s.positionUsing === "translate3d" ? m = { transform: "translate3d(" + c(n) + "%,0,0)" } : s.positionUsing === "translate" ? m = { transform: "translate(" + c(n) + "%,0)" } : m = { "margin-left": c(n) + "%" }, m.transition = "all " + a + "ms " + r, m;
    }
    var d = function() {
      var n = [];
      function a() {
        var r = n.shift();
        r && r(a);
      }
      return function(r) {
        n.push(r), n.length == 1 && a();
      };
    }(), u = function() {
      var n = ["Webkit", "O", "Moz", "ms"], a = {};
      function r(p) {
        return p.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(h, f) {
          return f.toUpperCase();
        });
      }
      function m(p) {
        var h = document.body.style;
        if (p in h)
          return p;
        for (var f = n.length, w = p.charAt(0).toUpperCase() + p.slice(1), j; f--; )
          if (j = n[f] + w, j in h)
            return j;
        return p;
      }
      function g(p) {
        return p = r(p), a[p] || (a[p] = m(p));
      }
      function y(p, h, f) {
        h = g(h), p.style[h] = f;
      }
      return function(p, h) {
        var f = arguments, w, j;
        if (f.length == 2)
          for (w in h)
            j = h[w], j !== void 0 && h.hasOwnProperty(w) && y(p, w, j);
        else
          y(p, f[1], f[2]);
      };
    }();
    function v(n, a) {
      var r = typeof n == "string" ? n : T(n);
      return r.indexOf(" " + a + " ") >= 0;
    }
    function E(n, a) {
      var r = T(n), m = r + a;
      v(r, a) || (n.className = m.substring(1));
    }
    function $(n, a) {
      var r = T(n), m;
      v(n, a) && (m = r.replace(" " + a + " ", " "), n.className = m.substring(1, m.length - 1));
    }
    function T(n) {
      return (" " + (n.className || "") + " ").replace(/\s+/gi, " ");
    }
    function I(n) {
      n && n.parentNode && n.parentNode.removeChild(n);
    }
    return e;
  });
})(Gt);
const U = N, Xt = Q("app", {
  state: () => ({
    route: {},
    routeRefreshTag: !0,
    pageReturn: !1
  }),
  actions: {
    refreshRouterView() {
      this.routeRefreshTag = !1, U.start(), C(() => {
        this.routeRefreshTag = !0, U.done();
      });
    }
  }
});
function Yt() {
  return K() ? G() : Xt().route;
}
const so = (t) => {
  const o = Yt();
  let e = ee(o);
  const s = ne(o);
  e || (e = R(s));
  const c = `${O(e, s)}.${t}`;
  return b.global.t(c) != c ? b.global.t(c) : b.global.t(t);
}, ao = {
  install(t) {
    t.use(b);
  }
};
export {
  ao as default,
  oo as language,
  so as t
};
