<template>
    <div>
        <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
            <el-form-item :label="t('giftcardSelectPopupCardName')" prop="card_name" class="form-item-wrap">
                <el-input v-model.trim="tableData.searchParam.card_name" :placeholder="t('giftcardSelectPopupCardNamePlaceholder')" maxlength="20" />
            </el-form-item>
            <el-form-item :label="t('giftcardSelectPopupCardCategory')" prop="category_id" class="form-item-wrap">
                <el-select v-model="tableData.searchParam.category_id" :placeholder="t('giftcardSelectPopupCardCategoryPlaceholder')" clearable>
                    <el-option v-for="item in categoryOptions" :key="item.category_id" :label="item.category_name" :value="item.category_id" />
                </el-select>
            </el-form-item>
            <el-form-item :label="t('cardRightType')" prop="card_right_type" class="form-item-wrap">
                <el-select v-model.trim="tableData.searchParam.card_right_type" :placeholder="t('cardRightTypePlaceholder')" clearable>
                    <el-option v-for="item in cardRightTypeOptions" :key="item.type" :label="item.name" :value="item.type" />
                </el-select>
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

            <el-table-column :label="t('giftcardSelectPopupCardInfo')" min-width="30%">
                <template #default="{ row }">
                    <div class="flex items-center cursor-pointer">
                        <div class="min-w-[80px] h-[50px] flex items-center justify-center">
                            <el-image class="w-[80px] h-[50px]" :src="img(row.cover.split(',')[0])" fit="contain">
                                <template #error>
                                    <div class="image-slot">
                                        <img class="w-[80px] h-[50px]" src="@/addon/shop/assets/goods_default.png" />
                                    </div>
                                </template>
                            </el-image>
                        </div>
                        <div class="ml-2">
                            <span :title="row.card_name" class="multi-hidden">{{ row.card_name }}</span>
                            <span class="text-primary text-[12px]">{{ row.card_right_type_name }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="card_price" :label="t('giftcardSelectPopupCardPrice')" min-width="20%" >
                <template #default="{ row }">
                    <div>￥{{ row.card_price }}</div>
                </template>
            </el-table-column>

            <el-table-column prop="category_id" :label="t('giftcardSelectPopupCardCategory')" min-width="20%" :show-overflow-tooltip="true">
                <template #default="{ row }">
                    <div>{{ row.category ? row.category.category_name : '' }}</div>
                </template>
            </el-table-column>

<!--            <el-table-column prop="validity_type" :label="t('validityType')" min-width="20%" :show-overflow-tooltip="true">-->
<!--                <template #default="{ row }">-->
<!--                    <div v-if="row.validity_type == 'forever'">{{ t('validityForever') }}</div>-->
<!--                    <div v-if="row.validity_type == 'day'">购买后{{ row.validity_day }}天有效</div>-->
<!--                    <div v-if="row.validity_type == 'date'">使用截止时间为：{{ row.validity_time || ''}}</div>-->
<!--                </template>-->
<!--            </el-table-column>-->
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
import { getGiftcardSelectPageList,getGiftcardCardRightType } from '@/addon/shop_giftcard/api/giftcard'
import { getCategoryList } from '@/addon/shop_giftcard/api/category'
import { FormInstance, ElMessage } from "element-plus";
import { img } from "@/utils/common";

const prop = defineProps({
    giftcardId: {
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
        card_name: '',
        category_id: '',
        card_right_type: '',
        verify_giftcard_ids: '',
    }
})

// 已选数据
const selectData: any = reactive({
    giftcardId: prop.giftcardId
})

// 获取积分商品列表
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    if (selectData.giftcardId) {
        tableData.searchParam.verify_giftcard_ids = [selectData.giftcardId]
    }

    getGiftcardSelectPageList({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then(res => {
        tableData.loading = false
        tableData.data = res.data.data

        tableData.data.forEach((item: any) => {
            item.checked = item.giftcard_id == selectData.giftcardId
        })
        tableData.total = res.data.total
        setGoodsSelected()
    }).catch(() => {
        tableData.loading = false
    })
}

// 礼品卡分类
const categoryOptions: any = reactive([])

// 礼品卡权益类型
const cardRightTypeOptions: any = reactive({})

// 初始化数据
const initData = () => {
    // 查询礼品卡分类树结构
    getCategoryList({}).then(res => {
        const data = res.data
        if (data) {
            categoryOptions.splice(0, categoryOptions.length, ...data)
        }
    })
    getGiftcardCardRightType({}).then((res: any) => {
        const data = res.data
        if (data) {
            Object.assign(cardRightTypeOptions, data);
        }
    })
    loadList()
}

initData()

const handleCheckChange = (isSelect: any, row: any) => {
    if (isSelect) {
        selectData.giftcardId = row.giftcard_id
    } else {
        selectData.giftcardId = 0 // 未选中，移除当前
    }
    setGoodsSelected()
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        for (let i = 0; i < tableData.data.length; i++) {
            tableData.data[i].checked = false
            if (selectData.giftcardId == tableData.data[i].giftcard_id) {
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
    if (selectData.giftcardId == 0) {
        ElMessage({
            type: 'warning',
            message: `${ t('giftcardSelectContentTips') }`
        })
        return;
    }
    return {
        name: 'SHOP_GIFTCARD_DETAIL',
        title: selectData.card_name,
        url: `/addon/shop_giftcard/pages/detail?giftcard_id=${ selectData.giftcardId }`,
        action: '',
        giftcardId: selectData.giftcardId
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
