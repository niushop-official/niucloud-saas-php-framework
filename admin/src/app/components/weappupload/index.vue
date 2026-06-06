<template>
    <el-dialog v-model="showDialog" title="小程序上传" width="850px" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="dialogClose">
        <div v-show="active == 'upload'" class="h-[50vh]" v-loading="loading">
            <div class="h-[45vh]" v-show="cloudBuildTask">
                <terminal ref="terminalRef" :name="`weappupload-${terminalId}`" context="" :init-log="null" :show-header="false" :show-log-time="true" @exec-cmd="onExecCmd"/>
            </div>
            <div class="flex justify-end mt-[20px]" v-show="cloudBuildTask">
                <el-button @click="dialogCancel()">取消</el-button>
                <el-button type="primary" :loading="timeloading" class="!w-[140px]" v-if="!errorInfo">已用时 {{ formattedDuration }}</el-button>
                <el-button type="primary" @click="active = 'error'" v-if="errorInfo">下一步</el-button>
            </div>
        </div>
        <div v-show="active == 'complete'">
            <div class="h-[50vh] flex flex-col">
                <div class="flex-1 h-0 flex justify-center items-center flex-col">
                    <el-result icon="success" title="上传成功">
                        <template #sub-title>
                            <p class="text-[16px]">小程序上传成功，耗时 {{ formattedDuration }}</p>
                        </template>
                        <template #extra>
                            <el-button type="primary" @click="handleComplete">完成</el-button>
                        </template>
                    </el-result>
                </div>
            </div>
        </div>
        <div v-show="active == 'error'">
            <div class="h-[50vh] flex flex-col">
                <div class="flex-1 h-0 flex justify-center items-center flex-col">
                    <el-result icon="error" title="上传失败">
                        <template #extra>
                            <p class="text-[14px] text-red-500 mb-[10px]" v-if="errorInfo">错误信息: {{ errorInfo }}</p>
                            <el-button type="primary" @click="handleErrorNextStep">下一步</el-button>
                        </template>
                    </el-result>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, nextTick, onUnmounted, computed } from 'vue'
import { t } from '@/lang'
import { getWeappUploadLog, fetchWeappUploadLog } from '@/app/api/weapp'
import { CLOUD_COMPILE_BASE_URL } from '@/app/api/cloud'
import { Terminal } from 'vue-web-terminal'
import 'vue-web-terminal/lib/theme/dark.css'
import { ElMessageBox, ElMessage } from 'element-plus'

const showDialog = ref(false)
const terminalId = ref(Date.now())
const cloudBuildTask = ref<any>(null)
const active = ref('upload')
const loading = ref(false)
const terminalRef = ref(null)
const errorInfo = ref('')
const timeloading = ref(false)
const errorAnalysis = ref({})

let uploadLog: any[] = []
let eventSource: EventSource | null = null
const uploadStartTime = ref<number | null>(null)
const uploadDuration = ref(0)
let durationTimer: number | null = null

interface TerminalMessage {
    content: string
    class?: string
}

let messageQueue: TerminalMessage[] = []
let messageQueueTimer: number | null = null
const MESSAGE_FLUSH_INTERVAL = 300

const flushMessageQueue = () => {
    if (!terminalRef.value || messageQueue.length === 0) return
    while (messageQueue.length > 0) {
        const msg = messageQueue.shift()
        if (msg) {
            terminalRef.value.pushMessage(msg)
        }
    }
}

const queueMessage = (content: string, className?: string) => {
    messageQueue.push({ content, class: className })
    if (messageQueueTimer === null) {
        messageQueueTimer = window.setTimeout(() => {
            flushMessageQueue()
            messageQueueTimer = null
        }, MESSAGE_FLUSH_INTERVAL)
    }
}

const clearMessageQueue = () => {
    messageQueue = []
    if (messageQueueTimer !== null) {
        clearTimeout(messageQueueTimer)
        messageQueueTimer = null
    }
}

const formattedDuration = computed(() => {
    const seconds = uploadDuration.value
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}分${secs}秒` : `${secs}秒`
})

const onExecCmd = (cmd: string) => {
}

const getWeappSseUrl = (taskId: string): string => {
    return `${CLOUD_COMPILE_BASE_URL}/cloud/weapp_sse?task_id=${taskId}`
}

interface SSEMessage {
    type: string
    task_id?: string
    percent?: number
    action?: string
    msg?: string
    code?: string
    time?: string
}

const connectSSE = (taskId: string) => {
    if (eventSource) {
        eventSource.close()
    }

    const url = getWeappSseUrl(taskId)
    eventSource = new EventSource(url)

    eventSource.onopen = () => {
        console.log('Weapp SSE connected')
    }

    eventSource.onmessage = (event) => {
        try {
            const data: SSEMessage = JSON.parse(event.data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('Weapp SSE parse error:', e)
        }
    }

    eventSource.addEventListener('progress', (event) => {
        try {
            const data: SSEMessage = JSON.parse((event as MessageEvent).data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('Weapp SSE progress parse error:', e)
        }
    })

    eventSource.addEventListener('complete', (event) => {
        try {
            const data: SSEMessage = JSON.parse((event as MessageEvent).data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('Weapp SSE complete parse error:', e)
        }
    })

    eventSource.addEventListener('failed', (event) => {
        try {
            const data: SSEMessage = JSON.parse((event as MessageEvent).data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('Weapp SSE failed parse error:', e)
        }
    })

    eventSource.onerror = (error) => {
        console.error('Weapp SSE error:', error)
        closeSSE()
    }
}

const closeSSE = () => {
    if (eventSource) {
        eventSource.close()
        eventSource = null
    }
    clearMessageQueue()
}

const earlyLogCheck = (taskKey: string): Promise<boolean> => {
    return new Promise((resolve) => {
        fetchWeappUploadLog(taskKey).then(res => {
            const data = (res.data && res.data.data) ? res.data.data : []
            if (data[0] && data[0].length) {
                const last = data[0][data[0].length - 1]
                if (last.code == 1 && last.percent == 100) {
                    resolve(true)
                    return
                }
                if (last.code == 0) {
                    resolve(true)
                    return
                }
            }
            resolve(false)
        }).catch(() => {
            resolve(false)
        })
    })
}

const handleSSEMessage = (data: SSEMessage) => {
    if (!showDialog.value) return

    if (data.type === 'progress' && data.action) {
        if (!uploadLog.includes(data.action)) {
            if (uploadLog.length === 0) {
                const now = Date.now()
                uploadStartTime.value = now
                uploadDuration.value = 0
                durationTimer && clearInterval(durationTimer)
                durationTimer = setInterval(() => {
                    if (uploadStartTime.value) {
                        uploadDuration.value = Math.floor((Date.now() - uploadStartTime.value) / 1000)
                    }
                }, 1000)

                nextTick(() => {
                    if (terminalRef.value) {
                        terminalRef.value.execute('clear')
                        terminalRef.value.execute('开始上传')
                    }
                })
            }

            queueMessage(`${data.action}`)
            uploadLog.push(data.action)

            if (data.code === '0') {
                errorInfo.value = data.msg || '上传失败'
                timeloading.value = false
                active.value = 'error'
                nextTick(() => {
                    if (terminalRef.value) {
                        terminalRef.value.execute('clear')
                    }
                })
                closeSSE()
                uploadDurationTimerClear()
                if (props.onError) {
                    props.onError()
                }
                return
            }

            if (data.code === '1' && data.percent === 100) {
                nextTick(() => {
                    if (terminalRef.value) {
                        terminalRef.value.execute('clear')
                    }
                })
                queueMessage('上传完成')
                timeloading.value = false
                active.value = 'complete'
                closeSSE()
                uploadDurationTimerClear()
                ElMessage.success('上传成功')
                if (props.onSuccess) {
                    props.onSuccess()
                }
                return
            }
        }
    } else if (data.type === 'complete') {
        getWeappUploadLog(data.task_id)
        queueMessage('上传完成')
        timeloading.value = false
        active.value = 'complete'
        closeSSE()
        uploadDurationTimerClear()
        ElMessage.success('上传成功')
        if (props.onSuccess) {
            props.onSuccess()
        }
    } else if (data.type === 'failed') {
        errorInfo.value = data.msg || '上传失败'
        timeloading.value = false
        active.value = 'error'
        nextTick(() => {
            if (terminalRef.value) {
                terminalRef.value.execute('clear')
            }
        })
        closeSSE()
        uploadDurationTimerClear()
        if (props.onError) {
            props.onError()
        }
    }
}

const uploadDurationTimerClear = () => {
    if (durationTimer) {
        clearInterval(durationTimer)
        durationTimer = null
    }
    uploadStartTime.value = null
}

const dialogClose = (done: () => void) => {
    closeSSE()
    uploadDurationTimerClear()
    if (active.value == 'upload' && cloudBuildTask.value) {
        ElMessageBox.confirm(
            '确定要关闭上传窗口吗？关闭后将停止当前上传任务',
            '提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(() => {
            done()
        }).catch(() => { })
    } else {
        done()
    }
}

const dialogCancel = () => {
    showDialog.value = false
}

const handleComplete = () => {
    showDialog.value = false
    if (props.onSuccess) {
        props.onSuccess()
    }
}

const handleErrorNextStep = () => {
    showDialog.value = false
    if (props.onError) {
        props.onError()
    }
}

const props = defineProps<{
    onSuccess?: () => void
    onError?: () => void
}>()

const open = async (taskKey: string, task?: any) => {
    loading.value = true
    active.value = 'upload'
    uploadLog = []
    clearMessageQueue()
    errorInfo.value = ''
    errorAnalysis.value = {}
    timeloading.value = true
    terminalId.value = Date.now()

    const taskData = task || cloudBuildTask.value

    if (taskData) {
        cloudBuildTask.value = taskData
        if (taskData.status == 0) {
            loading.value = false
            const isCompleted = await earlyLogCheck(taskData.task_key)
            if (isCompleted) {
                closeSSE()
                getWeappUploadLog(taskData.task_key)
                showDialog.value = true
                active.value = 'complete'
                loading.value = false
                uploadDuration.value = taskData.update_time - taskData.create_time
                nextTick(() => {
                    if (terminalRef.value) {
                        terminalRef.value.execute('clear')
                        terminalRef.value.execute('上传完成')
                    }
                })
                return
            }
            showDialog.value = true
            connectSSE(taskData.task_key)
        } else if (taskData.status == 1) {
            active.value = 'complete'
            loading.value = false
            uploadDuration.value = taskData.update_time - taskData.create_time
            showDialog.value = true
            nextTick(() => {
                if (terminalRef.value) {
                    terminalRef.value.execute('clear')
                    terminalRef.value.execute('上传完成')
                }
            })
            if (props.onSuccess) {
                props.onSuccess()
            }
        } else if (taskData.status == -1 || taskData.status == -2) {
            active.value = 'error'
            loading.value = false
            errorInfo.value = taskData.fail_reason || '上传失败'
            showDialog.value = true
            nextTick(() => {
                if (terminalRef.value) {
                    terminalRef.value.execute('clear')
                    terminalRef.value.execute('上传失败')
                }
            })
            if (props.onError) {
                props.onError()
            }
        } else {
            loading.value = false
            showDialog.value = true
            connectSSE(taskData.task_key)
        }
    } else {
        loading.value = false
    }
}

const setTask = (task: any) => {
    cloudBuildTask.value = task
}

onUnmounted(() => {
    closeSSE()
    uploadDurationTimerClear()
})

defineExpose({
    open,
    setTask,
    cloudBuildTask,
    loading,
    showDialog
})
</script>