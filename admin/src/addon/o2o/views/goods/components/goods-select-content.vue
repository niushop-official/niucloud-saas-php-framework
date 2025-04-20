<template>
    <div>
        <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
            <el-form-item :label="t('o2oSelectPopupCardName')" prop="goods_name" class="form-item-wrap">
                <el-input v-model.trim="tableData.searchParam.goods_name" :placeholder="t('o2oSelectPopupCardNamePlaceholder')" maxlength="20" />
            </el-form-item>
            <el-form-item :label="t('o2oSelectPopupCardCategory')" prop="goods_category" class="form-item-wrap">
                <el-cascader class="input-width" v-model="tableData.searchParam.goods_category" :options="categoryList" clearable  :props="{ value: 'value', label: 'label', emitPath:false }" />
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

            <el-table-column :label="t('o2oSelectPopupCardInfo')" :show-overflow-tooltip="true" min-width="30%" align="left">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <div class="w-[60px] max-h-[60px]">
                            <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                <el-image v-if="row.goods_cover" class="w-[60px] h-[60px]" :src="img(row.goods_cover)" fit="contain">
                                    <template #error>
                                        <div class="image-slot">
                                            <img class="w-[60px] h-[60px]" src="@/addon/o2o/assets/goods_default.png" />
                                        </div>
                                    </template>
                                </el-image>
                                <img v-else class="w-[60px] h-[60px]" src="@/addon/o2o/assets/goods_default.png" fit="contain" />
                            </div>
                        </div>
                        <div class="ml-2">
                            <div>
                                <a href="javascript:;" class="flex-1 multi-hidden" :title="row.goods_name">{{ row.goods_name }}</a>
                            </div>
                            <div>
                                <el-tag>{{ row.buy_type_name }}</el-tag>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="card_price" :label="t('o2oSelectPopupCardPrice')" min-width="20%" >
                <template #default="{ row }">
                    <div>￥{{ row.price }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="sale_num" :label="t('o2oSelectPopupCardSaleNum')" min-width="20%" :show-overflow-tooltip="true"/>
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
import { getGoodsSelectPageList } from '@/addon/o2o/api/goods'
import { getCategoryTree } from '@/addon/o2o/api/category'
import { FormInstance, ElMessage } from "element-plus";
import { img } from "@/utils/common";

const prop = defineProps({
    skuId: {
        type: [Number, String],
        default: 0
    }
})

const searchFormRef = ref<FormInstance>()
const tableRef = ref()

const tableData: any = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        goods_name: '',
        goods_category: '',
        verify_goods_ids: ''
    }
})
// 已选数据
const selectData: any = reactive({
    skuId: prop.skuId
})

// 获取列表
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    if (selectData.skuId) {
        tableData.searchParam.verify_goods_ids = [selectData.skuId]
    }

    getGoodsSelectPageList({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then(res => {
        tableData.loading = false
        tableData.data = res.data.data

        tableData.data.forEach((item: any) => {
            item.checked = item.goodsSku.sku_id == selectData.skuId
        })
        tableData.total = res.data.total
        setGoodsSelected()
    }).catch(() => {
        tableData.loading = false
    })
}

// 项目分类
const categoryList = reactive([])
// 初始化数据
const initData = () => {
    // 查询商品分类树结构
    getCategoryTree().then((res) => {
        const data = res.data
        if (data) {
            const goodsCategoryTree: any = []
            data.forEach((item: any) => {
                const children: any = []
                if (item.children) {
                    item.children.forEach((childItem: any) => {
                        children.push({
                            value: childItem.category_id,
                            label: childItem.category_name
                        })
                    })
                }
                goodsCategoryTree.push({
                    value: item.category_id,
                    label: item.category_name,
                    children
                })
            })
            categoryList.splice(0, categoryList.length, ...goodsCategoryTree)
        }
    })
    loadList()
}

initData()

const handleCheckChange = (isSelect: any, row: any) => {
    if (isSelect) {
        selectData.skuId = row.goodsSku.sku_id
    } else {
        selectData.skuId = 0 // 未选中，移除当前
    }
    setGoodsSelected()
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        for (let i = 0; i < tableData.data.length; i++) {
            tableData.data[i].checked = false
            if (selectData.skuId == tableData.data[i].goodsSku.sku_id) {
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
    if (selectData.skuId == 0) {
        ElMessage({
            type: 'warning',
            message: `${ t('o2oSelectContentTips') }`
        })
        return;
    }
    return {
        name: 'O2O_GOODS_DETAIL',
        title: selectData.goods_name,
        url: `/addon/o2o/pages/goods/detail?sku_id=${ selectData.skuId }`,
        action: '',
        skuId: selectData.skuId
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
