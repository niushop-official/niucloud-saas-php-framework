<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addCashier') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="cashierTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="cashierTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['member_id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('username')" prop="username">
                        <el-input v-model="cashierTable.searchParam.username" :placeholder="t('usernamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('nickname')" prop="nickname">
                        <el-input v-model="cashierTable.searchParam.nickname" :placeholder="t('nicknamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('mobile')" prop="mobile">
                        <el-input v-model="cashierTable.searchParam.mobile" :placeholder="t('mobilePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="" v-model="cashierTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                    
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-input v-model="cashierTable.searchParam.create_time" :placeholder="t('createTimePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('updateTime')" prop="update_time">
                        <el-input v-model="cashierTable.searchParam.update_time" :placeholder="t('updateTimePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadCashierList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="cashierTable.data" size="large" v-loading="cashierTable.loading">
                    <template #empty>
                        <span>{{ !cashierTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="username" :label="t('username')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="nickname" :label="t('nickname')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="avatar" :label="t('avatar')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="mobile" :label="t('mobile')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="status" :label="t('status')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="update_time" :label="t('updateTime')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="cashierTable.page" v-model:page-size="cashierTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="cashierTable.total"
                        @size-change="loadCashierList()" @current-change="loadCashierList" />
                </div>
            </div>

            <edit ref="editCashierDialog" @complete="loadCashierList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getCashierList, deleteCashier, getWithMemberList } from '@/addon/qiankun_cashier/api/cashier'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/qiankun_cashier/views/cashier/components/cashier-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let cashierTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "user_id":"",
      "username":"",
      "nickname":"",
      "mobile":"",
      "status":"",
      "create_time":"",
      "update_time":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取收银员列表
 */
const loadCashierList = (page: number = 1) => {
    cashierTable.loading = true
    cashierTable.page = page

    getCashierList({
        page: cashierTable.page,
        limit: cashierTable.limit,
         ...cashierTable.searchParam
    }).then(res => {
        cashierTable.loading = false
        cashierTable.data = res.data.data
        cashierTable.total = res.data.total
    }).catch(() => {
        cashierTable.loading = false
    })
}
loadCashierList()

const editCashierDialog: Record<string, any> | null = ref(null)

/**
 * 添加收银员
 */
const addEvent = () => {
    editCashierDialog.value.setFormData()
    editCashierDialog.value.showDialog = true
}

/**
 * 编辑收银员
 * @param data
 */
const editEvent = (data: any) => {
    editCashierDialog.value.setFormData(data)
    editCashierDialog.value.showDialog = true
}

/**
 * 删除收银员
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('cashierDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteCashier(id).then(() => {
            loadCashierList()
        }).catch(() => {
        })
    })
}

    
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithMemberList({})).data
    }
    setUserIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCashierList()
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
