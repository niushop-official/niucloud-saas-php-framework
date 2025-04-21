<template>
    <div>
        <div @click="show">
            <slot>
                <el-button>{{ t('hotelSelectPopupAllHotel') }}</el-button>
                <div class="inline-block ml-[10px] text-[14px]" v-show="goodsIds.length">
                    <span>{{ t('goodsSelectPopupSelect') }}</span>
                    <span class="text-primary mx-[2px]">{{ goodsIds.length }}</span>
                    <span>{{ t('goodsSelectPopupPiece') }}</span>
                </div>
            </slot>
        </div>
        <el-dialog v-model="showDialog" :title="t('hotelSelectPopupSelectGoodsDialog')" width="1000px" :destroy-on-close="true" :close-on-click-modal="false">

            <el-form :inline="true" :model="tourismHotelTable.searchParam" ref="searchFormRef">
                <el-form-item :label="t('hotelNameSelectPopup')" prop="hotel_name" class="form-item-wrap">
                    <el-input v-model="tourismHotelTable.searchParam.hotel_name" :placeholder="t('hotelNameSelectPopupPlaceholder')" maxlength="60" />
                </el-form-item>
                <el-form-item :label="t('createTime')" prop="create_time" class="form-item-wrap">
                    <el-date-picker v-model="tourismHotelTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                </el-form-item>
                <el-form-item class="form-item-wrap">
                    <el-button type="primary" @click="loadHotelList()">{{ t('search') }}</el-button>
                    <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="tourismHotelTable.data" size="large" v-loading="tourismHotelTable.loading" ref="scenicListTableRef"
                max-height="400" @select="handleSelectChange" @select-all="handleSelectAllChange">
                <template #empty>
                    <span>{{ !tourismHotelTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column type="selection" width="55" />
                <el-table-column :show-overflow-tooltip="true" :label="t('hotelInfo')" min-width="180" align="left">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                <img class="max-w-[60px] max-h-[60px]" :src="img(row.cover_thumb_small)" />
                            </div>
                            <a href="javascript:;" :title="row.hotel_name" class="multi-hidden ml-2">{{ row.hotel_name}}</a>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="hotel_star" :label="t('hotelStar')" min-width="100">
                        <template #default="{ row }">
                            {{ star[row.hotel_star] }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="full_address" :label="t('fullAddress')" min-width="150" />
                    <el-table-column prop="hotel_status_name" :label="t('hotelStatus')" min-width="100" />
                <el-table-column prop="create_time" :label="t('goodsSelectPopupCreateTime')" min-width="120" />
            </el-table>
            <div class="mt-[16px] flex">
                <div class="flex items-center flex-1">
                    <div class="mr-[10px]" v-show="selectGoodsNum">
                        <span>{{ t('goodsSelectPopupBeforeTip') }}</span>
                        <span class="text-primary mx-[2px]">{{ selectGoodsNum }}</span>
                        <span>{{ t('hotelSelectPopupAfterTip') }}</span>
                    </div>
                    <el-button type="primary" link @click="clear" v-show="selectGoodsNum">{{ t('goodsSelectPopupClearGoods') }}</el-button>
                </div>
                <el-pagination v-model:current-page="tourismHotelTable.page" v-model:page-size="tourismHotelTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="tourismHotelTable.total"
                    @size-change="loadHotelList()" @current-change="loadHotelList" />
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
import { getHotelList } from '@/addon/tourism/api/tourism'

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
const selectHotel: any = reactive({})

// 已选商品数量
const selectGoodsNum: any = computed(() => {
    return Object.keys(selectHotel).length
})

const tourismHotelTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        hotel_name: '',
        create_time: '',
        goods_type: 'room'
    }
})

const searchFormRef = ref()

const scenicListTableRef = ref()

// 监听表格复选框
const handleSelectChange = (selection: any, row: any) => {
    // 是否选中
    let isSelected = false
    for (let i = 0; i < selection.length; i++) {
        if (selection[i].hotel_id == row.hotel_id) {
            isSelected = true
            break
        }
    }
    if (isSelected) {
        selectHotel['hotel_' + row.hotel_id] = row
    } else {
        // 未选中，删除当前商品
        delete selectHotel['hotel_' + row.hotel_id]
    }
}

// 监听表格全选
const handleSelectAllChange = (selection: any) => {
    if (selection.length) {
        selection.forEach((item: any) => {
            selectHotel['hotel_' + item.hotel_id] = item
        })
    } else {
        // 未选中，删除当前页面的数据
        tourismHotelTable.data.forEach((item: any) => {
            delete selectHotel['hotel_' + item.hotel_id]
        })
    }
}

/**
 * 获取商品列表
 */
const loadHotelList = (page: number = 1, callback: any = null) => {
    tourismHotelTable.loading = true
    tourismHotelTable.page = page
    const searchData = cloneDeep(tourismHotelTable.searchParam)
    getHotelList({
        page: tourismHotelTable.page,
        limit: tourismHotelTable.limit,
        ...searchData
    }).then(res => {
        tourismHotelTable.loading = false
        tourismHotelTable.data = res.data.data
        tourismHotelTable.total = res.data.total
        if (callback) callback()
        setGoodsSelected()
    }).catch(() => {
        tourismHotelTable.loading = false
    })
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        if (!scenicListTableRef.value) return
        for (let i = 0; i < tourismHotelTable.data.length; i++) {
            scenicListTableRef.value.toggleRowSelection(tourismHotelTable.data[i], false)
            if (selectHotel['hotel_' + tourismHotelTable.data[i].hotel_id]) {
                scenicListTableRef.value.toggleRowSelection(tourismHotelTable.data[i], true)
            }
        }
    })
}

// 重置搜索数据
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadHotelList()
}

const show = () => {
    // 检测商品id集合是否存在，移除不存在的商品id，纠正数据准确性
    loadHotelList(1, () => {
        // 第一次打开弹出框时，纠正数据，并且赋值已选商品
        if (goodsIds.value) {
            // 赋值已选择的商品
            const obj = []
            for (let i = 0; i < tourismHotelTable.data.length; i++) {
                if (goodsIds.value.indexOf(tourismHotelTable.data[i].hotel_id) != -1) {
                    obj.push(tourismHotelTable.data[i].hotel_id)
                    selectHotel['hotel_' + tourismHotelTable.data[i].hotel_id] = tourismHotelTable.data[i] || {}
                }
            }
            goodsIds.value = obj
        }
    })
    showDialog.value = true
}

// 清空已选商品
const clear = () => {
    for (const k in selectHotel) {
        delete selectHotel[k]
    }
    setGoodsSelected()
}

const star = reactive<any>({
    1: t('oneStar'),
    2: t('twoStar'),
    3: t('threeStar'),
    4: t('fourStar'),
    5: t('fiveStar')
})

const save = () => {
    if (prop.min && selectGoodsNum.value < prop.min) {
        ElMessage({
            type: 'warning',
            message: `${t('hotelSelectPopupGoodsMinTip')}${prop.min}${t('goodsSelectPopupPiece')}`
        })
        return
    }

    if (prop.max && prop.max > 0 && selectGoodsNum.value && selectGoodsNum.value > prop.max) {
        ElMessage({
            type: 'warning',
            message: `${t('hotelSelectPopupGoodsMaxTip')}${prop.max}${t('goodsSelectPopupPiece')}`
        })
        return
    }

    const ids: any = []
    for (const k in selectHotel) {
        ids.push(parseInt(k.replace('hotel_', '')))
    }
    goodsIds.value.splice(0, goodsIds.value.length, ...ids)

    showDialog.value = false
}

defineExpose({
    showDialog,
    selectHotel,
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
