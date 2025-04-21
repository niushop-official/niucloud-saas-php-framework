import request from '@/utils/request'

/**
 * 获取礼品卡分类分页列表
 * @param params
 * @returns
 */
export function getCategoryPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/category`, { params })
}

/**
 * 获取礼品卡分类列表
 * @param params
 * @returns
 */
export function getCategoryList(params: Record<string, any>) {
    return request.get(`shop_giftcard/category/list`, { params })
}

/**
 * 获取礼品卡分类详情
 * @param category_id 礼品卡分类category_id
 * @returns
 */
export function getCategoryInfo(category_id: number) {
    return request.get(`shop_giftcard/category/${ category_id }`);
}

/**
 * 添加礼品卡分类
 * @param params
 * @returns
 */
export function addCategory(params: Record<string, any>) {
    return request.post('shop_giftcard/category', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑礼品卡分类
 * @param params
 */
export function editCategory(params: Record<string, any>) {
    return request.put(`shop_giftcard/category/${ params.category_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除礼品卡分类
 * @param category_id
 * @returns
 */
export function deleteCategory(category_id: number) {
    return request.delete(`shop_giftcard/category/${ category_id }`, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 修改礼品卡分类排序号
 * @param params
 */
export function modifyCategorySort(params: Record<string, any>) {
    return request.put(`shop_giftcard/category/sort`, params, { showSuccessMessage: true })
}

/**
 * 修改礼品卡分类状态
 * @param params
 */
export function modifyCategoryStatus(params: Record<string, any>) {
    return request.put(`shop_giftcard/category/status`, params, { showSuccessMessage: true })
}
