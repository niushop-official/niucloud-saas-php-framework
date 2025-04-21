import request from '@/utils/request'



// USER_CODE_BEGIN -- huodong_cate
/**
 * 获取活动分类列表
 * @param params
 * @returns
 */
export function getCateList(params: Record<string, any>) {
    return request.get(`huodong/cate`, {params})
}

/**
 * 获取活动分类详情
 * @param id 活动分类id
 * @returns
 */
export function getCateInfo(id: number) {
    return request.get(`huodong/cate/${id}`);
}

/**
 * 添加活动分类
 * @param params
 * @returns
 */
export function addCate(params: Record<string, any>) {
    return request.post('huodong/cate', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑活动分类
 * @param id
 * @param params
 * @returns
 */
export function editCate(params: Record<string, any>) {
    return request.put(`huodong/cate/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除活动分类
 * @param id
 * @returns
 */
export function deleteCate(id: number) {
    return request.delete(`huodong/cate/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- huodong_cate
