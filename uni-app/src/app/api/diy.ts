import request from '@/utils/request'

/**
 * 获取自定义页面信息
 */
export function getDiyInfo(params: Record<string, any>) {
    return request.get('diy/diy', params)
}

/**
 * 获取底部导航列表
 */
export function getTabbarList(params: Record<string, any>) {
    return request.get('diy/tabbar/list', params)
}

/**
 * 获取页面分享信息
 */
export function getShareInfo(params: Record<string, any>) {
    return request.get('diy/share', params)
}

/**
 * 获取个人资料表单
 */
export function getMemberFormRecord() {
    return request.get('diy/form/member_record')
}


/**
 * 获取项目列表供组件调用
 */
export function getGoodsComponents(params: Record<string, any>) {
    return request.get(`home_service/goods/components`, params)
}


/**
 * 次卡套餐
 * @param orderId
 * @returns
 */
export function getFirstCard(orderId: number) {
    return request.get(`home_service/member/firstCard`)
}


/**
 * 获取商品分类列表
 */
export function getGoodsCategoryList(params: Record<string, any>) {
    return request.get(`home_service/goods/category/list`, params)
}


/**
 * 获取次卡列表供组件调用
 */
export function getCardComponents(params: Record<string, any>) {
    return request.get(`home_service/card/components`, params)
}

/**
 * 获取优惠券、次卡
 * @param orderId
 * @returns
 */
export function getCouponCard(orderId: number) {
    return request.get(`home_service/member/memberDiscountCount`)
}


/**
 * 技师信息
 * @param params
 * @returns
 */
export function getTechnicianInfo(params: Record<string, any>) {
    return request.get(`home_service/technician/info`,params,{  showErrorMessage: false })
}

/**
 * 获取门店信息
 * @returns 门店信息数据
 */
export function getStoreInfo() {
  return request.get('home_service/store/info',{},{  showErrorMessage: false })
}



/**
 * 技师入驻申请资料
 * @param params 技师入驻申请参数
 * @returns
 */
export function getTechnicianApply() {
    return request.get(`home_service/technician/apply`)
}



/**
 * 门店入驻申请资料
 * @param params 门店入驻申请参数
 * @returns
 */
export function getStoreApply() {
    return request.get(`home_service/member/store/application`)
}

