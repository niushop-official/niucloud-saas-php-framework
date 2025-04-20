import request from '@/utils/request'


/***************************************************** 智能对话配置接口 ****************************************************/

/**
 * 获取接口配置
 * @param params
 * @returns
 */
export function getConfig() {
    return request.get(`tk_vip/config/getconfig`)
}
export function getRealConfig() {
    return request.get(`tk_vip/config/getrealconfig`)
}
/**
 * 设置配置
 * @param params
 * @returns
 */
export function setConfig(params: Record<string, any>) {
    return request.post(`tk_vip/config/setconfig`, params, { showErrorMessage: true, showSuccessMessage: true })
}
export function setRealConfig(params: Record<string, any>) {
    return request.post(`tk_vip/config/setrealconfig`, params, { showErrorMessage: true, showSuccessMessage: true })
}
