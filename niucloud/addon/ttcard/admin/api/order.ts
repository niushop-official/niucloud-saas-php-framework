import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_order
/**
 * 获取订单管理列表
 * @param params
 * @returns
 */
export function getOrderList(params: Record<string, any>) {
    return request.get(`ttcard/order`, {params})
}

/**
 * 获取订单管理详情
 * @param id 订单管理id
 * @returns
 */
export function getOrderInfo(id: number) {
    return request.get(`ttcard/order/${id}`);
}

/**
 * 添加订单管理
 * @param params
 * @returns
 */
export function addOrder(params: Record<string, any>) {
    return request.post('ttcard/order', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑订单管理
 * @param id
 * @param params
 * @returns
 */
export function editOrder(params: Record<string, any>) {
    return request.put(`ttcard/order/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除订单管理
 * @param id
 * @returns
 */
export function deleteOrder(id: number) {
    return request.delete(`ttcard/order/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithOrdertypeList(params: Record<string,any>){
    return request.get('ttcard/ordertype_all', {params})
}

// USER_CODE_END -- ttcard_order
