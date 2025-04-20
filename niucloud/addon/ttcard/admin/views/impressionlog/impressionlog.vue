<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="impressionlogTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('impressionId')" prop="impression_id">
                        <el-select class="w-[280px]" v-model="impressionlogTable.searchParam.impression_id" clearable :placeholder="t('impressionIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in impressionIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="impressionlogTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('cardId')" prop="card_id">
                        <el-select class="w-[280px]" v-model="impressionlogTable.searchParam.card_id" clearable :placeholder="t('cardIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in cardIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="impressionlogTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadImpressionlogList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="impressionlogTable.data" size="large" v-loading="impressionlogTable.loading">
                    <template #empty>
                        <span>{{ !impressionlogTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" width="100" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="card_id_name" :label="t('cardId')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="impression_id_name" :label="t('impressionId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="impressionlogTable.page" v-model:page-size="impressionlogTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="impressionlogTable.total"
                        @size-change="loadImpressionlogList()" @current-change="loadImpressionlogList" />
                </div>
            </div>

            <edit ref="editImpressionlogDialog" @complete="loadImpressionlogList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getImpressionlogList, deleteImpressionlog, getWithImpressionList, getWithUserList, getWithCardList } from '@/addon/ttcard/api/impressionlog'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/impressionlog/components/impressionlog-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let impressionlogTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "impression_id":"",
      "user_id":"",
      "card_id":"",
      "create_time":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取个人印象日志管理列表
 */
const loadImpressionlogList = (page: number = 1) => {
    impressionlogTable.loading = true
    impressionlogTable.page = page

    getImpressionlogList({
        page: impressionlogTable.page,
        limit: impressionlogTable.limit,
         ...impressionlogTable.searchParam
    }).then(res => {
        impressionlogTable.loading = false
        impressionlogTable.data = res.data.data
        impressionlogTable.total = res.data.total
    }).catch(() => {
        impressionlogTable.loading = false
    })
}
loadImpressionlogList()

const editImpressionlogDialog: Record<string, any> | null = ref(null)

/**
 * 添加个人印象日志管理
 */
const addEvent = () => {
    editImpressionlogDialog.value.setFormData()
    editImpressionlogDialog.value.showDialog = true
}

/**
 * 编辑个人印象日志管理
 * @param data
 */
const editEvent = (data: any) => {
    editImpressionlogDialog.value.setFormData(data)
    editImpressionlogDialog.value.showDialog = true
}

/**
 * 删除个人印象日志管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('impressionlogDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteImpressionlog(id).then(() => {
            loadImpressionlogList()
        }).catch(() => {
        })
    })
}

    
    const impressionIdList = ref([])
    const setImpressionIdList = async () => {
    impressionIdList.value = await (await getWithImpressionList({})).data
    }
    setImpressionIdList()
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const cardIdList = ref([])
    const setCardIdList = async () => {
    cardIdList.value = await (await getWithCardList({})).data
    }
    setCardIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadImpressionlogList()
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
