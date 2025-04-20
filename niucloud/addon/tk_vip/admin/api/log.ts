import request from '@/utils/request'

// USER_CODE_BEGIN -- tkvip_vip_log
/**
 * 获取会员日志列表
 * @param params
 * @returns
 */
export function getLogList(params: Record<string, any>) {
    return request.get(`tk_vip/log`, {params})
}

/**
 * 获取会员日志详情
 * @param id 会员日志id
 * @returns
 */
export function getLogInfo(id: number) {
    return request.get(`tk_vip/log/${id}`);
}

/**
 * 添加会员日志
 * @param params
 * @returns
 */
export function addLog(params: Record<string, any>) {
    return request.post('tk_vip/log', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑会员日志
 * @param id
 * @param params
 * @returns
 */
export function editLog(params: Record<string, any>) {
    return request.put(`tk_vip/log/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除会员日志
 * @param id
 * @returns
 */
export function deleteLog(id: number) {
    return request.delete(`tk_vip/log/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('tk_vip/member_all', {params})
}export function getWithMemberLevelList(params: Record<string,any>){
    return request.get('tk_vip/member_level_all', {params})
}

// USER_CODE_END -- tkvip_vip_log
