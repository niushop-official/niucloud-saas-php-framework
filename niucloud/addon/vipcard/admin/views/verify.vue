<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-tabs v-model="tab">
                    <el-tab-pane :label="t('verifyRecord')" name="record">
                        <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                            <el-form :inline="true" :model="recordTable.searchParam" ref="searchFormRef">
                                <el-form-item :label="t('verifyCode')" prop="verify_code">
                                    <el-input v-model="recordTable.searchParam.verify_code"
                                        :placeholder="t('verifyCodePlaceholder')" />
                                </el-form-item>
                                <el-form-item :label="t('verifyTime')" prop="verify_time">
                                    <el-date-picker v-model="recordTable.searchParam.verify_time" type="datetimerange"
                                        value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                                        :end-placeholder="t('endDate')" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="loadRecordList()">{{ t('search') }}</el-button>
                                    <el-button @click="searchFormRef?.resetFields()">{{ t('reset') }}</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>

                        <div class="mt-[10px]">
                            <el-table :data="recordTable.data" size="large" v-loading="recordTable.loading">
                                <template #empty>
                                    <span>{{ !recordTable.loading ? t('emptyData') : '' }}</span>
                                </template>

                                <el-table-column prop="verify_code" :show-overflow-tooltip="true" :label="t('verifyCode')"
                                    align="left" min-width="150" />
                                <el-table-column :show-overflow-tooltip="true" :label="t('serviceInfo')" align="left"
                                    min-width="300">
                                    <template #default="{ row }">
                                        <div class="flex items-center cursor-pointer">
                                            <img class="w-[50px] h-[50px] mr-[10px]"
                                                v-if="row.member_card_item.cover_thumb_small"
                                                :src="img(row.member_card_item.cover_thumb_small)" alt="">
                                            <img class="w-[50px] h-[50px] mr-[10px]" v-else src="" alt="">
                                            <a href="javascript:;" class="flex-1 multi-hidden" :title="row.member_card_item.goods_name">{{row.member_card_item.goods_name}}</a>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="num" :label="t('verifyNum')" min-width="100" align="center">
                                </el-table-column>
                                <el-table-column :label="t('verifyTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                                    <template #default="{ row }">
                                        {{ row.create_time || '' }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="verifyer" :label="t('verifyer')" min-width="180" align="center">
                                </el-table-column>

                                <el-table-column :label="t('operation')" fixed="right" width="130">
                                    <template #default="{ row }">
                                        <el-button type="primary" link @click="infoEvent(row)">{{ t('toOrder') }}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="mt-[16px] flex justify-end">
                                <el-pagination v-model:current-page="recordTable.page" v-model:page-size="recordTable.limit"
                                    layout="total, sizes, prev, pager, next, jumper" :total="recordTable.total"
                                    @size-change="loadRecordList()" @current-change="loadRecordList" />
                            </div>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane :label="t('verifier')" name="verifier">
                        <Verifier />
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'
import { getVerifyRecord } from '@/addon/vipcard/api/vipcard'
import { img } from '@/utils/common'
import { AnyObject } from '@/types/global'
import Verifier from '@/addon/vipcard/views/components/verifier.vue'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const tab = ref('record')

const recordTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        verify_code: '',
        verify_time: []
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取核销记录列表
 */
const loadRecordList = (page: number = 1) => {
    recordTable.loading = true
    recordTable.page = page

    getVerifyRecord({
        page: recordTable.page,
        limit: recordTable.limit,
        ...recordTable.searchParam
    }).then(res => {
        recordTable.loading = false
        recordTable.data = res.data.data
        recordTable.total = res.data.total
    }).catch(() => {
        recordTable.loading = false
    })
}
loadRecordList()

const infoEvent = (info: AnyObject) => {
    const routeUrl = router.resolve({
        path: '/vipcard/order/detail',
        query: { order_id: info.member_card_item.card.order_id }
    })
    window.open(routeUrl.href, '_blank')
}
</script>

<style lang="scss" scoped></style>
