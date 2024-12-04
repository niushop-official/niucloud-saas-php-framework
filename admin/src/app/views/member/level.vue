<template>
    <!--会员等级-->
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="addEvent">{{ t('addMemberLevel') }}</el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="memberLevelTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('levelName')" prop="level_name">
                        <el-input v-model.trim="memberLevelTableData.searchParam.level_name" :placeholder="t('levelNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadMemberLevelList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="memberLevelTableData.data" size="large" v-loading="memberLevelTableData.loading">

                    <template #empty>
                        <span>{{ !memberLevelTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="level_name" :label="t('levelName')" min-width="120" />
                    <el-table-column prop="growth" :label="t('growth')" min-width="120" />
                    <el-table-column :label="t('levelBenefits')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div>
                                <template v-for="item in row.level_benefits">
                                    <div v-if="item.content">{{ item.content }}</div>
                                </template>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('levelGifts')" min-width="120" >
                        <template #default="{ row }">
                            <div>
                                <template v-for="item in row.level_gifts">
                                    <div v-if="item.content">{{ item.content }}</div>
                                </template>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="member_num" :label="t('memberNumber')" min-width="120" />

                    <el-table-column :label="t('operation')" align="right" fixed="right" width="130">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.level_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="memberLevelTableData.page" v-model:page-size="memberLevelTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="memberLevelTableData.total"
                        @size-change="loadMemberLevelList()" @current-change="loadMemberLevelList" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getMemberLevelPageList, deleteMemberLevel } from '@/app/api/member'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { setTablePageStorage,getTablePageStorage } from "@/utils/common";

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const memberLevelTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        level_name: ''
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadMemberLevelList()
}

/**
 * 获取会员标签列表
 */
const loadMemberLevelList = (page: number = 1) => {
    memberLevelTableData.loading = true
    memberLevelTableData.page = page

    getMemberLevelPageList({
        page: memberLevelTableData.page,
        limit: memberLevelTableData.limit,
        ...memberLevelTableData.searchParam
    }).then(res => {
        memberLevelTableData.loading = false
        memberLevelTableData.data = res.data.data
        memberLevelTableData.total = res.data.total
        setTablePageStorage(memberLevelTableData.page, memberLevelTableData.limit, memberLevelTableData.searchParam);
    }).catch(() => {
        memberLevelTableData.loading = false
    })
}
loadMemberLevelList(getTablePageStorage(memberLevelTableData.searchParam).page);

/**
 * 添加会员标签
 */
const addEvent = () => {
    router.push({ path: '/member/level_edit' })
}

/**
 * 编辑会员标签
 * @param data
 */
const editEvent = (data: any) => {
    router.push({ path: '/member/level_edit', query: { id: data.level_id } })
}

/**
 * 删除会员标签
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('memberLevelDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteMemberLevel(id).then(() => {
            loadMemberLevelList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped></style>
