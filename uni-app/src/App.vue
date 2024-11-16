<script setup lang="ts">
    import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
    import { launchInterceptor } from '@/utils/interceptor'
    import { getToken, isWeixinBrowser, getSiteId, currRoute, deepClone } from '@/utils/common'
    import useMemberStore from '@/stores/member'
    import useConfigStore from '@/stores/config'
    import useSystemStore from '@/stores/system'
    import { useLogin } from '@/hooks/useLogin'
    import { useShare } from '@/hooks/useShare'

    onLaunch((data: any) => {

        // 添加初始化拦截器
        launchInterceptor()

        // #ifdef H5
        uni.getSystemInfoSync().platform == 'ios' && (uni.setStorageSync('initUrl', location.href))

        // 传输给后台数据
        window.parent.postMessage(JSON.stringify({
            type: 'appOnLaunch',
            message: '初始化加载完成'
        }), '*');

        // 监听父页面发来的消息
        window.addEventListener('message', event => {
            try {
                let data = {
                    type: ''
                };
                if (typeof event.data == 'string') {
                    data = JSON.parse(event.data)
                } else if (typeof event.data == 'object') {
                    data = event.data
                }
                if (data.type && data.type == 'appOnReady') {
                    window.parent.postMessage(JSON.stringify({
                        type: 'appOnReady',
                        message: '加载完成'
                    }), '*');
                }
            } catch (e) {
                console.log('uni-app App.vue 接受数据错误', e)
            }
        }, false);

        // 缺少站点id，拦截
        if (process.env.NODE_ENV == 'development' && (getSiteId(uni.getStorageSync('wap_site_id') || import.meta.env.VITE_SITE_ID) === '')) return;

        const { wechatInit } = useShare()
        wechatInit()
        // #endif

        // #ifdef MP
        const updateManager = uni.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
        });

        updateManager.onUpdateReady(function (res) {
            uni.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    }
                }
            });
        });

        updateManager.onUpdateFailed(function (res) {
            // 新的版本下载失败
        });
        // #endif

        // 获取初始化数据信息
        useSystemStore().getInitFn(async() => {

            const configStore = useConfigStore()

            try {
                uni.hideTabBar() // 隐藏tabbar
            } catch (e) {

            }

            let loginConfig = uni.getStorageSync('login_config')
            if (!loginConfig) {
                loginConfig = deepClone(configStore.login)
            }

            // 判断在登录注册页面账号锁定后不进行请求三方登录注册
            let url: any = currRoute()
            if ((['app/pages/auth/index', 'app/pages/auth/login', 'app/pages/auth/register', 'app/pages/auth/resetpwd'].indexOf(url) != -1) &&
                (loginConfig.is_username || loginConfig.is_mobile || loginConfig.is_bind_mobile)) {
                return false
            }

            // 判断是否已登录
            if (getToken()) {
                const memberStore: any = useMemberStore()

                await memberStore.setToken(getToken(), () => {
                    if (!uni.getStorageSync('openid')) {
                        const memberInfo = useMemberStore().info
                        const login = useLogin()

                        // #ifdef MP-WEIXIN
                        if (memberInfo.mobile) uni.setStorageSync('wap_member_mobile', memberInfo.mobile) // 存储会员手机号，防止重复请求微信获取手机号接口
                        if (memberInfo && memberInfo.weapp_openid) {
                            uni.setStorageSync('openid', memberInfo.weapp_openid)
                        } else {
                            login.getAuthCode({ updateFlag: true }) // 更新oppenid
                        }
                        // #endif

                        // #ifdef H5
                        if (isWeixinBrowser()) {
                            if (memberInfo && memberInfo.wx_openid) {
                                uni.setStorageSync('openid', memberInfo.wx_openid)
                            } else {
                                if (data.query.code) {
                                    // 检测身份是否合法（当前登录的账号是不是我的），openid有效后才能更新登录
                                    login.updateOpenid(data.query.code, () => {
                                        login.authLogin({ code: data.query.code })
                                    })
                                } else {
                                    if (loginConfig.is_force_access_user_info) {
                                        // 强制获取用户信息
                                        login.getAuthCode({ scopes: 'snsapi_userinfo' })
                                    } else {
                                        // 静默获取
                                        login.getAuthCode({ scopes: 'snsapi_base' })
                                    }
                                }
                            }
                        }
                        // #endif

                    }

                    // 开启强制绑定手机号
                    if (uni.getStorageSync('isbindmobile')) {
                        uni.removeStorageSync('isbindmobile');
                    }

                    if (loginConfig.is_bind_mobile && !memberStore.info.mobile) {
                        // 强制绑定手机号
                        uni.setStorageSync('isbindmobile', true)
                    }
                })

            }

            if (!getToken()) {

                // #ifdef MP
                // 小程序 会员退出后不会自动登录
                if (uni.getStorageSync('autoLoginLock')) return;
                // #endif

                const login = useLogin()

                // #ifdef MP
                // 判断是否开启第三方自动注册登录
                if (loginConfig.is_auth_register) {
                    // 第三方平台自动登录
                    login.getAuthCode()
                }
                // #endif

                // #ifdef H5
                if (isWeixinBrowser()) {
                    if (uni.getStorageSync('autoLoginLock') && !uni.getStorageSync('wechat_login_back')) return;
                    if (loginConfig.is_auth_register || uni.getStorageSync('wechat_login_back')) {
                        uni.removeStorageSync('wechat_login_back') // 删除微信公众号手动授权登录回调标识
                        if (data.query.code) {
                            login.authLogin({ code: data.query.code })
                        } else {
                            if (loginConfig.is_force_access_user_info) {
                                // 强制获取用户信息
                                login.getAuthCode({ scopes: 'snsapi_userinfo' })
                            } else {
                                // 静默获取
                                login.getAuthCode({ scopes: 'snsapi_base' })
                            }
                        }
                    }
                }
                // #endif
            }
        })

    })

    onShow(() => {
		
    })

    onHide(() => {
    })
</script>

<style>
    uni-page-head {
        display: none !important;
    }
</style>
