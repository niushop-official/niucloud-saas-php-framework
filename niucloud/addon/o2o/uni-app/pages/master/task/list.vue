<template>
  <view :style="themeColor()">
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden">
      <view class="fixed left-0 top-0 right-0 z-10" v-if="!statusLoading">
        <scroll-view scroll-x="true" class="scroll-Y box-border px-[24rpx] bg-white">
          <view class="flex whitespace-nowrap justify-around">
            <view :class="['text-sm leading-[90rpx]', { 'class-select': orderState === item.status.toString() }]"
              @click="orderStateFn(item.status)" v-for="item in orderStateList">{{ item.name }}</view>
          </view>
        </scroll-view>
      </view>

      <mescroll-body ref="mescrollRef" top="104rpx" @init="mescrollInit" :down="{ use: false }" @up="getTechnicianOrderListFn">
        <view class="goods-wrap">
          <template v-for="(item, index) in list" :key="index">
            <view class="mb-[30rpx] bg-[#fff] rounded-md">
              <view class="goods-item" @click="toLink(item.order_id)">
                <view class="goods-head justify-between items-center">
                  <text>{{ t('serviceDate') }}{{ item.reserve_service_time }}</text>
                  <text class="text-[var(--primary-color)]">{{ item.order_status_info.name }}</text>
                </view>
                <view :class="{ 'mt-[20rpx]': subIndex }" v-for="(subItem, subIndex) in item.item" :key="subIndex">
                  <view class="order-goods-item flex">
                    <view class="w-[160rpx] h-[160rpx] flex-2">
                      <u--image
                        class="rounded-[10rpx] overflow-hidden"
                        width="160rpx"
                        height="160rpx"
                        :src="img(subItem.item_image ? subItem.item_image : '')"
                        model="aspectFill">
                        <template #error>
                          <u-icon name="photo" color="#999" size="50"></u-icon>
                        </template>
                      </u--image>
                    </view>
                    <view class="ml-[20rpx] flex-1 flex flex-col justify-between">
                      <view class="flex justify-between">
                        <text class="max-h-[80rpx] w-[380rpx] text-[28rpx] leading-[40rpx] multi-hidden">{{ subItem.item_name }}</text>
                        <text v-if="subItem.item_type == 'custom'" class="shrink-0 ml-[10rpx] text-[24rpx] leading-[40rpx] text-[var(--primary-color)]">{{ subItem.pay_time ? t('havePaid') : t('notPaid') }}</text>
                      </view>
                      <view class="text-[24rpx] mt-[20rpx] flex">
                        <text class="text-[var(--primary-color)] rounded-[6rpx] py-[6rpx] bg-[var(--primary-color-light)] px-[10rpx]">{{ subItem.item_type_name }}</text>
                      </view>
                      <view class="text-[28rpx] mt-auto flex justify-between">
                        <text class="px-[10rpx] py-[4rpx] text-[var(--price-text-color)] price-font">￥{{ subItem.price }}</text>
                        <text class="text-[22rpx] ml-[20rpx]">x{{ subItem.num }}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="mt-[34rpx] flex justify-end">
                  <view class="inline-block text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full"
                    @click.stop="callPhoto(item.taker_mobile)">{{ t('contact') }}</view>
                  <view v-for="(btnItem, btnIndex) in item.order_status_info.technician_action" :key="btnIndex"
                    class="inline-block text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[20rpx]"
                    @click.stop="orderBtnFn(item, btnItem.key)">{{ btnItem.name }}</view>
                </view>
              </view>
            </view>
          </template>
        </view>
        <mescroll-empty :option="{ icon: img('static/resource/images/empty.png'), tip: t('nothingMore') }" v-if="!list.length && loading"></mescroll-empty>
      </mescroll-body>
    </view>
    <u-modal
      :show="showService"
      showCancelButton="true"
      @cancel="showService = false"
      @confirm="beginServiceFn"
      width="500rpx"
      confirmColor="var(--primary-color)">
      <template #default>
        <u--form labelPosition="left" class="!w-[100%]" labelWidth="100rpx" :labelStyle="{ fontSize: '24rpx' }">
          <u-form-item :label="t('checkCode')">
            <u-code-input v-model="checkCode" :maxlength="4" :focus="true" size="50rpx" fontSize="32rpx"></u-code-input>
          </u-form-item>
        </u--form>
      </template>
    </u-modal>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { t } from '@/locale'
  import { img, redirect } from '@/utils/common'
  import { getTechnicianStatus, getTechnicianOrder, beginService, finishService, TransferOrder } from '@/addon/o2o/api/o2o'
  import { checkTechnician } from '@/addon/o2o/api/technician'
  import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
  import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
  import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
  import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
  import useConfigStore from '@/stores/config'

  const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)
  const list = ref<Array<Object>>([])
  const loading = ref<boolean>(false)
  const statusLoading = ref<boolean>(false)
  const orderState = ref('')
  const orderStateList = ref([])

  onLoad((option) => {
    orderState.value = option.order_status || ''
    checkTechnicianFn()
  })

  // 验证是否是技师
  const checkTechnicianFn = () => {
    checkTechnician().then((res) => {
      if (!Object.keys(res.data).length) {
        redirect({ url: '/addon/o2o/pages/index', mode: 'reLaunch' })
      } else {
        getTechnicianStatusFn()
      }
    })
  }

  // 获取订单状态
  const getTechnicianStatusFn = () => {
      statusLoading.value = true
      orderStateList.value = []
      let obj = { name: '全部', status: '' }
      orderStateList.value.push(obj)
      getTechnicianStatus().then((res) => {
          Object.values(res.data).forEach((item, index) => {
              orderStateList.value.push(item)
          })
          statusLoading.value = false
      }).catch(() => {
          statusLoading.value = false
      })
  }

  // 切换状态
  const orderStateFn = (status) => {
    orderState.value = status.toString()
    list.value = []
    getMescroll().resetUpScroll()
  }

  const getTechnicianOrderListFn = (mescroll) => {
      loading.value = false
      let data: object = {
          page: mescroll.num,
          limit: mescroll.size,
          order_status: orderState.value
      }
      getTechnicianOrder(data).then((res) => {
          let newArr = res.data.data as Array<Object>
          //设置列表数据
          if (mescroll.num == 1) {
              list.value = [] //如果是第一页需手动制空列表
          }
          list.value = list.value.concat(newArr)
          mescroll.endSuccess(newArr.length)
          loading.value = true
      }).catch(() => {
          loading.value = true
          mescroll.endErr() // 请求失败, 结束加载
      })
  }

  // 跳转详情页
  const toLink = (order_id: any) => {
    redirect({ url: '/addon/o2o/pages/master/task/detail', param: { order_id } })
  }
  // 联系
  const callPhoto = (tel) => {
    uni.makePhoneCall({
      phoneNumber: tel
    })
  }

  let orderId = ''
  const orderBtnFn = (data: any, key: any) => {
    if (key == 'transfer_order') {
      transferOrderFn(data)
    } else if (key == 'start') {
      orderId = data.order_id
      showService.value = true
    } else if (key == 'finish') {
      uni.showModal({
        title: '提示',
        content: '您确定要完成该订单吗？',
        confirmColor: useConfigStore().themeColor['--primary-color'],
        success: (res) => {
          if (res.confirm) {
            finishServiceFn(data)
          }
        }
      })
    } else if (key == 'service_pay') {
      redirect({ url: '/addon/o2o/pages/master/task/add', param: { order_id: data.order_id } })
    }
  }

  // 转单
  const transferOrderFn = (val: any) => {
    uni.showModal({
      title: '提示',
      content: '您确定要转单吗？',
      confirmColor: useConfigStore().themeColor['--primary-color'],
      success: (res) => {
        if (res.confirm) {
          TransferOrder({ order_id: val.order_id }).then((res) => {
            getMescroll().resetUpScroll()
          })
        }
      }
    })
  }

  //开始服务
  const showService = ref(false)
  const checkCode = ref('')

  const beginServiceFn = () => {
    if (checkCode.value == '') {
      uni.showToast({
        title: '请输入正确的服务码',
        icon: 'none',
        duration: 1000
      })
      return
    }
    let obj = {
      order_id: orderId,
      check_code: checkCode.value
    }
    beginService(obj)
      .then((res) => {
        showService.value = false
        redirect({ url: '/addon/o2o/pages/master/task/detail', param: { order_id: orderId } })
      })
      .catch(() => {
        uni.showToast({
          title: '请输入正确的服务码',
          icon: 'none',
          duration: 1000
        })
        checkCode.value = ''
      })
  }
  // 结束服务
  const finishServiceFn = (val) => {
    finishService({ order_id: val.order_id }).then((res) => {
      getMescroll().resetUpScroll()
    })
  }
</script>
<style lang="scss" scoped>
  .font-scale {
    transform: scale(0.75);
  }

  .text-color {
    color: $u-primary;
  }

  .bg-color {
    background-color: $u-primary;
  }

  .goods-wrap {
    margin: 20rpx 20rpx 0;

    .goods-item {
      @apply w-full flex flex-col bg-[#fff] py-3 px-4 box-border;
      border-radius: 18rpx;
      overflow: hidden;

      .goods-head {
        @apply flex pb-3 border-0 border-b-1 border-solid border-[#F0F0F0] mb-4;
        font-size: 26rpx;
        color: #666;
      }

      .goods-content {
        @apply flex;

        & > image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 30rpx;
        }

        & > view {
          flex: 1;
        }

        .name-wrap {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30rpx;

          & > view {
            &:first-of-type {
              font-weight: bold;
              font-size: 30rpx;
            }

            &:last-of-type {
              color: #ea4b69;
              font-size: 28rpx;
              font-weight: bold;
            }
          }
        }

        .desc {
          color: #686868;
          font-size: 26rpx;
          margin-bottom: 14rpx;
        }

        .time-wrap {
          display: flex;
          align-items: center;
          background-color: #f6f7fb;
          border-radius: 8rpx;
          height: 62rpx;
          font-size: 26rpx;
          padding: 0 16rpx;

          text {
            &:nth-child(1) {
              color: #444;
              margin-right: 14rpx;
            }

            &:nth-child(2) {
              color: #686868;
            }

            &:nth-child(3) {
              color: #333;
              font-weight: bold;
            }
          }
        }

        .btn-wrap {
          justify-content: flex-end;
          @apply flex margin-0 mt-2 flex-wrap;

          button {
            width: 172rpx;
            height: 64rpx;
            font-size: 26rpx;
            @apply rounded-3xl;
            line-height: 64rpx;
            background-color: transparent;
            margin: 0;
            margin-left: 20rpx;
            @apply mt-2;
            border: 2rpx solid #e2e2e2;

            &[type='primary'] {
              background-color: $u-primary;
            }

            &::after {
              border: none;
            }
          }
        }
      }
    }
  }

  .class-select {
    position: relative;
    font-weight: bold;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 6rpx;
      background-color: $u-primary;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
