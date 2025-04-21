import request from '@/utils/request'

/**
 * 获取评论设置
 */
export function getEvaluateConfig() {
    return request.get(`shop/goods/evaluate/config`)
}