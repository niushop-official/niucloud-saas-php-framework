import request from '@/utils/request'

// USER_CODE_BEGIN -- qiankun_recovery_order
/**
 * 获取推N返本订单列表
 * @param params
 * @returns
 */
export function getOrderList(params: Record<string, any>) {
    return request.get(`qiankun_recovery/order`, {params})
}

/**
 * 获取推N返本订单详情
 * @param id 推N返本订单id
 * @returns
 */
export function getOrderInfo(id: number) {
    return request.get(`qiankun_recovery/order/${id}`);
}

/**
 * 添加推N返本订单
 * @param params
 * @returns
 */
export function addOrder(params: Record<string, any>) {
    return request.post('qiankun_recovery/order', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑推N返本订单
 * @param id
 * @param params
 * @returns
 */
export function editOrder(params: Record<string, any>) {
    return request.put(`qiankun_recovery/order/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除推N返本订单
 * @param id
 * @returns
 */
export function deleteOrder(id: number) {
    return request.delete(`qiankun_recovery/order/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- qiankun_recovery_order
