<template>
    <div>
        <el-form :inline="true" :model="tableData.searchParam" ref="searchFormRef">
            <el-form-item :label="t('technicianSelectPopupCardName')" prop="name" class="form-item-wrap">
                <el-input v-model.trim="tableData.searchParam.name" :placeholder="t('technicianSelectPopupCardNamePlaceholder')" maxlength="20" />
            </el-form-item>
            <el-form-item :label="t('technicianSelectPopupCardMobile')" prop="mobile" class="form-item-wrap">
                <el-input v-model.trim="tableData.searchParam.mobile" :placeholder="t('technicianSelectPopupCardMobilePlaceholder')" @keyup="filterNumber($event)" @blur="tableData.searchParam.mobile.mobile = $event.target.value" maxlength="11"/>
            </el-form-item>
            <el-form-item class="form-item-wrap">
                <el-button type="primary" @click="loadList()">{{ t('search') }}</el-button>
                <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData.data" size="large" ref="tableRef" v-loading="tableData.loading">
            <template #empty>
                <span>{{ !tableData.loading ? t('emptyData') : '' }}</span>
            </template>
            <el-table-column min-width="7%">
                <template #default="{ row }">
                    <el-checkbox v-model="row.checked" @change="handleCheckChange($event,row)" />
                </template>
            </el-table-column>

            <el-table-column :show-overflow-tooltip="true" :label="t('technicianSelectPopupCardInfo')" min-width="30%" align="left">
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

            <el-table-column  :label="t('technicianSelectPopupCardSex')" min-width="20%">
                <template #default="{ row }">
                    <div>{{ row.sex == 1 ? '男' : row.sex == 2 ? '女' : '保密' }}</div>
                </template>
            </el-table-column>

            <el-table-column prop="working_age" :label="t('technicianSelectPopupCardSeniority')" min-width="20%" />
        </el-table>
        <div class="mt-[16px] flex justify-end">
            <el-pagination v-model:current-page="tableData.page" v-model:page-size="tableData.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                           @size-change="loadList()" @current-change="loadList" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import { t } from '@/lang'
import { getTechnicianSelectList } from '@/addon/o2o/api/technician'
import { FormInstance, ElMessage } from "element-plus";
import { img, filterNumber } from "@/utils/common";

const prop = defineProps({
    technicianId: {
        type: [Number, String],
        default: 0
    }
})

const searchFormRef = ref<FormInstance>()
const tableRef = ref();

const tableData: any = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        name: '',
        mobile: '',
        verify_ids: ''
    }
})

// 已选数据
const selectData: any = reactive({
    technicianId: prop.technicianId
})

// 获取列表
const loadList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    if (selectData.technicianId) {
        tableData.searchParam.verify_ids = [selectData.technicianId]
    }

    getTechnicianSelectList({
        page: tableData.page,
        limit: tableData.limit,
        ...tableData.searchParam
    }).then(res => {
        tableData.loading = false
        tableData.data = res.data.data

        tableData.data.forEach((item: any) => {
            item.checked = item.id == selectData.technicianId
        })
        tableData.total = res.data.total
        setGoodsSelected()
    }).catch(() => {
        tableData.loading = false
    })
}
loadList()

const handleCheckChange = (isSelect: any, row: any) => {
    if (isSelect) {
        selectData.technicianId = row.id
    } else {
        selectData.technicianId = 0 // 未选中，移除当前
    }
    setGoodsSelected()
}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        for (let i = 0; i < tableData.data.length; i++) {
            tableData.data[i].checked = false
            if (selectData.technicianId == tableData.data[i].id) {
                tableData.data[i].checked = true
                Object.assign(selectData, tableData.data[i])
            }
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadList()
}

const getData = () => {
    if (selectData.technicianId == 0) {
        ElMessage({
            type: 'warning',
            message: `${ t('technicianSelectContentTips') }`
        })
        return;
    }
    return {
        name: 'O2O_TECHNICIAN_DETAIL',
        title: selectData.name,
        url: `/addon/o2o/pages/technician/detail?id=${ selectData.technicianId }`,
        action: '',
        technicianId: selectData.technicianId
    }
}

defineExpose({
    getData
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
