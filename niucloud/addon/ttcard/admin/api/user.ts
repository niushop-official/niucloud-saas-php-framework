import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_user
/**
 * 获取用户管理列表
 * @param params
 * @returns
 */
export function getUserList(params: Record<string, any>) {
    return request.get(`ttcard/user`, {params})
}

/**
 * 获取用户管理详情
 * @param id 用户管理id
 * @returns
 */
export function getUserInfo(id: number) {
    return request.get(`ttcard/user/${id}`);
}

/**
 * 添加用户管理
 * @param params
 * @returns
 */
export function addUser(params: Record<string, any>) {
    return request.post('ttcard/user', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑用户管理
 * @param id
 * @param params
 * @returns
 */
export function editUser(params: Record<string, any>) {
    return request.put(`ttcard/user/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除用户管理
 * @param id
 * @returns
 */
export function deleteUser(id: number) {
    return request.delete(`ttcard/user/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithOrdertypeList(params: Record<string,any>){
    return request.get('ttcard/ordertype_all', {params})
}

// USER_CODE_END -- ttcard_user
