import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_images
/**
 * 获取相册管理列表
 * @param params
 * @returns
 */
export function getImagesList(params: Record<string, any>) {
    return request.get(`ttcard/images`, {params})
}

/**
 * 获取相册管理详情
 * @param id 相册管理id
 * @returns
 */
export function getImagesInfo(id: number) {
    return request.get(`ttcard/images/${id}`);
}

/**
 * 添加相册管理
 * @param params
 * @returns
 */
export function addImages(params: Record<string, any>) {
    return request.post('ttcard/images', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑相册管理
 * @param id
 * @param params
 * @returns
 */
export function editImages(params: Record<string, any>) {
    return request.put(`ttcard/images/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除相册管理
 * @param id
 * @returns
 */
export function deleteImages(id: number) {
    return request.delete(`ttcard/images/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithCardList(params: Record<string,any>){
    return request.get('ttcard/card_all', {params})
}

// USER_CODE_END -- ttcard_images
