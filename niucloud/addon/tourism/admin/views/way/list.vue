<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addTourismWay') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="tourismWayTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('wayName')" prop="way_name">
                        <el-input v-model.trim="tourismWayTable.searchParam.way_name" :placeholder="t('wayNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('startCity')" prop="start_city">
                        <el-input v-model.trim="tourismWayTable.searchParam.start_city"
                            :placeholder="t('startCityPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('endCity')" prop="end_city">
                        <el-input v-model.trim="tourismWayTable.searchParam.end_city" :placeholder="t('endCityPlaceholder')" />
                    </el-form-item>

                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="tourismWayTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadTourismWayList()">{{ t('search') }}</el-button>
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

                <el-table :data="tourismWayTable.data" size="large" v-loading="tourismWayTable.loading" ref="goodsListTableRef"  @selection-change="handleSelectionChange">
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
                    <el-table-column :label="t('price')" min-width="120" align="left">
                        <template #default="{ row }">
                            {{ row.goods.price }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('stock')" min-width="120" align="left">
                        <template #default="{ row }">
                            {{ row.goods.stock }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('saleNum')" min-width="120" align="left">
                        <template #default="{ row }">
                            {{ row.sell_sum }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('createTime')" min-width="180" align="center">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_name" :label="t('wayStatus')" min-width="120" />
                    <el-table-column :label="t('operation')" fixed="right" min-width="120" align="right">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="statusChange(0, row.way_id)"
                                v-if="row.way_status == 1">{{ t('down') }}</el-button>
                            <el-button type="primary" link @click="statusChange(1, row.way_id)"
                                v-if="row.way_status == 0">{{ t('up') }}</el-button>
                            <el-button type="primary" link @click="memberPriceEvent(row)">{{ t('memberPrice') }}</el-button>
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="tourismWayTable.page" v-model:page-size="tourismWayTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="tourismWayTable.total"
                        @size-change="loadTourismWayList()" @current-change="loadTourismWayList" />
                </div>
            </div>

        </el-card>
         <!-- 会员价弹出框 -->
         <goods-member-price-popup ref="memberPricePopupRef" @load="loadTourismWayList" />
        <!-- 日历会员价弹出框 -->
        <goods-day-member-price-popup ref="memberDayPricePopupRef" @load="loadTourismWayList" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getWayList, editWayStatus } from '@/addon/tourism/api/tourism'
import { img ,setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { FormInstance, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { getMemberLevelAll } from '@/app/api/member'
import goodsMemberPricePopup from '@/addon/tourism/views/components/goods-member-price-popup.vue'
import goodsDayMemberPricePopup from '@/addon/tourism/views/components/goods-day-member-price-popup.vue'

const route = useRoute()
const pageName = route.meta.title

const tourismWayTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        way_name: '',
        start_city: '',
        end_city: '',
        create_time: ''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取旅游线路列表
 */
const loadTourismWayList = (page: number = 1) => {
    tourismWayTable.loading = true
    tourismWayTable.page = page

    getWayList({
        page: tourismWayTable.page,
        limit: tourismWayTable.limit,
        ...tourismWayTable.searchParam
    }).then(res => {
        tourismWayTable.loading = false
        tourismWayTable.data = res.data.data
        tourismWayTable.total = res.data.total
        setTablePageStorage(tourismWayTable.page, tourismWayTable.limit, tourismWayTable.searchParam);
    }).catch(() => {
        tourismWayTable.loading = false
    })
}
loadTourismWayList(getTablePageStorage(tourismWayTable.searchParam).page)

const router = useRouter()

/**
 * 添加旅游线路
 */
const addEvent = () => {
    router.push('/tourism/product/way/edit')
}

/**
 * 编辑旅游线路
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/tourism/product/way/edit?id=' + data.way_id)
}

/**
 * 删除旅游线路
 */
// const deleteEvent = (id: number) => {
//     ElMessageBox.confirm(t('tourismWayDeleteTips'), t('warning'),
//         {
//             confirmButtonText: t('confirm'),
//             cancelButtonText: t('cancel'),
//             type: 'warning'
//         }
//     ).then(() => {
//         deleteWay(id).then(() => {
//             loadTourismWayList()
//         }).catch(() => {
//         })
//     })
// }

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadTourismWayList()
}

const statusChange = (status: number, id: number) => {
    editWayStatus({
        way_status: status,
        way_id: id
    }).then(() => {
        loadTourismWayList()
    })
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
    data.goods_type = 'way'
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

    memberPricePopupRef.value.show({ goods_id: goodsIds.toString(), goods_type: 'way' }, memberLevel.value)
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
    if (multipleSelection.value.length > 0 && multipleSelection.value.length < tourismWayTable.data.length) {
        isIndeterminate.value = true
    } else {
        isIndeterminate.value = false
    }

    if (multipleSelection.value.length == tourismWayTable.data.length) {
        toggleCheckbox.value = true
    }
}
</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}</style>
