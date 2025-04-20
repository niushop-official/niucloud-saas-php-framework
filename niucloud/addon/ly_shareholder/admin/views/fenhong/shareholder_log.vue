<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addShareholderLog') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="shareholderLogTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberId')" prop="search">
                        <el-input v-model="shareholderLogTable.searchParam.search" :placeholder="t('memberIdPlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('shareholderLevel')" prop="level_id">
                        <el-select v-model="shareholderLogTable.searchParam.level_id" class="input-width" clearable :placeholder="t('shareholderLevelPlaceholder')">
                            <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="shareholderLogTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadShareholderLogList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="shareholderLogTable.data" size="large" v-loading="shareholderLogTable.loading">
                    <template #empty>
                        <span>{{ !shareholderLogTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('ID')" min-width="100" :show-overflow-tooltip="true"/>

                    <!-- <el-table-column prop="member_id" :label="t('memberId')" min-width="120" :show-overflow-tooltip="true"/> -->

                    <el-table-column prop="goods_id" :label="t('memberInfo')" min-width="200">
                        <template #default="{ row }">
                            <div v-if="row.member" class="flex items-center cursor-pointer" @click="toMember(row.member_id)">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.member && row.member.headimg" class="w-[50px] h-[50px]" :src="img(row.member.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span v-if="row.member.nickname" :title="row.member.nickname" class="multi-hidden">{{row.member.nickname}}</span>
                                    <span v-else :title="row.member.nickname" class="multi-hidden">{{row.member.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.member.mobile}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="order_amount" :label="t('orderAmount')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="rate" :label="t('rate')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="level_name" :label="t('teamLevelName')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="level_num" :label="t('levelNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="amount" :label="t('amount')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="is_settlement" :label="t('isSettlement')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <span v-if="row.is_settlement == 0" class="text-[#F52222]">{{ t('isSettlement0') }}</span>  
                            <span v-else class="text-[#1890FF]">{{ t('isSettlement1') }}</span> 
                        </template>
                    </el-table-column>


                    <el-table-column prop="is_send" :label="t('isSend')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <span v-if="row.is_send == 0" class="text-[#F52222]">{{ t('isSend0') }}</span>  
                            <span v-else class="text-[#1890FF]">{{ t('isSend1') }}</span>
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
                    <el-pagination v-model:current-page="shareholderLogTable.page" v-model:page-size="shareholderLogTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="shareholderLogTable.total"
                        @size-change="loadShareholderLogList()" @current-change="loadShareholderLogList" />
                </div>
            </div>

            <edit ref="editShareholderLogDialog" @complete="loadShareholderLogList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getShareholderLogList, deleteShareholderLog } from '@/addon/ly_shareholder/api/shareholder'
import { getShareholderLevelList } from '@/addon/ly_shareholder/api/level'
import { img } from '@/utils/common'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import Edit from '@/addon/ly_shareholder/views/fenhong/components/shareholder-log-edit.vue'
import { useRoute, useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title;
const config :Record<string, any> = reactive({
    leveList: [],
})

let shareholderLogTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
        search: '',
        level_id: '',
        member_id:'',
    //   "shareholder_level_name":"",
        create_time:[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取股东分红记录列表
 */
const loadShareholderLogList = (page: number = 1) => {
    shareholderLogTable.loading = true
    shareholderLogTable.page = page

    getShareholderLogList({
        page: shareholderLogTable.page,
        limit: shareholderLogTable.limit,
         ...shareholderLogTable.searchParam
    }).then(res => {
        shareholderLogTable.loading = false
        shareholderLogTable.data = res.data.data
        shareholderLogTable.total = res.data.total
    }).catch(() => {
        shareholderLogTable.loading = false
    })
}
loadShareholderLogList()

const editShareholderLogDialog: Record<string, any> | null = ref(null)

// 获取股东等级
const getShareholderLevelListFn = (bool=false) => {
    getShareholderLevelList({
        page: 1,
        limit: 11
    }).then((res:any) => {
        config.leveList = res.data.data
        if(bool){
            ElMessage({
                message: t('refreshSuccess'),
                type: 'success'
            })
        }
    })
}
getShareholderLevelListFn()


/**
 * 添加股东分红记录
 */
const addEvent = () => {
    editShareholderLogDialog.value.setFormData()
    editShareholderLogDialog.value.showDialog = true
}

/**
 * 编辑股东分红记录
 * @param data
 */
const editEvent = (data: any) => {
    editShareholderLogDialog.value.setFormData(data)
    editShareholderLogDialog.value.showDialog = true
}

// 跳转会员详情
const toMember = (id:number) => {
    const routeData = router.resolve(`/member/detail?id=${id}`)
    window.open(routeData.href, '_blank')
}


/**
 * 删除股东分红记录
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('shareholderLogDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteShareholderLog(id).then(() => {
            loadShareholderLogList()
        }).catch(() => {
        })
    })
}

    
    const shareholderLevelNameList = ref([])
    const setShareholderLevelNameList = async () => {
    shareholderLevelNameList.value = await (await getShareholderLevelList({})).data
    }
    setShareholderLevelNameList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    shareholderLogTable.searchParam.level_id = '' // 或者其他初始值
    loadShareholderLogList()
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