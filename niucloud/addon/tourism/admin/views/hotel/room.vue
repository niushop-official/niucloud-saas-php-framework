<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px] relative" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="router.push({ path: '/tourism/product/hotel/hotel' })" />
            <el-button type="primary" class="w-[100px] absolute right-[20px] top-[15px]" @click="addEvent">
                {{ t('addTourismGoods') }}
            </el-button>
        </el-card>

        <el-card class="box-card !border-none" shadow="never">

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="tourismGoodsTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('goodsName')" prop="goods_name">
                        <el-input v-model="tourismGoodsTable.searchParam.goods_name"
                            :placeholder="t('goodsNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="tourismGoodsTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadTourismGoodsList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">

                <div class="mb-[10px] flex items-center">
                    <el-checkbox v-model="toggleCheckbox" size="large" class="px-[14px]" @change="toggleChange" :indeterminate="isIndeterminate" />
                    <el-button @click="memberPriceAllEvent()" size="small">{{ t('memberPrice') }}</el-button>
                    <el-button @click="dayMemberPriceAllEvent()" size="small">{{ t('dayMemberPrice') }}</el-button>
                </div>

                <el-table :data="tourismGoodsTable.data" size="large"  ref="goodsListTableRef" v-loading="tourismGoodsTable.loading" @selection-change="handleSelectionChange">
                    <template #empty>
                        <span>{{ !tourismGoodsTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column type="selection" width="55" />
                    <el-table-column :label="t('roomInfo')" min-width="240" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                    <img class="max-w-[60px] max-h-[60px]" :src="img(row.cover_thumb_small)" />
                                </div>
                                <div class="flex flex-col ml-2">
                                    <span class="multi-hidden">{{ row.goods_name }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="t('price')" min-width="120" />
                    <el-table-column prop="stock" :label="t('stock')" min-width="120" />
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="120" />
                    <el-table-column prop="sort" :label="t('sort')" min-width="120">
                        <template #default="{ row }">
                            <el-input v-model.trim="row.sort" class="w-[70px]" maxlength="8" @blur="sortInputListener(row.sort, row)" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_name" :label="t('status')" min-width="120" />
                    <el-table-column :label="t('operation')" align="right" fixed="right" min-width="160">
                        <template #default="{ row }">
                            <el-button type="primary" v-if="row.status == 0" link
                                @click="editStatusEvent(1, row.goods_id)">{{ t('up') }}</el-button>
                            <el-button type="primary" v-if="row.status == 1" link
                                @click="editStatusEvent(0, row.goods_id)">{{ t('down') }}</el-button>
                            <el-button type="primary" link @click="memberPriceEvent(row)">{{ t('memberPrice') }}</el-button>
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.goods_id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="tourismGoodsTable.page" v-model:page-size="tourismGoodsTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="tourismGoodsTable.total"
                        @size-change="loadTourismGoodsList()" @current-change="loadTourismGoodsList" />
                </div>
            </div>
        </el-card>
        <!-- 会员价弹出框 -->
        <goods-member-price-popup ref="memberPricePopupRef" @load="loadTourismGoodsList" />
        <!-- 日历会员价弹出框 -->
        <goods-day-member-price-popup ref="memberDayPricePopupRef" @load="loadTourismGoodsList" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getRoomList, deleteRoom, editRoomStatus, editRoomSort } from '@/addon/tourism/api/tourism'
import { img, debounce ,setTablePageStorage,getTablePageStorage } from '@/utils/common'
import { ElMessageBox, FormInstance, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { getMemberLevelAll } from '@/app/api/member'
import goodsMemberPricePopup from '@/addon/tourism/views/components/goods-member-price-popup.vue'
import goodsDayMemberPricePopup from '@/addon/tourism/views/components/goods-day-member-price-popup.vue'

const route = useRoute()
const pageName = route.meta.title
const id: number = parseInt(route.query.id as string)

const tourismGoodsTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        goods_name: '',
        create_time: []
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取商品表列表
 */
const loadTourismGoodsList = (page: number = 1) => {
    tourismGoodsTable.loading = true
    tourismGoodsTable.page = page

    getRoomList({
        hotel_id: id,
        page: tourismGoodsTable.page,
        limit: tourismGoodsTable.limit,
        ...tourismGoodsTable.searchParam
    }).then(res => {
        tourismGoodsTable.loading = false
        tourismGoodsTable.data = res.data.data
        tourismGoodsTable.total = res.data.total
        setTablePageStorage(tourismGoodsTable.page, tourismGoodsTable.limit, tourismGoodsTable.searchParam);
    }).catch(() => {
        tourismGoodsTable.loading = false
    })
}
loadTourismGoodsList(getTablePageStorage(tourismGoodsTable.searchParam).page)

const router = useRouter()

/**
 * 添加商品
 */
const addEvent = () => {
    router.push('/tourism/product/hotel/edit_room?hotel_id=' + id)
}

/**
 * 编辑商品
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/tourism/product/hotel/edit_room?hotel_id=' + id + '&id=' + data.goods_id)
}

/**
 * 商品上下架状态
 * @param data
 */
const editStatusEvent = (num: number, goodsId: number) => {
    const prompt = num == 1 ? t('upPrompt') : t('downPrompt')
    ElMessageBox.confirm(prompt, t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        editRoomStatus({
            id: goodsId,
            status: num
        }).then(() => {
            loadTourismGoodsList()
        })
    })
}

/**
 * 删除商品表
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('tourismGoodsDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteRoom(id).then(() => {
            loadTourismGoodsList()
        }).catch(() => {
        })
    })
}
// 正则表达式
const regExp = {
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/
}

// 修改排序号
const sortInputListener = debounce((sort, row) => {
    if (isNaN(sort) || !regExp.number.test(sort)) {
        ElMessage({
            type: 'warning',
            message: `${t('sortTips')}`
        })
        return
    }
    if (sort > 99999999) {
        row.sort = 99999999
    }
    editRoomSort({
        id: row.goods_id,
        sort
    }).then(() => {
    })
})

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadTourismGoodsList()
}

/** ***************** 会员价-start *************************/
// 会员等级
const memberLevel = ref([])
const getMemberLevelAllFn = () => {
    getMemberLevelAll().then(res => {
        memberLevel.value = res.data ? res.data : []
    })
}
getMemberLevelAllFn()

const memberPricePopupRef: any = ref(null)
const memberPriceEvent = (data: any) => {
    memberPricePopupRef.value.show(data, memberLevel.value)
}
const memberPriceAllEvent = () => {
    if (multipleSelection.value.length == 0) {
        ElMessage({
            type: 'warning',
            message: `${t('batchEmptySelectedGoodsTips')}`
        })
        return
    }

    const goodsIds: any = []
    multipleSelection.value.forEach((item: any) => {
        goodsIds.push(item.goods_id)
    })

    memberPricePopupRef.value.show({ goods_id: goodsIds.toString(), goods_type: 'room' }, memberLevel.value)
}

const memberDayPricePopupRef: any = ref(null)

const dayMemberPriceAllEvent = () => {
    if (multipleSelection.value.length == 0) {
        ElMessage({
            type: 'warning',
            message: `${t('batchEmptySelectedGoodsTips')}`
        })
        return
    }

    const goodsIds: any = []
    multipleSelection.value.forEach((item: any) => {
        goodsIds.push(item.goods_id)
    })
    memberDayPricePopupRef.value.show({ goods_id: goodsIds.toString() }, memberLevel.value)
}

/** ***************** 会员价-end *************************/

// 批量复选框
const toggleCheckbox = ref()

// 复选框中间状态
const isIndeterminate = ref(false)

// 监听批量复选框事件
const toggleChange = (value: any) => {
    isIndeterminate.value = false
    goodsListTableRef.value.toggleAllSelection()
}

const goodsListTableRef = ref()

// 选中数据
const multipleSelection: any = ref([])

// 监听表格单行选中
const handleSelectionChange = (val: []) => {
    multipleSelection.value = val

    toggleCheckbox.value = false
    if (multipleSelection.value.length > 0 && multipleSelection.value.length < tourismGoodsTable.data.length) {
        isIndeterminate.value = true
    } else {
        isIndeterminate.value = false
    }

    if (multipleSelection.value.length == tourismGoodsTable.data.length) {
        toggleCheckbox.value = true
    }
}

</script>

<style lang="scss" scoped></style>
