<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addUser') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="userTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="userTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('username')" prop="username">
                        <el-input v-model="userTable.searchParam.username" :placeholder="t('usernamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('nickname')" prop="nickname">
                        <el-input v-model="userTable.searchParam.nickname" :placeholder="t('nicknamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('phone')" prop="phone">
                        <el-input v-model="userTable.searchParam.phone" :placeholder="t('phonePlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('ordertypeId')" prop="ordertype_id">
                        <el-select class="w-[280px]" v-model="userTable.searchParam.ordertype_id" clearable :placeholder="t('ordertypeIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in ordertypeIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['real_id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('expirationtime')" prop="expirationtime">
                        <el-date-picker v-model="userTable.searchParam.expirationtime" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('gradeStatus')" prop="grade_status">
                        <el-select class="w-[280px]" v-model="userTable.searchParam.grade_status" clearable :placeholder="t('gradeStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in grade_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="userTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadUserList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="userTable.data" size="large" v-loading="userTable.loading">
                    <template #empty>
                        <span>{{ !userTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" fixed :label="t('id')" width="50" :show-overflow-tooltip="true"/>

                    <el-table-column :label="t('avatar')" width="120" align="center">
                        <template #default="{ row }">
                            <el-avatar v-if="row.avatar" :src="img(row.avatar)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>

                    <el-table-column prop="nickname" :label="t('nickname')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column :label="t('status')" width="100" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="phone" :label="t('phone')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="ordertype_id_name" :label="t('ordertypeId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('gradeStatus')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in grade_statusList">
                                <div v-if="item.value == row.grade_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('expirationtime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.expirationtime || '' }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="username" :label="t('username')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="openid" :label="t('openid')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('prelogintime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.prelogintime || '' }}
                        </template>
                    </el-table-column>
                    
                     <el-table-column :label="t('logintime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.logintime || '' }}
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
                    <el-pagination v-model:current-page="userTable.page" v-model:page-size="userTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="userTable.total"
                        @size-change="loadUserList()" @current-change="loadUserList" />
                </div>
            </div>

            <edit ref="editUserDialog" @complete="loadUserList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getUserList, deleteUser, getWithOrdertypeList } from '@/addon/ttcard/api/user'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/user/components/user-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let userTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "status":"",
      "username":"",
      "nickname":"",
      "phone":"",
      "ordertype_id":"",
      "expirationtime":"",
      "grade_status":"",
      "prelogintime":"",
      "logintime":"",
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
    const grade_statusList = ref([] as any[])
    const grade_statusDictList = async () => {
    grade_statusList.value = await (await useDictionary('会员等级状态')).data.dictionary
    }
    grade_statusDictList();

/**
 * 获取用户管理列表
 */
const loadUserList = (page: number = 1) => {
    userTable.loading = true
    userTable.page = page

    getUserList({
        page: userTable.page,
        limit: userTable.limit,
         ...userTable.searchParam
    }).then(res => {
        userTable.loading = false
        userTable.data = res.data.data
        userTable.total = res.data.total
    }).catch(() => {
        userTable.loading = false
    })
}
loadUserList()

const editUserDialog: Record<string, any> | null = ref(null)

/**
 * 添加用户管理
 */
const addEvent = () => {
    editUserDialog.value.setFormData()
    editUserDialog.value.showDialog = true
}

/**
 * 编辑用户管理
 * @param data
 */
const editEvent = (data: any) => {
    editUserDialog.value.setFormData(data)
    editUserDialog.value.showDialog = true
}

/**
 * 删除用户管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('userDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteUser(id).then(() => {
            loadUserList()
        }).catch(() => {
        })
    })
}

    
    const ordertypeIdList = ref([])
    const setOrdertypeIdList = async () => {
    ordertypeIdList.value = await (await getWithOrdertypeList({})).data
    }
    setOrdertypeIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadUserList()
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
