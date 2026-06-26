import axios from 'axios'
import request from '@/utils/request'
import storage from '@/utils/storage'

export const CLOUD_COMPILE_BASE_URL =  location.protocol + '//go.site.niucloud.com'

function createCloudCompileRequest() {
    const instance = axios.create({
        baseURL: CLOUD_COMPILE_BASE_URL,
        timeout: 0,
        headers: {
            'lang': storage.get('lang') ?? 'zh-cn'
        }
    })

    instance.interceptors.request.use(
        (config) => {
            const token = storage.get('token')
            if (token) {
                config.headers['token'] = token
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )

    instance.interceptors.response.use(
        (response) => {
            return response.data
        },
        (err) => {
            return Promise.reject(err)
        }
    )

    return instance
}

const cloudCompileRequest = createCloudCompileRequest()

export function cloudBuild() {
    return request.post('niucloud/build')
}

export function getCloudBuildTask() {
    return request.get('niucloud/build')
}

export function getCloudBuildLog() {
    return request.get('niucloud/build/log')
}

export function clearCloudBuildTask() {
    return request.post('niucloud/build/clear', {}, { showErrorMessage: false, showSuccessMessage: false })
}

export function preBuildCheck() {
    return request.get('niucloud/build/check')
}

export function getCloudBuildQueuePosition(taskId: string) {
    return cloudCompileRequest.get('/cloud/queue_position', { params: { task_id: taskId } })
}

export function getCloudBuildSseUrl(taskId: string): string {
    return `${CLOUD_COMPILE_BASE_URL}/cloud/sse?task_id=${taskId}`
}

export function getCloudCompileLocalUrl() {
    return request.get('niucloud/build/get_local_url')
}

export function setCloudCompileLocalUrl(url: string) {
    return request.post('niucloud/build/set_local_url', { url })
}

export function startServerDownload(taskId: string, downloadUrl: string, authorizeCode: string, timestamp: string) {
    return request.post('niucloud/build/start_server_download', {
        task_id: taskId,
        download_url: downloadUrl,
        authorize_code: authorizeCode,
        timestamp
    })
}

export function getSseBuildLog(taskId: string) {
    return request.get('niucloud/build/get_sse_build_log', { params: { task_id: taskId } })
}
