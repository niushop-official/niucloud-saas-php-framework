<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="memberRecordTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('orderNo')">
                        <el-input v-model="memberRecordTable.searchParam.order_no" :placeholder="t('orderNoPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')">
                        <el-date-picker v-model="memberRecordTable.searchParam.create_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item :label="t('status')">
                        <el-select v-model="memberRecordTable.searchParam.status" collapse-tags clearable :placeholder="t('statusPlaceholder')" class="input-width">
                            <el-option :label="item['name']" :value="item['status']" v-for="(item,index) in statusData" :key="index" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('cardType')">
                        <el-select v-model="memberRecordTable.searchParam.card_type" collapse-tags clearable :placeholder="t('cardTypePlaceholder')" class="input-width">
                            <el-option :label="item['name']" :value="item['type']" v-for="(item,index) in cardType" :key="index" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadMemberRecordList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="memberRecordTable.data" size="large" v-loading="memberRecordTable.loading">
                    <template #empty>
                        <span>{{ !memberRecordTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :label="t('orderNo')" min-width="200" align="left">
                        <template #default="{ row }">
                            {{ row.order.order_no }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('cardInfo')" min-width="240" align="left">
                        <template #default="{ row }">
                            <div class="flex">
                                <img class="w-[50px] h-[50px] min-w-[50px]" :src="img(row.goods.cover_thumb_small)" />
                                <div class="flex flex-col ml-2">
                                    <span>{{ row.goods.goods_name }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('memberInfo')" min-width="200" align="left">
                        <template #default="{ row }">
                            <div class="flex">
                                <img class="w-[50px] h-[50px] min-w-[50px]" :src="img(row.member.headimg)" />
                                <div class="flex flex-col ml-2">
                                    <span>{{ row.member.nickname }}</span>
                                    <span>{{ row.member.mobile }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="card_type_name" :label="t('cardType')" min-width="120" />
                    <el-table-column :label="t('useNum')" min-width="100" align="left">
                        <template #default="{ row }">
                            <span v-if="row.card_type != timecard">{{ row.total_use_num }} / {{ row.total_num }}</span>
                            <span v-else>{{ row.total_use_num }} / {{ t('timecard') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_name" :label="t('status')" min-width="150" />
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="150" />
                    <!-- <el-table-column prop="status_name" :label="t('status')" min-width="150" /> -->
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="100">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="detailEvent(row)">{{ t('detail') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="memberRecordTable.page"
                                   v-model:page-size="memberRecordTable.limit"
                                   layout="total, sizes, prev, pager, next, jumper" :total="memberRecordTable.total"
                                   @size-change="loadMemberRecordList()" @current-change="loadMemberRecordList" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getCardMemberRecord, getRecordStatus, getCardType } from '@/addon/vipcard/api/vipcard'
import { img ,setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'

const route = useRoute()
const id: number = parseInt(route.query.id)
const pageName = route.meta.title

// 获取状态
const statusData = ref([])
const cardType = ref([])
const set = async() => {
    statusData.value = await (await getRecordStatus()).data
    cardType.value = await (await getCardType()).data
}
set()

const memberRecordTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        create_time: '',
        card_no: '',
        status: '',
        card_type: ''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取列表
 */
const loadMemberRecordList = (page: number = 1) => {
    memberRecordTable.loading = true
    memberRecordTable.page = page

    getCardMemberRecord({
        page: memberRecordTable.page,
        limit: memberRecordTable.limit,
        goods_id: id,
        ...memberRecordTable.searchParam
    }).then(res => {
        memberRecordTable.loading = false
        memberRecordTable.data = res.data.data
        memberRecordTable.total = res.data.total
        setTablePageStorage(memberRecordTable.page, memberRecordTable.limit, memberRecordTable.searchParam);
    }).catch(() => {
        memberRecordTable.loading = false
    })
}
loadMemberRecordList(getTablePageStorage(memberRecordTable.searchParam).page)

const router = useRouter()
/**
 * 查看详情
 * @param data
 */
const detailEvent = (data: any) => {
    router.push('/vipcard/goods/card/record_info?id=' + data.card_id)
}

</script>

<style lang="scss" scoped></style>
