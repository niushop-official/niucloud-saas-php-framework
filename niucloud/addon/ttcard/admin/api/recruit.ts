import request from '@/utils/request'





// USER_CODE_BEGIN -- ttcard_recruit
/**
 * 获取招聘管理列表
 * @param params
 * @returns
 */
export function getRecruitList(params: Record<string, any>) {
    return request.get(`ttcard/recruit`, {params})
}

/**
 * 获取招聘管理详情
 * @param id 招聘管理id
 * @returns
 */
export function getRecruitInfo(id: number) {
    return request.get(`ttcard/recruit/${id}`);
}

/**
 * 添加招聘管理
 * @param params
 * @returns
 */
export function addRecruit(params: Record<string, any>) {
    return request.post('ttcard/recruit', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑招聘管理
 * @param id
 * @param params
 * @returns
 */
export function editRecruit(params: Record<string, any>) {
    return request.put(`ttcard/recruit/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除招聘管理
 * @param id
 * @returns
 */
export function deleteRecruit(id: number) {
    return request.delete(`ttcard/recruit/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithWebsiteList(params: Record<string,any>){
    return request.get('ttcard/website_all', {params})
}export function getWithIndustryList(params: Record<string,any>){
    return request.get('ttcard/industry_all', {params})
}

// USER_CODE_END -- ttcard_recruit
