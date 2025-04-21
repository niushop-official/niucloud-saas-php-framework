import request from '@/utils/request'

// USER_CODE_BEGIN -- transfer_log
/**
 * 获取资产转赠记录列表
 * @param params
 * @returns
 */
export function getLogList(params: Record<string, any>) {
    return request.get(`transfer/log`, {params})
}

/**
 * 获取资产转赠记录详情
 * @param id 资产转赠记录id
 * @returns
 */
export function getLogInfo(id: number) {
    return request.get(`transfer/log/${id}`);
}

/**
 * 添加资产转赠记录
 * @param params
 * @returns
 */
export function addLog(params: Record<string, any>) {
    return request.post('transfer/log', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑资产转赠记录
 * @param id
 * @param params
 * @returns
 */
export function editLog(params: Record<string, any>) {
    return request.put(`transfer/log/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除资产转赠记录
 * @param id
 * @returns
 */
export function deleteLog(id: number) {
    return request.delete(`transfer/log/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('transfer/member_all', {params})
}

// USER_CODE_END -- transfer_log
