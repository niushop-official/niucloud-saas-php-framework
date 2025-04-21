<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addAuthentication') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="authenticationTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('examineStatus')" prop="examine_status">
                        <el-select class="w-[280px]" v-model="authenticationTable.searchParam.examine_status" clearable :placeholder="t('examineStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in examine_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('ordertypeId')" prop="ordertype_id">
                        <el-select class="w-[280px]" v-model="authenticationTable.searchParam.ordertype_id" clearable :placeholder="t('ordertypeIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in ordertypeIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['real_id']"
                                   />
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="authenticationTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item> -->

                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="authenticationTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('websiteId')" prop="website_id">
                        <el-select class="w-[280px]" v-model="authenticationTable.searchParam.website_id" clearable :placeholder="t('websiteIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in websiteIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    

                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="authenticationTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('idcardNum')" prop="idcard_num">
                        <el-input v-model="authenticationTable.searchParam.idcard_num" :placeholder="t('idcardNumPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('tips')" prop="tips">
                        <el-input v-model="authenticationTable.searchParam.tips" :placeholder="t('tipsPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="authenticationTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadAuthenticationList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="authenticationTable.data" fit size="large" v-loading="authenticationTable.loading">
                    <template #empty>
                        <span>{{ !authenticationTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" fixed :label="t('id')"  align="center" width="80" :show-overflow-tooltip="true"/>

                    <el-table-column prop="ordertype_id_name" :label="t('ordertypeId')" width="120" :show-overflow-tooltip="true"/>
                    <el-table-column :label="t('examineStatus')" width="110" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in examine_statusList">
                                <div v-if="item.value == row.examine_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="website_id_name" :label="t('websiteId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                  

                    <el-table-column prop="name" :label="t('name')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="idcard_num" :label="t('idcardNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('idcardZImage')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.idcard_z_image" :src="img(row.idcard_z_image)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>
                     <el-table-column :label="t('idcardFImage')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.idcard_f_image" :src="img(row.idcard_f_image)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>
                     <el-table-column :label="t('businesslicenseImage')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.businesslicense_image" :src="img(row.businesslicense_image)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="tips" :label="t('tips')" min-width="120" :show-overflow-tooltip="true"/>
                    <!-- <el-table-column :label="t('status')" width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column> -->
                    
                     <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    
                     <el-table-column :label="t('updateTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.update_time || '' }}
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
                    <el-pagination v-model:current-page="authenticationTable.page" v-model:page-size="authenticationTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="authenticationTable.total"
                        @size-change="loadAuthenticationList()" @current-change="loadAuthenticationList" />
                </div>
            </div>

            <edit ref="editAuthenticationDialog" @complete="loadAuthenticationList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getAuthenticationList, deleteAuthentication, getWithUserList, getWithWebsiteList,getWithOrdertypeList } from '@/addon/ttcard/api/authentication'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/authentication/components/authentication-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let authenticationTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "status":"",
      "examine_status":"",
      "user_id":"",
      "website_id":"",
      "ordertype_id":"",
      "ordertype_diyname":"",
      "name":"",
      "idcard_num":"",
      "tips":"",
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
    const examine_statusList = ref([] as any[])
    const examine_statusDictList = async () => {
    examine_statusList.value = await (await useDictionary('认证审核')).data.dictionary
    }
    examine_statusDictList();
    const ordertype_diynameList = ref([] as any[])
    const ordertype_diynameDictList = async () => {
    ordertype_diynameList.value = await (await useDictionary('认证收费类型')).data.dictionary
    }
    ordertype_diynameDictList();

/**
 * 获取认证信息管理列表
 */
const loadAuthenticationList = (page: number = 1) => {
    authenticationTable.loading = true
    authenticationTable.page = page

    getAuthenticationList({
        page: authenticationTable.page,
        limit: authenticationTable.limit,
         ...authenticationTable.searchParam
    }).then(res => {
        authenticationTable.loading = false
        authenticationTable.data = res.data.data
        authenticationTable.total = res.data.total
    }).catch(() => {
        authenticationTable.loading = false
    })
}
loadAuthenticationList()

const editAuthenticationDialog: Record<string, any> | null = ref(null)

/**
 * 添加认证信息管理
 */
const addEvent = () => {
    editAuthenticationDialog.value.setFormData()
    editAuthenticationDialog.value.showDialog = true
}

/**
 * 编辑认证信息管理
 * @param data
 */
const editEvent = (data: any) => {
    editAuthenticationDialog.value.setFormData(data)
    editAuthenticationDialog.value.showDialog = true
}

/**
 * 删除认证信息管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('authenticationDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteAuthentication(id).then(() => {
            loadAuthenticationList()
        }).catch(() => {
        })
    })
}

    
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const websiteIdList = ref([])
    const setWebsiteIdList = async () => {
    websiteIdList.value = await (await getWithWebsiteList({})).data
    }
    setWebsiteIdList()

    const ordertypeIdList = ref([])
    const setOrdertypeIdList = async () => {
    ordertypeIdList.value = await (await getWithOrdertypeList({})).data
    }
    setOrdertypeIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadAuthenticationList()
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
