<template>
    <el-dialog
        v-model="visible"
        width="800px"
        title="创建站点"
        :close-on-click-modal="step === 1"
        :close-on-press-escape="step !== 2"
        :destroy-on-close="true"
        class="create-site-dialog"
        @closed="onClosed"
    >

        <!-- 当前整步摘要卡（设计稿第 0/1/2 步展示 +1） -->
        <div class="cs-step-card">
            <div class="cs-step-card__head">
                <div class="cs-step-card__title">{{ currentStepCard.title }}</div>
            </div>
            <div class="cs-step-card__desc">{{ currentStepCard.desc }}</div>
            <template v-if="step === 2">
                <!-- <div class="cs-step-card__bar">
                    <div class="cs-step-card__bar-inner" :style="{ width: `${ progressPercent }%` }"></div>
                </div> -->
                <div class="cs-step-card__foot">
                    阶段 {{ Math.min(doneStageCount + (currentStageKey ? 1 : 0), stages.length || 0) }} / {{ stages.length || 0 }}
                    <template v-if="subFlowTotal"> · 子步骤 {{ doneSubCount }} / {{ subFlowTotal }}</template>
                    <template v-if="formData.site_name"> · {{ formData.site_name }}</template>
                </div>
            </template>
            <!-- <div v-else-if="step === 3" class="cs-step-card__foot is-success">
                状态 成功 · 耗时 {{ costSeconds }}s · {{ formData.site_name || '-' }}
            </div> -->
        </div>

        <!-- 第 1 步：填写信息与套餐 -->
        <div v-show="step === 1" class="cs-body">
            <div class="cs-left">
                <div class="cs-panel-title">站点基础信息</div>
                <el-form ref="formRef" :model="formData" :rules="formRules" label-position="top" class="cs-form">
                    <el-form-item label="站点名称" prop="site_name">
                        <el-input
                            v-model.trim="formData.site_name"
                            maxlength="20"
                            show-word-limit
                            placeholder="请输入站点名称"
                            autocomplete="off"
                        />
                    </el-form-item>
                    <el-form-item label="备注（选填）" prop="desc">
                        <el-input
                            v-model.trim="formData.desc"
                            type="textarea"
                            :rows="4"
                            maxlength="100"
                            show-word-limit
                            placeholder="请填写站点介绍"
                        />
                    </el-form-item>
                </el-form>
            </div>

            <div class="cs-right">
                <div class="cs-panel-title">选择套餐</div>
                <el-scrollbar class="cs-package-scroll">
                    <div class="cs-package-list">
                        <div
                            v-for="(item, index) in siteGroup"
                            :key="item.group_id || index"
                            class="cs-package-card"
                            :class="{ 'is-active': formData.group_id == item.group_id }"
                            @click="formData.group_id = item.group_id"
                        >
                            <div class="cs-package-card__head">
                                <div class="min-w-0 flex-1">
                                    <div class="cs-package-card__name">{{ item.site_group?.group_name || '-' }}</div>
                                    <div class="cs-package-card__desc">
                                        共 {{ benefitTotal(item) }} 项权益
                                    </div>
                                </div>
                            </div>

                            <div class="cs-package-card__benefits">
                                <div class="cs-benefit-grid">
                                    <div
                                        v-for="(name, nameIndex) in benefitNames(item)"
                                        :key="`${item.group_id}-${nameIndex}`"
                                        class="cs-benefit-item"
                                    >
                                        <span class="nc-iconfont nc-icon-duiV6mm text-primary !text-[12px]"></span>
                                        <span class="truncate" :title="name">{{ name }}</span>
                                    </div>
                                    <div v-if="!benefitNames(item).length" class="cs-benefit-empty">暂无权益</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>

        <!-- 第 2 步：开通中 -->
        <div v-show="step === 2" class="cs-progress">
            <div class="cs-progress__head">
                <div class="cs-progress__icon">
                    <el-icon :size="28" class="is-loading"><Loading /></el-icon>
                </div>
                <div class="min-w-0">
                    <div class="cs-progress__title">
                        正在创建站点
                        <el-tag type="primary" size="small" effect="light" round class="ml-[8px] !text-[11px] !py-[2px] !h-[18px]">进行中</el-tag>
                    </div>
                    <div class="cs-progress__meta">
                        {{ formData.site_name }} · {{ currentGroupName }}
                    </div>
                </div>
            </div>

            <div class="cs-progress__bar-wrap">
                <div class="flex justify-between items-center mb-[8px]">
                    <span class="text-[13px] text-[var(--el-text-color-secondary)]">
                        已完成 {{ doneStageCount }} / {{ stages.length }} 个阶段
                        <template v-if="subFlowTotal"> · 子步骤 {{ doneSubCount }} / {{ subFlowTotal }}</template>
                    </span>
                    <span class="text-[14px] font-bold text-[var(--el-color-primary)]">{{ progressPercent }}%</span>
                </div>
                <div class="cs-seg-bar" :style="{ gridTemplateColumns: `repeat(${ Math.max(stages.length, 1) }, 1fr)` }">
                    <div
                        v-for="s in stages"
                        :key="`seg-${s.key}`"
                        class="cs-seg-bar__item"
                        :class="{ 'is-done': s.status === 'done', 'is-running': s.status === 'running' }"
                    ></div>
                </div>
                <div class="cs-progress__stage-labels" :style="{ gridTemplateColumns: `repeat(${ Math.max(stages.length, 1) }, 1fr)` }">
                    <span
                        v-for="s in stages"
                        :key="s.key"
                        :class="{ 'is-active': currentStageKey === s.key, 'is-done': s.status === 'done' }"
                        :title="s.label"
                    >
                        {{ shortStageLabel(s.label) }}
                    </span>
                </div>
            </div>
            <!-- 分割线 -->
            <el-divider class="!my-[12px]" />

            <el-scrollbar ref="timelineScrollbarRef" class="cs-timeline-scroll">
                <div class="cs-timeline">
                    <div
                        v-for="s in stages"
                        :key="s.key"
                        :ref="(el) => setStageRef(s.key, el)"
                        class="cs-timeline__item"
                        :class="`is-${s.status}`"
                    >
                        <div class="cs-timeline__dot">
                            <el-icon v-if="s.status === 'done'"><Select /></el-icon>
                            <el-icon v-else-if="s.status === 'running'" class="is-loading"><Loading /></el-icon>
                            <span v-else class="cs-timeline__dot-empty"></span>
                        </div>
                        <div class="cs-timeline__content">
                            <div class="cs-timeline__head">
                                <div class="min-w-0 flex-1">
                                    <div class="cs-timeline__name">{{ s.label }}</div>
                                    <div class="cs-timeline__desc">{{ s.desc }}</div>
                                </div>
                                <span v-if="s.costText" class="cs-timeline__cost">{{ s.costText }}</span>
                            </div>

                            <div v-if="s.subs?.length && s.status !== 'pending'" class="cs-subflow">
                                <div v-for="sub in s.subs" :key="sub.key" class="cs-subflow__item" :class="`is-${sub.status}`">
                                    <span class="cs-subflow__seq">{{ sub.seq }}</span>
                                    <span class="cs-subflow__name truncate">{{ sub.label }}</span>
                                    <span class="cs-subflow__status">
                                        <template v-if="sub.status === 'done'">已完成</template>
                                        <template v-else-if="sub.status === 'running'">进行中</template>
                                        <template v-else>等待中</template>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>

        <!-- 第 3 步：创建完成 -->
        <div v-show="step === 3" class="cs-done">
            <div class="cs-done__head">
                <div class="cs-done__icon">
                    <el-icon :size="30"><CircleCheckFilled /></el-icon>
                </div>
                <div class="min-w-0">
                    <div class="cs-done__title">
                        站点创建完成
                        <el-tag type="primary" size="small" effect="light" round class="ml-[8px] !text-[11px] !py-[2px] !h-[18px]">创建完成</el-tag>
                    </div>
                </div>
            </div>

            <div class="cs-done-steps">
                <div class="flex justify-between items-center mb-[10px]">
                    <span class="text-[13px] text-[var(--el-text-color-secondary)]">
                        全部完成 · {{ stages.length }} / {{ stages.length }} 个阶段
                        <template v-if="subFlowTotal"> · {{ subFlowTotal }} / {{ subFlowTotal }} 个子步骤</template>
                    </span>
                    <span class="text-[14px] font-bold text-[var(--el-color-primary)]">100%</span>
                </div>
                <div class="cs-done-steps__bar cs-seg-bar" :style="{ gridTemplateColumns: `repeat(${ Math.max(stages.length, 1) }, 1fr)` }">
                    <div v-for="s in stages" :key="`done-bar-${s.key}`" class="cs-seg-bar__item is-done"></div>
                </div>
                <div class="cs-done-steps__labels" :style="{ gridTemplateColumns: `repeat(${ Math.max(stages.length, 1) }, 1fr)` }">
                    <span v-for="s in stages" :key="`done-label-${s.key}`" class="cs-done-steps__label" :title="s.label">
                        {{ shortStageLabel(s.label) }}
                    </span>
                </div>
            </div>
            <!-- 分割线 -->
            <el-divider class="!my-[12px]" />

            <div class="cs-done__banner">
                <el-icon :size="22" color="var(--el-color-primary)"><CircleCheckFilled /></el-icon>
                <div>
                    <div class="font-[600] text-[13px]">站点已创建并可用</div>
                    <div class="text-[12px] text-[var(--el-text-color-secondary)] mt-[4px]">
                        {{ stages.length }} 个阶段
                        <template v-if="subFlowTotal"> · {{ subFlowTotal }} 个子步骤</template>
                        全部通过 · 总耗时 {{ costSeconds }} 秒
                    </div>
                </div>
            </div>

            <div class="cs-done__grid">
                <div class="cs-done__cell">
                    <div class="cs-done__label">站点名称</div>
                    <div class="cs-done__value">{{ formData.site_name }}</div>
                </div>
                <!-- <div class="cs-done__cell">
                    <div class="cs-done__label">管理员账号</div>
                    <div class="cs-done__value">{{ createResult.admin_account }}</div>
                </div> -->
                <div class="cs-done__cell">
                    <div class="cs-done__label">到期时间</div>
                    <div class="cs-done__value">{{ createResult.expire_time }}</div>
                </div>
                <div class="cs-done__cell cs-done__cell--full">
                    <div class="cs-done__label">已安装插件</div>
                    <div class="cs-done__value">
                        {{ benefitCount }} 项
                        <template v-if="selectedBenefitNames.length">
                            <span class="cs-done__apps">（{{ selectedBenefitNames.join('、') }}）</span>
                        </template>
                    </div>
                </div>
            </div>

            <div class="cs-done__log">
                <div class="cs-done__log-text">
                    <span class="cs-done__log-dot"></span>
                    已通过：{{ passedStagesText }}
                </div>
                <!-- <button type="button" class="cs-done__log-link" @click="viewAllLogs">查看全部日志</button> -->
            </div>
        </div>

        <template #footer>
            <div class="cs-footer" v-if="step === 1">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" :loading="submitting" @click="submitCreate">创建站点</el-button>
            </div>
            <div class="cs-footer cs-footer--progress" v-else-if="step === 2">
                <span class="cs-footer__time">
                    <el-icon class="is-loading mr-[4px]"><Loading /></el-icon>
                    已耗时 {{ elapsedText }} · 预计剩余 {{ remainText }}
                </span>
                <span class="cs-footer__hint">创建中，请勿关闭窗口</span>
            </div>
            <div class="cs-footer cs-footer--done" v-else>
                <span class="cs-footer__done-meta">
                    创建于 {{ createResult.created_at }}，总耗时 {{ costSeconds }} 秒
                </span>
                <div class="cs-footer__actions">
                    <el-button type="primary" @click="enterSite">进入站点管理</el-button>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, onUnmounted } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Loading, Select, CircleCheckFilled } from '@element-plus/icons-vue'
import { createSite } from '@/app/api/home'
import { getSiteCreateFlow } from '@/app/api/site'
import Test from '@/utils/test'

const props = defineProps({
    modelValue: { type: Boolean, default: false },
    siteGroup: { type: Array as () => any[], default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'success'])

const visible = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
})

const step = ref(1)
const submitting = ref(false)
const formRef = ref<FormInstance>()
const startAt = ref(0)
const costSeconds = ref(0)
const nowTick = ref(Date.now())
let tickTimer: ReturnType<typeof setInterval> | null = null
// 创建任务世代号，用于取消过期的阶段动画
let createTaskId = 0
// 第二步进度总时长（毫秒）
const PROGRESS_DURATION = 5000

const formData = reactive({
    site_name: '',
    desc: '',
    group_id: 0 as number | string
})

const formRules: FormRules = {
    site_name: [{ required: true, message: '请输入站点名称', trigger: 'blur' }]
}

const createResult = reactive({
    site_id: 0 as number | string,
    site_url: '',
    // admin_account: '',
    expire_time: '',
    transaction_no: '',
    created_at: ''
})

/**
 * 补零
 * @param n
 */
const pad2 = (n: number) => String(n).padStart(2, '0')

/**
 * 格式化时间 HH:mm:ss
 * @param d
 */
const formatClock = (d: Date) => `${ pad2(d.getHours()) }:${ pad2(d.getMinutes()) }:${ pad2(d.getSeconds()) }`

/**
 * 补齐创建结果展示字段（到期时间用接口返回值）
 */
const fillCreateResult = () => {
    createResult.created_at = formatClock(new Date())
}

/**
 * 到期时间展示：取日期部分，与站点列表一致
 * @param value
 */
const formatExpire = (value: any) => {
    if (!value || value === '0') return '--'
    if (typeof value === 'number') {
        const date = new Date(value * 1000)
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${ date.getFullYear() }-${ month }-${ day }`
    }
    return String(value).split(' ')[0]
}

type StageStatus = 'pending' | 'running' | 'done'
type StageItem = {
    key: string
    label: string
    desc: string
    status: StageStatus
    costText: string
    subs: Array<{ key: string, seq: string, label: string, status: StageStatus }>
}

const stages = ref<StageItem[]>([])
const subFlowTotal = computed(() => stages.value.reduce((sum, s) => sum + (s.subs?.length || 0), 0))
const doneStageCount = computed(() => stages.value.filter(s => s.status === 'done').length)
const doneSubCount = computed(() => stages.value.reduce((sum, s) => sum + (s.subs?.filter(sub => sub.status === 'done').length || 0), 0))
const progressPercent = computed(() => {
    if (!stages.value.length) return 0
    if (doneStageCount.value >= stages.value.length) return 100
    // 主流程权重 + 子流程权重，避免长时间停在某一阶段看起来不动
    const mainWeight = 70
    const subWeight = 30
    const mainPart = (doneStageCount.value / stages.value.length) * mainWeight
    const subPart = subFlowTotal.value
        ? (doneSubCount.value / subFlowTotal.value) * subWeight
        : (doneStageCount.value / stages.value.length) * subWeight
    // 当前进行中的主流程给一点过渡进度
    const runningBonus = stages.value.some(s => s.status === 'running') ? 4 : 0
    return Math.min(99, Math.round(mainPart + subPart + runningBonus))
})
const currentStageKey = computed(() => stages.value.find(s => s.status === 'running')?.key || '')

/**
 * 格式化耗时文案
 * @param ms
 */
const formatCost = (ms: number) => {
    const sec = Math.max(0.1, ms / 1000)
    return `${ sec.toFixed(1) }s`
}

const elapsedMs = computed(() => {
    if (!startAt.value || step.value !== 2) return 0
    return Math.max(0, nowTick.value - startAt.value)
})
const elapsedText = computed(() => `${ (elapsedMs.value / 1000).toFixed(1) } 秒`)
const remainText = computed(() => {
    const remain = Math.max(0, PROGRESS_DURATION - elapsedMs.value)
    return `${ Math.ceil(remain / 1000) } 秒`
})

/**
 * 启动第二步耗时计时器
 */
const startTick = () => {
    stopTick()
    nowTick.value = Date.now()
    tickTimer = setInterval(() => {
        nowTick.value = Date.now()
    }, 100)
}

/**
 * 停止耗时计时器
 */
const stopTick = () => {
    if (tickTimer) {
        clearInterval(tickTimer)
        tickTimer = null
    }
}

onUnmounted(() => {
    stopTick()
})

const timelineScrollbarRef = ref<any>(null)
const stageElMap: Record<string, HTMLElement | null> = {}

/**
 * 收集阶段节点，便于进度推进时自动滚入可视区
 * @param key
 * @param el
 */
const setStageRef = (key: string, el: any) => {
    stageElMap[key] = el?.$el || el || null
}

/**
 * 滚动到当前进行中的阶段
 * @param key
 */
const scrollToStage = async (key: string) => {
    if (!key) return
    await nextTick()
    const el = stageElMap[key]
    const wrap = timelineScrollbarRef.value?.wrapRef as HTMLElement | undefined
    if (!el || !wrap) return
    const top = el.offsetTop - 12
    wrap.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

watch(currentStageKey, (key) => {
    if (key) scrollToStage(key)
})

const currentGroup = computed(() => {
    return (props.siteGroup || []).find((item: any) => item.group_id == formData.group_id) || null
})

const currentGroupName = computed(() => currentGroup.value?.site_group?.group_name || '-')

const benefitCount = computed(() => {
    const g = currentGroup.value?.site_group
    if (!g) return 0
    return (g.app_name?.length || 0) + (g.addon_name?.length || 0)
})

/** 当前所选套餐的应用 + 插件名称（完成页展示） */
const selectedBenefitNames = computed(() => benefitNames(currentGroup.value))

/**
 * 套餐权益名称列表
 * @param item
 */
const benefitNames = (item: any): string[] => {
    const g = item?.site_group || {}
    return [ ...(g.app_name || []), ...(g.addon_name || []) ]
}

/**
 * 套餐权益数量
 * @param item
 */
const benefitTotal = (item: any) => benefitNames(item).length

/**
 * 完成页步骤条短文案
 * @param name
 */
const shortStageLabel = (name: string) => {
    const map: Record<string, string> = {
        '创建入口与前置校验': '前置校验',
        '站点基础信息开通': '基础信息',
        '站点管理员账号开通': '管理员',
        '站点初始化数据构建': '数据初始化',
        '创建完成与可用': '完成验证'
    }
    return map[name] || name
}

/**
 * 当前整步摘要卡（设计稿编号 +1）
 */
const currentStepCard = computed(() => {
    if (step.value === 2) {
        const stageNames = stages.value.map(s => shortStageLabel(s.label)).filter(Boolean)
        const flowText = stageNames.length
            ? stageNames.join(' -> ')
            : '前置校验 -> 基础信息开通 -> 管理员账号 -> 初始化数据 -> 可用性验证'
        const curIdx = Math.max(1, Math.min(doneStageCount.value + (currentStageKey.value ? 1 : 0), stages.value.length || 1))
        return {
            title: '第 2 步 · 开通中',
            desc: `${ stages.value.length || 5 } 阶段 ${ subFlowTotal.value || 0 } 子步骤：${ flowText }。当前阶段 ${ curIdx } · ${ progressPercent.value }%。`
        }
    }
    if (step.value === 3) {
        return {
            title: '第 3 步 · 创建完成',
            desc: '可用性验证通过，管理员账号与初始化数据就绪；可直接进入站点后台使用。'
        }
    }
    return {
        title: '第 1 步 · 填写信息与套餐',
        desc: '请填写站点名称并选择套餐档位，完成新站点的创建。'
    }
})

const passedStagesText = computed(() => {
    const names = stages.value.map(s => shortStageLabel(s.label)).filter(Boolean)
    return names.length ? names.join('、') : '前置校验、基础信息、管理员、数据初始化、完成验证'
})

/**
 * 进入站点管理（写入站点缓存后打开站点端，对齐首页 selectSite）
 */
const enterSite = () => {
    const siteId = Number(createResult.site_id) || 0
    if (!siteId) {
        ElMessage.warning('站点信息未就绪，请稍后重试')
        return
    }
    const site = {
        site_id: siteId,
        site_name: formData.site_name,
        group_id: formData.group_id,
        expire_time: createResult.expire_time
    }
    window.localStorage.setItem('site.siteId', String(site.site_id))
    window.localStorage.setItem('site.siteInfo', JSON.stringify(site))
    window.localStorage.setItem('site.comparisonSiteIdStorage', String(site.site_id))
    visible.value = false
    window.open(`${ location.origin }/site/`)
}

/**
 * 将接口流程映射为前端进度阶段
 * @param flows
 */
const mapFlowsToStages = (flows: any[]): StageItem[] => {
    return (flows || []).map((flow: any) => ({
        key: flow.id || `flow_${ flow.seq }`,
        label: flow.name || `阶段${ flow.seq }`,
        desc: flow.result || flow.purpose || '',
        status: 'pending' as StageStatus,
        costText: '',
        subs: (flow.sub_flows || []).map((sub: any) => ({
            key: sub.id || `sub_${ sub.seq }`,
            seq: String(sub.seq || ''),
            label: sub.name || '',
            status: 'pending' as StageStatus
        }))
    }))
}

/**
 * 获取创建流程
 */
const loadCreateFlow = async () => {
    const res: any = await getSiteCreateFlow({ with_sub: 1 })
    return res?.data || { total: 0, sub_flow_total: 0, flows: [] }
}

const resetForm = () => {
    formData.site_name = ''
    formData.desc = ''
    formData.group_id = props.siteGroup?.[0]?.group_id || 0
    step.value = 1
    submitting.value = false
    costSeconds.value = 0
    startAt.value = 0
    stages.value = []
    createResult.site_id = 0
    createResult.site_url = ''
    // createResult.admin_account = ''
    createResult.expire_time = ''
    createResult.created_at = ''
    stopTick()
}

watch(() => props.modelValue, (val) => {
    if (val) {
        resetForm()
        // 默认选中第一个套餐
        if (!formData.group_id && props.siteGroup?.length) {
            formData.group_id = props.siteGroup[0].group_id
        }
    }
})

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 按接口流程播放约 5 秒进度动画
 * @param taskId
 */
/**
 * 按阶段权重拆分总时长（校验短、初始化长），总量仍约 PROGRESS_DURATION
 * @param list
 */
const buildStageDurations = (list: StageItem[]) => {
    // 默认权重：前置校验 < 基础信息 ≈ 管理员 < 数据初始化 < 完成验证偏短
    const defaultWeights = [0.7, 0.9, 1.0, 1.8, 0.6]
    const weights = list.map((s, idx) => {
        const base = defaultWeights[idx] ?? (0.8 + idx * 0.2)
        // 子步骤越多，该主阶段略加长
        return base + (s.subs?.length || 0) * 0.2
    })
    const sum = weights.reduce((a, b) => a + b, 0) || 1
    return weights.map(w => Math.round(PROGRESS_DURATION * w / sum))
}

/**
 * 子步骤时长略有差异，避免完全均分
 * @param total
 * @param count
 */
const buildSubDurations = (total: number, count: number) => {
    if (count <= 0) return []
    if (count === 1) return [total]
    const raw = Array.from({ length: count }, (_, j) => 0.65 + (j % 3) * 0.25 + (j % 2) * 0.15)
    const sum = raw.reduce((a, b) => a + b, 0)
    const list = raw.map(w => Math.round(total * w / sum))
    // 修正四舍五入误差，保证合计等于 total
    const diff = total - list.reduce((a, b) => a + b, 0)
    list[list.length - 1] += diff
    return list
}

const runStageAnimation = async (taskId: number) => {
    const list = stages.value
    if (!list.length) {
        await sleep(PROGRESS_DURATION)
        return
    }

    const mainDurations = buildStageDurations(list)

    for (let i = 0; i < list.length; i++) {
        if (taskId !== createTaskId) return
        const stageStart = Date.now()
        list[i].status = 'running'
        list[i].costText = ''

        const mainMs = mainDurations[i] || Math.round(PROGRESS_DURATION / list.length)
        const subs = list[i].subs || []
        if (subs.length) {
            const subDurations = buildSubDurations(mainMs, subs.length)
            for (let j = 0; j < subs.length; j++) {
                if (taskId !== createTaskId) return
                subs[j].status = 'running'
                await sleep(subDurations[j])
                if (taskId !== createTaskId) return
                subs[j].status = 'done'
            }
        } else {
            await sleep(mainMs)
        }

        if (taskId !== createTaskId) return
        list[i].status = 'done'
        list[i].costText = formatCost(Date.now() - stageStart)
    }
}

/**
 * 提交创建
 */
const submitCreate = async () => {
    if (submitting.value) return
    if (!formData.group_id) {
        ElMessage.error('请先选择店铺套餐')
        return
    }
    if (Test.empty(formData.site_name)) {
        ElMessage.error('请输入站点名称')
        return
    }

    const valid = await formRef.value?.validate().catch(() => false)
    if (!valid) return

    submitting.value = true
    step.value = 2
    startAt.value = Date.now()
    startTick()
    stages.value = []

    const taskId = ++createTaskId

    try {
        // 先拉创建流程，再并行：创建接口 + 约 5 秒进度动画
        const flowData = await loadCreateFlow()
        if (taskId !== createTaskId) return

        stages.value = mapFlowsToStages(flowData?.flows || [])
        if (!stages.value.length) {
            stages.value = [
                { key: 'fallback', label: '创建站点', desc: '正在创建站点，请稍候', status: 'pending', costText: '', subs: [] }
            ]
        }
        // 并行：创建接口 + 进度动画；后端返回 { site_id, expire_time }
        const createPromise = createSite({
            site_name: formData.site_name,
            group_id: formData.group_id,
            desc: formData.desc
        }).then((res: any) => {
            const data = res?.data || {}
            createResult.site_id = data.site_id || 0
            if (data.expire_time) {
                createResult.expire_time = formatExpire(data.expire_time)
            }
            return res
        })
        const animationPromise = runStageAnimation(taskId)

        await Promise.all([createPromise, animationPromise])
        if (taskId !== createTaskId) return

        // 进度条收尾到 100%
        stages.value.forEach(s => {
            s.status = 'done'
            s.subs?.forEach(sub => {
                sub.status = 'done'
            })
        })
        costSeconds.value = Math.max(1, Math.round((Date.now() - startAt.value) / 1000))
        fillCreateResult()
        stopTick()
        step.value = 3
        emit('success')
    } catch (e) {
        if (taskId !== createTaskId) return
        createTaskId += 1
        step.value = 1
        stages.value = []
        stopTick()
    } finally {
        if (taskId === createTaskId || step.value === 1) {
            submitting.value = false
        }
    }
}

const onClosed = () => {
    createTaskId += 1
    resetForm()
}
</script>

<style lang="scss" scoped>
.cs-step-card {
    margin-bottom: 10px;
    padding: 10px 15px;
    border-radius: 12px;
    border: var(--border-default);
}

.cs-step-card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
}

.cs-step-card__title {
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
    color: var(--el-color-primary);
}

.cs-step-card.is-step-2 .cs-step-card__title,
.cs-step-card.is-step-3 .cs-step-card__title {
    color: var(--el-text-color-primary);
}

.cs-step-card__badge {
    flex-shrink: 0;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    background: var(--el-color-primary);

    &.is-success {
        background: var(--el-color-success);
    }
}

.cs-step-card__desc {
    font-size: 13px;
    line-height: 20px;
    color: var(--el-text-color-regular);
}

.cs-step-card__bar {
    margin-top: 12px;
    height: 8px;
    border-radius: 999px;
    background: var(--el-fill-color);
    overflow: hidden;
}

.cs-step-card__bar-inner {
    height: 100%;
    border-radius: inherit;
    background: var(--el-color-primary);
    transition: width 0.25s ease;
}

.cs-step-card__foot {
    margin-top: 10px;
    font-size: 12px;
    line-height: 18px;
    color: var(--el-text-color-secondary);

    &.is-success {
        color: var(--el-color-success);
    }
}

.cs-body {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 16px;
    height: 420px;
    overflow: hidden;
}

.cs-panel-title {
    border-bottom: 1px solid var(--sys-color-border-default);
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    flex-shrink: 0;
    padding: 10px 15px;
}

.cs-left {
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
    // padding: 16px;
    border: 1px solid var(--sys-color-border-default);
    border-radius: 12px;
    background: var(--el-bg-color);
    overflow: hidden;
}

.cs-form {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 15px;
}

.cs-tip {
    margin-top: auto;
    padding: 10px 12px;
    border-radius: 8px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-size: 12px;
    line-height: 18px;
    flex-shrink: 0;
}

.cs-right {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    height: 100%;
    border: 1px solid var(--sys-color-border-default);
    border-radius: 12px;
    background: var(--el-bg-color);
    overflow: hidden;
}

.cs-package-scroll {
    flex: 1;
    min-height: 0;
    height: 0; // 配合 flex:1，强制占满剩余高度并触发内部滚动
}

.cs-package-list {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.cs-package-card {
    box-sizing: border-box;
    padding: 14px 16px;
    border: 1px solid var(--el-border-color);
    border-radius: 10px;
    background: var(--el-bg-color);
    cursor: pointer;
    transition: border-color .2s, background-color .2s, box-shadow .2s;

    &:hover {
        border-color: var(--el-color-primary-light-5);
    }

    &.is-active {
        border-color: var(--el-color-primary);
        background-color: color-mix(in srgb, var(--el-color-primary) 5%, #fff);
        // box-shadow: 0 0 0 1px var(--el-color-primary);
    }
}

.cs-package-card__head {
    display: flex;
    align-items: center;
    gap: 12px;
}

.cs-package-card__name {
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
    color: var(--el-text-color-primary);
}

.cs-package-card__desc {
    margin-top: 2px;
    color: var(--el-text-color-secondary);
    font-size: 12px;
    line-height: 18px;
}

.cs-package-card__benefits {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px solid var(--sys-color-border-default);
}

.cs-package-card__benefits-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 18px;
    color: var(--el-text-color-regular);
}

.cs-benefit-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 8px;
    row-gap: 2px;
}

.cs-benefit-item {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    height: 26px;
    color: var(--el-text-color-regular);
    font-size: 12px;
    line-height: 26px;
    white-space: nowrap;
}

.cs-benefit-empty {
    grid-column: 1 / -1;
    color: var(--el-text-color-placeholder);
    font-size: 12px;
    line-height: 26px;
}

.cs-progress {
    display: flex;
    flex-direction: column;
    height: 450px;
    overflow: hidden;
}

.cs-done {
    height: 450px;
    overflow-y: auto;
    padding-right: 4px;
}

.cs-progress__head {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 10px;
    flex-shrink: 0;
}

.cs-progress__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    flex-shrink: 0;
}

.cs-progress__title {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 26px;
}

.cs-progress__meta {
    margin-top: 4px;
    color: var(--el-text-color-secondary);
    font-size: 13px;
}

.cs-progress__bar-wrap {
    padding: 10px 15px 0;
    border-radius: 10px;
    // background: var(--el-fill-color-lighter);
    flex-shrink: 0;
}

.cs-seg-bar {
    display: grid;
    gap: 6px;
}

.cs-seg-bar__item {
    height: 8px;
    border-radius: 4px;
    background: var(--sys-color-border-default);
    transition: background-color .25s;

    &.is-done {
        background: var(--el-color-primary);
    }

    &.is-running {
        background: linear-gradient(90deg, var(--el-color-primary) 0%, var(--el-color-primary-light-5) 100%);
        animation: cs-seg-pulse 1.2s ease-in-out infinite;
    }
}

@keyframes cs-seg-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .65; }
}

.cs-progress__stage-labels {
    display: grid;
    gap: 4px;
    margin-top: 10px;
    color: var(--el-text-color-placeholder);
    font-size: 12px;
    text-align: center;

    .is-active,
    .is-done {
        color: var(--el-color-primary);
    }
}

.cs-timeline-scroll {
    flex: 1;
    min-height: 0;
    height: 0; // 配合 flex:1，限制高度并启用内部滚动
}

.cs-timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 4px 8px;
}

.cs-timeline__item {
    display: flex;
    gap: 12px;
    position: relative;
    padding-bottom: 16px;

    &:not(:last-child)::before {
        content: '';
        position: absolute;
        left: 11px;
        top: 24px;
        bottom: 0;
        width: 1px;
        background: var(--sys-color-border-default);
    }

    &.is-done .cs-timeline__dot {
        background: var(--el-color-primary);
        color: #fff;
        border-color: var(--el-color-primary);
    }

    &.is-running .cs-timeline__dot {
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
    }
}

.cs-timeline__dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: 1px solid var(--el-border-color);
    border-radius: 50%;
    background: #fff;
    flex-shrink: 0;
    z-index: 1;
}

.cs-timeline__dot-empty {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--el-border-color);
}

.cs-timeline__content {
    flex: 1;
    min-width: 0;
}

.cs-timeline__head {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.cs-timeline__name {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
}

.cs-timeline__desc {
    margin-top: 2px;
    color: var(--el-text-color-secondary);
    font-size: 12px;
    line-height: 18px;
}

.cs-timeline__cost {
    flex-shrink: 0;
    color: var(--el-text-color-secondary);
    font-size: 12px;
    line-height: 22px;
    font-variant-numeric: tabular-nums;
}

.cs-subflow {
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 8px 10px;
    border: 1px solid var(--el-color-primary-light-7);
    border-radius: 8px;
    // background: var(--el-color-primary-light-9);
    background: color-mix(in srgb, var(--el-color-primary) 5%, #fff);
}

.cs-subflow__item {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 28px;
    color: var(--el-text-color-regular);
    font-size: 12px;
    line-height: 18px;

    & + & {
        margin-top: 4px;
    }

    &.is-done .cs-subflow__status {
        color: var(--el-color-success);
    }

    &.is-running .cs-subflow__status {
        color: var(--el-color-primary);
    }

    &.is-pending .cs-subflow__status {
        color: var(--el-text-color-placeholder);
    }
}

.cs-subflow__seq {
    flex-shrink: 0;
    color: var(--el-text-color-secondary);
}

.cs-subflow__name {
    flex: 1;
    min-width: 0;
}

.cs-subflow__status {
    flex-shrink: 0;
}

.cs-done__head {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 6px;
}

.cs-done__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width:42px;
    height:42px;
    border-radius: 12px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    flex-shrink: 0;
}

.cs-done__title {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 26px;
}

.cs-done__meta {
    margin-top: 4px;
    color: var(--el-text-color-secondary);
    font-size: 12px;
}

.cs-done-steps {
    padding: 6px 10px 0;
    border-radius: 10px;
    // background: var(--el-fill-color-lighter);
}

.cs-done-steps__labels {
    display: grid;
    gap: 6px;
    margin-top: 10px;
}

.cs-done-steps__label {
    color: var(--el-color-primary);
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.cs-done__banner {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
    padding: 10px 15px;
    border-radius: 10px;
    background: var(--el-color-primary-light-9);
}

.cs-done__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    padding: 15px;
    border-radius: 10px;
    background: var(--el-fill-color-lighter);
}

.cs-done__cell--full {
    grid-column: 1 / -1;
}

.cs-done__label {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    line-height: 18px;
}

.cs-done__value {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    word-break: break-all;
}

.cs-done__apps {
    margin-left: 2px;
    font-weight: 400;
    color: var(--el-text-color-regular);
}

.cs-done__log {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 10px;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid var(--sys-color-border-default);
    background: var(--el-bg-color);
}

.cs-done__log-text {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--el-text-color-regular);
    font-size: 13px;
    line-height: 20px;
}

.cs-done__log-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--el-color-success);
    flex-shrink: 0;
}

.cs-done__log-link {
    flex-shrink: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--el-color-primary);
    font-size: 13px;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }
}

.cs-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
}

.cs-footer--progress,
.cs-footer--done {
    justify-content: space-between;
}

.cs-footer__done-meta {
    color: var(--el-text-color-secondary);
    font-size: 13px;
    line-height: 20px;
}

.cs-footer__actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

.cs-footer__time {
    display: inline-flex;
    align-items: center;
    color: var(--el-text-color-secondary);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
}

.cs-footer__hint {
    display: inline-flex;
    align-items: center;
    color: var(--el-text-color-secondary);
    font-size: 13px;
}
</style>

<style lang="scss">
.create-site-dialog.el-dialog {
    border-radius: 12px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
}

.create-site-dialog .el-dialog__header,
.create-site-dialog .el-dialog__footer {
    flex-shrink: 0;
}

.create-site-dialog .el-dialog__body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
}
</style>
