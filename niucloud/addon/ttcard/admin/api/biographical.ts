import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_biographical
/**
 * 获取简历管理列表
 * @param params
 * @returns
 */
export function getBiographicalList(params: Record<string, any>) {
    return request.get(`ttcard/biographical`, {params})
}

/**
 * 获取简历管理详情
 * @param id 简历管理id
 * @returns
 */
export function getBiographicalInfo(id: number) {
    return request.get(`ttcard/biographical/${id}`);
}

/**
 * 添加简历管理
 * @param params
 * @returns
 */
export function addBiographical(params: Record<string, any>) {
    return request.post('ttcard/biographical', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑简历管理
 * @param id
 * @param params
 * @returns
 */
export function editBiographical(params: Record<string, any>) {
    return request.put(`ttcard/biographical/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除简历管理
 * @param id
 * @returns
 */
export function deleteBiographical(id: number) {
    return request.delete(`ttcard/biographical/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}

// USER_CODE_END -- ttcard_biographical