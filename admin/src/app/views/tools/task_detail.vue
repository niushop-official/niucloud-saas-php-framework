<template>
    <!--
        页面模式自带 main-container 容器；组件模式由父级容器决定尺寸。
        v-loading 只在页面模式启用：组件模式是「屏幕外渲染完成后才滑入」，
        用户看不到加载过程，而该指令会在挂载 / 卸载时插入、移除遮罩元素，
        容器已不在文档中时会抛 insertBefore of null。
    -->
    <div :class="isPage ? 'main-container w-full' : 'w-full h-full'" v-loading="isPage && pageLoading">
        <div class="full-container page-sections flex flex-col" :class="{ 'h-full': !isPage }">
            <!-- 顶部：标题 / 状态 / 操作 -->
            <el-card shadow="never" class="!border-none">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-[10px] min-w-0">
                        <!-- 返回按钮常显：页面模式回任务列表，组件模式交由父级关闭（emit back） -->
                        <el-button size="small" @click="goBack">返回</el-button>
                        <span class="text-[15px] font-bold text-[#1D1F3A] truncate">{{
                                info.title || '任务详情'
                            }}</span>
                        <el-tag size="small" effect="plain" :type="statusTagType">{{ info.status_name || '-' }}</el-tag>
                        <el-tag v-if="info.task_type_name" size="small" effect="plain">{{
                                info.task_type_name
                            }}
                        </el-tag>
                    </div>
                    <div class="flex items-center gap-[8px]">
                        <!-- 执行出错 / 暂停等决策：重试 / 跳过 / 取消任务 -->
                        <template v-if="isWaitingInput">
                            <el-button v-for="action in taskActions" :key="action.code" size="small"
                                       :type="actionButtonType(action)" :plain="action.code !== 'retry'"
                                       :loading="operating === action.code"
                                       @click="handleAction(action)">
                                {{ action.label }}
                            </el-button>
                        </template>
                        <el-button v-else-if="!info.is_terminal" size="small" type="danger" plain @click="handleCancel">
                            取消任务
                        </el-button>
                        <el-button size="small" @click="refresh">刷新</el-button>
                    </div>
                </div>
                
                <!-- 任务描述：按任务类型给出对应叫法（升级记录应用与版本、打包记录插件清单等） -->
                <div v-if="info.desc"
                     class="mt-[10px] rounded-[6px] bg-[var(--el-fill-color-light)] px-[12px] py-[8px]">
                    <div class="text-[12px] text-[#6b7280]">{{ descLabel }}</div>
                    <div class="mt-[4px] text-[13px] leading-[20px] text-[#303133] break-all">{{ info.desc }}</div>
                </div>
                
                <!-- 等待决策提示条 -->
                <div v-if="isWaitingInput" class="task-alert mt-[10px]">
                    <el-icon>
                        <WarnTriangleFilled/>
                    </el-icon>
                    <span class="ml-[6px]">任务执行遇到问题已暂停，请选择「重试」「跳过」或「取消任务」。</span>
                </div>
            </el-card>
            
            <div class="flex flex-1 h-0 gap-[10px] items-stretch">
                <!-- 左：步骤列表（卡片式） -->
                <el-card shadow="never" class="!border-none !w-[320px] shrink-0 h-full">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <span class="text-[14px] font-bold">执行步骤</span>
                            <span class="text-[12px] text-[#6b7280]">{{ stepsDone }}/{{ visibleSteps.length }}</span>
                        </div>
                    </template>
                    
                    <el-scrollbar>
                        <div class="pr-[10px]">
                            <!--
                                空态与列表用 v-if / v-else 链：编译后是三元表达式，只产生一个节点，
                                不会留下注释占位符（不写成两个独立的 template 分支，那样会引入
                                没有真实 DOM 元素的 Fragment，patch 时解析不到容器）。
                                列表再独占 .step-list 容器，保证 v-for 的父节点里只有 keyed 节点。
                            -->
                            <div v-if="!visibleSteps.length" class="text-[12px] text-[#a0a3bd] text-center py-[30px]">
                                该任务暂无步骤数据（历史任务）
                            </div>
                            <div v-else class="step-list">
                                <!-- 步骤卡片：标题+状态 / 描述 / 步骤进度 / 底部信息 / 标签 -->
                                <div v-for="(step, index) in visibleSteps" :key="step.step_key"
                                     class="step-card"
                                     :class="[ stepStatusClass(step.status), { 'is-active': step.step_key === info.current_step } ]">
                                    <div class="flex items-start justify-between gap-[8px]">
                                        <span class="step-card-title">{{ step.name }}</span>
                                        <span class="step-badge" :class="stepStatusClass(step.status)">
                                        {{ stepStatusText(step.status) }}
                                    </span>
                                    </div>
                                    
                                    <!--
                                        卡片内部一律用 v-show 而不是 v-if：
                                        v-if 为 false 时留下的是注释占位节点，它会进入本元素的
                                        children 数组；而「新旧 children 都是数组」就会走
                                        patchKeyedChildren（与有没有 :key 无关），处理该注释节点时
                                        容器解析不到，抛 insertBefore / emitsOptions of null。
                                        v-show 保留元素本身（仅切换 display），不会产生注释节点。
                                    -->
                                    <div v-show="step.desc" class="step-card-desc">{{ step.desc }}</div>
                                    
                                    <div class="step-progress-row">
                                        <!-- 展示当前步骤内子步骤数量与已执行到的子步骤数（替代「第几步」） -->
                                        <span v-if="(step.sub_steps ?? []).length">步骤 {{ stepSubReached(step) }}/{{ (step.sub_steps ?? []).length }}</span>
                                        <span v-else>步骤 {{ step.status !== 'success' ? 0 : 1 }}/1</span>
                                        <!-- 已完成的步骤不再展示进度与百分比，避免 100% 的冗余信息 -->
                                        <span class="step-progress-percent">
                                        {{ stepPercent(step) }}%
                                    </span>
                                    </div>
                                    <el-progress :percentage="stepPercent(step)"
                                                 :stroke-width="5" :show-text="false" :status="barStatus(step.status)"
                                                 class="step-progress-bar"/>
                                    
                                    <div class="step-foot">
                                    <span class="step-foot-left">
                                    </span>
                                        <span class="step-foot-right" title="执行时长">
                                        <el-icon><Clock/></el-icon>
                                        {{ stepTimeText(step) }}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </el-card>
                
                <!-- 中：执行输出 -->
                <el-card shadow="never" class="!border-none flex-1 min-w-0 flex flex-col">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <span class="text-[14px] font-bold">执行输出</span>
                            <span class="text-[12px] text-[#6b7280]">
                                {{ info.stage || (info.is_terminal ? '任务已结束' : '执行中') }}
                            </span>
                        </div>
                    </template>
                    <!--
                        auto-ask=false：不在终端内询问，操作按钮由本组件顶部提供
                        v-if="visible"：组件模式下等面板滑入（可见）后再挂载。
                        终端在不可见容器里初始化、输出日志时会操作 DOM，容器不在文档中
                        会抛 insertBefore of null；挂载时会回放已有事件，不会漏日志。
                    -->
                    <task-terminal v-if="visible" ref="taskTermRef" :task-key="taskKey" :auto-ask="false"
                                   class="flex-1 h-full" @completed="onCompleted"/>
                </el-card>
                
                <!-- 右：任务信息 + 执行进度 -->
                <el-card shadow="never" class="!border-none !w-[320px] shrink-0">
                    <template #header>
                        <span class="text-[14px] font-bold">任务信息</span>
                    </template>
                    
                    <div class="flex flex-col h-full">
                        <el-descriptions :column="1" size="small" border table-layout="fixed">
                            <el-descriptions-item label="任务编号" label-class-name="w-[80px]">{{ info.task_key || '-' }}</el-descriptions-item>
                            <el-descriptions-item label="云编译任务ID" v-if="cloudTaskId">{{ cloudTaskId }}</el-descriptions-item>
                            <el-descriptions-item label="任务类型">{{
                                    info.task_type_name || '-'
                                }}
                            </el-descriptions-item>
                            <el-descriptions-item label="当前状态">
                                <el-tag size="small" effect="plain" :type="statusTagType">{{
                                        info.status_name || '-'
                                    }}
                                </el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="开始时间">{{
                                    formatTime(info.start_time)
                                }}
                            </el-descriptions-item>
                            <el-descriptions-item label="结束时间">{{
                                    formatTime(info.end_time)
                                }}
                            </el-descriptions-item>
                            <el-descriptions-item label="耗时">{{
                                    formatDuration(info.duration)
                                }}
                            </el-descriptions-item>
                            <el-descriptions-item label="结束原因">{{
                                    info.end_reason_name || '-'
                                }}
                            </el-descriptions-item>
                        </el-descriptions>
                        
                        <div class="mt-[16px]">
                            <div class="flex items-center justify-between mb-[8px]">
                                <span class="text-[14px] font-bold">执行进度</span>
                            </div>
                            <el-progress :percentage="Number(info.progress ?? 0)" :stroke-width="8"/>
                            
                            <!-- 当前步骤：展示该步骤及其子步骤的执行信息 -->
                            <div v-if="currentStep && currentStep.sub_steps && currentStep.sub_steps.length"
                                 class="current-step-box shadow-md">
                                <div class="flex items-center justify-between gap-[6px]">
                                    <span class="current-step-title">{{ currentStep.name }}</span>
                                    <span class="step-badge" :class="stepStatusClass(currentStep.status)">
                                        {{ stepStatusText(currentStep.status) }}
                                    </span>
                                </div>
                                <div v-if="currentStep.desc" class="step-card-desc">{{ currentStep.desc }}</div>
                                
                                <div class="step-progress-row">
                                    <!-- 展示当前步骤内子步骤数量与已执行到的子步骤数（替代「第几步」） -->
                                    <span v-if="(currentStep.sub_steps ?? []).length">子步骤 {{ stepSubReached(currentStep) }}/{{ (currentStep.sub_steps ?? []).length }}</span>
                                    <span v-if="currentStep.status !== 'success'" class="step-progress-percent">
                                        {{ stepPercent(currentStep) }}%
                                    </span>
                                </div>
                                <el-progress v-if="currentStep.status !== 'success'"
                                             :percentage="stepPercent(currentStep)"
                                             :stroke-width="5" :show-text="false"
                                             :status="barStatus(currentStep.status)"
                                             class="step-progress-bar"/>
                                
                                <!-- 子步骤明细：图标 + 名称 + 右侧状态 -->
                                <template v-if="currentStep.sub_steps && currentStep.sub_steps.length">
                                    <ul class="sub-timeline">
                                        <li v-for="(sub, subIndex) in currentStep.sub_steps" :key="sub.step_key"
                                            class="sub-timeline-item" :class="stepStatusClass(sub.status)">
                                            <span class="sub-icon">
                                                <el-icon v-if="sub.status === 'success'"><CircleCheck/></el-icon>
                                                <el-icon v-else-if="sub.status === 'running'" class="is-loading"><Loading/></el-icon>
                                                <el-icon v-else-if="sub.status === 'failed'"><CircleClose/></el-icon>
                                                <span v-else class="sub-index">{{ subIndex + 1 }}</span>
                                            </span>
                                            <span class="sub-text">{{ sub.name }}</span>
                                            <span class="sub-tail">{{ subStatusTail(sub) }}</span>
                                        </li>
                                    </ul>
                                </template>
                                <div v-else class="text-[12px] text-[#a0a3bd] mt-[8px]">该步骤无子步骤</div>
                            </div>
                        </div>
                        
                        <div class="mt-[16px] flex flex-col flex-1 h-0">
                            <div class="flex items-center justify-between mb-[8px]">
                                <span class="text-[14px] font-bold">相关产物</span>
                                <span v-if="artifact.exists" class="text-[12px] text-[#6b7280]">
                                    {{ artifact.total.files }} 个文件 · {{ artifact.total.size_name }}
                                </span>
                            </div>
                            
                            <div class="flex-1 h-0">
                                <el-scrollbar>
                                    <div v-if="artifactLoading" class="text-[12px] text-[#a0a3bd] py-[10px]">加载中…
                                    </div>
                                    <div v-else-if="!artifact.exists" class="text-[12px] text-[#a0a3bd] py-[10px]">
                                        暂无产物
                                    </div>
                                    
                                    <template v-else>
                                        <!-- 产物压缩包 -->
                                        <div v-if="artifact.zip" class="artifact-item">
                                            <div class="min-w-0">
                                                <div class="truncate">{{ artifact.zip.name }}</div>
                                                <div class="text-[12px] text-[#8b90a7]">
                                                    {{ artifact.zip.size_name }}
                                                    <template v-if="artifact.zip.update_time"> ·
                                                        {{ relativeTime(artifact.zip.update_time) }}
                                                    </template>
                                                </div>
                                            </div>
                                            <el-button link type="primary" size="small" @click="handleDownloadArtifact">
                                                下载
                                            </el-button>
                                        </div>
                                        
                                        <!--
                                            产物目录：两层 v-for 各自独占一个容器。
                                            若让 v-for 与静态节点 / v-if 同级，keyed 列表里会混入
                                            无 key 的节点或 v-if 的注释占位符，列表更新时
                                            patchKeyedChildren 处理不到锚点，抛 insertBefore of null。
                                        -->
                                        <div class="mt-[8px]">
                                            <div class="text-[12px] text-[#8b90a7] mb-[4px]">
                                                目录 {{ artifact.total.dirs }} 个 · 文件 {{ artifact.total.files }} 个
                                            </div>
                                        </div>
                                        <div class="artifact-tree">
                                            <div v-for="node in artifact.tree" :key="node.path" class="artifact-node">
                                                <div class="artifact-node-row">
                                                    <el-icon
                                                        :class="node.type === 'dir' ? 'text-[#409eff]' : 'text-[#a0a3bd]'">
                                                        <Folder v-if="node.type === 'dir'"/>
                                                        <Document v-else/>
                                                    </el-icon>
                                                    <span class="truncate flex-1">{{ node.name }}</span>
                                                    <!-- 三元取代 <template v-if>：不产生注释节点 -->
                                                    <span class="text-[12px] text-[#909399] shrink-0">
                                                        {{
                                                            node.type === 'dir' ? `${node.files} 个文件 · ` : ''
                                                        }}{{ node.size_name }}
                                                    </span>
                                                    <!-- v-show 取代 v-if：不产生注释节点 -->
                                                    <el-button v-show="node.type === 'file'" link type="primary"
                                                               size="small"
                                                               @click="handleDownloadArtifact(node.path, node.name)">下载
                                                    </el-button>
                                                </div>
                                                <!-- 始终渲染容器（不用 v-if）：避免注释节点进入 children 数组 -->
                                                <div class="artifact-node-children">
                                                    <div v-for="child in node.children" :key="child.path"
                                                         class="artifact-node-row is-child">
                                                        <el-icon
                                                            :class="child.type === 'dir' ? 'text-[#409eff]' : 'text-[#a0a3bd]'">
                                                            <Folder v-if="child.type === 'dir'"/>
                                                            <Document v-else/>
                                                        </el-icon>
                                                        <span class="truncate flex-1">{{ child.name }}</span>
                                                        <!-- 三元取代 <template v-if>：不产生注释节点 -->
                                                        <span class="text-[12px] text-[#909399] shrink-0">
                                                            {{
                                                                child.type === 'dir' ? `${child.files} 个文件 · ` : ''
                                                            }}{{ child.size_name }}
                                                        </span>
                                                        <!-- v-show 取代 v-if：不产生注释节点 -->
                                                        <el-button v-show="child.type === 'file'" link type="primary"
                                                                   size="small"
                                                                   @click="handleDownloadArtifact(child.path, child.name)">
                                                            下载
                                                        </el-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </el-scrollbar>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref, computed, watch, onMounted, onBeforeUnmount, onUnmounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {ElMessage, ElMessageBox} from 'element-plus'
import {Clock, CircleCheck, CircleClose, Loading, Folder, Document, WarnTriangleFilled} from '@element-plus/icons-vue'
import {getTaskDetail, getTaskSteps, getTaskArtifacts, downloadTaskArtifact} from '@/app/api/task'
import TaskTerminal from '@/app/components/task-terminal/index.vue'
import useTaskRunnerStore from '@/stores/modules/taskRunner'

const route = useRoute()
const router = useRouter()

/**
 * 两种使用模式：
 * - page（默认）：作为独立页面，任务标识取自路由 query.key / query.type，显示「返回」按钮
 * - component：作为组件内嵌（如抽屉），由父级通过 props 传入任务标识，不显示「返回」
 */
const props = withDefaults(defineProps<{
    taskKey?: string
    taskType?: string
    mode?: 'page' | 'component'
    /**
     * 是否已可见（组件模式由父级传入）
     *
     * 终端在不可见容器里初始化、输出日志时会操作 DOM，
     * 容器不在文档中会抛 insertBefore of null，故延到可见后再挂载。
     * 页面模式恒为 true。
     */
    visible?: boolean
}>(), {
    taskKey: '',
    taskType: '',
    mode: 'page',
    visible: true
})

const emit = defineEmits(['back', 'completed', 'ready'])

/** 是否为独立页面模式 */
const isPage = computed(() => props.mode !== 'component')

/** 全局任务执行器：任务推进、状态与进度都由它统一维护，这里只做订阅渲染 */
const runner = useTaskRunnerStore()

/** 任务标识：组件模式取 props，页面模式回退路由参数 */
const taskKey = computed(() => String(props.taskKey || route.query.key || ''))
/** 产物口径的任务类型：路由显式指定；为空时按任务记录自身的类型 */
const artifactType = computed(() => String(props.taskType || route.query.type || ''))
const pageLoading = ref(false)
const stepsLoading = ref(false)

/**
 * 组件是否已卸载（或正在卸载）
 *
 * 组件模式下（内嵌在面板 / 抽屉里），关闭动作可能正好发生在 refresh() 的 await 途中；
 * 此时若继续赋值，Vue 会去更新已销毁的组件，报
 * Cannot read properties of null (reading 'emitsOptions')。故异步返回后统一先检查。
 *
 * 必须在 onBeforeUnmount（同步，DOM 尚在）里置位：
 * onUnmounted 是 post render 回调，等它执行时子组件已经销毁完毕，
 * 期间到达的异步回调仍会去写状态、进而触发本组件的更新。
 */
let disposed = false

const info = ref<Record<string, any>>({})

/**
 * 云编译 / 与云编译服务器交互的任务，在云端侧的任务标识（task_id）。
 * 由后端 CloudBuildTaskHandler::snapshotMeta() 在任务收尾时固化到 task 记录的
 * task.snapshot_meta.cloud_task_id（build_task.task_id 的快照），用于任务结束后追溯云端任务。
 * 仅在云端分配了 task_id 时非空，故可直接用其存在性判定「是否云交互任务」。
 */
const cloudTaskId = computed(() => {
    const root: any = info.value || {}
    if (root.cloud_task_id) return root.cloud_task_id
    const snap: any = root.snapshot_meta ?? root.task?.snapshot_meta ?? {}
    return snap?.cloud_task_id || ''
})

/** 任务描述区的标签：按任务类型给出贴合业务的叫法，避免打包任务显示成「升级内容」 */
const descLabel = computed(() => {
    const map: Record<string, string> = {
        upgrade: '升级内容',
        addon_build: '打包内容',
        cloud_build: '编译内容',
        backup: '备份内容'
    }
    return map[String(info.value.task_type ?? '')] ?? '任务内容'
})
const steps = ref<any[]>([])
const taskTermRef = ref<any>(null)

/**
 * 页面展示的步骤
 * is_show=0 的步骤仍然会执行，只是不在卡片与执行进度中展示（如仅用于内部驱动的步骤）
 */
const visibleSteps = computed(() => steps.value.filter((s) => Number(s.is_show ?? 1) !== 0))

const stepsDone = computed(() => visibleSteps.value.filter((s) => ['success', 'skipped'].includes(s.status)).length)

/** 当前步骤：优先用后端下发的 current_step，其次取执行中/首个未完成的步骤 */
const currentStep = computed<any>(() => {
    const list = visibleSteps.value
    if (!list.length) return null
    const byKey = list.find((s: any) => s.step_key === info.value.current_step)
    if (byKey) return byKey
    return list.find((s: any) => s.status === 'running')
        ?? list.find((s: any) => !['success', 'skipped'].includes(s.status))
        ?? list[list.length - 1]
})

const currentStepIndex = computed(() => {
    if (!currentStep.value) return -1
    return visibleSteps.value.findIndex((s: any) => s.step_key === currentStep.value.step_key)
})

/** 等待决策：任务执行中遇到问题已暂停，等待用户选择操作（状态以全局执行器为准） */
const isWaitingInput = computed(() => {
    if (taskKey.value && runner.isTaskWaiting(taskKey.value)) return true
    return info.value.status === 'waiting_input'
})

/**
 * 可执行的操作（后端下发；未下发时给出默认三项：重试 / 跳过 / 取消任务）
 */
const taskActions = computed<any[]>(() => {
    const list = (runner.runtime(taskKey.value)?.actions ?? []).filter((a: any) => !!a?.code)
    if (list.length) return list
    
    return [
        {code: 'retry', label: '重试', style: 'primary'},
        {code: 'skip', label: '跳过', style: 'default'},
        {code: 'cancel', label: '取消任务', style: 'danger'}
    ]
})

/** 当前正在执行的操作 code（用于按钮 loading，避免重复点击） */
const operating = ref('')

/** 操作按钮样式：后端 style -> element 按钮 type */
const actionButtonType = (action: any) => {
    if (action?.style === 'danger') return 'danger'
    if (action?.style === 'primary') return 'primary'
    return 'default'
}

/**
 * 执行决策操作
 * - cancel：走终端的取消（带二次确认，并立即停流）
 * - retry / skip：走终端的 operate，随后自动恢复推进
 */
const handleAction = async (action: any) => {
    const code = String(action?.code ?? '')
    if (!code || operating.value) return
    
    if (code === 'cancel') {
        await handleCancel()
        return
    }
    
    operating.value = code
    try {
        await runner.operate(taskKey.value, code)
        ElMessage.success(code === 'skip' ? '已跳过当前步骤' : '已重试')
        await refresh()
    } catch (e: any) {
        ElMessage.error(e?.msg || e?.message || '操作失败')
    } finally {
        operating.value = ''
    }
}

const statusTagType = computed(() => {
    const status = info.value.status
    if (status === 'success') return 'success'
    if (['failed', 'rollback_failed'].includes(status)) return 'danger'
    if (status === 'waiting_input') return 'warning'
    if (['canceled', 'rolled_back'].includes(status)) return 'info'
    return 'primary'
})

/** 编译产物（云编译任务的 download.zip 与产物目录） */
const artifact = ref<Record<string, any>>({exists: false, zip: null, total: {}, tree: []})
const artifactLoading = ref(false)

/** 加载任务详情 */
const loadInfo = async () => {
    if (!taskKey.value) return
    try {
        const res: any = await getTaskDetail(taskKey.value)
        if (disposed) return
        info.value = res?.data ?? {}
    } catch (e) {
        if (disposed) return
        info.value = {}
    }
}

/** 加载步骤树 */
const loadSteps = async () => {
    if (!taskKey.value) return
    stepsLoading.value = true
    try {
        const res: any = await getTaskSteps(taskKey.value)
        if (disposed) return
        steps.value = Array.isArray(res?.data) ? res.data : []
    } catch (e) {
        if (disposed) return
        steps.value = []
    } finally {
        if (!disposed) stepsLoading.value = false
    }
}

/** 加载任务产物（云编译 / 备份等各有自己的产物） */
const loadArtifact = async () => {
    if (!taskKey.value) return
    
    artifactLoading.value = true
    try {
        const res: any = await getTaskArtifacts(taskKey.value, 2, artifactType.value)
        if (disposed) return
        artifact.value = res?.data ?? {exists: false, zip: null, total: {}, tree: []}
    } catch (e) {
        if (disposed) return
        artifact.value = {exists: false, zip: null, total: {}, tree: []}
    } finally {
        if (!disposed) artifactLoading.value = false
    }
}

/**
 * 下载产物
 * @param path 产物内相对路径；为空表示下载产物压缩包
 * @param name 下载文件名
 */
const handleDownloadArtifact = async (path: string = '', name: string = '') => {
    try {
        const blob: any = await downloadTaskArtifact(taskKey.value, path, artifactType.value)
        
        // 后端报错时返回的是错误信息 JSON，需解析提示而非直接下载
        if (blob?.type && String(blob.type).indexOf('application/json') !== -1) {
            const text = await blob.text()
            try {
                ElMessage.error((JSON.parse(text) ?? {}).msg || '下载失败')
            } catch (e) {
                ElMessage.error('下载失败')
            }
            return
        }
        
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = name || `cloud-build-${taskKey.value}.zip`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    } catch (e) {
        ElMessage.error('下载失败')
    }
}

const refresh = async () => {
    if (disposed) return
    await Promise.all([loadInfo(), loadSteps(), loadArtifact()])
}

/**
 * 跟随全局执行器刷新：任务每推进一次，同步详情与步骤进度
 * 页面不再自己起定时器轮询 —— 推进由 taskRunner store 统一驱动（离开本页面也不中断）
 */
let lastSyncAt = 0
let syncTimer: any = null

const stopSync = watch(() => runner.runtime(taskKey.value)?.updatedAt ?? 0, () => {
    if (disposed || !taskKey.value) return
    
    // 组件模式下面板 / 抽屉正在关闭（已不可见）：不再刷新自己。
    // 卸载过程中继续更新，容易把「正在销毁的子组件」卷进本组件的 patch。
    if (!isPage.value && !props.visible) return
    
    // 终态：补全详情与产物后停止跟随
    if (runner.isTaskTerminal(taskKey.value)) {
        refresh()
        return
    }
    
    // 节流：上传/下载等高频阶段 500ms 推进一次，无需每次都拉详情与步骤
    const wait = Math.max(0, 800 - (Date.now() - lastSyncAt))
    syncTimer && clearTimeout(syncTimer)
    syncTimer = setTimeout(() => {
        if (disposed) return
        lastSyncAt = Date.now()
        loadInfo()
        loadSteps()
        // 打包这类任务每完成一个子项就会产出文件，进行中也刷新产物，
        // 否则要等整个任务结束才看得到已经打好的包
        loadArtifact()
    }, wait)
})

/**
 * 组件模式下重新可见（面板 / 抽屉再次滑入）：补一次刷新，
 * 把「不可见期间」跳过跟随所错过的推进同步回来
 */
watch(() => props.visible, (val) => {
    if (isPage.value || !val || disposed) return
    refresh()
})

const onCompleted = () => {
    if (disposed) return
    refresh()
    // 组件模式下通知父级（用于刷新列表等）
    emit('completed')
}

const handleCancel = async () => {
    try {
        await ElMessageBox.confirm('确定要取消当前任务吗？', '取消任务', {
            type: 'warning', confirmButtonText: '确定取消', cancelButtonText: '再想想'
        })
    } catch (e) {
        return
    }
    try {
        await runner.cancel(taskKey.value)
        ElMessage.success('已取消任务')
        await refresh()
    } catch (e: any) {
        ElMessage.error(e?.msg || e?.message || '取消失败，请重试')
    }
}

const goBack = () => {
    emit('back')
    // 组件模式不做跳转：由父级决定关闭行为（如关闭面板）
    if (isPage.value) router.push('/admin/tools/task_records')
}

// ==================== 展示辅助 ====================

const stepStatusText = (status: string) => {
    const map: Record<string, string> = {
        pending: '待执行',
        running: '执行中',
        success: '已完成',
        failed: '失败',
        skipped: '已跳过',
        canceled: '已取消'
    }
    return map[status] ?? status
}

const stepStatusColor = (status: string) => {
    const map: Record<string, string> = {
        success: 'text-[#67c23a]',
        failed: 'text-[#f56c6c]',
        running: 'text-[#409eff]',
        canceled: 'text-[#909399]',
        skipped: 'text-[#909399]'
    }
    return map[status] ?? 'text-[#a0a3bd]'
}

/** 状态样式类（成功/失败/执行中/取消/跳过/待执行） */
const stepStatusClass = (status: string) => {
    const map: Record<string, string> = {
        success: 'is-success',
        failed: 'is-failed',
        running: 'is-running',
        canceled: 'is-canceled',
        skipped: 'is-skipped'
    }
    return map[status] ?? 'is-pending'
}

/** el-progress 的状态：失败变红；完成 / 执行中 / 待执行统一用主色 */
const barStatus = (status: string) => {
    if (status === 'failed') return 'exception'
    return ''
}

/** 步骤进度：成功按 100% 展示，其余取上报进度 */
const stepPercent = (step: any) => {
    if (step.status === 'success') return 100
    return Math.max(0, Math.min(100, Number(step.progress ?? 0)))
}

/** 已完成子步骤数 */
const stepDoneCount = (step: any) => {
    return (step.sub_steps ?? []).filter((sub: any) => sub.status === 'success').length
}

/**
 * 当前步骤已执行到的子步骤数（非「待执行」即视为已触及：含执行中/成功/失败/跳过/取消）
 * 用于步骤卡片内的进度行，替代原来的「步骤 X/Y（第几步）」，直观展示当前步骤内子步骤进度
 */
const stepSubReached = (step: any) => {
    return (step?.sub_steps ?? []).filter((s: any) => s.status !== 'pending').length
}

/** 子步骤右侧提示文案：仅「执行中/异常」需要提示，已完成与待执行保持简洁 */
const subStatusTail = (sub: any) => {
    const map: Record<string, string> = {
        running: '执行中...',
        failed: '执行失败',
        canceled: '已取消',
        skipped: '已跳过'
    }
    return map[sub.status] ?? ''
}

/** 相对时间：刚刚 / x分钟前 / x小时前 / x天前 */
const relativeTime = (ts: any) => {
    const time = Number(ts ?? 0)
    if (time <= 0) return '--'
    const diff = Math.max(0, Math.floor(Date.now() / 1000) - time)
    if (diff < 60) return '刚刚'
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
    return `${Math.floor(diff / 86400)}天前`
}

/** 卡片右下角：显示步骤执行时长
 *  优先用后端下发的 duration（部分云端展示步骤 start_at=0 但已有 duration）；
 *  否则用 结束-开始 差值；进行中用 现在-开始；无开始时间则按结束态显示 '--' */
const stepTimeText = (step: any) => {
    if (Number(step.duration) > 0) return formatDuration(step.duration)
    if (step.start_at > 0 && step.end_at > 0) return formatDuration(step.end_at - step.start_at)
    if (step.start_at > 0) return formatDuration(Math.floor(Date.now() / 1000) - step.start_at)
    return step.end_at > 0 ? '--' : '待执行'
}

/** 秒 => 1分20秒 / 45秒 */
const formatDuration = (seconds: any) => {
    const s = Number(seconds ?? 0)
    // 瞬时完成的步骤（耗时不足 1 秒）显示 <1秒，而非 '--'（'--' 仅表示「无时间数据」）
    if (s <= 0) return '<1秒'
    if (s < 60) return `${s}秒`
    const min = Math.floor(s / 60)
    const sec = s % 60
    if (min < 60) return `${min}分${sec}秒`
    return `${Math.floor(min / 60)}小时${min % 60}分`
}

const formatTime = (time: any) => {
    const t = Number(time ?? 0)
    return t > 0 ? new Date(t * 1000).toLocaleString() : '--'
}

const openUrl = (url: string) => {
    window.open(url, '_blank')
}

onMounted(async () => {
    if (!taskKey.value) {
        ElMessage.warning('缺少任务标识')
        return
    }
    pageLoading.value = true
    await refresh()
    if (disposed) return
    pageLoading.value = false
    // 首屏数据已到位，通知父级（用于在屏幕外渲染完成后再滑入）
    emit('ready')
    // 交由全局执行器接管：若任务仍在进行中，这里会续跑（已在跑的不会被打断）
    await runner.attach(taskKey.value)
})

/**
 * 任务标识变化：组件模式下父级可能切换任务，
 * 需要重新拉详情并让执行器接管推进
 */
watch(() => taskKey.value, async (val) => {
    if (!val) return
    pageLoading.value = true
    await refresh()
    if (disposed) return
    pageLoading.value = false
    emit('ready')
    await runner.attach(val)
})

/**
 * 卸载前（同步，子组件尚未销毁）：先停止跟随与在途刷新
 *
 * 放进 onBeforeUnmount 而不是 onUnmounted，是为了让这些动作发生在子组件销毁之前：
 * 卸载过程本身就是一次 patch，若此时还有新的更新进来（定时器 / 执行器推进），
 * 就会把「正在销毁的子组件」卷进本组件的 patch，出现 emitsOptions of null。
 */
onBeforeUnmount(() => {
    disposed = true
    // 停止页面跟随；任务推进由全局执行器持有，离开详情页不会中断
    stopSync()
    syncTimer && clearTimeout(syncTimer)
    syncTimer = null
})

onUnmounted(() => {
    // 标记已卸载：仍在途的异步回调据此跳过后续状态更新
    disposed = true
    stopSync()
    syncTimer && clearTimeout(syncTimer)
    syncTimer = null
})
</script>

<style lang="scss" scoped>
:deep(.el-card) {
    background: var(--el-bg-color);
}

:deep(.el-card__body) {
    height: 100%;
}

/* 任务信息：fixed 布局下长串（如云编译任务ID）在内容列内断行，不挤爆标签列 */
:deep(.el-descriptions__cell) {
    word-break: break-all;
    white-space: normal;
}

/* ===== 步骤卡片 ===== */
.step-card {
    position: relative;
    padding: 12px 12px 10px;
    margin-bottom: 8px;
    background-color: #fff;
    border: 1px solid #e8eaf0;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(29, 31, 58, .04);
    transition: border-color .2s, box-shadow .2s;
    
    &:hover {
        border-color: #c9d3e6;
    }
    
    /* 已完成 / 正在执行：边框为主色，背景为半透明主色 */
    &.is-success,
    &.is-running {
        background-color: var(--el-color-primary-light-9);
        border-color: var(--el-color-primary);
        opacity: 0.8;
    }
    
    /* 当前执行中的步骤：高亮 + 左侧色条 */
    &.is-active {
        background-color: var(--el-color-primary-light-8);
        border-color: var(--el-color-primary);
        box-shadow: 0 2px 8px rgba(64, 158, 255, .15);
        opacity: 0.8;
        
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 12px;
            bottom: 12px;
            width: 3px;
            background-color: #409eff;
            border-radius: 0 3px 3px 0;
        }
    }
}

.step-card-title {
    font-size: 13px;
    font-weight: 600;
    color: #1d1f3a;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.step-card-desc {
    margin-top: 3px;
    font-size: 12px;
    color: #8b90a7;
}

.step-badge {
    flex-shrink: 0;
    padding: 1px 8px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 9px;
    
    &.is-success {
        color: #389e0d;
        background-color: #eaf7e5;
    }
    
    &.is-failed {
        color: #cf1322;
        background-color: #fdeaea;
    }
    
    &.is-running {
        color: #0958d9;
        background-color: #e6f0ff;
    }
    
    &.is-canceled,
    &.is-skipped {
        color: #8b90a7;
        background-color: #f2f3f5;
    }
    
    &.is-pending {
        color: #8b90a7;
        background-color: #f5f6f8;
    }
}

.step-progress-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 12px;
    color: #606266;
}

.step-progress-percent {
    color: #909399;
}

.step-progress-bar {
    margin-top: 4px;
    
    :deep(.el-progress-bar__outer) {
        background-color: #eef0f5;
    }
}

.step-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 12px;
    color: #8b90a7;
    
    .step-foot-left,
    .step-foot-right {
        display: flex;
        align-items: center;
        gap: 4px;
        min-width: 0;
    }
    
    .step-foot-left {
        color: #409eff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.step-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
}

.step-tag {
    padding: 1px 8px;
    font-size: 12px;
    line-height: 18px;
    color: #5a6072;
    background-color: #f5f6f8;
    border-radius: 4px;
    
    &.is-error {
        color: #cf1322;
        background-color: #fdeaea;
    }
}

.sub-steps {
    margin-top: 6px;
    padding-left: 4px;
    border-left: 1px dashed #e4e7ed;
}

.sub-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 2px 0;
    font-size: 12px;
    color: #6b7280;
    
    .sub-name {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .sub-time {
        color: #a0a3bd;
    }
}

/* 右栏：当前步骤及其子步骤 */
.current-step-box {
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
}

.current-step-title {
    font-size: 13px;
    font-weight: 600;
    color: #1d1f3a;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.current-step-sub-title {
    margin-top: 10px;
    font-size: 12px;
    color: #8b90a7;
}

/* 子步骤时间线：图标 + 名称 + 右侧状态（参考执行进度列表样式） */
.sub-timeline {
    margin: 6px 0 0;
    padding: 0;
    list-style: none;
}

.sub-timeline-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 5px 0;
    font-size: 13px;
    color: #9aa0ab;
    
    .sub-icon {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        font-size: 17px;
        color: #c3c8d1;
    }
    
    .sub-text {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .sub-tail {
        flex-shrink: 0;
        font-size: 12px;
        color: #9aa0ab;
    }
    
    /* 未开始：灰色序号圈 */
    .sub-index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        font-size: 10px;
        line-height: 1;
        color: #9aa0ab;
        border: 1px solid #d4d8e0;
        border-radius: 50%;
    }
    
    /* 已完成：绿色勾 + 绿色文字 */
    &.is-success {
        color: #12a05f;
        
        .sub-icon {
            color: #12a05f;
        }
    }
    
    /* 执行中：蓝色转圈 + 蓝色加粗文字 + 右侧「执行中...」 */
    &.is-running {
        .sub-icon {
            color: #1c6ef2;
            
            /* 自绘旋转动画，不依赖 element-plus 版本自带类 */
            :deep(.is-loading) {
                animation: sub-step-spin 1s linear infinite;
            }
        }
        
        .sub-text {
            font-weight: 600;
            color: #1c6ef2;
        }
    }
    
    /* 失败 */
    &.is-failed {
        .sub-icon,
        .sub-text,
        .sub-tail {
            color: #f56c6c;
        }
    }
}

@keyframes sub-step-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/* 等待决策提示条 */
.task-alert {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    font-size: 13px;
    color: #b26b00;
    background-color: #fff7e6;
    border: 1px solid #ffe0a3;
    border-radius: 6px;
}

.artifact-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 4px 0;
    font-size: 13px;
    color: #303133;
}

.artifact-node-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 0;
    font-size: 13px;
    color: #303133;
    
    &.is-child {
        padding-left: 18px;
        font-size: 12px;
        color: #606266;
    }
}
</style>
