<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="memberTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberName')" prop="keyword">
                        <el-input v-model.trim="memberTable.searchParam.keyword" :placeholder="t('memberNamePlaceholder')" maxlength="60" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadMemberList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-table :data="memberTable.data" size="large" v-loading="memberTable.loading" ref="goodsListTableRef">
                <template #empty>
                    <span>{{ !memberTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column type="selection" width="55" />
                <el-table-column prop="goods_id" :label="t('memberInfo')" min-width="200">
                    <template #default="{ row }">
                        <div class="flex items-center cursor-pointer" @click="detailEvent(row.member_id)">
                            <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                <el-image v-if="row.member.headimg" class="w-[50px] h-[50px]" :src="img(row.member.headimg)" fit="contain">
                                    <template #error>
                                        <div class="image-slot">
                                            <img class="w-[50px] h-[50px] rounded-full" src="@/app/assets/images/member_head.png" alt="">
                                        </div>
                                    </template>
                                </el-image>
                                <img class="w-[50px] h-[50px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                            </div>
                            <div class="ml-2">
                                <span :title="(row.member.nickname || row.member.username)" class="multi-hidden">{{row.member.nickname || row.member.username}}</span>
                                <span class="text-primary text-[12px]">{{row.member.mobile || '--'}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="t('isFenxiao')" min-width="120">
                    <template #default="{ row }">
                        {{row.is_fenxiao ? t('are') :  t('no')}}
                    </template>
                </el-table-column>
                <el-table-column :label="t('bindingSupFenxiao')" min-width="120" >
                    <template #default="{ row }">
                        <div class="cursor-pointer stock-wrap" @click="editSupEvent(row)">
                            <span>{{ row.parent_fenxiao && row.parent_fenxiao.nickname || row.parent_fenxiao && row.parent_fenxiao.username || '--'}}</span>
                            <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="order_num" :label="t('consumptionNumber')" min-width="100" sortable="custom" />
                <el-table-column :label="t('consumptionMoney')" min-width="100" sortable="custom">
                    <template #default="{ row }">
                        {{moneyFormat(row.order_money_sum)}}
                    </template>
                </el-table-column>
                <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="detailEvent(row.member_id)">{{ t('detail') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="memberTable.page" v-model:page-size="memberTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="memberTable.total"
                    @size-change="loadMemberList" @current-change="loadMemberList" />
            </div>
        </el-card>

        <!-- 编辑等级弹窗 -->
        <el-dialog v-model="supFenxiaoDialog" :title="t('editSupFenxiaoTitle')" width="400px" :destroy-on-close="true" :close-on-click-modal="false">
            <div>
                <el-form-item :label="t('supFenxiao')" prop="sup_fenxiao">
                    <el-cascader :props="supFenxiaoProps" v-model="fenxiaoTable.searchParam.sup_fenxiao"
                        :options="supFenxiaoOptions" :placeholder="t('supFenxiaoPlaceholder')"
                        clearable filterable />
                </el-form-item>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="supFenxiaoDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 选择分销商弹窗 -->
        <fenxiao-of-select-popup :title="t('editSupFenxiaoTitle')" ref="fenxiaoOfSelectPopupRef" :params="fenxiaoSelectParams" @load="selectFenxiaoCallbackFn" />
        <detail-member ref="detailMemberDialog"  @load="loadMemberList()"></detail-member>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { img, moneyFormat ,setTablePageStorage, getTablePageStorage} from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'
import { fenxiaoMemberPage, setModifyFenxiao, editFengxiao } from '@/addon/shop_fenxiao/api/fenxiao'
import { cloneDeep } from 'lodash-es'
import fenxiaoOfSelectPopup from '@/addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue'
import { ElMessageBox, FormInstance } from 'element-plus'
import detailMember from '@/app/views/member/components/detail-member.vue'

const route = useRoute()
const pageName = route.meta.title
const fenxiaoSelectParams = ref({})

// 上级分销
const supFenxiaoProps = ref('')
const supFenxiaoOptions = ref([])
// 弹窗
const supFenxiaoDialog = ref(false)

const memberTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        keyword: ''
    }
})

const loadMemberList = (page: number = 1) =>{
    memberTable.loading = true
    // memberTable.page = page

    const searchData = cloneDeep(memberTable.searchParam)
    fenxiaoMemberPage({
        page: memberTable.page,
        limit: memberTable.limit,
        ...searchData
    }).then((res:any)=>{
        memberTable.data = res.data.data
        memberTable.total = res.data.total
        memberTable.loading = false
        setTablePageStorage(memberTable.page, memberTable.limit, memberTable.searchParam);
    })
}
loadMemberList(getTablePageStorage(memberTable.searchParam).page)

const searchFormRef = ref()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()

    loadMemberList()
}

//查看会员详情
const detailMemberDialog: Record<string, any> | null = ref(null)
const detailEvent = (member_id:number)=>{
    let data = {id: member_id}
    detailMemberDialog.value.setFormData(data)
    detailMemberDialog.value.showDialog = true
}
let formData: Record<string, any> = reactive({})
//选择上级分销商弹框
const fenxiaoOfSelectPopupRef = ref<any>()
const fenxiaoOfSelectIndex = ref(0)
const editSupEvent = (row:any)=>{
    fenxiaoSelectParams.value = {}
    formData = {}
    fenxiaoOfSelectIndex.value = row.is_fenxiao
    if(!row.is_fenxiao){
        fenxiaoSelectParams.value.not_in = row.member_id
        formData.member_id = row.member_id
    }else{
        fenxiaoSelectParams.value.not_in = row.child_ids ? [row.member_id, row.parent_fenxiao.member_id,...row.child_ids] : [row.member_id, row.parent_fenxiao.member_id]
        fenxiaoSelectParams.value.is_agent = 'all'
        formData.id = row.member_id
    }
    fenxiaoOfSelectPopupRef.value?.show()
}

//选择回调
const selectFenxiaoCallbackFn = (row: any) => {
    if(!fenxiaoOfSelectIndex.value){
        formData.fenxiao_member_id = row.member_id
        ElMessageBox.confirm(t('editSupFenxiaoTip'), t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            setModifyFenxiao(formData).then(()=>{
                loadMemberList()
            })
        })
    }else{
        formData.parent = row.member.member_id
        formData.parent_name = row.member.nickname
        ElMessageBox.confirm(t('editSupFenxiaoTip'), t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            editFengxiao(formData).then(() => {
                loadMemberList()
            })
        })
    }
}
</script>

<style lang="scss" scoped></style>
