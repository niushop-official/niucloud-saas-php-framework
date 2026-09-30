import { defineStore } from 'pinia'
import { getTaskActive, getTaskDetail, getTaskEvents, runTask, operateTask, cancelTask } from '@/app/api/task'

/**
 * 全局任务执行器
 *
 * 背景：任务（云编译 / 升级 / 备份）的推进原本由 task-terminal 组件在页面内轮询驱动，
 * 一旦离开页面任务就停住。这里把「驱动」上提到全局 store：
 * - 与页面无关：任何页面只要有进行中的任务，都会持续推进（离开详情页也不中断）
 * - 单一数据源：状态 / 进度 / 阶段 / 操作 / 事件流都由这里维护，各页面只做订阅渲染
 * - 并行：互斥任务与非互斥任务各占独立槽位，可同时推进（store 内按任务各自维护驱动循环）
 * - 驱动方式：队列可用（queue_alive）时任务由队列推进，这里只轮询状态；
 *             队列不可用或判定队列假死时，才由前端请求驱动
 */

/** 终态：进入后不再推进 */
export const TERMINAL_STATUS = [ 'success', 'failed', 'canceled', 'rolled_back', 'rollback_failed' ]

/** 带进度条的阶段（上传 / 下载）需要高频驱动，其余阶段低频即可 */
const FAST_STAGE = /(上传|下载)/

/** 队列驱动时：连续多少次轮询状态无变化即判定「队列假死」，恢复前端驱动 */
const STALE_THRESHOLD = 10

/** 单个任务的运行时状态 */
export interface TaskRuntime {
    /** 任务标识 */
    taskKey: string
    taskType: string
    title: string
    status: string
    progress: number
    stage: string
    cursor: string
    /** 等待决策时后端下发的可执行操作 */
    actions: any[]
    /** 任务开始时间（秒） */
    startTime: number
    /** 已执行时长（秒） */
    duration: number
    /** 任务锁被其它进程占用（瞬时状态，后端租约到期会自动接管） */
    locked: boolean
    lockedCount: number
    /** 是否在驱动中 */
    driving: boolean
    /** 是否互斥任务（顶部指示器等单任务展示处优先取互斥任务） */
    isMutex: boolean
    /** 队列驱动时「状态未变化」的轮询次数，达到阈值即判定队列假死并恢复前端驱动 */
    staleCount: number
    /** 用户已取消：忽略迟到的轮询结果 */
    aborted: boolean
    /** 累计事件（终端增量渲染的事件流） */
    events: any[]
    /** 已从 events 接口拉取到的最大事件序号（增量拉取游标） */
    eventSeq: number
    /** 详情是否已加载过 */
    loaded: boolean
    /** 详情是否正在加载（页面 attach 与全局接管并发时避免重复请求） */
    loading: boolean
    /** 最后一次状态变更时间（页面据此刷新步骤等派生数据） */
    updatedAt: number
}

/** 驱动定时器：key => timerId（非响应式，避免被代理） */
const timers: Record<string, any> = {}
/** 计时器（每秒更新进行中任务的耗时） */
let durationTimer: any = null

const isTerminal = (status: string) => TERMINAL_STATUS.includes(status)

const taskRunnerStore = defineStore('taskRunner', {
    state: () => ({
        /** 任务运行时：taskKey => runtime */
        tasks: {} as Record<string, TaskRuntime>,
        /** 当前进行中的任务（后端全局互斥，同一时刻最多一个） */
        activeKey: '' as string,
        /** 是否已执行过全局接管（避免重复 bootstrap） */
        booted: false as boolean,
        /**
         * 队列是否可用（后端判定）
         * true：任务由队列自驱推进，前端只轮询状态；false：由前端请求驱动
         */
        queueAlive: false as boolean,

        /**
         * 全局任务详情抽屉（由 layout 层的 task-drawer 组件渲染）
         *
         * 任何位置打开任务详情都走这里，不再跳转 task_detail 路由：
         * key / type 决定展示哪个任务，visible 控制抽屉开合。
         *
         * pending：任务**创建中**的占位态 —— 创建接口可能耗时（升级要取云端升级包等），
         * 这段空窗期先把抽屉打开显示「正在创建任务」，拿到 task_key 后再切到真实详情，
         * 避免「校验弹窗已关、详情还没出来」的空窗让用户以为卡住。
         */
        detail: {
            key: '', type: '', visible: false,
            pending: false, pendingType: '', pendingTitle: ''
        } as {
            key: string, type: string, visible: boolean,
            pending: boolean, pendingType: string, pendingTitle: string
        }
        }),

    getters: {
        /** 指定任务的运行时（未注册时返回 null） */
        runtime: (state) => (taskKey: string): TaskRuntime | null => state.tasks[ taskKey ] ?? null,

        /** 是否存在进行中的任务 */
        hasActive: (state) => !!state.activeKey,

        /** 指定任务是否已进入终态 */
        isTaskTerminal: (state) => (taskKey: string): boolean => {
            const rt = state.tasks[ taskKey ]
            return !!rt && isTerminal(rt.status)
        },

        /** 指定任务是否等待用户决策 */
        isTaskWaiting: (state) => (taskKey: string): boolean => state.tasks[ taskKey ]?.status === 'waiting_input'
    },

    actions: {
        /**
         * 取（或创建）任务运行时，不发起任何请求
         */
        ensure(taskKey: string): TaskRuntime {
            if (!taskKey) return null as any
            if (!this.tasks[ taskKey ]) {
                this.tasks[ taskKey ] = {
                    taskKey,
                    taskType: '',
                    title: '',
                    status: '',
                    progress: 0,
                    stage: '',
                    cursor: '',
                    actions: [],
                    startTime: 0,
                    duration: 0,
                    locked: false,
                    lockedCount: 0,
                    driving: false,
                    isMutex: false,
                    staleCount: 0,
                    aborted: false,
                    events: [],
                    eventSeq: 0,
                    loaded: false,
                    loading: false,
                    updatedAt: 0
                }
            }
            return this.tasks[ taskKey ]
        },

        /**
         * 加载任务详情（状态 / 进度 / 阶段 / 操作）
         */
        async loadDetail(taskKey: string): Promise<any | null> {
            const rt = this.ensure(taskKey)
            if (!rt || rt.loading) return null
            rt.loading = true
            try {
                const res: any = await getTaskDetail(taskKey)
                const data = res?.data
                if (!data) return null

                rt.taskType = data.task_type ?? rt.taskType
                rt.title = data.title ?? rt.title
                rt.status = data.status ?? rt.status
                rt.progress = Number(data.progress ?? 0)
                rt.stage = data.stage ?? rt.stage
                rt.cursor = data.cursor ?? rt.cursor
                rt.isMutex = Number(data.is_mutex ?? 0) === 1
                rt.actions = Array.isArray(data.actions) ? data.actions : []
                rt.startTime = Number(data.start_time || rt.startTime || 0)
                rt.loaded = true
                rt.updatedAt = Date.now()
                return data
            } catch (e) {
                return null
            } finally {
                rt.loading = false
            }
        },

        /**
         * 页面挂载时调用：确保任务已加载，并在非终态时接管驱动
         * 已在驱动的任务不重复启动（切换页面不会打断推进）
         */
        async attach(taskKey: string) {
            if (!taskKey) return
            const rt = this.ensure(taskKey)

            if (!rt.loaded) await this.loadDetail(taskKey)

            if (rt.loaded && rt.status && !isTerminal(rt.status) && !rt.driving) {
                this.beginDrive(taskKey)
            }
            this.startDurationTimer()
        },

        /**
         * 任务创建成功 / 需要立即接管：加载详情并开始驱动
         */
        async start(taskKey: string) {
            if (!taskKey) return
            await this.loadDetail(taskKey)
            this.beginDrive(taskKey)
            this.refreshActiveKey()
        },

        /**
         * 全局入口：接管后端当前进行中的任务（在后台布局挂载时调用一次）
         * 这样即便用户从未打开过任务详情页，任务也会持续推进
         *
         * 互斥任务与非互斥任务可并行，这里逐个接管；队列可用性一并同步，
         * 决定后续是「只轮询状态」还是「前端请求驱动」
         */
        async bootstrap() {
            if (this.booted) return
            this.booted = true
            try {
                const res: any = await getTaskActive()
                const data = res?.data
                this.queueAlive = !!data?.queue_alive

                const list = Array.isArray(data?.list) ? data.list : []
                for (const row of list) {
                    const key = String(row?.task_key ?? '')
                    if (!key || isTerminal(String(row?.status ?? ''))) continue

                    const rt = this.ensure(key)
                    rt.taskType = row.task_type ?? rt.taskType
                    rt.title = row.title ?? rt.title
                    rt.status = row.status ?? rt.status
                    rt.progress = Number(row.progress ?? rt.progress)
                    rt.stage = row.stage ?? rt.stage
                    rt.cursor = row.cursor ?? rt.cursor
                    rt.isMutex = Number(row.is_mutex ?? 0) === 1
                    rt.loaded = true
                    this.beginDrive(key)
                }
                this.refreshActiveKey()
            } catch (e) {
                // 静默：无进行中任务时接口可能返回空
            }
        },

        /**
         * 打开任务详情（全局抽屉）
         *
         * 统一入口：任何页面 / 组件想看任务详情都调这里，由 layout 层的 task-drawer 渲染，
         * 不再跳转 task_detail 路由，避免离开当前页丢失上下文。
         *
         * @param taskKey 任务标识
         * @param taskType 任务类型（产物口径；可省略，缺省取运行时已加载的类型）
         */
        openDetail(taskKey: string, taskType: string = '') {
            if (!taskKey) return

            // 拿到真实任务即结束占位态（占位 -> 详情是同一次开合，不做关闭动画）
            this.detail.pending = false
            this.detail.pendingTitle = ''
            this.detail.key = taskKey
            this.detail.type = taskType || String(this.tasks[ taskKey ]?.taskType ?? '')
            this.detail.visible = true
        },

        /**
         * 打开「创建中」占位抽屉
         *
         * 用于「发起任务」到「拿到 task_key」之间的空窗期：先把抽屉打开并展示占位，
         * 创建成功调 openDetail() 原地切换，失败调 closePendingDetail()。
         *
         * @param taskType 任务类型（占位标题的兜底来源）
         * @param title    占位标题（如「正在发起升级」，为空则按类型兜底）
         */
        openPendingDetail(taskType: string = '', title: string = '') {
            this.detail.pending = true
            this.detail.pendingType = taskType
            this.detail.pendingTitle = title
            this.detail.key = ''
            this.detail.type = taskType
            this.detail.visible = true
        },

        /** 创建失败：关掉占位抽屉（错误由调用方另行提示） */
        closePendingDetail() {
            if (!this.detail.pending) return
            this.detail.pending = false
            this.detail.pendingTitle = ''
            this.detail.visible = false
        },

        /**
         * 关闭任务详情抽屉（详情内点「返回」时调用）
         */
        closeDetail() {
            this.detail.pending = false
            this.detail.pendingTitle = ''
            this.detail.visible = false
        },

        /**
         * 抽屉关闭动画结束：清空任务标识，由 v-if 完成唯一的卸载动作
         */
        resetDetail() {
            this.detail.key = ''
            this.detail.type = ''
            this.detail.pending = false
            this.detail.pendingType = ''
            this.detail.pendingTitle = ''
        },

        /**
         * 发现并接管新任务
         *
         * 任务终态后后端会调度同站点的排队任务（无论队列是否可用都会置为执行中），
         * 队列不可用时这些任务没人推进，故这里重新拉一次进行中任务并接管。
         */
        async discover() {
            try {
                const res: any = await getTaskActive()
                const data = res?.data
                this.queueAlive = !!data?.queue_alive

                const list = Array.isArray(data?.list) ? data.list : []
                for (const row of list) {
                    const key = String(row?.task_key ?? '')
                    if (!key || isTerminal(String(row?.status ?? ''))) continue

                    const rt = this.ensure(key)
                    if (rt.driving) continue // 已在驱动的不重复起循环

                    rt.taskType = row.task_type ?? rt.taskType
                    rt.title = row.title ?? rt.title
                    rt.status = row.status ?? rt.status
                    rt.progress = Number(row.progress ?? rt.progress)
                    rt.stage = row.stage ?? rt.stage
                    rt.cursor = row.cursor ?? rt.cursor
                    rt.isMutex = Number(row.is_mutex ?? 0) === 1
                    rt.loaded = true
                    this.beginDrive(key)
                }
                this.refreshActiveKey()
            } catch (e) {
                // 静默：无进行中任务时接口可能返回空
            }
        },

        /**
         * 刷新优先展示的任务：互斥任务优先，其次是第一个非终态任务（供顶部指示器等单任务展示使用）
         */
        refreshActiveKey() {
            let mutexKey = ''
            let firstKey = ''
            Object.values(this.tasks).forEach((rt: TaskRuntime) => {
                if (isTerminal(rt.status)) return
                if (!firstKey) firstKey = rt.taskKey
                if (rt.isMutex && !mutexKey) mutexKey = rt.taskKey
            })
            this.activeKey = mutexKey || firstKey
        },

        /**
         * 开始驱动：立即执行一次，随后按阶段节奏自行调度
         */
        beginDrive(taskKey: string) {
            const rt = this.ensure(taskKey)
            if (!rt || isTerminal(rt.status)) return
            // 已有驱动循环（如页面 attach 与全局 bootstrap 同时触发）：不重复起循环
            if (rt.driving) return

            rt.driving = true
            rt.aborted = false
            rt.staleCount = 0
            if (!rt.startTime) rt.startTime = Math.floor(Date.now() / 1000)
            this.startDurationTimer()
            this.tick(taskKey)
        },

        /**
         * 驱动一次
         *
         * 队列可用：任务由队列自驱推进，这里只拉详情刷新状态（低频兜底）；
         *          若连续多次状态无变化（队列假死），自动恢复为前端请求驱动。
         * 队列不可用：调用 run 推进一片 / 一步。
         */
        async tick(taskKey: string) {
            const rt = this.tasks[ taskKey ]
            if (!rt || !rt.driving || rt.aborted) return
            if (isTerminal(rt.status) || rt.status === 'waiting_input') return

            // 队列可用且未判定假死：只读轮询，不推进
            // （排队中 created 的任务同样走这里：由后端调度占槽后才开始推进）
            if (this.queueAlive && rt.staleCount < STALE_THRESHOLD) {
                const before = this.statusFingerprint(rt)
                try {
                    const res: any = await getTaskDetail(taskKey)
                    if (res?.data) this.applyResult(taskKey, res.data)
                } catch (e) {
                    // 网络异常：保持轮询
                }

                // 队列驱动时不调用 run，事件不会随详情返回，需单独增量拉取事件流水供终端渲染
                await this.pullEvents(taskKey)

                if (isTerminal(rt.status) || rt.status === 'waiting_input') return

                rt.staleCount = this.statusFingerprint(rt) === before ? rt.staleCount + 1 : 0
                this.schedule(taskKey)
                return
            }

            try {
                // 队列假死时 force 强制接管；队列不可用时后端本就会推进
                const res: any = await runTask(taskKey, rt.cursor || '', this.queueAlive)
                if (res?.data) {
                    this.applyResult(taskKey, res.data)
                    rt.staleCount = 0
                }
            } catch (e) {
                // 网络异常：退避后重试；真正的失败由后端下发终态 / waiting_input
            }

            // 终态 / 等待决策时不再继续调度
            if (isTerminal(rt.status) || rt.status === 'waiting_input') return
            this.schedule(taskKey)
        },

        /**
         * 增量拉取事件流水（队列驱动时的终端输出来源）
         *
         * 队列模式下前端不调 run，而 detail 接口不带事件，终端会一直没有输出；
         * 这里按 seq 增量拉取 events.jsonl 并追加到 rt.events，由终端增量渲染。
         */
        async pullEvents(taskKey: string) {
            const rt = this.tasks[ taskKey ]
            if (!rt) return

            try {
                const res: any = await getTaskEvents(taskKey, rt.eventSeq, 0)
                const list = Array.isArray(res?.data) ? res.data : []
                if (!list.length) return

                list.forEach((ev: any) => {
                    const seq = Number(ev?.seq ?? 0)
                    if (seq > rt.eventSeq) rt.eventSeq = seq
                    rt.events.push(ev)
                })
            } catch (e) {
                // 网络异常：下一轮继续
            }
        },

        /**
         * 同步事件游标（终端全量回放后调用，避免后续增量把已回放的事件再拉一遍）
         */
        setEventSeq(taskKey: string, seq: number) {
            const rt = this.ensure(taskKey)
            if (!rt) return
            if (Number(seq) > rt.eventSeq) rt.eventSeq = Number(seq)
        },

        /**
         * 状态指纹：用于判断队列是否仍在推进任务
         */
        statusFingerprint(rt: TaskRuntime): string {
            return `${ rt.status }|${ rt.progress }|${ rt.cursor }|${ rt.stage }`
        },

        /**
         * 安排下一次推进：带进度条的阶段高频，其余低频；被占用时线性退避
         */
        schedule(taskKey: string) {
            const rt = this.tasks[ taskKey ]
            if (!rt || !rt.driving || rt.aborted) return
            if (isTerminal(rt.status) || rt.status === 'waiting_input') return

            timers[ taskKey ] && clearTimeout(timers[ taskKey ])
            const base = FAST_STAGE.test(rt.stage || '') ? 500 : 3000
            const wait = rt.locked ? Math.min(base + rt.lockedCount * 1000, 15000) : base
            timers[ taskKey ] = window.setTimeout(() => this.tick(taskKey), wait)
        },

        /**
         * 应用一次 run / operate 的返回结果：更新状态并追加事件
         */
        applyResult(taskKey: string, data: any) {
            const rt = this.ensure(taskKey)
            if (!data) return

            // 后端判定队列可用时不会推进任务（driven_by=queue），同步标志后转只读轮询
            if (data.driven_by === 'queue') this.queueAlive = true

            // 取消后忽略迟到的非终态结果，避免把已收敛的状态回滚
            if (rt.aborted && !isTerminal(String(data.status ?? ''))) return

            // 被其它进程占用：保持真实状态不变，退避后继续
            if (data.status === 'locked') {
                rt.locked = true
                rt.lockedCount++
                rt.updatedAt = Date.now()
                this.schedule(taskKey)
                return
            }
            rt.locked = false
            rt.lockedCount = 0

            rt.status = String(data.status ?? rt.status)
            rt.progress = Number(data.progress ?? rt.progress)
            rt.stage = data.stage ?? rt.stage
            rt.cursor = data.cursor ?? rt.cursor
            rt.actions = Array.isArray(data.actions) ? data.actions : []
            rt.updatedAt = Date.now()

            // 事件流：供终端增量渲染（终端自行去重）
            const events = Array.isArray(data.events) ? data.events : []
            events.forEach((ev: any) => rt.events.push(ev))

            if (isTerminal(rt.status)) {
                this.stop(taskKey)
                // 任务结束后后端会调度同站点排队任务：接管新任务（队列不可用时由这里继续驱动）
                this.discover()
            } else if (rt.status !== 'waiting_input') {
                this.refreshActiveKey()
            }
        },

        /**
         * 用户决策（重试 / 跳过 / 回滚 …）：下发后恢复推进
         */
        async operate(taskKey: string, code: string) {
            const res: any = await operateTask(taskKey, code)
            const rt = this.ensure(taskKey)
            if (res?.data) {
                rt.aborted = false
                this.applyResult(taskKey, res.data)
                // 仍在执行（非终态、非等待决策）：继续推进
                if (!isTerminal(rt.status) && rt.status !== 'waiting_input') {
                    rt.driving = true
                    this.tick(taskKey)
                }
            }
            return res?.data
        },

        /**
         * 取消任务：进入中止态并立即停止驱动
         */
        async cancel(taskKey: string) {
            const rt = this.ensure(taskKey)
            rt.aborted = true
            const res: any = await cancelTask(taskKey)
            if (res?.data) {
                this.applyResult(taskKey, res.data)
                this.stop(taskKey)
            } else {
                rt.aborted = false
            }
            return res?.data
        },

        /**
         * 停止驱动（终态 / 取消时自动调用）
         */
        stop(taskKey: string) {
            const rt = this.tasks[ taskKey ]
            if (!rt) return
            rt.driving = false
            rt.staleCount = 0
            timers[ taskKey ] && clearTimeout(timers[ taskKey ])
            timers[ taskKey ] = null
            this.refreshActiveKey()
            // 无进行中任务时停掉计时器，避免空转
            if (!this.activeKey) this.stopDurationTimer()
        },

        /**
         * 每秒刷新进行中任务的耗时（无进行中任务时自动停止）
         */
        startDurationTimer() {
            if (durationTimer) return
            durationTimer = window.setInterval(() => {
                const now = Math.floor(Date.now() / 1000)
                let active = false
                Object.values(this.tasks).forEach((rt: TaskRuntime) => {
                    if (isTerminal(rt.status)) return
                    active = true
                    rt.duration = rt.startTime ? Math.max(0, now - rt.startTime) : 0
                })
                if (!active) this.stopDurationTimer()
            }, 1000)
        },

        stopDurationTimer() {
            durationTimer && clearInterval(durationTimer)
            durationTimer = null
        }
    }
})

export default taskRunnerStore
