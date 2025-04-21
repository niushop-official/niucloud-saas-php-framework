import request from '@/utils/request'

/***************************************************** source_list ****************************************************/
export function getSourceList(param: Record<string, any>) {
    return request.get(`qiankun_source/source_list`, param)
}

export function getSourceCategory() {
    return request.get(`qiankun_source/category_list`)
}

