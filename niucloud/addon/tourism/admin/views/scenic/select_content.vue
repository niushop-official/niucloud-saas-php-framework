<template>
    <div>
        <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
            <el-form-item :label="t('scenicNameSelectPopup')" prop="scenic_name">
                <el-input v-model.trim="tableData.searchParam.scenic_name" :placeholder="t('scenicNameSelectPopupPlaceholder')" />
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
            <el-table-column :show-overflow-tooltip="true" :label="t('scenicInfo')" min-width="30%" align="left">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                            <img class="max-w-[60px] max-h-[60px]" :src="img(row.cover_thumb_small)" />
                        </div>
                        <a href="javascript:;" :title="row.scenic_name" class="multi-hidden ml-2">{{ row.scenic_name }}</a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="scenic_level" :label="t('scenicStar')" min-width="20%">
                <template #default="{ row }">
                    {{ star[row.scenic_level] }}
                </template>
            </el-table-column>
            <el-table-column prop="full_address" :label="t('fullAddress')" min-width="20%" />
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
import { getScenicSelectList } from '@/addon/tourism/api/tourism'
import { FormInstance, ElMessage } from "element-plus";
import { img } from '@/utils/common'

const prop = defineProps({
    scenic_id: {
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
        scenic_name: '',
        verify_scenic_ids: []
    }
})

const star = reactive<any>({
    1: t('oneStar'),
    2: t('twoStar'),
    3: t('threeStar'),
    4: t('fourStar'),
    5: t('fiveStar')
})

// 已选数据
const selectData: any = reactive({
    scenic_id: prop.scenic_id
})

// 获取列表
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    if (selectData.scenic_id) {
        tableData.searchParam.verify_scenic_ids = [selectData.scenic_id]
    }

    getScenicSelectList({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then(res => {
        tableData.loading = false
        tableData.data = res.data.data

        tableData.data.forEach((item: any) => {
            item.checked = item.scenic_id == selectData.scenic_id
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
        selectData.scenic_id = row.scenic_id
    } else {
        selectData.scenic_id = 0 // 未选中，移除当前
    }
    setGoodsSelected()
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        for (let i = 0; i < tableData.data.length; i++) {
            tableData.data[i].checked = false
            if (selectData.scenic_id == tableData.data[i].scenic_id) {
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
    if (selectData.scenic_id == 0) {
        ElMessage({
            type: 'warning',
            message: `${ t('scenicSelectContentTips') }`
        });
        return;
    }

    return {
        name: 'TOURISM_SCENIC_DETAIL',
        title: selectData.scenic_name,
        url: `/addon/tourism/pages/scenic/detail?scenic_id=${ selectData.scenic_id }`,
        action: '',
        scenic_id: selectData.scenic_id
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
