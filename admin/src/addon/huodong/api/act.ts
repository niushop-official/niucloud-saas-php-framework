import request from '@/utils/request'

// USER_CODE_BEGIN -- huodong
/**
 * 获取活动列列表
 * @param params
 * @returns
 */
export function getActList(params: Record<string, any>) {
    return request.get(`huodong/act`, {params})
}

/**
 * 获取活动列详情
 * @param id 活动列id
 * @returns
 */
export function getActInfo(id: number) {
    return request.get(`huodong/act/${id}`);
}

/**
 * 添加活动列
 * @param params
 * @returns
 */
export function addAct(params: Record<string, any>) {
    return request.post('huodong/act', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑活动列
 * @param id
 * @param params
 * @returns
 */
export function editAct(params: Record<string, any>) {
    return request.put(`huodong/act/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除活动列
 * @param id
 * @returns
 */
export function deleteAct(id: number) {
    return request.delete(`huodong/act/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithHuodongCateList(params: Record<string,any>){
    return request.get('huodong/huodong_cate_all', {params})
}

// USER_CODE_END -- huodong




// USER_CODE_BEGIN -- huodong_act
/**
 * 获取活动列列表
 * @param params
 * @returns
 */

export function getWithCateList(params: Record<string,any>){
    return request.get('huodong/cate_all', {params})
}

// USER_CODE_END -- huodong_act
