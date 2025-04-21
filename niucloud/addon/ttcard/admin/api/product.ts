import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_product
/**
 * 获取产品管理列表
 * @param params
 * @returns
 */
export function getProductList(params: Record<string, any>) {
    return request.get(`ttcard/product`, {params})
}

/**
 * 获取产品管理详情
 * @param id 产品管理id
 * @returns
 */
export function getProductInfo(id: number) {
    return request.get(`ttcard/product/${id}`);
}

/**
 * 添加产品管理
 * @param params
 * @returns
 */
export function addProduct(params: Record<string, any>) {
    return request.post('ttcard/product', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑产品管理
 * @param id
 * @param params
 * @returns
 */
export function editProduct(params: Record<string, any>) {
    return request.put(`ttcard/product/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除产品管理
 * @param id
 * @returns
 */
export function deleteProduct(id: number) {
    return request.delete(`ttcard/product/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithCardList(params: Record<string,any>){
    return request.get('ttcard/card_all', {params})
}export function getWithWebsiteList(params: Record<string,any>){
    return request.get('ttcard/website_all', {params})
}

// USER_CODE_END -- ttcard_product
