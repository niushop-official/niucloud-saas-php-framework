import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_lian_member
/**
 * 获取链动2+1会员列表
 * @param params
 * @returns
 */
export function getMemberList(params: Record<string, any>) {
    return request.get(`ly_lian/member`, {params})
}

/**
 * 获取链动2+1会员详情
 * @param id 链动2+1会员id
 * @returns
 */
export function getMemberInfo(id: number) {
    return request.get(`ly_lian/member/${id}`);
}

/**
 * 添加链动2+1会员
 * @param params
 * @returns
 */
export function addMember(params: Record<string, any>) {
    return request.post('ly_lian/member', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑链动2+1会员
 * @param id
 * @param params
 * @returns
 */
export function editMember(params: Record<string, any>) {
    return request.put(`ly_lian/member/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除链动2+1会员
 * @param id
 * @returns
 */
export function deleteMember(id: number) {
    return request.delete(`ly_lian/member/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ly_lian_member