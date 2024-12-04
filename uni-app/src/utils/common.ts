import { getTabbarPages } from './pages'
import useDiyStore from '@/app/stores/diy'
import useMemberStore from '@/stores/member'
import useSystemStore from '@/stores/system'
import useConfigStore from '@/stores/config'
import { getNeedLoginPages } from '@/utils/pages'

/**
 * 跳转页面
 */
export const redirect = (redirect: any) => {
    // 装修模式禁止跳转
    if (useDiyStore().mode == 'decorate') return

    let { url, mode, param, success, fail, complete } = redirect
    let originalUrl = url; // 原始地址
    let newLogin = false; // 是否需要登录

    // 如果未开启普通账号登录注册，则不展示登录注册页面，如果只开启了账号密码登录，就不需要跳转到登录中间页了，直接进入普通账号密码登录页面
    if (!getToken() && getNeedLoginPages().indexOf(url) != -1) {

        const config = useConfigStore()
        const systemStore = useSystemStore()

        // #ifdef MP-WEIXIN
        if (config.login.is_username && !config.login.is_mobile && !config.login.is_auth_register) {
            url = '/app/pages/auth/login'
            param = { type: 'username' }
            mode = 'redirectTo'
            newLogin = true
        } else if (systemStore.initStatus == 'finish' && !config.login.is_username && !config.login.is_mobile && !config.login.is_auth_register) {
            uni.showToast({ title: '商家未开启登录注册', icon: 'none' })
            return;
        } else {
            url = '/app/pages/auth/index'
            mode = 'redirectTo'
            newLogin = true
        }
        // #endif

        // #ifdef H5
        if (isWeixinBrowser()) {
            // 微信浏览器
            if (config.login.is_username && !config.login.is_mobile && !config.login.is_auth_register) {
                url = '/app/pages/auth/login'
                param = { type: 'username' }
                mode = 'redirectTo'
                newLogin = true
            } else if (systemStore.initStatus == 'finish' && !config.login.is_username && !config.login.is_mobile && !config.login.is_auth_register) {
                uni.showToast({ title: '商家未开启登录注册', icon: 'none' })
                return;
            } else {
                url = '/app/pages/auth/index'
                mode = 'redirectTo'
                newLogin = true
            }
        } else {
            // 普通浏览器
            if (config.login.is_username && !config.login.is_mobile) {
                url = '/app/pages/auth/login'
                param = { type: 'username' }
                mode = 'redirectTo'
                newLogin = true
            } else if (systemStore.initStatus == 'finish' && !config.login.is_username && !config.login.is_mobile) {
                uni.showToast({ title: '商家未开启登录注册', icon: 'none' })
                return;
            } else {
                url = '/app/pages/auth/index'
                mode = 'redirectTo'
                newLogin = true
            }
        }
        // #endif
    }

    mode = mode || 'navigateTo'
    const tabBar = getTabbarPages()
    tabBar.includes(url) && (mode = 'switchTab')

    mode != 'switchTab' && param && Object.keys(param).length && (url += uni.$u.queryParams(param))

    if (newLogin) {
        uni.setStorage({ key: 'loginBack', data: { url: originalUrl } });
    }

    switch (mode) {
        case 'switchTab':
            uni.switchTab({
                url,
                success: () => {
                    success && success()
                },
                fail: () => {
                    fail && fail()
                },
                complete: () => {
                    complete && complete()
                }
            })
            break;
        case 'navigateTo':
            uni.navigateTo({
                url,
                success: () => {
                    success && success()
                },
                fail: () => {
                    fail && fail()
                },
                complete: () => {
                    complete && complete()
                }
            })
            break;
        case 'reLaunch':
            uni.reLaunch({
                url,
                success: () => {
                    success && success()
                },
                fail: () => {
                    fail && fail()
                },
                complete: () => {
                    complete && complete()
                }
            })
            break;
        case 'redirectTo':
            uni.redirectTo({
                url,
                success: () => {
                    success && success()
                },
                fail: () => {
                    fail && fail()
                },
                complete: () => {
                    complete && complete()
                }
            })
            break;
    }
}

/**
 * 自定义跳转链接
 * @param {Object} link
 */
export const diyRedirect = (link: any) => {
    const diyStore = useDiyStore();
    // 装修模式禁止跳转
    if (diyStore.mode == 'decorate') return;

    if (link == null || Object.keys(link).length == 1) return;

    // 外部链接
    if (link.url && (link.url.indexOf('https') != -1 || link.url.indexOf('http') != -1)) {

        // #ifdef H5
        window.location.href = link.url;
        // #endif

        // #ifdef MP
        redirect({
            url: '/app/pages/webview/index',
            param: { src: encodeURIComponent(link.url) }
        });
        // #endif
    } else if (link.appid) {
        // 跳转其他小程序

        // #ifdef MP
        uni.navigateToMiniProgram({
            appId: link.appid,
            path: link.page
        })
        // #endif
    } else if (link.name == 'DIY_MAKE_PHONE_CALL' && link.mobile) {
        // 拨打电话

        uni.makePhoneCall({
            phoneNumber: link.mobile,
            success: (res) => {
            },
            fail: (res) => {
            }
        });

    } else {
        redirect({ url: link.url });
    }
}

/**
 * 获取当前路由
 */
export const currRoute = () => {
    const pages = getCurrentPages()
    const route = pages[pages.length - 1]
    return route ? route.route : ''
}

// 获取分享路由
export const currShareRoute = () => {
    const pages: any = getCurrentPages()
    if (pages.length == 0) {
        return {
            path: '/',
            params: {}
        }
    }
    let currentRoute = pages[pages.length - 1].route //获取当前页面路由

    // #ifdef H5
    let currentParam: any = pages[pages.length - 1].$page.options; //获取路由参数
    // #endif

    // #ifdef MP
    let currentParam: any = pages[pages.length - 1].options || {}; //获取路由参数
    // #endif

    // 拼接参数
    let params: any = {};
    for (let key in currentParam) {
        params[key] = currentParam[key]
    }
    let currentPath = '/' + currentRoute;

    return {
        path: currentPath,
        params
    }
}

/**
 * 获取token
 * @returns
 */
export function getToken(): null | string {
    return useMemberStore().token
}

/**
 * 设置token
 * @param token
 * @returns
 */
export function setToken(token: string): void {
    uni.setStorageSync(import.meta.env.VITE_REQUEST_STORAGE_TOKEN_KEY, token)
}

/**
 * 移除token
 * @returns
 */
export function removeToken(): void {
    uni.removeStorageSync(import.meta.env.VITE_REQUEST_STORAGE_TOKEN_KEY)
}

/**
 * 将url 解构为 { path: ***, query: {} }
 */
export function urlDeconstruction(url: string) {
    const query: any = {}
    const [path, param] = url.split('?')

    param && param.split('&').forEach((str: string) => {
        let [name, value] = str.split('=')
        query[name] = value
    })

    return { path, query }
}

/**
 * 判断是否是url
 * @param str
 * @returns
 */
export function isUrl(str: string): boolean {
    return str && (str.indexOf('http://') != -1 || str.indexOf('https://') != -1) || false
}

/**
 * 图片输出
 * @param path
 * @returns
 */
export function img(path: string): string {
    // #ifdef H5
    return isUrl(path) ? path : `${ import.meta.env.VITE_IMG_DOMAIN || location.origin }/${ path }`
    // #endif

    // #ifndef H5
    return isUrl(path) ? path : `${ import.meta.env.VITE_IMG_DOMAIN }/${ path }`
    // #endif
}

/**
 * 手机号隐藏
 */
export function mobileHide(mobile: string) {
    return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 判断是否是微信浏览器
 */
export function isWeixinBrowser(): boolean {
    // #ifndef H5
    return false
    // #endif
    let ua = navigator.userAgent.toLowerCase()
    return /micromessenger/.test(ua) ? true : false
}

/**
 * 获取应用场景值
 */
export function getAppChannel(): string {
    // #ifdef APP-PLUS
    return 'app'
    // #endif
    // #ifdef MP-WEIXIN
    return 'weapp'
    // #endif
    // #ifdef H5
    return isWeixinBrowser() ? 'wechat' : 'h5'
    // #endif
}

/**
 * 金额格式化
 */
export function moneyFormat(money: string): string {
    return isNaN(parseFloat(money)) ? money : parseFloat(money).toFixed(2)
}

/**
 * 手机号隐藏
 */
export function mobileConceal(mobile: string): string {
    return mobile.substring(0, 3) + "****" + mobile.substr(mobile.length - 4);
}

/**
 * 获取站点id
 */
export function getSiteId(siteId: number | string) {
    // #ifdef H5
    const match = location.href.match(/\/wap\/(\d*)\//);
    match && (siteId = match[1])
    // #endif

    // #ifdef MP-WEIXIN
    if (uni.getExtConfigSync) {
        const extConfig = uni.getExtConfigSync()
        extConfig.site_id && (siteId = extConfig.site_id)
    }
    // #endif

    return siteId
}

/**
 * 时间戳转日期格式
 * @param timeStamp
 * @param type
 */
export function timeStampTurnTime(timeStamp: any, type = "") {
    if (timeStamp != undefined && timeStamp != "" && timeStamp > 0) {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m: any = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d: any = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h: any = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute: any = date.getMinutes();
        var second: any = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        if (type) {
            if (type == 'yearMonthDay') {
                return y + '年' + m + '月' + d + '日';
            }
            return y + '-' + m + '-' + d;
        } else {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        }

    } else {
        return "";
    }
}

/**
 * 日期格式转时间戳
 * @param {Object} date
 */
export function timeTurnTimeStamp(date: string) {
    var f = date.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
        parseInt(d[0], 10) || null,
        (parseInt(d[1], 10) || 1) - 1,
        parseInt(d[2], 10) || null,
        parseInt(t[0], 10) || null,
        parseInt(t[1], 10) || null,
        parseInt(t[2], 10) || null
    )).getTime() / 1000;
}

/**
 * 复制
 * @param {Object} value
 * @param {Object} callback
 */
export function copy(value: any, callback: any) {
    // #ifdef H5
    var oInput = document.createElement('input'); //创建一个隐藏input（重要！）
    oInput.value = value; //赋值
    oInput.setAttribute("readonly", "readonly");
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    uni.hideKeyboard();
    uni.showToast({
        title: '复制成功',
        icon: 'none'
    });

    typeof callback == 'function' && callback();
    // #endif

    // #ifdef MP || APP-PLUS
    uni.setClipboardData({
        data: value,
        success: () => {
            typeof callback == 'function' && callback();
        },
        fail: (res) => {
            // 在隐私协议中没有声明chooseLocation:fail api作用域
            if (res.errMsg && res.errno) {
                if (res.errno == 104) {
                    let msg = '用户未授权隐私权限，设置剪贴板数据失败';
                    uni.showToast({ title: msg, icon: 'none' })
                } else if (res.errno == 112) {
                    let msg = '隐私协议中未声明，设置剪贴板数据失败';
                    uni.showToast({ title: msg, icon: 'none' })
                } else {
                    uni.showToast({ title: res.errMsg, icon: 'none' })
                }
            }
        }
    });
    // #endif
}

/**
 * 处理onLoad传递的参数
 * @param option
 */
export function handleOnloadParams(option: any) {
    let params: any = {};

    // 处理小程序扫码进入的场景值参数
    if (option.scene) {
        var sceneParams = decodeURIComponent(option.scene).split('&');
        if (sceneParams.length) {
            sceneParams.forEach(item => {
                let arr = item.split('-');
                params[arr[0]] = arr[1];
                if (arr[0] == 'mid') {
                    uni.setStorageSync('pid', arr[1])
                }
            });
        }
    } else {
        params = option;
    }
    return params;
}


/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export function deepClone(obj: any) {
    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj
    if (typeof obj !== 'object' && typeof obj !== 'function') {
        // 原始类型直接返回
        return obj
    }
    const o = isArray(obj) ? [] : {}
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
        }
    }
    return o
}

/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
export function debounce(fn: (args?: any) => any, delay: number = 300) {
    let timer: null | number = null
    return function (...args) {
        if (timer != null) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, delay);
    }
}

const isArray = (value: any) => {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    }
    return Object.prototype.toString.call(value) === '[object Array]'
}

// px转rpx
export function pxToRpx(px: any) {
    const screenWidth = uni.getSystemInfoSync().screenWidth;
    return (750 * Number.parseInt(px)) / screenWidth;
}

// 返回上一页
export function goback(data: any) {
    let { url, mode, param, title } = data
    uni.showToast({
        title: title,
        icon: 'none'
    });
    setTimeout(() => {
        if (getCurrentPages().length > 1) {
            uni.navigateBack({
                delta: 1
            });
        } else {
            redirect({
                url: url,
                param: param || {},
                mode: mode || 'redirectTo'
            });
        }
    }, 600);
}
