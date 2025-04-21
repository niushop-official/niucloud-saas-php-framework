import request from '@/utils/request'





// USER_CODE_BEGIN -- ttcard_cases
/**
 * 获取成功案例管理列表
 * @param params
 * @returns
 */
export function getCasesList(params: Record<string, any>) {
    return request.get(`ttcard/cases`, {params})
}

/**
 * 获取成功案例管理详情
 * @param id 成功案例管理id
 * @returns
 */
export function getCasesInfo(id: number) {
    return request.get(`ttcard/cases/${id}`);
}

/**
 * 添加成功案例管理
 * @param params
 * @returns
 */
export function addCases(params: Record<string, any>) {
    return request.post('ttcard/cases', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑成功案例管理
 * @param id
 * @param params
 * @returns
 */
export function editCases(params: Record<string, any>) {
    return request.put(`ttcard/cases/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除成功案例管理
 * @param id
 * @returns
 */
export function deleteCases(id: number) {
    return request.delete(`ttcard/cases/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithCardList(params: Record<string,any>){
    return request.get('ttcard/card_all', {params})
}export function getWithWebsiteList(params: Record<string,any>){
    return request.get('ttcard/website_all', {params})
}

// USER_CODE_END -- ttcard_cases
