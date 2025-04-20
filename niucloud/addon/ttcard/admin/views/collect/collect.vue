<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addCollect') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="collectTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="collectTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('cardId')" prop="card_id">
                        <el-select class="w-[280px]" v-model="collectTable.searchParam.card_id" clearable :placeholder="t('cardIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in cardIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="collectTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadCollectList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="collectTable.data" size="large" v-loading="collectTable.loading">
                    <template #empty>
                        <span>{{ !collectTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="card_id_name" :label="t('cardId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <!-- <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button> -->
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="collectTable.page" v-model:page-size="collectTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="collectTable.total"
                        @size-change="loadCollectList()" @current-change="loadCollectList" />
                </div>
            </div>

            <edit ref="editCollectDialog" @complete="loadCollectList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getCollectList, deleteCollect, getWithUserList, getWithCardList } from '@/addon/ttcard/api/collect'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/collect/components/collect-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let collectTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "user_id":"",
      "card_id":"",
      "create_time":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取收藏管理列表
 */
const loadCollectList = (page: number = 1) => {
    collectTable.loading = true
    collectTable.page = page

    getCollectList({
        page: collectTable.page,
        limit: collectTable.limit,
         ...collectTable.searchParam
    }).then(res => {
        collectTable.loading = false
        collectTable.data = res.data.data
        collectTable.total = res.data.total
    }).catch(() => {
        collectTable.loading = false
    })
}
loadCollectList()

const editCollectDialog: Record<string, any> | null = ref(null)

/**
 * 添加收藏管理
 */
const addEvent = () => {
    editCollectDialog.value.setFormData()
    editCollectDialog.value.showDialog = true
}

/**
 * 编辑收藏管理
 * @param data
 */
const editEvent = (data: any) => {
    editCollectDialog.value.setFormData(data)
    editCollectDialog.value.showDialog = true
}

/**
 * 删除收藏管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('collectDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteCollect(id).then(() => {
            loadCollectList()
        }).catch(() => {
        })
    })
}

    
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
    loadCollectList()
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
