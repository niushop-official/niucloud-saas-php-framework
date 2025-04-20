<template>
  <view :style="themeColor()">
    <view class="bg-[#F6F8FA] min-h-screen overflow-hidden" v-if="!loading">
      <view class="outline-border">
        <image class="w-[240rpx] h-[180rpx] rounded mr-3" :src="img(detail.cover_thumb_mid)" mode="aspectFill" />
        <view class="flex flex-col py-1 flex-1">
          <view class="font-bold multi-hidden">{{ detail.goods_name }}</view>
          <view class="text-xs text-[var(--text-color-light6)]" v-if="detail.keywords">{{ detail.keywords }}</view>
          <view class="mt-auto font-bold text-[#FF3223]">￥{{ detail.price }}</view>
        </view>
      </view>

      <!-- 预约技师 -->
      <view class="outline-border flex-justify">
        <view class="flex-align">
          <text class="nc-iconfont nc-icon-qiuzhirenyuanV6xx1 text-[28rpx] text-[#4D4D4D] font-bold"></text>
          <input class="uni-input text-sm ml-2" :placeholder="t('selectTechnician')" disabled="true" v-model="reserveSave.technician_name" />
        </view>
        <view class="flex-align text-[#63676D]" @click="userShow = true">
          <text class="text-sm">{{ t('pleaseChoose') }}</text>
          <text class="text-[26rpx] nc-iconfont nc-icon-youV6xx"></text>
        </view>
      </view>

      <u-picker
        :show="userShow"
        :columns="userList"
        :closeOnClickOverlay="true"
        keyName="label"
        @confirm="userConfirmFn"
        @cancel="userShow = false"
        @close="userShow = false"
      ></u-picker>

      <!-- 预约时间 -->
      <view class="outline-border flex-col">
        <view class="flex-justify !w-full">
          <view class="flex-align">
            <text class="text-[28rpx] text-[#4D4D4D] font-bold nc-iconfont nc-icon-a-shijianV6xx-36"></text>
            <text class="text-sm ml-2">{{ t('reserveTime') }}</text>
          </view>
        </view>
        <view class="mt-2">
          <pretty-times selectedItemColor="var(--primary-color)" selectedTabColor="var(--primary-color)"  selectedBorderColor="var(--primary-color)"  @change="getTime" ref="prettyTimesRef" :isMultiple="false"></pretty-times>
        </view>
      </view>

      <!-- 手机号 -->
      <view class="outline-border flex-justify">
        <text class="text-sm">{{ t('mobile') }}</text>
        <view class="flex-align text-[#63676D]">
          <input class="uni-input text-sm ml-2 text-right" type="number" :placeholder="t('mobilePlaceholder')" v-model="reserveSave.mobile" maxlength="11" />
        </view>
      </view>

      <!-- 备注 -->
      <view class="outline-border flex-justify">
        <text class="text-sm">{{ t('remark') }}</text>
        <view class="flex-align text-[#63676D]">
          <input class="uni-input text-sm ml-2 text-right" :placeholder="t('fillRemark')" v-model="reserveSave.remark" />
        </view>
      </view>

      <view class="h-[84rpx] tab-bar-placeholder w-screen"></view>
      <view class="flex justify-between bg-white px-3 tab-bar fixed z-10 bottom-0 left-0 right-0">
        <view class="flex items-center">
          <view class="flex flex-col items-center mr-[44rpx]" @click="redirect({ url: '/addon/vipcard/pages/index', mode: 'reLaunch' })">
            <image class="w-[44rpx] h-[44rpx]" :src="img('addon/vipcard/vipcard/service/index.png')" mode="aspectFill" />
            <text class="text-xs whitespace-nowrap text-[#454545] mt-1">{{ t('index') }}</text>
          </view>
          <view class="flex flex-col items-center mr-[44rpx]" @click="redirect({ url: '/app/pages/member/contact', mode: 'reLaunch' })">
            <image class="w-[44rpx] h-[44rpx]" :src="img('addon/vipcard/vipcard/service/service.png')" mode="aspectFill" />
            <text class="text-xs whitespace-nowrap text-[#454545] mt-1">{{ t('service') }}</text>
          </view>
          <view class="flex flex-col items-center mr-[44rpx]" @click="collect">
            <image class="w-[44rpx] h-[44rpx]" v-if="collectId > 0" :src="img('addon/vipcard/vipcard/service/select_collect.png')" mode="aspectFill" />
            <image class="w-[44rpx] h-[44rpx]" v-else :src="img('addon/vipcard/vipcard/service/collect.png')" mode="aspectFill" />
            <text class="text-xs whitespace-nowrap text-[#454545] mt-1">{{ t('collect') }}</text>
          </view>
        </view>
        <u-button :text="detail.is_reserve ? t('reserve') : t('buy')" class="flex-1 !rounded-3xl !m-1" type="primary" size="16" @click="toOrder(detail)">
        </u-button>
      </view>

      <pay ref="payRef" @close="payClose"></pay>
    </view>
    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad, onShow } from '@dcloudio/uni-app'
  import { useLogin } from '@/hooks/useLogin'
  import { img, redirect, urlDeconstruction, getToken, isWeixinBrowser } from '@/utils/common'
  import { getServiceDetail, getUserList, reserveApply, setCollect, getCollect, deleteCollect } from '@/addon/vipcard/api/vipcard'
  import { t } from '@/locale'
  import useMemberStore from '@/stores/member'
  import { useSubscribeMessage } from '@/hooks/useSubscribeMessage'
  import PrettyTimes from '@/addon/vipcard/components/pretty-times/pretty-times.vue'
  import { wechatSync } from '@/app/api/system'

  const getTime = (e) => {
    reserveSave.value.reserve_date = e
  }

  let detail = ref<Array<any>>([])
  let loading = ref<boolean>(true)

  let userList = ref([[]]) // 技师
  let userShow = ref(false) // 控制技师列表
  let prettyTimesRef = ref(null) //预约组件的Ref

  let reserveSave = ref({
    member_id: '',
    reserve_name: '',
    reserve_date: '',
    goods_id: '',
    remark: '',
    technician_id: '',
    technician_name: '',
    mobile: ''
  })

  onLoad((option) => {
    loading.value = true
    reserveSave.value.goods_id = option.id
    getServiceDetail(option.id).then((res) => {
      detail.value = res.data
      // 设置头部
      uni.setNavigationBarTitle({
        title: detail.value.goods_name
      })
      loading.value = false
    })

    if (getToken()) {
      memberStore.getMemberInfo()
    }

    getUserList().then((res) => {
      if (res.data.length) {
        res.data.forEach((item, index) => {
          let obj = {}
          obj.label = item.name
          obj.id = item.id
          console.log(obj)
          userList.value[0].push(obj)
        })
      } else {
        userList.value[0].push({
          label: '暂无技师',
          id: ''
        })
      }
    })
  })

  // 选择技师列表
  const userConfirmFn = (data) => {
    reserveSave.value.technician_id = data.value[0].id
    reserveSave.value.technician_name = data.value[0].label
    userShow.value = false
  }
  // 会员信息
  const memberStore = useMemberStore()

  // #ifdef H5
  const { query } = urlDeconstruction(location.href)
  if (query.code && isWeixinBrowser()) {
    wechatSync({ code: query.code }).then((res) => {
      memberStore.getMemberInfo()
    })
  }
  // #endif

  // 验证方法
  const createVerify = () => {
    if (uni.$u.test.isEmpty(reserveSave.value.mobile)) {
      uni.showToast({ title: t('mobilePlaceholder'), icon: 'none' })
      return false
    }

    if (!uni.$u.test.mobile(reserveSave.value.mobile)) {
      uni.showToast({ title: t('correctMobilePlaceholder'), icon: 'none' })
      return false
    }

    return true
  }

  // 支付
  const payRef = ref(null)
  let reserveId = 0
  // 跳转到详情
  const toOrder = (data) => {
    reserveSave.value.member_id = memberStore.info.member_id
    reserveSave.value.reserve_name = memberStore.info.nickname

    // 确认预约
    prettyTimesRef.value.handleSubmit()

    if (createVerify()) {
      reserveApply(reserveSave.value).then((res) => {
        useSubscribeMessage().request('vipcard_reserve_expire_remind')
        if (detail.value.is_reserve_pay) {
          reserveId = res.data.reserve_id
          payRef.value?.open(res.data.trade_type, res.data.trade_id, `/addon/vipcard/pages/order/detail?order_id=${res.data.trade_id}`)
        } else {
          uni.setStorageSync('reserveReturn', encodeURIComponent(`/addon/vipcard/pages/order/my_reserved_detail?id=${res.data.reserve_id}`))
          redirect({ url: '/addon/vipcard/pages/reserve/result', mode: 'redirectTo' })
        }
      })
    }
  }

  const payClose = () => {
    redirect({ url: '/addon/vipcard/pages/order/my_reserved_detail', param: { id: reserveId }, mode: 'redirectTo' })
  }

  const collectId = ref(0)
  onShow(() => {
    if (getToken()) {
      setTimeout(function () {
        getMemberCollect()
      }, 700)
    }
  })

  const getMemberCollect = () => {
    getCollect({
      goods_id: reserveSave.value.goods_id,
      type: 'vipcard'
    }).then((res) => {
      if (res.data) collectId.value = res.data.id
      if (!res.data) collectId.value = 0
    })
  }

  const collect = () => {
    if (getToken()) {
      if (collectId.value > 0) {
        deleteCollect(collectId.value).then(() => {
          getMemberCollect()
        })
      } else {
        setCollect({
          goods_id: reserveSave.value.goods_id,
          type: 'vipcard'
        }).then(() => {
          getMemberCollect()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text-color {
    color: $u-primary;
  }
  .bg-color {
    background-color: $u-primary;
  }
  .text-scale {
    transform: scale(0.8);
  }
  .outline-border {
    @apply flex bg-[#fff] rounded-lg mx-3 mt-4 p-3;
  }
  .flex-justify {
    width: calc(100% - 48rpx);
    @apply flex justify-between items-center box-border;
  }

  .flex-align {
    @apply flex items-center;
  }
  .tab-bar {
    padding-top: 16rpx;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 16rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 16rpx);
  }
  .tab-bar-placeholder {
    padding-bottom: calc(constant(safe-area-inset-bottom) + 32rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 32rpx);
  }
</style>
