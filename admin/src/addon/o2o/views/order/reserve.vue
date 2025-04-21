<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <div class="flex items-center mt-5">
                <span class="text-[14px] leading-[16px]">{{ t('orderStatus') }}</span>
                <div v-for="(item, index) in orderStatus" :key="index" class="flex items-center">
                    <span class="w-[16px] h-[16px] ml-[30px] mr-[10px]" :style="{ 'backgroundColor': orderStatusColor[item.status] }" v-if="item.status != 'close'"></span>
                    <span class="text-[14px] leading-[16px]" v-if="item.status != 'close'">{{ item.name }}</span>
                </div>
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="searchParam" ref="searchFormRef">
                    <el-form-item :label="t('orderName')" prop="orderName">
                        <el-input :placeholder="t('orderNamePlaceholder')" v-model.trim="searchParam.orderName" class="w-[200px]" />
                    </el-form-item>
                    <el-form-item :label="t('technicianSearchText')" prop="technician_search_text">
                        <el-input v-model.trim="searchParam.technician_search_text" :placeholder="t('technicianSearchTextPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('memberSearchText')" prop="member_search_text">
                        <el-input v-model.trim="searchParam.member_search_text" :placeholder="t('memberSearchTextPlaceholder')"  class="!w-[210px]"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getReserveBoardFn()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="time-data mt-3" v-if="reserveBoard?.length" >
                <div class="flex justify-center items-center text-lg">
                    <span class="iconfont iconxiangzuojiantou font-bold cursor-pointer" @click="cutWeekFn('sub')"></span>
                    <div class="mx-6">{{ reserveBoard[0].date }} - {{ reserveBoard[reserveBoard.length - 1].date }}</div>
                    <span class="iconfont iconxiangyoujiantou font-bold cursor-pointer" @click="cutWeekFn('add')"></span>
                </div>
                <div v-loading="reserveBoardLoading">
                    <div class="time-data-head">
                        <div v-for="(item, index) in reserveBoard" :key="index">
                            <span>{{ item.week }} {{ item.date }}</span>
                        </div>
                    </div>
                    <div class="time-data-body">
                        <div class="flex flex-col common-scrollbar" v-for="(item, index) in reserveBoard" :key="index">
                            <div class="project-item" :style="{ 'borderColor': orderStatusColor[subItem.order_status] }"
                                v-for="(subItem, subIndex) in item.data" :key="subIndex">
                                <p class="text-[14px]" v-if="subItem.member">{{ subItem.member.nickname }}</p>
                                <p class="flex my-[5px]">
                                    <span class="text-[#fff] px-[6px] py-[2px] text-[12px] rounded-[2px]" :style="{ 'backgroundColor': orderStatusColor[subItem.order_status_info.status] }">{{ subItem.reserve_service_time}}</span>
                                </p>
                                <p class="mb-[5px]">{{  subItem.technician_info ? subItem.technician_info.name : '' }}</p>
                                <p class="mb-[5px] multi-hidden">{{ subItem.item[0].item_name }}</p>
                                <el-dropdown>
                                    <span class="item-btn iconfont icongengduo"></span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click="detailEvent(subItem)">{{ t('detail')}}</el-dropdown-item>
                                            <el-dropdown-item @click="handleSelect(subItem)" v-for="(elItem,elIndex) in  subItem.order_status_info.action" :key="elIndex">{{ elItem.name }}</el-dropdown-item>
                                            <!-- <el-dropdown-item @click="handleSelect(subItem)" v-if="subItem.order_status_info.status == 'dispatch'">{{ t('dispatch')}}</el-dropdown-item> -->
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <el-dialog v-model="dialogTechnicianVisible" title="请选择技师" width="600px">
            <el-table :data="technicianList.data" v-loading="technicianList.loading" class="technician-table">
                <template #empty>
                    <span>{{ !technicianList.loading ? t("emptyData") : "" }}</span>
                </template>
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="position_name" label="职位" />
                <el-table-column prop="mobile" label="手机号" width="180" />
                <el-table-column :label="t('operation')" fixed="right" min-width="50" align="right">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="sendOrderFn(row)">确定</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="technicianList.page" v-model:page-size="technicianList.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="technicianList.total"
                    @size-change="getTechnicianListFn" @current-change="getTechnicianListFn" />
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { getOrderStatus, getReserveBoard, setSendOders } from '@/addon/o2o/api/order'
import { getTechnicianGoods } from '@/addon/o2o/api/technician'
import { FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const pageName = route.meta.title

const searchFormRef = ref<FormInstance>()

/**
 * 获取预约状态
 */
const orderStatus = ref([])
const orderStatusColor = ref({
    wait_pay: '#ccc',
    dispatch: '#8558fa',
    wait_service: '#1475fa',
    in_service: '#fa5b14',
    finish: '#10c610',
    close: '#fa1414'
})

const getOrderStatusFn = async () => {
    const data = await (await getOrderStatus()).data
    orderStatus.value = data
}
getOrderStatusFn()

/**
 * 获取预约面板
 */
const searchParam = ref({
    orderName: '',
    technician_search_text: '',
    member_search_text: ''
})
const reserveBoardLoading = ref(false)
const reserveBoard = ref([])
const weekIndex = ref(0)
const getReserveBoardFn = (page: number = 0) => {
    reserveBoardLoading.value = true
    const obj = {
        length: page,
        ...searchParam.value
    }
    getReserveBoard(obj).then(res => {
        reserveBoard.value = res.data
        reserveBoardLoading.value = false
    }).catch(() => {
        reserveBoardLoading.value = false
    })
}
getReserveBoardFn()

// 切换周
const cutWeekFn = (type:any) => {
    if (type == 'add') weekIndex.value++
    else if (type == 'sub') weekIndex.value--
    getReserveBoardFn(weekIndex.value)
}

// 技师列表
const technicianList = reactive({
    page: 1,
    limit: 10,
    total: 0,
    id: 0,
    loading: false,
    data: []
})
const getTechnicianListFn = (page: number = 1) => {
    technicianList.loading = true
    technicianList.page = page
    getTechnicianGoods({
        page: technicianList.page,
        limit: technicianList.limit,
        id: technicianList.id
    }).then((res: any) => {
        technicianList.loading = false
        technicianList.total = res.data.total
        technicianList.data = res.data.data
    }).catch(() => {
        technicianList.loading = false
    })
}

// 派单
const sendOrderInfo = ref({
    order_id: '',
    technician_id: ''
})
const dialogTechnicianVisible = ref(false)
const handleSelect = (data) => {
    technicianList.id = data.item[0].goods_id
    getTechnicianListFn()
    dialogTechnicianVisible.value = true
    sendOrderInfo.value.order_id = data.order_id
}
const sendOrderFn = (data) => {
    sendOrderInfo.value.technician_id = data.id
    setSendOders(sendOrderInfo.value).then(res => {
        dialogTechnicianVisible.value = false
        getReserveBoardFn()
    })
}

// 跳转详情
const detailEvent = (data: any) => {
    const url = router.resolve({
        path: '/o2o/order/detail',
        query: {
            order_id: data.order_id

        }
    })
    window.open(url.href)
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    getReserveBoardFn()
}
</script>

<style lang="scss" scoped>
.time-data {

    .time-data-head,
    .time-data-body {
        @apply flex justify-between w-full border-[1px] border-r-0 border-solid border-[#E6E6E6] mt-5;

        &>div {
            width: 14%;
            height: 50px;
            @apply flex items-center justify-center flex-1 border-0 border-r-[1px] border-solid border-[#E6E6E6] text-sm;
        }
    }

    .time-data-body {
        @apply mt-0 border-t-0 py-1;

        &>div {
            height: 500px;
            align-items: baseline;
        }

        .project-item {
            @apply flex flex-col border-[1px] border-solid border-[#999] border-t-[3px] px-1 pb-2 pt-1 w-[90%] box-border rounded-sm my-3 ml-[6%];

            .item-btn {
                @apply self-end border-[1px] border-solid border-[#ccc] text-[#ccc] rounded-xl text-lg font-bold ml-auto;
            }

            .name {
                @apply truncate mb-2;
            }
        }

        .common-scrollbar {
            overflow-y: scroll;
            box-sizing: border-box;
            justify-content: normal;

            &::-webkit-scrollbar {
                width: 6px;
                height: 6px;
                background-color: rgba(0, 0, 0, 0);
            }

            &::-webkit-scrollbar-button {
                display: none;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 6px;
                box-shadow: inset 0 0 6px rgba(45, 43, 43, 0.45);
                background-color: #ddd;
            }

            &::-webkit-scrollbar-track {
                background-color: transparent;
            }
        }
    }
    /* 多行超出隐藏 */
    .multi-hidden {
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
}</style>
