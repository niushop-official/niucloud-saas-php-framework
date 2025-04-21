<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="router.push({ path: '/shop_giftcard/giftcard/list' })" />
        </el-card>

        <el-form :model="formData" label-width="100px" ref="formRef" class="page-form" v-loading="loading" label-position="left">
            <template v-if="formData">

                <!-- 礼品卡信息 -->
                <el-card class="box-card !border-none relative" shadow="never">
                    <h3 class="panel-title">{{ t('giftcardInfoTitle') }}</h3>

                    <el-row class="row-bg px-[30px]" :gutter="20">
                        <el-col :span="8">
                            <el-form-item :label="t('cardType')">
                                <div class="input-width">{{ formData.type_name }}</div>
                            </el-form-item>
                            <el-form-item :label="t('cardName')">
                                <div class="input-width">{{ formData.card_name }}</div>
                            </el-form-item>
                            <el-form-item :label="t('cardCategory')">
                                <div class="input-width">{{ formData.category.category_name }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('cardRightType')">
                                <div class="input-width">{{ formData.card_right_type_name }}</div>
                            </el-form-item>
                            <el-form-item :label="t('validityType')">
                                <div class="input-width" v-if="formData.validity_type == 'forever'">{{ t('validityForever') }}</div>
                                <div class="input-width" v-if="formData.validity_type == 'day'">购买后{{ formData.validity_day }}天有效</div>
                                <div class="input-width" v-if="formData.validity_type == 'date'">使用截止时间为：{{ formData.validity_time || ''}}</div>
                            </el-form-item>
                            <el-form-item :label="t('status')">
                                <div class="input-width">{{ formData.status == 1 ? t('statusOn') : t('statusOff') }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="t('isGive')">
                                <div class="input-width">{{ formData.is_give == 1 ? '是' : '否' }}</div>
                            </el-form-item>
                            <el-form-item :label="t('deliveryWay')" v-if="formData.card_right_type == 'goods'">
                                <div class="input-width" v-if="formData.delivery_way == 'all'">{{ t('deliveryWayByAll') }}</div>
                                <div class="input-width" v-else-if="formData.delivery_way == 'batch'">{{ t('deliveryWayByBatch') }}</div>
                            </el-form-item>
                            <el-form-item :label="t('cardPrice')" v-if="formData.card_right_type == 'goods'">
                                <div class="input-width">￥{{ formData.card_price }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>

                <!-- 数据统计 -->
                <el-card class="box-card !border-none relative" shadow="never">
                    <h3 class="panel-title">{{ t('dataStatisticsTitle') }}</h3>
                    <template v-if="formData.type == 'virtual'">
                        <el-row class="row-bg px-[30px]" :gutter="20">

                            <el-col :span="6">
                                <el-statistic :value="formData.sale_count">
                                    <template #title>
                                        <span class="text-[14px]">{{t('saleCount')}}</span>
                                    </template>
                                </el-statistic>
                            </el-col>

                            <el-col :span="6">
                                <el-statistic :value="formData.use_count">
                                    <template #title>
                                        <span class="text-[14px]">{{t('useCount')}}</span>
                                    </template>
                                </el-statistic>
                            </el-col>

                            <el-col :span="6">
                                <el-statistic :value="formData.sale_count - formData.use_count - formData.invalid_count">
                                    <template #title>
                                        <span class="text-[14px]">{{t('notUseCount')}}</span>
                                    </template>
                                </el-statistic>
                            </el-col>

                            <el-col :span="6">
                                <el-statistic :value="formData.invalid_count">
                                    <template #title>
                                        <span class="text-[14px]">{{t('invalidCount')}}</span>
                                    </template>
                                </el-statistic>
                            </el-col>
                            
                        </el-row>
                    </template>

                    <template v-if="formData.type == 'real'">
                        <el-row class="row-bg px-[30px]" :gutter="0">
                    
                            <el-col :span="5">
                                <el-statistic :value="formData.make_card_count">
                                    <template #title>
                                        <span class="text-[14px]">{{t('makeCardCount')}}</span>
                                    </template>
                                </el-statistic>
                            </el-col>

                            <el-col :span="5">
                                <el-statistic :value="formData.activate_count">
                                    <template #title>
                                        <span class="text-[14px]">{{t('activateCount')}}</span>
                                    </template>
                                </el-statistic>
                            </el-col>

                            <el-col :span="5">
                                <el-statistic :value="formData.use_count">
                                    <template #title>
                                        <span class="text-[14px]">{{t('useCount')}}</span>
                                    </template>
                                </el-statistic>
                            </el-col>

                            <el-col :span="5">
                                <el-statistic :value="formData.activate_count - formData.use_count - formData.invalid_count">
                                    <template #title>
                                        <span class="text-[14px]">{{t('notUseCount')}}</span>
                                    </template>
                                </el-statistic>
                            </el-col>

                            <el-col :span="5">
                                <el-statistic :value="formData.invalid_count">
                                    <template #title>
                                        <span class="text-[14px]">{{t('invalidCount')}}</span>
                                    </template>
                                </el-statistic>
                            </el-col>
                            
                        </el-row>
                    </template>
                </el-card>

                <!-- 使用规则 -->
                <el-card class="box-card !border-none relative" shadow="never">
                    <h3 class="panel-title">{{ t('useRuleTitle') }}</h3>
                    <el-row class="row-bg px-[30px]" :gutter="20">
                        <el-col :span="8">
                            <template v-if="formData.card_right_type == 'goods'">
                                <p class="text-[14px]" v-if="formData.card_goods_type == 'all'">持卡人兑换时，可从按照商品列表中商品数量进行兑换</p>
                                <p class="text-[14px]" v-if="formData.card_goods_type == 'diy'">持卡人兑换时，可从以下商品列表中任选{{ formData.card_goods_count }}件</p>
                            </template>
                            <template v-if="formData.card_right_type == 'balance'">
                                <p class="text-[14px]">持卡人兑换时，将储值卡的储值余额充值到账户余额中</p>
                            </template>
                        </el-col>
                    </el-row>
                </el-card>

                <!-- 储值余额 -->
                <el-card class="box-card !border-none relative" shadow="never" v-if="formData.card_right_type == 'balance'">
                    <h3 class="panel-title">{{ t('balanceTitle') }}</h3>
                    <el-row class="row-bg px-[30px]" :gutter="20">
                        <el-col :span="24">

                            <el-table :data="formData.balance_json" size="large" max-height="400" border style="max-width: 850px;">

                                <el-table-column prop="balance" :label="t('balanceValue')" min-width="120">
                                    <template #default="{ row }">
                                        <div>￥{{ row.balance }}</div>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="price" :label="t('balancePrice')" min-width="120" align="center">
                                    <template #default="{ row }">
                                        <div>￥{{ row.price }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('toActivateCount')" min-width="120" align="center" v-if="formData.type == 'real'">
                                    <template #default="{ row }">
                                        <span class="text-[14px]">{{ row.to_activate_num }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('notUseCount')" min-width="120" align="center">
                                    <template #default="{ row }">
                                        <span class="text-[14px]">{{ row.can_use_num }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('useCount')" min-width="120" align="center">
                                    <template #default="{ row }">
                                        <span class="text-[14px]">{{ row.use_num }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('invalidCount')" min-width="120" align="center">
                                    <template #default="{ row }">
                                        <span class="text-[14px]">{{ row.invalid_num }}</span>
                                    </template>
                                </el-table-column>

                            </el-table>

                        </el-col>
                    </el-row>
                </el-card>

                <!-- 商品列表 -->
                <el-card class="box-card !border-none relative" shadow="never" v-if="formData.card_right_type == 'goods'">
                    <h3 class="panel-title">{{ t('goodsSkuListTitle') }}</h3>
                    <el-table :data="formData.goods_sku_list" size="large" border max-height="400" style="max-width: 950px;">
                        <el-table-column :label="t('goodsName')" align="left" width="350">
                            <template #default="{ row }">
                                <div class="flex">
                                    <div class="flex items-center shrink-0">
                                        <img class="w-[50px] h-[50px] mr-[10px]" :src="img(row.sku.sku_image)" />
                                    </div>
                                    <div class="flex flex-col">
                                        <p class="multi-hidden text-[14px]">{{ row.goods.goods_name }}</p>
                                        <span class="text-[12px] text-[#999]">{{ row.sku.sku_name }}</span>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('price')" min-width="120" align="center">
                            <template #default="{ row }">
                                <span class="text-[14px]">￥{{ row.sku.price }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('canExchangeNum')" min-width="120" align="center" v-if="formData.card_goods_type == 'all'">
                            <template #default="{ row }">
                                <span class="text-[14px]">{{ row.total_num }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('hasExchangeNum')" min-width="120" align="center">
                            <template #default="{ row }">
                                <span class="text-[14px]">{{ row.use_num }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('notExchangeNum')" min-width="120" align="center" v-if="formData.card_goods_type == 'all'">
                            <template #default="{ row }">
                                <span class="text-[14px]">{{ row.not_use_num }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('invalidNum')" min-width="120" align="center" v-if="formData.card_goods_type == 'all'">
                            <template #default="{ row }">
                              <span class="text-[14px]">{{ row.invalid_num }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>

                <!-- 礼品卡列表 -->
                <el-card class="box-card !border-none relative" shadow="never">
                    <h3 class="panel-title">{{ t('cardListTitle') }}</h3>

                    <el-form :inline="true" :model="cardTable.searchParam" ref="searchFormRef">
                        <el-form-item :label="t('cardNo')" prop="card_no">
                            <el-input v-model.trim="cardTable.searchParam.card_no" :placeholder="t('cardNoPlaceholder')" maxlength="30"/>
                        </el-form-item>
                        <el-form-item :label="t('cardSource')" prop="source" class="form-item-wrap">
                            <el-select v-model="cardTable.searchParam.source" :placeholder="t('cardSourcePlaceholder')" clearable>
                                <el-option v-for="(item,key) in sourceOptions" :key="key" :label="item" :value="key" />
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="loadCardList()">{{ t('search') }}</el-button>
                            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="mt-[10px]">

                        <el-tabs v-model="cardTable.searchParam.status" @tab-click="tabHandleClick">
                            <el-tab-pane :label="t('statusAll')" name=""></el-tab-pane>
                            <el-tab-pane v-for="(item,key) in statusList" :label="item" :name="key"></el-tab-pane>
                        </el-tabs>

                        <el-table :data="cardTable.data" size="large" v-loading="cardTable.loading">
                            <template #empty>
                                <span>{{ !cardTable.loading ? t('emptyData') : '' }}</span>
                            </template>

                            <el-table-column prop="card_no" :label="t('cardNo')" min-width="120" :show-overflow-tooltip="true"/>

                            <el-table-column prop="card_key" :label="t('cardKey')" min-width="120" :show-overflow-tooltip="true" v-if="formData.type == 'real'"/>

                            <el-table-column prop="balance" :label="t('cardBalance')" min-width="100" :show-overflow-tooltip="true" v-if="formData.card_right_type == 'balance'">
                                <template #default="{ row }">
                                    <span>￥{{ row.balance }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="source_name" :label="t('cardSource')" min-width="80" :show-overflow-tooltip="true"/>

                            <el-table-column prop="create_time" :label="t('createTime')" min-width="120" :show-overflow-tooltip="true"/>

                            <el-table-column :label="t('activateMember')" min-width="120" v-if="formData.type == 'real'">
                                <template #default="{ row }">
                                    <span v-if="row.member" class="text-primary cursor-pointer" @click="toMemberDetailEvent(row.member.member_id)">{{ row.member.nickname }}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>

                            <el-table-column :label="t('formMember')" min-width="120" v-if="formData.type == 'virtual'">
                                <template #default="{ row }">
                                    <span v-if="row.member" class="text-primary cursor-pointer" @click="toMemberDetailEvent(row.member.member_id)">{{ row.member.nickname }}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="status_name" :label="t('status')" min-width="80" :show-overflow-tooltip="true"/>

                            <el-table-column prop="activate_time" :label="t('activateTime')" min-width="100" :show-overflow-tooltip="true" v-if="formData.type == 'real'">
                                <template #default="{ row }">
                                    <div v-if="row.activate_time">{{ row.activate_time }}</div>
                                    <div v-else>--</div>
                                </template>
                            </el-table-column>

                            <el-table-column prop="validity_time" :label="t('validityTime')" min-width="100" :show-overflow-tooltip="true">
                                <template #default="{ row }">
                                    <div v-if="row.validity_time">{{ row.validity_time }}</div>
                                    <div v-else>{{ t('validityForever') }}</div>
                                </template>
                            </el-table-column>

                            <el-table-column prop="total_num" :label="t('totalNum')" min-width="120" :show-overflow-tooltip="true">
                                <template #default="{ row }">
                                    <span>{{ row.use_num }}/{{ row.total_num }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column :label="t('operation')" fixed="right" min-width="80" align="right">
                                <template #default="{ row }">
                                    <el-button type="primary" link @click="toDetailEvent(row)" v-if="row.status != 'to_activate'">{{ t('cardDetailAction') }}</el-button>
                                    <el-button type="primary" link @click="deleteEvent(row.card_id)" v-if="row.status == 'to_activate'">{{ t('delete') }}</el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                        <div class="mt-[16px] flex justify-end">
                            <el-pagination v-model:current-page="cardTable.page" v-model:page-size="cardTable.limit" layout="total, sizes, prev, pager, next, jumper" :total="cardTable.total" @size-change="loadCardList()" @current-change="loadCardList" />
                        </div>
                    </div>

                </el-card>

            </template>

            <el-card class="box-card !border-none relative" shadow="never" v-if="!loading && !formData">
                <el-empty :description="t('cardInfoEmpty')" />
            </el-card>
        </el-form>

    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import { useRoute,useRouter } from 'vue-router'
import { getGiftcardDetail } from '@/addon/shop_giftcard/api/giftcard'
import { getGiftcardCardPageList,deleteGiftcardCard,getGiftcardCardStatusList,getGiftcardCardSourceList } from '@/addon/shop_giftcard/api/card'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title;

const giftcardId: any = ref(route.query.giftcard_id || 0)
const loading = ref(true)

const formData: Record<string, any> | null = ref(null)

// 卡的来源
const sourceOptions: any = reactive({})

// 卡的状态
const statusAll: any = reactive({})
const statusList: any = reactive({})

const initData = ()=> {
    getGiftcardCardSourceList().then((res: any) => {
        const data = res.data
        if (data) {
            Object.assign(sourceOptions,data);
        }
    })

    getGiftcardCardStatusList({}).then((res: any) => {
        const data = res.data
        if (data) {
            Object.assign(statusAll,data);
        }
    })

    initGiftcardDetail();
}

const initGiftcardDetail = () => {
    getGiftcardDetail(giftcardId.value).then((res: any) => {
        if (res.data) {
            formData.value = res.data;
            loading.value = false;
            Object.assign(statusList,statusAll[formData.value.type][formData.value.card_right_type]);
        }
    }).catch(() => {
        loading.value = false;
    })
}

initData();

let cardTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        card_no: "",
        giftcard_id: giftcardId.value,
        source: '',
        status: ''
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCardList()
}

/**
 * 获取礼品卡获取列表
 */
const loadCardList = (page: number = 1) => {
    cardTable.loading = true
    cardTable.page = page

    getGiftcardCardPageList({
        page: cardTable.page,
        limit: cardTable.limit,
        ...cardTable.searchParam
    }).then(res => {
        cardTable.loading = false
        cardTable.data = res.data.data
        cardTable.total = res.data.total
    }).catch(() => {
        cardTable.loading = false
    })
}
loadCardList()

/**
 * 删除礼品卡获取
 */
const deleteEvent = (card_id: number) => {
    ElMessageBox.confirm(t('cardDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteGiftcardCard(card_id).then(() => {
            loadCardList()
            initGiftcardDetail()
        }).catch(() => {
        })
    })
}

// 当前选中tab页面
const tabHandleClick = (tab: any, event: Event) => {
    cardTable.searchParam.status = tab.props.name
    loadCardList()
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

// 跳转到具体某个卡的详情
const toDetailEvent = (data: any)=>{
    const url = router.resolve({
        path: '/shop_giftcard/giftcard/card_detail',
        query: {
            card_id: data.card_id
        }
    })
    window.open(url.href)
}
</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
@media screen and (min-width: 769px) {
    .el-col-5 {
        max-width: 20%;
        width: 20%;
        flex: 0 0 20%;
    }
}
@media screen and (min-width: 569px) and (max-width: 768px) {
    .el-col-5 {
        max-width: 50%;
        width: 50%;
        flex: 0 0 50%;
    }
}
@media only screen and (max-width: 568px) {
    .el-col-5 {
        max-width: 100%;
        width: 100%;
        flex: 0 0 100%;
    }
}
</style>
