import request from '@/utils/request'

// USER_CODE_BEGIN -- huodong_fxuser
/**
 * 获取推广员列表
 * @param params
 * @returns
 */
export function getFxuserList(params: Record<string, any>) {
    return request.get(`huodong/fxuser`, {params})
}

/**
 * 获取推广员详情
 * @param id 推广员id
 * @returns
 */
export function getFxuserInfo(id: number) {
    return request.get(`huodong/fxuser/${id}`);
}

/**
 * 添加推广员
 * @param params
 * @returns
 */
export function addFxuser(params: Record<string, any>) {
    return request.post('huodong/fxuser', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑推广员
 * @param id
 * @param params
 * @returns
 */
export function editFxuser(params: Record<string, any>) {
    return request.put(`huodong/fxuser/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除推广员
 * @param id
 * @returns
 */
export function deleteFxuser(id: number) {
    return request.delete(`huodong/fxuser/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('huodong/member_all', {params})
}

// USER_CODE_END -- huodong_fxuser
