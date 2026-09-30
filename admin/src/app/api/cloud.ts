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

export function cloudBuild(data = {}) {
    return request.post('niucloud/build', data)
}

export function getCloudBuildTask() {
    return request.get('niucloud/build')
}

export function getCloudBuildLog() {
    return request.get('niucloud/build/log')
}

export function clearCloudBuildTask(type: 'finish' | 'cancel' = 'cancel') {
    return request.post('niucloud/build/clear', { type }, { showErrorMessage: false, showSuccessMessage: false })
}

// 编译前检测已统一到通用校验（sys/check?scene=cloud_build）

export function getBuildCommand() {
    return request.get('niucloud/build/command')
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

/**
 * 编译端口列表（含端口说明与最近一次发版记录）
 */
export function getBuildPorts() {
    return request.get('niucloud/build/ports')
}

/**
 * 发版记录分页
 */
export function getBuildVersionList(params: Record<string, any>) {
    return request.get('niucloud/build/version', { params })
}

/**
 * 发布 / 取消发布
 * @param id 版本记录 id
 * @param releaseStatus 0未发布 / 1已发布
 */
export function setBuildVersionRelease(id: number | string, releaseStatus: number) {
    return request.post('niucloud/build/version/release', { id, release_status: releaseStatus }, { showSuccessMessage: true })
}

/**
 * 删除发版记录
 */
export function delBuildVersions(ids: string | number[]) {
    return request.delete('niucloud/build/version', {
        params: { ids: Array.isArray(ids) ? ids.join(',') : ids },
        showSuccessMessage: true
    })
}
