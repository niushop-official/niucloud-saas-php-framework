<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="statisticsTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('type')" prop="type">
                        <el-select class="w-[280px]" v-model="statisticsTable.searchParam.type" clearable :placeholder="t('typePlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in typeList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('fromUserId')" prop="from_user_id">
                        <el-select class="w-[280px]" v-model="statisticsTable.searchParam.from_user_id" clearable :placeholder="t('fromUserIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in fromUserIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="statisticsTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('cardId')" prop="card_id">
                        <el-select class="w-[280px]" v-model="statisticsTable.searchParam.card_id" clearable :placeholder="t('cardIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in cardIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('ip')" prop="ip">
                        <el-input v-model="statisticsTable.searchParam.ip" :placeholder="t('ipPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="statisticsTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadStatisticsList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="statisticsTable.data" size="large" v-loading="statisticsTable.loading">
                    <template #empty>
                        <span>{{ !statisticsTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" width="80" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('type')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in typeList">
                                <div v-if="item.value == row.type">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="from_user_id_name" :label="t('fromUserId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="card_id_name" :label="t('cardId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="ip" :label="t('ip')" min-width="120" :show-overflow-tooltip="true"/>
                    
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
                    <el-pagination v-model:current-page="statisticsTable.page" v-model:page-size="statisticsTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="statisticsTable.total"
                        @size-change="loadStatisticsList()" @current-change="loadStatisticsList" />
                </div>
            </div>

            <edit ref="editStatisticsDialog" @complete="loadStatisticsList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getStatisticsList, deleteStatistics, getWithUserList, getWithUserList2, getWithCardList } from '@/addon/ttcard/api/statistics'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/statistics/components/statistics-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let statisticsTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "type":"",
      "from_user_id":"",
      "user_id":"",
      "card_id":"",
      "ip":"",
      "create_time":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    const typeList = ref([] as any[])
    const typeDictList = async () => {
    typeList.value = await (await useDictionary('日志事件')).data.dictionary
    }
    typeDictList();

/**
 * 获取数据统计管理列表
 */
const loadStatisticsList = (page: number = 1) => {
    statisticsTable.loading = true
    statisticsTable.page = page

    getStatisticsList({
        page: statisticsTable.page,
        limit: statisticsTable.limit,
         ...statisticsTable.searchParam
    }).then(res => {
        statisticsTable.loading = false
        statisticsTable.data = res.data.data
        statisticsTable.total = res.data.total
    }).catch(() => {
        statisticsTable.loading = false
    })
}
loadStatisticsList()

const editStatisticsDialog: Record<string, any> | null = ref(null)

/**
 * 添加数据统计管理
 */
const addEvent = () => {
    editStatisticsDialog.value.setFormData()
    editStatisticsDialog.value.showDialog = true
}

/**
 * 编辑数据统计管理
 * @param data
 */
const editEvent = (data: any) => {
    editStatisticsDialog.value.setFormData(data)
    editStatisticsDialog.value.showDialog = true
}

/**
 * 删除数据统计管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('statisticsDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteStatistics(id).then(() => {
            loadStatisticsList()
        }).catch(() => {
        })
    })
}

    
    const fromUserIdList = ref([])
    const setFromUserIdList = async () => {
    fromUserIdList.value = await (await getWithUserList({})).data
    }
    setFromUserIdList()
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList2({})).data
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
    loadStatisticsList()
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
