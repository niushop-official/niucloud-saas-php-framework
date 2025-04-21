<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="handleChange">{{ t("addRecharge") }}
                </el-button>
            </div>

            <!-- 搜索 -->
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('rechargeName')" prop="recharge_name">
                        <el-input v-model.trim="tableData.searchParam.recharge_name" :placeholder="t('rechargeNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-form-item :label="t('createTime')" prop="create_time">
                            <el-date-picker v-model="tableData.searchParam.create_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                        </el-form-item>
                        <el-button type="primary" @click="loadRechargePackageList()">{{ t("search") }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t("reset") }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <!-- 列表 -->
            <div>
                <el-table :data="tableData.data" size="large" v-loading="tableData.loading" ref="rechargePackageTableRef">
                    <el-table-column prop="recharge_name" :label="t('rechargeName')" min-width="130" />
                    <el-table-column prop="rechargeInfo" :label="t('rechargeInfo')" min-width="130">
                        <template #default="{ row }">
                            <div>
                                <p>{{ t('faceValue') }}：{{ row.face_value }}</p>
                                <p>{{ t('price') }}：{{ row.buy_price }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="giftPackInfo" :label="t('giftPackInfo')" min-width="130">
                        <template #default="{ row }">
                            <div>
                                <p v-if="row.point>0">{{ t('point') }}：{{ row.point }}</p>
                                <p v-if="row.growth>0">{{ t('growth') }}：{{ row.growth }}</p>
                                <template v-if="row.gift_content">
                                    <p v-for="(item,index) in row.gift_content" :key="index">{{ item.info }}</p>
                                </template>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sale_num" :label="t('saleNum')" min-width="100" />
                    <el-table-column prop="sort" min-width="100" :show-overflow-tooltip="true">
                        <template #header>
                            <div style="display: inline-flex; align-items: center">
                                <span class="mr-[5px]">{{ t('sort') }}</span>
                                <el-tooltip class="box-item" effect="light" :content="t('sortRules')" placement="top">
                                    <el-icon color="#666">
                                        <QuestionFilled />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                        <template #default="{ row }">
                            <el-input v-model.number="row.sort" class="w-[70px]" maxlength="8" @blur="sortInputListener(row.sort, row)" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" :label="t('status')" min-width="130">
                        <template #default="{ row }">
                            <el-tag class="cursor-pointer" :type="row.status != 0 ? 'success' : 'danger'" @click="showClick(row)">{{ row.status != 0 ? '开启' : '关闭 ' }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="150">
                        <template #default="{ row }">
                            <div>{{ row.create_time }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row)">{{ t("edit") }}</el-button>
                            <el-button type="primary" link @click="detailEvent(row.recharge_id)">{{ t('detail') }}</el-button>
                            <el-button type="primary" link @click="toOrderList(row.recharge_id)">{{ t('rechargeRecord') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.recharge_id)">{{ t("delete") }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="tableData.page" v-model:page-size="tableData.limit"
                                   layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                                   @size-change="loadRechargePackageList()" @current-change="loadRechargePackageList" />
                </div>
            </div>
        </el-card>
        <package-detail ref="packageDetailDialog"></package-detail>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue"
import { t } from "@/lang"
import { useRoute, useRouter } from "vue-router"
import { FormInstance, ElMessage, ElMessageBox } from "element-plus"
import packageDetail from '@/addon/recharge/views/package/detail.vue'
import { debounce ,setTablePageStorage,getTablePageStorage } from "@/utils/common"
import {
    getRechargePackageList,
    deleteRechargePackage,
    editRechargeStatus,
    modifyRechargeSort
} from "@/addon/recharge/api/recharge"

const router = useRouter()
const route = useRoute()
const pageName = route.meta.title
const searchFormRef = ref<FormInstance>()

// 表单内容
const tableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        create_time: [],
        recharge_name: ""
    }
})

// 获取列表
const loadRechargePackageList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    getRechargePackageList({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then((res) => {
        tableData.loading = false
        tableData.data = res.data.data
        tableData.total = res.data.total
        setTablePageStorage(tableData.page, tableData.limit, tableData.searchParam)
    }).catch(() => {
        tableData.loading = false
    })
}

loadRechargePackageList(getTablePageStorage(tableData.searchParam).page);

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadRechargePackageList()
};

const handleChange = () => {
    router.push('/recharge/package/edit')
}

const editEvent = (data: any) => {
    router.push('/recharge/package/edit?recharge_id=' + data.recharge_id)
}

//详情
const packageDetailDialog: Record<string, any> | null = ref(null)
const detailEvent = (id: number) => {
    let data = { id: id }
    packageDetailDialog.value.setFormData(data)
    packageDetailDialog.value.showDialog = true
}

const showClick = (row: any) => {
    row.status = row.status === 1 ? 0 : 1
    const obj = {
        recharge_id: row.recharge_id,
        status: row.status,
    }
    editRechargeStatus(obj)
}

// 正则表达式
const regExp = {
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/,
}

// 修改排序号
const sortInputListener = debounce((sort, row) => {
    if (isNaN(sort) || !regExp.number.test(sort)) {
        ElMessage({
            type: "warning",
            message: `${ t("sortTips") }`,
        })
        return
    }
    if (sort > 99999999) {
        row.sort = 99999999
    }
    modifyRechargeSort({
        recharge_id: row.recharge_id,
        sort
    }).then((res) => {
        loadRechargePackageList()
    })
})

// 删除
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('deleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteRechargePackage(id).then(() => {
            loadRechargePackageList()
        })
    })
}

const toOrderList = (id: number) => {
    router.push('/recharge/order/list?recharge_id=' + id)
}


</script>

<style lang="scss" scoped></style>
