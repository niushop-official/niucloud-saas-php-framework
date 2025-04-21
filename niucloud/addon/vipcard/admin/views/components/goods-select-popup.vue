<template>
    <div>
        <div @click="show">
            <slot>
                <el-button>{{ t('goodsSelectPopupSelectGoodsButton') }}</el-button>
                <div class="inline-block ml-[10px] text-[14px]" v-show="goodsIdsArr.length">
                    <span>{{ t('goodsSelectPopupSelect') }}</span>
                    <span class="text-primary mx-[2px]">{{ goodsIdsArr.length }}</span>
                    <span>{{ t('goodsSelectPopupPiece') }}</span>
                </div>
            </slot>
        </div>
        <el-dialog v-model="showDialog" :title="t('goodsSelectPopupSelectGoodsDialog')" width="1000px" :destroy-on-close="true" :close-on-click-modal="false">
            <el-form :inline="true" :model="goodsTable.searchParam" ref="searchFormRef">
                <el-form-item :label="t('goodsSelectPopupGoodsName')" prop="keyword" class="form-item-wrap">
                    <el-input v-model="goodsTable.searchParam.keyword" :placeholder="t('goodsSelectPopupGoodsNamePlaceholder')" maxlength="60" />
                </el-form-item>
                <el-form-item class="form-item-wrap">
                    <el-button type="primary" @click="loadGoodsList()">{{ t('search') }}</el-button>
                    <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="goodsTable.data" size="large" v-loading="goodsTable.loading" ref="goodsListTableRef" max-height="400" @select="handleSelectChange" @select-all="handleSelectAllChange">
                <template #empty>
                    <span>{{ !goodsTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column type="selection" width="55" />
                <el-table-column prop="goods_id" :label="t('goodsSelectPopupGoodsInfo')" min-width="350">
                    <template #default="{ row }">
                        <div class="flex items-center cursor-pointer">
                            <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                <el-image v-if="row.cover_thumb_small" class="w-[60px] h-[60px]" :src="img(row.cover_thumb_small)" fit="contain">
                                    <template #error>
                                        <div class="image-slot">
                                            <img class="w-[60px] h-[60px]" src="@/addon/vipcard/assets/images/goods_default.png" />
                                        </div>
                                    </template>
                                </el-image>
                                <img v-else class="w-[70px] h-[60px]" src="@/addon/vipcard/assets/images/goods_default.png" fit="contain" />
                            </div>
                            <div class="ml-2">
                                <span :title="row.goods_name" class="multi-hidden">{{ row.goods_name }}</span>
                                <span class="text-primary text-[12px]">{{ row.goods_type_name }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="price" :label="t('goodsSelectPopupPrice')" min-width="120">
                    <template #default="{ row }">
                        <div>￥{{ row.price }}</div>
                    </template>
                </el-table-column>

                <el-table-column prop="stock" :label="t('goodsSelectPopupStock')" min-width="120" align="right" />
            </el-table>
            <div class="mt-[16px] flex">
                <div class="flex items-center flex-1">
                    <div class="mr-[10px]" v-show="selectGoodsNum">
                        <span>{{ t('goodsSelectPopupBeforeTip') }}</span>
                        <span class="text-primary mx-[2px]">{{ selectGoodsNum }}</span>
                        <span>{{ t('goodsSelectPopupAfterTip') }}</span>
                    </div>
                    <el-button type="primary" link @click="clear" v-show="selectGoodsNum">
                        {{ t('goodsSelectPopupClearGoods') }}
                    </el-button>
                </div>
                <el-pagination v-model:current-page="goodsTable.page" v-model:page-size="goodsTable.limit" layout="total, sizes, prev, pager, next, jumper" :total="goodsTable.total" @size-change="loadGoodsList()" @current-change="loadGoodsList" />
            </div>

            <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
          <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
        </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive, computed, nextTick } from 'vue'
import { cloneDeep } from 'lodash-es'
import { img } from '@/utils/common'
import { ElMessage } from 'element-plus'
import { getGoodsOfSelect } from '@/addon/vipcard/api/vipcard'

const prop = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    max: {
        type: Number,
        default: 0
    },
    min: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: 'service'
    }
})

const emit = defineEmits(['update:modelValue'])

const goodsIds: any = computed({
    get() {
        return prop.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const goodsIdsArr: any = computed(() => {
    return goodsIds.value ? goodsIds.value.split(',') : []
})

const showDialog = ref(false)

// 已选商品列表
const selectGoods: any = reactive({})

// 已选商品数量
const selectGoodsNum: any = computed(() => {
    return Object.keys(selectGoods).length
})

const goodsTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        goods_type: '',
        goods_name: ''
    }
})

goodsTable.searchParam.goods_type = prop.type

const searchFormRef = ref()

const goodsListTableRef = ref()

// 监听表格复选框
const handleSelectChange = (selection: any, row: any) => {
    // 是否选中
    let isSelected = false
    for (let i = 0; i < selection.length; i++) {
        if (selection[i].goods_id == row.goods_id) {
            isSelected = true
            break
        }
    }
    if (isSelected) {
        selectGoods['goods_' + row.goods_id] = row
    } else {
        // 未选中，删除当前商品
        delete selectGoods['goods_' + row.goods_id]
    }
}

// 监听表格全选
const handleSelectAllChange = (selection: any) => {
    if (selection.length) {
        selection.forEach((item: any) => {
            selectGoods['goods_' + item.goods_id] = item
        })
    } else {
        // 未选中，删除当前页面的数据
        goodsTable.data.forEach((item: any) => {
            delete selectGoods['goods_' + item.goods_id]
        })
    }
}

/**
 * 获取商品列表
 */
const loadGoodsList = (page: number = 1, callback: any = null) => {
    goodsTable.loading = true
    goodsTable.page = page

    const searchData = cloneDeep(goodsTable.searchParam)
    getGoodsOfSelect({
        page: goodsTable.page,
        limit: goodsTable.limit,
        ...searchData
    })
    .then((res) => {
        goodsTable.loading = false
        goodsTable.data = res.data.data
        goodsTable.total = res.data.total

        setGoodsSelected()
        // 调用回调函数
        if (callback) {
            callback(goodsIds.value)
        }
    })
    .catch(() => {
        goodsTable.loading = false
    })
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        if (!goodsListTableRef.value) return
        for (let i = 0; i < goodsTable.data.length; i++) {
            goodsListTableRef.value.toggleRowSelection(goodsTable.data[i], false)
            if (selectGoods['goods_' + goodsTable.data[i].goods_id]) {
                goodsListTableRef.value.toggleRowSelection(goodsTable.data[i], true)
            }
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()

    loadGoodsList()
}

const show = () => {
    loadGoodsList(1, (verify_goods_ids: any) => {
        // 第一次打开弹出框时，纠正数据，并且赋值已选商品
        if (goodsIds.value) {
            let obj = []
            // 赋值已选择的商品
            for (let i = 0; i < goodsTable.data.length; i++) {
                if (goodsIds.value.indexOf(goodsTable.data[i].goods_id) != -1) {
                    obj.push(goodsTable.data[i].goods_id)
                    selectGoods['goods_' + goodsTable.data[i].goods_id] = goodsTable.data[i] || {}
                }
            }

            // 检测商品id集合是否存在，移除不存在的商品id，纠正数据准确性
            goodsIds.value = obj.join(',')
        }
    })
    showDialog.value = true
}

// 清空已选商品
const clear = () => {
    for (let k in selectGoods) {
        delete selectGoods[k]
    }
    setGoodsSelected()
}

const save = () => {
    if (prop.min && selectGoodsNum.value < prop.min) {
        ElMessage({
            type: 'warning',
            message: `${ t('goodsSelectPopupGoodsMinTip') }${ prop.min }${ t('goodsSelectPopupPiece') }`
        })
        return
    }

    if (prop.max && prop.max > 0 && selectGoodsNum.value && selectGoodsNum.value > prop.max) {
        ElMessage({
            type: 'warning',
            message: `${ t('goodsSelectPopupGoodsMaxTip') }${ prop.max }${ t('goodsSelectPopupPiece') }`
        })
        return
    }

    let ids: any = []
    for (let k in selectGoods) {
        ids.push(parseInt(k.replace('goods_', '')))
    }

    goodsIds.value = ids.join(',')
    showDialog.value = false
}

defineExpose({
    showDialog,
    selectGoods,
    selectGoodsNum
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
