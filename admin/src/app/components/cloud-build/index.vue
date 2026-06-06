<template>
    <el-dialog v-model="showDialog" :title="t('cloudbuild.title')" width="850px" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="dialogClose">

        <div v-show="active == 'build'" class="h-[50vh]" v-loading="loading">
            <div class="h-[50vh] flex flex-col" v-if="cloudBuildCheck && !cloudBuildTask">
                <!-- <el-scrollbar> -->
                    <div class="bg-[#fff] my-3" v-if="cloudBuildCheck.dir">
                        <div>
                            <p class="pl-[20px] ">{{ t('cloudbuild.dirPermission') }}</p>
                            <div class="mt-[10px] mx-[20px] text-[14px] cursor-pointer text-primary flex items-center justify-between bg-[#EFF6FF] rounded-[4px] p-[10px]" @click="cloudBuildCheckDirFn">
                                <div class="flex items-center">
                                    <el-icon :size="17"><QuestionFilled /></el-icon>
                                    <span class="ml-[5px] leading-[20px]">编译权限错误，查看解决方案</span></div>
                                <div class="border-[1px] border-primary rounded-[3px] w-[72px] h-[26px] leading-[25px] text-center">立即查看</div>
                            </div>
                        </div>

                        <div class="px-[20px] pt-[10px] text-[14px] el-table">
                            <el-row class="py-[10px] items table-head-bg pl-[15px] mb-[10px]">
                                <el-col :span="18">
                                    <span>{{ t('cloudbuild.path') }}</span>
                                </el-col>
                                <el-col :span="3">
                                    <span>{{ t('cloudbuild.demand') }}</span>
                                </el-col>
                                <el-col :span="3">
                                    <span>{{ t('status') }}</span>
                                </el-col>
                            </el-row>
                            <el-scrollbar style="height: calc(300px); overflow: auto">
                                <el-row class="pb-[10px] items pl-[15px]" v-for="item in cloudBuildCheck.dir.is_readable">
                                    <el-col :span="18">
                                        <span>{{ item.dir }}</span>
                                    </el-col>
                                    <el-col :span="3">
                                        <span>{{ t('cloudbuild.readable') }}</span>
                                    </el-col>
                                    <el-col :span="3">
                                        <span v-if="item.status"><el-icon color="green"><Select /></el-icon></span>
                                        <span v-else>
                                                <el-icon color="red">
                                                    <CloseBold />
                                                </el-icon>
                                            </span>
                                    </el-col>
                                </el-row>
                                <el-row class="pb-[10px] items pl-[15px]" v-for="item in cloudBuildCheck.dir.is_write">
                                    <el-col :span="18">
                                        <span>{{ item.dir }}</span>
                                    </el-col>
                                    <el-col :span="3">
                                        <span>{{ t('cloudbuild.write') }}</span>
                                    </el-col>
                                    <el-col :span="3" >
                                        <span v-if="item.status"><el-icon color="green"><Select /></el-icon></span>
                                        <span v-else>
                                            <el-icon color="red">
                                                <CloseBold />
                                            </el-icon>
                                        </span>
                                    </el-col>
                                </el-row>
                            </el-scrollbar>
                        </div>
                    </div>
                <!-- </el-scrollbar> -->
            </div>
            <div class="h-[45vh]" v-show="cloudBuildTask">
                <terminal ref="terminalRef" :name="`cloud-build-${terminalId}`" context="" :init-log="null" :show-header="false" :show-log-time="true" @exec-cmd="onExecCmd"/>
            </div>
            <div class="flex justify-end mt-[20px]" v-show="cloudBuildTask">
                <el-button @click="dialogCancel()" class="!w-[90px]">取消</el-button>
                <el-button type="primary" :loading="timeloading" class="!w-[140px]" v-if="!errorInfo">已用时 {{ formattedDuration }}</el-button>
                <el-button type="primary" @click="active = 'error'" v-if="errorInfo">下一步</el-button>
            </div>
        </div>
        <div v-show="active == 'error'">
            <div class="h-[50vh] flex flex-col">
                <div class="flex-1 h-0 flex justify-center items-center flex-col">
                    <el-result icon="error" :title="t('编译失败')">
                        <template #icon>
                            <img src="@/app/assets/images/error_icon.png" alt="">
                        </template>
                        <template #extra>
                            <el-scrollbar class="max-h-[150px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]" v-if="errorInfo">
                                {{errorInfo}}
                            </el-scrollbar>
                            <el-alert :closable="false" class="!mb-[15px] !w-full" v-if="errorAnalysis.analysis" type="warning">
                                <template #default>
                                    <div class="text-left">
                                        错误分析：{{ errorAnalysis.analysis }}
                                    </div>
                                </template>
                            </el-alert>
                            <el-button @click="handleReturn" class="!w-[90px]">错误信息</el-button>
                            <el-button @click="againBuild" type="primary" plain class="!w-[90px]" v-if="errorAnalysis.error_addon">重新编译</el-button>
                            <el-button @click="showDialog=false" type="primary" class="!w-[90px]">完成</el-button>
                        </template>
                    </el-result>
                </div>
            </div>
        </div>
        <div v-show="active == 'complete'">
            <div class="h-[50vh] flex flex-col">
                <div class="flex-1 h-0 flex justify-center items-center flex-col">
                    <el-result icon="success" :title="t('cloudbuild.cloudbuildSuccess')"  :sub-title="`编译耗时${formattedDuration}，成功编译完成。`">
                        <template #icon>
                            <img src="@/app/assets/images/success_icon.png" alt="">
                        </template>
                        <template #extra>
                            <el-button @click="handleReturn" class="!w-[90px]">返回</el-button>
                            <el-button @click="showDialog=false" type="primary" class="!w-[90px]">完成</el-button>
                        </template>
                    </el-result>
                </div>
            </div>
        </div>
        <div v-show="active == 'again_build'">
            <div class="h-[50vh] flex flex-col">
                <div class="flex-1 h-0 flex items-center flex-col">
                    <el-table
                        ref="tableRef"
                        :data="installedAddonList"
                        row-key="key"
                        size="large"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55" />
                        <el-table-column label="应用信息" align="left" width="300">
                            <template #default="{ row }">
                                <div class="flex items-center cursor-pointer relative left-[-10px]">
                                    <el-image class="w-[54px] h-[54px] rounded-[5px]" :src="row.icon" fit="contain">
                                        <template #error>
                                            <div class="flex items-center w-full h-full rounded-[5px]">
                                                <img class="max-w-full max-h-full" src="@/app/assets/images/icon-addon-one.png" alt="" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <div class="flex-1 w-0 flex flex-col justify-center pl-[20px] font-500 text-[13px]">
                                        <div class="w-[236px] truncate leading-[18px]">{{ row.title }}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="编译结果" align="left">
                            <template #default="{ row }">
                                <div class="flex items-center" v-if="errorAnalysis.error_addon && errorAnalysis.error_addon != row.key">
                                    <el-icon class="text-success mr-1"><SuccessFilled /></el-icon> 编译成功
                                </div>
                                <div v-else class="flex items-center">
                                    <el-icon class="text-error mr-1"><WarningFilled /></el-icon> 编译失败，请排除该插件后重新进行编译
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="flex justify-end mt-[20px]">
                    <el-button @click="dialogCancel()" class="!w-[90px]">取消</el-button>
                    <el-button @click="active = 'error'" plain type="primary" class="!w-[90px]">上一步</el-button>
                    <el-button type="primary" @click="againBuild" :loading="loading" class="!w-[100px]">开始编译</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { t } from '@/lang'
import { getCloudBuildLog, getCloudBuildTask, cloudBuild, clearCloudBuildTask, preBuildCheck, getCloudBuildQueuePosition, getCloudBuildSseUrl, CLOUD_COMPILE_BASE_URL, startServerDownload, getSseBuildLog } from '@/app/api/cloud'
import { getInstalledAddonList } from '@/app/api/addon'
import { Terminal, TerminalFlash } from 'vue-web-terminal'
import 'vue-web-terminal/lib/theme/dark.css'
import { AnyObject } from '@/types/global'
import {ElNotification, ElMessageBox, ElMessage} from 'element-plus'

const showDialog = ref<boolean>(false)
const terminalId = ref(Date.now())
const cloudBuildTask = ref<null | AnyObject>(null)
const active = ref('build')
const cloudBuildCheck = ref<null | AnyObject>(null)
const loading = ref(false)
const terminalRef = ref(null)
const selectAddon = ref([])
const installedAddonList = ref([])
const tableRef = ref(null)

getInstalledAddonList().then(({ data }) => {
    installedAddonList.value = Object.values(data)
})

const handleSelectionChange = (rows) => {
    selectAddon.value = rows.map(row => {
        return row.key
    })
}

let cloudBuildLog = []
let eventSource: EventSource | null = null

interface SSEMessage {
    type: string
    task_id?: string
    percent?: number
    action?: string
    msg?: string
    code?: string
    time?: string
    download_url?: string
    download_percent?: number
    downloaded_bytes?: number
    total_bytes?: number
    authorize_code?: string
    timestamp?: string
}

const connectSSE = (taskId: string) => {
    if (eventSource) {
        eventSource.close()
    }

    const url = getCloudBuildSseUrl(taskId)
    eventSource = new EventSource(url)

    eventSource.onopen = () => {
        console.log('SSE connected')
    }

    eventSource.onmessage = (event) => {
        try {
            const data: SSEMessage = JSON.parse(event.data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('SSE parse error:', e)
        }
    }

    eventSource.addEventListener('progress', (event) => {
        try {
            const data: SSEMessage = JSON.parse((event as MessageEvent).data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('SSE progress parse error:', e)
        }
    })

    eventSource.addEventListener('complete', (event) => {
        try {
            const data: SSEMessage = JSON.parse((event as MessageEvent).data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('SSE complete parse error:', e)
        }
    })

    eventSource.addEventListener('failed', (event) => {
        try {
            const data: SSEMessage = JSON.parse((event as MessageEvent).data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('SSE failed parse error:', e)
        }
    })

    eventSource.addEventListener('heartbeat', () => {
        console.log('SSE heartbeat')
    })

    eventSource.addEventListener('download_start', (event) => {
        try {
            const data: SSEMessage = JSON.parse((event as MessageEvent).data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('SSE download_start parse error:', e)
        }
    })

    eventSource.addEventListener('download_progress', (event) => {
        try {
            const data: SSEMessage = JSON.parse((event as MessageEvent).data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('SSE download_progress parse error:', e)
        }
    })

    eventSource.addEventListener('download_complete', (event) => {
        try {
            const data: SSEMessage = JSON.parse((event as MessageEvent).data)
            handleSSEMessage(data)
        } catch (e) {
            console.error('SSE download_complete parse error:', e)
        }
    })

    eventSource.onerror = (error) => {
        console.error('SSE error:', error)
        setTimeout(() => {
            if (showDialog.value && cloudBuildTask.value) {
                getCloudBuildLogFn()
            }
        }, 5000)
    }
}

const handleSSEMessage = (data: SSEMessage) => {
    if (!showDialog.value) return

    if (data.type === 'progress' && data.action) {
        if (!cloudBuildLog.includes(data.action)) {
            if (cloudBuildLog.length === 0) {
                const storedTime = localStorage.getItem('cloud_build_start_time')
                if (storedTime) {
                    buildStartTime.value = Number(storedTime)
                } else {
                    const now = Date.now()
                    buildStartTime.value = now
                    localStorage.setItem('cloud_build_start_time', String(now))
                }

                buildDuration.value = Math.floor((Date.now() - buildStartTime.value) / 1000)
                buildTimer && clearInterval(buildTimer)
                buildTimer = setInterval(() => {
                    if (buildStartTime.value) {
                        buildDuration.value = Math.floor((Date.now() - buildStartTime.value) / 1000)
                    }
                }, 1000)
                terminalRef.value.execute('clear')
                terminalRef.value.execute('开始编译')
            }

            if (data.action.indexOf('云编译任务正在排队') != -1) {
                cloudQueue = data.action
                cloudBuildLog.push(data.action)
                return
            } else {
                cloudQueue = null
            }

            terminalRef.value.pushMessage({ content: `${data.action}` })
            cloudBuildLog.push(data.action)

            if (data.code === '0' && data.msg) {
                errorAnalysis.value = {}
                errorInfo.value = data.msg
                terminalRef.value.pushMessage({ content: data.msg, class: 'error' })
                timeloading.value = false
                active.value = 'error'
                terminalRef.value.execute('clear')
                clearCloudBuildTask()
                buildTimer && clearInterval(buildTimer)
                buildTimer = null
                localStorage.removeItem('cloud_build_start_time')
                localStorage.removeItem('cloud_build_task')
                closeSSE()
            }
        }
    } else if (data.type === 'complete') {
        terminalRef.value.pushMessage({ content: '编译完成' })
    } else if (data.type === 'failed') {
        errorInfo.value = data.msg || '编译失败'
        active.value = 'error'
        terminalRef.value.execute('clear')
        clearCloudBuildTask()
        buildTimer && clearInterval(buildTimer)
        buildTimer = null
        localStorage.removeItem('cloud_build_start_time')
        localStorage.removeItem('cloud_build_task')
        closeSSE()
    } else if (data.type === 'download_start') {
        if (data.action && !cloudBuildLog.includes(data.action)) {
            terminalRef.value.pushMessage({ content: data.action })
            cloudBuildLog.push(data.action)
        }
    } else if (data.type === 'download_progress') {
        const percent = data.download_percent || 0
        const downloaded = data.downloaded_bytes || 0
        const total = data.total_bytes || 0
        const downloadedMB = (downloaded / 1024 / 1024).toFixed(2)
        const totalMB = (total / 1024 / 1024).toFixed(2)
        terminalRef.value.pushMessage({ content: `下载进度: ${percent}% (${downloadedMB}MB / ${totalMB}MB)` })
    } else if (data.type === 'download_complete') {
        if (data.action && !cloudBuildLog.includes(data.action)) {
            terminalRef.value.pushMessage({ content: data.action })
            cloudBuildLog.push(data.action)
        }

        if (data.download_url && data.task_id) {
            startServerDownloadFn(data.task_id, data.download_url, data.authorize_code, data.timestamp)
        }
    }
}

let downloadPollingTimer: number | null = null

const startServerDownloadFn = async (taskId: string, downloadUrl: string, authorizeCode: string, timestamp: string) => {
    try {
        terminalRef.value.pushMessage({ content: '正在启动后台下载...' })

        const parseUrl = new URL(downloadUrl, CLOUD_COMPILE_BASE_URL)
        const authorize_code = parseUrl.searchParams.get('authorize_code') || authorizeCode || ''
        const ts = parseUrl.searchParams.get('timestamp') || timestamp || ''

        await startServerDownload(taskId, downloadUrl, authorize_code, ts)

        downloadPollingTimer = setTimeout(async () => {
            if (!downloadPollingTimer) return

            try {
                const res = await getSseBuildLog(taskId)
                if (res.code === 1) {
                    const { status, percent, msg } = res.data

                    if (status === 'downloading') {
                        terminalRef.value.pushMessage({ content: `下载进度: ${percent}% - ${msg}` })
                    } else if (status === 'unzipping') {
                        terminalRef.value.pushMessage({ content: msg })
                    } else if (status === 'completed') {
                        terminalRef.value.pushMessage({ content: '部署完成!' })
                        downloadPollingTimer && clearInterval(downloadPollingTimer)
                        downloadPollingTimer = null
                        active.value = 'complete'
                        timeloading.value = false
                        terminalRef.value.execute('clear')
                        clearCloudBuildTask()
                        buildTimer && clearInterval(buildTimer)
                        buildTimer = null
                        localStorage.removeItem('cloud_build_start_time')
                        localStorage.removeItem('cloud_build_task')
                        closeSSE()
                        ElMessage.success('编译部署完成')
                    } else if (status === 'error') {
                        terminalRef.value.pushMessage({ content: `错误: ${msg}`, class: 'error' })
                        downloadPollingTimer && clearInterval(downloadPollingTimer)
                        downloadPollingTimer = null
                        errorInfo.value = msg
                        active.value = 'error'
                        timeloading.value = false
                        clearCloudBuildTask()
                        closeSSE()
                    }
                } else {
                    terminalRef.value.pushMessage({ content: '获取下载进度失败', class: 'error' })
                    downloadPollingTimer && clearInterval(downloadPollingTimer)
                    downloadPollingTimer = null
                }
            } catch (e) {
                console.error('Polling error:', e)
            }
        }, 2000)
    } catch (error) {
        console.error('启动后台下载失败:', error)
        terminalRef.value.pushMessage({ content: '启动后台下载失败', class: 'error' })
        errorInfo.value = '启动后台下载失败'
        active.value = 'error'
    }
}

const closeSSE = () => {
    if (eventSource) {
        eventSource.close()
        eventSource = null
    }
    if (downloadPollingTimer) {
        clearInterval(downloadPollingTimer)
        downloadPollingTimer = null
    }
}

const buildStartTime = ref<number | null>(null)
const buildDuration = ref<number>(0)
let buildTimer: number | null = null
const formattedDuration = computed(() => {
    const seconds = buildDuration.value
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}分${secs}秒` : `${secs}秒`
})

/**
 * 查询升级任务
 */
const getCloudBuildTaskFn = () => {
    getCloudBuildTask().then(({ data }) => {
        if (!data) return

        cloudBuildTask.value = data

        if (!showDialog.value) {
            // showElNotification()
            localStorage.setItem('cloud_build_task', 'true')
        }
    }).catch()
}
getCloudBuildTaskFn()
const errorInfo = ref('')
const timeloading = ref(false)
const errorAnalysis = ref({})
const getCloudBuildLogFn = () => {
    timeloading.value = true
    getCloudBuildLog().then(res => {
        if (!res.data) {
            if (showDialog.value && cloudBuildLog.length) {
                active.value = 'complete'
                timeloading.value = false
                terminalRef.value.execute('clear')
                clearCloudBuildTask()
                buildTimer && clearInterval(buildTimer) // 清除计时器
                localStorage.removeItem('cloud_build_start_time')
                localStorage.removeItem('cloud_build_task')
            }
            notificationEl && notificationEl.close()
            // cloudBuildTask.value = null
            return
        }

        const data = res.data.data ?? []
        let error = ''

        if (data[0] && data[0].length && showDialog.value) {
            if (cloudBuildLog.length == 0) {
                const storedTime = localStorage.getItem('cloud_build_start_time')
                if (storedTime) {
                    buildStartTime.value = Number(storedTime)
                } else {
                    const now = Date.now()
                    buildStartTime.value = now
                    localStorage.setItem('cloud_build_start_time', String(now))
                }

                buildDuration.value = Math.floor((Date.now() - buildStartTime.value) / 1000)
                buildTimer && clearInterval(buildTimer)
                buildTimer = setInterval(() => {
                    if (buildStartTime.value) {
                        buildDuration.value = Math.floor((Date.now() - buildStartTime.value) / 1000)
                    }
                }, 1000)
                terminalRef.value.execute('clear')
                terminalRef.value.execute('开始编译')
            }

            data[0].forEach(item => {
                if (!cloudBuildLog.includes(item.action)) {
                    if (item.action.indexOf('云编译任务正在排队') != -1) {
                        cloudQueue = item.action
                        cloudBuildLog.push(item.action)
                        return
                    } else {
                        cloudQueue = null
                    }
                    terminalRef.value.pushMessage({ content: `${item.action}` })
                    cloudBuildLog.push(item.action)

                    if (item.code === '0') {
                        errorAnalysis.value = res.data.error_analysis || {}
                        error = item.msg
                        terminalRef.value.pushMessage({ content: item.msg, class: 'error' })
                        timeloading.value = false
                        active.value = 'error'
                        terminalRef.value.execute('clear')
                        clearCloudBuildTask()
                        errorInfo.value = item.msg
                        // 停止计时器
                        if (buildTimer) {
                            clearInterval(buildTimer)
                            buildTimer = null
                        }

                        // 保证 duration 也被最后更新一次
                        if (buildStartTime.value) {
                            buildDuration.value = Math.floor((Date.now() - buildStartTime.value) / 1000)
                        }
                        localStorage.removeItem('cloud_build_start_time')
                        localStorage.removeItem('cloud_build_task')
                    }
                }
            })
        }

        if (error) return

        setTimeout(() => {
            getCloudBuildLogFn()
        }, 5000)
    }).catch()
}

const closeType = ref('normal')
const handleReturn = () => {
    active.value = 'build'
    closeType.value = 'success'
}

const notificationEl : any = null
/**
 * 升级中任务提示
 */
// const showElNotification = () => {
//     notificationEl = ElNotification.success({
//         title: t('warning'),
//         dangerouslyUseHTMLString: true,
//         message: h('div', {}, [
//             t('cloudbuild.executingTips'),
//             h('span', { class: 'text-primary cursor-pointer', onClick: elNotificationClick }, [t('cloudbuild.clickView')])
//         ]),
//         duration: 0,
//         showClose: false
//     })
// }

const elNotificationClick = () => {
    showDialog.value = true
    active.value = 'build'
    getCloudBuildLogFn()
}

const open = async () => {
    loading.value = true
    active.value = 'build'
    closeType.value = 'normal'
    cloudBuildLog = []

    if (cloudBuildTask.value) {
        showDialog.value = true
        loading.value = false
        const taskId = (cloudBuildTask.value as any).task_id
        if (taskId) {
            connectSSE(taskId)
        } else {
            getCloudBuildLogFn()
        }
        return
    }

    preBuildCheck().then(async ({ data }) => {
        if (data.is_pass) {
            cloudBuild().then(({ data }) => {
                loading.value = false
                cloudBuildTask.value = data
                showDialog.value = true
                const taskId = data.task_id
                if (taskId) {
                    connectSSE(taskId)
                } else {
                    getCloudBuildLogFn()
                }
            }).catch(() => {
                showDialog.value = false
                loading.value = false
            })
        } else {
            loading.value = false
            cloudBuildCheck.value = data
            showDialog.value = true
        }
    }).catch((e) => {
        loading.value = false
        showDialog.value = false
        if (e.code && e.code == 601) {
            ElMessageBox.confirm(
                '云编译服务未启动，必须在启动后进行云编译！',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '重新检测',
                    cancelButtonText: '查看操作手册',
                    type: 'warning'
                }
            ).then(() => {
                open()
            }).catch((action) => {
                action == 'cancel' && window.open('https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html', '_blank')
            })
        } else {
            ElMessage({ message: e.msg, type: 'error' })
        }
    })
}

const againBuild = () => {
    if (active.value != 'again_build') {
        active.value = 'again_build'
        selectAddon.value = installedAddonList.value.map((item) => {
            tableRef.value.toggleRowSelection(item, true)
            return item.key
        })
        return
    }
    loading.value = true
    cloudBuildLog = []
    cloudBuild().then(({ data }) => {
        active.value = 'build'
        loading.value = false
        cloudBuildTask.value = data
        showDialog.value = true
        localStorage.removeItem('cloud_build_start_time')
        const taskId = data.task_id
        if (taskId) {
            connectSSE(taskId)
        } else {
            getCloudBuildLogFn()
        }
    }).catch(() => {
        showDialog.value = false
        loading.value = false
    })
}

const selectable = (row: any) => {
    return selectAddon.value.includes(row.key)
}

/**
 * 升级进度动画
 */
let flashInterval: null | number = null
let terminalFlash = null
let cloudQueue = null
const onExecCmd = (key, command, success, failed, name) => {
    if (command == '开始编译') {
        terminalFlash = new TerminalFlash()
        success(terminalFlash)
        const frames = makeIterator(['/', '——', '\\', '|'])
        flashInterval = setInterval(() => {
            if (cloudQueue) {
                terminalFlash.flush(cloudQueue + '<br>> ' + frames.next().value)
            } else {
                terminalFlash.flush('> ' + frames.next().value)
            }
        }, 150)
    }
}

const makeIterator = (array: string[]) => {
    let nextIndex = 0
    return {
        next () {
            if ((nextIndex + 1) == array.length) {
                nextIndex = 0
            }
            return { value: array[nextIndex++] }
        }
    }
}

const dialogClose = (done: () => {}) => {
    closeSSE()
    if (active.value == 'build' && cloudBuildTask.value && closeType.value == 'normal') {
        ElMessageBox.confirm(
            t('cloudbuild.showDialogCloseTips'),
            t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            terminalRef.value.execute('clear')
            localStorage.removeItem('cloud_build_start_time')
            localStorage.removeItem('cloud_build_task')
            done()
            buildTimer && clearInterval(buildTimer)
            buildTimer = null
            buildStartTime.value = null
            buildDuration.value = 0
        }).catch(() => { })
    } else {
        done()
    }
}

const dialogCancel = () => {
    closeSSE()
    if (active.value == 'build' && cloudBuildTask.value && closeType.value == 'normal') {
        ElMessageBox.confirm(
            t('cloudbuild.showDialogCloseTips'),
            t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            terminalRef.value.execute('clear')
            localStorage.removeItem('cloud_build_start_time')
            localStorage.removeItem('cloud_build_task')
            buildTimer && clearInterval(buildTimer)
            buildTimer = null
            buildStartTime.value = null
            buildDuration.value = 0
            showDialog.value = false
        }).catch(() => { })
    } else {
        showDialog.value = false
    }
}

const cloudBuildCheckDirFn = () => {
    window.open('https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-wu-3001-sheng-7ea7-yun-bian-yi-mu-lu-du-xie-quan-xian-zhuang-tai-bu-tong-guo-ru-he-chu-li.html')
}

watch(() => showDialog.value, () => {
    if (!showDialog.value) {
        closeSSE()
        cloudBuildTask.value = null
        active.value = 'build'
        cloudBuildLog = []
        flashInterval && clearInterval(flashInterval)
        terminalFlash && terminalFlash.finish()
        buildTimer && clearInterval(buildTimer)
        buildStartTime.value = null
        buildDuration.value = 0
        clearCloudBuildTask()
    }
})

defineExpose({
    open,
    cloudBuildTask,
    loading,
    elNotificationClick,
    getCloudBuildTaskFn
})
</script>

<style lang="scss" scoped>
.table-head-bg {
    background-color: var(--el-table-header-bg-color);
}
:deep(.terminal .t-log-box span) {
    white-space: pre-wrap;
}
:deep(.el-result__icon) {
  color: unset !important; // 清除默认颜色
}
:deep(.el-dialog__title){
    font-size: 20px;
    font-weight: bold;
}
:deep(.el-result__title p){
    font-size: 25px;
    color: #1D1F3A;
    font-weight: 500;
}
:deep(.el-result__subtitle p){
    font-size: 15px;
    color: #4F516D;
    font-weight: 500;
    word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
}
:deep(.el-result){
    margin-top: -80px !important;
}
</style>
