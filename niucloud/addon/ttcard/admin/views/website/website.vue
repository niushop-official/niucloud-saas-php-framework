<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addWebsite') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="websiteTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="websiteTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="websiteTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('cardId')" prop="card_id">
                        <el-select class="w-[280px]" v-model="websiteTable.searchParam.card_id" clearable :placeholder="t('cardIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in cardIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('industryId')" prop="industry_id">
                        <el-select class="w-[280px]" v-model="websiteTable.searchParam.industry_id" clearable :placeholder="t('industryIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in industryIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="websiteTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('phone')" prop="phone">
                        <el-input v-model="websiteTable.searchParam.phone" :placeholder="t('phonePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('wechatNum')" prop="wechat_num">
                        <el-input v-model="websiteTable.searchParam.wechat_num" :placeholder="t('wechatNumPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('address')" prop="address">
                        <el-input v-model="websiteTable.searchParam.address" :placeholder="t('addressPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="websiteTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadWebsiteList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="websiteTable.data" size="large" v-loading="websiteTable.loading">
                    <template #empty>
                        <span>{{ !websiteTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" fixed :label="t('id')" width="50" :show-overflow-tooltip="true"/>

                    <el-table-column :label="t('status')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="card_id_name" :label="t('cardId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="team_card_ids" :label="t('teamCardIds')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="industry_id_name" :label="t('industryId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="name" :label="t('name')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="phone" :label="t('phone')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="wechat_num" :label="t('wechatNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('weixinImage')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.weixin_image" :src="img(row.weixin_image)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" :label="t('address')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('logo')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.logo" :src="img(row.logo)" />
                            <el-avatar v-else icon="UserFilled" />
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
                    <el-pagination v-model:current-page="websiteTable.page" v-model:page-size="websiteTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="websiteTable.total"
                        @size-change="loadWebsiteList()" @current-change="loadWebsiteList" />
                </div>
            </div>

            <edit ref="editWebsiteDialog" @complete="loadWebsiteList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getWebsiteList, deleteWebsite, getWithUserList, getWithCardList, getWithIndustryList } from '@/addon/ttcard/api/website'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/website/components/website-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let websiteTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "status":"",
      "user_id":"",
      "card_id":"",
      "team_card_ids":"",
      "industry_id":"",
      "name":"",
      "phone":"",
      "wechat_num":"",
      "address":"",
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

/**
 * 获取微官网管理列表
 */
const loadWebsiteList = (page: number = 1) => {
    websiteTable.loading = true
    websiteTable.page = page

    getWebsiteList({
        page: websiteTable.page,
        limit: websiteTable.limit,
         ...websiteTable.searchParam
    }).then(res => {
        websiteTable.loading = false
        websiteTable.data = res.data.data
        websiteTable.total = res.data.total
    }).catch(() => {
        websiteTable.loading = false
    })
}
loadWebsiteList()

const editWebsiteDialog: Record<string, any> | null = ref(null)

/**
 * 添加微官网管理
 */
const addEvent = () => {
    editWebsiteDialog.value.setFormData()
    editWebsiteDialog.value.showDialog = true
}

/**
 * 编辑微官网管理
 * @param data
 */
const editEvent = (data: any) => {
    editWebsiteDialog.value.setFormData(data)
    editWebsiteDialog.value.showDialog = true
}

/**
 * 删除微官网管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('websiteDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteWebsite(id).then(() => {
            loadWebsiteList()
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
    const industryIdList = ref([])
    const setIndustryIdList = async () => {
    industryIdList.value = await (await getWithIndustryList({})).data
    }
    setIndustryIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadWebsiteList()
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
