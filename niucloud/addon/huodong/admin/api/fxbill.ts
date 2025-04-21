import request from '@/utils/request'

// USER_CODE_BEGIN -- huodong_fxbill
/**
 * 获取活动佣金明细列表
 * @param params
 * @returns
 */
export function getFxbillList(params: Record<string, any>) {
    return request.get(`huodong/fxbill`, {params})
}

/**
 * 获取活动佣金明细详情
 * @param id 活动佣金明细id
 * @returns
 */
export function getFxbillInfo(id: number) {
    return request.get(`huodong/fxbill/${id}`);
}

/**
 * 添加活动佣金明细
 * @param params
 * @returns
 */
export function addFxbill(params: Record<string, any>) {
    return request.post('huodong/fxbill', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑活动佣金明细
 * @param id
 * @param params
 * @returns
 */
export function editFxbill(params: Record<string, any>) {
    return request.put(`huodong/fxbill/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除活动佣金明细
 * @param id
 * @returns
 */
export function deleteFxbill(id: number) {
    return request.delete(`huodong/fxbill/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('huodong/member_all', {params})
}

// USER_CODE_END -- huodong_fxbill
