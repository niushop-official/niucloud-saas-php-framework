import request from '@/utils/request'

/**
 * 云编译
 */
export function cloudBuild(params: Record<string, any> = {}) {
    return request.post('niucloud/build', params)
}

/**
 * 获取云编译任务
 */
export function getCloudBuildTask() {
    return request.get('niucloud/build')
}

/**
 * 云编译前检测
 */
export function getCloudBuildLog() {
    return request.get('niucloud/build/log')
}

/**
 * 清除
 */
export function clearCloudBuildTask() {
    return request.post('niucloud/build/clear')
}

/**
 * 云编译前检测
 */
export function preBuildCheck() {
    return request.get('niucloud/build/check', { showErrorMessage: false })
}
