import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_authentication
/**
 * 获取认证信息管理列表
 * @param params
 * @returns
 */
export function getAuthenticationList(params: Record<string, any>) {
    return request.get(`ttcard/authentication`, {params})
}

/**
 * 获取认证信息管理详情
 * @param id 认证信息管理id
 * @returns
 */
export function getAuthenticationInfo(id: number) {
    return request.get(`ttcard/authentication/${id}`);
}

/**
 * 添加认证信息管理
 * @param params
 * @returns
 */
export function addAuthentication(params: Record<string, any>) {
    return request.post('ttcard/authentication', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑认证信息管理
 * @param id
 * @param params
 * @returns
 */
export function editAuthentication(params: Record<string, any>) {
    return request.put(`ttcard/authentication/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除认证信息管理
 * @param id
 * @returns
 */
export function deleteAuthentication(id: number) {
    return request.delete(`ttcard/authentication/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}
export function getWithWebsiteList(params: Record<string,any>){
    return request.get('ttcard/website_all', {params})
}
export function getWithOrdertypeList(params: Record<string,any>){
    return request.get('ttcard/authentication/ordertype_all', {params})
}

// USER_CODE_END -- ttcard_authentication
