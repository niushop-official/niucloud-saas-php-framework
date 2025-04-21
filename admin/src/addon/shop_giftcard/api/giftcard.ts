import request from '@/utils/request'

/**
 * 获取礼品卡活动分页列表
 * @param params
 * @returns
 */
export function getGiftcardPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard`, { params })
}

/**
 * 获取礼品卡活动列表
 * @param params
 * @returns
 */
export function getGiftcardList(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard/list`, { params })
}

/**
 * 获取选择礼品卡活动分页列表
 * @param params
 * @returns
 */
export function getGiftcardSelectPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard/select`, { params })
}

/**
 * 获取礼品卡活动信息
 * @param giftcard_id 礼品卡活动giftcard_id
 * @returns
 */
export function getGiftcardInfo(giftcard_id: number) {
    return request.get(`shop_giftcard/giftcard/${ giftcard_id }`);
}

/**
 * 获取礼品卡活动详情
 * @param giftcard_id 礼品卡活动giftcard_id
 * @returns
 */
export function getGiftcardDetail(giftcard_id: number) {
    return request.get(`shop_giftcard/giftcard/detail/${ giftcard_id }`);
}

/**
 * 礼品卡活动编辑数据
 * @param params
 * @returns
 */
export function getGiftcardInit(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard/init`, { params });
}

/**
 * 添加礼品卡活动
 * @param params
 * @returns
 */
export function addGiftcard(params: Record<string, any>) {
    return request.post('shop_giftcard/giftcard', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑礼品卡活动
 * @param params
 */
export function editGiftcard(params: Record<string, any>) {
    return request.put(`shop_giftcard/giftcard/${ params.giftcard_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除礼品卡活动
 * @param giftcard_id
 * @returns
 */
export function deleteGiftcard(giftcard_id: number) {
    return request.delete(`shop_giftcard/giftcard/${ giftcard_id }`, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 修改礼品卡活动排序号
 * @param params
 */
export function modifyGiftcardSort(params: Record<string, any>) {
    return request.put(`shop_giftcard/giftcard/sort`, params, { showSuccessMessage: true })
}

/**
 * 修改礼品卡活动状态
 * @param params
 */
export function modifyGiftcardStatus(params: Record<string, any>) {
    return request.put(`shop_giftcard/giftcard/status`, params, { showSuccessMessage: true })
}

/**
 * 获取礼品卡类型
 * @param params
 * @returns
 */
export function getGiftcardType(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard/type`, { params })
}

/**
 * 获取礼品卡权益类型
 * @param params
 * @returns
 */
export function getGiftcardCardRightType(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard/cardRightType`, { params })
}

/**
 * 获取礼品卡实体制作列表
 * @param params
 * @returns
 */
export function getGiftcardMakeList(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard/make`, { params })
}

/**
 * 添加礼品卡实体制作
 * @param params
 * @returns
 */
export function addGiftcardMake(params: Record<string, any>) {
    return request.post('shop_giftcard/giftcard/make', params, {
        showErrorMessage: true,
        showSuccessMessage: false
    })
}

/**
 * 删除礼品卡实体制作
 * @param make_id
 * @returns
 */
export function deleteGiftcardMake(make_id: number) {
    return request.delete(`shop_giftcard/giftcard/make/${ make_id }`, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}