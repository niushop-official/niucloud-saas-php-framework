import request from '@/utils/request'

/***************************************************** 酒店 ****************************************************/

/**
 * 获取酒店列表
 * @param params
 * @returns
 */
export function getHotelList(params: AnyObject) {
    return request.get(`tourism/hotel`, params)
}

/**
 * 获取酒店详情
 * @param hotel_id 酒店hotel_id
 * @returns
 */
export function getHotelInfo(hotel_id: number) {
    return request.get(`tourism/hotel/${hotel_id}`);
}

/**
 * 获取酒店基础、周边设施
 * @returns
 */
export function getHotelFacilities() {
    return request.get(`tourism/hotel/facilities`)
}

/**
 * 获取酒店价格日历
 * @param hotel_id
 * @returns
 *
 */
export function getTourismGoodsDay(hotel_id: number) {
    return request.get(`tourism/room/goodsday/${hotel_id}`)
}

/**
 * 推荐酒店
 * @param params
 * @returns limit 个数
 *
 */
export function getHotelRecommend(params: AnyObject) {
    return request.get(`tourism/hotel/recommend`, params)
}

/**
 * 房间列表
 * @param params
 * @returns
 *
 */
export function getHotelRoom(params: AnyObject) {
    return request.get(`tourism/room/hotel/${params.hotel_id}`, params)
}

/***************************************************** 订单 ****************************************************/

/**
 * 酒店订单确认
 */
export function hotelOrderConfirm(params: AnyObject) {
    return request.get(`tourism/hotel/order/confirm`, params)
}

/**
 * 酒店订单计算
 */
export function hotelOrderCalculate(params: AnyObject) {
    return request.get(`tourism/hotel/order/calculate`, params)
}

/**
 * 酒店订单创建
 */
export function hotelOrderCreate(params: AnyObject) {
    return request.post(`tourism/hotel/order/create`, params)
}


/**
 * 线路订单确认
 */
export function wayOrderConfirm(params: AnyObject) {
    return request.get(`tourism/way/order/confirm`, params)
}

/**
 * 线路订单计算
 */
export function wayOrderCalculate(params: AnyObject) {
    return request.get(`tourism/way/order/calculate`, params)
}

/**
 * 线路订单创建
 */
export function wayOrderCreate(params: AnyObject) {
    return request.post(`tourism/way/order/create`, params)
}


/**
 * 门票订单确认
 */
export function scenicOrderConfirm(params: AnyObject) {
    return request.get(`tourism/scenic/order/confirm`, params)
}

/**
 * 门票订单计算
 */
export function scenicOrderCalculate(params: AnyObject) {
    return request.get(`tourism/scenic/order/calculate`, params)
}

/**
 * 门票订单创建
 */
export function scenicOrderCreate(params: AnyObject) {
    return request.post(`tourism/scenic/order/create`, params)
}


/**
 * 取消订单
 * @param params
 * @returns
 */
export function cancelOrder(params: AnyObject) {
    return request.put(`tourism/order/cancel/${params.order_id}`, {}, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除订单
 * @param order_id
 * @returns
 */
export function deleteOrder(order_id: number) {
    return request.delete(`tourism/order/${order_id}`, {showErrorMessage: true, showSuccessMessage: true})
}

/***************************************************** 房型 ****************************************************/

/**
 * 获取房型列表
 * @param params
 * @returns
 */
export function getRoomList(params: AnyObject) {
    return request.get(`tourism/room`, params)
}

/**
 * 获取房型详情
 * @param goods_id 商品表goods_id
 * @returns
 */
export function getRoomInfo(goods_id: number) {
    return request.get(`tourism/room/${goods_id}`);
}

/**
 * 获取房型价格日历
 * @param params
 * @returns
 */
export function roomDatePriceList(params: AnyObject) {
    return request.get(`tourism/room/calendar`, params)
}

/**
 * 获取房型设施
 * @returns
 */
export function getRoomFacilities() {
    return request.get(`tourism/room/facilities`)
}

/***************************************************** 景点 ****************************************************/
/**
 * 获取景点列表
 * @param params
 * @returns
 */
export function getScenicList(params: AnyObject) {
    return request.get(`tourism/scenic`, params)
}

/**
 * 获取景点详情
 * @param scenic_id 景点scenic_id
 * @returns
 */
export function getScenicInfo(scenic_id: number) {
    return request.get(`tourism/scenic/${scenic_id}`);
}

/**
 * 获取门票列表
 * @param params
 * @returns
 */
export function getTicketList(params: AnyObject) {
    return request.get(`tourism/ticket`, params)
}

/**
 * 获取门票详情
 * @param goods_id
 * @returns
 */
export function getTicketInfo(goods_id: number) {
    return request.get(`tourism/ticket/${goods_id}`);
}

/**
 * 获取门票价格日历列表
 * @param scenic_id
 * @returns
 */
export function getTicketGoodsDay(goods_id: number) {
    return request.get(`tourism/ticket/goodsday/${goods_id}`)
}

/**
 * 推荐景点
 * @param params
 * @returns limit 个数
 *
 */
export function getScenicRecommend(params: AnyObject) {
    return request.get(`tourism/scenic/recommend`, params)
}

/***************************************************** 旅游线路 ****************************************************/
/**
 * 获取旅游线路列表
 * @param params
 * @returns
 */
export function getWayList(params: AnyObject) {
    return request.get(`tourism/way`, params)
}

/**
 * 获取旅游线路详情
 * @param way_id 旅游线路way_id
 * @returns
 */
export function getWayInfo(way_id: number) {
    return request.get(`tourism/way/${way_id}`);
}

/**
 * 获取旅游线路标签
 * @returns
 */
export function getWayLabel() {
    return request.get(`tourism/way/label`);
}

/**
 * 获取旅游线路价格日历
 * @param way_id
 * @returns
 */
export function getWayGoodsDay(way_id: number) {
    return request.get(`tourism/way/goodsday/${way_id}`);
}

/**
 * 推荐线路
 * @param params
 * @returns limit 个数
 *
 */
export function getWayRecommend(params: AnyObject) {
    return request.get(`tourism/way/recommend`, params)
}

/***************************************************** 订单 ****************************************************/
/**
 * 获取订单列表
 * @param params
 * @returns
 *
 */
export function getMemberOrderList(params: AnyObject) {
    return request.get(`tourism/order`, params);
}

/**
 * 获取订单详情
 * @param order_id
 * @returns
 *
 */
export function getMemberOrderDetail(order_id: Number) {
    return request.get(`tourism/order/${order_id}`);
}

/**
 * 获取订单状态
 * @returns
 *
 */
export function getMemberOrderStatus() {
    return request.get(`tourism/order/status`);
}

/***************************************************** 核销 ****************************************************/

/**
 * 获取核销记录
 * @param params
 * @returns
 */
export function getVerifyRecord(params: Record<string, any>) {
    return request.get(`tourism/verify/record`, params)
}

/**
 * 获取核销信息
 * @param verifyCode
 * @returns
 */
export function getVerifyDetail(verifyCode: string) {
    return request.get(`tourism/verify/${verifyCode}`)
}

/**
 * 检测是否是核销员
 * @returns
 */
export function checkIsVerifier() {
    return request.get('tourism/verify/verifier/check')
}

/**
 * 酒店核销
 * @param verifyCode
 * @returns
 */
export function verify(verifyCode: string) {
    return request.post(`tourism/verify/${verifyCode}`, {}, {showSuccessMessage: true})
}

/***************************************************** 核销 ****************************************************/

/**
 * 酒店退款设置
 * @returns
 */
export function hotelRefundConfig() {
    return request.get(`tourism/hotel/config`)
}

/**
 * 景点退款设置
 * @returns
 */
export function scenicRefundConfig() {
    return request.get(`tourism/scenic/config`)
}

/**
 * 线路退款设置
 * @returns
 */
export function wayRefundConfig() {
    return request.get(`tourism/way/config`)
}

/***************************************************** 退款 ****************************************************/

/**
 * 申请退款
 * @params
 * @returns
 */
export function refundApply(params) {
    return request.post(`tourism/refund/apply`, params, {showErrorMessage: true, showSuccessMessage: true})
}

/**
 * 退款详情
 * @param refund_id
 * @returns
 */
export function refundDetail(refund_id: number) {
    return request.get(`tourism/refund/${refund_id}`)
}

/**
 * 取消退款
 * @param refund_id
 * @returns
 */
export function cancelRefund(refund_id: number) {
    return request.put(`tourism/refund/cancel/${refund_id}`)
}

