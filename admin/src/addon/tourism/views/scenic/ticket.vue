<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px] relative" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="router.push({ path: '/tourism/product/scenic/scenic' })" />
            <el-button type="primary" class="w-[100px] absolute right-[20px] top-[15px]" @click="addEvent">
                {{ t('addTicket') }}
            </el-button>
        </el-card>

        <el-card class="box-card !border-none" shadow="never">
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="tourismScenicTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('ticketName')" prop="goods_name">
                        <el-input v-model="tourismScenicTable.searchParam.goods_name" :placeholder="t('scenicNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="tourismScenicTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadTourismScenicList()">{{ t('search') }}</el-button>
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
                <el-table :data="tourismScenicTable.data" size="large" v-loading="tourismScenicTable.loading" ref="goodsListTableRef"  @selection-change="handleSelectionChange">
                    <template #empty>
                        <span>{{ !tourismScenicTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="goods_name" :label="t('ticketName')" min-width="120" />
                    <el-table-column prop="price" :label="t('ticketPrice')" min-width="120" />
                    <el-table-column prop="stock" :label="t('ticketStock')" min-width="120" />
                    <el-table-column prop="status_name" :label="t('status')" min-width="120" />
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="170" />
                    <el-table-column :label="t('operation')" fixed="right" min-width="150" align="right">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="renew(0, row.goods_id)" v-if="row.status == 1">{{ t('down') }}</el-button>
                            <el-button type="primary" link @click="renew(1, row.goods_id)" v-if="row.status == 0">{{ t('up') }}</el-button>
                            <el-button type="primary" link @click="memberPriceEvent(row)">{{ t('memberPrice') }}</el-button>
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.goods_id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="tourismScenicTable.page"
                        v-model:page-size="tourismScenicTable.limit" layout="total, sizes, prev, pager, next, jumper"
                        :total="tourismScenicTable.total" @size-change="loadTourismScenicList()"
                        @current-change="loadTourismScenicList" />
                </div>
            </div>

        </el-card>
        <!-- 会员价弹出框 -->
        <goods-member-price-popup ref="memberPricePopupRef" @load="loadTourismScenicList" />
        <!-- 日历会员价弹出框 -->
        <goods-day-member-price-popup ref="memberDayPricePopupRef" @load="loadTourismScenicList" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getTicketList, deleteTicket, editTicketStatus } from '@/addon/tourism/api/tourism'
import { ElMessageBox, FormInstance, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import goodsMemberPricePopup from '@/addon/tourism/views/components/goods-member-price-popup.vue'
import goodsDayMemberPricePopup from '@/addon/tourism/views/components/goods-day-member-price-popup.vue'
import { getMemberLevelAll } from '@/app/api/member'
import { setTablePageStorage,getTablePageStorage } from "@/utils/common";

const route = useRoute()
const pageName = route.meta.title
const id: number = parseInt(route.query.id as string)
const tourismScenicTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        goods_name: '',
        create_time: ''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取门票列表
 */
const loadTourismScenicList = (page: number = 1) => {
    tourismScenicTable.loading = true
    tourismScenicTable.page = page

    getTicketList({
        scenic_id: id,
        page: tourismScenicTable.page,
        limit: tourismScenicTable.limit,
        ...tourismScenicTable.searchParam
    }).then(res => {
        tourismScenicTable.loading = false
        tourismScenicTable.data = res.data.data
        tourismScenicTable.total = res.data.total
        setTablePageStorage(tourismScenicTable.page, tourismScenicTable.limit, tourismScenicTable.searchParam);
    }).catch(() => {
        tourismScenicTable.loading = false
    })
}
loadTourismScenicList(getTablePageStorage(tourismScenicTable.searchParam).page)

const router = useRouter()

/**
 * 添加门票
 */
const addEvent = () => {
    router.push('/tourism/product/scenic/edit_ticket?scenic_id=' + id)
}

/**
 * 编辑门票
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/tourism/product/scenic/edit_ticket?scenic_id=' + id + '&id=' + data.goods_id)
}

/**
 * 删除门票
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('tourismScenicDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteTicket(id).then(() => {
            loadTourismScenicList()
        }).catch(() => {
        })
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadTourismScenicList()
}

const renew = (tag: number, id: number) => {
    editTicketStatus({
        status: tag,
        goods_id: id
    }).then(() => {
        loadTourismScenicList()
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

    memberPricePopupRef.value.show({ goods_id: goodsIds.toString(), goods_type: 'scenic' }, memberLevel.value)
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
    if (multipleSelection.value.length > 0 && multipleSelection.value.length < tourismScenicTable.data.length) {
        isIndeterminate.value = true
    } else {
        isIndeterminate.value = false
    }

    if (multipleSelection.value.length == tourismScenicTable.data.length) {
        toggleCheckbox.value = true
    }
}

</script>

<style lang="scss" scoped></style>
