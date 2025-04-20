<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addHelp') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="helpTable.searchParam" ref="searchFormRef">

                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="helpTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="helpTable.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="helpTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadHelpList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="helpTable.data" size="large" v-loading="helpTable.loading">
                    <template #empty>
                        <span>{{ !helpTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" width="50" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="title" :label="t('title')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                       <template #default="{ row }">
                           {{ row.create_time || '' }}
                       </template>
                   </el-table-column>
                   
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="helpTable.page" v-model:page-size="helpTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="helpTable.total"
                        @size-change="loadHelpList()" @current-change="loadHelpList" />
                </div>
            </div>

            <edit ref="editHelpDialog" @complete="loadHelpList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getHelpList, deleteHelp } from '@/addon/ttcard/api/help'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/help/components/help-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let helpTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "title":"",
      "content":"",
      "create_time":[],
      "status":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    const statusList = ref([] as any[])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('展示状态')).data.dictionary
    }
    statusDictList();

/**
 * 获取使用帮助管理列表
 */
const loadHelpList = (page: number = 1) => {
    helpTable.loading = true
    helpTable.page = page

    getHelpList({
        page: helpTable.page,
        limit: helpTable.limit,
         ...helpTable.searchParam
    }).then(res => {
        helpTable.loading = false
        helpTable.data = res.data.data
        helpTable.total = res.data.total
    }).catch(() => {
        helpTable.loading = false
    })
}
loadHelpList()

const editHelpDialog: Record<string, any> | null = ref(null)

/**
 * 添加使用帮助管理
 */
const addEvent = () => {
    editHelpDialog.value.setFormData()
    editHelpDialog.value.showDialog = true
}

/**
 * 编辑使用帮助管理
 * @param data
 */
const editEvent = (data: any) => {
    editHelpDialog.value.setFormData(data)
    editHelpDialog.value.showDialog = true
}

/**
 * 删除使用帮助管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('helpDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteHelp(id).then(() => {
            loadHelpList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadHelpList()
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
