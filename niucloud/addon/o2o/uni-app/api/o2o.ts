import request from '@/utils/request'

/***************************************************** 技师列表 ****************************************************/
/**
 * 获取技师列表状态
 * @returns
 *
 */
export function getTechnicianStatus() {
    return request.get(`o2o/technician/order/status`);
}

/**
 * 获取技师订单列表(分页)
 * @returns
 */
export function getTechnicianOrder(params: Record<string, any>) {
    return request.get(`o2o/technician/order`, params)
}

/**
 * 获取技师订单详情
 * @param orderId
 * @returns
 *
 */
export function getTechnicianOrderDetail(orderId: Number) {
    return request.get(`o2o/technician/order/${ orderId }`);
}

/**
 * 订单转单
 */
export function TransferOrder(params: Record<string, any>) {
    return request.post(`o2o/technician/order/transfer`, params, { showErrorMessage: true })
}

/**
 * 订单开始服务
 */
export function beginService(params: Record<string, any>) {
    return request.post(`o2o/technician/order/service`, params, { showErrorMessage: true })
}

/**
 * 订单结束服务
 */
export function finishService(params: Record<string, any>) {
    return request.post(`o2o/technician/order/finish`, params, { showErrorMessage: true })
}

/**
 * 订单添加服务项
 */
export function addService(params: Record<string, any>) {
    return request.post(`o2o/technician/order/item`, params)
}

/**
 * 订单编辑服务项
 */
export function editService(params: Record<string, any>) {
    return request.put(`o2o/technician/order/item`, params)
}

/**
 * 订单删除服务项
 */
export function deleteService(id: number) {
    return request.delete(`o2o/technician/order/item/${ id }`)
}

/**
 * 获取技师统计
 */
export function getStat() {
    return request.get(`o2o/technician/order/stat`);
}
