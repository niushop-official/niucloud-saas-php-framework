var H = Object.defineProperty;
var V = (o, n, e) => n in o ? H(o, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[n] = e;
var x = (o, n, e) => (V(o, typeof n != "symbol" ? n + "" : n, e), e);
import { createI18n as K } from "vue-i18n";
import { nextTick as N, getCurrentInstance as Q } from "vue";
import { defineStore as G } from "pinia";
import { useRoute as X } from "vue-router";
const Y = (o, n) => {
  const e = o[n];
  return e ? typeof e == "function" ? e() : Promise.resolve(e) : new Promise((s, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + n)));
  });
};
let z = {}, k = [], _ = !1, v = null;
const C = {}, P = "/admin";
function S(o) {
  return !o || o.startsWith("http") || o.startsWith("/admin/") ? o : o.startsWith("/assets/") ? `${P}${o}` : o.startsWith("./") ? `${P}/assets/addons/${o.slice(2)}` : `${P}/${o.replace(/^\//, "")}`;
}
function J(o, ...n) {
  const e = ["assets", "addons", o, ...n].join("/").replace(/\/+/g, "/");
  return `${P}/${e}`;
}
function R(o, n) {
  if (n === "/")
    return "index";
  let e = n.replace(/^(\/admin\/|\/site\/|\/)/, "").replace(/\.vue$/, "");
  return e.startsWith("views/") && (e = e.slice(6)), o && e === o && (e = "index"), e.replaceAll("/", ".");
}
function Z(o) {
  if (o.meta.addon)
    return String(o.meta.addon);
  for (let n = o.matched.length - 1; n >= 0; n--) {
    const e = o.matched[n].meta.addon;
    if (e)
      return String(e);
  }
  return "";
}
function ee(o) {
  if (o.meta.view)
    return String(o.meta.view);
  for (let n = o.matched.length - 1; n >= 0; n--) {
    const e = o.matched[n].meta.view;
    if (e)
      return String(e);
  }
  return o.path;
}
function A(o) {
  if (!o || typeof o != "object")
    return {};
  const n = o;
  if (n.default && typeof n.default == "object")
    return A(n.default);
  const e = {};
  for (const [s, i] of Object.entries(n))
    s === "default" || s === "__esModule" || typeof i == "string" && (e[s] = i);
  return Object.keys(e).length ? e : n;
}
function ne(o, n) {
  const e = {};
  for (const [s, i] of Object.entries(n))
    typeof i == "string" && (e[`${o}.${s}`] = i, o === "common" && (e[s] = i));
  return e;
}
function B(o, n) {
  const s = o.replace(/^(\/admin\/|\/site\/|\/)/, "").split("/").filter(Boolean)[0];
  return s && (n != null && n.length ? n : F()).includes(s) ? s : "";
}
async function U(o) {
  try {
    const n = await fetch(S(`/assets/addons/${o}/index.js`), { method: "HEAD" });
    return n.ok ? !(n.headers.get("content-type") || "").toLowerCase().includes("text/html") : !1;
  } catch {
    return !1;
  }
}
async function W(o) {
  return o in C || (C[o] = (async () => {
    try {
      return await import(S(`/assets/addons/${o}/index.js?_t=${Date.now()}`));
    } catch {
      return null;
    }
  })()), C[o];
}
async function q(o) {
  return v || (v = (async () => {
    z = {}, k = [];
    let n = o;
    if (!(n != null && n.length))
      try {
        const s = S(`/assets/addons/index.json?_t=${Date.now()}`), i = await fetch(s);
        if (i.ok) {
          const c = await i.json();
          n = Array.isArray(c.keys) ? c.keys : [];
          const d = c.manifests;
          if (d)
            for (const [m, u] of Object.entries(d))
              z[m] = u;
        }
      } catch {
        n = [];
      }
    const e = [];
    for (const s of n || []) {
      if (z[s]) {
        await U(s) ? e.push(s) : delete z[s];
        continue;
      }
      if (await U(s)) {
        e.push(s);
        try {
          const i = S(`/assets/addons/${s}/manifest.json?_t=${Date.now()}`), c = await fetch(i);
          c.ok && (z[s] = await c.json());
        } catch {
        }
      }
    }
    k = e, _ = !0;
  })(), v);
}
function F() {
  return k.length ? k : Object.keys(z);
}
async function te(o) {
  _ || await q();
  for (const n of F())
    try {
      const e = await W(n);
      if (!e)
        continue;
      const s = e.langs;
      if (!s)
        continue;
      for (const [i, c] of Object.entries(s)) {
        const d = {};
        for (const [m, u] of Object.entries(c || {}))
          Object.assign(d, ne(m, A(u)));
        Object.keys(d).length && o(i, d);
      }
    } catch {
    }
}
async function D(o, n, e) {
  var i;
  _ || await q();
  try {
    const c = await W(o);
    if (c) {
      const d = c.langs, m = (i = d == null ? void 0 : d[n]) == null ? void 0 : i[e], u = A(m);
      if (Object.keys(u).length)
        return u;
    }
  } catch {
  }
  const s = J(o, "lang", n, `${e}.json`);
  try {
    const c = await fetch(s);
    if (c.ok)
      return await c.json();
  } catch {
  }
  return {};
}
class oe {
  //已加载的语言
  constructor(n) {
    x(this, "i18n");
    x(this, "loadLocale", []);
    this.i18n = n;
  }
  /**
   *
   * @param locale 设置语言
   */
  setI18nLanguage(n) {
    this.i18n.mode === "legacy" ? this.i18n.global.locale = n : this.i18n.global.locale = n;
    let e = document.querySelector("html");
    e && e.setAttribute("lang", n);
  }
  /**
   * 加载语言包
   * @param app
   * @param path
   * @param locale
   * @returns
   */
  async loadLocaleMessages(n, e, s) {
    try {
      n || (n = B(e));
      const i = R(n, e);
      let c = {};
      n ? c = await D(n, s, i) : c = (await Y(/* @__PURE__ */ Object.assign({ "../app/lang/en/403.json": () => import("./403-4bc122af.js"), "../app/lang/en/auth.menu.json": () => import("./auth.menu-f5062c22.js"), "../app/lang/en/index.json": () => import("./index-c33bb386.js"), "../app/lang/en/login.json": () => import("./login-8bac8312.js"), "../app/lang/en/member.member.json": () => import("./member.member-64cd29d1.js"), "../app/lang/en/user.center.json": () => import("./user.center-78470141.js"), "../app/lang/zh-cn/403.json": () => import("./403-afb5f475.js"), "../app/lang/zh-cn/app.authorize.json": () => import("./app.authorize-7701e564.js"), "../app/lang/zh-cn/app.index.json": () => import("./app.index-ffd57c14.js"), "../app/lang/zh-cn/app.store.json": () => import("./app.store-82fccf8d.js"), "../app/lang/zh-cn/app.upgrade.json": () => import("./app.upgrade-a5fc793d.js"), "../app/lang/zh-cn/auth.log.json": () => import("./auth.log-7ab49365.js"), "../app/lang/zh-cn/auth.menu.json": () => import("./auth.menu-11f8c5be.js"), "../app/lang/zh-cn/auth.role.json": () => import("./auth.role-c93ddff5.js"), "../app/lang/zh-cn/auth.site_menu.json": () => import("./auth.site_menu-8547ef11.js"), "../app/lang/zh-cn/auth.user.json": () => import("./auth.user-4b72de7c.js"), "../app/lang/zh-cn/channel.aliapp.access.json": () => import("./channel.aliapp.access-345ff291.js"), "../app/lang/zh-cn/channel.aliapp.config.json": () => import("./channel.aliapp.config-8ba784b4.js"), "../app/lang/zh-cn/channel.aliapp.course.json": () => import("./channel.aliapp.course-11a03e9a.js"), "../app/lang/zh-cn/channel.app.access.json": () => import("./channel.app.access-4967216b.js"), "../app/lang/zh-cn/channel.app.config.json": () => import("./channel.app.config-f92838ee.js"), "../app/lang/zh-cn/channel.app.version.json": () => import("./channel.app.version-801d7c33.js"), "../app/lang/zh-cn/channel.h5.config.json": () => import("./channel.h5.config-bb100e55.js"), "../app/lang/zh-cn/channel.pc.config.json": () => import("./channel.pc.config-bbe7313f.js"), "../app/lang/zh-cn/channel.weapp.access.json": () => import("./channel.weapp.access-f5b56b8d.js"), "../app/lang/zh-cn/channel.weapp.code.json": () => import("./channel.weapp.code-e03abbd0.js"), "../app/lang/zh-cn/channel.weapp.config.json": () => import("./channel.weapp.config-62316f27.js"), "../app/lang/zh-cn/channel.weapp.course.json": () => import("./channel.weapp.course-46cdef05.js"), "../app/lang/zh-cn/channel.weapp.template.json": () => import("./channel.weapp.template-60f607e4.js"), "../app/lang/zh-cn/channel.wechat.access.json": () => import("./channel.wechat.access-3198d859.js"), "../app/lang/zh-cn/channel.wechat.config.json": () => import("./channel.wechat.config-149fe86d.js"), "../app/lang/zh-cn/channel.wechat.course.json": () => import("./channel.wechat.course-717abfc8.js"), "../app/lang/zh-cn/channel.wechat.keyword_reply_edit.json": () => import("./channel.wechat.keyword_reply_edit-736dea19.js"), "../app/lang/zh-cn/channel.wechat.menu.json": () => import("./channel.wechat.menu-08c01b06.js"), "../app/lang/zh-cn/channel.wechat.reply.json": () => import("./channel.wechat.reply-371557b9.js"), "../app/lang/zh-cn/channel.wechat.template.json": () => import("./channel.wechat.template-c7e0e856.js"), "../app/lang/zh-cn/decorate.preview.json": () => import("./decorate.preview-5f2765ef.js"), "../app/lang/zh-cn/dict.list.json": () => import("./dict.list-fdd911c6.js"), "../app/lang/zh-cn/diy.edit.json": () => import("./diy.edit-f5d8c6b1.js"), "../app/lang/zh-cn/diy.index.json": () => import("./diy.index-7d6c7cb2.js"), "../app/lang/zh-cn/diy.list.json": () => import("./diy.list-fb8d7f12.js"), "../app/lang/zh-cn/diy.member.json": () => import("./diy.member-7204bf61.js"), "../app/lang/zh-cn/diy.preview.json": () => import("./diy.preview-f8b42901.js"), "../app/lang/zh-cn/diy.route.json": () => import("./diy.route-51d664e7.js"), "../app/lang/zh-cn/diy.tabbar.json": () => import("./diy.tabbar-5a78137b.js"), "../app/lang/zh-cn/diy.tabbar_edit.json": () => import("./diy.tabbar_edit-1b67bdec.js"), "../app/lang/zh-cn/diy_form.edit.json": () => import("./diy_form.edit-5e849551.js"), "../app/lang/zh-cn/diy_form.list.json": () => import("./diy_form.list-8cc96e72.js"), "../app/lang/zh-cn/finance.account.json": () => import("./finance.account-3ebadbbb.js"), "../app/lang/zh-cn/finance.cash_out.json": () => import("./finance.cash_out-a5fc92d4.js"), "../app/lang/zh-cn/finance.offlinepay.json": () => import("./finance.offlinepay-5e4097af.js"), "../app/lang/zh-cn/finance.pay_detail.json": () => import("./finance.pay_detail-03e8534d.js"), "../app/lang/zh-cn/finance.pay_refund.json": () => import("./finance.pay_refund-33befe92.js"), "../app/lang/zh-cn/finance.refund_detail.json": () => import("./finance.refund_detail-4952f106.js"), "../app/lang/zh-cn/index.app_manage.json": () => import("./index.app_manage-8bfaebc1.js"), "../app/lang/zh-cn/index.index.json": () => import("./index.index-1daecdce.js"), "../app/lang/zh-cn/index.preview.json": () => import("./index.preview-969e67dd.js"), "../app/lang/zh-cn/index.store.json": () => import("./index.store-e2f6d3f6.js"), "../app/lang/zh-cn/login.json": () => import("./login-00d7722b.js"), "../app/lang/zh-cn/marketing.sign_config.json": () => import("./marketing.sign_config-62bde278.js"), "../app/lang/zh-cn/marketing.sign_list.json": () => import("./marketing.sign_list-2d527eb9.js"), "../app/lang/zh-cn/marketing.verifier.json": () => import("./marketing.verifier-fb68001b.js"), "../app/lang/zh-cn/marketing.verify.json": () => import("./marketing.verify-a01b4161.js"), "../app/lang/zh-cn/member.balance.json": () => import("./member.balance-7b831fb2.js"), "../app/lang/zh-cn/member.commission.json": () => import("./member.commission-6f09b642.js"), "../app/lang/zh-cn/member.growth.json": () => import("./member.growth-b8b132a4.js"), "../app/lang/zh-cn/member.label.edit.json": () => import("./member.label.edit-32f3c791.js"), "../app/lang/zh-cn/member.label.json": () => import("./member.label-d042fc75.js"), "../app/lang/zh-cn/member.level.json": () => import("./member.level-9883e926.js"), "../app/lang/zh-cn/member.level_edit.json": () => import("./member.level_edit-63ebdbf3.js"), "../app/lang/zh-cn/member.member.json": () => import("./member.member-2cc54a64.js"), "../app/lang/zh-cn/member.member_detail.json": () => import("./member.member_detail-49ebc798.js"), "../app/lang/zh-cn/member.point.json": () => import("./member.point-b9f9143f.js"), "../app/lang/zh-cn/poster.edit.json": () => import("./poster.edit-c0d45927.js"), "../app/lang/zh-cn/poster.list.json": () => import("./poster.list-6a917fd4.js"), "../app/lang/zh-cn/printer.edit.json": () => import("./printer.edit-03e2be08.js"), "../app/lang/zh-cn/printer.list.json": () => import("./printer.list-1cf7202e.js"), "../app/lang/zh-cn/printer.template_edit.json": () => import("./printer.template_edit-3092b283.js"), "../app/lang/zh-cn/printer.template_list.json": () => import("./printer.template_list-679ce0fb.js"), "../app/lang/zh-cn/setting.adminlogin.json": () => import("./setting.adminlogin-763acc1d.js"), "../app/lang/zh-cn/setting.agreement.json": () => import("./setting.agreement-ef53ab4e.js"), "../app/lang/zh-cn/setting.agreement_edit.json": () => import("./setting.agreement_edit-42ca6920.js"), "../app/lang/zh-cn/setting.cash_out.json": () => import("./setting.cash_out-b3a40561.js"), "../app/lang/zh-cn/setting.copyright.json": () => import("./setting.copyright-703776c8.js"), "../app/lang/zh-cn/setting.developer_token.json": () => import("./setting.developer_token-df8cac95.js"), "../app/lang/zh-cn/setting.export.json": () => import("./setting.export-6bcb66d7.js"), "../app/lang/zh-cn/setting.growth_rule.json": () => import("./setting.growth_rule-4682f358.js"), "../app/lang/zh-cn/setting.layout.json": () => import("./setting.layout-2d2ef354.js"), "../app/lang/zh-cn/setting.login.json": () => import("./setting.login-0e20a204.js"), "../app/lang/zh-cn/setting.map.json": () => import("./setting.map-a018c17d.js"), "../app/lang/zh-cn/setting.member.json": () => import("./setting.member-3c18afe5.js"), "../app/lang/zh-cn/setting.notice.json": () => import("./setting.notice-b12781da.js"), "../app/lang/zh-cn/setting.notice_records.json": () => import("./setting.notice_records-8b5d12a2.js"), "../app/lang/zh-cn/setting.oplatform.json": () => import("./setting.oplatform-ceddec97.js"), "../app/lang/zh-cn/setting.pay.json": () => import("./setting.pay-9d3502d5.js"), "../app/lang/zh-cn/setting.sms.json": () => import("./setting.sms-38c6ea20.js"), "../app/lang/zh-cn/setting.sms_records.json": () => import("./setting.sms_records-f32dcf96.js"), "../app/lang/zh-cn/setting.storage.json": () => import("./setting.storage-33557c9e.js"), "../app/lang/zh-cn/setting.system.json": () => import("./setting.system-533a107a.js"), "../app/lang/zh-cn/setting.transfer.json": () => import("./setting.transfer-dd7288e1.js"), "../app/lang/zh-cn/setting.transfer_scene.json": () => import("./setting.transfer_scene-a1236971.js"), "../app/lang/zh-cn/setting.weapp.json": () => import("./setting.weapp-38d65415.js"), "../app/lang/zh-cn/site.group.json": () => import("./site.group-79d11eb3.js"), "../app/lang/zh-cn/site.group_edit.json": () => import("./site.group_edit-ad4054d9.js"), "../app/lang/zh-cn/site.info.json": () => import("./site.info-3cdf0707.js"), "../app/lang/zh-cn/site.list.json": () => import("./site.list-f879a4a9.js"), "../app/lang/zh-cn/site.manage.json": () => import("./site.manage-d384cce7.js"), "../app/lang/zh-cn/site.user.json": () => import("./site.user-298548ec.js"), "../app/lang/zh-cn/site.user_info.json": () => import("./site.user_info-8949966a.js"), "../app/lang/zh-cn/tools.addon.edit.json": () => import("./tools.addon.edit-67fed17b.js"), "../app/lang/zh-cn/tools.addon.index.json": () => import("./tools.addon.index-64a332f0.js"), "../app/lang/zh-cn/tools.addon.list.json": () => import("./tools.addon.list-066ffe3b.js"), "../app/lang/zh-cn/tools.backup_records.json": () => import("./tools.backup_records-3ee06c5e.js"), "../app/lang/zh-cn/tools.code.edit.json": () => import("./tools.code.edit-ce482f8a.js"), "../app/lang/zh-cn/tools.code.index.json": () => import("./tools.code.index-2f01b5e9.js"), "../app/lang/zh-cn/tools.code.list.json": () => import("./tools.code.list-b3d1ec18.js"), "../app/lang/zh-cn/tools.detection.json": () => import("./tools.detection-2d1c5fc5.js"), "../app/lang/zh-cn/tools.schedule.json": () => import("./tools.schedule-3013f2ba.js"), "../app/lang/zh-cn/tools.schedule_log.json": () => import("./tools.schedule_log-c332642a.js"), "../app/lang/zh-cn/tools.updatecache.json": () => import("./tools.updatecache-c28011ba.js"), "../app/lang/zh-cn/tools.upgrade_records.json": () => import("./tools.upgrade_records-948f5c6a.js"), "../app/lang/zh-cn/user.center.json": () => import("./user.center-f848e53b.js"), "../app/lang/zh-cn/user.edit_center.json": () => import("./user.edit_center-86828913.js"), "../app/lang/zh-cn/wxoplatform.setting.json": () => import("./wxoplatform.setting-e351af9d.js"), "../app/lang/zh-cn/wxoplatform.weapp_version.json": () => import("./wxoplatform.weapp_version-cb21e15c.js") }), `../app/lang/${s}/${i}.json`)).default || {};
      let d = {};
      if (Object.keys(c).forEach((m) => {
        d[`${i}.${m}`] = c[m];
      }), n)
        try {
          let m = {};
          m = await D(n, s, "common"), Object.keys(m).forEach((u) => {
            d[u] = m[u];
          });
        } catch {
        }
      return this.i18n.global.mergeLocaleMessage(s, d), this.setI18nLanguage(s), N();
    } catch {
      return this.setI18nLanguage(s), N();
    }
  }
  /** 生产环境启动时预加载各插件全部语言包 */
  async preloadAddonLangs() {
    await te((n, e) => {
      this.i18n.global.mergeLocaleMessage(n, e);
    });
  }
}
const se = "编辑", ae = "详情", re = "创建时间", ie = "排序", ce = "状态", pe = "操作", le = "更多", de = "正常", me = "停用", ue = "启用", ge = "确认", he = "保存", fe = "返回", ye = "取消", je = "搜索", we = "重置", ze = "刷新", be = "刷新成功", ve = "选择", Pe = "确定要导出数据吗？", ke = "批量导出数据", Se = "确定并导出", Te = "提示", xe = "是否显示", Ce = "显示", Ne = "隐藏", Le = "图标", _e = "用户名", Ae = "头像", Ee = "账号", $e = "账号设置", Ie = "名称", Me = "请输入用户名称", Ue = "密码", De = "确认密码", Oe = "图片", Re = "视频", Be = "重命名", We = "查看", qe = "全选", Fe = "是", He = "否", Ve = "复制", Ke = "完成", Qe = "复制成功", Ge = "浏览器不支持一键复制，请手动进行复制", Xe = "全部", Ye = "请选择省", Je = "请选择市", Ze = "请选择区/县", en = "暂无数据", nn = "暂无二维码", tn = "无法显示", on = {
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
}, sn = {
  closeLeft: "关闭左侧",
  closeRight: "关闭右侧",
  closeOther: "关闭其他"
}, an = {
  layoutSetting: "主题设置",
  darkMode: "黑暗模式",
  sidebarMode: "主题风格",
  themeColor: "主题颜色",
  detectionLoginOperation: "确定",
  detectionLoginContent: "已检测到有其他账号登录，需要刷新后才能继续操作。",
  detectionLoginTip: "提示",
  layoutStyle: "布局风格",
  tab: "开启标签栏"
}, rn = {
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
  baseUrlError: " 接口请求错误,请检查VITE_APP_BASE_URL参数配置或者伪静态配置, <a style='text-decoration: underline;' href='https://www.kancloud.cn/niucloud/niucloud-admin-develop/3213750' target='blank'>点击查看相关手册</a>"
}, cn = "请选择跳转链接", pn = "链接选择", ln = "链接名称", dn = "请输入链接名称", mn = "链接名称不能为空", un = "跳转路径", gn = "请输入跳转路径", hn = "跳转路径不能为空", fn = "小程序AppID", yn = "请输入要打开的小程序的appid", jn = "小程序AppID不能为空", wn = "小程序路径", zn = "请输入要打开的小程序路径", bn = "小程序路径不能为空", vn = "电话号码", Pn = "请输入电话号码", kn = "电话号码不能为空", Sn = "返回", Tn = "预览", xn = "暂未安装任何应用", Cn = "最新消息", Nn = "访问店铺", Ln = "地图设置", _n = "腾讯地图KEY", An = "首页模版", En = "切换首页", $n = "你确定要切换首页吗？", In = "原始密码", Mn = "新密码", Un = "确认密码", Dn = "修改密码时必填.不修改密码时留空", On = "请输入原始密码", Rn = "请输入新密码", Bn = "原始密码不能为空", Wn = "请输入确认密码", qn = "两次新密码不同", Fn = "两次新密码不同", Hn = {
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
}, Vn = {
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
}, Kn = "表单名称", Qn = "请输入表单名称", Gn = "表单类型", Xn = "请选择表单类型", Yn = "全部", Jn = "请选择表单", Zn = "应用名/版本信息", et = "应用标识", nt = "简介", tt = "类型", ot = "插件管理", st = "升级", at = "已安装", rt = "未安装", it = "已购买", ct = "云编译", pt = "最新版本", lt = "标识指开发应用或插件的文件夹名称", dt = "更新信息", mt = "下一步", ut = "上一步", gt = "查看升级内容", ht = "检测目录权限", ft = "备份文件", yt = "开始升级", jt = "升级完成", wt = "是否要进行云编译该操作可能会影响到正在访问的客户是否要继续操作？", zt = "推广链接", bt = "下载二维码", vt = "配置失败", Pt = "左侧标题", kt = "右侧标题", St = "左侧简介", Tt = "右侧简介", xt = "请输入简介内容", Ct = {
  edit: se,
  delete: "删除",
  info: ae,
  createTime: re,
  sort: ie,
  status: ce,
  operation: pe,
  more: le,
  statusNormal: de,
  statusDeactivate: me,
  startUsing: ue,
  confirm: ge,
  save: he,
  back: fe,
  cancel: ye,
  search: je,
  reset: we,
  refresh: ze,
  refreshSuccess: be,
  select: ve,
  export: "导出列表",
  exportPlaceholder: Pe,
  exportTip: ke,
  exportConfirm: Se,
  warning: Te,
  isShow: xe,
  show: Ce,
  hidden: Ne,
  icon: Le,
  userName: _e,
  headImg: Ae,
  accountNumber: Ee,
  accountSettings: $e,
  realName: Ie,
  realNamePlaceholder: Me,
  password: Ue,
  confirmPassword: De,
  image: Oe,
  video: Re,
  rename: Be,
  lookOver: We,
  selectAll: qe,
  yes: Fe,
  no: He,
  copy: Ve,
  complete: Ke,
  copySuccess: Qe,
  notSupportCopy: Ge,
  selectPlaceholder: Xe,
  provincePlaceholder: Ye,
  cityPlaceholder: Je,
  districtPlaceholder: Ze,
  emptyData: en,
  emptyQrCode: nn,
  fileErr: tn,
  upload: on,
  tabs: sn,
  layout: an,
  axios: rn,
  linkPlaceholder: cn,
  selectLinkTips: pn,
  diyLinkName: ln,
  diyLinkNamePlaceholder: dn,
  diyLinkNameNotEmpty: mn,
  diyLinkUrl: un,
  diyLinkUrlPlaceholder: gn,
  diyLinkUrlNotEmpty: hn,
  diyAppletId: fn,
  diyAppletIdPlaceholder: yn,
  diyAppletIdNotEmpty: jn,
  diyAppletPage: wn,
  diyAppletPagePlaceholder: zn,
  diyAppletPageNotEmpty: bn,
  diyMakePhone: vn,
  diyMakePhonePlaceholder: Pn,
  diyMakePhoneNotEmpty: kn,
  returnToPreviousPage: Sn,
  preview: Tn,
  emptyApp: xn,
  newInfo: Cn,
  visitWap: Nn,
  mapSetting: Ln,
  mapKey: _n,
  indexTemplate: An,
  indexSwitch: En,
  indexWarning: $n,
  originalPassword: In,
  newPassword: Mn,
  passwordCopy: Un,
  passwordTip: Dn,
  originalPasswordPlaceholder: On,
  passwordPlaceholder: Rn,
  originalPasswordHint: Bn,
  newPasswordHint: Wn,
  doubleCipherHint: qn,
  confirmPasswordError: Fn,
  upgrade: Hn,
  cloudbuild: Vn,
  formSelectContentTitle: Kn,
  formSelectContentTitlePlaceholder: Qn,
  formSelectContentTypeName: Gn,
  formSelectContentTypeNamePlaceholder: Xn,
  formSelectContentTypeAll: Yn,
  formSelectContentTips: Jn,
  appName: Zn,
  appIdentification: et,
  introduction: nt,
  type: tt,
  localAppText: ot,
  upgrade2: st,
  installLabel: at,
  uninstalledLabel: rt,
  buyLabel: it,
  cloudBuild: ct,
  newVersion: pt,
  tipText: lt,
  gxx: dt,
  return: "返回",
  nextStep: mt,
  prev: ut,
  viewUpgradeContent: gt,
  testDirectoryPermissions: ht,
  backupFiles: ft,
  startUpgrade: yt,
  upgradeEnd: jt,
  cloudBuildTips: wt,
  promoteUrl: zt,
  downLoadQRCode: bt,
  configureFailed: vt,
  lefttitle: Pt,
  righttitle: kt,
  leftDesc: St,
  rightDesc: Tt,
  descPlaceholder: xt
}, Nt = "Edit", Lt = "Create Time", _t = "Sort", At = "Status", Et = "Operation", $t = "Normal", It = "Deactivate", Mt = "Confirm", Ut = "Cancel", Dt = "Warning", Ot = "Show or not", Rt = "show", Bt = "hidden", Wt = "Icon", qt = {
  layoutSetting: "Layout configuration",
  darkMode: "Dark mode",
  themeColor: "Theme color"
}, Ft = {
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
}, Ht = {
  edit: Nt,
  delete: "Delete",
  createTime: Lt,
  sort: _t,
  status: At,
  operation: Et,
  statusNormal: $t,
  statusDeactivate: It,
  confirm: Mt,
  cancel: Ut,
  warning: Dt,
  isShow: Ot,
  show: Rt,
  hidden: Bt,
  icon: Wt,
  layout: qt,
  axios: Ft
};
let b = K({
  locale: "zh-cn",
  fallbackLocale: "zh-cn",
  datetimeFormats: {},
  numberFormats: {},
  globalInjection: !0,
  //是否全局注入
  silentTranslationWarn: !0,
  messages: {
    "zh-cn": Ct,
    en: Ht
  },
  silentFallbackWarn: !0
});
const no = new oe(b);
var Vt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, L = {}, Kt = {
  get exports() {
    return L;
  },
  set exports(o) {
    L = o;
  }
};
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(o, n) {
  (function(e, s) {
    o.exports = s();
  })(Vt, function() {
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
    e.configure = function(t) {
      var a, r;
      for (a in t)
        r = t[a], r !== void 0 && t.hasOwnProperty(a) && (s[a] = r);
      return this;
    }, e.status = null, e.set = function(t) {
      var a = e.isStarted();
      t = i(t, s.minimum, 1), e.status = t === 1 ? null : t;
      var r = e.render(!a), l = r.querySelector(s.barSelector), g = s.speed, y = s.easing;
      return r.offsetWidth, m(function(p) {
        s.positionUsing === "" && (s.positionUsing = e.getPositioningCSS()), u(l, d(t, g, y)), t === 1 ? (u(r, {
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
      var t = function() {
        setTimeout(function() {
          e.status && (e.trickle(), t());
        }, s.trickleSpeed);
      };
      return s.trickle && t(), this;
    }, e.done = function(t) {
      return !t && !e.status ? this : e.inc(0.3 + 0.5 * Math.random()).set(1);
    }, e.inc = function(t) {
      var a = e.status;
      return a ? (typeof t != "number" && (t = (1 - a) * i(Math.random() * a, 0.1, 0.95)), a = i(a + t, 0, 0.994), e.set(a)) : e.start();
    }, e.trickle = function() {
      return e.inc(Math.random() * s.trickleRate);
    }, function() {
      var t = 0, a = 0;
      e.promise = function(r) {
        return !r || r.state() === "resolved" ? this : (a === 0 && e.start(), t++, a++, r.always(function() {
          a--, a === 0 ? (t = 0, e.done()) : e.set((t - a) / t);
        }), this);
      };
    }(), e.render = function(t) {
      if (e.isRendered())
        return document.getElementById("nprogress");
      $(document.documentElement, "nprogress-busy");
      var a = document.createElement("div");
      a.id = "nprogress", a.innerHTML = s.template;
      var r = a.querySelector(s.barSelector), l = t ? "-100" : c(e.status || 0), g = document.querySelector(s.parent), y;
      return u(r, {
        transition: "all 0 linear",
        transform: "translate3d(" + l + "%,0,0)"
      }), s.showSpinner || (y = a.querySelector(s.spinnerSelector), y && M(y)), g != document.body && $(g, "nprogress-custom-parent"), g.appendChild(a), a;
    }, e.remove = function() {
      I(document.documentElement, "nprogress-busy"), I(document.querySelector(s.parent), "nprogress-custom-parent");
      var t = document.getElementById("nprogress");
      t && M(t);
    }, e.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, e.getPositioningCSS = function() {
      var t = document.body.style, a = "WebkitTransform" in t ? "Webkit" : "MozTransform" in t ? "Moz" : "msTransform" in t ? "ms" : "OTransform" in t ? "O" : "";
      return a + "Perspective" in t ? "translate3d" : a + "Transform" in t ? "translate" : "margin";
    };
    function i(t, a, r) {
      return t < a ? a : t > r ? r : t;
    }
    function c(t) {
      return (-1 + t) * 100;
    }
    function d(t, a, r) {
      var l;
      return s.positionUsing === "translate3d" ? l = { transform: "translate3d(" + c(t) + "%,0,0)" } : s.positionUsing === "translate" ? l = { transform: "translate(" + c(t) + "%,0)" } : l = { "margin-left": c(t) + "%" }, l.transition = "all " + a + "ms " + r, l;
    }
    var m = function() {
      var t = [];
      function a() {
        var r = t.shift();
        r && r(a);
      }
      return function(r) {
        t.push(r), t.length == 1 && a();
      };
    }(), u = function() {
      var t = ["Webkit", "O", "Moz", "ms"], a = {};
      function r(p) {
        return p.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(h, f) {
          return f.toUpperCase();
        });
      }
      function l(p) {
        var h = document.body.style;
        if (p in h)
          return p;
        for (var f = t.length, w = p.charAt(0).toUpperCase() + p.slice(1), j; f--; )
          if (j = t[f] + w, j in h)
            return j;
        return p;
      }
      function g(p) {
        return p = r(p), a[p] || (a[p] = l(p));
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
    function E(t, a) {
      var r = typeof t == "string" ? t : T(t);
      return r.indexOf(" " + a + " ") >= 0;
    }
    function $(t, a) {
      var r = T(t), l = r + a;
      E(r, a) || (t.className = l.substring(1));
    }
    function I(t, a) {
      var r = T(t), l;
      E(t, a) && (l = r.replace(" " + a + " ", " "), t.className = l.substring(1, l.length - 1));
    }
    function T(t) {
      return (" " + (t.className || "") + " ").replace(/\s+/gi, " ");
    }
    function M(t) {
      t && t.parentNode && t.parentNode.removeChild(t);
    }
    return e;
  });
})(Kt);
const O = L, Qt = G("app", {
  state: () => ({
    route: {},
    routeRefreshTag: !0,
    pageReturn: !1
  }),
  actions: {
    refreshRouterView() {
      this.routeRefreshTag = !1, O.start(), N(() => {
        this.routeRefreshTag = !0, O.done();
      });
    }
  }
});
function Gt() {
  return Q() ? X() : Qt().route;
}
const to = (o) => {
  const n = Gt();
  let e = Z(n);
  const s = ee(n);
  e || (e = B(s));
  const c = `${R(e, s)}.${o}`;
  return b.global.t(c) != c ? b.global.t(c) : b.global.t(o);
}, oo = {
  install(o) {
    o.use(b);
  }
};
export {
  oo as default,
  no as language,
  to as t
};
