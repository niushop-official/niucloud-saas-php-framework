<template>
    <div class="verify-panel">
        <!-- 顶部提示：校验进行中的整体说明 -->
        <div class="verify-header" :class="{ 'is-failed': finished && !passed, 'is-passed': finished && passed }">
            <el-icon class="verify-header-icon">
                <CircleCheckFilled v-if="finished && passed" />
                <WarningFilled v-else-if="finished && !passed" />
                <Loading v-else class="is-spin" />
            </el-icon>
            <div class="min-w-0">
                <div class="verify-header-title">{{ headerTitle }}</div>
                <div class="verify-header-tip">{{ headerTip }}</div>
            </div>
        </div>

        <!-- 首次校验且清单未到达：用骨架占位，避免出现「空白 → 突然出现列表」的跳变 -->
        <ul v-if="!items.length && !error" class="verify-list">
            <li v-for="n in 4" :key="'skeleton-' + n" class="verify-item">
                <span class="verify-icon"><span class="verify-dot"></span></span>
                <div class="verify-body">
                    <div class="verify-skeleton w-[36%]"></div>
                    <div class="verify-skeleton w-[68%] mt-[7px]"></div>
                </div>
            </li>
        </ul>

        <!-- 校验项列表 -->
        <ul v-else class="verify-list">
            <li v-for="item in items" :key="item.key" class="verify-item" :class="'is-' + item.status">
                <span class="verify-icon">
                    <el-icon v-if="item.status === 'passed'"><CircleCheckFilled /></el-icon>
                    <el-icon v-else-if="item.status === 'running'" class="is-spin"><Loading /></el-icon>
                    <el-icon v-else-if="item.status === 'failed'"><CircleCloseFilled /></el-icon>
                    <!-- 待校验：空心圆圈（不显示序号） -->
                    <span v-else class="verify-dot"></span>
                </span>

                <div class="verify-body">
                    <div class="verify-name">
                        {{ item.name }}
                        <span v-if="item.required" class="verify-required">必须</span>
                    </div>
                    <div class="verify-desc">{{ item.status === 'failed' && item.message ? item.message : item.desc }}</div>

                    <!-- 明细（如权限异常的目录清单） -->
                    <ul v-if="item.status === 'failed' && ( item.details?.length ?? 0 ) > 0" class="verify-details">
                        <li v-for="(detail, di) in item.details?.slice(0, 5)" :key="di">{{ detail }}</li>
                        <li v-if="( item.details?.length ?? 0 ) > 5">等 {{ item.details?.length }} 项</li>
                    </ul>

                    <!-- 修复建议（仅未通过时展示） -->
                    <div v-if="item.status === 'failed' && item.suggest" class="verify-suggest">
                        <span class="verify-suggest-label">修复建议</span>
                        <span class="verify-suggest-text">{{ item.suggest }}</span>
                    </div>
                </div>

                <span v-if="item.status === 'running'" class="verify-tail">校验中...</span>
                <span v-else-if="item.status === 'failed'" class="verify-tail is-error">未通过</span>
            </li>
        </ul>

        <!-- 操作区 -->
        <div v-if="showFooter" class="verify-footer">
            <el-button v-if="showPrev" :disabled="operating" @click="emit('prev')">{{ prevText }}</el-button>
            <span v-else></span>
            <div class="flex items-center gap-[10px]">
                <span v-if="!operating && finished && !passed" class="text-[12px] text-[#f56c6c]">
                    {{ error ? '校验服务异常，可重新校验' : '存在未通过的必检项，请处理后再继续' }}
                </span>
                <!-- 未通过 / 服务异常：提供重新校验入口（用户处理后可原地重跑） -->
                <el-button v-if="showRetry && !passed && ( finished || retrying )" :loading="retrying"
                           :disabled="operating" @click="retry">
                    {{ retryText }}
                </el-button>
                <el-button type="primary" :disabled="!canNext" :loading="operating" @click="emit('next')">
                    {{ nextText }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { CircleCheckFilled, CircleCloseFilled, Loading, WarningFilled } from '@element-plus/icons-vue'
import { getCheckMeta, getCachedSceneMeta, setCachedSceneMeta, getCheckStreamUrl, runCheck } from '@/app/api/check'

/**
 * 通用校验面板
 *
 * 场景与校验项由后端字典定义（CheckSceneDict），本组件只负责：
 * 1. 通过 SSE 订阅校验过程，实时渲染每一项的状态（待校验 / 校验中 / 通过 / 未通过）
 * 2. 按「是否必须通过」决定整体结论与「下一步」是否可用
 * 3. 支持「校验通过后自动下一步」（autoNext），不通过时可由调用方决定如何阻断
 *
 * SSE 不可用时自动降级为一次性接口（runCheck），保证任何环境下都能用。
 */

interface CheckItem {
    key: string
    name: string
    desc: string
    required: number
    status: 'pending' | 'running' | 'passed' | 'failed'
    message?: string
    details?: string[]
    /** 修复建议（未通过时展示） */
    suggest?: string
}

const props = defineProps({
    /** 校验场景（cloud_build / upgrade ...） */
    scene: { type: String, required: true },
    /** 业务参数（如升级的 addon） */
    params: { type: Object, default: () => ({}) },
    /** 覆盖后端下发的标题 / 提示 */
    title: { type: String, default: '' },
    tip: { type: String, default: '' },
    /** 挂载后是否自动开始校验 */
    autoStart: { type: Boolean, default: true },
    /** 校验通过后是否自动触发下一步 */
    autoNext: { type: Boolean, default: false },
    /** 自动下一步延迟（毫秒），留出时间让用户看到校验结果 */
    autoNextDelay: { type: Number, default: 800 },
    /** 必须项未通过时是否禁用「下一步」 */
    nextDisabledOnFail: { type: Boolean, default: true },
    /** 是否展示底部操作区 */
    showFooter: { type: Boolean, default: true },
    showPrev: { type: Boolean, default: true },
    prevText: { type: String, default: '上一步' },
    nextText: { type: String, default: '下一步' },
    /** 未通过（或校验服务异常）时是否显示「重新校验」 */
    showRetry: { type: Boolean, default: true },
    retryText: { type: String, default: '重新校验' },
    /** 首帧超时（毫秒）：超时判定 SSE 链路不可用并降级 */
    firstFrameTimeout: { type: Number, default: 2000 }
})

const emit = defineEmits([ 'meta', 'item', 'done', 'passed', 'failed', 'next', 'prev', 'retry' ])

const items = ref<CheckItem[]>([])
const title = ref('')
const tip = ref('')
const started = ref(false)
const finished = ref(false)
const passed = ref(false)
/** 校验服务不可用（连接失败 / 接口异常），与「校验未通过」区分展示 */
const error = ref('')
const operating = ref(false)
/** 重新校验中（重新校验期间保持按钮可见并显示 loading） */
const retrying = ref(false)

const headerTitle = computed(() => {
    if (error.value) return '校验失败'
    if (!finished.value) return props.title || title.value || '正在校验...'
    return passed.value ? '校验通过' : '校验未通过'
})

const headerTip = computed(() => {
    if (error.value) return error.value
    if (!finished.value) return props.tip || tip.value || '请稍候，正在逐项检查'
    if (passed.value) return '全部必检项已通过'
    return '请根据下方提示处理后重新校验'
})

const canNext = computed(() => {
    if (error.value || !finished.value) return false
    if (props.nextDisabledOnFail && !passed.value) return false
    return true
})

// ==================== SSE 订阅 ====================

let source: EventSource | null = null
let firstFrameTimer: any = null
let autoNextTimer: any = null
let firstFrameArrived = false
/** 已降级，避免重复触发 */
let degraded = false

/**
 * SSE 在本会话内是否可用
 *
 * 部署在 Apache + mod_fcgid 等会缓冲响应的环境时，响应头能下来但正文事件帧始终不到，
 * 每次校验都要等满 firstFrameTimeout 才降级。这里记住首次失败，
 * 同一个页面会话内后续校验直接走一次性通道，不再重复等待。
 */
let sseUsable = true

const closeSse = () => {
    if (source) {
        source.close()
        source = null
    }
    firstFrameTimer && clearTimeout(firstFrameTimer)
    firstFrameTimer = null
}

/** 只重置校验结果标记，不清理列表（列表原地重置，避免出现「消失又出现」的跳变） */
const resetFlags = () => {
    finished.value = false
    passed.value = false
    error.value = ''
    firstFrameArrived = false
    degraded = false
    autoNextTimer && clearTimeout(autoNextTimer)
    autoNextTimer = null
}

/** 按清单构建校验项（全部为待校验） */
const buildItems = (list: any[]): CheckItem[] => ( list ?? [] ).map((item: any) => ({
    key: String(item.key),
    name: String(item.name ?? item.key),
    desc: String(item.desc ?? ''),
    required: Number(item.required ?? 1),
    status: 'pending' as const,
    message: '',
    details: [],
    suggest: String(item.suggest ?? '')
}))

/**
 * 取场景清单并渲染（不执行检测）
 * 优先用缓存（同步、零等待），否则请求 meta 接口 —— 保证「先有清单，再逐项检测」
 */
const loadMeta = async () => {
    const cached = getCachedSceneMeta(props.scene)
    if (cached && Array.isArray(cached.items) && cached.items.length) {
        items.value = buildItems(cached.items)
        title.value = cached.title || ''
        tip.value = cached.tip || ''
        return
    }

    try {
        const res: any = await getCheckMeta(props.scene)
        const data = res?.data
        if (!data) return

        title.value = String(data.title ?? title.value)
        tip.value = String(data.tip ?? tip.value)
        if (Array.isArray(data.items) && data.items.length) items.value = buildItems(data.items)
        setCachedSceneMeta(props.scene, { title: title.value, tip: tip.value, items: data.items ?? [] })
    } catch (e) {
        // 取不到清单时保留骨架占位，SSE 的 meta 帧会兜住
    }
}

const findItem = (key: string) => items.value.find((item) => item.key === key)

/** meta：初始化完整校验清单（全部为待校验），并缓存清单供下次立即渲染 */
const onMeta = (data: any) => {
    firstFrameArrived = true
    title.value = String(data?.title ?? title.value)
    tip.value = String(data?.tip ?? tip.value)

    const list = Array.isArray(data?.items) ? data.items : []
    setCachedSceneMeta(props.scene, { title: title.value, tip: tip.value, items: list })

    if (!items.value.length) {
        // 未预先拿到清单（清单接口失败等）：这里兜底铺出完整列表
        items.value = buildItems(list)
        emit('meta', data)
        return
    }

    // 已有清单：只补齐缺失项 / 校正文案，保留已检测出的状态（避免把结果回退成待校验）
    list.forEach((raw: any) => {
        const key = String(raw?.key ?? '')
        if (!key) return

        const built = buildItems([ raw ])[ 0 ]
        const exist = findItem(key)
        if (!exist) {
            items.value.push(built)
        } else {
            exist.name = built.name
            exist.desc = built.desc
            exist.required = built.required
            // meta 阶段闭包形式的建议解析不了（无业务参数），下发为空，不能覆盖已检测出的具体建议
            if (built.suggest) exist.suggest = built.suggest
        }
    })

    emit('meta', data)
}

/** item：单项状态更新 */
const onItem = (data: any) => {
    firstFrameArrived = true
    const key = String(data?.key ?? '')
    if (!key) return

    const target = findItem(key)
    if (!target) {
        // 未收到 meta 的兜底：优先用 item 自带的口径字段，缺失才退回 key
        items.value.push({
            key,
            name: String(data?.name ?? key),
            desc: String(data?.desc ?? ''),
            required: Number(data?.required ?? 1),
            status: data?.status ?? 'pending',
            message: data?.message ?? '',
            details: data?.details ?? [],
            suggest: String(data?.suggest ?? '')
        })
    } else {
        target.status = data?.status ?? target.status
        if (data?.message !== undefined) target.message = String(data.message ?? '')
        if (Array.isArray(data?.details)) target.details = data.details
        if (data?.suggest !== undefined) target.suggest = String(data.suggest ?? '')
    }
    emit('item', data)
}

/** 收尾：统一处理整体结论与自动下一步 */
const finish = (isPassed: boolean, failedKeys: string[] = []) => {
    finished.value = true
    passed.value = isPassed
    emit('done', { passed: isPassed, failed: failedKeys })

    if (isPassed) {
        emit('passed')
        // 自动下一步：延迟一点让用户看到「校验通过」的结果
        if (props.autoNext) {
            autoNextTimer = setTimeout(() => emit('next'), Math.max(0, props.autoNextDelay))
        }
    } else {
        emit('failed', failedKeys)
    }
}

const onDone = (data: any) => {
    closeSse()
    finish(!!data?.passed, data?.failed ?? [])
}

const onStreamFailed = (data: any) => {
    error.value = String(data?.message ?? '校验服务异常')
    closeSse()
    finish(false)
}

/** 降级：SSE 不可用时改用一次性接口 */
const degrade = async () => {
    if (degraded || finished.value) return
    degraded = true
    // 记住本次失败：同一页面会话内后续校验不再尝试 SSE（结果一致，且无需等待）
    sseUsable = false

    try {
        const res: any = await runCheck(props.scene, props.params)
        const data = res?.data
        if (!data) {
            error.value = '校验服务不可用，请稍后重试'
            finish(false)
            return
        }

        title.value = String(data.title ?? title.value)
        tip.value = String(data.tip ?? tip.value)
        items.value = ( data.items ?? [] ).map((item: any) => ({
            key: String(item.key),
            name: String(item.name ?? item.key),
            desc: String(item.desc ?? ''),
            required: Number(item.required ?? 1),
            status: item.status ?? 'pending',
            message: item.message ?? '',
            details: Array.isArray(item.details) ? item.details : [],
            suggest: String(item.suggest ?? '')
        }))
        finish(!!data.passed, data.failed ?? [])
    } catch (e) {
        error.value = '校验服务不可用，请稍后重试'
        finish(false)
    }
}

/** 开始（重新）校验：先渲染完整清单，再连 SSE 逐项接收检测结果 */
const start = async () => {
    closeSse()
    // 只重置结果标记：列表保留，状态回到「待校验」，避免出现消失又出现
    resetFlags()
    items.value = buildItems(items.value)

    // 1. 先拿到并渲染完整清单（缓存优先，通常无网络等待）
    await loadMeta()
    started.value = true

    // 2. 本会话内已确认 SSE 不可用（连得上但收不到事件帧）时直接走一次性通道，
    //    避免每次校验都白等一个首帧超时
    if (!sseUsable) {
        await degrade()
        return
    }

    // 3. 再连接 SSE，逐项点亮 running → passed / failed
    try {
        source = new EventSource(getCheckStreamUrl(props.scene, props.params))
    } catch (e) {
        await degrade()
        return
    }

    source.addEventListener('meta', (e: MessageEvent) => onMeta(parse(e)))
    source.addEventListener('item', (e: MessageEvent) => onItem(parse(e)))
    source.addEventListener('done', (e: MessageEvent) => onDone(parse(e)))
    source.addEventListener('failed', (e: MessageEvent) => onStreamFailed(parse(e)))

    // 连接异常：未拿到任何数据直接降级；已开始校验则等 done（避免重复执行一次全量校验）
    source.onerror = () => {
        if (finished.value) {
            closeSse()
            return
        }
        if (!firstFrameArrived) {
            closeSse()
            degrade()
        }
    }

    // 首帧超时：部分代理会把 SSE 攒在缓冲区，收不到首帧就降级
    firstFrameTimer = window.setTimeout(() => {
        if (!firstFrameArrived) {
            closeSse()
            degrade()
        }
    }, Math.max(500, props.firstFrameTimeout))
}

/** 重新校验：重置状态并完整重跑一轮（用户处理完问题后原地重跑） */
const retry = async () => {
    if (retrying.value) return
    retrying.value = true
    emit('retry')
    try {
        await start()
    } finally {
        retrying.value = false
    }
}

const parse = (e: MessageEvent): any => {
    try {
        return JSON.parse(e.data)
    } catch (err) {
        return null
    }
}

/** 外部设置「操作中」（如下一步提交中）时禁用按钮 */
const setOperating = (value: boolean) => {
    operating.value = !!value
}

onMounted(() => {
    if (props.autoStart) start()
})

onUnmounted(() => {
    closeSse()
    autoNextTimer && clearTimeout(autoNextTimer)
    autoNextTimer = null
})

defineExpose({
    // 状态
    items,
    title,
    tip,
    started,
    finished,
    passed,
    error,
    // 行为
    start,
    retry,
    setOperating
})
</script>

<style lang="scss" scoped>
.verify-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
}

/* 顶部整体提示条 */
.verify-header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px 12px;
    border: 1px solid #cdeedd;
    border-radius: 6px;
    background-color: #f0faf5;

    &.is-failed {
        border-color: #fbd9d9;
        background-color: #fef3f3;
    }

    &.is-passed {
        border-color: #cdeedd;
        background-color: #f0faf5;
    }
}

.verify-header-icon {
    margin-top: 2px;
    font-size: 16px;
    color: #22b07d;

    .is-failed & {
        color: #f56c6c;
    }
}

.verify-header-title {
    font-size: 14px;
    font-weight: 600;
    color: #1d2a25;

    .is-failed & {
        color: #a94442;
    }
}

.verify-header-tip {
    margin-top: 2px;
    font-size: 12px;
    line-height: 18px;
    color: #6b7c75;

    .is-failed & {
        color: #b96a6a;
    }
}

/* 校验项列表 */
.verify-list {
    margin: 8px 0 0;
    padding: 0;
    list-style: none;
    overflow-y: auto;
}

/* 骨架占位（首次校验、清单未到达时） */
.verify-skeleton {
    height: 10px;
    background-color: #eef1f5;
    border-radius: 4px;
    animation: verify-skeleton 1.2s ease-in-out infinite;
}

@keyframes verify-skeleton {
    0%, 100% { opacity: 1; }
    50% { opacity: .45; }
}

.verify-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 9px 4px;

    & + .verify-item {
        border-top: 1px solid #f2f4f7;
    }
}

.verify-icon {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    font-size: 18px;

    /* 待校验：空心圆圈（不显示序号） */
    .verify-dot {
        display: inline-block;
        width: 13px;
        height: 13px;
        border: 1px solid #d4d9e2;
        border-radius: 50%;
    }
}

.verify-body {
    flex: 1;
    min-width: 0;
}

.verify-name {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #303133;
}

.verify-required {
    padding: 0 4px;
    font-size: 11px;
    line-height: 15px;
    color: #b26b00;
    background-color: #fff7e6;
    border: 1px solid #ffe0a3;
    border-radius: 3px;
}

.verify-desc {
    margin-top: 2px;
    font-size: 12px;
    line-height: 18px;
    color: #909399;
    word-break: break-all;
}

.verify-details {
    margin: 4px 0 0;
    padding: 6px 8px;
    list-style: none;
    font-size: 12px;
    line-height: 19px;
    color: #b96a6a;
    background-color: #fef6f6;
    border-radius: 4px;

    li {
        word-break: break-all;
    }
}

/* 修复建议（未通过时展示） */
.verify-suggest {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    margin: 4px 0 0;
    padding: 6px 8px;
    font-size: 12px;
    line-height: 19px;
    color: #8a6d3b;
    background-color: #fffaf0;
    border: 1px solid #ffe4b0;
    border-radius: 4px;
}

.verify-suggest-label {
    flex-shrink: 0;
    padding: 0 4px;
    font-size: 11px;
    line-height: 17px;
    color: #b26b00;
    background-color: #fff3e0;
    border: 1px solid #ffd591;
    border-radius: 3px;
}

.verify-suggest-text {
    word-break: break-all;
}

.verify-tail {
    flex-shrink: 0;
    margin-top: 1px;
    font-size: 12px;
    color: #1c6ef2;

    &.is-error {
        color: #f56c6c;
    }
}

/* 状态配色 */
.verify-item.is-passed {
    .verify-icon,
    .verify-name {
        color: #22b07d;
    }

    .verify-desc {
        color: #6b7c75;
    }
}

.verify-item.is-failed {
    .verify-icon,
    .verify-name {
        color: #f56c6c;
    }
}

.verify-item.is-running {
    .verify-icon {
        color: #1c6ef2;
    }

    .verify-name {
        font-weight: 600;
        color: #1c6ef2;
    }
}

/* 底部操作区 */
.verify-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f2f4f7;
}

.is-spin {
    animation: verify-spin 1s linear infinite;
}

@keyframes verify-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
