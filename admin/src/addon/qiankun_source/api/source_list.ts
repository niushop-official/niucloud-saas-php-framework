import request from '@/utils/request'

// USER_CODE_BEGIN -- qiankun_source_list
/**
 * 获取素材管理列表
 * @param params
 * @returns
 */
export function getSourceListList(params: Record<string, any>) {
    return request.get(`qiankun_source/source_list`, {params})
}

/**
 * 获取素材管理详情
 * @param id 素材管理id
 * @returns
 */
export function getSourceListInfo(id: number) {
    return request.get(`qiankun_source/source_list/${id}`);
}

/**
 * 添加素材管理
 * @param params
 * @returns
 */
export function addSourceList(params: Record<string, any>) {
    return request.post('qiankun_source/source_list', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑素材管理
 * @param id
 * @param params
 * @returns
 */
export function editSourceList(params: Record<string, any>) {
    return request.put(`qiankun_source/source_list/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除素材管理
 * @param id
 * @returns
 */
export function deleteSourceList(id: number) {
    return request.delete(`qiankun_source/source_list/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithCategoryList(params: Record<string,any>){
    return request.get('qiankun_source/category_all', {params})
}

// USER_CODE_END -- qiankun_source_list
