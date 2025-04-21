<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addevent">
                    {{ t("addTechnician") }}
                </el-button>
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="technicianTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model.trim="technicianTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('mobile')" prop="mobile">
                        <el-input v-model.trim="technicianTable.searchParam.mobile" :placeholder="t('mobilePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="technicianTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getTechnicianFn()">{{t("search")}}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{t("reset")}}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <div class="mt-[10px]">
                <el-table :data="technicianTable.data" size="large" v-loading="technicianTable.loading">
                    <template #empty>
                        <span>{{ !technicianTable.loading ? t("emptyData") : "" }}</span>
                    </template>
                    <el-table-column :show-overflow-tooltip="true" :label="t('technicianInfo')" min-width="300" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <div class="w-[60px] max-h-[60px] mr-[10px]">
                                    <img class="max-w-[60px] w-[60px] max-h-[60px] flex-shrink-0" :src="img(row.headimg_mid)" v-if="row.headimg_mid"/>
                                    <img class="w-[60px] h-[60px] " v-else src="@/addon/o2o/assets/default_headimg.png" alt="">
                                </div>
                                <div class="flex flex-wrap">
                                    <p class="w-[100%] truncate">{{ row.name }}</p>
                                    <p class="w-[150px] truncate self-end text-[14px] text-[#999]">{{ row.label }}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" :label="t('member')" min-width="300" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer" v-if="row.member" @click="toLink(row.member.member_id)">
                                <div class="w-[60px] max-h-[60px] mr-[10px]">
                                    <img class="max-w-[60px] w-[60px] max-h-[60px] flex-shrink-0" :src="img(row.member.headimg)" v-if="row.member.headimg"/>
                                    <img class="w-[60px] h-[60px] " v-else src="@/addon/o2o/assets/default_headimg.png" alt="">
                                </div>
                                <div class="flex flex-wrap">
                                    <p class="w-[100%] truncate">{{ row.member.nickname }}</p>
                                    <p class="w-[150px] truncate self-end text-[14px] text-[#999]">{{ row.member.mobile }}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column  :label="t('sex')" min-width="120">
                        <template #default="{ row }">
                            <div>{{ row.sex == 1 ? '男' : row.sex == 2 ? '女' : '保密' }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="position_name" :label="t('position')" min-width="120" />
                    <el-table-column prop="working_age" :label="t('seniority')" min-width="120" />
                    <el-table-column prop="mobile" :label="t('mobile')" min-width="120" />
                    <el-table-column prop="status" :label="t('status')" min-width="120">
                        <template #default="{ row }">
                            <el-tag :type="row.status == 1 ? 'success': row.status == -1 ? 'danger' :'info'">{{ row.status == 1 ? '在职': row.status == -1 ? '离职' :'休息中'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="150" />
                    <el-table-column :label="t('operation')" fixed="right" min-width="200" align="right">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="technicianTable.page" v-model:page-size="technicianTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="technicianTable.total"
                        @size-change="getTechnicianFn" @current-change="getTechnicianFn" />
                </div>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { img,setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'
import { getTechnicianList, deleteTechnician } from '@/addon/o2o/api/technician'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const name: string = route.query.name || ''
const technicianTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        name: name ?? '',
        mobile: '',
        create_time: []
    }
})
const searchFormRef = ref()

const addevent = () => {
    router.push('/o2o/technician/edit')
}

/**
 * 获取技师列表
 */
const getTechnicianFn = (page: number = 1) => {
    technicianTable.loading = true
    technicianTable.page = page

    getTechnicianList({
        page: technicianTable.page,
        limit: technicianTable.limit,
        ...technicianTable.searchParam
    }).then(res => {
        technicianTable.loading = false
        technicianTable.data = res.data.data
        technicianTable.total = res.data.total
        setTablePageStorage(technicianTable.page,technicianTable.limit,technicianTable.searchParam)
    }).catch(() => {
        technicianTable.loading = false
    })
}
getTechnicianFn(getTablePageStorage(technicianTable.searchParam).page);

const resetForm = (formEl: any) => {
    if (!formEl) return
    formEl.resetFields()
    getTechnicianFn()
}
/**
 * 编辑
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/o2o/technician/edit?id=' + data.id)
}

const deleteEvent = (id: number) => {
    ElMessageBox.confirm('确认删除这条数据吗?', '删除',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        deleteTechnician(id).then(res => {
            getTechnicianFn()
        }).catch(() => {
        })
    })
}
// 跳转会员详情
const toLink = (id: number) => {
    const url = router.resolve({
        path: '/member/detail',
        query: {
            id
        }
    })
    window.open(url.href)
}
</script>
<style lang="scss" scoped></style>
