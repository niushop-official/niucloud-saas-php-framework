<template>
    <div>
        <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
            <el-form-item :label="t('goodsName')" prop="goods_name">
                <el-input v-model="tableData.searchParam.goods_name" :placeholder="t('goodsNamePlaceholder')" />
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
            <el-table-column :label="t('goodsInfo')" :show-overflow-tooltip="true" min-width="20%" align="left">
                <template #default="{ row }">
                <div class="flex items-center">
                    <img class="max-w-[60px] w-[60px] max-h-[60px]" :src="img(row.cover_thumb_small)" />
                    <a href="javascript:;" class="flex-1 multi-hidden ml-2" :title="row.goods_name">{{ row.goods_name }}</a>
                </div>
                </template>
            </el-table-column>
            <el-table-column prop="category_name" :label="t('categoryName')" min-width="20%" />
            <el-table-column prop="price" :label="t('price')" min-width="20%" />
            <el-table-column prop="sale_num" :label="t('serviceSelectContentSaleNum')" min-width="20%" />
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
import { getServiceSelectList } from '@/addon/vipcard/api/vipcard'
import { FormInstance, ElMessage } from "element-plus";
import { img} from '@/utils/common'

const prop = defineProps({
    goods_id: {
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
        goods_name: '',
        verify_goods_ids: []
    }
})

// 已选数据
const selectData: any = reactive({
    goods_id: prop.goods_id
})

// 获取优惠券列表
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    if (selectData.goods_id) {
        tableData.searchParam.verify_goods_ids = [selectData.goods_id]
    }

    getServiceSelectList({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then(res => {
        tableData.loading = false
        tableData.data = res.data.data

        tableData.data.forEach((item: any) => {
            item.checked = item.goods_id == selectData.goods_id
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
        selectData.goods_id = row.goods_id
    } else {
        selectData.goods_id = 0 // 未选中，移除当前
    }
    setGoodsSelected()
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        for (let i = 0; i < tableData.data.length; i++) {
            tableData.data[i].checked = false
            if (selectData.goods_id == tableData.data[i].goods_id) {
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
    if (selectData.goods_id == 0) {
        ElMessage({
            type: 'warning',
            message: `${ t('serviceSelectContentTips') }`
        });
        return;
    }

    return {
        name: 'VIPCARD_SERVICE_DETAIL',
        title: selectData.goods_name,
        url: `/addon/vipcard/pages/service/detail?id=${ selectData.goods_id }`,
        action: '',
        goods_id: selectData.goods_id
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
