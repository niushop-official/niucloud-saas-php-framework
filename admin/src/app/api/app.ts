import request from '@/utils/request'

/**
 * 获取app配置
 * @returns
 */
export function getAppConfig() {
    return request.get('channel/app/config')
}

/**
 * 编辑app配置
 * @param params
 * @returns
 */
export function setAppConfig(params: Record<string, any>) {
    return request.put('channel/app/config', params, { showSuccessMessage: true })
}


export function getVersionList(params: Record<string, any>) {
    return request.get('channel/app/version', { params })
}

export function getVersionInfo(id: number) {
    return request.get(`channel/app/version/${id}`)
}

export function getAppPlatform() {
    return request.get(`channel/app/platfrom`)
}

/**
 * 添加版本
 * @param params
 * @returns
 */
export function addVersion(params: Record<string, any>) {
    return request.post('channel/app/version', params, { showSuccessMessage: true })
}

/**
 * 更新版本
 * @param params
 */
export function editVersion(params: Record<string, any>) {
    return request.put(`channel/app/version/${ params.id }`, params, { showSuccessMessage: true })
}

/**
 * 删除版本
 * @param siteId
 */
export function deleteVersion(params: Record<string, any>) {
    return request.delete(`channel/app/version/${ params.id }`)
}

export function getBuildLog(key: string) {
    return request.get(`channel/app/build/log/${ key }`)
}

export function releaseVersion(id: number) {
    return request.put(`channel/app/version/${ id }/release`, {}, { showSuccessMessage: true })
}

export function generateSingCert(params: Record<string, any>) {
    return request.post(`channel/app/generate_sing_cert`, params, { showSuccessMessage: true });
}
