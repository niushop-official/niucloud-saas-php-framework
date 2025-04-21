<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-tabs v-model="tab">
                    <!-- <el-tab-pane :label="t('hotelVerify')" name="verify">
                        <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                            <el-row>
                                <div class="w-[350px]">
                                    <el-input v-model="verifyTable.searchParam.value" placeholder=""
                                        class="input-with-select" :clearable="true">
                                        <template #prepend>
                                            <el-select v-model="verifyTable.searchParam.type" style="width: 100px">
                                                <el-option :label="t('verifyCode')" value="verify_code" />
                                                <el-option :label="t('orderNo')" value="order_no" />
                                                <el-option :label="t('mobile')" value="mobile" />
                                            </el-select>
                                        </template>
                                        <template #append>
                                            <el-button icon="Search" @click="searchHotelVerifyData" />
                                        </template>
                                    </el-input>
                                </div>
                            </el-row>

                            <div class="mt-[20px]">
                                <el-table :data="verifyTable.data" size="large" v-loading="verifyTable.loading">
                                    <template #empty>
                                        <span>{{ !verifyTable.loading ? t('emptyData') : '' }}</span>
                                    </template>

                                    <el-table-column prop="verify_code" :label="t('verifyCode')" align="left"
                                        min-width="200" :show-overflow-tooltip="true" />
                                    <el-table-column prop="order_no" :label="t('orderNo')" align="left" min-width="200"
                                        :show-overflow-tooltip="true" />
                                    <el-table-column prop="order_type_name" :label="t('verifyType')" align="left"
                                        min-width="100" />
                                    <el-table-column :show-overflow-tooltip="true" :label="t('OrderInfo')" align="left"
                                        min-width="200">
                                        <template #default="{ row }">
                                            <div class="flex items-center cursor-pointer" v-if="row.order_type == 'hotel'">
                                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.goods_image"
                                                    :src="img(row.goods_image)" alt="">
                                                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="" alt="">
                                                <div class="flex flex-col">
                                                    <span>{{ row.hotel.hotel_name || '' }}</span>
                                                    <span>{{ row.goods_name || '' }}</span>
                                                </div>
                                            </div>
                                            <div class="flex items-center cursor-pointer" v-if="row.order_type == 'scenic'">
                                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.goods_image"
                                                    :src="img(row.goods_image)" alt="">
                                                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="" alt="">
                                                <div class="flex flex-col">
                                                    <span>{{ row.scenic.scenic_name || '' }}</span>
                                                    <span>{{ row.goods_name || '' }}</span>
                                                </div>
                                            </div>
                                            <div class="flex items-center cursor-pointer" v-if="row.order_type == 'way'">
                                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.goods_image"
                                                    :src="img(row.goods_image)" alt="">
                                                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="" alt="">
                                                <div class="flex flex-col">
                                                    <span>{{ row.way.way_name || '' }}</span>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" :label="t('buyInfo')" align="left"
                                        min-width="200">
                                        <template #default="{ row }">
                                            <div class="flex flex-col" v-if="row.order_type == 'hotel'">
                                                <span>{{ t('hotelStartTime') }}：{{ row.start_time }}</span>
                                                <span>{{ t('hotelEndTime') }}：{{ row.end_time }}</span>
                                                <span>{{ t('hotelNum') }}：{{ row.num }}{{ t('room') }}</span>
                                            </div>
                                            <div class="flex flex-col" v-if="row.order_type == 'scenic'">
                                                <span>{{ t('reserveTime') }}：{{ row.start_time }}</span>
                                                <span>{{ t('touristNum') }}：{{ row.num }}{{ t('person') }}</span>
                                            </div>
                                            <div class="flex flex-col" v-if="row.order_type == 'way'">
                                                <span>{{ t('hotelStartTime') }}：{{ row.start_time }}</span>
                                                <span>{{ t('touristNum') }}：{{ row.num }}{{ t('person') }}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="mobile" :label="t('mobile')" align="left" min-width="200"
                                        :show-overflow-tooltip="true" />

                                    <el-table-column :label="t('operation')" fixed="right"  align="right" width="150">
                                        <template #default="{ row }">
                                            <el-button type="primary" link @click="handelVerify(row)"
                                                v-if="!row.refund_status">{{
                                                    t('verify') }}</el-button>
                                            <el-tooltip class="box-item" effect="dark" :content="t('orderRefunding')"
                                                placement="top-start" v-else>
                                                <el-button type="primary" link :disabled="true">{{ t('verify')
                                                }}</el-button>
                                            </el-tooltip>
                                            <el-button type="primary" link @click="infoEvent(row)">{{ t('toOrder')
                                            }}</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="mt-[16px] flex justify-end">
                                    <el-pagination v-model:current-page="recordTable.page"
                                        v-model:page-size="recordTable.limit"
                                        layout="total, sizes, prev, pager, next, jumper" :total="recordTable.total"
                                        @size-change="loadRecordList()" @current-change="loadRecordList" />
                                </div>
                            </div>

                        </el-card>
                    </el-tab-pane> -->

                    <el-tab-pane :label="t('verifyRecord')" name="record">
                        <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                            <el-form :inline="true" :model="recordTable.searchParam" ref="searchFormRef">
                                <el-form-item :label="t('orderNo')" prop="order_no">
                                    <el-input v-model="recordTable.searchParam.order_no" :placeholder="t('orderNoPlaceholder')" />
                                </el-form-item>
                                <el-form-item :label="t('verifyCode')" prop="verify_code">
                                    <el-input v-model="recordTable.searchParam.verify_code" :placeholder="t('verifyCodePlaceholder')" />
                                </el-form-item>
                                <el-form-item :label="t('verifyTime')" prop="verify_time">
                                    <el-date-picker v-model="recordTable.searchParam.verify_time" type="datetimerange"
                                        value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                                        :end-placeholder="t('endDate')" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="loadRecordList()">{{ t('search') }}</el-button>
                                    <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>

                        <div class="mt-[10px]">
                            <el-table :data="recordTable.data" size="large" v-loading="recordTable.loading">
                                <template #empty>
                                    <span>{{ !recordTable.loading ? t('emptyData') : '' }}</span>
                                </template>

                                <el-table-column prop="verify_code" :show-overflow-tooltip="true" :label="t('verifyCode')" align="left" min-width="150" />
                                <el-table-column prop="order_no" :show-overflow-tooltip="true" :label="t('orderNo')" align="left" min-width="180" />
                                <el-table-column prop="order_type_name" :label="t('verifyType')" align="left" min-width="100" />
                                <el-table-column :show-overflow-tooltip="true" :label="t('OrderInfo')" align="left" min-width="200">
                                    <template #default="{ row }">
                                        <div class="flex items-center cursor-pointer" v-if="row.order_type == 'hotel'">
                                            <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.image_thumb_small" :src="img(row.image_thumb_small)" alt="">
                                            <img class="w-[50px] h-[50px] mr-[10px]" v-else src="" alt="">
                                            <div class="flex-1 flex flex-col">
                                                <a href="javascript:;" v-if="row.hotel" :title="row.hotel.hotel_name" class="multi-hidden ml-2">{{ row.hotel.hotel_name }}</a>
                                                <a href="javascript:;" :title="row.goods_name" class="multi-hidden ml-2">{{ row.goods_name }}</a>
                                            </div>
                                        </div>
                                        <div class="flex items-center cursor-pointer" v-if="row.order_type == 'scenic'">
                                            <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.image_thumb_small" :src="img(row.image_thumb_small)" alt="">
                                            <img class="w-[50px] h-[50px] mr-[10px]" v-else src="" alt="">
                                            <div class="flex-1 flex flex-col">
                                                <a href="javascript:;" v-if="row.scenic" :title="row.scenic.scenic_name" class="multi-hidden">{{ row.scenic.scenic_name }}</a>
                                                <a href="javascript:;" :title="row.goods_name" class="multi-hidden">{{ row.goods_name }}</a>
                                            </div>
                                        </div>
                                        <div class="flex items-center cursor-pointer" v-if="row.order_type == 'way'">
                                            <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.image_thumb_small" :src="img(row.image_thumb_small)" alt="">
                                            <img class="w-[50px] h-[50px] mr-[10px]" v-else src="" alt="">
                                            <a href="javascript:;" v-if="row.way" :title="row.way.way_name" class="multi-hidden flex-1">{{ row.way.way_name }}</a>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" :label="t('buyInfo')" align="left" min-width="200">
                                    <template #default="{ row }">
                                        <div class="flex flex-col" v-if="row.order_type == 'hotel'">
                                            <span>{{ t('hotelStartTime') }}：{{ row.start_time }}</span>
                                            <span>{{ t('hotelEndTime') }}：{{ row.end_time }}</span>
                                            <span>{{ t('hotelNum') }}：{{ row.num }}{{ t('room') }}</span>
                                        </div>
                                        <div class="flex flex-col" v-if="row.order_type == 'scenic'">
                                            <span>{{ t('reserveTime') }}：{{ row.start_time }}</span>
                                            <span>{{ t('touristNum') }}：{{ row.num }}{{ t('person') }}</span>
                                        </div>
                                        <div class="flex flex-col" v-if="row.order_type == 'way'">
                                            <span>{{ t('hotelStartTime') }}：{{ row.start_time }}</span>
                                            <span>{{ t('touristNum') }}：{{ row.num }}{{ t('person') }}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="mobile" :label="t('mobile')" align="left" min-width="120" :show-overflow-tooltip="true" />
                                <el-table-column :label="t('verifyTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                                    <template #default="{ row }">
                                        {{ row.verify_time || '' }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="verifyer" :label="t('verifyer')" min-width="180" align="center">
                                </el-table-column>

                                <el-table-column :label="t('operation')" fixed="right" align="right" width="130">
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
import { FormInstance, ElMessage, ElMessageBox } from 'element-plus'
import { getVerifyRecord, searchVerify, verify } from '@/addon/tourism/api/tourism'
import { img } from '@/utils/common'
import test from '@/utils/test'
import { AnyObject } from '@/types/global'
import Verifier from '@/addon/tourism/views/components/verifier.vue'

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
        order_no: '',
        verify_code: '',
        verify_time: []
    }
})

const verifyTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        type: 'verify_code',
        value: ''
    }
})

const searchHotelVerifyData = () => {
    if (test.empty(verifyTable.searchParam.value)) {
        ElMessage.error(t('searchValueEmptyTips'))
        return
    }
    searchVerify({
        page: verifyTable.page,
        limit: verifyTable.limit,
        ...verifyTable.searchParam
    }).then(res => {
        verifyTable.loading = false
        verifyTable.data = res.data.data
        verifyTable.total = res.data.total
    }).catch(() => {
        verifyTable.loading = false
    })
}

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

const handelVerify = (row: AnyObject) => {
    ElMessageBox.confirm(t('verifyTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        verify(row.verify_code).then(res => {
            searchHotelVerifyData()
            loadRecordList()
            tab.value = 'record'
        }).catch(() => {
        })
    })
}

const infoEvent = (info: AnyObject) => {
    const routeUrl = router.resolve({
        path: `/tourism/order/${info.order_type}/detail`,
        query: { order_id: info.order_id }
    })
    window.open(routeUrl.href, '_blank')
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadRecordList()
}
</script>

<style lang="scss" scoped></style>
