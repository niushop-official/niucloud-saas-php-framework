import request from '@/utils/request'



export function getOrderStatusList(params: Record<string, any>) {
    return request.get(`huodong/order/status`, {params})
}

// USER_CODE_BEGIN -- huodong_order
/**
 * 获取报名记录列表
 * @param params
 * @returns
 */
export function getOrderList(params: Record<string, any>) {
    return request.get(`huodong/order`, {params})
}

/**
 * 获取报名记录详情
 * @param order_id 报名记录order_id
 * @returns
 */
export function getOrderInfo(order_id: number) {
    return request.get(`huodong/order/${order_id}`);
}

/**
 * 添加报名记录
 * @param params
 * @returns
 */
export function addOrder(params: Record<string, any>) {
    return request.post('huodong/order', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑报名记录
 * @param order_id
 * @param params
 * @returns
 */
export function editOrder(params: Record<string, any>) {
    return request.put(`huodong/order/${params.order_id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}
export function hexiaoOrder(params: Record<string, any>) {
    return request.post(`huodong/order/hexiao`, params, { showErrorMessage: true, showSuccessMessage: true })
}
/**
 * 删除报名记录
 * @param order_id
 * @returns
 */
export function deleteOrder(order_id: number) {
    return request.delete(`huodong/order/${order_id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('huodong/member_all', {params})
}

// USER_CODE_END -- huodong_order
