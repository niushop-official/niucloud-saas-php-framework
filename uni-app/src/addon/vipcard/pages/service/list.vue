<template>
  <view class="min-h-screen" :style="themeColor()">
    <view class="mescroll-box bg-[#f8f8f8]" v-if="tabsData.length">
      <mescroll-body ref="mescrollRef" :top="tabsData[tabActive]?.children ? '197rpx' : '105rpx'" :down="{ use: false }" @init="mescrollInit" @up="getListFn">
        <!-- 头部搜索 -->
        <view class="search-box z-10 bg-[#fff] fixed top-0 left-0 right-0">
          <input class="search-ipt text-sm" type="text" v-model="searchName" :placeholder="t('searchNamePlaceholder')" />
          <view class="flex items-center z-2 h-[66rpx] absolute right-[48rpx] top-[18rpx]">
            <text class="nc-iconfont nc-icon-sousuoV6xx text-[30rpx]" @click="searchNameFn"></text>
          </view>
        </view>
        <!-- 左侧切换 -->
        <view class="tabs-box z-10 fixed left-0 bg-[#fff] bottom-[100rpx] top-[105rpx] pb-ios">
          <scroll-view :scroll-y="true" class="h-[100%]">
            <view
              class="tab-item"
              :class="{
                'tab-item-active': index == tabActive,
                'bg-[#F6F8F8]': index != tabActive,
                'rounded-br-2xl': index == tabActive - 1,
                'rounded-tr-2xl': index == tabActive + 1
              }"
              v-for="(item, index) in tabsData"
              :key="index"
              @click="firstLevelClick(index, item)"
            >
              <view class="text-box">
                {{ item.category_name }}
              </view>
            </view>
          </scroll-view>
        </view>
        <!-- 二级菜单点击 -->
        <view
          class="sort-tabs flex items-center h-[92rpx] px-[24rpx] py-[20rpx] bg-[#fff] fixed left-[182rpx] right-0 top-[105rpx] box-border z-10"
          v-if="tabsData[tabActive]?.children"
        >
          <template v-if="!labelPopup">
            <scroll-view
              :scroll-x="true"
              scroll-with-animation
              :scroll-into-view="'id' + (subActive ? subActive - 1 : 0)"
              class="flex-1 box-border px-[24rpx] bg-white"
            >
              <view class="h-[55rpx] items-center flex">
                <text
                  class="flex-shrink-0 px-[24rpx] h-[48rpx] text-[22rpx] leading-[48rpx] border-[2rpx] border-[#E2E2E2] border-solid rounded-[24rpx] border-box mr-[20rpx]"
                  :class="{ 'sub-tab-active': index === subActive }"
                  v-for="(item, index) in tabsData[tabActive]?.children"
                  :key="tabsData[tabActive].category_id"
                  :id="'id' + index"
                  @click="subMenuClick(index, item)"
                  >{{ item.category_name }}</text
                >
              </view>
            </scroll-view>
            <text class="nc-iconfont nc-icon-shangV6xx-1 text-[30rpx]" @click="labelPopup = true"></text>
          </template>
          <template v-else>
            <view class="flex-1 h-[48rpx] text-[22rpx] text-[#E2E2E2] px-[24rpx] leading-[48rpx]">全部分类</view>
            <text class="nc-iconfont nc-icon-shangV6xx-1 transform text-[30rpx] rotate-180" @click="labelPopup = false"></text>
          </template>
        </view>
        <!-- 二级菜单弹出层 -->
        <view class="labelPopup">
          <u-popup :show="labelPopup" mode="top" @close="labelPopup = false" duration="0">
            <view class="flex flex-wrap py-[24rpx]">
              <text
                class="flex-shrink-0 w-[160rpx] ml-[22rpx] mb-[24rpx] text-center h-[48rpx] text-[22rpx] leading-[48rpx] border-solid rounded-[24rpx] border-[2rpx] box-border border-[#E2E2E2]"
                :class="{ 'sub-tab-active': index === subActive }"
                v-for="(item, index) in tabsData[tabActive]?.children"
                :key="tabsData[tabActive].category_id"
                @click="subMenuClick(index, item)"
                >{{ item.category_name }}</text
              >
            </view>
          </u-popup>
        </view>
        <view class="pl-[182rpx] pt-[20rpx]" style="width: calc(100% - 182rpx)">
          <view
            class="bg-white flex px-[24rpx] py-[30rpx] mx-[16rpx] border-0 border-solid border-[#F0F0F0] rounded-[12rpx] box-border"
            :class="{ 'mt-[16rpx]': index }"
            v-for="(item, index) in list"
            :key="item.goods_id"
            @click="toLink(item.goods_id)"
          >
            <image class="w-[168rpx] h-[168rpx] mr-[20rpx] rounded-[12rpx]" :src="img(item.cover_thumb_mid)" mode="aspectFill" />
            <view class="flex flex-col flex-1 py-[10rpx]">
              <view class="text-sm font-bold multi-hidden">{{ item.goods_name }}</view>
              <view class="flex items-center mt-2 text-[#F55246] text-xs">
                <view
                  >￥<text class="text-base">{{ item.price }}</text></view
                >
              </view>
              <view class="flex items-center mt-auto justify-between">
                <text class="text-sm text-[#888]">{{ t('soldOut') }} {{ item.sale_num }}</text>
                <button class="text-[#fff] bg-[var(--primary-color)] px-[27rpx] self-end rounded-3xl text-[26rpx] h-[54rpx] leading-[54rpx] mx-0 mt-auto">
                  {{ t('reserveBtn') }}
                </button>
              </view>
            </view>
          </view>
          <mescroll-empty
            :option="{ icon: img('static/resource/images/empty.png') }"
            v-if="!list.length && !loading && listLoading"
            class="part"
          ></mescroll-empty>
        </view>
      </mescroll-body>
    </view>
    <view class="flex justify-center w-[100%]" v-if="!tabsData.length && !loading">
      <mescroll-empty :option="{ icon: img('static/resource/images/empty.png') }"></mescroll-empty>
    </view>
    <loading-page :loading="loading"></loading-page>
    <tabbar />
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { img, redirect } from '@/utils/common'
  import { getServiceList, getServiceCategory } from '@/addon/vipcard/api/vipcard'
  import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
  import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
  import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
  import { t } from '@/locale'
  import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'

  const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)

  let list = ref<Array<Object>>([])
  let searchName = ref('')
  let category_id = ref('')
  let loading = ref<boolean>(true) //页面加载动画
  let listLoading = ref<boolean>(false) //列表加载动画
  let labelPopup = ref<boolean>(false) //二级分类弹出框
  interface acceptingDataStructure {
    data: acceptingDataItemStructure
    msg: string
    code: number
  }
  interface acceptingDataItemStructure {
    data: object
    [propName: string]: number | string | object
  }
  interface mescrollStructure {
    num: number
    size: number
    endSuccess: Function
    [propName: string]: any
  }
  const getListFn = (mescroll: mescrollStructure) => {
    // loading.value = true;
    listLoading.value = false
    let data: object = {
      page: mescroll.num,
      limit: mescroll.size,
      category_id: category_id.value,
      goods_name: searchName.value
    }

    getServiceList(data)
      .then((res: acceptingDataStructure) => {
        let newArr = res.data.data
        //设置列表数据
        if (mescroll.num == 1) {
          list.value = [] //如果是第一页需手动制空列表
        }
        list.value = list.value.concat(newArr)
        loading.value = false
        mescroll.endSuccess(newArr.length)
        if (!list.value.length) listLoading.value = true
      })
      .catch(() => {
        loading.value = false
        listLoading.value = true
        mescroll.endErr() // 请求失败, 结束加载
      })
  }
  const toLink = (id: string) => {
    redirect({ url: '/addon/vipcard/pages/service/detail', param: { id } })
  }

  onLoad(() => {
    getCategoryData()
  })

  /**
   * @description 获取分类数据
   * */
  const tabsData = ref<Array<Object>>([])
  const getCategoryData = () => {
    loading.value = true
    getServiceCategory()
      .then((res: any) => {
        tabsData.value = res.data
        if (tabsData.value && tabsData.value.length) {
          tabsData.value.forEach((item: any, index) => {
            if (item.children && item.children.length) {
              let obj: any = {}
              obj.category_id = item.category_id
              obj.category_name = '全部'
              obj.level = item.level
              obj.pid = item.pid
              item.children.unshift(obj)
            }
          })
        }
        category_id.value = res.data[0].children[0].category_id
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
  }

  // 一级菜单样式控制
  const tabActive = ref<number>(0)
  // 二级菜单样式控制
  const subActive = ref<number>(0)

  // 一级菜单点击事件
  const firstLevelClick = (index: number, data: Object) => {
    tabActive.value = index
    labelPopup.value = false
    if (data.children && data.children.length) {
      subMenuClick(0, data.children[0])
    } else {
      category_id.value = data.category_id
      getMescroll().resetUpScroll()
    }
  }
  // 显示所有分类
  const isShowAll = ref<boolean>(true)
  const showAllTabs = () => {
    const el = document.getElementsByClassName('tab-text')[0]
    // console.log("_____+", isShowAll.value, tabsData.value[tabActive.value]?.children.length)
    if (isShowAll.value === true && tabsData.value[tabActive.value]?.children.length > 3) {
      el.style.height = `100px`
      isShowAll.value = false
    } else if (isShowAll.value === false) {
      el.style.height = `30px`
      isShowAll.value = true
    }
  }
  /**
   * @description 二级菜单点击事件
   * @param {number} index
   * */
  const subMenuClick = (index: number, data: object) => {
    subActive.value = index
    category_id.value = data.category_id
    labelPopup.value = false
    getMescroll().resetUpScroll()
  }

  // 搜索名字
  const searchNameFn = () => {
    getMescroll().resetUpScroll()
  }
</script>

<style lang="scss" scoped>
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

  .list-select {
    position: relative;
    margin-right: 28rpx;

    &::after {
      content: '';
      position: absolute;
      background-color: #999;
      width: 2rpx;
      height: 70%;
      top: 50%;
      right: -14rpx;
      transform: translatey(-50%);
    }
  }

  .transform-rotate {
    transform: rotate(180deg);
  }

  .font-scale {
    transform: scale(0.75);
  }

  .text-color {
    color: $u-primary;
  }

  .bg-color {
    background-color: $u-primary;
  }

  .search-box {
    padding: 20rpx 24rpx;
  }

  .search-box .search-ipt {
    height: 66rpx;
    background-color: #f6f8f8;
    padding-left: 20rpx;
    border-radius: 33rpx;
  }

  .search-box .search-ipt .input-placeholder {
    padding-left: 10rpx;
    color: #a5a6a6;
  }

  .tabs-box {
    width: 168rpx;
    font-size: 26rpx;
  }

  .tabs-box .tab-item {
    min-height: 56rpx;
    padding: 20rpx 0;
    text-align: center;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tabs-box .tab-item-active {
    position: relative;
    color: var(--primary-color);
    background-color: var(--temp-bg);
    &::before {
      display: inline-block;
      position: absolute;
      left: 0rpx;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      width: 6rpx;
      height: 48rpx;
      background-color: var(--primary-color);
    }

    &::after {
      display: inline-block;
      position: absolute;
      left: 0rpx;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      width: 6rpx;
      height: 48rpx;
      background-color: var(--primary-color);
    }
  }
  .sort-tabs .tab-text .sort-item {
    display: block;
    text-align: center;
    width: 136rpx;
    height: 48rpx;
    line-height: 48rpx;
    margin-right: 20rpx;
    margin-bottom: 10rpx;
    padding: 0rpx 10rpx;
    border-radius: 50rpx;
    border: 1px solid #e2e2e2;
    font-size: 22rpx;
  }

  .sub-tab-active {
    color: var(--primary-color);
    border: 1px solid var(--primary-color) !important;
  }
  .sort-tabs .tab-icon {
    position: absolute;
    right: 15rpx;
    top: 15%;
    transform: rotate(180deg);
  }
  .labelPopup :deep(.u-transition) {
    top: 198rpx !important;
    left: 182rpx !important;
    z-index: 8 !important;
    border: none !important;
  }
  :deep(.tab-bar-placeholder) {
    display: none !important;
  }

  /* // 空页面 */
  .mescroll-empty.empty-page.part {
    width: 542rpx;
    height: 542rpx;
    margin-top: 0;
    margin-left: 0;
    padding-top: 50rpx;
    /* .img {
      width: 160rpx !important;
      height: 120rpx !important;
    } */
  }
</style>
