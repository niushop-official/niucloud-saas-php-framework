<template>
    <!--核销员-->
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="addEvent">{{ t('addVerifier') }}</el-button>
            </div>

            <div class="mt-[20px]">
                <el-table :data="verifierTable.data" size="large" v-loading="verifierTable.loading">
                    <template #empty>
                        <span>{{ !verifierTable.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column :label="t('memberInfo')" min-width="120">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer " @click="toMember(row.member.member_id)" v-if="row.member">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.member.headimg" :src="img(row.member.headimg)" alt="">
                                <img class="w-[50px] h-[50px] mr-[10px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                                <div class="flex flex flex-col">
                                    <span>{{ row.member.nickname || '' }}</span>
                                    <span>{{ row.member.mobile || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('verifyType')" min-width="120">
                        <template #default="{ row }">
                            <div class="flex flex-col">
                                <div v-for="(item, key) in row.verify_type_array" class="my-[3px]" :key="key">
                                    {{ item.verify_type_name }}
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('createTime')" prop="create_time" min-width="120" />

                    <el-table-column :label="t('operation')" fixed="right" align="right" width="100">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="verifierTable.page" v-model:page-size="verifierTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="verifierTable.total"
                        @size-change="loadVerifierList()" @current-change="loadVerifierList" />
                </div>
            </div>
        </el-card>

        <el-dialog v-model="showDialog" :title="t('addVerifier')" width="500px" :destroy-on-close="true">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="addLoading">
                <el-form-item :label="t('member')" prop="member_id">
                    <el-select v-model="formData.member_id" filterable remote reserve-keyword clearable :placeholder="t('searchPlaceholder')" :remote-method="searchMember" :loading="searchLoading" class="input-width">
                        <el-option v-for="item in memberList" :key="item.member_id" :label="item.nickname" :value="item.member_id" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="t('verifyType')" prop="verify_type">
                    <el-select v-model="formData.verify_type" multiple collapse-tags clearable :placeholder="t('verifyTypePlaceholder')" class="input-width">
                        <el-option v-for="(item, index) in verifyTypeList" :key="index" :label="item.name" :value="index" />
                    </el-select>
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" :loading="addLoading" @click="addVerifiers(formRef)">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { useRouter, useRoute } from 'vue-router'
import { getVerifierList, deleteVerifier, addVerifier, getVerifyTypeList } from '@/app/api/verify'
import { getMemberList } from '@/app/api/member'
import { ElMessageBox, FormInstance } from 'element-plus'
import { img } from '@/utils/common'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const showDialog = ref(false)
const addLoading = ref(false)
const formData: Record<string, any> = reactive({
    member_id: '',
    verify_type: '',
})

const formRules = reactive({
    member_id: [
        { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' }
    ]
})
const formRef = ref<FormInstance>()

const verifierTable = reactive<any>({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: []
})

/**
 * 获取核销员表列表
 */
const loadVerifierList = (page: number = 1) => {
    verifierTable.loading = true
    verifierTable.page = page

    getVerifierList({
        page: verifierTable.page,
        limit: verifierTable.limit,
        ...verifierTable.searchParam
    }).then(res => {
        verifierTable.loading = false
        verifierTable.data = res.data.data
        verifierTable.total = res.data.total
    }).catch(() => {
        verifierTable.loading = false
    })
}
loadVerifierList()

/**
 * 添加核销员表
 */
const addEvent = () => {
    showDialog.value = true
}

/**
 * 删除核销员表
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('verifierDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteVerifier(id).then(() => {
            loadVerifierList()
        })
    })
}

/**
 * 添加核销员
 * @param formEl
 */
const addVerifiers = async (formEl: FormInstance | undefined) => {
    if (addLoading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            addLoading.value = true

            addVerifier(formData).then(res => {
                addLoading.value = false
                showDialog.value = false
                formData.member_id = ''
                formData.verify_type = ''
                loadVerifierList()
            }).catch(() => {
                addLoading.value = false
            })
        }
    })
}

/**
 * 查询会员信息
 */
const memberList = ref<any>([])
const searchLoading = ref(false)
const searchMember = (query: string) => {
    if (query) {
        searchLoading.value = true
        getMemberList({ keyword: query }).then(res => {
            memberList.value = res.data.data
            searchLoading.value = false
        }).catch()
    } else {
        memberList.value = []
        searchLoading.value = false
    }
}

/**
 * 获取核销类型
 */
const verifyTypeList = ref<any>([])
const setVerifyTypeList = () => {
    getVerifyTypeList().then(res => {
        verifyTypeList.value = res.data
    }).catch()
}
setVerifyTypeList();

/**
 * 会员详情
 */
const toMember = (member_id: number) => {
    router.push(`/member/detail?id=${member_id}`)
}

</script>

<style lang="scss" scoped></style>
