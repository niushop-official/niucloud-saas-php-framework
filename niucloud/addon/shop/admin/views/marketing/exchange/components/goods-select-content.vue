<template>
    <div>
        <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
            <el-form-item :label="t('pointExchangeSelectContentTitle')" prop="names" class="form-item-wrap">
                <el-input v-model.trim="tableData.searchParam.names" :placeholder="t('pointExchangeSelectContentTitlePlaceholder')" />
            </el-form-item>
            <el-form-item class="form-item-wrap">
                <el-button type="primary" @click="loadList()">{{ t('search') }}</el-button>
                <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData.data" size="large" ref="tableRef" v-loading="tableData.loading">
            <template #empty>
                <span>{{ !tableData.loading ? t('emptyData') : '' }}</span>
            </template>
            <el-table-column min-width="7%">
                <template #default="{ row }">
                    <el-checkbox v-model="row.checked" @change="handleCheckChange($event,row)" />
                </template>
            </el-table-column>
            <el-table-column :label="t('pointExchangeSelectContentGoodsInfo')" min-width="30%" >
                <template #default="{ row }">
                    <div class="flex items-center cursor-pointer">
                        <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                            <el-image v-if="row.goods_cover_thumb_small" class="w-[60px] h-[60px]" :src="img(row.goods_cover_thumb_small)" fit="contain">
                                <template #error>
                                    <div class="image-slot">
                                        <img class="w-[60px] h-[60px]" src="@/addon/shop/assets/goods_default.png" />
                                    </div>
                                </template>
                            </el-image>
                            <img v-else class="w-[70px] h-[60px]" src="@/addon/shop/assets/goods_default.png" fit="contain" />
                        </div>
                        <div class="ml-2">
                            <span :title="row.names" class="multi-hidden">{{ row.names }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="t('pointExchangeSelectContentPrice')" min-width="20%">
                <template #default="{ row }">
                    <p v-if="row.point">{{ row.point }}{{ t('pointExchangeSelectContentPointUnit') }}</p>
                    <p v-if="row.price">{{ row.price }}{{ t('pointExchangeSelectContentPriceUnit') }}</p>
                </template>
            </el-table-column>
            <el-table-column :label="t('pointExchangeSelectContentRedeemedAndSurplus')" min-width="15%" >
                <template #default="{ row }">
                    <span>{{ row.total_exchange_num }}/{{ row.stock }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-[16px] flex justify-end">
            <el-pagination v-model:current-page="tableData.page" v-model:page-size="tableData.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                           @size-change="loadList()" @current-change="loadList" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import { t } from '@/lang'
import { getActiveExchangeSelectPageList } from '@/addon/shop/api/marketing'
import { FormInstance, ElMessage } from "element-plus";
import { img } from "@/utils/common";

const prop = defineProps({
    id: {
        type: [Number, String],
        default: 0
    }
})

const searchFormRef = ref<FormInstance>()
const tableRef = ref();

const tableData: any = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        names: '',
        verify_goods_ids: []
    }
})

// 已选数据
const selectData: any = reactive({
    id: prop.id
})

// 获取积分商品列表
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    if (selectData.id) {
        tableData.searchParam.verify_goods_ids = [selectData.id]
    }

    getActiveExchangeSelectPageList({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then(res => {
        tableData.loading = false
        tableData.data = res.data.data

        tableData.data.forEach((item: any) => {
            item.checked = item.id == selectData.id
        })
        tableData.total = res.data.total
        setGoodsSelected()
    }).catch(() => {
        tableData.loading = false
    })
}

loadList()

const handleCheckChange = (isSelect: any, row: any) => {
    if (isSelect) {
        selectData.id = row.id
    } else {
        selectData.id = 0 // 未选中，移除当前
    }
    setGoodsSelected()
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        for (let i = 0; i < tableData.data.length; i++) {
            tableData.data[i].checked = false
            if (selectData.id == tableData.data[i].id) {
                tableData.data[i].checked = true
                Object.assign(selectData, tableData.data[i])
            }
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadList()
}

const getData = () => {
    if (selectData.id == 0) {
        ElMessage({
            type: 'warning',
            message: `${ t('pointExchangeSelectContentTips') }`
        })
        return;
    }
    return {
        name: 'SHOP_GOODS_POINT_EXCHANGE',
        title: selectData.names,
        url: `/addon/shop/pages/point/detail?id=${ selectData.id }`,
        action: '',
        id: selectData.id
    }
}

defineExpose({
    getData
})
</script>

<style lang="scss" scoped>
.form-item-wrap {
    margin-right: 10px !important;
    margin-bottom: 10px !important;

    &.last-child {
        margin-right: 0 !important;
    }
}
</style>
