import request from '@/utils/request'





// USER_CODE_BEGIN -- ttcard_ordertype
/**
 * 获取会员等级列表
 * @param params
 * @returns
 */
export function getOrdertypeList(params: Record<string, any>) {
    return request.get(`ttcard/ordertype`, {params})
}

/**
 * 获取会员等级详情
 * @param id 会员等级id
 * @returns
 */
export function getOrdertypeInfo(id: number) {
    return request.get(`ttcard/ordertype/${id}`);
}

/**
 * 添加会员等级
 * @param params
 * @returns
 */
export function addOrdertype(params: Record<string, any>) {
    return request.post('ttcard/ordertype', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑会员等级
 * @param id
 * @param params
 * @returns
 */
export function editOrdertype(params: Record<string, any>) {
    return request.put(`ttcard/ordertype/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除会员等级
 * @param id
 * @returns
 */
export function deleteOrdertype(id: number) {
    return request.delete(`ttcard/ordertype/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ttcard_ordertype