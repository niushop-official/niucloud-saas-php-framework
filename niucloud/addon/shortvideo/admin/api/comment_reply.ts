import request from '@/utils/request'



// USER_CODE_BEGIN -- shortvideo_comment_reply
/**
 * 获取列表
 * @param params
 * @returns
 */
export function getCommentReplyList(params: Record<string, any>) {
    return request.get(`shortvideo/comment_reply`, {params})
}

/**
 * 获取详情
 * @param id id
 * @returns
 */
export function getCommentReplyInfo(id: number) {
    return request.get(`shortvideo/comment_reply/${id}`);
}

/**
 * 添加
 * @param params
 * @returns
 */
export function addCommentReply(params: Record<string, any>) {
    return request.post('shortvideo/comment_reply', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑
 * @param id
 * @param params
 * @returns
 */
export function editCommentReply(params: Record<string, any>) {
    return request.put(`shortvideo/comment_reply/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteCommentReply(id: number) {
    return request.delete(`shortvideo/comment_reply/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}




// USER_CODE_END -- shortvideo_comment_reply
