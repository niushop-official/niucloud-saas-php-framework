import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_area_apply
/**
 * 获取区域代理申请记录列表
 * @param params
 * @returns
 */
export function getApplyList(params: Record<string, any>) {
    return request.get(`ly_area/area_apply`, {params})
}

/**
 * 获取区域代理申请记录详情
 * @param id 区域代理申请记录id
 * @returns
 */
export function getApplyInfo(id: number) {
    return request.get(`ly_area/area_apply/${id}`);
}

/**
 * 添加区域代理申请记录
 * @param params
 * @returns
 */
export function addApply(params: Record<string, any>) {
    return request.post('ly_area/area_apply', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑区域代理申请记录
 * @param id
 * @param params
 * @returns
 */
export function editApply(params: Record<string, any>) {
    return request.put(`ly_area/area_apply/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除区域代理申请记录
 * @param id
 * @returns
 */
export function deleteApply(apply_id: number) {
    return request.delete(`ly_area/area_apply/${apply_id}`, { showErrorMessage: true, showSuccessMessage: true })
}


/**
 * 代理申请审核通过
 * @param apply_id 
 * @returns
 */
export function agreeAreaAgent(apply_id: number) {
    return request.put(`ly_area/area_apply_audit/agree/${apply_id}`,{}, { showErrorMessage: true, showSuccessMessage: true })
}
/**
 * 代理申请审核拒绝
 * @param apply_id 
 * @param refuse_reason
 * @returns
 */
export function refuseAreaAgent(apply_id: number,refuse_reason:string) {
    return request.put(`ly_area/area_apply_audit/refuse/${apply_id}`,{refuse_reason}, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取代理申请状态
 */
export function getAreaAgentApplyStatus() {
    return request.get('ly_area/area_apply_status');
}



// USER_CODE_END -- ly_area_apply