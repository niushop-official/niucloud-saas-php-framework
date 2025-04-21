<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title"></span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addVipcardVerifier') }}
                </el-button>
            </div>

            <div class="mt-[10px]">
                <el-table :data="vipcardVerifierTable.data" size="large" v-loading="vipcardVerifierTable.loading">
                    <template #empty>
                        <span>{{ !vipcardVerifierTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :label="t('memberInfo')" min-width="120">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer " @click="toMember(row.member.member_id)">
                                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.member.headimg" :src="img(row.member.headimg)" alt="">
                                <img class="w-[50px] h-[50px] mr-[10px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                                <div class="flex flex-col">
                                    <span>{{ row.member.nickname || '' }}</span>
                                    <span>{{ row.member.mobile || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('createTime')" prop="create_time" min-width="120" />
                    <el-table-column :label="t('operation')" align="right" fixed="right" width="100">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="vipcardVerifierTable.page"
                        v-model:page-size="vipcardVerifierTable.limit" layout="total, sizes, prev, pager, next, jumper"
                        :total="vipcardVerifierTable.total" @size-change="loadVipcardVerifierList()"
                        @current-change="loadVipcardVerifierList" />
                </div>
            </div>
        </el-card>

        <el-dialog v-model="showDialog" :title="t('addVipcardVerifier')" width="500px" :destroy-on-close="true">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="addLoading">
                <el-form-item :label="t('member')" prop="member_id">
                    <el-select v-model="formData.member_id" filterable remote reserve-keyword clearable :placeholder="t('searchPlaceholder')" :remote-method="searchMember" :loading="searchLoading" class="input-width">
                        <el-option v-for="item in memberList" :key="item.member_id" :label="item.nickname" :value="item.member_id" />
                    </el-select>
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" :loading="addLoading" @click="addVerifier(formRef)">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getVipcardVerifierList, deleteVipcardVerifier, addVipcardVerifier } from '@/addon/vipcard/api/vipcard'
import { getMemberList } from '@/app/api/member'
import { ElMessageBox, FormInstance } from 'element-plus'
import { img } from '@/utils/common'

const showDialog = ref(false)
const addLoading = ref(false)
const formData: Record<string, any> = reactive({
    member_id: ''
})

const formRules = reactive({
    member_id: [
        { required: true, message: t('memberIdPlaceholder'), trigger: 'blur' }
    ]
})
const formRef = ref<FormInstance>()

const vipcardVerifierTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: []
})

/**
 * 获取核销员表列表
 */
const loadVipcardVerifierList = (page: number = 1) => {
    vipcardVerifierTable.loading = true
    vipcardVerifierTable.page = page

    getVipcardVerifierList({
        page: vipcardVerifierTable.page,
        limit: vipcardVerifierTable.limit
    }).then(res => {
        vipcardVerifierTable.loading = false
        vipcardVerifierTable.data = res.data.data
        vipcardVerifierTable.total = res.data.total
    }).catch(() => {
        vipcardVerifierTable.loading = false
    })
}
loadVipcardVerifierList()

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
    ElMessageBox.confirm(t('vipcardVerifierDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteVipcardVerifier(id).then(() => {
            loadVipcardVerifierList()
        }).catch(() => {
        })
    })
}

/**
 * 添加核销员
 * @param formEl
 */
const addVerifier = async (formEl: FormInstance | undefined) => {
    if (addLoading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            addLoading.value = true

            addVipcardVerifier(formData).then(res => {
                addLoading.value = false
                showDialog.value = false
                formData.member_id = ''
                loadVipcardVerifierList()
            }).catch(() => {
                addLoading.value = false
            })
        }
    })
}

const memberList = ref([])
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
</script>

<style lang="scss" scoped></style>
