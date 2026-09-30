<template>
    <!--
        全局任务详情抽屉：任何位置打开任务详情都复用它，不再跳转 task_detail 路由。

        两个关键时序（与 addon/list 抽屉的实践一致，避免出现 emitsOptions / insertBefore of null）：
        1. 不用 destroy-on-close：它会在「关闭动画结束后」自行销毁内容，
           与通过 taskKey 控制的卸载形成两条销毁路径并互相竞争。
           这里由 v-if="key" 单一控制卸载，清空动作放在 @closed（动画结束后），
           关闭动画期间内容仍可见。
        2. 点「返回」时延后一个 tick 再关闭：@back 是在 task-detail 自己的渲染 / 事件调用栈里
           同步 emit 出来的，此刻它可能有渲染在途，同步改 visible 会让 Vue 在同一轮里
           既更新又销毁同一棵子树。
    -->
    <el-drawer v-model="visible" size="75%" class="task-drawer" @closed="onClosed"
               :with-header="false" modal-class="!bg-transparent">
        <!-- 创建中占位：拿到 task_key 之前先占位展示，避免空窗 -->
        <div v-if="isPending" class="task-pending">
            <el-icon class="is-spin task-pending-icon"><Loading /></el-icon>
            <div class="task-pending-title">{{ pendingTitle }}</div>
            <div class="task-pending-tip">{{ pendingTip }}</div>
            <div class="task-pending-bar"><i /></div>
            <!-- 占位态没有详情内的「返回」按钮，这里提供关闭入口（任务仍在后台创建） -->
            <el-button class="!mt-[18px]" size="small" plain @click="onBack">关闭</el-button>
        </div>

        <!-- :key 绑定任务标识：每个任务都用全新实例，避免实例在任务之间被复用产生「半更新」 -->
        <task-detail v-else-if="runner.detail.key" :key="runner.detail.key" :task-key="runner.detail.key"
                     :task-type="runner.detail.type" mode="component" :visible="visible" @back="onBack" />
    </el-drawer>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch, onUnmounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import TaskDetail from '@/app/views/tools/task_detail.vue'
import useTaskRunnerStore from '@/stores/modules/taskRunner'

/**
 * 全局任务详情抽屉
 *
 * 由 layout 根级挂载一次：打开动作来自 taskRunner.openDetail()，
 * 因此任何页面 / 组件都能在不离开当前页的前提下查看任务详情。
 */
const runner = useTaskRunnerStore()

const visible = computed({
    get: () => runner.detail.visible,
    set: (val: boolean) => {
        runner.detail.visible = val
    }
})

/** 详情里点「返回」：延后一 tick 再关闭，避免同一轮里更新又销毁同一棵子树 */
const onBack = () => {
    nextTick(() => {
        visible.value = false
    })
}

// ==================== 创建中占位 ====================
const isPending = computed(() => runner.detail.pending && !runner.detail.key)

/** 占位标题：调用方可自定义，缺省按任务类型兜底 */
const pendingTitle = computed(() => runner.detail.pendingTitle || '正在创建任务')

/** 等待超过该时长补一句说明，避免长时间无变化被当成卡死 */
const SLOW_TIP_AFTER = 8000
const slow = ref(false)
let slowTimer: any = null

watch(isPending, (val) => {
    slow.value = false
    if (slowTimer) clearTimeout(slowTimer)
    if (val) slowTimer = setTimeout(() => { slow.value = true }, SLOW_TIP_AFTER)
}, { immediate: true })

onUnmounted(() => {
    if (slowTimer) clearTimeout(slowTimer)
})

const pendingTip = computed(() => slow.value ? '云端正在准备，请稍候（不要关闭页面）' : '任务创建成功后将自动展示执行详情')

/** 抽屉关闭动画结束：清空任务标识，由 v-if 完成唯一的卸载动作 */
const onClosed = () => {
    runner.resetDetail()
}
</script>

<style lang="scss">
.task-drawer {
    background: none !important;
    box-shadow: none !important;
    top: 50px !important;
    height: calc(100% - 50px)!important;
    /*
     * .el-drawer 自带 overflow: hidden，会把 body 向外投射的阴影裁掉；
     * 放开裁剪，阴影才能落到面板外侧（body 自身有 overflow: auto 兜住滚动）。
     */
    overflow: visible !important;

    .el-drawer__body {
        background-color: var(--el-bg-color-page);
        padding: 12px;

        /*
         * 只在左侧有阴影：模糊半径会向四周扩散（顶部也会出现），
         * 所以用负的 spread 把阴影整体收缩，抵消向上 / 向下的扩散，
         * 再靠 x 负偏移把阴影留在左侧。
         *   模糊向外扩散约 blur/2 = 12px，spread 取 -12px 正好抵消 -> 上下无阴影
         *   左侧则是 offset 12px + 扩散 12px，形成明显的左缘阴影
         */
        box-shadow: -12px 0 24px -12px rgba(0, 0, 0, .3);
    }
}

/* 创建中占位 */
.task-pending {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 40px 20px;
    text-align: center;
}

.task-pending-icon {
    font-size: 28px;
    color: var(--el-color-primary);
    /* isPending 占位态：图标持续旋转，提示任务正在后台创建（与头部指示器执行中图标一致） */
    animation: task-pending-spin 1.2s linear infinite;
}

@keyframes task-pending-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.task-pending-title {
    margin-top: 14px;
    font-size: 15px;
    font-weight: 600;
    color: var(--el-text-color-primary);
}

.task-pending-tip {
    margin-top: 6px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
}

/* 顶部不确定进度条：只表达「在忙」，不表达百分比 */
.task-pending-bar {
    position: relative;
    width: 180px;
    height: 3px;
    margin-top: 16px;
    overflow: hidden;
    border-radius: 999px;
    background-color: var(--el-border-color-lighter);

    i {
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 100%;
        border-radius: 999px;
        background-color: var(--el-color-primary);
        animation: task-pending-slide 1.1s ease-in-out infinite;
    }
}

@keyframes task-pending-slide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(250%); }
}
</style>
