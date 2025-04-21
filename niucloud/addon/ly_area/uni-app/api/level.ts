
import request from '@/utils/request'

/**
 * 获取区域分红等级列表
 * @returns
 */
export function getLevelList() {
  return request.get(`ly_area/level/lists`)
}

/**
 * 获取区域分红等级详情
 * @param id
 * @returns
 */
export function getLevelInfo(id: number) {
  return request.get(`ly_area/level/${id}`)
}
