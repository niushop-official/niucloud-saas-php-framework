<template>
    <el-popover
        v-model:visible="visible"
        class="box-item"
        :width="350"
        trigger="hover"
        :show-after="200"
        :hide-after="300"
        :offset="4"
    >
        <template #reference>
            <div class="navbar-hit relative flex items-center">
                <!-- 有进行中的任务：图标持续旋转；无任务时静态展示 -->
                <el-icon :size="18" :class="[ 'task-icon', { 'is-active': hasActive } ]" v-if="hasActive">
                    <Loading/>
                </el-icon>
                <icon name="iconfont iconrenwu1" v-else/>
                <!-- 状态点：执行中（蓝）/ 等待决策（橙，需用户处理）/ 失败（红） -->
                <span v-if="hasActive" class="task-dot" :class="dotClass"></span>
            </div>
        </template>

        <div class="task-panel">
            <div class="flex items-center justify-between mb-[8px]">
                <span class="text-[14px] font-bold text-[#1D1F3A]">进行中的任务</span>
                <el-button link type="primary" size="small" @click="toRecords">任务列表</el-button>
            </div>

            <div v-if="!task" class="task-empty">暂无进行中的任务</div>

            <div v-else class="task-item" @click="toDetail">
                <div class="flex items-center justify-between gap-[6px]">
                    <span class="task-title truncate">{{ task.title || '任务执行中' }}</span>
                    <el-tag size="small" effect="plain" :type="tagType">{{ statusText }}</el-tag>
                </div>

                <!-- 无阶段文案时降级为状态名（同样取自后端字典） -->
                <div class="task-stage truncate">{{ task.stage || statusText }}</div>

                <el-progress :percentage="progress" :stroke-width="5" :show-text="false" class="!mt-[6px]"
                             :status="progressStatus" />

                <div class="flex items-center justify-between mt-[4px]">
                    <span class="text-[12px] text-[#a0a3bd]">{{ typeName }}</span>
                    <span class="text-[12px] text-[#6b7280]">{{ progress }}%</span>
                </div>

                <div v-if="isWaiting" class="task-wait-tip">任务已暂停，请进入详情处理</div>
            </div>
        </div>
    </el-popover>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Loading, Operation } from '@element-plus/icons-vue'
import useTaskRunnerStore from '@/stores/modules/taskRunner'
import { getAppType } from '@/utils/common'
import { getTaskConfig } from '@/app/api/task'

/**
 * 头部任务指示器
 * 数据取自全局任务执行器（taskRunner store）：任何页面都能反映进行中任务的实时状态
 */
const runner = useTaskRunnerStore()
const router = useRouter()
const visible = ref(false)
const open = () => {
    visible.value = true
}
defineExpose({ open })

/** 是否存在进行中的任务 */
const hasActive = computed(() => !!runner.activeKey)

/** 进行中任务的运行时 */
const task = computed<any>(() => ( runner.activeKey ? runner.runtime(runner.activeKey) : null ))

const status = computed(() => String(task.value?.status ?? ''))
const progress = computed(() => Math.max(0, Math.min(100, Number(task.value?.progress ?? 0))))
/** 等待决策：任务暂停，需要用户选择操作 */
const isWaiting = computed(() => status.value === 'waiting_input')

// ==================== 字典（类型 / 状态名称由后端 TaskDict 维护，避免前端写死） ====================
const statusOptions = ref<Array<{ label: string, value: string }>>([])
const typeOptions = ref<Array<{ label: string, value: string }>>([])

/** 拉取任务字典：类型名与状态名（新增任务类型 / 状态无需改动本组件） */
function loadTaskConfig() {
    getTaskConfig().then((res: any) => {
        statusOptions.value = res?.data?.status || []
        typeOptions.value = res?.data?.types || []
    }).catch(() => {
        // 失败时保持空：展示降级为状态 / 类型标识本身
    })
}

onMounted(loadTaskConfig)

/** 字典未就绪时回退为标识本身（不写死文案） */
const statusText = computed(() => {
    const hit = statusOptions.value.find(item => item.value === status.value)
    return hit?.label || status.value || ''
})

const tagType = computed(() => {
    if (status.value === 'success') return 'success'
    if ([ 'failed', 'rollback_failed' ].includes(status.value)) return 'danger'
    if (isWaiting.value) return 'warning'
    if ([ 'canceled', 'rolled_back' ].includes(status.value)) return 'info'
    return 'primary'
})

const progressStatus = computed(() => {
    if (status.value === 'success') return 'success'
    if ([ 'failed', 'rollback_failed' ].includes(status.value)) return 'exception'
    return ''
})

/** 状态点配色 */
const dotClass = computed(() => {
    if (isWaiting.value) return 'is-waiting'
    if ([ 'failed', 'rollback_failed' ].includes(status.value)) return 'is-failed'
    return 'is-running'
})

/** 类型名称：取后端字典，未命中回退为类型标识 */
const typeName = computed(() => {
    const type = String(task.value?.taskType ?? '')
    const hit = typeOptions.value.find(item => item.value === type)
    return hit?.label || type || ''
})

/**
 * 进入当前任务详情：走全局抽屉（不离开当前页）
 * 抽屉由 layout 层的 task-drawer 渲染，这里只负责发起打开
 */
const toDetail = () => {
    if (!runner.activeKey) return
    runner.openDetail(runner.activeKey, String(task.value?.taskType ?? ''))
}

/** 进入任务列表：平台与站点共用本组件，按当前端跳转 */
const toRecords = () => {
    const appType = getAppType() == 'admin' ? 'admin' : 'site'
    router.push(`/${appType}/tools/task_records`)
}
</script>

<style lang="scss" scoped>
:deep(.box-item .el-popover.el-popper) {
    padding: 13px 16px !important;
}

.task-icon {
    color: inherit;

    /* 进行中：持续旋转，提示后端任务正在推进 */
    &.is-active {
        color: var(--el-color-primary);
        animation: task-icon-spin 1.2s linear infinite;
    }
}

/* 状态点：右上角，带呼吸效果 */
.task-dot {
    position: absolute;
    top: -1px;
    right: -3px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    animation: task-dot-pulse 1.4s ease-in-out infinite;

    &.is-running {
        background-color: var(--el-color-primary);
    }

    &.is-waiting {
        background-color: #e6a23c;
    }

    &.is-failed {
        background-color: #f56c6c;
    }
}

.task-item {
    padding: 8px 6px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #f7f8fa;
    }
}

.task-title {
    font-size: 13px;
    color: #1d1f3a;
}

.task-stage {
    margin-top: 2px;
    font-size: 12px;
    color: #6b7280;
}

.task-wait-tip {
    margin-top: 6px;
    padding: 4px 6px;
    font-size: 12px;
    color: #b26b00;
    background-color: #fff7e6;
    border: 1px solid #ffe0a3;
    border-radius: 4px;
}

.task-empty {
    padding: 26px 0;
    font-size: 12px;
    color: #a0a3bd;
    text-align: center;
}

@keyframes task-icon-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes task-dot-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: .45; transform: scale(.8); }
}
</style>
