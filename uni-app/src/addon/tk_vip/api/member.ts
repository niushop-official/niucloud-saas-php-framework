import request from '@/utils/request'

/**
 * 获取支持等级
 */
export function getMemberLevel() {
	return request.get(`tk_vip/member/level`);
}
export function getVipInfo() {
	return request.get(`tk_vip/vip/levelinfo`);
}
export function getMemberList(param) {
	return request.get(`tk_vip/member/list`, param);
}
export function getMemberInfo(id) {
	return request.get(`tk_vip/member/info/${id}`);
}
export function adjustPoint(param) {
	return request.post(`tk_vip/member/adjustpoint`, param);
}
export function adjustBalance(param) {
	return request.post(`tk_vip/member/adjustbalance`, param);
}
export function editVipLevel(param) {
	return request.get(`tk_vip/member/edit/${param.id}`, param);
}
export function editReal(param) {
	return request.get(`tk_vip/member/editreal/${param.id}`, param);
}
export function addReal(param) {
	return request.post(`tk_vip/member/addreal`, param);
}