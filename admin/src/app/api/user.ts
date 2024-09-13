import request from '@/utils/request'

//当前接口用户指系统整体用户管理，站内用户添加，编辑，详情，操作日志，请查看站点内部相关接口

/***************************************************** 用户 ****************************************************/

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export function getUserList(params: Record<string, any>) {
    return request.get(`user/user`, { params })
}

/**
 * 获取用户详情
 * @param uid 用户uid
 * @returns
 */
export function getUserInfo(uid: number) {
    return request.get(`user/user/${ uid }`);
}

/**
 * 添加用户
 * @param params
 * @returns
 */
export function addUser(params: Record<string, any>) {
    return request.post('user/user', params, { showSuccessMessage: true })
}

/**
 * 删除用户
 * @param uid
 */
export function deleteUser(uid: number) {
    return request.delete(`user/user/${uid}`, { showSuccessMessage: true })
}

/**
 * 修改用户
 * @param uid
 */
export function editUser(params: Record<string, any>) {
    return request.put(`user/user/${params.uid}`, params, { showSuccessMessage: true })
}

/**
 * 获取所有用户列表
 * @param params
 * @returns
 */
export function getAllUserList(params: Record<string, any>) {
    return request.get(`user/user_all`, { params })
}

/**
 * 获取添加站点可选用户列表
 * @param params
 * @returns
 */
export function getUserListSelect(params: Record<string, any>) {
    return request.get(`user/user_select`, { params })
}

/**
 * 查询用户名是否存在
 * @param username
 * @returns
 */
export function checkUsernameIsExist(username: string) {
    return request.get(`user/isexist`, { params: { username } })
}

/**
 * 获取用户站点创建限制
 * @param uid
 */
export function getUserCreateSiteLimit(uid: number) {
    return request.get(`user/user/create_site_limit/${ uid }`)
}

/**
 *
 * @param id
 */
export function getUserCreateSiteLimitInfo(id: number) {
    return request.get(`user/user/create_site_limit/info/${ id }`)
}

/**
 * 添加用户站点创建限制
 * @param params
 */
export function addUserCreateSiteLimit(params: Record<string, any>) {
    return request.post(`user/user/create_site_limit`, params, { showSuccessMessage: true })
}

/**
 * 编辑用户站点创建限制
 * @param params
 */
export function editUserCreateSiteLimit(params: Record<string, any>) {
    return request.put(`user/user/create_site_limit/${ params.id }`, params, { showSuccessMessage: true })
}

/**
 * 编辑用户站点创建限制
 * @param id
 */
export function delUserCreateSiteLimit(id: number) {
    return request.delete(`user/user/create_site_limit/${ id }`, { showSuccessMessage: true })
}
