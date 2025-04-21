<template>
	<div class="main-container p-4">	

        <!-- 链动会员列表 -->
        <div v-if="activeName == 'lists'">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addLianMember') }}
                </el-button> -->
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="fenxiaoTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberName')" prop="search">
                        <el-input v-model="fenxiaoTable.searchParam.search" :placeholder="t('memberNamePlaceholder')" maxlength="60" />
                    </el-form-item>
                    <el-form-item :label="t('memberLevel')" prop="level_id">
                        <el-select v-model="fenxiaoTable.searchParam.level_id" class="input-width" clearable :placeholder="t('memberLevelPlaceholder')">
                            <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('memberState')" prop="status">
                        <el-select v-model="fenxiaoTable.searchParam.status" class="input-width" clearable :placeholder="t('memberStatePlaceholder')">
                            <el-option v-for="item in config.statusList" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
						<el-date-picker v-model="fenxiaoTable.searchParam.create_time" type="datetimerange"
							value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
					</el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="getMemberListFn()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-table :data="fenxiaoTable.data" size="large" v-loading="fenxiaoTable.loading" ref="goodsListTableRef" @selection-change="handleSelectionChange">
                <template #empty>
                    <span>{{ !fenxiaoTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <!-- <el-table-column type="selection" width="55" /> -->
                 <el-table-column prop="id" :label="t('ID')"></el-table-column>

                <el-table-column prop="member_id" :label="t('memberInfo')" min-width="200">
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
                <el-table-column prop="pid" :label="t('parentInfo')" min-width="200">
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
                <el-table-column prop="lian_pid" :label="t('lianParentInfo')" min-width="200">
                    <template #default="{ row }">
                        <div v-if="row.lianParentMember" class="flex items-center cursor-pointer" @click="toMember(row.lianParentMember.member_id)">
                            <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                <el-image v-if="row.lianParentMember && row.lianParentMember.headimg" class="w-[50px] h-[50px]" :src="img(row.lianParentMember.headimg)" fit="contain">
                                    <template #error>
                                        <div class="image-slot">
                                            <img class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" />
                                        </div>
                                    </template>
                                </el-image>
                                <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" fit="contain" />
                            </div>
                            <div class="ml-2">
                                <span v-if="row.lianParentMember.nickname" :title="row.lianParentMember.nickname" class="multi-hidden">{{row.lianParentMember.nickname}}</span>
                                <span v-else :title="row.lianParentMember.nickname" class="multi-hidden">{{row.lianParentMember.username}}</span>
                                <span class="text-primary text-[12px]">{{row.lianParentMember.mobile}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column :label="t('lianLevel')" min-width="120">
                    <template #default="{ row }">
                        <!-- <div v-if="row.lianLevel" class="cursor-pointer price-wrap" @click="editLevelEvent(row)"> -->
                        <div v-if="row.lianLevel" class="cursor-pointer price-wrap" >
                            <span>{{row.lianLevel.level_name}}</span>
                            <!-- <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon> -->
                        </div>
                    </template>
                </el-table-column>

                <el-table-column :label="t('childMid')" min-width="150">
                    <template #default="{ row }">
                        <div class="flex flex-col text-[28rpx]" >
                            <span>直推1：{{ row.child_mid1 }}</span>
                            <span>直推2：{{ row.child_mid2 }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="commission" :label="t('commission')" min-width="120" :show-overflow-tooltip="true"/>

                <el-table-column prop="give_commission" :label="t('giveCommission')" min-width="120" :show-overflow-tooltip="true"/>
                    
                <el-table-column prop="frozen_commission" :label="t('frozenCommission')" min-width="120" :show-overflow-tooltip="true"/>

                <el-table-column prop="thaw_status" :label="t('thawStatus')" min-width="120">
                    <template #default="{ row }">
                        {{ row.thaw_status === 0? '未完成' : (row.thaw_status === 1? '任务完成' : '') }}
                    </template>
                </el-table-column>

                <!-- <el-table-column prop="status" :label="t('currentState')" min-width="100">
                    <template #default="{ row }">
                        {{ row.status === 0? '正常' : (row.status === 1? '冻结' : '') }}
                    </template>
                </el-table-column> -->
                    
                <el-table-column :label="t('upTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                    <template #default="{ row }">
                        {{ row.up_time || '' }}
                    </template>
                </el-table-column>
                    
                <el-table-column :label="t('operation')" fixed="right" min-width="70">
                    <template #default="{ row }">
                        <!-- <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button> -->
                        <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                    </template>
                </el-table-column>
 
                <el-table-column prop="create_time" :label="t('createTime')" min-width="180">
                    <template #default="{ row }">
                        {{row.create_time}}
                    </template>
                </el-table-column>
                
                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="60">
                    <template #default="{ row }">
                        <!-- <el-button type="primary" link @click="detailEvent(row.shareholder_id)">{{ t('detail') }}</el-button> -->
                        <el-button v-if="row.status===1" type="primary" link @click="freezeOrRestoreEvent(row)">{{ t('freeze') }}</el-button>
                        <el-button v-if="row.status===-1" type="primary" link @click="freezeOrRestoreEvent(row)">{{ t('restore') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="fenxiaoTable.page" v-model:page-size="fenxiaoTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="fenxiaoTable.total"
                    @size-change="getMemberListFn()" @current-change="getMemberListFn" />
            </div>
        </div>
        
       
        <!-- 编辑等级弹窗 -->
        <el-dialog v-model="lianLevelDialog" :title="t('editLianLevelTitle')" width="470px" :close-on-press-escape="false" :destroy-on-close="true" :close-on-click-modal="false">
            <div>
                <el-form-item :label="t('lianLevel')">
                    <el-select v-model="formData.level_id" class="input-width" clearable :placeholder="t('lianLevelPlaceholder')">
                        <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                    </el-select>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="getLevelListFn(true)">刷新</span>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="addLevelFn">添加等级</span>
                </el-form-item>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="lianLevelDialog=false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="lianLevelSubmit">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 选择分销商弹窗 -->
        <!-- <fenxiao-of-select-popup :title="t('editSupFenxiaoTitle')" ref="fenxiaoOfSelectPopupRef" :params="params" @load="selectFenxiaoCallbackFn" /> -->
	</div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { useDictionary } from "@/app/api/dict";
import { img, moneyFormat } from '@/utils/common'
import { cloneDeep } from 'lodash-es'
import { getMemberList, editMember, deleteMember } from '@/addon/ly_lian/api/member'
import { getLevelList } from '@/addon/ly_lian/api/level'
// import fenxiaoOfSelectPopup from '@/addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const config :Record<string, any> = reactive({
    leveList: [],
    statusList: [
        { label: '正常', value: 1 },
        { label: '已冻结', value: 0 }
    ],
    applyStatus: []
})
// 弹窗
const lianLevelDialog = ref(false)

const fenxiaoTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [{}],
    searchParam: {
        search: '',
        level_id: '',
        status: '',
        create_time: []
    }
})

const activeName = ref('lists')

//字典数据

// 添加链动会员
const addEvent = () => {
    router.push('/ly_lian/member_edit')
}
const getMemberListFn = (page: number = 1) => {
    fenxiaoTable.loading = true
    fenxiaoTable.page = page
    getMemberList({
        page: fenxiaoTable.page,
        limit: fenxiaoTable.limit,
        ...fenxiaoTable.searchParam
    }).then((res:any) => {
        fenxiaoTable.data = res.data.data
        fenxiaoTable.total = res.data.total
        fenxiaoTable.loading = false
    }).catch(() => {
        fenxiaoTable.loading = false
    })
}
getMemberListFn()

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

//跳转链动等级列表页面
const addLevelFn = ()=>{
    const routeData = router.resolve('/ly_lian/level')
    window.open(routeData.href)
}

const formData: Record<string, any> = reactive({
    id: 0,
    level_id: null,
    parent: null,
    status: 1
})
const params:Record<string, any> = reactive({
    not_in: formData.parent,
    is_agent: 'all'
})
const setFormData = (value:any) => {
    const data = cloneDeep(value)
    formData.id = data.member_id
    formData.level_id = data.level_id
    // formData.parent = data.parent
    params.not_in = [data.parent,data.member_id]
    formData.status = data.status
}
// 打开链动等级弹框
const editLevelEvent = (data:any) => {
    setFormData(data)
    lianLevelDialog.value = true
}
// 编辑分销等级回调
const lianLevelSubmit = () => {
    lianLevelDialog.value = false
    if (!formData.level_id) {
        ElMessage.error(t('lianLevelPlaceholder'))
        return
    }
    fenxiaoSubmit()
}
// 选择上级分销商弹框
const fenxiaoOfSelectPopupRef = ref<any>()
const editSupEvent = (row:any) => {
    setFormData(row)
    fenxiaoOfSelectPopupRef.value?.show()
}
// 选择回调
const selectFenxiaoCallbackFn = (row: any) => {
    formData.parent = row.member.member_id
    formData.parent_name = row.member.nickname
    ElMessageBox.confirm(t('editSupFenxiaoTip'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        fenxiaoSubmit()
    })
}
// 冻结
const freezeOrRestoreEvent = (row:any) => {
    setFormData(row)
    ElMessageBox.confirm(formData.status === 1 ? t('freezeTip') : t('restoreTip'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        formData.status = formData.status === 1 ? -1 : 1
        fenxiaoSubmit()
    })
}
const fenxiaoSubmit = () => {
    editMember(formData).then(() => {
        getMemberListFn()
    })
}
// 查看链动会员详情
const detailEvent = (row:any) => {
    setFormData(row)
    router.push('/ly_lian/detail?id=' + formData.id)
}
// 重置查询
const searchFormRef = ref()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    getMemberListFn()
}



// 重置查询

// 跳转会员详情
const toMember = (id:number) => {
    const routeData = router.resolve(`/member/detail?id=${id}`)
    window.open(routeData.href, '_blank')
}


/**
 * 删除会员
 */
 const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('memberDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteMember(id).then(() => {
            getMemberListFn()
        }).catch(() => {
        })
    })
}


</script>

<style lang="scss" scoped></style>
