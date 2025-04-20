import request from '@/utils/request'

/**
 * 获取实名配置
 * @return 
 */
export function getRealConfig() {
	return request.get(`tk_vip/real/getrealconfig`);
}
/**
 * 检查实名
 * @return 
 */
export function checkReal() {
	return request.get(`tk_vip/real/checkreal`);
}
/**
 * 提交实名
 * @return 
 */
export function submitReal(param) {
	return request.post(`tk_vip/real/submitreal`, param);
}
/**
 * 获取实名信息
 * @return 
 */
export function getRealInfo() {
	return request.get(`tk_vip/real/getrealinfo`);
}