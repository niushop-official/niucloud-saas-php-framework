<template>
  <view class="bg-[#f8f8f8] min-h-screen overflow-hidden" :style="themeColor()">
    <view class="fixed left-0 top-0 right-0 z-10" v-if="statusLoading">
      <scroll-view scroll-x="true" class="scroll-Y box-border px-[24rpx] bg-white">
        <view class="flex whitespace-nowrap justify-around">
          <view :class="['text-sm leading-[90rpx]',{'class-select': orderState === item.status.toString()}]" @click="orderStateFn(item.status)" v-for="(item,index) in orderStateList">{{ item.name }}</view>
        </view>
      </scroll-view>
    </view>

    <mescroll-body ref="mescrollRef" top="114rpx" @init="mescrollInit" :down="{ use: false }" @up="getOrderListFn">
      <template v-for="(item, index) in list" :key="item.order_id">
        <view class="mx-3 mb-3 bg-white p-3 rounded">
          <view class="flex justify-between items-center text-sm text-gray-500 pb-3 border-0 border-b border-slate-200 border-solid">
            <view>{{ item.order_no }}</view>
            <text>{{ item.order_status_info.name }}</text>
          </view>
          <view>
            <view class="order-goods-item flex mt-[30rpx]" v-for="(goodsItem, goodsIndex) in item.item" :key="goodsIndex" @click="toDetail(item)">
              <view class="w-[160rpx] h-[160rpx] flex-2">
                <u--image class="rounded-[10rpx] overflow-hidden" width="160rpx" height="160rpx" :src="img(goodsItem.item_image_thumb_small ? goodsItem.item_image_thumb_small : '')" model="aspectFill">
                  <template #error>
                    <u-icon name="photo" color="#999" size="50"></u-icon>
                  </template>
                </u--image>
              </view>
              <view class="ml-[20rpx] flex flex-1 flex-col justify-between">
                <view class="flex justify-between items-center">
                  <text class="text-[28rpx] text-item  leading-[40rpx] max-h-[80rpx] w-[360rpx] multi-hidden">{{ goodsItem.item_name }}</text>
                  <text class="shrink-0 text-[24rpx] text-[var(--primary-color)] ml-[10rpx] leading-[40rpx]">{{ goodsItem.pay_time ? '' : t('notPaid') }}</text>
                </view>
                <view class="flex justify-between">
                  <text class="text-right text-[28rpx] text-[var(--price-text-color)] price-font">￥{{ goodsItem.price }}</text>
                  <text class="text-right text-[24rpx]">x{{ goodsItem.num }}</text>
                </view>
              </view>
            </view>
          </view>
          <!-- <view class="flex items-center justify-between  text-[28rpx]  mt-[40rpx]">
              <text class="text-[var(--text-color-light9)]">{{ item.create_time }}</text>
</view> -->
          <view class="flex items-center justify-end  mt-[30rpx]">
            <view>
              <text>{{ t('orderMoney') }}</text>
              <text class="text-[var(--price-text-color)] price-font">￥{{ item.total_money }}</text>
            </view>
            <view class="ml-3">
              <text>{{ t('payMoney') }}</text>
              <text class="text-[var(--price-text-color)] price-font">￥{{ item.total_pay_money }}</text>
            </view>
          </view>
          <view class="flex justify-end mt-3">
            <u-button :text="btnItem.name" :customStyle="{marginRight:'0px',marginLeft:'8rpx',width:'auto'}"
                      shape="circle" size="small" @click="orderBtnFn(item, btnItem.key)"
                      v-for="(btnItem, btnIndex) in item.order_status_info.member_action" :key="btnIndex"></u-button>
          </view>
        </view>
      </template>
      <mescroll-empty :option="{'icon': img('static/resource/images/empty.png'),'tip': t('nothingMore')}" v-if="!list.length && loading"></mescroll-empty>
    </mescroll-body>
    <pay ref="payRef"></pay>
    <tabbar />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { img, redirect } from '@/utils/common'
import { getOrderStatus, getOrderList, cancelOrder, deleteOrder } from '@/addon/o2o/api/order'
import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { t } from '@/locale'
import useConfigStore from "@/stores/config";

const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)
const list = ref<Array<Object>>([]);
const loading = ref<boolean>(false);
const statusLoading = ref<boolean>(false);
const orderState = ref('')
const orderStateList = ref([]);

onLoad((option) => {
  orderState.value = option.order_status || "";
  getOrderStatusFn();
});

// 获取订单状态
const getOrderStatusFn = () => {
  statusLoading.value = false;
  orderStateList.value = [];
  let obj = { name: '全部', status: '' };
  orderStateList.value.push(obj);

  getOrderStatus().then((res) => {
    Object.values(res.data).forEach((item, index) => {
      orderStateList.value.push(item);
    });
    statusLoading.value = true;
  }).catch(() => {
    statusLoading.value = true;
  })
}
// 切换状态
const orderStateFn = (status) => {
  orderState.value = status.toString();
  list.value = [];
  getMescroll().resetUpScroll();
};
// 订单列表
const getOrderListFn = (mescroll) => {
  loading.value = false;
  let data: object = {
    page: mescroll.num,
    limit: mescroll.size,
    order_status: orderState.value
  };

  getOrderList(data).then((res) => {
    let newArr = (res.data.data as Array<Object>);
    //设置列表数据
    if (mescroll.num == 1) {
      list.value = []; //如果是第一页需手动制空列表
    }
    list.value = list.value.concat(newArr);
    mescroll.endSuccess(newArr.length);
    loading.value = true;
  }).catch(() => {
    loading.value = true;
    mescroll.endErr(); // 请求失败, 结束加载
  })
}

const toDetail = (res) => {
  redirect({ url: '/addon/o2o/pages/order/detail', param: { order_id: res.order_id } })
}

// 支付
const payRef = ref(null)
const orderBtnFn = (data: any, type = '') => {
  if (type == 'pay') {
    payRef.value?.open(data.order_type, data.order_id, `/addon/o2o/pages/order/detail?order_id=${ data.order_id }`);
  } else if (type == 'cancel') {
    cancel(data)
  } else if (type == 'delete') {
    deleteFn(data)
  }
}

// 取消订单
const cancel = (data: any) => {
  uni.showModal({
    title: '提示',
    content: '您确定要删除该订单吗？',
    confirmColor: useConfigStore().themeColor['--primary-color'],
    success: res => {
      if (res.confirm) {
        cancelOrder(data.order_id).then((res) => {
          getMescroll().resetUpScroll()
        }).catch(() => {
          getMescroll().resetUpScroll()
        })
      }
    }
  })
}

// 删除订单
const deleteFn = (data: any) => {
  uni.showModal({
    title: '提示',
    content: '您确定要删除该订单吗？',
    confirmColor: useConfigStore().themeColor['--primary-color'],
    success: res => {
      if (res.confirm) {
        deleteOrder(data.order_id).then((res) => {
          getMescroll().resetUpScroll()
        }).catch(() => {
          getMescroll().resetUpScroll()
        })
      }
    }
  })

}
</script>

<style lang="scss" scoped>
.class-select {
  position: relative;
  font-weight: bold;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 6rpx;
    background-color: $u-primary;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
}

:deep(.u-tabbar__placeholder) {
  display: none !important;
}
</style>
