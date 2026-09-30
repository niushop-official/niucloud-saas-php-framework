import { _ as Fe } from "./detail-form-image-e71c2081.js";
import { _ as qe } from "./detail-form-render-e9d7c43c.js";
import { _ as Me } from "./edit-form-address-9220f899.js";
import { _ as Je } from "./edit-form-checkbox-6d5ea724.js";
import { _ as We } from "./edit-form-date-scope-a931f92b.js";
import { _ as Ge } from "./edit-form-date-5d2e00d0.js";
import { _ as He } from "./edit-form-email-8db02024.js";
import { _ as Ke } from "./edit-form-file-553e2bef.js";
import { _ as Ye } from "./edit-form-identity-64eb9b64.js";
import { _ as Qe } from "./edit-form-image-80e891aa.js";
import { _ as Xe } from "./edit-form-input-e55cb738.js";
import { _ as Ze } from "./edit-form-location-49eb2193.js";
import { _ as eo } from "./edit-form-mobile-28a244dc.js";
import { _ as oo } from "./edit-form-number-ae053460.js";
import { _ as to } from "./edit-form-radio-c10834d7.js";
import { _ as no } from "./edit-form-submit-23ba43e8.js";
import { _ as io } from "./edit-form-table-77cc706f.js";
import { _ as lo } from "./edit-form-textarea-2a4967bb.js";
import { _ as so } from "./edit-form-time-scope-885d50bf.js";
import { _ as ao } from "./edit-form-time-be24d530.js";
import { _ as ro } from "./edit-form-video-fa77d6f8.js";
import { _ as po } from "./edit-form-wechat-name-0d43e6a3.js";
import { _ as mo } from "./form-select-content-1914485e.js";
import { _ as co } from "./form-submit-popup-28dc97ae.js";
import { _ as uo } from "./form-write-popup-4ddb248c.js";
import { a as vo } from "./add-theme-d01c987c.js";
import { _ as _o } from "./edit-active-cube-887cb245.js";
import { _ as fo } from "./edit-carousel-search-d67efa33.js";
import { _ as go } from "./edit-float-btn-customer-6333a378.js";
import { _ as yo } from "./edit-float-btn-fcd94ed4.js";
import { _ as bo } from "./edit-graphic-nav-dcabcdbd.js";
import { _ as ho } from "./edit-horz-blank-157b14ff.js";
import { _ as xo } from "./edit-horz-line-e2658c6b.js";
import { _ as wo } from "./edit-hot-area-3a80f368.js";
import { _ as Co } from "./edit-image-ads-08e77e6a.js";
import { _ as ko } from "./edit-member-info-af86586f.js";
import { _ as So } from "./edit-member-level-d2905609.js";
import { _ as Vo } from "./edit-notice-512ed91e.js";
import { _ as To } from "./edit-page-56ab3e75.js";
import { _ as Bo } from "./edit-picture-show-05367bf8.js";
import { _ as Uo } from "./edit-rich-text-f519a3be.js";
import { _ as Oo } from "./edit-rubik-cube-687fb031.js";
import { _ as zo } from "./edit-text-b8b9c211.js";
import { a as Do } from "./edit-theme-c45d1a46.js";
import { _ as No } from "./tabbar-select-popup-e476ba8e.js";
import { _ as Ao } from "./theme-list-9833e5dc.js";
import { _ as n } from "./_addon-external_empty-b652abd0.js";
import { defineComponent as Po, inject as Ro, ref as b, reactive as le, toRaw as O, computed as jo, watch as ke, defineAsyncComponent as Lo, resolveComponent as v, openBlock as m, createElementBlock as _, createVNode as i, withCtx as s, createElementVNode as d, unref as e, toDisplayString as p, Fragment as q, renderList as se, createBlock as h, createTextVNode as x, normalizeClass as ae, normalizeStyle as D, createCommentVNode as u, withDirectives as oe, vShow as te, resolveDynamicComponent as Io, pushScopeId as $o, popScopeId as Eo } from "vue";
import { bT as Fo, t as l, j as Se, bU as qo, m as Mo, bV as Jo, bW as Wo, a as Go } from "./core-shared-c6ad4e77.js";
import { ArrowLeft as Ho } from "@element-plus/icons-vue";
import { useRoute as Ko, useRouter as Yo } from "vue-router";
import { c as de } from "./lodash-8c6c2daa.js";
import { ElMessageBox as Ve, ElMessage as Te } from "element-plus";
import { u as Qo } from "./diy-452683aa.js";
import "./browser-f778b9ec.js";
import "axios";
import "vue-i18n";
import "pinia";
const M = (J) => ($o("data-v-53ed83b2"), J = J(), Eo(), J), Xo = { class: "main-container flex-1" }, Zo = { class: "pl-[5px] text-[14px]" }, et = { class: "text-white ml-[10px] mr-[20px] flex items-center" }, ot = /* @__PURE__ */ M(() => /* @__PURE__ */ d("span", { class: "mr-[5px] text-[rgba(255,255,255,.5)]" }, "｜", -1)), tt = { class: "mr-[5px] text-[14px]" }, nt = { class: "flex items-center" }, it = { class: "text-white mr-[10px] text-base" }, lt = { class: "w-[180px]" }, st = /* @__PURE__ */ M(() => /* @__PURE__ */ d("div", { class: "flex-1" }, null, -1)), at = { class: "full-container flex flex-row flex-1 bg-page" }, dt = { class: "component-list w-[290px]" }, rt = { class: "flex flex-row flex-wrap" }, pt = ["title", "onClick"], mt = { class: "block text-[12px] truncate" }, ct = { class: "preview-wrap flex-1 relative mt-[20px]" }, ut = { class: "diy-view-wrap w-[375px] shadow-lg mx-auto" }, vt = {
  key: 0,
  class: "content-wrap"
}, _t = {
  key: 1,
  class: "content-wrap"
}, ft = {
  key: 0,
  class: "h-[28px] max-w-[150px] mr-[8px]"
}, gt = ["src"], yt = {
  key: 2,
  class: "content-wrap"
}, bt = {
  key: 0,
  class: "title-wrap"
}, ht = ["src"], xt = { class: "search" }, wt = /* @__PURE__ */ M(() => /* @__PURE__ */ d("span", { class: "nc-iconfont nc-icon-sousuo-duanV6xx1 !text-[12px] absolute left-[10px]" }, null, -1)), Ct = { class: "text-[12px]" }, kt = {
  key: 3,
  class: "content-wrap"
}, St = { class: "preview-block relative" }, Vt = { class: "quick-action absolute text-center -right-[70px] top-[20px] w-[42px] rounded shadow-md" }, Tt = ["src"], Bt = { class: "preview-iframe w-[375px] pt-[20px] px-[20px]" }, Ut = { class: "font-bold text-xl mb-[40px]" }, Ot = { class: "mb-[20px] flex flex-col" }, zt = { class: "mb-[10px]" }, Dt = { class: "edit-attribute-wrap w-[400px]" }, Nt = { class: "card-header flex justify-between items-center" }, At = { class: "title flex-1" }, Pt = {
  key: 0,
  class: "tab-wrap flex rounded-[50px] bg-gray-100 text-[14px]"
}, Rt = { class: "edit-component-wrap" }, jt = {
  key: 0,
  class: "edit-attr-item-wrap"
}, Lt = { class: "mb-[10px]" }, It = { class: "flex items-center" }, $t = { class: "mr-[3px]" }, Et = { class: "font-bold text-[13px] mb-[5px]" }, Ft = { class: "ml-[10px]" }, qt = { class: "ml-[10px]" }, Mt = { class: "ml-[10px]" }, Jt = { class: "ml-[10px]" }, Wt = { class: "font-bold text-[13px] mb-[5px] mt-[10px]" }, Gt = { class: "ml-[10px]" }, Ht = { class: "ml-[10px]" }, Kt = /* @__PURE__ */ M(() => /* @__PURE__ */ d("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1)), Yt = { class: "text-sm text-gray-400" }, Qt = {
  key: 0,
  class: "edit-attr-item-wrap"
}, Xt = { class: "mb-[10px]" }, Zt = {
  key: 0,
  class: "edit-attr-item-wrap"
}, en = { class: "mb-[10px]" }, on = { class: "flex items-center" }, tn = { class: "mr-[3px]" }, nn = /* @__PURE__ */ M(() => /* @__PURE__ */ d("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1)), ln = { class: "edit-attr-item-wrap" }, sn = { class: "mb-[10px]" }, an = { class: "edit-attr-item-wrap" }, dn = { class: "mb-[10px]" }, rn = { class: "edit-attr-item-wrap" }, pn = { class: "mb-[10px]" }, mn = { class: "text-sm text-gray-400 ml-[90px] mb-[10px]" }, cn = /* @__PURE__ */ Po({
  __name: "edit",
  setup(J) {
    Ro("setLayout")("decorate");
    const o = Qo(), V = Ko(), re = Yo();
    V.query.form_id = V.query.form_id || 0, V.query.type = V.query.type || "", V.query.back = V.query.back || "/site/diy_form/list";
    const W = V.query.back, N = b(""), pe = b(""), G = b(""), R = b(""), ne = b(""), H = b(!1), K = b(!1), me = b(0), ce = b(0), z = b([]), ue = le([]), ve = b("/app/pages/index/diy_form"), _e = b(ue), Be = (r) => {
    }, j = le({
      form_id: o.id,
      name: o.name,
      pageTitle: o.pageTitle,
      title: o.global.title,
      value: JSON.stringify({
        global: O(o.global),
        value: O(o.value)
      })
    }), Ue = jo(() => {
      let r = 15;
      return o.global.completeLayout == "style-2" && (r = 5, o.editComponent.field.name = o.editComponent.field.name.slice(0, 5)), r;
    }), fe = b(!0), Oe = () => {
      fe.value ? (location.href = `${location.origin}${W}`, re.push(W)) : Ve.confirm(
        l("leavePageTitleTips"),
        l("leavePageContentTips"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning",
          autofocus: !1
        }
      ).then(() => {
        location.href = `${location.origin}${W}`;
      }).catch(() => {
      });
    }, Y = /* @__PURE__ */ Object.assign({ "./components/detail-form-image.vue": Fe, "./components/detail-form-render.vue": qe, "./components/edit-form-address.vue": Me, "./components/edit-form-checkbox.vue": Je, "./components/edit-form-date-scope.vue": We, "./components/edit-form-date.vue": Ge, "./components/edit-form-email.vue": He, "./components/edit-form-file.vue": Ke, "./components/edit-form-identity.vue": Ye, "./components/edit-form-image.vue": Qe, "./components/edit-form-input.vue": Xe, "./components/edit-form-location.vue": Ze, "./components/edit-form-mobile.vue": eo, "./components/edit-form-number.vue": oo, "./components/edit-form-radio.vue": to, "./components/edit-form-submit.vue": no, "./components/edit-form-table.vue": io, "./components/edit-form-textarea.vue": lo, "./components/edit-form-time-scope.vue": so, "./components/edit-form-time.vue": ao, "./components/edit-form-video.vue": ro, "./components/edit-form-wechat-name.vue": po, "./components/form-select-content.vue": mo, "./components/form-submit-popup.vue": co, "./components/form-write-popup.vue": uo }), ge = /* @__PURE__ */ Object.assign({});
    ge && Object.assign(Y, ge);
    const ye = /* @__PURE__ */ Object.assign({ "../diy/components/add-theme.vue": vo, "../diy/components/edit-active-cube.vue": _o, "../diy/components/edit-carousel-search.vue": fo, "../diy/components/edit-float-btn-customer.vue": go, "../diy/components/edit-float-btn.vue": yo, "../diy/components/edit-graphic-nav.vue": bo, "../diy/components/edit-horz-blank.vue": ho, "../diy/components/edit-horz-line.vue": xo, "../diy/components/edit-hot-area.vue": wo, "../diy/components/edit-image-ads.vue": Co, "../diy/components/edit-member-info.vue": ko, "../diy/components/edit-member-level.vue": So, "../diy/components/edit-notice.vue": Vo, "../diy/components/edit-page.vue": To, "../diy/components/edit-picture-show.vue": Bo, "../diy/components/edit-rich-text.vue": Uo, "../diy/components/edit-rubik-cube.vue": Oo, "../diy/components/edit-text.vue": zo, "../diy/components/edit-theme.vue": Do, "../diy/components/tabbar-select-popup.vue": No, "../diy/components/theme-list.vue": Ao }), be = /* @__PURE__ */ Object.assign({ "/src/addon/cms/views/diy/components/edit-article.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-basic-info.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-bottom.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-desc.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-friend-help-info.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-gameplay.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-goods-info.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-progress.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-carousel.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-goods-detail-basic-info.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-goods-detail-bottom.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-goods-detail-desc.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-goods-detail-gameplay.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-goods-detail-progress.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-goods-detail-purchase-service.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-hot.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-list.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-member-info.vue": n, "/src/addon/friend_help/views/diy/components/edit-friend-help-order-info.vue": n, "/src/addon/home_service/views/diy/components/edit-homeService-carousel-search.vue": n, "/src/addon/home_service/views/diy/components/edit-homeService-many-goods-list.vue": n, "/src/addon/home_service/views/diy/components/edit-homeService-order-info.vue": n, "/src/addon/home_service/views/diy/components/edit-homeService-rubik-cube.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-banner.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-card.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-cardList.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-guarantee.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-info.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-lowCost.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-panicBuying.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-settle.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-subguarantee.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-technician-list-recommed.vue": n, "/src/addon/home_service/views/diy/components/edit-homeServicemember-technician-list.vue": n, "/src/addon/home_service/views/diy/components/link-select-card.vue": n, "/src/addon/home_service/views/diy/components/link-select-category.vue": n, "/src/addon/home_service/views/diy/components/link-select-goods.vue": n, "/src/addon/o2o/views/diy/components/edit-o2o-goods-list.vue": n, "/src/addon/o2o/views/diy/components/edit-o2o-member-info.vue": n, "/src/addon/o2o/views/diy/components/edit-o2o-order-info.vue": n, "/src/addon/o2o/views/diy/components/edit-o2o-search.vue": n, "/src/addon/o2o/views/diy/components/edit-o2o-technician.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-basic-info.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-bottom.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-desc.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-gameplay.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-goods-info.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-pintuan-info.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-progress.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-goods-detail-basic-info.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-goods-detail-bottom.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-goods-detail-desc.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-goods-detail-gameplay.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-goods-detail-progress.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-goods-detail-purchase-service.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-hot.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-immediately.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-limit.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-list.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-member-info.vue": n, "/src/addon/pintuan/views/diy/components/edit-pintuan-order-info.vue": n, "/src/addon/relay/views/diy/components/edit-relay-goods-list.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-basic-info.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-bottom.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-desc.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-goods-info.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-seckill-info.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-goods-detail-basic-info.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-goods-detail-bottom.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-goods-detail-desc.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-goods-detail-purchase-service.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-goods.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-hot.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-member-info.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-order-info.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-rubik-cube.vue": n, "/src/addon/seckill/views/diy/components/edit-seckill-special-offer.vue": n, "/src/addon/shop/views/diy/components/edit-goods-coupon.vue": n, "/src/addon/shop/views/diy/components/edit-goods-list.vue": n, "/src/addon/shop/views/diy/components/edit-many-goods-list.vue": n, "/src/addon/shop/views/diy/components/edit-shop-exchange-goods.vue": n, "/src/addon/shop/views/diy/components/edit-shop-exchange-info.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-detail-attr.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-detail-basic-info.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-detail-bottom.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-detail-desc.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-detail-evaluate.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-detail-purchase-service.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-detail-sow.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-hot.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-ranking.vue": n, "/src/addon/shop/views/diy/components/edit-shop-goods-recommend.vue": n, "/src/addon/shop/views/diy/components/edit-shop-member-info.vue": n, "/src/addon/shop/views/diy/components/edit-shop-newcomer.vue": n, "/src/addon/shop/views/diy/components/edit-shop-order-info.vue": n, "/src/addon/shop/views/diy/components/edit-shop-search.vue": n, "/src/addon/shop/views/diy/components/edit-single-recommend.vue": n, "/src/addon/shop_fenxiao/views/diy/components/edit-fenxiao-goods-list.vue": n, "/src/addon/shop_giftcard/views/diy/components/edit-giftcard-list.vue": n, "/src/addon/tourism/views/diy/components/edit-tourism-hotel.vue": n, "/src/addon/tourism/views/diy/components/edit-tourism-tickets.vue": n, "/src/addon/tourism/views/diy/components/edit-tourism-travel.vue": n, "/src/addon/vipcard/views/diy/components/edit-vipcard-card.vue": n, "/src/addon/vipcard/views/diy/components/edit-vipcard-reserve.vue": n, "/src/addon/vipcard/views/diy/components/edit-vipcard-store.vue": n });
    ye && Object.assign(Y, ye), be && Object.assign(Y, be);
    const Q = {};
    for (const [r, t] of Object.entries(Y)) {
      const k = r.split("/").pop().split(".")[0];
      Q[k] = t.default;
    }
    const X = le({}), ze = (r) => {
      qo({
        type: r
      }).then((t) => {
        for (const w in t.data)
          X[w] = t.data[w];
      });
    };
    ke(
      () => N.value,
      (r, t) => {
        pe.value = t;
      }
    );
    const De = (r) => {
      if (o.value.length)
        Ve.confirm(l("changeTemplatePageTips"), l("warning"), {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }).then(() => {
          if (o.changeCurrentIndex(-99), o.init(), r) {
            let t = de(X[r].data);
            o.global = t.global, t.value.length && (o.value = t.value);
          }
        }).catch(() => {
          N.value = pe.value;
        });
      else if (o.init(), r) {
        let t = de(X[r].data);
        o.global = t.global, t.value.length && (o.value = t.value);
      }
    };
    ke(
      () => o,
      (r, t) => {
        const w = {
          form_id: r.id,
          name: r.name,
          pageTitle: r.pageTitle,
          title: r.global.title,
          value: JSON.stringify({
            global: O(r.global),
            value: O(r.value)
          })
        };
        o.postMessage(), fe.value = JSON.stringify(w) == JSON.stringify(j);
      },
      { deep: !0 }
    ), Fo({
      form_id: V.query.form_id,
      type: V.query.type
    }).then(async (r) => {
      var k;
      const t = r.data;
      if (o.init(), o.id = t.form_id || 0, o.pageTitle = t.page_title, o.type = t.type, o.typeName = t.type_name, o.templateName = t.template, N.value = t.template, t.value) {
        const C = t.value;
        o.global = C.global, C.value.length && (o.value = C.value);
      } else
        o.global.title = t.title;
      j.form_id = o.id, j.pageTitle = o.pageTitle, j.title = o.global.title, j.value = JSON.stringify({
        global: O(o.global),
        value: O(o.value)
      }), z.value = t.component;
      for (const C in z.value) {
        ue.push(C);
        for (const S in z.value[C].list) {
          const f = de(z.value[C].list[S]);
          f.id = o.generateRandom(), f.componentName = S, f.componentTitle = f.title, Object.assign(f, f.value), delete f.name, delete f.title, delete f.value, delete f.icon, o.components.push(f);
        }
      }
      if (z.value) {
        const { loadAddonComponent: C, getInstalledAddonKeys: S } = await import("./core-shared-c6ad4e77.js").then((g) => g.jH), f = S();
        for (const g of Object.values(z.value))
          if (g.list)
            for (const Z of Object.keys(g.list)) {
              const ee = g.list[Z], B = ((k = ee.value) == null ? void 0 : k.path) || ee.path || Z;
              Q[B] || (Q[B] = Lo(
                () => (async () => {
                  for (const T of f) {
                    const I = C(T, "diy/components", B);
                    try {
                      const y = await I();
                      if (y != null && y.default)
                        return y.default;
                    } catch {
                    }
                  }
                  throw new Error(`DIY component "${B}" not found in any addon`);
                })()
              ));
            }
      }
      ze(t.type), R.value = t.domain_url.wap_domain, G.value = t.domain_url.wap_url, !0 && xe();
    });
    const he = b(!1);
    window.addEventListener("message", (r) => {
      try {
        let t = {
          type: ""
        };
        if (typeof r.data == "string" ? t = JSON.parse(r.data) : typeof r.data == "object" && (t = r.data), !t.type)
          return;
        switch (t.type) {
          case "appOnLaunch":
          case "appOnReady":
            K.value = !1, H.value = !0;
            let w = new Date().getTime();
            ce.value = w - me.value, he.value = !0;
            break;
          case "init":
            o.load = !0, o.postMessage();
            break;
          case "change":
            o.changeCurrentIndex(t.index, t.component);
            break;
          case "data":
            o.changeCurrentIndex(t.index, t.component), o.global = t.global, o.value = t.value;
            break;
        }
      } catch (t) {
        console.log("diy edit 后台接受数据错误", t);
      }
    }, !1);
    const Ne = () => {
      if (R.value.trim().length == 0) {
        Te({
          type: "warning",
          message: `${l("wapDomainPlaceholder")}`
        });
        return;
      }
      G.value = R.value + "/wap", xe(), Mo.set({ key: "wap_domain", data: G.value }), H.value = !0, K.value = !1;
    }, xe = () => {
      ne.value = `${G.value}${ve.value}?mode=decorate`;
      const r = () => {
        me.value = new Date().getTime(), Ae();
      };
      r();
      let t = 0, w = setInterval(() => {
        if (he.value || t >= 50) {
          clearInterval(w);
          return;
        }
        r(), t++;
      }, 200);
      setTimeout(() => {
        ce.value == 0 && Pe();
      }, 1e3 * 10);
    }, Ae = () => {
      const r = JSON.stringify({
        type: "appOnReady",
        message: "加载完成"
      });
      window.previewIframe && window.previewIframe.contentWindow.postMessage(r, "*");
    }, Pe = () => {
      K.value = !0, H.value = !1, ne.value = "";
    }, Re = () => {
      for (let r = 0; r < o.value.length; r++)
        try {
          if (o.value[r].componentType == "diy_form" && o.value[r].componentName != "FormSubmit" && o.value[r].field.name == "")
            return o.changeCurrentIndex(r, o.value[r]), Te({
              message: l("fieldNamePlaceholder"),
              type: "warning"
            }), !1;
        } catch (t) {
          console.log("verifyFormComponent Error:", t, r, o.value[r]);
        }
      return !0;
    }, L = b(!1), we = (r) => {
      if (!o.verify() || !Re() || L.value)
        return;
      L.value = !0, o.templateName = N.value;
      let t = {
        form_id: o.id,
        name: o.name,
        page_title: o.pageTitle,
        title: o.global.title,
        type: o.type,
        template: o.templateName,
        value: JSON.stringify({
          global: O(o.global),
          value: O(o.value)
        })
      };
      (o.id ? Jo : Wo)(t).then((k) => {
        L.value = !1, k.code == 1 && (o.id ? L.value = !1 : location.href = `${location.origin}${W}`, r && r(k.data.form_id));
      }).catch(() => {
        L.value = !1;
      });
    }, je = () => {
      we((r) => {
        r = o.id || r;
        const t = re.resolve({
          path: "/site/preview/wap",
          query: {
            page: `${ve.value}?form_id=` + r
          }
        });
        window.open(t.href);
      });
    }, Le = (r) => {
      r == "style-2" && o.value.forEach((t, w) => {
        t.componentType == "diy_form" && t.componentName != "FormSubmit" && (t.field.name = t.field.name.slice(0, 5));
      });
    }, Ie = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/dev/pluginDev/configLocalDevEnv.html");
    };
    return (r, t) => {
      const w = v("el-icon"), k = v("el-option"), C = v("el-select"), S = v("el-button"), f = v("el-header"), g = v("icon"), Z = v("el-collapse-item"), ee = v("el-collapse"), B = v("el-scrollbar"), T = v("el-tooltip"), I = v("el-input"), y = v("el-radio"), $ = v("el-radio-group"), c = v("el-form-item"), ie = v("el-switch"), A = v("el-form"), U = v("el-slider"), P = v("el-color-picker"), $e = v("upload-image"), Ee = v("el-card");
      return m(), _("div", Xo, [
        i(f, { class: "flex items-center h-[60px] bg-primary px-[20px]" }, {
          default: s(() => [
            d("div", {
              class: "text-white cursor-pointer flex items-center",
              onClick: Oe
            }, [
              i(w, { size: "14" }, {
                default: s(() => [
                  i(e(Ho))
                ]),
                _: 1
              }),
              d("span", Zo, p(e(l)("back")), 1)
            ]),
            d("div", et, [
              ot,
              d("span", tt, p(e(l)("decorating")) + "：" + p(e(o).typeName), 1)
            ]),
            d("div", nt, [
              d("span", it, p(e(l)("templatePagePlaceholder")), 1),
              d("div", lt, [
                i(C, {
                  size: "small",
                  modelValue: N.value,
                  "onUpdate:modelValue": t[0] || (t[0] = (a) => N.value = a),
                  placeholder: e(l)("templatePagePlaceholder"),
                  onChange: De
                }, {
                  default: s(() => [
                    i(k, {
                      label: e(l)("templatePageEmpty"),
                      value: ""
                    }, null, 8, ["label"]),
                    (m(!0), _(q, null, se(X, (a, E) => (m(), h(k, {
                      label: a.title,
                      value: E,
                      key: E
                    }, null, 8, ["label", "value"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "placeholder"])
              ])
            ]),
            st,
            i(S, {
              onClick: t[1] || (t[1] = (a) => je())
            }, {
              default: s(() => [
                x(p(e(l)("preview")), 1)
              ]),
              _: 1
            }),
            i(S, {
              onClick: t[2] || (t[2] = (a) => we())
            }, {
              default: s(() => [
                x(p(e(l)("save")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        d("div", at, [
          d("div", dt, [
            i(B, { class: "px-[10px]" }, {
              default: s(() => [
                i(ee, {
                  modelValue: _e.value,
                  "onUpdate:modelValue": t[3] || (t[3] = (a) => _e.value = a),
                  onChange: Be
                }, {
                  default: s(() => [
                    (m(!0), _(q, null, se(z.value, (a, E) => (m(), h(Z, {
                      key: E,
                      title: a.title,
                      name: E
                    }, {
                      default: s(() => [
                        d("ul", rt, [
                          (m(!0), _(q, null, se(a.list, (F, Ce) => (m(), _("li", {
                            key: Ce,
                            class: "w-2/6 text-center cursor-pointer h-[65px]",
                            title: F.title,
                            onClick: (vn) => e(o).addComponent(Ce, F)
                          }, [
                            F.icon ? (m(), h(g, {
                              key: 0,
                              name: F.icon,
                              size: "20px",
                              class: "inline-block mt-[3px]"
                            }, null, 8, ["name"])) : (m(), h(g, {
                              key: 1,
                              name: "iconfont iconkaifazujian",
                              size: "20px",
                              class: "inline-block mt-[3px]"
                            })),
                            d("span", mt, p(F.title), 1)
                          ], 8, pt))), 128))
                        ])
                      ]),
                      _: 2
                    }, 1032, ["title", "name"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          d("div", ct, [
            i(B, null, {
              default: s(() => [
                i(S, {
                  class: "page-btn absolute right-[20px]",
                  onClick: t[4] || (t[4] = (a) => e(o).changeCurrentIndex(-99))
                }, {
                  default: s(() => [
                    x(p(e(l)("pageSet")), 1)
                  ]),
                  _: 1
                }),
                d("div", ut, [
                  d("div", {
                    class: ae(["preview-head bg-no-repeat bg-center bg-cover cursor-pointer h-[64px]", [e(o).global.topStatusBar.style]]),
                    style: D({ backgroundColor: e(o).global.topStatusBar.bgColor }),
                    onClick: t[5] || (t[5] = (a) => e(o).changeCurrentIndex(-99))
                  }, [
                    e(o).global.topStatusBar.style == "style-1" && e(o).global.topStatusBar.isShow ? (m(), _("div", vt, [
                      d("div", {
                        class: "title-wrap",
                        style: D({ fontSize: "14px", color: e(o).global.topStatusBar.textColor, textAlign: e(o).global.topStatusBar.textAlign })
                      }, p(e(o).global.title), 5)
                    ])) : u("", !0),
                    e(o).global.topStatusBar.style == "style-2" && e(o).global.topStatusBar.isShow ? (m(), _("div", _t, [
                      d("div", {
                        class: "title-wrap",
                        style: D({ color: e(o).global.topStatusBar.textColor })
                      }, [
                        e(o).global.topStatusBar.imgUrl ? (m(), _("div", ft, [
                          d("img", {
                            class: "max-w-[100%] max-h-[100%]",
                            src: e(Se)(e(o).global.topStatusBar.imgUrl),
                            mode: "heightFix"
                          }, null, 8, gt)
                        ])) : u("", !0),
                        d("div", {
                          style: D({ color: e(o).global.topStatusBar.textColor })
                        }, p(e(o).global.title), 5)
                      ], 4)
                    ])) : u("", !0),
                    e(o).global.topStatusBar.style == "style-3" && e(o).global.topStatusBar.isShow ? (m(), _("div", yt, [
                      e(o).global.topStatusBar.imgUrl ? (m(), _("div", bt, [
                        d("img", {
                          class: "max-w-[100%] max-h-[100%]",
                          src: e(Se)(e(o).global.topStatusBar.imgUrl)
                        }, null, 8, ht)
                      ])) : u("", !0),
                      d("div", xt, [
                        wt,
                        d("span", Ct, p(e(o).global.topStatusBar.inputPlaceholder), 1)
                      ])
                    ])) : u("", !0),
                    e(o).global.topStatusBar.style == "style-4" && e(o).global.topStatusBar.isShow ? (m(), _("div", kt, [
                      d("span", {
                        class: "iconfont iconxiazai19 !text-[14px]",
                        style: D({ color: e(o).global.topStatusBar.textColor })
                      }, null, 4),
                      d("div", {
                        class: "title-wrap",
                        style: D({ color: e(o).global.topStatusBar.textColor })
                      }, "我的位置", 4),
                      d("span", {
                        class: "iconfont iconxiangyoujiantou !text-[12px]",
                        style: D({ color: e(o).global.topStatusBar.textColor })
                      }, null, 4)
                    ])) : u("", !0)
                  ], 6),
                  d("div", St, [
                    d("ul", Vt, [
                      i(T, {
                        effect: "light",
                        content: e(l)("moveUpComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          i(g, {
                            name: "iconfont iconjiantoushang",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: e(o).moveUpComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(T, {
                        effect: "light",
                        content: e(l)("moveDownComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          i(g, {
                            name: "iconfont iconjiantouxia",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: e(o).moveDownComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(T, {
                        effect: "light",
                        content: e(l)("copyComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          i(g, {
                            name: "iconfont iconcopy-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: e(o).copyComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(T, {
                        effect: "light",
                        content: e(l)("delComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          i(g, {
                            name: "iconfont icondelete-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: e(o).delComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      i(T, {
                        effect: "light",
                        content: e(l)("resetComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          i(g, {
                            name: "iconfont iconloader-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: e(o).resetComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"])
                    ]),
                    oe(d("iframe", {
                      id: "previewIframe",
                      src: ne.value,
                      frameborder: "0",
                      class: "preview-iframe w-[375px]"
                    }, null, 8, Tt), [
                      [te, H.value]
                    ]),
                    oe(d("div", Bt, [
                      d("div", Ut, p(e(l)("developTitle")), 1),
                      d("div", Ot, [
                        d("text", zt, p(e(l)("wapDomain")), 1),
                        i(I, {
                          modelValue: R.value,
                          "onUpdate:modelValue": t[6] || (t[6] = (a) => R.value = a),
                          modelModifiers: { trim: !0 },
                          placeholder: e(l)("wapDomainPlaceholder"),
                          clearable: ""
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      i(S, {
                        type: "primary",
                        onClick: Ne
                      }, {
                        default: s(() => [
                          x(p(e(l)("confirm")), 1)
                        ]),
                        _: 1
                      }),
                      i(S, {
                        type: "primary",
                        onClick: t[7] || (t[7] = (a) => Ie()),
                        plain: ""
                      }, {
                        default: s(() => [
                          x(p(e(l)("settingTips")), 1)
                        ]),
                        _: 1
                      })
                    ], 512), [
                      [te, K.value]
                    ])
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          d("div", Dt, [
            i(B, null, {
              default: s(() => [
                i(Ee, {
                  class: "box-card",
                  shadow: "never"
                }, {
                  header: s(() => [
                    d("div", Nt, [
                      d("span", At, p(e(o).currentIndex == -99 ? e(l)("pageSet") : e(o).editComponent.componentTitle), 1),
                      e(o).currentComponent ? (m(), _("div", Pt, [
                        d("span", {
                          class: ae(["cursor-pointer rounded-[50px] py-[5px] px-[15px]", { "bg-primary text-white": e(o).editTab == "content" }]),
                          onClick: t[8] || (t[8] = (a) => e(o).editTab = "content")
                        }, p(e(l)("tabEditContent")), 3),
                        d("span", {
                          class: ae(["cursor-pointer rounded-[50px] py-[5px] px-[15px]", { "bg-primary text-white": e(o).editTab == "style" }]),
                          onClick: t[9] || (t[9] = (a) => e(o).editTab = "style")
                        }, p(e(l)("tabEditStyle")), 3)
                      ])) : u("", !0)
                    ])
                  ]),
                  default: s(() => [
                    d("div", Rt, [
                      e(o).currentComponent ? (m(), h(Io(Q[e(o).currentComponent]), {
                        key: e(o).currentIndex,
                        value: e(o).value[e(o).currentIndex]
                      }, {
                        content: s(() => [
                          e(o).currentComponent == "edit-page" ? (m(), _("div", jt, [
                            d("h3", Lt, p(e(l)("formLayout")), 1),
                            i(A, {
                              "label-width": "90px",
                              class: "px-[10px]"
                            }, {
                              default: s(() => [
                                i(c, { class: "display-block" }, {
                                  label: s(() => [
                                    d("div", It, [
                                      d("span", $t, p(e(l)("layoutStyle")), 1),
                                      i(T, {
                                        effect: "light",
                                        placement: "top"
                                      }, {
                                        content: s(() => [
                                          d("h6", Et, p(e(l)("singleTiling")), 1),
                                          d("p", Ft, p(e(l)("singleTilingTipsOne")), 1),
                                          d("p", qt, p(e(l)("singleTilingTipsTwo")), 1),
                                          d("p", Mt, p(e(l)("singleTilingTipsThree")), 1),
                                          d("p", Jt, p(e(l)("singleTilingTipsFour")), 1),
                                          d("h6", Wt, p(e(l)("arrangeSideBySide")), 1),
                                          d("p", Gt, p(e(l)("arrangeSideBySideTipsOne")), 1),
                                          d("p", Ht, p(e(l)("arrangeSideBySideTipsTwo")), 1)
                                        ]),
                                        default: s(() => [
                                          Kt
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  default: s(() => [
                                    i($, {
                                      modelValue: e(o).global.completeLayout,
                                      "onUpdate:modelValue": t[10] || (t[10] = (a) => e(o).global.completeLayout = a),
                                      onChange: Le
                                    }, {
                                      default: s(() => [
                                        i(y, { label: "style-1" }, {
                                          default: s(() => [
                                            x(p(e(l)("singleTiling")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        i(y, { label: "style-2" }, {
                                          default: s(() => [
                                            x(p(e(l)("arrangeSideBySide")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue"]),
                                    d("div", Yt, p(e(l)("layoutStyleTips")), 1)
                                  ]),
                                  _: 1
                                }),
                                oe(i(c, {
                                  label: e(l)("textAlign")
                                }, {
                                  default: s(() => [
                                    i($, {
                                      modelValue: e(o).global.completeAlign,
                                      "onUpdate:modelValue": t[11] || (t[11] = (a) => e(o).global.completeAlign = a)
                                    }, {
                                      default: s(() => [
                                        i(y, { label: "left" }, {
                                          default: s(() => [
                                            x(p(e(l)("textAlignLeft")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        i(y, { label: "right" }, {
                                          default: s(() => [
                                            x(p(e(l)("textAlignRight")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"]), [
                                  [te, e(o).global.completeLayout == "style-2"]
                                ]),
                                oe(i(c, {
                                  label: e(l)("borderControl")
                                }, {
                                  default: s(() => [
                                    i(ie, {
                                      modelValue: e(o).global.borderControl,
                                      "onUpdate:modelValue": t[12] || (t[12] = (a) => e(o).global.borderControl = a)
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"]), [
                                  [te, e(o).global.completeLayout == "style-2"]
                                ])
                              ]),
                              _: 1
                            })
                          ])) : u("", !0)
                        ]),
                        field: s(() => [
                          e(o).editComponent.componentType == "diy_form" ? (m(), _("div", Qt, [
                            d("h3", Xt, p(e(l)("fieleContent")), 1),
                            i(A, {
                              "label-width": "100px",
                              class: "px-[10px]"
                            }, {
                              default: s(() => [
                                i(c, {
                                  label: e(l)("fieldName")
                                }, {
                                  default: s(() => [
                                    i(I, {
                                      modelValue: e(o).editComponent.field.name,
                                      "onUpdate:modelValue": t[13] || (t[13] = (a) => e(o).editComponent.field.name = a),
                                      modelModifiers: { trim: !0 },
                                      placeholder: e(l)("fieldNamePlaceholder"),
                                      clearable: "",
                                      maxlength: e(Ue),
                                      "show-word-limit": ""
                                    }, null, 8, ["modelValue", "placeholder", "maxlength"])
                                  ]),
                                  _: 1
                                }, 8, ["label"]),
                                i(c, {
                                  label: e(l)("filedRemark")
                                }, {
                                  default: s(() => [
                                    i(I, {
                                      modelValue: e(o).editComponent.field.remark.text,
                                      "onUpdate:modelValue": t[14] || (t[14] = (a) => e(o).editComponent.field.remark.text = a),
                                      modelModifiers: { trim: !0 },
                                      placeholder: e(l)("fieldRemarkPlaceholder"),
                                      clearable: "",
                                      maxlength: "60",
                                      "show-word-limit": ""
                                    }, null, 8, ["modelValue", "placeholder"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])
                              ]),
                              _: 1
                            })
                          ])) : u("", !0)
                        ]),
                        other: s(() => [
                          e(o).editComponent.componentType == "diy_form" ? (m(), _("div", Zt, [
                            d("h3", en, p(e(l)("otherSetting")), 1),
                            i(A, {
                              "label-width": "100px",
                              class: "px-[10px]"
                            }, {
                              default: s(() => [
                                i(c, {
                                  label: e(l)("isRequired")
                                }, {
                                  default: s(() => [
                                    i(ie, {
                                      modelValue: e(o).editComponent.field.required,
                                      "onUpdate:modelValue": t[15] || (t[15] = (a) => e(o).editComponent.field.required = a)
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"]),
                                i(c, null, {
                                  label: s(() => [
                                    d("div", on, [
                                      d("span", tn, p(e(l)("hideControl")), 1),
                                      i(T, {
                                        effect: "light",
                                        placement: "top"
                                      }, {
                                        content: s(() => [
                                          d("p", null, p(e(l)("hideControlTipsOne")), 1),
                                          d("p", null, p(e(l)("hideControlTipsTwo")), 1)
                                        ]),
                                        default: s(() => [
                                          nn
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  default: s(() => [
                                    i(ie, {
                                      modelValue: e(o).editComponent.isHidden,
                                      "onUpdate:modelValue": t[16] || (t[16] = (a) => e(o).editComponent.isHidden = a)
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])) : u("", !0)
                        ]),
                        "style-field": s(() => [
                          e(o).editComponent.componentType == "diy_form" ? (m(), _(q, { key: 0 }, [
                            d("div", ln, [
                              d("h3", sn, p(e(l)("textStyle")), 1),
                              i(A, {
                                "label-width": "80px",
                                class: "px-[10px]"
                              }, {
                                default: s(() => [
                                  i(c, {
                                    label: e(l)("textFontSize")
                                  }, {
                                    default: s(() => [
                                      i(U, {
                                        modelValue: e(o).editComponent.fontSize,
                                        "onUpdate:modelValue": t[17] || (t[17] = (a) => e(o).editComponent.fontSize = a),
                                        "show-input": "",
                                        size: "small",
                                        class: "ml-[10px] diy-nav-slider",
                                        min: 12,
                                        max: 18
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  i(c, {
                                    label: e(l)("textFontWeight")
                                  }, {
                                    default: s(() => [
                                      i($, {
                                        modelValue: e(o).editComponent.fontWeight,
                                        "onUpdate:modelValue": t[18] || (t[18] = (a) => e(o).editComponent.fontWeight = a)
                                      }, {
                                        default: s(() => [
                                          i(y, { label: "normal" }, {
                                            default: s(() => [
                                              x(p(e(l)("fontWeightNormal")), 1)
                                            ]),
                                            _: 1
                                          }),
                                          i(y, { label: "bold" }, {
                                            default: s(() => [
                                              x(p(e(l)("fontWeightBold")), 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  i(c, {
                                    label: e(l)("textColor")
                                  }, {
                                    default: s(() => [
                                      i(P, {
                                        modelValue: e(o).editComponent.textColor,
                                        "onUpdate:modelValue": t[19] || (t[19] = (a) => e(o).editComponent.textColor = a)
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"])
                                ]),
                                _: 1
                              })
                            ]),
                            d("div", an, [
                              d("h3", dn, p(e(l)("filedRemarkStyle")), 1),
                              i(A, {
                                "label-width": "80px",
                                class: "px-[10px]"
                              }, {
                                default: s(() => [
                                  i(c, {
                                    label: e(l)("textFontSize")
                                  }, {
                                    default: s(() => [
                                      i(U, {
                                        modelValue: e(o).editComponent.field.remark.fontSize,
                                        "onUpdate:modelValue": t[20] || (t[20] = (a) => e(o).editComponent.field.remark.fontSize = a),
                                        "show-input": "",
                                        size: "small",
                                        class: "ml-[10px] diy-nav-slider",
                                        min: 12,
                                        max: 18
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  i(c, {
                                    label: e(l)("textColor")
                                  }, {
                                    default: s(() => [
                                      i(P, {
                                        modelValue: e(o).editComponent.field.remark.color,
                                        "onUpdate:modelValue": t[21] || (t[21] = (a) => e(o).editComponent.field.remark.color = a)
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"])
                                ]),
                                _: 1
                              })
                            ])
                          ], 64)) : u("", !0)
                        ]),
                        style: s(() => [
                          d("div", rn, [
                            d("h3", pn, p(e(l)("componentStyleTitle")), 1),
                            i(A, {
                              "label-width": "90px",
                              class: "px-[10px]"
                            }, {
                              default: s(() => [
                                e(o).editComponent.ignore.indexOf("pageBgColor") == -1 ? (m(), _(q, { key: 0 }, [
                                  i(c, {
                                    label: e(l)("bottomBgColor")
                                  }, {
                                    default: s(() => [
                                      i(P, {
                                        modelValue: e(o).editComponent.pageStartBgColor,
                                        "onUpdate:modelValue": t[22] || (t[22] = (a) => e(o).editComponent.pageStartBgColor = a),
                                        "show-alpha": "",
                                        predefine: e(o).predefineColors
                                      }, null, 8, ["modelValue", "predefine"]),
                                      i(g, {
                                        name: "iconfont iconmap-connect",
                                        size: "20px",
                                        class: "block !text-gray-400 mx-[5px]"
                                      }),
                                      i(P, {
                                        modelValue: e(o).editComponent.pageEndBgColor,
                                        "onUpdate:modelValue": t[23] || (t[23] = (a) => e(o).editComponent.pageEndBgColor = a),
                                        "show-alpha": "",
                                        predefine: e(o).predefineColors
                                      }, null, 8, ["modelValue", "predefine"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  d("div", mn, p(e(l)("bottomBgTips")), 1)
                                ], 64)) : u("", !0),
                                e(o).editComponent.ignore.indexOf("pageBgColor") == -1 ? (m(), h(c, {
                                  key: 1,
                                  label: e(l)("bgGradientAngle")
                                }, {
                                  default: s(() => [
                                    i($, {
                                      modelValue: e(o).editComponent.pageGradientAngle,
                                      "onUpdate:modelValue": t[24] || (t[24] = (a) => e(o).editComponent.pageGradientAngle = a)
                                    }, {
                                      default: s(() => [
                                        i(y, { label: "to bottom" }, {
                                          default: s(() => [
                                            x(p(e(l)("topToBottom")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        i(y, { label: "to right" }, {
                                          default: s(() => [
                                            x(p(e(l)("leftToRight")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0),
                                e(o).editComponent.ignore.indexOf("componentBgUrl") == -1 ? (m(), h(c, {
                                  key: 2,
                                  label: e(l)("componentBgUrl")
                                }, {
                                  default: s(() => [
                                    i($e, {
                                      modelValue: e(o).editComponent.componentBgUrl,
                                      "onUpdate:modelValue": t[25] || (t[25] = (a) => e(o).editComponent.componentBgUrl = a),
                                      limit: 1
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0),
                                e(o).editComponent.ignore.indexOf("componentBgUrl") == -1 && e(o).editComponent.componentBgUrl ? (m(), h(c, {
                                  key: 3,
                                  label: e(l)("componentBgAlpha")
                                }, {
                                  default: s(() => [
                                    i(U, {
                                      modelValue: e(o).editComponent.componentBgAlpha,
                                      "onUpdate:modelValue": t[26] || (t[26] = (a) => e(o).editComponent.componentBgAlpha = a),
                                      "show-input": "",
                                      size: "small",
                                      min: 0,
                                      max: 10,
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0),
                                e(o).editComponent.ignore.indexOf("componentBgColor") == -1 ? (m(), h(c, {
                                  key: 4,
                                  label: e(l)("componentBgColor")
                                }, {
                                  default: s(() => [
                                    i(P, {
                                      modelValue: e(o).editComponent.componentStartBgColor,
                                      "onUpdate:modelValue": t[27] || (t[27] = (a) => e(o).editComponent.componentStartBgColor = a),
                                      "show-alpha": "",
                                      predefine: e(o).predefineColors
                                    }, null, 8, ["modelValue", "predefine"]),
                                    i(g, {
                                      name: "iconfont iconmap-connect",
                                      size: "20px",
                                      class: "block !text-gray-400 mx-[5px]"
                                    }),
                                    i(P, {
                                      modelValue: e(o).editComponent.componentEndBgColor,
                                      "onUpdate:modelValue": t[28] || (t[28] = (a) => e(o).editComponent.componentEndBgColor = a),
                                      "show-alpha": "",
                                      predefine: e(o).predefineColors
                                    }, null, 8, ["modelValue", "predefine"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0),
                                e(o).editComponent.ignore.indexOf("componentBgColor") == -1 ? (m(), h(c, {
                                  key: 5,
                                  label: e(l)("bgGradientAngle")
                                }, {
                                  default: s(() => [
                                    i($, {
                                      modelValue: e(o).editComponent.componentGradientAngle,
                                      "onUpdate:modelValue": t[29] || (t[29] = (a) => e(o).editComponent.componentGradientAngle = a)
                                    }, {
                                      default: s(() => [
                                        i(y, { label: "to bottom" }, {
                                          default: s(() => [
                                            x(p(e(l)("topToBottom")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        i(y, { label: "to right" }, {
                                          default: s(() => [
                                            x(p(e(l)("leftToRight")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0),
                                e(o).editComponent.ignore.indexOf("marginTop") == -1 ? (m(), h(c, {
                                  key: 6,
                                  label: e(l)("marginTop")
                                }, {
                                  default: s(() => [
                                    i(U, {
                                      modelValue: e(o).editComponent.margin.top,
                                      "onUpdate:modelValue": t[30] || (t[30] = (a) => e(o).editComponent.margin.top = a),
                                      "show-input": "",
                                      size: "small",
                                      min: -100,
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0),
                                e(o).editComponent.ignore.indexOf("marginBottom") == -1 ? (m(), h(c, {
                                  key: 7,
                                  label: e(l)("marginBottom")
                                }, {
                                  default: s(() => [
                                    i(U, {
                                      modelValue: e(o).editComponent.margin.bottom,
                                      "onUpdate:modelValue": t[31] || (t[31] = (a) => e(o).editComponent.margin.bottom = a),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0),
                                e(o).editComponent.ignore.indexOf("marginBoth") == -1 ? (m(), h(c, {
                                  key: 8,
                                  label: e(l)("marginBoth")
                                }, {
                                  default: s(() => [
                                    i(U, {
                                      modelValue: e(o).editComponent.margin.both,
                                      "onUpdate:modelValue": t[32] || (t[32] = (a) => e(o).editComponent.margin.both = a),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0),
                                e(o).editComponent.ignore.indexOf("topRounded") == -1 ? (m(), h(c, {
                                  key: 9,
                                  label: e(l)("topRounded")
                                }, {
                                  default: s(() => [
                                    i(U, {
                                      modelValue: e(o).editComponent.topRounded,
                                      "onUpdate:modelValue": t[33] || (t[33] = (a) => e(o).editComponent.topRounded = a),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider",
                                      max: 100
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0),
                                e(o).editComponent.ignore.indexOf("bottomRounded") == -1 ? (m(), h(c, {
                                  key: 10,
                                  label: e(l)("bottomRounded")
                                }, {
                                  default: s(() => [
                                    i(U, {
                                      modelValue: e(o).editComponent.bottomRounded,
                                      "onUpdate:modelValue": t[34] || (t[34] = (a) => e(o).editComponent.bottomRounded = a),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider",
                                      max: 100
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : u("", !0)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["value"])) : u("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const bi = /* @__PURE__ */ Go(cn, [["__scopeId", "data-v-53ed83b2"]]);
export {
  bi as default
};
