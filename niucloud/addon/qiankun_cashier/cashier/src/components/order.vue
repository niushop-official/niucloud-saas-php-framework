<template>
    <div class="flex" v-if="siteInfo && siteInfo.app && siteInfo.app.indexOf('shop') >= 0">
        <div class="w-[500px] bg-[#fff] rounded-[20px] flex">
            <div class="flex-1 flex flex-col">
                <div class="flex items-center justify-between m-[20px]">
                    <div class="text-lg font-bold">订单列表</div>
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
                    <el-input type="text"
                        class="flex-1 border-t border-l border-b border-[#f1f1f1] input h-[40px] pl-10px outline-none"
                        placeholder="搜索用户昵称、手机号" v-model="orderNo" clearable @clear="getOrderList(1)" />
                    <div class="bg-[#4781fc] text-[#fff] search w-[60px] text-center leading-[40px] cursor-pointer"
                        @click="getOrderList(1)">搜索</div>
                </div>
                <div v-if="showFilter" class="flex flex-1 flex-col justify-between">
                    <div class="flex-1 ml-[20px] mr-[20px]">
                        <!-- <div class="font-bold mt-[40px]">订单类型</div>
                        <div class="lc-btn mr-[20px] mini text-small">全部</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">收银台订单</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">收银台订单</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">收银台订单</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">收银台订单</div>
                        <div class="lc-btn mini text-small normal mt-[20px]">收银台订单</div> -->

                        <div class="font-bold mt-[40px]">订单状态</div>
                        <div class="lc-btn mr-[20px] mini text-small" :class="{ normal: searchStatus != '' }"
                            @click="changeStatus()">全部</div>
                        <div class="lc-btn mr-[20px] mini text-small mt-[20px]" :class="{ normal: searchStatus != '1' }"
                            @click="changeStatus('1')">待支付
                        </div>
                        <div class="lc-btn mr-[20px] mini text-small mt-[20px]" :class="{ normal: searchStatus != '2' }"
                            @click="changeStatus('2')">已支付
                        </div>
                        <div class="lc-btn mr-[20px] mini text-small mt-[20px]"
                            :class="{ normal: searchStatus != '-1' }" @click="changeStatus('-1')">已关闭
                        </div>
                        <!-- <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">已删除</div> -->

                        <div class="font-bold mt-[40px]">创建时间</div>
                        <!-- <div class="lc-btn mr-[20px] mini text-small">全部</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">今天</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">昨天</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">近七天</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">近三十天</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">本月</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">本年</div> -->
                        <div>
                            <el-date-picker v-model="dateRange" class="mt-[20px] rounded-full bg-[#f1f2f4] border-0"
                                type="daterange" range-separator="到" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" />
                        </div>

                        <!-- <div class="font-bold mt-[40px]">店员</div>
                        <div class="lc-btn mr-[20px] mini text-small">全部</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">刘超</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">张三</div>
                        <div class="lc-btn mr-[20px] mini text-small normal mt-[20px]">李四</div> -->
                    </div>
                    <div class="flex m-[20px] lc-btn-group mini">
                        <div class="lc-btn normal" @click="handleClose">重置</div>
                        <div class="lc-btn" @click="handleConfirm">确定</div>
                    </div>
                </div>

                <el-scrollbar class="flex-1 m-[20px]" v-if="!showFilter" v-loading="loading"
                    element-loading-text="加载中...">
                    <div class="border-b border-[#f7f7f7] p-[20px] rounded-10px cursor-pointer"
                        v-for="(item, index) in orderList" :key="index"
                        :class="{ 'bg-[#f3f8ff]': activeIndex == index }" @click="activeIndex = index">
                        <div class="flex justify-between items-center">
                            <div class="font-bold text-sm">单号:{{ item.order_no }}</div>
                            <div class="text-xs text-[#666]">{{ item.create_time }}</div>
                        </div>
                        <div class="flex justify-between items-center mt-[20px]">
                            <div class="flex-1 ml-[10px]" style="width: 0;">
                                <el-image v-for="(goods, idx) in item.order_goods" :key="idx"
                                    :src="img(goods.goods_image)" class="w-[50px] h-[50px] rounded-[5px] mr-10px"
                                    fit="cover"></el-image>
                            </div>
                            <div class="flex flex-col justify-between ml-[10px]">
                                <div class="font-bold text-[#f5222d]">￥{{ item.order_money }}</div>
                                <div class="text-xs">共{{ item.goods_num }}件商品</div>
                            </div>
                        </div>
                        <div
                            class="flex justify-between mt-[20px] text-sm border-t border-[#f1f1f1] border-dashed pt-[10px]">
                            <div v-if="item.status == -1">已关闭</div>
                            <div v-if="item.status == 1">待支付</div>
                            <div v-if="item.status == 2">已支付</div>
                            <!-- <div>收银员:刘超超</div> -->
                        </div>
                    </div>
                    <div class="flex">
                        <div>共{{ total }}条</div>
                        <el-pagination background layout="prev, pager, next" size="small" :total="total"
                            v-model:current-page="page" :page-size="pageSize" @change="getOrderList" v-if="total > 0" />
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="flex-1 flex flex-col rounded-[20px] ml-[20px]" v-if="orderList[activeIndex]">
            <div class="flex bg-[#f5f5f5] leading-50px relative">
                <div class="absolute w-300px bg-[#fff] h-[50%] bottom-0"></div>
                <div class="pl-30px pr-30px relative cursor-pointer"
                    :class="{ 'bg-[#fff] radius-tl-20 radius-tr-20': tabIndex == 0, 'bg-[#f5f5f5] radius-tl-20 radius-tr-20 radius-br-20': tabIndex == 1, 'bg-[#f5f5f5]': tabIndex == 2 }"
                    @click="tabIndex = 0">商品信息</div>
                <div class="pl-30px pr-30px relative cursor-pointer"
                    :class="{ 'bg-[#fff] radius-tl-20 radius-tr-20': tabIndex == 1, 'bg-[#f5f5f5] radius-tl-20 radius-tr-20 radius-bl-20': tabIndex == 0, 'bg-[#f5f5f5] radius-br-20': tabIndex == 2 }"
                    @click="tabIndex = 1">订单详情</div>
                <!-- <div class="pl-30px pr-30px relative cursor-pointer"
                    :class="{ 'bg-[#fff] radius-tl-20 radius-tr-20': tabIndex == 2, 'bg-[#f5f5f5]': tabIndex == 0, 'bg-[#f5f5f5] radius-bl-20 radius-tr-20': tabIndex == 1 }"
                    @click="tabIndex = 2">会员详情</div> -->
                <div class="pl-30px pr-30px relative bg-[#f5f5f5]" :class="{ 'radius-bl-20': tabIndex == 1 }">
                </div>
            </div>
            <el-scrollbar class="flex-1 p-[20px] bg-[#fff] rounded-[20px]" :class="{ 'radius-tl-0': tabIndex == 0 }">
                <div v-if="tabIndex == 0">
                    <div class="bg-[rgba(255,119,0,.05)] flex p-[20px] rounded-[20px]">
                        <el-image
                            :src="orderList[activeIndex].member.headimg ? img(orderList[activeIndex].member.headimg) : assetImg('/assets/images/member_head.png')"
                            class="w-[50px] h-[50px] rounded-full" fit="cover"></el-image>
                        <div class="flex-1 flex flex-col justify-between items-start ml-[10px]">
                            <div class="font-bold">{{ orderList[activeIndex].member.nickname }}</div>
                            <div class="text-sm">
                                <span class="text-[#666]">{{ orderList[activeIndex].member.mobile || '暂无' }}</span>
                                <span class="ml-[40px]">余额 <span class="text-lg text-[#f5222d]">{{
                                    orderList[activeIndex].member.balance || 0 }}</span></span>
                                <span class="ml-[20px]">积分 <span class="text-lg text-[#f5222d]">{{
                                    orderList[activeIndex].member.point || 0 }}</span></span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between mt-[20px]">
                        <div class="font-bold">共<span class="text-[#f5222d] ml-[5px] mr-[5px]">{{
                            orderList[activeIndex].goods_num }}</span>件商品</div>
                        <div class="">实付<span class="text-[#f5222d] font-bold">￥{{ orderList[activeIndex].order_money
                        }}</span></div>
                    </div>

                    <el-table class="mt-[20px]" empty-text="暂无商品" :data="orderList[activeIndex].order_goods">
                        <el-table-column prop="goods_name" label="商品名称" width="300">
                            <template #default="scope">
                                <div class="flex items-center">
                                    <el-image :src="img(scope.row.sku_image)" class="w-[50px] h-[50px] rounded-[5px]"
                                        fit="cover"></el-image>
                                    <div class="flex-1 ml-[10px]">
                                        <span v-if="scope.row.is_gift" class="mr-10px text-[#1890ff]">[赠品]</span>
                                        <span>{{ scope.row.goods_name }}</span>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="单价"></el-table-column>
                        <el-table-column prop="num" label="数量"></el-table-column>
                        <el-table-column prop="goods_money" label="金额"></el-table-column>
                    </el-table>
                </div>
                <div v-if="tabIndex == 1">
                    <div class="font-bold">收货信息</div>
                    <div class="text-sm flex mt-10px leading-40px">
                        <div class="w-[33%]">收货人:{{ orderList[activeIndex].taker_name }}</div>
                        <div class="w-[33%]">收货电话:{{ orderList[activeIndex].taker_mobile }}</div>
                        <div class="w-[33%] flex">
                            <div class="w-80px">收货地址:</div>
                            <div class="flex-1">{{ orderList[activeIndex].taker_full_address }}</div>
                        </div>
                    </div>

                    <div class="mt-50px pt-20px border-t border-dashed border-[#f1f1f1]">
                        <div class="font-bold">用户信息</div>
                        <div class="text-sm flex mt-10px leading-40px">
                            <div class="w-[33%]">用户昵称:{{ orderList[activeIndex].member.nickname }}</div>
                            <div class="w-[33%]">绑定电话:{{ orderList[activeIndex].member.mobile || '暂无' }}</div>
                        </div>
                    </div>

                    <div class="mt-50px pt-20px border-t border-dashed border-[#f1f1f1]">
                        <div class="font-bold">订单信息</div>
                        <div class="text-sm flex mt-10px flex-wrap leading-40px">
                            <div class="w-[33%]">创建时间:{{ orderList[activeIndex].create_time }}</div>
                            <div class="w-[33%]">商品总数:{{ orderList[activeIndex].goods_num }}</div>
                            <div class="w-[33%]">商品总价:￥{{ orderList[activeIndex].order_money }}</div>
                            <!-- <div class="w-[33%]">优惠券金额:￥3.8</div> -->
                            <!-- <div class="w-[33%]">积分抵扣:￥3.8</div> -->
                            <!-- <div class="w-[33%]">会员优惠:￥3.8</div> -->
                            <!-- <div class="w-[33%]">推广人:刘阿超/ID:538</div> -->
                            <div class="w-[33%]">支付时间:{{ orderList[activeIndex].pay_time }}</div>
                            <div class="w-[33%]">支付方式:待完善</div>
                            <div class="w-[33%]">订单编号:{{ orderList[activeIndex].order_no }}</div>
                            <div class="w-[33%]">订单备注:{{ orderList[activeIndex].shop_remark }}</div>
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
                    <!-- <span class="font-bold mr-[40px]">收银员:刘超超</span> -->
                    <span class="text-sm">
                        <span>实付:</span>
                        <span class="text-[#f5222d] font-bold text-base">￥{{ orderList[activeIndex].order_money
                        }}</span>
                    </span>
                </div>
                <div>
                    <!-- <div class="lc-btn mr-[10px] flex-1 mini" @click="showMark = true">订单备注</div> -->
                    <div class="lc-btn mr-[10px] flex-1 mini" @click="printTicket">小票打印</div>
                    <div class="lc-btn ml-[10px] flex-1 mini orange" @click="showRefund = true">立即退款</div>
                </div>

                <MarkDialog v-model:show="showMark" v-model:remark="orderList[activeIndex].shop_remark"></MarkDialog>
                <RefundDialog v-model:show="showRefund" v-model:order="orderInfo"></RefundDialog>
            </div>
        </div>
    </div>
    <div v-else>
        <el-empty description="商城未启用" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { assetImg, img } from '@/utils/common';
import storage from '@/utils/storage';
import MarkDialog from './mark.vue';
import RefundDialog from './refundDialog.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '@/utils/request';
import { UserInfoInterface } from '@/interface/UserInfoInterface';

const shortcuts = [
    {
        text: '今天',
        value: () => {
            const start = new Date();
            start.setHours(0, 0, 0, 0); // 设置为今天的开始时间
            const end = new Date();
            end.setHours(23, 59, 59, 999); // 设置为今天的结束时间
            return [start, end];
        },
    },
    {
        text: '昨天',
        value: () => {
            const end = new Date();
            end.setHours(0, 0, 0, 0); // 设置为今天的开始时间
            end.setDate(end.getDate() - 1); // 减去一天，得到昨天的结束时间
            const start = new Date(end);
            start.setHours(0, 0, 0, 0); // 设置为昨天的开始时间
            return [start, end];
        },
    },
    {
        text: '近七天',
        value: () => {
            const end = new Date();
            end.setHours(23, 59, 59, 999); // 设置为今天的结束时间
            const start = new Date(end);
            start.setDate(end.getDate() - 6); // 减去 6 天，得到近七天的开始时间
            start.setHours(0, 0, 0, 0); // 设置为当天的开始时间
            return [start, end];
        },
    },
    {
        text: '近三十天',
        value: () => {
            const end = new Date();
            end.setHours(23, 59, 59, 999); // 设置为今天的结束时间
            const start = new Date(end);
            start.setDate(end.getDate() - 29); // 减去 29 天，得到近三十天的开始时间
            start.setHours(0, 0, 0, 0); // 设置为当天的开始时间
            return [start, end];
        },
    },
    {
        text: '本月',
        value: () => {
            const end = new Date();
            end.setHours(23, 59, 59, 999); // 设置为今天的结束时间
            const start = new Date(end);
            start.setDate(1); // 设置为本月第一天
            start.setHours(0, 0, 0, 0); // 设置为当天的开始时间
            return [start, end];
        },
    },
    {
        text: '本年',
        value: () => {
            const end = new Date();
            end.setHours(23, 59, 59, 999); // 设置为今天的结束时间
            const start = new Date(end);
            start.setMonth(0, 1); // 设置为本年第一天（1 月 1 日）
            start.setHours(0, 0, 0, 0); // 设置为当天的开始时间
            return [start, end];
        },
    },
]
const showMark = ref(false)
const showFilter = ref(false)
const showRefund = ref(false)
const activeIndex = ref(0)
const tabIndex = ref(1)
const orderNo = ref('')
const orderInfo = ref({
    price: 150,
    refund_money: 0,
    split_refund: false,
    orderGoods: [
        {
            name: '罗莱 天鹅绒乳胶枕新一代天鹅绒乳胶枕新一代天鹅绒乳胶枕新一代天鹅绒乳胶枕新一代天鹅绒乳胶枕新一代',
            attr: '梵佳多功能抹布LR-908/10 片/包',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 100.00,
            num: 10,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        },
        {
            name: '罗莱 天鹅绒乳胶枕新一代',
            attr: '默认',
            image: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg',
            price: 50.00,
            num: 1,
            refund_num: 0,
        }
    ]
})
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
    getOrderList()
})

interface OrderGoodsInterface {
    goods_image: string
}

interface OrderInterface {
    order_no: string
    create_time: string
    order_goods: OrderGoodsInterface[]
    order_money: string
    goods_num: number
    pay_time: string
    status: number
    shop_remark: string
    member: UserInfoInterface
    taker_name: string
    taker_mobile: string
    taker_full_address: string
}

const orderList = ref<OrderInterface[]>([])
const page = ref(1)
const total = ref(0)
const searchStatus = ref('')
const pageSize = ref(15)
const loading = ref(false)
const getOrderList = (resetPage: number = 0) => {
    if (resetPage > 0) {
        page.value = resetPage
    }
    loading.value = true
    let params = {
        page: page.value,
        keyword: orderNo.value,
        status: searchStatus.value,
        create_time: getSelectDate()
    }
    request.get('qiankun_cashier/get_order_list', { params }).then((res: any) => {
        loading.value = false
        for (let i in res.data.data) {
            res.data.data[i].goods_num = 0
            for (let n in res.data.data[i].order_goods) {
                res.data.data[i].goods_num += res.data.data[i].order_goods[n].num
            }
        }
        orderList.value = res.data.data
        total.value = res.data.total
        pageSize.value = res.data.per_page
    }).catch(() => {
        loading.value = false
    })
}

const getSelectDate = () => {
    let dates = dateRange.value
    if (dates[1]) {
        dates[1] = dates[1] + ' 23:59:59'
    }
    return dates
}

const printTicket = () => {
    ElMessageBox.confirm('是否打印小票？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        ElMessage.success('打印成功');
    }).catch(() => {
        ElMessage.info('取消打印');
    });
}

const dateRange = ref<string[]>([])
const handleClose = () => {
    showFilter.value = false;
    dateRange.value = []
    searchStatus.value = ''
    getOrderList(1)
};
const handleConfirm = () => {
    showFilter.value = false;
    getOrderList(1)
}

const changeStatus = (status: string = '') => {
    searchStatus.value = status
    showFilter.value = false
    getOrderList(1)
}
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

    :deep(.el-input__wrapper) {
        background-color: unset;
        box-shadow: unset;
    }
}

.search {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
</style>
