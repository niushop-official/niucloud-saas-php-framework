declare interface redirectOptions {
    url : string
    mode ?: 'switchTab' | 'navigateTo' | 'reLaunch' | 'redirectTo'
    param ?: AnyObject
    success ?: () => {}
    fail ?: () => {}
    complete ?: () => {}
}

declare interface requestMobileParam {
    mobile : string,
    captcha_code : string,
    captcha_key : string,
    type : string
}

declare interface responseResult {
    code : number,
    data : any,
    msg : string
}

declare const __WAP_SPLIT_BUILD__: boolean