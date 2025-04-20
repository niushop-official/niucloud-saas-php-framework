import request from '@/utils/request'

/***************************************************** 旅游组件 ****************************************************/
/**
 * 获取旅游线路,酒店,景点列表
 * @param params
 * @returns
 */
export function getTourismList(params: Record<string, any>) {
    return request.get(`tourism/goods_of_select`, { params })
}

/***************************************************** 旅游设置 ****************************************************/
/**
 * 设置旅游设置
 */
export function setSetting(params: Record<string, any>) {
    return request.post(`tourism/setting`, params, { showSuccessMessage: true })
}

/**
 * 获取旅游设置
 */
export function getSetting() {
    return request.get(`tourism/setting`)
}

/***************************************************** 酒店 ****************************************************/

/**
 * 获取酒店列表
 * @param params
 * @returns
 */
export function getHotelList(params: Record<string, any>) {
    return request.get(`tourism/hotel`, { params })
}

/**
 * 获取酒店详情
 * @param hotel_id 酒店hotel_id
 * @returns
 */
export function getHotelInfo(hotel_id: number) {
    return request.get(`tourism/hotel/${ hotel_id }`);
}

/**
 * 添加酒店
 * @param params
 * @returns
 */
export function addHotel(params: Record<string, any>) {
    return request.post('tourism/hotel', params, { showSuccessMessage: true })
}

/**
 * 编辑酒店
 * @param params
 * @returns
 */
export function editHotel(params: Record<string, any>) {
    return request.put(`tourism/hotel/${ params.hotel_id }`, params, { showSuccessMessage: true })
}

/**
 * 删除酒店
 * @param hotel_id
 * @returns
 */
export function deleteHotel(hotel_id: number) {
    return request.delete(`tourism/hotel/${ hotel_id }`, { showSuccessMessage: true })
}

/**
 * 获取酒店基础、周边设施
 * @returns
 */
export function getHotelFacilities() {
    return request.get(`tourism/hotel/facilities`)
}

/**
 * 获取酒店状态
 * @returns
 */
export function getHotelStatus() {
    return request.get(`tourism/hotel/status`)
}

/**
 * 修改酒店状态
 * @param params
 * @returns
 */
export function editHotelStatus(params: Record<string, any>) {
    return request.put(`tourism/hotel/status/${ params.hotel_id }`, params, { showSuccessMessage: true })
}

/**
 * 获取酒店选择列表
 * @param params
 * @returns
 */
export function getHotelSelectList(params: Record<string, any>) {
    return request.get(`tourism/hotel/select`, { params })
}

/***************************************************** 订单 ****************************************************/

/**
 * 获取订单列表
 * @param params
 * @returns
 */
export function getOrderList(params: Record<string, any>) {
    return request.get(`tourism/hotel/order`, { params })
}

/**
 * 获取订单详情
 * @param order_id 订单order_id
 * @returns
 */
export function getHotelOrderInfo(order_id: number) {
    return request.get(`tourism/hotel/order/${ order_id }`);
}

/**
 * 获取订单状态
 */
export function getHotelOrderStatus() {
    return request.get(`tourism/hotel/order/status`);
}

/**
 * 获取订单列表
 * @param params
 * @returns
 */
export function getScenicOrderList(params: Record<string, any>) {
    return request.get(`tourism/scenic/order`, { params })
}

/**
 * 获取订单详情
 * @param order_id 订单order_id
 * @returns
 */
export function getScenicOrderInfo(order_id: number) {
    return request.get(`tourism/scenic/order/${ order_id }`);
}

/**
 * 获取订单状态
 */
export function getScenicOrderStatus() {
    return request.get(`tourism/scenic/order/status`);
}

/***************************************************** 核销 ****************************************************/

/**
 * 获取核销记录
 * @param params
 * @returns
 */
export function getVerifyRecord(params: Record<string, any>) {
    return request.get(`tourism/verify/record`, { params })
}

/**
 * 获取核销信息
 * @param verifyCode
 * @returns
 */
export function getVerifyDetail(verifyCode: string) {
    return request.get(`tourism/verify/${ verifyCode }`)
}

/**
 * 查询核销数据
 * @param params
 * @returns
 */
export function searchVerify(params: Record<string, any>) {
    return request.get(`tourism/verify/search/${ params.type }/${ params.value }`, { params })
}

/**
 * 酒店订单核销
 * @param verifyCode
 * @returns
 */
export function verify(verifyCode: string) {
    return request.post(`tourism/verify/${ verifyCode }`, {}, { showSuccessMessage: true, showErrorMessage: true })
}

/***************************************************** 房型 ****************************************************/

/**
 * 获取房型列表
 * @param params
 * @returns
 */
export function getRoomList(params: Record<string, any>) {
    return request.get(`tourism/room`, { params })
}

/**
 * 获取房型详情
 * @param goods_id 商品表goods_id
 * @returns
 */
export function getRoomInfo(goods_id: number) {
    return request.get(`tourism/room/${ goods_id }`);
}

/**
 * 添加房型
 * @param params
 * @returns
 */
export function addRoom(params: Record<string, any>) {
    return request.post('tourism/room', params, { showSuccessMessage: true })
}

/**
 * 编辑房型
 * @param params
 * @returns
 */
export function editRoom(params: Record<string, any>) {
    return request.put(`tourism/room/${ params.goods_id }`, params, { showSuccessMessage: true })
}

/**
 * 删除房型
 * @param goods_id
 * @returns
 */
export function deleteRoom(goods_id: number) {
    return request.delete(`tourism/room/${ goods_id }`, { showSuccessMessage: true })
}

/**
 * 修改房型排序号
 * @param params
 */
export function editRoomSort(params: Record<string, any>) {
    return request.put(`tourism/room/sort/${ params.id }`, params, { showSuccessMessage: true })
}

/**
 * 修改房型状态
 * @param params
 * @returns
 */
export function editRoomStatus(params: Record<string, any>) {
    return request.put(`tourism/room/status/${ params.id }`, params, { showSuccessMessage: true })
}

/**
 * 获取房型数量
 * @param hotel_id
 * @returns
 */
export function roomCount(hotel_id: number) {
    return request.get(`tourism/room/count/${ hotel_id }`)
}

/**
 * 添加房型价格日历
 * @param params
 * @returns
 */
export function editRoomCalendar(params: Record<string, any>) {
    return request.post('tourism/room/calendar', params, { showSuccessMessage: true })
}

/**
 * 获取房型价格日历
 * @param params
 * @returns
 */
export function roomDatePriceList(params: Record<string, any>) {
    return request.get(`tourism/room/calendar`, { params })
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
export function getScenicList(params: Record<string, any>) {
    return request.get(`tourism/scenic`, { params })
}

/**
 * 获取景点详情
 * @param scenic_id 景点scenic_id
 * @returns
 */
export function getScenicInfo(scenic_id: number) {
    return request.get(`tourism/scenic/${ scenic_id }`);
}

/**
 * 添加景点
 * @param params
 * @returns
 */
export function addScenic(params: Record<string, any>) {
    return request.post('tourism/scenic', params, { showSuccessMessage: true })
}

/**
 * 编辑景点
 * @param params
 * @returns
 */
export function editScenic(params: Record<string, any>) {
    return request.put(`tourism/scenic/${ params.scenic_id }`, params, { showSuccessMessage: true })
}

/**
 * 删除景点
 * @param scenic_id
 * @returns
 */
export function deleteScenic(scenic_id: number) {
    return request.delete(`tourism/scenic/${ scenic_id }`, { showSuccessMessage: true })
}

/**
 * 修改景点状态
 * @param params
 * @returns
 */
export function editScenicStatus(params: Record<string, any>) {
    return request.put(`tourism/scenic/status/${ params.scenic_id }`, params, { showSuccessMessage: true })
}

/**
 * 获取门票列表
 * @param params
 * @returns
 */
export function getTicketList(params: Record<string, any>) {
    return request.get(`tourism/ticket`, { params })
}

/**
 * 获取门票详情
 * @param goods_id
 * @returns
 */
export function getTicketInfo(goods_id: number) {
    return request.get(`tourism/ticket/${ goods_id }`);
}

/**
 * 添加门票
 * @param params
 * @returns
 */
export function addTicket(params: Record<string, any>) {
    return request.post('tourism/ticket', params, { showSuccessMessage: true })
}

/**
 * 编辑门票
 * @param params
 * @returns
 */
export function editTicket(params: Record<string, any>) {
    return request.put(`tourism/ticket/${ params.goods_id }`, params, { showSuccessMessage: true })
}

/**
 * 删除门票
 * @param goods_id
 * @returns
 */
export function deleteTicket(goods_id: number) {
    return request.delete(`tourism/ticket/${ goods_id }`, { showSuccessMessage: true })
}

/**
 * 修改门票状态
 * @param params
 * @returns
 */
export function editTicketStatus(params: Record<string, any>) {
    return request.put(`tourism/ticket/status/${ params.goods_id }`, params, { showSuccessMessage: true })
}

/**
 * 添加门票价格日历
 * @param params
 * @returns
 */
export function editTicketCalendar(params: Record<string, any>) {
    return request.post('tourism/ticket/calendar', params, { showSuccessMessage: true })
}

/**
 * 获取门票价格日历列表
 * @param params
 * @returns
 */
export function datePriceList(params: Record<string, any>) {
    return request.get(`tourism/ticket/calendar`, { params })
}

/**
 * 获取景点选择列表
 * @param params
 * @returns
 */
export function getScenicSelectList(params: Record<string, any>) {
    return request.get(`tourism/scenic/select`, { params })
}

/***************************************************** 旅游线路 ****************************************************/
/**
 * 获取旅游线路列表
 * @param params
 * @returns
 */
export function getWayList(params: Record<string, any>) {
    return request.get(`tourism/way`, { params })
}

/**
 * 获取旅游线路选择列表
 * @param params
 * @returns
 */
export function getWaySelectList(params: Record<string, any>) {
    return request.get(`tourism/way/select`, { params })
}

/**
 * 获取旅游线路详情
 * @param way_id 旅游线路way_id
 * @returns
 */
export function getWayInfo(way_id: number) {
    return request.get(`tourism/way/${ way_id }`);
}

/**
 * 添加旅游线路
 * @param params
 * @returns
 */
export function addWay(params: Record<string, any>) {
    return request.post('tourism/way', params, { showSuccessMessage: true })
}

/**
 * 编辑旅游线路
 * @param params
 * @returns
 */
export function editWay(params: Record<string, any>) {
    return request.put(`tourism/way/${ params.way_id }`, params, { showSuccessMessage: true })
}

/**
 * 删除旅游线路
 * @param way_id
 * @returns
 */
export function deleteWay(way_id: number) {
    return request.delete(`tourism/way/${ way_id }`, { showSuccessMessage: true })
}

/**
 * 修改线路状态
 * @param params
 * @returns
 */
export function editWayStatus(params: Record<string, any>) {
    return request.put(`tourism/way/status/${ params.way_id }`, params, { showSuccessMessage: true })
}

/**
 * 获取旅游线路标签
 * @returns
 */
export function getWayLabel() {
    return request.get(`tourism/way/label`)
}

/**
 * 添加线路价格日历
 * @param params
 * @returns
 */
export function editwayCalendar(params: Record<string, any>) {
    return request.post('tourism/way/calendar', params, { showSuccessMessage: true })
}

/**
 * 获取线路价格日历列表
 * @param params
 * @returns
 */
export function wayDatePriceList(params: Record<string, any>) {
    return request.get(`tourism/way/calendar`, { params })
}

/**
 * 获取订单列表
 * @param params
 * @returns
 */
export function getWayOrderList(params: Record<string, any>) {
    return request.get(`tourism/way/order`, { params })
}

/**
 * 获取订单详情
 * @param orderId
 * @returns
 */
export function getWayOrderInfo(orderId: number) {
    return request.get(`tourism/way/order/${ orderId }`);
}

/**
 * 获取订单状态
 */
export function getWayOrderStatus() {
    return request.get('tourism/way/order/status');
}

/**
 * 获取维权列表
 */
export function getRefundList(params: Record<string, any>) {
    return request.get('tourism/refund', { params });
}

/**
 * 获取维权详情
 */
export function getRefundDetail(refundId: number) {
    return request.get(`tourism/refund/${ refundId }`);
}

/**
 * 获取维权状态
 */
export function getRefundStatus() {
    return request.get('tourism/refund/status');
}

/**
 * 确认退款
 * @param params
 * @returns
 */
export function confirmRefund(params: Record<string, any>) {
    return request.put(`tourism/refund/${ params.refund_id }`, params);
}

/**
 * 拒绝退款
 * @param params
 * @returns
 */
export function refuseRefund(params: Record<string, any>) {
    return request.put(`tourism/refund/refuse/${ params.refund_id }`, params);
}

/***************************************************** 核销员 ****************************************************/

/**
 * 获取核销员列表
 * @param params
 * @returns
 */
export function getTourismVerifierList(params: Record<string, any>) {
    return request.get(`tourism/verifier`, { params })
}

/**
 * 添加核销员
 * @param params
 * @returns
 */
export function addTourismVerifier(params: Record<string, any>) {
    return request.post('tourism/verifier', params, { showSuccessMessage: true })
}

/**
 * 删除核销员
 * @param id
 * @returns
 */
export function deleteTourismVerifier(id: number) {
    return request.delete(`tourism/verifier/${ id }`, { showSuccessMessage: true })
}

/***************************************************** 统计 ****************************************************/

/**
 * 获取今日统计
 */
export function statToday() {
    return request.get(`tourism/stat/today`);
}

/**
 * 获取昨日统计
 */
export function statYesterday() {
    return request.get(`tourism/stat/yesterday`);
}

/**
 * 按时查询
 */
export function statHour(params: Record<string, any>) {
    return request.get(`tourism/stat/hour`, { params });
}

/**
 * 按天查询
 */
export function statDay(params: Record<string, any>) {
    return request.get(`tourism/stat/stat`, { params });
}

/**
 * 查询统计总数据
 */
export function totalStat() {
    return request.get(`tourism/stat/total`);
}

/**
 * 订单数统计
 */
export function orderStat() {
    return request.get(`tourism/stat/order`);
}

/**
 * 编辑会员价
 * @param params
 * @returns
 */
export function editGoodsMemberPrice(params: Record<string, any>) {
    return request.put(`tourism/goods/memberprice`, params, { showSuccessMessage: true })
}


/**
 * 编辑日历会员价
 * @param params
 * @returns
 */
export function editGoodsDayMemberPrice(params: Record<string, any>) {
    return request.put(`tourism/goods/daymemberprice`, params, { showSuccessMessage: true })
}

