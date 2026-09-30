<template>
    <!--站点列表-->
    <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
        <div class="table-fill-page__card">
            
            <el-card class="box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search" shadow="never">
                <el-form :inline="true" :model="addonTableData.searchParam" ref="searchFormRef" class="search-form">
                    <el-form-item :label="t('title')" prop="search">
                        <el-input v-model.trim="addonTableData.searchParam.search" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadAddonList">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            
            <div class="table-panel table-fill-page__panel">
                <table-toolbar :title="pageName" :selectable="false">
                    <template #actions>
                        <!-- 批量打包：勾选后发起，走统一任务模型执行 -->
                        <span v-if="selection.length" class="text-[12px] text-[#909399]">已选 {{ selection.length }} 个插件</span>
                        <el-button type="primary" :disabled="!selection.length" :loading="batchLoading" @click="openBatchBuild">
                            批量打包
                        </el-button>
                    </template>
                </table-toolbar>

                <div class="table-fill-page__table">
                <el-table height="100%" :data="addonTableData.data" size="large" v-loading="addonTableData.loading"
                          row-key="key" @selection-change="onSelectionChange">
                    <el-table-column type="selection" width="50" :selectable="selectable" reserve-selection />
                    <template #empty>
                        <span>{{ t('emptyData') }}</span>
                    </template>
                    
                    <el-table-column :label="t('title')" align="left" min-width="320">
                        <template #default="{ row }">
                            <div class="flex items-center justify-between">
                                <el-image v-if="row.icon" class="w-[45px] h-[45px] rounded-[var(--cmp-table-composite-icon-radius)] overflow-hidden" :src="row.icon.indexOf('data:image') != -1 ? row.icon : img(row.icon)" fit="contain">
                                    <template #error>
                                        <img class="w-[45px] h-[45px] rounded-[var(--cmp-table-composite-icon-radius)]" src="@/app/assets/images/category_default.png" alt="">
                                    </template>
                                </el-image>
                                <img v-else class="w-[45px] h-[45px] rounded-[var(--cmp-table-composite-icon-radius)]" src="@/app/assets/images/category_default.png" alt="">
                                <div class="flex-1 w-[236px] pl-[15px] truncate">
                                    {{ row.title }}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="key" :label="t('key')" min-width="200" />
                    <el-table-column prop="type_name" :label="t('type')" align="center" min-width="200" />
                    <el-table-column prop="author" :label="t('author')"  min-width="200" />
                    <el-table-column prop="version" :label="t('version')" align="center" min-width="200" />
                    <el-table-column :label="t('status')" align="center" min-width="200">
                        <template #default="{ row }">
                            {{ Object.keys(row.install_info).length ? '已安装' : '未安装' }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" fixed="right" align="right" width="160" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <table-actions :actions="rowActions(row)" />
                        </template>
                    </el-table-column>
                </el-table>
                </div>
                <!-- <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="addonTableData.page" v-model:page-size="addonTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="addonTableData.total"
                        @size-change="loadAddonList()" @current-change="loadAddonList" />
                </div> -->
            </div>
        </div>
        
        <!-- 打包方式：先询问是否需要云编译，再进入打包前校验 -->
        <el-dialog v-model="buildModeVisible" title="打包方式" width="480px" :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="px-[6px] py-[4px]">
                <div class="text-[14px] text-[#303133] mb-[10px]">是否需要先云编译？</div>
                <el-radio-group v-model="isCloudBuild" class="compile-radio flex flex-col !items-start gap-[8px]">
                    <el-radio :value="1">
                        <div>
                            <div class="text-[13px]">先云编译再打包</div>
                            <div class="text-[12px] text-[#909399]">由云端编译本次打包插件的各端产物，编译完成后再打包</div>
                        </div>
                    </el-radio>
                    <el-radio :value="0" class="mt-[10px]">
                        <div>
                            <div class="text-[13px]">直接打包</div>
                            <div class="text-[12px] text-[#909399]">使用本地已编译的前端产物，校验通过即打包</div>
                        </div>
                    </el-radio>
                </el-radio-group>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="buildModeVisible = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="confirmBuildMode">{{ t('confirm') }}</el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 打包前校验：通过后自动创建打包任务，并在全局抽屉中展示任务执行过程 -->
        <el-dialog v-model="checkVisible" title="打包前校验" width="580px" :close-on-click-modal="false"
                   :close-on-press-escape="false" :destroy-on-close="true">
            <div class="min-h-[150px]">
                <verify-panel v-if="checkVisible" scene="addon_build" :params="checkParams"
                              :auto-next="true" :auto-next-delay="500" :show-prev="false"
                              :next-text="t('nextStep')" @next="onCheckPassed" />
            </div>
        </el-dialog>
        
        <!--
            打包任务详情：不再在本页内嵌抽屉，统一走全局抽屉（layout/components/task-drawer），
            由 taskRunner.openDetail() 打开；详情关闭时这里监听抽屉状态刷新列表。
        -->
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch } from 'vue'
import { img } from '@/utils/common'
import { t } from '@/lang'
import { getAddonDevelop, deleteAddonDevelop } from '@/app/api/tools'
import { createTask } from '@/app/api/task'
import { ElMessageBox, ElMessage, ElTable, FormInstance } from 'element-plus'
import TableActions from '@/components/table-actions/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { useRouter, useRoute } from 'vue-router'
import VerifyPanel from '@/app/components/verify-panel/index.vue'
import useTaskRunnerStore from '@/stores/modules/taskRunner'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

const route = useRoute()
const pageName = route.meta.title

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

/**
 * 表格行内操作：超过 2 个自动收进「更多」
 */
const rowActions = (row: any) => [
    { label: t('edit'), onClick: () => editEvent(row.key) },
    { label: t('step4'), show: !!Object.keys(row.install_info).length, onClick: () => addonDevelopBuildFn(row) },
    { label: t('delete'), type: 'danger', show: !Object.keys(row.install_info).length, onClick: () => deleteEvent(row.key) }
]

const addonTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        search: ''
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    
    formEl.resetFields()
    loadAddonList()
}
/**
 * 获取站点列表
 */
const loadAddonList = (page: number = 1) => {
    addonTableData.loading = true
    addonTableData.page = page
    getAddonDevelop({
        page: addonTableData.page,
        limit: addonTableData.limit,
        ...addonTableData.searchParam
    }).then(res => {
        addonTableData.loading = false
        addonTableData.data = res.data
        addonTableData.total = res.data.total
    }).catch(() => {
        addonTableData.loading = false
    })
}
loadAddonList()

const router = useRouter()

// ==================== 批量打包（走统一任务模型） ====================
const addonTableRef = ref<InstanceType<typeof ElTable>>()
const selection = ref<any[]>([])
const batchLoading = ref(false)
const checkVisible = ref(false)
/** 打包任务详情：走全局抽屉（taskRunner.detail） */
const runner = useTaskRunnerStore()



/** 校验弹窗的用途：batch 批量打包（走任务） / single 单个打包（同步打包并下载） */
const checkMode = ref<'batch' | 'single'>('batch')
/** 单个打包时的目标插件 */
const singleBuildKey = ref('')

/** 只有已安装的插件才允许勾选打包 */
const selectable = (row: any) => Object.keys(row.install_info || {}).length > 0

const onSelectionChange = (rows: any[]) => { selection.value = rows || [] }

/**
 * 重新选择当前页可打包的插件
 */
const selectCurrentPage = () => {
    addonTableData.data.forEach((row: any) => {
        if (selectable(row)) addonTableRef.value?.toggleRowSelection(row, true)
    })
}

/**
 * 清空全部选择
 */
const clearSelection = () => {
    addonTableRef.value?.clearSelection()
    selection.value = []
}

/** 已勾选的插件标识 */
const selectedKeys = computed(() => selection.value.map((row: any) => row.key).filter(Boolean))

/** 校验参数：按当前校验用途给出对应的插件清单；云编译开关决定是否需要校验本地编译产物 */
const checkParams = computed(() => ( {
    addon: checkMode.value === 'single' ? [ singleBuildKey.value ] : selectedKeys.value,
    is_cloud_build: isCloudBuild.value ? 1 : 0
} ))

/** 打包方式弹窗（是否需要云编译） */
const buildModeVisible = ref(false)
/** 是否先云编译：1 云编译后打包，0 直接打包 */
const isCloudBuild = ref(0)

/** 打开打包方式弹窗：先选择是否云编译，再进入校验 */
const openBatchBuild = () => {
    if (!selectedKeys.value.length) return
    checkMode.value = 'batch'
    buildModeVisible.value = true
}

/** 确认打包方式：进入打包前校验 */
const confirmBuildMode = () => {
    buildModeVisible.value = false
    checkVisible.value = true
}

/**
 * 校验通过：批量 / 单个都创建打包任务（任务详情在全局抽屉查看，不离开列表页）
 */
const onCheckPassed = () => {
    checkVisible.value = false

    // 单个插件也走任务：统一在任务详情（全局抽屉）里看执行过程与产物
    if (checkMode.value === 'single') {
        const key = singleBuildKey.value
        singleBuildKey.value = ''
        if (key) createBuildTask([ key ])
        return
    }

    if (!selectedKeys.value.length) return

    createBuildTask(selectedKeys.value)
}

/** 创建打包任务（批量 / 单个都走任务） */
const createBuildTask = (addons: string[]) => {
    if (!addons.length) return

    batchLoading.value = true
    // 先占位打开任务详情：创建期间不留空窗
    runner.openPendingDetail('addon_build', '正在发起打包')
    createTask('addon_build', { addon: addons, is_cloud_build: isCloudBuild.value ? 1 : 0 }).then((res: any) => {
        const key = res?.data?.task_key
        if (!key) {
            runner.closePendingDetail()
            ElMessage.error('打包任务创建失败')
            return
        }
        // 不离开当前页：全局抽屉展示执行输出，关掉即可继续操作列表
        runner.openDetail(key, 'addon_build')
    }).catch((err: any) => {
        runner.closePendingDetail()
        ElMessage({ message: err?.msg || err?.message || '打包任务创建失败', type: 'error' })
    }).finally(() => {
        batchLoading.value = false
    })
}

/**
 * 全局抽屉关闭时刷新列表（原先由内嵌抽屉的 @completed 触发）
 * 打包完成后插件包会落到列表里，关闭详情即可看到最新状态
 */
watch(() => runner.detail.visible, (val, oldVal) => {
    if (oldVal && !val) loadAddonList()
})

const editEvent = (key: any) => {
    router.push({ path: '/tools/addon_edit', query: { key } })
}

/**
 * 打包插件入口：先做打包前校验，通过后再执行打包
 * 校验不通过时 verify-panel 停在结果页，不触发打包
 */
const addonDevelopBuildFn = (data: any) => {
    singleBuildKey.value = data.key
    checkMode.value = 'single'
    // 先询问打包方式（是否云编译），再进入校验
    buildModeVisible.value = true
}

/**
 * 删除
 */
const deleteEvent = (key: any) => {
    ElMessageBox.confirm(t('codeDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        addonTableData.loading = true
        deleteAddonDevelop(key).then(() => {
            loadAddonList()
        }).catch(() => {
            addonTableData.loading = false
        })
    })
}

</script>

<style lang="scss" scoped>
.compile-radio {
    :deep(.el-radio) {
        height: auto;
        align-items: flex-start;
        white-space: normal;
    }
    :deep(.el-radio__input) {
        margin-top: 2px;
    }
}
</style>