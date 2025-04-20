import request from '@/utils/request'



// USER_CODE_BEGIN -- qiankun_recharge_options
/**
 * 获取充值项列列表
 * @param params
 * @returns
 */
export function getOptionsList(params: Record<string, any>) {
    return request.get(`qiankun_recharge/options`, {params})
}

/**
 * 获取充值项列详情
 * @param id 充值项列id
 * @returns
 */
export function getOptionsInfo(id: number) {
    return request.get(`qiankun_recharge/options/${id}`);
}

/**
 * 添加充值项列
 * @param params
 * @returns
 */
export function addOptions(params: Record<string, any>) {
    return request.post('qiankun_recharge/options', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑充值项列
 * @param id
 * @param params
 * @returns
 */
export function editOptions(params: Record<string, any>) {
    return request.put(`qiankun_recharge/options/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除充值项列
 * @param id
 * @returns
 */
export function deleteOptions(id: number) {
    return request.delete(`qiankun_recharge/options/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithCouponList(params: Record<string,any>){
    return request.get('qiankun_recharge/coupon_all', {params})
}export function getWithMemberLevelList(params: Record<string,any>){
    return request.get('qiankun_recharge/member_level_all', {params})
}

// USER_CODE_END -- qiankun_recharge_options
