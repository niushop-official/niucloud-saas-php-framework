import request from '@/utils/request'

/**
 * 获取礼品卡操作日志列表
 * @param params
 * @returns
 */
export function getGiftcardLogList(params: Record<string, any>) {
    return request.get(`shop_giftcard/log`, { params })
}

/**
 * 获取礼品卡操作日志详情
 * @param id 礼品卡操作日志id
 * @returns
 */
export function getGiftcardLogInfo(id: number) {
    return request.get(`shop_giftcard/log/${ id }`);
}

/**
 * 添加礼品卡操作日志
 * @param params
 * @returns
 */
export function addGiftcardLog(params: Record<string, any>) {
    return request.post('shop_giftcard/log', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑礼品卡操作日志
 * @param params
 * @returns
 */
export function editGiftcardLog(params: Record<string, any>) {
    return request.put(`shop_giftcard/log/${ params.id }`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除礼品卡操作日志
 * @param id
 * @returns
 */
export function deleteGiftcardLog(id: number) {
    return request.delete(`shop_giftcard/log/${ id }`, { showErrorMessage: true, showSuccessMessage: true })
}