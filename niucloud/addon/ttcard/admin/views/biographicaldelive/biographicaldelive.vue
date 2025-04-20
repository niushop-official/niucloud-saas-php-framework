<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addBiographicaldelive') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="biographicaldeliveTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="biographicaldeliveTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('fromUserId')" prop="from_user_id">
                        <el-select class="w-[280px]" v-model="biographicaldeliveTable.searchParam.from_user_id" clearable :placeholder="t('fromUserIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in fromUserIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('toUserId')" prop="to_user_id">
                        <el-select class="w-[280px]" v-model="biographicaldeliveTable.searchParam.to_user_id" clearable :placeholder="t('toUserIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in toUserIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('recruitId')" prop="recruit_id">
                        <el-select class="w-[280px]" v-model="biographicaldeliveTable.searchParam.recruit_id" clearable :placeholder="t('recruitIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in recruitIdList"
                                       :key="index"
                                       :label="item['title']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('biographicalId')" prop="biographical_id">
                        <el-select class="w-[280px]" v-model="biographicaldeliveTable.searchParam.biographical_id" clearable :placeholder="t('biographicalIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in biographicalIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('viewStatus')" prop="view_status">
                        <el-select class="w-[280px]" v-model="biographicaldeliveTable.searchParam.view_status" clearable :placeholder="t('viewStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in view_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="biographicaldeliveTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadBiographicaldeliveList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="biographicaldeliveTable.data" size="large" v-loading="biographicaldeliveTable.loading">
                    <template #empty>
                        <span>{{ !biographicaldeliveTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" width="60" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" width="100" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="from_user_id_name" :label="t('fromUserId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="to_user_id_name" :label="t('toUserId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="recruit_id_name" :label="t('recruitId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="biographical_id_name" :label="t('biographicalId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('viewStatus')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in view_statusList">
                                <div v-if="item.value == row.view_status">{{ item.name }}</div>
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
                           <!-- <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button> -->
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="biographicaldeliveTable.page" v-model:page-size="biographicaldeliveTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="biographicaldeliveTable.total"
                        @size-change="loadBiographicaldeliveList()" @current-change="loadBiographicaldeliveList" />
                </div>
            </div>

            <edit ref="editBiographicaldeliveDialog" @complete="loadBiographicaldeliveList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getBiographicaldeliveList, deleteBiographicaldelive, getWithUserList, getWithUserList2, getWithRecruitList, getWithBiographicalList } from '@/addon/ttcard/api/biographicaldelive'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/biographicaldelive/components/biographicaldelive-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let biographicaldeliveTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "status":"",
      "from_user_id":"",
      "to_user_id":"",
      "recruit_id":"",
      "biographical_id":"",
      "view_status":"",
      "create_time":""
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
    const view_statusList = ref([] as any[])
    const view_statusDictList = async () => {
    view_statusList.value = await (await useDictionary('招聘者是否查看')).data.dictionary
    }
    view_statusDictList();

/**
 * 获取简历投递管理列表
 */
const loadBiographicaldeliveList = (page: number = 1) => {
    biographicaldeliveTable.loading = true
    biographicaldeliveTable.page = page

    getBiographicaldeliveList({
        page: biographicaldeliveTable.page,
        limit: biographicaldeliveTable.limit,
         ...biographicaldeliveTable.searchParam
    }).then(res => {
        biographicaldeliveTable.loading = false
        biographicaldeliveTable.data = res.data.data
        biographicaldeliveTable.total = res.data.total
    }).catch(() => {
        biographicaldeliveTable.loading = false
    })
}
loadBiographicaldeliveList()

const editBiographicaldeliveDialog: Record<string, any> | null = ref(null)

/**
 * 添加简历投递管理
 */
const addEvent = () => {
    editBiographicaldeliveDialog.value.setFormData()
    editBiographicaldeliveDialog.value.showDialog = true
}

/**
 * 编辑简历投递管理
 * @param data
 */
const editEvent = (data: any) => {
    editBiographicaldeliveDialog.value.setFormData(data)
    editBiographicaldeliveDialog.value.showDialog = true
}

/**
 * 删除简历投递管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('biographicaldeliveDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteBiographicaldelive(id).then(() => {
            loadBiographicaldeliveList()
        }).catch(() => {
        })
    })
}

    
    const fromUserIdList = ref([])
    const setFromUserIdList = async () => {
    fromUserIdList.value = await (await getWithUserList({})).data
    }
    setFromUserIdList()
    const toUserIdList = ref([])
    const setToUserIdList = async () => {
    toUserIdList.value = await (await getWithUserList2({})).data
    }
    setToUserIdList()
    const recruitIdList = ref([])
    const setRecruitIdList = async () => {
    recruitIdList.value = await (await getWithRecruitList({})).data
    }
    setRecruitIdList()
    const biographicalIdList = ref([])
    const setBiographicalIdList = async () => {
    biographicalIdList.value = await (await getWithBiographicalList({})).data
    }
    setBiographicalIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadBiographicaldeliveList()
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
