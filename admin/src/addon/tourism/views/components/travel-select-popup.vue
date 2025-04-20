<template>
    <div>
        <div @click="show">
            <slot>
                <el-button>{{ t('travelSelectPopupAllTravel') }}</el-button>
                <div class="inline-block ml-[10px] text-[14px]" v-show="goodsIds.length">
                    <span>{{ t('goodsSelectPopupSelect') }}</span>
                    <span class="text-primary mx-[2px]">{{ goodsIds.length }}</span>
                    <span>{{ t('goodsSelectPopupPiece') }}</span>
                </div>
            </slot>
        </div>
        <el-dialog v-model="showDialog" :title="t('travelSelectPopupSelectGoodsDialog')" width="1000px" :destroy-on-close="true" :close-on-click-modal="false">

            <el-form :inline="true" :model="tourismWayTable.searchParam" ref="searchFormRef">
                <el-form-item :label="t('wayNameSelectPopup')" prop="way_name" class="form-item-wrap">
                    <el-input v-model="tourismWayTable.searchParam.way_name"
                        :placeholder="t('wayNameSelectPopupPlaceholder')" maxlength="60" />
                </el-form-item>
                <el-form-item :label="t('createTime')" prop="create_time" class="form-item-wrap">
                    <el-date-picker v-model="tourismWayTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                </el-form-item>
                <el-form-item class="form-item-wrap">
                    <el-button type="primary" @click="loadTravelList()">{{ t('search') }}</el-button>
                    <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="tourismWayTable.data" size="large" v-loading="tourismWayTable.loading" ref="travelListTableRef"
                max-height="400" @select="handleSelectChange" @select-all="handleSelectAllChange">
                <template #empty>
                    <span>{{ !tourismWayTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column type="selection" width="55" />
                <el-table-column :label="t('wayInfo')" min-width="240" align="left" show-overflow-tooltip>
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer">
                                <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                    <img class="max-w-[60px] max-h-[60px]" :src="img(row.goods.cover_thumb_small)" />
                                </div>
                                <a href="javascript:;" :title="row.way_name" class="multi-hidden ml-2">{{ row.way_name }}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('wayCity')" min-width="200" align="left">
                        <template #default="{ row }">
                            <div><span>{{ t('startCity') }}：{{ row.start_city }}</span></div>
                            <div><span>{{ t('endCity') }}：{{ row.end_city }}</span></div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('linePrice')" min-width="120" align="left">
                        <template #default="{ row }">
                            {{ row.goods.price }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('stock')" min-width="120" align="left">
                        <template #default="{ row }">
                            {{ row.goods.stock }}
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_name" :label="t('wayStatus')" min-width="120" />

            </el-table>
            <div class="mt-[16px] flex">
                <div class="flex items-center flex-1">
                    <div class="mr-[10px]" v-show="selectGoodsNum">
                        <span>{{ t('goodsSelectPopupBeforeTip') }}</span>
                        <span class="text-primary mx-[2px]">{{ selectGoodsNum }}</span>
                        <span>{{ t('travelSelectPopupAfterTip') }}</span>
                    </div>
                    <el-button type="primary" link @click="clear" v-show="selectGoodsNum">{{ t('goodsSelectPopupClearGoods') }}</el-button>
                </div>
                <el-pagination v-model:current-page="tourismWayTable.page" v-model:page-size="tourismWayTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="tourismWayTable.total"
                    @size-change="loadTravelList()" @current-change="loadTravelList" />
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
import { getWayList } from '@/addon/tourism/api/tourism'

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

const emit = defineEmits(['update:modelValue'])

const goodsIds: any = computed({
    get () {
        return prop.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const showDialog = ref(false)

// 已选商品列表
const selectTravel: any = reactive({})

// 已选商品数量
const selectGoodsNum: any = computed(() => {
    return Object.keys(selectTravel).length
})

const tourismWayTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        way_name: '',
        create_time: '',
        goods_type: 'way'
    }
})

const searchFormRef = ref()

const travelListTableRef = ref()

// 监听表格复选框
const handleSelectChange = (selection: any, row: any) => {
    // 是否选中
    let isSelected = false
    for (let i = 0; i < selection.length; i++) {
        if (selection[i].way_id == row.way_id) {
            isSelected = true
            break
        }
    }
    if (isSelected) {
        selectTravel['way_' + row.way_id] = row
    } else {
        // 未选中，删除当前商品
        delete selectTravel['way_' + row.way_id]
    }
}

// 监听表格全选
const handleSelectAllChange = (selection: any) => {
    if (selection.length) {
        selection.forEach((item: any) => {
            selectTravel['way_' + item.way_id] = item
        })
    } else {
        // 未选中，删除当前页面的数据
        tourismWayTable.data.forEach((item: any) => {
            delete selectTravel['way_' + item.way_id]
        })
    }
}

/**
 * 获取商品列表
 */
const loadTravelList = (page: number = 1, callback: any = null) => {
    tourismWayTable.loading = true
    tourismWayTable.page = page
    const searchData = cloneDeep(tourismWayTable.searchParam)

    getWayList({
        page: tourismWayTable.page,
        limit: tourismWayTable.limit,
        ...searchData
    }).then(res => {
        tourismWayTable.loading = false
        tourismWayTable.data = res.data.data
        tourismWayTable.total = res.data.total
        if (callback) callback()
        setGoodsSelected()
    }).catch(() => {
        tourismWayTable.loading = false
    })
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        if (!travelListTableRef.value) return
        for (let i = 0; i < tourismWayTable.data.length; i++) {
            travelListTableRef.value.toggleRowSelection(tourismWayTable.data[i], false)
            if (selectTravel['way_' + tourismWayTable.data[i].way_id]) {
                travelListTableRef.value.toggleRowSelection(tourismWayTable.data[i], true)
            }
        }
    })
}

// 重置搜索数据
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadTravelList()
}

const show = () => {
    // 检测商品id集合是否存在，移除不存在的商品id，纠正数据准确性
    loadTravelList(1, () => {
        // 第一次打开弹出框时，纠正数据，并且赋值已选商品
        if (goodsIds.value) {
            // 赋值已选择的商品
            const obj = []
            for (let i = 0; i < tourismWayTable.data.length; i++) {
                if (goodsIds.value.indexOf(tourismWayTable.data[i].way_id) != -1) {
                    obj.push(tourismWayTable.data[i].way_id)
                    selectTravel['way_' + tourismWayTable.data[i].way_id] = tourismWayTable.data[i] || {}
                }
            }
            goodsIds.value = obj
        }
    })
    showDialog.value = true
}

// 清空已选商品
const clear = () => {
    for (const k in selectTravel) {
        delete selectTravel[k]
    }
    setGoodsSelected()
}

const save = () => {
    if (prop.min && selectGoodsNum.value < prop.min) {
        ElMessage({
            type: 'warning',
            message: `${t('travelSelectPopupGoodsMinTip')}${prop.min}${t('goodsSelectPopupPiece')}`
        })
        return
    }

    if (prop.max && prop.max > 0 && selectGoodsNum.value && selectGoodsNum.value > prop.max) {
        ElMessage({
            type: 'warning',
            message: `${t('travelSelectPopupGoodsMaxTip')}${prop.max}${t('goodsSelectPopupPiece')}`
        })
        return
    }

    const ids: any = []
    for (const k in selectTravel) {
        ids.push(parseInt(k.replace('way_', '')))
    }
    goodsIds.value.splice(0, goodsIds.value.length, ...ids)

    showDialog.value = false
}

defineExpose({
    showDialog,
    selectTravel,
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
