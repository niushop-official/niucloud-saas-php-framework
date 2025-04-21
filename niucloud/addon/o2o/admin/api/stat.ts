import request from '@/utils/request'

/***************************************************** 统计 ****************************************************/
/**
 * 获取全部统计
 */
export function getStat() {
    return request.get('o2o/stat/total');
}

/**
 * 获取昨日统计
 */
export function getYesterdayStat() {
    return request.get('o2o/stat/yesterday');
}

/**
 * 获取当日统计
 */
export function getTodayStat() {
    return request.get('o2o/stat/today');
}

/**
 * 获取当月统计
 */
export function getMonthStat() {
    return request.get('o2o/stat/month');
}