<template>
    <view class="diy-group" id="componentList">
        <top-tabbar :scrollBool="diyGroup.componentsScrollBool.TopTabbar" v-if="data.global && Object.keys(data.global).length && data.global.topStatusBar && data.global.topStatusBar.isShow" ref="topTabbarRef" :data="data.global" />
        <view v-for="(component, index) in data.value" :key="component.id"
        @click="diyStore.changeCurrentIndex(index, component)"
        :class="diyGroup.getComponentClass(index,component)" :style="component.pageStyle">
            <view class="relative" :style="{ marginTop : component.margin.top < 0 ? (component.margin.top * 2) + 'rpx' : '0' }">
                <!-- 装修模式下，设置负上边距后超出的内容，禁止选中设置 -->
                <view v-if="diyGroup.isShowPlaceHolder(index,component)" class="absolute w-full z-1" :style="{ height : (component.margin.top * 2 * -1) + 'rpx' }" @click.stop="diyGroup.placeholderEvent"></view>
            <template v-if="component.componentName == 'ActiveCube'">
                <diy-active-cube ref="diyActiveCubeRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ActiveCube" />
            </template>
            <template v-if="component.componentName == 'CarouselSearch'">
                <diy-carousel-search ref="diyCarouselSearchRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.CarouselSearch" />
            </template>
            <template v-if="component.componentName == 'FloatBtn'">
                <diy-float-btn ref="diyFloatBtnRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FloatBtn" />
            </template>
            <template v-if="component.componentName == 'FormAddress'">
                <diy-form-address ref="diyFormAddressRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormAddress" />
            </template>
            <template v-if="component.componentName == 'FormCheckbox'">
                <diy-form-checkbox ref="diyFormCheckboxRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormCheckbox" />
            </template>
            <template v-if="component.componentName == 'FormDate'">
                <diy-form-date ref="diyFormDateRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormDate" />
            </template>
            <template v-if="component.componentName == 'FormDateScope'">
                <diy-form-date-scope ref="diyFormDateScopeRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormDateScope" />
            </template>
            <template v-if="component.componentName == 'FormEmail'">
                <diy-form-email ref="diyFormEmailRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormEmail" />
            </template>
            <template v-if="component.componentName == 'FormFile'">
                <diy-form-file ref="diyFormFileRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormFile" />
            </template>
            <template v-if="component.componentName == 'FormIdentity'">
                <diy-form-identity ref="diyFormIdentityRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormIdentity" />
            </template>
            <template v-if="component.componentName == 'FormIdentityPrivacy'">
                <diy-form-identity-privacy ref="diyFormIdentityPrivacyRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormIdentityPrivacy" />
            </template>
            <template v-if="component.componentName == 'FormImage'">
                <diy-form-image ref="diyFormImageRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormImage" />
            </template>
            <template v-if="component.componentName == 'FormInput'">
                <diy-form-input ref="diyFormInputRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormInput" />
            </template>
            <template v-if="component.componentName == 'FormLocation'">
                <diy-form-location ref="diyFormLocationRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormLocation" />
            </template>
            <template v-if="component.componentName == 'FormMobile'">
                <diy-form-mobile ref="diyFormMobileRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormMobile" />
            </template>
            <template v-if="component.componentName == 'FormNumber'">
                <diy-form-number ref="diyFormNumberRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormNumber" />
            </template>
            <template v-if="component.componentName == 'FormPrivacy'">
                <diy-form-privacy ref="diyFormPrivacyRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormPrivacy" />
            </template>
            <template v-if="component.componentName == 'FormPrivacyPop'">
                <diy-form-privacy-pop ref="diyFormPrivacyPopRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormPrivacyPop" />
            </template>
            <template v-if="component.componentName == 'FormRadio'">
                <diy-form-radio ref="diyFormRadioRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormRadio" />
            </template>
            <template v-if="component.componentName == 'FormSubmit'">
                <diy-form-submit ref="diyFormSubmitRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormSubmit" />
            </template>
            <template v-if="component.componentName == 'FormTable'">
                <diy-form-table ref="diyFormTableRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormTable" />
            </template>
            <template v-if="component.componentName == 'FormTextarea'">
                <diy-form-textarea ref="diyFormTextareaRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormTextarea" />
            </template>
            <template v-if="component.componentName == 'FormTime'">
                <diy-form-time ref="diyFormTimeRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormTime" />
            </template>
            <template v-if="component.componentName == 'FormTimeScope'">
                <diy-form-time-scope ref="diyFormTimeScopeRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormTimeScope" />
            </template>
            <template v-if="component.componentName == 'FormVideo'">
                <diy-form-video ref="diyFormVideoRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormVideo" />
            </template>
            <template v-if="component.componentName == 'FormWechatName'">
                <diy-form-wechat-name ref="diyFormWechatNameRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FormWechatName" />
            </template>
            <template v-if="component.componentName == 'GraphicNav'">
                <diy-graphic-nav ref="diyGraphicNavRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.GraphicNav" />
            </template>
            <template v-if="component.componentName == 'HorzBlank'">
                <diy-horz-blank ref="diyHorzBlankRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.HorzBlank" />
            </template>
            <template v-if="component.componentName == 'HorzLine'">
                <diy-horz-line ref="diyHorzLineRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.HorzLine" />
            </template>
            <template v-if="component.componentName == 'HotArea'">
                <diy-hot-area ref="diyHotAreaRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.HotArea" />
            </template>
            <template v-if="component.componentName == 'ImageAds'">
                <diy-image-ads ref="diyImageAdsRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ImageAds" />
            </template>
            <template v-if="component.componentName == 'MemberInfo'">
                <diy-member-info ref="diyMemberInfoRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.MemberInfo" />
            </template>
            <template v-if="component.componentName == 'MemberLevel'">
                <diy-member-level ref="diyMemberLevelRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.MemberLevel" />
            </template>
            <template v-if="component.componentName == 'Notice'">
                <diy-notice ref="diyNoticeRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.Notice" />
            </template>
            <template v-if="component.componentName == 'PictureShow'">
                <diy-picture-show ref="diyPictureShowRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.PictureShow" />
            </template>
            <template v-if="component.componentName == 'RichText'">
                <diy-rich-text ref="diyRichTextRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.RichText" />
            </template>
            <template v-if="component.componentName == 'RubikCube'">
                <diy-rubik-cube ref="diyRubikCubeRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.RubikCube" />
            </template>
            <template v-if="component.componentName == 'Text'">
                <diy-text ref="diyTextRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.Text" />
            </template>
            <template v-if="component.componentName == 'VipcardCard'">
                <diy-vipcard-card ref="diyVipcardCardRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.VipcardCard" />
            </template>
            <template v-if="component.componentName == 'VipcardReserve'">
                <diy-vipcard-reserve ref="diyVipcardReserveRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.VipcardReserve" />
            </template>
            <template v-if="component.componentName == 'VipcardStore'">
                <diy-vipcard-store ref="diyVipcardStoreRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.VipcardStore" />
            </template>
            <template v-if="component.componentName == 'TourismHotel'">
                <diy-tourism-hotel ref="diyTourismHotelRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.TourismHotel" />
            </template>
            <template v-if="component.componentName == 'TourismTickets'">
                <diy-tourism-tickets ref="diyTourismTicketsRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.TourismTickets" />
            </template>
            <template v-if="component.componentName == 'TourismTravel'">
                <diy-tourism-travel ref="diyTourismTravelRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.TourismTravel" />
            </template>
            <template v-if="component.componentName == 'Article'">
                <diy-article ref="diyArticleRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.Article" />
            </template>
            <template v-if="component.componentName == 'TkVipLevel'">
                <diy-tk-vip-level ref="diyTkVipLevelRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.TkVipLevel" />
            </template>
            <template v-if="component.componentName == 'TkVipManage'">
                <diy-tk-vip-manage ref="diyTkVipManageRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.TkVipManage" />
            </template>
            <template v-if="component.componentName == 'TkVipReal'">
                <diy-tk-vip-real ref="diyTkVipRealRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.TkVipReal" />
            </template>
            <template v-if="component.componentName == 'GoodsCoupon'">
                <diy-goods-coupon ref="diyGoodsCouponRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.GoodsCoupon" />
            </template>
            <template v-if="component.componentName == 'GoodsList'">
                <diy-goods-list ref="diyGoodsListRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.GoodsList" />
            </template>
            <template v-if="component.componentName == 'ManyGoodsList'">
                <diy-many-goods-list ref="diyManyGoodsListRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ManyGoodsList" />
            </template>
            <template v-if="component.componentName == 'ShopExchangeGoods'">
                <diy-shop-exchange-goods ref="diyShopExchangeGoodsRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ShopExchangeGoods" />
            </template>
            <template v-if="component.componentName == 'ShopExchangeInfo'">
                <diy-shop-exchange-info ref="diyShopExchangeInfoRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ShopExchangeInfo" />
            </template>
            <template v-if="component.componentName == 'ShopGoodsRanking'">
                <diy-shop-goods-ranking ref="diyShopGoodsRankingRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ShopGoodsRanking" />
            </template>
            <template v-if="component.componentName == 'ShopGoodsRecommend'">
                <diy-shop-goods-recommend ref="diyShopGoodsRecommendRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ShopGoodsRecommend" />
            </template>
            <template v-if="component.componentName == 'ShopMemberInfo'">
                <diy-shop-member-info ref="diyShopMemberInfoRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ShopMemberInfo" />
            </template>
            <template v-if="component.componentName == 'ShopNewcomer'">
                <diy-shop-newcomer ref="diyShopNewcomerRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ShopNewcomer" />
            </template>
            <template v-if="component.componentName == 'ShopOrderInfo'">
                <diy-shop-order-info ref="diyShopOrderInfoRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ShopOrderInfo" />
            </template>
            <template v-if="component.componentName == 'ShopSearch'">
                <diy-shop-search ref="diyShopSearchRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.ShopSearch" />
            </template>
            <template v-if="component.componentName == 'SingleRecommend'">
                <diy-single-recommend ref="diySingleRecommendRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.SingleRecommend" />
            </template>
            <template v-if="component.componentName == 'FenxiaoGoodsList'">
                <diy-fenxiao-goods-list ref="diyFenxiaoGoodsListRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.FenxiaoGoodsList" />
            </template>
            <template v-if="component.componentName == 'O2oGoodsList'">
                <diy-o2o-goods-list ref="diyO2oGoodsListRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.O2oGoodsList" />
            </template>
            <template v-if="component.componentName == 'O2oMemberInfo'">
                <diy-o2o-member-info ref="diyO2oMemberInfoRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.O2oMemberInfo" />
            </template>
            <template v-if="component.componentName == 'O2oOrderInfo'">
                <diy-o2o-order-info ref="diyO2oOrderInfoRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.O2oOrderInfo" />
            </template>
            <template v-if="component.componentName == 'O2oSearch'">
                <diy-o2o-search ref="diyO2oSearchRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.O2oSearch" />
            </template>
            <template v-if="component.componentName == 'O2oTechnician'">
                <diy-o2o-technician ref="diyO2oTechnicianRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.O2oTechnician" />
            </template>
            <template v-if="component.componentName == 'GiftcardList'">
                <diy-giftcard-list ref="diyGiftcardListRef" :component="component" :global="data.global" :index="index" :scrollBool="diyGroup.componentsScrollBool.GiftcardList" />
            </template>
            </view>
        </view>
        <template v-if="diyStore.mode == '' && data.global && data.global.bottomTabBarSwitch">
            <view class="pt-[20rpx]"></view>
            <tabbar />
        </template>
    </view>
</template>
<script lang="ts" setup>
   import diyVipcardCard from '@/addon/vipcard/components/diy/vipcard-card/index.vue';
   import diyVipcardReserve from '@/addon/vipcard/components/diy/vipcard-reserve/index.vue';
   import diyVipcardStore from '@/addon/vipcard/components/diy/vipcard-store/index.vue';
   import diyTourismHotel from '@/addon/tourism/components/diy/tourism-hotel/index.vue';
   import diyTourismTickets from '@/addon/tourism/components/diy/tourism-tickets/index.vue';
   import diyTourismTravel from '@/addon/tourism/components/diy/tourism-travel/index.vue';
   import diyArticle from '@/addon/cms/components/diy/article/index.vue';
   import diyTkVipLevel from '@/addon/tk_vip/components/diy/tk-vip-level/index.vue';
   import diyTkVipManage from '@/addon/tk_vip/components/diy/tk-vip-manage/index.vue';
   import diyTkVipReal from '@/addon/tk_vip/components/diy/tk-vip-real/index.vue';
   import diyGoodsCoupon from '@/addon/shop/components/diy/goods-coupon/index.vue';
   import diyGoodsList from '@/addon/shop/components/diy/goods-list/index.vue';
   import diyManyGoodsList from '@/addon/shop/components/diy/many-goods-list/index.vue';
   import diyShopExchangeGoods from '@/addon/shop/components/diy/shop-exchange-goods/index.vue';
   import diyShopExchangeInfo from '@/addon/shop/components/diy/shop-exchange-info/index.vue';
   import diyShopGoodsRanking from '@/addon/shop/components/diy/shop-goods-ranking/index.vue';
   import diyShopGoodsRecommend from '@/addon/shop/components/diy/shop-goods-recommend/index.vue';
   import diyShopMemberInfo from '@/addon/shop/components/diy/shop-member-info/index.vue';
   import diyShopNewcomer from '@/addon/shop/components/diy/shop-newcomer/index.vue';
   import diyShopOrderInfo from '@/addon/shop/components/diy/shop-order-info/index.vue';
   import diyShopSearch from '@/addon/shop/components/diy/shop-search/index.vue';
   import diySingleRecommend from '@/addon/shop/components/diy/single-recommend/index.vue';
   import diyFenxiaoGoodsList from '@/addon/shop_fenxiao/components/diy/fenxiao-goods-list/index.vue';
   import diyO2oGoodsList from '@/addon/o2o/components/diy/o2o-goods-list/index.vue';
   import diyO2oMemberInfo from '@/addon/o2o/components/diy/o2o-member-info/index.vue';
   import diyO2oOrderInfo from '@/addon/o2o/components/diy/o2o-order-info/index.vue';
   import diyO2oSearch from '@/addon/o2o/components/diy/o2o-search/index.vue';
   import diyO2oTechnician from '@/addon/o2o/components/diy/o2o-technician/index.vue';
   import diyGiftcardList from '@/addon/shop_giftcard/components/diy/giftcard-list/index.vue';
   import topTabbar from '@/components/top-tabbar/top-tabbar.vue'
   import useDiyStore from '@/app/stores/diy';
   import { useDiyGroup } from './useDiyGroup';
   import { ref,getCurrentInstance } from 'vue';

   const props = defineProps(['data']);
   const instance: any = getCurrentInstance();
   const getFormRef = () => {
       return {
           componentRefs: instance.refs
       }
   }
   const diyStore = useDiyStore();
   const diyGroup = useDiyGroup({
       ...props,
       getFormRef
   });
   const data = ref(diyGroup.data);

   // 监听页面加载完成
   diyGroup.onMounted();

   // 监听滚动事件
   diyGroup.onPageScroll();
   defineExpose({
       refresh: diyGroup.refresh,
       getFormRef
   })
</script>
<style lang="scss" scoped>
   @import './index.scss';
</style>
