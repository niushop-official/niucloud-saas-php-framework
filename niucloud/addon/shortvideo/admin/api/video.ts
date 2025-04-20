import request from '@/utils/request'

// USER_CODE_BEGIN -- shortvideo
/**
 * 获取列列表
 * @param params
 * @returns
 */
export function getVideoList(params: Record<string, any>) {
    return request.get(`shortvideo/video`, {params})
}

/**
 * 获取列详情
 * @param id 列id
 * @returns
 */
export function getVideoInfo(id: number) {
    return request.get(`shortvideo/video/${id}`);
}

/**
 * 添加列
 * @param params
 * @returns
 */
export function addVideo(params: Record<string, any>) {
    return request.post('shortvideo/video', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑列
 * @param id
 * @param params
 * @returns
 */
export function editVideo(params: Record<string, any>) {
    return request.put(`shortvideo/video/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除列
 * @param id
 * @returns
 */
export function deleteVideo(id: number) {
    return request.delete(`shortvideo/video/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithshortvideoCateList(params: Record<string,any>){
    return request.get('shortvideo/shortvideo_cate_all', {params})
}

// USER_CODE_END -- shortvideo
export function getWithvideolist(params: Record<string,any>){
    return request.get('shortvideo/video_all', {params})
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('shortvideo/member_all', {params})
}

export function getWithLabelList(params: Record<string,any>){
    return request.get('shortvideo/label_all', {params})
}

// USER_CODE_BEGIN -- shortvideo_video
/**
 * 获取列列表
 * @param params
 * @returns
 */

export function getWithCateList(params: Record<string,any>){
    return request.get('shortvideo/cate_all', {params})
}
export function getWithGoodsList(params: Record<string,any>){
    return request.get('shortvideo/goods_all', {params})
}

// USER_CODE_END -- shortvideo_video
