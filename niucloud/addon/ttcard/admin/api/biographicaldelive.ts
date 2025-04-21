import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_biographicaldelive
/**
 * 获取简历投递管理列表
 * @param params
 * @returns
 */
export function getBiographicaldeliveList(params: Record<string, any>) {
    return request.get(`ttcard/biographicaldelive`, {params})
}

/**
 * 获取简历投递管理详情
 * @param id 简历投递管理id
 * @returns
 */
export function getBiographicaldeliveInfo(id: number) {
    return request.get(`ttcard/biographicaldelive/${id}`);
}

/**
 * 添加简历投递管理
 * @param params
 * @returns
 */
export function addBiographicaldelive(params: Record<string, any>) {
    return request.post('ttcard/biographicaldelive', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑简历投递管理
 * @param id
 * @param params
 * @returns
 */
export function editBiographicaldelive(params: Record<string, any>) {
    return request.put(`ttcard/biographicaldelive/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除简历投递管理
 * @param id
 * @returns
 */
export function deleteBiographicaldelive(id: number) {
    return request.delete(`ttcard/biographicaldelive/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithUserList2(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithRecruitList(params: Record<string,any>){
    return request.get('ttcard/recruit_all', {params})
}export function getWithBiographicalList(params: Record<string,any>){
    return request.get('ttcard/biographical_all', {params})
}

// USER_CODE_END -- ttcard_biographicaldelive
