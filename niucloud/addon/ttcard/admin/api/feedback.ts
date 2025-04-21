import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_feedback
/**
 * 获取意见反馈管理列表
 * @param params
 * @returns
 */
export function getFeedbackList(params: Record<string, any>) {
    return request.get(`ttcard/feedback`, {params})
}

/**
 * 获取意见反馈管理详情
 * @param id 意见反馈管理id
 * @returns
 */
export function getFeedbackInfo(id: number) {
    return request.get(`ttcard/feedback/${id}`);
}

/**
 * 添加意见反馈管理
 * @param params
 * @returns
 */
export function addFeedback(params: Record<string, any>) {
    return request.post('ttcard/feedback', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑意见反馈管理
 * @param id
 * @param params
 * @returns
 */
export function editFeedback(params: Record<string, any>) {
    return request.put(`ttcard/feedback/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除意见反馈管理
 * @param id
 * @returns
 */
export function deleteFeedback(id: number) {
    return request.delete(`ttcard/feedback/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}

// USER_CODE_END -- ttcard_feedback
