<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
            
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="feedbackTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]"  v-model="feedbackTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="feedbackTable.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('content')" prop="content" :show-overflow-tooltip="true">
                        <el-input v-model="feedbackTable.searchParam.content" :placeholder="t('contentPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="feedbackTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="feedbackTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadFeedbackList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="feedbackTable.data" size="large" v-loading="feedbackTable.loading">
                    <template #empty>
                        <span>{{ !feedbackTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="title" :label="t('title')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="content" :label="t('content')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('status')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
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
                    <el-pagination v-model:current-page="feedbackTable.page" v-model:page-size="feedbackTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="feedbackTable.total"
                        @size-change="loadFeedbackList()" @current-change="loadFeedbackList" />
                </div>
            </div>

            <edit ref="editFeedbackDialog" @complete="loadFeedbackList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getFeedbackList, deleteFeedback, getWithUserList } from '@/addon/ttcard/api/feedback'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/feedback/components/feedback-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let feedbackTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "user_id":"",
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
 * 获取意见反馈管理列表
 */
const loadFeedbackList = (page: number = 1) => {
    feedbackTable.loading = true
    feedbackTable.page = page

    getFeedbackList({
        page: feedbackTable.page,
        limit: feedbackTable.limit,
         ...feedbackTable.searchParam
    }).then(res => {
        feedbackTable.loading = false
        feedbackTable.data = res.data.data
        feedbackTable.total = res.data.total
    }).catch(() => {
        feedbackTable.loading = false
    })
}
loadFeedbackList()

const editFeedbackDialog: Record<string, any> | null = ref(null)

/**
 * 添加意见反馈管理
 */
const addEvent = () => {
    editFeedbackDialog.value.setFormData()
    editFeedbackDialog.value.showDialog = true
}

/**
 * 编辑意见反馈管理
 * @param data
 */
const editEvent = (data: any) => {
    editFeedbackDialog.value.setFormData(data)
    editFeedbackDialog.value.showDialog = true
}

/**
 * 删除意见反馈管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('feedbackDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteFeedback(id).then(() => {
            loadFeedbackList()
        }).catch(() => {
        })
    })
}

    
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadFeedbackList()
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
