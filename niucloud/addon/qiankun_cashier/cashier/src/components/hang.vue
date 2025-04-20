<template>
    <div class="flex" v-if="siteInfo && siteInfo.app && siteInfo.app.indexOf('shop') >= 0">
        <div class="w-[500px] bg-[#fff] rounded-[20px] flex">
            <div class="flex-1 flex flex-col pl-20px pr-20px">
                <div class="m-[20px] flex text-sm ml-0 mr-0">
                    <input type="text"
                        class="flex-1 border-t border-l border-b border-[#f1f1f1] input h-[40px] pl-[20px]"
                        placeholder="搜索用户" v-model="keyword">
                    <div class="bg-[#4781fc] text-[#fff] search w-[60px] text-center leading-[40px]">搜索</div>
                </div>
                <el-scrollbar class="flex-1">
                    <div :class="{ active: activeIndex == index }" v-for="(item, index) in hangData" :key="index"
                        v-if="hangData.length" @click="activeIndex = index">
                        <div class="flex p-[20px] cursor-pointer rounded-10px" v-if="isShow(item)">
                            <el-image
                                :src="item.user.headimg ? img(item.user.headimg) : assetImg('/assets/images/member_head.png')"
                                class="w-[50px] h-[50px] rounded-full" fit="cover"></el-image>
                            <div class="flex-1 ml-[10px] flex flex-col justify-between">
                                <div class="flex justify-between">
                                    <div class="font-bold">{{ item.user.nickname || '匿名用户' }}</div>
                                    <div class="text-[#999] text-xs">{{ item.time }}</div>
                                </div>
                                <div class="flex justify-between">
                                    <div class="text-sm">订单金额：<span class="text-[#f5222d]">￥{{ item.basic.order_money
                                    }}</span></div>
                                    <div class="flex text-sm ">
                                        <div class="text-[#4680fb] cursor-pointer" @click.stop="tidan(index)">提单</div>
                                        <div class="text-[#e1771a] cursor-pointer ml-[10px] border-l border-[#f1f1f1] pl-[10px]"
                                            @click.stop="delHang(index)">
                                            删除</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="h-full flex flex-1 flex-col justify-center items-center text-center">
                        <div class="ml-20px mr-20px">
                            <el-image :src="assetImg('/assets/images/no-cart.png')"></el-image>
                            <div class="text-[#999]">暂无数据</div>
                        </div>
                    </div>
                </el-scrollbar>
                <div class="p-[20px] border-t border-[#f1f1f1]">
                    <div class="lc-btn">结账 ￥{{ orderPrice }}</div>
                </div>
            </div>
            <!-- <div class="w-[130px] border-l border-[#f1f1f1] p-[15px]">
                <div class="lc-btn simple mb-[30px]">积分</div>
                <div class="lc-btn simple mb-[30px]" @click="showChangePrice = true">改价</div>
                <div class="lc-btn simple mb-[30px]" @click="showMark = true">备注</div>
            </div> -->
        </div>

        <ChangePrice v-model:show="showChangePrice" v-model:price="orderPrice"></ChangePrice>
        <MarkDialog v-model:show="showMark" v-model:remark="remark"></MarkDialog>

        <el-scrollbar class="flex-1 bg-[#fff] rounded-[20px] p-[20px]  ml-[20px]">
            <div class="bg-[rgba(255,119,0,.05)] flex p-[20px] rounded-[20px]">
                <el-image
                    :src="hangData[activeIndex].user.headimg ? img(hangData[activeIndex].user.headimg) : assetImg('/assets/images/member_head.png')"
                    class="w-[50px] h-[50px] rounded-full" fit="cover"></el-image>
                <div class="flex-1 flex flex-col justify-between items-start ml-[10px]">
                    <div class="font-bold">{{ hangData[activeIndex].user.nickname || '匿名用户' }}</div>
                    <div class="text-sm">
                        <span class="text-[#666]">{{ hangData[activeIndex].user.mobile || '暂无' }}</span>
                        <span class="ml-[40px]">余额 <span class="text-lg text-[#f5222d]">{{
                            hangData[activeIndex].user.balance || 0 }}</span></span>
                        <span class="ml-[20px]">积分 <span class="text-lg text-[#f5222d]">{{
                            hangData[activeIndex].user.point || 0 }}</span></span>
                    </div>
                </div>
            </div>

            <div class="flex justify-between mt-[20px]">
                <div class="font-bold">共<span class="text-[#f5222d] ml-[5px] mr-[5px]">{{
                    hangData[activeIndex].basic.total_num }}</span>件商品</div>
                <div class="">实付<span class="text-[#f5222d] font-bold">￥{{ hangData[activeIndex].basic.order_money
                        }}</span></div>
            </div>

            <el-table class="mt-[20px]" empty-text="暂无商品"
                :data="hangData[activeIndex] ? hangData[activeIndex].cartList : []">
                <el-table-column prop="name" label="商品名称" width="300">
                    <template #default="scope">
                        <div class="flex items-center">
                            <el-image :src="img(scope.row.goods_cover)" class="w-[50px] h-[50px] rounded-[5px]"
                                fit="cover"></el-image>
                            <div class="flex-1 ml-[10px]">{{ scope.row.goods_name }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsSku.price" label="单价"></el-table-column>
                <el-table-column prop="num" label="数量"></el-table-column>
                <el-table-column prop="total" label="金额">
                    <template #default="scope">
                        {{ (scope.row.goodsSku.price * scope.row.num).toFixed(2) }}
                    </template>
                </el-table-column>
            </el-table>

            <div class="mt-[20px] p-[20px] bg-[#f3f3f3] rounded-[10px] text-sm text-[#666] leading-[30px]">
                <div>备注：{{ hangData[activeIndex].remark }}</div>
                <div>优惠券抵扣：{{ hangData[activeIndex].basic.coupon_money }}元</div>
                <div v-if="hangData[activeIndex].basic.chang_discount_money">改价优惠：{{
                    hangData[activeIndex].basic.chang_discount_money }}元</div>
                <div v-if="hangData[activeIndex].basic.manjian_discount_money">会员满减：{{
                    hangData[activeIndex].basic.manjian_discount_money }}元</div>
            </div>
        </el-scrollbar>
    </div>
    <div v-else>
        <el-empty description="商城未启用" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { assetImg, img } from '@/utils/common';
import storage from '@/utils/storage';
import ChangePrice from './change-price.vue';
import MarkDialog from './mark.vue';
import { UserInfoInterface } from '@/interface/UserInfoInterface';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '@/router';

const showMark = ref(false)
const showChangePrice = ref(false)
const remark = ref('213')
const orderPrice = ref(100)

const activeIndex = ref(0)
const keyword = ref('')
interface HangInterface {
    user: UserInfoInterface
    time: string
    remark: string
    basic: {
        order_money: number
        coupon_money: number
        chang_discount_money: number
        manjian_discount_money: number
        total_num: number
    }
    cartList: []
}
const hangData = ref<HangInterface[]>([])

interface SiteInfoInterface {
    app: string[]
}

const siteInfo = ref<SiteInfoInterface>({} as SiteInfoInterface);
onMounted(() => {
    siteInfo.value = storage.get('siteInfo');
    hangData.value = storage.get('hang_list') || []
})

const delHang = (index: number) => {
    ElMessageBox.confirm('确定要删除此挂单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        hangData.value.splice(index, 1)
        storage.set({ key: 'hang_list', data: hangData.value });
        ElMessage.success('删除成功')
    }).catch(() => { })
}

const isShow = (item: HangInterface) => {
    if (keyword.value) {
        if (!item.user.nickname) return false
        return item.user.nickname.indexOf(keyword.value) >= 0 || (item.user.mobile && item.user.mobile.indexOf(keyword.value) >= 0)
    }
    return true
}

const tidan = (index: number) => {
    let item = hangData.value[index]
    hangData.value.splice(index, 1)
    storage.set({ key: 'hang_list', data: hangData.value });
    storage.set({ key: 'tidan', data: item })
    router.push('/')
}
</script>

<style scoped lang="scss">
.input {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.search {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.active {
    background: #f3f8ff;
}
</style>
