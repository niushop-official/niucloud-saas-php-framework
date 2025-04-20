import request from '@/utils/request'

/***************************************************** 预约 ****************************************************/
/**
 * 预约设置
 * @returns
 */
export function getReserveConfig() {
    return request.get('/o2o/goods/reserve')
}

/**
 * 编辑预约设置
 * @param params
 * @returns
 */
export function setReserveConfig(params: Record<string, any>) {
    return request.post(`/o2o/goods/reserve`, params, { showErrorMessage: true, showSuccessMessage: true })
}
