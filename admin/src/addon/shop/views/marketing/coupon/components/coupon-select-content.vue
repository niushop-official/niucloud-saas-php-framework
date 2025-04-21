<template>
    <div>
        <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
            <el-form-item :label="t('couponSelectContentTitle')" prop="title" class="form-item-wrap">
                <el-input v-model.trim="tableData.searchParam.title" :placeholder="t('couponSelectContentTitlePlaceholder')" />
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
            <el-table-column prop="title" :label="t('couponSelectContentTitle')" min-width="30%" />
            <el-table-column prop="type_name" :label="t('couponSelectContentType')" min-width="20%" />
            <el-table-column prop="price" :label="t('couponSelectContentPrice')" min-width="20%" >
                <template #default="{ row }">
                    <span >¥{{row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="t('couponSelectContentThreshold')" min-width="15%" >
                <template #default="{ row }">
                    <span v-if="row.min_condition_money == '0.00'">无门槛</span>
                    <span v-else >满{{ row.min_condition_money }}元可用</span>
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
import { getCouponSelectList } from '@/addon/shop/api/marketing'
import { FormInstance, ElMessage } from "element-plus";

const prop = defineProps({
    couponId: {
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
        title: '',
        verify_coupon_ids: []
    }
})

// 已选数据
const selectData: any = reactive({
    id: prop.couponId
})

// 获取优惠券列表
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    if (selectData.id) {
        tableData.searchParam.verify_coupon_ids = [selectData.id]
    }

    getCouponSelectList({
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
            message: `${ t('couponSelectContentTips') }`
        })
        return;
    }
    return {
        name: 'SHOP_GOODS_COUPON',
        title: selectData.title,
        url: `/addon/shop/pages/coupon/detail?coupon_id=${ selectData.id }`,
        action: '',
        couponId: selectData.id
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
