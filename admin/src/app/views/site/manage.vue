<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>
            <el-tabs v-model="activeName" class="mt-[20px]" tab-position="top">
                <el-tab-pane :label="t('站点列表')" name="list">
                    <siteList :status='statusId'></siteList>
                </el-tab-pane>
                <el-tab-pane :label="t('站点套餐')" name="group">
                    <group></group>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { t } from '@/lang'
import { useRoute } from 'vue-router'
import siteList from '@/app/views/site/list.vue'
import group from '@/app/views/site/group.vue'

const route = useRoute()
const pageName = route.meta.title
const activeName = route.query.type || 'list'
const statusId = route.query.id || ''

</script>

<style lang="scss" scoped>

</style>
