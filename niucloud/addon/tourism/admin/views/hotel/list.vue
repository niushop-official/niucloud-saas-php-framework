<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addTourismHotel') }}
                </el-button>
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="tourismHotelTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('hotelName')" prop="hotel_name">
                        <el-input v-model.trim="tourismHotelTable.searchParam.hotel_name"
                            :placeholder="t('hotelNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="tourismHotelTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item :label="t('hotelStatus')" prop="hotel_status">
                        <el-select v-model="tourismHotelTable.searchParam.hotel_status" clearable
                            :placeholder="t('hotelStatusPlaceholder')" class="input-width">
                            <el-option :label="t('selectPlaceholder')" value="" />
                            <el-option :label="item.name" :value="item.status" v-for="(item, key) in hotelStatus" :key="key"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadTourismHotelList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="tourismHotelTable.data" size="large" v-loading="tourismHotelTable.loading">
                    <template #empty>
                        <span>{{ !tourismHotelTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :label="t('hotelInfo')" min-width="240" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer">
                                <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                    <img class="max-w-[60px] max-h-[60px]" :src="img(row.hotel_cover)" />
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
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="150" />
                    <el-table-column :label="t('operation')" fixed="right" align="right" width="240">
                        <template #default="{ row }">
                            <el-button type="primary" v-if="row.hotel_status == 0" link @click="editStatus(1, row)">{{ t('grounding') }}</el-button>
                            <el-button type="primary" v-if="row.hotel_status == 1" link @click="editStatus(0, row)">{{ t('OffShelf') }}</el-button>
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="roomList(row)">{{ t('roomList') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="tourismHotelTable.page" v-model:page-size="tourismHotelTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="tourismHotelTable.total"
                        @size-change="loadTourismHotelList()" @current-change="loadTourismHotelList" />
                </div>
            </div>

        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getHotelList, editHotelStatus, getHotelStatus } from '@/addon/tourism/api/tourism'
import { img ,setTablePageStorage,getTablePageStorage } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

// 获取酒店状态
interface HotelStatusType {
    status: number
    name: string
}
const hotelStatus = ref<HotelStatusType[]>([])
const checkHotelStatus = async () => {
    hotelStatus.value = await (await getHotelStatus()).data
}

checkHotelStatus()
interface TourismHotelTableType {
    page: number
    limit: number
    total: number
    loading: boolean
    data: any[]
    searchParam: {
        hotel_name: string
        create_time: []
        hotel_status?: number|string
    }
}
const tourismHotelTable = reactive<TourismHotelTableType>({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        hotel_name: '',
        create_time: []
    }
})

const star = reactive<any>({
    1: t('oneStar'),
    2: t('twoStar'),
    3: t('threeStar'),
    4: t('fourStar'),
    5: t('fiveStar')
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取酒店列表
 */
const loadTourismHotelList = (page: number = 1) => {
    tourismHotelTable.loading = true
    tourismHotelTable.page = page

    getHotelList({
        page: tourismHotelTable.page,
        limit: tourismHotelTable.limit,
        ...tourismHotelTable.searchParam
    }).then(res => {
        tourismHotelTable.loading = false
        tourismHotelTable.data = res.data.data
        tourismHotelTable.total = res.data.total
        setTablePageStorage(tourismHotelTable.page, tourismHotelTable.limit, tourismHotelTable.searchParam);
    }).catch(() => {
        tourismHotelTable.loading = false
    })
}
loadTourismHotelList(getTablePageStorage(tourismHotelTable.searchParam).page)

const router = useRouter()

/**
 * 添加酒店
 */
const addEvent = () => {
    router.push('/tourism/product/hotel/edit')
}

/**
 * 编辑酒店
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/tourism/product/hotel/edit?id=' + data.hotel_id)
}
/**
 * 房间管理
 * @param data
 */
const roomList = (data: any) => {
    router.push('/tourism/product/hotel/room?id=' + data.hotel_id)
}

/**
 * 删除酒店
 */
// const deleteEvent = (id: number) => {
//     ElMessageBox.confirm(t('tourismHotelDeleteTips'), t('warning'),
//         {
//             confirmButtonText: t('confirm'),
//             cancelButtonText: t('cancel'),
//             type: 'warning'
//         }
//     ).then(() => {
//         deleteHotel(id).then(() => {
//             loadTourismHotelList()
//         }).catch(() => {
//         })
//     })
// }

// 上架
const editStatus = (status:any, item:any) => {
    const prompt = status == 1 ? t('upPrompt') : t('downPrompt')
    ElMessageBox.confirm(prompt, t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        editHotelStatus({
            hotel_id: item.hotel_id,
            hotel_status: status
        }).then(() => {
            loadTourismHotelList()
        })
    })
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadTourismHotelList()
}
</script>

<style lang="scss" scoped></style>
