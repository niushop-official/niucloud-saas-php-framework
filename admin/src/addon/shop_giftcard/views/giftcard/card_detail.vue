<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="goBack" />
        </el-card>

        <el-form :model="formData" label-width="100px" ref="formRef" class="page-form" v-loading="loading" label-position="left">
            <template v-if="formData">

                <!-- 卡信息 -->
                <el-card class="box-card !border-none relative" shadow="never">
                    <h3 class="panel-title">{{ t('giftcardInfoTitle') }}</h3>

                    <el-row class="row-bg px-[30px]" :gutter="20">
                        <el-col :span="8">
                            <el-form-item :label="t('cardType')">
                                <div class="input-width">{{ formData.giftcard.type_name }}</div>
                            </el-form-item>
                            <el-form-item :label="t('cardNo')">
                                <div class="input-width">{{ formData.card_no }}</div>
                            </el-form-item>
                            <el-form-item :label="t('cardKey')" v-if="formData.giftcard.type == 'real'">
                                <div class="input-width">{{ formData.card_key }}</div>
                            </el-form-item>

                            <el-form-item :label="t('formMember')">
                                <div class="input-width text-primary cursor-pointer" @click="toMemberDetailEvent(formData.member.member_id)">{{ formData.member.nickname }}</div>
                            </el-form-item>
                            <el-form-item :label="t('status')">
                                <div class="input-width">{{ formData.status_name }}</div>
                            </el-form-item>

                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('cardRightType')">
                                <div class="input-width">{{ formData.giftcard.card_right_type_name }}</div>
                            </el-form-item>
                            <el-form-item :label="t('cardBalance')" v-if="formData.giftcard.card_right_type == 'balance'">
                                <div class="input-width">￥{{ formData.balance }}</div>
                            </el-form-item>
                            <el-form-item :label="t('createTime')">
                                <div class="input-width">{{ formData.create_time }}</div>
                            </el-form-item>
                            <el-form-item :label="t('validityTime')">
                                <div class="input-width" v-if="formData.validity_time">{{ formData.validity_time }}</div>
                                <div class="input-width" v-else>{{ t('validityForever') }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">

                            <el-form-item :label="t('activateTime')" v-if="formData.giftcard.type == 'real'">
                                <div class="input-width">{{ formData.activate_time }}</div>
                            </el-form-item>
                            <el-form-item :label="t('isGive')">
                                <div class="input-width">{{ formData.giftcard.is_give == 1 ? '是' : '否' }}</div>
                            </el-form-item>
                            <el-form-item :label="t('cardSource')">
                                <div class="input-width">{{ formData.source_name }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>

                <!-- 数据统计 -->
                <el-card class="box-card !border-none relative" shadow="never">
                    <h3 class="panel-title">{{ t('dataStatisticsTitle') }}</h3>
                    <el-row class="row-bg px-[30px]" :gutter="20">

                        <el-col :span="8">
                            <el-statistic :value="formData.total_num">
                                <template #title>
                                    <span class="text-[14px]">{{formData.giftcard.card_right_type == 'balance' ? t('totalNum') : t('canExchangeNum')}}</span>
                                </template>
                            </el-statistic>
                        </el-col>

                        <el-col :span="8">
                            <el-statistic :value="formData.use_num">
                                <template #title>
                                    <span class="text-[14px]">{{formData.giftcard.card_right_type == 'balance' ? t('useCount') : t('hasExchangeNum')}}</span>
                                </template>
                            </el-statistic>
                        </el-col>

                        <el-col :span="8">
                            <el-statistic :value="formData.total_num - formData.use_num">
                                <template #title>
                                    <span class="text-[14px]">{{formData.giftcard.card_right_type == 'balance' ? t('notUseCount') : t('notExchangeNum')}}</span>
                                </template>
                            </el-statistic>
                        </el-col>

                    </el-row>
                </el-card>

                <!-- 使用规则 -->
                <el-card class="box-card !border-none relative" shadow="never">
                    <h3 class="panel-title">{{ t('useRuleTitle') }}</h3>
                    <el-row class="row-bg px-[30px]" :gutter="20">
                        <el-col :span="8">
                            <template v-if="formData.giftcard.card_right_type == 'goods'">
                                <p class="text-[14px]" v-if="formData.giftcard.card_goods_type == 'all'">持卡人兑换时，可从按照商品列表中商品数量进行兑换</p>
                                <p class="text-[14px]" v-if="formData.giftcard.card_goods_type == 'diy'">持卡人兑换时，可从以下商品列表中任选{{ formData.giftcard.card_goods_count }}件</p>
                            </template>
                            <template v-if="formData.giftcard.card_right_type == 'balance'">
                                <p class="text-[14px]">持卡人兑换时，将储值卡的储值余额充值到账户余额中</p>
                            </template>
                        </el-col>
                    </el-row>
                </el-card>

                <!-- 兑换商品 -->
                <el-card class="box-card !border-none relative" shadow="never" v-if="formData.giftcard.card_right_type == 'goods'">
                    <h3 class="panel-title">{{ t('goodsSkuListTitle') }}</h3>
                    <el-table :data="formData.cardGoods" size="large" border max-height="400" style="max-width: 1000px;">
                        <el-table-column :label="t('goodsName')" align="left" width="350">
                            <template #default="{ row }">
                                <div class="flex">
                                    <div class="flex items-center shrink-0">
                                        <img class="w-[50px] h-[50px] mr-[10px]" :src="img(row.sku_image)" />
                                    </div>
                                    <div class="flex flex-col">
                                        <p class="multi-hidden text-[14px]">{{ row.goods_name }}</p>
                                        <span class="text-[12px] text-[#999]">{{ row.sku_name }}</span>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('price')" min-width="120" align="center">
                            <template #default="{ row }">
                                <span class="text-[14px]">￥{{ row.price }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('canExchangeNum')" min-width="120" align="center" v-if="formData.giftcard.card_goods_type == 'all'">
                            <template #default="{ row }">
                                <span class="text-[14px]">{{ row.total_num }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('hasExchangeNum')" min-width="120" align="center">
                            <template #default="{ row }">
                                <span class="text-[14px]">{{ row.use_num }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('notExchangeNum')" min-width="120" align="center" v-if="formData.giftcard.card_goods_type == 'all'">
                            <template #default="{ row }">
                                <span class="text-[14px]">{{ row.total_num - row.use_num }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>

                <!-- 卡使用记录 -->
                <el-card class="box-card !border-none relative" shadow="never">
                    <h3 class="panel-title">{{ t('useRecordsList') }}</h3>
                    <el-table size="large" class="table-top" border max-height="400">
                        <el-table-column :label="t('goodsName')" width="350" v-if="formData.giftcard.card_right_type == 'goods'"/>
                        <el-table-column :label="t('cardBalance')" align="center" min-width="120" v-if="formData.giftcard.card_right_type == 'balance'"/>
                        <el-table-column :label="formData.giftcard.card_right_type == 'balance' ? t('useNum'): t('exchangeNum')" align="center" min-width="120" />
                        <el-table-column :label="t('useTime')" align="center" min-width="120" />
                        <el-table-column :label="t('operation')" fixed="right" align="center" min-width="120" />
                    </el-table>
                    <div :class="formData.use_records_list.length > 0 ? '' : 'border-l-[1px] border-r-[1px] border-b-[1px] border-solid border-[var(--el-border-color-lighter)]'" v-loading="loading">
                        <div v-if="!loading">
                            <template v-if="formData.use_records_list.length">
                                <div v-for="(item, index) in formData.use_records_list" :key="index">
                                    <el-table :data="item.recordsGoods" size="large" border :show-header="false" :span-method="arraySpanMethod" max-height="400">
                                        <el-table-column align="left" width="350" v-if="formData.giftcard.card_right_type == 'goods'">
                                            <template #default="{ row }">
                                                <div class="flex">
                                                    <div class="flex items-center shrink-0">
                                                        <img class="w-[50px] h-[50px] mr-[10px]" :src="img(row.sku_image)" />
                                                    </div>
                                                    <div class="flex flex-col">
                                                        <p class="multi-hidden text-[14px]">{{ row.goods_name }}</p>
                                                        <span class="text-[12px] text-[#999]">{{ row.sku_name }}</span>
                                                    </div>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" min-width="120" v-if="formData.giftcard.card_right_type == 'balance'">
                                            <template #default="{ row }">
                                                <span class="text-[14px]">￥{{ row.balance }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" min-width="120">
                                            <template #default="{ row }">
                                                <span class="text-[14px]">{{ row.use_num }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" min-width="120">
                                            <template #default="{ row }">
                                                <span class="text-[14px]">{{ row.create_time }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" min-width="120">
                                            <template #default="{ row }">
                                                <el-button type="primary" link @click="toOrderEvent(row)" v-if="formData.giftcard.card_right_type == 'goods'">{{ t('toRelationOrder') }}</el-button>
                                                <el-button type="primary" link @click="toBalanceEvent(item)" v-else>{{ t('toMemberBalanceList') }}</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </template>
                            <el-empty v-else :image-size="1" :description="t('emptyData')"/>
                        </div>
                    </div>
                </el-card>

                <!-- 卡领取记录 -->
                <!-- <div class="table-body" v-loading="loading">
                    <el-card class="box-card !border-none relative" shadow="never">
                        <h3 class="panel-title" v-if="formData.member_records_log.length > 0">{{ t('memberRecordsList') }}</h3>
                        <div v-if="formData.member_records_log.length > 0">
                            <div class="flex" v-for="(items, index) in formData.member_records_log" :key="index">
                                <div class="mr-[20px] min-w-[71px]">
                                    <div class="leading-[1] w-full text-[14px] w-[100px] flex justify-end">
                                        {{ items.time && items.time.split(' ')[0] }}
                                    </div>
                                    <div class="leading-[1] w-full text-[14px]  w-[100px] flex justify-end mt-[15px]">
                                        {{ items.time && items.time.split(' ')[1] }}
                                    </div>
                                </div>
                                <div>
                                    <div class="w-[16px] h-[16px] flex items-center bg-[#D1EBFF] border-[1px] border-[#0091FF] rounded-[999px]">
                                        <div class="w-[8px] h-[8px] mx-auto bg-[#0091FF] rounded-[999px]"></div>
                                    </div>
                                    <div v-if="index + 1 != formData.member_records_log.length" class="w-[2px] h-[50px] bg-[#D1EBFF] mx-auto"></div>
                                </div>
                                <div>
                                    <div class="leading-[1] ml-[20px] text-[14px]">
                                        {{ items.nickname }}
                                    </div>
                                    <div class="leading-[1] ml-[20px] text-[14px] mt-[15px]">
                                        <span>{{ items.content }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div> -->

                <!-- 礼品卡日志 -->
                <el-card class="box-card !border-none relative" shadow="never">
                    <h3 class="panel-title" v-if="formData.giftcard_log.length > 0">{{ t('cardLogList') }}</h3>
                    <div class="mb-[50px]" style="min-height: 100px" v-if="formData.giftcard_log.length > 0">
                        <div class="flex" v-for="(items, index) in formData.giftcard_log" :key="index">
                            <div class="mr-[20px] min-w-[71px]">
                                <div class="leading-[1] w-full text-[14px] w-[100px] flex justify-end">
                                    {{ items.create_time && items.create_time.split(' ')[0] }}
                                </div>
                                <div class="leading-[1] w-full text-[14px]  w-[100px] flex justify-end mt-[15px]">
                                    {{ items.create_time && items.create_time.split(' ')[1] }}
                                </div>
                            </div>
                            <div>
                                <div class="w-[16px] h-[16px] flex items-center bg-[#D1EBFF] border-[1px] border-[#0091FF] rounded-[999px]">
                                    <div class="w-[8px] h-[8px] mx-auto bg-[#0091FF] rounded-[999px]"></div>
                                </div>
                                <div v-if="index + 1 != formData.giftcard_log.length" class="w-[2px] h-[50px] bg-[#D1EBFF] mx-auto"></div>
                            </div>
                            <div>
                                <div class="leading-[1] ml-[20px] text-[14px]">{{ items.name }}</div>
                                <div class="leading-[1] ml-[20px] text-[14px] mt-[15px]">
                                    <span>{{ items.type_name }}</span>
                                    <span class="ml-[10px]">{{items.remark}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>

            </template>

        </el-form>

    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { useRoute,useRouter } from 'vue-router'
import { getGiftcardCardDetail } from '@/addon/shop_giftcard/api/card'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title;

const cardId: any = ref(route.query.card_id || 0)
const loading = ref(true)

const formData: Record<string, any> | null = ref(null)

const initData = ()=> {
    getGiftcardCardDetail(cardId.value).then((res: any) => {
        if (res.data) {
            formData.value = res.data;

            formData.value.use_records_list = formData.value.use_records_list.map((el: any) => {
                el.recordsGoods.forEach((v: any) => {
                    v.rowNum = el.recordsGoods.length
                })
                return el
            });
            loading.value = false;
        }
    }).catch(() => {
        loading.value = false;
    })
}

initData();

const arraySpanMethod = ({ row, column, rowIndex, columnIndex }:any) => {
    if (rowIndex === 0) {
        if (columnIndex > 1) {
            return [row.rowNum, 1]
        } else {
            return [1, 1]
        }
    } else {
        if (columnIndex > 1) {
            return [0, 0]
        } else {
            return [1, 1]
        }
    }
}

const goBack = ()=> {
    if(!formData.value) return;
    router.push(`/shop_giftcard/giftcard/detail?giftcard_id=${ formData.value.giftcard_id }`)
}

/**
 * 跳转会员详情
 */
const toMemberDetailEvent = (member_id: any) => {
    const url = router.resolve({
        path: '/member/detail',
        query: {
            id: member_id
        }
    })
    window.open(url.href)
}

// 跳转到关联订单详情
const toOrderEvent = (data: any)=>{
    const url = router.resolve({
        path: '/shop/order/detail',
        query: {
            order_id: data.order_id
        }
    })
    window.open(url.href)
}

// 跳转到余额变动记录
const toBalanceEvent = (data: any)=>{
    const url = router.resolve({
        path: '/member/balance',
        query: {
            id: data.member_id
        }
    })
    window.open(url.href)
}
</script>

<style lang="scss" scoped>
.table-top :deep(.el-table__body-wrapper) {
	display: none;
}

.input-item {
	width: 150px !important;
}

:deep(.el-table) {
	--el-table-row-hover-bg-color: var(--el-transfer-border-color);
}

:deep(.el-empty__description) {
    margin-top: 0;
}

:deep(.el-empty) {
    padding: 20px 0;
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
