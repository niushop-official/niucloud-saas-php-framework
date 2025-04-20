<template>
    <div class="flex" v-if="siteInfo && siteInfo.app && siteInfo.app.indexOf('shop') >= 0">
        <div class="w-[500px] bg-[#fff] rounded-[20px] flex">
            <div class="flex-1 flex flex-col">
                <div class="flex items-center justify-between m-[20px]">
                    <div class="text-lg font-bold">售后订单</div>
                    <div class="flex items-center text-sm text-[#666] cursor-pointer" v-if="!showFilter"
                        @click="showFilter = !showFilter">
                        <div class="mr-[5px]">筛选</div>
                        <el-icon>
                            <Filter />
                        </el-icon>
                    </div>
                    <div class="flex items-center text-sm text-[#666] cursor-pointer" v-if="showFilter"
                        @click="showFilter = !showFilter">
                        <div class="mr-[5px]">关闭</div>
                        <el-icon>
                            <Close />
                        </el-icon>
                    </div>
                </div>
                <div class="flex text-sm ml-[20px] mr-[20px]" v-if="!showFilter">
                    <input type="text"
                        class="flex-1 border-t border-l border-b border-[#f1f1f1] input h-[40px] pl-[20px]"
                        placeholder="搜索订单编号">
                    <div class="bg-[#4781fc] text-[#fff] search w-[60px] text-center leading-[40px]">搜索</div>
                </div>
                <FilterBox v-model:show="showFilter"></FilterBox>

                <el-scrollbar class="flex-1 mt-[20px]" v-if="!showFilter">
                    <div class="border-b border-[#f7f7f7] p-[20px]" v-for="(item, index) in 20" :key="index"
                        :class="{ 'bg-[#f3f8ff]': activeIndex == index }">
                        <div class="flex justify-between items-center">
                            <div class="font-bold text-sm">单号:wx2025022215359875642{{ item }}</div>
                            <div class="text-xs text-[#666]">2025-02-22 15:36:58</div>
                        </div>
                        <div class="flex justify-between items-center mt-[20px]">
                            <div class="flex-1 ml-[10px]" style="width: 0;">
                                <el-image
                                    :src="img('https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg')"
                                    class="w-[50px] h-[50px] rounded-[5px] mr-10px" fit="cover"></el-image>
                                <el-image
                                    :src="img('https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg')"
                                    class="w-[50px] h-[50px] rounded-[5px] mr-10px" fit="cover"></el-image>
                            </div>
                            <div class="flex flex-col justify-between ml-[10px]">
                                <div class="font-bold text-[#f5222d]">￥500.68</div>
                                <div class="text-xs">共2件商品</div>
                            </div>
                        </div>
                        <div
                            class="flex justify-between mt-[20px] text-sm border-t border-[#f1f1f1] border-dashed pt-[10px]">
                            <div>待支付</div>
                            <div>收银员:刘超超</div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="flex-1 flex flex-col rounded-[20px] ml-[20px]">
            <div class="flex bg-[#f5f5f5] leading-50px relative">
                <div class="absolute w-400px bg-[#fff] h-[50%] bottom-0"></div>
                <div class="pl-30px pr-30px relative cursor-pointer"
                    :class="{ 'bg-[#fff] radius-tl-20 radius-tr-20': tabIndex == 0, 'bg-[#f5f5f5] radius-tl-20 radius-tr-20 radius-br-20': tabIndex == 1, 'bg-[#f5f5f5]': tabIndex == 2 }"
                    @click="tabIndex = 0">商品信息</div>
                <div class="pl-30px pr-30px relative cursor-pointer"
                    :class="{ 'bg-[#fff] radius-tl-20 radius-tr-20': tabIndex == 1, 'bg-[#f5f5f5] radius-tl-20 radius-tr-20 radius-bl-20': tabIndex == 0, 'bg-[#f5f5f5] radius-br-20': tabIndex == 2 }"
                    @click="tabIndex = 1">订单详情</div>
                <div class="pl-30px pr-30px relative cursor-pointer"
                    :class="{ 'bg-[#fff] radius-tl-20 radius-tr-20': tabIndex == 2, 'bg-[#f5f5f5]': tabIndex == 0, 'bg-[#f5f5f5] radius-bl-20 radius-tr-20': tabIndex == 1 }"
                    @click="tabIndex = 2">订单记录</div>
                <div class="pl-30px pr-30px relative bg-[#f5f5f5]" :class="{ 'radius-bl-20': tabIndex == 2 }">
                </div>
            </div>
            <el-scrollbar class="flex-1 p-[20px] bg-[#fff] rounded-[20px]" :class="{ 'radius-tl-0': tabIndex == 0 }">
                <div v-if="tabIndex == 0">
                    <div class="bg-[rgba(255,119,0,.05)] flex p-[20px] rounded-[20px]">
                        <el-image
                            :src="img('https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg')"
                            class="w-[50px] h-[50px] rounded-full" fit="cover"></el-image>
                        <div class="flex-1 flex flex-col justify-between items-start ml-[10px]">
                            <div class="font-bold">刘超</div>
                            <div class="text-sm">
                                <span class="text-[#666]">15523456789</span>
                                <span class="ml-[40px]">余额 <span class="text-lg text-[#f5222d]">10045.58</span></span>
                                <span class="ml-[20px]">积分 <span class="text-lg text-[#f5222d]">10045</span></span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between mt-[20px]">
                        <div class="font-bold">共<span class="text-[#f5222d] ml-[5px] mr-[5px]">2</span>件商品</div>
                        <div class="">实付<span class="text-[#f5222d] font-bold">￥4568</span></div>
                    </div>

                    <el-table class="mt-[20px]" empty-text="暂无商品" :data="refundOrderList">
                        <el-table-column prop="name" label="商品名称" width="300">
                            <template #default="scope">
                                <div class="flex items-center">
                                    <el-image :src="img(scope.row.image)" class="w-[50px] h-[50px] rounded-[5px]"
                                        fit="cover"></el-image>
                                    <div class="flex-1 ml-[10px]">{{ scope.row.name }}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="单价"></el-table-column>
                        <el-table-column prop="num" label="数量"></el-table-column>
                        <el-table-column prop="total" label="金额"></el-table-column>
                    </el-table>
                </div>
                <div v-if="tabIndex == 1">
                    <div class="font-bold">收货信息</div>
                    <div class="text-sm flex mt-10px leading-40px">
                        <div class="w-[33%]">收货人:张三</div>
                        <div class="w-[33%]">收货电话:15523456789</div>
                        <div class="w-[33%] flex">
                            <div class="w-80px">收货地址:</div>
                            <div class="flex-1">广东省深圳市龙岗区中信龙盛广场一栋二单元七零六</div>
                        </div>
                    </div>

                    <div class="mt-50px pt-20px border-t border-dashed border-[#f1f1f1]">
                        <div class="font-bold">用户信息</div>
                        <div class="text-sm flex mt-10px leading-40px">
                            <div class="w-[33%]">用户昵称:刘超</div>
                            <div class="w-[33%]">绑定电话:15523456789</div>
                        </div>
                    </div>

                    <div class="mt-50px pt-20px border-t border-dashed border-[#f1f1f1]">
                        <div class="font-bold">订单信息</div>
                        <div class="text-sm flex mt-10px flex-wrap leading-40px">
                            <div class="w-[33%]">创建时间:2025-02-24 08:58:29</div>
                            <div class="w-[33%]">商品总数:3</div>
                            <div class="w-[33%]">商品总价:￥3587.8</div>
                            <div class="w-[33%]">优惠券金额:￥3.8</div>
                            <div class="w-[33%]">积分抵扣:￥3.8</div>
                            <div class="w-[33%]">会员优惠:￥3.8</div>
                            <div class="w-[33%]">推广人:刘阿超/ID:538</div>
                            <div class="w-[33%]">支付时间:2025-02-24 08:58:29</div>
                            <div class="w-[33%]">支付方式:现金支付</div>
                            <div class="w-[33%]">订单编号:2025022348949864568</div>
                        </div>
                    </div>
                </div>
                <div v-if="tabIndex == 2">
                    <el-table :data="orderLog">
                        <el-table-column prop="id" label="订单ID">
                            <template #default="scope">
                                <div class="leading-50px">{{ scope.row.id }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="msg" label="操作记录"></el-table-column>
                        <el-table-column prop="create_time" label="操作时间"></el-table-column>
                    </el-table>
                </div>
            </el-scrollbar>
            <div class="flex justify-between p-[20px] pb-0 border-t border-[#f1f1f1]">
                <div>
                    <span class="text-sm">
                        <span>实付:</span>
                        <span class="text-[#f5222d] font-bold text-base">￥38.59</span>
                        <span class="ml-[40px] text-sm">
                            <span>退款金额:</span>
                            <span class="text-[#f5222d] font-bold text-base">￥38.59</span>
                        </span>
                    </span>
                </div>
                <div>
                    <div class="lc-btn mr-[10px] flex-1 mini orange" @click="showMark = true">售后备注</div>
                </div>

                <MarkDialog v-model:show="showMark" v-model:remark="remark"></MarkDialog>
            </div>
        </div>
    </div>
    <div v-else>
        <el-empty description="商城未启用" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { img } from '@/utils/common';
import storage from '@/utils/storage';
import MarkDialog from './mark.vue';
import FilterBox from './filter.vue';

const showMark = ref(false)
const showFilter = ref(false)
const activeIndex = ref(0)
const tabIndex = ref(0)
const remark = ref('213')

const refundOrderList = [
    {
        name: '罗莱 天鹅绒乳胶枕新一代天鹅绒乳胶枕新一代天鹅绒乳胶枕新一代天鹅绒乳胶枕新一代天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    }, {
        name: '罗莱 天鹅绒乳胶枕新一代',
        image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
        price: '￥100.00',
        num: 1,
        total: '￥100.00'
    },
]
const orderLog = [
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    },
    {
        id: 75,
        msg: '新建订单',
        create_time: '2025-02-24 08:59:35'
    }
]

interface SiteInfoInterface {
    app: string[]
}

const siteInfo = ref<SiteInfoInterface>({} as SiteInfoInterface);
onMounted(() => {
    siteInfo.value = storage.get('siteInfo');
})

</script>

<style scoped lang="scss">
.text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.input {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.search {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
</style>
