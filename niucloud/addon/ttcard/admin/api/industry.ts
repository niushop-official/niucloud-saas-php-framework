import request from '@/utils/request'

// USER_CODE_BEGIN -- ttcard_industry
/**
 * 获取行业管理列表
 * @param params
 * @returns
 */
export function getIndustryList(params: Record<string, any>) {
    return request.get(`ttcard/industry`, {params})
}

/**
 * 获取行业管理详情
 * @param id 行业管理id
 * @returns
 */
export function getIndustryInfo(id: number) {
    return request.get(`ttcard/industry/${id}`);
}

/**
 * 添加行业管理
 * @param params
 * @returns
 */
export function addIndustry(params: Record<string, any>) {
    return request.post('ttcard/industry', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑行业管理
 * @param id
 * @param params
 * @returns
 */
export function editIndustry(params: Record<string, any>) {
    return request.put(`ttcard/industry/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除行业管理
 * @param id
 * @returns
 */
export function deleteIndustry(id: number) {
    return request.delete(`ttcard/industry/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ttcard_industry
