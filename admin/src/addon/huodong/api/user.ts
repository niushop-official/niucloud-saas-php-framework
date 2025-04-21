import request from '@/utils/request'

// USER_CODE_BEGIN -- huodong_user
/**
 * 获取报名者信息列表
 * @param params
 * @returns
 */
export function getUserList(params: Record<string, any>) {
    return request.get(`huodong/user`, {params})
}

/**
 * 获取报名者信息详情
 * @param id 报名者信息id
 * @returns
 */
export function getUserInfo(id: number) {
    return request.get(`huodong/user/${id}`);
}

/**
 * 添加报名者信息
 * @param params
 * @returns
 */
export function addUser(params: Record<string, any>) {
    return request.post('huodong/user', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑报名者信息
 * @param id
 * @param params
 * @returns
 */
export function editUser(params: Record<string, any>) {
    return request.put(`huodong/user/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除报名者信息
 * @param id
 * @returns
 */
export function deleteUser(id: number) {
    return request.delete(`huodong/user/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('huodong/member_all', {params})
}

// USER_CODE_END -- huodong_user
