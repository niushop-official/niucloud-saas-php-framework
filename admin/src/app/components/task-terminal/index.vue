<template>
    <!-- 仅渲染终端输出区：头部（状态/清屏）与底部（进度/操作）由使用方页面组装，保证视觉整体性 -->
    <!-- 上传 / 下载进度作为终端内的一行消息，复用推入的消息对象引用原地刷新 content，实现终端内单行更新 -->
    <div class="task-terminal flex min-h-0 h-full flex-1 flex-col overflow-hidden">
        <div class="tt-titlebar">
            <!-- 单状态点：运行中绿色 / 等待决策黄色 / 已结束红色（不再用三圆点装饰） -->
            <span class="tt-dot" :class="dotClass"></span>
            <span class="tt-title">{{ titleText }}</span>
        </div>
        <terminal
            ref="terminalRef"
            :name="terminalName"
            context=""
            context-suffix=""
            :input-filter="blockInput"
            :command-formatter="formatCommand"
            :show-header="false"
            :init-log="null"
            :auto-help="false"
            :enable-example-hint="false"
            class="flex-1 min-h-0 h-wull tt-body"
            @exec-cmd="onExecCmd"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Terminal, TerminalFlash, TerminalAsk } from 'vue-web-terminal'
import 'vue-web-terminal/lib/theme/dark.css'
import { getTaskConfig, getTaskEvents } from '@/app/api/task'
import useTaskRunnerStore from '@/stores/modules/taskRunner'

const props = defineProps({
    /** 任务标识 */
    taskKey: { type: String, required: true },
    /**
     * 实时 SSE 地址（可选的多源实时通道）
     * - 云编译可传第三方 SSE 地址；留空则由全局执行器轮询驱动
     * - 仅用于「额外渲染」，不参与任务推进（推进统一由 taskRunner store 负责）
     */
    sseUrl: { type: String, default: '' },
    /** 挂载后是否自动开始（加载状态并渲染） */
    autoStart: { type: Boolean, default: true },
    /**
     * 等待决策时是否在终端内询问（TerminalAsk）
     * - true（默认）：终端内用输入框让用户选操作
     * - false：不在终端内询问，仅输出提示，操作按钮由使用方页面（如任务详情页）提供
     */
    autoAsk: { type: Boolean, default: true }
})

const emit = defineEmits([ 'completed', 'update:status' ])

// ==================== 全局任务执行器 ====================
// 任务推进（run 轮询）统一由 store 负责：本组件只做状态订阅与日志渲染，
// 因此离开页面后任务仍会继续推进，回到页面时也能接着渲染已有事件流。
const runner = useTaskRunnerStore()

const rt = computed<any>(() => runner.tasks[ props.taskKey ] ?? null)

// ==================== 任务状态（全部取自 store，保证各页面一致） ====================
const terminalRef = ref<any>(null)
const terminalName = 'task-terminal-' + Date.now()

const status = computed(() => rt.value?.status ?? '')
const progress = computed(() => Number(rt.value?.progress ?? 0))
const stage = computed(() => rt.value?.stage ?? '')
const actions = computed<any[]>(() => rt.value?.actions ?? [])
const startTime = computed(() => Number(rt.value?.startTime ?? 0))
const duration = computed(() => Number(rt.value?.duration ?? 0))
// 任务锁被其它进程占用（瞬时状态，不代表任务真实状态；后端租约到期会自动接管）
const locked = computed(() => !!rt.value?.locked)

const isTerminal = computed(() => [ 'success', 'failed', 'canceled', 'rolled_back', 'rollback_failed' ].includes(status.value))
const waitingInput = computed(() => status.value === 'waiting_input')

// 任务状态名称由后端 TaskDict 维护：多个终端实例共用同一份字典，只拉一次
const statusOptions = ref<Array<{ label: string, value: string }>>([])
let statusDictRequested = false

function loadTaskConfig() {
    if (statusDictRequested) return
    statusDictRequested = true

    getTaskConfig().then((res: any) => {
        statusOptions.value = res?.data?.status || []
    }).catch(() => {
        statusDictRequested = false // 失败则允许后续实例重试
        statusOptions.value = []
    })
}

/** 字典未就绪时回退为状态标识本身（不写死文案） */
const statusText = computed(() => {
    const hit = statusOptions.value.find(item => item.value === status.value)
    return hit?.label || status.value || '-'
})

// 窗口标题栏文案：带任务标识，强化终端窗口感
const titleText = computed(() => props.taskKey ? `执行终端 · ${ props.taskKey }` : '执行终端')

// 标题栏状态点：运行中绿色 / 等待决策（暂停）黄色 / 已结束红色
const dotClass = computed(() => {
    if (waitingInput.value) return 'tt-dot-yellow'
    if (isTerminal.value) return 'tt-dot-red'
    return 'tt-dot-green'
})

const statusTagType = computed(() => {
    if (status.value === 'success') return 'success'
    if ([ 'failed', 'rollback_failed' ].includes(status.value)) return 'danger'
    if (waitingInput.value) return 'warning'
    if (status.value === 'canceled' || status.value === 'rolled_back') return 'info'
    return 'primary'
})

const progressStatus = computed(() => {
    if (status.value === 'success') return 'success'
    if ([ 'failed', 'rollback_failed' ].includes(status.value)) return 'exception'
    return ''
})

const durationText = computed(() => {
    if (!startTime.value) return '--'
    const mins = Math.floor(duration.value / 60)
    const secs = duration.value % 60
    return mins > 0 ? `${ mins }分${ secs }秒` : `${ secs }秒`
})

watch(status, (val) => {
    emit('update:status', val)
    // 离开等待决策：允许下次再次提示
    if (val !== 'waiting_input') askedForActions = false
})

// ==================== 终端输出 ====================
// 已渲染文本集合，避免 SSE 与轮询双通道重复输出
const renderedTexts = new Set<string>()
// 已实时展示过的进度（key:percent）：终态补渲染时据此跳过，避免与实时进度条重复留痕
const progressSeen = new Set<string>()
// 已渲染到 store 事件流的下标（增量渲染）
let renderedIndex = 0

// 进度条（key => { label, percent }），用于上传/下载等带进度的任务
const progressBars = reactive<Record<string, { label: string, percent: number }>>({})
// 终端内实时回显（TerminalFlash）：单行原地刷新进度，不另开区域、不刷多条
let progressFlash: any = null
let progressFlashOpen = false
let progressFlashContent = ''
// 终态/取消后不再接收进度，防止迟到的 SSE 进度继续刷新
let progressFrozen = false
// 终态收尾摘要行是否已输出（防止重复打印）
let summaryPrinted = false
// 历史回放进行中：终态摘要行推迟到回放完成后输出，保证结论行始终位于日志最下方
let replayPending = false
// flash 兜底输出去重：flash 机制未就绪时，避免每次进度都刷一条
let lastFallbackLine = ''

// 终端内询问（TerminalAsk）：在等待决策（waiting_input）时，用 .t-ask 输入框代替页面按钮
let askedForActions = false
let askActions: any[] = []
// 本次暂停的失败原因（错误级日志）：每次进入决策提示前都重新展示一次，
// 保证「回复后重试、问题依旧」时用户能再次看到错误信息（不受日志去重影响）
let pauseReasons: string[] = []

// 生成固定宽度的进度条，如 [###               ]；整体宽度恒为 width，仅左侧 # 填充随进度增长
function barText(percent: number): string {
    // 宽度取 24：加上文案（如「源码上传 100%」约 12 列）整行 ≤ 40 列，
    // 详情面板窄终端也不会折行（折行会把一条进度显示成两行）
    const width = 24
    const filled = Math.max(0, Math.min(width, Math.round((percent / 100) * width)))
    // 实心部分用 #，空位用「不换行空格」(\u00A0)：视觉上和普通空格一样留白，
    // 但不会被终端折叠行尾空格，从而保证 [] 整体宽度固定、只有左侧填充变长。
    return '#'.repeat(filled) + '\u00a0'.repeat(width - filled)
}

// 进行中阶段的 spinner 帧动画（braille 逐帧切换，非 CSS 旋转）
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
let spinnerFrame = 0
let spinnerTimer: any = null
function spinnerChar(): string {
    return SPINNER_FRAMES[ spinnerFrame % SPINNER_FRAMES.length ]
}
// 是否仍有处于进行中（<100%）的阶段：决定 spinner 是否继续转
function hasRunningStage(): boolean {
    return Object.values(progressBars).some((b) => b.percent < 100)
}
// 启动/停止帧动画定时器（幂等）：仅 flash 会话存在且仍有进行中阶段时转动
function startSpinner() {
    if (spinnerTimer) return
    spinnerTimer = setInterval(() => {
        if (!progressFlashOpen || !hasRunningStage()) { stopSpinner(); return }
        spinnerFrame = (spinnerFrame + 1) % SPINNER_FRAMES.length
        progressFlashContent = progressText()
        flushProgress()
    }, 80)
}
function stopSpinner() {
    if (spinnerTimer) { clearInterval(spinnerTimer); spinnerTimer = null }
}
// 根据当前进度状态同步 spinner 定时器
function refreshSpinner() {
    if (progressFlashOpen && hasRunningStage()) startSpinner()
    else stopSpinner()
}

// 生成当前所有进度的文本（仅用于终端内实时回显：单行原地刷新）
// 带自定义文案的事件（如排队「前面还有 N 人」）用文案 + 条形，不显示百分比
// 进行中的阶段带逐帧 spinner（步骤行动态化的视觉载体），完成阶段显示 ✓
function progressText(): string {
    const parts = Object.entries(progressBars).map(([k, b]) =>
        (b.percent >= 100 ? '✓ ' : spinnerChar() + ' ') + progressLineText(b.label, b.percent, b.text)
    )
    return parts.join('    ') || spinnerChar() + ' 任务进行中…'
}

// 单条进度的文本（固化用：一个阶段一行，避免多阶段进度被拼成一行）
function progressLineText(label: string, percent: number, text: string = ''): string {
    if (text) return `${ text }  [${ barText(percent) }]`
    return `${ label } [${ barText(percent) }] ${ percent }%`
}

// 固化单个进度：相同内容只输出一次，避免阶段收尾时把已输出过的进度再打一遍
function persistOne(key: string) {
    const bar = progressBars[ key ]
    if (!bar) return
    const text = progressLineText(bar.label, bar.percent, bar.text)
    if (renderedTexts.has(text)) return
    renderedTexts.add(text)
    // 完成的阶段进度行染绿，进行中保持默认色
    doPush(text, bar.percent >= 100 ? 'success' : 'info')
}

// 确保已开启实时回显会话（首次进度事件时懒开启）
function ensureProgressFlash() {
    if (progressFlashOpen) return
    progressFlashOpen = true
    terminalRef.value?.execute('__progress__')
    refreshSpinner()
}

// 把当前进度刷新到终端内单行（原地刷新）
function flushProgress() {
    if (progressFlash) {
        progressFlash.flush(progressFlashContent)
        return
    }
    // 兜底：flash 因故未建立（如热更新后 execute 未派发 onExecCmd、TerminalFlash 创建失败）
    // 时，退化为普通日志行输出当前进度，避免上传/下载阶段「完全无输出」。
    // 仅当内容变化时才输出，防止进度回显时刷出大量重复行。
    if (progressFlashOpen && progressFlashContent && progressFlashContent !== lastFallbackLine) {
        lastFallbackLine = progressFlashContent
        terminalRef.value?.pushMessage({ content: progressFlashContent })
    }
}

// 把当前进度逐条固化为静态日志（flash 是临时回显，finish 后会消失，需手动留存）
// 逐条输出 + 内容去重：多阶段进度不会叠成一行，也不会重复打印
function persistProgress() {
    Object.keys(progressBars).forEach((key) => persistOne(key))
    progressFlashContent = ''
}

// 结束实时回显：先固化当前进度为静态日志，再关闭临时回显，保证进度可见且后续日志排在它下方
function finishProgress() {
    stopSpinner()
    if (progressFlash) {
        try { progressFlash.finish() } catch (e) { /* 已关闭则忽略 */ }
        progressFlash = null
    }
    progressFlashOpen = false
    // 清理已关闭的进度条目，避免下一阶段新进度与旧进度累加在同一行
    Object.keys(progressBars).forEach(k => delete progressBars[k])
    progressFlashContent = ''
    lastFallbackLine = ''
}

const blockInput = () => ''

// 内部占位命令不回显：execute 会把命令行 echo 到终端（cmdLine 消息），
// 这里把内部命令格式化为空，避免 __progress__ / __ask_actions__ 显示成一行黄字
function formatCommand(cmd: string): string {
    return cmd === '__progress__' || cmd === '__ask_actions__' ? '' : cmd
}

/**
 * 时间戳前缀 [HH:mm:ss]：事件带 time（unix 秒）用事件时间，否则用本地当前时间。
 * 仅作用于展示，不影响去重（去重仍以原始文本为键）。
 */
function fmtTime(time?: number | string): string {
    let t = time !== undefined && time !== '' && time !== null ? Number(time) : NaN
    if (!isFinite(t)) t = Date.now() / 1000
    const d = new Date(t * 1000)
    const p = (n: number) => String(n).padStart(2, '0')
    return `${ p(d.getHours()) }:${ p(d.getMinutes()) }:${ p(d.getSeconds()) }`
}

/**
 * 取事件时间（unix 秒）：优先用后端 time 字段，缺失时用 ts（Y-m-d H:i:s 字符串）回退解析，
 * 兼容历史已落盘、仅含 ts 的事件流（避免回放时全部落到当前时间）。
 */
function evTime(ev: any): number | undefined {
    if (ev?.time !== undefined && ev.time !== '' && ev.time !== null) return Number(ev.time)
    if (ev?.ts) {
        const t = Date.parse(String(ev.ts).replace(' ', 'T'))
        if (!isNaN(t)) return Math.floor(t / 1000)
    }
    return undefined
}

/** 真正推送一行：加时间戳前缀；去重由调用方负责（不再按等级着色） */
function doPush(text: string, _level: string = 'info', time?: number | string) {
    if (!text) return
    terminalRef.value?.pushMessage({
        content: `[${ fmtTime(time) }] ${ text }`
    })
}

function pushLine(text: string, level: string = 'info', time?: number | string) {
    if (!text) return
    if (renderedTexts.has(text)) return
    renderedTexts.add(text)
    // 进度回显进行中时，先把进度行固化，再关闭回显，避免后续日志被压到进度之上
    if (progressFlashOpen) {
        persistProgress()
        finishProgress()
    }
    doPush(text, level, time)
}

// 把指定进度补齐到 100%（阶段切换或终态兜底）
function completeProgress(key: string) {
    if (progressBars[key] && progressBars[key].percent < 100) {
        progressBars[key].percent = 100
        progressFlashContent = progressText()
        if (progressFlashOpen) {
            flushProgress()
            persistProgress()
            finishProgress()
        }
    }
}

// 推送进度：更新响应式 progressBars 并实时回显到终端内单行
function pushProgress(key: string, label: string, percent: number, fromReplay: boolean = false, text: string = '') {
    if (progressFrozen) return
    const p = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)))
    // 记录已实时展示过的进度：终态补渲染时同签名不再重复固化
    progressSeen.add(key + ':' + p)

    // 换了进度 key（如排队 -> 上传）：先把上一阶段固化并收尾，
    // 否则两个阶段的行会叠在同一条回显里，读起来像乱码
    if (Object.keys(progressBars).length > 0 && !progressBars[ key ]) {
        if (progressFlashOpen) {
            persistProgress()
            finishProgress()
        } else {
            Object.keys(progressBars).forEach(k => delete progressBars[ k ])
        }
    }

    // 实时场景下，若某阶段第一次出现就是 100%，说明该阶段在观测前已完成，
    // 直接固化为一行进度日志（不弹进度条），避免「一打开就是 100%」的观感。
    // 固化的文本格式与进度条行一致，且同一内容只输出一次。
    if (!fromReplay && p === 100 && !progressBars[key]) {
        progressBars[ key ] = { label, percent: 100, text }
        persistOne(key)
        delete progressBars[ key ]
        return
    }
    // 实时场景下，若某阶段第一次出现且百分比大于 0，先渲染一帧 0%，
    // 确保进度条从空开始增长，而不是一打开就直接显示中间百分比。
    if (!fromReplay && !progressBars[key] && p > 0 && p < 100) {
        progressBars[key] = { label, percent: 0, text }
        progressFlashContent = progressText()
        ensureProgressFlash()
        flushProgress()
    }
    progressBars[key] = { label, percent: p, text }
    progressFlashContent = progressText()
    ensureProgressFlash()
    flushProgress()
    refreshSpinner()
}

// 终态回放：按 key 缓冲进度，回放结束（flushReplayProgress）时只输出每个阶段最后一条，
// 避免里程碑（50% / 100%）被逐条打印成多行。最后一帧即完成态，正是最该保留的回显。
const replayProgressBuf: Record<string, { label: string, percent: number, text: string }> = {}
const replayProgressOrder: string[] = []
function bufferReplayProgress(key: string, label: string, percent: number, text: string = '') {
    const k = key || 'progress'
    if (!(k in replayProgressBuf)) replayProgressOrder.push(k)
    replayProgressBuf[ k ] = { label: label || k || '进度', percent, text }
}
function flushReplayProgress() {
    replayProgressOrder.forEach((k) => {
        const b = replayProgressBuf[ k ]
        pushLine(progressLineText(b.label, b.percent, b.text))
    })
    // 清空缓冲，避免跨任务残留
    for (const k of Object.keys(replayProgressBuf)) delete replayProgressBuf[ k ]
    replayProgressOrder.length = 0
}

// 终态回放用：把一条进度事件暂存到缓冲（不立即输出，统一在回放末尾输出每个阶段最后一条）
function pushProgressLine(key: string, label: string, percent: number, text: string = '') {
    const p = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)))
    bufferReplayProgress(key, label, p, text)
}

// 清空进度状态（清屏 / 切换任务时调用；终端 DOM 由 reset 统一 execute('clear')）
function clearProgress() {
    stopSpinner()
    Object.keys(progressBars).forEach(k => delete progressBars[k])
    progressFlashContent = ''
    progressFlashOpen = false
    progressFrozen = false
}

/**
 * 文本兜底识别进度：兼容后端未下发 type:'progress' 事件、仅以日志文本携带百分比的场景
 * 命中「上传 / 下载 + 百分比」时返回 { key, label, percent }，否则返回 null
 */
function detectProgressFromText(text: string): { key: string, label: string, percent: number } | null {
    if (!text) return null
    const m = text.match(/(\d+)\s*%/)
    if (!m) return null
    const percent = Number(m[ 1 ])
    if (isNaN(percent)) return null
    if (/上传/.test(text)) return { key: 'upload', label: '源码上传', percent }
    if (/(下载|编译产物)/.test(text)) return { key: 'download', label: '编译产物下载', percent }
    return null
}

function clear() {
    finishProgress()
    terminalRef.value?.execute('clear')
}

// 程序化 execute 会派发 exec-cmd；进度 flash 已通过 pushMessage 直接推入，无需占位命令
function onExecCmd(key: string, command: string, success: any, failed: any) {
    if (command === '__progress__') {
        // 保留兼容：若仍有旧逻辑通过 execute 触发
        try {
            progressFlash = new TerminalFlash()
            progressFlashOpen = true
            success(progressFlash)
            flushProgress()
            refreshSpinner()
        } catch (e) {
            // TerminalFlash 建立失败时回退为普通日志（兜底输出由 flushProgress 负责）
            progressFlash = null
            progressFlashOpen = true
        }
    } else if (command === '__ask_actions__') {
        // 等待决策：通过 TerminalAsk 在终端内询问用户，代替页面上的操作按钮
        const asker = new TerminalAsk()
        success(asker)
        const list = askActions
        const askCallback = (value: string) => {
            const v = (value || '').trim()
            let code = ''
            const idx = parseInt(v, 10)
            if (!isNaN(idx) && idx >= 1 && idx <= list.length) {
                code = list[ idx - 1 ].code
            } else {
                const found = list.find((a: any) => String(a.code).toLowerCase() === v.toLowerCase())
                if (found) code = found.code
            }
            if (!code) {
                doPush(`无效输入「${ v }」，请重新选择（序号或代码）。`, 'error')
                asker.ask({ question: buildAskQuestion(list), autoReview: true, callback: askCallback })
                return
            }
            asker.finish()
            // 选中后允许后续再次进入等待决策时重新提问
            askedForActions = false
            // 取消已在终端内明确选择，无需再弹窗二次确认
            if (code === 'cancel') cancel({ confirm: false })
            else operate(code as string).catch(() => {})
        }
        asker.ask({ question: buildAskQuestion(list), autoReview: true, callback: askCallback })
    } else {
        // 清屏等其它命令：结束实时回显会话
        progressFlash = null
        progressFlashOpen = false
        success()
    }
}

// 拼接等待决策时的操作选项（序号 + 文案）
function buildAskQuestion(list: any[]): string {
    const lines = list.map((a, i) => `  [${ i + 1 }] ${ a.label }`).join('\n')
    return `请选择操作：\n${ lines }\n请输入序号或代码后回车：`
}

// 进入等待决策：展示失败原因，并按 autoAsk 决定终端内询问还是仅提示
function promptOrHint() {
    // 先固化可能残留的进度行，避免与提示/提问相互遮挡
    finishProgress()
    // 每次提示前重新展示本次暂停的失败原因，确保重试后问题依旧时错误信息依然可见
    const reasons = Array.from(new Set(pauseReasons.filter((text) => !!text)))
    reasons.forEach((text) => doPush(text, 'error'))
    pauseReasons = []

    if (!actions.value.length || askedForActions) return
    askedForActions = true
    askActions = actions.value

    if (props.autoAsk) {
        doPush('任务已暂停，请根据下方提示选择操作：')
        terminalRef.value?.execute('__ask_actions__')
        return
    }

    // 不在终端内询问：仅提示，操作按钮由页面提供
    const labels = actions.value.map((a: any) => a.label).filter(Boolean).join(' / ')
    doPush(labels ? `任务已暂停，请在页面上方选择操作：${ labels }` : '任务已暂停，请在页面上方选择操作', 'warning')
}

// ==================== 事件渲染 ====================
/**
 * 渲染单条事件
 * @param ev 事件
 * @param terminalMode 终态回放模式（补渲染已完成阶段的进度）
 * @param waiting 是否等待决策（错误原因交由 promptOrHint 统一展示）
 * @param lastKey 本轮事件的最后一个进度 key（运行态只渲染当前阶段的进度）
 */
function renderEvent(ev: any, terminalMode: boolean, waiting: boolean, lastKey: string = '') {
    if (!ev) return

    if (ev.type === 'progress') {
        // text：后端给出的自定义回显文案（如排队「前面还有 N 人」），有则优先用它
        if (terminalMode) {
            // 终态回放：逐条固化为静态日志行，保留上传/下载进度的完整回显
            pushProgressLine(ev.key, ev.label || ev.key || '进度', Number(ev.percent ?? ev.progress ?? 0), ev.text || '')
        } else if (ev.key === lastKey) {
            pushProgress(ev.key, ev.label, ev.percent, false, ev.text || '')
        }
        return
    }

    const p = detectProgressFromText(ev.text || '')
    if (p) {
        if (terminalMode) {
            pushProgressLine(p.key, p.label, p.percent)
        } else if (p.key === lastKey) {
            pushProgress(p.key, p.label, p.percent)
        }
        return
    }

    // 队列驱动时的事件来自 events 接口（只有 level / text / progress，无 type / key / label）：
    // 文本未能识别阶段名但带 progress 时，用文本本身作为阶段名回显进度，避免刷成多行文字日志
    if (!ev.type && ev.progress !== null && ev.progress !== undefined && ev.progress !== '') {
        const key = ev.text || 'progress'
        if (terminalMode) {
            pushProgressLine(key, ev.text || '', Number(ev.progress))
        } else if (key === lastKey) {
            pushProgress(key, ev.text || '', Number(ev.progress))
        }
        return
    }

    // 等待决策时的失败原因：不在普通日志里渲染，改由 promptOrHint 展示
    if (waiting && ev.level === 'error') {
        pauseReasons.push(ev.text)
        return
    }

    // 回放中遇到普通日志：先把已缓冲的进度固化在它前面（保持进度在原始位置），
    // 每个阶段只输出缓冲中的最后一帧（完成态）
    flushReplayProgress()
    pushLine(ev.text, ev.level, evTime(ev))
}

/** 渲染一批事件（运行态：只渲染最后一个阶段的进度，避免已完成阶段闪 100%） */
function renderEvents(list: any[]) {
    if (!list.length) return
    const waiting = waitingInput.value

    let lastKey = ''
    for (const ev of list) {
        if (ev?.type === 'progress') {
            lastKey = ev.key
            continue
        }
        const p = detectProgressFromText(ev.text || '')
        if (p) {
            lastKey = p.key
            continue
        }
        // 无 type 但带 progress 的事件（events 接口来源）：以文本作为阶段 key
        if (ev?.progress !== null && ev?.progress !== undefined && ev?.progress !== '') {
            lastKey = ev.text || lastKey
        }
    }
    list.forEach((ev) => renderEvent(ev, false, waiting, lastKey))
}

/** 终态收尾：补齐未到 100% 的进度并冻结进度接收 */
function finishTerminalProgress() {
    if (status.value === 'success' || status.value === 'rolled_back') {
        Object.keys(progressBars).forEach((k) => {
            if (progressBars[ k ].percent < 100) progressBars[ k ].percent = 100
        })
        progressFlashContent = progressText()
        if (progressFlashOpen) {
            flushProgress()
            persistProgress()
        }
    }
    finishProgress()
    progressFrozen = true

    // 终态收尾行：仿构建日志退出行；历史回放未完成时推迟，保证始终位于日志最后
    if (!summaryPrinted && !replayPending) {
        summaryPrinted = true
        // 耗时未就绪（详情刚加载、duration 为 0）时不显示，避免误导性的「耗时 0秒」
        const dur = duration.value > 0 ? `，耗时 ${ durationText.value }` : ''
        if (status.value === 'success' || status.value === 'rolled_back') {
            doPush(`✔ 任务完成${ dur }`)
        } else if (status.value === 'canceled') {
            doPush(`✗ 任务已取消${ dur }`)
        } else {
            doPush(`✗ 任务失败：${ statusText.value }${ dur }`)
        }
    }
}

/**
 * 一次性回放历史事件（终态任务或运行中刷新后用于补齐历史日志）
 * 注意：events.jsonl 保留 type/key/label/percent 元信息（旧文件可能没有），缺元信息时通过文本兜底识别进度。
 */
async function replay() {
    try {
        const res: any = await getTaskEvents(props.taskKey, 0, 0)
        const list = Array.isArray(res?.data) ? res.data : []

        // 全量回放后同步事件游标：全局执行器后续的增量拉取不会把已回放的事件再拉一遍
        const maxSeq = list.reduce((max: number, item: any) => Math.max(max, Number(item?.seq ?? 0)), 0)
        if (maxSeq > 0) runner.setEventSeq(props.taskKey, maxSeq)
        // 运行中任务：进度由实时驱动渲染，回放仅补普通文本日志，并跳过进度类文本。
        // 否则回放会把已完成的阶段快进到 100%，再被实时进度回落到当前值，造成「一开始就是 100%」的观感。
        const skipProgress = !isTerminal.value
        list.forEach((item: any) => {
            if (skipProgress) {
                // 运行中：进度类事件由实时增量渲染，回放只补普通文本，避免进度先跳到历史值
                if (item?.type === 'progress') return
                if (detectProgressFromText(item.text || '')) return
                pushLine(item.text, item.level, evTime(item))
                return
            }

            // 终态回放：统一走 renderEvent（进度事件暂存到缓冲，回放末尾只输出每个阶段最后一条）
            renderEvent(item, true, false)
        })
        // 回放结束：每个阶段只固化最后一帧（完成态），避免里程碑逐条刷成多行
        flushReplayProgress()
    } catch (e) {
        // 忽略
    }
}

// ==================== 订阅 store：状态 / 事件流 ====================
watch(() => [ rt.value?.status ?? '', rt.value?.events?.length ?? 0 ], () => {
    const events: any[] = rt.value?.events ?? []
    if (!rt.value) return

    if (isTerminal.value) {
        // 终态：后端当次返回的是完整事件，按回放模式补渲染进度（文本由去重集合跳过）
        events.forEach((ev: any) => renderEvent(ev, true, false))
        // 每个阶段只固化最后一帧（完成态），避免里程碑逐条刷成多行
        flushReplayProgress()
        renderedIndex = events.length
        finishTerminalProgress()
        emit('completed', status.value)
        return
    }

    // 运行中：增量渲染本轮新增事件
    const slice = events.slice(renderedIndex)
    renderedIndex = events.length
    renderEvents(slice)

    if (waitingInput.value) {
        promptOrHint()
        return
    }
})

// ==================== SSE（可选的多源实时通道，仅渲染） ====================
let eventSource: EventSource | null = null

function connectSSE() {
    if (!props.sseUrl || isTerminal.value) return
    closeSSE()
    try {
        eventSource = new EventSource(props.sseUrl)
    } catch (e) {
        return
    }

    const onData = (e: MessageEvent) => {
        let data: any = null
        try {
            data = JSON.parse(e.data)
        } catch (err) {
            return
        }
        // 归一化第三方 SSE 事件为终端输出
        if (!data) return
        // 带百分比的进度事件：渲染为进度条
        if (data.percent !== undefined && data.percent !== null) {
            const p = Number(data.percent)
            if (!isNaN(p)) {
                pushProgress(String(data.key || data.type || 'progress'), data.label || data.action || data.msg || '进度', p)
                return
            }
        }
        // 兜底：SSE 仅以文本携带进度（如「源码上传中 14%」），解析后同样走进度条
        const sseText = data.action || data.msg || ''
        const pm = sseText.match(/(\d+)\s*%/)
        if (pm && /(上传|下载)/.test(sseText)) {
            const cat = /下载/.test(sseText) ? 'download' : 'upload'
            pushProgress(cat, cat === 'upload' ? '源码上传' : '编译产物下载', Number(pm[1]))
            return
        }
        if (data.action) pushLine(data.action, 'info')
        if (data.type === 'failed') pushLine(data.msg || '执行失败', 'error')
        if (data.type === 'complete') pushLine('执行完成', 'success')
        if (data.msg && !data.action) pushLine(data.msg, data.code === '0' ? 'error' : 'info')
    }

    eventSource.onmessage = onData as any
    ;[ 'progress', 'complete', 'failed', 'heartbeat', 'download_start', 'download_progress', 'download_complete' ].forEach((type) => {
        eventSource?.addEventListener(type, onData as any)
    })

    // SSE 断开：静默降级（推进由全局执行器负责，无需额外处理）
    eventSource.onerror = () => {
        closeSSE()
    }
}

function closeSSE() {
    if (eventSource) {
        eventSource.close()
        eventSource = null
    }
}

// ==================== 用户操作（转发给全局执行器） ====================
async function operate(code: string) {
    try {
        await runner.operate(props.taskKey, code)
        // 状态与事件由 store 更新，订阅回调负责渲染
    } catch (e) {
        // 操作失败：保持当前状态，由页面提示
        throw e
    }
}

/**
 * 取消任务
 * @param options confirm: 是否需要弹窗二次确认
 *  - 外部取消（页面按钮）：需要确认，防止误触
 *  - 终端询问回复「取消」：用户在终端已明确选择，无需再弹窗确认
 */
async function cancel(options: { confirm?: boolean } = {}) {
    if (options.confirm !== false) {
        try {
            await ElMessageBox.confirm('确定要取消当前任务吗？取消后正在进行的任务将终止。', '取消任务', {
                type: 'warning', confirmButtonText: '确定取消', cancelButtonText: '再想想'
            })
        } catch (e) {
            return false
        }
    }
    try {
        await runner.cancel(props.taskKey)
        // 取消成功后彻底停流，避免日志继续滚动造成「无效」观感
        closeSSE()
        finishProgress()
        progressFrozen = true
        ElMessage.success('已取消任务')
        return true
    } catch (e: any) {
        ElMessage.error(e?.msg || e?.message || '取消失败，请重试')
        return false
    }
}

// ==================== 生命周期 ====================
async function start() {
    renderedIndex = 0
    renderedTexts.clear()
    progressSeen.clear()
    clearProgress()
    askedForActions = false
    pauseReasons = []
    summaryPrinted = false
    // 先挂起摘要行：attach 后 watch 可能抢先以终态触发收尾，此时历史日志尚未渲染、耗时未就绪
    replayPending = true

    // 交给全局执行器：加载详情并在非终态时接管推进（已在推进的任务不会被打断）
    await runner.attach(props.taskKey)
    await nextTick()

    const events: any[] = rt.value?.events ?? []

    if (isTerminal.value) {
        // 终态：store 内无事件（多为刷新后）时从后端回放完整历史
        if (!events.length) await replay()
        else events.forEach((ev: any) => renderEvent(ev, true, false))
        // 历史渲染完成后解除挂起，再收尾：结论行会正确落在日志最后，耗时也已就绪
        replayPending = false
        finishTerminalProgress()
        return
    }

    // 运行中：优先回放后端历史事件（补齐进入页面前的输出），否则渲染 store 已累积的事件
    replayPending = false
    if (!events.length) {
        await replay()
    } else {
        renderEvents(events)
        renderedIndex = events.length
    }

    if (props.sseUrl) connectSSE()

    if (waitingInput.value) promptOrHint()
}

/** 仅清理内存态与连接，不触碰终端 DOM */
function dispose() {
    closeSSE()
    finishProgress()
    renderedIndex = 0
    renderedTexts.clear()
    clearProgress()
    askedForActions = false
    askActions = []
    pauseReasons = []
}

/** 清理渲染状态（不停止任务推进：推进由全局执行器持有） */
function reset() {
    dispose()
    // 清掉上一任务的终端内容（含进度行 DOM），避免与新任务进度节点混淆
    terminalRef.value?.execute('clear')
}

watch(() => props.taskKey, () => {
    reset()
    if (props.autoStart) start()
})

onMounted(() => {
    // 状态名称字典：随组件首次挂载拉取（模块级缓存，多实例只请求一次）
    loadTaskConfig()
    if (props.autoStart) start()
})

/**
 * 卸载前清理：任务继续由全局执行器推进
 *
 * 必须放在 onBeforeUnmount 而不是 onUnmounted：
 * onUnmounted 是 post render 回调，执行时 Vue 已经把本组件的 DOM 从文档中移除，
 * 此时再 execute('clear') 会让终端去操作一个已脱离文档的节点（insertBefore of null），
 * 错误发生在 post flush 阶段且未被错误处理包裹，会直接中断整个更新队列。
 */
onBeforeUnmount(() => {
    dispose()
})

// ==================== 对外暴露（供页面组装头部/底部） ====================
defineExpose({
    // 状态（响应式）
    status,
    statusText,
    statusTagType,
    progressStatus,
    progress,
    stage,
    actions,
    durationText,
    isTerminal,
    waitingInput,
    locked,
    // 行为
    start,
    clear,
    replay,
    operate,
    cancel
})
</script>

<style>
.t-log-box {
    margin-block-start: 6px!important;
    margin-block-end: 6px!important;
}
</style>
<style scoped>
.task-terminal {
    min-height: 200px;
    /* 更接近真实终端的配色 + 窗口感 */
    --t-main-background-color: #0d1117; /* GitHub 暗色 */
    --t-main-font-color: #c9d1d9;
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(1, 4, 9, 0.5);
}

.t-log-box {
    margin-block-start: 10px!important;
    margin-block-end: 10px!important;
}

/* 标题栏：单状态点 + 标题（运行中绿 / 等待决策黄 / 已结束红） */
.tt-titlebar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: #161b22;
    border-bottom: 1px solid #30363d;
    flex: none;
}
.tt-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.25);
    flex-shrink: 0;
}
.tt-dot-red { background: #ff5f56; }
.tt-dot-yellow { background: #ffbd2e; }
.tt-dot-green { background: #27c93f; }
.tt-title {
    margin-left: 8px;
    font-size: 12px;
    color: #8b949e;
    font-family: 'JetBrains Mono', 'Cascadia Code', 'SFMono-Regular', Consolas,
    'PingFang SC', 'Microsoft YaHei', monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.tt-body {
    border-radius: 0;
}

/* 等宽字体 + 行高，整体更像终端输出 */
.task-terminal :deep(.t-terminal) {
    font-family: 'JetBrains Mono', 'Cascadia Code', 'SFMono-Regular', 'Fira Code', Consolas,
    'PingFang SC', 'Microsoft YaHei', monospace;
    font-size: 12.5px;
    line-height: 1.6;
}

.task-terminal :deep(.terminal-content) {
    padding: 8px 10px;
}

/* 窄滚动条 */
.task-terminal :deep(.terminal-content)::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
.task-terminal :deep(.terminal-content)::-webkit-scrollbar-thumb {
    background: #30363d;
    border-radius: 4px;
}
.task-terminal :deep(.terminal-content)::-webkit-scrollbar-track {
    background: transparent;
}

</style>
