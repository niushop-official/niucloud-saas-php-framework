<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addImpression') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="impressionTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="impressionTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadImpressionList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="impressionTable.data" size="large" v-loading="impressionTable.loading">
                    <template #empty>
                        <span>{{ !impressionTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="name" :label="t('name')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="impressionTable.page" v-model:page-size="impressionTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="impressionTable.total"
                        @size-change="loadImpressionList()" @current-change="loadImpressionList" />
                </div>
            </div>

            <edit ref="editImpressionDialog" @complete="loadImpressionList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getImpressionList, deleteImpression } from '@/addon/ttcard/api/impression'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/impression/components/impression-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let impressionTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "name":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取个人印象列表
 */
const loadImpressionList = (page: number = 1) => {
    impressionTable.loading = true
    impressionTable.page = page

    getImpressionList({
        page: impressionTable.page,
        limit: impressionTable.limit,
         ...impressionTable.searchParam
    }).then(res => {
        impressionTable.loading = false
        impressionTable.data = res.data.data
        impressionTable.total = res.data.total
    }).catch(() => {
        impressionTable.loading = false
    })
}
loadImpressionList()

const editImpressionDialog: Record<string, any> | null = ref(null)

/**
 * 添加个人印象
 */
const addEvent = () => {
    editImpressionDialog.value.setFormData()
    editImpressionDialog.value.showDialog = true
}

/**
 * 编辑个人印象
 * @param data
 */
const editEvent = (data: any) => {
    editImpressionDialog.value.setFormData(data)
    editImpressionDialog.value.showDialog = true
}

/**
 * 删除个人印象
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('impressionDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteImpression(id).then(() => {
            loadImpressionList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadImpressionList()
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
	}
</style>
