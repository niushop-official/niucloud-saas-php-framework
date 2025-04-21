<template>
    <div class="main-container min-h-[60vh]" ref="mainContainerRef"  v-loading="loading">
        <div v-if="!loading">
            <el-card class="box-card !border-none" shadow="never">
                <el-page-header content="确认订单" :icon="ArrowLeft" @back="back()" />
            </el-card>
            <el-card class="box-card !border-none mt-[15px]" shadow="never" v-if="orderData.buyer">
                <div class="mb-[15px]">正在为该会员下单</div>
                <div class="box-border px-[12px] py-[10px] rounded-[4px] border-solid border-[#ebebeb] border-[1px] inline-flex">
                    <div class="mr-[10px]  w-[65px] h-[65px] flex items-center justify-center">
                        <img class="max-w-[65px] max-h-[65px]" v-if="orderData.buyer.headimg" :src="img(orderData.buyer.headimg)" alt="">
                        <img class="max-w-[65px] max-h-[65px]" v-else src="@/app/assets/images/member_head.png" alt="">
                    </div>
                    <div class="flex justify-between flex-col">
                        <div class="text-[14px] truncate max-w-[130px] text-[#333]">{{orderData.buyer.nickname}}</div>
                        <div class="flex items-center text-[#666]" v-if="orderData.buyer.mobile">
                            <span class="text-[11px]">手机号：</span>
                            <span class="text-[13px]">{{orderData.buyer.mobile}}</span>
                        </div>
                        <div class="flex items-center text-[#666]" v-if="orderData.buyer.balance">
                            <span class="text-[11px]">可用余额：</span>
                            <span class="text-[13px]">{{orderData.buyer.balance}}</span>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <div class="mb-[15px]">订单信息</div>
                <el-form label-width="120px" ref="basicFormRef" class="page-form">
                    <el-form-item label="商品">
                        <el-table :data="orderData.goods" class="!w-[900px]">
                            <el-table-column label="商品信息" min-width="300">
                                <template #default="{ row }">
                                    <div class="flex items-inherit">
                                        <div class="min-w-[70px] h-[70px] flex items-center justify-center">
                                            <el-image v-if="row.sku_image" class="w-[70px] h-[70px]" :src="img(row.sku_image)" fit="contain">
                                                <template #error>
                                                    <div class="image-slot">
                                                        <img class="w-[70px] h-[70px]" src="@/addon/shop_replace_buy/assets/goods_default.png" />
                                                    </div>
                                                </template>
                                            </el-image>
                                            <img v-else class="w-[70px] h-[70px]" src="@/addon/shop_replace_buy/assets/goods_default.png" fit="contain" />
                                        </div>
                                        <div class="ml-2 flex-1 flex flex-col items-baseline">
                                            <div v-if="row.goods && row.goods.goods_name" class="truncate text-[14px] w-[450px] leading-[1.4]">{{ row.goods.goods_name }}</div>
                                            <div class="text-[#999] text-[12px] leading-[1] mt-[2px]">{{ row.sku_name }}</div>
                                            <div v-if="row.not_support_delivery" class="bg-[#fef0f0] mt-[5px] text-[red] px-[5px] rounded-[3px] text-[11px] flex items-center justify-center h-[20px]">该商品不支持当前所选配送方式</div>
                                            <div v-if="row.manjian_info && Object.keys(row.manjian_info).length" class="mt-[5px] flex items-center cursor-pointer" @click.stop="manjianOpenFn(row.manjian_info)">
                                                <div class="bg-[var(--el-color-primary-light-9)] text-[var(--el-color-primary)] rounded-[3px] text-[10px] flex items-center justify-center w-[44px] h-[18px] mr-[3px]">满减送</div>
                                                <span class="text-[11px] text-[#999]">{{row.manjian_info.manjian_name}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="价格" width="100">
                                <template #default="{ row }">
                                    <span class="text-primary">￥{{ row.price }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="库存" width="100">
                                <template #default="{ row }">
                                    {{row.stock}}
                                </template>
                            </el-table-column>
                            <el-table-column label="数量"  width="150">
                                <template #default="{ row }">
                                    x{{row.num}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="配送方式" v-if="orderData.basic.has_goods_types.includes('real')">
                        <el-radio-group v-model="deliveryType"  @change="deliveryTypeChange" v-if="delivery_type_list.length">
                            <el-radio v-for="(item,index) in delivery_type_list" :key="index" :label="item.key">{{item.name}}</el-radio>
                        </el-radio-group>
                        <div v-else class="flex items-center">
                            <p class="text-[14px] text-primary">商家尚未配置配送方式</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="选择地址" v-if="deliveryType == 'express'">
                        <div class="flex">
                            <div v-if="Object.keys(addressData).length" class="temp-wrap overflow-hidden relative flex flex-col mr-[10px] w-[240px] px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] cursor-pointer">
                                <span class="text-[15px] leading-[1] truncate max-w-[150px]">{{addressData.name}}</span>
                                <span class="text-[15px] leading-[1]  mt-[5px]">{{addressData.mobile}}</span>
                                <span class="truncate text-[13px] leading-[1] mt-[5px]">{{addressData.full_address}}</span>
                                <div class="sub-temp bg-[rgba(0,0,0,.4)] absolute left-[0] right-[0] top-[0] bottom-[0] items-center justify-center text-[#fff] hidden" @click="replaceAddress">
                                    更换地址
                                </div>
                            </div>
                            <div @click="addAddressFn" class="flex flex-col items-center justify-center mr-[10px] w-[200px] px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] cursor-pointer">
                                <span class="iconfont iconVector-3 text-[36px]"></span>
                                <span class="truncate text-[13px] leading-[1.5] mt-[2px]">添加地址</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="选择自提点" v-if="deliveryType == 'store'">
                         <div v-if="Object.keys(storeData).length" class="temp-wrap w-[350px] overflow-hidden relative flex flex-col px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] cursor-pointer" >
                            <div class="flex item-center">
                                <span class="text-[15px] leading-[1] truncate max-w-[150px]">{{storeData.store_name}}</span>
                                <span class="text-[15px] leading-[1] ml-[5px]">{{storeData.store_mobile}}</span>
                            </div>
                            <div class="text-[13px] leading-[1] mt-[8px] flex">
                                <span class="whitespace-nowrap">门店地址：</span>
                                <span class="flex-1 leading-[1.3]">{{storeData.full_address}}</span>
                            </div>
                            <div class="truncate text-[13px] leading-[1] mt-[5px]" v-if="storeData.trade_time">
                                <span class="whitespace-nowrap">营业时间：</span>
                                <span>{{storeData.trade_time}}</span>
                            </div>
                            <div class="sub-temp bg-[rgba(0,0,0,.4)] absolute left-[0] right-[0] top-[0] bottom-[0] items-center justify-center text-[#fff] hidden" @click="selectStoreFn">
                                更换自提点
                            </div>
                        </div>
                        <div v-else @click="selectStoreFn"  class="flex flex-col items-center justify-center mr-[10px] w-[200px] px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] cursor-pointer">
                            <span class="iconfont iconVector-3 text-[36px]"></span>
                            <span class="truncate text-[13px] leading-[1.5] mt-[2px]">请选择自提点</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="选择地址" v-if="deliveryType == 'local_delivery'">
                        <div class="flex">
                            <div v-if="addressListData.length && Object.keys(localData).length" class="temp-wrap overflow-hidden relative flex flex-col mr-[10px] w-[240px] px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] cursor-pointer">
                                <span class="text-[15px] leading-[1] truncate max-w-[150px]">{{localData.name}}</span>
                                <span class="text-[15px] leading-[1]  mt-[5px]">{{localData.mobile}}</span>
                                <span class="truncate text-[13px] leading-[1] mt-[5px]">{{localData.full_address}}</span>
                                <div class="sub-temp bg-[rgba(0,0,0,.4)] absolute left-[0] right-[0] top-[0] bottom-[0] items-center justify-center text-[#fff] hidden" @click="replaceAddress">
                                    更换地址
                                </div>
                            </div>
                            <div v-else-if="addressListData.length" @click="replaceAddress" class="flex flex-col items-center justify-center mr-[10px] w-[200px] px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] cursor-pointer">
                                <span class="iconfont iconVector-3 text-[36px]"></span>
                                <span class="truncate text-[13px] leading-[1.5] mt-[2px]">选择地址</span>
                            </div>
                            <div @click="addAddressFn" class="flex flex-col items-center justify-center mr-[10px] w-[200px] px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] cursor-pointer">
                                <span class="iconfont iconVector-3 text-[36px]"></span>
                                <span class="truncate text-[13px] leading-[1.5] mt-[2px]">添加地址</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="优惠券" v-if="couponNum">
                        <div v-if="Object.keys(couponData).length" class="flex items-baseline cursor-pointer" @click="selectCoupon()">
                            <span class="text-primary text-[14px] mr-[5px] truncate max-w-[200px]">{{couponData.title}}</span>
                            <span class="text-[12px] text-[#999]">点击更换</span>
                        </div>
                        <el-button v-else type="primary" @click="selectCoupon()">选择优惠券</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="box-card !border-none mt-[15px]" shadow="never">
                <div class="mb-[15px]">价格明细</div>
                <div class="flex flex-col">
                    <div class="flex items-center h-[32px] mb-[5px]">
                        <span class="w-[120px] text-[14px] text-right text-[#666] mr-[10px]">商品金额</span>
                        <span class="text-[14px]">￥{{ parseFloat(orderData.basic.goods_money).toFixed(2) }}</span>
                    </div>
                    <div class="flex items-center h-[32px] mb-[5px]" v-if="parseFloat(orderData.basic.delivery_money)">
                        <span class="w-[120px] text-[14px] text-right text-[#666] mr-[10px]">配送费用</span>
                        <span class="text-[14px]">￥{{ parseFloat(orderData.basic.delivery_money).toFixed(2) }}</span>
                    </div>
                    <div class="flex items-center h-[32px] mb-[5px]" v-if="parseFloat(orderData.basic.coupon_money)">
                        <span class="w-[120px] text-[14px] text-right text-[#666] mr-[10px]">优惠券优惠</span>
                        <span class="text-[14px] text-primary">-￥{{parseFloat(orderData.basic.coupon_money).toFixed(2)}}</span>
                    </div>
                    <div class="flex items-center h-[32px] mb-[5px]" v-if="parseFloat(orderData.basic.manjian_discount_money)">
                        <span class="w-[120px] text-[14px] text-right text-[#666] mr-[10px]">满减优惠</span>
                        <span class="text-[14px] text-primary">-￥{{parseFloat(orderData.basic.manjian_discount_money).toFixed(2)}}</span>
                    </div>
                    <div class="flex items-center h-[32px] mb-[5px]">
                        <span class="w-[120px] text-[14px] text-right text-[#666] mr-[10px]">合计</span>
                        <span class="text-[18px] font-500 text-primary">￥{{parseFloat(orderData.basic.order_money).toFixed(2)}}</span>
                    </div>
                    <div class="flex items-center h-[32px] mb-[5px]" v-if="payList&&payList.length && parseFloat(orderData.basic.order_money)">
                        <span class="w-[120px] text-[14px] text-right text-[#666] mr-[10px]">支付方式</span>
                        <div class="text-[14px]">
                            <el-radio-group v-model="currPay">
                                <el-radio v-for="(item,index) in payList" :key="index" :label="item.key">{{item.name}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>

                <div class="pb-[60px] w-[100%]"></div>
                <div class="bg-[#fff] h-[60px] flex items-center justify-center fixed bottom-0 z-10 right-[15px] border-[0] border-t-[1px] border-[#ececec]" :style="settleStyle()">
                    <el-button @click="back()">取消</el-button>
                    <el-button type="primary" :loading="payLoading" @click="paymentFn(row)">提交订单</el-button>
                </div>
            </el-card>
        </div>

         <el-dialog align-center v-model="payResultDialogVisible" width="425" @close="payResultCloseFn" :close-on-press-escape="false" :close-on-click-modal="false" center :show-close="false">
            <div class="flex flex-col items-center w-[100%] pb-[30px]">
                <div class="flex flex-col items-center mt-[15px]" v-if="payResult">
                    <img class="w-[50px] h-[50px]" src="@/addon/shop_replace_buy/assets/success.png" fit="contain" />
                    <span class="text-[18px] mt-[16px] font-500">支付完成</span>
                </div>
                <div class="flex flex-col items-center mt-[15px]" v-else>
                    <img class="w-[50px] h-[50px]" src="@/addon/shop_replace_buy/assets/fail.png" fit="contain" />
                    <span class="text-[18px] mt-[16px] font-500">支付失败</span>
                </div>
                <div class="flex items-baseline mt-[10px] text-[28px] font-500">
                    <span class="text-[12px] mr-[3px]">￥</span>
                    <span class="text-[22px]" v-if="orderData.basic">{{parseFloat(orderData.basic.order_money).toFixed(2)}}</span>
                </div>
                <div v-if="payErrorMsg" class="mx-[10px] text-center text-[15px] mt-[30px] text-[#999]">{{payErrorMsg}}</div>
                <div class="flex items-center mt-[60px]">
                    <el-button class="w-[120px] !h-[35px]" round @click="toOrder()">查看订单</el-button>
                    <el-button type="primary" class="!ml-[25px] w-[120px] !h-[35px]" round @click="payResultDialogVisible = false">再下一单</el-button>
                </div>
            </div>
        </el-dialog>

        <add-address ref="addAddressRef" @confirm="addAddressConfirm"/>
        <address-list ref="addressListRef" @confirm="addressListConfirm"/>
        <store-list ref="storeListRef" @confirm="storeConfirm"/>
        <coupon-list ref="couponListRef" @confirm="couponConfirm" @load="couponLoad"/>
        <friend-pay ref="friendPayRef"  :wapUrl="wapUrl" @payConfirm="friendPayConfirm"/>
        <manjian-info ref="manjianInfoRef" />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onUnmounted } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'
import { replaceCalculate, replaceCreate } from '@/addon/shop_replace_buy/api/order'
import { getMemberAddress } from '@/app/api/member'
import { getPayList} from '@/app/api/pay'
import { pay } from '@/addon/shop_replace_buy/api/order'
import addAddress from './components/add-address.vue'
import addressList from './components/address-list.vue'
import storeList from './components/store-list.vue'
import couponList from './components/coupon-list.vue'
import friendPay from './components/friend-pay.vue'
import { ElMessage } from 'element-plus'
import manjianInfo from './components/manjian-info.vue'
import storage from '@/utils/storage'
import { cloneDeep } from 'lodash-es'
import { getUrl } from '@/app/api/sys'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const manjianInfoRef=ref()
const addAddressRef = ref()
const addressListRef = ref()
const storeListRef = ref()
const couponListRef = ref()
const friendPayRef = ref()
const orderData: any = ref({})
const orderId = ref('')
const payResultDialogVisible = ref(false)
const payResult = ref(true)
const createData: any = ref({
    order_key: '',
    member_remark: '',
    discount: {},
    invoice: {},
    delivery: {
        delivery_type: ''
    },
    extend_data: {} // 扩展数据，目前礼品卡用到
})

/** ************************ 配送-start ****************************/
const delivery_type_list = ref([]) // 配送方式列表
const deliveryType = ref('') // 当前到的配送方式
// 切换配送方式
const deliveryTypeChange = () => {
    createData.value.order_key = '';
    createData.value.delivery.delivery_type = deliveryType.value
    replaceCalculateFn()
}
/** ************************ 配送-end ****************************/

/** ************************ 地址-start ****************************/
// 获取地址信息
const addressData = ref({}) // 快递配送
const localData = ref({}) // 同城配送
const addressListData = ref([]) // 地址列表

const getMemberAddressFn = (type:any='') => {
    getMemberAddress({ member_id: createData.value.member_id }).then((res: any) => {
        if (res.data.length) {
            addressListData.value = res.data;
            let indent = -1;
            if (deliveryType.value == 'local_delivery') {
                if(type == 'add'){
                    if(res.data[0].lat && res.data[0].lng){
                        indent = 0
                    }else{
                        indent = -1;
                        ElMessage.error('该地址缺少经纬度，请重新选择地址');
                    }
                }else{
                    res.data.forEach((item: any,index: any) => {
                        if(item.lat && item.lng){
                            indent = index;
                        }
                    });
                }
            }else{
                indent = 0;
            }

            if(indent != -1){
                addressData.value = res.data[indent]
                localData.value = res.data[indent]
            }
            createData.value.delivery.take_address_id = indent!=-1 ? res.data[indent].id : '';
            createData.value.order_key = '';
            replaceCalculateFn();
        }
    })
}

// 添加地址回调
const addAddressConfirm = ()=>{
    getMemberAddressFn('add')
}

const addAddressFn = () => {
    if (!createData.value.member_id) {
        ElMessage({
            message: '缺少会员id',
            type: 'warning'
        })
        return false
    }
    addAddressRef.value.open(createData.value.member_id)
}

// 更换地址
const replaceAddress = () => {
    if (!createData.value.member_id) {
        ElMessage({
            message: '缺少会员id',
            type: 'warning'
        })
        return false
    }
    addressListRef.value.open(createData.value.member_id, createData.value.delivery.take_address_id)
}

// 地址列表回调
const addressListConfirm = (data: any) => {
    if(!data) return false;
    if (deliveryType.value == 'express') {
        addressData.value = data
    } else if (deliveryType.value == 'local_delivery') {
        if(data.lat && data.lng){
            localData.value = data;
        }else{
            localData.value = {};
            ElMessage.error('该地址缺少经纬度，请重新选择地址');
        }
    }
    createData.value.delivery.take_address_id = data.id
    createData.value.order_key = '';
    replaceCalculateFn()
}
/** ************************ 地址-end ****************************/

/** ************************ 自提点-start ****************************/
// 选择自提点
const selectStoreFn = ()=>{
    let id = createData.value.delivery ? createData.value.delivery.take_store_id : '';
    storeListRef.value.open(id)
}

// 自提点回调
let storeData = ref({})
const storeConfirm = (data:any)=>{
    if(!data) return false;
    storeData.value = data
    createData.value.delivery.take_store_id = data.store_id
    replaceCalculateFn()
}
/** ************************ 自提点-end ****************************/

/** ************************ 优惠券-start ****************************/
// 优惠券初始化
const couponInitFn = ()=>{
    let obj = {
        order_key: createData.value.order_key,
        member_id: createData.value.member_id
    }
    couponListRef.value.init(obj)
}

// 选择优惠券
const selectCoupon = ()=>{
    if(!createData.value.member_id){
        ElMessage({
            message: '缺少会员id',
            type: 'warning'
        })
        return false
    }
    if(!createData.value.order_key){
        ElMessage({
            message: '缺少order_key',
            type: 'warning'
        })
        return false
    }
    let id = Object.keys(couponData.value).length ? couponData.value.id : '';

    couponListRef.value.open(id)
}

// 优惠券数据刚才完成后的回调
const couponNum = ref(0)
const couponLoad = (data:any, num:any)=>{
    couponData.value = data
    couponNum.value = num
    if(couponNum.value){
        createData.value.discount.coupon_id = couponData.value.id
        replaceCalculateFn()
    }else{
        loading.value = false
    }
}
// 优惠券回调
const couponData: any = ref({})
const couponConfirm = (data:any)=>{
    if(data){
        couponData.value = data;
        createData.value.discount.coupon_id = couponData.value.id;
    }else{
        couponData.value = {};
        createData.value.discount.coupon_id = '';
    }
    replaceCalculateFn();
}
/** ************************ 优惠券-end ****************************/

// 满减
const manjianOpenFn = (data:any)=>{
    manjianInfoRef.value.open(data)
}

/** ************************ 支付列表-start ****************************/
const currPay = ref('')
const payList: any = ref([])
const getPayListFn = ()=>{
    getPayList().then((res: any) => {
        payList.value = res.data
        if(payList.value.length){
            currPay.value = payList.value[0].key
        }
    })
}
/** ************************ 支付列表-end ****************************/

// 计算方法
const replaceCalculateFn = (isInitLoad: boolean = false)=>{
    if(isInitLoad){
        loading.value = true
    }
    replaceCalculate(createData.value).then((res: any) => {
        orderData.value = cloneDeep(res.data)

        orderData.value.goods = [] // 购买商品
        if (orderData.value.goods_data && Object.values(orderData.value.goods_data).length) {
            Object.values(orderData.value.goods_data).forEach((item, index) => {
                orderData.value.goods.push(item)
            })
        }

        createData.value.order_key = orderData.value.order_key
        // 配送方式
        if (orderData.value.delivery.delivery_type_list) {
            delivery_type_list.value = Object.values(orderData.value.delivery.delivery_type_list)
        }
        if(orderData.value.delivery && orderData.value.delivery.delivery_type_list){
            deliveryType.value = orderData.value.delivery.delivery_type
            createData.value.delivery.delivery_type = orderData.value.delivery.delivery_type
        }

        // 初次调用时，加载
        if(isInitLoad){
            getMemberAddressFn()
            couponInitFn()
        }else{
            loading.value = false
        }
    }).catch(() => {
        back(true)
    })
}

let payLoading = ref(false)
const paymentFn = () => {
    if (payLoading.value) return false
    payLoading.value = true

    const obj = {
        order_key: createData.value.order_key,
        member_id: createData.value.member_id
    }

    replaceCreate(obj).then((res: any) => {
        orderId.value = res.data.order_id;
        if (parseFloat(orderData.value.basic.order_money)) {
            if(payList.value.length){
                if (currPay.value == 'balancepay') {
                    payFn(res.data)
                } else {
                    // 待支付
                    friendPayRef.value.open(res.data)
                    payLoading.value = false;
                }
            }else{
                ElMessage.error('没有可用的支付方式')
                setTimeout(() => {
                    storage.remove('replaceBuyOrderCreateData');
                    router.push({ path: '/shop/order/detail', query: { order_id: res.data.order_id } });
                }, 1000);
                payLoading.value = false;
            }
        } else {
            storage.remove('replaceBuyOrderCreateData');
            payLoading.value = false;
            router.push({ path: '/shop/order/detail', query: { order_id: orderId.value } });
        }
    }).catch(() => {
        payLoading.value = false;
    })
}

const payErrorMsg = ref('');
const payFn = (res:any)=>{
    let data: any = {}
    data.trade_id = res.order_id
    data.trade_type = res.trade_type
    data.type = currPay.value
    pay(data).then((res: any) => {
        payLoading.value = false;
        payResultOpenFn();
    }).catch((err) => {
        payErrorMsg.value = err.toString().split(' ')[1];
        payLoading.value = false;
        payResultOpenFn(false);
    })
}

// 代付成功后回调
const friendPayConfirm = ()=>{
    payResultOpenFn();
}

const initFn = ()=>{
    if(!storage.get('replaceBuyOrderCreateData')){
        router.push('/shop_replace_buy/index');
        return false;
    }
    if (storage.get('replaceBuyOrderCreateData')) {
        let data = storage.get('replaceBuyOrderCreateData');
        createData.value.sku_data = data.sku_data;
        createData.value.member_id = data.memberInfo.member_id;
    }
    getPayListFn()
    replaceCalculateFn(true)
}
initFn();

const payResultOpenFn = (bool:any=true)=>{
    payResult.value = bool;
    storage.remove('replaceBuyOrderCreateData');
    payResultDialogVisible.value = true;
}

const payResultCloseFn = ()=>{
    if (currPay.value != 'balancepay') {
        back(true)
    }
    payResultDialogVisible.value = false
    // 余额支付不弹出支付等待页
    if (currPay.value == 'balancepay') {
        back()
    }
}

// 计算提交订单栏宽度
const mainContainerRef = ref()
const settleStyle = ()=>{
    let style: any = {}
    if(mainContainerRef.value){
        style.width = mainContainerRef.value.clientWidth + 'px'
    }
    return style
}

// 生成二维码地址
const wapUrl = ref('')
const wapDomain = ref('')
getUrl().then((res: any) => {
    wapUrl.value = res.data.wap_url

    // 生产模式禁止
    if (import.meta.env.MODE == 'production') return

    wapDomain.value = res.data.wap_domain

    // env文件配置过wap域名
    if (wapDomain.value) {
        wapUrl.value = wapDomain.value + '/wap'
    }

    const wapDomainStorage = storage.get('wap_domain')
    if (wapDomainStorage) {
        wapUrl.value = wapDomainStorage
    }
})

onUnmounted(() => {
    storage.remove('replaceBuyOrderCreateData');
})

const toOrder = ()=>{
    const url = router.resolve({
        path: '/shop/order/detail',
        query: {
            order_id: orderId.value
        }
    })
    window.open(url.href)
}

// 返回, bool: true 展示支付等待页
const back = (bool: any = false) => {
    if (bool) {
        ElMessageBox.confirm(
            '支付过程中，请勿关闭该页面，以免出现支付异常!',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(() => {
            router.push('/shop_replace_buy/index')
        }).catch(() => {
            // 取消操作
        })
    } else {
        router.push('/shop_replace_buy/index')
    }
}
</script>
<style lang="scss">
.temp-wrap:hover .sub-temp{
    display: flex !important;
}
</style>
