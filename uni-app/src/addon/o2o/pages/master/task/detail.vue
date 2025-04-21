<template>
  <view :style="themeColor()">
    <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" v-if="!loading && Object.keys(detail).length">
      <view class="bg-linear h-[742rpx] pt-3"></view>
      <view class="bg-[#fff] mx-3 py-4 px-3 rounded-md -mt-[740rpx]">
        <view class="flex">
          <view class="min-w-[50rpx] flex items-center justify-center">
            <u-icon name="map" size="20"></u-icon>
          </view>
          <view class="flex flex-col ml-[20rpx]">
            <text class="text-[24rpx] mt-[10rpx] multi-hidden leading-[35rpx]">{{ detail.taker_full_address }}</text>
            <view>
              <text class="text-[24rpx]">{{ detail.taker_name }}</text>
              <text class="text-[24rpx] mt-[15rpx]">{{ detail.taker_mobile }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="flex py-4 px-3 bg-white rounded-md box-border mx-3 mt-[20rpx] task-steps">
        <u-steps :current="current" activeColor="var(--primary-color)">
          <u-steps-item :title="t('placeOrder')" :desc="detail.create_time ? dataTurnTime(detail.create_time) : '---'"></u-steps-item>
          <u-steps-item :title="t('takeOrders')" :desc="detail.dispatch_time ? dataTurnTime(detail.dispatch_time) : '---'"></u-steps-item>
          <u-steps-item :title="t('start')" :desc="detail.service_time ? dataTurnTime(detail.service_time) : '---'"></u-steps-item>
          <u-steps-item :title="t('finish')" :desc="detail.finish_time ? dataTurnTime(detail.finish_time) : '---'"></u-steps-item>
        </u-steps>
      </view>
      <view class="bg-white py-4 px-3 rounded-md box-border mx-3 mt-[20rpx]">
        <view class="flex justify-between items-center pb-3 border-0 border-b-1 border-solid border-[#F0F0F0] mb-3 text-[26rpx] text-[var(--text-color-light6)]">
          <text>{{ t('serviceDate') }}{{ detail.reserve_service_time }}</text>
          <text class="text-[var(--primary-color)]">{{ detail.order_status_info.name }}</text>
        </view>
        <template v-for="(subItem, subIndex) in detail.item" :key="subIndex">
          <view v-if="subItem.item_type == 'buy' || subItem.item_type == 'reservation'">
            <view class="flex items-center border-0" @click="toLink(subItem)">
              <view class="w-[124rpx] h-[124rpx] shrink-0">
                <u--image
                  class="rounded-[10rpx] overflow-hidden"
                  width="124rpx"
                  height="124rpx"
                  :src="img(subItem.item_image ? subItem.item_image : '')"
                  model="aspectFill">
                  <template #error>
                    <u-icon name="photo" color="#999" size="50"></u-icon>
                  </template>
                </u--image>
              </view>
              <view class="flex-1 flex flex-col ml-[20rpx]">
                <view>
                  <text class="text-[28rpx] text-item leading-[40rpx]">{{ subItem.item_name }}</text>
                </view>
                <view class="text-[24rpx] mt-[14rpx] flex">
                  <text class="text-[var(--primary-color)] rounded-[6rpx] py-[6rpx] bg-[var(--primary-color-light)] px-[10rpx]">{{ subItem.item_type_name }}</text>
                </view>
                <view class="text-[28rpx] mt-[14rpx] flex justify-between">
                  <text class="text-[var(--price-text-color)] price-font">￥{{ subItem.price }}</text>
                  <text class="text-[22rpx] ml-[20rpx]">x{{ subItem.num }}</text>
                </view>
              </view>
            </view>
            <view class="flex justify-end self-end w-[100%] mt-[10rpx]">
              <view v-if="subItem.refund_no && subItem.refund_status != '' && subItem.refund_status != 'cancel'"
                class="text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[10rpx]"
                @click="redirect({ url: '/addon/o2o/pages/master/task/refund', param: { refund_no: subItem.refund_no } })"
                >{{ t('viewRefund') }}</view>
            </view>
          </view>
        </template>
      </view>
      <view class="bg-white py-4 px-3 rounded-md box-border mx-3 mt-[20rpx]" v-if="detail.item.length > 1">
        <view class="pb-3 border-0 border-b-1 border-solid border-[#F0F0F0] mb-3 text-[26rpx] text-[var(--text-color-light6)]">
          <text>{{ t('addServiceItem') }}</text>
        </view>
        <template v-for="(subItem, subIndex) in detail.item" :key="subIndex">
          <view v-if="subItem.item_type == 'custom'" :class="{ 'mt-[20rpx]': subIndex }">
            <view class="flex items-center" @click="showServiceFn(subItem)">
              <view class="w-[124rpx] h-[124rpx] shrink-0">
                <u--image
                  class="rounded-[10rpx] overflow-hidden"
                  width="124rpx"
                  height="124rpx"
                  :src="img(subItem.item_image ? subItem.item_image : '')"
                  model="aspectFill">
                  <template #error>
                    <u-icon name="photo" color="#999" size="50"></u-icon>
                  </template>
                </u--image>
              </view>
              <view class="flex-1 flex flex-col ml-[20rpx]">
                <view class="flex justify-between">
                  <text class="w-[420rpx] text-[28rpx] leading-[40rpx]">{{ subItem.item_name }}</text>
                  <!-- <text class="max-h-[80rpx] w-[420rpx] text-[28rpx]  leading-[40rpx] multi-hidden">{{ subItem.item_name }}</text> -->
                  <text class="shrink-0 ml-[10rpx] text-[24rpx] leading-[40rpx] text-[var(--primary-color)]">{{ subItem.pay_time ? t('havePaid') : t('notPaid') }}</text>
                </view>
                <view class="text-[24rpx] mt-[14rpx] flex">
                  <text class="text-[var(--primary-color)] rounded-[6rpx] py-[6rpx] bg-[var(--primary-color-light)] px-[10rpx]">{{ subItem.item_type_name }}</text>
                </view>
                <view class="text-[28rpx] mt-[14rpx] flex justify-between">
                  <text class="text-[var(--price-text-color)] price-font">￥{{ subItem.price }}</text>
                  <text class="text-[22rpx] ml-[20rpx]">x{{ subItem.num }}</text>
                </view>
              </view>
            </view>
            <view class="flex justify-end mt-[10rpx]">
              <view
                class="text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[10rpx]"
                @click="showServiceFn(subItem)"
                >{{ t('show') }}</view>
              <view
                v-if="!subItem.pay_time"
                class="text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[10rpx]"
                @click="editServiceFn(subItem)"
                >{{ t('edit') }}</view>
              <view
                v-if="!subItem.pay_time"
                class="text-[26rpx] leading-[56rpx] px-[30rpx] border-[3rpx] border-solid border-[#999] rounded-full ml-[10rpx]"
                @click="deleteServiceFn(subItem)"
                >{{ t('delete') }}</view>
            </view>
          </view>
        </template>
      </view>
      <view class="mt-3 bg-white mx-3 px-3 py-4 rounded-md">
        <view class="text-[#1A2336] text-[28rpx] font-bold mb-4">{{ t('orderInfo') }}</view>
        <u--form labelPosition="left" ref="form1" labelWidth="90" borderBottom="false" :labelStyle="{ color: '#A3A3A3', fontSize: '14px' }">
          <u-form-item :label="t('orderNo')" :borderBottom="false">
            <view class="border-style w-full !border-0 flex justify-between items-end">
              <text>{{ detail.order_no }}</text>
            </view>
          </u-form-item>
          <u-form-item :label="t('person')" prop="userInfo.name" :borderBottom="false">
            <view class="border-style">{{ detail.taker_name }}</view>
          </u-form-item>
          <u-form-item :label="t('personTel')" :borderBottom="false">
            <view class="border-style">{{ detail.taker_mobile }}</view>
          </u-form-item>
          <u-form-item :label="t('remark')" :borderBottom="false">
            <view class="border-style">{{ detail.member_message ? detail.member_message : '无' }}</view>
          </u-form-item>
        </u--form>
      </view>

      <view class="h-[160rpx] w-full"></view>
      <view class="flex justify-end items-center bg-white px-3 py-1 fixed left-0 right-0 bottom-0 z-10">
        <view class="flex flex-col items-center justify-center w-[110rpx] mr-auto" @click="goBackIndex()">
          <text class="nc-iconfont nc-icon-shouye-xiaolianV6xx text-[36rpx] text-[#333]"></text>
          <text class="text-xs mt-[2rpx] font-scale">{{ t('index') }}</text>
        </view>
        <view class="flex flex-wrap justify-end">
          <u-button
            :text="t('contact')"
            :customStyle="{ border: 'solid 3rpx #999', width: '170rpx', height: '64rpx', lineHeight: '64rpx', fontSize: '26rpx', margin: '16px 0 16px 24rpx' }"
            shape="circle"
            @click="callPhoto(detail.taker_mobile)"
          ></u-button>
          <template v-for="(btnItem, btnIndex) in detail.order_status_info.technician_action" :key="btnIndex">
            <u-button
              :text="btnItem.name"
              @click="orderBtnFn(detail, btnItem.key)"
              shape="circle"
              :customStyle="{
                border: 'solid 3rpx #999',
                width: '170rpx',
                height: '64rpx',
                lineHeight: '64rpx',
                fontSize: '26rpx',
                margin: '16px 0 16px 24rpx'
              }"
            ></u-button>
          </template>
        </view>
      </view>
      <!-- 刷新 -->
      <view class="fixed bottom-[160rpx] right-[20rpx] rounded-full bg-[#fff] w-[80rpx] h-[80rpx] flex flex-col items-center justify-center shadow-xl" @click="getTechnicianDetail">
        <text class="nc-iconfont nc-icon-shuaxinV6xx text-[36rpx]"></text>
        <text class="text-[22rpx] mt-[6rpx]">{{ t('refresh') }}</text>
      </view>
    </view>
    <u-modal
      :show="showService"
      showCancelButton="true"
      @cancel="showService = false"
      @confirm="beginServiceFn"
      width="500rpx"
      confirmColor="var(--primary-color)">
      <template #default>
        <u--form labelPosition="left" class="!w-[100%]" labelWidth="100rpx">
          <u-form-item :label="t('checkCode')">
            <u-code-input :maxlength="4" :focus="true" size="50rpx" fontSize="32rpx" @finish="finish"></u-code-input>
          </u-form-item>
        </u--form>
      </template>
    </u-modal>
    <loading-page :loading="loading"></loading-page>
  </view>
</template>

<script setup lang="ts">
  import { t } from '@/locale'
  import { ref, reactive, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { img, redirect } from '@/utils/common'
  import { getTechnicianOrderDetail, beginService, finishService, TransferOrder, deleteService } from '@/addon/o2o/api/o2o'
  import { checkTechnician } from '@/addon/o2o/api/technician'
  import useConfigStore from '@/stores/config'

  const detail = ref({})
  const loading = ref<boolean>(false)
  const orderId = ref('')
  onLoad((option) => {
    orderId.value = option.order_id
    checkTechnicianFn()
  })

  // 验证是否是技师
  const checkTechnicianFn = () => {
    checkTechnician().then((res) => {
      if (!Object.keys(res.data).length) {
        redirect({ url: '/addon/o2o/pages/index', mode: 'reLaunch' })
      } else {
        getTechnicianOrderDetailFn(orderId.value)
      }
    })
  }

  // 详情信息
  const getTechnicianOrderDetailFn = (id) => {
      loading.value = true
      getTechnicianOrderDetail(id).then((res) => {
          detail.value = res.data
          loading.value = false
          getStatus()
      }).catch(() => {
          loading.value = false
      })
  }

  const getTechnicianDetail = () => {
      getTechnicianOrderDetail(orderId.value).then((res) => {
          detail.value = res.data
          getStatus()
      }).catch(() => {
      })
  }

  // 联系
  const callPhoto = (tel) => {
    uni.makePhoneCall({
      phoneNumber: tel
    })
  }

  // 导航
  // const goNavigation = (data) => {
  // 	uni.openLocation({
  // 		latitude: Number(data.taker_latitude),
  // 		longitude: Number(data.taker_longitude),
  // 		name: data.name,
  // 		success: function () {
  // 		}
  // 	});
  // }
  // 返回首页
  const goBackIndex = () => {
    redirect({ url: '/addon/o2o/pages/index', mode: 'reLaunch' })
  }

  const orderBtnFn = (data: any, key: any) => {
    if (key == 'transfer_order') {
      transferOrderFn(data)
    } else if (key == 'start') {
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
            redirect({ url: '/addon/o2o/pages/master/task/list' })
          })
        }
      }
    })
  }

  //开始服务
  const showService = ref(false)
  const checkCode = ref('')
  const finish = (e) => {
    checkCode.value = e
  }
  const beginServiceFn = () => {
      if (checkCode.value == '') {
          uni.showToast({
              title: '请输入校验码',
              icon: 'none',
              duration: 1000
          })
          return
      }
      let obj = {
          order_id: orderId.value,
          check_code: checkCode.value
      }
      beginService(obj).then((res) => {
          showService.value = false
          getTechnicianOrderDetailFn(orderId.value)
      }).catch(() => {
      })
  }

  // 结束服务
  const finishServiceFn = (val) => {
    finishService({ order_id: val.order_id }).then((res) => {
      getTechnicianOrderDetailFn(orderId.value)
    })
  }
  // 查看服务项
  const showServiceFn = (data) => {
    redirect({
      url: '/addon/o2o/pages/master/task/show',
      param: { order_id: data.order_id, order_item_id: data.order_item_id, item_name: data.item_name, price: data.item_money, item_images: data.item_images }
    })
  }
  // 编辑服务项
  const editServiceFn = (data) => {
    redirect({
      url: '/addon/o2o/pages/master/task/add',
      param: { order_id: data.order_id, order_item_id: data.order_item_id, item_name: data.item_name, price: data.item_money, item_images: data.item_images }
    })
  }

  // 删除服务项
  const deleteServiceFn = (data) => {
    uni.showModal({
      title: '提示',
      content: '您确定要删除该服务项吗？',
      confirmColor: useConfigStore().themeColor['--primary-color'],
      success: (res) => {
        if (res.confirm) {
          deleteService(data.order_item_id).then((res) => {
            getTechnicianOrderDetailFn(orderId.value)
          })
        }
      }
    })
  }

  // 日期格式转成月日时分
  function dataTurnTime(timeStamp) {
    var time = new Date(timeStamp).getTime()
    if (time != undefined && time != '' && time > 0) {
      var date = new Date()
      date.setTime(time)
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      return m + '-' + d + ' ' + h + ':' + minute
    } else {
      return ''
    }
  }

  // 判断当前步骤条的状态
  const current = ref(0)
  function getStatus() {
    if (detail.value.order_status_info.status == 'dispatch') {
      return (current.value = 0)
    } else if (detail.value.order_status_info.status == 'wait_service') {
      return (current.value = 1)
    } else if (detail.value.order_status_info.status == 'in_service') {
      return (current.value = 2)
    } else if (detail.value.order_status_info.status == 'finish') {
      return (current.value = 3)
    }
  }

  // 跳转项目详情
  const toLink = (data: any) => {
    if (data.item_type == 'reservation' || data.item_type == 'buy') {
      redirect({
        url: `/addon/o2o/pages/goods/detail`,
        param: {
          sku_id: data.item_id
        }
      })
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

  .bg-linear {
    background: linear-gradient(360deg, #f8f8f8 0%, $u-primary 100%);
  }

  .font-scale {
    transform: scale(0.9);
  }

  .triangle {
    @apply relative;

    &::after {
      content: '';
      @apply absolute;
      width: 0;
      height: 0;
      position: absolute;
      bottom: -40rpx;
      border: 20rpx solid #eef3ff;
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: transparent;
    }
  }

  .task-steps :deep(.u-text) {
    justify-content: center !important;
  }
  /* 多行超出隐藏 */
  .multi-hidden {
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
  }
</style>
