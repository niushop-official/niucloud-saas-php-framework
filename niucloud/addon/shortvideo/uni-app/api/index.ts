import request from '@/utils/request'

export function getLabel() {
    return request.get('shortvideo/labellist')
}