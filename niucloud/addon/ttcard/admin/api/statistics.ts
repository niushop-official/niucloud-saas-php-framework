import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_statistics
/**
 * 获取数据统计管理列表
 * @param params
 * @returns
 */
export function getStatisticsList(params: Record<string, any>) {
    return request.get(`ttcard/statistics`, {params})
}

/**
 * 获取数据统计管理详情
 * @param id 数据统计管理id
 * @returns
 */
export function getStatisticsInfo(id: number) {
    return request.get(`ttcard/statistics/${id}`);
}

/**
 * 添加数据统计管理
 * @param params
 * @returns
 */
export function addStatistics(params: Record<string, any>) {
    return request.post('ttcard/statistics', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑数据统计管理
 * @param id
 * @param params
 * @returns
 */
export function editStatistics(params: Record<string, any>) {
    return request.put(`ttcard/statistics/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除数据统计管理
 * @param id
 * @returns
 */
export function deleteStatistics(id: number) {
    return request.delete(`ttcard/statistics/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}
export function getWithUserList2(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}
export function getWithCardList(params: Record<string,any>){
    return request.get('ttcard/card_all', {params})
}

// USER_CODE_END -- ttcard_statistics
