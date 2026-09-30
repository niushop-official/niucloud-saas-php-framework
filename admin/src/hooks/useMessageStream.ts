import { ref, onUnmounted } from 'vue'
import { getMessageStreamUrl, getMessageListen } from '@/app/api/notice'

/**
 * 站内信实时推送 Hook
 *
 * 双通道设计：
 * 1）首选 SSE：连接建立后由服务端主动下发，毫秒级到达；
 * 2）降级长轮询：SSE 建立后长时间收不到任何数据帧（典型原因是反向代理把
 *    text/event-stream 攒在压缩缓冲区里），自动切换到 notice/message/listen。
 *
 * 为什么要自动降级：SSE 能否正常工作强依赖服务器配置（关压缩、关缓冲）。
 * 部署环境不可控时，用「首帧看门狗」把不可用的情况识别出来并自动兜底，
 * 保证消息通知在任何配置下都能到达，只是延迟从毫秒级变成最长 25 秒。
 *
 * 关键约束：EventSource 不支持自定义请求头，token 与 site-id 通过 query 传递。
 */

/** 实时通道模式 */
export type RealtimeMode = 'connecting' | 'sse' | 'polling'

/** 消息条目 */
export interface MessageItem {
    id: number
    category: string
    sub_category: string
    category_name: string
    sub_category_name: string
    title: string
    content: string
    params: Record<string, any>
    level: string
    is_read: number
    create_time: number
}

/** 未读数量结构：{ other: { count: 3, sub: { system_notice: 1 } } } */
export interface UnreadItem {
    count: number
    sub: Record<string, number>
}

/** 服务端下发的快照 */
export interface MessageSnapshot {
    version: string
    unread: Record<string, UnreadItem>
    unread_total: number
    latest: MessageItem[]
    server_time: number
    /** 长轮询返回：本轮是否有变化 */
    changed?: boolean
}

interface UseMessageStreamOptions {
    /** 每次收到快照时触发（用于刷新列表、弹窗提示） */
    onSnapshot?: (data: MessageSnapshot) => void
    /** 页面从后台切回前台时触发（用于立即校正未读数） */
    onResume?: () => void
    /** 通道切换时触发（仅用于调试观察） */
    onModeChange?: (mode: RealtimeMode) => void
}

/**
 * SSE 首帧超时。
 * 服务端连接建立后会立即下发一次快照，正常 1~2 秒内必然到达；
 * 超过该时长仍无任何数据帧（含心跳），判定链路被缓冲，直接降级。
 */
const SSE_FIRST_FRAME_TIMEOUT = 10 * 1000

/** 超过该时长未收到任何数据（含心跳）判定链路假死，主动重连 */
const STALE_TIMEOUT = 90 * 1000

/** 看门狗检查间隔 */
const WATCHDOG_INTERVAL = 20 * 1000

/** 连续错误达到该次数后停止重连：避免 token 失效时无限重连 */
const MAX_CONSECUTIVE_ERROR = 5

/** 降级为长轮询后，每隔多久回头试一次 SSE（服务器配置修好后自动恢复） */
const SSE_REPROBE_INTERVAL = 10 * 60 * 1000

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useMessageStream(options: UseMessageStreamOptions = {}) {
    const snapshot = ref<MessageSnapshot | null>(null)
    const unread = ref<Record<string, UnreadItem>>({})
    const unreadTotal = ref(0)
    const connected = ref(false)
    /** 连接彻底失败（如 token 失效），交由业务层决定是否提示 */
    const dead = ref(false)
    /** 当前实际生效的通道，便于排查 */
    const mode = ref<RealtimeMode>('connecting')

    let source: EventSource | null = null
    let watchdogTimer: any = null
    let firstFrameTimer: any = null
    let reprobeTimer: any = null
    let pollAbort: AbortController | null = null

    let lastDataAt = 0
    let errorCount = 0
    let enabled = false
    let polling = false
    /** 最近一次已知的消息版本号，长轮询携带 */
    let version = ''

    /**
     * 代际号：切换站点 / 隐藏页面 / 重建连接时自增。
     * 在途的异步回调拿到的是旧代际，直接丢弃，避免污染新状态。
     */
    let generation = 0

    const setMode = (next: RealtimeMode) => {
        if (mode.value === next) return
        mode.value = next
        options.onModeChange?.(next)
    }

    const clearSseTimers = () => {
        if (watchdogTimer) {
            clearInterval(watchdogTimer)
            watchdogTimer = null
        }
        if (firstFrameTimer) {
            clearTimeout(firstFrameTimer)
            firstFrameTimer = null
        }
    }

    const closeSse = () => {
        clearSseTimers()
        if (source) {
            source.close()
            source = null
        }
        connected.value = false
    }

    const closePolling = () => {
        polling = false
        if (pollAbort) {
            pollAbort.abort()
            pollAbort = null
        }
    }

    const handleSnapshot = (data: MessageSnapshot) => {
        snapshot.value = data
        unread.value = data.unread || {}
        unreadTotal.value = data.unread_total ?? 0
        if (data.version) version = data.version
        options.onSnapshot?.(data)
    }

    /** 收到任意数据帧（含心跳）时调用 */
    const markAlive = () => {
        lastDataAt = Date.now()
        errorCount = 0
        dead.value = false
        connected.value = true
        if (firstFrameTimer) {
            clearTimeout(firstFrameTimer)
            firstFrameTimer = null
        }
        // 收到真实数据帧，说明链路通畅，标记为 SSE 通道
        setMode('sse')
    }

    /**
     * 降级为长轮询
     * @param reason 触发降级的原因，仅用于控制台排查
     */
    const fallbackToPolling = (reason: string) => {
        if (polling) return
        console.info(`[站内信] SSE 通道不可用（${reason}），已自动降级为长轮询`)
        closeSse()
        setMode('polling')
        startPolling()
        scheduleReprobe()
    }

    /**
     * 定期回头重试 SSE：服务器配置修好后无需刷新页面即可自动恢复
     */
    const scheduleReprobe = () => {
        if (reprobeTimer) clearTimeout(reprobeTimer)
        reprobeTimer = setTimeout(() => {
            if (!enabled || document.visibilityState === 'hidden') return
            closePolling()
            errorCount = 0
            setMode('connecting')
            startSse()
        }, SSE_REPROBE_INTERVAL)
    }

    /**
     * 启动 SSE 连接
     */
    const startSse = () => {
        // 页面不可见时不建立连接，避免白占服务端进程
        if (!enabled || source || document.visibilityState === 'hidden') return

        const myGeneration = ++generation
        lastDataAt = Date.now()
        source = new EventSource(getMessageStreamUrl())

        source.onopen = () => {
            if (myGeneration !== generation) return
            connected.value = true
            dead.value = false
            lastDataAt = Date.now()
        }

        // 服务端下发的消息快照
        source.addEventListener('message', (e: MessageEvent) => {
            if (myGeneration !== generation) return
            markAlive()
            try {
                handleSnapshot(JSON.parse(e.data))
            } catch (err) {
                // 数据格式异常时忽略本帧，等待下一帧
            }
        })

        // 服务端心跳，仅用于更新链路活跃时间
        source.addEventListener('ping', () => {
            if (myGeneration !== generation) return
            markAlive()
        })

        source.onerror = () => {
            if (myGeneration !== generation) return
            connected.value = false
            errorCount++

            // 少量错误交给 EventSource 自行重连（重连间隔由服务端 retry 指令下发）
            // 连续失败通常意味着 token 失效或服务不可用，停止重连避免打爆服务端
            if (errorCount >= MAX_CONSECUTIVE_ERROR) {
                closeSse()
                dead.value = true
            }
        }

        // 首帧看门狗：连上了却一个字节都收不到，是被压缩/代理缓冲的典型特征
        firstFrameTimer = setTimeout(() => {
            firstFrameTimer = null
            if (myGeneration !== generation) return
            if (Date.now() - lastDataAt >= SSE_FIRST_FRAME_TIMEOUT) {
                fallbackToPolling('首帧超时，疑似被压缩或代理缓冲')
            }
        }, SSE_FIRST_FRAME_TIMEOUT)

        // 链路假死看门狗：代理层可能静默掐断连接却不触发 error，需主动检测并重建
        watchdogTimer = setInterval(() => {
            if (myGeneration !== generation) return
            if (!source || document.visibilityState === 'hidden') return
            if (Date.now() - lastDataAt > STALE_TIMEOUT) {
                closeSse()
                errorCount = 0
                startSse()
            }
        }, WATCHDOG_INTERVAL)
    }

    /**
     * 启动长轮询（SSE 不可用时的兜底通道）
     * 服务端最长挂起 25 秒，支持度只取决于「响应能否完整返回」，不受压缩/缓冲影响。
     */
    const startPolling = () => {
        if (!enabled || polling) return
        polling = true
        const myGeneration = ++generation

        const loop = async () => {
            while (enabled && polling && myGeneration === generation && document.visibilityState !== 'hidden') {
                const controller = new AbortController()
                pollAbort = controller
                try {
                    const res: any = await getMessageListen(version, controller.signal)
                    if (myGeneration !== generation) return

                    errorCount = 0
                    dead.value = false
                    connected.value = true

                    const data = res?.data
                    if (data) {
                        if (data.changed) {
                            handleSnapshot(data as MessageSnapshot)
                        } else if (data.version) {
                            version = data.version
                        }
                    }
                } catch (err: any) {
                    if (myGeneration !== generation) return
                    // 主动中止（页面隐藏 / 切换站点）不算错误
                    if (controller.signal.aborted || err?.code === 'ERR_CANCELED') return

                    connected.value = false
                    errorCount++
                    if (errorCount >= MAX_CONSECUTIVE_ERROR) {
                        dead.value = true
                        polling = false
                        return
                    }
                    // 指数退避，避免服务端异常时把请求打满
                    await sleep(Math.min(3000 * errorCount, 15000))
                } finally {
                    if (pollAbort === controller) pollAbort = null
                }
            }
        }

        loop()
    }

    /**
     * 停止所有通道
     */
    const stop = () => {
        enabled = false
        generation++
        closeSse()
        closePolling()
        if (reprobeTimer) {
            clearTimeout(reprobeTimer)
            reprobeTimer = null
        }
    }

    /**
     * 重建连接：切换站点、token 更新后调用
     */
    const restart = () => {
        generation++
        closeSse()
        closePolling()
        errorCount = 0
        version = ''
        dead.value = false
        if (mode.value === 'polling') {
            startPolling()
        } else {
            setMode('connecting')
            startSse()
        }
    }

    const handleVisibility = () => {
        if (!enabled) return
        if (document.visibilityState === 'hidden') {
            // 页面隐藏时断开，释放服务端 FPM 进程
            closeSse()
            closePolling()
        } else {
            errorCount = 0
            if (mode.value === 'polling') {
                startPolling()
            } else {
                startSse()
            }
            // 断开期间的消息需要立即校正，避免未读数滞后
            options.onResume?.()
        }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    /**
     * 初始化：由组件挂载后调用
     */
    const connect = () => {
        enabled = true
        startSse()
    }

    onUnmounted(() => {
        stop()
        document.removeEventListener('visibilitychange', handleVisibility)
    })

    return {
        snapshot,
        unread,
        unreadTotal,
        connected,
        dead,
        mode,
        connect,
        stop,
        restart
    }
}
