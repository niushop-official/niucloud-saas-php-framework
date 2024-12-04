import { img, isWeixinBrowser, currRoute, currShareRoute } from '@/utils/common'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { getShareInfo } from '@/app/api/diy';
import useSystemStore from '@/stores/system';

// #ifdef H5
import wechat from '@/utils/wechat'
// #endif

export const useShare = () => {
    var wechatOptions: any = {};
    var weappOptions: any = {};

    const wechatInit = () => {
        if (!isWeixinBrowser()) return;
        // 初始化sdk
        wechat.init();
    }

    // 微信公众号分享
    const wechatShare = () => {
        if (!isWeixinBrowser()) return;
        wechat.share(wechatOptions);
    }

    const getQuery = () => {
        let query: any = currShareRoute().params;
        let wap_member_id = uni.getStorageSync('wap_member_id');
        if (wap_member_id) {
            query.mid = wap_member_id;
        }

        let queryStr = [];
        for (let key in query) {
            queryStr.push(key + '=' + query[key]);
        }

        return queryStr

    }

    const setShare = (options: any = {}) => {
        if (currRoute() == '' || currRoute().indexOf('app/pages/index/close') != -1 || currRoute().indexOf('app/pages/index/nosite') != -1) return;

        let queryStr = getQuery();

        // #ifdef H5

        let h5Link = location.origin + location.pathname + (queryStr.length > 0 ? '?' + queryStr.join('&') : '');

        wechatOptions = {
            link: h5Link
        }

        // #endif

        // #ifdef MP-WEIXIN
        weappOptions = {
            path: '/' + currRoute() + (queryStr.length > 0 ? '?' + queryStr.join('&') : ''),
            query: queryStr.join('&'),
        }
        // #endif

        if (options) {

            if (options.wechat) {

                // #ifdef H5
                wechatOptions.title = options.wechat.title || ''
                wechatOptions.link = options.wechat.link || h5Link
                wechatOptions.desc = options.wechat.desc || ''
                wechatOptions.imgUrl = options.wechat.url ? img(options.wechat.url) : ''
                // wechatOptions.success = options.wechat.callback || null;
                // useSystemStore().shareCallback = options.wechat.callback || null;
                wechatShare()
                // #endif
            }

            if (options.weapp) {

                // #ifdef MP-WEIXIN
                weappOptions.title = options.weapp.title || ''
                if (options.weapp.path) weappOptions.path = options.weapp.path
                weappOptions.imageUrl = options.weapp.url ? img(options.weapp.url) : ''
                useSystemStore().shareCallback = options.weapp.callback || null;
                uni.setStorageSync('weappOptions', weappOptions)
                // #endif

            }

        } else {
            getShareInfo({
                route: '/' + currRoute(),
                params: JSON.stringify(currShareRoute().params)
            }).then((res: any) => {
                let data = res.data;

                // #ifdef H5
                let wechat = data.wechat;
                if (wechat) {
                    wechatOptions.title = wechat.title
                    wechatOptions.desc = wechat.desc
                    wechatOptions.imgUrl = wechat.url ? img(wechat.url) : ''
                } else {
                    wechatOptions.title = document.title;
                    wechatOptions.desc = ''
                }
                wechatShare()
                // #endif

                // #ifdef MP-WEIXIN
                let weapp = data.weapp;
                if (weapp) {
                    weappOptions.title = weapp.title
                    weappOptions.imageUrl = weapp.url ? img(weapp.url) : ''
                }
                // #endif

                uni.setStorageSync('weappOptions', weappOptions)
            })
        }
    }

    // 小程序分享，分享给好友
    const shareApp = (options = {}) => {
        return onShareAppMessage(() => {
            let config: any = uni.getStorageSync('weappOptions')
            if (!config) config = {}
            if (useSystemStore().shareCallback) useSystemStore().shareCallback();
            return {
                ...config,
                ...options
            }
        })

    }

    // 小程序分享，分享到朋友圈
    const shareTime = (options = {}) => {
        return onShareTimeline(() => {
            let config: any = uni.getStorageSync('weappOptions')
            if (!config) config = {}
            if (useSystemStore().shareCallback) useSystemStore().shareCallback();
            return {
                ...config,
                ...options
            }
        })
    }

    return {
        wechatInit: wechatInit,
        setShare: setShare,
        onShareAppMessage: shareApp,
        onShareTimeline: shareTime,
    }
}
