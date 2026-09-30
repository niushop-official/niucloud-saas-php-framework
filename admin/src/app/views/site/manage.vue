<template>
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">
            <el-tabs v-model="activeName" class="site-manage-tabs" tab-position="top">
                <el-tab-pane :label="t('siteList')" name="list">
                    <siteList :status="statusId" />
                </el-tab-pane>
                <el-tab-pane :label="t('siteGroup')" name="group">
                    <group />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { useRoute } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'
import siteList from '@/app/views/site/list.vue'
import group from '@/app/views/site/group.vue'

const route = useRoute()
const activeName = ref(typeof route.query.type === 'string' ? route.query.type : 'list')
const statusId = typeof route.query.id === 'string' ? route.query.id : ''

// 站点列表 / 站点套餐共用同一套高度：表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()
</script>

<style lang="scss" scoped>
// 站点列表同时有搜索表单、表格、分页，页签与内容区用表格间隔
.site-manage-tabs {
    gap: var(--cmp-table-page-section-gap);

    :deep(.el-tabs__header) {
        margin-bottom: 0;
    }
}
</style>
