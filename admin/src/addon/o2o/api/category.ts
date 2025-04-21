import request from '@/utils/request'

/*****************************************************  商品分类 ****************************************************/

/**
 * 获取 商品分类列表
 * @param params
 * @returns
 */
export function getCategoryList(params: Record<string, any>) {
    return request.get(`o2o/category`, { params })
}

/**
 * 获取分级分类列表
 * @param params
 * @returns
 */
export function getCategory(params: Record<string, any>) {
    return request.get(`o2o/category/list`, { params })
}

/**
 * 获取分级分类列表
 * @returns
 */
export function getCategoryTree() {
    return request.get(`o2o/category/tree`)
}

/**
 * 获取商品分类详情
 * @param category_id  商品分类category_id
 * @returns
 */
export function getCategoryInfo(category_id: number) {
    return request.get(`o2o/category/${ category_id }`);
}

/**
 * 添加 商品分类
 * @param params
 * @returns
 */
export function addCategory(params: Record<string, any>) {
    return request.post('o2o/category', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑 商品分类
 * @param params
 * @returns
 */
export function editCategory(params: Record<string, any>) {
    return request.put(`o2o/category/${ params.category_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除 商品分类
 * @param category_id
 * @returns
 */
export function deleteCategory(category_id: number) {
    return request.delete(`o2o/category/${ category_id }`, { showErrorMessage: true, showSuccessMessage: true })
}
