import request from '@/utils/request'

export function getVideolistApi(params: Record<string, any>) {
    return request.get('shortvideo/getvideolist', params)
}
export function getcatelistApi(params: Record<string, any>) {
    return request.get('shortvideo/getcatelist', params)
}
export function addViewsApi(params: Record<string, any>) {
    return request.get('shortvideo/addviews', params)
}

export function videoLikeApi(params: Record<string, any>) {
    return request.get('shortvideo/tolike', params)
}

export function getvideoCommentlistApi(params: Record<string, any>) {
    return request.get('shortvideo/getcommentlist', params)
}

export function tocommentApi(params: Record<string, any>) {
    return request.get('shortvideo/tocomment', params)
}

export function commentLikeApi(params: Record<string, any>) {
    return request.get('shortvideo/commentlike', params)
}
export function getlabellistApi(params: Record<string, any>) {
    return request.get('shortvideo/labellist', params)
}
// ------------------------------------------
// export function myvideo_list_api(params: Record<string, any>) {
//     return request.get('shortvideo/myvideo_list', params)
// }

export function myvideo_del(params: Record<string, any>) {
    return request.get('shortvideo/myvideo_del', params)
}

export function myvideo_status(params: Record<string, any>) {
    return request.get('shortvideo/myvideo_status', params)
}
export function toaddvideo(params: Record<string, any>) {
    return request.get('shortvideo/toaddvideo', params)
}
// ------------------------------------------
 
export function getvideodetail(params: Record<string, any>) {
    return request.get('shortvideo/getvideodetail', params)
}
export function getuserinfo(params: Record<string, any>) {
    return request.get('shortvideo/getuserinfo', params)
}
export function tofollowuser(params: Record<string, any>) {
    return request.post('shortvideo/tofollowuser', params)
}
export function getfollowlist(params: Record<string, any>) {
    return request.post('shortvideo/getfollowlist', params)
}
export function getfensilist(params: Record<string, any>) {
    return request.post('shortvideo/getfensilist', params)
}
export function uploadVideo(data: AnyObject) {
    return request.upload('shortvideo/upload_video', data, {showErrorMessage: true})
}

export function getposter(params: Record<string, any>) {
    return request.post('shortvideo/getposter', params)
}
	export function getConfigApi(params: Record<string, any>) {
	    return request.post('shortvideo/config', params)
	}