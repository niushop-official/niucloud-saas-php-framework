import request from '@/utils/request'

/*****************************************************  商品分类 ****************************************************/

/**
 * 获取 商品分类列表
 * @param params
 * @returns
 */
export function getCategoryList(params: Record<string, any>) {
    return request.get(`vipcard/category`, { params })
}

/**
 * 获取分级分类列表
 * @param params
 * @returns
 */
export function getCategory(params: Record<string, any>) {
    return request.get(`vipcard/category/list`, { params })
}

/**
 * 获取分级分类列表
 * @returns
 */
export function getCategoryTree() {
    return request.get(`vipcard/category/tree`)
}

/**
 * 获取 商品分类详情
 * @param category_id  商品分类category_id
 * @returns
 */
export function getCategoryInfo(category_id: number) {
    return request.get(`vipcard/category/${ category_id }`);
}

/**
 * 添加 商品分类
 * @param params
 * @returns
 */
export function addCategory(params: Record<string, any>) {
    return request.post('vipcard/category', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑 商品分类
 * @param params
 * @returns
 */
export function editCategory(params: Record<string, any>) {
    return request.put(`vipcard/category/${ params.category_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除 商品分类
 * @param category_id
 * @returns
 */
export function deleteCategory(category_id: number) {
    return request.delete(`vipcard/category/${ category_id }`, { showErrorMessage: true, showSuccessMessage: true })
}


/***************************************************** 服务商品 ****************************************************/

/**
 * 获取服务项目列表
 * @param params
 * @returns
 */
export function getServiceList(params: Record<string, any>) {
    return request.get(`vipcard/service`, { params })
}

/**
 * 获取服务项目列表
 * @param params
 * @returns
 */
export function getServicePagesList(params: Record<string, any>) {
    return request.get(`vipcard/service/list`, { params })
}

/**
 * 获取服务项目详情
 * @param goods_id 商品表goods_id
 * @returns
 */
export function getServiceInfo(goods_id: number) {
    return request.get(`vipcard/service/${ goods_id }`);
}

/**
 * 添加服务项目
 * @param params
 * @returns
 */
export function addService(params: Record<string, any>) {
    return request.post('vipcard/service', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑服务项目
 * @param params
 * @returns
 */
export function editService(params: Record<string, any>) {
    return request.put(`vipcard/service/${ params.goods_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除服务项目
 * @param goods_id
 * @returns
 */
export function deleteService(goods_id: number) {
    return request.delete(`vipcard/service/${ goods_id }`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 项目上下架
 * @param params
 * @returns
 */
export function editServiceStatus(params: Record<string, any>) {
    return request.put(`vipcard/service/status/${ params.goods_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 更改服务项目排序
 * @param params
 * @returns
 */
export function setServiceSort(params: Record<string, any>) {
    return request.put(`vipcard/service/sort/${ params.goods_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 领取记录
 * @returns
 */
export function getMemberRecord(params: Record<string, any>) {
    return request.get(`vipcard/member/service/record`, { params })
}

/**
 * 领取记录详情
 * @param card_id
 * @returns
 */
export function getMemberRecordDerail(card_id: number) {
    return request.get(`vipcard/member/service/record/${ card_id }`)
}

/**
 * 获取选择服务项目列表
 * @param params
 * @returns
 */
export function getServiceSelectList(params: Record<string, any>) {
    return request.get(`vipcard/service/select`, { params })
}

/***************************************************** 卡项 ****************************************************/
/**
 * 获取卡项类型
 * @returns
 */
export function getCardType() {
    return request.get(`vipcard/card/type`);
}

/**
 * 获取卡项核销类型
 * @returns
 */
export function getVerifyType() {
    return request.get(`vipcard/card/verifytype`);
}

/**
 * 获取服务项目列表
 * @param params
 * @returns
 */
export function getCardList(params: Record<string, any>) {
    return request.get(`vipcard/card`, { params })
}

/**
 * 获取服务卡项选择列表
 * @param params
 * @returns
 */
export function getCardSelectList(params: Record<string, any>) {
    return request.get(`vipcard/goods_of_select`, { params })
}

/**
 * 添加卡项
 * @param params
 * @returns
 */
export function addCard(params: Record<string, any>) {
    return request.post('vipcard/card', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑卡项
 * @param params
 * @returns
 */
export function editCard(params: Record<string, any>) {
    return request.put(`vipcard/card/${ params.goods_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 卡项详情
 * @param id
 * @returns
 */
export function getCardDetail(id: number) {
    return request.get(`vipcard/card/${ id }`)
}

/**
 * 删除服务项目
 * @param goods_id
 * @returns
 */
export function deleteCard(goods_id: number) {
    return request.delete(`vipcard/card/${ goods_id }`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 卡项上下架
 * @param params
 * @returns
 */
export function editStatus(params: Record<string, any>) {
    return request.put(`vipcard/card/status/${ params.goods_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 更改卡项排序
 * @param params
 * @returns
 */
export function setCardSort(params: Record<string, any>) {
    return request.put(`vipcard/card/sort/${ params.goods_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 领取记录
 * @returns
 */
export function getCardMemberRecord(params: Record<string, any>) {
    return request.get(`vipcard/member/card/record`, { params })
}

/**
 * 领取记录详情
 * @param card_id
 * @returns
 */
export function getCardMemberRecordDerail(card_id: number) {
    return request.get(`vipcard/member/card/record/${ card_id }`)
}

/**
 * 购买记录状态
 * @returns getStatus
 */
export function getRecordStatus() {
    return request.get(`vipcard/member/service/status`)
}


/***************************************************** 预约 ****************************************************/

/**
 * 获取预约列表
 * @param params
 * @returns
 */
export function getReserveList(params: Record<string, any>) {
    return request.get(`reserve/reserve`, { params })
}

/**
 * 获取预约详情
 * @param reserve_id 预约reserve_id
 * @returns
 */
export function getReserveInfo(reserve_id: number) {
    return request.get(`reserve/reserve/${ reserve_id }`);
}

/**
 * 获取预约面板
 * @param params
 * @returns
 */
export function getReserveBoard(params: Record<string, any>) {
    return request.get(`vipcard/reserve/board`, { params }, { showErrorMessage: true, showSuccessMessage: true });
}

/**
 * 添加预约 通过手机号添加会员
 * @param params
 * @returns
 */
export function getMemberInfo(params: Record<string, any>) {
    return request.get('vipcard/reserve/member', { params })
}

/**
 * 添加预约
 * @param params
 * @returns
 */
export function addReserve(params: Record<string, any>) {
    return request.post('vipcard/reserve', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑预约
 * @param params
 * @returns
 */
export function editReserve(params: Record<string, any>) {
    return request.put(`vipcard/reserve/${ params.reserve_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除预约
 * @param reserve_id
 * @returns
 */
export function deleteReserve(reserve_id: number) {
    return request.delete(`vipcard/reserve/${ reserve_id }`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 预约设置
 * @returns
 */
export function getReserveConfig() {
    return request.get('vipcard/reserve/config')
}

/**
 * 编辑预约设置
 * @param params
 * @returns
 */
export function setReserveConfig(params: Record<string, any>) {
    return request.put(`vipcard/reserve/config`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 预约状态
 * @returns
 */
export function getReserveStatus() {
    return request.get('vipcard/reserve/status')
}

/**
 * 变更预约状态
 * @param params
 * @returns
 */
export function editReserveStatus(params: Record<string, any>) {
    return request.put(`vipcard/reserve/status/${ params.reserve_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 预约状态
 * @returns
 */
export function getGoodsOfSelect(params: Record<string, any>) {
    return request.get('vipcard/goods_of_select', { params })
}

/***************************************************** 技师 ****************************************************/

/**
 * 获取技师列表
 * @param params
 * @returns
 */
export function getTechnicianList(params: Record<string, any>) {
    return request.get(`vipcard/reserve/user`, { params })
}

/**
 * 获取技师列表（不分页）
 * @returns
 */
export function getTechnicianListTo() {
    return request.get(`vipcard/reserve/user/list`)
}

/**
 * 添加技师
 * @param params
 * @returns
 */
export function addTechnician(params: Record<string, any>) {
    return request.post('vipcard/reserve/user', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑技师
 * @param params
 * @returns
 */
export function editTechnician(params: Record<string, any>) {
    return request.put(`vipcard/reserve/user/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 技师详情
 * @param id
 * @returns
 */
export function getTechnicianDetail(id: number) {
    return request.get(`vipcard/reserve/user/${ id }`)
}

/**
 * 删除技师
 * @param id
 * @returns
 */
export function deleteTechnician(id: number) {
    return request.delete(`vipcard/reserve/user/${ id }`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 更改技师状态
 * @param params
 * @returns
 */
export function editTechnicianStatus(params: Record<string, any>) {
    return request.put(`vipcard/reserve/user/status/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}


/***************************************************** 核销 ****************************************************/

/**
 * 获取核销记录
 * @param params
 * @returns
 */
export function getVerifyRecord(params: Record<string, any>) {
    return request.get(`vipcard/verify/record`, { params })
}

/**
 * 获取核销信息
 * @param verifyCode
 * @returns
 */
export function getVerifyDetail(verifyCode: string) {
    return request.get(`vipcard/verify/${ verifyCode }`)
}

/**
 * 订单核销
 * @param verifyCode
 * @returns
 */
export function verify(verifyCode: string) {
    return request.post(`vipcard/verify/${ verifyCode }`, {}, { showSuccessMessage: true })
}

/***************************************************** 核销员 ****************************************************/

/**
 * 获取核销员列表
 * @param params
 * @returns
 */
export function getVipcardVerifierList(params: Record<string, any>) {
    return request.get(`vipcard/verifier`, { params })
}

/**
 * 添加核销员
 * @param params
 * @returns
 */
export function addVipcardVerifier(params: Record<string, any>) {
    return request.post('vipcard/verifier', params, { showSuccessMessage: true })
}

/**
 * 删除核销员
 * @param id
 * @returns
 */
export function deleteVipcardVerifier(id: number) {
    return request.delete(`vipcard/verifier/${ id }`, { showSuccessMessage: true })
}

/***************************************************** 订单管理 ****************************************************/

/**
 * 获取订单列表
 * @param params
 * @returns
 */
export function getOrderList(params: Record<string, any>) {
    return request.get(`vipcard/order`, { params })
}

/**
 * 获取订单详情
 * @param orderId 订单orderId
 * @returns
 */
export function getOrderDetail(orderId: number) {
    return request.get(`vipcard/order/${ orderId }`);
}

/**
 * 获取订单状态
 */
export function getOrderStatus() {
    return request.get('vipcard/order/status');
}

/**
 * 获取维权列表
 */
export function getRefundList(params: Record<string, any>) {
    return request.get('vipcard/refund', { params });
}

/**
 * 获取维权详情
 */
export function getRefundDetail(refundId: number) {
    return request.get(`vipcard/refund/${ refundId }`);
}

/**
 * 获取维权状态
 */
export function getRefundStatus() {
    return request.get('vipcard/refund/status');
}

/**
 * 确认退款
 * @param params
 * @returns
 */
export function confirmRefund(params: Record<string, any>) {
    return request.put(`vipcard/refund/${ params.refund_id }`, params);
}

/**
 * 拒绝退款
 * @param params
 * @returns
 */
export function refuseRefund(params: Record<string, any>) {
    return request.put(`vipcard/refund/refuse/${ params.refund_id }`, params);
}

/***************************************************** 统计 ****************************************************/
/**
 * 获取全部统计
 */
export function getStat() {
    return request.get('vipcard/stat/total');
}

/**
 * 获取昨日统计
 */
export function getYesterdayStat() {
    return request.get('vipcard/stat/yesterday');
}

/**
 * 获取当日统计
 */
export function getTodayStat() {
    return request.get('vipcard/stat/today');
}

/**
 * 获取当月统计
 */
export function getMonthStat() {
    return request.get('vipcard/stat/month');
}
