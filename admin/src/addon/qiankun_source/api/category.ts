import request from '@/utils/request'

// USER_CODE_BEGIN -- qiankun_source_category
/**
 * 获取乾坤素材分类列表
 * @param params
 * @returns
 */
export function getCategoryList(params: Record<string, any>) {
    return request.get(`qiankun_source/category`, {params})
}

/**
 * 获取乾坤素材分类详情
 * @param id 乾坤素材分类id
 * @returns
 */
export function getCategoryInfo(id: number) {
    return request.get(`qiankun_source/category/${id}`);
}

/**
 * 添加乾坤素材分类
 * @param params
 * @returns
 */
export function addCategory(params: Record<string, any>) {
    return request.post('qiankun_source/category', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑乾坤素材分类
 * @param id
 * @param params
 * @returns
 */
export function editCategory(params: Record<string, any>) {
    return request.put(`qiankun_source/category/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除乾坤素材分类
 * @param id
 * @returns
 */
export function deleteCategory(id: number) {
    return request.delete(`qiankun_source/category/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- qiankun_source_category
