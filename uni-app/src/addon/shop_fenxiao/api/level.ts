import request from '@/utils/request'

/**
 * 获取分销等级
 * @returns
 */
export function getLevelList() {
    return request.get(`shop_fenxiao/level`)
}
