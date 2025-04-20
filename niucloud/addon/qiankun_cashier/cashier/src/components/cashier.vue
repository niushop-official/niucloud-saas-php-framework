<template>
    <div class="flex disable-select" v-if="siteInfo && siteInfo.app && siteInfo.app.indexOf('shop') >= 0">
        <div class="w-[520px] bg-[#fff] rounded-[20px] flex">
            <div class="flex-1 flex flex-col">
                <div>
                    <div v-if="selectUser.member_id"
                        class="flex border border-width-2px border-[#f70] m-[20px] rounded-[10px] h-[80px] items-center p-[10px] bg-[rgba(255,119,0,.05)]">
                        <el-image
                            :src="selectUser.headimg ? img(selectUser.headimg) : assetImg('/assets/images/member_head.png')"
                            class="w-[50px] h-[50px] rounded-full" fit="cover">
                            <template #error>
                                <el-image :src="assetImg('/assets/images/member_head.png')"></el-image>
                            </template>
                        </el-image>
                        <div class="ml-[10px] flex-1">
                            <div class="flex items-center">
                                <div class="flex-1">
                                    <div class="font-bold mr-[5px]">{{ selectUser.nickname }}</div>
                                    <div class="text-xs text-[#666]">15523456789</div>
                                </div>
                                <div class="width-[50px]">
                                    <el-menu class="text-xs" mode="horizontal" :ellipsis="false" :unique-opened="true"
                                        index="1" @select="handleSelect"
                                        style="height: 20px; --el-menu-bg-color: #fffff00; --el-menu-text-color: #666; --el-menu-active-color: #666;">
                                        <el-sub-menu index="m">
                                            <template #title>切换会员</template>
                                            <el-menu-item index="choose"
                                                @click="showChooseUser = true">选择用户</el-menu-item>
                                            <el-menu-item index="normal"
                                                @click="selectUser = {} as UserInfoInterface">游客</el-menu-item>
                                        </el-sub-menu>
                                    </el-menu>
                                </div>
                            </div>
                            <div>
                                <span class="text-xs text-[#666]">积分</span>
                                <span class="text-sm ml-5px">{{ selectUser.point }}</span>
                                <span class="text-xs text-[#666] ml-[10px]">余额</span>
                                <span class="text-sm ml-5px">{{ selectUser.balance }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else
                        class="flex border border-width-2px border-[#f70] m-[20px] rounded-[10px] h-[80px] items-center p-[10px] bg-[rgba(255,119,0,.05)]">
                        <el-image :src="assetImg('/assets/images/member_head.png')"
                            class="w-[50px] h-[50px] rounded-full" fit="cover"></el-image>
                        <div class="ml-[10px] flex-1">
                            <div class="flex items-center">
                                <div class="flex-1">
                                    <div class="font-bold mr-[5px]">游客</div>
                                </div>
                                <div class="width-[50px]">
                                    <el-menu class="text-xs" mode="horizontal" :ellipsis="false" :unique-opened="true"
                                        index="1" @select="handleSelect"
                                        style="height: 20px; --el-menu-bg-color: #fffff00; --el-menu-text-color: #666; --el-menu-active-color: #666;">
                                        <el-sub-menu>
                                            <template #title>切换会员</template>
                                            <el-menu-item index="choose"
                                                @click="showChooseUser = true">选择用户</el-menu-item>
                                        </el-sub-menu>
                                    </el-menu>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between pl-[20px] pr-[20px] pb-[20px] text-sm border-b border-[#f1f1f1]">
                        <div class="">已购<span class="text-[#f70] pl-[5px] pr-[5px]">{{ basic.total_num }}</span>件</div>
                        <div class="flex items-center cursor-pointer" @click="clearCart">
                            <el-icon>
                                <DeleteFilled />
                            </el-icon>
                            <span>清空</span>
                        </div>
                    </div>
                </div>
                <el-scrollbar class="flex-1" v-if="cartList && cartList.length">
                    <div class="flex items-center border-b border-[#f1f1f1] p-[20px]" v-for="(item, index) in cartList"
                        :key="index">
                        <el-image :src="item.goodsSku.sku_image ? img(item.goodsSku.sku_image) : ''"
                            class="w-[70px] h-[70px]" fit="cover">
                            <template #error>
                                <el-image :src="assetImg('/assets/images/member_head.png')"></el-image>
                            </template>
                        </el-image>
                        <div class="flex-1 flex flex-col justify-between ml-[10px]">
                            <div class="flex items-center text-sm">
                                <div class="flex-1" style="width: 0;">
                                    <div class="text-overflow text-sm">{{ item.goods_name }}</div>
                                </div>
                                <div class="text-[#1890ff] cursor-pointer ml-[10px]" @click="delCart(item)">删除</div>
                            </div>
                            <div class="text-xs text-[#999]" v-if="item.selected_sku">{{ item.selected_sku }}</div>
                            <div class="text-xs text-[#999]" v-else>默认</div>
                            <div class="flex items-center text-sm justify-between">
                                <div class="font-bold">￥{{ item.goodsSku.price }}</div>
                                <div class="flex items-center">
                                    <el-icon size="25px" color="#bbb" class="cursor-pointer" @click="subCart(item)">
                                        <RemoveFilled />
                                    </el-icon>
                                    <input type="number" placeholder="0" class="rounded-none text-center"
                                        style="width: 40px;" v-model="item.num"></input>
                                    <el-icon size="25px" color="#1890ff" class="cursor-pointer" @click="addCart(item)">
                                        <CirclePlusFilled />
                                    </el-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
                <div v-else class="h-full flex flex-1 flex-col justify-center items-center text-center">
                    <div class="ml-20px mr-20px">
                        <el-image :src="assetImg('/assets/images/no-cart.png')"></el-image>
                        <div class="text-[#999]">暂无商品</div>
                    </div>
                </div>
                <div>
                    <div class="flex p-[20px] border-t border-[#f1f1f1] justify-between">
                        <div>
                            <span class="text-sm">合计</span>
                            <span class="text-lg">￥{{ basic.goods_money }}</span>
                        </div>
                        <el-tooltip placement="top" effect="light">
                            <template #default>
                                <div class="cursor-pointer">
                                    <span class="text-sm">优惠</span>
                                    <span class="text-lg">￥{{ basic.discount_money }}</span>
                                </div>
                            </template>
                            <template #content>
                                <div>优惠券抵扣：{{ basic.coupon_money }}元</div>
                                <div v-if="basic.chang_discount_money">改价优惠：{{ basic.chang_discount_money }}元</div>
                                <div v-if="basic.manjian_discount_money">会员满减：{{ basic.manjian_discount_money }}元</div>
                            </template>
                        </el-tooltip>
                        <div>
                            <span class="text-sm">实付</span>
                            <span class="text-lg text-[#f5222d]">￥{{ basic.order_money }}</span>
                        </div>
                    </div>
                    <div class="p-[20px] border-t border-[#f1f1f1]">
                        <!-- <div class="lc-btn normal mb-20px" @click="test()">测试</div> -->
                        <div class="lc-btn" @click="showPayDrawer">立即结账</div>
                    </div>
                </div>
            </div>
            <div class="w-[130px] border-l border-[#f1f1f1] p-[15px]">
                <div class="lc-btn simple mb-[30px]" @click="hang()">挂单</div>
                <div class="lc-btn simple mb-[30px]" :class="selectUser.member_id > 0 ? '' : 'disabled'"
                    @click="selectUser.member_id > 0 ? showRecharge = true : ''">充值</div>
                <!-- <div class="lc-btn simple mb-[30px]">积分</div> -->
                <div class="lc-btn simple mb-[30px]" :class="selectUser.member_id > 0 ? '' : 'disabled'"
                    @click="selectUser.member_id > 0 ? showChooseCoupon = true : ''">优惠券
                </div>
                <div class="lc-btn simple mb-[30px]" @click="showChangePriceDialog">改价</div>
                <div class="lc-btn simple mb-[30px]" @click="showMark = true">备注</div>
            </div>
        </div>

        <el-drawer v-model="showPay" size="50%" :close-on-click-modal="false">
            <template #header>
                <h4>选择支付方式</h4>
            </template>
            <template #default>
                <div class="border-b border-[#f1f1f1] pb-[30px]">
                    <div
                        class="flex rounded-full border border-[#f1f1f1] w-[400px] m-auto text-center leading-[40px] overflow-hidden">
                        <div class="flex-1 cursor-pointer" :class="{ 'bg-[#1890ff] text-[#fff]': payType == 'wechat' }"
                            @click="payType = 'wechat'">微信支付
                        </div>
                        <div class="flex-1 cursor-pointer border-l border-r border-[#f1f1f1]"
                            :class="{ 'bg-[#1890ff] text-[#fff]': payType == 'cash' }" @click="payType = 'cash'">
                            现金收款
                        </div>
                        <div class="flex-1 cursor-pointer" :class="{ 'bg-[#1890ff] text-[#fff]': payType == 'balance' }"
                            @click="payType = 'balance'">
                            余额收款</div>
                    </div>
                </div>

                <div class="text-center mt-[30px]">
                    <div class="text-[#666]">应收金额(元)</div>
                    <div class="text-xl mt-[10px]">￥<span class="text-3xl font-bold">{{ basic.order_money }}</span>
                    </div>
                </div>

                <div class="m-auto w-[60%] max-w-[800px] mt-[50px]" v-if="payType == 'wechat' || payType == 'balance'">
                    <el-input class="h-[50px]" placeholder="点击聚焦后扫码或输入支付条码编号" v-model="authCode" @keyup.enter="payNow()"
                        ref="authCodeInput"></el-input>
                </div>
                <div class="text-center" v-if="payType == 'wechat' || payType == 'balance'">
                    <el-image
                        :src="assetImg(payType == 'wechat' ? '/assets/images/alipay.png' : '/assets/images/balance.png')"></el-image>
                </div>

                <div class="mt-[50px] bg-[#f3f9ff] p-[20px] rounded-[10px] disable-select max-w-[500px] m-auto"
                    v-if="payType == 'cash'">
                    <div v-if="isMax(payPrice)"
                        class="h-[50px] text-5xl bg-white leading-[50px] pl-[20px] border border-[#f1f1f1] rounded-[5px]">
                        ∞</div>
                    <div v-else
                        class="h-[50px] text-3xl bg-white leading-[50px] pl-[20px] border border-[#f1f1f1] rounded-[5px]"
                        _class="text-4xl pt-[3px] lcd tracking-widest">
                        {{ payPrice }}</div>
                    <div class="text-sm mt-[10px]">需找零(元): <span class="text-[#1890ff]">￥{{ changeToUser }}</span></div>

                    <div class="grid4 justify-between leading-[50px] text-center font-bold text-[#1890ff] text-xl">
                        <div class="key" :class="{ 'down': keydown == '1' }" @click="inputNumber('1')"
                            @mouseup="keydown = ''" @mousedown="keydown = '1'">1</div>
                        <div class="key" :class="{ 'down': keydown == '2' }" @click="inputNumber('2')"
                            @mouseup="keydown = ''" @mousedown="keydown = '2'">2</div>
                        <div class="key" :class="{ 'down': keydown == '3' }" @click="inputNumber('3')"
                            @mouseup="keydown = ''" @mousedown="keydown = '3'">3</div>
                        <div class="key cursor-pointer flex items-center justify-center"
                            :class="{ 'down': keydown == 'backspace' }" @click="inputNumber('backspace')"
                            @mouseup="keydown = ''" @mousedown="keydown = 'backspace'">
                            <el-image :src="assetImg('/assets/images/delete.svg')" class="w-[35px] h-[35px]"></el-image>
                        </div>
                        <div class="key" :class="{ 'down': keydown == '4' }" @click="inputNumber('4')"
                            @mouseup="keydown = ''" @mousedown="keydown = '4'">4</div>
                        <div class="key" :class="{ 'down': keydown == '5' }" @click="inputNumber('5')"
                            @mouseup="keydown = ''" @mousedown="keydown = '5'">5</div>
                        <div class="key" :class="{ 'down': keydown == '6' }" @click="inputNumber('6')"
                            @mouseup="keydown = ''" @mousedown="keydown = '6'">6</div>
                        <div class="key" :class="{ 'down': keydown == 'c' }" @click="inputNumber('c')"
                            @mouseup="keydown = ''" @mousedown="keydown = 'c'">C</div>
                        <div class="key" :class="{ 'down': keydown == '7' }" @click="inputNumber('7')"
                            @mouseup="keydown = ''" @mousedown="keydown = '7'">7</div>
                        <div class="key" :class="{ 'down': keydown == '8' }" @click="inputNumber('8')"
                            @mouseup="keydown = ''" @mousedown="keydown = '8'">8</div>
                        <div class="key" :class="{ 'down': keydown == '9' }" @click="inputNumber('9')"
                            @mouseup="keydown = ''" @mousedown="keydown = '9'">9</div>
                        <div class="key" :class="{ 'down': keydown == '0' }" @click="inputNumber('0')"
                            @mouseup="keydown = ''" @mousedown="keydown = '0'">0</div>
                        <div class="key" @click="inputNumber('00')" @mouseup="keydown = ''" @mousedown="keydown = '00'">
                            00</div>
                        <div class="key" :class="{ 'down': keydown == '.' }" @click="inputNumber('.')"
                            @mouseup="keydown = ''" @mousedown="keydown = '.'">.</div>
                        <div :class="{ 'down': keydown == 'enter' }" @mouseup="keydown = ''"
                            @mousedown="keydown = 'enter'"
                            class="merged flex items-center justify-center bg-[#1890ff] rounded-[5px] text-[#fff] cursor-pointer">
                            确认
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="lc-btn small" @click="refund()">立即退款</div>
                <div class="lc-btn small" @click="showPay = false">取消支付</div>
            </template>
        </el-drawer>
        <RechargeDialog v-model:show="showRecharge" :user-info="{} as UserInfoInterface"></RechargeDialog>
        <el-dialog v-model="showChangePrice" title="订单改价" class="w-[50%] max-w-[800px]"
            @close="showChangePrice = false">
            <div class="flex m-10px">
                <el-input placeholder="金额" type="number" v-model="money" @input="changeMoney">
                    <template #suffix>元</template>
                </el-input>
                <el-input placeholder="折扣" type="number" class="w-300px ml-10px" v-model="ratio" @input="changeRatio">
                    <template #suffix>%</template>
                </el-input>
            </div>

            <template #footer>
                <div class="lc-btn-group mt-20px mini">
                    <div class="lc-btn normal" @click="cancelChangePrice">取消改价</div>
                    <div class="lc-btn" @click="confirmChangePrice">确定</div>
                </div>
            </template>
        </el-dialog>
        <MarkDialog v-model:show="showMark" v-model:remark="remark"></MarkDialog>
        <ChooseUser v-model:show="showChooseUser" @selected="selectedUser"></ChooseUser>
        <ChooseCoupon v-model:show="showChooseCoupon" :goods="cartList" :price="basic.order_money"
            :user-id="selectUser.member_id ? selectUser.member_id : 0" @selected="selectedCoupon">
        </ChooseCoupon>
        <el-dialog v-model="showAttr" title="商品规格" class="w-[60%] max-w-[800px]" @close="showAttr = false">
            <div class="flex">
                <el-image :src="img(getSkuAttr('sku_image'))" fit="cover" class="h-120px h-120px rounded-[5px]">
                    <template #error>
                        <el-image :src="assetImg('/assets/images/member_head.png')"></el-image>
                    </template>
                </el-image>
                <div class="flex-1 ml-[20px] justify-between flex flex-col">
                    <div class="text-lg text-[#000]">{{ goodsInfo.goods_name }}</div>
                    <div class="text-sm text-[#999]">库存:{{ getSkuAttr('stock') }}</div>
                    <div class="text-[#f5222d] font-bold">￥<span class="text-lg">{{ getSkuAttr('price') }}</span></div>
                </div>
            </div>
            <div v-for="(attr, index) in goodsInfo.spec_list" :key="index">
                <div class="mt-[20px] text-[#000] font-bold text-lg">{{ attr.spec_name }}</div>
                <div class="mt-[20px]">
                    <span class="p-10px pl-20px pr-20px rounded-full cursor-pointer mr-20px mb-20px attr-btn"
                        v-for="(sku, idx) in attr.spec_values_arr" :key="idx"
                        :class="{ 'active': selectedSku[index] == sku }" @click="selectSku(index, sku)">{{
                            sku
                        }}</span>
                </div>
            </div>

            <div class="lc-btn mt-50px" @click="confirmSku()">确定</div>
        </el-dialog>

        <div class="flex-1 ml-[20px] mr-[20px] flex flex-col">
            <el-input v-model="goods_name" placeholder="请输入搜索关键词或点击后扫码" class="h-[40px]" :border="false"
                prefix-icon="search" clearable @clear="getGoodsList(1)" @keyup.enter="getGoodsList(1)">
                <template #append>
                    <el-button :icon="Search" type="primary" @click="getGoodsList(1)"
                        class="outline-none">搜索</el-button>
                </template>
            </el-input>
            <el-scrollbar class="flex-1 goods-scroll-container" @scroll="handleScroll">
                <div class="grid mt-20px goods-scroll-body" v-if="goodsList.length">
                    <div class="item bg-[#fff] hover:bg-[#1890ff] hover:text-[#fff]" v-for="(item, index) in goodsList"
                        :key="index" @click="selectGoods(item)">
                        <el-image :src="item.goods_cover ? img(item.goods_cover) : ''" fit="cover"
                            class="w-full h-[180px] rounded-[5px]">
                            <template #error>
                                <el-image :src="assetImg('/assets/images/member_head.png')"></el-image>
                            </template>
                        </el-image>
                        <div class="text-overflow">{{ item.goods_name }}</div>
                        <div class="text-[#f5222d]">￥{{ item.goodsSku.price }}</div>
                    </div>
                </div>
                <div v-else class="flex flex-1 flex-col justify-center items-center text-center mt-100px">
                    <div class="ml-20px mr-20px">
                        <el-image :src="assetImg('/assets/images/no-cart.png')"></el-image>
                        <div class="text-[#999]">暂无商品</div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <el-scrollbar class="w-[200px] bg-[#fff] rounded-[20px] p-[20px] text-center">
            <div class="cate" :class="{ active: activeIndex == 0 }" @click="chooseCategory(0)">全部</div>
            <div class="cate" v-for="(item, index) in category" :key="index"
                :class="{ active: activeIndex == item.category_id }" @click="chooseCategory(item.category_id)">
                {{ item.category_name }}</div>
        </el-scrollbar>
    </div>
    <div v-else>
        <el-empty description="商城未启用" />
    </div>
</template>

<script setup lang="ts">
import request from '@/utils/request';
import { computed, onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { assetImg, img } from '@/utils/common';
import storage from '@/utils/storage';
import RechargeDialog from './recharge.vue';
import { UserInfoInterface } from '@/interface/UserInfoInterface';
import MarkDialog from './mark.vue';
import ChooseUser from './chooseUser.vue';
import ChooseCoupon from './chooseCoupon.vue';
import { GoodsInterface, SpecListInterface } from '@/interface/GoodsInterface';
import { CategoryInterface } from '@/interface/CategoryInterface';
import { ElMessage, ElMessageBox, MessageHandler } from 'element-plus';
import { CouponInterface } from '@/interface/CouponInterface';

const activeIndex = ref(0)
const showPay = ref(false)
const showRecharge = ref(false)
const showChangePrice = ref(false)
const showChooseCoupon = ref(false)
const showMark = ref(false)
const showChooseUser = ref(false)
const showAttr = ref(false)
const payType = ref('wechat')
const payPrice = ref('0')
const goods_name = ref('')
const remark = ref('')
const changeToUser = computed({
    get() {
        let m = parseFloat(payPrice.value) - basic.value.order_money
        return m > 0 ? m : 0
    },
    set() { }
})
const handleSelect = (key: string) => {
    console.log(key)
}

interface SiteInfoInterface {
    app: string[]
}

const siteInfo = ref<SiteInfoInterface>({} as SiteInfoInterface);
onMounted(() => {
    getGoodsList()
    getCategory()
    siteInfo.value = storage.get('siteInfo');

    // 提单
    let tidan = storage.get('tidan')
    if (tidan && typeof tidan == 'object') {
        selectUser.value = tidan.user,
            cartList.value = tidan.cartList,
            remark.value = tidan.remark,
            selectCoupon.value = tidan.coupon,
            basic.value = tidan.basic
    } else {
        // 读取缓存
        let storageCartList = storage.get('cartList')
        if (storageCartList && typeof storageCartList == 'object') {
            cartList.value = storageCartList
            createOrder()
        }
    }
})

const keydown = ref('')
// 监听键盘按下和抬起
document.addEventListener('keydown', function (event) {
    // 转小写
    keydown.value = event.key.toLowerCase();
    inputNumber(keydown.value)
});
document.addEventListener('keyup', function () {
    keydown.value = ''
});
const inputNumber = (key: string) => {
    if (payType.value != 'cash') return
    let price = payPrice.value;

    switch (key) {
        case '.':
            // 如果当前价格中还没有小数点，则添加小数点
            if (!price.includes('.')) {
                payPrice.value += '.';
            }
            break;
        case '00':
            // 处理 '00' 按钮
            if (price === '0') {
                // 如果当前值是 '0'，保持为 '0'
                break;
            } else if (!price.includes('.')) {
                // 如果当前值是整数，追加 '00'
                payPrice.value += '00';
            } else {
                // 如果当前值有小数点
                const [integerPart, decimalPart = ''] = price.split('.');
                if (decimalPart.length < 2) {
                    // 如果小数部分不足 2 位，补全到 2 位
                    payPrice.value = `${integerPart}.${decimalPart.padEnd(2, '0')}`;
                }
                // 如果小数部分已经有 2 位，保持不变
            }
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            // 如果当前值是 '0'，直接替换为输入的数字
            if (price === '0') {
                payPrice.value = key;
            } else if (price.includes('.') && price.split('.')[1].length >= 2) {
                // 如果小数点后已经有两位，不再追加数字
                break;
            } else {
                // 否则追加数字
                payPrice.value += key;
            }
            break;
        case 'backspace':
            // 处理退格键，删除最后一个字符
            if (price.length > 1) {
                payPrice.value = price.slice(0, -1);
            } else {
                // 如果只有一个字符，重置为 '0'
                payPrice.value = '0';
            }
            break;
        case 'c':
            // 清空输入
            payPrice.value = '0';
            break;
    }
};

const isMax = (price: string) => {
    return parseFloat(price) > 100000000
}

const cartList = ref<GoodsInterface[]>([])
interface BasicInterface {
    body: string
    coupon_money: number
    delivery_money: number
    discount_money: number
    goods_money: number
    has_goods_types: string[]
    manjian_discount_money: number
    chang_discount_money: number
    order_money: number
    total_num: number
}
const basic = ref<BasicInterface>({
    body: '',
    coupon_money: 0,
    delivery_money: 0,
    discount_money: 0,
    goods_money: 0,
    has_goods_types: [],
    manjian_discount_money: 0,
    chang_discount_money: 0,
    order_money: 0,
    total_num: 0,
})
const changedPrice = ref(0)
const goodsList = ref<GoodsInterface[]>([])
const page = ref(1)
const goods_category = ref(0)
const scrollLoading = ref(false)
const loadingEnd = ref(false)
const getGoodsList = (isNew = 0) => {
    if (isNew == 0 && (scrollLoading.value || loadingEnd.value)) return
    scrollLoading.value = true
    if (isNew) {
        page.value = 1
        goodsList.value = []
    }
    let params = {
        goods_name: goods_name.value,
        page: page.value,
        goods_category: goods_category.value + '',
    }
    request.get('qiankun_cashier/goods/index', { params }).then(res => {
        page.value++
        goodsList.value = goodsList.value.concat(res.data.data)
        loadingEnd.value = goodsList.value.length >= res.data.total
        scrollLoading.value = false
        if (res.data.clear) {
            // 需要清空条码
            goods_name.value = ''
            // 加入购物车
            pushCartList(res.data.data[0])
        }
    }).catch(() => {
        scrollLoading.value = false
    })
}

const category = ref<CategoryInterface[]>([])
const getCategory = () => {
    request.get('qiankun_cashier/goods/category').then(res => {
        category.value = res.data
    })
}

const selectUser = ref<UserInfoInterface>({} as UserInfoInterface)
const selectedUser = (user: UserInfoInterface) => {
    selectUser.value = user
    createOrder()
}

const selectCoupon = ref<CouponInterface>({} as CouponInterface)
const selectedCoupon = (coupon: CouponInterface) => {
    selectCoupon.value = coupon
    createOrder()
}

const chooseCategory = (cid: number) => {
    goods_category.value = cid
    activeIndex.value = cid
    getGoodsList(1)
}

const currentGoods = ref<GoodsInterface>({} as GoodsInterface)
const goodsInfo = ref<SpecListInterface>({} as SpecListInterface)
const selectedSku = ref<string[]>([])
const selectedSkuId = ref(0)
const selectGoods = (item: GoodsInterface) => {
    if (item.goods_detail.goods_info.spec_type == 'multi') {
        currentGoods.value = item
        goodsInfo.value = item.goods_detail.goods_info as any
        goodsInfo.value.spec_list.forEach((item) => {
            item.spec_values_arr = item.spec_values.split(',')
        })
        let defaultSku: string[] = []
        goodsInfo.value.sku_list.forEach((item) => {
            // 默认参数
            if (item.is_default) {
                defaultSku = item.sku_spec_format.split(',')
            }
        })
        selectedSku.value = defaultSku
        selectedSkuId.value = item.id
        showAttr.value = true
    } else {
        pushCartList(item)
    }
}

const confirmSku = () => {
    currentGoods.value.selected_sku = selectedSku.value.join(',')
    pushCartList(currentGoods.value)
    showAttr.value = false
}

const pushCartList = (goods: GoodsInterface) => {
    let index = cartList.value.findIndex((item) => {
        return item.goods_id == goods.goods_id && item.selected_sku == goods.selected_sku
    })
    if (index == -1) {
        if (goods.goods_detail.goods_info.spec_type == 'multi') {
            goods.price = getSkuAttr('price') as unknown as number
            goods.goods_cover = getSkuAttr('sku_image')
            goods.goodsSku.price = goods.price
            goods.sku_id = getSkuAttr('sku_id') as unknown as number
        } else {
            goods.sku_id = goods.goodsSku.sku_id
        }
        goods.num = 1
        goods = JSON.parse(JSON.stringify(goods))
        goods.goodsSku.sku_image = goods.goods_cover
        cartList.value.push(goods)
    } else {
        cartList.value[index].num += 1
    }
    refreshCartStorage()
}

const selectSku = (index: number, sku: string) => {
    selectedSku.value[index] = sku
}

const getSkuAttr = (key: 'price' | 'stock' | 'sku_image' | 'sku_id'): string => {
    if (!goodsInfo.value.spec_list) return ''
    let attr = selectedSku.value.join(',')
    for (let i in goodsInfo.value.sku_list) {
        if (goodsInfo.value.sku_list[i].sku_spec_format == attr) {
            return goodsInfo.value.sku_list[i][key] as string
        }
    }
    return ''
}

const handleScroll = (e: { scrollLeft: number, scrollTop: number }) => {
    let el = document.getElementsByClassName('goods-scroll-container')[0] as HTMLElement
    let es = document.getElementsByClassName('goods-scroll-body')[0] as HTMLElement

    // 监听el是否滚动到最底部
    if (el && el.offsetHeight && es && es.offsetHeight) {
        if (es.scrollHeight - e.scrollTop < el.clientHeight) {
            getGoodsList()
        }
    }
}

const refreshCartStorage = () => {
    storage.set({ key: 'cartList', data: cartList.value })
    createOrder()
}

const subCart = (item: GoodsInterface) => {
    if (item.num > 1) {
        item.num--
        refreshCartStorage()
    } else {
        delCart(item)
    }
}

const clearCart = () => {
    ElMessageBox.confirm('确定清空购物车吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        cartList.value = []
        refreshCartStorage()
    }).catch(() => {
    });
}

const delCart = (item: GoodsInterface) => {
    ElMessageBox.confirm('确定删除该商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        cartList.value.splice(cartList.value.indexOf(item), 1)
        refreshCartStorage()
    }).catch(() => {
    })
}

const addCart = (item: GoodsInterface) => {
    item.num++
    refreshCartStorage()
}

const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份补零
    const day = String(date.getDate()).padStart(2, '0'); // 日期补零
    const hours = String(date.getHours()).padStart(2, '0'); // 小时补零
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟补零
    const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒补零

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime
}

// 挂单
const hang = () => {
    if (cartList.value.length == 0) return
    let hangData = {
        // 获取用户
        user: selectUser.value,
        // 获取购物车
        cartList: cartList.value,
        remark: remark.value,
        coupon: selectCoupon.value,
        basic: basic.value,
        time: getDate()
    }
    // 挂单入缓存
    let hangList = storage.get('hang_list') || []
    hangList.push(hangData)
    storage.set({ key: 'hang_list', data: hangList })
    // 清空购物车和选择用户
    cartList.value = []
    selectUser.value = {} as UserInfoInterface
    remark.value = ''
    refreshCartStorage()
}

const showChangePriceDialog = () => {
    money.value = changedPrice.value > 0 ? changedPrice.value : basic.value.order_money
    showChangePrice.value = true
}

const ratio = ref(100)
const money = ref(0)
const changeMoney = () => {
    ratio.value = parseFloat(((money.value / basic.value.order_money) * 100).toFixed(2))
}
const changeRatio = () => {
    money.value = basic.value.order_money * ratio.value / 100
}

// 是否改过价格
const priceChanged = ref(false)
const confirmChangePrice = () => {
    changedPrice.value = money.value
    showChangePrice.value = false
    priceChanged.value = true
    createOrder()
}

const cancelChangePrice = () => {
    changedPrice.value = 0
    ratio.value = 100
    showChangePrice.value = false
    priceChanged.value = false
    createOrder()
}

const authCode = ref('')
const orderId = ref('')

const payNow = () => {
    if (!authCode.value) return
    const messageInstance = ElMessage({
        message: '支付中...',
        icon: 'Loading',
        type: 'success',
        duration: 0, // 设置为 0 表示不自动关闭
    });
    let params = {
        order_id: orderId.value,
        auth_code: authCode.value
    }
    let timestamp = getTimestamp()
    request.post('qiankun_cashier/scan_pay', params).then((res: any) => {
        messageInstance.close()
        authCode.value = ''
        ElMessage.success(res.msg)
        // 等待支付
        if (res.data.err_code == 'USERPAYING') {
            const waitPay: MessageHandler = ElMessage({
                message: res.data.err_code_des || '用户支付中...',
                icon: 'Loading',
                type: 'success',
                duration: 0, // 设置为 0 表示不自动关闭
            });
            getOrderStatus(waitPay, timestamp)
        } else if (res.data.err_code == 'TRADE_ERROR') {
            // 订单已关闭
            ElMessage.error(res.msg)
            showPay.value = false
        } else if (res.data.err_code == 'PAYERROR') {
            // 取消支付或其他错误
            ElMessage.error(res.msg)
            showPay.value = false
        } else if (res.data.return_code == 'SUCCESS' && res.data.result_code == 'SUCCESS') {
            paySuccess(res.msg, messageInstance)
        }
    }).catch((err) => {
        console.error(err)
        messageInstance.close()
        authCode.value = ''
    })
}

const paySuccess = (msg: string, messageInstance: any) => {
    ElMessage.success(msg)
    if (messageInstance) {
        messageInstance.close()
    }
    authCode.value = ''
    showPay.value = false
    cartList.value = []
    selectUser.value = {} as UserInfoInterface
    selectCoupon.value = {} as CouponInterface
    remark.value = ''
    changedPrice.value = 0
    ratio.value = 100
    showChangePrice.value = false
    priceChanged.value = false
    storage.remove('cartList')
}

const getTimestamp = () => {
    return Date.parse(new Date().toString()) / 1000
}

// 查询订单
const getOrderStatus = (waitPay: MessageHandler, timestamp: number) => {
    // 支付超时
    if (getTimestamp() - timestamp > 30) {
        waitPay.close()
        ElMessage.error('支付超时')
        request.get(`qiankun_cashier/timeout/${orderId.value}`).then(() => {
            showPay.value = false
        }).catch(() => {
        })
    } else {
        request.get(`qiankun_cashier/get_order_status/${orderId.value}`).then((res: any) => {
            if (res.data.order.status == 2) {
                // 支付成功
                paySuccess(res.msg, waitPay)
            } else if (res.data.order.status == -1) {
                // 支付取消
                waitPay.close()
                showPay.value = false
                ElMessage.error(res.msg)
            } else {
                // 查询订单
                setTimeout(() => {
                    getOrderStatus(waitPay, timestamp)
                }, 3000)
            }
        }).catch(() => {
            waitPay.close()
            showPay.value = false
        })
    }
}

const refund = () => {
    ElMessageBox.confirm('确定要退款吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        request.post('qiankun_cashier/refund', {
            order_id: ''
        }).then((res: any) => {
            ElMessage.success(res.msg)
        }).catch(() => { })
    }).catch(() => { })
}

const authCodeInput = ref<any>(null)
const showPayDrawer = () => {
    createOrder(1)
}

const laoding = ref<boolean>(false)
const createOrder = (create = 0) => {
    console.log(cartList.value)
    if (laoding.value || cartList.value.length == 0) return
    laoding.value = true
    let messageInstance: any = false;
    if (create) {
        messageInstance = ElMessage({
            message: '正在创建订单...',
            icon: 'Loading',
            type: 'success',
            duration: 0, // 设置为 0 表示不自动关闭
            customClass: 'custom-loading-message'
        });
    }
    let sku_data = []
    for (let i in cartList.value) {
        sku_data.push({
            num: cartList.value[i].num,
            sku_id: cartList.value[i].sku_id,
        })
    }
    let params = {
        changed_price: priceChanged.value ? money.value : 0,
        shop_remark: remark.value,
        discount: {
            coupon_id: selectCoupon.value.id,
        },
        delivery: {
            delivery_type: 'cashier'
        },
        sku_data: sku_data,
        member_id: selectUser.value.member_id || 0,
        create: create
    }

    request.get('qiankun_cashier/calculate', { params }).then((res) => {
        laoding.value = false
        if (messageInstance) {
            messageInstance.close()
            showPay.value = true
            orderId.value = res.data.order_id
            setTimeout(() => {
                if (authCodeInput.value) {
                    authCodeInput.value.focus()
                }
            }, 500)
        }
        if (create == 0) {
            basic.value = res.data.basic
        }
    }).catch((err) => {
        laoding.value = false
        console.log(err)
        if (messageInstance) { messageInstance.close() }
    })
}

// const test = () => {
//     request.get(`qiankun_cashier/get_order_status/84`).then((res: any) => {
//         if (res.data.order.status == 2) {
//             // 支付成功
//             paySuccess(res.msg, false)
//         } else if (res.data.order.status == -1) {
//             // 支付取消
//             showPay.value = false
//             ElMessage.error(res.msg)
//         } else {
//             // 查询订单
//             console.log('agin')
//         }
//     }).catch(() => {
//         showPay.value = false
//     })
// }

</script>

<style scoped lang="scss">
// 引入字体
@font-face {
    font-family: 'lcd';
    src: url('@/assets/fonts/lcd.ttf') format('truetype');
    // font-weight: normal;
    // font-style: normal;
}

.lcd {
    font-family: 'lcd';
}

.cate {
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    cursor: pointer;

    &.active {
        background-color: #1890ff;
        color: #fff;
        border-radius: 50px;
    }
}

:deep(.el-menu--horizontal.el-menu),
:deep(.el-menu--horizontal>.el-sub-menu.is-active .el-sub-menu__title) {
    border-bottom: none !important;
}

.key {
    background: #fff;
    border-radius: 5px;
    cursor: pointer;

    &.down {
        background: #c1e1ff;
    }
}

.merged {
    /* 跨越第三行和第四行 */
    grid-row: 3 / 5;
    /* 位于第四列 */
    grid-column: 4;

    &.down {
        background: #47a6ff;
    }
}

.attr-btn {
    background: #f5f5f5;
    display: inline-block;

    &.active {
        background: #1890ff;
        color: #fff;
    }
}
</style>
