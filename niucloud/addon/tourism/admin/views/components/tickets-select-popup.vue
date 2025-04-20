<template>
    <div>
        <div @click="show">
            <slot>
                <el-button>{{ t('ticketsSelectPopupAllTickets') }}</el-button>
                <div class="inline-block ml-[10px] text-[14px]" v-show="goodsIds.length">
                    <span>{{ t('goodsSelectPopupSelect') }}</span>
                    <span class="text-primary mx-[2px]">{{ goodsIds.length }}</span>
                    <span>{{ t('goodsSelectPopupPiece') }}</span>
                </div>
            </slot>
        </div>
        <el-dialog v-model="showDialog" :title="t('ticketsSelectPopupSelectGoodsDialog')" width="1000px" :destroy-on-close="true" :close-on-click-modal="false">

            <el-form :inline="true" :model="tourismScenicTable.searchParam" ref="searchFormRef">
                <el-form-item :label="t('scenicNameSelectPopup')" prop="scenic_name" class="form-item-wrap">
                    <el-input v-model="tourismScenicTable.searchParam.scenic_name" :placeholder="t('scenicNameSelectPopupPlaceholder')" maxlength="60" />
                </el-form-item>
                <el-form-item :label="t('createTime')" prop="create_time" class="form-item-wrap">
                    <el-date-picker v-model="tourismScenicTable.searchParam.create_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                </el-form-item>
                <el-form-item class="form-item-wrap">
                    <el-button type="primary" @click="loadScenicList()">{{ t('search') }}</el-button>
                    <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="tourismScenicTable.data" size="large" v-loading="tourismScenicTable.loading" ref="scenicListTableRef" max-height="400" @select="handleSelectChange" @select-all="handleSelectAllChange">
                <template #empty>
                    <span>{{ !tourismScenicTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column type="selection" width="55" />
                <el-table-column :show-overflow-tooltip="true" :label="t('scenicInfo')" min-width="180" align="left">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                <img class="max-w-[60px] max-h-[60px]" :src="img(row.cover_thumb_small)" />
                            </div>
                            <a href="javascript:;" :title="row.scenic_name" class="multi-hidden ml-2">{{ row.scenic_name }}</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="scenic_star" :label="t('scenicStar')" min-width="100">
                    <template #default="{ row }">
                        {{ star[row.scenic_level] }}
                    </template>
                </el-table-column>
                <el-table-column prop="full_address" :label="t('scenicFullAddress')" min-width="150" />
                <el-table-column prop="status_name" :label="t('scenicStatus')" min-width="100" />
                <el-table-column prop="create_time" :label="t('goodsSelectPopupCreateTime')" min-width="120" />
            </el-table>
            <div class="mt-[16px] flex">
                <div class="flex items-center flex-1">
                    <div class="mr-[10px]" v-show="selectGoodsNum">
                        <span>{{ t('goodsSelectPopupBeforeTip') }}</span>
                        <span class="text-primary mx-[2px]">{{ selectGoodsNum }}</span>
                        <span>{{ t('ticketsSelectPopupAfterTip') }}</span>
                    </div>
                    <el-button type="primary" link @click="clear" v-show="selectGoodsNum">
                        {{ t('goodsSelectPopupClearGoods') }}
                    </el-button>
                </div>
                <el-pagination v-model:current-page="tourismScenicTable.page"
                               v-model:page-size="tourismScenicTable.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="tourismScenicTable.total"
                               @size-change="loadScenicList()" @current-change="loadScenicList" />
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
import { getScenicList } from '@/addon/tourism/api/tourism'

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
    }
})

const star = reactive<any>({
    1: t('oneStar'),
    2: t('twoStar'),
    3: t('threeStar'),
    4: t('fourStar'),
    5: t('fiveStar')
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

const showDialog = ref(false)

// 已选商品列表
const selectScenic: any = reactive({})

// 已选商品数量
const selectGoodsNum: any = computed(() => {
    return Object.keys(selectScenic).length
})

const tourismScenicTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        scenic_name: '',
        create_time: '',
        goods_type: 'scenic'
    }
})

const searchFormRef = ref()

const scenicListTableRef = ref()

// 监听表格复选框
const handleSelectChange = (selection: any, row: any) => {
    // 是否选中
    let isSelected = false
    for (let i = 0; i < selection.length; i++) {
        if (selection[i].scenic_id == row.scenic_id) {
            isSelected = true
            break
        }
    }
    if (isSelected) {
        selectScenic['scenic_' + row.scenic_id] = row
    } else {
        // 未选中，删除当前商品
        delete selectScenic['scenic_' + row.scenic_id]
    }
}

// 监听表格全选
const handleSelectAllChange = (selection: any) => {
    if (selection.length) {
        selection.forEach((item: any) => {
            selectScenic['scenic_' + item.scenic_id] = item
        })
    } else {
        // 未选中，删除当前页面的数据
        tourismScenicTable.data.forEach((item: any) => {
            delete selectScenic['scenic_' + item.scenic_id]
        })
    }
}

/**
 * 获取商品列表
 */
const loadScenicList = (page: number = 1, callback: any = null) => {
    tourismScenicTable.loading = true
    tourismScenicTable.page = page
    const searchData = cloneDeep(tourismScenicTable.searchParam)
    getScenicList({
        page: tourismScenicTable.page,
        limit: tourismScenicTable.limit,
        ...searchData
    }).then(res => {
        tourismScenicTable.loading = false
        tourismScenicTable.data = res.data.data
        tourismScenicTable.total = res.data.total
        if (callback) callback()
        setGoodsSelected()
    }).catch(() => {
        tourismScenicTable.loading = false
    })
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        if (!scenicListTableRef.value) return
        for (let i = 0; i < tourismScenicTable.data.length; i++) {
            scenicListTableRef.value.toggleRowSelection(tourismScenicTable.data[i], false)
            if (selectScenic['scenic_' + tourismScenicTable.data[i].scenic_id]) {
                scenicListTableRef.value.toggleRowSelection(tourismScenicTable.data[i], true)
            }
        }
    })
}

// 重置搜索数据
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadScenicList()
}

const show = () => {
    // 检测商品id集合是否存在，移除不存在的商品id，纠正数据准确性
    loadScenicList(1, () => {
        // 第一次打开弹出框时，纠正数据，并且赋值已选商品
        if (goodsIds.value) {
            // 赋值已选择的商品
            const obj = []
            for (let i = 0; i < tourismScenicTable.data.length; i++) {
                if (goodsIds.value.indexOf(tourismScenicTable.data[i].scenic_id) != -1) {
                    obj.push(tourismScenicTable.data[i].scenic_id)
                    selectScenic['scenic_' + tourismScenicTable.data[i].scenic_id] = tourismScenicTable.data[i]
                }
            }
            goodsIds.value = obj
        }
    })
    showDialog.value = true
}

// 清空已选商品
const clear = () => {
    for (const k in selectScenic) {
        delete selectScenic[k]
    }
    setGoodsSelected()
}

const save = () => {
    if (prop.min && selectGoodsNum.value < prop.min) {
        ElMessage({
            type: 'warning',
            message: `${ t('ticketsSelectPopupGoodsMinTip') }${ prop.min }${ t('goodsSelectPopupPiece') }`
        })
        return
    }

    if (prop.max && prop.max > 0 && selectGoodsNum.value && selectGoodsNum.value > prop.max) {
        ElMessage({
            type: 'warning',
            message: `${ t('ticketsSelectPopupGoodsMaxTip') }${ prop.max }${ t('goodsSelectPopupPiece') }`
        })
        return
    }

    const ids: any = []
    for (const k in selectScenic) {
        ids.push(parseInt(k.replace('scenic_', '')))
    }
    goodsIds.value.splice(0, goodsIds.value.length, ...ids)

    showDialog.value = false
}

defineExpose({
    showDialog,
    selectScenic,
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
