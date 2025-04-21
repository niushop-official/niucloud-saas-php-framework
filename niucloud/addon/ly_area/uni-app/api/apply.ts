import request from "@/utils/request"

/**
 * 申请
 * @returns
 */
export function addApply(data: any) {
	return request.post(`ly_area/apply`, data)
}

/**
 * 编辑
 * @param id
 * @returns
 */
export function editApply(id: number) {
	return request.get(`ly_area/apply/${id}`)
}


export function getApplyInfo(){
	return request.get(`ly_area/apply/applyInfo`)
}
