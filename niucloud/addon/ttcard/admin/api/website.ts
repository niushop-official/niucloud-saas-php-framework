import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_website
/**
 * 获取微官网管理列表
 * @param params
 * @returns
 */
export function getWebsiteList(params: Record<string, any>) {
    return request.get(`ttcard/website`, {params})
}

/**
 * 获取微官网管理详情
 * @param id 微官网管理id
 * @returns
 */
export function getWebsiteInfo(id: number) {
    return request.get(`ttcard/website/${id}`);
}

/**
 * 添加微官网管理
 * @param params
 * @returns
 */
export function addWebsite(params: Record<string, any>) {
    return request.post('ttcard/website', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑微官网管理
 * @param id
 * @param params
 * @returns
 */
export function editWebsite(params: Record<string, any>) {
    return request.put(`ttcard/website/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除微官网管理
 * @param id
 * @returns
 */
export function deleteWebsite(id: number) {
    return request.delete(`ttcard/website/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithCardList(params: Record<string,any>){
    return request.get('ttcard/card_all', {params})
}export function getWithIndustryList(params: Record<string,any>){
    return request.get('ttcard/industry_all', {params})
}

// USER_CODE_END -- ttcard_website
