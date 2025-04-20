<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addCate') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="cateTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="cateTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    
                     <el-form-item :label="t('status')" prop="status">
                         <el-select class="w-[280px]" v-model="cateTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                             <el-option label="全部" value=""></el-option>
                             <el-option :label=" t('show') "  value="1"/>
                             <el-option :label=" t('hidden') "  value="0"/>
                         </el-select>
                     </el-form-item>
                    
                    <el-form-item :label="t('adddate')" prop="adddate">
                        <el-date-picker v-model="cateTable.searchParam.adddate" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadCateList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="cateTable.data" size="large" v-loading="cateTable.loading">
                    <template #empty>
                        <span>{{ !cateTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="name" :label="t('name')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    
                   					<el-table-column :label="t('status')" min-width="120" align="center">
                   					    <template #default="{ row }">
                   					        <span v-if="row.status == 1">{{ t('show') }}</span>
                   					        <span v-if="row.status == 0">{{t('hidden')}}</span>
                   					    </template>
                   					</el-table-column>
                    
                    <el-table-column prop="sort" :label="t('排序')" min-width="80" :show-overflow-tooltip="true"/>
                    <el-table-column prop="adddate" :label="t('adddate')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="cateTable.page" v-model:page-size="cateTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="cateTable.total"
                        @size-change="loadCateList()" @current-change="loadCateList" />
                </div>
            </div>

            <edit ref="editCateDialog" @complete="loadCateList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getCateList, deleteCate } from '@/addon/shortvideo/api/cate'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/shortvideo/views/cate/components/cate-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let cateTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "name":"",
      "status":"",
      "adddate":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])



/**
 * 获取分类列表
 */
const loadCateList = (page: number = 1) => {
    cateTable.loading = true
    cateTable.page = page

    getCateList({
        page: cateTable.page,
        limit: cateTable.limit,
         ...cateTable.searchParam
    }).then(res => {
        cateTable.loading = false
        cateTable.data = res.data.data
        cateTable.total = res.data.total
    }).catch(() => {
        cateTable.loading = false
    })
}
loadCateList()

const editCateDialog: Record<string, any> | null = ref(null)

/**
 * 添加分类
 */
const addEvent = () => {
    editCateDialog.value.setFormData()
    editCateDialog.value.showDialog = true
}

/**
 * 编辑分类
 * @param data
 */
const editEvent = (data: any) => {
    editCateDialog.value.setFormData(data)
    editCateDialog.value.showDialog = true
}

/**
 * 删除分类
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('cateDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteCate(id).then(() => {
            loadCateList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCateList()
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
