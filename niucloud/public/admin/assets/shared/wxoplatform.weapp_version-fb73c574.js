const e = "站点套餐", t = "上次同步时间", s = "同步模板库", o = "模板库同步记录", n = "提交时间", p = "版本号", c = "失败原因", a = ` 1、同步小程序时系统通过已绑定的开发小程序同步至微信第三方平台的普通模板库中。
 2、同步完成后，系统将自动为站点套餐下已授权的小程序提交代码。
 3、一键同步功能支持按所有站点套餐进行批量同步，同时也可针对单个站点套餐单独操作。
 4、使用此功能前，请确保已启动消息队列服务。`, r = "查看同步记录", i = "同步记录", d = "一键同步", m = "未能同步到模板库", l = "模板ID", T = "站点小程序同步", u = "是否要给该套餐下已授权小程序的站点提交代码？", y = "查看帮助", R = "状态", f = {
  groupName: e,
  lastTime: t,
  weappVersionUpdate: s,
  weappVersionUpdateRecord: o,
  createTime: n,
  userVersion: p,
  failReason: c,
  updateTips: a,
  seeUpdateRecord: r,
  commitRecord: i,
  oneClickSync: d,
  syncTemplateError: m,
  templateID: l,
  siteWeappSync: T,
  syncSiteWeappTips: u,
  helpInfo: y,
  status: R
};
export {
  i as commitRecord,
  n as createTime,
  f as default,
  c as failReason,
  e as groupName,
  y as helpInfo,
  t as lastTime,
  d as oneClickSync,
  r as seeUpdateRecord,
  T as siteWeappSync,
  R as status,
  u as syncSiteWeappTips,
  m as syncTemplateError,
  l as templateID,
  a as updateTips,
  p as userVersion,
  s as weappVersionUpdate,
  o as weappVersionUpdateRecord
};
