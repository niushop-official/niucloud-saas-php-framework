import request from '@/utils/request'

/**
 * 获取微信配置
 * @returns
 */
export function getConfig() {
    return request.get('wxoplatform/config')
}

/**
 * 微信配置所需的静态信息
 */
export function getStatic() {
    return request.get('wxoplatform/static');
}

/**
 * 编辑微信配置
 * @param params
 * @returns
 */
export function editConfig(params: Record<string, any>) {
    return request.put('wxoplatform/config', params, { showSuccessMessage: true })
}

/**
 * 获取授权url
 */
export function getAuthorizationUrl() {
    return request.get('wxoplatform/authorizationUrl');
}

/**
 * 获取授权结果
 */
export function getAuthorizationResult(params: Record<string, any>) {
    return request.get('wxoplatform/authorization', { params, showErrorMessage: false });
}

/**
 * 小程序代码提交
 * @returns
 */
export function weappCommit(params: Record<string, any>) {
    return request.post('wxoplatform/weapp/version/commit', params, { showSuccessMessage: true })
}

/**
 * 获取提交记录
 */
export function getWeappCommitRecord(params: Record<string, any>) {
    return request.get('wxoplatform/weapp/commit', { params })
}

/**
 * 获取最后一次提交记录
 */
export function getWeappLastCommitRecord() {
    return request.get('wxoplatform/weapp/commit/last')
}

/**
 * 小程序代码提交
 * @returns
 */
export function siteWeappCommit() {
    return request.post('wxoplatform/site/weapp/commit', {}, { showSuccessMessage: true })
}

/**
 * 按站点套餐获取提交记录
 */
export function getSiteGroupCommitRecord(params: Record<string, any>) {
    return request.get('wxoplatform/sitegroup/commit', { params })
}

/**
 * 撤回代码审核
 * @param params
 */
export function undoAudit(params: Record<string, any>) {
    return request.put('wxoplatform/undo/weappaudit', params, { showSuccessMessage: true })
}


export function syncSiteWeapp(params: Record<string, any>) {
    return request.post('wxoplatform/async/siteweapp', params, { showSuccessMessage: true })
}

/**
 * 获取授权记录
 * @param params
 */
export function getAuthRecord(params: Record<string, any>) {
    return request.get('wxoplatform/authorization/record', { params })
}
