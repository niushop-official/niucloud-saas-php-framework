import request from '@/utils/request'

/***************************************************** 核销 ****************************************************/

/**
 * 获取核销记录
 * @param params
 * @returns
 */
export function getVerifyRecord(params: Record<string, any>) {
    return request.get(`vipcard/verify`, { params })
}

/**
 * 获取核销信息
 * @param verifyCode
 * @returns
 */
export function searchVerify(verifyCode: string) {
    return request.get(`vipcard/verify/search/${verifyCode}`)
}

/**
 * 获取核销信息
 * @param id
 * @returns
 */
export function getVerifyDetail(id: number) {
    return request.get(`vipcard/verify/${id}`)
}


/**
 * 检测是否是核销员
 * @returns
 */
export function checkIsVerifier() {
    return request.get('vipcard/verify/verifier/check')
}

/**
 * 核销
 * @param params
 * @returns
 */
export function verify(params: AnyObject) {
    return request.post(`vipcard/verify/${params.verify_code}`, params, { showSuccessMessage: true })
}

/**
 * 核销记录
 * @param 核销记录根据卡项id
 * @returns
 */
export function getVerifyCard(id: Number) {
    return request.get(`vipcard/verify/card/${id}`)
}

/***************************************************** 核销 ****************************************************/
/**
 * 订单确认
 */
export function orderConfirm(params: AnyObject) {
    return request.get(`vipcard/order/confirm`, params)
}

/**
 * 订单计算
 */
export function orderCalculate(params: AnyObject) {
    return request.get(`vipcard/order/calculate`, params)
}

/**
 * 订单创建
 */
export function orderCreate(params: AnyObject) {
    return request.post(`vipcard/order/create`, params)
}

/**
 * 获取订单列表
 * @param params
 * @returns
 *
 */
export function getOrderList(params: AnyObject) {
    return request.get('vipcard/order',params);
}

/**
 * 获取订单详情
 * @param orderId
 * @returns
 *
 */
export function getOrderDetail(orderId: Number) {
    return request.get(`vipcard/order/${orderId}`);
}

/**
 * 获取订单状态
 * @returns
 *
 */
export function getOrderStatus() {
    return request.get(`vipcard/order/status`);
}

/**
 * 取消订单
 * @param orderId
 * @returns
 */
export function cancelOrder(orderId: number) {
    return request.put(`vipcard/order/cancel/${orderId}`, {}, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除订单
 * @param orderId
 * @returns
 */
export function deleteOrder(orderId: number) {
    return request.delete(`vipcard/order/${orderId}`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 申请退款
 * @params
 * @returns
 */
export function refundApply(params: AnyObject) {
    return request.post(`vipcard/refund/apply`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 退款详情
 * @param refundId
 * @returns
 */
export function refundDetail(refundId: number) {
    return request.get(`vipcard/refund/${refundId}`)
}

/**
 * 取消退款
 * @param refundId
 * @returns
 */
export function cancelRefund(refundId: number) {
    return request.put(`vipcard/refund/cancel/${refundId}`)
}

/***************************************************** 项目管理 ****************************************************/
/**
 * 项目分类
 * @returns
 */
export function getServiceCategory() {
    return request.get('vipcard/category')
}

/**
 * 项目列表
 * @param params
 * @returns
 */
export function getServiceList(params: Record<string, any>) {
    return request.get(`vipcard/service`, params)
}


/**
 * 项目详情
 * @param id
 * @returns
 */
export function getServiceDetail(id: number) {
    return request.get(`vipcard/service/${id}`)
}


/**
 * 卡项列表[首页调用]
 * @param params
 * @returns
 */
export function getIndexServiceList(params: Record<string, any>) {
    return request.get(`vipcard/service/list`, params)
}



/***************************************************** 卡项管理 ****************************************************/

/**
 * 卡项列表
 * @param params
 * @returns
 */
export function getCardList(params: Record<string, any>) {
    return request.get(`vipcard/card`, params)
}


/**
 * 卡项详情
 * @param id
 * @returns
 */
export function getCardDetail(id: number) {
    return request.get(`vipcard/card/${id}`)
}

/**
 * 我的卡项列表
 * @param params
 * @returns
 */
export function getMembercard(params: Record<string, any>) {
    return request.get(`vipcard/membercard`,  params )
}

/**
 * 我的卡项列表详情
 * @param id
 * @returns
 */
export function getMembercardDetail(id: Number) {
    return request.get(`vipcard/membercard/${id}`)
}


/**
 * 卡项列表[首页调用]
 * @param params
 * @returns
 */
export function getIndexCardList(params: Record<string, any>) {
    return request.get(`vipcard/card/list`,  params )
}


/***************************************************** 技师 ****************************************************/
/**
 * 技师列表[不分页]
 * @returns
 */
export function getUserList() {
    return request.get(`vipcard/reserve/user/list`)
}

/***************************************************** 预约 ****************************************************/
/**
 * 申请预约
 * @param params
 * @returns
 */
export function reserveApply(params: AnyObject) {
    return request.post(`vipcard/reserve/apply`, params, { showErrorMessage: true })
}

/**
 * 预约状态
 * @param params
 * @returns
 */
export function getReserveStatus() {
    return request.get(`vipcard/reserve/status`)
}

/**
 * 我的预约列表
 * @param params
 * @returns
 */
export function getReserveList(params: AnyObject) {
    return request.get(`vipcard/reserve/list`,params)
}

/**
 * 取消预约
 * @param id
 * @returns
 */
export function cancelReserve(id: number) {
    return request.put(`vipcard/reserve/remove/${id}`, {}, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 预约设置
 * @returns
 */
export function getReserveConfig() {
    return request.get(`vipcard/reserve/config`)
}

/**
 * 我的预约详情
 * @param id
 * @returns
 */
export function getReserveDetail(id: number) {
    return request.get(`vipcard/reserve/info/${id}`)
}

/**
 * 添加收藏
 */
export function setCollect(data: AnyObject){
    return request.post(`vipcard/collect`, data)
}

/**
 * 查询收藏（单条）
 */
export function getCollect(data: AnyObject){
    return request.get(`vipcard/collect`, data)
}

/**
 * 取消收藏
 */
export function deleteCollect(id: number){
    return request.delete(`vipcard/collect/${id}`)
}
