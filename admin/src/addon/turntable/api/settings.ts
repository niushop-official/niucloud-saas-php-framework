import request from '@/utils/request'
export function setGamesSettings(params: Record<string, any>){
    return request.put(`turntable/settings`, params, {showSuccessMessage: true})
}
export function getGamesSettings(){
    return request.get(`turntable/settings`)
}