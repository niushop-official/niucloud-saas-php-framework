import request from '@/utils/request'

// USER_CODE_BEGIN -- qiankun_cashier_list
/**
 * 获取收银员列表
 * @param params
 * @returns
 */
export function getCashierList(params: Record<string, any>) {
    return request.get(`qiankun_cashier/cashier`, {params})
}

/**
 * 获取收银员详情
 * @param id 收银员id
 * @returns
 */
export function getCashierInfo(id: number) {
    return request.get(`qiankun_cashier/cashier/${id}`);
}

/**
 * 添加收银员
 * @param params
 * @returns
 */
export function addCashier(params: Record<string, any>) {
    return request.post('qiankun_cashier/cashier', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑收银员
 * @param id
 * @param params
 * @returns
 */
export function editCashier(params: Record<string, any>) {
    return request.put(`qiankun_cashier/cashier/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除收银员
 * @param id
 * @returns
 */
export function deleteCashier(id: number) {
    return request.delete(`qiankun_cashier/cashier/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('qiankun_cashier/member_all', {params})
}

// USER_CODE_END -- qiankun_cashier_list
