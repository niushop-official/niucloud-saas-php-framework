import request from '@/utils/request'

// USER_CODE_BEGIN -- huodong_relation
/**
 * 获取推广关系列表
 * @param params
 * @returns
 */
export function getRelationList(params: Record<string, any>) {
    return request.get(`huodong/relation`, {params})
}

/**
 * 获取推广关系详情
 * @param id 推广关系id
 * @returns
 */
export function getRelationInfo(id: number) {
    return request.get(`huodong/relation/${id}`);
}

/**
 * 添加推广关系
 * @param params
 * @returns
 */
export function addRelation(params: Record<string, any>) {
    return request.post('huodong/relation', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑推广关系
 * @param id
 * @param params
 * @returns
 */
export function editRelation(params: Record<string, any>) {
    return request.put(`huodong/relation/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除推广关系
 * @param id
 * @returns
 */
export function deleteRelation(id: number) {
    return request.delete(`huodong/relation/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('huodong/member_all', {params})
}

// USER_CODE_END -- huodong_relation
