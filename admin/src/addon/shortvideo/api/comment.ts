import request from '@/utils/request'



// USER_CODE_BEGIN -- shortvideo_comment
/**
 * 获取列表
 * @param params
 * @returns
 */
export function getCommentList(params: Record<string, any>) {
    return request.get(`shortvideo/comment`, {params})
}

/**
 * 获取详情
 * @param id id
 * @returns
 */
export function getCommentInfo(id: number) {
    return request.get(`shortvideo/comment/${id}`);
}

/**
 * 添加
 * @param params
 * @returns
 */
export function addComment(params: Record<string, any>) {
    return request.post('shortvideo/comment', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑
 * @param id
 * @param params
 * @returns
 */
export function editComment(params: Record<string, any>) {
    return request.put(`shortvideo/comment/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteComment(id: number) {
    return request.delete(`shortvideo/comment/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- shortvideo_comment
