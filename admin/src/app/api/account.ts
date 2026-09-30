import request from '@/utils/request'

/**
 * 获取官网内嵌页地址（登录页 / 授权页）
 * @param params mode: login | authorize | switch; origin: 父页面 origin
 */
export function getEmbedUrl(params: Record<string, any>) {
    return request.get('niucloud/account/embed_url', params, { showErrorMessage: false })
}

/**
 * 获取官网账号与当前授权信息
 */
export function getAccountInfo() {
    return request.get('niucloud/account/info', {}, { showErrorMessage: false })
}

/**
 * 选用授权（仅保存官网嵌入页所选授权的授权码，不做绑定）
 * 成功提示由页面统一给出，这里关掉请求层的提示，避免弹两次
 */
export function selectAuthorization(params: Record<string, any>) {
    return request.post('niucloud/account/select', params, { showSuccessMessage: false })
}

/**
 * 绑定授权（官网嵌入页回传授权凭据后调用；复用现有授权校验链路）
 */
export function bindAuthorization(params: Record<string, any>) {
    return request.post('niucloud/account/bind', params, { showSuccessMessage: true })
}

/**
 * 保存官网账号登录态（内嵌页登录/会话回传，用于下次进入免登录）
 * 令牌只落到服务端配置，前端不再持有
 */
export function saveAccountToken(params: Record<string, any>) {
    return request.post('niucloud/account/token', params, { showSuccessMessage: false })
}

/**
 * 退出官网账号会话（不解除本地授权）
 */
export function logoutAccount() {
    return request.post('niucloud/account/logout', {}, { showSuccessMessage: true })
}

/**
 * 同步当前授权状态
 */
export function syncAccountState() {
    return request.get('niucloud/account/sync_state', {}, { showSuccessMessage: true })
}
