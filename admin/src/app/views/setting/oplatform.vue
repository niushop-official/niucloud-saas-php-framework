<template>
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">

            <el-tabs v-model="activeName">
                <el-tab-pane :label="t('小程序同步')" name="xcx">
                    <weappVersion></weappVersion>
                </el-tab-pane>
                <el-tab-pane :label="t('开放平台配置')" name="setting">
                    <setting></setting>
                </el-tab-pane>
                <el-tab-pane :label="t('授权记录')" name="auth_record">
                    <div class="table-panel table-fill-page__panel">
                        <table-toolbar :title="t('授权记录')" :selectable="false" />
                        <div class="table-fill-page__table">
                        <el-table height="100%" :data="authRecordTableData.data" size="large" v-loading="authRecordTableData.loading">
                            <template #empty>
                                <span>{{ !authRecordTableData.loading ? t('emptyData') : '' }}</span>
                            </template>

                            <el-table-column prop="user_version" :label="t('publicInfo')" :show-overflow-tooltip="true" min-width="150px">
                                <template #default="{ row }">
                                    <div class="flex items-center">
                                        <div class="mr-[10px] rounded-full w-[60px] h-[60px] flex items-center justify-center">
                                            <el-image v-if="row.value.authorizer_info.head_img" class="w-[60px] h-[60px]" :src="img(row.value.authorizer_info.head_img)" fit="contain">
                                                <template #error>
                                                    <div class="image-slot">
                                                        <img class="w-[60px] h-[60px]" src="@/app/assets/images/member_head.png"  fit="contain"/>
                                                    </div>
                                                </template>
                                            </el-image>
                                            <img class="max-w-[60px] max-h-[60px]" v-else src="@/app/assets/images/member_head.png" alt="">
                                        </div>
                                        <div class="flex flex-col">
                                            <span>{{ row.value.authorizer_info.nick_name || '' }}</span>
                                            <span class="text-info text-sm">{{ row.value.authorizer_info.principal_name || '' }}</span>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="user_version" :label="t('publicType')">
                                <template #default="{ row }">
                                    <div v-if="row.config_key == 'wechat_authorization_info'">微信公众号</div>
                                    <div v-if="row.config_key == 'weapp_authorization_info'">微信小程序</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="user_version" :label="t('qrcode')">
                                <template #default="{ row }">
                                    <el-image class="w-[60px] h-[60px]" :src="img(row.value.authorizer_info.qrcode_url)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[60px] h-[60px]" src="@/app/assets/images/category_default.png"  fit="contain"/>
                                            </div>
                                        </template>
                                    </el-image>
                                </template>
                            </el-table-column>
                            <el-table-column :label="t('APPID')" :show-overflow-tooltip="true">
                                <template #default="{ row }">
                                    {{ row.value.authorization_info.authorizer_appid }}
                                </template>
                            </el-table-column>
                            <el-table-column :label="t('siteName')">
                                <template #default="{ row }">
                                    {{ row.site.site_name }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="create_time" :label="t('authTime')"></el-table-column>
                        </el-table>
                        </div>

                        <table-pagination
                            v-model:current-page="authRecordTableData.page"
                            v-model:page-size="authRecordTableData.limit"
                            :total="authRecordTableData.total"
                            @size-change="loadAuthRecordList()"
                            @current-change="loadAuthRecordList"
                        />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { useRoute } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'
import weappVersion from '@/app/views/wxoplatform/weapp_version.vue'
import setting from '@/app/views/wxoplatform/setting.vue'
import { getAuthRecord } from '@/app/api/wxoplatform'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { img } from '@/utils/common'

const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()
const activeName = ref('xcx')

const authRecordTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {}
})

const loadAuthRecordList = (page: number = 1) => {
    authRecordTableData.loading = true
    authRecordTableData.page = page

    getAuthRecord({
        page: authRecordTableData.page,
        limit: authRecordTableData.limit
    }).then(res => {
        authRecordTableData.loading = false
        authRecordTableData.data = res.data.data
        authRecordTableData.total = res.data.total
    }).catch(() => {
        authRecordTableData.loading = false
    })
}
loadAuthRecordList()

</script>

<style lang="scss" scoped>
:deep(.el-tabs__header){
    padding: 0 20px;
}

</style>
