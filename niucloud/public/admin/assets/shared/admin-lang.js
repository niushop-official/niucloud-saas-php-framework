var Tm = Object.defineProperty;
var jm = (e, t, o) => t in e ? Tm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var v = (e, t, o) => (jm(e, typeof t != "symbol" ? t + "" : t, o), o);
import { createI18n as km } from "vue-i18n";
import { nextTick as $, getCurrentInstance as bm } from "vue";
import { defineStore as zm } from "pinia";
import { useRoute as _m } from "vue-router";
const D = "文章数据", R = "文章样式", E = "文章背景", O = "文章数量", F = "文章选择", U = "标题", W = "封面", q = "栏目", K = "摘要", H = "请选择文章", vm = {
  articleData: D,
  articleStyle: R,
  articleBgColor: E,
  articleNum: O,
  selectArticleTips: F,
  articleTitle: U,
  articleImage: W,
  articleCategoryName: q,
  articleSummary: K,
  selectArticleTip: H
}, $m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  articleBgColor: E,
  articleCategoryName: q,
  articleData: D,
  articleImage: W,
  articleNum: O,
  articleStyle: R,
  articleSummary: K,
  articleTitle: U,
  default: vm,
  selectArticleTip: H,
  selectArticleTips: F
}, Symbol.toStringTag, { value: "Module" })), V = "搜索", Y = "重置", Q = "确认", X = "取消", Z = "警告", J = "成功", oo = "错误", eo = "信息", to = "暂无数据", no = "加载中...", co = "操作", so = "详情", ao = "添加", ro = "编辑", lo = "返回", io = "提交", po = "保存", go = "关闭", mo = "刷新", uo = "页码", ho = "每页条数", So = "总计", fo = "上一页", Po = "下一页", yo = "跳转", Co = "打印", To = "复制", jo = "粘贴", ko = "剪切", bo = "全选", zo = "取消全选", _o = "批量操作", vo = "请选择", $o = "请输入", wo = "请选择", xo = "必填", Go = "长度不能小于", No = "长度不能大于", Io = "格式无效", Ao = "加载数据失败", Bo = "提交成功", Mo = "提交失败", Lo = "删除成功", Do = "删除失败", Ro = "更新成功", Eo = "更新失败", Oo = "添加成功", Fo = "添加失败", Uo = "确定要删除吗？", Wo = "确定要提交吗？", qo = "确定要取消吗？", wm = {
  search: V,
  reset: Y,
  confirm: Q,
  cancel: X,
  warning: Z,
  success: J,
  error: oo,
  info: eo,
  emptyData: to,
  loading: no,
  operation: co,
  detail: so,
  add: ao,
  edit: ro,
  delete: "删除",
  back: lo,
  submit: io,
  save: po,
  close: go,
  refresh: mo,
  page: uo,
  size: ho,
  total: So,
  prev: fo,
  next: Po,
  jump: yo,
  export: "导出",
  import: "导入",
  print: Co,
  copy: To,
  paste: jo,
  cut: ko,
  selectAll: bo,
  deselectAll: zo,
  batchOperation: _o,
  pleaseSelect: vo,
  pleaseInput: $o,
  pleaseChoose: wo,
  required: xo,
  minLength: Go,
  maxLength: No,
  invalidFormat: Io,
  loadDataError: Ao,
  submitSuccess: Bo,
  submitFailure: Mo,
  deleteSuccess: Lo,
  deleteFailure: Do,
  updateSuccess: Ro,
  updateFailure: Eo,
  addSuccess: Oo,
  addFailure: Fo,
  confirmDelete: Uo,
  confirmSubmit: Wo,
  confirmCancel: qo
}, xm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: ao,
  addFailure: Fo,
  addSuccess: Oo,
  back: lo,
  batchOperation: _o,
  cancel: X,
  close: go,
  confirm: Q,
  confirmCancel: qo,
  confirmDelete: Uo,
  confirmSubmit: Wo,
  copy: To,
  cut: ko,
  default: wm,
  deleteFailure: Do,
  deleteSuccess: Lo,
  deselectAll: zo,
  detail: so,
  edit: ro,
  emptyData: to,
  error: oo,
  info: eo,
  invalidFormat: Io,
  jump: yo,
  loadDataError: Ao,
  loading: no,
  maxLength: No,
  minLength: Go,
  next: Po,
  operation: co,
  page: uo,
  paste: jo,
  pleaseChoose: wo,
  pleaseInput: $o,
  pleaseSelect: vo,
  prev: fo,
  print: Co,
  refresh: mo,
  required: xo,
  reset: Y,
  save: po,
  search: V,
  selectAll: bo,
  size: ho,
  submit: io,
  submitFailure: Mo,
  submitSuccess: Bo,
  success: J,
  total: So,
  updateFailure: Eo,
  updateSuccess: Ro,
  warning: Z
}, Symbol.toStringTag, { value: "Module" })), Ko = "选择服务", Ho = "已选", Vo = "个", Yo = "服务选择", Qo = "全部服务", Xo = "已选服务", Zo = "目名称", Jo = "请输入服务名称", oe = "服务分类", ee = "全部", te = "服务类型", ne = "请选择服务类型", ce = "服务", se = "价格", ae = "销量", re = "已选择", le = "个服务", ie = "取消选择", de = "所选服务数量不能少于", pe = "所选服务数量不能超过", ge = "分类名称", me = "分类图片", ue = "服务信息", he = "销售价", Se = "销量", fe = "服务名称", Pe = "服务分类", ye = "请输入服务名称", Ce = "所选服务服务不能少于1个", Te = "显示标题", je = "搜索样式", ke = "边框类型", be = "搜索内容", ze = "指定会员价", _e = "搜索内容", ve = "师傅名称", $e = "手机号", we = "请输入师傅名称", xe = "请输入手机号", Ge = "师傅信息", Ne = "工龄", Ie = "性别", Ae = "所选师傅不能少于1个", Be = "请选择服务分类", Me = "收起", Le = "选择标签", De = "标签ID", Re = "标签名称", Ee = "标签颜色", Oe = "取消", Fe = "确认", Ue = "人员信息", We = "所属机构", qe = "工单状态", Ke = "选择师傅", He = "暂无数据", Ve = "发票信息", Ye = "发票编号", Qe = "发票类型", Xe = "发票金额", Ze = "开票时间", Je = "开票内容", ot = "发票抬头类型", et = "企业名称", tt = "纳税人识别号", nt = "电话", ct = "地址", st = "开户银行", at = "银行账号", rt = "发票状态", lt = "待开票", it = "已开票", dt = "暂无发票信息", pt = "个人", gt = "企业", mt = "开票内容", ut = "开户银行", ht = "银行账号", St = "发票编号", ft = "客户名称", Pt = "纳税人识别号", yt = "开票金额", Ct = "申请时间", Tt = "未开票", jt = "电子邮箱", kt = "订单金额", bt = "选择榜单", zt = "默认", _t = "库存", vt = "请选择商品状态", $t = "积分", wt = "元", xt = "文字颜色", Gt = "标题颜色", Nt = "副标题颜色", It = "虚拟商品和实物商品只能选择其中一个类型，请重新选择", At = "商品样式", Bt = "商品背景", Mt = "商品名称", Lt = "销售价", Dt = "文本", Rt = "请输入按钮文字", Et = "商品销量", Ot = "按钮背景", Ft = "已兑人数", Ut = "购买按钮", Wt = "显示内容", qt = "按钮效果", Kt = "是否显示", Ht = "点击事件", Vt = "加入购物车", Yt = "样式", Qt = "商品销量", Xt = "商品详情", Zt = "圆角", Jt = "分销佣金", on = "请选择商品分类", en = "请选择商品", tn = "是否加粗", nn = "商品标签", cn = "样式1", sn = "样式2", an = "样式3", rn = "样式4", ln = "商品数据", dn = "排序", pn = "销量", gn = "价格", mn = "图片圆角", un = "分类名称", hn = "副标题", Sn = "添加一个多商品组", fn = "优惠券数据", Pn = "优惠券内容", yn = "标题", Cn = "请输入标题", Tn = "副标题", jn = "请输入副标题", kn = "选择优惠券", bn = "全部", zn = "优惠券数量", _n = "请选择优惠券", vn = "按钮文字", $n = "请输入按钮文字", wn = "标题样式", xn = "标题颜色", Gn = "副标题颜色", Nn = "优惠券项样式", In = "金额颜色", An = "分组设置", Bn = "自定义", Mn = "商品分类", Ln = "商品设置", Dn = "搜索设置", Rn = "搜索内容", En = "请输入搜索内容", On = "编号颜色", Fn = "账户颜色", Un = "账号信息", Wn = "标签", qn = "标签颜色", Kn = "请输入标签内容", Hn = "按钮边框颜色", Vn = "轮播样式", Yn = "指示器设置", Qn = "常规颜色", Xn = "选中颜色", Zn = "板块内容", Jn = "背景图片", oc = "图标", ec = "榜单选择", tc = "榜单名称", nc = "请输入榜单名称", cc = "榜单商品数量", sc = "商品来源", ac = "排序规则", rc = "排行周期", lc = "个榜单", ic = "所选榜单数量不能少于", dc = "所选榜单数量不能超过", pc = "头部图片", gc = "副标题", mc = "副标题颜色", uc = "名称颜色", hc = "副标题链接", Sc = "背景颜色", fc = "上圆角", Pc = "下圆角", yc = "图片圆角", Cc = "板块样式", Tc = "风格推荐", jc = "倒计时样式", kc = "数字颜色", bc = "数字背景色", zc = "文字颜色", _c = "分类名称", vc = "分类图片", $c = "请选择商品分类", wc = "优惠券名称", xc = "请输入优惠券名称", Gc = "类型", Nc = "面值", Ic = "使用门槛", Ac = "请选择优惠券", Bc = "商品名称", Mc = "请输入商品名称", Lc = "商品信息", Dc = "兑换价格", Rc = "积分", Ec = "元", Oc = "已兑/剩余", Fc = "请选择积分商品", Uc = "分类名称", Wc = "分类图片", Gm = {
  goodsSelectPopupSelectGoodsButton: Ko,
  goodsSelectPopupSelect: Ho,
  goodsSelectPopupPiece: Vo,
  goodsSelectPopupSelectGoodsDialog: Yo,
  goodsSelectPopupAllGoods: Qo,
  goodsSelectPopupSelectedGoods: Xo,
  goodsSelectPopupGoodsName: Zo,
  goodsSelectPopupGoodsNamePlaceholder: Jo,
  goodsSelectPopupGoodsCategory: oe,
  goodsSelectPopupGoodsCategoryPlaceholder: ee,
  goodsSelectPopupGoodsType: te,
  goodsSelectPopupGoodsTypePlaceholder: ne,
  goodsSelectPopupGoodsInfo: ce,
  goodsSelectPopupPrice: se,
  goodsSelectPopupSaleNum: ae,
  goodsSelectPopupBeforeTip: re,
  goodsSelectPopupAfterTip: le,
  goodsSelectPopupClearGoods: ie,
  goodsSelectPopupGoodsMinTip: de,
  goodsSelectPopupGoodsMaxTip: pe,
  o2oGoodsCategorySelectContentName: ge,
  o2oGoodsCategorySelectContentImage: me,
  o2oSelectPopupCardInfo: ue,
  o2oSelectPopupCardPrice: he,
  o2oSelectPopupCardSaleNum: Se,
  o2oSelectPopupCardName: fe,
  o2oSelectPopupCardCategory: Pe,
  o2oSelectPopupCardNamePlaceholder: ye,
  o2oSelectContentTips: Ce,
  showTitle: Te,
  searchStyle: je,
  borderStyle: ke,
  searchPlaceholder: be,
  goodsFixedPrice: ze,
  searchContent: _e,
  technicianSelectPopupCardName: ve,
  technicianSelectPopupCardMobile: $e,
  technicianSelectPopupCardNamePlaceholder: we,
  technicianSelectPopupCardMobilePlaceholder: xe,
  technicianSelectPopupCardInfo: Ge,
  technicianSelectPopupCardSeniority: Ne,
  technicianSelectPopupCardSex: Ie,
  technicianSelectContentTips: Ae,
  o2oGoodsSelectContentPlaceholder: Be,
  less: Me,
  selectTag: Le,
  tagId: De,
  tagName: Re,
  tagColor: Ee,
  cancel: Oe,
  confirm: Fe,
  technicianInfo: Ue,
  shop: We,
  orderStatus: qe,
  selectTechnican: Ke,
  emptyData: He,
  invoiceInfo: Ve,
  invoiceNumber: Ye,
  invoiceType: Qe,
  invoiceMoney: Xe,
  invoiceTime: Ze,
  contentName: Je,
  headerType: ot,
  headerName: et,
  taxNumber: tt,
  telephone: nt,
  address: ct,
  bankName: st,
  bankCardNumber: at,
  invoiceStatus: rt,
  toInvoice: lt,
  invoiced: it,
  invoiceEmpty: dt,
  individual: pt,
  company: gt,
  invoiceContent: mt,
  bank_name: ut,
  bank_card_number: ht,
  applicationNumber: St,
  customerName: ft,
  taxpayerId: Pt,
  invoiceAmount: yt,
  applicationTime: Ct,
  notInvoiced: Tt,
  email: jt,
  orderMoney: kt,
  rankSelectPopupSelectRankButton: bt,
  defaultGoodsSelect: zt,
  goodsSelectPopupStock: _t,
  goodsSelectPopupGoodsStatusPlaceholder: vt,
  goodsSelectPopupGoodsPointUnit: $t,
  goodsSelectPopupGoodsPriceUnit: wt,
  goodsTextColor: xt,
  textColor: Gt,
  subTextColor: Nt,
  wayPlaceholder: It,
  goodsStyle: At,
  goodsBgColor: Bt,
  goodsNameColor: Mt,
  goodsPriceColor: Lt,
  goodsBtnText: Dt,
  goodsBtnTextPlaceholder: Rt,
  goodsSaleColor: Et,
  goodsBtnColor: Ot,
  goodsNumColor: Ft,
  goodsBuyBtn: Ut,
  goodsShowContent: Wt,
  goodsBtnResult: qt,
  goodsBtnIsShow: Kt,
  goodsCartIncident: Ht,
  goodsAddCart: Vt,
  goodsBtnStyle: Yt,
  goodsSaleNum: Qt,
  goodsDetail: Xt,
  goodsRounded: Zt,
  fenxiaoCommissionPriceColor: Jt,
  goodsCategoryPlaceholder: on,
  goodsPlaceholder: en,
  goodsIsBold: tn,
  goodsLabel: nn,
  headStyle1: cn,
  headStyle2: sn,
  headStyle3: an,
  headStyle4: rn,
  goodsData: ln,
  sortWay: dn,
  default: "综合",
  sales: pn,
  price: gn,
  manyGoodsListAroundRadius: mn,
  manyGoodsListCategoryName: un,
  manyGoodsListSubTitle: hn,
  manyGoodsLisAddItem: Sn,
  couponData: fn,
  couponContent: Pn,
  couponTitle: yn,
  couponTitlePlaceholder: Cn,
  couponSubTitle: Tn,
  couponSubTitlePlaceholder: jn,
  selectCoupon: kn,
  allSources: bn,
  couponNum: zn,
  couponPlaceholder: _n,
  couponBtnText: vn,
  couponBtnTextPlaceholder: $n,
  couponTitleStyle: wn,
  couponTitleColor: xn,
  couponSubTitleColor: Gn,
  couponItemStyle: Nn,
  couponMoney: In,
  manyGoodsListCategorySet: An,
  manyGoodsListSourceDiy: Bn,
  manyGoodsListSourceCategory: Mn,
  goodsSet: Ln,
  goodsSearchSet: Dn,
  goodsSearchText: Rn,
  goodsSearchTextPlaceholder: En,
  shopMemberInfoComponentUidTextColor: On,
  shopMemberInfoComponentAccountTextColor: Fn,
  shopMemberInfoComponentAccount: Un,
  shopGoodsRecommendComponentTag: Wn,
  shopGoodsRecommendComponentTagColor: qn,
  shopGoodsRecommendComponentTagPlaceholder: Kn,
  shopGoodsRecommendComponentButtonBorderColor: Hn,
  carouselStyle: Vn,
  recommendIndicatorStyle: Yn,
  recommendIndicatorColor: Qn,
  recommendIndicatorActiveColor: Xn,
  activeCubeBlockContent: Zn,
  bgImage: Jn,
  rankingTitleIcon: oc,
  rankSelect: ec,
  rankName: tc,
  rankNamePlaceholder: nc,
  showGoodsNum: cc,
  goodsSourceName: sc,
  ruleTypeName: ac,
  rankTypeName: rc,
  rankSelectPopupAfterTip: lc,
  rankSelectPopupGoodsMinTip: ic,
  rankSelectPopupGoodsMaxTip: dc,
  rankingTitleImage: pc,
  rankingSubTitle: gc,
  rankingSubTitleTextColor: mc,
  rankTextColor: uc,
  rankingSubTitleLink: hc,
  listFrameColor: Sc,
  topRounded: fc,
  bottomRounded: Pc,
  imageRounded: yc,
  rankingStyle: Cc,
  styleRecommend: Tc,
  countDownStyle: jc,
  newcomerNumberColor: kc,
  newcomerNumberBg: bc,
  newcomerOtherColor: zc,
  goodsCategorySelectContentName: _c,
  goodsCategorySelectContentImage: vc,
  goodsCategorySelectContentPlaceholder: $c,
  couponSelectContentTitle: wc,
  couponSelectContentTitlePlaceholder: xc,
  couponSelectContentType: Gc,
  couponSelectContentPrice: Nc,
  couponSelectContentThreshold: Ic,
  couponSelectContentTips: Ac,
  pointExchangeSelectContentTitle: Bc,
  pointExchangeSelectContentTitlePlaceholder: Mc,
  pointExchangeSelectContentGoodsInfo: Lc,
  pointExchangeSelectContentPrice: Dc,
  pointExchangeSelectContentPointUnit: Rc,
  pointExchangeSelectContentPriceUnit: Ec,
  pointExchangeSelectContentRedeemedAndSurplus: Oc,
  pointExchangeSelectContentTips: Fc,
  categoryName: Uc,
  categoryImage: Wc
}, Nm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activeCubeBlockContent: Zn,
  address: ct,
  allSources: bn,
  applicationNumber: St,
  applicationTime: Ct,
  bankCardNumber: at,
  bankName: st,
  bank_card_number: ht,
  bank_name: ut,
  bgImage: Jn,
  borderStyle: ke,
  bottomRounded: Pc,
  cancel: Oe,
  carouselStyle: Vn,
  categoryImage: Wc,
  categoryName: Uc,
  company: gt,
  confirm: Fe,
  contentName: Je,
  countDownStyle: jc,
  couponBtnText: vn,
  couponBtnTextPlaceholder: $n,
  couponContent: Pn,
  couponData: fn,
  couponItemStyle: Nn,
  couponMoney: In,
  couponNum: zn,
  couponPlaceholder: _n,
  couponSelectContentPrice: Nc,
  couponSelectContentThreshold: Ic,
  couponSelectContentTips: Ac,
  couponSelectContentTitle: wc,
  couponSelectContentTitlePlaceholder: xc,
  couponSelectContentType: Gc,
  couponSubTitle: Tn,
  couponSubTitleColor: Gn,
  couponSubTitlePlaceholder: jn,
  couponTitle: yn,
  couponTitleColor: xn,
  couponTitlePlaceholder: Cn,
  couponTitleStyle: wn,
  customerName: ft,
  default: Gm,
  defaultGoodsSelect: zt,
  email: jt,
  emptyData: He,
  fenxiaoCommissionPriceColor: Jt,
  goodsAddCart: Vt,
  goodsBgColor: Bt,
  goodsBtnColor: Ot,
  goodsBtnIsShow: Kt,
  goodsBtnResult: qt,
  goodsBtnStyle: Yt,
  goodsBtnText: Dt,
  goodsBtnTextPlaceholder: Rt,
  goodsBuyBtn: Ut,
  goodsCartIncident: Ht,
  goodsCategoryPlaceholder: on,
  goodsCategorySelectContentImage: vc,
  goodsCategorySelectContentName: _c,
  goodsCategorySelectContentPlaceholder: $c,
  goodsData: ln,
  goodsDetail: Xt,
  goodsFixedPrice: ze,
  goodsIsBold: tn,
  goodsLabel: nn,
  goodsNameColor: Mt,
  goodsNumColor: Ft,
  goodsPlaceholder: en,
  goodsPriceColor: Lt,
  goodsRounded: Zt,
  goodsSaleColor: Et,
  goodsSaleNum: Qt,
  goodsSearchSet: Dn,
  goodsSearchText: Rn,
  goodsSearchTextPlaceholder: En,
  goodsSelectPopupAfterTip: le,
  goodsSelectPopupAllGoods: Qo,
  goodsSelectPopupBeforeTip: re,
  goodsSelectPopupClearGoods: ie,
  goodsSelectPopupGoodsCategory: oe,
  goodsSelectPopupGoodsCategoryPlaceholder: ee,
  goodsSelectPopupGoodsInfo: ce,
  goodsSelectPopupGoodsMaxTip: pe,
  goodsSelectPopupGoodsMinTip: de,
  goodsSelectPopupGoodsName: Zo,
  goodsSelectPopupGoodsNamePlaceholder: Jo,
  goodsSelectPopupGoodsPointUnit: $t,
  goodsSelectPopupGoodsPriceUnit: wt,
  goodsSelectPopupGoodsStatusPlaceholder: vt,
  goodsSelectPopupGoodsType: te,
  goodsSelectPopupGoodsTypePlaceholder: ne,
  goodsSelectPopupPiece: Vo,
  goodsSelectPopupPrice: se,
  goodsSelectPopupSaleNum: ae,
  goodsSelectPopupSelect: Ho,
  goodsSelectPopupSelectGoodsButton: Ko,
  goodsSelectPopupSelectGoodsDialog: Yo,
  goodsSelectPopupSelectedGoods: Xo,
  goodsSelectPopupStock: _t,
  goodsSet: Ln,
  goodsShowContent: Wt,
  goodsSourceName: sc,
  goodsStyle: At,
  goodsTextColor: xt,
  headStyle1: cn,
  headStyle2: sn,
  headStyle3: an,
  headStyle4: rn,
  headerName: et,
  headerType: ot,
  imageRounded: yc,
  individual: pt,
  invoiceAmount: yt,
  invoiceContent: mt,
  invoiceEmpty: dt,
  invoiceInfo: Ve,
  invoiceMoney: Xe,
  invoiceNumber: Ye,
  invoiceStatus: rt,
  invoiceTime: Ze,
  invoiceType: Qe,
  invoiced: it,
  less: Me,
  listFrameColor: Sc,
  manyGoodsLisAddItem: Sn,
  manyGoodsListAroundRadius: mn,
  manyGoodsListCategoryName: un,
  manyGoodsListCategorySet: An,
  manyGoodsListSourceCategory: Mn,
  manyGoodsListSourceDiy: Bn,
  manyGoodsListSubTitle: hn,
  newcomerNumberBg: bc,
  newcomerNumberColor: kc,
  newcomerOtherColor: zc,
  notInvoiced: Tt,
  o2oGoodsCategorySelectContentImage: me,
  o2oGoodsCategorySelectContentName: ge,
  o2oGoodsSelectContentPlaceholder: Be,
  o2oSelectContentTips: Ce,
  o2oSelectPopupCardCategory: Pe,
  o2oSelectPopupCardInfo: ue,
  o2oSelectPopupCardName: fe,
  o2oSelectPopupCardNamePlaceholder: ye,
  o2oSelectPopupCardPrice: he,
  o2oSelectPopupCardSaleNum: Se,
  orderMoney: kt,
  orderStatus: qe,
  pointExchangeSelectContentGoodsInfo: Lc,
  pointExchangeSelectContentPointUnit: Rc,
  pointExchangeSelectContentPrice: Dc,
  pointExchangeSelectContentPriceUnit: Ec,
  pointExchangeSelectContentRedeemedAndSurplus: Oc,
  pointExchangeSelectContentTips: Fc,
  pointExchangeSelectContentTitle: Bc,
  pointExchangeSelectContentTitlePlaceholder: Mc,
  price: gn,
  rankName: tc,
  rankNamePlaceholder: nc,
  rankSelect: ec,
  rankSelectPopupAfterTip: lc,
  rankSelectPopupGoodsMaxTip: dc,
  rankSelectPopupGoodsMinTip: ic,
  rankSelectPopupSelectRankButton: bt,
  rankTextColor: uc,
  rankTypeName: rc,
  rankingStyle: Cc,
  rankingSubTitle: gc,
  rankingSubTitleLink: hc,
  rankingSubTitleTextColor: mc,
  rankingTitleIcon: oc,
  rankingTitleImage: pc,
  recommendIndicatorActiveColor: Xn,
  recommendIndicatorColor: Qn,
  recommendIndicatorStyle: Yn,
  ruleTypeName: ac,
  sales: pn,
  searchContent: _e,
  searchPlaceholder: be,
  searchStyle: je,
  selectCoupon: kn,
  selectTag: Le,
  selectTechnican: Ke,
  shop: We,
  shopGoodsRecommendComponentButtonBorderColor: Hn,
  shopGoodsRecommendComponentTag: Wn,
  shopGoodsRecommendComponentTagColor: qn,
  shopGoodsRecommendComponentTagPlaceholder: Kn,
  shopMemberInfoComponentAccount: Un,
  shopMemberInfoComponentAccountTextColor: Fn,
  shopMemberInfoComponentUidTextColor: On,
  showGoodsNum: cc,
  showTitle: Te,
  sortWay: dn,
  styleRecommend: Tc,
  subTextColor: Nt,
  tagColor: Ee,
  tagId: De,
  tagName: Re,
  taxNumber: tt,
  taxpayerId: Pt,
  technicianInfo: Ue,
  technicianSelectContentTips: Ae,
  technicianSelectPopupCardInfo: Ge,
  technicianSelectPopupCardMobile: $e,
  technicianSelectPopupCardMobilePlaceholder: xe,
  technicianSelectPopupCardName: ve,
  technicianSelectPopupCardNamePlaceholder: we,
  technicianSelectPopupCardSeniority: Ne,
  technicianSelectPopupCardSex: Ie,
  telephone: nt,
  textColor: Gt,
  toInvoice: lt,
  topRounded: fc,
  wayPlaceholder: It
}, Symbol.toStringTag, { value: "Module" })), qc = "华为云存储", Kc = "桶名称", Hc = "请输入桶名称", Vc = "端点节点", Yc = "请输入端点节点", Qc = "AccessKey", Xc = "请输入AccessKey", Zc = "SecretKey", Jc = "请输入SecretKey", os = "", es = "", Im = {
  huaweiStorage: qc,
  huaweiBucket: Kc,
  huaweiBucketPlaceholder: Hc,
  huaweiEndpoint: Vc,
  huaweiEndpointPlaceholder: Yc,
  huaweiAccessKey: Qc,
  huaweiAccessKeyPlaceholder: Xc,
  huaweiSecretKey: Zc,
  huaweiSecretKeyPlaceholder: Jc,
  huaweiEndpointTips: os,
  huaweiBucketTips: es
}, Am = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Im,
  huaweiAccessKey: Qc,
  huaweiAccessKeyPlaceholder: Xc,
  huaweiBucket: Kc,
  huaweiBucketPlaceholder: Hc,
  huaweiBucketTips: es,
  huaweiEndpoint: Vc,
  huaweiEndpointPlaceholder: Yc,
  huaweiEndpointTips: os,
  huaweiSecretKey: Zc,
  huaweiSecretKeyPlaceholder: Jc,
  huaweiStorage: qc
}, Symbol.toStringTag, { value: "Module" })), ts = "华为云短信", ns = "短信签名", cs = "请输入短信签名", ss = "APP_KEY", as = "请输入APP_KEY", rs = "APP_SECRET", ls = "请输入APP_SECRET", Bm = {
  huaweiSms: ts,
  huaweiSign: ns,
  huaweiSignPlaceholder: cs,
  huaweiAppKey: ss,
  huaweiAppKeyPlaceholder: as,
  huaweiAppSecret: rs,
  huaweiAppSecretPlaceholder: ls
}, Mm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bm,
  huaweiAppKey: ss,
  huaweiAppKeyPlaceholder: as,
  huaweiAppSecret: rs,
  huaweiAppSecretPlaceholder: ls,
  huaweiSign: ns,
  huaweiSignPlaceholder: cs,
  huaweiSms: ts
}, Symbol.toStringTag, { value: "Module" })), is = "选择项目", ds = "已选", ps = "个", gs = "项目选择", ms = "全部项目", us = "已选项目", hs = "目名称", Ss = "请输入项目名称", fs = "项目分类", Ps = "全部", ys = "项目类型", Cs = "请选择项目类型", Ts = "项目", js = "价格", ks = "销量", bs = "已选择", zs = "个项目", _s = "取消选择", vs = "所选项目数量不能少于", $s = "所选项目数量不能超过", ws = "分类名称", xs = "分类图片", Gs = "项目信息", Ns = "销售价", Is = "销量", As = "项目名称", Bs = "项目分类", Ms = "请输入项目名称", Ls = "所选服务项目不能少于1个", Ds = "显示标题", Rs = "搜索样式", Es = "边框类型", Os = "搜索内容", Fs = "指定会员价", Us = "搜索内容", Ws = "技师名称", qs = "手机号", Ks = "请输入技师名称", Hs = "请输入手机号", Vs = "技师信息", Ys = "工龄", Qs = "性别", Xs = "所选技师不能少于1个", Zs = "请选择项目分类", Lm = {
  goodsSelectPopupSelectGoodsButton: is,
  goodsSelectPopupSelect: ds,
  goodsSelectPopupPiece: ps,
  goodsSelectPopupSelectGoodsDialog: gs,
  goodsSelectPopupAllGoods: ms,
  goodsSelectPopupSelectedGoods: us,
  goodsSelectPopupGoodsName: hs,
  goodsSelectPopupGoodsNamePlaceholder: Ss,
  goodsSelectPopupGoodsCategory: fs,
  goodsSelectPopupGoodsCategoryPlaceholder: Ps,
  goodsSelectPopupGoodsType: ys,
  goodsSelectPopupGoodsTypePlaceholder: Cs,
  goodsSelectPopupGoodsInfo: Ts,
  goodsSelectPopupPrice: js,
  goodsSelectPopupSaleNum: ks,
  goodsSelectPopupBeforeTip: bs,
  goodsSelectPopupAfterTip: zs,
  goodsSelectPopupClearGoods: _s,
  goodsSelectPopupGoodsMinTip: vs,
  goodsSelectPopupGoodsMaxTip: $s,
  o2oGoodsCategorySelectContentName: ws,
  o2oGoodsCategorySelectContentImage: xs,
  o2oSelectPopupCardInfo: Gs,
  o2oSelectPopupCardPrice: Ns,
  o2oSelectPopupCardSaleNum: Is,
  o2oSelectPopupCardName: As,
  o2oSelectPopupCardCategory: Bs,
  o2oSelectPopupCardNamePlaceholder: Ms,
  o2oSelectContentTips: Ls,
  showTitle: Ds,
  searchStyle: Rs,
  borderStyle: Es,
  searchPlaceholder: Os,
  goodsFixedPrice: Fs,
  searchContent: Us,
  technicianSelectPopupCardName: Ws,
  technicianSelectPopupCardMobile: qs,
  technicianSelectPopupCardNamePlaceholder: Ks,
  technicianSelectPopupCardMobilePlaceholder: Hs,
  technicianSelectPopupCardInfo: Vs,
  technicianSelectPopupCardSeniority: Ys,
  technicianSelectPopupCardSex: Qs,
  technicianSelectContentTips: Xs,
  o2oGoodsSelectContentPlaceholder: Zs
}, Dm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  borderStyle: Es,
  default: Lm,
  goodsFixedPrice: Fs,
  goodsSelectPopupAfterTip: zs,
  goodsSelectPopupAllGoods: ms,
  goodsSelectPopupBeforeTip: bs,
  goodsSelectPopupClearGoods: _s,
  goodsSelectPopupGoodsCategory: fs,
  goodsSelectPopupGoodsCategoryPlaceholder: Ps,
  goodsSelectPopupGoodsInfo: Ts,
  goodsSelectPopupGoodsMaxTip: $s,
  goodsSelectPopupGoodsMinTip: vs,
  goodsSelectPopupGoodsName: hs,
  goodsSelectPopupGoodsNamePlaceholder: Ss,
  goodsSelectPopupGoodsType: ys,
  goodsSelectPopupGoodsTypePlaceholder: Cs,
  goodsSelectPopupPiece: ps,
  goodsSelectPopupPrice: js,
  goodsSelectPopupSaleNum: ks,
  goodsSelectPopupSelect: ds,
  goodsSelectPopupSelectGoodsButton: is,
  goodsSelectPopupSelectGoodsDialog: gs,
  goodsSelectPopupSelectedGoods: us,
  o2oGoodsCategorySelectContentImage: xs,
  o2oGoodsCategorySelectContentName: ws,
  o2oGoodsSelectContentPlaceholder: Zs,
  o2oSelectContentTips: Ls,
  o2oSelectPopupCardCategory: Bs,
  o2oSelectPopupCardInfo: Gs,
  o2oSelectPopupCardName: As,
  o2oSelectPopupCardNamePlaceholder: Ms,
  o2oSelectPopupCardPrice: Ns,
  o2oSelectPopupCardSaleNum: Is,
  searchContent: Us,
  searchPlaceholder: Os,
  searchStyle: Rs,
  showTitle: Ds,
  technicianSelectContentTips: Xs,
  technicianSelectPopupCardInfo: Vs,
  technicianSelectPopupCardMobile: qs,
  technicianSelectPopupCardMobilePlaceholder: Hs,
  technicianSelectPopupCardName: Ws,
  technicianSelectPopupCardNamePlaceholder: Ks,
  technicianSelectPopupCardSeniority: Ys,
  technicianSelectPopupCardSex: Qs
}, Symbol.toStringTag, { value: "Module" })), Js = "头部信息", oa = "进行中", ea = "请输入进行中文案", ta = "即将开始", na = "请输入即将开始文案", ca = "导航设置", sa = "添加导航", aa = "商品信息", ra = "选择商品", la = "全部商品", ia = "选择场次", da = "手动选择", pa = "商品数量", ga = "选择场次", ma = "购买按钮", ua = "文本", ha = "请输入文字", Sa = "头部样式", fa = "选中文字颜色", Pa = "选中背景颜色", ya = "常规文字颜色", Ca = "常规背景颜色", Ta = "商品样式", ja = "商品背景", ka = "背景颜色", ba = "圆角", za = "请选择场次", _a = "请选择秒杀商品", va = "展示方式", $a = "文字", wa = "图片", xa = "参与会员", Ga = "标题", Na = "请输入标题", Ia = "副标题内容", Aa = "副标题", Ba = "请输入副标题", Ma = "“更多”内容", La = "商品风格", Da = "文本样式", Ra = "常规", Ea = "斜体", Oa = "图片圆角", Fa = "板块内容", Ua = "背景图", Wa = "标题颜色", qa = "副标题颜色", Ka = "添加板块", Ha = "板块样式", Va = "按钮内容", Ya = "编号颜色", Qa = "账户颜色", Xa = "账号信息", Rm = {
  seckillHeadInfo: Js,
  seckillProgressLabel: oa,
  seckillProgressPlaceholder: ea,
  seckillInComingLabel: ta,
  seckillInComingPlaceholder: na,
  seckillNavSetting: ca,
  seckillAddHeadNav: sa,
  seckillGoodsInfo: aa,
  seckillSelectGoodsLabel: ra,
  seckillAllSources: la,
  seckillTimeSources: ia,
  seckillManualSources: da,
  seckillGoodsNum: pa,
  seckillSelectTime: ga,
  seckillBuyBtn: ma,
  seckillText: ua,
  seckillTextPlaceholder: ha,
  seckillHeadStyle: Sa,
  seckillSelectTextColor: fa,
  seckillSelectBgColor: Pa,
  seckillNormalTextColor: ya,
  seckillNormalBgColor: Ca,
  seckillGoodsStyle: Ta,
  seckillGoodsBgColor: ja,
  seckillBgColor: ka,
  seckillRounded: ba,
  seckillSelectTimePlaceholder: za,
  seckillSelectGoodsPlaceholder: _a,
  seckillShowWay: va,
  seckillWayText: $a,
  seckillWayImg: wa,
  seckillWayMember: xa,
  seckillTitleLabel: Ga,
  seckillTitlePlaceholder: Na,
  seckillSubTitleContent: Ia,
  seckillSubTitleLabel: Aa,
  seckillSubTitlePlaceholder: Ba,
  seckillMoreContent: Ma,
  seckillGoodsStyleContent: La,
  seckillTextStyleLabel: Da,
  seckillTextStyleNormal: Ra,
  seckillTextStyleItalics: Ea,
  seckillImageRounded: Oa,
  seckillBlockContent: Fa,
  seckillBgUrl: Ua,
  seckillTitleColorLabel: Wa,
  seckillSubTitleColorLabel: qa,
  seckillAddBlock: Ka,
  seckillBlockStyle: Ha,
  seckillBtnContent: Va,
  seckillMemberInfoComponentUidTextColor: Ya,
  seckillMemberInfoComponentAccountTextColor: Qa,
  seckillMemberInfoComponentAccount: Xa
}, Em = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rm,
  seckillAddBlock: Ka,
  seckillAddHeadNav: sa,
  seckillAllSources: la,
  seckillBgColor: ka,
  seckillBgUrl: Ua,
  seckillBlockContent: Fa,
  seckillBlockStyle: Ha,
  seckillBtnContent: Va,
  seckillBuyBtn: ma,
  seckillGoodsBgColor: ja,
  seckillGoodsInfo: aa,
  seckillGoodsNum: pa,
  seckillGoodsStyle: Ta,
  seckillGoodsStyleContent: La,
  seckillHeadInfo: Js,
  seckillHeadStyle: Sa,
  seckillImageRounded: Oa,
  seckillInComingLabel: ta,
  seckillInComingPlaceholder: na,
  seckillManualSources: da,
  seckillMemberInfoComponentAccount: Xa,
  seckillMemberInfoComponentAccountTextColor: Qa,
  seckillMemberInfoComponentUidTextColor: Ya,
  seckillMoreContent: Ma,
  seckillNavSetting: ca,
  seckillNormalBgColor: Ca,
  seckillNormalTextColor: ya,
  seckillProgressLabel: oa,
  seckillProgressPlaceholder: ea,
  seckillRounded: ba,
  seckillSelectBgColor: Pa,
  seckillSelectGoodsLabel: ra,
  seckillSelectGoodsPlaceholder: _a,
  seckillSelectTextColor: fa,
  seckillSelectTime: ga,
  seckillSelectTimePlaceholder: za,
  seckillShowWay: va,
  seckillSubTitleColorLabel: qa,
  seckillSubTitleContent: Ia,
  seckillSubTitleLabel: Aa,
  seckillSubTitlePlaceholder: Ba,
  seckillText: ua,
  seckillTextPlaceholder: ha,
  seckillTextStyleItalics: Ea,
  seckillTextStyleLabel: Da,
  seckillTextStyleNormal: Ra,
  seckillTimeSources: ia,
  seckillTitleColorLabel: Wa,
  seckillTitleLabel: Ga,
  seckillTitlePlaceholder: Na,
  seckillWayImg: wa,
  seckillWayMember: xa,
  seckillWayText: $a
}, Symbol.toStringTag, { value: "Module" })), Za = "选择商品", Ja = "选择榜单", or = "已选", er = "个", tr = "商品选择", nr = "全部商品", cr = "默认", sr = "已选商品", ar = "商品名称", rr = "请输入商品名称", lr = "请选择商品状态", ir = "商品分类", dr = "全部", pr = "商品类型", gr = "请选择商品类型", mr = "商品", ur = "积分", hr = "元", Sr = "价格", fr = "库存", Pr = "已选择", yr = "个商品", Cr = "取消选择", Tr = "所选商品数量不能少于", jr = "所选商品数量不能超过", kr = "文字颜色", br = "标题颜色", zr = "副标题颜色", _r = "虚拟商品和实物商品只能选择其中一个类型，请重新选择", vr = "商品样式", $r = "商品背景", wr = "商品名称", xr = "销售价", Gr = "文本", Nr = "请输入按钮文字", Ir = "商品销量", Ar = "按钮背景", Br = "已兑人数", Mr = "购买按钮", Lr = "显示内容", Dr = "按钮效果", Rr = "是否显示", Er = "点击事件", Or = "加入购物车", Fr = "样式", Ur = "商品销量", Wr = "商品详情", qr = "圆角", Kr = "分销佣金", Hr = "请选择商品分类", Vr = "请选择商品", Yr = "是否加粗", Qr = "商品标签", Xr = "样式1", Zr = "样式2", Jr = "样式3", ol = "样式4", el = "商品数据", tl = "排序", nl = "销量", cl = "价格", sl = "图片圆角", al = "分类名称", rl = "副标题", ll = "添加一个多商品组", il = "优惠券数据", dl = "优惠券内容", pl = "标题", gl = "请输入标题", ml = "副标题", ul = "请输入副标题", hl = "选择优惠券", Sl = "全部", fl = "优惠券数量", Pl = "请选择优惠券", yl = "按钮文字", Cl = "请输入按钮文字", Tl = "标题样式", jl = "标题颜色", kl = "副标题颜色", bl = "优惠券项样式", zl = "金额颜色", _l = "分组设置", vl = "自定义", $l = "商品分类", wl = "商品设置", xl = "搜索设置", Gl = "搜索内容", Nl = "请输入搜索内容", Il = "编号颜色", Al = "账户颜色", Bl = "账号信息", Ml = "标签", Ll = "标签颜色", Dl = "请输入标签内容", Rl = "按钮边框颜色", El = "轮播样式", Ol = "指示器设置", Fl = "常规颜色", Ul = "选中颜色", Wl = "板块内容", ql = "背景图片", Kl = "图标", Hl = "榜单选择", Vl = "榜单名称", Yl = "请输入榜单名称", Ql = "榜单商品数量", Xl = "商品来源", Zl = "排序规则", Jl = "排行周期", oi = "个榜单", ei = "所选榜单数量不能少于", ti = "所选榜单数量不能超过", ni = "头部图片", ci = "副标题", si = "副标题颜色", ai = "名称颜色", ri = "副标题链接", li = "背景颜色", ii = "上圆角", di = "下圆角", pi = "图片圆角", gi = "板块样式", mi = "风格推荐", ui = "倒计时样式", hi = "数字颜色", Si = "数字背景色", fi = "文字颜色", Pi = "分类名称", yi = "分类图片", Ci = "请选择商品分类", Ti = "优惠券名称", ji = "请输入优惠券名称", ki = "类型", bi = "面值", zi = "使用门槛", _i = "请选择优惠券", vi = "商品名称", $i = "请输入商品名称", wi = "商品信息", xi = "兑换价格", Gi = "积分", Ni = "元", Ii = "已兑/剩余", Ai = "请选择积分商品", Bi = "分类名称", Mi = "分类图片", Om = {
  goodsSelectPopupSelectGoodsButton: Za,
  rankSelectPopupSelectRankButton: Ja,
  goodsSelectPopupSelect: or,
  goodsSelectPopupPiece: er,
  goodsSelectPopupSelectGoodsDialog: tr,
  goodsSelectPopupAllGoods: nr,
  defaultGoodsSelect: cr,
  goodsSelectPopupSelectedGoods: sr,
  goodsSelectPopupGoodsName: ar,
  goodsSelectPopupGoodsNamePlaceholder: rr,
  goodsSelectPopupGoodsStatusPlaceholder: lr,
  goodsSelectPopupGoodsCategory: ir,
  goodsSelectPopupGoodsCategoryPlaceholder: dr,
  goodsSelectPopupGoodsType: pr,
  goodsSelectPopupGoodsTypePlaceholder: gr,
  goodsSelectPopupGoodsInfo: mr,
  goodsSelectPopupGoodsPointUnit: ur,
  goodsSelectPopupGoodsPriceUnit: hr,
  goodsSelectPopupPrice: Sr,
  goodsSelectPopupStock: fr,
  goodsSelectPopupBeforeTip: Pr,
  goodsSelectPopupAfterTip: yr,
  goodsSelectPopupClearGoods: Cr,
  goodsSelectPopupGoodsMinTip: Tr,
  goodsSelectPopupGoodsMaxTip: jr,
  goodsTextColor: kr,
  textColor: br,
  subTextColor: zr,
  wayPlaceholder: _r,
  goodsStyle: vr,
  goodsBgColor: $r,
  goodsNameColor: wr,
  goodsPriceColor: xr,
  goodsBtnText: Gr,
  goodsBtnTextPlaceholder: Nr,
  goodsSaleColor: Ir,
  goodsBtnColor: Ar,
  goodsNumColor: Br,
  goodsBuyBtn: Mr,
  goodsShowContent: Lr,
  goodsBtnResult: Dr,
  goodsBtnIsShow: Rr,
  goodsCartIncident: Er,
  goodsAddCart: Or,
  goodsBtnStyle: Fr,
  goodsSaleNum: Ur,
  goodsDetail: Wr,
  goodsRounded: qr,
  fenxiaoCommissionPriceColor: Kr,
  goodsCategoryPlaceholder: Hr,
  goodsPlaceholder: Vr,
  goodsIsBold: Yr,
  goodsLabel: Qr,
  headStyle1: Xr,
  headStyle2: Zr,
  headStyle3: Jr,
  headStyle4: ol,
  goodsData: el,
  sortWay: tl,
  default: "综合",
  sales: nl,
  price: cl,
  manyGoodsListAroundRadius: sl,
  manyGoodsListCategoryName: al,
  manyGoodsListSubTitle: rl,
  manyGoodsLisAddItem: ll,
  couponData: il,
  couponContent: dl,
  couponTitle: pl,
  couponTitlePlaceholder: gl,
  couponSubTitle: ml,
  couponSubTitlePlaceholder: ul,
  selectCoupon: hl,
  allSources: Sl,
  couponNum: fl,
  couponPlaceholder: Pl,
  couponBtnText: yl,
  couponBtnTextPlaceholder: Cl,
  couponTitleStyle: Tl,
  couponTitleColor: jl,
  couponSubTitleColor: kl,
  couponItemStyle: bl,
  couponMoney: zl,
  manyGoodsListCategorySet: _l,
  manyGoodsListSourceDiy: vl,
  manyGoodsListSourceCategory: $l,
  goodsSet: wl,
  goodsSearchSet: xl,
  goodsSearchText: Gl,
  goodsSearchTextPlaceholder: Nl,
  shopMemberInfoComponentUidTextColor: Il,
  shopMemberInfoComponentAccountTextColor: Al,
  shopMemberInfoComponentAccount: Bl,
  shopGoodsRecommendComponentTag: Ml,
  shopGoodsRecommendComponentTagColor: Ll,
  shopGoodsRecommendComponentTagPlaceholder: Dl,
  shopGoodsRecommendComponentButtonBorderColor: Rl,
  carouselStyle: El,
  recommendIndicatorStyle: Ol,
  recommendIndicatorColor: Fl,
  recommendIndicatorActiveColor: Ul,
  activeCubeBlockContent: Wl,
  bgImage: ql,
  rankingTitleIcon: Kl,
  rankSelect: Hl,
  rankName: Vl,
  rankNamePlaceholder: Yl,
  showGoodsNum: Ql,
  goodsSourceName: Xl,
  ruleTypeName: Zl,
  rankTypeName: Jl,
  rankSelectPopupAfterTip: oi,
  rankSelectPopupGoodsMinTip: ei,
  rankSelectPopupGoodsMaxTip: ti,
  rankingTitleImage: ni,
  rankingSubTitle: ci,
  rankingSubTitleTextColor: si,
  rankTextColor: ai,
  rankingSubTitleLink: ri,
  listFrameColor: li,
  topRounded: ii,
  bottomRounded: di,
  imageRounded: pi,
  rankingStyle: gi,
  styleRecommend: mi,
  countDownStyle: ui,
  newcomerNumberColor: hi,
  newcomerNumberBg: Si,
  newcomerOtherColor: fi,
  goodsCategorySelectContentName: Pi,
  goodsCategorySelectContentImage: yi,
  goodsCategorySelectContentPlaceholder: Ci,
  couponSelectContentTitle: Ti,
  couponSelectContentTitlePlaceholder: ji,
  couponSelectContentType: ki,
  couponSelectContentPrice: bi,
  couponSelectContentThreshold: zi,
  couponSelectContentTips: _i,
  pointExchangeSelectContentTitle: vi,
  pointExchangeSelectContentTitlePlaceholder: $i,
  pointExchangeSelectContentGoodsInfo: wi,
  pointExchangeSelectContentPrice: xi,
  pointExchangeSelectContentPointUnit: Gi,
  pointExchangeSelectContentPriceUnit: Ni,
  pointExchangeSelectContentRedeemedAndSurplus: Ii,
  pointExchangeSelectContentTips: Ai,
  categoryName: Bi,
  categoryImage: Mi
}, Fm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activeCubeBlockContent: Wl,
  allSources: Sl,
  bgImage: ql,
  bottomRounded: di,
  carouselStyle: El,
  categoryImage: Mi,
  categoryName: Bi,
  countDownStyle: ui,
  couponBtnText: yl,
  couponBtnTextPlaceholder: Cl,
  couponContent: dl,
  couponData: il,
  couponItemStyle: bl,
  couponMoney: zl,
  couponNum: fl,
  couponPlaceholder: Pl,
  couponSelectContentPrice: bi,
  couponSelectContentThreshold: zi,
  couponSelectContentTips: _i,
  couponSelectContentTitle: Ti,
  couponSelectContentTitlePlaceholder: ji,
  couponSelectContentType: ki,
  couponSubTitle: ml,
  couponSubTitleColor: kl,
  couponSubTitlePlaceholder: ul,
  couponTitle: pl,
  couponTitleColor: jl,
  couponTitlePlaceholder: gl,
  couponTitleStyle: Tl,
  default: Om,
  defaultGoodsSelect: cr,
  fenxiaoCommissionPriceColor: Kr,
  goodsAddCart: Or,
  goodsBgColor: $r,
  goodsBtnColor: Ar,
  goodsBtnIsShow: Rr,
  goodsBtnResult: Dr,
  goodsBtnStyle: Fr,
  goodsBtnText: Gr,
  goodsBtnTextPlaceholder: Nr,
  goodsBuyBtn: Mr,
  goodsCartIncident: Er,
  goodsCategoryPlaceholder: Hr,
  goodsCategorySelectContentImage: yi,
  goodsCategorySelectContentName: Pi,
  goodsCategorySelectContentPlaceholder: Ci,
  goodsData: el,
  goodsDetail: Wr,
  goodsIsBold: Yr,
  goodsLabel: Qr,
  goodsNameColor: wr,
  goodsNumColor: Br,
  goodsPlaceholder: Vr,
  goodsPriceColor: xr,
  goodsRounded: qr,
  goodsSaleColor: Ir,
  goodsSaleNum: Ur,
  goodsSearchSet: xl,
  goodsSearchText: Gl,
  goodsSearchTextPlaceholder: Nl,
  goodsSelectPopupAfterTip: yr,
  goodsSelectPopupAllGoods: nr,
  goodsSelectPopupBeforeTip: Pr,
  goodsSelectPopupClearGoods: Cr,
  goodsSelectPopupGoodsCategory: ir,
  goodsSelectPopupGoodsCategoryPlaceholder: dr,
  goodsSelectPopupGoodsInfo: mr,
  goodsSelectPopupGoodsMaxTip: jr,
  goodsSelectPopupGoodsMinTip: Tr,
  goodsSelectPopupGoodsName: ar,
  goodsSelectPopupGoodsNamePlaceholder: rr,
  goodsSelectPopupGoodsPointUnit: ur,
  goodsSelectPopupGoodsPriceUnit: hr,
  goodsSelectPopupGoodsStatusPlaceholder: lr,
  goodsSelectPopupGoodsType: pr,
  goodsSelectPopupGoodsTypePlaceholder: gr,
  goodsSelectPopupPiece: er,
  goodsSelectPopupPrice: Sr,
  goodsSelectPopupSelect: or,
  goodsSelectPopupSelectGoodsButton: Za,
  goodsSelectPopupSelectGoodsDialog: tr,
  goodsSelectPopupSelectedGoods: sr,
  goodsSelectPopupStock: fr,
  goodsSet: wl,
  goodsShowContent: Lr,
  goodsSourceName: Xl,
  goodsStyle: vr,
  goodsTextColor: kr,
  headStyle1: Xr,
  headStyle2: Zr,
  headStyle3: Jr,
  headStyle4: ol,
  imageRounded: pi,
  listFrameColor: li,
  manyGoodsLisAddItem: ll,
  manyGoodsListAroundRadius: sl,
  manyGoodsListCategoryName: al,
  manyGoodsListCategorySet: _l,
  manyGoodsListSourceCategory: $l,
  manyGoodsListSourceDiy: vl,
  manyGoodsListSubTitle: rl,
  newcomerNumberBg: Si,
  newcomerNumberColor: hi,
  newcomerOtherColor: fi,
  pointExchangeSelectContentGoodsInfo: wi,
  pointExchangeSelectContentPointUnit: Gi,
  pointExchangeSelectContentPrice: xi,
  pointExchangeSelectContentPriceUnit: Ni,
  pointExchangeSelectContentRedeemedAndSurplus: Ii,
  pointExchangeSelectContentTips: Ai,
  pointExchangeSelectContentTitle: vi,
  pointExchangeSelectContentTitlePlaceholder: $i,
  price: cl,
  rankName: Vl,
  rankNamePlaceholder: Yl,
  rankSelect: Hl,
  rankSelectPopupAfterTip: oi,
  rankSelectPopupGoodsMaxTip: ti,
  rankSelectPopupGoodsMinTip: ei,
  rankSelectPopupSelectRankButton: Ja,
  rankTextColor: ai,
  rankTypeName: Jl,
  rankingStyle: gi,
  rankingSubTitle: ci,
  rankingSubTitleLink: ri,
  rankingSubTitleTextColor: si,
  rankingTitleIcon: Kl,
  rankingTitleImage: ni,
  recommendIndicatorActiveColor: Ul,
  recommendIndicatorColor: Fl,
  recommendIndicatorStyle: Ol,
  ruleTypeName: Zl,
  sales: nl,
  selectCoupon: hl,
  shopGoodsRecommendComponentButtonBorderColor: Rl,
  shopGoodsRecommendComponentTag: Ml,
  shopGoodsRecommendComponentTagColor: Ll,
  shopGoodsRecommendComponentTagPlaceholder: Dl,
  shopMemberInfoComponentAccount: Bl,
  shopMemberInfoComponentAccountTextColor: Al,
  shopMemberInfoComponentUidTextColor: Il,
  showGoodsNum: Ql,
  sortWay: tl,
  styleRecommend: mi,
  subTextColor: zr,
  textColor: br,
  topRounded: ii,
  wayPlaceholder: _r
}, Symbol.toStringTag, { value: "Module" })), Li = "成为分销商", Di = "是否展示会员成为分销商的按钮", Ri = "是", Ei = "否", Oi = "分销商信息", Fi = "分销等级", Ui = "状态", Wi = "请输入分销商昵称或者手机号", Um = {
  isBecomeFenxiao: Li,
  isBecomeFenxiaoDesc: Di,
  are: Ri,
  no: Ei,
  fenxiaoName: Oi,
  fenxiaoLevel: Fi,
  currentState: Ui,
  fenxiaoNamePlaceholder: Wi
}, Wm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  are: Ri,
  currentState: Ui,
  default: Um,
  fenxiaoLevel: Fi,
  fenxiaoName: Oi,
  fenxiaoNamePlaceholder: Wi,
  isBecomeFenxiao: Li,
  isBecomeFenxiaoDesc: Di,
  no: Ei
}, Symbol.toStringTag, { value: "Module" })), qi = "选择礼品卡", Ki = "已选", Hi = "张", Vi = "礼品卡选择", Yi = "全部礼品卡", Qi = "已选礼品卡", Xi = "礼品卡名称", Zi = "请输入礼品卡名称", Ji = "礼品卡分类", od = "全部", ed = "礼品卡信息", td = "价格", nd = "权益类型", cd = "请选择权益类型", sd = "有效期", ad = "永久有效", rd = "已选择", ld = "张礼品卡", id = "取消选择", dd = "所选礼品卡数量不能少于", pd = "所选礼品卡数量不能超过", gd = "来源", md = "数量", ud = "手动选择", hd = "礼品卡分类", Sd = "礼品卡样式", fd = "礼品卡背景", Pd = "礼品卡名称", yd = "请选择礼品卡分类", Cd = "请选择礼品卡", Td = "排序", jd = "销量", kd = "价格", bd = "刷新", zd = "刷新成功", _d = "添加分类", vd = "礼品卡分类", $d = "请选择礼品卡", qm = {
  giftcardSelectPopupButton: qi,
  giftcardSelectPopupSelect: Ki,
  giftcardSelectPopupPiece: Hi,
  giftcardSelectPopupSelectGiftcardDialog: Vi,
  giftcardSelectPopupAllGiftcard: Yi,
  giftcardSelectPopupSelectedGiftcard: Qi,
  giftcardSelectPopupCardName: Xi,
  giftcardSelectPopupCardNamePlaceholder: Zi,
  giftcardSelectPopupCardCategory: Ji,
  giftcardSelectPopupCardCategoryPlaceholder: od,
  giftcardSelectPopupCardInfo: ed,
  giftcardSelectPopupCardPrice: td,
  cardRightType: nd,
  cardRightTypePlaceholder: cd,
  validityType: sd,
  validityForever: ad,
  giftcardSelectPopupBeforeTip: rd,
  giftcardSelectPopupAfterTip: ld,
  giftcardSelectPopupClearGiftcard: id,
  giftcardSelectPopupGiftcardMinTip: dd,
  giftcardSelectPopupGiftcardMaxTip: pd,
  giftcardSource: gd,
  giftcardNum: md,
  customGiftcard: ud,
  giftcardCategoryTitle: hd,
  giftcardStyle: Sd,
  giftcardBgColor: fd,
  giftcardNameColor: Pd,
  giftcardCategoryPlaceholder: yd,
  giftcardPlaceholder: Cd,
  sortWay: Td,
  default: "综合",
  sales: jd,
  price: kd,
  refresh: bd,
  refreshSuccess: zd,
  addCategory: _d,
  selectCardCategory: vd,
  giftcardSelectContentTips: $d
}, Km = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addCategory: _d,
  cardRightType: nd,
  cardRightTypePlaceholder: cd,
  customGiftcard: ud,
  default: qm,
  giftcardBgColor: fd,
  giftcardCategoryPlaceholder: yd,
  giftcardCategoryTitle: hd,
  giftcardNameColor: Pd,
  giftcardNum: md,
  giftcardPlaceholder: Cd,
  giftcardSelectContentTips: $d,
  giftcardSelectPopupAfterTip: ld,
  giftcardSelectPopupAllGiftcard: Yi,
  giftcardSelectPopupBeforeTip: rd,
  giftcardSelectPopupButton: qi,
  giftcardSelectPopupCardCategory: Ji,
  giftcardSelectPopupCardCategoryPlaceholder: od,
  giftcardSelectPopupCardInfo: ed,
  giftcardSelectPopupCardName: Xi,
  giftcardSelectPopupCardNamePlaceholder: Zi,
  giftcardSelectPopupCardPrice: td,
  giftcardSelectPopupClearGiftcard: id,
  giftcardSelectPopupGiftcardMaxTip: pd,
  giftcardSelectPopupGiftcardMinTip: dd,
  giftcardSelectPopupPiece: Hi,
  giftcardSelectPopupSelect: Ki,
  giftcardSelectPopupSelectGiftcardDialog: Vi,
  giftcardSelectPopupSelectedGiftcard: Qi,
  giftcardSource: gd,
  giftcardStyle: Sd,
  price: kd,
  refresh: bd,
  refreshSuccess: zd,
  sales: jd,
  selectCardCategory: vd,
  sortWay: Td,
  validityForever: ad,
  validityType: sd
}, Symbol.toStringTag, { value: "Module" })), wd = "内容标题", xd = "请输入内容标题", Gd = "内容类型", Nd = "图文", Id = "短视频", Ad = "请选择内容类型", Bd = "内容封面", Md = "点赞数", Ld = "分享数", Dd = "评论数", Rd = "浏览量", Ed = "收藏数", Od = "发布时间", Fd = "评论内容", Ud = "请输入评论内容", Wd = "详情", qd = "内容作者", Kd = "内容话题", Hd = "内容简介", Vd = "宝贝信息", Yd = "会员信息", Qd = "回复数", Xd = "作者", Zd = "请选择内容", Hm = {
  contentTitle: wd,
  contentTitlePlaceholder: xd,
  contentType: Gd,
  imageText: Nd,
  shortVideo: Id,
  contentTypePlaceholder: Ad,
  contentCover: Bd,
  likeNum: Md,
  shareNum: Ld,
  commentNum: Dd,
  viewNum: Rd,
  collectNum: Ed,
  createTime: Od,
  commentContent: Fd,
  commentContentPlaceholder: Ud,
  detail: Wd,
  contentAuthor: qd,
  topicName: Kd,
  content: Hd,
  cwryInfo: Vd,
  memberInfo: Yd,
  replyNum: Qd,
  author: Xd,
  contentSelectContentTips: Zd
}, Vm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  author: Xd,
  collectNum: Ed,
  commentContent: Fd,
  commentContentPlaceholder: Ud,
  commentNum: Dd,
  content: Hd,
  contentAuthor: qd,
  contentCover: Bd,
  contentSelectContentTips: Zd,
  contentTitle: wd,
  contentTitlePlaceholder: xd,
  contentType: Gd,
  contentTypePlaceholder: Ad,
  createTime: Od,
  cwryInfo: Vd,
  default: Hm,
  detail: Wd,
  imageText: Nd,
  likeNum: Md,
  memberInfo: Yd,
  replyNum: Qd,
  shareNum: Ld,
  shortVideo: Id,
  topicName: Kd,
  viewNum: Rd
}, Symbol.toStringTag, { value: "Module" })), Jd = "选择线路", op = "线路选择", ep = "全部线路", tp = "线路名称", np = "请输入线路名称", cp = "线路信息", sp = "价格", ap = "库存", rp = "创建时间", lp = "选择景点", ip = "景点选择", dp = "全部景点", pp = "景点名称", gp = "请输入景点名称", mp = "景点信息", up = "选择酒店", hp = "酒店选择", Sp = "全部酒店", fp = "酒店名称", Pp = "请输入酒店名称", yp = "酒店信息", Cp = "开始日期", Tp = "结束日期", jp = "确定", kp = "取消", bp = "个线路", zp = "个景点", _p = "个酒店", vp = "所选线路数量不能少于", $p = "所选线路数量不能超过", wp = "所选景点数量不能少于", xp = "所选景点数量不能超过", Gp = "所选酒店数量不能少于", Np = "所选酒店数量不能超过", Ip = "会员价", Ap = "参与", Bp = "不参与", Mp = "会员等级折扣", Lp = "会员折扣", Dp = "指定折扣", Rp = "不参与", Ep = "会员折扣说明：按照默认会员等级折扣优惠", Op = "指定折扣：按照设置的折扣优惠", Fp = "编辑会员价", Up = "商品规格", Wp = "会员享受折扣", qp = "折", Kp = "元", Hp = "修改会员价", Vp = "会员等级", Yp = "请输入会员价", Qp = "会员价说明：指定优惠价格", Xp = "日历会员价", Zp = "日期设置", Jp = "请选择要操作的数据", og = "日期范围", eg = "一星", tg = "二星", ng = "三星", cg = "四星", sg = "五星", ag = "酒店星级", rg = "酒店地址", lg = "酒店状态", ig = "景点星级", dg = "景点地址", pg = "景点状态", gg = "线路名称", mg = "线路信息", ug = "请输入线路名称", hg = "线路图片", Sg = "销售价格", fg = "是否上架", Pg = "出发城市", yg = "请输入出发城市", Cg = "目的地", Tg = "请输入目的地", jg = "费用说明", kg = "添加时间", bg = "请输入添加时间", zg = "添加线路", _g = "编辑旅游线路", vg = "确定要删除该旅游线路吗？", $g = "线路价格", wg = "线路库存", xg = "线路城市", Gg = "请选择开始时间", Ng = "请选择结束时间", Ig = "请选择景点", Ag = "请选择线路", Bg = "请选择酒店", Ym = {
  travelSelectPopupSelectTravelButton: Jd,
  travelSelectPopupSelectGoodsDialog: op,
  travelSelectPopupAllTravel: ep,
  wayNameSelectPopup: tp,
  wayNameSelectPopupPlaceholder: np,
  wayInfoPopup: cp,
  tourismPricePopup: sp,
  tourismStockPopup: ap,
  goodsSelectPopupCreateTime: rp,
  ticketsSelectPopupSelectTicketsButton: lp,
  ticketsSelectPopupSelectGoodsDialog: ip,
  ticketsSelectPopupAllTickets: dp,
  scenicNameSelectPopup: pp,
  scenicNameSelectPopupPlaceholder: gp,
  scenicInfo: mp,
  hotelSelectPopupSelectHotelButton: up,
  hotelSelectPopupSelectGoodsDialog: hp,
  hotelSelectPopupAllHotel: Sp,
  hotelNameSelectPopup: fp,
  hotelNameSelectPopupPlaceholder: Pp,
  hotelInfo: yp,
  startDate: Cp,
  endDate: Tp,
  confirm: jp,
  cancel: kp,
  travelSelectPopupAfterTip: bp,
  ticketsSelectPopupAfterTip: zp,
  hotelSelectPopupAfterTip: _p,
  travelSelectPopupGoodsMinTip: vp,
  travelSelectPopupGoodsMaxTip: $p,
  ticketsSelectPopupGoodsMinTip: wp,
  ticketsSelectPopupGoodsMaxTip: xp,
  hotelSelectPopupGoodsMinTip: Gp,
  hotelSelectPopupGoodsMaxTip: Np,
  memberPrice: Ip,
  involved: Ap,
  noInvolved: Bp,
  memberDiscount: Mp,
  discount: Lp,
  fixedDiscount: Dp,
  nonparticipation: Rp,
  discountHint: Ep,
  fixedDiscountHint: Op,
  editMemberPricePopupTitle: Fp,
  goodsSku: Up,
  memberEnjoyDiscount: Wp,
  discountUnit: qp,
  yuanUnit: Kp,
  editMemberPrice: Hp,
  memberLevel: Vp,
  memberPricePlaceholder: Yp,
  fixedPriceHint: Qp,
  dayMemberPrice: Xp,
  daySetting: Zp,
  batchEmptySelectedGoodsTips: Jp,
  dateRange: og,
  oneStar: eg,
  twoStar: tg,
  threeStar: ng,
  fourStar: cg,
  fiveStar: sg,
  hotelStar: ag,
  fullAddress: rg,
  hotelStatus: lg,
  scenicStar: ig,
  scenicFullAddress: dg,
  scenicStatus: pg,
  wayName: gg,
  wayInfo: mg,
  wayNamePlaceholder: ug,
  wayCover: hg,
  salePrice: Sg,
  wayStatus: fg,
  startCity: Pg,
  startCityPlaceholder: yg,
  endCity: Cg,
  endCityPlaceholder: Tg,
  feeDesc: jg,
  createTime: kg,
  createTimePlaceholder: bg,
  addTourismWay: zg,
  updateTourismWay: _g,
  tourismWayDeleteTips: vg,
  linePrice: $g,
  stock: wg,
  wayCity: xg,
  saleArrStartDatePlaceholder: Gg,
  saleArrEndDatePlaceholder: Ng,
  scenicSelectContentTips: Ig,
  waySelectContentTips: Ag,
  hotelSelectContentTips: Bg
}, Qm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addTourismWay: zg,
  batchEmptySelectedGoodsTips: Jp,
  cancel: kp,
  confirm: jp,
  createTime: kg,
  createTimePlaceholder: bg,
  dateRange: og,
  dayMemberPrice: Xp,
  daySetting: Zp,
  default: Ym,
  discount: Lp,
  discountHint: Ep,
  discountUnit: qp,
  editMemberPrice: Hp,
  editMemberPricePopupTitle: Fp,
  endCity: Cg,
  endCityPlaceholder: Tg,
  endDate: Tp,
  feeDesc: jg,
  fiveStar: sg,
  fixedDiscount: Dp,
  fixedDiscountHint: Op,
  fixedPriceHint: Qp,
  fourStar: cg,
  fullAddress: rg,
  goodsSelectPopupCreateTime: rp,
  goodsSku: Up,
  hotelInfo: yp,
  hotelNameSelectPopup: fp,
  hotelNameSelectPopupPlaceholder: Pp,
  hotelSelectContentTips: Bg,
  hotelSelectPopupAfterTip: _p,
  hotelSelectPopupAllHotel: Sp,
  hotelSelectPopupGoodsMaxTip: Np,
  hotelSelectPopupGoodsMinTip: Gp,
  hotelSelectPopupSelectGoodsDialog: hp,
  hotelSelectPopupSelectHotelButton: up,
  hotelStar: ag,
  hotelStatus: lg,
  involved: Ap,
  linePrice: $g,
  memberDiscount: Mp,
  memberEnjoyDiscount: Wp,
  memberLevel: Vp,
  memberPrice: Ip,
  memberPricePlaceholder: Yp,
  noInvolved: Bp,
  nonparticipation: Rp,
  oneStar: eg,
  saleArrEndDatePlaceholder: Ng,
  saleArrStartDatePlaceholder: Gg,
  salePrice: Sg,
  scenicFullAddress: dg,
  scenicInfo: mp,
  scenicNameSelectPopup: pp,
  scenicNameSelectPopupPlaceholder: gp,
  scenicSelectContentTips: Ig,
  scenicStar: ig,
  scenicStatus: pg,
  startCity: Pg,
  startCityPlaceholder: yg,
  startDate: Cp,
  stock: wg,
  threeStar: ng,
  ticketsSelectPopupAfterTip: zp,
  ticketsSelectPopupAllTickets: dp,
  ticketsSelectPopupGoodsMaxTip: xp,
  ticketsSelectPopupGoodsMinTip: wp,
  ticketsSelectPopupSelectGoodsDialog: ip,
  ticketsSelectPopupSelectTicketsButton: lp,
  tourismPricePopup: sp,
  tourismStockPopup: ap,
  tourismWayDeleteTips: vg,
  travelSelectPopupAfterTip: bp,
  travelSelectPopupAllTravel: ep,
  travelSelectPopupGoodsMaxTip: $p,
  travelSelectPopupGoodsMinTip: vp,
  travelSelectPopupSelectGoodsDialog: op,
  travelSelectPopupSelectTravelButton: Jd,
  twoStar: tg,
  updateTourismWay: _g,
  wayCity: xg,
  wayCover: hg,
  wayInfo: mg,
  wayInfoPopup: cp,
  wayName: gg,
  wayNamePlaceholder: ug,
  wayNameSelectPopup: tp,
  wayNameSelectPopupPlaceholder: np,
  waySelectContentTips: Ag,
  wayStatus: fg,
  yuanUnit: Kp
}, Symbol.toStringTag, { value: "Module" })), Mg = "项目", Lg = "项目数量", Dg = "项目信息", Rg = "项目名称", Eg = "请输入项目名称", Og = "卡项", Fg = "卡项数量", Ug = "选择商品", Wg = "已选", qg = "个", Kg = "商品选择", Hg = "商品名称", Vg = "请输入商品名称", Yg = "全部商品", Qg = "商品信息", Xg = "价格", Zg = "库存", Jg = "已选择", om = "个商品", em = "取消选择", tm = "所选商品数量不能少于", nm = "所选商品数量不能超过", cm = "请选择项目", sm = "请选择卡项", am = "卡项名称", rm = "请输入卡项名称", lm = "卡项类型", im = "卡项信息", dm = "销售数量", pm = "销售数量", Xm = {
  serve: Mg,
  serveNum: Lg,
  goodsInfo: Dg,
  goodsName: Rg,
  goodsNamePlaceholder: Eg,
  card: Og,
  cardNum: Fg,
  goodsSelectPopupSelectGoodsButton: Ug,
  goodsSelectPopupSelect: Wg,
  goodsSelectPopupPiece: qg,
  goodsSelectPopupSelectGoodsDialog: Kg,
  goodsSelectPopupGoodsName: Hg,
  goodsSelectPopupGoodsNamePlaceholder: Vg,
  goodsSelectPopupAllGoods: Yg,
  goodsSelectPopupGoodsInfo: Qg,
  goodsSelectPopupPrice: Xg,
  goodsSelectPopupStock: Zg,
  goodsSelectPopupBeforeTip: Jg,
  goodsSelectPopupAfterTip: om,
  goodsSelectPopupClearGoods: em,
  goodsSelectPopupGoodsMinTip: tm,
  goodsSelectPopupGoodsMaxTip: nm,
  serviceSelectContentTips: cm,
  cardSelectContentTips: sm,
  cardGoodsName: am,
  cardGoodsNamePlaceholder: rm,
  cardType: lm,
  cardGoodsInfo: im,
  serviceSelectContentSaleNum: dm,
  cardSelectContentSaleNum: pm
}, Zm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  card: Og,
  cardGoodsInfo: im,
  cardGoodsName: am,
  cardGoodsNamePlaceholder: rm,
  cardNum: Fg,
  cardSelectContentSaleNum: pm,
  cardSelectContentTips: sm,
  cardType: lm,
  default: Xm,
  goodsInfo: Dg,
  goodsName: Rg,
  goodsNamePlaceholder: Eg,
  goodsSelectPopupAfterTip: om,
  goodsSelectPopupAllGoods: Yg,
  goodsSelectPopupBeforeTip: Jg,
  goodsSelectPopupClearGoods: em,
  goodsSelectPopupGoodsInfo: Qg,
  goodsSelectPopupGoodsMaxTip: nm,
  goodsSelectPopupGoodsMinTip: tm,
  goodsSelectPopupGoodsName: Hg,
  goodsSelectPopupGoodsNamePlaceholder: Vg,
  goodsSelectPopupPiece: qg,
  goodsSelectPopupPrice: Xg,
  goodsSelectPopupSelect: Wg,
  goodsSelectPopupSelectGoodsButton: Ug,
  goodsSelectPopupSelectGoodsDialog: Kg,
  goodsSelectPopupStock: Zg,
  serve: Mg,
  serveNum: Lg,
  serviceSelectContentSaleNum: dm,
  serviceSelectContentTips: cm
}, Symbol.toStringTag, { value: "Module" })), Jm = (e, t) => {
  const o = e[t];
  return o ? typeof o == "function" ? o() : Promise.resolve(o) : new Promise((c, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + t)));
  });
};
function T() {
  const e = globalThis;
  return e.__addonSharedState__ || (e.__addonSharedState__ = { manifests: {}, installedKeys: [], ready: !1 }), e.__addonSharedState__;
}
let gm = null;
const ou = () => globalThis.__addonInitPromise__ ?? null, eu = (e) => {
  gm = e, globalThis.__addonInitPromise__ = e;
}, b = "/admin", tu = ["zh-cn", "en"];
function z(e) {
  return !e || e.startsWith("http") || e.startsWith("/admin/") ? e : e.startsWith("/assets/") ? `${b}${e}` : e.startsWith("./") ? `${b}/assets/addons/${e.slice(2)}` : `${b}/${e.replace(/^\//, "")}`;
}
function nu(e, t, o) {
  var r;
  const c = (((r = Pm()[e]) == null ? void 0 : r.langBase) || "./lang/").replace(/^\.\//, "").replace(/\/+$/, ""), a = ["assets", "addons", e, c, t, `${o}.json`].join("/").replace(/\/+/g, "/");
  return `${b}/${a}`;
}
function mm(e, t) {
  if (t === "/")
    return "index";
  let o = t.replace(/^(\/admin\/|\/site\/|\/)/, "").replace(/\.vue$/, "");
  return o.startsWith("views/") && (o = o.slice(6)), e && o === e && (o = "index"), o.replaceAll("/", ".");
}
function cu(e) {
  if (e.meta.addon)
    return String(e.meta.addon);
  for (let t = e.matched.length - 1; t >= 0; t--) {
    const o = e.matched[t].meta.addon;
    if (o)
      return String(o);
  }
  return "";
}
function su(e) {
  if (e.meta.view)
    return String(e.meta.view);
  for (let t = e.matched.length - 1; t >= 0; t--) {
    const o = e.matched[t].meta.view;
    if (o)
      return String(o);
  }
  return e.path;
}
function G(e) {
  if (!e || typeof e != "object")
    return {};
  const t = e;
  if (t.default && typeof t.default == "object")
    return G(t.default);
  const o = {};
  for (const [c, a] of Object.entries(t))
    c === "default" || c === "__esModule" || typeof a == "string" && (o[c] = a);
  return Object.keys(o).length ? o : t;
}
function au(e, t) {
  const o = {};
  for (const [c, a] of Object.entries(t))
    typeof a == "string" && (o[`${e}.${c}`] = a, e === "common" && (o[c] = a));
  return o;
}
function um(e, t) {
  const c = e.replace(/^(\/admin\/|\/site\/|\/)/, "").split("/").filter(Boolean)[0];
  return c && (t != null && t.length ? t : fm()).includes(c) ? c : "";
}
async function ru(e) {
  try {
    const t = await fetch(z(`/assets/addons/${e}/manifest.json`), { method: "HEAD" });
    return t.ok ? !(t.headers.get("content-type") || "").toLowerCase().includes("text/html") : !1;
  } catch {
    return !1;
  }
}
const lu = () => {
  const e = globalThis;
  return e.__addonModuleCaches__ || (e.__addonModuleCaches__ = {}), e.__addonModuleCaches__;
};
function hm() {
  const e = globalThis.__addonBuildVersion__;
  return e ? String(e) : "0";
}
async function Sm(e) {
  const t = lu();
  return e in t || (t[e] = (async () => {
    var o;
    try {
      await N();
      const a = (((o = Pm()[e]) == null ? void 0 : o.entry) || "./index.js").split("/").pop() || "index.js";
      return await import(z(`/assets/addons/${e}/${a}?v=${hm()}`));
    } catch {
      return null;
    }
  })()), t[e];
}
async function N(e) {
  const t = ou();
  if (t && (await t, T().ready))
    return;
  const o = T();
  return eu((async () => {
    o.manifests = {}, o.installedKeys = [];
    let c = e;
    if (!(c != null && c.length))
      try {
        const r = z(`/assets/addons/index.json?_t=${Date.now()}`), p = await fetch(r);
        if (p.ok) {
          const i = await p.json();
          c = Array.isArray(i.keys) ? i.keys : [], i.buildTime && (globalThis.__addonBuildVersion__ = i.buildTime);
          const m = i.manifests;
          if (m)
            for (const [P, k] of Object.entries(m))
              o.manifests[P] = k;
        }
      } catch {
        c = [];
      }
    const a = [];
    for (const r of c || []) {
      if (o.manifests[r]) {
        a.push(r);
        continue;
      }
      if (await ru(r)) {
        a.push(r);
        try {
          const p = z(`/assets/addons/${r}/manifest.json?v=${hm()}`), i = await fetch(p);
          i.ok && (o.manifests[r] = await i.json());
        } catch {
        }
      }
    }
    o.installedKeys = a, o.ready = !0;
  })()), gm;
}
function fm() {
  const e = T();
  return e.installedKeys.length ? e.installedKeys : Object.keys(e.manifests);
}
function Pm() {
  return T().manifests;
}
const iu = /* @__PURE__ */ Object.assign({ "/src/addon/cms/lang/zh-cn/article.category.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/cms/lang/zh-cn/article.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/cms/lang/zh-cn/article.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/cms/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/purchase.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/purchase.in.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/purchase.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/sales.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/sales.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/sales.out.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/stock.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/stock.in.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/stock.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/erp/lang/zh-cn/stock.out.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/friend_help/lang/zh-cn/active.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/friend_help/lang/zh-cn/order.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/friend_help/lang/zh-cn/order.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/friend_help/lang/zh-cn/order.refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/en/goods.category.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/card.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/card.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/feedback.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/finance.invoice.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/finance.store_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/finance.store_finance.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/finance.technician_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/finance.technician_finance.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/finance.withdrawal_review.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/goods.category.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/goods.city.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/goods.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/goods.guarantee.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/goods.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/goods.special.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/help.category.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/help.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/help.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/marketing.coupon.add.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/marketing.coupon.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/marketing.coupon.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/marketing.coupon.send.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.easy_select.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.easy_select_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.evaluate.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.evaluate_config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.intent_config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.lesson_order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.order_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.protection_settings.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.reserve.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.return_visit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/order.tags.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/refund.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/refund.refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/site_index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/store.add.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/store.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/store.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/store.examine.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/store.examine_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/store.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/store.technician.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.cityfare.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.cityfare_config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.examine.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.examine_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.level.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.level_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/home_service/lang/zh-cn/technician.position.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/huaweicloud_obs/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/huaweicloud_sms/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/config.reserve.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/goods.category.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/goods.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/goods.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/order.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/order.order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/order.order_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/order.reserve.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/refund.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/refund.refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/site_index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/technician.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/technician.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/technician.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/o2o/lang/zh-cn/technician.position.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/pintuan/lang/zh-cn/active.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/pintuan/lang/zh-cn/order.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/pintuan/lang/zh-cn/order.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/pintuan/lang/zh-cn/order.refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/recharge/lang/zh-cn/order.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/recharge/lang/zh-cn/order.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/recharge/lang/zh-cn/order.refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/recharge/lang/zh-cn/package.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/recharge/lang/zh-cn/package.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/recharge/lang/zh-cn/package.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/recharge/lang/zh-cn/package.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/relay/lang/zh-cn/active.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/relay/lang/zh-cn/goods.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/relay/lang/zh-cn/hello_world.index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/relay/lang/zh-cn/order.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/relay/lang/zh-cn/order.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/relay/lang/zh-cn/order.refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/seckill/lang/zh-cn/active.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/seckill/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/seckill/lang/zh-cn/config.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/seckill/lang/zh-cn/goods.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/seckill/lang/zh-cn/goods.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/seckill/lang/zh-cn/order.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/seckill/lang/zh-cn/order.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/seckill/lang/zh-cn/order.refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/seckill/lang/zh-cn/time.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/address.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/address.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.company.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.company_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.electronic_sheet.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.electronic_sheet_config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.electronic_sheet_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.local.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.local_config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.local_delivery_service.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.local_record.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.merchant_record.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.search.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.staff.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.store.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.store_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.template.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery.template_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery_store.delivery_set.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/delivery_store.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.attr.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.attr_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.brand_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.category.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.category_config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.evaluate.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.evaluate_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.label_group_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.label_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.real_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.recycle.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.search_config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.service.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/goods.virtual_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/index.index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.coupon.add.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.coupon.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.coupon.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.coupon.send.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.discount.add.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.discount.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.discount.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.discount.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.discount.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.exchange.goods_add.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.exchange.goods_edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.exchange.goods_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.exchange.order_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.goods_rank.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.goods_rank.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.goods_rank.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.manjian.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.manjian.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.manjian.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.newcomer.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/marketing.newcomer.order_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/order.batch_delivery.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/order.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/order.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/order.invoice.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/order.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/order.refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/order.refund_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop/lang/zh-cn/stat.goods.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/agent.level_config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/agent.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/agent.order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/config.index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/config.poster.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/fenxiao.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/fenxiao.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/fenxiao.lists.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/fenxiao_level.fenxiao_level.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/goods.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/goods.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/goods.lists.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/index.index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/level.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/level.lists.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/member.lists.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/order.lists.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/sale.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/sale.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/sale.member_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/task.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/task.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/task.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/task.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/task.reward_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/task.reward_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/team.level.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_fenxiao/lang/zh-cn/team.order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/giftcard.card_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/giftcard.category.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/giftcard.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/giftcard.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/giftcard.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/giftcard.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/giftcard.makecard.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/giftcard.material.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/giftcard.material_group.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_giftcard/lang/zh-cn/order.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_impulse_buy/lang/zh-cn/impulse_buy.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_impulse_buy/lang/zh-cn/impulse_buy.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_impulse_buy/lang/zh-cn/impulse_buy.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_replace_buy/lang/zh-cn/index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/shop_replace_buy/lang/zh-cn/order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/category.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/comment.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/config.config.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/content.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/content.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/reward_rule.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/sensitive.index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/topic.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/sow_community/lang/zh-cn/treasure.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/hotel.edit_hotel.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/hotel.edit_room.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/hotel.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/hotel.order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/hotel.order_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/hotel.room.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/scenic.edit_scenic.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/scenic.edit_ticket.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/scenic.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/scenic.order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/scenic.order_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/scenic.ticket.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/setting.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/site_index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/verify.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/way.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/way.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/way.order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/tourism/lang/zh-cn/way.order_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/cad.record_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/card.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/card.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/card.record_info.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/card.record_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/common.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/order.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/order_detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/record.record.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/refund.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/reserve.index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/reserve.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/reserve.set.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/service.category.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/service.edit.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/service.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/service.record_info.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/service.record_list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/site_index.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/technician.detail.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/technician.list.json": () => import("./_addon-external_empty_json-931c3451.js"), "/src/addon/vipcard/lang/zh-cn/verify.json": () => import("./_addon-external_empty_json-931c3451.js") });
async function du(e, t, o) {
  const c = `@/addon/${e}/lang/${t}/${o}.json`, a = iu[c];
  if (!a)
    return {};
  try {
    return (await a()).default || {};
  } catch {
    return {};
  }
}
async function pu(e) {
  T().ready || await N();
  for (const t of fm())
    try {
      const o = await Sm(t), c = o == null ? void 0 : o.langs;
      if (c)
        for (const [a, r] of Object.entries(c)) {
          const p = {};
          for (const [i, m] of Object.entries(r || {}))
            Object.assign(p, au(i, G(m)));
          Object.keys(p).length && e(a, p);
        }
      else
        for (const a of tu) {
          const r = await w(t, a, "common");
          Object.keys(r).length && e(a, r);
        }
    } catch {
    }
}
async function w(e, t, o) {
  var r;
  T().ready || await N();
  try {
    const p = await Sm(e);
    if (p) {
      const i = p.langs, m = (r = i == null ? void 0 : i[t]) == null ? void 0 : r[o], P = G(m);
      if (Object.keys(P).length)
        return P;
    }
  } catch {
  }
  const c = await du(e, t, o);
  if (Object.keys(c).length)
    return c;
  const a = nu(e, t, o);
  try {
    const p = await fetch(a);
    if (p.ok)
      return await p.json();
  } catch {
  }
  return {};
}
class gu {
  //已加载的语言
  constructor(t) {
    v(this, "i18n");
    v(this, "loadLocale", []);
    this.i18n = t;
  }
  /**
   *
   * @param locale 设置语言
   */
  setI18nLanguage(t) {
    this.i18n.mode === "legacy" ? this.i18n.global.locale = t : this.i18n.global.locale = t;
    let o = document.querySelector("html");
    o && o.setAttribute("lang", t);
  }
  /**
   * 加载语言包
   * @param app
   * @param path
   * @param locale
   * @returns
   */
  async loadLocaleMessages(t, o, c) {
    try {
      t || (t = um(o));
      const a = mm(t, o);
      let r = {};
      t ? r = await w(t, c, a) : r = (await Jm(/* @__PURE__ */ Object.assign({ "../app/lang/en/403.json": () => import("./403-4bc122af.js"), "../app/lang/en/auth.menu.json": () => import("./auth.menu-e194a02d.js"), "../app/lang/en/index.json": () => import("./index-c33bb386.js"), "../app/lang/en/login.json": () => import("./login-8bac8312.js"), "../app/lang/en/member.member.json": () => import("./member.member-64cd29d1.js"), "../app/lang/en/operate.panel.json": () => import("./operate.panel-82818305.js"), "../app/lang/en/tools.integrity.json": () => import("./tools.integrity-515e9b87.js"), "../app/lang/en/user.center.json": () => import("./user.center-78470141.js"), "../app/lang/zh-cn/403.json": () => import("./403-afb5f475.js"), "../app/lang/zh-cn/app.authorize.json": () => import("./app.authorize-ccfde323.js"), "../app/lang/zh-cn/app.index.json": () => import("./app.index-ffd57c14.js"), "../app/lang/zh-cn/app.store.json": () => import("./app.store-82fccf8d.js"), "../app/lang/zh-cn/app.upgrade.json": () => import("./app.upgrade-a5fc793d.js"), "../app/lang/zh-cn/auth.log.json": () => import("./auth.log-7ab49365.js"), "../app/lang/zh-cn/auth.menu.json": () => import("./auth.menu-0e3dc376.js"), "../app/lang/zh-cn/auth.role.json": () => import("./auth.role-c93ddff5.js"), "../app/lang/zh-cn/auth.site_menu.json": () => import("./auth.site_menu-d105e1fc.js"), "../app/lang/zh-cn/auth.user.json": () => import("./auth.user-4b72de7c.js"), "../app/lang/zh-cn/channel.aliapp.access.json": () => import("./channel.aliapp.access-345ff291.js"), "../app/lang/zh-cn/channel.aliapp.config.json": () => import("./channel.aliapp.config-8ba784b4.js"), "../app/lang/zh-cn/channel.aliapp.course.json": () => import("./channel.aliapp.course-11a03e9a.js"), "../app/lang/zh-cn/channel.app.access.json": () => import("./channel.app.access-4967216b.js"), "../app/lang/zh-cn/channel.app.config.json": () => import("./channel.app.config-f92838ee.js"), "../app/lang/zh-cn/channel.app.version.json": () => import("./channel.app.version-801d7c33.js"), "../app/lang/zh-cn/channel.h5.config.json": () => import("./channel.h5.config-bb100e55.js"), "../app/lang/zh-cn/channel.pc.config.json": () => import("./channel.pc.config-bbe7313f.js"), "../app/lang/zh-cn/channel.weapp.access.json": () => import("./channel.weapp.access-f5b56b8d.js"), "../app/lang/zh-cn/channel.weapp.code.json": () => import("./channel.weapp.code-9301d78d.js"), "../app/lang/zh-cn/channel.weapp.config.json": () => import("./channel.weapp.config-62316f27.js"), "../app/lang/zh-cn/channel.weapp.course.json": () => import("./channel.weapp.course-46cdef05.js"), "../app/lang/zh-cn/channel.weapp.template.json": () => import("./channel.weapp.template-60f607e4.js"), "../app/lang/zh-cn/channel.wechat.access.json": () => import("./channel.wechat.access-3198d859.js"), "../app/lang/zh-cn/channel.wechat.config.json": () => import("./channel.wechat.config-149fe86d.js"), "../app/lang/zh-cn/channel.wechat.course.json": () => import("./channel.wechat.course-717abfc8.js"), "../app/lang/zh-cn/channel.wechat.keyword_reply_edit.json": () => import("./channel.wechat.keyword_reply_edit-736dea19.js"), "../app/lang/zh-cn/channel.wechat.menu.json": () => import("./channel.wechat.menu-08c01b06.js"), "../app/lang/zh-cn/channel.wechat.reply.json": () => import("./channel.wechat.reply-371557b9.js"), "../app/lang/zh-cn/channel.wechat.template.json": () => import("./channel.wechat.template-c7e0e856.js"), "../app/lang/zh-cn/decorate.preview.json": () => import("./decorate.preview-5f2765ef.js"), "../app/lang/zh-cn/dict.list.json": () => import("./dict.list-fdd911c6.js"), "../app/lang/zh-cn/diy.edit.json": () => import("./diy.edit-d06e7839.js"), "../app/lang/zh-cn/diy.index.json": () => import("./diy.index-7d6c7cb2.js"), "../app/lang/zh-cn/diy.list.json": () => import("./diy.list-fb8d7f12.js"), "../app/lang/zh-cn/diy.member.json": () => import("./diy.member-7204bf61.js"), "../app/lang/zh-cn/diy.preview.json": () => import("./diy.preview-f8b42901.js"), "../app/lang/zh-cn/diy.route.json": () => import("./diy.route-51d664e7.js"), "../app/lang/zh-cn/diy.tabbar.json": () => import("./diy.tabbar-5a78137b.js"), "../app/lang/zh-cn/diy.tabbar_edit.json": () => import("./diy.tabbar_edit-1b67bdec.js"), "../app/lang/zh-cn/diy_form.edit.json": () => import("./diy_form.edit-64b538a2.js"), "../app/lang/zh-cn/diy_form.list.json": () => import("./diy_form.list-8cc96e72.js"), "../app/lang/zh-cn/finance.account.json": () => import("./finance.account-3ebadbbb.js"), "../app/lang/zh-cn/finance.cash_out.json": () => import("./finance.cash_out-a5fc92d4.js"), "../app/lang/zh-cn/finance.offlinepay.json": () => import("./finance.offlinepay-5e4097af.js"), "../app/lang/zh-cn/finance.pay_detail.json": () => import("./finance.pay_detail-03e8534d.js"), "../app/lang/zh-cn/finance.pay_refund.json": () => import("./finance.pay_refund-33befe92.js"), "../app/lang/zh-cn/finance.refund_detail.json": () => import("./finance.refund_detail-4952f106.js"), "../app/lang/zh-cn/index.app_manage.json": () => import("./index.app_manage-8bfaebc1.js"), "../app/lang/zh-cn/index.index.json": () => import("./index.index-1daecdce.js"), "../app/lang/zh-cn/index.preview.json": () => import("./index.preview-969e67dd.js"), "../app/lang/zh-cn/index.store.json": () => import("./index.store-e2f6d3f6.js"), "../app/lang/zh-cn/login.json": () => import("./login-00d7722b.js"), "../app/lang/zh-cn/marketing.sign_config.json": () => import("./marketing.sign_config-62bde278.js"), "../app/lang/zh-cn/marketing.sign_list.json": () => import("./marketing.sign_list-2d527eb9.js"), "../app/lang/zh-cn/marketing.verifier.json": () => import("./marketing.verifier-fb68001b.js"), "../app/lang/zh-cn/marketing.verify.json": () => import("./marketing.verify-a01b4161.js"), "../app/lang/zh-cn/member.balance.json": () => import("./member.balance-7b831fb2.js"), "../app/lang/zh-cn/member.commission.json": () => import("./member.commission-6f09b642.js"), "../app/lang/zh-cn/member.growth.json": () => import("./member.growth-b8b132a4.js"), "../app/lang/zh-cn/member.label.edit.json": () => import("./member.label.edit-32f3c791.js"), "../app/lang/zh-cn/member.label.json": () => import("./member.label-d042fc75.js"), "../app/lang/zh-cn/member.level.json": () => import("./member.level-9883e926.js"), "../app/lang/zh-cn/member.level_edit.json": () => import("./member.level_edit-63ebdbf3.js"), "../app/lang/zh-cn/member.member.json": () => import("./member.member-2cc54a64.js"), "../app/lang/zh-cn/member.member_detail.json": () => import("./member.member_detail-49ebc798.js"), "../app/lang/zh-cn/member.point.json": () => import("./member.point-b9f9143f.js"), "../app/lang/zh-cn/operate.panel.json": () => import("./operate.panel-6571704b.js"), "../app/lang/zh-cn/poster.edit.json": () => import("./poster.edit-c0d45927.js"), "../app/lang/zh-cn/poster.list.json": () => import("./poster.list-6a917fd4.js"), "../app/lang/zh-cn/printer.edit.json": () => import("./printer.edit-03e2be08.js"), "../app/lang/zh-cn/printer.list.json": () => import("./printer.list-1cf7202e.js"), "../app/lang/zh-cn/printer.template_edit.json": () => import("./printer.template_edit-3092b283.js"), "../app/lang/zh-cn/printer.template_list.json": () => import("./printer.template_list-679ce0fb.js"), "../app/lang/zh-cn/setting.adminlogin.json": () => import("./setting.adminlogin-763acc1d.js"), "../app/lang/zh-cn/setting.agreement.json": () => import("./setting.agreement-ef53ab4e.js"), "../app/lang/zh-cn/setting.agreement_edit.json": () => import("./setting.agreement_edit-42ca6920.js"), "../app/lang/zh-cn/setting.cash_out.json": () => import("./setting.cash_out-b3a40561.js"), "../app/lang/zh-cn/setting.channel.json": () => import("./setting.channel-a8b6d9e6.js"), "../app/lang/zh-cn/setting.copyright.json": () => import("./setting.copyright-703776c8.js"), "../app/lang/zh-cn/setting.developer_token.json": () => import("./setting.developer_token-df8cac95.js"), "../app/lang/zh-cn/setting.export.json": () => import("./setting.export-6bcb66d7.js"), "../app/lang/zh-cn/setting.growth_rule.json": () => import("./setting.growth_rule-4682f358.js"), "../app/lang/zh-cn/setting.layout.json": () => import("./setting.layout-2d2ef354.js"), "../app/lang/zh-cn/setting.login.json": () => import("./setting.login-0e20a204.js"), "../app/lang/zh-cn/setting.map.json": () => import("./setting.map-a018c17d.js"), "../app/lang/zh-cn/setting.member.json": () => import("./setting.member-3c18afe5.js"), "../app/lang/zh-cn/setting.notice.json": () => import("./setting.notice-3292129f.js"), "../app/lang/zh-cn/setting.notice_records.json": () => import("./setting.notice_records-8b5d12a2.js"), "../app/lang/zh-cn/setting.oplatform.json": () => import("./setting.oplatform-3c661a69.js"), "../app/lang/zh-cn/setting.pay.json": () => import("./setting.pay-9d3502d5.js"), "../app/lang/zh-cn/setting.sms.json": () => import("./setting.sms-38c6ea20.js"), "../app/lang/zh-cn/setting.sms_records.json": () => import("./setting.sms_records-f32dcf96.js"), "../app/lang/zh-cn/setting.storage.json": () => import("./setting.storage-040b5d19.js"), "../app/lang/zh-cn/setting.system.json": () => import("./setting.system-533a107a.js"), "../app/lang/zh-cn/setting.transfer.json": () => import("./setting.transfer-dd7288e1.js"), "../app/lang/zh-cn/setting.transfer_scene.json": () => import("./setting.transfer_scene-a1236971.js"), "../app/lang/zh-cn/setting.weapp.json": () => import("./setting.weapp-38d65415.js"), "../app/lang/zh-cn/site.group.json": () => import("./site.group-79d11eb3.js"), "../app/lang/zh-cn/site.group_edit.json": () => import("./site.group_edit-ad4054d9.js"), "../app/lang/zh-cn/site.info.json": () => import("./site.info-f86d34ea.js"), "../app/lang/zh-cn/site.list.json": () => import("./site.list-f879a4a9.js"), "../app/lang/zh-cn/site.manage.json": () => import("./site.manage-fe492c38.js"), "../app/lang/zh-cn/site.user.json": () => import("./site.user-298548ec.js"), "../app/lang/zh-cn/site.user_info.json": () => import("./site.user_info-8949966a.js"), "../app/lang/zh-cn/tools.addon.edit.json": () => import("./tools.addon.edit-67fed17b.js"), "../app/lang/zh-cn/tools.addon.index.json": () => import("./tools.addon.index-64a332f0.js"), "../app/lang/zh-cn/tools.addon.list.json": () => import("./tools.addon.list-066ffe3b.js"), "../app/lang/zh-cn/tools.backup_records.json": () => import("./tools.backup_records-fd1ba040.js"), "../app/lang/zh-cn/tools.code.edit.json": () => import("./tools.code.edit-ce482f8a.js"), "../app/lang/zh-cn/tools.code.index.json": () => import("./tools.code.index-2f01b5e9.js"), "../app/lang/zh-cn/tools.code.list.json": () => import("./tools.code.list-b3d1ec18.js"), "../app/lang/zh-cn/tools.detection.json": () => import("./tools.detection-97a8d1e5.js"), "../app/lang/zh-cn/tools.framework_patch.json": () => import("./tools.framework_patch-2461d5c0.js"), "../app/lang/zh-cn/tools.integrity.json": () => import("./tools.integrity-235a7a64.js"), "../app/lang/zh-cn/tools.schedule.json": () => import("./tools.schedule-3013f2ba.js"), "../app/lang/zh-cn/tools.schedule_log.json": () => import("./tools.schedule_log-c332642a.js"), "../app/lang/zh-cn/tools.updatecache.json": () => import("./tools.updatecache-c28011ba.js"), "../app/lang/zh-cn/tools.upgrade_records.json": () => import("./tools.upgrade_records-943e7638.js"), "../app/lang/zh-cn/user.center.json": () => import("./user.center-f848e53b.js"), "../app/lang/zh-cn/user.edit_center.json": () => import("./user.edit_center-86828913.js"), "../app/lang/zh-cn/wxoplatform.setting.json": () => import("./wxoplatform.setting-e351af9d.js"), "../app/lang/zh-cn/wxoplatform.weapp_version.json": () => import("./wxoplatform.weapp_version-fb73c574.js") }), `../app/lang/${c}/${a}.json`)).default || {};
      let p = {};
      if (Object.keys(r).forEach((i) => {
        p[`${a}.${i}`] = r[i];
      }), t)
        try {
          const i = await w(t, c, "common");
          Object.keys(i).forEach((m) => {
            p[m] = i[m];
          });
        } catch {
        }
      return this.i18n.global.mergeLocaleMessage(c, p), this.setI18nLanguage(c), $();
    } catch {
      return this.setI18nLanguage(c), $();
    }
  }
  /** 生产环境启动时预加载各插件全部语言包 */
  async preloadAddonLangs() {
    await pu((t, o) => {
      this.i18n.global.mergeLocaleMessage(t, o);
    });
  }
}
const mu = "文件差异", uu = "校验", hu = "恢复前请先手动备份站点数据，避免数据丢失", Su = "全选当前结果", fu = "搜索文件路径", Pu = "全部", yu = "正在检测", Cu = "未发现差异文件", Tu = "已选", ju = "个文件", ku = "确认操作", bu = "已扫描文件", zu = "检测失败，请稍后重试", _u = "新增", vu = "修改", $u = "删除", wu = "对比", xu = "文件内容对比", Gu = "正在读取文件内容…", Nu = "读取文件内容失败", Iu = "该目标已跳过", Au = "检测进度", Bu = "正在比对文件…", Mu = "执行记录", Lu = "暂无记录", Du = "共 %count% 条", Ru = "开始检测", Eu = "正在读取官方清单…", Ou = "已读取官方清单（%count% 个文件），开始比对", Fu = "正在对比本地插件文件 (%done% / %total%)", Uu = "比对完成，发现 %count% 个差异文件", Wu = "比对完成，未发现差异文件", qu = "实时通道不可用，已切换为轮询", Ku = "检测已取消", Hu = "取消检测", Vu = "开始校验", Yu = "检测已取消", Qu = "本地代码与官方代码一致", Xu = "共核对 %count% 个文件，未发现任何差异", Zu = "恢复", Ju = "本地", oh = "官方", eh = "官方内容不可用", th = "「新增」是本地多出来的文件，官方包里没有对应内容，无法写回", nh = "确认写回", ch = "确认写回", sh = "将用官方内容覆盖选中的 %count% 个文件（共 %size%），覆盖前会自动备份原文件。", ah = "请确认后果", rh = "选中文件的内容会被官方包直接覆盖：本地对这些文件做过的二次开发改动会永久丢失，官方包里不包含这些改动。", lh = "「删除」项是「官方有、本地缺」的文件，写回等于把它们恢复出来，站点上会重新出现这些文件。", ih = "覆盖前会把原文件备份到服务器的 runtime/integrity/backup 目录下（按时间戳与目标名分层），本次实际备份路径会在写回结果里给出。备份不会自动清理，也没有一键回滚 —— 需要回退时请手动从备份目录取回原文件。", dh = "写回立即生效，站点会开始使用官方版内容；若站点正在运行，建议在访问低峰期操作。", ph = "写回结果", gh = "写回完成：成功 %ok% 个，跳过 %skip% 个，失败 %fail% 个", mh = "以下文件写回失败", uh = "以下文件已跳过", hh = "备份目录", Sh = "确定", fh = "关闭", Ph = "编辑", yh = "详情", Ch = "创建时间", Th = "排序", jh = "状态", kh = "操作", bh = "更多", zh = "正常", _h = "停用", vh = "启用", $h = "确认", wh = "保存", xh = "返回", Gh = "取消", Nh = "搜索", Ih = "重置", Ah = "刷新", Bh = "刷新成功", Mh = "选择", Lh = "确定要导出数据吗？", Dh = "批量导出数据", Rh = "确定并导出", Eh = "提示", Oh = "是否显示", Fh = "显示", Uh = "隐藏", Wh = "新窗口打开", qh = "是", Kh = "否", Hh = "启用后：点击该菜单会在新标签页打开，并隐藏左侧菜单栏、顶部栏和标签栏，仅显示页面内容", Vh = "图标", Yh = "用户名", Qh = "头像", Xh = "账号", Zh = "新增管理员", Jh = "新增", oS = "账号", eS = "请输入管理员账号", tS = "密码", nS = "请输入管理员密码", cS = "确认密码", sS = "请再次确认密码", aS = "两次输入的密码不一致", rS = "账号设置", lS = "名称", iS = "请输入用户名称", dS = "密码", pS = "确认密码", gS = "图片", mS = "视频", uS = "重命名", hS = "查看", SS = "全选", fS = "是", PS = "否", yS = "复制", CS = "完成", TS = "复制成功", jS = "浏览器不支持一键复制，请手动进行复制", kS = "全部", bS = "请选择省", zS = "请选择市", _S = "请选择区/县", vS = "暂无数据", $S = "暂无二维码", wS = "无法显示", xS = {
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
  fail: "上传失败",
  triggerUpperLimit: "可选数量已达上限",
  mediaEmpty: "暂无素材，请点击上传按钮上传"
}, GS = {
  closeLeft: "关闭左侧",
  closeRight: "关闭右侧",
  closeCurrent: "关闭当前页",
  closeOther: "关闭其他页",
  closeAll: "关闭全部页",
  more: "更多操作"
}, NS = {
  layoutSetting: "主题设置",
  darkMode: "黑暗模式",
  sidebarMode: "主题风格",
  themeColor: "主题颜色",
  detectionLoginOperation: "确定",
  detectionLoginContent: "已检测到有其他账号登录，需要刷新后才能继续操作。",
  detectionLoginTip: "提示",
  layoutStyle: "布局风格",
  tab: "开启标签栏"
}, IS = {
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
}, AS = "请选择跳转链接", BS = "链接选择", MS = "链接名称", LS = "请输入链接名称", DS = "链接名称不能为空", RS = "跳转路径", ES = "请输入跳转路径", OS = "跳转路径不能为空", FS = "小程序AppID", US = "请输入要打开的小程序的appid", WS = "小程序AppID不能为空", qS = "小程序路径", KS = "请输入要打开的小程序路径", HS = "小程序路径不能为空", VS = "电话号码", YS = "请输入电话号码", QS = "电话号码不能为空", XS = "返回", ZS = "预览", JS = "暂未安装任何应用", of = "最新消息", ef = "访问店铺", tf = "地图设置", nf = "腾讯地图KEY", cf = "首页模版", sf = "切换首页", af = "你确定要切换首页吗？", rf = "原始密码", lf = "新密码", df = "确认密码", pf = "修改密码时必填.不修改密码时留空", gf = "请输入原始密码", mf = "请输入新密码", uf = "原始密码不能为空", hf = "请输入确认密码", Sf = "两次新密码不同", ff = "两次新密码不同", Pf = {
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
}, yf = {
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
}, Cf = "表单名称", Tf = "请输入表单名称", jf = "表单类型", kf = "请选择表单类型", bf = "全部", zf = "请选择表单", _f = "应用名/版本信息", vf = "应用标识", $f = "简介", wf = "类型", xf = "插件管理", Gf = "升级", Nf = "已安装", If = "未安装", Af = "已购买", Bf = "云编译", Mf = "最新版本", Lf = "标识指开发应用或插件的文件夹名称", Df = "更新信息", Rf = "下一步", Ef = "上一步", Of = "查看升级内容", Ff = "检测目录权限", Uf = "备份文件", Wf = "开始升级", qf = "升级完成", Kf = "是否要进行云编译该操作可能会影响到正在访问的客户是否要继续操作？", Hf = "推广链接", Vf = "下载二维码", Yf = "配置失败", Qf = "左侧标题", Xf = "右侧标题", Zf = "左侧简介", Jf = "右侧简介", oP = "请输入简介内容", ym = {
  diffDialogTitle: mu,
  diffVerify: uu,
  backupTip: hu,
  diffSelectAll: Su,
  searchFilePlaceholder: fu,
  tabAll: Pu,
  detectingPrefix: yu,
  noDiff: Cu,
  selectedSummary: Tu,
  filesUnit: ju,
  confirmAction: ku,
  scanned: bu,
  checkFailed: zu,
  typeNew: _u,
  typeModified: vu,
  typeDeleted: $u,
  compareAction: wu,
  compareTitle: xu,
  compareLoading: Gu,
  compareFailed: Nu,
  targetSkipped: Iu,
  progressTitle: Au,
  checking: Bu,
  logTitle: Mu,
  logEmpty: Lu,
  logTotal: Du,
  logStart: Ru,
  logBaseline: Eu,
  logReady: Ou,
  logScanning: Fu,
  logFinishDiff: Uu,
  logFinishSame: Wu,
  logFallback: qu,
  logCancelled: Ku,
  cancelCheck: Hu,
  startCheck: Vu,
  checkCancelled: Yu,
  identical: Qu,
  identicalTip: Xu,
  restoreAction: Zu,
  localLabel: Ju,
  officialLabel: oh,
  officialMissing: eh,
  addNotRestorable: th,
  confirmRestore: nh,
  restoreConfirmTitle: ch,
  restoreConfirmTip: sh,
  restoreConsequenceTitle: ah,
  restoreConsequenceOverwrite: rh,
  restoreConsequenceDeleted: lh,
  restoreConsequenceBackup: ih,
  restoreConsequenceLive: dh,
  restoreDoneTitle: ph,
  restoreSummary: gh,
  restoreFailedList: mh,
  restoreSkippedList: uh,
  backupDirLabel: hh,
  restoreDoneOk: Sh,
  close: fh,
  edit: Ph,
  delete: "删除",
  info: yh,
  createTime: Ch,
  sort: Th,
  status: jh,
  operation: kh,
  more: bh,
  statusNormal: zh,
  statusDeactivate: _h,
  startUsing: vh,
  confirm: $h,
  save: wh,
  back: xh,
  cancel: Gh,
  search: Nh,
  reset: Ih,
  refresh: Ah,
  refreshSuccess: Bh,
  select: Mh,
  export: "导出列表",
  exportPlaceholder: Lh,
  exportTip: Dh,
  exportConfirm: Rh,
  warning: Eh,
  isShow: Oh,
  show: Fh,
  hidden: Uh,
  isBlank: Wh,
  blankYes: qh,
  blankNo: Kh,
  isBlankTip: Hh,
  icon: Vh,
  userName: Yh,
  headImg: Qh,
  accountNumber: Xh,
  addManagerTitle: Zh,
  addManagerAction: Jh,
  addManagerUsername: oS,
  addManagerUsernamePlaceholder: eS,
  addManagerPassword: tS,
  addManagerPasswordPlaceholder: nS,
  addManagerConfirmPassword: cS,
  addManagerConfirmPasswordPlaceholder: sS,
  addManagerConfirmPasswordError: aS,
  accountSettings: rS,
  realName: lS,
  realNamePlaceholder: iS,
  password: dS,
  confirmPassword: pS,
  image: gS,
  video: mS,
  rename: uS,
  lookOver: hS,
  selectAll: SS,
  yes: fS,
  no: PS,
  copy: yS,
  complete: CS,
  copySuccess: TS,
  notSupportCopy: jS,
  selectPlaceholder: kS,
  provincePlaceholder: bS,
  cityPlaceholder: zS,
  districtPlaceholder: _S,
  emptyData: vS,
  emptyQrCode: $S,
  fileErr: wS,
  upload: xS,
  tabs: GS,
  layout: NS,
  axios: IS,
  linkPlaceholder: AS,
  selectLinkTips: BS,
  diyLinkName: MS,
  diyLinkNamePlaceholder: LS,
  diyLinkNameNotEmpty: DS,
  diyLinkUrl: RS,
  diyLinkUrlPlaceholder: ES,
  diyLinkUrlNotEmpty: OS,
  diyAppletId: FS,
  diyAppletIdPlaceholder: US,
  diyAppletIdNotEmpty: WS,
  diyAppletPage: qS,
  diyAppletPagePlaceholder: KS,
  diyAppletPageNotEmpty: HS,
  diyMakePhone: VS,
  diyMakePhonePlaceholder: YS,
  diyMakePhoneNotEmpty: QS,
  returnToPreviousPage: XS,
  preview: ZS,
  emptyApp: JS,
  newInfo: of,
  visitWap: ef,
  mapSetting: tf,
  mapKey: nf,
  indexTemplate: cf,
  indexSwitch: sf,
  indexWarning: af,
  originalPassword: rf,
  newPassword: lf,
  passwordCopy: df,
  passwordTip: pf,
  originalPasswordPlaceholder: gf,
  passwordPlaceholder: mf,
  originalPasswordHint: uf,
  newPasswordHint: hf,
  doubleCipherHint: Sf,
  confirmPasswordError: ff,
  upgrade: Pf,
  cloudbuild: yf,
  formSelectContentTitle: Cf,
  formSelectContentTitlePlaceholder: Tf,
  formSelectContentTypeName: jf,
  formSelectContentTypeNamePlaceholder: kf,
  formSelectContentTypeAll: bf,
  formSelectContentTips: zf,
  appName: _f,
  appIdentification: vf,
  introduction: $f,
  type: wf,
  localAppText: xf,
  upgrade2: Gf,
  installLabel: Nf,
  uninstalledLabel: If,
  buyLabel: Af,
  cloudBuild: Bf,
  newVersion: Mf,
  tipText: Lf,
  gxx: Df,
  return: "返回",
  nextStep: Rf,
  prev: Ef,
  viewUpgradeContent: Of,
  testDirectoryPermissions: Ff,
  backupFiles: Uf,
  startUpgrade: Wf,
  upgradeEnd: qf,
  cloudBuildTips: Kf,
  promoteUrl: Hf,
  downLoadQRCode: Vf,
  configureFailed: Yf,
  lefttitle: Qf,
  righttitle: Xf,
  leftDesc: Zf,
  rightDesc: Jf,
  descPlaceholder: oP
}, eP = "File differences", tP = "Verify", nP = "Please manually back up site data before restore to avoid data loss", cP = "Select all results", sP = "Search file path", aP = "Search", rP = "All", lP = "Checking", iP = "No differences found", dP = "Selected", pP = "file(s)", gP = "Confirm", mP = "Files scanned", uP = "Check failed, please try again later", hP = "Added", SP = "Modified", fP = "Deleted", PP = "Compare", yP = "File content comparison", CP = "Loading file content...", TP = "Failed to load file content", jP = "Target skipped", kP = "Check progress", bP = "Comparing files...", zP = "Execution log", _P = "No records yet", vP = "%count% entries", $P = "Check started", wP = "Reading the official manifest...", xP = "Official manifest loaded (%count% files), comparing", GP = "Comparing local addon files (%done% / %total%)", NP = "Comparison finished, %count% differing file(s) found", IP = "Comparison finished, no differences found", AP = "Live channel unavailable, switched to polling", BP = "Check cancelled", MP = "Cancel check", LP = "Start check", DP = "Check cancelled", RP = "The local code matches the official code", EP = "Checked %count% file(s), no differences found", OP = "Restore", FP = "Local", UP = "Official", WP = "Official content is unavailable", qP = 'An "Added" file only exists locally, so there is no official content to restore', KP = "Restore", HP = "Confirm restore", VP = "%count% selected file(s) (%size%) will be overwritten with the official content. Originals are backed up first.", YP = "Please confirm the consequences", QP = "The selected files are replaced by the official package content: any local customization made to them is permanently lost, because the official package does not contain those changes.", XP = 'A "Deleted" item is a file that exists officially but is missing locally — restoring it puts the file back on the site.', ZP = "Originals are backed up on the server first under runtime/integrity/backup (grouped by timestamp and target); the exact path for this run is shown in the result. Backups are never cleaned automatically and there is no one-click rollback — restore manually from the backup directory if needed.", JP = "The restore takes effect immediately: the site starts using the official content. If the site is live, prefer doing this during off-peak hours.", oy = "Restore result", ey = "Done: %ok% restored, %skip% skipped, %fail% failed", ty = "Files that failed to restore", ny = "Files skipped", cy = "Backup directory", sy = "OK", ay = "Close", ry = "Edit", ly = "Create Time", iy = "Sort", dy = "Status", py = "Operation", gy = "Normal", my = "Deactivate", uy = "Confirm", hy = "Cancel", Sy = "Warning", fy = "Show or not", Py = "show", yy = "hidden", Cy = "Open in new window", Ty = "Yes", jy = "No", ky = "When enabled, clicking this menu opens the page in a new tab and hides the sidebar, header and tab bar, showing only the page content", by = "Icon", zy = {
  layoutSetting: "Layout configuration",
  darkMode: "Dark mode",
  themeColor: "Theme color",
  layoutStyle: "Layout style",
  tab: "Show tab bar"
}, _y = {
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
}, vy = "Refresh", $y = {
  closeLeft: "Close left",
  closeRight: "Close right",
  closeCurrent: "Close current",
  closeOther: "Close others",
  closeAll: "Close all",
  more: "More actions"
}, Cm = {
  diffDialogTitle: eP,
  diffVerify: tP,
  backupTip: nP,
  diffSelectAll: cP,
  searchFilePlaceholder: sP,
  search: aP,
  tabAll: rP,
  detectingPrefix: lP,
  noDiff: iP,
  selectedSummary: dP,
  filesUnit: pP,
  confirmAction: gP,
  scanned: mP,
  checkFailed: uP,
  typeNew: hP,
  typeModified: SP,
  typeDeleted: fP,
  compareAction: PP,
  compareTitle: yP,
  compareLoading: CP,
  compareFailed: TP,
  targetSkipped: jP,
  progressTitle: kP,
  checking: bP,
  logTitle: zP,
  logEmpty: _P,
  logTotal: vP,
  logStart: $P,
  logBaseline: wP,
  logReady: xP,
  logScanning: GP,
  logFinishDiff: NP,
  logFinishSame: IP,
  logFallback: AP,
  logCancelled: BP,
  cancelCheck: MP,
  startCheck: LP,
  checkCancelled: DP,
  identical: RP,
  identicalTip: EP,
  restoreAction: OP,
  localLabel: FP,
  officialLabel: UP,
  officialMissing: WP,
  addNotRestorable: qP,
  confirmRestore: KP,
  restoreConfirmTitle: HP,
  restoreConfirmTip: VP,
  restoreConsequenceTitle: YP,
  restoreConsequenceOverwrite: QP,
  restoreConsequenceDeleted: XP,
  restoreConsequenceBackup: ZP,
  restoreConsequenceLive: JP,
  restoreDoneTitle: oy,
  restoreSummary: ey,
  restoreFailedList: ty,
  restoreSkippedList: ny,
  backupDirLabel: cy,
  restoreDoneOk: sy,
  close: ay,
  edit: ry,
  delete: "Delete",
  createTime: ly,
  sort: iy,
  status: dy,
  operation: py,
  statusNormal: gy,
  statusDeactivate: my,
  confirm: uy,
  cancel: hy,
  warning: Sy,
  isShow: fy,
  show: Py,
  hidden: yy,
  isBlank: Cy,
  blankYes: Ty,
  blankNo: jy,
  isBlankTip: ky,
  icon: by,
  layout: zy,
  axios: _y,
  refresh: vy,
  tabs: $y
}, B = /* @__PURE__ */ Object.assign({ "/src/addon/cms/lang/zh-cn/common.json": $m, "/src/addon/erp/lang/zh-cn/common.json": xm, "/src/addon/home_service/lang/zh-cn/common.json": Nm, "/src/addon/huaweicloud_obs/lang/zh-cn/common.json": Am, "/src/addon/huaweicloud_sms/lang/zh-cn/common.json": Mm, "/src/addon/o2o/lang/zh-cn/common.json": Dm, "/src/addon/seckill/lang/zh-cn/common.json": Em, "/src/addon/shop/lang/zh-cn/common.json": Fm, "/src/addon/shop_fenxiao/lang/zh-cn/common.json": Wm, "/src/addon/shop_giftcard/lang/zh-cn/common.json": Km, "/src/addon/sow_community/lang/zh-cn/common.json": Vm, "/src/addon/tourism/lang/zh-cn/common.json": Qm, "/src/addon/vipcard/lang/zh-cn/common.json": Zm }), M = /* @__PURE__ */ Object.assign({});
for (const e in B)
  Object.assign(ym, B[e].default);
for (const e in M)
  Object.assign(Cm, M[e].default);
let j = km({
  locale: "zh-cn",
  fallbackLocale: "zh-cn",
  datetimeFormats: {},
  numberFormats: {},
  globalInjection: !0,
  //是否全局注入
  silentTranslationWarn: !0,
  messages: {
    "zh-cn": ym,
    en: Cm
  },
  silentFallbackWarn: !0
});
const Dy = new gu(j);
var wy = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, x = {}, xy = {
  get exports() {
    return x;
  },
  set exports(e) {
    x = e;
  }
};
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(e, t) {
  (function(o, c) {
    e.exports = c();
  })(wy, function() {
    var o = {};
    o.version = "0.2.0";
    var c = o.settings = {
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
    o.configure = function(n) {
      var s, l;
      for (s in n)
        l = n[s], l !== void 0 && n.hasOwnProperty(s) && (c[s] = l);
      return this;
    }, o.status = null, o.set = function(n) {
      var s = o.isStarted();
      n = a(n, c.minimum, 1), o.status = n === 1 ? null : n;
      var l = o.render(!s), g = l.querySelector(c.barSelector), u = c.speed, f = c.easing;
      return l.offsetWidth, i(function(d) {
        c.positionUsing === "" && (c.positionUsing = o.getPositioningCSS()), m(g, p(n, u, f)), n === 1 ? (m(l, {
          transition: "none",
          opacity: 1
        }), l.offsetWidth, setTimeout(function() {
          m(l, {
            transition: "all " + u + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            o.remove(), d();
          }, u);
        }, u)) : setTimeout(d, u);
      }), this;
    }, o.isStarted = function() {
      return typeof o.status == "number";
    }, o.start = function() {
      o.status || o.set(0);
      var n = function() {
        setTimeout(function() {
          o.status && (o.trickle(), n());
        }, c.trickleSpeed);
      };
      return c.trickle && n(), this;
    }, o.done = function(n) {
      return !n && !o.status ? this : o.inc(0.3 + 0.5 * Math.random()).set(1);
    }, o.inc = function(n) {
      var s = o.status;
      return s ? (typeof n != "number" && (n = (1 - s) * a(Math.random() * s, 0.1, 0.95)), s = a(s + n, 0, 0.994), o.set(s)) : o.start();
    }, o.trickle = function() {
      return o.inc(Math.random() * c.trickleRate);
    }, function() {
      var n = 0, s = 0;
      o.promise = function(l) {
        return !l || l.state() === "resolved" ? this : (s === 0 && o.start(), n++, s++, l.always(function() {
          s--, s === 0 ? (n = 0, o.done()) : o.set((n - s) / n);
        }), this);
      };
    }(), o.render = function(n) {
      if (o.isRendered())
        return document.getElementById("nprogress");
      k(document.documentElement, "nprogress-busy");
      var s = document.createElement("div");
      s.id = "nprogress", s.innerHTML = c.template;
      var l = s.querySelector(c.barSelector), g = n ? "-100" : r(o.status || 0), u = document.querySelector(c.parent), f;
      return m(l, {
        transition: "all 0 linear",
        transform: "translate3d(" + g + "%,0,0)"
      }), c.showSpinner || (f = s.querySelector(c.spinnerSelector), f && A(f)), u != document.body && k(u, "nprogress-custom-parent"), u.appendChild(s), s;
    }, o.remove = function() {
      I(document.documentElement, "nprogress-busy"), I(document.querySelector(c.parent), "nprogress-custom-parent");
      var n = document.getElementById("nprogress");
      n && A(n);
    }, o.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, o.getPositioningCSS = function() {
      var n = document.body.style, s = "WebkitTransform" in n ? "Webkit" : "MozTransform" in n ? "Moz" : "msTransform" in n ? "ms" : "OTransform" in n ? "O" : "";
      return s + "Perspective" in n ? "translate3d" : s + "Transform" in n ? "translate" : "margin";
    };
    function a(n, s, l) {
      return n < s ? s : n > l ? l : n;
    }
    function r(n) {
      return (-1 + n) * 100;
    }
    function p(n, s, l) {
      var g;
      return c.positionUsing === "translate3d" ? g = { transform: "translate3d(" + r(n) + "%,0,0)" } : c.positionUsing === "translate" ? g = { transform: "translate(" + r(n) + "%,0)" } : g = { "margin-left": r(n) + "%" }, g.transition = "all " + s + "ms " + l, g;
    }
    var i = function() {
      var n = [];
      function s() {
        var l = n.shift();
        l && l(s);
      }
      return function(l) {
        n.push(l), n.length == 1 && s();
      };
    }(), m = function() {
      var n = ["Webkit", "O", "Moz", "ms"], s = {};
      function l(d) {
        return d.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(h, S) {
          return S.toUpperCase();
        });
      }
      function g(d) {
        var h = document.body.style;
        if (d in h)
          return d;
        for (var S = n.length, C = d.charAt(0).toUpperCase() + d.slice(1), y; S--; )
          if (y = n[S] + C, y in h)
            return y;
        return d;
      }
      function u(d) {
        return d = l(d), s[d] || (s[d] = g(d));
      }
      function f(d, h, S) {
        h = u(h), d.style[h] = S;
      }
      return function(d, h) {
        var S = arguments, C, y;
        if (S.length == 2)
          for (C in h)
            y = h[C], y !== void 0 && h.hasOwnProperty(C) && f(d, C, y);
        else
          f(d, S[1], S[2]);
      };
    }();
    function P(n, s) {
      var l = typeof n == "string" ? n : _(n);
      return l.indexOf(" " + s + " ") >= 0;
    }
    function k(n, s) {
      var l = _(n), g = l + s;
      P(l, s) || (n.className = g.substring(1));
    }
    function I(n, s) {
      var l = _(n), g;
      P(n, s) && (g = l.replace(" " + s + " ", " "), n.className = g.substring(1, g.length - 1));
    }
    function _(n) {
      return (" " + (n.className || "") + " ").replace(/\s+/gi, " ");
    }
    function A(n) {
      n && n.parentNode && n.parentNode.removeChild(n);
    }
    return o;
  });
})(xy);
const L = x, Gy = zm("app", {
  state: () => ({
    route: {},
    routeRefreshTag: !0,
    pageReturn: !1
  }),
  actions: {
    refreshRouterView() {
      this.routeRefreshTag = !1, L.start(), $(() => {
        this.routeRefreshTag = !0, L.done();
      });
    }
  }
});
function Ny() {
  return bm() ? _m() : Gy().route;
}
const Ry = (e) => {
  const t = Ny();
  let o = cu(t);
  const c = su(t);
  o || (o = um(c));
  const r = `${mm(o, c)}.${e}`;
  return j.global.t(r) != r ? j.global.t(r) : j.global.t(e);
}, Ey = {
  install(e) {
    e.use(j);
  }
};
export {
  Ey as default,
  j as i18n,
  Dy as language,
  Ry as t
};
