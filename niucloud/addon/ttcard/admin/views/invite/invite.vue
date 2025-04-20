<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addInvite') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="inviteTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="inviteTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
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
                        <el-select class="w-[280px]" v-model="inviteTable.searchParam.from_user_id" clearable :placeholder="t('fromUserIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in fromUserIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('fromWebsiteId')" prop="from_website_id">
                        <el-select class="w-[280px]" v-model="inviteTable.searchParam.from_website_id" clearable :placeholder="t('fromWebsiteIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in fromWebsiteIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('toUserId')" prop="to_user_id">
                        <el-select class="w-[280px]" v-model="inviteTable.searchParam.to_user_id" clearable :placeholder="t('toUserIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in toUserIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('toUserCardId')" prop="to_user_card_id">
                        <el-select class="w-[280px]" v-model="inviteTable.searchParam.to_user_card_id" clearable :placeholder="t('toUserCardIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in toUserCardIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="inviteTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadInviteList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="inviteTable.data" size="large" v-loading="inviteTable.loading">
                    <template #empty>
                        <span>{{ !inviteTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="from_user_id_name" :label="t('fromUserId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="from_website_id_name" :label="t('fromWebsiteId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="to_user_id_name" :label="t('toUserId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="to_user_card_id_name" :label="t('toUserCardId')" min-width="120" :show-overflow-tooltip="true"/>
                    
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
                    <el-pagination v-model:current-page="inviteTable.page" v-model:page-size="inviteTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="inviteTable.total"
                        @size-change="loadInviteList()" @current-change="loadInviteList" />
                </div>
            </div>

            <edit ref="editInviteDialog" @complete="loadInviteList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getInviteList, deleteInvite, getWithUserList, getWithWebsiteList, getWithUserList2, getWithCardList } from '@/addon/ttcard/api/invite'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/invite/components/invite-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let inviteTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "status":"",
      "from_user_id":"",
      "from_website_id":"",
      "to_user_id":"",
      "to_user_card_id":"",
      "create_time":[]
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
 * 获取微官网邀请管理列表
 */
const loadInviteList = (page: number = 1) => {
    inviteTable.loading = true
    inviteTable.page = page

    getInviteList({
        page: inviteTable.page,
        limit: inviteTable.limit,
         ...inviteTable.searchParam
    }).then(res => {
        inviteTable.loading = false
        inviteTable.data = res.data.data
        inviteTable.total = res.data.total
    }).catch(() => {
        inviteTable.loading = false
    })
}
loadInviteList()

const editInviteDialog: Record<string, any> | null = ref(null)

/**
 * 添加微官网邀请管理
 */
const addEvent = () => {
    editInviteDialog.value.setFormData()
    editInviteDialog.value.showDialog = true
}

/**
 * 编辑微官网邀请管理
 * @param data
 */
const editEvent = (data: any) => {
    editInviteDialog.value.setFormData(data)
    editInviteDialog.value.showDialog = true
}

/**
 * 删除微官网邀请管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('inviteDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteInvite(id).then(() => {
            loadInviteList()
        }).catch(() => {
        })
    })
}

    
    const fromUserIdList = ref([])
    const setFromUserIdList = async () => {
    fromUserIdList.value = await (await getWithUserList({})).data
    }
    setFromUserIdList()
    const fromWebsiteIdList = ref([])
    const setFromWebsiteIdList = async () => {
    fromWebsiteIdList.value = await (await getWithWebsiteList({})).data
    }
    setFromWebsiteIdList()
    const toUserIdList = ref([])
    const setToUserIdList = async () => {
    toUserIdList.value = await (await getWithUserList2({})).data
    }
    setToUserIdList()
    const toUserCardIdList = ref([])
    const setToUserCardIdList = async () => {
    toUserCardIdList.value = await (await getWithCardList({})).data
    }
    setToUserCardIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadInviteList()
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
