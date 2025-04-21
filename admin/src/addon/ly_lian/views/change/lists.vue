<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addLianChange') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="lianChangeTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberId')" prop="search">
                        <el-input v-model="lianChangeTable.searchParam.search" :placeholder="t('memberIdPlaceholder')" />
                    </el-form-item>
                    <!-- <el-form-item :label="t('pid')" prop="pid">
                        <el-input v-model="lianChangeTable.searchParam.pid" :placeholder="t('pidPlaceholder')" />
                    </el-form-item> -->
                    <!-- <el-form-item :label="t('lianPid')" prop="lian_pid">
                        <el-input v-model="lianChangeTable.searchParam.lian_pid" :placeholder="t('lianPidPlaceholder')" />
                    </el-form-item> -->
                    <!-- <el-form-item :label="t('newLianPid')" prop="new_lian_pid">
                        <el-input v-model="lianChangeTable.searchParam.new_lian_pid" :placeholder="t('newLianPidPlaceholder')" />
                    </el-form-item> -->

                    <el-form-item :label="t('levelId')" prop="level_id">
                        <el-select class="" v-model="lianChangeTable.searchParam.level_id" clearable :placeholder="t('levelIdPlaceholder')">  
                            <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item :label="t('childMid')" prop="child_mid">
                        <el-input v-model="lianChangeTable.searchParam.child_mid" :placeholder="t('childMidPlaceholder')" />
                    </el-form-item> -->
                    <!-- <el-form-item :label="t('childType')" prop="child_type">
                        <el-select class="" v-model="lianChangeTable.searchParam.child_type" clearable :placeholder="t('childTypePlaceholder')">
                            <el-option label="全部" value=""></el-option>
                    
                        </el-select>
                    </el-form-item> -->
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="lianChangeTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadLianChangeList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="lianChangeTable.data" size="large" v-loading="lianChangeTable.loading">
                    <template #empty>
                        <span>{{ !lianChangeTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('ID')" min-width="80" :show-overflow-tooltip="true"/>

                    <el-table-column prop="member_id" :label="t('memberId')" min-width="180">
                        <template #default="{ row }">
                            <div v-if="row.lianMember" class="flex items-center cursor-pointer" @click="toMember(row.lianMember.member_id)">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.lianMember && row.lianMember.headimg" class="w-[50px] h-[50px]" :src="img(row.lianMember.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span v-if="row.lianMember.nickname" :title="row.lianMember.nickname" class="multi-hidden">{{row.lianMember.nickname}}</span>
                                    <span v-else :title="row.lianMember.nickname" class="multi-hidden">{{row.lianMember.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.lianMember.mobile}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <!-- 直推上级 -->
                    <el-table-column prop="pid" :label="t('pid')" min-width="180">
                        <template #default="{ row }">
                            <div v-if="row.parentMember" class="flex items-center cursor-pointer" @click="toMember(row.parentMember.member_id)">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.parentMember && row.parentMember.headimg" class="w-[50px] h-[50px]" :src="img(row.parentMember.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span v-if="row.parentMember.nickname" :title="row.parentMember.nickname" class="multi-hidden">{{row.parentMember.nickname}}</span>
                                    <span v-else :title="row.parentMember.nickname" class="multi-hidden">{{row.parentMember.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.parentMember.mobile}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <!-- 链动上级 -->
                    <el-table-column prop="lian_pid" :label="t('lianPid')" min-width="180">
                        <template #default="{ row }">
                            <div v-if="row.lianParent" class="flex items-center cursor-pointer" @click="toMember(row.lianParent.member_id)">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.lianParent && row.lianParent.headimg" class="w-[50px] h-[50px]" :src="img(row.lianParent.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span v-if="row.lianParent.nickname" :title="row.lianParent.nickname" class="multi-hidden">{{row.lianParent.nickname}}</span>
                                    <span v-else :title="row.lianParent.nickname" class="multi-hidden">{{row.lianParent.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.lianParent.mobile}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <!-- 新链动上级 -->
                    <el-table-column prop="new_lian_pid" :label="t('newLianPid')" min-width="180">
                        <template #default="{ row }">
                            <div v-if="row.newLianParent" class="flex items-center cursor-pointer" @click="toMember(row.newLianParent.member_id)">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.newLianParent && row.newLianParent.headimg" class="w-[50px] h-[50px]" :src="img(row.newLianParent.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span v-if="row.newLianParent.nickname" :title="row.newLianParent.nickname" class="multi-hidden">{{row.newLianParent.nickname}}</span>
                                    <span v-else :title="row.newLianParent.nickname" class="multi-hidden">{{row.newLianParent.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.newLianParent.mobile}}</span>
                                </div>
                            </div>
                            <div v-else>
                                <span class="text-gray-400">{{t('noData')}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <!-- 链动等级 -->
                    <el-table-column :label="t('levelId')" min-width="120">
                        <template #default="{ row }">
                            <div v-if="row.lianLevel" class="cursor-pointer price-wrap" >
                                <span>{{row.lianLevel.level_name}}</span>
                                <!-- <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon> -->
                            </div>
                        </template>
                    </el-table-column>
                    
                    <!-- <el-table-column prop="child_mid" :label="t('childMid')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                    <!-- <el-table-column prop="child_type" :label="t('childType')" min-width="100">
                        <template #default="{ row }">
                            {{ row.child_type === 0? '直推' : row.child_type === 1? '继承' : row.child_type === 2? '离队' : row.child_type === 3? '老板' : '' }}
                        </template>
                    </el-table-column> -->

                    <el-table-column prop="create_time" :label="t('createTime')" min-width="180">
                        <template #default="{ row }">
                            {{row.create_time}}
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
                    <el-pagination v-model:current-page="lianChangeTable.page" v-model:page-size="lianChangeTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="lianChangeTable.total"
                        @size-change="loadLianChangeList()" @current-change="loadLianChangeList" />
                </div>
            </div>

            
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getLianChangeList, deleteLianChange } from '@/addon/ly_lian/api/change'
import { getLevelList } from "@/addon/ly_lian/api/level"
import { img } from '@/utils/common'
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

const config :Record<string, any> = reactive({
    leveList: [],
})

let lianChangeTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
        "search": "",
      "member_id":"",
      "pid":"",
      "lian_pid":"",
      "new_lian_pid":"",
      "level_id":"",
      "child_mid":"",
      "child_type":"",
      "create_time":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取链动2+1关系变动列表
 */
const loadLianChangeList = (page: number = 1) => {
    lianChangeTable.loading = true
    lianChangeTable.page = page

    getLianChangeList({
        page: lianChangeTable.page,
        limit: lianChangeTable.limit,
         ...lianChangeTable.searchParam
    }).then(res => {
        lianChangeTable.loading = false
        lianChangeTable.data = res.data.data
        lianChangeTable.total = res.data.total
    }).catch(() => {
        lianChangeTable.loading = false
    })
}
loadLianChangeList()

const router = useRouter()

// 获取链动等级
const getLevelListFn = (bool=false) => {
    getLevelList({
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
getLevelListFn()

/**
 * 添加链动2+1关系变动
 */
const addEvent = () => {
    router.push('/ly_lian/lian_change_edit')
}

/**
 * 编辑链动2+1关系变动
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/ly_lian/lian_change_edit?id='+data.id)
}

// 跳转会员详情
const toMember = (id:number) => {
    const routeData = router.resolve(`/member/detail?id=${id}`)
    window.open(routeData.href, '_blank')
}  

/**
 * 删除链动2+1关系变动
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('lianChangeDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteLianChange(id).then(() => {
            loadLianChangeList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadLianChangeList()
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