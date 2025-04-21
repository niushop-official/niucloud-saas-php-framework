<template>
    <div>
        <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
            <el-form-item :label="t('wayNameSelectPopup')" prop="way_name" class="form-item-wrap">
                <el-input v-model.trim="tableData.searchParam.way_name" :placeholder="t('wayNameSelectPopupPlaceholder')" />
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
            <el-table-column :label="t('wayInfo')" min-width="20%" align="left" show-overflow-tooltip>
                <template #default="{ row }">
                    <div class="flex items-center cursor-pointer">
                        <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                            <img class="max-w-[60px] max-h-[60px]" :src="img(row.goods.cover_thumb_small)" />
                        </div>
                        <a href="javascript:;" :title="row.way_name" class="multi-hidden ml-2">{{ row.way_name }}</a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="t('wayCity')" min-width="20%" align="left">
                <template #default="{ row }">
                    <div><span>{{ t('startCity') }}：{{ row.start_city }}</span></div>
                    <div><span>{{ t('endCity') }}：{{ row.end_city }}</span></div>
                </template>
            </el-table-column>
            <el-table-column :label="t('price')" min-width="10%" align="left">
                <template #default="{ row }">
                    {{ row.goods.price }}
                </template>
            </el-table-column>
            <el-table-column :label="t('stock')" min-width="10%" align="left">
                <template #default="{ row }">
                    {{ row.goods.stock }}
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
import { getWaySelectList } from '@/addon/tourism/api/tourism'
import { FormInstance, ElMessage } from "element-plus";
import { img } from '@/utils/common'

const prop = defineProps({
    way_id: {
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
        way_name: '',
        verify_way_ids: []
    }
})

// 已选数据
const selectData: any = reactive({
    way_id: prop.way_id
})

// 获取优惠券列表
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    if (selectData.way_id) {
        tableData.searchParam.verify_way_ids = [selectData.way_id]
    }

    getWaySelectList({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then(res => {
        tableData.loading = false
        tableData.data = res.data.data

        tableData.data.forEach((item: any) => {
            item.checked = item.way_id == selectData.way_id
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
        selectData.way_id = row.way_id
    } else {
        selectData.way_id = 0 // 未选中，移除当前
    }
    setGoodsSelected()
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        for (let i = 0; i < tableData.data.length; i++) {
            tableData.data[i].checked = false
            if (selectData.way_id == tableData.data[i].way_id) {
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
    if (selectData.way_id == 0) {
        ElMessage({
            type: 'warning',
            message: `${ t('waySelectContentTips') }`
        });
        return;
    }

    return {
        name: 'TOURISM_WAY_DETAIL',
        title: selectData.way_name,
        url: `/addon/tourism/pages/way/detail?way_id=${ selectData.way_id }`,
        action: '',
        way_id: selectData.way_id
    };
};

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
