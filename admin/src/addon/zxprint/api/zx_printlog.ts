import request from '@/utils/request'



// USER_CODE_BEGIN -- zx_printlog
/**
 * 获取小票打印记录列表
 * @param params
 * @returns
 */
export function getZxPrintlogList(params: Record<string, any>) {
    return request.get(`zxprint/zx_printlog`, {params})
}

/**
 * 获取小票打印记录详情
 * @param id 小票打印记录id
 * @returns
 */
export function getZxPrintlogInfo(id: number) {
    return request.get(`zxprint/zx_printlog/${id}`);
}

/**
 * 添加小票打印记录
 * @param params
 * @returns
 */
export function addZxPrintlog(params: Record<string, any>) {
    return request.post('zxprint/zx_printlog', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑小票打印记录
 * @param id
 * @param params
 * @returns
 */
export function editZxPrintlog(params: Record<string, any>) {
    return request.put(`zxprint/zx_printlog/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除小票打印记录
 * @param id
 * @returns
 */
export function deleteZxPrintlog(id: number) {
    return request.delete(`zxprint/zx_printlog/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 进行小票打印
 * @param id
 * @returns
 */
export function print(order_id: number) {
    return request.post(`zxprint/print/${order_id}`, { showErrorMessage: true, showSuccessMessage: true })
}


export function getWithOrderList(params: Record<string,any>){
    return request.get('zxprint/order_all', {params})
}

// USER_CODE_END -- zx_printlog
