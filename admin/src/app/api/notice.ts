import request from '@/utils/request'
import storage from '@/utils/storage'
import envConfig from '@/utils/config'

/***************************************************** 消息管理 ****************************************************/

/**
 * 消息列表
 * @returns
 */
export function getNoticeList(params: any) {
    return request.get('notice/notice', { params })
}

/**
 * 消发送记录
 * @param params
 * @returns
 */
export function getNoticeLog(params: any) {
    return request.get(`notice/log`, { params })
}

/**
 * 获取消息发送记录
 * @param params
 * @returns
 */
export function getBindInfo() {
    return request.get(`notice/bind/info`)
}

/**
 * 取消绑定
 * @param params
 * @returns
 */
export function cancelBind(params: any) {
    return request.post(`notice/bind/cancel`, params)
}

/**
 * 获取微信配置
 * @returns
 */
export function getWechatAuthUrl() {
    return request.get('notice/bind/wechat')
}

/**
 * 获取微信配置
 * @returns
 */
export function getWeappAuthUrl() {
    return request.get('notice/bind/weapp')
}


/**
 * 获取微信配置
 * @returns
 */
export function sendSms(params: Record<string, any>) {
    return request.post('notice/bind/sms/send',params, { showSuccessMessage: true })
}


/**
 * 获取微信配置
 * @returns
 */
export function bindSms(params: Record<string, any>) {
    return request.post('notice/bind/sms/bind',params, { showSuccessMessage: true })
}

/**
 * 消息详情
 * @param key
 * @returns
 */
export function getNoticeInfo(key: string) {
    return request.get(`notice/notice/${ key }`)
}

/**
 * 消息启动与关闭
 * @param params
 * @returns
 */
export function editNoticeStatus(params: Record<string, any>) {
    return request.post(`notice/notice/editstatus`, params, { showSuccessMessage: true })
}

/**
 * 消息修改
 * @param params
 * @returns
 */
export function editNotice(params: Record<string, any>) {
    return request.post(`notice/notice/edit`, params, { showSuccessMessage: true })
}

/**
 * 短信配置列表
 * @returns
 */
export function getSmsList() {
    return request.get('notice/notice/sms')
}

/**
 * 短信配置详情
 * @param sms_type
 * @returns
 */
export function getSmsInfo(sms_type: string) {
    return request.get(`notice/notice/sms/${ sms_type }`)
}

/**
 * 短信配置修改
 * @param params
 */
export function editSms(params: Record<string, any>) {
    return request.put(`notice/notice/sms/${ params.sms_type }`, params, { showSuccessMessage: true })
}

/**
 * 短信发送记录
 * @param params
 */
export function getSmsLog(params: Record<string, any>) {
    return request.get(`notice/sms/log`, { params })
}

/**
 * 获取当前登录子账号
 */
export function getAccountIsLogin() {
    return request.get(`notice/niusms/config`)
}

/**
 * 登录子账号
 * @param params
 */
export function loginAccount(params: Record<string, any>) {
    return request.post(`notice/niusms/account/login`, params, { showSuccessMessage: true })
}

/**
 * 注册子账号
 * @param params
 */
export function registerAccount(params: Record<string, any>) {
    return request.post(`notice/niusms/account/register`, params, { showSuccessMessage: true })
}

/**
 * 获取当前登录子账号信息
 * @param username
 */
export function getAccountInfo(username: string) {
    return request.get(`notice/niusms/account/info/${username}`)
}

/**
 * 获取模版列表
 * @param params
 */
export function getTemplateList(params: Record<string, any>) {
    return request.get(`notice/niusms/template/list/${params.sms_type}/${params.username}`, {})
}

/**
 * 获取签名列表
 * @param username
 * @param params
 */
export function getSignList(username: string, params: Record<string, any>) {
    return request.get(`notice/niusms/sign/list/${username}`, { params })
}

/**
 * 添加签名
 * @param username
 * @param params
 */
export function addSign(username: string, params: Record<string, any>) {
    return request.post(`notice/niusms/sign/report/${username}`, params, { showSuccessMessage: true });
}

/**
 * 删除签名
 * @param username
 * @param params
 */
export function deleteSign(username: string, params: Record<string, any>) {
    return request.post(`notice/niusms/sign/delete/${username}`, params, { showSuccessMessage: true });
}

/**
 * 更新子账号信息
 * @param username
 * @param params
 */
export function editAccount(username: string, params: Record<string, any>) {
    return request.post(`notice/niusms/account/edit/${username}`, params, { showSuccessMessage: true })
}

/**
 * 获取短信发送记录
 * @param username
 * @param params
 */
export function getSmsSendList(username: string, params: Record<string, any>) {
    return request.get(`notice/niusms/account/send_list/${username}`, { params })
}

/**
 * 获取充值列表
 * @param username
 * @param params
 */
export function getSmsOrdersList(username: string, params: Record<string, any>) {
    return request.get(`notice/niusms/order/list/${username}`, { params })
}

/**
 * 获取套餐列表
 */
export function getSmsPackagesList() {
    return request.get(`notice/niusms/packages`)
}

/**
 * 获取图像验证码
 */
export function getSmsCaptcha() {
    return request.get(`notice/niusms/captcha`)
}

/**
 * 获取图像验证码
 */
export function getsiteCaptcha() {
    return request.get(`site/captcha/create`)
}
/**
 * 发送验证码
 * @param params
 */
export function getSmsSend(params: Record<string, any>) {
    return request.post(`notice/niusms/send`, params, { showSuccessMessage: true })
}

/**
 * 添加签名配置项
 */
export function getSmsSignConfig() {
    return request.get(`notice/niusms/sign/report/config`)
}

/**
 * 模版报备配置项
 */
export function getTemplateReportConfig() {
    return request.get(`notice/niusms/template/report/config`)
}

/**
 * 模版报备
 * @param sms_type
 * @param username
 * @param sms_type
 * @param username
 * @param params
 */
export function reportTemplate(sms_type: string, username: string, params: Record<string, any>) {
    return request.post(`notice/niusms/template/report/${sms_type}/${username}`, params, { showSuccessMessage: true })
}

/**
 * 模版详情
 * @param sms_type
 * @param username
 * @param sms_type
 * @param username
 * @param params
 */
export function getreportTemplateInfo(sms_type: string, username: string, params: Record<string, any>) {
    return request.get(`notice/niusms/template/info/${sms_type}/${username}`, { params })
}


/**
 * 充值下单
 * @param username
 * @param params
 */
export function smsOrderCreate(username: string, params: Record<string, any>) {
    return request.post(`notice/niusms/order/create/${username}`, params)
}

/**
 * 获取支付信息
 * @param username
 * @param params
 */
export function getOrderPayInfo(username: string, params: Record<string, any>) {
    return request.get(`notice/niusms/order/pay/${username}`, { params })
}

/**
 * 获取订单详情
 * @param username
 * @param params
 */
export function getOrderInfo(username: string, params: Record<string, any>) {
    return request.get(`notice/niusms/order/info/${username}`, { params })
}

/**
 * 获取支付状态
 * @param username
 * @param params
 */
export function getOrderPayStatus(username: string, params: Record<string, any>) {
    return request.get(`notice/niusms/order/status/${username}`, { params })
}

/**
 * 计算金额
 * @param username
 * @param params
 */
export function calculateOrderPay(username: string, params: Record<string, any>) {
    return request.post(`notice/niusms/order/calculate/${username}`, params)
}

/**
 * 启用牛云短信
 * @param params
 */
export function enableNiusms(params: Record<string, any>) {
    return request.put(`notice/niusms/enable`, params, { showSuccessMessage: true })
}

/**
 * 同步模版状态
 * @param username
 * @param sms_type
 * @param username
 */
export function templateSync(sms_type: string, username: string) {
    return request.get(`notice/niusms/template/sync/${sms_type}/${username}`)
}

/**
 * 重置密码
 * @param username
 * @param params
 */
export function resetPassword(username: string, params: Record<string, any>) {
    return request.post(`notice/niusms/account/reset/password/${username}`, params, { showSuccessMessage: true })
}

/**
 * 清除模版报备
 * @param template_id
 * @param username
 * @param template_id
 */
export function clearTemplate(username: string,template_id: string) {
    return request.delete(`notice/niusms/template/${username}/${template_id}`)
}

/***************************************************** 站内信（消息中心） ****************************************************/

/**
 * 消息分类树
 */
export function getMessageCategory() {
    return request.get('notice/message/category')
}

/**
 * 消息列表
 * @param params
 */
export function getMessageList(params: Record<string, any>) {
    return request.get('notice/message/list', { params })
}

/**
 * 消息详情
 * @param id
 */
export function getMessageInfo(id: number) {
    return request.get(`notice/message/info/${id}`)
}

/**
 * 各分类未读数量
 */
export function getMessageUnreadCount() {
    return request.get('notice/message/unread_count')
}

/**
 * 标记已读（ids 为空表示全部已读）
 * @param ids
 */
export function markMessageRead(ids: number[]) {
    return request.put('notice/message/mark_read', { ids })
}

/**
 * 删除消息
 * @param ids
 */
export function deleteMessage(ids: number[]) {
    return request.delete('notice/message/del', { data: { ids } })
}

/**
 * 构造 SSE 连接地址
 *
 * EventSource 不支持自定义请求头，token 与 site-id 只能通过 query 传递，
 * 后端 Request::adminToken() / Request::adminSiteId() 已支持 query 回退。
 */
export function getMessageStreamUrl(): string {
    const token = storage.get('token') || ''
    const siteId = storage.get('siteId') || 0
    const base = envConfig.VITE_APP_BASE_URL || '/adminapi/'
    const prefix = base.startsWith('http') ? base : `${location.origin}${base.startsWith('/') ? '' : '/'}${base}`
    const path = `${prefix}${prefix.endsWith('/') ? '' : '/'}notice/message/stream`
    const tokenKey = envConfig.VITE_REQUEST_HEADER_TOKEN_KEY || 'token'
    const siteIdKey = envConfig.VITE_REQUEST_HEADER_SITEID_KEY || 'site-id'
    return `${path}?${tokenKey}=${encodeURIComponent(token)}&${siteIdKey}=${encodeURIComponent(String(siteId))}`
}

/**
 * 长轮询监听消息变化（SSE 不可用时的降级通道）
 *
 * 服务端最多挂起 25 秒，因此超时必须大于该值，否则每次都会在前端被掐断。
 * showErrorMessage 置为 false：轮询是后台静默请求，网络抖动不应弹全局错误提示。
 *
 * @param version 上次返回的版本号，首次传空字符串
 * @param signal 用于页面隐藏 / 切换站点时中止在途请求
 */
export function getMessageListen(version: string, signal?: AbortSignal) {
    return request.get('notice/message/listen', {
        params: { version },
        timeout: 35000,
        showErrorMessage: false,
        signal
    })
}
