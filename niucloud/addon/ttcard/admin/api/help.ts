import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_help
/**
 * 获取使用帮助管理列表
 * @param params
 * @returns
 */
export function getHelpList(params: Record<string, any>) {
    return request.get(`ttcard/help`, {params})
}

/**
 * 获取使用帮助管理详情
 * @param id 使用帮助管理id
 * @returns
 */
export function getHelpInfo(id: number) {
    return request.get(`ttcard/help/${id}`);
}

/**
 * 添加使用帮助管理
 * @param params
 * @returns
 */
export function addHelp(params: Record<string, any>) {
    return request.post('ttcard/help', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑使用帮助管理
 * @param id
 * @param params
 * @returns
 */
export function editHelp(params: Record<string, any>) {
    return request.put(`ttcard/help/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除使用帮助管理
 * @param id
 * @returns
 */
export function deleteHelp(id: number) {
    return request.delete(`ttcard/help/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ttcard_help
