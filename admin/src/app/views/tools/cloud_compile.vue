<template>
    <div class="main-container page-sections w-full">
        <!-- 温馨提示：原为自定义说明卡，本身无关闭功能，故不保留关闭按钮 -->
        <tip-notice>
            发版与云编译都会发起一次云编译任务（全局同时只能执行一个任务）。区别：发版固定按「整体编译」执行并需填写版本信息，编译成功后会生成版本记录；云编译可选择编译范围，不生成版本记录。
        </tip-notice>

        <!-- 上：编译端口 -->
        <div>
            <div class="flex items-center justify-between mb-4">
                <span class="text-[16px] font-bold">编译端口</span>
                <el-button link type="primary" size="small" :icon="Refresh" @click="loadPorts">刷新</el-button>
            </div>

            <!-- 每行块高度一致；仅悬停右下角「编译命令」时浮出一整块，兄弟块的尺寸与位置不受影响 -->
            <div v-loading="portLoading" class="grid grid-cols-2 gap-[12px]">
                <div v-for="port in ports" :key="port.key" class="port-card-wrap" @mouseleave="scheduleLeave">
                    <div class="port-layer-base">
                        <div class="port-card">
                            <span class="port-icon" :style="{ color: port.color || 'var(--sys-color-primary)' }">
                                <el-icon :size="18">
                                    <component :is="portIcon(port.icon)" />
                                </el-icon>
                            </span>
                            <div class="min-w-0 flex-1">
                                <div class="port-title">{{ port.label }}</div>
                                <div class="port-desc">{{ port.desc || '-' }}</div>
                                <div v-if="port.last_version" class="port-version">
                                    最近版本 {{ port.last_version.version }} ·
                                    {{ formatTime(port.last_version.complete_time) }}
                                </div>
                            </div>
                            <div class="port-card-side">
                                <div class="flex items-center gap-[8px]">
                                    <el-button link type="primary" size="small" @click="openRelease(port)">发版</el-button>
                                    <el-button link type="primary" size="small" @click="openCompile(port)">云编译</el-button>
                                </div>
                                <span class="port-command-trigger" @mouseenter="onPortEnter(port, $event)">
                                    编译命令
                                    <el-icon :size="12"><ArrowDown /></el-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!ports.length && !portLoading" class="col-span-2 py-[20px] text-center text-[13px] text-[#94a3b8]">
                    暂无可用端口
                </div>
            </div>
        </div>

        <!-- 中：构建任务（仅当正在进行的任务是云编译时展示，且只展示这一条） -->
        <div v-if="activeBuildRows.length" class="table-panel">
            <table-toolbar title="构建任务" :selectable="false">
                <template #actions>
                    <el-button link type="primary" size="small" :icon="Refresh" @click="loadTasks">刷新</el-button>
                </template>
            </table-toolbar>

            <el-table v-loading="taskLoading" :data="activeBuildRows">
                <el-table-column label="目标/版本" min-width="180" show-overflow-tooltip>
                    <template #default="{ row }">
                        <div class="flex flex-col">
                            <span class="font-medium">{{ row.title || row.taskKey }}</span>
                            <span class="text-[12px] text-[#94a3b8]">{{ row.taskKey }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template #default="{ row }">
                        <el-tag :type="statusTag(row.status)" size="small" effect="light">{{ statusText(row.status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="进度" min-width="170">
                    <template #default="{ row }">
                        <div class="flex items-center gap-[8px]">
                            <el-progress :percentage="Number(row.progress ?? 0)" :stroke-width="6" :show-text="false"
                                         class="flex-1" :status="progressStatus(row.status)" />
                            <span class="w-[38px] text-right text-[12px] text-[#6b7280]">{{ Number(row.progress ?? 0) }}%</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="信息" min-width="180" show-overflow-tooltip>
                    <template #default="{ row }">
                        <span class="text-[13px] text-[var(--el-text-color-regular)]">{{ row.stage || '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="90" fixed="right">
                    <template #default="{ row }">
                        <el-button link type="primary" size="small" @click="toDetail(row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 下：版本管理 -->
        <div class="table-panel">
            <table-toolbar title="构建版本" :selectable="false">
                <template #actions>
                    <el-select v-model="versionFilter.port_key" placeholder="全部端口" clearable size="small"
                               class="!w-[140px]" @change="loadVersions">
                        <el-option v-for="port in ports" :key="port.key" :label="port.label" :value="port.key" />
                    </el-select>
                    <el-button link type="primary" size="small" :icon="Refresh" @click="loadVersions">刷新</el-button>
                </template>
            </table-toolbar>

            <el-table v-loading="versionLoading" :data="versionList">
                <el-table-column prop="port_name" label="端口" width="120" />
                <el-table-column prop="version" label="版本" width="130" show-overflow-tooltip />
                <el-table-column prop="remark" label="版本说明" min-width="180" show-overflow-tooltip />
                <el-table-column label="产物" width="190">
                    <template #default="{ row }">
                        <div class="flex items-center gap-[6px]">
                            <span class="text-[12px] text-[var(--el-text-color-regular)]">
                                {{ row.artifact_count }} 个文件 · {{ formatSize(row.artifact_size) }}
                            </span>
                            <el-button link type="primary" size="small" @click="downloadArtifact(row)">下载</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="生成时间" width="170">
                    <template #default="{ row }">{{ formatTime(row.complete_time) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{ row }">
                        <el-button link type="primary" size="small" @click="toTaskDetail(row)">任务详情</el-button>
                        <el-popconfirm title="确认删除该版本记录？" confirm-button-text="删除" cancel-button-text="取消"
                                       confirm-button-type="danger" @confirm="deleteVersion(row)">
                            <template #reference>
                                <el-button link type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
                <template #empty>
                    <div class="py-[30px] text-[13px] text-[#94a3b8]">暂无版本记录</div>
                </template>
            </el-table>

            <table-pagination
                v-if="versionTotal > versionSize"
                v-model:current-page="versionPage"
                v-model:page-size="versionSize"
                :total="versionTotal"
                :page-sizes="[10]"
                layout="total, prev, pager, next"
                @current-change="loadVersions"
            />
        </div>

        <!-- 发版：固定整体编译，只填版本信息 -->
        <el-dialog v-model="releaseVisible" :title="`新建${ releasePort?.label ?? '' }版本`" width="480px">
            <el-form ref="releaseFormRef" :model="releaseForm" :rules="releaseRules" label-position="top">
                <el-form-item label="版本号" prop="version">
                    <el-input v-model="releaseForm.version" placeholder="如 2026.09.16.171304" maxlength="64" />
                </el-form-item>
                <el-form-item label="版本说明">
                    <el-input v-model="releaseForm.remark" type="textarea" :rows="4" maxlength="200" show-word-limit
                              placeholder="本次版本的主要改动" resize="none" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="releaseVisible = false">取消</el-button>
                <el-button type="primary" :loading="submitting" @click="submitRelease">提交构建</el-button>
            </template>
        </el-dialog>

        <!-- 云编译：可选择编译范围 -->
        <el-dialog v-model="compileVisible" :title="`云编译 - ${ compilePort?.label ?? '' }`" width="520px">
            <div class="dialog-section-title">选择编译范围</div>

            <div class="scope-list">
                <div v-for="scope in scopeOptions" :key="scope.value" class="scope-item"
                     :class="{ 'is-active': compileForm.scope === scope.value }"
                     @click="compileForm.scope = scope.value">
                    <div class="min-w-0 flex-1">
                        <div class="scope-label">{{ scope.label }}</div>
                        <div class="scope-desc">{{ scope.desc }}</div>
                    </div>
                    <el-icon class="scope-check">
                        <CircleCheckFilled v-if="compileForm.scope === scope.value" />
                        <span v-else class="scope-radio"></span>
                    </el-icon>
                </div>
            </div>

            <!-- 仅插件：选择要编译的插件 -->
            <template v-if="compileForm.scope === 'plugin'">
                <div class="dialog-section-title mt-[14px]">
                    选择插件<span class="ml-[6px] text-[12px] font-normal text-[#8b90a7]">（可多选）</span>
                </div>
                <el-select v-model="compileForm.addon" multiple collapse-tags collapse-tags-tooltip
                           placeholder="请选择插件" class="w-full mt-[8px]" :loading="addonLoading">
                    <el-option v-for="item in addonItems" :key="item.key" :label="item.label" :value="item.key" />
                </el-select>
            </template>

            <template #footer>
                <el-button @click="compileVisible = false">取消</el-button>
                <el-button type="primary" :loading="submitting" @click="submitCompile">开始编译</el-button>
            </template>
        </el-dialog>

        <!-- 编译前校验：统一校验组件（校验通过后自动下一步开始编译） -->
        <el-dialog v-model="checkVisible" title="编译环境校验" width="65vw" :destroy-on-close="true"
                   :close-on-click-modal="false" append-to-body>
            <verify-panel ref="checkRef" scene="cloud_build" :params="checkParams" :auto-next="true"
                          prev-text="取消" next-text="开始编译"
                          @next="onCheckNext" @prev="checkVisible = false" />
        </el-dialog>

        <!-- 任务终端（查询任务实时输出） -->
        <el-drawer v-model="terminalVisible" :title="currentTask.title || '任务详情'" size="60%" :destroy-on-close="true">
            <div v-if="currentTask.task_key" class="flex h-full flex-col">
                <task-terminal :task-key="currentTask.task_key" class="h-full" @completed="onTaskCompleted" />
            </div>
        </el-drawer>

        <!-- 悬停浮出的卡片副本：teleport 到 body + fixed 定位，
             不参与文档流（不会撑出滚动条），也不受任何祖先 overflow 裁剪 -->
        <teleport to="body">
            <transition name="port-float">
            <div v-if="hoverPort" class="port-float" :style="floatStyle"
                 @mouseenter="cancelLeave" @mouseleave="scheduleLeave">
                <div class="port-card">
                    <span class="port-icon" :style="{ color: hoverPort.color || 'var(--sys-color-primary)' }">
                        <el-icon :size="18">
                            <component :is="portIcon(hoverPort.icon)" />
                        </el-icon>
                    </span>
                    <div class="min-w-0 flex-1">
                        <div class="port-title">{{ hoverPort.label }}</div>
                        <div class="port-desc">{{ hoverPort.desc || '-' }}</div>
                        <div v-if="hoverPort.last_version" class="port-version">
                            最近版本 {{ hoverPort.last_version.version }} ·
                            {{ formatTime(hoverPort.last_version.complete_time) }}
                        </div>
                    </div>
                    <div class="port-card-side">
                        <div class="flex items-center gap-[8px]">
                            <el-button link type="primary" size="small" @click="clickInFloat((port) => openRelease(port))">
                                发版
                            </el-button>
                            <el-button link type="primary" size="small" @click="clickInFloat((port) => openCompile(port))">
                                云编译
                            </el-button>
                        </div>
                        <span class="port-command-trigger">
                            编译命令
                            <el-icon :size="12"><ArrowDown /></el-icon>
                        </span>
                    </div>
                </div>

                <!-- 命令区：与卡片同属一个整体，中间无分隔边框 -->
                <div class="port-command-panel is-open">
                    <div class="port-command-body">
                        <div class="port-command-head">编译命令</div>
                        <div v-for="cmd in hoverPort.commands" :key="cmd.scope" class="port-command-item">
                            <div class="flex items-center justify-between gap-[8px]">
                                <span class="port-command-scope">{{ cmd.scope_label }}</span>
                                <el-button link type="primary" size="small" @click="copyCommand(cmd.command)">复制</el-button>
                            </div>
                            <div class="port-command-text">{{ cmd.command }}</div>
                        </div>
                        <div v-if="!hoverPort.commands || !hoverPort.commands.length" class="port-command-empty">
                            暂无编译命令
                        </div>
                    </div>
                </div>
            </div>
            </transition>
        </teleport>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, markRaw } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, Monitor, Iphone, ChatDotRound, Box, CircleCheckFilled, ArrowDown } from '@element-plus/icons-vue'
import { getBuildPorts, getBuildVersionList, setBuildVersionRelease, delBuildVersions } from '@/app/api/cloud'
import { getTaskActive, createTask, downloadTaskArtifact } from '@/app/api/task'
import { getInstalledAddonList } from '@/app/api/addon'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import TipNotice from '@/components/tip-notice/index.vue'
import TaskTerminal from '@/app/components/task-terminal/index.vue'
import VerifyPanel from '@/app/components/verify-panel/index.vue'
import useTaskRunnerStore, { TERMINAL_STATUS } from '@/stores/modules/taskRunner'

/** 全局任务执行器：进行中的任务统一由它推进，这里只读取状态用于展示 */
const runner = useTaskRunnerStore()

/** 端口图标（dict 下发的是组件名字符串）；markRaw 避免组件被响应式代理 */
const iconMap: Record<string, any> = {
    Monitor: markRaw(Monitor),
    Iphone: markRaw(Iphone),
    ChatDotRound: markRaw(ChatDotRound),
    Box: markRaw(Box)
}
const portIcon = (name: string) => iconMap[ name ] || Box

// ==================== 端口卡片悬浮 ====================
/** 当前悬停的端口（非空时浮出卡片副本） */
const hoverPort = ref<any>(null)
/** 浮层的 fixed 定位样式（与原卡片对齐） */
const floatStyle = ref<Record<string, string>>({})
/** 离开后延迟关闭，便于鼠标移到浮层上继续操作 */
let leaveTimer: number | null = null

const onPortEnter = (port: any, event: MouseEvent) => {
    cancelLeave()
    if (hoverPort.value && hoverPort.value.key === port.key) return

    const trigger = event.currentTarget as HTMLElement
    const wrap = trigger.closest('.port-card-wrap') as HTMLElement | null
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const card = wrap.querySelector('.port-card') as HTMLElement | null
    const cardHeight = card ? card.getBoundingClientRect().height : rect.height

    // 命令区可用高度：以不超出视口底部为准（不够时内部滚动，避免浮层被视口裁掉）
    const available = Math.floor(window.innerHeight - rect.top - rect.height - 16)

    hoverPort.value = port
    // 定位信息全部走内联样式：即使样式表尚未生效也不会短暂参与文档流（避免滚动条闪现）
    floatStyle.value = {
        position: 'fixed',
        zIndex: '2000',
        boxSizing: 'border-box',
        left: `${ rect.left }px`,
        top: `${ Math.max(8, rect.top) }px`,
        width: `${ rect.width }px`,
        minHeight: `${ rect.height }px`,
        '--port-card-h': `${ cardHeight }px`,
        '--port-panel-max': `${ Math.min(Math.max(available, 150), 460) }px`
    }
}

/** 鼠标移到浮层上：取消关闭 */
const cancelLeave = () => {
    if (leaveTimer !== null) {
        clearTimeout(leaveTimer)
        leaveTimer = null
    }
}

const scheduleLeave = (event?: MouseEvent) => {
    const next = event?.relatedTarget
    // 浮层盖住原卡片时，指针会从卡片移到浮层，这次离开不能当成收起
    if (next instanceof Element && next.closest('.port-float')) return

    cancelLeave()
    leaveTimer = window.setTimeout(() => {
        hoverPort.value = null
        leaveTimer = null
    }, 120)
}

/**
 * 浮层内的操作：先用快照取端口再收起浮层
 * 注意顺序：若先清空 hoverPort 再执行回调，回调里读到的就是 null（port.key 会抛错）
 */
const clickInFloat = (fn: (port: any) => void) => {
    cancelLeave()
    const port = hoverPort.value
    hoverPort.value = null
    if (!port) return
    fn(port)
}

/** 页面滚动 / 缩放时收起：fixed 浮层不再跟随卡片，留着会错位 */
const closeFloat = () => {
    cancelLeave()
    hoverPort.value = null
}

/** 复制编译命令：非 HTTPS 环境 clipboard API 不可用，降级走临时 textarea */
const copyCommand = (command: string) => {
    if (!command) return

    const done = () => ElMessage.success('命令已复制')

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(command).then(done).catch(() => fallbackCopy(command, done))
        return
    }
    fallbackCopy(command, done)
}

const fallbackCopy = (command: string, done: () => void) => {
    const textarea = document.createElement('textarea')
    textarea.value = command
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()

    try {
        document.execCommand('copy') ? done() : ElMessage.warning('复制失败，请手动选择复制')
    } catch (e) {
        ElMessage.warning('复制失败，请手动选择复制')
    } finally {
        document.body.removeChild(textarea)
    }
}

// ==================== 端口 ====================
const ports = ref<any[]>([])
const portLoading = ref(false)
/** 提交中（发版 / 云编译创建任务期间禁用按钮） */
const submitting = ref(false)

const loadPorts = () => {
    portLoading.value = true
    getBuildPorts().then((res: any) => {
        ports.value = res?.data ?? []
    }).catch(() => {
        ports.value = []
    }).finally(() => {
        portLoading.value = false
    })
}

/**
 * 发起云编译
 * @param port 端口
 * @param options 编译范围（scope/插件）
 * @param versionInfo 版本信息（发版时携带，编译成功后据此落版本记录）
 */
// ==================== 编译前校验（统一校验组件） ====================
const checkVisible = ref(false)
const checkRef = ref<any>(null)
/** 传给校验场景的业务参数 */
const checkParams = ref<Record<string, any>>({})
/** 校验通过后待执行的编译参数 */
const pendingBuild = ref<{ port: any, options: Record<string, any>, versionInfo: Record<string, any> } | null>(null)

/**
 * 打开编译前校验：暂存本次编译参数，校验通过（autoNext）后自动下一步开始编译
 */
const openCheck = (port: any, options: Record<string, any> = {}, versionInfo: Record<string, any> = {}) => {
    pendingBuild.value = { port, options, versionInfo }
    checkParams.value = {
        scope: options.scope || 'all',
        port: port?.key ? [ port.key ] : [],
        addon: options.addon || []
    }
    checkVisible.value = true
}

/** 校验通过后的下一步：真正创建编译任务；未通过时组件已禁用该按钮 */
const onCheckNext = () => {
    const pending = pendingBuild.value
    checkVisible.value = false
    pendingBuild.value = null
    if (!pending) return

    startBuild(pending.port, pending.options, pending.versionInfo)
}

const startBuild = (port: any, options: Record<string, any> = {}, versionInfo: Record<string, any> = {}) => {
    if (!port || !port.key) return
    submitting.value = true
    // 先占位打开任务详情：创建期间（后端要拷贝源码并压缩，较慢）不留空窗
    runner.openPendingDetail('cloud_build', '正在发起编译')
    createTask('cloud_build', {
        scope: options.scope || 'all',
        port: [ port.key ],
        addon: options.addon || [],
        ...versionInfo
    }).then(async (res: any) => {
        const key = res?.data?.task_key
        if (!key) {
            runner.closePendingDetail()
            ElMessage.error('任务创建失败')
            return
        }
        // 不跳转：留在本页，由「构建任务」区块展示该任务的实时进度（任务由全局执行器推进）
        await runner.start(key)
        await loadTasks()
        toDetail({ task_key: key })
    }).catch((err: any) => {
        runner.closePendingDetail()
    }).finally(() => {
        submitting.value = false
    })
}

// ==================== 发版（固定整体编译） ====================
const releaseVisible = ref(false)
const releasePort = ref<any>(null)
const releaseFormRef = ref<any>(null)
const releaseForm = reactive({ version: '', remark: '' })
const releaseRules = {
    version: [ { required: true, message: '请输入版本号', trigger: 'blur' } ]
}

/** 默认版本号：2026.09.16.171304（年月日.时分秒） */
const defaultVersion = () => {
    const d = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${ d.getFullYear() }.${ pad(d.getMonth() + 1) }.${ pad(d.getDate()) }.${ pad(d.getHours()) }${ pad(d.getMinutes()) }${ pad(d.getSeconds()) }`
}

const openRelease = (port: any) => {
    if (!port) return
    releasePort.value = port
    releaseForm.version = defaultVersion()
    releaseForm.remark = ''
    releaseVisible.value = true
}

const submitRelease = () => {
    releaseFormRef.value?.validate((valid: boolean) => {
        if (!valid) return
        // 发版固定整体编译，不提供范围选择；先做编译前校验，通过后自动开始编译
        openCheck(releasePort.value, { scope: 'all', addon: [] }, {
            version: releaseForm.version,
            remark: releaseForm.remark
        })
        releaseVisible.value = false
    })
}

// ==================== 云编译（可选编译范围） ====================
const compileVisible = ref(false)
const compilePort = ref<any>(null)
const addonItems = ref<any[]>([])
const addonLoading = ref(false)

/** 当前端口支持的编译范围（由端口接口返回；少于 2 项时无需选择） */
const scopeOptions = computed<any[]>(() => ( compilePort.value?.scopes ?? [] ))

const compileForm = reactive<{ scope: string; addon: string[] }>({ scope: 'all', addon: [] })

const loadAddons = () => {
    if (addonItems.value.length > 0) return
    addonLoading.value = true
    getInstalledAddonList().then((res: any) => {
        const list = Array.isArray(res?.data) ? res.data : Object.values(res?.data || {})
        addonItems.value = list.map((item: any) => ({
            key: item.key ?? item.addon,
            label: item.title || item.name || item.key
        })).filter((item: any) => !!item.key)
    }).catch(() => {
        addonItems.value = []
    }).finally(() => {
        addonLoading.value = false
    })
}

const openCompile = (port: any) => {
    if (!port) return
    compilePort.value = port

    const scopes = port?.scopes ?? []
    // 该端口只有一种编译范围（如自定义端口、web 端）=> 直接按默认范围发起，不再弹窗
    if (scopes.length <= 1) {
        startBuild(port, { scope: port?.default_scope || 'all', addon: [] })
        return
    }

    compileForm.scope = port?.default_scope || scopes[ 0 ]?.value || 'all'
    compileForm.addon = []
    compileVisible.value = true
    loadAddons()
}

const submitCompile = () => {
    if (compileForm.scope === 'plugin' && !compileForm.addon.length) {
        ElMessage.warning('请选择要编译的插件')
        return
    }
    // 先做编译前校验，通过后自动开始编译
    openCheck(compilePort.value, { scope: compileForm.scope, addon: compileForm.addon })
    compileVisible.value = false
}

// ==================== 构建任务（仅当前进行中的云编译任务） ====================
const taskLoading = ref(false)

/**
 * 当前进行中的云编译任务
 * 取自全局执行器：非云编译任务 / 任务已结束 / 无进行中任务 时整块不展示
 */
const activeBuildTask = computed<any>(() => {
    // 从所有进行中的任务里取云编译任务：互斥任务可能有多种类型，
    // 顶部指示器展示的「优先任务」不一定是云编译，故不能直接取 activeKey
    const rt = Object.values(runner.tasks).find(
        (item: any) => item?.taskType === 'cloud_build' && !TERMINAL_STATUS.includes(String(item?.status ?? ''))
    )
    return rt ?? null
})

/** 表格数据：只展示这一条进行中的任务 */
const activeBuildRows = computed<any[]>(() => activeBuildTask.value ? [ activeBuildTask.value ] : [])

/** 刷新：同步进行中的任务，并交由全局执行器接管（已在推进的不会被打断） */
const loadTasks = async () => {
    taskLoading.value = true
    try {
        const res: any = await getTaskActive()
        const data = res?.data
        // 进行中的任务可能有多个（互斥 + 非互斥并行），这里只接管云编译任务
        const list = Array.isArray(data?.list) && data.list.length ? data.list : ( data?.task_key ? [ data ] : [] )
        const row = list.find((item: any) => item?.task_type === 'cloud_build' && !TERMINAL_STATUS.includes(String(item?.status ?? '')))
        if (row?.task_key) await runner.attach(String(row.task_key))
    } catch (e) {
        // 无进行中任务时接口可能返回空，忽略
    } finally {
        taskLoading.value = false
    }
}

/**
 * 任务结束（构建任务区块收起）：刷新端口与版本
 * 发版任务编译成功后后端会落一条版本记录，这里同步拉取
 */
watch(() => activeBuildTask.value?.taskKey ?? '', (val, oldVal) => {
    if (oldVal && !val) {
        loadVersions()
        loadPorts()
    }
})

function statusTag(status: string): any {
    if (status === 'success') return 'success'
    if (status === 'failed' || status === 'rollback_failed') return 'danger'
    if (status === 'canceled' || status === 'rolled_back') return 'info'
    if (status === 'waiting_input') return 'warning'
    return 'primary'
}

/** 任务状态文案（进行中的任务取自全局执行器，没有 status_name 字段，这里按状态映射） */
function statusText(status: string): string {
    const map: Record<string, string> = {
        created: '已创建', running: '执行中', waiting_input: '等待决策', rolling_back: '回滚中',
        success: '成功', failed: '失败', canceled: '已取消', rolled_back: '已回滚', rollback_failed: '回滚失败'
    }
    return map[ status ] ?? status ?? '-'
}

/** 进度条配色：失败红色、成功绿色，其余主色 */
function progressStatus(status: string): any {
    if (status === 'success') return 'success'
    if (status === 'failed' || status === 'rollback_failed') return 'exception'
    return ''
}

const toDetail = (row: any) => {
    // 兼容两种数据来源：全局执行器运行时（taskKey）与任务记录（task_key）
    const key = row?.task_key ?? row?.taskKey
    if (!key) return
    // 全局抽屉打开：留在本页查看执行输出
    runner.openDetail(String(key), 'cloud_build')
}

// ==================== 版本管理 ====================
const versionList = ref<any[]>([])
const versionLoading = ref(false)
const versionPage = ref(1)
const versionSize = ref(10)
const versionTotal = ref(0)
const versionFilter = reactive<Record<string, any>>({ port_key: '' })

const loadVersions = () => {
    versionLoading.value = true
    getBuildVersionList({
        page: versionPage.value,
        limit: versionSize.value,
        port_key: versionFilter.port_key
    }).then((res: any) => {
        const data = res?.data ?? {}
        versionList.value = data.data ?? []
        versionTotal.value = data.total ?? 0
    }).catch(() => {
        versionList.value = []
    }).finally(() => {
        versionLoading.value = false
    })
}

const toggleRelease = (row: any) => {
    setBuildVersionRelease(row.id, row.release_status === 1 ? 0 : 1).then(() => loadVersions())
}

const deleteVersion = (row: any) => {
    delBuildVersions([ row.id ]).then(() => loadVersions())
}

const toTaskDetail = (row: any) => toDetail({ task_key: row.task_key })

/** 下载该版本对应的编译产物压缩包 */
const downloadArtifact = async (row: any) => {
    try {
        const blob: any = await downloadTaskArtifact(row.task_key)
        if (!blob) return
        if (blob?.type && String(blob.type).indexOf('application/json') !== -1) {
            ElMessage.error('产物不存在或已被清理')
            return
        }
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${ row.port_key }-${ row.version }.zip`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    } catch (e) {
        ElMessage.error('下载失败')
    }
}

// ==================== 任务终端 ====================
const terminalVisible = ref(false)
const currentTask = ref<any>({})

const openTerminal = (row: any) => {
    currentTask.value = row
    terminalVisible.value = true
}

const onTaskCompleted = () => {
    loadTasks()
    loadVersions()
    loadPorts()
}

// ==================== 展示辅助 ====================
function formatTime(value: any): string {
    if (!value) return '-'
    // 后端可能返回已格式化字符串（含日期分隔符），此时原样展示
    if (typeof value === 'string' && ( value.includes('-') || value.includes('/') )) return value

    const time = Number(value)
    if (!time || Number.isNaN(time)) return '-'
    const date = new Date(time * 1000)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${ date.getFullYear() }-${ pad(date.getMonth() + 1) }-${ pad(date.getDate()) } ${ pad(date.getHours()) }:${ pad(date.getMinutes()) }:${ pad(date.getSeconds()) }`
}

function formatSize(bytes: any): string {
    const size = Number(bytes ?? 0)
    if (size <= 0) return '0 B'
    const units = [ 'B', 'KB', 'MB', 'GB', 'TB' ]
    const power = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1)
    return ( power === 0 ? String(size) : ( size / Math.pow(1024, power) ).toFixed(2) ) + ' ' + units[ power ]
}

onMounted(() => {
    loadPorts()
    loadTasks()
    loadVersions()
    window.addEventListener('scroll', closeFloat, true)
    window.addEventListener('resize', closeFloat)
})

onBeforeUnmount(() => {
    cancelLeave()
    window.removeEventListener('scroll', closeFloat, true)
    window.removeEventListener('resize', closeFloat)
})
</script>

<style lang="scss" scoped>
::deep(.el-drawer__body) {
    padding: 12px;
}

/* 原位卡片撑起行高：悬停时它不动，浮出的副本与它对齐 */
.port-card-wrap {
    height: 100%;
}

.port-layer-base {
    height: 100%;
    background-color: #fff;
    border: 1px solid #e8eaf0;
    border-radius: 10px;
}

.port-card {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-height: 92px; // 统一卡片高度：每行块高度一致，浮出前后也不会跳动
    padding: 14px 16px;
}

.port-card-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    align-self: stretch;
    flex-shrink: 0;
}

.port-command-trigger {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 12px;
    line-height: 20px;
    color: var(--sys-color-primary);
    cursor: pointer;
    user-select: none;
}

.port-layer-base .port-card {
    height: 100%;
}

.port-float .port-card {
    min-height: var(--port-card-h, 92px);
    box-sizing: border-box;
}

/* 浮出的卡片副本：Portal 到 body + fixed 定位（不被任何祖先裁剪、不撑出滚动条） */
.port-float {
    position: fixed;
    z-index: 2000;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid var(--el-color-primary-light-5);
    border-radius: 10px;
    box-shadow: 0 10px 24px rgba(29, 31, 58, .12);
}

/* 浮层本身不位移、不缩放，避免和底下原卡片错位造成颤抖 */
.port-float-enter-active,
.port-float-leave-active {
    transition: opacity .15s ease;
}

.port-float-enter-from,
.port-float-leave-to {
    opacity: 0;
}

/* 只展开命令区高度，卡片位置保持不动 */
.port-float .port-command-panel {
    display: grid;
    grid-template-rows: 1fr;
    animation: port-panel-expand .28s cubic-bezier(.22, .61, .36, 1) both;
}

.port-command-body {
    min-height: 0;
    overflow: hidden;
    max-height: var(--port-panel-max, 360px);
    padding: 0 16px 14px;
}

@keyframes port-panel-expand {
    from { grid-template-rows: 0fr; }
    to { grid-template-rows: 1fr; }
}

.port-command-head {
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #1d1f3a;
}

.port-command-item + .port-command-item {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed var(--el-border-color-lighter);
}

.port-command-scope {
    font-size: 12px;
    color: var(--el-color-primary);
}

.port-command-text {
    margin-top: 4px;
    padding: 6px 8px;
    font-size: 12px;
    line-height: 18px;
    color: #303133;
    word-break: break-all;
    background-color: #f6f8fb;
    border-radius: 4px;
}

.port-command-empty {
    font-size: 12px;
    color: #94a3b8;
}

.port-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    flex-shrink: 0;
    background: color-mix(in srgb, currentColor 12%, #fff);
}

.port-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--sys-color-text-primary);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.port-desc {
    margin-top: 2px;
    font-size: 12px;
    color: #8b90a7;
}

.port-version {
    margin-top: 4px;
    font-size: 12px;
    color: var(--sys-color-text-secondary);
}

.dialog-section-title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #1d1f3a;
}

.scope-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.scope-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
    transition: border-color .2s, background-color .2s, box-shadow .2s;

    &:hover {
        border-color: var(--el-color-primary-light-5);
        background-color: #fafbfd;
    }

    /* 选中态：主色描边 + 浅色底 + 右上角勾选 */
    &.is-active {
        border-color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
        box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }

    .scope-label {
        font-size: 14px;
        font-weight: 600;
        color: #1d1f3a;
    }

    .scope-desc {
        margin-top: 2px;
        font-size: 12px;
        line-height: 18px;
        color: #8b90a7;
    }

    .scope-check {
        flex-shrink: 0;
        width: 18px;
        height: 18px;
        font-size: 18px;
        color: var(--el-color-primary);
    }

    /* 未选中：空心圆点占位 */
    .scope-radio {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid var(--el-border-color-darker);
        border-radius: 50%;
    }

    &.is-active .scope-radio {
        border-color: var(--el-color-primary);
    }
}
</style>
