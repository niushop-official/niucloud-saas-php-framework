<template>
    <el-dialog v-model="dialogMemberVisible" :title="t('memberInfoTitle')"  width="850px">
        <el-form :inline="true" :model="memberList.searchParam" ref="searchFormRef" @submit.prevent>
            <el-form-item  prop="keyword">
                <el-input v-model.trim="memberList.searchParam.keyword" class="!w-[240px]" :placeholder="t('memberInfoPlaceholder')" clearable  @clear="getMemberListFn()" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getMemberListFn()">{{ t('search') }}</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="memberList.data" v-loading="memberList.loading" size="large">
            <template #empty>
                <span>{{ !memberList.loading ? t("emptyData") : "" }}</span>
            </template>
            <el-table-column prop="nickname" :show-overflow-tooltip="true" :label="t('memberInfo')" min-width="150">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <div class="mr-[10px] rounded-full w-[50px] h-[50px] flex items-center justify-center">
                            <img class="max-w-[50px] max-h-[50px]" v-if="row.headimg" :src="img(row.headimg)" alt="">
                            <img class="max-w-[50px] max-h-[50px]" v-else src="@/app/assets/images/member_head.png" alt="">
                        </div>
                        <div class="flex flex-col">
                            <span>{{ row.nickname || '' }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" :label="t('mobile')" width="180" />
            <el-table-column prop="point" :label="t('point')" min-width="80" />
            <el-table-column prop="balance" :label="t('balance')" min-width="80" />
            <el-table-column :label="t('operation')" fixed="right" min-width="50" align="right">
                <template #default="{ row }">
                    <el-button type="primary" link @click="confirmEvent(row)">{{ t('select') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-[16px] flex justify-end">
            <el-pagination v-model:current-page="memberList.page" v-model:page-size="memberList.limit" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[6, 10, 20, 50]" :total="memberList.total" @size-change="getMemberListFn" @current-change="getMemberListFn" />
        </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { getMemberList } from '@/app/api/member'

const dialogMemberVisible = ref(false)
const open = () => {
    initFn();
    dialogMemberVisible.value = true
}

// 会员列表
const memberList = reactive({
    page: 1,
    limit: 6,
    total: 0,
    loading: false,
    data: [],
    searchParam: {
        keyword: ''
    }
})

const initFn = ()=>{
    memberList.page = 1;
    memberList.limit = 6;
    memberList.total = 0;
    memberList.loading = false;
    memberList.searchParam.keyword = '';
    getMemberListFn();
}
const getMemberListFn = (page: number = 1) => {
    memberList.loading = true
    memberList.page = page
    getMemberList({
        page: memberList.page,
        limit: memberList.limit,
        ...memberList.searchParam
    }).then((res: any) => {
        memberList.loading = false
        memberList.total = res.data.total
        memberList.data = res.data.data
    })
}

const emit = defineEmits(['confirm'])
const confirmEvent = (val: any) => {
    emit('confirm', val)
    dialogMemberVisible.value = false
}

defineExpose({
    dialogMemberVisible,
    open
})
</script>

<style lang="scss" scoped>

</style>
